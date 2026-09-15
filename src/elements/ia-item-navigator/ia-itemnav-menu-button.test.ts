import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test, vi } from 'vitest';

import { IAItemNavMenuButton } from './ia-itemnav-menu-button';
import './ia-itemnav-menu-button';
import { maskedIcon } from '@src/util/masked-icon';

describe('IAItemNavMenuButton', () => {
  test('renders a <button> by default', async () => {
    const el = await fixture<IAItemNavMenuButton>(
      html`<ia-itemnav-menu-button label="Contents"></ia-itemnav-menu-button>`,
    );
    expect(el.shadowRoot?.querySelector('button.menu-item')).to.exist;
    expect(el.shadowRoot?.querySelector('a')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.label')?.textContent).to.contain(
      'Contents',
    );
  });

  test('renders an <a> when an href is supplied', async () => {
    const el = await fixture<IAItemNavMenuButton>(
      html`<ia-itemnav-menu-button href="/foo"></ia-itemnav-menu-button>`,
    );
    const link = el.shadowRoot?.querySelector('a.menu-item');
    expect(link).to.exist;
    expect(link?.getAttribute('href')).to.equal('/foo');
  });

  test('clicking emits a composed menuTypeSelected event carrying the id', async () => {
    const el = await fixture<IAItemNavMenuButton>(
      html`<ia-itemnav-menu-button buttonId="share"></ia-itemnav-menu-button>`,
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
    const el = await fixture<IAItemNavMenuButton>(
      html`<ia-itemnav-menu-button selected></ia-itemnav-menu-button>`,
    );
    expect(el.iconClass).to.equal('active');
    expect(
      el.shadowRoot?.querySelector('.menu-item')?.getAttribute('aria-expanded'),
    ).to.equal('true');
  });

  test('paints the icon with the inactive color until it is selected', async () => {
    const el = await fixture<IAItemNavMenuButton>(
      html`<ia-itemnav-menu-button
        .icon=${maskedIcon('/glyph.svg')}
        style="--item-navigator-icon-inactive-color: rgb(9, 9, 9);
               --item-navigator-icon-active-color: rgb(7, 7, 7)"
      ></ia-itemnav-menu-button>`,
    );
    const icon = () => el.shadowRoot?.querySelector('.ia-icon') as HTMLElement;

    expect(getComputedStyle(icon()).backgroundColor).to.equal('rgb(9, 9, 9)');

    el.selected = true;
    await el.updateComplete;
    expect(getComputedStyle(icon()).backgroundColor).to.equal('rgb(7, 7, 7)');
  });

  test("only the open entry's icon lifts above the panel", async () => {
    const el = await fixture<IAItemNavMenuButton>(
      html`<ia-itemnav-menu-button
        .icon=${maskedIcon('/glyph.svg')}
      ></ia-itemnav-menu-button>`,
    );
    const icon = () => el.shadowRoot?.querySelector('.icon') as HTMLElement;

    // Closed entries have no background, so a panel sliding past them must
    // pass in front rather than behind.
    expect(getComputedStyle(icon()).zIndex).to.equal('auto');

    el.selected = true;
    await el.updateComplete;
    // The open entry borrows the panel's background and rounds into it, so it
    // has to sit above the panel for the two to read as one shape.
    expect(getComputedStyle(icon()).zIndex).to.equal('2');
  });

  test('a followable link does not intercept the click', async () => {
    const el = await fixture<IAItemNavMenuButton>(
      html`<ia-itemnav-menu-button
        href="/foo"
        followable
      ></ia-itemnav-menu-button>`,
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
