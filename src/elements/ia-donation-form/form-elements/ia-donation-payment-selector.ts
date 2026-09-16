import {
  css,
  html,
  LitElement,
  nothing,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import themeStyles from '@src/themes/theme-styles';
import type { PaymentProvidersInterface } from '../braintree/payment-providers-interface';
import { applePayLogo, googlePayLogo, paypalLogo, venmoLogo } from '../icons';

/** A provider button starts hidden-but-reserved, then shows or disappears once its availability is known. */
const PaymentButtonMode = {
  Loading: 'loading',
  Available: 'available',
  Unavailable: 'unavailable',
} as const;

type PaymentButtonMode =
  (typeof PaymentButtonMode)[keyof typeof PaymentButtonMode];

type PaymentMode = 'apple' | 'google' | 'venmo' | 'cc' | 'paypal';

/**
 * The row of payment method buttons. Each provider button asks its handler
 * whether the browser supports it and hides itself if not. Once one is picked
 * the others collapse behind a "Change payment method" button.
 *
 * The real PayPal button is slotted in from the light DOM (it can't live in
 * a shadow root); the local PayPal button sits over it to catch clicks while
 * the donation amount is invalid.
 */
@customElement('ia-donation-payment-selector')
export class IADonationPaymentSelector extends LitElement {
  @property({ type: Boolean }) donationInfoValid = true;

  @property({ type: Object }) paymentProviders?: PaymentProvidersInterface;

  @state() private applePayMode: PaymentButtonMode = PaymentButtonMode.Loading;

  @state() private googlePayMode: PaymentButtonMode = PaymentButtonMode.Loading;

  @state() private venmoMode: PaymentButtonMode = PaymentButtonMode.Loading;

  @state() private payPalMode: PaymentButtonMode = PaymentButtonMode.Loading;

  @state() private paymentModeSelected?: PaymentMode;

  render(): TemplateResult {
    const paymentSelectedCss = this.paymentModeSelected
      ? 'payment-selected'
      : '';
    return html`
      <div
        class="payment-container ${this.donationInfoValid
          ? 'donation-info-valid'
          : 'donation-info-invalid'} ${paymentSelectedCss}"
      >
        <div class="payment-provider-container">
          <button
            class="applepay provider-button ${this.applePayMode} ${this
              .paymentModeSelected === 'apple'
              ? 'selected'
              : ''}"
            aria-label=${msg('Pay with Apple Pay')}
            @click=${(e: Event) => {
              this.paymentModeSelected = 'apple';
              this.applePaySelected(e);
            }}
          >
            <div class="payment-image">${applePayLogo}</div>
          </button>

          <button
            class="googlepay provider-button ${this.googlePayMode} ${this
              .paymentModeSelected === 'google'
              ? 'selected'
              : ''}"
            aria-label=${msg('Pay with Google Pay')}
            @click=${() => {
              this.paymentModeSelected = 'google';
              this.googlePaySelected();
            }}
          >
            <div class="payment-image">${googlePayLogo}</div>
          </button>

          <button
            class="venmo provider-button ${this.venmoMode} ${this
              .paymentModeSelected === 'venmo'
              ? 'selected'
              : ''}"
            aria-label=${msg('Pay with Venmo')}
            @click=${() => {
              this.paymentModeSelected = 'venmo';
              this.venmoSelected();
            }}
          >
            <div class="payment-image">${venmoLogo}</div>
          </button>

          <div
            class="paypal-container provider-button ${this.payPalMode} ${this
              .paymentModeSelected === 'paypal'
              ? 'selected'
              : ''}"
          >
            <div class="payment-image">
              <button
                class="paypal-local-button"
                aria-label=${msg('Pay with PayPal')}
                @click=${() => {
                  this.paymentModeSelected = 'paypal';
                  this.localPaypalButtonClicked();
                }}
              >
                ${paypalLogo}
              </button>
              <slot name="paypal-button"></slot>
            </div>
          </div>
        </div>

        <div class="credit-card-container">
          <button
            @click=${() => {
              this.paymentModeSelected = 'cc';
              this.creditCardSelected();
            }}
            class="button-style credit-card-button ${this
              .paymentModeSelected === 'cc'
              ? 'selected'
              : ''}"
          >
            <div class="cc-title">${msg('Credit Card')}</div>
            <div class="cc-background"></div>
          </button>
        </div>
      </div>

      ${this.paymentModeSelected
        ? html`
            <button
              id="change-payment-method"
              @click=${() => {
                this.paymentModeSelected = undefined;
                this.dispatchEvent(new Event('resetPaymentMethod'));
                this.setButtonVisibility();
              }}
            >
              ${msg('Change payment method')}
            </button>
          `
        : nothing}
    `;
  }

  firstUpdated(): void {
    this.dispatchEvent(new Event('firstUpdated'));
  }

  updated(changed: PropertyValues): void {
    if (changed.has('paymentProviders')) {
      this.setButtonVisibility();
    }
  }

  showPaypalButton(): void {
    this.payPalMode = PaymentButtonMode.Available;
  }

  /** Asks each provider whether this browser can use it, and shows or hides its button. */
  private async setButtonVisibility(): Promise<void> {
    const providers = this.paymentProviders;
    if (!providers) return;

    const mode = (supported: boolean): PaymentButtonMode =>
      supported ? PaymentButtonMode.Available : PaymentButtonMode.Unavailable;

    providers.venmoHandler
      .get()
      .then(async (handler) => {
        if (!handler) return false;
        return handler.isBrowserSupported();
      })
      .then((supported) => {
        this.venmoMode = mode(supported);
      })
      .catch((reason) => {
        console.error('venmo unavailable', reason);
        this.venmoMode = PaymentButtonMode.Unavailable;
      });

    providers.applePayHandler
      .get()
      .then((handler) => handler.isAvailable())
      .then((supported) => {
        this.applePayMode = mode(supported);
      })
      .catch((reason) => {
        console.error('apple pay unavailable', reason);
        this.applePayMode = PaymentButtonMode.Unavailable;
      });

    providers.googlePayHandler
      .get()
      .then((handler) => handler.isBrowserSupported())
      .then((supported) => {
        this.googlePayMode = mode(supported);
      })
      .catch((reason) => {
        console.error('google pay unavailable', reason);
        this.googlePayMode = PaymentButtonMode.Unavailable;
      });
  }

  private googlePaySelected(): void {
    this.dispatchEvent(new Event('googlePaySelected'));
  }

  private applePaySelected(e: Event): void {
    this.dispatchEvent(
      new CustomEvent('applePaySelected', { detail: { originalEvent: e } }),
    );
  }

  private venmoSelected(): void {
    this.dispatchEvent(new Event('venmoSelected'));
  }

  private creditCardSelected(): void {
    this.dispatchEvent(new Event('creditCardSelected'));
  }

  private localPaypalButtonClicked(): void {
    this.dispatchEvent(new Event('paypalBlockerSelected'));
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --donation-selector-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-selector-button-width--: var(
            --ia-donation-payment-button-width,
            calc(var(--donation-selector-base-font-size--) * 5)
          );
          --donation-selector-button-height--: var(
            --ia-donation-payment-button-height,
            calc(var(--donation-selector-base-font-size--) * 3.2)
          );
          --donation-selector-cc-font-size--: var(
            --ia-donation-credit-card-font-size,
            calc(var(--donation-selector-base-font-size--) * 1.8)
          );
          --donation-selector-cc-font-color--: var(
            --ia-donation-credit-card-button-font-color,
            var(--mid-gray)
          );
          --donation-selector-cc-color--: var(
            --ia-donation-credit-card-button-color,
            var(--true-white)
          );
        }

        button {
          color: inherit;
          font-family: inherit;
        }

        .payment-container {
          width: 100%;
        }

        .payment-provider-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-gap: var(--donation-selector-base-font-size--);
          margin-bottom: var(--donation-selector-base-font-size--);
          max-width: calc(var(--donation-selector-base-font-size--) * 23);
        }

        .provider-button {
          border: 0;
          padding: 0;
          background: none;
          cursor: pointer;
          width: var(--donation-selector-button-width--);
          height: var(--donation-selector-button-height--);
        }

        .provider-button.unavailable {
          display: none;
        }

        .provider-button.loading {
          border: 1px solid #ddd;
          border-radius: 2px;
          /* Accounts for the border that goes away once the provider loads, so the layout doesn't shift */
          margin-bottom: -2px;
        }

        .provider-button.loading .payment-image {
          display: none;
        }

        .payment-image,
        .brand-logo {
          width: 100%;
          height: 100%;
        }

        .brand-logo {
          display: block;
          object-fit: contain;
        }

        .paypal-local-button {
          position: absolute;
          border: 0;
          padding: 0;
          background: none;
          cursor: pointer;
          width: var(--donation-selector-button-width--);
          height: var(--donation-selector-button-height--);
        }

        .donation-info-valid .paypal-local-button {
          z-index: 0;
        }

        .donation-info-invalid .paypal-local-button {
          z-index: 250;
        }

        .credit-card-button {
          color: var(--donation-selector-cc-font-color--);
          background-color: var(--donation-selector-cc-color--);
          border: 1px solid var(--mid-gray);
          border-radius: 4px;
          cursor: pointer;
          margin: 0;
          padding: calc(var(--donation-selector-base-font-size--) * 0.7)
            var(--donation-selector-base-font-size--);
          width: 100%;
        }

        .credit-card-button .cc-background {
          height: calc(var(--donation-selector-base-font-size--) * 2.4);
          width: 100%;
          background-repeat: no-repeat;
          background-image: url(https://archive.org/images/cc_logos.png);
          background-position: 50% 50%;
          background-size: contain;
        }

        .credit-card-button .cc-title {
          font-size: var(--donation-selector-cc-font-size--);
          font-weight: 700;
          margin-bottom: var(--padding-sm);
        }

        button#change-payment-method {
          margin-top: 10px;
          background: var(--true-white);
          border: 1px solid;
          border-radius: 3px;
          padding: 5px;
          cursor: pointer;
        }

        .payment-selected .provider-button:not(.selected),
        .payment-selected .credit-card-button:not(.selected) {
          display: none;
        }
      `,
    ];
  }
}
