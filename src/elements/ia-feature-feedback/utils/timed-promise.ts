/**
 * Error subclass thrown when a Promise times out.
 */
export class TimeoutError extends Error {}

/**
 * Utility method to wrap a Promise (or other value) within a new Promise that will
 * reject after a specified delay, if the original has not settled within that time.
 *
 * Note that when a Promise is provided, this time-out does not inherently cancel any
 * operations underlying the original Promise, which may still continue to run unless
 * they are separately aborted. If the original Promise has any other handlers attached
 * to it directly, they may still execute even after a time-out rejection occurs.
 *
 * @param originalValue The value to wrap, which may or may not be a Promise itself.
 * If the provided value is not a Promise, or is an already-settled Promise, then no
 * time-out will occur.
 * @param timeLimit How long, in milliseconds, to wait for a provided Promise to settle
 * before triggering the time-out rejection.
 * @param timeoutMessage Optional message to use as the rejection reason when a time-out
 * occurs. Defaults to `Operation timed out`.
 *
 * @returns A new Promise that will either settle within the specified time limit, or
 * else reject with a `TimeoutError`. If it does not time out, the returned Promise will
 * either settle to the same state as `originalValue` (if a Promise), or fulfill with
 * `originalValue` (if not a Promise).
 */
export async function timedPromise<T>(
  originalValue: T,
  timeLimit: number,
  timeoutMessage = 'Operation timed out',
): Promise<T> {
  const timedRejector = new Promise<never>((_, reject) =>
    setTimeout(reject, timeLimit, new TimeoutError(timeoutMessage)),
  );

  return Promise.race([originalValue, timedRejector]) as Promise<T>;
}
