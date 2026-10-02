import type * as braintree from 'braintree-web';
import { msg } from '@lit/localize';

import type { BraintreeManagerInterface } from '../../braintree/braintree-manager-interface';
import {
  VenmoRestorationStateHandler,
  type VenmoRestorationStateHandlerInterface,
} from '../../braintree/payment-providers/venmo/venmo-restoration-state-handler';
import type { DonationPaymentInfo } from '../../models/donation-payment-info';
import type { DonorContactInfo } from '../../models/donor-contact-info';
import { PaymentProvider } from '../../models/payment-provider';
import type { DonationFlowModalManagerInterface } from '../donation-flow-modal-manager';

export interface VenmoFlowHandlerInterface {
  startup(): Promise<void>;
  paymentInitiated(
    contactInfo: DonorContactInfo,
    donationInfo: DonationPaymentInfo,
  ): Promise<void>;
}

/**
 * The Venmo flow. Venmo sends the donor to its app and back, possibly in a
 * new tab, so the donation info is stashed before leaving and restored on
 * startup if a tokenization result is waiting.
 */
export class VenmoFlowHandler implements VenmoFlowHandlerInterface {
  private donationFlowModalManager: DonationFlowModalManagerInterface;

  private braintreeManager: BraintreeManagerInterface;

  private restorationStateHandler: VenmoRestorationStateHandlerInterface;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface;
    donationFlowModalManager: DonationFlowModalManagerInterface;
    restorationStateHandler?: VenmoRestorationStateHandlerInterface;
  }) {
    this.braintreeManager = options.braintreeManager;
    this.donationFlowModalManager = options.donationFlowModalManager;
    this.restorationStateHandler =
      options.restorationStateHandler ?? new VenmoRestorationStateHandler();
  }

  /** Resume a Venmo payment if the app redirected back to us with a result. */
  async startup(): Promise<void> {
    const handler =
      await this.braintreeManager.paymentProviders.venmoHandler.get();
    const instance = await handler?.instance.get();
    if (instance?.hasTokenizationResult()) {
      const restoredInfo =
        await this.restorationStateHandler.getRestorationState();
      if (restoredInfo) {
        this.paymentInitiated(
          restoredInfo.contactInfo,
          restoredInfo.donationInfo,
        );
      } else {
        console.error('no restoration info');
        this.donationFlowModalManager.showErrorModal({
          message: msg('Error restoring donation session'),
        });
      }
    }
  }

  async paymentInitiated(
    contactInfo: DonorContactInfo,
    donationInfo: DonationPaymentInfo,
  ): Promise<void> {
    // Stashed in case Venmo brings the donor back in a new tab
    this.restorationStateHandler.persistState(contactInfo, donationInfo);

    try {
      const handler =
        await this.braintreeManager.paymentProviders.venmoHandler.get();
      const result = await handler?.startPayment();
      if (!result) {
        this.restorationStateHandler.clearState();
        this.donationFlowModalManager.showErrorModal({
          message: msg('Error setting up the donation'),
        });
        return;
      }
      this.handleTokenizationResult(result, contactInfo, donationInfo);
    } catch (tokenizeError) {
      this.restorationStateHandler.clearState();
      this.handleTokenizationError(tokenizeError as braintree.BraintreeError);
      this.donationFlowModalManager.showErrorModal({
        message: msg(
          'There was a problem loading your donation information. Please try again.',
        ),
      });
    }
  }

  private async handleTokenizationResult(
    payload: braintree.VenmoTokenizePayload,
    contactInfo: DonorContactInfo,
    donationInfo: DonationPaymentInfo,
  ): Promise<void> {
    this.restorationStateHandler.clearState();

    this.donationFlowModalManager.startDonationSubmissionFlow({
      nonce: payload.nonce,
      paymentProvider: PaymentProvider.Venmo,
      donationInfo,
      customerInfo: contactInfo.customer,
      billingInfo: contactInfo.billing,
    });
  }

  private handleTokenizationError(
    tokenizeError: braintree.BraintreeError,
  ): void {
    switch (tokenizeError.code) {
      // The donor backed out, nothing to report
      case 'VENMO_APP_CANCELED':
      case 'VENMO_CANCELED':
        break;
      default:
        console.error('Venmo tokenization error', tokenizeError);
    }
  }
}
