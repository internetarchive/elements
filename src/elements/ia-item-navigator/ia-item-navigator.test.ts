import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test, vi } from 'vitest';

import { IAItemNavigator } from './ia-item-navigator';
import './ia-item-navigator';
import type { IAMenuSlider } from './ia-menu-slider';
import type { IANoTheaterAvailable } from './ia-no-theater-available';
import type {
  MenuProviderInterface,
  MenuShortcutInterface,
} from './interfaces/menu-interfaces';
import type {
  SharedResizeObserverConfig,
  SharedResizeObserverInterface,
} from './interfaces/service-interfaces';

/** Records the target/handler pairs the navigator registers. */
class MockResizeObserver implements SharedResizeObserverInterface {
  added: SharedResizeObserverConfig[] = [];
  removed: SharedResizeObserverConfig[] = [];
  addObserver(config: SharedResizeObserverConfig): void {
    this.added.push(config);
  }
  removeObserver(config: SharedResizeObserverConfig): void {
    this.removed.push(config);
  }
}

/** Builds a minimal, well-typed menu provider for tests. */
function provider(
  id: string,
  overrides: Partial<MenuProviderInterface> = {},
): MenuProviderInterface {
  return {
    id,
    label: `${id} label`,
    icon: html`<span class="test-icon">${id}</span>`,
    item: { metadata: { identifier: 'test-item' } } as never,
    baseHost: 'archive.org',
    subPrefix: '',
    component: html`<div class="panel-body">${id} body</div>`,
    ...overrides,
  };
}

