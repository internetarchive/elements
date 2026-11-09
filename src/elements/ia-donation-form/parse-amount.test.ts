import { describe, expect, test } from 'vitest';

import { parseAmount } from './parse-amount';

describe('parseAmount', () => {
  test.each([
    ['5', 5],
    ['10.5', 10.5],
    ['10.50', 10.5],
    ['10,50', 10.5],
    ['10,', 10],
    ['10.', 10],
    ['1,000', 1000],
    ['1,000,000', 1000000],
    ['1.234,50', 1234.5],
    ['1,234.50', 1234.5],
    ['9999,99', 9999.99],
    [' 12 ', 12],
  ])('%s is %s', (typed, expected) => {
    expect(parseAmount(typed)).to.equal(expected);
  });

  test.each([
    '',
    'abc',
    '12abc',
    '-5',
    '1e3',
    '10.5055',
    '1.000',
    '10.505',
    '2.500',
    '1,00,0',
    '1.000.50',
    '1,000,5,0',
    ',5',
    '10,5,5',
    '1 000',
  ])('%s is not an amount', (typed) => {
    expect(parseAmount(typed)).to.be.NaN;
  });
});
