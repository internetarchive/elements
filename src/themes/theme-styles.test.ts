import { fixture } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test } from 'vitest';
import { html, LitElement } from 'lit';
import { customElement } from '@src/util/custom-element';

import themeStyles from './theme-styles';

@customElement('theme-styles-test-element')
class ThemeStylesTestElement extends LitElement {
  static styles = themeStyles;

  render() {
    return html`<div class="ia-inverse"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'theme-styles-test-element': ThemeStylesTestElement;
  }
}

const read = (el: Element, name: string) =>
  getComputedStyle(el).getPropertyValue(name).trim();

describe('themeStyles', () => {
  afterEach(() => {
    document.documentElement.style.removeProperty(
      '--ia-color-palette-gray-850',
    );
    document.documentElement.style.removeProperty('--ia-color-text-link');
  });

  test('defaults each alias to its token value', async () => {
    const el = await fixture<ThemeStylesTestElement>(
      html`<theme-styles-test-element></theme-styles-test-element>`,
    );
    expect(read(el, '--ia-color-text-primary--')).to.equal('#2c2c2c');
    expect(read(el, '--primary-text-color')).to.equal('#2c2c2c');
    expect(read(el, '--link-color')).to.equal('#3a4fd6');
  });

  test('picks up a token set on the page', async () => {
    document.documentElement.style.setProperty('--ia-color-text-link', 'red');
    const el = await fixture<ThemeStylesTestElement>(
      html`<theme-styles-test-element></theme-styles-test-element>`,
    );
    expect(read(el, '--link-color')).to.equal('red');
  });

  test('follows a palette value through the roles that point at it', async () => {
    document.documentElement.style.setProperty(
      '--ia-color-palette-gray-850',
      'black',
    );
    const el = await fixture<ThemeStylesTestElement>(
      html`<theme-styles-test-element></theme-styles-test-element>`,
    );
    expect(read(el, '--ia-color-text-primary--')).to.equal('black');
  });

  test('lets --ia-theme-* override the token', async () => {
    const el = await fixture<ThemeStylesTestElement>(
      html`<theme-styles-test-element
        style="--ia-theme-link-color: green"
      ></theme-styles-test-element>`,
    );
    expect(read(el, '--link-color')).to.equal('green');
  });

  test('re-points text colors inside .ia-inverse', async () => {
    const el = await fixture<ThemeStylesTestElement>(
      html`<theme-styles-test-element></theme-styles-test-element>`,
    );
    const inner = el.shadowRoot!.querySelector('.ia-inverse')!;
    expect(read(inner, '--ia-color-text-primary--')).to.equal('#ffffff');
  });

  test('re-points text colors on the host with the ia-inverse class', async () => {
    const el = await fixture<ThemeStylesTestElement>(
      html`<theme-styles-test-element
        class="ia-inverse"
      ></theme-styles-test-element>`,
    );
    expect(read(el, '--ia-color-text-primary--')).to.equal('#ffffff');
  });

  test('sizes the default button for a 10px root', async () => {
    const el = await fixture<ThemeStylesTestElement>(
      html`<theme-styles-test-element
        style="display: block; height: var(--button-height)"
      ></theme-styles-test-element>`,
    );
    expect(el.getBoundingClientRect().height).to.equal(36);
  });
});
