import { css, html, LitElement, nothing, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import source from './promised-singleton.ts?raw';

import '@demo/service-template';
import { PromisedSingleton } from './promised-singleton';

const USAGE = `import { PromisedSingleton } from '@internetarchive/elements/services/promised-singleton/promised-singleton';

const client = new PromisedSingleton({
  generator: async () => loadExpensiveClient(), // runs once
});

const [a, b] = await Promise.all([client.get(), client.get()]); // a === b
client.reset(); // the next get() runs the generator again`;

const API_SOURCE = source
  .replace(/^import[\s\S]*?from '[^']+';\n/gm, '')
  .trim();

@customElement('promised-singleton-story')
export class PromisedSingletonStory extends LitElement {
  @state() private requests = 5;

  @state() private fail = false;

  @state() private running = false;

  @state() private generatorRuns = 0;

  @state() private result?: { call: string; lines: string[] };

  private runCount = 0;

  private singleton = this.createSingleton();

  render() {
    return html`
      <service-template
        serviceName="promised-singleton"
        .usage=${USAGE}
        .apiSource=${API_SOURCE}
      >
        <form slot="console" @submit=${this.get}>
          <label>
            Requests at once
            <input
              type="number"
              min="1"
              max="20"
              .value=${String(this.requests)}
              @input=${(e: Event) =>
                (this.requests = Number((e.target as HTMLInputElement).value))}
            />
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${this.fail}
              @change=${(e: Event) =>
                (this.fail = (e.target as HTMLInputElement).checked)}
            />
            Generator fails
          </label>
          <button type="submit" ?disabled=${this.running}>Get</button>
          <button type="button" @click=${this.reset}>Reset</button>
          <div class="runs">Generator has run ${this.generatorRuns} times</div>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result
              ? html`<code class="call">${this.result.call}</code>
                  <ul class="lines">
                    ${this.result.lines.map((line) => html`<li>${line}</li>`)}
                  </ul>`
              : nothing}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            The generator takes about half a second. However many
            <code>get()</code> calls arrive while it runs, it runs once and they
            all receive the same result, or the same error. Later calls get the
            cached result, or the same error, until <code>reset()</code>. A
            failed generator stays failed until then.
          </p>
        </div>
      </service-template>
    `;
  }

  private createSingleton() {
    return new PromisedSingleton<string>({
      generator: async () => {
        this.generatorRuns += 1;
        this.runCount += 1;
        const run = this.runCount;
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (this.fail) throw new Error(`generator run ${run} failed`);
        return `result of run ${run}`;
      },
    });
  }

  private reset() {
    this.singleton.reset();
    this.result = undefined;
  }

  private async get(e: Event) {
    e.preventDefault();
    const count = Math.min(Math.max(this.requests || 1, 1), 20);
    this.running = true;
    const outcomes = await Promise.all(
      Array.from({ length: count }, () =>
        this.singleton.get().then(
          (value) => `resolved: ${value}`,
          (error: Error) => `rejected: ${error.message}`,
        ),
      ),
    );
    this.result = {
      call: `${count} × get()`,
      lines: outcomes.map((outcome, i) => `get() ${i + 1} ${outcome}`),
    };
    this.running = false;
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
    `;
  }
}
