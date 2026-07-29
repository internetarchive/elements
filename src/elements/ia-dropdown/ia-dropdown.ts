import {
  html,
  css,
  LitElement,
  TemplateResult,
  PropertyValues,
  CSSResultGroup,
} from 'lit';
import {
  property,
  query,
  customElement,
  queryAssignedElements,
} from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import themeStyles from '@src/themes/theme-styles';

import caretUp from './assets/caret-up';
import caretDown from './assets/caret-down';

export interface OptionInterface {
  url?: string;
  selectedHandler?: (option: OptionInterface) => void;
  label: string | TemplateResult;
  id: string;
}

@customElement('ia-dropdown')
export class IADropdown extends LitElement {
  /**
   * Determines whether the dropdown's option menu is currently visible.
   */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * Determines whether the main button and/or caret is disabled.
   */
  @property({ type: Boolean, reflect: true }) isDisabled = false;

  /**
   * Specifies whether a caret should be displayed beside the main button content.
   * Defaults to `false`.
   */
  @property({ type: Boolean }) displayCaret = false;

  /**
   * Specifies whether the dropdown should automatically close when an option is selected.
   *
   * Defaults to `false`, for backwards-compatibility.
   */
  @property({ type: Boolean }) closeOnSelect = false;

  /**
   * Specifies whether pressing the main button itself should open the dropdown. This does
   * not change the behavior of clicking the caret (if shown), which _always_ opens the dropdown
   * menu.
   *
   * Defaults to true, but can be disabled if only caret clicks should toggle the menu.
   */
  @property({ type: Boolean }) openViaButton = true;

  /**
   * Whether to use a popover element for the dropdown menu. Default false.
   */
  @property({ type: Boolean }) usePopover = false;

  /**
   * Specifies whether the currently-selected option should be shown in the dropdown menu.
   * When `true`, all options are always listed.
   * When `false`, only unselected options are listed.
   *
   * Defaults to `false`, for backwards-compatibility.
   */
  @property({ type: Boolean }) includeSelectedOption = false;

  @property({ type: String }) selectedOption = '';

  @property({ attribute: false }) options: OptionInterface[] = [];

  /**
   * Option group label for screen readers.
   */
  @property({ type: String }) optionGroup: string = 'options';

  @property({ attribute: false }) optionSelected = () => {};

  /**
   * Specifies whether the dropdown option list passed in as <slot>.
   */
  @property({ type: Boolean, reflect: true }) isCustomList = false;

  /**
   * Indicates whether mainbutton @click event overridden by ancestor
   * @click or custom event
   *
   * If true, prevents dropdown from opening, closing on main button click.
   * Also prevents dropdown from opening, closing on caret click, if displayCaret.
   *
   * Custom click handling needs to handle:
   * - enabling/disabling click events
   * - this.isDisabled property
   * - this.open property
   *   Suggest using the instance's open property from ancestor:
   *     @query('#custom-dropdown') customDropdown!: IADropdown;
   *     toggleDropdown = () => {
   *       this.customDropdown.open = !this.customDropdown.open
   *     }
   *   @see ia-dropdown-story.ts - the "My Lists" custom-list dropdown
   *
   * Allows loading options from an API on click before opening dropdown.
   */
  @property({ type: Boolean, reflect: true }) hasCustomClickHandler = false;

  /**
   * Specifies whether the dropdown should automatically close when the Esc key is pressed.
   * Defaults to `false`, for backwards-compatibility.
   */
  @property({ type: Boolean, reflect: true }) closeOnEscape = false;

  /**
   * Specifies whether the dropdown should close on clicks outside the dropdown menu.
   * Always closes when true, regardless of {@property hasCustomClickHandler}
   * Defaults to `false`, for backwards-compatibility.
   */
  @property({ type: Boolean, reflect: true }) closeOnBackdropClick = false;

  @query('.ia-dropdown-group') private container!: HTMLDivElement;

  @query('#dropdown-main') private dropdownMenu!: HTMLUListElement;

  @query('.click-main') private mainButton!: HTMLButtonElement;

  @queryAssignedElements({ slot: 'dropdown-label' })
  private mainButtonLabelSlotted!: HTMLElement[];

  // Lifecycle methods

