# Carousel

> **Use instead:** fewer than about six items → lay them out in a row or a
> [tile](item-tile.md) grid. A full result set → the tile grid with infinite scroll
> ([pagination](pagination.md)).

A single row of tiles that scrolls sideways, a page at a time: the item page's Similar
Items, and the homepage's "New to the Archive?" row (offshoot's `basic-carousel`, which
already scrolls natively with snapping). At 375px that row is a fixed 1.75 tiles of 240px
plus its arrows and pushes the homepage past the viewport
([D-25](../DECISIONS.md#d-25)). The fix is structural, and it is the first rule below.
Top Collections is not a carousel: it is the collection-tile grid with infinite scroll.

## Spec

- **The viewport is a native scroll container** (`overflow-x: auto`) **with scroll
  snapping** (`scroll-snap-type: inline mandatory`). Swipe momentum, trackpads, wheels and
  keyboard scrolling then behave exactly as the platform's do elsewhere, with no script.
- **The viewport is clipped to its container.** The track scrolls inside it; the document
  never scrolls sideways.
- **Items per page follow the width**, one page per roughly 18rem, from 1 below 360px to 6
  at 1080px and up — the result grid's tile size. The container's width decides, not the
  viewport's.
- **Pages are hard stops.** The first item of each page carries `scroll-snap-stop: always`,
  so a fling advances one page, as the arrows and a mouse flick do, instead of flying past
  several.
- **Previous and next** are `ia-button--ghost ia-button--icon ia-button--sm` in the header,
  with the lifted `chevron-left` / `chevron-right` glyphs. Each drops out at its end.
- Gap `--ia-space-4`, the grid gutter. The heading is `.ia-type-section`; its level
  follows the outline.
- Under `prefers-reduced-motion` the arrows jump instead of scrolling smoothly.

```
Similar Items                                            (‹) (›)
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──
│ tile │ │ tile │ │ tile │ │ tile │ │ tile │ │ ←  next page, clipped
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──
```

## Images

Give every image its real URL in `src` with `loading="lazy"`. The viewport already clips its
overflow, so the browser never fetches an off-page thumbnail until it scrolls toward it.
Don't park the URL in a `data-` attribute behind a placeholder `src`; that needs script to
undo and defers an image that is already inline.

## Semantics

```html
<section class="ia-carousel" aria-labelledby="similar-items">
  <div class="ia-carousel__header">
    <h2 class="ia-type-section" id="similar-items">Similar Items</h2>
    <div class="ia-carousel__controls">
      <button class="ia-button ia-button--ghost ia-button--icon ia-button--sm" type="button"
              data-carousel="prev" aria-label="Previous Page">…</button>
      <button class="ia-button ia-button--ghost ia-button--icon ia-button--sm" type="button"
              data-carousel="next" aria-label="Next Page">…</button>
    </div>
  </div>
  <ul class="ia-carousel__viewport" tabindex="0" aria-label="Similar Items, scrollable">
    <li>…a tile…</li>
  </ul>
</section>
```

- The viewport is focusable (`tabindex="0"`) so a keyboard user can scroll it with the arrow
  keys, and each tile's own link is still in the tab order.
- The arrows are real buttons with an `aria-label`. A hidden arrow is `hidden`, so it leaves
  the tab order too.
- Every string it renders is an attribute or text node the template translates — "Previous
  Page", "Next Page", the region label — never a string built in script.

## Contract

- **Events.** Built as a custom element, it fires `ia-carousel-page-change` after each page settles, with `{ page, previousPage,
  totalPages }` in `detail` — `previousPage` lets a consumer infer direction without keeping
  state. `ia-carousel-near-end` when the track settles within two pages of its end, once per
  item count, so a consumer that appends items is asked again and one with nothing left is not.
- **Keyboard.** The platform's scrolling keys on the viewport; the arrows are buttons.
- **Rendering.** Light DOM; items are the viewport's direct children.

## Don't

- Don't let the track set the document's width.
- Don't auto-advance.
- Don't hide the arrows on desktop and rely on hover to reveal them.
- Don't use a carousel for search results.
