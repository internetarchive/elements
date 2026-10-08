import{k as I,A as u,r as h,n as d,c as $,i as v,b as i,a as x,h as T}from"./index-DlBrKuaG.js";import{t as C}from"./theme-styles-BtSjYKGw.js";let D;function w(t){return(e,s)=>I(e,s,{get(){return(this.renderRoot??(D??=document.createDocumentFragment())).querySelectorAll(t)}})}function c(t,e,s){return t?e(t):s?.(t)}const g=t=>t??u,N="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='36pt'%20height='36pt'%20viewBox='0%200%2036%2036'%20version='1.1'%3e%3cg%20id='surface35'%3e%3cpath%20style='%20stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;'%20d='M%2013.5%206.1875%20C%2012.878906%206.1875%2012.375%206.691406%2012.375%207.3125%20C%2012.375%207.933594%2012.878906%208.4375%2013.5%208.4375%20L%2014.0625%208.4375%20L%2014.0625%2013.523438%20C%2014.0625%2014.453125%2013.78125%2015.34375%2013.246094%2016.105469%20L%206.84375%2025.238281%20C%206.140625%2026.238281%206.054688%2027.535156%206.621094%2028.617188%20C%207.183594%2029.703125%208.292969%2030.375%209.515625%2030.375%20L%2026.484375%2030.375%20C%2027.707031%2030.375%2028.816406%2029.703125%2029.378906%2028.617188%20C%2029.941406%2027.535156%2029.859375%2026.238281%2029.15625%2025.238281%20L%2022.753906%2016.105469%20C%2022.21875%2015.34375%2021.9375%2014.453125%2021.9375%2013.523438%20L%2021.9375%208.4375%20L%2022.5%208.4375%20C%2023.121094%208.4375%2023.625%207.933594%2023.625%207.3125%20C%2023.625%206.691406%2023.121094%206.1875%2022.5%206.1875%20Z%20M%2016.3125%208.4375%20L%2019.6875%208.4375%20L%2019.6875%2013.523438%20C%2019.6875%2014.914062%2020.109375%2016.257812%2020.910156%2017.398438%20L%2020.941406%2017.4375%20L%2015.0625%2017.4375%20L%2015.089844%2017.398438%20C%2015.890625%2016.257812%2016.3125%2014.914062%2016.3125%2013.523438%20Z%20M%2015.1875%2020.8125%20C%2015.808594%2020.8125%2016.3125%2021.316406%2016.3125%2021.9375%20C%2016.3125%2022.558594%2015.808594%2023.0625%2015.1875%2023.0625%20C%2014.566406%2023.0625%2014.0625%2022.558594%2014.0625%2021.9375%20C%2014.0625%2021.316406%2014.566406%2020.8125%2015.1875%2020.8125%20Z%20M%2020.53125%2023.0625%20C%2021.617188%2023.0625%2022.5%2023.945312%2022.5%2025.03125%20C%2022.5%2026.117188%2021.617188%2027%2020.53125%2027%20C%2019.445312%2027%2018.5625%2026.117188%2018.5625%2025.03125%20C%2018.5625%2023.945312%2019.445312%2023.0625%2020.53125%2023.0625%20Z%20M%2020.53125%2023.0625%20'/%3e%3c/g%3e%3c/svg%3e";function b(t){return t.toLowerCase().split(" ").join("-")}var V=Object.defineProperty,_=Object.getOwnPropertyDescriptor,m=(t,e,s,a)=>{for(var o=a>1?void 0:a?_(e,s):e,n=t.length-1,p;n>=0;n--)(p=t[n])&&(o=(a?p(e,s,o):p(o))||o);return a&&o&&V(e,s,o),o};let y=class extends v{constructor(){super(...arguments),this.rangeReadouts={}}render(){return this.styleInputData?i`
      <div class="settings-options">
        <table>
          <!-- The tbody is explicit on purpose: rows interpolated straight
               into <table> get hoisted into an implicit tbody by the parser,
               which ejects Lit's marker nodes and breaks later re-renders. -->
          <tbody>
            ${this.styleInputData.settings.map((t,e)=>{const s=this.styleInputData?.settings[e-1],a=!!t.section&&t.section!==s?.section;return i`
                ${a?i`<tr>
                      <th class="style-section" colspan="2">
                        ${t.section}
                      </th>
                    </tr>`:u}
                ${this.renderStyleRow(t)}
              `})}
          </tbody>
        </table>
        <button @click=${this.applyStyles}>Apply</button>
        ${c(this.styleInputData.palettes?.length,()=>i`
            <button @click=${this.randomizeColors}>🎲 Randomize colors</button>
          `)}
        ${c(this.styleInputData.revertable,()=>i`<button @click=${this.resetStyles}>Revert</button>`)}
        ${c(this.appliedPaletteName,()=>i`<span class="applied-palette"
              >Theme: ${this.appliedPaletteName}</span
            >`)}
      </div>
    `:u}randomizeColors(){const t=this.nextPalette();t&&(this.appliedPaletteName=t.name,this.styleInputs?.forEach(e=>{const s=t.values[e.dataset.variable??""];s&&(e.value=s)}),this.applyStyles())}nextPalette(){const t=this.styleInputData?.palettes??[];if(!t.length)return;const e=t.length>1?t.filter(s=>s.name!==this.appliedPaletteName):t;return e[Math.floor(Math.random()*e.length)]}resetStyles(){this.appliedPaletteName=void 0;const t=new Map((this.styleInputData?.settings??[]).map(e=>[e.cssVariable,e]));this.rangeReadouts={},this.styleInputs?.forEach(e=>{const s=t.get(e.dataset.variable??"");s&&(e.value=String(s.defaultValue))}),this.dispatchEvent(new CustomEvent("stylesApplied",{detail:{styles:""},bubbles:!0,composed:!0}))}renderStyleRow(t){const e=b(t.label),s=t.inputType==="number"||t.inputType==="range";return i`
      <tr>
        <td>
          <label for=${e}>${t.label}</label>
        </td>
        <td
          class="style-input-cell ${t.presetsInline?"presets-inline":""}"
        >
          <div class="style-input-row">
            <input
              id=${e}
              class="style-input"
              type=${t.inputType??"text"}
              min=${g(s?t.min:void 0)}
              max=${g(s?t.max:void 0)}
              step=${g(s?t.step:void 0)}
              value=${t.defaultValue}
              data-variable=${t.cssVariable}
              data-unit=${g(t.unit)}
              @input=${t.inputType==="range"?this.updateRangeReadout:void 0}
            />
            ${t.inputType==="range"?i`<output class="style-readout" for=${e}
                  >${this.readoutFor(t)}</output
                >`:u}
            ${c(this.styleInputData?.showCssVariables,()=>i`<code class="style-var" title=${t.cssVariable}
                  >${t.cssVariable}</code
                >`)}
          </div>
          ${t.presets?this.renderPresets(e,t.presets):u}
        </td>
      </tr>
    `}updateRangeReadout(t){const e=t.currentTarget,s=e.dataset.variable;if(!s)return;const a=e.dataset.unit??"";this.rangeReadouts={...this.rangeReadouts,[s]:`${e.value}${a}`}}renderPresets(t,e){return i`
      <div class="style-presets">
        ${e.map(s=>i`
            <button
              type="button"
              class="style-preset"
              title=${g(s.note)}
              @click=${()=>this.applyPreset(t,s)}
            >
              ${s.label}
              <small>${s.value}</small>
            </button>
          `)}
      </div>
    `}applyPreset(t,e){const s=this.renderRoot.querySelector(`#${CSS.escape(t)}`);s&&(s.value=`${e.value}`,s.type==="range"&&s.dispatchEvent(new Event("input")),this.applyStyles())}readoutFor(t){return this.rangeReadouts[t.cssVariable]??`${t.defaultValue}${t.unit??""}`}applyStyles(){const t=[];this.styleInputs?.forEach(e=>{if(!e.dataset.variable||!e.value)return;const s=e.dataset.unit??"";t.push(`${e.dataset.variable}: ${e.value}${s};`)}),this.dispatchEvent(new CustomEvent("stylesApplied",{detail:{styles:t.join(`
 `)},bubbles:!0,composed:!0}))}static get styles(){return[C,x`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }

        .style-input-cell {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .style-input-cell.presets-inline {
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;
        }

        .style-input-cell.presets-inline .style-presets {
          margin-top: 0;
        }

        .style-section {
          text-align: left;
          padding-top: 0.75em;
          font-size: var(--font-size-standard--, 1em);
        }

        .style-input-row {
          display: flex;
          align-items: center;
        }

        .style-presets {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
          margin-top: 0.35rem;
        }

        .style-preset {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.1rem;
          padding: 0.25rem 0.4rem;
          cursor: pointer;
        }

        .style-preset small {
          opacity: 0.7;
        }

        .style-readout {
          min-width: 3.5em;
          text-align: right;
        }

        /* The CSS custom property each control sets, shown to its right. */
        .style-var {
          margin-left: 0.75em;
          font-family: monospace;
          font-size: 0.72rem;
          color: #767676;
          white-space: nowrap;
        }

        input[type='range'] {
          margin: 5px;
        }

        /* Names the theme the randomize control just applied. */
        .applied-palette {
          margin-left: 0.75em;
          font-size: 0.78rem;
          color: #595959;
        }
      `]}};m([d({type:Object})],y.prototype,"styleInputData",2);m([h()],y.prototype,"appliedPaletteName",2);m([h()],y.prototype,"rangeReadouts",2);m([w(".style-input")],y.prototype,"styleInputs",2);y=m([$("story-styles-settings")],y);const E=(t,e,s)=>{for(const a of e)if(a[0]===t)return(0,a[1])();return s?.()};var O=Object.defineProperty,R=Object.getOwnPropertyDescriptor,S=(t,e,s,a)=>{for(var o=a>1?void 0:a?R(e,s):e,n=t.length-1,p;n>=0;n--)(p=t[n])&&(o=(a?p(e,s,o):p(o))||o);return a&&o&&O(e,s,o),o};let f=class extends v{render(){return this.propInputData?i`
      <div class="settings-options">
        <table>
          ${this.propInputData.settings.map((t,e)=>{const s=this.propInputData?.settings[e-1],a=!!t.section&&t.section!==s?.section;return i`
              ${a?i`<tr>
                    <th class="prop-section" colspan="2">${t.section}</th>
                  </tr>`:u}
              ${E(t.inputType,[["radio",()=>this.createRadioPropInput(t)]],()=>this.createDefaultPropInput(t))??u}
            `})}
        </table>
        <button @click=${this.applyProps}>Apply</button>
      </div>
    `:u}createDefaultPropInput(t){const e=b(t.label);return i`
      <tr>
        <td><label for=${e}>${t.label}</label></td>
        <td>
          <input
            class="prop-input"
            type=${t.inputType??"text"}
            id=${e}
            data-prop=${t.propertyName}
            data-format=${typeof t.defaultValue}
            placeholder=${t.defaultValue}
          />
        </td>
      </tr>
    `}createRadioPropInput(t){if(t.inputType!=="radio"||!t.radioOptions)return u;const e=b(t.label);return i`
      <tr>
        <td><legend>${t.label}</legend></td>
        <td>
          ${t.radioOptions.map(s=>i`<input
                  type="radio"
                  class="prop-input"
                  name=${e}
                  id="${e}-${s}"
                  value=${s}
                  data-prop=${t.propertyName}
                  data-format=${typeof t.defaultValue}
                  ?checked=${t.defaultValue===s}
                  @change=${this.applyProps}
                /><label for="${e}-${s}"> ${s} </label>`)}
        </td>
      </tr>
    `}applyProps(){const t=[],e=[];this.propInputs?.forEach(s=>{if(!s.dataset.prop||!s.value||s.type==="radio"&&!s.checked)return;const a=s.dataset.prop;let o=s.value;switch(s.dataset.format){case"number":o=parseInt(o);break;case"boolean":o==="true"&&(o=!0),o==="false"&&(o=!1);break}e.push({propName:a,value:o});const n=this.propInputData?.settings.find(P=>P.propertyName===a);if(n&&o===n.defaultValue)return;const p=typeof o=="string"?`'${o}'`:o.toString();t.push(`.${a}=\${${p}}`)}),this.dispatchEvent(new CustomEvent("propsApplied",{detail:{stringifiedProps:t.join(`
  `),appliedProps:e}}))}static get styles(){return[C,x`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }

        .prop-section {
          text-align: left;
          padding-top: 0.75em;
          font-size: var(--font-size-standard--, 1em);
        }
      `]}};S([d({type:Object})],f.prototype,"propInputData",2);S([w(".prop-input")],f.prototype,"propInputs",2);f=S([$("story-props-settings")],f);var U=Object.defineProperty,k=Object.getOwnPropertyDescriptor,l=(t,e,s,a)=>{for(var o=a>1?void 0:a?k(e,s):e,n=t.length-1,p;n>=0;n--)(p=t[n])&&(o=(a?p(e,s,o):p(o))||o);return a&&o&&U(e,s,o),o};let r=class extends v{constructor(){super(...arguments),this.elementTag="",this.elementClassName="",this.labs=!1,this.focused=!1,this.detailsVisible=!1,this.shouldShowPropertySettings=!1,this.shouldShowUsageNotes=!1,this.copiedKey=null}willUpdate(t){t.has("elementTag")&&(this.focused=this.elementTag===T(window.location.hash),this.detailsVisible=this.focused)}render(){return i`
      <div id="container">
        <h2>
          <code>&lt;${this.elementTag}&gt;</code>
          ${c(this.labs,()=>i`<img
                src=${N}
                alt="Labs icon"
                title="Labs"
                class="labs-icon"
              />`)}
        </h2>
        <h3>Demo</h3>
        <div class="slot-container" style=${g(this.stringifiedStyles)}>
          <slot
            name="demo"
            @slotchange=${this.handleDemoComponentSlotted}
          ></slot>
        </div>
        <button
          class="details-toggle ${this.detailsVisible?"expanded":"collapsed"}"
          @click=${()=>this.detailsVisible=!this.detailsVisible}
        >
          Import, Usage &amp; Settings
        </button>
        <div
          id="details"
          class="${this.detailsVisible?"expanded":"collapsed"}"
        >
          <div class="details-inner ${this.focused?"focused":""}">
            ${this.detailsTemplate}
          </div>
        </div>
      </div>
    `}get detailsTemplate(){return i`
      <h3>
        Import
        <button
          class="copy-btn ${this.copiedKey==="import"?"copied":""}"
          @click=${()=>this.copyToClipboard(this.importCode,"import")}
        >
          ${this.copiedKey==="import"?"Copied!":"Copy"}
        </button>
      </h3>
      <syntax-highlighter
        language="typescript"
        .code=${this.importCode}
      ></syntax-highlighter>
      <h3>
        Usage
        <button
          class="copy-btn ${this.copiedKey==="usage"?"copied":""}"
          @click=${()=>this.copyToClipboard(this.customExampleUsage??this.exampleUsage,"usage")}
        >
          ${this.copiedKey==="usage"?"Copied!":"Copy"}
        </button>
      </h3>
      <syntax-highlighter
        language="auto"
        .code=${this.customExampleUsage??this.exampleUsage}
      ></syntax-highlighter>
      ${c(this.cssCode,()=>i`
          <h3>
            Styling
            <button
              class="copy-btn ${this.copiedKey==="styling"?"copied":""}"
              @click=${()=>this.copyToClipboard(this.cssCode,"styling")}
            >
              ${this.copiedKey==="styling"?"Copied!":"Copy"}
            </button>
          </h3>
          <syntax-highlighter
            language="css"
            .code=${this.cssCode}
          ></syntax-highlighter>
        `)}
      <div class="two-col">
        <div class="left-col">
          <h3>Settings</h3>
          ${c(!!this.propInputData,()=>i`
              <story-props-settings
                .propInputData=${this.propInputData}
                @propsApplied=${this.handlePropsApplied}
              ></story-props-settings>
            `)}
          ${c(!this.propInputData&&!this.shouldShowPropertySettings,()=>i`<p class="section-placeholder">No settings to adjust</p>`)}
          <div
            class="slot-container ${this.shouldShowPropertySettings?"":"hidden"}"
            @slotchange=${this.handleSettingsSlotChange}
          >
            <slot name="settings"></slot>
          </div>
        </div>
        <div class="right-col">
          <h3>Styles</h3>
          ${c(!!this.styleInputData,()=>i`
              <story-styles-settings
                .styleInputData=${this.styleInputData}
                @stylesApplied=${this.handleStylesApplied}
              ></story-styles-settings>
            `,()=>i`<p class="section-placeholder">No styles to adjust</p>`)}
        </div>
      </div>
      ${c(this.shouldShowUsageNotes,()=>i` <h3>Usage Notes</h3>`)}
      <div class="slot-container">
        <slot
          name="usage-notes"
          @slotchange=${this.handleUsageNotesSlotChange}
        ></slot>
      </div>
    `}async copyToClipboard(t,e){try{await navigator.clipboard.writeText(t),this.copiedKey=e,clearTimeout(this._copyTimeout),this._copyTimeout=setTimeout(()=>this.copiedKey=null,2e3)}catch(s){console.warn("Clipboard write failed:",s)}}get importCode(){return this.elementClassName?`import '${this.modulePath}';
import { ${this.elementClassName} } from '${this.modulePath}';`:`import '${this.modulePath}';`}get exampleUsage(){const t=this.defaultUsageProps?"  "+this.defaultUsageProps+`
`:"",e=this.stringifiedProps?"  "+this.stringifiedProps+`
`:"",s=!!t||!!e,a=this.defaultSlottedContent&&s?`
 `+this.defaultSlottedContent+`
`:this.defaultSlottedContent;return`<${this.elementTag}${s?`
`:""}${t}${e}>${a??""}</${this.elementTag}>`}get cssCode(){return this.stringifiedStyles?`${this.elementTag} {
 ${this.stringifiedStyles}
}`:""}get modulePath(){const t=this.importPath??`${this.elementTag}/${this.elementTag}`;return this.labs?`@internetarchive/elements/labs/${t}`:`@internetarchive/elements/${t}`}handleSettingsSlotChange(t){const e=t.target.assignedElements();this.shouldShowPropertySettings=e.length>0}handleUsageNotesSlotChange(t){const e=t.target.assignedElements();this.shouldShowUsageNotes=e.length>0}handleDemoComponentSlotted(t){const e=t.target.assignedElements()[0];e&&(this.slottedDemoComponent=e)}handleStylesApplied(t){this.stringifiedStyles=t.detail.styles||void 0}handlePropsApplied(t){const e=t.detail.stringifiedProps,s=t.detail.appliedProps;typeof e!="string"||!s||(this.stringifiedProps=e,s.forEach(a=>{this.slottedDemoComponent[a.propName]=a.value}))}static get styles(){return[C,x`
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
          display: flex;
          align-items: center;
          gap: 6px;
        }

        h3 {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #666;
          display: flex;
          align-items: center;
          gap: 5px;
          margin: 8px 0 4px;
          position: relative;
          z-index: 1;
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

        .copy-btn {
          background: none;
          border: 1px solid #bbb;
          border-radius: 3px;
          padding: 1px 7px;
          font-size: 0.7rem;
          cursor: pointer;
          color: #555;
          line-height: 1.4;
        }

        .copy-btn:hover {
          background: #0f3e6e;
          color: #fff;
          border-color: #0f3e6e;
        }

        .copy-btn.copied {
          background: #2a7a2a;
          color: #fff;
          border-color: #2a7a2a;
        }

        .slot-container {
          background-color: var(--primary-background-color);
          padding: 0.5em;
        }

        .slot-container.hidden {
          display: none;
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 12px;
        }

        /* Side by side on a phone, Settings and Styles get half the width
           each, which wraps every radio group and clips the style inputs.
           Matches NARROW_VIEWPORT in app-root.ts. */
        @media (max-width: 640px) {
          .two-col {
            grid-template-columns: 1fr;
          }
        }

        .left-col,
        .right-col {
          min-width: 0;
        }

        .section-placeholder {
          font-size: 0.78rem;
          color: #767676;
          margin: 4px 0;
          font-style: italic;
        }

        .details-inner syntax-highlighter {
          display: block;
          --syntax-max-height: 5.5rem;
        }

        /* One element on the page means nothing else is competing for the
           height, so let the snippets run their full length rather than
           scroll inside a short box. */
        .details-inner.focused syntax-highlighter {
          --syntax-max-height: none;
        }

        .labs-icon {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
      `]}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._copyTimeout)}};l([d({type:String})],r.prototype,"elementTag",2);l([d({type:String})],r.prototype,"elementClassName",2);l([d({type:String})],r.prototype,"customExampleUsage",2);l([d({type:String})],r.prototype,"defaultUsageProps",2);l([d({type:String})],r.prototype,"defaultSlottedContent",2);l([d({type:Object})],r.prototype,"styleInputData",2);l([d({type:Object})],r.prototype,"propInputData",2);l([d({type:Boolean})],r.prototype,"labs",2);l([d({type:String})],r.prototype,"importPath",2);l([h()],r.prototype,"focused",2);l([h()],r.prototype,"detailsVisible",2);l([h()],r.prototype,"stringifiedStyles",2);l([h()],r.prototype,"stringifiedProps",2);l([h()],r.prototype,"shouldShowPropertySettings",2);l([h()],r.prototype,"shouldShowUsageNotes",2);l([h()],r.prototype,"slottedDemoComponent",2);l([h()],r.prototype,"copiedKey",2);r=l([$("story-template")],r);export{c as n,g as o,w as r};
