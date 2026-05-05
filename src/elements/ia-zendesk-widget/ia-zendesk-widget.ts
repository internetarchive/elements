import {
  css,
  html,
  nothing,
  LitElement,
  type CSSResultGroup,
  type PropertyValues,
  type SVGTemplateResult,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { loaderIcon } from './loader-icon';
import { questionIcon } from './question-icon';
import { loadZendeskScript, waitForZendesk } from './zendesk-service';

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
 * @cssprop [--button-background=#194880] - Button background colour.
 * @cssprop [--button-color=#fff] - Button text and icon colour.
 * @cssprop [--icon-fill-color=var(--button-color)] - SVG icon fill; defaults to `--button-color`.
 * @cssprop [--button-width=auto] - Button width.
 * @cssprop [--button-padding=13px] - Button padding (overrides fixed width/height when set).
 * @cssprop [--button-margin=14px 20px] - Margin between button and viewport edges.
 * @cssprop [--button-top=auto] - Distance from the top of the viewport.
 * @cssprop [--button-bottom=0] - Distance from the bottom of the viewport.
 * @cssprop [--button-left=auto] - Distance from the left of the viewport.
 * @cssprop [--button-right=0] - Distance from the right of the viewport.
 * @cssprop [--button-z-index=999998] - Stack order.
 * @cssprop [--button-border-radius=999rem] - Border radius.
 * @cssprop [--button-font-size=14px] - Font size.
 * @cssprop [--button-font-weight=700] - Font weight.
 *
 * @prop {number} [breakpoint=767] - Viewport width (px) below which the label is automatically hidden.
 *
 * @example
 * ```html
 * <ia-zendesk-widget
 *   .widgetKey="YOUR_KEY"
 * ></ia-zendesk-widget>
 * ```
 *
 * @example Customised appearance
 * ```html
 * <ia-zendesk-widget
 *   widgetKey="YOUR_KEY"
 *   style="
 *     --button-background: #e03b3b;
 *     --button-width: 130px;
 *     --button-bottom: 20px;
 *     --button-right: 20px;
 *   "
 * ></ia-zendesk-widget>
 * ```
 */
@customElement('ia-zendesk-widget')
export class IAZendeskWidget extends LitElement {
  /** Zendesk account key from the `ze-snippet` URL. */
  @property({ type: String })
  widgetKey = '6fe87bd8-d4e3-4b42-8632-be6eb933d54d';

  /** Viewport width (px) below which the label is automatically hidden. */
  @property({ type: Number })
  breakpoint = 767;

  /** Controls Help button visibility. Hidden while the widget panel is open. */
  @state() private buttonVisible = true;

  /** True from the first click until Zendesk fires the `open` event. Shows the spinner. */
  @state() private isLoading = false;

  /** True when the viewport is narrower than `breakpoint`. */
  @state() private isCompact = false;

  private _mql?: MediaQueryList;
  private _onMqlChange = (e: MediaQueryListEvent) => {
    this.isCompact = e.matches;
  };

  /**
   * Set to `true` after the snippet has loaded and the `messenger:on` listeners
   * have been registered. Prevents duplicate listener registration on
   * subsequent clicks.
   */
  private zendeskReady = false;

  connectedCallback(): void {
    super.connectedCallback();
    this._setupMediaQuery();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._mql?.removeEventListener('change', this._onMqlChange);
  }

  updated(changed: PropertyValues<this>): void {
    if (changed.has('breakpoint')) {
      this._mql?.removeEventListener('change', this._onMqlChange);
      this._setupMediaQuery();
    }
  }

  private _setupMediaQuery(): void {
    this._mql = window.matchMedia(`(max-width: ${this.breakpoint}px)`);
    this.isCompact = this._mql.matches;
    this._mql.addEventListener('change', this._onMqlChange);
  }

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
        await loadZendeskScript(this.widgetKey);
        await waitForZendesk();

        if (!window.zE) {
          this.isLoading = false;
          return;
        }

        // Register lifecycle listeners exactly once.
        // isLoading is cleared here (not earlier) so the spinner persists until
        // the widget panel is actually visible to the user.
        window.zE('messenger:on', 'open', () => {
          this.buttonVisible = false;
          this.isLoading = false;
        });

        // Delay matches the Zendesk close animation so the Help button does not
        // reappear while the panel is still sliding out.
        window.zE('messenger:on', 'close', () => {
          setTimeout(() => {
            this.buttonVisible = true;
          }, 500);
        });

        this.zendeskReady = true;
      }

      if (window.zE) {
        window.zE('messenger', 'open');
      }
    } catch (err) {
      this.isLoading = false;
      console.error('[ia-zendesk-widget]', err);
    }
  }

  private get iconTemplate(): SVGTemplateResult {
    return this.isLoading ? loaderIcon : questionIcon;
  }

  render(): TemplateResult {
    return html`
      <button
        class="help-widget ${this.buttonVisible ? '' : 'hidden'}"
        @click=${this.initiateZenDesk}
      >
        ${this.iconTemplate}
        ${!this.isCompact ? html`<span class="label">Help</span>` : nothing}
      </button>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .help-widget {
        position: fixed;
        top: var(--button-top, auto);
        bottom: var(--button-bottom, 0);
        left: var(--button-left, auto);
        right: var(--button-right, 0);
        z-index: var(--button-z-index, 999998);
        width: var(--button-width, auto);
        padding: var(--button-padding, 14px);
        margin: var(--button-margin, 14px 20px);
        background: var(--button-background, #194880);
        color: var(--button-color, #fff);
        border-radius: var(--button-border-radius, 999rem);
        border: 0;
        font-size: var(--button-font-size, 14px);
        font-weight: var(--button-font-weight, 700);
        letter-spacing: 0.6px;
        outline: none;
        cursor: pointer;
        vertical-align: middle;
        transition: opacity 0.12s linear;
      }

      .fill-color {
        fill: var(--button-color, #fff);
      }

      .help-widget svg {
        vertical-align: middle;
        pointer-events: none;
      }

      .label {
        pointer-events: none;
        margin-right: 3px;
      }

      .hidden {
        opacity: 0;
        display: none;
        visibility: hidden;
      }
    `;
  }
}
