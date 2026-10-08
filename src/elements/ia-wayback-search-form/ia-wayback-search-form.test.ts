import { fixture } from '@open-wc/testing-helpers';
import { configureLocalization, type LocaleModule } from '@lit/localize';
import { generateMsgId } from '@lit/localize/internal/id-generation.js';
import { html } from 'lit';
import { afterEach, describe, expect, test, vi } from 'vitest';

import type { IAWaybackSearchForm } from './ia-wayback-search-form';
import './ia-wayback-search-form';

const spanish: Record<string, string> = {
  '1 trillion': '1 billón',
  'Visit the Wayback Machine': 'Visita la Wayback Machine',
  'Search the Wayback Machine': 'Buscar en la Wayback Machine',
  'Enter URL or keywords': 'Escribe una URL o palabras clave',
};

const strings = Object.fromEntries(
  Object.entries(spanish).map(([source, target]) => [
    generateMsgId(source, false),
    target,
  ]),
);

const intro = html`Busca en la historia de más de ${0}
  <a @click=${1} href="https://blog.archive.org/">páginas web</a>
  de Internet.`;

// The intro is the element's only html message, so any html id is the intro.
const templates = new Proxy(strings, {
  get: (target, id: string) =>
    target[id] ?? (id.startsWith('h') ? intro : undefined),
}) as LocaleModule['templates'];

// The host app configures localization once. This stands in for it.
const { setLocale } = configureLocalization({
  sourceLocale: 'en',
  targetLocales: ['es'],
  loadLocale: async () => ({ templates }),
});

function introOf(el: IAWaybackSearchForm): string {
  return (
    el.shadowRoot
      ?.querySelector('p')
      ?.textContent?.replace(/\s+/g, ' ')
      .trim() ?? ''
  );
}

function inputOf(el: IAWaybackSearchForm): HTMLInputElement | null | undefined {
  return el.shadowRoot?.querySelector('input');
}

describe('IAWaybackSearchForm', () => {
  afterEach(async () => {
    await setLocale('en');
    vi.restoreAllMocks();
  });

  test('passes what was typed to the query handler and fires an event', async () => {
    const performQuery = vi.fn();
    const el = await fixture<IAWaybackSearchForm>(
      html`<ia-wayback-search-form
        .queryHandler=${{ performQuery }}
      ></ia-wayback-search-form>`,
    );
    const submitted = vi.fn();
    el.addEventListener('waybackSearchSubmitted', submitted);

    const input = inputOf(el);
    if (!input) throw new Error('no input');
    input.value = 'example.com';
    el.shadowRoot?.querySelector('form')?.requestSubmit();

    expect(performQuery).toHaveBeenCalledExactlyOnceWith('example.com');
    expect(submitted).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ detail: { query: 'example.com' } }),
    );
  });

  test('shows the page count the host passes', async () => {
    const el = await fixture<IAWaybackSearchForm>(
      html`<ia-wayback-search-form
        waybackPagesArchived="946 billion"
      ></ia-wayback-search-form>`,
    );
    expect(introOf(el)).toBe(
      'Search the history of more than 946 billion web pages on the Internet.',
    );
  });

  test('switches to Spanish on a search already on the page', async () => {
    const el = await fixture<IAWaybackSearchForm>(
      html`<ia-wayback-search-form></ia-wayback-search-form>`,
    );
    const logoLink = () =>
      el.shadowRoot?.querySelector('fieldset a')?.getAttribute('aria-label');
    expect(introOf(el)).toBe(
      'Search the history of more than 1 trillion web pages on the Internet.',
    );
    expect(inputOf(el)?.getAttribute('aria-label')).toBe(
      'Search the Wayback Machine',
    );
    expect(inputOf(el)?.placeholder).toBe('Enter URL or keywords');
    expect(logoLink()).toBe('Visit the Wayback Machine');

    await setLocale('es');
    await el.updateComplete;

    expect(introOf(el)).toBe(
      'Busca en la historia de más de 1 billón páginas web de Internet.',
    );
    expect(inputOf(el)?.getAttribute('aria-label')).toBe(
      'Buscar en la Wayback Machine',
    );
    expect(inputOf(el)?.placeholder).toBe('Escribe una URL o palabras clave');
    expect(logoLink()).toBe('Visita la Wayback Machine');
  });

  test('keeps the stats link working in Spanish', async () => {
    await setLocale('es');
    const el = await fixture<IAWaybackSearchForm>(
      html`<ia-wayback-search-form></ia-wayback-search-form>`,
    );
    const clicked = vi.fn();
    el.addEventListener('waybackMachineStatsLinkClicked', clicked);

    el.shadowRoot
      ?.querySelector<HTMLAnchorElement>('p a')
      ?.addEventListener('click', (e) => e.preventDefault());
    el.shadowRoot?.querySelector<HTMLAnchorElement>('p a')?.click();

    expect(clicked).toHaveBeenCalledOnce();
  });
});
