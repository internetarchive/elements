# Card

> **Use instead:** a search or collection result → [tile](item-tile.md). A notice → a
> message ([alert](alert.md)). A box for its own sake → a heading or a divider.

A card is a bounded surface that groups related content. Item tiles are a specialized
card and have [their own page](item-tile.md), collection tiles included; this covers
everything else — the homepage "New to the Archive?" panels, the Archive News block, the
Wayback Machine hero, info boxes.

## Spec

| Property | Value |
| --- | --- |
| Background | `--ia-color-surface-raised` |
| Radius | `--ia-radius-lg` (8px) for media cards; `--ia-radius-default` (4px) for content panels |
| Border | 1px `--ia-color-border-subtle` |
| Padding | `--ia-space-4`; `--ia-space-3` at and below `md` |
| Elevation | `--ia-shadow-raised`; `--ia-shadow-hover` only if the card is interactive and hovered |
| Gap between cards | `--ia-space-4` |

Border **or** shadow, not both at full strength — a card with a visible border and the
`hover` shadow reads as two boundaries. Default to border plus `raised`.

## Variants

**Content panel** — the Archive News block, info boxes. 4px radius, border, no shadow.
Not interactive.

**Media card** — "New to the Archive?" panels. 8px radius, image or
icon at the top, `raised` → `hover` shadow on hover, the whole card is one link.

**Not a card: the collection tile.** The `#666` panels on the homepage and collection
pages look like a dark card variant, but they are the `collection` variant of the tile
component — same skeleton as the item tile, different skin. They are specified in
[item-tile.md](item-tile.md#the-two-variants), not here. Don't build a second thing
that happens to look like one.

**Hero panel** — the Wayback Machine block. `--ia-color-brand-wayback` (`#fcf5e6`)
background, 8px radius, `--ia-space-6` padding. This is the only place the cream is
used and it should stay that way.

The live hero is iaux's `ia-wayback-search` (1.0.4, as offshoot's homepage and the
topnav's Web menu load it). `@internetarchive/elements` 1.1.6 ports it as
`ia-wayback-search-form`, which offshoot (on elements 1.1.2) doesn't use yet. Both depart
from this spec the same way:

| Live | This system |
| --- | --- |
| `3px 3px 0 0 #c3ad97` drop shadow on the fieldset | none, the cream is the panel ([D-14](../DECISIONS.md#d-14) retires opaque offset shadows) |
| 7px radius, `0.7rem 2rem` padding | `--ia-radius-lg` (8px), `--ia-space-6` |
| intro text at weight 200, the count at 500 | 400 and 700 ([D-03](../DECISIONS.md#d-03)) |
| focused field: `border-color: #66afe9; outline: none` | the universal focus ring ([D-19](../DECISIONS.md#d-19)) |
| field text `--ia-theme-secondary-text-color` (`#666`) in both; `#8e8e8e` (3.28:1 on white) in iaux's topnav copy | `--ia-color-text-primary`, placeholder `--ia-color-text-secondary` |
| colors from the topnav's variables (`--grey80`, `--themeFontFamily`, `--activeColor`, `--iconFill`) | tokens; mounted outside the topnav those variables are unset and the field's border declaration is invalid |

## Interactive cards

If the whole card navigates, the card **is** the link — one `<a>` wrapping the content,
not a `<div>` with a click handler. If there are secondary actions inside, use the
pattern from [item-tile.md](item-tile.md#hit-area-and-structure): the link is a sibling
of the actions and stretched over the card with a pseudo-element.

```css
.ia-card__link::after { content: ''; position: absolute; inset: 0; }
.ia-card { position: relative; }
.ia-card__action { position: relative; z-index: 1; }  /* lifts above the stretched link */
```

Focus goes on the card, not on the invisible stretched area:

```css
.ia-card:has(.ia-card__link:focus-visible) {
  outline: var(--ia-size-focus-ring) solid var(--ia-color-border-focus);
  outline-offset: var(--ia-size-focus-ring-offset);
}
```

## Internal structure

```
--ia-space-4  padding
  header   .ia-type-subsection      (h2/h3/h4 — level from the outline)
  --ia-space-2
  body     .ia-type-body
  --ia-space-3
  actions  right-aligned, --ia-space-2 gap
```

A card's heading level follows the document outline, never the card's visual weight.

## Don't

- Don't nest cards.
- Don't put a shadow on a non-interactive card that never changes.
- Don't mix 4px and 8px radii on sibling cards in one grid.
- Don't use a card purely to draw a box around something — a border or a heading is
  usually enough, and a page of cards has no hierarchy.
