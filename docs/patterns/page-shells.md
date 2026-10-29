# Page shells

Four shells cover the live pages. A new page should fit one of them; if it doesn't,
that is worth a conversation before it becomes a fifth.

Every shell shares the same frame:

```
a.ia-skip-link                  first, to #maincontent
donation banner                 when a fundraiser is on
.ia-message--banner × 0–3       site-wide notices
ia-topnav                       --ia-z-index-header, .ia-inverse
subnav                          --ia-color-surface-chrome-secondary
.ia-activity-bar                3px, while loading
<main id="maincontent">         the skip-link target, tabindex="-1"
  …shell body…
footer.ia-footer                fixed (home), page bottom (item), or none
```

See [navigation.md](../components/navigation.md#skip-link) for the skip link, the
activity bar and the footer, and [alert.md](../components/alert.md#banners) for banners.

---

## 1. Full-bleed marketing — the homepage

Sections may run edge to edge; their **content** stays inside `--ia-container-page`
with the standard gutter.

```
┌────────────────────────────────────────┐
│  Wayback hero   --ia-color-brand-wayback, full-bleed background
├────────────────────────────────────────┤
│  Mission block   --ia-container-prose
├────────────────────────────────────────┤
│  New to the Archive?   carousel, optional
├────────────────────────────────────────┤
│  Top Collections   collection-tile grid, infinite scroll
└────────────────────────────────────────┘
```

- Section separation `--ia-space-12`, `--ia-space-6` below `md`.
- One `<h1>` — "Top Collections", as offshoot draws it; the mission statement is not a
  heading. Everything else is `<h2>`.
- **Carousels are the overflow risk.** At 375px live's "New to the Archive?" carousel
  (offshoot's `basic-carousel`, a fixed 1.75 tiles of 240px plus its arrows) pushes the
  homepage document past the viewport. Every scrolling track goes inside a wrapper
  bounded to the container width, with `overflow-x: auto` on the wrapper. See
  [responsive.md](responsive.md#horizontal-overflow).
- Carousels need keyboard access: the track is `tabindex="0"` with
  `aria-label`, and the prev/next buttons are 44×44 and never the only way to move. The
  whole component is specified in [carousel.md](../components/carousel.md).

---

## 2. Browse — search, collection landing, user profile

The workhorse. A filter rail beside a results region — collection-browser on every one.

```
┌──────────────────────────────────────────────────┐
│  Page header — see below                          │
├──────────────────────────────────────────────────┤
│  Tabs / scopes                                    │
├───────────────┬──────────────────────────────────┤
│  Facet rail   │  (collection: its own search)    │
│  210px        │  1,228 Results     ← heading      │
│  sticky       │  Sort bar (+ letter bar)          │
│  scrolls      │  ────────────────────────────    │
│  independently│  Result grid, list or table      │
│               │  (more load as you reach the end)│
└───────────────┴──────────────────────────────────┘
```

| Breakpoint | Layout |
| --- | --- |
| below `lg` (890) | the rail is a closed "Filters" accordion above the results, its groups closed under carets ([facet-filter.md](../components/facet-filter.md#narrow)) |
| `lg` and above | rail is a 210px sticky column, `max-block-size: calc(100dvh - <header>)`, `overflow-y: auto`; signed out, a closed "Filters" disclosure in the same column |

- Container `--ia-container-page` (1350px).
- Grid gap `--ia-space-4`; rail-to-results gap `--ia-space-6`. The grid fills the results
  column ([item-tile.md](../components/item-tile.md#grid)).
- **The results heading** — `.ia-results-heading`, an `<h2>` and a polite live region — sits
  in the results column above the sort bar on every browse page: "1,228 Results", led by
  the search type in bold where there is one ("**All** 1,228 Results"). Live puts it there
  on the search page and at the top of the rail on collection pages; the spec uses one
  place.
- No results, or a failed search, replaces the whole region — rail, sort bar and all —
  with the placeholder in [empty-loading-error.md](empty-loading-error.md#empty).

The three pages differ in their header:

**Search** — a band across the window, `.ia-search-band`, on `--ia-color-surface-sunken`
(offshoot's is `#d8d8d8`). On the prose width inside it: the page's `<h1>`, "Search"; the
search bar; an **Advanced Search** link under the bar's end; and the page's actions —
Share — at the row's end. Below `md` the title is for screen readers only and the actions
join the Advanced Search row. The search-type tabs follow the band.

On full-text and transcript searches a **suggestions** box can lead the results column:
`.ia-suggestions`, one [carousel](../components/carousel.md) of tiles with 8rem thumbnails
under its own `<h2>` ("Look Inside", "Transcripts"), in a box of
`--ia-color-status-info-subtle` with a `--ia-color-status-info-border` edge and
`--ia-radius-lg` — live's `#eaf2fb`, `#999` and 10px. Live also shows a Wikipedia panel
about a creator and a feedback survey; both are out of this system's scope.

**Collection** — a masthead: the collection's image, its title (`.ia-type-page-title`),
"by" and its creator as a link, and its summary as a [read more](../components/read-more.md)
collapsed to two lines. Its actions, as live: Share, Favorite (signed in), RSS, Play All,
and Edit (editors), each a ghost button with its icon before the label. Above the results, aligned with them, the collection's own search —
the [search bar](../components/search-bar.md) without a type picker, labeled "Search This
Collection", with Advanced Search under its end (`.ia-collection-search`). The rail adds
**Part Of** (the parent collections) under the histogram. Live's title is 3.5rem at
weight 200 and its creator plain text without "by"; the spec keeps its own type scale and
the linked byline.

**Profile** — a navy band holding the avatar, screen name, "Member since" and bio, the
page's actions in a column, and the eight tabs; see [profile-page.md](profile-page.md).

---

## 3. Record — item details

A theater, a title row, then the main column beside a sidebar. Specified in full in
[item-page.md](item-page.md).

```
┌──────────────────────────────────────────────────┐
│  Theater — black, the full window; the player on  │
│  the page width                                   │
├──────────────────────────────────────────────────┤
│  [glyph] Title, by …                  [actions]   │
├────────────────────────────────┬─────────────────┤
│  Top metadata                  │  Stats          │
│  Player alerts                 │  Purchase       │
│  Description, in full          │  Downloads      │
│  Notes · Credits               │  In collections │
│  All metadata (12, Show More)  │  Uploaded by    │
│  Reviews                       │  (boxes, 32rem) │
├────────────────────────────────┴─────────────────┤
│  Similar items — a carousel of tiles              │
└──────────────────────────────────────────────────┘
```

- Container `--ia-container-page` (1350px), player included; petabox's legacy page and
  offshoot's details page are 1170px ([D-12](../DECISIONS.md#d-12)).
- The metadata and the reviews are in the main column; the sidebar holds stats,
  downloads, collections and the uploader, each in its own box.
- The sidebar stacks under the main column below `lg`.
- **petabox's legacy `/details/` page uses `<h1>` throughout**, view counts included;
  offshoot's details page has three (the title, "DOWNLOAD OPTIONS", "IN COLLECTIONS"). One
  `<h1>`: the item title. The section labels ("Download Options", "In Collections",
  "Similar Items") are `<h2 class="ia-type-overline">`.
- The title is `.ia-type-display`, which steps 36 → 28px below `lg`.

---

## 4. Focused task — signup, login, upload

One column, one goal, nothing else. Login and signup follow offshoot's order: the logo,
the title and the way to the other page, Google, "Email Me a Code", the Or divider, then
the form.

```
        ┌──────────────────────────┐
        │        [mark]            │   .ia-task-card__logo, 8rem tall
        │  Sign Up for an Account  │   .ia-type-page-title, centered
        │  Already have an account? Log in!
        │                          │
        │  [ Sign In with Google ] │   third-party auth first
        │  [ ✉ Email Me a Code   ] │   before the divider
        │  ───────── Or ────────   │
        │  ⚠ error summary          │   role="alert", after a failed submit
        │  Label                   │
        │  [ input              ]  │   .ia-input--lg
        │  Label                   │
        │  [ input              ]  │
        │                          │
        │  [ Sign Up            ]  │   .ia-button.ia-button--lg.ia-button--primary, full width
        │  small print             │
        └──────────────────────────┘
```

- Container `--ia-container-form` (600px), centered, `--ia-space-16` above, halving
  below `md`.
- No facet rail, no tabs, no secondary navigation competing with the task.
- `--ia-space-4` between fields, `--ia-space-6` before the submit.
- Primary action full width at and below `md`.
- Form-level errors in a `role="alert"` region above the form; focus moves there on a
  failed submit.
- Retires the live 570px variant (offshoot's `ia-signup-form`) in favor of the 600px one
  used on the same page.
- The form sits in a card (`.ia-task-card`); offshoot draws none. The submit stays full
  width and primary — offshoot's login button is auto-width and left-aligned, its signup
  button centered — and errors keep both the summary and the inline messages, where
  offshoot shows a line of red text.
- **Login**: Email Address, Password with its show/hide toggle (`.ia-password`), "Forgot
  password?" under it, "Keep me logged in" (checked), then Log In. **Signup**: Email
  Address, Screen Name and Password with their limits as hints, the newsletter choices,
  Sign Up, then the terms.

---

## Choosing

| If the page… | Use |
| --- | --- |
| sells or orients, with several unrelated sections | Full-bleed marketing |
| shows a filterable set of results | Browse |
| is about one thing and its metadata | Record |
| asks the user to complete one thing | Focused task |
