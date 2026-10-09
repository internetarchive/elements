/**
 * What the lending service reports about an item for the current patron, as
 * assembled by archive.org. The action bar reads the fields below; the
 * service sends more than that, so unlisted fields are allowed.
 */
export interface LendingStatus {
  active_borrows?: number;
  active_browses?: number;
  available_borrowable_copies?: number;
  available_browsable_copies?: number;
  available_lendable_copies?: number;
  available_to_borrow?: boolean;
  available_to_browse?: boolean;
  available_to_waitlist?: boolean;
  copies_reserved_for_waitlist?: number;
  is_lendable?: boolean;
  is_login_required?: boolean;
  is_printdisabled?: boolean;
  is_readable?: boolean;
  last_borrow?: string | null;
  last_browse?: string | null;
  last_waitlist?: string | null;
  max_borrowable_copies?: number;
  max_browsable_copies?: number;
  max_lendable_copies?: number;
  next_borrow_expiration?: string | null;
  next_browse_expiration?: string | null;
  orphaned_acs_loans?: number;
  upgradable_browses?: number;
  user_at_max_loans?: boolean;
  user_can_claim_waitlist?: boolean;
  user_has_acs_borrowed?: boolean;
  user_has_borrowed?: boolean;
  user_has_browsed?: boolean;
  user_is_printdisabled?: boolean;
  user_loan_count?: number;
  user_loan_record?: unknown;
  user_on_waitlist?: boolean;
  users_on_waitlist?: number;
  bookUrl?: string;
  browsingExpired?: boolean;
  daysLeftOnLoan?: number;
  isAdmin?: boolean;
  isArchiveOrgLending?: boolean;
  isAvailable?: boolean;
  isAvailableForBrowsing?: boolean;
  isBrowserBorrowable?: boolean;
  isLendingRequired?: boolean;
  isOpenLibraryLending?: boolean;
  isPrintDisabledOnly?: boolean;
  loanCount?: number;
  loanId?: string;
  loanRecord?: unknown;
  loanStartDate?: string;
  loansUrl?: string;
  maxLoans?: number;
  secondsLeftOnLoan?: number;
  shouldProtectImages?: boolean;
  totalWaitlistCount?: number;
  userHasBorrowed?: boolean;
  userHasBrowsed?: boolean;
  userHoldIsReady?: boolean;
  userIsPrintDisabled?: boolean;
  userOnWaitingList?: boolean;
  userWaitlistPosition?: number;
  userid?: string;
  [field: string]: unknown;
}

/**
 * What kind of loan the patron has: a one-hour loan (`browsed`), a 14-day
 * loan (`borrowed`) or admin or print-disabled access (`adminBorrowed`).
 */
export type BorrowType = 'browsed' | 'borrowed' | 'adminBorrowed';

/** Google Analytics category and action for a click on an action. */
export interface AnalyticsEvent {
  category: string;
  action: string;
}

/**
 * Configuration for one button or link in the action bar.
 *
 * `borrowType` here is the loan kind a button acts on (`browse` or `borrow`),
 * which is why it differs from {@link BorrowType}.
 */
export interface ActionConfig {
  id: string;
  text: string;
  className: string;
  title?: string;
  subText?: string;
  url?: string;
  target?: string;
  disabled?: boolean;
  borrowType?: 'browse' | 'borrow';
  analyticsEvent: AnalyticsEvent;
}

/** The action bar for the current lending status. */
export interface LendingActions {
  primaryTitle: string;
  primaryActions: (ActionConfig | null)[];
  primaryColor?: string;
  secondaryActions: (ActionConfig | null)[];
  footer?: string;
  borrowType?: BorrowType;
}

/** The action bar shown for an embed. */
export interface EmbedActions {
  primaryTitle: string;
  primaryActions: ActionConfig[];
  primaryColor: string;
}

/**
 * Time configuration for the one-hour loan auto-renew, in seconds.
 */
export interface LoanRenewTimeConfig {
  /** total seconds a loan does have */
  loanTotalTime: number;
  /** check for loan renew at last */
  loanRenewAtLast: number;
  /** consider loan renew eligible if viewed new page */
  pageChangedInLast: number;
}

/**
 * Outcome of the one-hour loan auto-renew check.
 */
export interface LoanRenewResult {
  /** texts messages shows in modal */
  texts: string | null;
  /** key to determine if need to renew now */
  renewNow: boolean;
  /** seconds left in active loan */
  secondsLeft?: number;
  /** `auto` when the renewal needs no patron action */
  renewType?: string;
}

/** Counts of loan events kept in a cookie and reported to analytics. */
export interface LoanEventCounts {
  browse: number;
  renew: number;
  expire: number;
}

/**
 * A response from the lending service, or the error the actions handler
 * builds in its place.
 */
export interface LoanServiceResponse {
  success?: boolean;
  /** An error message, or `true` when the details are in `message`. */
  error?: string | boolean;
  message?: string;
  loan?: { renewal?: boolean; [field: string]: unknown };
  [field: string]: unknown;
}

/** Detail of the `lendingActionError` event. */
export interface LendingActionErrorDetail {
  action: string;
  data: LoanServiceResponse;
  /** Set by the loan token poller for the first `create_token` call. */
  isInitial?: boolean;
}

/** Detail of the `loanAutoRenewed` event. */
export interface LoanAutoRenewedDetail {
  action: string;
  data: LoanServiceResponse;
}

/** Detail of the events a click on an action dispatches. */
export interface ActionClickDetail {
  event: AnalyticsEvent;
  borrowType?: string;
}

/** Detail of the `autoRenew` event. */
export interface AutoRenewDetail {
  renewType?: string;
}

/** Detail of the `returnNow` event. */
export interface ReturnNowDetail {
  borrowType?: string;
  event?: AnalyticsEvent;
}

/**
 * What `handleLendingActionError` reads from an error event. The loan token
 * poller passes a plain object of this shape rather than a real event.
 */
export interface LendingActionErrorEventLike {
  detail?: Partial<LendingActionErrorDetail>;
}

/**
 * What `handleLoanAutoRenewed` reads from the `loanAutoRenewed` event.
 */
export interface LoanAutoRenewedEventLike {
  detail?: Partial<LoanAutoRenewedDetail>;
}
