# Accessibility

The target is **WCAG 2.2 level AA**. This page is the shortlist of what is broken on
live archive.org, plus the rules that keep it fixed.

## Focus: the biggest problem on the site

Focus has to be checked by pressing Tab and reading the computed outline at each stop, because
reading CSS is not enough — `:focus-visible` only matches real keyboard focus, and later
rules routinely undo earlier ones.

**Half the keyboard stops on the live desktop pages have no visible focus indicator.**
That includes the entire media menu (Web / Texts / Video / Audio / Software / Images),
the login and upload controls, and the search input — ia-topnav sets `outline: none` on
each — i.e. most of the navigation, on every page.

Where an indicator does survive it is the browser default ring, at a scatter of
width/offset combinations.

### The rule

One focus style, everywhere, non-negotiable:

```css
:focus-visible {
  outline: var(--ia-size-focus-ring) solid var(--ia-color-border-focus);
  outline-offset: var(--ia-size-focus-ring-offset);
  border-radius: inherit;
}
```

- 2px solid `#3a4fd6`, offset 2px. On dark chrome, `.ia-inverse` re-points
  `--ia-color-border-focus` to `#9aa8ff` automatically.
- Both values clear 3:1 against every surface in the system (WCAG 1.4.11).
- The offset is what makes the ring visible on a dark button — without it the ring sits
  on the fill and disappears.
- Where a container clips or wraps the control — a facet row, a choice, the search
  field, a menu item — the ring is inset instead (a negative offset), so it is drawn
  inside the edge rather than cut off.
- `:focus-visible`, not `:focus`, so mouse users don't see rings on click.

**`outline: none` is only ever acceptable when the same rule provides a replacement
indicator of equal or greater visibility in the same declaration block.** Every other
use is a bug. Grep for it before shipping:

```bash
grep -rn "outline:\s*\(none\|0\)" --include=*.css --include=*.scss --include=*.ts .
```

### Inside shadow DOM

`:focus-visible` inside a shadow root does not inherit the document's rule. Every
component's own stylesheet needs the block above. The shared style sheet in
`ia.css` covers the light DOM only.

## Contrast

The live pairings that fail are all fixed in [color.md](color.md). The two rules that
prevent regressions:

1. **Check against the surface the color is actually on**, not against white. `#4b64ff`
   passes on white at 4.60:1 and fails on the `#fbfbfd` page background at 4.45:1 and
   the `#f1f1f4` sunken surface at 4.08:1. Most of archive.org is not white.
2. **Run the checker.** `src/themes/tokens.node.test.ts` covers all 99 recommended
   pairings and exits non-zero on failure. Add new roles to it in the same commit.

Minimums: 4.5:1 normal text · 3:1 text ≥24px or ≥18.66px bold · 3:1 UI component
boundaries and focus indicators · disabled controls exempt.

## Pointer targets

Two floors, because a mouse and a thumb are not the same instrument:

| Pointer | Minimum hit area | Why |
| --- | --- | --- |
| **coarse** (touch) | **44 × 44** | the practical minimum for a thumb; what Apple's and the WCAG informative guidance both use |
| **fine** (mouse, trackpad, stylus) | **24 × 24** | WCAG 2.2 AA 2.5.8, the conformance floor |

In practice that means dense desktop UI — a facet row, a toolbar select, a `sm` button —
may be 30–36px on a mouse, and **must** expand to 44 on touch:

```css
@media (pointer: coarse) {
  .ia-button, .ia-input, .ia-select, .ia-choice, .ia-chip, .ia-tab {
    min-block-size: var(--ia-size-target-min);
  }
}
```

Use `pointer: coarse`, not a width breakpoint: a touch laptop is wide and coarse, and a
phone in landscape is not narrow.

The visual control may be smaller than its hit area. Expand with padding, or with a
pseudo-element when padding would break the layout:

```css
.ia-icon-button::after {
  content: '';
  position: absolute;
  inset: 50% auto auto 50%;
  translate: -50% -50%;
  min-inline-size: var(--ia-size-target-min);
  min-block-size: var(--ia-size-target-min);
}
```

Spacing counts toward the target: two adjacent 44px buttons with nothing between them
are still two mis-taps waiting to happen. Leave at least `--ia-space-1`.

A link inside running text is exempt from both floors — it is sized by its text, and
WCAG 2.5.8 says so explicitly. A link acting as a control (a tile, a nav item, a facet
row) is not exempt.

