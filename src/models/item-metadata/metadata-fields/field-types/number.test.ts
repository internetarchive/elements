import { describe, expect, test } from 'vitest';

import { NumberField } from './number';

describe('Number Field', () => {
  test('can parse number value', () => {
    const field = new NumberField(1);

    expect(field.value).toBe(1);
    expect(field.values).toEqual([1]);
    expect(field.rawValue).toBe(1);
  });

  test('can parse string value', () => {
    const field = new NumberField('1');

    expect(field.value).toBe(1);
    expect(field.values).toEqual([1]);
    expect(field.rawValue).toBe('1');
  });

  test('can parse decimal value string', () => {
    const field = new NumberField('1.23');

    expect(field.value).toBe(1.23);
    expect(field.values).toEqual([1.23]);
    expect(field.rawValue).toBe('1.23');
  });

  test('can parse decimal value number', () => {
    const field = new NumberField(1.23);

    expect(field.value).toBe(1.23);
    expect(field.values).toEqual([1.23]);
    expect(field.rawValue).toBe(1.23);
  });

  test('parses boolean false', () => {
    const field = new NumberField(false);

    expect(field.value).toBeUndefined();
    expect(field.values).toEqual([]);
    expect(field.rawValue).toBe(false);
  });

  test('parses non-numbers as undefined', () => {
    const field = new NumberField('boop');

    expect(field.value).toBeUndefined();
    expect(field.values).toEqual([]);
    expect(field.rawValue).toBe('boop');
  });

  test('parses array of strings properly', () => {
    const field = new NumberField(['1', '2', '3']);

    expect(field.value).toBe(1);
    expect(field.values).toEqual([1, 2, 3]);
    expect(field.rawValue).toEqual(['1', '2', '3']);
  });

  test('parses array of numbers properly', () => {
    const field = new NumberField([1, 2, 3]);

    expect(field.value).toBe(1);
    expect(field.values).toEqual([1, 2, 3]);
    expect(field.rawValue).toEqual([1, 2, 3]);
  });
});
