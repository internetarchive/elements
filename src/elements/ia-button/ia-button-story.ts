import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { StyleInputSettings } from '@demo/story-template';

import './ia-button';
import '@demo/story-template';

const styleInputData: StyleInputSettings[] = [
  {
    label: 'Text Color (Primary)',
    cssVariable: '--ia-theme-primary-cta-text-color',
    defaultValue: '#000000',
    inputType: 'color',
  },
  {
    label: 'Background Color (Primary)',
    cssVariable: '--ia-theme-primary-cta-fill',
    defaultValue: '#c8eff4',
    inputType: 'color',
  },
];

@customElement('ia-button-story')
export class IAButtonStory extends LitElement {
  render() {
    return html`
      <story-template
        elementTag="ia-button"
        .exampleUsage=${this.exampleUsage}
        .styleInputData=${styleInputData}
      >
        <div slot="demo">
          <ia-button @click=${() => alert('Button clicked!')}
            >Click Me</ia-button
          >
        </div>
      </story-template>
    `;
  }

  private get exampleUsage(): string {
    return `<ia-button @click=\${() => alert('Button clicked!')}>Click Me</ia-button>`;
  }
}
