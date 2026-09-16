import { CSSResultGroup, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import TrackedElement from './tracked-element';
import toSentenceCase from './lib/t-sentence-case';
import formatUrl from './lib/format-url';
import { IATopNavConfig, IATopNavLink } from './models';
import { defaultTopNavConfig } from './data/menus';
import themeStyles from '@src/themes/theme-styles';

@customElement('ia-topnav-more-slider')
export class MoreSlider extends TrackedElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: Array }) menuItems: IATopNavLink[] = [];

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        ul {
          padding: 0;
          margin: -1rem 0 0 0;
          list-style: none;
        }
        a {
          display: block;
          padding: 1rem 0;
          text-decoration: none;
          color: var(--activeColor);
        }
      `,
    ];
  }

  analyticsEvent(title: string) {
    return `${this.config.eventCategory}|NavMore${toSentenceCase(title)}`;
  }

  render() {
    return html`
      <ul>
        ${this.menuItems.map(
          (item) =>
            html`<li>
              <a
                @click=${this.trackClick}
                href=${formatUrl(item.url, this.baseHost)}
                data-event-click-tracking="${this.analyticsEvent(item.title)}"
                >${item.title}</a
              >
            </li>`,
        )}
      </ul>
    `;
  }
}
