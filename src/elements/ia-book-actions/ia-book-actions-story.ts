import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
import { customElement } from '@src/util/custom-element';

import '@demo/story-template';
import { tagFromHash } from '@demo/element-hash';
import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';

import './ia-book-actions';
import type { IABookActions } from './ia-book-actions';
import type { IAModalManager } from '../modal-manager/modal-manager';
import { defaultLendingStatus } from './ia-book-actions-story-data';
import type { LendingStatus, LoanRenewTimeConfig } from './models';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Bar background',
    cssVariable: '--primaryBGColor',
    defaultValue: '#000000',
    inputType: 'color',
  },
  {
    label: 'Bar text color',
    cssVariable: '--primaryTextColor',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'White',
    cssVariable: '--white',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Primary button fill',
    cssVariable: '--primaryCTAFill',
    defaultValue: '#194880',
    inputType: 'color',
  },
  {
    label: 'Primary button hover fill (RGB)',
    cssVariable: '--primaryCTAFillRGB',
    defaultValue: '25, 72, 128',
    inputType: 'text',
  },
  {
    label: 'Primary button border',
    cssVariable: '--primaryCTABorder',
    defaultValue: '#c5d1df',
    inputType: 'color',
  },
  {
    label: 'Secondary button fill',
    cssVariable: '--secondaryCTAFill',
    defaultValue: '#333333',
    inputType: 'color',
  },
  {
    label: 'Secondary button hover fill (RGB)',
    cssVariable: '--secondaryCTAFillRGB',
    defaultValue: '51, 51, 51',
    inputType: 'text',
  },
  {
    label: 'Secondary button border',
    cssVariable: '--secondaryCTABorder',
    defaultValue: '#999999',
    inputType: 'color',
  },
  {
    label: 'Danger button fill',
    cssVariable: '--primaryErrorCTAFill',
    defaultValue: '#d9534f',
    inputType: 'color',
  },
  {
    label: 'Danger button hover fill (RGB)',
    cssVariable: '--primaryErrorCTAFillRGB',
    defaultValue: '229, 28, 38',
    inputType: 'text',
  },
  {
    label: 'Danger button border',
    cssVariable: '--primaryErrorCTABorder',
    defaultValue: '#d43f3a',
    inputType: 'color',
  },
  {
    label: 'Disabled button fill',
    cssVariable: '--primaryDisableCTAFill',
    defaultValue: '#767676',
    inputType: 'color',
  },
  {
    label: 'Dropdown background',
    cssVariable: '--iaBookActionsDropdownBGColor',
    defaultValue: '#2d2d2d',
    inputType: 'color',
  },
];

const propInputSettings: PropInputSettings<IABookActions>[] = [
  {
    label: 'Book title',
    propertyName: 'bookTitle',
    defaultValue: '',
  },
  {
    label: 'Identifier',
    propertyName: 'identifier',
    defaultValue: '',
  },
  {
    label: 'Bar type',
    propertyName: 'barType',
    inputType: 'radio',
    radioOptions: ['action', 'title'],
    defaultValue: 'action',
  },
  {
    label: 'Better World Books URL',
    propertyName: 'bwbPurchaseUrl',
    defaultValue: '',
  },
  {
    label: 'Return URL',
    propertyName: 'returnUrl',
    defaultValue: '',
  },
  {
    label: 'Seconds between create_token calls',
    propertyName: 'tokenDelay',
    inputType: 'number',
    defaultValue: 120,
  },
  {
    label: 'Seconds between loan checks',
    propertyName: 'timerExecutionSeconds',
    inputType: 'number',
    defaultValue: 30,
  },
];

const EXAMPLE_USAGE = `<modal-manager></modal-manager>

<ia-book-actions
  .userid=\${'@brewster'}
  .identifier=\${'goody'}
  .bookTitle=\${'Goody Two-Shoes'}
  .lendingStatus=\${lendingStatus}
  .returnUrl=\${'/details/goody'}
  .lendingBarPostInit=\${() => bookReader.init()}
></ia-book-actions>`;

