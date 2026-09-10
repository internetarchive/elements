import { css, CSSResultGroup, LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import searchIcon from './assets/img/icon-search';
import logo from './assets/img/wayback-logo';
import { TOPNAV_MOBILE_BREAKPOINT } from './models';
import themeStyles from '@src/themes/theme-styles';
import { srOnlyStyles } from '@src/themes/sr-only-styles';

/**
 * The Wayback Machine search form shown inside the topnav's wayback slider.
 *
 * The layout rules the topnav needs sit in the last `css` block so they win
 * over the base ones on equal specificity.
 */
@customElement('ia-topnav-wayback-search')
export class IATopNavWaybackSearch extends LitElement {
  @property({ type: Object }) queryHandler: {
    performQuery: (query: string) => void;
  } = {
    performQuery: (query: string) =>
      (window.location.href = `https://web.archive.org/web/*/${query}`),
  };

  @property({ type: String }) waybackPagesArchived = '916 billion';

  @query('#url') private urlInput!: HTMLInputElement;

  render() {
    return html`
      <form method="post" @submit=${this.handleSubmit}>
        <p>
          Search the history of more than ${this.waybackPagesArchived}
          <a
            @click=${this.emitWaybackMachineStatsLinkClicked}
            data-event-click-tracking="TopNav|WaybackMachineStatsLink"
            href="https://blog.archive.org/2016/10/23/defining-web-pages-web-sites-and-web-captures/"
            >web pages</a
          >
          on the Internet.
        </p>
        <fieldset>
          <a
            @click=${this.emitWaybackMachineLogoLinkClicked}
            data-event-click-tracking="TopNav|WaybackMachineLogoLink"
            aria-label="Visit the Wayback Machine"
            href="https://web.archive.org"
            >${logo}</a
          >
          <div class="search-field">
            <label for="url" class="sr-only">Search the Wayback Machine</label>
            <input
              type="text"
              name="url"
              id="url"
              placeholder="Enter URL or keywords"
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

  static styles: CSSResultGroup = [
    themeStyles,
    srOnlyStyles,
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
         * The desktop icon had no fallback when this lived in its own package
         * and nothing has ever set it, so the fill resolved to invalid and the
         * glyph painted black against the dark nav. It follows the topnav's
         * icon color now.
         */
        --topnav-wayback-desktop-icon-fill--: var(
          --desktopSearchIconFill,
          var(--iconFill)
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
        color: var(--topnav-wayback-input-text-color--);
        box-sizing: border-box;
        border: 1px solid var(--grey80);
        border-radius: 2rem;
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
        width: 2.4rem;
        height: 2.4rem;
      }

      .search-field .fill-color {
        fill: var(--iconFill);
      }

      @media (min-width: ${TOPNAV_MOBILE_BREAKPOINT}px) {
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

        .search-field .fill-color {
          fill: var(--topnav-wayback-desktop-icon-fill--);
        }
      }
    `,
    css`
      p {
        margin-bottom: 1rem;
        font-size: 1.6rem;
        text-align: center;
      }

      fieldset {
        padding: 0.5rem;
        border-radius: 5px;
        box-shadow: none;
      }

      input {
        padding-left: 3rem;
        margin-top: 0.3rem;
        font-size: 1.4rem;
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
          margin: 0 1.5rem;
        }
      }
    `,
  ];
}
