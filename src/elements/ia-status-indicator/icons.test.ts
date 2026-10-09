import { describe, expect, test } from 'vitest';

/**
 * The mediatype glyph sources the status indicator draws, read as raw markup
 * from the shared `icons/` folder. These assert the shape of the sources rather
 * than any component behaviour, because that is where the bug lived: the
 * indicator sizes a glyph by its *viewBox*, and an svg centres the viewBox in
 * its box, not the ink. A glyph whose ink sits against one edge of its viewBox
 * renders off-centre no matter what the component does.
 */
const sources = import.meta.glob<string>(
  [
    '../../../icons/mediatype-*.svg',
    // The unpadded variants are a different crop of the same artwork and
    // aren't drawn by the status indicator.
    '!../../../icons/mediatype-*-unpadded.svg',
    // The `search` mediatype shares the glyph the dropdown search bar uses.
    '../../../icons/search.svg',
  ],
  { query: '?raw', import: 'default', eager: true },
);

const ICONS: [name: string, markup: string][] = Object.entries(sources).map(
  ([path, markup]) => [path.split('/').pop() as string, markup],
);

type Margins = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

/**
 * Loads a glyph as inline svg and measures where its ink sits inside its
 * viewBox, as a fraction of the box. `getBBox` needs the markup in the
 * document.
 */
function measure(name: string, markup: string): Margins {
  const host = document.createElement('div');
  // Off-screen rather than hidden: `display: none` gives an empty bbox.
  host.style.cssText = 'position:absolute;left:-9999px;top:0';
  host.innerHTML = markup;
  document.body.append(host);

  try {
    const svg = host.querySelector('svg');
    expect(svg, `${name} should contain an <svg>`).to.exist;

    const viewBox = svg?.getAttribute('viewBox');
    expect(viewBox, `${name} should declare a viewBox`).to.exist;

    const [vx, vy, width, height] = (viewBox as string)
      .split(/[\s,]+/)
      .map(Number);
    const ink = (svg as SVGSVGElement).getBBox();

    return {
      top: (ink.y - vy) / height,
      bottom: (vy + height - ink.y - ink.height) / height,
      left: (ink.x - vx) / width,
      right: (vx + width - ink.x - ink.width) / width,
    };
  } finally {
    host.remove();
  }
}

describe('mediatype glyph sources', () => {
  test('covers every mediatype glyph', () => {
    expect(ICONS.map(([name]) => name).sort()).to.deep.equal([
      'mediatype-audio.svg',
      'mediatype-collection.svg',
      'mediatype-etree.svg',
      'mediatype-images.svg',
      'mediatype-software.svg',
      'mediatype-texts.svg',
      'mediatype-tv.svg',
      'mediatype-video.svg',
      'mediatype-web.svg',
      'search.svg',
    ]);
  });

  ICONS.forEach(([name, markup]) => {
    test(`${name} centres its ink vertically within its viewBox`, () => {
      const { top, bottom } = measure(name, markup);

      // `collection`, `texts` and `web` each had ~29% empty above the ink and
      // 6.7% below, so they rendered visibly low in the ring.
      expect(
        Math.abs(top - bottom),
        `${name} has lopsided vertical margins (top ${(top * 100).toFixed(
          1,
        )}%, bottom ${(bottom * 100).toFixed(1)}%)`,
      ).to.be.lessThan(0.02);
    });

    test(`${name} centres its ink horizontally within its viewBox`, () => {
      const { left, right } = measure(name, markup);

      expect(
        Math.abs(left - right),
        `${name} has lopsided horizontal margins (left ${(left * 100).toFixed(
          1,
        )}%, right ${(right * 100).toFixed(1)}%)`,
      ).to.be.lessThan(0.02);
    });
  });
});
