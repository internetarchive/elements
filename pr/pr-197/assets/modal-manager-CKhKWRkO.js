import{b as l,i as F,a,m as $,n as M,c as H,A as O,e as _}from"./index-DVPpNmLr.js";import{l as W}from"./localized-decorator-D377pQJj.js";import"./ia-status-indicator-MRGUH2Go.js";import{M as I}from"./modal-config-Ckbblf-F.js";import"./site-Irkwv8Te.js";/* empty css             */import"./theme-styles-2UtTA0D8.js";import"./mediatype-web-D3_zr8Dm.js";function*A(e=document.activeElement){e!=null&&(yield e,"shadowRoot"in e&&e.shadowRoot&&e.shadowRoot.mode!=="closed"&&(yield*A(e.shadowRoot.activeElement)))}function N(){return[...A()].pop()}const z=new WeakMap;function R(e){let t=z.get(e);return t||(t=window.getComputedStyle(e,null),z.set(e,t)),t}function U(e){if("checkVisibility"in e&&typeof e.checkVisibility=="function")return e.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const t=R(e);return t.visibility!=="hidden"&&t.display!=="none"}function j(e){const t=R(e),{overflowY:i,overflowX:s}=t;return i==="scroll"||s==="scroll"?!0:i!=="auto"||s!=="auto"?!1:e.scrollHeight>e.clientHeight&&i==="auto"||e.scrollWidth>e.clientWidth&&s==="auto"}function K(e){const t=e.tagName.toLowerCase(),i=Number(e.getAttribute("tabindex"));return e.hasAttribute("tabindex")&&(isNaN(i)||i<=-1)||e.hasAttribute("disabled")||e.closest("[inert]")||t==="input"&&e.getAttribute("type")==="radio"&&!e.hasAttribute("checked")||!U(e)?!1:(t==="audio"||t==="video")&&e.hasAttribute("controls")||e.hasAttribute("tabindex")||e.hasAttribute("contenteditable")&&e.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(t)?!0:j(e)}function V(e,t){return e.getRootNode({composed:!0})?.host!==t}function P(e){const t=new WeakMap,i=[];function s(o){if(o instanceof Element){if(o.hasAttribute("inert")||o.closest("[inert]")||t.has(o))return;t.set(o,!0),!i.includes(o)&&K(o)&&i.push(o),o instanceof HTMLSlotElement&&V(o,e)&&o.assignedElements({flatten:!0}).forEach(n=>{s(n)}),o.shadowRoot!==null&&o.shadowRoot.mode==="open"&&s(o.shadowRoot)}for(const n of Array.from(o.children))s(n)}return s(e),i.sort((o,n)=>{const r=Number(o.getAttribute("tabindex"))||0;return(Number(n.getAttribute("tabindex"))||0)-r})}let v=[];class X{constructor(t){this.isExternalActivated=!1,this.tabDirection="forward",this.currentFocus=null,this.previousFocus=null,this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=i=>{if(i.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const s=N();if(this.previousFocus=s,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;i.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const o=P(this.element);let n=o.findIndex(c=>c===s);this.previousFocus=this.currentFocus;const r=this.tabDirection==="forward"?1:-1;for(;;){n+r>=o.length?n=0:n+r<0?n=o.length-1:n+=r,this.previousFocus=this.currentFocus;const c=o[n];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||c&&this.possiblyHasTabbableChildren(c))return;i.preventDefault(),this.currentFocus=c,this.currentFocus?.focus({preventScroll:!1});const d=[...A()];if(d.includes(this.currentFocus)||!d.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=t,this.elementsWithTabbableControls=["iframe"]}activate(){v.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){v=v.filter(t=>t!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return v[v.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const t=P(this.element);if(!this.element.matches(":focus-within")){const i=t[0],s=t[t.length-1],o=this.tabDirection==="forward"?i:s;typeof o?.focus=="function"&&(this.currentFocus=o,o.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(t){return this.elementsWithTabbableControls.includes(t.tagName.toLowerCase())||t.hasAttribute("controls")}}const Y=l`
<svg
  viewBox="0 0 40 40"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z" class="fill-color" fill-rule="evenodd"/>
</svg>
`;class q extends F{static get styles(){return a`
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
    `}render(){return Y}}customElements.define("ia-icon-close",q);function G(){return l`
    <svg
      class="ia-logo"
      viewBox="0 0 27 30"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="logoTitleID logoDescID"
    >
      <title id="logoTitleID">${$("Internet Archive logo")}</title>
      <desc id="logoDescID">
        ${$("A line drawing of the Internet Archive headquarters building façade.")}
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
  `}function J(){return l`
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="#fff"
      title=${$("Left arrow icon")}
    >
      <path
        d="m20.1116715 50.0035012-.1116715-.1085359 43.1159942-46.61088155c2.401537-2.18938917 4.6902018-3.28408375 6.8659943-3.28408375s4.1642651.63837733 5.9654178 1.91513199c1.8011528 1.27675467 3.1520173 2.97248092 4.0525937 5.08717877l-39.4020173 42.99768924 39.4020173 42.9976892c-.9005764 2.1146979-2.2514409 3.8104241-4.0525937 5.0871788-1.8011527 1.2767547-3.7896253 1.915132-5.9654178 1.915132-2.1013449 0-4.3900096-1.0573489-6.8659943-3.1720468l-43.1159942-46.7194174z"
      />
    </svg>
  `}var Q=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,Z=(e,t,i,s)=>{for(var o=s>1?void 0:s?ee(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&Q(t,i,o),o};let E=class extends F{constructor(){super(...arguments),this.config=new I}render(){return l`
      <div class="modal-wrapper">
        <div class="modal-container">
          <header style="background-color: ${this.config.headerColor}">
            ${this.config.showLeftNavButton?this.leftNavButtonTemplate:O}
            ${this.config.showCloseButton?this.closeButtonTemplate:""}
            ${this.config.showHeaderLogo?l`<div class="logo-icon">${G()}</div>`:O}
            ${this.config.title?l`<h1 class="title">${this.config.title}</h1>`:""}
            ${this.config.subtitle?l`<h2 class="subtitle">${this.config.subtitle}</h2>`:""}
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
              ${this.config.headline?l` <h1 class="headline">${this.config.headline}</h1> `:""}
              ${this.config.message?l` <p class="message">${this.config.message}</p> `:""}

              <div class="slot-container">
                <slot> </slot>
              </div>
            </div>
          </section>
        </div>
      </div>
    `}handleCloseButton(e){if(e.preventDefault(),e.type==="keydown"&&e.key!==" "&&e.key!=="Enter")return;const t=new Event("closeButtonPressed");this.dispatchEvent(t)}handleLeftNavButtonPressed(e){if(e.preventDefault(),e.type==="keydown"&&e.key!==" "&&e.key!=="Enter")return;const t=new Event("leftNavButtonPressed");this.dispatchEvent(t)}get closeButtonTemplate(){return l`
      <button
        type="button"
        class="close-button"
        aria-label=${$("Close")}
        @click=${this.handleCloseButton}
        @keydown=${this.handleCloseButton}
      >
        <ia-icon-close></ia-icon-close>
      </button>
    `}get leftNavButtonTemplate(){return l`<button
      type="button"
      class="back-button"
      @click=${this.handleLeftNavButtonPressed}
      @keydown=${this.handleLeftNavButtonPressed}
    >
      ${J()} ${this.config.leftNavButtonText??""}
    </button> `}static get styles(){const e=a`var(--modalLogoSize, 6.5rem)`,t=a`var(--processingImageSize, 7.5rem)`,i=a`var(--modalCornerRadius, 1rem)`,s=a`var(--modalBorder, 2px solid black)`,o=a`var(--modalBottomMargin, 2.5rem)`,n=a`var(--modalTopMargin, 5rem)`,r=a`var(--modalHeaderBottomPadding, 0.5em)`,c=a`var(--modalBottomPadding, 2rem)`,d=a`var(--modalScrollOffset, 5px)`,u=a`var(--modalTitleFontSize, 1.8rem)`,h=a`var(--modalSubtitleFontSize, 1.4rem)`,w=a`var(--modalHeadlineFontSize, 1.6rem)`,b=a`var(--modalMessageFontSize, 1.4rem)`,k=a`var(--modalTitleLineHeight, normal)`,T=a`var(--modalSubtitleLineHeight, normal)`,C=a`var(--modalHeadlineLineHeight, normal)`,g=a`var(--modalMessageLineHeight, normal)`;return a`
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
        border-radius: ${i};
        width: 100%;
        margin-top: ${n};
      }

      header {
        position: relative;
        background-color: #36a483;
        color: white;
        border-radius: calc(${i}) calc(${i}) 0 0;
        border: ${s};
        border-bottom: 0;
        text-align: center;
        padding-bottom: ${r};
      }

      .title {
        margin: 0;
        padding: 0;
        font-size: ${u};
        font-weight: bold;
        line-height: ${k};
      }

      .subtitle {
        margin: 0;
        padding: 0;
        font-weight: normal;
        padding-top: 0;
        font-size: ${h};
        line-height: ${T};
      }

      .modal-body {
        background-color: #fbfbfd;
        border-radius: 0 0 calc(${i}) calc(${i});
        border: ${s};
        border-top: 0;
        padding: 0 1rem calc(${c} - ${d}) 1rem;
        color: #333;
        margin-bottom: 2.5rem;
        min-height: 5rem;
      }

      .content {
        overflow-y: auto;
        max-height: calc(100vh - (16.5rem + ${o}));
        min-height: 5rem;
        padding: 0 0 calc(${d}) 0;
      }

      .headline {
        font-size: ${w};
        font-weight: bold;
        text-align: center;
        line-height: ${C};
        margin: 0;
        padding: 0;
      }

      .message {
        margin: 1rem 0 0 0;
        text-align: center;
        font-size: ${b};
        line-height: ${g};
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
    `}};Z([M({type:Object})],E.prototype,"config",2);E=Z([H("ia-modal-manager-template"),W()],E);function te(e,t,i){var s=i||{},o=s.noTrailing,n=o===void 0?!1:o,r=s.noLeading,c=r===void 0?!1:r,d=s.debounceMode,u=d===void 0?void 0:d,h,w=!1,b=0;function k(){h&&clearTimeout(h)}function T(g){var y=g||{},m=y.upcomingOnly,B=m===void 0?!1:m;k(),w=!B}function C(){for(var g=arguments.length,y=new Array(g),m=0;m<g;m++)y[m]=arguments[m];var B=this,D=Date.now()-b;if(w)return;function x(){b=Date.now(),t.apply(B,y)}function S(){h=void 0}!c&&u&&!h&&x(),k(),u===void 0&&D>e?c?(b=Date.now(),n||(h=setTimeout(u?S:x,e))):x():n!==!0&&(h=setTimeout(u?S:x,u===void 0?e-D:e))}return C.cancel=T,C}const f={Open:"open",Closed:"closed"};class oe{constructor(t){this.windowResizeThrottler=te(100,this.updateModalContainerHeight,{noLeading:!1,noTrailing:!1}).bind(this),this.modalManager=t}handleModeChange(t){switch(t){case f.Open:this.startResizeListener(),this.stopDocumentScroll();break;case f.Closed:this.stopResizeListener(),this.resumeDocumentScroll();break}}updateModalContainerHeight(){this.modalManager.style.setProperty("--containerHeight",`${window.innerHeight}px`)}stopDocumentScroll(){document.body.classList.add("modal-manager-open")}resumeDocumentScroll(){document.body.classList.remove("modal-manager-open")}startResizeListener(){window.addEventListener("resize",this.windowResizeThrottler)}stopResizeListener(){window.removeEventListener("resize",this.windowResizeThrottler)}}var ie=Object.defineProperty,se=Object.getOwnPropertyDescriptor,L=(e,t,i,s)=>{for(var o=s>1?void 0:s?se(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&ie(t,i,o),o};let p=class extends F{constructor(){super(...arguments),this.mode=f.Closed,this.hostBridge=new oe(this),this.modal=new X(this),this.closeOnBackdropClick=!0}async firstUpdated(){await new Promise(e=>setTimeout(e,0)),this.closeOnBackdropClick&&this.addEventListener("keydown",e=>{e.key==="Escape"&&this.backdropClicked()})}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate()}render(){return l`
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
    `}getMode(){return this.mode}closeModal(){this.mode=f.Closed,this.customModalContent=void 0,this.modalTemplate&&(this.modalTemplate.config=new I),this.modal.deactivate(),this.triggeringElement?.focus?.(),this.triggeringElement=void 0}callUserClosedModalCallback(){const e=this.userClosedModalCallback;this.userClosedModalCallback=void 0,e&&e()}callUserPressedLeftNavButtonCallback(){const e=this.userPressedLeftNavButtonCallback;this.userPressedLeftNavButtonCallback=void 0,e&&e()}async showModal(e){this.mode===f.Closed&&this.captureFocusedElement(),this.closeOnBackdropClick=e.config.closeOnBackdropClick,this.userClosedModalCallback=e.userClosedModalCallback,this.userPressedLeftNavButtonCallback=e.userPressedLeftNavButtonCallback,this.customModalContent=e.customModalContent,this.mode=f.Open,this.modalTemplate&&(this.modalTemplate.config=e.config,await this.modalTemplate.updateComplete,this.modalTemplate.focus()),this.modal.activate()}captureFocusedElement(){this.triggeringElement=N()}updated(e){e.has("mode")&&this.handleModeChange()}backdropClicked(){this.closeOnBackdropClick&&(this.closeModal(),this.callUserClosedModalCallback())}handleModeChange(){this.hostBridge.handleModeChange(this.mode),this.emitModeChangeEvent()}emitModeChangeEvent(){const e=new CustomEvent("modeChanged",{detail:{mode:this.mode}});this.dispatchEvent(e)}closeButtonPressed(){this.closeModal(),this.callUserClosedModalCallback()}static get styles(){const e=a`var(--modalBackdropColor, rgba(10, 10, 10, 0.9))`,t=a`var(--modalBackdropZindex, 1000)`,i=a`var(--modalWidth, 32rem)`,s=a`var(--modalMaxWidth, 95%)`,o=a`var(--modalZindex, 2000)`;return a`
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
        width: ${i};
        max-width: ${s};
      }
    `}};L([M({type:String,reflect:!0})],p.prototype,"mode",2);L([M({type:Object})],p.prototype,"customModalContent",2);L([M({type:Object})],p.prototype,"hostBridge",2);L([_("ia-modal-manager-template")],p.prototype,"modalTemplate",2);p=L([H("modal-manager")],p);export{p as IAModalManager};
