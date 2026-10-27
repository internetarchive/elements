import {
  html,
  nothing,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement } from '@src/util/custom-element';

import ActionsHandler from './core/services/actions-handler/actions-handler';

import buttonBaseStyle from './assets/styles/ia-button';
import CollapsibleActionGroupStyle from './assets/styles/collapsible-action-group';

import { tabletContainerWidth } from './core/config/constants';
import { purchaseIcon } from './assets/data/purchase';
import { dropdownOpened, dropdownClosed } from './assets/data/dropdown-arrow';
import type {
  ActionClickDetail,
  ActionConfig,
  AnalyticsEvent,
  BorrowType,
} from './models';

@customElement('ia-book-actions-collapsible-action-group')
export class IABookActionsCollapsibleActionGroup extends ActionsHandler {
  @property({ type: String }) userid = '';

  @property({ type: String }) identifier = '';

  @property({ type: Array }) primaryActions: ActionConfig[] = [];

  @property({ type: Array }) secondaryActions: ActionConfig[] = [];

  @property({ type: String }) primaryColor = '';

  @property({ type: String }) dropdownState: 'open' | 'close' = 'close';

  @property({ type: Number }) width = 0;

  @property({ type: Boolean }) hasAdminAccess = false;

  @property({ attribute: false }) dropdownArrow: TemplateResult =
    dropdownClosed;

  @property({ type: Boolean }) disabled = false;

  @property({ type: String }) returnUrl = '';

  @property({ type: Boolean }) autoRenew = false;

  @property({ type: String }) loanRenewType = '';

  @property({ type: Boolean }) autoReturn = false;

  @property({ type: Boolean }) returnNow = false;

  /** The image shown while an action is in progress. */
  @property({ type: String }) loaderIcon =
    'https://archive.org/upload/images/tree/loading.gif';

  /** Set by the parent element. */
  borrowType?: BorrowType | null;

  initialButton = false;

  updated(changed: PropertyValues<this>): void {
    if (
      (changed.has('width') || changed.has('disabled')) &&
      this.isBelowTabletContainer
    ) {
      this.resetActions();
    }

    if (changed.has('autoRenew') && this.autoRenew) {
      this.dispatchLoanEvent('autoRenew', { renewType: this.loanRenewType });
    }

    const requestingAutoreturn = changed.has('autoReturn') && this.autoReturn;
    if (requestingAutoreturn) {
      this.dispatchLoanEvent('autoReturn');
    }

    if (changed.has('returnNow') && this.returnNow && !requestingAutoreturn) {
      this.dispatchLoanEvent('returnNow', { borrowType: 'browse' });
    }
  }

  /**
   * dispatch event when book is auto auto-renewed / auto-returned / returned
   * listen these events in actions-handler.ts to execute ajax call on petabox.
   * @see ActionsHandler
   *
   * @param event - autoRenew|autoReturn|returnNow
   */
  dispatchLoanEvent(
    event: 'autoRenew' | 'autoReturn' | 'returnNow',
    detail?: { renewType?: string; borrowType?: string },
  ): void {
    this.dispatchEvent(new CustomEvent(event, { detail }));
  }

  /**
   * merge primaryActions and secondaryActions into dropdown
   */
  resetActions(): void {
    // concat primaryActions and secondaryActions to draw in dropdown list
    if (this.primaryActions.length) {
      this.primaryActions = this.primaryActions.concat(this.secondaryActions);

      this.primaryColor = this.primaryActions[0].className;

      if (this.hasAdminAccess) {
        this.sortActionButtonOrder();
      }

      // remove secondaryActions
      this.secondaryActions = [];
    }
  }

  /**
   * re-sort primaryActions action list to show dropdown-only/mobile mode
   */
  sortActionButtonOrder(): void {
    let fromIndex = 1;
    const toIndex = 0;
    if (this.secondaryActions.length === 2) {
      fromIndex = 2;
    }

    fromIndex = this.primaryActions.length - fromIndex;

    const element = this.primaryActions[fromIndex];
    const current = this.primaryActions;

    current.splice(fromIndex, 1);
    current.splice(toIndex, 0, element);

    this.primaryActions = current;
  }

  render() {
    return html`
      <div
        class="${classMap({
          actiongroup: true,
          disabled: this.disabled,
        })}"
      >
        ${this.getLoaderIcon}
        <section class="action-buttons primary">
          ${this.renderPrimaryActions}
        </section>
        <section class="action-buttons secondary">
          ${this.renderSecondaryActions}
        </section>
      </div>
    `;
  }

