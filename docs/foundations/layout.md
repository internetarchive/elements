# Layout

## Breakpoints

Live media queries hit dozens of distinct pixel breakpoints, several of which disagree
at exactly one pixel: 767 / 768 / 769, 880 / 889 / 890, 990 / 991 / 992, 1199 / 1200 /
1201, 390 / 391.

Four replace them. [D-15](../DECISIONS.md#d-15)

| Token | Value | What changes here |
| --- | --- | --- |
| `--ia-breakpoint-sm` | 480px | single-column layouts gain a second column; compact chrome relaxes |
| `--ia-breakpoint-md` | 768px | tablet layout; page gutters widen; inputs drop from 16px to 1.4rem |
| `--ia-breakpoint-lg` | 890px | **the big one** — the topnav switches to desktop, sidebars appear, `display` and `page-title` step up |
| `--ia-breakpoint-xl` | 1200px | the widest grid tier; the page container stops growing |

**890px is deliberately kept even though it is an odd number.** It is the dominant live
breakpoint by a wide margin, and it is where `ia-topnav` swaps between its mobile and
desktop layouts (`TOPNAV_MOBILE_BREAKPOINT`, which offshoot imports). Moving it to
a round 900 would mean re-testing the navigation on every page for a cosmetic gain.

Media queries can't read custom properties, so the tokens are documentation; write the
literal value and reference the token in a comment:

```css
@media (min-width: 890px) { /* --ia-breakpoint-lg */ }
```

Write a query at a breakpoint, `min-width: <bp>`, or just below it,
`max-width: <bp − 1px>` (767, 889, 479), as offshoot does — never a near-duplicate.
Live mixes 767, 768 and 769 freely, which is how one-pixel gaps happen. The result
grid's 880px and 360px column steps are collection-browser's own and stay with the grid
([D-39](../DECISIONS.md#d-39)).

## Containers

Live uses max-widths of 1350, 1170, 1000, 600, 570, 440, 430 and 300. Three remain.

| Token | Value | Use |
| --- | --- | --- |
| `--ia-container-page` | 135rem (1350px) | the default page container — already `--app-page-max-width` (offshoot's `index.css`) |
| `--ia-container-prose` | 100rem (1000px) | anything read as continuous text: item descriptions, help, policy pages |
| `--ia-container-form` | 60rem (600px) | forms — signup, login, upload metadata |

Account settings is the one page-specific width: 70rem (700px), as offshoot sets it, since
its preference rows need three columns ([account-settings.md](../patterns/account-settings.md#width)).

`1170px` is Bootstrap 3's `.container` on petabox's legacy item page, and offshoot's details
page keeps it on purpose (`--pageMaxWidth--: 1170px`). This guide puts the item page on
`--ia-container-page` (1350px) like every other page, so offshoot's details page widens. `570px` is a signup-only variant of 600 and
retires. [D-12](../DECISIONS.md#d-12)

`prose` exists because a 1350px line of 14px text is about 190 characters — roughly
triple the comfortable reading measure. Any block of prose gets the narrower container
even on a page that is otherwise full width.

Containers are centered with `margin-inline: auto` and always carry
`--ia-container-gutter` (or `--ia-container-gutter-narrow` at and below `md`) as inline
padding, so content never touches the viewport edge.

## Grid

Twelve columns, `--ia-space-4` (20px) gutter.

| Breakpoint | Columns available | Result-tile grid |
| --- | --- | --- |
| base (<480) | 4 | 2 across |
| sm (480) | 8 | 3 across |
| md (768) | 12 | 4 across |
| lg (890) | 12 | 5 across, sidebar appears |
| xl (1200) | 12 | 6 across |

The result grids should use `repeat(auto-fill, minmax(…, 1fr))` rather than fixed column
counts — live already does this through `--infiniteScrollerCellMinWidth` (17rem, 15rem at
880px and below, 12rem at 360px and below; collection-browser's `collection-browser.ts`), and it degrades better than counted columns.
The counts above are indicative ([item-tile.md](../components/item-tile.md#grid)).

## Page shells

Four shells cover every page. See
[patterns/page-shells.md](../patterns/page-shells.md) for the full anatomy.

| Shell | Container | Pages |
| --- | --- | --- |
| Full-bleed marketing | `page`, sections may bleed | homepage |
| Browse | `page` + left facet rail above `lg` | search, collection, profile |
| Record | `page` for the header, `prose` for the body | item details |
| Focused task | `form`, centered, no rail | signup, login, upload |

## Horizontal overflow

At 375px the homepage document is **441px wide** — it overflows by 66px, from the "New to
the Archive?" carousel (offshoot's `basic-carousel`), whose track extends past the viewport
instead of being clipped to it.

A horizontally scrolling *region* is fine and often right — the search page's tab strip
and every carousel are deliberately scrollable. What is never acceptable is the
**document** scrolling horizontally. The rule: any scrolling track sits inside a wrapper
with `overflow-x: auto` and the wrapper is constrained to the container width.

Test: `document.documentElement.scrollWidth` must equal `clientWidth` at 375px.

## Layering

Live assigns `z-index` locally with no shared scale: 1 through 5, 10 and 1000 in offshoot,
collection-browser and ia-topnav alone, and one third-party widget at
2000000000. Conflicts get resolved by escalating, which is how you end up at 1000.

| Token | Value | Layer |
| --- | --- | --- |
| `--ia-z-index-raised` | 10 | a card lifted on hover |
| `--ia-z-index-sticky` | 100 | sticky table headers, sticky facet rails |
| `--ia-z-index-dropdown` | 200 | menus, comboboxes, autocomplete |
| `--ia-z-index-header` | 300 | the topnav |
| `--ia-z-index-overlay` | 400 | modal scrims |
| `--ia-z-index-modal` | 500 | modal and drawer surfaces |
| `--ia-z-index-toast` | 600 | transient notifications |
| `--ia-z-index-tooltip` | 700 | tooltips, over everything |

Gaps of 100 leave room to slot something in without renumbering. Nothing in product
code sets a raw `z-index` [D-16](../DECISIONS.md#d-16), and `tools/verify.mjs` fails a
stylesheet that does. Within a band, ties resolve by document order; a component that must
beat its peers needs its own band, not a bigger number.

There is no zero layer. `z-index: 0` orders nothing — it paints the same as `auto` — and
its only effect is to create a stacking context, which `isolation: isolate` says outright.

### Layers inside a component

The bands are for page chrome. A component that layers its own parts — the tile's info
button over its thumbnail, a histogram's handles over its bars — **sets `isolation: isolate`
on its root and orders the parts with local ordinals** ([D-50](../DECISIONS.md#d-50)):

| Token | Value |
| --- | --- |
| `--ia-z-index-local-1` … `--ia-z-index-local-5` | 1 … 5 |

```css
.ia-tile       { position: relative; isolation: isolate; }
.ia-tile__info { position: absolute; z-index: var(--ia-z-index-local-1); }
```

The ordinals mean nothing outside an isolated root, so they can't collide with a page
band. **A shadow root is not a stacking context.** A `z-index` inside a web component
competes with the whole page unless something isolates it, so every Lit component with
internal layers sets `isolation: isolate` on `:host`.
