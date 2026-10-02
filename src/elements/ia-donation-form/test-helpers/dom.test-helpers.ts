import type { IADonationContactForm } from '../form-elements/contact-form/ia-donation-contact-form';

/** Gives async work a moment to settle. */
export function promisedSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Resolves with the next event of that name, so an action can be awaited. */
export function oneEvent(el: Element, name: string): Promise<CustomEvent> {
  return new Promise((resolve) => {
    el.addEventListener(name, (e) => resolve(e as CustomEvent), {
      once: true,
    });
  });
}

/** Fills every field of the contact form with a valid US address. */
export function fillInContactForm(contactForm: IADonationContactForm): void {
  contactForm.emailField.value = 'foo@bar.com';
  contactForm.firstNameField.value = 'Fooey';
  contactForm.lastNameField.value = 'McBarrison';
  contactForm.streetAddressField.value = '123 Fake St';
  contactForm.extendedAddressField.value = 'Apt 123';
  contactForm.localityField.value = 'San Francisco';
  contactForm.regionField.value = 'CA';
  contactForm.postalCodeField.value = '12345';
  contactForm.countryCodeAlpha2Field.value = 'US';
}
