import { LitElement } from 'lit';
import type { LocalCacheInterface } from '@internetarchive/local-cache';

import { URLHelper } from '../../config/url-helper';
import { sentryLogs } from '../../config/sentry-events';
import log from '../log';

import ActionsHandlerService from './actions-handler-service';
import LoanAnanlytics from '../loan-analytics';
import {
  analyticsCategories,
  analyticsActions,
  analyticsLabels,
} from '../../config/analytics-event-and-category';
import * as Cookies from '../doc-cookies';
import type {
  ActionClickDetail,
  AutoRenewDetail,
  LoanServiceResponse,
  ReturnNowDetail,
} from '../../../models';
import '../../../globals';

/**
 * These are callback functions calling from actions-config.ts file.
 *
 * ActionsHandlerService is a function being used to execute APIs based of the request made by user.
 *
 */

export default class ActionsHandler extends LitElement {
  /** The item being borrowed. Elements that extend this declare it as a property. */
  declare identifier: string;

  /** Where to go after a loan is returned. Elements that extend this declare it as a property. */
  declare returnUrl: string;

  /** Total seconds of a one-hour loan. Set by the parent element. */
  declare loanTotalTime: number;

  /** Where the loan and page-change times are kept. Set by the parent element. */
  declare localCache: LocalCacheInterface;

  /**
   * wait untill borrow is complete, then refresh the page, in seconds
   */
  waitUntillBorrowComplete = 6;

  /**
   * bind events for lending bar
   */
  loanAnanlytics = new LoanAnanlytics();

  constructor() {
    super();

    this.bindEvents();
  }

  private listen<T = undefined>(
    name: string,
    handler: (event: CustomEvent<T>) => void,
  ): void {
    this.addEventListener(name, handler as EventListener);
  }

  bindEvents(): void {
    this.listen('browseBook', async () => {
      this.handleBrowseIt();
      await this.loanAnanlytics?.storeLoanStatsCount(this.identifier, 'browse');
    });

    this.listen('browseBookAgain', async () => {
      this.handleBrowseIt();
      await this.loanAnanlytics?.storeLoanStatsCount(
        this.identifier,
        'browseagain',
      );
    });

    this.listen<AutoRenewDetail | undefined>('autoRenew', ({ detail }) => {
      this.handleLoanRenewNow(detail?.renewType);
    });

    this.listen('autoReturn', async () => {
      this.handleReturnIt();
      await this.loanAnanlytics?.storeLoanStatsCount(
        this.identifier,
        'autoreturn',
      );

      this.loanAnanlytics?.sendEvent(
        analyticsCategories.browse,
        analyticsActions.browseReturn,
        analyticsLabels.browseAutoReturn,
        this.identifier,
      );
    });

    this.listen<ReturnNowDetail | undefined>('returnNow', ({ detail }) => {
      // use loan stats count when 1-hour borrow is active
      if (detail?.borrowType === 'browse') {
        this.loanAnanlytics?.storeLoanStatsCount(this.identifier, 'return');

        this.loanAnanlytics?.sendEvent(
          analyticsCategories.browse,
          analyticsActions.browseReturn,
          analyticsLabels.browseManualReturn,
          this.identifier,
        );
      }

      this.handleReturnIt('returnNow');

      // send these events if 14-day borrow return
      if (detail?.borrowType === 'borrow') {
        const { category, action } = detail.event as ActionClickDetail['event'];
        this.loanAnanlytics?.sendEvent(category, action, this.identifier);
      }
    });

    this.listen<ActionClickDetail>('borrowBook', ({ detail }) => {
      this.handleBorrowIt();
      const { category, action } = detail.event;
      this.loanAnanlytics?.sendEvent(category, action, this.identifier);
    });

    this.listen<ActionClickDetail>('loginAndBorrow', ({ detail }) => {
      this.handleLoginOk();
      const { category, action } = detail.event;
      this.loanAnanlytics?.sendEvent(category, action, this.identifier);
    });

    this.listen<ActionClickDetail>('leaveWaitlist', ({ detail }) => {
      this.handleRemoveFromWaitingList();
      const { category, action } = detail.event;
      this.loanAnanlytics?.sendEvent(category, action, this.identifier);
    });

    this.listen<ActionClickDetail>('joinWaitlist', ({ detail }) => {
      this.handleReserveIt();
      const { category, action } = detail.event;
      this.loanAnanlytics?.sendEvent(category, action, this.identifier);
    });

    this.listen<ActionClickDetail>('purchaseBook', ({ detail }) => {
      const { category, action } = detail.event;
      this.loanAnanlytics?.sendEvent(category, action, this.identifier);
    });

    this.listen<ActionClickDetail>('adminAccess', ({ detail }) => {
      const { category, action } = detail.event;
      this.loanAnanlytics?.sendEvent(category, action, this.identifier);

      this.setStickyAdminAccess(true);

      // keep existing params and add new one
      const url = new URL(window.location.href);
      url.searchParams.append('admin', '1');
      window.location.search = url.search;
    });

    this.listen<ActionClickDetail>('exitAdminAccess', ({ detail }) => {
      const { category, action } = detail.event;
      this.loanAnanlytics?.sendEvent(category, action, this.identifier);

      this.setStickyAdminAccess(false);
    });

    this.listen<ActionClickDetail>('bookTitleBar', ({ detail }) => {
      const { category, action } = detail.event;
      this.loanAnanlytics?.sendEvent(category, action, this.identifier);
    });
  }

