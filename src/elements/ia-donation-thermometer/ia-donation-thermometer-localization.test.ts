import { fixture } from '@open-wc/testing-helpers';
import { configureLocalization } from '@lit/localize';
import { html } from 'lit';
import { afterEach, describe, expect, test } from 'vitest';

import './ia-donation-thermometer';
import type { IADonationThermometer } from './ia-donation-thermometer';

// The host app configures localization once. This stands in for it.
const { setLocale } = configureLocalization({
  sourceLocale: 'en',
  targetLocales: ['es'],
  loadLocale: () => import('@src/locales/es'),
});

describe('donation thermometer localization', () => {
  afterEach(async () => {
    await setLocale('en');
  });

  const goalText = (el: IADonationThermometer) =>
    el.shadowRoot?.querySelector('.donate-goal')?.textContent?.trim();
  const barLabel = (el: IADonationThermometer) =>
    el.shadowRoot
      ?.querySelector('[role="progressbar"]')
      ?.getAttribute('aria-label');

  test('shows the built-in text in English by default', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        goalMessageMode="message"
        .currentAmount=${1}
      ></ia-donation-thermometer>`,
    );
    expect(goalText(el)).to.equal('We’ve almost reached our goal!');
    expect(barLabel(el)).to.equal('Donation progress');
  });

  test('renders in Spanish when the element is created after the locale loads', async () => {
    await setLocale('es');
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        goalMessageMode="amount"
        .goalAmount=${6_500_000}
      ></ia-donation-thermometer>`,
    );
    expect(goalText(el)).to.equal('Meta: $6.5MM');
    expect(barLabel(el)).not.to.equal('Donation progress');
  });

  test('re-renders in Spanish when the locale loads after the element exists', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        goalMessageMode="amount"
        .goalAmount=${6_500_000}
      ></ia-donation-thermometer>`,
    );
    expect(goalText(el)).to.equal('$6.5MM goal');
    await setLocale('es');
    await el.updateComplete;
    expect(goalText(el)).to.equal('Meta: $6.5MM');
  });

  test('keeps a message the app sets, whatever the language', async () => {
    await setLocale('es');
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        goalMessageMode="message"
        goalNearMessage="CUSTOM"
        .currentAmount=${1}
      ></ia-donation-thermometer>`,
    );
    expect(goalText(el)).to.equal('CUSTOM');
  });
});
