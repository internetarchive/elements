import {
  html,
  LitElement,
  nothing,
  TemplateResult,
  CSSResultGroup,
  css,
  PropertyValues,
  render,
} from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement } from '@src/util/custom-element';
import themeStyles from '@src/themes/theme-styles';

import '../ia-status-indicator/ia-status-indicator';

/**
 * Renders a standardized button built off the ia-button styling and the activity indicator, with the option to show
 * a loading indicator instead of the text or to customize the text, and the ability to pass in any
 * function to run on click. Follows the button spec in docs/components/button.md.
 *
 * A disabled or loading button stays in the tab order (`aria-disabled`, D-32)
 * and swallows its own clicks, so neither a listener on the element nor a
 * form submission sees them. With `href`, it renders a link styled as a button.
 *
 * Designed to behave exactly like a native type="submit" or type="reset" button if either type is supplied,
 * i.e. for an <ia-button type="submit" @click=${doSideEffects}></ia-button>,
 * whether the form is submitted via enter or by clicking the button directly, the button will always
 * run doSideEffects() and then submit the form.
 */
@customElement('ia-button')
export class IAButton extends LitElement {
  /* Which version of the button to display */
  @property({ type: String }) mode:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'warning'
    | 'donate'
    | 'disabled'
    | 'ghost'
    | 'transparent' // the old name for ghost
    | 'custom'
    | 'link'
    | 'danger-link' = 'primary';

  /* The button's size: 30px, 36px (the default) or 44px tall */
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';

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

  /* An optional href, which makes the button a link */
  @property({ type: String }) href?: string;

  /* Whether a link opens in a new tab */
  @property({ type: Boolean }) openLinksNewTab: boolean = false;

