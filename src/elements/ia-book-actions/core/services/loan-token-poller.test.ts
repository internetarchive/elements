import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { LoanTokenPoller } from './loan-token-poller';
import '../config/ia-lending-intervals';
import { stubLoanFetch } from '../../loan-fetch-stub.test-helper';

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
