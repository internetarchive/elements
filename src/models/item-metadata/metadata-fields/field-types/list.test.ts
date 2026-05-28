import { describe, expect, test } from 'vitest';

import { NumberListField, StringListField } from './list';

describe('List Field', () => {
  describe('String List Field', () => {
    test('can parse individual values', () => {
      const stringListField = new StringListField('foo');

      expect(stringListField.value).toBe('foo');
      expect(stringListField.values).toEqual(['foo']);
      expect(stringListField.rawValue).toBe('foo');
    });

    test('can parse lists', () => {
      const stringListField = new StringListField('foo, bar, baz');

      expect(stringListField.value).toBe('foo');
      expect(stringListField.values).toEqual(['foo', 'bar', 'baz']);
      expect(stringListField.rawValue).toBe('foo, bar, baz');
    });

    test('can parse lists of lists', () => {
      const stringListField = new StringListField([
        'foo, bar, baz',
        'beep, boop, bop',
      ]);

      expect(stringListField.value).toBe('foo');
      expect(stringListField.values).toEqual([
        'foo',
        'bar',
        'baz',
        'beep',
        'boop',
        'bop',
      ]);
      expect(stringListField.rawValue).toEqual([
        'foo, bar, baz',
        'beep, boop, bop',
      ]);
    });
  });

  describe('NumberListField', () => {
    test('can parse lists of numbers', () => {
      const listField = new NumberListField('1, 2, 3');

      expect(listField.value).toBe(1);
      expect(listField.values).toEqual([1, 2, 3]);
      expect(listField.rawValue).toBe('1, 2, 3');
    });

    test('can parse lists of lists', () => {
      const listField = new NumberListField(['1, 2, 3', '4, 5, 6']);

      expect(listField.value).toBe(1);
      expect(listField.values).toEqual([1, 2, 3, 4, 5, 6]);
      expect(listField.rawValue).toEqual(['1, 2, 3', '4, 5, 6']);
    });
  });
});
