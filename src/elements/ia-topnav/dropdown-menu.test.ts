import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';

import DropdownMenu from './dropdown-menu';
import { defaultTopNavConfig } from './data/menus';

import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
/*
 * The base class ships unregistered, so the test gives it a tag to mount
 * under. The name is test-only and deliberately outside the topnav's own
 * namespace, which element-names.test.ts holds free.
 */
customElements.define('ia-topnav-test-dropdown-menu', DropdownMenu);

const component = html`<ia-topnav-test-dropdown-menu></ia-topnav-test-dropdown-menu>`;

describe('<ia-topnav-test-dropdown-menu>', () => {
  test('sets default properties', async () => {
    const el = await fixture<DropdownMenu>(component);
    expect(el.animated).to.be.false;
    expect(el.open).to.be.false;
    expect(el.menuItems.length).to.equal(0);
  });

  test('renders a closed class if component is animating', async () => {
    const el = await fixture<DropdownMenu>(component);
    el.animated = true;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('.closed')).to.exist;
  });

  test("draws a row's focus ring inside the row", async () => {
    const el = await fixture<DropdownMenu>(html`
      <ia-topnav-test-dropdown-menu
        .menuItems=${[{ title: 'Upload', url: '/create' }]}
        ?open=${true}
      ></ia-topnav-test-dropdown-menu>
    `);
    const link = el.shadowRoot?.querySelector('a') as HTMLElement;
    link.focus();
    expect(getComputedStyle(link).outlineOffset).to.equal('-2px');
  });

  test('puts a callout after its label in the wide menu', async () => {
    await page.viewport(1200, 800);
    try {
      const el = await fixture<DropdownMenu>(html`
        <ia-topnav-test-dropdown-menu
          .menuItems=${[{ title: 'Upload', url: '/create' }]}
          .config=${{ ...defaultTopNavConfig, callouts: { Upload: 'New' } }}
          ?open=${true}
        ></ia-topnav-test-dropdown-menu>
      `);
      const link = el.shadowRoot?.querySelector('a') as HTMLElement;
      const label = [...link.childNodes].find((n) =>
        n.textContent?.includes('Upload'),
      ) as Text;
      const range = document.createRange();
      range.selectNode(label);
      const callout = link.querySelector('.callout') as HTMLElement;
      expect(callout.getBoundingClientRect().left).to.be.at.least(
        range.getBoundingClientRect().right,
      );
    } finally {
      await page.viewport(414, 896);
    }
  });
});
