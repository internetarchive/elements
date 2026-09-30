import {
  css,
  html,
  LitElement,
  type CSSResultGroup,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg, str } from '@lit/localize';
import currency from 'currency.js';

import themeStyles from '@src/themes/theme-styles';
import type { DonationPaymentInfo } from '../models/donation-payment-info';
import { DonationType } from '../models/donation-type';

/** The "Total: $X" line under the amount picker, with "/month" for monthly gifts. */
@customElement('ia-donation-total-amount')
export class IADonationTotalAmount extends LitElement {
  @property({ type: Object }) donationInfo?: DonationPaymentInfo;

  render(): TemplateResult {
    return html`
      <div class="top-line"></div>
      <div class="total-line">${this.totalLine}</div>
    `;
  }

  private get totalLine(): string {
    if (!this.donationInfo) return '';
    const amount = currency(this.donationInfo.total, { symbol: '$' }).format();
    return this.donationInfo.donationType === DonationType.Monthly
      ? msg(str`Total: ${amount}/month`)
      : msg(str`Total: ${amount}`);
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --donation-total-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-total-line-color--: var(
            --ia-donation-total-amount-line-color,
            var(--mid-gray)
          );
          --donation-total-line-thickness--: var(
            --ia-donation-total-amount-line-thickness,
            2px
          );
          --donation-total-vertical-spacing--: var(
            --ia-donation-total-amount-vertical-spacing,
            var(--padding-sm)
          );
          --donation-total-font-size--: var(
            --ia-donation-total-amount-font-size,
            calc(var(--donation-total-base-font-size--) * 2.6)
          );
        }

        .top-line {
          width: 100%;
          height: var(--donation-total-line-thickness--);
          background-color: var(--donation-total-line-color--);
        }

        .total-line {
          font-size: var(--donation-total-font-size--);
          font-weight: bold;
          text-align: center;
          margin-top: var(--donation-total-vertical-spacing--);
        }
      `,
    ];
  }
}
