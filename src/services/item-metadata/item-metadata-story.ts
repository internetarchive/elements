import { css, html, LitElement, nothing, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import fieldSource from './models/metadata-fields/metadata-field.ts?raw';
import keySource from './models/metadata-field-key.ts?raw';

import '@demo/service-template';
import { Metadata } from './item-metadata';
import type { MetadataFieldInterface } from './item-metadata';

const DEFAULT_IDENTIFIER = 'nasa';

/** What the archive.org metadata API returns for an item, trimmed to a sample. */
const SAMPLE_METADATA: Record<string, unknown> = {
  identifier: 'sample-item',
  mediatype: 'movies',
  title: 'A sample item',
  creator: 'Internet Archive',
  subject: ['sample', 'demo', 'metadata'],
  addeddate: '2021-05-20 13:37:15',
  publicdate: '2021-05-21 08:00:00',
  runtime: '1:02:03',
  item_size: '123456789',
  downloads: '42',
  imagecount: '17',
  'access-restricted-item': 'true',
  mystery_field: 'a key the model does not read',
};

const USAGE = `import { Metadata } from '@internetarchive/elements/services/item-metadata/item-metadata';

const response = await fetch('https://archive.org/metadata/nasa');
const { metadata } = await response.json();

const item = new Metadata(metadata);
item.title?.value; // string
item.addeddate?.value; // Date
item.item_size?.value; // number of bytes`;

/** Strips the import statements, which are noise in the API listing. */
const withoutImports = (source: string) =>
  source.replace(/^import[\s\S]*?from '[^']+';\n/gm, '').trim();

/** The model's own source is long, so show the field types it builds on. */
const API_SOURCE = [fieldSource, keySource].map(withoutImports).join('\n\n');

/** Every field the model exposes, read off `Metadata`'s prototype getters. */
const MODELED_FIELDS: string[] = Object.getOwnPropertyNames(Metadata.prototype)
  .filter(
    (name) =>
      typeof Object.getOwnPropertyDescriptor(Metadata.prototype, name)?.get ===
      'function',
  )
  .sort();

const fieldValue = (metadata: Metadata, name: string): unknown =>
  (metadata as unknown as Record<string, unknown>)[name];

const isMetadataField = (
  value: unknown,
): value is MetadataFieldInterface<unknown> =>
  typeof value === 'object' && value !== null && 'rawValue' in value;

/** The field class that parsed a value, e.g. `DateField`. */
function fieldTypeName(value: unknown): string {
  if (isMetadataField(value)) return value.constructor?.name ?? 'unknown';
  return typeof value;
}

/** Renders a parsed value (Date, number, string, array, object) as text. */
function display(value: unknown): string {
  if (value === undefined || value === null) return '—';
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(display).join(', ');
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

/** The raw keys the model reads, found by probing it through a Proxy. */
function modeledRawKeys(raw: Record<string, unknown>): Set<string> {
  const touched = new Set<string>();
  const probe = new Proxy(raw, {
    get(target, key) {
      if (typeof key === 'string') touched.add(key);
      return Reflect.get(target, key);
    },
  });
  const metadata = new Metadata(probe);
  for (const name of MODELED_FIELDS) fieldValue(metadata, name);
  return touched;
}

interface Row {
  name: string;
  type: string;
  value: string;
}

@customElement('item-metadata-story')
export class ItemMetadataStory extends LitElement {
  @state() private identifier = '';

  @state() private sample = false;

  @state() private loading = false;

  @state() private result?: {
    call: string;
    rows: Row[];
    unmodeled: string[];
    error?: string;
  };

  render() {
    return html`
      <service-template
        serviceName="item-metadata"
        .usage=${USAGE}
        .apiSource=${API_SOURCE}
      >
        <form slot="console" @submit=${this.run}>
          <label class="id">
            archive.org identifier
            <input
              type="text"
              placeholder=${DEFAULT_IDENTIFIER}
              autocomplete="off"
              spellcheck="false"
              .value=${this.identifier}
              @input=${(e: Event) =>
                (this.identifier = (e.target as HTMLInputElement).value)}
            />
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${this.sample}
              @change=${(e: Event) =>
                (this.sample = (e.target as HTMLInputElement).checked)}
            />
            Sample data (works offline)
          </label>
          <button type="submit" ?disabled=${this.loading}>Parse</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result ? this.renderResult(this.result) : nothing}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Loads an item's metadata from archive.org and shows what the model
            makes of each field it sets: the class that parsed it and the native
            value. Keys the model doesn't read are listed under the table.
          </p>
        </div>
      </service-template>
    `;
  }

  private renderResult(result: NonNullable<ItemMetadataStory['result']>) {
    return html`<code class="call">${result.call}</code> ${result.error
        ? html`<code class="error">${result.error}</code>`
        : html`<table>
              <thead>
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">Parsed by</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                ${result.rows.map(
                  (row) =>
                    html`<tr>
                      <th scope="row">${row.name}</th>
                      <td>${row.type}</td>
                      <td>${row.value}</td>
                    </tr>`,
                )}
              </tbody>
            </table>
            <p class="unmodeled">
              Not read by the model:
              ${result.unmodeled.length ? result.unmodeled.join(', ') : 'none'}
            </p>`}`;
  }

  private async run(e: Event) {
    e.preventDefault();
    const identifier = this.identifier.trim() || DEFAULT_IDENTIFIER;
    const call = `new Metadata(${
      this.sample ? 'sample' : `response.metadata /* ${identifier} */`
    })`;
    this.loading = true;
    try {
      let raw: Record<string, unknown>;
      if (this.sample) {
        raw = SAMPLE_METADATA;
      } else {
        const response = await fetch(
          `https://archive.org/metadata/${encodeURIComponent(identifier)}`,
        );
        if (!response.ok)
          throw new Error(`Request failed (${response.status})`);
        const json = (await response.json()) as {
          metadata?: Record<string, unknown>;
        };
        if (!json.metadata) {
          throw new Error(`No item found for "${identifier}".`);
        }
        raw = json.metadata;
      }
      const metadata = new Metadata(raw);
      const rows: Row[] = MODELED_FIELDS.map((name) => ({
        name,
        value: fieldValue(metadata, name),
      }))
        .filter(({ value }) => value !== undefined)
        .map(({ name, value }) => ({
          name,
          type: fieldTypeName(value),
          value: display(isMetadataField(value) ? value.value : value),
        }));
      const modeled = modeledRawKeys(raw);
      const unmodeled = Object.keys(raw)
        .filter((key) => !modeled.has(key))
        .sort();
      this.result = { call, rows, unmodeled };
    } catch (error) {
      this.result = {
        call,
        rows: [],
        unmodeled: [],
        error: `${error instanceof Error ? error.message : error}${
          this.sample ? '' : '. Try "Sample data".'
        }`,
      };
    } finally {
      this.loading = false;
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      form {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 0.5rem;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-size: 0.8rem;
      }

      label.check {
        flex-direction: row;
        align-items: center;
        gap: 4px;
      }

      label.id input {
        min-width: 0;
        width: 14rem;
        max-width: 100%;
      }

      .result[hidden] {
        display: none;
      }

      .result {
        box-sizing: border-box;
        flex-basis: 100%;
        min-width: 0;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 0.5rem;
        background: #fff;
        border: 1px solid #ccc;
        font-size: 0.85rem;
        overflow-x: auto;
      }

      .call,
      .error {
        overflow-wrap: anywhere;
      }

      .error {
        color: #b00020;
      }

      table {
        border-collapse: collapse;
        font-size: 0.8rem;
      }

      th,
      td {
        text-align: left;
        padding: 2px 10px 2px 0;
        vertical-align: top;
        overflow-wrap: anywhere;
      }

      thead th {
        border-bottom: 1px solid #ccc;
      }

      .unmodeled {
        margin: 0;
        font-size: 0.8rem;
        overflow-wrap: anywhere;
      }
    `;
  }
}
