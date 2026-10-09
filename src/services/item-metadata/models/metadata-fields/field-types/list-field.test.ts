import { describe, it, expect } from 'vitest';
import { NumberListField, StringListField } from './list';

describe('List Field', () => {
  describe('String List Field', () => {
    it('can parse individual values', () => {
      const stringListField = new StringListField('foo');

      expect(stringListField.value).to.equal('foo');
      expect(stringListField.values).to.deep.equal(['foo']);
      expect(stringListField.rawValue).to.equal('foo');
    });

    it('can parse lists', () => {
      const stringListField = new StringListField('foo, bar, baz');

      expect(stringListField.value).to.equal('foo');
      expect(stringListField.values).to.deep.equal(['foo', 'bar', 'baz']);
      expect(stringListField.rawValue).to.equal('foo, bar, baz');
    });

    it('can parse lists of lists', () => {
      const stringListField = new StringListField([
        'foo, bar, baz',
        'beep, boop, bop',
      ]);

      expect(stringListField.value).to.equal('foo');
      expect(stringListField.values).to.deep.equal([
        'foo',
        'bar',
        'baz',
        'beep',
        'boop',
        'bop',
      ]);
      expect(stringListField.rawValue).to.deep.equal([
        'foo, bar, baz',
        'beep, boop, bop',
      ]);
    });
  });

  describe('NumberListField', () => {
    it('can parse lists of numbers', () => {
      const listField = new NumberListField('1, 2, 3');

      expect(listField.value).to.equal(1);
      expect(listField.values).to.deep.equal([1, 2, 3]);
      expect(listField.rawValue).to.equal('1, 2, 3');
    });

    it('can parse lists of lists', () => {
      const listField = new NumberListField(['1, 2, 3', '4, 5, 6']);

      expect(listField.value).to.equal(1);
      expect(listField.values).to.deep.equal([1, 2, 3, 4, 5, 6]);
      expect(listField.rawValue).to.deep.equal(['1, 2, 3', '4, 5, 6']);
    });
  });
});
