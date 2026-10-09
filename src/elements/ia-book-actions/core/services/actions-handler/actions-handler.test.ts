import { fixture, fixtureCleanup, oneEvent } from '@open-wc/testing-helpers';
import { LocalCache } from '@internetarchive/local-cache';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import ActionsHandler from './actions-handler';
import {
  analyticsCategories,
  analyticsActions,
  analyticsLabels,
} from '../../config/analytics-event-and-category';
import { stubLoanFetch } from '../../../loan-fetch-stub.test-helper';
import type { LoanAutoRenewedDetail } from '../../../models';

// Define a temporary tag for this element for testing
const TEST_TAG = 'ia-actions-handler-test';
if (!customElements.get(TEST_TAG)) {
  customElements.define(TEST_TAG, ActionsHandler);
}

afterEach(() => {
  fixtureCleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('ActionsHandler#setStickyAdminAccess', () => {
  let lastSetCookie: string | undefined;
  let actionsHandlerFixture: ActionsHandler;

  beforeEach(async () => {
    // Intercept document.cookie writes to capture the full cookie string
    Object.defineProperty(document, 'cookie', {
      configurable: true,
      get() {
        return '';
      },
      set(value) {
        lastSetCookie = value;
      },
    });

    // Create the element via fixture (portable across browsers)
    actionsHandlerFixture = await fixture<ActionsHandler>(
      `<${TEST_TAG}></${TEST_TAG}>`,
    );
  });

  afterEach(() => {
    // restore document.cookie by removing our instance-level override
    Reflect.deleteProperty(document, 'cookie');
    lastSetCookie = undefined;
  });

  test('sets the sticky-admin-access cookie with correct domain, path, and 30-day expiration', async () => {
    // Arrange: fix time and stub cookie writer
    const now = new Date('2025-01-01T00:00:00.000Z');
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(now);

    // Calculate expected values based on current environment
    const expectedDomain =
      window.location.hostname === 'localhost' ? 'localhost' : '.archive.org';
    const expectedExpires = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Act: call the method on the element created in beforeEach
    actionsHandlerFixture.setStickyAdminAccess(true);

    // Assert: verify the composed cookie string
    expect(lastSetCookie).to.be.a('string');
    // Name and value
    expect(lastSetCookie).to.contain(
      `${encodeURIComponent('sticky-admin-access')}=${encodeURIComponent('true')}`,
    );
    // Domain
    expect(lastSetCookie).to.contain(`domain=${expectedDomain}`);
    // Path
    expect(lastSetCookie).to.contain('path=/');
    // Expiration close to 30 days from now
    const match = /expires=([^;]+)/.exec(lastSetCookie as string);
    expect(match).to.not.equal(null);
    const expiresStr = match && match[1];
    const parsed = expiresStr ? new Date(expiresStr) : null;
    expect(parsed).to.be.instanceOf(Date);
    expect(parsed && parsed.getTime()).to.equal(expectedExpires.getTime());
  });

  test('sets the cookie value to false when disabling', async () => {
    // Act
    actionsHandlerFixture.setStickyAdminAccess(false);

    expect(lastSetCookie).to.be.a('string');
    expect(lastSetCookie).to.contain(
      `${encodeURIComponent('sticky-admin-access')}=${encodeURIComponent('false')}`,
    );
  });
});

describe('ActionsHandler#handleLoanRenewNow', () => {
  let el: ActionsHandler;
  let localCache: LocalCache;
  const identifier = 'renew-now-test-book';

  beforeEach(async () => {
    stubLoanFetch();

    // Make sure no other test in this run left ?error=true in the URL.
    // ActionsHandlerService reads it directly off window.location.
    const params = new URLSearchParams(window.location.search);
    if (params.has('error')) {
      params.delete('error');
      const query = params.toString();
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}${query ? `?${query}` : ''}`,
      );
    }

    el = await fixture<ActionsHandler>(`<${TEST_TAG}></${TEST_TAG}>`);
    el.identifier = identifier;
    el.loanTotalTime = 3600;
    localCache = new LocalCache({ namespace: 'loanRenew' });
    el.localCache = localCache;
    await localCache.delete(`${identifier}-loanTime`);
  });

  test('awaits the loanTime cache write before dispatching loanAutoRenewed, and fires the renew analytics event only on success', async () => {
    // The test environment's ActionsHandlerService fakes a renew_loan
    // success after a 5s delay to simulate a real network round-trip.
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });

    const storeStatsSpy = vi.spyOn(el.loanAnanlytics, 'storeLoanStatsCount');
    const sendEventSpy = vi.spyOn(el.loanAnanlytics, 'sendEvent');

    let loanTimeWhenEventFired: Promise<Date | undefined> | undefined;
    el.addEventListener('loanAutoRenewed', () => {
      loanTimeWhenEventFired = localCache.get(`${identifier}-loanTime`);
    });
    const renewed = oneEvent(el, 'loanAutoRenewed');

    el.handleLoanRenewNow('auto');

    await vi.advanceTimersByTimeAsync(5000);
    const { detail } = (await renewed) as CustomEvent<LoanAutoRenewedDetail>;
    expect(detail.action).to.equal('renew_loan');

    // loanAutoRenewed must not dispatch before setBrowseTimeSession()'s
    // cache write lands, or a listener reading the cache immediately could
    // still see the old/deleted value.
    const resolvedLoanTime = await loanTimeWhenEventFired;
    expect(resolvedLoanTime).to.exist;
    expect(resolvedLoanTime!.getTime()).to.be.greaterThan(Date.now());

    expect(storeStatsSpy).toHaveBeenCalledWith(identifier, 'autorenew');
    // storeLoanStatsCount fires its own matrix-stats sendEvent internally,
    // so assert on the specific renew-success event rather than call count.
    expect(sendEventSpy).toHaveBeenCalledWith(
      analyticsCategories.browse,
      analyticsActions.browseRenew,
      analyticsLabels.browseAutoRenew,
      identifier,
    );
  });

  test('does not fire the renew analytics event when the renewal fails', async () => {
    const sendEventSpy = vi.spyOn(el.loanAnanlytics, 'sendEvent');
    const storeStatsSpy = vi.spyOn(el.loanAnanlytics, 'storeLoanStatsCount');

    // Force ActionsHandlerService's shouldReturnError branch for this call.
    const originalSearch = window.location.search;
    const params = new URLSearchParams(originalSearch);
    params.set('error', 'true');
    window.history.pushState({}, '', `?${params.toString()}`);

    try {
      const errored = oneEvent(el, 'lendingActionError');
      el.handleLoanRenewNow('auto');
      const { detail } = (await errored) as CustomEvent<{ action: string }>;

      expect(detail.action).to.equal('renew_loan');
      // dispatchActionError fires its own 'LendingServiceError' analytics
      // event on any error, which is expected. What must NOT fire is the
      // renew-success event, which is gated on `isRenewal`.
      expect(sendEventSpy).not.toHaveBeenCalledWith(
        analyticsCategories.browse,
        analyticsActions.browseRenew,
      );
      expect(storeStatsSpy).not.toHaveBeenCalledWith(identifier, 'autorenew');
    } finally {
      window.history.pushState(
        {},
        '',
        `${window.location.pathname}${originalSearch}`,
      );
    }
  });
});
