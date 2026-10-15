import { describe, expect, test } from 'vitest';

import { formatUrl, makeBooleanString, toSentenceCase } from './helpers';

describe('formatUrl', () => {
  test('prefixes a relative path with the base host', () => {
    expect(formatUrl('/details/texts', 'https://archive.org')).to.equal(
      'https://archive.org/details/texts',
    );
  });

  test('leaves a relative path relative when the base host is empty', () => {
    expect(formatUrl('/details/texts', '')).to.equal('/details/texts');
  });

  test.each(['https://web.archive.org/', 'http://example.com/a'])(
    'passes %s through untouched',
    (url) => {
      expect(formatUrl(url, 'https://archive.org')).to.equal(url);
    },
  );

  test('treats a missing url as the base host itself', () => {
    expect(formatUrl(undefined, 'https://archive.org')).to.equal(
      'https://archive.org',
    );
  });
});

describe('makeBooleanString', () => {
  test('maps booleans to the aria attribute strings', () => {
    expect(makeBooleanString(true)).to.equal('true');
    expect(makeBooleanString(false)).to.equal('false');
  });
});

describe('toSentenceCase', () => {
  test.each([
    ['web', 'Web'],
    ['mobile apps', 'MobileApps'],
    ['browser extensions list', 'BrowserExtensionsList'],
    ['', ''],
  ])('turns %j into %j', (phrase, expected) => {
    expect(toSentenceCase(phrase)).to.equal(expected);
  });
});
