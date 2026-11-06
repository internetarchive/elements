/**
 * The design system spec each element implements: its section on the Specs
 * page (specs.html) and its markdown in docs/. An element missing here has no
 * spec yet.
 */
export interface StorySpec {
  /** The section's id on specs.html, if it has one */
  section?: string;
  /** The spec's path under docs/ */
  doc: string;
}

export const STORY_SPECS: Record<string, StorySpec> = {
  'ia-button': { section: 'button', doc: 'components/button.md' },
  'ia-clearable-text-input': { section: 'input', doc: 'components/input.md' },
  'ia-dropdown': { section: 'dropdown', doc: 'components/dropdown.md' },
  'ia-donation-section': { doc: 'components/donation.md' },
  'ia-donation-thermometer': { doc: 'components/donation.md' },
  'ia-dropdown-search-bar': {
    section: 'search',
    doc: 'components/search-bar.md',
  },
  'ia-expandable-search-bar': {
    section: 'search',
    doc: 'components/search-bar.md',
  },
  'ia-histogram-date-range': {
    section: 'facets',
    doc: 'components/facet-filter.md',
  },
  'ia-status-indicator': {
    section: 'loading',
    doc: 'patterns/empty-loading-error.md',
  },
  'ia-topnav': { section: 'topnav', doc: 'components/navigation.md' },
  'modal-manager': { section: 'modal', doc: 'components/modal.md' },
};

export const DOCS_URL =
  'https://github.com/internetarchive/elements/blob/main/docs/';
