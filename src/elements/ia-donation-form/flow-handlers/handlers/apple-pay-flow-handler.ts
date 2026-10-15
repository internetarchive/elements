import { msg } from '@lit/localize';

import type { BraintreeManagerInterface } from '../../braintree/braintree-manager-interface';
import type {
  ApplePaySessionDataSourceDelegate,
  ApplePaySessionDataSourceInterface,
} from '../../braintree/payment-providers/apple-pay/apple-pay-session-datasource-interface';
import type { DonationPaymentInfo } from '../../models/donation-payment-info';
import type {
  DonationResponse,
  ErrorResponse,
  SuccessResponse,
} from '../../models/donation-response';
import { DonationType } from '../../models/donation-type';
import type { DonationFlowModalManagerInterface } from '../donation-flow-modal-manager';

export interface ApplePayFlowHandlerInterface {
  paymentInitiated(donationInfo: DonationPaymentInfo, e: Event): Promise<void>;
}

/** The Apple Pay flow: the sheet does the collecting, this handles what comes back. */
export class ApplePayFlowHandler
  implements ApplePayFlowHandlerInterface, ApplePaySessionDataSourceDelegate
{
  private donationFlowModalManager: DonationFlowModalManagerInterface;

  private braintreeManager: BraintreeManagerInterface;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface;
    donationFlowModalManager: DonationFlowModalManagerInterface;
  }) {
    this.braintreeManager = options.braintreeManager;
    this.donationFlowModalManager = options.donationFlowModalManager;
  }

  private applePayDataSource?: ApplePaySessionDataSourceInterface;

  async paymentInitiated(
    donationInfo: DonationPaymentInfo,
    e: Event,
  ): Promise<void> {
    this.donationFlowModalManager.showProcessingModal();
    const handler =
      await this.braintreeManager.paymentProviders.applePayHandler.get();
    this.applePayDataSource = await handler.createPaymentRequest(
      e,
      donationInfo,
    );

    if (this.applePayDataSource) {
      this.applePayDataSource.delegate = this;
    }
  }

  private async modalYesSelected(
    oneTimeDonationResponse: SuccessResponse,
    amount: number,
  ): Promise<void> {
    this.donationFlowModalManager.showProcessingModal();

    const response = await this.braintreeManager.submitUpsellDonation({
      oneTimeDonationResponse,
      amount,
    });

    if (response.success) {
      this.donationFlowModalManager.showThankYouModal({
        successResponse: oneTimeDonationResponse,
        upsellSuccessResponse: response.value as SuccessResponse,
      });
    } else {
      const error = response.value as ErrorResponse;
      this.donationFlowModalManager.showErrorModal({ message: error.message });
    }
  }

  paymentComplete(response: DonationResponse): void {
    if (response.success) {
      const successResponse = response.value as SuccessResponse;
      if (
        this.applePayDataSource?.donationInfo.donationType ===
        DonationType.OneTime
      ) {
        this.donationFlowModalManager.showUpsellModal({
          oneTimeAmount: successResponse.amount,
          yesSelected: this.modalYesSelected.bind(this, successResponse),
          noSelected: () =>
            this.donationFlowModalManager.showThankYouModal({
              successResponse,
            }),
          userClosedModalCallback: () =>
            this.donationFlowModalManager.showThankYouModal({
              successResponse,
            }),
        });
      } else {
        this.donationFlowModalManager.showThankYouModal({ successResponse });
      }
    } else {
      const errorResponse = response.value as ErrorResponse;
      this.donationFlowModalManager.showErrorModal({
        message: errorResponse.message,
      });
    }
  }

  paymentFailed(): void {
    this.donationFlowModalManager.showErrorModal({
      message: msg('Payment failed'),
    });
  }

  paymentCancelled(): void {
    this.donationFlowModalManager.closeModal();
  }
}
