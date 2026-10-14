import type * as paypal from 'paypal-checkout-components';

import type {
  PayPalButtonDataSourceDelegate,
  PayPalButtonDataSourceInterface,
} from '../payment-providers/paypal/paypal-button-datasource';

export class MockPayPalButtonDataSourceDelegate
  implements PayPalButtonDataSourceDelegate
{
  paymentStartedResults: {
    called: boolean;
    datasource?: PayPalButtonDataSourceInterface;
    options?: object;
  } = { called: false };

  paymentAuthorizedResults: {
    called: boolean;
    datasource?: PayPalButtonDataSourceInterface;
    payload?: paypal.TokenizePayload;
  } = { called: false };

  paymentConfirmedResults: {
    called: boolean;
    payload?: paypal.TokenizePayload;
  } = { called: false };

  paymentCancelledResults: {
    called: boolean;
    datasource?: PayPalButtonDataSourceInterface;
    data?: object;
  } = { called: false };

  paymentErrorResults: {
    called: boolean;
    datasource?: PayPalButtonDataSourceInterface;
    error?: string;
  } = { called: false };

  async payPalPaymentStarted(
    dataSource: PayPalButtonDataSourceInterface,
    options: object,
  ): Promise<void> {
    this.paymentStartedResults = {
      called: true,
      datasource: dataSource,
      options,
    };
  }

  async payPalPaymentAuthorized(
    dataSource: PayPalButtonDataSourceInterface,
    payload: paypal.TokenizePayload,
  ): Promise<void> {
    this.paymentAuthorizedResults = {
      called: true,
      datasource: dataSource,
      payload,
    };
  }

  async payPalPaymentConfirmed(
    _dataSource: PayPalButtonDataSourceInterface,
    payload: paypal.TokenizePayload,
  ): Promise<void> {
    this.paymentConfirmedResults = { called: true, payload };
  }

  async payPalPaymentCancelled(
    dataSource: PayPalButtonDataSourceInterface,
    data: object,
  ): Promise<void> {
    this.paymentCancelledResults = {
      called: true,
      datasource: dataSource,
      data,
    };
  }

  async payPalPaymentError(
    dataSource: PayPalButtonDataSourceInterface,
    error: string,
  ): Promise<void> {
    this.paymentErrorResults = { called: true, datasource: dataSource, error };
  }
}
