import {
  html,
  LitElement,
  TemplateResult,
  CSSResultGroup,
  css,
  PropertyValues,
} from 'lit';
import { property, customElement, queryAll } from 'lit/decorators.js';

const NUMERIC_REGEX = /^[0-9]+$/;
const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/;

/**
 * Renders an input for OTP entry, which combines a series of separate
 * inputs into one, shifting focus as needed and handling paste and backspace
 * events.
 */
@customElement('ia-otp-input')
export class IAOTPInput extends LitElement {
  /* An optional value to prefill the inputs with */
  @property({ type: String })
  prefillValue?: string;

  /* Whether to disable all inputs */
  @property({ type: Boolean })
  disabled: boolean = false;

  /* Number of characters to expect for the passcode */
  @property({ type: Number })
  numChars: number = 6;

  /* Whether to restrict entry to numeric characters */
  @property({ type: Boolean })
  numericOnly: boolean = true;

  /* Regex for allowed characters. Updates based on numeric only */
  @property({ type: Object })
  private allowedChars: RegExp = NUMERIC_REGEX;

  /* Array of OTP inputs */
  @queryAll('input')
  private inputs!: NodeListOf<HTMLInputElement>;

  render(): TemplateResult {
    return html`
      ${[...Array(this.numChars).keys()].map(
        (i) =>
          html`<input
            id="OTP-input-${i}"
            type="text"
            autocomplete=${i === 0 ? 'one-time-code' : 'off'}
            inputmode=${this.numericOnly ? 'numeric' : 'text'}
            ?disabled=${this.disabled}
            @beforeinput=${this.handleInput}
            @paste=${this.handlePaste}
            @keydown=${this.handleKeydown}
          />`,
      )}
    `;
  }

  protected firstUpdated(): void {
    this.inputs[0].focus();
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('numericOnly')) {
      this.allowedChars = this.numericOnly ? NUMERIC_REGEX : ALPHANUMERIC_REGEX;
    }

    if (changed.has('prefillValue') && this.prefillValue !== undefined) {
      this.fillInputs(this.prefillValue);
      this.prefillValue = undefined;
    }
  }

  /* Shifts forward on input */
  private handleInput(e: InputEvent): void {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    const addedValue = e.data;

    if (!addedValue) return;
    if (addedValue.length > 1) {
      this.fillInputs(addedValue);
      return;
    }
    if (!this.allowedChars.test(addedValue)) return;

    input.value = addedValue;
    const next = input.nextElementSibling as HTMLInputElement;
    if (next) next.focus();

    this.submitIfInputsFilled();
  }

  /* Performs special actions associated with some keys */
  private handleKeydown(e: KeyboardEvent): void {
    const input = e.target as HTMLInputElement;
    const key = e.key.toLowerCase();
    const prev = input.previousElementSibling as HTMLInputElement;
    const next = input.nextElementSibling as HTMLInputElement;

    switch (key) {
      case 'backspace':
      case 'delete':
        e.preventDefault();
        if (prev) prev.focus();

        if (input.value === '') {
          prev.value = '';
          break;
        }

        input.value = '';
        break;
      case 'tab':
        input.select();
        break;
      case 'arrowright':
        e.preventDefault();
        if (next) next.focus();
        break;
      case 'arrowleft':
        e.preventDefault();
        if (prev) prev.focus();
        break;
    }
  }

  /**
   * Transmits pasted data to the input-filling function
   */
  private handlePaste(e: ClipboardEvent): void {
    e.preventDefault();

    const pastedText = e.clipboardData?.getData('text');
    if (pastedText) this.fillInputs(pastedText);
  }

  /**
   * Fills as many inputs as possible with the specified value, starting from the beginning.
   * Submits the result if enough characters are filled.
   */
  private fillInputs(value: string) {
    if (value === '') this.clearInputs();

    const charsToFill = value
      .split('')
      .filter((char) => this.allowedChars.test(char))
      .slice(0, this.numChars);

    if (!charsToFill || charsToFill.length === 0) return;
    charsToFill.forEach(
      (char, i) => ((this.inputs[i] as HTMLInputElement).value = char),
    );

    if (charsToFill.length === this.numChars) {
      this.triggerSubmit(charsToFill.join(''));
      this.inputs[this.numChars - 1].focus();
      return;
    }

    const next = this.inputs[charsToFill.length];
    next.focus();
  }

  /** Clears all inputs and returns focus to first input */
  private clearInputs(): void {
    this.inputs.forEach((input) => (input.value = ''));
    this.inputs[0].focus();
  }

  /** Checks whether all inputs are filled and submits if so */
  private submitIfInputsFilled(): void {
    const code: string[] = [];
    this.inputs.forEach((input) => {
      if (input.value) code.push(input.value);
    });

    if (code.length === this.numChars) this.triggerSubmit(code.join(''));
  }

  /* Submits code */
  private triggerSubmit(code: string): void {
    this.dispatchEvent(
      new CustomEvent('codeSubmitted', {
        detail: code,
        bubbles: true,
        composed: true,
      }),
    );
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 5px;
      }

      input {
        font-size: 36px;
        font-weight: bold;
        width: 36px;
        height: 56px;
        text-align: center;
        text-transform: uppercase;
        padding: 0;
      }
    `;
  }
}