  get renderPrimaryActions() {
    if (this.primaryActions.length === 0) return nothing;

    if (this.dropdownState === 'close') {
      this.primaryColor = this.primaryActions[0].className;
    }

    // If its single action, let just not show dropdown list
    if (this.primaryActions.length === 1) {
      return this.initialActionTemplate;
    }

    return html`
      ${this.initialActionTemplate}
      <button
        class="ia-button ${this.primaryColor} down-arrow"
        @click=${this.toggleDropdown}
      >
        ${this.dropdownArrow}
      </button>

      <ul class="dropdown-content ${this.dropdownState}">
        ${this.getPrimaryItems}
      </ul>
    `;
  }

  get renderSecondaryActions() {
    if (!this.secondaryActions.length) return nothing;

    return this.secondaryActions.map((action) =>
      this.renderActionButton(action),
    );
  }

  /**
   * Render action as a link for secondary actions like admin, printdisability links.
   * @param action
   * @param initialButton
   */
  renderActionLink(action: ActionConfig, initialButton = false) {
    return html`<span class="${this.getDeviceType} ${action.className}">
      <a
        class="ia-button ${action.className} ${initialButton ? 'initial' : ''}"
        href="${action.url}"
        target=${action.target}
        @click=${() => {
          this.clickHandler(
            action.id,
            action.analyticsEvent,
            action?.borrowType,
          );
        }}
      >
        ${action.id === 'purchaseBook' ? purchaseIcon : ''} ${action.text}
        <small>${action.subText}</small>
      </a>
    </span>`;
  }

  /**
   * Render action as a button for primary actions like browse, borrow, join waitlist etc...
   * @param action
   * @param initialButton
   */
  renderActionButton(action: ActionConfig, initialButton = false) {
    if (action.url) return this.renderActionLink(action, initialButton);
    const { analyticsEvent } = action;
    return html`<button
      class="ia-button ${action.className} ${initialButton ? 'initial' : ''}"
      @click=${() => {
        this.clickHandler(action.id, analyticsEvent, action?.borrowType);
      }}
    >
      ${action.text}
    </button>`;
  }

  /**
   * Dispatches click events when patron clicks on action buttons
   * @param eventName actions like 'browseBook', 'borrowBook' etc...
   * @param gaEvent contains analytics event action and category
   * @param borrowType browse|borrow
   * @fires CollapsibleActionGroup#{eventName} - (will be browseBook, borrowBook etc...)
   */
  clickHandler(
    eventName: string,
    gaEvent?: AnalyticsEvent,
    borrowType = '',
  ): void {
    this.dropdownState = 'close';
    this.dropdownArrow = dropdownClosed;

    if (!gaEvent || !eventName) return;
    const { category, action } = gaEvent;
    this.dispatchEvent(
      new CustomEvent<ActionClickDetail>(eventName, {
        detail: {
          event: { category, action },
          borrowType,
        },
      }),
    );
  }

  /**
   * get first primary action to render just before dropdown button
   */
  get initialActionTemplate() {
    this.initialButton = false;
    if (this.primaryActions.length > 1) {
      this.initialButton = true;
    }

    return this.renderActionButton(this.primaryActions[0], this.initialButton);
  }

  get getPrimaryItems() {
    return this.primaryActions
      .slice(1)
      .map(
        (action) =>
          html`<li>${this.renderActionButton(action, this.initialButton)}</li>`,
      );
  }

  /**
   * get loader icon when task is in-progress
   */
  get getLoaderIcon() {
    return html`<img
      class="${classMap({
        actionloader: true,
        disabled: this.disabled,
      })}"
      alt=""
      src="${this.loaderIcon}"
    />`;
  }

  /**
   * check if device is below tablet
   */
  get isBelowTabletContainer(): boolean {
    return this.width <= tabletContainerWidth;
  }

  /**
   * get device type as per container width
   * @returns mobile | desktop
   */
  get getDeviceType(): 'mobile' | 'desktop' {
    return this.isBelowTabletContainer ? 'mobile' : 'desktop';
  }

  /**
   * toggle dropdown and its icon state
   */
  toggleDropdown(): void {
    if (this.dropdownState === 'open') {
      this.dropdownState = 'close';
      this.dropdownArrow = dropdownClosed;
      this.primaryColor = this.primaryActions[0].className;
    } else {
      this.dropdownState = 'open';
      this.dropdownArrow = dropdownOpened;
      this.primaryColor = 'dark';
    }
  }

  static get styles(): CSSResultGroup {
    return [buttonBaseStyle, CollapsibleActionGroupStyle];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-book-actions-collapsible-action-group': IABookActionsCollapsibleActionGroup;
  }
}
