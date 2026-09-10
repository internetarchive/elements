import { CSSResultGroup, TemplateResult, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import TrackedElement from './tracked-element';
import icons from './assets/img/icons';
import formatUrl from './lib/format-url';
import { IATopNavLink } from './models';
import themeStyles from '@src/themes/theme-styles';

@customElement('ia-topnav-desktop-subnav')
export class DesktopSubnav extends TrackedElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Array }) menuItems: IATopNavLink[] = [];

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        ul {
          position: relative;
          z-index: 3;
          padding: 0.8rem 0;
          margin: 0;
          font-size: 1.2rem;
          text-transform: uppercase;
          text-align: center;
          background: var(--desktopSubnavBg);
        }

        li {
          display: inline-block;
          padding: 0 15px;
        }

        a {
          text-decoration: none;
          color: var(--subnavLinkColor);
          outline: none;
        }

        a:hover,
        a:active,
        a:focus {
          color: var(--linkHoverColor);
        }

        .donate svg {
          width: 1.6rem;
          height: 1.6rem;
          vertical-align: top;
          fill: #f00;
        }
      `,
    ];
  }

  get listItems() {
    return this.menuItems
      ? this.menuItems.map(
          (link) => html`
            <li>
              <a
                class="${link.title.toLowerCase()}"
                .href="${formatUrl(link.url, this.baseHost)}"
                >${link.title}${DesktopSubnav.iconFor(link.title)}</a
              >
            </li>
          `,
        )
      : nothing;
  }

  static iconFor(title: string): TemplateResult {
    const subnavIcons: Record<string, TemplateResult> = {
      Donate: icons.donate,
    };
    return subnavIcons[title] ? subnavIcons[title] : html``;
  }

  render() {
    return html`
      <ul>
        ${this.listItems}
      </ul>
    `;
  }
}
