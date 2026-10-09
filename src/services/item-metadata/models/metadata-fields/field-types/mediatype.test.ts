import { describe, it, expect } from 'vitest';
import { MediaTypeField } from './mediatype';

describe('MediaTypeField', () => {
  it('parses a valid mediatype', () => {
    const field = new MediaTypeField('movies');

    expect(field.value).to.equal('movies');
    expect(field.values).to.deep.equal(['movies']);
    expect(field.rawValue).to.equal('movies');
  });

  it('accepts all valid mediatype values', () => {
    const values = [
      'account',
      'audio',
      'collection',
      'data',
      'etree',
      'image',
      'movies',
      'search',
      'software',
      'texts',
      'web',
    ];
    for (const value of values) {
      expect(new MediaTypeField(value).value).to.equal(value);
    }
  });

  it('rejects an invalid mediatype', () => {
    const field = new MediaTypeField('blah');

    expect(field.value).to.be.undefined;
    expect(field.values).to.deep.equal([]);
    // the raw value is still preserved for inspection
    expect(field.rawValue).to.equal('blah');
  });
});
