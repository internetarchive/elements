import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './ia-sr-only-text';
import '@demo/story-template';

@customElement('ia-sr-only-text-story')
export class IAStatusIndicatorStory extends LitElement {
  /* Whether to use the sr-only-text element */
  @state() textVisible: boolean = false;

  render() {
    return html`
      <story-template
        elementTag="ia-sr-only-text"
        elementClassName="IASrOnlyText"
        defaultSlottedContent="Sample text"
      >
        <div slot="demo">
          ${!this.textVisible
            ? html`<ia-sr-only-text>Sample Text</ia-sr-only-text>`
            : 'Sample Text'}
          <button @click=${() => (this.textVisible = !this.textVisible)}>
            Make text ${this.textVisible ? 'sr-only' : 'visible'}
          </button>
        </div>
        <div slot="usage-notes">
          <p>
            Used to make text available for screen readers but not visible on
            the page.
          </p>
          <p>
            To see the hidden text in this demo, you can use the Chrome
            accessibility tree or your browser's equivalent.
          </p>
        </div>
      </story-template>
    `;
  }
}
