# Elevation

Live has unrelated shadows and no scale. The commonest:

| Shadow | Where | Problem |
| --- | --- | --- |
| `rgb(44, 44, 44) 1px 1px 2px` | collection-browser's tiles (`1px 1px 2px 0` in the text color) | fully opaque — reads as a hard offset edge, not depth |
| `rgb(204, 204, 204) 1px 1px 2px` | offshoot's homepage hero | opaque, lighter, otherwise the same idea |
| `rgba(0, 0, 0, 0.15) 0 1px 2px 1px` | ia-topnav's dropdown menu | the only one that behaves like a shadow |
| `rgb(195, 173, 151) 3px 3px 0` | the Wayback search on the homepage (`ia-wayback-search`) | a hard beige offset |
| `rgba(0, 0, 0, 0.075) 0 1px 1px inset` | text inputs, e.g. offshoot's account settings | Bootstrap's input inset |

The commonest is opaque and offset down-right, which reads as a border drawn on two
sides rather than as a raised surface. Four translucent shadows replace the set, each
named for the job it does. [D-14](../DECISIONS.md#d-14)

## The four shadows

| Token | Value | Use |
| --- | --- | --- |
| `--ia-shadow-raised` | `0 1px 2px 0 rgba(0,0,0,0.15)` | a card at rest, the topnav, the chosen segment |
| `--ia-shadow-hover` | `0 2px 6px 0 rgba(0,0,0,0.15)` | an interactive card or tile on hover |
| `--ia-shadow-overlay` | `0 4px 16px 0 rgba(0,0,0,0.18)` | modal, drawer, dropdown and menu panels, the tile hover pane, toast, the item viewer's image |
| `--ia-shadow-floating` | `0 1px 4px 0 rgba(0,0,0,0.35)` | a control that always sits over media — the tile's info button, player controls |

A flat surface has no shadow: write `none`. There is no inset shadow; a pressed control
darkens its fill and squeezes ([motion.md](motion.md#press)).

`raised` is the live topnav dropdown's shadow (ia-topnav's `dropdown-menu.ts`) without
its 1px spread: the one live shadow that already reads as depth becomes the base of the
scale.

`floating` is the one exception to "elevation is a state": a control drawn over a
thumbnail has no page edge to separate it from, and over light artwork a flat white disc
disappears. It is heavier than `raised` because it has to read against any image, not
against the page.

## Overlays

**An overlay with a scrim needs no separating border.** The scrim and
`--ia-shadow-overlay` separate the modal from the page. The modal's 2px frame isn't that:
it is the header band's color carried around the body, as offshoot draws it
([D-33](../DECISIONS.md#d-33)).

**A light overlay without a scrim carries a hairline.** A white popover on the near-white
page loses its edge to a soft shadow alone, so it takes `--ia-border-card` as well. The
border draws the edge; the shadow is then free to stay light and read as depth. Dark
panels — the dropdown, the menu — need neither, because the panel color is the edge.

**The scrim and its blur follow modality, never the breakpoint.** Every modal surface —
the modal, the drawer, the bottom sheet — gets the same `--ia-color-surface-scrim` and
`--ia-blur-scrim` (3px) — 50% black — so they read as one
gesture: the blur pushes the page back, the dim makes it inert. A non-modal overlay — a popover, a menu, a tooltip — gets neither.

## Rules

**Shadows are all straight down.** No horizontal offset. A light source that moves
between components is what makes an interface feel assembled rather than designed.

**Elevation is a state, not decoration.** A card at rest is `raised`; the same card on
hover is `hover`. Something that never changes state does not need a shadow — use a border.

**One step per interaction.** `raised` → `hover` on hover. Never `raised` → `overlay`.

**Elevation and z-index are different things.** A shadow says "this is above the page".
`z-index` says "this paints over that". Pick the shadow from this scale and the
`z-index` from [layout.md](layout.md#layering); a dropdown is `overlay` and
`--ia-z-index-dropdown`, and those two facts are unrelated.

## On dark surfaces

Shadows barely register on `#222`. Use a border — `--ia-color-border-inverse` — or a
lighter background to separate layers in the chrome instead.

## Don't

- Don't use an opaque shadow color. If you want a line, use a border.
- Don't offset horizontally.
- Don't stack shadows to invent an intermediate level.
- Don't put a shadow on something that already has a `--ia-color-border-strong` edge;
  pick one.
