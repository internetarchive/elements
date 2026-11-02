/**
 * sentry logs/messages we send for different actions....
 */
export const sentryLogs = {
  disconnectedCallback: 'IABookActions:disconnectedCallback',
  bookHasRenewed:
    'IABookActions:handleLoanAutoRenewed - book has renewed for next one hour',
  bookRenewFailed: 'IABookActions:handleLoanRenewNow - failed to renew',
  browseHasExpired:
    'IABookActions:browseHasExpired - one-hour loan has been expired',
  bookWasExpired:
    'IABookActions:setupLendingToolbarActions - book was expired at intial, no tokenPoller',
  clearTokenPoller:
    'IABookActions:startLoanTokenPoller - clearing token poller interval',
  clearOneHourTimer:
    'IABookActions:timerCountdown - one-hour timer interval cleared',
  bookAccessed: 'IABookActions:bookAccessed',
  handleLoanTokenPoller: 'IABookActions:handleLoanTokenPoller',
  setConsecutiveLoanCounts: 'IABookActions:setConsecutiveLoanCounts',
  actionsHandlerService: 'IABookActions:actionsHandlerService',
} as const;
