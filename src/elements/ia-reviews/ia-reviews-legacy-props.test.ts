import { fixture, waitUntil } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import { Review } from '@internetarchive/metadata-service';

import type { IAReviews } from './ia-reviews';
import type { IAReview } from './ia-review';
import './ia-reviews';
import { MockFetchHandler } from './mocks/mock-fetch-handler';
import { MockReviewService } from './mocks/mock-review-service';

const ownReview = new Review({
  stars: 5,
  reviewtitle: 'What a cool book!',
  reviewbody: 'I loved it.',
  reviewer: 'Foo Bar',
  reviewdate: '03/21/2025',
  createdate: '02/07/2025',
  reviewer_itemname: '@foo-bar',
});

const otherReview = new Review({
  stars: 2,
  reviewtitle: 'Eh, just ok.',
  reviewbody: 'It is just fine.',
  reviewer: 'Bar Baz',
  reviewdate: '03/20/2025',
  createdate: '03/20/2025',
  reviewer_itemname: '@bar-baz',
});

const jsonOk = () =>
  new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

/** The props offshoot's details page passes */
const offshootProps = {
  token: 'csrf-abc',
  baseHost: 'https://archive.org',
  endpointPath: '/write-review.php',
};

const renderOffshootStyle = (extra = {}) =>
  fixture<IAReviews>(
    html`<ia-reviews
      identifier="foo"
      .reviews=${[ownReview, otherReview]}
      .submitterItemname=${'@foo-bar'}
      .submitterScreenname=${'Foo Bar'}
      .baseHost=${offshootProps.baseHost}
      .token=${offshootProps.token}
      endpointPath=${offshootProps.endpointPath}
      displayReviewsByDefault
      bypassRecaptcha
      .canDelete=${true}
      .displayReviewForm=${false}
      .reviewSubmissionError=${undefined}
      .reviewService=${(extra as { reviewService?: MockReviewService })
        .reviewService}
    ></ia-reviews>`,
  );

const submitForm = async (el: IAReviews) => {
  el.displayReviewForm = true;
  await el.updateComplete;
  const form = el.shadowRoot?.querySelector('ia-review-form');
  await (form as HTMLElement & { updateComplete: Promise<boolean> })
    .updateComplete;
  (
    form?.shadowRoot?.querySelector('ia-button.submit-btn') as HTMLElement
  ).click();
};

describe('IAReviews with the 1.2.1 props', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('reads: renders the reviews the host passes', async () => {
    const el = await renderOffshootStyle();

    const reviews = el.shadowRoot?.querySelectorAll('ia-review');
    expect(reviews?.length).to.equal(2);
  });

  test('adds: posts the 1.2.1 form body to baseHost + endpointPath', async () => {
    const fetchSpy = vi.spyOn(window, 'fetch').mockResolvedValue(jsonOk());
    const el = await renderOffshootStyle();

    await submitForm(el);
    await waitUntil(() => fetchSpy.mock.calls.length > 0);

    const [url, init] = fetchSpy.mock.calls[0];
    expect(String(url)).to.equal('https://archive.org/write-review.php');
    expect(init?.method).to.equal('POST');
    expect(init?.credentials).to.equal('include');
    expect(new Headers(init?.headers).has('X-CSRF-Token')).to.be.false;
    expect(String(init?.body)).to.equal(
      'field_stars=5&field_reviewtitle=What+a+cool+book%21&field_reviewbody=I+loved+it.' +
        '&field_reviewtoken=csrf-abc&identifier=foo&submitter=review-form',
    );
  });

  test('adds: reports the success back to the host', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValue(jsonOk());
    const el = await renderOffshootStyle();

    await submitForm(el);
    await waitUntil(
      () => !el.shadowRoot?.querySelector('ia-review-form'),
      'the form never closed',
    );

    expect(el.displayReviewForm).to.be.false;
  });

  test('adds: surfaces the error the endpoint reports', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: false, error: 'Nope.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    const el = await renderOffshootStyle();

    await submitForm(el);
    const form = el.shadowRoot?.querySelector('ia-review-form');
    await waitUntil(() =>
      form?.shadowRoot?.querySelector('.recoverable-error'),
    );

    expect(
      form?.shadowRoot?.querySelector('.recoverable-error')?.textContent,
    ).to.contain('Nope.');
  });

  test('deletes: posts the 1.2.1 query string to edit-reviews.php', async () => {
    const fetchSpy = vi.spyOn(window, 'fetch').mockResolvedValue(jsonOk());
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const el = await renderOffshootStyle();

    const review = el.shadowRoot?.querySelectorAll('ia-review')[1] as IAReview;
    (review.shadowRoot?.querySelector('.delete-btn') as HTMLElement).click();
    await waitUntil(() => review.shadowRoot?.querySelector('.body i'));

    const [url, init] = fetchSpy.mock.calls[0];
    expect(String(url)).to.equal(
      'https://archive.org/edit-reviews.php?identifier=foo&deleteReviewer=Bar+Baz' +
        '&deleteReviewerItemname=%40bar-baz&csrf_token=csrf-abc',
    );
    expect(init).to.deep.equal({ method: 'POST' });
    expect(review.shadowRoot?.querySelector('.body')?.textContent).to.contain(
      'queued for deletion',
    );
  });

  test('honors a custom endpointPath', async () => {
    const fetchSpy = vi.spyOn(window, 'fetch').mockResolvedValue(jsonOk());
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        identifier="foo"
        .reviews=${[ownReview]}
        .submitterItemname=${'@foo-bar'}
        endpointPath="/custom-write.php"
        token="t"
        bypassRecaptcha
      ></ia-reviews>`,
    );

    await submitForm(el);
    await waitUntil(() => fetchSpy.mock.calls.length > 0);

    expect(String(fetchSpy.mock.calls[0][0])).to.equal(
      'https://archive.org/custom-write.php',
    );
  });

  test('sends requests through a supplied fetchHandler, token attached', async () => {
    const fetchHandler = new MockFetchHandler();
    const el = await fixture<IAReviews>(
      html`<ia-reviews
        identifier="foo"
        .reviews=${[ownReview]}
        .submitterItemname=${'@foo-bar'}
        .fetchHandler=${fetchHandler}
        token="t"
        bypassRecaptcha
      ></ia-reviews>`,
    );

    await submitForm(el);
    await waitUntil(() => fetchHandler.apiFetches.length > 0);

    expect(fetchHandler.apiFetches[0].url).to.equal(
      'https://archive.org/write-review.php',
    );
    expect(fetchHandler.apiFetches[0].options?.method).to.equal('POST');
    expect(fetchHandler.apiFetches[0].options?.includeCredentials).to.be.true;
    expect(
      new URLSearchParams(String(fetchHandler.apiFetches[0].options?.body)).get(
        'field_reviewtoken',
      ),
    ).to.equal('t');
  });

  test('a reviewService wins over the old props', async () => {
    const fetchSpy = vi.spyOn(window, 'fetch').mockResolvedValue(jsonOk());
    const reviewService = new MockReviewService();
    const el = await renderOffshootStyle({ reviewService });

    await submitForm(el);
    await waitUntil(() => reviewService.submissions.length > 0);

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
