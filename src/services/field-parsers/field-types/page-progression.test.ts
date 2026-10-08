import { describe, it, expect } from 'vitest';
import { PageProgressionParser } from './page-progression';

describe('PageProgressionParser', () => {
  it('can parse page progression', async () => {
    const parser = new PageProgressionParser();
    expect(parser.parseValue('rl')).toBe('rl');
    expect(parser.parseValue('lr')).toBe('lr');
  });

  it('returns undefined for number values', async () => {
    const parser = new PageProgressionParser();
    const response = parser.parseValue(15);
    expect(response).toBeUndefined();
  });

  it('returns undefined for boolean values', async () => {
    const parser = new PageProgressionParser();
    const response = parser.parseValue(true);
    expect(response).toBeUndefined();
  });
});
