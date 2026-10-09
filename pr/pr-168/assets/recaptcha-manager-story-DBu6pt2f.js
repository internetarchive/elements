import{i as m,A as f,b as l,a as w,r as d,c as x}from"./index-CSUhfpKe.js";import"./service-template-29-2plqn.js";import{L as b}from"./lazy-loader-service-B7_g151A.js";import"./theme-styles-GBhklrxr.js";const k=`import { LazyLoaderService } from '../lazy-loader-service/lazy-loader-service';
import type { LazyLoaderServiceInterface } from '../lazy-loader-service/lazy-loader-service-interface';
import { RecaptchaWidget, RecaptchaWidgetInterface } from './recaptcha-widget';

export interface RecaptchaManagerInterface {
  /**
   * Changes the manager's timeout delay to the given number of milliseconds.
   */
  setTimeoutDelay(delay: number): void;

  /**
   * Load a recaptcha widget for a given site key or the default site key.
   */
  getRecaptchaWidget(options?: {
    siteKey?: string;
    recaptchaParams?: ReCaptchaV2.Parameters;
  }): Promise<RecaptchaWidgetInterface>;
}

export class RecaptchaManager implements RecaptchaManagerInterface {
  private static readonly DEFAULT_TIMEOUT = 10000;

  private lazyLoader: LazyLoaderServiceInterface;

  private defaultSiteKey?: string;

  private recaptchaCache: Record<string, RecaptchaWidget> = {};

  /**
   * How long in milliseconds to wait for the recaptcha library to load before timing out.
   */
  private timeout = RecaptchaManager.DEFAULT_TIMEOUT;

  constructor(options?: {
    defaultSiteKey?: string;
    lazyLoader?: LazyLoaderServiceInterface;
    grecaptchaLibrary?: ReCaptchaV2.ReCaptcha; // allows dependency injection or will be lazy loaded
    timeout?: number;
  }) {
    this.defaultSiteKey = options?.defaultSiteKey;
    this.lazyLoader = options?.lazyLoader ?? new LazyLoaderService();
    this.grecaptchaLibraryCache = options?.grecaptchaLibrary;
    this.timeout = options?.timeout ?? RecaptchaManager.DEFAULT_TIMEOUT;
  }

  /** @inheritdoc */
  setTimeoutDelay(delay: number): void {
    this.timeout = delay;
  }

  /** @inheritdoc */
  async getRecaptchaWidget(options?: {
    siteKey?: string;
    recaptchaParams?: ReCaptchaV2.Parameters;
  }): Promise<RecaptchaWidgetInterface> {
    const key = options?.siteKey ?? this.defaultSiteKey;
    if (!key) {
      throw new Error('The reCaptcha widget requires a site key');
    }

    const cached = this.recaptchaCache[key];
    if (cached) return cached;

    const grecaptchaLibrary = await this.getRecaptchaLibrary();
    const recaptcha = new RecaptchaWidget(
      {
        siteKey: key,
        grecaptchaLibrary,
      },
      options?.recaptchaParams,
    );

    this.recaptchaCache[key] = recaptcha;
    return recaptcha;
  }

  /**
   * Load the Recaptcha library from Google's www.recaptcha.net mirror, which
   * is reachable in regions where www.google.com is blocked.
   *
   * @returns Promise<ReCaptchaV2.ReCaptcha>
   */
  private async getRecaptchaLibrary(): Promise<ReCaptchaV2.ReCaptcha> {
    if (this.grecaptchaLibraryCache) {
      return this.grecaptchaLibraryCache;
    }
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).grecaptchaLoadedCallback = (): void => {
        setTimeout(() => {
          // remove the callback when we're done with it
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          delete (window as any).grecaptchaLoadedCallback;
        }, 10);
        this.grecaptchaLibraryCache = window.grecaptcha;
        resolve(window.grecaptcha);
      };

      setTimeout(
        () => reject(new Error('grecaptcha failed to execute callback')),
        this.timeout,
      );

      this.lazyLoader.loadScript({
        src: 'https://www.recaptcha.net/recaptcha/api.js?onload=grecaptchaLoadedCallback&render=explicit',
      });
    });
  }

  /** don't use directly, use \`getRecaptchaLibrary()\` */
  private grecaptchaLibraryCache?: ReCaptchaV2.ReCaptcha;
}
`,v=`/**
 * This encompasses a widget for a given site key.
 */
export interface RecaptchaWidgetInterface {
  /** execute the recaptcha request and returns a token */
  execute(): Promise<string>;
}

/**
 * The combines parameters from the Recaptcha config and adds the zIndex, which
 * allows us to control the z-index of the recaptcha widget.
 */
export type RecaptchaWidgetConfig = Pick<
  ReCaptchaV2.Parameters,
  'tabindex' | 'theme' | 'type' | 'size' | 'badge'
> & {
  zIndex?: number;
};

/**
 * This encompasses a widget for a given site key.
 */
export class RecaptchaWidget implements RecaptchaWidgetInterface {
  private executionSuccessBlock?: (token: string) => void;

  private executionExpiredBlock?: () => void;

  private executionErrorBlock?: () => void;

  private grecaptchaLibrary: ReCaptchaV2.ReCaptcha;

  private siteKey: string;

  private widgetId: number | null = null;

  private isExecuting = false;

  constructor(
    config: {
      siteKey: string;
      grecaptchaLibrary: ReCaptchaV2.ReCaptcha;
    },
    widgetConfig?: RecaptchaWidgetConfig,
  ) {
    this.siteKey = config.siteKey;
    this.grecaptchaLibrary = config.grecaptchaLibrary;

    const container = this.createContainer();
    this.setup(container, widgetConfig);
  }

  /** @inheritdoc */
  async execute(): Promise<string> {
    const { widgetId } = this;

    if (widgetId === null) {
      throw new Error('Recaptcha is not setup');
    }

    if (this.isExecuting) {
      // there is no way to know when users have dismissed a previous recaptcha
      // so if we're still in the middle of execution when we call execute again,
      // just reset it and execute it again
      this.finishExecution();
    }

    this.isExecuting = true;

    return new Promise((resolve, reject) => {
      this.executionSuccessBlock = (token: string): void => {
        this.finishExecution();
        resolve(token);
      };

      this.executionExpiredBlock = (): void => {
        this.finishExecution();
        reject(new Error('expired'));
      };

      this.executionErrorBlock = (): void => {
        this.finishExecution();
        reject(new Error('error'));
      };

      this.grecaptchaLibrary.execute(widgetId);
    });
  }

  private finishExecution() {
    this.isExecuting = false;
    const { widgetId } = this;
    if (widgetId === null) return;
    this.grecaptchaLibrary.reset(widgetId);
  }

  private setup(
    container: HTMLElement,
    widgetConfig?: ReCaptchaV2.Parameters,
  ): void {
    this.widgetId = this.grecaptchaLibrary.render(container, {
      callback: this.responseHandler.bind(this),
      'expired-callback': this.expiredHandler.bind(this),
      'error-callback': this.errorHandler.bind(this),
      sitekey: this.siteKey,
      tabindex: widgetConfig?.tabindex,
      theme: widgetConfig?.theme,
      type: widgetConfig?.type,
      size: widgetConfig?.size ?? 'invisible',
      badge: widgetConfig?.badge,
    });
  }

  private createContainer(zIndex?: number): HTMLElement {
    const elementId = \`recaptchaManager-\${this.siteKey}\`;
    let element: HTMLElement | null = document.getElementById(elementId);
    if (!element) {
      element = document.createElement('div');
      element.id = elementId;
      element.style.position = 'fixed';
      element.style.top = '50%';
      element.style.left = '50%';
      element.style.zIndex = zIndex ? \`\${zIndex}\` : '10';
      document.body.appendChild(element);
    }
    return element;
  }

  private responseHandler(response: string): void {
    if (this.executionSuccessBlock) {
      this.executionSuccessBlock(response);
      this.executionSuccessBlock = undefined;
    }
  }

  private expiredHandler(): void {
    if (this.executionExpiredBlock) {
      this.executionExpiredBlock();
      this.executionExpiredBlock = undefined;
    }
  }

  private errorHandler(): void {
    if (this.executionErrorBlock) {
      this.executionErrorBlock();
      this.executionErrorBlock = undefined;
    }
  }
}
`;class E{constructor(e,t){this.widgetId=null,this.isExecuting=!1,this.siteKey=e.siteKey,this.grecaptchaLibrary=e.grecaptchaLibrary;const a=this.createContainer();this.setup(a,t)}async execute(){const{widgetId:e}=this;if(e===null)throw new Error("Recaptcha is not setup");return this.isExecuting&&this.finishExecution(),this.isExecuting=!0,new Promise((t,a)=>{this.executionSuccessBlock=n=>{this.finishExecution(),t(n)},this.executionExpiredBlock=()=>{this.finishExecution(),a(new Error("expired"))},this.executionErrorBlock=()=>{this.finishExecution(),a(new Error("error"))},this.grecaptchaLibrary.execute(e)})}finishExecution(){this.isExecuting=!1;const{widgetId:e}=this;e!==null&&this.grecaptchaLibrary.reset(e)}setup(e,t){this.widgetId=this.grecaptchaLibrary.render(e,{callback:this.responseHandler.bind(this),"expired-callback":this.expiredHandler.bind(this),"error-callback":this.errorHandler.bind(this),sitekey:this.siteKey,tabindex:t?.tabindex,theme:t?.theme,type:t?.type,size:t?.size??"invisible",badge:t?.badge})}createContainer(e){const t=`recaptchaManager-${this.siteKey}`;let a=document.getElementById(t);return a||(a=document.createElement("div"),a.id=t,a.style.position="fixed",a.style.top="50%",a.style.left="50%",a.style.zIndex=e?`${e}`:"10",document.body.appendChild(a)),a}responseHandler(e){this.executionSuccessBlock&&(this.executionSuccessBlock(e),this.executionSuccessBlock=void 0)}expiredHandler(){this.executionExpiredBlock&&(this.executionExpiredBlock(),this.executionExpiredBlock=void 0)}errorHandler(){this.executionErrorBlock&&(this.executionErrorBlock(),this.executionErrorBlock=void 0)}}const o=class o{constructor(e){this.recaptchaCache={},this.timeout=o.DEFAULT_TIMEOUT,this.defaultSiteKey=e?.defaultSiteKey,this.lazyLoader=e?.lazyLoader??new b,this.grecaptchaLibraryCache=e?.grecaptchaLibrary,this.timeout=e?.timeout??o.DEFAULT_TIMEOUT}setTimeoutDelay(e){this.timeout=e}async getRecaptchaWidget(e){const t=e?.siteKey??this.defaultSiteKey;if(!t)throw new Error("The reCaptcha widget requires a site key");const a=this.recaptchaCache[t];if(a)return a;const n=await this.getRecaptchaLibrary(),r=new E({siteKey:t,grecaptchaLibrary:n},e?.recaptchaParams);return this.recaptchaCache[t]=r,r}async getRecaptchaLibrary(){return this.grecaptchaLibraryCache?this.grecaptchaLibraryCache:new Promise((e,t)=>{window.grecaptchaLoadedCallback=()=>{setTimeout(()=>{delete window.grecaptchaLoadedCallback},10),this.grecaptchaLibraryCache=window.grecaptcha,e(window.grecaptcha)},setTimeout(()=>t(new Error("grecaptcha failed to execute callback")),this.timeout),this.lazyLoader.loadScript({src:"https://www.recaptcha.net/recaptcha/api.js?onload=grecaptchaLoadedCallback&render=explicit"})})}};o.DEFAULT_TIMEOUT=1e4;let u=o;class C{constructor(e){this.response="foo",this.renderCalled=!1,this.executeCalled=!1,this.resetCallCount=0,this.getResponseCalled=!1,this.mode=e.mode,this.addDelay=e.addDelay??!1}render(e,t,a){return this.callback=t?.callback?.bind(this),this["error-callback"]=t?.["error-callback"]?.bind(this),this["expired-callback"]=t?.["expired-callback"]?.bind(this),this.renderCalled=!0,1}reset(e){this.resetCallCount+=1}getResponse(e){return this.getResponseCalled=!0,"foo"}execute(e){this.executeCalled=!0,this.addDelay?setTimeout(this.callCallback.bind(this),100):this.callCallback()}ready(e){}callCallback(){switch(this.mode){case"success":this.callback&&this.callback("foo");break;case"error":this["error-callback"]&&this["error-callback"]();break;case"expired":this["expired-callback"]&&this["expired-callback"]();break}}}var L=Object.defineProperty,R=Object.getOwnPropertyDescriptor,h=(i,e,t,a)=>{for(var n=a>1?void 0:a?R(e,t):e,r=i.length-1,s;r>=0;r--)(s=i[r])&&(n=(a?s(e,t,n):s(n))||n);return a&&n&&L(e,t,n),n};const g="demo-site-key",I=`import { RecaptchaManager } from '@internetarchive/elements/services/recaptcha-manager/recaptcha-manager';

const recaptcha = new RecaptchaManager({ defaultSiteKey: 'YOUR_SITE_KEY' });
const widget = await recaptcha.getRecaptchaWidget();
const token = await widget.execute();`,S=i=>i.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),T=[k,v].map(S).join(`

`);let c=class extends m{constructor(){super(...arguments),this.mode="success",this.siteKey="",this.running=!1}render(){return l`
      <service-template
        serviceName="recaptcha-manager"
        .usage=${I}
        .apiSource=${T}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            reCAPTCHA answers with
            <select @change=${this.pickMode}>
              ${["success","expired","error"].map(i=>l`<option value=${i} ?selected=${i===this.mode}>
                    ${i}
                  </option>`)}
            </select>
          </label>
          <label>
            Site key
            <input
              type="text"
              placeholder=${g}
              autocomplete="off"
              spellcheck="false"
              .value=${this.siteKey}
              @input=${i=>this.siteKey=i.target.value}
            />
          </label>
          <button type="submit" ?disabled=${this.running}>Execute</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?l`<code class="call">${this.result.call}</code>
                  <code class="output">${this.result.output}</code>
                  <ul class="details">
                    ${this.result.details.map(i=>l`<li>${i}</li>`)}
                  </ul>`:f}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            A real reCAPTCHA needs a site key registered for the page's domain,
            so this page hands the manager a stand-in for Google's
            <code>grecaptcha</code> library and picks how it answers. Without
            one, the manager loads the library from
            <code>www.recaptcha.net</code> itself. Nothing is loaded here.
          </p>
        </div>
      </service-template>
    `}pickMode(i){this.mode=i.target.value,this.result=void 0}async run(i){i.preventDefault();const e=this.siteKey.trim()||g,t=new C({mode:this.mode}),a=new u({defaultSiteKey:e,grecaptchaLibrary:t}),n=`getRecaptchaWidget({ siteKey: ${JSON.stringify(e)} }).execute()`;this.running=!0;try{const r=await a.getRecaptchaWidget(),s=await a.getRecaptchaWidget();let p;try{p=`token: ${JSON.stringify(await r.execute())}`}catch(y){p=`rejected: ${y.message}`}this.result={call:n,output:p,details:[`Same widget on a second request: ${r===s}`,`grecaptcha reset calls: ${t.resetCallCount}`]}}finally{document.getElementById(`recaptchaManager-${e}`)?.remove(),this.running=!1}}static get styles(){return w`
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

      input[type='text'] {
        min-width: 0;
        width: 12rem;
        max-width: 100%;
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

      .call,
      .output {
        overflow-wrap: anywhere;
      }

      .output {
        font-weight: 600;
      }

      .details {
        margin: 0;
        padding-left: 1.2rem;
      }
    `}};h([d()],c.prototype,"mode",2);h([d()],c.prototype,"siteKey",2);h([d()],c.prototype,"running",2);h([d()],c.prototype,"result",2);c=h([x("recaptcha-manager-story")],c);export{c as RecaptchaManagerStory};
