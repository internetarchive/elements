import { fixture } from '@open-wc/testing-helpers';
import { html, type LitElement } from 'lit';

import './ia-topnav-media-slider';
import { buildTopNavMenus } from './data/menus';
import { MediaSlider } from './ia-topnav-media-slider';

import { describe, expect, test } from 'vitest';
const menus = buildTopNavMenus();

const component = (mediaSliderOpen: boolean, selectedMenuOption: string) =>
  html`<ia-topnav-media-slider
    ?mediaSliderOpen="${mediaSliderOpen}"
    selectedMenuOption="${selectedMenuOption}"
    .menus=${menus}
  ></ia-topnav-media-slider>`;

describe('<ia-topnav-media-slider>', () => {
  test('sets default properties', async () => {
    const mediaSlider = await fixture<MediaSlider>(component(false, ''));

    expect(mediaSlider.mediaSliderOpen).to.be.false;
    expect(mediaSlider.selectedMenuOption).to.equal('');
  });

  test('renders a media subnav when texts selected', async () => {
    const mediaSlider = await fixture<MediaSlider>(component(false, 'texts'));
    const menuHeading = mediaSlider.shadowRoot
      ?.querySelector('ia-topnav-media-subnav[menu=texts]')
      ?.shadowRoot?.querySelector('h3');
    expect(menuHeading?.innerText).to.equal(menus.texts.heading);
  });

  test('renders a media subnav when audio selected', async () => {
    const mediaSlider = await fixture<MediaSlider>(component(false, 'audio'));
    const menuHeading = mediaSlider.shadowRoot
      ?.querySelector('ia-topnav-media-subnav[menu=audio]')
      ?.shadowRoot?.querySelector('h3');
    expect(menuHeading?.innerText).to.equal(menus.audio.heading);
  });

  test('renders a media subnav when video selected', async () => {
    const mediaSlider = await fixture<MediaSlider>(component(false, 'video'));
    const menuHeading = mediaSlider.shadowRoot
      ?.querySelector('ia-topnav-media-subnav[menu=video]')
      ?.shadowRoot?.querySelector('h3');
    expect(menuHeading?.innerText).to.equal(menus.video.heading);
  });

  test('renders the Wayback component when web menu selected', async () => {
    const mediaSlider = await fixture(component(false, 'web'));
    const waybackSlider = mediaSlider.shadowRoot
      ?.querySelector('ia-topnav-media-subnav[menu=web]')
      ?.shadowRoot?.querySelector('ia-topnav-wayback-slider');
    expect(waybackSlider).to.exist;

    await (waybackSlider as LitElement)?.updateComplete;
    expect(waybackSlider?.shadowRoot?.querySelector('ia-topnav-wayback-search'))
      .to.exist;
  });

  test('renders the more links component when more menu selected', async () => {
    const mediaSlider = await fixture<MediaSlider>(component(false, 'more'));
    const moreSlider = mediaSlider.shadowRoot
      ?.querySelector('ia-topnav-media-subnav[menu=more]')
      ?.shadowRoot?.querySelector('ia-topnav-more-slider');
    expect(moreSlider).to.exist;
  });
});
