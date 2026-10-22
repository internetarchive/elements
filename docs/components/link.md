# Link

> **Use instead:** something that acts on this page → [button](button.md). Commands behind a
> trigger → [menu](menu.md).

## Color

| Context | Token | Value | Contrast |
| --- | --- | --- | --- |
| light surfaces | `--ia-color-text-link` | `#3a4fd6` | 6.42 / 6.22 / 5.70 |
| hover, light | `--ia-color-text-link-hover` | `#194880` | 9.21:1 |
| dark surfaces — the topnav, the `#000` theater | `--ia-color-text-inverse-link` | `#9aa8ff` | 7.14:1 on `#222`, 9.42:1 on `#000` |
| hover, dark | `--ia-color-text-inverse-link-hover` | `#ffffff` | 15.91:1 on `#222`, 21:1 on `#000` |

Inside `.ia-inverse` the link tokens re-point themselves, hover included, so a link in
dark chrome or the theater needs no class of its own. The light link `#3a4fd6` is 3.27:1 on
`#000` and never appears there.

The live `#4b64ff` (offshoot's light theme `--ia-theme-link-color`, and collection-browser's
fallback) fails on the surfaces it is actually used on — 4.45:1 on the
`#fbfbfd` page background, 4.08:1 on the `#f1f1f4` sunken surface, 3.46:1 on the topnav.
See [D-07](../DECISIONS.md#d-07).

## Underlines

| Context | At rest | On hover |
| --- | --- | --- |
| Prose — item descriptions, help, policy pages | underlined | underlined |
| UI — nav, tiles, facets, metadata rows | not underlined | underlined |

Underlining every link in a result grid of fifty tiles is noise. Underlining every link
in a paragraph is what makes the paragraph navigable. The dividing line is whether the
link sits in running text.

**Color is never the only signal.** In UI contexts the link is distinguished by
position and by the hover underline; in prose by the rest-state underline (WCAG 1.4.1).

Use `text-underline-offset: 0.15em` and `text-decoration-thickness: 1px` so descenders
stay legible at 14px.

## States

```css
.ia-link {
  color: var(--ia-color-text-link);
  text-decoration: none;
  text-underline-offset: 0.15em;
}
.ia-link:hover { color: var(--ia-color-text-link-hover); text-decoration: underline; }
.ia-link:focus-visible {
  outline: var(--ia-size-focus-ring) solid var(--ia-color-border-focus);
  outline-offset: var(--ia-size-focus-ring-offset);
  border-radius: var(--ia-radius-sm);
}
.ia-prose a { text-decoration: underline; }
```

`:visited` is not styled. archive.org pages are frequently revisited deliberately and a
visited color adds a second blue to reason about for no user benefit.

## Text

Link text must make sense read on its own — screen reader users navigate by pulling up
a list of every link on the page.

| Instead of | Write |
| --- | --- |
| Click here | Read the collection policy |
| More… (repeated down a search page) | Show 42 more collections |
| this page | the Wayback Machine FAQ |

Where the visible text genuinely has to be short, put the full phrase in `aria-label`
and keep the visible text as its prefix (WCAG 2.5.3).

## Targets

A link in running text is exempt from the 44px minimum — it is sized by its text. A link
acting as a control (a tile, a nav item, a facet) is not, and gets
`--ia-size-target-min`.

## The unstyled logo link

`a.link-home` in the topnav renders at `rgb(0, 0, 238)` — the browser default link
color — because ia-topnav's `primary-nav` styles never give it one. It is invisible in practice because its content
is an SVG, but the color leaks into any text fallback and it is a signal that the
element was never styled.

## Skip link

Keep the live implementation (offshoot's app root): first focusable element, visually
hidden until focused, then shown top-left, above the header, with a visible focus ring. It is one of the few elements on the
live homepage that *has* a focus ring.

## Don't

- Don't use an `<a>` without `href` as a button.
- Don't open in a new tab without saying so. If you must, append a visually-hidden
  "(opens in a new tab)" and an icon.
- Don't underline non-links.
- Don't use the donate colors for a link.
