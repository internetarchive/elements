import { fixture, oneEvent } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test } from 'vitest';

import './ia-topnav-login-button';
import type { LoginButton } from './ia-topnav-login-button';

const component = html`<ia-topnav-login-button></ia-topnav-login-button>`;

describe('<ia-topnav-login-button>', () => {
  test('reports the click rather than opening itself', async () => {
    const el = await fixture<LoginButton>(component);
    const toggle = el.shadowRoot?.querySelector(
      '.dropdown-toggle',
    ) as HTMLAnchorElement;

    setTimeout(() => toggle.click());
    const event = await oneEvent(el, 'menuToggled');

    expect(event.detail.menuName).to.equal('login');
    expect(el.shadowRoot?.querySelector('.active')).to.not.exist;
  });

  test('marks the toggle active once the parent opens the login menu', async () => {
    const el = await fixture<LoginButton>(component);

    el.openMenu = 'login';
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.active')).to.exist;
  });
});
