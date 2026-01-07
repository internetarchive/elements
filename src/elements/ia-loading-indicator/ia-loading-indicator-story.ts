import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import './ia-loading-indicator';
import '@demo/story-template';

@customElement('ia-loading-indicator-story')
export class IALoadingIndicatorStory extends LitElement {
  @state()
  private styleValues = {
    color: { name: '--primary-text-color', value: '' },
    width: { name: '--icon-width', value: '' },
  };

  render() {
    return html`
      <story-template
        elementTag="ia-loading-indicator"
        .exampleUsage=${this.exampleUsage}
      >
        <div slot="demo">
          <ia-loading-indicator
            style=${this.stringifiedStyles}
          ></ia-loading-indicator>
        </div>
        <div slot="settings">
          <table>
            <tr>
              <td>Color</td>
              <td>
                <input
                  type="color"
                  value="#8be6fa"
                  id="color"
                  @input=${(e: InputEvent) => {
                    const newColor = (e.target as HTMLInputElement).value ?? '';
                    console.log(newColor);
                    this.styleValues.color.value = newColor;
                    console.log(this.styleValues);
                    console.log(this.stringifiedStyles);
                  }}
                />
              </td>
              <td>Width</td>
              <td><input type="string" value="30px" id="width" /></td>
            </tr>
          </table>
        </div>
      </story-template>
    `;
  }

  private get exampleUsage(): string {
    return `<ia-loading-indicator style="${this.styleValues.color.value}"></ia-loading-indicator>`;
  }

  private get stringifiedStyles(): string {
    return Array.from(Object.values(this.styleValues))
      .filter((style) => style.value !== '')
      .map((style) => `${style.name}: ${style.value}`)
      .join(' ');
  }
}
