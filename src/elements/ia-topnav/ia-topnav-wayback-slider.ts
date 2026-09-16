import { CSSResultGroup, css, html } from 'lit';
import './ia-topnav-wayback-search';
import TrackedElement from './tracked-element';
import './ia-topnav-save-page-form';
import queryHandler from './lib/query-handler';
import toSentenceCase from './lib/t-sentence-case';
import formatUrl from './lib/format-url';
import { customElement, property } from 'lit/decorators.js';
import {
  IATopNavConfig,
  IATopNavLink,
  TOPNAV_MOBILE_BREAKPOINT,
} from './models';
import { defaultTopNavConfig } from './data/menus';
import { subnavListCSS } from './subnav-list-styles';
import themeStyles from '@src/themes/theme-styles';

@customElement('ia-topnav-wayback-slider')
export class WaybackSlider extends TrackedElement {
  @property({ type: Array }) archiveItLinks: IATopNavLink[] = [];
  @property({ type: String }) baseHost = '';
  @property({ type: Array }) browserExtensionsLinks: IATopNavLink[] = [];
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: Array }) mobileAppsLinks: IATopNavLink[] = [];

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      subnavListCSS,
      css`
        @media (min-width: ${TOPNAV_MOBILE_BREAKPOINT}px) {
          :host {
            display: block;
            grid-column: 1 / 4;
            padding: 0 1.5rem;
          }

          h4 {
            margin-top: 0;
            font: normal 100 1.6rem var(--themeFontFamily);
          }

          .grid {
            display: grid;
            grid-template-columns: minmax(auto, 260px) 1fr minmax(auto, 260px);
            /* Possible for 890 - 935: minmax(auto, 260px) 1fr minmax(auto, 260px) */
            grid-column-gap: 2.5rem;
          }

          .link-lists {
            display: grid;
            grid-template-columns: calc(50% - 1.25rem) calc(50% - 1.25rem);
            grid-column-gap: 2.5rem;
          }
        }
      `,
    ];
  }

  get mobileAppsItems() {
    return this.linkList(this.mobileAppsLinks, 'Wayback');
  }

  get browserExtensionsItems() {
    return this.linkList(this.browserExtensionsLinks, 'Wayback');
  }

  get archiveItItems() {
    return this.linkList(this.archiveItLinks, 'ArchiveIt');
  }

  private linkList(links: IATopNavLink[], eventPrefix: string) {
    return links.map(
      (link) =>
        html`<li>
          <a
            .href=${formatUrl(link.url, this.baseHost)}
            @click=${this.trackClick}
            data-event-click-tracking="${this.analyticsEvent(
              `${eventPrefix}${link.title}`,
            )}"
            target=${link.external ? '_blank' : ''}
            rel=${link.external ? 'noreferrer noopener' : ''}
            >${link.title}</a
          >
        </li>`,
    );
  }

  analyticsEvent(title: string) {
    return `${this.config?.eventCategory}|${toSentenceCase(title)}`;
  }

  render() {
    return html`
      <div class="grid">
        <ia-topnav-wayback-search
          .waybackPagesArchived=${this.config.waybackPagesArchived ?? ''}
          .queryHandler=${queryHandler}
        ></ia-topnav-wayback-search>
        <div class="link-lists">
          <div>
            <h4>Mobile Apps</h4>
            <ul class="mobile-apps">
              ${this.mobileAppsItems}
            </ul>
            <h4>Browser Extensions</h4>
            <ul class="browser-extensions">
              ${this.browserExtensionsItems}
            </ul>
          </div>
          <div>
            <h4>Archive-It Subscription</h4>
            <ul class="archive-it">
              ${this.archiveItItems}
            </ul>
          </div>
        </div>
        <ia-topnav-save-page-form
          .config=${this.config}
        ></ia-topnav-save-page-form>
      </div>
    `;
  }
}
