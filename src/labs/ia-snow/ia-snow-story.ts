import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import './ia-snow';
import type { SnowflakesParams } from 'magic-snowflakes';

@customElement('ia-snow-story')
export class IASnowStory extends LitElement {
  @state() private snowflakesConfig?: SnowflakesParams;

  @query('#count')
  private countInput!: HTMLInputElement;

  @query('#wind')
  private windInput!: HTMLInputElement;

  @query('#rotation')
  private rotationInput!: HTMLInputElement;

  @query('#color')
  private colorInput!: HTMLInputElement;

  render() {
    return html`
      <ia-snow .snowConfig=${this.snowflakesConfig}></ia-snow>

      <fieldset>
        <legend>Settings</legend>
        <table>
          <tr>
            <td>Color</td>
            <td><input type="color" value="#4d94b2" id="color" /></td>
          </tr>
          <tr>
            <td>Count</td>
            <td><input type="number" value="50" id="count" /></td>
          </tr>
          <tr>
            <td>Wind</td>
            <td><input type="checkbox" checked id="wind" /></td>
          </tr>
          <tr>
            <td>Rotation</td>
            <td><input type="checkbox" checked id="rotation" /></td>
          </tr>
        </table>
        <button @click=${this.setupSnowflakes}>Apply</button>
      </fieldset>
    `;
  }

  private setupSnowflakes() {
    const config: SnowflakesParams = {
      color: this.colorInput.value,
      count: Number(this.countInput.value),
      wind: this.windInput.checked,
      rotation: this.rotationInput.checked,
    };
    this.snowflakesConfig = config;
  }

    static get styles(): CSSResultGroup {
      return css`
        fieldset {
          margin-top: 16px;
        }
      `;
    }

}
