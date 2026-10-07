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
    const titleId = () =>
      icon.shadowRoot?.querySelector('svg title')?.getAttribute('id');

    expect(titleId()).to.equal('hamburgerTitleID');

    icon.active = true;
    await icon.updateComplete;

    expect(titleId()).to.match(/close/);

    icon.active = false;
    await icon.updateComplete;

    expect(titleId()).to.equal('hamburgerTitleID');
  });
});
