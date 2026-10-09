/**
 * The PromisedSingleton is a generic wrapper for an asynchronous object that you only
 * want one instance of (a singleton).
 *
 * For the braintree libraries, we only want to load them once. This presents a problem
 * when several consumers request the clients at once. The Promises don't automatically
 * chain so you have to do some gatekeeping to make sure only one instance gets created.
 *
 * `PromisedSingleton` ensures that no matter how many callers request the object,
 * only one instance gets created.
 *
 * It gets initialized with a Promise that generates the singleton and when `get()` is
 * first called, it executes the Promise, caches its results and returns it to the caller.
 *
 * If more callers call it in the interim, it chains the promises and when the singleton
 * is created, it resolves them all.
 *
 * @export
 * @class PromisedSingleton
 * @template T
 */
export class PromisedSingleton<T> {
  /**
   * Request the singleton
   *
   * @returns {Promise<T>}
   * @memberof PromisedSingleton
   */
  async get(): Promise<T> {
    // if it's already in the cache return it
    if (this.cachedResponse) {
      return this.cachedResponse;
    }

    // if another promise is in line, chain it
    if (this.previousPromise) {
      this.previousPromise = this.previousPromise.then((response) => {
        return response;
      });
      return this.previousPromise;
    }

    // this is the first load so kick off the generator and cache
    this.previousPromise = this.generateSingletonAndCache();
    return this.previousPromise;
  }

  reset(): void {
    this.cachedResponse = undefined;
    this.previousPromise = undefined;
  }

  private async generateSingletonAndCache(): Promise<T> {
    const result = await this.generator();
    this.cachedResponse = result;
    return result;
  }

  private previousPromise?: Promise<T>;

  private cachedResponse?: T;

  private generator: () => Promise<T>;

  constructor(options: { generator: () => Promise<T> }) {
    this.generator = options.generator;
  }
}
