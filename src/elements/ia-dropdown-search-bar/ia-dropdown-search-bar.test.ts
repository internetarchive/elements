import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import type { IaClearableTextInput } from '@internetarchive/ia-clearable-text-input';
import { IADropdownSearchBar } from './ia-dropdown-search-bar';
import type { SearchRequestedDetail } from './models';

import './ia-dropdown-search-bar';
import { IaDropdown } from '@internetarchive/ia-dropdown';

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

  test('includes advanced search option in dropdown when specified', async () => {
    el.navBaseUrl = 'foo';
    el.advancedSearchStyle = 'dropdown';
    await el.updateComplete;

    // No advanced search link is rendered
    const advancedSearchLink = el.shadowRoot?.querySelector(
      '#advanced-search-link',
    ) as HTMLAnchorElement;
    expect(advancedSearchLink).not.to.exist;

    // Instead it's an option in the dropdown
    const dropdown = el.shadowRoot?.querySelector('#category-dropdown') as IaDropdown;
    expect(dropdown.options.find(
      opt => opt.id === IADropdownSearchBar.ADVANCED_SEARCH_OPTION_ID
    )).to.exist;
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

      // 'all' is the default selectedCategory
      dropdown.dispatchEvent(
        new CustomEvent('optionSelected', {
          detail: { option: { id: 'all' } },
        }),
      );
      await el.updateComplete;

      expect(categoryListener).not.toHaveBeenCalled();
      expect(el.selectedCategory).to.equal('all');
    });

    test('tries navigating to advanced search URL when advanced search option selected', async () => {
      const navSpy = vi
        .spyOn(el as any, 'navigateToAdvancedSearch')
        .mockImplementation(() => {});

      const dropdown = el.shadowRoot?.querySelector(
        '#category-dropdown',
      ) as HTMLElement;

      dropdown.dispatchEvent(
        new CustomEvent('optionSelected', {
          detail: {
            option: { id: IADropdownSearchBar.ADVANCED_SEARCH_OPTION_ID },
          },
        }),
      );
      await el.updateComplete;

      expect(navSpy).toHaveBeenCalledOnce();
      // selectedCategory should NOT change to the advanced search option ID
      expect(el.selectedCategory).to.equal('all');
    });

    test('does not emit advancedSearchClicked on option selection when navBaseUrl is not set', async () => {
      const advancedSearchListener = vi.fn();
      el.addEventListener('advancedSearchClicked', advancedSearchListener);

      const dropdown = el.shadowRoot?.querySelector(
        '#category-dropdown',
      ) as HTMLElement;

      dropdown.dispatchEvent(
        new CustomEvent('optionSelected', {
          detail: {
            option: { id: IADropdownSearchBar.ADVANCED_SEARCH_OPTION_ID },
          },
        }),
      );
      await el.updateComplete;

      expect(advancedSearchListener).not.toHaveBeenCalled();
    });
  });

  describe('advanced search link', () => {
    test('dispatches advancedSearchClicked on link click', async () => {
      el.navBaseUrl = 'https://example.com';
      await el.updateComplete;

      const advancedSearchListener = vi.fn();
      el.addEventListener('advancedSearchClicked', advancedSearchListener);

      const link = el.shadowRoot?.querySelector(
        '#advanced-search-link',
      ) as HTMLAnchorElement;
      expect(link).to.exist;

      // Prevent actual navigation
      link.addEventListener('click', (e) => e.preventDefault());
      link.click();
      await el.updateComplete;

      expect(advancedSearchListener).toHaveBeenCalledOnce();
    });

    test('does not render link when advancedSearchStyle is none', async () => {
      el.navBaseUrl = 'https://example.com';
      el.advancedSearchStyle = 'none';
      await el.updateComplete;

      const link = el.shadowRoot?.querySelector('#advanced-search-link');
      expect(link).not.to.exist;
    });

    test('does not render link when navBaseUrl is not set', async () => {
      // navBaseUrl is undefined by default
      const link = el.shadowRoot?.querySelector('#advanced-search-link');
      expect(link).not.to.exist;
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
