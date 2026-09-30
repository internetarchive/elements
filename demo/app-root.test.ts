import { fixture, fixtureCleanup, waitUntil } from '@open-wc/testing-helpers';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

// The demo's stylesheet, applied only by the tests that need the real layout.
import demoCss from './index.css?raw';

import type { AppRoot } from './app-root';
import { NARROW_VIEWPORT } from './app-root';
import './app-root';

/**
 * Sets the hash without firing hashchange, so a fixture created afterwards
 * picks it up as its initial view.
 */
function setHash(hash: string) {
  window.history.replaceState(null, '', hash);
}

function clearHash() {
  window.history.replaceState(
    null,
    '',
    window.location.pathname + window.location.search,
  );
}

function anchorIds(el: AppRoot): string[] {
  return Array.from(el.querySelectorAll('.ia-anchor')).map(
    (anchor) => anchor.id,
  );
}

/** The sidebar link the scroll spy currently marks, by href. */
function inViewHref(el: AppRoot): string | null {
  const marked = el.querySelector('.ia-elem-link.in-view');
  return marked ? marked.getAttribute('href') : null;
}

function scrollToAnchor(el: AppRoot, id: string) {
  el.querySelector(`#${id}`)?.scrollIntoView();
}

function navToggle(el: AppRoot): HTMLButtonElement {
  return el.querySelector('#ia-nav-toggle') as HTMLButtonElement;
}

function sidebar(el: AppRoot): HTMLElement {
  return el.querySelector('#ia-sidebar') as HTMLElement;
}

type MediaListener = (event: MediaQueryListEvent) => void;

// Taken before any test spies on it, so a stub installed over another stub
// still passes other queries through to the browser.
const realMatchMedia = window.matchMedia.bind(window);

/**
 * Pins the demo's narrow-viewport query, and hands back a way to flip it the
 * way a real resize would. Install it before the fixture, since the opening
 * state is read as the element is built. Every other query goes through to
 * the real matchMedia, so nothing a story asks about changes.
 */
function stubNarrowViewport(narrow: boolean) {
  const real = realMatchMedia;
  const listeners = new Set<MediaListener>();
  let matches = narrow;

  vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => {
    if (query !== NARROW_VIEWPORT) return real(query);
    return {
      media: query,
      get matches() {
        return matches;
      },
      addEventListener(
        _type: string,
        listener: MediaListener,
        options?: AddEventListenerOptions,
      ) {
        listeners.add(listener);
        options?.signal?.addEventListener('abort', () =>
          listeners.delete(listener),
        );
      },
      removeEventListener(_type: string, listener: MediaListener) {
        listeners.delete(listener);
      },
    } as unknown as MediaQueryList;
  });

  return {
    /** Crosses the breakpoint, as dragging a window narrower would. */
    set(next: boolean) {
      matches = next;
      for (const listener of listeners) {
        listener({
          matches: next,
          media: NARROW_VIEWPORT,
        } as MediaQueryListEvent);
      }
    },
  };
}

/**
 * Waits for every story to have settled and the page to have grown past the
 * viewport, then parks the scroll at the top with the spy marking the first
 * element. Nothing about the scroll spy holds before that.
 *
 * Each story requests an update as it lands, and any still in flight would
 * rebuild the scroll spy on its own, hiding whether the thing under test
 * rebuilt it. A story that fails to import keeps a message too, so this waits
 * on the console as much as on the clock. The timeout covers loading all the
 * modules cold, which is what happens when one of these tests runs on its own.
 */
async function settleScrollSpy(el: AppRoot, firstId: string) {
  await waitUntil(
    () => el.querySelectorAll('.ia-story-message').length === 0,
    'the stories never all settled; check the console for one that failed to import',
    { timeout: 5000 },
  );
  await el.updateComplete;

  // Loaded stories are also what make the page taller than the viewport.
  // Without that, scrolling is a no-op and the assertions that follow would
  // blame the scroll spy for a page that simply never moved.
  await waitUntil(
    () => document.documentElement.scrollHeight > window.innerHeight,
    'the page never grew tall enough to scroll',
  );

  // The otp-input story puts focus in its first field as it loads, which
  // scrolls the page down to it. Start from the top instead, so the spy has
  // the first element to mark.
  window.scrollTo({ top: 0 });
  await waitUntil(
    () => inViewHref(el) === `#${firstId}`,
    'the scroll spy never marked the first element',
  );
}

