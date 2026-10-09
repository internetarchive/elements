import { describe, expect, test } from 'vitest';

import {
  CodedError,
  DonationResponse,
  ErrorResponse,
  SubscriptionResponse,
  SuccessResponse,
} from './donation-response';
import { DonationType } from './donation-type';
import { BillingInfo, CustomerInfo } from './donor-contact-info';
import { PaymentProvider } from './payment-provider';

function successParams() {
  return {
    paymentProvider: PaymentProvider.CreditCard,
    paymentMethodNonce: 'foo',
    amount: 12.34,
    donationType: DonationType.OneTime,
    transaction_id: 'bar',
    customer_id: '12345',
    customer: new CustomerInfo({
      email: 'foo@bar.com',
      firstName: 'foo',
      lastName: 'bar',
    }),
    billing: new BillingInfo({
      streetAddress: '123 Fake St',
      extendedAddress: 'Apt 123',
      locality: 'SF',
      region: 'CA',
      postalCode: '12345',
      countryCodeAlpha2: 'US',
    }),
  };
}

describe('SuccessResponse', () => {
  test('carries the transaction and contact details', () => {
    const response = new SuccessResponse(successParams());

    expect(response.paymentProvider).to.equal(PaymentProvider.CreditCard);
    expect(response.transaction_id).to.equal('bar');
    expect(response.customer_id).to.equal('12345');
    expect(response.amount).to.equal(12.34);
    expect(response.customer.email).to.equal('foo@bar.com');
    expect(response.billing.postalCode).to.equal('12345');
    expect(response.subscription).to.be.undefined;
  });

  test('can initialize with a subscription', () => {
    const response = new SuccessResponse({
      ...successParams(),
      subscription: new SubscriptionResponse({ id: '12345' }),
    });

    expect(response.subscription?.id).to.equal('12345');
  });

  test('rebuilds plain JSON objects into the model classes', () => {
    const json = JSON.parse(JSON.stringify(successParams()));
    const response = new SuccessResponse(json);

    expect(response.customer).to.be.instanceOf(CustomerInfo);
    expect(response.billing).to.be.instanceOf(BillingInfo);
  });
});

describe('ErrorResponse', () => {
  test('can initialize with just a message', () => {
    const errorResponse = new ErrorResponse({ message: 'Foo went bad' });

    expect(errorResponse.message).to.equal('Foo went bad');
    expect(errorResponse.errors.length).to.equal(0);
  });

  test('can initialize with coded errors', () => {
    const errorResponse = new ErrorResponse({
      message: 'Foo went bad',
      errors: [{ code: '12345', message: 'Foo went bad' }],
    });

    expect(errorResponse.message).to.equal('Foo went bad');
    expect(errorResponse.errors.length).to.equal(1);
    expect(errorResponse.errors[0]).to.be.instanceOf(CodedError);
    expect(errorResponse.errors[0].code).to.equal('12345');
    expect(errorResponse.errors[0].message).to.equal('Foo went bad');
  });
});

describe('DonationResponse', () => {
  test('can initialize with a success response', () => {
    const donationResponse = new DonationResponse({
      success: true,
      value: new SuccessResponse(successParams()),
    });

    expect(donationResponse.success).to.be.true;
    expect(donationResponse.value).to.be.instanceOf(SuccessResponse);
  });

  test('can initialize with an error response', () => {
    const donationResponse = new DonationResponse({
      success: false,
      value: new ErrorResponse({ message: 'Foo went bad' }),
    });

    expect(donationResponse.success).to.be.false;
    expect(donationResponse.value).to.be.instanceOf(ErrorResponse);
  });
});
