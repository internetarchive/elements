import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import type {
  AnalyticsEvent,
  AnalyticsManagerInterface,
} from '@internetarchive/analytics-manager';
import type { ModalManagerInterface } from '@internetarchive/modal-manager';
import '@internetarchive/modal-manager';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { BraintreeEndpointManagerInterface } from './braintree/braintree-manager-interface';
import { HostingEnvironment } from './braintree/hosting-environment';
import type { IADonationFormController } from './ia-donation-form-controller';
import type { DonationRequest } from './models/donation-request';
import {
  DonationResponse,
  type SuccessResponse,
} from './models/donation-response';
import { DonationType } from './models/donation-type';
import { UpsellModalCTAMode } from './modals/ia-donation-upsell-modal-content';

import './ia-donation-form-controller';
import '@demo/story-template';

/** Braintree sandbox credentials from the old package's demo. Nothing is charged. */
const sandbox = {
  braintreeAuthToken: 'sandbox_x634jsj7_7zybks4ybp63pbmd',
  recaptchaSiteKey: '6LeTUvYUAAAAAPTvW98MaXyS8c6vxk4-9n8DI1ve',
  venmoProfileId: '1953896702662410263',
};

/**
 * Posts donations to the petabox sandbox charge endpoint, as the old demo did.
 * With Braintree's sandbox token and test card numbers nothing is charged.
 */
class DemoEndpointManager implements BraintreeEndpointManagerInterface {
  private onSuccess: (summary: string) => void;

  constructor(onSuccess: (summary: string) => void) {
    this.onSuccess = onSuccess;
  }

  async submitData(request: DonationRequest): Promise<DonationResponse> {
    const response = await fetch(
      'https://ia-petabox.archive.org/services/donations/braintree-charge.php?debug=true',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(request),
      },
    );
    return new DonationResponse(await response.json());
  }

  donationSuccessful(options: {
    successResponse: SuccessResponse;
    upsellSuccessResponse?: SuccessResponse;
  }): void {
    const { successResponse, upsellSuccessResponse } = options;
    let summary = `${successResponse.paymentProvider} ${successResponse.donationType} $${successResponse.amount}, transaction ${successResponse.transaction_id}`;
    if (upsellSuccessResponse) {
      summary += ` + monthly upsell $${upsellSuccessResponse.amount}`;
    }
    this.onSuccess(summary);
  }
}

/** Shows each analytics event in the story instead of sending it anywhere. */
class DemoAnalyticsManager implements AnalyticsManagerInterface {
  private onEvent: (description: string) => void;

  constructor(onEvent: (description: string) => void) {
    this.onEvent = onEvent;
  }

  sendPing(values: Record<string, unknown>): void {
    this.onEvent(`ping ${JSON.stringify(values)}`);
  }

  sendEvent(options: AnalyticsEvent): void {
    this.onEvent(
      `${options.category} / ${options.action} / ${options.label ?? ''}`,
    );
  }

  sendEventNoSampling(options: AnalyticsEvent): void {
    this.onEvent(
      `${options.category} / ${options.action} / ${options.label ?? ''} (unsampled)`,
    );
  }
}

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Base font size',
    cssVariable: '--ia-donation-form-base-font-size',
    defaultValue: 10,
    inputType: 'range',
    min: 8,
    max: 16,
    step: 1,
    unit: 'px',
  },
  {
    section: 'Color',
    label: 'Text',
    cssVariable: '--ia-donation-form-text-color',
    defaultValue: '#333333',
    inputType: 'color',
  },
  {
    section: 'Color',
    label: 'Step badge',
    cssVariable: '--ia-donation-form-badge-background-color',
    defaultValue: '#333333',
    inputType: 'color',
  },
  {
    section: 'Color',
    label: 'Selected option',
    cssVariable: '--ia-donation-form-selected-option-background-color',
    defaultValue: '#f9bf3b',
    inputType: 'color',
  },
  {
    section: 'Color',
    label: 'Donate button',
    cssVariable: '--ia-donation-form-donate-button-color',
    defaultValue: '#31a481',
    inputType: 'color',
  },
  {
    section: 'Color',
    label: 'Background',
    cssVariable: '--ia-donation-form-background-color',
    defaultValue: 'transparent',
    inputType: 'text',
    presets: [{ label: 'Mint', value: '#d1faed', note: 'donate page' }],
    presetsInline: true,
  },
];

