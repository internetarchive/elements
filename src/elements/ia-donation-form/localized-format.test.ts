import { fixture } from '@open-wc/testing-helpers';
import { configureLocalization } from '@lit/localize';
import { html } from 'lit';
import { afterEach, describe, expect, test } from 'vitest';

import './form-elements/ia-donation-total-amount';
import './form-elements/contact-form/ia-donation-contact-form';
import { DonationType } from './models/donation-type';
import { DonationPaymentInfo } from './models/donation-payment-info';
import { formatUsd, localizedCountries } from './localized-format';
import { countries } from './form-elements/contact-form/countries';

// The host app configures localization once. This stands in for it.
const { setLocale } = configureLocalization({
  sourceLocale: 'en',
  targetLocales: ['es'],
  loadLocale: () => import('@src/locales/es'),
});

const nbsp = / /g;

describe('donation form number and country localization', () => {
  afterEach(async () => {
    await setLocale('en');
  });

  test('formats dollars the same way as before in English', () => {
    expect(formatUsd(10)).to.equal('$10.00');
    expect(formatUsd(1234.5)).to.equal('$1,234.50');
    expect(formatUsd(5, 0)).to.equal('$5');
  });

  test('formats dollars in Spanish', async () => {
    await setLocale('es');
    expect(formatUsd(10).replace(nbsp, ' ')).to.equal('10,00 US$');
    expect(formatUsd(5, 0).replace(nbsp, ' ')).to.equal('5 US$');
  });

  test('keeps the English country list in English', () => {
    expect(localizedCountries()).to.deep.equal(Object.entries(countries));
  });

  test('names countries in Spanish, sorted in Spanish', async () => {
    await setLocale('es');
    const list = localizedCountries();
    const names = Object.fromEntries(list);
    expect(names.US).to.equal('Estados Unidos');
    expect(names.DE).to.equal('Alemania');
    expect(list).to.have.length(Object.keys(countries).length);
    const collator = new Intl.Collator('es');
    const sorted = [...list].sort((a, b) => collator.compare(a[1], b[1]));
    expect(list).to.deep.equal(sorted);
  });

  test('re-renders the total in Spanish when the locale switches', async () => {
    const el = await fixture<
      HTMLElement & { updateComplete: Promise<boolean> }
    >(
      html`<ia-donation-total-amount
        .donationInfo=${new DonationPaymentInfo({
          donationType: DonationType.OneTime,
          amount: 10,
          coverFees: false,
        })}
      ></ia-donation-total-amount>`,
    );
    const text = () =>
      el.shadowRoot?.querySelector('.total-line')?.textContent?.trim();
    expect(text()).to.equal('Total: $10.00');
    await setLocale('es');
    await el.updateComplete;
    expect(text()?.replace(nbsp, ' ')).to.equal('Total: 10,00 US$');
  });

  test('re-renders the country select in Spanish when the locale switches', async () => {
    const el = await fixture<
      HTMLElement & { updateComplete: Promise<boolean> }
    >(html`<ia-donation-contact-form></ia-donation-contact-form>`);
    const option = () =>
      el
        .querySelector<HTMLOptionElement>('option[value="US"]')
        ?.textContent?.trim();
    expect(option()).to.equal('United States');
    const select = el.querySelector<HTMLSelectElement>('select');
    if (select) {
      select.value = 'DE';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
    await setLocale('es');
    await el.updateComplete;
    expect(option()).to.equal('Estados Unidos');
    expect(select?.value).to.equal('DE');
    expect(select?.selectedOptions[0]?.textContent?.trim()).to.equal(
      'Alemania',
    );
  });
});
