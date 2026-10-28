import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import { DonationPaymentInfo } from '../models/donation-payment-info';
import { DonationType } from '../models/donation-type';
import type { IADonationTotalAmount } from './ia-donation-total-amount';
import './ia-donation-total-amount';

function total(el: IADonationTotalAmount): string {
  return el.shadowRoot!.querySelector('.total-line')!.textContent!.trim();
}

describe('IADonationTotalAmount', () => {
  test('is empty without donation info', async () => {
    const el = await fixture<IADonationTotalAmount>(
      html`<ia-donation-total-amount></ia-donation-total-amount>`,
    );
    expect(total(el)).to.equal('');
  });

  test('shows the total including a covered fee', async () => {
    const el = await fixture<IADonationTotalAmount>(
      html`<ia-donation-total-amount
        .donationInfo=${new DonationPaymentInfo({
          amount: 5,
          donationType: DonationType.OneTime,
          coverFees: true,
        })}
      ></ia-donation-total-amount>`,
    );
    expect(total(el)).to.equal('Total: $5.40');
  });

  test('appends /month for a monthly donation', async () => {
    const el = await fixture<IADonationTotalAmount>(
      html`<ia-donation-total-amount
        .donationInfo=${new DonationPaymentInfo({
          amount: 10,
          donationType: DonationType.Monthly,
          coverFees: false,
        })}
      ></ia-donation-total-amount>`,
    );
    expect(total(el)).to.equal('Total: $10.00/month');
  });
});
