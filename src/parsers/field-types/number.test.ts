import { describe, expect, test } from 'vitest';

import { NumberParser } from './number';

describe('NumberParser', () => {
  test('can parse int strings', () => {
    const parser = new NumberParser();
    const response = parser.parseValue('3');
    expect(response).toBe(3);
  });

  test('can parse float strings', () => {
    const parser = new NumberParser();
    const response = parser.parseValue('3.14');
    expect(response).toBe(3.14);
  });

  test('returns undefined if the number is not a number', () => {
    const parser = new NumberParser();
    const response = parser.parseValue('qab');
    expect(response).toBeUndefined();
  });

  test('returns the number if a number is passed', () => {
    const parser = new NumberParser();
    const response = parser.parseValue(5.67);
    expect(response).toBe(5.67);
  });

  test('returns undefined if a boolean is passed in', () => {
    const parser = new NumberParser();
    const response = parser.parseValue(true);
    expect(response).toBeUndefined();
  });
});
