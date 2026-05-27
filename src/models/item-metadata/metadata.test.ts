import { describe, expect, test } from 'vitest';

import { Metadata } from './metadata';

describe('Metadata', () => {
  test('properly instantiates metadata with no data', () => {
    const metadata = new Metadata();
    expect(metadata.identifier).toBeUndefined();
    expect(metadata.collection).toBeUndefined();
  });

  test('properly instantiates metadata with identifier', () => {
    const json = { identifier: 'foo', collection: 'bar' };
    const metadata = new Metadata(json);
    expect(metadata.identifier).toBe('foo');
  });

  test('properly instantiates metadata with addeddate', () => {
    const json = { identifier: 'foo', addeddate: '2021-05-20T13:37:15Z' };
    const metadata = new Metadata(json);

    const expected = new Date();
    expected.setUTCHours(13);
    expected.setUTCMinutes(37);
    expected.setUTCSeconds(15);
    expected.setUTCMilliseconds(0);
    expected.setUTCMonth(4);
    expected.setUTCDate(20);
    expected.setUTCFullYear(2021);

    expect(metadata.addeddate?.value?.getTime()).toBe(expected.getTime());
  });

  test('properly instantiates metadata with audio_codec', () => {
    const json = { identifier: 'foo', audio_codec: 'boop' };
    const metadata = new Metadata(json);
    expect(metadata.audio_codec?.value).toBe('boop');
  });

  test('properly instantiates metadata with audio_sample_rate', () => {
    const json = { identifier: 'foo', audio_sample_rate: '123' };
    const metadata = new Metadata(json);
    expect(metadata.audio_sample_rate?.value).toBe(123);
  });

  test('properly instantiates metadata with external-identifier', () => {
    const json = { identifier: 'foo', 'external-identifier': ['abc', '123'] };
    const metadata = new Metadata(json);
    expect(metadata.external_identifier?.values).toEqual(['abc', '123']);
  });

  test('returns undefined for fields that have not been provided', () => {
    const json = { identifier: 'foo', collection: ['abc', '123'] };
    const metadata = new Metadata(json);
    expect(metadata.runtime?.value).toBeUndefined();
  });

  test('accepts fields that have not been modeled', () => {
    const json = { identifier: 'foo', foo: ['abc', '123'] };
    const metadata = new Metadata(json);
    expect(metadata.rawMetadata.foo).toEqual(['abc', '123']);
  });

  test('models the year as a NumberField, string value', () => {
    const json = { identifier: 'foo', year: '1982' };
    const metadata = new Metadata(json);
    expect(metadata.year?.value).toBe(1982);
  });

  test('models the year as a NumberField, number value', () => {
    const json = { identifier: 'foo', year: 1982 };
    const metadata = new Metadata(json);
    expect(metadata.year?.value).toBe(1982);
  });

  test('properly handles falsy number values', () => {
    const json = {
      identifier: 'foo',
      year: 0,
      duration: 0,
      collection_size: 0,
    };
    const metadata = new Metadata(json);
    expect(metadata.year).toBeDefined();
    expect(metadata.year?.value).toBe(0);
    expect(metadata.duration).toBeDefined();
    expect(metadata.duration?.value).toBe(0);
    expect(metadata.collection_size).toBeDefined();
    expect(metadata.collection_size?.value).toBe(0);
  });

  test('properly handles falsy boolean values', () => {
    const json = { identifier: 'foo', noindex: false };
    const metadata = new Metadata(json);
    expect(metadata.noindex).toBeDefined();
    expect(metadata.noindex?.value).toBe(false);
  });

  test('properly handles falsy string values', () => {
    const json = { identifier: 'foo', description: '' };
    const metadata = new Metadata(json);
    expect(metadata.description).toBeDefined();
    expect(metadata.description?.value).toBe('');
  });
});
