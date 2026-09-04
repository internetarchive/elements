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

  test('reflects mode and mediatype to attributes', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator
        .mode=${'success'}
        .mediatype=${'audio'}
      ></ia-status-indicator>`,
    );

    expect(el.getAttribute('mode')).to.equal('success');
    expect(el.getAttribute('mediatype')).to.equal('audio');
  });

  test('reflects hideDots to an attribute', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .hideDots=${true}></ia-status-indicator>`,
    );

    expect(el.hasAttribute('hidedots')).to.equal(true);
  });
});
