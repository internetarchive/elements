import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import './ia-topnav-login-button';
import { LoginButton } from './ia-topnav-login-button';

import { describe, expect, test } from 'vitest';
const component = html`<ia-topnav-login-button></ia-topnav-login-button>`;

describe('<ia-topnav-login-button>', () => {
  test('toggles active class when avatar clicked', async () => {
    const el = await fixture<LoginButton>(component);
    const toggle = el.shadowRoot?.querySelector(
      '.dropdown-toggle',
    ) as HTMLAnchorElement;

    toggle?.click();
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.active')).to.not.be.undefined;
  });
});
