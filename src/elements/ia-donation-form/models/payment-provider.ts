/** The payment methods the donation form offers. The values are what the backend expects. */
export const PaymentProvider = {
  CreditCard: 'Credit Card',
  PayPal: 'PayPal',
  GooglePay: 'Google Pay',
  Venmo: 'Venmo',
  ApplePay: 'Apple Pay',
} as const;

export type PaymentProvider =
  (typeof PaymentProvider)[keyof typeof PaymentProvider];
