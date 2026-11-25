IAStatusIndicator from ia-design-system. Use via `window.IADesignSystem.IAStatusIndicator` (load `tokens.css`, `components/bundle.css` and `components/bundle.js`).

Status indicator (`<ia-status-indicator>`) for loading, success and error.
An animated ring, check or "!", with an accessible title per state.

## Props

```ts
interface IAStatusIndicatorProps {
className?: string; id?: string; style?: React.CSSProperties; /** Default 'loading'. 'ready' reserves the space without drawing. */ mode?: 'ready' | 'loading' | 'success' | 'error'; /** A media-type glyph in the middle of the loading ring instead of the dots. */ mediatype?: 'audio' | 'collection' | 'etree' | 'images' | 'search' | 'software' | 'texts' | 'tv' | 'video' | 'web'; /** An empty ring while loading. */ hideDots?: boolean; /** A custom glyph in the middle of the loading ring, in place of the dots or mediatype glyph: pass <svg slot="icon">…</svg>. */ children?: React.ReactNode; /** Accessible titles per state. */ loadingTitle?: string; successTitle?: string; errorTitle?: string;
}
```

## Examples

### States

```jsx
() => (
  <div style={row}>
    <IAStatusIndicator mode="loading" />
    <IAStatusIndicator mode="success" />
    <IAStatusIndicator mode="error" />
  </div>
)
```

### PageSize

```jsx
() => (
  <div style={row}>
    <IAStatusIndicator style={page} mode="loading" />
    <IAStatusIndicator style={page} mode="loading" mediatype="texts" />
    <IAStatusIndicator style={page} mode="success" />
  </div>
)
```

### MediaTypes

```jsx
() => (
  <div style={row}>
    <IAStatusIndicator style={page} mode="loading" mediatype="video" />
    <IAStatusIndicator style={page} mode="loading" mediatype="audio" />
    <IAStatusIndicator style={page} mode="loading" mediatype="software" />
    <IAStatusIndicator style={page} mode="loading" mediatype="images" />
  </div>
)
```

### OnDark

```jsx
() => (
  <div className="ia-inverse" style={{ ...row, padding: 'var(--ia-space-4)' }}>
    <IAStatusIndicator style={stage} mode="loading" />
    <IAStatusIndicator style={stage} mode="loading" mediatype="video" />
  </div>
)
```
