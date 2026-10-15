import { describe, it, expect } from 'vitest';
import { PageProgressionField } from './page-progression';

describe('PageProgressionField', () => {
  it('parses a valid page progression', () => {
    const field = new PageProgressionField('rl');

    expect(field.value).to.equal('rl');
    expect(field.values).to.deep.equal(['rl']);
    expect(field.rawValue).to.equal('rl');
  });

  it('accepts all valid page progression values', () => {
    for (const value of ['rl', 'lr']) {
      expect(new PageProgressionField(value).value).to.equal(value);
    }
  });

  it('rejects an invalid page progression', () => {
    const field = new PageProgressionField('blah');

    expect(field.value).to.be.undefined;
    expect(field.values).to.deep.equal([]);
    // the raw value is still preserved for inspection
    expect(field.rawValue).to.equal('blah');
  });
});
