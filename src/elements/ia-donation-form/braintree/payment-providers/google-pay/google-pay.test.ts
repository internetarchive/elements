import { describe, expect, test } from 'vitest';

import {
  MockGooglePayLibrary,
  MockGooglePaymentClient,
} from '../../test-helpers/mock-clients.test-helpers';
import { MockBraintreeManager } from '../../test-helpers/mock-managers.test-helpers';
import { GooglePayHandler } from './google-pay';

function setup(readyToPay = true): {
  handler: GooglePayHandler;
  braintreeClient: MockGooglePaymentClient;
} {
  const braintreeClient = new MockGooglePaymentClient();
  const library = new MockGooglePayLibrary();
  library.readyToPay = readyToPay;
  const handler = new GooglePayHandler({
    braintreeManager: new MockBraintreeManager(),
    googlePayMerchantId: 'merchant-1',
    googlePayBraintreeClient: braintreeClient.module,
    googlePaymentsClient: library.client,
  });
  return { handler, braintreeClient };
}

describe('GooglePayHandler', () => {
  test('creates the Braintree Google Payment instance with the merchant id', async () => {
    const { handler, braintreeClient } = setup();

    const instance = await handler.instance.get();

    expect(instance).to.equal(braintreeClient.instance);
    expect(braintreeClient.createOptions).to.include({
      googlePayVersion: 2,
      googleMerchantId: 'merchant-1',
    });
  });

  describe('isBrowserSupported', () => {
    test('is true when Google says it is ready to pay', async () => {
      const { handler } = setup(true);
      expect(await handler.isBrowserSupported()).to.be.true;
    });

    test('is false when Google says it is not', async () => {
      const { handler } = setup(false);
      expect(await handler.isBrowserSupported()).to.be.false;
    });
  });
});
