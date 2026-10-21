# Tile

> **Use instead:** a panel that isn't a result — news, a feature → [card](card.md). One
> sideways row of results → a [carousel](carousel.md) of tiles.

The most-repeated component on the site — a page of results is fifty — and therefore
the one where a few pixels of inconsistency multiply fastest.

**There are four kinds, chosen per result, not per page.** `tile-dispatcher` picks
between them by content type, and there is one dispatcher per grid cell, so a single
grid can mix them:

```
collection-browser > infinite-scroller > tile-dispatcher > item-tile        an item
collection-browser > infinite-scroller > tile-dispatcher > collection-tile  a collection
collection-browser > infinite-scroller > tile-dispatcher > account-tile     an account
collection-browser > infinite-scroller > tile-dispatcher > search-tile      a saved search
```

They are the same skeleton with four skins. Each result also has two other views — a
[list row](#list-view) and a [compact row](#compact-view) — chosen for the whole page by
the [sort bar's](sort-bar.md) view switch.

## Skeleton

Identical in every kind down to the footer, as live renders it.

```
<tile>                        194×H    transparent — the custom element is not the card
  div.container               194×H    ← the card: surface, 1px border, 4px radius
    div.tile-details                   flex column, gap 10px
      div.item-info                    flex column, gap 5px
        image-block           192×170  ← thumbnail well, fixed height
          div.container       192×170  radius 4px 4px 0 0, padding 5px
        div                   192×31   title row, padding 0 5px
          h3.truncated        182×31   1.4rem / 500
        div.created-by        192×16   item variant only, padding 0 5px
          span.truncated      182×16   1.4rem / 400
      tile-stats              192×30   item footer — inside .tile-details
    div                       192×37   collection footer — beside .tile-details
```

The two footers are not the same element in different places; they are different
structures. See [Footer](#footer).

**The thumbnail is a fixed 170px height, not an aspect ratio.** It is 170px at every
tile width — collection-browser's `image-block` sets `16rem` plus 5px padding. A fixed height is
what keeps rows aligned when tile widths vary with the grid — an `aspect-ratio` would
let row heights drift. Use `block-size: 17rem`.

Tile height is content-driven and differs by page. Don't fix it.

## The four kinds

| | `item` | `collection` | `account` | `search` |
| --- | --- | --- | --- | --- |
| Card surface | `--ia-color-surface-raised` `#fff` | `--ia-color-surface-collection` `#666` | `--ia-color-surface-raised` | `--ia-color-surface-collection` |
| Card border | 1px `--ia-color-border-subtle` `#ddd` | 1px `--ia-color-border-inverse` `#474747` | as item | as collection |
| Card radius | `--ia-radius-default` 4px | the same | the same | the same |
| Thumbnail well | `--ia-color-surface-sunken` `#f1f1f4` | `#666`, same as the card | as item | `#666`, holding a `--ia-color-surface-sunken` rounded well with the `search` glyph |
| Thumbnail image | `object-fit: contain`: the whole image, the well showing around it; no radius | `object-fit: cover`: fills the well inside its padding, cropped to fit; `--ia-radius-default` (4px) | the avatar, `cover`, in a 160px circle | — |
| Title | 1.4rem / 700, `--ia-color-text-primary`, 3 lines | 1.4rem / 700, `--ia-color-text-inverse`, 3 lines | the screen name | the query, 4 lines |
| Line under it | `by <creator>`, or a [date or issue line](#what-a-tile-can-carry) | — | "Archivist since 2001" | — |
| Footer | media type, view, favorite and review counts | item count and total size | the account glyph, uploads, favorites, reviews | none |

`.ia-tile--account` and `.ia-tile--search` are the class names; the account's line is an
`.ia-tile__detail`, and the search well is `.ia-tile__search-well` inside the thumbnail.

Both cards are **4px**, and both thumbnail wells are `4px 4px 0 0`. A collection
thumbnail's image also takes `--ia-radius-default` (4px) — live rounds it at 8px
(`img.collection-image`); an item thumbnail's image has no radius.

The collection variant's `#666` on white text is 5.74:1, so it passes as-is and is kept
as `--ia-color-surface-collection`. Wrap its text in `.ia-inverse` so the title and any links
re-point rather than hard-coding white.

Its live border is `#555`, a 1.15:1 line on a `#666` surface — decorative, not a
boundary. It normalizes to `--ia-color-border-inverse` (`#474747`) rather than adding a
token for an all-but-invisible difference.

## Spec

| Property | Value |
| --- | --- |
| Card radius | `--ia-radius-default` (4px) |
| Card border | 1px, `--ia-color-border-subtle` (item) / `--ia-color-border-inverse` (collection) |
| Thumbnail | `block-size: 17rem`, radius `--ia-radius-default --ia-radius-default 0 0`, padding `--ia-space-1` |
| Text-row padding | `0 --ia-space-1` (5px) |
| Title | `--ia-font-size-md` / `--ia-font-weight-bold` / `tight`, clamp 3 lines (4 for a saved search), as live — 700, not live's 500, which renders as 400 without Helvetica Neue and then can't be told from the creator line |
| Subtitle | `--ia-font-size-md` / regular, clamp 1 line |
| Footer | see [Footer](#footer) |
| Grid | see [Grid](#grid) |

Two deliberate departures from live:

- **Title line-height** is `tight` (1.25), not the live 15px at 14px (1.07), which clips
  descenders on wrapped titles — [D-34](../DECISIONS.md#d-34).
- **No opaque shadow.** The collection tile's live `#2c2c2c 1px 1px 2px` is retired with
  every other opaque offset shadow — [D-14](../DECISIONS.md#d-14). The border carries
  the card at rest; elevation appears on hover.

## What a tile can carry

The skeleton has room for more than a title and a byline. Each of these is live in
collection-browser's `item-tile`:

| Content | When | Spec |
| --- | --- | --- |
| A date line | sorted by a date — published, archived, reviewed, added | replaces the byline: `.ia-tile__detail` reading "published 1926" or "archived Mar 3, 2014". A date that is only a year shows only the year |
| Weekly views | sorted by weekly views | the views stat counts the week, and its hidden label says so ("Weekly Views:") |
| Volume and issue | a serial with both | `.ia-tile__detail`, "Volume 27, Issue 5", above the byline |
| Text snippets | a full-text search | `.ia-tile__snippet`: up to three lines at `--ia-font-size-sm`, a 5px `--ia-color-brand-navy` rule at the start, an ellipsis before and after each passage, the query's terms in `<mark>` on `--ia-color-surface-highlight` |
| Restricted | the item needs a login, or carries a content warning | the thumbnail is blurred 15px, and `.ia-tile__overlay` crosses its middle: a 1px `--ia-color-border-strong` banner on `--ia-color-status-warning-subtle`, a 40px glyph and the reason — "Log in to view this item" or "Content may be inappropriate" |
| TV clips | a TV result, where the page asks for it | the clips count replaces reviews |

Live's overlay is `#fffecb` with a `#2c2c2c` edge; the warning tint and the strong border
are the nearest roles. A thumbnail that a viewer can't see should say why, not just blur.

## Footer

### Item: the stat row

Four cells spread edge to edge — media type, all-time views, favorites, reviews.

| | Live | Spec |
| --- | --- | --- |
| Row | `tile-stats > div.item-stats > ul`: padding `0 5px` then `0 0 5px`; flex, **`justify-content: space-between`**, no gap | flex, `space-between`; padding `--ia-space-2 --ia-space-1 --ia-space-1` (the 10px above is live's `.tile-details` gap) |
| Cell | `li.col`, `display: list-item`, 25px tall, as wide as its content | a block glyph centered over its count, `text-align: center` |
| Glyph centering | `margin-inline: auto` on a block `<svg>` | the same |
| Media-type glyph | 25px, colored by type — movies `#f1644b`, web `#ffcd27`, data `#333` | `--ia-size-icon-lg`, `--ia-color-mediatype-*` |
| Counter glyphs | views 13px, favorites 13px, reviews 11px nudged 2px down; `#333` | `--ia-size-icon-sm`, `currentColor` |
| Count | `p.status-text` 14px/17px 400 `#2c2c2c` | `--ia-font-size-md` / `--ia-font-line-height-tight`, tabular figures |

The media-type glyph comes from the tile's own set (`tile-mediatype-icon`) — `book`,
`movies`, `audio`, `image`, `tv`, `browser`, `data`, `collection` — not from the topnav's,
whose glyphs sit smaller in their box. Its color comes from the component's own map; the
spec keeps those hues and darkens the six that fall below 3:1 on the white card
([D-43](../DECISIONS.md#d-43)).

Two sizes instead of four, one line height on the scale —
[D-40](../DECISIONS.md#d-40).

### Collection: glyph beside a stack

| | Live | Spec |
| --- | --- | --- |
| Footer | `div`, flex, `align-items: center`, padding `0 5px 5px` | `.ia-tile__meta`: flex, center, gap `--ia-space-2`, padding `0 --ia-space-1 --ia-space-1` |
| Glyph | 25px in a 25×30 well; drawn black and flipped white with `filter: invert(1)` | `--ia-size-icon-lg`, `currentColor` — inverse text |
| Text | a flex column of two lines, 14px/15px 400 white, 10px from the glyph: item count, total size | `.ia-tile__meta-text`: `--ia-font-size-md` / `tight` |

Both footers pin to the bottom of the card (`margin-block-start: auto`), so in a row of
mixed title lengths they align. Live does the same: the card fills its grid cell
(`height: 100%`) and the details column grows.

### Account: uploads for views

The same stat row, its first column the account glyph (`user`) and its second the
account's uploads in place of views.

### A live inconsistency worth knowing about

Item tiles on **profile** pages carry the opaque shadow — collection-browser's default
`--tileBoxShadow` — while offshoot's search page sets it to `none`. Same component, two
elevations, depending only on which page rendered it. The spec gives both the same treatment.

## Hit area and structure

The whole tile is one link. Do not nest a second interactive element inside it — the
info button, where there is one, sits **beside** the link in the DOM and is positioned
over the tile:

```html
<article class="ia-tile ia-tile--item">
  <a class="ia-tile__link" href="/details/…">
    <span class="ia-tile__thumb" aria-hidden="true"></span>
    <h3 class="ia-tile__title">Buster Keaton College (1927)</h3>
    <p class="ia-tile__creator">by Buster Keaton</p>
  </a>
  <button class="ia-tile__info" aria-label="More Info About Buster Keaton College (1927)"
          aria-expanded="false">i</button>
  <ul class="ia-tile__stats" aria-label="Item Stats">
    <li class="ia-tile__stat" data-mediatype="movies"><svg …/><span class="ia-visually-hidden">Media Type: Movies</span></li>
    <li class="ia-tile__stat"><svg …/><span class="ia-visually-hidden">All-Time Views: </span>4,900</li>
    <li class="ia-tile__stat"><svg …/><span class="ia-visually-hidden">Favorites: </span>35</li>
    <li class="ia-tile__stat"><svg …/><span class="ia-visually-hidden">Reviews: </span>2</li>
  </ul>
</article>
```

- The thumbnail's `alt` is empty — the title beside it is the accessible name. A
  duplicated alt makes a screen reader read every result twice.
- Heading level is `h3` because tiles sit under a results heading. The **style** comes
  from the tile, not the level. Live already uses `h3` here, correctly.
- The info button exists only where the pointer can't hover (`@media (hover: hover)`
  hides it); live sizes it from 2.4rem text. Here it is 24px with a 44px hit area from a
  pseudo-element, so the glyph can stay 24px. See [Hover pane](#hover-pane).
- The stat row's first column is the **media type**, not a count — live puts a 25×25
  media-type icon there with an `sr-only` "Mediatype:" label. Keep it; it is how you
  tell a text from a film at a glance in a grid.
- Stat icons are `aria-hidden`. Live names each stat with an `sr-only` prefix —
  `"all-time views: 5K"`, `"favorites: 34"`, `"reviews: 2"` — inside `p.status-text` at
  1.4rem/400. That is better than a single list-level label and is the pattern to keep.
- The counter glyphs take `currentColor`, so they match their counts. Live draws them
  `#333` beside `#2c2c2c` numbers. The media-type glyph keeps its type's color.

## States

| State | Treatment |
| --- | --- |
| rest | border only, no shadow |
| hover | `--ia-shadow-hover`, title → `--ia-color-text-link` |
| press | the whole tile squeezes to `--ia-motion-press-scale-wide` over `--ia-motion-duration-instant` ([D-49](../DECISIONS.md#d-49)); pressing the info button doesn't press the tile |
| focus-visible | 2px ring around the whole tile, offset 2px |
| loading | skeleton at the tile's exact dimensions — never a spinner in a grid |
| no thumbnail | the thumbnail well's surface with the media-type icon centered |

The press is live's own `transform: scale()`, at a scale chosen for the tile's width, and
it is removed under `prefers-reduced-motion`.

The info button always sits over the thumbnail, so it carries `--ia-shadow-floating`: a
flat white disc disappears over light artwork.

Live underlines the title on hover; here the title turns `--ia-color-text-link`, the
system's link color, so it reads as the link it is.

## Hover pane

On a pointer that can hover, resting on a grid or compact result opens a preview of it:
its [list row](#list-view) in a floating pane. It is how someone reads a long title, the
creators, the topics and the description without leaving the grid.

| | Value (live's `hover-pane-controller`) |
| --- | --- |
| Opens | 300ms after the pointer settles on the result; at once on keyboard focus |
| Where | beside the pointer, 10px before it and 15px below, flipped to the other side past the viewport's middle, and kept 20px inside the viewport; from keyboard focus, beside the tile |
| Size | `min(45vw, 600px)` wide, 80vw at 600px and below; as tall as its content |
| Look | `.ia-hover-pane`: `--ia-border-card`, `--ia-radius-default`, `--ia-shadow-overlay`, raised surface. Its header (`.ia-hover-pane__header`) names the result's first collection, with its thumbnail, on `--ia-color-selected-soft-fill`; live's is `#edf0ff` |
| Motion | fades in and rises 5px over `--ia-motion-duration-fast`; no motion under `prefers-reduced-motion` |
| Closes | 100ms after the pointer leaves the result and the pane; on Escape; when focus moves on |
| Keyboard | the tile link is described by "Press Down Arrow to preview item details"; Down Arrow moves focus into the pane, which traps it; Up Arrow or Escape returns it to the tile |
| Touch | the ⓘ button on the thumbnail opens it, and only there; live also opens it on a 600ms long press where the page allows |

Not on list view (its rows already show everything), saved searches, or web archive
results. The pane is a `role="dialog"`, labeled by the result's title.

## List view

One result per row: a 100px thumbnail beside its details. `.ia-tile-list` is the list,
`.ia-tile-list__row` each result, in a results column (`.ia-facets__results`, or
`.ia-results` anywhere else) that it measures for its narrow layout.

| Part | Spec | Live (`tile-list`) |
| --- | --- | --- |
| Thumbnail | 10rem square, `--ia-color-surface-sunken`, `--ia-shadow-raised`, image contained | 100×100, `#ebebee`, `1px 1px 2px rgba(0,0,0,.2)` |
| Title | `--ia-font-size-xl` / bold / `tight`, `--ia-color-text-link`, 3 lines | 22px/25px bold `#4b64ff`, 3 lines |
| Media type | its glyph in its color at the title line's end, linking to that media type | a 20px `tile-mediatype-icon` link |
| Lines | each `.ia-tile-list__line` with a bold `.ia-tile-list__label`: Source, Volume and Issue; By (creator links); Published, and the sort's date when sorted by one; Views (weekly when sorted by it), Avg Rating, Reviews; Topics (subject links); Collections (links) — all at `--ia-font-size-md` / `normal` | 14px/20px, labels bold |
| Clamps | By, Topics, Collections and the description at 3 lines | the same |
| Description | in full text, tags stripped, `--ia-space-2` above | the same |
| Snippets and review | `.ia-tile-list__snippet`, a 5px navy rule at the start | the same |
| Between rows | `--ia-space-6`; `--ia-space-4` below `sm` | 30px; 20px on mobile |
| Narrow (below `sm`) | a 90px thumbnail beside the title; the details run beneath both | the same |

Missing values leave their line out; a line never shows a label with nothing after it.

## Compact view

A table: one row per result under a header row naming the columns. `.ia-tile-compact` is
`role="table"`; each `.ia-tile-compact__row` (`role="row"`) is its own grid on one shared
template, so a long title truncates instead of widening its column.

| Column | Width | Content |
| --- | --- | --- |
| Thumbnail | 45px (30px below `sm`) | the image, cropped to fill |
| Title | 3fr | a link, one line, ellipsis |
| Creator | 2fr | the first creator, one line |
| Date | 95px (68px) | published, or the sort's date — the header follows the sort: "Published", "Date Archived" … |
| Type | 30px | the media-type glyph in its color |
| Views | 115px, end-aligned | all-time or weekly, by the sort; gone below `sm` |

Rows are 45px with a `--ia-border-divider` rule above; the header row is bold. Live's
columns are `51px 3fr 2fr 95px 30px 115px` (`36px 3fr 2fr 68px 35px` on mobile) with a
10px gap; the spec's are the same less the gap, which is `--ia-space-2`. The tile sets `isolation: isolate` and the
button takes `--ia-z-index-local-1`, so its layer stays inside the tile
([D-50](../DECISIONS.md#d-50)).

## Grid

`grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr))`, with the floor at 15rem at
880px and below and 12rem at 360px and below — collection-browser's own floors — and
`--ia-space-4` gap. No cap: the grid fills the results column. Auto-fill rather than
counted columns — it degrades correctly at every width and is already how
`infinite-scroller` works ([D-39](../DECISIONS.md#d-39)). Results load fifty at a time.

Live's gap is 1.7rem (collection-browser's `--collectionBrowserColGap` default), between
`--ia-space-3` and `--ia-space-4`; the spec keeps the token.

## Don't

- Don't nest links inside the tile link.
- Don't put the full item description in a tile.
- Don't let the title's line count vary without limit — clamp at 3 and let the footers align.
- Don't give the thumbnail an `aspect-ratio`; use the fixed height, or rows drift.
- Don't animate tiles in on scroll. Fifty staggered fades is a scroll-jank machine.

