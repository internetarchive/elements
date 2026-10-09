import { describe, it, expect } from 'vitest';

import { Review } from './review';

describe('Review', () => {
  it('can be instantiated with a title', async () => {
    const review = new Review({
      reviewtitle: 'It was awesome!',
    });
    expect(review.reviewtitle).to.equal('It was awesome!');
  });

  it('stars get converted to a number', async () => {
    const review = new Review({
      stars: '5',
    });
    expect(review.stars).to.equal(5);
  });

  it('reviewdate get converted to a date', async () => {
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

    expect(review.reviewdate?.getTime()).to.equal(expected.getTime());
  });

  it('handles falsy values properly', async () => {
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

    expect(review.reviewtitle).to.equal('yay');
    expect(review.reviewdate).to.not.be.undefined;
    expect(review.reviewdate?.getTime()).to.equal(expected.getTime());
    expect(review.stars).to.not.be.undefined;
    expect(review.stars).to.equal(0);
  });
});
