import { describe, it, expect } from 'vitest';
import { BooleanField } from './boolean';

describe('Boolean Field', () => {
  it('can parse true boolean value', () => {
    const booleanField = new BooleanField(true);

    expect(booleanField.value).to.be.true;
    expect(booleanField.values).to.deep.equal([true]);
    expect(booleanField.rawValue).to.equal(true);
  });

  it('can parse false boolean value', () => {
    const booleanField = new BooleanField(false);

    expect(booleanField.value).to.be.false;
    expect(booleanField.values).to.deep.equal([false]);
    expect(booleanField.rawValue).to.equal(false);
  });

  it('parses truthy values to true', () => {
    const booleanField = new BooleanField('boop');

    expect(booleanField.value).to.be.true;
    expect(booleanField.values).to.deep.equal([true]);
    expect(booleanField.rawValue).to.equal('boop');
  });

  it('parses falsy values to false', () => {
    const booleanField = new BooleanField(0);

    expect(booleanField.value).to.be.false;
    expect(booleanField.values).to.deep.equal([false]);
    expect(booleanField.rawValue).to.equal(0);
  });

  it('parses false string to false', () => {
    const booleanField = new BooleanField('false');

    expect(booleanField.value).to.be.false;
    expect(booleanField.values).to.deep.equal([false]);
    expect(booleanField.rawValue).to.equal('false');
  });

  it('parses true string to true', () => {
    const booleanField = new BooleanField('true');

    expect(booleanField.value).to.be.true;
    expect(booleanField.values).to.deep.equal([true]);
    expect(booleanField.rawValue).to.equal('true');
  });

  it('parses array of strings properly', () => {
    const booleanField = new BooleanField(['true', 'false', 'true']);

    expect(booleanField.value).to.be.true;
    expect(booleanField.values).to.deep.equal([true, false, true]);
    expect(booleanField.rawValue).to.deep.equal(['true', 'false', 'true']);
  });

  it('parses array of booleans properly', () => {
    const booleanField = new BooleanField([true, false, true]);

    expect(booleanField.value).to.be.true;
    expect(booleanField.values).to.deep.equal([true, false, true]);
    expect(booleanField.rawValue).to.deep.equal([true, false, true]);
  });
});
