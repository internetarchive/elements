import { html, css, nothing, LitElement, TemplateResult } from 'lit';
import { property, query, customElement } from 'lit/decorators.js';

import closeIcon from './assets/close';

@customElement('ia-clearable-text-input')
export class IaClearableTextInput extends LitElement {
  /**
   * The value shown in the text field.
   */
  @property({ type: String }) value = '';

  /**
   * The placeholder value shown in the text field when it is empty.
   */
  @property({ type: String }) placeholder?: string;

  /**
   * The accessible label describing the text field for users of screen readers.
   * Must be included to meet accessibility requirements.
   */
  @property({ type: String }) screenReaderLabel?: string;

  /**
   * The accessible label describing the clear button for users of screen
   * readers (defaults to 'Clear').
   */
  @property({ type: String }) clearButtonScreenReaderLabel = 'Clear';

  /**
   * An element id specifying additional controls for the text field, for
   * users of screen readers.
   */
  @property({ type: String }) ariaControls?: string;

  /**
   * Whether the text field should be automatically focused when the clear
   * button is pressed.
   */
  @property({ type: Boolean }) focusOnClear = true;

  /**
   * If true, the clear button will be shown regardless of whether there is any
   * text entered in the input field.
   */
  @property({ type: Boolean, reflect: true }) forceClearButton = false;

  @query('#text-input')
  private textInput!: HTMLInputElement;

  // Options to pass in when creating the shadow root.
  // This ensures that focusing the component delegates focus to the search bar.
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  protected render(): TemplateResult {
    const hideClearButton = !this.value && !this.forceClearButton;

    return html`
      <div id="container">
        <slot name="icon"></slot>
        <label for="text-input" class="sr-only"
          >${this.screenReaderLabel ?? nothing}</label
        >
        <input
          id="text-input"
          type="text"
          inputmode="search"
          enterkeyhint="search"
          autocapitalize="off"
          placeholder=${this.placeholder ?? nothing}
          .value=${this.value ?? nothing}
          aria-controls=${this.ariaControls ?? nothing}
          @input=${this.onTextInput}
          @keypress=${this.onKeyPress}
        />
        <button
          id="clear-button"
          type="button"
          ?hidden=${hideClearButton}
          @click=${this.clearButtonClicked}
        >
          <span class="clear-icon" aria-hidden="true">${closeIcon}</span>
          <span class="sr-only">${this.clearButtonScreenReaderLabel}</span>
        </button>
      </div>
    `;
  }

  private onTextInput(): void {
    // Update the component value to match the input element
    this.value = this.textInput.value;
  }

  private onKeyPress(e: KeyboardEvent): void {
    // Dispatch a 'submit' event if Enter was pressed on the input field, simulating
    // the behavior the input would have within a form. Since native submit events don't
    // cross the Shadow DOM boundary, and since this component may or may not be inside a
    // form element, we emit this event so that parent components don't need to listen for
    // arbitrary key events just for this single use case.
    if (e.key === 'Enter') {
      // Blur the input field
      this.textInput.blur();

      const submitEvent = new CustomEvent<string>('submit', {
        detail: this.value,
      });
      this.dispatchEvent(submitEvent);
    }
  }

  private clearButtonClicked(): void {
    // Store the value of the text field before clearing it, to send along with the clear event
    const preClearValue = this.textInput.value;

    // Empty the text field and focus it if desired
    this.value = '';
    if (this.focusOnClear) this.textInput.focus();

    // Dispatch a 'clear' event with the value the text field had prior to clearing
    const clearEvent = new CustomEvent<string>('clear', {
      detail: preClearValue,
    });
    this.dispatchEvent(clearEvent);

    // Also dispatch an 'input' event with the newly empty value upon clearing.
    // Note that most ordinary input events are bubbled and retargeted across the Shadow DOM
    // boundary automatically. We only need this here because the input field's value has been
    // cleared programmatically rather than by user keyboard input. We want every value change
    // to produce an input event for consistency.
    const inputEvent = new InputEvent('input', {
      inputType: 'deleteContentBackward',
    });
    this.dispatchEvent(inputEvent);
  }

  static styles = css`
    :host {
      --input-height: 3rem;
      --clear-button-top: 0;
      --clear-button-right: 2px;
    }

    #container {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: var(--input-height);
    }

    #text-input {
      width: 100%;
      height: 100%;
      padding: var(--input-padding, 0 1rem);
      padding-inline-end: var(--input-height);
      border: var(--input-border-width, 1px) var(--input-border-style, solid)
        var(--input-border-color, #ccc);
      border-radius: var(--input-border-radius, 2rem);
      background-image: var(--input-background-image, none);
      background-color: var(--input-background-color, transparent);
      color: var(--input-color, #555);
      font-size: var(--input-font-size, 1.7rem);
      line-height: var(--input-line-height, 1.5);
      box-shadow: var(--input-box-shadow, inset 0 1px 1px rgba(0, 0, 0, 0.075));
      -webkit-box-shadow: var(
        --input-box-shadow,
        inset 0 1px 1px rgba(0, 0, 0, 0.075)
      );
    }

    #text-input:focus {
      border-color: var(--input-focused-border-color, #66afe9);
      outline: 0;
      box-shadow: var(
        --input-focused-box-shadow,
        inset 0 1px 1px rgb(0 0 0 / 8%),
        0 0 8px rgb(102 175 233 / 60%)
      );
      -webkit-box-shadow: var(
        --input-focused-box-shadow,
        inset 0 1px 1px rgb(0 0 0 / 8%),
        0 0 8px rgb(102 175 233 / 60%)
      );
    }

    #clear-button {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      inset-block-start: var(--clear-button-top);
      inset-inline-end: var(--clear-button-right);
      height: var(--clear-button-height, var(--input-height));
      width: var(--clear-button-width, var(--input-height));
      padding: var(--clear-button-padding, 4px);
      border: var(--clear-button-border, 0);
      background: none;
      appearance: none;
      cursor: pointer;
    }

    #clear-button[hidden] {
      display: none;
    }

    .clear-icon {
      display: block;
      width: 100%;
      height: 100%;
      background: var(--clear-button-icon-background, #2c2c2c);
      border-radius: 50%;
      pointer-events: none;
    }

    .clear-icon svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    .clear-icon .fill-color {
      fill: var(--clear-button-icon-color, #fff);
    }

    /* Fallback support for older browsers without newer bidirectional rules */
    @supports not ((inset-block-start: 0) and (padding-inline-end: 0)) {
      #text-input {
        padding-right: var(--input-height);
      }

      #clear-button {
        top: var(--clear-button-top);
        right: var(--clear-button-right);
      }
    }

    .sr-only {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      margin: -1px !important;
      padding: 0 !important;
      border: 0 !important;
      overflow: hidden !important;
      white-space: nowrap !important;
      clip: rect(1px, 1px, 1px, 1px) !important;
      -webkit-clip-path: inset(50%) !important;
      clip-path: inset(50%) !important;
    }
  `;
}
