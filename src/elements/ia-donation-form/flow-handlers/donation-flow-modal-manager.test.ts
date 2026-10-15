import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import { MockBraintreeManager } from '../braintree/test-helpers/mock-managers.test-helpers';
import {
  fiveDollars,
  mockBillingInfo,
  mockCustomerInfo,
  mockSuccessResponse,
} from '../braintree/test-helpers/mock-models.test-helpers';
import { SuccessResponse } from '../models/donation-response';
import { DonationType } from '../models/donation-type';
import { PaymentProvider } from '../models/payment-provider';
import { MockDonationEventLogger } from '../test-helpers/mock-analytics.test-helpers';
import type { MockModalManager } from '../test-helpers/mock-modal-manager.test-helpers';
import '../test-helpers/mock-modal-manager.test-helpers';
import { DonationFlowModalManager } from './donation-flow-modal-manager';

async function setup(braintreeManager = new MockBraintreeManager()): Promise<{
  manager: DonationFlowModalManager;
  modalManager: MockModalManager;
  braintreeManager: MockBraintreeManager;
  analytics: MockDonationEventLogger;
}> {
  const modalManager = await fixture<MockModalManager>(
    html`<test-mock-modal-manager></test-mock-modal-manager>`,
  );
  const analytics = new MockDonationEventLogger();
  const manager = new DonationFlowModalManager({
    braintreeManager,
    modalManager,
    analytics,
  });
  return { manager, modalManager, braintreeManager, analytics };
}

