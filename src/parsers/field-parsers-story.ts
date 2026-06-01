import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { FieldParserInterface } from './field-parser-interface';
import { BooleanParser } from './field-types/boolean';
import { ByteParser } from './field-types/byte';
import { DateParser } from './field-types/date';
import { DurationParser } from './field-types/duration';
import { ListParser } from './field-types/list';
import { MediaTypeParser } from './field-types/mediatype';
import { NumberParser } from './field-types/number';
import { PageProgressionParser } from './field-types/page-progression';
import { StringParser } from './field-types/string';

interface ParserOption {
  label: string;
  parser: FieldParserInterface<unknown>;
  example: string;
}

const PARSERS: ParserOption[] = [
  { label: 'number', parser: NumberParser.shared, example: '1234.5' },
  { label: 'boolean', parser: BooleanParser.shared, example: 'true' },
  { label: 'byte', parser: ByteParser.shared, example: '1572864' },
  { label: 'date', parser: DateParser.shared, example: '2021-11-18' },
  { label: 'duration', parser: DurationParser.shared, example: '1:02:03' },
  {
    label: 'list (of numbers)',
    parser: new ListParser(NumberParser.shared),
    example: '1; 2; 3',
  },
  { label: 'mediatype', parser: MediaTypeParser.shared, example: 'texts' },
  {
    label: 'page-progression',
    parser: PageProgressionParser.shared,
    example: 'rl',
  },
  { label: 'string', parser: StringParser.shared, example: 'hello' },
];

/**
 * Interactive demo for the field-type parsers. Pick a parser, type a raw
 * value, and see the parsed output and its runtime type.
 */
@customElement('field-parsers-story')
export class FieldParsersStory extends LitElement {
  @state() private selectedIndex = 0;

  @state() private rawValue = PARSERS[0].example;

  private get selected(): ParserOption {
    return PARSERS[this.selectedIndex];
  }

  render() {
    const result = this.selected.parser.parseValue(this.rawValue);
    return html`
      <h2>Field Parsers — Playground</h2>
      <p>
        Parse a raw metadata value with any field-type parser from
        <code>@internetarchive/elements</code>.
      </p>

      <div class="controls">
        <label>
          Parser
          <select @change=${this.onParserChange}>
            ${PARSERS.map(
              (p, i) =>
                html`<option value=${i} ?selected=${i === this.selectedIndex}>
                  ${p.label}
                </option>`,
            )}
          </select>
        </label>
        <label>
          Input
          <input
            .value=${this.rawValue}
            @input=${this.onInput}
            placeholder="raw value"
          />
        </label>
        <button @click=${this.useExample}>Use example</button>
      </div>

      <div class="result ${result === undefined ? 'unparseable' : ''}">
        <span class="arrow">Result →</span>
        <code>${this.format(result)}</code>
        <span class="type">${this.typeLabel(result)}</span>
      </div>
    `;
  }

  private onParserChange(e: Event) {
    this.selectedIndex = Number((e.target as HTMLSelectElement).value);
    this.rawValue = this.selected.example;
  }

  private onInput(e: Event) {
    this.rawValue = (e.target as HTMLInputElement).value;
  }

  private useExample() {
    this.rawValue = this.selected.example;
  }

  private format(value: unknown): string {
    if (value === undefined) return 'undefined (unparseable)';
    if (value instanceof Date) return value.toISOString();
    if (Array.isArray(value)) return JSON.stringify(value);
    return String(value);
  }

  private typeLabel(value: unknown): string {
    if (value === undefined) return 'undefined';
    if (value instanceof Date) return 'Date';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  }

  static styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      max-width: 40rem;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      gap: 12px;
      margin-bottom: 1rem;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.85rem;
      font-weight: 600;
    }

    select,
    input {
      padding: 4px 6px;
      font-size: 0.9rem;
    }

    .result {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: #f0f0f0;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .result.unparseable code {
      color: #a00;
    }

    .arrow {
      color: #666;
    }

    .result code {
      font-size: 1rem;
    }

    .type {
      margin-left: auto;
      font-size: 0.75rem;
      color: #666;
    }
  `;
}
