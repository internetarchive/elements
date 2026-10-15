import { DonationType } from './donation-type';

/**
 * Everything needed to represent and calculate a donation amount.
 *
 * Given an amount and whether the donor is covering the processing fee, it
 * calculates the fee and the total, rounded to the cent. It also carries the
 * `DonationType`: one-time, monthly, or upsell.
 */
export class DonationPaymentInfo {
  donationType: DonationType;
  amount: number;
  coverFees: boolean;

  constructor(params: {
    donationType: DonationType;
    amount: number;
    coverFees: boolean;
  }) {
    this.donationType = params.donationType;
    this.amount = params.amount;
    this.coverFees = params.coverFees;
  }

  /** The fee the donor is paying on top of the amount, or 0 if they aren't covering it. */
  get feeAmountCovered(): number {
    return this.coverFees ? this.fee : 0;
  }

  /** The processing fee for this amount, whether or not the donor covers it. */
  get fee(): number {
    return DonationPaymentInfo.calculateFeeAmount(this.amount);
  }

  /** The amount charged: the donation plus the fee when the donor covers it. */
  get total(): number {
    return DonationPaymentInfo.calculateTotal(this.amount, this.coverFees);
  }

  /** The total for an amount, with the fee added when `coverFees` is set. Rounded to the cent. */
  static calculateTotal(amount: number, coverFees: boolean): number {
    const fee = coverFees ? this.calculateFeeAmount(amount) : 0;
    const total = amount + fee;
    if (isNaN(total)) return 0;
    return this.roundAmount(total);
  }

  /** The processing fee for an amount. Rounded to the cent. */
  static calculateFeeAmount(amount: number): number {
    const fee = amount * 0.0219 + 0.29;
    if (isNaN(fee)) return 0;
    return this.roundAmount(fee);
  }

  private static roundAmount(amount: number): number {
    return Math.round(amount * 100) / 100;
  }
}

/** The preset amounts the donation form offers. */
export const defaultDonationAmounts: number[] = [5, 10, 25, 50, 100, 500, 1000];

/** The amount selected when the form first renders. */
export const defaultSelectedDonationInfo: DonationPaymentInfo =
  new DonationPaymentInfo({
    donationType: DonationType.OneTime,
    amount: 10,
    coverFees: false,
  });
