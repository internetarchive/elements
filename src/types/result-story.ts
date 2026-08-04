import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@demo/story-template';
import type { Result } from './result';

/**
 * `Result<T, E>` has no runtime behavior — it's a typed container
 * (`{ success?: T; error?: E }`) modeled after Swift's Result. This story is a
 * read-only illustration of the two shapes a Result can take and the narrowing
 * pattern a caller uses to consume one.
 */

type Scenario = 'success' | 'error';

const SUCCESS_RESULT: Result<number, Error> = { success: 42 };
const ERROR_RESULT: Result<number, Error> = {
  error: new Error('Item not found'),
};

const EXAMPLE_USAGE = `// A function returns a typed Result instead of throwing:
const result = await fetchFilesCount(identifier);

if (result.error) {
  // \`result.error\` is a typed Error (or subclass) — not \`any\`
  console.error(result.error.message);
} else {
  // \`result.success\` holds the value on the happy path
  console.log(result.success);
}`;

@customElement('result-story')
export class ResultStory extends LitElement {
  @state() private scenario: Scenario = 'success';

  private get result(): Result<number, Error> {
    return this.scenario === 'success' ? SUCCESS_RESULT : ERROR_RESULT;
  }

  render() {
    const { result } = this;
    return html`
      <story-template
        elementTag="result"
        elementClassName="Result"
        .customExampleUsage=${EXAMPLE_USAGE}
      >
        <div slot="demo">
          <p class="intro">
            A typed container for a response: it carries either a
            <code>success</code> value or a typed <code>error</code>, instead of
            an untyped Promise rejection. Modeled after
            <a
              href="https://developer.apple.com/documentation/swift/result"
              target="_blank"
              rel="noopener"
              >Swift's Result</a
            >. Toggle a scenario to see the two shapes and how a caller handles
            each.
          </p>

          <div class="controls" role="group" aria-label="Scenario">
            <button
              class=${this.scenario === 'success' ? 'active' : ''}
              @click=${() => (this.scenario = 'success')}
            >
              Success
            </button>
            <button
              class=${this.scenario === 'error' ? 'active' : ''}
              @click=${() => (this.scenario = 'error')}
            >
              Error
            </button>
          </div>

          <div class="field">
            <span class="label">The Result value</span>
            <code>${this.formatResult(result)}</code>
          </div>
          <div class="field">
            <span class="label">What the caller does</span>
            <code class=${result.error ? 'err' : 'ok'}>
              ${result.error
                ? html`✗ handle error → ${result.error.message}`
                : html`✓ use value → ${result.success}`}
            </code>
          </div>
        </div>
      </story-template>
    `;
  }

  private formatResult(result: Result<number, Error>): string {
    if (result.error) return `{ error: Error("${result.error.message}") }`;
    return `{ success: ${result.success} }`;
  }

  static styles = css`
    .intro {
      margin-top: 0;
      max-width: 40rem;
    }

    .controls {
      display: flex;
      gap: 8px;
      margin-bottom: 1rem;
    }

    button {
      padding: 6px 14px;
      font-size: 0.9rem;
      cursor: pointer;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #fff;
    }

    button.active {
      background: #222;
      color: #fff;
      border-color: #222;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 10px 12px;
      margin-bottom: 8px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #666;
    }

    .field code {
      font-size: 1rem;
    }

    code.ok {
      color: #0a7d28;
    }

    code.err {
      color: #a00;
    }
  `;
}
