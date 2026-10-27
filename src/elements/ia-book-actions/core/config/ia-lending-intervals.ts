import '../../globals';

/**
 * Collection of methods for managing intervals for lending system
 *
 * There are mainly two intervals being used
 * - tokenPoller :- used to create_token for borrowed book
 * - timerCountdown :- reponsible for loan-auto-renew and auto returned warning message
 *
 * @see IABookActions::startTimerCountdown
 * @see LoanTokenPoller::bookAccessed function
 */
window.IALendingIntervals = {
  /**
   * store loan token poller interval
   * @see LoanTokenPoller::bookAccessed
   */
  tokenPoller: 0,

  /**
   * renewal check interval
   */
  timerCountdown: 0,

  /** expiration timer */
  browseExpireTimeout: 0,

  /**
   * clear interval for create_token api
   */
  clearTokenPoller: () => {
    window.clearInterval(window.IALendingIntervals.tokenPoller);
    window.IALendingIntervals.tokenPoller = 0;
  },

  /**
   * clear interval for graphic timer for one-hour loan renew
   */
  clearTimerCountdown: () => {
    window.clearInterval(window.IALendingIntervals.timerCountdown);
    window.IALendingIntervals.timerCountdown = 0;
  },

  /**
   * clear the timeout that expires a one-hour loan
   */
  clearBrowseExpireTimeout: () => {
    window.clearTimeout(window.IALendingIntervals.browseExpireTimeout);
    window.IALendingIntervals.browseExpireTimeout = 0;
  },

  /**
   * clear all intervals being used acros lending system
   */
  clearAll: () => {
    window?.IALendingIntervals?.clearTokenPoller();
    window?.IALendingIntervals?.clearTimerCountdown();
    window?.IALendingIntervals?.clearBrowseExpireTimeout();
  },
};
