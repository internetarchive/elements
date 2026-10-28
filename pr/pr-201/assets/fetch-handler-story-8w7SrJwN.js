import{i as d,A as l,b as p,a as f,r as c,c as m}from"./index-GESg6vSq.js";import"./service-template-C9QssWjJ.js";import{F as g,a as y,N as w,l as b}from"./fetch-handler-CW24_TiN.js";import"./syntax-highlighter-DGfJFDSs.js";import"./theme-styles-CZ4dcGzu.js";const A=`import type { ApiFetchOptions, FetchOptions } from './fetch-options';

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
`,R=`import type { RetryConfiguring } from './fetch-retry/configuration/retry-configuring';

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
`;var P=Object.defineProperty,v=Object.getOwnPropertyDescriptor,h=(r,e,o,s)=>{for(var t=s>1?void 0:s?v(e,o):e,n=r.length-1,a;n>=0;n--)(a=r[n])&&(t=(s?a(e,o,t):a(t))||t);return s&&t&&P(e,o,t),t};const u="/metadata/prelinger/metadata/title",F={result:"Prelinger Archives"},x=`import { FetchHandler } from '@internetarchive/elements/services/fetch-handler/fetch-handler';

const fetchHandler = new FetchHandler({ apiBaseUrl: 'https://archive.org' });
const response = await fetchHandler.fetchApiPathResponse<{ result: string }>(
  '/metadata/prelinger/metadata/title',
);`,O=r=>r.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),S=[A,R].map(O).join(`

`);class I{constructor(e){this.inner=new y({retryConfig:new w}),this.sample=e}async fetchRetry(e,o){const s=performance.now(),t=typeof e=="string"?e:e.url,n=b(o)?.requestInit?.method??"GET";try{const a=this.sample?new Response(JSON.stringify(F),{status:200}):await this.inner.fetchRetry(e,o);return this.last={method:n,url:t,status:a.status,ms:Math.round(performance.now()-s)},a}catch(a){throw this.last={method:n,url:t,ms:Math.round(performance.now()-s),error:String(a)},a}}}let i=class extends d{constructor(){super(...arguments),this.path="",this.sample=!1,this.running=!1}render(){return p`
      <service-template
        serviceName="fetch-handler"
        .usage=${x}
        .apiSource=${S}
      >
        <form slot="console" @submit=${this.run}>
          <label class="path">
            Path on archive.org
            <input
              type="text"
              placeholder=${u}
              autocomplete="off"
              spellcheck="false"
              .value=${this.path}
              @input=${r=>this.path=r.target.value}
            />
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${this.sample}
              @change=${r=>this.sample=r.target.checked}
            />
            Sample data (works offline)
          </label>
          <button type="submit" ?disabled=${this.running}>Fetch</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?p`<code class="call">${this.result.call}</code> ${this.result.request?p`<code class="request"
                        >${this.result.request.method}
                        ${this.result.request.url} →
                        ${this.result.request.status??"no response"}
                        (${this.result.request.ms} ms)</code
                      >`:l}
                  ${this.result.error?p`<code class="error">${this.result.error}</code>`:p`<pre class="output">${this.result.body}</pre>`}`:l}
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
    `}async run(r){r.preventDefault();const e=this.path.trim()||u,o=`fetchApiPathResponse(${JSON.stringify(e)})`;if(!e.startsWith("/")){this.result={call:o,error:"The path has to start with a /."};return}const s=new I(this.sample),t=new g({apiBaseUrl:"https://archive.org",fetchRetrier:s});this.running=!0;try{const n=await t.fetchApiPathResponse(e);this.result={call:o,request:s.last,body:JSON.stringify(n,null,2)}}catch(n){this.result={call:o,request:s.last,error:n instanceof TypeError&&!this.sample?`${n}. Couldn't reach archive.org, try "Sample data".`:String(n)}}finally{this.running=!1}}static get styles(){return f`
      form {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 0.8rem;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-size: 1.28rem;
      }

      label.check {
        flex-direction: row;
        align-items: center;
        gap: 4px;
      }

      label.path {
        flex: 1 1 28.8rem;
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
        padding: 0.8rem;
        background: #fff;
        border: 1px solid #ccc;
        font-size: 1.36rem;
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
    `}};h([c()],i.prototype,"path",2);h([c()],i.prototype,"sample",2);h([c()],i.prototype,"running",2);h([c()],i.prototype,"result",2);i=h([m("fetch-handler-story")],i);export{i as FetchHandlerStory};
