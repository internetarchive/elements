import { CSSResultGroup, css, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import TrackedElement from './tracked-element';
import './ia-topnav-wayback-slider';
import './ia-topnav-more-slider';
import toSentenceCase from './lib/t-sentence-case';
import formatUrl from './lib/format-url';
import { customElement, property } from 'lit/decorators.js';
import {
  IATopNavConfig,
  IATopNavLink,
  IATopNavMediaMenu,
  TOPNAV_MOBILE_BREAKPOINT,
} from './models';
import { defaultTopNavConfig } from './data/menus';
import { subnavListCSS } from './subnav-list-styles';
import themeStyles from '@src/themes/theme-styles';

@customElement('ia-topnav-media-subnav')
export class MediaSubnav extends TrackedElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: String }) menu:
    | ''
    | 'web'
    | 'more'
    | 'audio'
    | 'images'
    | 'software'
    | 'texts'
    | 'video' = '';
  @property({ type: Object }) menuItems: IATopNavMediaMenu =
    MediaSubnav.defaultLinks;

  private links: IATopNavMediaMenu = MediaSubnav.defaultLinks;

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      subnavListCSS,
      css`
        img {
          display: block;
          width: 90px;
          height: 90px;
          margin: 0 auto 1rem auto;
          border-radius: 45px;
        }

        h3 {
          margin-top: 0;
          font-size: 1.8rem;
        }

        .icon-links {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: space-evenly;
          -ms-flex-pack: space-evenly;
          justify-content: space-evenly;
          text-align: center;
        }

        .icon-links a {
          display: inline-block;
          width: 12rem;
          margin-bottom: 1.5rem;
          overflow: hidden;
          white-space: nowrap;
          text-align: center;
          text-overflow: ellipsis;
        }

        .icon-links a + a {
          margin-left: 2rem;
        }

        .featured h4 {
          display: none;
        }

        @media (min-width: ${TOPNAV_MOBILE_BREAKPOINT}px) {
          :host {
            display: -ms-grid;
            display: grid;
            -ms-grid-columns: 40% 20% 40%;
            grid-template-columns: 40% 20% 40%;
          }

          .wayback-search {
            -ms-grid-column: 1;
            -ms-grid-column-span: 3;
            grid-column: 1 / 4;
          }

          h3 {
            display: none;
          }

          .icon-links {
            -ms-grid-column: 1;
          }

          .icon-links a {
            padding-top: 3.5rem;
            max-width: 16rem;
          }

          .links {
            padding: 0 1.5rem;
          }

          .featured {
            -ms-grid-column: 2;
          }

          .featured h4 {
            display: block;
          }

          .top {
            -ms-grid-column: 3;
          }

          .top ul {
            display: -ms-grid;
            display: grid;
            -ms-grid-columns: 50% 3rem 50%;
            grid-template-columns: 50% 50%;
            -ms-grid-rows: (auto) [7];
            grid-template-rows: repeat(7, auto);
            grid-column-gap: 3rem;
            grid-auto-flow: column;
          }
          .top ul > *:nth-child(1) {
            -ms-grid-row: 1;
            -ms-grid-column: 1;
          }
          .top ul > *:nth-child(2) {
            -ms-grid-row: 2;
            -ms-grid-column: 1;
          }
          .top ul > *:nth-child(3) {
            -ms-grid-row: 3;
            -ms-grid-column: 1;
          }
          .top ul > *:nth-child(4) {
            -ms-grid-row: 4;
            -ms-grid-column: 1;
          }
          .top ul > *:nth-child(5) {
            -ms-grid-row: 5;
            -ms-grid-column: 1;
          }
          .top ul > *:nth-child(6) {
            -ms-grid-row: 6;
            -ms-grid-column: 1;
          }
          .top ul > *:nth-child(7) {
            -ms-grid-row: 7;
            -ms-grid-column: 1;
          }
          .top ul > *:nth-child(8) {
            -ms-grid-row: 1;
            -ms-grid-column: 3;
          }
          .top ul > *:nth-child(9) {
            -ms-grid-row: 2;
            -ms-grid-column: 3;
          }
          .top ul > *:nth-child(10) {
            -ms-grid-row: 3;
            -ms-grid-column: 3;
          }
          .top ul > *:nth-child(11) {
            -ms-grid-row: 4;
            -ms-grid-column: 3;
          }
          .top ul > *:nth-child(12) {
            -ms-grid-row: 5;
            -ms-grid-column: 3;
          }
          .top ul > *:nth-child(13) {
            -ms-grid-row: 6;
            -ms-grid-column: 3;
          }
          .top ul > *:nth-child(14) {
            -ms-grid-row: 7;
            -ms-grid-column: 3;
          }
        }
      `,
    ];
  }

  shouldUpdate() {
    if (this.menuItems) {
      this.links = this.menuItems;
    }
    return true;
  }

  static get defaultLinks(): IATopNavMediaMenu {
    return {
      heading: '',
      iconLinks: [],
      featuredLinks: [],
      links: [],
      mobileAppsLinks: [],
      browserExtensionsLinks: [],
      archiveItLinks: [],
    };
  }

  analyticsEvent(title: string) {
    return `${this.config?.eventCategory}|${toSentenceCase(title)}${toSentenceCase(this.menu)}`;
  }

  get iconLinks() {
    return this.links.iconLinks.map(
      (link) => html`
        <a
          .href="${formatUrl(link.url, this.baseHost)}"
          @click=${this.trackClick}
          data-event-click-tracking="${this.analyticsEvent(link.title)}"
          ><img src="${ifDefined(link.icon)}" loading="lazy" />${link.title}</a
        >
      `,
    );
  }

  renderLinks(links: IATopNavLink[]) {
    return links.map(
      (link) => html`
        <li>
          <a
            .href="${formatUrl(link.url, this.baseHost)}"
            @click=${this.trackClick}
            data-event-click-tracking="${this.analyticsEvent(link.title)}"
            >${link.title}</a
          >
        </li>
      `,
    );
  }

  render() {
    if (!this.menu) {
      return html``;
    }

    if (this.menuItems) {
      this.links = this.menuItems;
    }

    if (this.menu === 'web') {
      return html` <ia-topnav-wayback-slider
        .baseHost=${this.baseHost}
        .config=${this.config}
        .archiveItLinks=${this.menuItems.archiveItLinks}
        .browserExtensionsLinks=${this.menuItems.browserExtensionsLinks}
        .mobileAppsLinks=${this.menuItems.mobileAppsLinks}
      ></ia-topnav-wayback-slider>`;
    }

    if (this.menu === 'more') {
      return html` <ia-topnav-more-slider
        .baseHost=${this.baseHost}
        .config=${this.config}
        .menuItems=${this.menuItems.links}
      >
      </ia-topnav-more-slider>`;
    }

    return html`
      <h3>${this.links.heading}</h3>
      <div class="icon-links">${this.iconLinks}</div>
      <div class="links featured">
        <h4>Featured</h4>
        <ul>
          ${this.renderLinks(this.links.featuredLinks)}
        </ul>
      </div>
      <div class="links top">
        <h4>Top</h4>
        <ul>
          ${this.renderLinks(this.links.links)}
        </ul>
      </div>
    `;
  }
}
