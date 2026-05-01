import { msg } from '@lit/localize';
import { css, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { IaClearableTextInput } from '@internetarchive/ia-clearable-text-input';
import type { optionInterface } from '@internetarchive/ia-dropdown';
import type {
  AdvancedSearchStyle,
  SearchCategory,
  SearchRequestedDetail,
} from './models';

import themeStyles from '@src/themes/theme-styles';
import searchIcon from './search.svg';

import '@internetarchive/ia-clearable-text-input';
import '@internetarchive/ia-dropdown';
import '@src/elements/ia-status-indicator/ia-status-indicator';

/**
 * Event names emitted by this component
 */
const Events = {
  AdvancedSearchClicked: 'advancedSearchClicked',
  CategoryChanged: 'categoryChanged',
  SearchRequested: 'searchRequested',
};

@customElement('ia-dropdown-search-bar')
export class IADropdownSearchBar extends LitElement {
  /** ID used for the special Advanced Search dropdown option */
  static readonly ADVANCED_SEARCH_OPTION_ID = '__advanced_search__';

  /** The query that appears in the search bar */
  @property({ type: String }) query?: string;

  /** Dropdown menu options (tab IDs + labels) */
  @property({ type: Array }) categories: SearchCategory[] = [];

  /** The currently selected dropdown category ID */
  @property({ type: String }) selectedCategory = 'all';

  /** The base URL for internal navigation within the site */
  @property({ type: String }) navBaseUrl?: string;

  /**
   * Where to display the Advanced Search option:
   * - `link` (default): as a text link below the search bar
   * - `dropdown`: as an item at the bottom of the category dropdown
   * - `none`: hidden entirely
   */
  @property({ type: String }) advancedSearchStyle: AdvancedSearchStyle = 'link';

  /** Placeholder text for the search input */
  @property({ type: String }) placeholder = msg('Search');

  /** Whether to use the mobile layout */
  @property({ type: Boolean }) useMobileView = false;

  /** Whether to hide the category dropdown to the left of the search bar */
  @property({ type: Boolean }) hideDropdown = false;

  /** Whether the search button should show its loading state */
  @property({ type: Boolean }) loading = false;

  @query('#search-input')
  private searchInput!: IaClearableTextInput;

  render(): TemplateResult {
    return html`
      <div id="container" part="container" role="search">
        <div
          id="main-bar"
          part="main-bar"
          class=${this.hideDropdown ? 'no-dropdown' : nothing}
        >
          ${this.hideDropdown ? nothing : this.dropdownTemplate}
          ${this.textBoxTemplate} ${this.searchButtonTemplate}
        </div>
        ${this.searchLinksTemplate}
      </div>
    `;
  }

  /**
   * Template for the category dropdown on the left side of the search bar.
   */
  private get dropdownTemplate(): TemplateResult {
    return html`
      <ia-dropdown
        id="category-dropdown"
        part="category-dropdown"
        displayCaret
        includeSelectedOption
        closeOnSelect
        closeOnEscape
        closeOnBackdropClick
        openViaButton
        .selectedOption=${this.selectedCategory}
        .options=${this.dropdownOptions}
        @optionSelected=${this.handleCategorySelected}
      >
        <span slot="dropdown-label">${this.selectedCategoryLabel}</span>
      </ia-dropdown>
    `;
  }

  /**
   * Template for the main text entry box of the search bar.
   */
  private get textBoxTemplate(): TemplateResult {
    return html`
      <ia-clearable-text-input
        id="search-input"
        part="search-input"
        .value=${this.spacedQuery}
        placeholder=${this.placeholder}
        clearButtonScreenReaderLabel=${msg('Clear search query')}
        screenReaderLabel=${msg(
          'Search the Archive. Filters and Advanced Search available below.',
        )}
        @clear=${this.searchFieldCleared}
        @submit=${this.handleSubmit}
      ></ia-clearable-text-input>
    `;
  }

  /**
   * Template for the "magnifying glass" search button to the right of the search bar.
   */
  private get searchButtonTemplate(): TemplateResult {
    return html`
      <button
        id="search-button"
        part="search-button"
        class=${this.loading ? 'loading' : nothing}
        type="button"
        aria-label=${msg('Search')}
        @click=${this.handleSubmit}
      >
        ${this.loading
          ? html`<ia-status-indicator
              mode="loading"
              class="search-button-loading-icon"
            ></ia-status-indicator>`
          : html`<img src=${searchIcon} alt="" />`}
      </button>
    `;
  }

  /**
   * Converts the `categories` array into the `optionInterface[]` format
   * expected by `ia-dropdown`.
   */
  private get dropdownOptions(): optionInterface[] {
    const options: optionInterface[] = this.categories.map((cat) => ({
      id: cat.id,
      label: html`<span>${cat.label}</span>`,
    }));

    if (
      this.advancedSearchStyle === 'dropdown' &&
      this.navBaseUrl !== undefined
    ) {
      options.push({
        id: IADropdownSearchBar.ADVANCED_SEARCH_OPTION_ID,
        // Add a separator border above the Advanced Search option
        label: html`<span style="border-top: 1px solid #999;">
          ${msg('Go to Advanced Search...')}
        </span>`,
      });
    }

    return options;
  }

  /**
   * Builds the Advanced Search URL using the given query string and the
   * provided `navBaseUrl`. Returns `undefined` if no `navBaseUrl` is set.
   */
  private buildAdvancedSearchUrl(query: string): string | undefined {
    if (this.navBaseUrl === undefined) return undefined;
    const queryArg = query ? `?q=${encodeURIComponent(query)}` : '';
    return `${this.navBaseUrl}/advancedsearch.php${queryArg}`;
  }

  /**
   * The display label for the currently selected category.
   */
  private get selectedCategoryLabel(): string {
    const match = this.categories.find((c) => c.id === this.selectedCategory);
    return match?.label ?? this.selectedCategory;
  }

  /**
   * The current search query with +'s replaced by spaces.
   */
  private get spacedQuery(): string {
    return this.query?.replace(/\+/g, ' ') ?? '';
  }

  /**
   * Template for the search links area beneath the search bar
   * (Advanced Search link and any slotted content).
   */
  private get searchLinksTemplate(): TemplateResult {
    return html`
      <div id="search-links-area">
        <slot name="before-search-links"></slot>
        <div
          id="search-links"
          part="search-links"
          class=${this.useMobileView ? 'mobile' : ''}
        >
          <slot name="search-links-top"></slot>
          ${this.advancedSearchTemplate}
          <div id="search-links-end">
            <slot name="search-links"></slot>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Template for the "Advanced Search" link.
   *
   * Uses the `advancedSearchUrl` prop as href if one is provided. Otherwise, it
   * builds a link using the `navBaseUrl` and current query.
   */
  private get advancedSearchTemplate(): TemplateResult | typeof nothing {
    if (this.advancedSearchStyle !== 'link') return nothing;

    const href = this.buildAdvancedSearchUrl(this.query ?? '');
    if (!href) return nothing;

    return html`<a
      id="advanced-search-link"
      part="advanced-search-link"
      href=${href}
      @click=${this.advancedSearchClicked}
    >
      ${msg('Advanced Search')}
    </a>`;
  }

  /**
   * Handler for when the search bar's clear button is pressed.
   */
  private searchFieldCleared(): void {
    if (this.query) {
      this.emitSearchRequested();
    }
  }

  /**
   * Handler for Enter key or search button click.
   */
  private handleSubmit(): void {
    this.emitSearchRequested();
  }

  /**
   * Handler for when the user selects a category from the dropdown.
   *
   * Sets `selectedCategory` locally for immediate visual feedback (semi-controlled
   * pattern). The parent also binds this property and may re-set it on re-render.
   */
  private handleCategorySelected(
    e: CustomEvent<{ option: optionInterface }>,
  ): void {
    const newCategoryId = e.detail.option.id;

    if (newCategoryId === IADropdownSearchBar.ADVANCED_SEARCH_OPTION_ID) {
      this.navigateToAdvancedSearch();
      return;
    }

    if (newCategoryId === this.selectedCategory) return;

    this.selectedCategory = newCategoryId;

    // On next tick, focus the text input bar (seemingly fails in Safari without the delay)
    setTimeout(() => this.searchInput.focus());

    this.dispatchEvent(
      new CustomEvent<string>(Events.CategoryChanged, {
        detail: newCategoryId,
      }),
    );
  }

  /**
   * Navigates the browser to the Advanced Search page with the current query.
   */
  private navigateToAdvancedSearch(): void {
    // Schedule a re-render so ia-dropdown resets its internal selectedOption
    // back to the real category (in case navigation is delayed or prevented)
    this.requestUpdate();

    const query = this.searchInput?.value ?? this.query ?? '';
    const href = this.buildAdvancedSearchUrl(query);
    if (!href) return;

    this.advancedSearchClicked();
    window.location.href = href;
  }

  /**
   * Handler for clicks on the advanced search link/option
   */
  private advancedSearchClicked(): void {
    this.dispatchEvent(new CustomEvent(Events.AdvancedSearchClicked));
  }

  /**
   * Emits a `searchRequested` event with the current query and category.
   */
  private emitSearchRequested(): void {
    this.dispatchEvent(
      new CustomEvent<SearchRequestedDetail>(Events.SearchRequested, {
        detail: {
          query: this.searchInput.value,
          category: this.selectedCategory,
        },
      }),
    );
  }

  static get styles() {
    const ownStyles = css`
      :host {
        --clear-button-offset--: var(--clear-button-offset, 0);
        --search-bar-height--: var(--search-bar-height, 30px);
        --search-bar-width--: var(--search-bar-width, 300px);
        --search-bar-internal-padding--: var(
          --search-bar-internal-padding,
          5px
        );
      }

      #container {
        display: inline-block;
        width: var(--search-bar-width--);
      }

      #main-bar {
        display: flex;
        height: var(--search-bar-height--, 30px);
        margin-bottom: 10px;
        flex: 1;
      }

      #category-dropdown {
        display: flex;
        flex-shrink: 0;
        height: 100%;
        box-sizing: border-box;

        background-color: #f5f5f7;
        border: 1px solid #999;
        border-radius: 5px 0 0 5px;

        --dropdownMainButtonPadding: 0 var(--search-bar-internal-padding--, 5px);
        --dropdownBgColor: #2c2c2c;
        --dropdownTextColor: #fff;
        --dropdownBorderColor: #ddd;
        --dropdownCaretColor: var(--ia-theme-primary-text-color, #2c2c2c);
        --dropdownHoverBgColor: rgba(255, 255, 255, 0.3);
        --dropdownHoverTextColor: #fff;
        --dropdownSelectedBgColor: rgba(255, 255, 255, 0.3);
        --dropdownSelectedTextColor: #fff;
        --dropdownWhiteSpace: nowrap;
        --dropdownOffsetTop: 2px;
        --caretHeight: 8px;
        --caretWidth: 12px;
        --caretPadding: 0 0 0 5px;
        --dropdownFontSize: inherit;
        --dropdownBorderRadius: 4px;
        --buttonSlotPaddingRight: 0;
        --dropdownTextAlign: left;
      }

      #category-dropdown [slot='dropdown-label'] {
        color: var(--ia-theme-primary-text-color, #2c2c2c);
        font-size: inherit;
        font-family: inherit;
        white-space: nowrap;
      }

      .no-dropdown #search-input {
        border-left: 1px solid #999;
        border-radius: 5px 0 0 5px;
        overflow: hidden;
      }

      #search-input {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-top: 1px solid #999;
        border-bottom: 1px solid #999;
        font-size: inherit;

        --input-height: calc(var(--search-bar-height--) - 2px);
        --input-padding: 0 var(--search-bar-internal-padding--, 5px);
        --input-background-color: var(
          --ia-theme-secondary-background-color,
          #fff
        );
        --input-border-radius: 0;
        --input-border-width: 0;
        --input-box-shadow: none;
        --input-focused-box-shadow: none;
        --input-font-size: auto;
        --clear-button-top: var(--clear-button-offset--, 0);
        --clear-button-right: 2px;
      }

      #search-button {
        appearance: none;
        box-sizing: border-box;
        border-radius: 0 5px 5px 0;
        background-color: var(--ia-theme-secondary-background-color, #fff);
        border: 1px solid #999;
        border-left: 0;
        padding: 0 var(--search-bar-internal-padding--, 5px) 0 5px;
        min-width: 30px;
        height: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      #search-button img {
        width: 18px;
        height: 18px;
      }

      .search-button-loading-icon {
        --icon-width: 20px;
        margin-top: 2px;
      }

      #search-links-area {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-top: 5px;
        font-size: inherit;
      }

      #search-links {
        display: flex;
        column-gap: 10px;
        width: 100%;
      }

      #search-links > a:not(:last-child) {
        margin-bottom: 2px;
      }

      #advanced-search-link {
        margin-left: auto;
        padding-left: 5px;
      }

      #search-links-end {
        display: contents;
      }

      .mobile #advanced-search-link {
        margin-left: 0;
      }

      .mobile #search-links-end {
        display: flex;
        margin-left: auto;
        column-gap: 10px;
      }

      a:link {
        text-decoration: none;
        display: block;
        flex: 0 1 auto;
        color: var(--ia-theme-link-color, #4b64ff);
        white-space: nowrap;
      }

      a:hover {
        text-decoration: underline;
      }

      a:visited {
        color: var(--ia-theme-link-color, #4b64ff);
      }

      ::slotted(#action-bar-spacing) {
        --iconLabelGutterWidth: 3px;
        margin-top: -4px; /* Better icon alignment */
        height: fit-content;
      }
    `;

    return [themeStyles, ownStyles];
  }
}
