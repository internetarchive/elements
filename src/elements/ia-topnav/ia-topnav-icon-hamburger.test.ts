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

  test('draws the close icon in the active color, the menu icon in the icon color', async () => {
    const icon = await fixture<HamBurger>(
      html`<ia-topnav-icon-hamburger
        style="--iconFill: rgb(1, 2, 3); --activeColor: rgb(4, 5, 6)"
      ></ia-topnav-icon-hamburger>`,
    );
    const color = () =>
      getComputedStyle(icon.shadowRoot!.querySelector('svg')!).color;

    expect(color()).to.equal('rgb(1, 2, 3)');

    icon.active = true;
    await icon.updateComplete;
    expect(color()).to.equal('rgb(4, 5, 6)');
  });

  test('falls back to the inverse text colors on its own', async () => {
    const icon = await fixture<HamBurger>(
      html`<ia-topnav-icon-hamburger
        .active=${true}
      ></ia-topnav-icon-hamburger>`,
    );
    const svg = icon.shadowRoot!.querySelector('svg')!;
    expect(getComputedStyle(svg).color).to.equal('rgb(255, 255, 255)');
  });
});
