import{i as p,n as e,b as i,A as b,D as h,a as v,c as g}from"./index-DMY0PDu2.js";import{t as m}from"./theme-styles-Odf4dARn.js";import"./ia-status-indicator-BykIHNmn.js";import"./localized-decorator-QftRQqQB.js";import"./mediatype-web-Dp-tOnW2.js";var y=Object.defineProperty,f=Object.getOwnPropertyDescriptor,r=(t,n,l,d)=>{for(var a=d>1?void 0:d?f(n,l):n,c=t.length-1,u;c>=0;c--)(u=t[c])&&(a=(d?u(n,l,a):u(a))||a);return d&&a&&y(n,l,a),a};function s(t){return t==null||t===""?b:String(t)}let o=class extends p{constructor(){super(...arguments),this.mode="primary",this.loading=!1,this.disabled=!1,this.loadingText="",this.type="button",this.openLinksNewTab=!1,this.role=null,this.ariaChecked=null,this.ariaDisabled=null,this.ariaHasPopup=null,this.ariaExpanded=null,this.ariaBusy=null,this.description=""}render(){const t=this.href?i`<a
          href=${this.href}
          target=${this.openLinksNewTab?"_blank":"_self"}
          >${this.buttonTemplate}</a
        >`:this.buttonTemplate;return i`${t}${this.descriptionTemplate}<slot
        name="hidden-button"
      ></slot>`}willUpdate(t){t.has("type")&&this.setButtonTypeEmulation()}get buttonTemplate(){return i`<button
      part="button"
      class=${this.mode}
      ?disabled=${this.disabled||this.loading}
      role=${s(this.role)}
      aria-checked=${s(this.ariaChecked)}
      aria-disabled=${s(this.ariaDisabled)}
      aria-haspopup=${s(this.ariaHasPopup)}
      aria-expanded=${s(this.ariaExpanded)}
      aria-busy=${s(this.ariaBusy)}
      aria-describedby=${this.description?"description":b}
    >
      ${this.buttonTextTemplate}
    </button>`}get descriptionTemplate(){return this.description?i`<span id="description" hidden>${this.description}</span>`:b}get buttonTextTemplate(){return this.loading?this.loadingStateTemplate:i`<slot></slot>`}get loadingStateTemplate(){return i`
      <span class="loading-indicator" alt="Loading indicator">
        <ia-status-indicator mode="loading"></ia-status-indicator> ${this.loadingText}
      </span>
    `}setButtonTypeEmulation(){const t=this.querySelector("input.hidden-button");if(t){t.type=this.type;return}this.addHiddenButton(),this.addEventListener("click",this.handleComponentClick)}handleComponentClick(t){if(this.type==="button"||t instanceof CustomEvent&&t.detail.formActionsInProgress)return;this.querySelector("input.hidden-button").dispatchEvent(new PointerEvent("click"))}addHiddenButton(){this.type!=="button"&&h(i`<input
        type=${this.type}
        class="hidden-button"
        style="display:none"
        slot="hidden-button"
        @click=${t=>this.handleFormActions(t)}
      />`,this)}handleFormActions(t){t.stopPropagation(),t.isTrusted&&this.dispatchEvent(new CustomEvent("click",{detail:{formActionsInProgress:!0}}))}static get styles(){return[m,v`
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

          --ia-button-transition--: var(
            --ia-button-transition,
            all 0.1s ease 0s
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

        button {
          font-family: var(--base-font-family--);
          font-size: var(--font-size-standard--);
          height: var(--button-height--);
          min-height: var(--button-height--);
          width: var(--button-width--);
          padding: var(--button-padding--);
          border-width: var(--button-border-width--);
          border-radius: var(--button-border-radius--);
          transition: var(--ia-button-transition--);

          outline-color: currentColor;
          cursor: pointer;
          line-height: normal;
          border-style: solid;
          white-space: nowrap;
          appearance: auto;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          vertical-align: middle;
          outline-offset: -4px;
          user-select: none;
          text-decoration: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          -o-user-select: none;
        }

        a {
          text-decoration: none;
        }

        button:disabled,
        button.disabled {
          cursor: not-allowed;
          color: var(--disabled-cta-text-color--);
          background-color: var(--disabled-cta-fill--);
          border: 1px solid var(--disabled-cta-border--);
          opacity: 0.5;
        }

        button:enabled:hover {
          opacity: 0.9;
        }

        button:focus-visible {
          opacity: 0.8;
          outline-style: double;
        }

        button:active {
          opacity: 0.7;
        }

        button.primary {
          color: var(--primary-cta-text-color--);
          background-color: var(--primary-cta-fill--);
          border-color: var(--primary-cta-border--);
        }

        button.secondary {
          color: var(--secondary-cta-text-color--);
          background-color: var(--secondary-cta-fill--);
          border-color: var(--secondary-cta-border--);
        }

        button.danger {
          color: var(--danger-cta-text-color--);
          background-color: var(--danger-cta-fill--);
          border-color: var(--danger-cta-border--);
        }

        button.warning {
          color: var(--warning-cta-text-color--);
          background-color: var(--warning-cta-fill--);
          border-color: var(--warning-cta-border--);
        }

        button.transparent {
          color: inherit;
          border-width: 0;
          background-color: transparent;
          border-color: transparent;
        }

        button.custom {
          color: var(--ia-button-custom-text-color--);
          background-color: var(--ia-button-custom-fill--);
          border-color: var(--ia-button-custom-border--);
        }

        button.custom:enabled:is(:hover, :focus, :active, .active) {
          color: var(--ia-button-custom-active-text-color--);
          background-color: var(--ia-button-custom-active-fill--);
          border-color: var(--ia-button-custom-active-border--);
        }

        :host(.fit-content) button {
          padding: 0;
          height: fit-content;
        }

        button.link:enabled:hover,
        button.danger-link:enabled:hover {
          text-decoration: underline;
        }

        button.link,
        button.danger-link {
          margin: 0;
          border: 0;
          appearance: none;
          background: none;
          text-decoration: none;
          cursor: pointer;
          padding: 0;
        }

        button.link {
          color: var(--link-color--);
        }

        button.danger-link {
          color: var(--color-danger--);
        }

        .loading-indicator {
          display: flex;
          flex-direction: row;
          gap: 0.5rem;
          align-items: center;
        }

        ia-status-indicator {
          --ia-theme-primary-text-color: currentColor;
        }
      `]}};o.shadowRootOptions={...p.shadowRootOptions,delegatesFocus:!0};r([e({type:String})],o.prototype,"mode",2);r([e({type:Boolean})],o.prototype,"loading",2);r([e({type:Boolean})],o.prototype,"disabled",2);r([e({type:String})],o.prototype,"loadingText",2);r([e({type:String,reflect:!0})],o.prototype,"type",2);r([e({type:String})],o.prototype,"href",2);r([e({type:Boolean})],o.prototype,"openLinksNewTab",2);r([e({attribute:!1})],o.prototype,"role",2);r([e({attribute:!1})],o.prototype,"ariaChecked",2);r([e({attribute:!1})],o.prototype,"ariaDisabled",2);r([e({attribute:!1})],o.prototype,"ariaHasPopup",2);r([e({attribute:!1})],o.prototype,"ariaExpanded",2);r([e({attribute:!1})],o.prototype,"ariaBusy",2);r([e({type:String})],o.prototype,"description",2);o=r([g("ia-button")],o);export{o as IAButton};
