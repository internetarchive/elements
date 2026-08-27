import { fixture, oneEvent, elementUpdated } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { QuickSearchEntry } from './models';
import type { IAQuickSearch } from './ia-quick-search';
import type { IAExpandableSearchBar } from './ia-expandable-search-bar';
import './ia-expandable-search-bar';

const ENTRIES: QuickSearchEntry[] = [
  { displayText: 'foo', data: { some_data: 'bar' } },
  { displayText: 'bam', data: { some_data: 'baz' } },
];

async function searchBarFixture(
  searchTerm = '',
): Promise<IAExpandableSearchBar> {
  return fixture<IAExpandableSearchBar>(
    html`<ia-expandable-search-bar
      searchTerm=${searchTerm}
    ></ia-expandable-search-bar>`,
  );
}

function inputIn(el: IAExpandableSearchBar): HTMLInputElement {
  const input = el.shadowRoot?.getElementById('search-input');
  if (!input) throw new Error('the search input is not rendered');
  return input as HTMLInputElement;
}

function buttonIn(el: IAExpandableSearchBar, id: string): HTMLButtonElement {
  const button = el.shadowRoot?.getElementById(id);
  if (!button) throw new Error(`no button with id ${id}`);
  return button as HTMLButtonElement;
}

/** Types into the input the way a user would, firing the matching event. */
function typeInto(el: IAExpandableSearchBar, text: string): void {
  const input = inputIn(el);
  input.value = text;
  input.dispatchEvent(new Event('input'));
}

describe('IA Expandable Search Bar', () => {
  test('defaults to closed and not expandable', async () => {
    const el = await searchBarFixture();

    expect(el.isOpen).to.be.false;
    expect(el.showsDisclosure).to.be.false;
  });

  test('has the `is-open` class when opened', async () => {
    const el = await fixture<IAExpandableSearchBar>(
      html`<ia-expandable-search-bar isOpen></ia-expandable-search-bar>`,
    );

    const container = el.shadowRoot?.querySelector('.container');
    expect(container?.classList.contains('is-open')).to.be.true;
  });

  test('has the `shows-disclosure` class when expandable', async () => {
    const el = await fixture<IAExpandableSearchBar>(
      html`<ia-expandable-search-bar
        showsDisclosure
      ></ia-expandable-search-bar>`,
    );

    const container = el.shadowRoot?.querySelector('.container');
    expect(container?.classList.contains('shows-disclosure')).to.be.true;
  });

  test('has the `is-searching` class when there is a search term', async () => {
    const el = await searchBarFixture('foo');

    const searchBar = el.shadowRoot?.querySelector('.search-bar');
    expect(searchBar?.classList.contains('is-searching')).to.be.true;
  });

  test('shows the search term in the input', async () => {
    const el = await searchBarFixture('foo');

    expect(inputIn(el).value).to.equal('foo');
  });

  test('updates the input when the search term is set from outside', async () => {
    const el = await searchBarFixture('foo');

    el.searchTerm = 'something else';
    await elementUpdated(el);

    expect(inputIn(el).value).to.equal('something else');
  });

  test('re-syncs the field when a consumer normalises the value back', async () => {
    const el = await searchBarFixture('abc');
    // The controlled-input pattern: the consumer clamps what it is handed.
    // The clamped result equals what Lit last committed, so the binding alone
    // has nothing to do and the field would keep showing 'abcd'.
    el.addEventListener('inputchange', () => {
      el.searchTerm = 'abc';
    });

    typeInto(el, 'abcd');
    await elementUpdated(el);

    expect(inputIn(el).value).to.equal('abc');
    expect(el.searchTerm).to.equal('abc');
  });

  test('clears the search term when the X button is pressed', async () => {
    const el = await searchBarFixture('foo');
    expect(el.searchTerm).to.equal('foo');

    buttonIn(el, 'clear-search-button').dispatchEvent(new MouseEvent('click'));

    expect(el.searchTerm).to.equal('');
  });

  test('emits `searchCleared` when the X button is pressed', async () => {
    const el = await searchBarFixture('foo');

    setTimeout(() =>
      buttonIn(el, 'clear-search-button').dispatchEvent(
        new MouseEvent('click'),
      ),
    );

    expect(await oneEvent(el, 'searchCleared')).to.exist;
  });

  test('emits `inputchange` when the input changes', async () => {
    const el = await searchBarFixture();

    setTimeout(() => typeInto(el, 'A'));

    const { detail } = await oneEvent(el, 'inputchange');
    expect(detail.value).to.equal('A');
  });

  test('registers a change that came from a paste rather than a keystroke', async () => {
    const el = await searchBarFixture();

    // A mouse paste, autofill or drop fires `input` with no key involved, so
    // binding to key events alone would miss all of them.
    setTimeout(() => typeInto(el, 'pasted text'));

    const { detail } = await oneEvent(el, 'inputchange');
    expect(detail.value).to.equal('pasted text');
    expect(el.searchTerm).to.equal('pasted text');
  });

  test('does not emit `inputchange` for a key that changes nothing', async () => {
    const el = await searchBarFixture('foo');

    let emitted = false;
    el.addEventListener('inputchange', () => {
      emitted = true;
    });
    inputIn(el).dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowLeft' }));

    expect(emitted).to.be.false;
  });

  test('emits `enterKeyPressed` when Enter is pressed', async () => {
    const el = await searchBarFixture('foo');

    setTimeout(() =>
      inputIn(el).dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' })),
    );

    const { detail } = await oneEvent(el, 'enterKeyPressed');
    expect(detail.value).to.equal('foo');
  });

  test('toggles open and closed when the disclosure is clicked', async () => {
    const el = await fixture<IAExpandableSearchBar>(
      html`<ia-expandable-search-bar
        showsDisclosure
      ></ia-expandable-search-bar>`,
    );
    expect(el.isOpen).to.be.false;

    buttonIn(el, 'disclosure-button').dispatchEvent(new MouseEvent('click'));
    expect(el.isOpen).to.be.true;

    buttonIn(el, 'disclosure-button').dispatchEvent(new MouseEvent('click'));
    expect(el.isOpen).to.be.false;
  });

  test('reports the disclosure state to assistive tech', async () => {
    const el = await fixture<IAExpandableSearchBar>(
      html`<ia-expandable-search-bar
        showsDisclosure
      ></ia-expandable-search-bar>`,
    );

    expect(
      buttonIn(el, 'disclosure-button').getAttribute('aria-expanded'),
    ).to.equal('false');

    el.isOpen = true;
    await elementUpdated(el);

    expect(
      buttonIn(el, 'disclosure-button').getAttribute('aria-expanded'),
    ).to.equal('true');
  });

  test('gives the input and both buttons accessible names', async () => {
    const el = await fixture<IAExpandableSearchBar>(
      html`<ia-expandable-search-bar
        showsDisclosure
      ></ia-expandable-search-bar>`,
    );

    expect(inputIn(el).getAttribute('aria-label')).to.equal('Search');
    expect(
      buttonIn(el, 'clear-search-button').getAttribute('aria-label'),
    ).to.equal('Clear search');
    expect(
      buttonIn(el, 'disclosure-button').getAttribute('aria-label'),
    ).to.equal('Toggle quick search');
  });

  test('handles quick search selections', async () => {
    const el = await fixture<IAExpandableSearchBar>(
      html`<ia-expandable-search-bar
        .quickSearches=${ENTRIES}
        showsDisclosure
        isOpen
      ></ia-expandable-search-bar>`,
    );
    expect(el.isOpen).to.be.true;

    const quickSearch =
      el.shadowRoot?.querySelector<IAQuickSearch>('ia-quick-search');
    const entryButton = quickSearch?.shadowRoot?.querySelector('li button');

    setTimeout(() => entryButton?.dispatchEvent(new MouseEvent('click')));
    const { detail } = await oneEvent(el, 'quickSearchSelected');

    expect(detail.quickSearchEntry).to.deep.equal(ENTRIES[0]);
    expect(entryButton).to.exist;
    expect(el.searchTerm).to.equal('foo');
    expect(el.isOpen).to.be.false;
  });
  test('returns focus to the input after a quick search selection', async () => {
    const el = await fixture<IAExpandableSearchBar>(
      html`<ia-expandable-search-bar
        .quickSearches=${ENTRIES}
        showsDisclosure
        isOpen
      ></ia-expandable-search-bar>`,
    );

    const quickSearch =
      el.shadowRoot?.querySelector<IAQuickSearch>('ia-quick-search');
    const entryButton = quickSearch?.shadowRoot?.querySelector('li button') as
      | HTMLButtonElement
      | undefined;
    entryButton?.focus();

    entryButton?.dispatchEvent(new MouseEvent('click'));
    await elementUpdated(el);

    // Selecting closes the list, which hides the button that had focus. If
    // focus isn't moved first the browser drops it to the body.
    expect(el.shadowRoot?.activeElement).to.equal(inputIn(el));
  });
});

