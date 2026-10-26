import{f,w as m,n as s,e as w,c as B,i as y,b as a,a as p}from"./index-BR9wC2Jw.js";import{n as h}from"./story-template-Ch5zTXQN.js";import{t as $}from"./theme-styles-8hBu5-zb.js";function x(o){return(e,c)=>{const{slot:n,selector:i}=o??{},d="slot"+(n?`[name=${n}]`:":not([name])");return f(e,c,{get(){const l=this.renderRoot?.querySelector(d),u=l?.assignedElements(o)??[];return i===void 0?u:u.filter(v=>v.matches(i))}})}}const k=m`
<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>
`,C=m`
<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>
`;var O=Object.defineProperty,T=Object.getOwnPropertyDescriptor,r=(o,e,c,n)=>{for(var i=n>1?void 0:n?T(e,c):e,d=o.length-1,l;d>=0;d--)(l=o[d])&&(i=(n?l(e,c,i):l(i))||i);return n&&i&&O(e,c,i),i};let t=class extends y{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionGroup="options",this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=o=>{switch(o.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=o=>{o&&o.type==="click"&&o.stopPropagation(),this.open=!1,this.updatePopoverState()}}async firstUpdated(){await new Promise(o=>{setTimeout(o,0)}),this.addEventListener("closeDropdown",this.closeOptions)}willUpdate(o){o.has("open")&&this.updatePopoverState()}disconnectedCallback(){super.disconnectedCallback?.(),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){this.usePopover&&(this.dropdownMenu?.togglePopover?.(this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;const o=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${o.left}px`,this.dropdownMenu.style.top=`${o.bottom}px`,this.dropdownMenu.style.minWidth=`${o.width}px`}mainButtonClicked(){this.openViaButton?this.toggleOptions():this.mainButtonLabelSlotted[0]?.click()}mainButtonKeyDown(o){(o.key==="Enter"||o.key===" ")&&(this.mainButtonClicked(),o.preventDefault())}caretKeyDown(o){(o.key==="Enter"||o.key===" ")&&(this.toggleOptions(),o.preventDefault())}renderOption(o){const{url:e=void 0,id:c}=o;let n;const i=this.selectedOption===c?"selected":"",d=typeof o.label=="string"?a`<span>${o.label}</span>`:o.label;return e?n=a`<a
        href=${e}
        @click=${l=>this.optionClicked(l,o)}
        >${d}</a
      >`:n=a`<button
        @click=${l=>this.optionClicked(l,o)}
      >
        ${d}
      </button>`,a`<li role="menuitem" class=${i}>${n}</li>`}optionClicked(o,e){o.stopPropagation(),this.selectedOption!==e.id&&(this.selectedOption=e.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:e}})),e.selectedHandler?.(e)),this.closeOnSelect&&(this.closeOptions(),this.mainButton.focus())}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(o=>this.selectedOption!==o.id)}get caretUpTemplate(){return a`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${k}</slot>
      </span>
    `}get caretDownTemplate(){return a`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${C}</slot>
      </span>
    `}get caretTemplate(){return this.displayCaret?this.openViaButton?a`
        <span class="caret" aria-hidden="true">
          ${this.caretUpTemplate} ${this.caretDownTemplate}
        </span>
      `:a`
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
    `:a``}get dropdownTemplate(){return this.isCustomList?a`<slot name="list"></slot>`:a`${this.availableOptions.map(o=>this.renderOption(o))}`}get backdropTemplate(){return this.closeOnBackdropClick?this.open?a`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `:a``:a``}get shouldNestCaretInButton(){return this.openViaButton}get shouldAttachEventHandlers(){return!this.isDisabled&&!this.hasCustomClickHandler}render(){return a`
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
    `}static get styles(){const o=p`var(--dropdownBorderWidth, 1px)`,e=p`var(--dropdownBorderRadius, var(--ia-radius-default--))`,c=p`var(--dropdownBorderColor, var(--ia-color-border-inverse--))`,n=p`var(--dropdownBgColor, var(--ia-color-surface-inverse--))`,i=p`var(--dropdownTextColor, var(--ia-color-text-inverse--))`,d=p`var(--dropdownHoverBgColor, var(--ia-color-hover-overlay-inverse--))`,l=p`var(--dropdownSelectedBgColor, var(--ia-color-selected-soft-fill-inverse--))`,u=p`var(--dropdownMainButtonBgColor, transparent)`,v=p`var(--dropdownTextAlign, inherit)`,b=p`var(--dropdownBackdropZIndex, 1)`,g=p`var(--dropdownListZIndex, 2)`;return[$,p`
        :host {
          display: inline;
          color: ${i};
        }

        svg.caret-up-svg,
        svg.caret-down-svg,
        ::slotted(svg.caret-up-svg),
        ::slotted(svg.caret-down-svg) {
          fill: var(--dropdownCaretColor, var(--ia-color-text-inverse--));
          vertical-align: middle;
        }

        .button-row {
          display: flex;
          height: 100%;
        }

        button.click-main {
          background: ${u};
          color: inherit;
          /* Room for the focus ring, which is drawn inside the edge. */
          padding: var(--dropdownMainButtonPadding, 0 var(--ia-space-1--));
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

        /* The trigger usually sits on a light surface; a host on a dark one
           sets --dropdownFocusRingColor to the dark-surface focus color. The
           ring is inside the trigger's edge, so it lines up with the panel
           that opens under it. */
        button.click-main:focus-visible {
          outline: var(--ia-size-focus-ring--) solid
            var(--dropdownFocusRingColor, var(--ia-color-border-focus--));
          outline-offset: calc(-1 * var(--ia-size-focus-ring--));
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
          z-index: ${b};
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
          color: ${i};
          background: ${n};

          font-size: var(--dropdownFontSize, var(--ia-font-size-md--));

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
              ${e}
            )
            var(--dropdownBorderTopRightRadius, ${e})
            var(--dropdownBorderBottomRightRadius, ${e})
            var(--dropdownBorderBottomLeftRadius, ${e});

          /* One line per option, as the search bar's picker has it: the panel
             grows to its longest option instead of wrapping out of the row. */
          white-space: var(--dropdownWhiteSpace, nowrap);

          /* Prevent top/bottom inner li from overlapping inner border */
          overflow: hidden;
        }

        #dropdown-main li:hover {
          background-color: ${d};
          color: var(--dropdownHoverTextColor, var(--ia-color-text-inverse--));
          list-style: none;
          cursor: pointer;
        }

        #dropdown-main li:hover:first-child {
          border-top-color: ${d};
        }

        ul#dropdown-main li:hover:last-child {
          border-bottom-color: ${d};
        }

        #dropdown-main li:hover:not(:first-child) {
          border-top: 0.5px solid
            var(
              --dropdownHoverTopBottomBorderColor,
              var(--ia-color-surface-inverse--)
            );
        }
        #dropdown-main li:hover:not(:last-child) {
          border-bottom: 0.5px solid
            var(
              --dropdownHoverTopBottomBorderColor,
              var(--ia-color-surface-inverse--)
            );
        }

        #dropdown-main li.selected:last-child {
          border-bottom-color: ${l};
        }

        #dropdown-main li.selected:first-child {
          border-top-color: ${l};
        }

        #dropdown-main li:hover > *,
        #dropdown-main li:focus-within > * {
          background-color: ${d};
          color: var(--dropdownHoverTextColor, var(--ia-color-text-inverse--));
        }

        #dropdown-main li.selected > * {
          background-color: ${l};
          color: var(
            --dropdownSelectedTextColor,
            var(--ia-color-text-inverse--)
          );
        }

        #dropdown-main li {
          background: ${n};
          list-style: none;
          height: 30px;
          cursor: pointer;
          border-bottom: 0.5px solid ${n};
          border-top: 0.5px solid ${n};
        }

        #dropdown-main li button {
          background: none;
          color: inherit;
          border: none;
          font: inherit;
          cursor: pointer;
          outline: inherit;
        }

        /* An option's focus: the dark-surface ring, inside the row. */
        #dropdown-main li > *:focus-visible {
          outline: var(--ia-size-focus-ring--) solid
            var(--ia-color-border-focus-inverse--);
          outline-offset: calc(-1 * var(--ia-size-focus-ring--));
        }

        #dropdown-main li a {
          text-decoration: none;
          display: block;
          box-sizing: border-box;
        }

        #dropdown-main li:first-child {
          border-top-left-radius: var(
            --dropdownBorderTopLeftRadius,
            var(--ia-radius-default--)
          );
          border-top-right-radius: var(
            --dropdownBorderTopRightRadius,
            var(--ia-radius-default--)
          );
        }

        #dropdown-main li:last-child {
          border-bottom-right-radius: var(
            --dropdownBorderBottomRightRadius,
            var(--ia-radius-default--)
          );
          border-bottom-left-radius: var(
            --dropdownBorderBottomLeftRadius,
            var(--ia-radius-default--)
          );
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
          color: ${i};
          background: var(--dropdownItemButtonBgColor, transparent);
          padding: var(--dropdownItemButtonPadding, 0 var(--ia-space-2--));
          text-align: ${v};
        }
      `]}};r([s({type:Boolean,reflect:!0})],t.prototype,"open",2);r([s({type:Boolean,reflect:!0})],t.prototype,"isDisabled",2);r([s({type:Boolean})],t.prototype,"displayCaret",2);r([s({type:Boolean})],t.prototype,"closeOnSelect",2);r([s({type:Boolean})],t.prototype,"openViaButton",2);r([s({type:Boolean})],t.prototype,"usePopover",2);r([s({type:Boolean})],t.prototype,"includeSelectedOption",2);r([s({type:String})],t.prototype,"selectedOption",2);r([s({attribute:!1})],t.prototype,"options",2);r([s({type:String})],t.prototype,"optionGroup",2);r([s({attribute:!1})],t.prototype,"optionSelected",2);r([s({type:Boolean,reflect:!0})],t.prototype,"isCustomList",2);r([s({type:Boolean,reflect:!0})],t.prototype,"hasCustomClickHandler",2);r([s({type:Boolean,reflect:!0})],t.prototype,"closeOnEscape",2);r([s({type:Boolean,reflect:!0})],t.prototype,"closeOnBackdropClick",2);r([w(".ia-dropdown-group")],t.prototype,"container",2);r([w("#dropdown-main")],t.prototype,"dropdownMenu",2);r([w(".click-main")],t.prototype,"mainButton",2);r([x({slot:"dropdown-label"})],t.prototype,"mainButtonLabelSlotted",2);t=r([B("ia-dropdown")],t);
