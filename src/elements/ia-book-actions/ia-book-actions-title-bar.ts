import { css, html, type CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';

import {
  analyticsCategories,
  analyticsActions,
} from './core/config/analytics-event-and-category';
import ActionsHandler from './core/services/actions-handler/actions-handler';

import { archiveLogo } from './assets/data/archive-logo';

@customElement('ia-book-actions-title-bar')
export class IABookActionsTitleBar extends ActionsHandler {
  @property({ type: String }) identifier = '';

  @property({ type: String }) bookTitle = '';

  analyticsCategories = analyticsCategories;

  analyticsActions = analyticsActions;

  /**
   * Click handler to emit custom event on action click
   */
  clickHandler(): void {
    const { category, action } = {
      category: this.analyticsCategories.bookReaderHeader,
      action: this.analyticsActions.titleBar,
    };

    this.dispatchEvent(
      new CustomEvent('bookTitleBar', {
        detail: {
          event: { category, action },
        },
      }),
    );
  }

  render() {
    return html`
      <a
        class="embed-link"
        @click=${() => {
          this.clickHandler();
        }}
        href="/details/${this.identifier}"
      >
        <span>${archiveLogo}</span>
        <span class="title">${this.bookTitle}</span>
      </a>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        padding: 0 10px;
        height: 3.4rem;
        display: flex;
      }
      .embed-link {
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        color: var(--primaryTextColor, #fff);
        font-size: 1.4rem;
      }
      .embed-link .title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-align: left;
        line-height: initial;
      }
      .embed-link svg {
        margin-right: 0.5rem;
        display: block;
      }
      .embed-link:hover {
        text-decoration: underline;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-book-actions-title-bar': IABookActionsTitleBar;
  }
}
