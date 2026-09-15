import type * as braintree from 'braintree-web';
import type * as paypal from 'paypal-checkout-components';

/**
 * Stand-ins for the payment libraries. Each mock plays both the library
 * module (the thing with `create()`) and the instance `create()` resolves to,
 * exposed through the `module` and `instance` getters so tests can hand the
 * same object to code that wants either.
 */

export class MockBraintreeClient {
  createOptions?: { authorization: string };

  async create(options: { authorization: string }): Promise<braintree.Client> {
    this.createOptions = options;
    return this.instance;
  }

  get module(): typeof braintree.client {
    return this as unknown as typeof braintree.client;
  }

  get instance(): braintree.Client {
    return this as unknown as braintree.Client;
  }
}

export class MockDataCollector {
  static mockDeviceData = 'foo-mock-device-data';

  deviceData = MockDataCollector.mockDeviceData;

  createOptions?: object;

  async create(options: object): Promise<braintree.DataCollector> {
    this.createOptions = options;
    return this.instance;
  }

  get module(): typeof braintree.dataCollector {
    return this as unknown as typeof braintree.dataCollector;
  }

  get instance(): braintree.DataCollector {
    return this as unknown as braintree.DataCollector;
  }
}

export const mockHostedFieldTokenizePayload = {
  nonce: 'foo-nonce',
  details: {
    bin: '1234',
    cardType: 'UNO',
    expirationMonth: '12',
    expirationYear: '12',
    lastTwo: '32',
    lastFour: '4342',
  },
  type: 'foo-type',
  description: 'bar-description',
} as unknown as braintree.HostedFieldsTokenizePayload;

/** A hosted fields event where every field is valid or every field is invalid. */
export function mockHostedFieldsEvent(
  valid: boolean,
): braintree.HostedFieldsEvent {
  const field = (): braintree.HostedFieldsEvent['fields']['number'] => ({
    container: document.createElement('div'),
    isFocused: false,
    isEmpty: false,
    isPotentiallyValid: valid,
    isValid: valid,
  });
  return {
    cards: [],
    emittedBy: 'number',
    fields: {
      number: field(),
      cvv: field(),
      expirationDate: field(),
      expirationMonth: field(),
      expirationYear: field(),
      postalCode: field(),
      cardholderName: field(),
    },
  };
}

export class MockHostedFieldsClient {
  createOptions?: object;

  private handlers: Record<
    string,
    (event: braintree.HostedFieldsEvent) => void
  > = {};

  private mockPayload: braintree.HostedFieldsTokenizePayload;

  constructor(options?: {
    mockHostedFieldTokenizePayload?: braintree.HostedFieldsTokenizePayload;
  }) {
    this.mockPayload =
      options?.mockHostedFieldTokenizePayload ?? mockHostedFieldTokenizePayload;
  }

  async create(options: object): Promise<braintree.HostedFields> {
    this.createOptions = options;
    return this.instance;
  }

  on(
    event: string,
    handler: (event: braintree.HostedFieldsEvent) => void,
  ): void {
    this.handlers[event] = handler;
  }

  async tokenize(): Promise<braintree.HostedFieldsTokenizePayload> {
    return this.mockPayload;
  }

  emitValidityChangedEvent(valid: boolean): void {
    this.handlers['validityChange']?.(mockHostedFieldsEvent(valid));
  }

  get module(): typeof braintree.hostedFields {
    return this as unknown as typeof braintree.hostedFields;
  }

  get instance(): braintree.HostedFields {
    return this as unknown as braintree.HostedFields;
  }
}

export class MockVenmoClient {
  tokenizeCalled = false;

  createOptions?: object;

  private browserSupported: boolean;

  constructor(options: { isBrowserSupported: boolean }) {
    this.browserSupported = options.isBrowserSupported;
  }

  async create(options: object): Promise<braintree.Venmo> {
    this.createOptions = options;
    return this.instance;
  }

