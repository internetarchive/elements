# Search bar

> **Use instead:** a search scoped to one collection → a pill text field
> ([input](input.md#search-fields-are-different)). Narrowing results already shown →
> [facets](facet-filter.md).

Search is the primary way into archive.org. The main search bar — live's
`ia-dropdown-search-bar` — appears in the topnav, on the search results page and on the
homepage. Pages that already have a search bar in their main content — the search
results page and the homepage — hide the topnav's copy, so there is only ever one. At
narrow widths the search page also drops the topnav's search icon; the homepage keeps it. It has three segments, and the first matters: a **search-type
picker** that sets what the search covers — All, Books/Documents, Text Contents, TV,
Radio and the rest — *before* the search runs.

## Live sizes

Two sizes. The search page's bar is the default size, only wider:

| Instance | Bar | Picker | Field text | Submit |
| --- | --- | --- | --- | --- |
| topnav | 274×30 | 45×30 | 16px | 30×30 |
| search results page | 800×30 | 45×30 | 14px | 30×30 |
| homepage | 487×50 (335×50 at 375px) | 55×50 | 17px | 34×50 |

```
ia-dropdown-search-bar            800×30
  ia-dropdown                      45×30  bg #f5f5f7  r 5px 0 0 5px  bd 1px #999
    button.click-main                     pad 0 5px   "All" 14px #2c2c2c + 12×8 caret
  ia-clearable-text-input         725×30                             bd 1px #999
    input                         725×28  bg #fff     pad 0 28px 0 5px   text #555
    button (clear)                 28×28  a 20px #2c2c2c disc with a white cross
  button (submit)                  30×30  bg #fff     r 0 5px 5px 0  bd 1px #999
```

The large bar is the same structure: 50px tall, 10px padding in the picker and the
field, 17px field text, the submit 34px wide. The picker's panel is `#2c2c2c` with a 1px
`#ddd` border and 4px corners, rows of 14px white text, the selected row tinted white at
30%. Its options, in order: All, Books/Documents, Text Contents, Radio, TV, Video, Audio,
Software, Images, Live Music, Collections, Data, Web Sites.

The topnav row is offshoot's (the collection page). The legacy petabox item page, which
offshoot's details page is replacing, draws the same 274×30 bar with 14px field text from
an older `elements` release.

A collection's own search — live's `collection-search-input`, a 20px-radius pill with a
dark "Search this collection" button — becomes this bar without its picker: the field
takes the start cap, the label is "Search This Collection", and Advanced Search sits
under its end ([page-shells.md](../patterns/page-shells.md#2-browse--search-collection-landing-user-profile)).
The Wayback Machine field, also a pill, is a different component; see
[input.md](input.md).

## Spec

The live structure and both sizes, kept.

| Part | Default (`.ia-search-bar`) | Large (`.ia-search-bar--lg`) |
| --- | --- | --- |
| Height | `--ia-size-control-sm` (30px) | `--ia-size-control-xl` (50px) |
| Where | topnav, search results page | homepage |
| Picker | `.ia-dropdown.ia-search-bar__type`: `--ia-color-surface-sunken`, 1px `--ia-color-border-strong`, `--ia-radius-default` on the outer corners, padding `--ia-space-1`; the selected type in `--ia-font-size-md`/regular and the lifted `caret` | padding `--ia-space-2` |
| Field | `--ia-color-surface-raised`, 1px `--ia-color-border-strong` top and bottom; text `--ia-font-size-md`, padded `--ia-space-1` | text `--ia-font-size-lg`, padded `--ia-space-2` |
| Clear | the lifted `close` glyph on a 20px `--ia-color-text-primary` disc; shown only when the field has a value | the same, in a wider slot |
| Submit | `--ia-size-control-sm` square, `--ia-color-surface-raised`, 1px `--ia-color-border-strong`, `--ia-radius-default` on the outer corners; the lifted `search` glyph | padded `--ia-space-1 --ia-space-2` |

Departures from live, each under an accepted decision:

- **Borders `--ia-color-border-strong` (`#666`)**, not `#999`. `#999` is 2.85:1 on white,
  below the 3:1 a field's boundary needs (WCAG 1.4.11, [D-38](../DECISIONS.md#d-38)).
- **Corners 4px**, not 5px ([D-13](../DECISIONS.md#d-13)).
- **Picker fill `--ia-color-surface-sunken` (`#f1f1f4`)**, the nearest surface to live's
  `#f5f5f7`; field text `--ia-color-text-primary` rather than `#555`.
- **Large field text 16px**, not 17px: 17px is off the type scale
  ([D-06](../DECISIONS.md#d-06)), and 16px is also the size iOS needs to not zoom
  ([D-21](../DECISIONS.md#d-21)). Below `md` the default bar's field is 16px too.
- **The picker is a native `<select>`**, styled as live's trigger and dark panel where
  customizable select is supported — see [dropdown.md](dropdown.md). One dark and one
  radius for the panel, as everywhere ([D-41](../DECISIONS.md#d-41)).

## The live component

`ia-dropdown-search-bar` (from `@internetarchive/elements`) is what ships, and the Claude
Design card `IADropdownSearchBar` renders it. Its height and width come from
`--search-bar-height` and `--search-bar-width`, which its theme layer sets on `:host` from
`--ia-theme-search-bar-height` and `-width` (30px and `auto` by default). So a value set
on the element itself — a selector that matches it, or an inline style — wins; the same
variable inherited from a parent is overwritten and does nothing. `--ia-theme-*` set on
any ancestor works. Every placement sets them. offshoot's values are below; the card sets
the same variables from this system's tokens (`--ia-size-control-sm` and
`--ia-size-control-xl` heights, `--ia-font-size-lg` text in both the topnav and the
homepage bar):

| Placement | Set in | Variables |
| --- | --- | --- |
| topnav | `app-root.ts` | `--search-bar-width: 100%`, `--search-bar-height: 3rem`, `--dropdownFontSize: 1.4rem`, `font-size: 1.6rem` |
| search results page | `search-page.ts` | `--search-bar-width: 100%`, `--dropdownFontSize: 1.4rem`, `--dropdownItemButtonPadding: 0 10px` |
| homepage | `hero-block.ts` | `--search-bar-height: 5rem`, `--padding-sm: 10px`, a 3rem clear button offset 9px, `--dropdownItemButtonPadding: 0 10px`, `font-size: 1.7rem` |

Everything the departures above change is drawn by the component itself, so the card
still shows live's version of each:

| Part | `ia-dropdown-search-bar` | This spec |
| --- | --- | --- |
| Picker | `#f5f5f7`, 1px `#999`, radius `5px 0 0 5px` | `--ia-color-surface-sunken`, 1px `--ia-color-border-strong`, `--ia-radius-default` |
| Field and submit borders | 1px `#999` | 1px `--ia-color-border-strong` |
| Field text | `#555` | `--ia-color-text-primary` |
| Open picker | a custom list of `<button>`s: `#2c2c2c`, 1px `#ddd`, 4px corners, no shadow. Options padded `0 10px` where the placement sets it (search page, homepage) and flush against the edge in the topnav, which doesn't; the selected one tinted white at 30%, no check | the native picker from [dropdown.md](dropdown.md): `--ia-color-surface-inverse`, `--ia-shadow-overlay`, rows padded `--ia-space-2`/`--ia-space-4`, a check on the selected one |
| Large field text | 17px | `--ia-font-size-lg` (16px) |

`#999`, `#555` and `#f5f5f7` have no token; each is a value this spec retires.

## Anatomy

```
┌──────────┬────────────────────────────────────┬──────┐
│  All  ⌄  │ query                          (×) │  🔍  │
└──────────┴────────────────────────────────────┴──────┘
   picker                field           clear   submit
```

```html
<form role="search" class="ia-search-bar">
  <select class="ia-dropdown ia-search-bar__type" aria-label="Search Type">
    <button><selectedcontent></selectedcontent><svg class="ia-icon" …/></button>
    <option selected>All</option>
    <option>Books/Documents</option>
    …
  </select>
  <div class="ia-search-bar__field">
    <label class="ia-visually-hidden" for="q">Search the Archive</label>
    <input class="ia-search-bar__input" id="q" type="search" placeholder="Search">
    <button class="ia-search-bar__clear" type="button" aria-label="Clear Search Query">…</button>
  </div>
  <button class="ia-search-bar__submit" type="submit" aria-label="Search">…</button>
</form>
```

- **Picker** — always present. It is how someone searches the full text, TV captions or
  web captures instead of item metadata, and the choice applies to the search they are
  about to run, so it sits before the field. The trigger shows the current type as text.
- **Field** — `type="search"` with a visually-hidden `<label>`. The placeholder is not the
  label.
- **Clear** — appears only when there is a value; it clears the field and returns focus
  to it.
- **Submit** — icon-only, `aria-label="Search"`.

## States

| State | Treatment |
| --- | --- |
| rest | as above |
| hover | picker fill → `--ia-color-border-subtle`; submit fill → `--ia-color-surface-sunken` |
| focus | each segment shows the universal ring; the field's ring is drawn inside its border so the neighbors do not hide it |
| has value | clear button appears |
| loading | activity indicator replaces the submit glyph; `aria-busy` on the form |

On a coarse pointer the bar grows to 44px and the submit to a 44px square
([D-17](../DECISIONS.md#d-17)).

## Suggestions

If the bar offers suggestions it is a combobox and needs the full contract:
`role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, Up/Down
to move, Enter to accept, Escape to close and restore the typed value. Results are
announced through a polite live region ("8 suggestions"). Anything less is worse than
no suggestions.

## Responsive

At and below `lg` the topnav search collapses to an icon that expands to a full-width
bar — which is what live already does, and it works. The expanded bar keeps its picker.
The homepage bar stays 50px tall at every width and fills its column.

## Don't

- Don't drop the search-type picker to save space; it changes what the search does.
- Don't use the pill radius on this bar; it belongs to the single-field searches.
- Don't put the clear button inside the submit button's hit area.
- Don't submit on every keystroke. Debounce suggestions; submit on Enter.
- Don't lose the typed value when Escape closes the suggestion list.
