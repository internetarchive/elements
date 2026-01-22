import {
  html,
  LitElement,
  nothing,
  TemplateResult,
  CSSResultGroup,
  css,
  PropertyValues,
} from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { when } from 'lit/directives/when.js';
import { msg } from '@lit/localize';

import {
  hasAnyOf,
  isSubsequence,
  type IAComboBoxBehavior,
  type IAComboBoxFilterFunction,
  type IAComboBoxFilterOption,
  type IAComboBoxFilterPreset,
  type IAComboBoxOption,
} from './models';

import caretClosedIcon from './caret-closed.svg';
import caretOpenIcon from './caret-open.svg';
import clearIcon from './clear.svg';

/**
 * Map from filter preset keys to their associated filtering function.
 * @see {@linkcode IAComboBox.filter}
 */
const FILTER_PRESETS: Record<IAComboBoxFilterPreset, IAComboBoxFilterFunction> =
  {
    all: () => true,
    prefix: (filterText, optionText) => optionText.startsWith(filterText),
    suffix: (filterText, optionText) => optionText.endsWith(filterText),
    substring: (filterText, optionText) => optionText.includes(filterText),
    subsequence: isSubsequence,
  };

const DEFAULT_BEHAVIOR: IAComboBoxBehavior = 'list';
const DEFAULT_FILTER_PRESET: IAComboBoxFilterPreset = 'substring';

const STRING_IDENTITY_FN = (str: string): string => str;
const STRING_LOWER_CASE_FN = (str: string): string => str.toLocaleLowerCase();

/**
 * A flexible component combining the features of a dropdown menu and a text input,
 * allowing users to either select from a predefined list of options or type
 * freeform text to filter down & find specific options.
 */
@customElement('ia-combo-box')
export class IAComboBox extends LitElement {
  /**
   * Array of options representing values that this combo box can take.
   *
   * If this combo box's `behavior` property is `select-only` or `list`, these options
   * represent _all_ of the allowed values that the user may choose from.
   *
   * If this combo box's `behavior` property is `freeform`, this array simply represents
   * a non-exhaustive list of _suggested_ values, which the user may either choose from
   * or enter their own value.
   * @see {@linkcode IAComboBox.behavior}
   */
  @property({ type: Array }) options: IAComboBoxOption[] = [];

  /**
   * Optional placeholder text to display in the combo box when no option is selected.
   */
  @property({ type: String }) placeholder?: string;

  /**
   * What style of behavior to use for the combo box.
   *
   * Currently, the options are
   *  - `select-only` (behaving similar to a `<select>`, disallowing text entry and only
   * allowing selection from the predefined, unfiltered options)
   *  - `list` (the default, allowing text entry to filter the dropdown list, but still
   * requiring values to be set from the predefined options)
   *  - `freeform` (allows text entry to filter the dropdown list, and also allows setting
   * custom values not included in the list)
   */
  @property({ type: String }) behavior: IAComboBoxBehavior = DEFAULT_BEHAVIOR;

  /**
   * Maximum number of options to include in the autocomplete menu when filtering.
   *
   * Default value is `Infinity`, presenting all matching options regardless of count.
   */
  @property({ type: Number, attribute: 'max-autocomplete-entries' })
  maxAutocompleteEntries = Number.POSITIVE_INFINITY;

  /**
   * Specifies how the options should be filtered when text is entered into the combo box.
   * Has no effect if `behavior` is `select-only`, as the component is not text-editable.
   *
   * Default is `substring`, showing only options whose `text` contains the value entered
   * as a substring at any position. The possible preset options are:
   *  - `all`: Does not filter the dropdown entries. They will always all be shown (up to
   * the limit specified by `maxAutocompleteEntries`).
   *  - `prefix`: Only includes options whose text _starts_ with the entered value.
   *  - `suffix`: Only includes options whose text _ends_ with the entered value.
   *  - `substring`: Only includes options whose text contains the entered value as a
   * contiguous substring.
   *  - `subsequence`: Only shows options whose text has the characters of the entered
   * value in order, though they do not need to be contiguous.
   * E.g., `ace` is a subsequence of `archive` (but not a substring).
   *
   * If custom filtering outside of these presets is desired, an arbitrary filtering function
   * may instead be bound to this property directly.
   *
   * @see {@link IAComboBox.caseSensitive} to enable case-sensitive filtering.
   */
  @property({ type: String }) filter: IAComboBoxFilterOption =
    DEFAULT_FILTER_PRESET;

