import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import themeStyles from '@src/themes/theme-styles';

/**
 * Renders an SVG loading indicator, which defualts to an animated circular indicator
 */
@customElement('ia-loading-indicator')
export class IALoadingIndicator extends LitElement {
  render(): TemplateResult {
    return this.circularLoadingIndicatorTemplate;
  }

  /** A circular animated loading indicator */
  private get circularLoadingIndicatorTemplate(): TemplateResult {
    return html`
      <div class="circular-loading-indicator">
        <svg
          viewBox="0 0 120 120"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-labelledby="indicatorTitle indicatorDescription"
        >
          <title id="indicatorTitle">${msg('Loading indicator')}</title>
          <g stroke="none" stroke-width="1" fill-rule="evenodd">
            <path
              id="activity-ring"
              class="loading-ring"
              d="M60,10 C69.8019971,10 78.9452178,12.8205573 86.6623125,17.6943223 L76.4086287,27.9484118 C71.4880919,25.4243078 65.9103784,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 C96,53.3014663 94.1704984,47.0302355 90.9839104,41.6587228 L101.110332,31.5326452 C106.715332,39.6116982 110,49.4222615 110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
            ></path>
            <g
              id="activity-dots"
              class="loading-dots"
              transform="translate(40.000000, 55.000000)"
            >
              <circle id="left-dot" cx="5" cy="5" r="5"></circle>
              <circle id="middle-dot" cx="20" cy="5" r="5"></circle>
              <circle id="right-dot" cx="35" cy="5" r="5"></circle>
            </g>
          </g>
        </svg>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --loading-ring-color--: var(--primary-text-color);
          --loading-dot-color--: var(--primary-text-color);
          --loading-indicator-width--: var(--icon-width);

          display: inline-block;
          width: var(--loading-indicator-width--);
        }

        #activity-ring {
          fill: var(--loading-ring-color--);
        }

        #activity-dots {
          fill: var(--loading-dot-color--);
        }

        .loading-ring {
          animation: rotate 1.3s infinite linear;
          transform-origin: 50px 50px;
          transform-box: fill-box;
        }

        .loading-dots {
          transition: opacity 0.25s ease-out;
        }

        .loading-dots > * {
          opacity: 0;
          animation: dot 1.3s infinite;
        }

        .loading-dots #left-dot {
          animation-delay: 0.2s;
        }

        .loading-dots #middle-dot {
          animation-delay: 0.4s;
        }

        .loading-dots #right-dot {
          animation-delay: 0.6s;
        }

        @keyframes rotate {
          0% {
            transform: rotate(-360deg);
          }
          100% {
            /* This frame is supposed to be inferred, but Safari doesn't rotate it unless we're explicit */
            transform: rotate(0deg);
          }
        }

        @keyframes dot {
          0% {
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `,
    ];
  }
}
