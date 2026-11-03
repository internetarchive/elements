import { fixture } from '@open-wc/testing-helpers';
import { configureLocalization } from '@lit/localize';
import { html } from 'lit';
import { afterEach, describe, expect, test } from 'vitest';

import './form-elements/ia-donation-edit-donation';
import './form-elements/contact-form/ia-donation-contact-form';
import './modals/ia-donation-confirm-modal';
import './modals/ia-donation-upsell-modal-content';
import { CurrencyValidator } from './currency-validator';
import { DonationPaymentInfo } from './models/donation-payment-info';
import { DonationType } from './models/donation-type';
import type { IADonationEditDonation } from './form-elements/ia-donation-edit-donation';
import type { IADonationContactForm } from './form-elements/contact-form/ia-donation-contact-form';
import type { IADonationConfirmModal } from './modals/ia-donation-confirm-modal';

// The host app configures localization once. This stands in for it.
const { setLocale } = configureLocalization({
  sourceLocale: 'en',
  targetLocales: ['es'],
  loadLocale: () => import('@src/locales/es'),
});

const nbsp = / /g;

/** Types a string one keystroke at a time into an input guarded by the validator. */
function typeInto(input: HTMLInputElement, text: string): void {
  for (const key of text) {
    const keydown = new KeyboardEvent('keydown', {
      key,
      cancelable: true,
      bubbles: true,
    });
    input.dispatchEvent(keydown);
    if (keydown.defaultPrevented) continue;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    input.setRangeText(key, start, end, 'end');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

async function guardedInput(): Promise<HTMLInputElement> {
  const validator = new CurrencyValidator();
  return fixture<HTMLInputElement>(
    html`<input type="text" @keydown=${validator.keydown} />`,
  );
}

async function editDonation(): Promise<IADonationEditDonation> {
  return fixture<IADonationEditDonation>(
    html`<ia-donation-edit-donation
      .donationInfo=${new DonationPaymentInfo({
        donationType: DonationType.OneTime,
        amount: 5,
        coverFees: false,
      })}
    ></ia-donation-edit-donation>`,
  );
}

function lastAmountEvent(el: IADonationEditDonation): { amount?: number } {
  const last: { amount?: number } = {};
  el.addEventListener('donationInfoChanged', (e) => {
    last.amount = (e as CustomEvent).detail.donationInfo.amount;
  });
  return last;
}

describe('comma in the custom amount', () => {
  afterEach(async () => {
    await setLocale('en');
  });

  test('English still drops a comma keystroke', async () => {
    const input = await guardedInput();
    typeInto(input, '10,50');
    expect(input.value).to.equal('1050');
  });

  test('Spanish types a comma as the decimal point', async () => {
    await setLocale('es');
    const input = await guardedInput();
    typeInto(input, '10,50');
    expect(input.value).to.equal('10.50');
  });

  test('Spanish keeps a dot working and still caps at two decimals', async () => {
    await setLocale('es');
    const input = await guardedInput();
    typeInto(input, '10.505');
    expect(input.value).to.equal('10.50');
  });

  test('Spanish allows only one decimal separator', async () => {
    await setLocale('es');
    const input = await guardedInput();
    typeInto(input, '10,5,2.1');
    expect(input.value).to.equal('10.52');
  });

  test('Spanish sends the amount as a plain number', async () => {
    await setLocale('es');
    const el = await editDonation();
    const last = lastAmountEvent(el);
    const input = el.shadowRoot!.querySelector<HTMLInputElement>(
      '#custom-amount-input',
    )!;
    input.focus();
    typeInto(input, '10,50');
    expect(last.amount).to.equal(10.5);
  });

  test('Spanish reads a pasted 10,50 as 10.50', async () => {
    await setLocale('es');
    const el = await editDonation();
    const last = lastAmountEvent(el);
    const input = el.shadowRoot!.querySelector<HTMLInputElement>(
      '#custom-amount-input',
    )!;
    input.value = '10,50';
    input.dispatchEvent(new Event('input'));
    expect(last.amount).to.equal(10.5);
  });

  test('English sends the same amount for 10.50', async () => {
    const el = await editDonation();
    const last = lastAmountEvent(el);
    const input = el.shadowRoot!.querySelector<HTMLInputElement>(
      '#custom-amount-input',
    )!;
    input.focus();
    typeInto(input, '10.50');
    expect(last.amount).to.equal(10.5);
  });
});

describe('comma in the upsell amount', () => {
  afterEach(async () => {
    await setLocale('en');
  });

  test('Spanish reads a pasted 10,50 as 10.50', async () => {
    await setLocale('es');
    const el = await fixture<HTMLElement & { amount: number }>(
      html`<ia-donation-upsell-modal-content></ia-donation-upsell-modal-content>`,
    );
    const input =
      el.shadowRoot!.querySelector<HTMLInputElement>('#amount-input')!;
    input.value = '10,50';
    input.dispatchEvent(new Event('input'));
    expect(el.amount).to.equal(10.5);
  });
});

describe('what the form sends to payment in Spanish', () => {
  afterEach(async () => {
    await setLocale('en');
  });

  test('the country is sent as its code, not its Spanish name', async () => {
    await setLocale('es');
    const el = await fixture<IADonationContactForm>(
      html`<ia-donation-contact-form></ia-donation-contact-form>`,
    );
    const select = el.querySelector<HTMLSelectElement>('select')!;
    select.value = 'DE';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await el.updateComplete;
    expect(el.billingInfo.countryCodeAlpha2).to.equal('DE');
    expect(select.selectedOptions[0].textContent?.trim()).to.equal('Alemania');
  });
});

describe('confirm modal amount', () => {
  afterEach(async () => {
    await setLocale('en');
  });

  const modalText = (el: IADonationConfirmModal) =>
    el
      .shadowRoot!.querySelector('p')!
      .textContent!.replace(/\s+/g, ' ')
      .replace(nbsp, ' ')
      .trim();

  const modal = (currencyType: string) =>
    fixture<IADonationConfirmModal>(
      html`<ia-donation-confirm-modal
        .amount=${10.5}
        .currencyType=${currencyType}
        .donationType=${DonationType.OneTime}
      ></ia-donation-confirm-modal>`,
    );

  test('shows USD as $10.50 in English', async () => {
    expect(modalText(await modal('USD'))).to.contain('$10.50 USD');
  });

  test('shows USD as 10,50 US$ in Spanish', async () => {
    await setLocale('es');
    expect(modalText(await modal('USD'))).to.contain('10,50 US$ USD');
  });

  test('keeps the symbol form for another currency in Spanish', async () => {
    await setLocale('es');
    expect(modalText(await modal('CAD'))).to.contain('CA$10.50 CAD');
  });
});
