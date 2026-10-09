import ActionsHandlerService from './actions-handler/actions-handler-service';
import LoanAnanlytics from './loan-analytics';
import { sentryLogs } from '../config/sentry-events';
import log from './log';
import type {
  BorrowType,
  LendingActionErrorEventLike,
  LoanServiceResponse,
} from '../../models';
import '../../globals';

export interface LoanTokenPollerOptions {
  identifier: string;
  borrowType: BorrowType | null;
  /** called after the initial loan token is created. */
  successCallback: () => void;
  /**
   * called on any create_token failure (initial or a routine interval tick).
   */
  errorCallback: (event: LendingActionErrorEventLike) => void;
  /** interval between routine create_token checks, in seconds. */
  pollerDelay: number;
  /**
   * skip the immediate create_token call, only start the recurring
   * interval. Used after a loan-expiry recovery renewal, where
   * BookLoanService::attempt_to_renew_loan() already minted a valid access
   * token as part of the renew_loan response itself, so an immediate
   * confirming create_token call is redundant.
   */
  skipInitialCall?: boolean;
}

/**
 * This class is used to create loan token for borrowed books
 *
 * ActionsHandlerService is a function being used to execute
 */
export class LoanTokenPoller {
  identifier: string;

  borrowType: BorrowType | null;

  successCallback: () => void;

  errorCallback: (event: LendingActionErrorEventLike) => void;

  /** value in seconds */
  pollerDelay: number;

  skipInitialCall: boolean;

  loanTokenInterval?: ReturnType<typeof setInterval>;

  /**
   * loan analytics instance
   * @see loan-analytics.ts
   */
  loanAnalytics = new LoanAnanlytics();

  constructor(options: LoanTokenPollerOptions) {
    const {
      identifier,
      borrowType,
      successCallback,
      errorCallback,
      pollerDelay,
      skipInitialCall = false,
    } = options;

    this.identifier = identifier;
    this.borrowType = borrowType;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
    this.pollerDelay = pollerDelay;
    this.skipInitialCall = skipInitialCall === true;

    this.bookAccessed();
  }

  disconnectedCallback(): void {
    window?.IALendingIntervals?.clearTokenPoller();
  }

  async bookAccessed(): Promise<void> {
    if (this.borrowType) {
      if (this.skipInitialCall) {
        log(
          '[LoanTokenPoller] skipping initial create_token — already minted by the renewal response',
          {
            identifier: this.identifier,
          },
        );
      } else {
        // Do an initial token, then set an interval
        this.handleLoanTokenPoller(true);
      }

      // if this.borrowType = adminBorrowed,
      // - we don't want to fetch token on interval
      // - the initial token is enough to set cookies for reading book and readaloud features
      if (this.borrowType !== 'adminBorrowed') {
        /**
         * set interval in window object
         * @see ia-lending-intervals.ts
         */
        window.IALendingIntervals.tokenPoller = setInterval(() => {
          this.handleLoanTokenPoller();
        }, this.pollerDelay * 1000);
      }
    } else {
      window?.Sentry?.captureMessage(
        `${sentryLogs.bookAccessed} - not borrowed`,
      );

      // if book is not browsed, just clear token polling interval
      this.disconnectedCallback();
    }
  }

  /**
   * @param isInitial the first create_token call right after
   *   bookAccessed()/a renewal, as opposed to a routine interval tick.
   */
  async handleLoanTokenPoller(isInitial = false): Promise<void> {
    const action = 'create_token';
    log('[LoanTokenPoller] create_token requested', {
      identifier: this.identifier,
      isInitial,
    });
    ActionsHandlerService({
      identifier: this.identifier,
      action,
      error: (data) => this.handleTokenError(data, isInitial),
      success: () => {
        log('[LoanTokenPoller] create_token succeeded', {
          identifier: this.identifier,
          isInitial,
        });
        if (isInitial) this.successCallback();
      },
    });
  }

  /**
   * Reports a create_token failure via errorCallback. There is no retry, it's
   * treated as terminal on the first failure. Split out from
   * handleLoanTokenPoller so it's directly testable without needing to
   * mock the network call.
   *
   * @param data the error payload from ActionsHandlerService.
   * @param isInitial
   */
  handleTokenError(data: LoanServiceResponse, isInitial: boolean): void {
    const action = 'create_token';

    log('[LoanTokenPoller] create_token failed', {
      identifier: this.identifier,
      isInitial,
      error: data?.error,
    });

    // isInitial rides along so the consumer can distinguish "the book won't
    // open at all" from "a mid-read refresh blipped". See
    // IABookActions.handleLendingActionError.
    this.errorCallback({ detail: { action, data, isInitial } });

    // send error to Sentry
    window?.Sentry?.captureMessage(
      `${sentryLogs.handleLoanTokenPoller} - Error: ${JSON.stringify(data)}`,
    );

    // send LendingServiceError to GA
    this.loanAnalytics?.sendEvent(
      'LendingServiceLoanError',
      action,
      this.identifier,
    );
  }
}
