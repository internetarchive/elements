import { describe, expect, test } from 'vitest';

import { File } from './file';

describe('File', () => {
  test('can be instantiated with an object', () => {
    const file = new File({ name: 'foo.jpg' });
    expect(file.name).toBe('foo.jpg');
  });

  test('properly instantiates modeled fields', () => {
    const file = new File({
      name: 'foo.jpg',
      size: '1234',
      length: '1:23',
      height: '1080',
      width: '1920',
      track: '1',
    });
    expect(file.size).toBe(1234);
    expect(file.length).toBe(83);
    expect(file.height).toBe(1080);
    expect(file.width).toBe(1920);
    expect(file.track).toBe(1);
  });

  test('external_identifier can be a single value', () => {
    const file = new File({ name: 'foo.jpg', external_identifier: 'bar' });
    expect(file.external_identifier).toBe('bar');
  });

  test('external_identifier can be an array', () => {
    const file = new File({
      name: 'foo.jpg',
      external_identifier: ['foo', 'bar'],
    });
    expect(file.external_identifier).toEqual(['foo', 'bar']);
  });

  test('handles falsy values properly', () => {
    const file = new File({
      name: 'foo.jpg',
      size: 0,
      track: 0,
    });
    expect(file.size).toBeDefined();
    expect(file.size).toBe(0);
    expect(file.track).toBeDefined();
    expect(file.track).toBe(0);
  });

  test('parses mtime properly', () => {
    const file = new File({
      name: 'foo.jpg',
      mtime: '1639591034',
    });
    expect(file.mtime).toBeDefined();
    expect(file.mtime instanceof Date).toBe(true);
    expect(file.mtime?.getTime()).toBe(1639591034000);
  });
});
