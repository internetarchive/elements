import { DonationPaymentInfo } from '../../models/donation-payment-info';
import { SuccessResponse } from '../../models/donation-response';
import { DonationType } from '../../models/donation-type';
import { BillingInfo, CustomerInfo } from '../../models/donor-contact-info';
import { PaymentProvider } from '../../models/payment-provider';

/** A $5 one-time gift, not covering fees. */
export function fiveDollars(): DonationPaymentInfo {
  return new DonationPaymentInfo({
    donationType: DonationType.OneTime,
    amount: 5,
    coverFees: false,
  });
}

export const mockBillingInfo = new BillingInfo({
  streetAddress: '123 Fake St',
  extendedAddress: 'Apt 123',
  locality: 'San Francisco',
  region: 'CA',
  postalCode: '12345',
  countryCodeAlpha2: 'US',
});

export const mockCustomerInfo = new CustomerInfo({
  email: 'foo@bar.com',
  firstName: 'Fooey',
  lastName: 'McBarrison',
});

export const mockSuccessResponse = new SuccessResponse({
  paymentProvider: PaymentProvider.CreditCard,
  paymentMethodNonce: 'foo-nonce',
  amount: 5,
  donationType: DonationType.OneTime,
  transaction_id: '123',
  customer_id: '123',
  customer: mockCustomerInfo,
  billing: mockBillingInfo,
});

/** Sets or removes a global the payment libraries would normally create. */
export function setGlobal(name: string, value: unknown): void {
  if (value === undefined) {
    Reflect.deleteProperty(window, name);
  } else {
    Reflect.set(window, name, value);
  }
}
