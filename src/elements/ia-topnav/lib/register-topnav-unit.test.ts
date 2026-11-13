import { describe, expect, test } from 'vitest';

import {
  applyTopnavUnitFallback,
  registerTopnavUnit,
} from './register-topnav-unit';

describe('register-topnav-unit, kept for consumers that still import it', () => {
  test('registerTopnavUnit reports the unit as active', () => {
    expect(registerTopnavUnit()).toBe(true);
  });

  test('applyTopnavUnitFallback leaves the host alone', () => {
    const host = document.createElement('div');
    applyTopnavUnitFallback(host);
    expect(host.style.getPropertyValue('--topnavUnit--')).toBe('');
  });
});