  handleBrowseIt(): void {
    const action = 'browse_book';
    this.dispatchToggleActionGroup();

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: () => {
        this.setBrowseTimeSession();
        this.handleReadItNow();
      },
      error: (data) => {
        this.dispatchActionError(action, data);
      },
    });
  }

  handleLoanRenewNow(renewType?: string): void {
    const action = 'renew_loan';

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: async (data) => {
        // Anything thrown in here is an unhandled rejection that dispatches
        // NOTHING, and IABookActions only clears loanRenewInProgress when
        // one of these two events arrives, so a throw here would latch it on
        // permanently (dead countdown, loan stuck "active"). Always exit
        // through exactly one of the two dispatches below.
        try {
          log('RENEW_LOAN --- ', data, this.identifier);
          const activeLoan = data.loan ? data.loan : undefined;
          // Optional chaining: `data.loan` is genuinely absent on some
          // failures, and `activeLoan` can be undefined here.
          const isRenewal = activeLoan?.renewal;

          if (activeLoan && isRenewal) {
            // Await: loanAutoRenewed listeners read this same cache key
            // immediately, so the write has to land before the dispatch.
            await this.setBrowseTimeSession();

            // Only record the renew analytics event once the renewal has
            // actually succeeded, not merely attempted.
            await this.loanAnanlytics?.storeLoanStatsCount(
              this.identifier,
              'autorenew',
            );
            const analyticsLabel =
              renewType === 'auto'
                ? analyticsLabels.browseAutoRenew
                : analyticsLabels.browseManualRenew;
            this.loanAnanlytics?.sendEvent(
              analyticsCategories.browse,
              analyticsActions.browseRenew,
              analyticsLabel,
              this.identifier,
            );

            // Dispatch the success outcome ONLY for a confirmed renewal.
            // A `{loan: {renewal: false}}` response goes through
            // dispatchActionError below instead, never both.
            this.dispatchEvent(
              new CustomEvent('loanAutoRenewed', {
                detail: { action, data: { ...data, loan: activeLoan } },
              }),
            );
            return;
          }

          log('RENEW_LOAN ERROR --- ', {
            action,
            isRenewal,
            activeLoan,
            data,
            id: this.identifier,
          });
          window?.Sentry?.captureMessage(
            `${sentryLogs.bookRenewFailed} - Error: ${JSON.stringify(data)}`,
          );
          this.dispatchActionError(action, {
            data,
            error: true,
            message: 'Loan renewal failed: no loan active.',
          });
        } catch (error) {
          log('RENEW_LOAN THREW --- ', error);
          window?.Sentry?.captureException(
            `${sentryLogs.bookRenewFailed} - Exception: ${error}`,
          );
          this.dispatchActionError(action, {
            data,
            error: true,
            message: `Loan renewal failed: ${error}`,
          });
        }
      },
      error: (data) => {
        this.dispatchActionError(action, data);
      },
    });
  }

  /**
   * excute function when loan is returning
   *
   * @param type loan return type returnNow|''
   */
  handleReturnIt(type = ''): void {
    const action = 'return_loan';

    if (type === 'returnNow') this.dispatchToggleActionGroup();

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: () => {
        this.deleteLoanCookies();

        if (type === 'returnNow') URLHelper.goToUrl(this.returnUrl, true);
      },
      error: (data) => {
        this.dispatchActionError(action, data);
      },
    });
  }

  handleBorrowIt(): void {
    const action = 'borrow_book';
    this.dispatchToggleActionGroup();

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: () => {
        this.handleReadItNow();
      },
      error: (data) => {
        this.dispatchActionError(action, data);
      },
    });
  }

  handleReserveIt(): void {
    const action = 'join_waitlist';
    this.dispatchToggleActionGroup();

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: () => {
        URLHelper.goToUrl(URLHelper.getRedirectUrl(), true);
      },
      error: (data) => {
        this.dispatchActionError(action, data);
      },
    });
  }

  handleRemoveFromWaitingList(): void {
    const action = 'leave_waitlist';
    this.dispatchToggleActionGroup();

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: () => {
        URLHelper.goToUrl(URLHelper.getRedirectUrl(), true);
      },
      error: (data) => {
        this.dispatchActionError(action, data);
      },
    });
  }

  /**
   * Dispatches event when an error occured on action
   * Notes:- toggle <ia-book-actions-collapsible-action-group> visibility (enable/disable).
   *
   * @param action name of action like browse_book, borrow_book
   * @param data erroneous response from api call
   *
   * @fires ActionsHandler#lendingActionError
   */
  dispatchActionError(action: string, data: LoanServiceResponse = {}): void {
    // send LendingServiceError to GA
    this.loanAnanlytics?.sendEvent('LendingServiceError', action);

    this.dispatchEvent(
      new CustomEvent('lendingActionError', {
        detail: { action, data },
      }),
    );
  }

  /**
   * Dispatches event when patron is clicked on action buttons.
   * Notes:- toggle <ia-book-actions-collapsible-action-group> disable/enable.
   *
   * @fires ActionsHandler#toggleActionGroup
   */
  dispatchToggleActionGroup(): void {
    this.dispatchEvent(new CustomEvent('toggleActionGroup'));
  }

  handleLoginOk(): void {
    const target = `/account/login?referer=${encodeURIComponent(
      URLHelper.getRedirectUrl(),
    )}`;
    URLHelper.goToUrl(target, true);
  }

  handleReadItNow(extraParam?: string | Record<string, string>): void {
    const currentParams = new URLSearchParams(window.location.search);

    if (extraParam) {
      // append extraParam key-value in currentParams
      const extraParams = new URLSearchParams(extraParam);
      for (const [key, val] of extraParams.entries()) {
        currentParams.append(key, val);
      }
    }

    const convertedToString = currentParams.toString();
    const newParams = convertedToString ? `?${convertedToString}` : '';

    // get current URL and add query parameters including search
    const redirectTo =
      window.location.origin + window.location.pathname + newParams;

    // redirection on details page after 5 seconds because borrowing book takes time to create item creation.
    setTimeout(() => {
      URLHelper.goToUrl(redirectTo, true);
    }, this.waitUntillBorrowComplete * 1000);
  }

  /**
   * set browse time in indexedDB
   */
  async setBrowseTimeSession(): Promise<void> {
    // TODO: USE loan info to determine what we have left
    try {
      const expireDate = new Date(
        new Date().getTime() + this.loanTotalTime * 1000,
      );

      log('[ActionsHandler] setBrowseTimeSession: resetting loanTime', {
        identifier: this.identifier,
        expireDate,
        loanTotalTime: this.loanTotalTime,
      });

      // set a value
      await this.localCache.set({
        key: `${this.identifier}-loanTime`,
        value: expireDate,
        ttl: Number(this.loanTotalTime),
      });

      // delete pageChangedTime when book is auto renew at nth minute
      await this.localCache.delete(`${this.identifier}-pageChangedTime`);

      log('[ActionsHandler] setBrowseTimeSession: loanTime reset complete', {
        identifier: this.identifier,
      });
    } catch (error) {
      log('[ActionsHandler] setBrowseTimeSession failed', error);
    }
  }

  deleteLoanCookies(): void {
    log('[ActionsHandler] deleteLoanCookies: expiring loan cookies', {
      identifier: this.identifier,
    });

    const date = new Date();
    date.setTime(date.getTime() - 24 * 60 * 60 * 1000); // one day ago

    Cookies.setItem(
      `loan-${this.identifier}=""`,
      '',
      date,
      '/',
      '.archive.org',
    );
    Cookies.setItem(
      `br-loan-${this.identifier}=""`,
      '',
      date,
      '/',
      '.archive.org',
    );
  }

  /**
   * Set sticky admin access on or off.
   * @see WEBDEV-6835
   *
   * @param value Whether to enable or disable sticky admin access.
   */
  setStickyAdminAccess(value: boolean): void {
    const domain =
      window.location.hostname === 'localhost' ? 'localhost' : '.archive.org';
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
    Cookies.setItem('sticky-admin-access', value, expires, '/', domain);
  }
}
