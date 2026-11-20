import * as React from 'react';

/**
 * IADropdownSearchBar — from ia-design-system@1.0.0.
 */
export interface IADropdownSearchBarProps {
className?: string; id?: string; style?: React.CSSProperties; /** The query shown in the field. */ query?: string; /** The search types in the left dropdown, e.g. [{ id: 'all', label: 'All' }, { id: 'texts', label: 'Books/Documents' }]. */ categories?: { id: string; label: string }[]; /** The selected category id; defaults to the first. */ selectedCategory?: string; /** Default 'Search'. */ placeholder?: string; /** The narrow layout. */ useMobileView?: boolean; /** Hides the search-type dropdown. */ hideDropdown?: boolean; /** The submit button shows its loading state. */ loading?: boolean; onCategoryChanged?: (e: CustomEvent<string>) => void; onSearchRequested?: (e: CustomEvent<{ query: string; category: string }>) => void;
}

export declare const IADropdownSearchBar: React.ComponentType<IADropdownSearchBarProps>;
