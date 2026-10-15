import { describe, it, expect } from 'vitest';
import { DurationField } from './duration';

describe('DurationField', () => {
  it('can parse a seconds duration from a string', () => {
    const field = new DurationField('123.5');

    expect(field.value).to.be.equal(123.5);
    expect(field.values).to.deep.equal([123.5]);
    expect(field.rawValue).to.equal('123.5');
  });

  it('can parse a seconds duration from a number', () => {
    const field = new DurationField(123.5);

    expect(field.value).to.be.equal(123.5);
    expect(field.values).to.deep.equal([123.5]);
    expect(field.rawValue).to.equal(123.5);
  });

  it('can parse a hh:mm:ss duration', () => {
    const field = new DurationField('1:23:45');

    expect(field.value).to.be.equal(5025);
    expect(field.values).to.deep.equal([5025]);
    expect(field.rawValue).to.equal('1:23:45');
  });

  it('can parse a mm:ss duration', () => {
    const field = new DurationField('1:23');

    expect(field.value).to.be.equal(83);
    expect(field.values).to.deep.equal([83]);
    expect(field.rawValue).to.equal('1:23');
  });
});