describe('IAItemNavigator', () => {
  test('renders the frame with sensible defaults', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );

    expect(el).to.be.instanceOf(IAItemNavigator);
    expect(el.shadowRoot?.querySelector('#frame')).to.exist;
    expect(el.viewAvailable).to.equal(true);
    expect(el.loaded).to.equal(false);
    expect(el.menuOpened).to.equal(false);
    expect(el.openMenuState).to.equal('shift');
    expect(el.baseHost).to.equal('archive.org');
  });

  test('shows the loading spinner until loaded, then hides it', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );

    expect(el.shadowRoot?.querySelector('ia-itemnav-loader')).to.exist;

    el.loaded = true;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('ia-itemnav-loader')).to.not.exist;
  });

  test('renders no side menu when there are no providers', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );

    expect(el.shouldRenderMenu).to.equal(false);
    expect(el.shadowRoot?.querySelector('nav')).to.not.exist;
  });

  test('renders the drawer and toggle button once providers are set', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );
    el.menuContents = [provider('contents'), provider('about')];
    await el.updateComplete;

    expect(el.shouldRenderMenu).to.equal(true);
    expect(el.shadowRoot?.querySelector('nav')).to.exist;
    expect(el.shadowRoot?.querySelector('button.toggle-menu')).to.exist;
    expect(el.shadowRoot?.querySelector('ia-menu-slider')).to.exist;
  });

  test('toggleMenu / closeMenu drive the menuOpened state', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );
    el.menuContents = [provider('contents')];
    await el.updateComplete;

    el.toggleMenu();
    expect(el.menuOpened).to.equal(true);

    el.toggleMenu();
    expect(el.menuOpened).to.equal(false);

    el.toggleMenu(true);
    expect(el.menuOpened).to.equal(true);

    el.closeMenu();
    expect(el.menuOpened).to.equal(false);
  });

  test('clicking the toggle button opens the drawer and marks the frame open', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );
    el.menuContents = [provider('contents')];
    await el.updateComplete;

    const toggle = el.shadowRoot?.querySelector(
      'button.toggle-menu',
    ) as HTMLButtonElement;
    toggle.click();
    await el.updateComplete;

    expect(el.menuOpened).to.equal(true);
    expect(el.shadowRoot?.querySelector('#frame')?.className).to.contain(
      'open',
    );
  });

  test('passes providers and selected menu through to the slider', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );
    const providers = [provider('contents'), provider('about')];
    el.menuContents = providers;
    el.openMenu = 'about';
    await el.updateComplete;

    const slider = el.shadowRoot?.querySelector<IAMenuSlider>('ia-menu-slider');
    expect(slider).to.exist;
    expect(slider?.menus).to.have.lengthOf(2);
    expect(slider?.selectedMenu).to.equal('about');
  });

  test('shows the no-theater placeholder when the view is unavailable', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator
        .item=${{ metadata: { identifier: 'abc123' } } as never}
      ></ia-item-navigator>`,
    );
    el.viewAvailable = false;
    await el.updateComplete;

    const placeholder = el.shadowRoot?.querySelector<IANoTheaterAvailable>(
      'ia-no-theater-available',
    );
    expect(placeholder).to.exist;
    expect(placeholder?.identifier).to.equal('abc123');
  });

  test('loadingStateUpdated marks the navigator loaded', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );

    el.loadingStateUpdated(
      new CustomEvent('loadingStateUpdated', {
        detail: { loaded: true },
      }) as never,
    );
    expect(el.loaded).to.equal(true);
  });

  test('slotChange re-dispatches a slotChange event with the slot type', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );
    const listener = vi.fn();
    el.addEventListener('slotChange', listener);

    const slot = el.shadowRoot?.querySelector(
      'slot[name="header"]',
    ) as HTMLSlotElement;
    slot.dispatchEvent(new Event('slotchange'));

    expect(listener).toHaveBeenCalledOnce();
    expect(listener.mock.calls[0][0].detail.type).to.equal('header');
  });

  test('manageViewportFullscreen reflects state and re-emits fullscreenToggled', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );
    const listener = vi.fn();
    el.addEventListener('fullscreenToggled', listener);

    el.manageViewportFullscreen(
      new CustomEvent('x', { detail: { isFullScreen: true } }) as never,
    );
    expect(el.viewportInFullscreen).to.equal(true);
    expect(listener).toHaveBeenCalledOnce();

    el.manageViewportFullscreen(
      new CustomEvent('x', { detail: { isFullScreen: false } }) as never,
    );
    expect(el.viewportInFullscreen).to.equal(null);
  });

  test('handleResize switches between overlay and shift at 600px', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );

    el.handleResize({ contentRect: { width: 500 } } as ResizeObserverEntry);
    expect(el.openMenuState).to.equal('overlay');

    el.handleResize({ contentRect: { width: 900 } } as ResizeObserverEntry);
    expect(el.openMenuState).to.equal('shift');
  });

  test('setOpenMenu toggles the selected panel on repeat selection', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );

    el.setOpenMenu(new CustomEvent('x', { detail: { id: 'share' } }) as never);
    expect(el.openMenu).to.equal('share');

    el.setOpenMenu(new CustomEvent('x', { detail: { id: 'share' } }) as never);
    expect(el.openMenu).to.equal(undefined);
  });

  test('openShortcut opens the drawer at the requested menu', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );

    el.openShortcut('contents');
    expect(el.openMenu).to.equal('contents');
    expect(el.menuOpened).to.equal(true);
  });

  test('closeSidePanel clears the open channel but leaves the drawer open', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );
    el.menuContents = [provider('contents')];
    el.openShortcut('contents');
    await el.updateComplete;
    expect(el.openMenu).to.equal('contents');
    expect(el.menuOpened).to.equal(true);

    el.closeSidePanel();
    expect(el.openMenu).to.equal(undefined);
    // The sub-panel closing must not close the drawer itself.
    expect(el.menuOpened).to.equal(true);
  });

  test("the slider's menuPanelClosed event clears openMenu without closing the drawer", async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );
    el.menuContents = [provider('contents')];
    el.openShortcut('contents');
    await el.updateComplete;

    const slider = el.shadowRoot?.querySelector('ia-menu-slider');
    slider?.dispatchEvent(
      new CustomEvent('menuPanelClosed', {
        detail: { id: 'contents' },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;

    expect(el.openMenu).to.equal(undefined);
    expect(el.menuOpened).to.equal(true);
  });

  test('a channel can be reopened after its sub-panel is closed', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );
    el.menuContents = [provider('contents'), provider('share')];
    el.openShortcut('share');
    await el.updateComplete;

    el.closeSidePanel();
    await el.updateComplete;
    expect(el.openMenu).to.equal(undefined);

    // Reopening the same channel works because openMenu was cleared in sync.
    el.openShortcut('share');
    expect(el.openMenu).to.equal('share');
    expect(el.menuOpened).to.equal(true);
  });

  test('decodes a base64-encoded item attribute into a MetadataResponse', async () => {
    const encoded = btoa(
      JSON.stringify({ metadata: { identifier: 'encoded-item' } }),
    );
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator item=${encoded}></ia-item-navigator>`,
    );
    expect(el.item?.metadata?.identifier).to.equal('encoded-item');
  });

  test('passes a non-string item attribute value through unchanged', async () => {
    // An empty attribute is not a base64 string, so the converter returns it
    // as-is rather than decoding.
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator item=""></ia-item-navigator>`,
    );
    expect(el.item?.metadata?.identifier).to.equal(undefined);
  });

  test('loadingStateUpdated defaults a missing loaded flag to false', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator loaded></ia-item-navigator>`,
    );
    expect(el.loaded).to.equal(true);
    el.loadingStateUpdated(new CustomEvent('x', { detail: {} }) as never);
    expect(el.loaded).to.equal(false);
  });

  test('re-dispatches slotChange for the main slot too', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );
    const listener = vi.fn();
    el.addEventListener('slotChange', listener);

    const mainSlot = el.shadowRoot?.querySelector(
      'slot[name="main"]',
    ) as HTMLSlotElement;
    mainSlot.dispatchEvent(new Event('slotchange'));

    expect(listener).toHaveBeenCalledOnce();
    expect(listener.mock.calls[0][0].detail.type).to.equal('main');
  });

  test('shows the fullscreen loader title while loading in fullscreen', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );
    expect(el.loaderTitle).to.equal('');
    el.viewportInFullscreen = true;
    expect(el.loaderTitle).to.equal('Internet Archive');
  });

  test('registers with, updates, and detaches from the shared resize observer', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );
    const observer = new MockResizeObserver();
    el.sharedObserver = observer;
    await el.updateComplete;

    // Registers both the frame and the header slot.
    expect(observer.added.length).to.equal(2);
    const headerReg = observer.added.find(
      (c) => c.target === el.shadowRoot?.querySelector('slot[name="header"]'),
    );
    expect(headerReg).to.exist;

    // The header handler requests an update only when it has a measured height.
    const spy = vi.spyOn(el, 'requestUpdate');
    headerReg?.handler.handleResize({
      contentRect: { height: 40 },
    } as ResizeObserverEntry);
    headerReg?.handler.handleResize({
      contentRect: { height: 0 },
    } as ResizeObserverEntry);
    expect(spy).toHaveBeenCalledTimes(1);

    // Swapping observers detaches from the previous one.
    const next = new MockResizeObserver();
    el.sharedObserver = next;
    await el.updateComplete;
    expect(observer.removed.length).to.be.greaterThan(0);

    // Disconnecting detaches from the observer.
    el.remove();
    expect(next.removed.length).to.be.greaterThan(0);
  });

  test('setMenuContents and setMenuShortcuts copy the incoming arrays', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );
    const contents = [provider('a'), provider('b')];
    el.setMenuContents(new CustomEvent('x', { detail: contents }) as never);
    expect(el.menuContents).to.have.lengthOf(2);
    expect(el.menuContents).to.not.equal(contents); // copied, not aliased

    const shortcuts: MenuShortcutInterface[] = [
      { id: 'a', label: 'A', icon: html`a` },
    ];
    el.setMenuShortcuts(new CustomEvent('x', { detail: shortcuts }) as never);
    expect(el.menuShortcuts).to.have.lengthOf(1);
    expect(el.menuShortcuts).to.not.equal(shortcuts);
  });

  test('manageSideMenuEvents ignores empty ids and handles open/toggle', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );

    // No menuId → no-op.
    el.manageSideMenuEvents(
      new CustomEvent('x', { detail: { menuId: '', action: 'open' } }) as never,
    );
    expect(el.menuOpened).to.equal(false);

    // action: 'open' → opens at that menu.
    el.manageSideMenuEvents(
      new CustomEvent('x', {
        detail: { menuId: 'share', action: 'open' },
      }) as never,
    );
    expect(el.openMenu).to.equal('share');
    expect(el.menuOpened).to.equal(true);

    // action: 'toggle' → sets menu and toggles the drawer (closed here).
    el.manageSideMenuEvents(
      new CustomEvent('x', {
        detail: { menuId: 'about', action: 'toggle' },
      }) as never,
    );
    expect(el.openMenu).to.equal('about');
    expect(el.menuOpened).to.equal(false);

    // An unrecognized action is a no-op (neither open nor toggle).
    el.manageSideMenuEvents(
      new CustomEvent('x', {
        detail: { menuId: 'about', action: '' },
      }) as never,
    );
    expect(el.openMenu).to.equal('about');
    expect(el.menuOpened).to.equal(false);
  });

  test('renders shortcut buttons and passes through a fullscreen shortcut', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator></ia-item-navigator>`,
    );
    el.menuContents = [provider('share')];
    el.menuShortcuts = [
      { id: 'share', label: 'Share', icon: html`<span class="sc">S</span>` },
      { id: 'fullscreen', label: 'FS', icon: html`<span class="fs">F</span>` },
    ];
    await el.updateComplete;

    // The non-fullscreen shortcut becomes a button; fullscreen renders raw.
    const shareShortcut = el.shadowRoot?.querySelector(
      'button.shortcut.share',
    ) as HTMLButtonElement;
    expect(shareShortcut).to.exist;
    expect(el.shadowRoot?.querySelector('button.shortcut.fullscreen')).to.not
      .exist;
    expect(el.shadowRoot?.querySelector('.fs')).to.exist;

    // Clicking a shortcut opens the drawer at that channel.
    shareShortcut.click();
    expect(el.openMenu).to.equal('share');
    expect(el.menuOpened).to.equal(true);
  });
});
