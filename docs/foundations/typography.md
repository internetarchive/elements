# Typography

Six `<h1>` treatments, one per page. Twenty font sizes. Six weights. Four font stacks,
two of which are unstyled browser defaults. Two body line-heights competing at the same
14px on the same page. Typography is where archive.org's three UI generations collide
most visibly.

## The rem basis

archive.org sets the root font size to 10px (`html { font-size: 10px }` in offshoot's
`index.css`), so **1rem = 10px**. Every value in this
guide assumes that. It is a good convention — `1.4rem` reads as 14px — and it is not
changing, but the system writes it as `html { font-size: 62.5% }`: the same at the default
setting, and unlike a fixed 10px it follows the reader's browser font-size setting
([D-37](../DECISIONS.md#d-37)).

Two things about the base need fixing, and between them they account for four of the
twenty live font sizes:

**`<body>` is also 10px**, so nothing inherits a usable size and every component has to
set its own. Give `body` the `body` role and unstyled text lands somewhere sensible:

```css
body {
  font-family: var(--ia-font-family-base);
  font-size: var(--ia-font-size-md);
  line-height: var(--ia-font-line-height-normal);
}
```

**Form controls don't inherit type at all.** Without an explicit reset they fall back to
the UA default — Arial at 13.3333px — which is precisely where the live site's
`13.3333px` text comes from: search buttons, tile info buttons, checkboxes. One rule
removes the whole class of bug:

```css
button, input, select, textarea, optgroup {
  font: inherit;
  color: inherit;
  letter-spacing: inherit;
}
```

## One font stack

```css
font-family: var(--ia-font-family-base);
/* "Helvetica Neue", Helvetica, Arial, "Noto Sans", sans-serif */
```

Live ships two competing stacks in roughly equal volume:

```css
"Helvetica Neue", Helvetica, Arial, sans-serif          /* offshoot's theme, ia-topnav */
"Helvetica Neue", ui-sans-serif, system-ui, sans-serif  /* collection-browser's grid tiles */
```

On a Mac both resolve to Helvetica Neue and nobody notices. On Android or Linux, where
Helvetica Neue is absent, the first falls back to Arial/Liberation Sans and the second
falls back to Roboto or the system UI face — so the topnav and the search results
beneath it render in **different typefaces**. Standardizing on the legacy stack keeps
the rendering consistent and matches `--ia-theme-base-font-family`, which already
declares it. See [D-02](../DECISIONS.md#d-02).

`"Noto Sans"` sits ahead of the generic family for the scripts Arial lacks. Item titles
arrive in every script; without it, a Devanagari or Ethiopic title falls to whatever face
the platform picks for `sans-serif`, and one results page renders in several unrelated
typefaces.

Monospace, for identifiers, API responses and file names, is unchanged from live:
`--ia-font-family-mono`.

## The scale

Eight steps. Both ends already existed as tokens — `1.4rem` is
`--ia-theme-font-size-standard` and `3.6rem` is `--ia-theme-font-size-lg` — so the scale
fills in between rather than replacing anything.

| Token | rem | px | Absorbs these live sizes |
| --- | --- | --- | --- |
| `--ia-font-size-xs` | 1.1 | 11 | 10, 11 |
| `--ia-font-size-sm` | 1.2 | 12 | 12, 13, 13.333 |
| `--ia-font-size-md` | 1.4 | 14 | 14 — unchanged, the body size everywhere |
| `--ia-font-size-lg` | 1.6 | 16 | 16, 17 |
| `--ia-font-size-xl` | 2.0 | 20 | 18, 20, 21, 22 |
| `--ia-font-size-2xl` | 2.4 | 24 | 24, 26 |
| `--ia-font-size-3xl` | 2.8 | 28 | 28, 30 |
| `--ia-font-size-4xl` | 3.6 | 36 | 35, 36 |

There is no step below 1.1rem. The live `8px` and `9px` text — the view/favorite counts
on item pages — is too small to read and is not preserved. Use `xs`.

## Two weights

| Token | Value | Use |
| --- | --- | --- |
| `--ia-font-weight-regular` | 400 | body, button and chip labels, display titles, almost everything |
| `--ia-font-weight-bold` | 700 | headings, tile titles, field labels, strong emphasis |

Live also uses 200, 300, 500 and 600. All four are retired. [D-03](../DECISIONS.md#d-03)

Two weights because they are the two every fallback font has. Without Helvetica Neue — on
Windows and most Linux desktops — the stack falls to Arial or Liberation Sans, neither of
which has a medium face, so a 500 renders as 400 and any emphasis it carried disappears.
Where the hierarchy needs a step, it is size or 700, which survive everywhere.

The case against 200/300 is concrete rather than aesthetic: they are used at 24–36px for
page titles (`h1 35px/200` on collection pages, `36px/200` on profiles), and Helvetica
Neue Thin/Light is not installed on most Android and Linux machines, so those titles
silently render at 400 for a large share of visitors. The design intent does not survive
the fallback. 600 is all but unused.

## Line heights

| Token | Value | Use |
| --- | --- | --- |
| `--ia-font-line-height-tight` | 1.25 | headings; dense UI — tile titles, facet labels, table cells; button, chip, tab and trigger labels |
| `--ia-font-line-height-normal` | 1.45 | body copy |
| `--ia-font-line-height-relaxed` | 1.6 | long-form prose, item descriptions |

Control labels take `tight` so a label that wraps to a second line — a long translation, a
coarse-pointer layout — keeps its descenders. One-line controls take their height from `--ia-size-control-*`, not from the
line height.

Live has two body line-heights at 14px: `14/20` (1.43) on offshoot's `body` and `14/17`
(1.21) in collection-browser's tile stats, both on the same search page. 1.45 wins — it matches the
larger of the two and reads better at 14px. [D-04](../DECISIONS.md#d-04)

Result-tile titles are currently `14/15` (collection-browser's
`tile-grid-shared-styles.ts`), a ratio of 1.07, which clips descenders on
wrapped two-line titles. `tight` (1.25) is the replacement.

## Type roles

**This is the important part.** Heading *level* is document structure. Heading
*appearance* is a role. They are decided separately.

```html
<!-- correct: an h2 in the outline, styled as a page title -->
<h2 class="ia-type-page-title">Search results</h2>

<!-- wrong: an h1 chosen because it happened to look right -->
<h1 class="stat">230.2M</h1>
```

| Role | Size | Weight | Line-height | Steps down below 890px |
| --- | --- | --- | --- | --- |
| `.ia-type-display` | 3.6rem | 400 | 1.25 | 2.8rem |
| `.ia-type-page-title` | 2.8rem | 700 | 1.25 | 2.4rem |
| `.ia-type-section` | 2.0rem | 700 | 1.25 | — |
| `.ia-type-subsection` | 1.6rem | 700 | 1.25 | — |
| `.ia-type-overline` | 1.4rem | 700 | 1.25 | — (uppercase, 0.05em tracking) |
| `.ia-type-body` | 1.4rem | 400 | 1.45 | — |
| `.ia-type-body-strong` | 1.4rem | 700 | 1.45 | — |
| `.ia-type-prose` | 1.6rem | 400 | 1.6 | — |
| `.ia-type-meta` | 1.2rem | 400 | 1.45 | — |
| `.ia-type-caption` | 1.1rem | 400 | 1.45 | — |

`overline` corresponds to the live uppercase section labels — "DOWNLOAD OPTIONS",
"SIMILAR ITEMS", "IN COLLECTIONS" — which offshoot's details page sets at 14px/700, two as
`<h1>`s and one as an `<h2>`.

### Mapping the live headings

| Page | Live `<h1>` | Becomes |
| --- | --- | --- |
| Homepage | 26px / 300 | `h1.ia-type-page-title` |
| Search results | 28px / 700 | `h1.ia-type-page-title` — already correct |
| Collection landing | 35px / 200 | `h1.ia-type-display` |
| Item details (title) | 30px / 500 | `h1.ia-type-display` — 400, as Windows already renders it |
| Item details, petabox (stat counts, ×27) | 9px / 200 | `<span class="ia-type-caption">` — not a heading at all |
| Item details ("DOWNLOAD OPTIONS") | 14px / 700 | `h2.ia-type-overline` |
| User profile | 36px / 200 | `h1.ia-type-display` |
| Signup | 24px / 500 | `h1.ia-type-page-title` |

A page has exactly one `<h1>`. petabox's `/details/goody` has **thirty-two** (offshoot's details page, three), twenty-seven
of which are view and favorite counts. To a screen reader that page has no usable
outline. [D-05](../DECISIONS.md#d-05)

## Responsive behavior

Only the two largest roles step down, and only at the `lg` (890px) breakpoint. Everything
from `section` downward is the same size at 375px as at 1280px — body text does not get
smaller on small screens.

The live item title is `30px` at 375px with no step-down (offshoot's `details-page.ts`), which costs roughly a third of
the line on a phone. `display` fixes that.

**Form inputs are the exception in the other direction:** they render at 16px at and
below the `md` breakpoint regardless of role, because iOS Safari zooms the viewport when
a focused input is under 16px. See [components/input.md](../components/input.md).

## Numbers

**Anything that counts takes tabular figures**: views, favorites, file sizes, item counts,
result totals, pagination and any number that updates in place. In proportional figures a
`1` is narrower than an `8`, so a right-aligned column of counts doesn't line up and a
changing count makes its neighbors jitter.

```css
font-variant-numeric: tabular-nums;   /* or the .ia-tabular-nums utility */
```

The facet counts, tile stats, badges, pagination and `.ia-results-heading` already set it.

## Truncation

Use `-webkit-line-clamp` with a fallback, never a fixed height with `overflow: hidden`.
Tile titles clamp to two lines; result-list titles clamp to three. A clamped title keeps
its full text in the accessible name — clamping is visual only.

## Don't

- Don't set a font size that is not on the scale. If you need something between two
  steps, you probably need a different role.
- Don't pick a heading level for its appearance. Pick the level for the outline, then
  add the role class.
- Don't use weight 200 or 300. They do not survive font fallback.
- Don't set `line-height` in px. The ratios above scale with the size; `15px` does not.
