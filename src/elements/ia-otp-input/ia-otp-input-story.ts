import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { IAOTPInput } from './ia-otp-input';

import './ia-otp-input';
import '@demo/story-template';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Text color',
    cssVariable: '--ia-theme-primary-text-color',
    defaultValue: '#2c2c2c',
    inputType: 'color',
  },
  {
    label: 'Font size',
    cssVariable: '--ia-theme-font-size-lg',
    defaultValue: '2.25rem',
    inputType: 'text',
  },
];

const propInputSettings: PropInputSettings<IAOTPInput>[] = [
  {
    label: 'Number of characters',
    propertyName: 'numChars',
    defaultValue: 6,
    inputType: 'number',
  },
  {
    label: 'Numeric only',
    propertyName: 'numericOnly',
    defaultValue: true,
    inputType: 'radio',
    radioOptions: [true, false],
  },
  {
    label: 'Prefill value',
    propertyName: 'prefillValue',
    defaultValue: '',
  },
  {
    label: 'Disabled',
    propertyName: 'disabled',
    defaultValue: false,
    inputType: 'radio',
    radioOptions: [true, false],
  },
];

@customElement('ia-otp-input-story')
export class IAOTPInputStory extends LitElement {
  render() {
    return html`
      <story-template
        elementTag="ia-otp-input"
        elementClassName="IAOTPInput"
        .styleInputData=${{ settings: styleInputSettings }}
        .propInputData=${{ settings: propInputSettings }}
      >
        <ia-otp-input slot="demo"></ia-otp-input>
      </story-template>
    `;
  }
}
