import { elementUpdated, fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';

import './ia-topnav-media-menu';
import { MediaMenu } from './ia-topnav-media-menu';

import { describe, expect, test, vi } from 'vitest';
const component = html`<ia-topnav-media-menu></ia-topnav-media-menu>`;

describe('<ia-topnav-media-menu>', () => {
  test('sets default properties', async () => {
    const mediaMenu = await fixture<MediaMenu>(component);

    expect(mediaMenu.openMenu).to.equal('');
    expect(mediaMenu.selectedMenuOption).to.equal('');
  });

  test('renders menu icon as selected when selectedMenuOption matches', async () => {
    const mediaMenu = await fixture<MediaMenu>(component);
    const mediaType = 'texts';

    mediaMenu.selectedMenuOption = mediaType;
    await mediaMenu.updateComplete;

    const textsButton = mediaMenu.shadowRoot
      ?.querySelector(`[data-mediatype=${mediaType}`)
      ?.shadowRoot?.querySelector('.selected');

    expect(textsButton).to.not.be.null;
  });

  test('renders closed until the media menu is opened', async () => {
    const mediaMenu = await fixture<MediaMenu>(component);
    const container = () =>
      mediaMenu.shadowRoot?.querySelector('.media-menu-container');

    expect(container()?.classList.contains('closed')).to.be.true;

    mediaMenu.openMenu = 'media';
    await mediaMenu.updateComplete;

    expect(container()?.classList.contains('open')).to.be.true;
    expect(container()?.classList.contains('closed')).to.be.false;
  });

  describe('language picker slot', () => {
    const withPicker = html`<ia-topnav-media-menu>
      <div slot="language-picker" id="picker">EN</div>
    </ia-topnav-media-menu>`;

    const container = (mediaMenu: MediaMenu) =>
      mediaMenu.shadowRoot?.querySelector('.media-menu-container');

    test('renders a language-picker slot after the media buttons', async () => {
      const mediaMenu = await fixture<MediaMenu>(component);

      expect(
        mediaMenu.shadowRoot?.querySelector(
          '.language-picker-row slot[name="language-picker"]',
        ),
      ).to.exist;
    });

    test('marks the menu as having a picker while a visible element is slotted', async () => {
      const mediaMenu = await fixture<MediaMenu>(withPicker);

      await vi.waitFor(() => {
        expect(container(mediaMenu)?.classList.contains('has-language-picker'))
          .to.be.true;
      });
    });

    test('drops the picker row when the slotted element is hidden', async () => {
      const mediaMenu = await fixture<MediaMenu>(withPicker);
      await vi.waitFor(() => {
        expect(container(mediaMenu)?.classList.contains('has-language-picker'))
          .to.be.true;
      });

      mediaMenu.querySelector('#picker')?.setAttribute('hidden', '');
      await elementUpdated(mediaMenu);

      await vi.waitFor(() => {
        expect(container(mediaMenu)?.classList.contains('has-language-picker'))
          .to.be.false;
      });
    });

    test('keeps following the hidden attribute after being moved', async () => {
      const mediaMenu = await fixture<MediaMenu>(withPicker);
      await vi.waitFor(() => {
        expect(container(mediaMenu)?.classList.contains('has-language-picker'))
          .to.be.true;
      });

      const parent = mediaMenu.parentElement as HTMLElement;
      mediaMenu.remove();
      parent.appendChild(mediaMenu);
      mediaMenu.querySelector('#picker')?.setAttribute('hidden', '');

      await vi.waitFor(() => {
        expect(container(mediaMenu)?.classList.contains('has-language-picker'))
          .to.be.false;
      });
    });

    test('has no picker class when nothing is slotted', async () => {
      const mediaMenu = await fixture<MediaMenu>(component);

      expect(container(mediaMenu)?.classList.contains('has-language-picker')).to
        .be.false;
    });
  });
});
