import { describe, expect, test } from 'vitest';

import { StringParser } from './string';

describe('StringParser', () => {
  test('can parse strings', () => {
    const parser = new StringParser();
    const response = parser.parseValue('3');
    expect(response).toBe('3');
  });
});
