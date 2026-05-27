import { describe, expect, test } from 'vitest';

import { BooleanField } from './boolean';

describe('Boolean Field', () => {
  test('can parse true boolean value', () => {
    const booleanField = new BooleanField(true);

    expect(booleanField.value).toBe(true);
    expect(booleanField.values).toEqual([true]);
    expect(booleanField.rawValue).toBe(true);
  });

  test('can parse false boolean value', () => {
    const booleanField = new BooleanField(false);

    expect(booleanField.value).toBe(false);
    expect(booleanField.values).toEqual([false]);
    expect(booleanField.rawValue).toBe(false);
  });

  test('parses truthy values to true', () => {
    const booleanField = new BooleanField('boop');

    expect(booleanField.value).toBe(true);
    expect(booleanField.values).toEqual([true]);
    expect(booleanField.rawValue).toBe('boop');
  });

  test('parses falsy values to false', () => {
    const booleanField = new BooleanField(0);

    expect(booleanField.value).toBe(false);
    expect(booleanField.values).toEqual([false]);
    expect(booleanField.rawValue).toBe(0);
  });

  test('parses false string to false', () => {
    const booleanField = new BooleanField('false');

    expect(booleanField.value).toBe(false);
    expect(booleanField.values).toEqual([false]);
    expect(booleanField.rawValue).toBe('false');
  });

  test('parses true string to true', () => {
    const booleanField = new BooleanField('true');

    expect(booleanField.value).toBe(true);
    expect(booleanField.values).toEqual([true]);
    expect(booleanField.rawValue).toBe('true');
  });

  test('parses array of strings properly', () => {
    const booleanField = new BooleanField(['true', 'false', 'true']);

    expect(booleanField.value).toBe(true);
    expect(booleanField.values).toEqual([true, false, true]);
    expect(booleanField.rawValue).toEqual(['true', 'false', 'true']);
  });

  test('parses array of booleans properly', () => {
    const booleanField = new BooleanField([true, false, true]);

    expect(booleanField.value).toBe(true);
    expect(booleanField.values).toEqual([true, false, true]);
    expect(booleanField.rawValue).toEqual([true, false, true]);
  });
});
