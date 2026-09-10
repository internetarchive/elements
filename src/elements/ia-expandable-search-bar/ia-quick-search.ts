import {
  css,
  html,
  LitElement,
  type CSSResultGroup,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { QuickSearchEntry } from './models';

/**
 * Event names emitted by this component
 */
const Events = {
  SearchTermSelected: 'searchTermSelected',
};

/**
 * The list of suggested searches that drops out of the search bar.
 */
@customElement('ia-quick-search')
export class IAQuickSearch extends LitElement {
  /** The entries to offer */
  @property({ type: Array }) quickSearches: QuickSearchEntry[] = [];

  render(): TemplateResult {
    return html`
      <ul>
        ${this.quickSearches.map(
          (quickSearch, index) => html`
            <li>
              <button
                type="button"
                data-quick-search-index=${index}
                @click=${this.selectQuickSearch}
              >
                ${quickSearch.displayText}
              </button>
            </li>
          `,
        )}
      </ul>
    `;
  }

  /**
   * Reads the index off the button and emits the entry that was picked.
   *
   * Uses `currentTarget` rather than `target`, so the lookup still works if the
   * entry's text ever gains markup of its own for the click to land on.
   */
  private selectQuickSearch(e: Event): void {
    const { quickSearchIndex } = (e.currentTarget as HTMLElement).dataset;
    if (quickSearchIndex === undefined) return;

    const searchEntry = this.quickSearches[parseInt(quickSearchIndex, 10)];
    if (!searchEntry) return;

    this.dispatchEvent(
      new CustomEvent<{ searchEntry: QuickSearchEntry }>(
        Events.SearchTermSelected,
        {
          detail: { searchEntry },
          bubbles: true,
          composed: true,
        },
      ),
    );
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        --quick-search-list-padding--: var(
          --ia-theme-quick-search-list-padding,
          0 0 0.5em 0
        );
        --quick-search-list-item-padding--: var(
          --ia-theme-quick-search-list-item-padding,
          0.5em 0 0 0
        );
        --quick-search-link-color--: var(
          --ia-theme-quick-search-link-color,
          rgb(68, 132, 202)
        );
        --quick-search-link-decoration--: var(
          --ia-theme-quick-search-link-decoration,
          none
        );
      }

      ul {
        padding: var(--quick-search-list-padding--);
        margin: 0;
        list-style: none;
      }

      ul li {
        padding: var(--quick-search-list-item-padding--);
        margin: 0;
        display: block;
      }

      /*
        A button rather than a link, since picking an entry runs a search in
        place rather than navigating. Stripped back so it reads as plain text
        while staying focusable and keyboard-operable.
      */
      ul li button {
        display: block;
        width: 100%;
        padding: 0;
        border: none;
        background: none;
        font: inherit;
        text-align: left;
        color: var(--quick-search-link-color--);
        text-decoration: var(--quick-search-link-decoration--);
        cursor: pointer;
      }
    `;
  }
}
