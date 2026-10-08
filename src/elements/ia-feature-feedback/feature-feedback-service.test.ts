import { afterEach, describe, expect, test, vi } from 'vitest';
import { FeatureFeedbackService } from './feature-feedback-service';

const SERVICE_URL = 'https://example.test/feedback';

function mockFetch(result: unknown) {
  const fetchMock = vi.fn<
    (
      url: string,
      init?: RequestInit,
    ) => Promise<{ json: () => Promise<unknown> }>
  >(async () => ({ json: async () => result }));
  vi.spyOn(window, 'fetch').mockImplementation(
    fetchMock as unknown as typeof window.fetch,
  );
  return fetchMock;
}

describe('FeatureFeedbackService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('submits feedback as GET params', async () => {
    const fetchMock = mockFetch({ success: true });
    const service = new FeatureFeedbackService({ serviceUrl: SERVICE_URL });

    const result = await service.submitFeedback({
      featureIdentifier: 'foo-feature',
      vote: 'up',
      comments: 'nice',
      recaptchaToken: 'boop',
    });

    expect(result).to.deep.equal({ success: true });
    const url = new URL(fetchMock.mock.calls[0][0]);
    expect(url.origin + url.pathname).to.equal(SERVICE_URL);
    expect(url.searchParams.get('featureId')).to.equal('foo-feature');
    expect(url.searchParams.get('rating')).to.equal('up');
    expect(url.searchParams.get('comment')).to.equal('nice');
    expect(url.searchParams.get('token')).to.equal('boop');
  });

  test('omits the comment param when there is no comment', async () => {
    const fetchMock = mockFetch({ success: true });
    const service = new FeatureFeedbackService({ serviceUrl: SERVICE_URL });

    await service.submitFeedback({
      featureIdentifier: 'foo-feature',
      vote: 'down',
      recaptchaToken: 'boop',
    });

    const url = new URL(fetchMock.mock.calls[0][0]);
    expect(url.searchParams.has('comment')).to.be.false;
  });

  test('returns a failure result when the feedback request throws', async () => {
    vi.spyOn(window, 'fetch').mockRejectedValue(new Error('network down'));
    const service = new FeatureFeedbackService({ serviceUrl: SERVICE_URL });

    const result = await service.submitFeedback({
      featureIdentifier: 'foo-feature',
      vote: 'up',
      recaptchaToken: 'boop',
    });

    expect(result.success).to.be.false;
    expect(result.error?.message).to.equal('network down');
  });

  test('submits survey responses as a POST body', async () => {
    const fetchMock = mockFetch({ success: true });
    const service = new FeatureFeedbackService({ serviceUrl: SERVICE_URL });

    const result = await service.submitSurvey({
      surveyIdentifier: 'foo-survey',
      responses: [
        { name: 'foo', rating: 'up' },
        { name: 'bar', comment: 'baz' },
        { name: 'empty', rating: '', comment: '' },
      ],
      recaptchaToken: 'boop',
    });

    expect(result).to.deep.equal({ success: true });
    const [href, init] = fetchMock.mock.calls[0];
    const url = new URL(href);
    expect(url.searchParams.get('surveyId')).to.equal('foo-survey');
    expect(url.searchParams.get('token')).to.equal('boop');
    expect(init?.method).to.equal('POST');
    expect(init?.headers).to.deep.equal({ 'Content-Type': 'application/json' });
    expect(JSON.parse(init?.body as string)).to.deep.equal({
      surveyResponses: [
        { name: 'foo', rating: 'up' },
        { name: 'bar', comment: 'baz' },
        { name: 'empty' },
      ],
    });
  });

  test('returns a failure result when the survey request throws', async () => {
    vi.spyOn(window, 'fetch').mockRejectedValue('offline');
    const service = new FeatureFeedbackService({ serviceUrl: SERVICE_URL });

    const result = await service.submitSurvey({
      surveyIdentifier: 'foo-survey',
      responses: [],
      recaptchaToken: 'boop',
    });

    expect(result.success).to.be.false;
    expect(result.error?.message).to.equal('offline');
  });
});
