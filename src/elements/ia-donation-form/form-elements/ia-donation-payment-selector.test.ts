import { elementUpdated, fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import { MockPaymentProviders } from '../braintree/test-helpers/mock-managers.test-helpers';
import { oneEvent, promisedSleep } from '../test-helpers/dom.test-helpers';
import type { IADonationPaymentSelector } from './ia-donation-payment-selector';
import './ia-donation-payment-selector';

function button(el: IADonationPaymentSelector, selector: string): HTMLElement {
  return el.shadowRoot!.querySelector(selector)!;
}

describe('IADonationPaymentSelector', () => {
  test('starts every provider button in the loading state', async () => {
    const el = await fixture<IADonationPaymentSelector>(
      html`<ia-donation-payment-selector></ia-donation-payment-selector>`,
    );

    for (const name of [
      '.applepay',
      '.googlepay',
      '.venmo',
      '.paypal-container',
    ]) {
      expect(
        button(el, name).classList.contains('loading'),
        `${name} should be loading`,
      ).to.be.true;
    }
  });

  test('shows the providers the handlers say are available', async () => {
    const el = await fixture<IADonationPaymentSelector>(
      html`<ia-donation-payment-selector></ia-donation-payment-selector>`,
    );

    el.paymentProviders = new MockPaymentProviders();
    await elementUpdated(el);
    await promisedSleep(50);

    expect(button(el, '.venmo').classList.contains('available')).to.be.true;
    expect(button(el, '.applepay').classList.contains('available')).to.be.true;
    expect(button(el, '.googlepay').classList.contains('available')).to.be.true;
  });

  test('can show the PayPal button when told to', async () => {
    const el = await fixture<IADonationPaymentSelector>(
      html`<ia-donation-payment-selector></ia-donation-payment-selector>`,
    );

    el.showPaypalButton();
    await elementUpdated(el);

    expect(button(el, '.paypal-container').classList.contains('available')).to
      .be.true;
  });

  test('emits paypalBlockerSelected when the local PayPal button is pressed', async () => {
    const el = await fixture<IADonationPaymentSelector>(
      html`<ia-donation-payment-selector></ia-donation-payment-selector>`,
    );

    const selected = oneEvent(el, 'paypalBlockerSelected');
    button(el, '.paypal-local-button').click();
    expect(await selected).to.exist;
  });

  test('emits applePaySelected with the click event', async () => {
    const el = await fixture<IADonationPaymentSelector>(
      html`<ia-donation-payment-selector></ia-donation-payment-selector>`,
    );

    const selected = oneEvent(el, 'applePaySelected');
    const clickEvent = new MouseEvent('click');
    button(el, '.applepay').dispatchEvent(clickEvent);
    expect((await selected).detail.originalEvent).to.equal(clickEvent);
  });

  test.each([
    ['.googlepay', 'googlePaySelected'],
    ['.venmo', 'venmoSelected'],
    ['.credit-card-button', 'creditCardSelected'],
  ])('emits %s -> %s', async (selector, eventName) => {
    const el = await fixture<IADonationPaymentSelector>(
      html`<ia-donation-payment-selector></ia-donation-payment-selector>`,
    );

    const selected = oneEvent(el, eventName);
    button(el, selector).click();
    expect(await selected).to.exist;
  });

  test('collapses the other buttons once one is picked, and a change button restores them', async () => {
    const el = await fixture<IADonationPaymentSelector>(
      html`<ia-donation-payment-selector></ia-donation-payment-selector>`,
    );
    expect(el.shadowRoot!.querySelector('#change-payment-method')).to.be.null;

    button(el, '.credit-card-button').click();
    await elementUpdated(el);

    const container = el.shadowRoot!.querySelector('.payment-container')!;
    expect(container.classList.contains('payment-selected')).to.be.true;
    expect(button(el, '.credit-card-button').classList.contains('selected')).to
      .be.true;
    expect(getComputedStyle(button(el, '.venmo')).display).to.equal('none');

    const reset = oneEvent(el, 'resetPaymentMethod');
    button(el, '#change-payment-method').click();
    await reset;
    await elementUpdated(el);
    expect(container.classList.contains('payment-selected')).to.be.false;
    expect(el.shadowRoot!.querySelector('#change-payment-method')).to.be.null;
  });

  test('keeps the PayPal cover in place after it is pressed with an invalid amount', async () => {
    const el = await fixture<IADonationPaymentSelector>(
      html`<ia-donation-payment-selector
        .donationInfoValid=${false}
      ></ia-donation-payment-selector>`,
    );
    el.showPaypalButton();
    await elementUpdated(el);

    const selected = oneEvent(el, 'paypalBlockerSelected');
    button(el, '.paypal-local-button').click();
    await selected;
    await elementUpdated(el);

    // The cover sits over PayPal's own button so a bad amount never reaches it
    expect(
      getComputedStyle(button(el, '.paypal-local-button')).display,
    ).to.not.equal('none');
    expect(
      getComputedStyle(button(el, '.paypal-container')).display,
    ).to.not.equal('none');
    expect(getComputedStyle(button(el, '.venmo')).display).to.equal('none');
  });

  test('labels the brand buttons for screen readers', async () => {
    const el = await fixture<IADonationPaymentSelector>(
      html`<ia-donation-payment-selector></ia-donation-payment-selector>`,
    );

    expect(button(el, '.applepay').getAttribute('aria-label')).to.equal(
      'Pay with Apple Pay',
    );
    expect(
      button(el, '.paypal-local-button').getAttribute('aria-label'),
    ).to.equal('Pay with PayPal');
    expect(button(el, '.applepay img').getAttribute('alt')).to.equal(
      'Apple Pay',
    );
  });
});
