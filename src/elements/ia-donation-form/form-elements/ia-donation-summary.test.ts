import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import { DonationPaymentInfo } from '../models/donation-payment-info';
import { DonationType } from '../models/donation-type';
import { oneEvent } from '../test-helpers/dom.test-helpers';
import type { IADonationSummary } from './ia-donation-summary';
import './ia-donation-summary';

function title(el: IADonationSummary): string {
  return el.shadowRoot!.querySelector('h1')!.textContent!.trim();
}

describe('IADonationSummary', () => {
  test('is empty without donation info', async () => {
    const el = await fixture<IADonationSummary>(
      html`<ia-donation-summary></ia-donation-summary>`,
    );
    expect(title(el)).to.equal('');
  });

  test('titles a one-time donation', async () => {
    const el = await fixture<IADonationSummary>(
      html`<ia-donation-summary
        .donationInfo=${new DonationPaymentInfo({
          amount: 3.5,
          donationType: DonationType.OneTime,
          coverFees: false,
        })}
      ></ia-donation-summary>`,
    );
    expect(title(el)).to.equal('$3.50 Donation');
  });

  test('titles a monthly donation', async () => {
    const el = await fixture<IADonationSummary>(
      html`<ia-donation-summary
        .donationInfo=${new DonationPaymentInfo({
          amount: 7.5,
          donationType: DonationType.Monthly,
          coverFees: false,
        })}
      ></ia-donation-summary>`,
    );
    expect(title(el)).to.equal('$7.50 Monthly Donation');
  });

  test('drops the cents for a whole-dollar amount', async () => {
    const el = await fixture<IADonationSummary>(
      html`<ia-donation-summary
        .donationInfo=${new DonationPaymentInfo({
          amount: 25,
          donationType: DonationType.OneTime,
          coverFees: false,
        })}
      ></ia-donation-summary>`,
    );
    expect(title(el)).to.equal('$25 Donation');
  });

  test('emits editClicked from its button', async () => {
    const el = await fixture<IADonationSummary>(
      html`<ia-donation-summary></ia-donation-summary>`,
    );
    const clicked = oneEvent(el, 'editClicked');
    el.shadowRoot!.querySelector('button')!.click();
    expect(await clicked).to.exist;
  });
});
