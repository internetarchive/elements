import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import './ia-topnav-user-menu';
import { buildTopNavMenus } from './data/menus';
import UserMenu from './ia-topnav-user-menu';

import { describe, expect, test } from 'vitest';
const component = html`<ia-topnav-user-menu></ia-topnav-user-menu>`;
const component2 = html`<ia-topnav-user-menu
  screenName="brewster"
></ia-topnav-user-menu>`;

describe('<ia-topnav-user-menu>', () => {
  test('does not render admin links for logged out users', async () => {
    const el = await fixture<UserMenu>(component);
    el.menuItems = buildTopNavMenus().user;

    await el.updateComplete;

    expect(el.shadowRoot?.querySelectorAll('li').length).to.be.gt(0);
    expect(el.shadowRoot?.querySelectorAll('.divider').length).to.equal(0);
  });

  test('does not render admin links for logged in users', async () => {
    // NOTE: top-nav never renders admin links now -- that's been delegated to dynamic JS insertion
    // in petabox tree (since it's only relevant there).
    const el = await fixture<UserMenu>(component2);
    el.menuItems = buildTopNavMenus('brewster_userid').user;

    await el.updateComplete;

    expect(el.shadowRoot?.querySelectorAll('li').length).to.be.gt(0);
    expect(el.shadowRoot?.querySelectorAll('.divider').length).to.equal(0);

    expect(el.shadowRoot?.querySelectorAll('h3').length).to.equal(1);
    expect(el.shadowRoot?.querySelector('h3')?.innerText).to.equal('brewster');
  });
});
