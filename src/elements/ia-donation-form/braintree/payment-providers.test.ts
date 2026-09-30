import { describe, expect, test } from 'vitest';

import { HostingEnvironment } from './hosting-environment';
import { PaymentProviders } from './payment-providers';
import { ApplePayHandler } from './payment-providers/apple-pay/apple-pay';
import { CreditCardHandler } from './payment-providers/credit-card/credit-card';
import { GooglePayHandler } from './payment-providers/google-pay/google-pay';
import { PayPalHandler } from './payment-providers/paypal/paypal';
import { VenmoHandler } from './payment-providers/venmo/venmo';
import {
  MockBraintreeManager,
  MockPaymentClients,
  mockHostedFieldConfig,
} from './test-helpers/mock-managers.test-helpers';

function setup(options?: { venmoProfileId?: string }): PaymentProviders {
  return new PaymentProviders({
    braintreeManager: new MockBraintreeManager(),
    paymentClients: new MockPaymentClients(),
    hostingEnvironment: HostingEnvironment.Development,
    hostedFieldConfig: mockHostedFieldConfig(),
    venmoProfileId: options?.venmoProfileId,
  });
}

describe('PaymentProviders', () => {
  test('has no Venmo handler without a Venmo profile id', async () => {
    const venmo = await setup().venmoHandler.get();
    expect(venmo).to.be.undefined;
  });

  test('has a Venmo handler with a Venmo profile id', async () => {
    const venmo = await setup({ venmoProfileId: 'foo' }).venmoHandler.get();
    expect(venmo).to.be.instanceOf(VenmoHandler);
  });

  test('creates the other handlers on request', async () => {
    const providers = setup();

    expect(await providers.creditCardHandler.get()).to.be.instanceOf(
      CreditCardHandler,
    );
    expect(await providers.paypalHandler.get()).to.be.instanceOf(PayPalHandler);
    expect(await providers.applePayHandler.get()).to.be.instanceOf(
      ApplePayHandler,
    );
    expect(await providers.googlePayHandler.get()).to.be.instanceOf(
      GooglePayHandler,
    );
  });

  test('returns the same handler every time', async () => {
    const providers = setup();

    const first = await providers.paypalHandler.get();
    const second = await providers.paypalHandler.get();

    expect(first).to.equal(second);
  });
});
