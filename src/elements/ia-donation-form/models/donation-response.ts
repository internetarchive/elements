import { BillingInfo, CustomerInfo } from './donor-contact-info';
import type { DonationType } from './donation-type';
import type { PaymentProvider } from './payment-provider';

/** The subscription Braintree created for a monthly donation. */
export class SubscriptionResponse {
  id: string;

  constructor(params: { id: string }) {
    this.id = params.id;
  }
}

/**
 * What the backend returns for a donation that went through. The snake_case
 * fields are the backend's own names.
 */
export class SuccessResponse {
  paymentProvider: PaymentProvider;
  paymentMethodNonce: string;
  amount: number;
  donationType: DonationType;
  transaction_id: string;
  customer_id: string;
  customer: CustomerInfo;
  billing: BillingInfo;
  subscription?: SubscriptionResponse;

  constructor(params: {
    paymentProvider: PaymentProvider;
    paymentMethodNonce: string;
    amount: number;
    donationType: DonationType;
    transaction_id: string;
    customer_id: string;
    customer: CustomerInfo;
    billing: BillingInfo;
    subscription?: SubscriptionResponse;
  }) {
    this.paymentProvider = params.paymentProvider;
    this.paymentMethodNonce = params.paymentMethodNonce;
    this.amount = params.amount;
    this.donationType = params.donationType;
    this.transaction_id = params.transaction_id;
    this.customer_id = params.customer_id;

    this.customer = new CustomerInfo(params.customer);
    this.billing = new BillingInfo(params.billing);

    if (params.subscription) {
      this.subscription = new SubscriptionResponse(params.subscription);
    }
  }
}

/** A code and message pair, for telling one error apart from another. */
export class CodedError {
  code: string;
  message: string;

  constructor(params: { code: string; message: string }) {
    this.code = params.code;
    this.message = params.message;
  }
}

/** What the backend returns for a donation that failed. */
export class ErrorResponse {
  message: string;
  errors: CodedError[];

  constructor(params: { message: string; errors?: CodedError[] }) {
    this.message = params.message;

    const { errors = [] } = params;
    this.errors = errors.map((error: CodedError) => new CodedError(error));
  }
}

/**
 * The backend's answer to a `DonationRequest`. `value` is a `SuccessResponse`
 * or an `ErrorResponse` depending on `success`.
 */
export class DonationResponse {
  success: boolean;
  value: SuccessResponse | ErrorResponse;

  constructor(params: {
    success: boolean;
    value: SuccessResponse | ErrorResponse;
  }) {
    this.success = params.success;

    if (this.success) {
      this.value = new SuccessResponse(params.value as SuccessResponse);
    } else {
      this.value = new ErrorResponse(params.value as ErrorResponse);
    }
  }
}
