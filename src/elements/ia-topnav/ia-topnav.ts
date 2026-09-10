import {
  CSSResultGroup,
  LitElement,
  PropertyValues,
  css,
  html,
  nothing,
} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { buildTopNavMenus, defaultTopNavConfig } from './data/menus';
import './ia-topnav-desktop-subnav';
import './dropdown-menu';
import './ia-topnav-media-slider';
import {
  IATopNavConfig,
  IATopNavMenuConfig,
  IATopNavSecondIdentitySlotMode,
  TOPNAV_MOBILE_BREAKPOINT,
} from './models';
import './ia-topnav-primary-nav';
import type { PrimaryNav } from './ia-topnav-primary-nav';
import './ia-topnav-signed-out-dropdown';
import './ia-topnav-user-menu';
import themeStyles from '@src/themes/theme-styles';

@customElement('ia-topnav')
export class IATopNav extends LitElement {
  @property({ type: Boolean }) localLinks = false;

  @property({ type: String }) waybackPagesArchived = '';

  @property({ type: String }) baseHost = 'https://archive.org';

  @property({ type: String }) mediaBaseHost = 'https://archive.org';

  @property({ type: Boolean }) admin = false;

  @property({ type: Boolean }) canManageFlags = false;

  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;

  @property({ type: Boolean }) hideSearch = false;

  @property({ type: String }) itemIdentifier = '';

  /**
   * Email of the item's uploader. When set for an admin viewing an item, the
   * user menu gets an "uploader:" section with user admin / user privs links.
   */
  @property({ type: String }) uploader = '';

  /**
   * Biblio URL for a texts item, which must already carry a query string
   * (the item identifier is appended to it as `&ignored=`). When set for an
   * admin viewing an item, the user menu gets biblio / bookview / jp2 zip links.
   */
  @property({ type: String }) biblio = '';

  @property({ type: Boolean }) mediaSliderOpen = false;

  @property({ type: String }) openMenu = '';

  @property({ type: String }) screenName: string = '';

  @property({ type: String }) selectedMenuOption = '';

  @property({ type: String }) username: string = '';

  @property({ type: String }) userProfileImagePath =
    '/services/img/user/profile';

  @property({ type: String })
  secondIdentitySlotMode: IATopNavSecondIdentitySlotMode = '';

  @property({ type: Object }) currentTab?: {
    mediatype: string;
    moveTo: string;
  };

  @query('ia-topnav-primary-nav') private primaryNav?: PrimaryNav;
  /** Only one of ia-topnav-user-menu or ia-topnav-signed-out-dropdown is rendered at a time. */
  @query('ia-topnav-user-menu, ia-topnav-signed-out-dropdown')
  private accountDropdown?: HTMLElement;

  @state() private menus: IATopNavMenuConfig = buildTopNavMenus();

  private boundHandleKeydown = this.handleDocumentKeydown.bind(this);

  private boundHandleClick = this.handleDocumentClick.bind(this);

  private get normalizedBaseHost() {
    return !this.localLinks ? this.baseHost : '';
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --white: #fff;
          --grey13: #222;
          --grey20: #333;
          --grey40: #666;
          --grey28: #474747;
          --grey60: #999;
          --grey66: #aaa;
          --grey80: #ccc;
          --greya0: #a0a0a0;
          --grey6f: #6f6f6f;
          --errorYellow: #ffcd27;

          --linkColor: #4b64ff;
          --linkHoverColor: var(--white);
          --subnavLinkColor: var(--grey66);
          --primaryTextColor: var(--white);
          --inverseTextColor: var(--grey20);
          --lightTextColor: var(--grey60);
          --activeColor: var(--white);
          --activeButtonBg: var(--grey20);
          --iconFill: var(--grey60);
          --desktopSearchIconFill: var(--grey20);

          --mediaMenuBg: var(--grey13);
          --mediaLabelDesktopColor: var(--grey60);
          --activeDesktopMenuIcon: var(--grey28);

          --mediaSliderBg: var(--grey20);
          --mediaSliderDesktopBg: var(--grey28);

          --primaryNavBg: var(--grey13);
          --primaryNavBottomBorder: var(--grey20);

          --desktopSubnavBg: var(--grey20);

          --dropdownMenuBg: var(--grey20);
          --dropdownMenuInfoItem: var(--greya0);
          --dropdownMenuDivider: var(--grey40);
          --inverseDropdownMenuInfoItem: var(--grey6f);

          --loginTextColor: var(--grey60);

          --themeFontFamily: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          --logoWidthTablet: 263px;

          --savePageSubmitBg: var(--grey13);
          --savePageSubmitText: var(--white);
          --savePageInputBorder: var(--grey60);
          --savePageErrorText: var(--errorYellow);

          color: var(--primaryTextColor);
          font-family: var(--themeFontFamily);
        }

