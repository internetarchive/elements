import { css, CSSResultGroup, LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';

import { localized, msg } from '@lit/localize';

import searchIcon from '@src/icons/topnav-search';
import logo from '@src/icons/topnav-wayback-logo';
import themeStyles from '@src/themes/theme-styles';

/** Desktop styles apply at `min-width: WAYBACK_SEARCH_DESKTOP_BREAKPOINT px`. */
const WAYBACK_SEARCH_DESKTOP_BREAKPOINT = 890;

/**
 * A Wayback Machine search form: a line about how many pages the Wayback
 * Machine holds, its logo, and a URL or keyword field.
 *
 * Submitting calls `queryHandler.performQuery` with what was typed, which by
 * default goes to the Wayback Machine's results for it, and fires
 * `waybackSearchSubmitted`.
 */
@customElement('ia-wayback-search-form')
@localized()
export class IAWaybackSearchForm extends LitElement {
  @property({ type: Object }) queryHandler: {
    performQuery: (query: string) => void;
  } = {
    performQuery: (query: string) =>
      (window.location.href = `https://web.archive.org/web/*/${query}`),
  };

  /** How many pages the Wayback Machine holds. Blank shows a localized default. */
  @property({ type: String }) waybackPagesArchived = '';

  @query('#url') private urlInput!: HTMLInputElement;

  render() {
    const pagesArchived = this.waybackPagesArchived || msg('1 trillion');
    return html`
      <form method="post" @submit=${this.handleSubmit}>
        <p>
          ${msg(
            html`Search the history of more than ${pagesArchived}
              <a
                @click=${this.emitWaybackMachineStatsLinkClicked}
                data-event-click-tracking="TopNav|WaybackMachineStatsLink"
                href="https://blog.archive.org/2016/10/23/defining-web-pages-web-sites-and-web-captures/"
                >web pages</a
              >
              on the Internet.`,
          )}
        </p>
        <fieldset>
          <a
            @click=${this.emitWaybackMachineLogoLinkClicked}
            data-event-click-tracking="TopNav|WaybackMachineLogoLink"
            aria-label=${msg('Visit the Wayback Machine')}
            href="https://web.archive.org"
            >${logo}</a
          >
          <div class="search-field">
            <input
              type="text"
              aria-label=${msg('Search the Wayback Machine')}
              name="url"
              id="url"
              placeholder=${msg('Enter URL or keywords')}
            />
            ${searchIcon}
          </div>
        </fieldset>
      </form>
    `;
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const query = this.urlInput.value;
    this.emitWaybackSearchSubmitted(query);
    this.queryHandler.performQuery(query);
  }

  emitWaybackSearchSubmitted(query: string) {
    this.dispatchEvent(
      new CustomEvent('waybackSearchSubmitted', {
        detail: {
          query,
        },
      }),
    );
  }

  emitWaybackMachineStatsLinkClicked() {
    this.dispatchEvent(new CustomEvent('waybackMachineStatsLinkClicked'));
  }

  emitWaybackMachineLogoLinkClicked() {
    this.dispatchEvent(new CustomEvent('waybackMachineLogoLink'));
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --wayback-search-input-text-color--: var(
            --ia-theme-primary-text-color,
            var(--ia-color-text-primary--)
          );
          --wayback-search-input-bg--: var(
            --ia-theme-secondary-background-color,
            var(--ia-color-surface-raised--)
          );
          /*
           * Darker than the mobile glyph, which follows --iconFill. The topnav
           * declares this alongside its other color knobs. The token covers
           * mounting this search on its own, where none of those greys exist;
           * it always resolves, which matters because fill inherits and an
           * unresolved value would paint black.
           */
          --wayback-search-desktop-icon-fill--: var(
            --desktopSearchIconFill,
            var(--ia-color-text-primary--)
          );
          --wayback-search-font-family--: var(
            --themeFontFamily,
            var(--ia-font-family-base--)
          );

          font: normal var(--ia-font-size-sm--) / 1.5
            var(--wayback-search-font-family--);
        }

        form {
          max-width: 600px;
        }

        p {
          margin-top: 0;
          font-weight: var(--ia-font-weight-regular--);
        }

        a {
          font-weight: var(--ia-font-weight-bold--);
          text-decoration: none;
          color: var(--activeColor);
        }

        fieldset {
          padding: 0.7rem var(--ia-space-4--); /* 7px at a 10px root */
          margin: var(--ia-space-3--) 0;
          box-sizing: border-box;
          text-align: center;
          border: none;
          /* The cream is the panel; no offset shadow (D-14). */
          border-radius: var(--ia-radius-lg--);
          background-color: var(--ia-color-brand-wayback--);
        }

        fieldset a {
          font-size: 0;
        }

        fieldset a svg {
          width: 205px;
          height: 55px;
        }

        img {
          width: 100%;
          max-width: 215px;
          max-height: 60px;
          margin-bottom: 1.3rem; /* 13px at a 10px root */
          vertical-align: middle;
        }

        input {
          display: block;
          width: 100%;
          height: var(--ia-size-control-sm--);
          padding: var(--ia-space-1--) var(--ia-space-2--) var(--ia-space-1--)
            var(--ia-space-6--);
          font: normal var(--ia-font-size-sm--) / 1.5
            var(--wayback-search-font-family--);
          color: var(--wayback-search-input-text-color--);
          box-sizing: border-box;
          border: var(--ia-border-control--);
          border-radius: var(--ia-radius-pill--);
          background: var(--wayback-search-input-bg--);
        }

        input::placeholder {
          color: var(--ia-color-text-secondary--);
        }

        input:focus {
          outline: none;
        }

        /* Inside the edge: the field's wrapper clips anything outside it. */
        input:focus-visible {
          outline: var(--ia-size-focus-ring--) solid
            var(--ia-color-border-focus--);
          outline-offset: calc(-1 * var(--ia-size-focus-ring--));
        }

        .search-field {
          position: relative;
          overflow: hidden;
        }

        .search-field svg {
          position: absolute;
          top: 3px;
          left: 3px;
          width: var(--ia-size-icon-lg--);
          height: var(--ia-size-icon-lg--);
          color: var(--iconFill, var(--ia-color-text-primary--));
        }

        @media (min-width: ${WAYBACK_SEARCH_DESKTOP_BREAKPOINT}px) {
          form {
            margin: 0 auto;
          }

          p {
            margin-bottom: var(--ia-space-6--);
            font-size: var(--ia-font-size-lg--);
            text-align: center;
          }

          img {
            margin: 0;
          }

          fieldset {
            margin: 0 auto;
          }

          fieldset a,
          .search-field {
            display: inline-block;
            width: 49%;
            vertical-align: middle;
          }

          fieldset a {
            text-align: center;
          }

          .search-field svg {
            top: 2px;
          }

          .search-field svg {
            color: var(--wayback-search-desktop-icon-fill--);
          }
        }
      `,
    ];
  }
}
