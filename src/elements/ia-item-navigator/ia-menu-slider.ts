import {
  css,
  html,
  LitElement,
  nothing,
  TemplateResult,
  type CSSResultGroup,
} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import themeStyles from '@src/themes/theme-styles';
import { collapseSidebarIcon } from './icons';
import './ia-menu-button';
import { MenuProviderInterface } from './interfaces/menu-interfaces';

const sliderEvents = {
  closeDrawer: 'menuSliderClosed',
  closePanel: 'menuPanelClosed',
};

/**
 * The sliding drawer that lists the navigator's menu providers and renders the
 * body of whichever provider is currently selected.
 */
@customElement('ia-menu-slider')
export class IAMenuSlider extends LitElement {
  @property({ type: Array }) menus: MenuProviderInterface[] = [];

  @property({ type: Boolean }) open = false;

  @property({ type: Boolean }) manuallyHandleClose = false;

  @property({ type: String }) selectedMenu = '';

  @property({ type: Object }) selectedMenuAction:
    | TemplateResult
    | typeof nothing = nothing;

  @property({ type: Boolean }) animateMenuOpen = false;

  @query('.content.open button.close') contentCloseButton!: HTMLElement;

  @query('.menu-list') menuList!: HTMLUListElement;

  updated(): void {
    const actionButton = this.selectedMenuDetails?.actionButton || nothing;
    const actionButtonHasChanged = actionButton !== this.selectedMenuAction;
    if (actionButtonHasChanged) {
      this.selectedMenuAction = actionButton;
    }
  }

  /**
   * Event handler, captures state of selected menu
   */
  setSelectedMenu({ detail }: CustomEvent): void {
    const { id } = detail;
    this.selectedMenu = this.selectedMenu === id ? '' : id;
    this.selectedMenuAction = this.selectedMenuDetails?.actionButton || nothing;
    this.updateComplete.then(() => {
      this.contentCloseButton?.focus();
    });
  }

  /**
   * closes menu drawer
   */
  closeMenu(): void {
    if (!this.manuallyHandleClose) {
      this.open = false;
    }
    const { closeDrawer } = sliderEvents;
    const drawerClosed = new CustomEvent(closeDrawer, {
      detail: this.selectedMenuDetails,
    });
    this.dispatchEvent(drawerClosed);
  }

  closePanel(): void {
    const menuId = this.selectedMenu;
    this.selectedMenu = '';
    this.selectedMenuAction = nothing;

    // Notify the host so it can clear its own record of the open channel,
    // keeping the sub-panel's open/close independent of — but consistent
    // with — the drawer's open/close.
    this.dispatchEvent(
      new CustomEvent(sliderEvents.closePanel, {
        detail: { id: menuId },
      }),
    );

    // Return focus to the menu button that was previously selected
    if (menuId) {
      this.updateComplete.then(() => {
        const menuIndex = this.menus.findIndex((menu) => menu.id === menuId);
        if (menuIndex !== -1) {
          const menuButton = this.menuList.querySelector(
            `li:nth-child(${menuIndex + 1}) ia-menu-button`,
          ) as HTMLElement;
          menuButton?.focus();
        }
      });
    }
  }

  /**
   * Handle keyboard events, specifically ESC key to close menu details
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (this.selectedMenu) {
        this.closePanel();
      } else {
        this.closeMenu();
      }
    }
  }

  get selectedMenuDetails(): MenuProviderInterface | undefined {
    return this.menus.find((menu) => menu.id === this.selectedMenu);
  }

  /* render */

  get sliderDetailsClass(): string {
    const animate = this.animateMenuOpen ? 'animate' : '';
    const state = this.open ? 'open' : '';
    return `${animate} ${state}`;
  }

  get selectedMenuClass(): string {
    return this.selectedMenu ? 'open' : '';
  }

  get menuItems(): TemplateResult[] {
    return this.menus.map(
      (menu) => html`
        <li>
          <ia-menu-button
            @menuTypeSelected=${this.setSelectedMenu}
            .icon=${menu.icon}
            .label=${menu.label}
            .menuDetails=${menu.menuDetails || ''}
            .buttonId=${menu.id}
            .selected=${menu.id === this.selectedMenu}
            .followable=${menu.followable || false}
            .href=${menu.href || ''}
          ></ia-menu-button>
        </li>
      `,
    );
  }

