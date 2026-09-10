import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';

import './ia-topnav-media-menu';
import { MediaMenu } from './ia-topnav-media-menu';

import { describe, expect, test } from 'vitest';
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

  test('renders with closed class if done animating', async () => {
    const mediaMenu = await fixture<MediaMenu>(component);

    // mediaMenu.mediaMenuAnimate = true;
    // await mediaMenu.updateComplete;

    expect(
      mediaMenu.shadowRoot
        ?.querySelector('.media-menu-container')
        ?.classList.contains('closed'),
    ).to.be.true;
  });
});
