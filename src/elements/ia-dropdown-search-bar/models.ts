/**
 * A category to include in the dropdown. Consists of an internal `id` string that is
 * emitted on selection, an a human-readable `label` to display in the dropdown.
 */
export type SearchCategory = {
  id: string;
  label: string;
};

/**
 * Detail object emitted with `searchRequested` events.
 */
export type SearchRequestedDetail = {
  query: string;
  category: string;
};

/**
 * Options for where to display Advanced Search:
 * - `link` (default): as a text link below the search bar
 * - `dropdown`: as an item at the bottom of the category dropdown
 * - `none`: hidden entirely
 */
export type AdvancedSearchStyle =
  | 'link'
  | 'dropdown'
  | 'none';