import { describe, it, expect } from 'vitest';

import { Metadata } from './metadata';
import type { MetadataFieldKey } from './metadata-field-key';

/**
 * The type has no runtime behaviour, so these are compile-time assertions that
 * happen to run. Anything mistyped here fails `tsc`, which the test script runs
 * ahead of the suite.
 */
describe('MetadataFieldKey', () => {
  it('resolves a field name to its field type', () => {
    const metadata = new Metadata({
      collection: ['kodi_archive', 'community'],
      addeddate: '2018-08-13 10:08:32',
      mediatype: 'image',
    });

    function read<K extends MetadataFieldKey>(key: K): Metadata[K] {
      return metadata[key];
    }

    // Each of these is typed as its own field class, not a union.
    const collection: string | undefined = read('collection')?.value;
    const added: Date | undefined = read('addeddate')?.value;
    const mediatype: string | undefined = read('mediatype')?.value;

    expect(collection).to.equal('kodi_archive');
    expect(added).to.be.instanceOf(Date);
    expect(mediatype).to.equal('image');
  });

  it('accepts every field name', () => {
    const keys: MetadataFieldKey[] = [
      'collection',
      'addeddate',
      'mediatype',
      'title',
      'item_size',
    ];
    expect(keys).to.have.length(5);
  });

  it('rejects members that are not fields', () => {
    // identifier is a plain string and rawMetadata a plain record, so neither
    // is a field name.
    // @ts-expect-error identifier is not a MetadataField
    const a: MetadataFieldKey = 'identifier';
    // @ts-expect-error rawMetadata is not a MetadataField
    const b: MetadataFieldKey = 'rawMetadata';
    // @ts-expect-error not a member of Metadata at all
    const c: MetadataFieldKey = 'not_a_real_field';
    expect([a, b, c]).to.have.length(3);
  });
});
