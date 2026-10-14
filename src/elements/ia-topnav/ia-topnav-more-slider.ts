import { CSSResultGroup, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';

import TrackedElement from './tracked-element';
import { formatUrl, toSentenceCase } from './lib/helpers';
import { IATopNavConfig, IATopNavLink } from './models';
import { defaultTopNavConfig } from './data/menus';
import themeStyles from '@src/themes/theme-styles';

@customElement('ia-topnav-more-slider')
export class MoreSlider extends TrackedElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: Array }) menuItems: IATopNavLink[] = [];

  render() {
    return html`
      <ul>
        ${this.menuItems.map(
          (item) =>
            html`<li>
              <a
                @click=${this.trackClick}
                href=${formatUrl(item.url, this.baseHost)}
                data-event-click-tracking="${this.analyticsEvent(
                  item.key ?? item.title,
                )}"
                >${item.title}</a
              >
            </li>`,
        )}
      </ul>
    `;
  }

  analyticsEvent(title: string) {
    return `${this.config.eventCategory}|NavMore${toSentenceCase(title)}`;
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        ul {
          padding: 0;
          margin: calc(-10 * var(--topnavUnit--)) 0 0 0;
          list-style: none;
        }
        a {
          display: block;
          padding: calc(10 * var(--topnavUnit--)) 0;
          text-decoration: none;
          color: var(--activeColor);
        }
      `,
    ];
  }
}
