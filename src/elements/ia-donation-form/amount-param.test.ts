import { fixture } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { IADonationFormController } from './ia-donation-form-controller';
import './ia-donation-form-controller';

describe('donation form amount param', () => {
  const originalUrl = window.location.href;

  afterEach(() => {
    window.history.replaceState({}, '', originalUrl);
  });

  async function amountFor(search: string): Promise<number> {
    window.history.replaceState({}, '', `${window.location.pathname}${search}`);
    const el = await fixture<IADonationFormController>(
      html`<ia-donation-form-controller></ia-donation-form-controller>`,
    );
    return el.donationInfo.amount;
  }

  test('reads ?amt=1234.50 as 1234.50', async () => {
    expect(await amountFor('?amt=1234.50')).to.equal(1234.5);
  });

  test('reads ?amt=10,50 as 10.50, not 1050', async () => {
    expect(await amountFor('?amt=10,50')).to.equal(10.5);
  });

  test('reads ?amt=1,234.50 as 1234.50', async () => {
    expect(await amountFor('?amt=1,234.50')).to.equal(1234.5);
  });

  test('reads ?amt=$10 and ?amt=10 USD as 10', async () => {
    expect(await amountFor('?amt=%2410')).to.equal(10);
    expect(await amountFor('?amt=10%20USD')).to.equal(10);
  });

  test('reads ?amt=1000 as 1000', async () => {
    expect(await amountFor('?amt=1000')).to.equal(1000);
  });

  test('ignores an ?amt it cannot read instead of guessing', async () => {
    const defaultAmount = await amountFor('');
    expect(await amountFor('?amt=10.5055')).to.equal(defaultAmount);
    expect(await amountFor('?amt=12abc')).to.equal(defaultAmount);
    expect(await amountFor('?amt=1.000')).to.equal(defaultAmount);
  });
});
