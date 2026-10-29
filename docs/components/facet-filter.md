# Facet / filter panel

> **Use instead:** one exclusive choice → radios or a
> [segmented control](segmented-control.md). Changing the order, not the set → the
> [sort bar](sort-bar.md).

The filter rail on search, collection and profile pages. It is the densest part of the
interface — six groups of six values, each with two controls, plus a date histogram —
and it is where the compact density from
[spacing.md](../foundations/spacing.md#density) applies.

## Anatomy

```
  Clear All Filters                         ← once anything is applied
  Year Published                            ← group heading, .ia-type-subsection
   ▁▃▅█▅▃▁  [1793] – [2026]                 ← histogram, then the year inputs
  Part Of                                   ← collection pages: parent collections, as links
   Internet Archive
  ──────────────────────────────────
  Media Type
   ☑ ◌ Movies                     912       ← checkbox, eye, label, count
   ☐ ◌ Texts                      158
   … six values in all
   Show More Media Types                    ← opens "Select Filters"
```

Groups run in collection-browser's order: the Year Published histogram, then Media Type,
Year, Subject, Collection, Creator and Language. A collection page adds **Part Of** — its
parent collections, as plain links — under the histogram. TV searches have their own
groups and order.

## Spec

| Part | Treatment |
| --- | --- |
| Rail width | 21rem (210px) above `lg` — live is 180px ([D-42](../DECISIONS.md#d-42)); below `lg`, an accordion above the results ([Narrow](#narrow)) |
| Group heading | `.ia-type-subsection` (1.6rem / 700) |
| Group gap | `--ia-space-4` |
| Values shown | six per group, as live (`allowedFacetCount`); the rest behind "Show More" |
| Row | `.ia-facet-row`: the checkbox, the eye, then a `<label>` holding the value and its count. `--ia-size-control-sm` (30px) on a fine pointer, `--ia-size-target-min` (44px) on a coarse one ([D-17](../DECISIONS.md#d-17)) |
| Eye | `.ia-facet-row__hide`, its own square target between the checkbox and the label. The open `eye` at 30% opacity at rest; the closed `eye-off`, at full strength, on hover and while the value is hidden |
| Row hover | `--ia-color-hover-overlay` — visible on a sunken surface, where a sunken fill is not |
| Label | `--ia-font-size-md` — live is 1.2rem/500, which is small for a primary control ([D-42](../DECISIONS.md#d-42)). Collection values are links to the collection |
| Count | `.ia-choice__count`: `--ia-font-size-sm`, `--ia-color-text-secondary`, right-aligned, tabular figures |
| Clear | "Clear All Filters", a link-style button (`IAButton` with `mode="link"`; `.ia-button--link` in static HTML), at the head of the rail once any value is chosen, hidden, or a date range is set |
| Panel background | none |
| Divider | `--ia-border-divider` between groups |

Live group headings are `h3` at 14px/700, which is close to `.ia-type-subsection` and
only needs the size bumped. Live rows are **180×24** with `2.5px 0` padding and a
**15×15** checkbox (collection-browser's `facet-row-template.ts`); the label and count
are **1.2rem/500**. Rows become 44px on touch
(see [D-17](../DECISIONS.md#d-17)), and the label moves to 1.4rem — 12px at weight 500
is a small target for the densest control on the site.

The live rail is 180px wide (collection-browser's `--leftColumnWidth`, 18rem). The spec
widens it to 210px because 44px rows and a 1.4rem
label need the room: beside the checkbox, the eye and the count, a 180px row leaves the
label about 80px — roughly 11 characters at 1.4rem — and 210px leaves about 110px,
roughly 15. A long count ("52,243,983") takes another 40px or so.

Forty-four-pixel rows make the rail taller. That is the point of the six-value limit and
of the rail being independently scrollable above `lg`
(`position: sticky; max-block-size: calc(100dvh - <header>); overflow-y: auto`).

**The eye at rest is 30% of `--ia-color-text-primary` — about 1.6:1, under the 3:1 a
control's graphic needs (WCAG 1.4.11).** That is live's choice, kept so the row reads as
a checkbox and a label first. The label beside it names the row, the eye's accessible
name says what it does, and it reaches full strength on hover and once pressed.

## Two controls per row

Each live facet row carries **two** interactive controls, not one:

```
div.facet-row-container            180×24
  div.facet-checkboxes             35×15
    input.select-facet-checkbox    15×15   ← include this facet
    div.hide-facet-container       15×15
      input.hide-facet-checkbox    15×15   ← hide (exclude) this facet
      label.hide-facet-icon                  (the eye)
  label.facet-info-display         140×17
    div.facet-title                120×17  1.2rem/500  "movies"
    div.facet-count                 20×17  1.2rem/500  "911"
```

The second **hides** the value: it negates the facet rather than selecting it. The two
are exclusive — hiding a value clears its checkbox, and checking it un-hides it.

Two adjacent 15×15 controls 5px apart is the worst target geometry on the site: they
are under both floors and barely separated. The spec gives each its own
30px square on a fine pointer and 44px on a coarse one, so the row grows with them.

Their accessible names say which is which: the checkbox is labeled by the row — "Movies
912 items" — and the eye is `aria-label="Exclude Movies"`, `aria-pressed`. Live gets the
second right already (`Hide mediatype: movies` in an `sr-only` span).

## Semantics

Every group is a `<fieldset>` with a `<legend>`:

```html
<fieldset class="ia-facet-group">
  <legend class="ia-facet-group__legend ia-type-subsection">
    <button class="ia-facet-group__toggle" type="button" aria-expanded="false">…caret…Media Type</button>
    <span class="ia-facet-group__title">Media Type</span>
  </legend>
  <div class="ia-facet-row">
    <input class="ia-choice__control" type="checkbox" id="mt-texts" name="mediatype" value="texts">
    <button class="ia-facet-row__hide" type="button" aria-pressed="false" aria-label="Exclude Texts">
      <svg class="ia-icon ia-facet-row__eye" …/><svg class="ia-icon ia-facet-row__eye-off" …/>
    </button>
    <label class="ia-facet-row__label" for="mt-texts">
      <span class="ia-choice__label">Texts</span>
      <span class="ia-choice__count">52,243,983<span class="ia-visually-hidden"> items</span></span>
    </label>
  </div>
  …
  <button class="ia-button ia-button--link ia-facet-more" type="button" aria-haspopup="dialog">Show More Media Types</button>
</fieldset>
```

- Live wraps each group in a `<section>` labeled by its `h3`, not a fieldset, so the
  form has no grouping; each checkbox carries its field in its own name instead
  ("mediatype: movies, 911 results").
- The legend holds the group's name twice: as the caret toggle that collapses it on
  narrow screens, and as plain text everywhere else. Only one is ever displayed.
- The count goes into the accessible name — the label's text reads "Texts 52,243,983 items".
- **"Show More" names its group.** Live puts an identical "More..." button under every
  group; each is a separate, indistinguishable destination in a screen reader's
  controls list.

## The full list

"Show More" opens every value of the group in a modal — live's `more-facets-content` in
`modal-manager`, collection-browser 4.8. It is `.ia-modal.ia-modal--lg` (85rem) with the
header band, titled **Select Filters**; inside, `.ia-more-facets`:

| Part | Spec | Live |
| --- | --- | --- |
| Heading | the group's name, `--ia-font-size-xl` bold | 1.8rem bold |
| Sort | "Sort by:" and an `.ia-segmented--sm`: Count, or the group's own order (A–Z, or newest year first) | a `toggle-switch`, Count ⇄ the group's name |
| Filter | "Filter by:" and an `.ia-input--sm` search field, 16rem: "Search subjects…" narrows the values as you type, matching their visible text | `ia-clearable-text-input`, 16rem |
| Chosen | every selected or hidden value as a chip with a check or a closed eye and a remove button ("Deselect Buster Keaton", "Unhide 1920s"); about three rows, then it scrolls | the same, `chiclet`s |
| Values | facet rows in 25rem columns of twelve that scroll sideways and snap a page at a time, with previous and next page buttons either side | 250px columns of 12, virtualized |
| Nothing matches | "No matching values found." in a `role="status"` | the same |
| Failed | "Sorry, these values couldn’t be loaded. Please try again later." in a `role="alert"` | the same |
| Actions | Cancel (secondary) and Apply Filters (primary), centered under the values | `#2c2c2c` and `#194880` buttons |

Nothing applies until **Apply Filters**; Cancel, Escape and the close button discard
what changed. A value checked in the rail before opening shows as chosen.

**Checked rows move to the top only the next time a list opens** — the rail's six and
the modal's columns — never while it is open, so a row never moves under the pointer.
Live's rail moves them at once; its modal leaves them in place.

## Applying filters

Results update without a page reload, so the change has to be announced:

```html
<h2 class="ia-results-heading" aria-live="polite">1,200 Results</h2>
```

- Focus stays on the control the user just operated. Never move it to the results.
- The result count updates politely, debounced — not on every keystroke of a range
  slider. It is the results heading above the sort bar
  ([page-shells.md](../patterns/page-shells.md#2-browse--search-collection-landing-user-profile)).
- There are no applied-filter chips. What is applied shows in the rail itself — checked
  boxes, closed eyes, the range — and **Clear All Filters** at the rail's head resets
  all of it. On a narrow screen it sits beside the Filters heading.

## The date histogram

The year range control is a dual-thumb slider over a bar chart. Both thumbs are
keyboard operable (`role="slider"`, `aria-valuemin` / `aria-valuemax` / `aria-valuenow`
/ `aria-valuetext="1793"`), Arrow keys step by one year, Page Up/Down by ten, Home/End
to the ends.

The histogram bars are decorative — `aria-hidden` — and the numeric inputs beside the
slider are the accessible path to an exact range. Live provides those inputs at
**40×20** with a 2px radius and a `0.5px solid #2c2c2c` border; they become
`.ia-input--sm` (30px, 4px radius, `--ia-color-border-strong`).

### The live component

collection-browser 4.8 — the version offshoot locks — draws the chart with
`ia-histogram-date-range` from `@internetarchive/elements`, which is what the Claude
Design card `IAHistogramDateRange` renders. Earlier releases used
`<histogram-date-range>` from `@internetarchive/histogram-date-range`; the two draw the
same chart. Above `lg`, an
expand button beside the heading opens the chart full size in a "Select a date range"
modal. The reference implementation in `ia.css` (`.ia-facet-histogram`) is a static
picture of the chart; the component is the working control. Its colors are its own
variables, not `--ia-theme-*`. The table is its defaults; the card sets those variables
from tokens — `border-strong` bars in range, `border-default` out of range, `text-link`
handles, a `surface-sunken` band:

| Part | `ia-histogram-date-range` | This spec's picture |
| --- | --- | --- |
| Chart | 180×40 (collection-browser passes `width` 180, or the rail's width when facets collapse) | 210×40, the rail's width |
| Bars in range | `#2c2c2c` (`--histogramDateRangeBarIncludedFill`) | `--ia-color-border-strong` (`#666`) |
| Bars out of range | `#ccc` (`--histogramDateRangeBarExcludedFill`) | — |
| Selected range | a `#dbe0ff` band (`--histogramDateRangeSelectedRangeColor`) | — |
| Thumbs | two draggable `#4b65fe` handles (`--histogramDateRangeSliderColor`) | not drawn |
| Year inputs | 40×20, 12px, 2px radius | `.ia-input--sm`: 30px tall, 4px radius |

`#4b65fe` and `#dbe0ff` are close to, but not, the legacy `--ia-color-legacy-blue-500`
(`#4b64ff`); neither has a token.

## Narrow

Below `lg` the rail becomes an accordion above the results, as live's
`#mobile-filter-collapse` is:

- A **Filters** heading with a caret (`.ia-facets__toggle`, `aria-expanded`), closed by
  default; "Clear All Filters" beside it once anything is applied.
- Opened, the groups stack at full width, each closed under its own caret
  (`.ia-facet-group__toggle`). The histogram and Part Of stay open.
- The results stay where they are, under it. Nothing takes over the screen, so there is
  no "Show N Results" button to get back.

The caret points along the line while closed and down once open, turning over
`--ia-motion-duration-fast`; in right-to-left text it points the other way.

## Signed out

collection-browser loads facets on request for signed-out visitors
(`facetLoadStrategy: 'opt-in-or-login'`): the rail is the same **Filters** disclosure,
closed, at every width, and its values load when it opens. `.ia-facets--opt-in` on the
`.ia-facets` root draws it. Signed in, the rail is open above `lg`.

## Don't

- Don't shrink rows below 44px on touch to fit more facets.
- Don't auto-apply a range slider on drag; apply on release or via the numeric inputs.
- Don't draw applied-filter chips above the results; the rail and Clear All Filters
  carry that.
- Don't use a facet group with one option.
