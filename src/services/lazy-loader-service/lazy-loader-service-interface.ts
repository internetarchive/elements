import { BundleType } from './bundle-type';
import { Unsubscribe } from 'nanoevents';

export interface LazyLoaderServiceEvents {
  scriptLoadRetried: (src: string, retryNumber: number) => void;
  scriptLoadFailed: (src: string, error: string | Event) => void;
}

export interface LazyLoaderServiceInterface {
  /**
   * Bind to receive notifications about retry and failure events
   *
   * @template E
   * @param {E} event
   * @param {LazyLoaderServiceEvents[E]} callback
   * @returns {Unsubscribe}
   * @memberof LazyLoaderServiceInterface
   */
  on<E extends keyof LazyLoaderServiceEvents>(
    event: E,
    callback: LazyLoaderServiceEvents[E],
  ): Unsubscribe;

  /**
   * Load a javascript bundle (module and nomodule pair)
   *
   * eg:
   *
   * lazyLoaderService.loadBundle({
   *   module: 'https://my-server.com/module.js',
   *   nomodule: 'https://my-server.com/no-module.js'
   * });
   *
   * @param bundle
   */
  loadBundle(bundle: { module?: string; nomodule?: string }): Promise<void>;

  /**
   * Load a script with a Promise
   *
   * eg.
   *
   * lazyLoaderService.loadScript({
   *   src: 'https://my-server.com/script.js'
   * });
   *
   *
   * @param options
   */
  loadScript(options: {
    src: string;
    bundleType?: BundleType;

    attributes?: Record<string, string>;
  }): Promise<void>;
}
