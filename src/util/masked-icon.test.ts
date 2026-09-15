import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test } from 'vitest';

import { maskedIcon } from './masked-icon';

const ICON_URL = '/some/where/glyph.svg';

/**
 * What a bundler actually hands us for a small SVG: an inlined `data:` URI
 * whose markup is quoted with apostrophes. This is the case that breaks if the
 * `url()` isn't quoted, so it's worth testing explicitly.
 */
const INLINED_DATA_URI =
  "data:image/svg+xml,%3csvg viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='%23000' d='m9 0h9v9z'/%3e%3c/svg%3e";

describe('maskedIcon', () => {
  test('renders the glyph as a masked span rather than inline svg', async () => {
    const el = await fixture<HTMLElement>(
      html`<div>${maskedIcon(ICON_URL)}</div>`,
    );
    const icon = el.querySelector('.ia-icon') as HTMLElement;

    // The point of the mask approach: no svg markup ships in the JS bundle.
    expect(el.querySelector('svg')).to.not.exist;
    expect(icon.tagName).to.equal('SPAN');
  });

  test('points the mask at the standalone svg asset', async () => {
    const el = await fixture<HTMLElement>(
      html`<div>${maskedIcon(ICON_URL)}</div>`,
    );
    const icon = el.querySelector('.ia-icon') as HTMLElement;
    const { maskImage, webkitMaskImage } = getComputedStyle(icon);

    // Both prefixes are emitted so Safari/iOS render the glyph too.
    expect(maskImage).to.contain(ICON_URL);
    expect(webkitMaskImage).to.contain(ICON_URL);
  });

  test('still applies the mask when the icon is an inlined data URI', async () => {
    const el = await fixture<HTMLElement>(
      html`<div>${maskedIcon(INLINED_DATA_URI)}</div>`,
    );
    const icon = el.querySelector('.ia-icon') as HTMLElement;
    const { maskImage } = getComputedStyle(icon);

    // An unquoted url() containing apostrophes is invalid CSS, so the whole
    // declaration would be dropped and the glyph would paint as a solid block.
    expect(maskImage).to.not.equal('none');
    expect(maskImage).to.contain('data:image/svg+xml');
  });

  test('scales the glyph to the box without repeating it', async () => {
    const el = await fixture<HTMLElement>(
      html`<div>${maskedIcon(ICON_URL)}</div>`,
    );
    const styles = getComputedStyle(
      el.querySelector('.ia-icon') as HTMLElement,
    );

    expect(styles.maskRepeat).to.equal('no-repeat');
    expect(styles.maskSize).to.equal('contain');
    expect(styles.display).to.equal('inline-block');
  });

  test('takes its paint from background-color so hosts can recolor it', async () => {
    const el = await fixture<HTMLElement>(
      html`<div style="color: rgb(1, 2, 3)">
        <style>
          .ia-icon {
            background-color: rgb(10, 20, 30);
          }
        </style>
        ${maskedIcon(ICON_URL)}
      </div>`,
    );
    const icon = el.querySelector('.ia-icon') as HTMLElement;

    expect(getComputedStyle(icon).backgroundColor).to.equal('rgb(10, 20, 30)');
  });

  test('hides the decorative glyph from assistive tech', async () => {
    const el = await fixture<HTMLElement>(
      html`<div>${maskedIcon(ICON_URL)}</div>`,
    );

    expect(
      (el.querySelector('.ia-icon') as HTMLElement).getAttribute('aria-hidden'),
    ).to.equal('true');
  });
});
