import {
  css,
  html,
  LitElement,
  type CSSResultGroup,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML, UnsafeHTMLDirective } from 'lit/directives/unsafe-html.js';

import loaderIconSvg from './loader-icon.svg?raw';
import questionIconSvg from './question-icon.svg?raw';
import { DirectiveResult } from 'lit/directive.js';

declare global {
  interface Window {
    /**
     * Zendesk Messenger API injected by the ze-snippet script.
     * Overloaded to cover the two call shapes we use:
     *   - `messenger:on` — subscribe to open/close lifecycle events
     *   - `messenger`    — imperatively open or close the widget panel
     */
    zE?: {
      (
        target: 'messenger:on',
        event: 'open' | 'close',
        callback: () => void,
      ): void;
      (target: 'messenger', action: 'open' | 'close'): void;
    };
  }
}

/**
 * A lightweight launcher button that loads and opens the Zendesk Messenger
 * widget on demand.
 *
 * The native Zendesk launcher is never shown — this button is the sole entry
 * point. The Zendesk snippet script is fetched lazily on the first click so
 * it does not affect page load performance.
 *
 * @fires zendeskHelpButtonClicked - Dispatched when the user clicks the Help
 *   button, before the widget is opened.
 *
 * @cssprop --button-blue - Button background colour (default: `#194880`).
 * @cssprop --icon-fill-color - SVG icon fill colour (default: `#fff`).
 * @cssprop --link-color - Button text colour (default: `#fff`).
 *
 * @example
 * ```html
 * <ia-zendesk-widget
 *   widget-src="https://static.zdassets.com/ekr/snippet.js?key=YOUR_KEY"
 * ></ia-zendesk-widget>
 * ```
 */
@customElement('ia-zendesk-widget')
export class IAZendeskWidget extends LitElement {
  /** URL of the Zendesk `ze-snippet` loader script, including the `key` query param. */
  @property({ type: String, attribute: 'widget-src' })
  widgetSrc = '';

  /** Controls Help button visibility. Hidden while the widget panel is open. */
  @state() private buttonVisible = true;

  /** True from the first click until Zendesk fires the `open` event. Shows the spinner. */
  @state() private isLoading = false;

  /**
   * Set to `true` after the snippet has loaded and the `messenger:on` listeners
   * have been registered. Prevents duplicate listener registration on
   * subsequent clicks.
   */
  private zendeskReady = false;

  /**
   * Click handler for the Help button.
   *
   * On the first call: injects the Zendesk script, waits for `window.zE` to
   * become available, registers open/close listeners, then opens the panel.
   *
   * On subsequent calls: the script is already present so we go straight to
   * opening the panel. The spinner stays on until Zendesk fires `'open'`.
   */
  private async initiateZenDesk(): Promise<void> {
    this.isLoading = true;
    this.dispatchEvent(new Event('zendeskHelpButtonClicked'));

    try {
      if (!this.zendeskReady) {
        await this.loadZendeskScript();
        await this.waitForZendesk();

        // Register lifecycle listeners exactly once.
        // isLoading is cleared here (not earlier) so the spinner persists until
        // the widget panel is actually visible to the user.
        window.zE!('messenger:on', 'open', () => {
          this.buttonVisible = false;
          this.isLoading = false;
        });

        // Delay matches the Zendesk close animation so the Help button does not
        // reappear while the panel is still sliding out.
        window.zE!('messenger:on', 'close', () => {
          setTimeout(() => {
            this.buttonVisible = true;
          }, 500);
        });

        this.zendeskReady = true;
      }

      window.zE!('messenger', 'open');
    } catch (err) {
      this.isLoading = false;
      // eslint-disable-next-line no-console
      console.error('[ia-zendesk-widget]', err);
    }
  }

  /**
   * Appends the Zendesk snippet `<script>` to `<head>` if it has not already
   * been added. Resolves once the script has loaded; rejects on network error.
   * Guarded by the `ze-snippet` id so multiple widget instances on the same
   * page share a single script tag.
   */
  private loadZendeskScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.getElementById('ze-snippet')) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.id = 'ze-snippet';
      script.src = this.widgetSrc;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Zendesk script'));
      document.head.appendChild(script);
    });
  }

  /**
   * Polls `window.zE` at 100 ms intervals until the Zendesk API is available.
   * The snippet performs its own async initialisation after loading, so
   * `window.zE` may not be set immediately when `script.onload` fires.
   */
  private waitForZendesk(timeoutMs = 10_000): Promise<void> {
    return new Promise((resolve, reject) => {
      const check = setInterval(() => {
        if (window.zE) {
          clearInterval(check);
          clearTimeout(timeout);
          resolve();
        }
      }, 100);
      const timeout = setTimeout(() => {
        clearInterval(check);
        reject(new Error('Zendesk API did not initialise in time'));
      }, timeoutMs);
    });
  }

  private get iconTemplate(): DirectiveResult<typeof UnsafeHTMLDirective> {
    return this.isLoading
      ? unsafeHTML(loaderIconSvg)
      : unsafeHTML(questionIconSvg);
  }

  render(): TemplateResult {
    return html`
      <button
        class="help-widget ${this.buttonVisible ? '' : 'hidden'}"
        @click=${this.initiateZenDesk}
      >
        ${this.iconTemplate}
        <span class="hidden-sm">Help</span>
      </button>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        --button-blue: #194880;
        --white: #fff;
        --icon-fill-color: var(--white);
        --link-color: var(--white);
      }

      .help-widget {
        width: 108px;
        height: 46px;
        margin: 14px 20px;
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 999998;
        background: var(--button-blue);
        color: var(--link-color);
        letter-spacing: 0.6px;
        font-size: inherit;
        transition: opacity 0.12s linear;
        border-radius: 999rem;
        border: 0;
        outline: none;
        font-weight: 700;
        cursor: pointer;
        vertical-align: middle;
      }

      .fill-color {
        fill: var(--icon-fill-color);
      }

      .help-widget svg {
        vertical-align: middle;
        margin-right: 3px;
        pointer-events: none;
      }

      .help-widget .hidden-sm {
        pointer-events: none;
      }

      .hidden {
        opacity: 0;
        display: none;
        visibility: hidden;
      }

      @media (max-width: 767px) {
        .hidden-sm {
          display: none;
        }

        .help-widget {
          padding: 13px;
          width: initial;
        }

        .help-widget svg {
          margin-right: 0;
        }
      }
    `;
  }
}
