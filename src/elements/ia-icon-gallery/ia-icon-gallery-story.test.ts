import { fixture } from '@open-wc/testing-helpers';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import {
  galleryIcons,
  toIdentifier,
  type IAIconGalleryStory,
} from './ia-icon-gallery-story';
import './ia-icon-gallery-story';

async function makeGallery() {
  const el = await fixture<IAIconGalleryStory>(
    html`<ia-icon-gallery-story></ia-icon-gallery-story>`,
  );
  await el.updateComplete;
  return el;
}

const root = (el: Element) => el.shadowRoot as ShadowRoot;

function cards(el: Element): HTMLElement[] {
  return Array.from(root(el).querySelectorAll<HTMLElement>('.card'));
}

function input(el: Element, selector: string): HTMLInputElement {
  return root(el).querySelector(selector) as HTMLInputElement;
}

async function type(el: IAIconGalleryStory, selector: string, value: string) {
  const field = input(el, selector);
  field.value = value;
  field.dispatchEvent(new Event('input', { bubbles: true }));
  await el.updateComplete;
}

const countText = (el: Element) =>
  root(el).querySelector('#count')?.textContent?.trim();

describe('toIdentifier', () => {
  test('camel-cases a kebab-case name', () => {
    expect(toIdentifier('search')).toBe('search');
    expect(toIdentifier('caret-open')).toBe('caretOpen');
    expect(toIdentifier('arrow-up-right')).toBe('arrowUpRight');
  });

  test('prefixes a name that is not a valid identifier', () => {
    expect(toIdentifier('3d-box')).toBe('icon3dBox');
    expect(toIdentifier('delete')).toBe('iconDelete');
    expect(toIdentifier('class')).toBe('iconClass');
  });
});

describe('ia-icon-gallery-story', () => {
  test('finds at least one icon', () => {
    expect(galleryIcons.length).toBeGreaterThan(0);
  });

  test('renders a card per icon with its name and import line', async () => {
    const el = await makeGallery();
    const rendered = cards(el);
    expect(rendered.length).toBe(galleryIcons.length);
    galleryIcons.forEach((icon, i) => {
      const card = rendered[i];
      expect(card.querySelector('.name')?.textContent).toBe(icon.name);
      expect(card.querySelector('.import')?.textContent).toBe(
        `import ${toIdentifier(icon.name)} from '@internetarchive/elements/icons/${icon.name}';`,
      );
      expect(card.querySelector('.glyph svg')).to.exist;
    });
    expect(countText(el)).toBe(
      `${galleryIcons.length} of ${galleryIcons.length} icons`,
    );
  });

  test('the search input has an accessible label', async () => {
    const el = await makeGallery();
    expect(root(el).querySelector('label')?.textContent).toContain(
      'Search icons',
    );
    expect(input(el, '#search').labels?.length).toBe(1);
  });

  test('typing filters by name, ignoring case, and updates the count', async () => {
    const el = await makeGallery();
    const target = galleryIcons[0].name;
    const query = target.slice(0, Math.min(3, target.length)).toUpperCase();
    const expected = galleryIcons.filter((i) =>
      i.name.includes(query.toLowerCase()),
    );

    await type(el, '#search', query);

    expect(cards(el).map((c) => c.dataset.name)).toEqual(
      expected.map((i) => i.name),
    );
    expect(countText(el)).toBe(
      `${expected.length} of ${galleryIcons.length} icons`,
    );
    expect(root(el).querySelector('#empty')).to.not.exist;
  });

  test('a search with no match shows the empty state', async () => {
    const el = await makeGallery();
    await type(el, '#search', 'zzz-no-such-icon');
    expect(cards(el).length).toBe(0);
    expect(countText(el)).toBe(`0 of ${galleryIcons.length} icons`);
    expect(root(el).querySelector('#empty')?.textContent).toContain(
      'No icons match',
    );
  });

  test('the color control recolors the icons and reset restores the inherited color', async () => {
    const el = await makeGallery();
    const svg = () => root(el).querySelector('.glyph svg') as SVGElement;
    const inherited = getComputedStyle(svg()).color;

    await type(el, '#color', '#ff0000');
    expect(getComputedStyle(svg()).color).toBe('rgb(255, 0, 0)');

    (root(el).querySelector('#reset-color') as HTMLButtonElement).click();
    await el.updateComplete;
    expect(getComputedStyle(svg()).color).toBe(inherited);
  });

  test('the size control resizes the icons', async () => {
    const el = await makeGallery();
    const svg = () => root(el).querySelector('.glyph svg') as SVGElement;

    await type(el, '#size', '64');
    expect(svg().getBoundingClientRect().width).toBe(64);

    await type(el, '#size', '24');
    expect(svg().getBoundingClientRect().width).toBe(24);
  });

  describe('copy button', () => {
    let writeText: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      writeText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText },
        configurable: true,
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    test('writes the import line to the clipboard and confirms it', async () => {
      const el = await makeGallery();
      const first = galleryIcons[0];
      const button = cards(el)[0].querySelector(
        '.copy-btn',
      ) as HTMLButtonElement;

      button.click();
      await vi.waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
      expect(writeText).toHaveBeenCalledWith(first.importLine);

      await el.updateComplete;
      expect(button.textContent?.trim()).toBe('Copied!');
    });

    test('a failed write is reported and leaves the button as it was', async () => {
      writeText.mockRejectedValue(new Error('denied'));
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const el = await makeGallery();
      const button = cards(el)[0].querySelector(
        '.copy-btn',
      ) as HTMLButtonElement;

      button.click();
      await vi.waitFor(() => expect(warn).toHaveBeenCalled());
      await el.updateComplete;
      expect(button.textContent?.trim()).toBe('Copy');
    });
  });
});
