import { describe, expect, test } from 'vitest';

import { BooleanParser } from './boolean';
import { ListParser } from './list';
import { NumberParser } from './number';
import { StringParser } from './string';

describe('ListParser', () => {
  test('can parse a list of strings with commas', () => {
    const stringParser = new StringParser();
    const parser = new ListParser(stringParser);
    const response = parser.parseValue('foo, bar, baz');
    expect(response).toEqual(['foo', 'bar', 'baz']);
  });

  test('can parse a list of strings with semicolons', () => {
    const stringParser = new StringParser();
    const parser = new ListParser(stringParser);
    const response = parser.parseValue('foo; bar; baz');
    expect(response).toEqual(['foo', 'bar', 'baz']);
  });

  test('returns a single value if no list', () => {
    const stringParser = new StringParser();
    const parser = new ListParser(stringParser);
    const response = parser.parseValue('foo bar baz');
    expect(response).toEqual(['foo bar baz']);
  });

  test('trims whitespace in list items', () => {
    const stringParser = new StringParser();
    const parser = new ListParser(stringParser);
    const response = parser.parseValue('   foo   ,  bar   ,   baz');
    expect(response).toEqual(['foo', 'bar', 'baz']);
  });

  test('can parse a list of numbers with commas', () => {
    const numberParser = new NumberParser();
    const parser = new ListParser(numberParser);
    const response = parser.parseValue('1, 2, 3');
    expect(response).toEqual([1, 2, 3]);
  });

  test('can parse a list of numbers with a 0 in it for falsy protection', () => {
    const numberParser = new NumberParser();
    const parser = new ListParser(numberParser);
    const response = parser.parseValue('0, 1, 2, 3');
    expect(response).toEqual([0, 1, 2, 3]);
  });

  test('does not include non-numbers in result if numbers are intended', () => {
    const numberParser = new NumberParser();
    const parser = new ListParser(numberParser);
    const response = parser.parseValue('abc, 2, 3');
    expect(response).toEqual([2, 3]);
  });

  test('can parse a list of booleans with commas', () => {
    const booleanParser = new BooleanParser();
    const parser = new ListParser(booleanParser);
    const response = parser.parseValue('true, false, true');
    expect(response).toEqual([true, false, true]);
  });

  test('can parse a list of strings with custom separator', () => {
    const stringParser = new StringParser();
    const parser = new ListParser(stringParser, { separators: ['-'] });
    const response = parser.parseValue('boop - bop - beep');
    expect(response).toEqual(['boop', 'bop', 'beep']);
  });

  test('can parse a list of strings with the second custom separator', () => {
    const stringParser = new StringParser();
    const parser = new ListParser(stringParser, { separators: ['-', '|'] });
    const response = parser.parseValue('boop | bop | beep');
    expect(response).toEqual(['boop', 'bop', 'beep']);
  });

  test('defaults to semicolons before commas since commas are common in some terms', () => {
    const stringParser = new StringParser();
    const parser = new ListParser(stringParser);
    const response = parser.parseValue('10,000 Maniacs; Boop, Beep, Boop');
    expect(response).toEqual(['10,000 Maniacs', 'Boop, Beep, Boop']);
  });
});
