import { fixture, oneEvent } from '@open-wc/testing-helpers';
import { html } from 'lit';

import './ia-topnav-media-button';
import { MediaButton } from './ia-topnav-media-button';

import { describe, expect, test } from 'vitest';
describe('<ia-topnav-media-button>', () => {
  test('emits an event when button pressed', async () => {
    const el = await fixture<MediaButton>(
      html`<ia-topnav-media-button></ia-topnav-media-button>`,
    );

    const link = el.shadowRoot?.querySelector(
      '.menu-item',
    ) as HTMLAnchorElement;

    setTimeout(() => link.click());
    const response = await oneEvent(el, 'mediaTypeSelected');

    expect(response).to.exist;
  });
});
