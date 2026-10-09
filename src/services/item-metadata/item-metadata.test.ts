import { describe, expect, it } from 'vitest';
import * as itemMetadata from './item-metadata';

describe('item-metadata entry point', () => {
  it('exports the models and the field types', () => {
    for (const name of [
      'File',
      'Metadata',
      'Review',
      'MetadataField',
      'AspectRatioField',
      'BooleanField',
      'ByteField',
      'DateField',
      'DurationField',
      'ListField',
      'MediaTypeField',
      'NumberField',
      'PageProgressionField',
      'StringField',
    ]) {
      expect(itemMetadata, name).to.have.property(name);
    }
  });

  it('builds a Metadata from raw values', () => {
    const metadata = new itemMetadata.Metadata({
      identifier: 'foo',
      downloads: '42',
    });

    expect(metadata.identifier).to.equal('foo');
    expect(metadata.downloads?.value).to.equal(42);
  });
});
