# Read more

> **Use instead:** controls → show them, or put them behind a disclosure with a heading.
> Prose and long lists collapse; nothing else does.

Collapses long prose to a few lines with a toggle — collection summaries, which run from
one line to thousands of words — and long lists to their first rows: an item's full
metadata. An item's description is never collapsed; it shows in full
([item-page.md](../patterns/item-page.md#main-column)).

## Spec

| Property | Value |
| --- | --- |
| Collapsed height | 6 lines of the text's own line height (`calc(6 * 1lh)`); set `--_lines` to change it |
| Fade | a mask over the last 40% of the collapsed text, so it works on any surface with no color to match |
| Toggle | `ia-button--link`, "Show More" / "Show Less", `--ia-space-1` below the text |
| Threshold | **the toggle appears only when at least four lines are hidden.** Hiding less than that isn't worth a control; short text shows whole, with no toggle |
| Expanded | the full text, no fade; the toggle stays below it |

## No layout shift

The component measures its content after it renders. The collapsed height is a
`max-block-size` on the text, not on the host, so the page reserves the collapsed height from
the first paint and nothing below it moves while it measures. A description that fits is
never collapsed and then expanded.

## Semantics

```html
<div class="ia-read-more ia-type-prose">
  <div class="ia-read-more__body" id="description">…</div>
  <button class="ia-button ia-button--link ia-read-more__toggle" type="button"
          aria-expanded="false" aria-controls="description">Show More</button>
</div>
```

- The full text is always in the DOM: collapsing is visual, so search, screen readers and
  copy get all of it.
- The toggle carries `aria-expanded` and points at the text with `aria-controls`.
- Focus stays on the toggle when it changes.

## Lists

`.ia-read-more--list` collapses a description list by rows instead of lines: the first
twelve label-and-value pairs show, the rest wait behind the same toggle. There is no fade —
a cut row reads as a cut, not as more text — and the toggle appears only past twelve rows.
It is offshoot's `collapsible-metadata-list` (`numUnhiddenRows = 12`) on the system's toggle.

```html
<div class="ia-read-more ia-read-more--list">
  <dl class="ia-meta ia-read-more__body" id="all-metadata">…</dl>
  <button class="ia-button ia-button--link ia-read-more__toggle" type="button"
          aria-expanded="false" aria-controls="all-metadata">Show More</button>
</div>
```

## Contract

- **Events.** Native `click` on the toggle.
- **Rendering.** Light DOM. The host gains `data-overflowing` when the threshold is met and
  `data-expanded` when open.

## Don't

- Don't collapse anything but prose and long lists.
- Don't collapse text that is hidden by fewer than four lines.
- Don't use a fixed pixel height; it cuts lines in half at other font sizes.
