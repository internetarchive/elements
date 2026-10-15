import { describe, expect, test } from 'vitest';

import {
  DonationRequest,
  DonationRequestCustomFields,
} from './donation-request';
import { DonationType } from './donation-type';
import { BillingInfo, CustomerInfo } from './donor-contact-info';
import { PaymentProvider } from './payment-provider';

describe('DonationRequest', () => {
  test('carries the payment, amount and contact details', () => {
    const customer = new CustomerInfo({ email: 'foo@bar.com' });
    const billing = new BillingInfo({ postalCode: '12345' });
    const request = new DonationRequest({
      paymentProvider: PaymentProvider.PayPal,
      paymentMethodNonce: 'nonce',
      recaptchaToken: 'token',
      customerId: 'cust',
      deviceData: 'device',
      upsellOnetimeTransactionId: 'txn',
      bin: '411111',
      binName: 'Visa',
      amount: 12.34,
      donationType: DonationType.Monthly,
      customer,
      billing,
    });

    expect(request.paymentProvider).to.equal(PaymentProvider.PayPal);
    expect(request.paymentMethodNonce).to.equal('nonce');
    expect(request.recaptchaToken).to.equal('token');
    expect(request.customerId).to.equal('cust');
    expect(request.deviceData).to.equal('device');
    expect(request.upsellOnetimeTransactionId).to.equal('txn');
    expect(request.bin).to.equal('411111');
    expect(request.binName).to.equal('Visa');
    expect(request.amount).to.equal(12.34);
    expect(request.donationType).to.equal(DonationType.Monthly);
    expect(request.customer).to.equal(customer);
    expect(request.billing).to.equal(billing);
  });

  test('defaults to empty custom fields', () => {
    const request = new DonationRequest({
      paymentProvider: PaymentProvider.CreditCard,
      paymentMethodNonce: 'nonce',
      amount: 5,
      donationType: DonationType.OneTime,
      customer: new CustomerInfo(),
      billing: new BillingInfo(),
    });

    expect(request.customFields).to.be.instanceOf(DonationRequestCustomFields);
    expect(request.customFields.origin).to.be.undefined;
    expect(request.customFields.referrer).to.be.undefined;
  });

  test('keeps the custom fields it is given', () => {
    const customFields = new DonationRequestCustomFields({
      logged_in_user: 'someone',
      referrer: 'https://archive.org',
      fee_amount_covered: 0.4,
      origin: 'DonateBanner-Campaign-Variant',
    });
    const request = new DonationRequest({
      paymentProvider: PaymentProvider.CreditCard,
      paymentMethodNonce: 'nonce',
      amount: 5,
      donationType: DonationType.OneTime,
      customer: new CustomerInfo(),
      billing: new BillingInfo(),
      customFields,
    });

    expect(request.customFields).to.equal(customFields);
    expect(request.customFields.logged_in_user).to.equal('someone');
    expect(request.customFields.referrer).to.equal('https://archive.org');
    expect(request.customFields.fee_amount_covered).to.equal(0.4);
    expect(request.customFields.origin).to.equal(
      'DonateBanner-Campaign-Variant',
    );
  });
});
