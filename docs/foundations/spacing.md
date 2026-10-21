# Spacing

The live site already has a spacing scale — it just was never written down. Live padding
clusters hard on multiples of five: `5px 5px 5px 5px`, `0 5px`, `5px 10px`, `0 15px`,
`0 30px`. The stray values
(3px, 6px, 7px, 2.5px) are the exceptions, not the rule.

So the scale is the one already in use.

## The scale

Base unit **5px**. With `1rem = 10px`, that is `0.5rem`.

| Token | rem | px | Typical use |
| --- | --- | --- | --- |
| `--ia-space-1` | 0.5 | 5 | icon-to-label gaps, tight chips |
| `--ia-space-2` | 1 | 10 | inside compact controls, list-item gaps |
| `--ia-space-3` | 1.5 | 15 | card padding on mobile, form field gaps |
| `--ia-space-4` | 2 | 20 | card padding, grid gutters, section inner padding |
| `--ia-space-6` | 3 | 30 | button horizontal padding, gaps between blocks |
| `--ia-space-8` | 4 | 40 | space between page sections |
| `--ia-space-12` | 6 | 60 | major section separation |
| `--ia-space-16` | 8 | 80 | page top and bottom margins |

The numbering is the multiple of the base unit, so `--ia-space-4` is four 5px units,
20px. There is no `5`, `7`, `9`… on purpose — the gaps force a choice between two
distinct values rather than letting a 25px creep in. Zero space is written `0`, not a token.

## Page block

| Token | Step | px | Use |
| --- | --- | --- | --- |
| `--ia-space-page-block` | `space-16` | 80 (40 below md) | above and below the page content |

The one spacing token that isn't a step: it re-points itself below the `md` breakpoint, so
page shells don't write their own media query ([D-48](../DECISIONS.md#d-48)). Everything else in a spec names a step
directly — `--ia-space-1` from label to control, `--ia-space-4` between fields. Inline page
gutters are `--ia-container-gutter` and `--ia-container-gutter-narrow`
([Page gutters](#page-gutters)).

## Rules

**Spacing goes on the outside, downward.** A component sets its own internal padding
and the margin *below* it, never the margin above. That way stacking two components is
predictable and nobody fights a collapsing margin. Where a parent needs to control the
rhythm, it uses `gap` on a flex or grid container rather than margins on children.

**One direction per axis.** If a card has `--ia-space-4` padding, it has it on all four
sides unless there is a reason not to. The live `6px 5px 2px 5px` and `4px 0 7px 0`
paddings are the result of nudging something into place; they are not a system.

**Gaps come from the same scale.** `gap`, `column-gap` and `row-gap` use space tokens.
Live uses `10px` and `5px` almost exclusively, which are `--ia-space-2` and
`--ia-space-1`.

## Density

Two densities, because archive.org genuinely needs both.

| Density | Control padding | Row gap | Where |
| --- | --- | --- | --- |
| **Comfortable** | `--ia-space-3` / `--ia-space-4` | `--ia-space-4` | prose pages, forms, item details, signup |
| **Compact** | `--ia-space-1` / `--ia-space-2` | `--ia-space-2` | facet panels, result grids, metadata tables |

A results grid showing fifty items and a signup form with four fields should not share
a padding value. Pick the density for the context and stay in it — don't mix within one
region.

## Page rhythm

```
--ia-space-page-block   above and below the page content       80, 40 below md
--ia-space-12           between major page sections            60, --ia-space-6 below md
--ia-space-8            between blocks inside a section        40
--ia-space-4            between items inside a block           20
--ia-space-1            between a label and its control         5
```

Below the `md` breakpoint (768px) the two largest halve: `page-block` by itself, section
separation by switching to `--ia-space-6`. Everything smaller stays put. 80px of top margin on a 375px screen is most of the first
viewport.

## Page gutters

| Token | Value | Applies |
| --- | --- | --- |
| `--ia-container-gutter` | `--ia-space-4` (20px) | above the `md` breakpoint |
| `--ia-container-gutter-narrow` | `--ia-space-3` (15px) | at and below `md` |

Never let content touch the viewport edge. The gutter is the minimum, on every page,
including full-bleed sections — the background can run edge to edge, the text cannot.

## Don't

- Don't use a value that isn't on the scale. `7px` means somebody was nudging.
- Don't put top margins on components.
- Don't use `margin` where `gap` would do.
- Don't mix densities inside one region.