  render(): TemplateResult {
    return html`
      ${this.href ? this.linkTemplate : this.buttonTemplate}
      <slot name="hidden-button"></slot>
    `;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('type')) {
      this.setButtonTypeEmulation();
    }
  }

  /* Whether the button ignores activation: disabled, or busy loading */
  private get inactive(): boolean {
    return this.disabled || this.loading;
  }

  /* The classes the styles key off: mode, size and state */
  private get classes(): string {
    const mode = this.mode === 'transparent' ? 'ghost' : this.mode;
    return [
      'button',
      mode,
      `size-${this.size}`,
      this.disabled ? 'is-disabled' : '',
      this.loading ? 'is-loading' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /* The native button to render */
  private get buttonTemplate(): TemplateResult {
    return html`
      <button
        part="button"
        class=${this.classes}
        aria-disabled=${this.inactive ? 'true' : nothing}
        aria-busy=${this.loading ? 'true' : nothing}
        @click=${this.handleInactiveClick}
      >
        ${this.contentTemplate}
      </button>
    `;
  }

  /* A link styled as a button, for an href */
  private get linkTemplate(): TemplateResult {
    return html`
      <a
        part="button"
        class=${this.classes}
        href=${this.href ?? ''}
        target=${this.openLinksNewTab ? '_blank' : '_self'}
        rel=${ifDefined(this.openLinksNewTab ? 'noopener' : undefined)}
        aria-disabled=${this.inactive ? 'true' : nothing}
        aria-busy=${this.loading ? 'true' : nothing}
        @click=${this.handleInactiveClick}
        >${this.contentTemplate}</a
      >
    `;
  }

  /*
   * The label, and over it while loading, the indicator. The label stays in
   * place but hidden, so the button keeps its width.
   */
  private get contentTemplate(): TemplateResult {
    return html`
      <span class="label"><slot></slot></span>
      ${this.loading ? this.loadingStateTemplate : nothing}
    `;
  }

  /* Content to render while button is loading */
  private get loadingStateTemplate(): TemplateResult {
    return html`
      <span class="loading-indicator">
        <ia-status-indicator mode="loading"></ia-status-indicator>
        ${this.loadingText}
      </span>
    `;
  }

  /**
   * A disabled or loading button stays focusable, so it gets clicks. Stopped
   * here, they never reach a listener on the element or the form.
   */
  private handleInactiveClick = (e: Event): void => {
    if (!this.inactive) return;
    e.preventDefault();
    e.stopPropagation();
  };

  /** Sets up or removes button type emulation as needed */
  private setButtonTypeEmulation(): void {
    const hiddenButton: HTMLInputElement | null = this.querySelector(
      'input.hidden-button',
    );

    if (hiddenButton) {
      hiddenButton.type = this.type;
      return;
    }

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

          --donate-cta-text-color--: var(--donate-cta-text-color);
          --donate-cta-fill--: var(--donate-cta-fill);
          --donate-cta-border--: var(--donate-cta-border);

          --disabled-cta-text-color--: var(--disabled-cta-text-color);
          --disabled-cta-fill--: var(--disabled-cta-fill);
          --disabled-cta-border--: var(--disabled-cta-border);

          --link-color--: var(--link-color);
          --color-danger--: var(--color-danger);

          --button-padding--: var(--button-padding);
          --button-width--: var(--button-width);
          --button-height--: var(--button-height);
          --button-border-width--: var(--button-border-width);
          --button-border-radius--: var(--button-border-radius);
          --base-font-family--: var(--base-font-family);
          --font-size-standard--: var(--font-size-standard);

          /* Hover snaps (D-54); only the press moves. */
          --ia-button-transition--: var(
            --ia-button-transition,
            transform var(--ia-motion-duration-instant--)
              var(--ia-motion-easing-standard--)
          );

          --ia-button-custom-text-color--: var(
            --ia-button-custom-text-color,
            var(--primary-cta-text-color--)
          );
          --ia-button-custom-fill--: var(
            --ia-button-custom-fill,
            var(--primary-cta-fill--)
          );
          --ia-button-custom-border--: var(
            --ia-button-custom-border,
            var(--primary-cta-border--)
          );
          --ia-button-custom-active-text-color--: var(
            --ia-button-custom-active-text-color,
            var(--ia-button-custom-text-color--)
          );
          --ia-button-custom-active-fill--: var(
            --ia-button-custom-active-fill,
            var(--ia-button-custom-fill--)
          );
          --ia-button-custom-active-border--: var(
            --ia-button-custom-active-border,
            var(--ia-button-custom-border--)
          );

          display: inline-block; /* keeps host sized to button */
        }

        .button {
          --_height: var(--button-height--);
          --_padding: var(--button-padding--);
          --_font-size: var(--font-size-standard--);
          --_press: var(--ia-motion-press-scale-default--);

          /* The label and the loading indicator share one cell, so the
             button is as wide as the wider of the two. */
          display: inline-grid;
          grid-template-areas: 'stack';
          place-items: center;
          box-sizing: border-box;
          width: var(--button-width--);
          max-width: 100%;
          /* A minimum, not a height: a label longer than its container wraps
             inside the button instead of overflowing it (D-51). */
          min-height: var(--_height);
          margin: 0;
          padding: var(--_padding);
          border: var(--button-border-width--) solid transparent;
          border-radius: var(--button-border-radius--);
          background: none;
          color: inherit;

          font-family: var(--base-font-family--);
          font-size: var(--_font-size);
          font-weight: var(--ia-font-weight-regular--);
          line-height: var(--ia-font-line-height-tight--);
          text-align: center;
          text-decoration: none;
          overflow-wrap: anywhere;
          text-wrap: balance;

          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
          transition: var(--ia-button-transition--);
        }

        .size-sm {
          --_height: var(--ia-size-control-sm--);
          --_padding: 0 var(--ia-space-4--);
        }

        .size-lg {
          --_height: var(--ia-size-control-lg--);
          --_padding: 0 var(--ia-space-6--);
          --_font-size: var(--ia-font-size-lg--);
        }

        /* Every size is at least 44px tall to a finger. */
        @media (pointer: coarse) {
          .button {
            min-height: max(var(--_height), var(--ia-size-target-min--));
          }
        }

        .label,
        .loading-indicator {
          grid-area: stack;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--ia-space-1--);
        }

        .is-loading .label {
          visibility: hidden;
        }

        .button:focus-visible {
          outline: var(--ia-size-focus-ring--) solid
            var(--ia-color-border-focus--);
          outline-offset: var(--ia-size-focus-ring-offset--);
        }

        .primary {
          color: var(--primary-cta-text-color--);
          background-color: var(--primary-cta-fill--);
          border-color: var(--primary-cta-border--);
        }

        /* Light, so it never outweighs the primary (D-52); the shadow is what
           sets it apart from ghost, which sits flat. */
        .secondary {
          color: var(--secondary-cta-text-color--);
          background-color: var(--secondary-cta-fill--);
          border-color: var(--secondary-cta-border--);
          box-shadow: var(--ia-shadow-raised--);
        }

        .danger {
          color: var(--danger-cta-text-color--);
          background-color: var(--danger-cta-fill--);
          border-color: var(--danger-cta-border--);
        }

        .warning {
          color: var(--warning-cta-text-color--);
          background-color: var(--warning-cta-fill--);
          border-color: var(--warning-cta-border--);
        }

        .donate {
          color: var(--donate-cta-text-color--);
          background-color: var(--donate-cta-fill--);
          border-color: var(--donate-cta-border--);
        }

        /* No boundary: the label or icon identifies it (D-55). */
        .ghost {
          border-width: 0;
        }

        .custom {
          color: var(--ia-button-custom-text-color--);
          background-color: var(--ia-button-custom-fill--);
          border-color: var(--ia-button-custom-border--);
        }

        .custom:not([aria-disabled='true']):is(
            :hover,
            :focus-visible,
            :active,
            .active
          ) {
          color: var(--ia-button-custom-active-text-color--);
          background-color: var(--ia-button-custom-active-fill--);
          border-color: var(--ia-button-custom-active-border--);
        }

        .link,
        .danger-link {
          --_height: var(--ia-size-control-sm--);
          --_padding: 0;
          border-width: 0;
        }

        .link {
          color: var(--link-color--);
        }

        .danger-link {
          color: var(--color-danger--);
        }

        :host(.fit-content) .button {
          padding: 0;
          min-height: fit-content;
        }

        /* Hover darkens a filled button a step and lays the overlay on a light
           one, instantly. */
        .primary:hover,
        .danger:hover,
        .donate:hover {
          filter: brightness(0.88);
        }

        .warning:hover {
          filter: brightness(0.94);
        }

        .secondary:hover,
        .ghost:hover {
          background-image: linear-gradient(
            var(--ia-color-hover-overlay--),
            var(--ia-color-hover-overlay--)
          );
        }

        .link:hover,
        .danger-link:hover {
          text-decoration: underline;
        }

        /* Press: darker again, and a squeeze sized so the edge travels about
           1.5px. Links don't move. */
        .button:active {
          filter: brightness(0.8);
          transform: scale(var(--_press));
        }

        .link:active,
        .danger-link:active,
        .custom:active {
          filter: none;
          transform: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .button:active {
            transform: none;
          }
        }

        /* Disabled takes the disabled colors; the label stays legible. The
           disabled mode is the same look on a button that still works. */
        .is-disabled,
        .disabled {
          color: var(--disabled-cta-text-color--);
          background-color: var(--disabled-cta-fill--);
          border-color: var(--disabled-cta-border--);
          box-shadow: none;
        }

        .is-disabled:is(.link, .danger-link) {
          color: var(--ia-color-text-disabled--);
          background: none;
        }

        /* Last, so no hover or press shows on a button that won't act. */
        .button[aria-disabled='true'] {
          cursor: not-allowed;
          filter: none;
          transform: none;
          background-image: none;
          text-decoration: none;
        }

        .is-loading {
          cursor: progress;
        }

        ia-status-indicator {
          --ia-theme-primary-text-color: currentColor;
        }
      `,
    ];
  }
}
