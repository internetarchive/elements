/**
 * Window properties that archive.org's page scripts (Sentry, analytics) and
 * this element's own `ia-lending-intervals` module put on `window`.
 */

export interface IALendingIntervalsInterface {
  /** loan token poller interval */
  tokenPoller: ReturnType<typeof setInterval> | 0;
  /** renewal check interval */
  timerCountdown: ReturnType<typeof setInterval> | 0;
  /** expiration timer */
  browseExpireTimeout: ReturnType<typeof setTimeout> | 0;
  clearTokenPoller: () => void;
  clearTimerCountdown: () => void;
  clearBrowseExpireTimeout: () => void;
  clearAll: () => void;
}

/** The capture context this element hands to Sentry. */
export interface SentryContext {
  tags: Record<string, string>;
  extra: Record<string, unknown>;
}

/** The part of the Sentry browser SDK global that is used here. */
export interface SentryGlobal {
  captureMessage: (message: string, context?: SentryContext) => unknown;
  captureException: (exception: unknown, context?: SentryContext) => unknown;
}

/** The part of archive.org's analytics global that is used here. */
export interface ArchiveAnalyticsGlobal {
  send_event_no_sampling: (
    category: string,
    action: unknown,
    label?: string,
    extraParams?: unknown,
  ) => void;
}

declare global {
  interface Window {
    IALendingIntervals: IALendingIntervalsInterface;
    Sentry?: SentryGlobal;
    archive_analytics?: ArchiveAnalyticsGlobal;
  }
}
