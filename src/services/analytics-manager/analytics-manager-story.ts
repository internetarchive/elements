import { css, html, LitElement, nothing, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import managerSource from './analytics-manager.ts?raw';
import helpersSource from './analytics-helpers.ts?raw';
import handlerSource from './analytics-handler.ts?raw';

import '@demo/service-template';
import { AnalyticsManager } from './analytics-manager';
import { AnalyticsHelpers } from './analytics-helpers';

type Method = 'sendEvent' | 'sendEventNoSampling' | 'trackIaxParameter';

const USAGE = `import { AnalyticsManager } from '@internetarchive/elements/services/analytics-manager/analytics-manager';

const analytics = new AnalyticsManager();
analytics.sendEvent({
  category: 'DonatePage',
  action: 'LinkClicked',
  label: 'MoreInfoLink',
});`;

/** Strips the import statements, which are noise in the API listing. */
const withoutImports = (source: string) =>
  source.replace(/^import[\s\S]*?from '[^']+';\n/gm, '').trim();

const API_SOURCE = [managerSource, helpersSource, handlerSource]
  .map(withoutImports)
  .join('\n\n');

@customElement('analytics-manager-story')
export class AnalyticsManagerStory extends LitElement {
  @state() private method: Method = 'sendEvent';

  @state() private category = '';

  @state() private action = '';

  @state() private label = '';

  @state() private result?: { call: string; url: URL };

  render() {
    const iax = this.method === 'trackIaxParameter';
    return html`
      <service-template
        serviceName="analytics-manager"
        .usage=${USAGE}
        .apiSource=${API_SOURCE}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            Method
            <select @change=${this.pickMethod}>
              ${(
                [
                  'sendEvent',
                  'sendEventNoSampling',
                  'trackIaxParameter',
                ] as Method[]
              ).map(
                (m) =>
                  html`<option value=${m} ?selected=${m === this.method}>
                    ${m}
                  </option>`,
              )}
            </select>
          </label>
          <label>
            Category
            <input
              type="text"
              placeholder="DonatePage"
              autocomplete="off"
              .value=${this.category}
              @input=${(e: Event) =>
                (this.category = (e.target as HTMLInputElement).value)}
            />
          </label>
          <label>
            Action
            <input
              type="text"
              placeholder="LinkClicked"
              autocomplete="off"
              .value=${this.action}
              @input=${(e: Event) =>
                (this.action = (e.target as HTMLInputElement).value)}
            />
          </label>
          <label>
            Label (optional)
            <input
              type="text"
              placeholder="MoreInfoLink"
              autocomplete="off"
              .value=${this.label}
              @input=${(e: Event) =>
                (this.label = (e.target as HTMLInputElement).value)}
            />
          </label>
          <button type="submit">${iax ? 'Track' : 'Send'}</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result
              ? html`<code class="call">${this.result.call}</code>
                  <code class="output"
                    >${this.result.url.origin}${this.result.url.pathname}</code
                  >
                  <table>
                    ${[...this.result.url.searchParams].map(
                      ([key, value]) =>
                        html`<tr>
                          <th scope="row">${key}</th>
                          <td>${value}</td>
                        </tr>`,
                    )}
                  </table>`
              : nothing}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Events go to archive.org's analytics as a tracking pixel ping. This
            page captures the ping URL instead of sending it, so nothing is
            recorded. The <code>cache_bust</code> value is random on every call.
          </p>
          <p>
            <code>trackIaxParameter</code> reads the <code>iax</code> query
            parameter of a URL (<code>?iax=Category|Action|Label</code>). Here
            it's built from the three fields.
          </p>
        </div>
      </service-template>
    `;
  }

  private pickMethod(e: Event) {
    this.method = (e.target as HTMLSelectElement).value as Method;
    this.result = undefined;
  }

  private run(e: Event) {
    e.preventDefault();
    const event = {
      category: this.category,
      action: this.action,
      label: this.label || undefined,
    };
    let sent: string | undefined;
    const realSendBeacon = navigator.sendBeacon;
    // Capture the ping instead of sending it, and put sendBeacon back before
    // returning so nothing else on the page is affected.
    navigator.sendBeacon = (url: string | URL) => {
      sent = String(url);
      return true;
    };
    let call: string;
    try {
      const manager = new AnalyticsManager();
      if (this.method === 'trackIaxParameter') {
        const iax = [this.category, this.action, this.label]
          .join('|')
          .replace(/\|+$/, '');
        const location = `https://archive.org/?iax=${encodeURIComponent(iax)}`;
        new AnalyticsHelpers(manager).trackIaxParameter(location);
        call = `trackIaxParameter(${JSON.stringify(location)})`;
      } else {
        manager[this.method](event);
        call = `${this.method}(${JSON.stringify(event)})`;
      }
    } finally {
      navigator.sendBeacon = realSendBeacon;
    }
    this.result = sent ? { call, url: new URL(sent) } : undefined;
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
        width: 10rem;
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

      table {
        border-collapse: collapse;
        font-size: 0.8rem;
      }

      th,
      td {
        text-align: left;
        padding: 1px 8px 1px 0;
        overflow-wrap: anywhere;
      }
    `;
  }
}