  async firstUpdated(): Promise<void> {
    // Wait for the next tick to ensure that the dropdown is in the DOM
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    this.addEventListener('closeDropdown', this.closeOptions);
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('open')) {
      this.updatePopoverState();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback?.();
    this.removeKeyboardListener();
  }

  // Events

  // Add optional event listener to close dropdown when Esc key pressed
  private setupKeyboardListener(): void {
    if (this.closeOnEscape) {
      document.addEventListener('keydown', this.boundKeyboardListener);
    }
  }

  // Remove the Esc key listener for Esc key pressed
  private removeKeyboardListener(): void {
    if (this.closeOnEscape) {
      document.removeEventListener('keydown', this.boundKeyboardListener);
    }
  }

  // Event handlers

  // Handle Esc key pressed
  private boundKeyboardListener = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
      case 'Esc':
        this.closeOptions();
        break;
      default:
        break;
    }
  };

  get dropdownState(): string {
    if (this.open) {
      this.setupKeyboardListener();
      return 'open';
    }
    this.removeKeyboardListener();
    return 'closed';
  }

  private closeOptions = (e?: Event): void => {
    if (e && e.type === 'click') {
      e.stopPropagation();
    }
    this.open = false;
    this.updatePopoverState();
  };

  toggleOptions(): void {
    this.open = !this.open;
    this.updatePopoverState();
  }

  private updatePopoverState(): void {
    if (!this.usePopover) return;
    this.dropdownMenu?.togglePopover?.(this.open);
    if (this.open) this.positionDropdownMenu();
  }

  private positionDropdownMenu(): void {
    if (!this.dropdownMenu) return;
    const containerRect = this.container.getBoundingClientRect();
    this.dropdownMenu.style.left = `${containerRect.left}px`;
    this.dropdownMenu.style.top = `${containerRect.bottom}px`;
    this.dropdownMenu.style.minWidth = `${containerRect.width}px`;
  }

  private mainButtonClicked(): void {
    if (this.openViaButton) {
      this.toggleOptions();
    } else {
      // Refer the click to the button's first slotted child instead
      this.mainButtonLabelSlotted[0]?.click();
    }
  }

  private mainButtonKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      this.mainButtonClicked();
      e.preventDefault();
    }
  }

  private caretKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      this.toggleOptions();
      e.preventDefault();
    }
  }

  // Options

  /**
   * Sets the default OptionInterface[] options for the dropdown
   *
   * Options with different structure and behavior can be used
   * by passing in a custom list via <slot name="list">
   * and setting this.isCustomList = true
   *
   * @see ia-dropdown-story.ts - the "My Lists" custom-list dropdown
   */

  /**
   * Renders a single option with click event handler
   * @param availableOption {OptionInterface}
   * @returns
   */
  renderOption(availableOption: OptionInterface): TemplateResult {
    const { label, url = undefined, id } = availableOption;
    let component;
    const selected = this.selectedOption === id ? 'selected' : '';

    if (url) {
      component = html`<a
        href=${url}
        @click=${(e: Event) => this.optionClicked(e, availableOption)}
        >${label}</a
      >`;
    } else {
      component = html`<button
        @click=${(e: Event) => this.optionClicked(e, availableOption)}
      >
        ${label}
      </button>`;
    }

    return html`<li role="menuitem" class=${selected}>${component}</li>`;
  }

  optionClicked(e: Event, option: OptionInterface): void {
    e.stopPropagation();
    // Don't emit an event for reselecting the same option
    if (this.selectedOption !== option.id) {
      this.selectedOption = option.id;

      this.dispatchEvent(
        new CustomEvent('optionSelected', {
          detail: { option },
        }),
      );
      option.selectedHandler?.(option);
    }
    if (this.closeOnSelect) {
      this.closeOptions();
      this.mainButton.focus(); // Move focus to the main button if we're closing the menu
    }
  }

  get availableOptions(): OptionInterface[] {
    // If we're showing the selected option in the dropdown then _all_ options are available.
    if (this.includeSelectedOption) return this.options;

    // Otherwise, exclude the selected option
    return this.options.filter(
      (option) => this.selectedOption !== (option as OptionInterface).id,
    );
  }

  // Templates

  /**
   * Template for the "up" caret icon shown when the dropdown is open.
   * Renders its contents within a named "caret-up" slot so that custom icons
   * can be provided to override the default one.
   */
  private get caretUpTemplate(): TemplateResult {
    return html`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${caretUp}</slot>
      </span>
    `;
  }

  /**
   * Template for the "down" caret icon shown when the dropdown is closed.
   * Renders its contents within a named "caret-down" slot so that custom icons
   * can be provided to override the default one.
   */
  private get caretDownTemplate(): TemplateResult {
    return html`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${caretDown}</slot>
      </span>
    `;
  }

  /**
   * Renders up and down carets
   *
   * @event click caretClicked()
   * @event keydown caretKeyDown()
   *
   * @slot caret-up - Allow replacement of default up caret.
   * @slot caret-down - Allow replacement of default down caret.
   */
  get caretTemplate(): TemplateResult {
    if (!this.displayCaret) return html``;

    // When clicking the button has the same effect as the caret (opening the dropdown),
    // we just render the caret as inert content inside the button.
    if (this.openViaButton) {
      return html`
        <span class="caret" aria-hidden="true">
          ${this.caretUpTemplate} ${this.caretDownTemplate}
        </span>
      `;
    }

    // However, when clicking the button should _not_ open the dropdown, the caret
    // should instead be rendered as a standalone button as it is the only means of
    // controlling the dropdown state.
    return html`
      <button
        class="caret"
        aria-labelledby="caret-label"
        aria-haspopup="true"
        aria-expanded=${this.open}
        @click=${when(this.shouldAttachEventHandlers, () => this.toggleOptions)}
        @keydown=${when(
          this.shouldAttachEventHandlers,
          () => this.caretKeyDown,
        )}
        ?disabled=${this.isDisabled}
      >
        ${this.caretUpTemplate} ${this.caretDownTemplate}
      </button>
    `;
  }

  /**
   * Renders the dropdown menu, either as a list of options or as a custom list
   *
   * NOTE: tried to skip initial rendering of dropdown options with:
   *   if (!this.open) return html``;
   * This would also remove dropdown options from DOM on close.
   * But because options may have window events, this could create a memory leak.
   *
   * @slot list - Allow replacement of default {@interface OptionInterface} dropdown list.
   */
  get dropdownTemplate(): TemplateResult {
    if (this.isCustomList) {
      return html`<slot name="list"></slot>`;
    }
    return html`${this.availableOptions.map((o) => this.renderOption(o))}`;
  }

  /**
   * Optional template rendering transparent backdrop to capture clicks outside the
   * dropdown menu when open.
   *
   * @event click closeOptions()
   * @event keyup closeOptions()
   */
  private get backdropTemplate(): TemplateResult {
    if (!this.closeOnBackdropClick) return html``;
    if (!this.open) return html``;
    return html`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `;
  }

  /**
   * Whether the caret element should be nested inside the main button (as an inert icon).
   * If false, then the caret should be rendered as a separate button beside the main one.
   */
  private get shouldNestCaretInButton(): boolean {
    return this.openViaButton;
  }

  /**
   * Whether the main button (or caret, if main button is disabled) should have click and
   * keydown handlers attached to it.
   */
  private get shouldAttachEventHandlers(): boolean {
    return !this.isDisabled && !this.hasCustomClickHandler;
  }

  render() {
    return html`
      <div class="ia-dropdown-group ${this.open ? 'open' : ''}">
        <div class="button-row">
          <button
            class="click-main"
            aria-haspopup=${this.openViaButton}
            aria-expanded=${this.open}
            @click=${when(
              this.shouldAttachEventHandlers,
              () => this.mainButtonClicked,
            )}
            @keydown=${when(
              this.shouldAttachEventHandlers,
              () => this.mainButtonKeyDown,
            )}
            ?disabled=${this.isDisabled}
          >
            <span class="sr-only" id="caret-label"
              >Toggle ${this.optionGroup}</span
            >
            <slot name="dropdown-label"></slot>
            ${when(this.shouldNestCaretInButton, () => this.caretTemplate)}
          </button>
          ${when(!this.shouldNestCaretInButton, () => this.caretTemplate)}
        </div>

        <ul
          id="dropdown-main"
          class=${this.dropdownState}
          role="menu"
          ?popover=${this.usePopover}
        >
          ${this.dropdownTemplate}
        </ul>

        ${this.backdropTemplate}
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    const dropdownBorderWidth = css`var(--dropdownBorderWidth, 1px)`;
    const dropdownBorderRadius = css`var(--dropdownBorderRadius, 4px)`;
    const dropdownBorderColor = css`var(--dropdownBorderColor, #fff)`;
    const dropdownBgColor = css`var(--dropdownBgColor, #333)`;
    const dropdownTextColor = css`var(--dropdownTextColor, #fff)`;
    const dropdownHoverBgColor = css`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`;
    const dropdownSelectedBgColor = css`var(--dropdownSelectedBgColor, #fff)`;
    const dropdownMainButtonBgColor = css`var(--dropdownMainButtonBgColor, transparent)`;
    const dropdownTextAlign = css`var(--dropdownTextAlign, inherit)`;
    const dropdownBackdropZIndex = css`var(--dropdownBackdropZIndex, 1)`;
    const dropdownListZIndex = css`var(--dropdownListZIndex, 2)`;

    return [
      themeStyles,
      css`
        :host {
          display: inline;
          color: ${dropdownTextColor};
        }

        svg.caret-up-svg,
        svg.caret-down-svg,
        ::slotted(svg.caret-up-svg),
        ::slotted(svg.caret-down-svg) {
          fill: var(--dropdownCaretColor, #fff);
          vertical-align: middle;
        }

        .button-row {
          display: flex;
          height: 100%;
        }

        button.click-main {
          background: ${dropdownMainButtonBgColor};
          color: inherit;
          padding: var(--dropdownMainButtonPadding, 0px);
          border: var(--dropdownMainButtonBorder, none);
          border-radius: var(--dropdownMainButtonBorderRadius, none);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          align-content: center;
          flex-wrap: nowrap;
          flex-direction: var(--dropdownMainButtonFlexDirection, row);
        }

        .open button.click-main {
          /* When the dropdown is open, give the buttom the same z-index
           as the dropdown menu, so that it remains clickable despite
           the backdrop. */
          z-index: ${dropdownListZIndex};
        }

        button.click-main:disabled {
          pointer-events: none;
          cursor: not-allowed;
          opacity: 0.5;
          /* Disable text selection on disabled button */
          -webkit-user-select: none; /* Safari */
          -ms-user-select: none; /* IE 10 and IE 11 */
          user-select: none; /* Standard syntax */
        }

        button.click-main:hover {
          background-color: var(
            --dropdownMainButtonHoverBgColor,
            ${dropdownMainButtonBgColor}
          );
        }

        button.click-main:focus,
        button.click-main:focus-visible {
          background-color: var(
            --dropdownMainButtonFocusBgColor,
            ${dropdownMainButtonBgColor}
          );
        }

        button.click-main:active {
          background-color: var(
            --dropdownMainButtonActiveBgColor,
            ${dropdownMainButtonBgColor}
          );
        }

        button slot[name='dropdown-label'] {
          /* Set var to 0px for column layout */
          padding-right: var(--buttonSlotPaddingRight, 5px);
          display: inline-block;
        }

        .ia-dropdown-group {
          width: inherit;
          height: inherit;
          position: relative;
        }

        .sr-only {
          border: 0 !important;
          clip: rect(1px, 1px, 1px, 1px) !important;
          -webkit-clip-path: inset(50%) !important;
          clip-path: inset(50%) !important;
          height: 1px !important;
          margin: -1px !important;
          overflow: hidden !important;
          padding: 0 !important;
          position: absolute !important;
          width: 1px !important;
          white-space: nowrap !important;
          -webkit-user-select: none !important;
          user-select: none !important;
        }

        .caret {
          /* Maintain centered caret position but with a full-height clickable region */
          display: flex;
          align-self: stretch;
          align-items: center;
          padding: var(--caretPadding, 0px);
        }

        button.caret {
          appearance: none;
          background: none;
          border: none;
          cursor: pointer;
        }

        .caret svg {
          height: var(--caretHeight, 10px);
          width: var(--caretWidth, 20px);
        }

        #dropdown-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: transparent;
          z-index: ${dropdownBackdropZIndex};
        }

        ul {
          z-index: ${dropdownListZIndex};
        }

        #dropdown-main.closed {
          visibility: hidden;
          height: 1px;
          width: 1px;
        }

        #dropdown-main {
          position: var(--dropdownListPosition, absolute);
          list-style: none;
          margin: var(--dropdownOffsetTop, 5px) 0 0 0;
          padding: var(--dropdownPadding, 0);
          color: ${dropdownTextColor};
          background: ${dropdownBgColor};

          font-size: var(--dropdownFontSize, inherit);

          border-top: var(--dropdownBorderTopWidth, ${dropdownBorderWidth});
          border-right: var(--dropdownBorderRightWidth, ${dropdownBorderWidth});
          border-bottom: var(
            --dropdownBorderBottomWidth,
            ${dropdownBorderWidth}
          );
          border-left: var(--dropdownBorderLeftWidth, ${dropdownBorderWidth});
          /* Must be after border-width settings for specificity */
          border-style: solid;
          border-color: ${dropdownBorderColor};

          border-radius: var(
              --dropdownBorderTopLeftRadius,
              ${dropdownBorderRadius}
            )
            var(--dropdownBorderTopRightRadius, ${dropdownBorderRadius})
            var(--dropdownBorderBottomRightRadius, ${dropdownBorderRadius})
            var(--dropdownBorderBottomLeftRadius, ${dropdownBorderRadius});

          white-space: var(--dropdownWhiteSpace, normal);

          /* Prevent top/bottom inner li from overlapping inner border */
          overflow: hidden;
        }

        #dropdown-main li:hover {
          background-color: ${dropdownHoverBgColor};
          color: var(--dropdownHoverTextColor, #fff);
          list-style: none;
          cursor: pointer;
        }

        #dropdown-main li:hover:first-child {
          border-top-color: ${dropdownHoverBgColor};
        }

        ul#dropdown-main li:hover:last-child {
          border-bottom-color: ${dropdownHoverBgColor};
        }

        #dropdown-main li:hover:not(:first-child) {
          border-top: 0.5px solid var(--dropdownHoverTopBottomBorderColor, #333);
        }
        #dropdown-main li:hover:not(:last-child) {
          border-bottom: 0.5px solid
            var(--dropdownHoverTopBottomBorderColor, #333);
        }

        #dropdown-main li.selected:last-child {
          border-bottom-color: ${dropdownSelectedBgColor};
        }

        #dropdown-main li.selected:first-child {
          border-top-color: ${dropdownSelectedBgColor};
        }

        #dropdown-main li:hover > *,
        #dropdown-main li:focus-within > * {
          background-color: ${dropdownHoverBgColor};
          color: var(--dropdownHoverTextColor, #fff);
        }

        #dropdown-main li.selected > * {
          background-color: ${dropdownSelectedBgColor};
          color: var(--dropdownSelectedTextColor, #2c2c2c);
        }

        #dropdown-main li {
          background: ${dropdownBgColor};
          list-style: none;
          height: 30px;
          cursor: pointer;
          border-bottom: 0.5px solid ${dropdownBgColor};
          border-top: 0.5px solid ${dropdownBgColor};
        }

        #dropdown-main li button {
          background: none;
          color: inherit;
          border: none;
          font: inherit;
          cursor: pointer;
          outline: inherit;
        }

        #dropdown-main li a {
          text-decoration: none;
          display: block;
          box-sizing: border-box;
        }

        #dropdown-main li:first-child {
          border-top-left-radius: var(--dropdownBorderTopLeftRadius, 4px);
          border-top-right-radius: var(--dropdownBorderTopRightRadius, 4px);
        }

        #dropdown-main li:last-child {
          border-bottom-right-radius: var(
            --dropdownBorderBottomRightRadius,
            4px
          );
          border-bottom-left-radius: var(--dropdownBorderBottomLeftRadius, 4px);
        }

        /* cover the list with the label */
        #dropdown-main li > * > :first-child {
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          align-content: center;
          flex-wrap: nowrap;
          height: 100%;
          padding: var(--dropdownItemPaddingTop, 5px)
            var(--dropdownItemPaddingRight, 10px)
            var(--dropdownItemPaddingBottom, 5px)
            var(--dropdownItemPaddingLeft, 10px);
          box-sizing: border-box;
        }

        #dropdown-main li > * {
          width: 100%;
          height: inherit;
          color: ${dropdownTextColor};
          background: var(--dropdownItemButtonBgColor, transparent);
          padding: var(--dropdownItemButtonPadding, 0);
          text-align: ${dropdownTextAlign};
        }
      `,
    ];
  }
}
