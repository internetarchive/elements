import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import './ia-button';
import '@demo/story-template';

@customElement('ia-button-story')
export class IAButtonStory extends LitElement {
  @query('#color')
  private colorInput!: HTMLInputElement;

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
              <td>Color</td>
              <td><input type="color" value="#9f0a5f" id="color" /></td>
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
  style="--ia-theme-primary-cta-fill: ${this.colorInput.value}">Click Me</ia-button>`
      : `<ia-button @click=\${() => alert('Button clicked!')}>Click Me</ia-button>`;
  }

  private apply() {
    this.includeStyle = true;
    this.button.style.setProperty(
      '--ia-theme-primary-cta-fill',
      this.colorInput.value,
    );
  }
}