  /**
   * Whether filtering should be case-sensitive. Default is `false`, performing only
   * case-insensitive filtering.
   */
  @property({ type: Boolean, reflect: true, attribute: 'case-sensitive' })
  caseSensitive = false;

  /**
   * Whether the filtered options should be listed in lexicographically-sorted order,
   * respecting the current `caseSensitive` setting.
   * Default is `false`, displaying them in the same order as the provided options array.
   */
  @property({ type: Boolean, reflect: true }) sort = false;

  /**
   * Whether the combo box allows multiple options to be selected at once.
   * Default is `false`, allowing only a single option to be selected.
   */
  // @property({ type: Boolean, reflect: true }) multiple = false; // TODO

  /**
   * Whether pressing the Up/Down arrow keys should wrap focus back to the text input box
   * while focus is already on the first/last option, respectively.
   *
   * Default is `false`, doing nothing upon such key presses.
   */
  @property({ type: Boolean, reflect: true, attribute: 'wrap-arrow-keys' })
  wrapArrowKeys = false;

  /**
   * Whether the options list should remain open after an option is selected.
   *
   * Default is `false`, closing the options list when a selection is made.
   */
  @property({ type: Boolean, reflect: true, attribute: 'stay-open' })
  stayOpen = false;

  /**
   * Whether the combo box shows a clear button when a value is selected.
   * Default is `false`.
   */
  @property({ type: Boolean, reflect: true }) clearable = false;

  /**
   * Whether the combo box's option menu is currently expanded. Default is `false`.
   */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * Whether the combo box should be rendered in its disabled state, preventing all
   * interactions such as editing the text field or opening the options menu.
   * Default is `false`.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * If used within a form, whether this combo box is required to have a value selected
   * before the form may be submitted. Default is `false`.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * For `select-only` or `list` behavior, this value is the ID of the selected option,
   * or `null` if there is no selection.
   *
   * For `freeform` behavior, this may be any string entered into the text field, and
   * need not correspond to an option ID.
   */
  @property({ type: String }) value: string | null = null;

  /**
   * Whether any part of this component currently has focus.
   */
  @state() private hasFocus = false;

  /**
   * Which option in the dropdown menu is currently highlighted by the user. Not to be
   * confused with the _selected_ option that has been committed, this field only
   * represents the user's current navigation state within the menu, which they may
   * subsequently select by, e.g., hitting Enter.
   */
  @state() private highlightedOption: IAComboBoxOption | null = null;

  /**
   * The text than has been entered into the text input box.
   */
  @state() private enteredText: string = '';

  /**
   * The text that we are currently using the filter the dropdown menu options.
   */
  @state() private filterText: string = '';

  @query('#main-widget-row') private mainWidgetRow!: HTMLDivElement;

  @query('#text-input') private textInput!: HTMLInputElement;

  @query('#caret-button') private caretButton!: HTMLInputElement;

  @query('#options-list') private optionsList!: HTMLUListElement;

  static formAssociated = true;

  private internals: ElementInternals;

  /**
   * Set when part of the component blurs, and cleared when any part of it is focused.
   * If still set on the next tick after a blur event, this serves as a signal that focus
   * has moved away from the component as a whole and should be closed.
   */
  private losingFocus = false;

  /**
   * A cache of the mapping from option IDs to their corresponding options, so that
   * we can more efficiently look up options by ID.
   */
  private optionsByID: Map<string, IAComboBoxOption> = new Map();

  /**
   * A cache of the values against which each option should be filtered, to minimize
   * the work needed at filter time to handle case-insensitivity etc.
   */
  private optionFilteringValues: Map<IAComboBoxOption, string> = new Map();

  /**
   * A cache of the current set of options that is pre-sorted if the component's
   * `sort` flag is set, or as provided otherwise. Just ensures we don't have to
   * sort all the options again every time we filter them.
   */
  private optionsRespectingSortFlag: IAComboBoxOption[] = [];

