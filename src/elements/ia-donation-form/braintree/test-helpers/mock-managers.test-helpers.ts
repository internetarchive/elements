import type * as braintree from 'braintree-web';
import type * as paypal from 'paypal-checkout-components';
import type {
  LazyLoaderServiceEvents,
  LazyLoaderServiceInterface,
} from '@internetarchive/lazy-loader-service';
import { PromisedSingleton } from '@internetarchive/promised-singleton';
import { createNanoEvents, type Unsubscribe } from 'nanoevents';

import type { DonationPaymentInfo } from '../../models/donation-payment-info';
import type { DonationRequest } from '../../models/donation-request';
import {
  DonationResponse,
  ErrorResponse,
  SuccessResponse,
} from '../../models/donation-response';
import type {
  BillingInfo,
  CustomerInfo,
} from '../../models/donor-contact-info';
import type { PaymentProvider } from '../../models/payment-provider';
import type {
  BraintreeEndpointManagerInterface,
  BraintreeManagerEvents,
  BraintreeManagerInterface,
} from '../braintree-manager-interface';
import type { PaymentClientsInterface } from '../payment-clients';
import type {
  PaymentProvidersEvents,
  PaymentProvidersInterface,
} from '../payment-providers-interface';
import type { ApplePayHandlerInterface } from '../payment-providers/apple-pay/apple-pay-interface';
import type { ApplePaySessionDataSourceInterface } from '../payment-providers/apple-pay/apple-pay-session-datasource-interface';
import type {
  CreditCardHandlerEvents,
  CreditCardHandlerInterface,
} from '../payment-providers/credit-card/credit-card-interface';
import { HostedFieldConfiguration } from '../payment-providers/credit-card/hosted-field-configuration';
import type { HostedFieldContainerInterface } from '../payment-providers/credit-card/hosted-field-container';
import type { GooglePayHandlerInterface } from '../payment-providers/google-pay/google-pay-interface';
import type { PayPalButtonDataSourceInterface } from '../payment-providers/paypal/paypal-button-datasource';
import type { PayPalHandlerInterface } from '../payment-providers/paypal/paypal-interface';
import type { VenmoHandlerInterface } from '../payment-providers/venmo/venmo-interface';
import {
  MockApplePayClient,
  MockBraintreeClient,
  MockDataCollector,
  MockGooglePayLibrary,
  MockGooglePaymentClient,
  MockGrecaptcha,
  MockGrecaptchaMode,
  MockHostedFieldsClient,
  MockPayPalClient,
  MockPaypalLibrary,
  MockVenmoClient,
  mockHostedFieldTokenizePayload,
} from './mock-clients.test-helpers';
import { mockSuccessResponse } from './mock-models.test-helpers';

export class MockLazyLoader implements LazyLoaderServiceInterface {
  loadedScripts: string[] = [];

  private emitter = createNanoEvents<LazyLoaderServiceEvents>();

  on<E extends keyof LazyLoaderServiceEvents>(
    event: E,
    callback: LazyLoaderServiceEvents[E],
  ): Unsubscribe {
    return this.emitter.on(event, callback);
  }

  async loadBundle(): Promise<void> {
    return;
  }

  async loadScript(options: { src: string }): Promise<void> {
    this.loadedScripts.push(options.src);
  }
}

export class MockEndpointManager implements BraintreeEndpointManagerInterface {
  requestSubmitted?: DonationRequest;

  successResponseSubmitted?: SuccessResponse;

  upsellSuccessResponseSubmitted?: SuccessResponse;

  async submitData(request: DonationRequest): Promise<DonationResponse> {
    this.requestSubmitted = request;
    return new DonationResponse({ success: true, value: mockSuccessResponse });
  }

  donationSuccessful(options: {
    successResponse: SuccessResponse;
    upsellSuccessResponse?: SuccessResponse;
  }): void {
    this.successResponseSubmitted = options.successResponse;
    this.upsellSuccessResponseSubmitted = options.upsellSuccessResponse;
  }
}

/** Resolves straight to the given value. */
function singleton<T>(value: T): PromisedSingleton<T> {
  return new PromisedSingleton<T>({ generator: async () => value });
}

export class MockPaymentClients implements PaymentClientsInterface {
  braintreeClient: PromisedSingleton<typeof braintree.client>;
  dataCollector: PromisedSingleton<typeof braintree.dataCollector>;
  hostedFields: PromisedSingleton<typeof braintree.hostedFields>;
  venmo: PromisedSingleton<typeof braintree.venmo>;
  payPal: PromisedSingleton<typeof braintree.paypalCheckout>;
  applePay: PromisedSingleton<typeof braintree.applePay>;
  googlePayBraintreeClient: PromisedSingleton<typeof braintree.googlePayment>;
  googlePaymentsClient: PromisedSingleton<google.payments.api.PaymentsClient>;
  recaptchaLibrary: PromisedSingleton<ReCaptchaV2.ReCaptcha>;
  paypalLibrary: PromisedSingleton<typeof paypal>;

