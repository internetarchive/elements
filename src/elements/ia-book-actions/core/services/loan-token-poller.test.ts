import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { LoanTokenPoller } from './loan-token-poller';
import '../config/ia-lending-intervals';
import { stubLoanFetch } from '../../loan-fetch-stub.test-helper';
import { unexpectedResponseError } from './actions-handler/actions-handler-service';

beforeEach(() => {
  stubLoanFetch();
});

afterEach(() => {
  window.IALendingIntervals.clearAll();
  vi.restoreAllMocks();
});

describe('Get Loan Token', () => {
  test('get loan token for browsed books', async () => {
    const tokenPoller = new LoanTokenPoller({
      identifier: 'identifier1',
      borrowType: 'browsed',
      successCallback: () => {},
      errorCallback: () => {},
      pollerDelay: 2000, // 2 minutes'
    });
    const successCallbackSpy = vi
      .spyOn(tokenPoller, 'successCallback')
      .mockImplementation(() => {});
    successCallbackSpy();
    expect(successCallbackSpy).toHaveBeenCalledTimes(1);

    tokenPoller.handleLoanTokenPoller(true);
    expect(tokenPoller.errorCallback).to.be.a('function');
    expect(tokenPoller.successCallback).to.exist;
  });

  test('get loan token for admin borrowed books', async () => {
    const tokenPoller = new LoanTokenPoller({
      identifier: 'identifier1',
      borrowType: 'adminBorrowed',
      successCallback: () => {},
      errorCallback: () => {},
      pollerDelay: 2000, // 2 minutes'
    });

    const successCallbackSpy = vi
      .spyOn(tokenPoller, 'successCallback')
      .mockImplementation(() => {});
    successCallbackSpy();
    expect(successCallbackSpy).toHaveBeenCalledTimes(1);

    // for adminBorrowed,
    // - not initialize loanTokenInterval as don't need to fetch loan after specific interval
    expect(tokenPoller.loanTokenInterval).to.equal(undefined);
  });
});

describe('handleTokenError (no retry)', () => {
  // A create_token failure is treated as terminal on the first attempt,
  // no retry, whether it's the "stale loan read" race or anything else.
  const makeTokenPoller = () =>
    new LoanTokenPoller({
      identifier: 'identifier1',
      borrowType: 'browsed',
      successCallback: () => {},
      errorCallback: () => {},
      pollerDelay: 2000,
    });

  test('reports the error immediately, without retrying, on the initial call', () => {
    const tokenPoller = makeTokenPoller();
    const handleLoanTokenPollerSpy = vi.spyOn(
      tokenPoller,
      'handleLoanTokenPoller',
    );
    const errorCallbackSpy = vi.spyOn(tokenPoller, 'errorCallback');

    tokenPoller.handleTokenError(
      { error: 'You do not currently have this book borrowed.' },
      true,
    );

    expect(errorCallbackSpy).toHaveBeenCalledOnce();
    expect(handleLoanTokenPollerSpy).not.toHaveBeenCalled();
  });

  test('reports the error immediately on a routine (non-initial) poll too', () => {
    const tokenPoller = makeTokenPoller();
    const errorCallbackSpy = vi.spyOn(tokenPoller, 'errorCallback');

    tokenPoller.handleTokenError(
      { error: 'You do not currently have this book borrowed.' },
      false,
    );

    expect(errorCallbackSpy).toHaveBeenCalledOnce();
  });

  test('passes isInitial through to the error callback', () => {
    const errorCallback = vi.fn();
    const poller = new LoanTokenPoller({
      identifier: 'foo',
      borrowType: 'browsed',
      successCallback: () => {},
      errorCallback,
      pollerDelay: 120,
    });
    poller.disconnectedCallback();

    poller.handleTokenError({ error: 'something else went wrong' }, true);

    expect(errorCallback).toHaveBeenCalledOnce();
    expect(errorCallback.mock.calls[0][0].detail.isInitial).to.be.true;
  });
});

