import {
  CSSResultGroup,
  PropertyValues,
  TemplateResult,
  css,
  html,
  nothing,
} from 'lit';
import { property } from 'lit/decorators.js';

import icons from './assets/img/icons';
import { defaultTopNavConfig } from './data/menus';
import formatUrl from './lib/format-url';
import { makeBooleanString } from './lib/make-boolean-string';
import {
  IATopNavConfig,
  IATopNavLink,
  TOPNAV_MOBILE_BREAKPOINT,
} from './models';
import TrackedElement from './tracked-element';
import { ifDefined } from 'lit/directives/if-defined.js';
import KeyboardNavigation from './lib/keyboard-navigation';
import themeStyles from '@src/themes/theme-styles';

export default class DropdownMenu extends TrackedElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: Array }) menuItems: IATopNavLink[] | IATopNavLink[][] = [];
  @property({ type: Boolean }) animated = false;
  @property({ type: Boolean }) open = false;

  private previousKeydownListener?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (this: HTMLElement, ev: KeyboardEvent) => any;

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          /*
           * Where the menu parks when closed. Nothing sets it today, so the
           * fallback is what actually applies.
           */
          --topnav-dropdown-closed-top--: var(--topOffset, -1500px);
          /*
           * Set imperatively by ia-topnav once it has measured the account
           * button, so the dropdown lines up with the icon that opened it.
           */
          --topnav-dropdown-right--: var(--dropdownMenuRight, 0);
        }

        .nav-container {
          position: relative;
        }

        nav {
          position: absolute;
          right: 0;
          z-index: 4;
          overflow: hidden;
          font-size: 1.6rem;
          background-color: var(--dropdownMenuBg);
          transition-property: top;
          transition-duration: 0.2s;
          transition-timing-function: ease;
        }

        .initial,
        .closed {
          top: var(--topnav-dropdown-closed-top--);
        }

        .closed {
          transition-duration: 0.5s;
        }

        .open {
          max-width: 100vw;
          overflow: auto;
        }

        h3 {
          padding: 0.6rem 2rem;
          margin: 0;
          font-size: inherit;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        ul {
          padding: 0.4rem 0 0.7rem 0;
          margin: 0;
          list-style: none;
          /* viewport height - nav height + bottom nav border */
          max-height: calc(100vh - 7.2rem + 1px);
          overflow: auto;
          box-sizing: border-box;
        }

        .divider {
          margin: 0.5rem 0;
          border-bottom: 1px solid var(--dropdownMenuDivider);
        }

        a,
        .info-item {
          display: block;
          color: var(--primaryTextColor);
          text-decoration: none;
          padding: 1rem 2rem;
        }

        .info-item {
          font-size: 0.8em;
          color: var(--dropdownMenuInfoItem);
        }

        .callout {
          position: absolute;
          margin-left: 10px;
          padding: 0 5px;
          border-radius: 2px;
          background: #fee257;
          color: #2c2c2c;
          font-size: 1.4rem;
          font-weight: bold;
        }

        a.mobile-upload {
          display: flex;
          justify-content: left;
          align-items: center;
        }
        a.mobile-upload svg {
          fill: var(--white);
          margin-right: 1rem;
          height: 1.4rem;
          width: 1.4rem;
        }

        @media (min-width: ${TOPNAV_MOBILE_BREAKPOINT}px) {
          nav {
            display: flex;
            overflow: visible;
            top: 0;
            left: auto;
            right: var(--topnav-dropdown-right--);
            z-index: 5;
            transition: opacity 0.2s ease-in-out;
            font-size: 1.4rem;
            border-radius: 2px;
            background: var(--primaryTextColor);
            box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.15);
          }

          nav:after {
            position: absolute;
            right: 7px;
            top: -7px;
            width: 12px;
            height: 7px;
            box-sizing: border-box;
            color: var(--white);
            content: '';
            border-bottom: 7px solid currentColor;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
          }

          h3 {
            display: none;
          }

          ul {
            /* viewport height - nav height + bottom nav border */
            max-height: calc(100vh - 8.5rem + 1px);
          }

          .divider {
            border-bottom-color: var(--dropdownMenuDivider);
          }

          a {
            padding: 0.5rem 2rem;
            color: var(--inverseTextColor);
            transition:
              background 0.1s ease-out,
              color 0.1s ease-out;
          }

          .info-item {
            padding: 0.5rem 2rem;
            font-size: 0.8em;
            color: var(--inverseDropdownMenuInfoItem);
          }

          a:hover,
          a:active,
          a:focus {
            color: var(--linkHoverColor);
            background: var(--linkColor);
            outline: none;
          }

          .initial,
          .closed {
            opacity: 0;
            transition-duration: 0.2s;
          }

          .open {
            opacity: 1;
            overflow: visible;
          }

          a.mobile-upload {
            display: none;
          }
        }
      `,
    ];
  }

  updated(props: PropertyValues) {
    if (props.has('open') && this.open) {
      const container = this.shadowRoot?.querySelector(
        '.nav-container',
      ) as HTMLElement;

      if (container) {
        const keyboardNavigation = new KeyboardNavigation(
          container,
          'usermenu',
        );
        this.addEventListener('keydown', keyboardNavigation.handleKeyDown);
        if (this.previousKeydownListener) {
          this.removeEventListener('keydown', this.previousKeydownListener);
        }
        this.previousKeydownListener = keyboardNavigation.handleKeyDown;
      }
    }
  }

  get dropdownItems() {
    if (!this.menuItems) return nothing;

    if (!Array.isArray(this.menuItems[0])) {
      const submenu = this.menuItems as IATopNavLink[];
      return this.dropdownSection(submenu);
    }
    return this.menuItems.map((submenu, i) => {
      const joiner = i ? DropdownMenu.dropdownDivider : html``;
      if (!Array.isArray(submenu)) {
        return;
      }
      return [joiner, ...this.dropdownSection(submenu)];
    });
  }

  static get dropdownDivider() {
    return html`<li class="divider"></li>`;
  }

  private dropdownSection(submenu: IATopNavLink[]): TemplateResult[] {
    return submenu.map(
      (item) => html`
        <li>
          ${item.url
            ? this.dropdownLink(item)
            : DropdownMenu.dropdownText(item)}
        </li>
      `,
    );
  }

  dropdownLink(link: IATopNavLink): TemplateResult {
    const calloutText = this.config?.callouts?.[link.title];
    const isMobileUpload = link.class === 'mobile-upload';
    const isTabbable = this.open && !isMobileUpload;

    return html`<a
      href="${formatUrl(link.url, this.baseHost)}"
      class=${ifDefined(link.class)}
      tabindex="${isTabbable ? '' : '-1'}"
      @click=${this.trackClick}
      data-event-click-tracking="${this.config
        ?.eventCategory}|Nav${link.analyticsEvent}"
      aria-label=${calloutText ? `New feature: ${link.title}` : nothing}
    >
      ${isMobileUpload ? icons.uploadUnpadded : nothing} ${link.title}
      ${calloutText
        ? html`<span class="callout" aria-hidden="true">${calloutText}</span>`
        : nothing}
    </a>`;
  }

  static dropdownText(item: IATopNavLink) {
    return html`<span class="info-item">${item.title}</span>`;
  }

  get menuClass() {
    if (this.open) return 'open';
    if (this.animated) return 'closed';
    return 'initial';
  }

  render() {
    return html`
      <div class="nav-container">
        <nav
          class="${this.menuClass}"
          aria-hidden="${makeBooleanString(!this.open)}"
          aria-expanded="${makeBooleanString(this.open)}"
        >
          <ul>
            ${this.dropdownItems}
          </ul>
        </nav>
      </div>
    `;
  }
}
