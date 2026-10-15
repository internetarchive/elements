import { describe, it, expect } from 'vitest';

import {
  fieldSchema,
  isUserEditableField,
  metadataSchema,
} from './metadata-schema';

describe('metadataSchema', () => {
  it('describes documented fields', () => {
    expect(metadataSchema.isbn).toEqual({
      type: 'isbn',
      repeatable: true,
      access: 'user',
    });
    expect(metadataSchema.title.type).toBe('plain-text');
    expect(metadataSchema.year.deprecated).toBe(true);
    expect(metadataSchema['page-progression'].values).toEqual({
      options: ['lr', 'rl'],
      closed: true,
    });
  });

  it('builds sort-by from both directions of each key', () => {
    const options = metadataSchema['sort-by'].values?.options ?? [];
    expect(options).toContain('titleSorter');
    expect(options).toContain('-titleSorter');
    expect(options).toHaveLength(14);
  });

  it('is frozen', () => {
    expect(Object.isFrozen(metadataSchema)).toBe(true);
  });
});

describe('fieldSchema', () => {
  it('returns the documented entry', () => {
    expect(fieldSchema('mediatype').access).toBe('admin');
    expect(fieldSchema('addeddate').access).toBe('system');
    expect(fieldSchema('uploader').access).toBe('admin');
    expect(fieldSchema('start_time').access).toBe('admin');
  });

  it('treats pipeline-written families as system fields', () => {
    expect(fieldSchema('ocr_module_version').access).toBe('system');
    expect(fieldSchema('republisher_whatever').access).toBe('system');
    expect(fieldSchema('tts_version').access).toBe('system');
  });

  it('treats anything else as a custom user field', () => {
    expect(fieldSchema('boop')).toEqual({
      type: 'text',
      repeatable: true,
      access: 'user',
    });
  });

  it("doesn't mistake Object.prototype members for fields", () => {
    expect(fieldSchema('constructor').access).toBe('user');
    expect(fieldSchema('toString').type).toBe('text');
  });
});

describe('isUserEditableField', () => {
  it.each([
    'title',
    'year',
    'scanner',
    'noindex',
    'firstfiledate',
    'custom_field',
  ])('%s is user-editable', (key) => {
    expect(isUserEditableField(key)).toBe(true);
  });

  it.each(['collection', 'identifier', 'addeddate', 'uploader', 'ocr_x'])(
    '%s is not',
    (key) => {
      expect(isUserEditableField(key)).toBe(false);
    },
  );
});
