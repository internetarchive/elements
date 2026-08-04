import { describe, expect, test } from 'vitest';

import { MediaTypeParser } from './mediatype';

describe('MediaTypeParser', () => {
  test('can parse mediatypes', () => {
    const parser = new MediaTypeParser();
    expect(parser.parseValue('account')).toBe('account');
    expect(parser.parseValue('audio')).toBe('audio');
    expect(parser.parseValue('collection')).toBe('collection');
    expect(parser.parseValue('data')).toBe('data');
    expect(parser.parseValue('etree')).toBe('etree');
    expect(parser.parseValue('image')).toBe('image');
    expect(parser.parseValue('movies')).toBe('movies');
    expect(parser.parseValue('software')).toBe('software');
    expect(parser.parseValue('texts')).toBe('texts');
    expect(parser.parseValue('web')).toBe('web');
  });

  test('returns undefined for number values', () => {
    const parser = new MediaTypeParser();
    const response = parser.parseValue(15);
    expect(response).toBeUndefined();
  });

  test('returns undefined for boolean values', () => {
    const parser = new MediaTypeParser();
    const response = parser.parseValue(true);
    expect(response).toBeUndefined();
  });
});
