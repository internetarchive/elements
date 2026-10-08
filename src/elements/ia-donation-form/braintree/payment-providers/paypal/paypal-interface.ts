import type * as braintree from 'braintree-web';
import type * as paypal from 'paypal-checkout-components';
import type { PromisedSingleton } from '@internetarchive/promised-singleton';

import type { DonationPaymentInfo } from '../../../models/donation-payment-info';
import type { PayPalButtonDataSourceInterface } from './paypal-button-datasource';

export interface PayPalHandlerInterface {
  instance: PromisedSingleton<braintree.PayPalCheckout | undefined>;

  renderPayPalButton(params: {
    selector: string;
    style: paypal.ButtonStyle;
    donationInfo: DonationPaymentInfo;
  }): Promise<PayPalButtonDataSourceInterface | undefined>;
}