  /**
   * A cache of the current set of filtered options, so that we don't have to
   * recalculate it unnecessarily whenever the component is opened/closed/etc.
   */
  private filteredOptions: IAComboBoxOption[] = [];

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  render(): TemplateResult | typeof nothing {
    return html`
      <div
        id="container"
        class=${classMap({ focused: this.hasFocus })}
        part="container"
      >
        ${this.labelTemplate}
        <div
          id="main-widget-row"
          class=${classMap({ disabled: this.disabled })}
          part="combo-box"
        >
          ${this.textInputTemplate}
          ${this.clearable ? this.clearButtonTemplate : nothing}
          ${this.caretButtonTemplate}
        </div>
        ${this.optionsListTemplate}
      </div>
    `;
  }

  willUpdate(changed: PropertyValues): void {
    if (changed.has('options') || changed.has('caseSensitive')) {
      // Need to update the cached values against which our filters are matched
      this.rebuildOptionFilteringValues();
    }

    if (changed.has('options')) {
      // Need to update the cached mapping of IDs to options
      this.rebuildOptionIDMap();
    }

    if (changed.has('options') || changed.has('sort')) {
      // Sort the options upfront if needed
      this.rebuildSortedOptions();
    }

    if (
      hasAnyOf(changed, [
        'options',
        'behavior',
        'maxAutocompleteEntries',
        'filter',
        'filterText',
        'caseSensitive',
        'sort',
      ])
    ) {
      // If anything about the options or how they are filtered has changed, we need to
      // update our cache of the filtered options
      this.rebuildFilteredOptions();
    }

    if (changed.has('value')) {
      this.handleValueChanged();
    }

    if (changed.has('open')) {
      if (this.open) {
        // Highlight selection on open, if possible
        if (this.value) this.setHighlightedOption(this.selectedOption);
      } else {
        // Clear highlight on close
        this.setHighlightedOption(null);
      }
    }

    if (changed.has('required')) {
      this.updateFormValidity();
    }
  }

  updated(changed: PropertyValues): void {
    if (changed.has('open')) {
      if (this.open) {
        this.positionOptionsMenu();
        this.optionsList.showPopover?.();
        this.optionsList.classList.add('visible');
      } else {
        this.optionsList.hidePopover?.();
        this.optionsList.classList.remove('visible');
      }
    }
  }

  //
  // TEMPLATES
  //

  /**
   * Template for the main label for the combo box.
   *
   * Uses the contents of the `label` named slot as the label text.
   */
  private get labelTemplate(): TemplateResult {
    return html`
      <label id="label" for="text-input">
        <slot name="label"></slot>
      </label>
    `;
  }

  /**
   * Template for the text input field that users can edit to filter the available
   * options or (if freeform behavior) to enter a custom value.
   */
  private get textInputTemplate(): TemplateResult {
    const textInputClasses = classMap({
      editable: this.behavior !== 'select-only',
    });

    return html`
      <input
        type="text"
        id="text-input"
        class=${textInputClasses}
        .value=${live(this.enteredText)}
        placeholder=${ifDefined(this.placeholder)}
        part="text-input"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-controls="options-list"
        aria-expanded=${this.open}
        aria-activedescendant=${ifDefined(this.highlightedOption?.id)}
        ?disabled=${this.disabled}
        ?required=${this.required}
        @click=${this.handleComboBoxClick}
        @keydown=${this.handleComboBoxKeyDown}
        @input=${this.handleTextBoxInput}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      />
    `;
  }

  /**
   * Template for the clear button that is shown when the `clearable` property
   * is true.
   */
  private get clearButtonTemplate(): TemplateResult {
    return html`
      <button
        type="button"
        id="clear-button"
        class=${classMap({ visible: this.shouldShowClearButton })}
        part="clear-button"
        tabindex="-1"
        @click=${this.handleClearButtonClick}
      >
        <span class="sr-only">${msg('Clear')}</span>
        <slot name="clear-button">
          <img class="icon" src=${clearIcon}>
        </slot>
      </button>
    `;
  }

  /**
   * Template for the caret open/closed icons to show beside the text input.
   * The icons are wrapped in named slots to allow consumers to override them.
   */
  private get caretTemplate(): TemplateResult {
    return html`
      <slot name="caret-closed" ?hidden=${this.open}>
        <img class="icon" src=${caretClosedIcon}>
      </slot>
      <slot name="caret-open" ?hidden=${!this.open}>
        <img class="icon" src=${caretOpenIcon}>
      </slot>
    `;
  }

