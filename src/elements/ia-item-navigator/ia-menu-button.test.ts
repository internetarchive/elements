import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test, vi } from 'vitest';

import { IAMenuButton } from './ia-menu-button';
import './ia-menu-button';
import { maskedIcon } from './masked-icon';

describe('IAMenuButton', () => {
  test('renders a <button> by default', async () => {
    const el = await fixture<IAMenuButton>(
      html`<ia-menu-button label="Contents"></ia-menu-button>`,
    );
    expect(el.shadowRoot?.querySelector('button.menu-item')).to.exist;
    expect(el.shadowRoot?.querySelector('a')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.label')?.textContent).to.contain(
      'Contents',
    );
  });

  test('renders an <a> when an href is supplied', async () => {
    const el = await fixture<IAMenuButton>(
      html`<ia-menu-button href="/foo"></ia-menu-button>`,
    );
    const link = el.shadowRoot?.querySelector('a.menu-item');
    expect(link).to.exist;
    expect(link?.getAttribute('href')).to.equal('/foo');
  });

  test('clicking emits a composed menuTypeSelected event carrying the id', async () => {
    const el = await fixture<IAMenuButton>(
      html`<ia-menu-button buttonId="share"></ia-menu-button>`,
    );
    const listener = vi.fn();
    el.addEventListener('menuTypeSelected', listener);

    (
      el.shadowRoot?.querySelector('button.menu-item') as HTMLButtonElement
    ).click();

    expect(listener).toHaveBeenCalledOnce();
    const event = listener.mock.calls[0][0] as CustomEvent;
    expect(event.detail.id).to.equal('share');
    expect(event.composed).to.equal(true);
    expect(event.bubbles).to.equal(true);
  });

  test('reflects selection through aria-expanded and the active icon class', async () => {
    const el = await fixture<IAMenuButton>(
      html`<ia-menu-button selected></ia-menu-button>`,
    );
    expect(el.iconClass).to.equal('active');
    expect(
      el.shadowRoot?.querySelector('.menu-item')?.getAttribute('aria-expanded'),
    ).to.equal('true');
  });

  test('paints the icon with the inactive color until it is selected', async () => {
    const el = await fixture<IAMenuButton>(
      html`<ia-menu-button
        .icon=${maskedIcon('/glyph.svg')}
        style="--item-navigator-icon-inactive-color: rgb(9, 9, 9);
               --item-navigator-icon-active-color: rgb(7, 7, 7)"
      ></ia-menu-button>`,
    );
    const icon = () => el.shadowRoot?.querySelector('.ia-icon') as HTMLElement;

    expect(getComputedStyle(icon()).backgroundColor).to.equal('rgb(9, 9, 9)');

    el.selected = true;
    await el.updateComplete;
    expect(getComputedStyle(icon()).backgroundColor).to.equal('rgb(7, 7, 7)');
  });

  test('a followable link does not intercept the click', async () => {
    const el = await fixture<IAMenuButton>(
      html`<ia-menu-button href="/foo" followable></ia-menu-button>`,
    );
    const listener = vi.fn();
    el.addEventListener('menuTypeSelected', listener);
    // Stop the real anchor navigation from reloading the test page; we only
    // care that the component itself didn't hijack the click.
    el.addEventListener('click', (e) => e.preventDefault());

    (el.shadowRoot?.querySelector('a.menu-item') as HTMLAnchorElement).click();

    expect(listener).not.toHaveBeenCalled();
  });
});
