import { fixture, waitUntil } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import axe from 'axe-core';
import { html } from 'lit';

import type { IAReviews } from './ia-reviews';
import { Review } from '@internetarchive/metadata-service';
import './ia-reviews';
import { IAReviewForm } from './ia-review-form';
import { IAReview } from './ia-review';

const mockReview1 = new Review({
  stars: 5,
  reviewtitle: 'What a cool book!',
  reviewbody: 'I loved it.',
  reviewer: 'Foo Bar',
  reviewdate: '03/21/2025',
  createdate: '02/07/2025',
  reviewer_itemname: '@foo-bar',
});

const mockReview2 = new Review({
  stars: 2,
  reviewtitle: 'Eh, just ok.',
  reviewbody: 'It is just fine.',
  reviewer: 'Bar Baz',
  reviewdate: '03/20/2025',
  createdate: '03/20/2025',
  reviewer_itemname: '@bar-baz',
});

const mockReviews: Review[] = [mockReview1, mockReview2];

/** Makes `count` reviews by different patrons, newest first, a day apart */
function makeReviews(count: number): Review[] {
  return Array.from(
    { length: count },
    (_, i) =>
      new Review({
        stars: 3,
        reviewtitle: `Review ${i + 1}`,
        reviewbody: 'Some thoughts.',
        reviewer: `Reviewer ${i + 1}`,
        reviewdate: `2025-01-${String(28 - i).padStart(2, '0')}`,
        createdate: `2025-01-${String(28 - i).padStart(2, '0')}`,
        reviewer_itemname: `@reviewer-${i + 1}`,
      }),
  );
}

/** The reviewer names of the reviews in the list, in render order */
function listedReviewers(el: IAReviews): (string | undefined)[] {
  const reviews = el.shadowRoot?.querySelectorAll(
    '.reviews-list > ia-review',
  ) as NodeListOf<IAReview>;
  return [...reviews].map((review) => review.review?.reviewer);
}

/**
 * Where focus is in the list, e.g. "Reviewer 6: reviewer-link". A string keeps a failing
 * assertion readable, where comparing elements prints whole DOM trees.
 */
function focusedSpot(el: IAReviews): string {
  const active = el.shadowRoot?.activeElement;
  if (!(active instanceof IAReview)) return active?.tagName ?? 'nothing';

  const inner = active.shadowRoot?.activeElement;
  return `${active.review?.reviewer}: ${inner?.classList[0] ?? 'host'}`;
}

/** Clicks "Show more" and waits for focus to move to a revealed review */
async function showMore(el: IAReviews): Promise<void> {
  showMoreButton(el)?.click();
  await waitUntil(
    () => el.shadowRoot?.activeElement instanceof IAReview,
    'focus never moved to a revealed review',
  );
}

/** The "Show more" button, if it's rendered */
function showMoreButton(el: IAReviews): HTMLElement | null | undefined {
  return el.shadowRoot?.querySelector<HTMLElement>('.show-more-btn');
}

