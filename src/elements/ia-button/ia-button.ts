import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

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
      button {
        padding: 8px 16px;
        background-color: var(--ia-button-background-color, #007bff);
      }
    `;
  }
}