/** Loan lengths, so the warning and auto-return can be reached quickly. */
const LOAN_LENGTHS: Record<string, { label: string } & LoanRenewTimeConfig> = {
  '15s': {
    label: '15 seconds',
    loanTotalTime: 15,
    loanRenewAtLast: 13,
    pageChangedInLast: 5,
  },
  '30s': {
    label: '30 seconds',
    loanTotalTime: 30,
    loanRenewAtLast: 27,
    pageChangedInLast: 10,
  },
  '2m': {
    label: '2 minutes',
    loanTotalTime: 120,
    loanRenewAtLast: 95,
    pageChangedInLast: 15,
  },
  '60m': {
    label: '60 minutes (production)',
    loanTotalTime: 3600,
    loanRenewAtLast: 660,
    pageChangedInLast: 900,
  },
};

interface Scenario {
  label: string;
  status: (loanSeconds: number) => LendingStatus;
}

const SCENARIOS: Record<string, Scenario> = {
  borrowable: {
    label: 'Borrowable for 1 hour or 14 days',
    status: () => ({ available_to_browse: true, available_to_borrow: true }),
  },
  borrowable14: {
    label: 'Borrowable for 14 days',
    status: () => ({ available_to_borrow: true }),
  },
  reading1hr: {
    label: 'Reading a 1 hour loan',
    status: (loanSeconds) => ({
      available_to_browse: true,
      user_has_browsed: true,
      browsingExpired: false,
      secondsLeftOnLoan: loanSeconds,
    }),
  },
  expired1hr: {
    label: 'A 1 hour loan that has expired',
    status: () => ({
      available_to_browse: true,
      user_has_browsed: true,
      browsingExpired: true,
    }),
  },
  reading14: {
    label: 'Reading a 14 day loan',
    status: () => ({
      available_to_borrow: true,
      user_has_borrowed: true,
      daysLeftOnLoan: 10,
    }),
  },
  waitlist: {
    label: 'Waitlist available',
    status: () => ({
      available_to_browse: true,
      available_to_waitlist: true,
      available_lendable_copies: 0,
    }),
  },
  onWaitlist: {
    label: 'On the waitlist',
    status: () => ({ user_on_waitlist: true }),
  },
  claimWaitlist: {
    label: 'Top of the waitlist',
    status: () => ({
      user_can_claim_waitlist: true,
      available_to_borrow: true,
    }),
  },
  unavailable: {
    label: 'Unavailable',
    status: () => ({}),
  },
  printDisabledOnly: {
    label: 'Print disabled only',
    status: () => ({ isPrintDisabledOnly: true }),
  },
};

/** The path the element posts lending actions to on archive.org. */
const LOAN_SERVICE_PATH = '/services/loans/loan';

/** The lending service actions the element posts to the loans endpoint. */
const LENDING_ACTIONS = [
  'browse_book',
  'borrow_book',
  'create_token',
  'renew_loan',
  'return_loan',
  'join_waitlist',
  'leave_waitlist',
];

/**
 * The actions "Fail lending requests" fails. `create_token` is left out: it
 * runs on a timer for as long as a loan is active, so failing it reopens the
 * error modal on every tick.
 */
const FAILING_ACTIONS = LENDING_ACTIONS.filter(
  (action) => action !== 'create_token',
);

const FAIL_MESSAGE = 'The demo is set to fail lending requests.';

const ARCHIVE_ROOT_FONT_SIZE = '10px';

const MAX_LOG_ENTRIES = 100;

type LogKind = 'request' | 'analytics' | 'sentry' | 'navigation' | 'event';

interface LogEntry {
  time: string;
  kind: LogKind;
  text: string;
}

/** The part of the Navigation API the story uses to stop page loads. */
interface NavigateEventLike extends Event {
  destination: { url: string; sameDocument: boolean };
}

