import { elementUpdated, fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import { DonationPaymentInfo } from '../models/donation-payment-info';
import { DonationType } from '../models/donation-type';
import { oneEvent } from '../test-helpers/dom.test-helpers';
import type { IADonationEditDonation } from './ia-donation-edit-donation';
import {
  DonationHeaderMode,
  type IADonationHeader,
} from './ia-donation-header';
import type { IADonationSummary } from './ia-donation-summary';
import './ia-donation-header';

function fiveDollars(): DonationPaymentInfo {
  return new DonationPaymentInfo({
    amount: 5,
    donationType: DonationType.OneTime,
    coverFees: false,
  });
}

describe('IADonationHeader', () => {
  test('shows the amount picker by default', async () => {
    const el = await fixture<IADonationHeader>(
      html`<ia-donation-header
        .donationInfo=${fiveDollars()}
      ></ia-donation-header>`,
    );

    expect(el.shadowRoot!.querySelector('ia-donation-edit-donation')).to.exist;
    expect(el.shadowRoot!.querySelector('ia-donation-summary')).to.be.null;
  });

  test('shows the summary in summary mode, and edit goes back to the picker', async () => {
    const el = await fixture<IADonationHeader>(
      html`<ia-donation-header
        .donationInfo=${fiveDollars()}
        .mode=${DonationHeaderMode.Summary}
      ></ia-donation-header>`,
    );

    const summary = el.shadowRoot!.querySelector<IADonationSummary>(
      'ia-donation-summary',
    )!;
    expect(summary).to.exist;
    expect(summary.displayTitle).to.equal('$5 Donation');

    summary.shadowRoot!.querySelector('button')!.click();
    await elementUpdated(el);
    expect(el.mode).to.equal(DonationHeaderMode.Edit);
    expect(el.shadowRoot!.querySelector('ia-donation-edit-donation')).to.exist;
  });

  test('relays donationInfoChanged from the picker and keeps the new info', async () => {
    const el = await fixture<IADonationHeader>(
      html`<ia-donation-header
        .donationInfo=${fiveDollars()}
      ></ia-donation-header>`,
    );
    const picker = el.shadowRoot!.querySelector<IADonationEditDonation>(
      'ia-donation-edit-donation',
    )!;

    const changed = oneEvent(el, 'donationInfoChanged');
    picker
      .shadowRoot!.querySelector<HTMLInputElement>('#amount-25-option')!
      .click();
    const { donationInfo } = (await changed).detail;

    expect(donationInfo.amount).to.equal(25);
    expect(el.donationInfo?.amount).to.equal(25);
  });

  test('relays editDonationError from the picker', async () => {
    const el = await fixture<IADonationHeader>(
      html`<ia-donation-header
        .donationInfo=${fiveDollars()}
      ></ia-donation-header>`,
    );
    const picker = el.shadowRoot!.querySelector<IADonationEditDonation>(
      'ia-donation-edit-donation',
    )!;

    const errored = oneEvent(el, 'editDonationError');
    const input = picker.shadowRoot!.querySelector<HTMLInputElement>(
      '#custom-amount-input',
    )!;
    input.value = '0.5';
    input.dispatchEvent(new Event('input'));

    expect((await errored).detail.error).to.equal('donation_too_low');
  });
});
