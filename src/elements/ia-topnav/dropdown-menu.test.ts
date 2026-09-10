import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';

import DropdownMenu from './dropdown-menu';

import { describe, expect, test } from 'vitest';
customElements.define('dropdown-menu', DropdownMenu);

const component = html`<dropdown-menu></dropdown-menu>`;

describe('<dropdown-menu>', () => {
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
    expect(el.shadowRoot?.querySelector('.closed')).to.not.be.undefined;
  });
});
