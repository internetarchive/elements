import { fixture, fixtureCleanup } from '@open-wc/testing-helpers';
import { html } from 'lit';

import './ia-topnav';
import { IATopNav } from './ia-topnav';
import './ia-topnav-wayback-search';
import { applyTopnavUnitFallback } from './lib/register-topnav-unit';

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

  test('scales with the --topnavFontSize override, independent of the html root', async () => {
    document.documentElement.style.fontSize = '10px';
    const el = await fixture<IATopNav>(
      html`<ia-topnav style="--topnavFontSize: 32px"></ia-topnav>`,
    );
    const { barHeight, labelFontSize } = measurements(el);

    // Double the 16px default, so every topnavUnit-based size doubles too.
    expect(barHeight).to.equal('80px');
    expect(labelFontSize).to.equal('32px');
  });

  test('stays fixed through a nested component that sets its own font-size', async () => {
    // ia-topnav-wayback-search's own :host sets font-size to
    // calc(12 * var(--topnavUnit--)), a container with a font-size
    // different from its ia-topnav ancestor's. It's slotted into the real
    // `search` slot (projected through ia-topnav's own forwarding slot into
    // ia-topnav-primary-nav's .search-container), and --topnavFontSize is
    // overridden to a non-default 32px so the expected --topnavUnit-- (2px)
    // can't be mistaken for the registered property's 1px initial value,
    // which is what an element outside the real inheritance chain would
    // read instead.
    const topnav = await fixture<IATopNav>(
      html`<ia-topnav style="--topnavFontSize: 32px">
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

describe('applyTopnavUnitFallback', () => {
  test("sets --topnavUnit-- from the host's own rendered font-size", () => {
    const host = document.createElement('div');
    host.style.fontSize = '32px';
    document.body.append(host);

    try {
      applyTopnavUnitFallback(host);
      expect(
        getComputedStyle(host).getPropertyValue('--topnavUnit--').trim(),
      ).to.equal('2px');
    } finally {
      host.remove();
    }
  });
});

describe('--topnavUnit-- registration', () => {
  /**
   * Reproduces the topnav's exact mechanism (an outer host whose own
   * font-size ignores the page root, and a `calc(1em / 16)` unit meant to
   * stay fixed through a nested host that sets its own, different
   * font-size) twice: once with the unit registered as a typed `<length>`,
   * once without. This is what proves registration is load-bearing, rather
   * than asserting it from the topnav's own tree, where the fix and the
   * thing it fixes can't be toggled independently.
   */
  function defineDemoElements(unitProperty: string) {
    const suffix = unitProperty.replace(/[^a-z]/gi, '').toLowerCase();
    const outerTag = `demo-outer-${suffix}`;
    const innerTag = `demo-inner-${suffix}`;

    if (!customElements.get(outerTag)) {
      customElements.define(
        outerTag,
        class extends HTMLElement {
          constructor() {
            super();
            const root = this.attachShadow({ mode: 'open' });
            const inner = document.createElement(innerTag);
            root.innerHTML = `<style>
              :host {
                font-size: medium;
                ${unitProperty}: calc(1em / 16);
              }
            </style>`;
            root.append(inner);
          }
        },
      );
    }

    if (!customElements.get(innerTag)) {
      customElements.define(
        innerTag,
        class extends HTMLElement {
          constructor() {
            super();
            const root = this.attachShadow({ mode: 'open' });
            // A nested container with its own, different font-size: the same
            // shape as ia-topnav-wayback-search's :host inside ia-topnav.
            root.innerHTML = `<style>
              :host {
                font-size: 12px;
              }
              #leaf {
                display: block;
                width: calc(16 * var(${unitProperty}));
              }
            </style>
            <div id="leaf"></div>`;
          }
        },
      );
    }

    return { outerTag, innerTag };
  }

  test('an unregistered unit compounds under a nested font-size container', () => {
    const { outerTag, innerTag } = defineDemoElements('--unregisteredUnit--');
    const outer = document.createElement(outerTag);
    document.body.append(outer);

    try {
      const inner = outer.shadowRoot?.querySelector(innerTag);
      const leaf = inner?.shadowRoot?.querySelector('#leaf');
      if (!leaf) throw new Error('expected the demo leaf element to exist');

      // Intended: 16 * 1px = 16px. Actual: --unregisteredUnit--'s
      // calc(1em / 16) re-resolves against the inner host's own 12px,
      // giving 16 * 0.75 = 12px.
      expect(getComputedStyle(leaf).width).to.equal('12px');
    } finally {
      outer.remove();
    }
  });

  test('a registered unit stays fixed under the same nested font-size container', () => {
    const unitProperty = '--registeredUnit--';
    try {
      CSS.registerProperty({
        name: unitProperty,
        syntax: '<length>',
        inherits: true,
        initialValue: '1px',
      });
    } catch (e) {
      // Idempotent across repeated runs of this test (e.g. watch mode).
      if (
        !(e instanceof DOMException) ||
        e.name !== 'InvalidModificationError'
      ) {
        throw e;
      }
    }

    const { outerTag, innerTag } = defineDemoElements(unitProperty);
    const outer = document.createElement(outerTag);
    document.body.append(outer);

    try {
      const inner = outer.shadowRoot?.querySelector(innerTag);
      const leaf = inner?.shadowRoot?.querySelector('#leaf');
      if (!leaf) throw new Error('expected the demo leaf element to exist');

      expect(getComputedStyle(leaf).width).to.equal('16px');
    } finally {
      outer.remove();
    }
  });
});
