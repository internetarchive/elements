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
import '@src/elements/ia-button/ia-button';

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
  /*
   * The state of the validation process.
   *
   * 'ready' is this form's idle state and is deliberately outside
   * `LoadingStatus`: ia-status-indicator renders its space-reserving
   * placeholder for it, which keeps the input row from shifting once
   * validation starts.
   */
  @property({ type: String })
  validationStatus: LoadingStatus | 'ready' = 'ready';

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

    if (changed.has('newCodeSending') && this.newCodeSending && this.OTPInput) {
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
          <ia-button
            mode="link"
            class="new-code-btn"
            part="new-code-button"
            .disabled=${this.validationStatus === 'loading' ||
            this.validationStatus === 'success'}
            @click=${this.handleNewCodeRequested}
          >
            ${msg('Email me another code')}
          </ia-button>
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

        ia-status-indicator {
          --icon-width: calc(var(--font-size-lg--) * 1.33);
        }

        .error-msg {
          margin-top: 10px;
          font-size: var(--font-size-standard--);
          color: var(--color-danger--);
          margin-bottom: -10px;
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
