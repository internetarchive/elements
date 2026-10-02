import type * as braintree from 'braintree-web';
import { PromisedSingleton } from '@internetarchive/promised-singleton';
import { describe, expect, test } from 'vitest';

import { DonationPaymentInfo } from '../../../models/donation-payment-info';
import { DonationType } from '../../../models/donation-type';
import { MockApplePaySessionManager } from '../../test-helpers/mock-apple-pay.test-helpers';
import { MockApplePayClient } from '../../test-helpers/mock-clients.test-helpers';
import { MockBraintreeManager } from '../../test-helpers/mock-managers.test-helpers';
import { fiveDollars } from '../../test-helpers/mock-models.test-helpers';
import { ApplePayHandler } from './apple-pay';

function setup(options?: {
  canMakePayments?: boolean;
  instancePromisedSingleton?: PromisedSingleton<braintree.ApplePay | undefined>;
}): { handler: ApplePayHandler; sessionManager: MockApplePaySessionManager } {
  const sessionManager = new MockApplePaySessionManager({
    canMakePayments: options?.canMakePayments ?? true,
  });
  const handler = new ApplePayHandler({
    braintreeManager: new MockBraintreeManager(),
    applePayClient: new MockApplePayClient().module,
    applePaySessionManager: sessionManager,
    instancePromisedSingleton: options?.instancePromisedSingleton,
  });
  return { handler, sessionManager };
}

describe('ApplePayHandler', () => {
  describe('isAvailable', () => {
    test('is true when the browser can make payments', async () => {
      const { handler } = setup({ canMakePayments: true });
      expect(await handler.isAvailable()).to.be.true;
    });

    test('is false when the browser cannot make payments', async () => {
      const { handler } = setup({ canMakePayments: false });
      expect(await handler.isAvailable()).to.be.false;
    });

    test('is false when creating the instance fails', async () => {
      const { handler } = setup({
        instancePromisedSingleton: new PromisedSingleton({
          generator: () => Promise.reject(new Error('nope')),
        }),
      });
      expect(await handler.isAvailable()).to.be.false;
    });
  });

  describe('createPaymentRequest', () => {
    test('begins a session and returns its data source', async () => {
      const { handler, sessionManager } = setup();

      const datasource = await handler.createPaymentRequest(
        new Event('click'),
        fiveDollars(),
      );

      expect(datasource.donationInfo.amount).to.equal(5);
      const session = sessionManager.lastSession!;
      expect(session.beginCalled).to.be.true;
      expect(session.paymentRequestCheck?.total).to.deep.equal({
        label: 'Internet Archive',
        amount: '5',
      });
      expect(
        session.paymentRequestCheck?.requiredBillingContactFields,
      ).to.deep.equal(['postalAddress']);
      expect(session.onvalidatemerchant).to.be.a('function');
      expect(session.onpaymentauthorized).to.be.a('function');
      expect(session.oncancel).to.be.a('function');
    });

    test('labels a monthly donation as monthly, with the total including fees', async () => {
      const { handler, sessionManager } = setup();

      await handler.createPaymentRequest(
        new Event('click'),
        new DonationPaymentInfo({
          donationType: DonationType.Monthly,
          amount: 5,
          coverFees: true,
        }),
      );

      expect(
        sessionManager.lastSession?.paymentRequestCheck?.total,
      ).to.deep.equal({
        label: 'Internet Archive Monthly',
        amount: '5.4',
      });
    });

    test('throws when Apple Pay is not available', async () => {
      const { handler } = setup({ canMakePayments: false });

      await expect(
        handler.createPaymentRequest(new Event('click'), fiveDollars()),
      ).rejects.toThrow('not available');
    });
  });
});
