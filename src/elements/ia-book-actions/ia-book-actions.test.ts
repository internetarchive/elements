import { aTimeout, fixture, fixtureCleanup } from '@open-wc/testing-helpers';
import { LocalCache } from '@internetarchive/local-cache';
import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';
import { html } from 'lit';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import './ia-book-actions';
import type { IABookActions } from './ia-book-actions';
import type { LendingStatus } from './models';
import {
  OFFLINE_LOADER_ICON,
  settle,
  stubLoanFetch,
} from './loan-fetch-stub.test-helper';

beforeEach(() => {
  const modalManager = document.createElement('modal-manager');
  document.body.appendChild(modalManager);
  stubLoanFetch();
});

// localCache used for auto-loan-renew
const localCache = new LocalCache({
  namespace: 'loanRenew',
});

// Identifiers the tests use. The element writes `<identifier>-loanTime`.
const testIdentifiers = [
  'Foo',
  'foo',
  'foobar',
  'auto-returned',
  'fresh-expired',
  'no-loan',
  'not-renewed',
  'poller-teardown',
  'token-blip',
  'token-exhausted',
];

afterEach(async () => {
  fixtureCleanup();
  window.IALendingIntervals.clearAll();
  vi.restoreAllMocks();
  vi.useRealTimers();
  document.querySelector('modal-manager')?.remove();
  await Promise.all(
    testIdentifiers.map((id) => localCache.delete(`${id}-loanTime`)),
  );
});

interface ContainerOptions {
  userid?: string;
  identifier?: string;
  lendingStatus?: LendingStatus;
  barType?: 'action' | 'title';
}

const container = ({
  userid,
  identifier,
  lendingStatus = {},
  barType = 'action',
}: ContainerOptions = {}) =>
  html`<ia-book-actions
    .userid=${userid}
    .identifier=${identifier}
    .lendingStatus=${lendingStatus}
    .barType=${barType}
    .loaderIcon=${OFFLINE_LOADER_ICON}
  ></ia-book-actions>`;

const create = (options?: ContainerOptions) =>
  fixture<IABookActions>(container(options));

describe('<ia-book-actions>', () => {
  test('Check assigned property value', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        is_lendable: true,
        available_to_browse: false,
        available_to_borrow: true,
      },
    });

    expect(el.userid).to.be.equal('@user1');
    expect(el.identifier).to.equal('foobar');
  });

  test('Can daw a title bar instead of actions', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      barType: 'title',
    });

    const titleBar = el.shadowRoot!.querySelector('ia-book-actions-title-bar');
    expect(titleBar).to.exist;
  });

  test('Handles <collapsible-action-group>@toggleActionGroup event', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
    });

    const collapsibleActionGroup = el.shadowRoot!.querySelector(
      'ia-book-actions-collapsible-action-group',
    );
    expect(el.disableActionGroup).to.be.false;
    collapsibleActionGroup!.dispatchEvent(new Event('toggleActionGroup'));
    await el.updateComplete;
    expect(el.disableActionGroup).to.be.true;
  });

  test('handles `BookReader:userAction` event when loan is active', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
    });

    const spy = vi.spyOn(el, 'autoLoanRenewChecker');
    el.lendingStatus = { ...el.lendingStatus, browsingExpired: false };
    await el.updateComplete;
    // Set borrowType after the update so setupLendingToolbarActions() doesn't overwrite it
    el.borrowType = 'browsed';

    window.dispatchEvent(new Event('BookReader:userAction'));
    await el.updateComplete;

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(true);
  });

  test('handles `BookReader:userAction` event when loan has expired', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: { user_has_browsed: true, browsingExpired: true },
    });

    const spy = vi.spyOn(el, 'autoRenewExpiredLoan');
    el.borrowType = 'browsed';
    await el.updateComplete;

    window.dispatchEvent(new Event('BookReader:userAction'));
    await el.updateComplete;

    expect(spy).toHaveBeenCalledOnce();
  });

  test('ignores BookReader:userAction fired by BookReader init (WEBDEV-8322 follow-up)', async () => {
    // BookReader fires 'userAction' on its own init-time jump to the
    // reader's last-read page, which has nothing to do with the patron doing
    // anything. Auto-renewing off that would silently re-borrow a lapsed book
    // on a plain page refresh.
    //
    // BookReader.trigger() passes the BookReader instance as detail.props,
    // and init.initComplete is false for exactly the span containing that
    // jump.
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: { user_has_browsed: true, browsingExpired: true },
    });
    el.borrowType = 'browsed';
    await el.updateComplete;

    const spy = vi.spyOn(el, 'autoRenewExpiredLoan');

    window.dispatchEvent(
      new CustomEvent('BookReader:userAction', {
        detail: { props: { init: { initComplete: false } } },
      }),
    );
    await el.updateComplete;

    expect(spy).not.toHaveBeenCalled();
  });

  test('honours BookReader:userAction once BookReader init has completed', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: { user_has_browsed: true, browsingExpired: true },
    });
    el.borrowType = 'browsed';
    await el.updateComplete;

    const spy = vi.spyOn(el, 'autoRenewExpiredLoan');

    window.dispatchEvent(
      new CustomEvent('BookReader:userAction', {
        detail: { props: { init: { initComplete: true } } },
      }),
    );
    await el.updateComplete;

    expect(spy).toHaveBeenCalledOnce();
  });

  test('treats a userAction with no BookReader detail as a genuine interaction', async () => {
    // A BookReader too old to expose init.initComplete, or any synthetic
    // dispatch, is not swallowed. Only an explicit false suppresses the
    // event.
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: { user_has_browsed: true, browsingExpired: true },
    });
    el.borrowType = 'browsed';
    await el.updateComplete;

    const spy = vi.spyOn(el, 'autoRenewExpiredLoan');

    window.dispatchEvent(new Event('BookReader:userAction'));
    await el.updateComplete;

    expect(spy).toHaveBeenCalledOnce();
  });
});

