import { fixture, fixtureCleanup } from '@open-wc/testing-helpers';
import { html } from 'lit';

import './ia-topnav';
import { IATopNav } from './ia-topnav';
import './ia-topnav-wayback-search';

import { afterEach, describe, expect, test } from 'vitest';

/**
 * A media button's label and the primary nav bar, drilled down through the
 * real shadow-root tree the way the browser renders them, so these
 * assertions reflect what a page actually paints rather than a single
 * component's styles in isolation.
 */
function measurements(el: IATopNav) {
  const primaryNav = el.shadowRoot?.querySelector('ia-topnav-primary-nav');
  const bar = primaryNav?.shadowRoot?.querySelector('nav');
  const mediaMenu = primaryNav?.shadowRoot?.querySelector(
    'ia-topnav-media-menu',
  );
  const textsButton = mediaMenu?.shadowRoot?.querySelector(
    '[data-mediatype=texts]',
  );
  const label = textsButton?.shadowRoot?.querySelector('.label');

  if (!bar || !label) {
    throw new Error('expected nav bar and media button label to be present');
  }

  return {
    barHeight: getComputedStyle(bar).height,
    labelFontSize: getComputedStyle(label).fontSize,
  };
}

describe('<ia-topnav> font-size scale unit', () => {
  const rootFontSizeBefore = document.documentElement.style.fontSize;

  afterEach(() => {
    fixtureCleanup();
    document.documentElement.style.fontSize = rootFontSizeBefore;
  });

  test('renders the same at a 10px root and at a 16px root, with no override', async () => {
    document.documentElement.style.fontSize = '10px';
    const atTenPxRoot = measurements(
      await fixture<IATopNav>(html`<ia-topnav></ia-topnav>`),
    );
    fixtureCleanup();

    document.documentElement.style.fontSize = '16px';
    const atSixteenPxRoot = measurements(
      await fixture<IATopNav>(html`<ia-topnav></ia-topnav>`),
    );

    expect(atSixteenPxRoot).to.deep.equal(atTenPxRoot);
    // Matches the 10px-root design values.
    expect(atSixteenPxRoot.barHeight).to.equal('40px');
    expect(atSixteenPxRoot.labelFontSize).to.equal('16px');
  });

  test('scales with --ia-unit set on the topnav, independent of the html root', async () => {
    document.documentElement.style.fontSize = '10px';
    const el = await fixture<IATopNav>(
      html`<ia-topnav style="--ia-unit: 2px"></ia-topnav>`,
    );
    const { barHeight, labelFontSize } = measurements(el);

    // Double the 1px default, so every topnavUnit-based size doubles too.
    expect(barHeight).to.equal('80px');
    expect(labelFontSize).to.equal('32px');
  });

  test('stays fixed through a nested component that sets its own font-size', async () => {
    // ia-topnav-wayback-search's own :host sets font-size to
    // calc(12 * var(--topnavUnit--)), a container with a font-size
    // different from its ia-topnav ancestor's. It's slotted into the real
    // `search` slot (projected through ia-topnav's own forwarding slot into
    // ia-topnav-primary-nav's .search-container), and --ia-unit is set to a
    // non-default 2px so the expected --topnavUnit-- can't be mistaken for
    // the 1px fallback an element outside the inheritance chain would read.
    const topnav = await fixture<IATopNav>(
      html`<ia-topnav style="--ia-unit: 2px">
        <ia-topnav-wayback-search slot="search"></ia-topnav-wayback-search>
      </ia-topnav>`,
    );
    const waybackSearch = topnav.querySelector('ia-topnav-wayback-search');
    const input = waybackSearch?.shadowRoot?.querySelector('input');

    if (!waybackSearch || !input) {
      throw new Error('expected wayback search and its input to be present');
    }

    expect(
      getComputedStyle(waybackSearch).getPropertyValue('--topnavUnit--'),
    ).to.equal('2px');

    const inputStyle = getComputedStyle(input);
    expect(inputStyle.height).to.equal('60px');
    expect(inputStyle.borderRadius).to.equal('40px');
    expect(inputStyle.padding).to.equal('10px 20px 10px 60px');
  });
});
