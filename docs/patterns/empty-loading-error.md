# Empty, loading and error states

The three states a results-driven site spends most of its time in and documents least.

## Loading

**Match the shape of what is coming.** A skeleton that mirrors the layout prevents the
reflow that a spinner-then-content swap causes, and it tells the user what kind of
thing is arriving.

| Situation | Use |
| --- | --- |
| A grid or list of known shape | Skeleton tiles at the exact dimensions |
| A single small region | Skeleton block |
| An action in progress (button) | Spinner inside the button, label unchanged |
| Unknown duration, unknown shape | Centered activity indicator plus a text label |
| Under about 300ms | Nothing — a flash of skeleton is worse than a brief pause |

Skeletons are `--ia-color-surface-sunken` blocks with `--ia-radius-default`, pulsing
between 100% and 60% opacity over 1.5s. Under `prefers-reduced-motion` they are static. collection-browser's
loading tiles are a still `#ddd`-to-`#d8d8d8` gradient; the pulse is the system's, so a
grid that is still coming never looks like a grid of empty results.

```html
<div role="status" aria-live="polite" aria-busy="true">
  <span class="ia-visually-hidden">Loading search results…</span>
  <div class="ia-tile-grid" aria-hidden="true">
    <div class="ia-skeleton"></div>  <!-- one per tile, at the tile's size -->
    …
  </div>
</div>
```

The skeleton itself is `aria-hidden`; the announcement is the visually-hidden text.
Fifty skeleton tiles announced individually is not useful.

Every spinner turns once per `--ia-motion-duration-spin` (700ms), linear, so two on one
page never look out of step.

Two indicators exist live. Use `ia-status-indicator` (below) for the unknown-shape case;
it replaces `<ia-activity-indicator>` (iaux; offshoot loads 0.0.6 through BookReader), which is retired:

