import { afterEach, beforeEach, describe, expect, test } from 'vitest';

import type { SuccessResponse } from '../../../models/donation-response';
import { PaymentProvider } from '../../../models/payment-provider';
import {
  MockApplePaySession,
  MockApplePaySessionDataSourceDelegate,
  mockPaymentAuthorizedEvent,
  mockValidateMerchantEvent,
} from '../../test-helpers/mock-apple-pay.test-helpers';
import {
  MockApplePayClient,
  mockBraintreeError,
} from '../../test-helpers/mock-clients.test-helpers';
import { MockBraintreeManager } from '../../test-helpers/mock-managers.test-helpers';
import {
  fiveDollars,
  setGlobal,
} from '../../test-helpers/mock-models.test-helpers';
import { ApplePaySessionDataSource } from './apple-pay-session-datasource';

function setup(options?: {
  client?: MockApplePayClient;
  braintreeManager?: MockBraintreeManager;
}): {
  datasource: ApplePaySessionDataSource;
  session: MockApplePaySession;
  delegate: MockApplePaySessionDataSourceDelegate;
  braintreeManager: MockBraintreeManager;
} {
  const session = new MockApplePaySession();
  const delegate = new MockApplePaySessionDataSourceDelegate();
  const braintreeManager =
    options?.braintreeManager ?? new MockBraintreeManager();
  const datasource = new ApplePaySessionDataSource({
    donationInfo: fiveDollars(),
    session: session.session,
    applePayInstance: (options?.client ?? new MockApplePayClient()).instance,
    braintreeManager,
  });
  datasource.delegate = delegate;
  return { datasource, session, delegate, braintreeManager };
}

describe('ApplePaySessionDataSource', () => {
  // The data source reads the STATUS_* codes off the global
  beforeEach(() => setGlobal('ApplePaySession', MockApplePaySession));
  afterEach(() => setGlobal('ApplePaySession', undefined));

  describe('onvalidatemerchant', () => {
    test('validates with Braintree and completes merchant validation', async () => {
      const { datasource, session } = setup();

      await datasource.onvalidatemerchant(mockValidateMerchantEvent);

      expect(session.completeMerchantValidationCalled).to.be.true;
    });

    test('tells the delegate and aborts the session if validation fails', async () => {
      const { datasource, session, delegate } = setup({
        client: new MockApplePayClient({ shouldValidateMerchant: false }),
      });

      await expect(
        datasource.onvalidatemerchant(mockValidateMerchantEvent),
      ).rejects.toMatch(/Merchant validation error/);

      expect(session.abortCalled).to.be.true;
      expect(delegate.paymentFailedError).to.equal(mockBraintreeError);
    });
  });

  test('tells the delegate when the payment is cancelled', async () => {
    const { datasource, delegate } = setup();

    await datasource.oncancel();

    expect(delegate.paymentCancelledCalled).to.be.true;
  });

  describe('onpaymentauthorized', () => {
    test('submits the donation with the contact details from the sheet and completes the session', async () => {
      const { datasource, session, delegate, braintreeManager } = setup();

      await datasource.onpaymentauthorized(mockPaymentAuthorizedEvent);

      expect(session.completePaymentResult).to.equal(
        MockApplePaySession.STATUS_SUCCESS,
      );
      expect(braintreeManager.submittedOptions?.paymentProvider).to.equal(
        PaymentProvider.ApplePay,
      );
      expect(braintreeManager.submittedOptions?.nonce).to.equal('foo-nonce');

      const response = delegate.paymentCompleteResponse;
      expect(response?.success).to.be.true;
      const value = response?.value as SuccessResponse;
      expect(value.amount).to.equal(5);
      expect(value.customer.email).to.equal('foo@bar.com');
      expect(value.customer.firstName).to.equal('Fooey');
      expect(value.billing.streetAddress).to.equal('123 Fake St');
      expect(value.billing.extendedAddress).to.equal('Apt 123');
      expect(value.billing.region).to.equal('CA');
    });

    test('tells the delegate and fails the session when tokenization fails', async () => {
      const { datasource, session, delegate } = setup({
        client: new MockApplePayClient({ shouldTokenizeSuccessfully: false }),
      });

      await datasource.onpaymentauthorized(mockPaymentAuthorizedEvent);

      expect(session.completePaymentResult).to.equal(
        MockApplePaySession.STATUS_FAILURE,
      );
      expect(delegate.paymentFailedError).to.equal(mockBraintreeError);
    });

    test('tells the delegate and fails the session when the backend rejects the donation', async () => {
      const { datasource, session, delegate } = setup({
        braintreeManager: new MockBraintreeManager({
          submitDonationResponse: 'failure',
        }),
      });

      await datasource.onpaymentauthorized(mockPaymentAuthorizedEvent);

      expect(session.completePaymentResult).to.equal(
        MockApplePaySession.STATUS_FAILURE,
      );
      expect(delegate.paymentFailedError).to.equal('Failure submitting data');
    });

    test('tells the delegate and fails the session when submission throws', async () => {
      const { datasource, session, delegate } = setup({
        braintreeManager: new MockBraintreeManager({
          submitDonationError: true,
        }),
      });

      await datasource.onpaymentauthorized(mockPaymentAuthorizedEvent);

      expect(session.completePaymentResult).to.equal(
        MockApplePaySession.STATUS_FAILURE,
      );
      expect(delegate.paymentFailedError).to.equal('oh no');
    });
  });
});
