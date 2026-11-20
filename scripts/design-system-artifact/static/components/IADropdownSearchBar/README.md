IADropdownSearchBar from ia-design-system. Use via `window.IADesignSystem.IADropdownSearchBar` (load `tokens.css`, `components/bundle.css` and `components/bundle.js`).

The site search bar (`<ia-dropdown-search-bar>`) with its search-type dropdown.
Then the query field and a submit button, as on archive.org.

## Props

```ts
interface IADropdownSearchBarProps {
className?: string; id?: string; style?: React.CSSProperties; /** The query shown in the field. */ query?: string; /** The search types in the left dropdown, e.g. [{ id: 'all', label: 'All' }, { id: 'texts', label: 'Books/Documents' }]. */ categories?: { id: string; label: string }[]; /** The selected category id; defaults to the first. */ selectedCategory?: string; /** Default 'Search'. */ placeholder?: string; /** The narrow layout. */ useMobileView?: boolean; /** Hides the search-type dropdown. */ hideDropdown?: boolean; /** The submit button shows its loading state. */ loading?: boolean; onCategoryChanged?: (e: CustomEvent<string>) => void; onSearchRequested?: (e: CustomEvent<{ query: string; category: string }>) => void;
}
```

## Examples

### Topnav

```jsx
() => (
  <div className="ia-topnav__search">
    <IADropdownSearchBar style={topnav} categories={categories} />
  </div>
)
```

### SearchPage

```jsx
() => (
  <div style={page}>
    <IADropdownSearchBar style={searchPage} categories={categories} query="buster keaton" />
  </div>
)
```

### SearchPageVideo

```jsx
() => (
  <div style={page}>
    <IADropdownSearchBar style={searchPage} categories={categories} query="buster keaton" selectedCategory="movies" />
  </div>
)
```

### Searching

```jsx
() => (
  <div style={page}>
    <IADropdownSearchBar style={searchPage} categories={categories} query="buster keaton" loading />
  </div>
)
```

### Homepage

```jsx
() => (
  <div style={page}>
    <IADropdownSearchBar style={homepage} categories={categories} />
  </div>
)
```
