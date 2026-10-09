import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test } from 'vitest';

import './ia-topnav-primary-nav';
import './ia-topnav-media-menu';
import './ia-topnav-login-button';
import './ia-topnav-user-menu';
import './ia-topnav-desktop-subnav';
import '@src/elements/ia-wayback-search-form/ia-wayback-search-form';
import type { PrimaryNav } from './ia-topnav-primary-nav';
import type { MediaMenu } from './ia-topnav-media-menu';
import type { MediaButton } from './ia-topnav-media-button';
import type { LoginButton } from './ia-topnav-login-button';
import type UserMenu from './ia-topnav-user-menu';
import type { DesktopSubnav } from './ia-topnav-desktop-subnav';
import type { IAWaybackSearchForm } from '@src/elements/ia-wayback-search-form/ia-wayback-search-form';
import { buildTopNavMenus } from './data/menus';

const rem = () =>
  parseFloat(getComputedStyle(document.documentElement).fontSize);

/** Computed lengths are laid out in 1/64 px steps, so compare within a pixel. */
function expectPx(actual: string, expected: number, message?: string) {
  expect(parseFloat(actual), message).to.be.closeTo(expected, 0.5);
}

function svgIn(root: ParentNode | null | undefined, selector = 'svg') {
  const svg = root?.querySelector<SVGSVGElement>(selector);
  expect(svg, `${selector} renders an svg`).to.exist;
  return svg as SVGSVGElement;
}

/** Icons are decorative: hidden from assistive tech and out of the tab order. */
function expectDecorative(svg: SVGSVGElement) {
  expect(svg.getAttribute('aria-hidden')).to.equal('true');
  expect(svg.getAttribute('focusable')).to.equal('false');
  expect(svg.querySelector('title, desc')).to.equal(null);
  expect(svg.hasAttribute('aria-labelledby')).to.equal(false);
}

