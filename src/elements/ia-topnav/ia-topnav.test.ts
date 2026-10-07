import {
  elementUpdated,
  fixture,
  fixtureCleanup,
  oneEvent,
} from '@open-wc/testing-helpers';
import { html } from 'lit';

import './ia-topnav';
import { IATopNav } from './ia-topnav';
import { SignedOutDropdown } from './ia-topnav-signed-out-dropdown';
import UserMenu from './ia-topnav-user-menu';
import { defaultTopNavConfig } from './data/menus';

import { afterEach, describe, expect, test, vi } from 'vitest';
const verifyClosed = (instance: IATopNav) => {
  expect(instance.mediaSliderOpen).to.be.false;
  expect(instance.selectedMenuOption).to.equal('');
};

const verifyOpened = (instance: IATopNav, mediatype: string) => {
  expect(instance.mediaSliderOpen).to.be.true;
  expect(instance.selectedMenuOption).to.equal(mediatype);
};

afterEach(() => {
  fixtureCleanup();
  vi.restoreAllMocks();
});

describe('<ia-topnav>', () => {
  test('dispatches an analyticsClick event when trackClick event fired', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);
    const clickEvent = new MouseEvent('click');

    setTimeout(() =>
      el.shadowRoot
        ?.querySelector('ia-topnav-primary-nav')
        ?.shadowRoot?.querySelector('.hamburger')
        ?.dispatchEvent(clickEvent),
    );
    const response = await oneEvent(el, 'trackClick');

    expect(response).to.exist;
  });

  test('closes all menus when close-layer clicked', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);

    el.openMenu = 'media';
    el.selectedMenuOption = 'texts';
    el.mediaSliderOpen = true;
    await el.updateComplete;
    el.closeMenus();
    await el.updateComplete;

    expect(el.mediaSliderOpen).to.be.false;
    expect(el.openMenu).to.equal('');
    expect(el.selectedMenuOption).to.equal('');
  });

  test('sets media slider to closed', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);

    el.mediaSliderOpen = true;
    el.selectedMenuOption = 'foo';
    el.closeMediaSlider();

    verifyClosed(el);
  });

  test('toggles media slider visibility and starts animation', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);
    const mediatype = 'foo';

    el.selectedMenuOption = mediatype;
    el.openMediaSlider();

    verifyOpened(el, mediatype);
  });

  test('closes media slider if selected menu type is the open menu type', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);
    const mediatype = 'foo';

    el.selectedMenuOption = mediatype;

    const event = new CustomEvent('mediaTypeSelected', {
      detail: {
        mediatype,
      },
    });

    el.mediaTypeSelected(event);

    verifyClosed(el);
  });

  test('opens media slider menu and starts animation', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);
    const mediatype = 'foo';

    const event = new CustomEvent('mediaTypeSelected', {
      detail: {
        mediatype,
      },
    });

    el.mediaTypeSelected(event);

    verifyOpened(el, mediatype);
  });

  test('closes slider when menu closed', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);

    el.openMenu = 'media';
    el.selectedMenuOption = 'foo';
    el.mediaSliderOpen = true;
    await el.updateComplete;

    const event = new CustomEvent('menuToggled', {
      detail: {
        menuName: '',
      },
    });

    el.menuToggled(event);
    await el.updateComplete;

    expect(el.selectedMenuOption).to.equal('');
  });

  test('toggles user menu tabindex when dropdown open', async () => {
    const el = await fixture<IATopNav>(
      html` <ia-topnav username="shaneriley"></ia-topnav>`,
    );

    el.openMenu = 'user';
    await el.updateComplete;

    expect(
      el.shadowRoot
        ?.querySelector('ia-topnav-user-menu')
        ?.getAttribute('tabindex'),
    ).to.equal('');
  });

  test('toggles signed out menu tabindex when dropdown open', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);

    el.openMenu = 'login';
    await el.updateComplete;

    expect(
      el.shadowRoot
        ?.querySelector('ia-topnav-signed-out-dropdown')
        ?.getAttribute('tabindex'),
    ).to.equal('');
  });

  test('toggles search menu when search toggle button clicked', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);
    (
      el.shadowRoot
        ?.querySelector('ia-topnav-primary-nav')
        ?.shadowRoot?.querySelector('.search-trigger') as HTMLButtonElement
    ).click();
    await el.updateComplete;

    expect(el.openMenu).to.equal('search');
  });

  test('toggles user menu when search user avatar clicked', async () => {
    const el = await fixture<IATopNav>(
      html` <ia-topnav
        username="shaneriley"
        screenName="shaneriley"
      ></ia-topnav>`,
    );

    (
      el.shadowRoot
        ?.querySelector('ia-topnav-primary-nav')
        ?.shadowRoot?.querySelector('.user-menu') as HTMLButtonElement
    ).click();
    await el.updateComplete;

    expect(el.openMenu).to.equal('user');
  });

  test('links the logo to archive.org by default', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);
    const logoLink = el.shadowRoot
      ?.querySelector('ia-topnav-primary-nav')
      ?.shadowRoot?.querySelector('.link-home');
    expect(logoLink?.getAttribute('href')).to.match(/\/\/archive\.org/);
  });

  describe('baseHost', () => {
    test('passes archive.org to the common child components by default', async () => {
      const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);
      const componentSelectors = [
        'ia-topnav-primary-nav',
        'ia-topnav-media-slider',
        'ia-topnav-desktop-subnav',
      ];
      componentSelectors.forEach((selector) => {
        const component = el.shadowRoot?.querySelector(selector) as unknown as {
          baseHost: string;
        };
        expect(component?.baseHost).to.equal('https://archive.org');
      });
    });

    test('passes archive.org to the signed out dropdown by default', async () => {
      const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);
      const signedOutDropdown = el.shadowRoot?.querySelector(
        'ia-topnav-signed-out-dropdown',
      ) as SignedOutDropdown;
      expect(signedOutDropdown?.baseHost).to.equal('https://archive.org');
    });

    test('passes archive.org to the user dropdown by default', async () => {
      const el = await fixture<IATopNav>(
        html` <ia-topnav username="foopey"></ia-topnav>`,
      );
      const signedOutDropdown = el.shadowRoot?.querySelector(
        'ia-topnav-user-menu',
      ) as UserMenu;
      expect(signedOutDropdown.baseHost).to.equal('https://archive.org');
    });
  });

  describe('menu building', () => {
    test('builds the user menu for the signed-in user before the first render', async () => {
      const render = vi.spyOn(IATopNav.prototype, 'render');
      const el = await fixture<IATopNav>(
        html`<ia-topnav username="brewster"></ia-topnav>`,
      );
      const userMenu = el.shadowRoot?.querySelector(
        'ia-topnav-user-menu',
      ) as UserMenu;

      expect(render).toHaveBeenCalledOnce();
      const urls = userMenu.menuItems.flat().map((link) => link.url);
      expect(urls).to.include('https://archive.org/details/@brewster');
    });

    test('rebuilds the menus when the username changes', async () => {
      const el = await fixture<IATopNav>(
        html`<ia-topnav username="brewster"></ia-topnav>`,
      );
      el.username = 'goody';
      await el.updateComplete;
      const userMenu = el.shadowRoot?.querySelector(
        'ia-topnav-user-menu',
      ) as UserMenu;

      const urls = userMenu.menuItems.flat().map((link) => link.url);
      expect(urls).to.include('https://archive.org/details/@goody');
    });
  });

  describe('localLinks', () => {
    test('links the logo relative to the current host', async () => {
      const el = await fixture<IATopNav>(
        html`<ia-topnav localLinks></ia-topnav>`,
      );
      const logoLink = el.shadowRoot
        ?.querySelector('ia-topnav-primary-nav')
        ?.shadowRoot?.querySelector('.link-home');
      expect(logoLink?.getAttribute('href')).to.equal('/');
    });

    test('passes an empty base host to the child components', async () => {
      const el = await fixture<IATopNav>(
        html`<ia-topnav localLinks username="foopey"></ia-topnav>`,
      );
      const componentSelectors = [
        'ia-topnav-primary-nav',
        'ia-topnav-media-slider',
        'ia-topnav-desktop-subnav',
        'ia-topnav-user-menu',
      ];
      componentSelectors.forEach((selector) => {
        const component = el.shadowRoot?.querySelector(selector) as unknown as {
          baseHost: string;
        };
        expect(component?.baseHost, selector).to.equal('');
      });
    });

    test('builds the menu links without a host', async () => {
      const el = await fixture<IATopNav>(
        html`<ia-topnav localLinks></ia-topnav>`,
      );
      const subnavLink = el.shadowRoot
        ?.querySelector('ia-topnav-desktop-subnav')
        ?.shadowRoot?.querySelector('a');
      expect(subnavLink?.getAttribute('href')).to.match(/^\/about\//);
    });
  });

  describe('search slot', () => {
    test('forwards search slot to ia-topnav-primary-nav', async () => {
      const el = await fixture<IATopNav>(html`<ia-topnav></ia-topnav>`);
      await el.updateComplete;

      const primaryNav = el.shadowRoot?.querySelector('ia-topnav-primary-nav');
      const slot = primaryNav?.querySelector('slot[name="search"]');
      expect(slot).to.exist;
    });

    test('does not render search-menu', async () => {
      const el = await fixture<IATopNav>(html`<ia-topnav></ia-topnav>`);
      await el.updateComplete;

      expect(el.shadowRoot?.querySelector('search-menu')).to.not.exist;
    });
  });

  describe('slot pass throughs', () => {
    describe('slot for <ia-topnav-primary-nav>', () => {
      test('opens a slot with `secondIdentitySlotMode`', async () => {
        const el = await fixture<IATopNav>(
          html`<ia-topnav
            username="boop"
            screenName="somesuperlongscreenname"
            secondIdentitySlotMode="allow"
          ></ia-topnav>`,
        );

        const slot = el.shadowRoot
          ?.querySelector('ia-topnav-primary-nav')
          ?.querySelector('slot[name="opt-sec-logo"]');
        expect(slot).to.exist;

        el.secondIdentitySlotMode = '';
        await elementUpdated(el);
        const noSlot = el.shadowRoot
          ?.querySelector('ia-topnav-primary-nav')
          ?.querySelector('slot[name="opt-sec-logo"]');
        expect(noSlot).to.not.exist;
      });
    });
  });

  describe('wayback page count', () => {
    const waybackIntro = (el: IATopNav) => {
      const slider = el.shadowRoot?.querySelector('ia-topnav-media-slider');
      const subnav = slider?.shadowRoot?.querySelector(
        'ia-topnav-media-subnav[menu="web"]',
      );
      const waybackSlider = subnav?.shadowRoot?.querySelector(
        'ia-topnav-wayback-slider',
      );
      const search = waybackSlider?.shadowRoot?.querySelector(
        'ia-topnav-wayback-search',
      );
      return search?.shadowRoot?.querySelector('p')?.textContent ?? '';
    };

    test('reaches the wayback search when the host supplies its own config', async () => {
      const el = await fixture<IATopNav>(
        html`<ia-topnav
          .config=${{ eventCategory: 'TopNav' }}
          waybackPagesArchived="333 billion"
        ></ia-topnav>`,
      );
      await elementUpdated(el);

      expect(waybackIntro(el)).to.contain('more than 333 billion');
    });

    test('follows a later change to the count', async () => {
      const el = await fixture<IATopNav>(
        html`<ia-topnav .config=${{ eventCategory: 'TopNav' }}></ia-topnav>`,
      );
      el.waybackPagesArchived = '400 billion';

      await vi.waitFor(() =>
        expect(waybackIntro(el)).to.contain('more than 400 billion'),
      );
    });

    test('leaves the shared default config alone', async () => {
      await fixture<IATopNav>(
        html`<ia-topnav waybackPagesArchived="333 billion"></ia-topnav>`,
      );

      expect(defaultTopNavConfig.waybackPagesArchived).to.be.undefined;
    });
  });

  describe('<ia-topnav> admin user menu sections', () => {
    type ExtraSection = '' | 'uploader' | 'biblio' | 'both';
    const adminFixture = async (extra: ExtraSection = '') =>
      fixture<IATopNav>(
        html`<ia-topnav
          admin
          username="brewster"
          itemIdentifier="boop"
          uploader=${extra === 'uploader' || extra === 'both'
            ? 'up+loader@example.com'
            : ''}
          biblio=${extra === 'biblio' || extra === 'both'
            ? 'https://books-yaz.archive.org/biblio.php?b_id=boop&add=1'
            : ''}
        ></ia-topnav>`,
      );

    test('renders the basic and item admin sections by default', async () => {
      const el = await adminFixture();
      expect(el.userMenuItems.length).to.equal(2);
    });

    test('adds an uploader section when an uploader is set', async () => {
      const el = await adminFixture('uploader');
      const sections = el.userMenuItems;
      expect(sections.length).to.equal(3);

      const uploaderSection = sections[2];
      expect(uploaderSection.map((link) => link.title)).to.deep.equal([
        'uploader:',
        'up+loader@example.com',
        'user admin',
        'user privs',
      ]);
      expect(uploaderSection[0].url).to.be.undefined;
      expect(uploaderSection[1].url).to.be.undefined;
      expect(uploaderSection[2].url).to.equal(
        'https://catalogd.archive.org/control/useradmin.php?email=up%2Bloader%40example.com',
      );
      expect(uploaderSection[3].url).to.equal(
        'https://catalogd.archive.org/control/setadmin.php?user=up%2Bloader%40example.com&ignore=boop',
      );
    });

    test('adds a biblio section when a biblio URL is set', async () => {
      const el = await adminFixture('biblio');
      const sections = el.userMenuItems;
      expect(sections.length).to.equal(3);

      const biblioSection = sections[2];
      expect(biblioSection.map((link) => link.title)).to.deep.equal([
        'biblio',
        'bookview',
        'jp2 zip',
      ]);
      expect(biblioSection[0].url).to.equal(
        'https://books-yaz.archive.org/biblio.php?b_id=boop&add=1&ignored=boop',
      );
      expect(biblioSection[1].url).to.equal(
        'https://archive.org/bookview.php?mode=debug&identifier=boop',
      );
      expect(biblioSection[2].url).to.equal(
        'https://archive.org/download/boop/format=Single Page Processed JP2 ZIP',
      );
    });

    test('orders the biblio section before the uploader section', async () => {
      const el = await adminFixture('both');
      const sections = el.userMenuItems;
      expect(sections.length).to.equal(4);
      expect(sections[2][0].title).to.equal('biblio');
      expect(sections[3][0].title).to.equal('uploader:');
    });

    test('renders the sections in the user menu with dividers between them', async () => {
      const el = await adminFixture('both');
      // The menus rebuild in updated(), so the sections land one update later.
      await el.updateComplete;
      const userMenu = el.shadowRoot?.querySelector(
        'ia-topnav-user-menu',
      ) as UserMenu;
      await userMenu.updateComplete;

      const listItems = Array.from(
        userMenu.shadowRoot?.querySelectorAll('li') ?? [],
      );
      const text = listItems.map((li) => li.textContent?.trim());
      expect(text).to.include('uploader:');
      expect(text).to.include('up+loader@example.com');
      expect(text).to.include('user privs');
      expect(text).to.include('jp2 zip');
      expect(userMenu.shadowRoot?.querySelectorAll('.divider').length).to.equal(
        3,
      );
    });

    test('leaves the extra sections out for non-admins', async () => {
      const el = await fixture<IATopNav>(
        html`<ia-topnav
          username="brewster"
          itemIdentifier="boop"
          uploader="up@example.com"
          biblio="https://books-yaz.archive.org/biblio.php?b_id=boop&add=1"
        ></ia-topnav>`,
      );
      expect(el.userMenuItems.length).to.equal(1);
    });
  });
});
