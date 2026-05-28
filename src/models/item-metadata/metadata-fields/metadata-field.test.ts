import { describe, expect, test } from 'vitest';

import type { FieldParserInterface } from '@src/parsers/field-parser-interface';

import { MetadataField } from './metadata-field';

describe('Metadata Field', () => {
  test('can be properly instantiated with single value', () => {
    class MockParser implements FieldParserInterface<string> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseValue(rawValue: any): string {
        return rawValue;
      }
    }

    const parser = new MockParser();
    const metadataField = new MetadataField(parser, 'foo');

    expect(metadataField.rawValue).toBe('foo');
    expect(metadataField.value).toBe('foo');
    expect(metadataField.values).toEqual(['foo']);
  });

  test('can be properly instantiated with array value', () => {
    class MockParser implements FieldParserInterface<string> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseValue(rawValue: any): string {
        return rawValue;
      }
    }

    const parser = new MockParser();
    const metadataField = new MetadataField(parser, ['foo', 'bar', 'baz']);

    expect(metadataField.rawValue).toEqual(['foo', 'bar', 'baz']);
    expect(metadataField.value).toBe('foo');
    expect(metadataField.values).toEqual(['foo', 'bar', 'baz']);
  });

  test('properly casts values to expected parser type for single values', () => {
    class MockFloatParser implements FieldParserInterface<number> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseValue(rawValue: any): number {
        return parseFloat(rawValue);
      }
    }

    const parser = new MockFloatParser();
    const metadataField = new MetadataField(parser, '1.3');

    expect(metadataField.rawValue).toBe('1.3');
    expect(metadataField.value).toBe(1.3);
    expect(metadataField.values).toEqual([1.3]);
  });

  test('properly casts values to expected parser type for array values', () => {
    class MockFloatParser implements FieldParserInterface<number> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseValue(rawValue: any): number {
        return parseFloat(rawValue);
      }
    }

    const parser = new MockFloatParser();
    const metadataField = new MetadataField(parser, ['1.3', '2.4', '4.5']);

    expect(metadataField.rawValue).toEqual(['1.3', '2.4', '4.5']);
    expect(metadataField.value).toBe(1.3);
    expect(metadataField.values).toEqual([1.3, 2.4, 4.5]);
  });

  test('handles falsy `0` return values properly', () => {
    class MockFloatParser implements FieldParserInterface<number> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseValue(rawValue: any): number {
        return rawValue;
      }
    }

    const parser = new MockFloatParser();
    const metadataField = new MetadataField(parser, 0);

    expect(metadataField.rawValue).toBe(0);
    expect(metadataField.value).toBe(0);
    expect(metadataField.values).toEqual([0]);
  });

  test('handles falsy `false` return values properly', () => {
    class MockFloatParser implements FieldParserInterface<number> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseValue(rawValue: any): number {
        return rawValue;
      }
    }

    const parser = new MockFloatParser();
    const metadataField = new MetadataField(parser, false);

    expect(metadataField.rawValue).toBe(false);
    expect(metadataField.value).toBe(false);
    expect(metadataField.values).toEqual([false]);
  });

  test('handles falsy empty string return values properly', () => {
    class MockFloatParser implements FieldParserInterface<number> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseValue(rawValue: any): number {
        return rawValue;
      }
    }

    const parser = new MockFloatParser();
    const metadataField = new MetadataField(parser, '');

    expect(metadataField.rawValue).toBe('');
    expect(metadataField.value).toBe('');
    expect(metadataField.values).toEqual(['']);
  });
});
