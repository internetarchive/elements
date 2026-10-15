import { describe, expect, it } from 'vitest';
import { NoRetryConfiguration } from './no-retry-configuration';

describe('NoRetryConfiguration', () => {
  it('should not retry', async () => {
    const config = new NoRetryConfiguration();
    expect(config.shouldRetry()).to.be.false;
  });

  it('has no delay', async () => {
    const config = new NoRetryConfiguration();
    expect(config.retryDelay()).to.be.null;
  });
});
