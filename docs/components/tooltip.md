# Tooltip

> **Use instead:** anything the reader must see to use the page → visible text. Anything
> interactive — a link, a button — → a popover or [menu](menu.md). A longer explanation →
> hint text under the field ([input](input.md)).

A short label that names an icon-only control for pointer and keyboard users: the sort
direction toggle, the view switch's three glyphs, the tile's info button, a favorite star.
The control is already named by its `aria-label`; the tooltip shows that same name to people
who can see the glyph but not guess it.

## Spec

| Property | Value |
| --- | --- |
| Surface | `--ia-color-surface-inverse`, text `--ia-color-text-inverse` (13.97:1) |
| Type | `--ia-font-size-sm`, `--ia-font-line-height-tight`, one line |
| Padding | `--ia-space-1` block, `--ia-space-2` inline |
| Radius | `--ia-radius-default` |
| Elevation | `--ia-shadow-hover` |
| Layer | `--ia-z-index-tooltip` |
| Placement | centered above the control, `--ia-space-1` away; `--below` when there is no room above. Flips at viewport edges |
| Timing | appears after `--ia-motion-duration-fast`, fading in over the same; disappears at once |

## Behavior

- **Shows on hover and on keyboard focus** — never hover alone, or keyboard users never see
  it.
- **Escape hides it** without moving focus. It returns the next time the pointer or focus
  arrives (WCAG 1.4.13).
- **It stays while the pointer is over it**, so a magnifier user can read it.
- **It never takes focus** and holds nothing interactive.
- On touch, where there is no hover, it doesn't appear; the control's own `aria-label` still
  names it.

## Semantics

```html
<span class="ia-tooltip-anchor">
  <button class="ia-sort-bar__direction" type="button" aria-label="Change to Ascending Sort">…</button>
  <span class="ia-tooltip" aria-hidden="true">Change to Ascending Sort</span>
</span>
```

The tooltip is `aria-hidden` because it repeats the control's `aria-label`; wiring it with
`aria-describedby` as well would make a screen reader read the name twice. Where a tooltip
adds something the name doesn't, drop `aria-hidden`, give it an `id` and point
`aria-describedby` at it.

## Contract

- **Keyboard.** Escape dismisses.
- **Rendering.** Light DOM, a sibling of its control inside `.ia-tooltip-anchor`.

## Don't

- Don't put essential information in a tooltip.
- Don't put links or buttons in one.
- Don't tooltip a control that already has visible text.
- Don't use one for a validation error; that belongs under the field.
