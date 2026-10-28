import { html, LitElement, type TemplateResult } from 'lit';
import { query } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import { customElement } from '@src/util/custom-element';

import {
  HostedFieldContainer,
  type HostedFieldContainerInterface,
} from '../braintree/payment-providers/credit-card/hosted-field-container';
import { calendarIcon, creditCardIcon, lockIcon } from '../icons';
import { SpacerOption } from './ia-donation-badged-input';
import './ia-donation-badged-input';

/**
 * The Braintree hosted fields (card number, expiration, CVC) and their error
 * message. It owns the containers Braintree renders into, the way
 * `ia-donation-contact-form` owns its inputs.
 *
 * Braintree renders each real `<input>` inside a cross-origin iframe, so a
 * `<label for>` can't point at it and the visible labels are text only. No
 * placeholders are configured on the hosted fields either, so the label is
 * the only text a donor sees.
 *
 * This renders into the light DOM, since Braintree's hosted fields don't work
 * inside a shadow root. Its styles are a `<style>` block with every selector
 * prefixed by the tag name.
 */
@customElement('ia-donation-credit-card-fields')
export class IADonationCreditCardFields extends LitElement {
  @query('#braintree-creditcard') private numberField!: HTMLDivElement;

  @query('#braintree-expiration') private expirationField!: HTMLDivElement;

  @query('#braintree-cvv') private cvvField!: HTMLDivElement;

  @query('#braintree-error-message') private errorMessageField!: HTMLDivElement;

  get hostedFieldContainer(): HostedFieldContainerInterface {
    return new HostedFieldContainer({
      number: this.numberField,
      cvv: this.cvvField,
      expirationDate: this.expirationField,
      errorContainer: this.errorMessageField,
    });
  }

  render(): TemplateResult {
    return html`
      <div id="braintree-error-message"></div>
      <div class="braintree-row">
        <div class="field">
          <span class="field-label"
            >${msg('Card Number')}<span class="required-asterisk">
              *</span
            ></span
          >
          <ia-donation-badged-input
            .icon=${creditCardIcon}
            .requiredIndicatorSpaceOption=${SpacerOption.CompressSpace}
            class="creditcard"
          >
            <div class="braintree-input" id="braintree-creditcard"></div>
          </ia-donation-badged-input>
        </div>
      </div>
      <div class="braintree-row expiration-cvv-row">
        <div class="field">
          <span class="field-label"
            >${msg('Expiration (MM / YY)')}<span class="required-asterisk">
              *</span
            ></span
          >
          <ia-donation-badged-input
            .icon=${calendarIcon}
            .requiredIndicatorSpaceOption=${SpacerOption.CompressSpace}
            class="expiration"
          >
            <div class="braintree-input" id="braintree-expiration"></div>
          </ia-donation-badged-input>
        </div>
        <div class="field">
          <span class="field-label"
            >${msg('CVC')}<span class="required-asterisk"> *</span></span
          >
          <ia-donation-badged-input
            .icon=${lockIcon}
            .requiredIndicatorSpaceOption=${SpacerOption.CompressSpace}
            class="cvv"
          >
            <div class="braintree-input" id="braintree-cvv"></div>
          </ia-donation-badged-input>
        </div>
      </div>
      ${this.getStyles}
    `;
  }

  /** Light DOM, so Braintree can render its hosted fields */
  createRenderRoot(): this {
    return this;
  }

  /**
   * The element renders into the light DOM, so instead of a `styles` block
   * it writes its own `<style>` tag, with every selector prefixed by the tag
   * name so nothing leaks onto the rest of the page.
   */
  private get getStyles(): TemplateResult {
    return html`
      <style>
        ia-donation-credit-card-fields {
          --donation-card-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-card-label-font-family--: var(
            --ia-donation-field-label-font-family,
            var(
              --ia-theme-base-font-family,
              'Helvetica Neue',
              Helvetica,
              Arial,
              sans-serif
            )
          );
          --donation-card-label-font-size--: var(
            --ia-donation-field-label-font-size,
            calc(var(--donation-card-base-font-size--) * 1.4)
          );
          --donation-card-label-color--: var(
            --ia-donation-field-label-color,
            #2c2c2c
          );
          --donation-card-label-margin-bottom--: var(
            --ia-donation-field-label-margin-bottom,
            calc(var(--donation-card-base-font-size--) * 0.5)
          );
          --donation-card-row-gap--: var(
            --ia-donation-field-row-gap,
            calc(var(--donation-card-base-font-size--) * 0.5)
          );
          --donation-card-required-color--: var(
            --ia-donation-badged-input-required-color,
            var(--ia-theme-color-danger, #e51c23)
          );
          --donation-card-error-color--: var(--ia-theme-color-danger, #e51c23);
        }

        ia-donation-credit-card-fields .field-label {
          display: block;
          font-family: var(--donation-card-label-font-family--);
          font-size: var(--donation-card-label-font-size--);
          font-weight: bold;
          color: var(--donation-card-label-color--);
          margin-bottom: var(--donation-card-label-margin-bottom--);
        }

        ia-donation-credit-card-fields .required-asterisk {
          color: var(--donation-card-required-color--);
        }

        /*
          A grid, so a label that wraps to two lines in one column doesn't push
          that column's input out of line with its sibling. Both labels share
          row line 1 and both inputs share row line 2.
        */
        ia-donation-credit-card-fields .braintree-row {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 1fr;
          grid-template-rows: auto auto;
          column-gap: var(--donation-card-row-gap--);
        }

        /*
          The expiration column is wider than the CVC column so its
          "Expiration (MM / YY)" label stays on one line. CVC's label has
          room to spare.
        */
        ia-donation-credit-card-fields .braintree-row.expiration-cvv-row {
          grid-template-columns:
            calc(50% + var(--donation-card-base-font-size--) * 2.5)
            calc(50% - var(--donation-card-base-font-size--) * 2.5);
        }

        ia-donation-credit-card-fields .braintree-row + .braintree-row {
          margin-top: var(--donation-card-row-gap--);
        }

        ia-donation-credit-card-fields .field {
          display: contents;
        }

        ia-donation-credit-card-fields ia-donation-badged-input {
          width: 100%;
        }

        ia-donation-credit-card-fields .braintree-input {
          width: 100%;
          height: 100%;
        }

        ia-donation-credit-card-fields #braintree-error-message {
          color: var(--donation-card-error-color--);
          font-size: calc(var(--donation-card-base-font-size--) * 1.4);
          margin-bottom: calc(var(--donation-card-base-font-size--) * 0.6);
        }
      </style>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-donation-credit-card-fields': IADonationCreditCardFields;
  }
}
