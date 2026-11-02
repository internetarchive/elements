import { elementUpdated, fixture } from '@open-wc/testing-helpers';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { html } from 'lit';

import { HostingEnvironment } from './braintree/hosting-environment';
import {
  MockGrecaptcha,
  MockGrecaptchaMode,
  MockHostedFieldsClient,
} from './braintree/test-helpers/mock-clients.test-helpers';
import {
  MockEndpointManager,
  MockPaymentClients,
} from './braintree/test-helpers/mock-managers.test-helpers';
import { setGlobal } from './braintree/test-helpers/mock-models.test-helpers';
import type { IADonationContactForm } from './form-elements/contact-form/ia-donation-contact-form';
import type { IADonationEditDonation } from './form-elements/ia-donation-edit-donation';
import type { IADonationHeader } from './form-elements/ia-donation-header';
import type { IADonationPaymentSelector } from './form-elements/ia-donation-payment-selector';
import type { IADonationForm } from './ia-donation-form';
import type { IADonationFormController } from './ia-donation-form-controller';
import {
  fillInContactForm,
  oneEvent,
  promisedSleep,
} from './test-helpers/dom.test-helpers';
import { MockAnalyticsManager } from './test-helpers/mock-analytics.test-helpers';
import { MockPaymentFlowHandlers } from './test-helpers/mock-flow-handlers.test-helpers';
import type { MockModalManager } from './test-helpers/mock-modal-manager.test-helpers';
import './test-helpers/mock-modal-manager.test-helpers';
import './ia-donation-form-controller';

function donationForm(controller: IADonationFormController): IADonationForm {
  return controller.querySelector('ia-donation-form')!;
}

function paymentSelector(
  controller: IADonationFormController,
): IADonationPaymentSelector {
  return donationForm(controller).shadowRoot!.querySelector(
    'ia-donation-payment-selector',
  )!;
}

async function setup(analyticsCategory = 'FooCategory'): Promise<{
  controller: IADonationFormController;
  analytics: MockAnalyticsManager;
}> {
  const analytics = new MockAnalyticsManager();
  const controller = await fixture<IADonationFormController>(html`
    <ia-donation-form-controller
      .analyticsCategory=${analyticsCategory}
      .analyticsHandler=${analytics}
    ></ia-donation-form-controller>
  `);
  return { controller, analytics };
}

