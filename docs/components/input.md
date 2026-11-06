# Text input, textarea, select

> **Use instead:** a site or collection search → [search bar](search-bar.md). A choice from
> a known list → [dropdown](dropdown.md). A yes or no → a checkbox ([checkbox and
> radio](checkbox-radio.md)).

The signup page is the clearest illustration of the problem. archive.org's most
conversion-critical form renders its email, screen-name and password fields with
`border: 2px inset #767676` and `border-radius: 0` — the raw browser default; offshoot's
`ia-signup-form` sets their font and padding but no border. No focus state and no fill;
an error only turns the border `#e51c23`. No relationship to anything else on the page.

Elsewhere, text inputs use radius `0` (topnav search), `2px` (date filters), `4px`
(feedback textarea), `5px` (sort control) and `20px` (collection search). The token
defaults declare `--input-border-width: 0` and `--input-border-radius: 0`, which is how
"unstyled" became the fallback.

## Spec

| Property | Value |
| --- | --- |
| Height | `--ia-size-control-md` (3.6rem / 36px); `lg` 4.4rem for primary forms |
| Radius | `--ia-radius-default` (4px) |
| Border | `var(--ia-border-control)` — 1px `--ia-color-border-strong`, `#666`, 5.74:1 |
| Background | `--ia-color-surface-raised` |
| Text | `--ia-font-size-md`, `--ia-color-text-primary` |
| Placeholder | `--ia-color-text-secondary` — `#666`, still readable |
| Padding | `--ia-space-2` inline (10px) |
| Focus | `2px solid var(--ia-color-border-focus)`, offset 2px |

**Below the `md` breakpoint the font size is 16px, not 1.4rem.** iOS Safari
zooms the viewport whenever a focused input's text is under 16px, and the user has to
pinch back out. The live signup form already renders at 16px (`1.6rem` in
`ia-signup-form`); this makes it a rule
rather than an accident.

```css
@media (max-width: 767px) { /* --ia-breakpoint-md */
  .ia-input { font-size: 16px; }
}
```

The border is `#666`, not the `#ddd` used across live search and profile pages. A border
that defines where a control begins has to clear 3:1 (WCAG 1.4.11); `#ddd` is 1.36:1.

## States

| State | Treatment |
| --- | --- |
| rest | as above |
| hover | border → `--ia-color-text-primary` |
| focus-visible | 2px focus ring, offset 2px; border unchanged |
| filled | identical to rest — a filled field is not a state |
| error | border `--ia-color-status-danger`, message below, `aria-invalid="true"` |
| disabled | background `--ia-color-surface-sunken`, border `--ia-color-border-default`, `cursor: not-allowed` |
| readonly | no border, background `--ia-color-surface-sunken`, still focusable and selectable |

Never signal an error with color alone. The error message sits below the field, carries
an icon, and is wired up with `aria-describedby`.

## Anatomy of a field

```html
<div class="ia-field">
  <label class="ia-field__label" for="email">Email Address</label>
  <p class="ia-field__hint" id="email-hint">Up to 127 characters</p>
  <input class="ia-input" id="email" type="email"
         aria-describedby="email-hint email-error" aria-invalid="true">
  <p class="ia-field__error" id="email-error">
    <ia-icon-alert aria-hidden="true"></ia-icon-alert>
    Enter an email address that includes an @
  </p>
</div>
```

- Label above the field, `--ia-font-size-md` / 700, `--ia-space-1` (5px) below.
- Hint text between label and field, `.ia-type-meta`, `--ia-color-text-secondary`.
- `--ia-space-4` (20px) between fields in a stack.
- **A placeholder is never a label.** It disappears on input and fails WCAG 3.3.2. The
  live signup form does this correctly — labels above, hints beside — and that pattern
  is the one to keep.

## Textarea

Same everything, plus:
- `min-block-size: 8rem` (roughly three lines), `resize: vertical` only.
- `padding-block: var(--ia-space-2)`.
- Character counters go below-right, `.ia-type-meta`, and are announced with
  `aria-live="polite"` only when within 10% of the limit.

## Select

Native `<select>` wherever possible — it gets the platform's picker on mobile, which is
better than anything a custom widget will manage. Match the input's height, radius,
border and font, and supply the chevron as a background image so the control is not
relying on the OS default arrow for its affordance.

Reach for a custom listbox (as `ia-dropdown` does) only when you genuinely need
multi-select, search-within-options, or rich option content. If you do, it needs full
`role="combobox"` / `role="listbox"` semantics, arrow-key navigation, Escape to close,
and type-ahead.

### The live combo box

The one custom listbox besides `ia-dropdown` is `ia-combo-box` (from
`@internetarchive/elements`): a text field over a filtered list, with `select-only`,
`list` and `freeform` behaviors. The Claude Design card `IAComboBox` renders it.
collection-browser uses it for the TV search's "Filter by Network" and "Filter by Show"
fields, with the label visually hidden and its styling set through `::part()`
(`combo-box`, `option`, `clear-button`, `icon`): 14px text, options padded 7px at a 1.1
line height, a 26px clear button. This page has no combo box spec; the card expresses the
same parts in tokens (`--ia-font-size-md` text, options padded `--ia-space-1` /
`--ia-space-2` at `--ia-font-line-height-tight`, an `--ia-size-icon-lg` clear button).

## Search fields are different

A search input is the one place `--ia-radius-pill` is correct — it is a widely
recognized affordance and archive.org already uses it on the collection search and the
topnav. See [search-bar.md](search-bar.md).

## Migrating the live variants

| Live | Becomes |
| --- | --- |
| signup fields (offshoot `ia-signup-form`) — `2px inset #767676`, r0, 33px | `.ia-input` at `lg` (44px), r4, `#666` border |
| topnav search — the bar is 30px with 5px end caps and a `1px #999` border; the inner input has neither | `.ia-search-bar` |
| collection search (elements' `ia-clearable-text-input`) — r20, `1px #ccc`, 32px | `.ia-search-bar` |
| date-range filters — 41×20, r2, `1px #2c2c2c` | `.ia-input.ia-input--sm` |
| feedback textarea — r4, `1px #2c2c2c`, 32px | `.ia-textarea` |

The date filters are 41×20 — too small to hit and too small to read the year inside.
`.ia-input--sm` brings them to 30px with a 4px radius and a border that meets contrast.

## Don't

- Don't ship a native unstyled input.
- Don't put the label inside the field.
- Don't use `#ddd` for an input border.
- Don't set input text below 16px at mobile widths.
- Don't remove the focus ring because the border already changes — the border change is
  too subtle on its own, and it is not what a keyboard user is scanning for.
