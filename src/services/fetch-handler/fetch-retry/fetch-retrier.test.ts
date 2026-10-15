import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { MockInstance } from 'vitest';
import { FetchRetrier } from './fetch-retrier';
import { MockAnalyticsHandler } from '../test-helpers/mock-analytics-handler.test-helper';
import { MockRetryConfig } from '../test-helpers/mock-retry-config.test-helper';

describe('FetchRetrier', () => {
  let fetchStub: MockInstance<typeof fetch>;
  let analytics: MockAnalyticsHandler;

  beforeEach(() => {
    analytics = new MockAnalyticsHandler();
    fetchStub = vi.spyOn(globalThis, 'fetch');
  });

  afterEach(() => {
    fetchStub.mockRestore();
  });

  it('returns response on first success', async () => {
    fetchStub.mockResolvedValue(new Response('ok', { status: 200 }));
    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
      retryConfig: new MockRetryConfig(),
    });

    const res = await retrier.fetchRetry('https://foo.org/data');

    expect(res.status).to.equal(200);
    expect(fetchStub.mock.calls.length).to.equal(1);
    expect(analytics.events.length).to.equal(0);
  });

  it('does not retry on 4xx and logs event', async () => {
    fetchStub.mockResolvedValue(new Response('forbidden', { status: 403 }));
    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
    });

    const res = await retrier.fetchRetry('https://foo.org/403');

    expect(res.status).to.equal(403);
    expect(fetchStub.mock.calls.length).to.equal(1);
    expect(analytics.events[0].action).to.equal('status403Response');
  });

  it('does not retry on 404 and logs event', async () => {
    fetchStub.mockResolvedValue(new Response('not found', { status: 404 }));
    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
    });

    const res = await retrier.fetchRetry('https://foo.org/404');

    expect(res.status).to.equal(404);
    expect(fetchStub.mock.calls.length).to.equal(1);
    expect(analytics.events[0].action).to.equal('status404Response');
  });

  it('retries on 4xx if shouldRetry is true in ApiRequestInit', async () => {
    fetchStub.mockResolvedValueOnce(
      new Response('bad request', { status: 400 }),
    );
    fetchStub.mockResolvedValueOnce(new Response('ok', { status: 200 }));

    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
    });

    const res = await retrier.fetchRetry('https://foo.org/should-retry', {
      retryConfig: new MockRetryConfig(),
    });

    expect(res.status).to.equal(200);
    expect(fetchStub.mock.calls.length).to.equal(2);
    expect(analytics.events.some((e) => e.action === 'retryingFetch')).to.be
      .true;
  });

  it('retries on 500 and logs retry/failure events', async () => {
    fetchStub.mockResolvedValueOnce(new Response('fail', { status: 500 }));
    fetchStub.mockResolvedValueOnce(
      new Response('fail again', { status: 500 }),
    );
    fetchStub.mockResolvedValueOnce(
      new Response('still fail', { status: 500 }),
    );

    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
      retryConfig: new MockRetryConfig(),
    });

    const res = await retrier.fetchRetry('https://foo.org/fail');

    expect(res.status).to.equal(500);
    expect(fetchStub.mock.calls.length).to.equal(3);
    expect(analytics.events.some((e) => e.action === 'retryingFetch')).to.be
      .true;
    expect(analytics.events.some((e) => e.action === 'fetchFailed')).to.be.true;
  });

  it('retries on fetch error and eventually succeeds', async () => {
    fetchStub.mockRejectedValueOnce(new Error('Network error'));
    fetchStub.mockResolvedValueOnce(new Response('ok', { status: 200 }));

    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
      retryConfig: new MockRetryConfig(),
    });

    const res = await retrier.fetchRetry('https://foo.org/retry');

    expect(res.status).to.equal(200);
    expect(fetchStub.mock.calls.length).to.equal(2);
    expect(analytics.events.some((e) => e.action === 'retryingFetch')).to.be
      .true;
  });

  it('throws and logs when retries are exhausted due to network error', async () => {
    fetchStub.mockRejectedValue(new Error('Boom'));

    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
      retryConfig: new MockRetryConfig(),
    });

    try {
      await retrier.fetchRetry('https://foo.org/networkfail');
      throw new Error('Should have thrown');
    } catch (err: unknown) {
      expect((err as Error).message).to.equal('Boom');
    }

    expect(fetchStub.mock.calls.length).to.equal(3);
    expect(analytics.events.some((e) => e.action === 'fetchFailed')).to.be.true;
  });

  it('detects content blocker error and does not retry', async () => {
    const blockerError = new TypeError('Content Blocker denied request');
    fetchStub.mockRejectedValue(blockerError);

    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
    });

    try {
      await retrier.fetchRetry('https://foo.org/blocked');
      throw new Error('Should have thrown');
    } catch (err: unknown) {
      expect(err).to.equal(blockerError);
    }

    expect(fetchStub.mock.calls.length).to.equal(1);
    expect(
      analytics.events.some(
        (e) => e.action === 'contentBlockerDetectedNotRetrying',
      ),
    ).to.be.true;
  });

  it('sleeps for each retry attempt', async () => {
    const retryConfig = new MockRetryConfig();
    const retryDelaySpy = vi.spyOn(retryConfig, 'retryDelay');
    fetchStub.mockResolvedValue(new Response(null, { status: 500 }));

    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
      retryConfig: retryConfig,
    });

    const res = await retrier.fetchRetry('https://foo.org/retry-fail');

    expect(res.status).to.equal(500);
    expect(fetchStub.mock.calls.length).to.equal(3);
    expect(retryDelaySpy.mock.calls.length).to.equal(2);
  });

  it('does not retry 5xx when NoRetryConfiguration is used', async () => {
    fetchStub.mockResolvedValue(new Response('server error', { status: 500 }));
    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
      retryConfig: new (class {
        shouldRetry() {
          return false;
        }
        retryDelay() {
          return 0;
        }
      })(),
    });

    const res = await retrier.fetchRetry('https://foo.org/no-retry-500');
    expect(res.status).to.equal(500);
    expect(fetchStub.mock.calls.length).to.equal(1);
    expect(analytics.events.some((e) => e.action === 'fetchFailed')).to.be.true;
  });

  it('does not retry on error when configuration disables retries', async () => {
    fetchStub.mockRejectedValue(new Error('Immediate failure'));
    const retrier = new FetchRetrier({
      analyticsHandler: analytics,
      retryConfig: new (class {
        shouldRetry() {
          return false;
        }
        retryDelay() {
          return 0;
        }
      })(),
    });

    try {
      await retrier.fetchRetry('https://foo.org/no-retry-error');
      throw new Error('Should have thrown');
    } catch (err: unknown) {
      expect((err as Error).message).to.equal('Immediate failure');
    }

    expect(fetchStub.mock.calls.length).to.equal(1);
    expect(analytics.events.some((e) => e.action === 'fetchFailed')).to.be.true;
  });
});