  isBrowserSupported(): boolean {
    return this.browserSupported;
  }

  hasTokenizationResult(): boolean {
    return false;
  }

  async tokenize(): Promise<braintree.VenmoTokenizePayload> {
    this.tokenizeCalled = true;
    return { nonce: 'foo', type: 'bar', details: { username: 'boo' } };
  }

  get module(): typeof braintree.venmo {
    return this as unknown as typeof braintree.venmo;
  }

  get instance(): braintree.Venmo {
    return this as unknown as braintree.Venmo;
  }
}

export class MockPayPalClient {
  createPaymentResults: {
    called: boolean;
    options?: braintree.PayPalCheckoutCreatePaymentOptions;
  } = { called: false };

  tokenizePaymentResults: {
    called: boolean;
    tokenizeOptions?: Parameters<
      braintree.PayPalCheckout['tokenizePayment']
    >[0];
  } = { called: false };

  async create(): Promise<braintree.PayPalCheckout> {
    return this.instance;
  }

  async createPayment(
    options: braintree.PayPalCheckoutCreatePaymentOptions,
  ): Promise<string> {
    this.createPaymentResults = { called: true, options };
    return 'createPaymentCalled';
  }

  async tokenizePayment(
    tokenizeOptions: Parameters<braintree.PayPalCheckout['tokenizePayment']>[0],
  ): Promise<paypal.TokenizePayload> {
    this.tokenizePaymentResults = { called: true, tokenizeOptions };
    return {
      nonce: 'foo-nonce',
      type: 'foo-type',
      details: {
        email: 'foo@bar.com',
        payerId: '12354',
        firstName: 'Foo',
        lastName: 'Bar',
        countryCode: 'US',
        phone: '123-456-7890',
      },
    } as unknown as paypal.TokenizePayload;
  }

  get module(): typeof braintree.paypalCheckout {
    return this as unknown as typeof braintree.paypalCheckout;
  }

  get instance(): braintree.PayPalCheckout {
    return this as unknown as braintree.PayPalCheckout;
  }
}

export const mockBraintreeError = {
  code: 'foo',
  message: 'bar',
  type: 'CUSTOMER',
  details: 'foo bar',
} as unknown as braintree.BraintreeError;

export class MockApplePayClient {
  private shouldValidateMerchant: boolean;
  private shouldTokenizeSuccessfully: boolean;

  constructor(options?: {
    shouldValidateMerchant?: boolean;
    shouldTokenizeSuccessfully?: boolean;
  }) {
    this.shouldValidateMerchant = options?.shouldValidateMerchant ?? true;
    this.shouldTokenizeSuccessfully =
      options?.shouldTokenizeSuccessfully ?? true;
  }

  async create(): Promise<braintree.ApplePay> {
    return this.instance;
  }

  createPaymentRequest(
    paymentRequest: Partial<braintree.ApplePayPaymentRequest>,
  ): braintree.ApplePayPaymentRequest {
    return {
      countryCode: 'US',
      currencyCode: 'USD',
      supportedNetworks: ['visa', 'masterCard'],
      merchantCapabilities: ['supports3DS'],
      ...paymentRequest,
    } as braintree.ApplePayPaymentRequest;
  }

  lastValidationOptions?: object;

  performValidation(
    options: { validationURL: string; displayName?: string },
    callback: braintree.callback,
  ): void {
    this.lastValidationOptions = options;
    if (this.shouldValidateMerchant) {
      callback(undefined, { foo: 'bar' });
    } else {
      callback(mockBraintreeError, undefined);
    }
  }

  async tokenize(): Promise<braintree.ApplePayPayload> {
    if (!this.shouldTokenizeSuccessfully) {
      throw mockBraintreeError;
    }
    return { nonce: 'foo-nonce' } as unknown as braintree.ApplePayPayload;
  }

  get module(): typeof braintree.applePay {
    return this as unknown as typeof braintree.applePay;
  }