const propInputSettings: PropInputSettings<IADonationFormController>[] = [
  {
    label: 'Frequency choice',
    propertyName: 'frequencySelectionMode',
    defaultValue: 'button',
    inputType: 'radio',
    radioOptions: ['button', 'checkbox'],
  },
  {
    label: 'Amount layout',
    propertyName: 'amountSelectionLayout',
    defaultValue: 'multi-line',
    inputType: 'radio',
    radioOptions: ['multi-line', 'single-line'],
  },
  {
    label: 'Donor email',
    propertyName: 'donorEmail',
    defaultValue: '',
  },
  {
    label: 'Referrer',
    propertyName: 'referrer',
    defaultValue: 'elements-demo',
  },
];

/**
 * The full form against the Braintree sandbox. Test card numbers are at
 * https://developer.paypal.com/braintree/docs/reference/general/testing;
 * 4111 1111 1111 1111 with any future expiry and any CVV goes through.
 *
 * The payment providers load their scripts from Braintree, PayPal, Google and
 * reCAPTCHA, so the story only connects to the sandbox when asked. The demo
 * page renders every story at once and shouldn't reach out to any of them on
 * its own.
 */
@customElement('ia-donation-form-controller-story')
export class IADonationFormControllerStory extends LitElement {
  @state() private sandboxConnected = false;

  @state() private lastAnalyticsEvent = '';

  @state() private lastSuccess = '';

  @query('ia-donation-form-controller')
  private controller!: IADonationFormController;

  @query('modal-manager') private modalManager!: ModalManagerInterface;

  @query('#recaptcha') private recaptchaElement!: HTMLElement;

  private endpointManager = new DemoEndpointManager((summary) => {
    this.lastSuccess = summary;
  });

  private analyticsHandler = new DemoAnalyticsManager((description) => {
    this.lastAnalyticsEvent = description;
  });

  /**
   * Light DOM: Braintree and PayPal find their containers with
   * `document.querySelector`, which can't see into a shadow root
   */
  createRenderRoot(): this {
    return this;
  }

  firstUpdated(): void {
    // The modal manager and the recaptcha container have to exist in the
    // page before the controller can wire itself to them
    this.controller.modalManager = this.modalManager;
    this.controller.recaptchaElement = this.recaptchaElement;
    this.controller.analyticsHandler = this.analyticsHandler;
  }

