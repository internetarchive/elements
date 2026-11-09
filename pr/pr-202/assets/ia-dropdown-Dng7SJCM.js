import{w as b,n as i,e as v,c as B,i as y,b as n,A as x,m,s as $,a as s}from"./index-CaZ0-YVs.js";import{o as k}from"./query-assigned-elements-Cc_KiFvM.js";import{n as u}from"./story-template-zZByH8st.js";import{l as C}from"./localized-decorator-Dk0vlWef.js";import{a as T}from"./theme-styles-LCTmTYly.js";const O=b`
<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>
`,P=b`
<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>
`;var S=Object.defineProperty,L=Object.getOwnPropertyDescriptor,e=(o,r,c,d)=>{for(var a=d>1?void 0:d?L(r,c):r,p=o.length-1,l;p>=0;p--)(l=o[p])&&(a=(d?l(r,c,a):l(a))||a);return d&&a&&S(r,c,a),a};let t=class extends y{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=o=>{switch(o.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=o=>{o&&o.type==="click"&&o.stopPropagation(),this.open=!1,this.updatePopoverState()}}async firstUpdated(){await new Promise(o=>{setTimeout(o,0)}),this.addEventListener("closeDropdown",this.closeOptions)}willUpdate(o){o.has("open")&&this.updatePopoverState()}disconnectedCallback(){super.disconnectedCallback?.(),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){this.usePopover&&(this.dropdownMenu?.togglePopover?.(this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;const o=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${o.left}px`,this.dropdownMenu.style.top=`${o.bottom}px`,this.dropdownMenu.style.minWidth=`${o.width}px`}mainButtonClicked(){this.openViaButton?this.toggleOptions():this.mainButtonLabelSlotted[0]?.click()}mainButtonKeyDown(o){(o.key==="Enter"||o.key===" ")&&(this.mainButtonClicked(),o.preventDefault())}caretKeyDown(o){(o.key==="Enter"||o.key===" ")&&(this.toggleOptions(),o.preventDefault())}renderOption(o){const{url:r=void 0,id:c}=o;let d;const a=this.selectedOption===c?"selected":"",p=typeof o.label=="string",l=p?n`<span class="option-text">${o.label}</span>`:o.label,h=p?"text-option":x;return r?d=n`<a
        href=${r}
        class=${h}
        @click=${w=>this.optionClicked(w,o)}
        >${l}</a
      >`:d=n`<button
        class=${h}
        @click=${w=>this.optionClicked(w,o)}
      >
        ${l}
      </button>`,n`<li role="menuitem" class=${a}>${d}</li>`}optionClicked(o,r){o.stopPropagation(),this.selectedOption!==r.id&&(this.selectedOption=r.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:r}})),r.selectedHandler?.(r)),this.closeOnSelect&&(this.closeOptions(),this.mainButton.focus())}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(o=>this.selectedOption!==o.id)}get caretUpTemplate(){return n`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${O}</slot>
      </span>
    `}get caretDownTemplate(){return n`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${P}</slot>
      </span>
    `}get caretTemplate(){return this.displayCaret?this.openViaButton?n`
        <span class="caret" aria-hidden="true">
          ${this.caretUpTemplate} ${this.caretDownTemplate}
        </span>
      `:n`
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
    `:n``}get dropdownTemplate(){return this.isCustomList?n`<slot name="list"></slot>`:n`${this.availableOptions.map(o=>this.renderOption(o))}`}get backdropTemplate(){return this.closeOnBackdropClick?this.open?n`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `:n``:n``}get shouldNestCaretInButton(){return this.openViaButton}get shouldAttachEventHandlers(){return!this.isDisabled&&!this.hasCustomClickHandler}get toggleLabel(){return this.optionGroup?m($`Toggle ${this.optionGroup}`):m("Toggle options")}render(){return n`
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
    `}static get styles(){const o=s`var(--dropdownBorderWidth, 1px)`,r=s`var(--dropdownBorderRadius, var(--ia-radius-default--))`,c=s`var(--dropdownBorderColor, var(--ia-color-border-inverse--))`,d=s`var(--dropdownBgColor, var(--ia-color-surface-inverse--))`,a=s`var(--dropdownTextColor, var(--ia-color-text-inverse--))`,p=s`var(--dropdownHoverBgColor, var(--ia-color-hover-overlay-inverse--))`,l=s`var(--dropdownSelectedBgColor, var(--ia-color-selected-soft-overlay-inverse--))`,h=s`var(--dropdownMainButtonBgColor, transparent)`,w=s`var(--dropdownTextAlign, inherit)`,f=s`var(--dropdownBackdropZIndex, 1)`,g=s`var(--dropdownListZIndex, 2)`;return[T,s`
        :host {
          display: inline;
          color: ${a};
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

        /* The ring defaults to the dark-surface focus color, since the
           trigger's own defaults (white text and caret) assume a dark host. A
           host on a light surface sets --dropdownFocusRingColor to
           --ia-color-border-focus. The ring is inside the trigger's edge, so
           it lines up with the panel that opens under it, and carries its band.
           The band follows the ring, so a host that sets
           --dropdownFocusRingColor sets --dropdownFocusBand with it. */
        button.click-main:focus-visible {
          outline: var(--ia-size-focus-ring--) solid
            var(
              --dropdownFocusRingColor,
              var(--ia-color-border-focus-inverse--)
            );
          outline-offset: calc(-1 * var(--ia-size-focus-ring--));
          box-shadow: var(
            --dropdownFocusBand,
            var(--ia-shadow-focus-band-inverse--)
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
          z-index: ${f};
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
          color: ${a};
          background: ${d};

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
              ${r}
            )
            var(--dropdownBorderTopRightRadius, ${r})
            var(--dropdownBorderBottomRightRadius, ${r})
            var(--dropdownBorderBottomLeftRadius, ${r});

          /* One line per option, as the search bar's picker has it: the panel
             grows to its longest option instead of wrapping out of the row. */
          white-space: var(--dropdownWhiteSpace, nowrap);

          /* Prevent top/bottom inner li from overlapping inner border */
          overflow: hidden;
        }

        #dropdown-main li:hover {
          background-color: ${p};
          color: var(--dropdownHoverTextColor, var(--ia-color-text-inverse--));
          list-style: none;
          cursor: pointer;
        }

        #dropdown-main li:hover:first-child {
          border-top-color: ${p};
        }

        ul#dropdown-main li:hover:last-child {
          border-bottom-color: ${p};
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
          background-color: ${p};
          color: var(--dropdownHoverTextColor, var(--ia-color-text-inverse--));
        }

        #dropdown-main li.selected > * {
          background-color: ${l};
          color: var(--dropdownSelectedTextColor, ${a});
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

        /* An option's focus: the trigger's ring, inside the row, with its
           band, so it shows on any row fill. On the selected #666 row the
           ring alone is 2.58:1. A host on a light panel sets the same two
           hooks as for the trigger. */
        #dropdown-main li > *:focus-visible {
          outline: var(--ia-size-focus-ring--) solid
            var(
              --dropdownFocusRingColor,
              var(--ia-color-border-focus-inverse--)
            );
          outline-offset: calc(-1 * var(--ia-size-focus-ring--));
          box-shadow: var(
            --dropdownFocusBand,
            var(--ia-shadow-focus-band-inverse--)
          );
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
          /* The option's whole inset: 20px at the sides, from this padding
             alone, so an override of --dropdownItemPadding* is exact. */
          padding: var(--dropdownItemPaddingTop, 5px)
            var(--dropdownItemPaddingRight, var(--ia-space-4--))
            var(--dropdownItemPaddingBottom, 5px)
            var(--dropdownItemPaddingLeft, var(--ia-space-4--));
          box-sizing: border-box;
        }

        #dropdown-main li > * {
          width: 100%;
          height: inherit;
          color: ${a};
          background: var(--dropdownItemButtonBgColor, transparent);
          padding: var(--dropdownItemButtonPadding, 0);
          text-align: ${w};
        }

        /* A plain-text option's inset is its text's alone. A host's
           --dropdownItemButtonPadding sets it, as it did when the text had
           no element of its own; otherwise the option padding applies. */
        #dropdown-main li > .text-option {
          padding: 0;
        }

        #dropdown-main li > * > .option-text {
          padding: var(
            --dropdownItemButtonPadding,
            var(--dropdownItemPaddingTop, 5px)
              var(--dropdownItemPaddingRight, var(--ia-space-4--))
              var(--dropdownItemPaddingBottom, 5px)
              var(--dropdownItemPaddingLeft, var(--ia-space-4--))
          );
        }
      `]}};e([i({type:Boolean,reflect:!0})],t.prototype,"open",2);e([i({type:Boolean,reflect:!0})],t.prototype,"isDisabled",2);e([i({type:Boolean})],t.prototype,"displayCaret",2);e([i({type:Boolean})],t.prototype,"closeOnSelect",2);e([i({type:Boolean})],t.prototype,"openViaButton",2);e([i({type:Boolean})],t.prototype,"usePopover",2);e([i({type:Boolean})],t.prototype,"includeSelectedOption",2);e([i({type:String})],t.prototype,"selectedOption",2);e([i({attribute:!1})],t.prototype,"options",2);e([i({type:String})],t.prototype,"optionGroup",2);e([i({attribute:!1})],t.prototype,"optionSelected",2);e([i({type:Boolean,reflect:!0})],t.prototype,"isCustomList",2);e([i({type:Boolean,reflect:!0})],t.prototype,"hasCustomClickHandler",2);e([i({type:Boolean,reflect:!0})],t.prototype,"closeOnEscape",2);e([i({type:Boolean,reflect:!0})],t.prototype,"closeOnBackdropClick",2);e([v(".ia-dropdown-group")],t.prototype,"container",2);e([v("#dropdown-main")],t.prototype,"dropdownMenu",2);e([v(".click-main")],t.prototype,"mainButton",2);e([k({slot:"dropdown-label"})],t.prototype,"mainButtonLabelSlotted",2);t=e([B("ia-dropdown"),C()],t);
