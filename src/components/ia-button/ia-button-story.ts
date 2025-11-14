import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import './ia-button';

@customElement('ia-button-story')
export class IAButtonStory extends LitElement {
  @query('#color')
  private colorInput!: HTMLInputElement;

  @query('ia-button')
  private button!: HTMLElement;

  render() {
    return html`
      <ia-button @click=${() => alert('Button clicked!')}>Click Me</ia-button>

      <fieldset>
        <legend>Settings</legend>
        <table>
          <tr>
            <td>Color</td>
            <td><input type="color" value="#007bff" id="color" /></td>
          </tr>
        </table>
        <button @click=${this.apply}>Apply</button>
      </fieldset>
    `;
  }

  private apply() {
    this.button.style.setProperty(
      '--ia-button-background-color',
      this.colorInput.value,
    );
  }

  static get styles(): CSSResultGroup {
    return css`
      fieldset {
        margin-top: 16px;
      }
    `;
  }
}