        ia-topnav-primary-nav:focus {
          outline: none !important;
        }

        #close-layer {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 3;
        }
        #close-layer.visible {
          display: block;
        }

        .topnav {
          position: relative;
          z-index: 4;
        }

        @media (max-width: ${TOPNAV_MOBILE_BREAKPOINT - 1}px) {
          ia-topnav-desktop-subnav {
            display: none;
          }
        }
      `,
    ];
  }

  updated(props: PropertyValues) {
    if (
      props.has('username') ||
      props.has('waybackPagesArchived') ||
      props.has('itemIdentifier') ||
      props.has('uploader') ||
      props.has('biblio') ||
      props.has('localLinks') ||
      props.has('baseHost')
    ) {
      this.menuSetup();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.boundHandleKeydown);
    document.addEventListener('click', this.boundHandleClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.boundHandleKeydown);
    document.removeEventListener('click', this.boundHandleClick);
  }

  private handleDocumentKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.openMenu = '';
      this.mediaSliderOpen = false;
    }
  }

  private handleDocumentClick(e: MouseEvent) {
    if (!this.openMenu) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.closeMenus();
    }
  }

  menuSetup() {
    // re/build the nav
    this.menus = buildTopNavMenus(
      this.username,
      this.normalizedBaseHost,
      this.waybackPagesArchived,
      this.itemIdentifier,
      this.uploader,
      this.biblio,
    );
  }

  menuToggled(e: CustomEvent) {
    const currentMenu = this.openMenu;
    this.openMenu = currentMenu === e.detail.menuName ? '' : e.detail.menuName;
    // Keeps media slider open if media menu is open
    if (this.openMenu === 'media') {
      return;
    }
    this.closeMediaSlider();

    if (this.openMenu === 'user' || this.openMenu === 'login') {
      if (this.primaryNav && this.accountDropdown) {
        const right = this.primaryNav.getAccountDropdownOffset();
        this.accountDropdown.style.setProperty(
          '--dropdownMenuRight',
          `${right}px`,
        );
      }
    }
  }

  openMediaSlider() {
    this.mediaSliderOpen = true;
  }

  closeMediaSlider() {
    this.mediaSliderOpen = false;
    this.selectedMenuOption = '';
  }

  closeMenus() {
    this.openMenu = '';
    this.closeMediaSlider();
  }

  trackClick(e: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('analyticsClick', {
        bubbles: true,
        composed: true,
        detail: e.detail,
      }),
    );
  }

  trackSubmit(e: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('analyticsSubmit', {
        bubbles: true,
        composed: true,
        detail: e.detail,
      }),
    );
  }

  mediaTypeSelected(e: CustomEvent) {
    if (this.selectedMenuOption === e.detail.mediatype) {
      this.closeMediaSlider();
      return;
    }
    this.selectedMenuOption = e.detail.mediatype;
    this.openMediaSlider();
  }

  get signedOutOpened() {
    return this.openMenu === 'login';
  }

  get userMenuOpened() {
    return this.openMenu === 'user';
  }

  get userMenuTabIndex() {
    return this.userMenuOpened ? '' : '-1';
  }

  get signedOutTabIndex() {
    return this.signedOutOpened ? '' : '-1';
  }

  get closeLayerClass() {
    return !!this.openMenu || this.mediaSliderOpen ? 'visible' : '';
  }

  get userMenu() {
    return html`
      <ia-topnav-user-menu
        .baseHost=${this.normalizedBaseHost}
        .config=${this.config}
        .menuItems=${this.userMenuItems}
        ?open=${this.openMenu === 'user'}
        .username=${this.username}
        tabindex="${this.userMenuTabIndex}"
        @menuToggled=${this.menuToggled}
        @trackClick=${this.trackClick}
        @focusToOtherMenuItem=${(e: CustomEvent) =>
          (this.currentTab = e.detail)}
      ></ia-topnav-user-menu>
    `;
  }

  get signedOutDropdown() {
    return html`
      <ia-topnav-signed-out-dropdown
        .baseHost=${this.normalizedBaseHost}
        .config=${this.config}
        .open=${this.signedOutOpened}
        tabindex="${this.signedOutTabIndex}"
        .menuItems=${this.signedOutMenuItems}
        @focusToOtherMenuItem=${(e: CustomEvent) => {
          this.currentTab = e.detail;
        }}
      ></ia-topnav-signed-out-dropdown>
    `;
  }

  get signedOutMenuItems() {
    return this.menus.signedOut;
  }

  /**
   * Most users just get the basic menu items.
   * For users with `/items` priv, additional admin menu items are included too.
   * Having the `/flags` priv adds a further admin item for managing flags.
   * A `biblio` URL adds a section of book-scanning links, and an `uploader`
   * adds a section with the uploader's email and account admin links. Each
   * section is rendered with a divider above it.
   */
  get userMenuItems() {
    const basicItems = this.menus.user;
    if (!this.itemIdentifier || !this.admin) return [basicItems];

    let adminItems = this.menus.userAdmin;
    if (this.canManageFlags) {
      adminItems = adminItems.concat(this.menus.userAdminFlags);
    }

    // The built sections are empty until the matching prop is set and the
    // menus have been rebuilt, so gating on them keeps a divider from ever
    // rendering above an empty section.
    const { userAdminBiblio, userAdminUploader } = this.menus;
    const sections = [basicItems, adminItems];
    if (userAdminBiblio.length) sections.push(userAdminBiblio);
    if (userAdminUploader.length) sections.push(userAdminUploader);
    return sections;
  }

  get allowSecondaryIcon() {
    return this.secondIdentitySlotMode === 'allow';
  }

  get searchSlot() {
    return html`<slot name="search" slot="search"></slot>`;
  }

  get secondLogoSlot() {
    return this.allowSecondaryIcon
      ? html`
          <slot name="opt-sec-logo" slot="opt-sec-logo"></slot>
          <slot name="opt-sec-logo-mobile" slot="opt-sec-logo-mobile"></slot>
        `
      : nothing;
  }

  get separatorTemplate() {
    return html`<li class="divider" role="presentation"></li>`;
  }

  render() {
    return html`
      <div class="topnav">
        <ia-topnav-primary-nav
          .baseHost=${this.normalizedBaseHost}
          .mediaBaseHost=${this.mediaBaseHost}
          .config=${this.config}
          .openMenu=${this.openMenu}
          .screenName=${this.screenName}
          .secondIdentitySlotMode=${this.secondIdentitySlotMode}
          .selectedMenuOption=${this.selectedMenuOption}
          .username=${this.username}
          .userProfileImagePath=${this.userProfileImagePath}
          .currentTab=${this.currentTab}
          ?hideSearch=${this.hideSearch}
          @mediaTypeSelected=${this.mediaTypeSelected}
          @trackClick=${this.trackClick}
          @trackSubmit=${this.trackSubmit}
          @menuToggled=${this.menuToggled}
        >
          ${this.secondLogoSlot} ${this.searchSlot}
        </ia-topnav-primary-nav>
        <ia-topnav-media-slider
          .baseHost=${this.normalizedBaseHost}
          .config=${this.config}
          .selectedMenuOption=${this.selectedMenuOption}
          .mediaSliderOpen=${this.mediaSliderOpen}
          .menus=${this.menus}
          tabindex="${this.mediaSliderOpen ? '1' : '-1'}"
          @focusToOtherMenuItem=${(e: CustomEvent) =>
            (this.currentTab = e.detail)}
        ></ia-topnav-media-slider>
      </div>
      ${this.username ? this.userMenu : this.signedOutDropdown}
      <ia-topnav-desktop-subnav
        .baseHost=${this.normalizedBaseHost}
        .menuItems=${this.menus.more.links}
        @focus=${this.closeMenus}
      ></ia-topnav-desktop-subnav>
      <div
        id="close-layer"
        class="${this.closeLayerClass}"
        @click=${this.closeMenus}
      ></div>
    `;
  }
}
