import{i as x,A as V,b as o,a as D,r as v,c as N}from"./index-DNnintbF.js";import"./service-template-DQ7gmS4k.js";import"./theme-styles-DK1wVyB0.js";const $=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
export declare class BooleanParser implements FieldParserInterface<boolean> {
    static shared: BooleanParser;
    /** @inheritdoc */
    parseValue(rawValue: FieldParserRawValue): boolean;
}
`,T=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
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
`,I=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
export declare class DateParser implements FieldParserInterface<Date> {
    static shared: DateParser;
    /** @inheritdoc */
    parseValue(rawValue: FieldParserRawValue): Date | undefined;
    private parseCompactDate;
    private parseBracketDate;
    private parseJSDate;
}
`,S=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
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
`,R=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
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
`,B=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
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
`,j=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
export declare class NumberParser implements FieldParserInterface<number> {
    static shared: NumberParser;
    /** @inheritdoc */
    parseValue(rawValue: FieldParserRawValue): number | undefined;
}
`,C=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
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
`,M=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
export declare class StringParser implements FieldParserInterface<string> {
    static shared: StringParser;
    /** @inheritdoc */
    parseValue(rawValue: FieldParserRawValue): string;
}
`;class m{parseValue(e){if(typeof e=="string"){const r=e.trim().toLowerCase();if(r==="false"||r==="0"||r==="no")return!1;if(r==="true"||r==="1"||r==="yes")return!0}return!!e}}m.shared=new m;class p{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const r=parseFloat(e);if(!Number.isNaN(r))return r}}p.shared=new p;class f{parseValue(e){return p.shared.parseValue(e)}}f.shared=new f;class h{parseValue(e){return this.parseCompactDate(e)||this.parseJSDate(e)||this.parseBracketDate(e)}parseCompactDate(e){if(typeof e!="string")return;const r=e.trim().match(/^(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?$/);if(!r)return;const[,t,s,n,i="00",w="00",c="00"]=r,_=new Date(`${t}-${s}-${n}T${i}:${w}:${c}`);return Number.isNaN(_.getTime())?void 0:_}parseBracketDate(e){if(typeof e!="string")return;const r=e.match(/\[([0-9]{4})\]/);if(!(!r||r.length<2))return this.parseJSDate(r[1])}parseJSDate(e){if(typeof e!="string")return;let r=e;r.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(r=r.replace(" ","T"));const t=Date.parse(r);if(Number.isNaN(t))return;let s=new Date(r);return(r.match(/^[0-9]{4}$/)||r.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(s=new Date(s.getTime()+s.getTimezoneOffset()*1e3*60)),s}}h.shared=new h;class P{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const r=e.split(":");let t;return r.length===1?t=this.parseNumberFormat(r[0]):t=this.parseColonSeparatedFormat(r),t}parseNumberFormat(e){let r=parseFloat(e);return Number.isNaN(r)&&(r=void 0),r}parseColonSeparatedFormat(e){let r=!1;const t=e.map((s,n)=>{const i=parseFloat(s);if(Number.isNaN(i))return r=!0,0;const c=60**(e.length-1-n);return i*Math.floor(c)}).reduce((s,n)=>s+n,0);return r?void 0:t}}P.shared=new P;class g{parseValue(e){if(typeof e=="string")return e}}g.shared=new g;class y{parseValue(e){if(typeof e=="string")return e}}y.shared=new y;class b{parseValue(e){return String(e)}}b.shared=new b;const O=`export type FieldParserRawValue = string | number | boolean;
export interface FieldParserInterface<T> {
    /**
     * Parse the raw value and return a value of type T or undefined if unparseable
     *
     * @param rawValue T | undefined
     */
    parseValue(rawValue: FieldParserRawValue): T | undefined;
}
`;var U=Object.defineProperty,A=Object.getOwnPropertyDescriptor,u=(a,e,r,t)=>{for(var s=t>1?void 0:t?A(e,r):e,n=a.length-1,i;n>=0;n--)(i=a[n])&&(s=(t?i(e,r,s):i(s))||s);return t&&s&&U(e,r,s),s};const d=[{name:"DurationParser",parser:P.shared,samples:["1:02:03.5","12:30","90.25","abc"]},{name:"DateParser",parser:h.shared,samples:["2024-03-15","[1999]","2024-03-15T10:00:00Z","not a date"]},{name:"ByteParser",parser:f.shared,samples:["1024","2048.5","lots"]},{name:"BooleanParser",parser:m.shared,samples:["true","false","0","1"]},{name:"NumberParser",parser:p.shared,samples:["42","3.14","NaN"]},{name:"MediaTypeParser",parser:g.shared,samples:["texts","movies","etree"]},{name:"PageProgressionParser",parser:y.shared,samples:["rl","lr"]},{name:"StringParser",parser:b.shared,samples:["hello","  padded  ","42"]}],F=Object.assign({"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/boolean.d.ts":$,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/byte.d.ts":T,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/date.d.ts":I,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/duration.d.ts":S,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/list.d.ts":R,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/mediatype.d.ts":B,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/number.d.ts":j,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/page-progression.d.ts":C,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/string.d.ts":M}),k=[O,...Object.keys(F).sort().map(a=>F[a])].map(a=>a.replace(/^import .*\n/gm,"").trim()).join(`

`),z=`import { DurationParser } from '@internetarchive/elements/services/field-parsers/field-parsers';

DurationParser.shared.parseValue('1:02:03.5'); // 3723.5
DurationParser.shared.parseValue('abc'); // undefined`;function J(a){return a===void 0?"undefined":a instanceof Date?`Date ${a.toISOString()}`:JSON.stringify(a)}let l=class extends x{constructor(){super(...arguments),this.parserName=d[0].name,this.raw=""}get entry(){return d.find(a=>a.name===this.parserName)??d[0]}render(){return o`
      <service-template
        serviceName="field-parsers"
        .usage=${z}
        .apiSource=${k}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            Parser
            <select @change=${this.pickParser}>
              ${d.map(a=>o`<option
                    value=${a.name}
                    ?selected=${a.name===this.parserName}
                  >
                    ${a.name}
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
              @input=${a=>this.raw=a.target.value}
            />
          </label>
          <button type="submit">Parse</button>
          <div class="samples">
            Try:
            ${this.entry.samples.map(a=>o`<button
                  type="button"
                  class="sample"
                  @click=${()=>this.useSample(a)}
                >
                  ${a}
                </button>`)}
          </div>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?o`<code class="call">${this.result.call}</code>
                  <code class="output">${this.result.output}</code>`:V}
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
    `}pickParser(a){this.parserName=a.target.value,this.raw="",this.result=void 0}useSample(a){this.raw=a,this.parse()}run(a){a.preventDefault(),this.parse()}parse(){const{name:a,parser:e}=this.entry;this.result={call:`${a}.shared.parseValue(${JSON.stringify(this.raw)})`,output:J(e.parseValue(this.raw))}}static get styles(){return D`
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
    `}};u([v()],l.prototype,"parserName",2);u([v()],l.prototype,"raw",2);u([v()],l.prototype,"result",2);l=u([N("field-parsers-story")],l);export{l as FieldParsersStory};
