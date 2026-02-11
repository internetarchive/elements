(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=i(o);fetch(o.href,a)}})();const J=globalThis,ft=J.ShadowRoot&&(J.ShadyCSS===void 0||J.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,mt=Symbol(),xt=new WeakMap;let Ft=class{constructor(t,i,s){if(this._$cssResult$=!0,s!==mt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(ft&&t===void 0){const s=i!==void 0&&i.length===1;s&&(t=xt.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&xt.set(i,t))}return t}toString(){return this.cssText}};const Jt=e=>new Ft(typeof e=="string"?e:e+"",void 0,mt),E=(e,...t)=>{const i=e.length===1?e[0]:t.reduce(((s,o,a)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[a+1]),e[0]);return new Ft(i,e,mt)},Xt=(e,t)=>{if(ft)e.adoptedStyleSheets=t.map((i=>i instanceof CSSStyleSheet?i:i.styleSheet));else for(const i of t){const s=document.createElement("style"),o=J.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}},_t=ft?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const s of t.cssRules)i+=s.cssText;return Jt(i)})(e):e;const{is:Qt,defineProperty:te,getOwnPropertyDescriptor:ee,getOwnPropertyNames:ie,getOwnPropertySymbols:se,getPrototypeOf:oe}=Object,ot=globalThis,St=ot.trustedTypes,ae=St?St.emptyScript:"",ne=ot.reactiveElementPolyfillSupport,H=(e,t)=>e,tt={toAttribute(e,t){switch(t){case Boolean:e=e?ae:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},bt=(e,t)=>!Qt(e,t),At={attribute:!0,type:String,converter:tt,reflect:!1,useDefault:!1,hasChanged:bt};Symbol.metadata??=Symbol("metadata"),ot.litPropertyMetadata??=new WeakMap;let U=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=At){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(t,s,i);o!==void 0&&te(this.prototype,t,o)}}static getPropertyDescriptor(t,i,s){const{get:o,set:a}=ee(this.prototype,t)??{get(){return this[i]},set(n){this[i]=n}};return{get:o,set(n){const r=o?.call(this);a?.call(this,n),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??At}static _$Ei(){if(this.hasOwnProperty(H("elementProperties")))return;const t=oe(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(H("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(H("properties"))){const i=this.properties,s=[...ie(i),...se(i)];for(const o of s)this.createProperty(o,i[o])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[s,o]of i)this.elementProperties.set(s,o)}this._$Eh=new Map;for(const[i,s]of this.elementProperties){const o=this._$Eu(i,s);o!==void 0&&this._$Eh.set(o,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const o of s)i.unshift(_t(o))}else t!==void 0&&i.push(_t(t));return i}static _$Eu(t,i){const s=i.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const s of i.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Xt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$ET(t,i){const s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(o!==void 0&&s.reflect===!0){const a=(s.converter?.toAttribute!==void 0?s.converter:tt).toAttribute(i,s.type);this._$Em=t,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$Em=null}}_$AK(t,i){const s=this.constructor,o=s._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const a=s.getPropertyOptions(o),n=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:tt;this._$Em=o;const r=n.fromAttribute(i,a.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,i,s){if(t!==void 0){const o=this.constructor,a=this[t];if(s??=o.getPropertyOptions(t),!((s.hasChanged??bt)(a,i)||s.useDefault&&s.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,i,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:s,reflect:o,wrapped:a},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??i??this[t]),a!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(i=void 0),this._$AL.set(t,i)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,a]of this._$Ep)this[o]=a;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,a]of s){const{wrapped:n}=a,r=this[o];n!==!0||this._$AL.has(o)||r===void 0||this.C(o,void 0,a,r)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach((s=>s.hostUpdate?.())),this.update(i)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach((i=>i.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((i=>this._$ET(i,this[i]))),this._$EM()}updated(t){}firstUpdated(t){}};U.elementStyles=[],U.shadowRootOptions={mode:"open"},U[H("elementProperties")]=new Map,U[H("finalized")]=new Map,ne?.({ReactiveElement:U}),(ot.reactiveElementVersions??=[]).push("2.1.1");const yt=globalThis,et=yt.trustedTypes,Ot=et?et.createPolicy("lit-html",{createHTML:e=>e}):void 0,Vt="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,Ht="?"+I,re=`<${Ht}>`,j=document,z=()=>j.createComment(""),q=e=>e===null||typeof e!="object"&&typeof e!="function",vt=Array.isArray,le=e=>vt(e)||typeof e?.[Symbol.iterator]=="function",pt=`[ 	
\f\r]`,V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Tt=/-->/g,Ct=/>/g,k=RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Et=/'/g,Pt=/"/g,zt=/^(?:script|style|textarea|title)$/i,he=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),h=he(1),S=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),It=new WeakMap,L=j.createTreeWalker(j,129);function qt(e,t){if(!vt(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ot!==void 0?Ot.createHTML(t):t}const ce=(e,t)=>{const i=e.length-1,s=[];let o,a=t===2?"<svg>":t===3?"<math>":"",n=V;for(let r=0;r<i;r++){const l=e[r];let y,p,c=-1,w=0;for(;w<l.length&&(n.lastIndex=w,p=n.exec(l),p!==null);)w=n.lastIndex,n===V?p[1]==="!--"?n=Tt:p[1]!==void 0?n=Ct:p[2]!==void 0?(zt.test(p[2])&&(o=RegExp("</"+p[2],"g")),n=k):p[3]!==void 0&&(n=k):n===k?p[0]===">"?(n=o??V,c=-1):p[1]===void 0?c=-2:(c=n.lastIndex-p[2].length,y=p[1],n=p[3]===void 0?k:p[3]==='"'?Pt:Et):n===Pt||n===Et?n=k:n===Tt||n===Ct?n=V:(n=k,o=void 0);const x=n===k&&e[r+1].startsWith("/>")?" ":"";a+=n===V?l+re:c>=0?(s.push(y),l.slice(0,c)+Vt+l.slice(c)+I+x):l+I+(c===-2?r:x)}return[qt(e,a+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:i},s){let o;this.parts=[];let a=0,n=0;const r=t.length-1,l=this.parts,[y,p]=ce(t,i);if(this.el=K.createElement(y,s),L.currentNode=this.el.content,i===2||i===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(o=L.nextNode())!==null&&l.length<r;){if(o.nodeType===1){if(o.hasAttributes())for(const c of o.getAttributeNames())if(c.endsWith(Vt)){const w=p[n++],x=o.getAttribute(c).split(I),T=/([.?@])?(.*)/.exec(w);l.push({type:1,index:a,name:T[2],strings:x,ctor:T[1]==="."?de:T[1]==="?"?ue:T[1]==="@"?ge:at}),o.removeAttribute(c)}else c.startsWith(I)&&(l.push({type:6,index:a}),o.removeAttribute(c));if(zt.test(o.tagName)){const c=o.textContent.split(I),w=c.length-1;if(w>0){o.textContent=et?et.emptyScript:"";for(let x=0;x<w;x++)o.append(c[x],z()),L.nextNode(),l.push({type:2,index:++a});o.append(c[w],z())}}}else if(o.nodeType===8)if(o.data===Ht)l.push({type:2,index:a});else{let c=-1;for(;(c=o.data.indexOf(I,c+1))!==-1;)l.push({type:7,index:a}),c+=I.length-1}a++}}static createElement(t,i){const s=j.createElement("template");return s.innerHTML=t,s}}function N(e,t,i=e,s){if(t===S)return t;let o=s!==void 0?i._$Co?.[s]:i._$Cl;const a=q(t)?void 0:t._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),a===void 0?o=void 0:(o=new a(e),o._$AT(e,i,s)),s!==void 0?(i._$Co??=[])[s]=o:i._$Cl=o),o!==void 0&&(t=N(e,o._$AS(e,t.values),o,s)),t}class pe{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,o=(t?.creationScope??j).importNode(i,!0);L.currentNode=o;let a=L.nextNode(),n=0,r=0,l=s[0];for(;l!==void 0;){if(n===l.index){let y;l.type===2?y=new Y(a,a.nextSibling,this,t):l.type===1?y=new l.ctor(a,l.name,l.strings,this,t):l.type===6&&(y=new fe(a,this,t)),this._$AV.push(y),l=s[++r]}n!==l?.index&&(a=L.nextNode(),n++)}return L.currentNode=j,o}p(t){let i=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,o){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=N(this,t,i),q(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==S&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):le(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==u&&q(this._$AH)?this._$AA.nextSibling.data=t:this.T(j.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=K.createElement(qt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(i);else{const a=new pe(o,this),n=a.u(this.options);a.p(i),this.T(n),this._$AH=a}}_$AC(t){let i=It.get(t.strings);return i===void 0&&It.set(t.strings,i=new K(t)),i}k(t){vt(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,o=0;for(const a of t)o===i.length?i.push(s=new Y(this.O(z()),this.O(z()),this,this.options)):s=i[o],s._$AI(a),o++;o<i.length&&(this._$AR(s&&s._$AB.nextSibling,o),i.length=o)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class at{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,o,a){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=i,this._$AM=o,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(t,i=this,s,o){const a=this.strings;let n=!1;if(a===void 0)t=N(this,t,i,0),n=!q(t)||t!==this._$AH&&t!==S,n&&(this._$AH=t);else{const r=t;let l,y;for(t=a[0],l=0;l<a.length-1;l++)y=N(this,r[s+l],i,l),y===S&&(y=this._$AH[l]),n||=!q(y)||y!==this._$AH[l],y===u?t=u:t!==u&&(t+=(y??"")+a[l+1]),this._$AH[l]=y}n&&!o&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class de extends at{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}class ue extends at{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}}class ge extends at{constructor(t,i,s,o,a){super(t,i,s,o,a),this.type=5}_$AI(t,i=this){if((t=N(this,t,i,0)??u)===S)return;const s=this._$AH,o=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,a=t!==u&&(s===u||o);o&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class fe{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t)}}const me=yt.litHtmlPolyfillSupport;me?.(K,Y),(yt.litHtmlVersions??=[]).push("3.3.1");const be=(e,t,i)=>{const s=i?.renderBefore??t;let o=s._$litPart$;if(o===void 0){const a=i?.renderBefore??null;s._$litPart$=o=new Y(t.insertBefore(z(),a),a,void 0,i??{})}return o._$AI(e),o};const $t=globalThis;let _=class extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=be(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}};_._$litElement$=!0,_.finalized=!0,$t.litElementHydrateSupport?.({LitElement:_});const ye=$t.litElementPolyfillSupport;ye?.({LitElement:_});($t.litElementVersions??=[]).push("4.2.1");const O=e=>(t,i)=>{i!==void 0?i.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};const ve={attribute:!0,type:String,converter:tt,reflect:!1,hasChanged:bt},$e=(e=ve,t,i)=>{const{kind:s,metadata:o}=i;let a=globalThis.litPropertyMetadata.get(o);if(a===void 0&&globalThis.litPropertyMetadata.set(o,a=new Map),s==="setter"&&((e=Object.create(e)).wrapped=!0),a.set(i.name,e),s==="accessor"){const{name:n}=i;return{set(r){const l=t.get.call(this);t.set.call(this,r),this.requestUpdate(n,l,e)},init(r){return r!==void 0&&this.C(n,void 0,e,r),r}}}if(s==="setter"){const{name:n}=i;return function(r){const l=this[n];t.call(this,r),this.requestUpdate(n,l,e)}}throw Error("Unsupported decorator location: "+s)};function d(e){return(t,i)=>typeof i=="object"?$e(e,t,i):((s,o,a)=>{const n=o.hasOwnProperty(a);return o.constructor.createProperty(a,s),n?Object.getOwnPropertyDescriptor(o,a):void 0})(e,t,i)}function b(e){return d({...e,state:!0,attribute:!1})}const Kt=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,i),i);function $(e,t){return(i,s,o)=>{const a=n=>n.renderRoot?.querySelector(e)??null;return Kt(i,s,{get(){return a(this)}})}}let we;function Wt(e){return(t,i)=>Kt(t,i,{get(){return(this.renderRoot??(we??=document.createDocumentFragment())).querySelectorAll(e)}})}const nt=E`
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
    --combo-box-width: var(
      --ia-theme-combo-box-width,
      var(--default-combo-box-width)
    );

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
`;var xe=Object.getOwnPropertyDescriptor,_e=(e,t,i,s)=>{for(var o=s>1?void 0:s?xe(t,i):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(o=n(o)||o);return o};let ut=class extends _{render(){return h`
      <button>
        <slot></slot>
      </button>
    `}static get styles(){return[nt,E`
        :host {
          --primary-background-color--: var(--primary-cta-fill);
          --primary-text-color--: var(--primary-cta-text-color);
        }

        button {
          padding: 8px 16px;
          background-color: var(--primary-background-color--);
          color: var(--primary-text-color--);
        }
      `]}};ut=_e([O("ia-button")],ut);const kt=Object.freeze(Object.defineProperty({__proto__:null,get IAButton(){return ut}},Symbol.toStringTag,{value:"Module"}));function X(e,t,i){return e?t(e):i?.(e)}const it=e=>e??u,Se="modulepreload",Ae=function(e,t){return new URL(e,t).href},Lt={},Q=function(t,i,s){let o=Promise.resolve();if(i&&i.length>0){let y=function(p){return Promise.all(p.map(c=>Promise.resolve(c).then(w=>({status:"fulfilled",value:w}),w=>({status:"rejected",reason:w}))))};const n=document.getElementsByTagName("link"),r=document.querySelector("meta[property=csp-nonce]"),l=r?.nonce||r?.getAttribute("nonce");o=y(i.map(p=>{if(p=Ae(p,s),p in Lt)return;Lt[p]=!0;const c=p.endsWith(".css"),w=c?'[rel="stylesheet"]':"";if(s)for(let T=n.length-1;T>=0;T--){const Z=n[T];if(Z.href===p&&(!c||Z.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${p}"]${w}`))return;const x=document.createElement("link");if(x.rel=c?"stylesheet":Se,c||(x.as="script"),x.crossOrigin="",x.href=p,l&&x.setAttribute("nonce",l),document.head.appendChild(x),c)return new Promise((T,Z)=>{x.addEventListener("load",T),x.addEventListener("error",()=>Z(new Error(`Unable to preload CSS for ${p}`)))})}))}function a(n){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=n,window.dispatchEvent(r),!r.defaultPrevented)throw n}return o.then(n=>{for(const r of n||[])r.status==="rejected"&&a(r.reason);return t().catch(a)})};const P={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},rt=e=>(...t)=>({_$litDirective$:e,values:t});class lt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,s){this._$Ct=t,this._$AM=i,this._$Ci=s}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}let gt=class extends lt{constructor(t){if(super(t),this.it=u,t.type!==P.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===u||t==null)return this._t=void 0,this.it=t;if(t===S)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const i=[t];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}};gt.directiveName="unsafeHTML",gt.resultType=1;const Oe=rt(gt),Te=E`
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
`;var Ce=Object.defineProperty,Ee=Object.getOwnPropertyDescriptor,ht=(e,t,i,s)=>{for(var o=s>1?void 0:s?Ee(t,i):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&Ce(t,i,o),o};let W=class extends _{constructor(){super(...arguments),this.code="",this.language="auto",this.highlightedCode=""}willUpdate(e){(e.has("code")||e.has("language"))&&this.highlightCode()}render(){return h`
      <pre><code class="hljs">${Oe(this.highlightedCode)}</code></pre>
    `}async highlightCode(){const t=(await Q(()=>import("./index-BBc-AmEf.js"),[],import.meta.url)).default,i=this.code.trim();let s;this.language==="auto"?s=t.highlightAuto(i).value:s=t.highlight(i,{language:this.language}).value,this.highlightedCode=s}static get styles(){return[Te]}};ht([d({type:String})],W.prototype,"code",2);ht([d({type:String})],W.prototype,"language",2);ht([b()],W.prototype,"highlightedCode",2);W=ht([O("syntax-highlighter")],W);const Pe="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2080%2080'%20focusable='false'%3e%3cpath%20d='M70.3%2013.8L40%2066.3%209.7%2013.8z'%3e%3c/path%3e%3c/svg%3e",Ie="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='36pt'%20height='36pt'%20viewBox='0%200%2036%2036'%20version='1.1'%3e%3cg%20id='surface35'%3e%3cpath%20style='%20stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;'%20d='M%2013.5%206.1875%20C%2012.878906%206.1875%2012.375%206.691406%2012.375%207.3125%20C%2012.375%207.933594%2012.878906%208.4375%2013.5%208.4375%20L%2014.0625%208.4375%20L%2014.0625%2013.523438%20C%2014.0625%2014.453125%2013.78125%2015.34375%2013.246094%2016.105469%20L%206.84375%2025.238281%20C%206.140625%2026.238281%206.054688%2027.535156%206.621094%2028.617188%20C%207.183594%2029.703125%208.292969%2030.375%209.515625%2030.375%20L%2026.484375%2030.375%20C%2027.707031%2030.375%2028.816406%2029.703125%2029.378906%2028.617188%20C%2029.941406%2027.535156%2029.859375%2026.238281%2029.15625%2025.238281%20L%2022.753906%2016.105469%20C%2022.21875%2015.34375%2021.9375%2014.453125%2021.9375%2013.523438%20L%2021.9375%208.4375%20L%2022.5%208.4375%20C%2023.121094%208.4375%2023.625%207.933594%2023.625%207.3125%20C%2023.625%206.691406%2023.121094%206.1875%2022.5%206.1875%20Z%20M%2016.3125%208.4375%20L%2019.6875%208.4375%20L%2019.6875%2013.523438%20C%2019.6875%2014.914062%2020.109375%2016.257812%2020.910156%2017.398438%20L%2020.941406%2017.4375%20L%2015.0625%2017.4375%20L%2015.089844%2017.398438%20C%2015.890625%2016.257812%2016.3125%2014.914062%2016.3125%2013.523438%20Z%20M%2015.1875%2020.8125%20C%2015.808594%2020.8125%2016.3125%2021.316406%2016.3125%2021.9375%20C%2016.3125%2022.558594%2015.808594%2023.0625%2015.1875%2023.0625%20C%2014.566406%2023.0625%2014.0625%2022.558594%2014.0625%2021.9375%20C%2014.0625%2021.316406%2014.566406%2020.8125%2015.1875%2020.8125%20Z%20M%2020.53125%2023.0625%20C%2021.617188%2023.0625%2022.5%2023.945312%2022.5%2025.03125%20C%2022.5%2026.117188%2021.617188%2027%2020.53125%2027%20C%2019.445312%2027%2018.5625%2026.117188%2018.5625%2025.03125%20C%2018.5625%2023.945312%2019.445312%2023.0625%2020.53125%2023.0625%20Z%20M%2020.53125%2023.0625%20'/%3e%3c/g%3e%3c/svg%3e";var ke=Object.defineProperty,Le=Object.getOwnPropertyDescriptor,C=(e,t,i,s)=>{for(var o=s>1?void 0:s?Le(t,i):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&ke(t,i,o),o};let A=class extends _{constructor(){super(...arguments),this.elementTag="",this.elementClassName="",this.exampleUsage="",this.labs=!1,this.visible=!1,this.shouldShowPropertySettings=!1}render(){return h`
      <h2>
        <a @click=${()=>this.visible=!this.visible}>
          <img
            class="disclosure-arrow ${this.visible?"open":""}"
            src=${Pe}
          /><code> &lt;${this.elementTag}&gt;</code> ${X(this.labs,()=>h`<img
                src=${Ie}
                alt="Labs icon"
                title="Labs"
                class="labs-icon"
              />`)}
        </a>
      </h2>
      ${X(this.visible,()=>this.elementDemoTemplate)}
    `}get elementDemoTemplate(){return h`
      <div id="container">
        <h3>Demo</h3>
        <div class="slot-container" style=${it(this.appliedStyles)}>
          <slot name="demo"></slot>
        </div>
        <h3>Import</h3>
        <syntax-highlighter
          language="typescript"
          .code=${this.importCode}
        ></syntax-highlighter>
        <h3>Usage</h3>
        <syntax-highlighter
          language="auto"
          .code=${this.exampleUsage}
        ></syntax-highlighter>
        ${X(this.cssCode,()=>h`
            <h3>Styling</h3>
            <syntax-highlighter
              language="css"
              .code=${this.cssCode}
            ></syntax-highlighter>
          `)}
        ${this.styleSettingsTemplate}
        ${this.shouldShowPropertySettings?h` <h3>Settings</h3>`:u}
        <div
          class="slot-container"
          style="${this.shouldShowPropertySettings?"":"display: none"}"
          @slotchange=${this.handleSettingsSlotChange}
        >
          <slot name="settings"></slot>
        </div>
      </div>
    `}get styleSettingsTemplate(){return this.styleInputData?h`
      <h3>Styles</h3>
      <div class="style-options">
        <table>
          ${this.styleInputData.settings.map(e=>h`
              <tr>
                <td>
                  <label for=${this.labelToId(e.label)}
                    >${e.label}</label
                  >
                </td>
                <td>
                  <input
                    id=${this.labelToId(e.label)}
                    class="style-input"
                    type=${e.inputType??"text"}
                    value=${e.defaultValue??""}
                    data-variable=${e.cssVariable}
                  />
                </td>
              </tr>
            `)}
        </table>
        <button @click=${this.applyStyles}>Apply</button>
      </div>
    `:u}get importCode(){return this.elementClassName?`
import '${this.modulePath}';
import { ${this.elementClassName} } from '${this.modulePath}';
    `:`
import '${this.modulePath}';
  `}get cssCode(){return this.appliedStyles?`

${this.elementTag} {
  ${this.appliedStyles}
}
    `:""}get modulePath(){return this.labs?`@internetarchive/elements/labs/${this.elementTag}/${this.elementTag}`:`@internetarchive/elements/${this.elementTag}/${this.elementTag}`}handleSettingsSlotChange(e){const t=e.target.assignedElements();this.shouldShowPropertySettings=t.length>0}applyStyles(){const e=[];this.styleInputs?.forEach(t=>{!t.dataset.variable||!t.value||e.push(`${t.dataset.variable}: ${t.value};`)}),this.appliedStyles=e.join(`
  `)}labelToId(e){return e.toLowerCase().split(" ").join("-")}static get styles(){return[nt,E`
        #container {
          border: 1px solid #ccc;
          padding: 0 16px 16px 16px;
        }

        h2 {
          cursor: pointer;
          margin-top: 8px;
          margin-bottom: 8px;
        }

        h3 {
          margin-bottom: 8px;
        }

        .slot-container,
        .style-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }

        .disclosure-arrow {
          width: 12px;
          height: 12px;
          transform: rotate(-90deg);
          transition: transform 0.2s ease-in-out;
        }

        .disclosure-arrow.open {
          transform: rotate(0deg);
        }

        .labs-icon {
          width: 20px;
          height: 20px;
          margin-left: 4px;
          filter: invert(1);
          vertical-align: middle;
        }
      `]}};C([d({type:String})],A.prototype,"elementTag",2);C([d({type:String})],A.prototype,"elementClassName",2);C([d({type:String})],A.prototype,"exampleUsage",2);C([d({type:Object})],A.prototype,"styleInputData",2);C([d({type:Boolean})],A.prototype,"labs",2);C([b()],A.prototype,"visible",2);C([b()],A.prototype,"appliedStyles",2);C([b()],A.prototype,"shouldShowPropertySettings",2);C([Wt(".style-input")],A.prototype,"styleInputs",2);A=C([O("story-template")],A);var Be=Object.getOwnPropertyDescriptor,je=(e,t,i,s)=>{for(var o=s>1?void 0:s?Be(t,i):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(o=n(o)||o);return o};const Me=[{label:"Text Color (Primary)",cssVariable:"--ia-theme-primary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background Color (Primary)",cssVariable:"--ia-theme-primary-cta-fill",defaultValue:"#194880",inputType:"color"}];let Bt=class extends _{render(){return h`
      <story-template
        elementTag="ia-button"
        elementClassName="IAButton"
        .exampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:Me}}
      >
        <div slot="demo">
          <ia-button @click=${()=>alert("Button clicked!")}
            >Click Me</ia-button
          >
        </div>
      </story-template>
    `}get exampleUsage(){return"<ia-button @click=${() => alert('Button clicked!')}>Click Me</ia-button>"}};Bt=je([O("ia-button-story")],Bt);const Re="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='36.283'%20height='36.283'%3e%3cpath%20d='M35.531%2017.391h-3.09l.845-1.464a.748.748%200%201%200-1.297-.75l-1.276%202.214H28.61l2.515-4.354a.751.751%200%200%200-.272-1.024.75.75%200%200%200-1.024.274l-2.948%205.104h-2.023a6.751%206.751%200%200%200-2.713-4.684l1.019-1.76%205.896-.002a.75.75%200%200%200%200-1.5l-5.029.002%201.051-1.82%202.557.002a.75.75%200%200%200%200-1.5l-1.689-.002%201.545-2.676a.75.75%200%201%200-1.302-.75l-1.547%202.676-.844-1.463a.749.749%200%201%200-1.297.75l1.278%202.213-1.051%201.818-2.514-4.354a.75.75%200%200%200-1.298.75l2.946%205.104-1.016%201.758a6.692%206.692%200%200%200-2.706-.57%206.74%206.74%200%200%200-2.707.568l-1.013-1.754%202.946-5.105a.75.75%200%200%200-1.298-.75L13.56%208.697l-1.05-1.818%201.278-2.217a.749.749%200%200%200-1.298-.75l-.845%201.465-1.551-2.678a.75.75%200%200%200-1.024-.273.748.748%200%200%200-.274%201.023l1.545%202.678H8.652a.75.75%200%200%200%200%201.5h2.556l1.05%201.818H7.231a.75.75%200%200%200%200%201.5h5.894l1.017%201.762a6.755%206.755%200%200%200-2.712%204.684H9.406l-2.95-5.104a.75.75%200%201%200-1.299.75l2.516%204.354H5.569l-1.277-2.213a.75.75%200%200%200-1.298.75l.845%201.463H.75a.75.75%200%200%200%200%201.5h3.09l-.845%201.465a.747.747%200%200%200%20.275%201.022.75.75%200%200%200%20.374.103.75.75%200%200%200%20.65-.375l1.277-2.215h2.103l-2.516%204.354a.75.75%200%200%200%201.299.75l2.949-5.104h2.024a6.761%206.761%200%200%200%202.712%204.685l-1.017%201.762H7.232a.75.75%200%200%200%200%201.5h5.026l-1.05%201.818H8.651a.75.75%200%200%200%200%201.5h1.69l-1.545%202.676a.75.75%200%200%200%201.299.75l1.546-2.676.846%201.465a.755.755%200%200%200%20.65.375.737.737%200%200%200%20.375-.103.747.747%200%200%200%20.274-1.022l-1.279-2.215%201.05-1.82%202.515%204.354a.75.75%200%200%200%201.299-.75l-2.947-5.104%201.013-1.756a6.72%206.72%200%200%200%205.415%200l1.014%201.756-2.947%205.104a.75.75%200%200%200%201.298.75l2.515-4.354%201.053%201.82-1.277%202.213a.75.75%200%200%200%201.298.75l.844-1.463%201.545%202.678c.141.24.393.375.65.375a.75.75%200%200%200%20.649-1.125l-1.548-2.678h1.689a.75.75%200%200%200%200-1.5h-2.557l-1.051-1.82%205.029.002a.75.75%200%200%200%200-1.5l-5.896-.002-1.019-1.76a6.75%206.75%200%200%200%202.711-4.685h2.023l2.947%205.104a.753.753%200%200%200%201.025.273.749.749%200%200%200%20.272-1.023l-2.515-4.354h2.104l1.279%202.215a.75.75%200%200%200%20.649.375c.127%200%20.256-.03.375-.103a.748.748%200%200%200%20.273-1.022l-.848-1.465h3.092a.75.75%200%200%200%20.003-1.5zm-12.136.75c0%20.257-.041.502-.076.75a5.223%205.223%200%200%201-1.943%203.358%205.242%205.242%200%200%201-1.291.766%205.224%205.224%200%200%201-1.949.384%205.157%205.157%200%200%201-3.239-1.15%205.22%205.22%200%200%201-1.943-3.358c-.036-.247-.076-.493-.076-.75s.04-.503.076-.75a5.22%205.22%200%200%201%201.944-3.359c.393-.312.82-.576%201.291-.765a5.219%205.219%200%200%201%201.948-.384c.69%200%201.344.142%201.948.384.471.188.898.454%201.291.765a5.222%205.222%200%200%201%201.943%203.359c.035.247.076.493.076.75z'%20fill=':color:'/%3e%3c/svg%3e",jt=new WeakSet;class Ue extends lt{constructor(t){super(t)}update(t,[i,s]){return jt.has(t)||(i(),jt.add(t)),this.render(i,s)}render(t,i){return i()}}const Mt=rt(Ue);var Ne=Object.defineProperty,De=Object.getOwnPropertyDescriptor,wt=(e,t,i,s)=>{for(var o=s>1?void 0:s?De(t,i):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&Ne(t,i,o),o};let st=class extends _{constructor(){super(...arguments),this.snowing=!1}render(){return h`
      ${this.startButtonTemplate} ${this.clearButtonTemplate}
      <img src=${Re} alt="Snowflakes icon" />
    `}willUpdate(e){e.has("snowConfig")&&(this.snowflakes?.destroy(),this.snowflakes=void 0,this.startSnowing())}get startButtonTemplate(){return Mt(async()=>{await Q(()=>Promise.resolve().then(()=>kt),void 0,import.meta.url)},()=>h`
        <ia-button
          @click=${()=>{this.snowing?this.stopSnowing():this.startSnowing()}}
        >
          ${this.snowing?"Stop Snowflakes":"Start Snowflakes"}
        </ia-button>
      `)}get clearButtonTemplate(){return Mt(async()=>{await Q(()=>Promise.resolve().then(()=>kt),void 0,import.meta.url)},()=>h`
        <ia-button
          @click=${()=>{this.snowflakes?.destroy()}}
        >
          Clear Snowflakes
        </ia-button>
      `)}async startSnowing(){if(!this.snowflakes){const t=(await Q(()=>import("./snowflakes.esm-Dz_MTlsm.js"),[],import.meta.url)).default;this.snowflakes=new t(this.snowConfig)}this.snowflakes?.start(),this.snowing=!0}stopSnowing(){this.snowflakes?.stop(),this.snowing=!1}static get styles(){return E`
      img {
        width: 16px;
        filter: invert(1);
        vertical-align: middle;
      }
    `}};wt([d({type:Object})],st.prototype,"snowConfig",2);wt([b()],st.prototype,"snowing",2);st=wt([O("ia-snow")],st);var Fe=Object.defineProperty,Ve=Object.getOwnPropertyDescriptor,D=(e,t,i,s)=>{for(var o=s>1?void 0:s?Ve(t,i):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&Fe(t,i,o),o};let M=class extends _{render(){return h`
      <story-template
        elementTag="ia-snow"
        elementClassName="IASnow"
        .exampleUsage=${this.exampleUsage}
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
    `:"<ia-snow></ia-snow>"}get configString(){return JSON.stringify(this.config,null,2)}get snowflakeConfig(){return{color:this.colorInput.value,count:Number(this.countInput.value),wind:this.windInput.checked,rotation:this.rotationInput.checked}}setupSnowflakes(){this.config=this.snowflakeConfig}static get styles(){return E`
      fieldset {
        margin-top: 16px;
      }
    `}};D([b()],M.prototype,"config",2);D([$("#count")],M.prototype,"countInput",2);D([$("#wind")],M.prototype,"windInput",2);D([$("#rotation")],M.prototype,"rotationInput",2);D([$("#color")],M.prototype,"colorInput",2);M=D([O("ia-snow-story")],M);const Gt=JSON.parse(`[{"name":"Afghanistan","flag":"🇦🇫"},{"name":"Albania","flag":"🇦🇱"},{"name":"Algeria","flag":"🇩🇿"},{"name":"Andorra","flag":"🇦🇩"},{"name":"Angola","flag":"🇦🇴"},{"name":"Antigua and Barbuda","flag":"🇦🇬"},{"name":"Argentina","flag":"🇦🇷"},{"name":"Armenia","flag":"🇦🇲"},{"name":"Aruba","flag":"🇦🇼"},{"name":"Australia","flag":"🇦🇺"},{"name":"Austria","flag":"🇦🇹"},{"name":"Azerbaijan","flag":"🇦🇿"},{"name":"Bahamas","flag":"🇧🇸"},{"name":"Bahrain","flag":"🇧🇭"},{"name":"Bangladesh","flag":"🇧🇩"},{"name":"Barbados","flag":"🇧🇧"},{"name":"Belarus","flag":"🇧🇾"},{"name":"Belgium","flag":"🇧🇪"},{"name":"Belize","flag":"🇧🇿"},{"name":"Benin","flag":"🇧🇯"},{"name":"Bhutan","flag":"🇧🇹"},{"name":"Bolivia","flag":"🇧🇴"},{"name":"Bosnia and Herzegovina","flag":"🇧🇦"},{"name":"Botswana","flag":"🇧🇼"},{"name":"Brazil","flag":"🇧🇷"},{"name":"Brunei","flag":"🇧🇳"},{"name":"Bulgaria","flag":"🇧🇬"},{"name":"Burkina Faso","flag":"🇧🇫"},{"name":"Burundi","flag":"🇧🇮"},{"name":"Cabo Verde","flag":"🇨🇻"},{"name":"Cambodia","flag":"🇰🇭"},{"name":"Cameroon","flag":"🇨🇲"},{"name":"Canada","flag":"🇨🇦"},{"name":"Central African Republic","flag":"🇨🇫"},{"name":"Chad","flag":"🇹🇩"},{"name":"Chile","flag":"🇨🇱"},{"name":"China","flag":"🇨🇳"},{"name":"Colombia","flag":"🇨🇴"},{"name":"Comoros","flag":"🇰🇲"},{"name":"Cook Islands","flag":"🇨🇰"},{"name":"Costa Rica","flag":"🇨🇷"},{"name":"Côte d'Ivoire","flag":"🇨🇮"},{"name":"Croatia","flag":"🇭🇷"},{"name":"Cuba","flag":"🇨🇺"},{"name":"Cyprus","flag":"🇨🇾"},{"name":"Czechia","flag":"🇨🇿"},{"name":"Democratic Republic of the Congo","flag":"🇨🇩"},{"name":"Denmark","flag":"🇩🇰"},{"name":"Djibouti","flag":"🇩🇯"},{"name":"Dominica","flag":"🇩🇲"},{"name":"Dominican Republic","flag":"🇩🇴"},{"name":"Ecuador","flag":"🇪🇨"},{"name":"Egypt","flag":"🇪🇬"},{"name":"El Salvador","flag":"🇸🇻"},{"name":"Equatorial Guinea","flag":"🇬🇶"},{"name":"Eritrea","flag":"🇪🇷"},{"name":"Estonia","flag":"🇪🇪"},{"name":"Eswatini","flag":"🇸🇿"},{"name":"Ethiopia","flag":"🇪🇹"},{"name":"Fiji","flag":"🇫🇯"},{"name":"Finland","flag":"🇫🇮"},{"name":"France","flag":"🇫🇷"},{"name":"Gabon","flag":"🇬🇦"},{"name":"Gambia","flag":"🇬🇲"},{"name":"Georgia","flag":"🇬🇪"},{"name":"Germany","flag":"🇩🇪"},{"name":"Ghana","flag":"🇬🇭"},{"name":"Greece","flag":"🇬🇷"},{"name":"Grenada","flag":"🇬🇩"},{"name":"Guatemala","flag":"🇬🇹"},{"name":"Guinea","flag":"🇬🇳"},{"name":"Guinea-Bissau","flag":"🇬🇼"},{"name":"Guyana","flag":"🇬🇾"},{"name":"Haiti","flag":"🇭🇹"},{"name":"Honduras","flag":"🇭🇳"},{"name":"Hungary","flag":"🇭🇺"},{"name":"Iceland","flag":"🇮🇸"},{"name":"India","flag":"🇮🇳"},{"name":"Indonesia","flag":"🇮🇩"},{"name":"Iran","flag":"🇮🇷"},{"name":"Iraq","flag":"🇮🇶"},{"name":"Ireland","flag":"🇮🇪"},{"name":"Israel","flag":"🇮🇱"},{"name":"Italy","flag":"🇮🇹"},{"name":"Jamaica","flag":"🇯🇲"},{"name":"Japan","flag":"🇯🇵"},{"name":"Jordan","flag":"🇯🇴"},{"name":"Kazakhstan","flag":"🇰🇿"},{"name":"Kenya","flag":"🇰🇪"},{"name":"Kiribati","flag":"🇰🇮"},{"name":"Kosovo","flag":"🇽🇰"},{"name":"Kuwait","flag":"🇰🇼"},{"name":"Kyrgyzstan","flag":"🇰🇬"},{"name":"Laos","flag":"🇱🇦"},{"name":"Latvia","flag":"🇱🇻"},{"name":"Lebanon","flag":"🇱🇧"},{"name":"Lesotho","flag":"🇱🇸"},{"name":"Liberia","flag":"🇱🇷"},{"name":"Libya","flag":"🇱🇾"},{"name":"Liechtenstein","flag":"🇱🇮"},{"name":"Lithuania","flag":"🇱🇹"},{"name":"Luxembourg","flag":"🇱🇺"},{"name":"Madagascar","flag":"🇲🇬"},{"name":"Malawi","flag":"🇲🇼"},{"name":"Malaysia","flag":"🇲🇾"},{"name":"Maldives","flag":"🇲🇻"},{"name":"Mali","flag":"🇲🇱"},{"name":"Malta","flag":"🇲🇹"},{"name":"Marshall Islands","flag":"🇲🇭"},{"name":"Mauritania","flag":"🇲🇷"},{"name":"Mauritius","flag":"🇲🇺"},{"name":"Mexico","flag":"🇲🇽"},{"name":"Micronesia","flag":"🇫🇲"},{"name":"Moldova","flag":"🇲🇩"},{"name":"Monaco","flag":"🇲🇨"},{"name":"Mongolia","flag":"🇲🇳"},{"name":"Montenegro","flag":"🇲🇪"},{"name":"Morocco","flag":"🇲🇦"},{"name":"Mozambique","flag":"🇲🇿"},{"name":"Myanmar","flag":"🇲🇲"},{"name":"Namibia","flag":"🇳🇦"},{"name":"Nauru","flag":"🇳🇷"},{"name":"Nepal","flag":"🇳🇵"},{"name":"Netherlands","flag":"🇳🇱"},{"name":"New Zealand","flag":"🇳🇿"},{"name":"Nicaragua","flag":"🇳🇮"},{"name":"Niue","flag":"🇳🇺"},{"name":"Niger","flag":"🇳🇪"},{"name":"Nigeria","flag":"🇳🇬"},{"name":"North Korea","flag":"🇰🇵"},{"name":"North Macedonia","flag":"🇲🇰"},{"name":"Norway","flag":"🇳🇴"},{"name":"Oman","flag":"🇴🇲"},{"name":"Pakistan","flag":"🇵🇰"},{"name":"Palau","flag":"🇵🇼"},{"name":"Palestine","flag":"🇵🇸"},{"name":"Panama","flag":"🇵🇦"},{"name":"Papua New Guinea","flag":"🇵🇬"},{"name":"Paraguay","flag":"🇵🇾"},{"name":"Peru","flag":"🇵🇪"},{"name":"Philippines","flag":"🇵🇭"},{"name":"Poland","flag":"🇵🇱"},{"name":"Portugal","flag":"🇵🇹"},{"name":"Qatar","flag":"🇶🇦"},{"name":"Republic of the Congo","flag":"🇨🇬"},{"name":"Romania","flag":"🇷🇴"},{"name":"Russia","flag":"🇷🇺"},{"name":"Rwanda","flag":"🇷🇼"},{"name":"Saint Kitts and Nevis","flag":"🇰🇳"},{"name":"Saint Lucia","flag":"🇱🇨"},{"name":"Saint Vincent and the Grenadines","flag":"🇻🇨"},{"name":"Samoa","flag":"🇼🇸"},{"name":"San Marino","flag":"🇸🇲"},{"name":"Sao Tome and Principe","flag":"🇸🇹"},{"name":"Saudi Arabia","flag":"🇸🇦"},{"name":"Senegal","flag":"🇸🇳"},{"name":"Serbia","flag":"🇷🇸"},{"name":"Seychelles","flag":"🇸🇨"},{"name":"Sierra Leone","flag":"🇸🇱"},{"name":"Singapore","flag":"🇸🇬"},{"name":"Slovakia","flag":"🇸🇰"},{"name":"Slovenia","flag":"🇸🇮"},{"name":"Solomon Islands","flag":"🇸🇧"},{"name":"Somalia","flag":"🇸🇴"},{"name":"South Africa","flag":"🇿🇦"},{"name":"South Korea","flag":"🇰🇷"},{"name":"South Sudan","flag":"🇸🇸"},{"name":"Spain","flag":"🇪🇸"},{"name":"Sri Lanka","flag":"🇱🇰"},{"name":"Sudan","flag":"🇸🇩"},{"name":"Suriname","flag":"🇸🇷"},{"name":"Sweden","flag":"🇸🇪"},{"name":"Switzerland","flag":"🇨🇭"},{"name":"Syria","flag":"🇸🇾"},{"name":"Taiwan","flag":"🇹🇼"},{"name":"Tajikistan","flag":"🇹🇯"},{"name":"Tanzania","flag":"🇹🇿"},{"name":"Thailand","flag":"🇹🇭"},{"name":"Timor-Leste","flag":"🇹🇱"},{"name":"Togo","flag":"🇹🇬"},{"name":"Tonga","flag":"🇹🇴"},{"name":"Trinidad and Tobago","flag":"🇹🇹"},{"name":"Tunisia","flag":"🇹🇳"},{"name":"Turkey","flag":"🇹🇷"},{"name":"Turkmenistan","flag":"🇹🇲"},{"name":"Tuvalu","flag":"🇹🇻"},{"name":"Uganda","flag":"🇺🇬"},{"name":"Ukraine","flag":"🇺🇦"},{"name":"United Arab Emirates","flag":"🇦🇪"},{"name":"United Kingdom","flag":"🇬🇧"},{"name":"United States","flag":"🇺🇸"},{"name":"Uruguay","flag":"🇺🇾"},{"name":"Uzbekistan","flag":"🇺🇿"},{"name":"Vanuatu","flag":"🇻🇺"},{"name":"Vatican City","flag":"🇻🇦"},{"name":"Venezuela","flag":"🇻🇪"},{"name":"Vietnam","flag":"🇻🇳"},{"name":"Yemen","flag":"🇾🇪"},{"name":"Zambia","flag":"🇿🇲"},{"name":"Zimbabwe","flag":"🇿🇼"}]`);const dt=rt(class extends lt{constructor(e){if(super(e),e.type!==P.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((s=>s!==""))));for(const s in t)t[s]&&!this.nt?.has(s)&&this.st.add(s);return this.render(t)}const i=e.element.classList;for(const s of this.st)s in t||(i.remove(s),this.st.delete(s));for(const s in t){const o=!!t[s];o===this.st.has(s)||this.nt?.has(s)||(o?(i.add(s),this.st.add(s)):(i.remove(s),this.st.delete(s)))}return S}});const He=e=>e.strings===void 0,ze={},qe=(e,t=ze)=>e._$AH=t;const Ke=rt(class extends lt{constructor(e){if(super(e),e.type!==P.PROPERTY&&e.type!==P.ATTRIBUTE&&e.type!==P.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!He(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===S||t===u)return t;const i=e.element,s=e.name;if(e.type===P.PROPERTY){if(t===i[s])return S}else if(e.type===P.BOOLEAN_ATTRIBUTE){if(!!t===i.hasAttribute(s))return S}else if(e.type===P.ATTRIBUTE&&i.getAttribute(s)===t+"")return S;return qe(e),t}});const We=e=>typeof e!="string"&&"strTag"in e,Ge=(e,t,i)=>{let s=e[0];for(let o=1;o<e.length;o++)s+=t[o-1],s+=e[o];return s};const Ye=(e=>We(e)?Ge(e.strings,e.values):e);let B=Ye;class Ze{constructor(){this.settled=!1,this.promise=new Promise((t,i)=>{this._resolve=t,this._reject=i})}resolve(t){this.settled=!0,this._resolve(t)}reject(t){this.settled=!0,this._reject(t)}}for(let e=0;e<256;e++)(e>>4&15).toString(16)+(e&15).toString(16);let Je=new Ze;Je.resolve();function Xe(e,t){return t.some(i=>e.has(i))}function Qe(e,t){const i=[...e],s=[...t],o=i.length,a=s.length;if(o===0)return!0;let n=0,r=0;for(;r<a;){if(s[r]===i[n]&&(n+=1),n>=o)return!0;r+=1}return!1}const ti="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501%202.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131%202.7226499%201.81402515z'%20%3e%3c/path%3e%3c/svg%3e",ei="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499%203.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501%202.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131%202.7226499-1.81402514z'%20%3e%3c/path%3e%3c/svg%3e",ii="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m50%200c27.6142375%200%2050%2022.3857625%2050%2050s-22.3857625%2050-50%2050-50-22.3857625-50-50%2022.3857625-50%2050-50zm23.8159475%2026.1840525c-1.4033215-1.4033215-3.5816761-1.5592461-5.1572272-.4677738l-.5598841.4677738-18.0988362%2018.0989475-18.0988362-18.0989475-.5598841-.4677738c-1.5755511-1.0914723-3.7539057-.9355477-5.1572272.4677738-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113l18.0989475%2018.0988362-18.0989475%2018.0988362c-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113%201.4033215%201.4033215%203.5816761%201.5592461%205.1572272.4677738l.5598841-.4677738%2018.0988362-18.0989475%2018.0988362%2018.0989475.5598841.4677738c1.5755511%201.0914723%203.7539057.9355477%205.1572272-.4677738%201.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113l-18.0989475-18.0988362%2018.0989475-18.0988362c1.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113z'%20fill-rule='evenodd'%20%3e%3c/path%3e%3c/svg%3e";var si=Object.defineProperty,oi=Object.getOwnPropertyDescriptor,v=(e,t,i,s)=>{for(var o=s>1?void 0:s?oi(t,i):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&si(t,i,o),o};const ai={all:()=>!0,prefix:(e,t)=>t.startsWith(e),suffix:(e,t)=>t.endsWith(e),substring:(e,t)=>t.includes(e),subsequence:Qe},ni="list",ri="substring",li=e=>e,hi=e=>e.toLocaleLowerCase();let f=class extends _{constructor(){super(),this.options=[],this.behavior=ni,this.maxAutocompleteEntries=Number.POSITIVE_INFINITY,this.filter=ri,this.caseSensitive=!1,this.sort=!1,this.wrapArrowKeys=!1,this.stayOpen=!1,this.clearable=!1,this.open=!1,this.disabled=!1,this.required=!1,this.value=null,this.hasFocus=!1,this.highlightedOption=null,this.enteredText="",this.filterText="",this.losingFocus=!1,this.optionsByID=new Map,this.optionFilteringValues=new Map,this.optionsRespectingSortFlag=[],this.filteredOptions=[],this.internals=this.attachInternals()}render(){const e=dt({disabled:this.disabled,focused:this.hasFocus});return h`
      <div id="container" part="container">
        ${this.labelTemplate}
        <div id="main-widget-row" class=${e} part="combo-box">
          ${this.textInputTemplate}
          ${this.clearable?this.clearButtonTemplate:u}
          ${this.caretButtonTemplate}
        </div>
        ${this.optionsListTemplate}
      </div>
    `}willUpdate(e){(e.has("options")||e.has("caseSensitive"))&&this.rebuildOptionFilteringValues(),e.has("options")&&this.rebuildOptionIDMap(),(e.has("options")||e.has("sort"))&&this.rebuildSortedOptions(),Xe(e,["options","behavior","maxAutocompleteEntries","filter","filterText","caseSensitive","sort"])&&this.rebuildFilteredOptions(),e.has("open")&&(this.open?this.value&&this.setHighlightedOption(this.selectedOption):this.setHighlightedOption(null)),e.has("required")&&this.updateFormValidity()}updated(e){e.has("value")&&this.handleValueChanged(),e.has("options")&&this.behavior!=="freeform"&&!this.selectedOption&&this.clearSelectedOption(),e.has("open")&&(this.open?(this.positionOptionsMenu(),this.optionsList?.showPopover?.(),this.optionsList?.classList.add("visible")):(this.optionsList?.hidePopover?.(),this.optionsList?.classList.remove("visible")))}get labelTemplate(){return h`
      <label id="label" for="text-input" part="label">
        <slot name="label"></slot>
      </label>
    `}get textInputTemplate(){const e=dt({"clear-padding":this.clearable&&!this.shouldShowClearButton});return h`
      <input
        type="text"
        id="text-input"
        class=${e}
        .value=${Ke(this.enteredText)}
        placeholder=${it(this.placeholder)}
        part="text-input"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-controls="options-list"
        aria-expanded=${this.open}
        aria-activedescendant=${it(this.highlightedOption?.id)}
        ?readonly=${this.behavior==="select-only"}
        ?disabled=${this.disabled}
        ?required=${this.required}
        @click=${this.handleComboBoxClick}
        @keydown=${this.handleComboBoxKeyDown}
        @input=${this.handleTextBoxInput}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      />
    `}get clearButtonTemplate(){return h`
      <button
        type="button"
        id="clear-button"
        part="clear-button"
        tabindex="-1"
        ?hidden=${!this.shouldShowClearButton}
        @click=${this.handleClearButtonClick}
      >
        <span class="sr-only">${B("Clear")}</span>
        <slot name="clear-button">
          <img
            class="icon clear-icon"
            part="icon clear-icon"
            src=${ii}
            alt=""
            aria-hidden="true"
          />
        </slot>
      </button>
    `}get caretTemplate(){return h`
      <slot name="caret-closed" ?hidden=${this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${ti}
          alt=""
          aria-hidden="true"
        />
      </slot>
      <slot name="caret-open" ?hidden=${!this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${ei}
          alt=""
          aria-hidden="true"
        />
      </slot>
    `}get caretButtonTemplate(){return h`
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
        <span class="sr-only">${B("Toggle options")}</span>
        ${this.caretTemplate}
      </button>
    `}get optionsListTemplate(){return h`
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
        ${X(this.open,()=>this.optionTemplates)}
        <slot name="options-list-bottom"></slot>
      </ul>
    `}get optionTemplates(){return this.filteredOptions.length===0&&this.maxAutocompleteEntries>0?[this.emptyOptionsTemplate]:this.filteredOptions.map(e=>{const t=e===this.highlightedOption,i=dt({option:!0,highlight:t});return h`
        <li
          id=${e.id}
          class=${i}
          part="option ${t?"highlight":""}"
          role="option"
          tabindex="-1"
          @pointerenter=${this.handleOptionPointerEnter}
          @pointermove=${this.handleOptionPointerMove}
          @click=${this.handleOptionClick}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        >
          ${e.content??e.text}
        </li>
      `})}get emptyOptionsTemplate(){return h`
      <li id="empty-options" part="empty-options">
        <slot name="empty-options">${B("No matching options")}</slot>
      </li>
    `}handleOptionPointerEnter(e){this.handleOptionPointerMove(e)}handleOptionPointerMove(e){const t=e.currentTarget,i=this.getOptionFor(t.id);i&&this.setHighlightedOption(i)}handleOptionClick(e){const t=e.currentTarget,i=this.getOptionFor(t.id);i&&(this.setSelectedOption(i.id),this.stayOpen||this.closeOptionsMenu())}handleComboBoxKeyDown(e){switch(e.key){case"Enter":this.handleEnterPressed();break;case"Escape":this.handleEscapePressed();break;case"ArrowUp":e.altKey?this.handleAltUpArrowPressed():this.handleUpArrowPressed();break;case"ArrowDown":e.altKey?this.handleAltDownArrowPressed():this.handleDownArrowPressed();break;case"Tab":this.handleTabPressed();return;case" ":this.handleSpacePressed(e);return;default:return}e.stopPropagation(),e.preventDefault()}async handleTextBoxInput(){const e=this.textInput?.value??"";this.enteredText=e,this.setFilterText(e),this.openOptionsMenu(),await this.updateComplete,this.highlightFirstOption()}handleEnterPressed(){if(!this.open){this.openOptionsMenu();return}this.highlightedOption?this.setSelectedOption(this.highlightedOption.id):this.behavior==="freeform"&&this.setValue(this.enteredText),this.stayOpen||(this.open=!1)}handleEscapePressed(){if(this.open){this.closeOptionsMenu();return}this.clearSelectedOption()}handleUpArrowPressed(){this.open||this.openOptionsMenu(),this.highlightPreviousOption()}handleDownArrowPressed(){this.open||this.openOptionsMenu(),this.highlightNextOption()}handleAltUpArrowPressed(){this.closeOptionsMenu()}handleAltDownArrowPressed(){this.openOptionsMenu()}handleTabPressed(){this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1))}handleSpacePressed(e){this.behavior==="select-only"&&(this.open?this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1)):this.openOptionsMenu(),e.stopPropagation(),e.preventDefault())}handleComboBoxClick(){this.toggleOptionsMenu()}handleClearButtonClick(){this.clearSelectedOption(),this.textInput?.focus(),this.openOptionsMenu()}handleFocus(){this.behavior!=="select-only"&&this.textInput?.focus(),this.hasFocus=!0,this.losingFocus=!1}handleBlur(){this.hasFocus=!1,this.losingFocus=!0,setTimeout(()=>{this.losingFocus&&!this.shadowRoot?.activeElement&&(this.losingFocus=!1,this.closeOptionsMenu(),this.behavior==="list"?this.setTextValue(this.selectedOption?.text??"",!1):this.behavior==="freeform"&&(this.enteredText||this.value)&&this.setValue(this.enteredText))},0)}handleValueChanged(){if(this.value==null){this.enteredText&&this.setTextValue("",!1);return}const e=this.getOptionFor(this.value);if(this.behavior==="freeform"){const t=e?.text??this.value;t!==this.enteredText&&this.setTextValue(t);return}if(!e){this.clearSelectedOption();return}this.enteredText!==e.text&&(this.setTextValue(e.text,!1),this.setFilterText(""))}highlightFirstOption(){this.setHighlightedOption(this.firstFilteredOption)}highlightLastOption(){this.setHighlightedOption(this.lastFilteredOption)}highlightPreviousOption(){const{filteredOptions:e,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightLastOption();return}const{highlightedIndex:i}=this,s=this.wrapArrowKeys&&i===0?t:Math.max(i-1,0);this.setHighlightedOption(e[s])}highlightNextOption(){const{filteredOptions:e,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightFirstOption();return}const{highlightedIndex:i}=this,s=this.wrapArrowKeys&&i===t?0:Math.min(i+1,t);this.setHighlightedOption(e[s])}async setHighlightedOption(e){this.highlightedOption=e,await this.updateComplete;const{optionsList:t,highlightedElement:i}=this;if(!i||!t)return;const s=i.getBoundingClientRect(),o=t.getBoundingClientRect();(s.top<o.top||s.bottom>o.bottom)&&i.scrollIntoView({block:"nearest"})}setSelectedOption(e){const t=this.getOptionFor(e);if(!t)throw new RangeError("Unknown option ID");const i=this.value;this.value=t.id,this.internals.setFormValue(this.value),this.setTextValue(t.text,!1),this.setFilterText(""),this.value!==i&&this.emitChangeEvent(),t.onSelected?.(t)}clearSelectedOption(){const e=this.value;this.value=null,this.internals.setFormValue(this.value),this.setTextValue(""),this.value!==e&&this.emitChangeEvent()}setValue(e){if(this.behavior==="freeform"){const t=this.value;this.value=e,this.internals.setFormValue(this.value),this.setTextValue(e),this.value!==t&&this.emitChangeEvent()}else this.setSelectedOption(e)}setTextValue(e,t=!0){this.textInput&&(this.textInput.value=e),this.enteredText=e,t&&this.setFilterText(e)}setFilterText(e){const{caseTransform:t}=this;this.filterText=t(e)}openOptionsMenu(){this.open=!0,this.emitToggleEvent()}closeOptionsMenu(){this.open=!1,this.emitToggleEvent()}toggleOptionsMenu(){this.open=!this.open,this.emitToggleEvent()}updateFormValidity(){this.required&&!this.value?this.internals.setValidity({valueMissing:!0},B("A value is required")):this.internals.setValidity({})}emitChangeEvent(){this.dispatchEvent(new CustomEvent("change",{detail:this.value}))}emitToggleEvent(){this.dispatchEvent(new CustomEvent("toggle",{detail:this.open}))}get isEmpty(){return!this.selectedOption&&!this.enteredText}get shouldShowClearButton(){return this.clearable&&!this.disabled&&!this.isEmpty}positionOptionsMenu(){const{mainWidgetRow:e,optionsList:t}=this;if(!e||!t)return;const i=e.getBoundingClientRect(),{innerHeight:s,scrollX:o,scrollY:a}=window,n=i.top,r=s-i.bottom,l="var(--combo-box-list-max-height--)",y={top:`${i.bottom+a}px`,left:`${i.left+o}px`,width:`var(--combo-box-list-width--, ${i.width}px)`,maxHeight:`min(${l}, ${r}px)`};Object.assign(t.style,y),setTimeout(()=>{const c=t.getBoundingClientRect().bottom>=s,w=n>r;c&&w&&(t.style.top="auto",t.style.bottom=`${s-i.top-a}px`,t.style.maxHeight=`min(${l}, ${n}px)`)},0)}get caseTransform(){return this.caseSensitive?li:hi}getOptionFor(e){return this.optionsByID.get(e)??null}rebuildOptionIDMap(){this.optionsByID.clear();for(const e of this.options)this.optionsByID.set(e.id,e)}rebuildSortedOptions(){this.sort?this.optionsRespectingSortFlag=[...this.options].sort((e,t)=>{const i=this.optionFilteringValues.get(e),s=this.optionFilteringValues.get(t);return i.localeCompare(s)}):this.optionsRespectingSortFlag=this.options}rebuildOptionFilteringValues(){this.optionFilteringValues.clear();const{caseTransform:e}=this;for(const t of this.options){const i=e(t.text);this.optionFilteringValues.set(t,i)}}rebuildFilteredOptions(){const e=this.behavior==="select-only"?"all":this.filter,t=typeof e=="string"?ai[e]:e,i=this.optionsRespectingSortFlag.filter(s=>{const o=this.optionFilteringValues.get(s);return o?t(this.filterText,o,s):!1}).slice(0,this.maxAutocompleteEntries);this.filteredOptions=i}get firstFilteredOption(){return this.filteredOptions[0]??null}get lastFilteredOption(){return this.filteredOptions[this.lastFilteredIndex]??null}get lastFilteredIndex(){return this.filteredOptions.length-1}get selectedOption(){return this.value==null?null:this.getOptionFor(this.value)}get highlightedIndex(){return this.highlightedOption?this.filteredOptions.indexOf(this.highlightedOption):-1}get highlightedElement(){return this.highlightedOption?this.shadowRoot.getElementById(this.highlightedOption.id):null}static get styles(){const e=E`
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
    `;return[nt,e]}};f.formAssociated=!0;f.shadowRootOptions={..._.shadowRootOptions,delegatesFocus:!0};v([d({type:Array})],f.prototype,"options",2);v([d({type:String})],f.prototype,"placeholder",2);v([d({type:String})],f.prototype,"behavior",2);v([d({type:Number,attribute:"max-autocomplete-entries"})],f.prototype,"maxAutocompleteEntries",2);v([d({type:String})],f.prototype,"filter",2);v([d({type:Boolean,reflect:!0,attribute:"case-sensitive"})],f.prototype,"caseSensitive",2);v([d({type:Boolean,reflect:!0})],f.prototype,"sort",2);v([d({type:Boolean,reflect:!0,attribute:"wrap-arrow-keys"})],f.prototype,"wrapArrowKeys",2);v([d({type:Boolean,reflect:!0,attribute:"stay-open"})],f.prototype,"stayOpen",2);v([d({type:Boolean,reflect:!0})],f.prototype,"clearable",2);v([d({type:Boolean,reflect:!0})],f.prototype,"open",2);v([d({type:Boolean,reflect:!0})],f.prototype,"disabled",2);v([d({type:Boolean,reflect:!0})],f.prototype,"required",2);v([d({type:String})],f.prototype,"value",2);v([b()],f.prototype,"hasFocus",2);v([b()],f.prototype,"highlightedOption",2);v([b()],f.prototype,"enteredText",2);v([b()],f.prototype,"filterText",2);v([$("#main-widget-row")],f.prototype,"mainWidgetRow",2);v([$("#text-input")],f.prototype,"textInput",2);v([$("#options-list")],f.prototype,"optionsList",2);f=v([O("ia-combo-box")],f);var ci=Object.defineProperty,pi=Object.getOwnPropertyDescriptor,m=(e,t,i,s)=>{for(var o=s>1?void 0:s?pi(t,i):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&ci(t,i,o),o};const di=[{label:"Width",cssVariable:"--ia-theme-combo-box-width",defaultValue:"250px",inputType:"text"},{label:"Padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown width",cssVariable:"--combo-box-list-width",defaultValue:"",inputType:"text"},{label:"Dropdown max height",cssVariable:"--combo-box-list-max-height",defaultValue:"250px",inputType:"text"}],Yt=[{id:"red",text:"Red"},{id:"orange",text:"Orange"},{id:"yellow",text:"Yellow"},{id:"green",text:"Green"},{id:"blue",text:"Blue"},{id:"indigo",text:"Indigo"},{id:"violet",text:"Violet"}],ui=Yt.map(e=>({...e,content:h` <span style="display: flex; align-items: center">
      <span style="flex: 1">${e.text}</span>
      <div style="width: 15px; height: 15px; background:${e.id}"></div>
    </span>`})),Rt=Gt.map(e=>({id:e.name,text:e.name})),gi=Gt.map(e=>({id:e.name,text:e.name,content:h`<span>${e.flag}</span>&nbsp;<span>${e.name}</span>`})),fi="list",mi="Choices",Ut="Select an option...",Nt=50,bi="substring";let g=class extends _{constructor(){super(...arguments),this.options=Rt,this.behavior=fi,this.label=mi,this.placeholder=Ut,this.maxAutocompleteEntries=Nt,this.filterFn=bi,this.caseSensitive=!1,this.shouldSort=!1,this.wrapArrowKeys=!0,this.clearable=!0,this.disabled=!1,this.announcerText=""}render(){return h`
      <story-template
        elementTag="ia-combo-box"
        elementClassName="IAComboBox"
        .exampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:di}}
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
                  value=${Ut}
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
                  value=${Nt}
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
    `}get exampleUsage(){const{placeholder:e,behavior:t,maxAutocompleteEntries:i,filterFn:s}=this,o={behavior:t?`"${t}"`:"",placeholder:e?`"${e}"`:"","max-autocomplete-entries":i?`"${i}"`:"",filter:s&&s!=="substring"?`"${s}"`:"","case-sensitive":this.caseSensitive,sort:this.shouldSort,"wrap-arrow-keys":this.wrapArrowKeys,clearable:this.clearable,disabled:this.disabled};return`
      <ia-combo-box
        .options=\${[
          { id: 'foo', text: 'Foo Option' },
          { id: 'bar', text: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(o).map(([n,r])=>r?r===!0?n:r?`${n}=${r}`:"":"").join(`
  `)}
      >
        <span slot="label">${this.label}</span>
      </ia-combo-box>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(e){e.preventDefault(),this.updateOptions(),this.behavior=this.behaviorSelect.value,this.label=this.labelInput.value,this.placeholder=this.placeholderInput.value,this.maxAutocompleteEntries=Number(this.maxAutocompleteInput.value),this.filterFn=this.filterFnSelect.value,this.caseSensitive=this.caseSensitiveCheck.checked,this.shouldSort=this.sortCheck.checked,this.wrapArrowKeys=this.wrapArrowKeysCheck.checked,this.clearable=this.clearableCheck.checked,this.disabled=this.disabledCheck.checked}updateOptions(){switch(this.optionSetSelect.value){case"colors":this.options=this.customContentCheck.checked?ui:Yt;break;case"countries":this.options=this.customContentCheck.checked?gi:Rt;break;default:this.options=[]}}handleComboBoxChange(e){this.announcerText=`New value is: ${e.detail}`}static get styles(){return E`
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
    `}};m([b()],g.prototype,"options",2);m([b()],g.prototype,"behavior",2);m([b()],g.prototype,"label",2);m([b()],g.prototype,"placeholder",2);m([b()],g.prototype,"maxAutocompleteEntries",2);m([b()],g.prototype,"filterFn",2);m([b()],g.prototype,"caseSensitive",2);m([b()],g.prototype,"shouldSort",2);m([b()],g.prototype,"wrapArrowKeys",2);m([b()],g.prototype,"clearable",2);m([b()],g.prototype,"disabled",2);m([b()],g.prototype,"announcerText",2);m([$("#settings__options")],g.prototype,"optionSetSelect",2);m([$("#settings__custom-content")],g.prototype,"customContentCheck",2);m([$("#settings__behavior")],g.prototype,"behaviorSelect",2);m([$("#settings__label")],g.prototype,"labelInput",2);m([$("#settings__placeholder")],g.prototype,"placeholderInput",2);m([$("#settings__max-entries")],g.prototype,"maxAutocompleteInput",2);m([$("#settings__filter-fn")],g.prototype,"filterFnSelect",2);m([$("#settings__case-sensitive")],g.prototype,"caseSensitiveCheck",2);m([$("#settings__sort")],g.prototype,"sortCheck",2);m([$("#settings__wrap")],g.prototype,"wrapArrowKeysCheck",2);m([$("#settings__clearable")],g.prototype,"clearableCheck",2);m([$("#settings__disabled")],g.prototype,"disabledCheck",2);g=m([O("ia-combo-box-story")],g);const Zt=(e,t,i)=>{for(const s of t)if(s[0]===e)return(0,s[1])();return i?.()};var yi=Object.defineProperty,vi=Object.getOwnPropertyDescriptor,F=(e,t,i,s)=>{for(var o=s>1?void 0:s?vi(t,i):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&yi(t,i,o),o};let R=class extends _{constructor(){super(...arguments),this.loadingTitle=B("Loading..."),this.successTitle=B("Success"),this.errorTitle=B("Error"),this.loadingStyle="ring-dots",this.mode="loading"}render(){return h`${Zt(this.mode,[["loading",()=>this.loadingIndicatorTemplate],["success",()=>this.successIndicatorTemplate],["error",()=>this.errorIndicatorTemplate]])}`}get loadingIndicatorTemplate(){return h`
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
    `}get successIndicatorTemplate(){return h`
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
    `}get errorIndicatorTemplate(){return h`
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
    `}get shouldShowLoadingDots(){return this.loadingStyle!=="ring"}static get styles(){return[nt,E`
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
      `]}};F([d({type:String})],R.prototype,"loadingTitle",2);F([d({type:String})],R.prototype,"successTitle",2);F([d({type:String})],R.prototype,"errorTitle",2);F([d({type:String})],R.prototype,"loadingStyle",2);F([d({type:String})],R.prototype,"mode",2);R=F([O("ia-status-indicator")],R);var $i=Object.defineProperty,wi=Object.getOwnPropertyDescriptor,ct=(e,t,i,s)=>{for(var o=s>1?void 0:s?wi(t,i):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(o=(s?n(t,i,o):n(o))||o);return s&&o&&$i(t,i,o),o};const xi=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"1.25rem"},{label:"Color - loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Color - success",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"},{label:"Color - error",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}],_i=[{label:"Mode",propertyName:"mode",defaultValue:"loading",inputType:"radio",radioOptions:["loading","success","error"]},{label:"Accessible title - loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{label:"Loading style",propertyName:"loadingStyle",defaultValue:"ring-dots",inputType:"radio",radioOptions:["ring-dots","ring"]},{label:"Accessible title - success",propertyName:"successTitle",defaultValue:"Success"},{label:"Accessible title - error",propertyName:"errorTitle",defaultValue:"Error"}];let G=class extends _{constructor(){super(...arguments),this.stringifiedProps=""}render(){return h`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .exampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:xi}}
      >
        <div slot="demo">
          <ia-status-indicator></ia-status-indicator>
        </div>

        <div slot="settings">
          <table>
            ${_i.map(e=>this.createPropInput(e))}
          </table>
          <button @click=${this.apply}>Apply</button>
        </div>
      </story-template>
    `}get exampleUsage(){return`<ia-status-indicator${this.stringifiedProps??""}></ia-status-indicator>`}createPropInput(e){return Zt(e.inputType,[["radio",()=>this.radioPropInputTemplate(e)]],()=>this.defaultPropInputTemplate(e))??u}defaultPropInputTemplate(e){const t=e.label.toLowerCase().split(" ").join("-");return h`
      <tr>
        <td><label for=${t}>${e.label}</label></td>
        <td>
          <input
            class="prop-input"
            type=${e.inputType??"text"}
            id=${t}
            data-prop=${e.propertyName}
            placeholder=${it(e?.defaultValue)}
          />
        </td>
      </tr>
    `}radioPropInputTemplate(e){if(e.inputType!=="radio"||!e.radioOptions)return u;const t=e.label.toLowerCase().split(" ").join("-");return h`
      <tr>
        <td><legend>${e.label}</legend></td>
        <td>
          ${e.radioOptions.map(i=>h`<input
                  type="radio"
                  class="prop-input"
                  name=${t}
                  id=${i}
                  value=${i}
                  data-prop=${e.propertyName}
                  ?checked=${e.defaultValue===i}
                /><label for=${i}> ${i} </label>`)}
        </td>
      </tr>
    `}apply(){const e=[];this.propInputs?.forEach(t=>{if(!t.dataset.prop||!t.value||t.type==="radio"&&!t.checked)return;const i=t.dataset.prop;e.push(`.${i}=\${'${t.value}'}`),this.component.setAttribute(i,t.value)}),e.length&&(this.stringifiedProps=`
  `+e.join(`
  `)+`
`)}};ct([b()],G.prototype,"stringifiedProps",2);ct([$("ia-status-indicator")],G.prototype,"component",2);ct([Wt(".prop-input")],G.prototype,"propInputs",2);G=ct([O("ia-status-indicator-story")],G);var Si=Object.getOwnPropertyDescriptor,Ai=(e,t,i,s)=>{for(var o=s>1?void 0:s?Si(t,i):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(o=n(o)||o);return o};let Dt=class extends _{render(){return h`
      <h1>🏛️ Internet Archive Elements ⚛️</h1>

      <h2>🚀 Production-Ready Elements</h2>

      <ia-status-indicator-story></ia-status-indicator-story>
      <ia-combo-box-story></ia-combo-box-story>

      <h2>🧪 Labs Elements</h2>

      <ia-snow-story></ia-snow-story>
      <ia-button-story></ia-button-story>
    `}};Dt=Ai([O("app-root")],Dt);
