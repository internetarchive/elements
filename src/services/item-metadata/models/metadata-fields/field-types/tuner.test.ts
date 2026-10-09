import { describe, it, expect } from 'vitest';
import { TunerField, TunerParser } from './tuner';

describe('TunerField', () => {
  it('parses channel and frequency', () => {
    const field = new TunerField('Channel 93 (639 MHz)');

    expect(field.value?.channel).to.equal(93);
    expect(field.value?.frequencyMhz).to.equal(639);
  });

  it('parses a channel without a frequency', () => {
    const field = new TunerField('Channel 7');

    expect(field.value?.channel).to.equal(7);
    expect(field.value?.frequencyMhz).to.be.undefined;
  });

  it('is case-insensitive on the "channel" keyword', () => {
    const field = new TunerField('channel 42 (100.5 MHz)');

    expect(field.value?.channel).to.equal(42);
    expect(field.value?.frequencyMhz).to.equal(100.5);
  });

  it('rejects unrecognized formats but preserves the raw value', () => {
    const field = new TunerField('V4L2 1');

    expect(field.value).to.be.undefined;
    expect(field.rawValue).to.equal('V4L2 1');
  });

  it('exposes a shared parser instance', () => {
    expect(TunerParser.shared).to.be.an.instanceof(TunerParser);
  });
});
