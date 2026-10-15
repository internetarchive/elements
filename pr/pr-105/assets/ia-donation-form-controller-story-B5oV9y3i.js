import{n as l,i as F,b as d,a as h,A as J,e as u,c as $,m as s,s as ye,r as k}from"./index-CqD6m3Zx.js";import{_ as L,a as Z}from"./tslib.es6-RU1n5ZxP.js";import{t as Ye}from"./index-C8wOzs1R.js";import{C as Ze,D as w,c as ce,a as V,d as $e,E as fe,b as de,e as Oe}from"./ia-donation-edit-donation-D6YZ6hf3.js";import{t as N}from"./theme-styles-BVS9wSOT.js";import{c as te}from"./index-D8TntI4h.js";import{o as ge}from"./story-template-D6rDtgGm.js";import{i as Ee,a as G}from"./icon-box-Ds9FqP5n.js";import{_ as We,a as Je,b as Xe,c as Qe,d as et,e as tt,f as ot}from"./venmo-Cm3UhYqO.js";import{D as at}from"./ia-donation-section-CDyQ6FXQ.js";import"./syntax-highlighter-BRzOUgIu.js";const ke=o=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(o,e)}):customElements.define(o,e)};class _{constructor(e){this.title=e?.title,this.subtitle=e?.subtitle,this.headline=e?.headline,this.message=e?.message,this.headerColor=e?.headerColor??"#55A183",this.bodyColor=e?.bodyColor??"#fbfbfd",this.showProcessingIndicator=e?.showProcessingIndicator??!1,this.processingImageMode=e?.processingImageMode??"complete",this.showCloseButton=e?.showCloseButton??!0,this.showLeftNavButton=e?.showLeftNavButton??!1,this.leftNavButtonText=e?.leftNavButtonText??"",this.showHeaderLogo=e?.showHeaderLogo??!0,this.closeOnBackdropClick=e?.closeOnBackdropClick??!0}}function*Te(o=document.activeElement){o!=null&&(yield o,"shadowRoot"in o&&o.shadowRoot&&o.shadowRoot.mode!=="closed"&&(yield*Te(o.shadowRoot.activeElement)))}function He(){return[...Te()].pop()}const Ae=new WeakMap;function Ne(o){let e=Ae.get(o);return e||(e=window.getComputedStyle(o,null),Ae.set(o,e)),e}function nt(o){if("checkVisibility"in o&&typeof o.checkVisibility=="function")return o.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=Ne(o);return e.visibility!=="hidden"&&e.display!=="none"}function it(o){const e=Ne(o),{overflowY:t,overflowX:n}=e;return t==="scroll"||n==="scroll"?!0:t!=="auto"||n!=="auto"?!1:o.scrollHeight>o.clientHeight&&t==="auto"||o.scrollWidth>o.clientWidth&&n==="auto"}function rt(o){const e=o.tagName.toLowerCase(),t=Number(o.getAttribute("tabindex"));return o.hasAttribute("tabindex")&&(isNaN(t)||t<=-1)||o.hasAttribute("disabled")||o.closest("[inert]")||e==="input"&&o.getAttribute("type")==="radio"&&!o.hasAttribute("checked")||!nt(o)?!1:(e==="audio"||e==="video")&&o.hasAttribute("controls")||o.hasAttribute("tabindex")||o.hasAttribute("contenteditable")&&o.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:it(o)}function st(o,e){return o.getRootNode({composed:!0})?.host!==e}function xe(o){const e=new WeakMap,t=[];function n(a){if(a instanceof Element){if(a.hasAttribute("inert")||a.closest("[inert]")||e.has(a))return;e.set(a,!0),!t.includes(a)&&rt(a)&&t.push(a),a instanceof HTMLSlotElement&&st(a,o)&&a.assignedElements({flatten:!0}).forEach(i=>{n(i)}),a.shadowRoot!==null&&a.shadowRoot.mode==="open"&&n(a.shadowRoot)}for(const i of Array.from(a.children))n(i)}return n(o),t.sort((a,i)=>{const r=Number(a.getAttribute("tabindex"))||0;return(Number(i.getAttribute("tabindex"))||0)-r})}let ie=[];class lt{constructor(e){this.isExternalActivated=!1,this.tabDirection="forward",this.currentFocus=null,this.previousFocus=null,this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=t=>{if(t.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const n=He();if(this.previousFocus=n,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;t.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const a=xe(this.element);let i=a.findIndex(c=>c===n);this.previousFocus=this.currentFocus;const r=this.tabDirection==="forward"?1:-1;for(;;){i+r>=a.length?i=0:i+r<0?i=a.length-1:i+=r,this.previousFocus=this.currentFocus;const c=a[i];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||c&&this.possiblyHasTabbableChildren(c))return;t.preventDefault(),this.currentFocus=c,this.currentFocus?.focus({preventScroll:!1});const p=[...Te()];if(p.includes(this.currentFocus)||!p.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=e,this.elementsWithTabbableControls=["iframe"]}activate(){ie.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){ie=ie.filter(e=>e!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return ie[ie.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const e=xe(this.element);if(!this.element.matches(":focus-within")){const t=e[0],n=e[e.length-1],a=this.tabDirection==="forward"?t:n;typeof a?.focus=="function"&&(this.currentFocus=a,a.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(e){return this.elementsWithTabbableControls.includes(e.tagName.toLowerCase())||e.hasAttribute("controls")}}var De;(function(o){o.processing="processing",o.complete="complete"})(De||(De={}));let Me=class extends F{constructor(){super(...arguments),this.mode="processing"}render(){return d`
      <div class="${this.mode}">
        <svg
          viewBox="0 0 120 120"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-labelledby="indicatorTitle indicatorDescription"
        >
          <title id="indicatorTitle">Activity Indicator</title>
          <desc id="indicatorDescription">
            A rotating activity indicator with three dots in the middle.
          </desc>
          <g
            id="icons/check-ring---squared"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <path
              id="completed-ring"
              class="loaded-indicator"
              d="M60,10 C70.5816709,10 80.3955961,13.2871104 88.4763646,18.8959201 L78.3502633,29.0214223 C72.9767592,25.8315427 66.7022695,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 L95.995,59.46 L108.327675,47.128668 C109.350926,50.9806166 109.925886,55.015198 109.993301,59.1731586 L110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
            ></path>
            <polygon
              id="check"
              class="loaded-indicator"
              transform="translate(75.000000, 41.500000) rotate(44.000000) translate(-75.000000, -41.500000) "
              points="96 85 54 85 54 65 76 64.999 76 -2 96 -2"
            ></polygon>
            <path
              id="activity-ring"
              class="activity-indicator"
              d="M60,10 C69.8019971,10 78.9452178,12.8205573 86.6623125,17.6943223 L76.4086287,27.9484118 C71.4880919,25.4243078 65.9103784,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 C96,53.3014663 94.1704984,47.0302355 90.9839104,41.6587228 L101.110332,31.5326452 C106.715332,39.6116982 110,49.4222615 110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
            ></path>
            <g
              id="activity-dots"
              class="activity-indicator"
              transform="translate(40.000000, 55.000000)"
            >
              <circle id="left-dot" cx="5" cy="5" r="5"></circle>
              <circle id="middle-dot" cx="20" cy="5" r="5"></circle>
              <circle id="right-dot" cx="35" cy="5" r="5"></circle>
            </g>
          </g>
        </svg>
      </div>
    `}static get styles(){const e=h`var(--activityIndicatorCheckmarkColor, #31A481)`,t=h`var(--activityIndicatorCompletedRingColor, #31A481)`,n=h`var(--activityIndicatorLoadingRingColor, #333333)`,a=h`var(--activityIndicatorLoadingDotColor, #333333)`;return h`
      #completed-ring {
        fill: ${t};
      }

      #check {
        fill: ${e};
      }

      #activity-ring {
        fill: ${n};
      }

      #activity-dots {
        fill: ${a};
      }

      .activity-indicator {
        opacity: 0;
        transition: opacity 0.25s ease-out;
      }

      .processing .activity-indicator {
        opacity: 1;
      }

      .loaded-indicator {
        opacity: 1;
        transition: opacity 0.25s ease-out;
      }

      .processing .loaded-indicator {
        opacity: 0;
      }

      .image {
        border: 1px solid red;
        display: inline-block;
      }

      .processing #activity-ring {
        animation: rotate 1.3s infinite linear;
        transform-origin: 50px 50px;
        transform-box: fill-box;
      }

      .processing #left-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.2s;
      }

      .processing #middle-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.4s;
      }

      .processing #right-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.6s;
      }

      @keyframes rotate {
        0% {
          transform: rotate(-360deg);
        }
        100% {
          /* This frame is supposed to be inferred, but Safari doesn't rotate it unless we're explicit */
          transform: rotate(0deg);
        }
      }

      @keyframes dot {
        0% {
          opacity: 0;
        }
        25% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `}};L([l({type:String})],Me.prototype,"mode",void 0);Me=L([ke("ia-activity-indicator")],Me);const dt=d`
  <svg
    class="ia-logo"
    viewBox="0 0 27 30"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="logoTitleID logoDescID"
  >
    <title id="logoTitleID">Internet Archive logo</title>
    <desc id="logoDescID">
      A line drawing of the Internet Archive headquarters building façade.
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
`,ct=d`
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
    title="Left arrow icon"
    alt="Left arrow icon"
  >
    <path
      d="m20.1116715 50.0035012-.1116715-.1085359 43.1159942-46.61088155c2.401537-2.18938917 4.6902018-3.28408375 6.8659943-3.28408375s4.1642651.63837733 5.9654178 1.91513199c1.8011528 1.27675467 3.1520173 2.97248092 4.0525937 5.08717877l-39.4020173 42.99768924 39.4020173 42.9976892c-.9005764 2.1146979-2.2514409 3.8104241-4.0525937 5.0871788-1.8011527 1.2767547-3.7896253 1.915132-5.9654178 1.915132-2.1013449 0-4.3900096-1.0573489-6.8659943-3.1720468l-43.1159942-46.7194174z"
    />
  </svg>
`;let Pe=class extends F{constructor(){super(...arguments),this.config=new _}render(){return d`
      <div class="modal-wrapper">
        <div class="modal-container">
          <header style="background-color: ${this.config.headerColor}">
            ${this.config.showLeftNavButton?this.leftNavButtonTemplate:J}
            ${this.config.showCloseButton?this.closeButtonTemplate:""}
            ${this.config.showHeaderLogo?d`<div class="logo-icon">${dt}</div>`:J}
            ${this.config.title?d`<h1 class="title">${this.config.title}</h1>`:""}
            ${this.config.subtitle?d`<h2 class="subtitle">${this.config.subtitle}</h2>`:""}
          </header>
          <section
            class="modal-body"
            style="background-color: ${this.config.bodyColor}"
          >
            <div class="content">
              <div
                class="processing-logo ${this.config.showProcessingIndicator?"":"hidden"}"
              >
                <ia-activity-indicator
                  .mode=${this.config.processingImageMode}
                ></ia-activity-indicator>
              </div>
              ${this.config.headline?d` <h1 class="headline">${this.config.headline}</h1> `:""}
              ${this.config.message?d` <p class="message">${this.config.message}</p> `:""}

              <div class="slot-container">
                <slot> </slot>
              </div>
            </div>
          </section>
        </div>
      </div>
    `}handleCloseButton(e){if(e.preventDefault(),e.type==="keydown"&&e.key!==" "&&e.key!=="Enter")return;const t=new Event("closeButtonPressed");this.dispatchEvent(t)}handleLeftNavButtonPressed(e){if(e.preventDefault(),e.type==="keydown"&&e.key!==" "&&e.key!=="Enter")return;const t=new Event("leftNavButtonPressed");this.dispatchEvent(t)}get closeButtonTemplate(){return d`
      <button
        type="button"
        class="close-button"
        @click=${this.handleCloseButton}
        @keydown=${this.handleCloseButton}
      >
        <ia-icon-close></ia-icon-close>
      </button>
    `}get leftNavButtonTemplate(){return d`<button
      type="button"
      class="back-button"
      @click=${this.handleLeftNavButtonPressed}
      @keydown=${this.handleLeftNavButtonPressed}
    >
      ${ct} ${this.config.leftNavButtonText??""}
    </button> `}static get styles(){const e=h`var(--modalLogoSize, 6.5rem)`,t=h`var(--processingImageSize, 7.5rem)`,n=h`var(--modalCornerRadius, 1rem)`,a=h`var(--modalBorder, 2px solid black)`,i=h`var(--modalBottomMargin, 2.5rem)`,r=h`var(--modalTopMargin, 5rem)`,c=h`var(--modalHeaderBottomPadding, 0.5em)`,p=h`var(--modalBottomPadding, 2rem)`,b=h`var(--modalScrollOffset, 5px)`,y=h`var(--modalTitleFontSize, 1.8rem)`,f=h`var(--modalSubtitleFontSize, 1.4rem)`,E=h`var(--modalHeadlineFontSize, 1.6rem)`,Y=h`var(--modalMessageFontSize, 1.4rem)`,ve=h`var(--modalTitleLineHeight, normal)`,je=h`var(--modalSubtitleLineHeight, normal)`,Ge=h`var(--modalHeadlineLineHeight, normal)`,Ke=h`var(--modalMessageLineHeight, normal)`;return h`
      .processing-logo {
        margin: auto;
        width: ${t};
        height: ${t};
      }

      .processing-logo.hidden {
        height: 1rem;
      }

      .processing-logo.hidden ia-activity-indicator {
        display: none;
      }

      .modal-wrapper {
        outline: none;
      }

      .modal-container {
        border-radius: ${n};
        width: 100%;
        margin-top: ${r};
      }

      header {
        position: relative;
        background-color: #36a483;
        color: white;
        border-radius: calc(${n}) calc(${n}) 0 0;
        border: ${a};
        border-bottom: 0;
        text-align: center;
        padding-bottom: ${c};
      }

      .title {
        margin: 0;
        padding: 0;
        font-size: ${y};
        font-weight: bold;
        line-height: ${ve};
      }

      .subtitle {
        margin: 0;
        padding: 0;
        font-weight: normal;
        padding-top: 0;
        font-size: ${f};
        line-height: ${je};
      }

      .modal-body {
        background-color: #fbfbfd;
        border-radius: 0 0 calc(${n}) calc(${n});
        border: ${a};
        border-top: 0;
        padding: 0 1rem calc(${p} - ${b}) 1rem;
        color: #333;
        margin-bottom: 2.5rem;
        min-height: 5rem;
      }

      .content {
        overflow-y: auto;
        max-height: calc(100vh - (16.5rem + ${i}));
        min-height: 5rem;
        padding: 0 0 calc(${b}) 0;
      }

      .headline {
        font-size: ${E};
        font-weight: bold;
        text-align: center;
        line-height: ${Ge};
        margin: 0;
        padding: 0;
      }

      .message {
        margin: 1rem 0 0 0;
        text-align: center;
        font-size: ${Y};
        line-height: ${Ke};
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
    `}};L([l({type:Object})],Pe.prototype,"config",void 0);Pe=L([ke("modal-template")],Pe);var B;(function(o){o.Open="open",o.Closed="closed"})(B||(B={}));class ht{constructor(e){this.windowResizeThrottler=Ye(100,this.updateModalContainerHeight,{noLeading:!1,noTrailing:!1}).bind(this),this.modalManager=e}handleModeChange(e){switch(e){case B.Open:this.startResizeListener(),this.stopDocumentScroll();break;case B.Closed:this.stopResizeListener(),this.resumeDocumentScroll();break}}updateModalContainerHeight(){this.modalManager.style.setProperty("--containerHeight",`${window.innerHeight}px`)}stopDocumentScroll(){document.body.classList.add("modal-manager-open")}resumeDocumentScroll(){document.body.classList.remove("modal-manager-open")}startResizeListener(){window.addEventListener("resize",this.windowResizeThrottler)}stopResizeListener(){window.removeEventListener("resize",this.windowResizeThrottler)}}let X=class extends F{constructor(){super(...arguments),this.mode=B.Closed,this.hostBridge=new ht(this),this.modal=new lt(this),this.closeOnBackdropClick=!0}async firstUpdated(){await new Promise(e=>setTimeout(e,0)),this.closeOnBackdropClick&&this.addEventListener("keydown",e=>{e.key==="Escape"&&this.backdropClicked()})}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate()}render(){return d`
      <div class="container">
        <div class="backdrop" @click=${this.backdropClicked}></div>
        <modal-template
          @closeButtonPressed=${this.closeButtonPressed}
          @leftNavButtonPressed=${this.callUserPressedLeftNavButtonCallback}
          tabindex="-1"
        >
          ${this.customModalContent}
        </modal-template>
      </div>
    `}getMode(){return this.mode}closeModal(){this.mode=B.Closed,this.customModalContent=void 0,this.modalTemplate&&(this.modalTemplate.config=new _),this.modal.deactivate(),this.triggeringElement?.focus?.(),this.triggeringElement=void 0}callUserClosedModalCallback(){const e=this.userClosedModalCallback;this.userClosedModalCallback=void 0,e&&e()}callUserPressedLeftNavButtonCallback(){const e=this.userPressedLeftNavButtonCallback;this.userPressedLeftNavButtonCallback=void 0,e&&e()}async showModal(e){this.mode===B.Closed&&this.captureFocusedElement(),this.closeOnBackdropClick=e.config.closeOnBackdropClick,this.userClosedModalCallback=e.userClosedModalCallback,this.userPressedLeftNavButtonCallback=e.userPressedLeftNavButtonCallback,this.customModalContent=e.customModalContent,this.mode=B.Open,this.modalTemplate&&(this.modalTemplate.config=e.config,await this.modalTemplate.updateComplete,this.modalTemplate.focus()),this.modal.activate()}captureFocusedElement(){this.triggeringElement=He()}updated(e){e.has("mode")&&this.handleModeChange()}backdropClicked(){this.closeOnBackdropClick&&(this.closeModal(),this.callUserClosedModalCallback())}handleModeChange(){this.hostBridge.handleModeChange(this.mode),this.emitModeChangeEvent()}emitModeChangeEvent(){const e=new CustomEvent("modeChanged",{detail:{mode:this.mode}});this.dispatchEvent(e)}closeButtonPressed(){this.closeModal(),this.callUserClosedModalCallback()}static get styles(){const e=h`var(--modalBackdropColor, rgba(10, 10, 10, 0.9))`,t=h`var(--modalBackdropZindex, 1000)`,n=h`var(--modalWidth, 32rem)`,a=h`var(--modalMaxWidth, 95%)`,i=h`var(--modalZindex, 2000)`;return h`
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

      modal-template {
        outline: 0;
        position: fixed;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: ${i};
        width: ${n};
        max-width: ${a};
      }
    `}};L([l({type:String,reflect:!0})],X.prototype,"mode",void 0);L([l({type:Object})],X.prototype,"customModalContent",void 0);L([l({type:Object})],X.prototype,"hostBridge",void 0);L([u("modal-template")],X.prototype,"modalTemplate",void 0);X=L([ke("modal-manager")],X);const W={Development:"dev",Production:"prod"};class he{constructor(e){this.email=e?.email,this.firstName=e?.firstName,this.lastName=e?.lastName}}class ue{constructor(e){this.streetAddress=e?.streetAddress,this.extendedAddress=e?.extendedAddress,this.locality=e?.locality,this.region=e?.region,this.postalCode=e?.postalCode,this.countryCodeAlpha2=e?.countryCodeAlpha2}}class ut{constructor(e){this.customer=e.customer,this.billing=e.billing}}class pt{constructor(e){this.id=e.id}}class mt{constructor(e){this.paymentProvider=e.paymentProvider,this.paymentMethodNonce=e.paymentMethodNonce,this.amount=e.amount,this.donationType=e.donationType,this.transaction_id=e.transaction_id,this.customer_id=e.customer_id,this.customer=new he(e.customer),this.billing=new ue(e.billing),e.subscription&&(this.subscription=new pt(e.subscription))}}class gt{constructor(e){this.code=e.code,this.message=e.message}}class yt{constructor(e){this.message=e.message;const{errors:t=[]}=e;this.errors=t.map(n=>new gt(n))}}class Re{constructor(e){this.success=e.success,this.success?this.value=new mt(e.value):this.value=new yt(e.value)}}var ft=Object.defineProperty,bt=Object.getOwnPropertyDescriptor,pe=(o,e,t,n)=>{for(var a=n>1?void 0:n?bt(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(a=(n?r(e,t,a):r(a))||a);return n&&a&&ft(e,t,a),a};const O={YesButton:"YesButton",PayPalUpsellSlot:"PayPalUpsellSlot"};let Q=class extends F{constructor(){super(...arguments),this.yesButtonMode=O.YesButton,this.amount=5,this.currencyValidator=new Ze}render(){return d`
      <h3>${s("Thank you for donating!")}</h3>
      <button @click=${this.noThanksSelected} class="cta-button" id="no-button">
        ${s("Continue")}
      </button>
      <p class="or_separator"><span>${s("or")}</span></p>
      <h3>${s("Join our Monthly Giving Circle")}</h3>
      <p class="appeal">
        ${s("Monthly support helps us reliably plan for the future.")}
      </p>
      <div class="monthly-amount">
        <h1>${s("Enter your monthly amount")}</h1>
        <div class="amount-input">
          <span class="dollar-symbol">$</span>
          <input
            id="amount-input"
            type="text"
            tabindex="0"
            aria-label=${s("Monthly amount in dollars")}
            value=${this.amount}
            @input=${this.amountChanged}
            @keydown=${this.currencyValidator.keydown}
          />
        </div>
        <div class="error ${this.error?"":"hidden"}">${this.error}</div>
      </div>

      ${this.yesButton}
    `}get yesButton(){switch(this.yesButtonMode){case O.YesButton:return d`
          <button
            class="cta-button"
            tabindex="0"
            id="yes-button"
            @click=${this.yesSelected}
            .disabled=${this.error!==void 0}
          >
            ${s("YES, I'll donate monthly")}
          </button>
        `;case O.PayPalUpsellSlot:return d`
          <div class="paypal-upsell-slot-container">
            <div
              class="paypal-upsell-slot-blocker ${this.error?"":"hidden"}"
            ></div>
            <button class="cta-button" id="paypal-cover-button">
              ${s("YES, I'll donate monthly")}
            </button>
            <slot class="paypal-upsell-slot"></slot>
          </div>
        `;default:return J}}amountChanged(o){const t=o.target.value;t.length!==0&&this.handleCustomAmountInput(t)}handleCustomAmountInput(o){const e=parseFloat(o);isNaN(e)?this.error=d`${s("Please enter a valid amount.")}`:this.processAmount(e)}processAmount(o){if(o>=1e4){this.error=s(d`
        To make a donation of $10,000 or more, please contact our philanthropy
        department at
        <a href="mailto:donations@archive.org">donations@archive.org</a>
      `);return}if(o<1){this.amountInput&&this.amountInput.value.length>0&&(this.error=d`${s("The minimum donation amount is $1.")}`);return}this.error=void 0,this.amount=o;const e=new CustomEvent("amountChanged",{detail:{amount:this.amount}});this.dispatchEvent(e)}yesSelected(){const o=new CustomEvent("yesSelected",{detail:{amount:this.amount}});this.dispatchEvent(o)}noThanksSelected(){this.dispatchEvent(new Event("noThanksSelected"))}static get styles(){return[N,h`
        :host {
          --donation-upsell-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-upsell-cta-color--: var(
            --ia-donation-upsell-cta-button-color,
            var(--navy-blue)
          );
          --donation-upsell-cta-disabled-color--: var(
            --ia-donation-upsell-cta-button-disabled-color,
            rgba(109, 148, 201, 0.5)
          );
          /* Shifts the amount field left a little so the dollar sign and field read as centred */
          --donation-upsell-amount-input-offset--: var(
            --ia-donation-upsell-amount-input-offset,
            calc(var(--donation-upsell-base-font-size--) * -1)
          );
          --donation-upsell-error-color--: var(--color-danger);
        }

        .monthly-amount {
          background-color: var(--true-white);
          padding: var(--padding-sm) 0.625rem;
          border-radius: 5px;
          text-align: center;
          margin-bottom: var(--padding-sm);
          margin-top: 0;
        }

        .monthly-amount h1 {
          font-size: calc(var(--donation-upsell-base-font-size--) * 1.8);
          font-weight: bold;
          text-align: center;
          line-height: 1.2em;
          margin: 0;
          padding: var(--padding-sm) 0 0 0;
        }

        .hidden {
          display: none;
        }

        h3 {
          text-align: center;
          font-size: calc(var(--donation-upsell-base-font-size--) * 1.8);
          margin: 0 var(--donation-upsell-base-font-size--) var(--padding-sm)
            var(--donation-upsell-base-font-size--);
        }

        .appeal {
          text-align: center;
          font-size: calc(var(--donation-upsell-base-font-size--) * 1.6);
          margin: var(--padding-sm) var(--donation-upsell-base-font-size--);
        }

        .amount-input {
          transform: translate(var(--donation-upsell-amount-input-offset--), 0);
        }

        .amount-input .dollar-symbol {
          font-size: calc(var(--donation-upsell-base-font-size--) * 1.8);
          font-weight: bold;
        }

        .amount-input input {
          width: 100px;
          text-align: center;
          border: none;
          border-bottom: 1px solid gray;
          font-weight: bold;
          font-size: calc(var(--donation-upsell-base-font-size--) * 3.4);
        }

        .cta-button {
          font-size: calc(var(--donation-upsell-base-font-size--) * 2);
          display: block;
          width: 100%;
          margin-top: var(--padding-sm);
          padding: var(--donation-upsell-base-font-size--)
            calc(var(--donation-upsell-base-font-size--) * 2);
          background-color: var(--donation-upsell-cta-color--);
          color: var(--true-white);
          border-radius: 5px;
          border: 0;
          font-weight: bold;
          line-height: normal;
          outline: none;
          cursor: pointer;
        }

        .cta-button:disabled {
          background-color: var(--donation-upsell-cta-disabled-color--);
          cursor: not-allowed;
        }

        .paypal-upsell-slot {
          text-align: center;
        }

        .paypal-upsell-slot-blocker {
          position: absolute;
          width: 100%;
          height: calc(var(--donation-upsell-base-font-size--) * 4.5);
          bottom: 0;
          z-index: 250;
          cursor: not-allowed;
          background-color: rgba(255, 255, 255, 0.5);
        }

        .paypal-upsell-slot-blocker.hidden {
          display: none;
        }

        #paypal-cover-button {
          position: absolute;
          width: 100%;
          bottom: 0;
        }

        .paypal-upsell-slot-container {
          position: relative;
        }

        .error {
          font-size: calc(var(--donation-upsell-base-font-size--) * 1.4);
          margin: var(--padding-sm) 0;
          color: var(--donation-upsell-error-color--);
        }

        .or_separator {
          position: relative;
          margin: 0 calc(var(--donation-upsell-base-font-size--) * 2);
          font-size: calc(var(--donation-upsell-base-font-size--) * 2.6);
          font-weight: bold;
          text-transform: uppercase;
          text-align: center;
        }

        .or_separator:before {
          position: absolute;
          top: calc(50% - 1px);
          right: 0;
          left: 0;
          height: 2px;
          content: '';
          background: var(--mid-gray);
        }

        .or_separator span {
          display: inline-block;
          position: relative;
          padding: 0 var(--donation-upsell-base-font-size--);
          background: #f5f5f7;
        }
      `]}};pe([l({type:String})],Q.prototype,"yesButtonMode",2);pe([l({type:Number})],Q.prototype,"amount",2);pe([l({type:Object})],Q.prototype,"error",2);pe([u("#amount-input")],Q.prototype,"amountInput",2);Q=pe([$("ia-donation-upsell-modal-content")],Q);let vt=()=>({events:{},emit(o,...e){(this.events[o]||[]).forEach(t=>t(...e))},on(o,e){return(this.events[o]=this.events[o]||[]).push(e),()=>this.events[o]=(this.events[o]||[]).filter(t=>t!==e)}});function wt(o){return new Promise(e=>setTimeout(e,o))}var A;(function(o){o.retryNumber="retryNumber",o.owner="owner",o.dynamicImportLoaded="dynamicImportLoaded",o.hasBeenRetried="hasBeenRetried"})(A||(A={}));const Le="lazyLoaderService";class Ct{constructor(e){var t,n,a;this.emitter=vt(),this.container=(t=e?.container)!==null&&t!==void 0?t:document.head,this.retryCount=(n=e?.retryCount)!==null&&n!==void 0?n:2,this.retryInterval=(a=e?.retryInterval)!==null&&a!==void 0?a:1}on(e,t){return this.emitter.on(e,t)}loadBundle(e){return Z(this,void 0,void 0,function*(){let t,n;return e.module&&(t=this.loadScript({src:e.module,bundleType:"module"})),e.nomodule&&(n=this.loadScript({src:e.nomodule,bundleType:"nomodule"})),Promise.race([t,n])})}loadScript(e){return Z(this,void 0,void 0,function*(){return this.doLoad(e)})}doLoad(e){var t;return Z(this,void 0,void 0,function*(){const n=(t=e.retryNumber)!==null&&t!==void 0?t:0,a=`script[src='${e.src}'][async][${A.owner}='${Le}'][${A.retryNumber}='${n}']`;let i=this.container.querySelector(a);return i||(i=this.getScriptTag(Object.assign(Object.assign({},e),{retryNumber:n})),this.container.appendChild(i)),new Promise((r,c)=>{if(i.getAttribute(A.dynamicImportLoaded)){r();return}const p=e.scriptBeingRetried,b=i.onload||p?.onload;i.onload=f=>{b?.(f),i.setAttribute(A.dynamicImportLoaded,"true"),r()};const y=i.onerror||p?.onerror;i.onerror=f=>Z(this,void 0,void 0,function*(){const E=i.getAttribute(A.hasBeenRetried);if(n<this.retryCount&&!E){i.setAttribute(A.hasBeenRetried,"true"),yield wt(this.retryInterval*1e3);const Y=n+1;this.emitter.emit("scriptLoadRetried",e.src,Y),this.doLoad(Object.assign(Object.assign({},e),{retryNumber:Y,scriptBeingRetried:i}))}else E||this.emitter.emit("scriptLoadFailed",e.src,f),y?.(f),c(f)})})})}getScriptTag(e){var t;const n=e.src.replace("'",'"'),a=document.createElement("script"),i=e.retryNumber;a.setAttribute(A.owner,Le),a.setAttribute("src",n),a.setAttribute(A.retryNumber,i.toString()),a.async=!0;const r=(t=e.attributes)!==null&&t!==void 0?t:{};switch(Object.keys(r).forEach(c=>{a.setAttribute(c,r[c])}),e.bundleType){case"module":a.setAttribute("type",e.bundleType);break;case"nomodule":a.setAttribute(e.bundleType,"");break}return a}}class v{constructor(e){this.generator=e.generator}get(){return Z(this,void 0,void 0,function*(){return this.cachedResponse?this.cachedResponse:this.previousPromise?(this.previousPromise=this.previousPromise.then(e=>e),this.previousPromise):(this.previousPromise=this.generateSingletonAndCache(),this.previousPromise)})}generateSingletonAndCache(){return Z(this,void 0,void 0,function*(){const e=yield this.generator();return this.cachedResponse=e,e})}}class _e{constructor(e){this.logged_in_user=e?.logged_in_user,this.referrer=e?.referrer,this.fee_amount_covered=e?.fee_amount_covered,this.origin=e?.origin}}class Mt{constructor(e){this.customFields=new _e,this.paymentProvider=e.paymentProvider,this.paymentMethodNonce=e.paymentMethodNonce,this.recaptchaToken=e.recaptchaToken,this.customerId=e.customerId,this.deviceData=e.deviceData,this.upsellOnetimeTransactionId=e.upsellOnetimeTransactionId,this.bin=e.bin,this.binName=e.binName,this.amount=e.amount,this.donationType=e.donationType,this.customer=e.customer,this.billing=e.billing,e.customFields&&(this.customFields=e.customFields)}}const P={CreditCard:"Credit Card",PayPal:"PayPal",GooglePay:"Google Pay",Venmo:"Venmo",ApplePay:"Apple Pay"};class Pt{constructor(e){this.session=e.session,this.donationInfo=e.donationInfo,this.applePayInstance=e.applePayInstance,this.braintreeManager=e.braintreeManager}async onvalidatemerchant(e){return new Promise((t,n)=>{this.applePayInstance.performValidation({validationURL:e.validationURL,displayName:"Internet Archive"},(a,i)=>{a?(this.delegate?.paymentFailed(a),this.session.abort(),n(`Merchant validation error: ${a}`)):(this.session.completeMerchantValidation(i),t())})})}async oncancel(){this.delegate?.paymentCancelled()}async onpaymentauthorized(e){let t;try{t=await this.applePayInstance.tokenize({token:e.payment.token})}catch(y){this.delegate?.paymentFailed(y),this.session.completePayment(ApplePaySession.STATUS_FAILURE);return}const n=e.payment,a=n.billingContact,i=n.shippingContact,[r,c]=a?.addressLines??[],p=new ue({streetAddress:r,extendedAddress:c,locality:a?.locality,region:a?.administrativeArea,postalCode:a?.postalCode,countryCodeAlpha2:a?.countryCode}),b=new he({email:i?.emailAddress,firstName:i?.givenName,lastName:i?.familyName});try{const y=await this.braintreeManager.submitDonation({nonce:t.nonce,paymentProvider:P.ApplePay,donationInfo:this.donationInfo,billingInfo:p,customerInfo:b});y.success?(this.delegate?.paymentComplete(y),this.session.completePayment(ApplePaySession.STATUS_SUCCESS)):(this.delegate?.paymentFailed("Failure submitting data"),this.session.completePayment(ApplePaySession.STATUS_FAILURE))}catch(y){this.delegate?.paymentFailed(y),this.session.completePayment(ApplePaySession.STATUS_FAILURE)}}}class St{constructor(e){this.braintreeManager=e.braintreeManager,this.applePayClient=e.applePayClient,this.applePaySessionManager=e.applePaySessionManager,this.instance=e.instancePromisedSingleton??new v({generator:async()=>{if(!this.applePaySessionManager.canMakePayments())return;const t=await this.braintreeManager.instance.get();return this.applePayClient.create({client:t})}})}async isAvailable(){try{return!!await this.instance.get()}catch{return!1}}async createPaymentRequest(e,t){const n=await this.instance.get();if(!n)throw new Error("Apple Pay is not available in this browser");const a=t.donationType===w.OneTime?"Internet Archive":"Internet Archive Monthly",i=n.createPaymentRequest({total:{label:a,amount:`${t.total}`},requiredBillingContactFields:["postalAddress"],requiredShippingContactFields:["name","email"]}),r=this.applePaySessionManager.createNewPaymentSession(i),c=new Pt({donationInfo:t,session:r,applePayInstance:n,braintreeManager:this.braintreeManager});return r.onvalidatemerchant=c.onvalidatemerchant.bind(c),r.onpaymentauthorized=c.onpaymentauthorized.bind(c),r.oncancel=c.oncancel.bind(c),r.begin(),c}}const le=class le{canMakePayments(){return"ApplePaySession"in window&&ApplePaySession.supportsVersion(le.VERSION)&&ApplePaySession.canMakePayments()}createNewPaymentSession(e){return new ApplePaySession(le.VERSION,e)}};le.VERSION=3;let Se=le;class Ft extends Error{constructor(e){super(e),this.name="DonationFormError"}}const It=new Promise(()=>{});class $t{constructor(e){this.instance=new v({generator:async()=>{const t=await this.braintreeManager.instance.get();return this.createHostedFields(t)}}),this.emitter=te(),this.braintreeManager=e.braintreeManager,this.hostedFieldClient=e.hostedFieldClient,this.hostedFieldConfig=e.hostedFieldConfig,this.maxRetryCount=e.maxRetryCount??2,this.loadTimeout=(e.loadTimeout??6)*1e3}on(e,t){return this.emitter.on(e,t)}async createHostedFields(e,t=0){this.hostedFieldConfig.hostedFieldContainer.resetHostedFields();let n;try{const a=new Promise((r,c)=>{n=window.setTimeout(()=>{c(new Ft("Timeout loading Hosted Fields"))},this.loadTimeout)}),i=Promise.resolve().then(()=>this.hostedFieldClient.create({client:e,styles:this.hostedFieldConfig.hostedFieldStyle,fields:this.hostedFieldConfig.hostedFieldFieldOptions})).catch(r=>{if(r instanceof Error&&r.message.includes("Hosted Fields timed out"))return It;throw r});return i.catch(()=>{}),await Promise.race([a,i])}catch(a){if(t>=this.maxRetryCount)throw this.emitter.emit("hostedFieldsFailed",a),a;const i=t+1;return this.emitter.emit("hostedFieldsRetry",i),this.createHostedFields(e,i)}finally{window.clearTimeout(n)}}async tokenizeHostedFields(){return(await this.instance.get())?.tokenize()}async focusField(e){await(await this.instance.get())?.focus(e)}markFieldErrors(e){this.hostedFieldConfig.hostedFieldContainer.markFieldErrors(e)}removeFieldErrors(e){this.hostedFieldConfig.hostedFieldContainer.removeFieldErrors(e)}showErrorMessage(e){this.hostedFieldConfig.hostedFieldContainer.showErrorMessage(e)}hideErrorMessage(){this.hostedFieldConfig.hostedFieldContainer.hideErrorMessage()}}class Et{async isBrowserSupported(){return(await this.paymentsClient.isReadyToPay({apiVersion:2,apiVersionMinor:0,allowedPaymentMethods:[{type:"CARD",parameters:{allowedAuthMethods:["PAN_ONLY"],allowedCardNetworks:["AMEX","DISCOVER","INTERAC","JCB","MASTERCARD","VISA"]}}],existingPaymentMethodRequired:!1})).result}constructor(e){this.braintreeManager=e.braintreeManager,this.googlePayMerchantId=e.googlePayMerchantId,this.googlePayBraintreeClient=e.googlePayBraintreeClient,this.paymentsClient=e.googlePaymentsClient,this.instance=new v({generator:async()=>{const t=await this.braintreeManager.instance.get();return this.googlePayBraintreeClient.create({client:t,googlePayVersion:2,googleMerchantId:this.googlePayMerchantId})}})}}class kt{constructor(e){this.donationInfo=e.donationInfo,this.paypalInstance=e.paypalInstance}async payment(){const t=this.donationInfo.donationType===w.OneTime?"checkout":"vault",n={flow:t,intent:"capture",enableShippingAddress:!0};return t==="checkout"?(n.amount=this.donationInfo.total,n.currency="USD"):n.billingAgreementDescription=`Subscribe to donate ${ce(this.donationInfo.total,{symbol:"$"}).format()} monthly`,this.delegate?.payPalPaymentStarted(this,n),this.paypalInstance.createPayment(n)}async onAuthorize(e){const t=await this.paypalInstance.tokenizePayment(e);return this.delegate?.payPalPaymentAuthorized(this,t),t}async onConfirm(e){const t=await this.paypalInstance.tokenizePayment(e);return this.delegate?.payPalPaymentConfirmed(this,t),t}onCancel(e){this.delegate?.payPalPaymentCancelled(this,e)}onError(e){console.error("PayPal error",e),this.delegate?.payPalPaymentError(this,e)}}class Tt{constructor(e){this.braintreeManager=e.braintreeManager,this.paypalClient=e.paypalClient,this.paypalButtonGenerator=e.paypalButton,this.hostingEnvironment=e.hostingEnvironment,this.instance=new v({generator:async()=>{const t=await this.braintreeManager.instance.get();return this.paypalClient.create({client:t})}})}async renderPayPalButton(e){const t=this.hostingEnvironment===W.Development?"sandbox":"production",n=await this.instance.get();if(!n)return;const a=new kt({donationInfo:e.donationInfo,paypalInstance:n}),i=window.paypal?.FUNDING?.VENMO;return this.paypalButtonGenerator.render({env:t,style:e.style,payment:a.payment.bind(a),onAuthorize:a.onAuthorize.bind(a),onCancel:a.onCancel.bind(a),onError:a.onError.bind(a),funding:i?{disallowed:[i]}:void 0},e.selector),a}}class At{constructor(e){this.braintreeManager=e.braintreeManager,this.venmoClient=e.venmoClient,this.venmoProfileId=e.venmoProfileId,this.instance=e.instancePromisedSingleton??new v({generator:async()=>{const t=await this.braintreeManager.instance.get();return this.venmoClient.create({client:t,profileId:this.venmoProfileId})}})}async isBrowserSupported(){return this.isMobileFirefox()?!1:(await this.instance.get())?.isBrowserSupported()??!1}async startPayment(){return(await this.instance.get()).tokenize()}isMobileFirefox(){const e=navigator.userAgent.indexOf("FxiOS")!==-1,t=navigator.userAgent.indexOf("Firefox")!==-1,n=navigator.userAgent.indexOf("Mobile")!==-1;return(t||e)&&n}}class xt{constructor(e){this.creditCardHandler=new v({generator:async()=>{const t=await this.paymentClients.hostedFields.get(),n=new $t({braintreeManager:this.braintreeManager,hostedFieldClient:t,hostedFieldConfig:this.hostedFieldConfig});return n.on("hostedFieldsRetry",a=>{this.emitter.emit("hostedFieldsRetry",a)}),n.on("hostedFieldsFailed",a=>{this.emitter.emit("hostedFieldsFailed",a)}),n}}),this.applePayHandler=new v({generator:async()=>{const t=await this.paymentClients.applePay.get();return new St({braintreeManager:this.braintreeManager,applePayClient:t,applePaySessionManager:new Se})}}),this.venmoHandler=new v({generator:async()=>{const t=await this.paymentClients.venmo.get();if(this.venmoProfileId)return new At({braintreeManager:this.braintreeManager,venmoClient:t,venmoProfileId:this.venmoProfileId})}}),this.paypalHandler=new v({generator:async()=>{const[t,n]=await Promise.all([this.paymentClients.payPal.get(),this.paymentClients.paypalLibrary.get()]);return new Tt({braintreeManager:this.braintreeManager,paypalClient:t,paypalButton:n.Button,hostingEnvironment:this.hostingEnvironment})}}),this.googlePayHandler=new v({generator:async()=>{const[t,n]=await Promise.all([this.paymentClients.googlePayBraintreeClient.get(),this.paymentClients.googlePaymentsClient.get()]);return new Et({braintreeManager:this.braintreeManager,googlePayMerchantId:this.googlePayMerchantId,googlePayBraintreeClient:t,googlePaymentsClient:n})}}),this.hostingEnvironment=W.Development,this.emitter=te(),this.braintreeManager=e.braintreeManager,this.venmoProfileId=e.venmoProfileId,this.googlePayMerchantId=e.googlePayMerchantId,this.paymentClients=e.paymentClients,this.hostingEnvironment=e.hostingEnvironment,this.hostedFieldConfig=e.hostedFieldConfig}on(e,t){return this.emitter.on(e,t)}}class Dt{constructor(e){this.emitter=te(),this.instance=new v({generator:async()=>(await this.paymentClients.braintreeClient.get()).create({authorization:this.authorizationToken})}),this.deviceDataCollectionStarted=!1,this.authorizationToken=e.authorizationToken,this.endpointManager=e.endpointManager,this.paymentClients=e.paymentClients,this.referrer=e.referrer,this.loggedInUser=e.loggedInUser,this.origin=e.origin,this.paymentProviders=new xt({braintreeManager:this,paymentClients:this.paymentClients,venmoProfileId:e.venmoProfileId,googlePayMerchantId:e.googlePayMerchantId,hostingEnvironment:e.hostingEnvironment,hostedFieldConfig:e.hostedFieldConfig}),this.paymentProviders.on("hostedFieldsRetry",t=>{this.emitter.emit("paymentProvidersHostedFieldsRetry",t)}),this.paymentProviders.on("hostedFieldsFailed",t=>{this.emitter.emit("paymentProvidersHostedFieldsFailed",t)})}on(e,t){return this.emitter.on(e,t)}async startup(){return this.collectDeviceData()}async submitDonation(e){const{amount:t,coverFees:n}=e.donationInfo,a=V.calculateTotal(t,n),i=n?V.calculateFeeAmount(t):0,r=new _e({fee_amount_covered:i,logged_in_user:this.loggedInUser,referrer:this.referrer,origin:this.origin}),c=new Mt({deviceData:this.deviceData,paymentProvider:e.paymentProvider,paymentMethodNonce:e.nonce,amount:a,donationType:e.donationInfo.donationType,customer:e.customerInfo,billing:e.billingInfo,customFields:r,upsellOnetimeTransactionId:e.upsellOnetimeTransactionId,customerId:e.customerId,recaptchaToken:e.recaptchaToken,bin:e.bin,binName:e.binName}),p=await this.endpointManager.submitData(c);return new Re(p)}async submitUpsellDonation(e){const t=e.oneTimeDonationResponse,n=new V({amount:e.amount,donationType:w.Upsell,coverFees:!1});return this.submitDonation({nonce:t.paymentMethodNonce,paymentProvider:t.paymentProvider,customerId:t.customer_id,donationInfo:n,customerInfo:t.customer,billingInfo:t.billing,upsellOnetimeTransactionId:t.transaction_id})}donationSuccessful(e){this.endpointManager.donationSuccessful(e)}async collectDeviceData(){if(this.deviceDataCollectionStarted)return;this.deviceDataCollectionStarted=!0;const e=await this.instance.get();if(!e)return;const n=await(await this.paymentClients.dataCollector.get()).create({client:e,kount:!1,paypal:!0});this.deviceData=n.deviceData}setReferrer(e){this.referrer=e}setLoggedInUser(e){this.loggedInUser=e}setOrigin(e){this.origin=e}}class Lt{constructor(e,t){this.braintreeClient=new v({generator:async()=>(await this.loadBraintreeScript("client"),window.braintree.client)}),this.dataCollector=new v({generator:async()=>(await this.loadBraintreeScript("data-collector"),window.braintree.dataCollector)}),this.hostedFields=new v({generator:async()=>(await this.loadBraintreeScript("hosted-fields"),window.braintree.hostedFields)}),this.venmo=new v({generator:async()=>(await this.loadBraintreeScript("venmo"),window.braintree.venmo)}),this.payPal=new v({generator:async()=>(await this.loadBraintreeScript("paypal-checkout"),window.braintree.paypalCheckout)}),this.applePay=new v({generator:async()=>(await this.loadBraintreeScript("apple-pay"),window.braintree.applePay)}),this.googlePayBraintreeClient=new v({generator:async()=>(await this.loadBraintreeScript("google-payment"),window.braintree.googlePayment)}),this.googlePaymentsClient=new v({generator:async()=>(await this.lazyLoader.loadScript({src:"https://pay.google.com/gp/p/js/pay.js"}),new google.payments.api.PaymentsClient({environment:this.environment===W.Development?"TEST":"PRODUCTION"}))}),this.recaptchaLibrary=new v({generator:()=>new Promise(n=>{window.iaDonationFormGrecaptchaLoaded=()=>{setTimeout(()=>{delete window.iaDonationFormGrecaptchaLoaded},10),n(window.grecaptcha)},this.lazyLoader.loadScript({src:"https://www.google.com/recaptcha/api.js?onload=iaDonationFormGrecaptchaLoaded&render=explicit"})})}),this.paypalLibrary=new v({generator:async()=>(await this.lazyLoader.loadScript({src:"https://www.paypalobjects.com/api/checkout.js",attributes:{"data-version-4":"","log-level":"warn"}}),window.paypal)}),this.braintreeVersion="3.62.2",this.environment=W.Development,this.lazyLoader=e,this.environment=t}async loadBraintreeScript(e){const t=this.environment===W.Production?"min.js":"js",n=`https://js.braintreegateway.com/web/${this.braintreeVersion}/js/${e}.${t}`;await this.lazyLoader.loadScript({src:n})}}class Bt{constructor(e){this.hostedFieldFieldOptions=e.hostedFieldFieldOptions,this.hostedFieldStyle=e.hostedFieldStyle,this.hostedFieldContainer=e.hostedFieldContainer}}var zt=Object.defineProperty,Ot=Object.getOwnPropertyDescriptor,oe=(o,e,t,n)=>{for(var a=n>1?void 0:n?Ot(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(a=(n?r(e,t,a):r(a))||a);return n&&a&&zt(e,t,a),a};let U=class extends F{constructor(){super(...arguments),this.amount=5,this.currencyType="USD",this.donationType=w.OneTime,this.confirmDonation=()=>{},this.cancelDonation=()=>{}}get formattedAmount(){return ce(this.amount,{symbol:this.currencySymbol}).format()}get confirmationText(){return s(d`
      <p>
        You are about to make a <b>${this.donationType}</b> donation of
        <b>${this.formattedAmount} ${this.currencyType}</b> to the Internet
        Archive.
      </p>
    `)}get confirmUpsellText(){return s(d`
      <p>
        You are about to begin making <b>monthly</b> donations of
        <b>${this.formattedAmount} ${this.currencyType}</b> to the Internet
        Archive. (Your first recurring contribution will be next month.)
      </p>
    `)}get confirmCTA(){return this.donationType===w.Upsell?s("Start monthly donation"):s("Complete donation")}render(){return d`
      ${this.donationType===w.Upsell?this.confirmUpsellText:this.confirmationText}

      <div class="cta-group">
        <button id="confirm" @click=${()=>this.confirmDonation()}>
          ${this.confirmCTA}
        </button>
        <button id="cancel" @click=${()=>this.cancelDonation()}>
          ${s("Cancel")}
        </button>
      </div>
    `}static get styles(){return[N,h`
        :host {
          --donation-confirm-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-confirm-cta-color--: var(
            --ia-donation-upsell-cta-button-color,
            var(--navy-blue)
          );
          --donation-confirm-cta-disabled-color--: var(
            --ia-donation-upsell-cta-button-disabled-color,
            rgba(109, 148, 201, 0.5)
          );

          display: block;
        }

        button {
          outline: none;
          cursor: pointer;
        }

        button#confirm {
          font-size: calc(var(--donation-confirm-base-font-size--) * 2);
          display: block;
          width: 100%;
          margin-top: var(--padding-sm);
          padding: var(--donation-confirm-base-font-size--)
            calc(var(--donation-confirm-base-font-size--) * 2);
          background-color: var(--donation-confirm-cta-color--);
          color: var(--true-white);
          border-radius: 5px;
          border: 0;
          font-weight: bold;
          line-height: normal;
        }

        button#cancel {
          margin-top: var(--donation-confirm-base-font-size--);
          border: 0;
          text-decoration: underline;
          background-color: transparent;
        }

        button:disabled {
          background-color: var(--donation-confirm-cta-disabled-color--);
          cursor: not-allowed;
        }
      `]}get currencySymbol(){switch(this.currencyType){case"AUD":return"AU$";case"BRL":return"R$";case"CAD":return"CA$";case"CHF":return"Fr";case"CNY":return"¥";case"CZK":return"Kč";case"DKK":return"Kr";case"EUR":return"€";case"GBP":return"£";case"HKD":return"HK$";case"HUF":return"Ft";case"ILS":return"₪";case"JPY":return"¥";case"MXN":return"MX$";case"MYR":return"RM";case"NOK":return"kr";case"PLN":return"zł";case"RUB":return"₽";case"SEK":return"kr";case"SGD":return"S$";case"THB":return"฿";case"TWD":return"NT$";default:return"$"}}};oe([l({type:Number})],U.prototype,"amount",2);oe([l({type:String})],U.prototype,"currencyType",2);oe([l({type:String})],U.prototype,"donationType",2);oe([l({attribute:!1})],U.prototype,"confirmDonation",2);oe([l({attribute:!1})],U.prototype,"cancelDonation",2);U=oe([$("ia-donation-confirm-modal")],U);var Ht=Object.getOwnPropertyDescriptor,Nt=(o,e,t,n)=>{for(var a=n>1?void 0:n?Ht(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(a=r(a)||a);return a};let Be=class extends F{render(){return d`
      <div class="container">
        <a
          href="https://help.archive.org/help/why-is-there-a-problem-processing-my-donation/"
          rel="noopener"
          target="_blank"
        >
          ${s("Questions?")}
        </a>
      </div>
    `}static get styles(){return[N,h`
        :host {
          --donation-error-modal-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-error-modal-link-top-margin--: var(
            --ia-donation-error-modal-link-top-margin,
            var(--donation-error-modal-base-font-size--)
          );
          --donation-error-modal-link-color--: var(
            --ia-donation-error-modal-link-color,
            var(--mid-gray)
          );
          --donation-error-modal-link-font-size--: var(
            --ia-donation-error-modal-link-font-size,
            calc(var(--donation-error-modal-base-font-size--) * 1.4)
          );
        }

        .container {
          margin-top: var(--donation-error-modal-link-top-margin--);
          text-align: center;
        }

        a,
        a:link,
        a:visited {
          color: var(--donation-error-modal-link-color--);
          font-size: var(--donation-error-modal-link-font-size--);
        }
      `]}};Be=Nt([$("ia-donation-error-modal-content")],Be);const re={Blue:"#497fbf",Green:"#55A183",Red:"#691916"};class be{constructor(e){this.modalManager=e.modalManager,this.braintreeManager=e.braintreeManager,this.analytics=e.analytics}closeModal(){this.modalManager.closeModal()}showProcessingModal(){const e=new _({headerColor:re.Blue,showProcessingIndicator:!0,closeOnBackdropClick:!1,showCloseButton:!1,processingImageMode:"processing",title:d`${s("Processing...")}`});this.modalManager.showModal({config:e})}showThankYouModal(e){const t=new _({showProcessingIndicator:!0,processingImageMode:"complete",headerColor:re.Green,title:d`${s("Thank You!")}`});this.modalManager.showModal({config:t});let a=`Donated-${e.successResponse.paymentProvider.replace(/\s+/g,"")}`;e.upsellSuccessResponse&&(a+="-upsell");const i=e.successResponse.donationType;this.analytics.logDonationFlowEvent(a,i),this.braintreeManager.donationSuccessful(e)}showErrorModal(e){const t=new _({headerColor:re.Red,title:d`${s("Processing error")}`,headline:d`${s("There's been a problem completing your donation.")}`,message:d`${e.message}`});this.modalManager.showModal({config:t,userClosedModalCallback:e.userClosedModalCallback,customModalContent:d`
        <ia-donation-error-modal-content></ia-donation-error-modal-content>
      `})}showConfirmationStepModal(e){const t=e.donationType===w.Upsell?s("Confirm monthly donation"):s("Complete donation"),n=new _({closeOnBackdropClick:!1,headerColor:re.Green,title:d`${t}`,message:d`
        <ia-donation-confirm-modal
          .amount=${e.amount}
          .currencyType=${e.currencyType}
          .donationType=${e.donationType}
          .confirmDonation=${e.confirmDonationCB}
          .cancelDonation=${e.cancelDonationCB}
        ></ia-donation-confirm-modal>
      `});return this.modalManager.showModal({config:n,userClosedModalCallback:e.cancelDonationCB})}showUpsellModal(e){const t=new _({headerColor:re.Green,title:d`${s("Donation received")}`,processingImageMode:"complete",showProcessingIndicator:!0}),n=be.getDefaultUpsellAmount(e.oneTimeAmount);e.amountChanged?.(n);const a=d`
      <ia-donation-upsell-modal-content
        .amount=${n}
        .yesButtonMode=${e.ctaMode??O.YesButton}
        @yesSelected=${i=>e.yesSelected?.(i.detail.amount)}
        @noThanksSelected=${e.noSelected}
        @amountChanged=${i=>e.amountChanged?.(i.detail.amount)}
      >
        <slot name="paypal-upsell-button"></slot>
      </ia-donation-upsell-modal-content>
    `;return this.modalManager.showModal({config:t,customModalContent:a,userClosedModalCallback:e.userClosedModalCallback})}async startDonationSubmissionFlow(e){this.showProcessingModal();try{const t=await this.braintreeManager.submitDonation(e);if(t.success)this.handleSuccessfulDonationResponse(e.donationInfo,t.value);else{const n=t.value;this.showErrorModal({message:n.message})}return t}catch(t){this.showErrorModal({message:`${t}`}),console.error("error getting a response",t);return}}async upsellModalYesSelected(e,t){this.showProcessingModal();try{const n=await this.braintreeManager.submitUpsellDonation({oneTimeDonationResponse:e,amount:t});if(n.success)this.showThankYouModal({successResponse:e,upsellSuccessResponse:n.value});else{const a=n.value;this.showErrorModal({message:a.message})}return n}catch(n){this.showErrorModal({message:`${n}`}),console.error("error getting a response",n);return}}static getDefaultUpsellAmount(e){return e<=10?8:e<=25?10:e<=100?25:50}handleSuccessfulDonationResponse(e,t){switch(e.donationType){case w.OneTime:this.showUpsellModal({oneTimeAmount:t.amount,yesSelected:n=>{this.upsellModalYesSelected(t,n)},noSelected:()=>{this.showThankYouModal({successResponse:t})},userClosedModalCallback:()=>{this.showThankYouModal({successResponse:t})}});break;case w.Monthly:this.showThankYouModal({successResponse:t});break}}}class Rt{constructor(e){this.braintreeManager=e.braintreeManager,this.donationFlowModalManager=e.donationFlowModalManager}async paymentInitiated(e,t){this.donationFlowModalManager.showProcessingModal();const n=await this.braintreeManager.paymentProviders.applePayHandler.get();this.applePayDataSource=await n.createPaymentRequest(t,e),this.applePayDataSource&&(this.applePayDataSource.delegate=this)}async modalYesSelected(e,t){this.donationFlowModalManager.showProcessingModal();const n=await this.braintreeManager.submitUpsellDonation({oneTimeDonationResponse:e,amount:t});if(n.success)this.donationFlowModalManager.showThankYouModal({successResponse:e,upsellSuccessResponse:n.value});else{const a=n.value;this.donationFlowModalManager.showErrorModal({message:a.message})}}paymentComplete(e){if(e.success){const t=e.value;this.applePayDataSource?.donationInfo.donationType===w.OneTime?this.donationFlowModalManager.showUpsellModal({oneTimeAmount:t.amount,yesSelected:this.modalYesSelected.bind(this,t),noSelected:()=>this.donationFlowModalManager.showThankYouModal({successResponse:t}),userClosedModalCallback:()=>this.donationFlowModalManager.showThankYouModal({successResponse:t})}):this.donationFlowModalManager.showThankYouModal({successResponse:t})}else{const t=e.value;this.donationFlowModalManager.showErrorModal({message:t.message})}}paymentFailed(){this.donationFlowModalManager.showErrorModal({message:s("Payment failed")})}paymentCancelled(){this.donationFlowModalManager.closeModal()}}const z={Number:"number",CVV:"cvv",ExpirationDate:"expirationDate"};class _t{fieldFor(e){switch(e){case z.Number:return this.number;case z.CVV:return this.cvv;case z.ExpirationDate:return this.expirationDate}}markFieldErrors(e){e.forEach(t=>{const n=this.fieldFor(t);n.parentElement.error=!0})}removeFieldErrors(e){e.forEach(t=>{const n=this.fieldFor(t);n.parentElement.error=!1})}showErrorMessage(e){const t=e??"Some payment information below is missing or incorrect.";this.errorContainer.textContent=t,this.errorContainer.style.display="block"}hideErrorMessage(){this.errorContainer.style.display="none"}resetHostedFields(){[this.number,this.cvv,this.expirationDate].forEach(t=>{for(;t.firstChild;)t.firstChild.remove()})}constructor(e){this.number=e.number,this.cvv=e.cvv,this.expirationDate=e.expirationDate,this.errorContainer=e.errorContainer}}class Vt{constructor(e){this.started=!1,this.braintreeManager=e.braintreeManager,this.donationFlowModalManager=e.donationFlowModalManager,this.recaptchaManager=e.recaptchaManager,this.emitter=te()}on(e,t){return this.emitter.on(e,t)}async startup(){if(this.started)return;this.started=!0;const e=await this.braintreeManager.paymentProviders.creditCardHandler.get(),t=await e.instance.get();t?.on("focus",n=>{const{emittedBy:a,fields:i}=n,{container:r}=i[a];r.parentElement.error=!1,e.hideErrorMessage()}),t?.on("blur",n=>{const{emittedBy:a,fields:i}=n,{container:r,isEmpty:c,isValid:p}=i[a];!c&&!p&&(r.parentElement.error=!0)}),t?.on("validityChange",n=>{const{fields:a}=n,i=a.cvv.isValid&&a.expirationDate.isValid&&a.number.isValid;this.emitter.emit("validityChanged",i)})}async tokenizeFields(){const e=await this.braintreeManager.paymentProviders.creditCardHandler.get();try{return await e.tokenizeHostedFields()}catch(t){this.handleHostedFieldTokenizationError(t);return}}async paymentInitiated(e,t,n){let a;try{a=await this.recaptchaManager.execute()}catch{this.donationFlowModalManager.showErrorModal({message:s("Recaptcha failure")});return}this.donationFlowModalManager.startDonationSubmissionFlow({nonce:e.nonce,paymentProvider:P.CreditCard,recaptchaToken:a,bin:e.details.bin,donationInfo:t,customerInfo:n.customer,billingInfo:n.billing})}async handleHostedFieldTokenizationError(e){const t=await this.braintreeManager.paymentProviders.creditCardHandler.get();switch(t.showErrorMessage(),e.code){case"HOSTED_FIELDS_FIELDS_EMPTY":t.markFieldErrors([z.Number,z.CVV,z.ExpirationDate]);break;case"HOSTED_FIELDS_FIELDS_INVALID":Object.keys(e.details.invalidFields).forEach(n=>{t.markFieldErrors([n])});break;case"HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED":t.markFieldErrors([z.CVV]);break}}}class Ut{constructor(e){this.emitter=te(),this.braintreeManager=e.braintreeManager,this.donationFlowModalManager=e.donationFlowModalManager}on(e,t){return this.emitter.on(e,t)}async paymentInitiated(e){const t=await this.braintreeManager.paymentProviders.googlePayHandler.get(),n=await t.instance.get(),a=n.createPaymentDataRequest({emailRequired:!0,transactionInfo:{currencyCode:"USD",totalPriceStatus:"FINAL",totalPrice:`${e.total}`}}),i=a.allowedPaymentMethods[0];i.parameters.billingAddressRequired=!0,i.parameters.billingAddressParameters={format:"FULL",phoneNumberRequired:!1};try{const r=await t.paymentsClient.loadPaymentData(a),c=await n.parseResponse(r),p=r.paymentMethodData.info?.billingAddress,b=p?.name?.trim();let y=b,f="";const E=b?.lastIndexOf(" ")??-1;b&&E>0&&(y=b.substring(0,E),f=b.substring(E+1));const Y=new he({email:r.email,firstName:y,lastName:f}),ve=new ue({streetAddress:p?.address1,extendedAddress:p?.address2,locality:p?.locality,region:p?.administrativeArea,postalCode:p?.postalCode,countryCodeAlpha2:p?.countryCode});this.donationFlowModalManager.startDonationSubmissionFlow({nonce:c.nonce,paymentProvider:P.GooglePay,bin:c.details.bin,binName:c.binData.issuingBank,donationInfo:e,customerInfo:Y,billingInfo:ve})}catch{this.emitter.emit("paymentCancelled"),this.donationFlowModalManager.closeModal()}}}class qt{constructor(e){this.upsellButtonDataSource=e.upsellButtonDataSource,this.oneTimePayload=e.oneTimePayload,this.oneTimeSuccessResponse=e.oneTimeSuccessResponse}}class jt{constructor(e){this.emitter=te(),this.braintreeManager=e.braintreeManager,this.donationFlowModalManager=e.donationFlowModalManager}updateDonationInfo(e){this.buttonDataSource&&(this.buttonDataSource.donationInfo=e)}updateUpsellDonationInfo(e){this.upsellButtonDataSourceContainer&&(this.upsellButtonDataSourceContainer.upsellButtonDataSource.donationInfo=e)}on(e,t){return this.emitter.on(e,t)}async payPalPaymentStarted(e,t){this.emitter.emit("payPalPaymentStarted",e,t)}async payPalPaymentAuthorized(e,t){const{donationType:n,total:a}=e.donationInfo;this.donationFlowModalManager.showConfirmationStepModal({donationType:n,amount:a,currencyType:"USD",confirmDonationCB:()=>{this.payPalPaymentConfirmed(e,t)},cancelDonationCB:()=>{this.donationFlowModalManager.closeModal(),this.payPalPaymentCancelled(e,{})}})}async payPalPaymentConfirmed(e,t){this.emitter.emit("payPalPaymentConfirmed",e,{}),this.donationFlowModalManager.showProcessingModal();const n=e.donationInfo.donationType,a=t.details,i=new he({email:a?.email,firstName:a?.firstName,lastName:a?.lastName}),r=a?.shippingAddress,c=new ue({streetAddress:r?.line1,extendedAddress:r?.line2,locality:r?.city,region:r?.state,postalCode:r?.postalCode,countryCodeAlpha2:r?.countryCode}),p=this.upsellButtonDataSourceContainer?.oneTimeSuccessResponse.transaction_id,b=await this.braintreeManager.submitDonation({nonce:t.nonce,paymentProvider:P.PayPal,donationInfo:e.donationInfo,customerInfo:i,billingInfo:c,upsellOnetimeTransactionId:p});if(!b.success){const f=b.value;this.donationFlowModalManager.showErrorModal({message:f.message});return}const y=b.value;switch(n){case w.OneTime:this.showUpsellModal(t,y);break;case w.Monthly:this.donationFlowModalManager.showThankYouModal({successResponse:y});break;case w.Upsell:this.upsellButtonDataSourceContainer?this.donationFlowModalManager.showThankYouModal({successResponse:this.upsellButtonDataSourceContainer.oneTimeSuccessResponse,upsellSuccessResponse:y}):this.donationFlowModalManager.showErrorModal({message:s("Error setting up monthly donation")});break}}async payPalPaymentCancelled(e,t){this.emitter.emit("payPalPaymentCancelled",e,t)}async payPalPaymentError(e,t){this.emitter.emit("payPalPaymentError",e,t),console.error("PayPalFlowHandler payment error:",e,e.donationInfo,t)}async renderPayPalButton(e){const t=await this.braintreeManager.paymentProviders.paypalHandler.get();this.buttonDataSource=await t.renderPayPalButton({selector:"#paypal-button",style:{color:"blue",label:"paypal",shape:"rect",size:"medium",tagline:!1},donationInfo:e}),this.buttonDataSource&&(this.buttonDataSource.delegate=this)}async showUpsellModal(e,t){this.donationFlowModalManager.showUpsellModal({oneTimeAmount:t.amount,amountChanged:this.upsellAmountChanged.bind(this),noSelected:()=>{this.donationFlowModalManager.showThankYouModal({successResponse:t})},ctaMode:O.PayPalUpsellSlot,userClosedModalCallback:()=>{this.donationFlowModalManager.showThankYouModal({successResponse:t})}});const n=be.getDefaultUpsellAmount(t.amount),a=new V({amount:n,donationType:w.Upsell,coverFees:!1});this.upsellButtonDataSourceContainer||this.renderUpsellPayPalButton({donationInfo:a,oneTimePayload:e,oneTimeSuccessResponse:t})}upsellAmountChanged(e){this.upsellButtonDataSourceContainer&&(this.upsellButtonDataSourceContainer.upsellButtonDataSource.donationInfo.amount=e)}async renderUpsellPayPalButton(e){const n=await(await this.braintreeManager.paymentProviders.paypalHandler.get()).renderPayPalButton({selector:"#paypal-upsell-button",style:{color:"blue",label:"paypal",shape:"rect",size:"responsive",tagline:!1},donationInfo:e.donationInfo});n?(n.delegate=this,this.upsellButtonDataSourceContainer=new qt({upsellButtonDataSource:n,oneTimePayload:e.oneTimePayload,oneTimeSuccessResponse:e.oneTimeSuccessResponse})):console.error("error rendering paypal upsell button")}}class ze{constructor(e){this.contactInfo=e.contactInfo,this.donationInfo=e.donationInfo}}class Gt{constructor(e){this.persistenceKey="venmoRestorationStateInfo",this.storageSystem=e?.storageSystem??this.getAvailableStorageSystem(()=>localStorage)??this.getAvailableStorageSystem(()=>sessionStorage)}clearState(){this.storageSystem?.removeItem(this.persistenceKey)}persistState(e,t){const n=new ze({contactInfo:e,donationInfo:t}),a=JSON.stringify(n);this.storageSystem?.setItem(this.persistenceKey,a)}async getRestorationState(){const e=this.storageSystem?.getItem(this.persistenceKey);if(!e){console.error("restoreState: No stored data");return}const t=JSON.parse(e);if(!t){console.error("restoreState: Data could not be deserialized");return}return new ze(t)}getAvailableStorageSystem(e){try{const t=e();return t.setItem("foo","bar"),t.removeItem("foo"),t}catch{return}}}class Kt{constructor(e){this.braintreeManager=e.braintreeManager,this.donationFlowModalManager=e.donationFlowModalManager,this.restorationStateHandler=e.restorationStateHandler??new Gt}async startup(){if((await(await this.braintreeManager.paymentProviders.venmoHandler.get())?.instance.get())?.hasTokenizationResult()){const n=await this.restorationStateHandler.getRestorationState();n?this.paymentInitiated(n.contactInfo,n.donationInfo):(console.error("no restoration info"),this.donationFlowModalManager.showErrorModal({message:s("Error restoring donation session")}))}}async paymentInitiated(e,t){this.restorationStateHandler.persistState(e,t);try{const a=await(await this.braintreeManager.paymentProviders.venmoHandler.get())?.startPayment();if(!a){this.restorationStateHandler.clearState(),this.donationFlowModalManager.showErrorModal({message:s("Error setting up the donation")});return}this.handleTokenizationResult(a,e,t)}catch(n){this.restorationStateHandler.clearState(),this.handleTokenizationError(n),this.donationFlowModalManager.showErrorModal({message:s("There was a problem loading your donation information. Please try again.")})}}async handleTokenizationResult(e,t,n){this.restorationStateHandler.clearState(),this.donationFlowModalManager.startDonationSubmissionFlow({nonce:e.nonce,paymentProvider:P.Venmo,donationInfo:n,customerInfo:t.customer,billingInfo:t.billing})}handleTokenizationError(e){switch(e.code){case"VENMO_APP_CANCELED":case"VENMO_CANCELED":break;default:console.error("Venmo tokenization error",e)}}}class Yt{async startup(){this.venmoHandler?.startup(),this.creditCardHandler?.startup()}async showUpsellModal(e){return this.donationFlowModalManager.showUpsellModal(e)}showConfirmationStepModal(e){return this.donationFlowModalManager.showConfirmationStepModal(e)}get creditCardHandler(){return this.creditCardHandlerCache??=new Vt({braintreeManager:this.braintreeManager,donationFlowModalManager:this.donationFlowModalManager,recaptchaManager:this.recaptchaManager}),this.creditCardHandlerCache}get paypalHandler(){return this.paypalHandlerCache??=new jt({braintreeManager:this.braintreeManager,donationFlowModalManager:this.donationFlowModalManager}),this.paypalHandlerCache}get applePayHandler(){return this.applePayHandlerCache??=new Rt({braintreeManager:this.braintreeManager,donationFlowModalManager:this.donationFlowModalManager}),this.applePayHandlerCache}get venmoHandler(){return this.venmoHandlerCache??=new Kt({braintreeManager:this.braintreeManager,donationFlowModalManager:this.donationFlowModalManager}),this.venmoHandlerCache}get googlePayHandler(){return this.googlePayHandlerCache??=new Ut({braintreeManager:this.braintreeManager,donationFlowModalManager:this.donationFlowModalManager}),this.googlePayHandlerCache}constructor(e){this.braintreeManager=e.braintreeManager,this.recaptchaManager=e.recaptchaManager,this.donationFlowModalManager=new be({braintreeManager:this.braintreeManager,modalManager:e.modalManager,analytics:e.analytics})}}class Zt{constructor(e){this.isExecuting=!1,this.grecaptchaLibrary=e.grecaptchaLibrary,this.siteKey=e.siteKey}execute(){return this.isExecuting&&this.finishExecution(),this.isExecuting=!0,new Promise((e,t)=>{this.executionSuccessBlock=n=>{this.finishExecution(),e(n)},this.executionExpiredBlock=()=>{this.finishExecution(),t("expired")},this.executionErrorBlock=()=>{this.finishExecution(),t("error")},this.grecaptchaLibrary.execute()})}finishExecution(){this.isExecuting=!1,this.grecaptchaLibrary.reset()}setup(e,t,n,a){this.grecaptchaLibrary.render(e,{callback:this.responseHandler.bind(this),"expired-callback":this.expiredHandler.bind(this),"error-callback":this.errorHandler.bind(this),sitekey:this.siteKey,tabindex:t,theme:n,type:a,size:"invisible"})}responseHandler(e){this.executionSuccessBlock&&(this.executionSuccessBlock(e),this.executionSuccessBlock=void 0)}expiredHandler(){this.executionExpiredBlock&&(this.executionExpiredBlock(),this.executionExpiredBlock=void 0)}errorHandler(){this.executionErrorBlock&&(this.executionErrorBlock(),this.executionErrorBlock=void 0)}}var Wt=Object.defineProperty,Jt=Object.getOwnPropertyDescriptor,ae=(o,e,t,n)=>{for(var a=n>1?void 0:n?Jt(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(a=(n?r(e,t,a):r(a))||a);return n&&a&&Wt(e,t,a),a};const x={LeaveSpace:"leave-space",CompressSpace:"compress-space"};let q=class extends F{constructor(){super(...arguments),this.error=!1,this.required=!1,this.iconSpaceOption=x.LeaveSpace,this.requiredIndicatorSpaceOption=x.LeaveSpace}render(){return d`
      <div
        class="input-wrapper ${this.errorClass} ${this.iconSpaceOptionClass}"
      >
        <div class="icon-container">${this.icon}</div>
        <div class="required-indicator ${this.requiredIndicatorSpaceOption}">
          ${this.required?d`*`:J}
        </div>

        <slot></slot>
      </div>
    `}get errorClass(){return this.error?"error":""}get iconSpaceOptionClass(){return this.iconSpaceOption===x.CompressSpace?"compress-space":""}static get styles(){return[N,Ee,h`
        :host {
          --donation-badged-input-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-badged-input-border--: var(
            --ia-donation-form-input-border,
            1px solid #d9d9d9
          );
          --donation-badged-input-error-color--: var(
            --ia-donation-badged-input-error-color,
            var(--color-danger)
          );
          --donation-badged-input-icon-size--: var(
            --ia-donation-badged-input-icon-size,
            calc(var(--donation-badged-input-base-font-size--) * 2)
          );
          --donation-badged-input-icon-color--: var(
            --ia-donation-badged-input-icon-color,
            #2c2c2c
          );
          --donation-badged-input-icon-spacer-width--: var(
            --ia-donation-badged-input-icon-spacer-width,
            calc(var(--donation-badged-input-base-font-size--) * 3)
          );
          --donation-badged-input-no-icon-spacer-width--: var(
            --ia-donation-badged-input-no-icon-spacer-width,
            var(--donation-badged-input-base-font-size--)
          );
          --donation-badged-input-height--: var(
            --ia-donation-badged-input-height,
            calc(var(--donation-badged-input-base-font-size--) * 3)
          );
          --donation-badged-input-required-color--: var(
            --ia-donation-badged-input-required-color,
            var(--color-danger)
          );
          --donation-badged-input-required-margin--: var(
            --ia-donation-badged-input-required-margin,
            0 0.25rem 0 0
          );
          --donation-badged-input-required-font-size--: var(
            --ia-donation-badged-input-required-font-size,
            calc(var(--donation-badged-input-base-font-size--) * 2)
          );
        }

        .input-wrapper {
          border: var(--donation-badged-input-border--);
          height: var(--donation-badged-input-height--);
          display: flex;
          align-items: center;
        }

        .input-wrapper.error {
          box-shadow: inset 0px 0px 0px 1px
            var(--donation-badged-input-error-color--);
          border-color: var(--donation-badged-input-error-color--);
        }

        .input-wrapper.compress-space .icon-container {
          width: var(--donation-badged-input-no-icon-spacer-width--);
        }

        .icon-container {
          width: var(--donation-badged-input-icon-spacer-width--);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* The glyph takes its colour from here */
        .icon-container .ia-icon {
          width: var(--donation-badged-input-icon-size--);
          height: var(--donation-badged-input-icon-size--);
          color: var(--donation-badged-input-icon-color--);
        }

        .required-indicator {
          color: var(--donation-badged-input-required-color--);
          font-size: var(--donation-badged-input-required-font-size--);
          margin: var(--donation-badged-input-required-margin--);
        }

        .required-indicator.leave-space {
          width: 0.5em;
        }
      `]}};ae([l({type:Boolean})],q.prototype,"error",2);ae([l({type:Object})],q.prototype,"icon",2);ae([l({type:Boolean})],q.prototype,"required",2);ae([l({type:String})],q.prototype,"iconSpaceOption",2);ae([l({type:String})],q.prototype,"requiredIndicatorSpaceOption",2);q=ae([$("ia-donation-badged-input")],q);const we={AF:"Afghanistan",AX:"Aland Islands",AL:"Albania",DZ:"Algeria",AS:"American Samoa",AD:"Andorra",AO:"Angola",AI:"Anguilla",AQ:"Antarctica",AG:"Antigua and Barbuda",AR:"Argentina",AM:"Armenia",AW:"Aruba",AU:"Australia",AT:"Austria",AZ:"Azerbaijan",BS:"Bahamas",BH:"Bahrain",BD:"Bangladesh",BB:"Barbados",BY:"Belarus",BE:"Belgium",BZ:"Belize",BJ:"Benin",BM:"Bermuda",BT:"Bhutan",BO:"Bolivia",BQ:"Bonaire, Saint Eustatius and Saba ",BA:"Bosnia and Herzegovina",BW:"Botswana",BV:"Bouvet Island",BR:"Brazil",IO:"British Indian Ocean Territory",VG:"British Virgin Islands",BN:"Brunei",BG:"Bulgaria",BF:"Burkina Faso",BI:"Burundi",KH:"Cambodia",CM:"Cameroon",CA:"Canada",CV:"Cape Verde",KY:"Cayman Islands",CF:"Central African Republic",TD:"Chad",CL:"Chile",CN:"China",CX:"Christmas Island",CC:"Cocos Islands",CO:"Colombia",KM:"Comoros",CK:"Cook Islands",CR:"Costa Rica",HR:"Croatia",CU:"Cuba",CW:"Curacao",CY:"Cyprus",CZ:"Czech Republic",CD:"Democratic Republic of the Congo",DK:"Denmark",DJ:"Djibouti",DM:"Dominica",DO:"Dominican Republic",TL:"East Timor",EC:"Ecuador",EG:"Egypt",SV:"El Salvador",GQ:"Equatorial Guinea",ER:"Eritrea",EE:"Estonia",ET:"Ethiopia",FK:"Falkland Islands",FO:"Faroe Islands",FJ:"Fiji",FI:"Finland",FR:"France",GF:"French Guiana",PF:"French Polynesia",TF:"French Southern Territories",GA:"Gabon",GM:"Gambia",GE:"Georgia",DE:"Germany",GH:"Ghana",GI:"Gibraltar",GR:"Greece",GL:"Greenland",GD:"Grenada",GP:"Guadeloupe",GU:"Guam",GT:"Guatemala",GG:"Guernsey",GN:"Guinea",GW:"Guinea-Bissau",GY:"Guyana",HT:"Haiti",HM:"Heard Island and McDonald Islands",HN:"Honduras",HK:"Hong Kong",HU:"Hungary",IS:"Iceland",IN:"India",ID:"Indonesia",IR:"Iran",IQ:"Iraq",IE:"Ireland",IM:"Isle of Man",IL:"Israel",IT:"Italy",CI:"Ivory Coast",JM:"Jamaica",JP:"Japan",JE:"Jersey",JO:"Jordan",KZ:"Kazakhstan",KE:"Kenya",KI:"Kiribati",XK:"Kosovo",KW:"Kuwait",KG:"Kyrgyzstan",LA:"Laos",LV:"Latvia",LB:"Lebanon",LS:"Lesotho",LR:"Liberia",LY:"Libya",LI:"Liechtenstein",LT:"Lithuania",LU:"Luxembourg",MO:"Macao",MK:"Macedonia",MG:"Madagascar",MW:"Malawi",MY:"Malaysia",MV:"Maldives",ML:"Mali",MT:"Malta",MH:"Marshall Islands",MQ:"Martinique",MR:"Mauritania",MU:"Mauritius",YT:"Mayotte",MX:"Mexico",FM:"Micronesia",MD:"Moldova",MC:"Monaco",MN:"Mongolia",ME:"Montenegro",MS:"Montserrat",MA:"Morocco",MZ:"Mozambique",MM:"Myanmar",NA:"Namibia",NR:"Nauru",NP:"Nepal",NL:"Netherlands",NC:"New Caledonia",NZ:"New Zealand",NI:"Nicaragua",NE:"Niger",NG:"Nigeria",NU:"Niue",NF:"Norfolk Island",KP:"North Korea",MP:"Northern Mariana Islands",NO:"Norway",OM:"Oman",PK:"Pakistan",PW:"Palau",PS:"Palestinian Territory",PA:"Panama",PG:"Papua New Guinea",PY:"Paraguay",PE:"Peru",PH:"Philippines",PN:"Pitcairn",PL:"Poland",PT:"Portugal",PR:"Puerto Rico",QA:"Qatar",CG:"Republic of the Congo",RE:"Reunion",RO:"Romania",RU:"Russia",RW:"Rwanda",BL:"Saint Barthelemy",SH:"Saint Helena",KN:"Saint Kitts and Nevis",LC:"Saint Lucia",MF:"Saint Martin",PM:"Saint Pierre and Miquelon",VC:"Saint Vincent and the Grenadines",WS:"Samoa",SM:"San Marino",ST:"Sao Tome and Principe",SA:"Saudi Arabia",SN:"Senegal",RS:"Serbia",SC:"Seychelles",SL:"Sierra Leone",SG:"Singapore",SX:"Sint Maarten",SK:"Slovakia",SI:"Slovenia",SB:"Solomon Islands",SO:"Somalia",ZA:"South Africa",GS:"South Georgia and the South Sandwich Islands",KR:"South Korea",SS:"South Sudan",ES:"Spain",LK:"Sri Lanka",SD:"Sudan",SR:"Suriname",SJ:"Svalbard and Jan Mayen",SZ:"Swaziland",SE:"Sweden",CH:"Switzerland",SY:"Syria",TW:"Taiwan",TJ:"Tajikistan",TZ:"Tanzania",TH:"Thailand",TG:"Togo",TK:"Tokelau",TO:"Tonga",TT:"Trinidad and Tobago",TN:"Tunisia",TR:"Turkey",TM:"Turkmenistan",TC:"Turks and Caicos Islands",TV:"Tuvalu",VI:"U.S. Virgin Islands",UG:"Uganda",UA:"Ukraine",AE:"United Arab Emirates",GB:"United Kingdom",UM:"United States Minor Outlying Islands",US:"United States",UY:"Uruguay",UZ:"Uzbekistan",VU:"Vanuatu",VA:"Vatican",VE:"Venezuela",VN:"Vietnam",WF:"Wallis and Futuna",EH:"Western Sahara",YE:"Yemen",ZM:"Zambia",ZW:"Zimbabwe"};var Xt=Object.defineProperty,Qt=Object.getOwnPropertyDescriptor,M=(o,e,t,n)=>{for(var a=n>1?void 0:n?Qt(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(a=(n?r(e,t,a):r(a))||a);return n&&a&&Xt(e,t,a),a};let C=class extends F{constructor(){super(...arguments),this.selectedCountry="US",this.donorEmail="",this.minTwoCharPattern=".*\\S{2,}.*",this.minTwoCharValidationMessage=s("Enter at least two characters"),this.streetAddressPattern=".*?\\S.{2,}\\S.*?",this.streetAddressValidationMessage=s("Enter at least four characters"),this.usZipCodePattern="^\\d{5}(-?\\d{4})?$",this.usZipCodeValidationMessage=s("Enter a valid 5 or 9 digit zip/postal code")}updated(o){o.has("donorEmail")&&(this.emailField.value=this.donorEmail??"")}reportValidity(){return this.validateFormFields(),this.validateForm()}validateFormFields(){[{badgedInput:this.emailBadgedInput,inputField:this.emailField},{badgedInput:this.firstNameBadgedInput,inputField:this.firstNameField},{badgedInput:this.lastNameBadgedInput,inputField:this.lastNameField},{badgedInput:this.streetAddressBadgedInput,inputField:this.streetAddressField},{badgedInput:this.localityBadgedInput,inputField:this.localityField},{badgedInput:this.regionBadgedInput,inputField:this.regionField},{badgedInput:this.postalBadgedInput,inputField:this.postalCodeField}].forEach(({badgedInput:e,inputField:t})=>{e.error=!t.checkValidity()})}validateForm(){const o=this.form.reportValidity();return this.errorMessage.textContent=o?"":s("Please enter any missing or invalid contact information below"),o}focus(){this.emailField.focus()}render(){return d`
      <div id="donation-contact-form-error-message"></div>
      <form>
        <div class="row">
          ${this.generateInput({id:"donation-contact-form-email",label:s("Email"),required:!0,fieldType:"email",name:"email",autocomplete:"email",minlength:5,maxlength:255})}
        </div>

        <div class="row">
          ${this.generateInput({id:"donation-contact-form-first-name",label:s("First name"),name:"fname",required:!0,validationPattern:this.minTwoCharPattern,validationMessage:this.minTwoCharValidationMessage,maxlength:255,autocomplete:"given-name"})}
          ${this.generateInput({id:"donation-contact-form-last-name",label:s("Last name"),name:"lname",autocomplete:"family-name",required:!0,validationPattern:this.minTwoCharPattern,validationMessage:this.minTwoCharValidationMessage,maxlength:255})}
        </div>

        <div class="row">
          ${this.generateInput({id:"donation-contact-form-street-address",label:s("Address"),required:!0,autocomplete:"address-line1",name:"street-address",validationPattern:this.streetAddressPattern,validationMessage:this.streetAddressValidationMessage})}
        </div>
        <div class="row">
          ${this.generateInput({id:"donation-contact-form-locality",label:s("City"),autocomplete:"address-level2",required:!0,name:"locality",validationPattern:this.minTwoCharPattern,validationMessage:this.minTwoCharValidationMessage})}
        </div>
        <div class="row">${this.countrySelectorTemplate}</div>
        <div class="row region-postal-row">
          ${this.generateInput({id:"donation-contact-form-region",label:s("State / Province"),autocomplete:"address-level1",required:this.regionAndPostalCodeRequired,name:"region",validationPattern:this.regionAndPostalCodeRequired?this.minTwoCharPattern:void 0,validationMessage:this.regionAndPostalCodeRequired?this.minTwoCharValidationMessage:void 0})}
          ${this.generateInput({id:"donation-contact-form-postal-code",label:s("Zip / Postal Code"),autocomplete:"postal-code",required:this.regionAndPostalCodeRequired,name:"postal",validationPattern:this.regionAndPostalCodeRequired?this.usZipCodePattern:void 0,validationMessage:this.regionAndPostalCodeRequired?this.usZipCodeValidationMessage:void 0})}
        </div>
      </form>
      ${this.getStyles}
    `}get regionAndPostalCodeRequired(){return this.selectedCountry==="US"}get countrySelectorTemplate(){return d`
      <div class="field">
        <label
          for="donation-contact-form-countryCodeAlpha2"
          class="field-label"
        >
          ${s("Country")}<span class="required-asterisk"> *</span>
        </label>
        <ia-donation-badged-input
          .iconSpaceOption=${x.CompressSpace}
        >
          <select
            id="donation-contact-form-countryCodeAlpha2"
            name="country"
            autocomplete="country"
            @change=${o=>{const e=o.target.value;we[e]&&(this.selectedCountry=e)}}
          >
            ${Object.keys(we).map(o=>{const e=we[o];return d`
                <option value=${o} ?selected=${o===this.selectedCountry}>
                  ${e}
                </option>
              `})}
          </select>
        </ia-donation-badged-input>
      </div>
    `}createRenderRoot(){return this}inputFocused(o){this.errorMessage.textContent="";const e=o.target,t=this.querySelector(`ia-donation-badged-input.${e.id}`);t&&(t.error=!1)}generateInput(o){const e=o.required??!0,t=o.fieldType??"text";return d`
      <div class="field ${o.id}">
        <label for=${o.id} class="field-label">
          ${o.label}${e?d`<span class="required-asterisk"> *</span>`:J}
        </label>
        <ia-donation-badged-input
          class=${o.id}
          .iconSpaceOption=${x.CompressSpace}
          .requiredIndicatorSpaceOption=${x.CompressSpace}
        >
          <input
            type=${t}
            id=${o.id}
            class="donation-contact-form-input"
            name=${o.name}
            maxlength=${ge(o.maxlength)}
            minlength=${ge(o.minlength)}
            autocomplete=${o.autocomplete??"on"}
            pattern=${ge(o.validationPattern)}
            title=${ge(o.validationMessage)}
            @focus=${this.inputFocused}
            ?required=${e}
          />
        </ia-donation-badged-input>
      </div>
    `}get donorContactInfo(){return new ut({billing:this.billingInfo,customer:this.contactInfo})}get billingInfo(){return new ue({streetAddress:this.streetAddressField.value,locality:this.localityField.value,region:this.regionField.value,postalCode:this.postalCodeField.value,countryCodeAlpha2:this.countryCodeAlpha2Field.value})}get contactInfo(){return new he({email:this.emailField.value,firstName:this.firstNameField.value,lastName:this.lastNameField.value})}get getStyles(){const o=h`var(--ia-donation-badged-input-no-icon-spacer-width, calc(var(--donation-contact-base-font-size--) * 3))`;return d`
      <style>
        ia-donation-contact-form {
          --donation-contact-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-contact-row-gap--: var(
            --ia-donation-field-row-gap,
            calc(var(--donation-contact-base-font-size--) * 0.5)
          );
          --donation-contact-field-font-family--: var(
            --ia-theme-base-font-family,
            'Helvetica Neue',
            Helvetica,
            Arial,
            sans-serif
          );
          --donation-contact-field-font-size--: var(
            --ia-donation-contact-field-font-size,
            calc(var(--donation-contact-base-font-size--) * 1.4)
          );
          --donation-contact-field-font-color--: var(
            --ia-donation-form-input-font-color,
            #2c2c2c
          );
          --donation-contact-label-font-family--: var(
            --ia-donation-field-label-font-family,
            var(--donation-contact-field-font-family--)
          );
          --donation-contact-label-font-size--: var(
            --ia-donation-field-label-font-size,
            calc(var(--donation-contact-base-font-size--) * 1.4)
          );
          --donation-contact-label-color--: var(
            --ia-donation-field-label-color,
            #2c2c2c
          );
          --donation-contact-label-margin-bottom--: var(
            --ia-donation-field-label-margin-bottom,
            calc(var(--donation-contact-base-font-size--) * 0.5)
          );
          --donation-contact-required-color--: var(
            --ia-donation-badged-input-required-color,
            var(--ia-theme-color-danger, #e51c23)
          );
          --donation-contact-error-color--: var(
            --ia-theme-color-danger,
            #e51c23
          );
          --donation-contact-no-icon-field-width--: calc(
            100% - ${o}
          );
        }

        /*
          A grid, so a label that wraps to two lines in one column doesn't push
          that column's input out of line with its siblings. All labels share
          row line 1 and all inputs share row line 2, each sized to the tallest
          content on its line.
        */
        ia-donation-contact-form .row {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 1fr;
          grid-template-rows: auto auto;
          column-gap: var(--donation-contact-row-gap--);
        }

        /*
          State / Province gives up room to Zip / Postal Code so the
          "Zip / Postal Code *" label stays on one line.
        */
        ia-donation-contact-form .row.region-postal-row {
          grid-template-columns:
            calc(60% - var(--donation-contact-base-font-size--) * 3)
            calc(40% + var(--donation-contact-base-font-size--) * 3);
        }

        ia-donation-contact-form .row + .row {
          margin-top: var(--donation-contact-row-gap--);
        }

        ia-donation-contact-form .field {
          display: contents;
        }

        ia-donation-contact-form .field-label {
          display: block;
          font-family: var(--donation-contact-label-font-family--);
          font-size: var(--donation-contact-label-font-size--);
          font-weight: bold;
          color: var(--donation-contact-label-color--);
          margin-bottom: var(--donation-contact-label-margin-bottom--);
        }

        ia-donation-contact-form .required-asterisk {
          color: var(--donation-contact-required-color--);
        }

        ia-donation-contact-form
          ia-donation-badged-input.donation-contact-form-region,
        ia-donation-contact-form
          ia-donation-badged-input.donation-contact-form-postal-code {
          width: 100%;
        }

        ia-donation-contact-form #donation-contact-form-error-message {
          color: var(--donation-contact-error-color--);
          font-size: calc(var(--donation-contact-base-font-size--) * 1.4);
          margin-bottom: calc(var(--donation-contact-base-font-size--) * 0.6);
        }

        ia-donation-contact-form .donation-contact-form-input {
          width: var(--donation-contact-no-icon-field-width--);
          border: 0;
          outline: 0;
          background: transparent;
          font-weight: bold;
          color: var(--donation-contact-field-font-color--);
          font-size: var(--donation-contact-field-font-size--);
          padding: 0;
          font-family: var(--donation-contact-field-font-family--);
        }

        ia-donation-contact-form #donation-contact-form-countryCodeAlpha2 {
          width: var(--donation-contact-no-icon-field-width--);
          height: 100%;
          box-sizing: border-box;
          font-weight: bold;
          font-size: var(--donation-contact-field-font-size--);
          color: var(--donation-contact-field-font-color--);
          font-family: var(--donation-contact-field-font-family--);
          border: 0;
          background: #fff;
        }
      </style>
    `}};M([u("ia-donation-badged-input.donation-contact-form-email")],C.prototype,"emailBadgedInput",2);M([u("#donation-contact-form-email")],C.prototype,"emailField",2);M([u("ia-donation-badged-input.donation-contact-form-first-name")],C.prototype,"firstNameBadgedInput",2);M([u("#donation-contact-form-first-name")],C.prototype,"firstNameField",2);M([u("ia-donation-badged-input.donation-contact-form-last-name")],C.prototype,"lastNameBadgedInput",2);M([u("#donation-contact-form-last-name")],C.prototype,"lastNameField",2);M([u("ia-donation-badged-input.donation-contact-form-postal-code")],C.prototype,"postalBadgedInput",2);M([u("#donation-contact-form-postal-code")],C.prototype,"postalCodeField",2);M([u("ia-donation-badged-input.donation-contact-form-street-address")],C.prototype,"streetAddressBadgedInput",2);M([u("#donation-contact-form-street-address")],C.prototype,"streetAddressField",2);M([u("ia-donation-badged-input.donation-contact-form-locality")],C.prototype,"localityBadgedInput",2);M([u("#donation-contact-form-locality")],C.prototype,"localityField",2);M([u("ia-donation-badged-input.donation-contact-form-region")],C.prototype,"regionBadgedInput",2);M([u("#donation-contact-form-region")],C.prototype,"regionField",2);M([u("#donation-contact-form-countryCodeAlpha2")],C.prototype,"countryCodeAlpha2Field",2);M([u("#donation-contact-form-error-message")],C.prototype,"errorMessage",2);M([u("form")],C.prototype,"form",2);M([l({type:String})],C.prototype,"selectedCountry",2);M([l({type:String})],C.prototype,"donorEmail",2);C=M([$("ia-donation-contact-form")],C);const eo=G(We),to=G(Je),oo=G(Xe),ao=G(Qe),no=G(et),io=G(tt),Ve=G(ot);var ro=Object.defineProperty,so=Object.getOwnPropertyDescriptor,me=(o,e,t,n)=>{for(var a=n>1?void 0:n?so(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(a=(n?r(e,t,a):r(a))||a);return n&&a&&ro(e,t,a),a};let ee=class extends F{get hostedFieldContainer(){return new _t({number:this.numberField,cvv:this.cvvField,expirationDate:this.expirationField,errorContainer:this.errorMessageField})}render(){return d`
      <div id="braintree-error-message"></div>
      <div class="braintree-row">
        <div class="field">
          <span class="field-label"
            >${s("Card Number")}<span class="required-asterisk">
              *</span
            ></span
          >
          <ia-donation-badged-input
            .icon=${io}
            .requiredIndicatorSpaceOption=${x.CompressSpace}
            class="creditcard"
          >
            <div class="braintree-input" id="braintree-creditcard"></div>
          </ia-donation-badged-input>
        </div>
      </div>
      <div class="braintree-row expiration-cvv-row">
        <div class="field">
          <span class="field-label"
            >${s("Expiration (MM / YY)")}<span class="required-asterisk">
              *</span
            ></span
          >
          <ia-donation-badged-input
            .icon=${no}
            .requiredIndicatorSpaceOption=${x.CompressSpace}
            class="expiration"
          >
            <div class="braintree-input" id="braintree-expiration"></div>
          </ia-donation-badged-input>
        </div>
        <div class="field">
          <span class="field-label"
            >${s("CVC")}<span class="required-asterisk"> *</span></span
          >
          <ia-donation-badged-input
            .icon=${Ve}
            .requiredIndicatorSpaceOption=${x.CompressSpace}
            class="cvv"
          >
            <div class="braintree-input" id="braintree-cvv"></div>
          </ia-donation-badged-input>
        </div>
      </div>
      ${this.getStyles}
    `}createRenderRoot(){return this}get getStyles(){return d`
      <style>
        ia-donation-credit-card-fields {
          --donation-card-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-card-label-font-family--: var(
            --ia-donation-field-label-font-family,
            var(
              --ia-theme-base-font-family,
              'Helvetica Neue',
              Helvetica,
              Arial,
              sans-serif
            )
          );
          --donation-card-label-font-size--: var(
            --ia-donation-field-label-font-size,
            calc(var(--donation-card-base-font-size--) * 1.4)
          );
          --donation-card-label-color--: var(
            --ia-donation-field-label-color,
            #2c2c2c
          );
          --donation-card-label-margin-bottom--: var(
            --ia-donation-field-label-margin-bottom,
            calc(var(--donation-card-base-font-size--) * 0.5)
          );
          --donation-card-row-gap--: var(
            --ia-donation-field-row-gap,
            calc(var(--donation-card-base-font-size--) * 0.5)
          );
          --donation-card-required-color--: var(
            --ia-donation-badged-input-required-color,
            var(--ia-theme-color-danger, #e51c23)
          );
          --donation-card-error-color--: var(--ia-theme-color-danger, #e51c23);
        }

        ia-donation-credit-card-fields .field-label {
          display: block;
          font-family: var(--donation-card-label-font-family--);
          font-size: var(--donation-card-label-font-size--);
          font-weight: bold;
          color: var(--donation-card-label-color--);
          margin-bottom: var(--donation-card-label-margin-bottom--);
        }

        ia-donation-credit-card-fields .required-asterisk {
          color: var(--donation-card-required-color--);
        }

        /*
          A grid, so a label that wraps to two lines in one column doesn't push
          that column's input out of line with its sibling. Both labels share
          row line 1 and both inputs share row line 2.
        */
        ia-donation-credit-card-fields .braintree-row {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 1fr;
          grid-template-rows: auto auto;
          column-gap: var(--donation-card-row-gap--);
        }

        /*
          The expiration column is wider than the CVC column so its
          "Expiration (MM / YY)" label stays on one line. CVC's label has
          room to spare.
        */
        ia-donation-credit-card-fields .braintree-row.expiration-cvv-row {
          grid-template-columns:
            calc(50% + var(--donation-card-base-font-size--) * 2.5)
            calc(50% - var(--donation-card-base-font-size--) * 2.5);
        }

        ia-donation-credit-card-fields .braintree-row + .braintree-row {
          margin-top: var(--donation-card-row-gap--);
        }

        ia-donation-credit-card-fields .field {
          display: contents;
        }

        ia-donation-credit-card-fields ia-donation-badged-input {
          width: 100%;
        }

        ia-donation-credit-card-fields .braintree-input {
          width: 100%;
          height: 100%;
        }

        ia-donation-credit-card-fields #braintree-error-message {
          color: var(--donation-card-error-color--);
          font-size: calc(var(--donation-card-base-font-size--) * 1.4);
          margin-bottom: calc(var(--donation-card-base-font-size--) * 0.6);
        }
      </style>
    `}};me([u("#braintree-creditcard")],ee.prototype,"numberField",2);me([u("#braintree-expiration")],ee.prototype,"expirationField",2);me([u("#braintree-cvv")],ee.prototype,"cvvField",2);me([u("#braintree-error-message")],ee.prototype,"errorMessageField",2);ee=me([$("ia-donation-credit-card-fields")],ee);var lo=Object.defineProperty,co=Object.getOwnPropertyDescriptor,Ue=(o,e,t,n)=>{for(var a=n>1?void 0:n?co(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(a=(n?r(e,t,a):r(a))||a);return n&&a&&lo(e,t,a),a};let Fe=class extends F{render(){return d`
      <h1>${this.displayTitle}</h1>
      <button @click=${this.editClicked}>${s("Edit this amount")}</button>
    `}get displayTitle(){if(!this.donationInfo)return"";const o=this.donationInfo.amount,e=o===Math.round(o)?0:2,t=ce(o,{symbol:"$",precision:e}).format();return this.donationInfo.donationType===w.Monthly?s(ye`${t} Monthly Donation`):s(ye`${t} Donation`)}editClicked(){this.dispatchEvent(new Event("editClicked"))}static get styles(){return[N,h`
        :host {
          display: flex;
          justify-content: center;
          align-content: center;
        }

        button {
          border: 0;
          background: none;
          color: var(--link-color);
          cursor: pointer;
        }
      `]}};Ue([l({type:Object})],Fe.prototype,"donationInfo",2);Fe=Ue([$("ia-donation-summary")],Fe);var ho=Object.defineProperty,uo=Object.getOwnPropertyDescriptor,ne=(o,e,t,n)=>{for(var a=n>1?void 0:n?uo(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(a=(n?r(e,t,a):r(a))||a);return n&&a&&ho(e,t,a),a};const se={Summary:"summary",Edit:"edit"};let j=class extends F{constructor(){super(...arguments),this.mode=se.Edit,this.amountOptions=$e,this.amountSelectionLayout=fe.MultiLine,this.frequencySelectionMode=de.Button}render(){switch(this.mode){case se.Summary:return this.donationSummaryTemplate;case se.Edit:return this.editDonationTemplate}}get editDonationTemplate(){return d`
      <ia-donation-edit-donation
        .donationInfo=${this.donationInfo}
        .amountOptions=${this.amountOptions}
        .amountSelectionLayout=${this.amountSelectionLayout}
        .frequencySelectionMode=${this.frequencySelectionMode}
        @donationInfoChanged=${this.donationInfoChanged}
        @showSummaryClicked=${this.showSummaryClicked}
        @editDonationError=${this.editDonationError}
      >
      </ia-donation-edit-donation>
    `}get donationSummaryTemplate(){return d`
      <ia-donation-summary
        .donationInfo=${this.donationInfo}
        @editClicked=${this.summaryEditClicked}
      >
      </ia-donation-summary>
    `}donationInfoChanged(o){this.donationInfo=o.detail.donationInfo,this.dispatchEvent(new CustomEvent("donationInfoChanged",{detail:{donationInfo:this.donationInfo}}))}editDonationError(o){this.dispatchEvent(new CustomEvent("editDonationError",{detail:o.detail}))}summaryEditClicked(){this.mode=se.Edit}showSummaryClicked(){this.mode=se.Summary}};ne([l({type:Object})],j.prototype,"donationInfo",2);ne([l({type:String})],j.prototype,"mode",2);ne([l({type:Array})],j.prototype,"amountOptions",2);ne([l({type:String})],j.prototype,"amountSelectionLayout",2);ne([l({type:String})],j.prototype,"frequencySelectionMode",2);j=ne([$("ia-donation-header")],j);var po=Object.defineProperty,mo=Object.getOwnPropertyDescriptor,R=(o,e,t,n)=>{for(var a=n>1?void 0:n?mo(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(a=(n?r(e,t,a):r(a))||a);return n&&a&&po(e,t,a),a};const T={Loading:"loading",Available:"available",Unavailable:"unavailable"};let D=class extends F{constructor(){super(...arguments),this.donationInfoValid=!0,this.applePayMode=T.Loading,this.googlePayMode=T.Loading,this.venmoMode=T.Loading,this.payPalMode=T.Loading}render(){const o=this.paymentModeSelected?"payment-selected":"";return d`
      <div
        class="payment-container ${this.donationInfoValid?"donation-info-valid":"donation-info-invalid"} ${o}"
      >
        <div class="payment-provider-container">
          <button
            class="applepay provider-button ${this.applePayMode} ${this.paymentModeSelected==="apple"?"selected":""}"
            aria-label=${s("Pay with Apple Pay")}
            @click=${e=>{this.paymentModeSelected="apple",this.applePaySelected(e)}}
          >
            <div class="payment-image">${eo}</div>
          </button>

          <button
            class="googlepay provider-button ${this.googlePayMode} ${this.paymentModeSelected==="google"?"selected":""}"
            aria-label=${s("Pay with Google Pay")}
            @click=${()=>{this.paymentModeSelected="google",this.googlePaySelected()}}
          >
            <div class="payment-image">${to}</div>
          </button>

          <button
            class="venmo provider-button ${this.venmoMode} ${this.paymentModeSelected==="venmo"?"selected":""}"
            aria-label=${s("Pay with Venmo")}
            @click=${()=>{this.paymentModeSelected="venmo",this.venmoSelected()}}
          >
            <div class="payment-image">${ao}</div>
          </button>

          <div
            class="paypal-container provider-button ${this.payPalMode} ${this.paymentModeSelected==="paypal"?"selected":""}"
          >
            <div class="payment-image">
              <button
                class="paypal-local-button"
                aria-label=${s("Pay with PayPal")}
                @click=${()=>{this.paymentModeSelected="paypal",this.localPaypalButtonClicked()}}
              >
                ${oo}
              </button>
              <slot name="paypal-button"></slot>
            </div>
          </div>
        </div>

        <div class="credit-card-container">
          <button
            @click=${()=>{this.paymentModeSelected="cc",this.creditCardSelected()}}
            class="button-style credit-card-button ${this.paymentModeSelected==="cc"?"selected":""}"
          >
            <div class="cc-title">${s("Credit Card")}</div>
            <div class="cc-background"></div>
          </button>
        </div>
      </div>

      ${this.paymentModeSelected?d`
            <button
              id="change-payment-method"
              @click=${()=>{this.paymentModeSelected=void 0,this.dispatchEvent(new Event("resetPaymentMethod")),this.setButtonVisibility()}}
            >
              ${s("Change payment method")}
            </button>

            <slot name="credit-card-fields"></slot>
          `:J}
    `}firstUpdated(){this.dispatchEvent(new Event("firstUpdated"))}updated(o){o.has("paymentProviders")&&this.setButtonVisibility()}showPaypalButton(){this.payPalMode=T.Available}async setButtonVisibility(){const o=this.paymentProviders;if(!o)return;const e=t=>t?T.Available:T.Unavailable;o.venmoHandler.get().then(async t=>t?t.isBrowserSupported():!1).then(t=>{this.venmoMode=e(t)}).catch(t=>{console.error("venmo unavailable",t),this.venmoMode=T.Unavailable}),o.applePayHandler.get().then(t=>t.isAvailable()).then(t=>{this.applePayMode=e(t)}).catch(t=>{console.error("apple pay unavailable",t),this.applePayMode=T.Unavailable}),o.googlePayHandler.get().then(t=>t.isBrowserSupported()).then(t=>{this.googlePayMode=e(t)}).catch(t=>{console.error("google pay unavailable",t),this.googlePayMode=T.Unavailable})}googlePaySelected(){this.dispatchEvent(new Event("googlePaySelected"))}applePaySelected(o){this.dispatchEvent(new CustomEvent("applePaySelected",{detail:{originalEvent:o}}))}venmoSelected(){this.dispatchEvent(new Event("venmoSelected"))}creditCardSelected(){this.dispatchEvent(new Event("creditCardSelected"))}localPaypalButtonClicked(){this.dispatchEvent(new Event("paypalBlockerSelected"))}static get styles(){return[N,Ee,h`
        :host {
          --donation-selector-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-selector-button-width--: var(
            --ia-donation-payment-button-width,
            calc(var(--donation-selector-base-font-size--) * 5)
          );
          --donation-selector-button-height--: var(
            --ia-donation-payment-button-height,
            calc(var(--donation-selector-base-font-size--) * 3.2)
          );
          --donation-selector-cc-font-size--: var(
            --ia-donation-credit-card-font-size,
            calc(var(--donation-selector-base-font-size--) * 1.8)
          );
          --donation-selector-cc-font-color--: var(
            --ia-donation-credit-card-button-font-color,
            var(--mid-gray)
          );
          --donation-selector-cc-color--: var(
            --ia-donation-credit-card-button-color,
            var(--true-white)
          );
        }

        button {
          color: inherit;
          font-family: inherit;
        }

        .payment-container {
          width: 100%;
        }

        .payment-provider-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-gap: var(--donation-selector-base-font-size--);
          margin-bottom: var(--donation-selector-base-font-size--);
          max-width: calc(var(--donation-selector-base-font-size--) * 23);
        }

        .provider-button {
          border: 0;
          padding: 0;
          background: none;
          cursor: pointer;
          width: var(--donation-selector-button-width--);
          height: var(--donation-selector-button-height--);
        }

        .provider-button.unavailable {
          display: none;
        }

        .provider-button.loading {
          border: 1px solid #ddd;
          border-radius: 2px;
          /* Accounts for the border that goes away once the provider loads, so the layout doesn't shift */
          margin-bottom: -2px;
        }

        .provider-button.loading .payment-image {
          display: none;
        }

        .payment-image,
        .payment-image .ia-icon {
          width: 100%;
          height: 100%;
        }

        .paypal-local-button {
          position: absolute;
          border: 0;
          padding: 0;
          background: none;
          cursor: pointer;
          width: var(--donation-selector-button-width--);
          height: var(--donation-selector-button-height--);
        }

        .donation-info-valid .paypal-local-button {
          z-index: 0;
        }

        .donation-info-invalid .paypal-local-button {
          z-index: 250;
        }

        .credit-card-button {
          color: var(--donation-selector-cc-font-color--);
          background-color: var(--donation-selector-cc-color--);
          border: 1px solid var(--mid-gray);
          border-radius: 4px;
          cursor: pointer;
          margin: 0;
          padding: calc(var(--donation-selector-base-font-size--) * 0.7)
            var(--donation-selector-base-font-size--);
          width: 100%;
        }

        .credit-card-button .cc-background {
          height: calc(var(--donation-selector-base-font-size--) * 2.4);
          width: 100%;
          background-repeat: no-repeat;
          background-image: url(https://archive.org/images/cc_logos.png);
          background-position: 50% 50%;
          background-size: contain;
        }

        .credit-card-button .cc-title {
          font-size: var(--donation-selector-cc-font-size--);
          font-weight: 700;
          margin-bottom: var(--padding-sm);
        }

        button#change-payment-method {
          margin-top: 10px;
          margin-bottom: 10px;
          background: var(--true-white);
          border: 1px solid;
          border-radius: 3px;
          padding: 5px;
          cursor: pointer;
        }

        .payment-selected .provider-button:not(.selected),
        .payment-selected .credit-card-button:not(.selected) {
          display: none;
        }
      `]}};R([l({type:Boolean})],D.prototype,"donationInfoValid",2);R([l({type:Object})],D.prototype,"paymentProviders",2);R([k()],D.prototype,"applePayMode",2);R([k()],D.prototype,"googlePayMode",2);R([k()],D.prototype,"venmoMode",2);R([k()],D.prototype,"payPalMode",2);R([k()],D.prototype,"paymentModeSelected",2);D=R([$("ia-donation-payment-selector")],D);var go=Object.defineProperty,yo=Object.getOwnPropertyDescriptor,qe=(o,e,t,n)=>{for(var a=n>1?void 0:n?yo(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(a=(n?r(e,t,a):r(a))||a);return n&&a&&go(e,t,a),a};let Ie=class extends F{render(){return d`
      <div class="top-line"></div>
      <div class="total-line">${this.totalLine}</div>
    `}get totalLine(){if(!this.donationInfo)return"";const o=ce(this.donationInfo.total,{symbol:"$"}).format();return this.donationInfo.donationType===w.Monthly?s(ye`Total: ${o}/month`):s(ye`Total: ${o}`)}static get styles(){return[N,h`
        :host {
          --donation-total-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-total-line-color--: var(
            --ia-donation-total-amount-line-color,
            var(--mid-gray)
          );
          --donation-total-line-thickness--: var(
            --ia-donation-total-amount-line-thickness,
            2px
          );
          --donation-total-vertical-spacing--: var(
            --ia-donation-total-amount-vertical-spacing,
            var(--padding-sm)
          );
          --donation-total-font-size--: var(
            --ia-donation-total-amount-font-size,
            calc(var(--donation-total-base-font-size--) * 2.6)
          );
        }

        .top-line {
          width: 100%;
          height: var(--donation-total-line-thickness--);
          background-color: var(--donation-total-line-color--);
        }

        .total-line {
          font-size: var(--donation-total-font-size--);
          font-weight: bold;
          text-align: center;
          margin-top: var(--donation-total-vertical-spacing--);
        }
      `]}};qe([l({type:Object})],Ie.prototype,"donationInfo",2);Ie=qe([$("ia-donation-total-amount")],Ie);var fo=Object.defineProperty,bo=Object.getOwnPropertyDescriptor,I=(o,e,t,n)=>{for(var a=n>1?void 0:n?bo(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(a=(n?r(e,t,a):r(a))||a);return n&&a&&fo(e,t,a),a};let S=class extends F{constructor(){super(...arguments),this.donationInfo=Oe,this.amountOptions=$e,this.amountSelectionLayout=fe.MultiLine,this.frequencySelectionMode=de.Button,this.creditCardVisible=!1,this.contactFormVisible=!1,this.donationInfoValid=!0,this.paypalButtonNeedsRender=!0,this.flowHandlersConfigured=!1}render(){return d`
      <ia-donation-header
        .amountOptions=${this.amountOptions}
        .amountSelectionLayout=${this.amountSelectionLayout}
        .frequencySelectionMode=${this.frequencySelectionMode}
        @donationInfoChanged=${this.donationInfoChanged}
        @editDonationError=${this.editDonationError}
      >
      </ia-donation-header>

      <ia-donation-section
        .badgeMode=${at.HideBadgeLeaveSpacing}
        id="total-amount-section"
      >
        <ia-donation-total-amount .donationInfo=${this.donationInfo}>
        </ia-donation-total-amount>
      </ia-donation-section>

      <ia-donation-section
        .sectionBadge=${`${this.paymentSelectorNumberingStart}`}
        headline=${s("Choose a payment method")}
      >
        <ia-donation-payment-selector
          .paymentProviders=${this.braintreeManager?.paymentProviders}
          @firstUpdated=${this.paymentSelectorFirstUpdated}
          @creditCardSelected=${this.creditCardSelected}
          @venmoSelected=${this.venmoSelected}
          @applePaySelected=${this.applePaySelected}
          @googlePaySelected=${this.googlePaySelected}
          @paypalBlockerSelected=${this.paypalBlockerSelected}
          @resetPaymentMethod=${()=>{this.selectedPaymentProvider=void 0,this.contactFormVisible=!1}}
        >
          <slot name="paypal-button" slot="paypal-button"></slot>
          <div
            class="credit-card-fields ${this.creditCardVisible?"":"hidden"}"
            slot="credit-card-fields"
          >
            <slot name="braintree-hosted-fields"></slot>
          </div>
        </ia-donation-payment-selector>
      </ia-donation-section>

      <div
        class="contact-form-section ${this.contactFormVisible?"":"hidden"}"
      >
        ${this.contactFormSectionTemplate}
      </div>
    `}async showConfirmationModalDev(o){this.paymentFlowHandlers?.showConfirmationStepModal(o)}async showUpsellModalDev(o){if(this.paymentFlowHandlers?.showUpsellModal(o),o.ctaMode===O.PayPalUpsellSlot){const e=await this.braintreeManager?.paymentProviders.paypalHandler.get(),t=new V({amount:o.oneTimeAmount,donationType:w.OneTime,coverFees:!1});e?.renderPayPalButton({selector:"#paypal-upsell-button",style:{color:"blue",label:"paypal",shape:"rect",size:"responsive",tagline:!1},donationInfo:t})}}get contactFormSectionTemplate(){const o=this.selectedPaymentProvider===P.Venmo?s("Help us stay in touch"):s("Enter contact information");return d`
      <ia-donation-section
        .sectionBadge=${`${this.paymentSelectorNumberingStart+1}`}
        headline=${o}
        id="contactFormSection"
      >
        <slot name="contact-form"></slot>
      </ia-donation-section>

      <ia-donation-section
        .sectionBadge=${`${this.paymentSelectorNumberingStart+2}`}
      >
        <slot name="recaptcha"></slot>
        <button id="donate-button" @click=${this.donateClicked}>
          ${s("Donate")}
        </button>

        <div class="secure-process-note">
          ${Ve} ${s("Your payment will be securely processed")}
        </div>
      </ia-donation-section>
    `}get paymentSelectorNumberingStart(){return this.frequencySelectionMode===de.Button?3:2}editDonationError(){this.donationInfoValid=!1}paymentSelectorFirstUpdated(){this.paymentFlowHandlers?.paypalHandler&&this.renderPayPalButtonIfNeeded()}applePaySelected(o){if(this.selectedPaymentProvider=P.ApplePay,this.contactFormVisible=!1,this.creditCardVisible=!1,!this.donationInfoValid){this.showInvalidDonationInfoAlert();return}const e=o.detail.originalEvent;this.donationInfo&&this.paymentFlowHandlers?.applePayHandler?.paymentInitiated(this.donationInfo,e),this.emitPaymentFlowStartedEvent()}googlePaySelected(){if(this.selectedPaymentProvider=P.GooglePay,this.contactFormVisible=!1,this.creditCardVisible=!1,!this.donationInfoValid){this.showInvalidDonationInfoAlert();return}this.donationInfo&&this.paymentFlowHandlers?.googlePayHandler?.paymentInitiated(this.donationInfo),this.emitPaymentFlowStartedEvent()}async creditCardSelected(){if(!this.donationInfoValid){this.showInvalidDonationInfoAlert();return}this.selectedPaymentProvider=P.CreditCard,this.contactFormVisible=!0,this.creditCardVisible=!0,this.focusCreditCardNumberField()}async venmoSelected(){if(!this.donationInfoValid){this.showInvalidDonationInfoAlert();return}this.selectedPaymentProvider=P.Venmo,this.contactFormVisible=!0,this.creditCardVisible=!1,this.focusContactForm()}paypalBlockerSelected(){this.contactFormVisible=!1,this.creditCardVisible=!1,this.showInvalidDonationInfoAlert()}async focusContactForm(){await this.updateComplete,this.contactFormSection&&this.contactForm?.focus()}async focusCreditCardNumberField(){await this.updateComplete,(await this.braintreeManager?.paymentProviders.creditCardHandler.get())?.focusField(z.Number)}async donateClicked(){if(!this.contactForm){alert(s("Please enter contact info."));return}if(!this.donationInfoValid||!this.donationInfo){this.showInvalidDonationInfoAlert();return}const o=this.contactForm.donorContactInfo;switch(this.selectedPaymentProvider){case P.CreditCard:this.handleCreditCardDonationFlow(o,this.donationInfo);break;case P.Venmo:this.handleVenmoDonationFlow(o,this.donationInfo);break}}async handleCreditCardDonationFlow(o,e){const t=this.paymentFlowHandlers?.creditCardHandler;(await this.braintreeManager?.paymentProviders.creditCardHandler.get())?.hideErrorMessage();const a=this.contactForm?.reportValidity(),i=await t?.tokenizeFields();!a||i===void 0||(this.emitPaymentFlowStartedEvent(),t?.paymentInitiated(i,e,o))}async handleVenmoDonationFlow(o,e){this.contactForm?.reportValidity()&&this.paymentFlowHandlers?.venmoHandler?.paymentInitiated(o,e)}emitPaymentFlowEvent(o,e={}){this.selectedPaymentProvider&&this.dispatchEvent(new CustomEvent(o,{detail:{paymentProvider:this.selectedPaymentProvider,...e}}))}emitPaymentFlowStartedEvent(){this.emitPaymentFlowEvent("paymentFlowStarted")}emitPaymentFlowConfirmedEvent(){this.emitPaymentFlowEvent("paymentFlowConfirmed")}emitPaymentFlowCancelledEvent(){this.emitPaymentFlowEvent("paymentFlowCancelled")}emitPaymentFlowErrorEvent(o){this.emitPaymentFlowEvent("paymentFlowError",{error:o})}showInvalidDonationInfoAlert(){alert(s("Please enter a valid donation amount."))}async renderPayPalButtonIfNeeded(){this.paypalButtonNeedsRender&&(this.paypalButtonNeedsRender=!1,this.donationInfo&&await this.paymentFlowHandlers?.paypalHandler?.renderPayPalButton(this.donationInfo),this.paymentSelector.showPaypalButton())}updated(o){o.has("donationInfo")&&this.donationInfo&&(this.paymentFlowHandlers?.paypalHandler?.updateDonationInfo(this.donationInfo),this.donationFormHeader.donationInfo=this.donationInfo),(o.has("paymentFlowHandlers")||o.has("donationInfo"))&&this.donationInfo&&this.paymentFlowHandlers&&this.setupFlowHandlers(),o.has("donationInfoValid")&&(this.paymentSelector.donationInfoValid=this.donationInfoValid),o.has("selectedPaymentProvider")&&this.dispatchEvent(new CustomEvent("paymentProviderSelected",{detail:{paymentProvider:this.selectedPaymentProvider,previousPaymentProvider:o.get("selectedPaymentProvider")}}))}setupFlowHandlers(){this.flowHandlersConfigured||(this.flowHandlersConfigured=!0,this.bindFlowListenerEvents(),this.renderPayPalButtonIfNeeded(),this.donationInfo&&this.paymentFlowHandlers?.paypalHandler?.updateDonationInfo(this.donationInfo))}bindFlowListenerEvents(){const o=this.paymentFlowHandlers?.paypalHandler;o?.on("payPalPaymentStarted",()=>{this.selectedPaymentProvider=P.PayPal,this.emitPaymentFlowStartedEvent()}),o?.on("payPalPaymentConfirmed",()=>{this.selectedPaymentProvider=P.PayPal,this.emitPaymentFlowConfirmedEvent()}),o?.on("payPalPaymentCancelled",()=>{this.selectedPaymentProvider=P.PayPal,this.emitPaymentFlowCancelledEvent()}),o?.on("payPalPaymentError",(e,t)=>{this.selectedPaymentProvider=P.PayPal,this.emitPaymentFlowErrorEvent(t)}),this.paymentFlowHandlers?.googlePayHandler?.on("paymentCancelled",()=>{this.selectedPaymentProvider=P.GooglePay,this.emitPaymentFlowCancelledEvent()})}donationInfoChanged(o){const e=o.detail.donationInfo;this.donationInfo=new V({amount:e.amount,donationType:e.donationType,coverFees:e.coverFees}),this.donationInfoValid=!0,this.dispatchEvent(new CustomEvent("donationInfoChanged",{detail:{donationInfo:e}}))}static get styles(){return[N,Ee,h`
        :host {
          /*
           * The donation form was built for a 10px root font size. Sizing off
           * this base keeps it self-contained, so it looks the same whatever
           * the page's root size is. Every part of the form reads it, and the
           * two parts with their own base variable get it passed through.
           */
          --donation-form-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --ia-donation-section-base-font-size: var(
            --donation-form-base-font-size--
          );
          --ia-donation-edit-base-font-size: var(
            --donation-form-base-font-size--
          );

          --donation-form-donate-button-font-size--: var(
            --ia-donation-form-donate-button-font-size,
            calc(var(--donation-form-base-font-size--) * 2.6)
          );
          --donation-form-donate-button-height--: var(
            --ia-donation-form-donate-button-height,
            calc(var(--donation-form-base-font-size--) * 4)
          );
          --donation-form-donate-button-color--: var(
            --ia-donation-form-donate-button-color,
            var(--mint-green)
          );
          --donation-form-donate-button-text-color--: var(
            --ia-donation-form-donate-button-text-color,
            var(--true-white)
          );
          --donation-form-donate-button-hover-color--: var(
            --ia-donation-form-donate-button-hover-color,
            #278367
          );
          --donation-form-total-top-margin--: var(
            --ia-donation-form-total-amount-top-margin,
            calc(var(--donation-form-base-font-size--) * 1.5)
          );
          --donation-form-total-bottom-margin--: var(
            --ia-donation-form-total-amount-bottom-margin,
            calc(var(--donation-form-base-font-size--) * 1.2)
          );
        }

        h1 {
          margin: 0;
          padding: 0;
        }

        .hidden {
          display: none;
        }

        .secure-process-note {
          margin-top: 0.5em;
          font-size: 0.75em;
          text-align: center;
        }

        .secure-process-note .ia-icon {
          width: calc(var(--donation-form-base-font-size--) * 1.2);
          height: calc(var(--donation-form-base-font-size--) * 1.5);
          vertical-align: bottom;
        }

        #donate-button {
          width: 100%;
          appearance: none;
          font-size: var(--donation-form-donate-button-font-size--);
          font-weight: bold;
          text-align: center;
          color: var(--donation-form-donate-button-text-color--);
          cursor: pointer;
          border: none;
          border-radius: 5px;
          background-color: var(--donation-form-donate-button-color--);
          padding-top: var(--padding-sm);
          padding-bottom: var(--padding-sm);
          height: var(--donation-form-donate-button-height--);
        }

        #donate-button:hover {
          background-color: var(--donation-form-donate-button-hover-color--);
        }

        #total-amount-section {
          display: block;
          margin-top: var(--donation-form-total-top-margin--);
          margin-bottom: var(--donation-form-total-bottom-margin--);
        }
      `]}};I([l({type:Object})],S.prototype,"braintreeManager",2);I([l({type:Object})],S.prototype,"paymentFlowHandlers",2);I([l({type:Object})],S.prototype,"donationRequest",2);I([l({type:Object})],S.prototype,"donationInfo",2);I([l({type:Object})],S.prototype,"contactForm",2);I([l({type:Array})],S.prototype,"amountOptions",2);I([l({type:String})],S.prototype,"amountSelectionLayout",2);I([l({type:String})],S.prototype,"frequencySelectionMode",2);I([k()],S.prototype,"creditCardVisible",2);I([k()],S.prototype,"contactFormVisible",2);I([k()],S.prototype,"donationInfoValid",2);I([k()],S.prototype,"selectedPaymentProvider",2);I([u("#contactFormSection")],S.prototype,"contactFormSection",2);I([u("ia-donation-header")],S.prototype,"donationFormHeader",2);I([u("ia-donation-payment-selector")],S.prototype,"paymentSelector",2);S=I([$("ia-donation-form")],S);var vo=Object.defineProperty,wo=Object.getOwnPropertyDescriptor,g=(o,e,t,n)=>{for(var a=n>1?void 0:n?wo(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(a=(n?r(e,t,a):r(a))||a);return n&&a&&vo(e,t,a),a};let m=class extends F{constructor(){super(...arguments),this.analyticsCategory="DonationForm",this.amountOptions=$e,this.donationInfo=Oe,this.amountSelectionLayout=fe.MultiLine,this.frequencySelectionMode=de.Button,this.donorEmail="",this.lazyLoaderService=new Ct,this.recaptchaManagerSetup=!1}updated(o){o.has("referrer")&&this.referrer&&(this.braintreeManager?.setReferrer(this.referrer),this.logDonationFlowEvent("referrer",this.referrer)),o.has("loggedInUser")&&this.loggedInUser&&this.braintreeManager?.setLoggedInUser(this.loggedInUser),o.has("origin")&&this.origin&&(this.braintreeManager?.setOrigin(this.origin),this.logDonationFlowEvent("origin",this.origin)),(o.has("paymentClients")||o.has("braintreeAuthToken")||o.has("endpointManager")||o.has("environment"))&&(this.setupBraintreeManager(),this.setupRecaptchaManager()),o.has("recaptchaSiteKey")&&this.setupRecaptchaManager(),(o.has("braintreeManager")||o.has("recaptchaManager")||o.has("modalManager")||o.has("recaptchaElement"))&&this.setupPaymentFlowHandlers(),(o.has("environment")||o.has("lazyLoaderService"))&&this.environment&&(this.paymentClients===void 0||this.paymentClients===this.defaultPaymentClients)&&(this.defaultPaymentClients=new Lt(this.lazyLoaderService,this.environment),this.paymentClients=this.defaultPaymentClients)}async showConfirmationStepDev(o){this.donationForm.showConfirmationModalDev(o)}async showUpsellModalDev(o){this.donationForm.showUpsellModalDev(o)}setupBraintreeManager(){this.braintreeManager===void 0&&this.braintreeAuthToken&&this.endpointManager&&this.paymentClients&&this.environment&&(this.braintreeManager=new Dt({paymentClients:this.paymentClients,endpointManager:this.endpointManager,authorizationToken:this.braintreeAuthToken,venmoProfileId:this.venmoProfileId,googlePayMerchantId:this.googlePayMerchantId,hostedFieldConfig:this.hostedFieldConfig,hostingEnvironment:this.environment,referrer:this.referrer,loggedInUser:this.loggedInUser,origin:this.origin}),this.braintreeManager.on("paymentProvidersHostedFieldsRetry",o=>{this.dispatchEvent(new CustomEvent("paymentProvidersHostedFieldsRetry",{detail:{retryNumber:o}}))}),this.braintreeManager.on("paymentProvidersHostedFieldsFailed",o=>{this.dispatchEvent(new CustomEvent("paymentProvidersHostedFieldsFailed",{detail:{error:o}}))}))}async setupRecaptchaManager(){if(!this.recaptchaSiteKey||!this.paymentClients||this.recaptchaManagerSetup)return;this.recaptchaManagerSetup=!0;const o=await this.paymentClients.recaptchaLibrary.get();this.recaptchaManager=new Zt({grecaptchaLibrary:o,siteKey:this.recaptchaSiteKey})}firstUpdated(){this.configureFromQueryParams(),this.trackViewedEvent()}configureFromQueryParams(){const o=new URLSearchParams(window.location.search);let e=this.amountOptions;const t=o.get("dollarAmounts");t&&(e=t.slice(1,-1).split(",").map(E=>parseFloat(E)).filter(E=>!isNaN(E)));let n=this.donationInfo.coverFees;const a=o.get("coverFees");a&&(n=a==="true");let i=this.donationInfo.donationType;o.get("contrib_type")==="monthly"&&(i=w.Monthly);let c=this.donationInfo.amount;const p=o.get("amt");if(p){const f=ce(p).value;f>0&&(c=f)}const b=o.get("amountLayout");if(b){const f=b;Object.values(fe).includes(f)&&(this.amountSelectionLayout=f)}const y=o.get("frequencyMode");if(y){const f=y;Object.values(de).includes(f)&&(this.frequencySelectionMode=f)}this.amountOptions=e,this.donationInfo=new V({donationType:i,amount:c,coverFees:n})}setupPaymentFlowHandlers(){this.paymentFlowHandlers||!this.braintreeManager||!this.recaptchaManager||!this.modalManager||!this.recaptchaElement||(this.paymentFlowHandlers=new Yt({braintreeManager:this.braintreeManager,modalManager:this.modalManager,recaptchaManager:this.recaptchaManager,analytics:{logEvent:this.logEvent.bind(this),logDonationFlowEvent:this.logDonationFlowEvent.bind(this)}}),this.donationForm.braintreeManager=this.braintreeManager,this.donationForm.paymentFlowHandlers=this.paymentFlowHandlers,this.braintreeManager.startup(),this.paymentFlowHandlers.startup(),this.recaptchaManager.setup(this.recaptchaElement,1,"light","image"))}get hostedFieldConfig(){const o={input:{"font-size":"16px","font-family":'"Helvetica Neue", Helvetica, Arial, sans-serif',"font-weight":"700",color:"#333"},":focus":{color:"#333"},".valid":{color:"#333"},".invalid":{color:"#333"}},e={number:{selector:"#braintree-creditcard"},cvv:{selector:"#braintree-cvv"},expirationDate:{selector:"#braintree-expiration"}},t=this.creditCardFieldsElement.hostedFieldContainer;return new Bt({hostedFieldStyle:o,hostedFieldFieldOptions:e,hostedFieldContainer:t})}render(){return d`
      <div class="ia-donation-form-controller-container">
        <ia-donation-form
          .braintreeManager=${this.braintreeManager}
          .contactForm=${this.contactForm}
          .amountOptions=${this.amountOptions}
          .donationInfo=${this.donationInfo}
          .amountSelectionLayout=${this.amountSelectionLayout}
          .frequencySelectionMode=${this.frequencySelectionMode}
          @donationInfoChanged=${this.donationInfoChanged}
          @paymentProviderSelected=${this.paymentProviderSelected}
          @paymentFlowStarted=${this.paymentFlowStarted}
          @paymentFlowConfirmed=${this.paymentFlowConfirmed}
          @paymentFlowCancelled=${this.paymentFlowCancelled}
          @paymentFlowError=${this.paymentFlowError}
        >
          <!--
            Braintree's hosted fields, the PayPal button and recaptcha can't
            live in a shadow root, so they render here in the light DOM and
            are slotted into the form. See
            https://github.com/braintree/braintree-web-drop-in/issues/614
            and https://github.com/paypal/paypal-checkout-components/issues/353
          -->
          <div slot="braintree-hosted-fields">
            <ia-donation-credit-card-fields></ia-donation-credit-card-fields>
          </div>

          <!-- Autofill doesn't reach into shadow DOM, so the contact form is light DOM too -->
          <div slot="contact-form">
            <ia-donation-contact-form
              .donorEmail=${this.donorEmail}
            ></ia-donation-contact-form>
          </div>

          <div slot="paypal-button">
            <div id="paypal-button"></div>
          </div>

          <slot name="recaptcha" slot="recaptcha"></slot>
        </ia-donation-form>
      </div>

      ${this.getStyles}
    `}createRenderRoot(){return this}donationInfoChanged(o){this.logEvent("DonationInfoChanged"),this.donationInfo=o.detail.donationInfo}trackViewedEvent(){this.logEvent("Viewed")}paymentProviderSelected(o){const e=o.detail.paymentProvider,t=o.detail.previousPaymentProvider,n=this.removeSpaces(e??"unset");let a=`ProviderFirstSelected-${n}`,i;t!==void 0&&(a=`ProviderChangedTo-${n}`,i=`ProviderChangedFrom-${this.removeSpaces(t)}`),this.logEvent(a,i)}paymentFlowConfirmed(o){this.logEvent("PaymentFlowConfirmed",this.removeSpaces(o.detail.paymentProvider))}paymentFlowStarted(o){this.logEvent("PaymentFlowStarted",this.removeSpaces(o.detail.paymentProvider))}paymentFlowCancelled(o){this.logEvent("PaymentFlowCancelled",this.removeSpaces(o.detail.paymentProvider))}paymentFlowError(o){const e=this.removeSpaces(o.detail.paymentProvider);this.logEvent("PaymentFlowError",`${e}-${o.detail.error}`)}removeSpaces(o){return o.replace(/\s+/g,"")}logEvent(o,e){const t={action:o,label:e,category:this.analyticsCategory};this.analyticsHandler?.sendEvent(t)}logDonationFlowEvent(o,e){const t={action:o,label:e,category:"DonationFlow"};this.analyticsHandler?.sendEventNoSampling(t)}get getStyles(){return d`
      <style>
        .ia-donation-form-controller-container {
          --donation-form-controller-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          color: var(--ia-donation-form-text-color, #333);
          background-color: var(
            --ia-donation-form-background-color,
            transparent
          );

          --ia-donation-section-background-color: var(
            --ia-donation-form-background-color,
            transparent
          );
          --ia-donation-edit-background-color: var(
            --ia-donation-form-background-color,
            transparent
          );

          --ia-donation-section-badge-background-color: var(
            --ia-donation-form-badge-background-color,
            #333
          );
          --ia-donation-edit-badge-background-color: var(
            --ia-donation-form-badge-background-color,
            #333
          );

          --ia-donation-section-badge-font-color: var(
            --ia-donation-form-badge-text-color,
            #fff
          );
          --ia-donation-edit-badge-font-color: var(
            --ia-donation-form-badge-text-color,
            #fff
          );

          --ia-donation-edit-button-font-color: var(
            --ia-donation-form-payment-option-text-color
          );
          --ia-donation-edit-button-color: var(
            --ia-donation-form-payment-option-background-color
          );
          --ia-donation-edit-button-selected-color: var(
            --ia-donation-form-selected-option-background-color
          );
          --ia-donation-edit-button-selected-font-color: var(
            --ia-donation-form-selected-option-text-color
          );
        }

        .ia-donation-form-controller-container ia-donation-form:focus {
          outline: none;
        }

        /* The real PayPal button, kept but nearly invisible under the local one */
        .ia-donation-form-controller-container #paypal-button {
          opacity: 0.001;
          width: calc(var(--donation-form-controller-base-font-size--) * 5);
          height: calc(var(--donation-form-controller-base-font-size--) * 3);
          overflow: hidden;
        }

        .ia-donation-form-controller-container
          div[slot='braintree-hosted-fields'] {
          background-color: white;
        }
      </style>
    `}};g([l({type:String})],m.prototype,"environment",2);g([l({type:String})],m.prototype,"braintreeAuthToken",2);g([l({type:String})],m.prototype,"recaptchaSiteKey",2);g([l({type:String})],m.prototype,"venmoProfileId",2);g([l({type:String})],m.prototype,"googlePayMerchantId",2);g([l({type:String})],m.prototype,"analyticsCategory",2);g([l({type:Array})],m.prototype,"amountOptions",2);g([l({type:Object})],m.prototype,"donationInfo",2);g([l({type:String})],m.prototype,"amountSelectionLayout",2);g([l({type:String})],m.prototype,"frequencySelectionMode",2);g([l({type:String})],m.prototype,"referrer",2);g([l({type:String})],m.prototype,"loggedInUser",2);g([l({type:String})],m.prototype,"origin",2);g([l({type:String})],m.prototype,"donorEmail",2);g([l({type:Object})],m.prototype,"endpointManager",2);g([l({type:Object})],m.prototype,"analyticsHandler",2);g([l({type:Object})],m.prototype,"modalManager",2);g([l({type:Object})],m.prototype,"recaptchaElement",2);g([l({type:Object})],m.prototype,"braintreeManager",2);g([l({type:Object})],m.prototype,"recaptchaManager",2);g([l({type:Object})],m.prototype,"paymentFlowHandlers",2);g([l({type:Object})],m.prototype,"paymentClients",2);g([l({type:Object})],m.prototype,"lazyLoaderService",2);g([u("ia-donation-form")],m.prototype,"donationForm",2);g([u("ia-donation-credit-card-fields")],m.prototype,"creditCardFieldsElement",2);g([u("ia-donation-contact-form")],m.prototype,"contactForm",2);m=g([$("ia-donation-form-controller")],m);var Co=Object.defineProperty,Mo=Object.getOwnPropertyDescriptor,K=(o,e,t,n)=>{for(var a=n>1?void 0:n?Mo(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(a=(n?r(e,t,a):r(a))||a);return n&&a&&Co(e,t,a),a};const Ce={braintreeAuthToken:"sandbox_x634jsj7_7zybks4ybp63pbmd",recaptchaSiteKey:"6LeTUvYUAAAAAPTvW98MaXyS8c6vxk4-9n8DI1ve",venmoProfileId:"1953896702662410263"};class Po{constructor(e){this.onSuccess=e}async submitData(e){const t=await fetch("https://ia-petabox.archive.org/services/donations/braintree-charge.php?debug=true",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)});return new Re(await t.json())}donationSuccessful(e){const{successResponse:t,upsellSuccessResponse:n}=e;let a=`${t.paymentProvider} ${t.donationType} $${t.amount}, transaction ${t.transaction_id}`;n&&(a+=` + monthly upsell $${n.amount}`),this.onSuccess(a)}}class So{constructor(e){this.onEvent=e}sendPing(e){this.onEvent(`ping ${JSON.stringify(e)}`)}sendEvent(e){this.onEvent(`${e.category} / ${e.action} / ${e.label??""}`)}sendEventNoSampling(e){this.onEvent(`${e.category} / ${e.action} / ${e.label??""} (unsampled)`)}}const Fo=[{label:"Base font size",cssVariable:"--ia-donation-form-base-font-size",defaultValue:10,inputType:"range",min:8,max:16,step:1,unit:"px"},{section:"Color",label:"Text",cssVariable:"--ia-donation-form-text-color",defaultValue:"#333333",inputType:"color"},{section:"Color",label:"Step badge",cssVariable:"--ia-donation-form-badge-background-color",defaultValue:"#333333",inputType:"color"},{section:"Color",label:"Selected option",cssVariable:"--ia-donation-form-selected-option-background-color",defaultValue:"#f9bf3b",inputType:"color"},{section:"Color",label:"Donate button",cssVariable:"--ia-donation-form-donate-button-color",defaultValue:"#31a481",inputType:"color"},{section:"Font",label:"Label font size",cssVariable:"--ia-donation-field-label-font-size",defaultValue:14,inputType:"range",min:10,max:24,step:1,unit:"px"},{section:"Font",label:"Label color",cssVariable:"--ia-donation-field-label-color",defaultValue:"#2c2c2c",inputType:"color"},{section:"Font",label:"Field font size",cssVariable:"--ia-donation-contact-field-font-size",defaultValue:14,inputType:"range",min:10,max:24,step:1,unit:"px"},{section:"Font",label:"Field color",cssVariable:"--ia-donation-form-input-font-color",defaultValue:"#2c2c2c",inputType:"color"},{section:"Color",label:"Background",cssVariable:"--ia-donation-form-background-color",defaultValue:"transparent",inputType:"text",presets:[{label:"Mint",value:"#d1faed",note:"donate page"}],presetsInline:!0}],Io=[{label:"Frequency choice",propertyName:"frequencySelectionMode",defaultValue:"button",inputType:"radio",radioOptions:["button","checkbox"]},{label:"Amount layout",propertyName:"amountSelectionLayout",defaultValue:"multi-line",inputType:"radio",radioOptions:["multi-line","single-line"]},{label:"Donor email",propertyName:"donorEmail",defaultValue:""},{label:"Referrer",propertyName:"referrer",defaultValue:"elements-demo"}];let H=class extends F{constructor(){super(...arguments),this.sandboxConnected=!1,this.lastAnalyticsEvent="",this.lastSuccess="",this.endpointManager=new Po(o=>{this.lastSuccess=o}),this.analyticsHandler=new So(o=>{this.lastAnalyticsEvent=o})}createRenderRoot(){return this}firstUpdated(){this.controller.modalManager=this.modalManager,this.controller.recaptchaElement=this.recaptchaElement,this.controller.analyticsHandler=this.analyticsHandler}render(){const o=this.sandboxConnected;return d`
      <style>
        ia-donation-form-controller-story ia-donation-form-controller {
          display: block;
          max-width: 34rem;
        }

        ia-donation-form-controller-story #recaptcha {
          position: absolute;
          z-index: 10;
        }

        /* The modal manager covers the page whenever it is in the DOM, so
           only show it while a modal is open */
        ia-donation-form-controller-story modal-manager {
          display: none;
          --modalBottomMargin: 10px;
          --modalWidth: 320px;
        }

        ia-donation-form-controller-story modal-manager[mode='open'] {
          display: block;
        }

        ia-donation-form-controller-story .dev-tools h4 {
          margin: 0 0 0.25rem;
        }

        ia-donation-form-controller-story .dev-tools .row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        ia-donation-form-controller-story .dev-tools dl {
          margin: 0;
          display: grid;
          grid-template-columns: max-content 1fr;
          gap: 0.25rem 1rem;
        }

        ia-donation-form-controller-story .dev-tools dt {
          font-family: monospace;
        }

        ia-donation-form-controller-story .dev-tools dd {
          margin: 0;
          word-break: break-word;
        }

        ia-donation-form-controller-story .note {
          margin: 0.75rem 0 0;
          font-size: 0.85em;
          opacity: 0.8;
        }
      </style>

      <story-template
        elementTag="ia-donation-form-controller"
        elementClassName="IADonationFormController"
        importPath="ia-donation-form/ia-donation-form-controller"
        .defaultUsageProps=${'environment="dev"\n  braintreeAuthToken="${braintreeToken}"\n  recaptchaSiteKey="${recaptchaSiteKey}"\n  .endpointManager=${endpointManager}\n  .modalManager=${modalManager}\n  .recaptchaElement=${recaptchaElement}'}
        .styleInputData=${{settings:Fo,revertable:!0}}
        .propInputData=${{settings:Io}}
      >
        <ia-donation-form-controller
          slot="demo"
          referrer="elements-demo"
          .environment=${o?W.Development:void 0}
          .braintreeAuthToken=${o?Ce.braintreeAuthToken:void 0}
          .recaptchaSiteKey=${o?Ce.recaptchaSiteKey:void 0}
          .venmoProfileId=${o?Ce.venmoProfileId:void 0}
          .endpointManager=${this.endpointManager}
        ></ia-donation-form-controller>

        <div slot="settings" class="dev-tools">
          <h4>Braintree sandbox</h4>
          ${o?d`
                <p class="note">
                  Connected. Nothing is charged. Test card
                  <code>4111 1111 1111 1111</code>, any future expiry, any CVV.
                </p>
                <h4>Modals</h4>
                <div class="row">
                  <button type="button" @click=${this.showUpsell}>
                    Upsell
                  </button>
                  <button type="button" @click=${this.showPayPalUpsell}>
                    PayPal upsell
                  </button>
                  <button
                    type="button"
                    @click=${()=>this.showConfirmation(w.OneTime)}
                  >
                    Confirm one-time
                  </button>
                  <button
                    type="button"
                    @click=${()=>this.showConfirmation(w.Upsell)}
                  >
                    Confirm upsell
                  </button>
                </div>
              `:d`
                <div class="row">
                  <button
                    type="button"
                    id="connect-sandbox"
                    @click=${()=>{this.sandboxConnected=!0}}
                  >
                    Connect to the sandbox
                  </button>
                </div>
                <p class="note">
                  Loads the Braintree, PayPal, Google Pay and reCAPTCHA scripts
                  and turns on the payment buttons.
                </p>
              `}
          <h4>Events</h4>
          <dl>
            <dt>analytics</dt>
            <dd>${this.lastAnalyticsEvent||d`<i>none yet</i>`}</dd>
            <dt>donationSuccessful</dt>
            <dd>${this.lastSuccess||d`<i>none yet</i>`}</dd>
          </dl>
        </div>
      </story-template>

      <div id="recaptcha"></div>

      <modal-manager>
        <!-- The PayPal button can't live in a shadow root, so it's slotted from here -->
        <div slot="paypal-upsell-button">
          <div id="paypal-upsell-button"></div>
        </div>
      </modal-manager>
    `}showUpsell(){this.controller.showUpsellModalDev({oneTimeAmount:this.controller.donationInfo.amount,ctaMode:O.YesButton,yesSelected:o=>{this.lastSuccess=`upsell yes: $${o}`,this.modalManager.closeModal()},noSelected:()=>this.modalManager.closeModal()})}showPayPalUpsell(){this.controller.showUpsellModalDev({oneTimeAmount:this.controller.donationInfo.amount,ctaMode:O.PayPalUpsellSlot,noSelected:()=>this.modalManager.closeModal()})}showConfirmation(o){this.controller.showConfirmationStepDev({donationType:o,amount:o===w.Upsell?8:33,currencyType:"USD",cancelDonationCB:()=>{this.lastSuccess="confirmation cancelled",this.modalManager.closeModal()},confirmDonationCB:()=>{this.lastSuccess="confirmation confirmed",this.modalManager.closeModal()}})}};K([k()],H.prototype,"sandboxConnected",2);K([k()],H.prototype,"lastAnalyticsEvent",2);K([k()],H.prototype,"lastSuccess",2);K([u("ia-donation-form-controller")],H.prototype,"controller",2);K([u("modal-manager")],H.prototype,"modalManager",2);K([u("#recaptcha")],H.prototype,"recaptchaElement",2);H=K([$("ia-donation-form-controller-story")],H);export{H as IADonationFormControllerStory};
