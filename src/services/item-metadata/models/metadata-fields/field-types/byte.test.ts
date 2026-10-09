import { describe, it, expect } from 'vitest';
import { ByteField } from './byte';

describe('ByteField Field', () => {
  it('can parse a byte from a string', () => {
    const field = new ByteField('123');

    expect(field.value).to.be.equal(123);
    expect(field.values).to.deep.equal([123]);
    expect(field.rawValue).to.equal('123');
  });

  it('can parse a byte from a number', () => {
    const field = new ByteField(123);

    expect(field.value).to.be.equal(123);
    expect(field.values).to.deep.equal([123]);
    expect(field.rawValue).to.equal(123);
  });
});
