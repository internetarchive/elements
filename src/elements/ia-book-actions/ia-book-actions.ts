import {
  css,
  html,
  LitElement,
  nothing,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { property } from 'lit/decorators.js';
import { msg } from '@lit/localize';
import { customElement } from '@src/util/custom-element';

import {
  SharedResizeObserver,
  type SharedResizeObserverResizeHandlerInterface,
} from '@internetarchive/shared-resize-observer';
import { LocalCache } from '@internetarchive/local-cache';

import '../modal-manager/modal-manager';
import { ModalConfig } from '../modal-manager/modal-config';

import './ia-book-actions-collapsible-action-group';
import './ia-book-actions-title-bar';
import './ia-book-actions-text-group';
import './ia-book-actions-info-icon';
import './ia-book-actions-timer-countdown';
import type { IABookActionsTimerCountdown } from './ia-book-actions-timer-countdown';
import './core/config/ia-lending-intervals';

import { GetLendingActions } from './core/services/get-lending-actions';
import { mobileContainerWidth } from './core/config/constants';
import { sentryLogs } from './core/config/sentry-events';
import { LoanTokenPoller } from './core/services/loan-token-poller';
import { LoanRenewHelper } from './core/services/loan-renew-helper';
import log from './core/services/log';
import { URLHelper } from './core/config/url-helper';
import { infoIcon } from './assets/data/info-icon';
import type {
  ActionConfig,
  BorrowType,
  LendingActionErrorEventLike,
  LendingStatus,
  LoanAutoRenewedEventLike,
  LoanRenewResult,
  LoanRenewTimeConfig,
} from './models';
import './globals';

export const events = {
  browseExpired: 'IABookReader:BrowsingHasExpired',
} as const;

/**
 * custom styling for modal-manager buttons
 * TODO: lets allow modal-manager to know ia-button classes
 */
export const modalButtonStyle = {
  iaButton:
    'min-height:3.5rem;cursor:pointer;color:white;border-radius:0.4rem;border:1px solid #c5d1df;padding:4px 8px;width:auto;user-select:none;',
  renew: 'background:#194880;width:110px;',
  return: 'background:#d9534f;width:120px;',
  loaderIcon:
    'display:inline-block;width:20px;height:20px;margin-top:2px;color:white;--activityIndicatorLoadingRingColor:#fff;--activityIndicatorLoadingDotColor:#fff;',
  refresh:
    'background:none;font-size:inherit;border:0;padding:0;color:#0000ee;cursor:pointer;text-decoration:underline',
} as const;

/** Seconds from now until `loanTime`, or NaN when there is no loan time. */
function secondsUntil(loanTime: unknown): number {
  return Math.round((Number(loanTime) - Date.now()) / 1000);
}

@customElement('ia-book-actions')
export class IABookActions
  extends LitElement
  implements SharedResizeObserverResizeHandlerInterface
{
  @property({ type: String }) userid = '';

  @property({ type: String }) identifier = '';

  @property({ type: String }) bookTitle = '';

  @property({ type: String }) returnUrl = '';

  /** very important as components feed from this */
  @property({ type: Object }) lendingStatus: LendingStatus = {};

  @property({ type: Number }) width = 0;

  @property({ type: String }) bwbPurchaseUrl = '';

  @property({ attribute: false }) lendingBarPostInit: () => void = () => {};

  @property({ attribute: false }) reloadPageImages: () => void = () => {};

  /** 'title'|'action' */
  @property({ type: String }) barType: 'title' | 'action' = 'action';

  @property({ attribute: false }) sharedObserver?: SharedResizeObserver;

  @property({ type: Boolean }) disableActionGroup = false;

  /** seconds between create_token calls */
  @property({ type: Number }) tokenDelay = 120;

  @property({ type: Number }) timerExecutionSeconds = 30;

  /** The image shown while an action is in progress. */
  @property({ type: String }) loaderIcon =
    'https://archive.org/upload/images/tree/loading.gif';

  /** Created in `firstUpdated`, used for auto-loan-renew. */
  @property({ type: Object }) localCache!: LocalCache;

  /**
   * contains one hour auto-loan-renew time configuration
   * defaults to 1 hour config
   */
  @property({ type: Object }) loanRenewTimeConfig: LoanRenewTimeConfig = {
    loanTotalTime: 3600, // 1 hour
    loanRenewAtLast: 660, // 11 minutes
    pageChangedInLast: 900, // 15 minutes
  };

  /**
   * contains one hour auto-loan-renew response
   */
  @property({ type: Object }) loanRenewResult: LoanRenewResult = {
    texts: '',
    renewNow: false,
    secondsLeft: 0,
    renewType: '',
  };

  // private props
  postInitComplete = false;

  primaryActions: ActionConfig[] = [];

  primaryTitle = '';

  primaryColor: string | undefined = 'primary';

  secondaryActions: ActionConfig[] = [];

  lendingOptions?: GetLendingActions;

  /** 'browsed'|'borrowed'|'adminBorrowed' */
  borrowType: BorrowType | null = null;

  timeWhenTimerStart?: Date;

  loanRenewHelper?: LoanRenewHelper;

  tokenPoller?: LoanTokenPoller;

  /** Bound by bindLoanRenewEvents(), removed by unbindLoanRenewEvents(). */
  private userActionHandler?: (event: Event) => void;

  private pollerStartTimeout?: ReturnType<typeof setTimeout>;

  private renewNowTimeout?: ReturnType<typeof setTimeout>;

  private visibilityChangeHandler?: () => Promise<void>;

  loanRenewInProgress = false;

  /**
   * True while recovering from a loan that genuinely lapsed (set by
   * autoRenewExpiredLoan), as opposed to a routine pre-expiry top-up.
   * Only the recovery case needs BookReader re-initialized. See
   * handleLoanAutoRenewed.
   */
  recoveringFromLoanExpiry = false;

  /**
   * True right after a confirmed renewal (any kind), until the token
   * poller restarts. renew_loan's own response already carries a valid
   * access token, so that restart should skip its normal immediate
   * create_token call. See handleLoanAutoRenewed/
   * setupLendingToolbarActions.
   */
  skipNextInitialTokenCall = false;

  warningModalOpen = false;

  /** Once dismissed, don't re-show the warning modal every tick. Only
   * a real renewal (handleLoanAutoRenewed) re-arms it. */
  warningModalDismissed = false;

  connectedCallback(): void {
    super.connectedCallback();
    // First connect binds in firstUpdated(). A reconnect re-binds here.
    if (this.hasUpdated) this.bindLoanRenewEvents();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unbindLoanRenewEvents();
    clearTimeout(this.pollerStartTimeout);
    clearTimeout(this.renewNowTimeout);
    window?.IALendingIntervals?.clearAll();
    this.tokenPoller?.disconnectedCallback();
    this.sentryCaptureMsg(sentryLogs.disconnectedCallback);
    this.disconnectResizeObserver();
  }

  /**
   * send log messages to sentry
   */
  sentryCaptureMsg(message: string): void {
    window?.Sentry?.captureMessage(message);
  }

  firstUpdated(): void {
    // bind auto loan renew events
    this.bindLoanRenewEvents();

    // localCache used for auto-loan-renew
    this.localCache = new LocalCache({
      namespace: 'loanRenew',
    });

    if (!this.sharedObserver) {
      this.sharedObserver = new SharedResizeObserver();
      this.setupResizeObserver();
    }
  }

  updated(changed: PropertyValues<this>): void {
    if (changed.has('lendingStatus') || changed.has('bwbPurchaseUrl')) {
      this.setupLendingToolbarActions();
    }

    if (changed.has('sharedObserver')) {
      this.disconnectResizeObserver();
      this.setupResizeObserver();
    }

    if (changed.has('loanRenewResult') && this.loanRenewResult.renewNow) {
      // Pause the countdown for the renew_loan round-trip, for every
      // renewal path. Cleared by handleLoanAutoRenewed().
      this.loanRenewInProgress = true;
      window.IALendingIntervals.clearAll();
    }
  }

  /** SharedObserver resize handler */
  handleResize(entry: ResizeObserverEntry): void {
    // if you are observing multiple targets,
    // you can distinguish them through `entry.target`
    const { target } = entry;
    if (target !== this) return;

    const { contentRect } = entry;
    // configure your view, ie:

    this.width = Math.round(contentRect.width);
  }

  /** Removes observer */
  disconnectResizeObserver(): void {
    this.sharedObserver?.removeObserver({
      handler: this,
      target: this,
    });
  }

  // observe the shadowRoot's viewport and
  // make this component the handler of changes
  setupResizeObserver(): void {
    if (!this.shadowRoot) return;
    this.sharedObserver?.addObserver({
      handler: this,
      target: this,
    });
  }
  /** End SharedObserver resize handler */

  /**
   * Recompute the action bar (title, buttons, colors, borrowType) from the
   * current lendingStatus.
   *
   * @returns false when there are no actions to apply, in which
   *   case callers should bail out rather than continue with stale state.
   */
  applyLendingActions(): boolean {
    this.lendingOptions = new GetLendingActions(
      this.userid,
      this.identifier,
      this.lendingStatus,
      this.bwbPurchaseUrl,
    );
    const actions = this.lendingOptions.getCurrentLendingActions();

    if (!actions) return false;

    const present = (action: ActionConfig | null): action is ActionConfig =>
      action != null;

    this.primaryTitle = actions.primaryTitle;
    this.primaryActions = actions.primaryActions?.filter(present);
    this.primaryColor = actions.primaryColor;
    this.secondaryActions = actions.secondaryActions?.filter(present);

    this.borrowType = actions.borrowType ? actions.borrowType : null;

    return true;
  }

  async setupLendingToolbarActions(): Promise<void> {
    const hasExpired =
      'browsingExpired' in this.lendingStatus &&
      this.lendingStatus?.browsingExpired;
    if (hasExpired) {
      // Auto-return must not visibly change the bar, unless nothing's
      // rendered yet (fresh load of an already-expired loan).
      if (this.primaryActions?.length) {
        log('[IABookActions] browsing expired — leaving action bar untouched');
      } else {
        log(
          '[IABookActions] browsing expired on first render — populating action bar',
        );
        this.applyLendingActions();
      }

      if (!this.tokenPoller) {
        this.sentryCaptureMsg(sentryLogs.bookWasExpired);
      }
      window?.IALendingIntervals?.clearAll();

      /** Global event - always fire */
      this.dispatchEvent(
        new Event(events.browseExpired, {
          bubbles: true,
          cancelable: false,
          composed: true,
        }),
      );

      // early return if book is already expired
      return;
    }

    if (!this.applyLendingActions()) return;

    // primaryActions/borrowType/etc are plain fields, not reactive
    // properties, so nothing pushes them to the rendered template (and
    // from there to <ia-book-actions-collapsible-action-group>) on its own.
    // Do that now, unconditionally. The early returns below (not borrowed,
    // title bar) must not skip it, or the action bar visibly goes stale
    // (e.g. a create_token failure resetting to Borrow never actually
    // shows it).
    this.requestUpdate();

    // Don't (re)start the countdown mid-renewal. secondsLeftOnLoan could
    // still be stale until handleLoanAutoRenewed() confirms it.
    if (this.borrowType === 'browsed' && !this.loanRenewInProgress) {
      await this.startTimerCountdown();
      await this.startBrowseTimer();
    }

    // early return if not borrowed or no action-bar
    if (!this.borrowType || this.barType === 'title') {
      this.lendingBarPostInit();
      return;
    }

    // Wait until any in-flight renewal is confirmed before (re)starting the
    // poller, so create_token isn't called against a not-yet-renewed loan.
    clearTimeout(this.pollerStartTimeout);
    this.pollerStartTimeout = setTimeout(() => {
      if (
        !hasExpired &&
        !this.loanRenewInProgress &&
        !window.IALendingIntervals.tokenPoller
      ) {
        // Any confirmed renewal's response already minted a valid access
        // token (see handleLoanAutoRenewed), so the poller only needs to
        // start its recurring check, not fire an immediate confirming
        // create_token call too.
        const skipInitialCall = this.skipNextInitialTokenCall;
        this.skipNextInitialTokenCall = false;
        this.recoveringFromLoanExpiry = false;
        this.startLoanTokenPoller(skipInitialCall);
      }
    }, 100);
  }

  /**
   * Is this BookReader's own init-time jump to the last-read page, rather
   * than a real patron interaction (which fires the identical event)? Only
   * an explicit `false` counts; a missing flag must be treated as real.
   * @param event the BookReader:userAction event
   */
  isBookReaderInitAction(event?: Event): boolean {
    const detail = (
      event as
        | CustomEvent<{ props?: { init?: { initComplete?: boolean } } }>
        | undefined
    )?.detail;
    return detail?.props?.init?.initComplete === false;
  }

  /**
   * Bind 1 hour loan auto renew event,
   * There are two events we want to use,
   * 1. BookReader:userAction - dispatched from bookreader side
   * 2. IABookActions:loanRenew - dispatched from ia-book-actions-timer-countdown component
   */
  bindLoanRenewEvents(): void {
    // Safe to call repeatedly: drop any existing listeners before adding.
    this.unbindLoanRenewEvents();

    /**
     * dispatched this event from bookreader page changed
     */
    this.userActionHandler = (event: Event) => {
      if (this.isBookReaderInitAction(event)) {
        log(
          '[IABookActions] BookReader:userAction ignored — fired by BookReader init',
        );
        return;
      }

      // Capture before autoRenewExpiredLoan() runs. It optimistically
      // flips browsingExpired to false, which would otherwise also let
      // autoLoanRenewChecker() run and clobber the in-flight renewal.
      const wasExpired = this.lendingStatus.browsingExpired;

      log('[IABookActions] BookReader:userAction received', {
        borrowType: this.borrowType,
        browsingExpired: wasExpired,
      });

      if (wasExpired) {
        this.autoRenewExpiredLoan();
      }

      if (this.borrowType === 'browsed' && !wasExpired) {
        this.autoLoanRenewChecker(true);
      }
    };
    window.addEventListener('BookReader:userAction', this.userActionHandler);

    // A tab in the background can have its intervals throttled/paused, so
    // re-check status when the patron comes back to it.
    this.visibilityChangeHandler = async () => {
      if (document.hidden) {
        log('[IABookActions] visibilitychange: tab backgrounded');
        return;
      }

      log(
        '[IABookActions] visibilitychange: tab foregrounded',
        this.borrowType,
      );

      try {
        // Loan already expired while tab was hidden, so try to silently renew
        if (this.lendingStatus.browsingExpired === true) {
          this.autoRenewExpiredLoan();
          return;
        }

        if (this.borrowType !== 'browsed') return;

        if (this.lendingStatus.browsingExpired === false) {
          const loanTime = await this.localCache.get(
            `${this.identifier}-loanTime`,
          );

          // number of seconds left in current loan
          const secondsLeft = secondsUntil(loanTime);

          if (secondsLeft >= this.timerExecutionSeconds) {
            this.loanStatusCheckInterval(Number(secondsLeft));
          } else {
            // Loan expired while away, so silently renew. Only clear
            // intervals; disconnectedCallback() would drop the resize
            // observer for a session that's still continuing.
            window?.IALendingIntervals?.clearAll();
            this.autoRenewExpiredLoan();
          }
        }
      } catch (error) {
        // Surface localCache failures instead of an unhandled rejection.
        log('[IABookActions] visibilitychange handler failed', error);
        this.sentryCaptureMsg(`visibilitychange handler failed: ${error}`);
      }
    };
    document.addEventListener('visibilitychange', this.visibilityChangeHandler);
  }

  /** Remove the listeners added by bindLoanRenewEvents(). */
  unbindLoanRenewEvents(): void {
    if (this.userActionHandler) {
      window.removeEventListener(
        'BookReader:userAction',
        this.userActionHandler,
      );
      this.userActionHandler = undefined;
    }
    if (this.visibilityChangeHandler) {
      document.removeEventListener(
        'visibilitychange',
        this.visibilityChangeHandler,
      );
      this.visibilityChangeHandler = undefined;
    }
  }

  /**
   * To determine if need to be renewed browsed book
   * @see LoanRenewHelper
   *
   * @param hasPageChanged
   */
  async autoLoanRenewChecker(hasPageChanged = false): Promise<void> {
    // Re-entrancy guard against rapid BookReader:userAction events (e.g. a
    // single scroll firing several in quick succession).
    if (this.loanRenewInProgress) return;

    this.loanRenewHelper = new LoanRenewHelper(
      hasPageChanged,
      this.identifier,
      this.localCache,
      this.loanRenewTimeConfig,
    );

    await this.loanRenewHelper.handleLoanRenew();
    this.loanRenewResult = this.loanRenewHelper.result;
  }

  /**
   * Silently attempt to renew a browse loan that has expired, on
   * visibilitychange or a page turn. handleLoanAutoRenewed()/
   * handleLendingActionError() handle the outcome either way.
   */
  autoRenewExpiredLoan(): void {
    if (this.loanRenewInProgress) {
      log(
        '[IABookActions] autoRenewExpiredLoan: skipped, renewal already in progress',
        { identifier: this.identifier },
      );
      return;
    }
    log('[IABookActions] autoRenewExpiredLoan: starting silent renewal', {
      identifier: this.identifier,
    });
    this.loanRenewInProgress = true;
    this.recoveringFromLoanExpiry = true;

    this.modal?.closeModal();

    // Optimistically flip browsingExpired so the bar stays in the reading
    // state during the renew_loan round-trip, instead of showing "Borrow".
    this.lendingStatus = {
      ...this.lendingStatus,
      browsingExpired: false,
    };

    // Defer renewNow until after lendingStatus timer setup completes.
    clearTimeout(this.renewNowTimeout);
    this.renewNowTimeout = setTimeout(() => {
      this.loanRenewResult = { texts: '', renewNow: true, renewType: 'auto' };
    }, 0);
  }

  /**
   * Required as sibling on page
   */
  get modal() {
    const modalOnDom = document.body.querySelector('modal-manager');

    modalOnDom?.setAttribute('id', 'action-bar-modal');
    return modalOnDom;
  }

  /**
   * Show the informational modal warning the patron their loan will expire
   * soon. This is acknowledgement-only, closing it does not renew the loan.
   * Only interacting with the book itself (e.g. turning a page) renews it.
   */
  async showWarningModal(): Promise<void> {
    if (this.warningModalOpen) return;
    this.warningModalOpen = true;

    log('[IABookActions] showWarningModal');

    const { texts: warningTexts, secondsLeft: rawSecondsLeft } =
      this.loanRenewResult;
    let secondsLeft = rawSecondsLeft;
    if (secondsLeft === undefined || secondsLeft <= 0) {
      secondsLeft = this.lendingStatus.secondsLeftOnLoan;
    } else {
      secondsLeft = secondsLeft > 60 ? secondsLeft : 60;
    }

    this.modal!.customModalContent = undefined;
    this.modal?.closeModal();
    this.loanRenewResult = { texts: '', renewNow: false };

    const config = new ModalConfig({
      headline: html`${msg('Are you still there?')}`,
      headerColor: '#194880',
      showCloseButton: false,
      closeOnBackdropClick: false,
      message: html`<span>
        ${this.loanRenewHelper?.getMessageTexts(
          warningTexts,
          Number(secondsLeft),
        )}
        <a
          href="https://help.archive.org/help/borrowing-from-the-lending-library"
          target="_blank"
          title=${msg('Get more info on borrowing from The Lending Library')}
          data-event-click-tracking="BookReader|BrowsableMoreInfo"
          style="display:inline-block;vertical-align:middle;line-height:0;margin-left:4px;"
        >
          ${infoIcon}
        </a>
      </span>`,
    });

    const customModalContent = html`
      <div
        id="book-action-bar-custom-buttons"
        style="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px;margin-top:10px;"
      >
        <button
          style="${modalButtonStyle.iaButton} ${modalButtonStyle.renew}"
          @click=${() => this.dismissWarningModal()}
        >
          ${msg('Okay')}
        </button>
      </div>
    `;

    this.modal!.setAttribute('aria-live', 'assertive');
    await this.modal?.showModal({ config, customModalContent });
  }

  /** Acknowledges the warning modal, closing it without renewing the loan */
  dismissWarningModal(): void {
    this.modal?.closeModal();
    this.warningModalOpen = false;
    this.warningModalDismissed = true;
  }

  /**
   * Execute when loan is expired
   */
  async browseHasExpired(): Promise<void> {
    log('[IABookActions] browseHasExpired', {
      identifier: this.identifier,
      loanRenewInProgress: this.loanRenewInProgress,
    });
    window?.IALendingIntervals?.clearAll();

    const currStatus = {
      ...this.lendingStatus,
      browsingExpired: true,
      secondsLeftOnLoan: 0,
    };
    this.lendingStatus = currStatus;

    // remove respected key:value for loan-renew
    await this.localCache.delete(`${this.identifier}-loanTime`);
    await this.localCache.delete(`${this.identifier}-pageChangedTime`);
    log(
      '[IABookActions] browseHasExpired: cleared loanTime/pageChangedTime cache',
      {
        identifier: this.identifier,
      },
    );

    // show message after browsed book is expired.
    this.loanRenewResult.renewNow = false;
    this.loanRenewResult.texts = msg(
      'This book has been returned due to inactivity.',
    );

    this.modal?.closeModal();
    // Release the warning-modal re-entrancy guard, or it stays latched for
    // the life of the component.
    this.warningModalOpen = false;

    this.sentryCaptureMsg(sentryLogs.browseHasExpired);
  }

  /**
   * Show modal when the book can no longer be automatically renewed
   * because another patron has checked it out.
   */
  async showLoanUnavailableModal(errorMsg?: string): Promise<void> {
    const config = new ModalConfig({
      showCloseButton: false,
      closeOnBackdropClick: false,
      headerColor: '#d9534f',
      message: html`${errorMsg ||
      msg(
        'Due to inactivity, this book was returned, and someone else has now borrowed it. Please try again later.',
      )}`,
    });

    const customModalContent = html`<br />
      <div style="text-align: center">
        <button
          style="${modalButtonStyle.iaButton} ${modalButtonStyle.return}"
          @click=${() => URLHelper.goToUrl(this.returnUrl, true)}
        >
          ${msg('Okay')}
        </button>
      </div>`;

    await this.modal?.showModal({ config, customModalContent });
  }

  async startBrowseTimer(): Promise<void> {
    window?.IALendingIntervals?.clearBrowseExpireTimeout();

    const { browsingExpired, user_has_browsed, secondsLeftOnLoan } =
      this.lendingStatus;

    if (!user_has_browsed || browsingExpired) {
      return;
    }

    window.IALendingIntervals.browseExpireTimeout = setTimeout(
      () => {
        this.browseHasExpired();
      },
      Number(secondsLeftOnLoan) * 1000,
    );
  }

  render() {
    if (this.barType === 'title') {
      return html`<section class="lending-wrapper">
        ${this.bookTitleBar}
      </section>`;
    }

    return html`<section class="lending-wrapper">
      ${this.bookActionBar}
    </section>`;
  }

  get bookTitleBar() {
    return html`<ia-book-actions-title-bar
      .identifier=${this.identifier}
      .bookTitle=${this.bookTitle}
    ></ia-book-actions-title-bar>`;
  }

  get timerCountdownEl(): IABookActionsTimerCountdown | null | undefined {
    return this.shadowRoot?.querySelector('ia-book-actions-timer-countdown');
  }

  get bookActionBar() {
    return html`
      <ia-book-actions-collapsible-action-group
        .userid=${this.userid}
        .identifier=${this.identifier}
        .primaryColor=${this.primaryColor}
        .primaryActions=${this.primaryActions}
        .secondaryActions=${this.secondaryActions}
        .width=${this.width}
        .borrowType=${this.borrowType}
        .returnUrl=${this.returnUrl}
        .localCache=${this.localCache}
        .loanTotalTime=${this.loanRenewTimeConfig.loanTotalTime}
        .loanRenewType=${this.loanRenewResult.renewType}
        .loaderIcon=${this.loaderIcon}
        ?hasAdminAccess=${this.hasAdminAccess}
        ?disabled=${this.disableActionGroup}
        ?autoRenew=${this.loanRenewResult.renewNow}
        ?autoReturn=${this.lendingStatus.browsingExpired}
        @loanAutoRenewed=${this.handleLoanAutoRenewed}
        @lendingActionError=${this.handleLendingActionError}
        @toggleActionGroup=${this.handleToggleActionGroup}
      >
      </ia-book-actions-collapsible-action-group>
      ${this.textGroupTemplate} ${this.infoIconTemplate}
      <ia-book-actions-timer-countdown
        .secondsLeftOnLoan=${Math.round(
          Number(this.lendingStatus.secondsLeftOnLoan),
        )}
      ></ia-book-actions-timer-countdown>
    `;
  }

  /**
   * Runs after a loan renewal completes (successfully or not): shows the
   * outcome, updates the remaining time, and resets renewal-in-flight state.
   * @param event
   */
  async handleLoanAutoRenewed({
    detail,
  }: LoanAutoRenewedEventLike): Promise<void> {
    const activeLoan = detail?.data?.loan;

    // Treat anything but a confirmed renewal as a failure, or
    // loanRenewInProgress stays latched forever (autoLoanRenewChecker/
    // autoRenewExpiredLoan both no-op on it).
    if (!activeLoan?.renewal) {
      this.loanRenewInProgress = false;
      this.recoveringFromLoanExpiry = false;
      this.warningModalOpen = false;

      // dispatchActionError() has already reported this and shown the
      // relevant modal; don't stack a second one on top.
      log('[IABookActions] handleLoanAutoRenewed: not a confirmed renewal', {
        identifier: this.identifier,
        activeLoan,
      });
      return;
    }

    if (this.loanRenewResult.renewNow) {
      const loanTime = await this.localCache.get(`${this.identifier}-loanTime`);

      // number of seconds left in current loan
      const rawSecondsLeft = secondsUntil(loanTime);
      // Guard against a stale/missing loanTime read producing NaN, which
      // would get the loan stuck "active" with a countdown that never moves.
      const secondsLeft =
        Number.isFinite(rawSecondsLeft) && rawSecondsLeft > 0
          ? rawSecondsLeft
          : this.loanRenewTimeConfig.loanTotalTime;
      log('[IABookActions] handleLoanAutoRenewed', {
        secondsLeft,
        rawSecondsLeft,
        ajaxResponse: detail?.data,
      });

      // BookLoanService::attempt_to_renew_loan() mints a valid access
      // token as part of EVERY renew_loan response, not just a recovery
      // from expiry, so the poller restart below never needs to fire a
      // redundant confirming create_token call, regardless of which path
      // triggered this renewal.
      this.skipNextInitialTokenCall = true;

      // A page image requested in the gap between expiry and this renewal
      // landing can come back broken, and browsers don't retry a failed
      // <img> on their own. Retry once, right when access is confirmed good
      // again.
      this.reloadPageImages();

      if (this.recoveringFromLoanExpiry) {
        // Only now is it safe to re-initialize BookReader, not for a
        // routine top-up, where that would be disruptive. Call it
        // directly rather than waiting on a confirming create_token
        // success: BookLoanService::attempt_to_renew_loan() already
        // minted a valid access token as part of this renew_loan
        // response, so there's nothing left to confirm.
        this.lendingBarPostInit();
        this.postInitComplete = true;
      }

      const currStatus = {
        ...this.lendingStatus,
        user_has_browsed: true,
        browsingExpired: false,
        secondsLeftOnLoan: secondsLeft,
      };
      this.lendingStatus = currStatus;

      // close the modal
      this.modal?.closeModal();
      this.modal!.removeAttribute('id');
      this.modal!.customModalContent = undefined;
      this.sentryCaptureMsg(sentryLogs.bookHasRenewed);
      this.warningModalDismissed = false;
    }

    this.warningModalOpen = false;
    this.loanRenewInProgress = false;
  }

  /** Start the countdown interval; ticks read the live secondsLeftOnLoan
   * each time rather than a value frozen at start, so drift can't compound
   * across ticks (see loanStatusCheckInterval). */
  async startTimerCountdown(): Promise<void> {
    window?.IALendingIntervals?.clearTimerCountdown();
    this.timeWhenTimerStart = new Date();

    window.IALendingIntervals.timerCountdown = setInterval(async () => {
      await this.loanStatusCheckInterval(
        Number(this.lendingStatus.secondsLeftOnLoan),
      );
    }, this.timerExecutionSeconds * 1000);
  }

  /**
   * Runs on every countdown tick: resyncs against wall-clock time, attempts
   * a renewal near expiry, and clears the timers once the loan expires.
   * @param secondsLeftOnLoan
   */
  async loanStatusCheckInterval(secondsLeftOnLoan: number): Promise<void> {
    let secondsLeft = secondsLeftOnLoan;
    secondsLeft -= this.timerExecutionSeconds;
    secondsLeft = Math.round(secondsLeft);

    const resyncd = this.reSyncTimerIfGoneOff(secondsLeft);
    if (resyncd.hasSynced) {
      secondsLeft = resyncd.whatShouldLeft;
      log('[IABookActions] timer: timer re-synced', { secondsLeft });
    }

    log('[IABookActions] timer', {
      whatShouldLeft: resyncd.whatShouldLeft,
      whatIsleft: secondsLeft,
    });

    // Re-anchor every tick so drift from wall-clock time can't compound
    // across ticks that don't happen to trigger a resync above.
    this.timeWhenTimerStart = new Date();
    this.lendingStatus = {
      ...this.lendingStatus,
      secondsLeftOnLoan: secondsLeft,
    };

    // 10 minutes out: start checking for a renewal. 0: show the "about to
    // auto-return" warning. @see IABookActions::bindLoanRenewEvents
    if (secondsLeft <= this.loanRenewTimeConfig.loanRenewAtLast) {
      await this.loanRenewAttempt(secondsLeft);
    }

    if (secondsLeft <= this.timerExecutionSeconds) {
      window?.IALendingIntervals?.clearAll();
      this.tokenPoller?.disconnectedCallback();
      this.sentryCaptureMsg(sentryLogs.clearOneHourTimer);
    }
  }

  /**
   * helper function to determine if timer is not in sync properly
   *
   * @param timerSecondsLeft actual seconds left get from setInterval
   * @returns { hasSynced: [boolean], whatShouldLeft: [number] }
   */
  reSyncTimerIfGoneOff(timerSecondsLeft: number): {
    hasSynced: boolean;
    whatShouldLeft: number;
  } {
    const currentTime = new Date();

    // No prior anchor to compare against -- e.g. visibilitychange calling
    // loanStatusCheckInterval() directly before startTimerCountdown() ever
    // ran, which setupLendingToolbarActions() skips while a renewal is
    // in flight. Nothing to resync yet; anchor now and report no drift.
    if (!this.timeWhenTimerStart) {
      this.timeWhenTimerStart = currentTime;
      return { hasSynced: false, whatShouldLeft: Math.round(timerSecondsLeft) };
    }

    // current time - loan time
    const diffInSeconds =
      currentTime.getTime() / 1000 - this.timeWhenTimerStart.getTime() / 1000;

    const secondsShouldLeft =
      Number(this.lendingStatus.secondsLeftOnLoan) - diffInSeconds;

    // convert in minutes
    const whatIsleft = Math.round(timerSecondsLeft);
    const whatShouldLeft = Math.round(secondsShouldLeft);
    const timerElSeconds = this.timerCountdownEl!.secondsLeftOnLoan || 0;

    if (timerElSeconds !== whatShouldLeft || whatIsleft !== whatShouldLeft) {
      // set lending status with new time to update decrementor
      const currStatus = {
        ...this.lendingStatus,
        secondsLeftOnLoan: whatShouldLeft,
      };
      this.lendingStatus = currStatus;
    }

    if (whatIsleft !== whatShouldLeft) {
      log(
        `[IABookActions] reSyncTimerIfGoneOff ${whatIsleft} - ${whatShouldLeft}: re-syncing timer`,
      );
      return { hasSynced: true, whatShouldLeft };
    }

    return { hasSynced: false, whatShouldLeft };
  }

  /**
   * attmept to loan renew from
   * - timer countdown
   * - onclick on [keep reading] button
   *
   * @param secondsLeft
   */
  async loanRenewAttempt(secondsLeft: number): Promise<void> {
    let loanSecondsLeft = secondsLeft;
    // Under 50s left there isn't enough time for the renew_loan round-trip
    // and create_token to load images, so just expire the loan.
    if (loanSecondsLeft < 50) {
      log('[IABookActions] loanRenewAttempt: < 50s left, expiring loan');
      await this.browseHasExpired();
      return;
    }

    await this.autoLoanRenewChecker(false);

    // Once dismissed, don't re-show the warning on every subsequent tick.
    // Only an actual renewal (handleLoanAutoRenewed) re-arms it.
    if (
      this.loanRenewResult.renewNow === false &&
      !this.warningModalDismissed
    ) {
      // Compensate for the 50s buffer above by warning a minute early.
      loanSecondsLeft -= 60;
      this.loanRenewResult.secondsLeft = loanSecondsLeft;

      this.showWarningModal();
    }
  }

  /**
   * enable access of borrowed/browsed books
   * @param skipInitialCall see LoanTokenPoller's constructor doc
   * @see LoanTokenPoller
   */
  startLoanTokenPoller(skipInitialCall = false): void {
    const successCallback = () => {
      if (!this.postInitComplete) {
        this.lendingBarPostInit();
      }
      this.postInitComplete = true;
    };
    const errorCallback = (eventObj: LendingActionErrorEventLike) => {
      this.handleLendingActionError(eventObj);
    };

    // Tear down any previous poller first, so only one is ever controlling
    // window.IALendingIntervals.tokenPoller at a time.
    this.tokenPoller?.disconnectedCallback();
    this.tokenPoller = new LoanTokenPoller({
      identifier: this.identifier,
      borrowType: this.borrowType,
      successCallback,
      errorCallback,
      pollerDelay: this.tokenDelay, // in seconds
      skipInitialCall,
    });
  }

  /*
   * custom event handler to toggle action group visibility
   *
   * @event IABookActions#toggleActionGroup
   */
  handleToggleActionGroup(): void {
    this.disableActionGroup = !this.disableActionGroup;
  }

  /**
   * Handles lending errors from any action (browse_book, borrow_book,
   * create_token, renew_loan, etc).
   * @event IABookActions#lendingActionError
   * @param event
   * @param event.detail.action
   * @param event.detail.data.error
   */
  handleLendingActionError(event?: LendingActionErrorEventLike): void {
    this.disableActionGroup = false;

    const action = event?.detail?.action;
    // handleLoanRenewNow's failure path sets `.error` to a boolean flag and
    // puts the real text in `.message`. Only take `.error` when it's
    // actually a string, or the modal renders the literal word "true".
    const rawErrorMsg = event?.detail?.data?.error;
    const errorMsg = typeof rawErrorMsg === 'string' ? rawErrorMsg : undefined;
    const isInitial = event?.detail?.isInitial === true;

    log('[IABookActions] handleLendingActionError', {
      identifier: this.identifier,
      action,
      errorMsg,
      isInitial,
      loanRenewInProgress: this.loanRenewInProgress,
      recoveringFromLoanExpiry: this.recoveringFromLoanExpiry,
    });

    if (action === 'create_token') {
      // Any create_token failure, initial or a routine interval refresh,
      // means access can no longer be confirmed (e.g. a stale loan-record
      // cache on some other node can make this request fail even though
      // the loan is fine, or the loan may genuinely have just been
      // returned via BookReaderImages.php's revokeAccess()). Don't retry
      // and don't stay silent either way: reset the bar to Borrow and the
      // timer to 0 rather than leaving a stale countdown for a session
      // that isn't accessible.
      window?.IALendingIntervals?.clearAll();
      this.tokenPoller?.disconnectedCallback();
      this.lendingStatus = {
        ...this.lendingStatus,
        user_has_browsed: false,
        available_to_browse: true,
        secondsLeftOnLoan: 0,
      };

      // showErrorModal has dedicated create_token messaging (refresh
      // button + support email) and shows regardless of whether a
      // specific error string came back.
      this.showErrorModal(errorMsg, action);
    } else if (action === 'renew_loan') {
      window?.IALendingIntervals?.clearAll();
      this.loanRenewInProgress = false;
      this.recoveringFromLoanExpiry = false;

      // The loan was NOT renewed, so reflect that immediately (show Borrow,
      // clear the stale timer) instead of leaving a frozen "Return now".
      this.lendingStatus = {
        ...this.lendingStatus,
        user_has_browsed: false,
        available_to_browse: true,
        secondsLeftOnLoan: 0,
      };

      // Refresh the page on dismissal so the client picks up whatever the
      // server now authoritatively considers true (any error message).
      this.showLoanUnavailableModal(errorMsg);
    } else {
      // Every other action failure genuinely affects loan state.
      window?.IALendingIntervals?.clearAll();

      if (!errorMsg) return;

      this.showErrorModal(errorMsg, action);

      // update action bar state if book is not available to browse or borrow.
      if (errorMsg.match(/not available to borrow/gm)) {
        if (action === 'browse_book') {
          this.lendingStatus = {
            ...this.lendingStatus,
            available_to_browse: false,
          };
        } else if (action === 'borrow_book') {
          this.lendingStatus = {
            ...this.lendingStatus,
            available_to_borrow: false,
          };
        }
      }
    }
  }

  /* show error message if something went wrong */
  async showErrorModal(errorMsg?: string, action?: string): Promise<void> {
    const modalConfig = new ModalConfig({
      title: html`${msg('Lending error')}`,
      message: errorMsg ? html`${errorMsg}` : undefined,
      headerColor: '#d9534f',
      showCloseButton: true,
    });

    if (action === 'create_token') {
      const refreshButton = html`<button
        style="${modalButtonStyle.refresh}"
        @click=${() =>
          // Firefox's non-standard `forceGet` argument skips the cache
          (
            window.location as Location & { reload(forceGet?: boolean): void }
          ).reload(true)}
      >
        refresh
      </button>`;

      modalConfig.message = html` Uh oh, something went wrong trying to access
        this book.<br />
        Please ${refreshButton} to try again or send us an email to
        <a
          href="mailto:info@archive.org?subject=Help: cannot access my borrowed book: ${this
            .identifier}"
          >info@archive.org</a
        ><br /><br />
        ${errorMsg ? html`<code>errorLog: ${errorMsg}</code>` : nothing}`;
    }

    await this.modal?.showModal({
      config: modalConfig,
    });
  }

  get iconClass(): 'mobile' | 'desktop' {
    return this.width <= mobileContainerWidth ? 'mobile' : 'desktop';
  }

  get textClass(): 'visible' | 'hidden' {
    return this.width >= mobileContainerWidth ? 'visible' : 'hidden';
  }

  get infoIconTemplate(): TemplateResult {
    return html`<ia-book-actions-info-icon
      iconClass=${this.iconClass}
    ></ia-book-actions-info-icon>`;
  }

  get textGroupTemplate(): TemplateResult | typeof nothing {
    return this.primaryTitle
      ? html`<ia-book-actions-text-group
          textClass=${this.textClass}
          .texts=${this.primaryTitle}
        >
        </ia-book-actions-text-group>`
      : nothing;
  }

  get hasAdminAccess(): boolean | undefined {
    return !this.lendingStatus.userHasBorrowed && this.lendingStatus.isAdmin;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }

      .hide {
        display: none;
      }

      .lending-wrapper {
        width: 100%;
        margin: 0 auto;
        background: var(--primaryBGColor, #000);
        color: var(--primaryTextColor, #fff);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }

      #action-bar-modal {
        --modalWidth: 36rem;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-book-actions': IABookActions;
  }
}

export default IABookActions;