  get instance(): braintree.ApplePay {
    return this as unknown as braintree.ApplePay;
  }
}

export class MockGooglePaymentClient {
  createOptions?: object;

  async create(options: object): Promise<braintree.GooglePayment> {
    this.createOptions = options;
    return this.instance;
  }

  async parseResponse(): Promise<braintree.GooglePaymentTokenizePayload> {
    return {
      nonce: 'foo-nonce',
      details: {
        cardType: 'foo-cardType',
        lastFour: '1234',
        lastTwo: '34',
        isNetworkTokenized: false,
        bin: '1323',
      },
      description: 'foo-description',
      type: 'foo-type',
      binData: {
        commercial: 'Unknown',
        countryOfIssuance: 'Somewhere',
        debit: 'Unknown',
        durbinRegulated: 'Unknown',
        healthcare: 'Unknown',
        issuingBank: 'Unknown',
        payroll: 'Unknown',
        prepaid: 'Unknown',
        productId: 'foo',
      },
    } as unknown as braintree.GooglePaymentTokenizePayload;
  }

  get module(): typeof braintree.googlePayment {
    return this as unknown as typeof braintree.googlePayment;
  }

  get instance(): braintree.GooglePayment {
    return this as unknown as braintree.GooglePayment;
  }
}

/** Stands in for Google's `PaymentsClient` from pay.js. */
export class MockGooglePayLibrary {
  readyToPay = false;

  paymentOptions?: object;

  constructor(paymentOptions?: object) {
    this.paymentOptions = paymentOptions;
  }

  async isReadyToPay(): Promise<{ result: boolean }> {
    return { result: this.readyToPay };
  }

  get client(): google.payments.api.PaymentsClient {
    return this as unknown as google.payments.api.PaymentsClient;
  }
}

export const MockGrecaptchaMode = {
  Success: 'success',
  Expired: 'expired',
  Error: 'error',
} as const;

export type MockGrecaptchaMode =
  (typeof MockGrecaptchaMode)[keyof typeof MockGrecaptchaMode];

export class MockGrecaptcha {
  renderCalled = false;
  executeCalled = false;
  resetCalled = false;

  renderParameters?: ReCaptchaV2.Parameters;

  private mode: MockGrecaptchaMode;
  private addDelay: boolean;

  constructor(mode: MockGrecaptchaMode, addDelay = false) {
    this.mode = mode;
    this.addDelay = addDelay;
  }

  render(
    _container: string | HTMLElement,
    parameters?: ReCaptchaV2.Parameters,
  ): number {
    this.renderParameters = parameters;
    this.renderCalled = true;
    return 1;
  }

  reset(): void {
    this.resetCalled = true;
  }

  getResponse(): string {
    return 'foo';
  }

  execute(): void {
    this.executeCalled = true;
    if (this.addDelay) {
      setTimeout(() => this.callCallback(), 100);
    } else {
      this.callCallback();
    }
  }

  private callCallback(): void {
    const params = this.renderParameters;
    switch (this.mode) {
      case MockGrecaptchaMode.Success:
        params?.callback?.('foo');
        break;
      case MockGrecaptchaMode.Error:
        params?.['error-callback']?.();
        break;
      case MockGrecaptchaMode.Expired:
        params?.['expired-callback']?.();
        break;
    }
  }

  get library(): ReCaptchaV2.ReCaptcha {
    return this as unknown as ReCaptchaV2.ReCaptcha;
  }
}

/** Stands in for the PayPal checkout.js global. */
export class MockPaypalLibrary {
  renderCalls: { options: object; selector: string }[] = [];

  Button = {
    render: (options: object, selector: string): void => {
      this.renderCalls.push({ options, selector });
    },
  };

  FUNDING = { VENMO: 'venmo' };

  get library(): typeof paypal {
    return this as unknown as typeof paypal;
  }

  get buttonRenderer(): paypal.ButtonRenderer {
    return this.Button as unknown as paypal.ButtonRenderer;
  }
}
