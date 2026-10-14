import { afterEach, describe, expect, test, vi } from 'vitest';

import { MockVenmoClient } from '../../test-helpers/mock-clients.test-helpers';
import { MockBraintreeManager } from '../../test-helpers/mock-managers.test-helpers';
import { VenmoHandler } from './venmo';

function setup(isBrowserSupported = true): {
  handler: VenmoHandler;
  client: MockVenmoClient;
} {
  const client = new MockVenmoClient({ isBrowserSupported });
  const handler = new VenmoHandler({
    braintreeManager: new MockBraintreeManager(),
    venmoClient: client.module,
    venmoProfileId: 'foo-profile',
  });
  return { handler, client };
}

describe('VenmoHandler', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('creates the Venmo client with the profile id', async () => {
    const { handler, client } = setup();

    await handler.instance.get();

    expect(client.createOptions).to.include({ profileId: 'foo-profile' });
  });

  test('tokenizes through the client when a payment starts', async () => {
    const { handler, client } = setup();

    const payload = await handler.startPayment();

    expect(client.tokenizeCalled).to.be.true;
    expect(payload.nonce).to.equal('foo');
  });

  describe('isBrowserSupported', () => {
    test('is true when the client says so', async () => {
      const { handler } = setup(true);
      expect(await handler.isBrowserSupported()).to.be.true;
    });

    test('is false when the client says so', async () => {
      const { handler } = setup(false);
      expect(await handler.isBrowserSupported()).to.be.false;
    });

    test.each(['FxiOS Mobile', 'Mozilla/5.0 (Android) Firefox Mobile'])(
      'is false in mobile Firefox (%s) even when the client says yes',
      async (userAgent) => {
        vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(userAgent);
        const { handler } = setup(true);

        expect(await handler.isBrowserSupported()).to.be.false;
      },
    );

    test('is true in desktop Firefox when the client says yes', async () => {
      vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
        'Mozilla/5.0 (Macintosh) Firefox/120.0',
      );
      const { handler } = setup(true);

      expect(await handler.isBrowserSupported()).to.be.true;
    });
  });
});
