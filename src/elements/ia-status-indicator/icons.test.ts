import { describe, expect, test } from 'vitest';

import audioIcon from './icons/audio.svg';
import collectionIcon from './icons/collection.svg';
import etreeIcon from './icons/etree.svg';
import imagesIcon from './icons/images.svg';
import searchIcon from './icons/search.svg';
import softwareIcon from './icons/software.svg';
import textsIcon from './icons/texts.svg';
import tvIcon from './icons/tv.svg';
import videoIcon from './icons/video.svg';
import webIcon from './icons/web.svg';

/**
 * These assert the shape of the shipped .svg assets rather than any component
 * behaviour, because that is where the bug lived: `mask-size: contain` centres
 * a glyph's *viewBox*, not its ink, so a glyph whose ink sits against one edge
 * of its box renders off-centre no matter what the component does.
 */

const ICONS: [name: string, url: string][] = [
  ['audio', audioIcon],
  ['collection', collectionIcon],
  ['etree', etreeIcon],
  ['images', imagesIcon],
  ['search', searchIcon],
  ['software', softwareIcon],
  ['texts', textsIcon],
  ['tv', tvIcon],
  ['video', videoIcon],
  ['web', webIcon],
];

type Margins = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

/**
 * Loads a glyph as inline svg and measures where its ink sits inside its
 * viewBox, as a fraction of the box. Inline is the only way to get `getBBox`;
 * the component itself draws these as CSS masks.
 */
async function measure(url: string): Promise<Margins> {
  const markup = await (await fetch(url)).text();

  const host = document.createElement('div');
  // Off-screen rather than hidden: `display: none` gives an empty bbox.
  host.style.cssText = 'position:absolute;left:-9999px;top:0';
  host.innerHTML = markup;
  document.body.append(host);

  try {
    const svg = host.querySelector('svg');
    expect(svg, `${url} should contain an <svg>`).to.exist;

    const viewBox = svg?.getAttribute('viewBox');
    expect(viewBox, `${url} should declare a viewBox`).to.exist;

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

describe('mediatype glyph assets', () => {
  ICONS.forEach(([name, url]) => {
    test(`${name} centres its ink vertically within its viewBox`, async () => {
      const { top, bottom } = await measure(url);

      // `collection`, `texts` and `web` each had ~29% empty above the ink and
      // 6.7% below, so they rendered visibly low in the ring.
      expect(
        Math.abs(top - bottom),
        `${name} has lopsided vertical margins (top ${(top * 100).toFixed(
          1,
        )}%, bottom ${(bottom * 100).toFixed(1)}%)`,
      ).to.be.lessThan(0.02);
    });

    test(`${name} centres its ink horizontally within its viewBox`, async () => {
      const { left, right } = await measure(url);

      expect(
        Math.abs(left - right),
        `${name} has lopsided horizontal margins (left ${(left * 100).toFixed(
          1,
        )}%, right ${(right * 100).toFixed(1)}%)`,
      ).to.be.lessThan(0.02);
    });
  });
});
