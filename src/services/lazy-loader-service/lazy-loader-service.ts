import { createNanoEvents, Unsubscribe } from 'nanoevents';
import type { BundleType } from './bundle-type';
import {
  LazyLoaderServiceEvents,
  LazyLoaderServiceInterface,
} from './lazy-loader-service-interface';
import { promisedSleep } from './promised-sleep';

/**
 * Attributes used to identify different script states
 */
const ScriptTagAttributes = {
  retryNumber: 'retryNumber',
  owner: 'owner',
  dynamicImportLoaded: 'dynamicImportLoaded',
  hasBeenRetried: 'hasBeenRetried',
} as const;

/**
 * Used to identify scripts loaded by the LazyLoaderService
 */
const scriptOwnerName = 'lazyLoaderService';

export interface LazyLoaderServiceOptions {
  /**
   * The HTMLElement in which we put the script tags, defaults to document.head
   */
  container?: HTMLElement;

  /**
   * The number of retries we should attempt
   */
  retryCount?: number;

  /**
   * The retry interval in seconds
   */
  retryInterval?: number;
}

export class LazyLoaderService implements LazyLoaderServiceInterface {
  // the HTMLElement in which we put the script tags, defaults to document.head
  private container: HTMLElement;

  // the number of retries we should attempt
  private retryCount: number;

  // the retry interval in seconds
  private retryInterval: number;

  // the emitter for consumers to listen for events like retrying a load
  private emitter = createNanoEvents<LazyLoaderServiceEvents>();

  /**
   * LazyLoaderService constructor
   *
   * @param options LazyLoaderServiceOptions
   */
  constructor(options?: LazyLoaderServiceOptions) {
    this.container = options?.container ?? document.head;
    this.retryCount = options?.retryCount ?? 2;
    this.retryInterval = options?.retryInterval ?? 1;
  }

  /** @inheritdoc */
  on<E extends keyof LazyLoaderServiceEvents>(
    event: E,
    callback: LazyLoaderServiceEvents[E],
  ): Unsubscribe {
    return this.emitter.on(event, callback);
  }

  /** @inheritdoc */
  async loadBundle(bundle: {
    module?: string;
    nomodule?: string;
  }): Promise<void> {
    let modulePromise: Promise<void> | undefined;
    let nomodulePromise: Promise<void> | undefined;

    /* istanbul ignore else */
    if (bundle.module) {
      modulePromise = this.loadScript({
        src: bundle.module,
        bundleType: 'module',
      });
    }

    /* istanbul ignore else */
    if (bundle.nomodule) {
      nomodulePromise = this.loadScript({
        src: bundle.nomodule,
        bundleType: 'nomodule',
      });
    }

    return Promise.race([modulePromise, nomodulePromise]);
  }

  /** @inheritdoc */
  async loadScript(options: {
    src: string;
    bundleType?: BundleType;
    attributes?: Record<string, string>;
  }): Promise<void> {
    return this.doLoad(options);
  }

  private async doLoad(options: {
    src: string;
    bundleType?: BundleType;
    attributes?: Record<string, string>;
    retryNumber?: number;
    scriptBeingRetried?: HTMLScriptElement;
  }): Promise<void> {
    const retryNumber = options.retryNumber ?? 0;
    const scriptSelector = `script[src='${options.src}'][async][${ScriptTagAttributes.owner}='${scriptOwnerName}'][${ScriptTagAttributes.retryNumber}='${retryNumber}']`;
    let script = this.container.querySelector(
      scriptSelector,
    ) as HTMLScriptElement;
    if (!script) {
      script = this.getScriptTag({ ...options, retryNumber });
      this.container.appendChild(script);
    }

    return new Promise((resolve, reject) => {
      // script has already been loaded, just resolve
      if (script.getAttribute(ScriptTagAttributes.dynamicImportLoaded)) {
        resolve();
        return;
      }

      const scriptBeingRetried = options.scriptBeingRetried;

      // If multiple requests get made for this script, just stack the `onload`s
      // and `onerror`s and all the callbacks will be called in-order of being received.
      // If we are retrying the load, we use the `onload` / `onerror` from the script being retried

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const originalOnLoad: ((event: Event) => any) | null | undefined =
        script.onload || scriptBeingRetried?.onload;

      script.onload = (event): void => {
        originalOnLoad?.(event);
        script.setAttribute(ScriptTagAttributes.dynamicImportLoaded, 'true');
        resolve();
      };

      const originalOnError: OnErrorEventHandler | null | undefined =
        script.onerror || scriptBeingRetried?.onerror;

      script.onerror = async (error): Promise<void> => {
        const hasBeenRetried = script.getAttribute(
          ScriptTagAttributes.hasBeenRetried,
        );
        if (retryNumber < this.retryCount && !hasBeenRetried) {
          script.setAttribute(ScriptTagAttributes.hasBeenRetried, 'true');
          await promisedSleep(this.retryInterval * 1000);
          const newRetryNumber = retryNumber + 1;
          this.emitter.emit('scriptLoadRetried', options.src, newRetryNumber);
          // The result reaches the caller through the first script's
          // onerror chain, so this retry's own promise is only caught to keep
          // its rejection from going unhandled.
          this.doLoad({
            ...options,
            retryNumber: newRetryNumber,
            scriptBeingRetried: script,
          }).catch(() => {});
        } else {
          // only emit a failure event from the last attempt, which has not been retried.
          // otherwise you get failure events from each script tag, when we're really
          // only interested that the entire chain failed
          if (!hasBeenRetried) {
            this.emitter.emit('scriptLoadFailed', options.src, error);
          }
          originalOnError?.(error);
          reject(error);
        }
      };
    });
  }

  /**
   * Generate a script tag with all of the proper attributes
   *
   * @param options
   * @returns
   */
  private getScriptTag(options: {
    src: string;
    retryNumber: number;
    bundleType?: BundleType;
    attributes?: Record<string, string>;
  }): HTMLScriptElement {
    const fixedSrc = options.src.replace("'", '"');
    const script = document.createElement('script') as HTMLScriptElement;
    const retryNumber = options.retryNumber;
    script.setAttribute(ScriptTagAttributes.owner, scriptOwnerName);
    script.setAttribute('src', fixedSrc);
    script.setAttribute(
      ScriptTagAttributes.retryNumber,
      retryNumber.toString(),
    );
    script.async = true;

    const attributes = options.attributes ?? {};
    Object.keys(attributes).forEach((key) => {
      script.setAttribute(key, attributes[key]);
    });

    switch (options.bundleType) {
      case 'module':
        script.setAttribute('type', options.bundleType);
        break;
      // cannot be tested because modern browsers ignore `nomodule`
      /* istanbul ignore next */
      case 'nomodule':
        script.setAttribute(options.bundleType, '');
        break;
      default:
        break;
    }

    return script;
  }
}
