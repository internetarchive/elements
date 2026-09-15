import type * as paypal from 'paypal-checkout-components';
import { describe, expect, test } from 'vitest';

import { DonationPaymentInfo } from '../../../models/donation-payment-info';
import { DonationType } from '../../../models/donation-type';
import { MockPayPalClient } from '../../test-helpers/mock-clients.test-helpers';
import { MockPayPalButtonDataSourceDelegate } from '../../test-helpers/mock-paypal.test-helpers';
import { PayPalButtonDataSource } from './paypal-button-datasource';

function setup(donation: {
  donationType: DonationType;
  amount: number;
  coverFees?: boolean;
}): {
  datasource: PayPalButtonDataSource;
  delegate: MockPayPalButtonDataSourceDelegate;
  client: MockPayPalClient;
} {
  const delegate = new MockPayPalButtonDataSourceDelegate();
  const client = new MockPayPalClient();
  const datasource = new PayPalButtonDataSource({
    donationInfo: new DonationPaymentInfo({
      donationType: donation.donationType,
      amount: donation.amount,
      coverFees: donation.coverFees ?? false,
    }),
    paypalInstance: client.instance,
  });
  datasource.delegate = delegate;
  return { datasource, delegate, client };
}

describe('PayPalButtonDataSource', () => {
  describe('payment start', () => {
    test('tells the delegate and creates the payment when the button is pressed', async () => {
      const { datasource, delegate, client } = setup({
        donationType: DonationType.Monthly,
        amount: 3.5,
      });

      const result = await datasource.payment();

      expect(delegate.paymentStartedResults.called).to.be.true;
      expect(client.createPaymentResults.called).to.be.true;
      expect(result).to.equal('createPaymentCalled');
    });

    test('sends a one-time donation as a checkout for the amount', async () => {
      const { datasource, delegate } = setup({
        donationType: DonationType.OneTime,
        amount: 3.5,
      });

      await datasource.payment();

      expect(delegate.paymentStartedResults.options).to.deep.equal({
        flow: 'checkout',
        enableShippingAddress: true,
        amount: 3.5,
        currency: 'USD',
        intent: 'capture',
      });
    });

    test('includes the fee in a one-time donation when the donor covers it', async () => {
      const expectedTotal = DonationPaymentInfo.calculateTotal(3.5, true);
      const { datasource, delegate } = setup({
        donationType: DonationType.OneTime,
        amount: 3.5,
        coverFees: true,
      });

      await datasource.payment();

      expect(delegate.paymentStartedResults.options).to.deep.equal({
        flow: 'checkout',
        enableShippingAddress: true,
        amount: expectedTotal,
        currency: 'USD',
        intent: 'capture',
      });
    });

    test('sends a monthly donation as a vault with a billing agreement', async () => {
      const { datasource, delegate } = setup({
        donationType: DonationType.Monthly,
        amount: 1.5,
      });

      await datasource.payment();

      expect(delegate.paymentStartedResults.options).to.deep.equal({
        flow: 'vault',
        enableShippingAddress: true,
        billingAgreementDescription: 'Subscribe to donate $1.50 monthly',
        intent: 'capture',
      });
    });
  });

  describe('payment authorized', () => {
    test('tokenizes the payment and tells the delegate', async () => {
      const { datasource, delegate, client } = setup({
        donationType: DonationType.OneTime,
        amount: 3.5,
      });
      const authData: paypal.AuthorizationData = {
        payerId: 'foo',
        paymentId: '1234',
      };

      const result = await datasource.onAuthorize(authData);

      expect(client.tokenizePaymentResults.tokenizeOptions).to.equal(authData);
      expect(delegate.paymentAuthorizedResults.called).to.be.true;
      expect(delegate.paymentAuthorizedResults.payload?.nonce).to.equal(
        'foo-nonce',
      );
      expect(result.nonce).to.equal('foo-nonce');
      expect(result.type).to.equal('foo-type');
    });

    test('tokenizes the payment and tells the delegate on confirmation', async () => {
      const { datasource, delegate } = setup({
        donationType: DonationType.OneTime,
        amount: 3.5,
      });

      const result = await datasource.onConfirm({ payerId: 'foo' });

      expect(delegate.paymentConfirmedResults.called).to.be.true;
      expect(delegate.paymentConfirmedResults.payload).to.equal(result);
    });
  });

  test('tells the delegate when the payment is cancelled', () => {
    const { datasource, delegate } = setup({
      donationType: DonationType.OneTime,
      amount: 3.5,
    });
    const cancelData = { foo: 'bar' };

    datasource.onCancel(cancelData);

    expect(delegate.paymentCancelledResults.called).to.be.true;
    expect(delegate.paymentCancelledResults.data).to.deep.equal(cancelData);
  });

  test('tells the delegate when there has been a payment error', () => {
    const { datasource, delegate } = setup({
      donationType: DonationType.OneTime,
      amount: 3.5,
    });

    datasource.onError('foo-error');

    expect(delegate.paymentErrorResults.called).to.be.true;
    expect(delegate.paymentErrorResults.error).to.equal('foo-error');
  });
});
