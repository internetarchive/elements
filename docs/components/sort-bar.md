# Sort bar

> **Use instead:** narrowing the set, not ordering it → [facets](facet-filter.md).

The bar above every result grid — search, collection and profile pages. Three controls:
sort direction, sort field, and the result view. Live it is `sort-filter-bar` inside
`collection-browser`, **1037×32** on desktop and **348×32** at 375px.

```
▲▼  Sort By: Weekly Views ⌄                                    ▦  ☰  ≡
│   │        │                                                 └ result view
│   │        └ sort field — a dropdown
│   └ label
└ sort direction
```

## Live

| Part | Live |
| --- | --- |
| Bar | `section`, flex, `align-items: center`, 32px tall; a **1px `#2c2c2c` rule** along the bottom |
| Direction toggle | `button` **30×28**, white, `1px solid #194880`, radius 5px, padding `7px 8px`, with a 12×19 glyph per state: ascending, descending, and disabled (the double arrow, border and glyph `#bbb`, under Relevance) |
| "Sort by:" | 14px/20px **700** `#2c2c2c` |
| Sort field | `ia-dropdown`, 96×28 — label 14px/28px **700** `#2c2c2c` with 5px left padding, then a 12×9 caret; see [dropdown.md](dropdown.md) |
| View switch | `ul` flex of three `li` **36×30**; each `button` padding `1px 6px` holding a 24px glyph |
| Active view | glyph `#2c2c2c`; the other two `#bbb` |

The glyphs are all lifted from the site: `sort`, `view-grid`, `view-detail` and
`view-list` in the [icon set](../foundations/iconography.md). Live draws the direction
glyph in three states — the up arrow dark and the down `#bbb` (ascending), the reverse
(descending), both `#bbb` (unavailable) — and leaves 4rem below the bar.

## Spec

| Part | Value |
| --- | --- |
| Bar | flex, wraps, `justify-content: space-between`, gap `--ia-space-2`; 1px `--ia-color-border-subtle` along the bottom |
| Direction toggle | `--ia-size-control-sm` square, `--ia-radius-default`, 1px `--ia-color-border-default`, `--ia-color-surface-raised`; the `sort` glyph at `--ia-size-icon-sm` |
| Direction glyph | `data-direction="asc"`: the up arrow in ink, the down in `--ia-color-border-default`; `"desc"`: the reverse; unavailable: both in `--ia-color-text-disabled` |
| Label | `--ia-font-size-md` / `--ia-font-weight-bold`, `--ia-color-text-primary`; a real `<label>` for the sort field |
| Sort field | `.ia-dropdown` — a native `<select>` |
| View switch | a [segmented control](segmented-control.md), `--sm`, icon-only: three `--ia-size-control-md`-wide options, 16px glyphs, which keep 2px clear of the chosen segment's edge (live draws 24px glyphs with no track around them) |
| Chosen view | raised out of the track in the soft selected tier — navy tint, navy edge, ink glyph (`--ia-color-text-primary`), `--ia-shadow-raised` |
| Other views | `--ia-color-text-secondary` on the sunken track |
| Below the bar | `--ia-space-4` to the results — live's 4rem leaves a gap wider than a tile's own padding many times over |

Controls keep their 30px size on a mouse and grow to 44px on a coarse pointer
([D-17](../DECISIONS.md#d-17)). 30px already clears the 24px WCAG 2.2 AA floor.

Departures from live:

- **The chosen view is marked by fill, edge and color**, and the unchosen glyphs are
  `--ia-color-text-secondary` (5.74:1) rather than `#bbb` (1.9:1). Live distinguishes
  the chosen view by glyph color alone, and its unchosen glyphs are below the 3:1 that
  WCAG 1.4.11 asks of a control's identifying graphic.
- **The bottom rule is `--ia-color-border-subtle`**, the divider every other bar in the
  system uses, rather than a full-strength `#2c2c2c` line.
- **Radius 4px**, not 5px ([D-13](../DECISIONS.md#d-13)).

## States

| State | Treatment |
| --- | --- |
| direction available | `aria-label` says what pressing it does: "Change to Ascending Sort" |
| direction unavailable | Relevance has no direction. The toggle stays in place so the bar does not shift, takes `aria-disabled="true"` and a sunken fill, and its `aria-label` says why: "Sort direction is not available for relevance" |
| hover | direction toggle border → `--ia-color-border-strong`; view glyph → primary |
| focus-visible | the universal ring |

Live already gets the direction toggle's accessible name right, and uses an `sr-only`
"Directions are not available for the current sort option" when it is disabled.

## Letter bar

Sorting by Title or Creator adds a letter bar under the sort bar — live's `alpha-bar`.
Each letter filters the results to those starting with it; choosing it again clears the
filter.

| Part | Spec | Live |
| --- | --- | --- |
| Bar | `.ia-alpha-bar`: `--ia-color-surface-sunken`, `--ia-radius-default`, padded `--ia-space-1 --ia-space-2`, `--ia-space-1` below the sort bar | `#ddd` with an inset shadow |
| Letters | A–Z spread edge to edge, each a square button up to 25px, `--ia-font-size-sm` | the same, 1.2rem `#333` |
| Hover | `--ia-color-hover-overlay` | `#c0c0c0` |
| Chosen | `--ia-color-selected-strong-fill`, white — the strong tier, since the letter is a filter the results depend on ([D-45](../DECISIONS.md#d-45)) | `#2c2c2c`, white |
| No results | `disabled`, `--ia-color-text-disabled` | `#aaa` |
| Below `md` | two rows of 13 | the same, at 768px and below |
| Tooltip | — | a count bubble on hover |

```html
<ul class="ia-alpha-bar" aria-label="Title Starting With">
  <li><button type="button" aria-pressed="false" aria-label="A: 412 results">A</button></li>
  …
  <li><button type="button" aria-pressed="false" aria-label="Q: 0 results" disabled>Q</button></li>
</ul>
```

The count is in each letter's accessible name, as live puts it (`aria-label="A: 412
results"`), so the hover tooltip isn't needed to learn it.

## Semantics

```html
<div class="ia-sort-bar">
  <div class="ia-sort-bar__sort">
    <button class="ia-sort-bar__direction" type="button"
            aria-label="Change to Ascending Sort"><svg class="ia-icon ia-icon--sm" …/></button>
    <label class="ia-sort-bar__label" for="sort-field">Sort By:</label>
    <select class="ia-dropdown" id="sort-field">…</select>
  </div>
  <div class="ia-segmented ia-segmented--sm" role="radiogroup" aria-label="Result View">
    <button class="ia-segmented__option ia-sort-bar__view" role="radio" aria-checked="true"  aria-label="Grid View">…</button>
    <button class="ia-segmented__option ia-sort-bar__view" role="radio" aria-checked="false" aria-label="List View">…</button>
    <button class="ia-segmented__option ia-sort-bar__view" role="radio" aria-checked="false" aria-label="Compact List View">…</button>
  </div>
</div>
```

- The view switch is a `radiogroup`: exactly one view is always chosen, arrow keys move
  the choice, and only the chosen button is in the tab order.
- The sort field is a native `<select>` labeled by "Sort By:". The platform supplies the
  keyboard behavior, typeahead, and the phone's own picker.
- Changing sort or view announces the new result politely and keeps focus on the
  control the user operated.

## Don't

- Don't reset scroll position on a sort change without saying so.
- Don't hide the direction toggle when it does not apply; disable it and say why.
- Don't signal the chosen view by color alone.
