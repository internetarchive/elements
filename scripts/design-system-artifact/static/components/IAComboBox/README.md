IAComboBox from ia-design-system. Use via `window.IADesignSystem.IAComboBox` (load `tokens.css`, `components/bundle.css` and `components/bundle.js`).

Combo box (`<ia-combo-box>`): a text field over a filtered list of options.
The TV search's network and show filters use it.

## Props

```ts
interface IAComboBoxProps {
className?: string; id?: string; style?: React.CSSProperties; /** Optional label content, e.g. <span slot="label">Language</span>. */ children?: React.ReactNode; options?: { id: string; text: string }[]; placeholder?: string; /** 'select-only' (a styled select), 'list' (type to filter, must pick an option) or 'freeform' (any text). Default 'list'. */ behavior?: 'select-only' | 'list' | 'freeform'; maxAutocompleteEntries?: number; /** How typed text filters the options. Default 'substring'. */ filter?: 'all' | 'prefix' | 'suffix' | 'substring' | 'subsequence'; caseSensitive?: boolean; sort?: boolean; wrapArrowKeys?: boolean; stayOpen?: boolean; /** Shows a clear button. */ clearable?: boolean; /** The options list is open. */ open?: boolean; disabled?: boolean; required?: boolean; /** The selected option id (or typed text in 'freeform'). */ value?: string | null; onChange?: (e: CustomEvent<string | null>) => void; onToggle?: (e: CustomEvent<boolean>) => void;
}
```

## Examples

### TvFilters

```jsx
() => (
  <div>
    <style>{filterStyles}</style>
    <IAComboBox className="tv-filter-dropdown" options={networks} placeholder="Filter by Network" clearable wrapArrowKeys sort>
      <span slot="label" className="ia-visually-hidden">Filter by Network</span>
    </IAComboBox>
    <IAComboBox className="tv-filter-dropdown" options={shows} placeholder="Filter by Show" maxAutocompleteEntries={500} clearable wrapArrowKeys sort>
      <span slot="label" className="ia-visually-hidden">Filter by Show</span>
    </IAComboBox>
  </div>
)
```

### WithValue

```jsx
() => (
  <div>
    <style>{filterStyles}</style>
    <IAComboBox className="tv-filter-dropdown" options={networks} value="network-2" clearable wrapArrowKeys sort>
      <span slot="label" className="ia-visually-hidden">Filter by Network</span>
    </IAComboBox>
  </div>
)
```

### VisibleLabel

```jsx
() => (
  <IAComboBox options={networks} placeholder="Choose a Network" clearable sort>
    <span slot="label">Network</span>
  </IAComboBox>
)
```

### Disabled

```jsx
() => (
  <div>
    <style>{filterStyles}</style>
    <IAComboBox className="tv-filter-dropdown" options={networks} placeholder="Filter by Network" disabled>
      <span slot="label" className="ia-visually-hidden">Filter by Network</span>
    </IAComboBox>
  </div>
)
```
