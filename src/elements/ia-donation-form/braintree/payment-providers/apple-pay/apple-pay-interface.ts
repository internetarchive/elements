import type * as braintree from 'braintree-web';
import type { PromisedSingleton } from '@internetarchive/promised-singleton';

import type { DonationPaymentInfo } from '../../../models/donation-payment-info';
import type { ApplePaySessionDataSourceInterface } from './apple-pay-session-datasource-interface';

export interface ApplePayHandlerInterface {
  /** Undefined when this browser can't make Apple Pay payments */
  instance: PromisedSingleton<braintree.ApplePay | undefined>;
  isAvailable(): Promise<boolean>;
  createPaymentRequest(
    e: Event,
    donationInfo: DonationPaymentInfo,
  ): Promise<ApplePaySessionDataSourceInterface>;
}
