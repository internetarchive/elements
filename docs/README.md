# Design system docs

The archive.org design system, moved here from the style guide repo so that the
components and the system they implement live together.

| Path | What it is |
| --- | --- |
| [foundations/](foundations/) | Principles, color, type, spacing, radius, elevation, motion, layout, iconography, accessibility, content voice |
| [components/](components/) | One spec per component: anatomy, sizes, states, behavior, and how the element (where there is one) differs |
| [patterns/](patterns/) | Page-level patterns: page shells, forms, the item and profile pages, empty and loading states |
| [DECISIONS.md](DECISIONS.md) | Background: how the system was derived from the live site, each value it changed and why. A closed record |

The tokens themselves are in [tokens/tokens.json](../tokens/tokens.json); see the
README's [Design tokens](../README.md#design-tokens) section.

## In the demo

The demo renders the system next to the elements, as tabs:

- **Principles** reads [foundations/principles.md](foundations/principles.md).
- **Foundations** shows every token, read live from the generated stylesheet.
- **Components** is the elements themselves.
- **Specs** is the reference look for each component spec, drawn with
  `demo/docs/assets/ia.css`. It shrinks as elements land: once an element matches
  its spec, the section and its `ia.css` rules go.
- **Screens** composes whole archive.org pages from the reference CSS.
- **Icons** is the guidance for the shipped `icons/` set.
- **Playground** puts the reference CSS under the conditions it fails in: long
  content, RTL, density, dark chrome, coarse pointers.

`ia.css` and the pages under `demo/docs/` are demo-only and do not ship in the
package.

## Which components follow it

Where each element stands once the WEBDEV-9043 PRs have landed. "On tokens" means its colors and sizes come from the tokens; a few px values (hairlines, offsets) stay literal on purpose.

| | Elements |
| --- | --- |
| On tokens | `ia-button`, `ia-otp-form`, `ia-otp-input`, `ia-donation-thermometer` · `ia-radio-player`, `ia-waveform-progress`, `ia-scrubber-bar`, `ia-transcript-view`, `ia-playback-controls`, `ia-expandable-search-bar` · `ia-topnav` · `ia-dropdown`, `ia-dropdown-search-bar`, `ia-combo-box`, `ia-clearable-text-input`, `ia-wayback-search-form` |
| Partly | `ia-book-actions`, `ia-feature-feedback`, `ia-donation-form`, `ia-reviews`, `modal-manager`, `ia-histogram-date-range`, `ia-image-viewer`: rem values that match a token read it, but most colors and the other sizes are still literal |
| Not yet | `ia-item-navigator`, `ia-infinite-scroller` |
| Nothing to convert | `ia-icon`, `ia-status-indicator`, `ia-sr-only-text`, `ia-audio-element`: they inherit their colors or have no styles of their own |

Moving the partial and unconverted ones onto tokens is the literal-to-token follow-up. The donation form's hosted payment fields keep literal colors: the payment provider styles them inside an iframe, which CSS custom properties can't reach.

## Changing the system

Change `tokens/tokens.json` and the spec it touches in one PR, and say why in the PR. A new color pairing goes in `src/themes/tokens.node.test.ts` so its contrast is checked, and a new length goes in a group with a scale flag or `pnpm run tokens` fails.

## Left in the style guide repo

The style guide repo also had tooling these docs mention in places: the decisions
review page and `make-decisions.mjs` that generated `DECISIONS.md`, the icon and
brand lifting scripts (`make-icons.mjs`, `make-brand.mjs`, `live-icons.json`), the
Claude Design sync and its React wrappers, and the static `design-system/` export.
None of it moved. `DECISIONS.md` is a closed record, `demo/docs/assets/icons.js` is
edited by hand, and the contrast check is `src/themes/tokens.node.test.ts`.
