import { afterEach, describe, expect, test, vi } from 'vitest';

import { createLogger } from './logger';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('createLogger', () => {
  test('prefixes every line with the module and uses the matching console method', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const logger = createLogger('service');

    logger.debug('→ renew_loan #1 demo-book');
    logger.warn('slow');
    logger.error('failed', { code: 1 });

    expect(log).toHaveBeenCalledWith(
      '[ia-book-actions:service]',
      '→ renew_loan #1 demo-book',
    );
    expect(warn).toHaveBeenCalledWith('[ia-book-actions:service]', 'slow');
    expect(error).toHaveBeenCalledWith('[ia-book-actions:service]', 'failed', {
      code: 1,
    });
  });
});
