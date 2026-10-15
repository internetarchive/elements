import { fixture, waitUntil } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import { Review } from '@internetarchive/metadata-service';

import type { IAReview } from './ia-review';
import type { IAReviewForm } from './ia-review-form';
import './ia-review';
import './ia-review-form';
import { MockFetchHandler } from './mocks/mock-fetch-handler';
import { MockReviewService } from './mocks/mock-review-service';

const review = new Review({
  stars: 2,
  reviewtitle: 'Eh, just ok.',
  reviewbody: 'It is just fine.',
  reviewer: 'Bar Baz',
  reviewdate: '03/20/2025',
  createdate: '03/20/2025',
  reviewer_itemname: '@bar-baz',
});

const oldReview = new Review({
  stars: 5,
  reviewtitle: 'A title',
  reviewbody: 'A body',
  reviewer: 'Foo Bar',
  reviewdate: '03/21/2025',
  createdate: '02/07/2025',
  reviewer_itemname: '@foo-bar',
});

const jsonOk = () =>
  new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

const submit = async (form: IAReviewForm) => {
  await form.updateComplete;
  (
    form.shadowRoot?.querySelector('ia-button.submit-btn') as HTMLElement
  ).click();
};

describe('ia-review-form with the 1.2.1 props', () => {
  test('submits through the fetchHandler to baseHost + endpointPath with the token in the body', async () => {
    const fetchHandler = new MockFetchHandler();
    const form = await fixture<IAReviewForm>(
      html`<ia-review-form
        identifier="foo"
        .oldReview=${oldReview}
        token="csrf-abc"
        baseHost="https://example.org"
        endpointPath="/custom-write.php"
        .fetchHandler=${fetchHandler}
        bypassRecaptcha
      ></ia-review-form>`,
    );

    await submit(form);
    await waitUntil(() => fetchHandler.apiFetches.length > 0);

    const [call] = fetchHandler.apiFetches;
    expect(call.url).to.equal('https://example.org/custom-write.php');
    expect(call.options?.method).to.equal('POST');
    expect(call.options?.includeCredentials).to.be.true;
    const body = new URLSearchParams(String(call.options?.body));
    expect(body.get('field_reviewtoken')).to.equal('csrf-abc');
    expect(body.get('identifier')).to.equal('foo');
    expect(body.get('field_reviewtitle')).to.equal('A title');
    expect(body.get('field_reviewbody')).to.equal('A body');
    expect(body.get('submitter')).to.equal('review-form');
  });

  test('defaults to archive.org/write-review.php', async () => {
    const fetchHandler = new MockFetchHandler();
    const form = await fixture<IAReviewForm>(
      html`<ia-review-form
        identifier="foo"
        .oldReview=${oldReview}
        .fetchHandler=${fetchHandler}
        bypassRecaptcha
      ></ia-review-form>`,
    );

    await submit(form);
    await waitUntil(() => fetchHandler.apiFetches.length > 0);

    expect(fetchHandler.apiFetches[0].url).to.equal(
      'https://archive.org/write-review.php',
    );
  });

  test('reports a generic error when no fetchHandler is given, as 1.2.1 did', async () => {
    const form = await fixture<IAReviewForm>(
      html`<ia-review-form
        identifier="foo"
        .oldReview=${oldReview}
        token="csrf-abc"
        bypassRecaptcha
      ></ia-review-form>`,
    );

    await submit(form);
    await waitUntil(() => form.shadowRoot?.querySelector('.recoverable-error'));

    expect(
      form.shadowRoot?.querySelector('.recoverable-error')?.textContent,
    ).to.contain('temporary error');
  });

  test('a reviewService wins over the old props', async () => {
    const fetchHandler = new MockFetchHandler();
    const reviewService = new MockReviewService();
    const form = await fixture<IAReviewForm>(
      html`<ia-review-form
        identifier="foo"
        .oldReview=${oldReview}
        token="csrf-abc"
        .fetchHandler=${fetchHandler}
        .reviewService=${reviewService}
        bypassRecaptcha
      ></ia-review-form>`,
    );

    await submit(form);
    await waitUntil(() => reviewService.submissions.length > 0);

    expect(fetchHandler.apiFetches).to.have.length(0);
  });
});

describe('ia-review with the 1.2.1 props', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('deletes with the csrfToken and baseHost the host passes', async () => {
    const fetchSpy = vi.spyOn(window, 'fetch').mockResolvedValue(jsonOk());
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const el = await fixture<IAReview>(
      html`<ia-review
        identifier="foo"
        .review=${review}
        csrfToken="csrf-abc"
        baseHost="https://example.org"
        canDelete
      ></ia-review>`,
    );

    (el.shadowRoot?.querySelector('.delete-btn') as HTMLElement).click();
    await waitUntil(() => el.shadowRoot?.querySelector('.body i'));

    const [url, init] = fetchSpy.mock.calls[0];
    expect(String(url)).to.equal(
      'https://example.org/edit-reviews.php?identifier=foo&deleteReviewer=Bar+Baz' +
        '&deleteReviewerItemname=%40bar-baz&csrf_token=csrf-abc',
    );
    expect(init).to.deep.equal({ method: 'POST' });
    expect(el.shadowRoot?.querySelector('.body')?.textContent).to.contain(
      'queued for deletion',
    );
  });

  test('says the deletion failed when the endpoint rejects it', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValue(
      new Response('', { status: 500 }),
    );
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const el = await fixture<IAReview>(
      html`<ia-review
        identifier="foo"
        .review=${review}
        csrfToken="csrf-abc"
        canDelete
      ></ia-review>`,
    );

    (el.shadowRoot?.querySelector('.delete-btn') as HTMLElement).click();
    await waitUntil(() => el.shadowRoot?.querySelector('.body i'));

    expect(el.shadowRoot?.querySelector('.body')?.textContent).to.contain(
      'unable to delete',
    );
  });
});
