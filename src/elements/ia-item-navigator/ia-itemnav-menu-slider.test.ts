import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test, vi } from 'vitest';

import { IAItemNavMenuSlider } from './ia-itemnav-menu-slider';
import './ia-itemnav-menu-slider';
import type { MenuProviderInterface } from './interfaces/menu-interfaces';

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

async function sliderWith(
  menus: MenuProviderInterface[],
): Promise<IAItemNavMenuSlider> {
  const el = await fixture<IAItemNavMenuSlider>(
    html`<ia-itemnav-menu-slider open></ia-itemnav-menu-slider>`,
  );
  el.menus = menus;
  await el.updateComplete;
  return el;
}

describe('IAItemNavMenuSlider', () => {
  test('renders one menu button per provider', async () => {
    const el = await sliderWith([provider('a'), provider('b'), provider('c')]);
    expect(
      el.shadowRoot?.querySelectorAll('ia-itemnav-menu-button'),
    ).to.have.lengthOf(3);
  });

  test('renders a close button', async () => {
    const el = await sliderWith([provider('a')]);
    expect(el.shadowRoot?.querySelector('button.close')).to.exist;
  });

  test('selecting a menu opens its panel; re-selecting it closes it', async () => {
    const el = await sliderWith([provider('a'), provider('b')]);

    el.setSelectedMenu(new CustomEvent('x', { detail: { id: 'a' } }));
    await el.updateComplete;
    expect(el.selectedMenu).to.equal('a');
    expect(el.selectedMenuClass).to.equal('open');

    el.setSelectedMenu(new CustomEvent('x', { detail: { id: 'a' } }));
    await el.updateComplete;
    expect(el.selectedMenu).to.equal('');
    expect(el.selectedMenuClass).to.equal('');
  });

  test('renders the selected provider body', async () => {
    const el = await sliderWith([provider('a'), provider('b')]);
    el.selectedMenu = 'b';
    await el.updateComplete;

    const body = el.shadowRoot?.querySelector('.selected-menu .panel-body');
    expect(body?.textContent).to.contain('b body');
  });

  test('closeMenu emits menuSliderClosed; manuallyHandleClose keeps it open', async () => {
    const el = await sliderWith([provider('a')]);
    el.manuallyHandleClose = true;
    await el.updateComplete;

    const listener = vi.fn();
    el.addEventListener('menuSliderClosed', listener);

    el.closeMenu();
    expect(listener).toHaveBeenCalledOnce();
    expect(el.open).to.equal(true); // left for the host to close

    el.manuallyHandleClose = false;
    el.closeMenu();
    expect(el.open).to.equal(false);
  });

  test('closing the sub-panel emits menuPanelClosed and clears the selection, without closing the drawer', async () => {
    const el = await sliderWith([provider('a'), provider('b')]);
    el.selectedMenu = 'a';
    await el.updateComplete;

    const panelClosed = vi.fn();
    const drawerClosed = vi.fn();
    el.addEventListener('menuPanelClosed', panelClosed);
    el.addEventListener('menuSliderClosed', drawerClosed);

    const closeButton = el.shadowRoot?.querySelector(
      '.content header button.close',
    ) as HTMLButtonElement;
    expect(closeButton).to.exist;
    closeButton.click();
    await el.updateComplete;

    expect(el.selectedMenu).to.equal('');
    expect(panelClosed).toHaveBeenCalledOnce();
    expect(panelClosed.mock.calls[0][0].detail.id).to.equal('a');
    // Closing the sub-panel is independent of the drawer's open/close.
    expect(drawerClosed).not.toHaveBeenCalled();
  });

  test('Escape closes the open panel first, then the drawer', async () => {
    const el = await sliderWith([provider('a')]);
    el.selectedMenu = 'a';
    await el.updateComplete;

    const closed = vi.fn();
    el.addEventListener('menuSliderClosed', closed);
    const main = el.shadowRoot?.querySelector('.main') as HTMLElement;

    // First Escape closes the panel, not the drawer.
    main.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await el.updateComplete;
    expect(el.selectedMenu).to.equal('');
    expect(closed).not.toHaveBeenCalled();

    // Second Escape closes the drawer.
    main.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(closed).toHaveBeenCalledOnce();
  });

  test('closePanel skips focus restoration when nothing was selected', async () => {
    const el = await sliderWith([provider('a')]);
    el.selectedMenu = '';
    await el.updateComplete;
    // menuId is empty → the focus-restore block is skipped, no throw.
    expect(() => el.closePanel()).to.not.throw();
    expect(el.selectedMenu).to.equal('');
  });

  test('closePanel tolerates a previously-selected menu that is no longer present', async () => {
    const el = await sliderWith([provider('a'), provider('b')]);
    // A selected id that isn't in the current menus → findIndex returns -1.
    el.selectedMenu = 'ghost';
    await el.updateComplete;
    el.closePanel();
    await el.updateComplete;
    await el.updateComplete; // let the queued focus-restore microtask run
    expect(el.selectedMenu).to.equal('');
  });

  test('ignores non-Escape keydowns', async () => {
    const el = await sliderWith([provider('a')]);
    el.selectedMenu = 'a';
    await el.updateComplete;

    const main = el.shadowRoot?.querySelector('.main') as HTMLElement;
    main.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await el.updateComplete;
    // Nothing changed — the panel stays open.
    expect(el.selectedMenu).to.equal('a');
  });

  test("surfaces a selected provider's action button in the panel header", async () => {
    const el = await sliderWith([
      provider('a', {
        actionButton: html`<button class="my-action">Sort</button>`,
      }),
      provider('b'),
    ]);
    el.selectedMenu = 'a';
    await el.updateComplete;
    // updated() sets selectedMenuAction, which schedules a follow-up render.
    await el.updateComplete;

    // renderMenuHeader then renders the action button inside the header.
    expect(el.selectedMenuAction).to.not.equal(undefined);
    const header = el.shadowRoot?.querySelector('.content header');
    expect(header?.classList.contains('with-secondary-action')).to.equal(true);
    expect(header?.querySelector('.custom-action .my-action')).to.exist;
  });

  test('a selected provider without an action button gets a plain header', async () => {
    const el = await sliderWith([provider('a'), provider('b')]);
    el.selectedMenu = 'b'; // provider('b') has no actionButton
    await el.updateComplete;
    await el.updateComplete;

    const header = el.shadowRoot?.querySelector('.content header');
    expect(header?.classList.contains('with-secondary-action')).to.equal(false);
    expect(header?.querySelector('.custom-action')).to.not.exist;
  });

  test('animateMenuOpen adds the animate class', async () => {
    const el = await sliderWith([provider('a')]);
    el.animateMenuOpen = true;
    await el.updateComplete;
    expect(el.sliderDetailsClass).to.contain('animate');
    expect(el.shadowRoot?.querySelector('.menu.animate')).to.exist;
  });

  test('renders menu buttons with details, followable and href wired through', async () => {
    const el = await sliderWith([
      provider('plain'),
      provider('linky', {
        href: '/go',
        followable: true,
        menuDetails: html`<em>2 files</em>`,
      }),
    ]);

    const buttons = el.shadowRoot?.querySelectorAll('ia-itemnav-menu-button');
    expect(buttons).to.have.lengthOf(2);
    const linky = buttons?.[1] as HTMLElement & {
      href: string;
      followable: boolean;
    };
    expect(linky.href).to.equal('/go');
    expect(linky.followable).to.equal(true);
  });
});
