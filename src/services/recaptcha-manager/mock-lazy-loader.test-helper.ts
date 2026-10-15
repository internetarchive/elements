/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Unsubscribe } from 'nanoevents';
import type { BundleType } from '../lazy-loader-service/bundle-type';
import type {
  LazyLoaderServiceEvents,
  LazyLoaderServiceInterface,
} from '../lazy-loader-service/lazy-loader-service-interface';

export class MockLazyLoaderService implements LazyLoaderServiceInterface {
  loadScriptSrc?: string;

  private onloadFn: () => unknown;

  constructor(onloadFn: () => unknown = () => {}) {
    this.onloadFn = onloadFn;
  }

  on<E extends keyof LazyLoaderServiceEvents>(
    _event: E,
    _callback: LazyLoaderServiceEvents[E],
  ): Unsubscribe {
    throw new Error('Method not implemented.');
  }

  async loadBundle(bundle: {
    module?: string;
    nomodule?: string;
  }): Promise<void> {
    console.debug('loadBundle', bundle);
  }

  async loadScript(options: {
    src: string;
    bundleType?: BundleType;
    attributes?: Record<string, string>;
  }): Promise<void> {
    this.loadScriptSrc = options.src;
    this.onloadFn();
  }
}
