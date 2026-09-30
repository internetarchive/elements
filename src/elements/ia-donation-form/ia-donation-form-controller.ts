import type * as braintree from 'braintree-web';
import {
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { msg } from '@lit/localize';
import currency from 'currency.js';
import {
  LazyLoaderService,
  type LazyLoaderServiceInterface,
} from '@internetarchive/lazy-loader-service';
import type { ModalManagerInterface } from '@internetarchive/modal-manager';
import type {
  AnalyticsEvent,
  AnalyticsManagerInterface,
} from '@internetarchive/analytics-manager';

import { BraintreeManager } from './braintree/braintree-manager';
import type {
  BraintreeEndpointManagerInterface,
  BraintreeManagerInterface,
} from './braintree/braintree-manager-interface';
import type { HostingEnvironment } from './braintree/hosting-environment';
import {
  PaymentClients,
  type PaymentClientsInterface,
} from './braintree/payment-clients';
import { HostedFieldConfiguration } from './braintree/payment-providers/credit-card/hosted-field-configuration';
import { HostedFieldContainer } from './braintree/payment-providers/credit-card/hosted-field-container';
import {
  PaymentFlowHandlers,
  type PaymentFlowHandlersInterface,
} from './flow-handlers/payment-flow-handlers';
import type { IADonationContactForm } from './form-elements/contact-form/ia-donation-contact-form';
import {
  EditDonationAmountSelectionLayout,
  EditDonationFrequencySelectionMode,
} from './form-elements/ia-donation-edit-donation';
import type { IADonationForm } from './ia-donation-form';
import { calendarIcon, creditCardIcon, lockIcon } from './icons';
import {
  DonationPaymentInfo,
  defaultDonationAmounts,
  defaultSelectedDonationInfo,
} from './models/donation-payment-info';
import { DonationType } from './models/donation-type';
import type { PaymentProvider } from './models/payment-provider';
import type { UpsellModalCTAMode } from './modals/ia-donation-upsell-modal-content';
import {
  RecaptchaManager,
  type RecaptchaManagerInterface,
} from './recaptcha-manager';
import './form-elements/contact-form/ia-donation-contact-form';
import './form-elements/ia-donation-badged-input';
import './ia-donation-form';

/**
 * Wires the donation form to everything around it: Braintree and the payment
 * libraries, the modal manager, recaptcha, and analytics. Give it the
 * environment, tokens and an endpoint manager and it builds the rest.
 *
 * It renders into the light DOM, because Braintree's hosted fields, the
 * PayPal button and recaptcha all refuse to work inside a shadow root. Those
 * are rendered here and slotted into `<ia-donation-form>`.
 */
@customElement('ia-donation-form-controller')
export class IADonationFormController extends LitElement {
  @property({ type: String }) environment?: HostingEnvironment;

  @property({ type: String }) braintreeAuthToken?: string;

  @property({ type: String }) recaptchaSiteKey?: string;

  @property({ type: String }) venmoProfileId?: string;

  @property({ type: String }) googlePayMerchantId?: string;

  @property({ type: String }) analyticsCategory = 'DonationForm';

  @property({ type: Array }) amountOptions: number[] = defaultDonationAmounts;

  @property({ type: Object }) donationInfo: DonationPaymentInfo =
    defaultSelectedDonationInfo;

  @property({ type: String })
  amountSelectionLayout: EditDonationAmountSelectionLayout =
    EditDonationAmountSelectionLayout.MultiLine;

  @property({ type: String })
  frequencySelectionMode: EditDonationFrequencySelectionMode =
    EditDonationFrequencySelectionMode.Button;

  @property({ type: String }) referrer?: string;

  @property({ type: String }) loggedInUser?: string;

  @property({ type: String }) origin?: string;

  @property({ type: String }) donorEmail: string = '';

  @property({ type: Object })
  endpointManager?: BraintreeEndpointManagerInterface;

  @property({ type: Object }) analyticsHandler?: AnalyticsManagerInterface;

  @property({ type: Object }) modalManager?: ModalManagerInterface;

  /** The element recaptcha renders its (invisible) widget into. Must be in the light DOM. */
  @property({ type: Object }) recaptchaElement?: HTMLElement;

  @property({ type: Object }) braintreeManager?: BraintreeManagerInterface;

  @property({ type: Object }) recaptchaManager?: RecaptchaManagerInterface;

  @property({ type: Object })
  paymentFlowHandlers?: PaymentFlowHandlersInterface;

  @property({ type: Object }) paymentClients?: PaymentClientsInterface;

  /** The clients this element built itself, so it knows when it may rebuild them */
  private defaultPaymentClients?: PaymentClientsInterface;

  @property({ type: Object })
  lazyLoaderService: LazyLoaderServiceInterface = new LazyLoaderService();

  @query('ia-donation-form') private donationForm!: IADonationForm;

  @query('#braintree-creditcard') private braintreeNumberInput!: HTMLDivElement;

  @query('#braintree-cvv') private braintreeCVVInput!: HTMLDivElement;

  @query('#braintree-expiration')
  private braintreeExpirationDateInput!: HTMLDivElement;

  @query('#braintree-error-message')
  private braintreeErrorMessage!: HTMLDivElement;

  @query('ia-donation-contact-form')
  private contactForm?: IADonationContactForm;

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('referrer') && this.referrer) {
      this.braintreeManager?.setReferrer(this.referrer);
      this.logDonationFlowEvent('referrer', this.referrer);
    }

    if (changedProperties.has('loggedInUser') && this.loggedInUser) {
      this.braintreeManager?.setLoggedInUser(this.loggedInUser);
    }

    if (changedProperties.has('origin') && this.origin) {
      this.braintreeManager?.setOrigin(this.origin);
      this.logDonationFlowEvent('origin', this.origin);
    }

    if (
      changedProperties.has('paymentClients') ||
      changedProperties.has('braintreeAuthToken') ||
      changedProperties.has('endpointManager') ||
      changedProperties.has('environment')
    ) {
      this.setupBraintreeManager();
      this.setupRecaptchaManager();
    }

    if (changedProperties.has('recaptchaSiteKey')) {
      this.setupRecaptchaManager();
    }

    if (
      changedProperties.has('braintreeManager') ||
      changedProperties.has('recaptchaManager') ||
      changedProperties.has('modalManager') ||
      changedProperties.has('recaptchaElement')
    ) {
      this.setupPaymentFlowHandlers();
    }

    // Build the default clients for the environment, unless the consumer
    // supplied their own
    if (
      (changedProperties.has('environment') ||
        changedProperties.has('lazyLoaderService')) &&
      this.environment &&
      (this.paymentClients === undefined ||
        this.paymentClients === this.defaultPaymentClients)
    ) {
      this.defaultPaymentClients = new PaymentClients(
        this.lazyLoaderService,
        this.environment,
      );
      this.paymentClients = this.defaultPaymentClients;
    }
  }

  /** Developer convenience: show the confirmation step without a payment. */
  async showConfirmationStepDev(options: {
    donationType: DonationType;
    amount: number;
    currencyType: string;
    cancelDonationCB: () => void;
    confirmDonationCB: () => void;
  }): Promise<void> {
    this.donationForm.showConfirmationModalDev(options);
  }

  /** Developer convenience: show the upsell modal without a payment. */
  async showUpsellModalDev(options: {
    oneTimeAmount: number;
    ctaMode?: UpsellModalCTAMode;
    yesSelected?: (amount: number) => void;
    noSelected?: () => void;
    amountChanged?: (amount: number) => void;
    userClosedModalCallback?: () => void;
  }): Promise<void> {
    this.donationForm.showUpsellModalDev(options);
  }

  private setupBraintreeManager(): void {
    if (
      this.braintreeManager === undefined &&
      this.braintreeAuthToken &&
      this.endpointManager &&
      this.paymentClients &&
      this.environment
    ) {
      this.braintreeManager = new BraintreeManager({
        paymentClients: this.paymentClients,
        endpointManager: this.endpointManager,
        authorizationToken: this.braintreeAuthToken,
        venmoProfileId: this.venmoProfileId,
        googlePayMerchantId: this.googlePayMerchantId,
        hostedFieldConfig: this.hostedFieldConfig,
        hostingEnvironment: this.environment,
        referrer: this.referrer,
        loggedInUser: this.loggedInUser,
        origin: this.origin,
      });

      this.braintreeManager.on(
        'paymentProvidersHostedFieldsRetry',
        (retryNumber: number) => {
          this.dispatchEvent(
            new CustomEvent('paymentProvidersHostedFieldsRetry', {
              detail: { retryNumber },
            }),
          );
        },
      );

      this.braintreeManager.on(
        'paymentProvidersHostedFieldsFailed',
        (error: unknown) => {
          this.dispatchEvent(
            new CustomEvent('paymentProvidersHostedFieldsFailed', {
              detail: { error },
            }),
          );
        },
      );
    }
  }

  private recaptchaManagerSetup = false;

  private async setupRecaptchaManager(): Promise<void> {
    if (
      !this.recaptchaSiteKey ||
      !this.paymentClients ||
      this.recaptchaManagerSetup
    ) {
      return;
    }
    this.recaptchaManagerSetup = true;
    const grecaptchaLibrary = await this.paymentClients.recaptchaLibrary.get();
    this.recaptchaManager = new RecaptchaManager({
      grecaptchaLibrary,
      siteKey: this.recaptchaSiteKey,
    });
  }

  firstUpdated(): void {
    this.configureFromQueryParams();
    this.trackViewedEvent();
  }

  /**
   * The donate page links carry the starting configuration in the query
   * string: `amt`, `contrib_type`, `coverFees`, `dollarAmounts`,
   * `amountLayout` and `frequencyMode`.
   */
  private configureFromQueryParams(): void {
    const urlParams = new URLSearchParams(window.location.search);

    let amountOptions = this.amountOptions;
    const amountOptionsParam = urlParams.get('dollarAmounts');
    if (amountOptionsParam) {
      // e.g. `[5,10,25]`
      const stripBrackets = amountOptionsParam.slice(1, -1);
      amountOptions = stripBrackets
        .split(',')
        .map((value) => parseFloat(value))
        .filter((value) => !isNaN(value));
    }

    let coverFees = this.donationInfo.coverFees;
    const coverFeesParam = urlParams.get('coverFees');
    if (coverFeesParam) {
      coverFees = coverFeesParam === 'true';
    }

    let frequency = this.donationInfo.donationType;
    const frequencyParam = urlParams.get('contrib_type');
    if (frequencyParam === 'monthly') {
      frequency = DonationType.Monthly;
    }

    let amount = this.donationInfo.amount;
    const amountParam = urlParams.get('amt');
    if (amountParam) {
      const parsedAmount = currency(amountParam).value;
      if (parsedAmount > 0) {
        amount = parsedAmount;
      }
    }

    const amountLayoutParam = urlParams.get('amountLayout');
    if (amountLayoutParam) {
      const amountLayout =
        amountLayoutParam as EditDonationAmountSelectionLayout;
      if (
        Object.values(EditDonationAmountSelectionLayout).includes(amountLayout)
      ) {
        this.amountSelectionLayout = amountLayout;
      }
    }

    const frequencyModeParam = urlParams.get('frequencyMode');
    if (frequencyModeParam) {
      const frequencyMode =
        frequencyModeParam as EditDonationFrequencySelectionMode;
      if (
        Object.values(EditDonationFrequencySelectionMode).includes(
          frequencyMode,
        )
      ) {
        this.frequencySelectionMode = frequencyMode;
      }
    }

    this.amountOptions = amountOptions;
    this.donationInfo = new DonationPaymentInfo({
      donationType: frequency,
      amount,
      coverFees,
    });
  }

  private setupPaymentFlowHandlers(): void {
    if (this.paymentFlowHandlers) {
      return;
    }

    if (
      !this.braintreeManager ||
      !this.recaptchaManager ||
      !this.modalManager ||
      !this.recaptchaElement
    ) {
      return;
    }

    this.paymentFlowHandlers = new PaymentFlowHandlers({
      braintreeManager: this.braintreeManager,
      modalManager: this.modalManager,
      recaptchaManager: this.recaptchaManager,
      analytics: {
        logEvent: this.logEvent.bind(this),
        logDonationFlowEvent: this.logDonationFlowEvent.bind(this),
      },
    });

    this.donationForm.braintreeManager = this.braintreeManager;
    this.donationForm.paymentFlowHandlers = this.paymentFlowHandlers;

    this.braintreeManager.startup();
    this.paymentFlowHandlers.startup();
    this.recaptchaManager.setup(this.recaptchaElement, 1, 'light', 'image');
  }

  private get hostedFieldConfig(): HostedFieldConfiguration {
    const hostedFieldStyle: Record<string, Record<string, string>> = {
      input: {
        'font-size': '16px',
        'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
        'font-weight': '700',
        color: '#333',
      },
      ':focus': {
        color: '#333',
      },
      '.valid': {},
      '.invalid': {
        color: '#b00b00',
      },
    };

    const hostedFieldFieldOptions: braintree.HostedFieldFieldOptions = {
      number: {
        selector: '#braintree-creditcard',
        placeholder: msg('Card number'),
      },
      cvv: {
        selector: '#braintree-cvv',
        placeholder: msg('CVC'),
      },
      expirationDate: {
        selector: '#braintree-expiration',
        placeholder: msg('MM / YY'),
      },
    };

    const hostedFieldContainer = new HostedFieldContainer({
      number: this.braintreeNumberInput,
      cvv: this.braintreeCVVInput,
      expirationDate: this.braintreeExpirationDateInput,
      errorContainer: this.braintreeErrorMessage,
    });

    return new HostedFieldConfiguration({
      hostedFieldStyle,
      hostedFieldFieldOptions,
      hostedFieldContainer,
    });
  }

  render(): TemplateResult {
    return html`
      <div class="ia-donation-form-controller-container">
        <ia-donation-form
          .braintreeManager=${this.braintreeManager}
          .contactForm=${this.contactForm}
          .amountOptions=${this.amountOptions}
          .donationInfo=${this.donationInfo}
          .amountSelectionLayout=${this.amountSelectionLayout}
          .frequencySelectionMode=${this.frequencySelectionMode}
          @donationInfoChanged=${this.donationInfoChanged}
          @paymentProviderSelected=${this.paymentProviderSelected}
          @paymentFlowStarted=${this.paymentFlowStarted}
          @paymentFlowConfirmed=${this.paymentFlowConfirmed}
          @paymentFlowCancelled=${this.paymentFlowCancelled}
          @paymentFlowError=${this.paymentFlowError}
        >
          <!--
            Braintree's hosted fields, the PayPal button and recaptcha can't
            live in a shadow root, so they render here in the light DOM and
            are slotted into the form. See
            https://github.com/braintree/braintree-web-drop-in/issues/614
            and https://github.com/paypal/paypal-checkout-components/issues/353
          -->
          <div slot="braintree-hosted-fields">
            <div id="braintree-error-message"></div>
            <div class="braintree-row">
              <ia-donation-badged-input
                .icon=${creditCardIcon}
                required
                class="creditcard"
              >
                <div class="braintree-input" id="braintree-creditcard"></div>
              </ia-donation-badged-input>
            </div>
            <div class="braintree-row">
              <ia-donation-badged-input
                .icon=${calendarIcon}
                required
                class="expiration"
              >
                <div class="braintree-input" id="braintree-expiration"></div>
              </ia-donation-badged-input>
              <ia-donation-badged-input .icon=${lockIcon} required class="cvv">
                <div class="braintree-input" id="braintree-cvv"></div>
              </ia-donation-badged-input>
            </div>
          </div>

          <!-- Autofill doesn't reach into shadow DOM, so the contact form is light DOM too -->
          <div slot="contact-form">
            <ia-donation-contact-form
              .donorEmail=${this.donorEmail}
            ></ia-donation-contact-form>
          </div>

          <div slot="paypal-button">
            <div id="paypal-button"></div>
          </div>

          <slot name="recaptcha" slot="recaptcha"></slot>
        </ia-donation-form>
      </div>

      ${this.getStyles}
    `;
  }

  /** Light DOM, for the payment libraries that can't render into a shadow root */
  createRenderRoot(): this {
    return this;
  }

  private donationInfoChanged(e: CustomEvent): void {
    this.logEvent('DonationInfoChanged');
    this.donationInfo = e.detail.donationInfo;
  }

  private trackViewedEvent(): void {
    this.logEvent('Viewed');
  }

  private paymentProviderSelected(e: CustomEvent): void {
    const paymentProvider = e.detail.paymentProvider as
      | PaymentProvider
      | undefined;
    const previousPaymentProvider = e.detail.previousPaymentProvider as
      | PaymentProvider
      | undefined;
    const providerNoSpaces = this.removeSpaces(paymentProvider ?? 'unset');
    let eventName = `ProviderFirstSelected-${providerNoSpaces}`;
    let previousProviderInfo: string | undefined;
    if (previousPaymentProvider !== undefined) {
      eventName = `ProviderChangedTo-${providerNoSpaces}`;
      previousProviderInfo = `ProviderChangedFrom-${this.removeSpaces(
        previousPaymentProvider,
      )}`;
    }

    this.logEvent(eventName, previousProviderInfo);
  }

  private paymentFlowConfirmed(e: CustomEvent): void {
    this.logEvent(
      'PaymentFlowConfirmed',
      this.removeSpaces(e.detail.paymentProvider),
    );
  }

  private paymentFlowStarted(e: CustomEvent): void {
    this.logEvent(
      'PaymentFlowStarted',
      this.removeSpaces(e.detail.paymentProvider),
    );
  }

  private paymentFlowCancelled(e: CustomEvent): void {
    this.logEvent(
      'PaymentFlowCancelled',
      this.removeSpaces(e.detail.paymentProvider),
    );
  }

  private paymentFlowError(e: CustomEvent): void {
    const providerNoSpaces = this.removeSpaces(e.detail.paymentProvider);
    this.logEvent('PaymentFlowError', `${providerNoSpaces}-${e.detail.error}`);
  }

  private removeSpaces(original: string): string {
    return original.replace(/\s+/g, '');
  }

  /** A sampled event in this form's category */
  private logEvent(action: string, label?: string): void {
    const analyticEvent: AnalyticsEvent = {
      action,
      label,
      category: this.analyticsCategory,
    };
    this.analyticsHandler?.sendEvent(analyticEvent);
  }

  /** An unsampled event in the `DonationFlow` category */
  private logDonationFlowEvent(action: string, label?: string): void {
    const analyticEvent: AnalyticsEvent = {
      action,
      label,
      category: 'DonationFlow',
    };
    this.analyticsHandler?.sendEventNoSampling(analyticEvent);
  }

  /**
   * The element renders into the light DOM, so instead of a `styles` block
   * it writes its own `<style>` tag, scoped to its container class.
   *
   * The `--ia-donation-form-*` variables set here are the consumer-facing
   * theming for the whole form; they fan out to the sections, the amount
   * picker and the payment buttons.
   */
  private get getStyles(): TemplateResult {
    return html`
      <style>
        .ia-donation-form-controller-container {
          --donation-form-controller-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          color: var(--ia-donation-form-text-color, #333);
          background-color: var(
            --ia-donation-form-background-color,
            transparent
          );

          --ia-donation-section-background-color: var(
            --ia-donation-form-background-color,
            transparent
          );
          --ia-donation-edit-background-color: var(
            --ia-donation-form-background-color,
            transparent
          );

          --ia-donation-section-badge-background-color: var(
            --ia-donation-form-badge-background-color,
            #333
          );
          --ia-donation-edit-badge-background-color: var(
            --ia-donation-form-badge-background-color,
            #333
          );

          --ia-donation-section-badge-font-color: var(
            --ia-donation-form-badge-text-color,
            #fff
          );
          --ia-donation-edit-badge-font-color: var(
            --ia-donation-form-badge-text-color,
            #fff
          );

          --ia-donation-edit-button-font-color: var(
            --ia-donation-form-payment-option-text-color
          );
          --ia-donation-edit-button-color: var(
            --ia-donation-form-payment-option-background-color
          );
          --ia-donation-edit-button-selected-color: var(
            --ia-donation-form-selected-option-background-color
          );
          --ia-donation-edit-button-selected-font-color: var(
            --ia-donation-form-selected-option-text-color
          );
        }

        .ia-donation-form-controller-container ia-donation-form:focus {
          outline: none;
        }

        /* The real PayPal button, kept but nearly invisible under the local one */
        .ia-donation-form-controller-container #paypal-button {
          opacity: 0.001;
          width: calc(var(--donation-form-controller-base-font-size--) * 5);
          height: calc(var(--donation-form-controller-base-font-size--) * 3);
          overflow: hidden;
        }

        .ia-donation-form-controller-container .braintree-row {
          display: flex;
          margin-top: -1px;
        }

        .ia-donation-form-controller-container ia-donation-badged-input {
          width: 100%;
        }

        .ia-donation-form-controller-container ia-donation-badged-input.cvv {
          margin-left: -1px;
        }

        .ia-donation-form-controller-container .braintree-input {
          width: 100%;
          height: 100%;
        }

        .ia-donation-form-controller-container #braintree-error-message {
          color: var(--ia-theme-color-danger, #e51c23);
          font-size: calc(
            var(--donation-form-controller-base-font-size--) * 1.4
          );
          margin-bottom: calc(
            var(--donation-form-controller-base-font-size--) * 0.6
          );
        }

        .ia-donation-form-controller-container
          div[slot='braintree-hosted-fields'] {
          background-color: white;
        }
      </style>
    `;
  }
}
