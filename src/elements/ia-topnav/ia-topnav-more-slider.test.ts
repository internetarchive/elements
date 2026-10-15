import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import './ia-topnav-more-slider';
import { buildTopNavMenus } from './data/menus';

import { describe, expect, test } from 'vitest';
describe('<ia-topnav-more-slider>', () => {
  test('renders links with relative hrefs using baseHost', async () => {
    const menus = buildTopNavMenus();
    const baseHost = 'archive.org';
    const el = await fixture(
      html`<ia-topnav-more-slider
        .baseHost=${baseHost}
        .config=${{}}
        .menuItems=${menus.more.links}
      ></ia-topnav-more-slider>`,
    );

    expect(el.shadowRoot?.querySelector('a')?.getAttribute('href')).to.contain(
      baseHost,
    );
  });
});