  render() {
    const connected = this.sandboxConnected;
    return html`
      <style>
        ia-donation-form-controller-story ia-donation-form-controller {
          display: block;
          max-width: 34rem;
        }

        ia-donation-form-controller-story #recaptcha {
          position: absolute;
          z-index: 10;
        }

        /* The modal manager covers the page whenever it is in the DOM, so
           only show it while a modal is open */
        ia-donation-form-controller-story modal-manager {
          display: none;
          --modalBottomMargin: 10px;
          --modalWidth: 320px;
        }

        ia-donation-form-controller-story modal-manager[mode='open'] {
          display: block;
        }

        ia-donation-form-controller-story .dev-tools h4 {
          margin: 0 0 0.25rem;
        }

        ia-donation-form-controller-story .dev-tools .row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        ia-donation-form-controller-story .dev-tools dl {
          margin: 0;
          display: grid;
          grid-template-columns: max-content 1fr;
          gap: 0.25rem 1rem;
        }

        ia-donation-form-controller-story .dev-tools dt {
          font-family: monospace;
        }

        ia-donation-form-controller-story .dev-tools dd {
          margin: 0;
          word-break: break-word;
        }

        ia-donation-form-controller-story .note {
          margin: 0.75rem 0 0;
          font-size: 0.85em;
          opacity: 0.8;
        }
      </style>

      <story-template
        elementTag="ia-donation-form-controller"
        elementClassName="IADonationFormController"
        importPath="ia-donation-form/ia-donation-form-controller"
        .defaultUsageProps=${`environment="dev"
  braintreeAuthToken="\${braintreeToken}"
  recaptchaSiteKey="\${recaptchaSiteKey}"
  .endpointManager=\${endpointManager}
  .modalManager=\${modalManager}
  .recaptchaElement=\${recaptchaElement}`}
        .styleInputData=${{ settings: styleInputSettings, revertable: true }}
        .propInputData=${{ settings: propInputSettings }}
      >
        <ia-donation-form-controller
          slot="demo"
          referrer="elements-demo"
          .environment=${connected ? HostingEnvironment.Development : undefined}
          .braintreeAuthToken=${connected
            ? sandbox.braintreeAuthToken
            : undefined}
          .recaptchaSiteKey=${connected ? sandbox.recaptchaSiteKey : undefined}
          .venmoProfileId=${connected ? sandbox.venmoProfileId : undefined}
          .endpointManager=${this.endpointManager}
        ></ia-donation-form-controller>

        <div slot="settings" class="dev-tools">
          <h4>Braintree sandbox</h4>
          ${connected
            ? html`
                <p class="note">
                  Connected. Nothing is charged. Test card
                  <code>4111 1111 1111 1111</code>, any future expiry, any CVV.
                </p>
                <h4>Modals</h4>
                <div class="row">
                  <button type="button" @click=${this.showUpsell}>
                    Upsell
                  </button>
                  <button type="button" @click=${this.showPayPalUpsell}>
                    PayPal upsell
                  </button>
                  <button
                    type="button"
                    @click=${() => this.showConfirmation(DonationType.OneTime)}
                  >
                    Confirm one-time
                  </button>
                  <button
                    type="button"
                    @click=${() => this.showConfirmation(DonationType.Upsell)}
                  >
                    Confirm upsell
                  </button>
                </div>
              `
            : html`
                <div class="row">
                  <button
                    type="button"
                    id="connect-sandbox"
                    @click=${() => {
                      this.sandboxConnected = true;
                    }}
                  >
                    Connect to the sandbox
                  </button>
                </div>
                <p class="note">
                  Loads the Braintree, PayPal, Google Pay and reCAPTCHA scripts
                  and turns on the payment buttons.
                </p>
              `}
          <h4>Events</h4>
          <dl>
            <dt>analytics</dt>
            <dd>${this.lastAnalyticsEvent || html`<i>none yet</i>`}</dd>
            <dt>donationSuccessful</dt>
            <dd>${this.lastSuccess || html`<i>none yet</i>`}</dd>
          </dl>
        </div>
      </story-template>

      <div id="recaptcha"></div>

      <modal-manager>
        <!-- The PayPal button can't live in a shadow root, so it's slotted from here -->
        <div slot="paypal-upsell-button">
          <div id="paypal-upsell-button"></div>
        </div>
      </modal-manager>
    `;
  }

  private showUpsell(): void {
    this.controller.showUpsellModalDev({
      oneTimeAmount: this.controller.donationInfo.amount,
      ctaMode: UpsellModalCTAMode.YesButton,
      yesSelected: (amount) => {
        this.lastSuccess = `upsell yes: $${amount}`;
        this.modalManager.closeModal();
      },
      noSelected: () => this.modalManager.closeModal(),
    });
  }

  private showPayPalUpsell(): void {
    this.controller.showUpsellModalDev({
      oneTimeAmount: this.controller.donationInfo.amount,
      ctaMode: UpsellModalCTAMode.PayPalUpsellSlot,
      noSelected: () => this.modalManager.closeModal(),
    });
  }

  private showConfirmation(donationType: DonationType): void {
    this.controller.showConfirmationStepDev({
      donationType,
      amount: donationType === DonationType.Upsell ? 8 : 33,
      currencyType: 'USD',
      cancelDonationCB: () => {
        this.lastSuccess = 'confirmation cancelled';
        this.modalManager.closeModal();
      },
      confirmDonationCB: () => {
        this.lastSuccess = 'confirmation confirmed';
        this.modalManager.closeModal();
      },
    });
  }
}
