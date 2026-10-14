import type { DonationResponse } from '../../models/donation-response';
import type { ApplePaySessionDataSourceDelegate } from '../payment-providers/apple-pay/apple-pay-session-datasource-interface';
import type { ApplePaySessionManagerInterface } from '../payment-providers/apple-pay/apple-pay-session-manager';

/**
 * Stands in for the browser's `ApplePaySession`. Install it with
 * `setGlobal('ApplePaySession', MockApplePaySession)` for code that reads the
 * global, and read `session` for code that wants an instance.
 */
export class MockApplePaySession {
  static STATUS_SUCCESS = 0;
  static STATUS_FAILURE = 1;

  static canMakePayments(): boolean {
    return true;
  }

  static supportsVersion(): boolean {
    return true;
  }

  versionCheck: number;
  paymentRequestCheck?: ApplePayJS.ApplePayPaymentRequest;
  completeMerchantValidationCalled = false;
  abortCalled = false;
  beginCalled = false;
  completePaymentResult?: number;

  onvalidatemerchant?: (
    event: ApplePayJS.ApplePayValidateMerchantEvent,
  ) => void;
  onpaymentauthorized?: (
    event: ApplePayJS.ApplePayPaymentAuthorizedEvent,
  ) => void;
  oncancel?: () => void;

  constructor(version = 3, paymentRequest?: ApplePayJS.ApplePayPaymentRequest) {
    this.versionCheck = version;
    this.paymentRequestCheck = paymentRequest;
  }

  abort(): void {
    this.abortCalled = true;
  }

  begin(): void {
    this.beginCalled = true;
  }

  completeMerchantValidation(): void {
    this.completeMerchantValidationCalled = true;
  }

  completePayment(result: number): void {
    this.completePaymentResult = result;
  }

  get session(): ApplePaySession {
    return this as unknown as ApplePaySession;
  }
}

export class MockApplePaySessionManager
  implements ApplePaySessionManagerInterface
{
  lastSession?: MockApplePaySession;

  private makePayments: boolean;

  constructor(options: { canMakePayments: boolean }) {
    this.makePayments = options.canMakePayments;
  }

  canMakePayments(): boolean {
    return this.makePayments;
  }

  createNewPaymentSession(
    paymentRequest: ApplePayJS.ApplePayPaymentRequest,
  ): ApplePaySession {
    this.lastSession = new MockApplePaySession(1, paymentRequest);
    return this.lastSession.session;
  }
}

export const mockApplePayPaymentRequest: ApplePayJS.ApplePayPaymentRequest = {
  total: { label: 'Foo Donation', amount: '3.50' },
  countryCode: 'US',
  currencyCode: 'USD',
  supportedNetworks: ['visa', 'masterCard'],
  merchantCapabilities: ['supports3DS'],
  requiredBillingContactFields: ['postalAddress'],
  requiredShippingContactFields: ['name', 'email'],
};

export const mockValidateMerchantEvent = {
  validationURL: 'foo',
} as unknown as ApplePayJS.ApplePayValidateMerchantEvent;

const mockContact: ApplePayJS.ApplePayPaymentContact = {
  emailAddress: 'foo@bar.com',
  familyName: 'McBarrison',
  givenName: 'Fooey',
  phoneNumber: '123-456-7890',
  addressLines: ['123 Fake St', 'Apt 123'],
  locality: 'San Francisco',
  administrativeArea: 'CA',
  postalCode: '12345',
  country: 'United States',
  countryCode: 'US',
};

export const mockPaymentAuthorizedEvent = {
  payment: {
    token: {
      paymentData: { some: 'data' },
      paymentMethod: {
        displayName: 'displayName-foo',
        network: 'network-bar',
        type: 'credit',
      },
      transactionIdentifier: 'foo-transaction-id',
    },
    billingContact: mockContact,
    shippingContact: mockContact,
  },
} as unknown as ApplePayJS.ApplePayPaymentAuthorizedEvent;

export class MockApplePaySessionDataSourceDelegate
  implements ApplePaySessionDataSourceDelegate
{
  paymentCompleteResponse?: DonationResponse;
  paymentFailedError?: unknown;
  paymentCancelledCalled = false;

  paymentComplete(response: DonationResponse): void {
    this.paymentCompleteResponse = response;
  }

  paymentFailed(error: unknown): void {
    this.paymentFailedError = error;
  }

  paymentCancelled(): void {
    this.paymentCancelledCalled = true;
  }
}
