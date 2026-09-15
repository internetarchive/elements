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

/** The collapsed view of the chosen donation, with a button to go back and edit it. */
@customElement('ia-donation-summary')
export class IADonationSummary extends LitElement {
  @property({ type: Object }) donationInfo?: DonationPaymentInfo;

  render(): TemplateResult {
    return html`
      <h1>${this.displayTitle}</h1>
      <button @click=${this.editClicked}>${msg('Edit this amount')}</button>
    `;
  }

  get displayTitle(): string {
    if (!this.donationInfo) {
      return '';
    }

    const amount = this.donationInfo.amount;
    // Whole dollars don't need the cents
    const precision = amount === Math.round(amount) ? 0 : 2;
    const displayAmount = currency(amount, { symbol: '$', precision }).format();

    return this.donationInfo.donationType === DonationType.Monthly
      ? msg(str`${displayAmount} Monthly Donation`)
      : msg(str`${displayAmount} Donation`);
  }

  private editClicked(): void {
    this.dispatchEvent(new Event('editClicked'));
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          display: flex;
          justify-content: center;
          align-content: center;
        }

        button {
          border: 0;
          background: none;
          color: var(--link-color);
          cursor: pointer;
        }
      `,
    ];
  }
}
