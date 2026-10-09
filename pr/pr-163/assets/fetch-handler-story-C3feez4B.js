import{i as I,A as x,b as l,a as O,r as w,c as k}from"./index-Cxi6Bih-.js";import"./service-template-CTxXdNum.js";import"./theme-styles-B6XJ1gfP.js";const E=`import type { ApiFetchOptions, FetchOptions } from './fetch-options';

export interface FetchHandlerInterface {
  /**
   * Generic fetch function that handles retries and common IA parameters like \`reCache=1\`
   *
   * @param input RequestInfo
   * @param options RequestInit | FetchOptions
   */
  fetch(
    request: RequestInfo,
    options?: RequestInit | FetchOptions,
  ): Promise<Response>;

  /**
   * A helper function to fetch a response from an API and get a JSON object
   *
   * @param path string
   * @param options?: ApiFetchOptions
   */
  fetchApiResponse<T>(url: string, options?: ApiFetchOptions): Promise<T>;

  /**
   * A helper function to fetch a response from the IA API and get a JSON object
   *
   * This allows you to just pass the path to the API and get the response instead
   * of the full URL. If you need a full URL, use \`fetchApiResponse\` instead.
   *
   * ie \`fetchApiPathResponse('/items/123')\` will fetch from \`\${apiBaseUrl}/items/123\`
   *
   * @param path - Path to API endpoint
   * @param options - ApiFetchOptions
   */
  fetchApiPathResponse<T>(path: string, options?: ApiFetchOptions): Promise<T>;

  /**
   * Fetch a response from the IA API by path
   *
   * @deprecated Use \`fetchApiPathResponse\` instead.
   * @param path - Path to API endpoint
   * @param options - ApiFetchOptions
   */
  fetchIAApiResponse<T>(path: string, options?: ApiFetchOptions): Promise<T>;
}
`,U=`import type { RetryConfiguring } from './fetch-retry/configuration/retry-configuring';

/**
 * Query params to merge into a request URL.
 *
 * The record form is the common case: values are stringified and URL-encoded,
 * and \`undefined\`/\`null\` entries are dropped so optional params can be passed
 * straight through without a conditional at the call site. Pass a
 * \`URLSearchParams\` when a key needs to repeat.
 */
export type QueryParams =
  | URLSearchParams
  | Record<string, string | number | boolean | null | undefined>;

/**
 * Base fetch options for FetchHandler
 */
export type FetchOptions = {
  requestInit?: RequestInit;
  retryConfig?: RetryConfiguring;
  /**
   * Set to opt this request into an automatic \`X-CSRF-Token\` header (when
   * the FetchHandler was constructed with a \`getCsrfToken\` source). Off by
   * default — only opt in once the target endpoint's CORS policy is known
   * to allow-list that header.
   */
  includeCsrfToken?: boolean;
};

/**
 * A convenience type for FetchHandler methods with common API fetch options.
 */
export type ApiFetchOptions = {
  includeCredentials?: boolean;
  method?: string;
  body?: BodyInit;
  headers?: HeadersInit;
  retryConfig?: RetryConfiguring;
  /**
   * Query params merged into the request URL, overriding any of the same name
   * already present on it.
   */
  queryParams?: QueryParams;
  /**
   * Set to opt this request into an automatic \`X-CSRF-Token\` header (when
   * the FetchHandler was constructed with a \`getCsrfToken\` source). Off by
   * default — only opt in once the target endpoint's CORS policy is known
   * to allow-list that header.
   */
  includeCsrfToken?: boolean;
};
`;function T(i){return new Promise(e=>setTimeout(e,i))}const m=class m{constructor(e){this.maxRetries=2,this.transientStatusCodes=new Set([408,429,500,502,503,504,522]),e?.maxRetries!==void 0&&(this.maxRetries=e.maxRetries),e?.transientStatusCodes!==void 0&&(this.transientStatusCodes=e.transientStatusCodes)}shouldRetry(e,t){return e===null||t>this.maxRetries?!1:this.transientStatusCodes.has(e.status)}retryDelay(e,t){const r=t?.headers.get("Retry-After");if(r){const n=parseInt(r,10);if(!isNaN(n))return n*1e3}return Math.min(500*2**e,1e4)}};m.shared=new m;let R=m;const y=class y{shouldRetry(){return!1}retryDelay(){return null}};y.shared=new y;let p=y;const g=class g{};g.default=R.shared,g.noRetry=p.shared;let P=g;const C=i=>{if(i)return"requestInit"in i||"retryConfig"in i||"includeCsrfToken"in i?i:{requestInit:i}};class F{constructor(e){this.retryConfig=P.default,this.eventCategory="offshootFetchRetry",e?.analyticsHandler&&(this.analyticsHandler=e.analyticsHandler),e?.retryConfig&&(this.retryConfig=e.retryConfig)}async fetchRetry(e,t){const r=C(t);return await this.doFetchRetry(e,0,r)}async doFetchRetry(e,t,r){const n=typeof e=="string"?e:e.url;try{const s=await fetch(e,r?.requestInit);if(s.ok)return s;s.status>=400&&s.status<600&&this.log4xx5xxResponse(s);const a=r?.retryConfig??this.retryConfig;if(a.shouldRetry(s,t)){const o=a.retryDelay(t,s);if(o!==null)return await T(o),this.logRetryEvent(n,t,s.statusText,s.status),this.doFetchRetry(e,t+1,r)}return this.logFailureEvent(n,s.status),s}catch(s){if(this.isContentBlockerError(s))throw this.logContentBlockingEvent(n,s),s;const a=r?.retryConfig??this.retryConfig;if(a.shouldRetry(null,t)){const o=a.retryDelay(t);if(o!==null)return await T(o),this.logRetryEvent(n,t,s,s),this.doFetchRetry(e,t+1,r)}throw this.logFailureEvent(n,s),s}}isContentBlockerError(e){return e instanceof TypeError?e.message.toLowerCase().includes("content blocker"):!1}logRetryEvent(e,t,r,n){this.analyticsHandler?.sendEvent({category:this.eventCategory,action:"retryingFetch",label:`retryNumber: ${t}, code: ${n}, status: ${r}, url: ${e}`})}logFailureEvent(e,t){this.analyticsHandler?.sendEvent({category:this.eventCategory,action:"fetchFailed",label:`error: ${t}, url: ${e}`})}log4xx5xxResponse(e){const t=e.status;this.analyticsHandler?.sendEvent({category:this.eventCategory,action:`status${t}Response`,label:`url: ${e.url}`})}logContentBlockingEvent(e,t){this.analyticsHandler?.sendEvent({category:this.eventCategory,action:"contentBlockerDetectedNotRetrying",label:`error: ${t}, url: ${e}`})}}const H=new Set(["POST","PUT","DELETE","PATCH"]);class A{constructor(e){this.apiBaseUrl="",this.fetchRetrier=new F,e?.apiBaseUrl?this.apiBaseUrl=e.apiBaseUrl:e?.iaApiBaseUrl&&(this.apiBaseUrl=e.iaApiBaseUrl),e?.fetchRetrier&&(this.fetchRetrier=e.fetchRetrier),e?.searchParams?this.searchParams=e.searchParams:this.searchParams=window.location.search,e?.getCsrfToken&&(this.getCsrfToken=e.getCsrfToken)}async fetch(e,t){let r=e;if(new URLSearchParams(this.searchParams).get("reCache")==="1"){const a=typeof e=="string"?e:e.url;r=this.addSearchParams(a,{reCache:"1"})}const s=await this.withCsrfToken(r,t);return this.fetchRetrier.fetchRetry(r,s)}async fetchApiResponse(e,t){const r={};t?.includeCredentials&&(r.credentials="include"),t?.method&&(r.method=t.method),t?.body&&(r.body=t.body);const n=new Headers({Accept:"application/json"});t?.headers&&new Headers(t.headers).forEach((o,u)=>{n.set(u,o)}),r.headers=n;const s=t?.queryParams?this.addSearchParams(e,t.queryParams):e;return await(await this.fetch(s,{requestInit:r,retryConfig:t?.retryConfig,includeCsrfToken:t?.includeCsrfToken})).json()}async fetchApiPathResponse(e,t){const r=`${this.apiBaseUrl}${e}`;return this.fetchApiResponse(r,t)}async fetchIAApiResponse(e,t){return this.fetchApiPathResponse(e,t)}async withCsrfToken(e,t){if(!this.getCsrfToken)return t;const r=C(t)??{};if(!r.includeCsrfToken)return t;const n=r.requestInit??{},s=(n.method??(typeof e!="string"?e.method:void 0)??"GET").toUpperCase();if(!H.has(s))return t;const a=new Headers(n.headers);return a.has("X-CSRF-Token")?t:(a.set("X-CSRF-Token",await this.getCsrfToken()),{...r,requestInit:{...n,headers:a}})}addSearchParams(e,t){const r=e.indexOf("#"),n=r===-1?"":e.slice(r),s=r===-1?e:e.slice(0,r),a=s.indexOf("?"),d=a===-1?s:s.slice(0,a),o=new URLSearchParams(a===-1?"":s.slice(a+1)),u=A.asSearchParams(t),v=new Set;u.forEach((b,h)=>{v.has(h)||(v.add(h),o.delete(h))}),u.forEach((b,h)=>{o.append(h,b)});const S=o.toString();return`${d}${S?`?${S}`:""}${n}`}static asSearchParams(e){if(e instanceof URLSearchParams)return e;const t=new URLSearchParams;return Object.entries(e).forEach(([r,n])=>{n!=null&&t.append(r,String(n))}),t}}var q=Object.defineProperty,B=Object.getOwnPropertyDescriptor,f=(i,e,t,r)=>{for(var n=r>1?void 0:r?B(e,t):e,s=i.length-1,a;s>=0;s--)(a=i[s])&&(n=(r?a(e,t,n):a(n))||n);return r&&n&&q(e,t,n),n};const $="/metadata/prelinger/metadata/title",L={result:"Prelinger Archives"},j=`import { FetchHandler } from '@internetarchive/elements/services/fetch-handler/fetch-handler';

const fetchHandler = new FetchHandler({ apiBaseUrl: 'https://archive.org' });
const response = await fetchHandler.fetchApiPathResponse<{ result: string }>(
  '/metadata/prelinger/metadata/title',
);`,D=i=>i.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),_=[E,U].map(D).join(`

`);class G{constructor(e){this.inner=new F({retryConfig:new p}),this.sample=e}async fetchRetry(e,t){const r=performance.now(),n=typeof e=="string"?e:e.url,s=C(t)?.requestInit?.method??"GET";try{const a=this.sample?new Response(JSON.stringify(L),{status:200}):await this.inner.fetchRetry(e,t);return this.last={method:s,url:n,status:a.status,ms:Math.round(performance.now()-r)},a}catch(a){throw this.last={method:s,url:n,ms:Math.round(performance.now()-r),error:String(a)},a}}}let c=class extends I{constructor(){super(...arguments),this.path="",this.sample=!1,this.running=!1}render(){return l`
      <service-template
        serviceName="fetch-handler"
        .usage=${j}
        .apiSource=${_}
      >
        <form slot="console" @submit=${this.run}>
          <label class="path">
            Path on archive.org
            <input
              type="text"
              placeholder=${$}
              autocomplete="off"
              spellcheck="false"
              .value=${this.path}
              @input=${i=>this.path=i.target.value}
            />
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${this.sample}
              @change=${i=>this.sample=i.target.checked}
            />
            Sample data (works offline)
          </label>
          <button type="submit" ?disabled=${this.running}>Fetch</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?l`<code class="call">${this.result.call}</code> ${this.result.request?l`<code class="request"
                        >${this.result.request.method}
                        ${this.result.request.url} →
                        ${this.result.request.status??"no response"}
                        (${this.result.request.ms} ms)</code
                      >`:x}
                  ${this.result.error?l`<code class="error">${this.result.error}</code>`:l`<pre class="output">${this.result.body}</pre>`}`:x}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Fetches from archive.org's real API, so it needs a network
            connection. Tick "Sample data" to answer from a canned response
            instead, which is also what to use if a content blocker stops the
            request. A failed request is retried by default. This page turns
            retries off so a failure shows up straight away.
          </p>
        </div>
      </service-template>
    `}async run(i){i.preventDefault();const e=this.path.trim()||$,t=`fetchApiPathResponse(${JSON.stringify(e)})`;if(!e.startsWith("/")){this.result={call:t,error:"The path has to start with a /."};return}const r=new G(this.sample),n=new A({apiBaseUrl:"https://archive.org",fetchRetrier:r});this.running=!0;try{const s=await n.fetchApiPathResponse(e);this.result={call:t,request:r.last,body:JSON.stringify(s,null,2)}}catch(s){this.result={call:t,request:r.last,error:s instanceof TypeError&&!this.sample?`${s}. Couldn't reach archive.org, try "Sample data".`:String(s)}}finally{this.running=!1}}static get styles(){return O`
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

      label.check {
        flex-direction: row;
        align-items: center;
        gap: 4px;
      }

      label.path {
        flex: 1 1 18rem;
      }

      label.path input {
        min-width: 0;
        width: 100%;
        box-sizing: border-box;
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
      .request,
      .error {
        overflow-wrap: anywhere;
      }

      .error {
        color: #b00020;
      }

      .output {
        margin: 0;
        font-weight: 600;
        overflow-x: auto;
      }
    `}};f([w()],c.prototype,"path",2);f([w()],c.prototype,"sample",2);f([w()],c.prototype,"running",2);f([w()],c.prototype,"result",2);c=f([k("fetch-handler-story")],c);export{c as FetchHandlerStory};
