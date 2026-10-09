import { LocalCache } from '@internetarchive/local-cache';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { LoanRenewHelper } from './loan-renew-helper';

const identifier = 'booBar';
const loanRenewTimeConfig = {
  loanTotalTime: 13,
  loanRenewAtLast: 10,
  pageChangedInLast: 12,
};

// localCache used for auto-loan-renew
const localCache = new LocalCache({
  namespace: 'loanRenew',
});

beforeEach(async () => {
  await localCache.set({
    key: `${identifier}-loanTime`,
    value: new Date(
      new Date().getTime() + loanRenewTimeConfig.loanTotalTime * 1000,
    ),
    ttl: Number(loanRenewTimeConfig.loanTotalTime),
  });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Loan Renew Determine', () => {
  test('flip book page while reading a book', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.advanceTimersByTime(1500);

    await localCache.set({
      key: `${identifier}-pageChangedTime`,
      value: new Date(), // current time
      ttl: Number(loanRenewTimeConfig.loanTotalTime),
    });

    const loanRenewHelper = new LoanRenewHelper(
      true, // hasPageChanged
      identifier,
      localCache,
      loanRenewTimeConfig,
    );
    await loanRenewHelper.handleLoanRenew();

    expect(loanRenewHelper.result.renewNow).to.be.false;
  });

  test('auto renewed book when user is currently reading', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });

    await localCache.set({
      key: `${identifier}-pageChangedTime`,
      value: new Date(), // current time
      ttl: Number(loanRenewTimeConfig.loanTotalTime),
    });

    vi.advanceTimersByTime(1500);

    const loanRenewHelper = new LoanRenewHelper(
      false, // timer-countdown event
      identifier,
      localCache,
      loanRenewTimeConfig,
    );
    await loanRenewHelper.handleLoanRenew();

    expect(loanRenewHelper.result.renewNow).to.be.true;
  });

  test('get toast message template', async () => {
    const loanRenewHelper = new LoanRenewHelper(
      false,
      identifier,
      localCache,
      loanRenewTimeConfig,
    );

    const toastMsg = loanRenewHelper.getMessageTexts(
      loanRenewHelper.loanReturnWarning,
      65, // in seconds
    );

    expect(toastMsg).to.be.equal(
      'Go to any other page to keep your loan active.',
    );
  });
});
