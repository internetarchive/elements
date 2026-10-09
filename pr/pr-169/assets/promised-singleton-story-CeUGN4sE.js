import{i as u,A as m,b as h,a as p,r as a,c as g}from"./index-pQXqDDLl.js";import"./service-template-Cl1Vm8NT.js";import"./theme-styles-BtCT9ELt.js";const d=`/**
 * The PromisedSingleton is a generic wrapper for an asynchronous object that you only
 * want one instance of (a singleton).
 *
 * For the braintree libraries, we only want to load them once. This presents a problem
 * when several consumers request the clients at once. The Promises don't automatically
 * chain so you have to do some gatekeeping to make sure only one instance gets created.
 *
 * \`PromisedSingleton\` ensures that no matter how many callers request the object,
 * only one instance gets created.
 *
 * It gets initialized with a Promise that generates the singleton and when \`get()\` is
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
`;class f{async get(){return this.cachedResponse?this.cachedResponse:this.previousPromise?(this.previousPromise=this.previousPromise.then(e=>e),this.previousPromise):(this.previousPromise=this.generateSingletonAndCache(),this.previousPromise)}reset(){this.cachedResponse=void 0,this.previousPromise=void 0}async generateSingletonAndCache(){const e=await this.generator();return this.cachedResponse=e,e}constructor(e){this.generator=e.generator}}var v=Object.defineProperty,P=Object.getOwnPropertyDescriptor,i=(t,e,o,n)=>{for(var s=n>1?void 0:n?P(e,o):e,l=t.length-1,c;l>=0;l--)(c=t[l])&&(s=(n?c(e,o,s):c(s))||s);return n&&s&&v(e,o,s),s};const b=`import { PromisedSingleton } from '@internetarchive/elements/services/promised-singleton/promised-singleton';

const client = new PromisedSingleton({
  generator: async () => loadExpensiveClient(), // runs once
});

const [a, b] = await Promise.all([client.get(), client.get()]); // a === b
client.reset(); // the next get() runs the generator again`,y=d.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim();let r=class extends u{constructor(){super(...arguments),this.requests=5,this.fail=!1,this.running=!1,this.generatorRuns=0,this.runCount=0,this.singleton=this.createSingleton()}render(){return h`
      <service-template
        serviceName="promised-singleton"
        .usage=${b}
        .apiSource=${y}
      >
        <form slot="console" @submit=${this.get}>
          <label>
            Requests at once
            <input
              type="number"
              min="1"
              max="20"
              .value=${String(this.requests)}
              @input=${t=>this.requests=Number(t.target.value)}
            />
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${this.fail}
              @change=${t=>this.fail=t.target.checked}
            />
            Generator fails
          </label>
          <button type="submit" ?disabled=${this.running}>Get</button>
          <button type="button" @click=${this.reset}>Reset</button>
          <div class="runs">Generator has run ${this.generatorRuns} times</div>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?h`<code class="call">${this.result.call}</code>
                  <ul class="lines">
                    ${this.result.lines.map(t=>h`<li>${t}</li>`)}
                  </ul>`:m}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            The generator takes about half a second. However many
            <code>get()</code> calls arrive while it runs, it runs once and they
            all receive the same result, or the same error. Later calls get the
            cached result until <code>reset()</code>.
          </p>
        </div>
      </service-template>
    `}createSingleton(){return new f({generator:async()=>{this.generatorRuns+=1,this.runCount+=1;const t=this.runCount;if(await new Promise(e=>setTimeout(e,500)),this.fail)throw new Error(`generator run ${t} failed`);return`result of run ${t}`}})}reset(){this.singleton.reset(),this.result=void 0}async get(t){t.preventDefault();const e=Math.min(Math.max(this.requests||1,1),20);this.running=!0;const o=await Promise.all(Array.from({length:e},()=>this.singleton.get().then(n=>`resolved: ${n}`,n=>`rejected: ${n.message}`)));this.result={call:`${e} × get()`,lines:o.map((n,s)=>`get() ${s+1} ${n}`)},this.running=!1}static get styles(){return p`
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

      input[type='number'] {
        width: 5rem;
      }

      .runs {
        flex-basis: 100%;
        font-size: 0.8rem;
      }

      .result[hidden] {
        display: none;
      }

      .result {
        box-sizing: border-box;
        flex-basis: 100%;
        min-width: 0;
        max-width: 100%;
        padding: 0.5rem;
        background: #fff;
        border: 1px solid #ccc;
        font-size: 0.85rem;
      }

      .lines {
        margin: 4px 0 0;
        padding-left: 1.2rem;
        overflow-wrap: anywhere;
      }
    `}};i([a()],r.prototype,"requests",2);i([a()],r.prototype,"fail",2);i([a()],r.prototype,"running",2);i([a()],r.prototype,"generatorRuns",2);i([a()],r.prototype,"result",2);r=i([g("promised-singleton-story")],r);export{r as PromisedSingletonStory};
