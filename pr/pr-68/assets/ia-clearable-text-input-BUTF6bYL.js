import{w as d,i as u,a as h,n as i,e as b,A as l,b as v,c as g}from"./index-BrjT5jch.js";const x=d`
  <svg viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      fill-rule="evenodd"
      d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z"
    />
  </svg>
`;var f=Object.defineProperty,w=Object.getOwnPropertyDescriptor,e=(r,n,a,p)=>{for(var o=p>1?void 0:p?w(n,a):n,s=r.length-1,c;s>=0;s--)(c=r[s])&&(o=(p?c(n,a,o):c(o))||o);return p&&o&&f(n,a,o),o};let t=class extends u{constructor(){super(...arguments),this.value="",this.clearButtonScreenReaderLabel="Clear",this.focusOnClear=!0,this.forceClearButton=!1}render(){const r=!this.value&&!this.forceClearButton;return v`
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
          ?hidden=${r}
          @click=${this.clearButtonClicked}
        >
          <span class="clear-icon" aria-hidden="true">${x}</span>
          <span class="sr-only">${this.clearButtonScreenReaderLabel}</span>
        </button>
      </div>
    `}onTextInput(){this.value=this.textInput.value}onKeyPress(r){if(r.key==="Enter"){this.textInput.blur();const n=new CustomEvent("submit",{detail:this.value});this.dispatchEvent(n)}}clearButtonClicked(){const r=this.textInput.value;this.value="",this.focusOnClear&&this.textInput.focus();const n=new CustomEvent("clear",{detail:r});this.dispatchEvent(n);const a=new InputEvent("input",{inputType:"deleteContentBackward"});this.dispatchEvent(a)}};t.shadowRootOptions={...u.shadowRootOptions,delegatesFocus:!0};t.styles=h`
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

    .clear-icon {
      display: block;
      width: 100%;
      height: 100%;
      background: var(--clear-button-icon-background, #2c2c2c);
      border-radius: 50%;
      pointer-events: none;
    }

    .clear-icon svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    .clear-icon .fill-color {
      fill: var(--clear-button-icon-color, #fff);
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
  `;e([i({type:String})],t.prototype,"value",2);e([i({type:String})],t.prototype,"placeholder",2);e([i({type:String})],t.prototype,"screenReaderLabel",2);e([i({type:String})],t.prototype,"clearButtonScreenReaderLabel",2);e([i({type:String})],t.prototype,"ariaControls",2);e([i({type:Boolean})],t.prototype,"focusOnClear",2);e([i({type:Boolean,reflect:!0})],t.prototype,"forceClearButton",2);e([b("#text-input")],t.prototype,"textInput",2);t=e([g("ia-clearable-text-input")],t);
