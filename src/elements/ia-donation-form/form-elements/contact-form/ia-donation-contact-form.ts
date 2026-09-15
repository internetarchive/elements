import {
  css,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { msg } from '@lit/localize';

import { emailIcon, localePinIcon, userIcon } from '../../icons';
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

  @query('ia-donation-badged-input.donation-contact-form-extended-address')
  extendedAddressBadgedInput!: IADonationBadgedInput;
  @query('#donation-contact-form-extended-address')
  extendedAddressField!: HTMLInputElement;

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
      {
        badgedInput: this.extendedAddressBadgedInput,
        inputField: this.extendedAddressField,
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
        <fieldset>
          <div class="row">
            ${this.generateInput({
              id: 'donation-contact-form-email',
              placeholder: msg('Email'),
              required: true,
              fieldType: 'email',
              name: 'email',
              autocomplete: 'email',
              minlength: 5,
              maxlength: 255,
              icon: emailIcon,
            })}
          </div>
        </fieldset>

        <fieldset>
          <div class="row">
            ${this.generateInput({
              id: 'donation-contact-form-first-name',
              placeholder: msg('First name'),
              name: 'fname',
              required: true,
              validationPattern: this.minTwoCharPattern,
              validationMessage: this.minTwoCharValidationMessage,
              maxlength: 255,
              autocomplete: 'given-name',
              icon: userIcon,
            })}
          </div>
          <div class="row">
            ${this.generateInput({
              id: 'donation-contact-form-last-name',
              placeholder: msg('Last name'),
              name: 'lname',
              autocomplete: 'family-name',
              required: true,
              validationPattern: this.minTwoCharPattern,
              validationMessage: this.minTwoCharValidationMessage,
              maxlength: 255,
            })}
          </div>
        </fieldset>
        <fieldset>
          <div class="row">
            ${this.generateInput({
              id: 'donation-contact-form-street-address',
              placeholder: msg('Address Line 1'),
              required: true,
              autocomplete: 'address-line1',
              icon: localePinIcon,
              name: 'street-address',
              validationPattern: this.streetAddressPattern,
              validationMessage: this.streetAddressValidationMessage,
            })}
          </div>
          <div class="row">
            ${this.generateInput({
              id: 'donation-contact-form-extended-address',
              placeholder: msg('Address Line 2 (optional)'),
              autocomplete: 'address-line2',
              required: false,
              name: 'extended-address',
            })}
          </div>
          <div class="row">
            ${this.generateInput({
              id: 'donation-contact-form-locality',
              placeholder: msg('City'),
              autocomplete: 'address-level2',
              required: true,
              name: 'locality',
              validationPattern: this.minTwoCharPattern,
              validationMessage: this.minTwoCharValidationMessage,
            })}
          </div>
          <div class="row">
            ${this.generateInput({
              id: 'donation-contact-form-region',
              placeholder: msg('State / Province'),
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
              placeholder: msg('Zip / Postal'),
              autocomplete: 'postal-code',
              required: this.regionAndPostalCodeRequired,
              name: 'postal',
              validationPattern: this.regionAndPostalCodeRequired
                ? this.usZipCodePattern
                : undefined,
              validationMessage: this.regionAndPostalCodeRequired
                ? this.usZipCodeValidationMessage
                : undefined,
              iconSpaceOption: SpacerOption.CompressSpace,
            })}
          </div>
          <div class="row">${this.countrySelectorTemplate}</div>
        </fieldset>
      </form>
      ${this.getStyles}
    `;
  }

  private get regionAndPostalCodeRequired(): boolean {
    return this.selectedCountry === 'US';
  }

  private get countrySelectorTemplate(): TemplateResult {
    return html`
      <ia-donation-badged-input>
        <label for="donation-contact-form-countryCodeAlpha2">
          ${msg('Country')}
        </label>
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
    placeholder: string;
    required?: boolean;
    fieldType?: 'text' | 'email';
    autocomplete?: AutoCompleteFieldOptions;
    minlength?: number;
    maxlength?: number;
    name: string;
    icon?: TemplateResult;
    iconSpaceOption?: SpacerOption;
    validationPattern?: string;
    validationMessage?: string;
  }): TemplateResult {
    const required = options.required ?? true;
    const fieldType = options.fieldType ?? 'text';
    const iconOption = options.iconSpaceOption ?? SpacerOption.LeaveSpace;

    return html`
      <ia-donation-badged-input
        class=${options.id}
        .icon=${options.icon}
        .iconSpaceOption=${iconOption}
        ?required=${required}
      >
        <label for=${options.id}>${options.placeholder}</label>
        <input
          type=${fieldType}
          id=${options.id}
          class="donation-contact-form-input"
          name=${options.name}
          placeholder=${options.placeholder}
          maxlength=${ifDefined(options.maxlength)}
          minlength=${ifDefined(options.minlength)}
          autocomplete=${options.autocomplete ?? 'on'}
          pattern=${ifDefined(options.validationPattern)}
          title=${ifDefined(options.validationMessage)}
          @focus=${this.inputFocused}
          ?required=${required}
        />
      </ia-donation-badged-input>
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
      extendedAddress: this.extendedAddressField.value,
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
    const iconSpacerWidth = css`var(--ia-donation-badged-input-icon-spacer-width, calc(var(--donation-contact-base-font-size--) * 5))`;

    return html`
      <style>
        ia-donation-contact-form {
          --donation-contact-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-contact-fieldset-spacing--: var(
            --ia-donation-contact-fieldset-spacing,
            var(--donation-contact-base-font-size--)
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
            calc(var(--donation-contact-base-font-size--) * 1.6)
          );
          --donation-contact-field-font-color--: var(
            --ia-donation-form-input-font-color,
            #333
          );
          --donation-contact-error-color--: var(
            --ia-theme-color-danger,
            #e51c23
          );
          --donation-contact-icon-field-width--: calc(
            100% - ${iconSpacerWidth}
          );
          --donation-contact-no-icon-field-width--: calc(
            100% - ${noIconSpacerWidth}
          );
        }

        ia-donation-contact-form fieldset {
          border: 0;
          padding: 0;
          margin: 0;
          margin-bottom: var(--donation-contact-fieldset-spacing--);
          background-color: white;
        }

        /* The negative margins fold the doubled borders where fields touch */
        ia-donation-contact-form .row {
          display: flex;
          margin: -1px 0 0 0;
        }

        ia-donation-contact-form fieldset .row:first-child {
          margin-top: 0;
        }

        ia-donation-contact-form
          ia-donation-badged-input.donation-contact-form-region {
          width: 60%;
        }

        ia-donation-contact-form
          ia-donation-badged-input.donation-contact-form-postal-code {
          width: 40%;
        }

        ia-donation-contact-form #donation-contact-form-region {
          width: var(--donation-contact-icon-field-width--);
        }

        ia-donation-contact-form #donation-contact-form-postal-code {
          width: var(--donation-contact-no-icon-field-width--);
        }

        ia-donation-contact-form #donation-contact-form-error-message {
          color: var(--donation-contact-error-color--);
          font-size: calc(var(--donation-contact-base-font-size--) * 1.4);
          margin-bottom: calc(var(--donation-contact-base-font-size--) * 0.6);
        }

        ia-donation-contact-form #donation-contact-form-last-name {
          width: var(--donation-contact-no-icon-field-width--);
        }

        /* The labels are for screen readers, the placeholders carry the visible text */
        ia-donation-contact-form label {
          position: absolute;
          left: -10000px;
          top: auto;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }

        ia-donation-contact-form .donation-contact-form-input {
          width: var(--donation-contact-icon-field-width--);
          border: 0;
          outline: 0;
          background: transparent;
          font-weight: bold;
          color: var(--donation-contact-field-font-color--);
          font-size: var(--donation-contact-field-font-size--);
          padding: 0;
          font-family: var(--donation-contact-field-font-family--);
        }

        ia-donation-contact-form .donation-contact-form-input::placeholder {
          color: revert;
        }

        ia-donation-contact-form #donation-contact-form-countryCodeAlpha2 {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          font-weight: bold;
          font-size: var(--donation-contact-field-font-size--);
          font-family: var(--donation-contact-field-font-family--);
          border: 0;
          background: #fff;
        }
      </style>
    `;
  }
}
