import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import type { IaClearableTextInput } from '@internetarchive/ia-clearable-text-input';
import { IADropdownSearchBar } from './ia-dropdown-search-bar';
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
      <ia-dropdown-search-bar
        .categories=${defaultCategories}
      ></ia-dropdown-search-bar>
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

  test('default selected category is first in list', async () => {
    // selectedCategory is not explicitly set, so it resolves to
    // the first category in the provided list
    expect(el.selectedCategory).to.be.undefined;

    // But the dropdown label should show the first category's label
    const label = el.shadowRoot?.querySelector(
      '#category-dropdown [slot="dropdown-label"]',
    );
    expect(label?.textContent?.trim()).to.equal('All');
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

  describe('searchFieldCleared behavior', () => {
    test('emits searchRequested when cleared with existing query', async () => {
      el.query = 'foo';
      await el.updateComplete;

      const searchListener = vi.fn();
      el.addEventListener('searchRequested', searchListener);

      searchInput.dispatchEvent(new CustomEvent('clear'));
      await el.updateComplete;

      expect(searchListener).toHaveBeenCalledOnce();
    });

    test('does not emit searchRequested when cleared without query', async () => {
      // query is undefined by default
      const searchListener = vi.fn();
      el.addEventListener('searchRequested', searchListener);

      searchInput.dispatchEvent(new CustomEvent('clear'));
      await el.updateComplete;

      expect(searchListener).not.toHaveBeenCalled();
    });
  });

  describe('category selection behavior', () => {
    test('emits categoryChanged and updates selectedCategory on new selection', async () => {
      const categoryListener = vi.fn();
      el.addEventListener('categoryChanged', categoryListener);

      const dropdown = el.shadowRoot?.querySelector(
        '#category-dropdown',
      ) as HTMLElement;

      dropdown.dispatchEvent(
        new CustomEvent('optionSelected', {
          detail: { option: { id: 'texts' } },
        }),
      );
      await el.updateComplete;

      expect(categoryListener).toHaveBeenCalledOnce();
      expect(categoryListener.mock.calls[0][0].detail).to.equal('texts');
      expect(el.selectedCategory).to.equal('texts');
    });

    test('does not emit categoryChanged when same category is re-selected', async () => {
      const categoryListener = vi.fn();
      el.addEventListener('categoryChanged', categoryListener);

      const dropdown = el.shadowRoot?.querySelector(
        '#category-dropdown',
      ) as HTMLElement;

      // 'all' is the first category, so it's the resolved default
      dropdown.dispatchEvent(
        new CustomEvent('optionSelected', {
          detail: { option: { id: 'all' } },
        }),
      );
      await el.updateComplete;

      expect(categoryListener).not.toHaveBeenCalled();
    });
  });

  describe('property rendering', () => {
    test('hides dropdown when hideDropdown property is true', async () => {
      el.hideDropdown = true;
      await el.updateComplete;

      const dropdown = el.shadowRoot?.querySelector('#category-dropdown');
      expect(dropdown).not.to.exist;

      const mainBar = el.shadowRoot?.querySelector('#main-bar');
      expect(mainBar?.classList.contains('no-dropdown')).to.be.true;
    });

    test('applies mobile class when useMobileView property is true', async () => {
      el.useMobileView = true;
      await el.updateComplete;

      const searchLinks = el.shadowRoot?.querySelector('#search-links');
      expect(searchLinks?.classList.contains('mobile')).to.be.true;
    });

    test('falls back to category ID when no matching label found', async () => {
      el.selectedCategory = 'nonexistent';
      await el.updateComplete;

      const label = el.shadowRoot?.querySelector(
        '#category-dropdown [slot="dropdown-label"]',
      );
      expect(label?.textContent?.trim()).to.equal('nonexistent');
    });
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

      const detail = searchListener.mock.calls[0][0]
        .detail as SearchRequestedDetail;
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

      const detail = searchListener.mock.calls[0][0]
        .detail as SearchRequestedDetail;
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

      const detail = searchListener.mock.calls[0][0]
        .detail as SearchRequestedDetail;
      expect(detail.query).to.equal('foo');
      expect(detail.category).to.equal('all');
    });
  });
});
