import { describe, it, expect } from 'vitest';
import { EnumField, EnumParser } from './enum';

type Color = 'red' | 'green' | 'blue';
const colorParser = new EnumParser<Color>(['red', 'green', 'blue']);

describe('EnumField', () => {
  it('parses an allowed value', () => {
    const field = new EnumField<Color>('green', colorParser);

    expect(field.value).to.equal('green');
    expect(field.values).to.deep.equal(['green']);
    expect(field.rawValue).to.equal('green');
  });

  it('rejects a value outside the allowed set', () => {
    const field = new EnumField<Color>('purple', colorParser);

    expect(field.value).to.be.undefined;
    expect(field.values).to.deep.equal([]);
    // the raw value is still preserved for inspection
    expect(field.rawValue).to.equal('purple');
  });

  it('rejects non-string raw values', () => {
    const field = new EnumField<Color>(123, colorParser);

    expect(field.value).to.be.undefined;
    expect(field.values).to.deep.equal([]);
  });

  it('filters a mixed array down to allowed values', () => {
    const field = new EnumField<Color>(['red', 'purple', 'blue'], colorParser);

    expect(field.values).to.deep.equal(['red', 'blue']);
    expect(field.value).to.equal('red');
  });

  it('is generic over any allowed set', () => {
    const sizeParser = new EnumParser<'sm' | 'lg'>(['sm', 'lg']);
    const field = new EnumField<'sm' | 'lg'>('lg', sizeParser);

    expect(field.value).to.equal('lg');
  });
});
