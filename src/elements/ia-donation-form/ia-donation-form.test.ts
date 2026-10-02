import { elementUpdated, fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import { MockBraintreeManager } from './braintree/test-helpers/mock-managers.test-helpers';
import { fiveDollars } from './braintree/test-helpers/mock-models.test-helpers';
import type { IADonationEditDonation } from './form-elements/ia-donation-edit-donation';
import type { IADonationHeader } from './form-elements/ia-donation-header';
import type { IADonationPaymentSelector } from './form-elements/ia-donation-payment-selector';
import type { IADonationForm } from './ia-donation-form';
import { DonationPaymentInfo } from './models/donation-payment-info';
import { DonationType } from './models/donation-type';
import { PaymentProvider } from './models/payment-provider';
import { oneEvent, promisedSleep } from './test-helpers/dom.test-helpers';
import { MockPaymentFlowHandlers } from './test-helpers/mock-flow-handlers.test-helpers';
import './ia-donation-form';

function paymentSelector(el: IADonationForm): IADonationPaymentSelector {
  return el.shadowRoot!.querySelector('ia-donation-payment-selector')!;
}

function selectorButton(el: IADonationForm, selector: string): HTMLElement {
  return paymentSelector(el).shadowRoot!.querySelector(selector)!;
}

function contactFormSection(el: IADonationForm): HTMLDivElement {
  return el.shadowRoot!.querySelector('.contact-form-section')!;
}

describe('IADonationForm', () => {
  test('starts with nothing configured', async () => {
    const el = await fixture<IADonationForm>(
      html`<ia-donation-form></ia-donation-form>`,
    );

    expect(el.braintreeManager).to.be.undefined;
    expect(el.donationRequest).to.be.undefined;
  });

  test('updates donationInfo when the donor changes it in the header', async () => {
    const el = await fixture<IADonationForm>(
      html`<ia-donation-form
        .donationInfo=${fiveDollars()}
      ></ia-donation-form>`,
    );
    const header =
      el.shadowRoot!.querySelector<IADonationHeader>('ia-donation-header')!;
    const editDonation =
      header.shadowRoot!.querySelector<IADonationEditDonation>(
        'ia-donation-edit-donation',
      )!;

    const changed = oneEvent(el, 'donationInfoChanged');
    editDonation
      .shadowRoot!.querySelector<HTMLInputElement>(
        '#donationType-monthly-option',
      )!
      .click();
    await changed;
    await elementUpdated(el);

    expect(el.donationInfo?.donationType).to.equal(DonationType.Monthly);
  });

  test('numbers the payment step after the amount steps', async () => {
    const el = await fixture<IADonationForm>(
      html`<ia-donation-form></ia-donation-form>`,
    );
    const sections = () =>
      Array.from(el.shadowRoot!.querySelectorAll('ia-donation-section')).map(
        (s) => (s as HTMLElement & { sectionBadge: string }).sectionBadge,
      );

    // Total (unnumbered), payment, contact, donate
    expect(sections()).to.deep.equal(['0', '3', '4', '5']);

    el.frequencySelectionMode = 'checkbox';
    await elementUpdated(el);
    expect(sections()).to.deep.equal(['0', '2', '3', '4']);
  });

  test('shows the contact form and card fields when Credit Card is selected', async () => {
    const el = await fixture<IADonationForm>(
      html`<ia-donation-form></ia-donation-form>`,
    );
    expect(contactFormSection(el).classList.contains('hidden')).to.be.true;

    selectorButton(el, '.credit-card-button').click();
    await elementUpdated(el);

    expect(contactFormSection(el).classList.contains('hidden')).to.be.false;
    expect(
      el
        .shadowRoot!.querySelector('.credit-card-fields')!
        .classList.contains('hidden'),
    ).to.be.false;
  });

  test('shows the contact form without card fields when Venmo is selected', async () => {
    const el = await fixture<IADonationForm>(
      html`<ia-donation-form></ia-donation-form>`,
    );
    el.braintreeManager = new MockBraintreeManager();
    await elementUpdated(el);

    selectorButton(el, '.venmo').click();
    await elementUpdated(el);

    expect(contactFormSection(el).classList.contains('hidden')).to.be.false;
    expect(
      el
        .shadowRoot!.querySelector('.credit-card-fields')!
        .classList.contains('hidden'),
    ).to.be.true;
    expect(
      el
        .shadowRoot!.querySelector('#contactFormSection')!
        .getAttribute('headline'),
    ).to.equal('Help us stay in touch');
  });

  test('hands the donation info to the PayPal handler when the flow handlers are set', async () => {
    const donationInfo = new DonationPaymentInfo({
      donationType: DonationType.Monthly,
      amount: 3.5,
      coverFees: false,
    });
    const el = await fixture<IADonationForm>(
      html`<ia-donation-form .donationInfo=${donationInfo}></ia-donation-form>`,
    );
    const flowHandlers = new MockPaymentFlowHandlers();

    el.paymentFlowHandlers = flowHandlers;
    await elementUpdated(el);
    await promisedSleep(50);

    expect(flowHandlers.paypalHandler.donationInfo).to.equal(donationInfo);
    expect(flowHandlers.paypalHandler.renderPayPalCalledDonationInfo).to.equal(
      donationInfo,
    );
    expect(
      selectorButton(el, '.paypal-container').classList.contains('available'),
    ).to.be.true;
  });

  test('emits paymentProviderSelected with the previous provider', async () => {
    const el = await fixture<IADonationForm>(
      html`<ia-donation-form></ia-donation-form>`,
    );
    el.braintreeManager = new MockBraintreeManager();
    await elementUpdated(el);

    let selected = oneEvent(el, 'paymentProviderSelected');
    selectorButton(el, '.credit-card-button').click();
    let detail = (await selected).detail;
    expect(detail.paymentProvider).to.equal(PaymentProvider.CreditCard);
    expect(detail.previousPaymentProvider).to.be.undefined;

    // Venmo is collapsed behind "change payment method" now, but the button
    // is still in the DOM, so a programmatic click reaches it
    selected = oneEvent(el, 'paymentProviderSelected');
    selectorButton(el, '.venmo').click();
    detail = (await selected).detail;
    expect(detail.paymentProvider).to.equal(PaymentProvider.Venmo);
    expect(detail.previousPaymentProvider).to.equal(PaymentProvider.CreditCard);

    // Changing the payment method clears the selection
    selected = oneEvent(el, 'paymentProviderSelected');
    selectorButton(el, '#change-payment-method').click();
    detail = (await selected).detail;
    expect(detail.paymentProvider).to.be.undefined;
    expect(detail.previousPaymentProvider).to.equal(PaymentProvider.Venmo);
  });

  test('relays a PayPal cancellation and error as flow events', async () => {
    const el = await fixture<IADonationForm>(
      html`<ia-donation-form
        .donationInfo=${fiveDollars()}
      ></ia-donation-form>`,
    );
    const flowHandlers = new MockPaymentFlowHandlers();
    el.paymentFlowHandlers = flowHandlers;
    await elementUpdated(el);

    const cancelled = oneEvent(el, 'paymentFlowCancelled');
    flowHandlers.paypalHandler.emitPaymentCancelledEvent();
    expect((await cancelled).detail.paymentProvider).to.equal(
      PaymentProvider.PayPal,
    );

    const errored = oneEvent(el, 'paymentFlowError');
    flowHandlers.paypalHandler.emitPaymentErrorEvent();
    const errorDetail = (await errored).detail;
    expect(errorDetail.paymentProvider).to.equal(PaymentProvider.PayPal);
    expect(errorDetail.error).to.equal('foo-error');
  });

  test('starts the Google Pay flow straight from its button', async () => {
    const el = await fixture<IADonationForm>(
      html`<ia-donation-form
        .donationInfo=${fiveDollars()}
      ></ia-donation-form>`,
    );
    const flowHandlers = new MockPaymentFlowHandlers();
    el.paymentFlowHandlers = flowHandlers;
    await elementUpdated(el);

    const started = oneEvent(el, 'paymentFlowStarted');
    selectorButton(el, '.googlepay').click();
    expect((await started).detail.paymentProvider).to.equal(
      PaymentProvider.GooglePay,
    );
    expect(
      flowHandlers.googlePayHandler.paymentInitiatedDonationInfo?.amount,
    ).to.equal(5);
  });
});
