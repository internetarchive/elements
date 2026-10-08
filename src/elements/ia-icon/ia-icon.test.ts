import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { IAIcon } from './ia-icon';
import './ia-icon';

const iconSrc = 'https://archive.org/images/delete.svg';

describe('IA Icon', () => {
  test('renders a basic icon', async () => {
    const el = await fixture<IAIcon>(html`<ia-icon src=${iconSrc}></ia-icon>`);

    const icon = el.shadowRoot?.querySelector('.icon');
    expect(icon).to.exist;
  });

  test('renders nothing without a source', async () => {
    const el = await fixture<IAIcon>(html`<ia-icon></ia-icon>`);

    const icon = el.shadowRoot?.querySelector('.icon');
    expect(icon).to.not.exist;
  });

  test('does not render the fallback version if browser supports masking', async () => {
    const el = await fixture<IAIcon>(html`<ia-icon src=${iconSrc}></ia-icon>`);

    const maskedIcon = el.shadowRoot?.querySelector('.icon.masked');
    const fallbackIcon = el.shadowRoot?.querySelector('.icon.fallback');
    expect(maskedIcon).to.exist;
    expect(maskedIcon?.computedStyleMap().get('display')?.toString()).to.equal(
      'block',
    );
    expect(fallbackIcon).to.exist;
    expect(
      fallbackIcon?.computedStyleMap().get('display')?.toString(),
    ).to.equal('none');
  });

  test('inherits current color by default', async () => {
    const el = await fixture<IAIcon>(html`
      <ia-icon style="color: rgb(255, 0, 0)" src=${iconSrc}></ia-icon>
    `);

    const icon = el.shadowRoot?.querySelector('.icon');
    const color = icon?.computedStyleMap().get('background')?.toString();
    expect(color).to.include('rgb(255, 0, 0)');
  });

  test('uses a custom color if desired', async () => {
    const el = await fixture<IAIcon>(html`
      <ia-icon
        style="color: rgb(255, 0, 0); --ia-theme-icon-color: rgb(0, 0, 0);"
        src=${iconSrc}
      ></ia-icon>
    `);

    const icon = el.shadowRoot?.querySelector('.icon');
    const color = icon?.computedStyleMap().get('background')?.toString();
    expect(color).to.include('rgb(0, 0, 0)');
  });

  test('uses the default icon size when none is given', async () => {
    const el = await fixture<IAIcon>(html`<ia-icon src=${iconSrc}></ia-icon>`);

    const icon = el.shadowRoot?.querySelector('.icon');
    const height = icon?.computedStyleMap().get('height')?.toString();
    const width = icon?.computedStyleMap().get('width')?.toString();
    // The theme default is 1.25rem, and the root size for the test is 16px
    expect(height).to.include('20px');
    expect(width).to.include('20px');
  });

  test('stays square when given a custom width', async () => {
    const el = await fixture<IAIcon>(html`
      <ia-icon style="--ia-theme-icon-width: 10px" src=${iconSrc}></ia-icon>
    `);

    const icon = el.shadowRoot?.querySelector('.icon');
    const height = icon?.computedStyleMap().get('height')?.toString();
    const width = icon?.computedStyleMap().get('width')?.toString();
    expect(height).to.include('10px');
    expect(width).to.include('10px');
  });

  test('uses a custom height on its own if desired', async () => {
    const el = await fixture<IAIcon>(html`
      <ia-icon style="--ia-theme-icon-height: 10px" src=${iconSrc}></ia-icon>
    `);

    const icon = el.shadowRoot?.querySelector('.icon');
    const height = icon?.computedStyleMap().get('height')?.toString();
    const width = icon?.computedStyleMap().get('width')?.toString();
    expect(height).to.include('10px');
    expect(width).to.include('20px');
  });

  test('fits the icon inside the box when it is not square', async () => {
    const el = await fixture<IAIcon>(html`
      <ia-icon
        style="--ia-theme-icon-width: 5rem; --ia-theme-icon-height: 1.25rem;"
        src=${iconSrc}
      ></ia-icon>
    `);

    const icon = el.shadowRoot?.querySelector('.icon.masked');
    const styles = icon?.computedStyleMap();
    expect(styles?.get('mask-size')?.toString()).to.equal('contain');
    expect(styles?.get('mask-position')?.toString()).to.contain('50%');
  });

  test('uses a transition if desired', async () => {
    const el = await fixture<IAIcon>(html`
      <ia-icon
        style="--ia-theme-icon-transition: background-color 0.5s;"
        src=${iconSrc}
      ></ia-icon>
    `);

    const icon = el.shadowRoot?.querySelector('.icon');
    const transition = icon?.computedStyleMap().get('transition')?.toString();
    expect(transition).to.include('background-color 0.5s');
  });

  test('renders a fallback image with the source', async () => {
    const el = await fixture<IAIcon>(html`<ia-icon src=${iconSrc}></ia-icon>`);

    const img = el.shadowRoot?.querySelector<HTMLImageElement>('img.fallback');
    expect(img?.getAttribute('src')).to.equal(iconSrc);
    expect(img?.getAttribute('alt')).to.equal('');
  });

  test('re-renders when the source changes', async () => {
    const el = await fixture<IAIcon>(html`<ia-icon src=${iconSrc}></ia-icon>`);
    el.src = '';
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('.icon')).to.not.exist;

    el.src = 'https://archive.org/images/other.svg';
    await el.updateComplete;
    const masked = el.shadowRoot?.querySelector<HTMLElement>('.icon.masked');
    expect(masked?.style.cssText).to.include('other.svg');
  });

  test('applies the filter hook to the fallback image', async () => {
    const el = await fixture<IAIcon>(html`
      <ia-icon
        style="--ia-theme-icon-filter: grayscale(1);"
        src=${iconSrc}
      ></ia-icon>
    `);

    const fallback = el.shadowRoot?.querySelector('.icon.fallback');
    expect(getComputedStyle(fallback as Element).filter).to.include(
      'grayscale(1)',
    );
  });

  test('keeps quotes and apostrophes in a data URI inside the mask', async () => {
    const svg = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><path d="M0 0h1v1z"/></svg>`;
    const el = await fixture<IAIcon>(html`<ia-icon .src=${svg}></ia-icon>`);

    const masked = el.shadowRoot?.querySelector<HTMLElement>('.icon.masked');
    expect(masked?.style.maskImage || masked?.style.webkitMaskImage).to.match(
      /^url\(/,
    );
    expect(masked?.style.length).to.equal(1);
  });

  describe('hostile sources', () => {
    const hostile: Record<string, string> = {
      'a quote breakout with extra declarations':
        "x'); background: red; x:url('",
      'a double quote breakout': 'x"); background: red; x:url("',
      'a trailing backslash': 'https://archive.org/a.svg\\',
      'a newline': 'https://archive.org/a.svg\nbackground: red',
      'a carriage return and form feed':
        'https://archive.org/a.svg\r\fbackground: red',
      'a closing parenthesis': 'https://archive.org/a).svg',
      'a semicolon and braces': 'https://archive.org/a.svg;}{background:red',
    };

    for (const [name, src] of Object.entries(hostile)) {
      test(`keeps ${name} inside a single url()`, async () => {
        const el = await fixture<IAIcon>(html`<ia-icon .src=${src}></ia-icon>`);

        const masked =
          el.shadowRoot?.querySelector<HTMLElement>('.icon.masked');
        const style = masked?.style as CSSStyleDeclaration;
        expect(style.length).to.equal(1);
        expect(style.background).to.equal('');
        expect(style.backgroundColor).to.equal('');
        const mask = style.maskImage || style.webkitMaskImage;
        expect(mask).to.match(/^url\(/);
        expect(mask.match(/url\(/g)).to.have.length(1);
        expect(masked?.getAttribute('style')).to.not.include('background');
      });
    }

    test('does not recolor the icon when the source tries to', async () => {
      const el = await fixture<IAIcon>(html`
        <ia-icon
          style="color: rgb(0, 128, 0)"
          .src=${"x'); background: red; x:url('"}
        ></ia-icon>
      `);

      const masked = el.shadowRoot?.querySelector('.icon.masked');
      const color = masked?.computedStyleMap().get('background')?.toString();
      expect(color).to.include('rgb(0, 128, 0)');
    });
  });
});
