import { TemplateResult } from 'lit';

/**
 * A category to include in the dropdown. Consists of an internal `id` string that is
 * emitted on selection, and a human-readable `label` to display in the dropdown.
 */
export type SearchCategory = {
  id: string;
  label: string | TemplateResult;
};

/**
 * Detail object emitted with `searchRequested` events.
 */
export type SearchRequestedDetail = {
  query: string;
  category: string;
};
