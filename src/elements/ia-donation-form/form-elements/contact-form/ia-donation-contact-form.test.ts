import { elementUpdated, fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import { fillInContactForm } from '../../test-helpers/dom.test-helpers';
import type { IADonationContactForm } from './ia-donation-contact-form';
import './ia-donation-contact-form';

async function setup(): Promise<IADonationContactForm> {
  return fixture<IADonationContactForm>(
    html`<ia-donation-contact-form></ia-donation-contact-form>`,
  );
}

describe('IADonationContactForm', () => {
  test('renders into the light DOM so autofill can reach the fields', async () => {
    const el = await setup();
    expect(el.shadowRoot).to.be.null;
    expect(el.querySelector('#donation-contact-form-email')).to.exist;
  });

  test('requires email, first name and last name', async () => {
    const el = await setup();

    el.firstNameField.value = '   ';
    el.lastNameField.value = ' ';
    el.emailField.value = '';
    expect(el.firstNameField.checkValidity()).to.be.false;
    expect(el.lastNameField.checkValidity()).to.be.false;
    expect(el.emailField.checkValidity()).to.be.false;

    el.firstNameField.value = 'John';
    el.lastNameField.value = 'Doe';
    el.emailField.value = 'john.doe@example.com';
    expect(el.firstNameField.checkValidity()).to.be.true;
    expect(el.lastNameField.checkValidity()).to.be.true;
    expect(el.emailField.checkValidity()).to.be.true;
  });

  test('requires at least two characters in the names', async () => {
    const el = await setup();
    el.firstNameField.value = 'A';
    el.lastNameField.value = 'B';
    expect(el.firstNameField.checkValidity()).to.be.false;
    expect(el.lastNameField.checkValidity()).to.be.false;
  });

  test('requires a street address of a few characters', async () => {
    const el = await setup();
    el.streetAddressField.value = '1 b';
    expect(el.streetAddressField.checkValidity()).to.be.false;
    el.streetAddressField.value = '1 st';
    expect(el.streetAddressField.checkValidity()).to.be.true;
  });

  test('pre-fills the email from donorEmail', async () => {
    const el = await fixture<IADonationContactForm>(
      html`<ia-donation-contact-form
        .donorEmail=${'someone@archive.org'}
      ></ia-donation-contact-form>`,
    );
    expect(el.emailField.value).to.equal('someone@archive.org');
  });

  describe('region and postal code', () => {
    test('are required for a US address', async () => {
      const el = await setup();
      el.selectedCountry = 'US';
      await elementUpdated(el);
      expect(el.regionField.required).to.be.true;
      expect(el.postalCodeField.required).to.be.true;
    });

    test('are optional outside the US', async () => {
      const el = await setup();
      el.selectedCountry = 'CA';
      await elementUpdated(el);
      expect(el.regionField.required).to.be.false;
      expect(el.postalCodeField.required).to.be.false;
    });

    test('only checks the zip code pattern for US addresses', async () => {
      const el = await setup();

      el.selectedCountry = 'US';
      await elementUpdated(el);
      el.postalCodeField.value = '1234';
      expect(el.postalCodeField.checkValidity()).to.be.false;

      el.selectedCountry = 'CA';
      await elementUpdated(el);
      el.postalCodeField.value = '1234';
      expect(el.postalCodeField.checkValidity()).to.be.true;
    });

    test('accepts 5 and 9 digit US zip codes and nothing else', async () => {
      const el = await setup();
      el.selectedCountry = 'US';
      await elementUpdated(el);

      for (const code of ['12345', '12345-6789', '123456789']) {
        el.postalCodeField.value = code;
        expect(el.postalCodeField.checkValidity(), `${code} should be valid`).to
          .be.true;
      }
      for (const code of ['1234', '123456', '1234A', 'ABCDE', '12345-678']) {
        el.postalCodeField.value = code;
        expect(el.postalCodeField.checkValidity(), `${code} should be invalid`)
          .to.be.false;
      }
    });
  });

  describe('country selector', () => {
    test('defaults to the US', async () => {
      const el = await setup();
      expect(el.selectedCountry).to.equal('US');
      expect(el.countryCodeAlpha2Field.value).to.equal('US');
    });

    test('follows the dropdown', async () => {
      const el = await setup();
      el.countryCodeAlpha2Field.value = 'CA';
      el.countryCodeAlpha2Field.dispatchEvent(new Event('change'));
      await elementUpdated(el);
      expect(el.selectedCountry).to.equal('CA');
    });

    test('ignores a code that is not a country', async () => {
      const el = await setup();
      el.countryCodeAlpha2Field.value = 'XX';
      el.countryCodeAlpha2Field.dispatchEvent(new Event('change'));
      await elementUpdated(el);
      expect(el.selectedCountry).to.equal('US');
    });
  });

  describe('reportValidity()', () => {
    test('is false with required fields empty, marking them and focusing the first', async () => {
      const el = await setup();

      expect(el.reportValidity()).to.be.false;
      expect(el.emailField.validationMessage).to.not.equal('');
      expect(el.firstNameBadgedInput.error).to.be.true;
      expect(el.lastNameBadgedInput.error).to.be.true;
      expect(el.extendedAddressBadgedInput.error).to.be.false;
      // The browser focuses the first invalid field, and focusing a field
      // clears its error state, so the email field is already clear again
      expect(document.activeElement).to.equal(el.emailField);
      expect(el.emailBadgedInput.error).to.be.false;
    });

    test('is true once every required field is filled in', async () => {
      const el = await setup();
      fillInContactForm(el);

      expect(el.reportValidity()).to.be.true;
      expect(el.emailBadgedInput.error).to.be.false;
      expect(el.errorMessage.textContent).to.equal('');
    });

    test('clears a field error when the donor returns to it', async () => {
      const el = await setup();
      el.reportValidity();
      expect(el.firstNameBadgedInput.error).to.be.true;

      el.firstNameField.focus();
      expect(el.firstNameBadgedInput.error).to.be.false;
      expect(el.errorMessage.textContent).to.equal('');
    });
  });

  test('packages the fields as donor contact info', async () => {
    const el = await setup();
    fillInContactForm(el);

    const info = el.donorContactInfo;
    expect(info.customer.email).to.equal('foo@bar.com');
    expect(info.customer.firstName).to.equal('Fooey');
    expect(info.customer.lastName).to.equal('McBarrison');
    expect(info.billing.streetAddress).to.equal('123 Fake St');
    expect(info.billing.extendedAddress).to.equal('Apt 123');
    expect(info.billing.locality).to.equal('San Francisco');
    expect(info.billing.region).to.equal('CA');
    expect(info.billing.postalCode).to.equal('12345');
    expect(info.billing.countryCodeAlpha2).to.equal('US');
  });
});
