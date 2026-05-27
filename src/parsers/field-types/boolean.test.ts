import { describe, expect, test } from 'vitest';

import { BooleanParser } from './boolean';

describe('BooleanParser', () => {
  test('can parse string number truthy', () => {
    const parser = new BooleanParser();
    const response = parser.parseValue('1');
    expect(response).toBe(true);
  });

  test('can parse string number falsy', () => {
    const parser = new BooleanParser();
    const response = parser.parseValue('0');
    expect(response).toBe(false);
  });

  test('can parse words truthy', () => {
    const parser = new BooleanParser();
    const response = parser.parseValue('true');
    expect(response).toBe(true);
  });

  test('can parse words falsy', () => {
    const parser = new BooleanParser();
    const response = parser.parseValue('false');
    expect(response).toBe(false);
  });

  test('can parse date truthy', () => {
    const parser = new BooleanParser();
    const response = parser.parseValue(Date());
    expect(response).toBe(true);
  });
});
