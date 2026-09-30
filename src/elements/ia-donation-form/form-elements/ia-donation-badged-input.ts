import {
  css,
  html,
  LitElement,
  nothing,
  type CSSResultGroup,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import themeStyles from '@src/themes/theme-styles';

/** Whether a hidden icon or required marker keeps its space, so neighbouring fields still line up. */
export const SpacerOption = {
  LeaveSpace: 'leave-space',
  CompressSpace: 'compress-space',
} as const;

export type SpacerOption = (typeof SpacerOption)[keyof typeof SpacerOption];

/**
 * A bordered field wrapper with an icon on the left and a required marker,
 * which turns red on error. The field itself is slotted in, so it works for
 * plain inputs, selects and Braintree's hosted field containers alike.
 */
@customElement('ia-donation-badged-input')
export class IADonationBadgedInput extends LitElement {
  @property({ type: Boolean }) error = false;

  @property({ type: Object }) icon?: TemplateResult;

  @property({ type: Boolean }) required = false;

  /** When there's no icon, whether its column stays or collapses */
  @property({ type: String }) iconSpaceOption: SpacerOption =
    SpacerOption.LeaveSpace;

  /** When the field isn't required, whether the marker's space stays or collapses */
  @property({ type: String }) requiredIndicatorSpaceOption: SpacerOption =
    SpacerOption.LeaveSpace;

  render(): TemplateResult {
    return html`
      <div
        class="input-wrapper ${this.errorClass} ${this.iconSpaceOptionClass}"
      >
        <div class="icon-container">${this.icon}</div>
        <div class="required-indicator ${this.requiredIndicatorSpaceOption}">
          ${this.required ? html`*` : nothing}
        </div>

        <slot></slot>
      </div>
    `;
  }

  private get errorClass(): string {
    return this.error ? 'error' : '';
  }

  private get iconSpaceOptionClass(): string {
    return this.iconSpaceOption === SpacerOption.CompressSpace
      ? 'compress-space'
      : '';
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --donation-badged-input-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-badged-input-border--: var(
            --ia-donation-form-input-border,
            1px solid #d9d9d9
          );
          --donation-badged-input-error-color--: var(
            --ia-donation-badged-input-error-color,
            var(--color-danger)
          );
          --donation-badged-input-icon-size--: var(
            --ia-donation-badged-input-icon-size,
            calc(var(--donation-badged-input-base-font-size--) * 1.4)
          );
          --donation-badged-input-icon-color--: var(
            --ia-donation-badged-input-icon-color,
            currentColor
          );
          --donation-badged-input-icon-spacer-width--: var(
            --ia-donation-badged-input-icon-spacer-width,
            calc(var(--donation-badged-input-base-font-size--) * 3)
          );
          --donation-badged-input-no-icon-spacer-width--: var(
            --ia-donation-badged-input-no-icon-spacer-width,
            var(--donation-badged-input-base-font-size--)
          );
          --donation-badged-input-height--: var(
            --ia-donation-badged-input-height,
            calc(var(--donation-badged-input-base-font-size--) * 3)
          );
          --donation-badged-input-required-color--: var(
            --ia-donation-badged-input-required-color,
            var(--color-danger)
          );
          --donation-badged-input-required-margin--: var(
            --ia-donation-badged-input-required-margin,
            0 0.25rem 0 0
          );
          --donation-badged-input-required-font-size--: var(
            --ia-donation-badged-input-required-font-size,
            calc(var(--donation-badged-input-base-font-size--) * 2)
          );
        }

        .input-wrapper {
          border: var(--donation-badged-input-border--);
          height: var(--donation-badged-input-height--);
          display: flex;
          align-items: center;
        }

        .input-wrapper.error {
          box-shadow: inset 0px 0px 0px 1px
            var(--donation-badged-input-error-color--);
          border-color: var(--donation-badged-input-error-color--);
        }

        .input-wrapper.compress-space .icon-container {
          width: var(--donation-badged-input-no-icon-spacer-width--);
        }

        .icon-container {
          width: var(--donation-badged-input-icon-spacer-width--);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Masked glyphs take their shape from the mask and their colour from here */
        .icon-container .ia-icon {
          width: var(--donation-badged-input-icon-size--);
          height: var(--donation-badged-input-icon-size--);
          background-color: var(--donation-badged-input-icon-color--);
        }

        .required-indicator {
          color: var(--donation-badged-input-required-color--);
          font-size: var(--donation-badged-input-required-font-size--);
          margin: var(--donation-badged-input-required-margin--);
        }

        .required-indicator.leave-space {
          width: 0.5em;
        }
      `,
    ];
  }
}