const appRoot = () => fixture<AppRoot>(html`<app-root></app-root>`);

function barButton(el: AppRoot, which: 'prev' | 'name' | 'next') {
  return el.querySelector(`#ia-bar-${which}`) as HTMLButtonElement;
}

function picker(el: AppRoot): HTMLDialogElement {
  return el.querySelector('#ia-picker') as HTMLDialogElement;
}

/** The picker's element entries, in order, leaving out "Show all elements". */
function pickerEntries(el: AppRoot): HTMLAnchorElement[] {
  return Array.from(
    el.querySelectorAll<HTMLAnchorElement>(
      '#ia-picker .ia-pick:not(.ia-pick-all)',
    ),
  );
}

/** Every element's anchor id, in the order the bar steps through them. */
function entryIds(el: AppRoot): string[] {
  return pickerEntries(el).map((link) =>
    (link.getAttribute('href') ?? '').slice(1),
  );
}

/**
 * Waits for the picker's close to land. A dialog fires `close` as a task of
 * its own after `close()` returns, and that event is where the demo tidies up.
 */
async function pickerClosed(el: AppRoot) {
  await waitUntil(
    () => barButton(el, 'name').getAttribute('aria-expanded') === 'false',
    'the picker never finished closing',
  );
}

async function openPicker(el: AppRoot) {
  barButton(el, 'name').click();
  await el.updateComplete;
  expect(picker(el).open, 'the picker never opened').to.be.true;
}

/** Applies the demo's real stylesheet for one test, returning its remover. */
function applyDemoCss(): () => void {
  const style = document.createElement('style');
  style.textContent = demoCss;
  document.head.append(style);
  return () => style.remove();
}