describe('Primary Actions data', () => {
  test('Check data for single primary action', async () => {
    const el = await create({
      userid: 'foo',
      identifier: 'foo',
      lendingStatus: {
        is_lendable: true,
        available_to_browse: false,
        available_to_borrow: true,
      },
    });

    const expectedPrimaryActions = [
      {
        text: 'Borrow for 14 days',
        className: 'ia-button primary',
      },
      {
        text: 'Print Disability Access',
        className: 'print-disability',
      },
    ];

    expect(el.primaryActions.length).to.equal(2);
    expect(el.primaryActions.length).to.equal(expectedPrimaryActions.length);

    expect(el.primaryActions[0].text).to.equal('Borrow for 14 days');
    expect(el.primaryActions[0].text).to.equal(expectedPrimaryActions[0].text);
  });

  test('Check data for multiple primary action', async () => {
    const el = await create({
      userid: '@user',
      identifier: 'foobar',
      lendingStatus: {
        is_lendable: true,
        available_to_browse: true,
        available_to_borrow: true,
      },
    });
    const expectedPrimaryActions = [
      {
        text: 'Borrow', // changed from 'Borrow for 1 hour'
        callback: () => {},
        className: 'ia-button primary',
      },
      {
        text: 'Borrow for 14 days',
        callback: () => {},
        className: 'ia-button primary',
        disabled: false,
      },
      {
        text: 'Print Disability Access',
        url: '/details/printdisabled?tab=about',
        className: 'print-disability',
      },
    ];

    expect(el.primaryActions.length).to.equal(3);
    expect(el.primaryActions.length).to.equal(expectedPrimaryActions.length);
    expect(el.primaryActions[1].text).to.equal('Borrow for 14 days');
    expect(el.primaryActions[1].text).to.equal(expectedPrimaryActions[1].text);
  });
});

describe('Borrow status actions', () => {
  test('Update available_to_browse key when book is not available to borrow', async () => {
    const el = await create({
      userid: '@user1',
      lendingStatus: {
        is_lendable: true,
        available_to_browse: true,
        available_to_borrow: true,
      },
    });

    const errorEvent = new CustomEvent('lendingActionError');
    el.addEventListener('lendingActionError', () => {
      el.handleLendingActionError({
        detail: {
          action: 'browse_book',
          data: { error: 'not available to borrow' },
        },
      });
    });
    el.dispatchEvent(errorEvent);
    await el.updateComplete;

    // removed available_to_browse from lending bar
    expect(el.lendingStatus.available_to_browse).to.be.false;
    expect(el.primaryActions[0].text).to.equal('Borrow for 14 days');
  });

  test('Update available_to_borrow key when book is not available to borrow', async () => {
    const el = await create({
      userid: '@user1',
      lendingStatus: {
        is_lendable: true,
        available_to_browse: true,
        available_to_borrow: true,
      },
    });

    const errorEvent = new Event('lendingActionError');
    el.addEventListener('lendingActionError', () => {
      el.handleLendingActionError({
        detail: {
          action: 'borrow_book',
          data: { error: 'not available to borrow' },
        },
      });
    });
    el.dispatchEvent(errorEvent);
    await el.updateComplete;

    // removed available_to_borrow from lending bar
    expect(el.lendingStatus.available_to_borrow).to.be.false;
    expect(el.primaryActions[0].text).to.equal('Borrow');
  });

  test('Check action for borrowable book without user', async () => {
    const el = await create({
      lendingStatus: {
        is_lendable: true,
        available_to_browse: true,
        available_to_borrow: true,
      },
    });
    const expectedPrimaryActions = [
      {
        text: 'Log In and Borrow',
        callback: () => {},
        className: 'ia-button danger',
      },
    ];

    expect(el.primaryTitle).to.equal(
      'Renews automatically with continued use.',
    );
    expect(el.primaryActions.length).to.equal(2);
    expect(el.primaryActions[0].text).to.equal('Log In and Borrow');
    expect(el.primaryActions[0].text).to.equal(expectedPrimaryActions[0].text);
  });

  test('Check action for browsed book with user', async () => {
    const el = await create({
      userid: '@userid',
      lendingStatus: {
        is_lendable: true,
        user_has_browsed: true,
        available_to_browse: true,
        available_to_borrow: true,
      },
    });
    const expectedPrimaryActions = [
      {
        text: 'Return now',
        className: 'ia-button danger',
      },
      {
        text: 'Print Disability Access',
        url: '/details/printdisabled?tab=about',
        className: 'print-disability',
      },
    ];

    expect(el.primaryActions.length).to.equal(3);
    expect(el.primaryActions[0].text).to.equal(expectedPrimaryActions[0].text);
    expect(el.primaryActions[1].text).to.equal('Borrow for 14 days');
  });
});

describe('Browsing expired status', () => {
  test('Book is browsed but not expired', async () => {
    const el = await create({
      userid: '@userid',
      lendingStatus: {
        is_lendable: true,
        user_has_browsed: true,
        browseHasExpired: false,
      },
    });
    expect(el.primaryTitle).contains('');
    expect(el.primaryActions[0].text).to.equal('Return now');
    expect(el.primaryActions[1].text).to.equal('Print Disability Access');

    // default params of one-hour loan renew
    expect(el.loanRenewResult.texts).to.equal('');
    expect(el.loanRenewResult.renewNow).to.equal(false);
    expect(el.loanRenewResult.secondsLeft).to.equal(0);
  });

  test('Book is browsing and going to expire after 1 second', async () => {
    vi.useFakeTimers({
      toFake: [
        'setTimeout',
        'clearTimeout',
        'setInterval',
        'clearInterval',
        'Date',
      ],
    });
    const el = await create({
      userid: '@userid',
      lendingStatus: {
        is_lendable: true,
        user_has_browsed: true,
        browseHasExpired: false,
        secondsLeftOnLoan: 1,
      },
    });

    // timer-countdown is still active
    expect(el.timerCountdownEl).to.exist;

    await vi.advanceTimersByTimeAsync(1500); // wait for 1.5 second
    await settle();
    await el.updateComplete;

    // Auto-return doesn't visibly change the action bar. It stays exactly
    // as it looked while reading.
    expect(el.primaryActions[0].text).to.equal('Return now');

    expect(el.timerCountdownEl).to.exist;

    //   // book has been expired
    expect(el.loanRenewResult.renewNow).to.equal(false);
    expect(el.loanRenewResult.secondsLeft).to.equal(0);
    expect(el.loanRenewResult.texts).to.equal(
      'This book has been returned due to inactivity.',
    );
  });

  test('Expiring book cancels interval & emits event', async () => {
    vi.useFakeTimers({
      toFake: [
        'setTimeout',
        'clearTimeout',
        'setInterval',
        'clearInterval',
        'Date',
      ],
    });
    const baseStatus = {
      is_lendable: true,
      user_has_browsed: false,
    };
    const el = await create({
      userid: '@userid',
      lendingStatus: baseStatus,
    });

    let eventReceived = false;
    const listener = () => {
      eventReceived = true;
    };
    el.addEventListener('IABookReader:BrowsingHasExpired', listener);

    const browsingStatus = { ...baseStatus, user_has_browsed: true };
    el.lendingStatus = browsingStatus;
    await el.updateComplete;

    expect(el.primaryTitle).contains('');
    expect(el.primaryActions[0].text).to.equal('Return now');

    const expiredStatus = { ...browsingStatus, browsingExpired: true };
    el.lendingStatus = expiredStatus;
    await el.updateComplete;
    await vi.advanceTimersByTimeAsync(1500); // wait for 1.5 sec
    await settle();

    expect(eventReceived).to.equal(true);
    // Auto-return doesn't visibly change the action bar. It stays exactly
    // as it looked while reading.
    expect(el.primaryActions[0].text).to.equal('Return now');
    expect(el.tokenPoller!.loanTokenInterval).to.equal(undefined);
  });
});