describe('IA Quick Search', () => {
  test('renders an entry for each quick search', async () => {
    const el = await fixture<IAQuickSearch>(
      html`<ia-quick-search .quickSearches=${ENTRIES}></ia-quick-search>`,
    );

    expect(el.shadowRoot?.querySelectorAll('li').length).to.equal(2);
  });

  test('renders nothing when there are no quick searches', async () => {
    const el = await fixture<IAQuickSearch>(
      html`<ia-quick-search></ia-quick-search>`,
    );

    expect(el.shadowRoot?.querySelectorAll('li').length).to.equal(0);
  });

  test('emits `searchTermSelected` when an entry is selected', async () => {
    const el = await fixture<IAQuickSearch>(
      html`<ia-quick-search .quickSearches=${ENTRIES}></ia-quick-search>`,
    );

    const entryButton = el.shadowRoot?.querySelector('li button');
    setTimeout(() => entryButton?.dispatchEvent(new MouseEvent('click')));

    const { detail } = await oneEvent(el, 'searchTermSelected');
    expect(detail.searchEntry).to.deep.equal(ENTRIES[0]);
  });

  test('offers each entry as a real button, so it works from the keyboard', async () => {
    const el = await fixture<IAQuickSearch>(
      html`<ia-quick-search .quickSearches=${ENTRIES}></ia-quick-search>`,
    );

    const buttons = el.shadowRoot?.querySelectorAll('li button');
    expect(buttons?.length).to.equal(2);
    // An anchor with no href is neither focusable nor keyboard-activatable,
    // so entries have to be real buttons.
    expect(el.shadowRoot?.querySelectorAll('li a').length).to.equal(0);
  });
});
