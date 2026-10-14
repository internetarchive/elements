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
            --ia-theme-secondary-text-color,
            #666
          );
          --wayback-search-input-bg--: var(
            --ia-theme-secondary-background-color,
            #fff
          );
          /*
           * Darker than the mobile glyph, which follows --iconFill. The topnav
           * declares this alongside its other color knobs. The literal covers
           * mounting this search on its own, where none of those greys exist,
           * and it has to be a literal because fill inherits: an unresolved
           * value paints black rather than falling through to another rule.
           */
          --wayback-search-desktop-icon-fill--: var(
            --desktopSearchIconFill,
            #333
          );

          font: normal 1.2rem/1.5 var(--themeFontFamily);
        }

        form {
          max-width: 600px;
        }

        p {
          margin-top: 0;
          font-weight: 200;
        }

        a {
          font-weight: 500;
          text-decoration: none;
          color: var(--activeColor);
        }

        fieldset {
          padding: 0.7rem 2rem;
          margin: 1.5rem 0;
          box-sizing: border-box;
          text-align: center;
          border: none;
          border-radius: 7px;
          background-color: #fcf5e6;
          box-shadow: 3px 3px 0 0 #c3ad97;
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
          margin-bottom: 1.3rem;
          vertical-align: middle;
        }

        input {
          display: block;
          width: 100%;
          height: 3rem;
          padding: 0.5rem 1rem 0.5rem 3rem;
          font: normal 1.2rem/1.5 var(--themeFontFamily);
          color: var(--wayback-search-input-text-color--);
          box-sizing: border-box;
          border: 1px solid var(--grey80);
          border-radius: 2rem;
          background: var(--wayback-search-input-bg--);
        }

        input:focus {
          border-color: #66afe9;
          outline: none;
        }

        .search-field {
          position: relative;
          overflow: hidden;
        }

        .search-field svg {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 2.4rem;
          height: 2.4rem;
          color: var(--iconFill, #000);
        }

        @media (min-width: ${WAYBACK_SEARCH_DESKTOP_BREAKPOINT}px) {
          form {
            margin: 0 auto;
          }

          p {
            margin-bottom: 3rem;
            font-size: 1.6rem;
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