describe('Auto renew one hour loan', () => {
  test('Book is browsing and renewed it now', async () => {
    vi.useFakeTimers({
      toFake: [
        'setTimeout',
        'clearTimeout',
        'setInterval',
        'clearInterval',
        'Date',
      ],
    });
    const loanTime = 88;
    const el = await create({
      userid: '@userid',
      identifier: 'Foo',
      lendingStatus: {
        is_lendable: true,
        user_has_browsed: true,
        browseHasExpired: false,
        secondsLeftOnLoan: loanTime,
      },
    });

    // timer-countdown starts with same amount component is loaded with
    expect(el.timerCountdownEl!.secondsLeftOnLoan).to.equal(loanTime);

    const handleLoanAutoRenewedSpy = vi.spyOn(el, 'handleLoanAutoRenewed');

    // let's update state, fastforward loan...
    el.loanRenewResult = {
      texts: 'This book has been renewed for 1 hour.',
      renewNow: true,
      secondsLeft: 10,
    };
    el.lendingStatus = {
      is_lendable: true,
      user_has_browsed: true,
      browseHasExpired: false,
      secondsLeftOnLoan: 8, // <-- loan time has decreased
    };

    await el.updateComplete;

    await localCache.set({
      key: `${el.identifier}-loanTime`,
      value: new Date(new Date().getTime() + loanTime * 1000),
      ttl: Number(10),
    });

    // timer-countdown reflects decreased loan time
    expect(el.timerCountdownEl!.secondsLeftOnLoan).to.equal(8);

    expect(el.postInitComplete).to.equal(false);

    // dispatch loanAutoRenewed event - test 200 callback
    const collapsibleActionGroupEl = el.shadowRoot!.querySelector(
      'ia-book-actions-collapsible-action-group',
    );
    collapsibleActionGroupEl!.dispatchEvent(
      new CustomEvent('loanAutoRenewed', {
        detail: { data: { identifier: 'Foo' } },
      }),
    );

    await vi.advanceTimersByTimeAsync(1900); // wait for 1.9 second
    await settle();
    await el.updateComplete;

    // Autorenew 200 callback is called
    expect(handleLoanAutoRenewedSpy).toHaveBeenCalledOnce();

    expect(el.loanRenewResult.texts).to.equal(
      'This book has been renewed for 1 hour.',
    );
    expect(el.loanRenewResult.renewNow).to.equal(true);
    expect(el.loanRenewResult.secondsLeft).to.equal(10);
    expect(el.timerCountdownEl).to.exist;
    expect(el.timerCountdownEl!.secondsLeftOnLoan).to.equal(8);
  });
});

describe('Visibility change API for document', () => {
  beforeEach(() => {
    Object.defineProperty(document, 'hidden', {
      value: false,
      configurable: true,
    });
  });

  afterEach(() => {
    Reflect.deleteProperty(document, 'hidden');
  });

  test('when book is not expired and loan time is valid', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        user_has_browsed: true,
        browsingExpired: false,
        // startBrowseTimer() needs a number here. Without one it computes
        // setTimeout(fn, undefined * 1000), which is NaN and fires almost
        // immediately, expiring the loan before the test dispatches its
        // event.
        secondsLeftOnLoan: 3600,
      },
    });
    await el.updateComplete;

    // Set a valid loan time well into the future
    await el.localCache.set({
      key: 'foobar-loanTime',
      value: new Date(new Date().getTime() + 3600 * 1000),
      ttl: 3600,
    });

    const spy = vi.spyOn(el, 'loanStatusCheckInterval');
    document.dispatchEvent(new Event('visibilitychange'));
    await aTimeout(100);

    expect(spy).toHaveBeenCalledOnce();
  });

  test('when loan expired while tab was hidden (browsingExpired false, loanTime past)', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        user_has_browsed: true,
        browsingExpired: false,
        secondsLeftOnLoan: 3600,
      },
    });
    await el.updateComplete;

    // Set a loan time already in the past
    await el.localCache.set({
      key: 'foobar-loanTime',
      value: new Date(new Date().getTime() - 10 * 1000),
      ttl: 3600,
    });

    const spy = vi.spyOn(el, 'autoRenewExpiredLoan');
    document.dispatchEvent(new Event('visibilitychange'));
    await aTimeout(100);

    expect(spy).toHaveBeenCalledOnce();
  });

  test('when loan already marked expired (browsingExpired true)', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        user_has_browsed: true,
        browsingExpired: true,
      },
    });
    await el.updateComplete;

    el.borrowType = 'browsed';

    const spy = vi.spyOn(el, 'autoRenewExpiredLoan');
    document.dispatchEvent(new Event('visibilitychange'));
    await aTimeout(100);

    expect(spy).toHaveBeenCalledOnce();
  });
});

