(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();const ee=globalThis,xi=ee.ShadowRoot&&(ee.ShadyCSS===void 0||ee.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Si=Symbol(),ji=new WeakMap;let No=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==Si)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(xi&&t===void 0){const o=e!==void 0&&e.length===1;o&&(t=ji.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&ji.set(e,t))}return t}toString(){return this.cssText}};const fr=i=>new No(typeof i=="string"?i:i+"",void 0,Si),I=(i,...t)=>{const e=i.length===1?i[0]:t.reduce(((o,r,s)=>o+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[s+1]),i[0]);return new No(e,i,Si)},mr=(i,t)=>{if(xi)i.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const e of t){const o=document.createElement("style"),r=ee.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=e.cssText,i.appendChild(o)}},zi=xi?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return fr(e)})(i):i;const{is:vr,defineProperty:yr,getOwnPropertyDescriptor:br,getOwnPropertyNames:wr,getOwnPropertySymbols:$r,getPrototypeOf:_r}=Object,Oe=globalThis,Hi=Oe.trustedTypes,xr=Hi?Hi.emptyScript:"",Sr=Oe.reactiveElementPolyfillSupport,zt=(i,t)=>i,se={toAttribute(i,t){switch(t){case Boolean:i=i?xr:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Ci=(i,t)=>!vr(i,t),Fi={attribute:!0,type:String,converter:se,reflect:!1,useDefault:!1,hasChanged:Ci};Symbol.metadata??=Symbol("metadata"),Oe.litPropertyMetadata??=new WeakMap;let xt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Fi){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(t,o,e);r!==void 0&&yr(this.prototype,t,r)}}static getPropertyDescriptor(t,e,o){const{get:r,set:s}=br(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:r,set(a){const l=r?.call(this);s?.call(this,a),this.requestUpdate(t,l,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Fi}static _$Ei(){if(this.hasOwnProperty(zt("elementProperties")))return;const t=_r(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(zt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(zt("properties"))){const e=this.properties,o=[...wr(e),...$r(e)];for(const r of o)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[o,r]of e)this.elementProperties.set(o,r)}this._$Eh=new Map;for(const[e,o]of this.elementProperties){const r=this._$Eu(e,o);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const r of o)e.unshift(zi(r))}else t!==void 0&&e.push(zi(t));return e}static _$Eu(t,e){const o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return mr(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,o);if(r!==void 0&&o.reflect===!0){const s=(o.converter?.toAttribute!==void 0?o.converter:se).toAttribute(e,o.type);this._$Em=t,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const o=this.constructor,r=o._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const s=o.getPropertyOptions(r),a=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:se;this._$Em=r;const l=a.fromAttribute(e,s.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(t,e,o){if(t!==void 0){const r=this.constructor,s=this[t];if(o??=r.getPropertyOptions(t),!((o.hasChanged??Ci)(s,e)||o.useDefault&&o.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,o))))return;this.C(t,e,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:r,wrapped:s},a){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),s!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[r,s]of o){const{wrapped:a}=s,l=this[r];a!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,s,l)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(e)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};xt.elementStyles=[],xt.shadowRootOptions={mode:"open"},xt[zt("elementProperties")]=new Map,xt[zt("finalized")]=new Map,Sr?.({ReactiveElement:xt}),(Oe.reactiveElementVersions??=[]).push("2.1.1");const Ai=globalThis,ae=Ai.trustedTypes,qi=ae?ae.createPolicy("lit-html",{createHTML:i=>i}):void 0,Lo="$lit$",it=`lit$${Math.random().toFixed(9).slice(2)}$`,Vo="?"+it,Cr=`<${Vo}>`,gt=document,Ft=()=>gt.createComment(""),qt=i=>i===null||typeof i!="object"&&typeof i!="function",Ei=Array.isArray,Ar=i=>Ei(i)||typeof i?.[Symbol.iterator]=="function",Re=`[ 	
\f\r]`,Vt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ki=/-->/g,Wi=/>/g,nt=RegExp(`>|${Re}(?:([^\\s"'>=/]+)(${Re}*=${Re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Gi=/'/g,Ji=/"/g,Uo=/^(?:script|style|textarea|title)$/i,Er=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),u=Er(1),q=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),Zi=new WeakMap,pt=gt.createTreeWalker(gt,129);function jo(i,t){if(!Ei(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return qi!==void 0?qi.createHTML(t):t}const Or=(i,t)=>{const e=i.length-1,o=[];let r,s=t===2?"<svg>":t===3?"<math>":"",a=Vt;for(let l=0;l<e;l++){const n=i[l];let d,h,c=-1,m=0;for(;m<n.length&&(a.lastIndex=m,h=a.exec(n),h!==null);)m=a.lastIndex,a===Vt?h[1]==="!--"?a=Ki:h[1]!==void 0?a=Wi:h[2]!==void 0?(Uo.test(h[2])&&(r=RegExp("</"+h[2],"g")),a=nt):h[3]!==void 0&&(a=nt):a===nt?h[0]===">"?(a=r??Vt,c=-1):h[1]===void 0?c=-2:(c=a.lastIndex-h[2].length,d=h[1],a=h[3]===void 0?nt:h[3]==='"'?Ji:Gi):a===Ji||a===Gi?a=nt:a===Ki||a===Wi?a=Vt:(a=nt,r=void 0);const b=a===nt&&i[l+1].startsWith("/>")?" ":"";s+=a===Vt?n+Cr:c>=0?(o.push(d),n.slice(0,c)+Lo+n.slice(c)+it+b):n+it+(c===-2?l:b)}return[jo(i,s+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),o]};let ti=class zo{constructor({strings:t,_$litType$:e},o){let r;this.parts=[];let s=0,a=0;const l=t.length-1,n=this.parts,[d,h]=Or(t,e);if(this.el=zo.createElement(d,o),pt.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=pt.nextNode())!==null&&n.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const c of r.getAttributeNames())if(c.endsWith(Lo)){const m=h[a++],b=r.getAttribute(c).split(it),L=/([.?@])?(.*)/.exec(m);n.push({type:1,index:s,name:L[2],strings:b,ctor:L[1]==="."?Pr:L[1]==="?"?kr:L[1]==="@"?Mr:Te}),r.removeAttribute(c)}else c.startsWith(it)&&(n.push({type:6,index:s}),r.removeAttribute(c));if(Uo.test(r.tagName)){const c=r.textContent.split(it),m=c.length-1;if(m>0){r.textContent=ae?ae.emptyScript:"";for(let b=0;b<m;b++)r.append(c[b],Ft()),pt.nextNode(),n.push({type:2,index:++s});r.append(c[m],Ft())}}}else if(r.nodeType===8)if(r.data===Vo)n.push({type:2,index:s});else{let c=-1;for(;(c=r.data.indexOf(it,c+1))!==-1;)n.push({type:7,index:s}),c+=it.length-1}s++}}static createElement(t,e){const o=gt.createElement("template");return o.innerHTML=t,o}};function Ot(i,t,e=i,o){if(t===q)return t;let r=o!==void 0?e._$Co?.[o]:e._$Cl;const s=qt(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(i),r._$AT(i,e,o)),o!==void 0?(e._$Co??=[])[o]=r:e._$Cl=r),r!==void 0&&(t=Ot(i,r._$AS(i,t.values),r,o)),t}let Tr=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,r=(t?.creationScope??gt).importNode(e,!0);pt.currentNode=r;let s=pt.nextNode(),a=0,l=0,n=o[0];for(;n!==void 0;){if(a===n.index){let d;n.type===2?d=new Oi(s,s.nextSibling,this,t):n.type===1?d=new n.ctor(s,n.name,n.strings,this,t):n.type===6&&(d=new Ir(s,this,t)),this._$AV.push(d),n=o[++l]}a!==n?.index&&(s=pt.nextNode(),a++)}return pt.currentNode=gt,r}p(t){let e=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}},Oi=class Ho{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,r){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Ot(this,t,e),qt(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==q&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ar(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&qt(this._$AH)?this._$AA.nextSibling.data=t:this.T(gt.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,r=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=ti.createElement(jo(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===r)this._$AH.p(e);else{const s=new Tr(r,this),a=s.u(this.options);s.p(e),this.T(a),this._$AH=s}}_$AC(t){let e=Zi.get(t.strings);return e===void 0&&Zi.set(t.strings,e=new ti(t)),e}k(t){Ei(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,r=0;for(const s of t)r===e.length?e.push(o=new Ho(this.O(Ft()),this.O(Ft()),this,this.options)):o=e[r],o._$AI(s),r++;r<e.length&&(this._$AR(o&&o._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const o=t.nextSibling;t.remove(),t=o}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Te=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,r,s){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=$}_$AI(t,e=this,o,r){const s=this.strings;let a=!1;if(s===void 0)t=Ot(this,t,e,0),a=!qt(t)||t!==this._$AH&&t!==q,a&&(this._$AH=t);else{const l=t;let n,d;for(t=s[0],n=0;n<s.length-1;n++)d=Ot(this,l[o+n],e,n),d===q&&(d=this._$AH[n]),a||=!qt(d)||d!==this._$AH[n],d===$?t=$:t!==$&&(t+=(d??"")+s[n+1]),this._$AH[n]=d}a&&!r&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Pr=class extends Te{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}},kr=class extends Te{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}},Mr=class extends Te{constructor(t,e,o,r,s){super(t,e,o,r,s),this.type=5}_$AI(t,e=this){if((t=Ot(this,t,e,0)??$)===q)return;const o=this._$AH,r=t===$&&o!==$||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==$&&(o===$||r);r&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ir=class{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Ot(this,t)}};const Br=Ai.litHtmlPolyfillSupport;Br?.(ti,Oi),(Ai.litHtmlVersions??=[]).push("3.3.1");const Dr=(i,t,e)=>{const o=e?.renderBefore??t;let r=o._$litPart$;if(r===void 0){const s=e?.renderBefore??null;o._$litPart$=r=new Oi(t.insertBefore(Ft(),s),s,void 0,e??{})}return r._$AI(i),r};const Ti=globalThis;let x=class extends xt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Dr(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};x._$litElement$=!0,x.finalized=!0,Ti.litElementHydrateSupport?.({LitElement:x});const Rr=Ti.litElementPolyfillSupport;Rr?.({LitElement:x});(Ti.litElementVersions??=[]).push("4.2.1");const k=i=>(t,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(i,t)})):customElements.define(i,t)};const Nr={attribute:!0,type:String,converter:se,reflect:!1,hasChanged:Ci},Lr=(i=Nr,t,e)=>{const{kind:o,metadata:r}=e;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),o==="setter"&&((i=Object.create(i)).wrapped=!0),s.set(e.name,i),o==="accessor"){const{name:a}=e;return{set(l){const n=t.get.call(this);t.set.call(this,l),this.requestUpdate(a,n,i)},init(l){return l!==void 0&&this.C(a,void 0,i,l),l}}}if(o==="setter"){const{name:a}=e;return function(l){const n=this[a];t.call(this,l),this.requestUpdate(a,n,i)}}throw Error("Unsupported decorator location: "+o)};function v(i){return(t,e)=>typeof e=="object"?Lr(i,t,e):((o,r,s)=>{const a=r.hasOwnProperty(s);return r.constructor.createProperty(s,o),a?Object.getOwnPropertyDescriptor(r,s):void 0})(i,t,e)}function y(i){return v({...i,state:!0,attribute:!1})}const Fo=(i,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(i,t,e),e);function C(i,t){return(e,o,r)=>{const s=a=>a.renderRoot?.querySelector(i)??null;return Fo(e,o,{get(){return s(this)}})}}let Vr;function Pi(i){return(t,e)=>Fo(t,e,{get(){return(this.renderRoot??(Vr??=document.createDocumentFragment())).querySelectorAll(i)}})}const Q=I`
  :host {
    /*
    BASE STYLES
    Default fallback values for theme styles. Assumes 16px root font size.
    To adjust values, use theme styles below.
    */

    /* Typography */
    --default-font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

    /* Sizing */
    --default-icon-width: 1.25rem;
    --default-padding-sm: 5px;
    --default-combo-box-width: auto;
    --default-search-bar-width: auto;
    --default-search-bar-height: 30px;
    --default-font-size-standard: 0.875rem; /* 14px with 16px root font size */
    --default-font-size-lg: 2.25rem; /* 36px with 16px root font size */

    /* Colors */
    --true-white: #fff;
    --off-white: #fbfbfd;
    --dark-gray: #2c2c2c;
    --light-gray: #666;
    --classic-red: #e51c23;
    --mint-green: #31a481;
    --navy-blue: #194880;
    --bright-blue: #4b64ff;

    /*
    ADJUSTABLE STYLES
    To be adjusted by setting i.e. --ia-theme-link-color at the :root or component level.
    */

    /* Text */
    --base-font-family: var(
      --ia-theme-base-font-family,
      var(--default-font-family)
    );
    --primary-text-color: var(--ia-theme-primary-text-color, var(--dark-gray));
    --secondary-text-color: var(
      --ia-theme-secondary-text-color,
      var(--light-gray)
    );
    --link-color: var(--ia-theme-link-color, var(--bright-blue));

    /* Sizing */
    --icon-width: var(--ia-theme-icon-width, var(--default-icon-width));
    --padding-sm: var(--ia-theme-padding-sm, var(--default-padding-sm));
    --search-bar-height: var(
      --ia-theme-search-bar-height,
      var(--default-search-bar-height)
    );
    --search-bar-width: var(
      --ia-theme-search-bar-width,
      var(--default-search-bar-width)
    );
    --combo-box-width: var(
      --ia-theme-combo-box-width,
      var(--default-combo-box-width)
    );
    --font-size-standard: var(
      --ia-theme-font-size-standard,
      var(--default-font-size-standard)
    );
    --font-size-lg: var(--ia-theme-font-size-lg, var(--default-font-size-lg));

    /* Backgrounds and fills */
    --primary-background-color: var(
      --ia-theme-primary-background-color,
      var(--off-white)
    );
    --secondary-background-color: var(
      --ia-theme-secondary-background-color,
      var(--true-white)
    );

    /* State colors */
    --primary-cta-fill: var(--ia-theme-primary-cta-fill, var(--navy-blue));
    --primary-cta-text-color: var(
      --ia-theme-primary-cta-text-color,
      var(--true-white)
    );
    --color-success: var(--ia-theme-color-success, var(--mint-green));
    --color-danger: var(--ia-theme-color-danger, var(--classic-red));
  }
`;var Ur=Object.getOwnPropertyDescriptor,jr=(i,t,e,o)=>{for(var r=o>1?void 0:o?Ur(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(r)||r);return r};let ei=class extends x{render(){return u`
      <button>
        <slot></slot>
      </button>
    `}static get styles(){return[Q,I`
        :host {
          --primary-background-color--: var(--primary-cta-fill);
          --primary-text-color--: var(--primary-cta-text-color);
        }

        button {
          padding: 8px 16px;
          background-color: var(--primary-background-color--);
          color: var(--primary-text-color--);
        }
      `]}};ei=jr([k("ia-button")],ei);const Yi=Object.freeze(Object.defineProperty({__proto__:null,get IAButton(){return ei}},Symbol.toStringTag,{value:"Module"}));function ct(i,t,e){return i?t(i):e?.(i)}const ii=i=>i??$,zr="modulepreload",Hr=function(i,t){return new URL(i,t).href},Xi={},ie=function(t,e,o){let r=Promise.resolve();if(e&&e.length>0){let d=function(h){return Promise.all(h.map(c=>Promise.resolve(c).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),n=l?.nonce||l?.getAttribute("nonce");r=d(e.map(h=>{if(h=Hr(h,o),h in Xi)return;Xi[h]=!0;const c=h.endsWith(".css"),m=c?'[rel="stylesheet"]':"";if(o)for(let L=a.length-1;L>=0;L--){const V=a[L];if(V.href===h&&(!c||V.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${m}`))return;const b=document.createElement("link");if(b.rel=c?"stylesheet":zr,c||(b.as="script"),b.crossOrigin="",b.href=h,n&&b.setAttribute("nonce",n),document.head.appendChild(b),c)return new Promise((L,V)=>{b.addEventListener("load",L),b.addEventListener("error",()=>V(new Error(`Unable to preload CSS for ${h}`)))})}))}function s(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return r.then(a=>{for(const l of a||[])l.status==="rejected"&&s(l.reason);return t().catch(s)})};const et={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Pe=i=>(...t)=>({_$litDirective$:i,values:t});let ke=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};let oi=class extends ke{constructor(t){if(super(t),this.it=$,t.type!==et.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===$||t==null)return this._t=void 0,this.it=t;if(t===q)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};oi.directiveName="unsafeHTML",oi.resultType=1;const ri=Pe(oi),Fr=I`
  pre {
    max-height: var(--syntax-max-height, none);
    overflow-y: auto;
  }
  pre code.hljs {
    display: block;
    overflow-x: auto;
    padding: 1em;
  }
  code.hljs {
    padding: 3px 5px;
  }
  /*

Atom One Light by Daniel Gamage
Original One Light Syntax theme from https://github.com/atom/one-light-syntax

base:    #fafafa
mono-1:  #383a42
mono-2:  #686b77
mono-3:  #a0a1a7
hue-1:   #0184bb
hue-2:   #4078f2
hue-3:   #a626a4
hue-4:   #50a14f
hue-5:   #e45649
hue-5-2: #c91243
hue-6:   #986801
hue-6-2: #c18401

*/
  .hljs {
    color: #383a42;
    background: #fafafa;
  }
  .hljs-comment,
  .hljs-quote {
    color: #a0a1a7;
    font-style: italic;
  }
  .hljs-doctag,
  .hljs-keyword,
  .hljs-formula {
    color: #a626a4;
  }
  .hljs-section,
  .hljs-name,
  .hljs-selector-tag,
  .hljs-deletion,
  .hljs-subst {
    color: #e45649;
  }
  .hljs-literal {
    color: #0184bb;
  }
  .hljs-string,
  .hljs-regexp,
  .hljs-addition,
  .hljs-attribute,
  .hljs-meta .hljs-string {
    color: #50a14f;
  }
  .hljs-attr,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-type,
  .hljs-selector-class,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-number {
    color: #986801;
  }
  .hljs-symbol,
  .hljs-bullet,
  .hljs-link,
  .hljs-meta,
  .hljs-selector-id,
  .hljs-title {
    color: #4078f2;
  }
  .hljs-built_in,
  .hljs-title.class_,
  .hljs-class .hljs-title {
    color: #c18401;
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: bold;
  }
  .hljs-link {
    text-decoration: underline;
  }
`;var qr=Object.defineProperty,Kr=Object.getOwnPropertyDescriptor,Me=(i,t,e,o)=>{for(var r=o>1?void 0:o?Kr(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&qr(t,e,r),r};let Kt=class extends x{constructor(){super(...arguments),this.code="",this.language="auto",this.highlightedCode=""}willUpdate(i){(i.has("code")||i.has("language"))&&this.highlightCode()}render(){return u`
      <pre><code class="hljs">${ri(this.highlightedCode)}</code></pre>
    `}async highlightCode(){const t=(await ie(()=>import("./index-BBc-AmEf.js"),[],import.meta.url)).default,e=this.code.trim();let o;this.language==="auto"?o=t.highlightAuto(e).value:o=t.highlight(e,{language:this.language}).value,this.highlightedCode=o}static get styles(){return[Fr]}};Me([v({type:String})],Kt.prototype,"code",2);Me([v({type:String})],Kt.prototype,"language",2);Me([y()],Kt.prototype,"highlightedCode",2);Kt=Me([k("syntax-highlighter")],Kt);const Wr="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='36pt'%20height='36pt'%20viewBox='0%200%2036%2036'%20version='1.1'%3e%3cg%20id='surface35'%3e%3cpath%20style='%20stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;'%20d='M%2013.5%206.1875%20C%2012.878906%206.1875%2012.375%206.691406%2012.375%207.3125%20C%2012.375%207.933594%2012.878906%208.4375%2013.5%208.4375%20L%2014.0625%208.4375%20L%2014.0625%2013.523438%20C%2014.0625%2014.453125%2013.78125%2015.34375%2013.246094%2016.105469%20L%206.84375%2025.238281%20C%206.140625%2026.238281%206.054688%2027.535156%206.621094%2028.617188%20C%207.183594%2029.703125%208.292969%2030.375%209.515625%2030.375%20L%2026.484375%2030.375%20C%2027.707031%2030.375%2028.816406%2029.703125%2029.378906%2028.617188%20C%2029.941406%2027.535156%2029.859375%2026.238281%2029.15625%2025.238281%20L%2022.753906%2016.105469%20C%2022.21875%2015.34375%2021.9375%2014.453125%2021.9375%2013.523438%20L%2021.9375%208.4375%20L%2022.5%208.4375%20C%2023.121094%208.4375%2023.625%207.933594%2023.625%207.3125%20C%2023.625%206.691406%2023.121094%206.1875%2022.5%206.1875%20Z%20M%2016.3125%208.4375%20L%2019.6875%208.4375%20L%2019.6875%2013.523438%20C%2019.6875%2014.914062%2020.109375%2016.257812%2020.910156%2017.398438%20L%2020.941406%2017.4375%20L%2015.0625%2017.4375%20L%2015.089844%2017.398438%20C%2015.890625%2016.257812%2016.3125%2014.914062%2016.3125%2013.523438%20Z%20M%2015.1875%2020.8125%20C%2015.808594%2020.8125%2016.3125%2021.316406%2016.3125%2021.9375%20C%2016.3125%2022.558594%2015.808594%2023.0625%2015.1875%2023.0625%20C%2014.566406%2023.0625%2014.0625%2022.558594%2014.0625%2021.9375%20C%2014.0625%2021.316406%2014.566406%2020.8125%2015.1875%2020.8125%20Z%20M%2020.53125%2023.0625%20C%2021.617188%2023.0625%2022.5%2023.945312%2022.5%2025.03125%20C%2022.5%2026.117188%2021.617188%2027%2020.53125%2027%20C%2019.445312%2027%2018.5625%2026.117188%2018.5625%2025.03125%20C%2018.5625%2023.945312%2019.445312%2023.0625%2020.53125%2023.0625%20Z%20M%2020.53125%2023.0625%20'/%3e%3c/g%3e%3c/svg%3e";function ne(i){return i.toLowerCase().split(" ").join("-")}var Gr=Object.defineProperty,Jr=Object.getOwnPropertyDescriptor,ki=(i,t,e,o)=>{for(var r=o>1?void 0:o?Jr(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&Gr(t,e,r),r};let le=class extends x{render(){return this.styleInputData?u`
      <div class="settings-options">
        <table>
          ${this.styleInputData.settings.map(i=>u`
              <tr>
                <td>
                  <label for=${ne(i.label)}>${i.label}</label>
                </td>
                <td>
                  <input
                    id=${ne(i.label)}
                    class="style-input"
                    type=${i.inputType??"text"}
                    value=${i.defaultValue??""}
                    data-variable=${i.cssVariable}
                  />
                </td>
              </tr>
            `)}
        </table>
        <button @click=${this.applyStyles}>Apply</button>
      </div>
    `:$}applyStyles(){const i=[];this.styleInputs?.forEach(t=>{!t.dataset.variable||!t.value||i.push(`${t.dataset.variable}: ${t.value};`)}),this.dispatchEvent(new CustomEvent("stylesApplied",{detail:{styles:i.join(`
 `)}}))}static get styles(){return[Q,I`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }
      `]}};ki([v({type:Object})],le.prototype,"styleInputData",2);ki([Pi(".style-input")],le.prototype,"styleInputs",2);le=ki([k("story-styles-settings")],le);const qo=(i,t,e)=>{for(const o of t)if(o[0]===i)return(0,o[1])();return e?.()};var Zr=Object.defineProperty,Yr=Object.getOwnPropertyDescriptor,Mi=(i,t,e,o)=>{for(var r=o>1?void 0:o?Yr(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&Zr(t,e,r),r};let de=class extends x{render(){return this.propInputData?u`
      <div class="settings-options">
        <table>
          ${this.propInputData.settings.map(i=>qo(i.inputType,[["radio",()=>this.createRadioPropInput(i)]],()=>this.createDefaultPropInput(i))??$)}
        </table>
        <button @click=${this.applyProps}>Apply</button>
      </div>
    `:$}createDefaultPropInput(i){const t=ne(i.label);return u`
      <tr>
        <td><label for=${t}>${i.label}</label></td>
        <td>
          <input
            class="prop-input"
            type=${i.inputType??"text"}
            id=${t}
            data-prop=${i.propertyName}
            data-format=${typeof i.defaultValue}
            placeholder=${i.defaultValue}
          />
        </td>
      </tr>
    `}createRadioPropInput(i){if(i.inputType!=="radio"||!i.radioOptions)return $;const t=ne(i.label);return u`
      <tr>
        <td><legend>${i.label}</legend></td>
        <td>
          ${i.radioOptions.map(e=>u`<input
                  type="radio"
                  class="prop-input"
                  name=${t}
                  id="${t}-${e}"
                  value=${e}
                  data-prop=${i.propertyName}
                  data-format=${typeof i.defaultValue}
                  ?checked=${i.defaultValue===e}
                /><label for="${t}-${e}"> ${e} </label>`)}
        </td>
      </tr>
    `}applyProps(){const i=[],t=[];this.propInputs?.forEach(e=>{if(!e.dataset.prop||!e.value||e.type==="radio"&&!e.checked)return;const o=e.dataset.prop;let r=e.value;switch(e.dataset.format){case"number":r=parseInt(r);break;case"boolean":r==="true"&&(r=!0),r==="false"&&(r=!1);break}const s=typeof r=="string"?`'${r}'`:r.toString();i.push(`.${o}=\${${s}}`),t.push({propName:o,value:r})}),this.dispatchEvent(new CustomEvent("propsApplied",{detail:{stringifiedProps:i.join(`
  `),appliedProps:t}}))}static get styles(){return[Q,I`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }
      `]}};Mi([v({type:Object})],de.prototype,"propInputData",2);Mi([Pi(".prop-input")],de.prototype,"propInputs",2);de=Mi([k("story-props-settings")],de);var Xr=Object.defineProperty,Qr=Object.getOwnPropertyDescriptor,R=(i,t,e,o)=>{for(var r=o>1?void 0:o?Qr(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&Xr(t,e,r),r};let B=class extends x{constructor(){super(...arguments),this.elementTag="",this.elementClassName="",this.labs=!1,this.detailsVisible=!1,this.shouldShowPropertySettings=!1,this.shouldShowUsageNotes=!1,this.copiedKey=null}render(){return u`
      <div id="container">
        <h2>
          <code>&lt;${this.elementTag}&gt;</code>
          ${ct(this.labs,()=>u`<img
                src=${Wr}
                alt="Labs icon"
                title="Labs"
                class="labs-icon"
              />`)}
        </h2>
        <h3>Demo</h3>
        <div class="slot-container" style=${ii(this.stringifiedStyles)}>
          <slot
            name="demo"
            @slotchange=${this.handleDemoComponentSlotted}
          ></slot>
        </div>
        <button
          class="details-toggle ${this.detailsVisible?"expanded":"collapsed"}"
          @click=${()=>this.detailsVisible=!this.detailsVisible}
        >
          Import, Usage &amp; Settings
        </button>
        <div
          id="details"
          class="${this.detailsVisible?"expanded":"collapsed"}"
        >
          <div class="details-inner">${this.detailsTemplate}</div>
        </div>
      </div>
    `}get detailsTemplate(){return u`
      <h3>
        Import
        <button
          class="copy-btn ${this.copiedKey==="import"?"copied":""}"
          @click=${()=>this.copyToClipboard(this.importCode,"import")}
        >
          ${this.copiedKey==="import"?"Copied!":"Copy"}
        </button>
      </h3>
      <syntax-highlighter
        language="typescript"
        .code=${this.importCode}
      ></syntax-highlighter>
      <h3>
        Usage
        <button
          class="copy-btn ${this.copiedKey==="usage"?"copied":""}"
          @click=${()=>this.copyToClipboard(this.customExampleUsage??this.exampleUsage,"usage")}
        >
          ${this.copiedKey==="usage"?"Copied!":"Copy"}
        </button>
      </h3>
      <syntax-highlighter
        language="auto"
        .code=${this.customExampleUsage??this.exampleUsage}
      ></syntax-highlighter>
      ${ct(this.cssCode,()=>u`
          <h3>
            Styling
            <button
              class="copy-btn ${this.copiedKey==="styling"?"copied":""}"
              @click=${()=>this.copyToClipboard(this.cssCode,"styling")}
            >
              ${this.copiedKey==="styling"?"Copied!":"Copy"}
            </button>
          </h3>
          <syntax-highlighter
            language="css"
            .code=${this.cssCode}
          ></syntax-highlighter>
        `)}
      <div class="two-col">
        <div class="left-col">
          <h3>Settings</h3>
          ${ct(!!this.propInputData,()=>u`
              <story-props-settings
                .propInputData=${this.propInputData}
                @propsApplied=${this.handlePropsApplied}
              ></story-props-settings>
            `)}
          ${ct(!this.propInputData&&!this.shouldShowPropertySettings,()=>u`<p class="section-placeholder">No settings to adjust</p>`)}
          <div
            class="slot-container ${this.shouldShowPropertySettings?"":"hidden"}"
            @slotchange=${this.handleSettingsSlotChange}
          >
            <slot name="settings"></slot>
          </div>
        </div>
        <div class="right-col">
          <h3>Styles</h3>
          ${ct(!!this.styleInputData,()=>u`
              <story-styles-settings
                .styleInputData=${this.styleInputData}
                @stylesApplied=${this.handleStylesApplied}
              ></story-styles-settings>
            `,()=>u`<p class="section-placeholder">No styles to adjust</p>`)}
        </div>
      </div>
      ${ct(this.shouldShowUsageNotes,()=>u` <h3>Usage Notes</h3>`)}
      <div class="slot-container">
        <slot
          name="usage-notes"
          @slotchange=${this.handleUsageNotesSlotChange}
        ></slot>
      </div>
    `}async copyToClipboard(i,t){try{await navigator.clipboard.writeText(i),this.copiedKey=t,clearTimeout(this._copyTimeout),this._copyTimeout=setTimeout(()=>this.copiedKey=null,2e3)}catch(e){console.warn("Clipboard write failed:",e)}}get importCode(){return this.elementClassName?`import '${this.modulePath}';
import { ${this.elementClassName} } from '${this.modulePath}';`:`import '${this.modulePath}';`}get exampleUsage(){const i=this.defaultUsageProps?"  "+this.defaultUsageProps+`
`:"",t=this.stringifiedProps?"  "+this.stringifiedProps+`
`:"",e=!!i||!!t;return`<${this.elementTag}${e?`
`:""}${i}${t}></${this.elementTag}>`}get cssCode(){return this.stringifiedStyles?`${this.elementTag} {
 ${this.stringifiedStyles}
}`:""}get modulePath(){return this.labs?`@internetarchive/elements/labs/${this.elementTag}/${this.elementTag}`:`@internetarchive/elements/${this.elementTag}/${this.elementTag}`}handleSettingsSlotChange(i){const t=i.target.assignedElements();this.shouldShowPropertySettings=t.length>0}handleUsageNotesSlotChange(i){const t=i.target.assignedElements();this.shouldShowUsageNotes=t.length>0}handleDemoComponentSlotted(i){const t=i.target.assignedElements()[0];t&&(this.slottedDemoComponent=t)}handleStylesApplied(i){const t=i.detail.styles;t&&(this.stringifiedStyles=t)}handlePropsApplied(i){const t=i.detail.stringifiedProps,e=i.detail.appliedProps;!t||!e||(this.stringifiedProps=t,e.forEach(o=>{this.slottedDemoComponent[o.propName]=o.value}))}static get styles(){return[Q,I`
        #container {
          background: #f0f0f0;
          padding: 0 10px 10px;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
        }

        #details {
          display: grid;
          grid-template-rows: 1fr;
          transition: grid-template-rows 0.2s ease;
        }

        #details.collapsed {
          grid-template-rows: 0fr;
        }

        .details-inner {
          font-size: 14px;
          overflow: hidden;
          min-height: 0;
        }

        h2 {
          font-size: 0.85rem;
          font-weight: 600;
          margin: 10px 0 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        h3 {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #666;
          display: flex;
          align-items: center;
          gap: 5px;
          margin: 8px 0 4px;
          position: relative;
          z-index: 1;
        }

        .details-toggle {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 6px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #595959;
          cursor: pointer;
          user-select: none;
          border: none;
          background: none;
          padding: 0;
        }

        .details-toggle::before {
          content: '▾';
          font-size: 0.65rem;
          display: inline-block;
          transition: transform 0.15s;
        }

        .details-toggle.collapsed::before {
          transform: rotate(-90deg);
        }

        .copy-btn {
          background: none;
          border: 1px solid #bbb;
          border-radius: 3px;
          padding: 1px 7px;
          font-size: 0.7rem;
          cursor: pointer;
          color: #555;
          line-height: 1.4;
        }

        .copy-btn:hover {
          background: #0f3e6e;
          color: #fff;
          border-color: #0f3e6e;
        }

        .copy-btn.copied {
          background: #2a7a2a;
          color: #fff;
          border-color: #2a7a2a;
        }

        .slot-container {
          background-color: var(--primary-background-color);
          padding: 0.5em;
        }

        .slot-container.hidden {
          display: none;
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 12px;
        }

        .left-col,
        .right-col {
          min-width: 0;
        }

        .section-placeholder {
          font-size: 0.78rem;
          color: #767676;
          margin: 4px 0;
          font-style: italic;
        }

        .details-inner syntax-highlighter {
          display: block;
          --syntax-max-height: 5.5rem;
        }

        .labs-icon {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
      `]}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._copyTimeout)}};R([v({type:String})],B.prototype,"elementTag",2);R([v({type:String})],B.prototype,"elementClassName",2);R([v({type:String})],B.prototype,"customExampleUsage",2);R([v({type:String})],B.prototype,"defaultUsageProps",2);R([v({type:Object})],B.prototype,"styleInputData",2);R([v({type:Object})],B.prototype,"propInputData",2);R([v({type:Boolean})],B.prototype,"labs",2);R([y()],B.prototype,"detailsVisible",2);R([y()],B.prototype,"stringifiedStyles",2);R([y()],B.prototype,"stringifiedProps",2);R([y()],B.prototype,"shouldShowPropertySettings",2);R([y()],B.prototype,"shouldShowUsageNotes",2);R([y()],B.prototype,"slottedDemoComponent",2);R([y()],B.prototype,"copiedKey",2);B=R([k("story-template")],B);var ts=Object.getOwnPropertyDescriptor,es=(i,t,e,o)=>{for(var r=o>1?void 0:o?ts(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(r)||r);return r};const is=[{label:"Text Color (Primary)",cssVariable:"--ia-theme-primary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background Color (Primary)",cssVariable:"--ia-theme-primary-cta-fill",defaultValue:"#194880",inputType:"color"}];let si=class extends x{render(){return u`
      <story-template
        elementTag="ia-button"
        elementClassName="IAButton"
        .defaultUsageProps=${"@click=${() => alert('Button clicked!')}"}
        .styleInputData=${{settings:is}}
      >
        <div slot="demo">
          <ia-button @click=${()=>alert("Button clicked!")}
            >Click Me</ia-button
          >
        </div>
      </story-template>
    `}};si=es([k("ia-button-story")],si);const os=Object.freeze(Object.defineProperty({__proto__:null,get IAButtonStory(){return si}},Symbol.toStringTag,{value:"Module"})),Ko=JSON.parse(`[{"name":"Afghanistan","flag":"🇦🇫"},{"name":"Albania","flag":"🇦🇱"},{"name":"Algeria","flag":"🇩🇿"},{"name":"Andorra","flag":"🇦🇩"},{"name":"Angola","flag":"🇦🇴"},{"name":"Antigua and Barbuda","flag":"🇦🇬"},{"name":"Argentina","flag":"🇦🇷"},{"name":"Armenia","flag":"🇦🇲"},{"name":"Aruba","flag":"🇦🇼"},{"name":"Australia","flag":"🇦🇺"},{"name":"Austria","flag":"🇦🇹"},{"name":"Azerbaijan","flag":"🇦🇿"},{"name":"Bahamas","flag":"🇧🇸"},{"name":"Bahrain","flag":"🇧🇭"},{"name":"Bangladesh","flag":"🇧🇩"},{"name":"Barbados","flag":"🇧🇧"},{"name":"Belarus","flag":"🇧🇾"},{"name":"Belgium","flag":"🇧🇪"},{"name":"Belize","flag":"🇧🇿"},{"name":"Benin","flag":"🇧🇯"},{"name":"Bhutan","flag":"🇧🇹"},{"name":"Bolivia","flag":"🇧🇴"},{"name":"Bosnia and Herzegovina","flag":"🇧🇦"},{"name":"Botswana","flag":"🇧🇼"},{"name":"Brazil","flag":"🇧🇷"},{"name":"Brunei","flag":"🇧🇳"},{"name":"Bulgaria","flag":"🇧🇬"},{"name":"Burkina Faso","flag":"🇧🇫"},{"name":"Burundi","flag":"🇧🇮"},{"name":"Cabo Verde","flag":"🇨🇻"},{"name":"Cambodia","flag":"🇰🇭"},{"name":"Cameroon","flag":"🇨🇲"},{"name":"Canada","flag":"🇨🇦"},{"name":"Central African Republic","flag":"🇨🇫"},{"name":"Chad","flag":"🇹🇩"},{"name":"Chile","flag":"🇨🇱"},{"name":"China","flag":"🇨🇳"},{"name":"Colombia","flag":"🇨🇴"},{"name":"Comoros","flag":"🇰🇲"},{"name":"Cook Islands","flag":"🇨🇰"},{"name":"Costa Rica","flag":"🇨🇷"},{"name":"Côte d'Ivoire","flag":"🇨🇮"},{"name":"Croatia","flag":"🇭🇷"},{"name":"Cuba","flag":"🇨🇺"},{"name":"Cyprus","flag":"🇨🇾"},{"name":"Czechia","flag":"🇨🇿"},{"name":"Democratic Republic of the Congo","flag":"🇨🇩"},{"name":"Denmark","flag":"🇩🇰"},{"name":"Djibouti","flag":"🇩🇯"},{"name":"Dominica","flag":"🇩🇲"},{"name":"Dominican Republic","flag":"🇩🇴"},{"name":"Ecuador","flag":"🇪🇨"},{"name":"Egypt","flag":"🇪🇬"},{"name":"El Salvador","flag":"🇸🇻"},{"name":"Equatorial Guinea","flag":"🇬🇶"},{"name":"Eritrea","flag":"🇪🇷"},{"name":"Estonia","flag":"🇪🇪"},{"name":"Eswatini","flag":"🇸🇿"},{"name":"Ethiopia","flag":"🇪🇹"},{"name":"Fiji","flag":"🇫🇯"},{"name":"Finland","flag":"🇫🇮"},{"name":"France","flag":"🇫🇷"},{"name":"Gabon","flag":"🇬🇦"},{"name":"Gambia","flag":"🇬🇲"},{"name":"Georgia","flag":"🇬🇪"},{"name":"Germany","flag":"🇩🇪"},{"name":"Ghana","flag":"🇬🇭"},{"name":"Greece","flag":"🇬🇷"},{"name":"Grenada","flag":"🇬🇩"},{"name":"Guatemala","flag":"🇬🇹"},{"name":"Guinea","flag":"🇬🇳"},{"name":"Guinea-Bissau","flag":"🇬🇼"},{"name":"Guyana","flag":"🇬🇾"},{"name":"Haiti","flag":"🇭🇹"},{"name":"Honduras","flag":"🇭🇳"},{"name":"Hungary","flag":"🇭🇺"},{"name":"Iceland","flag":"🇮🇸"},{"name":"India","flag":"🇮🇳"},{"name":"Indonesia","flag":"🇮🇩"},{"name":"Iran","flag":"🇮🇷"},{"name":"Iraq","flag":"🇮🇶"},{"name":"Ireland","flag":"🇮🇪"},{"name":"Israel","flag":"🇮🇱"},{"name":"Italy","flag":"🇮🇹"},{"name":"Jamaica","flag":"🇯🇲"},{"name":"Japan","flag":"🇯🇵"},{"name":"Jordan","flag":"🇯🇴"},{"name":"Kazakhstan","flag":"🇰🇿"},{"name":"Kenya","flag":"🇰🇪"},{"name":"Kiribati","flag":"🇰🇮"},{"name":"Kosovo","flag":"🇽🇰"},{"name":"Kuwait","flag":"🇰🇼"},{"name":"Kyrgyzstan","flag":"🇰🇬"},{"name":"Laos","flag":"🇱🇦"},{"name":"Latvia","flag":"🇱🇻"},{"name":"Lebanon","flag":"🇱🇧"},{"name":"Lesotho","flag":"🇱🇸"},{"name":"Liberia","flag":"🇱🇷"},{"name":"Libya","flag":"🇱🇾"},{"name":"Liechtenstein","flag":"🇱🇮"},{"name":"Lithuania","flag":"🇱🇹"},{"name":"Luxembourg","flag":"🇱🇺"},{"name":"Madagascar","flag":"🇲🇬"},{"name":"Malawi","flag":"🇲🇼"},{"name":"Malaysia","flag":"🇲🇾"},{"name":"Maldives","flag":"🇲🇻"},{"name":"Mali","flag":"🇲🇱"},{"name":"Malta","flag":"🇲🇹"},{"name":"Marshall Islands","flag":"🇲🇭"},{"name":"Mauritania","flag":"🇲🇷"},{"name":"Mauritius","flag":"🇲🇺"},{"name":"Mexico","flag":"🇲🇽"},{"name":"Micronesia","flag":"🇫🇲"},{"name":"Moldova","flag":"🇲🇩"},{"name":"Monaco","flag":"🇲🇨"},{"name":"Mongolia","flag":"🇲🇳"},{"name":"Montenegro","flag":"🇲🇪"},{"name":"Morocco","flag":"🇲🇦"},{"name":"Mozambique","flag":"🇲🇿"},{"name":"Myanmar","flag":"🇲🇲"},{"name":"Namibia","flag":"🇳🇦"},{"name":"Nauru","flag":"🇳🇷"},{"name":"Nepal","flag":"🇳🇵"},{"name":"Netherlands","flag":"🇳🇱"},{"name":"New Zealand","flag":"🇳🇿"},{"name":"Nicaragua","flag":"🇳🇮"},{"name":"Niue","flag":"🇳🇺"},{"name":"Niger","flag":"🇳🇪"},{"name":"Nigeria","flag":"🇳🇬"},{"name":"North Korea","flag":"🇰🇵"},{"name":"North Macedonia","flag":"🇲🇰"},{"name":"Norway","flag":"🇳🇴"},{"name":"Oman","flag":"🇴🇲"},{"name":"Pakistan","flag":"🇵🇰"},{"name":"Palau","flag":"🇵🇼"},{"name":"Palestine","flag":"🇵🇸"},{"name":"Panama","flag":"🇵🇦"},{"name":"Papua New Guinea","flag":"🇵🇬"},{"name":"Paraguay","flag":"🇵🇾"},{"name":"Peru","flag":"🇵🇪"},{"name":"Philippines","flag":"🇵🇭"},{"name":"Poland","flag":"🇵🇱"},{"name":"Portugal","flag":"🇵🇹"},{"name":"Qatar","flag":"🇶🇦"},{"name":"Republic of the Congo","flag":"🇨🇬"},{"name":"Romania","flag":"🇷🇴"},{"name":"Russia","flag":"🇷🇺"},{"name":"Rwanda","flag":"🇷🇼"},{"name":"Saint Kitts and Nevis","flag":"🇰🇳"},{"name":"Saint Lucia","flag":"🇱🇨"},{"name":"Saint Vincent and the Grenadines","flag":"🇻🇨"},{"name":"Samoa","flag":"🇼🇸"},{"name":"San Marino","flag":"🇸🇲"},{"name":"Sao Tome and Principe","flag":"🇸🇹"},{"name":"Saudi Arabia","flag":"🇸🇦"},{"name":"Senegal","flag":"🇸🇳"},{"name":"Serbia","flag":"🇷🇸"},{"name":"Seychelles","flag":"🇸🇨"},{"name":"Sierra Leone","flag":"🇸🇱"},{"name":"Singapore","flag":"🇸🇬"},{"name":"Slovakia","flag":"🇸🇰"},{"name":"Slovenia","flag":"🇸🇮"},{"name":"Solomon Islands","flag":"🇸🇧"},{"name":"Somalia","flag":"🇸🇴"},{"name":"South Africa","flag":"🇿🇦"},{"name":"South Korea","flag":"🇰🇷"},{"name":"South Sudan","flag":"🇸🇸"},{"name":"Spain","flag":"🇪🇸"},{"name":"Sri Lanka","flag":"🇱🇰"},{"name":"Sudan","flag":"🇸🇩"},{"name":"Suriname","flag":"🇸🇷"},{"name":"Sweden","flag":"🇸🇪"},{"name":"Switzerland","flag":"🇨🇭"},{"name":"Syria","flag":"🇸🇾"},{"name":"Taiwan","flag":"🇹🇼"},{"name":"Tajikistan","flag":"🇹🇯"},{"name":"Tanzania","flag":"🇹🇿"},{"name":"Thailand","flag":"🇹🇭"},{"name":"Timor-Leste","flag":"🇹🇱"},{"name":"Togo","flag":"🇹🇬"},{"name":"Tonga","flag":"🇹🇴"},{"name":"Trinidad and Tobago","flag":"🇹🇹"},{"name":"Tunisia","flag":"🇹🇳"},{"name":"Turkey","flag":"🇹🇷"},{"name":"Turkmenistan","flag":"🇹🇲"},{"name":"Tuvalu","flag":"🇹🇻"},{"name":"Uganda","flag":"🇺🇬"},{"name":"Ukraine","flag":"🇺🇦"},{"name":"United Arab Emirates","flag":"🇦🇪"},{"name":"United Kingdom","flag":"🇬🇧"},{"name":"United States","flag":"🇺🇸"},{"name":"Uruguay","flag":"🇺🇾"},{"name":"Uzbekistan","flag":"🇺🇿"},{"name":"Vanuatu","flag":"🇻🇺"},{"name":"Vatican City","flag":"🇻🇦"},{"name":"Venezuela","flag":"🇻🇪"},{"name":"Vietnam","flag":"🇻🇳"},{"name":"Yemen","flag":"🇾🇪"},{"name":"Zambia","flag":"🇿🇲"},{"name":"Zimbabwe","flag":"🇿🇼"}]`);const Ne=Pe(class extends ke{constructor(i){if(super(i),i.type!==et.ATTRIBUTE||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter((t=>i[t])).join(" ")+" "}update(i,[t]){if(this.st===void 0){this.st=new Set,i.strings!==void 0&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(const o in t)t[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(t)}const e=i.element.classList;for(const o of this.st)o in t||(e.remove(o),this.st.delete(o));for(const o in t){const r=!!t[o];r===this.st.has(o)||this.nt?.has(o)||(r?(e.add(o),this.st.add(o)):(e.remove(o),this.st.delete(o)))}return q}});const rs=i=>i.strings===void 0,ss={},as=(i,t=ss)=>i._$AH=t;const ns=Pe(class extends ke{constructor(i){if(super(i),i.type!==et.PROPERTY&&i.type!==et.ATTRIBUTE&&i.type!==et.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!rs(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===q||t===$)return t;const e=i.element,o=i.name;if(i.type===et.PROPERTY){if(t===e[o])return q}else if(i.type===et.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(o))return q}else if(i.type===et.ATTRIBUTE&&e.getAttribute(o)===t+"")return q;return as(i),t}});const ls=i=>typeof i!="string"&&"strTag"in i,ds=(i,t,e)=>{let o=i[0];for(let r=1;r<i.length;r++)o+=t[r-1],o+=i[r];return o};const cs=(i=>ls(i)?ds(i.strings,i.values):i);let U=cs;class ps{constructor(){this.settled=!1,this.promise=new Promise((t,e)=>{this._resolve=t,this._reject=e})}resolve(t){this.settled=!0,this._resolve(t)}reject(t){this.settled=!0,this._reject(t)}}for(let i=0;i<256;i++)(i>>4&15).toString(16)+(i&15).toString(16);let hs=new ps;hs.resolve();function us(i,t){return t.some(e=>i.has(e))}function gs(i,t){const e=[...i],o=[...t],r=e.length,s=o.length;if(r===0)return!0;let a=0,l=0;for(;l<s;){if(o[l]===e[a]&&(a+=1),a>=r)return!0;l+=1}return!1}const fs="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501%202.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131%202.7226499%201.81402515z'%20%3e%3c/path%3e%3c/svg%3e",ms="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499%203.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501%202.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131%202.7226499-1.81402514z'%20%3e%3c/path%3e%3c/svg%3e",vs="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m50%200c27.6142375%200%2050%2022.3857625%2050%2050s-22.3857625%2050-50%2050-50-22.3857625-50-50%2022.3857625-50%2050-50zm23.8159475%2026.1840525c-1.4033215-1.4033215-3.5816761-1.5592461-5.1572272-.4677738l-.5598841.4677738-18.0988362%2018.0989475-18.0988362-18.0989475-.5598841-.4677738c-1.5755511-1.0914723-3.7539057-.9355477-5.1572272.4677738-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113l18.0989475%2018.0988362-18.0989475%2018.0988362c-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113%201.4033215%201.4033215%203.5816761%201.5592461%205.1572272.4677738l.5598841-.4677738%2018.0988362-18.0989475%2018.0988362%2018.0989475.5598841.4677738c1.5755511%201.0914723%203.7539057.9355477%205.1572272-.4677738%201.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113l-18.0989475-18.0988362%2018.0989475-18.0988362c1.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113z'%20fill-rule='evenodd'%20%3e%3c/path%3e%3c/svg%3e";var ys=Object.defineProperty,bs=Object.getOwnPropertyDescriptor,T=(i,t,e,o)=>{for(var r=o>1?void 0:o?bs(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&ys(t,e,r),r};const ws={all:()=>!0,prefix:(i,t)=>t.startsWith(i),suffix:(i,t)=>t.endsWith(i),substring:(i,t)=>t.includes(i),subsequence:gs},$s="list",_s="substring",xs=i=>i,Ss=i=>i.toLocaleLowerCase();let A=class extends x{constructor(){super(),this.options=[],this.behavior=$s,this.maxAutocompleteEntries=Number.POSITIVE_INFINITY,this.filter=_s,this.caseSensitive=!1,this.sort=!1,this.wrapArrowKeys=!1,this.stayOpen=!1,this.clearable=!1,this.open=!1,this.disabled=!1,this.required=!1,this.value=null,this.hasFocus=!1,this.highlightedOption=null,this.enteredText="",this.filterText="",this.losingFocus=!1,this.optionsByID=new Map,this.optionFilteringValues=new Map,this.optionsRespectingSortFlag=[],this.filteredOptions=[],this.internals=this.attachInternals()}render(){const i=Ne({disabled:this.disabled,focused:this.hasFocus});return u`
      <div id="container" part="container">
        ${this.labelTemplate}
        <div id="main-widget-row" class=${i} part="combo-box">
          ${this.textInputTemplate}
          ${this.clearable?this.clearButtonTemplate:$}
          ${this.caretButtonTemplate}
        </div>
        ${this.optionsListTemplate}
      </div>
    `}willUpdate(i){(i.has("options")||i.has("caseSensitive"))&&this.rebuildOptionFilteringValues(),i.has("options")&&this.rebuildOptionIDMap(),(i.has("options")||i.has("sort"))&&this.rebuildSortedOptions(),us(i,["options","behavior","maxAutocompleteEntries","filter","filterText","caseSensitive","sort"])&&this.rebuildFilteredOptions(),i.has("open")&&(this.open?this.value&&this.setHighlightedOption(this.selectedOption):this.setHighlightedOption(null)),i.has("required")&&this.updateFormValidity()}updated(i){i.has("value")&&this.handleValueChanged(),i.has("options")&&this.behavior!=="freeform"&&!this.selectedOption&&this.clearSelectedOption(),i.has("open")&&(this.open?(this.positionOptionsMenu(),this.optionsList?.showPopover?.(),this.optionsList?.classList.add("visible")):(this.optionsList?.hidePopover?.(),this.optionsList?.classList.remove("visible")))}get labelTemplate(){return u`
      <label id="label" for="text-input" part="label">
        <slot name="label"></slot>
      </label>
    `}get textInputTemplate(){const i=Ne({"clear-padding":this.clearable&&!this.shouldShowClearButton});return u`
      <input
        type="text"
        id="text-input"
        class=${i}
        .value=${ns(this.enteredText)}
        placeholder=${ii(this.placeholder)}
        part="text-input"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-controls="options-list"
        aria-expanded=${this.open}
        aria-activedescendant=${ii(this.highlightedOption?.id)}
        ?readonly=${this.behavior==="select-only"}
        ?disabled=${this.disabled}
        ?required=${this.required}
        @click=${this.handleComboBoxClick}
        @keydown=${this.handleComboBoxKeyDown}
        @input=${this.handleTextBoxInput}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      />
    `}get clearButtonTemplate(){return u`
      <button
        type="button"
        id="clear-button"
        part="clear-button"
        tabindex="-1"
        ?hidden=${!this.shouldShowClearButton}
        @click=${this.handleClearButtonClick}
      >
        <span class="sr-only">${U("Clear")}</span>
        <slot name="clear-button">
          <img
            class="icon clear-icon"
            part="icon clear-icon"
            src=${vs}
            alt=""
            aria-hidden="true"
          />
        </slot>
      </button>
    `}get caretTemplate(){return u`
      <slot name="caret-closed" ?hidden=${this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${fs}
          alt=""
          aria-hidden="true"
        />
      </slot>
      <slot name="caret-open" ?hidden=${!this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${ms}
          alt=""
          aria-hidden="true"
        />
      </slot>
    `}get caretButtonTemplate(){return u`
      <button
        type="button"
        id="caret-button"
        part="caret-button"
        tabindex="-1"
        aria-controls="options-list"
        aria-expanded=${this.open}
        ?disabled=${this.disabled}
        @click=${this.handleComboBoxClick}
        @keydown=${this.handleComboBoxKeyDown}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
        <span class="sr-only">${U("Toggle options")}</span>
        ${this.caretTemplate}
      </button>
    `}get optionsListTemplate(){return u`
      <ul
        id="options-list"
        part="options-list"
        role="listbox"
        tabindex="-1"
        popover
        ?hidden=${!this.open}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
        <slot name="options-list-top"></slot>
        ${ct(this.open,()=>this.optionTemplates)}
        <slot name="options-list-bottom"></slot>
      </ul>
    `}get optionTemplates(){return this.filteredOptions.length===0&&this.maxAutocompleteEntries>0?[this.emptyOptionsTemplate]:this.filteredOptions.map(i=>{const t=i===this.highlightedOption,e=Ne({option:!0,highlight:t});return u`
        <li
          id=${i.id}
          class=${e}
          part="option ${t?"highlight":""}"
          role="option"
          tabindex="-1"
          @pointerenter=${this.handleOptionPointerEnter}
          @pointermove=${this.handleOptionPointerMove}
          @click=${this.handleOptionClick}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        >
          ${i.content??i.text}
        </li>
      `})}get emptyOptionsTemplate(){return u`
      <li id="empty-options" part="empty-options">
        <slot name="empty-options">${U("No matching options")}</slot>
      </li>
    `}handleOptionPointerEnter(i){this.handleOptionPointerMove(i)}handleOptionPointerMove(i){const t=i.currentTarget,e=this.getOptionFor(t.id);e&&this.setHighlightedOption(e)}handleOptionClick(i){const t=i.currentTarget,e=this.getOptionFor(t.id);e&&(this.setSelectedOption(e.id),this.stayOpen||this.closeOptionsMenu())}handleComboBoxKeyDown(i){switch(i.key){case"Enter":this.handleEnterPressed();break;case"Escape":this.handleEscapePressed();break;case"ArrowUp":i.altKey?this.handleAltUpArrowPressed():this.handleUpArrowPressed();break;case"ArrowDown":i.altKey?this.handleAltDownArrowPressed():this.handleDownArrowPressed();break;case"Tab":this.handleTabPressed();return;case" ":this.handleSpacePressed(i);return;default:return}i.stopPropagation(),i.preventDefault()}async handleTextBoxInput(){const i=this.textInput?.value??"";this.enteredText=i,this.setFilterText(i),this.openOptionsMenu(),await this.updateComplete,this.highlightFirstOption()}handleEnterPressed(){if(!this.open){this.openOptionsMenu();return}this.highlightedOption?this.setSelectedOption(this.highlightedOption.id):this.behavior==="freeform"&&this.setValue(this.enteredText),this.stayOpen||(this.open=!1)}handleEscapePressed(){if(this.open){this.closeOptionsMenu();return}this.clearSelectedOption()}handleUpArrowPressed(){this.open||this.openOptionsMenu(),this.highlightPreviousOption()}handleDownArrowPressed(){this.open||this.openOptionsMenu(),this.highlightNextOption()}handleAltUpArrowPressed(){this.closeOptionsMenu()}handleAltDownArrowPressed(){this.openOptionsMenu()}handleTabPressed(){this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1))}handleSpacePressed(i){this.behavior==="select-only"&&(this.open?this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1)):this.openOptionsMenu(),i.stopPropagation(),i.preventDefault())}handleComboBoxClick(){this.toggleOptionsMenu()}handleClearButtonClick(){this.clearSelectedOption(),this.textInput?.focus(),this.openOptionsMenu()}handleFocus(){this.behavior!=="select-only"&&this.textInput?.focus(),this.hasFocus=!0,this.losingFocus=!1}handleBlur(){this.hasFocus=!1,this.losingFocus=!0,setTimeout(()=>{this.losingFocus&&!this.shadowRoot?.activeElement&&(this.losingFocus=!1,this.closeOptionsMenu(),this.behavior==="list"?this.setTextValue(this.selectedOption?.text??"",!1):this.behavior==="freeform"&&(this.enteredText||this.value)&&this.setValue(this.enteredText))},0)}handleValueChanged(){if(this.value==null){this.enteredText&&this.setTextValue("",!1);return}const i=this.getOptionFor(this.value);if(this.behavior==="freeform"){const t=i?.text??this.value;t!==this.enteredText&&this.setTextValue(t);return}if(!i){this.clearSelectedOption();return}this.enteredText!==i.text&&(this.setTextValue(i.text,!1),this.setFilterText(""))}highlightFirstOption(){this.setHighlightedOption(this.firstFilteredOption)}highlightLastOption(){this.setHighlightedOption(this.lastFilteredOption)}highlightPreviousOption(){const{filteredOptions:i,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightLastOption();return}const{highlightedIndex:e}=this,o=this.wrapArrowKeys&&e===0?t:Math.max(e-1,0);this.setHighlightedOption(i[o])}highlightNextOption(){const{filteredOptions:i,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightFirstOption();return}const{highlightedIndex:e}=this,o=this.wrapArrowKeys&&e===t?0:Math.min(e+1,t);this.setHighlightedOption(i[o])}async setHighlightedOption(i){this.highlightedOption=i,await this.updateComplete;const{optionsList:t,highlightedElement:e}=this;if(!e||!t)return;const o=e.getBoundingClientRect(),r=t.getBoundingClientRect();(o.top<r.top||o.bottom>r.bottom)&&e.scrollIntoView({block:"nearest"})}setSelectedOption(i){const t=this.getOptionFor(i);if(!t)throw new RangeError("Unknown option ID");const e=this.value;this.value=t.id,this.internals.setFormValue(this.value),this.setTextValue(t.text,!1),this.setFilterText(""),this.value!==e&&this.emitChangeEvent(),t.onSelected?.(t)}clearSelectedOption(){const i=this.value;this.value=null,this.internals.setFormValue(this.value),this.setTextValue(""),this.value!==i&&this.emitChangeEvent()}setValue(i){if(this.behavior==="freeform"){const t=this.value;this.value=i,this.internals.setFormValue(this.value),this.setTextValue(i),this.value!==t&&this.emitChangeEvent()}else this.setSelectedOption(i)}setTextValue(i,t=!0){this.textInput&&(this.textInput.value=i),this.enteredText=i,t&&this.setFilterText(i)}setFilterText(i){const{caseTransform:t}=this;this.filterText=t(i)}openOptionsMenu(){this.open=!0,this.emitToggleEvent()}closeOptionsMenu(){this.open=!1,this.emitToggleEvent()}toggleOptionsMenu(){this.open=!this.open,this.emitToggleEvent()}updateFormValidity(){this.required&&!this.value?this.internals.setValidity({valueMissing:!0},U("A value is required")):this.internals.setValidity({})}emitChangeEvent(){this.dispatchEvent(new CustomEvent("change",{detail:this.value}))}emitToggleEvent(){this.dispatchEvent(new CustomEvent("toggle",{detail:this.open}))}get isEmpty(){return!this.selectedOption&&!this.enteredText}get shouldShowClearButton(){return this.clearable&&!this.disabled&&!this.isEmpty}positionOptionsMenu(){const{mainWidgetRow:i,optionsList:t}=this;if(!i||!t)return;const e=i.getBoundingClientRect(),{innerHeight:o,scrollX:r,scrollY:s}=window,a=e.top,l=o-e.bottom,n="var(--combo-box-list-max-height--)",d={top:`${e.bottom+s}px`,left:`${e.left+r}px`,width:`var(--combo-box-list-width--, ${e.width}px)`,maxHeight:`min(${n}, ${l}px)`};Object.assign(t.style,d),setTimeout(()=>{const c=t.getBoundingClientRect().bottom>=o,m=a>l;c&&m&&(t.style.top="auto",t.style.bottom=`${o-e.top-s}px`,t.style.maxHeight=`min(${n}, ${a}px)`)},0)}get caseTransform(){return this.caseSensitive?xs:Ss}getOptionFor(i){return this.optionsByID.get(i)??null}rebuildOptionIDMap(){this.optionsByID.clear();for(const i of this.options)this.optionsByID.set(i.id,i)}rebuildSortedOptions(){this.sort?this.optionsRespectingSortFlag=[...this.options].sort((i,t)=>{const e=this.optionFilteringValues.get(i),o=this.optionFilteringValues.get(t);return e.localeCompare(o)}):this.optionsRespectingSortFlag=this.options}rebuildOptionFilteringValues(){this.optionFilteringValues.clear();const{caseTransform:i}=this;for(const t of this.options){const e=i(t.text);this.optionFilteringValues.set(t,e)}}rebuildFilteredOptions(){const i=this.behavior==="select-only"?"all":this.filter,t=typeof i=="string"?ws[i]:i,e=this.optionsRespectingSortFlag.filter(o=>{const r=this.optionFilteringValues.get(o);return r?t(this.filterText,r,o):!1}).slice(0,this.maxAutocompleteEntries);this.filteredOptions=e}get firstFilteredOption(){return this.filteredOptions[0]??null}get lastFilteredOption(){return this.filteredOptions[this.lastFilteredIndex]??null}get lastFilteredIndex(){return this.filteredOptions.length-1}get selectedOption(){return this.value==null?null:this.getOptionFor(this.value)}get highlightedIndex(){return this.highlightedOption?this.filteredOptions.indexOf(this.highlightedOption):-1}get highlightedElement(){return this.highlightedOption?this.shadowRoot.getElementById(this.highlightedOption.id):null}static get styles(){const i=I`
      :host {
        --combo-box-width--: var(--combo-box-width);
        --combo-box-padding--: var(--padding-sm);
        --combo-box-list-width--: var(--combo-box-list-width, unset);
        --combo-box-list-max-height--: var(--combo-box-list-max-height, 250px);
      }

      #container {
        display: inline-block;
        width: var(--combo-box-width--);
      }

      #label {
        display: block;
        width: fit-content;
      }

      #main-widget-row {
        display: inline-flex;
        align-items: stretch;
        flex-wrap: nowrap;
        background: white;
        border: 1px solid black;
        width: 100%;
      }

      #main-widget-row:not(.focused, .disabled):hover,
      #main-widget-row:not(.focused, .disabled):active {
        background: #fafafa;
      }

      #main-widget-row.focused {
        outline: black auto 1px;
        outline-offset: 3px;
      }

      #main-widget-row.disabled {
        background: #f4f4f4;
        border-color: #a0a0a0;
        color: #404040;
      }

      #text-input {
        appearance: none;
        background: transparent;
        border: none;
        padding: var(--combo-box-padding--);
        padding-right: 0;
        width: 100%;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        font-style: inherit;
        color: inherit;
        outline: none;
        text-overflow: ellipsis;
      }

      #text-input.clear-padding {
        padding-right: 30px;
      }

      #text-input:read-only {
        cursor: pointer;
      }

      #clear-button,
      #caret-button {
        display: inline-flex;
        align-items: center;
        appearance: none;
        background: transparent;
        border: none;
        padding: var(--combo-box-padding--) 5px;
        outline: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        font-style: inherit;
        cursor: pointer;
      }

      #clear-button {
        flex: 0 0 30px;
      }

      #clear-button[hidden] {
        display: none;
      }

      #caret-button {
        padding-right: var(--combo-box-padding--);
      }

      #options-list {
        position: absolute;
        list-style-type: none;
        margin: 1px 0 0;
        border: none;
        padding: 0;
        background: white;
        width: var(--combo-box-list-width--);
        max-height: 400px;
        box-shadow: 0 0 1px 1px #ddd;
        opacity: 0;
        transition: opacity 0.125s ease;
      }

      #options-list.visible {
        opacity: 1;
      }

      #empty-options {
        padding: 5px;
        color: #606060;
        font-style: italic;
        text-align: center;
      }

      .caret-icon {
        width: 0.875em;
        height: 0.875em;
      }

      .clear-icon {
        width: 1em;
        height: 1em;
      }

      .option {
        padding: 7px 5px;
        width: 100%;
        box-sizing: border-box;
        line-height: 1.1;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
      }

      .highlight {
        background-color: #dbe0ff;
      }

      .disabled,
      .disabled * {
        cursor: not-allowed !important;
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
        user-select: none !important;
      }
    `;return[Q,i]}};A.formAssociated=!0;A.shadowRootOptions={...x.shadowRootOptions,delegatesFocus:!0};T([v({type:Array})],A.prototype,"options",2);T([v({type:String})],A.prototype,"placeholder",2);T([v({type:String})],A.prototype,"behavior",2);T([v({type:Number,attribute:"max-autocomplete-entries"})],A.prototype,"maxAutocompleteEntries",2);T([v({type:String})],A.prototype,"filter",2);T([v({type:Boolean,reflect:!0,attribute:"case-sensitive"})],A.prototype,"caseSensitive",2);T([v({type:Boolean,reflect:!0})],A.prototype,"sort",2);T([v({type:Boolean,reflect:!0,attribute:"wrap-arrow-keys"})],A.prototype,"wrapArrowKeys",2);T([v({type:Boolean,reflect:!0,attribute:"stay-open"})],A.prototype,"stayOpen",2);T([v({type:Boolean,reflect:!0})],A.prototype,"clearable",2);T([v({type:Boolean,reflect:!0})],A.prototype,"open",2);T([v({type:Boolean,reflect:!0})],A.prototype,"disabled",2);T([v({type:Boolean,reflect:!0})],A.prototype,"required",2);T([v({type:String})],A.prototype,"value",2);T([y()],A.prototype,"hasFocus",2);T([y()],A.prototype,"highlightedOption",2);T([y()],A.prototype,"enteredText",2);T([y()],A.prototype,"filterText",2);T([C("#main-widget-row")],A.prototype,"mainWidgetRow",2);T([C("#text-input")],A.prototype,"textInput",2);T([C("#options-list")],A.prototype,"optionsList",2);A=T([k("ia-combo-box")],A);var Cs=Object.defineProperty,As=Object.getOwnPropertyDescriptor,E=(i,t,e,o)=>{for(var r=o>1?void 0:o?As(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&Cs(t,e,r),r};const Es=[{label:"Width",cssVariable:"--ia-theme-combo-box-width",defaultValue:"250px",inputType:"text"},{label:"Padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown width",cssVariable:"--combo-box-list-width",defaultValue:"",inputType:"text"},{label:"Dropdown max height",cssVariable:"--combo-box-list-max-height",defaultValue:"250px",inputType:"text"}],Wo=[{id:"red",text:"Red"},{id:"orange",text:"Orange"},{id:"yellow",text:"Yellow"},{id:"green",text:"Green"},{id:"blue",text:"Blue"},{id:"indigo",text:"Indigo"},{id:"violet",text:"Violet"}],Os=Wo.map(i=>({...i,content:u` <span style="display: flex; align-items: center">
      <span style="flex: 1">${i.text}</span>
      <div style="width: 15px; height: 15px; background:${i.id}"></div>
    </span>`})),Qi=Ko.map(i=>({id:i.name,text:i.name})),Ts=Ko.map(i=>({id:i.name,text:i.name,content:u`<span>${i.flag}</span>&nbsp;<span>${i.name}</span>`})),Ps="list",ks="Choices",to="Select an option...",eo=50,Ms="substring";let S=class extends x{constructor(){super(...arguments),this.options=Qi,this.behavior=Ps,this.label=ks,this.placeholder=to,this.maxAutocompleteEntries=eo,this.filterFn=Ms,this.caseSensitive=!1,this.shouldSort=!1,this.wrapArrowKeys=!0,this.clearable=!0,this.disabled=!1,this.announcerText=""}render(){return u`
      <story-template
        elementTag="ia-combo-box"
        elementClassName="IAComboBox"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:Es}}
      >
        <div slot="demo">
          <ia-combo-box
            .options=${this.options}
            .behavior=${this.behavior}
            .placeholder=${this.placeholder}
            .maxAutocompleteEntries=${this.maxAutocompleteEntries}
            .filter=${this.filterFn}
            ?case-sensitive=${this.caseSensitive}
            ?sort=${this.shouldSort}
            ?wrap-arrow-keys=${this.wrapArrowKeys}
            ?clearable=${this.clearable}
            ?disabled=${this.disabled}
            @change=${this.handleComboBoxChange}
          >
            <span slot="label">${this.label}</span>
          </ia-combo-box>
          <span id="announcer">${this.announcerText}</span>
        </div>

        <form slot="settings">
          <table>
            <tr>
              <td><label for="settings__options">Option set</label></td>
              <td>
                <select id="settings__options">
                  <option value="colors">Colors</option>
                  <option value="countries" selected>Countries</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label for="settings__custom-content">
                  Show custom option content
                </label>
              </td>
              <td><input type="checkbox" id="settings__custom-content" /></td>
            </tr>
            <tr>
              <td colspan="2"><hr /></td>
            </tr>
            <tr>
              <td><label for="settings__behavior">Behavior</label></td>
              <td>
                <select
                  id="settings__behavior"
                  @change=${()=>this.requestUpdate()}
                >
                  <option value="select-only">Select Only</option>
                  <option value="list" selected>List</option>
                  <option value="freeform">Freeform</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label for="settings__label">Label</label></td>
              <td>
                <input type="text" .value=${this.label} id="settings__label" />
              </td>
            </tr>
            <tr>
              <td><label for="settings__placeholder">Placeholder</label></td>
              <td>
                <input
                  type="text"
                  value=${to}
                  id="settings__placeholder"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label for="settings__max-entries">
                  Max autocomplete entries
                </label>
              </td>
              <td>
                <input
                  type="number"
                  value=${eo}
                  min="0"
                  id="settings__max-entries"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label for="settings__filter-fn">Filtering function</label>
              </td>
              <td>
                <select
                  id="settings__filter-fn"
                  ?disabled=${this.behaviorSelect?.value==="select-only"}
                >
                  <option value="all">All</option>
                  <option value="prefix">Prefix</option>
                  <option value="suffix">Suffix</option>
                  <option value="substring" selected>Substring</option>
                  <option value="subsequence">Subsequence</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label for="settings__case-sensitive">
                  Case sensitive filtering
                </label>
              </td>
              <td>
                <input
                  type="checkbox"
                  id="settings__case-sensitive"
                  ?disabled=${this.behaviorSelect?.value==="select-only"}
                />
              </td>
            </tr>
            <tr>
              <td><label for="settings__sort">Sort items</label></td>
              <td><input type="checkbox" id="settings__sort" /></td>
            </tr>
            <tr>
              <td>
                <label for="settings__wrap">Wrap arrow-key navigation</label>
              </td>
              <td><input type="checkbox" checked id="settings__wrap" /></td>
            </tr>
            <tr>
              <td>
                <label for="settings__clearable">Show clear button</label>
              </td>
              <td>
                <input type="checkbox" checked id="settings__clearable" />
              </td>
            </tr>
            <tr>
              <td><label for="settings__disabled">Disabled</label></td>
              <td><input type="checkbox" id="settings__disabled" /></td>
            </tr>
          </table>
          <button type="submit" @click=${this.applySettings}>Apply</button>
        </form>
      </story-template>
    `}get exampleUsage(){const{placeholder:i,behavior:t,maxAutocompleteEntries:e,filterFn:o}=this,r={behavior:t?`"${t}"`:"",placeholder:i?`"${i}"`:"","max-autocomplete-entries":e?`"${e}"`:"",filter:o&&o!=="substring"?`"${o}"`:"","case-sensitive":this.caseSensitive,sort:this.shouldSort,"wrap-arrow-keys":this.wrapArrowKeys,clearable:this.clearable,disabled:this.disabled};return`
      <ia-combo-box
        .options=\${[
          { id: 'foo', text: 'Foo Option' },
          { id: 'bar', text: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(r).map(([a,l])=>l?l===!0?a:l?`${a}=${l}`:"":"").join(`
  `)}
      >
        <span slot="label">${this.label}</span>
      </ia-combo-box>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(i){i.preventDefault(),this.updateOptions(),this.behavior=this.behaviorSelect.value,this.label=this.labelInput.value,this.placeholder=this.placeholderInput.value,this.maxAutocompleteEntries=Number(this.maxAutocompleteInput.value),this.filterFn=this.filterFnSelect.value,this.caseSensitive=this.caseSensitiveCheck.checked,this.shouldSort=this.sortCheck.checked,this.wrapArrowKeys=this.wrapArrowKeysCheck.checked,this.clearable=this.clearableCheck.checked,this.disabled=this.disabledCheck.checked}updateOptions(){switch(this.optionSetSelect.value){case"colors":this.options=this.customContentCheck.checked?Os:Wo;break;case"countries":this.options=this.customContentCheck.checked?Ts:Qi;break;default:this.options=[]}}handleComboBoxChange(i){this.announcerText=`New value is: ${i.detail}`}static get styles(){return I`
      #announcer {
        margin-left: 20px;
      }

      table {
        margin-bottom: 5px;
      }

      tr:nth-child(even) {
        background-color: rgba(0, 0, 0, 0.02);
      }

      label {
        display: block;
      }

      select {
        width: calc(100% - 5px);
        padding: 2px 0;
      }

      input[type='checkbox'] {
        width: 18px;
        height: 18px;
      }

      input[type='text'],
      input[type='number'] {
        box-sizing: border-box;
        width: calc(100% - 5px);
        padding: 2px 3px;
      }

      select,
      input[type='text'],
      input[type='number'],
      input[type='checkbox'] {
        margin-left: 5px;
      }

      button[type='submit'] {
        padding: 6px 8px;
      }
    `}};E([y()],S.prototype,"options",2);E([y()],S.prototype,"behavior",2);E([y()],S.prototype,"label",2);E([y()],S.prototype,"placeholder",2);E([y()],S.prototype,"maxAutocompleteEntries",2);E([y()],S.prototype,"filterFn",2);E([y()],S.prototype,"caseSensitive",2);E([y()],S.prototype,"shouldSort",2);E([y()],S.prototype,"wrapArrowKeys",2);E([y()],S.prototype,"clearable",2);E([y()],S.prototype,"disabled",2);E([y()],S.prototype,"announcerText",2);E([C("#settings__options")],S.prototype,"optionSetSelect",2);E([C("#settings__custom-content")],S.prototype,"customContentCheck",2);E([C("#settings__behavior")],S.prototype,"behaviorSelect",2);E([C("#settings__label")],S.prototype,"labelInput",2);E([C("#settings__placeholder")],S.prototype,"placeholderInput",2);E([C("#settings__max-entries")],S.prototype,"maxAutocompleteInput",2);E([C("#settings__filter-fn")],S.prototype,"filterFnSelect",2);E([C("#settings__case-sensitive")],S.prototype,"caseSensitiveCheck",2);E([C("#settings__sort")],S.prototype,"sortCheck",2);E([C("#settings__wrap")],S.prototype,"wrapArrowKeysCheck",2);E([C("#settings__clearable")],S.prototype,"clearableCheck",2);E([C("#settings__disabled")],S.prototype,"disabledCheck",2);S=E([k("ia-combo-box-story")],S);const Is=Object.freeze(Object.defineProperty({__proto__:null,get IAComboBoxStory(){return S}},Symbol.toStringTag,{value:"Module"}));function*Bs(i,t){if(i!==void 0){let e=0;for(const o of i)yield t(o,e++)}}const Ds="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20class='fill-color'%20d='m17.0555551%2041.3194459c0-12.7430552%2010.3541664-23.1027772%2023.0847216-23.1027772%2012.7166664%200%2023.0777773%2010.359722%2023.0777773%2023.1027772%200%2012.7361108-10.3611109%2023.0986106-23.0777773%2023.0986106-12.7305552%200-23.0847216-10.3624998-23.0847216-23.0986106zm-17.24305512%200c0%2022.2916661%2018.04583292%2040.3472213%2040.32777672%2040.3472213%208.9208332%200%2017.145833-2.9319449%2023.8194439-7.8527776l24.1513883%2024.0777771c1.2125%201.1402778%202.8430555%201.8430556%204.6374999%201.8430556%203.7444443%200%206.7805554-3.0361111%206.7805554-6.7791665%200-2.0652778-.9222222-3.9069444-2.3736111-5.1499999l-23.718055-23.7458328c4.4152777-6.4791665%207.0152776-14.3055552%207.0152776-22.7402772%200-22.2791661-18.0458328-40.34861006-40.312499-40.34861006-22.2819438%200-40.32777672%2018.06944396-40.32777672%2040.34861006z'%20fill='%232c2c2c'%20fill-rule='evenodd'%20/%3e%3c/svg%3e";function _(i,t,e,o){var r=arguments.length,s=r<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,e):o,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(i,t,e,o);else for(var l=i.length-1;l>=0;l--)(a=i[l])&&(s=(r<3?a(s):r>3?a(t,e,s):a(t,e))||s);return r>3&&s&&Object.defineProperty(t,e,s),s}const oe=window,Ii=oe.ShadowRoot&&(oe.ShadyCSS===void 0||oe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Bi=Symbol(),io=new WeakMap;let Go=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==Bi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Ii&&t===void 0){const o=e!==void 0&&e.length===1;o&&(t=io.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&io.set(e,t))}return t}toString(){return this.cssText}};const Rs=i=>new Go(typeof i=="string"?i:i+"",void 0,Bi),Ns=(i,...t)=>{const e=i.length===1?i[0]:t.reduce(((o,r,s)=>o+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[s+1]),i[0]);return new Go(e,i,Bi)},Ls=(i,t)=>{Ii?i.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((e=>{const o=document.createElement("style"),r=oe.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=e.cssText,i.appendChild(o)}))},oo=Ii?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return Rs(e)})(i):i;var Le;const ce=window,ro=ce.trustedTypes,Vs=ro?ro.emptyScript:"",so=ce.reactiveElementPolyfillSupport,ai={toAttribute(i,t){switch(t){case Boolean:i=i?Vs:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Jo=(i,t)=>t!==i&&(t==t||i==i),Ve={attribute:!0,type:String,converter:ai,reflect:!1,hasChanged:Jo},ni="finalized";let St=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,o)=>{const r=this._$Ep(o,e);r!==void 0&&(this._$Ev.set(r,o),t.push(r))})),t}static createProperty(t,e=Ve){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const o=typeof t=="symbol"?Symbol():"__"+t,r=this.getPropertyDescriptor(t,o,e);r!==void 0&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,o){return{get(){return this[e]},set(r){const s=this[t];this[e]=r,this.requestUpdate(t,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Ve}static finalize(){if(this.hasOwnProperty(ni))return!1;this[ni]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,o=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const r of o)this.createProperty(r,e[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const r of o)e.unshift(oo(r))}else t!==void 0&&e.push(oo(t));return e}static _$Ep(t,e){const o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach((e=>e(this)))}addController(t){var e,o;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((o=t.hostConnected)===null||o===void 0||o.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Ls(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach((e=>{var o;return(o=e.hostConnected)===null||o===void 0?void 0:o.call(e)}))}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach((e=>{var o;return(o=e.hostDisconnected)===null||o===void 0?void 0:o.call(e)}))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EO(t,e,o=Ve){var r;const s=this.constructor._$Ep(t,o);if(s!==void 0&&o.reflect===!0){const a=(((r=o.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?o.converter:ai).toAttribute(e,o.type);this._$El=t,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$El=null}}_$AK(t,e){var o;const r=this.constructor,s=r._$Ev.get(t);if(s!==void 0&&this._$El!==s){const a=r.getPropertyOptions(s),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((o=a.converter)===null||o===void 0?void 0:o.fromAttribute)!==void 0?a.converter:ai;this._$El=s,this[s]=l.fromAttribute(e,a.type),this._$El=null}}requestUpdate(t,e,o){let r=!0;t!==void 0&&(((o=o||this.constructor.getPropertyOptions(t)).hasChanged||Jo)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),o.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,o))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((r,s)=>this[s]=r)),this._$Ei=void 0);let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),(t=this._$ES)===null||t===void 0||t.forEach((r=>{var s;return(s=r.hostUpdate)===null||s===void 0?void 0:s.call(r)})),this.update(o)):this._$Ek()}catch(r){throw e=!1,this._$Ek(),r}e&&this._$AE(o)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach((o=>{var r;return(r=o.hostUpdated)===null||r===void 0?void 0:r.call(o)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach(((e,o)=>this._$EO(o,this[o],e))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};St[ni]=!0,St.elementProperties=new Map,St.elementStyles=[],St.shadowRootOptions={mode:"open"},so?.({ReactiveElement:St}),((Le=ce.reactiveElementVersions)!==null&&Le!==void 0?Le:ce.reactiveElementVersions=[]).push("1.6.3");var Ue;const pe=window,Tt=pe.trustedTypes,ao=Tt?Tt.createPolicy("lit-html",{createHTML:i=>i}):void 0,li="$lit$",ot=`lit$${(Math.random()+"").slice(9)}$`,Zo="?"+ot,Us=`<${Zo}>`,ft=document,Wt=()=>ft.createComment(""),Gt=i=>i===null||typeof i!="object"&&typeof i!="function",Yo=Array.isArray,js=i=>Yo(i)||typeof i?.[Symbol.iterator]=="function",je=`[ 	
\f\r]`,Ut=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,no=/-->/g,lo=/>/g,lt=RegExp(`>|${je}(?:([^\\s"'>=/]+)(${je}*=${je}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),co=/'/g,po=/"/g,Xo=/^(?:script|style|textarea|title)$/i,zs=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),Hs=zs(1),Pt=Symbol.for("lit-noChange"),O=Symbol.for("lit-nothing"),ho=new WeakMap,ht=ft.createTreeWalker(ft,129,null,!1);function Qo(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ao!==void 0?ao.createHTML(t):t}const Fs=(i,t)=>{const e=i.length-1,o=[];let r,s=t===2?"<svg>":"",a=Ut;for(let l=0;l<e;l++){const n=i[l];let d,h,c=-1,m=0;for(;m<n.length&&(a.lastIndex=m,h=a.exec(n),h!==null);)m=a.lastIndex,a===Ut?h[1]==="!--"?a=no:h[1]!==void 0?a=lo:h[2]!==void 0?(Xo.test(h[2])&&(r=RegExp("</"+h[2],"g")),a=lt):h[3]!==void 0&&(a=lt):a===lt?h[0]===">"?(a=r??Ut,c=-1):h[1]===void 0?c=-2:(c=a.lastIndex-h[2].length,d=h[1],a=h[3]===void 0?lt:h[3]==='"'?po:co):a===po||a===co?a=lt:a===no||a===lo?a=Ut:(a=lt,r=void 0);const b=a===lt&&i[l+1].startsWith("/>")?" ":"";s+=a===Ut?n+Us:c>=0?(o.push(d),n.slice(0,c)+li+n.slice(c)+ot+b):n+ot+(c===-2?(o.push(void 0),l):b)}return[Qo(i,s+(i[e]||"<?>")+(t===2?"</svg>":"")),o]};let di=class tr{constructor({strings:t,_$litType$:e},o){let r;this.parts=[];let s=0,a=0;const l=t.length-1,n=this.parts,[d,h]=Fs(t,e);if(this.el=tr.createElement(d,o),ht.currentNode=this.el.content,e===2){const c=this.el.content,m=c.firstChild;m.remove(),c.append(...m.childNodes)}for(;(r=ht.nextNode())!==null&&n.length<l;){if(r.nodeType===1){if(r.hasAttributes()){const c=[];for(const m of r.getAttributeNames())if(m.endsWith(li)||m.startsWith(ot)){const b=h[a++];if(c.push(m),b!==void 0){const L=r.getAttribute(b.toLowerCase()+li).split(ot),V=/([.?@])?(.*)/.exec(b);n.push({type:1,index:s,name:V[2],strings:L,ctor:V[1]==="."?Ks:V[1]==="?"?Gs:V[1]==="@"?Js:Ie})}else n.push({type:6,index:s})}for(const m of c)r.removeAttribute(m)}if(Xo.test(r.tagName)){const c=r.textContent.split(ot),m=c.length-1;if(m>0){r.textContent=Tt?Tt.emptyScript:"";for(let b=0;b<m;b++)r.append(c[b],Wt()),ht.nextNode(),n.push({type:2,index:++s});r.append(c[m],Wt())}}}else if(r.nodeType===8)if(r.data===Zo)n.push({type:2,index:s});else{let c=-1;for(;(c=r.data.indexOf(ot,c+1))!==-1;)n.push({type:7,index:s}),c+=ot.length-1}s++}}static createElement(t,e){const o=ft.createElement("template");return o.innerHTML=t,o}};function kt(i,t,e=i,o){var r,s,a,l;if(t===Pt)return t;let n=o!==void 0?(r=e._$Co)===null||r===void 0?void 0:r[o]:e._$Cl;const d=Gt(t)?void 0:t._$litDirective$;return n?.constructor!==d&&((s=n?._$AO)===null||s===void 0||s.call(n,!1),d===void 0?n=void 0:(n=new d(i),n._$AT(i,e,o)),o!==void 0?((a=(l=e)._$Co)!==null&&a!==void 0?a:l._$Co=[])[o]=n:e._$Cl=n),n!==void 0&&(t=kt(i,n._$AS(i,t.values),n,o)),t}let qs=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:o},parts:r}=this._$AD,s=((e=t?.creationScope)!==null&&e!==void 0?e:ft).importNode(o,!0);ht.currentNode=s;let a=ht.nextNode(),l=0,n=0,d=r[0];for(;d!==void 0;){if(l===d.index){let h;d.type===2?h=new Di(a,a.nextSibling,this,t):d.type===1?h=new d.ctor(a,d.name,d.strings,this,t):d.type===6&&(h=new Zs(a,this,t)),this._$AV.push(h),d=r[++n]}l!==d?.index&&(a=ht.nextNode(),l++)}return ht.currentNode=ft,s}v(t){let e=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}},Di=class er{constructor(t,e,o,r){var s;this.type=2,this._$AH=O,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=r,this._$Cp=(s=r?.isConnected)===null||s===void 0||s}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=kt(this,t,e),Gt(t)?t===O||t==null||t===""?(this._$AH!==O&&this._$AR(),this._$AH=O):t!==this._$AH&&t!==Pt&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):js(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==O&&Gt(this._$AH)?this._$AA.nextSibling.data=t:this.$(ft.createTextNode(t)),this._$AH=t}g(t){var e;const{values:o,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=di.createElement(Qo(r.h,r.h[0]),this.options)),r);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===s)this._$AH.v(o);else{const a=new qs(s,this),l=a.u(this.options);a.v(o),this.$(l),this._$AH=a}}_$AC(t){let e=ho.get(t.strings);return e===void 0&&ho.set(t.strings,e=new di(t)),e}T(t){Yo(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,r=0;for(const s of t)r===e.length?e.push(o=new er(this.k(Wt()),this.k(Wt()),this,this.options)):o=e[r],o._$AI(s),r++;r<e.length&&(this._$AR(o&&o._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var o;for((o=this._$AP)===null||o===void 0||o.call(this,!1,!0,e);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}},Ie=class{constructor(t,e,o,r,s){this.type=1,this._$AH=O,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=O}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,o,r){const s=this.strings;let a=!1;if(s===void 0)t=kt(this,t,e,0),a=!Gt(t)||t!==this._$AH&&t!==Pt,a&&(this._$AH=t);else{const l=t;let n,d;for(t=s[0],n=0;n<s.length-1;n++)d=kt(this,l[o+n],e,n),d===Pt&&(d=this._$AH[n]),a||(a=!Gt(d)||d!==this._$AH[n]),d===O?t=O:t!==O&&(t+=(d??"")+s[n+1]),this._$AH[n]=d}a&&!r&&this.j(t)}j(t){t===O?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ks=class extends Ie{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===O?void 0:t}};const Ws=Tt?Tt.emptyScript:"";let Gs=class extends Ie{constructor(){super(...arguments),this.type=4}j(t){t&&t!==O?this.element.setAttribute(this.name,Ws):this.element.removeAttribute(this.name)}},Js=class extends Ie{constructor(t,e,o,r,s){super(t,e,o,r,s),this.type=5}_$AI(t,e=this){var o;if((t=(o=kt(this,t,e,0))!==null&&o!==void 0?o:O)===Pt)return;const r=this._$AH,s=t===O&&r!==O||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,a=t!==O&&(r===O||s);s&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,o;typeof this._$AH=="function"?this._$AH.call((o=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&o!==void 0?o:this.element,t):this._$AH.handleEvent(t)}},Zs=class{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){kt(this,t)}};const uo=pe.litHtmlPolyfillSupport;uo?.(di,Di),((Ue=pe.litHtmlVersions)!==null&&Ue!==void 0?Ue:pe.litHtmlVersions=[]).push("2.8.0");const Ys=(i,t,e)=>{var o,r;const s=(o=e?.renderBefore)!==null&&o!==void 0?o:t;let a=s._$litPart$;if(a===void 0){const l=(r=e?.renderBefore)!==null&&r!==void 0?r:null;s._$litPart$=a=new Di(t.insertBefore(Wt(),l),l,void 0,e??{})}return a._$AI(i),a};var ze,He;let At=class extends St{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const o=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=o.firstChild),o}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ys(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return Pt}};At.finalized=!0,At._$litElement$=!0,(ze=globalThis.litElementHydrateSupport)===null||ze===void 0||ze.call(globalThis,{LitElement:At});const go=globalThis.litElementPolyfillSupport;go?.({LitElement:At});((He=globalThis.litElementVersions)!==null&&He!==void 0?He:globalThis.litElementVersions=[]).push("3.3.3");const Xs=i=>t=>typeof t=="function"?((e,o)=>(customElements.define(e,o),o))(i,t):((e,o)=>{const{kind:r,elements:s}=o;return{kind:r,elements:s,finisher(a){customElements.define(e,a)}}})(i,t);const Qs=(i,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,i)}},ta=(i,t,e)=>{t.constructor.createProperty(e,i)};function bt(i){return(t,e)=>e!==void 0?ta(i,t,e):Qs(i,t)}const ea=({finisher:i,descriptor:t})=>(e,o)=>{var r;if(o===void 0){const s=(r=e.originalKey)!==null&&r!==void 0?r:e.key,a=t!=null?{kind:"method",placement:"prototype",key:s,descriptor:t(e.key)}:{...e,key:s};return i!=null&&(a.finisher=function(l){i(l,s)}),a}{const s=e.constructor;t!==void 0&&Object.defineProperty(e,o,t(o)),i?.(s,o)}};function ia(i,t){return ea({descriptor:e=>({get(){var r,s;return(s=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(i))!==null&&s!==void 0?s:null},enumerable:!0,configurable:!0})})}var Fe;((Fe=window.HTMLSlotElement)===null||Fe===void 0?void 0:Fe.prototype.assignedElements)!=null;const oa=u`
<svg
  viewBox="0 0 40 40"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z" class="fill-color" fill-rule="evenodd"/>
</svg>
`;class ra extends x{static get styles(){return I`
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
    `}render(){return oa}}customElements.define("ia-icon-close",ra);let K=class extends At{constructor(){super(...arguments),this.value="",this.clearButtonScreenReaderLabel="Clear",this.focusOnClear=!0,this.forceClearButton=!1}render(){var t,e,o,r;const s=!this.value&&!this.forceClearButton;return Hs`
      <div id="container">
        <slot name="icon"></slot>
        <label for="text-input" class="sr-only"
          >${(t=this.screenReaderLabel)!==null&&t!==void 0?t:O}</label
        >
        <input
          id="text-input"
          type="text"
          inputmode="search"
          enterkeyhint="search"
          autocapitalize="off"
          placeholder=${(e=this.placeholder)!==null&&e!==void 0?e:O}
          .value=${(o=this.value)!==null&&o!==void 0?o:O}
          aria-controls=${(r=this.ariaControls)!==null&&r!==void 0?r:O}
          @input=${this.onTextInput}
          @keypress=${this.onKeyPress}
        />
        <button
          id="clear-button"
          type="button"
          ?hidden=${s}
          @click=${this.clearButtonClicked}
        >
          <ia-icon-close aria-hidden="true"></ia-icon-close>
          <span class="sr-only">${this.clearButtonScreenReaderLabel}</span>
        </button>
      </div>
    `}onTextInput(){this.value=this.textInput.value}onKeyPress(t){if(t.key==="Enter"){this.textInput.blur();const e=new CustomEvent("submit",{detail:this.value});this.dispatchEvent(e)}}clearButtonClicked(){const t=this.textInput.value;this.value="",this.focusOnClear&&this.textInput.focus();const e=new CustomEvent("clear",{detail:t});this.dispatchEvent(e);const o=new InputEvent("input",{inputType:"deleteContentBackward"});this.dispatchEvent(o)}};K.shadowRootOptions={...At.shadowRootOptions,delegatesFocus:!0};K.styles=Ns`
    :host {
      --input-height: 3rem;
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
      padding: var(--input-padding, 0 1rem);
      padding-inline-end: var(--input-height);
      border: var(--input-border-width, 1px) var(--input-border-style, solid)
        var(--input-border-color, #ccc);
      border-radius: var(--input-border-radius, 2rem);
      background-image: var(--input-background-image, none);
      background-color: var(--input-background-color, transparent);
      color: var(--input-color, #555);
      font-size: var(--input-font-size, 1.7rem);
      line-height: var(--input-line-height, 1.5);
      box-shadow: var(--input-box-shadow, inset 0 1px 1px rgba(0, 0, 0, 0.075));
      -webkit-box-shadow: var(
        --input-box-shadow,
        inset 0 1px 1px rgba(0, 0, 0, 0.075)
      );
    }

    #text-input:focus {
      border-color: var(--input-focused-border-color, #66afe9);
      outline: 0;
      box-shadow: var(
        --input-focused-box-shadow,
        inset 0 1px 1px rgb(0 0 0 / 8%),
        0 0 8px rgb(102 175 233 / 60%)
      );
      -webkit-box-shadow: var(
        --input-focused-box-shadow,
        inset 0 1px 1px rgb(0 0 0 / 8%),
        0 0 8px rgb(102 175 233 / 60%)
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

    #clear-button[hidden] {
      display: none;
    }

    ia-icon-close {
      --iconWidth: 100%;
      --iconHeight: 100%;
      --iconFillColor: white;
      background: #2c2c2c;
      border-radius: 50%;
      pointer-events: none;
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
  `;_([bt({type:String})],K.prototype,"value",void 0);_([bt({type:String})],K.prototype,"placeholder",void 0);_([bt({type:String})],K.prototype,"screenReaderLabel",void 0);_([bt({type:String})],K.prototype,"clearButtonScreenReaderLabel",void 0);_([bt({type:String})],K.prototype,"ariaControls",void 0);_([bt({type:Boolean})],K.prototype,"focusOnClear",void 0);_([bt({type:Boolean,reflect:!0})],K.prototype,"forceClearButton",void 0);_([ia("#text-input")],K.prototype,"textInput",void 0);K=_([Xs("ia-clearable-text-input")],K);const re=window,Ri=re.ShadowRoot&&(re.ShadyCSS===void 0||re.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ni=Symbol(),fo=new WeakMap;let ir=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==Ni)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Ri&&t===void 0){const o=e!==void 0&&e.length===1;o&&(t=fo.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&fo.set(e,t))}return t}toString(){return this.cssText}};const sa=i=>new ir(typeof i=="string"?i:i+"",void 0,Ni),H=(i,...t)=>{const e=i.length===1?i[0]:t.reduce(((o,r,s)=>o+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[s+1]),i[0]);return new ir(e,i,Ni)},aa=(i,t)=>{Ri?i.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((e=>{const o=document.createElement("style"),r=re.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=e.cssText,i.appendChild(o)}))},mo=Ri?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return sa(e)})(i):i;var qe;const he=window,vo=he.trustedTypes,na=vo?vo.emptyScript:"",yo=he.reactiveElementPolyfillSupport,ci={toAttribute(i,t){switch(t){case Boolean:i=i?na:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},or=(i,t)=>t!==i&&(t==t||i==i),Ke={attribute:!0,type:String,converter:ci,reflect:!1,hasChanged:or},pi="finalized";let Ct=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,o)=>{const r=this._$Ep(o,e);r!==void 0&&(this._$Ev.set(r,o),t.push(r))})),t}static createProperty(t,e=Ke){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const o=typeof t=="symbol"?Symbol():"__"+t,r=this.getPropertyDescriptor(t,o,e);r!==void 0&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,o){return{get(){return this[e]},set(r){const s=this[t];this[e]=r,this.requestUpdate(t,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Ke}static finalize(){if(this.hasOwnProperty(pi))return!1;this[pi]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,o=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const r of o)this.createProperty(r,e[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const r of o)e.unshift(mo(r))}else t!==void 0&&e.push(mo(t));return e}static _$Ep(t,e){const o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach((e=>e(this)))}addController(t){var e,o;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((o=t.hostConnected)===null||o===void 0||o.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return aa(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach((e=>{var o;return(o=e.hostConnected)===null||o===void 0?void 0:o.call(e)}))}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach((e=>{var o;return(o=e.hostDisconnected)===null||o===void 0?void 0:o.call(e)}))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EO(t,e,o=Ke){var r;const s=this.constructor._$Ep(t,o);if(s!==void 0&&o.reflect===!0){const a=(((r=o.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?o.converter:ci).toAttribute(e,o.type);this._$El=t,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$El=null}}_$AK(t,e){var o;const r=this.constructor,s=r._$Ev.get(t);if(s!==void 0&&this._$El!==s){const a=r.getPropertyOptions(s),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((o=a.converter)===null||o===void 0?void 0:o.fromAttribute)!==void 0?a.converter:ci;this._$El=s,this[s]=l.fromAttribute(e,a.type),this._$El=null}}requestUpdate(t,e,o){let r=!0;t!==void 0&&(((o=o||this.constructor.getPropertyOptions(t)).hasChanged||or)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),o.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,o))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((r,s)=>this[s]=r)),this._$Ei=void 0);let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),(t=this._$ES)===null||t===void 0||t.forEach((r=>{var s;return(s=r.hostUpdate)===null||s===void 0?void 0:s.call(r)})),this.update(o)):this._$Ek()}catch(r){throw e=!1,this._$Ek(),r}e&&this._$AE(o)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach((o=>{var r;return(r=o.hostUpdated)===null||r===void 0?void 0:r.call(o)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach(((e,o)=>this._$EO(o,this[o],e))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};Ct[pi]=!0,Ct.elementProperties=new Map,Ct.elementStyles=[],Ct.shadowRootOptions={mode:"open"},yo?.({ReactiveElement:Ct}),((qe=he.reactiveElementVersions)!==null&&qe!==void 0?qe:he.reactiveElementVersions=[]).push("1.6.3");var We;const ue=window,Mt=ue.trustedTypes,bo=Mt?Mt.createPolicy("lit-html",{createHTML:i=>i}):void 0,hi="$lit$",rt=`lit$${(Math.random()+"").slice(9)}$`,rr="?"+rt,la=`<${rr}>`,mt=document,Jt=()=>mt.createComment(""),Zt=i=>i===null||typeof i!="object"&&typeof i!="function",sr=Array.isArray,da=i=>sr(i)||typeof i?.[Symbol.iterator]=="function",Ge=`[ 	
\f\r]`,jt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,wo=/-->/g,$o=/>/g,dt=RegExp(`>|${Ge}(?:([^\\s"'>=/]+)(${Ge}*=${Ge}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_o=/'/g,xo=/"/g,ar=/^(?:script|style|textarea|title)$/i,nr=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),D=nr(1),lr=nr(2),It=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),So=new WeakMap,ut=mt.createTreeWalker(mt,129,null,!1);function dr(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return bo!==void 0?bo.createHTML(t):t}const ca=(i,t)=>{const e=i.length-1,o=[];let r,s=t===2?"<svg>":"",a=jt;for(let l=0;l<e;l++){const n=i[l];let d,h,c=-1,m=0;for(;m<n.length&&(a.lastIndex=m,h=a.exec(n),h!==null);)m=a.lastIndex,a===jt?h[1]==="!--"?a=wo:h[1]!==void 0?a=$o:h[2]!==void 0?(ar.test(h[2])&&(r=RegExp("</"+h[2],"g")),a=dt):h[3]!==void 0&&(a=dt):a===dt?h[0]===">"?(a=r??jt,c=-1):h[1]===void 0?c=-2:(c=a.lastIndex-h[2].length,d=h[1],a=h[3]===void 0?dt:h[3]==='"'?xo:_o):a===xo||a===_o?a=dt:a===wo||a===$o?a=jt:(a=dt,r=void 0);const b=a===dt&&i[l+1].startsWith("/>")?" ":"";s+=a===jt?n+la:c>=0?(o.push(d),n.slice(0,c)+hi+n.slice(c)+rt+b):n+rt+(c===-2?(o.push(void 0),l):b)}return[dr(i,s+(i[e]||"<?>")+(t===2?"</svg>":"")),o]};class Yt{constructor({strings:t,_$litType$:e},o){let r;this.parts=[];let s=0,a=0;const l=t.length-1,n=this.parts,[d,h]=ca(t,e);if(this.el=Yt.createElement(d,o),ut.currentNode=this.el.content,e===2){const c=this.el.content,m=c.firstChild;m.remove(),c.append(...m.childNodes)}for(;(r=ut.nextNode())!==null&&n.length<l;){if(r.nodeType===1){if(r.hasAttributes()){const c=[];for(const m of r.getAttributeNames())if(m.endsWith(hi)||m.startsWith(rt)){const b=h[a++];if(c.push(m),b!==void 0){const L=r.getAttribute(b.toLowerCase()+hi).split(rt),V=/([.?@])?(.*)/.exec(b);n.push({type:1,index:s,name:V[2],strings:L,ctor:V[1]==="."?ha:V[1]==="?"?ga:V[1]==="@"?fa:Be})}else n.push({type:6,index:s})}for(const m of c)r.removeAttribute(m)}if(ar.test(r.tagName)){const c=r.textContent.split(rt),m=c.length-1;if(m>0){r.textContent=Mt?Mt.emptyScript:"";for(let b=0;b<m;b++)r.append(c[b],Jt()),ut.nextNode(),n.push({type:2,index:++s});r.append(c[m],Jt())}}}else if(r.nodeType===8)if(r.data===rr)n.push({type:2,index:s});else{let c=-1;for(;(c=r.data.indexOf(rt,c+1))!==-1;)n.push({type:7,index:s}),c+=rt.length-1}s++}}static createElement(t,e){const o=mt.createElement("template");return o.innerHTML=t,o}}function Bt(i,t,e=i,o){var r,s,a,l;if(t===It)return t;let n=o!==void 0?(r=e._$Co)===null||r===void 0?void 0:r[o]:e._$Cl;const d=Zt(t)?void 0:t._$litDirective$;return n?.constructor!==d&&((s=n?._$AO)===null||s===void 0||s.call(n,!1),d===void 0?n=void 0:(n=new d(i),n._$AT(i,e,o)),o!==void 0?((a=(l=e)._$Co)!==null&&a!==void 0?a:l._$Co=[])[o]=n:e._$Cl=n),n!==void 0&&(t=Bt(i,n._$AS(i,t.values),n,o)),t}class pa{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:o},parts:r}=this._$AD,s=((e=t?.creationScope)!==null&&e!==void 0?e:mt).importNode(o,!0);ut.currentNode=s;let a=ut.nextNode(),l=0,n=0,d=r[0];for(;d!==void 0;){if(l===d.index){let h;d.type===2?h=new te(a,a.nextSibling,this,t):d.type===1?h=new d.ctor(a,d.name,d.strings,this,t):d.type===6&&(h=new ma(a,this,t)),this._$AV.push(h),d=r[++n]}l!==d?.index&&(a=ut.nextNode(),l++)}return ut.currentNode=mt,s}v(t){let e=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class te{constructor(t,e,o,r){var s;this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=r,this._$Cp=(s=r?.isConnected)===null||s===void 0||s}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Bt(this,t,e),Zt(t)?t===M||t==null||t===""?(this._$AH!==M&&this._$AR(),this._$AH=M):t!==this._$AH&&t!==It&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):da(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==M&&Zt(this._$AH)?this._$AA.nextSibling.data=t:this.$(mt.createTextNode(t)),this._$AH=t}g(t){var e;const{values:o,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Yt.createElement(dr(r.h,r.h[0]),this.options)),r);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===s)this._$AH.v(o);else{const a=new pa(s,this),l=a.u(this.options);a.v(o),this.$(l),this._$AH=a}}_$AC(t){let e=So.get(t.strings);return e===void 0&&So.set(t.strings,e=new Yt(t)),e}T(t){sr(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,r=0;for(const s of t)r===e.length?e.push(o=new te(this.k(Jt()),this.k(Jt()),this,this.options)):o=e[r],o._$AI(s),r++;r<e.length&&(this._$AR(o&&o._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var o;for((o=this._$AP)===null||o===void 0||o.call(this,!1,!0,e);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class Be{constructor(t,e,o,r,s){this.type=1,this._$AH=M,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=M}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,o,r){const s=this.strings;let a=!1;if(s===void 0)t=Bt(this,t,e,0),a=!Zt(t)||t!==this._$AH&&t!==It,a&&(this._$AH=t);else{const l=t;let n,d;for(t=s[0],n=0;n<s.length-1;n++)d=Bt(this,l[o+n],e,n),d===It&&(d=this._$AH[n]),a||(a=!Zt(d)||d!==this._$AH[n]),d===M?t=M:t!==M&&(t+=(d??"")+s[n+1]),this._$AH[n]=d}a&&!r&&this.j(t)}j(t){t===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ha extends Be{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===M?void 0:t}}const ua=Mt?Mt.emptyScript:"";class ga extends Be{constructor(){super(...arguments),this.type=4}j(t){t&&t!==M?this.element.setAttribute(this.name,ua):this.element.removeAttribute(this.name)}}class fa extends Be{constructor(t,e,o,r,s){super(t,e,o,r,s),this.type=5}_$AI(t,e=this){var o;if((t=(o=Bt(this,t,e,0))!==null&&o!==void 0?o:M)===It)return;const r=this._$AH,s=t===M&&r!==M||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,a=t!==M&&(r===M||s);s&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,o;typeof this._$AH=="function"?this._$AH.call((o=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&o!==void 0?o:this.element,t):this._$AH.handleEvent(t)}}class ma{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Bt(this,t)}}const Co=ue.litHtmlPolyfillSupport;Co?.(Yt,te),((We=ue.litHtmlVersions)!==null&&We!==void 0?We:ue.litHtmlVersions=[]).push("2.8.0");const va=(i,t,e)=>{var o,r;const s=(o=e?.renderBefore)!==null&&o!==void 0?o:t;let a=s._$litPart$;if(a===void 0){const l=(r=e?.renderBefore)!==null&&r!==void 0?r:null;s._$litPart$=a=new te(t.insertBefore(Jt(),l),l,void 0,e??{})}return a._$AI(i),a};var Je,Ze;class Et extends Ct{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const o=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=o.firstChild),o}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=va(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return It}}Et.finalized=!0,Et._$litElement$=!0,(Je=globalThis.litElementHydrateSupport)===null||Je===void 0||Je.call(globalThis,{LitElement:Et});const Ao=globalThis.litElementPolyfillSupport;Ao?.({LitElement:Et});((Ze=globalThis.litElementVersions)!==null&&Ze!==void 0?Ze:globalThis.litElementVersions=[]).push("3.3.3");const cr=i=>t=>typeof t=="function"?((e,o)=>(customElements.define(e,o),o))(i,t):((e,o)=>{const{kind:r,elements:s}=o;return{kind:r,elements:s,finisher(a){customElements.define(e,a)}}})(i,t);const ya=(i,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,i)}},ba=(i,t,e)=>{t.constructor.createProperty(e,i)};function N(i){return(t,e)=>e!==void 0?ba(i,t,e):ya(i,t)}const pr=({finisher:i,descriptor:t})=>(e,o)=>{var r;if(o===void 0){const s=(r=e.originalKey)!==null&&r!==void 0?r:e.key,a=t!=null?{kind:"method",placement:"prototype",key:s,descriptor:t(e.key)}:{...e,key:s};return i!=null&&(a.finisher=function(l){i(l,s)}),a}{const s=e.constructor;t!==void 0&&Object.defineProperty(e,o,t(o)),i?.(s,o)}};function Li(i,t){return pr({descriptor:e=>({get(){var r,s;return(s=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(i))!==null&&s!==void 0?s:null},enumerable:!0,configurable:!0})})}var Ye;const wa=((Ye=window.HTMLSlotElement)===null||Ye===void 0?void 0:Ye.prototype.assignedElements)!=null?(i,t)=>i.assignedElements(t):(i,t)=>i.assignedNodes(t).filter((e=>e.nodeType===Node.ELEMENT_NODE));function $a(i){const{slot:t,selector:e}=i??{};return pr({descriptor:o=>({get(){var r;const s="slot"+(t?`[name=${t}]`:":not([name])"),a=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(s),l=a!=null?wa(a,i):[];return e?l.filter((n=>n.matches(e))):l},enumerable:!0,configurable:!0})})}function _t(i,t,e){return i?t():e?.()}const _a=lr`<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>`,xa=lr`<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>`;let P=class extends Et{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionGroup="options",this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=t=>{switch(t.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=t=>{t&&t.type==="click"&&t.stopPropagation(),this.open=!1,this.updatePopoverState()}}async firstUpdated(){await new Promise(t=>{setTimeout(t,0)}),this.addEventListener("closeDropdown",this.closeOptions)}willUpdate(t){t.has("open")&&this.updatePopoverState()}disconnectedCallback(){var t;(t=super.disconnectedCallback)===null||t===void 0||t.call(this),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){var t,e;this.usePopover&&((e=(t=this.dropdownMenu)===null||t===void 0?void 0:t.togglePopover)===null||e===void 0||e.call(t,this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;const t=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${t.left}px`,this.dropdownMenu.style.top=`${t.bottom}px`,this.dropdownMenu.style.minWidth=`${t.width}px`}mainButtonClicked(){var t;this.openViaButton?this.toggleOptions():(t=this.mainButtonLabelSlotted[0])===null||t===void 0||t.click()}mainButtonKeyDown(t){(t.key==="Enter"||t.key===" ")&&(this.mainButtonClicked(),t.preventDefault())}caretKeyDown(t){(t.key==="Enter"||t.key===" ")&&(this.toggleOptions(),t.preventDefault())}renderOption(t){const{label:e,url:o=void 0,id:r}=t;let s;const a=this.selectedOption===r?"selected":"";return o?s=D`<a
        href=${o}
        @click=${l=>this.optionClicked(l,t)}
        >${e}</a
      >`:s=D`<button
        @click=${l=>this.optionClicked(l,t)}
      >
        ${e}
      </button>`,D`<li role="menuitem" class=${a}>${s}</li>`}optionClicked(t,e){var o;t.stopPropagation(),this.selectedOption!==e.id&&(this.selectedOption=e.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:e}})),(o=e.selectedHandler)===null||o===void 0||o.call(e,e)),this.closeOnSelect&&(this.closeOptions(),this.mainButton.focus())}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(t=>this.selectedOption!==t.id)}get caretUpTemplate(){return D`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${_a}</slot>
      </span>
    `}get caretDownTemplate(){return D`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${xa}</slot>
      </span>
    `}get caretTemplate(){return this.displayCaret?this.openViaButton?D`
        <span class="caret" aria-hidden="true">
          ${this.caretUpTemplate} ${this.caretDownTemplate}
        </span>
      `:D`
      <button
        class="caret"
        aria-labelledby="caret-label"
        aria-haspopup="true"
        aria-expanded=${this.open}
        @click=${_t(this.shouldAttachEventHandlers,()=>this.toggleOptions)}
        @keydown=${_t(this.shouldAttachEventHandlers,()=>this.caretKeyDown)}
        ?disabled=${this.isDisabled}
      >
        ${this.caretUpTemplate} ${this.caretDownTemplate}
      </button>
    `:D``}get dropdownTemplate(){return this.isCustomList?D`<slot name="list"></slot>`:D`${this.availableOptions.map(t=>this.renderOption(t))}`}get backdropTemplate(){return this.closeOnBackdropClick?this.open?D`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `:D``:D``}get shouldNestCaretInButton(){return this.openViaButton}get shouldAttachEventHandlers(){return!this.isDisabled&&!this.hasCustomClickHandler}render(){return D`
      <div class="ia-dropdown-group ${this.open?"open":""}">
        <div class="button-row">
          <button
            class="click-main"
            aria-haspopup=${this.openViaButton}
            aria-expanded=${this.open}
            @click=${_t(this.shouldAttachEventHandlers,()=>this.mainButtonClicked)}
            @keydown=${_t(this.shouldAttachEventHandlers,()=>this.mainButtonKeyDown)}
            ?disabled=${this.isDisabled}
          >
            <span class="sr-only" id="caret-label"
              >Toggle ${this.optionGroup}</span
            >
            <slot name="dropdown-label"></slot>
            ${_t(this.shouldNestCaretInButton,()=>this.caretTemplate)}
          </button>
          ${_t(!this.shouldNestCaretInButton,()=>this.caretTemplate)}
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
    `}static get styles(){const t=H`var(--dropdownBorderWidth, 1px)`,e=H`var(--dropdownBorderRadius, 4px)`,o=H`var(--dropdownBorderColor, #fff)`,r=H`var(--dropdownBgColor, #333)`,s=H`var(--dropdownTextColor, #fff)`,a=H`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,l=H`var(--dropdownSelectedBgColor, #fff)`,n=H`var(--dropdownMainButtonBgColor, transparent)`,d=H`var(--dropdownTextAlign, inherit)`,h=H`var(--dropdownBackdropZIndex, 1)`,c=H`var(--dropdownListZIndex, 2)`;return H`
      :host {
        display: inline;
        color: ${s};
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
        background: ${n};
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
        z-index: ${c};
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
          ${n}
        );
      }

      button.click-main:focus,
      button.click-main:focus-visible {
        background-color: var(
          --dropdownMainButtonFocusBgColor,
          ${n}
        );
      }

      button.click-main:active {
        background-color: var(
          --dropdownMainButtonActiveBgColor,
          ${n}
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
        z-index: ${h};
      }

      ul {
        z-index: ${c};
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
        color: ${s};
        background: ${r};

        font-size: var(--dropdownFontSize, inherit);

        border-top: var(--dropdownBorderTopWidth, ${t});
        border-right: var(--dropdownBorderRightWidth, ${t});
        border-bottom: var(--dropdownBorderBottomWidth, ${t});
        border-left: var(--dropdownBorderLeftWidth, ${t});
        /* Must be after border-width settings for specificity */
        border-style: solid;
        border-color: ${o};

        border-radius: var(
            --dropdownBorderTopLeftRadius,
            ${e}
          )
          var(--dropdownBorderTopRightRadius, ${e})
          var(--dropdownBorderBottomRightRadius, ${e})
          var(--dropdownBorderBottomLeftRadius, ${e});

        white-space: var(--dropdownWhiteSpace, normal);

        /* Prevent top/bottom inner li from overlapping inner border */
        overflow: hidden;
      }

      #dropdown-main li:hover {
        background-color: ${a};
        color: var(--dropdownHoverTextColor, #fff);
        list-style: none;
        cursor: pointer;
      }

      #dropdown-main li:hover:first-child {
        border-top-color: ${a};
      }

      ul#dropdown-main li:hover:last-child {
        border-bottom-color: ${a};
      }

      #dropdown-main li:hover:not(:first-child) {
        border-top: 0.5px solid var(--dropdownHoverTopBottomBorderColor, #333);
      }
      #dropdown-main li:hover:not(:last-child) {
        border-bottom: 0.5px solid
          var(--dropdownHoverTopBottomBorderColor, #333);
      }

      #dropdown-main li.selected:last-child {
        border-bottom-color: ${l};
      }

      #dropdown-main li.selected:first-child {
        border-top-color: ${l};
      }

      #dropdown-main li:hover > *,
      #dropdown-main li:focus-within > * {
        background-color: ${a};
        color: var(--dropdownHoverTextColor, #fff);
      }

      #dropdown-main li.selected > * {
        background-color: ${l};
        color: var(--dropdownSelectedTextColor, #2c2c2c);
      }

      #dropdown-main li {
        background: ${r};
        list-style: none;
        height: 30px;
        cursor: pointer;
        border-bottom: 0.5px solid ${r};
        border-top: 0.5px solid ${r};
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
        border-bottom-right-radius: var(--dropdownBorderBottomRightRadius, 4px);
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
        color: ${s};
        background: var(--dropdownItemButtonBgColor, transparent);
        padding: var(--dropdownItemButtonPadding, 0);
        text-align: ${d};
      }
    `}};_([N({type:Boolean,reflect:!0})],P.prototype,"open",void 0);_([N({type:Boolean,reflect:!0})],P.prototype,"isDisabled",void 0);_([N({type:Boolean})],P.prototype,"displayCaret",void 0);_([N({type:Boolean})],P.prototype,"closeOnSelect",void 0);_([N({type:Boolean})],P.prototype,"openViaButton",void 0);_([N({type:Boolean})],P.prototype,"usePopover",void 0);_([N({type:Boolean})],P.prototype,"includeSelectedOption",void 0);_([N({type:String})],P.prototype,"selectedOption",void 0);_([N({attribute:!1})],P.prototype,"options",void 0);_([N({type:String})],P.prototype,"optionGroup",void 0);_([N({attribute:!1})],P.prototype,"optionSelected",void 0);_([N({type:Boolean,reflect:!0})],P.prototype,"isCustomList",void 0);_([N({type:Boolean,reflect:!0})],P.prototype,"hasCustomClickHandler",void 0);_([N({type:Boolean,reflect:!0})],P.prototype,"closeOnEscape",void 0);_([N({type:Boolean,reflect:!0})],P.prototype,"closeOnBackdropClick",void 0);_([Li(".ia-dropdown-group")],P.prototype,"container",void 0);_([Li("#dropdown-main")],P.prototype,"dropdownMenu",void 0);_([Li(".click-main")],P.prototype,"mainButton",void 0);_([$a({slot:"dropdown-label"})],P.prototype,"mainButtonLabelSlotted",void 0);P=_([cr("ia-dropdown")],P);let ui=class extends Et{render(){return D`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `}};ui.styles=H`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
    }

    :host(.invert-icon-at-hover:hover) slot[name='icon'] {
      filter: invert(1);
    }

    :host(.selected) {
      background-color: var(--selectedBgColor, #fff);
      color: var(--selectedTextColor, #2c2c2c);
    }

    :host(.invert-icon-at-selected.selected) slot[name='icon'] {
      filter: invert(1);
    }

    div.icon-label-container {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: flex-start;
      align-content: center;
      flex-wrap: nowrap;
      flex-direction: var(--iconLabelFlexDirection, row);
      height: 100%;
    }

    slot[name='icon'] {
      width: var(--iconWidth, 20px);
      margin-right: var(--iconLabelGutterWidth, 10px);
      display: flex;
      align-items: center;
      justify-content: flex-start;
      align-content: center;
      flex-wrap: nowrap;
      white-space: nowrap;
      height: 100%;
    }

    /* https://css-tricks.com/flexbox-truncated-text/ */
    ::slotted(div.truncate) {
      display: flex;
      width: var(--labelWidth, 100%);
      text-align: left;
      word-wrap: break-word; /* Important for long words! */
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }

    @supports not (-webkit-line-clamp: 2) {
      ::slotted(div.truncate) {
        min-width: 0;
      }
    }
    @supports (-webkit-line-clamp: 2) {
      ::slotted(div.truncate) {
        min-width: 0;
        display: -webkit-box;
        overflow-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        /* Fixed line-height needed to fit unicode and emojis
          https://stackoverflow.com/a/67807146
        */
        line-height: 1.2em;
        /* max-height needed for Safari browser */
        max-height: var(--labelTruncateHeight, 30px);
        max-width: var(--labelWidth, 100%);
      }
    }
  `;ui=_([cr("ia-icon-label")],ui);var Sa=Object.defineProperty,Ca=Object.getOwnPropertyDescriptor,Dt=(i,t,e,o)=>{for(var r=o>1?void 0:o?Ca(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&Sa(t,e,r),r};let vt=class extends x{constructor(){super(...arguments),this.loadingTitle=U("Loading..."),this.successTitle=U("Success"),this.errorTitle=U("Error"),this.loadingStyle="ring-dots",this.mode="loading"}render(){return u`${qo(this.mode,[["ready",()=>this.placeholderTemplate],["loading",()=>this.loadingIndicatorTemplate],["success",()=>this.successIndicatorTemplate],["error",()=>this.errorIndicatorTemplate]])}`}get placeholderTemplate(){return u`<div class="placeholder"></div>`}get loadingIndicatorTemplate(){return u`
      <svg
        class="loading-indicator"
        viewBox="0 0 120 120"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        role="status"
      >
        <title>${this.loadingTitle}</title>
        <g stroke="none" stroke-width="1" fill-rule="evenodd">
          <path
            class="loading-ring"
            d="M60,10 C69.8019971,10 78.9452178,12.8205573 86.6623125,17.6943223 L76.4086287,27.9484118 C71.4880919,25.4243078 65.9103784,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 C96,53.3014663 94.1704984,47.0302355 90.9839104,41.6587228 L101.110332,31.5326452 C106.715332,39.6116982 110,49.4222615 110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
          ></path>
          <g
            class="loading-dots ${this.shouldShowLoadingDots?"":"hidden"}"
            transform="translate(40.000000, 55.000000)"
          >
            <circle id="left-dot" cx="5" cy="5" r="5"></circle>
            <circle id="middle-dot" cx="20" cy="5" r="5"></circle>
            <circle id="right-dot" cx="35" cy="5" r="5"></circle>
          </g>
        </g>
      </svg>
    `}get successIndicatorTemplate(){return u`
      <svg
        class="success-indicator"
        viewBox="0 0 120 120"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        role="status"
      >
        <title>${this.successTitle}</title>
        <g stroke="none" stroke-width="1" fill-rule="evenodd">
          <path
            class="success-icon"
            d="M60,10 C70.5816709,10 80.3955961,13.2871104 88.4763646,18.8959201 L78.3502633,29.0214223 C72.9767592,25.8315427 66.7022695,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 L95.995,59.46 L108.327675,47.128668 C109.350926,50.9806166 109.925886,55.015198 109.993301,59.1731586 L110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
          ></path>
          <polygon
            class="success-icon"
            transform="translate(75.000000, 41.500000) rotate(44.000000) translate(-75.000000, -41.500000) "
            points="96 85 54 85 54 65 76 64.999 76 -2 96 -2"
          ></polygon>
        </g>
      </svg>
    `}get errorIndicatorTemplate(){return u`
      <svg
        class="error-indicator"
        viewBox="0 0 120 120"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        role="status"
      >
        <title>${this.errorTitle}</title>
        <path
          class="error-icon"
          d="m56.4612493 8.80450354 41.8901185 75.94632926c1.7706782 2.8433173 2.1150372 5.2623412 1.0330766 7.2570716-1.0819604 1.9947304-3.26978 2.9920956-6.5634587 2.9920956h-85.69973905c-3.29367873 0-5.46954894-.9973652-6.52761065-2.9920956-1.0580617-1.9947304-.70175345-4.4137543 1.06892476-7.2570716l41.89011844-75.12308969c1.8184757-2.84331737 3.9693609-4.37738627 6.4526556-4.60220671s4.6341799 1.03483527 6.4526556 3.77896714zm28.5387507 75.19549646-35.037482-62-34.962518 62zm-31-34.7484359v-10.2515641h-8v10.2515641l2.089172 14.7484359h3.8184713zm-8 19.7484359v8h8v-8z"
        />
      </svg>
    `}get shouldShowLoadingDots(){return this.loadingStyle!=="ring"}static get styles(){return[Q,I`
        :host {
          --indicator-width--: var(--icon-width);

          /* Loading */
          --loading-ring-color--: var(--primary-text-color);
          --loading-dot-color--: var(--primary-text-color);

          /* Success */
          --success-icon-color--: var(--color-success);

          /* Error */
          --error-icon-color--: var(--color-danger);

          display: inline-block;
          width: var(--indicator-width--);
        }

        .placeholder {
          height: var(--indicator-width--);
        }

        .success-icon {
          fill: var(--success-icon-color--);
        }

        .error-icon {
          fill: var(--error-icon-color--);
        }

        .loading-ring {
          fill: var(--loading-ring-color--);
          animation: rotate 1.3s infinite linear;
          transform-origin: 50px 50px;
          transform-box: fill-box;
        }

        .loading-dots {
          fill: var(--loading-dot-color--);
          transition: opacity 0.25s ease-out;
        }

        .loading-dots.hidden {
          display: none;
        }

        .loading-dots > * {
          opacity: 0;
          animation: dot 1.3s infinite;
        }

        .loading-dots #left-dot {
          animation-delay: 0.2s;
        }

        .loading-dots #middle-dot {
          animation-delay: 0.4s;
        }

        .loading-dots #right-dot {
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
      `]}};Dt([v({type:String})],vt.prototype,"loadingTitle",2);Dt([v({type:String})],vt.prototype,"successTitle",2);Dt([v({type:String})],vt.prototype,"errorTitle",2);Dt([v({type:String})],vt.prototype,"loadingStyle",2);Dt([v({type:String})],vt.prototype,"mode",2);vt=Dt([k("ia-status-indicator")],vt);var Aa=Object.defineProperty,Ea=Object.getOwnPropertyDescriptor,Z=(i,t,e,o)=>{for(var r=o>1?void 0:o?Ea(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&Aa(t,e,r),r};const Eo={CategoryChanged:"categoryChanged",SearchRequested:"searchRequested"};let G=class extends x{constructor(){super(...arguments),this.categories=[],this.placeholder=U("Search"),this.useMobileView=!1,this.hideDropdown=!1,this.loading=!1}get resolvedCategory(){return this.selectedCategory??this.categories?.[0]?.id??""}render(){return u`
      <div id="container" part="container" role="search">
        <div
          id="main-bar"
          part="main-bar"
          class=${this.hideDropdown?"no-dropdown":$}
        >
          ${this.hideDropdown?$:this.dropdownTemplate}
          ${this.textBoxTemplate} ${this.searchButtonTemplate}
        </div>
      </div>
    `}willUpdate(i){if(i.has("selectedCategory")||i.has("categories")){const t=this.resolvedCategory;this.categoryDropdown&&this.categoryDropdown.selectedOption!==t&&(this.categoryDropdown.selectedOption=t)}}get dropdownTemplate(){return u`
      <ia-dropdown
        id="category-dropdown"
        part="category-dropdown"
        displayCaret
        includeSelectedOption
        closeOnSelect
        closeOnEscape
        closeOnBackdropClick
        openViaButton
        .selectedOption=${this.resolvedCategory}
        .options=${this.categories}
        @optionSelected=${this.handleCategorySelected}
      >
        <span slot="dropdown-label" part="category-dropdown-label"
          >${this.selectedCategoryLabel}</span
        >
      </ia-dropdown>
    `}get textBoxTemplate(){return u`
      <ia-clearable-text-input
        id="search-input"
        part="search-input"
        .value=${this.spacedQuery}
        placeholder=${this.placeholder}
        clearButtonScreenReaderLabel=${U("Clear search query")}
        screenReaderLabel=${U("Search the Archive. Filters and Advanced Search available below.")}
        @clear=${this.searchFieldCleared}
        @submit=${this.handleSubmit}
      ></ia-clearable-text-input>
    `}get searchButtonTemplate(){return u`
      <button
        id="search-button"
        part="search-button"
        class=${this.loading?"loading":$}
        type="button"
        aria-label=${U("Search")}
        @click=${this.handleSubmit}
      >
        ${this.loading?u`<ia-status-indicator
              mode="loading"
              class="search-button-loading-icon"
            ></ia-status-indicator>`:u`<img src=${Ds} alt="" />`}
      </button>
    `}get selectedCategoryLabel(){return this.categories.find(t=>t.id===this.resolvedCategory)?.label??this.resolvedCategory}get spacedQuery(){return this.query?.replace(/\+/g," ")??""}searchFieldCleared(){this.query&&this.emitSearchRequested()}handleSubmit(){this.emitSearchRequested()}handleCategorySelected(i){const t=i.detail.option.id;t!==this.resolvedCategory&&(this.selectedCategory=t,setTimeout(()=>this.searchInput.focus()),this.dispatchEvent(new CustomEvent(Eo.CategoryChanged,{detail:t})))}emitSearchRequested(){this.dispatchEvent(new CustomEvent(Eo.SearchRequested,{detail:{query:this.searchInput.value,category:this.resolvedCategory}}))}static get styles(){const i=I`
      :host {
        --search-bar-height--: var(--search-bar-height, 30px);
        --search-bar-width--: var(--search-bar-width, 300px);
        --search-bar-internal-padding--: var(--padding-sm, 5px);
        --clear-button-offset--: var(--clear-button-offset, 0);
      }

      #container {
        display: inline-block;
        width: var(--search-bar-width--);
      }

      #main-bar {
        display: flex;
        height: var(--search-bar-height--, 30px);
        flex: 1;
      }

      #category-dropdown {
        display: flex;
        flex-shrink: 0;
        height: 100%;
        box-sizing: border-box;

        background-color: #f5f5f7;
        border: 1px solid #999;
        border-radius: 5px 0 0 5px;

        --dropdownMainButtonPadding: 0 var(--search-bar-internal-padding--, 5px);
        --dropdownBgColor: #2c2c2c;
        --dropdownTextColor: #fff;
        --dropdownBorderColor: #ddd;
        --dropdownCaretColor: var(--ia-theme-primary-text-color, #2c2c2c);
        --dropdownHoverBgColor: rgba(255, 255, 255, 0.3);
        --dropdownHoverTextColor: #fff;
        --dropdownSelectedBgColor: rgba(255, 255, 255, 0.3);
        --dropdownSelectedTextColor: #fff;
        --dropdownWhiteSpace: nowrap;
        --dropdownOffsetTop: 2px;
        --caretHeight: 8px;
        --caretWidth: 12px;
        --caretPadding: 0 0 0 5px;
        --dropdownFontSize: inherit;
        --dropdownBorderRadius: 4px;
        --buttonSlotPaddingRight: 0;
        --dropdownTextAlign: left;
      }

      #category-dropdown [slot='dropdown-label'] {
        color: var(--ia-theme-primary-text-color, #2c2c2c);
        font-size: 1.4rem;
        font-family: inherit;
        white-space: nowrap;
      }

      .no-dropdown #search-input {
        border-left: 1px solid #999;
        border-radius: 5px 0 0 5px;
        overflow: hidden;
      }

      #search-input {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-top: 1px solid #999;
        border-bottom: 1px solid #999;
        font-size: inherit;

        --input-height: calc(var(--search-bar-height--) - 2px);
        --input-padding: 0 var(--search-bar-internal-padding--, 5px);
        --input-background-color: var(
          --ia-theme-secondary-background-color,
          #fff
        );
        --input-border-radius: 0;
        --input-border-width: 0;
        --input-box-shadow: none;
        --input-focused-box-shadow: none;
        --input-font-size: auto;
        --clear-button-top: var(--clear-button-offset--, 0);
        --clear-button-right: 2px;
      }

      #search-button {
        appearance: none;
        box-sizing: border-box;
        border-radius: 0 5px 5px 0;
        background-color: var(--ia-theme-secondary-background-color, #fff);
        border: 1px solid #999;
        border-left: 0;
        padding: 0 var(--search-bar-internal-padding--, 5px) 0 5px;
        min-width: 30px;
        height: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      #search-button img {
        width: 18px;
        height: 18px;
      }

      .search-button-loading-icon {
        --icon-width: 20px;
        margin-top: 2px;
      }
    `;return[Q,i]}};Z([v({type:String})],G.prototype,"query",2);Z([v({type:Array})],G.prototype,"categories",2);Z([v({type:String})],G.prototype,"selectedCategory",2);Z([v({type:String})],G.prototype,"placeholder",2);Z([v({type:Boolean})],G.prototype,"useMobileView",2);Z([v({type:Boolean})],G.prototype,"hideDropdown",2);Z([v({type:Boolean})],G.prototype,"loading",2);Z([C("#search-input")],G.prototype,"searchInput",2);Z([C("#category-dropdown")],G.prototype,"categoryDropdown",2);G=Z([k("ia-dropdown-search-bar")],G);var Oa=Object.defineProperty,Ta=Object.getOwnPropertyDescriptor,W=(i,t,e,o)=>{for(var r=o>1?void 0:o?Ta(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&Oa(t,e,r),r};const Pa=[{label:"Bar height",cssVariable:"--ia-theme-search-bar-height",defaultValue:"30px",inputType:"text"},{label:"Bar width",cssVariable:"--ia-theme-search-bar-width",defaultValue:"300px",inputType:"text"},{label:"Internal padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"}],Oo=[{id:"all",label:"All"},{id:"texts",label:"Books/Documents"},{id:"fulltext",label:"Text Contents"},{id:"radio",label:"Radio"},{id:"tv",label:"TV"},{id:"movies",label:"Video"},{id:"audio",label:"Audio"},{id:"software",label:"Software"},{id:"image",label:"Images"},{id:"etree",label:"Live Music"},{id:"collection",label:"Collections"},{id:"data",label:"Data"},{id:"web",label:"Web Sites"}],ka="all",To="Search";let j=class extends x{constructor(){super(...arguments),this.query="",this.selectedCategory=ka,this.placeholder=To,this.hideDropdown=!1,this.loading=!1,this.announcerText=""}render(){return u`
      <story-template
        elementTag="ia-dropdown-search-bar"
        elementClassName="IADropdownSearchBar"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:Pa}}
      >
        <div slot="demo">
          <ia-dropdown-search-bar
            .query=${this.query}
            .categories=${Oo}
            .selectedCategory=${this.selectedCategory}
            .placeholder=${this.placeholder}
            ?hideDropdown=${this.hideDropdown}
            ?loading=${this.loading}
            @searchRequested=${this.handleSearchRequested}
          ></ia-dropdown-search-bar>
          <span id="announcer">${this.announcerText}</span>
        </div>

        <form slot="settings">
          <table>
            <tr>
              <td><label for="settings__query">Pre-filled query</label></td>
              <td>
                <input type="text" id="settings__query" />
              </td>
            </tr>
            <tr>
              <td>
                <label for="settings__selected-category"
                  >Pre-selected category</label
                >
              </td>
              <td>
                <select id="settings__selected-category">
                  ${Bs(Oo,i=>u`<option value=${i.id}>
                        ${i.label}
                      </option>`)}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label for="settings__placeholder">Placeholder text</label>
              </td>
              <td>
                <input
                  type="text"
                  value=${To}
                  id="settings__placeholder"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label for="settings__hide-dropdown">Hide dropdown</label>
              </td>
              <td><input type="checkbox" id="settings__hide-dropdown" /></td>
            </tr>
            <tr>
              <td><label for="settings__loading">Loading</label></td>
              <td><input type="checkbox" id="settings__loading" /></td>
            </tr>
          </table>
          <button type="submit" @click=${this.applySettings}>Apply</button>
        </form>
      </story-template>
    `}get exampleUsage(){const{query:i,selectedCategory:t,placeholder:e,hideDropdown:o,loading:r}=this,s=n=>n?`"${n}"`:"",a={query:s(i),selectedCategory:s(t),placeholder:s(e),hideDropdown:o,loading:r};return`
      <ia-dropdown-search-bar
        .categories=\${[
          { id: 'foo', label: 'Foo Option' },
          { id: 'bar', label: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(a).map(([n,d])=>d?d===!0?n:`${n}=${d}`:"").join(`
  `)}
      >
      </ia-dropdown-search-bar>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(i){i.preventDefault(),this.query=this.queryInput.value,this.selectedCategory=this.selectedCategorySelect.value,this.placeholder=this.placeholderInput.value,this.hideDropdown=this.hideDropdownCheck.checked,this.loading=this.loadingCheck.checked}handleSearchRequested(i){this.announcerText=`Category ID "${i.detail.category}" / Query "${i.detail.query}"`}static get styles(){return I`
      ia-dropdown-search-bar {
        --dropdownFontSize: 14px;
        --dropdownItemButtonPadding: 0 10px;
      }

      ia-dropdown-search-bar::part(category-dropdown-label) {
        font-size: 14px;
      }

      #announcer {
        margin-left: 20px;
      }

      table {
        margin-bottom: 5px;
      }

      tr:nth-child(even) {
        background-color: rgba(0, 0, 0, 0.02);
      }

      label {
        display: block;
      }

      select {
        width: calc(100% - 5px);
        padding: 2px 0;
      }

      input[type='checkbox'] {
        width: 18px;
        height: 18px;
      }

      input[type='text'],
      input[type='number'] {
        box-sizing: border-box;
        width: calc(100% - 5px);
        padding: 2px 3px;
      }

      select,
      input[type='text'],
      input[type='number'],
      input[type='checkbox'] {
        margin-left: 5px;
      }

      button[type='submit'] {
        padding: 6px 8px;
      }
    `}};W([y()],j.prototype,"query",2);W([y()],j.prototype,"selectedCategory",2);W([y()],j.prototype,"placeholder",2);W([y()],j.prototype,"hideDropdown",2);W([y()],j.prototype,"loading",2);W([y()],j.prototype,"announcerText",2);W([C("#settings__query")],j.prototype,"queryInput",2);W([C("#settings__selected-category")],j.prototype,"selectedCategorySelect",2);W([C("#settings__placeholder")],j.prototype,"placeholderInput",2);W([C("#settings__hide-dropdown")],j.prototype,"hideDropdownCheck",2);W([C("#settings__loading")],j.prototype,"loadingCheck",2);j=W([k("ia-dropdown-search-bar-story")],j);const Ma=Object.freeze(Object.defineProperty({__proto__:null,get IADropdownSearchBarStory(){return j}},Symbol.toStringTag,{value:"Module"}));var Ia=Object.defineProperty,Ba=Object.getOwnPropertyDescriptor,wt=(i,t,e,o)=>{for(var r=o>1?void 0:o?Ba(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&Ia(t,e,r),r};const Da={CodeSubmitted:"codeSubmitted"},Po=/^[0-9]+$/,Ra=/^[a-zA-Z0-9]+$/;let st=class extends x{constructor(){super(...arguments),this.disabled=!1,this.numChars=6,this.numericOnly=!0,this.allowedChars=Po}render(){return u`
      ${[...Array(this.numChars).keys()].map(i=>u`<input
            id="OTP-input-${i}"
            part="input"
            type="text"
            autocomplete=${i===0?"one-time-code":"off"}
            inputmode=${this.numericOnly?"numeric":"text"}
            ?disabled=${this.disabled}
            @beforeinput=${this.handleInput}
            @paste=${this.handlePaste}
            @keydown=${this.handleKeydown}
          />`)}
    `}firstUpdated(){this.inputs[0].focus()}willUpdate(i){i.has("numericOnly")&&(this.allowedChars=this.numericOnly?Po:Ra),i.has("prefillValue")&&this.prefillValue!==void 0&&(this.fillInputs(this.prefillValue),this.prefillValue=void 0)}handleInput(i){i.preventDefault();const t=i.target,e=i.data;if(!e)return;if(e.length>1){this.fillInputs(e);return}if(!this.allowedChars.test(e))return;t.value=e;const o=t.nextElementSibling;o&&o.focus(),this.submitIfInputsFilled()}handleKeydown(i){const t=i.target,e=i.key,o=t.previousElementSibling,r=t.nextElementSibling;switch(e){case"Backspace":case"Delete":if(i.preventDefault(),o&&o.focus(),t.value===""){o.value="";break}t.value="";break;case"Tab":t.select();break;case"ArrowRight":case"Right":i.preventDefault(),r&&r.focus();break;case"ArrowLeft":case"Left":i.preventDefault(),o&&o.focus();break}}handlePaste(i){i.preventDefault();const t=i.clipboardData?.getData("text");t&&this.fillInputs(t)}fillInputs(i){i===""&&this.clearInputs();const t=i.split("").filter(o=>this.allowedChars.test(o)).slice(0,this.numChars);if(!t||t.length===0)return;if(t.forEach((o,r)=>this.inputs[r].value=o),t.length===this.numChars){this.triggerSubmit(t.join("")),this.inputs[this.numChars-1].focus();return}this.inputs[t.length].focus()}clearInputs(){this.inputs.forEach(i=>i.value=""),this.inputs[0].focus()}submitIfInputsFilled(){const i=[];this.inputs.forEach(t=>{t.value&&i.push(t.value)}),i.length===this.numChars&&this.triggerSubmit(i.join(""))}triggerSubmit(i){this.dispatchEvent(new CustomEvent(Da.CodeSubmitted,{detail:this.numericOnly?i:i.toUpperCase(),bubbles:!0,composed:!0}))}static get styles(){return[Q,I`
        :host {
          --primary-text-color--: var(--primary-text-color);
          --font-size-lg--: var(--font-size-lg);
        }

        :host {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 5px;
        }

        input {
          color: var(--primary-text-color--);
          font-size: var(--font-size-lg--);
          width: var(--font-size-lg--);
          font-weight: bold;
          height: calc(var(--font-size-lg--) + 1.25rem);
          text-align: center;
          text-transform: uppercase;
          padding: 0;
        }
      `]}};wt([v({type:String})],st.prototype,"prefillValue",2);wt([v({type:Boolean})],st.prototype,"disabled",2);wt([v({type:Number})],st.prototype,"numChars",2);wt([v({type:Boolean})],st.prototype,"numericOnly",2);wt([v({type:Object})],st.prototype,"allowedChars",2);wt([Pi("input")],st.prototype,"inputs",2);st=wt([k("ia-otp-input")],st);var Na=Object.defineProperty,La=Object.getOwnPropertyDescriptor,Rt=(i,t,e,o)=>{for(var r=o>1?void 0:o?La(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&Na(t,e,r),r};const Va={NewCodeRequested:"newCodeRequested"};let yt=class extends x{constructor(){super(...arguments),this.validationStatus="ready",this.newCodeSending=!1,this.numPasscodeChars=6,this.numericOnly=!0}render(){return u`
      <div class="input-section">
        <ia-otp-input
          .numChars=${this.numPasscodeChars}
          ?numericOnly=${this.numericOnly}
          ?disabled=${this.validationStatus==="loading"||this.validationStatus==="success"}
        ></ia-otp-input>
        <ia-status-indicator
          part="status-indicator"
          .mode=${this.validationStatus}
        ></ia-status-indicator>
      </div>
      ${this.validationStatus==="error"?u`<p class="error-msg">
            ${U("The code entered is invalid or expired")}
          </p>`:$}
      ${this.resendCodeButtonTemplate}
    `}willUpdate(i){i.has("validationStatus")&&this.OTPInput&&this.validationStatus==="error"&&(this.OTPInput.prefillValue=""),i.has("newCodeSending")&&this.newCodeSending&&this.OTPInput&&(this.OTPInput.prefillValue="")}get resendCodeButtonTemplate(){return this.newCodeSending?u`<span part="new-code-message" class="new-code-msg"
          >${U("Emailing...")}</span
        >`:u`
          <button
            class="new-code-btn link"
            part="new-code-button"
            .disabled=${this.validationStatus==="loading"||this.validationStatus==="success"}
            @click=${this.handleNewCodeRequested}
          >
            ${U("Email me another code")}
          </button>
        `}async handleNewCodeRequested(){this.dispatchEvent(new CustomEvent(Va.NewCodeRequested,{bubbles:!0,composed:!0})),this.OTPInput.prefillValue=""}static get styles(){return[Q,I`
        :host {
          --font-size-standard--: var(--font-size-standard);
          --font-size-lg--: var(--font-size-lg);
          --color-success--: var(--color-success);
          --color-danger--: var(--color-danger);
          --link-color--: var(--link-color);

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .input-section {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        ia-status-indicator {
          --icon-width: calc(var(--font-size-lg--) * 1.33);
        }

        .error-msg {
          margin-top: 10px;
          font-size: var(--font-size-standard--);
          color: var(--color-danger--);
          margin-bottom: -10px;
        }

        .new-code-btn {
          font-family: inherit;
          font-size: var(--font-size-standard--);
          display: block;
          width: fit-content;
          margin-top: 10px;
          border: 0;
          padding: 0;
          appearance: none;
          background: none;
          color: var(--link-color--);
          text-decoration: none;
          cursor: pointer;
        }

        .new-code-btn:hover,
        .new-code-btn:focus {
          text-decoration: underline;
        }

        .new-code-msg {
          margin-top: 10px;
          font-size: var(--font-size-standard--);
          color: var(--link-color--);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `]}};Rt([v({type:String})],yt.prototype,"validationStatus",2);Rt([v({type:Boolean})],yt.prototype,"newCodeSending",2);Rt([v({type:Number})],yt.prototype,"numPasscodeChars",2);Rt([v({type:Boolean})],yt.prototype,"numericOnly",2);Rt([C("ia-otp-input")],yt.prototype,"OTPInput",2);yt=Rt([k("ia-otp-form")],yt);var Ua=Object.getOwnPropertyDescriptor,ja=(i,t,e,o)=>{for(var r=o>1?void 0:o?Ua(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(r)||r);return r};const za=[{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Input font size",cssVariable:"--ia-theme-font-size-lg",defaultValue:"2.25rem",inputType:"text"},{label:"Link and error font size",cssVariable:"--ia-theme-font-size-standard",defaultValue:"0.875rem",inputType:"text"},{label:"Link font color",cssVariable:"--ia-theme-link-color",defaultValue:"#4b64ff",inputType:"color"},{label:"Error message/indicator color",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"},{label:"Success indicator color",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"}],Ha=[{label:"Validation Status",propertyName:"validationStatus",defaultValue:"ready",inputType:"radio",radioOptions:["ready","loading","success","error"]},{label:"New code sending in progress",propertyName:"newCodeSending",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Numeric only",propertyName:"numericOnly",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Number of passcode characters",propertyName:"numPasscodeChars",defaultValue:6,inputType:"number"}];let gi=class extends x{render(){return u`
      <story-template
        elementTag="ia-otp-form"
        elementClassName="IAOTPForm"
        .defaultUsageProps=${"@codeSubmitted=${(e: CustomEvent) => {setTimeout(() => alert('Code submitted: ' + e.detail), 250);}} \n  @newCodeRequested=${() => alert('New code requested')}"}
        .styleInputData=${{settings:za}}
        .propInputData=${{settings:Ha}}
      >
        <ia-otp-form
          slot="demo"
          @codeSubmitted=${i=>{setTimeout(()=>alert("Code submitted: "+i.detail),250)}}
          @newCodeRequested=${()=>alert("New code requested")}
        ></ia-otp-form>
        <div slot="usage-notes">
          For a typical One Time Passcode (OTP) use case, the component can be
          used like so:
          <ul>
            <li>
              The parent component sends the user a code, then displays the
              <code>ia-otp-form</code> component for code entry
            </li>
            <li>
              Once the user finishes entering a code, the component emits a
              <code>codeSubmitted</code> event with the code stored in the event
              <code>detail</code>
            </li>
            <li>
              The parent component sends that code to be verified and sets the
              <code>validationStatus</code> to <code>loading</code>
            </li>
            <li>
              Depending on the result, the parent then sets the
              <code>validationStatus</code> to <code>success</code> or
              <code>error</code> to display a success or error state
            </li>
            <li>
              If the user requests a new code from within the component, it will
              emit a <code>newCodeRequested</code> event and clear the inputs,
              and the parent can set the <code>newCodeSending</code> property to
              <code>true</code> while the code is being sent, then back to
              <code>false</code> when it is ready for entry
            </li>
          </ul>
        </div>
      </story-template>
    `}};gi=ja([k("ia-otp-form-story")],gi);const Fa=Object.freeze(Object.defineProperty({__proto__:null,get IAOTPFormStory(){return gi}},Symbol.toStringTag,{value:"Module"}));var qa=Object.getOwnPropertyDescriptor,Ka=(i,t,e,o)=>{for(var r=o>1?void 0:o?qa(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(r)||r);return r};const Wa=[{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Font size",cssVariable:"--ia-theme-font-size-lg",defaultValue:"2.25rem",inputType:"text"}],Ga=[{label:"Number of characters",propertyName:"numChars",defaultValue:6,inputType:"number"},{label:"Numeric only",propertyName:"numericOnly",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Prefill value",propertyName:"prefillValue",defaultValue:""},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let fi=class extends x{render(){return u`
      <story-template
        elementTag="ia-otp-input"
        elementClassName="IAOTPInput"
        .defaultUsageProps=${"@codeSubmitted=${(e: CustomEvent) => {setTimeout(() => alert('Code submitted: ' + e.detail), 250);}}"}
        .styleInputData=${{settings:Wa}}
        .propInputData=${{settings:Ga}}
      >
        <ia-otp-input
          @codeSubmitted=${i=>{setTimeout(()=>alert("Code submitted: "+i.detail),250)}}
          slot="demo"
        ></ia-otp-input>
      </story-template>
    `}};fi=Ka([k("ia-otp-input-story")],fi);const Ja=Object.freeze(Object.defineProperty({__proto__:null,get IAOTPInputStory(){return fi}},Symbol.toStringTag,{value:"Module"}));var Za=Object.getOwnPropertyDescriptor,Ya=(i,t,e,o)=>{for(var r=o>1?void 0:o?Za(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(r)||r);return r};const Xa=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"1.25rem"},{label:"Color - loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Color - success",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"},{label:"Color - error",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}],Qa=[{label:"Mode",propertyName:"mode",defaultValue:"loading",inputType:"radio",radioOptions:["ready","loading","success","error"]},{label:"Accessible title - loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{label:"Loading style",propertyName:"loadingStyle",defaultValue:"ring-dots",inputType:"radio",radioOptions:["ring-dots","ring"]},{label:"Accessible title - success",propertyName:"successTitle",defaultValue:"Success"},{label:"Accessible title - error",propertyName:"errorTitle",defaultValue:"Error"}];let mi=class extends x{render(){return u`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .styleInputData=${{settings:Xa}}
        .propInputData=${{settings:Qa}}
      >
        <ia-status-indicator slot="demo"></ia-status-indicator>
      </story-template>
    `}};mi=Ya([k("ia-status-indicator-story")],mi);const tn=Object.freeze(Object.defineProperty({__proto__:null,get IAStatusIndicatorStory(){return mi}},Symbol.toStringTag,{value:"Module"})),en="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='36.283'%20height='36.283'%3e%3cpath%20d='M35.531%2017.391h-3.09l.845-1.464a.748.748%200%201%200-1.297-.75l-1.276%202.214H28.61l2.515-4.354a.751.751%200%200%200-.272-1.024.75.75%200%200%200-1.024.274l-2.948%205.104h-2.023a6.751%206.751%200%200%200-2.713-4.684l1.019-1.76%205.896-.002a.75.75%200%200%200%200-1.5l-5.029.002%201.051-1.82%202.557.002a.75.75%200%200%200%200-1.5l-1.689-.002%201.545-2.676a.75.75%200%201%200-1.302-.75l-1.547%202.676-.844-1.463a.749.749%200%201%200-1.297.75l1.278%202.213-1.051%201.818-2.514-4.354a.75.75%200%200%200-1.298.75l2.946%205.104-1.016%201.758a6.692%206.692%200%200%200-2.706-.57%206.74%206.74%200%200%200-2.707.568l-1.013-1.754%202.946-5.105a.75.75%200%200%200-1.298-.75L13.56%208.697l-1.05-1.818%201.278-2.217a.749.749%200%200%200-1.298-.75l-.845%201.465-1.551-2.678a.75.75%200%200%200-1.024-.273.748.748%200%200%200-.274%201.023l1.545%202.678H8.652a.75.75%200%200%200%200%201.5h2.556l1.05%201.818H7.231a.75.75%200%200%200%200%201.5h5.894l1.017%201.762a6.755%206.755%200%200%200-2.712%204.684H9.406l-2.95-5.104a.75.75%200%201%200-1.299.75l2.516%204.354H5.569l-1.277-2.213a.75.75%200%200%200-1.298.75l.845%201.463H.75a.75.75%200%200%200%200%201.5h3.09l-.845%201.465a.747.747%200%200%200%20.275%201.022.75.75%200%200%200%20.374.103.75.75%200%200%200%20.65-.375l1.277-2.215h2.103l-2.516%204.354a.75.75%200%200%200%201.299.75l2.949-5.104h2.024a6.761%206.761%200%200%200%202.712%204.685l-1.017%201.762H7.232a.75.75%200%200%200%200%201.5h5.026l-1.05%201.818H8.651a.75.75%200%200%200%200%201.5h1.69l-1.545%202.676a.75.75%200%200%200%201.299.75l1.546-2.676.846%201.465a.755.755%200%200%200%20.65.375.737.737%200%200%200%20.375-.103.747.747%200%200%200%20.274-1.022l-1.279-2.215%201.05-1.82%202.515%204.354a.75.75%200%200%200%201.299-.75l-2.947-5.104%201.013-1.756a6.72%206.72%200%200%200%205.415%200l1.014%201.756-2.947%205.104a.75.75%200%200%200%201.298.75l2.515-4.354%201.053%201.82-1.277%202.213a.75.75%200%200%200%201.298.75l.844-1.463%201.545%202.678c.141.24.393.375.65.375a.75.75%200%200%200%20.649-1.125l-1.548-2.678h1.689a.75.75%200%200%200%200-1.5h-2.557l-1.051-1.82%205.029.002a.75.75%200%200%200%200-1.5l-5.896-.002-1.019-1.76a6.75%206.75%200%200%200%202.711-4.685h2.023l2.947%205.104a.753.753%200%200%200%201.025.273.749.749%200%200%200%20.272-1.023l-2.515-4.354h2.104l1.279%202.215a.75.75%200%200%200%20.649.375c.127%200%20.256-.03.375-.103a.748.748%200%200%200%20.273-1.022l-.848-1.465h3.092a.75.75%200%200%200%20.003-1.5zm-12.136.75c0%20.257-.041.502-.076.75a5.223%205.223%200%200%201-1.943%203.358%205.242%205.242%200%200%201-1.291.766%205.224%205.224%200%200%201-1.949.384%205.157%205.157%200%200%201-3.239-1.15%205.22%205.22%200%200%201-1.943-3.358c-.036-.247-.076-.493-.076-.75s.04-.503.076-.75a5.22%205.22%200%200%201%201.944-3.359c.393-.312.82-.576%201.291-.765a5.219%205.219%200%200%201%201.948-.384c.69%200%201.344.142%201.948.384.471.188.898.454%201.291.765a5.222%205.222%200%200%201%201.943%203.359c.035.247.076.493.076.75z'%20fill=':color:'/%3e%3c/svg%3e",ko=new WeakSet;class on extends ke{constructor(t){super(t)}update(t,[e,o]){return ko.has(t)||(e(),ko.add(t)),this.render(e,o)}render(t,e){return e()}}const Mo=Pe(on);var rn=Object.defineProperty,sn=Object.getOwnPropertyDescriptor,Vi=(i,t,e,o)=>{for(var r=o>1?void 0:o?sn(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&rn(t,e,r),r};let ge=class extends x{constructor(){super(...arguments),this.snowing=!1}render(){return u`
      ${this.startButtonTemplate} ${this.clearButtonTemplate}
      <img src=${en} alt="Snowflakes icon" />
    `}willUpdate(i){i.has("snowConfig")&&(this.snowflakes?.destroy(),this.snowflakes=void 0,this.startSnowing())}get startButtonTemplate(){return Mo(async()=>{await ie(()=>Promise.resolve().then(()=>Yi),void 0,import.meta.url)},()=>u`
        <ia-button
          @click=${()=>{this.snowing?this.stopSnowing():this.startSnowing()}}
        >
          ${this.snowing?"Stop Snowflakes":"Start Snowflakes"}
        </ia-button>
      `)}get clearButtonTemplate(){return Mo(async()=>{await ie(()=>Promise.resolve().then(()=>Yi),void 0,import.meta.url)},()=>u`
        <ia-button
          @click=${()=>{this.snowflakes?.destroy()}}
        >
          Clear Snowflakes
        </ia-button>
      `)}async startSnowing(){if(!this.snowflakes){const t=(await ie(()=>import("./snowflakes.esm-Dz_MTlsm.js"),[],import.meta.url)).default;this.snowflakes=new t(this.snowConfig)}this.snowflakes?.start(),this.snowing=!0}stopSnowing(){this.snowflakes?.stop(),this.snowing=!1}static get styles(){return I`
      img {
        width: 16px;
        filter: invert(1);
        vertical-align: middle;
      }
    `}};Vi([v({type:Object})],ge.prototype,"snowConfig",2);Vi([y()],ge.prototype,"snowing",2);ge=Vi([k("ia-snow")],ge);var an=Object.defineProperty,nn=Object.getOwnPropertyDescriptor,Nt=(i,t,e,o)=>{for(var r=o>1?void 0:o?nn(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&an(t,e,r),r};let at=class extends x{render(){return u`
      <story-template
        elementTag="ia-snow"
        elementClassName="IASnow"
        .customExampleUsage=${this.exampleUsage}
        labs
      >
        <div slot="demo">
          <ia-snow .snowConfig=${this.config}></ia-snow>
        </div>

        <div slot="settings">
          <table>
            <tr>
              <td>Color</td>
              <td><input type="color" value="#4d94b2" id="color" /></td>
            </tr>
            <tr>
              <td>Count</td>
              <td><input type="number" value="50" id="count" /></td>
            </tr>
            <tr>
              <td>Wind</td>
              <td><input type="checkbox" checked id="wind" /></td>
            </tr>
            <tr>
              <td>Rotation</td>
              <td><input type="checkbox" checked id="rotation" /></td>
            </tr>
          </table>
          <button @click=${this.setupSnowflakes}>Apply</button>
        </div>
      </story-template>
    `}get exampleUsage(){return this.config?`
      <ia-snow .snowConfig=\${${this.configString}}></ia-snow>
    `:"<ia-snow></ia-snow>"}get configString(){return JSON.stringify(this.config,null,2)}get snowflakeConfig(){return{color:this.colorInput.value,count:Number(this.countInput.value),wind:this.windInput.checked,rotation:this.rotationInput.checked}}setupSnowflakes(){this.config=this.snowflakeConfig}static get styles(){return I`
      fieldset {
        margin-top: 16px;
      }
    `}};Nt([y()],at.prototype,"config",2);Nt([C("#count")],at.prototype,"countInput",2);Nt([C("#wind")],at.prototype,"windInput",2);Nt([C("#rotation")],at.prototype,"rotationInput",2);Nt([C("#color")],at.prototype,"colorInput",2);at=Nt([k("ia-snow-story")],at);const ln=Object.freeze(Object.defineProperty({__proto__:null,get IASnowStory(){return at}},Symbol.toStringTag,{value:"Module"}));function p(i){let t,e,o;return t=i,(r,s,a)=>{if(a.value!=null)a.value=Io(a.value,t,e,o);else if(a.get!=null)a.get=Io(a.get,t,e,o);else throw"Only put a Memoize() decorator on a method or get accessor."}}const Xe=new Map;function Io(i,t,e=0,o){const r=Symbol("__memoized_map__");return function(...s){let a;this.hasOwnProperty(r)||Object.defineProperty(this,r,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let l=this[r];if(Array.isArray(o))for(const n of o)Xe.has(n)?Xe.get(n).push(l):Xe.set(n,[l]);if(t||s.length>0||e>0){let n;t===!0?n=s.map(c=>c.toString()).join("!"):t?n=t.apply(this,s):n=s[0];const d=`${n}__timestamp`;let h=!1;if(e>0)if(!l.has(d))h=!0;else{let c=l.get(d);h=Date.now()-c>e}l.has(n)&&!h?a=l.get(n):(a=i.apply(this,s),l.set(n,a),e>0&&l.set(d,Date.now()))}else{const n=this;l.has(n)?a=l.get(n):(a=i.apply(this,s),l.set(n,a))}return a}}const be=class be{parseValue(t){return typeof t=="string"&&(t==="false"||t==="0")?!1:!!t}};be.shared=new be;let vi=be;var dn=Object.defineProperty,cn=Object.getOwnPropertyDescriptor,hr=(i,t,e,o)=>{for(var r=cn(t,e),s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(t,e,r)||r);return r&&dn(t,e,r),r};class J{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(t,e){this.parser=t,this.rawValue=e}parseRawValue(){const t=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],e=[];return t.forEach(o=>{const r=this.parser.parseValue(o);Array.isArray(r)?e.push(...r):r!==void 0&&e.push(r)}),e}}hr([p()],J.prototype,"values");hr([p()],J.prototype,"value");class Bo extends J{constructor(t){super(vi.shared,t)}}const we=class we{parseValue(t){return this.parseJSDate(t)||this.parseBracketDate(t)}parseBracketDate(t){if(typeof t!="string")return;const e=t.match(/\[([0-9]{4})\]/);if(!(!e||e.length<2))return this.parseJSDate(e[1])}parseJSDate(t){if(typeof t!="string")return;let e=t;e.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(e=e.replace(" ","T"));const o=Date.parse(e);if(Number.isNaN(o))return;let r=new Date(e);return(e.match(/^[0-9]{4}$/)||e.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(r=new Date(r.getTime()+r.getTimezoneOffset()*1e3*60)),r}};we.shared=new we;let Xt=we;class tt extends J{constructor(t){super(Xt.shared,t)}}const $e=class $e{parseValue(t){if(typeof t=="number")return t;if(typeof t=="boolean")return;const e=t.split(":");let o;return e.length===1?o=this.parseNumberFormat(e[0]):o=this.parseColonSeparatedFormat(e),o}parseNumberFormat(t){let e=parseFloat(t);return Number.isNaN(e)&&(e=void 0),e}parseColonSeparatedFormat(t){let e=!1;const o=t.map((r,s)=>{const a=parseFloat(r);if(Number.isNaN(a))return e=!0,0;const n=60**(t.length-1-s);return a*Math.floor(n)}).reduce((r,s)=>r+s,0);return e?void 0:o}};$e.shared=new $e;let fe=$e;class Qe extends J{constructor(t){super(fe.shared,t)}}const _e=class _e{parseValue(t){if(typeof t=="number")return t;if(typeof t=="boolean")return;const e=parseFloat(t);if(!Number.isNaN(e))return e}};_e.shared=new _e;let X=_e;class z extends J{constructor(t){super(X.shared,t)}}const xe=class xe{parseValue(t){return String(t)}};xe.shared=new xe;let me=xe;class w extends J{constructor(t){super(me.shared,t)}}const Se=class Se{parseValue(t){if(typeof t=="string")return t}};Se.shared=new Se;let yi=Se;class pn extends J{constructor(t){super(yi.shared,t)}}const Ce=class Ce{parseValue(t){return X.shared.parseValue(t)}};Ce.shared=new Ce;let ve=Ce;class Do extends J{constructor(t){super(ve.shared,t)}}const Ae=class Ae{parseValue(t){if(typeof t=="string")return t}};Ae.shared=new Ae;let bi=Ae;class hn extends J{constructor(t){super(bi.shared,t)}}class un{constructor(t,e){this.separators=[";",",","."],this.parser=t,e&&e.separators&&(this.separators=e.separators)}parseValue(t){const e=String(t);let o=[];for(const r of this.separators)if(o=e.split(r),o.length>1)break;return this.parseListValues(o)}parseListValues(t){const o=t.map(s=>s.trim()).map(s=>this.parser.parseValue(s)),r=[];return o.forEach(s=>{s!==void 0&&r.push(s)}),r}}class gn extends J{constructor(t,e){super(e,t)}}class fn extends gn{constructor(t){const e=new un(me.shared);super(t,e)}}var mn=Object.defineProperty,vn=Object.getOwnPropertyDescriptor,f=(i,t,e,o)=>{for(var r=vn(t,e),s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(t,e,r)||r);return r&&mn(t,e,r),r};class g{get identifier(){return this.rawMetadata.identifier}get addeddate(){return this.rawMetadata.addeddate!=null?new tt(this.rawMetadata.addeddate):void 0}get audio_codec(){return this.rawMetadata.audio_codec!=null?new w(this.rawMetadata.audio_codec):void 0}get audio_sample_rate(){return this.rawMetadata.audio_sample_rate!=null?new z(this.rawMetadata.audio_sample_rate):void 0}get avg_rating(){return this.rawMetadata.avg_rating!=null?new z(this.rawMetadata.avg_rating):void 0}get collection(){return this.rawMetadata.collection!=null?new w(this.rawMetadata.collection):void 0}get collections_raw(){return this.rawMetadata.collections_raw!=null?new w(this.rawMetadata.collections_raw):void 0}get collection_size(){return this.rawMetadata.collection_size!=null?new Do(this.rawMetadata.collection_size):void 0}get contact(){return this.rawMetadata.contact!=null?new w(this.rawMetadata.contact):void 0}get contributor(){return this.rawMetadata.contributor!=null?new w(this.rawMetadata.contributor):void 0}get coverage(){return this.rawMetadata.coverage!=null?new w(this.rawMetadata.coverage):void 0}get creator(){return this.rawMetadata.creator!=null?new w(this.rawMetadata.creator):void 0}get creator_alt_script(){return this.rawMetadata["creator-alt-script"]!=null?new w(this.rawMetadata["creator-alt-script"]):void 0}get credits(){return this.rawMetadata.credits!=null?new w(this.rawMetadata.credits):void 0}get collection_layout(){return this.rawMetadata.collection_layout!=null?new w(this.rawMetadata.collection_layout):void 0}get date(){return this.rawMetadata.date!=null?new tt(this.rawMetadata.date):void 0}get description(){return this.rawMetadata.description!=null?new w(this.rawMetadata.description):void 0}get downloads(){return this.rawMetadata.downloads!=null?new z(this.rawMetadata.downloads):void 0}get duration(){return this.rawMetadata.duration!=null?new Qe(this.rawMetadata.duration):void 0}get external_identifier(){return this.rawMetadata["external-identifier"]!=null?new w(this.rawMetadata["external-identifier"]):void 0}get external_link(){return this.rawMetadata["external-link"]!=null?new w(this.rawMetadata["external-link"]):void 0}get files_count(){return this.rawMetadata.files_count!=null?new z(this.rawMetadata.files_count):void 0}get indexdate(){return this.rawMetadata.indexdate!=null?new tt(this.rawMetadata.indexdate):void 0}get isbn(){return this.rawMetadata.isbn!=null?new w(this.rawMetadata.isbn):void 0}get issue(){return this.rawMetadata.issue!=null?new w(this.rawMetadata.issue):void 0}get item_count(){return this.rawMetadata.item_count!=null?new z(this.rawMetadata.item_count):void 0}get item_size(){return this.rawMetadata.item_size!=null?new Do(this.rawMetadata.item_size):void 0}get language(){return this.rawMetadata.language!=null?new w(this.rawMetadata.language):void 0}get length(){return this.rawMetadata.length!=null?new Qe(this.rawMetadata.length):void 0}get licenseurl(){return this.rawMetadata.licenseurl!=null?new w(this.rawMetadata.licenseurl):void 0}get lineage(){return this.rawMetadata.lineage!=null?new w(this.rawMetadata.lineage):void 0}get month(){return this.rawMetadata.month!=null?new z(this.rawMetadata.month):void 0}get mediatype(){return this.rawMetadata.mediatype!=null?new hn(this.rawMetadata.mediatype):void 0}get noindex(){return this.rawMetadata.noindex!=null?new Bo(this.rawMetadata.noindex):void 0}get notes(){return this.rawMetadata.notes!=null?new w(this.rawMetadata.notes):void 0}get num_favorites(){return this.rawMetadata.num_favorites!=null?new z(this.rawMetadata.num_favorites):void 0}get num_reviews(){return this.rawMetadata.num_reviews!=null?new z(this.rawMetadata.num_reviews):void 0}get openlibrary_edition(){return this.rawMetadata.openlibrary_edition!=null?new w(this.rawMetadata.openlibrary_edition):void 0}get openlibrary_work(){return this.rawMetadata.openlibrary_work!=null?new w(this.rawMetadata.openlibrary_work):void 0}get page_progression(){return this.rawMetadata.page_progression!=null?new pn(this.rawMetadata.page_progression):void 0}get paginated(){return this.rawMetadata.paginated!=null?new Bo(this.rawMetadata.paginated):void 0}get partner(){return this.rawMetadata.partner!=null?new w(this.rawMetadata.partner):void 0}get post_text(){return this.rawMetadata.post_text!=null?new w(this.rawMetadata.post_text):void 0}get ppi(){return this.rawMetadata.ppi!=null?new z(this.rawMetadata.ppi):void 0}get publicdate(){return this.rawMetadata.publicdate!=null?new tt(this.rawMetadata.publicdate):void 0}get publisher(){return this.rawMetadata.publisher!=null?new w(this.rawMetadata.publisher):void 0}get reviewdate(){return this.rawMetadata.reviewdate!=null?new tt(this.rawMetadata.reviewdate):void 0}get rights(){return this.rawMetadata.rights!=null?new w(this.rawMetadata.rights):void 0}get rights_holder(){const t=this.rawMetadata["rights-holder"]??this.rawMetadata.rights_holder;return t!=null?new w(t):void 0}get runtime(){return this.rawMetadata.runtime!=null?new Qe(this.rawMetadata.runtime):void 0}get scanner(){return this.rawMetadata.scanner!=null?new w(this.rawMetadata.scanner):void 0}get segments(){return this.rawMetadata.segments!=null?new w(this.rawMetadata.segments):void 0}get shotlist(){return this.rawMetadata.shotlist!=null?new w(this.rawMetadata.shotlist):void 0}get source(){return this.rawMetadata.source!=null?new w(this.rawMetadata.source):void 0}get sponsor(){return this.rawMetadata.sponsor!=null?new w(this.rawMetadata.sponsor):void 0}get start_localtime(){return this.rawMetadata.start_localtime!=null?new tt(this.rawMetadata.start_localtime):void 0}get start_time(){return this.rawMetadata.start_time!=null?new tt(this.rawMetadata.start_time):void 0}get stop_time(){return this.rawMetadata.stop_time!=null?new tt(this.rawMetadata.stop_time):void 0}get subject(){return this.rawMetadata.subject!=null?new fn(this.rawMetadata.subject):void 0}get taper(){return this.rawMetadata.taper!=null?new w(this.rawMetadata.taper):void 0}get title(){return this.rawMetadata.title!=null?new w(this.rawMetadata.title):void 0}get title_alt_script(){return this.rawMetadata["title-alt-script"]!=null?new w(this.rawMetadata["title-alt-script"]):void 0}get transferer(){return this.rawMetadata.transferer!=null?new w(this.rawMetadata.transferer):void 0}get track(){return this.rawMetadata.track!=null?new z(this.rawMetadata.track):void 0}get type(){return this.rawMetadata.type!=null?new w(this.rawMetadata.type):void 0}get uploader(){return this.rawMetadata.uploader!=null?new w(this.rawMetadata.uploader):void 0}get utc_offset(){return this.rawMetadata.utc_offset!=null?new z(this.rawMetadata.utc_offset):void 0}get venue(){return this.rawMetadata.venue!=null?new w(this.rawMetadata.venue):void 0}get volume(){return this.rawMetadata.volume!=null?new w(this.rawMetadata.volume):void 0}get week(){return this.rawMetadata.week!=null?new z(this.rawMetadata.week):void 0}get year(){return this.rawMetadata.year!=null?new z(this.rawMetadata.year):void 0}constructor(t={}){this.rawMetadata=t}}f([p()],g.prototype,"addeddate");f([p()],g.prototype,"audio_codec");f([p()],g.prototype,"audio_sample_rate");f([p()],g.prototype,"avg_rating");f([p()],g.prototype,"collection");f([p()],g.prototype,"collections_raw");f([p()],g.prototype,"collection_size");f([p()],g.prototype,"contact");f([p()],g.prototype,"contributor");f([p()],g.prototype,"coverage");f([p()],g.prototype,"creator");f([p()],g.prototype,"creator_alt_script");f([p()],g.prototype,"credits");f([p()],g.prototype,"collection_layout");f([p()],g.prototype,"date");f([p()],g.prototype,"description");f([p()],g.prototype,"downloads");f([p()],g.prototype,"duration");f([p()],g.prototype,"external_identifier");f([p()],g.prototype,"external_link");f([p()],g.prototype,"files_count");f([p()],g.prototype,"indexdate");f([p()],g.prototype,"isbn");f([p()],g.prototype,"issue");f([p()],g.prototype,"item_count");f([p()],g.prototype,"item_size");f([p()],g.prototype,"language");f([p()],g.prototype,"length");f([p()],g.prototype,"licenseurl");f([p()],g.prototype,"lineage");f([p()],g.prototype,"month");f([p()],g.prototype,"mediatype");f([p()],g.prototype,"noindex");f([p()],g.prototype,"notes");f([p()],g.prototype,"num_favorites");f([p()],g.prototype,"num_reviews");f([p()],g.prototype,"openlibrary_edition");f([p()],g.prototype,"openlibrary_work");f([p()],g.prototype,"page_progression");f([p()],g.prototype,"paginated");f([p()],g.prototype,"partner");f([p()],g.prototype,"post_text");f([p()],g.prototype,"ppi");f([p()],g.prototype,"publicdate");f([p()],g.prototype,"publisher");f([p()],g.prototype,"reviewdate");f([p()],g.prototype,"rights");f([p()],g.prototype,"rights_holder");f([p()],g.prototype,"runtime");f([p()],g.prototype,"scanner");f([p()],g.prototype,"segments");f([p()],g.prototype,"shotlist");f([p()],g.prototype,"source");f([p()],g.prototype,"sponsor");f([p()],g.prototype,"start_localtime");f([p()],g.prototype,"start_time");f([p()],g.prototype,"stop_time");f([p()],g.prototype,"subject");f([p()],g.prototype,"taper");f([p()],g.prototype,"title");f([p()],g.prototype,"title_alt_script");f([p()],g.prototype,"transferer");f([p()],g.prototype,"track");f([p()],g.prototype,"type");f([p()],g.prototype,"uploader");f([p()],g.prototype,"utc_offset");f([p()],g.prototype,"venue");f([p()],g.prototype,"volume");f([p()],g.prototype,"week");f([p()],g.prototype,"year");var yn=Object.defineProperty,bn=Object.getOwnPropertyDescriptor,ur=(i,t,e,o)=>{for(var r=o>1?void 0:o?bn(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&yn(t,e,r),r};const wn=JSON.stringify({identifier:"goody",title:"The Goody Collection",mediatype:"texts",date:"1936-05-01",publicdate:"2008-04-15 10:32:18",downloads:"12843",duration:"1:02:03",item_size:"1572864",collection:["goody","americana","opensource"],description:"A sample item used to demonstrate the Metadata model."},null,2),$n=[{label:"identifier",get:i=>i.identifier},{label:"title",get:i=>i.title?.value},{label:"mediatype",get:i=>i.mediatype?.value},{label:"date",get:i=>i.date?.value},{label:"publicdate",get:i=>i.publicdate?.value},{label:"downloads",get:i=>i.downloads?.value},{label:"duration",get:i=>i.duration?.value},{label:"item_size",get:i=>i.item_size?.value},{label:"collection",get:i=>i.collection?.values},{label:"description",get:i=>i.description?.value}],_n=`const metadata = new Metadata(rawMetadataJson);

metadata.identifier;          // 'goody' (string)
metadata.title?.value;        // 'The Goody Collection' (string)
metadata.date?.value;         // Date — parsed from '1936-05-01'
metadata.downloads?.value;    // 12843 (number)
metadata.item_size?.value;    // 1572864 (byte count)
metadata.collection?.values;  // ['goody', 'americana', 'opensource']`;let Qt=class extends x{constructor(){super(...arguments),this.rawJson=wn}render(){const{metadata:i,parseError:t}=this.parse();return u`
      <story-template
        elementTag="item-metadata"
        elementClassName="Metadata"
        .customExampleUsage=${_n}
      >
        <div slot="demo">
          <p class="intro">
            The <code>Metadata</code> model wraps a raw archive.org metadata
            record and lazily casts each field to a typed
            <code>MetadataField</code>. Edit the JSON to see the parsed,
            type-cast results update.
          </p>

          <div class="cols">
            <label class="json">
              Raw metadata JSON
              <textarea
                .value=${this.rawJson}
                @input=${this.onInput}
                spellcheck="false"
              ></textarea>
            </label>

            <div class="parsed">
              <span class="parsed-label">Parsed fields</span>
              ${t?u`<p class="error">Invalid JSON: ${t}</p>`:u`
                    <table>
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Parsed value</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${$n.map(e=>{const o=i?e.get(i):void 0;return u`<tr>
                            <td><code>${e.label}</code></td>
                            <td>${this.format(o)}</td>
                            <td class="type">${this.typeLabel(o)}</td>
                          </tr>`})}
                      </tbody>
                    </table>
                  `}
            </div>
          </div>
        </div>
      </story-template>
    `}parse(){try{return{metadata:new g(JSON.parse(this.rawJson))}}catch(i){return{parseError:i.message}}}onInput(i){this.rawJson=i.target.value}format(i){return i==null?"—":i instanceof Date?i.toISOString():Array.isArray(i)?JSON.stringify(i):String(i)}typeLabel(i){return i==null?"undefined":i instanceof Date?"Date":Array.isArray(i)?"array":typeof i}};Qt.styles=I`
    .intro {
      margin-top: 0;
      max-width: 40rem;
    }

    .cols {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    .json {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      color: #666;
      flex: 1 1 18rem;
    }

    textarea {
      font-family: ui-monospace, monospace;
      font-size: 0.8rem;
      min-height: 16rem;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      resize: vertical;
    }

    .parsed {
      flex: 1 1 20rem;
    }

    .parsed-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      color: #666;
      margin-bottom: 4px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
    }

    th {
      text-align: left;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #888;
      border-bottom: 1px solid #ccc;
      padding: 4px 6px;
    }

    td {
      padding: 4px 6px;
      border-bottom: 1px solid #eee;
      vertical-align: top;
    }

    td.type,
    th:last-child {
      color: #888;
      font-size: 0.75rem;
      white-space: nowrap;
    }

    .error {
      color: #a00;
      font-size: 0.85rem;
    }
  `;ur([y()],Qt.prototype,"rawJson",2);Qt=ur([k("item-metadata-story")],Qt);const xn=Object.freeze(Object.defineProperty({__proto__:null,get ItemMetadataStory(){return Qt}},Symbol.toStringTag,{value:"Module"})),Ht={networkError:"MetadataService.NetworkError",itemNotFound:"MetadataService.ItemNotFound",decodingError:"MetadataService.DecodingError",searchEngineError:"MetadataService.SearchEngineError"};class wi extends Error{constructor(t,e,o){super(e),this.name=t,this.type=t,this.details=o}}class Sn{constructor(t){if(this.baseUrl=t?.baseUrl??"archive.org",t?.includeCredentials!==void 0?this.includeCredentials=t.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,t?.scope!==void 0)this.requestScope=t.scope;else{const o=new URL(window.location.href).searchParams.get("scope");o&&(this.requestScope=o)}}async fetchMetadata(t,e){const o=e?`/${e}`:"",r=`https://${this.baseUrl}/metadata/${t}${o}`;return this.fetchUrl(r)}async fetchUrl(t,e){const o=new URL(t);this.requestScope&&o.searchParams.set("scope",this.requestScope);let r;try{const s=e?.requestOptions??{credentials:this.includeCredentials?"include":"same-origin"};r=await fetch(o.href,s)}catch(s){const a=s instanceof Error?s.message:typeof s=="string"?s:"Unknown error";return this.getErrorResult(Ht.networkError,a)}try{const s=await r.json(),a=s.error;if(a){const l=s.forensics;return this.getErrorResult(Ht.searchEngineError,a,l)}else return{success:s}}catch(s){const a=s instanceof Error?s.message:typeof s=="string"?s:"Unknown error";return this.getErrorResult(Ht.decodingError,a)}}getErrorResult(t,e,o){return{error:new wi(t,e,o)}}}var Cn=Object.defineProperty,An=Object.getOwnPropertyDescriptor,Lt=(i,t,e,o)=>{for(var r=An(t,e),s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(t,e,r)||r);return r&&Cn(t,e,r),r};class $t{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const t=X.shared.parseValue(this.rawValue.mtime);if(t)return new Date(t*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return this.rawValue.size!=null?ve.shared.parseValue(this.rawValue.size):void 0}get title(){return this.rawValue.title}get length(){return this.rawValue.length!=null?fe.shared.parseValue(this.rawValue.length):void 0}get height(){return this.rawValue.height!=null?X.shared.parseValue(this.rawValue.height):void 0}get width(){return this.rawValue.width!=null?X.shared.parseValue(this.rawValue.width):void 0}get track(){return this.rawValue.track!=null?X.shared.parseValue(this.rawValue.track):void 0}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}constructor(t={}){this.rawValue=t}}Lt([p()],$t.prototype,"mtime");Lt([p()],$t.prototype,"size");Lt([p()],$t.prototype,"length");Lt([p()],$t.prototype,"height");Lt([p()],$t.prototype,"width");Lt([p()],$t.prototype,"track");var En=Object.defineProperty,On=Object.getOwnPropertyDescriptor,Ui=(i,t,e,o)=>{for(var r=On(t,e),s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(t,e,r)||r);return r&&En(t,e,r),r};class De{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return this.rawValue.reviewdate!=null?Xt.shared.parseValue(this.rawValue.reviewdate):void 0}get createdate(){return this.rawValue.createdate!=null?Xt.shared.parseValue(this.rawValue.createdate):void 0}get stars(){return this.rawValue.stars!=null?X.shared.parseValue(this.rawValue.stars):void 0}constructor(t={}){this.rawValue=t}}Ui([p()],De.prototype,"reviewdate");Ui([p()],De.prototype,"createdate");Ui([p()],De.prototype,"stars");class Tn{constructor(t){this.rawResponse=t,this.created=t.created,this.d1=t.d1,this.d2=t.d2,this.dir=t.dir,this.files=t.files?.map(e=>new $t(e)),this.files_count=t.files_count,this.item_last_updated=t.item_last_updated,this.item_size=t.item_size,this.metadata=new g(t.metadata),this.server=t.server,this.uniq=t.uniq,this.workable_servers=t.workable_servers,this.speech_vs_music_asr=t.speech_vs_music_asr,this.reviews=t.reviews?.map(e=>new De(e))}}const Ee=class Ee{constructor(t){this.backend=t}async fetchMetadata(t){const e=await this.backend.fetchMetadata(t);return e.error?e:e.success?.metadata===void 0?{error:new wi(Ht.itemNotFound)}:{success:new Tn(e.success)}}async fetchMetadataValue(t,e){const o=await this.backend.fetchMetadata(t,e);return o.error?o:o.success?.result===void 0?{error:new wi(Ht.itemNotFound)}:{success:o.success.result}}};Ee.default=new Ee(new Sn);let ye=Ee;var Pn=Object.defineProperty,kn=Object.getOwnPropertyDescriptor,Y=(i,t,e,o)=>{for(var r=o>1?void 0:o?kn(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(o?a(t,e,r):a(r))||r);return o&&r&&Pn(t,e,r),r};const Mn=`const result = await MetadataService.default.fetchMetadata('goody');

if (result.error) {
  console.error(result.error.type, result.error.message);
} else {
  const { metadata, files_count, server } = result.success;
  metadata.title?.value;      // 'The history of Little Goody Two-Shoes…'
  metadata.mediatype?.value;  // 'texts'
}

// …or fetch a single value by keypath:
const title = await MetadataService.default
  .fetchMetadataValue<string>('goody', 'metadata/title');
title.success;                // 'The history of Little Goody Two-Shoes…'`;let F=class extends x{constructor(){super(...arguments),this.identifier="goody",this.metaLoading=!1,this.keypath="metadata/title",this.valueLoading=!1,this.valueFetched=!1}render(){return u`
      <story-template
        elementTag="metadata-service"
        elementClassName="MetadataService"
        .customExampleUsage=${Mn}
      >
        <div slot="demo">
          <p class="intro">
            Live <code>fetch</code> against
            <code>https://archive.org/metadata/&lt;identifier&gt;</code>. The
            service returns a <code>Result</code> wrapping a typed
            <code>MetadataResponse</code> (or a
            <code>MetadataServiceError</code>).
          </p>

          <div class="row">
            <label>
              Identifier
              <input
                .value=${this.identifier}
                @input=${i=>this.identifier=i.target.value}
                placeholder="e.g. goody"
              />
            </label>
            <button @click=${this.fetchMetadata} ?disabled=${this.metaLoading}>
              ${this.metaLoading?"Fetching…":"fetchMetadata()"}
            </button>
          </div>

          ${this.renderMetadataResult()}

          <div class="row">
            <label>
              Keypath
              <input
                .value=${this.keypath}
                @input=${i=>this.keypath=i.target.value}
                placeholder="e.g. metadata/title"
              />
            </label>
            <button @click=${this.fetchValue} ?disabled=${this.valueLoading}>
              ${this.valueLoading?"Fetching…":"fetchMetadataValue()"}
            </button>
          </div>

          ${this.renderValueResult()}
        </div>
      </story-template>
    `}renderMetadataResult(){if(this.metaError)return u`<div class="result err">
        <strong>${this.metaError.type}</strong>
        ${this.metaError.message?u`— ${this.metaError.message}`:""}
      </div>`;const i=this.response;if(!i)return u``;const{metadata:t}=i,e=[["metadata.title?.value",t.title?.value],["metadata.mediatype?.value",t.mediatype?.value],["metadata.date?.value",t.date?.value],["files_count",i.files_count],["item_size",i.item_size],["server",i.server],["files.length",i.files?.length]];return u`<div class="result ok">
      <table>
        ${e.map(([o,r])=>u`<tr>
              <td><code>${o}</code></td>
              <td>${this.format(r)}</td>
            </tr>`)}
      </table>
    </div>`}renderValueResult(){return this.valueError?u`<div class="result err">
        <strong>${this.valueError.type}</strong>
        ${this.valueError.message?u`— ${this.valueError.message}`:""}
      </div>`:this.valueFetched?u`<div class="result ok">
      <code>${this.format(this.value)}</code>
    </div>`:u``}async fetchMetadata(){this.metaLoading=!0,this.metaError=void 0,this.response=void 0;const i=await ye.default.fetchMetadata(this.identifier);i.error?this.metaError=i.error:this.response=i.success,this.metaLoading=!1}async fetchValue(){this.valueLoading=!0,this.valueError=void 0,this.valueFetched=!1;const i=await ye.default.fetchMetadataValue(this.identifier,this.keypath);i.error?this.valueError=i.error:(this.value=i.success,this.valueFetched=!0),this.valueLoading=!1}format(i){return i==null?"—":i instanceof Date?i.toISOString():typeof i=="object"?JSON.stringify(i):String(i)}};F.styles=I`
    .intro {
      margin-top: 0;
      max-width: 42rem;
    }

    .row {
      display: flex;
      align-items: flex-end;
      gap: 10px;
      margin: 10px 0;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #666;
    }

    input {
      padding: 5px 7px;
      font-size: 0.9rem;
      min-width: 16rem;
    }

    button {
      padding: 6px 12px;
      font-size: 0.85rem;
      font-family: ui-monospace, monospace;
      cursor: pointer;
      border: 1px solid #194880;
      background: #194880;
      color: #fff;
      border-radius: 4px;
    }

    button[disabled] {
      opacity: 0.6;
      cursor: default;
    }

    .result {
      padding: 10px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 10px;
      background: #fff;
      font-size: 0.9rem;
    }

    .result.err {
      border-color: #a00;
      color: #a00;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    td {
      padding: 3px 6px;
      border-bottom: 1px solid #eee;
      vertical-align: top;
    }

    td:first-child {
      white-space: nowrap;
      color: #555;
    }
  `;Y([y()],F.prototype,"identifier",2);Y([y()],F.prototype,"metaLoading",2);Y([y()],F.prototype,"response",2);Y([y()],F.prototype,"metaError",2);Y([y()],F.prototype,"keypath",2);Y([y()],F.prototype,"valueLoading",2);Y([y()],F.prototype,"value",2);Y([y()],F.prototype,"valueFetched",2);Y([y()],F.prototype,"valueError",2);F=Y([k("metadata-service-story")],F);const In=Object.freeze(Object.defineProperty({__proto__:null,get MetadataServiceStory(){return F}},Symbol.toStringTag,{value:"Module"}));var Bn=Object.getOwnPropertyDescriptor,Dn=(i,t,e,o)=>{for(var r=o>1?void 0:o?Bn(t,e):t,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(r)||r);return r};const Rn=Object.assign({"../src/elements/ia-button/ia-button-story.ts":os,"../src/elements/ia-combo-box/ia-combo-box-story.ts":Is,"../src/elements/ia-dropdown-search-bar/ia-dropdown-search-bar-story.ts":Ma,"../src/elements/ia-otp-form/ia-otp-form-story.ts":Fa,"../src/elements/ia-otp-input/ia-otp-input-story.ts":Ja,"../src/elements/ia-status-indicator/ia-status-indicator-story.ts":tn,"../src/labs/ia-snow/ia-snow-story.ts":ln,"../src/models/item-metadata/item-metadata-story.ts":xn,"../src/services/metadata-service/metadata-service-story.ts":In}),gr=Object.keys(Rn).map(i=>{const t=i.includes("/src/labs/"),e=i.split("/"),r=e[e.length-1].replace(/-story\.ts$/,"");return{tag:r,storyTag:`${r}-story`,id:`elem-${r}`,labs:t}}).sort((i,t)=>i.tag.localeCompare(t.tag)),$i=gr.filter(i=>!i.labs),_i=gr.filter(i=>i.labs),Nn=[...$i,..._i];let Ro=class extends x{constructor(){super(...arguments),this._abortController=new AbortController}createRenderRoot(){return this}render(){return u`
      <nav id="ia-sidebar">
        <h2>Production-Ready</h2>
        ${$i.map(i=>u`<a href="#${i.id}">&lt;${i.tag}&gt;</a>`)}
        <h2>Labs 🧪</h2>
        ${_i.map(i=>u`<a href="#${i.id}">&lt;${i.tag}&gt;</a>`)}
      </nav>
      <div id="ia-content">
        <h1>Internet Archive Elements</h1>
        <h2>Production-Ready Elements</h2>
        ${$i.map(i=>u`
            <div id="${i.id}" class="ia-anchor">
              ${ri(`<${i.storyTag}></${i.storyTag}>`)}
            </div>
          `)}
        <h2>Labs Elements</h2>
        ${_i.map(i=>u`
            <div id="${i.id}" class="ia-anchor">
              ${ri(`<${i.storyTag}></${i.storyTag}>`)}
            </div>
          `)}
      </div>
    `}firstUpdated(){const i=Nn.map(o=>o.id),t=Object.fromEntries(i.map(o=>[o,this.querySelector(`#ia-sidebar a[href="#${o}"]`)])),e=new Set;this._observer=new IntersectionObserver(o=>{for(const s of o)s.isIntersecting?e.add(s.target.id):e.delete(s.target.id);const r=i.find(s=>e.has(s))??i[0];i.forEach(s=>t[s]?.classList.toggle("active",s===r))},{rootMargin:"0px 0px -70% 0px"}),i.forEach(o=>{const r=document.getElementById(o);r&&this._observer.observe(r)}),i.forEach(o=>{t[o]?.addEventListener("click",r=>{r.preventDefault();const s=document.getElementById(o);if(s){const a=s.getBoundingClientRect().top+window.scrollY;window.scrollTo({top:Math.max(0,a-16),behavior:"smooth"})}},{signal:this._abortController.signal})})}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._abortController.abort()}};Ro=Dn([k("app-root")],Ro);
