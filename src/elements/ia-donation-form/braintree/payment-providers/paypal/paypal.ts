import type * as braintree from 'braintree-web';
import type * as paypal from 'paypal-checkout-components';
import { PromisedSingleton } from '@internetarchive/promised-singleton';

import type { DonationPaymentInfo } from '../../../models/donation-payment-info';
import type { BraintreeManagerInterface } from '../../braintree-manager-interface';
import { HostingEnvironment } from '../../hosting-environment';
import {
  PayPalButtonDataSource,
  type PayPalButtonDataSourceInterface,
} from './paypal-button-datasource';
import type { PayPalHandlerInterface } from './paypal-interface';

export class PayPalHandler implements PayPalHandlerInterface {
  instance: PromisedSingleton<braintree.PayPalCheckout | undefined>;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface;
    paypalClient: typeof braintree.paypalCheckout;
    paypalButton: paypal.ButtonRenderer;
    hostingEnvironment: HostingEnvironment;
  }) {
    this.braintreeManager = options.braintreeManager;
    this.paypalClient = options.paypalClient;
    this.paypalButtonGenerator = options.paypalButton;
    this.hostingEnvironment = options.hostingEnvironment;

    this.instance = new PromisedSingleton<braintree.PayPalCheckout | undefined>(
      {
        generator: async () => {
          const braintreeClient = await this.braintreeManager.instance.get();
          return this.paypalClient.create({ client: braintreeClient });
        },
      },
    );
  }

  private braintreeManager: BraintreeManagerInterface;

  private paypalClient: typeof braintree.paypalCheckout;

  private paypalButtonGenerator: paypal.ButtonRenderer;

  private hostingEnvironment: HostingEnvironment;

  async renderPayPalButton(params: {
    selector: string;
    style: paypal.ButtonStyle;
    donationInfo: DonationPaymentInfo;
  }): Promise<PayPalButtonDataSourceInterface | undefined> {
    const env = (
      this.hostingEnvironment === HostingEnvironment.Development
        ? 'sandbox'
        : 'production'
    ) as paypal.Environment;

    const paypalInstance = await this.instance.get();
    if (!paypalInstance) {
      return;
    }

    const dataSource = new PayPalButtonDataSource({
      donationInfo: params.donationInfo,
      paypalInstance,
    });

    this.paypalButtonGenerator.render(
      {
        env,
        style: params.style,
        payment: dataSource.payment.bind(dataSource),
        onAuthorize: dataSource.onAuthorize.bind(dataSource),
        onCancel: dataSource.onCancel.bind(dataSource),
        onError: dataSource.onError.bind(dataSource),
        funding: {
          disallowed: [window.paypal.FUNDING.VENMO],
        },
      },
      params.selector,
    );

    return dataSource;
  }
}