  constructor(overrides?: Partial<PaymentClientsInterface>) {
    const googlePayLibrary = new MockGooglePayLibrary();
    googlePayLibrary.readyToPay = true;

    this.braintreeClient =
      overrides?.braintreeClient ?? singleton(new MockBraintreeClient().module);
    this.dataCollector =
      overrides?.dataCollector ?? singleton(new MockDataCollector().module);
    this.hostedFields =
      overrides?.hostedFields ?? singleton(new MockHostedFieldsClient().module);
    this.venmo =
      overrides?.venmo ??
      singleton(new MockVenmoClient({ isBrowserSupported: true }).module);
    this.payPal = overrides?.payPal ?? singleton(new MockPayPalClient().module);
    this.applePay =
      overrides?.applePay ?? singleton(new MockApplePayClient().module);
    this.googlePayBraintreeClient =
      overrides?.googlePayBraintreeClient ??
      singleton(new MockGooglePaymentClient().module);
    this.googlePaymentsClient =
      overrides?.googlePaymentsClient ?? singleton(googlePayLibrary.client);
    this.recaptchaLibrary =
      overrides?.recaptchaLibrary ??
      singleton(new MockGrecaptcha(MockGrecaptchaMode.Success).library);
    this.paypalLibrary =
      overrides?.paypalLibrary ?? singleton(new MockPaypalLibrary().library);
  }
}

export class MockCreditCardHandler implements CreditCardHandlerInterface {
  instance: PromisedSingleton<braintree.HostedFields | undefined>;

  private emitter = createNanoEvents<CreditCardHandlerEvents>();

  private mockPayload: braintree.HostedFieldsTokenizePayload;

  constructor(options?: {
    mockPayload?: braintree.HostedFieldsTokenizePayload;
  }) {
    this.mockPayload = options?.mockPayload ?? mockHostedFieldTokenizePayload;
    this.instance = singleton(
      new MockHostedFieldsClient({
        mockHostedFieldTokenizePayload: this.mockPayload,
      }).instance,
    );
  }

  async tokenizeHostedFields(): Promise<braintree.HostedFieldsTokenizePayload> {
    return this.mockPayload;
  }

  markFieldErrors(): void {}

  removeFieldErrors(): void {}

  showErrorMessage(): void {}

  hideErrorMessage(): void {}

  on<E extends keyof CreditCardHandlerEvents>(
    event: E,
    callback: CreditCardHandlerEvents[E],
  ): Unsubscribe {
    return this.emitter.on(event, callback);
  }
}

export class MockApplePayHandler implements ApplePayHandlerInterface {
  instance = singleton<braintree.ApplePay | undefined>(
    new MockApplePayClient().instance,
  );

  async isAvailable(): Promise<boolean> {
    return true;
  }

  createPaymentRequest(): Promise<ApplePaySessionDataSourceInterface> {
    throw new Error('Method not implemented.');
  }
}

export class MockPayPalHandler implements PayPalHandlerInterface {
  instance = singleton<braintree.PayPalCheckout | undefined>(
    new MockPayPalClient().instance,
  );

  renderPayPalButton(): Promise<PayPalButtonDataSourceInterface | undefined> {
    throw new Error('Method not implemented.');
  }
}

export class MockGooglePayHandler implements GooglePayHandlerInterface {
  paymentsClient = new MockGooglePayLibrary().client;

  instance = singleton(new MockGooglePaymentClient().instance);

  async isBrowserSupported(): Promise<boolean> {
    return true;
  }
}

export class MockVenmoHandler implements VenmoHandlerInterface {
  instance = singleton(
    new MockVenmoClient({ isBrowserSupported: true }).instance,
  );

  async isBrowserSupported(): Promise<boolean> {
    return true;
  }

  startPayment(): Promise<braintree.VenmoTokenizePayload> {
    throw new Error('Method not implemented.');
  }
}

export class MockPaymentProviders implements PaymentProvidersInterface {
  creditCardHandler: PromisedSingleton<CreditCardHandlerInterface>;
  applePayHandler = singleton<ApplePayHandlerInterface>(
    new MockApplePayHandler(),
  );
  paypalHandler = singleton<PayPalHandlerInterface>(new MockPayPalHandler());
  googlePayHandler = singleton<GooglePayHandlerInterface>(
    new MockGooglePayHandler(),
  );
  venmoHandler = singleton<VenmoHandlerInterface | undefined>(
    new MockVenmoHandler(),
  );

  private emitter = createNanoEvents<PaymentProvidersEvents>();

