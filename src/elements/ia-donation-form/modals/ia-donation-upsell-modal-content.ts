import {
  css,
  html,
  LitElement,
  nothing,
  type CSSResultGroup,
  type TemplateResult,
} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import themeStyles from '@src/themes/theme-styles';
import { CurrencyValidator } from '../currency-validator';

/** How the "yes" side of the upsell is offered: our own button, or a slot for the PayPal button. */
export const UpsellModalCTAMode = {
  YesButton: 'YesButton',
  PayPalUpsellSlot: 'PayPalUpsellSlot',
} as const;

export type UpsellModalCTAMode =
  (typeof UpsellModalCTAMode)[keyof typeof UpsellModalCTAMode];

/**
 * The content of the upsell modal shown after a one-time donation: a thank
 * you, a monthly amount field, and a yes button (or the PayPal button, when
 * the donation came through PayPal).
 */
@customElement('ia-donation-upsell-modal-content')
export class IADonationUpsellModalContent extends LitElement {
  @property({ type: String }) yesButtonMode: UpsellModalCTAMode =
    UpsellModalCTAMode.YesButton;

  @property({ type: Number }) amount = 5;

  @property({ type: Object }) error?: TemplateResult;

  @query('#amount-input') amountInput!: HTMLInputElement;

  private currencyValidator: CurrencyValidator = new CurrencyValidator();

  render(): TemplateResult {
    return html`
      <h3>${msg('Thank you for donating!')}</h3>
      <button @click=${this.noThanksSelected} class="cta-button" id="no-button">
        ${msg('Continue')}
      </button>
      <p class="or_separator"><span>${msg('or')}</span></p>
      <h3>${msg('Join our Monthly Giving Circle')}</h3>
      <p class="appeal">
        ${msg('Monthly support helps us reliably plan for the future.')}
      </p>
      <div class="monthly-amount">
        <h1>${msg('Enter your monthly amount')}</h1>
        <div class="amount-input">
          <span class="dollar-symbol">$</span>
          <input
            id="amount-input"
            type="text"
            tabindex="0"
            aria-label=${msg('Monthly amount in dollars')}
            value=${this.amount}
            @input=${this.amountChanged}
            @keydown=${this.currencyValidator.keydown}
          />
        </div>
        <div class="error ${this.error ? '' : 'hidden'}">${this.error}</div>
      </div>

      ${this.yesButton}
    `;
  }

  private get yesButton(): TemplateResult | typeof nothing {
    switch (this.yesButtonMode) {
      case UpsellModalCTAMode.YesButton:
        return html`
          <button
            class="cta-button"
            tabindex="0"
            id="yes-button"
            @click=${this.yesSelected}
            .disabled=${this.error !== undefined}
          >
            ${msg("YES, I'll donate monthly")}
          </button>
        `;
      case UpsellModalCTAMode.PayPalUpsellSlot:
        return html`
          <div class="paypal-upsell-slot-container">
            <div
              class="paypal-upsell-slot-blocker ${this.error ? '' : 'hidden'}"
            ></div>
            <button class="cta-button" id="paypal-cover-button">
              ${msg("YES, I'll donate monthly")}
            </button>
            <slot class="paypal-upsell-slot"></slot>
          </div>
        `;
      default:
        return nothing;
    }
  }

  private amountChanged(e: Event): void {
    const target = e.target as HTMLInputElement;
    const amount = target.value;
    if (amount.length === 0) {
      return;
    }
    this.handleCustomAmountInput(amount);
  }

  private handleCustomAmountInput(value: string): void {
    const amount = parseFloat(value);
    if (isNaN(amount)) {
      this.error = html`${msg('Please enter a valid amount.')}`;
    } else {
      this.processAmount(amount);
    }
  }

  private processAmount(amount: number): void {
    if (amount >= 10000) {
      this.error = msg(html`
        To make a donation of $10,000 or more, please contact our philanthropy
        department at
        <a href="mailto:donations@archive.org">donations@archive.org</a>
      `);
      return;
    }

    if (amount < 1) {
      if (this.amountInput && this.amountInput.value.length > 0) {
        this.error = html`${msg('The minimum donation amount is $1.')}`;
      }
      return;
    }

    this.error = undefined;

    this.amount = amount;

    const event = new CustomEvent('amountChanged', {
      detail: { amount: this.amount },
    });
    this.dispatchEvent(event);
  }

