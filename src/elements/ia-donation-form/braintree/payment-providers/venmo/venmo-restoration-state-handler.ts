import type { DonationPaymentInfo } from '../../../models/donation-payment-info';
import type { DonorContactInfo } from '../../../models/donor-contact-info';

export interface VenmoRestorationStateHandlerInterface {
  /** Persist the session state */
  persistState(
    contactInfo: DonorContactInfo,
    donationInfo: DonationPaymentInfo,
  ): void;

  /** Get the session restoration state */
  getRestorationState(): Promise<VenmoRestorationState | undefined>;

  /** Clear the restoration state */
  clearState(): void;
}

/** What gets stored while the donor is off in the Venmo app. */
export class VenmoRestorationState {
  contactInfo: DonorContactInfo;
  donationInfo: DonationPaymentInfo;

  constructor(params: {
    contactInfo: DonorContactInfo;
    donationInfo: DonationPaymentInfo;
  }) {
    this.contactInfo = params.contactInfo;
    this.donationInfo = params.donationInfo;
  }
}

/**
 * Persists and restores a Venmo checkout session.
 *
 * Venmo takes the donor out of the browser into its app to authorize the
 * payment, then redirects back to the site, possibly in a new tab, which is
 * effectively a new session. So the contact and donation info is written to
 * storage when the Venmo flow starts and read back when it resumes.
 */
export class VenmoRestorationStateHandler
  implements VenmoRestorationStateHandlerInterface
{
  private persistenceKey = 'venmoRestorationStateInfo';

  private storageSystem?: Storage;

  constructor(options?: { storageSystem?: Storage }) {
    if (options?.storageSystem) {
      this.storageSystem = options.storageSystem;
    } else if (this.storageSystemAvailable(localStorage)) {
      this.storageSystem = localStorage;
    } else if (this.storageSystemAvailable(sessionStorage)) {
      this.storageSystem = sessionStorage;
    }
  }

  clearState(): void {
    this.storageSystem?.removeItem(this.persistenceKey);
  }

  persistState(
    contactInfo: DonorContactInfo,
    donationInfo: DonationPaymentInfo,
  ): void {
    const venmoRestoration = new VenmoRestorationState({
      contactInfo,
      donationInfo,
    });
    const serialized = JSON.stringify(venmoRestoration);
    this.storageSystem?.setItem(this.persistenceKey, serialized);
  }

  async getRestorationState(): Promise<VenmoRestorationState | undefined> {
    const stored = this.storageSystem?.getItem(this.persistenceKey);
    if (!stored) {
      console.error('restoreState: No stored data');
      return undefined;
    }

    const deserialized = JSON.parse(stored);
    if (!deserialized) {
      console.error('restoreState: Data could not be deserialized');
      return undefined;
    }

    return new VenmoRestorationState(deserialized);
  }

  /** Whether a storage system (localStorage or sessionStorage) can be written to */
  private storageSystemAvailable(system: Storage): boolean {
    try {
      system.setItem('foo', 'bar');
      system.removeItem('foo');
      return true;
    } catch {
      return false;
    }
  }
}
