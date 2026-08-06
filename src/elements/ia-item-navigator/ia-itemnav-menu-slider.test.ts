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
    html`<ia-itemnav-menu-slider></ia-itemnav-menu-slider>`,
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

  test('reports the selection instead of deciding it', async () => {
    const el = await sliderWith([provider('a'), provider('b')]);
    const selected = vi.fn();
    el.addEventListener('menuTypeSelected', selected);

    const menuButton = el.shadowRoot?.querySelector('ia-itemnav-menu-button');
    (
      menuButton?.shadowRoot?.querySelector('button') as HTMLButtonElement
    ).click();
    await el.updateComplete;

    // The navigator owns which panel is open, so there is only ever one copy
    // of that state to keep straight.
    expect(selected).toHaveBeenCalledOnce();
    expect(selected.mock.calls[0][0].detail.id).to.equal('a');
    expect(el.selectedMenu).to.equal('');
  });

  test('opens whichever panel the host selects', async () => {
    const el = await sliderWith([provider('a'), provider('b')]);
    el.selectedMenu = 'b';
    await el.updateComplete;

    expect(el.selectedMenuClass).to.equal('open');
    expect(
      el.shadowRoot?.querySelector('.selected-menu .panel-body')?.textContent,
    ).to.contain('b body');
  });

  test('a closed panel is out of the tab order and the a11y tree', async () => {
    const el = await sliderWith([provider('a')]);
    const panel = el.shadowRoot?.querySelector('.content') as HTMLElement;

    expect(panel.hasAttribute('inert'), 'closed panel should be inert').to.be
      .true;

    el.selectedMenu = 'a';
    await el.updateComplete;
    expect(panel.hasAttribute('inert'), 'open panel should be reachable').to.be
      .false;
  });

  test('names the panel by its heading', async () => {
    const el = await sliderWith([provider('a')]);
    el.selectedMenu = 'a';
    await el.updateComplete;

    const panel = el.shadowRoot?.querySelector('.content') as HTMLElement;
    const headingId = panel.getAttribute('aria-labelledby');
    expect(headingId).to.exist;
    expect(
      el.shadowRoot?.querySelector(`#${headingId}`)?.textContent,
    ).to.contain('a label');
  });

  test('renders the selected provider body', async () => {
    const el = await sliderWith([provider('a'), provider('b')]);
    el.selectedMenu = 'b';
    await el.updateComplete;

    const body = el.shadowRoot?.querySelector('.selected-menu .panel-body');
    expect(body?.textContent).to.contain('b body');
  });

  test('the drawer close button asks the host to close the drawer', async () => {
    const el = await sliderWith([provider('a')]);
    const listener = vi.fn();
    el.addEventListener('menuSliderClosed', listener);

    (
      el.shadowRoot?.querySelector('.menu > button.close') as HTMLButtonElement
    ).click();

    expect(listener).toHaveBeenCalledOnce();
  });

  test('the two close buttons are named for what they close', async () => {
    const el = await sliderWith([provider('a')]);
    el.selectedMenu = 'a';
    await el.updateComplete;

    const drawerClose = el.shadowRoot?.querySelector('.menu > button.close');
    const panelClose = el.shadowRoot?.querySelector(
      '.content header button.close',
    );

    expect(drawerClose?.getAttribute('aria-label')).to.equal(
      'Close navigation',
    );
    expect(panelClose?.getAttribute('aria-label')).to.equal('Close a label');
  });

  test('closing the sub-panel leaves the drawer alone', async () => {
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

    expect(panelClosed).toHaveBeenCalledOnce();
    expect(panelClosed.mock.calls[0][0].detail.id).to.equal('a');
    expect(drawerClosed).not.toHaveBeenCalled();
  });

  test('Escape closes the open panel first, then the drawer', async () => {
    const el = await sliderWith([provider('a')]);
    el.selectedMenu = 'a';
    await el.updateComplete;

    const panelClosed = vi.fn();
    const drawerClosed = vi.fn();
    el.addEventListener('menuPanelClosed', panelClosed);
    el.addEventListener('menuSliderClosed', drawerClosed);
    const main = el.shadowRoot?.querySelector('.main') as HTMLElement;

    // First Escape reaches for the panel, not the drawer.
    main.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(panelClosed).toHaveBeenCalledOnce();
    expect(drawerClosed).not.toHaveBeenCalled();

    // Once the host has cleared the selection, Escape closes the drawer.
    el.selectedMenu = '';
    await el.updateComplete;
    main.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(drawerClosed).toHaveBeenCalledOnce();
  });

  test('closing a panel hands focus back to the button that opened it', async () => {
    const el = await sliderWith([provider('a'), provider('b')]);
    el.selectedMenu = 'b';
    await el.updateComplete;

    // The host clears the selection in response to menuPanelClosed.
    el.selectedMenu = '';
    await el.updateComplete;

    const buttons = el.shadowRoot?.querySelectorAll('ia-itemnav-menu-button');
    expect(el.shadowRoot?.activeElement).to.equal(buttons?.[1]);
  });

  test('opening a panel moves focus into it', async () => {
    const el = await sliderWith([provider('a')]);
    el.selectedMenu = 'a';
    await el.updateComplete;

    expect(el.shadowRoot?.activeElement).to.equal(
      el.shadowRoot?.querySelector('.content'),
    );
  });

  test('closePanel is safe when nothing is selected', async () => {
    const el = await sliderWith([provider('a')]);
    expect(() => el.closePanel()).to.not.throw();
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
