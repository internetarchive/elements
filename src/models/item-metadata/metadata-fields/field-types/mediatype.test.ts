import { describe, expect, test } from 'vitest';

import { MediaTypeField } from './mediatype';

describe('MediaTypeField Field', () => {
  test('can parse a valid mediatype', () => {
    const field = new MediaTypeField('movies');

    expect(field.value).toBe('movies');
    expect(field.values).toEqual(['movies']);
    expect(field.rawValue).toBe('movies');
  });

  test('can parse an unrecognized mediatype string', () => {
    const field = new MediaTypeField('blah');

    expect(field.value).toBe('blah');
    expect(field.values).toEqual(['blah']);
    expect(field.rawValue).toBe('blah');
  });
});
