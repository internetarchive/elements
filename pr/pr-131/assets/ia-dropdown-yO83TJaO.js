import{f as y,w as f,n as i,e as m,c as x,i as $,b as s,a as c}from"./index-C5s1v5Bl.js";import{n as u,t as k}from"./story-template-BrbjR4Hk.js";import{m as v,s as C}from"./runtime-CCgtQBty.js";function L(o){return(t,p)=>{const{slot:d,selector:n}=o??{},l="slot"+(d?`[name=${d}]`:":not([name])");return y(t,p,{get(){const a=this.renderRoot?.querySelector(l),h=a?.assignedElements(o)??[];return n===void 0?h:h.filter(w=>w.matches(n))}})}}const b="lit-localize-status";class O{constructor(t){this.__litLocalizeEventHandler=p=>{p.detail.status==="ready"&&this.host.requestUpdate()},this.host=t}hostConnected(){window.addEventListener(b,this.__litLocalizeEventHandler)}hostDisconnected(){window.removeEventListener(b,this.__litLocalizeEventHandler)}}const T=o=>o.addController(new O(o)),S=T;const E=()=>(o,t)=>(o.addInitializer(S),o),P=f`
<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>
`,D=f`
<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>
`;var R=Object.defineProperty,H=Object.getOwnPropertyDescriptor,r=(o,t,p,d)=>{for(var n=d>1?void 0:d?H(t,p):t,l=o.length-1,a;l>=0;l--)(a=o[l])&&(n=(d?a(t,p,n):a(n))||n);return d&&n&&R(t,p,n),n};let e=class extends ${constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=o=>{switch(o.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=o=>{o&&o.type==="click"&&o.stopPropagation(),this.open=!1,this.updatePopoverState()}}async firstUpdated(){await new Promise(o=>{setTimeout(o,0)}),this.addEventListener("closeDropdown",this.closeOptions)}willUpdate(o){o.has("open")&&this.updatePopoverState()}disconnectedCallback(){super.disconnectedCallback?.(),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){this.usePopover&&(this.dropdownMenu?.togglePopover?.(this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;const o=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${o.left}px`,this.dropdownMenu.style.top=`${o.bottom}px`,this.dropdownMenu.style.minWidth=`${o.width}px`}mainButtonClicked(){this.openViaButton?this.toggleOptions():this.mainButtonLabelSlotted[0]?.click()}mainButtonKeyDown(o){(o.key==="Enter"||o.key===" ")&&(this.mainButtonClicked(),o.preventDefault())}caretKeyDown(o){(o.key==="Enter"||o.key===" ")&&(this.toggleOptions(),o.preventDefault())}renderOption(o){const{label:t,url:p=void 0,id:d}=o;let n;const l=this.selectedOption===d?"selected":"";return p?n=s`<a
        href=${p}
        @click=${a=>this.optionClicked(a,o)}
        >${t}</a
      >`:n=s`<button
        @click=${a=>this.optionClicked(a,o)}
      >
        ${t}
      </button>`,s`<li role="menuitem" class=${l}>${n}</li>`}optionClicked(o,t){o.stopPropagation(),this.selectedOption!==t.id&&(this.selectedOption=t.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:t}})),t.selectedHandler?.(t)),this.closeOnSelect&&(this.closeOptions(),this.mainButton.focus())}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(o=>this.selectedOption!==o.id)}get caretUpTemplate(){return s`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${P}</slot>
      </span>
    `}get caretDownTemplate(){return s`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${D}</slot>
      </span>
    `}get caretTemplate(){return this.displayCaret?this.openViaButton?s`
        <span class="caret" aria-hidden="true">
          ${this.caretUpTemplate} ${this.caretDownTemplate}
        </span>
      `:s`
      <button
        class="caret"
        aria-labelledby="caret-label"
        aria-haspopup="true"
        aria-expanded=${this.open}
        @click=${u(this.shouldAttachEventHandlers,()=>this.toggleOptions)}
        @keydown=${u(this.shouldAttachEventHandlers,()=>this.caretKeyDown)}
        ?disabled=${this.isDisabled}
      >
        ${this.caretUpTemplate} ${this.caretDownTemplate}
      </button>
    `:s``}get dropdownTemplate(){return this.isCustomList?s`<slot name="list"></slot>`:s`${this.availableOptions.map(o=>this.renderOption(o))}`}get backdropTemplate(){return this.closeOnBackdropClick?this.open?s`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `:s``:s``}get shouldNestCaretInButton(){return this.openViaButton}get shouldAttachEventHandlers(){return!this.isDisabled&&!this.hasCustomClickHandler}get toggleLabel(){return this.optionGroup?v(C`Toggle ${this.optionGroup}`):v("Toggle options")}render(){return s`
      <div class="ia-dropdown-group ${this.open?"open":""}">
        <div class="button-row">
          <button
            class="click-main"
            aria-haspopup=${this.openViaButton}
            aria-expanded=${this.open}
            @click=${u(this.shouldAttachEventHandlers,()=>this.mainButtonClicked)}
            @keydown=${u(this.shouldAttachEventHandlers,()=>this.mainButtonKeyDown)}
            ?disabled=${this.isDisabled}
          >
            <span class="sr-only" id="caret-label">${this.toggleLabel}</span>
            <slot name="dropdown-label"></slot>
            ${u(this.shouldNestCaretInButton,()=>this.caretTemplate)}
          </button>
          ${u(!this.shouldNestCaretInButton,()=>this.caretTemplate)}
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
    `}static get styles(){const o=c`var(--dropdownBorderWidth, 1px)`,t=c`var(--dropdownBorderRadius, 4px)`,p=c`var(--dropdownBorderColor, #fff)`,d=c`var(--dropdownBgColor, #333)`,n=c`var(--dropdownTextColor, #fff)`,l=c`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,a=c`var(--dropdownSelectedBgColor, #fff)`,h=c`var(--dropdownMainButtonBgColor, transparent)`,w=c`var(--dropdownTextAlign, inherit)`,B=c`var(--dropdownBackdropZIndex, 1)`,g=c`var(--dropdownListZIndex, 2)`;return[k,c`
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
          background: ${h};
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
          z-index: ${g};
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
            ${h}
          );
        }

        button.click-main:focus,
        button.click-main:focus-visible {
          background-color: var(
            --dropdownMainButtonFocusBgColor,
            ${h}
          );
        }

        button.click-main:active {
          background-color: var(
            --dropdownMainButtonActiveBgColor,
            ${h}
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
          z-index: ${B};
        }

        ul {
          z-index: ${g};
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
          background: ${d};

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
          border-color: ${p};

          border-radius: var(
              --dropdownBorderTopLeftRadius,
              ${t}
            )
            var(--dropdownBorderTopRightRadius, ${t})
            var(--dropdownBorderBottomRightRadius, ${t})
            var(--dropdownBorderBottomLeftRadius, ${t});

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
          border-bottom-color: ${a};
        }

        #dropdown-main li.selected:first-child {
          border-top-color: ${a};
        }

        #dropdown-main li:hover > *,
        #dropdown-main li:focus-within > * {
          background-color: ${l};
          color: var(--dropdownHoverTextColor, #fff);
        }

        #dropdown-main li.selected > * {
          background-color: ${a};
          color: var(--dropdownSelectedTextColor, #2c2c2c);
        }

        #dropdown-main li {
          background: ${d};
          list-style: none;
          height: 30px;
          cursor: pointer;
          border-bottom: 0.5px solid ${d};
          border-top: 0.5px solid ${d};
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
          text-align: ${w};
        }
      `]}};r([i({type:Boolean,reflect:!0})],e.prototype,"open",2);r([i({type:Boolean,reflect:!0})],e.prototype,"isDisabled",2);r([i({type:Boolean})],e.prototype,"displayCaret",2);r([i({type:Boolean})],e.prototype,"closeOnSelect",2);r([i({type:Boolean})],e.prototype,"openViaButton",2);r([i({type:Boolean})],e.prototype,"usePopover",2);r([i({type:Boolean})],e.prototype,"includeSelectedOption",2);r([i({type:String})],e.prototype,"selectedOption",2);r([i({attribute:!1})],e.prototype,"options",2);r([i({type:String})],e.prototype,"optionGroup",2);r([i({attribute:!1})],e.prototype,"optionSelected",2);r([i({type:Boolean,reflect:!0})],e.prototype,"isCustomList",2);r([i({type:Boolean,reflect:!0})],e.prototype,"hasCustomClickHandler",2);r([i({type:Boolean,reflect:!0})],e.prototype,"closeOnEscape",2);r([i({type:Boolean,reflect:!0})],e.prototype,"closeOnBackdropClick",2);r([m(".ia-dropdown-group")],e.prototype,"container",2);r([m("#dropdown-main")],e.prototype,"dropdownMenu",2);r([m(".click-main")],e.prototype,"mainButton",2);r([L({slot:"dropdown-label"})],e.prototype,"mainButtonLabelSlotted",2);e=r([x("ia-dropdown"),E()],e);
