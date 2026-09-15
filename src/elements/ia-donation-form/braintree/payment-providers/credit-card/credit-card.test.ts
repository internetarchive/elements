import { afterEach, describe, expect, test, vi } from 'vitest';

import { MockHostedFieldsClient } from '../../test-helpers/mock-clients.test-helpers';
import {
  MockBraintreeManager,
  MockHostedFieldContainer,
  mockHostedFieldConfig,
} from '../../test-helpers/mock-managers.test-helpers';
import { CreditCardHandler } from './credit-card';

function setup(options?: {
  client?: MockHostedFieldsClient;
  maxRetryCount?: number;
  loadTimeout?: number;
}): { handler: CreditCardHandler; container: MockHostedFieldContainer } {
  const container = new MockHostedFieldContainer();
  const client = options?.client ?? new MockHostedFieldsClient();
  const handler = new CreditCardHandler({
    braintreeManager: new MockBraintreeManager(),
    hostedFieldClient: client.module,
    hostedFieldConfig: mockHostedFieldConfig(container),
    maxRetryCount: options?.maxRetryCount,
    loadTimeout: options?.loadTimeout,
  });
  return { handler, container };
}

describe('CreditCardHandler', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('creates the hosted fields with the configured styles and fields', async () => {
    const client = new MockHostedFieldsClient();
    const { handler } = setup({ client });

    const instance = await handler.instance.get();

    expect(instance).to.equal(client.instance);
    expect(client.createOptions).to.include.keys('client', 'styles', 'fields');
  });

  test('can tokenize the hosted fields', async () => {
    const { handler } = setup();

    const payload = await handler.tokenizeHostedFields();

    expect(payload?.nonce).to.equal('foo-nonce');
  });

  test('can mark and remove field errors', () => {
    const { handler, container } = setup();

    handler.markFieldErrors([]);
    expect(container.markErrorsCalled).to.be.true;

    handler.removeFieldErrors([]);
    expect(container.removeErrorsCalled).to.be.true;
  });

  test('can show and hide the error message', () => {
    const { handler, container } = setup();

    handler.showErrorMessage();
    expect(container.showErrorMessageCalled).to.be.true;

    handler.hideErrorMessage();
    expect(container.hideErrorMessageCalled).to.be.true;
  });

  test('retries the expected number of times before failing', async () => {
    const client = new MockHostedFieldsClient();
    const create = vi.spyOn(client, 'create').mockImplementation(() => {
      throw new Error('Error');
    });
    const { handler, container } = setup({
      client,
      maxRetryCount: 3,
      loadTimeout: 0.01,
    });

    await expect(handler.instance.get()).rejects.toThrow('Error');

    // The initial call plus 3 retries
    expect(create).toHaveBeenCalledTimes(4);
    expect(container.resetCount).to.equal(4);
  });

  test('retries creating the hosted fields if they fail', async () => {
    const client = new MockHostedFieldsClient();
    let attempts = 0;
    vi.spyOn(client, 'create').mockImplementation(async () => {
      attempts++;
      if (attempts <= 2) throw new Error('Error');
      return client.instance;
    });
    const { handler } = setup({ client, maxRetryCount: 3, loadTimeout: 0.01 });

    const instance = await handler.instance.get();

    expect(instance).to.equal(client.instance);
    expect(attempts).to.equal(3);
  });

  test('retries when the hosted fields take too long to load', async () => {
    const client = new MockHostedFieldsClient();
    let attempts = 0;
    vi.spyOn(client, 'create').mockImplementation(() => {
      attempts++;
      // Hangs the first time, well past the 10ms timeout
      return attempts === 1
        ? new Promise(() => {})
        : Promise.resolve(client.instance);
    });
    const { handler } = setup({ client, maxRetryCount: 3, loadTimeout: 0.01 });

    const instance = await handler.instance.get();

    expect(instance).to.equal(client.instance);
    expect(attempts).to.equal(2);
  });

  test('emits an event for each retry and one for the failure', async () => {
    const client = new MockHostedFieldsClient();
    vi.spyOn(client, 'create').mockImplementation(() => {
      throw new Error('Error');
    });
    const { handler } = setup({ client, maxRetryCount: 3, loadTimeout: 0.01 });

    const retries: number[] = [];
    let failures = 0;
    handler.on('hostedFieldsRetry', (n) => retries.push(n));
    handler.on('hostedFieldsFailed', () => failures++);

    await handler.instance.get().catch(() => undefined);

    expect(retries).to.deep.equal([1, 2, 3]);
    expect(failures).to.equal(1);
  });
});
