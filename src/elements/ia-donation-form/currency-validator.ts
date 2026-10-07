/** Something that can veto a keystroke in a text field. */
export interface FieldValidatorInterface {
  keydown(e: KeyboardEvent): void;
}

/**
 * Keeps a text field to a currency amount: digits with an optional decimal
 * point and up to two decimal places. Attach it as the field's `keydown`
 * handler; it cancels any keystroke that would make the value invalid.
 *
 * Because it checks the value the keystroke *would* produce, it accounts for
 * the cursor position and any selected text being replaced.
 */
export class CurrencyValidator implements FieldValidatorInterface {
  keydown(e: KeyboardEvent): void {
    const char = e.key;

    // Shortcuts like select-all go through
    if (e.metaKey) return;

    switch (char) {
      case 'Tab':
      case 'Delete':
      case 'Backspace':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowUp':
      case 'ArrowDown':
        return;
    }

    const input = e.target as HTMLInputElement;
    const value = input.value;
    const prefix = value.slice(0, input.selectionStart ?? 0);
    const suffix = value.slice(input.selectionEnd ?? 0);
    const newValue = `${prefix}${char}${suffix}`;
    const regex = /^[0-9]+(\.[0-9]{0,2})?$/; // xxxxx.xx
    const valid = regex.test(newValue);

    if (!valid) {
      e.preventDefault();
    }
  }
}
