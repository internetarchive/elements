# Responsive

## Breakpoints

Four. See [layout.md](../foundations/layout.md#breakpoints) for why these four, and why
890px survives despite being an odd number.

| | | What changes |
| --- | --- | --- |
| base | <480 | single column; compact chrome; 16px inputs |
| `sm` | 480 | second column appears in result grids |
| `md` | 768 | wider gutters; inputs return to 1.4rem; two-column content |
| `lg` | 890 | topnav goes desktop; facet rail appears; `display` and `page-title` step up |
| `xl` | 1200 | widest grid tier; the page container stops growing |

Mobile-first, `min-width` only. The unqualified styles are the 375px styles.

## What changes and what doesn't

**Changes with width**

| | base / sm | lg and up |
| --- | --- | --- |
| Topnav | hamburger, icon search | full media menu, inline search |
| Facet rail | a closed "Filters" accordion above the results | 210px sticky column |
| Result grid | 2–3 across | 5–6 across |
| `.ia-type-display` | 2.8rem | 3.6rem |
| `.ia-type-page-title` | 2.4rem | 2.8rem |
| Page gutter | `--ia-space-3` | `--ia-space-4` |
| Section spacing | `--ia-space-6` | `--ia-space-12` |
| Primary buttons in forms | full width | auto width |
| Modal actions | stacked, primary on top | inline, primary last |

**Does not change**

- Body text stays 1.4rem at every width. Small screens do not get smaller text.
- Spacing steps below `--ia-space-8` are the same everywhere.
- Radii, shadows, border widths, focus rings.
- The pointer-target floors: 44×44 wherever the pointer is coarse, 24×24 everywhere.

## Inputs zoom iOS

Any input, textarea or select **at or below `md`** renders at 16px. Below that, iOS
Safari zooms the viewport on focus and the user has to pinch back out. The live signup
form (offshoot's `ia-signup-form`) already renders at 16px; this makes it a rule.

## Horizontal overflow

At 375px the homepage document is **441px wide** — it overflows by 66px, from the "New to
the Archive?" carousel (offshoot's `basic-carousel`), a fixed 1.75 tiles of 240px plus
its arrows, centered, whose track extends past the viewport instead of being clipped to it.

A horizontally scrolling **region** is fine and often right: the search page's tab strip
scrolls inside its wrapper, and that is correct. A
horizontally scrolling **document** never is.

```css
.ia-scroll-track {              /* the wrapper, bounded to the container */
  overflow-x: auto;
  scroll-snap-type: inline proximity;
  scrollbar-width: none;
}
.ia-scroll-track > * { scroll-snap-align: start; }
```

The wrapper is constrained to the container; the track scrolls inside it. Give the
wrapper `tabindex="0"` and an `aria-label` so a keyboard user can scroll it — with
`scrollbar-width: none` and no focusable wrapper, the far end is unreachable without a
pointer.

Check with:

```js
document.documentElement.scrollWidth === document.documentElement.clientWidth
```

## Touch and pointer

Use capability queries, not width, for anything about input:

```css
@media (pointer: coarse) { .ia-button { min-block-size: var(--ia-size-target-min); } }
@media (hover: hover)    { .ia-tile:hover { box-shadow: var(--ia-shadow-hover); } }
```

A touch laptop is wide and coarse; a phone in landscape is not narrow. Live already
uses `screen and (pointer: coarse) and (hover: none)` — throughout petabox's legacy CSS,
and on collection-browser's item tiles — which is the right instinct.

Nothing may be reachable **only** by hover. A hover-revealed action needs a persistent
affordance on touch.

## Orientation and zoom

- Never lock orientation (WCAG 1.3.4). A phone in landscape is 812×375; the facet rail
  should not appear there just because the width crossed 768.
- Content reflows to a 320px-equivalent viewport at 400% zoom with no second scrollbar
  (WCAG 1.4.10). Testing at 1280px and 375px catches most of this; test 400% zoom for
  anything with a fixed pixel width.
- Use `dvh`, not `vh`, for anything full-height. Mobile browser chrome makes `vh`
  wrong by the height of the address bar.

## Testing

Minimum manual pass for any change:

- [ ] 375×812 — no horizontal document scroll, all targets ≥44×44
- [ ] 768×1024 — the layout between the two extremes is not broken
- [ ] 1280×900 — the reference desktop, all targets ≥24×24
- [ ] 1440+ — the container caps and content does not stretch
- [ ] 400% zoom at 1280 — content reflows, nothing is cut off