/** The text of a lit template with its expressions filled in, whitespace collapsed. */
function templateText(template?: {
  strings: readonly string[];
  values: unknown[];
}): string {
  if (!template) return '';
  return template.strings
    .map(
      (s, i) =>
        s + (i < template.values.length ? String(template.values[i]) : ''),
    )
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

describe('DonationFlowModalManager', () => {
  test('can close the modal', async () => {
    const { manager, modalManager } = await setup();
    manager.closeModal();
    expect(modalManager.closeCalled).to.be.true;
  });

  test('steps the default upsell amount up with the one-time gift', () => {
    expect(DonationFlowModalManager.getDefaultUpsellAmount(1)).to.equal(8);
    expect(DonationFlowModalManager.getDefaultUpsellAmount(10)).to.equal(8);
    expect(DonationFlowModalManager.getDefaultUpsellAmount(10.01)).to.equal(10);
    expect(DonationFlowModalManager.getDefaultUpsellAmount(25)).to.equal(10);
    expect(DonationFlowModalManager.getDefaultUpsellAmount(25.01)).to.equal(25);
    expect(DonationFlowModalManager.getDefaultUpsellAmount(100)).to.equal(25);
    expect(DonationFlowModalManager.getDefaultUpsellAmount(100.01)).to.equal(
      50,
    );
  });

  test('shows the processing modal, which can not be dismissed', async () => {
    const { manager, modalManager } = await setup();
    manager.showProcessingModal();

    const config = modalManager.showModalOptions?.config;
    expect(config?.headerColor).to.equal('#497fbf');
    expect(config?.showProcessingIndicator).to.be.true;
    expect(config?.processingImageMode).to.equal('processing');
    expect(config?.closeOnBackdropClick).to.be.false;
    expect(config?.showCloseButton).to.be.false;
    expect(templateText(config?.title)).to.equal('Processing...');
  });

  test('shows the error modal with the message and the questions link', async () => {
    const { manager, modalManager } = await setup();
    manager.showErrorModal({ message: 'foo-error' });

    const options = modalManager.showModalOptions;
    expect(options?.config.headerColor).to.equal('#691916');
    expect(options?.config.showProcessingIndicator).to.be.false;
    expect(options?.config.closeOnBackdropClick).to.be.true;
    expect(options?.config.showCloseButton).to.be.true;
    expect(templateText(options?.config.headline)).to.equal(
      "There's been a problem completing your donation.",
    );
    expect(templateText(options?.config.message)).to.equal('foo-error');
    expect(templateText(options?.customModalContent)).to.include(
      '<ia-donation-error-modal-content>',
    );
  });

  test('shows the thank you modal and hands the donation to the endpoint manager', async () => {
    const { manager, modalManager, braintreeManager, analytics } =
      await setup();
    manager.showThankYouModal({ successResponse: mockSuccessResponse });

    const config = modalManager.showModalOptions?.config;
    expect(config?.headerColor).to.equal('#55A183');
    expect(config?.processingImageMode).to.equal('complete');
    expect(config?.showProcessingIndicator).to.be.true;
    expect(templateText(config?.title)).to.equal('Thank You!');
    expect(
      braintreeManager.donationSuccessfulOptions?.successResponse,
    ).to.equal(mockSuccessResponse);
    expect(analytics.flowEvents).to.deep.equal([
      ['Donated-CreditCard', DonationType.OneTime],
    ]);
  });

  test('logs the provider and the upsell in the donated event', async () => {
    const { manager, analytics } = await setup();
    const successResponse = new SuccessResponse({
      ...mockSuccessResponse,
      paymentProvider: PaymentProvider.GooglePay,
    });

    manager.showThankYouModal({
      successResponse,
      upsellSuccessResponse: mockSuccessResponse,
    });

    expect(analytics.flowEvents).to.deep.equal([
      ['Donated-GooglePay-upsell', DonationType.OneTime],
    ]);
  });

  test('shows the confirmation step with the right title for an upsell', async () => {
    const { manager, modalManager } = await setup();
    manager.showConfirmationStepModal({
      donationType: DonationType.Upsell,
      amount: 8,
      currencyType: 'USD',
      cancelDonationCB: () => {},
      confirmDonationCB: () => {},
    });

    const config = modalManager.showModalOptions?.config;
    expect(config?.headerColor).to.equal('#55A183');
    expect(config?.closeOnBackdropClick).to.be.false;
    expect(templateText(config?.title)).to.equal('Confirm monthly donation');
    expect(templateText(config?.message)).to.include(
      '<ia-donation-confirm-modal',
    );
  });

  test('cancels the confirmation step when the donor closes the modal', async () => {
    const { manager, modalManager } = await setup();
    let cancelled = 0;
    manager.showConfirmationStepModal({
      donationType: DonationType.OneTime,
      amount: 8,
      currencyType: 'USD',
      cancelDonationCB: () => cancelled++,
      confirmDonationCB: () => {},
    });

    expect(templateText(modalManager.showModalOptions?.config.title)).to.equal(
      'Complete donation',
    );

    modalManager.showModalOptions?.userClosedModalCallback?.();
    expect(cancelled).to.equal(1);
  });

  test('runs the submission flow and returns the response', async () => {
    const { manager, modalManager } = await setup();

    const result = await manager.startDonationSubmissionFlow({
      nonce: 'foo',
      paymentProvider: PaymentProvider.CreditCard,
      donationInfo: fiveDollars(),
      billingInfo: mockBillingInfo,
      customerInfo: mockCustomerInfo,
    });

    expect(result?.success).to.be.true;
    const value = result?.value as SuccessResponse;
    expect(value.amount).to.equal(5);
    expect(value.paymentProvider).to.equal(PaymentProvider.CreditCard);
    expect(value.customer.email).to.equal('foo@bar.com');
    // A one-time donation ends on the upsell
    expect(templateText(modalManager.showModalOptions?.config.title)).to.equal(
      'Donation received',
    );
  });

  test('goes straight to thanks for a monthly donation', async () => {
    const { manager, modalManager } = await setup();

    await manager.startDonationSubmissionFlow({
      nonce: 'foo',
      paymentProvider: PaymentProvider.CreditCard,
      donationInfo: {
        ...fiveDollars(),
        donationType: DonationType.Monthly,
      } as never,
      billingInfo: mockBillingInfo,
      customerInfo: mockCustomerInfo,
    });

    expect(templateText(modalManager.showModalOptions?.config.title)).to.equal(
      'Thank You!',
    );
  });

  test('shows the error modal when the backend rejects the donation', async () => {
    const { manager, modalManager } = await setup(
      new MockBraintreeManager({ submitDonationResponse: 'failure' }),
    );

    const result = await manager.startDonationSubmissionFlow({
      nonce: 'foo',
      paymentProvider: PaymentProvider.CreditCard,
      donationInfo: fiveDollars(),
      billingInfo: mockBillingInfo,
      customerInfo: mockCustomerInfo,
    });

    expect(result?.success).to.be.false;
    expect(templateText(modalManager.showModalOptions?.config.title)).to.equal(
      'Processing error',
    );
    expect(
      templateText(modalManager.showModalOptions?.config.message),
    ).to.equal('error');
  });

  test('shows the error modal when submission throws', async () => {
    const { manager, modalManager } = await setup(
      new MockBraintreeManager({ submitDonationError: true }),
    );

    const result = await manager.startDonationSubmissionFlow({
      nonce: 'foo',
      paymentProvider: PaymentProvider.CreditCard,
      donationInfo: fiveDollars(),
      billingInfo: mockBillingInfo,
      customerInfo: mockCustomerInfo,
    });

    expect(result).to.be.undefined;
    expect(
      templateText(modalManager.showModalOptions?.config.message),
    ).to.equal('oh no');
  });
});
