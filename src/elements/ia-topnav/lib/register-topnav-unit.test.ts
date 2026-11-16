import { describe, expect, test } from 'vitest';

import {
  applyTopnavUnitFallback,
  registerTopnavUnit,
} from './register-topnav-unit';

describe('register-topnav-unit', () => {
  test('registerTopnavUnit can run more than once', () => {
    expect(registerTopnavUnit()).toBe(true);
    expect(registerTopnavUnit()).toBe(true);
  });

  test('applyTopnavUnitFallback, kept for consumers that still call it, leaves the host alone', () => {
    const host = document.createElement('div');
    applyTopnavUnitFallback(host);
    expect(host.style.getPropertyValue('--topnavUnit--')).toBe('');
  });
});
