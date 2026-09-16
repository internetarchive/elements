import type * as braintree from 'braintree-web';
import { createNanoEvents, type Emitter, type Unsubscribe } from 'nanoevents';
import { msg } from '@lit/localize';

import type { BraintreeManagerInterface } from '../../braintree/braintree-manager-interface';
import { HostedFieldName } from '../../braintree/payment-providers/credit-card/hosted-field-container';
import type { IADonationBadgedInput } from '../../form-elements/ia-donation-badged-input';
import type { DonationPaymentInfo } from '../../models/donation-payment-info';
import type { DonorContactInfo } from '../../models/donor-contact-info';
import { PaymentProvider } from '../../models/payment-provider';
import type { RecaptchaManagerInterface } from '../../recaptcha-manager';
import type { DonationFlowModalManagerInterface } from '../donation-flow-modal-manager';

export interface CreditCardFlowHandlerInterface {
  /** Bind the hosted field events */
  startup(): Promise<void>;

  /**
   * Tokenize the hosted fields. This also validates them, so it runs before
   * the payment starts and shows any field errors.
   */
  tokenizeFields(): Promise<braintree.HostedFieldsTokenizePayload | undefined>;

  /** Start the payment. Call `tokenizeFields()` first to validate the hosted fields. */
  paymentInitiated(
    hostedFieldsResponse: braintree.HostedFieldsTokenizePayload,
    donationInfo: DonationPaymentInfo,
    donorContactInfo: DonorContactInfo,
  ): Promise<void>;

  on<E extends keyof CreditCardFlowHandlerEvents>(
    event: E,
    callback: CreditCardFlowHandlerEvents[E],
  ): Unsubscribe;
}

export interface CreditCardFlowHandlerEvents {
  validityChanged: (isValid: boolean) => void;
}

export class CreditCardFlowHandler implements CreditCardFlowHandlerInterface {
  private donationFlowModalManager: DonationFlowModalManagerInterface;

  private braintreeManager: BraintreeManagerInterface;

  private recaptchaManager: RecaptchaManagerInterface;

  private emitter: Emitter<CreditCardFlowHandlerEvents>;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface;
    donationFlowModalManager: DonationFlowModalManagerInterface;
    recaptchaManager: RecaptchaManagerInterface;
  }) {
    this.braintreeManager = options.braintreeManager;
    this.donationFlowModalManager = options.donationFlowModalManager;
    this.recaptchaManager = options.recaptchaManager;
    this.emitter = createNanoEvents<CreditCardFlowHandlerEvents>();
  }

  on<E extends keyof CreditCardFlowHandlerEvents>(
    event: E,
    callback: CreditCardFlowHandlerEvents[E],
  ): Unsubscribe {
    return this.emitter.on(event, callback);
  }

  private started = false;

  async startup(): Promise<void> {
    if (this.started) {
      return;
    }
    this.started = true;

    const handler =
      await this.braintreeManager.paymentProviders.creditCardHandler.get();
    const instance = await handler.instance.get();

    // The hosted fields only report focus and blur through these callbacks,
    // so the error state of the wrapping badged inputs is toggled here, apart
    // from the HostedFieldContainer that handles it everywhere else.
    instance?.on('focus', (event: braintree.HostedFieldsEvent): void => {
      const { emittedBy, fields } = event;
      const { container } = fields[emittedBy];
      (container.parentElement as IADonationBadgedInput).error = false;
      handler.hideErrorMessage();
    });

    instance?.on('blur', (event: braintree.HostedFieldsEvent): void => {
      const { emittedBy, fields } = event;
      const { container, isEmpty, isValid } = fields[emittedBy];
      if (isEmpty || !isValid) {
        (container.parentElement as IADonationBadgedInput).error = true;
      }
    });

    instance?.on(
      'validityChange',
      (event: braintree.HostedFieldsEvent): void => {
        const { fields } = event;
        const isValid =
          fields.cvv.isValid &&
          fields.expirationDate.isValid &&
          fields.number.isValid;
        this.emitter.emit('validityChanged', isValid);
      },
    );
  }

  async tokenizeFields(): Promise<
    braintree.HostedFieldsTokenizePayload | undefined
  > {
    const handler =
      await this.braintreeManager.paymentProviders.creditCardHandler.get();

    try {
      return await handler.tokenizeHostedFields();
    } catch (error) {
      this.handleHostedFieldTokenizationError(
        error as braintree.BraintreeError,
      );
      return undefined;
    }
  }

  async paymentInitiated(
    hostedFieldsResponse: braintree.HostedFieldsTokenizePayload,
    donationInfo: DonationPaymentInfo,
    donorContactInfo: DonorContactInfo,
  ): Promise<void> {
    let recaptchaToken: string | undefined;

    try {
      recaptchaToken = await this.recaptchaManager.execute();
    } catch {
      this.donationFlowModalManager.showErrorModal({
        message: msg('Recaptcha failure'),
      });
      return;
    }

    this.donationFlowModalManager.startDonationSubmissionFlow({
      nonce: hostedFieldsResponse.nonce,
      paymentProvider: PaymentProvider.CreditCard,
      recaptchaToken,
      bin: hostedFieldsResponse.details.bin,
      donationInfo,
      customerInfo: donorContactInfo.customer,
      billingInfo: donorContactInfo.billing,
    });
  }

  /**
   * Marks the fields Braintree rejected. The codes are documented at
   * https://braintree.github.io/braintree-web/current/HostedFields.html#tokenize
   */
  private async handleHostedFieldTokenizationError(
    error: braintree.BraintreeError,
  ): Promise<void> {
    const handler =
      await this.braintreeManager.paymentProviders.creditCardHandler.get();

    handler.showErrorMessage();

    switch (error.code) {
      case 'HOSTED_FIELDS_FIELDS_EMPTY':
        handler.markFieldErrors([
          HostedFieldName.Number,
          HostedFieldName.CVV,
          HostedFieldName.ExpirationDate,
        ]);
        break;
      case 'HOSTED_FIELDS_FIELDS_INVALID':
        Object.keys(error.details.invalidFields).forEach((key) => {
          handler.markFieldErrors([key as HostedFieldName]);
        });
        break;
      case 'HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED':
        handler.markFieldErrors([HostedFieldName.CVV]);
        break;
      // HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE,
      // HOSTED_FIELDS_FAILED_TOKENIZATION,
      // HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR and anything else: the
      // general error message is enough, no field to point at.
      default:
        break;
    }
  }
}