| | `ia-activity-indicator` | Why it goes |
| --- | --- | --- |
| Motion | ring and dots on 1.3s, no `prefers-reduced-motion` handling | off the 700ms spin; ignores reduced motion |
| Color | `#333`, done state `#31A481` | the done green is the one [D-10](../DECISIONS.md#d-10) replaced |
| Semantics | no `role="status"` | a screen reader hears nothing |
| Size | a fixed 120×120 box | sized by its container, not a token |

### The live component

The newer indicator is `ia-status-indicator` (from `@internetarchive/elements`), which
`ia-button` uses for its loading state; the Claude Design card `IAStatusIndicator`
renders it. This system has no indicator of its own beyond the lifted `spinner` glyph and
`ia-skeleton`, so the component is the reference:

| Part | `ia-status-indicator` |
| --- | --- |
| States | `ready` (reserves the space, draws nothing), `loading`, `success`, `error` |
| Loading | a ring with three animated dots, or a media-type glyph (`mediatype`), or bare (`hideDots`) |
| Success, error | a check in `--ia-theme-color-success`, an "!" in `--ia-theme-color-danger` |
| Color | the ring and dots follow `--ia-theme-primary-text-color` |
| Size | `--ia-theme-icon-width` (20px here). offshoot sets `--icon-width: 4rem` (40px) on the home page and details router, 6rem in account settings, and `width: 5rem` in white on the theater and BookReader. In this system a page-level loader is `--ia-size-icon-2xl` (40px) |
| Mode change | from elements 1.1.3 (offshoot is on 1.1.2, which snaps), the modes cross-fade over 250ms, ease-out: each mode is its own layer, stacked in one grid cell. No fade on first render; none under `prefers-reduced-motion` |
| Accessible name | the SVG is `role="status"`, named by a `<title>` per state (`loadingTitle`, `successTitle`, `errorTitle`). From 1.1.3 these default to `undefined` and fall back to localized strings (`msg('Loading...')` …); the element is `@localized()` |

It is the "activity indicator" this table calls for. The visible text label this table
asks for is still the consumer's to add.

## Empty

Three sentences at most: what is not here, why, what to do next. An empty state is a
place someone got stuck; it should contain the way out.

### No results on a browse page

collection-browser's `empty-placeholder` replaces **the whole browser** — rail, sort bar
and results — with the message as an `<h2>` over a large illustration. The spec keeps
that layout and adds the way out under the message:

```
        Your search did not match any items in the Archive.      h2, .ia-type-section
        Try different keywords or a more general search.

        [ Clear Filters ]  [ Search All Media Types ]            actions

                  ( large illustration, max 40rem tall )         null-result
```

`.ia-results-placeholder`: centered, `--ia-space-8` block padding (`--ia-space-4` below
`md`); the title up to the prose width; the actions in a centered row; the illustration
(`demo/docs/assets/illustrations/null-result.svg`, lifted from collection-browser,
`aria-hidden`) at most 40rem tall, 20rem below `md`. Live's messages:

| Kind | Message (live) | Action |
| --- | --- | --- |
| No query yet | To begin searching, enter a search term in the box above and hit "Go". | — |
| No results for a search | Your search did not match any items in the Archive. Try different keywords or a more general search. | Clear filters · search all media types |
| No results in a collection | Your search did not match any items in this collection. Try different keywords or a more general search. | Clear filters · search all of the Archive |
| Empty collection | This collection contains no viewable items. | — |

Live has no actions; the spec adds them, because the page knows the way out better than
the person who just hit it.

### Elsewhere

```
        [icon, --ia-size-icon-2xl, --ia-color-text-secondary]

        No results for "buster keaton" in Texts        .ia-type-section
        Try removing a filter, or search all media.    .ia-type-body, secondary

        [ Clear filters ]  [ Search all media types ]  .ia-button--secondary
```

| Kind | Message | Action |
| --- | --- | --- |
| Filters too narrow | Say which filter excluded everything | Remove that filter |
| Empty user tab | "brewster hasn't posted any reviews" | — (nothing to offer) |
| First-run | Say what would appear here | The action that creates the first one |

Centered, `--ia-space-12` block padding, max-width `--ia-container-form`.
Never a bare "No results."

## Error

| Kind | Where | Treatment |
| --- | --- | --- |
| Field validation | below the field | `.ia-message--danger`, see [forms.md](forms.md#validation) |
| Search or collection failed to load | in place of the whole browser | the [placeholder](#no-results-on-a-browse-page) with live's message, a Retry button, and "Error details:" |
| Region failed to load | in place of the region | inline block with a Retry button |
| Whole page failed | full page | error shell with navigation intact |
| Background action failed | toast | `role="alert"`, not auto-dismissed |

A failed region keeps the rest of the page working:

```
┌────────────────────────────────────────┐
│ ⚠  We couldn't load these results.     │
│    Check your connection and try again.│
│    [ Retry ]                           │
└────────────────────────────────────────┘
```

- `role="alert"` so it is announced when it replaces the loading state.
- Retry re-runs the request; it does not reload the page.
- Never expose a status code or a stack trace. "Something went wrong on our end" plus
  a retry is more useful than "Error 500".
- The one exception is a search: a query can fail because of its own syntax, and the
  engine's message says where. The placeholder shows it in small type under the
  illustration — "Error details: Query parse error near …" — as live does, beside live's
  messages: "The search engine encountered an error, which might be related to your
  search query. Tips for constructing search queries." for a search, and "The search
  engine encountered an error while loading this collection. If the problem persists,
  please let us know at info@archive.org." for a collection.
- Log the detail; show the person the way forward.

### 404 and 410

archive.org has a particular obligation here: an item that is gone is a research
result, not just an error. Say what is known — whether the identifier ever existed,
whether it was removed, and what to try (the Wayback Machine, a search for the title).

## Partial and stale

- **Partial results**: a warning banner above the results — "Showing 200 of an
  estimated 1,200 results; the rest are still being counted" — not a silent truncation.
- **Stale data**: say when it was last updated and offer a refresh, rather than
  refreshing under the user's cursor.

## Announcing transitions

Every state change in a live region needs the change announced once, politely:

```
loading → "Loading search results…"     aria-busy="true"
loaded  → "1,200 results"                aria-busy removed
empty   → "No results for buster keaton"
error   → "Couldn't load results"        role="alert"
```

Focus never moves on its own during any of these — except into a `role="alert"` form
summary after a submit the user initiated.

## Don't

- Don't show a spinner for under 300ms.
- Don't replace a whole page with an error when one region failed.
- Don't use an empty state to advertise something unrelated.
- Don't let a skeleton have different dimensions from the content it stands in for.
