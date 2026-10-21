# Radius

Live ships border-radius values of `0`, `2`, `3`, `3.25`, `4`, `5`, `7`, `8`, `10`,
`20`, `24`, `60px` and `50%`, plus mixed corner sets like
`4px 4px 0 0` and `3px 0 0 3px`. `3.25px` is not a design decision; it is a rounding
artifact.

Five values replace them. [D-13](../DECISIONS.md#d-13)

| Token | Value | Use |
| --- | --- | --- |
| `--ia-radius-sm` | 0.2rem (2px) | checkboxes, tags, and corners nested tight inside another control |
| `--ia-radius-default` | 0.4rem (4px) | **the default** — buttons, inputs, selects, cards, tiles, messages, modals, drawers, dropdown and menu panels, tooltips, segments |
| `--ia-radius-lg` | 0.8rem (8px) | media cards, the hero panel, the segmented control's track |
| `--ia-radius-pill` | 999rem | search fields, chips, badges, the switch track |
| `--ia-radius-circle` | 50% | avatars, round icon-only buttons, the switch knob |

A flush edge — a full-bleed panel, a table cell — has no radius: write `0`.

**The step carries a meaning.** Something that is a small object in its own right — a
checkbox, a tag — is `sm`. Something that sits in the page or floats over it — a button, a
field, a card, a modal — is `default`. Something large and pictorial — a media card — is
`lg`. A bigger box reads squarer at the same radius, which is why one step covers both a
30px button and a 1000px card without either looking wrong.

## Why 4px is the default

It is already the most common radius on the site by a wide margin — collection-browser's
tiles among them (`--tileCornerRadius`, 4px) — and it is already declared as
`--ia-theme-button-border-radius: 0.4rem` (offshoot's `theme-manager/themes/shared.ts`). Nothing needs to change for most
of the site to comply.

## Mixed corners

Mixed corner radii are legitimate when two elements are joined: a tab that sits on a
panel (`4px 4px 0 0`), the left cap of a segmented search bar (`4px 0 0 4px`). Build
them from `--ia-radius-default`, don't invent a new number:

```css
border-radius: var(--ia-radius-default) var(--ia-radius-default) 0 0;
```

Live's search bar (elements' `ia-dropdown-search-bar`) builds its halves from
`5px 0 0 5px` and `0 5px 5px 0`. They match each other but not the scale.

## Nesting

An inner radius should be smaller than the radius that contains it, by roughly the
padding between them. A `--ia-radius-lg` card containing a button gives that button
`--ia-radius-default`. Never give a child a larger radius than its parent.

## Don't

- Don't use `--ia-radius-pill` on anything that can wrap to two lines — the caps stop
  looking like caps.
- Don't mix `--ia-radius-default` and `--ia-radius-lg` on sibling cards in the same grid.
- Don't use `--ia-radius-circle` on anything that isn't actually square.
