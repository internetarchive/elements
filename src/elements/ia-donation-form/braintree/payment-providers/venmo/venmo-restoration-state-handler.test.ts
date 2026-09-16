import { describe, expect, test } from 'vitest';

import { DonorContactInfo } from '../../../models/donor-contact-info';
import {
  fiveDollars,
  mockBillingInfo,
  mockCustomerInfo,
} from '../../test-helpers/mock-models.test-helpers';
import { VenmoRestorationStateHandler } from './venmo-restoration-state-handler';

/** An in-memory Storage so tests don't touch the real localStorage. */
class MemoryStorage implements Storage {
  private items = new Map<string, string>();

  get length(): number {
    return this.items.size;
  }

  clear(): void {
    this.items.clear();
  }

  getItem(key: string): string | null {
    return this.items.get(key) ?? null;
  }

  key(index: number): string | null {
    return Array.from(this.items.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.items.delete(key);
  }

  setItem(key: string, value: string): void {
    this.items.set(key, value);
  }
}

const contactInfo = new DonorContactInfo({
  customer: mockCustomerInfo,
  billing: mockBillingInfo,
});

describe('VenmoRestorationStateHandler', () => {
  test('persists and restores the donor and donation info', async () => {
    const storage = new MemoryStorage();
    const handler = new VenmoRestorationStateHandler({
      storageSystem: storage,
    });

    handler.persistState(contactInfo, fiveDollars());
    const restored = await handler.getRestorationState();

    expect(restored?.donationInfo.amount).to.equal(5);
    expect(restored?.contactInfo.customer.email).to.equal('foo@bar.com');
    expect(restored?.contactInfo.billing.postalCode).to.equal('12345');
  });

  test('survives a new page load, reading back from the same storage', async () => {
    const storage = new MemoryStorage();
    new VenmoRestorationStateHandler({ storageSystem: storage }).persistState(
      contactInfo,
      fiveDollars(),
    );

    const later = new VenmoRestorationStateHandler({ storageSystem: storage });
    const restored = await later.getRestorationState();

    expect(restored?.donationInfo.amount).to.equal(5);
  });

  test('returns nothing once the state is cleared', async () => {
    const storage = new MemoryStorage();
    const handler = new VenmoRestorationStateHandler({
      storageSystem: storage,
    });
    handler.persistState(contactInfo, fiveDollars());

    handler.clearState();

    expect(await handler.getRestorationState()).to.be.undefined;
    expect(storage.length).to.equal(0);
  });

  test('returns nothing when nothing was stored', async () => {
    const handler = new VenmoRestorationStateHandler({
      storageSystem: new MemoryStorage(),
    });

    expect(await handler.getRestorationState()).to.be.undefined;
  });

  test('falls back to localStorage when no storage is given', async () => {
    const handler = new VenmoRestorationStateHandler();
    handler.persistState(contactInfo, fiveDollars());

    expect(localStorage.getItem('venmoRestorationStateInfo')).to.not.be.null;

    handler.clearState();
    expect(localStorage.getItem('venmoRestorationStateInfo')).to.be.null;
  });
});
