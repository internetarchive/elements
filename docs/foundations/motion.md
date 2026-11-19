# Motion

Motion on archive.org is already restrained, which is right for a library. The durations
in use cluster sensibly — 50, 100, 200, 300ms — and the only real gap is that easing is
always a bare CSS keyword, so every transition accelerates slightly differently from
every other one depending on which keyword the author reached for.

## Duration

| Token | Value | Use | Live equivalent |
| --- | --- | --- | --- |
| `--ia-motion-duration-instant` | 50ms | press feedback, tile scale | `transform 0.05s ease` (collection-browser's tiles) |
| `--ia-motion-duration-fast` | 100ms | small state changes — checked, selected, expanded | `background, color 0.1s ease-out` (ia-topnav's dropdown) |
| `--ia-motion-duration-base` | 200ms | the default — expand/collapse, fades, focus rings | the most common live duration |
| `--ia-motion-duration-slow` | 300ms | drawers, sheets, anything crossing the viewport | `right 0.3s ease` |
| `--ia-motion-duration-spin` | 700ms | one revolution of any spinner, linear | — |

Nothing in the interface should take longer than 300ms. `spin` is the exception because it
is continuous, not a transition: every spinner turns at the same speed, so two on one page
never look out of step. A library is a tool; waiting for
an animation to finish before you can read a result is a cost with no return.

## Easing

| Token | Value | Use |
| --- | --- | --- |
| `--ia-motion-easing-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | anything that moves and stays on screen |
| `--ia-motion-easing-enter` | `cubic-bezier(0, 0, 0.2, 1)` | things appearing — decelerate in |
| `--ia-motion-easing-exit` | `cubic-bezier(0.4, 0, 1, 1)` | things leaving — accelerate out |
| `--ia-motion-easing-linear` | `linear` | progress bars, spinners, anything continuous |
| `--ia-motion-easing-state` | `standard` | checked, selected, expanded and disabled changes |

Exits are faster than entrances. If you are pairing them, use `fast` out and `base` in.

## Press

Controls squeeze on `:active` ([D-49](../DECISIONS.md#d-49)). The scale is tiered by width
so the edge travels about 1.5px at every size: 3% of a 30px icon button is sub-pixel, and
3% of a 460px bar is a lurch.

| Token | Value | Use |
| --- | --- | --- |
| `--ia-motion-press-scale-compact` | 0.92 | square icon controls |
| `--ia-motion-press-scale-default` | 0.97 | text buttons |
| `--ia-motion-press-scale-wide` | 0.985 | full-width buttons, tiles |

Pick by width, not by importance. The transform runs over `--ia-motion-duration-instant`
and sits on top of the active fill change, which stays. Only self-contained controls scale:
menu rows, facet rows and surfaces never do, and a link button, which has no box, doesn't.
Under `prefers-reduced-motion` there is no transform; the fill change remains.

## What to animate

Only `transform` and `opacity` for anything that moves. They are composited; `top`,
`height` and `width` are not, and live currently animates `top`, `right`, `max-height`
and `row-gap`. On a long results page, animating `max-height` on a facet panel with
sixty checkboxes inside it is a visible stutter on a mid-range phone.

Color, `background-color`, `border-color` and `box-shadow` are fine to transition on a
**state** change — checked, selected, expanded, disabled — with `--ia-motion-easing-state`.
They are cheap and they are most of what the interface actually needs.

## Hover snaps

Hover never transitions ([D-54](../DECISIONS.md#d-54)). A pointer landing gets its
response on the same frame: the fill, border, color or shadow changes at once. A soft fade
looks refined in a prototype; under your own cursor it reads as lag. Press and state
changes still animate — the snap is for hover alone.

## Reduced motion

Every animation must be removable. This belongs in the global reset, not in each
component:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
}
```

Live honors `prefers-reduced-motion` only component by component — offshoot's
`toggle-switch.ts` and `ia-image-card.ts`, collection-browser's tile hover pane — and
never globally.

Reduced motion means *less movement*, not *no feedback*. A hover that changes color
should still change color; a panel that slides should simply appear.

## Don't

- Don't animate `height`, `width`, `top` or `left`. Use `transform`.
- Don't animate anything on first paint. Page load is not an event worth decorating.
- Don't use a duration that isn't on the scale.
- Don't animate the focus ring's appearance — it must be instant. Its color may fade.
