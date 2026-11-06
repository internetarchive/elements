# Design system docs

The archive.org design system, moved here from the style guide repo so that the
components and the system they implement live together.

| Path | What it is |
| --- | --- |
| [foundations/](foundations/) | Principles, color, type, spacing, radius, elevation, motion, layout, iconography, accessibility, content voice |
| [components/](components/) | One spec per component: anatomy, sizes, states, behavior, and how the element (where there is one) differs |
| [patterns/](patterns/) | Page-level patterns: page shells, forms, the item and profile pages, empty and loading states |
| [DECISIONS.md](DECISIONS.md) | Every decision the system makes, numbered `D-01` onward, each with the live value it replaces |

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

## Left in the style guide repo

The style guide repo also had tooling these docs mention in places: the decisions
review page and `make-decisions.mjs` that generated `DECISIONS.md`, the icon and
brand lifting scripts (`make-icons.mjs`, `make-brand.mjs`, `live-icons.json`), the
Claude Design sync and its React wrappers, and the static `design-system/` export.
None of it moved. `DECISIONS.md` and `demo/docs/assets/icons.js` are now edited by
hand, and the contrast check is `src/themes/tokens.node.test.ts`.
