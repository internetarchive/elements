import{b as d,i as u,a as h,n as i,e as b,A as l,m as v,c as g}from"./index-BTAXPDVy.js";import{l as x}from"./localized-decorator-Be1Jx-O-.js";const m=d`
<svg
  viewBox="0 0 40 40"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z" class="fill-color" fill-rule="evenodd"/>
</svg>
`;class f extends u{static get styles(){return h`
      :host {
        width: var(--iconWidth, 'auto');
        height: var(--iconHeight, 'auto');
      }

      .fill-color {
        fill: var(--iconFillColor);
      }

      .stroke-color {
        stroke: var(--iconStrokeColor);
      }
    `}render(){return m}}customElements.define("ia-icon-close",f);var w=Object.defineProperty,y=Object.getOwnPropertyDescriptor,r=(e,o,a,s)=>{for(var n=s>1?void 0:s?y(o,a):o,p=e.length-1,c;p>=0;p--)(c=e[p])&&(n=(s?c(o,a,n):c(n))||n);return s&&n&&w(o,a,n),n};let t=class extends u{constructor(){super(...arguments),this.value="",this.focusOnClear=!0,this.forceClearButton=!1}render(){const e=!this.value&&!this.forceClearButton;return d`
      <div id="container">
        <slot name="icon"></slot>
        <label for="text-input" class="sr-only"
          >${this.screenReaderLabel??l}</label
        >
        <input
          id="text-input"
          type="text"
          inputmode="search"
          enterkeyhint="search"
          autocapitalize="off"
          placeholder=${this.placeholder??l}
          .value=${this.value??l}
          aria-controls=${this.ariaControls??l}
          @input=${this.onTextInput}
          @keypress=${this.onKeyPress}
        />
        <button
          id="clear-button"
          type="button"
          ?hidden=${e}
          @click=${this.clearButtonClicked}
        >
          <ia-icon-close aria-hidden="true"></ia-icon-close>
          <span class="sr-only"
            >${this.clearButtonScreenReaderLabel??v("Clear")}</span
          >
        </button>
      </div>
    `}onTextInput(){this.value=this.textInput.value}onKeyPress(e){if(e.key==="Enter"){this.textInput.blur();const o=new CustomEvent("submit",{detail:this.value});this.dispatchEvent(o)}}clearButtonClicked(){const e=this.textInput.value;this.value="",this.focusOnClear&&this.textInput.focus();const o=new CustomEvent("clear",{detail:e});this.dispatchEvent(o);const a=new InputEvent("input",{inputType:"deleteContentBackward"});this.dispatchEvent(a)}};t.shadowRootOptions={...u.shadowRootOptions,delegatesFocus:!0};t.styles=h`
    :host {
      --input-height: 3rem;
      --clear-button-top: 0;
      --clear-button-right: 2px;
    }

    #container {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: var(--input-height);
    }

    #text-input {
      width: 100%;
      height: 100%;
      padding: var(--input-padding, 0 1rem);
      padding-inline-end: var(--input-height);
      border: var(--input-border-width, 1px) var(--input-border-style, solid)
        var(--input-border-color, #ccc);
      border-radius: var(--input-border-radius, 2rem);
      background-image: var(--input-background-image, none);
      background-color: var(--input-background-color, transparent);
      color: var(--input-color, #555);
      font-size: var(--input-font-size, 1.7rem);
      line-height: var(--input-line-height, 1.5);
      box-shadow: var(--input-box-shadow, inset 0 1px 1px rgba(0, 0, 0, 0.075));
      -webkit-box-shadow: var(
        --input-box-shadow,
        inset 0 1px 1px rgba(0, 0, 0, 0.075)
      );
    }

    #text-input:focus {
      border-color: var(--input-focused-border-color, #66afe9);
      outline: 0;
      box-shadow: var(
        --input-focused-box-shadow,
        inset 0 1px 1px rgb(0 0 0 / 8%),
        0 0 8px rgb(102 175 233 / 60%)
      );
      -webkit-box-shadow: var(
        --input-focused-box-shadow,
        inset 0 1px 1px rgb(0 0 0 / 8%),
        0 0 8px rgb(102 175 233 / 60%)
      );
    }

    #clear-button {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      inset-block-start: var(--clear-button-top);
      inset-inline-end: var(--clear-button-right);
      height: var(--clear-button-height, var(--input-height));
      width: var(--clear-button-width, var(--input-height));
      padding: var(--clear-button-padding, 4px);
      border: var(--clear-button-border, 0);
      background: none;
      appearance: none;
      cursor: pointer;
    }

    #clear-button[hidden] {
      display: none;
    }

    ia-icon-close {
      --iconWidth: 100%;
      --iconHeight: 100%;
      --iconFillColor: white;
      background: #2c2c2c;
      border-radius: 50%;
      pointer-events: none;
    }

    /* Fallback support for older browsers without newer bidirectional rules */
    @supports not ((inset-block-start: 0) and (padding-inline-end: 0)) {
      #text-input {
        padding-right: var(--input-height);
      }

      #clear-button {
        top: var(--clear-button-top);
        right: var(--clear-button-right);
      }
    }

    .sr-only {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      margin: -1px !important;
      padding: 0 !important;
      border: 0 !important;
      overflow: hidden !important;
      white-space: nowrap !important;
      clip: rect(1px, 1px, 1px, 1px) !important;
      -webkit-clip-path: inset(50%) !important;
      clip-path: inset(50%) !important;
    }
  `;r([i({type:String})],t.prototype,"value",2);r([i({type:String})],t.prototype,"placeholder",2);r([i({type:String})],t.prototype,"screenReaderLabel",2);r([i({type:String})],t.prototype,"clearButtonScreenReaderLabel",2);r([i({type:String})],t.prototype,"ariaControls",2);r([i({type:Boolean})],t.prototype,"focusOnClear",2);r([i({type:Boolean,reflect:!0})],t.prototype,"forceClearButton",2);r([b("#text-input")],t.prototype,"textInput",2);t=r([x(),g("ia-clearable-text-input")],t);
