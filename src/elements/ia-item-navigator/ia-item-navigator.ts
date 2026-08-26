import {
  css,
  html,
  LitElement,
  PropertyValues,
  TemplateResult,
  nothing,
  type CSSResultGroup,
} from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { MetadataResponse } from '@internetarchive/metadata-service';
import themeStyles from '@src/themes/theme-styles';

import { ellipsesIcon } from './icons';
import './ia-itemnav-menu-slider';
import './ia-itemnav-loading-view';
import './ia-itemnav-no-theater-available';
import type { IAItemNavMenuSlider } from './ia-itemnav-menu-slider';

import {
  ToggleSideMenuOpenEvent,
  ToggleSidePanelOpenEvent,
  SetSideMenuContentsEvent,
  SetSideMenuShortcutsEvent,
  LoadingStateUpdatedEvent,
  ManageFullscreenEvent,
} from './interfaces/event-interfaces';
import {
  MenuProviderInterface,
  MenuShortcutInterface,
  MenuId,
} from './interfaces/menu-interfaces';
import {
  SharedResizeObserverInterface,
  SharedResizeObserverResizeHandlerInterface,
} from './interfaces/service-interfaces';

/**
 * A fullscreen-capable frame that hosts an Archive.org item's theater. The
 * consumer projects a header bar and the theater itself into the `header` and
 * `main` slots; a collapsible left drawer (`ia-itemnav-menu-slider`) is driven by a
 * data array of menu providers, and a minimized rail shows shortcut icons.
 *
 * The navigator is a shell — it does not know how to render any particular
 * viewer. Menu panel bodies are opaque `TemplateResult`s supplied by the
 * consumer via `menuContents`.
 */