describe('ia-topnav icons', () => {
  describe('media buttons', () => {
    const menus = [
      'web',
      'texts',
      'video',
      'audio',
      'software',
      'images',
      'donate',
      'more',
    ];

    test('render one 4rem svg each, labelled by the button', async () => {
      const menu = await fixture<MediaMenu>(
        html`<ia-topnav-media-menu></ia-topnav-media-menu>`,
      );
      const buttons = Array.from(
        menu.shadowRoot?.querySelectorAll<MediaButton>(
          'ia-topnav-media-button',
        ) ?? [],
      );
      expect(buttons.map((button) => button.mediatype)).to.deep.equal(menus);

      for (const button of buttons) {
        const menuName = button.mediatype;
        const svg = svgIn(button.shadowRoot, '.icon svg');
        expect(svg.getAttribute('viewBox'), menuName).to.equal('0 0 40 40');
        expectDecorative(svg);
        expectPx(getComputedStyle(svg).width, 4 * rem(), menuName);
        expectPx(getComputedStyle(svg).height, 4 * rem(), menuName);

        // The label span is hidden on desktop, so the link names itself.
        const link = button.shadowRoot?.querySelector('a');
        expect(link?.getAttribute('aria-label'), menuName).to.equal(
          button.label,
        );
      }
    });

    test('are grey, red for donate, and white when selected', async () => {
      const menu = await fixture<MediaMenu>(
        html`<ia-topnav-media-menu
          selectedMenuOption="texts"
        ></ia-topnav-media-menu>`,
      );
      const colorOf = (name: string) => {
        const button = menu.shadowRoot?.querySelector(
          `[data-mediatype=${name}]`,
        );
        const path = svgIn(button?.shadowRoot, '.icon svg path');
        return getComputedStyle(path).fill;
      };

      expect(colorOf('video')).to.equal('rgb(153, 153, 153)');
      expect(colorOf('donate')).to.equal('rgb(255, 0, 0)');
      expect(colorOf('texts')).to.not.equal('rgb(153, 153, 153)');
    });
  });

  describe('primary nav', () => {
    const nav = () =>
      fixture<PrimaryNav>(
        html`<ia-topnav-primary-nav
          baseHost="archive.org"
        ></ia-topnav-primary-nav>`,
      );

    test('the home link keeps a name and both logos keep their colours', async () => {
      const el = await nav();
      const home = el.shadowRoot?.querySelector('a.link-home');
      const [logo, wordmark] = Array.from(home?.querySelectorAll('svg') ?? []);

      expect(home?.getAttribute('aria-label')).to.equal('Internet Archive');
      expect(logo.getAttribute('viewBox')).to.equal('0 0 27 30');
      expect(wordmark.getAttribute('viewBox')).to.equal('0 0 95 30');
      expectDecorative(logo);
      expectDecorative(wordmark);
      expectPx(getComputedStyle(logo).height, 3 * rem());
      expectPx(getComputedStyle(logo).width, 2.7 * rem());
      expectPx(getComputedStyle(wordmark).height, 3 * rem());
      expectPx(getComputedStyle(wordmark).width, 9.5 * rem());
      expect(getComputedStyle(logo.querySelector('path')!).fill).to.equal(
        'rgb(255, 255, 255)',
      );
      expect(getComputedStyle(wordmark.querySelector('path')!).fill).to.equal(
        'rgb(255, 255, 255)',
      );
    });

    test('the search trigger is labelled and its icon is 4rem', async () => {
      const el = await nav();
      const trigger = el.shadowRoot?.querySelector('button.search-trigger');
      const svg = svgIn(trigger);

      expect(trigger?.getAttribute('aria-label')).to.equal('Search');
      expectDecorative(svg);
      expectPx(getComputedStyle(svg).width, 4 * rem());
    });

    test('the donate heart is red, 4rem and named by its hidden text', async () => {
      const el = await nav();
      const link = el.shadowRoot?.querySelector('a.mobile-donate-link');
      const svg = svgIn(link);

      expectDecorative(svg);
      expect(svg.getAttribute('viewBox')).to.equal('0 0 40 40');
      expectPx(getComputedStyle(svg).width, 4 * rem());
      expect(getComputedStyle(svg.querySelector('path')!).fill).to.equal(
        'rgb(255, 0, 0)',
      );
      expect(link?.querySelector('ia-sr-only-text')?.textContent).to.contain(
        'Donate to the archive',
      );
    });

    test('the upload link is named even when its text is hidden', async () => {
      const el = await nav();
      const link = el.shadowRoot?.querySelector('a.upload');
      const svg = svgIn(link);

      expect(link?.getAttribute('aria-label')).to.equal('Upload');
      expectDecorative(svg);
      expectPx(getComputedStyle(svg).width, 3 * rem());
    });
  });

  test('the login button icon is decorative and the button is labelled', async () => {
    const el = await fixture<LoginButton>(
      html`<ia-topnav-login-button></ia-topnav-login-button>`,
    );
    const button = el.shadowRoot?.querySelector('button.logged-out-menu');

    expect(button?.getAttribute('aria-label')).to.equal('Toggle login menu');
    expectDecorative(svgIn(button));
  });

  test('the mobile upload link in a dropdown keeps its text and a 1.4rem icon', async () => {
    const el = await fixture<UserMenu>(
      html`<ia-topnav-user-menu></ia-topnav-user-menu>`,
    );
    el.menuItems = buildTopNavMenus('brewster_userid').user;
    await el.updateComplete;

    const link = el.shadowRoot?.querySelector('a.mobile-upload');
    const svg = svgIn(link);

    expect(svg.getAttribute('viewBox')).to.equal('8 8 24 24');
    expectDecorative(svg);
    expect(link?.textContent?.trim()).to.not.equal('');
    expectPx(getComputedStyle(svg).width, 1.4 * rem());
  });

  test('the desktop subnav donate link shows a red 1.6rem heart beside its text', async () => {
    const el = await fixture<DesktopSubnav>(
      html`<ia-topnav-desktop-subnav
        .menuItems=${[{ title: 'Donate', url: '/donate' }]}
      ></ia-topnav-desktop-subnav>`,
    );
    const link = el.shadowRoot?.querySelector('a.donate');
    const svg = svgIn(link);

    expectDecorative(svg);
    expect(link?.textContent?.trim()).to.equal('Donate');
    expectPx(getComputedStyle(svg).width, 1.6 * rem());
    expect(getComputedStyle(svg.querySelector('path')!).fill).to.equal(
      'rgb(255, 0, 0)',
    );
  });

  describe('wayback search form', () => {
    test('keeps its two-colour logo at 205 x 55 and a search glyph', async () => {
      const el = await fixture<IAWaybackSearchForm>(
        html`<ia-wayback-search-form></ia-wayback-search-form>`,
      );
      const link = el.shadowRoot?.querySelector('fieldset a');
      const logo = svgIn(link);
      const fills = Array.from(logo.querySelectorAll('path')).map(
        (path) => getComputedStyle(path).fill,
      );

      expect(link?.getAttribute('aria-label')).to.be.a('string');
      expect(logo.getAttribute('viewBox')).to.equal('0 0 205 55');
      expect(getComputedStyle(logo).width).to.equal('205px');
      expect(getComputedStyle(logo).height).to.equal('55px');
      expect(fills).to.deep.equal(['rgb(171, 46, 51)', 'rgb(33, 30, 30)']);

      const search = svgIn(el.shadowRoot?.querySelector('.search-field'));
      expectDecorative(search);
      expectPx(getComputedStyle(search).width, 2.4 * rem());
    });
  });
});