/**
 * Demo of the lending action bar. Nothing here reaches the network:
 *
 * - `window.fetch` is wrapped while the story is on the page. Posts to the
 *   lending service (`create_token`, `browse_book`, `renew_loan` and the rest)
 *   are answered locally and listed in the log, and every other request goes
 *   to the real `fetch`. The wrapper is removed when the story is removed.
 * - `window.archive_analytics` and `window.Sentry` are replaced with versions
 *   that write to the log, and put back afterward.
 * - The loader image is a data URI.
 * - Same-origin page loads (link clicks, reloads, the redirects after a
 *   borrow or return) are cancelled and logged. Links inside the bar and its
 *   modals are cancelled on click. Redirects come from the element's own
 *   `location` changes, which only the Navigation API can cancel, so a
 *   browser without it will load the page when a borrow completes.
 *
 * The element looks its modal manager up by tag in `document.body`, so the
 * story adds one there.
 */
@customElement('ia-book-actions-story')
export class IABookActionsStory extends LitElement {
  @state() private scenario = 'borrowable';

  @state() private loggedIn = true;

  @state() private admin = false;

  @state() private printDisabled = false;

  @state() private loanLength = '2m';

  @state() private failRequests = false;

  @state() private archiveFontSize =
    tagFromHash(window.location.hash) === 'ia-book-actions';

  @state() private entries: LogEntry[] = [];

  /**
   * Built when a control changes, not on every render. A fresh object on each
   * render would reset the element's loan state whenever the log updates.
   */
  @state() private status: LendingStatus = {};

  /**
   * Changes with each rebuild of the status, so the element is created anew.
   * An element that already shows a loan leaves its bar alone when the loan
   * expires, so it only shows the expired state on a fresh load.
   */
  @state() private statusVersion = 0;

  @state() private loanConfig: LoanRenewTimeConfig = LOAN_LENGTHS['2m'];

  private rootFontSizeBefore?: string;

  private originalFetch?: typeof window.fetch;

  private fetchStub?: typeof window.fetch;

  private previousAnalytics?: Window['archive_analytics'];

  private previousSentry?: Window['Sentry'];

  private modalManager?: HTMLElement;

  private navigationGuard?: (event: Event) => void;

  private readonly linkGuard = (event: MouseEvent): void => {
    const path = event.composedPath();
    const inBar = path.some(
      (target) =>
        target === this.modalManager ||
        (target instanceof HTMLElement &&
          target.localName === 'ia-book-actions'),
    );
    if (!inBar) return;

    const link = path.find(
      (target): target is HTMLAnchorElement =>
        target instanceof HTMLAnchorElement && target.href !== '',
    );
    if (!link) return;

    event.preventDefault();
    this.log('navigation', `Link to ${link.href} not followed`);
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.applyScenario();
    this.installFetchStub();
    this.installGlobalStubs();
    this.installModalManager();
    this.installNavigationGuards();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeNavigationGuards();
    this.removeModalManager();
    this.removeGlobalStubs();
    this.removeFetchStub();
    this.removeLoanCookies();
    this.restoreRootFontSize();
  }

  updated(): void {
    const root = document.documentElement.style;
    if (this.archiveFontSize && this.rootFontSizeBefore === undefined) {
      this.rootFontSizeBefore = root.fontSize;
      root.fontSize = ARCHIVE_ROOT_FONT_SIZE;
    } else if (!this.archiveFontSize) {
      this.restoreRootFontSize();
    }
  }

  private log(kind: LogKind, text: string): void {
    const time = new Date().toLocaleTimeString([], { hour12: false });
    this.entries = [{ time, kind, text }, ...this.entries].slice(
      0,
      MAX_LOG_ENTRIES,
    );
  }

