import type * as braintree from 'braintree-web';
import type * as paypal from 'paypal-checkout-components';
import type { LazyLoaderServiceInterface } from '@internetarchive/lazy-loader-service';
import { PromisedSingleton } from '@internetarchive/promised-singleton';

import { HostingEnvironment } from './hosting-environment';

export interface PaymentClientsInterface {
  braintreeClient: PromisedSingleton<typeof braintree.client>;
  dataCollector: PromisedSingleton<typeof braintree.dataCollector>;
  hostedFields: PromisedSingleton<typeof braintree.hostedFields>;
  venmo: PromisedSingleton<typeof braintree.venmo>;
  payPal: PromisedSingleton<typeof braintree.paypalCheckout>;
  applePay: PromisedSingleton<typeof braintree.applePay>;
  googlePayBraintreeClient: PromisedSingleton<typeof braintree.googlePayment>;

  googlePaymentsClient: PromisedSingleton<google.payments.api.PaymentsClient>;
  recaptchaLibrary: PromisedSingleton<ReCaptchaV2.ReCaptcha>;
  paypalLibrary: PromisedSingleton<typeof paypal>;
}

/**
 * Loads and hands around the payment libraries. Each one is lazy loaded from
 * its CDN on first request, through the LazyLoaderService, and then cached,
 * so the rest of the form deals in typed objects instead of the untyped
 * globals the providers attach to `window`.
 */
export class PaymentClients implements PaymentClientsInterface {
  braintreeClient: PromisedSingleton<typeof braintree.client> =
    new PromisedSingleton({
      generator: async () => {
        await this.loadBraintreeScript('client');
        return window.braintree.client;
      },
    });

  dataCollector: PromisedSingleton<typeof braintree.dataCollector> =
    new PromisedSingleton({
      generator: async () => {
        await this.loadBraintreeScript('data-collector');
        return window.braintree.dataCollector;
      },
    });

  hostedFields: PromisedSingleton<typeof braintree.hostedFields> =
    new PromisedSingleton({
      generator: async () => {
        await this.loadBraintreeScript('hosted-fields');
        return window.braintree.hostedFields;
      },
    });

  venmo: PromisedSingleton<typeof braintree.venmo> = new PromisedSingleton({
    generator: async () => {
      await this.loadBraintreeScript('venmo');
      return window.braintree.venmo;
    },
  });

  payPal: PromisedSingleton<typeof braintree.paypalCheckout> =
    new PromisedSingleton({
      generator: async () => {
        await this.loadBraintreeScript('paypal-checkout');
        return window.braintree.paypalCheckout;
      },
    });

  applePay: PromisedSingleton<typeof braintree.applePay> =
    new PromisedSingleton({
      generator: async () => {
        await this.loadBraintreeScript('apple-pay');
        return window.braintree.applePay;
      },
    });

  googlePayBraintreeClient: PromisedSingleton<typeof braintree.googlePayment> =
    new PromisedSingleton({
      generator: async () => {
        await this.loadBraintreeScript('google-payment');
        return window.braintree.googlePayment;
      },
    });

  googlePaymentsClient =
    new PromisedSingleton<google.payments.api.PaymentsClient>({
      generator: async () => {
        await this.lazyLoader.loadScript({
          src: 'https://pay.google.com/gp/p/js/pay.js',
        });
        return new google.payments.api.PaymentsClient({
          environment:
            this.environment === HostingEnvironment.Development
              ? 'TEST'
              : 'PRODUCTION',
        });
      },
    });

  recaptchaLibrary = new PromisedSingleton<ReCaptchaV2.ReCaptcha>({
    generator: () =>
      new Promise((resolve) => {
        // The recaptcha library isn't usable the moment its script has loaded,
        // so, as Google recommends, a callback is hung on `window` before the
        // load starts and removed once it fires.
        window.iaDonationFormGrecaptchaLoaded = (): void => {
          setTimeout(() => {
            delete window.iaDonationFormGrecaptchaLoaded;
          }, 10);
          resolve(window.grecaptcha);
        };

        this.lazyLoader.loadScript({
          src: 'https://www.google.com/recaptcha/api.js?onload=iaDonationFormGrecaptchaLoaded&render=explicit',
        });
      }),
  });

  paypalLibrary = new PromisedSingleton<typeof paypal>({
    generator: async () => {
      await this.lazyLoader.loadScript({
        src: 'https://www.paypalobjects.com/api/checkout.js',
        attributes: {
          'data-version-4': '',
          'log-level': 'warn',
        },
      });
      return window.paypal;
    },
  });

  constructor(
    lazyLoader: LazyLoaderServiceInterface,
    environment: HostingEnvironment,
  ) {
    this.lazyLoader = lazyLoader;
    this.environment = environment;
  }

  private async loadBraintreeScript(scriptName: string): Promise<void> {
    const extension =
      this.environment === HostingEnvironment.Production ? 'min.js' : 'js';
    const url = `https://js.braintreegateway.com/web/${this.braintreeVersion}/js/${scriptName}.${extension}`;
    await this.lazyLoader.loadScript({ src: url });
  }

  private braintreeVersion = '3.62.2';

  private environment: HostingEnvironment = HostingEnvironment.Development;

  private lazyLoader: LazyLoaderServiceInterface;
}

declare global {
  interface Window {
    /** Set while the recaptcha script is loading, see `PaymentClients.recaptchaLibrary`. */
    iaDonationFormGrecaptchaLoaded?: () => void;
  }
}
