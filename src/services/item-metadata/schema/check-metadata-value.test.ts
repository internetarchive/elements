import { describe, it, expect } from 'vitest';

import {
  checkMetadataValue,
  isRecommendedDateFormat,
} from './check-metadata-value';

describe('checkMetadataValue', () => {
  it.each([
    ['isbn', '978-0-306-40615-7'],
    ['isbn', '080442957X'],
    ['issn', '0378-5955'],
    ['issn', '2434-561X'],
    ['lccn', '2001012345'],
    ['external-identifier', 'urn:oclc:record:12345'],
    ['external-identifier', 'urn:publisher_catalog_id:88697 03614 2'],
    ['external-identifier', 'acs:epub:urn:uuid:1234'],
    ['utc_offset', '-400'],
    ['openlibrary_edition', 'OL123M'],
    ['openlibrary_work', 'OL45W'],
    ['openlibrary_author', 'OL9A'],
    ['runtime', '1:32:05'],
    ['runtime', '0:09'],
    ['aspect_ratio', '16:9'],
    ['year', '1978'],
    ['licenseurl', 'https://creativecommons.org/licenses/by/4.0/'],
    ['title', 'Tom & Jerry < 3'],
    ['identifier-ark', 'ark:/13960/t53f4ms96'],
    ['page-progression', 'rl'],
    ['condition', 'near mint'],
    ['color', 'sepia'],
    ['boop', 'anything goes'],
  ])('accepts %s = %s', (key, value) => {
    expect(checkMetadataValue(key, value)).toBeUndefined();
  });

  it.each([
    ['isbn', '978-0-306-40615-8', 'invalid-isbn'],
    ['issn', '0378-5956', 'invalid-issn'],
    ['lccn', '20-01', 'invalid-integer'],
    ['openlibrary_edition', 'OL123W', 'invalid-openlibrary-id'],
    ['runtime', '93 minutes', 'invalid-runtime'],
    ['aspect_ratio', 'wide', 'invalid-aspect-ratio'],
    ['year', '78', 'invalid-year'],
    ['licenseurl', 'creativecommons.org', 'invalid-url'],
    ['title', 'A <i>title</i>', 'not-plain-text'],
    ['page-progression', 'tb', 'not-an-allowed-value'],
    ['condition', 'Shiny', 'not-an-allowed-value'],
    ['bookreader-defaults', 'mode/3up', 'not-an-allowed-value'],
  ])('rejects %s = %s as %s', (key, value, problem) => {
    expect(checkMetadataValue(key, value)).toBe(problem);
  });

  it('accepts any text for date, as the schema does', () => {
    expect(checkMetadataValue('date', '1970s')).toBeUndefined();
    expect(checkMetadataValue('date', '[1888?]')).toBeUndefined();
    expect(checkMetadataValue('date', '2013-05-25T00:00:00Z')).toBeUndefined();
  });

  it("doesn't check empty values, which remove the field", () => {
    expect(checkMetadataValue('isbn', '')).toBeUndefined();
    expect(checkMetadataValue('isbn', '   ')).toBeUndefined();
  });
});

describe('isRecommendedDateFormat', () => {
  it.each([
    '1888',
    '1977-05',
    '1977-05-08',
    '1965-1970',
    '[1888]',
    'c.a. 1888',
    'c1888',
    'ca 1888',
    '[n.d.]',
    '1977-05-08 20:00:00',
  ])('recommends %s', (value) => {
    expect(isRecommendedDateFormat(value)).toBe(true);
  });

  it.each(['1977-13', 'May 8, 1977', '1970s', 'someday'])(
    "doesn't recommend %s",
    (value) => {
      expect(isRecommendedDateFormat(value)).toBe(false);
    },
  );
});
