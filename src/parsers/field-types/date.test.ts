import { describe, expect, test } from 'vitest';

import { DateParser } from './date';

describe('DateParser', () => {
  test('can parse date-only strings', () => {
    const parser = new DateParser();
    const response = parser.parseValue('2020-06-20');
    const response2 = parser.parseValue('06/20/2020');
    const expected = new Date();
    expected.setHours(0);
    expected.setMinutes(0);
    expected.setSeconds(0);
    expected.setMilliseconds(0);
    expected.setMonth(5);
    expected.setDate(20);
    expected.setFullYear(2020);
    expect(response?.getTime()).toBe(expected.getTime());
    expect(response2?.getTime()).toBe(expected.getTime());
  });

  test('can parse date-time strings', () => {
    const parser = new DateParser();
    const response = parser.parseValue('2020-06-20 3:46:23');
    const response2 = parser.parseValue('2020-06-20 03:46:23');
    const expected = new Date();
    expected.setHours(3);
    expected.setMinutes(46);
    expected.setSeconds(23);
    expected.setMilliseconds(0);
    expected.setMonth(5);
    expected.setDate(20);
    expected.setFullYear(2020);
    expect(response?.getTime()).toBe(expected.getTime());
    expect(response2?.getTime()).toBe(expected.getTime());
  });

  test('can parse date-time strings different string test', () => {
    const parser = new DateParser();
    const response = parser.parseValue('2020-09-20 05:12:38');
    const expected = new Date();
    expected.setHours(5);
    expected.setMinutes(12);
    expected.setSeconds(38);
    expected.setMilliseconds(0);
    expected.setMonth(8);
    expected.setDate(20);
    expected.setFullYear(2020);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('can parse ISO8601 strings without time zones', () => {
    const parser = new DateParser();
    const response = parser.parseValue('2020-06-20T13:37:15');
    const expected = new Date();
    expected.setHours(13);
    expected.setMinutes(37);
    expected.setSeconds(15);
    expected.setMilliseconds(0);
    expected.setMonth(5);
    expected.setDate(20);
    expected.setFullYear(2020);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('can parse ISO8601 strings with explicit time zones', () => {
    const parser = new DateParser();
    const response = parser.parseValue('2020-06-20T13:37:15Z');
    const response2 = parser.parseValue('2020-06-20T13:37:15-00:00');
    const response3 = parser.parseValue('2020-06-20T13:37:15+00:00');
    const expected = new Date();
    expected.setUTCHours(13);
    expected.setUTCMinutes(37);
    expected.setUTCSeconds(15);
    expected.setUTCMilliseconds(0);
    expected.setUTCMonth(5);
    expected.setUTCDate(20);
    expected.setUTCFullYear(2020);
    expect(response?.getTime()).toBe(expected.getTime());
    expect(response2?.getTime()).toBe(expected.getTime());
    expect(response3?.getTime()).toBe(expected.getTime());
  });

  test('can parse "c.a. yyyy" formatted dates', () => {
    const parser = new DateParser();
    const response = parser.parseValue('c.a. 2020');
    const expected = new Date();
    expected.setHours(0);
    expected.setMinutes(0);
    expected.setSeconds(0);
    expected.setMilliseconds(0);
    expected.setMonth(0);
    expected.setDate(1);
    expected.setFullYear(2020);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('can parse "ca yyyy" formatted dates', () => {
    const parser = new DateParser();
    const response = parser.parseValue('ca 2020');
    const expected = new Date();
    expected.setHours(0);
    expected.setMinutes(0);
    expected.setSeconds(0);
    expected.setMilliseconds(0);
    expected.setMonth(0);
    expected.setDate(1);
    expected.setFullYear(2020);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('can parse "[yyyy]" formatted dates', () => {
    const parser = new DateParser();
    const response = parser.parseValue('[2020]');
    const expected = new Date();
    expected.setHours(0);
    expected.setMinutes(0);
    expected.setSeconds(0);
    expected.setMilliseconds(0);
    expected.setMonth(0);
    expected.setDate(1);
    expected.setFullYear(2020);
    expect(response?.getTime()).toBe(expected.getTime());
  });

  test('returns undefined if it is a bad date', () => {
    const parser = new DateParser();
    const response = parser.parseValue('absjkdvfnskj');
    expect(response).toBeUndefined();
  });

  test('returns undefined if passed a non-string value', () => {
    const parser = new DateParser();
    const response = parser.parseValue(123);
    expect(response).toBeUndefined();
  });
});
