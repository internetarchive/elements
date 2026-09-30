import { describe, expect, test } from 'vitest';

import { DonationType } from '../models/donation-type';
import { PaymentProvider } from '../models/payment-provider';
import { BraintreeManager } from './braintree-manager';
import { HostingEnvironment } from './hosting-environment';
import {
  MockBraintreeClient,
  MockDataCollector,
} from './test-helpers/mock-clients.test-helpers';
import {
  MockEndpointManager,
  MockPaymentClients,
  mockHostedFieldConfig,
} from './test-helpers/mock-managers.test-helpers';
import {
  fiveDollars,
  mockBillingInfo,
  mockCustomerInfo,
  mockSuccessResponse,
} from './test-helpers/mock-models.test-helpers';

function setup(
  extra: Partial<ConstructorParameters<typeof BraintreeManager>[0]> = {},
): {
  braintreeManager: BraintreeManager;
  endpointManager: MockEndpointManager;
  paymentClients: MockPaymentClients;
} {
  const paymentClients = new MockPaymentClients();
  const endpointManager = new MockEndpointManager();
  const braintreeManager = new BraintreeManager({
    authorizationToken: 'foo',
    paymentClients,
    endpointManager,
    hostedFieldConfig: mockHostedFieldConfig(),
    hostingEnvironment: HostingEnvironment.Development,
    ...extra,
  });
  return { braintreeManager, endpointManager, paymentClients };
}

const submission = {
  nonce: 'boop',
  paymentProvider: PaymentProvider.CreditCard,
  donationInfo: fiveDollars(),
  billingInfo: mockBillingInfo,
  customerInfo: mockCustomerInfo,
};

describe('BraintreeManager', () => {
  test('creates the Braintree client with the authorization token', async () => {
    const client = new MockBraintreeClient();
    const paymentClients = new MockPaymentClients();
    paymentClients.braintreeClient.get = async () => client.module;
    const braintreeManager = new BraintreeManager({
      authorizationToken: 'my-token',
      paymentClients,
      endpointManager: new MockEndpointManager(),
      hostedFieldConfig: mockHostedFieldConfig(),
      hostingEnvironment: HostingEnvironment.Development,
    });

    const instance = await braintreeManager.instance.get();

    expect(instance).to.equal(client.instance);
    expect(client.createOptions).to.deep.equal({ authorization: 'my-token' });
  });

  test('collects device data on startup and submits it', async () => {
    const { braintreeManager, endpointManager } = setup();

    await braintreeManager.startup();
    await braintreeManager.submitDonation(submission);

    expect(endpointManager.requestSubmitted?.deviceData).to.equal(
      MockDataCollector.mockDeviceData,
    );
  });

  test('does not collect device data if startup is not called', async () => {
    const { braintreeManager, endpointManager } = setup();

    await braintreeManager.submitDonation(submission);

    expect(endpointManager.requestSubmitted?.deviceData).to.be.undefined;
  });

  test('sends the total, with the fee when the donor covers it', async () => {
    const { braintreeManager, endpointManager } = setup();

    await braintreeManager.submitDonation({
      ...submission,
      donationInfo: { ...fiveDollars(), coverFees: true } as never,
    });

    // $5 plus the $0.40 fee, calculated even from a plain object
    expect(endpointManager.requestSubmitted?.amount).to.equal(5.4);
    expect(
      endpointManager.requestSubmitted?.customFields.fee_amount_covered,
    ).to.equal(0.4);
  });

  test('submits referrer, origin and logged in user set after construction', async () => {
    const { braintreeManager, endpointManager } = setup();

    await braintreeManager.submitDonation(submission);
    expect(endpointManager.requestSubmitted?.customFields.referrer).to.be
      .undefined;
    expect(endpointManager.requestSubmitted?.customFields.logged_in_user).to.be
      .undefined;

    braintreeManager.setLoggedInUser('foo-user');
    braintreeManager.setReferrer('foo-referrer');
    braintreeManager.setOrigin('foo-origin');
    await braintreeManager.submitDonation(submission);

    const fields = endpointManager.requestSubmitted?.customFields;
    expect(fields?.referrer).to.equal('foo-referrer');
    expect(fields?.logged_in_user).to.equal('foo-user');
    expect(fields?.origin).to.equal('foo-origin');
  });

  test('submits referrer, origin and logged in user given at construction', async () => {
    const { braintreeManager, endpointManager } = setup({
      loggedInUser: 'foo-user',
      referrer: 'foo-referrer',
      origin: 'foo-origin',
    });

    await braintreeManager.submitDonation(submission);

    const fields = endpointManager.requestSubmitted?.customFields;
    expect(fields?.referrer).to.equal('foo-referrer');
    expect(fields?.logged_in_user).to.equal('foo-user');
    expect(fields?.origin).to.equal('foo-origin');
  });

  test('submits an upsell donation against the one-time transaction', async () => {
    const { braintreeManager, endpointManager } = setup();

    await braintreeManager.submitUpsellDonation({
      oneTimeDonationResponse: mockSuccessResponse,
      amount: 3.5,
    });

    const request = endpointManager.requestSubmitted;
    expect(request?.donationType).to.equal(DonationType.Upsell);
    expect(request?.amount).to.equal(3.5);
    expect(request?.customFields.fee_amount_covered).to.equal(0);
    expect(request?.upsellOnetimeTransactionId).to.equal(
      mockSuccessResponse.transaction_id,
    );
    expect(request?.customerId).to.equal(mockSuccessResponse.customer_id);
    expect(request?.paymentMethodNonce).to.equal(
      mockSuccessResponse.paymentMethodNonce,
    );
  });

  test('hands a successful donation to the endpoint manager', async () => {
    const { braintreeManager, endpointManager } = setup();

    braintreeManager.donationSuccessful({
      successResponse: mockSuccessResponse,
    });

    expect(endpointManager.successResponseSubmitted?.donationType).to.equal(
      DonationType.OneTime,
    );
    expect(endpointManager.successResponseSubmitted?.amount).to.equal(5);
  });

  test('relays hosted field retry and failure events from the providers', async () => {
    const { braintreeManager } = setup();
    const retries: number[] = [];
    const failures: unknown[] = [];
    braintreeManager.on('paymentProvidersHostedFieldsRetry', (n) =>
      retries.push(n),
    );
    braintreeManager.on('paymentProvidersHostedFieldsFailed', (e) =>
      failures.push(e),
    );

    // Reach into the providers' emitter the way a handler would
    const providers = braintreeManager.paymentProviders as unknown as {
      emitter: { emit(event: string, ...args: unknown[]): void };
    };
    providers.emitter.emit('hostedFieldsRetry', 2);
    providers.emitter.emit('hostedFieldsFailed', 'boom');

    expect(retries).to.deep.equal([2]);
    expect(failures).to.deep.equal(['boom']);
  });
});
