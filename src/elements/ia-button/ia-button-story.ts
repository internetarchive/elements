import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';

import './ia-button';
import '@demo/story-template';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Text Color (Primary)',
    cssVariable: '--ia-theme-primary-cta-text-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Background Color (Primary)',
    cssVariable: '--ia-theme-primary-cta-fill',
    defaultValue: '#194880',
    inputType: 'color',
  },
];

@customElement('ia-button-story')
export class IAButtonStory extends LitElement {
  render() {
    return html`
      <story-template
        elementTag="ia-button"
        elementClassName="IAButton"
        .defaultUsageProps=${`@click=\${() => alert('Button clicked!')}`}
        .styleInputData=${{ settings: styleInputSettings }}
      >
        <div slot="demo">
          <ia-button @click=${() => alert('Button clicked!')}
            >Click Me</ia-button
          >
        </div>
      </story-template>
    `;
  }
}
