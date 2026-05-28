import { describe, expect, test } from 'vitest';

import { EpochParser } from './epoch';

// 1637274397 seconds = 2021-11-18T22:26:37.000Z. The parser treats epochs as
// UTC instants, so expectations are the raw millisecond values rather than
// wall-clock components (which would be timezone-dependent and fail in CI/UTC).
const EXPECTED_SECONDS_MS = 1637274397000;
const EXPECTED_SUBSECOND_MS = 1637274397123;

describe('EpochParser', () => {
  test('can parse int strings', () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397');
    expect(response?.getTime()).toBe(EXPECTED_SECONDS_MS);
  });

  test('can parse float strings', () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397.123');
    expect(response?.getTime()).toBe(EXPECTED_SUBSECOND_MS);
  });

  test('can parse nanoseconds', () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397123456789');
    expect(response?.getTime()).toBe(EXPECTED_SUBSECOND_MS);
  });

  test('can parse microseconds', () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397123456');
    expect(response?.getTime()).toBe(EXPECTED_SUBSECOND_MS);
  });

  test('can parse milliseconds', () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397123');
    expect(response?.getTime()).toBe(EXPECTED_SUBSECOND_MS);
  });

  test('can parse seconds', () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397');
    expect(response?.getTime()).toBe(EXPECTED_SECONDS_MS);
  });

  test('returns undefined if the number is not a number', () => {
    const parser = new EpochParser();
    const response = parser.parseValue('qab');
    expect(response).toBeUndefined();
  });

  test('can parse number values', () => {
    const parser = new EpochParser();
    const response = parser.parseValue(1637274397);
    expect(response?.getTime()).toBe(EXPECTED_SECONDS_MS);
  });

  test('returns undefined if a boolean is passed in', () => {
    const parser = new EpochParser();
    const response = parser.parseValue(true);
    expect(response).toBeUndefined();
  });

  test('defaults to auto detecting the input unit', () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397123456789');
    expect(response?.getTime()).toBe(EXPECTED_SUBSECOND_MS);
  });

  test('has a shared static instance that auto detects the input unit', () => {
    const parser = EpochParser.shared;
    const response = parser.parseValue('1637274397123456789');
    expect(response?.getTime()).toBe(EXPECTED_SUBSECOND_MS);
  });

  test('has a millisecondsParser static instance that uses milliseconds', () => {
    const parser = EpochParser.millisecondsParser;
    const response = parser.parseValue(1637274397123);
    expect(response?.getTime()).toBe(EXPECTED_SUBSECOND_MS);
  });

  test('has a secondsParser static instance that uses seconds', () => {
    const parser = EpochParser.secondsParser;
    const response = parser.parseValue(1637274397);
    expect(response?.getTime()).toBe(EXPECTED_SECONDS_MS);
  });

  test('can specify input unit as nanoseconds', () => {
    const parser = new EpochParser('nanoseconds');
    const response = parser.parseValue('1637274397123456789');
    expect(response?.getTime()).toBe(EXPECTED_SUBSECOND_MS);
  });

  test('can specify input unit as microseconds', () => {
    const parser = new EpochParser('microseconds');
    const response = parser.parseValue('1637274397123456');
    expect(response?.getTime()).toBe(EXPECTED_SUBSECOND_MS);
  });

  test('has some slow method', () => {
    const parser = new EpochParser();
    parser.someSlowMethod();
  });
});
