import { fixture } from '@open-wc/testing-helpers';
import { configureLocalization, str } from '@lit/localize';
import { generateMsgId } from '@lit/localize/internal/id-generation.js';
import { html } from 'lit';
import { afterEach, describe, expect, test } from 'vitest';

import { buildTopNavMenus } from './data/menus';
import './ia-topnav';
import './ia-topnav-desktop-subnav';
import './ia-topnav-login-button';
import './ia-topnav-media-menu';
import './ia-topnav-media-subnav';
import './ia-topnav-more-slider';
import './ia-topnav-user-menu';
import './ia-topnav-wayback-search';
import type { IATopNav } from './ia-topnav';
import type { DesktopSubnav } from './ia-topnav-desktop-subnav';
import type { LoginButton } from './ia-topnav-login-button';
import type { MediaMenu } from './ia-topnav-media-menu';
import type UserMenu from './ia-topnav-user-menu';
import type { IATopNavWaybackSearch } from './ia-topnav-wayback-search';

/** Marks each string so a test can tell a translated render from English. */
const pseudo = (source: string) => `xx ${source}`;

const translated = [
  'Texts',
  'Video',
  'Audio',
  'Software',
  'Images',
  'Donate',
  'More',
  'Log in',
  '1 trillion',
  'About',
  'All Audio',
  'My lists',
];

const templates = {
  ...Object.fromEntries(
    translated.map((source) => [generateMsgId(source, false), pseudo(source)]),
  ),
  [generateMsgId(['New feature: ', ''], false)]: str`xx New feature: ${0}`,
};

// The host app configures localization once. This stands in for it, with a
// test-only locale whose strings are the English ones marked with a prefix.
const { setLocale } = configureLocalization({
  sourceLocale: 'en',
  targetLocales: ['xx'],
  loadLocale: async () => ({ templates }),
});

function mediaButtonLabels(menu: MediaMenu): string[] {
  return [
    ...(menu.shadowRoot?.querySelectorAll('ia-topnav-media-button') ?? []),
  ]
    .map((button) =>
      button.shadowRoot?.querySelector('.label')?.textContent?.trim(),
    )
    .filter((label): label is string => !!label);
}

async function settle(el: HTMLElement & { updateComplete: Promise<unknown> }) {
  await el.updateComplete;
  const children = el.shadowRoot?.querySelectorAll('*') ?? [];
  await Promise.all(
    [...children].map(
      (child) =>
        (child as Partial<{ updateComplete: Promise<unknown> }>).updateComplete,
    ),
  );
}

