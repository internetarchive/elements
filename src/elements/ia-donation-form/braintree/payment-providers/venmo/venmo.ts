import type * as braintree from 'braintree-web';
import { PromisedSingleton } from '@internetarchive/promised-singleton';

import type { BraintreeManagerInterface } from '../../braintree-manager-interface';
import type { VenmoHandlerInterface } from './venmo-interface';

export class VenmoHandler implements VenmoHandlerInterface {
  instance: PromisedSingleton<braintree.Venmo>;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface;
    venmoClient: typeof braintree.venmo;
    venmoProfileId: string;
    instancePromisedSingleton?: PromisedSingleton<braintree.Venmo>;
  }) {
    this.braintreeManager = options.braintreeManager;
    this.venmoClient = options.venmoClient;
    this.venmoProfileId = options.venmoProfileId;

    this.instance =
      options.instancePromisedSingleton ??
      new PromisedSingleton<braintree.Venmo>({
        generator: async () => {
          const braintreeInstance = await this.braintreeManager.instance.get();
          return this.venmoClient.create({
            client: braintreeInstance,
            profileId: this.venmoProfileId,
          });
        },
      });
  }

  private braintreeManager: BraintreeManagerInterface;

  private venmoClient: typeof braintree.venmo;

  private venmoProfileId: string;

  async isBrowserSupported(): Promise<boolean> {
    if (this.isMobileFirefox()) {
      return false;
    }
    const instance = await this.instance.get();
    return instance?.isBrowserSupported() ?? false;
  }

  async startPayment(): Promise<braintree.VenmoTokenizePayload> {
    const instance = await this.instance.get();
    return instance.tokenize();
  }

  /**
   * Venmo doesn't work in mobile Firefox, but Braintree's browser detection
   * says it does. On iOS it opens the Venmo app and returns to Safari, and on
   * Android it lands on the "Download Venmo" page.
   */
  private isMobileFirefox(): boolean {
    const isFirefoxIos = navigator.userAgent.indexOf('FxiOS') !== -1;
    const isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;
    const isMobile = navigator.userAgent.indexOf('Mobile') !== -1;
    return (isFirefox || isFirefoxIos) && isMobile;
  }
}