  /**
   * Template for the caret button to be shown beside the text input.
   */
  private get caretButtonTemplate(): TemplateResult {
    return html`
      <button
        type="button"
        id="caret-button"
        part="caret-button"
        tabindex="-1"
        aria-controls="options-list"
        aria-expanded=${this.open}
        ?disabled=${this.disabled}
        @click=${this.handleComboBoxClick}
        @keydown=${this.handleComboBoxKeyDown}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
        ${this.caretTemplate}
      </button>
    `;
  }

  /**
   * Template for the options list that is displayed when the combo box is open.
   */
  private get optionsListTemplate(): TemplateResult {
    return html`
      <ul
        id="options-list"
        part="options-list"
        role="listbox"
        popover
        ?hidden=${!this.open}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
        <slot name="options-list-top"></slot>
        ${when(this.open, () => this.optionTemplates)}
        <slot name="options-list-bottom"></slot>
      </ul>
    `;
  }

  /**
   * Array of templates for all of the filtered options to be shown in the options menu.
   */
  private get optionTemplates(): TemplateResult[] {
    // If there are no options matching the filter, just show a message saying as much.
    if (this.filteredOptions.length === 0 && this.maxAutocompleteEntries > 0) {
      return [this.emptyOptionsTemplate];
    }

    // Otherwise build a list item for each filtered option
    return this.filteredOptions.map((opt) => {
      const optionClasses = classMap({
        option: true,
        highlight: opt === this.highlightedOption,
      });

      return html`
        <li
          id=${opt.id}
          class=${optionClasses}
          part="option"
          tabindex="-1"
          @pointerenter=${this.handleOptionPointerEnter}
          @pointermove=${this.handleOptionPointerMove}
          @click=${this.handleOptionClick}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        >
          ${opt.content ?? opt.text}
        </li>
      `;
    });
  }

  /**
   * Info message shown in the listbox when no options match the entered text.
   * Renders within an `empty-options` named slot so that its content can be customized.
   */
  private get emptyOptionsTemplate(): TemplateResult {
    return html`
      <li id="empty-options" part="empty-options">
        <slot name="empty-options">${msg('No matching options')}</slot>
      </li>
    `;
  }

  //
  // EVENT HANDLERS & MUTATORS
  //

  /**
   * Handler for when the pointer device enters an option element in the dropdown.
   */
  private handleOptionPointerEnter(e: PointerEvent): void {
    this.handleOptionPointerMove(e);
  }

  /**
   * Handler for when the pointer device is moved within an option in the dropdown.
   */
  private handleOptionPointerMove(e: PointerEvent): void {
    const target = e.target as HTMLLIElement;
    const option = this.getOptionFor(target.id);
    if (option) this.setHighlightedOption(option);
  }

  /**
   * Handler for when the user clicks on an option in the dropdown.
   */
  private handleOptionClick(e: PointerEvent): void {
    const target = e.target as HTMLLIElement;
    const option = this.getOptionFor(target.id);
    if (option) {
      this.setSelectedOption(option.id);
      this.closeOptionsMenu();
    }
  }

