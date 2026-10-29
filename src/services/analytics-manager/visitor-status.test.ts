import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FIRST_VISIT_STORAGE_KEY, getVisitorStatus } from './visitor-status';

describe('getVisitorStatus', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it('is new on the first visit and stores today', () => {
    const now = new Date(2026, 9, 29, 15, 30);
    expect(getVisitorStatus(now)).toBe('new');
    expect(window.localStorage.getItem(FIRST_VISIT_STORAGE_KEY)).toBe(
      '2026-10-29',
    );
  });

  it('is new on a later visit the same day', () => {
    getVisitorStatus(new Date(2026, 9, 29, 9, 0));
    expect(getVisitorStatus(new Date(2026, 9, 29, 23, 59))).toBe('new');
  });

  it('is returning once the stored date is before today', () => {
    window.localStorage.setItem(FIRST_VISIT_STORAGE_KEY, '2026-10-28');
    expect(getVisitorStatus(new Date(2026, 9, 29, 0, 1))).toBe('returning');
  });

  it('does not overwrite the first visit date', () => {
    window.localStorage.setItem(FIRST_VISIT_STORAGE_KEY, '2026-10-01');
    getVisitorStatus(new Date(2026, 9, 29));
    expect(window.localStorage.getItem(FIRST_VISIT_STORAGE_KEY)).toBe(
      '2026-10-01',
    );
  });

  it('treats an unreadable stored value as a first visit', () => {
    window.localStorage.setItem(FIRST_VISIT_STORAGE_KEY, 'garbage');
    expect(getVisitorStatus(new Date(2026, 9, 29))).toBe('new');
    expect(window.localStorage.getItem(FIRST_VISIT_STORAGE_KEY)).toBe(
      '2026-10-29',
    );
  });

  it('returns undefined when reading storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('blocked', 'SecurityError');
    });
    expect(getVisitorStatus()).toBeUndefined();
  });

  it('returns undefined when writing storage throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('full', 'QuotaExceededError');
    });
    expect(getVisitorStatus()).toBeUndefined();
  });
});
