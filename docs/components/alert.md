# Alert, toast, inline message

> **Use instead:** something the reader must answer before going on → [modal](modal.md). A
> name for an icon-only control → [tooltip](tooltip.md). A form field's error → the inline
> message on this page, not a banner.

Little on live covers this. offshoot's signup page puts a red (`#e51c23`) line under a
failed field and reddens its border, with no icon and no `aria-describedby`
(`ia-signup-input.ts`); the password field falls back to the browser's validation bubble.
offshoot has one banner, `alert-banner`, for site notices: solid fills
(urgent `#ab4517`, warn `#fae366`, info `#428bca`) with no icon, the text in white or ink,
and a close button floated to the end with optional text. The system's message covers it
with its tints and icons.

## Three kinds, three jobs

| Kind | Where | Dismissible | Announced |
| --- | --- | --- | --- |
| **Inline message** | attached to a field or a section | no | via `aria-describedby` |
| **Banner** | the top of the page, above the topnav, edge to edge | sometimes | `role="status"` or `role="alert"` |
| **Toast** | floating, transient | auto after 6s | `role="status"` in a live region |

## Intents

| Intent | Icon | Border | Background |
| --- | --- | --- | --- |
| info | `--ia-color-status-info` | `--ia-color-status-info-border` | `--ia-color-status-info-subtle` |
| success | `--ia-color-status-success` | `--ia-color-status-success-border` | `--ia-color-status-success-subtle` |
| warning | `--ia-color-status-warning` | `--ia-color-status-warning-border` | `--ia-color-status-warning-subtle` |
| danger | `--ia-color-status-danger` | `--ia-color-status-danger-border` | `--ia-color-status-danger-subtle` |

The tint tells the intents apart at a glance and gives the message an edge on any surface,
a sunken surface included ([D-47](../DECISIONS.md#d-47)). Text is always
`--ia-color-text-primary` — 12.14:1 or better on every tint — not the status color:
tinted body text at 14px is harder to read for no gain. The status color lives in the
icon.

**Every intent carries an icon.** Color alone fails WCAG 1.4.1 and fails outright for
the roughly 1 in 12 men with a red-green deficiency, which is exactly the
success/danger distinction.

## Spec

| Property | Value |
| --- | --- |
| Padding | `--ia-space-3` |
| Radius | `--ia-radius-default` |
| Border | 1px, the intent's `-border` |
| Icon | `--ia-size-icon-md`, `--ia-space-2` gap, centered on the first line of text |
| Text | `.ia-type-body` |
| Title (optional) | `.ia-type-body-strong`, `--ia-space-1` below |
| Actions | `.ia-button--link` or `--secondary`, `--ia-space-2` above |

## Banners

A banner is the same message about the whole site, above the topnav and edge to edge like
it: `ia-message ia-message--banner`. offshoot renders its banners inside the header, ahead of
the topnav.

**Up to three stack**, in this order, each with its own bottom edge:

1. the public notice — a site-wide announcement, dismissible;
2. the staff notice — shown to `@archive.org` accounts only;
3. the browser notice — "Your browser may not be compatible with all the features on this
   site…", a warning.

During a fundraiser the **donation banner** sits above all of them, at the very top of the
page; it is the fundraiser's own component, not a message. The skip link still comes first
([navigation.md](navigation.md#skip-link)).

| Property | Value |
| --- | --- |
| Width | the full width of the window; the tint runs to both edges |
| Content | lines up with the page: inline padding is `--ia-container-gutter`, or more on a wide window so the icon starts where `--ia-container-page` content starts; `--ia-container-gutter-narrow` below `md` |
| Height | as short as the scale allows: `--ia-space-1` (5px) above and below the text, so one line is about 31px |
| Edges | no radius and no side edges; a 1px edge in the intent's `-border` along the bottom |

A notice about one part of the page — above a form, over the results — is not a banner.
It is the outlined message, in the flow, at the top of what it describes.

A dismissible banner ends with `.ia-message__dismiss`, an icon-only button
(`aria-label="Dismiss"`) with a 44px target on coarse pointers.

**The banner owns no persistence.** Dismissing it removes it and fires a dismiss event
carrying its `dismiss-id`. Whether it stays dismissed is the page's job: the page decides
whether to render it at all (from a cookie, or the account's settings), and a site-level
listener records the dismissal. A banner without a `dismiss-id` goes for this page view
only. That keeps one banner component working on petabox and offshoot, which store
preferences differently.

## Inline field errors

```html
<input id="email" aria-invalid="true" aria-describedby="email-error">
<p class="ia-message ia-message--danger" id="email-error">
  <ia-icon-alert aria-hidden="true"></ia-icon-alert>
  Enter an email address that includes an @
</p>
```

- Below the field, `--ia-space-1` gap.
- `aria-describedby`, not `aria-errormessage` — support for the latter is still uneven.
- Not `role="alert"`: the input's own announcement already covers it, and an alert role
  interrupts mid-typing.
- The message replaces the hint text rather than stacking under it.

## Form-level errors

A `role="alert"` region above the form, listing each failure as a link to its field.
Focus moves to the region on failed submit. This is the pattern that makes a long form
recoverable.

## Toasts

- Bottom-center on mobile, bottom-start on desktop, `--ia-z-index-toast`.
- `--ia-shadow-overlay`, `--ia-radius-default`, max 40rem wide.
- Auto-dismiss after 6s; pause the timer on hover and on focus within.
- **Never** auto-dismiss something the user must act on — that is a banner or a modal.
- One at a time. Queue, don't stack.
- `role="status"` / `aria-live="polite"` for success and info; `role="alert"` only for
  genuine errors, because it interrupts.

## Writing them

See [content-voice.md](../foundations/content-voice.md#errors). The short version: say
what happened and what to do, never blame the user, never say "invalid", never show a
stack trace.

## Don't

- Don't use color as the only signal.
- Don't use a toast for an error the user has to fix.
- Don't stack more than three banners, plus the donation banner; past that, consolidate.
- Don't put `role="alert"` on something that renders on page load; it will interrupt
  the page title announcement.
