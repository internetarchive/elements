import { describe, expect, test } from 'vitest';

import { PageProgressionParser } from './page-progression';

describe('PageProgressionParser', () => {
  test('can parse page progression', () => {
    const parser = new PageProgressionParser();
    expect(parser.parseValue('rl')).toBe('rl');
    expect(parser.parseValue('lr')).toBe('lr');
  });

  test('returns undefined for number values', () => {
    const parser = new PageProgressionParser();
    const response = parser.parseValue(15);
    expect(response).toBeUndefined();
  });

  test('returns undefined for boolean values', () => {
    const parser = new PageProgressionParser();
    const response = parser.parseValue(true);
    expect(response).toBeUndefined();
  });
});