  get renderMenuHeader(): TemplateResult {
    const { label = '', menuDetails = '' } = this.selectedMenuDetails || {};
    // `selectedMenuAction` defaults to Lit's `nothing` sentinel, which is
    // truthy — so compare against it explicitly, otherwise the header would
    // always get the secondary-action treatment (and an empty action span).
    const hasAction = this.selectedMenuAction !== nothing;
    const headerClass = hasAction ? 'with-secondary-action' : '';
    const actionBlock = hasAction
      ? html`<span class="custom-action">${this.selectedMenuAction}</span>`
      : nothing;
    return html`
      <header class=${headerClass}>
        <div class="details">
          <h3>${label}</h3>
          <span class="extra-details">${menuDetails}</span>
        </div>
        ${actionBlock}
        <button
          class="close"
          aria-label="Close this menu"
          title="Close this menu"
          @click=${this.closePanel}
        >
          ${collapseSidebarIcon}
        </button>
      </header>
    `;
  }

  get closeButton(): TemplateResult {
    return html`
      <button
        class="close"
        aria-label="Close this menu"
        title="Close this menu"
        @click=${this.closeMenu}
      >
        ${collapseSidebarIcon}
      </button>
    `;
  }

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <div class="main" @keydown=${this.handleKeyDown}>
        <div class="menu ${this.sliderDetailsClass}">
          ${this.closeButton}
          <ul class="menu-list">
            ${this.menuItems}
          </ul>
          <div
            class="content ${this.selectedMenuClass}"
            @menuTypeSelected=${this.setSelectedMenu}
          >
            ${this.renderMenuHeader}
            <section>
              <div class="selected-menu">
                ${this.selectedMenuDetails?.component || nothing}
              </div>
            </section>
          </div>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    const menuButtonWidth = css`42px`;
    const sliderWidth = css`var(--item-navigator-menu-width--)`;
    const transitionTiming = css`var(--item-navigator-animation-timing--)`;

    return [
      themeStyles,
      css`
        :host {
          --item-navigator-menu-width--: var(
            --item-navigator-menu-width,
            320px
          );
          --item-navigator-animation-timing--: var(
            --item-navigator-animation-timing,
            200ms
          );
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-menu-slider-bg--: var(
            --item-navigator-menu-slider-bg,
            #212121
          );
          --item-navigator-active-button-bg--: var(
            --item-navigator-active-button-bg,
            var(--mid-gray)
          );
          --item-navigator-border-color--: var(
            --item-navigator-border-color,
            #4b4b4b
          );
          --item-navigator-header-icon-width--: var(
            --item-navigator-header-icon-width,
            2em
          );
          --item-navigator-header-icon-height--: var(
            --item-navigator-header-icon-height,
            2em
          );
          --item-navigator-icon-color--: var(
            --item-navigator-icon-color,
            var(--item-navigator-text-color--)
          );

          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        .main {
          overflow: hidden;
          width: 100%;
          height: 100%;
        }

        .animate {
          transition: transform ${transitionTiming} ease-out;
        }

        .menu {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: ${sliderWidth};
          padding: 0.5em 0.5em 0 0;
          box-sizing: border-box;
          font-size: 1.4em;
          color: var(--item-navigator-text-color--);
          background: var(--item-navigator-menu-slider-bg--);
          transform: translateX(calc(${sliderWidth} * -1));
        }

        button {
          cursor: pointer;
        }

        header {
          margin: 0 0 0.5em 0;
        }

        header * {
          margin: 0;
          display: inline-block;
        }

        header button {
          cursor: pointer;
        }

        header.with-secondary-action .details {
          width: 80%;
        }

        header .details {
          font-weight: bold;
          width: 88%;
        }

        header .custom-action > *,
        button.close {
          padding: 0;
          background-color: transparent;
          border: 0;
        }

        header .custom-action,
        button.close {
          position: absolute;
        }

        button.close {
          /* Reset to the base so the header icon (em) doesn't compound
             against .menu's enlarged font-size. */
          font-size: var(--item-navigator-base-font-size, 10px);
          min-width: 38px;
          min-height: 38px;
          display: flex;
          justify-content: center;
          align-items: center;
          right: 0;
          top: 0;
        }

        button.close .ia-icon {
          width: var(--item-navigator-header-icon-width--);
          height: var(--item-navigator-header-icon-height--);
        }

        .ia-icon .fill-color {
          fill: var(--item-navigator-icon-color--);
        }

        .content {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: ${menuButtonWidth};
          z-index: 1;
          transform: translateX(calc(${sliderWidth} * -1));
          transition: transform ${transitionTiming} ease-out;
          background: var(--item-navigator-active-button-bg--);
          border-right: 0.2em solid;
          border-color: var(--item-navigator-border-color--);
          padding: 0.5em 0 0 0.5em;
          display: flex;
          flex-direction: column;
        }

        .open {
          transform: translateX(0);
        }

        .menu-list {
          padding: 0;
          margin: 0;
          list-style: none;
          background: var(--item-navigator-menu-slider-bg--);
        }

        .menu-list li {
          margin-bottom: 0.2em;
        }

        .content > section {
          overflow: auto;
          overscroll-behavior: contain;
        }
      `,
    ];
  }
}