  /**
   * Handler for `keydown` events on various special keys.
   */
  private handleComboBoxKeyDown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'Enter':
        this.handleEnterPressed();
        break;
      case 'Escape':
        this.handleEscapePressed();
        break;
      case 'ArrowUp':
        if (e.altKey) {
          this.handleAltUpArrowPressed();
        } else {
          this.handleUpArrowPressed();
        }
        break;
      case 'ArrowDown':
        if (e.altKey) {
          this.handleAltDownArrowPressed();
        } else {
          this.handleDownArrowPressed();
        }
        break;
      case 'Tab':
        this.textInput.focus();
        return;
      default:
        // Do nothing and allow propagation otherwise
        return;
    }

    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * Handler for `input` events in the text input box.
   */
  private async handleTextBoxInput(): Promise<void> {
    this.enteredText = this.textInput.value;
    this.setFilterText(this.textInput.value);
    this.openOptionsMenu();

    await this.updateComplete;
    this.highlightFirstOption();
  }

  /**
   * Handler for when the Enter key is pressed
   */
  private handleEnterPressed(): void {
    // Just open the options menu if it's currently closed
    if (!this.open) {
      this.openOptionsMenu();
      return;
    }

    if (this.highlightedOption) {
      // If an option is highlighted, select it
      this.setSelectedOption(this.highlightedOption.id);
    } else if (this.behavior === 'freeform') {
      // Otherwise, in the freeform behavior we just accept the current value regardless
      this.setValue(this.enteredText);
    }

    // Close the options list if needed
    if (!this.stayOpen) this.open = false;
  }

  /**
   * Handler for when the Escape key is pressed
   */
  private handleEscapePressed(): void {
    // Close the options menu if it's currently open
    if (this.open) {
      this.closeOptionsMenu();
      return;
    }

    // Otherwise, deselect any selected option & clear any filter text
    this.clearSelectedOption();
  }

  /**
   * Handler for when the Up Arrow key is pressed (without modifiers).
   * @see {@linkcode handleAltUpArrowPressed()} for behavior under the Alt modifier.
   */
  private handleUpArrowPressed(): void {
    if (!this.open) this.openOptionsMenu();
    this.highlightPreviousOption();
  }

  /**
   * Handler for when the Down Arrow key is pressed (without modifiers).
   * @see {@linkcode handleAltDownArrowPressed()} for behavior under the Alt modifier.
   */
  private handleDownArrowPressed(): void {
    if (!this.open) this.openOptionsMenu();
    this.highlightNextOption();
  }

  /**
   * Handler for when the Alt + Up Arrow key combo is pressed
   */
  private handleAltUpArrowPressed(): void {
    this.closeOptionsMenu();
  }

  /**
   * Handler for when the Alt + Down Arrow key combo is pressed
   */
  private handleAltDownArrowPressed(): void {
    this.openOptionsMenu();
  }

  /**
   * Handler for clicks on the combo box input field or caret button.
   */
  private handleComboBoxClick(): void {
    this.toggleOptionsMenu();
  }

  /**
   * Handler for when the clear button is clicked.
   */
  private handleClearButtonClick(): void {
    this.clearSelectedOption();
  }

  /**
   * Handler for when any part of the combo box receives focus.
   */
  private handleFocus(): void {
    if (this.behavior === 'select-only') {
      this.caretButton.focus();
    } else {
      this.textInput.focus();
    }
    this.hasFocus = true;
    this.losingFocus = false;
  }

  /**
   * Handler for when any part of the combo box loses focus.
   */
  private handleBlur(): void {
    this.hasFocus = false;
    this.losingFocus = true;
    setTimeout(() => {
      if (this.losingFocus && !this.shadowRoot?.activeElement) {
        this.losingFocus = false;
        this.closeOptionsMenu();

        if (this.behavior === 'list') {
          if (this.selectedOption) this.setTextValue(this.selectedOption.text);
        } else if (this.behavior === 'freeform') {
          this.setValue(this.enteredText);
        }
      }
    }, 0);
  }

  /**
   * Handler for when the `value` of this component is changed externally
   */
  private handleValueChanged(): void {
    if (this.behavior !== 'freeform' && this.value !== null) {
      // The value must correspond to a valid option or null
      if (!this.getOptionFor(this.value)) this.clearSelectedOption();
    }
  }

  /**
   * Highlights the first option shown in the filtered list.
   */
  private highlightFirstOption(): void {
    this.setHighlightedOption(this.firstFilteredOption);
  }

  /**
   * Highlights the last option shown in the filtered list.
   */
  private highlightLastOption(): void {
    this.setHighlightedOption(this.lastFilteredOption);
  }

  /**
   * Highlights the option before the currently highlighted one in the list, or the last one
   * if none is highlighted.
   */
  private highlightPreviousOption(): void {
    const { filteredOptions, lastFilteredIndex } = this;

    // If no option is highlighted yet, highlight the last one
    if (!this.highlightedOption) {
      this.highlightLastOption();
      return;
    }

    // Otherwise, move to the previous option (wrapping if needed)
    const { highlightedIndex } = this;
    const previousIndex =
      this.wrapArrowKeys && highlightedIndex === 0
        ? lastFilteredIndex // Wrap around to the end
        : Math.max(highlightedIndex - 1, 0);
    this.setHighlightedOption(filteredOptions[previousIndex]);
  }

  /**
   * Highlights the option after the currently highlighted one in the list, or the first one
   * if none is highlighted.
   */
  private highlightNextOption(): void {
    const { filteredOptions, lastFilteredIndex } = this;

    // If no option is highlighted yet, highlight the first one
    if (!this.highlightedOption) {
      this.highlightFirstOption();
      return;
    }

    // Otherwise, move to the next option (wrapping if needed)
    const { highlightedIndex } = this;
    const nextIndex =
      this.wrapArrowKeys && highlightedIndex === lastFilteredIndex
        ? 0 // Wrap back to the start
        : Math.min(highlightedIndex + 1, lastFilteredIndex);
    this.setHighlightedOption(filteredOptions[nextIndex]);
  }

  /**
   * Highlights the given option and scrolls it into view if necessary.
   * If `null` is provided, any current highlight will be cleared.
   */
  private async setHighlightedOption(
    option: IAComboBoxOption | null,
  ): Promise<void> {
    this.highlightedOption = option;
    await this.updateComplete;

    const { optionsList, highlightedElement } = this;
    if (!highlightedElement) return;

    // TODO: Not ideal as this will trigger a reflow...
    // But may not be an issue in practice given the highlight isn't changing in a hot loop.
    // If we have issues with this let's see if we can hook up an IntersectionObserver.
    const elmtRect = highlightedElement.getBoundingClientRect();
    const listRect = optionsList.getBoundingClientRect();
    if (elmtRect.top < listRect.top || elmtRect.bottom > listRect.bottom) {
      highlightedElement.scrollIntoView({ block: 'nearest' });
    }
  }

  /**
   * Changes this combo box's selected option to the one matching the specified ID.
   *
   * Throws a `RangeError` if given an ID that does not correspond to any option
   * held by this combo box.
   */
  setSelectedOption(id: string): void {
    const option = this.getOptionFor(id);
    if (!option) throw new RangeError('Unknown option ID');

    const prevValue = this.value;
    this.value = option.id;
    this.internals.setFormValue(this.value);
    this.setTextValue(option.text);
    if (this.value !== prevValue) this.emitChangeEvent();

    // Invoke the option's select callback if defined
    option.onSelected?.(option);
  }

  /**
   * Clears any currently selected option from this combo box, setting it to null
   * and clearing any value in the text box.
   */
  clearSelectedOption(): void {
    const prevValue = this.value;
    this.value = null;
    this.internals.setFormValue(this.value);
    this.setTextValue('');
    if (this.value !== prevValue) this.emitChangeEvent();
  }

  /**
   * Set this combo box's value to the given string if possible.
   *
   * In `freeform` behavior, this always succeeds.
   *
   * In other behavior modes, this method is identical to `setSelectedOption`,
   * interpreting the input as an option ID and throwing an error if no such
   * option exists.
   *
   * @see {@linkcode IAComboBox.setSelectedOption}
   */
  setValue(value: string): void {
    if (this.behavior === 'freeform') {
      const prevValue = this.value;
      this.value = value;
      this.internals.setFormValue(this.value);
      this.setTextValue(value);
      if (this.value !== prevValue) this.emitChangeEvent();
    } else {
      this.setSelectedOption(value);
    }
  }

  /**
   * Changes the value of the text input box, and updates the filter accordingly.
   */
  private setTextValue(value: string): void {
    this.textInput.value = value;
    this.enteredText = value;
    this.setFilterText(value);
  }

  /**
   * Sets the current filter text based on the provided string. The resulting filter
   * text might not exactly match the provided value, depending on the current case
   * sensitivity.
   */
  private setFilterText(baseFilterText: string): void {
    const { caseTransform } = this;
    this.filterText = caseTransform(baseFilterText);
  }

  openOptionsMenu(): void {
    this.open = true;
    this.emitToggleEvent();
  }

  closeOptionsMenu(): void {
    this.open = false;
    this.emitToggleEvent();
  }

  toggleOptionsMenu(): void {
    this.open = !this.open;
    this.emitToggleEvent();
  }

  private updateFormValidity(): void {
    if (this.required && !this.value) {
      this.internals.setValidity(
        { valueMissing: true },
        msg('A value is required'),
      );
    } else {
      // All good
      this.internals.setValidity({});
    }
  }

  private emitChangeEvent(): void {
    this.dispatchEvent(
      new CustomEvent<string | null>('change', {
        detail: this.value,
      }),
    );
  }

  private emitToggleEvent(): void {
    this.dispatchEvent(
      new CustomEvent<boolean>('toggle', {
        detail: this.open,
      }),
    );
  }

  //
  // HELPERS
  //

  private get shouldShowClearButton(): boolean {
    return this.clearable && !!this.enteredText;
  }

  /**
   * Sets the size and position of the options menu to match the size and position of
   * the combo box widget. Prefers to position below the main widget, but will flip
   * to the top if needed & if there's more room above.
   */
  private positionOptionsMenu(): void {
    const { mainWidgetRow, optionsList } = this;
    const mainWidgetRect = mainWidgetRow.getBoundingClientRect();

    const { innerHeight, scrollX, scrollY } = window;
    const usableHeightAbove = mainWidgetRect.top;
    const usableHeightBelow = innerHeight - mainWidgetRect.bottom;

    // We still want to respect any CSS var specified by the consumer
    const maxHeightVar = 'var(--comboBoxListMaxHeight, 250px)';

    const optionsListStyles: Record<string, string> = {
      top: `${mainWidgetRect.bottom + scrollY}px`,
      left: `${mainWidgetRect.left + scrollX}px`,
      width: `var(--comboBoxListWidth, ${mainWidgetRect.width}px)`,
      maxHeight: `min(${usableHeightBelow}px, ${maxHeightVar})`,
    };

    Object.assign(optionsList.style, optionsListStyles);

    // Wait a tick for it to appear, then check if we should flip it upwards instead
    setTimeout(() => {
      const listRect = optionsList.getBoundingClientRect();
      const overflowingViewport = listRect.bottom >= innerHeight;
      const moreSpaceAbove = usableHeightAbove > usableHeightBelow;
      if (overflowingViewport && moreSpaceAbove) {
        optionsList.style.top = 'auto';
        optionsList.style.bottom = `${innerHeight - mainWidgetRect.top - scrollY}px`;
        optionsList.style.maxHeight = `min(${usableHeightAbove}px, ${maxHeightVar})`;
      }
    }, 0);
  }

  /**
   * A function to transform option & filter text based on the combo box's
   * current case sensitivity.
   */
  private get caseTransform(): (text: string) => string {
    return this.caseSensitive ? STRING_IDENTITY_FN : STRING_LOWER_CASE_FN;
  }

  /**
   * Returns the combo box option having the given ID, or null if none exists.
   */
  private getOptionFor(id: string): IAComboBoxOption | null {
    return this.optionsByID.get(id) ?? null;
  }

  /**
   * Clears any previously-cached mapping of IDs to options, and rebuilds the
   * map based on the current set of options.
   */
  private rebuildOptionIDMap(): void {
    this.optionsByID.clear();
    for (const option of this.options) {
      this.optionsByID.set(option.id, option);
    }
  }

  /**
   * Applies any required sort to the options and caches the result to be used
   * at filter/display time.
   */
  private rebuildSortedOptions(): void {
    if (this.sort) {
      this.optionsRespectingSortFlag = this.options.sort((a, b) => {
        const aValue = this.optionFilteringValues.get(a) as string;
        const bValue = this.optionFilteringValues.get(b) as string;
        return aValue.localeCompare(bValue);
      });
    } else {
      this.optionsRespectingSortFlag = this.options;
    }
  }

  /**
   * Clears any previously-cached option filtering values, and rebuilds the
   * map based on the current component properties.
   */
  private rebuildOptionFilteringValues(): void {
    this.optionFilteringValues.clear();

    const { caseTransform } = this;
    for (const option of this.options) {
      const filteringValue = caseTransform(option.text);
      this.optionFilteringValues.set(option, filteringValue);
    }
  }

  /**
   * Returns the filtered array of options by applying the specified filter function
   * with the current filter text, up to the limit specified by `maxAutocompleteEntries`.
   */
  private rebuildFilteredOptions(): void {
    // We don't want to filter the results in select-only mode
    const resolvedFilterOption =
      this.behavior === 'select-only' ? 'all' : this.filter;

    const filterFn =
      typeof resolvedFilterOption === 'string'
        ? FILTER_PRESETS[resolvedFilterOption]
        : resolvedFilterOption;

    const filtered = this.optionsRespectingSortFlag
      .filter((opt) => {
        const optionFilteringValue = this.optionFilteringValues.get(opt);
        if (!optionFilteringValue) return false;

        return filterFn(this.filterText, optionFilteringValue, opt);
      })
      .slice(0, this.maxAutocompleteEntries);

    this.filteredOptions = filtered;
  }

  /**
   * The first option appearing in the filtered list, or null if there are none.
   */
  private get firstFilteredOption(): IAComboBoxOption | null {
    return this.filteredOptions[0] ?? null;
  }

  /**
   * The last option appearing in the filtered list, or null if there are none.
   */
  private get lastFilteredOption(): IAComboBoxOption | null {
    return this.filteredOptions[this.lastFilteredIndex] ?? null;
  }

  /**
   * The index of the last filtered option, or -1 if no options match the filter.
   */
  private get lastFilteredIndex(): number {
    return this.filteredOptions.length - 1;
  }

  /**
   * The IAComboBoxOption that is currently selected, or null if none is selected.
   */
  get selectedOption(): IAComboBoxOption | null {
    if (this.value == null) return null;
    return this.getOptionFor(this.value);
  }

  /**
   * The index of the currently highlighted option in the filtered list, or -1 if
   * no option is currently highlighted.
   */
  private get highlightedIndex(): number {
    if (!this.highlightedOption) return -1;
    return this.filteredOptions.indexOf(this.highlightedOption);
  }

  /**
   * The HTML element representing the currently-highlighted option, or null if
   * no option is highlighted.
   */
  private get highlightedElement(): HTMLElement | null {
    if (!this.highlightedOption) return null;
    return this.shadowRoot!.getElementById(this.highlightedOption.id);
  }

  static get styles(): CSSResultGroup {
    return css`
      #container {
        display: inline-block;
        width: var(--combo-box-width, auto);
      }

      #label {
        display: block;
        width: fit-content;
      }

      #main-widget-row {
        display: inline-flex;
        align-items: stretch;
        flex-wrap: nowrap;
        background: white;
        border: 1px solid black;
        width: 100%;
      }

      .focused #main-widget-row {
        outline: black auto 1px;
        outline-offset: 3px;
      }

      #text-input {
        appearance: none;
        background: transparent;
        border: none;
        padding: var(--combo-box-padding, 5px);
        padding-right: 0;
        width: 100%;
        font-size: inherit;
        outline: none;
      }

      #text-input:not(.editable) {
        cursor: pointer;
      }

      #clear-button,
      #caret-button {
        display: inline-flex;
        align-items: center;
        appearance: none;
        background: transparent;
        border: none;
        padding: var(--combo-box-padding, 5px) 5px;
        outline: none;
        cursor: pointer;
      }

      #clear-button {
        visibility: hidden;
      }

      #clear-button.visible {
        visibility: visible;
      }

      #options-list {
        position: absolute;
        list-style-type: none;
        margin: 1px 0 0;
        border: none;
        padding: 0;
        background: white;
        max-height: 400px;
        box-shadow: 0 0 1px 1px #ddd;
        opacity: 0;
        transition: opacity 0.125s ease;
      }

      #options-list.visible {
        opacity: 1;
      }

      #empty-options {
        padding: 5px;
        color: #606060;
        font-style: italic;
        text-align: center;
      }

      .icon {
        width: 14px;
        height: 14px;
      }

      .option {
        padding: 5px;
        cursor: pointer;
      }

      .highlight {
        background-color: #dbe0ff;
      }

      .disabled,
      .disabled * {
        cursor: not-allowed !important;
      }

      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        margin: -1px !important;
        padding: 0 !important;
        border: 0 !important;
        overflow: hidden !important;
        white-space: nowrap !important;
        clip: rect(1px, 1px, 1px, 1px) !important;
        -webkit-clip-path: inset(50%) !important;
        clip-path: inset(50%) !important;
        user-select: none !important;
      }
    `;
  }
}