describe('IADonationFormController', () => {
  beforeEach(() => {
    setGlobal('grecaptcha', new MockGrecaptcha(MockGrecaptchaMode.Success));
  });

  afterEach(() => {
    setGlobal('grecaptcha', undefined);
  });

  test('renders into the light DOM', async () => {
    const { controller } = await setup();
    expect(controller.shadowRoot).to.be.null;
    expect(controller.querySelector('ia-donation-form')).to.exist;
    expect(controller.querySelector('ia-donation-contact-form')).to.exist;
    expect(controller.querySelector('#braintree-creditcard')).to.exist;
  });

  test('can submit a credit card donation end to end', async () => {
    const { controller, analytics } = await setup();

    const endpointManager = new MockEndpointManager();
    const paymentClients = new MockPaymentClients();
    const modalManager = await fixture<MockModalManager>(
      html`<test-mock-modal-manager></test-mock-modal-manager>`,
    );
    const recaptchaElement = await fixture<HTMLElement>(html`<div></div>`);
    controller.paymentClients = paymentClients;
    controller.modalManager = modalManager;
    controller.environment = HostingEnvironment.Development;
    controller.recaptchaElement = recaptchaElement;
    controller.endpointManager = endpointManager;
    controller.braintreeAuthToken = 'foo';
    controller.recaptchaSiteKey = 'bar';
    controller.venmoProfileId = 'baz';
    controller.referrer = 'test-referrer';
    controller.loggedInUser = 'test-user';
    await elementUpdated(controller);
    await promisedSleep(50);

    // Pick credit card, which shows the contact form
    paymentSelector(controller)
      .shadowRoot!.querySelector<HTMLButtonElement>('.credit-card-button')!
      .click();
    await elementUpdated(donationForm(controller));
    await promisedSleep(50);
    fillInContactForm(
      controller.querySelector<IADonationContactForm>(
        'ia-donation-contact-form',
      )!,
    );

    // The donor fills in the card, which the hosted fields report as valid
    const hostedFields =
      (await paymentClients.hostedFields.get()) as unknown as MockHostedFieldsClient;
    hostedFields.emitValidityChangedEvent(true);
    await promisedSleep(50);
    expect(endpointManager.requestSubmitted).to.be.undefined;

    donationForm(controller)
      .shadowRoot!.querySelector<HTMLButtonElement>('#donate-button')!
      .click();
    await promisedSleep(100);

    expect(analytics.sendEventOptions?.action).to.equal('PaymentFlowStarted');
    const request = endpointManager.requestSubmitted;
    expect(request).to.exist;
    expect(request?.paymentProvider).to.equal('Credit Card');
    expect(request?.recaptchaToken).to.equal('foo');
    expect(request?.customer.email).to.equal('foo@bar.com');
    expect(request?.customFields.referrer).to.equal('test-referrer');
    expect(request?.customFields.logged_in_user).to.equal('test-user');
    // The processing modal went up, then the upsell for a one-time gift
    expect(modalManager.showModalOptions).to.exist;
  });

  test('sends a Viewed event when it first renders', async () => {
    const { analytics } = await setup();
    expect(analytics.sendEventOptions?.category).to.equal('FooCategory');
    expect(analytics.sendEventOptions?.action).to.equal('Viewed');
  });

  test('sends DonationInfoChanged when the donor changes the amount', async () => {
    const { controller, analytics } = await setup();
    const header =
      donationForm(controller).shadowRoot!.querySelector<IADonationHeader>(
        'ia-donation-header',
      )!;
    const editDonation =
      header.shadowRoot!.querySelector<IADonationEditDonation>(
        'ia-donation-edit-donation',
      )!;

    editDonation
      .shadowRoot!.querySelector<HTMLInputElement>(
        '#donationType-monthly-option',
      )!
      .click();

    expect(analytics.sendEventOptions?.category).to.equal('FooCategory');
    expect(analytics.sendEventOptions?.action).to.equal('DonationInfoChanged');
    expect(controller.donationInfo.donationType).to.equal('monthly');
  });

  test('sends ProviderFirstSelected and then ProviderChangedTo events', async () => {
    const { controller, analytics } = await setup();
    const form = donationForm(controller);
    const selector = paymentSelector(controller);

    let selected = oneEvent(form, 'paymentProviderSelected');
    selector
      .shadowRoot!.querySelector<HTMLButtonElement>('.credit-card-button')!
      .click();
    await selected;
    expect(analytics.sendEventOptions?.action).to.equal(
      'ProviderFirstSelected-CreditCard',
    );

    // The Venmo button is collapsed but still in the DOM, so a programmatic
    // click switches providers
    selected = oneEvent(form, 'paymentProviderSelected');
    selector.shadowRoot!.querySelector<HTMLButtonElement>('.venmo')!.click();
    await selected;
    expect(analytics.sendEventOptions?.action).to.equal(
      'ProviderChangedTo-Venmo',
    );
    expect(analytics.sendEventOptions?.label).to.equal(
      'ProviderChangedFrom-CreditCard',
    );

    // Change payment method clears the provider
    selected = oneEvent(form, 'paymentProviderSelected');
    selector
      .shadowRoot!.querySelector<HTMLButtonElement>('#change-payment-method')!
      .click();
    await selected;
    expect(analytics.sendEventOptions?.action).to.equal(
      'ProviderChangedTo-unset',
    );
    expect(analytics.sendEventOptions?.label).to.equal(
      'ProviderChangedFrom-Venmo',
    );
  });

  test('sends PaymentFlowCancelled and PaymentFlowError with the provider', async () => {
    const { controller, analytics } = await setup();
    const form = donationForm(controller);
    const flowHandlers = new MockPaymentFlowHandlers();
    form.paymentFlowHandlers = flowHandlers;
    await elementUpdated(form);
    await promisedSleep(50);

    flowHandlers.paypalHandler.emitPaymentCancelledEvent();
    expect(analytics.sendEventOptions?.action).to.equal('PaymentFlowCancelled');
    expect(analytics.sendEventOptions?.label).to.equal('PayPal');

    flowHandlers.paypalHandler.emitPaymentErrorEvent();
    expect(analytics.sendEventOptions?.action).to.equal('PaymentFlowError');
    expect(analytics.sendEventOptions?.label).to.equal('PayPal-foo-error');
  });

  test('logs referrer and origin as unsampled flow events', async () => {
    const { controller, analytics } = await setup();

    controller.referrer = 'https://archive.org/details/foo';
    controller.origin = 'DonateBanner-Test-Variant';
    await elementUpdated(controller);

    const flowEvents = analytics.events.filter(
      (e) => e.category === 'DonationFlow',
    );
    expect(flowEvents.map((e) => [e.action, e.label])).to.deep.equal([
      ['referrer', 'https://archive.org/details/foo'],
      ['origin', 'DonateBanner-Test-Variant'],
    ]);
  });
});
