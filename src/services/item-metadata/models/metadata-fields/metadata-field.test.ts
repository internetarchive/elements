import type { FieldParserInterface } from '../../../field-parsers/field-parsers';
import { describe, it, expect } from 'vitest';
import { MetadataField } from './metadata-field';

describe('Metadata Field', () => {
  it('can be properly instantiated with single value', () => {
    class MockParser implements FieldParserInterface<string> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseValue(rawValue: any): string {
        return rawValue;
      }
    }

    const parser = new MockParser();
    const metadataField = new MetadataField(parser, 'foo');

    expect(metadataField.rawValue).to.equal('foo');
    expect(metadataField.value).to.equal('foo');
    expect(metadataField.values).to.deep.equal(['foo']);
  });

  it('can be properly instantiated with array value', () => {
    class MockParser implements FieldParserInterface<string> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseValue(rawValue: any): string {
        return rawValue;
      }
    }

    const parser = new MockParser();
    const metadataField = new MetadataField(parser, ['foo', 'bar', 'baz']);

    expect(metadataField.rawValue).to.deep.equal(['foo', 'bar', 'baz']);
    expect(metadataField.value).to.equal('foo');
    expect(metadataField.values).to.deep.equal(['foo', 'bar', 'baz']);
  });

  it('properly casts values to expected parser type for single values', () => {
    class MockFloatParser implements FieldParserInterface<number> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseValue(rawValue: any): number {
        return parseFloat(rawValue);
      }
    }

    const parser = new MockFloatParser();
    const metadataField = new MetadataField(parser, '1.3');

    expect(metadataField.rawValue).to.equal('1.3');
    expect(metadataField.value).to.equal(1.3);
    expect(metadataField.values).to.deep.equal([1.3]);
  });

  it('properly casts values to expected parser type for array values', () => {
    class MockFloatParser implements FieldParserInterface<number> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseValue(rawValue: any): number {
        return parseFloat(rawValue);
      }
    }

    const parser = new MockFloatParser();
    const metadataField = new MetadataField(parser, ['1.3', '2.4', '4.5']);

    expect(metadataField.rawValue).to.deep.equal(['1.3', '2.4', '4.5']);
    expect(metadataField.value).to.equal(1.3);
    expect(metadataField.values).to.deep.equal([1.3, 2.4, 4.5]);
  });

  it('handles falsy `0` return values properly', () => {
    class MockFloatParser implements FieldParserInterface<number> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseValue(rawValue: any): number {
        return rawValue;
      }
    }

    const parser = new MockFloatParser();
    const metadataField = new MetadataField(parser, 0);

    expect(metadataField.rawValue).to.equal(0);
    expect(metadataField.value).to.equal(0);
    expect(metadataField.values).to.deep.equal([0]);
  });

  it('handles falsy `false` return values properly', () => {
    class MockFloatParser implements FieldParserInterface<number> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseValue(rawValue: any): number {
        return rawValue;
      }
    }

    const parser = new MockFloatParser();
    const metadataField = new MetadataField(parser, false);

    expect(metadataField.rawValue).to.equal(false);
    expect(metadataField.value).to.equal(false);
    expect(metadataField.values).to.deep.equal([false]);
  });

  it('handles falsy empty string return values properly', () => {
    class MockFloatParser implements FieldParserInterface<number> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseValue(rawValue: any): number {
        return rawValue;
      }
    }

    const parser = new MockFloatParser();
    const metadataField = new MetadataField(parser, '');

    expect(metadataField.rawValue).to.equal('');
    expect(metadataField.value).to.equal('');
    expect(metadataField.values).to.deep.equal(['']);
  });
});
