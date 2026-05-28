import { describe, expect, test } from 'vitest';

import { ByteField } from './byte';

describe('ByteField Field', () => {
  test('can parse a byte from a string', () => {
    const field = new ByteField('123');

    expect(field.value).toBe(123);
    expect(field.values).toEqual([123]);
    expect(field.rawValue).toBe('123');
  });

  test('can parse a byte from a number', () => {
    const field = new ByteField(123);

    expect(field.value).toBe(123);
    expect(field.values).toEqual([123]);
    expect(field.rawValue).toBe(123);
  });
});
