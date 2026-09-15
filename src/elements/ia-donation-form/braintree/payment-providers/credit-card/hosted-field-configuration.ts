import type * as braintree from 'braintree-web';

import type { HostedFieldContainerInterface } from './hosted-field-container';

/** Everything Braintree needs to render its hosted credit card fields into the form. */
export class HostedFieldConfiguration {
  hostedFieldStyle: Record<string, Record<string, string>>;

  hostedFieldFieldOptions: braintree.HostedFieldFieldOptions;

  hostedFieldContainer: HostedFieldContainerInterface;

  constructor(options: {
    hostedFieldStyle: Record<string, Record<string, string>>;
    hostedFieldFieldOptions: braintree.HostedFieldFieldOptions;
    hostedFieldContainer: HostedFieldContainerInterface;
  }) {
    this.hostedFieldFieldOptions = options.hostedFieldFieldOptions;
    this.hostedFieldStyle = options.hostedFieldStyle;
    this.hostedFieldContainer = options.hostedFieldContainer;
  }
}