  private installFetchStub(): void {
    const originalFetch = window.fetch;
    this.originalFetch = originalFetch;

    this.fetchStub = async (input, init) => {
      const body = init?.body;
      const action =
        body instanceof FormData ? String(body.get('action')) : undefined;
      const isLendingCall =
        init?.method?.toUpperCase() === 'POST' &&
        action !== undefined &&
        LENDING_ACTIONS.includes(action);
      if (!isLendingCall) return originalFetch.call(window, input, init);

      const url =
        typeof input === 'string'
          ? input
          : input instanceof URL
            ? input.href
            : input.url;
      const identifier = (body as FormData).get('identifier');
      // Hosts the element treats as test hosts get the page URL instead of
      // the lending service path.
      const target =
        new URL(url, window.location.href).href === window.location.href
          ? `${LOAN_SERVICE_PATH} (the page URL on a test host)`
          : url;
      this.log(
        'request',
        `POST ${target} action=${action} identifier=${identifier}`,
      );

      if (this.failRequests && FAILING_ACTIONS.includes(action!)) {
        // Rejecting the request fails it on every host. The element ignores a
        // stubbed response on test hosts but reports a rejected request.
        const failure = new Error(FAIL_MESSAGE);
        failure.toString = () => FAIL_MESSAGE;
        throw failure;
      }

      const response =
        action === 'renew_loan'
          ? { success: true, loan: { renewal: true } }
          : { success: true };
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    };
    window.fetch = this.fetchStub;
  }

  private removeFetchStub(): void {
    if (this.originalFetch && window.fetch === this.fetchStub) {
      window.fetch = this.originalFetch;
    }
    this.originalFetch = undefined;
    this.fetchStub = undefined;
  }

  private installGlobalStubs(): void {
    this.previousAnalytics = window.archive_analytics;
    window.archive_analytics = {
      send_event_no_sampling: (category, action, label, extraParams) => {
        const parts = [category, String(action), label, extraParams]
          .filter((part) => part !== undefined && part !== '')
          .map(String);
        this.log('analytics', parts.join(' | '));
      },
    };

    this.previousSentry = window.Sentry;
    window.Sentry = {
      captureMessage: (message) => this.log('sentry', message),
      captureException: (exception) =>
        this.log('sentry', `exception: ${String(exception)}`),
    };
  }

  private removeGlobalStubs(): void {
    if (this.previousAnalytics) {
      window.archive_analytics = this.previousAnalytics;
    } else {
      delete window.archive_analytics;
    }
    if (this.previousSentry) {
      window.Sentry = this.previousSentry;
    } else {
      delete window.Sentry;
    }
  }

  private installModalManager(): void {
    if (document.body.querySelector('modal-manager')) return;

    const manager = document.createElement('modal-manager');
    // The manager draws its backdrop even when closed, so it stays hidden
    // until a modal opens.
    manager.style.display = 'none';
    manager.addEventListener('modeChanged', (event) => {
      const { mode } = (event as CustomEvent<{ mode: string }>).detail;
      manager.style.display = mode === 'open' ? 'block' : 'none';
    });
    document.body.appendChild(manager);
    this.modalManager = manager;
  }

  private removeModalManager(): void {
    this.modalManager?.remove();
    this.modalManager = undefined;
  }

  private installNavigationGuards(): void {
    document.addEventListener('click', this.linkGuard, true);

    const navigation = (window as { navigation?: EventTarget }).navigation;
    if (!navigation) return;

    this.navigationGuard = (event: Event) => {
      const { destination } = event as NavigateEventLike;
      if (destination.sameDocument || !event.cancelable) return;
      if (new URL(destination.url).origin !== window.location.origin) return;

      event.preventDefault();
      this.log('navigation', `Page load to ${destination.url} cancelled`);
    };
    navigation.addEventListener('navigate', this.navigationGuard);
  }

  private removeNavigationGuards(): void {
    document.removeEventListener('click', this.linkGuard, true);

    const navigation = (window as { navigation?: EventTarget }).navigation;
    if (navigation && this.navigationGuard) {
      navigation.removeEventListener('navigate', this.navigationGuard);
    }
    this.navigationGuard = undefined;
  }

