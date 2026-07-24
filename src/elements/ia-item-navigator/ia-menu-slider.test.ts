import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test, vi } from 'vitest';

import { IAMenuSlider } from './ia-menu-slider';
import './ia-menu-slider';
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
): Promise<IAMenuSlider> {
  const el = await fixture<IAMenuSlider>(
    html`<ia-menu-slider open></ia-menu-slider>`,
  );
  el.menus = menus;
  await el.updateComplete;
  return el;
}

describe('IAMenuSlider', () => {
  test('renders one menu button per provider', async () => {
    const el = await sliderWith([provider('a'), provider('b'), provider('c')]);
    expect(el.shadowRoot?.querySelectorAll('ia-menu-button')).to.have.lengthOf(
      3,
    );
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
});
