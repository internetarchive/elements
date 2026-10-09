import { css, html, LitElement, nothing, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import serviceSource from './lazy-loader-service.ts?raw';
import interfaceSource from './lazy-loader-service-interface.ts?raw';
import bundleTypeSource from './bundle-type.ts?raw';

import '@demo/service-template';
import { LazyLoaderService } from './lazy-loader-service';

type Target = 'sample' | 'missing';

const USAGE = `import { LazyLoaderService } from '@internetarchive/elements/services/lazy-loader-service/lazy-loader-service';

const lazyLoader = new LazyLoaderService({ retryCount: 2, retryInterval: 1 });
lazyLoader.on('scriptLoadRetried', (src, retryNumber) => console.log(src, retryNumber));
await lazyLoader.loadScript({ src: 'https://example.org/widget.js' });`;

/** Strips the import statements, which are noise in the API listing. */
const withoutImports = (source: string) =>
  source.replace(/^import[\s\S]*?from '[^']+';\n/gm, '').trim();

const API_SOURCE = [interfaceSource, bundleTypeSource, serviceSource]
  .map(withoutImports)
  .join('\n\n');

@customElement('lazy-loader-service-story')
export class LazyLoaderServiceStory extends LitElement {
  @state() private target: Target = 'sample';

  @state() private retryCount = 2;

  @state() private retryInterval = 0.5;

  @state() private running = false;

  @state() private log: string[] = [];

  @state() private outcome?: string;

  @state() private scriptTags: string[] = [];

  render() {
    return html`
      <service-template
        serviceName="lazy-loader-service"
        .usage=${USAGE}
        .apiSource=${API_SOURCE}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            Script
            <select @change=${this.pickTarget}>
              <option value="sample" ?selected=${this.target === 'sample'}>
                A sample script (loads)
              </option>
              <option value="missing" ?selected=${this.target === 'missing'}>
                A script that doesn't exist (fails)
              </option>
            </select>
          </label>
          <label>
            Retries
            <input
              type="number"
              min="0"
              max="5"
              .value=${String(this.retryCount)}
              @input=${(e: Event) =>
                (this.retryCount = Number(
                  (e.target as HTMLInputElement).value,
                ))}
            />
          </label>
          <label>
            Retry interval (seconds)
            <input
              type="number"
              min="0"
              max="5"
              step="any"
              .value=${String(this.retryInterval)}
              @input=${(e: Event) =>
                (this.retryInterval = Number(
                  (e.target as HTMLInputElement).value,
                ))}
            />
          </label>
          <button type="submit" ?disabled=${this.running}>Load</button>
          <div class="result" aria-live="polite" ?hidden=${!this.outcome}>
            ${this.outcome
              ? html`<code class="output">${this.outcome}</code>
                  <ul class="events">
                    ${this.log.map((line) => html`<li>${line}</li>`)}
                  </ul>
                  ${this.scriptTags.length
                    ? html`<code class="tags"
                        >${this.scriptTags.join('\n')}</code
                      >`
                    : nothing}`
              : nothing}
          </div>
          <div id="container" hidden></div>
        </form>
        <div slot="usage-notes">
          <p>
            Loads the script in a <code>&lt;script&gt;</code> tag and resolves
            once it runs. A failed load is retried, and the events say when. The
            missing script is a path on this site that returns a 404.
          </p>
        </div>
      </service-template>
    `;
  }

  private pickTarget(e: Event) {
    this.target = (e.target as HTMLSelectElement).value as Target;
  }

  private async run(e: Event) {
    e.preventDefault();
    const container = this.shadowRoot!.querySelector(
      '#container',
    ) as HTMLElement;
    container.replaceChildren();
    this.running = true;
    this.log = [];
    this.outcome = undefined;
    this.scriptTags = [];

    const blobUrl =
      this.target === 'sample'
        ? URL.createObjectURL(
            new Blob(['window.lazyLoaderDemo = "loaded";'], {
              type: 'text/javascript',
            }),
          )
        : undefined;
    const src =
      blobUrl ??
      new URL('./lazy-loader-demo-missing.js', document.baseURI).href;

    const lazyLoader = new LazyLoaderService({
      container,
      retryCount: this.retryCount,
      retryInterval: this.retryInterval,
    });
    lazyLoader.on('scriptLoadRetried', (_src, retryNumber) => {
      this.log = [...this.log, `scriptLoadRetried (retry ${retryNumber})`];
    });
    lazyLoader.on('scriptLoadFailed', () => {
      this.log = [...this.log, 'scriptLoadFailed'];
    });

    const started = performance.now();
    const call = `loadScript({ src: ${JSON.stringify(
      blobUrl ? 'blob:… (sample script)' : src,
    )} })`;
    try {
      await lazyLoader.loadScript({ src });
      this.outcome = `${call} resolved after ${this.elapsed(started)} ms`;
    } catch {
      this.outcome = `${call} rejected after ${this.elapsed(started)} ms`;
    } finally {
      this.scriptTags = Array.from(container.querySelectorAll('script')).map(
        (tag) => tag.outerHTML.replace(/blob:[^"]+/, 'blob:…'),
      );
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      this.running = false;
    }
  }

  private elapsed(started: number): number {
    return Math.round(performance.now() - started);
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

      input[type='number'] {
        width: 6rem;
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

      .output {
        font-weight: 600;
        overflow-wrap: anywhere;
      }

      .events {
        margin: 0;
        padding-left: 1.2rem;
      }

      .tags {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        font-size: 0.75rem;
      }
    `;
  }
}