describe('Removed instance', () => {
  test('no longer reacts to BookReader:userAction or visibilitychange', async () => {
    Object.defineProperty(document, 'hidden', {
      value: false,
      configurable: true,
    });
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        user_has_browsed: true,
        browsingExpired: true,
      },
    });
    await el.updateComplete;
    el.borrowType = 'browsed';

    const spy = vi.spyOn(el, 'autoRenewExpiredLoan');
    el.remove();
    window.dispatchEvent(new CustomEvent('BookReader:userAction'));
    document.dispatchEvent(new Event('visibilitychange'));
    await aTimeout(50);
    Reflect.deleteProperty(document, 'hidden');

    expect(spy).not.toHaveBeenCalled();
  });

  test('reacts again after being reconnected, without double-binding', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        user_has_browsed: true,
        browsingExpired: true,
      },
    });
    await el.updateComplete;
    el.borrowType = 'browsed';

    const parent = el.parentElement!;
    el.remove();
    parent.appendChild(el);

    const spy = vi
      .spyOn(el, 'autoRenewExpiredLoan')
      .mockImplementation(() => {});
    window.dispatchEvent(new CustomEvent('BookReader:userAction'));
    await aTimeout(50);

    expect(spy).toHaveBeenCalledOnce();
  });
});

describe('autoRenewExpiredLoan', () => {
  test('optimistically resets browsingExpired so the button stays red', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        user_has_browsed: true,
        available_to_browse: true,
        browsingExpired: true,
      },
    });
    await el.updateComplete;

    // Before: browsingExpired true → borrow1HrAction → primary color is 'primary' (blue)
    expect(el.primaryColor).to.equal('primary');

    el.autoRenewExpiredLoan();
    await el.updateComplete;

    // After: browsingExpired flipped to false → patronIsReadingAction → 'danger' (red)
    expect(el.lendingStatus.browsingExpired).to.be.false;
    expect(el.primaryColor).to.equal('danger');
  });

  test('does not (re)start the countdown during the optimistic pre-confirmation window (WEBDEV-8322 follow-up)', async () => {
    // The optimistic browsingExpired flip triggers
    // setupLendingToolbarActions() before renew_loan is dispatched, let
    // alone confirmed. It is gated on loanRenewInProgress so it doesn't
    // (re)start the timer-countdown interval from the stale
    // secondsLeftOnLoan left over from before the loan expired, which would
    // show a wrong or flickering value until handleLoanAutoRenewed()
    // corrects it.
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        user_has_browsed: true,
        available_to_browse: true,
        browsingExpired: true,
      },
    });
    await el.updateComplete;

    const startTimerCountdownSpy = vi.spyOn(el, 'startTimerCountdown');

    el.autoRenewExpiredLoan();
    await el.updateComplete;

    expect(el.loanRenewInProgress).to.be.true;
    expect(startTimerCountdownSpy).not.toHaveBeenCalled();
  });

  test('sets loanRenewInProgress and triggers renewNow after timeout', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        user_has_browsed: true,
        browsingExpired: true,
      },
    });
    await el.updateComplete;

    el.autoRenewExpiredLoan();

    expect(el.loanRenewInProgress).to.be.true;

    // renewNow is set in a setTimeout, so flush the macrotask queue
    await aTimeout(50);
    expect(el.loanRenewResult.renewNow).to.be.true;
    expect(el.loanRenewResult.renewType).to.equal('auto');
  });

  test('ignores subsequent calls while a renewal is already in progress', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        user_has_browsed: true,
        browsingExpired: true,
      },
    });
    await el.updateComplete;

    // Spy *after* fixture so the handler is the same instance
    const spy = vi.spyOn(el, 'autoRenewExpiredLoan');

    el.autoRenewExpiredLoan(); // first call proceeds
    el.autoRenewExpiredLoan(); // second call is a no-op

    // The spy counts both invocations but the internal guard stops the second
    expect(spy).toHaveBeenCalledTimes(2);
    // loanRenewInProgress is still true (not double-set or cleared)
    expect(el.loanRenewInProgress).to.be.true;

    // Only one setTimeout fires (the second call returned early)
    await aTimeout(50);
    expect(el.loanRenewResult.renewNow).to.be.true;
  });

  test('clears loanRenewInProgress after a successful loanAutoRenewed event', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        user_has_browsed: true,
        browsingExpired: false,
        secondsLeftOnLoan: 100,
      },
    });
    await el.updateComplete;

    await el.localCache.set({
      key: 'foobar-loanTime',
      value: new Date(new Date().getTime() + 3600 * 1000),
      ttl: 3600,
    });

    el.autoRenewExpiredLoan();
    expect(el.loanRenewInProgress).to.be.true;

    // Wait for the deferred renewNow to be set
    await aTimeout(50);

    // Simulate the renew_loan success response
    const collapsibleActionGroupEl = el.shadowRoot!.querySelector(
      'ia-book-actions-collapsible-action-group',
    );
    collapsibleActionGroupEl!.dispatchEvent(
      new CustomEvent('loanAutoRenewed', {
        detail: { data: { loan: { identifier: 'foobar', renewal: true } } },
      }),
    );

    await aTimeout(100);
    await el.updateComplete;

    expect(el.loanRenewInProgress).to.be.false;
  });

  test('does not reset postInitComplete until renewal is confirmed, not on the optimistic flip (WEBDEV-8322 follow-up)', async () => {
    // postInitComplete is what lets BookReader re-initialize via
    // create_token. Resetting it as soon as autoRenewExpiredLoan()
    // optimistically flips browsingExpired would let create_token race ahead
    // of renew_loan's response, read the still-expired loan record and mint
    // a bad access cookie, breaking page images with CORS/auth errors until
    // the next natural token refresh.
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        user_has_browsed: true,
        browsingExpired: true,
      },
    });
    await el.updateComplete;
    el.postInitComplete = true;
    const postInitSpy = vi.fn();
    el.lendingBarPostInit = postInitSpy;

    await el.localCache.set({
      key: 'foobar-loanTime',
      value: new Date(new Date().getTime() + 3600 * 1000),
      ttl: 3600,
    });

    el.autoRenewExpiredLoan();
    await el.updateComplete;

    // Still true right after the optimistic flip. It must not reset early.
    expect(el.postInitComplete).to.be.true;
    expect(postInitSpy).not.toHaveBeenCalled();

    await aTimeout(50);

    const collapsibleActionGroupEl = el.shadowRoot!.querySelector(
      'ia-book-actions-collapsible-action-group',
    );
    collapsibleActionGroupEl!.dispatchEvent(
      new CustomEvent('loanAutoRenewed', {
        detail: { data: { loan: { identifier: 'foobar', renewal: true } } },
      }),
    );

    await aTimeout(200);
    await el.updateComplete;

    // The confirmed renewal re-runs lendingBarPostInit() (BookReader
    // re-init). postInitComplete itself ends up true again once that
    // completes, so assert on the re-init having fired instead of on the
    // transient flag.
    expect(postInitSpy).toHaveBeenCalledOnce();
    expect(el.recoveringFromLoanExpiry).to.be.false;
  });

  test('does not start the token poller (create_token) on the optimistic flip, only after renewal is confirmed', async () => {
    // The token poller restart in setupLendingToolbarActions() is gated on
    // renewal, so it doesn't fire on the optimistic lendingStatus flip and
    // call create_token against the still-expired loan. A failure there
    // clears ALL lending intervals (including the countdown timer) and flips
    // user_has_browsed to false, which can permanently kill the countdown if
    // it loses the race against the real renewal confirming afterward.
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        user_has_browsed: true,
        browsingExpired: true,
      },
    });
    await el.updateComplete;

    await el.localCache.set({
      key: 'foobar-loanTime',
      value: new Date(new Date().getTime() + 3600 * 1000),
      ttl: 3600,
    });

    const startTokenPollerSpy = vi.spyOn(el, 'startLoanTokenPoller');

    el.autoRenewExpiredLoan();
    await el.updateComplete;
    await aTimeout(150); // let the 100ms token-poller-restart check run

    expect(startTokenPollerSpy).not.toHaveBeenCalled();

    await aTimeout(50);
    const collapsibleActionGroupEl = el.shadowRoot!.querySelector(
      'ia-book-actions-collapsible-action-group',
    );
    collapsibleActionGroupEl!.dispatchEvent(
      new CustomEvent('loanAutoRenewed', {
        detail: { data: { loan: { identifier: 'foobar', renewal: true } } },
      }),
    );

    await aTimeout(200);
    await el.updateComplete;

    expect(startTokenPollerSpy).toHaveBeenCalledOnce();
  });

  test('does not touch postInitComplete on a routine (non-expiry) renewal', async () => {
    // A background top-up renewal (loan never actually lapsed) never
    // interrupted BookReader, so it must not force a re-init.
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: { user_has_browsed: true, browsingExpired: false },
    });
    await el.updateComplete;
    el.postInitComplete = true;
    el.loanRenewResult = { texts: '', renewNow: true, renewType: 'auto' };
    const postInitSpy = vi.fn();
    el.lendingBarPostInit = postInitSpy;

    await el.localCache.set({
      key: 'foobar-loanTime',
      value: new Date(new Date().getTime() + 3600 * 1000),
      ttl: 3600,
    });

    const collapsibleActionGroupEl = el.shadowRoot!.querySelector(
      'ia-book-actions-collapsible-action-group',
    );
    collapsibleActionGroupEl!.dispatchEvent(
      new CustomEvent('loanAutoRenewed', {
        detail: { data: { loan: { identifier: 'foobar', renewal: true } } },
      }),
    );

    await aTimeout(100);
    await el.updateComplete;

    expect(postInitSpy).not.toHaveBeenCalled();
  });

  test('also skips the initial create_token after a routine (non-expiry) renewal', async () => {
    // BookLoanService::attempt_to_renew_loan() mints the access token as
    // part of EVERY renew_loan response, not just a recovery from expiry.
    // A routine top-up also has its poller stopped mid-renewal (see
    // updated()'s clearAll() on loanRenewResult.renewNow), so it would
    // otherwise fire this same redundant call once the poller restarts.
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: { user_has_browsed: true, browsingExpired: false },
    });
    await el.updateComplete;
    el.postInitComplete = true;
    const reloadImagesSpy = vi.fn();
    el.reloadPageImages = reloadImagesSpy;

    await el.localCache.set({
      key: 'foobar-loanTime',
      value: new Date(new Date().getTime() + 3600 * 1000),
      ttl: 3600,
    });

    const startTokenPollerSpy = vi.spyOn(el, 'startLoanTokenPoller');

    // Triggers updated()'s clearAll(), stopping the running poller, same
    // as a real routine top-up would.
    el.loanRenewResult = { texts: '', renewNow: true, renewType: 'auto' };
    await el.updateComplete;

    const collapsibleActionGroupEl = el.shadowRoot!.querySelector(
      'ia-book-actions-collapsible-action-group',
    );
    collapsibleActionGroupEl!.dispatchEvent(
      new CustomEvent('loanAutoRenewed', {
        detail: { data: { loan: { identifier: 'foobar', renewal: true } } },
      }),
    );

    await aTimeout(200);
    await el.updateComplete;

    expect(startTokenPollerSpy).toHaveBeenCalledExactlyOnceWith(true);
    // Retries any page image broken during the gap this renewal just closed.
    expect(reloadImagesSpy).toHaveBeenCalled();
  });

  test('calls lendingBarPostInit directly on a recovery renewal and skips the initial create_token', async () => {
    // BookLoanService::attempt_to_renew_loan() mints the access token as
    // part of the renew_loan response itself (using the just-written loan
    // record already in memory, not a separate read). So recovering from a
    // genuine expiry doesn't wait on a confirming create_token success
    // before re-initializing BookReader, and the poller it starts afterward
    // doesn't fire a redundant immediate call.
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        user_has_browsed: true,
        browsingExpired: true,
      },
    });
    await el.updateComplete;
    const postInitSpy = vi.fn();
    el.lendingBarPostInit = postInitSpy;
    const reloadImagesSpy = vi.fn();
    el.reloadPageImages = reloadImagesSpy;

    await el.localCache.set({
      key: 'foobar-loanTime',
      value: new Date(new Date().getTime() + 3600 * 1000),
      ttl: 3600,
    });

    const startTokenPollerSpy = vi.spyOn(el, 'startLoanTokenPoller');

    el.autoRenewExpiredLoan();
    await el.updateComplete;
    await aTimeout(50); // let autoRenewExpiredLoan's setTimeout(0) set renewNow

    await el.handleLoanAutoRenewed({
      detail: {
        action: 'renew_loan',
        data: { success: true, loan: { identifier: 'foobar', renewal: true } },
      },
    });

    // Called synchronously from handleLoanAutoRenewed, not via a
    // create_token success callback.
    expect(postInitSpy).toHaveBeenCalledOnce();
    expect(el.postInitComplete).to.be.true;
    expect(reloadImagesSpy).toHaveBeenCalled();

    await el.updateComplete;
    await aTimeout(150); // let the 100ms token-poller-restart check run

    expect(startTokenPollerSpy).toHaveBeenCalledExactlyOnceWith(true);
  });

  test('clears loanRenewInProgress and shows unavailable modal on renew_loan failure', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        user_has_browsed: true,
        browsingExpired: true,
      },
    });
    await el.updateComplete;

    const showModalSpy = vi.spyOn(el, 'showLoanUnavailableModal');

    el.autoRenewExpiredLoan();
    expect(el.loanRenewInProgress).to.be.true;

    el.handleLendingActionError({
      detail: {
        action: 'renew_loan',
        data: { error: 'book is not available' },
      },
    });

    expect(el.loanRenewInProgress).to.be.false;
    expect(showModalSpy).toHaveBeenCalledOnce();
  });
});

