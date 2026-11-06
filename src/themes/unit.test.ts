import { fixture, fixtureCleanup } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { afterEach, describe, expect, test } from 'vitest';

import '@src/elements/ia-button/ia-button';
import type { IAButton } from '@src/elements/ia-button/ia-button';
import { applyIaUnit, iaUnitFromDefaultFontSize } from './unit';

const root = document.documentElement;

async function buttonBox() {
  const el = await fixture<IAButton>(html`<ia-button>Search</ia-button>`);
  const button = el.shadowRoot!.querySelector<HTMLElement>('button')!;
  const style = getComputedStyle(button);
  return {
    height: button.getBoundingClientRect().height,
    paddingLeft: style.paddingLeft,
    fontSize: style.fontSize,
    borderWidth: style.borderTopWidth,
    radius: style.borderTopLeftRadius,
  };
}

describe('--ia-unit', () => {
  const unitBefore = root.style.getPropertyValue('--ia-unit');
  const fontSizeBefore = root.style.fontSize;

  afterEach(() => {
    fixtureCleanup();
    root.style.setProperty('--ia-unit', unitBefore);
    root.style.fontSize = fontSizeBefore;
  });

  test('is set on <html> from the default font size when the module loads', () => {
    expect(unitBefore).to.equal('1px');
  });

  test('is the default font size over 16', () => {
    expect(iaUnitFromDefaultFontSize(16)).to.equal('1px');
    expect(iaUnitFromDefaultFontSize(20)).to.equal('1.25px');
  });

  test("keeps a page's own --ia-unit", () => {
    root.style.setProperty('--ia-unit', '3px');
    applyIaUnit();
    expect(root.style.getPropertyValue('--ia-unit')).to.equal('3px');
  });

  test("sizes the same at a 10px root, a 16px root and the browser's default", async () => {
    const boxes = [];
    for (const size of ['10px', '16px', '']) {
      root.style.fontSize = size;
      boxes.push(await buttonBox());
      fixtureCleanup();
    }
    expect(boxes[0]).to.deep.equal({
      height: 36,
      paddingLeft: '30px',
      fontSize: '14px',
      borderWidth: '1px',
      radius: '4px',
    });
    expect(boxes[1]).to.deep.equal(boxes[0]);
    expect(boxes[2]).to.deep.equal(boxes[0]);
  });

  test("scales text-bearing sizes with the user's setting and leaves fixed ones alone", async () => {
    // A 20px browser default.
    root.style.setProperty('--ia-unit', '1.25px');
    expect(await buttonBox()).to.deep.equal({
      height: 45,
      paddingLeft: '37.5px',
      fontSize: '17.5px',
      borderWidth: '1px',
      radius: '4px',
    });
  });
});
