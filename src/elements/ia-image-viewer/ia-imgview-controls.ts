import {
  css,
  type CSSResultGroup,
  html,
  LitElement,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import themeStyles from '@src/themes/theme-styles';

/**
 * The image viewer's previous / next buttons and the "n / total" counter.
 *
 * Past the wide breakpoint the buttons position themselves over the image
 * area, which lives in the viewer's shadow root. That works because an
 * absolutely positioned element finds its containing block through the flat
 * tree, so the viewer's frame is still the reference as long as this element's
 * own host box stays unpositioned. The breakpoint queries the `image-viewer`
 * container by name, so it tracks the viewer's width rather than whichever
 * container a consumer happens to have further up the tree.
 */
@customElement('ia-imgview-controls')
export class IAImageViewerControls extends LitElement {
  /** Zero-based index of the image being shown, for the counter. */
  @property({ type: Number }) currentIndex = 0;

  @property({ type: Number }) totalImages = 0;

  render(): TemplateResult {
    return html`
      <button
        class="nav-btn prev"
        aria-label=${msg('Previous image')}
        @click=${this.onPrevious}
      >
        &#8249;
      </button>
      <div class="counter">${this.currentIndex + 1} / ${this.totalImages}</div>
      <button
        class="nav-btn next"
        aria-label=${msg('Next image')}
        @click=${this.onNext}
      >
        &#8250;
      </button>
    `;
  }

  private onPrevious(): void {
    this.dispatchEvent(new CustomEvent('showPrevious'));
  }

  private onNext(): void {
    this.dispatchEvent(new CustomEvent('showNext'));
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --imgview-controls-text-color--: var(
            --image-viewer-text-color,
            var(--true-white)
          );

          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-top: 0.8rem;
        }

        .nav-btn {
          width: 40px;
          background: transparent;
          color: var(--imgview-controls-text-color--);
          border: none;
          cursor: pointer;
          font-size: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.5;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
          transition: opacity 0.15s;
        }

        .nav-btn:hover {
          opacity: 1;
        }

        .nav-btn:focus-visible {
          outline: 2px solid rgba(255, 255, 255, 0.8);
          outline-offset: -2px;
        }

        .counter {
          color: var(--imgview-controls-text-color--);
          font-size: 14px;
          font-weight: 200;
          letter-spacing: 0.05em;
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-btn {
            transition: none;
          }
        }

        @container image-viewer (min-width: 890px) {
          :host {
            position: static;
            width: auto;
            margin-top: 0;
          }

          .nav-btn {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 60px;
            font-size: 60px;
            z-index: 1;
          }

          .prev {
            left: 0;
          }

          .next {
            right: 0;
          }

          .counter {
            margin-top: 0.8rem;
          }
        }
      `,
    ];
  }
}
