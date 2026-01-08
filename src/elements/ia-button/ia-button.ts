import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import themeStyles from '@src/themes/theme-styles';

/**
 * A button element to demo the elements library
 *
 * @slot The content of the button
 *
 * @cssprop --ia-button-background-color - The background color of the button
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
      themeStyles,
      css`
        :host {
          --ia-button-primary-background-color--: var(--primary-cta-fill);
        }

        button {
          padding: 8px 16px;
          background-color: var(--ia-button-primary-background-color--);
        }
      `,
    ];
  }
}
