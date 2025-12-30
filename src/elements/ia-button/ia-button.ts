import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import baseTheme from '@src/themes/base-theme';

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
    return css`
      :host {
        --ia-button-primary-background-color--: var(
          --ia-button-primary-background-color,
          ${baseTheme.primaryCTAFill}
        );
      }

      button {
        padding: 8px 16px;
        background-color: var(--ia-button-primary-background-color--);
      }
    `;
  }
}
