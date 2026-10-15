import { css, html, LitElement, nothing, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import interfaceSource from './fetch-handler-interface.ts?raw';
import optionsSource from './fetch-options.ts?raw';

import '@demo/service-template';
import { FetchHandler } from './fetch-handler';
import { FetchRetrier } from './fetch-retry/fetch-retrier';
import type { FetchRetrierInterface } from './fetch-retry/fetch-retrier';
import { legacyArgsAsFetchOptions } from './fetch-retry/legacy-args';
import { NoRetryConfiguration } from './fetch-retry/configuration/no-retry-configuration';
import type { FetchOptions } from './fetch-options';

const DEFAULT_PATH = '/metadata/prelinger/metadata/title';

const SAMPLE_BODY = { result: 'Prelinger Archives' };

const USAGE = `import { FetchHandler } from '@internetarchive/elements/services/fetch-handler/fetch-handler';

const fetchHandler = new FetchHandler({ apiBaseUrl: 'https://archive.org' });
const response = await fetchHandler.fetchApiPathResponse<{ result: string }>(
  '/metadata/prelinger/metadata/title',
);`;

/** Strips the import statements, which are noise in the API listing. */
const withoutImports = (source: string) =>
  source.replace(/^import[\s\S]*?from '[^']+';\n/gm, '').trim();

const API_SOURCE = [interfaceSource, optionsSource]
  .map(withoutImports)
  .join('\n\n');

interface RequestRecord {
  method: string;
  url: string;
  status?: number;
  ms: number;
  error?: string;
}

/**
 * Wraps the handler's retrier to note the request it makes and how it went.
 * With `sample` set it answers from `SAMPLE_BODY` and never touches the
 * network.
 */
class RecordingRetrier implements FetchRetrierInterface {
  last?: RequestRecord;

  private readonly inner = new FetchRetrier({
    retryConfig: new NoRetryConfiguration(),
  });

  private readonly sample: boolean;

  constructor(sample: boolean) {
    this.sample = sample;
  }

  async fetchRetry(
    request: RequestInfo,
    options?: RequestInit | FetchOptions,
  ): Promise<Response> {
    const started = performance.now();
    const url = typeof request === 'string' ? request : request.url;
    const method =
      legacyArgsAsFetchOptions(options)?.requestInit?.method ?? 'GET';
    try {
      const response = this.sample
        ? new Response(JSON.stringify(SAMPLE_BODY), { status: 200 })
        : await this.inner.fetchRetry(request, options);
      this.last = {
        method,
        url,
        status: response.status,
        ms: Math.round(performance.now() - started),
      };
      return response;
    } catch (error) {
      this.last = {
        method,
        url,
        ms: Math.round(performance.now() - started),
        error: String(error),
      };
      throw error;
    }
  }
}

@customElement('fetch-handler-story')
export class FetchHandlerStory extends LitElement {
  @state() private path = '';

  @state() private sample = false;

  @state() private running = false;

  @state() private result?: {
    call: string;
    request?: RequestRecord;
    body?: string;
    error?: string;
  };

  render() {
    return html`
      <service-template
        serviceName="fetch-handler"
        .usage=${USAGE}
        .apiSource=${API_SOURCE}
      >
        <form slot="console" @submit=${this.run}>
          <label class="path">
            Path on archive.org
            <input
              type="text"
              placeholder=${DEFAULT_PATH}
              autocomplete="off"
              spellcheck="false"
              .value=${this.path}
              @input=${(e: Event) =>
                (this.path = (e.target as HTMLInputElement).value)}
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
                    ? html`<code class="request"
                        >${this.result.request.method}
                        ${this.result.request.url} →
                        ${this.result.request.status ?? 'no response'}
                        (${this.result.request.ms} ms)</code
                      >`
                    : nothing}
                  ${this.result.error
                    ? html`<code class="error">${this.result.error}</code>`
                    : html`<pre class="output">${this.result.body}</pre>`}`
              : nothing}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Fetches from archive.org's real API, so it needs a network
            connection. Tick "Sample data" to answer from a canned response
            instead, which is also what to use if a content blocker stops the
            request. A failed request is retried by default. This page turns
            retries off so a failure shows up straight away.
          </p>
        </div>
      </service-template>
    `;
  }

  private async run(e: Event) {
    e.preventDefault();
    const path = this.path.trim() || DEFAULT_PATH;
    const call = `fetchApiPathResponse(${JSON.stringify(path)})`;
    // The path is appended to https://archive.org, so anything that doesn't
    // start with a slash could change the host.
    if (!path.startsWith('/')) {
      this.result = { call, error: 'The path has to start with a /.' };
      return;
    }
    const retrier = new RecordingRetrier(this.sample);
    const handler = new FetchHandler({
      apiBaseUrl: 'https://archive.org',
      fetchRetrier: retrier,
    });
    this.running = true;
    try {
      const json = await handler.fetchApiPathResponse<unknown>(path);
      this.result = {
        call,
        request: retrier.last,
        body: JSON.stringify(json, null, 2),
      };
    } catch (error) {
      this.result = {
        call,
        request: retrier.last,
        error:
          error instanceof TypeError && !this.sample
            ? `${error}. Couldn't reach archive.org, try "Sample data".`
            : String(error),
      };
    } finally {
      this.running = false;
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

      label.path {
        flex: 1 1 18rem;
      }

      label.path input {
        min-width: 0;
        width: 100%;
        box-sizing: border-box;
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

      .output {
        margin: 0;
        font-weight: 600;
        overflow-x: auto;
      }
    `;
  }
}
