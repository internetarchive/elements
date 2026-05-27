import { describe, expect, test } from 'vitest';

import { EpochParser } from './epoch';

describe('EpochParser', () => {
  test('can parse int strings', () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(0);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('can parse float strings', () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397.123');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('can parse nanoseconds', () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397123456789');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('can parse microseconds', () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397123456');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('can parse milliseconds', () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397123');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('can parse seconds', () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(0);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('returns undefined if the number is not a number', () => {
    const parser = new EpochParser();
    const response = parser.parseValue('qab');
    expect(response).toBeUndefined();
  });

  test('can parse number values', () => {
    const parser = new EpochParser();
    const response = parser.parseValue(1637274397);
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(0);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('returns undefined if a boolean is passed in', () => {
    const parser = new EpochParser();
    const response = parser.parseValue(true);
    expect(response).toBeUndefined();
  });

  test('defaults to auto detecting the input unit', () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397123456789');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('has a shared static instance that auto detects the input unit', () => {
    const parser = EpochParser.shared;
    const response = parser.parseValue('1637274397123456789');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('has a millisecondsParser static instance that uses milliseconds', () => {
    const parser = EpochParser.millisecondsParser;
    const response = parser.parseValue(1637274397123);
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('has a secondsParser static instance that uses seconds', () => {
    const parser = EpochParser.secondsParser;
    const response = parser.parseValue(1637274397);
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(0);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('can specify input unit as nanoseconds', () => {
    const parser = new EpochParser('nanoseconds');
    const response = parser.parseValue('1637274397123456789');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('can specify input unit as microseconds', () => {
    const parser = new EpochParser('microseconds');
    const response = parser.parseValue('1637274397123456');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('has some slow method', () => {
    const parser = new EpochParser();
    parser.someSlowMethod();
  });
});
