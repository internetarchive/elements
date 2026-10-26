import type { FetchHandlerInterface } from '@src/services/fetch-handler/fetch-handler-interface';
import ActionsHandlerService from './actions-handler/actions-handler-service';
import LoanAnanlytics from './loan-analytics';
import { sentryLogs } from '../config/sentry-events';
import { createLogger } from './logger';
import { sentryCaptureMessage } from './sentry-report';
import type {
  BorrowType,
  LendingActionErrorEventLike,
  LoanServiceResponse,
} from '../../models';
import '../../globals';

const log = createLogger('poller');

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
  /** makes the `create_token` requests. */
  fetchHandler?: FetchHandlerInterface;
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

  fetchHandler?: FetchHandlerInterface;

  /**
   * create_token failures in a row since the last success, passed to
   * errorCallback so the consumer can tell a one-off blip from a run of
   * them. See IABookActions.handleLendingActionError.
   */
  consecutiveFailures = 0;

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
      fetchHandler,
    } = options;

    this.identifier = identifier;
    this.borrowType = borrowType;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
    this.pollerDelay = pollerDelay;
    this.skipInitialCall = skipInitialCall === true;
    this.fetchHandler = fetchHandler;

    this.bookAccessed();
  }

  disconnectedCallback(): void {
    window?.IALendingIntervals?.clearTokenPoller();
  }

  async bookAccessed(): Promise<void> {
    if (this.borrowType) {
      if (this.skipInitialCall) {
        log.debug(
          'skipping initial create_token — already minted by the renewal response',
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
      sentryCaptureMessage(`${sentryLogs.bookAccessed} - not borrowed`, {
        identifier: this.identifier,
        action: 'create_token',
      });

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
    log.debug('create_token requested', {
      identifier: this.identifier,
      isInitial,
    });
    ActionsHandlerService({
      identifier: this.identifier,
      action,
      fetchHandler: this.fetchHandler,
      error: (data) => this.handleTokenError(data, isInitial),
      success: () => {
        log.debug('create_token succeeded', {
          identifier: this.identifier,
          isInitial,
        });
        this.consecutiveFailures = 0;
        if (isInitial) this.successCallback();
      },
    });
  }

  /**
   * Reports every create_token failure via errorCallback. The poller never
   * retries, and the consumer decides whether a failure is terminal (see
   * IABookActions.handleLendingActionError). Split out from
   * handleLoanTokenPoller so it's directly testable without needing to
   * mock the network call.
   *
   * @param data the error payload from ActionsHandlerService.
   * @param isInitial
   */
  handleTokenError(data: LoanServiceResponse, isInitial: boolean): void {
    const action = 'create_token';
    this.consecutiveFailures += 1;
    const { consecutiveFailures } = this;

    log.warn('create_token failed', {
      identifier: this.identifier,
      isInitial,
      consecutiveFailures,
      error: data?.error,
    });

    // isInitial and consecutiveFailures ride along so the consumer can
    // distinguish "the book won't open at all" from "a mid-read refresh
    // blipped", and a one-off blip from a run of them. See
    // IABookActions.handleLendingActionError.
    this.errorCallback({
      detail: { action, data, isInitial, consecutiveFailures },
    });

    // send error to Sentry
    sentryCaptureMessage(
      `${sentryLogs.handleLoanTokenPoller} - create_token failed`,
      {
        identifier: this.identifier,
        action,
        extra: {
          borrowType: this.borrowType,
          isInitial,
          consecutiveFailures,
          error: data?.error,
          status: data?.status,
          nonJsonResponse: data?.nonJsonResponse === true,
          response: JSON.stringify(data),
        },
      },
    );

    // send LendingServiceError to GA
    this.loanAnalytics?.sendEvent(
      'LendingServiceLoanError',
      action,
      this.identifier,
    );
  }
}
