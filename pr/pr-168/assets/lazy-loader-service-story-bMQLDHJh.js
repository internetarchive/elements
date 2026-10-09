import{i as y,A as u,b as d,a as b,r as a,c as h}from"./index-CSUhfpKe.js";import"./service-template-29-2plqn.js";import{L as v}from"./lazy-loader-service-B7_g151A.js";import"./theme-styles-GBhklrxr.js";const g=`import { createNanoEvents, Unsubscribe } from 'nanoevents';
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
    const scriptSelector = \`script[src='\${options.src}'][async][\${ScriptTagAttributes.owner}='\${scriptOwnerName}'][\${ScriptTagAttributes.retryNumber}='\${retryNumber}']\`;
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

      // If multiple requests get made for this script, just stack the \`onload\`s
      // and \`onerror\`s and all the callbacks will be called in-order of being received.
      // If we are retrying the load, we use the \`onload\` / \`onerror\` from the script being retried

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
      // cannot be tested because modern browsers ignore \`nomodule\`
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
`,f=`import { BundleType } from './bundle-type';
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
`,L=`export type BundleType = 'module' | 'nomodule';
`;var S=Object.defineProperty,w=Object.getOwnPropertyDescriptor,o=(e,n,i,s)=>{for(var t=s>1?void 0:s?w(n,i):n,c=e.length-1,l;c>=0;c--)(l=e[c])&&(t=(s?l(n,i,t):l(t))||t);return s&&t&&S(n,i,t),t};const T=`import { LazyLoaderService } from '@internetarchive/elements/services/lazy-loader-service/lazy-loader-service';

const lazyLoader = new LazyLoaderService({ retryCount: 2, retryInterval: 1 });
lazyLoader.on('scriptLoadRetried', (src, retryNumber) => console.log(src, retryNumber));
await lazyLoader.loadScript({ src: 'https://example.org/widget.js' });`,z=e=>e.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),E=[f,L,g].map(z).join(`

`);let r=class extends y{constructor(){super(...arguments),this.target="sample",this.retryCount=2,this.retryInterval=.5,this.running=!1,this.log=[],this.scriptTags=[]}render(){return d`
      <service-template
        serviceName="lazy-loader-service"
        .usage=${T}
        .apiSource=${E}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            Script
            <select @change=${this.pickTarget}>
              <option value="sample" ?selected=${this.target==="sample"}>
                A sample script (loads)
              </option>
              <option value="missing" ?selected=${this.target==="missing"}>
                A script that doesn't exist (fails)
              </option>
            </select>
          </label>
          <label>
            Retries
            <input
              type="number"
              min="0"
              max="5"
              .value=${String(this.retryCount)}
              @input=${e=>this.retryCount=Number(e.target.value)}
            />
          </label>
          <label>
            Retry interval (seconds)
            <input
              type="number"
              min="0"
              max="5"
              step="any"
              .value=${String(this.retryInterval)}
              @input=${e=>this.retryInterval=Number(e.target.value)}
            />
          </label>
          <button type="submit" ?disabled=${this.running}>Load</button>
          <div class="result" aria-live="polite" ?hidden=${!this.outcome}>
            ${this.outcome?d`<code class="output">${this.outcome}</code>
                  <ul class="events">
                    ${this.log.map(e=>d`<li>${e}</li>`)}
                  </ul>
                  ${this.scriptTags.length?d`<code class="tags"
                        >${this.scriptTags.join(`
`)}</code
                      >`:u}`:u}
          </div>
          <div id="container" hidden></div>
        </form>
        <div slot="usage-notes">
          <p>
            Loads the script in a <code>&lt;script&gt;</code> tag and resolves
            once it runs. A failed load is retried, and the events say when. The
            missing script is a path on this site that returns a 404.
          </p>
        </div>
      </service-template>
    `}pickTarget(e){this.target=e.target.value}async run(e){e.preventDefault();const n=this.shadowRoot.querySelector("#container");n.replaceChildren(),this.running=!0,this.log=[],this.outcome=void 0,this.scriptTags=[];const i=this.target==="sample"?URL.createObjectURL(new Blob(['window.lazyLoaderDemo = "loaded";'],{type:"text/javascript"})):void 0,s=i??new URL("./lazy-loader-demo-missing.js",document.baseURI).href,t=new v({container:n,retryCount:this.retryCount,retryInterval:this.retryInterval});t.on("scriptLoadRetried",(p,m)=>{this.log=[...this.log,`scriptLoadRetried (retry ${m})`]}),t.on("scriptLoadFailed",()=>{this.log=[...this.log,"scriptLoadFailed"]});const c=performance.now(),l=`loadScript({ src: ${JSON.stringify(i?"blob:… (sample script)":s)} })`;try{await t.loadScript({src:s}),this.outcome=`${l} resolved after ${this.elapsed(c)} ms`}catch{this.outcome=`${l} rejected after ${this.elapsed(c)} ms`}finally{this.scriptTags=Array.from(n.querySelectorAll("script")).map(p=>p.outerHTML.replace(/blob:[^"]+/,"blob:…")),i&&URL.revokeObjectURL(i),this.running=!1}}elapsed(e){return Math.round(performance.now()-e)}static get styles(){return b`
      form {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 0.5rem;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-size: 0.8rem;
      }

      input[type='number'] {
        width: 6rem;
      }

      .result[hidden] {
        display: none;
      }

      .result {
        box-sizing: border-box;
        flex-basis: 100%;
        min-width: 0;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 0.5rem;
        background: #fff;
        border: 1px solid #ccc;
        font-size: 0.85rem;
      }

      .output {
        font-weight: 600;
        overflow-wrap: anywhere;
      }

      .events {
        margin: 0;
        padding-left: 1.2rem;
      }

      .tags {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        font-size: 0.75rem;
      }
    `}};o([a()],r.prototype,"target",2);o([a()],r.prototype,"retryCount",2);o([a()],r.prototype,"retryInterval",2);o([a()],r.prototype,"running",2);o([a()],r.prototype,"log",2);o([a()],r.prototype,"outcome",2);o([a()],r.prototype,"scriptTags",2);r=o([h("lazy-loader-service-story")],r);export{r as LazyLoaderServiceStory};
