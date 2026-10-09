import{i as c,A as f,b as s,a as h,r as p,c as w}from"./index-nupA3kNI.js";import{D as P,a as g,B as y,b as V,N as b,M as v,P as F,S as _}from"./string-B_v7wtUf.js";import"./service-template-B8lBX3uo.js";import"./theme-styles-BQ6GYRF4.js";const x=`import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

export class BooleanParser implements FieldParserInterface<boolean> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new BooleanParser();

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): boolean {
    if (typeof rawValue === 'string') {
      // recognize the common textual encodings, case- and whitespace-insensitive
      const normalized = rawValue.trim().toLowerCase();
      if (normalized === 'false' || normalized === '0' || normalized === 'no') {
        return false;
      }
      if (normalized === 'true' || normalized === '1' || normalized === 'yes') {
        return true;
      }
    }
    return Boolean(rawValue);
  }
}
`,D=`import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';
import { NumberParser } from './number';

/**
 * A Byte is a unit-specific \`number\`, in bytes.
 */
export type Byte = number;

/**
 * The ByteParser is a unit-specific NumberParser
 * that returns a value in bytes
 *
 * @export
 * @class ByteParser
 * @implements {FieldParserInterface<Byte>}
 */
export class ByteParser implements FieldParserInterface<Byte> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new ByteParser();

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): Byte | undefined {
    const parser = NumberParser.shared;
    return parser.parseValue(rawValue);
  }
}
`,N=`import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

export class DateParser implements FieldParserInterface<Date> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new DateParser();

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): Date | undefined {
    // try different date parsing. Compact all-digit timestamps are matched
    // first with a strict regex so their result is deterministic; \`Date.parse\`
    // behavior on non-ISO strings is implementation-defined across engines.
    return (
      this.parseCompactDate(rawValue) ||
      this.parseJSDate(rawValue) ||
      this.parseBracketDate(rawValue)
    );
  }

  // handles compact all-digit timestamps like \`20101106\` (YYYYMMDD) and
  // \`20101106063500\` (YYYYMMDDHHMMSS), used by fields such as \`scandate\`. The
  // digits are interpreted as local time, matching how the YYYY-MM-DD form is
  // normalized above.
  private parseCompactDate(rawValue: FieldParserRawValue): Date | undefined {
    if (typeof rawValue !== 'string') return undefined;
    const match = rawValue
      .trim()
      .match(/^(\\d{4})(\\d{2})(\\d{2})(?:(\\d{2})(\\d{2})(\\d{2}))?$/);
    if (!match) return undefined;
    const [, year, month, day, hour = '00', minute = '00', second = '00'] =
      match;
    // a \`T\`-form with no time zone is parsed as local time
    const date = new Date(
      \`\${year}-\${month}-\${day}T\${hour}:\${minute}:\${second}\`,
    );
    return Number.isNaN(date.getTime()) ? undefined : date;
  }

  // handles "[yyyy]" format
  private parseBracketDate(rawValue: FieldParserRawValue): Date | undefined {
    if (typeof rawValue !== 'string') return undefined;
    const yearMatch = rawValue.match(/\\[([0-9]{4})\\]/);
    if (!yearMatch || yearMatch.length < 2) {
      return undefined;
    }
    return this.parseJSDate(yearMatch[1]);
  }

  private parseJSDate(rawValue: FieldParserRawValue): Date | undefined {
    if (typeof rawValue !== 'string') return undefined;
    let parsedValue = rawValue;

    // fix for Safari not supporting \`yyyy-mm-dd HH:MM:SS\` format, insert a \`T\` into the space
    if (
      parsedValue.match(
        /^[0-9]{4}-[0-9]{2}-[0-9]{2}\\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/,
      )
    ) {
      parsedValue = parsedValue.replace(' ', 'T');
    }

    const parsed = Date.parse(parsedValue);
    if (Number.isNaN(parsed)) {
      return undefined;
    }
    let date = new Date(parsedValue);
    // The \`Date(string)\` constructor parses some strings as UTC and some in the local timezone.
    // This attempts to detect cases that get parsed as UTC but should be parsed as local.
    // Note that this does _not_ include cases with an explicit time zone specified, which
    // should generally be parsed as-is and not converted to local time.
    const isUTCTimeZoneInferred =
      parsedValue.match(/^[0-9]{4}$/) || // just the year, ie \`2020\`
      parsedValue.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/); // YYYY-MM-DD format
    if (isUTCTimeZoneInferred) {
      date = new Date(date.getTime() + date.getTimezoneOffset() * 1000 * 60);
    }
    return date;
  }
}
`,T=`import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

/**
 * Duration is a number in seconds
 */
export type Duration = number;

/**
 * Parses duration format to a \`Duration\` (number of seconds with decimal)
 *
 * Can parse hh:mm:ss.ms, hh:mm:ss, mm:ss, mm:ss.ms, and s.ms formats
 */
export class DurationParser implements FieldParserInterface<Duration> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new DurationParser();

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): Duration | undefined {
    if (typeof rawValue === 'number') return rawValue;
    if (typeof rawValue === 'boolean') return undefined;

    const componentArray: string[] = rawValue.split(':');
    let seconds: number | undefined;
    // if there are no colons in the string, we can assume it's in sss.ms format so just parse it
    if (componentArray.length === 1) {
      seconds = this.parseNumberFormat(componentArray[0]);
    } else {
      seconds = this.parseColonSeparatedFormat(componentArray);
    }

    return seconds;
  }

  /**
   * Parse sss.ms format
   *
   * @param rawValue
   * @returns
   */
  private parseNumberFormat(rawValue: string): number | undefined {
    let seconds: number | undefined = parseFloat(rawValue);
    if (Number.isNaN(seconds)) seconds = undefined;
    return seconds;
  }

  /**
   * Parse hh:mm:ss.ms format
   *
   * @param componentArray
   * @returns
   */
  private parseColonSeparatedFormat(
    componentArray: string[],
  ): number | undefined {
    // if any of the hh:mm:ss components are NaN, just return undefined
    let hasNaNComponent = false;
    const parsedValue = componentArray
      .map((element: string, index: number) => {
        const componentValue: number = parseFloat(element);
        if (Number.isNaN(componentValue)) {
          hasNaNComponent = true;
          return 0;
        }
        const exponent: number = componentArray.length - 1 - index;
        const multiplier: number = 60 ** exponent;
        return componentValue * Math.floor(multiplier);
      })
      .reduce((a, b) => a + b, 0);

    return hasNaNComponent ? undefined : parsedValue;
  }
}
`,S=`import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

export class ListParser<T> implements FieldParserInterface<T[]> {
  private parser: FieldParserInterface<T>;

  private separators = [';', ','];

  constructor(
    parser: FieldParserInterface<T>,
    options?: {
      separators?: string[];
    },
  ) {
    this.parser = parser;
    if (options && options.separators) {
      this.separators = options.separators;
    }
  }

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): T[] {
    const stringifiedValue = String(rawValue);
    let results: string[] = [];

    for (const separator of this.separators) {
      results = stringifiedValue.split(separator);
      if (results.length > 1) break;
    }

    return this.parseListValues(results);
  }

  private parseListValues(rawValues: string[]): T[] {
    const trimmed = rawValues.map((s) => s.trim());
    const parsed = trimmed.map((rawValue) => this.parser.parseValue(rawValue));
    const result: T[] = [];
    parsed.forEach((p) => {
      if (p !== undefined) result.push(p);
    });
    return result;
  }
}
`,$=`import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

/**
 * @deprecated Use the \`MediaType\` type from
 * \`@internetarchive/iaux-item-metadata\`, which is paired with a validating
 * \`MediaTypeField\`.
 */
export type MediaType =
  | 'account'
  | 'audio'
  | 'collection'
  | 'data'
  | 'etree'
  | 'image'
  | 'movies'
  | 'search'
  | 'software'
  | 'texts'
  | 'web';

/**
 * @deprecated Use \`MediaTypeField\` from \`@internetarchive/iaux-item-metadata\`,
 * which validates the value against the allowed set instead of casting.
 */
export class MediaTypeParser implements FieldParserInterface<MediaType> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new MediaTypeParser();

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): MediaType | undefined {
    if (typeof rawValue !== 'string') return undefined;
    return rawValue as MediaType;
  }
}
`,M=`import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

export class NumberParser implements FieldParserInterface<number> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new NumberParser();

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): number | undefined {
    if (typeof rawValue === 'number') return rawValue;
    if (typeof rawValue === 'boolean') return undefined;

    const value = parseFloat(rawValue);
    if (Number.isNaN(value)) {
      return undefined;
    }
    return value;
  }
}
`,I=`import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

/**
 * @deprecated Use the \`PageProgression\` type from
 * \`@internetarchive/iaux-item-metadata\`, which is paired with a validating
 * \`PageProgressionField\`.
 */
export type PageProgression = 'rl' | 'lr';

/**
 * @deprecated Use \`PageProgressionField\` from
 * \`@internetarchive/iaux-item-metadata\`, which validates the value against the
 * allowed set instead of casting.
 */
export class PageProgressionParser
  implements FieldParserInterface<PageProgression>
{
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new PageProgressionParser();

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): PageProgression | undefined {
    if (typeof rawValue !== 'string') return undefined;
    return rawValue as PageProgression;
  }
}
`,R=`import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

export class StringParser implements FieldParserInterface<string> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new StringParser();

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): string {
    return String(rawValue);
  }
}
`,B=`export type FieldParserRawValue = string | number | boolean;

export interface FieldParserInterface<T> {
  /**
   * Parse the raw value and return a value of type T or undefined if unparseable
   *
   * @param rawValue T | undefined
   */
  parseValue(rawValue: FieldParserRawValue): T | undefined;
}
`;var z=Object.defineProperty,C=Object.getOwnPropertyDescriptor,o=(e,a,l,t)=>{for(var n=t>1?void 0:t?C(a,l):a,d=e.length-1,u;d>=0;d--)(u=e[d])&&(n=(t?u(a,l,n):u(n))||n);return t&&n&&z(a,l,n),n};const i=[{name:"DurationParser",parser:P.shared,samples:["1:02:03.5","12:30","90.25","abc"]},{name:"DateParser",parser:g.shared,samples:["2024-03-15","[1999]","2024-03-15T10:00:00Z","not a date"]},{name:"ByteParser",parser:y.shared,samples:["1024","2048.5","lots"]},{name:"BooleanParser",parser:V.shared,samples:["true","false","0","1"]},{name:"NumberParser",parser:b.shared,samples:["42","3.14","NaN"]},{name:"MediaTypeParser",parser:v.shared,samples:["texts","movies","etree"]},{name:"PageProgressionParser",parser:F.shared,samples:["rl","lr"]},{name:"StringParser",parser:_.shared,samples:["hello","  padded  ","42"]}],m=Object.assign({"./field-types/boolean.ts":x,"./field-types/byte.ts":D,"./field-types/date.ts":N,"./field-types/duration.ts":T,"./field-types/list.ts":S,"./field-types/mediatype.ts":$,"./field-types/number.ts":M,"./field-types/page-progression.ts":I,"./field-types/string.ts":R}),Y=[B,...Object.keys(m).sort().map(e=>m[e])].map(e=>e.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim()).join(`

`),A=`import { DurationParser } from '@internetarchive/elements/services/field-parsers/field-parsers';

DurationParser.shared.parseValue('1:02:03.5'); // 3723.5
DurationParser.shared.parseValue('abc'); // undefined`;function O(e){return e===void 0?"undefined":e instanceof Date?`Date ${e.toISOString()}`:JSON.stringify(e)}let r=class extends c{constructor(){super(...arguments),this.parserName=i[0].name,this.raw=""}get entry(){return i.find(e=>e.name===this.parserName)??i[0]}render(){return s`
      <service-template
        serviceName="field-parsers"
        .usage=${A}
        .apiSource=${Y}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            Parser
            <select @change=${this.pickParser}>
              ${i.map(e=>s`<option
                    value=${e.name}
                    ?selected=${e.name===this.parserName}
                  >
                    ${e.name}
                  </option>`)}
            </select>
          </label>
          <label>
            Raw value
            <input
              type="text"
              name="raw"
              placeholder=${this.entry.samples[0]}
              autocomplete="off"
              spellcheck="false"
              .value=${this.raw}
              @input=${e=>this.raw=e.target.value}
            />
          </label>
          <button type="submit">Parse</button>
          <div class="samples">
            Try:
            ${this.entry.samples.map(e=>s`<button
                  type="button"
                  class="sample"
                  @click=${()=>this.useSample(e)}
                >
                  ${e}
                </button>`)}
          </div>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?s`<code class="call">${this.result.call}</code>
                  <code class="output">${this.result.output}</code>`:f}
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
    `}pickParser(e){this.parserName=e.target.value,this.raw="",this.result=void 0}useSample(e){this.raw=e,this.parse()}run(e){e.preventDefault(),this.parse()}parse(){const{name:e,parser:a}=this.entry;this.result={call:`${e}.shared.parseValue(${JSON.stringify(this.raw)})`,output:O(a.parseValue(this.raw))}}static get styles(){return h`
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
    `}};o([p()],r.prototype,"parserName",2);o([p()],r.prototype,"raw",2);o([p()],r.prototype,"result",2);r=o([w("field-parsers-story")],r);export{r as FieldParsersStory};