describe('BookReader:userAction race regression (WEBDEV-8322)', () => {
  test('does not let autoLoanRenewChecker clobber an in-flight expired-loan renewal', async () => {
    // borrowType has to already be 'browsed' before the loan is marked
    // expired, the same as in the "Expiring book cancels interval" test
    // above, because an expired render leaves borrowType untouched.
    const baseStatus = {
      is_lendable: true,
      user_has_browsed: true,
      browsingExpired: false,
    };
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: baseStatus,
    });
    await el.updateComplete;
    expect(el.borrowType).to.equal('browsed');

    el.lendingStatus = { ...baseStatus, browsingExpired: true };
    await el.updateComplete;

    const autoLoanRenewCheckerSpy = vi.spyOn(el, 'autoLoanRenewChecker');

    window.dispatchEvent(new CustomEvent('BookReader:userAction'));

    // autoRenewExpiredLoan()'s setTimeout(0) sets renewNow=true. The
    // still-live lendingStatus.browsingExpired check must not also let
    // autoLoanRenewChecker(true) run, since it reads the already-deleted
    // loanTime cache key and overwrites renewNow back to false. Give both
    // paths plenty of time to resolve.
    await aTimeout(300);

    expect(autoLoanRenewCheckerSpy).not.toHaveBeenCalled();
    expect(el.loanRenewResult.renewNow).to.be.true;
  });

  test('ignores repeated BookReader:userAction events firing in quick succession (e.g. from a scroll)', async () => {
    // A single scroll gesture can fire BookReader:userAction several times
    // in rapid succession. autoLoanRenewChecker() guards against concurrent
    // or repeated invocation, like autoRenewExpiredLoan() does, so each
    // event doesn't spin up its own LoanRenewHelper racing to overwrite
    // this.loanRenewResult and re-trigger renew_loan/create_token while a
    // prior call is still in flight or has just landed.
    const baseStatus = {
      is_lendable: true,
      user_has_browsed: true,
      browsingExpired: false,
    };
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: baseStatus,
    });
    await el.updateComplete;
    expect(el.borrowType).to.equal('browsed');

    el.loanRenewInProgress = true;

    const loanRenewHelperSpy = vi.spyOn(el, 'autoLoanRenewChecker');

    // Simulate a scroll firing the event several times back to back.
    window.dispatchEvent(new CustomEvent('BookReader:userAction'));
    window.dispatchEvent(new CustomEvent('BookReader:userAction'));
    window.dispatchEvent(new CustomEvent('BookReader:userAction'));
    await aTimeout(50);

    // The method is still called each time (the guard is inside it), but
    // must no-op instead of spinning up a new LoanRenewHelper each time.
    expect(loanRenewHelperSpy).toHaveBeenCalledTimes(3);
    expect(el.loanRenewHelper).to.be.undefined;
  });
});

