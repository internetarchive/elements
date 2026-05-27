import {
  html,
  LitElement,
  TemplateResult,
  CSSResultGroup,
  css,
  PropertyValues,
  render,
} from 'lit';
import { msg } from '@lit/localize';
import { property, customElement } from 'lit/decorators.js';
import themeStyles from '@src/themes/theme-styles';

import '../ia-status-indicator/ia-status-indicator';

/**
 * Renders a standardized button built off the ia-button styling and the activity indicator, with the option to show
 * a loading indicator instead of the text or to customize the text, and the ability to pass in any
 * function to run on click.
 *
 * Designed to behave exactly like a native type="submit" or type="reset" button if either type is supplied,
 * i.e. for an <ia-button type="submit" @click=${doSideEffects}></ia-button>,
 * whether the form is submitted via enter or by clicking the button directly, the button will always
 * run doSideEffects() and then submit the form.
 */
@customElement('ia-button')
export class IAButton extends LitElement {
  /* Whether to show a loading indicator instead of the button */
  @property({ type: Boolean }) loading: boolean = false;

  /* Whether the button should be disabled, regardless of submission status */
  @property({ type: Boolean }) disabled: boolean = false;

  /* Optional text to include next to the loading indicator */
  @property({ type: String }) loadingText: string = '';

  /* Type of the button - defaults to 'button' to prevent form submission */
  @property({ type: String, reflect: true }) type:
    | 'button'
    | 'submit'
    | 'reset' = 'button';