describe('IAReviews', () => {
  test('passes the a11y audit for the reviews list', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews .reviews=${mockReviews}></ia-reviews>`,
    );

    const { violations } = await axe.run(el);
    expect(violations).toEqual([]);
  });

  test('passes the a11y audit for the review form', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        .reviews=${mockReviews}
        .displayReviewForm=${true}
      ></ia-reviews>`,
    );

    const { violations } = await axe.run(el);
    expect(violations).toEqual([]);
  });

  test('renders all the reviews that are passed to it', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews .reviews=${mockReviews}></ia-reviews>`,
    );

    const reviews = el.shadowRoot?.querySelectorAll('ia-review');
    expect(reviews?.length).to.equal(2);
  });

  test("identifies and splits off the patron's own review, if found", async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        .reviews=${mockReviews}
        .submitterItemname=${'@foo-bar'}
      ></ia-reviews>`,
    );

    const ownReviewContainer = el.shadowRoot?.querySelector(
      '.own-review-container',
    );
    expect(ownReviewContainer).to.exist;

    const ownReview = ownReviewContainer?.querySelector(
      'ia-review',
    ) as IAReview;
    expect(ownReview).to.exist;
    expect(ownReview?.review?.reviewer_itemname).to.equal('@foo-bar');
  });

  test('sorts reviews descending by createdate', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews .reviews=${mockReviews}></ia-reviews>`,
    );

    const reviews = el.shadowRoot?.querySelectorAll(
      'ia-review',
    ) as NodeListOf<IAReview>;
    expect(reviews).to.exist;
    expect(reviews[0].review?.reviewer).to.equal('Bar Baz');
    expect(reviews[1].review?.reviewer).to.equal('Foo Bar');
  });

  test('shows the reviews by default', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews .reviews=${mockReviews}></ia-reviews>`,
    );

    const reviews = el.shadowRoot?.querySelectorAll('ia-review');
    expect(reviews?.length).to.equal(2);
    expect(showMoreButton(el)).not.to.exist;
  });

  test('shows only the 5 newest reviews, with a button for the rest', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews .reviews=${makeReviews(8).reverse()}></ia-reviews>`,
    );

    expect(listedReviewers(el)).toEqual([
      'Reviewer 1',
      'Reviewer 2',
      'Reviewer 3',
      'Reviewer 4',
      'Reviewer 5',
    ]);
    expect(showMoreButton(el)?.textContent?.trim()).toBe('Show 3 more reviews');
  });

  test('uses the singular when only one review is hidden', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews .reviews=${makeReviews(6)}></ia-reviews>`,
    );

    expect(showMoreButton(el)?.textContent?.trim()).toBe('Show 1 more review');
  });

  test('shows no button when there are exactly 5 reviews', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews .reviews=${makeReviews(5)}></ia-reviews>`,
    );

    expect(listedReviewers(el).length).toBe(5);
    expect(showMoreButton(el)).not.to.exist;
  });

  test('shows the rest of the reviews on button click', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews .reviews=${makeReviews(8)}></ia-reviews>`,
    );

    showMoreButton(el)?.click();
    await el.updateComplete;

    expect(listedReviewers(el).length).toBe(8);
    expect(showMoreButton(el)).not.to.exist;
  });

  test("moves focus to the first revealed review's reviewer link on button click", async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews .reviews=${makeReviews(8)}></ia-reviews>`,
    );

    await showMore(el);

    expect(focusedSpot(el)).toBe('Reviewer 6: reviewer-link');
  });

  test('keeps the revealed reviews in the tab order', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews .reviews=${makeReviews(8)}></ia-reviews>`,
    );
    await showMore(el);

    // A tabindex on an ia-review host, even -1, would drop the links inside it from the tab
    // order, since a shadow host with a negative tabindex takes its whole tree out of
    // sequential navigation
    expect(el.shadowRoot?.querySelectorAll('ia-review[tabindex]').length).toBe(
      0,
    );
  });

  test('passes the a11y audit with reviews hidden behind the button', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews .reviews=${makeReviews(8)}></ia-reviews>`,
    );

    const { violations } = await axe.run(el);
    expect(violations).toEqual([]);
  });

  test('uses maxInitialReviews as the cap when set', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        .reviews=${makeReviews(4)}
        .maxInitialReviews=${2}
      ></ia-reviews>`,
    );

    expect(listedReviewers(el)).toEqual(['Reviewer 1', 'Reviewer 2']);
    expect(showMoreButton(el)?.textContent?.trim()).toBe('Show 2 more reviews');
  });

  test("does not count the patron's own review toward the cap", async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        .reviews=${makeReviews(6)}
        .submitterItemname=${'@reviewer-1'}
      ></ia-reviews>`,
    );

    const ownReview = el.shadowRoot?.querySelector(
      '.own-review-container ia-review',
    ) as IAReview;
    expect(ownReview.review?.reviewer).toBe('Reviewer 1');
    expect(listedReviewers(el).length).toBe(5);
    expect(listedReviewers(el)).not.toContain('Reviewer 1');
    expect(showMoreButton(el)).not.to.exist;
  });

  test("drops the patron's extra reviews so they don't count toward the cap", async () => {
    const extraOwnReview = new Review({
      reviewtitle: 'Second try',
      reviewbody: 'Changed my mind.',
      reviewer: 'Reviewer 1',
      reviewdate: '2025-02-01',
      createdate: '2025-02-01',
      reviewer_itemname: '@reviewer-1',
    });
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        .reviews=${[...makeReviews(6), extraOwnReview]}
        .submitterItemname=${'@reviewer-1'}
      ></ia-reviews>`,
    );

    const ownReviews = el.shadowRoot?.querySelectorAll(
      '.own-review-container ia-review',
    );
    expect(ownReviews?.length).toBe(1);
    expect(listedReviewers(el)).not.toContain('Reviewer 1');
    expect(listedReviewers(el).length).toBe(5);
    expect(showMoreButton(el)).not.to.exist;
  });

  test('keeps the cap when the review form opens', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews .reviews=${makeReviews(8)}></ia-reviews>`,
    );

    el.displayReviewForm = true;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('ia-review-form')).to.exist;
    expect(listedReviewers(el).length).toBe(5);
    expect(showMoreButton(el)).to.exist;
  });

  test('shows every review, with no button, if displayReviewsByDefault is set', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        .reviews=${makeReviews(8)}
        ?displayReviewsByDefault=${true}
      ></ia-reviews>`,
    );

    expect(listedReviewers(el).length).toBe(8);
    expect(showMoreButton(el)).not.to.exist;
  });

  test('shows reviews by default if requested', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        .reviews=${mockReviews}
        ?displayReviewsByDefault=${true}
      ></ia-reviews>`,
    );

    const reviews = el.shadowRoot?.querySelectorAll('ia-review');
    expect(reviews?.length).to.equal(2);
  });

  test('displays a message instead of the reviews or review form if there are no reviews yet', async () => {
    const el = await fixture<IAReviews>(html`<ia-reviews></ia-reviews>`);

    const reviewForm = el.shadowRoot?.querySelector(
      'ia-review-form',
    ) as IAReviewForm;
    expect(reviewForm).not.to.exist;

    const noReviewsMsg = el.shadowRoot?.querySelector(
      '.message',
    ) as HTMLDivElement;
    expect(noReviewsMsg).to.exist;
    expect(noReviewsMsg?.innerText).to.include(
      'There are no reviews yet. Be the first one to write a review.',
    );
  });

  test('displays the review form on no reviews button click', async () => {
    const el = await fixture<IAReviews>(html`<ia-reviews></ia-reviews>`);

    const noReviewsBtn = el.shadowRoot?.querySelector(
      '.no-reviews-btn',
    ) as HTMLButtonElement;
    expect(noReviewsBtn).to.exist;
    noReviewsBtn.click();

    await el.updateComplete;
    const reviewForm = el.shadowRoot?.querySelector(
      'ia-review-form',
    ) as IAReviewForm;
    expect(reviewForm).to.exist;
  });

  test('does not display the review form by default', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews .reviews=${mockReviews}></ia-reviews>`,
    );

    const reviewForm = el.shadowRoot?.querySelector(
      'ia-review-form',
    ) as IAReviewForm;
    expect(reviewForm).not.to.exist;
  });

  test('displays the review form if requested', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        .reviews=${mockReviews}
        .displayReviewForm=${true}
      ></ia-reviews>`,
    );

    await el.updateComplete;
    const reviewForm = el.shadowRoot?.querySelector(
      'ia-review-form',
    ) as IAReviewForm;
    expect(reviewForm).to.exist;
    const reviews = el.shadowRoot?.querySelectorAll('ia-review');
    expect(reviews?.length).to.equal(2);
  });

  test('fully disables the reviews if requested', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        .reviews=${mockReviews}
        ?reviewsDisabled=${true}
      ></ia-reviews>`,
    );

    const reviews = el.shadowRoot?.querySelectorAll('ia-review');
    expect(reviews?.length).to.equal(0);

    const disabledMessage = el.shadowRoot?.querySelector(
      '.message',
    ) as HTMLDivElement;
    expect(disabledMessage.innerText).to.include(
      'Reviews have been disabled for this item.',
    );

    const addEditButton = el.shadowRoot?.querySelector('.add-edit-btn');
    expect(addEditButton).not.to.exist;
  });

  test('displays reviews but prevents adding reviews if frozen', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        .reviews=${mockReviews}
        ?reviewsFrozen=${true}
      ></ia-reviews>`,
    );

    const reviews = el.shadowRoot?.querySelectorAll('ia-review');
    expect(reviews?.length).to.equal(2);

    const frozenMessage = el.shadowRoot?.querySelector(
      '.message',
    ) as HTMLDivElement;
    expect(frozenMessage.innerText).to.include(
      'Reviews can no longer be added to this item.',
    );

    const addEditButton = el.shadowRoot?.querySelector('.add-edit-btn');
    expect(addEditButton).not.to.exist;
  });

  test('shows the correct message if reviews frozen and no reviews yet', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews ?reviewsFrozen=${true}></ia-reviews>`,
    );

    const frozenMessage = el.shadowRoot?.querySelector(
      '.message',
    ) as HTMLDivElement;
    expect(frozenMessage.innerText).to.include(
      'Reviews cannot be added to this item.',
    );

    const addEditButton = el.shadowRoot?.querySelector('.add-edit-btn');
    expect(addEditButton).not.to.exist;
  });

  test('closes the review form if requested', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        .reviews=${mockReviews}
        .displayReviewForm=${true}
      ></ia-reviews>`,
    );

    let reviewForm = el.shadowRoot?.querySelector('ia-review-form');
    expect(reviewForm).to.exist;

    const event = new CustomEvent('reviewEditCanceled');
    reviewForm?.dispatchEvent(event);

    await el.updateComplete;

    reviewForm = el.shadowRoot?.querySelector('ia-review-form');
    expect(reviewForm).not.to.exist;
  });

  test('also hides the reviews if the review form is closed and there are no reviews', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews .displayReviewForm=${true}></ia-reviews>`,
    );

    let reviewForm = el.shadowRoot?.querySelector('ia-review-form');
    expect(reviewForm).to.exist;

    const event = new CustomEvent('reviewEditCanceled');
    reviewForm?.dispatchEvent(event);

    await el.updateComplete;

    reviewForm = el.shadowRoot?.querySelector('ia-review-form');
    expect(reviewForm).not.to.exist;
    const noReviewsMsg = el.shadowRoot?.querySelector(
      '.message',
    ) as HTMLDivElement;
    expect(noReviewsMsg).to.exist;
    expect(noReviewsMsg?.innerText).to.include(
      'There are no reviews yet. Be the first one to write a review.',
    );
  });

  test("updates the patron's own review if requested", async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        .reviews=${mockReviews}
        .displayReviewForm=${true}
      ></ia-reviews>`,
    );

    let reviewForm = el.shadowRoot?.querySelector('ia-review-form');
    expect(reviewForm).to.exist;

    const event = new CustomEvent<Review>('reviewUpdated', {
      detail: new Review({
        reviewtitle: 'I am a test!',
        reviewbody: 'Testing 123',
      }),
    });
    reviewForm?.dispatchEvent(event);

    await el.updateComplete;

    reviewForm = el.shadowRoot?.querySelector('ia-review-form');
    expect(reviewForm).not.to.exist;
    const patronsOwnReview = el.shadowRoot?.querySelectorAll(
      'ia-review',
    )[0] as IAReview;
    expect(patronsOwnReview.review?.reviewtitle).to.equal('I am a test!');
    expect(patronsOwnReview?.review?.reviewbody).to.equal('Testing 123');
  });
});
