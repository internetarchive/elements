IAButton from ia-design-system. Use via `window.IADesignSystem.IAButton` (load `tokens.css`, `components/bundle.css` and `components/bundle.js`).

Button (`<ia-button>`) in primary, secondary, danger, donate, ghost and other modes, in three sizes.
Has a loading state and renders a link when given `href`. Children are the label.
Size it through `style`: `--ia-theme-button-width` and `--ia-theme-button-height`, on
the button or any ancestor. `--ia-theme-button-width: 100%` is a full-width button.

## Props

```ts
interface IAButtonProps {
/** The inner <button> is ::part(button), for layout only (a width, a clamp), never restyling. */ className?: string; id?: string; /** Size with '--ia-theme-button-width' and '--ia-theme-button-height' (here or on an ancestor); '--ia-theme-button-width': '100%' is full width. */ style?: React.CSSProperties; /** The label. */ children?: React.ReactNode; /** Visual style. Default 'primary'. 'donate' is the green donate action; 'ghost' is borderless. 'transparent' is deprecated: it renders as 'ghost' and logs a warning. */ mode?: 'primary' | 'secondary' | 'danger' | 'warning' | 'donate' | 'disabled' | 'ghost' | 'transparent' | 'custom' | 'link' | 'danger-link'; /** Height: 'sm' 30px, 'md' 36px (default), 'lg' 44px. '--ia-theme-button-height' sets the 'md' height only. */ size?: 'sm' | 'md' | 'lg'; /** mode 'custom' takes its colors from --ia-button-custom-fill, --ia-button-custom-border, --ia-button-custom-text-color and their --ia-button-custom-active-* pressed states, set in style; --ia-button-transition sets its transition. */ /** Replaces the label with a loading indicator. */ loading?: boolean; /** Text shown beside the indicator while loading. */ loadingText?: string; disabled?: boolean; /** Behaves like a native button of this type inside a form. Default 'button'. */ type?: 'button' | 'submit' | 'reset'; /** Renders the button as a link. */ href?: string; openLinksNewTab?: boolean; onClick?: (e: MouseEvent) => void;
}
```

## Examples

### Primary

```jsx
() => <IAButton>Sign Up</IAButton>
```

### Modes

```jsx
() => (
  <div style={row}>
    <IAButton mode="primary">Save</IAButton>
    <IAButton mode="secondary">Cancel</IAButton>
    <IAButton mode="danger">Delete Item</IAButton>
    <IAButton mode="warning">Flag</IAButton>
    <IAButton mode="donate">Donate</IAButton>
    <IAButton mode="ghost">Share</IAButton>
    <IAButton mode="link">Show More</IAButton>
  </div>
)
```

### Sizes

```jsx
() => (
  <div style={row}>
    <IAButton size="sm">Small</IAButton>
    <IAButton>Medium</IAButton>
    <IAButton size="lg">Large</IAButton>
  </div>
)
```

### Loading

```jsx
() => (
  <div style={row}>
    <IAButton loading>Sign Up</IAButton>
    <IAButton loading loadingText="Saving…">Save</IAButton>
  </div>
)
```

### Disabled

```jsx
() => (
  <div style={row}>
    <IAButton disabled>Sign Up</IAButton>
    <IAButton mode="secondary" disabled>Cancel</IAButton>
  </div>
)
```

### FullWidth

```jsx
() => (
  <form style={{ inlineSize: 'var(--ia-container-form)', maxInlineSize: '100%', '--ia-theme-button-width': '100%', '--ia-theme-button-height': 'var(--ia-size-control-lg)' }}>
    <IAButton type="submit">Sign Up</IAButton>
    <IAButton mode="secondary" style={{ marginBlockStart: 'var(--ia-space-2)' }}>Borrow for 1 Hour</IAButton>
  </form>
)
```

### AsLink

```jsx
() => <IAButton href="https://archive.org/details/texts" mode="secondary">Browse Texts</IAButton>
```
