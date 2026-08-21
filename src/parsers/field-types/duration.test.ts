import { describe, expect, test } from 'vitest';

import { DurationParser } from './duration';

describe('DurationParser', () => {
  test('can parse mm:ss format', () => {
    const parser = new DurationParser();
    const response = parser.parseValue('45:23');
    const expected = 23 + 45 * 60;
    expect(response).toBe(expected);
  });

  test('can parse hh:mm:ss format', () => {
    const parser = new DurationParser();
    const response = parser.parseValue('3:45:23');
    const expected = 23 + 45 * 60 + 3 * 60 * 60;
    expect(response).toBe(expected);
  });

  test('returns undefined for a non-number component in hh:mm:ss format', () => {
    const parser = new DurationParser();
    const response = parser.parseValue('3:AB:23');
    expect(response).toBeUndefined();
  });

  test('can parse decimal format', () => {
    const parser = new DurationParser();
    const response = parser.parseValue('345.23');
    expect(response).toBe(345.23);
  });

  test('returns undefined for non-numeric numbers', () => {
    const parser = new DurationParser();
    const response = parser.parseValue('abc.de');
    expect(response).toBeUndefined();
  });

  test('returns the number if passed a number', () => {
    const parser = new DurationParser();
    const response = parser.parseValue(345.23);
    expect(response).toBe(345.23);
  });

  test('returns undefined if passed a boolean', () => {
    const parser = new DurationParser();
    const response = parser.parseValue(true);
    expect(response).toBeUndefined();
  });
});
