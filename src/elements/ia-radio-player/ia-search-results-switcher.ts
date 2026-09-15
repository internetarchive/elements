import {
  css,
  html,
  LitElement,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg, str } from '@lit/localize';

import nextResultIcon from './assets/next-result';
import previousResultIcon from './assets/previous-result';

/**
 * Event names emitted by this component
 */
const Events = {
  SearchResultIndexChanged: 'searchResultIndexChanged',
};

/**
 * Steps through search results, reading `‹ 3 / 7 ›`.
 *
 * Both ends wrap around, so there is always somewhere to go.
 */
@customElement('ia-search-results-switcher')
export class IASearchResultsSwitcher extends LitElement {
  /** How many results there are to step through */
  @property({ type: Number }) numberOfResults = 0;

  /** Which result is being looked at, counting from zero */
  @property({ type: Number }) currentResultIndex = 0;

  render(): TemplateResult {
    return html`
      <div class="container">
        <button
          id="previous-button"
          type="button"
          aria-label=${msg('Previous search result')}
          @click=${this.goToPreviousResult}
        >
          ${previousResultIcon}
        </button>

        <span class="results-range">
          <span id="current-result">${this.currentResultIndex + 1}</span> /
          <span id="number-of-results">${this.numberOfResults}</span>
        </span>

        <button
          id="next-button"
          type="button"
          aria-label=${msg('Next search result')}
          @click=${this.goToNextResult}
        >
          ${nextResultIcon}
        </button>
      </div>

      <!--
        The counter above is two bare numbers, which say nothing on their own.
        This says what they mean, and being a live region it is announced each
        time the reader moves between results.
      -->
      <div class="sr-only" role="status">${this.positionLabel}</div>
    `;
  }

  updated(changedProperties: PropertyValues): void {
    // A new set of results starts at the first one.
    if (changedProperties.has('numberOfResults')) this.currentResultIndex = 0;
  }

  /** Steps back one result, wrapping round to the last. */
  goToPreviousResult(): void {
    this.currentResultIndex =
      this.currentResultIndex < 1
        ? this.numberOfResults - 1
        : this.currentResultIndex - 1;

    this.emitSearchResultIndexChanged();
  }

  /** Steps on one result, wrapping round to the first. */
  goToNextResult(): void {
    this.currentResultIndex =
      this.currentResultIndex === this.numberOfResults - 1
        ? 0
        : this.currentResultIndex + 1;

    this.emitSearchResultIndexChanged();
  }

  private get positionLabel(): string {
    const position = this.currentResultIndex + 1;
    const total = this.numberOfResults;

    return msg(str`Search result ${position} of ${total}`);
  }

  private emitSearchResultIndexChanged(): void {
    this.dispatchEvent(
      new CustomEvent<{ searchResultIndex: number }>(
        Events.SearchResultIndexChanged,
        { detail: { searchResultIndex: this.currentResultIndex } },
      ),
    );
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        --search-switcher-color--: var(--ia-theme-search-switcher-color, #fff);

        color: var(--search-switcher-color--);
      }

      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
      }

      button {
        background: none;
        border: 0;
        padding: 0;
        color: inherit;
        cursor: pointer;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `;
  }
}
