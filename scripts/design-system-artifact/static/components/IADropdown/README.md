IADropdown from ia-design-system. Use via `window.IADesignSystem.IADropdown` (load `tokens.css`, `components/bundle.css` and `components/bundle.js`).

Dropdown menu (`<ia-dropdown>`), as used for the sort field.
A trigger with a dark list of options.

ia-dropdown pads each option's first child element, not the option itself,
so a plain-string label renders flush against the menu edge. Live consumers
wrap every label in a span (collection-browser's sort bar uses
`<span class="dropdown-option-label">`); this does the same for string
labels so React callers can pass plain text.

## Props

```ts
interface IADropdownProps {
className?: string; id?: string; style?: React.CSSProperties; /** The trigger's content: pass <span slot="dropdown-label">…</span>. */ children?: React.ReactNode; options?: { id: string; label: string; url?: string }[]; selectedOption?: string; /** Keep the selected option in the list. */ includeSelectedOption?: boolean; displayCaret?: boolean; open?: boolean; isDisabled?: boolean; closeOnSelect?: boolean; closeOnEscape?: boolean; closeOnBackdropClick?: boolean; openViaButton?: boolean; usePopover?: boolean; onOptionSelected?: (e: CustomEvent<{ option: { id: string; label: string } }>) => void;
}
```

## Examples

### Closed

```jsx
() => (
  <IADropdown style={sortDropdown} options={sortFields} selectedOption="relevance" displayCaret includeSelectedOption closeOnSelect>
    <span slot="dropdown-label" style={label}>Relevance</span>
  </IADropdown>
)
```

### Open

```jsx
() => (
  <div style={frame}>
    <IADropdown style={sortDropdown} options={sortFields} selectedOption="relevance" displayCaret includeSelectedOption open>
      <span slot="dropdown-label" style={label}>Relevance</span>
    </IADropdown>
  </div>
)
```

### Disabled

```jsx
() => (
  <IADropdown style={sortDropdown} options={sortFields} selectedOption="relevance" displayCaret isDisabled>
    <span slot="dropdown-label" style={{ ...label, color: 'var(--ia-color-text-disabled)' }}>Relevance</span>
  </IADropdown>
)
```

## Related

`IADropdownSearchBar`
