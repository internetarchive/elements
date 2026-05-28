import { describe, expect, test } from 'vitest';

import { Review } from './review';

describe('Review', () => {
  test('can be instantiated with a title', () => {
    const review = new Review({
      reviewtitle: 'It was awesome!',
    });
    expect(review.reviewtitle).toBe('It was awesome!');
  });

  test('stars get converted to a number', () => {
    const review = new Review({
      stars: '5',
    });
    expect(review.stars).toBe(5);
  });

  test('reviewdate get converted to a date', () => {
    const review = new Review({
      reviewdate: '2014-05-09 09:47:15',
    });

    const expected = new Date();
    expected.setHours(9);
    expected.setMinutes(47);
    expected.setSeconds(15);
    expected.setMilliseconds(0);
    expected.setMonth(4);
    expected.setDate(9);
    expected.setFullYear(2014);

    expect(review.reviewdate?.getTime()).toBe(expected.getTime());
  });

  test('handles falsy values properly', () => {
    const review = new Review({
      reviewtitle: 'yay',
      reviewdate: '0',
      stars: 0,
    });

    const expected = new Date();
    expected.setHours(0);
    expected.setMinutes(0);
    expected.setSeconds(0);
    expected.setMilliseconds(0);
    expected.setMonth(0);
    expected.setDate(1);
    expected.setFullYear(2000);

    expect(review.reviewtitle).toBe('yay');
    expect(review.reviewdate).toBeDefined();
    expect(review.reviewdate?.getTime()).toBe(expected.getTime());
    expect(review.stars).toBeDefined();
    expect(review.stars).toBe(0);
  });
});
