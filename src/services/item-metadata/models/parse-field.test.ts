import { describe, it, expect } from 'vitest';
import { parseField } from './parse-field';

describe('parseField', () => {
  it('parses the value of a present key', () => {
    expect(parseField({ a: '5' }, (v) => Number(v), 'a')).to.equal(5);
  });

  it('returns undefined when the key is absent', () => {
    expect(parseField({ a: '5' }, (v) => Number(v), 'missing')).to.be.undefined;
    expect(parseField({}, (v) => Number(v), 'a')).to.be.undefined;
  });

  it('treats falsy-but-present values as present', () => {
    expect(parseField({ a: 0 }, (v) => v, 'a')).to.equal(0);
    expect(parseField({ a: '' }, (v) => v, 'a')).to.equal('');
    expect(parseField({ a: false }, (v) => v, 'a')).to.equal(false);
  });

  it('skips null/undefined keys without calling parse', () => {
    let calls = 0;
    const result = parseField(
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
    expect(parseField({ b: '7' }, (v) => Number(v), 'a', 'b')).to.equal(7);
  });

  it('uses the first present key when several are set', () => {
    expect(parseField({ a: '1', b: '2' }, (v) => Number(v), 'a', 'b')).to.equal(
      1,
    );
  });

  it('stops at the first present key even if parse returns undefined', () => {
    let calls = 0;
    const result = parseField<number>(
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
