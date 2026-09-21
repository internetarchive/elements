import { describe, expect, test } from 'vitest';
import linkUrlsInText from './link-urls-in-text';

describe('linkUrlsInText', () => {
  test('leaves a string with no URLs unchanged', () => {
    expect(linkUrlsInText('I am a test')).to.equal('I am a test');
  });

  test('preserves existing URLs in the text', () => {
    expect(linkUrlsInText('I am a <a href="archive.org">test</a>')).to.equal(
      'I am a <a href="archive.org">test</a>',
    );
  });

  test('preserves an existing link with a path or querystring', () => {
    expect(
      linkUrlsInText(
        'I am a <a href="https://archive.org/details/foo">test</a>',
      ),
    ).to.equal('I am a <a href="https://archive.org/details/foo">test</a>');

    expect(
      linkUrlsInText('I am a <a href="archive.org/search?query=test">test</a>'),
    ).to.equal('I am a <a href="archive.org/search?query=test">test</a>');
  });

  test('preserves an existing link that carries other attributes', () => {
    expect(
      linkUrlsInText('I am a <a href="archive.org" rel="nofollow">test</a>'),
    ).to.equal('I am a <a href="archive.org" rel="nofollow">test</a>');

    expect(
      linkUrlsInText('I am a <a rel="nofollow" href="archive.org">test</a>'),
    ).to.equal('I am a <a rel="nofollow" href="archive.org">test</a>');
  });

  test('leaves an href alone when there is no hostname to link', () => {
    expect(linkUrlsInText('I am a <a href="localhost">test</a>')).to.equal(
      'I am a <a href="localhost">test</a>',
    );

    expect(linkUrlsInText('I am a <a href="">test</a>')).to.equal(
      'I am a <a href="">test</a>',
    );
  });

  test('converts URLs from text into live links', () => {
    expect(linkUrlsInText('I am a test for archive.org')).to.equal(
      'I am a test for <a href="https://archive.org" rel="ugc nofollow" target="_blank">archive.org</a>',
    );
  });

  test('preserves existing URLs while converting others', () => {
    expect(
      linkUrlsInText('I am a <a href="archive.org">test</a> for archive.org'),
    ).to.equal(
      'I am a <a href="archive.org">test</a> for <a href="https://archive.org" rel="ugc nofollow" target="_blank">archive.org</a>',
    );
  });

  test('does not add extra https to links that already have it', () => {
    expect(linkUrlsInText('I am a test for https://archive.org')).to.equal(
      'I am a test for <a href="https://archive.org" rel="ugc nofollow" target="_blank">https://archive.org</a>',
    );

    expect(linkUrlsInText('I am a test for http://archive.org')).to.equal(
      'I am a test for <a href="http://archive.org" rel="ugc nofollow" target="_blank">http://archive.org</a>',
    );
  });

  test('does add https for links that include but do not start with it', () => {
    expect(
      linkUrlsInText('I am a test for archive.org/details/https-info'),
    ).to.equal(
      'I am a test for <a href="https://archive.org/details/https-info" rel="ugc nofollow" target="_blank">archive.org/details/https-info</a>',
    );
  });
  test('does not let a quote in a URL escape the href attribute', () => {
    const linked = linkUrlsInText('Check archive.org/x"onmouseover="alert(1)');

    // The quote ends the URL, so what follows stays text rather than becoming
    // another attribute on the anchor.
    expect(linked).to.not.contain('onmouseover="alert(1)"');
    expect(linked).to.contain('<a href="https://archive.org/x"');
  });

  test('does not let angle brackets into a URL', () => {
    expect(linkUrlsInText('see archive.org/a<b')).to.not.contain(
      'href="https://archive.org/a<b"',
    );
  });
});
