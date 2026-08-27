import {
  css,
  html,
  LitElement,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import type { QuickSearchEntry } from './models';

import clearResultsIcon from './assets/clear-results';
import disclosureIcon from './assets/disclosure';
import magnifyingGlassIcon from './assets/magnifying-glass';

import './ia-quick-search';

/**
 * Event names emitted by this component
 */
const Events = {
  InputChange: 'inputchange',
  EnterKeyPressed: 'enterKeyPressed',
  SearchCleared: 'searchCleared',
  QuickSearchSelected: 'quickSearchSelected',
};

/**
 * A search bar with a quick search list that expands underneath it.
 */
@customElement('ia-expandable-search-bar')
export class IAExpandableSearchBar extends LitElement {
  /** Whether the quick search list is showing */
  @property({ type: Boolean }) isOpen = false;

  /** Whether to offer the disclosure button that opens the quick search */
  @property({ type: Boolean }) showsDisclosure = false;

  /** The current search text */
  @property({ type: String }) searchTerm = '';

  /** The suggestions to offer in the quick search list */
  @property({ type: Array }) quickSearches: QuickSearchEntry[] = [];

  /** Placeholder text for the input */
  @property({ type: String }) placeholder = msg('Search');

  /** The accessible name for the input */
  @property({ type: String }) label = msg('Search');

  @query('#search-input') private searchInput?: HTMLInputElement | null;

  render(): TemplateResult {
    return html`
      <div
        class="container ${this.isOpen ? 'is-open' : ''} ${this.showsDisclosure
          ? 'shows-disclosure'
          : ''}"
      >
        <div class="search-bar ${this.searchTerm === '' ? '' : 'is-searching'}">
          <div class="magnifier-container endcap">${magnifyingGlassIcon}</div>

          <input
            id="search-input"
            type="text"
            aria-label=${this.label}
            placeholder=${this.placeholder}
            .value=${this.searchTerm}
            @input=${this.handleInput}
            @keyup=${this.handleKeyUp}
          />

          <div class="clear-search-container endcap">
            <button
              id="clear-search-button"
              type="button"
              aria-label=${msg('Clear search')}
              @click=${this.clearSearch}
            >
              ${clearResultsIcon}
            </button>
          </div>

          <div class="disclosure-container endcap">
            <button
              id="disclosure-button"
              type="button"
              aria-label=${msg('Toggle quick search')}
              aria-expanded=${this.isOpen}
              @click=${this.toggleDisclosure}
            >
              ${disclosureIcon}
            </button>
          </div>
        </div>

        <div class="quick-search">
          <ia-quick-search
            .quickSearches=${this.quickSearches}
            @searchTermSelected=${this.quickSearchSelected}
          ></ia-quick-search>
        </div>
      </div>
    `;
  }

  /**
   * Forces the field to match `searchTerm`.
   *
   * Lit's property binding dirty-checks against the value it last committed
   * rather than against the DOM. A consumer that normalises `searchTerm` in
   * its own `inputchange` handler can land back on that committed value, so
   * the binding sees nothing to do and the field keeps whatever the listener
   * typed. Writing it here keeps the two in step.
   */
  updated(changedProperties: PropertyValues): void {
    if (!changedProperties.has('searchTerm') || !this.searchInput) return;

    this.searchInput.value = this.searchTerm;
  }

  /**
   * Tracks the input's value.
   *
   * Bound to `input` rather than `keyup` so that a paste from the mouse menu,
   * autofill, a drag-and-drop and an IME composition all register, and so that
   * arrow keys don't announce a change that never happened.
   */
  private handleInput(): void {
    if (!this.searchInput) return;

    this.searchTerm = this.searchInput.value;
    this.dispatchEvent(
      new CustomEvent<{ value: string }>(Events.InputChange, {
        detail: { value: this.searchTerm },
      }),
    );
  }

  private handleKeyUp(e: KeyboardEvent): void {
    if (e.key !== 'Enter') return;

    this.dispatchEvent(
      new CustomEvent<{ value: string }>(Events.EnterKeyPressed, {
        detail: { value: this.searchTerm },
      }),
    );
  }

  private clearSearch(): void {
    this.searchTerm = '';
    this.searchInput?.focus();
    this.dispatchEvent(new Event(Events.SearchCleared));
  }

  private quickSearchSelected(
    e: CustomEvent<{ searchEntry: QuickSearchEntry }>,
  ): void {
    const quickSearchEntry = e.detail.searchEntry;
    this.searchTerm = quickSearchEntry.displayText;

    this.dispatchEvent(
      new CustomEvent<{ quickSearchEntry: QuickSearchEntry }>(
        Events.QuickSearchSelected,
        { detail: { quickSearchEntry } },
      ),
    );

    // Closing the list hides the entry that was just activated. Focus has to
    // go somewhere first, or the browser drops it to the body and a keyboard
    // user lands back at the top of the page.
    this.searchInput?.focus();
    this.isOpen = false;
  }

  private toggleDisclosure(): void {
    this.isOpen = !this.isOpen;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        --search-bar-background-color--: var(
          --ia-theme-search-bar-background-color,
          #000
        );
        --search-bar-text-color--: var(--ia-theme-search-bar-text-color, #fff);
        --search-bar-font-size--: var(--ia-theme-search-bar-font-size, 1em);
        --search-bar-border--: var(
          --ia-theme-search-bar-border,
          1px solid #fff
        );
        --search-bar-min-width--: var(--ia-theme-search-bar-min-width, 5em);
        --search-bar-max-expansion-height--: var(
          --ia-theme-search-bar-max-expansion-height,
          150px
        );
        --search-bar-clear-disc-color--: var(
          --ia-theme-search-bar-clear-disc-color,
          #fff
        );
        --search-bar-clear-cross-color--: var(
          --ia-theme-search-bar-clear-cross-color,
          #000
        );

        color: var(--search-bar-text-color--);
      }

      .container {
        position: relative;
      }

      .search-bar {
        display: flex;
        justify-content: flex-start;
      }

      .endcap {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(var(--search-bar-font-size--) * 2);
        border: var(--search-bar-border--);
        padding: 0 calc(var(--search-bar-font-size--) / 2);
      }

      .endcap svg {
        height: var(--search-bar-font-size--);
        width: var(--search-bar-font-size--);
      }

      .clear-disc {
        fill: var(--search-bar-clear-disc-color--);
      }

      .clear-cross {
        stroke: var(--search-bar-clear-cross-color--);
      }

      .clear-search-container {
        border-left: 0;
        border-radius: 0 var(--search-bar-font-size--)
          var(--search-bar-font-size--) 0;
      }

      .search-bar.is-searching .clear-search-container {
        padding: 0 calc(var(--search-bar-font-size--) / 2) 0 0;
      }

      .search-bar.is-searching .clear-search-container button {
        display: block;
      }

      .clear-search-container button {
        display: none;
      }

      .magnifier-container {
        border-radius: var(--search-bar-font-size--) 0 0
          var(--search-bar-font-size--);
        border-right: 0;
      }

      .container.is-open .magnifier-container {
        border-radius: var(--search-bar-font-size--) 0 0 0;
      }

      .container.shows-disclosure .clear-search-container {
        border-radius: 0;
        border-right: 0;
      }

      .disclosure-container {
        border-radius: 0 var(--search-bar-font-size--)
          var(--search-bar-font-size--) 0;
        display: none;
      }

      .container.shows-disclosure .disclosure-container {
        display: flex;
      }

      .container.is-open .disclosure-container {
        border-radius: 0 var(--search-bar-font-size--) 0 0;
      }

      .disclosure-container button {
        border: 0;
        background: none;
      }

      #search-input {
        border-top: var(--search-bar-border--);
        border-bottom: var(--search-bar-border--);
        border-left: 0;
        border-right: 0;
        border-radius: 0;
        background-color: var(--search-bar-background-color--);
        color: var(--search-bar-text-color--);
        padding: 0;
        margin: 0;
        font-size: var(--search-bar-font-size--);
        flex: 1 1 auto;
        min-width: var(--search-bar-min-width--);
      }

      #search-input:focus {
        outline: none;
      }

      .quick-search {
        border-radius: 0 0 var(--search-bar-font-size--)
          var(--search-bar-font-size--);
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        background-color: var(--search-bar-background-color--);
        z-index: 1;
        max-height: var(--search-bar-max-expansion-height--);
        overflow-y: auto;
        scrollbar-width: none;
        padding: 0 calc(var(--search-bar-font-size--) / 2);
      }

      .quick-search::-webkit-scrollbar {
        display: none;
      }

      .container.is-open.shows-disclosure .quick-search {
        border: var(--search-bar-border--);
        border-top: 0;
        display: block;
      }

      button {
        background: none;
        border: none;
        margin: 0;
        padding: 0;
        color: inherit;
        cursor: pointer;
      }
    `;
  }
}
