import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import './ia-loading-indicator';
import '@demo/story-template';

@customElement('ia-loading-indicator-story')
export class IALoadingIndicatorStory extends LitElement {
  @query('#color')
  private colorInput!: HTMLInputElement;

  @query('ia-loading-indicator')
  private loadingIndicator!: HTMLElement;

  @state()
  private includeStyle = false;

  render() {
    return html`
      <story-template
        elementTag="ia-loading-indicator"
        .exampleUsage=${this.exampleUsage}
      >
        <div slot="demo">
          <ia-loading-indicator></ia-loading-indicator>
        </div>

        <div slot="settings">
          <table>
            <tr>
              <td>Color</td>
              <td><input type="color" value="#ffffff" id="color" /></td>
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
  style="--primary-text-color: ${this.colorInput.value}">Click Me</ia-button>`
      : `<ia-button @click=\${() => alert('Button clicked!')}>Click Me</ia-button>`;
  }

  private apply() {
    this.includeStyle = true;
    this.loadingIndicator.style.setProperty(
      '--primary-text-color',
      this.colorInput.value,
    );
  }
}
