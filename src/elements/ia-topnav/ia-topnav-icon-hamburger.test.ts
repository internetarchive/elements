import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import './ia-topnav-icon-hamburger';
import { HamBurger } from './ia-topnav-icon-hamburger';

import { describe, expect, test } from 'vitest';
describe('<ia-topnav-icon-hamburger>', () => {
  test('toggles close icon when property toggled', async () => {
    const icon = await fixture<HamBurger>(
      html`<ia-topnav-icon-hamburger></ia-topnav-icon-hamburger>`,
    );

    icon.active = true;
    await icon.updateComplete;

    const titleElement = icon.shadowRoot?.querySelector('svg title');

    expect(titleElement?.getAttribute('id')).to.match(/close/);
  });
});
