# Item page

The record shell in full ([page-shells.md](page-shells.md#3-record--item-details)), as
offshoot's details page builds it. offshoot is replacing petabox's `/details/` page, so
this is the spec; petabox's page is legacy.

```
████████████████████████████████████████████████████  theater: black, the full window
██          player / BookReader / image            ██  the player on the page width
████████████████████████████████████████████████████
[▤]  The history of Little Goody Two-Shoes …     [+][★][↗][⚑]   peek: glyph · title · actions
     by Welsh, Charles
┌───────────────────────────────────────┐  ┌──────────────┐
│     Publication Date   1881           │  │ 2,484 Views  │  stats
│     Topics             …              │  └──────────────┘
│     ⓘ This book is in the public domain.  ┌──────────────┐
│     Description, in full              │  │ DOWNLOAD …   │  downloads
│     Notes · Credits · Shotlist        │  └──────────────┘
│     All metadata (12 rows, Show More) │  ┌──────────────┐
│ ▣   Reviews (3)          ⊕ Add Review │  │ IN COLLECT…  │  collections
│     ───────────────────────────────── │  └──────────────┘
│     review · review · review          │  ┌──────────────┐
└───────────────────────────────────────┘  │ Uploaded by  │
──────────────────────────────────────────────────────────
SIMILAR ITEMS (based on metadata)   ‹ ›  tile tile tile tile tile
```

The page sits on `--ia-container-page` (1350px) like every other page. offshoot's is 1170px
on purpose; the system widens it, player column included ([D-12](../DECISIONS.md#d-12)).

## Theater

`.ia-record__theater`: `--ia-color-surface-theater` (black) across the whole window,
`.ia-inverse` inside. The player, BookReader or image (`.ia-record__viewer`) sits on the
page width, 42rem tall (30rem below `lg`). No radius: the band runs edge to edge, as
offshoot's does.

When nothing can play, the theater says so in place of the player — "There Is No Preview
Available For This Item", with Show All Files — or, for an item that needs a login, "You
must log in to view this content" with a Log In button and "Don't have an account? Sign up
for free!". Both are centered white text on the black: the message in
`--ia-font-size-xl` bold, the action a `.ia-button--primary`.

### Lending bar

Over a lendable book, `ia-book-actions` (offshoot pins 1.4.2) puts a bar across the top of
the theater. `.ia-lending-bar`: theater black, content centered and wrapping.

| Part | Spec | Live |
| --- | --- | --- |
| Status | `.ia-lending-bar__status`, `--ia-font-size-lg`: "This book can be borrowed for 14 days.", "Renews automatically with continued use.", "You are on the waitlist for this book.", "Borrow ends at 3:42pm" … | 1.7rem white |
| First action | a split button, `.ia-split-button`: the action, and a caret opening a [menu](../components/menu.md) of the others | the same, a dropdown under a 35px button |
| Actions | each in the intent live gives it: Borrow, Borrow for 14 days, Log In and Borrow → primary; Return now → danger; Join Waitlist, Log In and Join Waitlist → warning; Leave Waitlist, Purchase at Better World Books → secondary | `primary` / `danger` / `warning` / `dark` classes |
| Links | Print Disability Access, Admin Access, as links | the same |
| Size | `--sm` buttons, `--ia-space-2` padding | 35px buttons, 10px radius |

## Peek

`.ia-record__peek`: the media-type glyph, the title and byline, the actions — one row, the
actions at the end. Below `lg` the glyph and the actions share the first row and the title
runs under them. offshoot makes it sticky on TV items.

| Part | Spec | Live |
| --- | --- | --- |
| Media type | `.ia-record__type[data-mediatype]`: the tile set's glyph at `--ia-size-icon-2xl` in its type's color, labeled by the type ("Texts"). No overline | a 4.5rem `mediatype-icon` |
| Title | `<h1 class="ia-record__title ia-type-display">` — the page's only `<h1>`; words break before letters | 3rem/500, line-height 1.1 |
| Byline | `.ia-record__byline`, `--ia-font-size-lg`: "by" and the creators as links | 1.6rem, the creator at weight 200 |

### Actions

Stacked buttons, `.ia-button.ia-button--stacked`: the glyph over the label in a 2px
`--ia-color-text-primary` frame, at least 56px square, `--ia-space-2` apart.

| Action | Glyph | Long / short label | Shows |
| --- | --- | --- | --- |
| Add to List | `add` | Add to List / List | signed in; opens the list picker |
| Borrow | `email` | Borrow Program / Borrow | TV and radio items |
| Favorite | `star` | Favorite | always; `aria-pressed` |
| Share | `share` | Share | always; opens the share modal |
| Flag | `flag` | Flag | always; opens the flag panel |

- **One pressed look.** Favorited, a menu open, or a choice held (flagged, in a list —
  `data-active`): the soft selected tier, `--ia-color-selected-soft-fill` inside a
  `--ia-color-selected-soft-border` frame with `--ia-shadow-raised`. Live gives each action
  its own color (favorite `#f0b534`, flag `#be1024`, share `#428bca`, borrow `#008000`); the
  system has one selected look ([D-45](../DECISIONS.md#d-45)).
- **Labels.** Each carries `.ia-button__long` and `.ia-button__short`; below `lg` only the
  short one shows (live switches at 991px). The short copy is `aria-hidden`, so the name
  doesn't change with the width.
- Favorite keeps its label when pressed; `aria-pressed` carries the state. Live swaps it
  to "Unfavorite".
- Live's frame is `#000`; `--ia-color-text-primary` is the system's ink.

### Flag panel

`.ia-flag-panel`, opened under Flag at the row's end: a popover in the danger modal's
dress — a 2px `--ia-color-action-danger-fill` frame and a band of it holding "Flag This Item
For" in white — over a white list of `menuitemcheckbox` items, one per flag type. A checked
flag takes `--ia-color-status-danger-subtle` with danger text and a check. Several can be
checked; the panel stays open until Escape, a click outside, or Tab. Live is a 220px panel
with a `#d0021b` frame and a pink band.

### List picker

Add to List opens a [menu](../components/menu.md) of the patron's lists, each a
`menuitemcheckbox`, checked when the item is in it, then "Create New List" (opening the
Create a New List modal). Live draws it white in a 2px dark frame; the system's menu is its
one dark panel ([D-41](../DECISIONS.md#d-41)).

## Main column

`.ia-record__main` is a grid: a gutter as wide as the reviews glyph
(`--ia-size-icon-xl`), then the content. In order, as offshoot's `details-metadata`
renders it:

1. **Top metadata** — a `.ia-meta` list of the key fields: Publication Date, Usage, Topics,
   Publisher, Collection, Contributor, Language …
2. **Player alerts** — `.ia-record__alerts`, a line each with its glyph: info, a warning
   (in `--ia-color-text-danger`), and on TV items quotes and fact checks. `--ia-font-size-lg`.
3. **Stream-only and samples-only notices**, without headings.
4. **The description, in full** — `.ia-record__description.ia-type-prose`. Never collapsed.
5. **Notes, Credits, Shotlist** — each under its own `<h2 class="ia-type-subsection">`; a
   shotlist is preformatted, in `--ia-font-family-mono` on the sunken surface.
6. **All metadata** — every field, alphabetical, in a second `.ia-meta`, showing twelve
   rows and the rest behind Show More: a [read more](../components/read-more.md#lists)
   in its list form. Live's toggle is a 10px uppercase bordered "SHOW MORE"; the system's
   is the link-style "Show More".

TV items put the description first. Metadata lists are `1fr 2fr` — label and value — and
stack below `lg`. Live sets the values at weight 200; the system's are regular in primary
text, the labels secondary.

### Reviews

In the main column: the `comment` glyph (`.ia-record__reviews-icon`, `--ia-size-icon-xl`) in
the gutter; beside it `.ia-record__reviews-head` — "Reviews (3)" as an
`<h2 class="ia-type-section">`, sharing a baseline with a ghost icon-and-label **Add
Review** (`add` glyph), or **Edit My Review** when the patron has one. The button is gone
when reviews are disabled or frozen. Then a `--ia-border-divider` rule and the list.

| Part | Spec |
| --- | --- |
| List | `ul.ia-reviews` > `li.ia-review`, `--ia-space-3` apart with a divider between |
| Title | `h3.ia-review__title`, `--ia-font-size-md` bold |
| Meta | `.ia-review__meta`, `--ia-font-size-sm` secondary: the stars, "by" and the reviewer as a link, the date |
| Stars | `.ia-review__stars`, `role="img"`, `aria-label="4 out of 5 stars"`: five filled `star` glyphs at `--ia-size-icon-sm`, the earned ones in ink, the rest in `--ia-color-border-default` — filled, never outlined |
| Body | `.ia-review__body`, `--ia-font-size-md` / `normal` |

Live's list is `ia-reviews`, at 1.2rem.

## Sidebar

`.ia-record__sidebar`, 32rem, a column of boxes `--ia-space-4` apart. Each box is
`.ia-record__box`: a 1px `--ia-color-border-default` frame, `--ia-space-4` padding (live
2rem); `--condensed` halves the block padding. In offshoot's order:

| Box | Spec |
| --- | --- |
| Stats | condensed; `ul.ia-record__stats`, one stat a line at `--ia-font-size-xl`, the count bold: Views, Favorites, Reviews. A zero hides its line (views excepted); Reviews links to the reviews. No glyphs. A stream-only item adds `.ia-record__stream-only` under them — "Stream Only", bold, uppercase, centered over a divider |
| Purchase options | only with an ISBN: an overline heading and a link to Better World Books |
| Downloads | see below |
| In collections | an overline heading, then `ul.ia-record__collections`: each a link holding the collection's name and its 55px round thumbnail (`--ia-shadow-raised`), dividers between. An admin collection, shown to admins only, has a 5px link-colored bar at its start |
| Uploaded by | condensed; "Uploaded by", the uploader at `--ia-font-size-xl` as a link to their page, "on December 7, 2015" in a `<time>` |

The section headings are `<h2 class="ia-type-overline">` — "Download Options", "In
Collections", "Purchase Options". offshoot uses `<h1>`s for the first two.

### Downloads

`ul.ia-downloads`, a row per format (`.ia-downloads__row`, at least 30px, dividers
between): the format's name, link-colored, and at the end "n files"
(`.ia-downloads__count`, `--ia-font-size-sm`, linking to the format's zip).

- **One file**: the name links to it. On hover or focus, its size appears in a dark pill
  before the name (`.ia-downloads__size`) and a round link-colored download pill after it
  (`.ia-downloads__pill`). Both stay in the accessibility tree, and show at all times
  where the pointer can't hover.
- **Several files**: the name is a button with a caret; it replaces the list with that
  format's files in place — the heading becomes "PDF Files", a Back link and an "n files"
  badge (`.ia-downloads__badge`, a pill on the sunken surface with the download glyph)
  head the list, and each file is a row of its name and size. Back returns, focus with it.
- A DAISY row adds "For users with print disabilities" under its name.
- **Footer** (`.ia-downloads__footer`): "24 Files" and "7 Original" (zip links), and Show
  All, the item's file listing.

An item whose files can't be downloaded shows **Stream Only** in their place (an "i" disc
and the words); one that needs a login shows **Log in to view this item** — a full-width
`.ia-button--primary.ia-button--lg.ia-button--block` link.

## Similar items

`.ia-record__similar`, under a divider at the page's foot: "Similar Items (based on
metadata)", an overline heading, and a [carousel](../components/carousel.md) of
[tiles](../components/item-tile.md). Live draws one row of 180px tiles and clips the rest.

## Breakpoint

The sidebar stacks under the main column below `lg` (889px), on the `.ia-shell`
container; above it the sidebar is 32rem. offshoot stacks at 767px and narrows the
sidebar to 220px between 768 and 991px; the system keeps its one breakpoint. Stacked, the
main column's content runs the full width and only the reviews keep the gutter.

## Not found

`.ia-record-missing`, centered on the prose width: "The item you have requested had an
error:", the error in a monospace box on the sunken surface ("Item cannot be found."),
"which prevents us from displaying this page.", then why items are taken down, linking the
Terms of Use. Admins also get a link to the item's history. The first three lines are
bold, as live sets them.

## Don't

- Don't give the theater a radius or a gutter; it runs edge to edge.
- Don't collapse the description.
- Don't color the actions by type; pressed is one look.
- Don't put the metadata in the sidebar.