  render(): TemplateResult {
    return html`
      <button ?disabled=${this.loading || this.disabled}>
        ${this.loading ? this.loadingStateTemplate : html`<slot></slot>`}
      </button>
      <slot name="hidden-btn"></slot>
    `;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('type')) {
      this.setButtonTypeEmulation();
    }
  }

  /* Content to render while button is loading */
  private get loadingStateTemplate(): TemplateResult {
    return html`
      <span class="loading-indicator" alt="Loading indicator">
        <ia-status-indicator mode="loading"></ia-status-indicator> ${msg(
          this.loadingText,
        )}
      </span>
    `;
  }

  /** Sets up or removes button type emulation as needed */
  private setButtonTypeEmulation(): void {
    this.removeExistingTypeEmulation();
    this.emulateButtonTypeBehavior();
  }

  /**
   * Removes all existing button behavior emulation
   * to ensure any new button type takes precendence.
   */
  private removeExistingTypeEmulation(): void {
    this.removeEventListener('click', this.handleComponentClick);
    this.querySelector('.hidden-button')?.remove();
  }

  /**
   * If the button type set to "submit" or "reset",
   * adds extra behavior to ensure
   * button emulates native button behavior.
   * */
  private emulateButtonTypeBehavior(): void {
    if (this.type === 'button') return;

    this.addHiddenButton();
    this.addEventListener('click', this.handleComponentClick);
  }

  /**
   * Triggers form actions (submit/reset) on click, if desired
   * and if actions not already in progress
   */
  private handleComponentClick(e: Event): void {
    if (this.type === 'button') return;

    // No need to submit/reset the form if it's already submitting/resetting
    const formActionsInProgress =
      e instanceof CustomEvent && e.detail.formActionsInProgress;
    if (formActionsInProgress) return;

    // Request form submission/reset by clicking the hidden native submit/reset button we added earlier
    const hiddenButton = this.querySelector(
      'input.hidden-button',
    ) as HTMLInputElement;
    hiddenButton.dispatchEvent(new PointerEvent('click'));
  }

  /**
   * Adds a hidden button to the light DOM to
   * emulate native reset/submit button behavior.
   *
   * Used for:
   * - Submitting/resetting the form (on behalf of handleComponentClick)
   * - Activating any component click events if form is submitted with the enter key
   * (via handleFormActions)
   */
  private addHiddenButton(): void {
    if (this.type === 'button') return;

    render(
      html`<input
        type=${this.type}
        class="hidden-button"
        style="display:none"
        slot="hidden-button"
        @click=${(e: Event) => this.handleFormActions(e)}
      />`,
      this,
    );
  }

  /** Triggers the component's click event manually to prevent extra submission/reset */
  private handleFormActions(e: Event): void {
    /**
     * Prevents the event from bubbling up to the ia-button component itself.
     * This way, if the click on this button is triggered by a click on the component,
     * we don't accidentally bubble up a second click and end up in an infinite loop.
     *
     * And if the click was triggered by form submission (via the enter key), we can hijack the click
     * event to pass that info to the component, so it knows not to
     * re-attempt submission.
     */
    e.stopPropagation();

    // Detect if click comes from the parent component,
    // in which case there's no need to trigger a second click on it
    const triggeredByComponentClick = !e.isTrusted;
    if (triggeredByComponentClick) return;

    // Trigger parent component click events manually,
    // so it knows not to try to re-submit/re-reset the form
    this.dispatchEvent(
      new CustomEvent('click', { detail: { formActionsInProgress: true } }),
    );
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --primary-cta-text-color--: var(--primary-cta-text-color);
          --primary-cta-fill--: var(--primary-cta-fill);
          --primary-cta-border--: var(--primary-cta-border);

          --secondary-cta-text-color--: var(--secondary-cta-text-color);
          --secondary-cta-fill--: var(--secondary-cta-fill);
          --secondary-cta-border--: var(--secondary-cta-border);

          --danger-cta-text-color--: var(--danger-cta-text-color);
          --danger-cta-fill--: var(--danger-cta-fill);
          --danger-cta-border--: var(--danger-cta-border);

          --warning-cta-text-color--: var(--warning-cta-text-color);
          --warning-cta-fill--: var(--warning-cta-fill);
          --warning-cta-border--: var(--warning-cta-border);

          --disabled-cta-text-color--: var(--disabled-cta-text-color);
          --disabled-cta-fill--: var(--disabled-cta-fill);
          --disabled-cta-border--: var(--disabled-cta-border);

          --link-color--: var(--link-color);
          --color-danger--: var(--color-danger);

          display: inline-block; /* keeps host sized to button */
        }

        button {
          height: var(--height, 3.5rem);
          min-height: 3rem;
          cursor: pointer;
          color: var(--primary-cta-text-color--);
          background: var(--primary-cta-fill--);
          line-height: normal;
          border-radius: 0.4rem;
          font-size: var(--fontSize, 1.4rem);
          font-family: inherit;
          border: var(--borderWidth, 1px) solid var(--primary-cta-border--);
          white-space: nowrap;
          appearance: auto;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          transition: var(--transition, all 0.1s ease 0s);
          vertical-align: middle;
          padding: var(--padding, 0 3rem);
          outline-color: var(--primary-cta-text-color--);
          outline-offset: -4px;
          user-select: none;
          text-decoration: none;
          width: var(--width, fit-content);
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          -o-user-select: none;
        }

        button:disabled {
          cursor: not-allowed;
          color: var(--disabled-cta-color--);
          background-color: var(--disabled-cta-fill--);
          border: 1px solid var(--disabled-cta-border--);
          opacity: 0.5;
        }

        button:enabled:hover {
          opacity: 0.9;
        }

        button:focus-visible {
          opacity: 0.8;
          outline-style: double;
        }

        button:active {
          opacity: 0.7;
        }

        :host(.primary) button:enabled {
          color: var(--primary-cta-text-color--);
          background-color: var(--primary-cta-fill--);
          border-color: var(--primary-cta-border--);
        }

        :host(.danger) button:enabled {
          color: var(--danger-cta-text-color--);
          background-color: var(--danger-cta-fill--);
          border-color: var(--danger-cta-border--);
        }

        :host(.dark) button:enabled {
          background-color: var(--secondary-cta-text-color--);
          border-color: var(--secondary-cta-fill--);
        }

        :host(.warning) button:enabled {
          color: var(--warning-cta-text-color--);
          background-color: var(--warning-cta-fill--);
          border-color: var(--warning-cta-border--);
        }

        :host(.custom-active-color) button:enabled:is(:hover, :focus, :active),
        :host(.custom-active-color.active) button:enabled {
          color: var(--customActiveForegroundColor, #194880);
          background-color: var(--customActiveBackgroundColor, #c5d1df);
          border-color: var(
            --customActiveBorderColor,
            --customActiveForegroundColor,
            #194880
          );
        }

        :host(.transparent) button:enabled {
          background-color: transparent;
        }

        :host(.fit-content) button {
          padding: 0;
          height: fit-content;
        }

        :host(.link) button {
          margin: 0;
          border: 0;
          appearance: none;
          background: none;
          color: var(--link-color--);
          text-decoration: none;
          cursor: pointer;
          padding: 0;
        }

        :host(.link.danger-link) button {
          color: var(--color-danger--);
        }

        :host(.link) button:hover {
          text-decoration: underline;
        }

        .loading-indicator {
          display: flex;
          flex-direction: row;
          gap: 0.5rem;
          align-items: center;
        }

        ia-status-indicator {
          --ia-theme-primary-text-color: currentColor;
        }
      `,
    ];
  }
}
