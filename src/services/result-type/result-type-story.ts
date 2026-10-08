import { css, html, LitElement, nothing, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import interfaceSource from './result.ts?raw';

import '@demo/service-template';
import type { Result } from './result-type';

class DivisionError extends Error {
  readonly kind: 'not-a-number' | 'divide-by-zero';

  constructor(kind: 'not-a-number' | 'divide-by-zero') {
    super(kind);
    this.kind = kind;
  }
}

/** The kind of function that returns a Result instead of throwing. */
function divide(a: string, b: string): Result<number, DivisionError> {
  const top = Number(a);
  const bottom = Number(b);
  if (
    a.trim() === '' ||
    b.trim() === '' ||
    Number.isNaN(top) ||
    Number.isNaN(bottom)
  ) {
    return { error: new DivisionError('not-a-number') };
  }
  if (bottom === 0) return { error: new DivisionError('divide-by-zero') };
  return { success: top / bottom };
}

const USAGE = `import type { Result } from '@internetarchive/elements/services/result-type/result-type';

function divide(a: number, b: number): Result<number, DivisionError> {
  if (b === 0) return { error: new DivisionError('divide-by-zero') };
  return { success: a / b };
}

const { success, error } = divide(1, 0);
if (error) console.log(error.kind); // 'divide-by-zero'`;

@customElement('result-type-story')
export class ResultTypeStory extends LitElement {
  @state() private a = '';

  @state() private b = '';

  @state() private result?: { call: string; output: string };

  render() {
    return html`
      <service-template
        serviceName="result-type"
        importCode="import type { Result } from '@internetarchive/elements/services/result-type/result-type';"
        .usage=${USAGE}
        .apiSource=${interfaceSource.trim()}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            a
            <input
              type="text"
              name="a"
              placeholder="10"
              autocomplete="off"
              .value=${this.a}
              @input=${(e: Event) =>
                (this.a = (e.target as HTMLInputElement).value)}
            />
          </label>
          <label>
            b
            <input
              type="text"
              name="b"
              placeholder="4"
              autocomplete="off"
              .value=${this.b}
              @input=${(e: Event) =>
                (this.b = (e.target as HTMLInputElement).value)}
            />
          </label>
          <button type="submit">Divide</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result
              ? html`<code class="call">${this.result.call}</code>
                  <code class="output">${this.result.output}</code>`
              : nothing}
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
    `;
  }

  private run(e: Event) {
    e.preventDefault();
    const result = divide(this.a, this.b);
    this.result = {
      call: `divide(${JSON.stringify(this.a)}, ${JSON.stringify(this.b)})`,
      output: result.error
        ? `{ error: DivisionError("${result.error.kind}") }`
        : `{ success: ${result.success} }`,
    };
  }

  static get styles(): CSSResultGroup {
    return css`
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
        width: 8rem;
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
    `;
  }
}
