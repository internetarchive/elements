import { LitElement, html, css, CSSResult, TemplateResult, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { customElement } from '@src/util/custom-element';

import '@internetarchive/icon-close';
import '@src/elements/ia-status-indicator/ia-status-indicator';

import { ModalConfig } from './modal-config';
import iaLogoIcon from './assets/ia-logo-icon';
import arrowLeftIcon from './assets/arrow-left-icon';

/**
 * The visual shell of the modal: header, body and the buttons that report
 * back to `modal-manager`.
 */
@customElement('ia-modal-manager-template')
@localized()
export class IAModalManagerTemplate extends LitElement {
  /**
   * The ModalConfig that displayed the template
   *
   * @type {ModalConfig}
   * @memberof IAModalManagerTemplate
   */
  @property({ type: Object }) config: ModalConfig = new ModalConfig();

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <div class="modal-wrapper">
        <div class="modal-container">
          <header style="background-color: ${this.config.headerColor}">
            ${this.config.showLeftNavButton
              ? this.leftNavButtonTemplate
              : nothing}
            ${this.config.showCloseButton ? this.closeButtonTemplate : ''}
            ${this.config.showHeaderLogo
              ? html`<div class="logo-icon">${iaLogoIcon()}</div>`
              : nothing}
            ${this.config.title
              ? html`<h1 class="title">${this.config.title}</h1>`
              : ''}
            ${this.config.subtitle
              ? html`<h2 class="subtitle">${this.config.subtitle}</h2>`
              : ''}
          </header>
          <section
            class="modal-body"
            style="background-color: ${this.config.bodyColor}"
          >
            <div class="content">
              <div
                class="processing-logo ${this.config.showProcessingIndicator
                  ? ''
                  : 'hidden'}"
              >
                <ia-status-indicator
                  .mode=${this.config.processingImageMode === 'processing'
                    ? 'loading'
                    : 'success'}
                ></ia-status-indicator>
              </div>
              ${this.config.headline
                ? html` <h1 class="headline">${this.config.headline}</h1> `
                : ''}
              ${this.config.message
                ? html` <p class="message">${this.config.message}</p> `
                : ''}

              <div class="slot-container">
                <slot> </slot>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  /**
   * Dispatch the `closeButtonPressed` event to the consumer
   *
   * @private
   * @memberof IAModalManagerTemplate
   */
  private handleCloseButton(e: Event): void {
    e.preventDefault();
    if (
      e.type === 'keydown' &&
      (e as KeyboardEvent).key !== ' ' &&
      (e as KeyboardEvent).key !== 'Enter'
    ) {
      return;
    }
    const event = new Event('closeButtonPressed');
    this.dispatchEvent(event);
  }

  /**
   * Dispatch the `leftNavButtonPressed` event to the consumer
   *
   * @private
   * @memberof IAModalManagerTemplate
   */
  private handleLeftNavButtonPressed(e: Event): void {
    e.preventDefault();
    if (
      e.type === 'keydown' &&
      (e as KeyboardEvent).key !== ' ' &&
      (e as KeyboardEvent).key !== 'Enter'
    ) {
      return;
    }
    const event = new Event('leftNavButtonPressed');
    this.dispatchEvent(event);
  }

  /**
   * The close button template
   *
   * @readonly
   * @private
   * @type {TemplateResult}
   * @memberof IAModalManagerTemplate
   */
  private get closeButtonTemplate(): TemplateResult {
    return html`
      <button
        type="button"
        class="close-button"
        aria-label=${msg('Close')}
        @click=${this.handleCloseButton}
        @keydown=${this.handleCloseButton}
      >
        <ia-icon-close></ia-icon-close>
      </button>
    `;
  }

  private get leftNavButtonTemplate(): TemplateResult {
    return html`<button
      type="button"
      class="back-button"
      @click=${this.handleLeftNavButtonPressed}
      @keydown=${this.handleLeftNavButtonPressed}
    >
      ${arrowLeftIcon()} ${this.config.leftNavButtonText ?? ''}
    </button> `;
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    const modalLogoSize = css`var(--modalLogoSize, 6.5rem)`;

    const processingImageSize = css`var(--processingImageSize, 7.5rem)`;

    const modalCornerRadius = css`var(--modalCornerRadius, 1rem)`;
    const modalBorder = css`var(--modalBorder, 2px solid black)`;
    // if the content of the modal is too big to fit on screen, this sets the bottom margin
    // it's not exact, but a close estimation
    const modalBottomMarginCss = css`var(--modalBottomMargin, 2.5rem)`;
    const modalTopMarginCss = css`var(--modalTopMargin, 5rem)`;
    const modalHeaderBottomPaddingCss = css`var(--modalHeaderBottomPadding, 0.5em)`;

    const modalBottomPadding = css`var(--modalBottomPadding, 2rem)`;
    const scrollOffset = css`var(--modalScrollOffset, 5px)`;

    const titleFontSize = css`var(--modalTitleFontSize, 1.8rem)`;
    const subtitleFontSize = css`var(--modalSubtitleFontSize, 1.4rem)`;
    const headlineFontSize = css`var(--modalHeadlineFontSize, 1.6rem)`;
    const messageFontSize = css`var(--modalMessageFontSize, 1.4rem)`;

    const titleLineHeight = css`var(--modalTitleLineHeight, normal)`;
    const subtitleLineHeight = css`var(--modalSubtitleLineHeight, normal)`;
    const headlineLineHeight = css`var(--modalHeadlineLineHeight, normal)`;
    const messageLineHeight = css`var(--modalMessageLineHeight, normal)`;

    return css`
      .processing-logo {
        margin: auto;
        width: ${processingImageSize};
        height: ${processingImageSize};
      }

      .processing-logo.hidden {
        height: 1rem;
      }

      .processing-logo.hidden ia-status-indicator {
        display: none;
      }

      ia-status-indicator {
        --icon-width: ${processingImageSize};
        --loading-ring-color--: var(--activityIndicatorLoadingRingColor, #333);
        --loading-dot-color--: var(--activityIndicatorLoadingDotColor, #333);
        --success-icon-color--: var(--activityIndicatorCheckmarkColor, #31a481);
      }

      .modal-wrapper {
        outline: none;
      }

      .modal-container {
        border-radius: ${modalCornerRadius};
        width: 100%;
        margin-top: ${modalTopMarginCss};
      }

      header {
        position: relative;
        background-color: #36a483;
        color: white;
        border-radius: calc(${modalCornerRadius}) calc(${modalCornerRadius}) 0 0;
        border: ${modalBorder};
        border-bottom: 0;
        text-align: center;
        padding-bottom: ${modalHeaderBottomPaddingCss};
      }

      .title {
        margin: 0;
        padding: 0;
        font-size: ${titleFontSize};
        font-weight: bold;
        line-height: ${titleLineHeight};
      }

      .subtitle {
        margin: 0;
        padding: 0;
        font-weight: normal;
        padding-top: 0;
        font-size: ${subtitleFontSize};
        line-height: ${subtitleLineHeight};
      }

      .modal-body {
        background-color: #fbfbfd;
        border-radius: 0 0 calc(${modalCornerRadius}) calc(${modalCornerRadius});
        border: ${modalBorder};
        border-top: 0;
        padding: 0 1rem calc(${modalBottomPadding} - ${scrollOffset}) 1rem;
        color: #333;
        margin-bottom: 2.5rem;
        min-height: 5rem;
      }

      .content {
        overflow-y: auto;
        max-height: calc(100vh - (16.5rem + ${modalBottomMarginCss}));
        min-height: 5rem;
        padding: 0 0 calc(${scrollOffset}) 0;
      }

      .headline {
        font-size: ${headlineFontSize};
        font-weight: bold;
        text-align: center;
        line-height: ${headlineLineHeight};
        margin: 0;
        padding: 0;
      }

      .message {
        margin: 1rem 0 0 0;
        text-align: center;
        font-size: ${messageFontSize};
        line-height: ${messageLineHeight};
      }

      .logo-icon {
        border-radius: 100%;
        border: 3px solid #fff;
        box-shadow:
          0 0 0 1px rgba(0, 0, 0, 0.18),
          0 2px 2px 0 rgba(0, 0, 0, 0.08);
        width: ${modalLogoSize};
        height: ${modalLogoSize};
        margin: -2.9rem auto 0.5rem auto;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .logo-icon svg {
        width: calc(${modalLogoSize} * 0.65);
        height: calc(${modalLogoSize} * 0.65);
      }

      .logo-icon svg .fill-color {
        fill: white;
      }

      .logo-icon svg .stroke-color {
        stroke: red;
      }

      .close-button {
        position: absolute;
        right: 1.2rem;
        top: 1.2rem;
        width: 2rem;
        height: 2rem;
        border-radius: 100%;
        border: 0;
        padding: 0;
        cursor: pointer;
        background-color: white;
        box-shadow:
          0 0 0 1px rgba(0, 0, 0, 0.18),
          0 4px 4px 0 rgba(0, 0, 0, 0.08);
      }

      .back-button {
        position: absolute;
        left: 1.2rem;
        top: 1.2rem;
        height: 2rem;
        background-color: transparent;
        outline: none;
        border: none;
        padding: 0;
        cursor: pointer;
        color: white;
        font-family: inherit;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
      }

      .back-button svg {
        height: 1.5rem;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }

      slot::slotted(.sr-only) {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-modal-manager-template': IAModalManagerTemplate;
  }
}
