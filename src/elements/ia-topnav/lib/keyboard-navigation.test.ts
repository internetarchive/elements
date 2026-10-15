import { fixture, fixtureCleanup } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { afterEach, describe, expect, test, vi } from 'vitest';

import '../ia-topnav-wayback-slider';
import KeyboardNavigation from './keyboard-navigation';

afterEach(() => {
  fixtureCleanup();
  vi.restoreAllMocks();
});

const menuFixture = () =>
  fixture<HTMLDivElement>(html`
    <div>
      <a href="#one" id="one">One</a>
      <button id="two">Two</button>
      <button id="disabled" disabled>Disabled</button>
      <a href="#hidden" id="hidden" aria-hidden="true">Hidden</a>
      <a href="#skipped" id="skipped" tabindex="-1">Skipped</a>
      <input id="three" />
    </div>
  `);

const keydown = (target: HTMLElement, key: string, shiftKey = false) => {
  const event = new KeyboardEvent('keydown', {
    key,
    shiftKey,
    bubbles: true,
    composed: true,
    cancelable: true,
  });
  target.dispatchEvent(event);
  return event;
};

const focusedId = () => (document.activeElement as HTMLElement | null)?.id;

describe('KeyboardNavigation', () => {
  test('collects only the focusable elements, in document order', async () => {
    const container = await menuFixture();
    const nav = new KeyboardNavigation(container, 'texts');

    expect(nav.focusableElements.map((el) => el.id)).to.deep.equal([
      'one',
      'two',
      'three',
    ]);
  });

  test('focuses the first element on creation', async () => {
    const container = await menuFixture();
    new KeyboardNavigation(container, 'texts');

    expect(focusedId()).to.equal('one');
  });

  test('leaves focus alone on creation for the search menu', async () => {
    const container = await menuFixture();
    new KeyboardNavigation(container, 'search');

    expect(focusedId()).to.not.equal('one');
  });

  test('moves forward on ArrowDown and ArrowRight, wrapping at the end', async () => {
    const container = await menuFixture();
    const nav = new KeyboardNavigation(container, 'texts');
    container.addEventListener('keydown', nav.handleKeyDown);

    const event = keydown(container, 'ArrowDown');
    expect(focusedId()).to.equal('two');
    expect(event.defaultPrevented).to.be.true;

    keydown(container, 'ArrowRight');
    expect(focusedId()).to.equal('three');

    keydown(container, 'ArrowDown');
    expect(focusedId()).to.equal('one');
  });

  test('moves back on ArrowUp and ArrowLeft, wrapping at the start', async () => {
    const container = await menuFixture();
    const nav = new KeyboardNavigation(container, 'texts');
    container.addEventListener('keydown', nav.handleKeyDown);

    keydown(container, 'ArrowUp');
    expect(focusedId()).to.equal('three');

    keydown(container, 'ArrowLeft');
    expect(focusedId()).to.equal('two');
  });

  test('ignores keys pressed inside a text field', async () => {
    const container = await menuFixture();
    const nav = new KeyboardNavigation(container, 'texts');
    container.addEventListener('keydown', nav.handleKeyDown);
    const input = container.querySelector<HTMLInputElement>('#three');
    input?.focus();

    const event = keydown(input as HTMLInputElement, 'ArrowDown');

    expect(focusedId()).to.equal('three');
    expect(event.defaultPrevented).to.be.false;
  });

  test('hands Tab off to the next menu and keeps focus from moving on', async () => {
    const container = await menuFixture();
    const nav = new KeyboardNavigation(container, 'texts');
    container.addEventListener('keydown', nav.handleKeyDown);
    const handoff = vi.fn();
    container.addEventListener('focusToOtherMenuItem', (e) =>
      handoff((e as CustomEvent).detail),
    );

    const event = keydown(container, 'Tab');

    expect(handoff).toHaveBeenCalledExactlyOnceWith({
      mediatype: 'texts',
      moveTo: 'next',
    });
    expect(event.defaultPrevented).to.be.true;
  });

  test('hands Shift+Tab off to the previous menu', async () => {
    const container = await menuFixture();
    const nav = new KeyboardNavigation(container, 'texts');
    container.addEventListener('keydown', nav.handleKeyDown);
    const handoff = vi.fn();
    container.addEventListener('focusToOtherMenuItem', (e) =>
      handoff((e as CustomEvent).detail),
    );

    keydown(container, 'Tab', true);

    expect(handoff).toHaveBeenCalledExactlyOnceWith({
      mediatype: 'texts',
      moveTo: 'prev',
    });
  });

  test('lets Tab through in the search menu', async () => {
    const container = await menuFixture();
    const nav = new KeyboardNavigation(container, 'search');
    container.addEventListener('keydown', nav.handleKeyDown);

    const event = keydown(container, 'Tab');

    expect(event.defaultPrevented).to.be.false;
  });

  test('reaches into the wayback slider shadow roots for the web menu', async () => {
    const container = await fixture<HTMLDivElement>(html`
      <div><ia-topnav-wayback-slider></ia-topnav-wayback-slider></div>
    `);
    const slider = container.querySelector('ia-topnav-wayback-slider');
    await (slider as unknown as { updateComplete: Promise<unknown> })
      .updateComplete;

    const nav = new KeyboardNavigation(
      slider?.parentElement as HTMLElement,
      'web',
    );
    const ids = nav.focusableElements.map((el) => el.id).filter(Boolean);

    // The wayback search input comes first, the save page input last.
    expect(ids[0]).to.equal('url');
    expect(ids[ids.length - 1]).to.equal('url_preload');
  });
});
