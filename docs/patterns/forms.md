# Forms

The signup page is the worst-served surface on archive.org — native unstyled inputs,
browser-default validation, and a reCAPTCHA badge that overflows the viewport at 375px.
It is also the page with the most to lose from friction.

## Layout

- One column. Two-column forms cause field-order confusion and break at every
  breakpoint.
- Container `--ia-container-form` (600px).
- `--ia-space-4` between fields, `--ia-space-6` between groups, `--ia-space-6` before
  the submit.
- Labels above fields, never beside. Beside-labels force a second column and truncate.
  The one exception is a list of preferences, where each row is a name, a checkbox and
  what it does — [account-settings.md](account-settings.md#preference-rows).
- Related fields go in a `<fieldset>` with a `<legend>` styled
  `.ia-type-subsection`.

## Field anatomy

```
Label                       .ia-font-size-md / 700, --ia-space-1 below
Hint text                   .ia-type-meta, secondary, --ia-space-1 below
[ input ]                   .ia-input, --ia-size-control-lg on focused-task pages
Error or help               .ia-message--danger, --ia-space-1 above
```

The live signup form already puts the character limit beside the label ("Enter your
email address — Up to 127 characters"), which is a genuinely good pattern: the
constraint is visible before you hit it rather than after. Keep it, as hint text.

## Required and optional

Mark whichever is rarer, in words, in the label: "Email address (required)" or
"Phone (optional)". A bare red asterisk is not a label and depends on a legend the user
has to find.

## Validation

**Validate on blur, not on keystroke.** Telling someone their email is invalid while
they are typing the third character is noise.

**Re-validate on input once a field is already in an error state**, so the message
clears as soon as they fix it.

**Never block submit with a disabled button.** A disabled submit is removed from the
tab order, so a keyboard user reaches the end of the form and finds nothing there, with
no explanation. Let them submit, then show what failed.

On failed submit:
1. A `role="alert"` summary above the form lists each failure as a link to its field.
2. Focus moves to the summary.
3. Each failed field gets `aria-invalid="true"` and an `aria-describedby` message.
4. Nothing the user typed is lost — including passwords.

## Error text

See [content-voice.md](../foundations/content-voice.md#errors). Say what to do:

| Instead of | Write |
| --- | --- |
| Invalid email | Enter an email address that includes an @ |
| Password does not meet requirements | Use at least 8 characters |
| This field is required | Enter your screen name |

## Input types and autofill

Getting these right is most of the mobile experience — the correct keyboard appears and
the browser fills what it can.

```html
<input type="email"    autocomplete="email"            inputmode="email">
<input type="password" autocomplete="new-password">
<input type="password" autocomplete="current-password">
<input type="text"     autocomplete="username">
<input type="tel"      autocomplete="tel"              inputmode="tel">
<input type="url"      autocomplete="url"              inputmode="url">
<input type="search"   autocomplete="off">
```

WCAG 1.3.5 requires `autocomplete` on fields collecting information about the user.

## Passwords

- A visibility toggle: a button with one constant name, `aria-label="Show Password"`, and
  `aria-pressed` carrying its state. Don't also swap the label to "Hide Password": a
  toggle's name stays fixed while its pressed state changes, or a screen reader announces
  both. Live's (offshoot's `ia-password-toggle`) is a 22×16 icon in 7px/4px padding, about
  30px wide; it needs a 44px hit area. Icon `eye` while the password is
  hidden, `eye-off` while it is shown.
- Requirements shown up front, not after failure.
- Strength feedback in a polite live region, debounced — never `role="alert"`.
- Never block paste.

## Third-party auth

Live puts "Sign in with Google" and "Email me a code" above the fold with an "Or"
divider before the email form. That ordering is right — keep it. The Google button
carries Google's own required styling, which is the one place a foreign button is
acceptable; give it the same height as `--ia-size-control-lg` so the stack is even.

## One-time codes

"Email Me a Code" signs in with a six-digit code. Live, the entry is `ia-otp-form` (from
`@internetarchive/elements`) inside offshoot's OTP prompt, and the Claude Design card
`IAOtpForm` renders it. This system has no pattern of its own for it yet:

| Part | `ia-otp-form` |
| --- | --- |
| Entry | six single-character boxes, 40×53, text `--ia-theme-font-size-lg` (36px), a 2px browser-default border, square corners |
| States | `ready` (first box focused); `loading` and `success` lock the boxes and show the status indicator; `error` adds an "!" and "The code entered is invalid or expired" in `--ia-color-text-danger` |
| New code | an `ia-button` in `link` mode, "Email me another code"; disabled while the code is being checked or has been accepted, and in its loading state while a new code sends (`newCodeSending`) |
| Input hints | `inputmode="numeric"`; `autocomplete="one-time-code"` on the first box only |

Two gaps against this page's own rules. The boxes have no accessible name: no label and
no `aria-label`, so each is announced as an unlabeled text field (WCAG 4.1.2). And six
separate fields make pasting or autofilling the code depend on the component's own paste
handling; a single field with `autocomplete="one-time-code"` gets it from the platform.

## CAPTCHA

The reCAPTCHA badge extends past a 375px viewport. It is
`position: fixed`, so it does not scroll the document, but it covers the password field
on small screens.

- Position it in the document flow below the submit, or use the invisible variant with
  the required attribution as text.
- A CAPTCHA is a WCAG 1.1.1 concern: there must be a non-visual alternative.

## Progress and long forms

- Over about eight fields, break into steps with a visible progress indicator
  ("Step 2 of 3") and preserve entries when moving back.
- Autosave drafts for anything long — upload metadata in particular — and say when it
  last saved.

## Don't

- Don't use placeholder text as a label.
- Don't disable the submit button.
- Don't clear a password field on error.
- Don't validate on every keystroke.
- Don't set input text below 16px at mobile widths — iOS zooms the viewport.
