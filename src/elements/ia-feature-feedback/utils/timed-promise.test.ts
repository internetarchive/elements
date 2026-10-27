import { describe, expect, test } from 'vitest';
import { timedPromise, TimeoutError } from './timed-promise';

describe('timedPromise', () => {
  test('rejects with a TimeoutError when the time limit is exceeded', async () => {
    const longPromise = new Promise((resolve) => setTimeout(resolve, 100));
    const timed = timedPromise(longPromise, 20);

    await expect(timed).rejects.toBeInstanceOf(TimeoutError);
    await expect(timed).rejects.toThrow('Operation timed out');
  });

  test('allows setting the time-out message', async () => {
    const longPromise = new Promise((resolve) => setTimeout(resolve, 100));
    const timed = timedPromise(longPromise, 20, 'foo');

    await expect(timed).rejects.toBeInstanceOf(TimeoutError);
    await expect(timed).rejects.toThrow('foo');
  });

  test('fulfills if the given promise fulfills within the time limit', async () => {
    const shortPromise = new Promise((resolve) =>
      setTimeout(resolve, 10, 'foo'),
    );

    await expect(timedPromise(shortPromise, 100)).resolves.toBe('foo');
  });

  test('rejects if the given promise rejects within the time limit', async () => {
    const shortPromise = new Promise((_, reject) =>
      setTimeout(reject, 10, 'foo'),
    );

    await expect(timedPromise(shortPromise, 100)).rejects.toBe('foo');
  });

  test('immediately fulfills with any non-promise value given, regardless of time limit', async () => {
    await expect(timedPromise('foo', 0)).resolves.toBe('foo');
  });
});
