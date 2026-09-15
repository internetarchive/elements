/** The three hosted credit card fields. The values are Braintree's field names. */
export const HostedFieldName = {
  Number: 'number',
  CVV: 'cvv',
  ExpirationDate: 'expirationDate',
} as const;

export type HostedFieldName =
  (typeof HostedFieldName)[keyof typeof HostedFieldName];

/**
 * An element that can show an error state, like the form's badged input. The
 * hosted field containers sit inside one.
 */
interface ErrorMarkable extends HTMLElement {
  error: boolean;
}

export interface HostedFieldContainerInterface {
  fieldFor(field: HostedFieldName): HTMLDivElement;
  markFieldErrors(fields: HostedFieldName[]): void;
  removeFieldErrors(fields: HostedFieldName[]): void;
  showErrorMessage(message?: string): void;
  hideErrorMessage(): void;
  /** Empty the hosted field containers so they can be re-rendered after a timeout */
  resetHostedFields(): void;
}

/**
 * Holds the DOM containers Braintree renders its hosted fields into, and
 * toggles their error state. Each container's parent is the badged input
 * wrapping it, which is what shows the error.
 */
export class HostedFieldContainer implements HostedFieldContainerInterface {
  private number: HTMLDivElement;

  private cvv: HTMLDivElement;

  private expirationDate: HTMLDivElement;

  private errorContainer: HTMLDivElement;

  fieldFor(field: HostedFieldName): HTMLDivElement {
    switch (field) {
      case HostedFieldName.Number:
        return this.number;
      case HostedFieldName.CVV:
        return this.cvv;
      case HostedFieldName.ExpirationDate:
        return this.expirationDate;
    }
  }

  markFieldErrors(fields: HostedFieldName[]): void {
    fields.forEach((field) => {
      const input = this.fieldFor(field);
      (input.parentElement as ErrorMarkable).error = true;
    });
  }

  removeFieldErrors(fields: HostedFieldName[]): void {
    fields.forEach((field) => {
      const input = this.fieldFor(field);
      (input.parentElement as ErrorMarkable).error = false;
    });
  }

  showErrorMessage(message?: string): void {
    const error =
      message ?? 'Some payment information below is missing or incorrect.';
    this.errorContainer.textContent = error;
    this.errorContainer.style.display = 'block';
  }

  hideErrorMessage(): void {
    this.errorContainer.style.display = 'none';
  }

  resetHostedFields(): void {
    const elements = [this.number, this.cvv, this.expirationDate];
    elements.forEach((element) => {
      while (element.firstChild) {
        element.firstChild.remove();
      }
    });
  }

  constructor(options: {
    number: HTMLDivElement;
    cvv: HTMLDivElement;
    expirationDate: HTMLDivElement;
    errorContainer: HTMLDivElement;
  }) {
    this.number = options.number;
    this.cvv = options.cvv;
    this.expirationDate = options.expirationDate;
    this.errorContainer = options.errorContainer;
  }
}
