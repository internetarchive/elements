/** An error raised by the donation form itself, as opposed to one from a payment library. */
export class DonationFormError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DonationFormError';
  }
}
