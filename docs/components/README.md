# Components

One page per component. Each follows the same shape, so a reader choosing between two
components and a reader building one both know where to look.

## Anatomy of a spec page

1. **Use instead** — one line, first, before anything else. It routes the reader to the
   right component when this one is the wrong choice: *"Two to four options that fit on
   screen → segmented control. Commands, not a value → menu."*
2. **What it is** — the job, and what live does today where it exists.
3. **Spec** — the values, all tokens.
4. **States** — rest, hover, focus, selected, disabled, busy, error: whichever apply.
5. **Semantics** — the markup and keyboard model.
6. **Contract** — for anything built as a component rather than a class (see below).
7. **The live component** — where archive.org ships one, how it differs from the spec.
8. **Don't**.

## Which component

| You need | Use |
| --- | --- |
| An action | [button](button.md) — an icon-only action is `ia-button--icon` |
| To go somewhere | a [link](link.md), styled as a button if it must look like one |
| One value from a short list that fits on screen | [segmented control](segmented-control.md) |
| One value from a longer list | [dropdown](dropdown.md) |
| Several values | checkboxes — [checkbox and radio](checkbox-radio.md) |
| A setting that applies the moment it changes | [switch](switch.md) |
| A list of commands | [menu](menu.md) |
| A chosen, removable value | a chip — [avatar, badge, chip](avatar-badge.md) |
| To name an icon-only control | [tooltip](tooltip.md) |
| A row of items that scrolls sideways | [carousel](carousel.md) |
| To shorten long prose | [read more](read-more.md) |
| Status next to what it describes | an inline message — [alert](alert.md) |
| A page-level notice | a banner — [alert](alert.md) |
| An interruption that needs an answer | a [modal](modal.md) |
| A fundraiser's progress, a step of the donation form | [donation](donation.md) |

## The contract

A component that ships as a custom element — archive.org's Lit elements, or anything new
built as one — documents four things, in this order:

- **Events.** Each event's name and its `detail`. Prefer native events (`click`, `change`)
  over custom ones; a custom event is named for the component (`ia-carousel-page-change`).
- **Keyboard.** Every key it handles and what the key does.
- **Styling from outside.** The `::part()`s it exposes and what each is for. **Parts are
  for layout a consumer legitimately owns** — clamping a label, setting a width — **never
  for restyling the component.** A consumer that recolors a part has forked the component.
- **Custom properties.** Settings shared across components are `--ia-theme-*`. A
  component's own settings are `--ia-<element>-*`, the full element name after `--ia-`
  (`--ia-donation-thermometer-fill-color`, `--ia-button-custom-*`), each listed with its
  default. Private working values are `--x--`, set on `:host`. Token names start with a
  category — `--ia-color-`, `-space-`, `-size-`, `-font-`, `-radius-`, `-shadow-`,
  `-border-`, `-blur-`, `-motion-`, `-z-index-`, `-breakpoint-`, `-container-` — so no
  element is named for one of those, and the two can never collide.
- **Rendering.** Shadow DOM or light DOM; which slots take light-DOM content; and how the
  element looks before it upgrades.

### Localization

`@internetarchive/elements` sets the model, and a new component follows it:

- Text a component renders goes through `msg()` from `@lit/localize`, inside `render`,
  with a literal first argument so the extractor finds it.
- Every element that renders a `msg()` is decorated `@localized()`, so it re-renders when
  the locale changes.
- A text property has no default. Render falls back instead —
  `${this.placeholder ?? msg('Search')}` — because a default set on the property is
  evaluated once, in the locale active at construction, and never follows a change.
- The component never calls `configureLocalization`; the app does. Translations ship as
  `@internetarchive/elements/locales/<locale>.js` `templates`, which the app merges with
  its own, its own last. Source strings are XLIFF in the repo's `xliff/`; Spanish is the
  only target locale so far.

So every visible string is either passed in by the page or a `msg()` fallback — never a
bare English literal.

### Before it upgrades

A server-rendered custom element is an unknown inline element until its JavaScript runs,
so it renders at the wrong size and then jumps. Style the undefined element in the page's
render-blocking stylesheet — not in the component — so it takes its final box on first
paint:

```css
ia-button:not(:defined) {
  display: inline-flex;
  min-block-size: var(--ia-size-control-md);
  padding-inline: var(--ia-space-6);
  visibility: hidden;   /* reserve the box, hide the unstyled label */
}
```

This matters most on petabox pages, which server-render `ia-*` elements and upgrade them
later.
