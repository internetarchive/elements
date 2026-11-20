IAHistogramDateRange from ia-design-system. Use via `window.IADesignSystem.IAHistogramDateRange` (load `tokens.css`, `components/bundle.css` and `components/bundle.js`).

Date-range histogram (`<ia-histogram-date-range>`), the facets' year filter.
A histogram of results per period with two draggable handles and year inputs.

## Props

```ts
interface IAHistogramDateRangeProps {
className?: string; id?: string; style?: React.CSSProperties; /** Result counts per bin, oldest first. */ bins?: number[]; /** The full range, e.g. '1900' and '2026' (in dateFormat). */ minDate?: string; maxDate?: string; /** The selected range; defaults to the full range. */ minSelectedDate?: string; maxSelectedDate?: string; /** Parse and display format. Default 'YYYY'. */ dateFormat?: string; /** Chart size in px. Defaults 180 × 40. */ width?: number; height?: number; /** How bar height follows the bin value. Default 'logarithmic', so small counts stay visible. */ barScaling?: 'linear' | 'logarithmic'; binSnapping?: 'none' | 'month' | 'year'; loading?: boolean; disabled?: boolean; missingDataMessage?: string; tooltipLabel?: string; /** Date format in the bar tooltips; defaults to dateFormat. */ tooltipDateFormat?: string; /** Slider handle width in px. Default 10. */ sliderWidth?: number; /** Tooltip size in px. Defaults 125 × 30. */ tooltipWidth?: number; tooltipHeight?: number; /** Debounce before the update event, in ms. Default 0. */ updateDelay?: number; /** Keep firing update events while a date input has focus. Default false. */ updateWhileFocused?: boolean; /** Content after the date inputs: pass <span slot="inputs-right-side">…</span>. */ children?: React.ReactNode; onHistogramDateRangeUpdated?: (e: CustomEvent<{ minDate: string; maxDate: string }>) => void;
}
```

## Examples

### Default

```jsx
() => <IAHistogramDateRange style={facet} bins={bins} minDate="1975" maxDate="2025" />
```

### RangeSelected

```jsx
() => (
  <IAHistogramDateRange style={facet} bins={bins} minDate="1975" maxDate="2025" minSelectedDate="1990" maxSelectedDate="2010" />
)
```

### Loading

```jsx
() => <IAHistogramDateRange style={facet} bins={bins} minDate="1975" maxDate="2025" loading />
```

### Disabled

```jsx
() => <IAHistogramDateRange style={facet} bins={bins} minDate="1975" maxDate="2025" disabled />
```