  /** Clears the cookies the loan analytics and admin access write. */
  private removeLoanCookies(): void {
    document.cookie.split(';').forEach((cookie) => {
      const name = decodeURIComponent(cookie.split('=')[0].trim());
      if (name.startsWith('br-browse-') || name === 'sticky-admin-access') {
        document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      }
    });
  }

  private restoreRootFontSize(): void {
    if (this.rootFontSizeBefore === undefined) return;
    document.documentElement.style.fontSize = this.rootFontSizeBefore;
    this.rootFontSizeBefore = undefined;
  }

  /** Rebuilds the lending status and loan timing from the controls. */
  private applyScenario(): void {
    const { loanTotalTime, loanRenewAtLast, pageChangedInLast } =
      LOAN_LENGTHS[this.loanLength];
    this.loanConfig = { loanTotalTime, loanRenewAtLast, pageChangedInLast };
    document.body.querySelector<IAModalManager>('modal-manager')?.closeModal();
    this.statusVersion += 1;
    this.status = {
      ...defaultLendingStatus,
      is_printdisabled: this.printDisabled,
      user_is_printdisabled: this.printDisabled,
      isAdmin: this.admin,
      ...SCENARIOS[this.scenario].status(loanTotalTime),
    };
  }

  private readonly onPostInit = (): void =>
    this.log('event', 'lendingBarPostInit called');

  private readonly onReloadPageImages = (): void =>
    this.log('event', 'reloadPageImages called');

  private onFailChange(event: Event): void {
    this.failRequests = (event.target as HTMLInputElement).checked;
  }

  private simulatePageTurn(): void {
    this.log('event', 'BookReader:userAction dispatched');
    window.dispatchEvent(new CustomEvent('BookReader:userAction'));
  }

  private selectRow(
    label: string,
    value: string,
    options: Record<string, { label: string }>,
    onChange: (value: string) => void,
  ) {
    return html`
      <tr>
        <td><label>${label}</label></td>
        <td>
          <select
            .value=${value}
            @change=${(event: Event) =>
              onChange((event.target as HTMLSelectElement).value)}
          >
            ${Object.entries(options).map(
              ([key, option]) =>
                html`<option value=${key} ?selected=${key === value}>
                  ${option.label}
                </option>`,
            )}
          </select>
        </td>
      </tr>
    `;
  }

  private checkRow(
    label: string,
    checked: boolean,
    onChange: (event: Event) => void,
  ) {
    return html`
      <tr>
        <td><label>${label}</label></td>
        <td>
          <input type="checkbox" .checked=${checked} @change=${onChange} />
        </td>
      </tr>
    `;
  }

