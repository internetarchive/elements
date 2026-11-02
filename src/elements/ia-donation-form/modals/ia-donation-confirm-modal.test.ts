import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import { DonationType } from '../models/donation-type';
import type { IADonationConfirmModal } from './ia-donation-confirm-modal';
import './ia-donation-confirm-modal';

function text(el: IADonationConfirmModal): string {
  return el
    .shadowRoot!.querySelector('p')!
    .textContent!.replace(/\s+/g, ' ')
    .trim();
}

describe('IADonationConfirmModal', () => {
  test('describes a one-time donation and offers to complete it', async () => {
    const el = await fixture<IADonationConfirmModal>(
      html`<ia-donation-confirm-modal
        .amount=${33}
        .currencyType=${'USD'}
        .donationType=${DonationType.OneTime}
      ></ia-donation-confirm-modal>`,
    );

    expect(text(el)).to.equal(
      'You are about to make a one-time donation of $33.00 USD to the Internet Archive.',
    );
    expect(
      el.shadowRoot!.querySelector('#confirm')?.textContent?.trim(),
    ).to.equal('Complete donation');
  });

  test('describes an upsell as the start of monthly donations', async () => {
    const el = await fixture<IADonationConfirmModal>(
      html`<ia-donation-confirm-modal
        .amount=${8}
        .currencyType=${'USD'}
        .donationType=${DonationType.Upsell}
      ></ia-donation-confirm-modal>`,
    );

    expect(text(el)).to.include('begin making monthly donations of $8.00 USD');
    expect(text(el)).to.include(
      'first recurring contribution will be next month',
    );
    expect(
      el.shadowRoot!.querySelector('#confirm')?.textContent?.trim(),
    ).to.equal('Start monthly donation');
  });

  test('uses the symbol for the currency', async () => {
    const el = await fixture<IADonationConfirmModal>(
      html`<ia-donation-confirm-modal
        .amount=${10}
        .currencyType=${'EUR'}
      ></ia-donation-confirm-modal>`,
    );

    expect(el.currencySymbol).to.equal('€');
    expect(text(el)).to.include('€10.00 EUR');

    el.currencyType = 'CAD';
    expect(el.currencySymbol).to.equal('CA$');
    el.currencyType = 'NZD';
    expect(el.currencySymbol).to.equal('$');
  });

  test('calls back on confirm and cancel', async () => {
    let confirmed = 0;
    let cancelled = 0;
    const el = await fixture<IADonationConfirmModal>(
      html`<ia-donation-confirm-modal
        .confirmDonation=${() => confirmed++}
        .cancelDonation=${() => cancelled++}
      ></ia-donation-confirm-modal>`,
    );

    el.shadowRoot!.querySelector<HTMLButtonElement>('#confirm')!.click();
    el.shadowRoot!.querySelector<HTMLButtonElement>('#cancel')!.click();

    expect(confirmed).to.equal(1);
    expect(cancelled).to.equal(1);
  });
});
