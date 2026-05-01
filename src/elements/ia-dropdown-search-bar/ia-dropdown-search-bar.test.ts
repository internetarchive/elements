import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import type { IaClearableTextInput } from '@internetarchive/ia-clearable-text-input';
import type { IADropdownSearchBar } from './ia-dropdown-search-bar';
import type { SearchRequestedDetail } from './models';

import './ia-dropdown-search-bar';

const defaultCategories = [
  { id: 'all', label: 'All' },
  { id: 'texts', label: 'Books/Documents' },
  { id: 'web', label: 'Web Sites' },
];

let el: IADropdownSearchBar;
let searchInput: IaClearableTextInput;

describe('IA Dropdown Search Bar', () => {
  beforeEach(async () => {
    el = (await fixture(html`
      <dropdown-search-bar
        .categories=${defaultCategories}
      ></dropdown-search-bar>
    `)) as IADropdownSearchBar;

    await el.updateComplete;

    searchInput = el.shadowRoot?.querySelector(
      '#search-input',
    ) as IaClearableTextInput;
  });

  afterEach(() => {
    el.remove();
  });

  test('renders initial component', async () => {
    expect(el).to.exist;
    expect(searchInput).to.exist;
    expect(el.shadowRoot?.querySelector('#category-dropdown')).to.exist;
    expect(el.shadowRoot?.querySelector('#search-button')).to.exist;
  });

  test('default selected category is all', async () => {
    expect(el.selectedCategory).to.equal('all');
  });

  test('renders dropdown with provided categories', async () => {
    const dropdown = el.shadowRoot?.querySelector('#category-dropdown');
    expect(dropdown).to.exist;

    // The dropdown label should show the selected category label
    const label = el.shadowRoot?.querySelector(
      '#category-dropdown [slot="dropdown-label"]',
    );
    expect(label?.textContent?.trim()).to.equal('All');
  });

  test('updates dropdown label when selectedCategory changes', async () => {
    el.selectedCategory = 'texts';
    await el.updateComplete;

    const label = el.shadowRoot?.querySelector(
      '#category-dropdown [slot="dropdown-label"]',
    );
    expect(label?.textContent?.trim()).to.equal('Books/Documents');
  });

  test('appends query string to advanced search link when set', async () => {
    el.navBaseUrl = 'foo';
    await el.updateComplete;

    const advancedSearchLink = el.shadowRoot?.querySelector(
      '#advanced-search-link',
    ) as HTMLAnchorElement;

    expect(advancedSearchLink).to.exist;
    expect(advancedSearchLink.getAttribute('href')).to.match(
      /foo\/advancedsearch\.php$/,
    );

    el.query = 'bar';
    await el.updateComplete;

    expect(advancedSearchLink.getAttribute('href')).to.match(
      /foo\/advancedsearch\.php\?q=bar$/,
    );
  });

  test('shows loading indicator on search button when loading', async () => {
    el.loading = true;
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector(
      '#search-button',
    ) as HTMLButtonElement;
    expect(button.classList.contains('loading')).to.be.true;

    const loadingIcon = button.querySelector('ia-status-indicator');
    expect(loadingIcon).to.exist;
  });

  describe('search submission behavior', () => {
    test('emits searchRequested with query and category on submit', async () => {
      el.query = 'foo';
      await el.updateComplete;

      const searchListener = vi.fn();
      el.addEventListener('searchRequested', searchListener);

      // Trigger submit via the search input's submit event
      searchInput.dispatchEvent(
        new CustomEvent<string>('submit', { detail: 'foo' }),
      );
      await el.updateComplete;

      expect(searchListener).toHaveBeenCalledOnce();

      const detail = searchListener.mock.calls[0][0].detail as SearchRequestedDetail;
      expect(detail.query).to.equal('foo');
      expect(detail.category).to.equal('all');
    });

    test('emits searchRequested with current category on submit', async () => {
      el.query = 'foo';
      el.selectedCategory = 'web';
      await el.updateComplete;

      const searchListener = vi.fn();
      el.addEventListener('searchRequested', searchListener);

      searchInput.dispatchEvent(
        new CustomEvent<string>('submit', { detail: 'foo' }),
      );
      await el.updateComplete;

      const detail = searchListener.mock.calls[0][0].detail as SearchRequestedDetail;
      expect(detail.query).to.equal('foo');
      expect(detail.category).to.equal('web');
    });

    test('emits searchRequested on search button click', async () => {
      el.query = 'foo';
      await el.updateComplete;

      const searchListener = vi.fn();
      el.addEventListener('searchRequested', searchListener);

      const searchButton = el.shadowRoot?.querySelector(
        '#search-button',
      ) as HTMLButtonElement;
      searchButton.click();
      await el.updateComplete;

      expect(searchListener).toHaveBeenCalledOnce();

      const detail = searchListener.mock.calls[0][0].detail as SearchRequestedDetail;
      expect(detail.query).to.equal('foo');
      expect(detail.category).to.equal('all');
    });
  });
});