describe('skipInitialCall option', () => {
  test('starts the recurring interval but fires no immediate create_token call', () => {
    const poller = new LoanTokenPoller({
      identifier: 'foo',
      borrowType: 'browsed',
      successCallback: () => {},
      errorCallback: () => {},
      pollerDelay: 120,
      skipInitialCall: true,
    });
    const handleLoanTokenPollerSpy = vi.spyOn(poller, 'handleLoanTokenPoller');

    // bookAccessed() already ran in the constructor above (before the spy
    // was attached), so re-run it to observe whether it calls out.
    poller.bookAccessed();

    expect(handleLoanTokenPollerSpy).not.toHaveBeenCalled();
    expect(window.IALendingIntervals.tokenPoller).to.not.equal(0);
    poller.disconnectedCallback();
  });

  test('fires the immediate call as usual when skipInitialCall is not set', () => {
    const poller = new LoanTokenPoller({
      identifier: 'foo',
      borrowType: 'browsed',
      successCallback: () => {},
      errorCallback: () => {},
      pollerDelay: 120,
    });
    const handleLoanTokenPollerSpy = vi.spyOn(poller, 'handleLoanTokenPoller');

    poller.bookAccessed();

    expect(handleLoanTokenPollerSpy).toHaveBeenCalledWith(true);
    poller.disconnectedCallback();
  });
});

describe('handleTokenError', () => {
  const originalSentry = window.Sentry;

  beforeEach(() => {
    window.Sentry = { captureMessage: vi.fn(), captureException: vi.fn() };
  });

  afterEach(() => {
    window.Sentry = originalSentry;
  });

  const makePoller = (errorCallback: () => void = () => {}) =>
    new LoanTokenPoller({
      identifier: 'identifier1',
      borrowType: 'borrowed',
      successCallback: () => {},
      errorCallback,
      pollerDelay: 120,
      skipInitialCall: true,
    });

  test('sends the identifier, action, borrowType and status to Sentry', () => {
    const poller = makePoller();

    poller.handleTokenError(
      { success: false, error: unexpectedResponseError(400), status: 400 },
      false,
    );

    const [, context] = vi.mocked(window.Sentry!.captureMessage).mock.calls[0];
    expect(context?.tags).toEqual({
      identifier: 'identifier1',
      action: 'create_token',
    });
    expect(context?.extra.borrowType).toBe('borrowed');
    expect(context?.extra.status).toBe(400);
    expect(context?.extra.isInitial).toBe(false);
    poller.disconnectedCallback();
  });

  test('still calls errorCallback for an HTML 400 from the WAF, passing the response through', () => {
    const errorCallback = vi.fn();
    const poller = makePoller(errorCallback);
    const data = {
      success: false,
      error: unexpectedResponseError(400),
      status: 400,
      nonJsonResponse: true,
    };

    poller.handleTokenError(data, false);

    expect(errorCallback).toHaveBeenCalledOnce();
    const { detail } = errorCallback.mock.calls[0][0];
    expect(detail.data).toEqual(data);
    expect(detail.isInitial).toBe(false);
    poller.disconnectedCallback();
  });

  test('passes the count of failures in a row to errorCallback', () => {
    const errorCallback = vi.fn();
    const poller = makePoller(errorCallback);

    poller.handleTokenError({ error: 'x' }, false);
    poller.handleTokenError({ error: 'x' }, false);
    poller.handleTokenError({ error: 'x' }, false);

    expect(
      errorCallback.mock.calls.map(
        ([event]) => event.detail.consecutiveFailures,
      ),
    ).toEqual([1, 2, 3]);
    poller.disconnectedCallback();
  });

  test('resets the count after a successful refresh', async () => {
    const errorCallback = vi.fn();
    const poller = makePoller(errorCallback);

    poller.handleTokenError({ error: 'x' }, false);
    poller.handleTokenError({ error: 'x' }, false);
    await poller.handleLoanTokenPoller(false);
    await new Promise((resolve) => setTimeout(resolve, 100));
    poller.handleTokenError({ error: 'x' }, false);

    expect(errorCallback.mock.lastCall![0].detail.consecutiveFailures).toBe(1);
    poller.disconnectedCallback();
  });

  test('sends its requests through the fetch handler it was given', async () => {
    const fetchHandler = {
      fetch: vi
        .fn()
        .mockResolvedValue(
          new Response(JSON.stringify({ success: true }), { status: 200 }),
        ),
    };
    const successCallback = vi.fn();
    const poller = new LoanTokenPoller({
      identifier: 'identifier1',
      borrowType: 'borrowed',
      successCallback,
      errorCallback: () => {},
      pollerDelay: 120,
      skipInitialCall: true,
      fetchHandler: fetchHandler as never,
    });

    await poller.handleLoanTokenPoller(true);
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(fetchHandler.fetch).toHaveBeenCalledOnce();
    expect(successCallback).toHaveBeenCalledOnce();
    poller.disconnectedCallback();
  });
});
