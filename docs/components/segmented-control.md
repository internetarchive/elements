# Segmented control

> **Use instead:** five or more options, or options that won't fit on one line →
> [dropdown](dropdown.md). Several at once → checkboxes. An action → [button](button.md).
> Navigation between pages → [tabs](tabs.md) as links.

One choice from two to four options that fit on screen, with one always chosen. The sort
bar's result-view switch (grid / list / compact) is the live instance: in
collection-browser's `sort-filter-bar`, a `ul` of three buttons named by `title`, the chosen
one marked only by an `active` class.

## Spec

| Part | Value |
| --- | --- |
| Track | `--ia-color-surface-sunken`, `--ia-radius-lg` (8px); on a dark surface (`.ia-inverse`), `--ia-color-surface-chrome-secondary` (unchosen labels 7.87:1, chosen 5.74:1 on their fill) |
| Track padding | `--ia-radius-lg` − `--ia-radius-default` (4px), so the 4px segments nest exactly inside the 8px track |
| Gap between options | `--ia-radius-sm` (2px) |
| Height | `--ia-size-control-md` (default) or `--ia-size-control-sm` (`--sm`, toolbars) — the outer box, like every control |
| Option | `--ia-space-2` inline padding, `--ia-radius-default` (4px), 1.4rem / 400, `--ia-color-text-secondary` |
| Chosen option | raised out of the track on the soft selected fill and edge, `--ia-color-selected-soft-fill` and `-soft-border`, with `--ia-shadow-raised`; the label or glyph stays ink, `--ia-color-text-primary` |
| Icon-only option | the glyph at `--ia-size-icon-lg` in a `--ia-size-control-md`-wide option; in `--sm`, whose segments are 20px inside their border, at `--ia-size-icon-sm` (16px), so it stays 2px clear of the chosen edge. An `aria-label` names it |
| Full width | `--block`: options share the width equally |

Unchosen text is `--ia-color-text-secondary` (5.09:1 on the sunken track); the chosen text is
ink, `--ia-color-text-primary` (11.86:1 on its fill). The chosen option is marked by fill,
border and text color together, so it survives grayscale; under `forced-colors` its border
takes `Highlight`.

Option height is a minimum, not a fixed height. In a container too narrow for the labels, a
label wraps inside its option rather than pushing the control past its container.

## States

| State | Treatment |
| --- | --- |
| rest | secondary text, no fill |
| hover | primary text plus `--ia-color-hover-overlay` |
| focus-visible | the universal ring, on the option |
| chosen | soft selected tier, `aria-checked="true"` |
| disabled option | `--ia-color-text-disabled`, `aria-disabled="true"`, skipped by the arrow keys |

On a coarse pointer every option is at least 44×44 ([D-17](../DECISIONS.md#d-17)).

## Semantics

```html
<div class="ia-segmented ia-segmented--sm" role="radiogroup" aria-label="Result View">
  <button class="ia-segmented__option" type="button" role="radio" aria-checked="true"  aria-label="Grid View">…</button>
  <button class="ia-segmented__option" type="button" role="radio" aria-checked="false" aria-label="List View" tabindex="-1">…</button>
  <button class="ia-segmented__option" type="button" role="radio" aria-checked="false" aria-label="Compact List View" tabindex="-1">…</button>
</div>
```

- A `radiogroup` of `radio`s with an `aria-label` naming the group.
- **One tab stop.** Tab moves into the chosen option; only it has `tabindex="0"`.
- Arrow keys and Home / End move the choice among enabled options, wrapping at the ends.
  Left and right follow the text direction, so they swap under `dir="rtl"`.
- The choice takes effect as it moves. If choosing is expensive — it re-runs a search — use
  a dropdown instead, whose choice is committed with Enter.

## Contract

- **Events.** `change`, with the chosen value in `event.detail.value`.
- **Keyboard.** Arrows, Home and End, as above.
- **Rendering.** Light DOM: the options are the markup above.

## Don't

- Don't put more than four options in one.
- Don't use one for an on/off setting; that is a [switch](switch.md).
- Don't let it have no choice. One option is always chosen.
