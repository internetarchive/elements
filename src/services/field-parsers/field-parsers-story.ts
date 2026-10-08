import { css, html, LitElement, nothing, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import {
  BooleanParser,
  ByteParser,
  DateParser,
  DurationParser,
  MediaTypeParser,
  NumberParser,
  PageProgressionParser,
  StringParser,
  type FieldParserInterface,
} from './field-parsers';
import interfaceSource from './field-parser-interface.ts?raw';

import '@demo/service-template';

interface ParserEntry {
  name: string;
  parser: FieldParserInterface<unknown>;
  samples: string[];
}

const PARSERS: ParserEntry[] = [
  {
    name: 'DurationParser',
    parser: DurationParser.shared,
    samples: ['1:02:03.5', '12:30', '90.25', 'abc'],
  },
  {
    name: 'DateParser',
    parser: DateParser.shared,
    samples: ['2024-03-15', '[1999]', '2024-03-15T10:00:00Z', 'not a date'],
  },
  {
    name: 'ByteParser',
    parser: ByteParser.shared,
    samples: ['1024', '2048.5', 'lots'],
  },
  {
    name: 'BooleanParser',
    parser: BooleanParser.shared,
    samples: ['true', 'false', '0', '1'],
  },
  {
    name: 'NumberParser',
    parser: NumberParser.shared,
    samples: ['42', '3.14', 'NaN'],
  },
  {
    name: 'MediaTypeParser',
    parser: MediaTypeParser.shared,
    samples: ['texts', 'movies', 'etree'],
  },
  {
    name: 'PageProgressionParser',
    parser: PageProgressionParser.shared,
    samples: ['rl', 'lr'],
  },
  {
    name: 'StringParser',
    parser: StringParser.shared,
    samples: ['hello', '  padded  ', '42'],
  },
];

// The parsers' source, which carries the signatures and result types.
const parserSources = import.meta.glob<string>(
  ['./field-types/*.ts', '!./field-types/*.test.ts'],
  { query: '?raw', import: 'default', eager: true },
);

const API_SOURCE = [
  interfaceSource,
  ...Object.keys(parserSources)
    .sort()
    .map((path) => parserSources[path]),
]
  .map((source) =>
    source.replace(/^import[\s\S]*?from '[^']+';\n/gm, '').trim(),
  )
  .join('\n\n');

const USAGE = `import { DurationParser } from '@internetarchive/elements/services/field-parsers/field-parsers';

DurationParser.shared.parseValue('1:02:03.5'); // 3723.5
DurationParser.shared.parseValue('abc'); // undefined`;

/** How a parsed value reads in the result box. */
function show(value: unknown): string {
  if (value === undefined) return 'undefined';
  if (value instanceof Date) return `Date ${value.toISOString()}`;
  return JSON.stringify(value);
}

@customElement('field-parsers-story')
export class FieldParsersStory extends LitElement {
  @state() private parserName = PARSERS[0].name;

  @state() private raw = PARSERS[0].samples[0];

  @state() private result?: { call: string; output: string };

  private get entry(): ParserEntry {
    return PARSERS.find((p) => p.name === this.parserName) ?? PARSERS[0];
  }

  render() {
    return html`
      <service-template
        serviceName="field-parsers"
        .usage=${USAGE}
        .apiSource=${API_SOURCE}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            Parser
            <select @change=${this.pickParser}>
              ${PARSERS.map(
                (p) =>
                  html`<option
                    value=${p.name}
                    ?selected=${p.name === this.parserName}
                  >
                    ${p.name}
                  </option>`,
              )}
            </select>
          </label>
          <label>
            Raw value
            <input
              type="text"
              name="raw"
              autocomplete="off"
              spellcheck="false"
              .value=${this.raw}
              @input=${(e: Event) =>
                (this.raw = (e.target as HTMLInputElement).value)}
            />
          </label>
          <button type="submit">Parse</button>
          <div class="samples">
            Try:
            ${this.entry.samples.map(
              (sample) =>
                html`<button
                  type="button"
                  class="sample"
                  @click=${() => this.useSample(sample)}
                >
                  ${sample}
                </button>`,
            )}
          </div>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result
              ? html`<code class="call">${this.result.call}</code>
                  <code class="output">${this.result.output}</code>`
              : nothing}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Each parser takes a raw value from an archive.org API response and
            returns the typed value, or <code>undefined</code> when it can't
            read it. Nothing here touches the network.
          </p>
        </div>
      </service-template>
    `;
  }

  private pickParser(e: Event) {
    this.parserName = (e.target as HTMLSelectElement).value;
    this.raw = this.entry.samples[0];
    this.result = undefined;
  }

  private useSample(sample: string) {
    this.raw = sample;
    this.parse();
  }

  private run(e: Event) {
    e.preventDefault();
    this.parse();
  }

  private parse() {
    const { name, parser } = this.entry;
    this.result = {
      call: `${name}.shared.parseValue(${JSON.stringify(this.raw)})`,
      output: show(parser.parseValue(this.raw)),
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
        width: 14rem;
        max-width: 100%;
      }

      .samples {
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
