# Donation — thermometer and form step

> **Use instead:** a Donate action → the green `ia-button--donate` ([button](button.md),
> [D-53](../DECISIONS.md#d-53)). Progress of a task, not a fundraiser → the
> [status indicator](../patterns/empty-loading-error.md#the-live-component).

Two pieces of the donate banner and donation form, from `@internetarchive/elements` — the
thermometer from 1.1.4, the form step from 1.1.6 — not yet in offshoot, which locks 1.1.2. Donating is green everywhere except the heart, which stays red
([navigation.md](navigation.md#subnav)).

## Thermometer

How close the fundraiser is to its goal: a pill-shaped bar, the amount raised inside or
beside the fill, the goal after it.

| Part | Value |
| --- | --- |
| Fill | `--ia-color-action-donate-fill` (`#20705a`) |
| Track | `--ia-color-action-donate-subtle` (`#b8f5e2`, pale mint), a 1px `--ia-color-action-donate-border` edge |
| Shape | 2rem (20px) tall, `--ia-radius-pill` |
| Amount | `--ia-font-size-md` / bold: `--ia-color-action-donate-text` on the fill (5.95:1), `--ia-color-action-donate-fill` on the track (4.88:1) |
| Goal | `--ia-font-size-md` / bold, `--ia-color-text-primary`, `--ia-space-2` either side |

```html
<ia-donation-thermometer currentamount="5230000" goalamount="7500000"
                         label="Donation progress"></ia-donation-thermometer>
```

- It is a `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` and
  an `aria-valuetext` that reads the amount as displayed ("$5,230,000"), not a bare number.
- `label` names it. Pass a translated string: its English default is set in the property,
  not at render, so it doesn't follow the page's locale (see
  [Localization](README.md#localization)).

### The live component

`ia-donation-thermometer` draws its own colors, which miss the system's donate green:

| Variable | Live default | This system |
| --- | --- | --- |
| `--ia-donation-thermometer-fill-color` | `#23765d` | `--ia-color-action-donate-fill` (`#20705a`) |
| `--ia-donation-thermometer-track-color` | `#b8f5e2` | `--ia-color-action-donate-subtle`, the same mint |
| `--ia-donation-thermometer-height` | 20px | 2rem |
| `--ia-donation-thermometer-border-radius` | 9999px | `--ia-radius-pill` |
| `--ia-donation-thermometer-goal-padding` | `0 10px` | `0 var(--ia-space-2)` |

Set them on the element (or an ancestor; these are read straight, not through the theme
layer).

## Form step

One numbered step of the donation form: a round badge holding the step number, a
headline, and the step's fields in the default slot.

| Part | Value |
| --- | --- |
| Badge | 2.4rem circle, `--ia-color-surface-chrome-secondary` (`#333`), number in `--ia-color-text-inverse`, bold |
| Headline | `--ia-font-size-xl` / bold, `--ia-color-text-primary` |
| Layout | badge in a column to the start of the headline and content, `--ia-space-2` between |
| Badge modes | `badgeMode`: shown, hidden, or hidden but keeping its column so steps stay aligned |

```html
<ia-donation-section sectionbadge="1" headline="Choose an Amount">…fields…</ia-donation-section>
```

The headline is a `<div>`, not a heading. A form of several steps needs an outline, so
the page gives each step a real heading and leaves `headline` empty, or the component
gains a heading level.

### The live component

`ia-donation-section` sizes everything from `--ia-donation-section-base-font-size`
(10px), so its badge is 24px and its text 18px — off the type scale, between `lg` and
`xl`. Its badge fill is `--mid-gray` (`#333`). The badge eases on a 0.25s transition,
off the motion scale.

## Don't

- Don't draw a donate fill in any green but `--ia-color-action-donate-fill`.
- Don't use the red heart color for anything but the heart.
