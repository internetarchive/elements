import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import './ia-button';
import '../../internal/story-template';

@customElement('ia-button-story')
export class IAButtonStory extends LitElement {
  @query('#color')
  private colorInput!: HTMLInputElement;

  @query('ia-button')
  private button!: HTMLElement;

  render() {
    return html`
      <story-template title="<ia-button>">
        <div slot="demo">
          <ia-button @click=${() => alert('Button clicked!')}
            >Click Me</ia-button
          >
        </div>

        <div slot="usage">
          <pre><code>&lt;ia-button @click=&dollar;{() => alert('Button clicked!')}&gt;Click Me&lt;/ia-button&gt;</code></pre>
        </div>

        <div slot="settings">
          <table>
            <tr>
              <td>Color</td>
              <td><input type="color" value="#007bff" id="color" /></td>
            </tr>
          </table>
          <button @click=${this.apply}>Apply</button>
        </div>
      </story-template>
    `;
  }

  private apply() {
    this.button.style.setProperty(
      '--ia-button-background-color',
      this.colorInput.value,
    );
  }
}
