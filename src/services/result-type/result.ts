/**
 * The Result is a container for a response.
 *
 * It contains an optional success result which is generic
 * and can be anything depending on the context,
 * or an Error or subclass of an error.
 *
 * This allows us to return rich, typed errors instead of
 * an untyped Promise rejection.
 *
 * This is modeled after Swift's Result type:
 * https://developer.apple.com/documentation/swift/result
 */
export interface Result<T, E extends Error> {
  success?: T;

  error?: E;
}
