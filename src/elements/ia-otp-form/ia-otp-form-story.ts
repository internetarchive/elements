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
        <div slot="usage-notes">
          For a typical One Time Passcode (OTP) use case, the component can be
          used like so:
          <ul>
            <li>
              The parent component sends the user a code, then displays the
              <code>ia-otp-form</code> component for code entry
            </li>
            <li>
              Once the user finishes entering a code, the component emits a
              <code>codeSubmitted</code> event with the code stored in the event
              <code>detail</code>
            </li>
            <li>
              The parent component sends that code to be verified and sets the
              <code>validationStatus</code> to <code>loading</code>
            </li>
            <li>
              Depending on the result, the parent then sets the
              <code>validationStatus</code> to <code>success</code> or
              <code>error</code> to display a success or error state
            </li>
            <li>
              If the user requests a new code from within the component, it will
              emit a <code>newCodeRequested</code> event and clear the inputs,
              and the parent can set the <code>newCodeSending</code> property to
              <code>true</code> while the code is being sent, then back to
              <code>false</code> when it is ready for entry
            </li>
          </ul>
        </div>
      </story-template>
    `;
  }
}
