/** The donor's name and email. */
export class CustomerInfo {
  email?: string;
  firstName?: string;
  lastName?: string;

  constructor(params?: {
    email?: string;
    firstName?: string;
    lastName?: string;
  }) {
    this.email = params?.email;
    this.firstName = params?.firstName;
    this.lastName = params?.lastName;
  }
}

/** The donor's billing address, in Braintree's field names. */
export class BillingInfo {
  streetAddress?: string;
  extendedAddress?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
  countryCodeAlpha2?: string;

  constructor(params?: {
    streetAddress?: string;
    extendedAddress?: string;
    locality?: string;
    region?: string;
    postalCode?: string;
    countryCodeAlpha2?: string;
  }) {
    this.streetAddress = params?.streetAddress;
    this.extendedAddress = params?.extendedAddress;
    this.locality = params?.locality;
    this.region = params?.region;
    this.postalCode = params?.postalCode;
    this.countryCodeAlpha2 = params?.countryCodeAlpha2;
  }
}

/** `CustomerInfo` and `BillingInfo` together, since they travel together. */
export class DonorContactInfo {
  customer: CustomerInfo;
  billing: BillingInfo;

  constructor(params: { customer: CustomerInfo; billing: BillingInfo }) {
    this.customer = params.customer;
    this.billing = params.billing;
  }
}
