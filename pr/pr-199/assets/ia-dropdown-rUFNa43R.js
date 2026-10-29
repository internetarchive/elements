import{w as v,n as i,e as w,c as f,i as B,b as d,a}from"./index-B8JUsVBF.js";import{o as y}from"./query-assigned-elements-CQ8lvrwU.js";import{n as h}from"./story-template-CAXyAsJW.js";import{t as x}from"./theme-styles-m8I4av-d.js";const $=v`
<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>
`,k=v`
<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>
`;var C=Object.defineProperty,O=Object.getOwnPropertyDescriptor,e=(o,r,c,s)=>{for(var n=s>1?void 0:s?O(r,c):r,l=o.length-1,p;l>=0;l--)(p=o[l])&&(n=(s?p(r,c,n):p(n))||n);return s&&n&&C(r,c,n),n};let t=class extends B{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionGroup="options",this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=o=>{switch(o.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=o=>{o&&o.type==="click"&&o.stopPropagation(),this.open=!1,this.updatePopoverState()}}async firstUpdated(){await new Promise(o=>{setTimeout(o,0)}),this.addEventListener("closeDropdown",this.closeOptions)}willUpdate(o){o.has("open")&&this.updatePopoverState()}disconnectedCallback(){super.disconnectedCallback?.(),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){this.usePopover&&(this.dropdownMenu?.togglePopover?.(this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;const o=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${o.left}px`,this.dropdownMenu.style.top=`${o.bottom}px`,this.dropdownMenu.style.minWidth=`${o.width}px`}mainButtonClicked(){this.openViaButton?this.toggleOptions():this.mainButtonLabelSlotted[0]?.click()}mainButtonKeyDown(o){(o.key==="Enter"||o.key===" ")&&(this.mainButtonClicked(),o.preventDefault())}caretKeyDown(o){(o.key==="Enter"||o.key===" ")&&(this.toggleOptions(),o.preventDefault())}renderOption(o){const{label:r,url:c=void 0,id:s}=o;let n;const l=this.selectedOption===s?"selected":"";return c?n=d`<a
        href=${c}
        @click=${p=>this.optionClicked(p,o)}
        >${r}</a
      >`:n=d`<button
        @click=${p=>this.optionClicked(p,o)}
      >
        ${r}
      </button>`,d`<li role="menuitem" class=${l}>${n}</li>`}optionClicked(o,r){o.stopPropagation(),this.selectedOption!==r.id&&(this.selectedOption=r.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:r}})),r.selectedHandler?.(r)),this.closeOnSelect&&(this.closeOptions(),this.mainButton.focus())}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(o=>this.selectedOption!==o.id)}get caretUpTemplate(){return d`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${$}</slot>
      </span>
    `}get caretDownTemplate(){return d`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${k}</slot>
      </span>
    `}get caretTemplate(){return this.displayCaret?this.openViaButton?d`
        <span class="caret" aria-hidden="true">
          ${this.caretUpTemplate} ${this.caretDownTemplate}
        </span>
      `:d`
      <button
        class="caret"
        aria-labelledby="caret-label"
        aria-haspopup="true"
        aria-expanded=${this.open}
        @click=${h(this.shouldAttachEventHandlers,()=>this.toggleOptions)}
        @keydown=${h(this.shouldAttachEventHandlers,()=>this.caretKeyDown)}
        ?disabled=${this.isDisabled}
      >
        ${this.caretUpTemplate} ${this.caretDownTemplate}
      </button>
    `:d``}get dropdownTemplate(){return this.isCustomList?d`<slot name="list"></slot>`:d`${this.availableOptions.map(o=>this.renderOption(o))}`}get backdropTemplate(){return this.closeOnBackdropClick?this.open?d`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `:d``:d``}get shouldNestCaretInButton(){return this.openViaButton}get shouldAttachEventHandlers(){return!this.isDisabled&&!this.hasCustomClickHandler}render(){return d`
      <div class="ia-dropdown-group ${this.open?"open":""}">
        <div class="button-row">
          <button
            class="click-main"
            aria-haspopup=${this.openViaButton}
            aria-expanded=${this.open}
            @click=${h(this.shouldAttachEventHandlers,()=>this.mainButtonClicked)}
            @keydown=${h(this.shouldAttachEventHandlers,()=>this.mainButtonKeyDown)}
            ?disabled=${this.isDisabled}
          >
            <span class="sr-only" id="caret-label"
              >Toggle ${this.optionGroup}</span
            >
            <slot name="dropdown-label"></slot>
            ${h(this.shouldNestCaretInButton,()=>this.caretTemplate)}
          </button>
          ${h(!this.shouldNestCaretInButton,()=>this.caretTemplate)}
        </div>

        <ul
          id="dropdown-main"
          class=${this.dropdownState}
          role="menu"
          ?popover=${this.usePopover}
        >
          ${this.dropdownTemplate}
        </ul>

        ${this.backdropTemplate}
      </div>
    `}static get styles(){const o=a`var(--dropdownBorderWidth, 1px)`,r=a`var(--dropdownBorderRadius, 4px)`,c=a`var(--dropdownBorderColor, #fff)`,s=a`var(--dropdownBgColor, #333)`,n=a`var(--dropdownTextColor, #fff)`,l=a`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,p=a`var(--dropdownSelectedBgColor, #fff)`,u=a`var(--dropdownMainButtonBgColor, transparent)`,b=a`var(--dropdownTextAlign, inherit)`,g=a`var(--dropdownBackdropZIndex, 1)`,m=a`var(--dropdownListZIndex, 2)`;return[x,a`
        :host {
          display: inline;
          color: ${n};
        }

        svg.caret-up-svg,
        svg.caret-down-svg,
        ::slotted(svg.caret-up-svg),
        ::slotted(svg.caret-down-svg) {
          fill: var(--dropdownCaretColor, #fff);
          vertical-align: middle;
        }

        .button-row {
          display: flex;
          height: 100%;
        }

        button.click-main {
          background: ${u};
          color: inherit;
          padding: var(--dropdownMainButtonPadding, 0px);
          border: var(--dropdownMainButtonBorder, none);
          border-radius: var(--dropdownMainButtonBorderRadius, none);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          align-content: center;
          flex-wrap: nowrap;
          flex-direction: var(--dropdownMainButtonFlexDirection, row);
        }

        .open button.click-main {
          /* When the dropdown is open, give the buttom the same z-index
           as the dropdown menu, so that it remains clickable despite
           the backdrop. */
          z-index: ${m};
        }

        button.click-main:disabled {
          pointer-events: none;
          cursor: not-allowed;
          opacity: 0.5;
          /* Disable text selection on disabled button */
          -webkit-user-select: none; /* Safari */
          -ms-user-select: none; /* IE 10 and IE 11 */
          user-select: none; /* Standard syntax */
        }

        button.click-main:hover {
          background-color: var(
            --dropdownMainButtonHoverBgColor,
            ${u}
          );
        }

        button.click-main:focus,
        button.click-main:focus-visible {
          background-color: var(
            --dropdownMainButtonFocusBgColor,
            ${u}
          );
        }

        button.click-main:active {
          background-color: var(
            --dropdownMainButtonActiveBgColor,
            ${u}
          );
        }

        button slot[name='dropdown-label'] {
          /* Set var to 0px for column layout */
          padding-right: var(--buttonSlotPaddingRight, 5px);
          display: inline-block;
        }

        .ia-dropdown-group {
          width: inherit;
          height: inherit;
          position: relative;
        }

        .sr-only {
          border: 0 !important;
          clip: rect(1px, 1px, 1px, 1px) !important;
          -webkit-clip-path: inset(50%) !important;
          clip-path: inset(50%) !important;
          height: 1px !important;
          margin: -1px !important;
          overflow: hidden !important;
          padding: 0 !important;
          position: absolute !important;
          width: 1px !important;
          white-space: nowrap !important;
          -webkit-user-select: none !important;
          user-select: none !important;
        }

        .caret {
          /* Maintain centered caret position but with a full-height clickable region */
          display: flex;
          align-self: stretch;
          align-items: center;
          padding: var(--caretPadding, 0px);
        }

        button.caret {
          appearance: none;
          background: none;
          border: none;
          cursor: pointer;
        }

        .caret svg {
          height: var(--caretHeight, 10px);
          width: var(--caretWidth, 20px);
        }

        #dropdown-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: transparent;
          z-index: ${g};
        }

        ul {
          z-index: ${m};
        }

        #dropdown-main.closed {
          visibility: hidden;
          height: 1px;
          width: 1px;
        }

        #dropdown-main {
          position: var(--dropdownListPosition, absolute);
          list-style: none;
          margin: var(--dropdownOffsetTop, 5px) 0 0 0;
          padding: var(--dropdownPadding, 0);
          color: ${n};
          background: ${s};

          font-size: var(--dropdownFontSize, inherit);

          border-top: var(--dropdownBorderTopWidth, ${o});
          border-right: var(--dropdownBorderRightWidth, ${o});
          border-bottom: var(
            --dropdownBorderBottomWidth,
            ${o}
          );
          border-left: var(--dropdownBorderLeftWidth, ${o});
          /* Must be after border-width settings for specificity */
          border-style: solid;
          border-color: ${c};

          border-radius: var(
              --dropdownBorderTopLeftRadius,
              ${r}
            )
            var(--dropdownBorderTopRightRadius, ${r})
            var(--dropdownBorderBottomRightRadius, ${r})
            var(--dropdownBorderBottomLeftRadius, ${r});

          white-space: var(--dropdownWhiteSpace, normal);

          /* Prevent top/bottom inner li from overlapping inner border */
          overflow: hidden;
        }

        #dropdown-main li:hover {
          background-color: ${l};
          color: var(--dropdownHoverTextColor, #fff);
          list-style: none;
          cursor: pointer;
        }

        #dropdown-main li:hover:first-child {
          border-top-color: ${l};
        }

        ul#dropdown-main li:hover:last-child {
          border-bottom-color: ${l};
        }

        #dropdown-main li:hover:not(:first-child) {
          border-top: 0.5px solid var(--dropdownHoverTopBottomBorderColor, #333);
        }
        #dropdown-main li:hover:not(:last-child) {
          border-bottom: 0.5px solid
            var(--dropdownHoverTopBottomBorderColor, #333);
        }

        #dropdown-main li.selected:last-child {
          border-bottom-color: ${p};
        }

        #dropdown-main li.selected:first-child {
          border-top-color: ${p};
        }

        #dropdown-main li:hover > *,
        #dropdown-main li:focus-within > * {
          background-color: ${l};
          color: var(--dropdownHoverTextColor, #fff);
        }

        #dropdown-main li.selected > * {
          background-color: ${p};
          color: var(--dropdownSelectedTextColor, #2c2c2c);
        }

        #dropdown-main li {
          background: ${s};
          list-style: none;
          height: 30px;
          cursor: pointer;
          border-bottom: 0.5px solid ${s};
          border-top: 0.5px solid ${s};
        }

        #dropdown-main li button {
          background: none;
          color: inherit;
          border: none;
          font: inherit;
          cursor: pointer;
          outline: inherit;
        }

        #dropdown-main li a {
          text-decoration: none;
          display: block;
          box-sizing: border-box;
        }

        #dropdown-main li:first-child {
          border-top-left-radius: var(--dropdownBorderTopLeftRadius, 4px);
          border-top-right-radius: var(--dropdownBorderTopRightRadius, 4px);
        }

        #dropdown-main li:last-child {
          border-bottom-right-radius: var(
            --dropdownBorderBottomRightRadius,
            4px
          );
          border-bottom-left-radius: var(--dropdownBorderBottomLeftRadius, 4px);
        }

        /* cover the list with the label */
        #dropdown-main li > * > :first-child {
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          align-content: center;
          flex-wrap: nowrap;
          height: 100%;
          padding: var(--dropdownItemPaddingTop, 5px)
            var(--dropdownItemPaddingRight, 10px)
            var(--dropdownItemPaddingBottom, 5px)
            var(--dropdownItemPaddingLeft, 10px);
          box-sizing: border-box;
        }

        #dropdown-main li > * {
          width: 100%;
          height: inherit;
          color: ${n};
          background: var(--dropdownItemButtonBgColor, transparent);
          padding: var(--dropdownItemButtonPadding, 0);
          text-align: ${b};
        }
      `]}};e([i({type:Boolean,reflect:!0})],t.prototype,"open",2);e([i({type:Boolean,reflect:!0})],t.prototype,"isDisabled",2);e([i({type:Boolean})],t.prototype,"displayCaret",2);e([i({type:Boolean})],t.prototype,"closeOnSelect",2);e([i({type:Boolean})],t.prototype,"openViaButton",2);e([i({type:Boolean})],t.prototype,"usePopover",2);e([i({type:Boolean})],t.prototype,"includeSelectedOption",2);e([i({type:String})],t.prototype,"selectedOption",2);e([i({attribute:!1})],t.prototype,"options",2);e([i({type:String})],t.prototype,"optionGroup",2);e([i({attribute:!1})],t.prototype,"optionSelected",2);e([i({type:Boolean,reflect:!0})],t.prototype,"isCustomList",2);e([i({type:Boolean,reflect:!0})],t.prototype,"hasCustomClickHandler",2);e([i({type:Boolean,reflect:!0})],t.prototype,"closeOnEscape",2);e([i({type:Boolean,reflect:!0})],t.prototype,"closeOnBackdropClick",2);e([w(".ia-dropdown-group")],t.prototype,"container",2);e([w("#dropdown-main")],t.prototype,"dropdownMenu",2);e([w(".click-main")],t.prototype,"mainButton",2);e([y({slot:"dropdown-label"})],t.prototype,"mainButtonLabelSlotted",2);t=e([f("ia-dropdown")],t);
