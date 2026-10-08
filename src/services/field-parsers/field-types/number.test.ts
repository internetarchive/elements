import { describe, it, expect } from 'vitest';
import { NumberParser } from './number';

describe('NumberParser', () => {
  it('can parse int strings', async () => {
    const parser = new NumberParser();
    const response = parser.parseValue('3');
    expect(response).toBe(3);
  });

  it('can parse float strings', async () => {
    const parser = new NumberParser();
    const response = parser.parseValue('3.14');
    expect(response).toBe(3.14);
  });

  it('returns undefined if the number is not a number', async () => {
    const parser = new NumberParser();
    const response = parser.parseValue('qab');
    expect(response).toBeUndefined();
  });

  it('returns the number if a number is passed', async () => {
    const parser = new NumberParser();
    const response = parser.parseValue(5.67);
    expect(response).toBe(5.67);
  });

  it('returns undefined if a boolean is passed in', async () => {
    const parser = new NumberParser();
    const response = parser.parseValue(true);
    expect(response).toBeUndefined();
  });
});
