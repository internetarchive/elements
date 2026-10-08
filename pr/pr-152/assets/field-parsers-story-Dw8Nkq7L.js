import{r as c,n as m,c as z,i as O,h as Y,b as p,a as A,A as B}from"./index-3KhzcWip.js";import{t as U}from"./theme-styles-BFBrPq8q.js";const k=`import {
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
`,j=`import {
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
`,J=`import {
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
`,E=`import {
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
`,H=`import {
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
`,L=`import {
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
`,Z=`import {
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
`,G=`import {
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
`,q=`import {
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
`,h=class h{parseValue(e){if(typeof e=="string"){const n=e.trim().toLowerCase();if(n==="false"||n==="0"||n==="no")return!1;if(n==="true"||n==="1"||n==="yes")return!0}return!!e}};h.shared=new h;let F=h;const g=class g{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const n=parseFloat(e);if(!Number.isNaN(n))return n}};g.shared=new g;let f=g;const y=class y{parseValue(e){return f.shared.parseValue(e)}};y.shared=new y;let $=y;const w=class w{parseValue(e){return this.parseCompactDate(e)||this.parseJSDate(e)||this.parseBracketDate(e)}parseCompactDate(e){if(typeof e!="string")return;const n=e.trim().match(/^(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?$/);if(!n)return;const[,t,a,s,i="00",C="00",N="00"]=n,M=new Date(`${t}-${a}-${s}T${i}:${C}:${N}`);return Number.isNaN(M.getTime())?void 0:M}parseBracketDate(e){if(typeof e!="string")return;const n=e.match(/\[([0-9]{4})\]/);if(!(!n||n.length<2))return this.parseJSDate(n[1])}parseJSDate(e){if(typeof e!="string")return;let n=e;n.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(n=n.replace(" ","T"));const t=Date.parse(n);if(Number.isNaN(t))return;let a=new Date(n);return(n.match(/^[0-9]{4}$/)||n.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(a=new Date(a.getTime()+a.getTimezoneOffset()*1e3*60)),a}};w.shared=new w;let D=w;const b=class b{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const n=e.split(":");let t;return n.length===1?t=this.parseNumberFormat(n[0]):t=this.parseColonSeparatedFormat(n),t}parseNumberFormat(e){let n=parseFloat(e);return Number.isNaN(n)&&(n=void 0),n}parseColonSeparatedFormat(e){let n=!1;const t=e.map((a,s)=>{const i=parseFloat(a);if(Number.isNaN(i))return n=!0,0;const N=60**(e.length-1-s);return i*Math.floor(N)}).reduce((a,s)=>a+s,0);return n?void 0:t}};b.shared=new b;let T=b;const v=class v{parseValue(e){if(typeof e=="string")return e}};v.shared=new v;let S=v;const V=class V{parseValue(e){if(typeof e=="string")return e}};V.shared=new V;let _=V;const P=class P{parseValue(e){return String(e)}};P.shared=new P;let I=P;const K=`export type FieldParserRawValue = string | number | boolean;

export interface FieldParserInterface<T> {
  /**
   * Parse the raw value and return a value of type T or undefined if unparseable
   *
   * @param rawValue T | undefined
   */
  parseValue(rawValue: FieldParserRawValue): T | undefined;
}
`;var Q=Object.defineProperty,W=Object.getOwnPropertyDescriptor,l=(r,e,n,t)=>{for(var a=t>1?void 0:t?W(e,n):e,s=r.length-1,i;s>=0;s--)(i=r[s])&&(a=(t?i(e,n,a):i(a))||a);return t&&a&&Q(e,n,a),a};let o=class extends O{constructor(){super(...arguments),this.serviceName="",this.usage="",this.apiSource="",this.focused=!1,this.detailsVisible=!1}willUpdate(r){r.has("serviceName")&&(this.focused=this.serviceName===Y(window.location.hash),this.detailsVisible=this.focused)}render(){return p`
      <div id="container">
        <h2><code>${this.serviceName}</code></h2>
        <h3>Try it</h3>
        <div class="console">
          <slot name="console"></slot>
        </div>
        <button
          class="details-toggle ${this.detailsVisible?"expanded":"collapsed"}"
          aria-expanded="${this.detailsVisible}"
          @click=${()=>this.detailsVisible=!this.detailsVisible}
        >
          Import, Usage &amp; API
        </button>
        <div
          id="details"
          class="${this.detailsVisible?"expanded":"collapsed"}"
        >
          <div class="details-inner ${this.focused?"focused":""}">
            <h3>Import</h3>
            <syntax-highlighter
              language="typescript"
              .code=${this.importCode??this.defaultImport}
            ></syntax-highlighter>
            <h3>Usage</h3>
            <syntax-highlighter
              language="typescript"
              .code=${this.usage}
            ></syntax-highlighter>
            <h3>API</h3>
            <syntax-highlighter
              language="typescript"
              .code=${this.apiSource}
            ></syntax-highlighter>
            <slot name="usage-notes"></slot>
          </div>
        </div>
      </div>
    `}get defaultImport(){return`import '@internetarchive/elements/services/${this.importPath??`${this.serviceName}/${this.serviceName}`}';`}static get styles(){return[U,A`
        #container {
          background: #f0f0f0;
          padding: 0 10px 10px;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
        }

        #details {
          display: grid;
          grid-template-rows: 1fr;
          transition: grid-template-rows 0.2s ease;
        }

        #details.collapsed {
          grid-template-rows: 0fr;
        }

        .details-inner {
          font-size: 14px;
          overflow: hidden;
          min-height: 0;
        }

        h2 {
          font-size: 0.85rem;
          font-weight: 600;
          margin: 10px 0 8px;
        }

        h3 {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #666;
          margin: 8px 0 4px;
        }

        .details-toggle {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 6px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #595959;
          cursor: pointer;
          user-select: none;
          border: none;
          background: none;
          padding: 0;
        }

        .details-toggle::before {
          content: '▾';
          font-size: 0.65rem;
          display: inline-block;
          transition: transform 0.15s;
        }

        .details-toggle.collapsed::before {
          transform: rotate(-90deg);
        }

        .console {
          background-color: var(--primary-background-color);
          padding: 0.5em;
        }

        .details-inner syntax-highlighter {
          display: block;
          --syntax-max-height: 8rem;
        }

        .details-inner.focused syntax-highlighter {
          --syntax-max-height: none;
        }
      `]}};l([m({type:String})],o.prototype,"serviceName",2);l([m({type:String})],o.prototype,"importPath",2);l([m({type:String})],o.prototype,"importCode",2);l([m({type:String})],o.prototype,"usage",2);l([m({type:String})],o.prototype,"apiSource",2);l([c()],o.prototype,"focused",2);l([c()],o.prototype,"detailsVisible",2);o=l([z("service-template")],o);var X=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,x=(r,e,n,t)=>{for(var a=t>1?void 0:t?ee(e,n):e,s=r.length-1,i;s>=0;s--)(i=r[s])&&(a=(t?i(e,n,a):i(a))||a);return t&&a&&X(e,n,a),a};const d=[{name:"DurationParser",parser:T.shared,samples:["1:02:03.5","12:30","90.25","abc"]},{name:"DateParser",parser:D.shared,samples:["2024-03-15","[1999]","2024-03-15T10:00:00Z","not a date"]},{name:"ByteParser",parser:$.shared,samples:["1024","2048.5","lots"]},{name:"BooleanParser",parser:F.shared,samples:["true","false","0","1"]},{name:"NumberParser",parser:f.shared,samples:["42","3.14","NaN"]},{name:"MediaTypeParser",parser:S.shared,samples:["texts","movies","etree"]},{name:"PageProgressionParser",parser:_.shared,samples:["rl","lr"]},{name:"StringParser",parser:I.shared,samples:["hello","  padded  ","42"]}],R=Object.assign({"./field-types/boolean.ts":k,"./field-types/byte.ts":j,"./field-types/date.ts":J,"./field-types/duration.ts":E,"./field-types/list.ts":H,"./field-types/mediatype.ts":L,"./field-types/number.ts":Z,"./field-types/page-progression.ts":G,"./field-types/string.ts":q}),ne=[K,...Object.keys(R).sort().map(r=>R[r])].map(r=>r.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim()).join(`

`),re=`import { DurationParser } from '@internetarchive/elements/services/field-parsers/field-parsers';

DurationParser.shared.parseValue('1:02:03.5'); // 3723.5
DurationParser.shared.parseValue('abc'); // undefined`;function ae(r){return r===void 0?"undefined":r instanceof Date?`Date ${r.toISOString()}`:JSON.stringify(r)}let u=class extends O{constructor(){super(...arguments),this.parserName=d[0].name,this.raw=d[0].samples[0]}get entry(){return d.find(r=>r.name===this.parserName)??d[0]}render(){return p`
      <service-template
        serviceName="field-parsers"
        .usage=${re}
        .apiSource=${ne}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            Parser
            <select @change=${this.pickParser}>
              ${d.map(r=>p`<option
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
              autocomplete="off"
              spellcheck="false"
              .value=${this.raw}
              @input=${r=>this.raw=r.target.value}
            />
          </label>
          <button type="submit">Parse</button>
          <div class="samples">
            Try:
            ${this.entry.samples.map(r=>p`<button
                  type="button"
                  class="sample"
                  @click=${()=>this.useSample(r)}
                >
                  ${r}
                </button>`)}
          </div>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?p`<code class="call">${this.result.call}</code>
                  <code class="output">${this.result.output}</code>`:B}
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
    `}pickParser(r){this.parserName=r.target.value,this.raw=this.entry.samples[0],this.result=void 0}useSample(r){this.raw=r,this.parse()}run(r){r.preventDefault(),this.parse()}parse(){const{name:r,parser:e}=this.entry;this.result={call:`${r}.shared.parseValue(${JSON.stringify(this.raw)})`,output:ae(e.parseValue(this.raw))}}static get styles(){return A`
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
    `}};x([c()],u.prototype,"parserName",2);x([c()],u.prototype,"raw",2);x([c()],u.prototype,"result",2);u=x([z("field-parsers-story")],u);export{u as FieldParsersStory};
