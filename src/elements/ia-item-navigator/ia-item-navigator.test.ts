import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test, vi } from 'vitest';

import { IAItemNavigator } from './ia-item-navigator';
import './ia-item-navigator';
import type { IAMenuSlider } from './ia-menu-slider';
import type { IANoTheaterAvailable } from './ia-no-theater-available';
import type { MenuProviderInterface } from './interfaces/menu-interfaces';

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
});
