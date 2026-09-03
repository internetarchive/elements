import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test, vi } from 'vitest';

import { IAItemNavigator } from './ia-item-navigator';
import './ia-item-navigator';
import type { IAItemNavMenuSlider } from './ia-itemnav-menu-slider';
import type { IAItemNavNoTheaterAvailable } from './ia-itemnav-no-theater-available';
import type {
  MenuProviderInterface,
  MenuShortcutInterface,
} from './interfaces/menu-interfaces';
/** Builds a minimal, well-typed menu provider for tests. */
function provider(
  id: string,
  overrides: Partial<MenuProviderInterface> = {},
): MenuProviderInterface {
  return {
    id,
    label: `${id} label`,
    icon: html`<span class="test-icon">${id}</span>`,
    identifier: 'test-item',
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
    expect(el.baseHost).to.equal('archive.org');
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
    expect(el.shadowRoot?.querySelector('ia-itemnav-menu-slider')).to.exist;
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

    const slider = el.shadowRoot?.querySelector<IAItemNavMenuSlider>(
      'ia-itemnav-menu-slider',
    );
    expect(slider).to.exist;
    expect(slider?.menus).to.have.lengthOf(2);
    expect(slider?.selectedMenu).to.equal('about');
  });

  test('shows the no-theater placeholder when the view is unavailable', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator identifier="abc123"></ia-item-navigator>`,
    );
    el.viewAvailable = false;
    await el.updateComplete;

    const placeholder =
      el.shadowRoot?.querySelector<IAItemNavNoTheaterAvailable>(
        'ia-itemnav-no-theater-available',
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

  test('gives the drawer its own column above 600px and overlays below it', async () => {
    // A container query drives this, so it has to be measured in real layout
    // rather than by poking a method. Animation off so the computed values are
    // the settled ones, not a frame mid-transition.
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator
        style="display: block; width: 900px; --item-navigator-animation-timing: 0ms;"
        .menuContents=${[provider('files')]}
      ></ia-item-navigator>`,
    );
    el.menuOpened = true;
    await el.updateComplete;

    const reader = el.shadowRoot?.querySelector('#reader') as HTMLElement;

    // Wide: the reader is inset by the drawer's width, so they sit side by side.
    reader.getBoundingClientRect();
    expect(getComputedStyle(reader).marginLeft).to.equal('320px');

    // Narrow: no room for a column, so the drawer covers a full-width reader.
    el.style.width = '400px';
    reader.getBoundingClientRect();
    expect(getComputedStyle(reader).marginLeft).to.equal('0px');

    // And back, to show the query tracks the frame rather than latching.
    el.style.width = '900px';
    reader.getBoundingClientRect();
    expect(getComputedStyle(reader).marginLeft).to.equal('320px');
  });

  test('the breakpoint follows the component width, not the viewport', async () => {
    // Two navigators in one document share a viewport, so any difference
    // between them can only come from their own widths — which is what a
    // container query buys over a media query.
    const wide = await fixture<IAItemNavigator>(
      html`<ia-item-navigator
        style="display: block; width: 900px; --item-navigator-animation-timing: 0ms;"
        .menuContents=${[provider('files')]}
      ></ia-item-navigator>`,
    );
    const narrow = await fixture<IAItemNavigator>(
      html`<ia-item-navigator
        style="display: block; width: 380px; --item-navigator-animation-timing: 0ms;"
        .menuContents=${[provider('files')]}
      ></ia-item-navigator>`,
    );
    wide.menuOpened = true;
    narrow.menuOpened = true;
    await Promise.all([wide.updateComplete, narrow.updateComplete]);

    const readerOf = (el: IAItemNavigator) =>
      el.shadowRoot?.querySelector('#reader') as HTMLElement;

    readerOf(wide).getBoundingClientRect();
    expect(getComputedStyle(readerOf(wide)).marginLeft).to.equal('320px');
    expect(getComputedStyle(readerOf(narrow)).marginLeft).to.equal('0px');
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

  describe('opening straight to a panel', () => {
    const navigatorWith = async (menus: string[]) => {
      const el = await fixture<IAItemNavigator>(
        html`<ia-item-navigator></ia-item-navigator>`,
      );
      el.menuContents = menus.map((id) => provider(id));
      await el.updateComplete;
      return el;
    };

    test('marks the drawer as entering so the panel rides in', async () => {
      const el = await navigatorWith(['contents']);

      el.openShortcut('contents');
      await el.updateComplete;

      // The panel is nested in the drawer, so sliding both would compound
      // their transforms; the marker tells the panel to hold still.
      expect(el.menuClass).to.contain('drawer-entering');
    });

    test('leaves the panel free to animate when the drawer is already open', async () => {
      const el = await navigatorWith(['contents', 'share']);
      el.openShortcut('contents');
      await el.updateComplete;

      // A second shortcut with the drawer already open is a panel change, not
      // a drawer opening, so the panel should slide across as usual.
      el.openShortcut('share');
      await el.updateComplete;
      expect(el.menuClass).to.not.contain('drawer-entering');
    });

    test.each([
      [
        'selecting another channel',
        (el: IAItemNavigator) =>
          el.setOpenMenu(
            new CustomEvent('menuTypeSelected', {
              detail: { id: 'share' },
            }) as never,
          ),
      ],
      ['closing the panel', (el: IAItemNavigator) => el.closeSidePanel()],
      ['closing the drawer', (el: IAItemNavigator) => el.closeMenu()],
    ])('%s clears the marker', async (_label, act) => {
      const el = await navigatorWith(['contents', 'share']);
      el.openShortcut('contents');
      await el.updateComplete;
      expect(el.menuClass).to.contain('drawer-entering');

      // Nothing waits on the drawer's transitionend to clear this — a
      // zero-duration transition never fires one, which would strand the
      // marker on and suppress the panel's animation for good.
      act(el);
      await el.updateComplete;
      expect(el.menuClass).to.not.contain('drawer-entering');
    });
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

    const slider = el.shadowRoot?.querySelector('ia-itemnav-menu-slider');
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

  test('takes the identifier straight from the attribute', async () => {
    // A plain string needs no converter, which is why the attribute and the
    // property agree without one.
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator identifier="an-item"></ia-item-navigator>`,
    );
    expect(el.identifier).to.equal('an-item');
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

  test('the header slot tracks its content, margins included', async () => {
    // The navigator used to measure the slotted header and write the height
    // back as an inline style. `offsetHeight` excludes margins, so a header
    // with vertical margins was under-sized and its bottom margin overlapped
    // the reader. The slot sizes itself now, so the margin is part of the box.
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator loaded>
        <div slot="header">
          <div style="height: 15px; margin: 12px 0">header</div>
        </div>
        <div slot="main">theater</div>
      </ia-item-navigator>`,
    );
    await el.updateComplete;

    const slot = el.shadowRoot?.querySelector(
      'slot[name="header"]',
    ) as HTMLElement;
    const reader = el.shadowRoot?.querySelector('#reader') as HTMLElement;

    // 15px of content plus 12px top and bottom margin.
    expect(Math.round(slot.getBoundingClientRect().height)).to.equal(39);

    // Nothing carries an imposed height any more.
    expect(slot.getAttribute('style')).to.equal(null);

    // And the header no longer bleeds into the theater below it.
    const headerBottom = slot.getBoundingClientRect().bottom;
    expect(headerBottom).to.be.at.most(reader.getBoundingClientRect().top);
  });

  test('the header slot follows a header that changes height', async () => {
    const el = await fixture<IAItemNavigator>(
      html`<ia-item-navigator>
        <div slot="header"><div id="hdr" style="height: 20px">header</div></div>
      </ia-item-navigator>`,
    );
    await el.updateComplete;

    const slot = el.shadowRoot?.querySelector(
      'slot[name="header"]',
    ) as HTMLElement;
    expect(Math.round(slot.getBoundingClientRect().height)).to.equal(20);

    // No observer, no re-render — the slot is sized by its content.
    const inner = el.querySelector('#hdr') as HTMLElement;
    inner.style.height = '60px';
    expect(Math.round(slot.getBoundingClientRect().height)).to.equal(60);
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
