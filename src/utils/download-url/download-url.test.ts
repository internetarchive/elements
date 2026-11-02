import { describe, expect, test } from 'vitest';
import { downloadUrl } from './download-url';

describe('downloadUrl', () => {
  test('builds a plain file URL on archive.org', () => {
    expect(downloadUrl('my-item', 'file.jpg')).to.equal(
      'https://archive.org/download/my-item/file.jpg',
    );
  });

  test('encodes #, ? and %', () => {
    expect(downloadUrl('my-item', 'a #1?.jpg')).to.equal(
      'https://archive.org/download/my-item/a%20%231%3F.jpg',
    );
    expect(downloadUrl('my-item', '100%.jpg')).to.equal(
      'https://archive.org/download/my-item/100%25.jpg',
    );
  });

  test('encodes spaces and non-Latin characters', () => {
    expect(downloadUrl('my-item', 'お 寿司.jpg')).to.equal(
      'https://archive.org/download/my-item/%E3%81%8A%20%E5%AF%BF%E5%8F%B8.jpg',
    );
  });

  test('keeps / between subfolders and encodes each segment', () => {
    expect(downloadUrl('my-item', 'slides #2/page 1?.jpg')).to.equal(
      'https://archive.org/download/my-item/slides%20%232/page%201%3F.jpg',
    );
  });

  test('round-trips through the URL parser', () => {
    const name = 'a/b #c?d%e/ふ.jpg';
    const url = new URL(downloadUrl('my-item', name));
    expect(url.hash).to.equal('');
    expect(url.search).to.equal('');
    expect(decodeURIComponent(url.pathname)).to.equal(
      `/download/my-item/${name}`,
    );
  });

  test('uses the given base host', () => {
    expect(downloadUrl('my-item', 'f.jpg', 'https://example.org')).to.equal(
      'https://example.org/download/my-item/f.jpg',
    );
    expect(downloadUrl('my-item', 'f.jpg', 'https://example.org/')).to.equal(
      'https://example.org/download/my-item/f.jpg',
    );
  });

  test('an empty base host gives a root-relative URL', () => {
    expect(downloadUrl('my-item', 'f.jpg', '')).to.equal(
      '/download/my-item/f.jpg',
    );
  });

  test('without a file name returns the item download directory', () => {
    expect(downloadUrl('my-item')).to.equal(
      'https://archive.org/download/my-item',
    );
    expect(downloadUrl('my-item', '', '')).to.equal('/download/my-item');
  });

  test('keeps a trailing slash on a folder name', () => {
    expect(downloadUrl('my-item', 'slides/')).to.equal(
      'https://archive.org/download/my-item/slides/',
    );
  });
});
