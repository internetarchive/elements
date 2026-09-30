/** How often the donor is charged. `Upsell` is the monthly offer made after a one-time gift. */
export const DonationType = {
  OneTime: 'one-time',
  Monthly: 'monthly',
  Upsell: 'up_sell',
} as const;

export type DonationType = (typeof DonationType)[keyof typeof DonationType];
