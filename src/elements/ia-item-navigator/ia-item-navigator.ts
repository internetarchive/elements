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
import './ia-menu-slider';
import './ia-itemnav-loader';
import './ia-no-theater-available';
import type { IAMenuSlider } from './ia-menu-slider';

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
  ModalManagerInterface,
  SharedResizeObserverInterface,
  SharedResizeObserverResizeHandlerInterface,
} from './interfaces/service-interfaces';

/**
 * A fullscreen-capable frame that hosts an Archive.org item's theater. The
 * consumer projects a header bar and the theater itself into the `header` and
 * `main` slots; a collapsible left drawer (`ia-menu-slider`) is driven by a
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

  @property({ attribute: false }) modal?: ModalManagerInterface;

  @property({ attribute: false })
  sharedObserver?: SharedResizeObserverInterface;

  @property({ type: Boolean, reflect: true, attribute: true }) loaded: boolean =
    false;

  @state() openMenuState: 'overlay' | 'shift' = 'shift';

  @query('#frame') private frame!: HTMLDivElement;

  @query('slot[name="header"]') private headerSlot!: HTMLSlotElement;

  @query('ia-menu-slider') private menuSlider!: IAMenuSlider;

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
          <ia-itemnav-loader
            .loaderMessage=${this.loaderTitle}
          ></ia-itemnav-loader>
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
    return html`<ia-no-theater-available
      .identifier=${this.item?.metadata?.identifier}
      @loadingStateUpdated=${this.loadingStateUpdated}
    ></ia-no-theater-available>`;
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
    this.menuOpened = forceValue !== undefined ? forceValue : !this.menuOpened;
    if (this.menuOpened) {
      // Move focus to the <ia-menu-slider>
      this.updateComplete.then(() => {
        const closeButton = this.menuSlider?.shadowRoot?.querySelector(
          'button.close',
        ) as HTMLElement;
        closeButton?.focus();
      });
    } else {
      // Move focus back to the menu toggle button
      this.updateComplete.then(() => {
        this.toggleMenuButton?.focus();
      });
    }
  }

  closeMenu(): void {
    this.toggleMenu(false);
  }

  setOpenMenu(e: ToggleSidePanelOpenEvent): void {
    const { id } = e.detail;
    this.openMenu = id !== this.openMenu ? id : undefined;
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
    return html`
      <button
        class="toggle-menu"
        @click=${() => this.toggleMenu()}
        title="Open side panel"
        aria-label="Open side panel"
        aria-expanded="false"
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
      <nav>
        <div class="minimized ${classMap({ hidden: this.menuOpened })}">
          ${this.shortcuts} ${this.menuToggleButton}
        </div>
        <div id="menu" class=${classMap({ hidden: !this.menuOpened })}>
          <ia-menu-slider
            .menus=${this.menuContents}
            .selectedMenu=${this.selectedMenuId}
            @menuTypeSelected=${this.setOpenMenu}
            @menuSliderClosed=${this.closeMenu}
            manuallyHandleClose
            open
          ></ia-menu-slider>
        </div>
      </nav>
    `;
  }
  /** End Side menu */

  /** Menu Shortcuts */
  openShortcut(selectedMenuId: MenuId = ''): void {
    this.openMenu = selectedMenuId;
    this.menuOpened = true;
  }

  get shortcuts(): TemplateResult {
    const shortcuts = this.menuShortcuts.map(({ icon, id, label }) => {
      if (id === 'fullscreen') {
        return html`${icon}`;
      }

      return html`
        <button
          class="shortcut ${id}"
          @click=${() => this.openShortcut(id)}
          title=${label}
          aria-label=${label}
          aria-expanded="false"
        >
          ${icon}
        </button>
      `;
    });
    return html`<div class="shortcuts">${shortcuts}</div>`;
  }
  /** End Menu Shortcuts */

  /** Misc Render */
  get menuClass(): string {
    const hasMenuOrShortcuts =
      this.menuContents?.length || this.menuShortcuts?.length;
    const drawerState = this.menuOpened && hasMenuOrShortcuts ? 'open' : '';
    const fullscreenState = this.viewportInFullscreen ? 'fullscreen' : '';
    return `${drawerState} ${fullscreenState} ${this.openMenuState}`;
  }

  static get styles(): CSSResultGroup {
    const subnavWidth = css`var(--item-navigator-menu-width--)`;
    const transitionTiming = css`var(--item-navigator-animation-timing--)`;
    const transitionEffect = css`transform ${transitionTiming} ease-out`;
    const menuMargin = css`var(--item-navigator-menu-margin--)`;
    const theaterBg = css`var(--item-navigator-theater-bg-color--)`;
    const iconWidth = css`var(--item-navigator-icon-width--)`;
    const iconHeight = css`var(--item-navigator-icon-height--)`;

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
          --item-navigator-icon-width--: var(
            --item-navigator-icon-width,
            2.4rem
          );
          --item-navigator-icon-height--: var(
            --item-navigator-icon-height,
            2.4rem
          );
          --item-navigator-icon-stroke-color--: var(
            --item-navigator-icon-stroke-color,
            var(--true-white)
          );
          --item-navigator-icon-fill-color--: var(
            --item-navigator-icon-fill-color,
            var(--true-white)
          );
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

        ia-itemnav-loader {
          display: block;
          width: 100%;
        }

        .hidden {
          display: none !important;
        }

        button {
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
          margin-bottom: 0.2rem;
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
          border: 2px solid var(--item-navigator-icon-stroke-color--);
          border-radius: ${iconWidth};
          width: ${iconWidth};
          height: ${iconHeight};
          margin: auto;
        }

        .toggle-menu .ia-icon,
        .shortcuts .ia-icon {
          width: ${iconWidth};
          height: ${iconHeight};
        }

        .ia-icon .fill-color {
          fill: var(--item-navigator-icon-fill-color--);
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
        }

        #reader > * {
          width: 100%;
          display: flex;
          flex: 1;
        }

        .open.overlay #reader {
          transition: none;
        }

        .open #menu {
          width: ${subnavWidth};
          transform: translateX(0);
          transition: ${transitionEffect};
        }

        .open.shift #reader {
          width: calc(100% - ${subnavWidth});
          margin-left: ${subnavWidth};
          transition: ${transitionEffect};
        }
      `,
    ];
  }
}