  private yesSelected(): void {
    const event = new CustomEvent('yesSelected', {
      detail: { amount: this.amount },
    });
    this.dispatchEvent(event);
  }

  private noThanksSelected(): void {
    this.dispatchEvent(new Event('noThanksSelected'));
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --donation-upsell-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-upsell-cta-color--: var(
            --ia-donation-upsell-cta-button-color,
            var(--navy-blue)
          );
          --donation-upsell-cta-disabled-color--: var(
            --ia-donation-upsell-cta-button-disabled-color,
            rgba(109, 148, 201, 0.5)
          );
          /* Shifts the amount field left a little so the dollar sign and field read as centred */
          --donation-upsell-amount-input-offset--: var(
            --ia-donation-upsell-amount-input-offset,
            calc(var(--donation-upsell-base-font-size--) * -1)
          );
          --donation-upsell-error-color--: var(--color-danger);
        }

        .monthly-amount {
          background-color: var(--true-white);
          padding: var(--padding-sm) 0.625rem;
          border-radius: 5px;
          text-align: center;
          margin-bottom: var(--padding-sm);
          margin-top: 0;
        }

        .monthly-amount h1 {
          font-size: calc(var(--donation-upsell-base-font-size--) * 1.8);
          font-weight: bold;
          text-align: center;
          line-height: 1.2em;
          margin: 0;
          padding: var(--padding-sm) 0 0 0;
        }

        .hidden {
          display: none;
        }

        h3 {
          text-align: center;
          font-size: calc(var(--donation-upsell-base-font-size--) * 1.8);
          margin: 0 var(--donation-upsell-base-font-size--) var(--padding-sm)
            var(--donation-upsell-base-font-size--);
        }

        .appeal {
          text-align: center;
          font-size: calc(var(--donation-upsell-base-font-size--) * 1.6);
          margin: var(--padding-sm) var(--donation-upsell-base-font-size--);
        }

        .amount-input {
          transform: translate(var(--donation-upsell-amount-input-offset--), 0);
        }

        .amount-input .dollar-symbol {
          font-size: calc(var(--donation-upsell-base-font-size--) * 1.8);
          font-weight: bold;
        }

        .amount-input input {
          width: 100px;
          text-align: center;
          border: none;
          border-bottom: 1px solid gray;
          font-weight: bold;
          font-size: calc(var(--donation-upsell-base-font-size--) * 3.4);
        }

        .cta-button {
          font-size: calc(var(--donation-upsell-base-font-size--) * 2);
          display: block;
          width: 100%;
          margin-top: var(--padding-sm);
          padding: var(--donation-upsell-base-font-size--)
            calc(var(--donation-upsell-base-font-size--) * 2);
          background-color: var(--donation-upsell-cta-color--);
          color: var(--true-white);
          border-radius: 5px;
          border: 0;
          font-weight: bold;
          line-height: normal;
          outline: none;
          cursor: pointer;
        }

        .cta-button:disabled {
          background-color: var(--donation-upsell-cta-disabled-color--);
          cursor: not-allowed;
        }

        .paypal-upsell-slot {
          text-align: center;
        }

        .paypal-upsell-slot-blocker {
          position: absolute;
          width: 100%;
          height: calc(var(--donation-upsell-base-font-size--) * 4.5);
          bottom: 0;
          z-index: 250;
          cursor: not-allowed;
          background-color: rgba(255, 255, 255, 0.5);
        }

        .paypal-upsell-slot-blocker.hidden {
          display: none;
        }

        #paypal-cover-button {
          position: absolute;
          width: 100%;
          bottom: 0;
        }

        .paypal-upsell-slot-container {
          position: relative;
        }

        .error {
          font-size: calc(var(--donation-upsell-base-font-size--) * 1.4);
          margin: var(--padding-sm) 0;
          color: var(--donation-upsell-error-color--);
        }

        .or_separator {
          position: relative;
          margin: 0 calc(var(--donation-upsell-base-font-size--) * 2);
          font-size: calc(var(--donation-upsell-base-font-size--) * 2.6);
          font-weight: bold;
          text-transform: uppercase;
          text-align: center;
        }

        .or_separator:before {
          position: absolute;
          top: calc(50% - 1px);
          right: 0;
          left: 0;
          height: 2px;
          content: '';
          background: var(--mid-gray);
        }

        .or_separator span {
          display: inline-block;
          position: relative;
          padding: 0 var(--donation-upsell-base-font-size--);
          background: #f5f5f7;
        }
      `,
    ];
  }
}
