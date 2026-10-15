import { describe, it, expect } from 'vitest';
import { DurationParser } from './duration';

describe('DurationParser', () => {
  it('can parse mm:ss format', async () => {
    const parser = new DurationParser();
    const response = parser.parseValue('45:23');
    const expected = 23 + 45 * 60;
    expect(response).toBe(expected);
  });

  it('can parse hh:mm:ss format', async () => {
    const parser = new DurationParser();
    const response = parser.parseValue('3:45:23');
    const expected = 23 + 45 * 60 + 3 * 60 * 60;
    expect(response).toBe(expected);
  });

  it('returns 0 for a non-number component in hh:mm:ss format', async () => {
    const parser = new DurationParser();
    const response = parser.parseValue('3:AB:23');
    expect(response).toBeUndefined();
  });

  it('can parse decimal format', async () => {
    const parser = new DurationParser();
    const response = parser.parseValue('345.23');
    expect(response).toBe(345.23);
  });

  it('returns undefined for non-numeric numbers', async () => {
    const parser = new DurationParser();
    const response = parser.parseValue('abc.de');
    expect(response).toBeUndefined();
  });

  it('returns the number if passed a number', async () => {
    const parser = new DurationParser();
    const response = parser.parseValue(345.23);
    expect(response).toBe(345.23);
  });

  it('returns undefined if passed a boolean', async () => {
    const parser = new DurationParser();
    const response = parser.parseValue(true);
    expect(response).toBeUndefined();
  });
});
