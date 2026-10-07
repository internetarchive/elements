import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';

import DropdownMenu from './dropdown-menu';

import { describe, expect, test } from 'vitest';
/*
 * The base class ships unregistered, so the test gives it a tag to mount
 * under. The name is test-only and deliberately outside the topnav's own
 * namespace, which element-names.test.ts holds free.
 */
customElements.define('ia-topnav-test-dropdown-menu', DropdownMenu);

const component = html`<ia-topnav-test-dropdown-menu></ia-topnav-test-dropdown-menu>`;

describe('<ia-topnav-test-dropdown-menu>', () => {
  test('sets default properties', async () => {
    const el = await fixture<DropdownMenu>(component);
    expect(el.animated).to.be.false;
    expect(el.open).to.be.false;
    expect(el.menuItems.length).to.equal(0);
  });

  test('renders a closed class if component is animating', async () => {
    const el = await fixture<DropdownMenu>(component);
    el.animated = true;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('.closed')).to.exist;
  });
});
