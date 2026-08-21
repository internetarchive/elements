import { describe, expect, test } from 'vitest';

import type { Result } from './result';

describe('Result', () => {
  test('can be initialized with a success value', () => {
    const result: Result<string, Error> = {
      success: 'foo',
    };
    expect(result.success).toBe('foo');
    expect(result.error).toBeUndefined();
  });

  test('can be initialized with an error', () => {
    const FooErrorType = {
      networkError: 0,
      decodingError: 1,
    } as const;
    type FooErrorType = (typeof FooErrorType)[keyof typeof FooErrorType];

    class FooError extends Error {
      type?: FooErrorType;

      constructor(type: FooErrorType) {
        super();
        this.type = type;
      }
    }
    const result: Result<string, FooError> = {
      error: new FooError(FooErrorType.decodingError),
    };
    expect(result.success).toBeUndefined();
    expect(result.error?.type).toBe(FooErrorType.decodingError);
  });
});
