import { describe, expect, test } from 'vitest';

import {
  DonationPaymentInfo,
  defaultDonationAmounts,
  defaultSelectedDonationInfo,
} from './donation-payment-info';
import { DonationType } from './donation-type';

/**
 * A second, independent calculation of the fee so the tests aren't checking
 * the class against itself.
 */
function calculateFee(amount: number): number {
  return Math.round((amount * 0.0219 + 0.29) * 100) / 100;
}

describe('DonationPaymentInfo', () => {
  test('calculates the proper total for no fees covered', () => {
    const donationInfo = new DonationPaymentInfo({
      donationType: DonationType.OneTime,
      amount: 3.5,
      coverFees: false,
    });

    expect(donationInfo.total).to.equal(3.5);
  });

  test('calculates the proper total for fees coverage', () => {
    const baseAmount = 3.5;
    const expectedFee = calculateFee(baseAmount);
    const expectedTotal = Math.round((baseAmount + expectedFee) * 100) / 100;

    const donationInfo = new DonationPaymentInfo({
      donationType: DonationType.OneTime,
      amount: baseAmount,
      coverFees: true,
    });

    expect(donationInfo.total).to.equal(expectedTotal);
  });

  test('calculates the proper expected fees from manual calculations', () => {
    const donationInfo = new DonationPaymentInfo({
      donationType: DonationType.OneTime,
      amount: 5,
      coverFees: true,
    });
    expect(donationInfo.fee).to.equal(0.4);
    expect(donationInfo.total).to.equal(5.4);

    donationInfo.amount = 3.5;
    expect(donationInfo.fee).to.equal(0.37);
    expect(donationInfo.total).to.equal(3.87);
  });

  test('calculates the proper expected fees', () => {
    const baseAmount = 3.23;
    const expectedFee = calculateFee(baseAmount);
    const calculatedFee = DonationPaymentInfo.calculateFeeAmount(baseAmount);
    expect(calculatedFee).to.equal(expectedFee);
  });

  test('gets the proper fee amount covered when covering fees', () => {
    const baseAmount = 4.12;
    const expectedFee = calculateFee(baseAmount);
    const donationInfo = new DonationPaymentInfo({
      donationType: DonationType.OneTime,
      amount: baseAmount,
      coverFees: true,
    });

    expect(donationInfo.feeAmountCovered).to.equal(expectedFee);
  });

  test('gets the proper fee amount covered when not covering fees', () => {
    const donationInfo = new DonationPaymentInfo({
      donationType: DonationType.OneTime,
      amount: 4.12,
      coverFees: false,
    });

    expect(donationInfo.feeAmountCovered).to.equal(0);
  });

  test('calculates the proper expected total', () => {
    const baseAmount = 3.29;
    const expectedFee = calculateFee(baseAmount);
    const expectedTotal = Math.round((baseAmount + expectedFee) * 100) / 100;
    const calculatedTotal = DonationPaymentInfo.calculateTotal(
      baseAmount,
      true,
    );
    expect(calculatedTotal).to.equal(expectedTotal);
  });

  test('returns 0 during the amount calculation if the amount is NaN', () => {
    const result = DonationPaymentInfo.calculateTotal(
      'a' as unknown as number,
      false,
    );
    expect(result).to.equal(0);
  });

  test('returns 0 during the fee calculation if the amount is NaN', () => {
    const result = DonationPaymentInfo.calculateFeeAmount(
      'a' as unknown as number,
    );
    expect(result).to.equal(0);
  });

  test('offers the standard preset amounts', () => {
    expect(defaultDonationAmounts).to.deep.equal([
      5, 10, 25, 50, 100, 500, 1000,
    ]);
  });

  test('starts on a $10 one-time gift without covering fees', () => {
    expect(defaultSelectedDonationInfo.donationType).to.equal(
      DonationType.OneTime,
    );
    expect(defaultSelectedDonationInfo.amount).to.equal(10);
    expect(defaultSelectedDonationInfo.coverFees).to.be.false;
    expect(defaultSelectedDonationInfo.total).to.equal(10);
  });
});
