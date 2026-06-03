import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@demo/story-template';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { PropInputSettings } from '@demo/story-components/story-prop-settings';

import type { IAButton } from './ia-button';
import './ia-button';

const propInputSettings: PropInputSettings<IAButton>[] = [
  {
    label: 'Mode',
    propertyName: 'mode',
    defaultValue: 'primary',
    inputType: 'radio',
    radioOptions: [
      'primary',
      'secondary',
      'danger',
      'warning',
      'disabled',
      'transparent',
      'custom',
      'link',
      'danger-link',
    ],
  },
  {
    label: 'Disabled',
    propertyName: 'disabled',
    defaultValue: false,
    inputType: 'radio',
    radioOptions: [true, false],
  },
  {
    label: 'Loading',
    propertyName: 'loading',
    defaultValue: false,
    inputType: 'radio',
    radioOptions: [true, false],
  },
  {
    label: 'Loading text',
    propertyName: 'loadingText',
    defaultValue: '',
    inputType: 'text',
  },
  {
    label: 'Type',
    propertyName: 'type',
    defaultValue: 'button',
    inputType: 'radio',
    radioOptions: ['button', 'submit', 'reset'],
  },
  {
    label: 'Link to attach to button',
    propertyName: 'href',
    defaultValue: '',
    inputType: 'text',
  },
];

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Button padding',
    cssVariable: '--ia-theme-button-padding',
    defaultValue: '0 1.875rem',
    inputType: 'text',
  },
  {
    label: 'Button width',
    cssVariable: '--ia-theme-button-width',
    defaultValue: 'fit-content',
    inputType: 'text',
  },
  {
    label: 'Button height',
    cssVariable: '--ia-theme-button-height',
    defaultValue: '2.25rem',
    inputType: 'text',
  },
  {
    label: 'Button border width',
    cssVariable: '--ia-theme-button-border-width',
    defaultValue: '1px',
    inputType: 'text',
  },
  {
    label: 'Font',
    cssVariable: '--ia-theme-base-font-family',
    defaultValue: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    inputType: 'text',
  },
  {
    label: 'Transition',
    cssVariable: '--ia-button-transition',
    defaultValue: 'all 0.1s ease 0s',
    inputType: 'text',
  },
  {
    label: 'Text color (primary)',
    cssVariable: '--ia-theme-primary-cta-text-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Background color (primary)',
    cssVariable: '--ia-theme-primary-cta-fill',
    defaultValue: '#194880',
    inputType: 'color',
  },
  {
    label: 'Border color (primary)',
    cssVariable: '--ia-theme-primary-cta-border',
    defaultValue: '#c5d1df',
    inputType: 'color',
  },
  {
    label: 'Text color (secondary)',
    cssVariable: '--ia-theme-secondary-cta-text-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Background color (secondary)',
    cssVariable: '--ia-theme-secondary-cta-fill',
    defaultValue: '#333333',
    inputType: 'color',
  },
  {
    label: 'Border color (secondary)',
    cssVariable: '--ia-theme-secondary-cta-border',
    defaultValue: '#666666',
    inputType: 'color',
  },
  {
    label: 'Text color (danger)',
    cssVariable: '--ia-theme-danger-cta-text-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Background color (danger)',
    cssVariable: '--ia-theme-danger-cta-fill',
    defaultValue: '#d9534f',
    inputType: 'color',
  },
  {
    label: 'Border color (danger)',
    cssVariable: '--ia-theme-danger-cta-border',
    defaultValue: '#d43f3a',
    inputType: 'color',
  },
  {
    label: 'Text color (warning)',
    cssVariable: '--ia-theme-warning-cta-text-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Background color (warning)',
    cssVariable: '--ia-theme-warning-cta-fill',
    defaultValue: '#ee8950',
    inputType: 'color',
  },
  {
    label: 'Border color (warning)',
    cssVariable: '--ia-theme-warning-cta-border',
    defaultValue: '#ec7939',
    inputType: 'color',
  },
  {
    label: 'Text color (disabled)',
    cssVariable: '--ia-theme-disabled-cta-text-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Background color (disabled)',
    cssVariable: '--ia-theme-disabled-cta-fill',
    defaultValue: '#666666',
    inputType: 'color',
  },
  {
    label: 'Border color (disabled)',
    cssVariable: '--ia-theme-disabled-cta-border',
    defaultValue: '#999999',
    inputType: 'color',
  },
  {
    label: 'Text color (custom)',
    cssVariable: '--ia-button-custom-text-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Background color (custom)',
    cssVariable: '--ia-button-custom-fill',
    defaultValue: '#194880',
    inputType: 'color',
  },
  {
    label: 'Border color (custom)',
    cssVariable: '--ia-button-custom-border',
    defaultValue: '#c5d1df',
    inputType: 'color',
  },
  {
    label: 'Text color (custom, on hover)',
    cssVariable: '--ia-button-custom-active-text-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Background color (custom, on hover)',
    cssVariable: '--ia-button-custom-active-fill',
    defaultValue: '#194880',
    inputType: 'color',
  },
  {
    label: 'Border color (custom, on hover)',
    cssVariable: '--ia-button-custom-active-border',
    defaultValue: '#c5d1df',
    inputType: 'color',
  },
  {
    label: 'Link color',
    cssVariable: '--ia-theme-link-color',
    defaultValue: '#4b64ff',
    inputType: 'color',
  },
  {
    label: 'Danger color',
    cssVariable: '--ia-theme-color-danger',
    defaultValue: '#e51c23',
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
        .propInputData=${{ settings: propInputSettings }}
      >
        <ia-button slot="demo" @click=${() => alert('Button clicked!')}>
          Click Me
        </ia-button>
      </story-template>
    `;
  }
}
