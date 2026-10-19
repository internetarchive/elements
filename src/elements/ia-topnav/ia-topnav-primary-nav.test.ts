import {
  elementUpdated,
  fixture,
  fixtureCleanup,
} from '@open-wc/testing-helpers';
import { html } from 'lit';

import './ia-topnav-primary-nav';
import { IATopNavConfig, IATopNavSecondIdentitySlotMode } from './models';
import { PrimaryNav } from './ia-topnav-primary-nav';

import { afterEach, describe, expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
const component = ({
  baseHost = 'archive.org',
  username = '',
  screenName = '',
  hideSearch = false,
  config = {},
  secondIdentitySlotMode = 'allow',
}: {
  baseHost?: string;
  username?: string;
  screenName?: string;
  hideSearch?: boolean;
  config?: IATopNavConfig;
  secondIdentitySlotMode?: IATopNavSecondIdentitySlotMode;
}) =>
  html` <ia-topnav-primary-nav
    .baseHost=${baseHost}
    .username=${username}
    .screenName=${screenName}
    ?hideSearch=${hideSearch}
    .config=${config}
    .secondIdentitySlotMode=${secondIdentitySlotMode}
  ></ia-topnav-primary-nav>`;

afterEach(() => {
  fixtureCleanup();
});

describe('<ia-topnav-primary-nav>', () => {
  test('labels the mobile donate heart for screen readers', async () => {
    const el = await fixture<PrimaryNav>(
      component({ baseHost: 'archive.org', username: '' }),
    );
    const label = el.shadowRoot?.querySelector(
      '.mobile-donate-link ia-sr-only-text',
    );

    expect(customElements.get('ia-sr-only-text')).to.exist;
    expect(label?.textContent).to.contain('Donate to the archive');
  });

  test('renders a language-picker slot in the right side section on desktop', async () => {
    const el = await fixture<PrimaryNav>(component({}));
    el['mobileLayout'] = false;
    await elementUpdated(el);
    const slot = el.shadowRoot?.querySelector(
      '.right-side-section slot[name="language-picker"]',
    );

    expect(slot).to.exist;
    expect(
      el.shadowRoot?.querySelector(
        'ia-topnav-media-menu slot[name="language-picker"]',
      ),
    ).to.not.exist;
  });

  test('hides a slotted language picker that has the hidden attribute on desktop', async () => {
    const el = await fixture<PrimaryNav>(component({}));
    el['mobileLayout'] = false;
    await elementUpdated(el);
    const picker = document.createElement('div');
    picker.slot = 'language-picker';
    picker.textContent = 'English';
    picker.hidden = true;
    el.appendChild(picker);
    await elementUpdated(el);

    await page.viewport(1400, 800);
    try {
      expect(getComputedStyle(picker).display).toBe('none');
      picker.hidden = false;
      expect(getComputedStyle(picker).display).not.toBe('none');
    } finally {
      await page.viewport(414, 896);
    }
  });

  test('stops listening to the breakpoint when removed', async () => {
    const el = await fixture<PrimaryNav>(component({}));
    const removeListener = vi.spyOn(el['mobileQuery'], 'removeEventListener');

    el.remove();

    expect(removeListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  test('puts the language-picker slot in the media menu on mobile', async () => {
    const el = await fixture<PrimaryNav>(component({}));
    el['mobileLayout'] = true;
    await elementUpdated(el);

    expect(
      el.shadowRoot?.querySelector(
        'ia-topnav-media-menu > slot[name="language-picker"][slot="language-picker"]',
      ),
    ).to.exist;
    expect(
      el.shadowRoot?.querySelector(
        '.right-side-section slot[name="language-picker"]',
      ),
    ).to.not.exist;
  });

  test('takes no room while the language-picker slot is empty', async () => {
    const el = await fixture<PrimaryNav>(component({}));
    el['mobileLayout'] = false;
    await elementUpdated(el);
    const slot = el.shadowRoot?.querySelector<HTMLSlotElement>(
      'slot[name="language-picker"]',
    );

    const rect = (slot as HTMLSlotElement).getBoundingClientRect();
    expect(rect.width).toBe(0);
    expect(rect.height).toBe(0);
  });

  test('shows the language-picker slot once something is slotted', async () => {
    const el = await fixture<PrimaryNav>(component({}));
    el['mobileLayout'] = false;
    await elementUpdated(el);
    const picker = document.createElement('div');
    picker.slot = 'language-picker';
    el.appendChild(picker);
    await elementUpdated(el);

    picker.textContent = 'English';
    await vi.waitFor(() => {
      const rect = picker.getBoundingClientRect();
      expect(rect.width).toBeGreaterThan(0);
      expect(rect.height).toBeGreaterThan(0);
    });
  });

  test('renders the login link when no username present', async () => {
    const el = await fixture<PrimaryNav>(
      component({
        baseHost: 'archive.org',
        username: '',
      }),
    );

    expect(el.shadowRoot?.querySelector('ia-topnav-login-button')).to.not.be
      .undefined;
  });

  test('does not render search trigger or search slot if hideSearch true', async () => {
    const el = await fixture<PrimaryNav>(
      component({
        baseHost: 'archive.org',
        username: 'shaneriley',
        screenName: 'shaneriley',
        hideSearch: true,
      }),
    );

    expect(el.shadowRoot?.querySelector('.search-trigger')).to.equal(null);
    expect(el.shadowRoot?.querySelector('.search-container')).to.not.exist;
  });

  test('renders search slot container', async () => {
    const el = await fixture<PrimaryNav>(
      component({
        baseHost: 'archive.org',
        username: 'testuser',
        screenName: 'testuser',
      }),
    );

    expect(el.shadowRoot?.querySelector('.search-container')).to.exist;

    const slot = el.shadowRoot?.querySelector<HTMLSlotElement>(
      'slot[name="search"]',
    );
    expect(slot).to.exist;
  });

  test('renders search trigger button for mobile toggle', async () => {
    const el = await fixture<PrimaryNav>(
      component({
        baseHost: 'archive.org',
        username: 'testuser',
        screenName: 'testuser',
      }),
    );

    expect(el.shadowRoot?.querySelector('.search-trigger')).to.exist;
  });

  test('does not render nav-search', async () => {
    const el = await fixture<PrimaryNav>(
      component({
        baseHost: 'archive.org',
        username: 'testuser',
        screenName: 'testuser',
      }),
    );

    expect(el.shadowRoot?.querySelector('nav-search')).to.not.exist;
  });

  test('opens a slot with `secondIdentitySlotMode`', async () => {
    const el = await fixture<PrimaryNav>(
      component({
        baseHost: 'archive.org',
        username: 'boop',
        screenName: 'somesuperlongscreenname',
        secondIdentitySlotMode: 'allow',
      }),
    );

    const brandingBlock = el.shadowRoot?.querySelector('div.branding');
    expect(brandingBlock?.getAttribute('class')).to.contain(
      'branding second-logo',
    );

    const slot = brandingBlock?.querySelector('slot');
    expect(slot).to.exist;
    expect(slot?.getAttribute('name')).to.equal('opt-sec-logo');

    el.secondIdentitySlotMode = '';
    await elementUpdated(el);
    const noSlotBrandingBlock = el.shadowRoot?.querySelector('div.branding');
    expect(noSlotBrandingBlock?.getAttribute('class')).to.contain('branding');

    const noSlot = noSlotBrandingBlock?.querySelector('slot');
    expect(noSlot).to.not.exist;
  });
});
