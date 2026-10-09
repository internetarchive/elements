import { describe, expect, it } from 'vitest';
import { DefaultRetryConfiguration } from './default-retry-configuration';

describe('DefaultRetryConfiguration', () => {
  it('should not retry on null response', async () => {
    const config = new DefaultRetryConfiguration();
    expect(config.shouldRetry(null, 1)).to.be.false;
  });

  it('should not retry after max retries exceeded', async () => {
    const config = new DefaultRetryConfiguration({ maxRetries: 2 });
    const mockResponse = new Response(null, { status: 500 });
    expect(config.shouldRetry(mockResponse, 3)).to.be.false;
  });

  it('should retry transient status codes', async () => {
    const transientStatuses = [408, 429, 500, 502, 503, 504];
    const config = new DefaultRetryConfiguration({
      transientStatusCodes: new Set(transientStatuses),
    });
    for (const status of transientStatuses) {
      const mockResponse = new Response(null, { status });
      expect(config.shouldRetry(mockResponse, 1)).to.be.true;
    }
  });

  it('should not retry non-transient status codes', async () => {
    const config = new DefaultRetryConfiguration();
    const mockResponse = new Response(null, { status: 404 });
    expect(config.shouldRetry(mockResponse, 1)).to.be.false;
  });

  it('uses Retry-After header if present', async () => {
    const config = new DefaultRetryConfiguration();
    const headers = new Headers();
    headers.append('Retry-After', '3');
    const mockResponse = new Response(null, { status: 503, headers });
    expect(config.retryDelay(0, mockResponse)).to.equal(3000);
  });

  it('has exponential backoff delay', async () => {
    const config = new DefaultRetryConfiguration();
    expect(config.retryDelay(0)).to.equal(500);
    expect(config.retryDelay(1)).to.equal(1000);
    expect(config.retryDelay(2)).to.equal(2000);
  });

  it('caps retry delay at 10 seconds', async () => {
    const config = new DefaultRetryConfiguration();
    expect(config.retryDelay(10)).to.equal(10000);
    expect(config.retryDelay(20)).to.equal(10000);
  });
});
