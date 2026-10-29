# Tabs

> **Use instead:** two to four views of the same content in a toolbar →
> [segmented control](segmented-control.md). More than about eight destinations →
> [dropdown](dropdown.md).

Two different tab bars ship today and they are not the same component:

- **Page tabs** — "Collection / Forum (7,976) / About" on a collection page,
  "Uploads / Loans / Favorites / Lists / Posts / Reviews / Collections / Web Archives" on a
  profile.
  These change what the page is showing.
- **Search-type tabs** — "All / Books/Documents / Text Contents / Radio / TV / …" on
  search results. Choosing one re-runs the search with that search type, so they usually
  work as a filter — but they are presented, and built, as tabs.

Both use the same visual treatment live, offshoot's `tab-manager` — **27×34** with `6px 5px 0` padding
and 1.4rem/700 on the active tab, against 400 at rest, plus a 2px `#2c2c2c` bottom rule on
the active tab. Both are a `role="tablist"` live, and both stay one here.

## Spec

| Property | Value |
| --- | --- |
| Height | `--ia-size-control-lg` (4.4rem) — tabs are primary navigation and are tapped |
| Padding-inline | `--ia-space-3` |
| Font | `--ia-font-size-md`; rest 400, active 700 |
| Rest color | `--ia-color-text-secondary` |
| Active color | `--ia-color-text-primary` |
| Active indicator | 3px `--ia-color-selected-strong-fill` along the bottom edge — the strong selected tier |
| Track | 1px `--ia-color-border-default` bottom rule spanning the full width |
| Width | each tab reserves the width of its bold label, so selecting one moves nothing ([D-57](../DECISIONS.md#d-57)) |

The selected tab is bold and the rest are regular, and bold text is wider. Without a
reserved width, selecting a tab widens it and shifts every tab after it. Each tab carries
its label again in `data-label`, which the stylesheet draws as a hidden, zero-height bold
copy with empty alternative text (`content: attr(data-label) / ""`), so it sizes the tab
and is never read as part of its name.

The active tab is distinguished by **weight, color and a bar** — three signals, so it
survives grayscale and `forced-colors`. Live uses weight and a bar, which is already
acceptable; the color change is the cheap third.

## Overflow

Tab strips scroll horizontally on narrow screens. Live already does this and it is the
right call — the alternative is a wrapping two-row strip that shifts the content below
it. The requirements:

- The scrolling happens in a wrapper with `overflow-x: auto`, and the **wrapper** is
  constrained to the container width, so the document never scrolls.
- `scroll-snap-type: inline proximity` with `scroll-snap-align: start` on each tab.
- A fade mask on the overflowing edge, so it is visible there is more.
- Selecting a tab with the keyboard scrolls it into view.
- `scrollbar-width: none` visually, but the region keeps `tabindex="0"` so a keyboard
  user can scroll it — otherwise the far tabs are unreachable without a pointer.

At 375px the search page's strip scrolls well past the viewport, which is correct; the
document itself stays at 375px.

## Semantics

**Page tabs that swap panels in place** are a tablist:

```html
<div role="tablist" aria-label="Collection Sections">
  <button class="ia-tab" role="tab" id="tab-collection" aria-selected="true"  aria-controls="panel-collection" data-label="Collection">Collection</button>
  <button class="ia-tab" role="tab" id="tab-forum"      aria-selected="false" aria-controls="panel-forum" tabindex="-1" data-label="Forum (7,976)">Forum (7,976)</button>
</div>
<div role="tabpanel" id="panel-collection" aria-labelledby="tab-collection" tabindex="0">…</div>
```

Arrow keys move between tabs, Home/End jump to the ends, and only the selected tab is
in the tab order (`tabindex="-1"` on the rest).

**Tabs that load a different page are links**, not tabs. Use
`<nav><ul><li><a aria-current="page">`; announcing them as a tablist tells a screen reader
user the panel is already on the page when it is not.

**A profile's tabs are a tablist that keeps the URL in step.** offshoot's `tab-manager`
swaps the panel in place and updates the address (`/details/@brewster/loans`), so the
panel *is* on the page — a tablist is right — and the tab can still be linked to and
reloaded. On the profile the strip sits in the navy band: tabs in the inverse secondary
text, the selected one white with a white bar
([profile-page.md](../patterns/profile-page.md#tabs)). A tab that calls out something new
carries an `.ia-badge--new` after its label, and its `aria-label` says so.

**Search-type tabs are tabs over one panel** ([D-28](../DECISIONS.md#d-28)). The
search page's strip stays a tablist, as live, with its behavior made to fit:

```html
<div role="tablist" aria-label="Search Type">
  <button role="tab" id="st-all"   aria-selected="true"  aria-controls="results">All</button>
  <button role="tab" id="st-books" aria-selected="false" aria-controls="results" tabindex="-1">Books/Documents</button>
  …
</div>
<div role="tabpanel" id="results" aria-labelledby="st-all">…results…</div>
```

- The results region is the single tabpanel; every tab controls it and the selected tab
  labels it.
- **Manual activation.** Arrow keys move focus between tabs; Enter or Space selects.
  Selecting runs a search, so it must not fire on every arrow press.
- Focus stays on the tab. The new result count is announced in a polite live region.
- The strip and the search bar's search-type dropdown set the same thing and must always
  agree.

The accessibility costs of this are recorded for review in D-28.

## Counts

Counts in tab labels ("Forum (7,976)") go inside the accessible name:
`aria-label="Forum, 7,976 posts"`. Don't let a screen reader read "Forum, left paren,
seven thousand nine hundred and seventy six, right paren".

## Don't

- Don't use tabs for more than about eight destinations — the profile page's eight is
  the ceiling. The search page's thirteen search types are the one exception, carried
  from live and flagged in D-28.
- Don't nest tab bars.
- Don't hide the overflow without a scroll affordance.
- Don't change the tab strip's height between breakpoints; the content below it will
  jump.
