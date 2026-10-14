import{i as M,A as R,b as l,a as C,r as $,c as z}from"./index-BdF5oJTx.js";import"./service-template-BUgozZfx.js";import"./syntax-highlighter-BP0qIevz.js";import"./theme-styles-Ci25A_bo.js";const Y=`import {
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
`,B=`import {
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
`,A=`import {
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
`,O=`import {
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
`,U=`import {
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
`,k=`import {
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
`,j=`import {
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
`,J=`import {
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
`,E=`import {
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
`,p=class p{parseValue(e){if(typeof e=="string"){const n=e.trim().toLowerCase();if(n==="false"||n==="0"||n==="no")return!1;if(n==="true"||n==="1"||n==="yes")return!0}return!!e}};p.shared=new p;let P=p;const c=class c{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const n=parseFloat(e);if(!Number.isNaN(n))return n}};c.shared=new c;let u=c;const m=class m{parseValue(e){return u.shared.parseValue(e)}};m.shared=new m;let v=m;const f=class f{parseValue(e){return this.parseCompactDate(e)||this.parseJSDate(e)||this.parseBracketDate(e)}parseCompactDate(e){if(typeof e!="string")return;const n=e.trim().match(/^(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?$/);if(!n)return;const[,t,a,s,i="00",_="00",b="00"]=n,S=new Date(`${t}-${a}-${s}T${i}:${_}:${b}`);return Number.isNaN(S.getTime())?void 0:S}parseBracketDate(e){if(typeof e!="string")return;const n=e.match(/\[([0-9]{4})\]/);if(!(!n||n.length<2))return this.parseJSDate(n[1])}parseJSDate(e){if(typeof e!="string")return;let n=e;n.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(n=n.replace(" ","T"));const t=Date.parse(n);if(Number.isNaN(t))return;let a=new Date(n);return(n.match(/^[0-9]{4}$/)||n.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(a=new Date(a.getTime()+a.getTimezoneOffset()*1e3*60)),a}};f.shared=new f;let F=f;const h=class h{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const n=e.split(":");let t;return n.length===1?t=this.parseNumberFormat(n[0]):t=this.parseColonSeparatedFormat(n),t}parseNumberFormat(e){let n=parseFloat(e);return Number.isNaN(n)&&(n=void 0),n}parseColonSeparatedFormat(e){let n=!1;const t=e.map((a,s)=>{const i=parseFloat(a);if(Number.isNaN(i))return n=!0,0;const b=60**(e.length-1-s);return i*Math.floor(b)}).reduce((a,s)=>a+s,0);return n?void 0:t}};h.shared=new h;let N=h;const w=class w{parseValue(e){if(typeof e=="string")return e}};w.shared=new w;let x=w;const g=class g{parseValue(e){if(typeof e=="string")return e}};g.shared=new g;let D=g;const y=class y{parseValue(e){return String(e)}};y.shared=new y;let T=y;const L=`export type FieldParserRawValue = string | number | boolean;

export interface FieldParserInterface<T> {
  /**
   * Parse the raw value and return a value of type T or undefined if unparseable
   *
   * @param rawValue T | undefined
   */
  parseValue(rawValue: FieldParserRawValue): T | undefined;
}
`;var Z=Object.defineProperty,H=Object.getOwnPropertyDescriptor,V=(r,e,n,t)=>{for(var a=t>1?void 0:t?H(e,n):e,s=r.length-1,i;s>=0;s--)(i=r[s])&&(a=(t?i(e,n,a):i(a))||a);return t&&a&&Z(e,n,a),a};const d=[{name:"DurationParser",parser:N.shared,samples:["1:02:03.5","12:30","90.25","abc"]},{name:"DateParser",parser:F.shared,samples:["2024-03-15","[1999]","2024-03-15T10:00:00Z","not a date"]},{name:"ByteParser",parser:v.shared,samples:["1024","2048.5","lots"]},{name:"BooleanParser",parser:P.shared,samples:["true","false","0","1"]},{name:"NumberParser",parser:u.shared,samples:["42","3.14","NaN"]},{name:"MediaTypeParser",parser:x.shared,samples:["texts","movies","etree"]},{name:"PageProgressionParser",parser:D.shared,samples:["rl","lr"]},{name:"StringParser",parser:T.shared,samples:["hello","  padded  ","42"]}],I=Object.assign({"./field-types/boolean.ts":Y,"./field-types/byte.ts":B,"./field-types/date.ts":A,"./field-types/duration.ts":O,"./field-types/list.ts":U,"./field-types/mediatype.ts":k,"./field-types/number.ts":j,"./field-types/page-progression.ts":J,"./field-types/string.ts":E}),G=[L,...Object.keys(I).sort().map(r=>I[r])].map(r=>r.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim()).join(`

`),q=`import { DurationParser } from '@internetarchive/elements/services/field-parsers/field-parsers';

DurationParser.shared.parseValue('1:02:03.5'); // 3723.5
DurationParser.shared.parseValue('abc'); // undefined`;function K(r){return r===void 0?"undefined":r instanceof Date?`Date ${r.toISOString()}`:JSON.stringify(r)}let o=class extends M{constructor(){super(...arguments),this.parserName=d[0].name,this.raw=""}get entry(){return d.find(r=>r.name===this.parserName)??d[0]}render(){return l`
      <service-template
        serviceName="field-parsers"
        .usage=${q}
        .apiSource=${G}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            Parser
            <select @change=${this.pickParser}>
              ${d.map(r=>l`<option
                    value=${r.name}
                    ?selected=${r.name===this.parserName}
                  >
                    ${r.name}
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
              @input=${r=>this.raw=r.target.value}
            />
          </label>
          <button type="submit">Parse</button>
          <div class="samples">
            Try:
            ${this.entry.samples.map(r=>l`<button
                  type="button"
                  class="sample"
                  @click=${()=>this.useSample(r)}
                >
                  ${r}
                </button>`)}
          </div>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?l`<code class="call">${this.result.call}</code>
                  <code class="output">${this.result.output}</code>`:R}
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
    `}pickParser(r){this.parserName=r.target.value,this.raw="",this.result=void 0}useSample(r){this.raw=r,this.parse()}run(r){r.preventDefault(),this.parse()}parse(){const{name:r,parser:e}=this.entry;this.result={call:`${r}.shared.parseValue(${JSON.stringify(this.raw)})`,output:K(e.parseValue(this.raw))}}static get styles(){return C`
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
    `}};V([$()],o.prototype,"parserName",2);V([$()],o.prototype,"raw",2);V([$()],o.prototype,"result",2);o=V([z("field-parsers-story")],o);export{o as FieldParsersStory};
