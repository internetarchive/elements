import { css, CSSResultGroup, LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';

import searchIcon from './assets/img/icon-search';
import logo from './assets/img/wayback-logo';
import { TOPNAV_MOBILE_BREAKPOINT } from './models';
import themeStyles from '@src/themes/theme-styles';
import { localized, msg } from '@lit/localize';

/**
 * The Wayback Machine search form shown inside the topnav's wayback slider.
 *
 * The layout rules the topnav needs sit in the last `css` block so they win
 * over the base ones on equal specificity.
 */
@customElement('ia-topnav-wayback-search')
@localized()
export class IATopNavWaybackSearch extends LitElement {
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
          --topnav-wayback-input-text-color--: var(
            --ia-theme-secondary-text-color,
            #666
          );
          --topnav-wayback-input-bg--: var(
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
          --topnav-wayback-desktop-icon-fill--: var(
            --desktopSearchIconFill,
            #333
          );

          font: normal calc(12 * var(--topnavUnit--)) / 1.5
            var(--themeFontFamily);
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
          padding: calc(7 * var(--topnavUnit--)) calc(20 * var(--topnavUnit--));
          margin: calc(15 * var(--topnavUnit--)) 0;
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

        img {
          width: 100%;
          max-width: 215px;
          max-height: 60px;
          margin-bottom: calc(13 * var(--topnavUnit--));
          vertical-align: middle;
        }

        input {
          display: block;
          width: 100%;
          height: calc(30 * var(--topnavUnit--));
          padding: calc(5 * var(--topnavUnit--)) calc(10 * var(--topnavUnit--))
            calc(5 * var(--topnavUnit--)) calc(30 * var(--topnavUnit--));
          font: normal calc(12 * var(--topnavUnit--)) / 1.5
            var(--themeFontFamily);
          color: var(--topnav-wayback-input-text-color--);
          box-sizing: border-box;
          border: 1px solid var(--grey80);
          border-radius: calc(20 * var(--topnavUnit--));
          background: var(--topnav-wayback-input-bg--);
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
          width: calc(24 * var(--topnavUnit--));
          height: calc(24 * var(--topnavUnit--));
        }

        .search-field .fill-color {
          fill: var(--iconFill);
        }

        @media (min-width: ${TOPNAV_MOBILE_BREAKPOINT}px) {
          form {
            margin: 0 auto;
          }

          p {
            margin-bottom: calc(30 * var(--topnavUnit--));
            font-size: calc(16 * var(--topnavUnit--));
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

          .search-field .fill-color {
            fill: var(--topnav-wayback-desktop-icon-fill--);
          }
        }
      `,
      css`
        p {
          margin-bottom: calc(10 * var(--topnavUnit--));
          font-size: calc(16 * var(--topnavUnit--));
          text-align: center;
        }

        fieldset {
          padding: calc(5 * var(--topnavUnit--));
          border-radius: 5px;
          box-shadow: none;
        }

        input {
          padding-left: calc(30 * var(--topnavUnit--));
          margin-top: calc(3 * var(--topnavUnit--));
          font-size: calc(14 * var(--topnavUnit--));
          border-color: #bca38e;
          background: #fff;
        }

        input::placeholder,
        input::-webkit-input-placeholder {
          color: #8e8e8e;
        }

        .search-field svg {
          top: 50%;
          transform: translateY(-50%);
        }

        @media (min-width: ${TOPNAV_MOBILE_BREAKPOINT}px) {
          fieldset a,
          .search-field {
            display: block;
            width: auto;
          }

          fieldset a {
            margin: 0 calc(15 * var(--topnavUnit--));
          }
        }
      `,
    ];
  }
}
