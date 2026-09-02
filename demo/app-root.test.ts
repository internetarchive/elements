import { fixture, fixtureCleanup, waitUntil } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { AppRoot } from './app-root';
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

const appRoot = () => fixture<AppRoot>(html`<app-root></app-root>`);

describe('AppRoot', () => {
  afterEach(() => {
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
      await waitUntil(
        () => inViewHref(el) === `#${firstId}`,
        'the scroll spy never marked the first element',
      );

      // Every story has to have settled before the disconnect below. Each one
      // requests an update as it lands, and any still in flight would rebuild
      // the scroll spy on its own, hiding whether reconnecting rebuilt it.
      // A story that fails to import keeps a message too, so this waits on the
      // console as much as on the clock. The timeout covers loading all eight
      // modules cold, which is what happens when this test runs on its own.
      await waitUntil(
        () => el.querySelectorAll('.ia-story-message').length === 0,
        'the stories never all settled; check the console for one that failed to import',
        { timeout: 5000 },
      );
      await el.updateComplete;

      // Loaded stories are also what make the page taller than the viewport.
      // Without that, scrolling is a no-op and the assertions below would
      // blame the scroll spy for a page that simply never moved.
      await waitUntil(
        () => document.documentElement.scrollHeight > window.innerHeight,
        'the page never grew tall enough to scroll',
      );

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
});
