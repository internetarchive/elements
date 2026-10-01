import { fixture } from '@open-wc/testing-helpers';
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

describe('IAReviews', () => {
  test('passes the a11y audit for the reviews list', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        .reviews=${mockReviews}
        .displayReviews=${true}
      ></ia-reviews>`,
    );

    const { violations } = await axe.run(el);
    expect(violations).toEqual([]);
  });

  test('passes the a11y audit for the review form', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        .reviews=${mockReviews}
        .displayReviews=${true}
        .displayReviewForm=${true}
      ></ia-reviews>`,
    );

    const { violations } = await axe.run(el);
    expect(violations).toEqual([]);
  });

  test('renders all the reviews that are passed to it', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        .reviews=${mockReviews}
        .displayReviews=${true}
      ></ia-reviews>`,
    );

    const reviews = el.shadowRoot?.querySelectorAll('ia-review');
    expect(reviews?.length).to.equal(2);
  });

  test("identifies and splits off the patron's own review, if found", async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        .reviews=${mockReviews}
        .submitterItemname=${'@foo-bar'}
        .displayReviews=${true}
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
      html`<ia-reviews
        .reviews=${mockReviews}
        .displayReviews=${true}
      ></ia-reviews>`,
    );

    const reviews = el.shadowRoot?.querySelectorAll(
      'ia-review',
    ) as NodeListOf<IAReview>;
    expect(reviews).to.exist;
    expect(reviews[0].review?.reviewer).to.equal('Bar Baz');
    expect(reviews[1].review?.reviewer).to.equal('Foo Bar');
  });

  test('displays a message instead of the reviews by default', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews .reviews=${mockReviews}></ia-reviews>`,
    );

    const reviews = el.shadowRoot?.querySelectorAll('ia-review');
    expect(reviews?.length).to.equal(0);
    const displayReviewsMsg = el.shadowRoot?.querySelector(
      '.message',
    ) as HTMLDivElement;
    expect(displayReviewsMsg).to.exist;
    expect(displayReviewsMsg?.innerText).to.include(
      'There are 2 reviews for this item. Display reviews.',
    );
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

  test('displays the reviews on button click', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews .reviews=${mockReviews}></ia-reviews>`,
    );

    const displayReviewsBtn = el.shadowRoot?.querySelector(
      '.display-reviews-btn',
    ) as HTMLButtonElement;
    expect(displayReviewsBtn).to.exist;
    displayReviewsBtn?.click();

    await el.updateComplete;
    const reviews = el.shadowRoot?.querySelectorAll('ia-review');
    expect(reviews?.length).to.equal(2);
  });

  test('does not display the review form by default', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        .reviews=${mockReviews}
        .displayReviews=${true}
      ></ia-reviews>`,
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
        .displayReviews=${true}
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
        .displayReviews=${true}
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
      html`<ia-reviews
        .displayReviewForm=${true}
        .displayReviews=${true}
      ></ia-reviews>`,
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
        .displayReviews=${true}
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
