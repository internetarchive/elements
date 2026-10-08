import{r as c,n as u,c as N,i as D,h as I,b as d,a as S,A as T}from"./index-DlBrKuaG.js";import{t as R}from"./theme-styles-BtSjYKGw.js";const B=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
export declare class BooleanParser implements FieldParserInterface<boolean> {
    static shared: BooleanParser;
    /** @inheritdoc */
    parseValue(rawValue: FieldParserRawValue): boolean;
}
`,j=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
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
export declare class ByteParser implements FieldParserInterface<Byte> {
    static shared: ByteParser;
    /** @inheritdoc */
    parseValue(rawValue: FieldParserRawValue): Byte | undefined;
}
`,C=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
export declare class DateParser implements FieldParserInterface<Date> {
    static shared: DateParser;
    /** @inheritdoc */
    parseValue(rawValue: FieldParserRawValue): Date | undefined;
    private parseCompactDate;
    private parseBracketDate;
    private parseJSDate;
}
`,O=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
/**
 * Duration is a number in seconds
 */
export type Duration = number;
/**
 * Parses duration format to a \`Duration\` (number of seconds with decimal)
 *
 * Can parse hh:mm:ss.ms, hh:mm:ss, mm:ss, mm:ss.ms, and s.ms formats
 */
export declare class DurationParser implements FieldParserInterface<Duration> {
    static shared: DurationParser;
    /** @inheritdoc */
    parseValue(rawValue: FieldParserRawValue): Duration | undefined;
    /**
     * Parse sss.ms format
     *
     * @param rawValue
     * @returns
     */
    private parseNumberFormat;
    /**
     * Parse hh:mm:ss.ms format
     *
     * @param componentArray
     * @returns
     */
    private parseColonSeparatedFormat;
}
`,M=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
export declare class ListParser<T> implements FieldParserInterface<T[]> {
    private parser;
    private separators;
    constructor(parser: FieldParserInterface<T>, options?: {
        separators?: string[];
    });
    /** @inheritdoc */
    parseValue(rawValue: FieldParserRawValue): T[];
    private parseListValues;
}
`,z=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
/**
 * @deprecated Use the \`MediaType\` type from
 * \`@internetarchive/iaux-item-metadata\`, which is paired with a validating
 * \`MediaTypeField\`.
 */
export type MediaType = 'account' | 'audio' | 'collection' | 'data' | 'etree' | 'image' | 'movies' | 'search' | 'software' | 'texts' | 'web';
/**
 * @deprecated Use \`MediaTypeField\` from \`@internetarchive/iaux-item-metadata\`,
 * which validates the value against the allowed set instead of casting.
 */
export declare class MediaTypeParser implements FieldParserInterface<MediaType> {
    static shared: MediaTypeParser;
    /** @inheritdoc */
    parseValue(rawValue: FieldParserRawValue): MediaType | undefined;
}
`,U=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
export declare class NumberParser implements FieldParserInterface<number> {
    static shared: NumberParser;
    /** @inheritdoc */
    parseValue(rawValue: FieldParserRawValue): number | undefined;
}
`,A=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
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
export declare class PageProgressionParser implements FieldParserInterface<PageProgression> {
    static shared: PageProgressionParser;
    /** @inheritdoc */
    parseValue(rawValue: FieldParserRawValue): PageProgression | undefined;
}
`,k=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
export declare class StringParser implements FieldParserInterface<string> {
    static shared: StringParser;
    /** @inheritdoc */
    parseValue(rawValue: FieldParserRawValue): string;
}
`;class P{parseValue(e){if(typeof e=="string"){const a=e.trim().toLowerCase();if(a==="false"||a==="0"||a==="no")return!1;if(a==="true"||a==="1"||a==="yes")return!0}return!!e}}P.shared=new P;class f{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const a=parseFloat(e);if(!Number.isNaN(a))return a}}f.shared=new f;class y{parseValue(e){return f.shared.parseValue(e)}}y.shared=new y;class v{parseValue(e){return this.parseCompactDate(e)||this.parseJSDate(e)||this.parseBracketDate(e)}parseCompactDate(e){if(typeof e!="string")return;const a=e.trim().match(/^(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?$/);if(!a)return;const[,s,t,n,i="00",F="00",g="00"]=a,V=new Date(`${s}-${t}-${n}T${i}:${F}:${g}`);return Number.isNaN(V.getTime())?void 0:V}parseBracketDate(e){if(typeof e!="string")return;const a=e.match(/\[([0-9]{4})\]/);if(!(!a||a.length<2))return this.parseJSDate(a[1])}parseJSDate(e){if(typeof e!="string")return;let a=e;a.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(a=a.replace(" ","T"));const s=Date.parse(a);if(Number.isNaN(s))return;let t=new Date(a);return(a.match(/^[0-9]{4}$/)||a.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(t=new Date(t.getTime()+t.getTimezoneOffset()*1e3*60)),t}}v.shared=new v;class b{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const a=e.split(":");let s;return a.length===1?s=this.parseNumberFormat(a[0]):s=this.parseColonSeparatedFormat(a),s}parseNumberFormat(e){let a=parseFloat(e);return Number.isNaN(a)&&(a=void 0),a}parseColonSeparatedFormat(e){let a=!1;const s=e.map((t,n)=>{const i=parseFloat(t);if(Number.isNaN(i))return a=!0,0;const g=60**(e.length-1-n);return i*Math.floor(g)}).reduce((t,n)=>t+n,0);return a?void 0:s}}b.shared=new b;class w{parseValue(e){if(typeof e=="string")return e}}w.shared=new w;class x{parseValue(e){if(typeof e=="string")return e}}x.shared=new x;class _{parseValue(e){return String(e)}}_.shared=new _;const J=`export type FieldParserRawValue = string | number | boolean;
export interface FieldParserInterface<T> {
    /**
     * Parse the raw value and return a value of type T or undefined if unparseable
     *
     * @param rawValue T | undefined
     */
    parseValue(rawValue: FieldParserRawValue): T | undefined;
}
`;var E=Object.defineProperty,L=Object.getOwnPropertyDescriptor,l=(r,e,a,s)=>{for(var t=s>1?void 0:s?L(e,a):e,n=r.length-1,i;n>=0;n--)(i=r[n])&&(t=(s?i(e,a,t):i(t))||t);return s&&t&&E(e,a,t),t};let o=class extends D{constructor(){super(...arguments),this.serviceName="",this.usage="",this.apiSource="",this.focused=!1,this.detailsVisible=!1}willUpdate(r){r.has("serviceName")&&(this.focused=this.serviceName===I(window.location.hash),this.detailsVisible=this.focused)}render(){return d`
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
    `}get defaultImport(){return`import '@internetarchive/elements/services/${this.importPath??`${this.serviceName}/${this.serviceName}`}';`}static get styles(){return[R,S`
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
      `]}};l([u({type:String})],o.prototype,"serviceName",2);l([u({type:String})],o.prototype,"importPath",2);l([u({type:String})],o.prototype,"importCode",2);l([u({type:String})],o.prototype,"usage",2);l([u({type:String})],o.prototype,"apiSource",2);l([c()],o.prototype,"focused",2);l([c()],o.prototype,"detailsVisible",2);o=l([N("service-template")],o);var Z=Object.defineProperty,G=Object.getOwnPropertyDescriptor,h=(r,e,a,s)=>{for(var t=s>1?void 0:s?G(e,a):e,n=r.length-1,i;n>=0;n--)(i=r[n])&&(t=(s?i(e,a,t):i(t))||t);return s&&t&&Z(e,a,t),t};const m=[{name:"DurationParser",parser:b.shared,samples:["1:02:03.5","12:30","90.25","abc"]},{name:"DateParser",parser:v.shared,samples:["2024-03-15","[1999]","2024-03-15T10:00:00Z","not a date"]},{name:"ByteParser",parser:y.shared,samples:["1024","2048.5","lots"]},{name:"BooleanParser",parser:P.shared,samples:["true","false","0","1"]},{name:"NumberParser",parser:f.shared,samples:["42","3.14","NaN"]},{name:"MediaTypeParser",parser:w.shared,samples:["texts","movies","etree"]},{name:"PageProgressionParser",parser:x.shared,samples:["rl","lr"]},{name:"StringParser",parser:_.shared,samples:["hello","  padded  ","42"]}],$=Object.assign({"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/boolean.d.ts":B,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/byte.d.ts":j,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/date.d.ts":C,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/duration.d.ts":O,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/list.d.ts":M,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/mediatype.d.ts":z,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/number.d.ts":U,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/page-progression.d.ts":A,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/string.d.ts":k}),H=[J,...Object.keys($).sort().map(r=>$[r])].map(r=>r.replace(/^import .*\n/gm,"").trim()).join(`