  render() {
    return html`
      <story-template
        elementTag="ia-book-actions"
        elementClassName="IABookActions"
        .customExampleUsage=${EXAMPLE_USAGE}
        .styleInputData=${{ settings: styleInputSettings }}
        .propInputData=${{ settings: propInputSettings }}
      >
        ${keyed(
          this.statusVersion,
          html`<ia-book-actions
            slot="demo"
            .userid=${this.loggedIn ? '@brewster' : ''}
            .identifier=${'demo-book'}
            .bookTitle=${'Goody Two-Shoes'}
            .lendingStatus=${this.status}
            .loanRenewTimeConfig=${this.loanConfig}
            .loaderIcon=${'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
            .lendingBarPostInit=${this.onPostInit}
            .reloadPageImages=${this.onReloadPageImages}
            @IABookReader:BrowsingHasExpired=${() =>
              this.log('event', 'IABookReader:BrowsingHasExpired')}
            @lendingActionError=${(event: CustomEvent) =>
              this.log('event', `lendingActionError ${event.detail?.action}`)}
          ></ia-book-actions>`,
        )}

        <div slot="demo" class="log">
          <h4>What the element would have sent</h4>
          ${this.entries.length === 0
            ? html`<p class="empty">Nothing yet. Click an action.</p>`
            : html`<ul>
                ${this.entries.map(
                  (entry) =>
                    html`<li class=${entry.kind}>
                      <span class="time">${entry.time}</span>
                      <span class="kind">${entry.kind}</span>
                      <span class="text">${entry.text}</span>
                    </li>`,
                )}
              </ul>`}
        </div>

        <div slot="settings">
          <table>
            ${this.selectRow(
              'Lending status',
              this.scenario,
              SCENARIOS,
              (v) => {
                this.scenario = v;
                this.applyScenario();
              },
            )}
            ${this.selectRow(
              '1 hour loan length',
              this.loanLength,
              LOAN_LENGTHS,
              (v) => {
                this.loanLength = v;
                this.applyScenario();
              },
            )}
            ${this.checkRow('Logged in', this.loggedIn, (event) => {
              this.loggedIn = (event.target as HTMLInputElement).checked;
              this.applyScenario();
            })}
            ${this.checkRow('Admin', this.admin, (event) => {
              this.admin = (event.target as HTMLInputElement).checked;
              this.applyScenario();
            })}
            ${this.checkRow('Print disabled', this.printDisabled, (event) => {
              this.printDisabled = (event.target as HTMLInputElement).checked;
              this.applyScenario();
            })}
            ${this.checkRow(
              'Fail lending requests (not create_token)',
              this.failRequests,
              this.onFailChange,
            )}
            ${this.checkRow(
              'archive.org font size',
              this.archiveFontSize,
              (event) => {
                this.archiveFontSize = (
                  event.target as HTMLInputElement
                ).checked;
              },
            )}
          </table>
          <p>
            <button @click=${this.simulatePageTurn}>
              Simulate a BookReader page turn
            </button>
          </p>
          <p class="hint">
            Pick a 1 hour loan with a short length to reach the warning modal,
            the automatic renewal and the auto-return in under two minutes. Fail
            lending requests makes borrow, return, renew and waitlist calls
            fail. create_token still succeeds, since it repeats for as long as a
            loan is active. archive.org font size sets the page's root font size
            to 10px, which the bar is built for. It applies to the whole demo
            page, so it's on by default only when this element is the one being
            viewed.
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            Put a <code>modal-manager</code> on the page. The bar finds it by
            tag name and uses it for the loan warning and for errors. The bar
            sends loan actions to <code>/services/loans/loan</code>, so it
            belongs on archive.org or behind a proxy for it.
          </p>
          <p>
            This demo makes no requests to archive.org. Lending calls,
            analytics, Sentry reports and page loads are all caught and listed
            under the demo. The loan length presets stand in for the real loan,
            and the bar renews on page turns, so use the page turn button to
            renew.
          </p>
          <p>
            <code>lendingBarPostInit</code> is called once access to the book is
            confirmed, and is where the host starts BookReader. The
            <code>IABookReader:BrowsingHasExpired</code> event bubbles when a 1
            hour loan runs out. Sizes are in rem and assume the host page sets
            <code>html { font-size: 10px }</code>.
          </p>
        </div>
      </story-template>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .log {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background: #111;
        color: #9fef9f;
        font-family: monospace;
        font-size: 1.2rem;
        text-align: left;
      }

      .log h4 {
        margin: 0.25rem 0;
        color: #fff;
        font-family: sans-serif;
      }

      .log ul {
        margin: 0;
        padding: 0;
        max-height: 16rem;
        overflow-y: auto;
        list-style: none;
      }

      .log li {
        display: flex;
        gap: 0.75rem;
        padding: 0.15rem 0;
        border-top: 1px solid #333;
        overflow-wrap: anywhere;
      }

      .log .time {
        color: #888;
      }

      .log .kind {
        flex: 0 0 6rem;
        color: #8ec5ff;
      }

      .log li.sentry .kind {
        color: #f5b87a;
      }

      .log li.navigation .kind {
        color: #ff9aa2;
      }

      .log .empty {
        margin: 0.25rem 0;
      }

      td {
        padding-right: 1rem;
      }

      .hint {
        font-size: 1.2rem;
      }
    `;
  }
}
