import { elementUpdated, fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import { HostedFieldName } from '../braintree/payment-providers/credit-card/hosted-field-container';
import type { IADonationBadgedInput } from './ia-donation-badged-input';
import type { IADonationCreditCardFields } from './ia-donation-credit-card-fields';
import './ia-donation-credit-card-fields';

async function setup(): Promise<IADonationCreditCardFields> {
  return fixture<IADonationCreditCardFields>(
    html`<ia-donation-credit-card-fields></ia-donation-credit-card-fields>`,
  );
}

describe('IADonationCreditCardFields', () => {
  test('renders into the light DOM so Braintree can render its fields', async () => {
    const el = await setup();
    expect(el.shadowRoot).to.be.null;
  });

  test('renders a visible label above each card field', async () => {
    const el = await setup();

    const labels = Array.from(el.querySelectorAll<HTMLElement>('.field-label'));
    const labelTexts = labels.map((label) =>
      label.textContent?.replace(/\s+/g, ' ').trim(),
    );

    expect(labelTexts).to.deep.equal([
      'Card Number *',
      'Expiration (MM / YY) *',
      'CVC *',
    ]);
    labels.forEach((label) => {
      expect(getComputedStyle(label).position).to.not.equal('absolute');
    });
  });

  test('marks and clears field errors on the right badged input', async () => {
    const el = await setup();
    const numberInput = el.querySelector<IADonationBadgedInput>(
      'ia-donation-badged-input.creditcard',
    )!;
    const cvvInput = el.querySelector<IADonationBadgedInput>(
      'ia-donation-badged-input.cvv',
    )!;
    const expirationInput = el.querySelector<IADonationBadgedInput>(
      'ia-donation-badged-input.expiration',
    )!;

    el.hostedFieldContainer.markFieldErrors([
      HostedFieldName.Number,
      HostedFieldName.CVV,
    ]);
    await elementUpdated(numberInput);

    expect(numberInput.error).to.be.true;
    expect(cvvInput.error).to.be.true;
    expect(expirationInput.error).to.be.false;

    el.hostedFieldContainer.removeFieldErrors([
      HostedFieldName.Number,
      HostedFieldName.CVV,
    ]);

    expect(numberInput.error).to.be.false;
    expect(cvvInput.error).to.be.false;
  });

  test('shows and hides the shared error message', async () => {
    const el = await setup();
    const errorMessage = el.querySelector<HTMLDivElement>(
      '#braintree-error-message',
    )!;

    el.hostedFieldContainer.showErrorMessage('Something went wrong');
    expect(errorMessage.innerHTML).to.equal('Something went wrong');
    expect(errorMessage.style.display).to.equal('block');

    el.hostedFieldContainer.hideErrorMessage();
    expect(errorMessage.style.display).to.equal('none');
  });

  test('empties the hosted field containers when they are reset', async () => {
    const el = await setup();
    const numberField = el.querySelector<HTMLDivElement>(
      '#braintree-creditcard',
    )!;
    numberField.appendChild(document.createElement('iframe'));

    el.hostedFieldContainer.resetHostedFields();

    expect(numberField.childNodes.length).to.equal(0);
  });
});