describe('handleLendingActionError - loanRenewInProgress reset', () => {
  test('clears loanRenewInProgress on any renew_loan failure, not just "not available"', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: { user_has_browsed: true, browsingExpired: true },
    });
    await el.updateComplete;

    el.loanRenewInProgress = true;

    el.handleLendingActionError({
      detail: {
        action: 'renew_loan',
        data: { error: 'some other unrelated failure' },
      },
    });

    expect(el.loanRenewInProgress).to.be.false;
  });
});

describe('handleLendingActionError - every create_token failure resets the bar', () => {
  // A create_token failure can't be told apart from "the loan was actually
  // returned" (e.g. a stale loan-record cache on another node, or a genuine
  // revokeAccess() in BookReaderImages.php) from here, so initial and
  // routine interval failures are treated identically: no retry, reset to
  // Borrow/0, show the modal every time.
  for (const isInitial of [true, false]) {
    test(`shows the error modal and resets to Borrow/0 on a failed create_token (isInitial=${isInitial})`, async () => {
      const el = await create({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          user_has_browsed: true,
          browsingExpired: false,
          secondsLeftOnLoan: 100,
        },
      });
      await el.updateComplete;

      const showErrorModalSpy = vi.spyOn(el, 'showErrorModal');
      const errorMsg = 'loan token not found. please try again later.';

      el.handleLendingActionError({
        detail: {
          action: 'create_token',
          isInitial,
          data: { error: errorMsg },
        },
      });

      expect(showErrorModalSpy).toHaveBeenCalledExactlyOnceWith(
        errorMsg,
        'create_token',
      );
      expect(el.lendingStatus.user_has_browsed).to.be.false;
      expect(el.lendingStatus.available_to_browse).to.be.true;
      expect(el.lendingStatus.secondsLeftOnLoan).to.equal(0);
    });

    test(`stops the countdown/expiry timers on a failed create_token (isInitial=${isInitial})`, async () => {
      const el = await create({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          user_has_browsed: true,
          browsingExpired: false,
          secondsLeftOnLoan: 100,
        },
      });
      await el.updateComplete;
      expect(window.IALendingIntervals.timerCountdown).to.not.equal(0);
      expect(window.IALendingIntervals.browseExpireTimeout).to.not.equal(0);

      el.handleLendingActionError({
        detail: {
          action: 'create_token',
          isInitial,
          data: { error: 'loan token not found. please try again later.' },
        },
      });

      expect(window.IALendingIntervals.timerCountdown).to.equal(0);
      expect(window.IALendingIntervals.browseExpireTimeout).to.equal(0);
    });
  }

  test('shows the modal even without a specific error message', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        user_has_browsed: true,
        browsingExpired: false,
        secondsLeftOnLoan: 100,
      },
    });
    await el.updateComplete;

    const showErrorModalSpy = vi.spyOn(el, 'showErrorModal');

    el.handleLendingActionError({
      detail: { action: 'create_token', isInitial: false, data: {} },
    });

    expect(showErrorModalSpy).toHaveBeenCalledOnce();
  });

  test('still clears everything on a renew_loan failure', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        user_has_browsed: true,
        browsingExpired: false,
        secondsLeftOnLoan: 100,
      },
    });
    await el.updateComplete;
    expect(window.IALendingIntervals.timerCountdown).to.not.equal(0);

    el.handleLendingActionError({
      detail: {
        action: 'renew_loan',
        data: { error: 'some other unrelated failure' },
      },
    });

    expect(window.IALendingIntervals.timerCountdown).to.equal(0);
  });

  test('shows the same unavailable-modal-and-refresh path for any renew_loan failure, regardless of message text', async () => {
    // The server can return any message (e.g. a lending limit hit), and
    // guessing which lendingStatus fields are now accurate client-side is
    // error-prone. So every renew_loan failure shows the real error and
    // refreshes the page on dismissal (showLoanUnavailableModal's Okay
    // button), instead of patching up state without reloading from the
    // server.
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        is_lendable: true,
        user_has_browsed: true,
        browsingExpired: false,
        available_to_browse: false,
        secondsLeftOnLoan: 100,
      },
    });
    await el.updateComplete;

    const showUnavailableSpy = vi.spyOn(el, 'showLoanUnavailableModal');
    const lendingLimitMsg =
      'Your account has hit a lending limit. Please try again later or contact info@archive.org.';

    el.handleLendingActionError({
      detail: {
        action: 'renew_loan',
        data: { error: lendingLimitMsg },
      },
    });
    await el.updateComplete;

    expect(showUnavailableSpy).toHaveBeenCalledExactlyOnceWith(lendingLimitMsg);
  });

  test('updates lendingStatus immediately on a renew_loan failure: Borrow state, timer cleared', async () => {
    // The modal's Okay button refreshes the page, but that isn't the only
    // thing correcting the UI. While the modal is still open, the action
    // bar already shows Borrow instead of "Return now" with a stale
    // countdown value from before the failed renewal.
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        is_lendable: true,
        user_has_browsed: true,
        browsingExpired: false,
        available_to_browse: false,
        secondsLeftOnLoan: 100,
      },
    });
    await el.updateComplete;

    el.handleLendingActionError({
      detail: {
        action: 'renew_loan',
        data: {
          error:
            'Your account has hit a lending limit. Please try again later or contact info@archive.org.',
        },
      },
    });
    await el.updateComplete;

    expect(el.lendingStatus.user_has_browsed).to.be.false;
    expect(el.lendingStatus.available_to_browse).to.be.true;
    expect(el.lendingStatus.secondsLeftOnLoan).to.equal(0);
    expect(el.primaryActions[0].text).to.not.equal('Return now');
  });

  test('also shows the unavailable modal for the "not available" message, with its own text', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: {
        is_lendable: true,
        user_has_browsed: true,
        browsingExpired: false,
        secondsLeftOnLoan: 100,
      },
    });
    await el.updateComplete;

    const showUnavailableSpy = vi.spyOn(el, 'showLoanUnavailableModal');
    const notAvailableMsg =
      'This book is not available to borrow at this time.';

    el.handleLendingActionError({
      detail: {
        action: 'renew_loan',
        data: { error: notAvailableMsg },
      },
    });
    await el.updateComplete;

    expect(showUnavailableSpy).toHaveBeenCalledExactlyOnceWith(notAvailableMsg);
  });
});

