import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import defaultTheme from '@src/themes/default-theme';

/**
 * A button element to demo the elements library
 */
@customElement('ia-button')
export class IAButton extends LitElement {
  render() {
    return html`
      <button>
        <slot></slot>
      </button>
    `;
  }

  static get styles(): CSSResultGroup {
    return [
      defaultTheme,
      css`
        :host {
          --ia-button-primary-background-color--: var(
            --ia-theme-primary-cta-fill
          );
        }

        button {
          padding: 8px 16px;
          background-color: var(--ia-button-primary-background-color--);
        }
      `,
    ];
  }
}
