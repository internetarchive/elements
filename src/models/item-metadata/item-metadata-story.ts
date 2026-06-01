import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@demo/story-template';
import { Metadata } from './metadata';

/**
 * Interactive demo for the `Metadata` model. Edit the raw metadata JSON (as it
 * comes back from the archive.org metadata API) and watch the model cast each
 * raw field to its typed `MetadataField` — Dates, numbers, byte counts, and
 * normalized multi-value arrays.
 */

const SAMPLE_JSON = JSON.stringify(
  {
    identifier: 'goody',
    title: 'The Goody Collection',
    mediatype: 'texts',
    date: '1936-05-01',
    publicdate: '2008-04-15 10:32:18',
    downloads: '12843',
    duration: '1:02:03',
    item_size: '1572864',
    collection: ['goody', 'americana', 'opensource'],
    description: 'A sample item used to demonstrate the Metadata model.',
  },
  null,
  2,
);

interface FieldRow {
  label: string;
  get: (m: Metadata) => unknown;
}

// A representative slice of the model's typed getters. `identifier` is a plain
// string; the rest return `MetadataField`s exposing `.value` / `.values`.
const FIELDS: FieldRow[] = [
  { label: 'identifier', get: (m) => m.identifier },
  { label: 'title', get: (m) => m.title?.value },
  { label: 'mediatype', get: (m) => m.mediatype?.value },
  { label: 'date', get: (m) => m.date?.value },
  { label: 'publicdate', get: (m) => m.publicdate?.value },
  { label: 'downloads', get: (m) => m.downloads?.value },
  { label: 'duration', get: (m) => m.duration?.value },
  { label: 'item_size', get: (m) => m.item_size?.value },
  { label: 'collection', get: (m) => m.collection?.values },
  { label: 'description', get: (m) => m.description?.value },
];

const EXAMPLE_USAGE = `const metadata = new Metadata(rawMetadataJson);

metadata.identifier;          // 'goody' (string)
metadata.title?.value;        // 'The Goody Collection' (string)
metadata.date?.value;         // Date — parsed from '1936-05-01'
metadata.downloads?.value;    // 12843 (number)
metadata.item_size?.value;    // 1572864 (byte count)
metadata.collection?.values;  // ['goody', 'americana', 'opensource']`;

@customElement('item-metadata-story')
export class ItemMetadataStory extends LitElement {
  @state() private rawJson = SAMPLE_JSON;

  render() {
    const { metadata, parseError } = this.parse();
    return html`
      <story-template
        elementTag="item-metadata"
        elementClassName="Metadata"
        .customExampleUsage=${EXAMPLE_USAGE}
      >
        <div slot="demo">
          <p class="intro">
            The <code>Metadata</code> model wraps a raw archive.org metadata
            record and lazily casts each field to a typed
            <code>MetadataField</code>. Edit the JSON to see the parsed,
            type-cast results update.
          </p>

          <div class="cols">
            <label class="json">
              Raw metadata JSON
              <textarea
                .value=${this.rawJson}
                @input=${this.onInput}
                spellcheck="false"
              ></textarea>
            </label>

            <div class="parsed">
              <span class="parsed-label">Parsed fields</span>
              ${parseError
                ? html`<p class="error">Invalid JSON: ${parseError}</p>`
                : html`
                    <table>
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Parsed value</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${FIELDS.map((f) => {
                          const value = metadata ? f.get(metadata) : undefined;
                          return html`<tr>
                            <td><code>${f.label}</code></td>
                            <td>${this.format(value)}</td>
                            <td class="type">${this.typeLabel(value)}</td>
                          </tr>`;
                        })}
                      </tbody>
                    </table>
                  `}
            </div>
          </div>
        </div>
      </story-template>
    `;
  }

  private parse(): { metadata?: Metadata; parseError?: string } {
    try {
      return { metadata: new Metadata(JSON.parse(this.rawJson)) };
    } catch (e) {
      return { parseError: (e as Error).message };
    }
  }

  private onInput(e: Event) {
    this.rawJson = (e.target as HTMLTextAreaElement).value;
  }

  private format(value: unknown): string {
    if (value === undefined || value === null) return '—';
    if (value instanceof Date) return value.toISOString();
    if (Array.isArray(value)) return JSON.stringify(value);
    return String(value);
  }

  private typeLabel(value: unknown): string {
    if (value === undefined || value === null) return 'undefined';
    if (value instanceof Date) return 'Date';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  }

  static styles = css`
    .intro {
      margin-top: 0;
      max-width: 40rem;
    }

    .cols {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    .json {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      color: #666;
      flex: 1 1 18rem;
    }

    textarea {
      font-family: ui-monospace, monospace;
      font-size: 0.8rem;
      min-height: 16rem;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      resize: vertical;
    }

    .parsed {
      flex: 1 1 20rem;
    }

    .parsed-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      color: #666;
      margin-bottom: 4px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
    }

    th {
      text-align: left;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #888;
      border-bottom: 1px solid #ccc;
      padding: 4px 6px;
    }

    td {
      padding: 4px 6px;
      border-bottom: 1px solid #eee;
      vertical-align: top;
    }

    td.type,
    th:last-child {
      color: #888;
      font-size: 0.75rem;
      white-space: nowrap;
    }

    .error {
      color: #a00;
      font-size: 0.85rem;
    }
  `;
}
