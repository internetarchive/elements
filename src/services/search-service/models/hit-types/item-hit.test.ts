import { DateParser } from '../../../field-parsers/field-parsers';
import { describe, it, expect } from 'vitest';
import { ItemHit } from './item-hit';
import { DateField } from '../../../item-metadata/item-metadata';

const fieldNames: (keyof ItemHit)[] = [
  'identifier',
  'addeddate',
  'avg_rating',
  'collection',
  'collection_files_count',
  'collection_size',
  'creator',
  'date',
  'description',
  'downloads',
  'files_count',
  'genre',
  'indexflag',
  'issue',
  'item_count',
  'item_size',
  'lending___available_to_borrow',
  'lending___available_to_browse',
  'lending___available_to_waitlist',
  'lending___status',
  'language',
  'licenseurl',
  'mediatype',
  'month',
  'noindex',
  'num_favorites',
  'num_reviews',
  'publicdate',
  'reviewdate',
  'source',
  'subject',
  'title',
  'type',
  'volume',
  'week',
  'year',
];

describe('ItemHit', () => {
  it('constructs basic item hit', () => {
    const hit = new ItemHit({ fields: {} });
    expect(hit.rawMetadata).to.deep.equal({ fields: {} });

    // Small selection of fields
    expect(hit.creator).to.be.undefined;
    expect(hit.date).to.be.undefined;
    expect(hit.description).to.be.undefined;
    expect(hit.subject).to.be.undefined;
    expect(hit.title).to.be.undefined;
  });

  it('handles missing data gracefully', () => {
    const hit = new ItemHit({});
    for (const key of fieldNames) {
      expect(hit[key]).to.be.undefined;
    }
  });

  it('handles incomplete field data gracefully', () => {
    const hit = new ItemHit({ fields: {} });
    for (const key of fieldNames) {
      expect(hit[key]).to.be.undefined;
    }
  });

  it('constructs item hit with partial fields', () => {
    const json = {
      fields: {
        identifier: 'foo',
        title: 'foo-title',
        description: 'foo-description',
        subject: ['foo-subject1', 'foo-subject2'],
        creator: ['foo-creator'],
        collection: ['foo-collection'],
        date: '2011-07-20T00:00:00Z',
        year: 2011,
        mediatype: 'movies',
        item_size: 123456,
        files_count: 5,
        downloads: 123,
        week: 2,
        month: 15,
        indexflag: ['index', 'nonoindex'],
        lending___available_to_borrow: false,
        lending___available_to_browse: false,
        lending___available_to_waitlist: false,
      },
      highlight: null,
      _score: 1,
    };

    const hit = new ItemHit(json);
    expect(hit.rawMetadata).to.deep.equal(json);
    expect(hit.identifier).to.equal(json.fields.identifier);

    // Ensure all existing fields are present
    for (const key of Object.keys(json.fields)) {
      if (key === 'identifier') continue;
      const fieldName = key as Exclude<keyof typeof json.fields, 'identifier'>;

      if (Array.isArray(json.fields[fieldName])) {
        expect(hit[fieldName]?.values).to.deep.equal(json.fields[fieldName]);
      } else if (hit[fieldName] instanceof DateField) {
        expect(hit[fieldName]?.value).to.deep.equal(
          DateParser.shared.parseValue(json.fields[fieldName].toString()),
        );
      } else {
        expect(hit[fieldName]?.value).to.equal(json.fields[fieldName]);
      }
    }

    expect(hit.addeddate?.value).to.be.undefined;
    expect(hit.avg_rating?.value).to.be.undefined;
    expect(hit.collection_files_count?.value).to.be.undefined;
    expect(hit.collection_size?.value).to.be.undefined;
    expect(hit.issue?.value).to.be.undefined;
    expect(hit.item_count?.value).to.be.undefined;
    expect(hit.genre?.value).to.be.undefined;
    expect(hit.language?.value).to.be.undefined;
    expect(hit.lending___status?.value).to.be.undefined;
    expect(hit.licenseurl?.value).to.be.undefined;
    expect(hit.noindex?.value).to.be.undefined;
    expect(hit.num_favorites?.value).to.be.undefined;
    expect(hit.num_reviews?.value).to.be.undefined;
    expect(hit.publicdate?.value).to.be.undefined;
    expect(hit.reviewdate?.value).to.be.undefined;
    expect(hit.source?.value).to.be.undefined;
    expect(hit.type?.value).to.be.undefined;
    expect(hit.volume?.value).to.be.undefined;
  });

  it('constructs item hit with all fields', () => {
    const json = {
      fields: {
        identifier: 'foo',
        title: 'foo-title',
        description: 'foo-description',
        subject: ['foo-subject1', 'foo-subject2'],
        creator: ['foo-creator'],
        collection: ['foo-collection'],
        date: '2011-07-20T00:00:00Z',
        year: 2011,
        mediatype: 'movies',
        item_size: 123456,
        files_count: 5,
        downloads: 123,
        week: 2,
        month: 11,
        indexflag: ['index', 'nonoindex'],
        lending___available_to_borrow: false,
        lending___available_to_browse: false,
        lending___available_to_waitlist: false,
        lending___status: 'foo-status',
        addeddate: '2011-07-20T00:00:00Z',
        avg_rating: 3,
        collection_files_count: 124,
        collection_size: 125,
        genre: 'foo-genre',
        issue: 'foo-issue',
        item_count: 0,
        language: 'foo-language',
        licenseurl: 'foo-license',
        noindex: true,
        num_favorites: 126,
        num_reviews: 127,
        publicdate: '2011-07-20T00:00:00Z',
        reviewdate: '2011-07-20T00:00:00Z',
        source: 'foo-source',
        type: 'foo-type',
        volume: 'foo-volume',
      },
      highlight: null,
      _score: 1,
    };

    const hit = new ItemHit(json);
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
  });

  it('correctly parses falsey boolean/numeric fields', () => {
    const json = {
      fields: {
        identifier: 'foo',
        lending___available_to_borrow: false,
        lending___available_to_browse: false,
        lending___available_to_waitlist: false,
        noindex: false,
        item_size: 0,
        files_count: 0,
        downloads: 0,
        week: 0,
        month: 0,
        year: 0,
        avg_rating: 0,
        collection_files_count: 0,
        collection_size: 0,
        item_count: 0,
        num_favorites: 0,
        num_reviews: 0,
      },
      highlight: null,
      _score: 0,
    };

    const hit = new ItemHit(json);
    expect(hit.lending___available_to_borrow?.value).to.be.false;
    expect(hit.lending___available_to_browse?.value).to.be.false;
    expect(hit.lending___available_to_waitlist?.value).to.be.false;
    expect(hit.noindex?.value).to.be.false;
    expect(hit.item_size?.value).to.equal(0);
    expect(hit.files_count?.value).to.equal(0);
    expect(hit.downloads?.value).to.equal(0);
    expect(hit.week?.value).to.equal(0);
    expect(hit.month?.value).to.equal(0);
    expect(hit.year?.value).to.equal(0);
    expect(hit.avg_rating?.value).to.equal(0);
    expect(hit.collection_files_count?.value).to.equal(0);
    expect(hit.collection_size?.value).to.equal(0);
    expect(hit.item_count?.value).to.equal(0);
    expect(hit.num_favorites?.value).to.equal(0);
    expect(hit.num_reviews?.value).to.equal(0);
  });

  it('correctly creates Review objects', () => {
    const json = {
      fields: {
        identifier: 'foo',
      },
      review: {
        reviewbody: 'foo bar baz',
        reviewtitle: 'Foo Bar',
        reviewer: 'Baz Quux',
        reviewer_itemname: '@bazquux',
        reviewdate: '2010-01-02 03:04:05',
        createdate: '2011-02-03 04:05:06',
        stars: '5',
        __href__: 'https://example.com?reviewid=123',
      },
      highlight: null,
      _score: 1,
    };

    const hit = new ItemHit(json);
    expect(hit.review).to.exist;
    expect(hit.review?.stars).to.equal(5);
    expect(hit.review?.reviewdate).to.be.instanceOf(Date);
    expect(hit.review?.reviewdate?.getTime()).to.equal(
      new Date('2010-01-02 03:04:05').getTime(),
    );
    expect(hit.review?.createdate).to.be.instanceOf(Date);
    expect(hit.review?.__href__).to.equal('https://example.com?reviewid=123');
  });

  it('correctly does not have review if one not provided', () => {
    const json = {
      fields: {
        identifier: 'foo',
      },
      highlight: null,
      _score: 1,
    };

    const hit = new ItemHit(json);
    expect(hit.review).to.be.undefined;
  });
});
