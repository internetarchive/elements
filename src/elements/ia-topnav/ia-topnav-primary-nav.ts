import { CSSResultGroup, PropertyValues, css, html, nothing } from 'lit';
import TrackedElement from './tracked-element';
import icons from './assets/img/icons';
import './ia-topnav-icon-hamburger';
import './ia-topnav-login-button';
import type { LoginButton } from './ia-topnav-login-button';
import './ia-topnav-media-menu';
import logoWordmarkStacked from './assets/img/wordmark-stacked';
import formatUrl from './lib/format-url';
import { customElement, property, query } from 'lit/decorators.js';
import {
  IATopNavConfig,
  IATopNavSecondIdentitySlotMode,
  TOPNAV_MOBILE_BREAKPOINT,
} from './models';
import { defaultTopNavConfig } from './data/menus';
import themeStyles from '@src/themes/theme-styles';

@customElement('ia-topnav-primary-nav')
export class PrimaryNav extends TrackedElement {
  @property({ type: String }) mediaBaseHost = 'https://archive.org';
  @property({ type: String }) baseHost = '';
  @property({ type: Boolean }) hideSearch = false;
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: String }) openMenu = '';
  @property({ type: String }) screenName = '';
  @property({ type: String })
  secondIdentitySlotMode: IATopNavSecondIdentitySlotMode = '';
  @property({ type: String }) selectedMenuOption = '';
  @property({ type: Boolean }) signedOutMenuOpen = false;
  @property({ type: Boolean }) userMenuOpen = false;
  @property({ type: Boolean }) mediaMenuAnimate = false;
  @property({ type: String }) username = '';
  @property({ type: String }) userProfileImagePath = '';
  @property({ type: Object }) currentTab:
    | { mediatype: string; moveTo: string }
    | undefined;
  signedOutMenuToggled: unknown;

  @query('button.user-menu') private userMenuButton?: HTMLButtonElement;
  @query('ia-topnav-login-button') private loginButton?: HTMLElement;

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        button:focus,
        input:focus {
          outline: none;
        }

        nav {
          position: relative;
          display: flex;
          height: 4rem;
          grid-template-areas: 'hamburger empty heart search user';
          -ms-grid-columns: 4rem minmax(1rem, 100%) 4rem 4rem 4rem;
          grid-template-columns: 4rem auto 4rem 4rem 4rem;
          -ms-grid-rows: 100%;
          grid-template-rows: 100%;
          background: var(--primaryNavBg);
          border-bottom: 1px solid var(--primaryNavBottomBorder);
        }

        nav.hide-search {
          grid-template-areas: 'hamburger empty heart user';
          -ms-grid-columns: 4rem minmax(1rem, 100%) 4rem 4rem;
          grid-template-columns: 4rem auto 4rem 4rem;
        }

        .right-side-section {
          display: flex;
          margin-left: auto;
          user-select: none;
        }
        button {
          background: none;
          color: inherit;
          border: none;
          font: inherit;
          cursor: pointer;
        }

        .branding {
          position: static;
          float: left;
          margin: 0 !important;
          padding: 0 5px 0 10px;
          -webkit-transform: translate(0, 0);
          -ms-transform: translate(0, 0);
          transform: translate(0, 0);
        }

        slot,
        .branding {
          display: flex;
          justify-content: left;
          align-items: center;
        }

        ia-topnav-media-menu {
          flex: 1;
          justify-self: stretch;
        }

        .ia-logo {
          height: 3rem;
          width: 2.7rem;
          display: inline-block;
        }
        .ia-wordmark {
          height: 3rem;
          width: 9.5rem;
        }
        .ia-logo,
        .ia-wordmark {
          margin-right: 5px;
        }

        .hamburger {
          -ms-grid-row: 1;
          -ms-grid-column: 1;
          grid-area: hamburger;
          padding: 0;
        }
        .hamburger svg {
          height: 4rem;
          width: 4rem;
          fill: var(--activeColor);
        }

        .mobile-donate-link {
          display: inline-block;
        }
        .mobile-donate-link svg {
          height: 4rem;
          width: 4rem;
        }
        .mobile-donate-link .fill-color {
          fill: rgb(255, 0, 0);
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          border: 0;
          overflow: hidden;
          white-space: nowrap;
          clip: rect(1px, 1px, 1px, 1px);
          -webkit-clip-path: inset(50%);
          clip-path: inset(50%);
          user-select: none;
        }

        .search-trigger {
          padding: 0;
        }
        .search-trigger svg {
          height: 4rem;
          width: 4rem;
        }
        .search-trigger .fill-color {
          fill: var(--iconFill);
        }

        .search-container {
          display: none;
        }

        .search-container.open {
          display: flex;
          position: absolute;
          top: 0;
          right: 4rem;
          bottom: 0;
          left: 4rem;
          z-index: 3;
          padding: 0.5rem;
          border-radius: 1rem 1rem 0 0;
          background: var(--primaryNavBg);
          align-items: center;
          animation: fade-in 0.2s forwards;
        }

        .search-container ::slotted(*) {
          display: block;
        }

        .search-container slot {
          width: 100%;
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .upload {
          display: none;
        }

        .upload span {
          display: none;
        }

        .upload svg {
          height: 3rem;
          width: 3rem;
        }

        .screen-name {
          display: none;
          font-size: 1.3rem;
          vertical-align: middle;
          text-transform: uppercase;
        }

        .user-menu {
          color: var(--lightTextColor);
          padding: 0.5rem;
          height: 100%;
        }

        button.user-menu:hover,
        button.user-menu:focus {
          color: var(--linkHoverColor);
          outline: none;
        }

        .user-menu.active {
          border-radius: 1rem 1rem 0 0;
          background: var(--activeButtonBg);
        }

        .user-menu img {
          display: block;
          width: 3rem;
          height: 3rem;
        }

        .link-home {
          text-decoration: none;
          display: inline-flex;
        }
        a.link-home:focus,
        a.link-home:focus-visible {
          outline-offset: 1px;
        }

        @media only screen and (min-width: ${TOPNAV_MOBILE_BREAKPOINT}px) and (max-device-width: 905px) {
          .branding.second-logo {
            padding-right: 0;
          }
        }

        @media (min-width: 906px) {
          .branding.second-logo {
            padding-right: 20px;
          }
        }

        @media (max-width: ${TOPNAV_MOBILE_BREAKPOINT - 1}px) {
          slot[name='opt-sec-logo'] {
            display: none;
          }

          .right-side-section {
            display: initial;
          }
          .right-side-section .user-info {
            float: right;
          }
        }

        @media (min-width: ${TOPNAV_MOBILE_BREAKPOINT}px) {
          :host {
            --userIconWidth: 3.2rem;
            --userIconHeight: 3.2rem;
          }

          nav {
            display: flex;
            z-index: 4;
            height: 5rem;
            padding-right: 1.5rem;
          }

          slot[name='opt-sec-logo-mobile'] {
            display: none;
          }

          .ia-logo,
          .ia-wordmark {
            margin-right: 10px;
          }

          .hamburger,
          .search-trigger,
          .mobile-donate-link {
            display: none;
          }

          .user-info {
            display: block;
            float: right;
            vertical-align: middle;
            height: 100%;
          }

          .user-info .user-menu img {
            height: 3rem;
            width: 3rem;
            margin-right: 0.5rem;
          }

          .user-menu {
            padding: 1rem 0.5rem;
          }
          .user-menu.active {
            background: transparent;
          }

          .user-menu img {
            display: inline-block;
            vertical-align: middle;
            margin-right: 0.5rem;
          }

          .upload {
            display: block;
            padding: 1rem 0.5rem;
            float: right;
            font-size: 1.4rem;
            text-transform: uppercase;
            text-decoration: none;
            color: var(--lightTextColor);
          }
          .upload:active,
          .upload:focus,
          .upload:hover {
            color: var(--linkHoverColor);
          }
          .upload:focus-visible {
            outline: none;
          }

          .upload svg {
            vertical-align: middle;
            fill: var(--iconFill);
          }

          .upload:hover svg,
          .upload:focus svg,
          .upload:active svg {
            fill: var(--linkHoverColor);
          }

          .search-container,
          .search-container.open {
            display: flex;
            position: static;
            top: auto;
            right: auto;
            bottom: auto;
            left: auto;
            align-items: center;
            padding: 0 0 0 1rem;
            background: transparent;
            border-radius: 0;
            z-index: auto;
          }

          .search-container slot {
            width: auto;
          }
        }

        @media (min-width: 990px) {
          .screen-name {
            display: inline-block;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            max-width: 165px;
          }

          .upload span {
            display: inline-block;
            vertical-align: middle;
          }
        }
      `,
    ];
  }

  /** Distance (px) from this element's right edge to the right edge of the account dropdown toggle. */
  getAccountDropdownOffset(): number {
    const hostRect = this.getBoundingClientRect();

    if (this.userMenuButton) {
      return hostRect.right - this.userMenuButton.getBoundingClientRect().right;
    }

    if (this.loginButton) {
      const loginRect = this.loginButton.getBoundingClientRect();
      const innerOffset = (
        this.loginButton as LoginButton
      ).getDropdownToggleOffset();
      return hostRect.right - loginRect.right + innerOffset;
    }

    return 0;
  }

  toggleMediaMenu(e: Event) {
    this.trackClick(e);
    this.dispatchEvent(
      new CustomEvent('menuToggled', {
        detail: {
          menuName: 'media',
        },
      }),
    );
  }

  toggleSearchMenu(e: Event) {
    this.trackClick(e);
    this.dispatchEvent(
      new CustomEvent('menuToggled', {
        detail: {
          menuName: 'search',
        },
      }),
    );
  }

  toggleUserMenu(e: Event) {
    this.trackClick(e);
    this.dispatchEvent(
      new CustomEvent('menuToggled', {
        detail: {
          menuName: 'user',
        },
      }),
    );
  }

  updated(props: PropertyValues) {
    if (props.has('currentTab')) {
      // early return
      if (!this.currentTab || Object.keys(this.currentTab).length === 0)
        return nothing;

      const isUserMenuTab =
        this.currentTab && this.currentTab.mediatype === 'usermenu';
      if (isUserMenuTab) {
        const mediaButtons = Array.from(
          this.shadowRoot
            ?.querySelector('ia-topnav-media-menu')
            ?.shadowRoot?.querySelectorAll('ia-topnav-media-button') ?? [],
        );
        const lastMediaButton = mediaButtons.filter((element) => {
          return element.shadowRoot
            ?.querySelector('a')
            ?.classList.contains('images');
        });

        let nextElement;
        if (this.username) {
          nextElement = this.shadowRoot?.querySelector('a.upload');
        } else {
          nextElement = this.shadowRoot
            ?.querySelector('ia-topnav-login-button')
            ?.shadowRoot?.querySelector('span a');
        }

        const menuItemElement =
          lastMediaButton[0]?.shadowRoot?.querySelector('a.menu-item');

        const focusElement =
          this.currentTab.moveTo === 'next' ? nextElement : menuItemElement;

        if (focusElement) {
          (focusElement as HTMLElement).focus();
        }
      } else if (this.currentTab.moveTo === 'next') {
        if (this.shadowRoot?.querySelector('.user-menu')) {
          (this.shadowRoot?.querySelector('.user-menu') as HTMLElement).focus();
        } else {
          (
            this.shadowRoot
              ?.querySelector('ia-topnav-login-button')
              ?.shadowRoot?.querySelectorAll('span a')[0] as HTMLElement
          )?.focus();
        }
      }
    }
  }

  get userIcon() {
    const userMenuClass = this.openMenu === 'user' ? 'active' : '';
    const userMenuToolTip =
      this.openMenu === 'user' ? 'Close user menu' : 'Expand user menu';

    return html`
      <button
        class="user-menu ${userMenuClass}"
        title="${userMenuToolTip}"
        @click="${this.toggleUserMenu}"
        data-event-click-tracking="${this.config?.eventCategory}|NavUserMenu"
      >
        <img
          src="${this.mediaBaseHost}${this.userProfileImagePath}"
          alt="Profile picture for ${this.screenName}"
        />
        <span class="screen-name" dir="auto">${this.screenName}</span>
      </button>
    `;
  }

  get loginIcon() {
    return html`
      <ia-topnav-login-button
        .baseHost=${this.baseHost}
        .config=${this.config}
        .dropdownOpen=${this.signedOutMenuOpen}
        .openMenu=${this.openMenu}
        @signedOutMenuToggled=${this.signedOutMenuToggled}
      ></ia-topnav-login-button>
    `;
  }

  get searchMenuOpen() {
    return this.openMenu === 'search';
  }

  get allowSecondaryIcon() {
    return this.secondIdentitySlotMode === 'allow';
  }

  /**
   * The search slot container, rendered between ia-topnav-media-menu and
   * right-side-section so it sits left of the Upload button on desktop.
   */
  get searchSlotContainer() {
    if (this.hideSearch) return nothing;
    return html`
      <div class="search-container ${this.searchMenuOpen ? 'open' : ''}">
        <slot name="search"></slot>
      </div>
    `;
  }

  get searchMenu() {
    if (this.hideSearch) return nothing;

    return html`
      <button
        class="search-trigger"
        @click="${this.toggleSearchMenu}"
        data-event-click-tracking="${this.config?.eventCategory}|NavSearchOpen"
      >
        ${icons.search}
      </button>
    `;
  }

  get mobileDonateHeart() {
    return html`
      <a
        class="mobile-donate-link"
        .href=${formatUrl(
          '/donate/?origin=iawww-mbhrt' as string & Location,
          this.baseHost,
        )}
      >
        ${icons.donateUnpadded}
        <span class="sr-only">"Donate to the archive"</span>
      </a>
    `;
  }

  get uploadButtonTemplate() {
    return html` <a
      .href="${formatUrl('/upload' as string & Location, this.baseHost)}"
      class="upload"
      @focus=${this.toggleMediaMenu}
    >
      ${icons.upload}
      <span>Upload</span>
    </a>`;
  }

  get userStateTemplate() {
    return html`<div class="user-info">
      ${this.username ? this.userIcon : this.loginIcon}
    </div>`;
  }

  get secondLogoSlot() {
    return this.allowSecondaryIcon
      ? html`
          <slot name="opt-sec-logo"></slot>
          <slot name="opt-sec-logo-mobile"></slot>
        `
      : nothing;
  }

  get secondLogoClass() {
    return this.allowSecondaryIcon ? 'second-logo' : '';
  }

  render() {
    // const mediaMenuTabIndex = this.openMenu === 'media' ? '' : '-1';
    return html`
      <nav class=${this.hideSearch ? 'hide-search' : ''}>
        <button
          class="hamburger"
          @click="${this.toggleMediaMenu}"
          data-event-click-tracking="${this.config?.eventCategory}|NavHamburger"
          title="Open main menu"
        >
          <ia-topnav-icon-hamburger
            ?active=${this.openMenu === 'media'}
          ></ia-topnav-icon-hamburger>
        </button>

        <div class=${`branding ${this.secondLogoClass}`}>
          <a
            .href=${formatUrl('/' as string & Location, this.baseHost)}
            @click=${this.trackClick}
            data-event-click-tracking="${this.config?.eventCategory}|NavHome"
            title="Go home"
            class="link-home"
            >${icons.iaLogo}${logoWordmarkStacked}</a
          >
          ${this.secondLogoSlot}
        </div>
        <ia-topnav-media-menu
          .baseHost=${this.baseHost}
          .config=${this.config}
          ?mediaMenuAnimate=${this.mediaMenuAnimate}
          .selectedMenuOption=${this.selectedMenuOption}
          .openMenu=${this.openMenu}
          .currentTab=${this.currentTab}
        ></ia-topnav-media-menu>
        ${this.searchSlotContainer}
        <div class="right-side-section">
          ${this.mobileDonateHeart} ${this.userStateTemplate}
          ${this.uploadButtonTemplate} ${this.searchMenu}
        </div>
      </nav>
    `;
  }
}
