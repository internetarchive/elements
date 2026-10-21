# Checkbox and radio

> **Use instead:** a binary setting that applies the moment it changes →
> [switch](switch.md). Two to four exclusive options in a toolbar →
> [segmented control](segmented-control.md). One choice from a long list →
> [dropdown](dropdown.md).

Facet panels are the densest interactive surface on archive.org — six groups of six
values, two checkboxes to a value, around seventy — so these two controls carry more
interaction than almost anything else on the site. Live they are native: **15×15** in a
**24px** row, with a second 15×15 control beside each one (the hide/exclude eye — see
[facet-filter.md](facet-filter.md#two-controls-per-row); collection-browser's
`facet-row-template.ts`). Elsewhere they are the native 13×13: the collection search's
radios (offshoot's `collection-search-input.ts`) and the signup checkboxes.

## Spec

| Property | Value |
| --- | --- |
| Control size | 2rem (20px) |
| Hit area | `--ia-size-target-min` (44px) — including the label |
| Radius | checkbox `--ia-radius-sm` (2px); radio `--ia-radius-circle` |
| Border | `1px solid var(--ia-color-border-strong)` |
| Checked fill | `--ia-color-selected-strong-fill` (`#194880`) — the strong selected tier |
| Check mark | `--ia-color-action-primary-text` (white), 9.21:1 |
| Gap to label | `--ia-space-2` (10px) |
| Label | `--ia-font-size-md`, `--ia-color-text-primary` |

The 20px control is deliberately larger than the 15px native default — at 375px, a 15px
target inside a scrolling list of seventy, sitting flush against a second 15px control,
is a mis-tap generator.

## The hit area

The **whole row** is the target, not just the 20px box. Wrapping the control in its
`<label>` gets this for free and means the label text is clickable too:

```html
<label class="ia-choice">
  <input class="ia-choice__control" type="checkbox" name="mediatype" value="texts">
  <span class="ia-choice__label">Texts</span>
  <span class="ia-choice__count">52,243,983</span>
</label>
```

```css
.ia-choice {
  display: flex;
  align-items: center;
  gap: var(--ia-space-2);
  min-block-size: var(--ia-size-target-min);
  padding-inline: var(--ia-space-2);
  cursor: pointer;
}
.ia-choice:hover {
  background-image: linear-gradient(var(--ia-color-hover-overlay), var(--ia-color-hover-overlay));
}
.ia-choice:has(:focus-visible) {
  outline: var(--ia-size-focus-ring) solid var(--ia-color-border-focus);
  outline-offset: calc(var(--ia-size-focus-ring-offset) * -1);
}
```

The focus ring uses a **negative** offset here so it sits inside the row rather than
overlapping the neighboring rows in a dense list.

44px rows in a long facet list is a lot of vertical space. That is what the
facet panel's scroll container and "Show More" affordance are for — see
[facet-filter.md](facet-filter.md). It is not a reason to shrink the target.

## States

| State | Checkbox | Radio |
| --- | --- | --- |
| unchecked | white fill, `#666` border | same |
| hover | `--ia-color-hover-overlay` over the row | same |
| focus-visible | 2px ring, inset | same |
| checked | `#194880` fill, white check | `#194880` ring, `#194880` center dot |
| indeterminate | `#194880` fill, white dash | n/a |
| disabled | `--ia-color-surface-sunken` fill, `--ia-color-border-default` border, label `--ia-color-text-secondary` | same |

## Semantics

- Radios in a group share a `name` and live in a `<fieldset>` with a `<legend>`. The
  legend may be visually hidden but must exist.
- Checkbox groups also take a `<fieldset>`/`<legend>` — live's "Media Type" and
  "Collection" facets are `<section>`s labeled by a heading, not fieldsets, so the form
  has no grouping and each checkbox has to repeat its field in its own name
  ("mediatype: movies, 911 results").
- `indeterminate` is a JS property, not an attribute, and needs
  `aria-checked="mixed"` alongside it.
- Counts beside a facet label ("Texts 52,243,983") belong in the accessible name:
  `aria-label="Texts, 52,243,983 items"`. Otherwise a screen reader reads two
  disconnected strings.

## Custom controls

Use the native input, hidden with `appearance: none`, and draw the box on the input
itself — not `opacity: 0` with a sibling `<span>`. Keeping the real control in the
layout preserves keyboard behavior, form submission, `:checked`, `:indeterminate`,
`:disabled` and `forced-colors` rendering for free.

Under `forced-colors: active`, let the platform draw the control: reset the custom fill
and use `forced-color-adjust: auto`. A `#194880` background with a white SVG tick
becomes an invisible box in Windows High Contrast.

## Don't

- Don't use a checkbox for something that takes effect immediately and is binary —
  that is a [switch](switch.md).
- Don't use a radio group of one. Use a checkbox.
- Don't shrink the control to fit more rows.
- Don't rely on the fill color alone for the checked state; the tick must be there too,
  for `forced-colors` and for color-blind users.
