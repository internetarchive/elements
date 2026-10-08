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
        style="--ia-icon-transition: background-color 0.5s;"
        src=${iconSrc}
      ></ia-icon>
    `);

    const icon = el.shadowRoot?.querySelector('.icon');
    const transition = icon?.computedStyleMap().get('transition')?.toString();
    expect(transition).to.include('background-color 0.5s');
  });
});
