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

const appRoot = () => fixture<AppRoot>(html`<app-root></app-root>`);

describe('AppRoot', () => {
  afterEach(() => {
    fixtureCleanup();
    clearHash();
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
