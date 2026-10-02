import type { ModalManagerInterface } from '@internetarchive/modal-manager';

import type { DonationEventLoggerInterface } from '../analytics';
import type { BraintreeManagerInterface } from '../braintree/braintree-manager-interface';
import type { DonationType } from '../models/donation-type';
import type { UpsellModalCTAMode } from '../modals/ia-donation-upsell-modal-content';
import type { RecaptchaManagerInterface } from '../recaptcha-manager';
import {
  DonationFlowModalManager,
  type DonationFlowModalManagerInterface,
} from './donation-flow-modal-manager';
import {
  ApplePayFlowHandler,
  type ApplePayFlowHandlerInterface,
} from './handlers/apple-pay-flow-handler';
import {
  CreditCardFlowHandler,
  type CreditCardFlowHandlerInterface,
} from './handlers/credit-card-flow-handler';
import {
  GooglePayFlowHandler,
  type GooglePayFlowHandlerInterface,
} from './handlers/google-pay-flow-handler';
import {
  PayPalFlowHandler,
  type PayPalFlowHandlerInterface,
} from './handlers/paypal-flow-handler';
import {
  VenmoFlowHandler,
  type VenmoFlowHandlerInterface,
} from './handlers/venmo-flow-handler';

export interface PaymentFlowHandlersInterface {
  startup(): Promise<void>;

  showUpsellModal(options: {
    oneTimeAmount: number;
    ctaMode?: UpsellModalCTAMode;
    yesSelected?: (amount: number) => void;
    noSelected?: () => void;
    amountChanged?: (amount: number) => void;
    userClosedModalCallback?: () => void;
  }): Promise<void>;

  showConfirmationStepModal(options: {
    amount: number;
    donationType: DonationType;
    currencyType: string;
    confirmDonationCB: () => void;
    cancelDonationCB: () => void;
  }): Promise<void>;

  creditCardHandler: CreditCardFlowHandlerInterface | undefined;
  paypalHandler: PayPalFlowHandlerInterface | undefined;
  applePayHandler: ApplePayFlowHandlerInterface | undefined;
  venmoHandler: VenmoFlowHandlerInterface | undefined;
  googlePayHandler: GooglePayFlowHandlerInterface | undefined;
}

/**
 * The container for the per-provider flow handlers.
 *
 * A flow handler owns the steps between the UI and the data for one
 * provider. For a credit card, that's: read the contact form, run recaptcha,
 * tokenize the hosted fields, submit, show the upsell, finish. For PayPal the
 * donor starts from PayPal's own button and the handler picks up from there.
 */
export class PaymentFlowHandlers implements PaymentFlowHandlersInterface {
  async startup(): Promise<void> {
    this.venmoHandler?.startup();
    this.creditCardHandler?.startup();
  }

  async showUpsellModal(options: {
    oneTimeAmount: number;
    ctaMode?: UpsellModalCTAMode;
    yesSelected?: (amount: number) => void;
    noSelected?: () => void;
    amountChanged?: (amount: number) => void;
    userClosedModalCallback?: () => void;
  }): Promise<void> {
    return this.donationFlowModalManager.showUpsellModal(options);
  }

  showConfirmationStepModal(options: {
    amount: number;
    donationType: DonationType;
    currencyType: string;
    confirmDonationCB: () => void;
    cancelDonationCB: () => void;
  }): Promise<void> {
    return this.donationFlowModalManager.showConfirmationStepModal(options);
  }

  get creditCardHandler(): CreditCardFlowHandlerInterface {
    this.creditCardHandlerCache ??= new CreditCardFlowHandler({
      braintreeManager: this.braintreeManager,
      donationFlowModalManager: this.donationFlowModalManager,
      recaptchaManager: this.recaptchaManager,
    });
    return this.creditCardHandlerCache;
  }

  get paypalHandler(): PayPalFlowHandlerInterface {
    this.paypalHandlerCache ??= new PayPalFlowHandler({
      braintreeManager: this.braintreeManager,
      donationFlowModalManager: this.donationFlowModalManager,
    });
    return this.paypalHandlerCache;
  }

  get applePayHandler(): ApplePayFlowHandlerInterface {
    this.applePayHandlerCache ??= new ApplePayFlowHandler({
      braintreeManager: this.braintreeManager,
      donationFlowModalManager: this.donationFlowModalManager,
    });
    return this.applePayHandlerCache;
  }

  get venmoHandler(): VenmoFlowHandlerInterface {
    this.venmoHandlerCache ??= new VenmoFlowHandler({
      braintreeManager: this.braintreeManager,
      donationFlowModalManager: this.donationFlowModalManager,
    });
    return this.venmoHandlerCache;
  }

  get googlePayHandler(): GooglePayFlowHandlerInterface {
    this.googlePayHandlerCache ??= new GooglePayFlowHandler({
      braintreeManager: this.braintreeManager,
      donationFlowModalManager: this.donationFlowModalManager,
    });
    return this.googlePayHandlerCache;
  }

  private creditCardHandlerCache?: CreditCardFlowHandlerInterface;
  private paypalHandlerCache?: PayPalFlowHandlerInterface;
  private applePayHandlerCache?: ApplePayFlowHandlerInterface;
  private venmoHandlerCache?: VenmoFlowHandlerInterface;
  private googlePayHandlerCache?: GooglePayFlowHandlerInterface;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface;
    modalManager: ModalManagerInterface;
    recaptchaManager: RecaptchaManagerInterface;
    analytics: DonationEventLoggerInterface;
  }) {
    this.braintreeManager = options.braintreeManager;
    this.recaptchaManager = options.recaptchaManager;

    this.donationFlowModalManager = new DonationFlowModalManager({
      braintreeManager: this.braintreeManager,
      modalManager: options.modalManager,
      analytics: options.analytics,
    });
  }

  private braintreeManager: BraintreeManagerInterface;
  private recaptchaManager: RecaptchaManagerInterface;
  private donationFlowModalManager: DonationFlowModalManagerInterface;
}
