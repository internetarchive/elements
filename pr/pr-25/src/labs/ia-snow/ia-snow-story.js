import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import './ia-snow';
import '../../../demo/story-template';
let IASnowStory = class IASnowStory extends LitElement {
    render() {
        return html `
      <story-template
        elementTag="ia-snow"
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
    get exampleUsage() {
        return this.config
            ? `
      <ia-snow .snowConfig=\${${this.configString}}></ia-snow>
    `
            : `<ia-snow></ia-snow>`;
    }
    get configString() {
        return JSON.stringify(this.config, null, 2);
    }
    get snowflakeConfig() {
        return {
            color: this.colorInput.value,
            count: Number(this.countInput.value),
            wind: this.windInput.checked,
            rotation: this.rotationInput.checked,
        };
    }
    setupSnowflakes() {
        this.config = this.snowflakeConfig;
    }
    static get styles() {
        return css `
      fieldset {
        margin-top: 16px;
      }
    `;
    }
};
__decorate([
    state()
], IASnowStory.prototype, "config", void 0);
__decorate([
    query('#count')
], IASnowStory.prototype, "countInput", void 0);
__decorate([
    query('#wind')
], IASnowStory.prototype, "windInput", void 0);
__decorate([
    query('#rotation')
], IASnowStory.prototype, "rotationInput", void 0);
__decorate([
    query('#color')
], IASnowStory.prototype, "colorInput", void 0);
IASnowStory = __decorate([
    customElement('ia-snow-story')
], IASnowStory);
export { IASnowStory };
//# sourceMappingURL=ia-snow-story.js.map