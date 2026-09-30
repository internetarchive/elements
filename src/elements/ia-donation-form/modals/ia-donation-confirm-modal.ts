import {
  css,
  html,
  LitElement,
  type CSSResultGroup,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg } from '@lit/localize';
import currency from 'currency.js';

import themeStyles from '@src/themes/theme-styles';
import { DonationType } from '../models/donation-type';

/**
 * The confirmation step shown before a PayPal donation goes through: what the
 * donor is about to give, with Complete and Cancel buttons.
 */
@customElement('ia-donation-confirm-modal')
export class IADonationConfirmModal extends LitElement {
  @property({ type: Number }) amount = 5;

  /** An ISO currency code, e.g. `USD`. Drives the symbol shown with the amount. */
  @property({ type: String }) currencyType = 'USD';

  @property({ type: String }) donationType: DonationType = DonationType.OneTime;

  @property({ attribute: false }) confirmDonation: () => void = () => {};

  @property({ attribute: false }) cancelDonation: () => void = () => {};

  private get formattedAmount(): string {
    return currency(this.amount, { symbol: this.currencySymbol }).format();
  }

  get confirmationText(): TemplateResult {
    return msg(html`
      <p>
        You are about to make a <b>${this.donationType}</b> donation of
        <b>${this.formattedAmount} ${this.currencyType}</b> to the Internet
        Archive.
      </p>
    `);
  }

  get confirmUpsellText(): TemplateResult {
    return msg(html`
      <p>
        You are about to begin making <b>monthly</b> donations of
        <b>${this.formattedAmount} ${this.currencyType}</b> to the Internet
        Archive. (Your first recurring contribution will be next month.)
      </p>
    `);
  }

  get confirmCTA(): string {
    return this.donationType === DonationType.Upsell
      ? msg('Start monthly donation')
      : msg('Complete donation');
  }

  render(): TemplateResult {
    return html`
      ${this.donationType === DonationType.Upsell
        ? this.confirmUpsellText
        : this.confirmationText}

      <div class="cta-group">
        <button id="confirm" @click=${() => this.confirmDonation()}>
          ${this.confirmCTA}
        </button>
        <button id="cancel" @click=${() => this.cancelDonation()}>
          ${msg('Cancel')}
        </button>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --donation-confirm-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-confirm-cta-color--: var(
            --ia-donation-upsell-cta-button-color,
            var(--navy-blue)
          );
          --donation-confirm-cta-disabled-color--: var(
            --ia-donation-upsell-cta-button-disabled-color,
            rgba(109, 148, 201, 0.5)
          );

          display: block;
        }

        button {
          outline: none;
          cursor: pointer;
        }

        button#confirm {
          font-size: calc(var(--donation-confirm-base-font-size--) * 2);
          display: block;
          width: 100%;
          margin-top: var(--padding-sm);
          padding: var(--donation-confirm-base-font-size--)
            calc(var(--donation-confirm-base-font-size--) * 2);
          background-color: var(--donation-confirm-cta-color--);
          color: var(--true-white);
          border-radius: 5px;
          border: 0;
          font-weight: bold;
          line-height: normal;
        }

        button#cancel {
          margin-top: var(--donation-confirm-base-font-size--);
          border: 0;
          text-decoration: underline;
          background-color: transparent;
        }

        button:disabled {
          background-color: var(--donation-confirm-cta-disabled-color--);
          cursor: not-allowed;
        }
      `,
    ];
  }

  /**
   * The symbol for a PayPal-supported currency code. Dollars for anything
   * unlisted, which covers USD and NZD.
   * https://developer.paypal.com/docs/reports/reference/paypal-supported-currencies/
   */
  get currencySymbol(): string {
    switch (this.currencyType) {
      case 'AUD':
        return 'AU$';
      case 'BRL':
        return 'R$';
      case 'CAD':
        return 'CA$';
      case 'CHF':
        return 'Fr';
      case 'CNY':
        return '¥';
      case 'CZK':
        return 'Kč';
      case 'DKK':
        return 'Kr';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      case 'HKD':
        return 'HK$';
      case 'HUF':
        return 'Ft';
      case 'ILS':
        return '₪';
      case 'JPY':
        return '¥';
      case 'MXN':
        return 'MX$';
      case 'MYR':
        return 'RM';
      case 'NOK':
        return 'kr';
      case 'PLN':
        return 'zł';
      case 'RUB':
        return '₽';
      case 'SEK':
        return 'kr';
      case 'SGD':
        return 'S$';
      case 'THB':
        return '฿';
      case 'TWD':
        return 'NT$';
      default:
        return '$';
    }
  }
}
