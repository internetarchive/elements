import { css, html, LitElement, nothing, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import managerSource from './recaptcha-manager.ts?raw';
import widgetSource from './recaptcha-widget.ts?raw';

import '@demo/service-template';
import { RecaptchaManager } from './recaptcha-manager';
import { MockGrecaptcha } from './mock-grecaptcha.test-helper';
import type { MockGrecaptchaMode } from './mock-grecaptcha.test-helper';

const DEFAULT_SITE_KEY = 'demo-site-key';

const USAGE = `import { RecaptchaManager } from '@internetarchive/elements/services/recaptcha-manager/recaptcha-manager';

const recaptcha = new RecaptchaManager({ defaultSiteKey: 'YOUR_SITE_KEY' });
const widget = await recaptcha.getRecaptchaWidget();
const token = await widget.execute();`;

/** Strips the import statements, which are noise in the API listing. */
const withoutImports = (source: string) =>
  source.replace(/^import[\s\S]*?from '[^']+';\n/gm, '').trim();

const API_SOURCE = [managerSource, widgetSource]
  .map(withoutImports)
  .join('\n\n');

@customElement('recaptcha-manager-story')
export class RecaptchaManagerStory extends LitElement {
  @state() private mode: MockGrecaptchaMode = 'success';

  @state() private siteKey = '';

  @state() private running = false;

  @state() private result?: {
    call: string;
    output: string;
    details: string[];
  };

  render() {
    return html`
      <service-template
        serviceName="recaptcha-manager"
        .usage=${USAGE}
        .apiSource=${API_SOURCE}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            reCAPTCHA answers with
            <select @change=${this.pickMode}>
              ${(['success', 'expired', 'error'] as MockGrecaptchaMode[]).map(
                (mode) =>
                  html`<option value=${mode} ?selected=${mode === this.mode}>
                    ${mode}
                  </option>`,
              )}
            </select>
          </label>
          <label>
            Site key
            <input
              type="text"
              placeholder=${DEFAULT_SITE_KEY}
              autocomplete="off"
              spellcheck="false"
              .value=${this.siteKey}
              @input=${(e: Event) =>
                (this.siteKey = (e.target as HTMLInputElement).value)}
            />
          </label>
          <button type="submit" ?disabled=${this.running}>Execute</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result
              ? html`<code class="call">${this.result.call}</code>
                  <code class="output">${this.result.output}</code>
                  <ul class="details">
                    ${this.result.details.map((line) => html`<li>${line}</li>`)}
                  </ul>`
              : nothing}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            A real reCAPTCHA needs a site key registered for the page's domain,
            so this page hands the manager a stand-in for Google's
            <code>grecaptcha</code> library and picks how it answers. Without
            one, the manager loads the library from
            <code>www.recaptcha.net</code> itself. Nothing is loaded here.
          </p>
        </div>
      </service-template>
    `;
  }

  private pickMode(e: Event) {
    this.mode = (e.target as HTMLSelectElement).value as MockGrecaptchaMode;
    this.result = undefined;
  }

  private async run(e: Event) {
    e.preventDefault();
    const siteKey = this.siteKey.trim() || DEFAULT_SITE_KEY;
    const library = new MockGrecaptcha({ mode: this.mode });
    const manager = new RecaptchaManager({
      defaultSiteKey: siteKey,
      grecaptchaLibrary: library,
    });
    const call = `getRecaptchaWidget({ siteKey: ${JSON.stringify(
      siteKey,
    )} }).execute()`;
    this.running = true;
    try {
      const widget = await manager.getRecaptchaWidget();
      const again = await manager.getRecaptchaWidget();
      let output: string;
      try {
        output = `token: ${JSON.stringify(await widget.execute())}`;
      } catch (error) {
        output = `rejected: ${(error as Error).message}`;
      }
      this.result = {
        call,
        output,
        details: [
          `Same widget on a second request: ${widget === again}`,
          `grecaptcha reset calls: ${library.resetCallCount}`,
        ],
      };
    } finally {
      // The widget leaves a container in the page for the library to render
      // into.
      document.getElementById(`recaptchaManager-${siteKey}`)?.remove();
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

      input[type='text'] {
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
      .output {
        overflow-wrap: anywhere;
      }

      .output {
        font-weight: 600;
      }

      .details {
        margin: 0;
        padding-left: 1.2rem;
      }
    `;
  }
}