describe('showWarningModal', () => {
  test('shows a headline, one Okay button, and an info-icon help link; Okay dismisses without renewing', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: { user_has_browsed: true, secondsLeftOnLoan: 100 },
    });
    await el.updateComplete;

    await el.showWarningModal();

    const modalManagerEl = document.body.querySelector('modal-manager')!;
    const modalTemplateEl = modalManagerEl.shadowRoot!.querySelector(
      'ia-modal-manager-template',
    )!;
    const headline =
      modalTemplateEl.shadowRoot!.querySelector('.headline')?.textContent;
    expect(headline).to.contain('Are you still there?');

    const helpLink = modalTemplateEl.shadowRoot!.querySelector(
      'a[href="https://help.archive.org/help/borrowing-from-the-lending-library"]',
    );
    expect(helpLink).to.exist;

    const buttons = modalManagerEl.shadowRoot!.querySelectorAll<HTMLElement>(
      '#book-action-bar-custom-buttons button',
    );
    expect(buttons.length).to.equal(1);
    expect(buttons[0].textContent).to.contain('Okay');

    buttons[0].click();

    expect(el.warningModalOpen).to.be.false;
    expect(el.warningModalDismissed).to.be.true;
    expect(el.loanRenewResult.renewNow).to.be.false;
  });

  test('does not reopen while already open', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'foobar',
      lendingStatus: { user_has_browsed: true, secondsLeftOnLoan: 100 },
    });
    await el.updateComplete;

    await el.showWarningModal();
    const showModalSpy = vi.spyOn(el.modal!, 'showModal');

    await el.showWarningModal();

    expect(showModalSpy).not.toHaveBeenCalled();
  });
});

describe('Shared Resize Observer', () => {
  test('can receive a Shared Resize Observer', async () => {
    const sharedObserverStub = new SharedResizeObserver();
    const addObserverSpy = vi.spyOn(sharedObserverStub, 'addObserver');
    const component = await fixture<IABookActions>(
      html` <ia-book-actions
        .userid=${'@userid'}
        .identifier=${'foo'}
        .lendingStatus=${{
          is_lendable: true,
          user_has_browsed: true,
          available_to_browse: true,
          available_to_borrow: true,
        }}
        .sharedObserver=${sharedObserverStub}
        .loaderIcon=${OFFLINE_LOADER_ICON}
      ></ia-book-actions>`,
    );
    await component.updateComplete;

    expect(addObserverSpy).toHaveBeenCalledTimes(1);
  });

  test('loads its own resize observer if it is not received', async () => {
    const component = await fixture<IABookActions>(
      html` <ia-book-actions
        .userid=${'@userid'}
        .identifier=${'foo'}
        .lendingStatus=${{
          is_lendable: true,
          user_has_browsed: true,
          available_to_browse: true,
          available_to_borrow: true,
        }}
        .loaderIcon=${OFFLINE_LOADER_ICON}
      ></ia-book-actions>`,
    );

    await component.updateComplete;
    expect(component.sharedObserver).to.not.be.undefined;
  });
});

