import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import './ia-snow';
import type { SnowflakesParams } from 'magic-snowflakes';
import '@demo/story-template';

@customElement('ia-snow-story')
export class IASnowStory extends LitElement {
  @state() private config?: SnowflakesParams;

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
      <story-template
        elementTag="ia-snow"
        elementClassName="IASnow"
        .exampleUsage=${this.exampleUsage}
        labs
      >
        <div slot="demo">
          <ia-snow .snowConfig=${this.config}></ia-snow>
        </div>

        <div slot="settings">
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
        </div>
      </story-template>
    `;
  }

  private get exampleUsage(): string {
    return this.config
      ? `
      <ia-snow .snowConfig=\${${this.configString}}></ia-snow>
    `
      : `<ia-snow></ia-snow>`;
  }

  private get configString(): string {
    return JSON.stringify(this.config, null, 2);
  }

  private get snowflakeConfig(): SnowflakesParams {
    return {
      color: this.colorInput.value,
      count: Number(this.countInput.value),
      wind: this.windInput.checked,
      rotation: this.rotationInput.checked,
    };
  }

  private setupSnowflakes() {
    this.config = this.snowflakeConfig;
  }

  static get styles(): CSSResultGroup {
    return css`
      fieldset {
        margin-top: 16px;
      }
    `;
  }
}
