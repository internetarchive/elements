import { describe, it, expect } from 'vitest';
import { StringParser } from './string';

describe('StringParser', () => {
  it('can parse strings', async () => {
    const parser = new StringParser();
    const response = parser.parseValue('3');
    expect(response).toBe('3');
  });
});
