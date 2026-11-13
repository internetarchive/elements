# Switch

> **Use instead:** a value that is submitted with a form → a checkbox ([checkbox and
> radio](checkbox-radio.md)). One of several options →
> [segmented control](segmented-control.md).

A binary setting that takes effect the moment it changes — a view preference like "Show
only borrowable items". Account preferences are not switches: they are checkboxes saved
together with Save Changes ([account-settings.md](../patterns/account-settings.md#preference-rows)). It is a `<button role="switch">`, not a
restyled checkbox, because nothing is submitted: pressing it *is* the change.

## Spec

| Part | Value |
| --- | --- |
| Track | 3.6 × 2rem (36 × 20px), `--ia-radius-pill` |
| Track, off | `--ia-color-border-strong` — the track is the control's boundary, so it clears 3:1 (5.74:1) |
| Track, on | `--ia-color-selected-strong-fill` |
| Knob | 1.6rem, `--ia-color-surface-raised`, `--ia-shadow-raised`; slides 1.6rem |
| Label | beside the track, `--ia-space-2` gap, 1.4rem, primary text |
| Description (optional) | `.ia-switch__description` under the label, `--ia-font-size-sm`, secondary text |
| Motion | the knob and track change over `--ia-motion-duration-fast` with `--ia-motion-easing-state` |

The whole button — track and label — is the target: 30px tall on a fine pointer, at least
44 × 44 on a coarse one.

## States

| State | Treatment |
| --- | --- |
| off | strong-border track, knob at the start |
| on | navy track, knob at the end, `aria-checked="true"` |
| focus-visible | the universal ring around the button |
| disabled | `aria-disabled="true"`, `--ia-color-border-default` track, disabled text |

State is carried by knob position as well as color, so it survives grayscale and
`forced-colors`, where the track takes a `CanvasText` border and the knob a `CanvasText`
fill. The knob's direction follows the text direction.

## Semantics

```html
<button class="ia-switch" type="button" role="switch" aria-checked="false">
  <span class="ia-switch__track"></span>
  <span>Show Only Borrowable Items<span class="ia-switch__description">Hides items you can't borrow today</span></span>
</button>
```

- The label is the button's text, so it is the accessible name. A switch without visible
  text needs an `aria-label`.
- The label names the setting, not the action: "Email Me About New Uploads", not "Turn On
  Emails". It doesn't change with the state.
- Space and Enter toggle it, as for any button.

## Contract

- **Events.** Native `click`; read the new state from `aria-checked` after it flips.
- **Rendering.** Light DOM.

## Don't

- Don't use a switch inside a form that has a Save button. That setting doesn't apply until
  Save, so it is a checkbox.
- Don't change the label with the state.
- Don't signal the state by color alone.
