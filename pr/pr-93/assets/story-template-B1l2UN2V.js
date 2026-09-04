import{A as u,d as y,r as p,n as h,t as $,i as x,o as T,b as r,_ as D,f as I}from"./index-DoufPq0Z.js";const _=(t,e,a)=>(a.configurable=!0,a.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,a),a);let k;function P(t){return(e,a)=>_(e,a,{get(){return(this.renderRoot??(k??=document.createDocumentFragment())).querySelectorAll(t)}})}function c(t,e,a){return t?e(t):a?.(t)}const m=t=>t??u,z=y`
  pre {
    max-height: var(--syntax-max-height, none);
    overflow-y: auto;
  }
  pre code.hljs {
    display: block;
    overflow-x: auto;
    padding: 1em;
  }
  code.hljs {
    padding: 3px 5px;
  }
  /*

Atom One Light by Daniel Gamage
Original One Light Syntax theme from https://github.com/atom/one-light-syntax

base:    #fafafa
mono-1:  #383a42
mono-2:  #686b77
mono-3:  #a0a1a7
hue-1:   #0184bb
hue-2:   #4078f2
hue-3:   #a626a4
hue-4:   #50a14f
hue-5:   #e45649
hue-5-2: #c91243
hue-6:   #986801
hue-6-2: #c18401

*/
  .hljs {
    color: #383a42;
    background: #fafafa;
  }
  .hljs-comment,
  .hljs-quote {
    color: #a0a1a7;
    font-style: italic;
  }
  .hljs-doctag,
  .hljs-keyword,
  .hljs-formula {
    color: #a626a4;
  }
  .hljs-section,
  .hljs-name,
  .hljs-selector-tag,
  .hljs-deletion,
  .hljs-subst {
    color: #e45649;
  }
  .hljs-literal {
    color: #0184bb;
  }
  .hljs-string,
  .hljs-regexp,
  .hljs-addition,
  .hljs-attribute,
  .hljs-meta .hljs-string {
    color: #50a14f;
  }
  .hljs-attr,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-type,
  .hljs-selector-class,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-number {
    color: #986801;
  }
  .hljs-symbol,
  .hljs-bullet,
  .hljs-link,
  .hljs-meta,
  .hljs-selector-id,
  .hljs-title {
    color: #4078f2;
  }
  .hljs-built_in,
  .hljs-title.class_,
  .hljs-class .hljs-title {
    color: #c18401;
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: bold;
  }
  .hljs-link {
    text-decoration: underline;
  }
`;var O=Object.defineProperty,N=Object.getOwnPropertyDescriptor,w=(t,e,a,o)=>{for(var s=o>1?void 0:o?N(e,a):e,l=t.length-1,d;l>=0;l--)(d=t[l])&&(s=(o?d(e,a,s):d(s))||s);return o&&s&&O(e,a,s),s};let f=class extends x{constructor(){super(...arguments),this.code="",this.language="auto",this.highlightedCode=""}willUpdate(t){(t.has("code")||t.has("language"))&&this.highlightCode()}render(){return r`
      <pre><code class="hljs">${T(this.highlightedCode)}</code></pre>
    `}async highlightCode(){const e=(await D(()=>import("./index-BBc-AmEf.js"),[],import.meta.url)).default,a=this.code.trim();let o;this.language==="auto"?o=e.highlightAuto(a).value:o=e.highlight(a,{language:this.language}).value,this.highlightedCode=o}static get styles(){return[z]}};w([h({type:String})],f.prototype,"code",2);w([h({type:String})],f.prototype,"language",2);w([p()],f.prototype,"highlightedCode",2);f=w([$("syntax-highlighter")],f);const S=y`
  :host {
    /*
    BASE STYLES
    Default fallback values for theme styles. Assumes 16px root font size.
    To adjust values, use theme styles below.
    */

    /* Typography */
    --default-font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

    /* Sizing */
    --default-icon-width: 1.25rem;
    --default-padding-sm: 5px;
    --default-combo-box-width: auto;
    --default-search-bar-width: auto;
    --default-search-bar-height: 30px;
    --default-button-padding: 0 1.875rem; /* 0 30px with 16px root font size */
    --default-button-height: 2.25rem; /* 36px with 16px root font size */
    --default-button-width: fit-content;
    --default-button-border-width: 1px;
    --default-button-border-radius: 0.25rem; /* 4px with 16px root font size */
    --default-font-size-standard: 0.875rem; /* 14px with 16px root font size */
    --default-font-size-lg: 2.25rem; /* 36px with 16px root font size */

    /* Colors */
    --true-white: #fff;
    --off-white: #fbfbfd;
    --dark-gray: #2c2c2c;
    --mid-gray: #333;
    --light-gray: #666;
    --lighter-gray: #999;
    --lightest-gray: #c5d1df;
    --classic-red: #e51c23;
    --brick: #d43f3a;
    --coral: #d9534f;
    --dark-cantaloupe: #ec7939;
    --cantaloupe: #ee8950;
    --mint-green: #31a481;
    --navy-blue: #194880;
    --bright-blue: #4b64ff;

    /*
    ADJUSTABLE STYLES
    To be adjusted by setting i.e. --ia-theme-link-color at the :root or component level.
    */

    /* Text */
    --base-font-family: var(
      --ia-theme-base-font-family,
      var(--default-font-family)
    );
    --primary-text-color: var(--ia-theme-primary-text-color, var(--dark-gray));
    --secondary-text-color: var(
      --ia-theme-secondary-text-color,
      var(--light-gray)
    );
    --link-color: var(--ia-theme-link-color, var(--bright-blue));

    /* Sizing */
    --icon-width: var(--ia-theme-icon-width, var(--default-icon-width));
    --padding-sm: var(--ia-theme-padding-sm, var(--default-padding-sm));
    --search-bar-height: var(
      --ia-theme-search-bar-height,
      var(--default-search-bar-height)
    );
    --search-bar-width: var(
      --ia-theme-search-bar-width,
      var(--default-search-bar-width)
    );
    --combo-box-width: var(
      --ia-theme-combo-box-width,
      var(--default-combo-box-width)
    );
    --button-padding: var(
      --ia-theme-button-padding,
      var(--default-button-padding)
    );
    --button-height: var(
      --ia-theme-button-height,
      var(--default-button-height)
    );
    --button-width: var(--ia-theme-button-width, var(--default-button-width));
    --button-border-width: var(
      --ia-theme-button-border-width,
      var(--default-button-border-width)
    );
    --button-border-radius: var(
      --ia-theme-button-border-radius,
      var(--default-button-border-radius)
    );
    --font-size-standard: var(
      --ia-theme-font-size-standard,
      var(--default-font-size-standard)
    );
    --font-size-lg: var(--ia-theme-font-size-lg, var(--default-font-size-lg));

    /* Backgrounds and fills */
    --primary-background-color: var(
      --ia-theme-primary-background-color,
      var(--off-white)
    );
    --secondary-background-color: var(
      --ia-theme-secondary-background-color,
      var(--true-white)
    );

    /* State colors */
    /* Primary */
    --primary-cta-fill: var(--ia-theme-primary-cta-fill, var(--navy-blue));
    --primary-cta-text-color: var(
      --ia-theme-primary-cta-text-color,
      var(--true-white)
    );
    --primary-cta-border: var(
      --ia-theme-primary-cta-border,
      var(--lightest-gray)
    );

    /* Secondary */
    --secondary-cta-text-color: var(
      --ia-theme-secondary-cta-text-color,
      var(--true-white)
    );
    --secondary-cta-fill: var(--ia-theme-secondary-cta-fill, var(--mid-gray));
    --secondary-cta-border: var(
      --ia-theme-secondary-cta-border,
      var(--lighter-gray)
    );

    /* Danger */
    --danger-cta-text-color: var(
      --ia-theme-danger-cta-text-color,
      var(--true-white)
    );
    --danger-cta-fill: var(--ia-theme-danger-cta-fill, var(--coral));
    --danger-cta-border: var(--ia-theme-danger-cta-border, var(--brick));

    /* Warning */
    --warning-cta-text-color: var(
      --ia-theme-warning-cta-text-color,
      var(--true-white)
    );
    --warning-cta-fill: var(--ia-theme-warning-cta-fill, var(--cantaloupe));
    --warning-cta-border: var(
      --ia-theme-warning-cta-border,
      var(--dark-cantaloupe)
    );

    /* Disabled */
    --disabled-cta-text-color: var(
      --ia-theme-disabled-cta-text-color,
      var(--true-white)
    );
    --disabled-cta-fill: var(--ia-theme-disabled-cta-fill, var(--light-gray));
    --disabled-cta-border: var(
      --ia-theme-disabled-cta-border,
      var(--lighter-gray)
    );

    /* Standalone colors */
    --color-success: var(--ia-theme-color-success, var(--mint-green));
    --color-danger: var(--ia-theme-color-danger, var(--classic-red));
  }
`,E="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='36pt'%20height='36pt'%20viewBox='0%200%2036%2036'%20version='1.1'%3e%3cg%20id='surface35'%3e%3cpath%20style='%20stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;'%20d='M%2013.5%206.1875%20C%2012.878906%206.1875%2012.375%206.691406%2012.375%207.3125%20C%2012.375%207.933594%2012.878906%208.4375%2013.5%208.4375%20L%2014.0625%208.4375%20L%2014.0625%2013.523438%20C%2014.0625%2014.453125%2013.78125%2015.34375%2013.246094%2016.105469%20L%206.84375%2025.238281%20C%206.140625%2026.238281%206.054688%2027.535156%206.621094%2028.617188%20C%207.183594%2029.703125%208.292969%2030.375%209.515625%2030.375%20L%2026.484375%2030.375%20C%2027.707031%2030.375%2028.816406%2029.703125%2029.378906%2028.617188%20C%2029.941406%2027.535156%2029.859375%2026.238281%2029.15625%2025.238281%20L%2022.753906%2016.105469%20C%2022.21875%2015.34375%2021.9375%2014.453125%2021.9375%2013.523438%20L%2021.9375%208.4375%20L%2022.5%208.4375%20C%2023.121094%208.4375%2023.625%207.933594%2023.625%207.3125%20C%2023.625%206.691406%2023.121094%206.1875%2022.5%206.1875%20Z%20M%2016.3125%208.4375%20L%2019.6875%208.4375%20L%2019.6875%2013.523438%20C%2019.6875%2014.914062%2020.109375%2016.257812%2020.910156%2017.398438%20L%2020.941406%2017.4375%20L%2015.0625%2017.4375%20L%2015.089844%2017.398438%20C%2015.890625%2016.257812%2016.3125%2014.914062%2016.3125%2013.523438%20Z%20M%2015.1875%2020.8125%20C%2015.808594%2020.8125%2016.3125%2021.316406%2016.3125%2021.9375%20C%2016.3125%2022.558594%2015.808594%2023.0625%2015.1875%2023.0625%20C%2014.566406%2023.0625%2014.0625%2022.558594%2014.0625%2021.9375%20C%2014.0625%2021.316406%2014.566406%2020.8125%2015.1875%2020.8125%20Z%20M%2020.53125%2023.0625%20C%2021.617188%2023.0625%2022.5%2023.945312%2022.5%2025.03125%20C%2022.5%2026.117188%2021.617188%2027%2020.53125%2027%20C%2019.445312%2027%2018.5625%2026.117188%2018.5625%2025.03125%20C%2018.5625%2023.945312%2019.445312%2023.0625%2020.53125%2023.0625%20Z%20M%2020.53125%2023.0625%20'/%3e%3c/g%3e%3c/svg%3e";function C(t){return t.toLowerCase().split(" ").join("-")}var L=Object.defineProperty,U=Object.getOwnPropertyDescriptor,b=(t,e,a,o)=>{for(var s=o>1?void 0:o?U(e,a):e,l=t.length-1,d;l>=0;l--)(d=t[l])&&(s=(o?d(e,a,s):d(s))||s);return o&&s&&L(e,a,s),s};let g=class extends x{constructor(){super(...arguments),this.rangeReadouts={}}render(){return this.styleInputData?r`
      <div class="settings-options">
        <table>
          <!-- The tbody is explicit on purpose: rows interpolated straight
               into <table> get hoisted into an implicit tbody by the parser,
               which ejects Lit's marker nodes and breaks later re-renders. -->
          <tbody>
            ${this.styleInputData.settings.map(t=>this.renderStyleRow(t))}
          </tbody>
        </table>
        <button @click=${this.applyStyles}>Apply</button>
        ${c(this.styleInputData.palettes?.length,()=>r`
            <button @click=${this.randomizeColors}>🎲 Randomize colors</button>
          `)}
        ${c(this.styleInputData.revertable,()=>r`<button @click=${this.resetStyles}>Revert</button>`)}
        ${c(this.appliedPaletteName,()=>r`<span class="applied-palette"
              >Theme: ${this.appliedPaletteName}</span
            >`)}
      </div>
    `:u}randomizeColors(){const t=this.nextPalette();t&&(this.appliedPaletteName=t.name,this.styleInputs?.forEach(e=>{const a=t.values[e.dataset.variable??""];a&&(e.value=a)}),this.applyStyles())}nextPalette(){const t=this.styleInputData?.palettes??[];if(!t.length)return;const e=t.length>1?t.filter(a=>a.name!==this.appliedPaletteName):t;return e[Math.floor(Math.random()*e.length)]}resetStyles(){this.appliedPaletteName=void 0;const t=new Map((this.styleInputData?.settings??[]).map(e=>[e.cssVariable,e]));this.rangeReadouts={},this.styleInputs?.forEach(e=>{const a=t.get(e.dataset.variable??"");a&&(e.value=String(a.defaultValue))}),this.dispatchEvent(new CustomEvent("stylesApplied",{detail:{styles:""}}))}renderStyleRow(t){const e=C(t.label),a=t.inputType==="number"||t.inputType==="range";return r`
      <tr>
        <td>
          <label for=${e}>${t.label}</label>
        </td>
        <td class="style-input-cell">
          <input
            id=${e}
            class="style-input"
            type=${t.inputType??"text"}
            min=${m(a?t.min:void 0)}
            max=${m(a?t.max:void 0)}
            step=${m(a?t.step:void 0)}
            value=${t.defaultValue}
            data-variable=${t.cssVariable}
            data-unit=${m(t.unit)}
            @input=${t.inputType==="range"?this.updateRangeReadout:void 0}
          />
          ${t.inputType==="range"?r`<output class="style-readout" for=${e}
                >${this.readoutFor(t)}</output
              >`:u}
          ${c(this.styleInputData?.showCssVariables,()=>r`<code class="style-var" title=${t.cssVariable}
                >${t.cssVariable}</code
              >`)}
        </td>
      </tr>
    `}updateRangeReadout(t){const e=t.currentTarget,a=e.dataset.variable;if(!a)return;const o=e.dataset.unit??"";this.rangeReadouts={...this.rangeReadouts,[a]:`${e.value}${o}`}}readoutFor(t){return this.rangeReadouts[t.cssVariable]??`${t.defaultValue}${t.unit??""}`}applyStyles(){const t=[];this.styleInputs?.forEach(e=>{if(!e.dataset.variable||!e.value)return;const a=e.dataset.unit??"";t.push(`${e.dataset.variable}: ${e.value}${a};`)}),this.dispatchEvent(new CustomEvent("stylesApplied",{detail:{styles:t.join(`
 `)}}))}static get styles(){return[S,y`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }

        .style-input-cell {
          display: flex;
          align-items: center;
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
      `]}};b([h({type:Object})],g.prototype,"styleInputData",2);b([p()],g.prototype,"appliedPaletteName",2);b([p()],g.prototype,"rangeReadouts",2);b([P(".style-input")],g.prototype,"styleInputs",2);g=b([$("story-styles-settings")],g);const V=(t,e,a)=>{for(const o of e)if(o[0]===t)return(0,o[1])();return a?.()};var A=Object.defineProperty,R=Object.getOwnPropertyDescriptor,j=(t,e,a,o)=>{for(var s=o>1?void 0:o?R(e,a):e,l=t.length-1,d;l>=0;l--)(d=t[l])&&(s=(o?d(e,a,s):d(s))||s);return o&&s&&A(e,a,s),s};let v=class extends x{render(){return this.propInputData?r`
      <div class="settings-options">
        <table>
          ${this.propInputData.settings.map(t=>V(t.inputType,[["radio",()=>this.createRadioPropInput(t)]],()=>this.createDefaultPropInput(t))??u)}
        </table>
        <button @click=${this.applyProps}>Apply</button>
      </div>
    `:u}createDefaultPropInput(t){const e=C(t.label);return r`
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
    `}createRadioPropInput(t){if(t.inputType!=="radio"||!t.radioOptions)return u;const e=C(t.label);return r`
      <tr>
        <td><legend>${t.label}</legend></td>
        <td>
          ${t.radioOptions.map(a=>r`<input
                  type="radio"
                  class="prop-input"
                  name=${e}
                  id="${e}-${a}"
                  value=${a}
                  data-prop=${t.propertyName}
                  data-format=${typeof t.defaultValue}
                  ?checked=${t.defaultValue===a}
                /><label for="${e}-${a}"> ${a} </label>`)}
        </td>
      </tr>
    `}applyProps(){const t=[],e=[];this.propInputs?.forEach(a=>{if(!a.dataset.prop||!a.value||a.type==="radio"&&!a.checked)return;const o=a.dataset.prop;let s=a.value;switch(a.dataset.format){case"number":s=parseInt(s);break;case"boolean":s==="true"&&(s=!0),s==="false"&&(s=!1);break}const l=typeof s=="string"?`'${s}'`:s.toString();t.push(`.${o}=\${${l}}`),e.push({propName:o,value:s})}),this.dispatchEvent(new CustomEvent("propsApplied",{detail:{stringifiedProps:t.join(`
  `),appliedProps:e}}))}static get styles(){return[S,y`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }
      `]}};j([h({type:Object})],v.prototype,"propInputData",2);j([P(".prop-input")],v.prototype,"propInputs",2);v=j([$("story-props-settings")],v);var K=Object.defineProperty,M=Object.getOwnPropertyDescriptor,n=(t,e,a,o)=>{for(var s=o>1?void 0:o?M(e,a):e,l=t.length-1,d;l>=0;l--)(d=t[l])&&(s=(o?d(e,a,s):d(s))||s);return o&&s&&K(e,a,s),s};let i=class extends x{constructor(){super(...arguments),this.elementTag="",this.elementClassName="",this.labs=!1,this.focused=!1,this.detailsVisible=!1,this.shouldShowPropertySettings=!1,this.shouldShowUsageNotes=!1,this.copiedKey=null}willUpdate(t){t.has("elementTag")&&(this.focused=this.elementTag===I(window.location.hash),this.detailsVisible=this.focused)}render(){return r`
      <div id="container">
        <h2>
          <code>&lt;${this.elementTag}&gt;</code>
          ${c(this.labs,()=>r`<img
                src=${E}
                alt="Labs icon"
                title="Labs"
                class="labs-icon"
              />`)}
        </h2>
        <h3>Demo</h3>
        <div class="slot-container" style=${m(this.stringifiedStyles)}>
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
    `}get detailsTemplate(){return r`
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
      ${c(this.cssCode,()=>r`
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
          ${c(!!this.propInputData,()=>r`
              <story-props-settings
                .propInputData=${this.propInputData}
                @propsApplied=${this.handlePropsApplied}
              ></story-props-settings>
            `)}
          ${c(!this.propInputData&&!this.shouldShowPropertySettings,()=>r`<p class="section-placeholder">No settings to adjust</p>`)}
          <div
            class="slot-container ${this.shouldShowPropertySettings?"":"hidden"}"
            @slotchange=${this.handleSettingsSlotChange}
          >
            <slot name="settings"></slot>
          </div>
        </div>
        <div class="right-col">
          <h3>Styles</h3>
          ${c(!!this.styleInputData,()=>r`
              <story-styles-settings
                .styleInputData=${this.styleInputData}
                @stylesApplied=${this.handleStylesApplied}
              ></story-styles-settings>
            `,()=>r`<p class="section-placeholder">No styles to adjust</p>`)}
        </div>
      </div>
      ${c(this.shouldShowUsageNotes,()=>r` <h3>Usage Notes</h3>`)}
      <div class="slot-container">
        <slot
          name="usage-notes"
          @slotchange=${this.handleUsageNotesSlotChange}
        ></slot>
      </div>
    `}async copyToClipboard(t,e){try{await navigator.clipboard.writeText(t),this.copiedKey=e,clearTimeout(this._copyTimeout),this._copyTimeout=setTimeout(()=>this.copiedKey=null,2e3)}catch(a){console.warn("Clipboard write failed:",a)}}get importCode(){return this.elementClassName?`import '${this.modulePath}';
import { ${this.elementClassName} } from '${this.modulePath}';`:`import '${this.modulePath}';`}get exampleUsage(){const t=this.defaultUsageProps?"  "+this.defaultUsageProps+`
`:"",e=this.stringifiedProps?"  "+this.stringifiedProps+`
`:"",a=!!t||!!e,o=this.defaultSlottedContent&&a?`
 `+this.defaultSlottedContent+`
`:this.defaultSlottedContent;return`<${this.elementTag}${a?`
`:""}${t}${e}>${o??""}</${this.elementTag}>`}get cssCode(){return this.stringifiedStyles?`${this.elementTag} {
 ${this.stringifiedStyles}
}`:""}get modulePath(){return this.labs?`@internetarchive/elements/labs/${this.elementTag}/${this.elementTag}`:`@internetarchive/elements/${this.elementTag}/${this.elementTag}`}handleSettingsSlotChange(t){const e=t.target.assignedElements();this.shouldShowPropertySettings=e.length>0}handleUsageNotesSlotChange(t){const e=t.target.assignedElements();this.shouldShowUsageNotes=e.length>0}handleDemoComponentSlotted(t){const e=t.target.assignedElements()[0];e&&(this.slottedDemoComponent=e)}handleStylesApplied(t){this.stringifiedStyles=t.detail.styles||void 0}handlePropsApplied(t){const e=t.detail.stringifiedProps,a=t.detail.appliedProps;!e||!a||(this.stringifiedProps=e,a.forEach(o=>{this.slottedDemoComponent[o.propName]=o.value}))}static get styles(){return[S,y`
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
      `]}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._copyTimeout)}};n([h({type:String})],i.prototype,"elementTag",2);n([h({type:String})],i.prototype,"elementClassName",2);n([h({type:String})],i.prototype,"customExampleUsage",2);n([h({type:String})],i.prototype,"defaultUsageProps",2);n([h({type:String})],i.prototype,"defaultSlottedContent",2);n([h({type:Object})],i.prototype,"styleInputData",2);n([h({type:Object})],i.prototype,"propInputData",2);n([h({type:Boolean})],i.prototype,"labs",2);n([p()],i.prototype,"focused",2);n([p()],i.prototype,"detailsVisible",2);n([p()],i.prototype,"stringifiedStyles",2);n([p()],i.prototype,"stringifiedProps",2);n([p()],i.prototype,"shouldShowPropertySettings",2);n([p()],i.prototype,"shouldShowUsageNotes",2);n([p()],i.prototype,"slottedDemoComponent",2);n([p()],i.prototype,"copiedKey",2);i=n([$("story-template")],i);export{V as a,_ as e,c as n,m as o,P as r,S as t};
