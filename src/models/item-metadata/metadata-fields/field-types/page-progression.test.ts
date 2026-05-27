import { describe, expect, test } from 'vitest';

import { PageProgressionField } from './page-progression';

describe('PageProgressionField', () => {
  test('can parse a page progression', () => {
    const field = new PageProgressionField('rl');

    expect(field.value).toBe('rl');
    expect(field.values).toEqual(['rl']);
    expect(field.rawValue).toBe('rl');
  });

  test('accepts any value', () => {
    const field = new PageProgressionField('blah');

    expect(field.value).toBe('blah');
    expect(field.values).toEqual(['blah']);
    expect(field.rawValue).toBe('blah');
  });
});
