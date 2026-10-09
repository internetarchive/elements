import { describe, it, expect } from 'vitest';
import { AspectRatioField, AspectRatioParser } from './aspect-ratio';

describe('AspectRatioField', () => {
  it('parses a colon-separated ratio', () => {
    const field = new AspectRatioField('16:9');

    expect(field.value?.width).to.equal(16);
    expect(field.value?.height).to.equal(9);
    expect(field.value?.decimal).to.be.closeTo(1.778, 0.001);
  });

  it('parses ratios separated by "/" or "x"', () => {
    expect(new AspectRatioField('4/3').value?.decimal).to.be.closeTo(
      1.333,
      0.001,
    );
    expect(new AspectRatioField('16x9').value?.width).to.equal(16);
  });

  it('rejects a malformed ratio but preserves the raw value', () => {
    const field = new AspectRatioField('widescreen');

    expect(field.value).to.be.undefined;
    expect(field.rawValue).to.equal('widescreen');
  });

  it('rejects a zero height to avoid divide-by-zero', () => {
    const field = new AspectRatioField('4:0');

    expect(field.value).to.be.undefined;
  });

  it('exposes a shared parser instance', () => {
    expect(AspectRatioParser.shared).to.be.an.instanceof(AspectRatioParser);
  });
});
