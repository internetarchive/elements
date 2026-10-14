import { afterEach, describe, expect, test } from 'vitest';

import { HostingEnvironment } from './hosting-environment';
import { PaymentClients } from './payment-clients';
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
} from './test-helpers/mock-clients.test-helpers';
import { MockLazyLoader } from './test-helpers/mock-managers.test-helpers';
import { setGlobal } from './test-helpers/mock-models.test-helpers';

function setup(
  environment: HostingEnvironment = HostingEnvironment.Development,
): {
  paymentClients: PaymentClients;
  lazyLoader: MockLazyLoader;
} {
  const lazyLoader = new MockLazyLoader();
  return {
    paymentClients: new PaymentClients(lazyLoader, environment),
    lazyLoader,
  };
}

describe('PaymentClients', () => {
  afterEach(() => {
    setGlobal('braintree', undefined);
    setGlobal('google', undefined);
    setGlobal('grecaptcha', undefined);
    setGlobal('paypal', undefined);
  });

  test.each([
    ['braintreeClient', 'client', () => new MockBraintreeClient()],
    ['dataCollector', 'dataCollector', () => new MockDataCollector()],
    ['hostedFields', 'hostedFields', () => new MockHostedFieldsClient()],
    ['venmo', 'venmo', () => new MockVenmoClient({ isBrowserSupported: true })],
    ['payPal', 'paypalCheckout', () => new MockPayPalClient()],
    ['applePay', 'applePay', () => new MockApplePayClient()],
    [
      'googlePayBraintreeClient',
      'googlePayment',
      () => new MockGooglePaymentClient(),
    ],
  ] as const)(
    'returns the %s client after loading its Braintree script',
    async (clientName, globalName, makeMock) => {
      const { paymentClients, lazyLoader } = setup();
      const mock = makeMock();
      setGlobal('braintree', { [globalName]: mock });

      const client = await paymentClients[clientName].get();

      expect(client).to.equal(mock);
      expect(lazyLoader.loadedScripts).to.have.length(1);
      expect(lazyLoader.loadedScripts[0]).to.match(
        /^https:\/\/js\.braintreegateway\.com\/web\/3\.\d+\.\d+\/js\/[a-z-]+\.js$/,
      );
    },
  );

  test('loads the minified Braintree scripts in production', async () => {
    const { paymentClients, lazyLoader } = setup(HostingEnvironment.Production);
    setGlobal('braintree', { client: new MockBraintreeClient() });

    await paymentClients.braintreeClient.get();

    expect(lazyLoader.loadedScripts[0]).to.match(/\/client\.min\.js$/);
  });

  test('only loads a script once however many times the client is requested', async () => {
    const { paymentClients, lazyLoader } = setup();
    setGlobal('braintree', { client: new MockBraintreeClient() });

    await Promise.all([
      paymentClients.braintreeClient.get(),
      paymentClients.braintreeClient.get(),
    ]);
    await paymentClients.braintreeClient.get();

    expect(lazyLoader.loadedScripts).to.have.length(1);
  });

  test('returns a Google PaymentsClient in TEST mode for development', async () => {
    const { paymentClients, lazyLoader } = setup();
    setGlobal('google', {
      payments: { api: { PaymentsClient: MockGooglePayLibrary } },
    });

    const client = await paymentClients.googlePaymentsClient.get();

    expect(client).to.be.instanceOf(MockGooglePayLibrary);
    expect(
      (client as unknown as MockGooglePayLibrary).paymentOptions,
    ).to.deep.equal({
      environment: 'TEST',
    });
    expect(lazyLoader.loadedScripts).to.deep.equal([
      'https://pay.google.com/gp/p/js/pay.js',
    ]);
  });

  test('returns a Google PaymentsClient in PRODUCTION mode for production', async () => {
    const { paymentClients } = setup(HostingEnvironment.Production);
    setGlobal('google', {
      payments: { api: { PaymentsClient: MockGooglePayLibrary } },
    });

    const client = await paymentClients.googlePaymentsClient.get();

    expect(
      (client as unknown as MockGooglePayLibrary).paymentOptions,
    ).to.deep.equal({
      environment: 'PRODUCTION',
    });
  });

  test('returns the recaptcha library once its onload callback fires', async () => {
    const { paymentClients, lazyLoader } = setup();
    const mockGrecaptcha = new MockGrecaptcha(MockGrecaptchaMode.Success);
    setGlobal('grecaptcha', mockGrecaptcha);
    // The real script calls this once it's ready
    setTimeout(() => window.iaDonationFormGrecaptchaLoaded?.(), 10);

    const recaptchaLibrary = await paymentClients.recaptchaLibrary.get();

    expect(recaptchaLibrary).to.equal(mockGrecaptcha);
    expect(lazyLoader.loadedScripts[0]).to.include(
      'onload=iaDonationFormGrecaptchaLoaded',
    );
  });

  test('returns the paypal library', async () => {
    const { paymentClients, lazyLoader } = setup();
    const mockPaypal = new MockPaypalLibrary();
    setGlobal('paypal', mockPaypal);

    const paypalLibrary = await paymentClients.paypalLibrary.get();

    expect(paypalLibrary).to.equal(mockPaypal);
    expect(lazyLoader.loadedScripts).to.deep.equal([
      'https://www.paypalobjects.com/api/checkout.js',
    ]);
  });
});