At 375px — where the pointer is coarse and 44 applies — live has sub-44px targets on
every page: `15×12` "Search inside" and "Fullscreen view" on the item page, `24×24` tile
info buttons, `25×25` Share and RSS, `20×30` media-type dropdown rows, `15×15` facet
checkboxes in 24px rows (collection-browser's facet row), and `13×13` radios on the
collection page and checkboxes on signup. Several are under 24 and so fail on a mouse too.
[D-17](../DECISIONS.md#d-17)

## Headings

petabox's legacy `/details/goody` renders **32 `<h1>` elements**, 27 of them view and
favorite counts at 9px (offshoot's details page has three). A screen reader's heading
outline for that page is unusable.

- One `<h1>` per page: the page's subject.
- Levels descend without skipping. `<h2>` follows `<h1>`, `<h3>` follows `<h2>`.
- **Level is structure; appearance is a class.** See
  [typography.md](typography.md#type-roles).
- A number, a count or a label is not a heading. Use a `<span>` or a `<dt>`.

## Names and labels

- Every form control has a `<label>` with a `for`, or wraps its control. Placeholder
  text is not a label — it disappears on input and fails 3.3.2.
- Icon-only controls carry an `aria-label`. The live topnav mostly doesn't: ia-topnav
  names its icon buttons with `title` and the glyph's own `<title>`, and only the login
  toggle has an `aria-label`.
- A visible label and the accessible name must match — the visible text should be the
  start of the accessible name (2.5.3).
- Link text stands alone. "More…" appears once per facet group on a search page
  (collection-browser's `collection-facets.ts`) with no distinguishing context; give each
  an `aria-label` naming the facet it expands.

## Semantics and landmarks

- One `<main>`, with the skip link pointing at it. The live skip link works (offshoot's
  `app-root.ts`, targeting `#maincontent`).
- `<nav>` for navigation blocks, each with an `aria-label` when there is more than one.
- Buttons that do things are `<button>`. Things that navigate are `<a href>`. Live has
  `<div class="drop-zone">` with `role="button"` (offshoot's avatar uploader) and `<a>`
  elements styled as buttons in both directions.
- Facet checkboxes belong in a `<fieldset>` with a `<legend>`, not a bare list.

## Forms

The signup page — the highest-stakes form on the site — leaves its inputs to the browser
(offshoot's `ia-signup-form.ts`), so they draw `border: 2px inset #767676`. Beyond looking
unfinished, that means no focus state of its own, and an error is a red border and red
text, nothing more.

- Errors are announced: `aria-invalid`, `aria-describedby` pointing at the message, and
  a `role="alert"` region for form-level errors.
- Errors are never color-only. Icon plus text, always.
- Required fields are marked in text, not with a bare asterisk.
- Inputs are ≥16px at and below `md` so iOS does not zoom the viewport on focus.

## Motion and contrast preferences

- `prefers-reduced-motion` is honored globally — see [motion.md](motion.md). Live honors
  it only in a few components, never globally.
- `forced-colors: active` — test that icons
  drawn with `background-color` don't vanish; use `currentColor` fills or
  `forced-color-adjust`.

## Zoom and reflow

Content must reflow to a 320px-equivalent viewport at 400% zoom without a second
scrollbar (1.4.10). The homepage carousel overflow breaks this today. Text must survive
`letter-spacing: 0.12em` / `word-spacing: 0.16em` / `line-height: 1.5` without clipping
(1.4.12) — which is the other reason tile titles move off a 1.07 line-height.

## The checklist

Before shipping a component — and put it in the Playground (`playground.html` in the demo),
which runs the alignment, overflow and coarse-pointer checks for you:

- [ ] Tab to it. The focus ring is visible, 2px, offset 2px.
- [ ] Operate it with the keyboard alone. Enter and Space where expected; Escape closes.
- [ ] `pnpm run test` passes, including `src/themes/tokens.node.test.ts`.
- [ ] Every target is ≥44×44 at 375px, and ≥24×24 at 1280px.
- [ ] Heading levels descend; appearance comes from a role class.
- [ ] Every control has a programmatic name.
- [ ] It works at 400% zoom with no horizontal document scroll.
- [ ] A label three times longer than designed, an unbroken URL and a CJK string all fit
      without overflowing.
- [ ] It mirrors under `dir="rtl"`, and every icon, chevron and close button ends up on the
      correct side.
- [ ] It is usable with `prefers-reduced-motion: reduce`.