@customElement('ia-item-navigator')
export class IAItemNavigator
  extends LitElement
  implements SharedResizeObserverResizeHandlerInterface
{
  @property({
    type: Object,
    converter: (value: string | MetadataResponse | null): MetadataResponse => {
      if (value && typeof value === 'string') {
        return new MetadataResponse(JSON.parse(atob(value)));
      }
      return value as MetadataResponse;
    },
  })
  item?: MetadataResponse;

  @property({ type: Boolean, reflect: true }) viewAvailable: boolean = true;

  @property({ type: String }) baseHost = 'archive.org';

  @property({ type: Boolean }) signedIn = false;

  @property({ type: Array }) menuContents: MenuProviderInterface[] = [];

  @property({ type: Array }) menuShortcuts: MenuShortcutInterface[] = [];

  @property({ type: Boolean, reflect: true, attribute: true })
  viewportInFullscreen: boolean | null = null;

  @property({ type: Boolean, reflect: true }) menuOpened = false;

  @property({ type: String, reflect: true }) openMenu?: MenuId;

  @property({ attribute: false })
  sharedObserver?: SharedResizeObserverInterface;

  @property({ type: Boolean, reflect: true, attribute: true }) loaded: boolean =
    false;

  @state() openMenuState: 'overlay' | 'shift' = 'shift';

  /**
   * Set for the render where the drawer opens straight to a panel, so the
   * panel holds still and rides in. Every other path clears it, rather
   * than waiting for the drawer's `transitionend` — that never fires when
   * animations are disabled, which would strand the flag on.
   */
  @state() private drawerEntering = false;

  @query('#frame') private frame!: HTMLDivElement;

  @query('slot[name="header"]') private headerSlot!: HTMLSlotElement;

  @query('ia-itemnav-menu-slider') private menuSlider!: IAItemNavMenuSlider;

  @query('button.toggle-menu') private toggleMenuButton!: HTMLButtonElement;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeResizeObserver();
  }

  updated(changed: PropertyValues): void {
    if (changed.has('sharedObserver')) {
      const oldObserver = changed.get(
        'sharedObserver',
      ) as SharedResizeObserverInterface;
      oldObserver?.removeObserver(this.resizeObserverConfig);
      this.setResizeObserver();
    }
  }

  /** Shared observer */
  handleResize(entry: ResizeObserverEntry): void {
    const { width } = entry.contentRect;
    if (width <= 600) {
      this.openMenuState = 'overlay';
      return;
    }
    this.openMenuState = 'shift';
  }

  private setResizeObserver(): void {
    this.sharedObserver?.addObserver(this.resizeObserverConfig);
    this.sharedObserver?.addObserver({
      target: this.headerSlot,
      handler: {
        handleResize: ({ contentRect }) => {
          if (contentRect.height) {
            this.requestUpdate();
          }
        },
      },
    });
  }

  private removeResizeObserver(): void {
    this.sharedObserver?.removeObserver(this.resizeObserverConfig);
  }

  get resizeObserverConfig(): {
    handler: SharedResizeObserverResizeHandlerInterface;
    target: Element;
  } {
    return {
      handler: this,
      target: this.frame,
    };
  }
  /** End shared observer */

  get loaderTitle(): string {
    return this.viewportInFullscreen ? 'Internet Archive' : '';
  }

  get loadingArea(): TemplateResult {
    return html`
      <div class="loading-area">
        <div class="loading-view">
          <ia-itemnav-loading-view
            .loaderMessage=${this.loaderTitle}
          ></ia-itemnav-loading-view>
        </div>
      </div>
    `;
  }

  slotChange(e: Event, type: 'header' | 'main'): void {
    const slottedContent = (
      e.target as HTMLSlotElement
    ).assignedNodes()?.[0] as HTMLElement;

    this.dispatchEvent(
      new CustomEvent('slotChange', {
        detail: { slot: slottedContent, type },
      }),
    );
    this.requestUpdate();
  }

  render(): TemplateResult {
    const displayReaderClass = this.loaded ? '' : 'hidden';
    const headerHeight =
      (this.headerSlot?.assignedNodes()[0] as HTMLElement)?.offsetHeight || 0;
    return html`
      <div id="frame" class=${this.menuClass}>
        <slot
          name="header"
          style=${`height: ${headerHeight}px`}
          @slotchange=${(e: Event) => this.slotChange(e, 'header')}
        ></slot>
        <div class="menu-and-reader">
          ${this.shouldRenderMenu ? this.renderSideMenu : nothing}
          <div id="reader" class=${displayReaderClass}>
            ${this.renderViewport}
          </div>
          ${!this.loaded ? this.loadingArea : nothing}
        </div>
      </div>
    `;
  }

  get noTheaterView(): TemplateResult {
    return html`<ia-itemnav-no-theater-available
      .identifier=${this.item?.metadata?.identifier}
      @loadingStateUpdated=${this.loadingStateUpdated}
    ></ia-itemnav-no-theater-available>`;
  }

  get renderViewport(): TemplateResult | typeof nothing {
    if (!this.viewAvailable) {
      return this.noTheaterView;
    }

    const slotVisibility = !this.loaded ? 'opacity: 0;' : 'opacity: 1;';
    return html`
      <div slot="main" style=${slotVisibility}>
        <slot
          name="main"
          @slotchange=${(e: Event) => this.slotChange(e, 'main')}
        ></slot>
      </div>
    `;
  }

  loadingStateUpdated(e: LoadingStateUpdatedEvent): void {
    const { loaded } = e.detail;
    this.loaded = loaded ?? false;
  }

  /** Fullscreen Management */
  manageViewportFullscreen(e: ManageFullscreenEvent): void {
    const fullscreenStatus = !!e.detail.isFullScreen;
    this.viewportInFullscreen = !fullscreenStatus ? null : fullscreenStatus;

    const event = new CustomEvent('fullscreenToggled', {
      detail: e.detail,
    }) as ManageFullscreenEvent;

    this.dispatchEvent(event);
  }
  /** End Fullscreen Management */

  /** Side menu */
  get shouldRenderMenu(): boolean {
    return !!this.menuContents?.length;
  }

  toggleMenu(forceValue: boolean | undefined = undefined): void {
    this.drawerEntering = false;
    this.menuOpened = forceValue !== undefined ? forceValue : !this.menuOpened;
    this.moveFocusForDrawer();
  }

  /**
   * Opening the drawer moves focus into it; closing hands focus back to the
   * toggle. Without this, opening from the shortcut rail would leave focus on
   * a button that is about to be hidden, dropping it to the document.
   */
  private moveFocusForDrawer(): void {
    this.updateComplete.then(() => {
      if (this.menuOpened) {
        this.menuSlider?.focusDrawer();
      } else {
        this.toggleMenuButton?.focus();
      }
    });
  }

  /**
   * Closing the drawer also closes whatever panel was open inside it, so the
   * two can't disagree and a stale panel can't reappear on the next open.
   */
  closeMenu(): void {
    this.openMenu = undefined;
    this.toggleMenu(false);
  }

  setOpenMenu(e: ToggleSidePanelOpenEvent): void {
    this.drawerEntering = false;
    const { id } = e.detail;
    this.openMenu = id !== this.openMenu ? id : undefined;
  }

  /**
   * Clears the open channel when the slider closes its sub-panel, without
   * closing the drawer. Keeps `openMenu` in sync with the slider so the same
   * channel can be reopened afterwards.
   */
  closeSidePanel(): void {
    this.drawerEntering = false;
    this.openMenu = undefined;
  }

  setMenuContents(e: SetSideMenuContentsEvent): void {
    const updatedContents = [...e.detail];
    this.menuContents = updatedContents;
  }

  setMenuShortcuts(e: SetSideMenuShortcutsEvent): void {
    this.menuShortcuts = [...e.detail];
  }

  /** Toggles Side Menu & Sets viewable subpanel  */
  manageSideMenuEvents(e: ToggleSideMenuOpenEvent): void {
    const { menuId, action } = e.detail;
    if (!menuId) {
      return;
    }

    if (action === 'open') {
      this.openShortcut(menuId);
    } else if (action === 'toggle') {
      this.openMenu = menuId;
      this.toggleMenu();
    }
  }

  get menuToggleButton(): TemplateResult {
    const label = this.menuOpened ? 'Close side panel' : 'Open side panel';
    return html`
      <button
        class="toggle-menu"
        @click=${() => this.toggleMenu()}
        title=${label}
        aria-label=${label}
        aria-expanded=${this.menuOpened}
        aria-controls="menu"
      >
        ${ellipsesIcon}
      </button>
    `;
  }

  get selectedMenuId(): MenuId | '' {
    return this.openMenu || '';
  }

  get renderSideMenu(): TemplateResult {
    return html`
      <nav aria-label="Item navigation">
        <div
          class="minimized ${classMap({ hidden: this.menuOpened })}"
          part="minimized-menu"
        >
          ${this.shortcuts} ${this.menuToggleButton}
        </div>
        <!-- Closed drawers are inert, so what is off-screen is also out of
             the tab order and the accessibility tree. -->
        <div
          id="menu"
          role="group"
          aria-label="Item navigation menu"
          ?inert=${!this.menuOpened}
        >
          <ia-itemnav-menu-slider
            .menus=${this.menuContents}
            .selectedMenu=${this.selectedMenuId}
            @menuTypeSelected=${this.setOpenMenu}
            @menuPanelClosed=${this.closeSidePanel}
            @menuSliderClosed=${this.closeMenu}
          ></ia-itemnav-menu-slider>
        </div>
      </nav>
    `;
  }
  /** End Side menu */

  /** Menu Shortcuts */
  openShortcut(selectedMenuId: MenuId = ''): void {
    // Opening straight to a panel is one movement: the drawer carries the
    // panel in, so the panel must not also slide (see `.drawer-entering`).
    // Only when the drawer is actually closed — switching shortcuts while it
    // is already open should still animate the panel across.
    this.drawerEntering = !this.menuOpened;
    this.openMenu = selectedMenuId;
    this.menuOpened = true;
    // The rail hides itself once the drawer opens, taking the focused
    // shortcut with it, so focus has to be placed deliberately.
    this.moveFocusForDrawer();
  }

  get shortcuts(): TemplateResult {
    const shortcuts = this.menuShortcuts.map(({ icon, id, label }) => {
      if (id === 'fullscreen') {
        return html`${icon}`;
      }

      return html`
        <li>
          <button
            class="shortcut ${id}"
            @click=${() => this.openShortcut(id)}
            title=${label}
            aria-label=${label}
            aria-expanded=${this.menuOpened && this.openMenu === id}
          >
            ${icon}
          </button>
        </li>
      `;
    });
    return html`<ul class="shortcuts" role="list">
      ${shortcuts}
    </ul>`;
  }
  /** End Menu Shortcuts */

  /** Misc Render */
  get menuClass(): string {
    const hasMenuOrShortcuts =
      this.menuContents?.length || this.menuShortcuts?.length;
    const drawerState = this.menuOpened && hasMenuOrShortcuts ? 'open' : '';
    const fullscreenState = this.viewportInFullscreen ? 'fullscreen' : '';
    // When the side menu renders, the minimized rail floats over the left edge;
    // `has-menu` lets the reader reserve its width so the theater isn't covered.
    const railState = this.shouldRenderMenu ? 'has-menu' : '';
    const enteringState = this.drawerEntering ? 'drawer-entering' : '';
    return `${drawerState} ${fullscreenState} ${railState} ${enteringState} ${this.openMenuState}`;
  }

  static get styles(): CSSResultGroup {
    const subnavWidth = css`var(--item-navigator-menu-width--)`;
    const transitionTiming = css`var(--item-navigator-animation-timing--)`;
    const transitionEffect = css`transform ${transitionTiming} ease-out`;
    const menuMargin = css`var(--item-navigator-menu-margin--)`;
    const theaterBg = css`var(--item-navigator-theater-bg-color--)`;
    const iconSize = css`var(--item-navigator-icon-size--)`;

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
          --item-navigator-menu-margin--: var(
            --item-navigator-menu-margin,
            42px
          );
          --item-navigator-theater-bg-color--: var(
            --item-navigator-theater-bg-color,
            #000
          );
          /* Every glyph is square, so one knob sizes both axes. */
          --item-navigator-icon-size--: var(--item-navigator-icon-size, 2.4em);
          /* Icons follow the adjustable text color by default. */
          --item-navigator-icon-color--: var(
            --item-navigator-icon-color,
            var(--item-navigator-text-color, var(--true-white))
          );

          /*
           * The component's internal sizing is expressed in em against this
           * base (10px matches petabox's base font size, which the upstream
           * demo set on the document root). Anchoring it here makes the
           * navigator self-contained — its scale no longer depends on the
           * consumer's root font-size. Override to rescale everything.
           */
          --item-navigator-base-font-size--: var(
            --item-navigator-base-font-size,
            10px
          );
          font-size: var(--item-navigator-base-font-size--);
        }

        :host,
        #frame,
        .menu-and-reader {
          position: relative;
          overflow: hidden;
          display: block;
        }

        :host,
        #frame,
        .loading-area,
        .loading-view {
          min-height: inherit;
          height: inherit;
        }

        slot {
          display: block;
          width: 100%;
        }

        slot * {
          display: block;
          height: inherit;
        }

        #frame {
          background-color: ${theaterBg};
          color-scheme: dark;
          display: flex;
          flex-direction: column;
        }

        #frame.fullscreen {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9;
          /*
           * Override the inherited height/min-height from the base #frame rule:
           * on a fixed element an explicit height wins over top/bottom, so the
           * inset (0 on all sides) can't fill the viewport unless height is
           * released back to auto.
           */
          height: auto;
          min-height: 0;
        }

        .loading-view {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-area {
          width: 100%;
        }

        ia-itemnav-loading-view {
          display: block;
          width: 100%;
        }

        .hidden {
          display: none !important;
        }

        button {
          /* Buttons don't inherit font-size from the UA stylesheet; inherit it
             so em-sized icons resolve against the component's base, not the
             browser's default button font-size. */
          font: inherit;
          cursor: pointer;
          padding: 0;
          border: 0;
        }

        .menu-and-reader {
          position: relative;
          display: flex;
          flex: 1;
        }

        nav button {
          background: none;
        }

        nav .minimized {
          background: rgba(0, 0, 0, 0.7);
          padding-top: 6px;
          position: absolute;
          width: ${menuMargin};
          z-index: 2;
          left: 0;
          border-bottom-right-radius: 5%;
        }

        nav .minimized button {
          margin-bottom: 0.2em;
          margin: auto;
          display: inline-flex;
          vertical-align: middle;
          align-items: center;
          justify-content: center;
          width: ${menuMargin};
          height: ${menuMargin};
        }

        nav .minimized button > * {
          /** Prevent the icon's SVG description from stealing tooltip message */
          pointer-events: none;
        }

        nav .minimized button.toggle-menu > * {
          border: 2px solid var(--item-navigator-icon-color--);
          border-radius: ${iconSize};
          width: ${iconSize};
          height: ${iconSize};
          margin: auto;
        }

        /* The rail is a list for assistive tech; strip the list chrome so it
           still reads as a row of icons. */
        .shortcuts,
        .shortcuts li {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .toggle-menu .ia-icon,
        .shortcuts .ia-icon {
          width: ${iconSize};
          height: ${iconSize};
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

        #menu {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 3;
          overflow: hidden;
          width: ${subnavWidth};
          transform: translateX(calc(${subnavWidth} * -1));
          transition: ${transitionEffect};
        }

        #reader {
          position: relative;
          z-index: 1;
          transform: translateX(0);
          width: 100%;
          display: flex;
          /*
           * Ease the reader's size/position changes so the slotted theater
           * glides in sync with the sliding drawer (shift mode) and settles
           * smoothly on resize, rather than snapping. Overlay mode opts out
           * below so the full-width theater tracks resizes instantly.
           */
          transition:
            width ${transitionTiming} ease-out,
            margin-left ${transitionTiming} ease-out,
            transform ${transitionTiming} ease-out;
        }

        #reader > * {
          width: 100%;
          display: flex;
          flex: 1;
        }

        /*
         * The minimized rail floats over the frame's left edge while the drawer
         * is closed, so pad the theater content by its width to avoid overlap.
         * This lives on the reader's content (not the reader box) and isn't
         * transitioned, so it snaps away on open — letting the reader box track
         * the drawer's edge exactly during the shift, rather than trailing it.
         */
        .has-menu:not(.open) #reader > * {
          box-sizing: border-box;
          padding-left: ${menuMargin};
        }

        .open.overlay #reader {
          transition: none;
        }

        /* Opening straight to a panel is one movement. The panel is nested in
           #menu, so its own slide would compose with the drawer's transform
           and send it twice the distance in the same time — arriving late and
           travelling at double speed. Holding it still lets the drawer carry
           it in. */
        .drawer-entering #menu {
          --item-navigator-panel-transition--: none;
        }

        .open #menu {
          width: ${subnavWidth};
          transform: translateX(0);
          transition: ${transitionEffect};
        }

        .open.shift #reader {
          width: calc(100% - ${subnavWidth});
          margin-left: ${subnavWidth};
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-item-navigator': IAItemNavigator;
  }
}
