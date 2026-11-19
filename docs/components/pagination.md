# Pagination and infinite scroll

> **Use instead:** a few items in one sideways row → [carousel](carousel.md).

archive.org uses infinite scroll on search, collection and profile results
(collection-browser's `<infinite-scroller>`), and petabox's (legacy) stylesheets carry a
`.page-buttons .pagination-button` class. Both need to exist: infinite scroll for browsing, explicit paging
for anything a user might want to link to, return to, or work through systematically.

## The rule

**Infinite scroll has no Load More button and no position indicator**
([D-27](../DECISIONS.md#d-27)). What it needs instead:

- **Load on focus as well as on scroll.** The next page loads when the end of the list
  comes into view — by scrolling, or by keyboard focus reaching the last result — so a
  keyboard user tabbing through results keeps getting more.
- **A URL that reflects the loaded range**, so a result can be linked to and the back
  button returns you to where you were.
- **No focus or scroll jump** when new results arrive.

Nothing below an infinite list can be reached while more results remain, so nothing
people need — footer links included — may live only there. The accessibility costs of
this are recorded for review in D-27.

## Numbered pagination

For long, ordered, linkable sets — reviews, forum threads, file listings.

```html
<nav aria-label="Search Results Pages">
  <ul class="ia-pagination">
    <li><a href="?page=1" aria-label="Previous Page" rel="prev">‹</a></li>
    <li><a href="?page=1">1</a></li>
    <li><span aria-hidden="true">…</span></li>
    <li><a href="?page=4">4</a></li>
    <li><a href="?page=5" aria-current="page">5</a></li>
    <li><a href="?page=6">6</a></li>
    <li><a href="?page=20">20</a></li>
    <li><a href="?page=6" aria-label="Next Page" rel="next">›</a></li>
  </ul>
</nav>
```

| Property | Value |
| --- | --- |
| Item size | `--ia-size-target-min` (44×44) |
| Radius | `--ia-radius-default` |
| Rest | `--ia-color-text-link`, transparent background |
| Hover | `--ia-color-hover-overlay` |
| Current | the strong selected tier — `--ia-color-selected-strong-fill`, white text — with `aria-current="page"` |
| Disabled | `--ia-color-text-secondary`, `aria-disabled`, still focusable |
| Gap | `--ia-space-1` |

- Always show first, last, current, and one either side. Ellipses are `aria-hidden`
  `<span>`s, never links.
- Prev/Next are real links with `rel` and an `aria-label`; the chevron is decorative, and
  under `dir="rtl"` the two chevrons swap direction, because "previous" points back along
  the reading direction.
- **When the total isn't known** — a Wayback listing that is still counting — show only
  Previous and Next, and disable Next only when the server says there is no next page.
- **Below `sm` the numbers collapse.** Eight 44px targets need about 400px, which does
  not fit a 375px viewport — so mark the numbered items `.ia-pagination__number`, mark
  the current one `data-current`, and add a `.ia-pagination__summary` list item. Below
  480px the numbers hide and the summary appears:

  ```
  ‹   Page 5 of 20   ›
  ```

  The summary is `aria-hidden`; `aria-current="page"` on the number already tells a
  screen reader where it is, and the numbers stay in the DOM so nothing is lost.

## Sort and view controls

The bar above the results — sort direction, sort field and the result view — is its
own component: [sort-bar.md](sort-bar.md).

## Don't

- Don't put anything people need below an infinite list; they cannot reach it.
- Don't put pagination only at the bottom of an infinite list; the user will never
  reach it.
- Don't reset scroll position on a sort change without saying so.
- Don't make ellipses focusable.