`),q=`import { DurationParser } from '@internetarchive/elements/services/field-parsers/field-parsers';

DurationParser.shared.parseValue('1:02:03.5'); // 3723.5
DurationParser.shared.parseValue('abc'); // undefined`;function K(r){return r===void 0?"undefined":r instanceof Date?`Date ${r.toISOString()}`:JSON.stringify(r)}let p=class extends D{constructor(){super(...arguments),this.parserName=m[0].name,this.raw=""}get entry(){return m.find(r=>r.name===this.parserName)??m[0]}render(){return d`
      <service-template
        serviceName="field-parsers"
        .usage=${q}
        .apiSource=${H}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            Parser
            <select @change=${this.pickParser}>
              ${m.map(r=>d`<option
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
            ${this.entry.samples.map(r=>d`<button
                  type="button"
                  class="sample"
                  @click=${()=>this.useSample(r)}
                >
                  ${r}
                </button>`)}
          </div>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?d`<code class="call">${this.result.call}</code>
                  <code class="output">${this.result.output}</code>`:T}
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
    `}pickParser(r){this.parserName=r.target.value,this.raw="",this.result=void 0}useSample(r){this.raw=r,this.parse()}run(r){r.preventDefault(),this.parse()}parse(){const{name:r,parser:e}=this.entry;this.result={call:`${r}.shared.parseValue(${JSON.stringify(this.raw)})`,output:K(e.parseValue(this.raw))}}static get styles(){return S`
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
    `}};h([c()],p.prototype,"parserName",2);h([c()],p.prototype,"raw",2);h([c()],p.prototype,"result",2);p=h([N("field-parsers-story")],p);export{p as FieldParsersStory};
