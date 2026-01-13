import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import './ia-button';
import '@demo/story-template';

@customElement('ia-button-story')
export class IAButtonStory extends LitElement {
  @query('#backgroundColor')
  private backgroundColorInput!: HTMLInputElement;

  @query('#textColor')
  private textColorInput!: HTMLInputElement;

  @state()
  private backgroundColor: string = '#194880';

  @state()
  private textColor: string = '#ffffff';

  @query('ia-button')
  private button!: HTMLElement;

  @state()
  private includeStyle = false;

  render() {
    return html`
      <story-template elementTag="ia-button" .exampleUsage=${this.exampleUsage}>
        <div slot="demo">
          <ia-button @click=${() => alert('Button clicked!')}
            >Click Me</ia-button
          >
        </div>

        <div slot="settings">
          <table>
            <tr>
              <td>Text Color</td>
              <td><input type="color" value="#ffffff" id="textColor" /></td>
            </tr>
            <tr>
              <td>Background Color</td>
              <td>
                <input type="color" value="#194880" id="backgroundColor" />
              </td>
            </tr>
          </table>
          <button @click=${this.apply}>Apply</button>
        </div>
      </story-template>
    `;
  }

  private get exampleUsage(): string {
    return this.includeStyle
      ? `<ia-button
  @click=\${() => alert('Button clicked!')}
  style="--ia-theme-primary-cta-fill: ${this.backgroundColor}; --ia-theme-primary-cta-text-color: ${this.textColor}">Click Me</ia-button>`
      : `<ia-button @click=\${() => alert('Button clicked!')}>Click Me</ia-button>`;
  }

  private apply() {
    this.includeStyle = true;
    this.backgroundColor = this.backgroundColorInput.value;
    this.textColor = this.textColorInput.value;
    this.button.style.setProperty(
      '--ia-theme-primary-cta-fill',
      this.backgroundColor,
    );
    this.button.style.setProperty(
      '--ia-theme-primary-cta-text-color',
      this.textColor,
    );
  }
}
