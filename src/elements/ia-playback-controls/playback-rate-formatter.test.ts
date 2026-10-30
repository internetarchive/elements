import { describe, expect, test } from 'vitest';

import { formatPlaybackRate } from './playback-rate-formatter';

describe('formatPlaybackRate', () => {
  test('uses the locale’s decimal separator', () => {
    expect(formatPlaybackRate(1.5, 'en-US')).to.equal('1.5');
    expect(formatPlaybackRate(1.5, 'de-DE')).to.equal('1,5');
    expect(formatPlaybackRate(0.75, 'de-DE')).to.equal('0,75');
  });

  test('leaves whole rates without a decimal part', () => {
    expect(formatPlaybackRate(1, 'en-US')).to.equal('1');
    expect(formatPlaybackRate(2, 'de-DE')).to.equal('2');
  });
});
