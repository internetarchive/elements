import {
  html,
  LitElement,
  TemplateResult,
  CSSResultGroup,
  css,
  nothing,
  PropertyValues,
} from 'lit';
import { msg } from '@lit/localize';
import { property, customElement, query } from 'lit/decorators.js';

import themeStyles from '@src/themes/theme-styles';

import type { IAOTPInput } from '@src/elements/ia-otp-input/ia-otp-input';
import type { LoadingStatus } from '@src/elements/ia-status-indicator/ia-status-indicator';

import '@src/elements/ia-status-indicator/ia-status-indicator';
import '@src/elements/ia-otp-input/ia-otp-input';

/**
 * Custom events fired by the component
 */
const Events = {
  NewCodeRequested: 'newCodeRequested',
  CodeSubmitted: 'codeSubmitted', // Bubbles up from ia-otp-input
};

/**
 * Form for entering OTP codes, including success/loading/error states and a request new code button
 */
@customElement('ia-otp-form')
export class IAOTPForm extends LitElement {
  /* The state of the validation process */
  @property({ type: String })
  validationStatus: LoadingStatus = 'ready';

  /* Whether to display a loading indicator instead of the button text */
  @property({ type: Boolean })
  newCodeSending: boolean = false;

  /* Number of characters to expect for the passcode */
  @property({ type: Number })
  numPasscodeChars: number = 6;

  /* Whether to restrict entry to numeric characters */
  @property({ type: Boolean })
  numericOnly: boolean = true;

  @query('ia-otp-input')
  private OTPInput!: IAOTPInput;

  render(): TemplateResult {
    return html`
      <div class="input-section">
        <ia-otp-input
          .numChars=${this.numPasscodeChars}
          ?numericOnly=${this.numericOnly}
          ?disabled=${this.validationStatus === 'loading' ||
          this.validationStatus === 'success'}
        ></ia-otp-input>
        <ia-status-indicator
          class="status-indicator"
          part="status-indicator"
          .mode=${this.validationStatus}
        ></ia-status-indicator>
      </div>
      ${this.validationStatus === 'error'
        ? html`<p class="error-msg">
            ${msg('The code entered is invalid or expired')}
          </p>`
        : nothing}
      ${this.resendCodeButtonTemplate}
    `;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (
      changed.has('validationStatus') &&
      this.OTPInput &&
      this.validationStatus === 'error'
    ) {
      this.OTPInput.prefillValue = '';
    }
  }

  /* The button to display to send a new code */
  private get resendCodeButtonTemplate(): TemplateResult {
    return this.newCodeSending
      ? html`<span part="new-code-message" class="new-code-msg"
          >${msg('Emailing...')}</span
        >`
      : html`
          <button
            class="new-code-btn link"
            part="new-code-button"
            .disabled=${this.validationStatus === 'loading' ||
            this.validationStatus === 'success'}
            @click=${this.handleNewCodeRequested}
          >
            ${msg('Email me another code')}
          </button>
        `;
  }

  /* Emits an event to request the new code */
  private async handleNewCodeRequested(): Promise<void> {
    this.dispatchEvent(
      new CustomEvent(Events.NewCodeRequested, {
        bubbles: true,
        composed: true,
      }),
    );
    this.OTPInput.prefillValue = '';
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --font-size-standard--: var(--font-size-standard);
          --font-size-lg--: var(--font-size-lg);
          --color-success--: var(--color-success);
          --color-danger--: var(--color-danger);
          --link-color--: var(--link-color);

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .input-section {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .status-indicator {
          --icon-width: calc(var(--font-size-lg--) * 1.33);
        }

        .error-msg {
          margin-top: 10px;
          font-size: var(--font-size-standard--);
          color: var(--color-danger--);
          margin-bottom: -10px;
        }

        .new-code-btn {
          font-family: inherit;
          font-size: var(--font-size-standard--);
          display: block;
          width: fit-content;
          margin-top: 10px;
          border: 0;
          padding: 0;
          appearance: none;
          background: none;
          color: var(--link-color--);
          text-decoration: none;
          cursor: pointer;
        }

        .new-code-btn:hover,
        .new-code-btn:focus {
          text-decoration: underline;
        }

        .new-code-msg {
          margin-top: 10px;
          font-size: var(--font-size-standard--);
          color: var(--link-color--);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `,
    ];
  }
}
