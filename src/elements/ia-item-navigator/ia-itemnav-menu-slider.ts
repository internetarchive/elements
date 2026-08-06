import {
  css,
  html,
  LitElement,
  nothing,
  type PropertyValues,
  TemplateResult,
  type CSSResultGroup,
} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import themeStyles from '@src/themes/theme-styles';
import { collapseSidebarIcon } from './icons';
import './ia-itemnav-menu-button';
import type { IAItemNavMenuButton } from './ia-itemnav-menu-button';
import { MenuProviderInterface } from './interfaces/menu-interfaces';

const sliderEvents = {
  closeDrawer: 'menuSliderClosed',
  closePanel: 'menuPanelClosed',
};

/**
 * The sliding drawer that lists the navigator's menu providers and renders the
 * body of whichever provider is currently selected.
 */
@customElement('ia-itemnav-menu-slider')
export class IAItemNavMenuSlider extends LitElement {
  @property({ type: Array }) menus: MenuProviderInterface[] = [];

  /**
   * Which panel is open. The navigator owns this — the slider only reports
   * what the user did and renders whatever comes back, so there is one copy
   * of the state rather than two that have to agree.
   */
  @property({ type: String }) selectedMenu = '';

  @property({ type: Object }) selectedMenuAction:
    | TemplateResult
    | typeof nothing = nothing;

  @query('.content') private panel?: HTMLElement;

  @query('.menu-list') private menuList?: HTMLUListElement;

  @query('.menu > button.close') private drawerCloseButton?: HTMLElement;

  /** Focus should follow what the user did, not the first render. */
  private isFirstRender = true;

  protected updated(changed: PropertyValues): void {
    const actionButton = this.selectedMenuDetails?.actionButton || nothing;
    if (actionButton !== this.selectedMenuAction) {
      this.selectedMenuAction = actionButton;
    }

    if (!this.isFirstRender && changed.has('selectedMenu')) {
      this.moveFocusForSelection(changed.get('selectedMenu') as string);
    }
    this.isFirstRender = false;
  }

  /**
   * Opening a panel moves focus into it, so it is announced by name; closing
   * hands focus back to the button that opened it.
   */
  private moveFocusForSelection(previousMenu: string): void {
    if (this.selectedMenu) {
      this.panel?.focus();
    } else if (previousMenu) {
      this.menuButtonFor(previousMenu)?.focus();
    }
  }

  private menuButtonFor(menuId: string): IAItemNavMenuButton | undefined {
    const buttons =
      this.menuList?.querySelectorAll<IAItemNavMenuButton>(
        'ia-itemnav-menu-button',
      ) ?? [];
    return [...buttons].find((button) => button.buttonId === menuId);
  }

  /**
   * Moves focus into the drawer — the open panel if there is one, otherwise
   * the first thing worth acting on. Exposed so the navigator doesn't have to
   * reach through this component's shadow DOM to place focus.
   */
  focusDrawer(): void {
    if (this.selectedMenu) {
      this.panel?.focus();
      return;
    }
    const firstMenuButton = this.menuList?.querySelector<HTMLElement>(
      'ia-itemnav-menu-button',
    );
    (firstMenuButton ?? this.drawerCloseButton)?.focus();
  }

  /** Asks the navigator to close the whole drawer. */
  closeMenu(): void {
    this.dispatchEvent(
      new CustomEvent(sliderEvents.closeDrawer, {
        detail: this.selectedMenuDetails,
      }),
    );
  }

  /** Asks the navigator to close just the open panel. */
  closePanel(): void {
    this.dispatchEvent(
      new CustomEvent(sliderEvents.closePanel, {
        detail: { id: this.selectedMenu },
      }),
    );
  }

  /** Escape closes the panel first, then the drawer. */
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    if (this.selectedMenu) {
      this.closePanel();
    } else {
      this.closeMenu();
    }
  }

  get selectedMenuDetails(): MenuProviderInterface | undefined {
    return this.menus.find((menu) => menu.id === this.selectedMenu);
  }

  /* render */

  get selectedMenuClass(): string {
    return this.selectedMenu ? 'open' : '';
  }

  get menuItems(): TemplateResult[] {
    return this.menus.map(
      (menu) => html`
        <li>
          <ia-itemnav-menu-button
            .icon=${menu.icon}
            .label=${menu.label}
            .menuDetails=${menu.menuDetails || ''}
            .buttonId=${menu.id}
            .selected=${menu.id === this.selectedMenu}
            .followable=${menu.followable || false}
            .href=${menu.href || ''}
          ></ia-itemnav-menu-button>
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
    const closeLabel = label ? `Close ${label}` : 'Close this panel';
    return html`
      <header class=${headerClass}>
        <div class="details">
          <h3 id="panel-title">${label}</h3>
          <span class="extra-details">${menuDetails}</span>
        </div>
        ${actionBlock}
        <button
          class="close"
          aria-label=${closeLabel}
          title=${closeLabel}
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
        aria-label="Close navigation"
        title="Close navigation"
        @click=${this.closeMenu}
      >
        ${collapseSidebarIcon}
      </button>
    `;
  }

  /** @inheritdoc */
  render(): TemplateResult {
    const panelOpen = !!this.selectedMenu;
    return html`
      <div class="main" @keydown=${this.handleKeyDown}>
        <div class="menu">
          ${this.closeButton}
          <ul class="menu-list" role="list">
            ${this.menuItems}
          </ul>
          <!-- Closed panels are inert so the tab order and the accessibility
               tree agree with what is on screen; the slide is a consequence
               of the class, not something to wait on. -->
          <div
            class="content ${this.selectedMenuClass}"
            role="region"
            aria-labelledby="panel-title"
            tabindex="-1"
            ?inert=${!panelOpen}
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

        /* The drawer's own slide is owned by the navigator's #menu; this just
           fills it. */
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

        /* Our glyphs are masked spans: the mask supplies the shape, this
           supplies the paint. */
        span.ia-icon {
          background-color: var(--item-navigator-icon-color--);
        }

        /* Host-supplied icons may still be inline svg, so keep theming those
           the original way. */
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

        .content.open {
          transform: translateX(0);
        }

        .content:focus {
          outline: none;
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

declare global {
  interface HTMLElementTagNameMap {
    'ia-itemnav-menu-slider': IAItemNavMenuSlider;
  }
}
