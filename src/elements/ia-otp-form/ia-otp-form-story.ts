import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { IAOTPForm } from './ia-otp-form';

import './ia-otp-form';
import '@demo/story-template';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Text color',
    cssVariable: '--ia-theme-primary-text-color',
    defaultValue: '#2c2c2c',
    inputType: 'color',
  },
  {
    label: 'Input font size',
    cssVariable: '--ia-theme-font-size-lg',
    defaultValue: '2.25rem',
    inputType: 'text',
  },
  {
    label: 'Link and error font size',
    cssVariable: '--ia-theme-font-size-standard',
    defaultValue: '0.875rem',
    inputType: 'text',
  },
  {
    label: 'Link font color',
    cssVariable: '--ia-theme-link-color',
    defaultValue: '#4b64ff',
    inputType: 'color',
  },
  {
    label: 'Error message/indicator color',
    cssVariable: '--ia-theme-color-danger',
    defaultValue: '#e51c23',
    inputType: 'color',
  },
  {
    label: 'Success indicator color',
    cssVariable: '--ia-theme-color-success',
    defaultValue: '#31a481',
    inputType: 'color',
  },
];

const propInputSettings: PropInputSettings<IAOTPForm>[] = [
  {
    label: 'Validation Status',
    propertyName: 'validationStatus',
    defaultValue: 'ready',
    inputType: 'radio',
    radioOptions: ['ready', 'loading', 'success', 'error'],
  },
  {
    label: 'New code sending in progress',
    propertyName: 'newCodeSending',
    defaultValue: false,
    inputType: 'radio',
    radioOptions: [true, false],
  },
  {
    label: 'Numeric only',
    propertyName: 'numericOnly',
    defaultValue: true,
    inputType: 'radio',
    radioOptions: [true, false],
  },
  {
    label: 'Number of passcode characters',
    propertyName: 'numPasscodeChars',
    defaultValue: 6,
    inputType: 'number',
  },
];

@customElement('ia-otp-form-story')
export class IAOTPFormStory extends LitElement {
  render() {
    return html`
      <story-template
        elementTag="ia-otp-form"
        elementClassName="IAOTPForm"
        .defaultUsageProps=${"@codeSubmitted=\${(e: CustomEvent) => {setTimeout(() => alert('Code submitted: ' + e.detail), 250);}} \n  @newCodeRequested=\${() => alert('New code requested')}"}
        .styleInputData=${{ settings: styleInputSettings }}
        .propInputData=${{ settings: propInputSettings }}
      >
        <ia-otp-form
          slot="demo"
          @codeSubmitted=${(e: CustomEvent) => {
            setTimeout(() => alert('Code submitted: ' + e.detail), 250);
          }}
          @newCodeRequested=${() => alert('New code requested')}
        ></ia-otp-form>
      </story-template>
    `;
  }
}
