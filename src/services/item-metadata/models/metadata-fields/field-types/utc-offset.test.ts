import { describe, it, expect } from 'vitest';
import { UtcOffsetField, UtcOffsetParser } from './utc-offset';

describe('UtcOffsetField', () => {
  it('parses a negative offset', () => {
    const field = new UtcOffsetField('-800');

    expect(field.value?.hours).to.equal(-8);
    expect(field.value?.minutes).to.equal(0);
    expect(field.value?.totalMinutes).to.equal(-480);
  });

  it('parses a positive offset with minutes', () => {
    const field = new UtcOffsetField('+0530');

    expect(field.value?.hours).to.equal(5);
    expect(field.value?.minutes).to.equal(30);
    expect(field.value?.totalMinutes).to.equal(330);
  });

  it('parses an offset with a colon separator', () => {
    const field = new UtcOffsetField('-08:00');

    expect(field.value?.totalMinutes).to.equal(-480);
  });

  it('rejects a malformed offset but preserves the raw value', () => {
    const field = new UtcOffsetField('eight');

    expect(field.value).to.be.undefined;
    expect(field.rawValue).to.equal('eight');
  });

  it('exposes a shared parser instance', () => {
    expect(UtcOffsetParser.shared).to.be.an.instanceof(UtcOffsetParser);
  });
});
