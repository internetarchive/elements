import { DateParser } from '../../../field-parsers/field-parsers';
import { describe, it, expect } from 'vitest';
import { TvClipHit } from './tv-clip-hit';
import { DateField } from '../../../item-metadata/item-metadata';

const fieldNames: (keyof TvClipHit)[] = [
  'identifier',
  'ad_id',
  'addeddate',
  'avg_rating',
  'collection',
  'created_on',
  'creator',
  'date',
  'description',
  'downloads',
  'factcheck',
  'filename',
  'file_basename',
  'file_creation_mtime',
  'files_count',
  'highlight',
  'is_clip',
  'issue',
  'item_count',
  'item_size',
  'language',
  'mediatype',
  'num_clips',
  'num_favorites',
  'publicdate',
  'result_in_subfile',
  'reviewdate',
  'source',
  'subject',
  'title',
  'updated_on',
  'week',
  'year',
  'start',
  '__href__',
  '__img__',
];

/**
 * Map from JSON field names to hit field names, for data fields whose name differs
 * between the two.
 */
const hitFieldNameMap: Record<
  string,
  Exclude<keyof TvClipHit, 'identifier' | 'rawMetadata' | 'fields'>
> = {
  nclips: 'num_clips',
  clip: 'is_clip',
};

describe('TvClipHit', () => {
  it('constructs basic tv clip hit', () => {
    const hit = new TvClipHit({ fields: {} });
    expect(hit.rawMetadata).to.deep.equal({ fields: {} });
    expect(hit.creator).to.be.undefined;
  });

  it('handles missing data gracefully', () => {
    const hit = new TvClipHit({});
    for (const key of fieldNames) {
      expect(hit[key]).to.be.undefined;
    }
  });

  it('handles incomplete field data gracefully', () => {
    const hit = new TvClipHit({ fields: {} });
    for (const key of fieldNames) {
      expect(hit[key]).to.be.undefined;
    }
  });

  it('constructs a TV clip hit with all fields', () => {
    const json = {
      fields: {
        identifier: 'foo',
        mediatype: 'texts',
        filename: 'foo-file.txt',
        file_basename: 'foo-file',
        file_creation_mtime: 1161893250,
        files_count: 12,
        updated_on: '2022-04-06T08:34:38Z',
        created_on: '2016-10-09T16:51:05Z',
        title: 'foo-title',
        creator: ['foo-creator'],
        subject: ['foo-subject1', 'foo-subject2'],
        addeddate: '1904-01-01T00:00:00Z',
        avg_rating: 3,
        issue: 'foo-issue',
        item_count: 4,
        item_size: 12345678,
        source: 'foo-source',
        date: '1904-01-01T00:00:00Z',
        reviewdate: '1904-01-01T00:00:00Z',
        publicdate: '2006-10-11T08:19:20Z',
        downloads: 1234,
        collection: ['foo-collection'],
        year: 2011,
        result_in_subfile: false,
        description: 'foo-description',
        start: '52',
        nclips: 5,
        num_favorites: 6,
        week: 123,
        language: ['eng', 'esp'],
        clip: true,
        ad_id: ['foo-ad'],
        factcheck: ['https://foo.bar'],
        __href__: '/details/foo/start/52/end/112?q=bar',
        __img__: '//services/img/foo',
      },
      highlight: {
        text: ['foo {{{bar}}} baz'],
      },
      _score: 1,
    };

    const hit = new TvClipHit(json);
    expect(hit.rawMetadata).to.deep.equal(json);
    expect(hit.identifier).to.equal(json.fields.identifier);

    // Ensure all existing fields are present
    for (const key of Object.keys(json.fields)) {
      if (key === 'identifier') continue;
      const fieldName = key as Exclude<keyof typeof json.fields, 'identifier'>;
      const mappedFieldName = hitFieldNameMap[fieldName] ?? fieldName;

      if (Array.isArray(json.fields[fieldName])) {
        expect(hit[mappedFieldName]?.values).to.deep.equal(
          json.fields[fieldName],
          fieldName,
        );
      } else if (hit[mappedFieldName] instanceof DateField) {
        expect(hit[mappedFieldName]?.value).to.deep.equal(
          DateParser.shared.parseValue(json.fields[fieldName].toString()),
          fieldName,
        );
      } else {
        expect(hit[mappedFieldName]?.value).to.equal(
          json.fields[fieldName],
          fieldName,
        );
      }
    }

    expect(hit.highlight?.values).to.deep.equal(json.highlight.text);
  });

  it('correctly parses falsey boolean/numeric fields', () => {
    const json = {
      fields: {
        identifier: 'foo',
        result_in_subfile: false,
        file_creation_mtime: 0,
        avg_rating: 0,
        downloads: 0,
        year: 0,
      },
      highlight: {
        text: [],
      },
      _score: 0,
    };

    const hit = new TvClipHit(json);
    expect(hit.result_in_subfile?.value).to.be.false;
    expect(hit.file_creation_mtime?.value).to.equal(0);
    expect(hit.avg_rating?.value).to.equal(0);
    expect(hit.downloads?.value).to.equal(0);
    expect(hit.year?.value).to.equal(0);
  });
});