describe('topnav live locale switch', () => {
  afterEach(async () => {
    await setLocale('en');
  });

  test('media menu buttons follow a locale change after first render', async () => {
    const menu = await fixture<MediaMenu>(
      html`<ia-topnav-media-menu></ia-topnav-media-menu>`,
    );
    await settle(menu);
    expect(mediaButtonLabels(menu)).toContain('Texts');

    await setLocale('xx');
    await settle(menu);

    const labels = mediaButtonLabels(menu);
    expect(labels).toContain(pseudo('Texts'));
    expect(labels).toContain(pseudo('Donate'));
    expect(labels).toContain(pseudo('More'));
    expect(labels).toContain('Wayback Machine');
  });

  test('login button follows a locale change after first render', async () => {
    const button = await fixture<LoginButton>(
      html`<ia-topnav-login-button></ia-topnav-login-button>`,
    );
    const text = () => button.shadowRoot?.textContent ?? '';
    expect(text()).toContain('Log in');

    await setLocale('xx');
    await button.updateComplete;

    expect(text()).toContain(pseudo('Log in'));
  });

  test('dropdown callout label follows a locale change', async () => {
    const menu = await fixture<UserMenu>(
      html`<ia-topnav-user-menu
        open
        .config=${{ eventCategory: 'TopNav', callouts: { 'My lists': 'NEW' } }}
        .menuItems=${[{ title: 'My lists', url: '/lists' }]}
      ></ia-topnav-user-menu>`,
    );
    const label = () =>
      menu.shadowRoot?.querySelector('a')?.getAttribute('aria-label');
    expect(label()).toBe('New feature: My lists');

    await setLocale('xx');
    await menu.updateComplete;

    expect(label()).toBe('xx New feature: My lists');
  });

  test('wayback search falls back to a localized page count', async () => {
    const search = await fixture<IATopNavWaybackSearch>(
      html`<ia-topnav-wayback-search></ia-topnav-wayback-search>`,
    );
    const intro = () =>
      search.shadowRoot?.querySelector('p')?.textContent ?? '';
    expect(intro()).toContain('more than 1 trillion');

    await setLocale('xx');
    await search.updateComplete;

    expect(intro()).toContain(`more than ${pseudo('1 trillion')}`);
  });

  test('wayback search shows a page count the host passes as is', async () => {
    const search = await fixture<IATopNavWaybackSearch>(
      html`<ia-topnav-wayback-search
        waybackPagesArchived="946 billion"
      ></ia-topnav-wayback-search>`,
    );
    await setLocale('xx');
    await search.updateComplete;

    expect(search.shadowRoot?.querySelector('p')?.textContent).toContain(
      'more than 946 billion',
    );
  });

  test('topnav rebuilds its menu labels on a locale change', async () => {
    const topnav = await fixture<IATopNav>(html`<ia-topnav></ia-topnav>`);
    const subnav = () =>
      topnav.shadowRoot?.querySelector<DesktopSubnav>(
        'ia-topnav-desktop-subnav',
      );
    const titles = () => subnav()?.menuItems.map((link) => link.title) ?? [];
    expect(titles()).toContain('About');

    await setLocale('xx');
    await topnav.updateComplete;

    expect(titles()).toContain(pseudo('About'));
    expect(titles()).toContain(pseudo('Donate'));
  });

  test('translated menu links keep their English key', async () => {
    await setLocale('xx');
    const menus = buildTopNavMenus();
    const about = menus.more.links.find((link) => link.key === 'About');
    const myLists = menus.user.find((link) => link.key === 'My lists');

    expect(about?.title).toBe(pseudo('About'));
    expect(myLists?.title).toBe(pseudo('My lists'));
  });

  test('desktop subnav keeps the Donate icon and class in another locale', async () => {
    await setLocale('xx');
    const subnav = await fixture<DesktopSubnav>(
      html`<ia-topnav-desktop-subnav
        .menuItems=${buildTopNavMenus().more.links}
      ></ia-topnav-desktop-subnav>`,
    );
    const donate = subnav.shadowRoot?.querySelector('a.donate');

    expect(donate?.textContent).toContain(pseudo('Donate'));
    expect(donate?.querySelector('svg')).to.exist;
  });

  test('menu analytics events stay in English in another locale', async () => {
    await setLocale('xx');
    const slider = await fixture<HTMLElement>(
      html`<ia-topnav-more-slider
        .menuItems=${buildTopNavMenus().more.links}
      ></ia-topnav-more-slider>`,
    );
    const about = [...(slider.shadowRoot?.querySelectorAll('a') ?? [])].find(
      (a) => a.textContent?.includes(pseudo('About')),
    );

    expect(about?.dataset.eventClickTracking).toBe('TopNav|NavMoreAbout');
  });

  test('the My lists callout still shows in another locale', async () => {
    await setLocale('xx');
    const menu = await fixture<UserMenu>(
      html`<ia-topnav-user-menu
        open
        .config=${{ eventCategory: 'TopNav', callouts: { 'My lists': 'NEW' } }}
        .menuItems=${buildTopNavMenus('brewster').user}
      ></ia-topnav-user-menu>`,
    );
    const callout = menu.shadowRoot?.querySelector('.callout');

    expect(callout?.textContent).toBe('NEW');
    expect(callout?.closest('a')?.getAttribute('aria-label')).toBe(
      `xx New feature: ${pseudo('My lists')}`,
    );
  });

  test('media subnav analytics events stay in English in another locale', async () => {
    const events = async () => {
      const subnav = await fixture<HTMLElement>(
        html`<ia-topnav-media-subnav
          menu="audio"
          .menuItems=${buildTopNavMenus().audio}
        ></ia-topnav-media-subnav>`,
      );
      const link = [...(subnav.shadowRoot?.querySelectorAll('a') ?? [])].find(
        (a) => a.textContent?.includes('All Audio'),
      );
      return {
        text: link?.textContent?.trim(),
        event: link?.dataset.eventClickTracking,
      };
    };
    const english = await events();

    await setLocale('xx');
    const translatedLink = await events();

    expect(translatedLink.text).toBe(pseudo('All Audio'));
    expect(translatedLink.event).toBe(english.event);
  });
});
