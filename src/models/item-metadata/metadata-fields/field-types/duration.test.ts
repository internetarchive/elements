import { describe, expect, test } from 'vitest';

import { DurationField } from './duration';

describe('DurationField', () => {
  test('can parse a seconds duration from a string', () => {
    const field = new DurationField('123.5');

    expect(field.value).toBe(123.5);
    expect(field.values).toEqual([123.5]);
    expect(field.rawValue).toBe('123.5');
  });

  test('can parse a seconds duration from a number', () => {
    const field = new DurationField(123.5);

    expect(field.value).toBe(123.5);
    expect(field.values).toEqual([123.5]);
    expect(field.rawValue).toBe(123.5);
  });

  test('can parse a hh:mm:ss duration', () => {
    const field = new DurationField('1:23:45');

    expect(field.value).toBe(5025);
    expect(field.values).toEqual([5025]);
    expect(field.rawValue).toBe('1:23:45');
  });

  test('can parse a mm:ss duration', () => {
    const field = new DurationField('1:23');

    expect(field.value).toBe(83);
    expect(field.values).toEqual([83]);
    expect(field.rawValue).toBe('1:23');
  });
});
