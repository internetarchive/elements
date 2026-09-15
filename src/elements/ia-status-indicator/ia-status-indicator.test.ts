import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { MediaTypeIcon, IAStatusIndicator } from './ia-status-indicator';
import './ia-status-indicator';

/** slotchange lands after the initial render, so give it a turn of the loop */
async function settle(el: IAStatusIndicator): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
  await el.updateComplete;
}

const ALL_MEDIATYPES: MediaTypeIcon[] = [
  'audio',
  'collection',
  'etree',
  'images',
  'search',
  'software',
  'texts',
  'tv',
  'video',
  'web',
];

describe('IA Status Indicator', () => {
  test('renders a loading indicator by default', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator></ia-status-indicator>`,
    );
    const loadingIndicator = el.shadowRoot?.querySelector('.loading-indicator');
    expect(loadingIndicator).to.exist;
  });

  test('uses a custom loading text for the indicator if desired', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator
        .loadingTitle=${'Download in progress...'}
      ></ia-status-indicator>`,
    );
    const indicatorTitle = el.shadowRoot?.querySelector('title');
    expect(indicatorTitle?.innerHTML).to.contain('Download in progress...');
  });

  test('uses a default title if no title provided', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator></ia-status-indicator>`,
    );

    const indicatorTitle = el.shadowRoot?.querySelector('title');
    expect(indicatorTitle?.innerHTML).to.contain('Loading...');
  });

  test('shows loading dots inside the ring by default', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator></ia-status-indicator>`,
    );

    const loadingRing = el.shadowRoot?.querySelector('.loading-ring');
    expect(loadingRing).to.exist;
    const loadingDots = el.shadowRoot?.querySelector('.loading-dots');
    expect(loadingDots).to.exist;
  });

  test('uses the original ring geometry when there is no center icon', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator></ia-status-indicator>`,
    );

    const svgEl = el.shadowRoot?.querySelector('.loading-indicator');
    expect(svgEl?.getAttribute('viewBox')).to.equal('0 0 120 120');
  });

  test('renders no center icon by default', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator></ia-status-indicator>`,
    );

    expect(el.shadowRoot?.querySelector('.ia-icon')).to.not.exist;
  });

  test('can hide the loading dots if requested', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .hideDots=${true}></ia-status-indicator>`,
    );

    const loadingDots = el.shadowRoot?.querySelector(
      '.loading-dots',
    ) as HTMLElement;
    expect(loadingDots.computedStyleMap().get('display')?.toString()).to.equal(
      'none',
    );
  });

  test('hideDots with no mediatype leaves a bare ring', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .hideDots=${true}></ia-status-indicator>`,
    );

    expect(el.shadowRoot?.querySelector('.loading-ring')).to.exist;
    expect(el.shadowRoot?.querySelector('.ia-icon')).to.not.exist;
  });

  test('renders a center icon when a mediatype is set', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .mediatype=${'texts'}></ia-status-indicator>`,
    );

    expect(el.shadowRoot?.querySelector('.ia-icon')).to.exist;
  });

  test('suppresses the loading dots when a center icon is present', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .mediatype=${'texts'}></ia-status-indicator>`,
    );

    expect(el.shadowRoot?.querySelector('.loading-dots')).to.not.exist;
  });

  test('uses the roomier ring geometry when a center icon is present', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .mediatype=${'texts'}></ia-status-indicator>`,
    );

    const svgEl = el.shadowRoot?.querySelector('.loading-indicator');
    expect(svgEl?.getAttribute('viewBox')).to.equal('0 0 100 100');
  });

  test('the center icon does not animate, but the ring does', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .mediatype=${'texts'}></ia-status-indicator>`,
    );

    const icon = el.shadowRoot?.querySelector('.ia-icon') as HTMLElement;
    const ring = el.shadowRoot?.querySelector('.loading-ring') as SVGElement;
    expect(getComputedStyle(icon).animationName).to.equal('none');
    expect(getComputedStyle(ring).animationName).to.equal('rotate');
  });

  ALL_MEDIATYPES.forEach((mediatype) => {
    test(`renders a glyph for the ${mediatype} mediatype`, async () => {
      const el = await fixture<IAStatusIndicator>(
        html`<ia-status-indicator
          .mediatype=${mediatype}
        ></ia-status-indicator>`,
      );

      const icon = el.shadowRoot?.querySelector('.ia-icon') as HTMLElement;
      expect(icon).to.exist;
      expect(getComputedStyle(icon).maskImage).to.not.equal('none');
    });
  });

  test('maps every mediatype to a distinct glyph', async () => {
    // The bundler inlines small SVGs as data URIs, so the asset filename is not
    // in the resolved URL. Distinctness is what actually proves the mapping is
    // wired up rather than every entry pointing at the same glyph.
    const masksSeen = new Map<string, MediaTypeIcon>();

    for (const mediatype of ALL_MEDIATYPES) {
      const el = await fixture<IAStatusIndicator>(
        html`<ia-status-indicator
          .mediatype=${mediatype}
        ></ia-status-indicator>`,
      );
      const icon = el.shadowRoot?.querySelector('.ia-icon') as HTMLElement;
      const mask = getComputedStyle(icon).maskImage;

      const collision = masksSeen.get(mask);
      expect(
        collision,
        `${mediatype} resolved to the same glyph as ${collision}`,
      ).to.equal(undefined);
      masksSeen.set(mask, mediatype);
    }

    expect(masksSeen.size).to.equal(ALL_MEDIATYPES.length);
  });

  test('degrades to the default dots for an unmapped mediatype', async () => {
    const el = await fixture<IAStatusIndicator>(
      // 'account' and 'data' are real archive.org mediatypes with no glyph here
      html`<ia-status-indicator
        .mediatype=${'account' as MediaTypeIcon}
      ></ia-status-indicator>`,
    );

    expect(el.shadowRoot?.querySelector('.ia-icon')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.loading-dots')).to.exist;
  });

  test('quotes the mask url so inlined data URIs stay valid', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .mediatype=${'texts'}></ia-status-indicator>`,
    );

    const icon = el.shadowRoot?.querySelector('.ia-icon') as HTMLElement;
    // An unquoted url() containing apostrophes silently drops the declaration,
    // which paints a solid block instead of the glyph.
    expect(icon.getAttribute('style')).to.contain('url("');
    expect(getComputedStyle(icon).maskImage).to.not.equal('none');
  });

  test('hides the decorative center glyph from assistive tech', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .mediatype=${'texts'}></ia-status-indicator>`,
    );

    const icon = el.shadowRoot?.querySelector('.ia-icon') as HTMLElement;
    expect(icon.getAttribute('aria-hidden')).to.equal('true');
  });

  test('keeps the svg title as the only accessible name with an icon present', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .mediatype=${'texts'}></ia-status-indicator>`,
    );

    expect(el.shadowRoot?.querySelectorAll('title').length).to.equal(1);
  });

  test('lets slotted icon content override the bundled glyph', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator>
        <span slot="icon" id="custom-glyph"></span>
      </ia-status-indicator>`,
    );
    await settle(el);

    const slot = el.shadowRoot?.querySelector(
      'slot[name="icon"]',
    ) as HTMLSlotElement;
    const assigned = slot.assignedElements();
    expect(assigned.length).to.equal(1);
    expect(assigned[0].id).to.equal('custom-glyph');
  });

  test('treats slotted icon content as a center icon for ring geometry', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator>
        <span slot="icon" id="custom-glyph"></span>
      </ia-status-indicator>`,
    );
    await settle(el);

    const svgEl = el.shadowRoot?.querySelector('.loading-indicator');
    expect(svgEl?.getAttribute('viewBox')).to.equal('0 0 100 100');
    expect(el.shadowRoot?.querySelector('.loading-dots')).to.not.exist;
  });

  test('can render a success indicator instead if requested', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .mode=${'success'}></ia-status-indicator>`,
    );
    const successIndicator = el.shadowRoot?.querySelector('.success-indicator');
    expect(successIndicator).to.exist;
  });

  test('uses a custom success title for the indicator if desired', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator
        .mode=${'success'}
        .successTitle=${'Download successful'}
      ></ia-status-indicator>`,
    );
    const indicatorTitle = el.shadowRoot?.querySelector('title');
    expect(indicatorTitle?.innerHTML).to.contain('Download successful');
  });

  test('uses a default success title if no title provided', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .mode=${'success'}></ia-status-indicator>`,
    );

    const indicatorTitle = el.shadowRoot?.querySelector('title');
    expect(indicatorTitle?.innerHTML).to.contain('Success');
  });

  test('ignores the mediatype in success mode', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator
        .mode=${'success'}
        .mediatype=${'texts'}
      ></ia-status-indicator>`,
    );

    expect(el.shadowRoot?.querySelector('.success-indicator')).to.exist;
    expect(el.shadowRoot?.querySelector('.ia-icon')).to.not.exist;
  });

  test('can render an error indicator instead if requested', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .mode=${'error'}></ia-status-indicator>`,
    );
    const errorIndicator = el.shadowRoot?.querySelector('.error-indicator');
    expect(errorIndicator).to.exist;
  });

  test('uses a custom error title for the indicator if desired', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator
        .mode=${'error'}
        .errorTitle=${'Download failed'}
      ></ia-status-indicator>`,
    );
    const indicatorTitle = el.shadowRoot?.querySelector('title');
    expect(indicatorTitle?.innerHTML).to.contain('Download failed');
  });

  test('uses a default error title if no title provided', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .mode=${'error'}></ia-status-indicator>`,
    );

    const indicatorTitle = el.shadowRoot?.querySelector('title');
    expect(indicatorTitle?.innerHTML).to.contain('Error');
  });

  test('ignores the mediatype in error mode', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator
        .mode=${'error'}
        .mediatype=${'texts'}
      ></ia-status-indicator>`,
    );

    expect(el.shadowRoot?.querySelector('.error-indicator')).to.exist;
    expect(el.shadowRoot?.querySelector('.ia-icon')).to.not.exist;
  });

  test('can render a placeholder instead if requested', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .mode=${'ready'}></ia-status-indicator>`,
    );

    expect(el.shadowRoot?.querySelector('.placeholder')).to.exist;
    expect(el.shadowRoot?.querySelector('.loading-indicator')).to.not.exist;
  });

  describe('rendered appearance', () => {
    /** A sized indicator showing a glyph, so geometry is measurable. */
    async function sized(width: string, mediatype: MediaTypeIcon = 'texts') {
      const el = await fixture<IAStatusIndicator>(
        html`<ia-status-indicator
          .mediatype=${mediatype}
          style="--ia-theme-icon-width: ${width}"
        ></ia-status-indicator>`,
      );
      const glyph = el.shadowRoot?.querySelector('.ia-icon') as HTMLElement;
      expect(glyph, 'a mediatype glyph should be rendering').to.exist;
      return { el, glyph };
    }

    test('centres the glyph in the ring', async () => {
      const { el, glyph } = await sized('200px');

      const host = el.getBoundingClientRect();
      const ink = glyph.getBoundingClientRect();

      expect(
        Math.abs(ink.left + ink.width / 2 - (host.left + host.width / 2)),
        'glyph is off-centre horizontally',
      ).to.be.lessThan(1);
      expect(
        Math.abs(ink.top + ink.height / 2 - (host.top + host.height / 2)),
        'glyph is off-centre vertically',
      ).to.be.lessThan(1);
    });

    test('keeps the glyph inside the ring', async () => {
      const { el, glyph } = await sized('200px');

      const host = el.getBoundingClientRect();
      const ink = glyph.getBoundingClientRect();

      // Half the host leaves the ring's stroke clear on every side. A glyph
      // that grew past this would start colliding with the ring it sits in.
      expect(
        ink.width,
        `glyph is ${ink.width}px wide in a ${host.width}px indicator`,
      ).to.be.lessThan(host.width / 2 + 1);
      expect(ink.left, 'glyph overflows the ring on the left').to.be.at.least(
        host.left,
      );
      expect(ink.right, 'glyph overflows the ring on the right').to.be.at.most(
        host.right,
      );
    });

    test('paints the glyph the same colour as the ring', async () => {
      const el = await fixture<IAStatusIndicator>(
        html`<ia-status-indicator
          .mediatype=${'texts'}
          style="--ia-theme-icon-width: 200px; --ia-theme-primary-text-color: rgb(12, 34, 56)"
        ></ia-status-indicator>`,
      );

      const glyph = el.shadowRoot?.querySelector('.ia-icon') as HTMLElement;
      const ring = el.shadowRoot?.querySelector('.loading-ring') as SVGElement;

      // The glyph is monochrome with the ring by design -- offshoot's
      // per-mediatype brand colours are deliberately not carried over.
      expect(getComputedStyle(glyph).backgroundColor).to.equal(
        'rgb(12, 34, 56)',
      );
      expect(getComputedStyle(ring).fill).to.equal('rgb(12, 34, 56)');
    });

    test('scales the glyph with the indicator width', async () => {
      const small = await sized('100px');
      const large = await sized('200px');

      const smallInk = small.glyph.getBoundingClientRect().width;
      const largeInk = large.glyph.getBoundingClientRect().width;

      expect(
        largeInk / smallInk,
        `glyph went from ${smallInk}px to ${largeInk}px when the indicator doubled`,
      ).to.be.closeTo(2, 0.05);
    });
  });
});
