import type { DonationPaymentInfo } from '../../../models/donation-payment-info';
import type { DonationResponse } from '../../../models/donation-response';

/** Anything interested in how an Apple Pay session ends. */
export interface ApplePaySessionDataSourceDelegate {
  paymentComplete(response: DonationResponse): void;
  paymentFailed(error: unknown): void;
  paymentCancelled(): void;
}

/**
 * Handles the callbacks of one `ApplePaySession`: validating the merchant,
 * submitting the authorized payment, and cancellation.
 */
export interface ApplePaySessionDataSourceInterface {
  delegate?: ApplePaySessionDataSourceDelegate;
  donationInfo: DonationPaymentInfo;
  onvalidatemerchant(
    event: ApplePayJS.ApplePayValidateMerchantEvent,
  ): Promise<void>;
  onpaymentauthorized(
    event: ApplePayJS.ApplePayPaymentAuthorizedEvent,
  ): Promise<void>;
  oncancel(): Promise<void>;
}
