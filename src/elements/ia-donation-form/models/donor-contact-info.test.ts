import { describe, expect, test } from 'vitest';

import {
  BillingInfo,
  CustomerInfo,
  DonorContactInfo,
} from './donor-contact-info';

describe('CustomerInfo', () => {
  test('can initialize without any properties', () => {
    const customer = new CustomerInfo();

    expect(customer.email).to.be.undefined;
    expect(customer.firstName).to.be.undefined;
    expect(customer.lastName).to.be.undefined;
  });

  test('can initialize with all the properties', () => {
    const customer = new CustomerInfo({
      email: 'foo@bar.com',
      firstName: 'foo',
      lastName: 'bar',
    });

    expect(customer.email).to.equal('foo@bar.com');
    expect(customer.firstName).to.equal('foo');
    expect(customer.lastName).to.equal('bar');
  });
});

describe('BillingInfo', () => {
  test('can initialize without any properties', () => {
    const billing = new BillingInfo();

    expect(billing.streetAddress).to.be.undefined;
    expect(billing.countryCodeAlpha2).to.be.undefined;
  });

  test('can initialize with all the properties', () => {
    const billing = new BillingInfo({
      streetAddress: '123 Fake St',
      extendedAddress: 'Apt 123',
      locality: 'SF',
      region: 'CA',
      postalCode: '12345',
      countryCodeAlpha2: 'US',
    });

    expect(billing.streetAddress).to.equal('123 Fake St');
    expect(billing.extendedAddress).to.equal('Apt 123');
    expect(billing.locality).to.equal('SF');
    expect(billing.region).to.equal('CA');
    expect(billing.postalCode).to.equal('12345');
    expect(billing.countryCodeAlpha2).to.equal('US');
  });
});

describe('DonorContactInfo', () => {
  test('carries the customer and billing info together', () => {
    const customer = new CustomerInfo({ email: 'foo@bar.com' });
    const billing = new BillingInfo({ postalCode: '12345' });
    const contact = new DonorContactInfo({ customer, billing });

    expect(contact.customer).to.equal(customer);
    expect(contact.billing).to.equal(billing);
  });
});
