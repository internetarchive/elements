import{r as c,n as m,c as g,i as P,k as v,b as d,a as y,A as b}from"./index-B4cOjv23.js";import{D as w,b as x,B as _,a as V,N as F,M as $,P as S,S as I}from"./string-tEdD6AYF.js";import"./syntax-highlighter-aqZvyeI2.js";import{t as D}from"./theme-styles-BKvKiV7c.js";const N=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
export declare class BooleanParser implements FieldParserInterface<boolean> {
    static shared: BooleanParser;
    /** @inheritdoc */
    parseValue(rawValue: FieldParserRawValue): boolean;
}
`,R=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
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
`,T=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
export declare class DateParser implements FieldParserInterface<Date> {
    static shared: DateParser;
    /** @inheritdoc */
    parseValue(rawValue: FieldParserRawValue): Date | undefined;
    private parseCompactDate;
    private parseBracketDate;
    private parseJSDate;
}
`,B=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
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
`,j=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
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
`,O=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
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
`,M=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
export declare class NumberParser implements FieldParserInterface<number> {
    static shared: NumberParser;
    /** @inheritdoc */
    parseValue(rawValue: FieldParserRawValue): number | undefined;
}
`,z=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
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
`,A=`import { FieldParserInterface, FieldParserRawValue } from '../field-parser-interface.js';
export declare class StringParser implements FieldParserInterface<string> {
    static shared: StringParser;
    /** @inheritdoc */
    parseValue(rawValue: FieldParserRawValue): string;
}
`,U=`export type FieldParserRawValue = string | number | boolean;
export interface FieldParserInterface<T> {
    /**
     * Parse the raw value and return a value of type T or undefined if unparseable
     *
     * @param rawValue T | undefined
     */
    parseValue(rawValue: FieldParserRawValue): T | undefined;
}
`;var C=Object.defineProperty,k=Object.getOwnPropertyDescriptor,i=(e,a,n,s)=>{for(var r=s>1?void 0:s?k(a,n):a,l=e.length-1,o;l>=0;l--)(o=e[l])&&(r=(s?o(a,n,r):o(r))||r);return s&&r&&C(a,n,r),r};let t=class extends P{constructor(){super(...arguments),this.serviceName="",this.usage="",this.apiSource="",this.focused=!1,this.detailsVisible=!1}willUpdate(e){e.has("serviceName")&&(this.focused=this.serviceName===v(window.location.hash),this.detailsVisible=this.focused)}render(){return d`
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
    `}get defaultImport(){return`import '@internetarchive/elements/services/${this.importPath??`${this.serviceName}/${this.serviceName}`}';`}static get styles(){return[D,y`
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
      `]}};i([m({type:String})],t.prototype,"serviceName",2);i([m({type:String})],t.prototype,"importPath",2);i([m({type:String})],t.prototype,"importCode",2);i([m({type:String})],t.prototype,"usage",2);i([m({type:String})],t.prototype,"apiSource",2);i([c()],t.prototype,"focused",2);i([c()],t.prototype,"detailsVisible",2);t=i([g("service-template")],t);var E=Object.defineProperty,J=Object.getOwnPropertyDescriptor,h=(e,a,n,s)=>{for(var r=s>1?void 0:s?J(a,n):a,l=e.length-1,o;l>=0;l--)(o=e[l])&&(r=(s?o(a,n,r):o(r))||r);return s&&r&&E(a,n,r),r};const u=[{name:"DurationParser",parser:w.shared,samples:["1:02:03.5","12:30","90.25","abc"]},{name:"DateParser",parser:x.shared,samples:["2024-03-15","[1999]","2024-03-15T10:00:00Z","not a date"]},{name:"ByteParser",parser:_.shared,samples:["1024","2048.5","lots"]},{name:"BooleanParser",parser:V.shared,samples:["true","false","0","1"]},{name:"NumberParser",parser:F.shared,samples:["42","3.14","NaN"]},{name:"MediaTypeParser",parser:$.shared,samples:["texts","movies","etree"]},{name:"PageProgressionParser",parser:S.shared,samples:["rl","lr"]},{name:"StringParser",parser:I.shared,samples:["hello","  padded  ","42"]}],f=Object.assign({"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/boolean.d.ts":N,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/byte.d.ts":R,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/date.d.ts":T,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/duration.d.ts":B,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/list.d.ts":j,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/mediatype.d.ts":O,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/number.d.ts":M,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/page-progression.d.ts":z,"../../../node_modules/@internetarchive/field-parsers/dist/src/field-types/string.d.ts":A}),L=[U,...Object.keys(f).sort().map(e=>f[e])].map(e=>e.replace(/^import .*\n/gm,"").trim()).join(`

`),G=`import { DurationParser } from '@internetarchive/elements/services/field-parsers/field-parsers';

DurationParser.shared.parseValue('1:02:03.5'); // 3723.5
DurationParser.shared.parseValue('abc'); // undefined`;function H(e){return e===void 0?"undefined":e instanceof Date?`Date ${e.toISOString()}`:JSON.stringify(e)}let p=class extends P{constructor(){super(...arguments),this.parserName=u[0].name,this.raw=""}get entry(){return u.find(e=>e.name===this.parserName)??u[0]}render(){return d`
      <service-template
        serviceName="field-parsers"
        .usage=${G}
        .apiSource=${L}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            Parser
            <select @change=${this.pickParser}>
              ${u.map(e=>d`<option
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
            ${this.entry.samples.map(e=>d`<button
                  type="button"
                  class="sample"
                  @click=${()=>this.useSample(e)}
                >
                  ${e}
                </button>`)}
          </div>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?d`<code class="call">${this.result.call}</code>
                  <code class="output">${this.result.output}</code>`:b}
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
    `}pickParser(e){this.parserName=e.target.value,this.raw="",this.result=void 0}useSample(e){this.raw=e,this.parse()}run(e){e.preventDefault(),this.parse()}parse(){const{name:e,parser:a}=this.entry;this.result={call:`${e}.shared.parseValue(${JSON.stringify(this.raw)})`,output:H(a.parseValue(this.raw))}}static get styles(){return y`
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
    `}};h([c()],p.prototype,"parserName",2);h([c()],p.prototype,"raw",2);h([c()],p.prototype,"result",2);p=h([g("field-parsers-story")],p);export{p as FieldParsersStory};
