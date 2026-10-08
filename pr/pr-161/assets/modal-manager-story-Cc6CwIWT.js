import{m as _,b as r,n as I,c as O,i as z,A as N,a as n,e as c}from"./index-DhK1Cyjw.js";import{l as W}from"./localized-decorator-Cw_ipv6K.js";import"./icon-close-09EQp3KL.js";import"./ia-status-indicator-DGAwdr3Y.js";import"./story-template-CfUZcstk.js";import"./masked-icon-CwiR2WE5.js";class p{constructor(t){this.title=t?.title,this.subtitle=t?.subtitle,this.headline=t?.headline,this.message=t?.message,this.headerColor=t?.headerColor??"#55A183",this.bodyColor=t?.bodyColor??"#fbfbfd",this.showProcessingIndicator=t?.showProcessingIndicator??!1,this.processingImageMode=t?.processingImageMode??"complete",this.showCloseButton=t?.showCloseButton??!0,this.showLeftNavButton=t?.showLeftNavButton??!1,this.leftNavButtonText=t?.leftNavButtonText??"",this.showHeaderLogo=t?.showHeaderLogo??!0,this.closeOnBackdropClick=t?.closeOnBackdropClick??!0}}function*A(e=document.activeElement){e!=null&&(yield e,"shadowRoot"in e&&e.shadowRoot&&e.shadowRoot.mode!=="closed"&&(yield*A(e.shadowRoot.activeElement)))}function V(){return[...A()].pop()}const R=new WeakMap;function Z(e){let t=R.get(e);return t||(t=window.getComputedStyle(e,null),R.set(e,t)),t}function j(e){if("checkVisibility"in e&&typeof e.checkVisibility=="function")return e.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const t=Z(e);return t.visibility!=="hidden"&&t.display!=="none"}function K(e){const t=Z(e),{overflowY:s,overflowX:a}=t;return s==="scroll"||a==="scroll"?!0:s!=="auto"||a!=="auto"?!1:e.scrollHeight>e.clientHeight&&s==="auto"||e.scrollWidth>e.clientWidth&&a==="auto"}function X(e){const t=e.tagName.toLowerCase(),s=Number(e.getAttribute("tabindex"));return e.hasAttribute("tabindex")&&(isNaN(s)||s<=-1)||e.hasAttribute("disabled")||e.closest("[inert]")||t==="input"&&e.getAttribute("type")==="radio"&&!e.hasAttribute("checked")||!j(e)?!1:(t==="audio"||t==="video")&&e.hasAttribute("controls")||e.hasAttribute("tabindex")||e.hasAttribute("contenteditable")&&e.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(t)?!0:K(e)}function Y(e,t){return e.getRootNode({composed:!0})?.host!==t}function H(e){const t=new WeakMap,s=[];function a(o){if(o instanceof Element){if(o.hasAttribute("inert")||o.closest("[inert]")||t.has(o))return;t.set(o,!0),!s.includes(o)&&X(o)&&s.push(o),o instanceof HTMLSlotElement&&Y(o,e)&&o.assignedElements({flatten:!0}).forEach(i=>{a(i)}),o.shadowRoot!==null&&o.shadowRoot.mode==="open"&&a(o.shadowRoot)}for(const i of Array.from(o.children))a(i)}return a(e),s.sort((o,i)=>{const l=Number(o.getAttribute("tabindex"))||0;return(Number(i.getAttribute("tabindex"))||0)-l})}let y=[];class q{constructor(t){this.isExternalActivated=!1,this.tabDirection="forward",this.currentFocus=null,this.previousFocus=null,this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=s=>{if(s.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const a=V();if(this.previousFocus=a,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;s.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const o=H(this.element);let i=o.findIndex(u=>u===a);this.previousFocus=this.currentFocus;const l=this.tabDirection==="forward"?1:-1;for(;;){i+l>=o.length?i=0:i+l<0?i=o.length-1:i+=l,this.previousFocus=this.currentFocus;const u=o[i];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||u&&this.possiblyHasTabbableChildren(u))return;s.preventDefault(),this.currentFocus=u,this.currentFocus?.focus({preventScroll:!1});const m=[...A()];if(m.includes(this.currentFocus)||!m.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=t,this.elementsWithTabbableControls=["iframe"]}activate(){y.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){y=y.filter(t=>t!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return y[y.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const t=H(this.element);if(!this.element.matches(":focus-within")){const s=t[0],a=t[t.length-1],o=this.tabDirection==="forward"?s:a;typeof o?.focus=="function"&&(this.currentFocus=o,o.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(t){return this.elementsWithTabbableControls.includes(t.tagName.toLowerCase())||t.hasAttribute("controls")}}function G(){return r`
    <svg
      class="ia-logo"
      viewBox="0 0 27 30"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="logoTitleID logoDescID"
    >
      <title id="logoTitleID">${_("Internet Archive logo")}</title>
      <desc id="logoDescID">
        ${_("A line drawing of the Internet Archive headquarters building façade.")}
      </desc>
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <mask id="mask-2" class="fill-color">
          <path
            d="M26.6666667,28.6046512 L26.6666667,30 L0,30 L0.000283687943,28.6046512 L26.6666667,28.6046512 Z M25.6140351,26.5116279 L25.6140351,28.255814 L1.05263158,28.255814 L1.05263158,26.5116279 L25.6140351,26.5116279 Z M3.62469203,7.6744186 L3.91746909,7.82153285 L4.0639977,10.1739544 L4.21052632,13.9963932 L4.21052632,17.6725617 L4.0639977,22.255044 L4.03962296,25.3421929 L3.62469203,25.4651163 L2.16024641,25.4651163 L1.72094074,25.3421929 L1.55031755,22.255044 L1.40350877,17.6970339 L1.40350877,14.0211467 L1.55031755,10.1739544 L1.68423854,7.80887484 L1.98962322,7.6744186 L3.62469203,7.6744186 Z M24.6774869,7.6744186 L24.9706026,7.82153285 L25.1168803,10.1739544 L25.2631579,13.9963932 L25.2631579,17.6725617 L25.1168803,22.255044 L25.0927809,25.3421929 L24.6774869,25.4651163 L23.2130291,25.4651163 L22.7736357,25.3421929 L22.602418,22.255044 L22.4561404,17.6970339 L22.4561404,14.0211467 L22.602418,10.1739544 L22.7369262,7.80887484 L23.0420916,7.6744186 L24.6774869,7.6744186 Z M9.94042303,7.6744186 L10.2332293,7.82153285 L10.3797725,10.1739544 L10.5263158,13.9963932 L10.5263158,17.6725617 L10.3797725,22.255044 L10.3556756,25.3421929 L9.94042303,25.4651163 L8.47583122,25.4651163 L8.0362015,25.3421929 L7.86556129,22.255044 L7.71929825,17.6970339 L7.71929825,14.0211467 L7.86556129,10.1739544 L8.00005604,7.80887484 L8.30491081,7.6744186 L9.94042303,7.6744186 Z M18.0105985,7.6744186 L18.3034047,7.82153285 L18.449948,10.1739544 L18.5964912,13.9963932 L18.5964912,17.6725617 L18.449948,22.255044 L18.425851,25.3421929 L18.0105985,25.4651163 L16.5460067,25.4651163 L16.1066571,25.3421929 L15.9357367,22.255044 L15.7894737,17.6970339 L15.7894737,14.0211467 L15.9357367,10.1739544 L16.0702315,7.80887484 L16.3753664,7.6744186 L18.0105985,7.6744186 Z M25.6140351,4.53488372 L25.6140351,6.97674419 L1.05263158,6.97674419 L1.05263158,4.53488372 L25.6140351,4.53488372 Z M13.0806755,0 L25.9649123,2.93331338 L25.4484139,3.8372093 L0.771925248,3.8372093 L0,3.1041615 L13.0806755,0 Z"
            id="path-1"
          ></path>
        </mask>
        <use class="fill-color" xlink:href="#path-1"></use>
        <g mask="url(#mask-2)" class="fill-color">
          <path
            d="M0,0 L26.6666667,0 L26.6666667,30 L0,30 L0,0 Z"
            id="swatch"
          ></path>
        </g>
      </g>
    </svg>
  `}function J(){return r`
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="#fff"
      title=${_("Left arrow icon")}
    >
      <path
        d="m20.1116715 50.0035012-.1116715-.1085359 43.1159942-46.61088155c2.401537-2.18938917 4.6902018-3.28408375 6.8659943-3.28408375s4.1642651.63837733 5.9654178 1.91513199c1.8011528 1.27675467 3.1520173 2.97248092 4.0525937 5.08717877l-39.4020173 42.99768924 39.4020173 42.9976892c-.9005764 2.1146979-2.2514409 3.8104241-4.0525937 5.0871788-1.8011527 1.2767547-3.7896253 1.915132-5.9654178 1.915132-2.1013449 0-4.3900096-1.0573489-6.8659943-3.1720468l-43.1159942-46.7194174z"
      />
    </svg>
  `}var Q=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,U=(e,t,s,a)=>{for(var o=a>1?void 0:a?ee(t,s):t,i=e.length-1,l;i>=0;i--)(l=e[i])&&(o=(a?l(t,s,o):l(o))||o);return a&&o&&Q(t,s,o),o};let P=class extends z{constructor(){super(...arguments),this.config=new p}render(){return r`
      <div class="modal-wrapper">
        <div class="modal-container">
          <header style="background-color: ${this.config.headerColor}">
            ${this.config.showLeftNavButton?this.leftNavButtonTemplate:N}
            ${this.config.showCloseButton?this.closeButtonTemplate:""}
            ${this.config.showHeaderLogo?r`<div class="logo-icon">${G()}</div>`:N}
            ${this.config.title?r`<h1 class="title">${this.config.title}</h1>`:""}
            ${this.config.subtitle?r`<h2 class="subtitle">${this.config.subtitle}</h2>`:""}
          </header>
          <section
            class="modal-body"
            style="background-color: ${this.config.bodyColor}"
          >
            <div class="content">
              <div
                class="processing-logo ${this.config.showProcessingIndicator?"":"hidden"}"
              >
                <ia-status-indicator
                  .mode=${this.config.processingImageMode==="processing"?"loading":"success"}
                ></ia-status-indicator>
              </div>
              ${this.config.headline?r` <h1 class="headline">${this.config.headline}</h1> `:""}
              ${this.config.message?r` <p class="message">${this.config.message}</p> `:""}

              <div class="slot-container">
                <slot> </slot>
              </div>
            </div>
          </section>
        </div>
      </div>
    `}handleCloseButton(e){if(e.preventDefault(),e.type==="keydown"&&e.key!==" "&&e.key!=="Enter")return;const t=new Event("closeButtonPressed");this.dispatchEvent(t)}handleLeftNavButtonPressed(e){if(e.preventDefault(),e.type==="keydown"&&e.key!==" "&&e.key!=="Enter")return;const t=new Event("leftNavButtonPressed");this.dispatchEvent(t)}get closeButtonTemplate(){return r`
      <button
        type="button"
        class="close-button"
        aria-label=${_("Close")}
        @click=${this.handleCloseButton}
        @keydown=${this.handleCloseButton}
      >
        <ia-icon-close></ia-icon-close>
      </button>
    `}get leftNavButtonTemplate(){return r`<button
      type="button"
      class="back-button"
      @click=${this.handleLeftNavButtonPressed}
      @keydown=${this.handleLeftNavButtonPressed}
    >
      ${J()} ${this.config.leftNavButtonText??""}
    </button> `}static get styles(){const e=n`var(--modalLogoSize, 6.5rem)`,t=n`var(--processingImageSize, 7.5rem)`,s=n`var(--modalCornerRadius, 1rem)`,a=n`var(--modalBorder, 2px solid black)`,o=n`var(--modalBottomMargin, 2.5rem)`,i=n`var(--modalTopMargin, 5rem)`,l=n`var(--modalHeaderBottomPadding, 0.5em)`,u=n`var(--modalBottomPadding, 2rem)`,m=n`var(--modalScrollOffset, 5px)`,f=n`var(--modalTitleFontSize, 1.8rem)`,g=n`var(--modalSubtitleFontSize, 1.4rem)`,M=n`var(--modalHeadlineFontSize, 1.6rem)`,L=n`var(--modalMessageFontSize, 1.4rem)`,x=n`var(--modalTitleLineHeight, normal)`,S=n`var(--modalSubtitleLineHeight, normal)`,$=n`var(--modalHeadlineLineHeight, normal)`,v=n`var(--modalMessageLineHeight, normal)`;return n`
      .processing-logo {
        margin: auto;
        width: ${t};
        height: ${t};
      }

      .processing-logo.hidden {
        height: 1rem;
      }

      .processing-logo.hidden ia-status-indicator {
        display: none;
      }

      ia-status-indicator {
        --icon-width: ${t};
        --loading-ring-color--: var(--activityIndicatorLoadingRingColor, #333);
        --loading-dot-color--: var(--activityIndicatorLoadingDotColor, #333);
        --success-icon-color--: var(--activityIndicatorCheckmarkColor, #31a481);
      }

      .modal-wrapper {
        outline: none;
      }

      .modal-container {
        border-radius: ${s};
        width: 100%;
        margin-top: ${i};
      }

      header {
        position: relative;
        background-color: #36a483;
        color: white;
        border-radius: calc(${s}) calc(${s}) 0 0;
        border: ${a};
        border-bottom: 0;
        text-align: center;
        padding-bottom: ${l};
      }

      .title {
        margin: 0;
        padding: 0;
        font-size: ${f};
        font-weight: bold;
        line-height: ${x};
      }

      .subtitle {
        margin: 0;
        padding: 0;
        font-weight: normal;
        padding-top: 0;
        font-size: ${g};
        line-height: ${S};
      }

      .modal-body {
        background-color: #fbfbfd;
        border-radius: 0 0 calc(${s}) calc(${s});
        border: ${a};
        border-top: 0;
        padding: 0 1rem calc(${u} - ${m}) 1rem;
        color: #333;
        margin-bottom: 2.5rem;
        min-height: 5rem;
      }

      .content {
        overflow-y: auto;
        max-height: calc(100vh - (16.5rem + ${o}));
        min-height: 5rem;
        padding: 0 0 calc(${m}) 0;
      }

      .headline {
        font-size: ${M};
        font-weight: bold;
        text-align: center;
        line-height: ${$};
        margin: 0;
        padding: 0;
      }

      .message {
        margin: 1rem 0 0 0;
        text-align: center;
        font-size: ${L};
        line-height: ${v};
      }

      .logo-icon {
        border-radius: 100%;
        border: 3px solid #fff;
        box-shadow:
          0 0 0 1px rgba(0, 0, 0, 0.18),
          0 2px 2px 0 rgba(0, 0, 0, 0.08);
        width: ${e};
        height: ${e};
        margin: -2.9rem auto 0.5rem auto;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .logo-icon svg {
        width: calc(${e} * 0.65);
        height: calc(${e} * 0.65);
      }

      .logo-icon svg .fill-color {
        fill: white;
      }

      .logo-icon svg .stroke-color {
        stroke: red;
      }

      .close-button {
        position: absolute;
        right: 1.2rem;
        top: 1.2rem;
        width: 2rem;
        height: 2rem;
        border-radius: 100%;
        border: 0;
        padding: 0;
        cursor: pointer;
        background-color: white;
        box-shadow:
          0 0 0 1px rgba(0, 0, 0, 0.18),
          0 4px 4px 0 rgba(0, 0, 0, 0.08);
      }

      .back-button {
        position: absolute;
        left: 1.2rem;
        top: 1.2rem;
        height: 2rem;
        background-color: transparent;
        outline: none;
        border: none;
        padding: 0;
        cursor: pointer;
        color: white;
        font-family: inherit;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
      }

      .back-button svg {
        height: 1.5rem;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }

      slot::slotted(.sr-only) {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }
    `}};U([I({type:Object})],P.prototype,"config",2);P=U([O("ia-modal-manager-template"),W()],P);function te(e,t,s){var a=s||{},o=a.noTrailing,i=o===void 0?!1:o,l=a.noLeading,u=l===void 0?!1:l,m=a.debounceMode,f=m===void 0?void 0:m,g,M=!1,L=0;function x(){g&&clearTimeout(g)}function S(v){var T=v||{},b=T.upcomingOnly,E=b===void 0?!1:b;x(),M=!E}function $(){for(var v=arguments.length,T=new Array(v),b=0;b<v;b++)T[b]=arguments[b];var E=this,F=Date.now()-L;if(M)return;function B(){L=Date.now(),t.apply(E,T)}function D(){g=void 0}!u&&f&&!g&&B(),x(),f===void 0&&F>e?u?(L=Date.now(),i||(g=setTimeout(f?D:B,e))):B():i!==!0&&(g=setTimeout(f?D:B,f===void 0?e-F:e))}return $.cancel=S,$}const w={Open:"open",Closed:"closed"};class oe{constructor(t){this.windowResizeThrottler=te(100,this.updateModalContainerHeight,{noLeading:!1,noTrailing:!1}).bind(this),this.modalManager=t}handleModeChange(t){switch(t){case w.Open:this.startResizeListener(),this.stopDocumentScroll();break;case w.Closed:this.stopResizeListener(),this.resumeDocumentScroll();break}}updateModalContainerHeight(){this.modalManager.style.setProperty("--containerHeight",`${window.innerHeight}px`)}stopDocumentScroll(){document.body.classList.add("modal-manager-open")}resumeDocumentScroll(){document.body.classList.remove("modal-manager-open")}startResizeListener(){window.addEventListener("resize",this.windowResizeThrottler)}stopResizeListener(){window.removeEventListener("resize",this.windowResizeThrottler)}}var se=Object.defineProperty,ae=Object.getOwnPropertyDescriptor,C=(e,t,s,a)=>{for(var o=a>1?void 0:a?ae(t,s):t,i=e.length-1,l;i>=0;i--)(l=e[i])&&(o=(a?l(t,s,o):l(o))||o);return a&&o&&se(t,s,o),o};let k=class extends z{constructor(){super(...arguments),this.mode=w.Closed,this.hostBridge=new oe(this),this.modal=new q(this),this.closeOnBackdropClick=!0}async firstUpdated(){await new Promise(e=>setTimeout(e,0)),this.closeOnBackdropClick&&this.addEventListener("keydown",e=>{e.key==="Escape"&&this.backdropClicked()})}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate()}render(){return r`
      <div class="container">
        <div class="backdrop" @click=${this.backdropClicked}></div>
        <ia-modal-manager-template
          @closeButtonPressed=${this.closeButtonPressed}
          @leftNavButtonPressed=${this.callUserPressedLeftNavButtonCallback}
          tabindex="-1"
        >
          ${this.customModalContent}
        </ia-modal-manager-template>
      </div>
    `}getMode(){return this.mode}closeModal(){this.mode=w.Closed,this.customModalContent=void 0,this.modalTemplate&&(this.modalTemplate.config=new p),this.modal.deactivate(),this.triggeringElement?.focus?.(),this.triggeringElement=void 0}callUserClosedModalCallback(){const e=this.userClosedModalCallback;this.userClosedModalCallback=void 0,e&&e()}callUserPressedLeftNavButtonCallback(){const e=this.userPressedLeftNavButtonCallback;this.userPressedLeftNavButtonCallback=void 0,e&&e()}async showModal(e){this.mode===w.Closed&&this.captureFocusedElement(),this.closeOnBackdropClick=e.config.closeOnBackdropClick,this.userClosedModalCallback=e.userClosedModalCallback,this.userPressedLeftNavButtonCallback=e.userPressedLeftNavButtonCallback,this.customModalContent=e.customModalContent,this.mode=w.Open,this.modalTemplate&&(this.modalTemplate.config=e.config,await this.modalTemplate.updateComplete,this.modalTemplate.focus()),this.modal.activate()}captureFocusedElement(){this.triggeringElement=V()}updated(e){e.has("mode")&&this.handleModeChange()}backdropClicked(){this.closeOnBackdropClick&&(this.closeModal(),this.callUserClosedModalCallback())}handleModeChange(){this.hostBridge.handleModeChange(this.mode),this.emitModeChangeEvent()}emitModeChangeEvent(){const e=new CustomEvent("modeChanged",{detail:{mode:this.mode}});this.dispatchEvent(e)}closeButtonPressed(){this.closeModal(),this.callUserClosedModalCallback()}static get styles(){const e=n`var(--modalBackdropColor, rgba(10, 10, 10, 0.9))`,t=n`var(--modalBackdropZindex, 1000)`,s=n`var(--modalWidth, 32rem)`,a=n`var(--modalMaxWidth, 95%)`,o=n`var(--modalZindex, 2000)`;return n`
      .container {
        width: 100%;
        height: 100%;
      }

      .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        background-color: ${e};
        width: 100%;
        height: 100%;
        z-index: ${t};
      }

      ia-modal-manager-template {
        outline: 0;
        position: fixed;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: ${o};
        width: ${s};
        max-width: ${a};
      }
    `}};C([I({type:String,reflect:!0})],k.prototype,"mode",2);C([I({type:Object})],k.prototype,"customModalContent",2);C([I({type:Object})],k.prototype,"hostBridge",2);C([c("ia-modal-manager-template")],k.prototype,"modalTemplate",2);k=C([O("modal-manager")],k);var ie=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,h=(e,t,s,a)=>{for(var o=a>1?void 0:a?ne(t,s):t,i=e.length-1,l;i>=0;i--)(l=e[i])&&(o=(a?l(t,s,o):l(o))||o);return a&&o&&ie(t,s,o),o};const le=[{label:"Backdrop color",cssVariable:"--modalBackdropColor",defaultValue:"rgba(10, 10, 10, 0.9)",inputType:"text"},{label:"Backdrop z-index",cssVariable:"--modalBackdropZindex",defaultValue:1e3,inputType:"number",min:0,step:1},{label:"Modal z-index",cssVariable:"--modalZindex",defaultValue:2e3,inputType:"number",min:0,step:1},{label:"Modal width",cssVariable:"--modalWidth",defaultValue:"32rem",inputType:"text"},{label:"Modal max width",cssVariable:"--modalMaxWidth",defaultValue:"95%",inputType:"text"},{label:"Corner radius",cssVariable:"--modalCornerRadius",defaultValue:"1rem",inputType:"text"},{label:"Border",cssVariable:"--modalBorder",defaultValue:"2px solid black",inputType:"text"},{label:"Top margin",cssVariable:"--modalTopMargin",defaultValue:"5rem",inputType:"text"},{label:"Header logo size",cssVariable:"--modalLogoSize",defaultValue:"6.5rem",inputType:"text"},{label:"Processing indicator size",cssVariable:"--processingImageSize",defaultValue:"7.5rem",inputType:"text"},{label:"Title font size",cssVariable:"--modalTitleFontSize",defaultValue:"1.8rem",inputType:"text"},{label:"Subtitle font size",cssVariable:"--modalSubtitleFontSize",defaultValue:"1.4rem",inputType:"text"},{label:"Headline font size",cssVariable:"--modalHeadlineFontSize",defaultValue:"1.6rem",inputType:"text"},{label:"Message font size",cssVariable:"--modalMessageFontSize",defaultValue:"1.4rem",inputType:"text"}],re=`<modal-manager></modal-manager>

<script type="module">
  import { ModalConfig } from '@internetarchive/elements/modal-manager/modal-config';

  const manager = document.querySelector('modal-manager');
  const config = new ModalConfig();
  config.headline = html\`Success\`;
  config.message = html\`Thank you for your support!\`;

  await manager.showModal({
    config,
    customModalContent: html\`<button>Optional content</button>\`,
    userClosedModalCallback: () => console.log('closed by the user'),
  });
  manager.closeModal();
<\/script>`;let d=class extends z{render(){return r`
      <story-template
        elementTag="modal-manager"
        elementClassName="IAModalManager"
        .customExampleUsage=${re}
        .styleInputData=${{settings:le}}
      >
        <div slot="demo">
          <modal-manager></modal-manager>
          <div class="actions">
            <button @click=${this.showConfiguredModal}>Show modal</button>
            <button @click=${this.showProcessingModal}>
              Processing, then complete
            </button>
            <button @click=${this.showUnclosableModal}>
              Unclosable (closes itself)
            </button>
            <button @click=${this.showCallbackModal}>
              Closed callback opens another
            </button>
          </div>
        </div>

        <form slot="settings" @submit=${e=>e.preventDefault()}>
          <table>
            ${this.textRow("title","Title","Donation Received")}
            ${this.textRow("subtitle","Subtitle","Thanks a bunch!")}
            ${this.textRow("headline","Headline","Success")}
            ${this.textRow("message","Message","Thank you for your support!")}
            ${this.textRow("header-color","Header color","#55a183")}
            ${this.textRow("body-color","Body color","#fbfbfd")}
            ${this.checkRow("show-header-logo","Show header logo",!0)}
            ${this.checkRow("show-close-button","Show close button",!0)}
            ${this.checkRow("close-on-backdrop","Close on backdrop click",!0)}
            ${this.checkRow("show-left-nav","Show left nav button",!1)}
            ${this.textRow("left-nav-text","Left nav button text","Back")}
            ${this.checkRow("show-processing","Show processing indicator",!1)}
            <tr>
              <td>
                <label for="settings__processing-mode">Indicator mode</label>
              </td>
              <td>
                <select id="settings__processing-mode">
                  <option value="complete">complete</option>
                  <option value="processing">processing</option>
                </select>
              </td>
            </tr>
            ${this.checkRow("custom-content","Custom modal content",!1)}
          </table>
          <p>Applied when you press "Show modal".</p>
        </form>

        <div slot="usage-notes">
          <code>modal-manager</code> is meant to be a single instance on the
          page, found by tag name. Open a modal with
          <code>showModal({ config })</code> and close it with
          <code>closeModal()</code>. It sets the <code>mode</code> attribute to
          <code>open</code> or <code>closed</code>, emits
          <code>modeChanged</code>, and adds the
          <code>modal-manager-open</code> class to the body while a modal is
          showing. The manager draws its backdrop even when closed, so hide it
          while <code>mode="closed"</code>, as this demo does.
        </div>
      </story-template>
    `}textRow(e,t,s){return r`<tr>
      <td><label for="settings__${e}">${t}</label></td>
      <td><input type="text" id="settings__${e}" value=${s} /></td>
    </tr>`}checkRow(e,t,s){return r`<tr>
      <td><label for="settings__${e}">${t}</label></td>
      <td>
        <input type="checkbox" id="settings__${e}" ?checked=${s} />
      </td>
    </tr>`}showConfiguredModal(){const e=a=>a?r`${a}`:void 0,t=new p({title:e(this.titleInput.value),subtitle:e(this.subtitleInput.value),headline:e(this.headlineInput.value),message:e(this.messageInput.value),headerColor:this.headerColorInput.value,bodyColor:this.bodyColorInput.value,showHeaderLogo:this.showHeaderLogoCheck.checked,showCloseButton:this.showCloseButtonCheck.checked,closeOnBackdropClick:this.closeOnBackdropCheck.checked,showLeftNavButton:this.showLeftNavCheck.checked,leftNavButtonText:this.leftNavTextInput.value,showProcessingIndicator:this.showProcessingCheck.checked,processingImageMode:this.processingModeSelect.value}),s=this.customContentCheck.checked?r`<div style="text-align: center; margin-top: 10px;">
          <button @click=${()=>alert("You pressed a button.")}>
            I'm a button to press
          </button>
        </div>`:void 0;this.modalManager.showModal({config:t,customModalContent:s,userPressedLeftNavButtonCallback:()=>this.modalManager.closeModal()})}showProcessingModal(){const e=new p({headerColor:"#497fbf",headline:r`Processing`,showProcessingIndicator:!0,processingImageMode:"processing",showCloseButton:!1,closeOnBackdropClick:!1});this.modalManager.showModal({config:e}),setTimeout(()=>{this.modalManager.showModal({config:new p({headline:r`Complete`,showProcessingIndicator:!0,processingImageMode:"complete"})})},1500)}showUnclosableModal(){const e=new p({message:r`The user can't close this. It closes itself in 2 seconds.`,showCloseButton:!1,closeOnBackdropClick:!1});this.modalManager.showModal({config:e}),setTimeout(()=>this.modalManager.closeModal(),2e3)}showCallbackModal(){this.modalManager.showModal({config:new p({message:r`When you close this modal another will open.`}),userClosedModalCallback:()=>{this.modalManager.showModal({config:new p({message:r`I'm another modal.`,headerColor:"#497fbf"})})}})}static get styles(){return n`
      modal-manager {
        display: none;
      }

      modal-manager[mode='open'] {
        display: block;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      td {
        padding: 0.15rem 0.5rem 0.15rem 0;
      }
    `}};h([c("modal-manager")],d.prototype,"modalManager",2);h([c("#settings__title")],d.prototype,"titleInput",2);h([c("#settings__subtitle")],d.prototype,"subtitleInput",2);h([c("#settings__headline")],d.prototype,"headlineInput",2);h([c("#settings__message")],d.prototype,"messageInput",2);h([c("#settings__header-color")],d.prototype,"headerColorInput",2);h([c("#settings__body-color")],d.prototype,"bodyColorInput",2);h([c("#settings__show-header-logo")],d.prototype,"showHeaderLogoCheck",2);h([c("#settings__show-close-button")],d.prototype,"showCloseButtonCheck",2);h([c("#settings__close-on-backdrop")],d.prototype,"closeOnBackdropCheck",2);h([c("#settings__show-left-nav")],d.prototype,"showLeftNavCheck",2);h([c("#settings__left-nav-text")],d.prototype,"leftNavTextInput",2);h([c("#settings__show-processing")],d.prototype,"showProcessingCheck",2);h([c("#settings__processing-mode")],d.prototype,"processingModeSelect",2);h([c("#settings__custom-content")],d.prototype,"customContentCheck",2);d=h([O("modal-manager-story")],d);export{d as ModalManagerStory};
