import { describe, it, expect } from 'vitest';
import { NumberField } from './number';

describe('Number Field', () => {
  it('can parse number value', () => {
    const field = new NumberField(1);

    expect(field.value).to.equal(1);
    expect(field.values).to.deep.equal([1]);
    expect(field.rawValue).to.equal(1);
  });

  it('can parse string value', () => {
    const field = new NumberField('1');

    expect(field.value).to.equal(1);
    expect(field.values).to.deep.equal([1]);
    expect(field.rawValue).to.equal('1');
  });

  it('can parse decimal value string', () => {
    const field = new NumberField('1.23');

    expect(field.value).to.equal(1.23);
    expect(field.values).to.deep.equal([1.23]);
    expect(field.rawValue).to.equal('1.23');
  });

  it('can parse decimal value number', () => {
    const field = new NumberField(1.23);

    expect(field.value).to.equal(1.23);
    expect(field.values).to.deep.equal([1.23]);
    expect(field.rawValue).to.equal(1.23);
  });

  it('parses boolean false', () => {
    const field = new NumberField(false);

    expect(field.value).to.be.undefined;
    expect(field.values).to.deep.equal([]);
    expect(field.rawValue).to.equal(false);
  });

  it('parses non-numbers as undefined', () => {
    const field = new NumberField('boop');

    expect(field.value).to.be.undefined;
    expect(field.values).to.deep.equal([]);
    expect(field.rawValue).to.equal('boop');
  });

  it('parses array of strings properly', () => {
    const field = new NumberField(['1', '2', '3']);

    expect(field.value).to.equal(1);
    expect(field.values).to.deep.equal([1, 2, 3]);
    expect(field.rawValue).to.deep.equal(['1', '2', '3']);
  });

  it('parses array of numbers properly', () => {
    const field = new NumberField([1, 2, 3]);

    expect(field.value).to.equal(1);
    expect(field.values).to.deep.equal([1, 2, 3]);
    expect(field.rawValue).to.deep.equal([1, 2, 3]);
  });
});
