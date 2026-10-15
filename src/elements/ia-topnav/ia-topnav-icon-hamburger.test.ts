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

    // The close icon is decorative, so it carries no title.
    const close = icon.shadowRoot?.querySelector('svg');
    expect(titleId()).to.equal(undefined);
    expect(close?.getAttribute('aria-hidden')).to.equal('true');
    expect(close?.getAttribute('fill')).to.equal('currentColor');

    icon.active = false;
    await icon.updateComplete;

    expect(titleId()).to.equal('hamburgerTitleID');
  });
});
