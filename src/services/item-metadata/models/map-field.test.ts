import { describe, it, expect } from 'vitest';
import { mapField } from './map-field';

describe('mapField', () => {
  it('maps the value of a present key', () => {
    expect(mapField({ a: '5' }, (v) => Number(v), 'a')).to.equal(5);
  });

  it('returns undefined when the key is absent', () => {
    expect(mapField({ a: '5' }, (v) => Number(v), 'missing')).to.be.undefined;
    expect(mapField({}, (v) => Number(v), 'a')).to.be.undefined;
  });

  it('treats falsy-but-present values as present', () => {
    expect(mapField({ a: 0 }, (v) => v, 'a')).to.equal(0);
    expect(mapField({ a: '' }, (v) => v, 'a')).to.equal('');
    expect(mapField({ a: false }, (v) => v, 'a')).to.equal(false);
  });

  it('passes array raw values through unchanged', () => {
    expect(mapField({ a: ['x', 'y'] }, (v) => v, 'a')).to.deep.equal([
      'x',
      'y',
    ]);
  });

  it('skips null/undefined keys without calling make', () => {
    let calls = 0;
    const result = mapField(
      { a: null, b: undefined },
      (v) => {
        calls += 1;
        return v;
      },
      'a',
      'b',
    );
    expect(result).to.be.undefined;
    expect(calls).to.equal(0);
  });

  it('falls back to a later key when earlier keys are absent', () => {
    expect(mapField({ b: '7' }, (v) => Number(v), 'a', 'b')).to.equal(7);
  });

  it('uses the first present key when several are set', () => {
    expect(mapField({ a: '1', b: '2' }, (v) => Number(v), 'a', 'b')).to.equal(
      1,
    );
  });

  it('stops at the first present key even if make returns undefined', () => {
    let calls = 0;
    const result = mapField<number>(
      { a: 'x', b: 'y' },
      () => {
        calls += 1;
        return undefined;
      },
      'a',
      'b',
    );
    expect(result).to.be.undefined;
    expect(calls).to.equal(1);
  });
});