  constructor(options?: {
    mockHostedFieldTokenizePayload?: braintree.HostedFieldsTokenizePayload;
  }) {
    this.creditCardHandler = singleton<CreditCardHandlerInterface>(
      new MockCreditCardHandler({
        mockPayload: options?.mockHostedFieldTokenizePayload,
      }),
    );
  }

  on<E extends keyof PaymentProvidersEvents>(
    event: E,
    callback: PaymentProvidersEvents[E],
  ): Unsubscribe {
    return this.emitter.on(event, callback);
  }
}

export class MockBraintreeManager implements BraintreeManagerInterface {
  donationSuccessfulOptions?: {
    successResponse: SuccessResponse;
    upsellSuccessResponse?: SuccessResponse;
  };

  submittedOptions?: Parameters<BraintreeManagerInterface['submitDonation']>[0];

  private submitDonationError: boolean;
  private submitDonationResponse: 'success' | 'failure';

  constructor(options?: {
    submitDonationError?: boolean;
    submitDonationResponse?: 'success' | 'failure';
  }) {
    this.submitDonationError = options?.submitDonationError ?? false;
    this.submitDonationResponse = options?.submitDonationResponse ?? 'success';
  }

  private emitter = createNanoEvents<BraintreeManagerEvents>();

  on<E extends keyof BraintreeManagerEvents>(
    event: E,
    callback: BraintreeManagerEvents[E],
  ): Unsubscribe {
    return this.emitter.on(event, callback);
  }

  paymentProviders: PaymentProvidersInterface = new MockPaymentProviders();

  instance = singleton(new MockBraintreeClient().instance);

  setReferrer(): void {}

  setLoggedInUser(): void {}

  setOrigin(): void {}

  startup(): void {}

  async submitDonation(options: {
    nonce: string;
    paymentProvider: PaymentProvider;
    donationInfo: DonationPaymentInfo;
    billingInfo: BillingInfo;
    customerInfo: CustomerInfo;
    upsellOnetimeTransactionId?: string;
    customerId?: string;
    recaptchaToken?: string;
    bin?: string;
    binName?: string;
  }): Promise<DonationResponse> {
    this.submittedOptions = options;
    if (this.submitDonationError) {
      throw 'oh no';
    }

    if (this.submitDonationResponse === 'success') {
      const response = new SuccessResponse({
        paymentMethodNonce: options.nonce,
        paymentProvider: options.paymentProvider,
        amount: options.donationInfo.amount,
        donationType: options.donationInfo.donationType,
        transaction_id: 'foo',
        customer_id: 'bar',
        customer: options.customerInfo,
        billing: options.billingInfo,
      });
      return new DonationResponse({ success: true, value: response });
    }
    return new DonationResponse({
      success: false,
      value: new ErrorResponse({ message: 'error' }),
    });
  }

  async submitUpsellDonation(): Promise<DonationResponse> {
    return new DonationResponse({ success: true, value: mockSuccessResponse });
  }

  donationSuccessful(options: {
    successResponse: SuccessResponse;
    upsellSuccessResponse?: SuccessResponse;
  }): void {
    this.donationSuccessfulOptions = options;
  }
}

export class MockHostedFieldContainer implements HostedFieldContainerInterface {
  markErrorsCalled = false;
  removeErrorsCalled = false;
  showErrorMessageCalled = false;
  hideErrorMessageCalled = false;
  resetCount = 0;

  resetHostedFields(): void {
    this.resetCount++;
  }

  fieldFor(): HTMLDivElement {
    return document.createElement('div');
  }

  markFieldErrors(): void {
    this.markErrorsCalled = true;
  }

  removeFieldErrors(): void {
    this.removeErrorsCalled = true;
  }

  showErrorMessage(): void {
    this.showErrorMessageCalled = true;
  }

  hideErrorMessage(): void {
    this.hideErrorMessageCalled = true;
  }
}

export const mockHostedFieldStyle: Record<string, Record<string, string>> = {
  input: {
    'font-size': '16px',
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'font-weight': '700',
    color: '#333',
  },
  ':focus': { color: '#333' },
  '.valid': {},
  '.invalid': { color: '#b00b00' },
};

export const mockHostedFieldFieldOptions: braintree.HostedFieldFieldOptions = {
  number: { selector: '#braintree-creditcard', placeholder: 'Card number' },
  cvv: { selector: '#braintree-cvv', placeholder: 'CVC' },
  expirationDate: { selector: '#braintree-expiration', placeholder: 'MM / YY' },
};

export function mockHostedFieldConfig(
  container: HostedFieldContainerInterface = new MockHostedFieldContainer(),
): HostedFieldConfiguration {
  return new HostedFieldConfiguration({
    hostedFieldStyle: mockHostedFieldStyle,
    hostedFieldFieldOptions: mockHostedFieldFieldOptions,
    hostedFieldContainer: container,
  });
}
