import type * as braintree from 'braintree-web';
import { PromisedSingleton } from '@internetarchive/promised-singleton';
import { createNanoEvents, type Unsubscribe } from 'nanoevents';

import { DonationFormError } from '../../../donation-form-error';
import type { BraintreeManagerInterface } from '../../braintree-manager-interface';
import type {
  CreditCardHandlerEvents,
  CreditCardHandlerInterface,
} from './credit-card-interface';
import type { HostedFieldConfiguration } from './hosted-field-configuration';
import type { HostedFieldName } from './hosted-field-container';

/** A promise that never settles, for a race branch that should be decided elsewhere. */
const never = new Promise<never>(() => {});

export class CreditCardHandler implements CreditCardHandlerInterface {
  on<E extends keyof CreditCardHandlerEvents>(
    event: E,
    callback: CreditCardHandlerEvents[E],
  ): Unsubscribe {
    return this.emitter.on(event, callback);
  }

  instance = new PromisedSingleton<braintree.HostedFields | undefined>({
    generator: async () => {
      const braintreeClient = await this.braintreeManager.instance.get();
      return this.createHostedFields(braintreeClient);
    },
  });

  private emitter = createNanoEvents<CreditCardHandlerEvents>();

  private maxRetryCount: number;

  /** In milliseconds */
  private loadTimeout: number;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface;
    hostedFieldClient: typeof braintree.hostedFields;
    hostedFieldConfig: HostedFieldConfiguration;
    maxRetryCount?: number;
    /** In seconds */
    loadTimeout?: number;
  }) {
    this.braintreeManager = options.braintreeManager;
    this.hostedFieldClient = options.hostedFieldClient;
    this.hostedFieldConfig = options.hostedFieldConfig;
    this.maxRetryCount = options.maxRetryCount ?? 2;
    this.loadTimeout = (options.loadTimeout ?? 6) * 1000;
  }

  private braintreeManager: BraintreeManagerInterface;
  private hostedFieldClient: typeof braintree.hostedFields;
  private hostedFieldConfig: HostedFieldConfiguration;

  /**
   * Creates the hosted fields, retrying on a timeout.
   *
   * Braintree's own timeout is 60 seconds, but their support recommends a
   * shorter one: 99% of donors load the fields within 4 seconds and 99.9%
   * within 18. So this races the create against its own timer, and a timer
   * win throws into the retry path.
   */
  private async createHostedFields(
    braintreeClient: braintree.Client,
    retryCount = 0,
  ): Promise<braintree.HostedFields | undefined> {
    // Mainly for the retries, but harmless on the first try
    this.hostedFieldConfig.hostedFieldContainer.resetHostedFields();
    let timeout: number | undefined;
    try {
      const timeoutPromise = new Promise<never>((_resolve, reject) => {
        timeout = window.setTimeout(() => {
          reject(new DonationFormError('Timeout loading Hosted Fields'));
        }, this.loadTimeout);
      });

      // Starts from a resolved promise so a synchronous throw from `create`
      // becomes a rejection like any other failure.
      const hostedFieldsPromise = Promise.resolve()
        .then(() =>
          this.hostedFieldClient.create({
            client: braintreeClient,
            styles: this.hostedFieldConfig.hostedFieldStyle,
            fields: this.hostedFieldConfig.hostedFieldFieldOptions,
          }),
        )
        .catch((error: unknown) => {
          if (
            error instanceof Error &&
            error.message.includes('Hosted Fields timed out')
          ) {
            // Braintree's own timeout, which the timer above has already
            // turned into a retry. Nothing more to do with it.
            return never;
          }
          // Anything else is a real failure, which should reach Sentry
          throw error;
        });
      // If the timer wins the race, a later rejection here has nowhere to go
      hostedFieldsPromise.catch(() => undefined);

      return await Promise.race([timeoutPromise, hostedFieldsPromise]);
    } catch (error) {
      if (retryCount >= this.maxRetryCount) {
        this.emitter.emit('hostedFieldsFailed', error);
        throw error;
      }
      const newRetryCount = retryCount + 1;
      this.emitter.emit('hostedFieldsRetry', newRetryCount);
      return this.createHostedFields(braintreeClient, newRetryCount);
    } finally {
      // Whichever way it went, the timer must not fire afterwards
      window.clearTimeout(timeout);
    }
  }

  async tokenizeHostedFields(): Promise<
    braintree.HostedFieldsTokenizePayload | undefined
  > {
    const hostedFields = await this.instance.get();
    return hostedFields?.tokenize();
  }

  markFieldErrors(fields: HostedFieldName[]): void {
    this.hostedFieldConfig.hostedFieldContainer.markFieldErrors(fields);
  }

  removeFieldErrors(fields: HostedFieldName[]): void {
    this.hostedFieldConfig.hostedFieldContainer.removeFieldErrors(fields);
  }

  showErrorMessage(message?: string): void {
    this.hostedFieldConfig.hostedFieldContainer.showErrorMessage(message);
  }

  hideErrorMessage(): void {
    this.hostedFieldConfig.hostedFieldContainer.hideErrorMessage();
  }
}
