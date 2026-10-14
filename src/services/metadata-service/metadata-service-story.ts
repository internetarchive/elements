import { css, html, LitElement, nothing, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import serviceSource from './metadata-service.ts?raw';
import interfaceSource from './metadata-service-interface.ts?raw';
import errorSource from './metadata-service-error.ts?raw';

import '@demo/service-template';
import { MetadataService } from './metadata-service';
import { DefaultMetadataBackend } from './backend/default-metadata-backend';
import type { MetadataBackendInterface } from './backend/metadata-backend-interface';
import type { MetadataServiceError } from './metadata-service-error';
import type { Result } from '../result-type/result-type';
import { MockResponseGenerator } from './mock-response-generator.test-helper';

const DEFAULT_IDENTIFIER = 'nasa';

const USAGE = `import { MetadataService } from '@internetarchive/elements/services/metadata-service/metadata-service';
import { DefaultMetadataBackend } from '@internetarchive/elements/services/metadata-service/backend/default-metadata-backend';

const service = new MetadataService(new DefaultMetadataBackend());

const { success: item } = await service.fetchMetadata('nasa');
item?.metadata.title?.value; // string

const { success: title } = await service.fetchMetadataValue<string>('nasa', 'metadata/title');`;

/** Strips the import statements, which are noise in the API listing. */
const withoutImports = (source: string) =>
  source.replace(/^import[\s\S]*?from '[^']+';\n/gm, '').trim();

const API_SOURCE = [interfaceSource, errorSource, serviceSource]
  .map(withoutImports)
  .join('\n\n');

/**
 * Wraps a backend to note the request it makes. With `sample` set it answers
 * from a canned response and never touches the network.
 */
class RecordingBackend implements MetadataBackendInterface {
  last?: string;

  private readonly sample: boolean;

  private readonly live = new DefaultMetadataBackend();

  constructor(sample: boolean) {
    this.sample = sample;
  }

  async fetchMetadata(
    identifier: string,
    keypath?: string,
  ): Promise<Result<any, MetadataServiceError>> {
    this.last = `GET https://archive.org/metadata/${identifier}${
      keypath ? `/${keypath}` : ''
    }`;
    if (!this.sample) {
      const result = await this.live.fetchMetadata(identifier, keypath);
      // A refused identifier or path never becomes a request.
      if (result.error?.message === 'Invalid identifier or path') {
        this.last = undefined;
      }
      return result;
    }
    const response = new MockResponseGenerator().generateMockMetadataResponse(
      identifier,
    );
    return {
      success: keypath
        ? { result: keypath.split('/').reduce((v, k) => v?.[k], response) }
        : response,
    };
  }
}

@customElement('metadata-service-story')
export class MetadataServiceStory extends LitElement {
  @state() private identifier = '';

  @state() private keypath = '';

  @state() private sample = false;

  @state() private running = false;

  @state() private result?: {
    call: string;
    request?: string;
    lines: string[];
    error?: string;
  };

  render() {
    return html`
      <service-template
        serviceName="metadata-service"
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
          <label class="id">
            Value path (optional)
            <input
              type="text"
              placeholder="metadata/title"
              autocomplete="off"
              spellcheck="false"
              .value=${this.keypath}
              @input=${(e: Event) =>
                (this.keypath = (e.target as HTMLInputElement).value)}
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
          <button type="submit" ?disabled=${this.running}>Fetch</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result
              ? html`<code class="call">${this.result.call}</code> ${this.result
                    .request
                    ? html`<code class="request">${this.result.request}</code>`
                    : nothing}
                  ${this.result.error
                    ? html`<code class="error">${this.result.error}</code>`
                    : html`<ul class="lines">
                        ${this.result.lines.map(
                          (line) => html`<li>${line}</li>`,
                        )}
                      </ul>`}`
              : nothing}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Fetches an item's metadata from archive.org and models it:
            <code>fetchMetadata</code> returns the whole response, and
            <code>fetchMetadataValue</code> returns one value when you give it a
            path. The sample data answers from a canned response and sends
            nothing.
          </p>
        </div>
      </service-template>
    `;
  }

  private async run(e: Event) {
    e.preventDefault();
    const identifier = this.identifier.trim() || DEFAULT_IDENTIFIER;
    const keypath = this.keypath.trim();
    const backend = new RecordingBackend(this.sample);
    const service = new MetadataService(backend);
    const call = keypath
      ? `fetchMetadataValue(${JSON.stringify(identifier)}, ${JSON.stringify(
          keypath,
        )})`
      : `fetchMetadata(${JSON.stringify(identifier)})`;
    this.running = true;
    try {
      if (keypath) {
        const { success, error } = await service.fetchMetadataValue<unknown>(
          identifier,
          keypath,
        );
        this.result = error
          ? this.failure(call, backend, error)
          : {
              call,
              request: backend.last,
              lines: [JSON.stringify(success)],
            };
      } else {
        const { success: item, error } =
          await service.fetchMetadata(identifier);
        this.result =
          error || !item
            ? this.failure(call, backend, error)
            : {
                call,
                request: backend.last,
                lines: [
                  `title: ${item.metadata.title?.value ?? '—'}`,
                  `mediatype: ${item.metadata.mediatype?.value ?? '—'}`,
                  `files: ${item.files_count}`,
                  `size: ${item.item_size} bytes`,
                  `server: ${item.server ?? '—'}, dir: ${item.dir ?? '—'}`,
                  `first files: ${
                    (item.files ?? [])
                      .slice(0, 3)
                      .map((file) => file.name)
                      .join(', ') || '—'
                  }`,
                ],
              };
      }
    } finally {
      this.running = false;
    }
  }

  private failure(
    call: string,
    backend: RecordingBackend,
    error?: MetadataServiceError,
  ) {
    return {
      call,
      request: backend.last,
      lines: [],
      error: `${error?.type ?? 'error'}${
        error?.message ? ` (${error.message})` : ''
      }${this.sample ? '' : '. Try "Sample data".'}`,
    };
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
        width: 12rem;
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
      }

      .call,
      .request,
      .error {
        overflow-wrap: anywhere;
      }

      .error {
        color: #b00020;
      }

      .lines {
        margin: 0;
        padding-left: 1.2rem;
        overflow-wrap: anywhere;
      }
    `;
  }
}
