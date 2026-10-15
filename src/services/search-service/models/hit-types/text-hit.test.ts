import { DateParser } from '../../../field-parsers/field-parsers';
import { describe, it, expect } from 'vitest';
import { TextHit } from './text-hit';
import { DateField } from '../../../item-metadata/item-metadata';

const fieldNames: (keyof TextHit)[] = [
  'identifier',
  'addeddate',
  'avg_rating',
  'collection',
  'created_on',
  'creator',
  'date',
  'description',
  'downloads',
  'filename',
  'file_basename',
  'file_creation_mtime',
  'highlight',
  'issue',
  'mediatype',
  'page_num',
  'publicdate',
  'result_in_subfile',
  'reviewdate',
  'source',
  'subject',
  'title',
  'updated_on',
  'year',
  '__href__',
];

describe('TextHit', () => {
  it('constructs basic text hit', () => {
    const hit = new TextHit({ fields: {} });
    expect(hit.rawMetadata).to.deep.equal({ fields: {} });
    expect(hit.creator).to.be.undefined;
  });

  it('handles missing data gracefully', () => {
    const hit = new TextHit({});
    for (const key of fieldNames) {
      expect(hit[key]).to.be.undefined;
    }
  });

  it('handles incomplete field data gracefully', () => {
    const hit = new TextHit({ fields: {} });
    for (const key of fieldNames) {
      expect(hit[key]).to.be.undefined;
    }
  });

  it('constructs text hit with all fields', () => {
    const json = {
      fields: {
        identifier: 'foo',
        mediatype: 'texts',
        filename: 'foo-file.txt',
        file_basename: 'foo-file',
        file_creation_mtime: 1161893250,
        updated_on: '2022-04-06T08:34:38Z',
        created_on: '2016-10-09T16:51:05Z',
        page_num: 462,
        title: 'foo-title',
        creator: ['foo-creator'],
        subject: ['foo-subject1', 'foo-subject2'],
        addeddate: '1904-01-01T00:00:00Z',
        avg_rating: 3,
        issue: 'foo-issue',
        source: 'foo-source',
        date: '1904-01-01T00:00:00Z',
        reviewdate: '1904-01-01T00:00:00Z',
        publicdate: '2006-10-11T08:19:20Z',
        downloads: 1234,
        collection: ['foo-collection'],
        year: 2011,
        result_in_subfile: false,
        description: 'foo-description',
        __href__: '/details/foo?q=bar',
      },
      highlight: {
        text: ['foo {{{bar}}} baz'],
      },
      _score: 1,
    };

    const hit = new TextHit(json);
    expect(hit.rawMetadata).to.deep.equal(json);
    expect(hit.identifier).to.equal(json.fields.identifier);

    // Ensure all existing fields are present
    for (const key of Object.keys(json.fields)) {
      if (key === 'identifier') continue;
      const fieldName = key as Exclude<keyof typeof json.fields, 'identifier'>;

      if (Array.isArray(json.fields[fieldName])) {
        expect(hit[fieldName]?.values).to.deep.equal(
          json.fields[fieldName],
          fieldName,
        );
      } else if (hit[fieldName] instanceof DateField) {
        expect(hit[fieldName]?.value).to.deep.equal(
          DateParser.shared.parseValue(json.fields[fieldName].toString()),
          fieldName,
        );
      } else {
        expect(hit[fieldName]?.value).to.equal(
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
        page_num: 0,
        avg_rating: 0,
        downloads: 0,
        year: 0,
      },
      highlight: {
        text: [],
      },
      _score: 0,
    };

    const hit = new TextHit(json);
    expect(hit.result_in_subfile?.value).to.be.false;
    expect(hit.file_creation_mtime?.value).to.equal(0);
    expect(hit.page_num?.value).to.equal(0);
    expect(hit.avg_rating?.value).to.equal(0);
    expect(hit.downloads?.value).to.equal(0);
    expect(hit.year?.value).to.equal(0);
  });
});
