import { describe, expect, test } from 'vitest';

import { ReviewService } from './review-service';
import { MockFetchHandler } from './mocks/mock-fetch-handler';

const submission = {
  identifier: 'foo',
  title: 'Great',
  body: 'Really great.',
  stars: '5',
};

const deletion = {
  identifier: 'foo',
  reviewer: 'Joe Blow',
  reviewerItemname: '@joe',
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

describe('ReviewService', () => {
  describe('submitReview', () => {
    test('opts into the fetch handler CSRF header', async () => {
      const fetchHandler = new MockFetchHandler();
      const service = new ReviewService({ fetchHandler });

      await service.submitReview(submission);

      expect(fetchHandler.lastFetch?.options?.includeCsrfToken).to.be.true;
    });

    test('carries no token of its own, so the handler resolves it per request', async () => {
      const fetchHandler = new MockFetchHandler();
      const service = new ReviewService({ fetchHandler });

      await service.submitReview(submission);

      expect(fetchHandler.bodyOnLastFetch().get('field_reviewtoken')).to.be
        .null;
      expect(fetchHandler.lastRequestInit.headers).to.be.undefined;
    });

    test('maps the submission onto the wire field names', async () => {
      const fetchHandler = new MockFetchHandler();
      const service = new ReviewService({ fetchHandler });

      await service.submitReview({ ...submission, recaptchaToken: 'rc' });

      const body = fetchHandler.bodyOnLastFetch();
      expect(body.get('identifier')).to.equal('foo');
      expect(body.get('field_reviewtitle')).to.equal('Great');
      expect(body.get('field_reviewbody')).to.equal('Really great.');
      expect(body.get('field_stars')).to.equal('5');
      expect(body.get('g-recaptcha-response')).to.equal('rc');
      expect(body.get('submitter')).to.equal('review-form');
    });

    test('defaults stars to 0 and omits an absent recaptcha token', async () => {
      const fetchHandler = new MockFetchHandler();
      const service = new ReviewService({ fetchHandler });

      await service.submitReview({
        identifier: 'foo',
        title: 'Great',
        body: 'Really great.',
      });

      const body = fetchHandler.bodyOnLastFetch();
      expect(body.get('field_stars')).to.equal('0');
      expect(body.get('g-recaptcha-response')).to.be.null;
    });

    test('sends credentials and posts to the configured endpoint', async () => {
      const fetchHandler = new MockFetchHandler();
      const service = new ReviewService({
        fetchHandler,
        baseHost: 'https://example.archive.org',
        submitPath: '/services/offshoot/details-page/review.php',
      });

      await service.submitReview(submission);

      expect(fetchHandler.lastFetch?.url).to.equal(
        'https://example.archive.org/services/offshoot/details-page/review.php',
      );
      expect(fetchHandler.lastRequestInit.method).to.equal('POST');
      expect(fetchHandler.lastRequestInit.credentials).to.equal('include');
    });

    test('defaults to the legacy write endpoint', async () => {
      const fetchHandler = new MockFetchHandler();
      const service = new ReviewService({ fetchHandler, baseHost: '' });

      await service.submitReview(submission);

      expect(fetchHandler.lastFetch?.url).to.equal('/write-review.php');
    });

    test('reports the error message the backend supplies', async () => {
      const fetchHandler = new MockFetchHandler();
      fetchHandler.response = () =>
        jsonResponse({ success: false, error: 'Reviews are not allowed.' });
      const service = new ReviewService({ fetchHandler });

      const result = await service.submitReview(submission);

      expect(result).to.deep.equal({
        success: false,
        error: 'Reviews are not allowed.',
      });
    });

    test('reports failure on a 200 whose body lacks success', async () => {
      const fetchHandler = new MockFetchHandler();
      fetchHandler.response = () => jsonResponse({});
      const service = new ReviewService({ fetchHandler });

      const result = await service.submitReview(submission);

      expect(result.success).to.be.false;
      expect(result.error).to.exist;
    });

    test('reports failure when the request throws', async () => {
      const fetchHandler = new MockFetchHandler();
      fetchHandler.response = () => {
        throw new Error('network down');
      };
      const service = new ReviewService({ fetchHandler });

      const result = await service.submitReview(submission);

      expect(result.success).to.be.false;
      expect(result.error).to.exist;
    });
  });

  describe('deleteReview', () => {
    test('keeps the CSRF token out of the query string', async () => {
      const fetchHandler = new MockFetchHandler();
      const service = new ReviewService({ fetchHandler });

      await service.deleteReview(deletion);

      expect(fetchHandler.lastFetch?.url).to.not.contain('csrf_token');
      expect(fetchHandler.lastFetch?.options?.includeCsrfToken).to.be.true;
    });

    test('sends credentials', async () => {
      const fetchHandler = new MockFetchHandler();
      const service = new ReviewService({ fetchHandler });

      await service.deleteReview(deletion);

      expect(fetchHandler.lastRequestInit.credentials).to.equal('include');
    });

    test('encodes the reviewer into the query string', async () => {
      const fetchHandler = new MockFetchHandler();
      const service = new ReviewService({ fetchHandler, baseHost: '' });

      await service.deleteReview({ ...deletion, reviewer: 'Joe & Blow' });

      const query = new URLSearchParams(
        fetchHandler.lastFetch?.url.split('?')[1],
      );
      expect(query.get('identifier')).to.equal('foo');
      expect(query.get('deleteReviewer')).to.equal('Joe & Blow');
      expect(query.get('deleteReviewerItemname')).to.equal('@joe');
    });

    test('omits the reviewer itemname when there is none', async () => {
      const fetchHandler = new MockFetchHandler();
      const service = new ReviewService({ fetchHandler, baseHost: '' });

      await service.deleteReview({ identifier: 'foo', reviewer: 'Joe Blow' });

      expect(fetchHandler.lastFetch?.url).to.not.contain(
        'deleteReviewerItemname',
      );
    });

    test('posts to the legacy endpoint by default', async () => {
      const fetchHandler = new MockFetchHandler();
      const service = new ReviewService({ fetchHandler, baseHost: '' });

      await service.deleteReview(deletion);

      expect(fetchHandler.lastFetch?.url).to.contain('/edit-reviews.php?');
      expect(fetchHandler.lastRequestInit.method).to.equal('POST');
    });

    test('uses the configured verb and path', async () => {
      const fetchHandler = new MockFetchHandler();
      const service = new ReviewService({
        fetchHandler,
        baseHost: '',
        deletePath: '/services/offshoot/details-page/review.php',
        deleteMethod: 'DELETE',
      });

      await service.deleteReview(deletion);

      expect(fetchHandler.lastFetch?.url).to.contain(
        '/services/offshoot/details-page/review.php?',
      );
      expect(fetchHandler.lastRequestInit.method).to.equal('DELETE');
    });

    test('reports failure when the server rejects the request', async () => {
      const fetchHandler = new MockFetchHandler();
      fetchHandler.response = () =>
        jsonResponse(
          { success: false, error: 'You must be logged in to edit reviews' },
          401,
        );
      const service = new ReviewService({ fetchHandler });

      const result = await service.deleteReview(deletion);

      expect(result).to.deep.equal({
        success: false,
        error: 'You must be logged in to edit reviews',
      });
    });

    test('reports failure on a non-2xx with no JSON body', async () => {
      const fetchHandler = new MockFetchHandler();
      fetchHandler.response = () =>
        new Response('<html>nope</html>', { status: 500 });
      const service = new ReviewService({ fetchHandler });

      const result = await service.deleteReview(deletion);

      expect(result.success).to.be.false;
      expect(result.error).to.exist;
    });

    test('treats an HTML 200 from the legacy endpoint as success', async () => {
      const fetchHandler = new MockFetchHandler();
      fetchHandler.response = () =>
        new Response('<html>queued</html>', { status: 200 });
      const service = new ReviewService({ fetchHandler });

      const result = await service.deleteReview(deletion);

      expect(result.success).to.be.true;
    });
  });
});