describe('Renewal and expiry edge cases', () => {
  test('populates the action bar on a fresh load of an already-expired loan', async () => {
    // The hasExpired early return keeps auto-return from visibly changing
    // the bar. That method also runs on the FIRST lendingStatus update,
    // where there is no bar to preserve, so it populates the bar then.
    // Otherwise the patron would get a blank bar and no way to re-borrow.
    const el = await create({
      userid: '@user1',
      identifier: 'fresh-expired',
      lendingStatus: {
        is_lendable: true,
        available_to_browse: true,
        available_to_borrow: true,
        user_has_browsed: true,
        browsingExpired: true,
        secondsLeftOnLoan: 0,
      },
    });
    await el.updateComplete;

    expect(el.primaryActions.length).to.be.greaterThan(0);
    expect(el.primaryActions.map((a) => a.id)).to.include('browseBook');
  });

  test('still leaves a rendered action bar untouched when the loan auto-returns', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'auto-returned',
      lendingStatus: {
        is_lendable: true,
        available_to_browse: true,
        available_to_borrow: true,
        user_has_browsed: true,
        browsingExpired: false,
        secondsLeftOnLoan: 300,
      },
    });
    await el.updateComplete;
    expect(el.primaryActions[0].text).to.equal('Return now');

    el.lendingStatus = { ...el.lendingStatus, browsingExpired: true };
    await el.updateComplete;

    // Auto-return doesn't visibly change the bar.
    expect(el.primaryActions[0].text).to.equal('Return now');
  });

  test('does not treat a `renewal: false` response as a successful renewal', async () => {
    // A truthy `loan` with `renewal: false` isn't a renewal, so
    // handleLoanAutoRenewed doesn't take the success path. Otherwise
    // setBrowseTimeSession() never runs, the loanTime read is undefined
    // (NaN), and the fallback invents a full fresh hour, putting a new
    // countdown on screen next to the failure modal.
    const el = await create({
      userid: '@user1',
      identifier: 'not-renewed',
      lendingStatus: {
        is_lendable: true,
        available_to_browse: true,
        user_has_browsed: true,
        browsingExpired: true,
        secondsLeftOnLoan: 0,
      },
    });
    await el.updateComplete;
    el.loanRenewResult = { texts: '', renewNow: true, renewType: 'auto' };
    el.loanRenewInProgress = true;
    await el.updateComplete;

    await el.handleLoanAutoRenewed({
      detail: {
        action: 'renew_loan',
        data: { success: true, loan: { renewal: false } },
      },
    });
    await el.updateComplete;

    expect(el.lendingStatus.secondsLeftOnLoan).to.not.equal(
      el.loanRenewTimeConfig.loanTotalTime,
    );
    expect(el.loanRenewInProgress).to.be.false;
  });

  test('clears loanRenewInProgress when the renewal response carries no loan', async () => {
    // The !activeLoan branch clears loanRenewInProgress as well as
    // recoveringFromLoanExpiry. Left set, it would latch the component:
    // every later renewal attempt no-ops and neither the countdown nor the
    // token poller ever restarts.
    const el = await create({
      userid: '@user1',
      identifier: 'no-loan',
      lendingStatus: { user_has_browsed: true, browsingExpired: true },
    });
    await el.updateComplete;

    el.autoRenewExpiredLoan();
    expect(el.loanRenewInProgress).to.be.true;

    await el.handleLoanAutoRenewed({
      detail: { action: 'renew_loan', data: { success: true } },
    });

    expect(el.loanRenewInProgress).to.be.false;
    expect(el.recoveringFromLoanExpiry).to.be.false;

    // and the component is usable again, not latched
    el.autoRenewExpiredLoan();
    expect(el.loanRenewInProgress).to.be.true;
  });

  test('resets the bar and shows the modal on an interval create_token refresh failure too', async () => {
    // A routine refresh failing is treated the same as the initial one --
    // there's no reliable way to tell "harmless blip" from "the loan is
    // actually gone" from here (see handleLendingActionError).
    const el = await create({
      userid: '@user1',
      identifier: 'token-blip',
      lendingStatus: {
        is_lendable: true,
        available_to_browse: true,
        user_has_browsed: true,
        browsingExpired: false,
        secondsLeftOnLoan: 300,
      },
    });
    await el.updateComplete;
    const spy = vi.spyOn(el, 'showErrorModal');

    el.handleLendingActionError({
      detail: {
        action: 'create_token',
        isInitial: false,
        data: { error: 'loan token not found. please try again later.' },
      },
    });
    await el.updateComplete;

    expect(spy).toHaveBeenCalledOnce();
    expect(el.lendingStatus.user_has_browsed).to.be.false;
  });

  test('tears down the previous poller before starting a new one', async () => {
    // startLoanTokenPoller() cancels the old instance's pending timers
    // before replacing this.tokenPoller, so they can't fire against stale
    // state.
    const el = await create({
      userid: '@user1',
      identifier: 'poller-teardown',
      lendingStatus: {
        is_lendable: true,
        available_to_browse: true,
        user_has_browsed: true,
        browsingExpired: false,
        secondsLeftOnLoan: 300,
      },
    });
    await el.updateComplete;

    el.startLoanTokenPoller();
    const firstPoller = el.tokenPoller;
    const disconnectSpy = vi.spyOn(firstPoller!, 'disconnectedCallback');

    el.startLoanTokenPoller();

    expect(disconnectSpy).toHaveBeenCalledOnce();
    expect(el.tokenPoller).to.not.equal(firstPoller);
  });

  test('never restarts the poller on a create_token failure, no retry', async () => {
    const el = await create({
      userid: '@user1',
      identifier: 'token-exhausted',
      lendingStatus: {
        is_lendable: true,
        available_to_browse: true,
        user_has_browsed: true,
        browsingExpired: false,
        secondsLeftOnLoan: 300,
      },
    });
    await el.updateComplete;

    const startSpy = vi.spyOn(el, 'startLoanTokenPoller');

    el.handleLendingActionError({
      detail: {
        action: 'create_token',
        isInitial: true,
        data: { error: 'loan token not found. please try again later.' },
      },
    });

    expect(startSpy).not.toHaveBeenCalled();
  });
});
