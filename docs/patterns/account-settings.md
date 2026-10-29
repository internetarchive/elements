# Account settings

The patron's settings page, as offshoot builds it: one column of sections under a header
that stays in view, saved together with one button.

```
┌─────────────────────────────────────────────────────┐  sticky
│ Account Settings              [ Cancel ] [ Save Changes ]
│ ⚠ Your changes weren't saved. · Enter an email …     │  the last save
├─────────────────────────────────────────────────────┤
│ Change Profile Picture   (avatar)  [ Choose an image ]
│ Account                  Screen Name / Email / Password
│ Monthly Giving Circle    …
│ Display Settings         Name        ☐  What it does
│ Search Settings          Name        ☐  What it does
│ Newsletter Subscriptions Name        ☑  What it does
│ Linked Third-Party Accounts
│ Delete Internet Archive / Open Library Account
└─────────────────────────────────────────────────────┘
```

## Width

`.ia-settings` is 70rem (700px), as live — a page-specific width between
`--ia-container-form` (600px) and `--ia-container-prose` (1000px), because a preference
row needs three columns. It is centered in the page shell.

## Header

`.ia-settings__header` sticks to the top of the viewport (`--ia-z-index-sticky`) on the
page surface, with a divider under it:

- The title, "Account Settings" (`<h1 class="ia-type-section">`), then **Cancel**
  (secondary, back to where the patron came from) and **Save Changes** (primary).
- **Save stays enabled.** Live disables it until something changes; the system never
  disables a submit ([forms.md](forms.md#validation)). Pressing it with nothing changed
  saves nothing and says so.
- **The summary of the last save** follows on its own line (`.ia-settings__summary`): a
  [message](../components/alert.md) — `--danger` with `role="alert"` listing each failure
  as a link to its field, or `--success` with `role="status"` saying what was saved. Focus
  moves to it. Live's `updates-summary` is a green-tinted list of ✔ and ✖ lines with a
  5px colored bar; the message component carries the same.
- Each failed field also gets `aria-invalid` and its message under it
  (`.ia-field__error`).

## Sections

`.ia-settings__section`, each under an `<h2 class="ia-type-subsection">`, divided by
`--ia-border-divider`, in offshoot's order:

| Section | Contents |
| --- | --- |
| Change Profile Picture | the avatar beside a labeled file input (`.ia-settings__picture`) |
| Account | Screen Name, Email Address and a new password as [fields](forms.md#field-anatomy) with their hints: "Changing your screen name will not change your user ID. You cannot reuse a screen name once it has been changed." The password has the show/hide toggle (`.ia-password`) |
| Monthly Giving Circle | the donation component's slot: the patron's plan, receipts and plan edits, or the way to join |
| Display Settings, Search Settings | preference rows |
| Newsletter Subscriptions | a preference row per list: Best of the Archive, Event Notices … |
| Linked Third-Party Accounts | each linked provider with "Unlink account" (which confirms in a modal), or "You have no linked accounts." |
| Delete Internet Archive / Open Library Account | a danger button that opens the confirmation in place: password, then "Permanently delete my account" |

Admins get a last section of admin links.

## Preference rows

A preference is three columns — what it is, the control, what it does — `.ia-pref-row`:

| Column | Spec | Live (`field-row`) |
| --- | --- | --- |
| Name | `.ia-pref-row__name`: a bold `<label>` for the control | 25%, weight 500 |
| Control | `.ia-pref-row__control`: a checkbox (`.ia-choice__control`) or a `.ia-select`, end-aligned | 5%, a native checkbox or select |
| Description | `.ia-pref-row__desc`, secondary text, the control's `aria-describedby` | 65%, the control's `<label>` |

Below `md` the description moves under the row and waits behind an info button beside the
name (`.ia-pref-row__info`, `aria-expanded`, "About Public Borrowing History"). Live
toggles it with a bare ⓘ character below 768px.

Preferences are checkboxes, saved with the rest of the form — not
[switches](../components/switch.md), which act the moment they change.

## Don't

- Don't disable Save Changes.
- Don't save a preference on its own the moment it changes; this page saves together.
- Don't put the description in the label; the name labels the control and the
  description describes it.
