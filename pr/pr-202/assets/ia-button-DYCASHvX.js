import{n as a,c as u,i as h,b as n,A as s,D as v,a as g}from"./index-5YzlOJJz.js";import{o as p}from"./story-template-C7_40t-K.js";import{a as m}from"./theme-styles-Xiv6nUb1.js";import"./ia-status-indicator-DIIOEvnt.js";import"./site-ChfTGo1o.js";/* empty css             */import"./syntax-highlighter-B4HnRPH2.js";import"./localized-decorator-DhODYiop.js";import"./mediatype-web-i7F_nxvG.js";var f=Object.defineProperty,y=Object.getOwnPropertyDescriptor,r=(t,e,l,d)=>{for(var i=d>1?void 0:d?y(e,l):e,c=t.length-1,b;c>=0;c--)(b=t[c])&&(i=(d?b(e,l,i):b(i))||i);return d&&i&&f(e,l,i),i};let o=class extends h{constructor(){super(...arguments),this.mode="primary",this.size="md",this.loading=!1,this.disabled=!1,this.loadingText="",this.type="button",this.openLinksNewTab=!1,this.handleInactiveClick=t=>{this.inactive&&(t.preventDefault(),t.stopPropagation())}}render(){return n`${this.href?this.linkTemplate:this.buttonTemplate}<slot
        name="hidden-button"
      ></slot>`}willUpdate(t){t.has("type")&&this.setButtonTypeEmulation();const e=this.querySelector("input.hidden-button");e&&(e.disabled=this.inactive)}get inactive(){return this.disabled||this.loading}get classes(){return["button",this.mode==="transparent"?"ghost":this.mode,`size-${this.size}`,this.disabled?"is-disabled":"",this.loading?"is-loading":""].filter(Boolean).join(" ")}get buttonTemplate(){return n`<button
      part="button"
      class=${this.classes}
      aria-disabled=${this.inactive?"true":s}
      aria-busy=${this.loading?"true":s}
      @click=${this.handleInactiveClick}
    >
      ${this.contentTemplate}
    </button>`}get linkTemplate(){return n`<a
      part="button"
      class=${this.classes}
      href=${this.href??""}
      target=${this.openLinksNewTab?"_blank":"_self"}
      rel=${p(this.openLinksNewTab?"noopener":void 0)}
      aria-disabled=${this.inactive?"true":s}
      aria-busy=${this.loading?"true":s}
      @click=${this.handleInactiveClick}
      >${this.contentTemplate}</a
    >`}get contentTemplate(){return n`
      <span class="label"><slot></slot></span>
      ${this.loading?this.loadingStateTemplate:s}
    `}get loadingStateTemplate(){return n`
      <span class="loading-indicator">
        <ia-status-indicator mode="loading"></ia-status-indicator>
        ${this.loadingText}
      </span>
    `}setButtonTypeEmulation(){const t=this.querySelector("input.hidden-button");if(t){t.type=this.type;return}this.addHiddenButton(),this.addEventListener("click",this.handleComponentClick)}handleComponentClick(t){if(this.type==="button"||this.inactive||t instanceof CustomEvent&&t.detail.formActionsInProgress)return;this.querySelector("input.hidden-button").dispatchEvent(new PointerEvent("click"))}addHiddenButton(){this.type!=="button"&&v(n`<input
        type=${this.type}
        class="hidden-button"
        style="display:none"
        slot="hidden-button"
        @click=${t=>this.handleFormActions(t)}
      />`,this)}handleFormActions(t){t.stopPropagation(),t.isTrusted&&this.dispatchEvent(new CustomEvent("click",{detail:{formActionsInProgress:!0}}))}static get styles(){return[m,g`
        :host {
          --primary-cta-text-color--: var(--primary-cta-text-color);
          --primary-cta-fill--: var(--primary-cta-fill);
          --primary-cta-border--: var(--primary-cta-border);

          --secondary-cta-text-color--: var(--secondary-cta-text-color);
          --secondary-cta-fill--: var(--secondary-cta-fill);
          --secondary-cta-border--: var(--secondary-cta-border);

          --danger-cta-text-color--: var(--danger-cta-text-color);
          --danger-cta-fill--: var(--danger-cta-fill);
          --danger-cta-border--: var(--danger-cta-border);

          --warning-cta-text-color--: var(--warning-cta-text-color);
          --warning-cta-fill--: var(--warning-cta-fill);
          --warning-cta-border--: var(--warning-cta-border);

          --donate-cta-text-color--: var(--donate-cta-text-color);
          --donate-cta-fill--: var(--donate-cta-fill);
          --donate-cta-border--: var(--donate-cta-border);

          --disabled-cta-text-color--: var(--disabled-cta-text-color);
          --disabled-cta-fill--: var(--disabled-cta-fill);
          --disabled-cta-border--: var(--disabled-cta-border);

          --link-color--: var(--link-color);
          --color-danger--: var(--color-danger);

          --button-padding--: var(--button-padding);
          --button-width--: var(--button-width);
          --button-height--: var(--button-height);
          --button-border-width--: var(--button-border-width);
          --button-border-radius--: var(--button-border-radius);
          --base-font-family--: var(--base-font-family);
          --font-size-standard--: var(--font-size-standard);

          /* Hover snaps (D-54); only the press moves. */
          --ia-button-transition--: var(
            --ia-button-transition,
            transform var(--ia-motion-duration-instant--)
              var(--ia-motion-easing-standard--)
          );

          --ia-button-custom-text-color--: var(
            --ia-button-custom-text-color,
            var(--primary-cta-text-color--)
          );
          --ia-button-custom-fill--: var(
            --ia-button-custom-fill,
            var(--primary-cta-fill--)
          );
          --ia-button-custom-border--: var(
            --ia-button-custom-border,
            var(--primary-cta-border--)
          );
          --ia-button-custom-active-text-color--: var(
            --ia-button-custom-active-text-color,
            var(--ia-button-custom-text-color--)
          );
          --ia-button-custom-active-fill--: var(
            --ia-button-custom-active-fill,
            var(--ia-button-custom-fill--)
          );
          --ia-button-custom-active-border--: var(
            --ia-button-custom-active-border,
            var(--ia-button-custom-border--)
          );

          display: inline-block; /* keeps host sized to button */
        }

        .button {
          --_height: var(--button-height--);
          --_padding: var(--button-padding--);
          --_font-size: var(--font-size-standard--);
          --_press: var(--ia-motion-press-scale-default--);

          /* The label and the loading indicator share one cell, so the
             button is as wide as the wider of the two. */
          display: inline-grid;
          grid-template-areas: 'stack';
          place-items: center;
          box-sizing: border-box;
          width: var(--button-width--);
          max-width: 100%;
          /* A minimum, not a height: a label longer than its container wraps
             inside the button instead of overflowing it (D-51). */
          min-height: var(--_height);
          margin: 0;
          padding: var(--_padding);
          border: var(--button-border-width--) solid transparent;
          border-radius: var(--button-border-radius--);
          background: none;
          color: inherit;

          font-family: var(--base-font-family--);
          font-size: var(--_font-size);
          font-weight: var(--ia-font-weight-regular--);
          line-height: var(--ia-font-line-height-tight--);
          text-align: center;
          text-decoration: none;
          /* break-word, not anywhere: anywhere also shrinks the host's
             min-content width, so a host in a tight flex row would break
             its label letter by letter. */
          overflow-wrap: break-word;
          text-wrap: balance;

          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
          transition: var(--ia-button-transition--);
        }

        .size-sm {
          --_height: var(--ia-size-control-sm--);
          --_padding: 0 var(--ia-space-4--);
        }

        .size-lg {
          --_height: var(--ia-size-control-lg--);
          --_padding: 0 var(--ia-space-6--);
          --_font-size: var(--ia-font-size-lg--);
        }

        /* Every size is at least 44px tall to a finger. */
        @media (pointer: coarse) {
          .button {
            min-height: max(var(--_height), var(--ia-size-target-min--));
          }
        }

        .label,
        .loading-indicator {
          grid-area: stack;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--ia-space-1--);
        }

        .is-loading .label {
          visibility: hidden;
        }

        .button:focus-visible {
          outline: var(--ia-size-focus-ring--) solid
            var(--ia-color-border-focus--);
          outline-offset: var(--ia-size-focus-ring-offset--);
        }

        .primary {
          color: var(--primary-cta-text-color--);
          background-color: var(--primary-cta-fill--);
          border-color: var(--primary-cta-border--);
        }

        /* Light, so it never outweighs the primary (D-52); the shadow is what
           sets it apart from ghost, which sits flat. */
        .secondary {
          color: var(--secondary-cta-text-color--);
          background-color: var(--secondary-cta-fill--);
          border-color: var(--secondary-cta-border--);
          box-shadow: var(--ia-shadow-raised--);
        }

        .danger {
          color: var(--danger-cta-text-color--);
          background-color: var(--danger-cta-fill--);
          border-color: var(--danger-cta-border--);
        }

        .warning {
          color: var(--warning-cta-text-color--);
          background-color: var(--warning-cta-fill--);
          border-color: var(--warning-cta-border--);
        }

        .donate {
          color: var(--donate-cta-text-color--);
          background-color: var(--donate-cta-fill--);
          border-color: var(--donate-cta-border--);
        }

        /* No boundary: the label or icon identifies it (D-55). */
        .ghost {
          border-width: 0;
        }

        .custom {
          color: var(--ia-button-custom-text-color--);
          background-color: var(--ia-button-custom-fill--);
          border-color: var(--ia-button-custom-border--);
        }

        .custom:not([aria-disabled='true']):is(
            :hover,
            :focus-visible,
            :active,
            .active
          ) {
          color: var(--ia-button-custom-active-text-color--);
          background-color: var(--ia-button-custom-active-fill--);
          border-color: var(--ia-button-custom-active-border--);
        }

        .link,
        .danger-link {
          --_height: var(--ia-size-control-sm--);
          --_padding: 0;
          border-width: 0;
        }

        .link {
          color: var(--link-color--);
        }

        .danger-link {
          color: var(--color-danger--);
        }

        :host(.fit-content) .button {
          padding: 0;
          min-height: fit-content;
        }

        /* Hover darkens a filled button a step and lays the overlay on a light
           one, instantly. */
        .primary:hover,
        .danger:hover,
        .donate:hover {
          filter: brightness(0.88);
        }

        .warning:hover {
          filter: brightness(0.94);
        }

        .secondary:hover,
        .ghost:hover {
          background-image: linear-gradient(
            var(--ia-color-hover-overlay--),
            var(--ia-color-hover-overlay--)
          );
        }

        .link:hover,
        .danger-link:hover {
          text-decoration: underline;
        }

        /* Press: darker again, and a squeeze sized so the edge travels about
           1.5px. Links don't move. */
        .button:active {
          filter: brightness(0.8);
          transform: scale(var(--_press));
        }

        .link:active,
        .danger-link:active,
        .custom:active {
          filter: none;
          transform: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .button:active {
            transform: none;
          }
        }

        /* Disabled takes the disabled colors; the label stays legible. The
           disabled mode is the same look on a button that still works. */
        .is-disabled,
        .disabled {
          color: var(--disabled-cta-text-color--);
          background-color: var(--disabled-cta-fill--);
          border-color: var(--disabled-cta-border--);
          box-shadow: none;
        }

        .is-disabled:is(.link, .danger-link, .ghost) {
          color: var(--ia-color-text-disabled--);
          background: none;
        }

        /* Last, so no hover or press shows on a button that won't act. */
        .button[aria-disabled='true'] {
          cursor: not-allowed;
          filter: none;
          transform: none;
          background-image: none;
          text-decoration: none;
        }

        .is-loading {
          cursor: progress;
        }

        ia-status-indicator {
          --ia-theme-primary-text-color: currentColor;
        }
      `]}};r([a({type:String})],o.prototype,"mode",2);r([a({type:String})],o.prototype,"size",2);r([a({type:Boolean})],o.prototype,"loading",2);r([a({type:Boolean})],o.prototype,"disabled",2);r([a({type:String})],o.prototype,"loadingText",2);r([a({type:String,reflect:!0})],o.prototype,"type",2);r([a({type:String})],o.prototype,"href",2);r([a({type:Boolean})],o.prototype,"openLinksNewTab",2);o=r([u("ia-button")],o);export{o as IAButton};
