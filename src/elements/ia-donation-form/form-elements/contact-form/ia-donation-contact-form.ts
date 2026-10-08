import {
  css,
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { property, query } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import { ifDefined } from 'lit/directives/if-defined.js';
import { msg } from '@lit/localize';

import {
  BillingInfo,
  CustomerInfo,
  DonorContactInfo,
} from '../../models/donor-contact-info';
import {
  SpacerOption,
  type IADonationBadgedInput,
} from '../ia-donation-badged-input';
import '../ia-donation-badged-input';
import type { AutoCompleteFieldOptions } from './autocomplete-field-options';
import { countries } from './countries';

/**
 * The donor's name, email and billing address.
 *
 * This renders into the light DOM, not a shadow root: browser autofill
 * doesn't reach into shadow DOM, and autofill matters a lot on a donation
 * form. So its styles are a `<style>` block with every selector prefixed by
 * the tag name, and its field ids are unique across the page.
 */
@customElement('ia-donation-contact-form')
export class IADonationContactForm extends LitElement {
  @query('ia-donation-badged-input.donation-contact-form-email')
  emailBadgedInput!: IADonationBadgedInput;
  @query('#donation-contact-form-email') emailField!: HTMLInputElement;

  @query('ia-donation-badged-input.donation-contact-form-first-name')
  firstNameBadgedInput!: IADonationBadgedInput;
  @query('#donation-contact-form-first-name') firstNameField!: HTMLInputElement;

  @query('ia-donation-badged-input.donation-contact-form-last-name')
  lastNameBadgedInput!: IADonationBadgedInput;
  @query('#donation-contact-form-last-name') lastNameField!: HTMLInputElement;

  @query('ia-donation-badged-input.donation-contact-form-postal-code')
  postalBadgedInput!: IADonationBadgedInput;
  @query('#donation-contact-form-postal-code')
  postalCodeField!: HTMLInputElement;

  @query('ia-donation-badged-input.donation-contact-form-street-address')
  streetAddressBadgedInput!: IADonationBadgedInput;
  @query('#donation-contact-form-street-address')
  streetAddressField!: HTMLInputElement;

  @query('ia-donation-badged-input.donation-contact-form-locality')
  localityBadgedInput!: IADonationBadgedInput;
  @query('#donation-contact-form-locality') localityField!: HTMLInputElement;

  @query('ia-donation-badged-input.donation-contact-form-region')
  regionBadgedInput!: IADonationBadgedInput;
  @query('#donation-contact-form-region') regionField!: HTMLInputElement;

  @query('#donation-contact-form-countryCodeAlpha2')
  countryCodeAlpha2Field!: HTMLSelectElement;

  @query('#donation-contact-form-error-message') errorMessage!: HTMLDivElement;
  @query('form') form!: HTMLFormElement;

  /** A key of `countries`. US addresses require a state and a zip code. */
  @property({ type: String }) selectedCountry = 'US';

  /** Pre-fills the email field, for a logged-in donor */
  @property({ type: String }) donorEmail = '';

  updated(changed: PropertyValues): void {
    if (changed.has('donorEmail')) {
      this.emailField.value = this.donorEmail ?? '';
    }
  }

  /** Validates every field, marks the bad ones, and shows the browser's messages. */
  reportValidity(): boolean {
    this.validateFormFields();
    return this.validateForm();
  }

  private validateFormFields(): void {
    const fields: {
      badgedInput: IADonationBadgedInput;
      inputField: HTMLInputElement;
    }[] = [
      { badgedInput: this.emailBadgedInput, inputField: this.emailField },
      {
        badgedInput: this.firstNameBadgedInput,
        inputField: this.firstNameField,
      },
      { badgedInput: this.lastNameBadgedInput, inputField: this.lastNameField },
      {
        badgedInput: this.streetAddressBadgedInput,
        inputField: this.streetAddressField,
      },
      { badgedInput: this.localityBadgedInput, inputField: this.localityField },
      { badgedInput: this.regionBadgedInput, inputField: this.regionField },
      { badgedInput: this.postalBadgedInput, inputField: this.postalCodeField },
    ];
    fields.forEach(({ badgedInput, inputField }) => {
      badgedInput.error = !inputField.checkValidity();
    });
  }

  private validateForm(): boolean {
    const isValid = this.form.reportValidity();

    this.errorMessage.textContent = isValid
      ? ''
      : msg('Please enter any missing or invalid contact information below');

    return isValid;
  }

  focus(): void {
    this.emailField.focus();
  }

  /** At least two non-whitespace characters */
  private minTwoCharPattern = '.*\\S{2,}.*';
  private minTwoCharValidationMessage = msg('Enter at least two characters');

  /** At least two non-whitespace characters with at least two characters between them */
  private streetAddressPattern = '.*?\\S.{2,}\\S.*?';
  private streetAddressValidationMessage = msg(
    'Enter at least four characters',
  );

  /** 12345, 12345-6789 or 123456789 */
  private usZipCodePattern = '^\\d{5}(-?\\d{4})?$';
  private usZipCodeValidationMessage = msg(
    'Enter a valid 5 or 9 digit zip/postal code',
  );

  render(): TemplateResult {
    return html`
      <div id="donation-contact-form-error-message"></div>
      <form>
        <div class="row">
          ${this.generateInput({
            id: 'donation-contact-form-email',
            label: msg('Email'),
            required: true,
            fieldType: 'email',
            name: 'email',
            autocomplete: 'email',
            minlength: 5,
            maxlength: 255,
          })}
        </div>

        <div class="row">
          ${this.generateInput({
            id: 'donation-contact-form-first-name',
            label: msg('First name'),
            name: 'fname',
            required: true,
            validationPattern: this.minTwoCharPattern,
            validationMessage: this.minTwoCharValidationMessage,
            maxlength: 255,
            autocomplete: 'given-name',
          })}
          ${this.generateInput({
            id: 'donation-contact-form-last-name',
            label: msg('Last name'),
            name: 'lname',
            autocomplete: 'family-name',
            required: true,
            validationPattern: this.minTwoCharPattern,
            validationMessage: this.minTwoCharValidationMessage,
            maxlength: 255,
          })}
        </div>

        <div class="row">
          ${this.generateInput({
            id: 'donation-contact-form-street-address',
            label: msg('Address'),
            required: true,
            autocomplete: 'address-line1',
            name: 'street-address',
            validationPattern: this.streetAddressPattern,
            validationMessage: this.streetAddressValidationMessage,
          })}
        </div>
        <div class="row">
          ${this.generateInput({
            id: 'donation-contact-form-locality',
            label: msg('City'),
            autocomplete: 'address-level2',
            required: true,
            name: 'locality',
            validationPattern: this.minTwoCharPattern,
            validationMessage: this.minTwoCharValidationMessage,
          })}
        </div>
        <div class="row">${this.countrySelectorTemplate}</div>
        <div class="row region-postal-row">
          ${this.generateInput({
            id: 'donation-contact-form-region',
            label: msg('State / Province'),
            autocomplete: 'address-level1',
            required: this.regionAndPostalCodeRequired,
            name: 'region',
            validationPattern: this.regionAndPostalCodeRequired
              ? this.minTwoCharPattern
              : undefined,
            validationMessage: this.regionAndPostalCodeRequired
              ? this.minTwoCharValidationMessage
              : undefined,
          })}
          ${this.generateInput({
            id: 'donation-contact-form-postal-code',
            label: msg('Zip / Postal Code'),
            autocomplete: 'postal-code',
            required: this.regionAndPostalCodeRequired,
            name: 'postal',
            validationPattern: this.regionAndPostalCodeRequired
              ? this.usZipCodePattern
              : undefined,
            validationMessage: this.regionAndPostalCodeRequired
              ? this.usZipCodeValidationMessage
              : undefined,
          })}
        </div>
      </form>
      ${this.getStyles}
    `;
  }

  private get regionAndPostalCodeRequired(): boolean {
    return this.selectedCountry === 'US';
  }

  private get countrySelectorTemplate(): TemplateResult {
    return html`
      <div class="field">
        <label
          for="donation-contact-form-countryCodeAlpha2"
          class="field-label"
        >
          ${msg('Country')}<span class="required-asterisk"> *</span>
        </label>
        <ia-donation-badged-input
          .iconSpaceOption=${SpacerOption.CompressSpace}
        >
          <select
            id="donation-contact-form-countryCodeAlpha2"
            name="country"
            autocomplete="country"
            @change=${(e: Event) => {
              const newValue = (e.target as HTMLSelectElement).value;
              if (countries[newValue]) this.selectedCountry = newValue;
            }}
          >
            ${Object.keys(countries).map((key) => {
              const name = countries[key];
              return html`
                <option value=${key} ?selected=${key === this.selectedCountry}>
                  ${name}
                </option>
              `;
            })}
          </select>
        </ia-donation-badged-input>
      </div>
    `;
  }

  /** Light DOM, so browser autofill can reach the fields */
  createRenderRoot(): this {
    return this;
  }

  /** Clears the error state once the donor comes back to a field */
  private inputFocused(e: FocusEvent): void {
    this.errorMessage.textContent = '';
    const input = e.target as HTMLInputElement;
    const badgedInput = this.querySelector<IADonationBadgedInput>(
      `ia-donation-badged-input.${input.id}`,
    );
    if (badgedInput) badgedInput.error = false;
  }

  private generateInput(options: {
    id: string;
    label: string;
    required?: boolean;
    fieldType?: 'text' | 'email';
    autocomplete?: AutoCompleteFieldOptions;
    minlength?: number;
    maxlength?: number;
    name: string;
    validationPattern?: string;
    validationMessage?: string;
  }): TemplateResult {
    const required = options.required ?? true;
    const fieldType = options.fieldType ?? 'text';

    return html`
      <div class="field ${options.id}">
        <label for=${options.id} class="field-label">
          ${options.label}${required
            ? html`<span class="required-asterisk"> *</span>`
            : nothing}
        </label>
        <ia-donation-badged-input
          class=${options.id}
          .iconSpaceOption=${SpacerOption.CompressSpace}
          .requiredIndicatorSpaceOption=${SpacerOption.CompressSpace}
        >
          <input
            type=${fieldType}
            id=${options.id}
            class="donation-contact-form-input"
            name=${options.name}
            maxlength=${ifDefined(options.maxlength)}
            minlength=${ifDefined(options.minlength)}
            autocomplete=${options.autocomplete ?? 'on'}
            pattern=${ifDefined(options.validationPattern)}
            title=${ifDefined(options.validationMessage)}
            @focus=${this.inputFocused}
            ?required=${required}
          />
        </ia-donation-badged-input>
      </div>
    `;
  }

  get donorContactInfo(): DonorContactInfo {
    return new DonorContactInfo({
      billing: this.billingInfo,
      customer: this.contactInfo,
    });
  }

  get billingInfo(): BillingInfo {
    return new BillingInfo({
      streetAddress: this.streetAddressField.value,
      locality: this.localityField.value,
      region: this.regionField.value,
      postalCode: this.postalCodeField.value,
      countryCodeAlpha2: this.countryCodeAlpha2Field.value,
    });
  }

  get contactInfo(): CustomerInfo {
    return new CustomerInfo({
      email: this.emailField.value,
      firstName: this.firstNameField.value,
      lastName: this.lastNameField.value,
    });
  }

  /**
   * The element renders into the light DOM, so instead of a `styles` block
   * it writes its own `<style>` tag, with every selector prefixed by the tag
   * name so nothing leaks onto the rest of the page.
   */
  private get getStyles(): TemplateResult {
    const noIconSpacerWidth = css`var(--ia-donation-badged-input-no-icon-spacer-width, calc(var(--donation-contact-base-font-size--) * 3))`;

    return html`
      <style>
        ia-donation-contact-form {
          --donation-contact-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-contact-row-gap--: var(
            --ia-donation-field-row-gap,
            calc(var(--donation-contact-base-font-size--) * 0.5)
          );
          --donation-contact-field-font-family--: var(
            --ia-theme-base-font-family,
            'Helvetica Neue',
            Helvetica,
            Arial,
            sans-serif
          );
          --donation-contact-field-font-size--: var(
            --ia-donation-contact-field-font-size,
            calc(var(--donation-contact-base-font-size--) * 1.4)
          );
          --donation-contact-field-font-color--: var(
            --ia-donation-form-input-font-color,
            #2c2c2c
          );
          --donation-contact-label-font-family--: var(
            --ia-donation-field-label-font-family,
            var(--donation-contact-field-font-family--)
          );
          --donation-contact-label-font-size--: var(
            --ia-donation-field-label-font-size,
            calc(var(--donation-contact-base-font-size--) * 1.4)
          );
          --donation-contact-label-color--: var(
            --ia-donation-field-label-color,
            #2c2c2c
          );
          --donation-contact-label-margin-bottom--: var(
            --ia-donation-field-label-margin-bottom,
            calc(var(--donation-contact-base-font-size--) * 0.5)
          );
          --donation-contact-required-color--: var(
            --ia-donation-badged-input-required-color,
            var(--ia-theme-color-danger, #e51c23)
          );
          --donation-contact-error-color--: var(
            --ia-theme-color-danger,
            #e51c23
          );
          --donation-contact-no-icon-field-width--: calc(
            100% - ${noIconSpacerWidth}
          );
        }

        /*
          A grid, so a label that wraps to two lines in one column doesn't push
          that column's input out of line with its siblings. All labels share
          row line 1 and all inputs share row line 2, each sized to the tallest
          content on its line.
        */
        ia-donation-contact-form .row {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 1fr;
          grid-template-rows: auto auto;
          column-gap: var(--donation-contact-row-gap--);
        }

        /*
          State / Province gives up room to Zip / Postal Code so the
          "Zip / Postal Code *" label stays on one line.
        */
        ia-donation-contact-form .row.region-postal-row {
          grid-template-columns:
            calc(60% - var(--donation-contact-base-font-size--) * 3)
            calc(40% + var(--donation-contact-base-font-size--) * 3);
        }

        ia-donation-contact-form .row + .row {
          margin-top: var(--donation-contact-row-gap--);
        }

        ia-donation-contact-form .field {
          display: contents;
        }

        ia-donation-contact-form .field-label {
          display: block;
          font-family: var(--donation-contact-label-font-family--);
          font-size: var(--donation-contact-label-font-size--);
          font-weight: bold;
          color: var(--donation-contact-label-color--);
          margin-bottom: var(--donation-contact-label-margin-bottom--);
        }

        ia-donation-contact-form .required-asterisk {
          color: var(--donation-contact-required-color--);
        }

        ia-donation-contact-form
          ia-donation-badged-input.donation-contact-form-region,
        ia-donation-contact-form
          ia-donation-badged-input.donation-contact-form-postal-code {
          width: 100%;
        }

        ia-donation-contact-form #donation-contact-form-error-message {
          color: var(--donation-contact-error-color--);
          font-size: calc(var(--donation-contact-base-font-size--) * 1.4);
          margin-bottom: calc(var(--donation-contact-base-font-size--) * 0.6);
        }

        ia-donation-contact-form .donation-contact-form-input {
          width: var(--donation-contact-no-icon-field-width--);
          border: 0;
          outline: 0;
          background: transparent;
          font-weight: bold;
          color: var(--donation-contact-field-font-color--);
          font-size: var(--donation-contact-field-font-size--);
          padding: 0;
          font-family: var(--donation-contact-field-font-family--);
        }

        ia-donation-contact-form #donation-contact-form-countryCodeAlpha2 {
          width: var(--donation-contact-no-icon-field-width--);
          height: 100%;
          box-sizing: border-box;
          font-weight: bold;
          font-size: var(--donation-contact-field-font-size--);
          color: var(--donation-contact-field-font-color--);
          font-family: var(--donation-contact-field-font-family--);
          border: 0;
          background: #fff;
        }
      </style>
    `;
  }
}