describe('AppRoot', () => {
  // The desktop layout unless a test says otherwise, since the test browser's
  // own width would otherwise decide which layout every test gets.
  beforeEach(() => {
    stubNarrowViewport(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fixtureCleanup();
    clearHash();
    // Tests that scroll would otherwise leave the next one part-way down.
    window.scrollTo({ top: 0 });
  });

  describe('all-elements view', () => {
    test('renders every element when there is no hash', async () => {
      const el = await appRoot();

      const ids = anchorIds(el);
      expect(ids.length).to.be.greaterThan(1);
      expect(ids).to.include('elem-ia-button');
    });

    test('marks the all-elements button as the current view', async () => {
      const el = await appRoot();

      const allLink = el.querySelector('#ia-all-link') as HTMLElement;
      expect(allLink.classList.contains('current')).to.be.true;
      expect(allLink.getAttribute('aria-current')).to.equal('page');
    });

    test('marks the scrolled-to element in-view rather than current', async () => {
      const el = await appRoot();

      await waitUntil(
        () => el.querySelector('.ia-elem-link.in-view'),
        'the scroll spy never marked an element',
      );

      const inView = el.querySelectorAll('.ia-elem-link.in-view');
      expect(inView.length).to.equal(1);
      expect(inView[0].getAttribute('aria-current')).to.equal('location');
      // `current` stays reserved for the view you're on, which here is the
      // all-elements button, so the two never wear the same treatment.
      expect(el.querySelectorAll('.ia-elem-link.current').length).to.equal(0);
    });

    test('falls back to every element when the hash names an unknown one', async () => {
      setHash('#elem-not-a-real-element');
      const el = await appRoot();

      expect(anchorIds(el).length).to.be.greaterThan(1);
    });

    test('falls back to every element for a hash without the elem- prefix', async () => {
      setHash('#some-other-anchor');
      const el = await appRoot();

      expect(anchorIds(el).length).to.be.greaterThan(1);
    });
  });

  describe('focused view', () => {
    test('renders only the element named in the hash', async () => {
      setHash('#elem-ia-button');
      const el = await appRoot();

      expect(anchorIds(el)).to.deep.equal(['elem-ia-button']);
    });

    test('loads the focused story and lets it upgrade', async () => {
      setHash('#elem-ia-button');
      const el = await appRoot();

      await waitUntil(
        () => el.querySelector('ia-button-story'),
        '<ia-button-story> was never rendered',
      );
      expect(customElements.get('ia-button-story')).to.exist;
    });

    test('marks only the focused element as the current view', async () => {
      setHash('#elem-ia-button');
      const el = await appRoot();

      const current = el.querySelectorAll('#ia-sidebar .ia-elem-link.current');
      expect(current.length).to.equal(1);
      expect(current[0].getAttribute('href')).to.equal('#elem-ia-button');
      expect(current[0].getAttribute('aria-current')).to.equal('page');
      // Nothing is merely scrolled to when only one element is on the page.
      expect(el.querySelectorAll('.ia-elem-link.in-view').length).to.equal(0);
    });

    test('does not mark the all-elements button', async () => {
      setHash('#elem-ia-button');
      const el = await appRoot();

      const allLink = el.querySelector('#ia-all-link') as HTMLElement;
      expect(allLink.classList.contains('current')).to.be.false;
      expect(allLink.getAttribute('aria-current')).to.equal('false');
    });
  });

  describe('navigation', () => {
    test('narrows to one element and back again as the hash changes', async () => {
      const el = await appRoot();
      expect(anchorIds(el).length).to.be.greaterThan(1);

      window.location.hash = '#elem-ia-button';
      await waitUntil(
        () => anchorIds(el).length === 1,
        'never narrowed to the focused element',
      );
      expect(anchorIds(el)).to.deep.equal(['elem-ia-button']);

      window.location.hash = '';
      await waitUntil(
        () => anchorIds(el).length > 1,
        'never returned to the all-elements view',
      );
    });

    test('keeps following the hash after a disconnect and reconnect', async () => {
      const el = await appRoot();
      const parent = el.parentElement as HTMLElement;

      parent.removeChild(el);
      parent.appendChild(el);
      await el.updateComplete;

      window.location.hash = '#elem-ia-button';
      await waitUntil(
        () => anchorIds(el).length === 1,
        'hash navigation stopped working after reconnecting',
      );
      expect(anchorIds(el)).to.deep.equal(['elem-ia-button']);
    });

    test('keeps the scroll spy working after reconnecting with no hash change', async () => {
      const el = await appRoot();
      const parent = el.parentElement as HTMLElement;
      const ids = anchorIds(el);
      const firstId = ids[0];

      // Every story has to have settled before the disconnect below.
      await settleScrollSpy(el, firstId);

      // Move the highlight off the first element, so a spy that comes back
      // dead is distinguishable from one that never had to do anything. How
      // far down the last anchor gets depends on the page height, so this only
      // asserts the highlight moved, not where it landed.
      scrollToAnchor(el, ids[ids.length - 1]);
      expect(window.scrollY, 'the page did not scroll').to.be.greaterThan(0);
      await waitUntil(
        () => inViewHref(el) !== `#${firstId}`,
        'the scroll spy never followed the scroll away from the first element',
      );

      parent.removeChild(el);
      parent.appendChild(el);
      await el.updateComplete;

      window.scrollTo({ top: 0 });
      await waitUntil(
        () => inViewHref(el) === `#${firstId}`,
        'the scroll spy stopped following the scroll after reconnecting',
      );
    });

    test('picks up a hash that changed while it was detached', async () => {
      const el = await appRoot();
      const parent = el.parentElement as HTMLElement;

      parent.removeChild(el);
      setHash('#elem-ia-button');
      parent.appendChild(el);
      await el.updateComplete;

      expect(anchorIds(el)).to.deep.equal(['elem-ia-button']);
    });

    test('sidebar links address each element by hash', async () => {
      const el = await appRoot();

      const hrefs = Array.from(el.querySelectorAll('#ia-sidebar a')).map(
        (link) => link.getAttribute('href'),
      );
      expect(hrefs[0]).to.equal('#');
      expect(hrefs).to.include('#elem-ia-button');
    });
  });

  describe('sidebar toggle', () => {
    test('starts with the sidebar up on a wide viewport', async () => {
      stubNarrowViewport(false);
      const el = await appRoot();

      expect(sidebar(el).hidden).to.be.false;
      expect(navToggle(el).getAttribute('aria-expanded')).to.equal('true');
      expect(navToggle(el).textContent?.trim()).to.equal('Hide nav');
    });

    test('names the sidebar it controls', async () => {
      stubNarrowViewport(false);
      const el = await appRoot();

      expect(navToggle(el).getAttribute('aria-controls')).to.equal(
        'ia-sidebar',
      );
      expect(sidebar(el).id).to.equal('ia-sidebar');
    });

    test('hides the sidebar, and brings it back, as it is pressed', async () => {
      stubNarrowViewport(false);
      const el = await appRoot();

      navToggle(el).click();
      await el.updateComplete;
      expect(sidebar(el).hidden).to.be.true;
      expect(navToggle(el).getAttribute('aria-expanded')).to.equal('false');

      navToggle(el).click();
      await el.updateComplete;
      expect(sidebar(el).hidden).to.be.false;
      expect(navToggle(el).getAttribute('aria-expanded')).to.equal('true');
    });

    test('takes the hidden sidebar out of the page, not just out of sight', async () => {
      stubNarrowViewport(false);
      const el = await appRoot();
      navToggle(el).click();
      await el.updateComplete;

      // Offscreening it instead would leave every link in the tab order.
      expect(getComputedStyle(sidebar(el)).display).to.equal('none');

      const link = el.querySelector('#ia-all-link') as HTMLElement;
      link.focus();
      expect(document.activeElement).to.not.equal(link);
    });

    test('keeps focus out of the sidebar as it is hidden', async () => {
      stubNarrowViewport(false);
      const el = await appRoot();

      const link = el.querySelector('#ia-sidebar .ia-elem-link') as HTMLElement;
      link.focus();
      expect(document.activeElement).to.equal(link);

      navToggle(el).click();
      await el.updateComplete;

      // Leaving it on the link would put focus on a `display: none` element,
      // which the browser drops to the body.
      expect(document.activeElement).to.equal(navToggle(el));
      expect(sidebar(el).hidden).to.be.true;
    });

    test('leaves the sidebar up after a link is picked on a wide viewport', async () => {
      stubNarrowViewport(false);
      const el = await appRoot();

      const link = el.querySelector('#ia-sidebar .ia-elem-link') as HTMLElement;
      link.click();
      await el.updateComplete;

      expect(sidebar(el).hidden).to.be.false;
    });

    test('follows the viewport until the toggle has been used', async () => {
      const viewport = stubNarrowViewport(false);
      const el = await appRoot();
      expect(sidebar(el).hidden).to.be.false;

      // Narrow, the phone layout takes over and the sidebar goes altogether.
      viewport.set(true);
      await el.updateComplete;
      expect(el.querySelector('#ia-sidebar')).to.not.exist;

      viewport.set(false);
      await el.updateComplete;
      expect(sidebar(el).hidden).to.be.false;
    });

    test('stops following the viewport once the toggle has been used', async () => {
      const viewport = stubNarrowViewport(false);
      const el = await appRoot();

      navToggle(el).click();
      await el.updateComplete;
      expect(sidebar(el).hidden).to.be.true;

      // A window dragged narrow and back would otherwise undo the choice.
      viewport.set(true);
      await el.updateComplete;
      viewport.set(false);
      await el.updateComplete;

      expect(sidebar(el).hidden).to.be.true;
    });

    test('still follows the hash while the sidebar is hidden', async () => {
      stubNarrowViewport(false);
      const el = await appRoot();
      navToggle(el).click();
      await el.updateComplete;
      expect(sidebar(el).hidden).to.be.true;

      window.location.hash = '#elem-ia-button';
      await waitUntil(
        () => anchorIds(el).length === 1,
        'hash navigation stopped working with the sidebar hidden',
      );
      expect(anchorIds(el)).to.deep.equal(['elem-ia-button']);
    });

    test('keeps the scroll spy working once the sidebar is hidden', async () => {
      stubNarrowViewport(false);
      const el = await appRoot();
      const ids = anchorIds(el);
      const firstId = ids[0];

      await settleScrollSpy(el, firstId);

      navToggle(el).click();
      await el.updateComplete;
      expect(sidebar(el).hidden).to.be.true;

      // Hiding the sidebar reflows the content it is measuring against, and
      // the marks it writes stay in the hidden sidebar to be read back.
      scrollToAnchor(el, ids[ids.length - 1]);
      expect(window.scrollY, 'the page did not scroll').to.be.greaterThan(0);
      await waitUntil(
        () => inViewHref(el) !== `#${firstId}`,
        'the scroll spy stopped following the scroll after the nav was hidden',
      );
    });
  });

  describe('phone layout', () => {
    test('opens on the first element when there is no hash', async () => {
      stubNarrowViewport(true);
      const el = await appRoot();

      const [first] = entryIds(el);
      expect(anchorIds(el)).to.deep.equal([first]);
      // Written back, so the address bar can be shared as it stands.
      expect(window.location.hash).to.equal(`#${first}`);
    });

    test('keeps the element the hash names', async () => {
      setHash('#elem-ia-button');
      stubNarrowViewport(true);
      const el = await appRoot();

      expect(anchorIds(el)).to.deep.equal(['elem-ia-button']);
    });

    test('swaps the sidebar and its toggle for the bar and picker', async () => {
      stubNarrowViewport(true);
      const el = await appRoot();

      expect(el.querySelector('#ia-bar')).to.exist;
      expect(el.querySelector('#ia-picker')).to.exist;
      expect(el.querySelector('#ia-sidebar')).to.not.exist;
      expect(el.querySelector('#ia-nav-toggle')).to.not.exist;
    });

    test('renders neither the bar nor the picker on desktop', async () => {
      stubNarrowViewport(false);
      const el = await appRoot();

      expect(el.querySelector('#ia-bar')).to.not.exist;
      expect(el.querySelector('#ia-picker')).to.not.exist;
      expect(el.querySelector('#ia-sidebar')).to.exist;
    });

    test('steps forward to the next element through the hash', async () => {
      stubNarrowViewport(true);
      const el = await appRoot();
      const [first, second] = entryIds(el);
      expect(anchorIds(el)).to.deep.equal([first]);

      barButton(el, 'next').click();
      await waitUntil(
        () => window.location.hash === `#${second}`,
        'the next arrow never moved the hash',
      );
      await waitUntil(
        () => anchorIds(el)[0] === second,
        'the page never showed the next element',
      );
    });

    test('steps back to the previous element through the hash', async () => {
      stubNarrowViewport(true);
      const probe = await appRoot();
      const [first, second] = entryIds(probe);
      fixtureCleanup();

      setHash(`#${second}`);
      const el = await appRoot();
      barButton(el, 'prev').click();
      await waitUntil(
        () => window.location.hash === `#${first}`,
        'the previous arrow never moved the hash',
      );
    });

    test('disables back on the first element and forward on the last', async () => {
      stubNarrowViewport(true);
      const el = await appRoot();
      const ids = entryIds(el);
      const last = ids[ids.length - 1];

      expect(barButton(el, 'prev').getAttribute('aria-disabled')).to.equal(
        'true',
      );
      barButton(el, 'prev').click();
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(window.location.hash, "back didn't stay put").to.equal(
        `#${ids[0]}`,
      );

      window.location.hash = `#${last}`;
      await waitUntil(
        () => anchorIds(el)[0] === last,
        'never reached the last element',
      );
      expect(barButton(el, 'next').getAttribute('aria-disabled')).to.equal(
        'true',
      );
      expect(barButton(el, 'prev').getAttribute('aria-disabled')).to.equal(
        'false',
      );
      barButton(el, 'next').click();
      await new Promise((resolve) => setTimeout(resolve, 50));
      // No wrapping round to the first element.
      expect(window.location.hash, "forward didn't stay put").to.equal(
        `#${last}`,
      );
    });

    test('names the current element on the picker button', async () => {
      setHash('#elem-ia-button');
      stubNarrowViewport(true);
      const el = await appRoot();

      expect(barButton(el, 'name').getAttribute('aria-label')).to.equal(
        'Choose element, current: ia-button',
      );
    });

    test('opens the picker with focus on the current element', async () => {
      setHash('#elem-ia-button');
      stubNarrowViewport(true);
      const el = await appRoot();

      await openPicker(el);

      expect(barButton(el, 'name').getAttribute('aria-expanded')).to.equal(
        'true',
      );
      const active = document.activeElement;
      expect(active?.getAttribute('href')).to.equal('#elem-ia-button');
      // Not the search field, which would bring up a phone's keyboard.
      expect(active?.id).to.not.equal('ia-picker-search');
    });

    test('closes the picker from its close button and hands focus back', async () => {
      stubNarrowViewport(true);
      const el = await appRoot();
      await openPicker(el);

      (el.querySelector('#ia-picker-close') as HTMLButtonElement).click();
      await pickerClosed(el);

      expect(picker(el).open).to.be.false;
      expect(document.activeElement).to.equal(barButton(el, 'name'));
      expect(barButton(el, 'name').getAttribute('aria-expanded')).to.equal(
        'false',
      );
    });

    test('closes the picker on Escape', async () => {
      stubNarrowViewport(true);
      const el = await appRoot();
      await openPicker(el);

      // Escape on a modal dialog is a close request, and this is the same
      // request without the key: it runs the dialog's cancel and close steps.
      picker(el).requestClose();
      await pickerClosed(el);

      expect(picker(el).open).to.be.false;
      expect(document.activeElement).to.equal(barButton(el, 'name'));
    });

    test('closes the picker on a tap outside the sheet', async () => {
      stubNarrowViewport(true);
      const el = await appRoot();
      const hash = window.location.hash;
      await openPicker(el);

      // The browser dispatches a tap on the backdrop to the dialog itself.
      picker(el).dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await pickerClosed(el);

      expect(picker(el).open).to.be.false;
      expect(window.location.hash, 'a dismissal is not a pick').to.equal(hash);
    });

    test('leaves the picker open for a tap inside the sheet', async () => {
      stubNarrowViewport(true);
      const el = await appRoot();
      await openPicker(el);

      (el.querySelector('.ia-picker-head') as HTMLElement).click();
      await el.updateComplete;

      expect(picker(el).open).to.be.true;
    });

    test('filters the list by tag as you type', async () => {
      stubNarrowViewport(true);
      const el = await appRoot();
      await openPicker(el);
      const search = el.querySelector('#ia-picker-search') as HTMLInputElement;

      search.value = 'OTP';
      search.dispatchEvent(new Event('input'));
      await el.updateComplete;
      expect(
        pickerEntries(el).map((link) => link.textContent?.trim()),
      ).to.deep.equal(['<ia-otp-form>', '<ia-otp-input>']);
      // A group with nothing left in it drops its heading too.
      const headings = Array.from(el.querySelectorAll('#ia-picker h3')).map(
        (h) => h.textContent?.trim(),
      );
      expect(headings).to.deep.equal(['Production-Ready']);

      search.value = 'no-such-element';
      search.dispatchEvent(new Event('input'));
      await el.updateComplete;
      expect(pickerEntries(el)).to.have.length(0);
      expect(el.querySelector('.ia-picker-empty')).to.exist;
    });

    test('starts the next open with the whole list', async () => {
      stubNarrowViewport(true);
      const el = await appRoot();
      const total = pickerEntries(el).length;
      await openPicker(el);
      const search = el.querySelector('#ia-picker-search') as HTMLInputElement;
      search.value = 'otp';
      search.dispatchEvent(new Event('input'));
      await el.updateComplete;

      (el.querySelector('#ia-picker-close') as HTMLButtonElement).click();
      await pickerClosed(el);
      await openPicker(el);

      expect(search.value).to.equal('');
      expect(pickerEntries(el)).to.have.length(total);
    });

    test('goes to a picked element and closes the picker', async () => {
      stubNarrowViewport(true);
      const el = await appRoot();
      await openPicker(el);

      (
        el.querySelector(
          '#ia-picker a[href="#elem-ia-combo-box"]',
        ) as HTMLElement
      ).click();
      await el.updateComplete;

      expect(picker(el).open).to.be.false;
      await waitUntil(
        () => anchorIds(el)[0] === 'elem-ia-combo-box',
        'the picked element never showed',
      );
      expect(window.location.hash).to.equal('#elem-ia-combo-box');
    });

    test('shows every element from the picker', async () => {
      stubNarrowViewport(true);
      const el = await appRoot();
      expect(anchorIds(el)).to.have.length(1);
      await openPicker(el);

      (el.querySelector('#ia-picker .ia-pick-all') as HTMLElement).click();
      await waitUntil(
        () => anchorIds(el).length > 1,
        'never switched to the all-elements view',
      );
      expect(picker(el).open).to.be.false;
    });

    test('keeps the bar on screen and clear of the page end, scrolled to the bottom', async () => {
      const removeCss = applyDemoCss();
      try {
        setHash('#elem-ia-radio-player');
        stubNarrowViewport(true);
        const el = await appRoot();
        await waitUntil(
          () => el.querySelector('ia-radio-player-story'),
          '<ia-radio-player-story> was never rendered',
        );
        await waitUntil(
          () => document.documentElement.scrollHeight > window.innerHeight * 2,
          'the page never grew long enough to test scrolling on',
        );

        window.scrollTo({ top: document.documentElement.scrollHeight });
        await waitUntil(() => window.scrollY > 0, 'the page never scrolled');

        const bar = (
          el.querySelector('#ia-bar') as HTMLElement
        ).getBoundingClientRect();
        expect(bar.top, 'the bar scrolled off the top').to.be.at.least(0);
        expect(bar.bottom, 'the bar sits below the screen').to.be.at.most(
          window.innerHeight + 1,
        );
        // On top of whatever is underneath it, not covered by it.
        const next = barButton(el, 'next').getBoundingClientRect();
        const hit = document.elementFromPoint(
          next.left + next.width / 2,
          next.top + next.height / 2,
        );
        expect(hit?.closest('#ia-bar-next')).to.equal(barButton(el, 'next'));
        // The end of the element's page can be scrolled out from under it.
        const story = (
          el.querySelector('#elem-ia-radio-player') as HTMLElement
        ).getBoundingClientRect();
        expect(story.bottom).to.be.at.most(bar.top);
      } finally {
        removeCss();
      }
    });

    test('keeps the bar and picker full size under a 10px root font', async () => {
      const removeCss = applyDemoCss();
      const root = document.documentElement;
      try {
        stubNarrowViewport(true);
        const el = await appRoot();

        /** Every control's height and text size, at the current root size. */
        const measure = async () => {
          await openPicker(el);
          const controls = [
            barButton(el, 'prev'),
            barButton(el, 'name'),
            barButton(el, 'next'),
            el.querySelector('#ia-picker-close') as HTMLElement,
            el.querySelector('#ia-picker-search') as HTMLElement,
            ...Array.from(
              el.querySelectorAll<HTMLElement>('#ia-picker .ia-pick'),
            ),
          ];
          const sizes = controls.map((control) => ({
            height: control.getBoundingClientRect().height,
            font: getComputedStyle(control).fontSize,
          }));
          (el.querySelector('#ia-picker-close') as HTMLButtonElement).click();
          await pickerClosed(el);
          return sizes;
        };

        const atDefault = await measure();
        // What a story does to suit an element sized for archive.org's root.
        root.style.fontSize = '10px';
        const atTenPx = await measure();

        expect(atTenPx).to.deep.equal(atDefault);
        for (const { height } of atTenPx) {
          expect(height, 'a tap target under 44px').to.be.at.least(44);
        }
      } finally {
        root.style.fontSize = '';
        removeCss();
      }
    });
  });
});
