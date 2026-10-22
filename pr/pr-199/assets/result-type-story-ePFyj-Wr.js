import{i as d,A as m,b as c,a as f,r as a,c as h}from"./index-CV7keWh6.js";import"./service-template-Cjn0OyG0.js";import"./syntax-highlighter-CE6Gtmkd.js";import"./theme-styles-DdTkCH5O.js";const b=`/**
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
`;var v=Object.defineProperty,y=Object.getOwnPropertyDescriptor,n=(t,e,i,r)=>{for(var s=r>1?void 0:r?y(e,i):e,l=t.length-1,u;l>=0;l--)(u=t[l])&&(s=(r?u(e,i,s):u(s))||s);return r&&s&&v(e,i,s),s};class p extends Error{constructor(e){super(e),this.kind=e}}function g(t,e){const i=Number(t),r=Number(e);return t.trim()===""||e.trim()===""||Number.isNaN(i)||Number.isNaN(r)?{error:new p("not-a-number")}:r===0?{error:new p("divide-by-zero")}:{success:i/r}}const x=`import type { Result } from '@internetarchive/elements/services/result-type/result-type';

function divide(a: number, b: number): Result<number, DivisionError> {
  if (b === 0) return { error: new DivisionError('divide-by-zero') };
  return { success: a / b };
}

const { success, error } = divide(1, 0);
if (error) console.log(error.kind); // 'divide-by-zero'`;let o=class extends d{constructor(){super(...arguments),this.a="10",this.b="4"}render(){return c`
      <service-template
        serviceName="result-type"
        importCode="import type { Result } from '@internetarchive/elements/services/result-type/result-type';"
        .usage=${x}
        .apiSource=${b.trim()}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            a
            <input
              type="text"
              name="a"
              autocomplete="off"
              .value=${this.a}
              @input=${t=>this.a=t.target.value}
            />
          </label>
          <label>
            b
            <input
              type="text"
              name="b"
              autocomplete="off"
              .value=${this.b}
              @input=${t=>this.b=t.target.value}
            />
          </label>
          <button type="submit">Divide</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?c`<code class="call">${this.result.call}</code>
                  <code class="output">${this.result.output}</code>`:m}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            <code>Result</code> is a type, so there's nothing to call. A
            function returns one instead of throwing, and the caller checks
            <code>error</code> before using <code>success</code>. This page runs
            a small <code>divide</code> that does that.
          </p>
        </div>
      </service-template>
    `}run(t){t.preventDefault();const e=g(this.a,this.b);this.result={call:`divide(${JSON.stringify(this.a)}, ${JSON.stringify(this.b)})`,output:e.error?`{ error: DivisionError("${e.error.kind}") }`:`{ success: ${e.success} }`}}static get styles(){return f`
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

      input[type='text'] {
        min-width: 0;
        width: 12.8rem;
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
        gap: 2px;
        padding: 0.8rem;
        background: #fff;
        border: 1px solid #ccc;
        font-size: 1.36rem;
      }

      .call,
      .output {
        overflow-wrap: anywhere;
      }

      .output {
        font-weight: 600;
      }
    `}};n([a()],o.prototype,"a",2);n([a()],o.prototype,"b",2);n([a()],o.prototype,"result",2);o=n([h("result-type-story")],o);export{o as ResultTypeStory};
