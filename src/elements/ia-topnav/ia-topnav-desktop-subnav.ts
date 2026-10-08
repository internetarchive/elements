import { CSSResultGroup, TemplateResult, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';

import TrackedElement from './tracked-element';
import icons from './assets/img/icons';
import { formatUrl } from './lib/helpers';
import { IATopNavLink } from './models';
import themeStyles from '@src/themes/theme-styles';

@customElement('ia-topnav-desktop-subnav')
export class DesktopSubnav extends TrackedElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Array }) menuItems: IATopNavLink[] = [];

  render() {
    return html`
      <ul>
        ${this.menuItems.map(
          (link) => html`
            <li>
              <a
                class="${link.title.toLowerCase()}"
                .href="${formatUrl(link.url, this.baseHost)}"
                >${link.title}${DesktopSubnav.iconFor(link.title)}</a
              >
            </li>
          `,
        )}
      </ul>
    `;
  }

  static iconFor(title: string): TemplateResult {
    const subnavIcons: Record<string, TemplateResult> = {
      Donate: icons.donate,
    };
    return subnavIcons[title] ? subnavIcons[title] : html``;
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        ul {
          position: relative;
          z-index: 3;
          padding: calc(8 * var(--topnavUnit--)) 0;
          margin: 0;
          font-size: calc(12 * var(--topnavUnit--));
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
          width: calc(16 * var(--topnavUnit--));
          height: calc(16 * var(--topnavUnit--));
          vertical-align: top;
          fill: #f00;
        }
      `,
    ];
  }
}
