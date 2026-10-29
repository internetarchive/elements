# Dropdown

> **Use instead:** two to four options that fit on screen →
> [segmented control](segmented-control.md). Commands, not a value → [menu](menu.md).
> Several values at once → checkboxes ([checkbox and radio](checkbox-radio.md)).

A single choice from a short list. Live, one Lit component — `ia-dropdown` — serves two
hosts: the search bar's search-type picker (All / Books / Text contents / TV / Radio …)
and the [sort bar](sort-bar.md)'s field picker (Relevance / All-time views / Weekly
views / Title / …). A light trigger opens a dark panel.

## Measured live

| Part | Search bar host | Sort bar host |
| --- | --- | --- |
| Trigger | 45×30, `#f5f5f7`, `1px solid #999`, radius `5px 0 0 5px` — the left end of the search field | 96×28, transparent |
| Trigger content | a 16px glyph and caret | label 14px/28px **700** `#2c2c2c`, 5px left padding; a 12×9 caret after 5px |
| Panel | **`#2c2c2c`**, `1px solid #ddd`, radius **4px** | **`#333`**, radius **`0 0 4px 4px`** |
| Option | 14px/20px 400 white, padding `0 10px`, 30px tall | 14px/20px 400 white, padding `5px 10px`, 30px tall |
| Selected option | `rgba(255, 255, 255, 0.3)` fill | `rgba(255, 255, 255, 0.3)` fill |

The search bar host is elements' `ia-dropdown-search-bar`, with offshoot's search page
setting the option padding; the sort bar host is collection-browser's `sort-filter-bar.ts`.

The trigger's visible label is slotted light DOM — `span.dropdown-label`, rendered inside
the button's `<slot>`.

Two inconsistencies in one component: the panel is two different darks a hair apart,
and has two corner treatments depending on which page opened it. And the selected
option is marked by fill alone.

## Spec

A native `<select>` with the live look.

| Part | Value |
| --- | --- |
| Trigger | `--ia-size-control-sm` tall, transparent, `--ia-radius-default`; `--ia-font-size-md` / bold, primary text; the lifted `caret` glyph at `--ia-size-icon-xs` (12px) |
| Trigger hover | `--ia-color-hover-overlay` |
| Panel | `--ia-color-surface-inverse`, `--ia-radius-default` on all four corners, `--ia-shadow-overlay`, `--ia-space-1` above the trigger |
| Option | `--ia-size-control-sm` (30px) minimum height, padding `0 --ia-space-4 0 --ia-space-2`, `--ia-font-size-md` / regular, inverse text — the [menu-row contract](menu.md#the-menu-row-contract) |
| Hovered option | `--ia-color-hover-overlay`, which re-points to white at 12% on the dark panel |
| Selected option | the soft selected tier ([D-45](../DECISIONS.md#d-45)), which on the dark panel is `--ia-color-selected-soft-fill-inverse` (`#666`); plus a check |
| Option focus | the inverse focus ring, inset |

One dark and one radius in every host — [D-41](../DECISIONS.md#d-41). The check makes
the selection readable without color (WCAG 1.4.1).

## Why a native select

Live's panel is a custom listbox of `<button>`s. A native `<select>` gives the keyboard
model (arrows, Home/End, typeahead, Escape), the screen-reader role and value, and the
phone's own picker for free, and none of them can drift.

Where the browser supports customizable select (`appearance: base-select`), the trigger
and panel are styled to match live exactly. Elsewhere the browser draws its own picker:
the trigger still reads as the bold label, and the panel is the platform's. For a
control this central, the platform's picker is the right fallback.

```html
<label for="sort-field">Sort By:</label>
<select class="ia-dropdown" id="sort-field">
  <button><selectedcontent></selectedcontent><svg class="ia-icon" …/></button>
  <option selected>Relevance</option>
  <option>All-Time Views</option>
  …
</select>
```

The `<button>` is the customizable-select trigger. Browsers without support drop it
while parsing, so the same markup works everywhere.

## The live component

`ia-dropdown` (`@internetarchive/ia-dropdown`, 2.2.0 in offshoot) is what ships. It is dark by default — white
text on `#333` — and reads no `--ia-theme-*` token. The table is live, styled as
collection-browser's sort bar styles it (`sort-filter-bar.ts`). The Claude Design card
`IADropdown` instead sets this spec's values through the component's variables: the panel
color and corners, the gap, the option padding and the selected fill all match the spec.
What no variable reaches — the panel's shadow, the selected option's check, the option
focus ring — stays as the table shows:

| Part | `ia-dropdown`, sort-bar styling | This spec |
| --- | --- | --- |
| Element | a custom list of `<button>`s | a native `<select>` |
| Trigger | 28px, transparent; the label bold 14px on a 28px line | `--ia-size-control-sm` (30px), `--ia-radius-default`, hover `--ia-color-hover-overlay` |
| Panel | `#333`, square top corners, rounded bottom, no shadow, flush under the trigger | `--ia-color-surface-inverse`, `--ia-radius-default` all round, `--ia-shadow-overlay`, `--ia-space-1` below the trigger |
| Option | 30px, padded `5px 10px` | `--ia-size-control-sm` minimum, padded `0 --ia-space-4 0 --ia-space-2` |
| Selected option | white at 30% over the panel, no mark | `--ia-color-selected-soft-fill-inverse` fill and a check |
| Option focus | no ring of its own | the inverse focus ring, inset |

One detail of the API matters to anyone building with it: the component pads each
option's *first child element*, not the option itself. A plain-text label has no element,
so it renders flush against the panel edge. Live wraps every label in a span
(`<span class="dropdown-option-label">`); the `IADropdown` card's React wrapper does the
same for plain-text labels.

## Don't

- Don't use a dropdown for two or three options that fit on screen; use radios or a
  segmented control.
- Don't put actions in it. A dropdown chooses a value; a menu runs commands.
- Don't mark the selected option by color alone.
