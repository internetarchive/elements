import{w as d,i as u,a as h,n as a,e as v,A as s,b,c as g}from"./index-B364GelF.js";import{a as f}from"./theme-styles-BM8-NfZC.js";const x=d`
  <svg viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      fill-rule="evenodd"
      d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z"
    />
  </svg>
`;var y=Object.defineProperty,m=Object.getOwnPropertyDescriptor,e=(r,o,n,l)=>{for(var i=l>1?void 0:l?m(o,n):o,c=r.length-1,p;c>=0;c--)(p=r[c])&&(i=(l?p(o,n,i):p(i))||i);return l&&i&&y(o,n,i),i};let t=class extends u{constructor(){super(...arguments),this.value="",this.clearButtonScreenReaderLabel="Clear",this.focusOnClear=!0,this.forceClearButton=!1}render(){const r=!this.value&&!this.forceClearButton;return b`
      <div id="container">
        <slot name="icon"></slot>
        <label for="text-input" class="sr-only"
          >${this.screenReaderLabel??s}</label
        >
        <input
          id="text-input"
          type="text"
          inputmode="search"
          enterkeyhint="search"
          autocapitalize="off"
          placeholder=${this.placeholder??s}
          .value=${this.value??s}
          aria-controls=${this.ariaControls??s}
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
    `}onTextInput(){this.value=this.textInput.value}onKeyPress(r){if(r.key==="Enter"){this.textInput.blur();const o=new CustomEvent("submit",{detail:this.value});this.dispatchEvent(o)}}clearButtonClicked(){const r=this.textInput.value;this.value="",this.focusOnClear&&this.textInput.focus();const o=new CustomEvent("clear",{detail:r});this.dispatchEvent(o);const n=new InputEvent("input",{inputType:"deleteContentBackward"});this.dispatchEvent(n)}};t.shadowRootOptions={...u.shadowRootOptions,delegatesFocus:!0};t.styles=[f,h`
      :host {
        --input-height: var(--ia-size-control-sm--);
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
        padding: var(--input-padding, 0 var(--ia-space-2--));
        padding-inline-end: var(--input-height);
        border: var(--input-border-width, var(--ia-size-border-width--))
          var(--input-border-style, solid)
          var(--input-border-color, var(--ia-color-border-strong--));
        /* A search field, the one place the pill radius is right. */
        border-radius: var(--input-border-radius, var(--ia-radius-pill--));
        background-image: var(--input-background-image, none);
        background-color: var(--input-background-color, transparent);
        color: var(--input-color, var(--ia-color-text-primary--));
        font-size: var(--input-font-size, 1.7rem); /* 17px at a 10px root */
        line-height: var(--input-line-height, 1.5);
        box-shadow: var(--input-box-shadow, none);
      }

      #text-input::placeholder {
        color: var(--input-placeholder-color, var(--ia-color-text-secondary--));
      }

      #text-input:hover {
        border-color: var(
          --input-hover-border-color,
          var(--ia-color-text-primary--)
        );
      }

      /* The shared focus ring; the border stays as it is. */
      #text-input:focus {
        outline: none;
      }

      #text-input:focus-visible {
        border-color: var(
          --input-focused-border-color,
          var(--input-border-color, var(--ia-color-border-strong--))
        );
        box-shadow: var(--input-focused-box-shadow, none);
        outline: var(--ia-size-focus-ring--) solid
          var(--ia-color-border-focus--);
        outline-offset: var(
          --input-focus-ring-offset,
          var(--ia-size-focus-ring-offset--)
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

      #clear-button:focus-visible {
        outline: var(--ia-size-focus-ring--) solid
          var(--ia-color-border-focus--);
        outline-offset: calc(-1 * var(--ia-size-focus-ring--));
        border-radius: var(--ia-radius-circle--);
      }

      #clear-button[hidden] {
        display: none;
      }

      .clear-icon {
        display: block;
        width: 100%;
        height: 100%;
        background: var(
          --clear-button-icon-background,
          var(--ia-color-text-primary--)
        );
        border-radius: var(--ia-radius-circle--);
        pointer-events: none;
      }

      .clear-icon svg {
        display: block;
        width: 100%;
        height: 100%;
      }

      .clear-icon .fill-color {
        fill: var(--clear-button-icon-color, var(--ia-color-surface-raised--));
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
    `];e([a({type:String})],t.prototype,"value",2);e([a({type:String})],t.prototype,"placeholder",2);e([a({type:String})],t.prototype,"screenReaderLabel",2);e([a({type:String})],t.prototype,"clearButtonScreenReaderLabel",2);e([a({type:String})],t.prototype,"ariaControls",2);e([a({type:Boolean})],t.prototype,"focusOnClear",2);e([a({type:Boolean,reflect:!0})],t.prototype,"forceClearButton",2);e([v("#text-input")],t.prototype,"textInput",2);t=e([g("ia-clearable-text-input")],t);
