(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();const vt=globalThis,Mi=vt.ShadowRoot&&(vt.ShadyCSS===void 0||vt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ii=Symbol(),Yi=new WeakMap;let ir=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==Ii)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Mi&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=Yi.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Yi.set(t,e))}return e}toString(){return this.cssText}};const Lr=i=>new ir(typeof i=="string"?i:i+"",void 0,Ii),_=(i,...e)=>{const t=i.length===1?i[0]:e.reduce(((o,r,a)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[a+1]),i[0]);return new ir(t,i,Ii)},Nr=(i,e)=>{if(Mi)i.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const t of e){const o=document.createElement("style"),r=vt.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=t.cssText,i.appendChild(o)}},Xi=Mi?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return Lr(t)})(i):i;const{is:Ur,defineProperty:jr,getOwnPropertyDescriptor:Hr,getOwnPropertyNames:Fr,getOwnPropertySymbols:qr,getPrototypeOf:Kr}=Object,zt=globalThis,Qi=zt.trustedTypes,Wr=Qi?Qi.emptyScript:"",Zr=zt.reactiveElementPolyfillSupport,ot=(i,e)=>i,_t={toAttribute(i,e){switch(e){case Boolean:i=i?Wr:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Bi=(i,e)=>!Ur(i,e),eo={attribute:!0,type:String,converter:_t,reflect:!1,useDefault:!1,hasChanged:Bi};Symbol.metadata??=Symbol("metadata"),zt.litPropertyMetadata??=new WeakMap;let De=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=eo){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(e,o,t);r!==void 0&&jr(this.prototype,e,r)}}static getPropertyDescriptor(e,t,o){const{get:r,set:a}=Hr(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){const l=r?.call(this);a?.call(this,n),this.requestUpdate(e,l,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??eo}static _$Ei(){if(this.hasOwnProperty(ot("elementProperties")))return;const e=Kr(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ot("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ot("properties"))){const t=this.properties,o=[...Fr(t),...qr(t)];for(const r of o)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[o,r]of t)this.elementProperties.set(o,r)}this._$Eh=new Map;for(const[t,o]of this.elementProperties){const r=this._$Eu(t,o);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const r of o)t.unshift(Xi(r))}else e!==void 0&&t.push(Xi(e));return t}static _$Eu(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Nr(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,o);if(r!==void 0&&o.reflect===!0){const a=(o.converter?.toAttribute!==void 0?o.converter:_t).toAttribute(t,o.type);this._$Em=e,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(e,t){const o=this.constructor,r=o._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const a=o.getPropertyOptions(r),n=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:_t;this._$Em=r;const l=n.fromAttribute(t,a.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(e,t,o){if(e!==void 0){const r=this.constructor,a=this[e];if(o??=r.getPropertyOptions(e),!((o.hasChanged??Bi)(a,t)||o.useDefault&&o.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,o))))return;this.C(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:r,wrapped:a},n){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),a!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[r,a]of o){const{wrapped:n}=a,l=this[r];n!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,a,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};De.elementStyles=[],De.shadowRootOptions={mode:"open"},De[ot("elementProperties")]=new Map,De[ot("finalized")]=new Map,Zr?.({ReactiveElement:De}),(zt.reactiveElementVersions??=[]).push("2.1.1");const Vi=globalThis,St=Vi.trustedTypes,to=St?St.createPolicy("lit-html",{createHTML:i=>i}):void 0,or="$lit$",de=`lit$${Math.random().toFixed(9).slice(2)}$`,rr="?"+de,Gr=`<${rr}>`,Oe=document,rt=()=>Oe.createComment(""),at=i=>i===null||typeof i!="object"&&typeof i!="function",zi=Array.isArray,Jr=i=>zi(i)||typeof i?.[Symbol.iterator]=="function",qt=`[ 	
\f\r]`,Qe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,io=/-->/g,oo=/>/g,fe=RegExp(`>|${qt}(?:([^\\s"'>=/]+)(${qt}*=${qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ro=/'/g,ao=/"/g,ar=/^(?:script|style|textarea|title)$/i,nr=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),d=nr(1),no=nr(2),K=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),so=new WeakMap,xe=Oe.createTreeWalker(Oe,129);function sr(i,e){if(!zi(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return to!==void 0?to.createHTML(e):e}const Yr=(i,e)=>{const t=i.length-1,o=[];let r,a=e===2?"<svg>":e===3?"<math>":"",n=Qe;for(let l=0;l<t;l++){const s=i[l];let p,g,h=-1,v=0;for(;v<s.length&&(n.lastIndex=v,g=n.exec(s),g!==null);)v=n.lastIndex,n===Qe?g[1]==="!--"?n=io:g[1]!==void 0?n=oo:g[2]!==void 0?(ar.test(g[2])&&(r=RegExp("</"+g[2],"g")),n=fe):g[3]!==void 0&&(n=fe):n===fe?g[0]===">"?(n=r??Qe,h=-1):g[1]===void 0?h=-2:(h=n.lastIndex-g[2].length,p=g[1],n=g[3]===void 0?fe:g[3]==='"'?ao:ro):n===ao||n===ro?n=fe:n===io||n===oo?n=Qe:(n=fe,r=void 0);const b=n===fe&&i[l+1].startsWith("/>")?" ":"";a+=n===Qe?s+Gr:h>=0?(o.push(p),s.slice(0,h)+or+s.slice(h)+de+b):s+de+(h===-2?l:b)}return[sr(i,a+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};let ci=class lr{constructor({strings:e,_$litType$:t},o){let r;this.parts=[];let a=0,n=0;const l=e.length-1,s=this.parts,[p,g]=Yr(e,t);if(this.el=lr.createElement(p,o),xe.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=xe.nextNode())!==null&&s.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const h of r.getAttributeNames())if(h.endsWith(or)){const v=g[n++],b=r.getAttribute(h).split(de),A=/([.?@])?(.*)/.exec(v);s.push({type:1,index:a,name:A[2],strings:b,ctor:A[1]==="."?Qr:A[1]==="?"?ea:A[1]==="@"?ta:Rt}),r.removeAttribute(h)}else h.startsWith(de)&&(s.push({type:6,index:a}),r.removeAttribute(h));if(ar.test(r.tagName)){const h=r.textContent.split(de),v=h.length-1;if(v>0){r.textContent=St?St.emptyScript:"";for(let b=0;b<v;b++)r.append(h[b],rt()),xe.nextNode(),s.push({type:2,index:++a});r.append(h[v],rt())}}}else if(r.nodeType===8)if(r.data===rr)s.push({type:2,index:a});else{let h=-1;for(;(h=r.data.indexOf(de,h+1))!==-1;)s.push({type:7,index:a}),h+=de.length-1}a++}}static createElement(e,t){const o=Oe.createElement("template");return o.innerHTML=e,o}};function je(i,e,t=i,o){if(e===K)return e;let r=o!==void 0?t._$Co?.[o]:t._$Cl;const a=at(e)?void 0:e._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),a===void 0?r=void 0:(r=new a(i),r._$AT(i,t,o)),o!==void 0?(t._$Co??=[])[o]=r:t._$Cl=r),r!==void 0&&(e=je(i,r._$AS(i,e.values),r,o)),e}let Xr=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,r=(e?.creationScope??Oe).importNode(t,!0);xe.currentNode=r;let a=xe.nextNode(),n=0,l=0,s=o[0];for(;s!==void 0;){if(n===s.index){let p;s.type===2?p=new Dt(a,a.nextSibling,this,e):s.type===1?p=new s.ctor(a,s.name,s.strings,this,e):s.type===6&&(p=new ia(a,this,e)),this._$AV.push(p),s=o[++l]}n!==s?.index&&(a=xe.nextNode(),n++)}return xe.currentNode=Oe,r}p(e){let t=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}},Dt=class dr{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,r){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=je(this,e,t),at(e)?e===y||e==null||e===""?(this._$AH!==y&&this._$AR(),this._$AH=y):e!==this._$AH&&e!==K&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Jr(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==y&&at(this._$AH)?this._$AA.nextSibling.data=e:this.T(Oe.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,r=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ci.createElement(sr(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===r)this._$AH.p(t);else{const a=new Xr(r,this),n=a.u(this.options);a.p(t),this.T(n),this._$AH=a}}_$AC(e){let t=so.get(e.strings);return t===void 0&&so.set(e.strings,t=new ci(e)),t}k(e){zi(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,r=0;for(const a of e)r===t.length?t.push(o=new dr(this.O(rt()),this.O(rt()),this,this.options)):o=t[r],o._$AI(a),r++;r<t.length&&(this._$AR(o&&o._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Rt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,r,a){this.type=1,this._$AH=y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=y}_$AI(e,t=this,o,r){const a=this.strings;let n=!1;if(a===void 0)e=je(this,e,t,0),n=!at(e)||e!==this._$AH&&e!==K,n&&(this._$AH=e);else{const l=e;let s,p;for(e=a[0],s=0;s<a.length-1;s++)p=je(this,l[o+s],t,s),p===K&&(p=this._$AH[s]),n||=!at(p)||p!==this._$AH[s],p===y?e=y:e!==y&&(e+=(p??"")+a[s+1]),this._$AH[s]=p}n&&!r&&this.j(e)}j(e){e===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Qr=class extends Rt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===y?void 0:e}},ea=class extends Rt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==y)}},ta=class extends Rt{constructor(e,t,o,r,a){super(e,t,o,r,a),this.type=5}_$AI(e,t=this){if((e=je(this,e,t,0)??y)===K)return;const o=this._$AH,r=e===y&&o!==y||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,a=e!==y&&(o===y||r);r&&this.element.removeEventListener(this.name,this,o),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ia=class{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){je(this,e)}};const oa={I:Dt},ra=Vi.litHtmlPolyfillSupport;ra?.(ci,Dt),(Vi.litHtmlVersions??=[]).push("3.3.1");const cr=(i,e,t)=>{const o=t?.renderBefore??e;let r=o._$litPart$;if(r===void 0){const a=t?.renderBefore??null;o._$litPart$=r=new Dt(e.insertBefore(rt(),a),a,void 0,t??{})}return r._$AI(i),r};const Di=globalThis;let x=class extends De{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=cr(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}};x._$litElement$=!0,x.finalized=!0,Di.litElementHydrateSupport?.({LitElement:x});const aa=Di.litElementPolyfillSupport;aa?.({LitElement:x});(Di.litElementVersions??=[]).push("4.2.1");const C=i=>(e,t)=>{t!==void 0?t.addInitializer((()=>{customElements.define(i,e)})):customElements.define(i,e)};const na={attribute:!0,type:String,converter:_t,reflect:!1,hasChanged:Bi},sa=(i=na,e,t)=>{const{kind:o,metadata:r}=t;let a=globalThis.litPropertyMetadata.get(r);if(a===void 0&&globalThis.litPropertyMetadata.set(r,a=new Map),o==="setter"&&((i=Object.create(i)).wrapped=!0),a.set(t.name,i),o==="accessor"){const{name:n}=t;return{set(l){const s=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,s,i)},init(l){return l!==void 0&&this.C(n,void 0,i,l),l}}}if(o==="setter"){const{name:n}=t;return function(l){const s=this[n];e.call(this,l),this.requestUpdate(n,s,i)}}throw Error("Unsupported decorator location: "+o)};function u(i){return(e,t)=>typeof t=="object"?sa(i,e,t):((o,r,a)=>{const n=r.hasOwnProperty(a);return r.constructor.createProperty(a,o),n?Object.getOwnPropertyDescriptor(r,a):void 0})(i,e,t)}function w(i){return u({...i,state:!0,attribute:!1})}const hr=(i,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(i,e,t),t);function S(i,e){return(t,o,r)=>{const a=n=>n.renderRoot?.querySelector(i)??null;return hr(t,o,{get(){return a(this)}})}}let la;function Ri(i){return(e,t)=>hr(e,t,{get(){return(this.renderRoot??(la??=document.createDocumentFragment())).querySelectorAll(i)}})}function $e(i,e,t){return i?e(i):t?.(i)}const _e=i=>i??y,da="modulepreload",ca=function(i,e){return new URL(i,e).href},lo={},bt=function(e,t,o){let r=Promise.resolve();if(t&&t.length>0){let p=function(g){return Promise.all(g.map(h=>Promise.resolve(h).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};const n=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),s=l?.nonce||l?.getAttribute("nonce");r=p(t.map(g=>{if(g=ca(g,o),g in lo)return;lo[g]=!0;const h=g.endsWith(".css"),v=h?'[rel="stylesheet"]':"";if(o)for(let A=n.length-1;A>=0;A--){const k=n[A];if(k.href===g&&(!h||k.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${g}"]${v}`))return;const b=document.createElement("link");if(b.rel=h?"stylesheet":da,h||(b.as="script"),b.crossOrigin="",b.href=g,s&&b.setAttribute("nonce",s),document.head.appendChild(b),h)return new Promise((A,k)=>{b.addEventListener("load",A),b.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${g}`)))})}))}function a(n){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=n,window.dispatchEvent(l),!l.defaultPrevented)throw n}return r.then(n=>{for(const l of n||[])l.status==="rejected"&&a(l.reason);return e().catch(a)})};const re={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},gt=i=>(...e)=>({_$litDirective$:i,values:e});let mt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};let hi=class extends mt{constructor(e){if(super(e),this.it=y,e.type!==re.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===y||e==null)return this._t=void 0,this.it=e;if(e===K)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};hi.directiveName="unsafeHTML",hi.resultType=1;const pi=gt(hi),ha=_`
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
`;var pa=Object.defineProperty,ua=Object.getOwnPropertyDescriptor,Lt=(i,e,t,o)=>{for(var r=o>1?void 0:o?ua(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&pa(e,t,r),r};let nt=class extends x{constructor(){super(...arguments),this.code="",this.language="auto",this.highlightedCode=""}willUpdate(i){(i.has("code")||i.has("language"))&&this.highlightCode()}render(){return d`
      <pre><code class="hljs">${pi(this.highlightedCode)}</code></pre>
    `}async highlightCode(){const e=(await bt(()=>import("./index-BBc-AmEf.js"),[],import.meta.url)).default,t=this.code.trim();let o;this.language==="auto"?o=e.highlightAuto(t).value:o=e.highlight(t,{language:this.language}).value,this.highlightedCode=o}static get styles(){return[ha]}};Lt([u({type:String})],nt.prototype,"code",2);Lt([u({type:String})],nt.prototype,"language",2);Lt([w()],nt.prototype,"highlightedCode",2);nt=Lt([C("syntax-highlighter")],nt);const z=_`
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
    --default-button-padding: 0 1.875rem; /* 0 30px with 16px root font size */
    --default-button-height: 2.25rem; /* 36px with 16px root font size */
    --default-button-width: fit-content;
    --default-button-border-width: 1px;
    --default-button-border-radius: 0.25rem; /* 4px with 16px root font size */
    --default-font-size-standard: 0.875rem; /* 14px with 16px root font size */
    --default-font-size-lg: 2.25rem; /* 36px with 16px root font size */

    /* Colors */
    --true-white: #fff;
    --off-white: #fbfbfd;
    --dark-gray: #2c2c2c;
    --mid-gray: #333;
    --light-gray: #666;
    --lighter-gray: #999;
    --lightest-gray: #c5d1df;
    --classic-red: #e51c23;
    --brick: #d43f3a;
    --coral: #d9534f;
    --dark-cantaloupe: #ec7939;
    --cantaloupe: #ee8950;
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
    --button-padding: var(
      --ia-theme-button-padding,
      var(--default-button-padding)
    );
    --button-height: var(
      --ia-theme-button-height,
      var(--default-button-height)
    );
    --button-width: var(--ia-theme-button-width, var(--default-button-width));
    --button-border-width: var(
      --ia-theme-button-border-width,
      var(--default-button-border-width)
    );
    --button-border-radius: var(
      --ia-theme-button-border-radius,
      var(--default-button-border-radius)
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
    /* Primary */
    --primary-cta-fill: var(--ia-theme-primary-cta-fill, var(--navy-blue));
    --primary-cta-text-color: var(
      --ia-theme-primary-cta-text-color,
      var(--true-white)
    );
    --primary-cta-border: var(
      --ia-theme-primary-cta-border,
      var(--lightest-gray)
    );

    /* Secondary */
    --secondary-cta-text-color: var(
      --ia-theme-secondary-cta-text-color,
      var(--true-white)
    );
    --secondary-cta-fill: var(--ia-theme-secondary-cta-fill, var(--mid-gray));
    --secondary-cta-border: var(
      --ia-theme-secondary-cta-border,
      var(--lighter-gray)
    );

    /* Danger */
    --danger-cta-text-color: var(
      --ia-theme-danger-cta-text-color,
      var(--true-white)
    );
    --danger-cta-fill: var(--ia-theme-danger-cta-fill, var(--coral));
    --danger-cta-border: var(--ia-theme-danger-cta-border, var(--brick));

    /* Warning */
    --warning-cta-text-color: var(
      --ia-theme-warning-cta-text-color,
      var(--true-white)
    );
    --warning-cta-fill: var(--ia-theme-warning-cta-fill, var(--cantaloupe));
    --warning-cta-border: var(
      --ia-theme-warning-cta-border,
      var(--dark-cantaloupe)
    );

    /* Disabled */
    --disabled-cta-text-color: var(
      --ia-theme-disabled-cta-text-color,
      var(--true-white)
    );
    --disabled-cta-fill: var(--ia-theme-disabled-cta-fill, var(--light-gray));
    --disabled-cta-border: var(
      --ia-theme-disabled-cta-border,
      var(--lighter-gray)
    );

    /* Standalone colors */
    --color-success: var(--ia-theme-color-success, var(--mint-green));
    --color-danger: var(--ia-theme-color-danger, var(--classic-red));
  }
`,ga="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='36pt'%20height='36pt'%20viewBox='0%200%2036%2036'%20version='1.1'%3e%3cg%20id='surface35'%3e%3cpath%20style='%20stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;'%20d='M%2013.5%206.1875%20C%2012.878906%206.1875%2012.375%206.691406%2012.375%207.3125%20C%2012.375%207.933594%2012.878906%208.4375%2013.5%208.4375%20L%2014.0625%208.4375%20L%2014.0625%2013.523438%20C%2014.0625%2014.453125%2013.78125%2015.34375%2013.246094%2016.105469%20L%206.84375%2025.238281%20C%206.140625%2026.238281%206.054688%2027.535156%206.621094%2028.617188%20C%207.183594%2029.703125%208.292969%2030.375%209.515625%2030.375%20L%2026.484375%2030.375%20C%2027.707031%2030.375%2028.816406%2029.703125%2029.378906%2028.617188%20C%2029.941406%2027.535156%2029.859375%2026.238281%2029.15625%2025.238281%20L%2022.753906%2016.105469%20C%2022.21875%2015.34375%2021.9375%2014.453125%2021.9375%2013.523438%20L%2021.9375%208.4375%20L%2022.5%208.4375%20C%2023.121094%208.4375%2023.625%207.933594%2023.625%207.3125%20C%2023.625%206.691406%2023.121094%206.1875%2022.5%206.1875%20Z%20M%2016.3125%208.4375%20L%2019.6875%208.4375%20L%2019.6875%2013.523438%20C%2019.6875%2014.914062%2020.109375%2016.257812%2020.910156%2017.398438%20L%2020.941406%2017.4375%20L%2015.0625%2017.4375%20L%2015.089844%2017.398438%20C%2015.890625%2016.257812%2016.3125%2014.914062%2016.3125%2013.523438%20Z%20M%2015.1875%2020.8125%20C%2015.808594%2020.8125%2016.3125%2021.316406%2016.3125%2021.9375%20C%2016.3125%2022.558594%2015.808594%2023.0625%2015.1875%2023.0625%20C%2014.566406%2023.0625%2014.0625%2022.558594%2014.0625%2021.9375%20C%2014.0625%2021.316406%2014.566406%2020.8125%2015.1875%2020.8125%20Z%20M%2020.53125%2023.0625%20C%2021.617188%2023.0625%2022.5%2023.945312%2022.5%2025.03125%20C%2022.5%2026.117188%2021.617188%2027%2020.53125%2027%20C%2019.445312%2027%2018.5625%2026.117188%2018.5625%2025.03125%20C%2018.5625%2023.945312%2019.445312%2023.0625%2020.53125%2023.0625%20Z%20M%2020.53125%2023.0625%20'/%3e%3c/g%3e%3c/svg%3e";function ui(i){return i.toLowerCase().split(" ").join("-")}var ma=Object.defineProperty,fa=Object.getOwnPropertyDescriptor,Li=(i,e,t,o)=>{for(var r=o>1?void 0:o?fa(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&ma(e,t,r),r};let Ct=class extends x{render(){return this.styleInputData?d`
      <div class="settings-options">
        <table>
          ${this.styleInputData.settings.map(i=>this.renderStyleRow(i))}
        </table>
        <button @click=${this.applyStyles}>Apply</button>
      </div>
    `:y}renderStyleRow(i){const e=ui(i.label),t=i.inputType==="number"||i.inputType==="range";return d`
      <tr>
        <td>
          <label for=${e}>${i.label}</label>
        </td>
        <td class="style-input-cell">
          <input
            id=${e}
            class="style-input"
            type=${i.inputType??"text"}
            min=${_e(t?i.min:void 0)}
            max=${_e(t?i.max:void 0)}
            step=${_e(t?i.step:void 0)}
            value=${i.defaultValue}
            data-variable=${i.cssVariable}
            data-unit=${_e(i.unit)}
            @input=${i.inputType==="range"?this.updateRangeReadout:void 0}
          />
          ${i.inputType==="range"?d`<output class="style-readout" for=${e}
                >${i.defaultValue}${i.unit??""}</output
              >`:y}
        </td>
      </tr>
    `}updateRangeReadout(i){const e=i.currentTarget,t=this.renderRoot.querySelector(`output[for="${CSS.escape(e.id)}"]`);if(!t)return;const o=e.dataset.unit??"";t.textContent=`${e.value}${o}`}applyStyles(){const i=[];this.styleInputs?.forEach(e=>{if(!e.dataset.variable||!e.value)return;const t=e.dataset.unit??"";i.push(`${e.dataset.variable}: ${e.value}${t};`)}),this.dispatchEvent(new CustomEvent("stylesApplied",{detail:{styles:i.join(`
 `)}}))}static get styles(){return[z,_`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }

        .style-input-cell {
          display: flex;
          align-items: center;
        }

        .style-readout {
          min-width: 3.5em;
          text-align: right;
        }

        input[type='range'] {
          margin: 5px;
        }
      `]}};Li([u({type:Object})],Ct.prototype,"styleInputData",2);Li([Ri(".style-input")],Ct.prototype,"styleInputs",2);Ct=Li([C("story-styles-settings")],Ct);const pr=(i,e,t)=>{for(const o of e)if(o[0]===i)return(0,o[1])();return t?.()};var va=Object.defineProperty,ba=Object.getOwnPropertyDescriptor,Ni=(i,e,t,o)=>{for(var r=o>1?void 0:o?ba(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&va(e,t,r),r};let At=class extends x{render(){return this.propInputData?d`
      <div class="settings-options">
        <table>
          ${this.propInputData.settings.map(i=>pr(i.inputType,[["radio",()=>this.createRadioPropInput(i)]],()=>this.createDefaultPropInput(i))??y)}
        </table>
        <button @click=${this.applyProps}>Apply</button>
      </div>
    `:y}createDefaultPropInput(i){const e=ui(i.label);return d`
      <tr>
        <td><label for=${e}>${i.label}</label></td>
        <td>
          <input
            class="prop-input"
            type=${i.inputType??"text"}
            id=${e}
            data-prop=${i.propertyName}
            data-format=${typeof i.defaultValue}
            placeholder=${i.defaultValue}
          />
        </td>
      </tr>
    `}createRadioPropInput(i){if(i.inputType!=="radio"||!i.radioOptions)return y;const e=ui(i.label);return d`
      <tr>
        <td><legend>${i.label}</legend></td>
        <td>
          ${i.radioOptions.map(t=>d`<input
                  type="radio"
                  class="prop-input"
                  name=${e}
                  id="${e}-${t}"
                  value=${t}
                  data-prop=${i.propertyName}
                  data-format=${typeof i.defaultValue}
                  ?checked=${i.defaultValue===t}
                /><label for="${e}-${t}"> ${t} </label>`)}
        </td>
      </tr>
    `}applyProps(){const i=[],e=[];this.propInputs?.forEach(t=>{if(!t.dataset.prop||!t.value||t.type==="radio"&&!t.checked)return;const o=t.dataset.prop;let r=t.value;switch(t.dataset.format){case"number":r=parseInt(r);break;case"boolean":r==="true"&&(r=!0),r==="false"&&(r=!1);break}const a=typeof r=="string"?`'${r}'`:r.toString();i.push(`.${o}=\${${a}}`),e.push({propName:o,value:r})}),this.dispatchEvent(new CustomEvent("propsApplied",{detail:{stringifiedProps:i.join(`
  `),appliedProps:e}}))}static get styles(){return[z,_`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }
      `]}};Ni([u({type:Object})],At.prototype,"propInputData",2);Ni([Ri(".prop-input")],At.prototype,"propInputs",2);At=Ni([C("story-props-settings")],At);var ya=Object.defineProperty,wa=Object.getOwnPropertyDescriptor,L=(i,e,t,o)=>{for(var r=o>1?void 0:o?wa(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&ya(e,t,r),r};let R=class extends x{constructor(){super(...arguments),this.elementTag="",this.elementClassName="",this.labs=!1,this.detailsVisible=!1,this.shouldShowPropertySettings=!1,this.shouldShowUsageNotes=!1,this.copiedKey=null}render(){return d`
      <div id="container">
        <h2>
          <code>&lt;${this.elementTag}&gt;</code>
          ${$e(this.labs,()=>d`<img
                src=${ga}
                alt="Labs icon"
                title="Labs"
                class="labs-icon"
              />`)}
        </h2>
        <h3>Demo</h3>
        <div class="slot-container" style=${_e(this.stringifiedStyles)}>
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
    `}get detailsTemplate(){return d`
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
      ${$e(this.cssCode,()=>d`
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
          ${$e(!!this.propInputData,()=>d`
              <story-props-settings
                .propInputData=${this.propInputData}
                @propsApplied=${this.handlePropsApplied}
              ></story-props-settings>
            `)}
          ${$e(!this.propInputData&&!this.shouldShowPropertySettings,()=>d`<p class="section-placeholder">No settings to adjust</p>`)}
          <div
            class="slot-container ${this.shouldShowPropertySettings?"":"hidden"}"
            @slotchange=${this.handleSettingsSlotChange}
          >
            <slot name="settings"></slot>
          </div>
        </div>
        <div class="right-col">
          <h3>Styles</h3>
          ${$e(!!this.styleInputData,()=>d`
              <story-styles-settings
                .styleInputData=${this.styleInputData}
                @stylesApplied=${this.handleStylesApplied}
              ></story-styles-settings>
            `,()=>d`<p class="section-placeholder">No styles to adjust</p>`)}
        </div>
      </div>
      ${$e(this.shouldShowUsageNotes,()=>d` <h3>Usage Notes</h3>`)}
      <div class="slot-container">
        <slot
          name="usage-notes"
          @slotchange=${this.handleUsageNotesSlotChange}
        ></slot>
      </div>
    `}async copyToClipboard(i,e){try{await navigator.clipboard.writeText(i),this.copiedKey=e,clearTimeout(this._copyTimeout),this._copyTimeout=setTimeout(()=>this.copiedKey=null,2e3)}catch(t){console.warn("Clipboard write failed:",t)}}get importCode(){return this.elementClassName?`import '${this.modulePath}';
import { ${this.elementClassName} } from '${this.modulePath}';`:`import '${this.modulePath}';`}get exampleUsage(){const i=this.defaultUsageProps?"  "+this.defaultUsageProps+`
`:"",e=this.stringifiedProps?"  "+this.stringifiedProps+`
`:"",t=!!i||!!e,o=this.defaultSlottedContent&&t?`
 `+this.defaultSlottedContent+`
`:this.defaultSlottedContent;return`<${this.elementTag}${t?`
`:""}${i}${e}>${o??""}</${this.elementTag}>`}get cssCode(){return this.stringifiedStyles?`${this.elementTag} {
 ${this.stringifiedStyles}
}`:""}get modulePath(){return this.labs?`@internetarchive/elements/labs/${this.elementTag}/${this.elementTag}`:`@internetarchive/elements/${this.elementTag}/${this.elementTag}`}handleSettingsSlotChange(i){const e=i.target.assignedElements();this.shouldShowPropertySettings=e.length>0}handleUsageNotesSlotChange(i){const e=i.target.assignedElements();this.shouldShowUsageNotes=e.length>0}handleDemoComponentSlotted(i){const e=i.target.assignedElements()[0];e&&(this.slottedDemoComponent=e)}handleStylesApplied(i){const e=i.detail.styles;e&&(this.stringifiedStyles=e)}handlePropsApplied(i){const e=i.detail.stringifiedProps,t=i.detail.appliedProps;!e||!t||(this.stringifiedProps=e,t.forEach(o=>{this.slottedDemoComponent[o.propName]=o.value}))}static get styles(){return[z,_`
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
      `]}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._copyTimeout)}};L([u({type:String})],R.prototype,"elementTag",2);L([u({type:String})],R.prototype,"elementClassName",2);L([u({type:String})],R.prototype,"customExampleUsage",2);L([u({type:String})],R.prototype,"defaultUsageProps",2);L([u({type:String})],R.prototype,"defaultSlottedContent",2);L([u({type:Object})],R.prototype,"styleInputData",2);L([u({type:Object})],R.prototype,"propInputData",2);L([u({type:Boolean})],R.prototype,"labs",2);L([w()],R.prototype,"detailsVisible",2);L([w()],R.prototype,"stringifiedStyles",2);L([w()],R.prototype,"stringifiedProps",2);L([w()],R.prototype,"shouldShowPropertySettings",2);L([w()],R.prototype,"shouldShowUsageNotes",2);L([w()],R.prototype,"slottedDemoComponent",2);L([w()],R.prototype,"copiedKey",2);R=L([C("story-template")],R);const $a=i=>typeof i!="string"&&"strTag"in i,xa=(i,e,t)=>{let o=i[0];for(let r=1;r<i.length;r++)o+=e[r-1],o+=i[r];return o};const _a=(i=>$a(i)?xa(i.strings,i.values):i);let U=_a;class Sa{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}for(let i=0;i<256;i++)(i>>4&15).toString(16)+(i&15).toString(16);let Ca=new Sa;Ca.resolve();var Aa=Object.defineProperty,Oa=Object.getOwnPropertyDescriptor,Ge=(i,e,t,o)=>{for(var r=o>1?void 0:o?Oa(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Aa(e,t,r),r};let Te=class extends x{constructor(){super(...arguments),this.loadingTitle=U("Loading..."),this.successTitle=U("Success"),this.errorTitle=U("Error"),this.loadingStyle="ring-dots",this.mode="loading"}render(){return d`${pr(this.mode,[["ready",()=>this.placeholderTemplate],["loading",()=>this.loadingIndicatorTemplate],["success",()=>this.successIndicatorTemplate],["error",()=>this.errorIndicatorTemplate]])}`}get placeholderTemplate(){return d`<div class="placeholder"></div>`}get loadingIndicatorTemplate(){return d`
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
    `}get successIndicatorTemplate(){return d`
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
    `}get errorIndicatorTemplate(){return d`
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
    `}get shouldShowLoadingDots(){return this.loadingStyle!=="ring"}static get styles(){return[z,_`
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
      `]}};Ge([u({type:String})],Te.prototype,"loadingTitle",2);Ge([u({type:String})],Te.prototype,"successTitle",2);Ge([u({type:String})],Te.prototype,"errorTitle",2);Ge([u({type:String})],Te.prototype,"loadingStyle",2);Ge([u({type:String})],Te.prototype,"mode",2);Te=Ge([C("ia-status-indicator")],Te);var Ta=Object.defineProperty,Ea=Object.getOwnPropertyDescriptor,ge=(i,e,t,o)=>{for(var r=o>1?void 0:o?Ea(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Ta(e,t,r),r};let X=class extends x{constructor(){super(...arguments),this.mode="primary",this.loading=!1,this.disabled=!1,this.loadingText="",this.type="button",this.openLinksNewTab=!1}render(){return d`
      ${this.href?d`<a
            href=${this.href}
            target=${this.openLinksNewTab?"_blank":"_self"}
            >${this.buttonTemplate}</a
          >`:this.buttonTemplate}
      <slot name="hidden-button"></slot>
    `}willUpdate(i){i.has("type")&&this.setButtonTypeEmulation()}get buttonTemplate(){return d`
      <button
        part="button"
        class=${this.mode}
        ?disabled=${this.disabled||this.loading}
      >
        ${this.buttonTextTemplate}
      </button>
    `}get buttonTextTemplate(){return this.loading?this.loadingStateTemplate:d`<slot></slot>`}get loadingStateTemplate(){return d`
      <span class="loading-indicator" alt="Loading indicator">
        <ia-status-indicator mode="loading"></ia-status-indicator> ${U(this.loadingText)}
      </span>
    `}setButtonTypeEmulation(){const i=this.querySelector("input.hidden-button");if(i){i.type=this.type;return}this.addHiddenButton(),this.addEventListener("click",this.handleComponentClick)}handleComponentClick(i){if(this.type==="button"||i instanceof CustomEvent&&i.detail.formActionsInProgress)return;this.querySelector("input.hidden-button").dispatchEvent(new PointerEvent("click"))}addHiddenButton(){this.type!=="button"&&cr(d`<input
        type=${this.type}
        class="hidden-button"
        style="display:none"
        slot="hidden-button"
        @click=${i=>this.handleFormActions(i)}
      />`,this)}handleFormActions(i){i.stopPropagation(),i.isTrusted&&this.dispatchEvent(new CustomEvent("click",{detail:{formActionsInProgress:!0}}))}static get styles(){return[z,_`
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

        button.custom:enabled:is(:hover, :focus, :active) {
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
      `]}};ge([u({type:String})],X.prototype,"mode",2);ge([u({type:Boolean})],X.prototype,"loading",2);ge([u({type:Boolean})],X.prototype,"disabled",2);ge([u({type:String})],X.prototype,"loadingText",2);ge([u({type:String,reflect:!0})],X.prototype,"type",2);ge([u({type:String})],X.prototype,"href",2);ge([u({type:Boolean})],X.prototype,"openLinksNewTab",2);X=ge([C("ia-button")],X);const co=Object.freeze(Object.defineProperty({__proto__:null,get IAButton(){return X}},Symbol.toStringTag,{value:"Module"}));var ka=Object.getOwnPropertyDescriptor,Pa=(i,e,t,o)=>{for(var r=o>1?void 0:o?ka(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=n(r)||r);return r};const Ma=[{label:"Mode",propertyName:"mode",defaultValue:"primary",inputType:"radio",radioOptions:["primary","secondary","danger","warning","disabled","transparent","custom","link","danger-link"]},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Loading",propertyName:"loading",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Loading text",propertyName:"loadingText",defaultValue:"",inputType:"text"},{label:"Type",propertyName:"type",defaultValue:"button",inputType:"radio",radioOptions:["button","submit","reset"]},{label:"Link to attach to button",propertyName:"href",defaultValue:"",inputType:"text"},{label:"Open link in new tab",propertyName:"openLinksNewTab",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}],Ia=[{label:"Button padding",cssVariable:"--ia-theme-button-padding",defaultValue:"0 1.875rem",inputType:"text"},{label:"Button width",cssVariable:"--ia-theme-button-width",defaultValue:"fit-content",inputType:"text"},{label:"Button height",cssVariable:"--ia-theme-button-height",defaultValue:"2.25rem",inputType:"text"},{label:"Button border width",cssVariable:"--ia-theme-button-border-width",defaultValue:"1px",inputType:"text"},{label:"Font",cssVariable:"--ia-theme-base-font-family",defaultValue:"'Helvetica Neue', Helvetica, Arial, sans-serif",inputType:"text"},{label:"Transition",cssVariable:"--ia-button-transition",defaultValue:"all 0.1s ease 0s",inputType:"text"},{label:"Text color (primary)",cssVariable:"--ia-theme-primary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (primary)",cssVariable:"--ia-theme-primary-cta-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (primary)",cssVariable:"--ia-theme-primary-cta-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Text color (secondary)",cssVariable:"--ia-theme-secondary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (secondary)",cssVariable:"--ia-theme-secondary-cta-fill",defaultValue:"#333333",inputType:"color"},{label:"Border color (secondary)",cssVariable:"--ia-theme-secondary-cta-border",defaultValue:"#666666",inputType:"color"},{label:"Text color (danger)",cssVariable:"--ia-theme-danger-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (danger)",cssVariable:"--ia-theme-danger-cta-fill",defaultValue:"#d9534f",inputType:"color"},{label:"Border color (danger)",cssVariable:"--ia-theme-danger-cta-border",defaultValue:"#d43f3a",inputType:"color"},{label:"Text color (warning)",cssVariable:"--ia-theme-warning-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (warning)",cssVariable:"--ia-theme-warning-cta-fill",defaultValue:"#ee8950",inputType:"color"},{label:"Border color (warning)",cssVariable:"--ia-theme-warning-cta-border",defaultValue:"#ec7939",inputType:"color"},{label:"Text color (disabled)",cssVariable:"--ia-theme-disabled-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (disabled)",cssVariable:"--ia-theme-disabled-cta-fill",defaultValue:"#666666",inputType:"color"},{label:"Border color (disabled)",cssVariable:"--ia-theme-disabled-cta-border",defaultValue:"#999999",inputType:"color"},{label:"Text color (custom)",cssVariable:"--ia-button-custom-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (custom)",cssVariable:"--ia-button-custom-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (custom)",cssVariable:"--ia-button-custom-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Text color (custom, on hover)",cssVariable:"--ia-button-custom-active-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (custom, on hover)",cssVariable:"--ia-button-custom-active-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (custom, on hover)",cssVariable:"--ia-button-custom-active-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Link color",cssVariable:"--ia-theme-link-color",defaultValue:"#4b64ff",inputType:"color"},{label:"Danger color",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}];let gi=class extends x{render(){return d`
      <story-template
        elementTag="ia-button"
        elementClassName="IAButton"
        .defaultUsageProps=${"@click=${() => alert('Button clicked!')}"}
        .defaultSlottedContent=${"Click Me"}
        .styleInputData=${{settings:Ia}}
        .propInputData=${{settings:Ma}}
      >
        <ia-button slot="demo" @click=${()=>alert("Button clicked!")}>
          Click Me
        </ia-button>
      </story-template>
    `}};gi=Pa([C("ia-button-story")],gi);const Ba=Object.freeze(Object.defineProperty({__proto__:null,get IAButtonStory(){return gi}},Symbol.toStringTag,{value:"Module"})),ur=JSON.parse(`[{"name":"Afghanistan","flag":"🇦🇫"},{"name":"Albania","flag":"🇦🇱"},{"name":"Algeria","flag":"🇩🇿"},{"name":"Andorra","flag":"🇦🇩"},{"name":"Angola","flag":"🇦🇴"},{"name":"Antigua and Barbuda","flag":"🇦🇬"},{"name":"Argentina","flag":"🇦🇷"},{"name":"Armenia","flag":"🇦🇲"},{"name":"Aruba","flag":"🇦🇼"},{"name":"Australia","flag":"🇦🇺"},{"name":"Austria","flag":"🇦🇹"},{"name":"Azerbaijan","flag":"🇦🇿"},{"name":"Bahamas","flag":"🇧🇸"},{"name":"Bahrain","flag":"🇧🇭"},{"name":"Bangladesh","flag":"🇧🇩"},{"name":"Barbados","flag":"🇧🇧"},{"name":"Belarus","flag":"🇧🇾"},{"name":"Belgium","flag":"🇧🇪"},{"name":"Belize","flag":"🇧🇿"},{"name":"Benin","flag":"🇧🇯"},{"name":"Bhutan","flag":"🇧🇹"},{"name":"Bolivia","flag":"🇧🇴"},{"name":"Bosnia and Herzegovina","flag":"🇧🇦"},{"name":"Botswana","flag":"🇧🇼"},{"name":"Brazil","flag":"🇧🇷"},{"name":"Brunei","flag":"🇧🇳"},{"name":"Bulgaria","flag":"🇧🇬"},{"name":"Burkina Faso","flag":"🇧🇫"},{"name":"Burundi","flag":"🇧🇮"},{"name":"Cabo Verde","flag":"🇨🇻"},{"name":"Cambodia","flag":"🇰🇭"},{"name":"Cameroon","flag":"🇨🇲"},{"name":"Canada","flag":"🇨🇦"},{"name":"Central African Republic","flag":"🇨🇫"},{"name":"Chad","flag":"🇹🇩"},{"name":"Chile","flag":"🇨🇱"},{"name":"China","flag":"🇨🇳"},{"name":"Colombia","flag":"🇨🇴"},{"name":"Comoros","flag":"🇰🇲"},{"name":"Cook Islands","flag":"🇨🇰"},{"name":"Costa Rica","flag":"🇨🇷"},{"name":"Côte d'Ivoire","flag":"🇨🇮"},{"name":"Croatia","flag":"🇭🇷"},{"name":"Cuba","flag":"🇨🇺"},{"name":"Cyprus","flag":"🇨🇾"},{"name":"Czechia","flag":"🇨🇿"},{"name":"Democratic Republic of the Congo","flag":"🇨🇩"},{"name":"Denmark","flag":"🇩🇰"},{"name":"Djibouti","flag":"🇩🇯"},{"name":"Dominica","flag":"🇩🇲"},{"name":"Dominican Republic","flag":"🇩🇴"},{"name":"Ecuador","flag":"🇪🇨"},{"name":"Egypt","flag":"🇪🇬"},{"name":"El Salvador","flag":"🇸🇻"},{"name":"Equatorial Guinea","flag":"🇬🇶"},{"name":"Eritrea","flag":"🇪🇷"},{"name":"Estonia","flag":"🇪🇪"},{"name":"Eswatini","flag":"🇸🇿"},{"name":"Ethiopia","flag":"🇪🇹"},{"name":"Fiji","flag":"🇫🇯"},{"name":"Finland","flag":"🇫🇮"},{"name":"France","flag":"🇫🇷"},{"name":"Gabon","flag":"🇬🇦"},{"name":"Gambia","flag":"🇬🇲"},{"name":"Georgia","flag":"🇬🇪"},{"name":"Germany","flag":"🇩🇪"},{"name":"Ghana","flag":"🇬🇭"},{"name":"Greece","flag":"🇬🇷"},{"name":"Grenada","flag":"🇬🇩"},{"name":"Guatemala","flag":"🇬🇹"},{"name":"Guinea","flag":"🇬🇳"},{"name":"Guinea-Bissau","flag":"🇬🇼"},{"name":"Guyana","flag":"🇬🇾"},{"name":"Haiti","flag":"🇭🇹"},{"name":"Honduras","flag":"🇭🇳"},{"name":"Hungary","flag":"🇭🇺"},{"name":"Iceland","flag":"🇮🇸"},{"name":"India","flag":"🇮🇳"},{"name":"Indonesia","flag":"🇮🇩"},{"name":"Iran","flag":"🇮🇷"},{"name":"Iraq","flag":"🇮🇶"},{"name":"Ireland","flag":"🇮🇪"},{"name":"Israel","flag":"🇮🇱"},{"name":"Italy","flag":"🇮🇹"},{"name":"Jamaica","flag":"🇯🇲"},{"name":"Japan","flag":"🇯🇵"},{"name":"Jordan","flag":"🇯🇴"},{"name":"Kazakhstan","flag":"🇰🇿"},{"name":"Kenya","flag":"🇰🇪"},{"name":"Kiribati","flag":"🇰🇮"},{"name":"Kosovo","flag":"🇽🇰"},{"name":"Kuwait","flag":"🇰🇼"},{"name":"Kyrgyzstan","flag":"🇰🇬"},{"name":"Laos","flag":"🇱🇦"},{"name":"Latvia","flag":"🇱🇻"},{"name":"Lebanon","flag":"🇱🇧"},{"name":"Lesotho","flag":"🇱🇸"},{"name":"Liberia","flag":"🇱🇷"},{"name":"Libya","flag":"🇱🇾"},{"name":"Liechtenstein","flag":"🇱🇮"},{"name":"Lithuania","flag":"🇱🇹"},{"name":"Luxembourg","flag":"🇱🇺"},{"name":"Madagascar","flag":"🇲🇬"},{"name":"Malawi","flag":"🇲🇼"},{"name":"Malaysia","flag":"🇲🇾"},{"name":"Maldives","flag":"🇲🇻"},{"name":"Mali","flag":"🇲🇱"},{"name":"Malta","flag":"🇲🇹"},{"name":"Marshall Islands","flag":"🇲🇭"},{"name":"Mauritania","flag":"🇲🇷"},{"name":"Mauritius","flag":"🇲🇺"},{"name":"Mexico","flag":"🇲🇽"},{"name":"Micronesia","flag":"🇫🇲"},{"name":"Moldova","flag":"🇲🇩"},{"name":"Monaco","flag":"🇲🇨"},{"name":"Mongolia","flag":"🇲🇳"},{"name":"Montenegro","flag":"🇲🇪"},{"name":"Morocco","flag":"🇲🇦"},{"name":"Mozambique","flag":"🇲🇿"},{"name":"Myanmar","flag":"🇲🇲"},{"name":"Namibia","flag":"🇳🇦"},{"name":"Nauru","flag":"🇳🇷"},{"name":"Nepal","flag":"🇳🇵"},{"name":"Netherlands","flag":"🇳🇱"},{"name":"New Zealand","flag":"🇳🇿"},{"name":"Nicaragua","flag":"🇳🇮"},{"name":"Niue","flag":"🇳🇺"},{"name":"Niger","flag":"🇳🇪"},{"name":"Nigeria","flag":"🇳🇬"},{"name":"North Korea","flag":"🇰🇵"},{"name":"North Macedonia","flag":"🇲🇰"},{"name":"Norway","flag":"🇳🇴"},{"name":"Oman","flag":"🇴🇲"},{"name":"Pakistan","flag":"🇵🇰"},{"name":"Palau","flag":"🇵🇼"},{"name":"Palestine","flag":"🇵🇸"},{"name":"Panama","flag":"🇵🇦"},{"name":"Papua New Guinea","flag":"🇵🇬"},{"name":"Paraguay","flag":"🇵🇾"},{"name":"Peru","flag":"🇵🇪"},{"name":"Philippines","flag":"🇵🇭"},{"name":"Poland","flag":"🇵🇱"},{"name":"Portugal","flag":"🇵🇹"},{"name":"Qatar","flag":"🇶🇦"},{"name":"Republic of the Congo","flag":"🇨🇬"},{"name":"Romania","flag":"🇷🇴"},{"name":"Russia","flag":"🇷🇺"},{"name":"Rwanda","flag":"🇷🇼"},{"name":"Saint Kitts and Nevis","flag":"🇰🇳"},{"name":"Saint Lucia","flag":"🇱🇨"},{"name":"Saint Vincent and the Grenadines","flag":"🇻🇨"},{"name":"Samoa","flag":"🇼🇸"},{"name":"San Marino","flag":"🇸🇲"},{"name":"Sao Tome and Principe","flag":"🇸🇹"},{"name":"Saudi Arabia","flag":"🇸🇦"},{"name":"Senegal","flag":"🇸🇳"},{"name":"Serbia","flag":"🇷🇸"},{"name":"Seychelles","flag":"🇸🇨"},{"name":"Sierra Leone","flag":"🇸🇱"},{"name":"Singapore","flag":"🇸🇬"},{"name":"Slovakia","flag":"🇸🇰"},{"name":"Slovenia","flag":"🇸🇮"},{"name":"Solomon Islands","flag":"🇸🇧"},{"name":"Somalia","flag":"🇸🇴"},{"name":"South Africa","flag":"🇿🇦"},{"name":"South Korea","flag":"🇰🇷"},{"name":"South Sudan","flag":"🇸🇸"},{"name":"Spain","flag":"🇪🇸"},{"name":"Sri Lanka","flag":"🇱🇰"},{"name":"Sudan","flag":"🇸🇩"},{"name":"Suriname","flag":"🇸🇷"},{"name":"Sweden","flag":"🇸🇪"},{"name":"Switzerland","flag":"🇨🇭"},{"name":"Syria","flag":"🇸🇾"},{"name":"Taiwan","flag":"🇹🇼"},{"name":"Tajikistan","flag":"🇹🇯"},{"name":"Tanzania","flag":"🇹🇿"},{"name":"Thailand","flag":"🇹🇭"},{"name":"Timor-Leste","flag":"🇹🇱"},{"name":"Togo","flag":"🇹🇬"},{"name":"Tonga","flag":"🇹🇴"},{"name":"Trinidad and Tobago","flag":"🇹🇹"},{"name":"Tunisia","flag":"🇹🇳"},{"name":"Turkey","flag":"🇹🇷"},{"name":"Turkmenistan","flag":"🇹🇲"},{"name":"Tuvalu","flag":"🇹🇻"},{"name":"Uganda","flag":"🇺🇬"},{"name":"Ukraine","flag":"🇺🇦"},{"name":"United Arab Emirates","flag":"🇦🇪"},{"name":"United Kingdom","flag":"🇬🇧"},{"name":"United States","flag":"🇺🇸"},{"name":"Uruguay","flag":"🇺🇾"},{"name":"Uzbekistan","flag":"🇺🇿"},{"name":"Vanuatu","flag":"🇻🇺"},{"name":"Vatican City","flag":"🇻🇦"},{"name":"Venezuela","flag":"🇻🇪"},{"name":"Vietnam","flag":"🇻🇳"},{"name":"Yemen","flag":"🇾🇪"},{"name":"Zambia","flag":"🇿🇲"},{"name":"Zimbabwe","flag":"🇿🇼"}]`);const yt=gt(class extends mt{constructor(i){if(super(i),i.type!==re.ATTRIBUTE||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter((e=>i[e])).join(" ")+" "}update(i,[e]){if(this.st===void 0){this.st=new Set,i.strings!==void 0&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(const o in e)e[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(e)}const t=i.element.classList;for(const o of this.st)o in e||(t.remove(o),this.st.delete(o));for(const o in e){const r=!!e[o];r===this.st.has(o)||this.nt?.has(o)||(r?(t.add(o),this.st.add(o)):(t.remove(o),this.st.delete(o)))}return K}});const{I:Va}=oa,za=i=>i.strings===void 0,ho=()=>document.createComment(""),et=(i,e,t)=>{const o=i._$AA.parentNode,r=e===void 0?i._$AB:e._$AA;if(t===void 0){const a=o.insertBefore(ho(),r),n=o.insertBefore(ho(),r);t=new Va(a,n,i,i.options)}else{const a=t._$AB.nextSibling,n=t._$AM,l=n!==i;if(l){let s;t._$AQ?.(i),t._$AM=i,t._$AP!==void 0&&(s=i._$AU)!==n._$AU&&t._$AP(s)}if(a!==r||l){let s=t._$AA;for(;s!==a;){const p=s.nextSibling;o.insertBefore(s,r),s=p}}}return t},ve=(i,e,t=i)=>(i._$AI(e,t),i),Da={},gr=(i,e=Da)=>i._$AH=e,Ra=i=>i._$AH,Kt=i=>{i._$AR(),i._$AA.remove()};const La=gt(class extends mt{constructor(i){if(super(i),i.type!==re.PROPERTY&&i.type!==re.ATTRIBUTE&&i.type!==re.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!za(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[e]){if(e===K||e===y)return e;const t=i.element,o=i.name;if(i.type===re.PROPERTY){if(e===t[o])return K}else if(i.type===re.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(o))return K}else if(i.type===re.ATTRIBUTE&&t.getAttribute(o)===e+"")return K;return gr(i),e}});function Na(i,e){return e.some(t=>i.has(t))}function Ua(i,e){const t=[...i],o=[...e],r=t.length,a=o.length;if(r===0)return!0;let n=0,l=0;for(;l<a;){if(o[l]===t[n]&&(n+=1),n>=r)return!0;l+=1}return!1}const ja="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501%202.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131%202.7226499%201.81402515z'%20%3e%3c/path%3e%3c/svg%3e",Ha="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499%203.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501%202.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131%202.7226499-1.81402514z'%20%3e%3c/path%3e%3c/svg%3e",Fa="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m50%200c27.6142375%200%2050%2022.3857625%2050%2050s-22.3857625%2050-50%2050-50-22.3857625-50-50%2022.3857625-50%2050-50zm23.8159475%2026.1840525c-1.4033215-1.4033215-3.5816761-1.5592461-5.1572272-.4677738l-.5598841.4677738-18.0988362%2018.0989475-18.0988362-18.0989475-.5598841-.4677738c-1.5755511-1.0914723-3.7539057-.9355477-5.1572272.4677738-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113l18.0989475%2018.0988362-18.0989475%2018.0988362c-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113%201.4033215%201.4033215%203.5816761%201.5592461%205.1572272.4677738l.5598841-.4677738%2018.0988362-18.0989475%2018.0988362%2018.0989475.5598841.4677738c1.5755511%201.0914723%203.7539057.9355477%205.1572272-.4677738%201.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113l-18.0989475-18.0988362%2018.0989475-18.0988362c1.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113z'%20fill-rule='evenodd'%20%3e%3c/path%3e%3c/svg%3e";var qa=Object.defineProperty,Ka=Object.getOwnPropertyDescriptor,M=(i,e,t,o)=>{for(var r=o>1?void 0:o?Ka(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&qa(e,t,r),r};const Wa={all:()=>!0,prefix:(i,e)=>e.startsWith(i),suffix:(i,e)=>e.endsWith(i),substring:(i,e)=>e.includes(i),subsequence:Ua},Za="list",Ga="substring",Ja=i=>i,Ya=i=>i.toLocaleLowerCase();let T=class extends x{constructor(){super(),this.options=[],this.behavior=Za,this.maxAutocompleteEntries=Number.POSITIVE_INFINITY,this.filter=Ga,this.caseSensitive=!1,this.sort=!1,this.wrapArrowKeys=!1,this.stayOpen=!1,this.clearable=!1,this.open=!1,this.disabled=!1,this.required=!1,this.value=null,this.hasFocus=!1,this.highlightedOption=null,this.enteredText="",this.filterText="",this.losingFocus=!1,this.optionsByID=new Map,this.optionFilteringValues=new Map,this.optionsRespectingSortFlag=[],this.filteredOptions=[],this.internals=this.attachInternals()}render(){const i=yt({disabled:this.disabled,focused:this.hasFocus});return d`
      <div id="container" part="container">
        ${this.labelTemplate}
        <div id="main-widget-row" class=${i} part="combo-box">
          ${this.textInputTemplate}
          ${this.clearable?this.clearButtonTemplate:y}
          ${this.caretButtonTemplate}
        </div>
        ${this.optionsListTemplate}
      </div>
    `}willUpdate(i){(i.has("options")||i.has("caseSensitive"))&&this.rebuildOptionFilteringValues(),i.has("options")&&this.rebuildOptionIDMap(),(i.has("options")||i.has("sort"))&&this.rebuildSortedOptions(),Na(i,["options","behavior","maxAutocompleteEntries","filter","filterText","caseSensitive","sort"])&&this.rebuildFilteredOptions(),i.has("open")&&(this.open?this.value&&this.setHighlightedOption(this.selectedOption):this.setHighlightedOption(null)),i.has("required")&&this.updateFormValidity()}updated(i){i.has("value")&&this.handleValueChanged(),i.has("options")&&this.behavior!=="freeform"&&!this.selectedOption&&this.clearSelectedOption(),i.has("open")&&(this.open?(this.positionOptionsMenu(),this.optionsList?.showPopover?.(),this.optionsList?.classList.add("visible")):(this.optionsList?.hidePopover?.(),this.optionsList?.classList.remove("visible")))}get labelTemplate(){return d`
      <label id="label" for="text-input" part="label">
        <slot name="label"></slot>
      </label>
    `}get textInputTemplate(){const i=yt({"clear-padding":this.clearable&&!this.shouldShowClearButton});return d`
      <input
        type="text"
        id="text-input"
        class=${i}
        .value=${La(this.enteredText)}
        placeholder=${_e(this.placeholder)}
        part="text-input"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-controls="options-list"
        aria-expanded=${this.open}
        aria-activedescendant=${_e(this.highlightedOption?.id)}
        ?readonly=${this.behavior==="select-only"}
        ?disabled=${this.disabled}
        ?required=${this.required}
        @click=${this.handleComboBoxClick}
        @keydown=${this.handleComboBoxKeyDown}
        @input=${this.handleTextBoxInput}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      />
    `}get clearButtonTemplate(){return d`
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
            src=${Fa}
            alt=""
            aria-hidden="true"
          />
        </slot>
      </button>
    `}get caretTemplate(){return d`
      <slot name="caret-closed" ?hidden=${this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${ja}
          alt=""
          aria-hidden="true"
        />
      </slot>
      <slot name="caret-open" ?hidden=${!this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${Ha}
          alt=""
          aria-hidden="true"
        />
      </slot>
    `}get caretButtonTemplate(){return d`
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
    `}get optionsListTemplate(){return d`
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
        ${$e(this.open,()=>this.optionTemplates)}
        <slot name="options-list-bottom"></slot>
      </ul>
    `}get optionTemplates(){return this.filteredOptions.length===0&&this.maxAutocompleteEntries>0?[this.emptyOptionsTemplate]:this.filteredOptions.map(i=>{const e=i===this.highlightedOption,t=yt({option:!0,highlight:e});return d`
        <li
          id=${i.id}
          class=${t}
          part="option ${e?"highlight":""}"
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
      `})}get emptyOptionsTemplate(){return d`
      <li id="empty-options" part="empty-options">
        <slot name="empty-options">${U("No matching options")}</slot>
      </li>
    `}handleOptionPointerEnter(i){this.handleOptionPointerMove(i)}handleOptionPointerMove(i){const e=i.currentTarget,t=this.getOptionFor(e.id);t&&this.setHighlightedOption(t)}handleOptionClick(i){const e=i.currentTarget,t=this.getOptionFor(e.id);t&&(this.setSelectedOption(t.id),this.stayOpen||this.closeOptionsMenu())}handleComboBoxKeyDown(i){switch(i.key){case"Enter":this.handleEnterPressed();break;case"Escape":this.handleEscapePressed();break;case"ArrowUp":i.altKey?this.handleAltUpArrowPressed():this.handleUpArrowPressed();break;case"ArrowDown":i.altKey?this.handleAltDownArrowPressed():this.handleDownArrowPressed();break;case"Tab":this.handleTabPressed();return;case" ":this.handleSpacePressed(i);return;default:return}i.stopPropagation(),i.preventDefault()}async handleTextBoxInput(){const i=this.textInput?.value??"";this.enteredText=i,this.setFilterText(i),this.openOptionsMenu(),await this.updateComplete,this.highlightFirstOption()}handleEnterPressed(){if(!this.open){this.openOptionsMenu();return}this.highlightedOption?this.setSelectedOption(this.highlightedOption.id):this.behavior==="freeform"&&this.setValue(this.enteredText),this.stayOpen||(this.open=!1)}handleEscapePressed(){if(this.open){this.closeOptionsMenu();return}this.clearSelectedOption()}handleUpArrowPressed(){this.open||this.openOptionsMenu(),this.highlightPreviousOption()}handleDownArrowPressed(){this.open||this.openOptionsMenu(),this.highlightNextOption()}handleAltUpArrowPressed(){this.closeOptionsMenu()}handleAltDownArrowPressed(){this.openOptionsMenu()}handleTabPressed(){this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1))}handleSpacePressed(i){this.behavior==="select-only"&&(this.open?this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1)):this.openOptionsMenu(),i.stopPropagation(),i.preventDefault())}handleComboBoxClick(){this.toggleOptionsMenu()}handleClearButtonClick(){this.clearSelectedOption(),this.textInput?.focus(),this.openOptionsMenu()}handleFocus(){this.behavior!=="select-only"&&this.textInput?.focus(),this.hasFocus=!0,this.losingFocus=!1}handleBlur(){this.hasFocus=!1,this.losingFocus=!0,setTimeout(()=>{this.losingFocus&&!this.shadowRoot?.activeElement&&(this.losingFocus=!1,this.closeOptionsMenu(),this.behavior==="list"?this.setTextValue(this.selectedOption?.text??"",!1):this.behavior==="freeform"&&(this.enteredText||this.value)&&this.setValue(this.enteredText))},0)}handleValueChanged(){if(this.value==null){this.enteredText&&this.setTextValue("",!1);return}const i=this.getOptionFor(this.value);if(this.behavior==="freeform"){const e=i?.text??this.value;e!==this.enteredText&&this.setTextValue(e);return}if(!i){this.clearSelectedOption();return}this.enteredText!==i.text&&(this.setTextValue(i.text,!1),this.setFilterText(""))}highlightFirstOption(){this.setHighlightedOption(this.firstFilteredOption)}highlightLastOption(){this.setHighlightedOption(this.lastFilteredOption)}highlightPreviousOption(){const{filteredOptions:i,lastFilteredIndex:e}=this;if(!this.highlightedOption){this.highlightLastOption();return}const{highlightedIndex:t}=this,o=this.wrapArrowKeys&&t===0?e:Math.max(t-1,0);this.setHighlightedOption(i[o])}highlightNextOption(){const{filteredOptions:i,lastFilteredIndex:e}=this;if(!this.highlightedOption){this.highlightFirstOption();return}const{highlightedIndex:t}=this,o=this.wrapArrowKeys&&t===e?0:Math.min(t+1,e);this.setHighlightedOption(i[o])}async setHighlightedOption(i){this.highlightedOption=i,await this.updateComplete;const{optionsList:e,highlightedElement:t}=this;if(!t||!e)return;const o=t.getBoundingClientRect(),r=e.getBoundingClientRect();(o.top<r.top||o.bottom>r.bottom)&&t.scrollIntoView({block:"nearest"})}setSelectedOption(i){const e=this.getOptionFor(i);if(!e)throw new RangeError("Unknown option ID");const t=this.value;this.value=e.id,this.internals.setFormValue(this.value),this.setTextValue(e.text,!1),this.setFilterText(""),this.value!==t&&this.emitChangeEvent(),e.onSelected?.(e)}clearSelectedOption(){const i=this.value;this.value=null,this.internals.setFormValue(this.value),this.setTextValue(""),this.value!==i&&this.emitChangeEvent()}setValue(i){if(this.behavior==="freeform"){const e=this.value;this.value=i,this.internals.setFormValue(this.value),this.setTextValue(i),this.value!==e&&this.emitChangeEvent()}else this.setSelectedOption(i)}setTextValue(i,e=!0){this.textInput&&(this.textInput.value=i),this.enteredText=i,e&&this.setFilterText(i)}setFilterText(i){const{caseTransform:e}=this;this.filterText=e(i)}openOptionsMenu(){this.open=!0,this.emitToggleEvent()}closeOptionsMenu(){this.open=!1,this.emitToggleEvent()}toggleOptionsMenu(){this.open=!this.open,this.emitToggleEvent()}updateFormValidity(){this.required&&!this.value?this.internals.setValidity({valueMissing:!0},U("A value is required")):this.internals.setValidity({})}emitChangeEvent(){this.dispatchEvent(new CustomEvent("change",{detail:this.value}))}emitToggleEvent(){this.dispatchEvent(new CustomEvent("toggle",{detail:this.open}))}get isEmpty(){return!this.selectedOption&&!this.enteredText}get shouldShowClearButton(){return this.clearable&&!this.disabled&&!this.isEmpty}positionOptionsMenu(){const{mainWidgetRow:i,optionsList:e}=this;if(!i||!e)return;const t=i.getBoundingClientRect(),{innerHeight:o,scrollX:r,scrollY:a}=window,n=t.top,l=o-t.bottom,s="var(--combo-box-list-max-height--)",p={top:`${t.bottom+a}px`,left:`${t.left+r}px`,width:`var(--combo-box-list-width--, ${t.width}px)`,maxHeight:`min(${s}, ${l}px)`};Object.assign(e.style,p),setTimeout(()=>{const h=e.getBoundingClientRect().bottom>=o,v=n>l;h&&v&&(e.style.top="auto",e.style.bottom=`${o-t.top-a}px`,e.style.maxHeight=`min(${s}, ${n}px)`)},0)}get caseTransform(){return this.caseSensitive?Ja:Ya}getOptionFor(i){return this.optionsByID.get(i)??null}rebuildOptionIDMap(){this.optionsByID.clear();for(const i of this.options)this.optionsByID.set(i.id,i)}rebuildSortedOptions(){this.sort?this.optionsRespectingSortFlag=[...this.options].sort((i,e)=>{const t=this.optionFilteringValues.get(i),o=this.optionFilteringValues.get(e);return t.localeCompare(o)}):this.optionsRespectingSortFlag=this.options}rebuildOptionFilteringValues(){this.optionFilteringValues.clear();const{caseTransform:i}=this;for(const e of this.options){const t=i(e.text);this.optionFilteringValues.set(e,t)}}rebuildFilteredOptions(){const i=this.behavior==="select-only"?"all":this.filter,e=typeof i=="string"?Wa[i]:i,t=this.optionsRespectingSortFlag.filter(o=>{const r=this.optionFilteringValues.get(o);return r?e(this.filterText,r,o):!1}).slice(0,this.maxAutocompleteEntries);this.filteredOptions=t}get firstFilteredOption(){return this.filteredOptions[0]??null}get lastFilteredOption(){return this.filteredOptions[this.lastFilteredIndex]??null}get lastFilteredIndex(){return this.filteredOptions.length-1}get selectedOption(){return this.value==null?null:this.getOptionFor(this.value)}get highlightedIndex(){return this.highlightedOption?this.filteredOptions.indexOf(this.highlightedOption):-1}get highlightedElement(){return this.highlightedOption?this.shadowRoot.getElementById(this.highlightedOption.id):null}static get styles(){const i=_`
      :host {
        --combo-box-width--: var(--combo-box-width);
        --combo-box-padding--: var(--padding-sm);
        --combo-box-list-width--: var(--combo-box-list-width, unset);
        --combo-box-list-max-height--: var(--combo-box-list-max-height, 250px);
        --combo-box-list-fade-duration--: var(
          --combo-box-list-fade-duration,
          125ms
        );
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
        transition: opacity var(--combo-box-list-fade-duration--) ease;
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
    `;return[z,i]}};T.formAssociated=!0;T.shadowRootOptions={...x.shadowRootOptions,delegatesFocus:!0};M([u({type:Array})],T.prototype,"options",2);M([u({type:String})],T.prototype,"placeholder",2);M([u({type:String})],T.prototype,"behavior",2);M([u({type:Number,attribute:"max-autocomplete-entries"})],T.prototype,"maxAutocompleteEntries",2);M([u({type:String})],T.prototype,"filter",2);M([u({type:Boolean,reflect:!0,attribute:"case-sensitive"})],T.prototype,"caseSensitive",2);M([u({type:Boolean,reflect:!0})],T.prototype,"sort",2);M([u({type:Boolean,reflect:!0,attribute:"wrap-arrow-keys"})],T.prototype,"wrapArrowKeys",2);M([u({type:Boolean,reflect:!0,attribute:"stay-open"})],T.prototype,"stayOpen",2);M([u({type:Boolean,reflect:!0})],T.prototype,"clearable",2);M([u({type:Boolean,reflect:!0})],T.prototype,"open",2);M([u({type:Boolean,reflect:!0})],T.prototype,"disabled",2);M([u({type:Boolean,reflect:!0})],T.prototype,"required",2);M([u({type:String})],T.prototype,"value",2);M([w()],T.prototype,"hasFocus",2);M([w()],T.prototype,"highlightedOption",2);M([w()],T.prototype,"enteredText",2);M([w()],T.prototype,"filterText",2);M([S("#main-widget-row")],T.prototype,"mainWidgetRow",2);M([S("#text-input")],T.prototype,"textInput",2);M([S("#options-list")],T.prototype,"optionsList",2);T=M([C("ia-combo-box")],T);var Xa=Object.defineProperty,Qa=Object.getOwnPropertyDescriptor,E=(i,e,t,o)=>{for(var r=o>1?void 0:o?Qa(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Xa(e,t,r),r};const en=[{label:"Width",cssVariable:"--ia-theme-combo-box-width",defaultValue:"250px",inputType:"text"},{label:"Padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown width",cssVariable:"--combo-box-list-width",defaultValue:"",inputType:"text"},{label:"Dropdown max height",cssVariable:"--combo-box-list-max-height",defaultValue:"250px",inputType:"text"},{label:"Dropdown fade duration",cssVariable:"--combo-box-list-fade-duration",defaultValue:125,inputType:"range",min:0,max:1e3,step:25,unit:"ms"}],mr=[{id:"red",text:"Red"},{id:"orange",text:"Orange"},{id:"yellow",text:"Yellow"},{id:"green",text:"Green"},{id:"blue",text:"Blue"},{id:"indigo",text:"Indigo"},{id:"violet",text:"Violet"}],tn=mr.map(i=>({...i,content:d` <span style="display: flex; align-items: center">
      <span style="flex: 1">${i.text}</span>
      <div style="width: 15px; height: 15px; background:${i.id}"></div>
    </span>`})),po=ur.map(i=>({id:i.name,text:i.name})),on=ur.map(i=>({id:i.name,text:i.name,content:d`<span>${i.flag}</span>&nbsp;<span>${i.name}</span>`})),rn="list",an="Choices",uo="Select an option...",go=50,nn="substring";let O=class extends x{constructor(){super(...arguments),this.options=po,this.behavior=rn,this.label=an,this.placeholder=uo,this.maxAutocompleteEntries=go,this.filterFn=nn,this.caseSensitive=!1,this.shouldSort=!1,this.wrapArrowKeys=!0,this.clearable=!0,this.disabled=!1,this.announcerText=""}render(){return d`
      <story-template
        elementTag="ia-combo-box"
        elementClassName="IAComboBox"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:en}}
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
                  value=${uo}
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
                  value=${go}
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
    `}get exampleUsage(){const{placeholder:i,behavior:e,maxAutocompleteEntries:t,filterFn:o}=this,r={behavior:e?`"${e}"`:"",placeholder:i?`"${i}"`:"","max-autocomplete-entries":t?`"${t}"`:"",filter:o&&o!=="substring"?`"${o}"`:"","case-sensitive":this.caseSensitive,sort:this.shouldSort,"wrap-arrow-keys":this.wrapArrowKeys,clearable:this.clearable,disabled:this.disabled};return`
      <ia-combo-box
        .options=\${[
          { id: 'foo', text: 'Foo Option' },
          { id: 'bar', text: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(r).map(([n,l])=>l?l===!0?n:l?`${n}=${l}`:"":"").join(`
  `)}
      >
        <span slot="label">${this.label}</span>
      </ia-combo-box>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(i){i.preventDefault(),this.updateOptions(),this.behavior=this.behaviorSelect.value,this.label=this.labelInput.value,this.placeholder=this.placeholderInput.value,this.maxAutocompleteEntries=Number(this.maxAutocompleteInput.value),this.filterFn=this.filterFnSelect.value,this.caseSensitive=this.caseSensitiveCheck.checked,this.shouldSort=this.sortCheck.checked,this.wrapArrowKeys=this.wrapArrowKeysCheck.checked,this.clearable=this.clearableCheck.checked,this.disabled=this.disabledCheck.checked}updateOptions(){switch(this.optionSetSelect.value){case"colors":this.options=this.customContentCheck.checked?tn:mr;break;case"countries":this.options=this.customContentCheck.checked?on:po;break;default:this.options=[]}}handleComboBoxChange(i){this.announcerText=`New value is: ${i.detail}`}static get styles(){return _`
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
    `}};E([w()],O.prototype,"options",2);E([w()],O.prototype,"behavior",2);E([w()],O.prototype,"label",2);E([w()],O.prototype,"placeholder",2);E([w()],O.prototype,"maxAutocompleteEntries",2);E([w()],O.prototype,"filterFn",2);E([w()],O.prototype,"caseSensitive",2);E([w()],O.prototype,"shouldSort",2);E([w()],O.prototype,"wrapArrowKeys",2);E([w()],O.prototype,"clearable",2);E([w()],O.prototype,"disabled",2);E([w()],O.prototype,"announcerText",2);E([S("#settings__options")],O.prototype,"optionSetSelect",2);E([S("#settings__custom-content")],O.prototype,"customContentCheck",2);E([S("#settings__behavior")],O.prototype,"behaviorSelect",2);E([S("#settings__label")],O.prototype,"labelInput",2);E([S("#settings__placeholder")],O.prototype,"placeholderInput",2);E([S("#settings__max-entries")],O.prototype,"maxAutocompleteInput",2);E([S("#settings__filter-fn")],O.prototype,"filterFnSelect",2);E([S("#settings__case-sensitive")],O.prototype,"caseSensitiveCheck",2);E([S("#settings__sort")],O.prototype,"sortCheck",2);E([S("#settings__wrap")],O.prototype,"wrapArrowKeysCheck",2);E([S("#settings__clearable")],O.prototype,"clearableCheck",2);E([S("#settings__disabled")],O.prototype,"disabledCheck",2);O=E([C("ia-combo-box-story")],O);const sn=Object.freeze(Object.defineProperty({__proto__:null,get IAComboBoxStory(){return O}},Symbol.toStringTag,{value:"Module"}));function*ln(i,e){if(i!==void 0){let t=0;for(const o of i)yield e(o,t++)}}const dn="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20class='fill-color'%20d='m17.0555551%2041.3194459c0-12.7430552%2010.3541664-23.1027772%2023.0847216-23.1027772%2012.7166664%200%2023.0777773%2010.359722%2023.0777773%2023.1027772%200%2012.7361108-10.3611109%2023.0986106-23.0777773%2023.0986106-12.7305552%200-23.0847216-10.3624998-23.0847216-23.0986106zm-17.24305512%200c0%2022.2916661%2018.04583292%2040.3472213%2040.32777672%2040.3472213%208.9208332%200%2017.145833-2.9319449%2023.8194439-7.8527776l24.1513883%2024.0777771c1.2125%201.1402778%202.8430555%201.8430556%204.6374999%201.8430556%203.7444443%200%206.7805554-3.0361111%206.7805554-6.7791665%200-2.0652778-.9222222-3.9069444-2.3736111-5.1499999l-23.718055-23.7458328c4.4152777-6.4791665%207.0152776-14.3055552%207.0152776-22.7402772%200-22.2791661-18.0458328-40.34861006-40.312499-40.34861006-22.2819438%200-40.32777672%2018.06944396-40.32777672%2040.34861006z'%20fill='%232c2c2c'%20fill-rule='evenodd'%20/%3e%3c/svg%3e";function c(i,e,t,o){var r=arguments.length,a=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(i,e,t,o);else for(var l=i.length-1;l>=0;l--)(n=i[l])&&(a=(r<3?n(a):r>3?n(e,t,a):n(e,t))||a);return r>3&&a&&Object.defineProperty(e,t,a),a}const wt=window,Ui=wt.ShadowRoot&&(wt.ShadyCSS===void 0||wt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ji=Symbol(),mo=new WeakMap;let fr=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==ji)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Ui&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=mo.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&mo.set(t,e))}return e}toString(){return this.cssText}};const cn=i=>new fr(typeof i=="string"?i:i+"",void 0,ji),hn=(i,...e)=>{const t=i.length===1?i[0]:e.reduce(((o,r,a)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[a+1]),i[0]);return new fr(t,i,ji)},pn=(i,e)=>{Ui?i.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((t=>{const o=document.createElement("style"),r=wt.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=t.cssText,i.appendChild(o)}))},fo=Ui?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return cn(t)})(i):i;var Wt;const Ot=window,vo=Ot.trustedTypes,un=vo?vo.emptyScript:"",bo=Ot.reactiveElementPolyfillSupport,mi={toAttribute(i,e){switch(e){case Boolean:i=i?un:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},vr=(i,e)=>e!==i&&(e==e||i==i),Zt={attribute:!0,type:String,converter:mi,reflect:!1,hasChanged:vr},fi="finalized";let Re=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,o)=>{const r=this._$Ep(o,t);r!==void 0&&(this._$Ev.set(r,o),e.push(r))})),e}static createProperty(e,t=Zt){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const o=typeof e=="symbol"?Symbol():"__"+e,r=this.getPropertyDescriptor(e,o,t);r!==void 0&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,o){return{get(){return this[t]},set(r){const a=this[e];this[t]=r,this.requestUpdate(e,a,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Zt}static finalize(){if(this.hasOwnProperty(fi))return!1;this[fi]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,o=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const r of o)this.createProperty(r,t[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const r of o)t.unshift(fo(r))}else e!==void 0&&t.push(fo(e));return t}static _$Ep(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach((t=>t(this)))}addController(e){var t,o;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((o=e.hostConnected)===null||o===void 0||o.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return pn(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach((t=>{var o;return(o=t.hostConnected)===null||o===void 0?void 0:o.call(t)}))}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach((t=>{var o;return(o=t.hostDisconnected)===null||o===void 0?void 0:o.call(t)}))}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$EO(e,t,o=Zt){var r;const a=this.constructor._$Ep(e,o);if(a!==void 0&&o.reflect===!0){const n=(((r=o.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?o.converter:mi).toAttribute(t,o.type);this._$El=e,n==null?this.removeAttribute(a):this.setAttribute(a,n),this._$El=null}}_$AK(e,t){var o;const r=this.constructor,a=r._$Ev.get(e);if(a!==void 0&&this._$El!==a){const n=r.getPropertyOptions(a),l=typeof n.converter=="function"?{fromAttribute:n.converter}:((o=n.converter)===null||o===void 0?void 0:o.fromAttribute)!==void 0?n.converter:mi;this._$El=a,this[a]=l.fromAttribute(t,n.type),this._$El=null}}requestUpdate(e,t,o){let r=!0;e!==void 0&&(((o=o||this.constructor.getPropertyOptions(e)).hasChanged||vr)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),o.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,o))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((r,a)=>this[a]=r)),this._$Ei=void 0);let t=!1;const o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),(e=this._$ES)===null||e===void 0||e.forEach((r=>{var a;return(a=r.hostUpdate)===null||a===void 0?void 0:a.call(r)})),this.update(o)):this._$Ek()}catch(r){throw t=!1,this._$Ek(),r}t&&this._$AE(o)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach((o=>{var r;return(r=o.hostUpdated)===null||r===void 0?void 0:r.call(o)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach(((t,o)=>this._$EO(o,this[o],t))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};Re[fi]=!0,Re.elementProperties=new Map,Re.elementStyles=[],Re.shadowRootOptions={mode:"open"},bo?.({ReactiveElement:Re}),((Wt=Ot.reactiveElementVersions)!==null&&Wt!==void 0?Wt:Ot.reactiveElementVersions=[]).push("1.6.3");var Gt;const Tt=window,He=Tt.trustedTypes,yo=He?He.createPolicy("lit-html",{createHTML:i=>i}):void 0,vi="$lit$",ce=`lit$${(Math.random()+"").slice(9)}$`,br="?"+ce,gn=`<${br}>`,Ee=document,st=()=>Ee.createComment(""),lt=i=>i===null||typeof i!="object"&&typeof i!="function",yr=Array.isArray,mn=i=>yr(i)||typeof i?.[Symbol.iterator]=="function",Jt=`[ 	
\f\r]`,tt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,wo=/-->/g,$o=/>/g,be=RegExp(`>|${Jt}(?:([^\\s"'>=/]+)(${Jt}*=${Jt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xo=/'/g,_o=/"/g,wr=/^(?:script|style|textarea|title)$/i,fn=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),vn=fn(1),Fe=Symbol.for("lit-noChange"),P=Symbol.for("lit-nothing"),So=new WeakMap,Se=Ee.createTreeWalker(Ee,129,null,!1);function $r(i,e){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return yo!==void 0?yo.createHTML(e):e}const bn=(i,e)=>{const t=i.length-1,o=[];let r,a=e===2?"<svg>":"",n=tt;for(let l=0;l<t;l++){const s=i[l];let p,g,h=-1,v=0;for(;v<s.length&&(n.lastIndex=v,g=n.exec(s),g!==null);)v=n.lastIndex,n===tt?g[1]==="!--"?n=wo:g[1]!==void 0?n=$o:g[2]!==void 0?(wr.test(g[2])&&(r=RegExp("</"+g[2],"g")),n=be):g[3]!==void 0&&(n=be):n===be?g[0]===">"?(n=r??tt,h=-1):g[1]===void 0?h=-2:(h=n.lastIndex-g[2].length,p=g[1],n=g[3]===void 0?be:g[3]==='"'?_o:xo):n===_o||n===xo?n=be:n===wo||n===$o?n=tt:(n=be,r=void 0);const b=n===be&&i[l+1].startsWith("/>")?" ":"";a+=n===tt?s+gn:h>=0?(o.push(p),s.slice(0,h)+vi+s.slice(h)+ce+b):s+ce+(h===-2?(o.push(void 0),l):b)}return[$r(i,a+(i[t]||"<?>")+(e===2?"</svg>":"")),o]};let bi=class xr{constructor({strings:e,_$litType$:t},o){let r;this.parts=[];let a=0,n=0;const l=e.length-1,s=this.parts,[p,g]=bn(e,t);if(this.el=xr.createElement(p,o),Se.currentNode=this.el.content,t===2){const h=this.el.content,v=h.firstChild;v.remove(),h.append(...v.childNodes)}for(;(r=Se.nextNode())!==null&&s.length<l;){if(r.nodeType===1){if(r.hasAttributes()){const h=[];for(const v of r.getAttributeNames())if(v.endsWith(vi)||v.startsWith(ce)){const b=g[n++];if(h.push(v),b!==void 0){const A=r.getAttribute(b.toLowerCase()+vi).split(ce),k=/([.?@])?(.*)/.exec(b);s.push({type:1,index:a,name:k[2],strings:A,ctor:k[1]==="."?wn:k[1]==="?"?xn:k[1]==="@"?_n:Nt})}else s.push({type:6,index:a})}for(const v of h)r.removeAttribute(v)}if(wr.test(r.tagName)){const h=r.textContent.split(ce),v=h.length-1;if(v>0){r.textContent=He?He.emptyScript:"";for(let b=0;b<v;b++)r.append(h[b],st()),Se.nextNode(),s.push({type:2,index:++a});r.append(h[v],st())}}}else if(r.nodeType===8)if(r.data===br)s.push({type:2,index:a});else{let h=-1;for(;(h=r.data.indexOf(ce,h+1))!==-1;)s.push({type:7,index:a}),h+=ce.length-1}a++}}static createElement(e,t){const o=Ee.createElement("template");return o.innerHTML=e,o}};function qe(i,e,t=i,o){var r,a,n,l;if(e===Fe)return e;let s=o!==void 0?(r=t._$Co)===null||r===void 0?void 0:r[o]:t._$Cl;const p=lt(e)?void 0:e._$litDirective$;return s?.constructor!==p&&((a=s?._$AO)===null||a===void 0||a.call(s,!1),p===void 0?s=void 0:(s=new p(i),s._$AT(i,t,o)),o!==void 0?((n=(l=t)._$Co)!==null&&n!==void 0?n:l._$Co=[])[o]=s:t._$Cl=s),s!==void 0&&(e=qe(i,s._$AS(i,e.values),s,o)),e}let yn=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:o},parts:r}=this._$AD,a=((t=e?.creationScope)!==null&&t!==void 0?t:Ee).importNode(o,!0);Se.currentNode=a;let n=Se.nextNode(),l=0,s=0,p=r[0];for(;p!==void 0;){if(l===p.index){let g;p.type===2?g=new Hi(n,n.nextSibling,this,e):p.type===1?g=new p.ctor(n,p.name,p.strings,this,e):p.type===6&&(g=new Sn(n,this,e)),this._$AV.push(g),p=r[++s]}l!==p?.index&&(n=Se.nextNode(),l++)}return Se.currentNode=Ee,a}v(e){let t=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}},Hi=class _r{constructor(e,t,o,r){var a;this.type=2,this._$AH=P,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=r,this._$Cp=(a=r?.isConnected)===null||a===void 0||a}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=qe(this,e,t),lt(e)?e===P||e==null||e===""?(this._$AH!==P&&this._$AR(),this._$AH=P):e!==this._$AH&&e!==Fe&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):mn(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==P&&lt(this._$AH)?this._$AA.nextSibling.data=e:this.$(Ee.createTextNode(e)),this._$AH=e}g(e){var t;const{values:o,_$litType$:r}=e,a=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=bi.createElement($r(r.h,r.h[0]),this.options)),r);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===a)this._$AH.v(o);else{const n=new yn(a,this),l=n.u(this.options);n.v(o),this.$(l),this._$AH=n}}_$AC(e){let t=So.get(e.strings);return t===void 0&&So.set(e.strings,t=new bi(e)),t}T(e){yr(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,r=0;for(const a of e)r===t.length?t.push(o=new _r(this.k(st()),this.k(st()),this,this.options)):o=t[r],o._$AI(a),r++;r<t.length&&(this._$AR(o&&o._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var o;for((o=this._$AP)===null||o===void 0||o.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},Nt=class{constructor(e,t,o,r,a){this.type=1,this._$AH=P,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=P}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,o,r){const a=this.strings;let n=!1;if(a===void 0)e=qe(this,e,t,0),n=!lt(e)||e!==this._$AH&&e!==Fe,n&&(this._$AH=e);else{const l=e;let s,p;for(e=a[0],s=0;s<a.length-1;s++)p=qe(this,l[o+s],t,s),p===Fe&&(p=this._$AH[s]),n||(n=!lt(p)||p!==this._$AH[s]),p===P?e=P:e!==P&&(e+=(p??"")+a[s+1]),this._$AH[s]=p}n&&!r&&this.j(e)}j(e){e===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},wn=class extends Nt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===P?void 0:e}};const $n=He?He.emptyScript:"";let xn=class extends Nt{constructor(){super(...arguments),this.type=4}j(e){e&&e!==P?this.element.setAttribute(this.name,$n):this.element.removeAttribute(this.name)}},_n=class extends Nt{constructor(e,t,o,r,a){super(e,t,o,r,a),this.type=5}_$AI(e,t=this){var o;if((e=(o=qe(this,e,t,0))!==null&&o!==void 0?o:P)===Fe)return;const r=this._$AH,a=e===P&&r!==P||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,n=e!==P&&(r===P||a);a&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,o;typeof this._$AH=="function"?this._$AH.call((o=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&o!==void 0?o:this.element,e):this._$AH.handleEvent(e)}},Sn=class{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){qe(this,e)}};const Co=Tt.litHtmlPolyfillSupport;Co?.(bi,Hi),((Gt=Tt.litHtmlVersions)!==null&&Gt!==void 0?Gt:Tt.litHtmlVersions=[]).push("2.8.0");const Cn=(i,e,t)=>{var o,r;const a=(o=t?.renderBefore)!==null&&o!==void 0?o:e;let n=a._$litPart$;if(n===void 0){const l=(r=t?.renderBefore)!==null&&r!==void 0?r:null;a._$litPart$=n=new Hi(e.insertBefore(st(),l),l,void 0,t??{})}return n._$AI(i),n};var Yt,Xt;let Ne=class extends Re{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const o=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=o.firstChild),o}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Cn(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return Fe}};Ne.finalized=!0,Ne._$litElement$=!0,(Yt=globalThis.litElementHydrateSupport)===null||Yt===void 0||Yt.call(globalThis,{LitElement:Ne});const Ao=globalThis.litElementPolyfillSupport;Ao?.({LitElement:Ne});((Xt=globalThis.litElementVersions)!==null&&Xt!==void 0?Xt:globalThis.litElementVersions=[]).push("3.3.3");const An=i=>e=>typeof e=="function"?((t,o)=>(customElements.define(t,o),o))(i,e):((t,o)=>{const{kind:r,elements:a}=o;return{kind:r,elements:a,finisher(n){customElements.define(t,n)}}})(i,e);const On=(i,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,i)}},Tn=(i,e,t)=>{e.constructor.createProperty(t,i)};function Ie(i){return(e,t)=>t!==void 0?Tn(i,e,t):On(i,e)}const En=({finisher:i,descriptor:e})=>(t,o)=>{var r;if(o===void 0){const a=(r=t.originalKey)!==null&&r!==void 0?r:t.key,n=e!=null?{kind:"method",placement:"prototype",key:a,descriptor:e(t.key)}:{...t,key:a};return i!=null&&(n.finisher=function(l){i(l,a)}),n}{const a=t.constructor;e!==void 0&&Object.defineProperty(t,o,e(o)),i?.(a,o)}};function kn(i,e){return En({descriptor:t=>({get(){var r,a;return(a=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(i))!==null&&a!==void 0?a:null},enumerable:!0,configurable:!0})})}var Qt;((Qt=window.HTMLSlotElement)===null||Qt===void 0?void 0:Qt.prototype.assignedElements)!=null;const Pn=d`
<svg
  viewBox="0 0 40 40"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z" class="fill-color" fill-rule="evenodd"/>
</svg>
`;class Mn extends x{static get styles(){return _`
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
    `}render(){return Pn}}customElements.define("ia-icon-close",Mn);let W=class extends Ne{constructor(){super(...arguments),this.value="",this.clearButtonScreenReaderLabel="Clear",this.focusOnClear=!0,this.forceClearButton=!1}render(){var e,t,o,r;const a=!this.value&&!this.forceClearButton;return vn`
      <div id="container">
        <slot name="icon"></slot>
        <label for="text-input" class="sr-only"
          >${(e=this.screenReaderLabel)!==null&&e!==void 0?e:P}</label
        >
        <input
          id="text-input"
          type="text"
          inputmode="search"
          enterkeyhint="search"
          autocapitalize="off"
          placeholder=${(t=this.placeholder)!==null&&t!==void 0?t:P}
          .value=${(o=this.value)!==null&&o!==void 0?o:P}
          aria-controls=${(r=this.ariaControls)!==null&&r!==void 0?r:P}
          @input=${this.onTextInput}
          @keypress=${this.onKeyPress}
        />
        <button
          id="clear-button"
          type="button"
          ?hidden=${a}
          @click=${this.clearButtonClicked}
        >
          <ia-icon-close aria-hidden="true"></ia-icon-close>
          <span class="sr-only">${this.clearButtonScreenReaderLabel}</span>
        </button>
      </div>
    `}onTextInput(){this.value=this.textInput.value}onKeyPress(e){if(e.key==="Enter"){this.textInput.blur();const t=new CustomEvent("submit",{detail:this.value});this.dispatchEvent(t)}}clearButtonClicked(){const e=this.textInput.value;this.value="",this.focusOnClear&&this.textInput.focus();const t=new CustomEvent("clear",{detail:e});this.dispatchEvent(t);const o=new InputEvent("input",{inputType:"deleteContentBackward"});this.dispatchEvent(o)}};W.shadowRootOptions={...Ne.shadowRootOptions,delegatesFocus:!0};W.styles=hn`
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
  `;c([Ie({type:String})],W.prototype,"value",void 0);c([Ie({type:String})],W.prototype,"placeholder",void 0);c([Ie({type:String})],W.prototype,"screenReaderLabel",void 0);c([Ie({type:String})],W.prototype,"clearButtonScreenReaderLabel",void 0);c([Ie({type:String})],W.prototype,"ariaControls",void 0);c([Ie({type:Boolean})],W.prototype,"focusOnClear",void 0);c([Ie({type:Boolean,reflect:!0})],W.prototype,"forceClearButton",void 0);c([kn("#text-input")],W.prototype,"textInput",void 0);W=c([An("ia-clearable-text-input")],W);const $t=window,Fi=$t.ShadowRoot&&($t.ShadyCSS===void 0||$t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,qi=Symbol(),Oo=new WeakMap;let Sr=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==qi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Fi&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=Oo.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Oo.set(t,e))}return e}toString(){return this.cssText}};const In=i=>new Sr(typeof i=="string"?i:i+"",void 0,qi),q=(i,...e)=>{const t=i.length===1?i[0]:e.reduce(((o,r,a)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[a+1]),i[0]);return new Sr(t,i,qi)},Bn=(i,e)=>{Fi?i.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((t=>{const o=document.createElement("style"),r=$t.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=t.cssText,i.appendChild(o)}))},To=Fi?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return In(t)})(i):i;var ei;const Et=window,Eo=Et.trustedTypes,Vn=Eo?Eo.emptyScript:"",ko=Et.reactiveElementPolyfillSupport,yi={toAttribute(i,e){switch(e){case Boolean:i=i?Vn:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Cr=(i,e)=>e!==i&&(e==e||i==i),ti={attribute:!0,type:String,converter:yi,reflect:!1,hasChanged:Cr},wi="finalized";let Le=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,o)=>{const r=this._$Ep(o,t);r!==void 0&&(this._$Ev.set(r,o),e.push(r))})),e}static createProperty(e,t=ti){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const o=typeof e=="symbol"?Symbol():"__"+e,r=this.getPropertyDescriptor(e,o,t);r!==void 0&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,o){return{get(){return this[t]},set(r){const a=this[e];this[t]=r,this.requestUpdate(e,a,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||ti}static finalize(){if(this.hasOwnProperty(wi))return!1;this[wi]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,o=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const r of o)this.createProperty(r,t[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const r of o)t.unshift(To(r))}else e!==void 0&&t.push(To(e));return t}static _$Ep(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach((t=>t(this)))}addController(e){var t,o;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((o=e.hostConnected)===null||o===void 0||o.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Bn(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach((t=>{var o;return(o=t.hostConnected)===null||o===void 0?void 0:o.call(t)}))}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach((t=>{var o;return(o=t.hostDisconnected)===null||o===void 0?void 0:o.call(t)}))}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$EO(e,t,o=ti){var r;const a=this.constructor._$Ep(e,o);if(a!==void 0&&o.reflect===!0){const n=(((r=o.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?o.converter:yi).toAttribute(t,o.type);this._$El=e,n==null?this.removeAttribute(a):this.setAttribute(a,n),this._$El=null}}_$AK(e,t){var o;const r=this.constructor,a=r._$Ev.get(e);if(a!==void 0&&this._$El!==a){const n=r.getPropertyOptions(a),l=typeof n.converter=="function"?{fromAttribute:n.converter}:((o=n.converter)===null||o===void 0?void 0:o.fromAttribute)!==void 0?n.converter:yi;this._$El=a,this[a]=l.fromAttribute(t,n.type),this._$El=null}}requestUpdate(e,t,o){let r=!0;e!==void 0&&(((o=o||this.constructor.getPropertyOptions(e)).hasChanged||Cr)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),o.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,o))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((r,a)=>this[a]=r)),this._$Ei=void 0);let t=!1;const o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),(e=this._$ES)===null||e===void 0||e.forEach((r=>{var a;return(a=r.hostUpdate)===null||a===void 0?void 0:a.call(r)})),this.update(o)):this._$Ek()}catch(r){throw t=!1,this._$Ek(),r}t&&this._$AE(o)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach((o=>{var r;return(r=o.hostUpdated)===null||r===void 0?void 0:r.call(o)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach(((t,o)=>this._$EO(o,this[o],t))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};Le[wi]=!0,Le.elementProperties=new Map,Le.elementStyles=[],Le.shadowRootOptions={mode:"open"},ko?.({ReactiveElement:Le}),((ei=Et.reactiveElementVersions)!==null&&ei!==void 0?ei:Et.reactiveElementVersions=[]).push("1.6.3");var ii;const kt=window,Ke=kt.trustedTypes,Po=Ke?Ke.createPolicy("lit-html",{createHTML:i=>i}):void 0,$i="$lit$",he=`lit$${(Math.random()+"").slice(9)}$`,Ar="?"+he,zn=`<${Ar}>`,ke=document,dt=()=>ke.createComment(""),ct=i=>i===null||typeof i!="object"&&typeof i!="function",Or=Array.isArray,Dn=i=>Or(i)||typeof i?.[Symbol.iterator]=="function",oi=`[ 	
\f\r]`,it=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Mo=/-->/g,Io=/>/g,ye=RegExp(`>|${oi}(?:([^\\s"'>=/]+)(${oi}*=${oi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bo=/'/g,Vo=/"/g,Tr=/^(?:script|style|textarea|title)$/i,Er=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),N=Er(1),kr=Er(2),We=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),zo=new WeakMap,Ce=ke.createTreeWalker(ke,129,null,!1);function Pr(i,e){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Po!==void 0?Po.createHTML(e):e}const Rn=(i,e)=>{const t=i.length-1,o=[];let r,a=e===2?"<svg>":"",n=it;for(let l=0;l<t;l++){const s=i[l];let p,g,h=-1,v=0;for(;v<s.length&&(n.lastIndex=v,g=n.exec(s),g!==null);)v=n.lastIndex,n===it?g[1]==="!--"?n=Mo:g[1]!==void 0?n=Io:g[2]!==void 0?(Tr.test(g[2])&&(r=RegExp("</"+g[2],"g")),n=ye):g[3]!==void 0&&(n=ye):n===ye?g[0]===">"?(n=r??it,h=-1):g[1]===void 0?h=-2:(h=n.lastIndex-g[2].length,p=g[1],n=g[3]===void 0?ye:g[3]==='"'?Vo:Bo):n===Vo||n===Bo?n=ye:n===Mo||n===Io?n=it:(n=ye,r=void 0);const b=n===ye&&i[l+1].startsWith("/>")?" ":"";a+=n===it?s+zn:h>=0?(o.push(p),s.slice(0,h)+$i+s.slice(h)+he+b):s+he+(h===-2?(o.push(void 0),l):b)}return[Pr(i,a+(i[t]||"<?>")+(e===2?"</svg>":"")),o]};class ht{constructor({strings:e,_$litType$:t},o){let r;this.parts=[];let a=0,n=0;const l=e.length-1,s=this.parts,[p,g]=Rn(e,t);if(this.el=ht.createElement(p,o),Ce.currentNode=this.el.content,t===2){const h=this.el.content,v=h.firstChild;v.remove(),h.append(...v.childNodes)}for(;(r=Ce.nextNode())!==null&&s.length<l;){if(r.nodeType===1){if(r.hasAttributes()){const h=[];for(const v of r.getAttributeNames())if(v.endsWith($i)||v.startsWith(he)){const b=g[n++];if(h.push(v),b!==void 0){const A=r.getAttribute(b.toLowerCase()+$i).split(he),k=/([.?@])?(.*)/.exec(b);s.push({type:1,index:a,name:k[2],strings:A,ctor:k[1]==="."?Nn:k[1]==="?"?jn:k[1]==="@"?Hn:Ut})}else s.push({type:6,index:a})}for(const v of h)r.removeAttribute(v)}if(Tr.test(r.tagName)){const h=r.textContent.split(he),v=h.length-1;if(v>0){r.textContent=Ke?Ke.emptyScript:"";for(let b=0;b<v;b++)r.append(h[b],dt()),Ce.nextNode(),s.push({type:2,index:++a});r.append(h[v],dt())}}}else if(r.nodeType===8)if(r.data===Ar)s.push({type:2,index:a});else{let h=-1;for(;(h=r.data.indexOf(he,h+1))!==-1;)s.push({type:7,index:a}),h+=he.length-1}a++}}static createElement(e,t){const o=ke.createElement("template");return o.innerHTML=e,o}}function Ze(i,e,t=i,o){var r,a,n,l;if(e===We)return e;let s=o!==void 0?(r=t._$Co)===null||r===void 0?void 0:r[o]:t._$Cl;const p=ct(e)?void 0:e._$litDirective$;return s?.constructor!==p&&((a=s?._$AO)===null||a===void 0||a.call(s,!1),p===void 0?s=void 0:(s=new p(i),s._$AT(i,t,o)),o!==void 0?((n=(l=t)._$Co)!==null&&n!==void 0?n:l._$Co=[])[o]=s:t._$Cl=s),s!==void 0&&(e=Ze(i,s._$AS(i,e.values),s,o)),e}class Ln{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:o},parts:r}=this._$AD,a=((t=e?.creationScope)!==null&&t!==void 0?t:ke).importNode(o,!0);Ce.currentNode=a;let n=Ce.nextNode(),l=0,s=0,p=r[0];for(;p!==void 0;){if(l===p.index){let g;p.type===2?g=new ft(n,n.nextSibling,this,e):p.type===1?g=new p.ctor(n,p.name,p.strings,this,e):p.type===6&&(g=new Fn(n,this,e)),this._$AV.push(g),p=r[++s]}l!==p?.index&&(n=Ce.nextNode(),l++)}return Ce.currentNode=ke,a}v(e){let t=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class ft{constructor(e,t,o,r){var a;this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=r,this._$Cp=(a=r?.isConnected)===null||a===void 0||a}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ze(this,e,t),ct(e)?e===V||e==null||e===""?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==We&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Dn(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==V&&ct(this._$AH)?this._$AA.nextSibling.data=e:this.$(ke.createTextNode(e)),this._$AH=e}g(e){var t;const{values:o,_$litType$:r}=e,a=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=ht.createElement(Pr(r.h,r.h[0]),this.options)),r);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===a)this._$AH.v(o);else{const n=new Ln(a,this),l=n.u(this.options);n.v(o),this.$(l),this._$AH=n}}_$AC(e){let t=zo.get(e.strings);return t===void 0&&zo.set(e.strings,t=new ht(e)),t}T(e){Or(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,r=0;for(const a of e)r===t.length?t.push(o=new ft(this.k(dt()),this.k(dt()),this,this.options)):o=t[r],o._$AI(a),r++;r<t.length&&(this._$AR(o&&o._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var o;for((o=this._$AP)===null||o===void 0||o.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class Ut{constructor(e,t,o,r,a){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=V}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,o,r){const a=this.strings;let n=!1;if(a===void 0)e=Ze(this,e,t,0),n=!ct(e)||e!==this._$AH&&e!==We,n&&(this._$AH=e);else{const l=e;let s,p;for(e=a[0],s=0;s<a.length-1;s++)p=Ze(this,l[o+s],t,s),p===We&&(p=this._$AH[s]),n||(n=!ct(p)||p!==this._$AH[s]),p===V?e=V:e!==V&&(e+=(p??"")+a[s+1]),this._$AH[s]=p}n&&!r&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Nn extends Ut{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}const Un=Ke?Ke.emptyScript:"";class jn extends Ut{constructor(){super(...arguments),this.type=4}j(e){e&&e!==V?this.element.setAttribute(this.name,Un):this.element.removeAttribute(this.name)}}class Hn extends Ut{constructor(e,t,o,r,a){super(e,t,o,r,a),this.type=5}_$AI(e,t=this){var o;if((e=(o=Ze(this,e,t,0))!==null&&o!==void 0?o:V)===We)return;const r=this._$AH,a=e===V&&r!==V||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,n=e!==V&&(r===V||a);a&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,o;typeof this._$AH=="function"?this._$AH.call((o=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&o!==void 0?o:this.element,e):this._$AH.handleEvent(e)}}class Fn{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){Ze(this,e)}}const Do=kt.litHtmlPolyfillSupport;Do?.(ht,ft),((ii=kt.litHtmlVersions)!==null&&ii!==void 0?ii:kt.litHtmlVersions=[]).push("2.8.0");const qn=(i,e,t)=>{var o,r;const a=(o=t?.renderBefore)!==null&&o!==void 0?o:e;let n=a._$litPart$;if(n===void 0){const l=(r=t?.renderBefore)!==null&&r!==void 0?r:null;a._$litPart$=n=new ft(e.insertBefore(dt(),l),l,void 0,t??{})}return n._$AI(i),n};var ri,ai;class Ue extends Le{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const o=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=o.firstChild),o}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=qn(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return We}}Ue.finalized=!0,Ue._$litElement$=!0,(ri=globalThis.litElementHydrateSupport)===null||ri===void 0||ri.call(globalThis,{LitElement:Ue});const Ro=globalThis.litElementPolyfillSupport;Ro?.({LitElement:Ue});((ai=globalThis.litElementVersions)!==null&&ai!==void 0?ai:globalThis.litElementVersions=[]).push("3.3.3");const Mr=i=>e=>typeof e=="function"?((t,o)=>(customElements.define(t,o),o))(i,e):((t,o)=>{const{kind:r,elements:a}=o;return{kind:r,elements:a,finisher(n){customElements.define(t,n)}}})(i,e);const Kn=(i,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,i)}},Wn=(i,e,t)=>{e.constructor.createProperty(t,i)};function j(i){return(e,t)=>t!==void 0?Wn(i,e,t):Kn(i,e)}const Ir=({finisher:i,descriptor:e})=>(t,o)=>{var r;if(o===void 0){const a=(r=t.originalKey)!==null&&r!==void 0?r:t.key,n=e!=null?{kind:"method",placement:"prototype",key:a,descriptor:e(t.key)}:{...t,key:a};return i!=null&&(n.finisher=function(l){i(l,a)}),n}{const a=t.constructor;e!==void 0&&Object.defineProperty(t,o,e(o)),i?.(a,o)}};function Ki(i,e){return Ir({descriptor:t=>({get(){var r,a;return(a=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(i))!==null&&a!==void 0?a:null},enumerable:!0,configurable:!0})})}var ni;const Zn=((ni=window.HTMLSlotElement)===null||ni===void 0?void 0:ni.prototype.assignedElements)!=null?(i,e)=>i.assignedElements(e):(i,e)=>i.assignedNodes(e).filter((t=>t.nodeType===Node.ELEMENT_NODE));function Gn(i){const{slot:e,selector:t}=i??{};return Ir({descriptor:o=>({get(){var r;const a="slot"+(e?`[name=${e}]`:":not([name])"),n=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(a),l=n!=null?Zn(n,i):[];return t?l.filter((s=>s.matches(t))):l},enumerable:!0,configurable:!0})})}function ze(i,e,t){return i?e():t?.()}const Jn=kr`<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>`,Yn=kr`<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>`;let I=class extends Ue{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionGroup="options",this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=e=>{switch(e.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=e=>{e&&e.type==="click"&&e.stopPropagation(),this.open=!1,this.updatePopoverState()}}async firstUpdated(){await new Promise(e=>{setTimeout(e,0)}),this.addEventListener("closeDropdown",this.closeOptions)}willUpdate(e){e.has("open")&&this.updatePopoverState()}disconnectedCallback(){var e;(e=super.disconnectedCallback)===null||e===void 0||e.call(this),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){var e,t;this.usePopover&&((t=(e=this.dropdownMenu)===null||e===void 0?void 0:e.togglePopover)===null||t===void 0||t.call(e,this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;const e=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${e.left}px`,this.dropdownMenu.style.top=`${e.bottom}px`,this.dropdownMenu.style.minWidth=`${e.width}px`}mainButtonClicked(){var e;this.openViaButton?this.toggleOptions():(e=this.mainButtonLabelSlotted[0])===null||e===void 0||e.click()}mainButtonKeyDown(e){(e.key==="Enter"||e.key===" ")&&(this.mainButtonClicked(),e.preventDefault())}caretKeyDown(e){(e.key==="Enter"||e.key===" ")&&(this.toggleOptions(),e.preventDefault())}renderOption(e){const{label:t,url:o=void 0,id:r}=e;let a;const n=this.selectedOption===r?"selected":"";return o?a=N`<a
        href=${o}
        @click=${l=>this.optionClicked(l,e)}
        >${t}</a
      >`:a=N`<button
        @click=${l=>this.optionClicked(l,e)}
      >
        ${t}
      </button>`,N`<li role="menuitem" class=${n}>${a}</li>`}optionClicked(e,t){var o;e.stopPropagation(),this.selectedOption!==t.id&&(this.selectedOption=t.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:t}})),(o=t.selectedHandler)===null||o===void 0||o.call(t,t)),this.closeOnSelect&&(this.closeOptions(),this.mainButton.focus())}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(e=>this.selectedOption!==e.id)}get caretUpTemplate(){return N`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${Jn}</slot>
      </span>
    `}get caretDownTemplate(){return N`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${Yn}</slot>
      </span>
    `}get caretTemplate(){return this.displayCaret?this.openViaButton?N`
        <span class="caret" aria-hidden="true">
          ${this.caretUpTemplate} ${this.caretDownTemplate}
        </span>
      `:N`
      <button
        class="caret"
        aria-labelledby="caret-label"
        aria-haspopup="true"
        aria-expanded=${this.open}
        @click=${ze(this.shouldAttachEventHandlers,()=>this.toggleOptions)}
        @keydown=${ze(this.shouldAttachEventHandlers,()=>this.caretKeyDown)}
        ?disabled=${this.isDisabled}
      >
        ${this.caretUpTemplate} ${this.caretDownTemplate}
      </button>
    `:N``}get dropdownTemplate(){return this.isCustomList?N`<slot name="list"></slot>`:N`${this.availableOptions.map(e=>this.renderOption(e))}`}get backdropTemplate(){return this.closeOnBackdropClick?this.open?N`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `:N``:N``}get shouldNestCaretInButton(){return this.openViaButton}get shouldAttachEventHandlers(){return!this.isDisabled&&!this.hasCustomClickHandler}render(){return N`
      <div class="ia-dropdown-group ${this.open?"open":""}">
        <div class="button-row">
          <button
            class="click-main"
            aria-haspopup=${this.openViaButton}
            aria-expanded=${this.open}
            @click=${ze(this.shouldAttachEventHandlers,()=>this.mainButtonClicked)}
            @keydown=${ze(this.shouldAttachEventHandlers,()=>this.mainButtonKeyDown)}
            ?disabled=${this.isDisabled}
          >
            <span class="sr-only" id="caret-label"
              >Toggle ${this.optionGroup}</span
            >
            <slot name="dropdown-label"></slot>
            ${ze(this.shouldNestCaretInButton,()=>this.caretTemplate)}
          </button>
          ${ze(!this.shouldNestCaretInButton,()=>this.caretTemplate)}
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
    `}static get styles(){const e=q`var(--dropdownBorderWidth, 1px)`,t=q`var(--dropdownBorderRadius, 4px)`,o=q`var(--dropdownBorderColor, #fff)`,r=q`var(--dropdownBgColor, #333)`,a=q`var(--dropdownTextColor, #fff)`,n=q`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,l=q`var(--dropdownSelectedBgColor, #fff)`,s=q`var(--dropdownMainButtonBgColor, transparent)`,p=q`var(--dropdownTextAlign, inherit)`,g=q`var(--dropdownBackdropZIndex, 1)`,h=q`var(--dropdownListZIndex, 2)`;return q`
      :host {
        display: inline;
        color: ${a};
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
        background: ${s};
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
        z-index: ${h};
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
          ${s}
        );
      }

      button.click-main:focus,
      button.click-main:focus-visible {
        background-color: var(
          --dropdownMainButtonFocusBgColor,
          ${s}
        );
      }

      button.click-main:active {
        background-color: var(
          --dropdownMainButtonActiveBgColor,
          ${s}
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
        z-index: ${g};
      }

      ul {
        z-index: ${h};
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
        background: ${r};

        font-size: var(--dropdownFontSize, inherit);

        border-top: var(--dropdownBorderTopWidth, ${e});
        border-right: var(--dropdownBorderRightWidth, ${e});
        border-bottom: var(--dropdownBorderBottomWidth, ${e});
        border-left: var(--dropdownBorderLeftWidth, ${e});
        /* Must be after border-width settings for specificity */
        border-style: solid;
        border-color: ${o};

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
        background-color: ${n};
        color: var(--dropdownHoverTextColor, #fff);
        list-style: none;
        cursor: pointer;
      }

      #dropdown-main li:hover:first-child {
        border-top-color: ${n};
      }

      ul#dropdown-main li:hover:last-child {
        border-bottom-color: ${n};
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
        background-color: ${n};
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
        color: ${a};
        background: var(--dropdownItemButtonBgColor, transparent);
        padding: var(--dropdownItemButtonPadding, 0);
        text-align: ${p};
      }
    `}};c([j({type:Boolean,reflect:!0})],I.prototype,"open",void 0);c([j({type:Boolean,reflect:!0})],I.prototype,"isDisabled",void 0);c([j({type:Boolean})],I.prototype,"displayCaret",void 0);c([j({type:Boolean})],I.prototype,"closeOnSelect",void 0);c([j({type:Boolean})],I.prototype,"openViaButton",void 0);c([j({type:Boolean})],I.prototype,"usePopover",void 0);c([j({type:Boolean})],I.prototype,"includeSelectedOption",void 0);c([j({type:String})],I.prototype,"selectedOption",void 0);c([j({attribute:!1})],I.prototype,"options",void 0);c([j({type:String})],I.prototype,"optionGroup",void 0);c([j({attribute:!1})],I.prototype,"optionSelected",void 0);c([j({type:Boolean,reflect:!0})],I.prototype,"isCustomList",void 0);c([j({type:Boolean,reflect:!0})],I.prototype,"hasCustomClickHandler",void 0);c([j({type:Boolean,reflect:!0})],I.prototype,"closeOnEscape",void 0);c([j({type:Boolean,reflect:!0})],I.prototype,"closeOnBackdropClick",void 0);c([Ki(".ia-dropdown-group")],I.prototype,"container",void 0);c([Ki("#dropdown-main")],I.prototype,"dropdownMenu",void 0);c([Ki(".click-main")],I.prototype,"mainButton",void 0);c([Gn({slot:"dropdown-label"})],I.prototype,"mainButtonLabelSlotted",void 0);I=c([Mr("ia-dropdown")],I);let xi=class extends Ue{render(){return N`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `}};xi.styles=q`
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
  `;xi=c([Mr("ia-icon-label")],xi);var Xn=Object.defineProperty,Qn=Object.getOwnPropertyDescriptor,te=(i,e,t,o)=>{for(var r=o>1?void 0:o?Qn(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Xn(e,t,r),r};const Lo={CategoryChanged:"categoryChanged",SearchRequested:"searchRequested"};let G=class extends x{constructor(){super(...arguments),this.categories=[],this.placeholder=U("Search"),this.useMobileView=!1,this.hideDropdown=!1,this.loading=!1}get resolvedCategory(){return this.selectedCategory??this.categories?.[0]?.id??""}render(){return d`
      <div id="container" part="container" role="search">
        <div
          id="main-bar"
          part="main-bar"
          class=${this.hideDropdown?"no-dropdown":y}
        >
          ${this.hideDropdown?y:this.dropdownTemplate}
          ${this.textBoxTemplate} ${this.searchButtonTemplate}
        </div>
      </div>
    `}willUpdate(i){if(i.has("selectedCategory")||i.has("categories")){const e=this.resolvedCategory;this.categoryDropdown&&this.categoryDropdown.selectedOption!==e&&(this.categoryDropdown.selectedOption=e)}}get dropdownTemplate(){return d`
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
    `}get textBoxTemplate(){return d`
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
    `}get searchButtonTemplate(){return d`
      <button
        id="search-button"
        part="search-button"
        class=${this.loading?"loading":y}
        type="button"
        aria-label=${U("Search")}
        @click=${this.handleSubmit}
      >
        ${this.loading?d`<ia-status-indicator
              mode="loading"
              class="search-button-loading-icon"
            ></ia-status-indicator>`:d`<img src=${dn} alt="" />`}
      </button>
    `}get selectedCategoryLabel(){return this.categories.find(e=>e.id===this.resolvedCategory)?.label??this.resolvedCategory}get spacedQuery(){return this.query?.replace(/\+/g," ")??""}searchFieldCleared(){this.query&&this.emitSearchRequested()}handleSubmit(){this.emitSearchRequested()}handleCategorySelected(i){const e=i.detail.option.id;e!==this.resolvedCategory&&(this.selectedCategory=e,setTimeout(()=>this.searchInput.focus()),this.dispatchEvent(new CustomEvent(Lo.CategoryChanged,{detail:e})))}emitSearchRequested(){this.dispatchEvent(new CustomEvent(Lo.SearchRequested,{detail:{query:this.searchInput.value,category:this.resolvedCategory}}))}static get styles(){const i=_`
      :host {
        --search-bar-height--: var(--search-bar-height, 30px);
        --search-bar-width--: var(--search-bar-width, 300px);
        --search-bar-internal-padding--: var(--padding-sm, 5px);
        --clear-button-offset--: var(--clear-button-offset, 0);
        --dropdown-z-index--: var(--dropdown-z-index, initial);
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
        --dropdownListZIndex: var(--dropdown-z-index--);
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
    `;return[z,i]}};te([u({type:String})],G.prototype,"query",2);te([u({type:Array})],G.prototype,"categories",2);te([u({type:String})],G.prototype,"selectedCategory",2);te([u({type:String})],G.prototype,"placeholder",2);te([u({type:Boolean})],G.prototype,"useMobileView",2);te([u({type:Boolean})],G.prototype,"hideDropdown",2);te([u({type:Boolean})],G.prototype,"loading",2);te([S("#search-input")],G.prototype,"searchInput",2);te([S("#category-dropdown")],G.prototype,"categoryDropdown",2);G=te([C("ia-dropdown-search-bar")],G);var es=Object.defineProperty,ts=Object.getOwnPropertyDescriptor,Z=(i,e,t,o)=>{for(var r=o>1?void 0:o?ts(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&es(e,t,r),r};const is=[{label:"Bar height",cssVariable:"--ia-theme-search-bar-height",defaultValue:"30px",inputType:"text"},{label:"Bar width",cssVariable:"--ia-theme-search-bar-width",defaultValue:"300px",inputType:"text"},{label:"Internal padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown z-index",cssVariable:"--dropdown-z-index",defaultValue:2,inputType:"number",min:0,step:1}],No=[{id:"all",label:"All"},{id:"texts",label:"Books/Documents"},{id:"fulltext",label:"Text Contents"},{id:"radio",label:"Radio"},{id:"tv",label:"TV"},{id:"movies",label:"Video"},{id:"audio",label:"Audio"},{id:"software",label:"Software"},{id:"image",label:"Images"},{id:"etree",label:"Live Music"},{id:"collection",label:"Collections"},{id:"data",label:"Data"},{id:"web",label:"Web Sites"}],os="all",Uo="Search";let H=class extends x{constructor(){super(...arguments),this.query="",this.selectedCategory=os,this.placeholder=Uo,this.hideDropdown=!1,this.loading=!1,this.announcerText=""}render(){return d`
      <story-template
        elementTag="ia-dropdown-search-bar"
        elementClassName="IADropdownSearchBar"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:is}}
      >
        <div slot="demo">
          <ia-dropdown-search-bar
            .query=${this.query}
            .categories=${No}
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
                  ${ln(No,i=>d`<option value=${i.id}>
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
                  value=${Uo}
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
    `}get exampleUsage(){const{query:i,selectedCategory:e,placeholder:t,hideDropdown:o,loading:r}=this,a=s=>s?`"${s}"`:"",n={query:a(i),selectedCategory:a(e),placeholder:a(t),hideDropdown:o,loading:r};return`
      <ia-dropdown-search-bar
        .categories=\${[
          { id: 'foo', label: 'Foo Option' },
          { id: 'bar', label: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(n).map(([s,p])=>p?p===!0?s:`${s}=${p}`:"").join(`
  `)}
      >
      </ia-dropdown-search-bar>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(i){i.preventDefault(),this.query=this.queryInput.value,this.selectedCategory=this.selectedCategorySelect.value,this.placeholder=this.placeholderInput.value,this.hideDropdown=this.hideDropdownCheck.checked,this.loading=this.loadingCheck.checked}handleSearchRequested(i){this.announcerText=`Category ID "${i.detail.category}" / Query "${i.detail.query}"`}static get styles(){return _`
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
    `}};Z([w()],H.prototype,"query",2);Z([w()],H.prototype,"selectedCategory",2);Z([w()],H.prototype,"placeholder",2);Z([w()],H.prototype,"hideDropdown",2);Z([w()],H.prototype,"loading",2);Z([w()],H.prototype,"announcerText",2);Z([S("#settings__query")],H.prototype,"queryInput",2);Z([S("#settings__selected-category")],H.prototype,"selectedCategorySelect",2);Z([S("#settings__placeholder")],H.prototype,"placeholderInput",2);Z([S("#settings__hide-dropdown")],H.prototype,"hideDropdownCheck",2);Z([S("#settings__loading")],H.prototype,"loadingCheck",2);H=Z([C("ia-dropdown-search-bar-story")],H);const rs=Object.freeze(Object.defineProperty({__proto__:null,get IADropdownSearchBarStory(){return H}},Symbol.toStringTag,{value:"Module"}));function m(i){let e,t,o;return e=i,(r,a,n)=>{if(n.value!=null)n.value=jo(n.value,e,t,o);else if(n.get!=null)n.get=jo(n.get,e,t,o);else throw"Only put a Memoize() decorator on a method or get accessor."}}const si=new Map;function jo(i,e,t=0,o){const r=Symbol("__memoized_map__");return function(...a){let n;this.hasOwnProperty(r)||Object.defineProperty(this,r,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let l=this[r];if(Array.isArray(o))for(const s of o)si.has(s)?si.get(s).push(l):si.set(s,[l]);if(e||a.length>0||t>0){let s;e===!0?s=a.map(h=>h.toString()).join("!"):e?s=e.apply(this,a):s=a[0];const p=`${s}__timestamp`;let g=!1;if(t>0)if(!l.has(p))g=!0;else{let h=l.get(p);g=Date.now()-h>t}l.has(s)&&!g?n=l.get(s):(n=i.apply(this,a),l.set(s,n),t>0&&l.set(p,Date.now()))}else{const s=this;l.has(s)?n=l.get(s):(n=i.apply(this,a),l.set(s,n))}return n}}class _i{parseValue(e){if(typeof e=="string"){const t=e.trim().toLowerCase();if(t==="false"||t==="0"||t==="no")return!1;if(t==="true"||t==="1"||t==="yes")return!0}return!!e}}_i.shared=new _i;class ae{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}ae.shared=new ae;class Pt{parseValue(e){return ae.shared.parseValue(e)}}Pt.shared=new Pt;class pt{parseValue(e){return this.parseJSDate(e)||this.parseBracketDate(e)}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const o=Date.parse(t);if(Number.isNaN(o))return;let r=new Date(t);return(t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(r=new Date(r.getTime()+r.getTimezoneOffset()*1e3*60)),r}}pt.shared=new pt;class Mt{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let o;return t.length===1?o=this.parseNumberFormat(t[0]):o=this.parseColonSeparatedFormat(t),o}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const o=e.map((r,a)=>{const n=parseFloat(r);if(Number.isNaN(n))return t=!0,0;const s=60**(e.length-1-a);return n*Math.floor(s)}).reduce((r,a)=>r+a,0);return t?void 0:o}}Mt.shared=new Mt;class as{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let o=[];for(const r of this.separators)if(o=t.split(r),o.length>1)break;return this.parseListValues(o)}parseListValues(e){const o=e.map(a=>a.trim()).map(a=>this.parser.parseValue(a)),r=[];return o.forEach(a=>{a!==void 0&&r.push(a)}),r}}class It{parseValue(e){return String(e)}}It.shared=new It;class Be{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const e=ae.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return this.rawValue.size!=null?Pt.shared.parseValue(this.rawValue.size):void 0}get title(){return this.rawValue.title}get length(){return this.rawValue.length!=null?Mt.shared.parseValue(this.rawValue.length):void 0}get height(){return this.rawValue.height!=null?ae.shared.parseValue(this.rawValue.height):void 0}get width(){return this.rawValue.width!=null?ae.shared.parseValue(this.rawValue.width):void 0}get track(){return this.rawValue.track!=null?ae.shared.parseValue(this.rawValue.track):void 0}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}constructor(e={}){this.rawValue=e}}c([m()],Be.prototype,"mtime",null);c([m()],Be.prototype,"size",null);c([m()],Be.prototype,"length",null);c([m()],Be.prototype,"height",null);c([m()],Be.prototype,"width",null);c([m()],Be.prototype,"track",null);class ie{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,t){this.parser=e,this.rawValue=t}parseRawValue(){const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(o=>{const r=this.parser.parseValue(o);Array.isArray(r)?t.push(...r):r!==void 0&&t.push(r)}),t}}c([m()],ie.prototype,"values",null);c([m()],ie.prototype,"value",null);class Ho extends ie{constructor(e){super(_i.shared,e)}}class le extends ie{constructor(e){super(pt.shared,e)}}class li extends ie{constructor(e){super(Mt.shared,e)}}class F extends ie{constructor(e){super(ae.shared,e)}}class $ extends ie{constructor(e){super(It.shared,e)}}class Wi{constructor(e){this.allowed=e}parseValue(e){return typeof e=="string"&&this.allowed.includes(e)?e:void 0}}class Zi extends ie{constructor(e,t){super(t,e)}}const ns=new Wi(["rl","lr"]);class ss extends Zi{constructor(e){super(e,ns)}}class Fo extends ie{constructor(e){super(Pt.shared,e)}}const ls=new Wi(["account","audio","collection","data","etree","image","movies","search","software","texts","web"]);class ds extends Zi{constructor(e){super(e,ls)}}class cs extends ie{constructor(e,t){super(t,e)}}class hs extends cs{constructor(e){const t=new as(It.shared);super(e,t)}}const ps=new Wi(["true","none","frozen"]);class f{get identifier(){return this.rawMetadata.identifier}get addeddate(){return this.rawMetadata.addeddate!=null?new le(this.rawMetadata.addeddate):void 0}get audio_codec(){return this.rawMetadata.audio_codec!=null?new $(this.rawMetadata.audio_codec):void 0}get audio_sample_rate(){return this.rawMetadata.audio_sample_rate!=null?new F(this.rawMetadata.audio_sample_rate):void 0}get avg_rating(){return this.rawMetadata.avg_rating!=null?new F(this.rawMetadata.avg_rating):void 0}get collection(){return this.rawMetadata.collection!=null?new $(this.rawMetadata.collection):void 0}get collections_raw(){return this.rawMetadata.collections_raw!=null?new $(this.rawMetadata.collections_raw):void 0}get collection_size(){return this.rawMetadata.collection_size!=null?new Fo(this.rawMetadata.collection_size):void 0}get contact(){return this.rawMetadata.contact!=null?new $(this.rawMetadata.contact):void 0}get contributor(){return this.rawMetadata.contributor!=null?new $(this.rawMetadata.contributor):void 0}get coverage(){return this.rawMetadata.coverage!=null?new $(this.rawMetadata.coverage):void 0}get creator(){return this.rawMetadata.creator!=null?new $(this.rawMetadata.creator):void 0}get creator_alt_script(){return this.rawMetadata["creator-alt-script"]!=null?new $(this.rawMetadata["creator-alt-script"]):void 0}get credits(){return this.rawMetadata.credits!=null?new $(this.rawMetadata.credits):void 0}get collection_layout(){return this.rawMetadata.collection_layout!=null?new $(this.rawMetadata.collection_layout):void 0}get date(){return this.rawMetadata.date!=null?new le(this.rawMetadata.date):void 0}get description(){return this.rawMetadata.description!=null?new $(this.rawMetadata.description):void 0}get downloads(){return this.rawMetadata.downloads!=null?new F(this.rawMetadata.downloads):void 0}get duration(){return this.rawMetadata.duration!=null?new li(this.rawMetadata.duration):void 0}get external_identifier(){return this.rawMetadata["external-identifier"]!=null?new $(this.rawMetadata["external-identifier"]):void 0}get external_link(){return this.rawMetadata["external-link"]!=null?new $(this.rawMetadata["external-link"]):void 0}get files_count(){return this.rawMetadata.files_count!=null?new F(this.rawMetadata.files_count):void 0}get indexdate(){return this.rawMetadata.indexdate!=null?new le(this.rawMetadata.indexdate):void 0}get isbn(){return this.rawMetadata.isbn!=null?new $(this.rawMetadata.isbn):void 0}get issue(){return this.rawMetadata.issue!=null?new $(this.rawMetadata.issue):void 0}get item_count(){return this.rawMetadata.item_count!=null?new F(this.rawMetadata.item_count):void 0}get item_size(){return this.rawMetadata.item_size!=null?new Fo(this.rawMetadata.item_size):void 0}get language(){return this.rawMetadata.language!=null?new $(this.rawMetadata.language):void 0}get length(){return this.rawMetadata.length!=null?new li(this.rawMetadata.length):void 0}get licenseurl(){return this.rawMetadata.licenseurl!=null?new $(this.rawMetadata.licenseurl):void 0}get lineage(){return this.rawMetadata.lineage!=null?new $(this.rawMetadata.lineage):void 0}get month(){return this.rawMetadata.month!=null?new F(this.rawMetadata.month):void 0}get mediatype(){return this.rawMetadata.mediatype!=null?new ds(this.rawMetadata.mediatype):void 0}get noindex(){return this.rawMetadata.noindex!=null?new Ho(this.rawMetadata.noindex):void 0}get notes(){return this.rawMetadata.notes!=null?new $(this.rawMetadata.notes):void 0}get num_favorites(){return this.rawMetadata.num_favorites!=null?new F(this.rawMetadata.num_favorites):void 0}get num_reviews(){return this.rawMetadata.num_reviews!=null?new F(this.rawMetadata.num_reviews):void 0}get openlibrary_edition(){return this.rawMetadata.openlibrary_edition!=null?new $(this.rawMetadata.openlibrary_edition):void 0}get openlibrary_work(){return this.rawMetadata.openlibrary_work!=null?new $(this.rawMetadata.openlibrary_work):void 0}get page_progression(){return this.rawMetadata.page_progression!=null?new ss(this.rawMetadata.page_progression):void 0}get paginated(){return this.rawMetadata.paginated!=null?new Ho(this.rawMetadata.paginated):void 0}get partner(){return this.rawMetadata.partner!=null?new $(this.rawMetadata.partner):void 0}get post_text(){return this.rawMetadata.post_text!=null?new $(this.rawMetadata.post_text):void 0}get ppi(){return this.rawMetadata.ppi!=null?new F(this.rawMetadata.ppi):void 0}get publicdate(){return this.rawMetadata.publicdate!=null?new le(this.rawMetadata.publicdate):void 0}get publisher(){return this.rawMetadata.publisher!=null?new $(this.rawMetadata.publisher):void 0}get reviewdate(){return this.rawMetadata.reviewdate!=null?new le(this.rawMetadata.reviewdate):void 0}get reviews_allowed(){return this.rawMetadata["reviews-allowed"]!=null?new Zi(this.rawMetadata["reviews-allowed"],ps):void 0}get rights(){return this.rawMetadata.rights!=null?new $(this.rawMetadata.rights):void 0}get rights_holder(){var e;const t=(e=this.rawMetadata["rights-holder"])!==null&&e!==void 0?e:this.rawMetadata.rights_holder;return t!=null?new $(t):void 0}get runtime(){return this.rawMetadata.runtime!=null?new li(this.rawMetadata.runtime):void 0}get scanner(){return this.rawMetadata.scanner!=null?new $(this.rawMetadata.scanner):void 0}get segments(){return this.rawMetadata.segments!=null?new $(this.rawMetadata.segments):void 0}get shotlist(){return this.rawMetadata.shotlist!=null?new $(this.rawMetadata.shotlist):void 0}get source(){return this.rawMetadata.source!=null?new $(this.rawMetadata.source):void 0}get sponsor(){return this.rawMetadata.sponsor!=null?new $(this.rawMetadata.sponsor):void 0}get start_localtime(){return this.rawMetadata.start_localtime!=null?new le(this.rawMetadata.start_localtime):void 0}get start_time(){return this.rawMetadata.start_time!=null?new le(this.rawMetadata.start_time):void 0}get stop_time(){return this.rawMetadata.stop_time!=null?new le(this.rawMetadata.stop_time):void 0}get subject(){return this.rawMetadata.subject!=null?new hs(this.rawMetadata.subject):void 0}get taper(){return this.rawMetadata.taper!=null?new $(this.rawMetadata.taper):void 0}get title(){return this.rawMetadata.title!=null?new $(this.rawMetadata.title):void 0}get title_alt_script(){return this.rawMetadata["title-alt-script"]!=null?new $(this.rawMetadata["title-alt-script"]):void 0}get transferer(){return this.rawMetadata.transferer!=null?new $(this.rawMetadata.transferer):void 0}get track(){return this.rawMetadata.track!=null?new F(this.rawMetadata.track):void 0}get type(){return this.rawMetadata.type!=null?new $(this.rawMetadata.type):void 0}get uploader(){return this.rawMetadata.uploader!=null?new $(this.rawMetadata.uploader):void 0}get utc_offset(){return this.rawMetadata.utc_offset!=null?new F(this.rawMetadata.utc_offset):void 0}get venue(){return this.rawMetadata.venue!=null?new $(this.rawMetadata.venue):void 0}get volume(){return this.rawMetadata.volume!=null?new $(this.rawMetadata.volume):void 0}get week(){return this.rawMetadata.week!=null?new F(this.rawMetadata.week):void 0}get year(){return this.rawMetadata.year!=null?new F(this.rawMetadata.year):void 0}constructor(e={}){this.rawMetadata=e}}c([m()],f.prototype,"addeddate",null);c([m()],f.prototype,"audio_codec",null);c([m()],f.prototype,"audio_sample_rate",null);c([m()],f.prototype,"avg_rating",null);c([m()],f.prototype,"collection",null);c([m()],f.prototype,"collections_raw",null);c([m()],f.prototype,"collection_size",null);c([m()],f.prototype,"contact",null);c([m()],f.prototype,"contributor",null);c([m()],f.prototype,"coverage",null);c([m()],f.prototype,"creator",null);c([m()],f.prototype,"creator_alt_script",null);c([m()],f.prototype,"credits",null);c([m()],f.prototype,"collection_layout",null);c([m()],f.prototype,"date",null);c([m()],f.prototype,"description",null);c([m()],f.prototype,"downloads",null);c([m()],f.prototype,"duration",null);c([m()],f.prototype,"external_identifier",null);c([m()],f.prototype,"external_link",null);c([m()],f.prototype,"files_count",null);c([m()],f.prototype,"indexdate",null);c([m()],f.prototype,"isbn",null);c([m()],f.prototype,"issue",null);c([m()],f.prototype,"item_count",null);c([m()],f.prototype,"item_size",null);c([m()],f.prototype,"language",null);c([m()],f.prototype,"length",null);c([m()],f.prototype,"licenseurl",null);c([m()],f.prototype,"lineage",null);c([m()],f.prototype,"month",null);c([m()],f.prototype,"mediatype",null);c([m()],f.prototype,"noindex",null);c([m()],f.prototype,"notes",null);c([m()],f.prototype,"num_favorites",null);c([m()],f.prototype,"num_reviews",null);c([m()],f.prototype,"openlibrary_edition",null);c([m()],f.prototype,"openlibrary_work",null);c([m()],f.prototype,"page_progression",null);c([m()],f.prototype,"paginated",null);c([m()],f.prototype,"partner",null);c([m()],f.prototype,"post_text",null);c([m()],f.prototype,"ppi",null);c([m()],f.prototype,"publicdate",null);c([m()],f.prototype,"publisher",null);c([m()],f.prototype,"reviewdate",null);c([m()],f.prototype,"reviews_allowed",null);c([m()],f.prototype,"rights",null);c([m()],f.prototype,"rights_holder",null);c([m()],f.prototype,"runtime",null);c([m()],f.prototype,"scanner",null);c([m()],f.prototype,"segments",null);c([m()],f.prototype,"shotlist",null);c([m()],f.prototype,"source",null);c([m()],f.prototype,"sponsor",null);c([m()],f.prototype,"start_localtime",null);c([m()],f.prototype,"start_time",null);c([m()],f.prototype,"stop_time",null);c([m()],f.prototype,"subject",null);c([m()],f.prototype,"taper",null);c([m()],f.prototype,"title",null);c([m()],f.prototype,"title_alt_script",null);c([m()],f.prototype,"transferer",null);c([m()],f.prototype,"track",null);c([m()],f.prototype,"type",null);c([m()],f.prototype,"uploader",null);c([m()],f.prototype,"utc_offset",null);c([m()],f.prototype,"venue",null);c([m()],f.prototype,"volume",null);c([m()],f.prototype,"week",null);c([m()],f.prototype,"year",null);class jt{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return this.rawValue.reviewdate!=null?pt.shared.parseValue(this.rawValue.reviewdate):void 0}get createdate(){return this.rawValue.createdate!=null?pt.shared.parseValue(this.rawValue.createdate):void 0}get stars(){return this.rawValue.stars!=null?ae.shared.parseValue(this.rawValue.stars):void 0}constructor(e={}){this.rawValue=e}}c([m()],jt.prototype,"reviewdate",null);c([m()],jt.prototype,"createdate",null);c([m()],jt.prototype,"stars",null);class Br{constructor(e){var t,o;this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=(t=e.files)===null||t===void 0?void 0:t.map(r=>new Be(r)),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new f(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=(o=e.reviews)===null||o===void 0?void 0:o.map(r=>new jt(r))}}var Ae;(function(i){i.networkError="MetadataService.NetworkError",i.itemNotFound="MetadataService.ItemNotFound",i.decodingError="MetadataService.DecodingError",i.searchEngineError="MetadataService.SearchEngineError"})(Ae||(Ae={}));class Si extends Error{constructor(e,t,o){super(t),this.name=e,this.type=e,this.details=o}}class us{constructor(e){var t;if(this.baseUrl=(t=e?.baseUrl)!==null&&t!==void 0?t:"archive.org",e?.includeCredentials!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,e?.scope!==void 0)this.requestScope=e.scope;else{const r=new URL(window.location.href).searchParams.get("scope");r&&(this.requestScope=r)}}async fetchMetadata(e,t){const o=t?`/${t}`:"",r=`https://${this.baseUrl}/metadata/${e}${o}`;return this.fetchUrl(r)}async fetchUrl(e,t){var o;const r=new URL(e);this.requestScope&&r.searchParams.set("scope",this.requestScope);let a;try{const n=(o=t?.requestOptions)!==null&&o!==void 0?o:{credentials:this.includeCredentials?"include":"same-origin"};a=await fetch(r.href,n)}catch(n){const l=n instanceof Error?n.message:typeof n=="string"?n:"Unknown error";return this.getErrorResult(Ae.networkError,l)}try{const n=await a.json(),l=n.error;if(l){const s=n.forensics;return this.getErrorResult(Ae.searchEngineError,l,s)}else return{success:n}}catch(n){const l=n instanceof Error?n.message:typeof n=="string"?n:"Unknown error";return this.getErrorResult(Ae.decodingError,l)}}getErrorResult(e,t,o){return{error:new Si(e,t,o)}}}class qo{constructor(e){this.backend=e}async fetchMetadata(e){var t;const o=await this.backend.fetchMetadata(e);return o.error?o:((t=o.success)===null||t===void 0?void 0:t.metadata)===void 0?{error:new Si(Ae.itemNotFound)}:{success:new Br(o.success)}}async fetchMetadataValue(e,t){var o;const r=await this.backend.fetchMetadata(e,t);return r.error?r:((o=r.success)===null||o===void 0?void 0:o.result)===void 0?{error:new Si(Ae.itemNotFound)}:{success:r.success.result}}}qo.default=new qo(new us);const gs=d`
  <svg
    class="ia-icon"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m10.5 17.5c1.3807119 0 2.5 1.1192881 2.5 2.5s-1.1192881 2.5-2.5 2.5c-1.38071187 0-2.5-1.1192881-2.5-2.5s1.11928813-2.5 2.5-2.5zm9.5 0c1.3807119 0 2.5 1.1192881 2.5 2.5s-1.1192881 2.5-2.5 2.5-2.5-1.1192881-2.5-2.5 1.1192881-2.5 2.5-2.5zm9.5 0c1.3807119 0 2.5 1.1192881 2.5 2.5s-1.1192881 2.5-2.5 2.5-2.5-1.1192881-2.5-2.5 1.1192881-2.5 2.5-2.5z"
      fill-rule="evenodd"
    />
  </svg>
`,Ko=d`
  <svg
    class="ia-icon"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m9 0c4.9705627 0 9 4.02943725 9 9 0 4.9705627-4.0294373 9-9 9-4.97056275 0-9-4.0294373-9-9 0-4.97056275 4.02943725-9 9-9zm1.6976167 5.28352881c-.365258-.3556459-.9328083-.37581056-1.32099801-.06558269l-.09308988.0844372-3 3.08108108-.08194436.09533317c-.27484337.36339327-.26799482.87009349.01656959 1.22592581l.084491.09308363 3 2.91891889.09533796.0818904c.3633964.2746544.8699472.2677153 1.2256839-.0167901l.093059-.0844712.0818904-.095338c.2746544-.3633964.2677153-.8699472-.0167901-1.2256839l-.0844712-.093059-2.283355-2.2222741 2.3024712-2.36338332.0819252-.09530804c.2997677-.39632298.2644782-.96313393-.1007797-1.31877983z"
      fill-rule="evenodd"
    />
  </svg>
`;var ms=Object.defineProperty,fs=Object.getOwnPropertyDescriptor,me=(i,e,t,o)=>{for(var r=o>1?void 0:o?fs(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&ms(e,t,r),r};let Q=class extends x{constructor(){super(...arguments),this.icon="",this.href="",this.label="",this.menuDetails="",this.buttonId="",this.selected=!1,this.followable=!1}onClick(i){i.preventDefault(),this.dispatchMenuTypeSelectedEvent()}dispatchMenuTypeSelectedEvent(){this.dispatchEvent(new CustomEvent("menuTypeSelected",{bubbles:!0,composed:!0,detail:{id:this.buttonId}}))}get iconClass(){return this.selected?"active":""}get menuItem(){return d`
      <span
        class="icon ${this.iconClass}"
        aria-hidden="true"
        title=${this.label}
        >${this.icon}</span
      >
      <span class="label">${this.label}</span>
      <span class="menu-details">${this.menuDetails}</span>
    `}get linkButton(){return d`
      <a
        href=${this.href}
        class="menu-item"
        aria-expanded=${this.selected}
        @click=${this.followable?void 0:this.onClick}
        >${this.menuItem}</a
      >
    `}get clickButton(){return d`
      <button
        class="menu-item"
        aria-expanded=${this.selected}
        @click=${this.onClick}
      >
        ${this.menuItem}
      </button>
    `}render(){return this.href?this.linkButton:this.clickButton}static get styles(){return[z,_`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-active-button-bg--: var(
            --item-navigator-active-button-bg,
            var(--mid-gray)
          );
          --item-navigator-menu-button-label-display--: var(
            --item-navigator-menu-button-label-display,
            none
          );
          --item-navigator-icon-inactive-fill--: var(
            --item-navigator-icon-inactive-fill,
            var(--lighter-gray)
          );
          --item-navigator-icon-active-fill--: var(
            --item-navigator-icon-active-fill,
            var(--true-white)
          );
          --item-navigator-icon-width--: var(
            --item-navigator-icon-width,
            2.4em
          );
          --item-navigator-icon-height--: var(
            --item-navigator-icon-height,
            2.4em
          );

          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        a {
          display: inline-block;
          text-decoration: none;
        }

        button.menu-item {
          -webkit-appearance: none;
          appearance: none;
          /* Inherit font-size so the em-sized icon/label resolve against the
             component base rather than the UA default button font-size. */
          font: inherit;
        }

        .menu-item {
          display: inline-flex;
          width: 100%;
          padding: 0;
          text-align: left;
          background: transparent;
          align-items: center;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
          border-radius: 6px;
        }

        .menu-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .label {
          display: var(--item-navigator-menu-button-label-display--);
          padding: 0;
          font-size: 1.6em;
          font-weight: 400;
          color: var(--item-navigator-text-color--);
          text-align: left;
          vertical-align: middle;
          margin-left: 1em;
        }

        .menu-details {
          color: var(--item-navigator-text-color--);
          display: inline-block;
          margin-left: 0.5em;
          font-style: italic;
          font-size: 1.5em;
        }

        .menu-item > .icon {
          position: relative;
          display: inline-flex;
          z-index: 2;
          min-width: 4.2em;
          max-width: 4.2em;
          height: 4.2em;
          vertical-align: middle;
          align-items: center;
          justify-content: center;
        }

        .menu-item > .icon > * {
          /* Prevent tooltip containing icon literal description */
          pointer-events: none;
        }

        /* Size the glyph within the icon box to match the shortcut-rail
           icons, rather than letting the svg fill the whole box. */
        .menu-item > .icon .ia-icon {
          width: var(--item-navigator-icon-width--);
          height: var(--item-navigator-icon-height--);
        }

        .menu-item[aria-expanded='true'] .icon {
          background-color: var(--item-navigator-active-button-bg--);
          border-radius: 1em 0 0 1em;
        }

        .icon .fill-color {
          fill: var(--item-navigator-icon-inactive-fill--);
        }

        .icon.active .fill-color {
          fill: var(--item-navigator-icon-active-fill--);
        }
      `]}};Q.shadowRootOptions={...x.shadowRootOptions,delegatesFocus:!0};me([u({type:Object})],Q.prototype,"icon",2);me([u({type:String})],Q.prototype,"href",2);me([u({type:String})],Q.prototype,"label",2);me([u({type:Object})],Q.prototype,"menuDetails",2);me([u({type:String})],Q.prototype,"buttonId",2);me([u({type:Boolean})],Q.prototype,"selected",2);me([u({type:Boolean})],Q.prototype,"followable",2);Q=me([C("ia-menu-button")],Q);var vs=Object.defineProperty,bs=Object.getOwnPropertyDescriptor,ne=(i,e,t,o)=>{for(var r=o>1?void 0:o?bs(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&vs(e,t,r),r};const Wo={closeDrawer:"menuSliderClosed",closePanel:"menuPanelClosed"};let ee=class extends x{constructor(){super(...arguments),this.menus=[],this.open=!1,this.manuallyHandleClose=!1,this.selectedMenu="",this.selectedMenuAction=y,this.animateMenuOpen=!1}updated(){const i=this.selectedMenuDetails?.actionButton||y;i!==this.selectedMenuAction&&(this.selectedMenuAction=i)}setSelectedMenu({detail:i}){const{id:e}=i;this.selectedMenu=this.selectedMenu===e?"":e,this.selectedMenuAction=this.selectedMenuDetails?.actionButton||y,this.updateComplete.then(()=>{this.contentCloseButton?.focus()})}closeMenu(){this.manuallyHandleClose||(this.open=!1);const{closeDrawer:i}=Wo,e=new CustomEvent(i,{detail:this.selectedMenuDetails});this.dispatchEvent(e)}closePanel(){const i=this.selectedMenu;this.selectedMenu="",this.selectedMenuAction=y,this.dispatchEvent(new CustomEvent(Wo.closePanel,{detail:{id:i}})),i&&this.updateComplete.then(()=>{const e=this.menus.findIndex(t=>t.id===i);e!==-1&&this.menuList.querySelector(`li:nth-child(${e+1}) ia-menu-button`)?.focus()})}handleKeyDown(i){i.key==="Escape"&&(i.preventDefault(),this.selectedMenu?this.closePanel():this.closeMenu())}get selectedMenuDetails(){return this.menus.find(i=>i.id===this.selectedMenu)}get sliderDetailsClass(){const i=this.animateMenuOpen?"animate":"",e=this.open?"open":"";return`${i} ${e}`}get selectedMenuClass(){return this.selectedMenu?"open":""}get menuItems(){return this.menus.map(i=>d`
        <li>
          <ia-menu-button
            @menuTypeSelected=${this.setSelectedMenu}
            .icon=${i.icon}
            .label=${i.label}
            .menuDetails=${i.menuDetails||""}
            .buttonId=${i.id}
            .selected=${i.id===this.selectedMenu}
            .followable=${i.followable||!1}
            .href=${i.href||""}
          ></ia-menu-button>
        </li>
      `)}get renderMenuHeader(){const{label:i="",menuDetails:e=""}=this.selectedMenuDetails||{},t=this.selectedMenuAction?"with-secondary-action":"",o=this.selectedMenuAction?d`<span class="custom-action">${this.selectedMenuAction}</span>`:y;return d`
      <header class=${t}>
        <div class="details">
          <h3>${i}</h3>
          <span class="extra-details">${e}</span>
        </div>
        ${o}
        <button
          class="close"
          aria-label="Close this menu"
          title="Close this menu"
          @click=${this.closePanel}
        >
          ${Ko}
        </button>
      </header>
    `}get closeButton(){return d`
      <button
        class="close"
        aria-label="Close this menu"
        title="Close this menu"
        @click=${this.closeMenu}
      >
        ${Ko}
      </button>
    `}render(){return d`
      <div class="main" @keydown=${this.handleKeyDown}>
        <div class="menu ${this.sliderDetailsClass}">
          ${this.closeButton}
          <ul class="menu-list">
            ${this.menuItems}
          </ul>
          <div
            class="content ${this.selectedMenuClass}"
            @menuTypeSelected=${this.setSelectedMenu}
          >
            ${this.renderMenuHeader}
            <section>
              <div class="selected-menu">
                ${this.selectedMenuDetails?.component||y}
              </div>
            </section>
          </div>
        </div>
      </div>
    `}static get styles(){const i=_`42px`,e=_`var(--item-navigator-menu-width--)`,t=_`var(--item-navigator-animation-timing--)`;return[z,_`
        :host {
          --item-navigator-menu-width--: var(
            --item-navigator-menu-width,
            320px
          );
          --item-navigator-animation-timing--: var(
            --item-navigator-animation-timing,
            200ms
          );
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-menu-slider-bg--: var(
            --item-navigator-menu-slider-bg,
            #212121
          );
          --item-navigator-active-button-bg--: var(
            --item-navigator-active-button-bg,
            var(--mid-gray)
          );
          --item-navigator-subpanel-border-color--: var(
            --item-navigator-subpanel-border-color,
            #4b4b4b
          );
          --item-navigator-header-icon-width--: var(
            --item-navigator-header-icon-width,
            2em
          );
          --item-navigator-header-icon-height--: var(
            --item-navigator-header-icon-height,
            2em
          );
          --item-navigator-icon-fill-color--: var(
            --item-navigator-icon-fill-color,
            var(--true-white)
          );

          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        .main {
          overflow: hidden;
          width: 100%;
          height: 100%;
        }

        .animate {
          transition: transform ${t} ease-out;
        }

        .menu {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: ${e};
          padding: 0.5em 0.5em 0 0;
          box-sizing: border-box;
          font-size: 1.4em;
          color: var(--item-navigator-text-color--);
          background: var(--item-navigator-menu-slider-bg--);
          transform: translateX(calc(${e} * -1));
        }

        button {
          cursor: pointer;
        }

        header {
          margin: 0 0 0.5em 0;
        }

        header * {
          margin: 0;
          display: inline-block;
        }

        header button {
          cursor: pointer;
        }

        header.with-secondary-action .details {
          width: 80%;
        }

        header .details {
          font-weight: bold;
          width: 88%;
        }

        header .custom-action > *,
        button.close {
          padding: 0;
          background-color: transparent;
          border: 0;
        }

        header .custom-action,
        button.close {
          position: absolute;
        }

        button.close {
          /* Reset to the base so the header icon (em) doesn't compound
             against .menu's enlarged font-size. */
          font-size: var(--item-navigator-base-font-size, 10px);
          min-width: 38px;
          min-height: 38px;
          display: flex;
          justify-content: center;
          align-items: center;
          right: 0;
          top: 0;
        }

        button.close .ia-icon {
          width: var(--item-navigator-header-icon-width--);
          height: var(--item-navigator-header-icon-height--);
        }

        .ia-icon .fill-color {
          fill: var(--item-navigator-icon-fill-color--);
        }

        .content {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: ${i};
          z-index: 1;
          transform: translateX(calc(${e} * -1));
          transition: transform ${t} ease-out;
          background: var(--item-navigator-active-button-bg--);
          border-right: 0.2em solid;
          border-color: var(--item-navigator-subpanel-border-color--);
          padding: 0.5em 0 0 0.5em;
          display: flex;
          flex-direction: column;
        }

        .open {
          transform: translateX(0);
        }

        .menu-list {
          padding: 0;
          margin: 0;
          list-style: none;
          background: var(--item-navigator-menu-slider-bg--);
        }

        .menu-list li {
          margin-bottom: 0.2em;
        }

        .content > section {
          overflow: auto;
          overscroll-behavior: contain;
        }
      `]}};ne([u({type:Array})],ee.prototype,"menus",2);ne([u({type:Boolean})],ee.prototype,"open",2);ne([u({type:Boolean})],ee.prototype,"manuallyHandleClose",2);ne([u({type:String})],ee.prototype,"selectedMenu",2);ne([u({type:Object})],ee.prototype,"selectedMenuAction",2);ne([u({type:Boolean})],ee.prototype,"animateMenuOpen",2);ne([S(".content.open button.close")],ee.prototype,"contentCloseButton",2);ne([S(".menu-list")],ee.prototype,"menuList",2);ee=ne([C("ia-menu-slider")],ee);var ys=Object.defineProperty,ws=Object.getOwnPropertyDescriptor,Vr=(i,e,t,o)=>{for(var r=o>1?void 0:o?ws(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&ys(e,t,r),r};let Ci=class extends x{constructor(){super(...arguments),this.loaderMessage=""}get bookIconSvg(){return no`
      <g class="bookIcon" transform="matrix(1 0 0 -1 28 67.362264)">
        <path d="m44.71698 31.6981124v-29.99320678s-18.0956599.30735848-18.6322637-.7171698c-.0633962-.12226414-1.890566-.59207545-2.9745282-.59207545-1.3228302 0-3.5122641 0-4.1286791.74547168-.9707547 1.17452827-18.82811278.71660375-18.82811278.71660375v30.040754l1.83849052.7867924.29094339-28.48188608s15.94981097.15339622 17.09094297-1.10716978c.8145283-.90056602 4.997547-.91641507 5.3450942-.3526415.9611321 1.55716977 14.7101883 1.31716978 17.6077354 1.45981128l.3266038 28.22830118z"/>
        <path d="m40.1129424 33.5957539h-12.8337733c-1.8690565 0-3.1098112-.7545283-3.9299999-1.6279245v-26.70452764l1.2362264-.00792453c.4584906.72962262 3.0922641 1.39415091 3.0922641 1.39415091h10.1298111s1.0381131.01754717 1.5141509.47377357c.5643396.54056602.7913207 1.36981129.7913207 1.36981129z"/>
        <path d="m17.3354713 33.5957539h-12.8337733v-25.37660316s0-.75283017.49358489-1.14113205c.52867924-.41433961 1.3415094-.42849055 1.3415094-.42849055h10.59905631s2.2075471-.52698112 3.0928301-1.39415091l1.2.00792453v26.74245214c-.8201886.8581132-2.0530188 1.59-3.8932074 1.59"/>
      </g>
    `}get icon(){return this.bookIconSvg}get loader(){return no`
    <svg
      height="100"
      viewBox="0 0 100 100"
      width="100"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="item-loading"
    >
      <title id="item-loading">Currently loading viewer.</title>
      <desc>Please wait while we load theater.</desc>
      <g fill="#333" fill-rule="evenodd" class="book-icon">
        ${this.icon}
        <path
          class="ring"
          d="m17.8618849 11.6970233c18.5864635-15.59603144 45.6875867-15.59603102 64.2740497.000001 1.9271446 1.6170806 2.1785128 4.4902567.5614466 6.4174186-1.6170661 1.9271618-4.4902166 2.1785323-6.4173612.5614517-15.1996922-12.75416882-37.3625282-12.75416916-52.5622206-.000001-15.19969387 12.7541707-19.04823077 34.5805019-9.1273354 51.7641499 9.9208955 17.183646 30.7471499 24.7638499 49.3923323 17.9774983 18.6451823-6.7863521 29.7266014-25.9801026 26.2811129-45.5206248-.436848-2.4775114 1.2174186-4.8400696 3.6949079-5.2769215 2.4774893-.4368518 4.8400264 1.2174296 5.2768744 3.694941 4.2132065 23.8945096-9.3373563 47.3649806-32.137028 55.6634567-22.799672 8.2984758-48.2663986-.9707372-60.39785211-21.9832155-12.1314534-21.012481-7.42539173-47.7021198 11.16107351-63.2981544z"
          fill-rule="nonzero"
        />
      </g>
    </svg>
    `}render(){const i=this.loaderMessage?d`<h2>${this.loaderMessage}</h2>`:y;return d`
      <div class="place-holder">
        ${i} ${this.loader}
        <h3>Loading viewer</h3>
      </div>
    `}static get styles(){return[z,_`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );

          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        .place-holder {
          width: 30%;
          margin: auto;
          text-align: center;
          color: var(--item-navigator-text-color--);
          position: relative;
        }

        .place-holder svg {
          display: block;
          width: 60%;
          max-width: 100px;
          height: auto;
          margin: auto;
        }

        svg * {
          fill: var(--item-navigator-text-color--);
        }

        svg .ring {
          animation: rotate 1.3s infinite linear;
          transform-origin: 50px 50px;
          transform-box: fill-box;
          display: block; /* transform won't work on inline style */
        }

        @keyframes rotate {
          0% {
            transform: rotate(-360deg);
          }
        }
      `]}};Vr([u({type:String})],Ci.prototype,"loaderMessage",2);Ci=Vr([C("ia-itemnav-loader")],Ci);var $s=Object.defineProperty,xs=Object.getOwnPropertyDescriptor,zr=(i,e,t,o)=>{for(var r=o>1?void 0:o?xs(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&$s(e,t,r),r};let Ai=class extends x{constructor(){super(...arguments),this.identifier=""}emitLoaded(){this.dispatchEvent(new CustomEvent("loadingStateUpdated",{detail:{loaded:!0}}))}updated(i){i.has("identifier")&&this.emitLoaded()}get downloadUrl(){return`/download/${this.identifier}`}render(){return d`
      <section>
        <h2>THERE IS NO PREVIEW AVAILABLE FOR THIS ITEM</h2>
        <p>
          This item does not appear to have any files that can be experienced on
          Archive.org. <br />
          Please download files in this item to interact with them on your
          computer.
        </p>
        <a href=${this.downloadUrl}>Show all files</a>
      </section>
    `}static get styles(){return[z,_`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          color: var(--item-navigator-text-color--);
          text-align: center;
          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        section {
          width: 100%;
          margin: 5%;
          padding: 0 5%;
        }

        p {
          font-size: 1.4em;
        }

        a {
          color: var(--item-navigator-text-color--);
          background-color: var(--navy-blue);
          min-height: 35px;
          cursor: pointer;
          line-height: normal;
          border-radius: 0.4em;
          text-align: center;
          vertical-align: middle;
          font-size: 1.4em;
          font-family: var(--base-font-family);
          display: inline-block;
          padding: 0.85em 1.2em;
          border: 1px solid var(--lightest-gray);
          white-space: nowrap;
          appearance: auto;
          box-sizing: border-box;
          user-select: none;
          text-decoration: none;
        }
      `]}};zr([u({type:String})],Ai.prototype,"identifier",2);Ai=zr([C("ia-no-theater-available")],Ai);var _s=Object.defineProperty,Ss=Object.getOwnPropertyDescriptor,D=(i,e,t,o)=>{for(var r=o>1?void 0:o?Ss(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&_s(e,t,r),r};let B=class extends x{constructor(){super(...arguments),this.viewAvailable=!0,this.baseHost="archive.org",this.signedIn=!1,this.menuContents=[],this.menuShortcuts=[],this.viewportInFullscreen=null,this.menuOpened=!1,this.loaded=!1,this.openMenuState="shift"}disconnectedCallback(){super.disconnectedCallback(),this.removeResizeObserver()}updated(i){i.has("sharedObserver")&&(i.get("sharedObserver")?.removeObserver(this.resizeObserverConfig),this.setResizeObserver())}handleResize(i){const{width:e}=i.contentRect;if(e<=600){this.openMenuState="overlay";return}this.openMenuState="shift"}setResizeObserver(){this.sharedObserver?.addObserver(this.resizeObserverConfig),this.sharedObserver?.addObserver({target:this.headerSlot,handler:{handleResize:({contentRect:i})=>{i.height&&this.requestUpdate()}}})}removeResizeObserver(){this.sharedObserver?.removeObserver(this.resizeObserverConfig)}get resizeObserverConfig(){return{handler:this,target:this.frame}}get loaderTitle(){return this.viewportInFullscreen?"Internet Archive":""}get loadingArea(){return d`
      <div class="loading-area">
        <div class="loading-view">
          <ia-itemnav-loader
            .loaderMessage=${this.loaderTitle}
          ></ia-itemnav-loader>
        </div>
      </div>
    `}slotChange(i,e){const t=i.target.assignedNodes()?.[0];this.dispatchEvent(new CustomEvent("slotChange",{detail:{slot:t,type:e}})),this.requestUpdate()}render(){const i=this.loaded?"":"hidden",e=this.headerSlot?.assignedNodes()[0]?.offsetHeight||0;return d`
      <div id="frame" class=${this.menuClass}>
        <slot
          name="header"
          style=${`height: ${e}px`}
          @slotchange=${t=>this.slotChange(t,"header")}
        ></slot>
        <div class="menu-and-reader">
          ${this.shouldRenderMenu?this.renderSideMenu:y}
          <div id="reader" class=${i}>
            ${this.renderViewport}
          </div>
          ${this.loaded?y:this.loadingArea}
        </div>
      </div>
    `}get noTheaterView(){return d`<ia-no-theater-available
      .identifier=${this.item?.metadata?.identifier}
      @loadingStateUpdated=${this.loadingStateUpdated}
    ></ia-no-theater-available>`}get renderViewport(){if(!this.viewAvailable)return this.noTheaterView;const i=this.loaded?"opacity: 1;":"opacity: 0;";return d`
      <div slot="main" style=${i}>
        <slot
          name="main"
          @slotchange=${e=>this.slotChange(e,"main")}
        ></slot>
      </div>
    `}loadingStateUpdated(i){const{loaded:e}=i.detail;this.loaded=e??!1}manageViewportFullscreen(i){const e=!!i.detail.isFullScreen;this.viewportInFullscreen=e||null;const t=new CustomEvent("fullscreenToggled",{detail:i.detail});this.dispatchEvent(t)}get shouldRenderMenu(){return!!this.menuContents?.length}toggleMenu(i=void 0){this.menuOpened=i!==void 0?i:!this.menuOpened,this.menuOpened?this.updateComplete.then(()=>{this.menuSlider?.shadowRoot?.querySelector("button.close")?.focus()}):this.updateComplete.then(()=>{this.toggleMenuButton?.focus()})}closeMenu(){this.toggleMenu(!1)}setOpenMenu(i){const{id:e}=i.detail;this.openMenu=e!==this.openMenu?e:void 0}closeSidePanel(){this.openMenu=void 0}setMenuContents(i){const e=[...i.detail];this.menuContents=e}setMenuShortcuts(i){this.menuShortcuts=[...i.detail]}manageSideMenuEvents(i){const{menuId:e,action:t}=i.detail;e&&(t==="open"?this.openShortcut(e):t==="toggle"&&(this.openMenu=e,this.toggleMenu()))}get menuToggleButton(){return d`
      <button
        class="toggle-menu"
        @click=${()=>this.toggleMenu()}
        title="Open side panel"
        aria-label="Open side panel"
        aria-expanded="false"
      >
        ${gs}
      </button>
    `}get selectedMenuId(){return this.openMenu||""}get renderSideMenu(){return d`
      <nav>
        <div
          class="minimized ${yt({hidden:this.menuOpened})}"
          part="minimized-menu"
        >
          ${this.shortcuts} ${this.menuToggleButton}
        </div>
        <div id="menu" ?inert=${!this.menuOpened}>
          <ia-menu-slider
            .menus=${this.menuContents}
            .selectedMenu=${this.selectedMenuId}
            @menuTypeSelected=${this.setOpenMenu}
            @menuPanelClosed=${this.closeSidePanel}
            @menuSliderClosed=${this.closeMenu}
            manuallyHandleClose
            open
          ></ia-menu-slider>
        </div>
      </nav>
    `}openShortcut(i=""){this.openMenu=i,this.menuOpened=!0}get shortcuts(){const i=this.menuShortcuts.map(({icon:e,id:t,label:o})=>t==="fullscreen"?d`${e}`:d`
        <button
          class="shortcut ${t}"
          @click=${()=>this.openShortcut(t)}
          title=${o}
          aria-label=${o}
          aria-expanded="false"
        >
          ${e}
        </button>
      `);return d`<div class="shortcuts">${i}</div>`}get menuClass(){const i=this.menuContents?.length||this.menuShortcuts?.length,e=this.menuOpened&&i?"open":"",t=this.viewportInFullscreen?"fullscreen":"";return`${e} ${t} ${this.openMenuState}`}static get styles(){const i=_`var(--item-navigator-menu-width--)`,e=_`var(--item-navigator-animation-timing--)`,t=_`transform ${e} ease-out`,o=_`var(--item-navigator-menu-margin--)`,r=_`var(--item-navigator-theater-bg-color--)`,a=_`var(--item-navigator-icon-width--)`,n=_`var(--item-navigator-icon-height--)`;return[z,_`
        :host {
          --item-navigator-menu-width--: var(
            --item-navigator-menu-width,
            320px
          );
          --item-navigator-animation-timing--: var(
            --item-navigator-animation-timing,
            200ms
          );
          --item-navigator-menu-margin--: var(
            --item-navigator-menu-margin,
            42px
          );
          --item-navigator-theater-bg-color--: var(
            --item-navigator-theater-bg-color,
            #000
          );
          --item-navigator-icon-width--: var(
            --item-navigator-icon-width,
            2.4em
          );
          --item-navigator-icon-height--: var(
            --item-navigator-icon-height,
            2.4em
          );
          --item-navigator-icon-stroke-color--: var(
            --item-navigator-icon-stroke-color,
            var(--true-white)
          );
          --item-navigator-icon-fill-color--: var(
            --item-navigator-icon-fill-color,
            var(--true-white)
          );

          /*
           * The component's internal sizing is expressed in em against this
           * base (10px matches petabox's base font size, which the upstream
           * demo set on the document root). Anchoring it here makes the
           * navigator self-contained — its scale no longer depends on the
           * consumer's root font-size. Override to rescale everything.
           */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        :host,
        #frame,
        .menu-and-reader {
          position: relative;
          overflow: hidden;
          display: block;
        }

        :host,
        #frame,
        .loading-area,
        .loading-view {
          min-height: inherit;
          height: inherit;
        }

        slot {
          display: block;
          width: 100%;
        }

        slot * {
          display: block;
          height: inherit;
        }

        #frame {
          background-color: ${r};
          color-scheme: dark;
          display: flex;
          flex-direction: column;
        }

        #frame.fullscreen {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9;
        }

        .loading-view {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-area {
          width: 100%;
        }

        ia-itemnav-loader {
          display: block;
          width: 100%;
        }

        .hidden {
          display: none !important;
        }

        button {
          /* Buttons don't inherit font-size from the UA stylesheet; inherit it
             so em-sized icons resolve against the component's base, not the
             browser's default button font-size. */
          font: inherit;
          cursor: pointer;
          padding: 0;
          border: 0;
        }

        .menu-and-reader {
          position: relative;
          display: flex;
          flex: 1;
        }

        nav button {
          background: none;
        }

        nav .minimized {
          background: rgba(0, 0, 0, 0.7);
          padding-top: 6px;
          position: absolute;
          width: ${o};
          z-index: 2;
          left: 0;
          border-bottom-right-radius: 5%;
        }

        nav .minimized button {
          margin-bottom: 0.2em;
          margin: auto;
          display: inline-flex;
          vertical-align: middle;
          align-items: center;
          justify-content: center;
          width: ${o};
          height: ${o};
        }

        nav .minimized button > * {
          /** Prevent the icon's SVG description from stealing tooltip message */
          pointer-events: none;
        }

        nav .minimized button.toggle-menu > * {
          border: 2px solid var(--item-navigator-icon-stroke-color--);
          border-radius: ${a};
          width: ${a};
          height: ${n};
          margin: auto;
        }

        .toggle-menu .ia-icon,
        .shortcuts .ia-icon {
          width: ${a};
          height: ${n};
        }

        .ia-icon .fill-color {
          fill: var(--item-navigator-icon-fill-color--);
        }

        #menu {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 3;
          overflow: hidden;
          width: ${i};
          transform: translateX(calc(${i} * -1));
          transition: ${t};
        }

        #reader {
          position: relative;
          z-index: 1;
          transform: translateX(0);
          width: 100%;
          display: flex;
          /*
           * Ease the reader's size/position changes so the slotted theater
           * glides in sync with the sliding drawer (shift mode) and settles
           * smoothly on resize, rather than snapping. Overlay mode opts out
           * below so the full-width theater tracks resizes instantly.
           */
          transition:
            width ${e} ease-out,
            margin-left ${e} ease-out,
            transform ${e} ease-out;
        }

        #reader > * {
          width: 100%;
          display: flex;
          flex: 1;
        }

        .open.overlay #reader {
          transition: none;
        }

        .open #menu {
          width: ${i};
          transform: translateX(0);
          transition: ${t};
        }

        .open.shift #reader {
          width: calc(100% - ${i});
          margin-left: ${i};
        }
      `]}};D([u({type:Object,converter:i=>i&&typeof i=="string"?new Br(JSON.parse(atob(i))):i})],B.prototype,"item",2);D([u({type:Boolean,reflect:!0})],B.prototype,"viewAvailable",2);D([u({type:String})],B.prototype,"baseHost",2);D([u({type:Boolean})],B.prototype,"signedIn",2);D([u({type:Array})],B.prototype,"menuContents",2);D([u({type:Array})],B.prototype,"menuShortcuts",2);D([u({type:Boolean,reflect:!0,attribute:!0})],B.prototype,"viewportInFullscreen",2);D([u({type:Boolean,reflect:!0})],B.prototype,"menuOpened",2);D([u({type:String,reflect:!0})],B.prototype,"openMenu",2);D([u({attribute:!1})],B.prototype,"modal",2);D([u({attribute:!1})],B.prototype,"sharedObserver",2);D([u({type:Boolean,reflect:!0,attribute:!0})],B.prototype,"loaded",2);D([w()],B.prototype,"openMenuState",2);D([S("#frame")],B.prototype,"frame",2);D([S('slot[name="header"]')],B.prototype,"headerSlot",2);D([S("ia-menu-slider")],B.prototype,"menuSlider",2);D([S("button.toggle-menu")],B.prototype,"toggleMenuButton",2);B=D([C("ia-item-navigator")],B);const Zo=(i,e,t)=>{const o=new Map;for(let r=e;r<=t;r++)o.set(i[r],r);return o},Cs=gt(class extends mt{constructor(i){if(super(i),i.type!==re.CHILD)throw Error("repeat() can only be used in text expressions")}dt(i,e,t){let o;t===void 0?t=e:e!==void 0&&(o=e);const r=[],a=[];let n=0;for(const l of i)r[n]=o?o(l,n):n,a[n]=t(l,n),n++;return{values:a,keys:r}}render(i,e,t){return this.dt(i,e,t).values}update(i,[e,t,o]){const r=Ra(i),{values:a,keys:n}=this.dt(e,t,o);if(!Array.isArray(r))return this.ut=n,a;const l=this.ut??=[],s=[];let p,g,h=0,v=r.length-1,b=0,A=a.length-1;for(;h<=v&&b<=A;)if(r[h]===null)h++;else if(r[v]===null)v--;else if(l[h]===n[b])s[b]=ve(r[h],a[b]),h++,b++;else if(l[v]===n[A])s[A]=ve(r[v],a[A]),v--,A--;else if(l[h]===n[A])s[A]=ve(r[h],a[A]),et(i,s[A+1],r[h]),h++,A--;else if(l[v]===n[b])s[b]=ve(r[v],a[b]),et(i,r[h],r[v]),v--,b++;else if(p===void 0&&(p=Zo(n,b,A),g=Zo(l,h,v)),p.has(l[h]))if(p.has(l[v])){const k=g.get(n[b]),Ft=k!==void 0?r[k]:null;if(Ft===null){const Ji=et(i,r[h]);ve(Ji,a[b]),s[b]=Ji}else s[b]=ve(Ft,a[b]),et(i,r[h],Ft),r[k]=null;b++}else Kt(r[v]),v--;else Kt(r[h]),h++;for(;b<=A;){const k=et(i,s[A+1]);ve(k,a[b]),s[b++]=k}for(;h<=v;){const k=r[h++];k!==null&&Kt(k)}return this.ut=n,gr(i,s),K}});var As=Object.defineProperty,Os=Object.getOwnPropertyDescriptor,Je=(i,e,t,o)=>{for(var r=o>1?void 0:o?Os(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&As(e,t,r),r};const Go=d`
  <svg
    class="ia-icon"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="viewableFilesTitleID"
  >
    <title id="viewableFilesTitleID">Viewable Files</title>
    <g class="fill-color">
      <path
        d="m9.83536396 0h10.07241114c.1725502.47117517.3378411.76385809.4958725.87804878.1295523.11419069.3199719.1998337.5712586.25692905.2512868.05709534.4704647.08564301.6575337.08564301h.2806036v15.24362526h-4.3355343v3.8106985h-4.44275v3.7250554h-12.01318261c-.27306495 0-.50313194-.085643-.69020098-.256929-.18706903-.1712861-.30936193-.3425721-.36687867-.5138581l-.06449694-.2785477v-14.2159091c0-.32815965.08627512-.5922949.25882537-.79240577.17255024-.20011086.34510049-.32150776.51765073-.36419068l.25882537-.0640244h3.36472977v-2.54767184c0-.31374722.08627513-.57067627.25882537-.77078714.17255025-.20011086.34510049-.32150776.51765074-.36419068l.25882536-.06402439h3.36472978v-2.56929047c0-.32815964.08627512-.5922949.25882537-.79240576.17255024-.20011087.34510049-.31430156.51765073-.34257207zm10.78355264 15.6294346v-13.53076498c-.2730649-.08536585-.4456152-.16380266-.5176507-.23531042-.1725502-.1424612-.2730649-.27078714-.3015441-.38497783v13.36031043h-9.87808272c0 .0144124-.02149898.0144124-.06449694 0-.04299795-.0144124-.08962561.006929-.13988296.0640244-.05025735.0570953-.07538603.1427383-.07538603.256929s.02149898.210643.06449694.289357c.04299795.078714.08599591.1322062.12899387.1604767l.06449693.0216187h10.71905571zm-10.2449613-2.4412417h7.98003v-11.60421286h-7.98003zm1.6827837-9.41990022h4.6153002c.1725502 0 .3199718.05349224.4422647.16047672s.1834393.23891353.1834393.39578714c0 .15687362-.0611464.28519956-.1834393.38497783s-.2697145.1496674-.4422647.1496674h-4.6153002c-.1725503 0-.3199719-.04988913-.4422647-.1496674-.1222929-.09977827-.1834394-.22810421-.1834394-.38497783 0-.15687361.0611465-.28880266.1834394-.39578714.1222928-.10698448.2697144-.16047672.4422647-.16047672zm-6.08197737 13.50997782h7.72120467v-.8131929h-3.79610541c-.27306495 0-.49950224-.085643-.67931188-.256929-.17980964-.1712861-.29847284-.3425721-.35598958-.5138581l-.06449694-.2785477v-10.02023282h-2.82530086zm6.77217827-11.36890243h3.2139578c.1295522 0 .240956.05709534.3342113.17128603.0932554.11419069.139883.24972284.139883.40659645 0 .15687362-.0466276.28880267-.139883.39578714-.0932553.10698448-.2046591.16047672-.3342113.16047672h-3.2139578c-.1295523 0-.2373264-.05349224-.3233223-.16047672-.0859959-.10698447-.1289938-.23891352-.1289938-.39578714 0-.15687361.0429979-.29240576.1289938-.40659645s.19377-.17128603.3233223-.17128603zm-11.15043132 15.11557653h7.69942646v-.7491685h-3.79610539c-.25854616 0-.48135376-.0892462-.66842279-.2677384-.18706904-.1784922-.30936193-.3605876-.36687868-.546286l-.06449694-.2569291v-10.04101994h-2.80352266zm14.62237682-4.5606985h-.8191949v2.1410754h-9.89986085s-.04299796.0285477-.12899387.085643c-.08599592.0570954-.12201369.1427384-.10805331.2569291 0 .1141907.01786928.210643.05360784.289357.03573856.0787139.07538603.125.1189424.138858l.06449694.0432373h10.71905575v-2.9542683zm-4.3991936 3.8106985h-.8191949v2.077051h-9.8563045c0 .0144124-.02149898.0144124-.06449694 0-.04299795-.0144125-.08962561.0105321-.13988296.0748337-.05025735.0643015-.07538603.1607538-.07538603.289357 0 .1141906.02149898.2070399.06449694.2785476.04299795.0715078.08599591.1141907.12899387.1280488l.06449693.0216186h10.69811519v-2.8686252z"
      />
    </g>
  </svg>
`;let Pe=class extends x{constructor(){super(...arguments),this.baseHost="archive.org",this.sortOrderBy="default",this.subPrefix="",this.fileList=[],this.addSortToUrl=!1}firstUpdated(){const i=this.shadowRoot?.querySelector(".content.active");setTimeout(()=>{const e=i;e?.scrollIntoViewIfNeeded?e.scrollIntoViewIfNeeded(!0):i?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})},350)}fileUrl(i){const e=`//${this.baseHost}${i.url_path}`;return this.addSortToUrl&&this.sortOrderBy!=="default"?`${e}?sort=${this.sortOrderBy}`:e}get pdfLabel(){return d`<span class="pdf-label"
      ><span class="sr-only">view this</span> PDF</span
    >`}fileLi(i){const e=this.subPrefix===i.file_subprefix?" active":"",t=this.fileUrl(i),o=(i.file_source??"").match(/^[^+]+\.pdf$/i);return d`
      <li>
        <div class="separator"></div>
        <div class="content${e}">
          <a href=${t}>
            <p class="item-title">
              ${i.title}${o?this.pdfLabel:y}
            </p>
          </a>
        </div>
      </li>
    `}get fileListTemplate(){const i=Cs(this.fileList,e=>e?.file_prefix,this.fileLi.bind(this));return d`
      <ul>
        ${i}
        <div class="separator"></div>
      </ul>
    `}render(){return d`${this.fileList.length?this.fileListTemplate:y}`}static get styles(){return[z,_`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-separator-color--: var(
            --item-navigator-separator-color,
            #4b4b4b
          );
          --item-navigator-active-file-border-color--: var(
            --item-navigator-active-file-border-color,
            #538bc5
          );

          display: block;
          overflow-y: auto;
          box-sizing: border-box;
          color: var(--item-navigator-text-color--);
          margin-top: 14px;
          margin-bottom: 2em;
          --active-border-width--: 2px;
          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        a {
          color: var(--item-navigator-text-color--);
          text-decoration: none;
        }

        ul {
          padding: 0;
          list-style: none;
          margin: var(--active-border-width--) 0.5em 1em 0;
        }

        ul > li:first-child .separator {
          display: none;
        }

        li {
          cursor: pointer;
          position: relative;
        }

        li .content {
          border: var(--active-border-width--) solid transparent;
          padding: 0.2em 0 0.4em 0.2em;
        }

        li .content.active {
          border: var(--active-border-width--) solid
            var(--item-navigator-active-file-border-color--);
        }

        li.content a {
          display: flex;
        }

        .item-title {
          margin-block-start: 0em;
          margin-block-end: 0em;
          font-size: 14px;
          font-weight: bold;
          word-wrap: break-word;
          padding-left: 5px;
        }

        .separator {
          background-color: var(--item-navigator-separator-color--);
          width: 98%;
          margin: 1px auto;
          height: 1px;
        }

        .pdf-label {
          border: 1px solid;
          padding: 2px 5px;
          border-radius: 20px;
          display: inline-block;
          margin-left: 5px;
          font-size: 0.9em;
        }

        .pdf-label .sr-only {
          position: absolute;
          clip: rect(1px, 1px, 1px, 1px);
          padding: 0;
          border: 0;
          height: 1px;
          width: 1px;
          overflow: hidden;
        }
      `]}};Je([u({type:String})],Pe.prototype,"baseHost",2);Je([u({type:String})],Pe.prototype,"sortOrderBy",2);Je([u({type:String})],Pe.prototype,"subPrefix",2);Je([u({type:Array})],Pe.prototype,"fileList",2);Je([u({type:Boolean,reflect:!0})],Pe.prototype,"addSortToUrl",2);Pe=Je([C("ia-viewable-files-panel")],Pe);var Ts=Object.defineProperty,Es=Object.getOwnPropertyDescriptor,Ht=(i,e,t,o)=>{for(var r=o>1?void 0:o?Es(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Ts(e,t,r),r};const ks=d`
  <svg name="sort-asc" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd">
      <path
        d="m2.32514544 8.30769231.7756949-2.08468003h2.92824822l.75630252 2.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976 6.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z"
        fill="currentColor"
        fill-rule="nonzero"
      />
      <path
        d="m7.1689722 16.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666 5.3716871v.7756949z"
        fill="currentColor"
        fill-rule="nonzero"
      />
      <path
        d="m10.3846154 11.0769231 2.7692308 5.5384615 2.7692307-5.5384615m-2.7692307 4.1538461v-13.15384612"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.661538"
        transform="matrix(1 0 0 -1 0 18.692308)"
      />
    </g>
  </svg>
`,Ps=d`
  <svg name="sort-desc" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd">
      <path
        d="m2.32514544 8.30769231.7756949-2.08468003h2.92824822l.75630252 2.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976 6.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z"
        fill="currentColor"
        fill-rule="nonzero"
      />
      <path
        d="m7.1689722 16.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666 5.3716871v.7756949z"
        fill="currentColor"
        fill-rule="nonzero"
      />
      <path
        d="m10.3846154 11.0769231 2.7692308 5.5384615 2.7692307-5.5384615m-2.7692307 4.1538461v-13.15384612"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.661538"
      />
    </g>
  </svg>
`,Ms=d`
  <svg
    name="sort-neutral"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="currentColor" fill-rule="evenodd">
      <path
        d="m2.32514544 8.30769231.7756949-2.08468003h2.92824822l.75630252 2.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976 6.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z"
        fill-rule="nonzero"
      />
      <path
        d="m7.1689722 16.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666 5.3716871v.7756949z"
        fill-rule="nonzero"
      />
      <circle cx="13" cy="9" r="2" />
    </g>
  </svg>
`;let ut=class extends x{constructor(){super(...arguments),this.fileListRaw=[],this.fileListSorted=[],this.sortOrderBy="default"}render(){return d`<div class="sort-multi-file-list">${this.sortButton}</div>`}get sortButton(){return{default:d`
        <button
          class="sort-by neutral-icon"
          aria-label="Sort volumes in initial order"
          @click=${()=>this.sortVolumes("title_asc")}
        >
          ${Ms}
        </button>
      `,title_asc:d`
        <button
          class="sort-by asc-icon"
          aria-label="Sort volumes in ascending order"
          @click=${()=>this.sortVolumes("title_desc")}
        >
          ${ks}
        </button>
      `,title_desc:d`
        <button
          class="sort-by desc-icon"
          aria-label="Sort volumes in descending order"
          @click=${()=>this.sortVolumes("default")}
        >
          ${Ps}
        </button>
      `}[this.sortOrderBy]}sortVolumes(i){this.sortOrderBy=i;const e=[...this.fileListRaw].sort((t,o)=>i==="title_asc"?t.title.localeCompare(o.title):i==="title_desc"?o.title.localeCompare(t.title):(t.orig_sort??0)-(o.orig_sort??0));this.dispatchEvent(new CustomEvent("fileListSorted",{detail:{sortType:i,sortedFiles:e},bubbles:!0,composed:!0})),this.fileListSorted=e}static get styles(){return[z,_`
        :host {
          --item-navigator-header-icon-width--: var(
            --item-navigator-header-icon-width,
            18px
          );
          --item-navigator-header-icon-height--: var(
            --item-navigator-header-icon-height,
            18px
          );
          --item-navigator-icon-fill-color--: var(
            --item-navigator-icon-fill-color,
            var(--true-white)
          );

          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        button.sort-by {
          padding: 0;
          background-color: transparent;
          border: 0;
          cursor: pointer;
          color: var(--item-navigator-icon-fill-color--);
          display: inline-flex;
        }

        button.sort-by svg {
          width: var(--item-navigator-header-icon-width--);
          height: var(--item-navigator-header-icon-height--);
        }
      `]}};Ht([u({type:Array})],ut.prototype,"fileListRaw",2);Ht([u({type:Array})],ut.prototype,"fileListSorted",2);Ht([u({type:String,reflect:!0})],ut.prototype,"sortOrderBy",2);ut=Ht([C("ia-sort-files-button")],ut);const Jo=d`
  <svg
    class="ia-icon"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g class="fill-color">
      <path
        d="M70.6784759,10 L70.6784759,21.3240186 C64.5020053,21.66334 58.9104278,22.5826126 53.9037433,24.0818363 C48.8970588,25.5810601 44.8495989,27.4085163 41.7613636,29.5642049 C38.6731283,31.7198935 35.9982175,34.0552229 33.736631,36.5701929 C31.4750446,39.085163 29.8217469,41.5657574 28.776738,44.011976 C27.7317291,46.4581947 26.9173351,48.6848525 26.3335561,50.6919494 C25.7497772,52.6990464 25.4088681,54.3324462 25.3108289,55.592149 L25.2372995,57.4085163 C29.0296346,54.1661122 33.1751337,51.5524507 37.6737968,49.5675316 C42.1724599,47.5826126 46.2934492,46.3118208 50.0367647,45.7551564 C53.7800802,45.1984919 57.2571301,44.8713684 60.4679144,44.7737858 C63.6786988,44.6762031 66.1831551,44.7726769 67.9812834,45.0632069 L70.6784759,45.499002 L70.6784759,57.4051896 L100,33.3765802 L70.6784759,10 Z M76.4438503,62.4883566 L82.8609626,57.1157685 C82.9099822,57.0669772 82.9946524,57.0303837 83.1149733,57.005988 C83.2352941,56.9815924 83.4536542,56.9571967 83.7700535,56.9328011 C84.0864528,56.9084054 84.3905971,56.9449989 84.6824866,57.0425815 C84.9743761,57.1401641 85.217246,57.2854291 85.4110963,57.4783766 C85.6049465,57.671324 85.7263815,57.8409847 85.7754011,57.9873586 L85.8489305,58.2035928 L85.8489305,90 L0,90 L0,17.910845 L43.1784759,17.910845 C43.2765152,17.9596363 43.410205,18.0317143 43.5795455,18.1270792 C43.7488859,18.222444 43.9438503,18.4519849 44.1644385,18.8157019 C44.3850267,19.1794189 44.469697,19.5542249 44.4184492,19.9401198 C44.4184492,20.2794411 44.3092692,20.582169 44.0909091,20.8483034 C43.872549,21.1144378 43.6664439,21.3206919 43.4725936,21.4670659 L43.1818182,21.6134398 C40.557041,23.06609 38.2954545,24.396762 36.3970588,25.6054558 L30.7820856,29.8170326 L11.5274064,29.8170326 L11.5274064,78.1669993 L74.1811497,78.1669993 L74.1811497,65.5355955 C74.1811497,65.1009093 74.3995098,64.6407186 74.8362299,64.1550233 L76.4438503,62.4883566 Z"
      />
    </g>
  </svg>
`,Is=d`
  <svg
    class="ia-icon"
    viewBox="0 0 34 34"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m31.5297453 8.76273313c-.3135031.40766104-.7447036.83083673-1.2936015 1.26952707-.5488979.4386904-.9169698.7837578-1.1042157 1.0352022.1562166 2.319709-.1417719 4.5297454-.8939653 6.6301092-.7521935 2.1003638-1.8023754 3.9182538-3.1505457 5.45367-1.3481704 1.5354162-2.9627648 2.8284828-4.8437835 3.8791996-1.8810186 1.0507169-3.8321207 1.7483416-5.8533062 2.092874s-4.1215493.2894286-6.30109136-.1653114c-2.17954205-.45474-4.2092874-1.3401455-6.08923604-2.6562165 2.72737.4697196 5.67408517-.2514445 8.8401455-2.1634924-3.0719024-.7521935-4.88979241-2.2881447-5.45367-4.6078537 1.12882516.0631287 1.86550396.0631287 2.21003638 0-2.91568586-1.2850417-4.38904344-3.3693558-4.42007276-6.2529424.21934517.0310293.53284828.1487267.94050931.3530922s.78375775.3060133 1.12829017.3049433c-.81532206-.7211641-1.41076396-1.9045581-1.7863257-3.5501819-.37556173-1.64562376-.17173122-3.17355015.61149155-4.58377912 1.81789001 1.88101862 3.6908838 3.36989086 5.61898138 4.46661672 1.92809757 1.0967259 4.22426707 1.7547614 6.88850847 1.9741066-.2503745-1.1908838-.1722662-2.32719882.2343248-3.40894502.4065911-1.0817462 1.0416221-1.93612241 1.9050931-2.56312861.863471-.62700621 1.8114702-1.0817462 2.8439975-1.36421999 1.0325272-.28247378 2.0827091-.27444896 3.1505456.02407447s1.9767815.87042585 2.726835 1.71570726c1.3791997-.37663172 2.6802911-.87845068 3.9032742-1.50545688-.0310293.37663171-.1407019.74470361-.3290178 1.1042157-.1883158.35951209-.3530922.62593623-.4943291.79927242s-.3841216.4317355-.728654.77519795c-.3445324.34346244-.5638776.57832227-.6580355.70457949.2193452-.09415792.6895998-.23539482 1.410764-.42371067.7211641-.18831586 1.2069334-.39214638 1.4573079-.61149155 0 .44350524-.1567516.86668093-.4702547 1.27434196z"
    />
  </svg>
`,Bs=d`
  <svg
    class="ia-icon"
    viewBox="0 0 34 34"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m30.91057 19.2442068.2670004-5.3339402h-5.7329237c-.0890001-3.4962895.25183-5.42243459 1.0224903-5.77843514.3560005-.17800028.8004955-.28925046 1.333485-.33375053s1.0442346-.0520853 1.5337353-.02275571c.4895008.02932959 1.045246.01466479 1.6672356-.04399439.0890001-1.59997977.1335002-3.24445961.1335002-4.93343953-2.1633102-.20732987-3.6742898-.28115953-4.5329389-.22148898-2.8146294.17800028-4.7847688 1.25965538-5.9104183 3.2449653-.1780003.3256596-.3261653.68873971-.444495 1.08924034-.1183298.40050062-.2144095.76358074-.2882391 1.08924034-.0738297.32565959-.125915.7848194-.1562559 1.37747942-.030341.59266002-.052591 1.04474028-.0667501 1.35624078-.0141592.3115005-.0217444.8449956-.0227558 1.6004854v1.5777298h-3.8229605v5.3339401h3.8669549v14.622824h5.8224296c0-.3560006-.0146648-1.6819003-.0439944-3.9776994-.0293296-2.295799-.0515796-4.2957737-.0667501-5.9999241s-.0075853-3.2525506.0227557-4.6452005h5.4219289z"
    />
  </svg>
`,Vs=d`
  <svg
    class="ia-icon"
    viewBox="0 0 34 34"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m8.50321407 8.54544475v5.32088575c.15641786.0310693.6819176.0310693 1.57649923 0 .8945816-.0310693 1.3574071.0160703 1.3884764.1414189.0942792 1.5695354.1333837 3.2253149.1173133 4.9673385-.0160703 1.7420236-.0316049 3.3426283-.0466039 4.8018141s.2046288 2.824628.6588835 4.0963267c.4542546 1.2716986 1.1999178 2.2209194 2.2369897 2.8476622 1.2556283.784232 2.9896167 1.207953 5.2019653 1.271163 2.2123485.0632099 4.1659648-.2506972 5.8608487-.9417213-.0310693-.3449764-.0230341-1.4045467.0241055-3.1787109.0471397-1.7741643-.0080351-2.75499-.1655244-2.9424772-3.5472571 1.0360005-5.697467.6904885-6.4506298-1.0365361-.7220934-1.6638147-.8635123-4.9909084-.4242566-9.981281v-.046604h6.7318605v-5.32088568h-6.7318605v-6.54383772h-4.0497228c-.2828378 1.28669763-.6122795 2.35376743-.9883252 3.20120941-.3760457.84744199-.98029 1.60060471-1.812733 2.25948817-.832443.65888347-1.87594303 1.01993018-3.1305 1.08314014z"
    />
  </svg>
`,zs=d`
  <svg
    class="ia-icon"
    viewBox="0 0 34 34"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m11.9051049 30.5873434.653491-1.0742755.4207845-.839975c.2805229-.591861.5371377-1.2533214.7698443-1.9843813.2327065-.7310599.4659444-1.6029125.6997135-2.6155579.2337692-1.0126455.4128151-1.752206.5371377-2.2186817.0308151.030815.0775689.0855382.1402615.1641697.0626927.0786314.1094465.1333547.1402615.1641697.1243227.1870153.2178304.311338.280523.372968 1.1210293.964829 2.3817888 1.4631823 3.7822785 1.4950599 1.4939973 0 2.8790795-.3426843 4.1552465-1.0280529 2.1166733-1.1826593 3.6733633-3.1128487 4.6700699-5.7905679.4048457-1.1518444.6848374-2.5996192.8399751-4.3433245.1243226-1.587505-.0781002-3.0974411-.6072685-4.5298084-.903199-2.36638128-2.5528653-4.20306294-4.948999-5.51004497-1.276167-.65349101-2.5990879-1.05833667-3.9687625-1.21453696-1.525875-.21783034-3.1293188-.17107651-4.8103315.14026149-2.7701643.52916833-5.02709913 1.743174-6.77080442 3.64201699-1.99235065 2.14748836-2.98852598 4.62225355-2.98852598 7.42429545 0 2.9571797.9494215 5.0584455 2.84826449 6.3037975l.83997504.4207845c.12432268 0 .22526845.0154075.3028373.0462225s.1551377.0074381.23270656-.0701308c.07756885-.0775688.13229208-.1243226.16416969-.1402614s.07066204-.0860696.11635328-.2103923c.04569124-.1243226.07703756-.2098609.09403895-.2566147.01700139-.0467539.04834771-.1476996.09403895-.3028373s.06906816-.2486454.07013074-.280523l.14026149-.5132295c.06269263-.311338.09403895-.5291684.09403895-.653491-.03081502-.1243227-.12432268-.2799917-.28052297-.467007-.15620029-.1870154-.23376915-.2959305-.23270656-.3267455-.62267599-.8096914-.9494215-1.7904592-.98023652-2.9423035-.03081502-1.55669.28052297-2.9731185.93401399-4.24928547 1.18265932-2.45882635 3.17501002-3.93741618 5.97705192-4.43576949 1.6183201-.311338 3.1356943-.25661476 4.5521228.16416969 1.4164285.42078446 2.5135496 1.09765239 3.2913633 2.03060379.8405063 1.02752164 1.3229208 2.28828114 1.4472435 3.78227848.1243227 1.4004897-.0313463 2.9725872-.467007 4.7162925-.3740306 1.3696746-.9186065 2.5528653-1.6337275 3.5495719-.9967066 1.245352-2.0863896 1.8834355-3.269049 1.9142505-1.7118277.0626926-2.7547568-.6375522-3.1287874-2.1007345-.0935077-.4664757 0-1.2134744.2805229-2.240996.7469987-2.5842117 1.1359055-3.9384788 1.1667206-4.0628015.1870153-1.0275216.2024228-1.7904591.0462225-2.2888124-.1870153-.65349104-.5759222-1.15928246-1.1667205-1.51737429-.5907984-.35809182-1.2756357-.39687625-2.054512-.11635327-1.1826594.43566067-1.9610044 1.40048968-2.335035 2.89448706-.311338 1.306982-.2491767 2.6299028.186484 3.9687625 0 .0626926.0313463.1402615.094039.2327065.0626926.0924451.0940389.1700139.0940389.2327066 0 .0935076-.0313463.2491766-.0940389.467007-.0626927.2178303-.094039.3580918-.094039.4207844-.0935076.4356607-.3038999 1.3308903-.6311767 2.6856887-.3272768 1.3547985-.5838915 2.3897582-.7698443 3.1048793-.7778136 3.2068876-1.12049796 5.5881451-1.02805289 7.1437725l.37296809 2.7558194c.653491-.591861 1.2294131-1.2299445 1.7277664-1.9142505z"
    />
  </svg>
`,Ds=d`
  <svg
    class="ia-icon"
    viewBox="0 0 34 34"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m32 7.04156803v19.91686397c0 .5752421-.4763773 1.041568-1.0640184 1.041568h-27.87196316c-.58764116 0-1.06401844-.4663259-1.06401844-1.041568v-19.91686397c0-.57524214.47637728-1.04156803 1.06401844-1.04156803h27.87196316c.5876411 0 1.0640184.46632589 1.0640184 1.04156803zm-26.25039901 1.19676167 10.04327011 10.1323738c.5135662.4194048.8817166.6291071 1.1044511.6291071.1198794 0 .2695514-.0503424.4490158-.1510273.1794644-.100685.3291364-.2013699.4490158-.3020548l.1798191-.1510273 10.1198794-10.15841306zm16.77212271 9.7303286 6.8831353 6.7889404v-13.5778809zm-17.92871075-6.6379131v13.350819l6.78098955-6.6629107zm22.09008685 14.2059464-5.9074304-5.8588202-.9757049.9551179-.3594018.3295984c-.0342324.0304241-.0665646.0587822-.0969964.0850743l-.1597867.1329606c-.0684912.0540844-.1198794.0895749-.1541644.1064714-.6674943.3687151-1.3523675.5530727-2.0546196.5530727-.65047 0-1.3782586-.218035-2.1833659-.6541048l-.6682036-.4520405-1.0278418-1.0311524-5.95850326 5.832781z"
    />
  </svg>
`,Rs=d`
  <svg
    class="ia-icon"
    viewBox="0 0 34 34"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m7.80511706 12.3659763c1.2669254-2.2579539 4.09819784-2.9949938 6.41200864-1.7733458l.2295791.12871 1.6067188.9559859 3.5467013-6.31849361c1.2682451-2.26030597 4.104098-2.99652769 6.4192376-1.76952182l.2223501.12488594 3.2168204 1.91103915c2.2770002 1.3527136 3.1866331 4.21502324 2.0564431 6.51290984l-.1198433.2278304-5.2002499 9.2680474c-1.2669254 2.2579539-4.0981978 2.9949938-6.4120086 1.7733458l-.2295791-.12871-1.6096554-.9558482-3.5437647 6.3183559c-1.2682451 2.260306-4.104098 2.9965277-6.41923761 1.7695218l-.22235013-.1248859-3.21682032-1.9110392c-2.27700024-1.3527136-3.18663314-4.2150232-2.05644312-6.5129098l.11984332-.2278304zm13.93955474-5.73311741-3.563271 6.35055051c1.889633 1.4530595 2.5776248 4.0429866 1.5410255 6.156875l-.1223014.2328355-.4183304.7430134 1.6096554.9558483c1.1431442.6791157 2.5155496.3977368 3.1667361-.5628389l.0921501-.1491451 5.2002498-9.2680474c.5752467-1.0252226.2110342-2.4011579-.8559335-3.14755806l-.1742742-.11247814-3.2168203-1.91103915c-1.1402863-.67741793-2.5086889-.39913772-3.1618387.55564729zm-11.79500786 7.00714351-5.20024982 9.2680474c-.57524673 1.0252226-.21103426 2.4011579.85593348 3.1475581l.17427416.1124781 3.21682032 1.9110392c1.14028632.6774179 2.50868892.3991377 3.16183872-.5556473l.0970474-.1563368 3.5622708-6.3513198c-1.8888875-1.4532134-2.5764504-4.042623-1.5400057-6.1561456l.1222818-.2327956.4153938-.7428758-1.6067188-.9559859c-1.1431442-.6791157-2.5155496-.3977368-3.1667361.5628389zm6.97653866 1.5796652-.3817806.6812386c-.5117123.9119895-.2800268 2.1014993.528439 2.8785267l.382717-.6803391c.5119098-.9123415.2798478-2.1024176-.5293754-2.8794262z"
    />
  </svg>
`;var Ls=Object.defineProperty,Ns=Object.getOwnPropertyDescriptor,oe=(i,e,t,o)=>{for(var r=o>1?void 0:o?Ns(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Ls(e,t,r),r};let J=class extends x{constructor(){super(...arguments),this.baseHost="archive.org",this.creator="",this.description="",this.embedOptionsVisible=!1,this.identifier="",this.sharingOptions=[],this.type="",this.renderHeader=!1,this.fileSubPrefix="",this.copyNoteTimeouts=new WeakMap}updated(i){i.has("sharingOptions")&&!this.sharingOptions.length&&this.loadProviders()}loadProviders(){let i=`https://${this.baseHost}/details/${this.identifier}`;this.fileSubPrefix&&(i+=`/${this.fileSubPrefix}`);const e=[this.description,this.creator,"Free Download, Borrow, and Streaming","Internet Archive"].filter(Boolean).join(" : ");this.sharingOptions=[{name:"Twitter",icon:Is,url:`https://twitter.com/intent/tweet?${new URLSearchParams({url:i,text:e,via:"internetarchive"})}`},{name:"Facebook",icon:Bs,url:`https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({u:i})}`},{name:"Tumblr",icon:Vs,url:`https://www.tumblr.com/widgets/share/tool/preview?${new URLSearchParams({posttype:"link",canonicalUrl:i,title:e})}`},{name:"Pinterest",icon:zs,url:`http://www.pinterest.com/pin/create/button/?${new URLSearchParams({url:i,description:e})}`},{name:"Email",icon:Ds,url:`mailto:?${new URLSearchParams({subject:e,body:i})}`}]}async copyToClipboard(i){const e=i.currentTarget,t=e.querySelector("textarea"),o=e.querySelector("small");if(!(!t||!o)){try{await navigator.clipboard.writeText(t.value)}catch{t.select(),document.execCommand("copy"),t.blur()}o.classList.add("visible"),clearTimeout(this.copyNoteTimeouts.get(o)),this.copyNoteTimeouts.set(o,setTimeout(()=>o.classList.remove("visible"),4e3))}}get iframeEmbed(){return`<iframe
      src="https://${this.baseHost}/embed/${this.identifier}"
      width="560" height="384" frameborder="0"
      webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen
    ></iframe>`}get bbcodeEmbed(){return`[archiveorg ${this.identifier} width=560 height=384 frameborder=0 webkitallowfullscreen=true mozallowfullscreen=true]`}get helpURL(){return`https://${this.baseHost}/help/audio.php?identifier=${this.identifier}`}get header(){const i=d`<header><h3>Share this ${this.type}</h3></header>`;return this.renderHeader?i:y}render(){return d`
      ${this.header}
      <div>
        ${this.sharingOptions.map(i=>d`<a class="share-option" href=${i.url} target="_blank">
              ${i.icon} ${i.name}
            </a>`)}
        <details>
          <summary class="share-option">
            ${Rs} Get an embeddable link
          </summary>
          <div class="embed">
            <h4>Embed</h4>
            <div class="code" @click=${this.copyToClipboard}>
              <textarea readonly>${this.iframeEmbed}</textarea>
              <small>Copied to clipboard</small>
            </div>
            <h4>
              Embed for wordpress.com hosted blogs and archive.org item
              &lt;description&gt; tags
            </h4>
            <div class="code" @click=${this.copyToClipboard}>
              <textarea readonly>${this.bbcodeEmbed}</textarea>
              <small>Copied to clipboard</small>
            </div>
            <p>
              Want more?
              <a href=${this.helpURL}
                >Advanced embedding details, examples, and help</a
              >!
            </p>
          </div>
        </details>
      </div>
    `}static get styles(){return[z,_`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-share-link-color--: var(
            --item-navigator-share-link-color,
            var(--true-white)
          );
          --item-navigator-share-icon-border--: var(
            --item-navigator-share-icon-border,
            #4b4b4b
          );
          --item-navigator-share-icon-bg--: var(
            --item-navigator-share-icon-bg,
            transparent
          );
          --item-navigator-icon-fill-color--: var(
            --item-navigator-icon-fill-color,
            var(--true-white)
          );
          --item-navigator-textarea-color--: var(
            --item-navigator-textarea-color,
            var(--true-white)
          );
          --item-navigator-textarea-bg--: var(
            --item-navigator-textarea-bg,
            #151515
          );

          display: block;
          height: 100%;
          overflow-y: auto;
          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
          box-sizing: border-box;
        }

        header {
          display: flex;
          align-items: baseline;
        }

        h3 {
          padding: 0;
          margin: 0 1em 0 0;
          font-size: 1.6em;
        }

        h4 {
          font-size: 1.4em;
        }

        :host > div {
          padding: 1em 0;
        }

        .share-option {
          display: block;
          padding: 0.5em 0;
          font-size: 1.6em;
          text-decoration: none;
          color: var(--item-navigator-share-link-color--);
          cursor: pointer;
          transition: background-color 0.2s;
          border-radius: 6px;
        }

        .share-option:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        .share-option > * {
          display: inline-block;
          padding: 0.2em;
          margin-right: 1em;
          vertical-align: middle;
          border: 1px solid var(--item-navigator-share-icon-border--);
          border-radius: 7px;
          background: var(--item-navigator-share-icon-bg--);
        }

        .share-option .ia-icon {
          /* Reset to the base so the icon (em) doesn't compound against the
             share-option's enlarged font-size. */
          font-size: var(--item-navigator-base-font-size, 10px);
          width: 2em;
          height: 2em;
        }

        .ia-icon .fill-color {
          fill: var(--item-navigator-icon-fill-color--);
        }

        /* Hide the triangle that appears on details tags */
        summary::marker {
          content: '';
        }

        summary::-webkit-details-marker {
          display: none;
        }

        .embed {
          padding-right: 5px;
        }

        .embed a {
          color: var(--item-navigator-share-link-color--);
        }

        .code {
          position: relative;
        }

        textarea {
          display: block;
          width: 100%;
          height: 120px;
          padding: 0.8em 1em;
          box-sizing: border-box;
          resize: none;
          cursor: pointer;
          font: normal 1.4em var(--base-font-family);
          color: var(--item-navigator-textarea-color--);
          background: var(--item-navigator-textarea-bg--);
        }

        small {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3em;
          padding: 0.5em 1em;
          box-sizing: border-box;
          font: normal 1.2em/2em var(--base-font-family);
          color: var(--item-navigator-textarea-bg--);
          background: var(--item-navigator-textarea-color--);
          opacity: 0;
          transition: opacity 300ms linear;
        }

        small.visible {
          opacity: 1;
        }
      `]}};oe([u({type:String})],J.prototype,"baseHost",2);oe([u({type:String})],J.prototype,"creator",2);oe([u({type:String})],J.prototype,"description",2);oe([u({type:Boolean})],J.prototype,"embedOptionsVisible",2);oe([u({type:String})],J.prototype,"identifier",2);oe([u({type:Array})],J.prototype,"sharingOptions",2);oe([u({type:String})],J.prototype,"type",2);oe([u({type:Boolean})],J.prototype,"renderHeader",2);oe([u({type:String})],J.prototype,"fileSubPrefix",2);J=oe([C("ia-share-panel")],J);var Us=Object.defineProperty,js=Object.getOwnPropertyDescriptor,se=(i,e,t,o)=>{for(var r=o>1?void 0:o?js(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Us(e,t,r),r};class Hs{constructor(){this.handlers=new Map,this.observer=new ResizeObserver(e=>{for(const t of e)this.handlers.get(t.target)?.handler.handleResize(t)})}addObserver(e){this.handlers.set(e.target,e),this.observer.observe(e.target)}removeObserver(e){this.handlers.delete(e.target),this.observer.unobserve(e.target)}}const Fs=d`
  <svg class="ia-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path class="fill-color" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
  </svg>
`,xt="masterbookofamericanfolksong00shep";function we(i,e,t,{topLevel:o=!1,pdf:r=!1}={}){const a=`/details/${xt}`;return{title:e,file_prefix:i,file_subprefix:i,file_source:r?`${i}.pdf`:`/${i}_jp2.zip`,url_path:o?a:`${a}/${encodeURIComponent(i)}`,image:"",author:"Riley Shepard",orig_sort:t}}const di=[we("01-The Master Book of American Folk Song","The Master Book of American Folk Song",0,{topLevel:!0}),we("02-Encyclopedia of the Traditional Music and Folk Songs of the United States Index A through M","Encyclopedia of the Traditional Music and Folk Songs of the United States, Index A through M",1),we("03-Encyclopedia of the Traditional Music and Folk Songs of the United States Index N through Z","Encyclopedia of the Traditional Music and Folk Songs of the United States, Index N through Z",2),we("04-Letters to Riley Shepard","Letters to Riley Shepard",3),we("Master Book of American Folk Song Vol. 1","Master Book of American Folk Song Vol. 1",4,{pdf:!0}),we("Master Book of American Folk Song Vol. 2","Master Book of American Folk Song Vol. 2",5,{pdf:!0}),we("Master Book of American Folk Song Vol. 3","Master Book of American Folk Song Vol. 3",6)];let Y=class extends x{constructor(){super(...arguments),this.loaded=!0,this.viewAvailable=!0,this.headerOn=!0,this.fullscreen=!1,this.animationsOn=!0,this.sharedObserver=new Hs,this.sortOrderBy="default",this.sortedFiles=[...di]}handleFileListSorted(i){const{sortType:e,sortedFiles:t}=i.detail;this.sortOrderBy=e,this.sortedFiles=t}get demoItem(){return{metadata:{identifier:xt,title:"The Master Book of American Folk Song"}}}get menuContents(){const i={item:this.demoItem,baseHost:"archive.org",subPrefix:""};return[{...i,id:"viewable-files",label:`Viewable Files (${di.length})`,icon:Go,actionButton:d`
          <ia-sort-files-button
            .fileListRaw=${di}
            .sortOrderBy=${this.sortOrderBy}
          ></ia-sort-files-button>
        `,component:d`
          <ia-viewable-files-panel
            baseHost="archive.org"
            subPrefix="01-The Master Book of American Folk Song"
            .fileList=${this.sortedFiles}
            .sortOrderBy=${this.sortOrderBy}
          ></ia-viewable-files-panel>
        `},{...i,id:"share",label:"Share this item",icon:Jo,component:d`
          <ia-share-panel
            identifier=${xt}
            baseHost="archive.org"
            type="book"
            creator="Riley Shepard"
            description="The Master Book of American Folk Song"
          ></ia-share-panel>
        `},{...i,id:"about",label:"About This Item",icon:Fs,component:d`
          <p>
            The item navigator is a shell: each menu entry here is a "provider"
            supplying its own panel body. The theater on the right is slotted in
            by the host.
          </p>
        `}]}get menuShortcuts(){return[{id:"viewable-files",label:"Viewable Files",icon:Go},{id:"share",label:"Share this item",icon:Jo}]}get styleInputData(){return{settings:[{label:"Menu width",cssVariable:"--item-navigator-menu-width",defaultValue:320,inputType:"range",min:200,max:480,step:10,unit:"px"},{label:"Animation timing",cssVariable:"--item-navigator-animation-timing",defaultValue:200,inputType:"range",min:0,max:800,step:50,unit:"ms"},{label:"Theater background",cssVariable:"--item-navigator-theater-bg-color",defaultValue:"#000000",inputType:"color"},{label:"Text color",cssVariable:"--item-navigator-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Menu drawer background",cssVariable:"--item-navigator-menu-slider-bg",defaultValue:"#212121",inputType:"color"},{label:"Active panel background",cssVariable:"--item-navigator-active-button-bg",defaultValue:"#333333",inputType:"color"}]}}render(){return d`
      <story-template
        elementTag="ia-item-navigator"
        elementClassName="IAItemNavigator"
        .styleInputData=${this.styleInputData}
        .customExampleUsage=${this.exampleUsage}
      >
        <div slot="demo">
          <div class="frame-wrapper ${this.fullscreen?"fullscreen":""}">
            <ia-item-navigator
              baseHost="archive.org"
              style=${this.animationsOn?y:"--item-navigator-animation-timing: 0ms"}
              .item=${this.demoItem}
              .menuContents=${this.menuContents}
              .menuShortcuts=${this.menuShortcuts}
              .sharedObserver=${this.sharedObserver}
              .viewportInFullscreen=${this.fullscreen||null}
              ?loaded=${this.loaded}
              ?viewAvailable=${this.viewAvailable}
              @fileListSorted=${this.handleFileListSorted}
            >
              ${this.headerTemplate} ${this.theaterTemplate}
            </ia-item-navigator>
          </div>
        </div>

        <div slot="settings">
          <table>
            ${this.toggleRow("Loaded","loaded")}
            ${this.toggleRow("View available (theater)","viewAvailable")}
            ${this.toggleRow("Header","headerOn")}
            ${this.toggleRow("Fullscreen","fullscreen")}
            ${this.toggleRow("Animate","animationsOn")}
          </table>
          <p class="hint">
            Turn "View available" off to show the no-theater placeholder. Open
            "Viewable Files" and use the sort button in its header. Narrow the
            demo below 600px to see the drawer switch from shift to overlay.
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            The navigator is a shell: project a theater into
            <code>slot="main"</code> and an optional bar into
            <code>slot="header"</code>, then drive the drawer with the
            <code>menuContents</code> provider array (and the minimized rail
            with <code>menuShortcuts</code>). It never renders a viewer itself.
          </p>
        </div>
      </story-template>
    `}toggleRow(i,e){return d`
      <tr>
        <td>${i}</td>
        <td>
          <input
            type="checkbox"
            .checked=${this[e]}
            @change=${t=>{this[e]=t.target.checked}}
          />
        </td>
      </tr>
    `}get headerTemplate(){return!this.headerOn&&!this.fullscreen?y:d`
      <div slot="header" class="demo-header">
        <span class="brand">Internet Archive</span>
        <a class="title" href="/details/${xt}"
          >The Master Book of American Folk Song</a
        >
        ${this.fullscreen?d`<button
              class="exit-fs"
              @click=${()=>{this.fullscreen=!1}}
            >
              Exit fullscreen
            </button>`:y}
      </div>
    `}get theaterTemplate(){return d`
      <div slot="main" class="demo-theater">
        <div class="viewer-mock">
          <div class="spine"></div>
          <div class="page">
            <p class="viewer-title">The Master Book of American Folk Song</p>
            <p class="viewer-note">
              Your theater (book reader, media player, image viewer, …) renders
              here.
            </p>
          </div>
        </div>
      </div>
    `}get exampleUsage(){return`<ia-item-navigator
  baseHost="archive.org"
  .item=\${this.itemMetadata}
  .menuContents=\${this.menuProviders}
  .menuShortcuts=\${this.menuShortcuts}
  .sharedObserver=\${this.sharedObserver}
  ?loaded=\${this.loaded}
>
  <div slot="header">…your header…</div>
  <div slot="main">…your theater…</div>
</ia-item-navigator>`}static get styles(){return _`
      .frame-wrapper {
        height: 460px;
        border: 1px solid #ccc;
      }

      /* Opt into menu-button labels (the component ships icon-only by
         default), matching the upstream demo. */
      ia-item-navigator {
        --item-navigator-menu-button-label-display: block;
      }

      .demo-header {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #1a1a1a;
        color: #fff;
        padding: 8px 12px;
        font-size: 0.9rem;
      }

      .demo-header .brand {
        font-weight: 600;
        white-space: nowrap;
      }

      .demo-header .title {
        color: #6cb2ff;
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .demo-header .exit-fs {
        margin-left: auto;
        cursor: pointer;
      }

      .demo-theater {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 1rem;
        box-sizing: border-box;
      }

      .viewer-mock {
        display: flex;
        max-width: 320px;
        width: 100%;
        min-height: 220px;
        border-radius: 4px;
        overflow: hidden;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
        background: #2b2b2b;
      }

      .viewer-mock .spine {
        width: 14px;
        background: linear-gradient(90deg, #111, #444);
      }

      .viewer-mock .page {
        flex: 1;
        padding: 1.5rem 1.25rem;
        color: #eee;
      }

      .viewer-title {
        margin: 0 0 0.75rem;
        font-weight: 700;
      }

      .viewer-note {
        margin: 0;
        font-size: 0.85rem;
        color: #aaa;
      }

      .hint {
        font-size: 0.78rem;
        color: #555;
      }

      table {
        margin-bottom: 0.5rem;
      }
    `}};se([w()],Y.prototype,"loaded",2);se([w()],Y.prototype,"viewAvailable",2);se([w()],Y.prototype,"headerOn",2);se([w()],Y.prototype,"fullscreen",2);se([w()],Y.prototype,"animationsOn",2);se([w()],Y.prototype,"sharedObserver",2);se([w()],Y.prototype,"sortOrderBy",2);se([w()],Y.prototype,"sortedFiles",2);Y=se([C("ia-item-navigator-story")],Y);const qs=Object.freeze(Object.defineProperty({__proto__:null,get IAItemNavigatorStory(){return Y}},Symbol.toStringTag,{value:"Module"}));var Ks=Object.defineProperty,Ws=Object.getOwnPropertyDescriptor,Ve=(i,e,t,o)=>{for(var r=o>1?void 0:o?Ws(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Ks(e,t,r),r};const Zs={CodeSubmitted:"codeSubmitted"},Yo=/^[0-9]+$/,Gs=/^[a-zA-Z0-9]+$/;let pe=class extends x{constructor(){super(...arguments),this.disabled=!1,this.numChars=6,this.numericOnly=!0,this.allowedChars=Yo}render(){return d`
      ${[...Array(this.numChars).keys()].map(i=>d`<input
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
    `}firstUpdated(){this.inputs[0].focus()}willUpdate(i){i.has("numericOnly")&&(this.allowedChars=this.numericOnly?Yo:Gs),i.has("prefillValue")&&this.prefillValue!==void 0&&(this.fillInputs(this.prefillValue),this.prefillValue=void 0)}handleInput(i){i.preventDefault();const e=i.target,t=i.data;if(!t)return;if(t.length>1){this.fillInputs(t);return}if(!this.allowedChars.test(t))return;e.value=t;const o=e.nextElementSibling;o&&o.focus(),this.submitIfInputsFilled()}handleKeydown(i){const e=i.target,t=i.key,o=e.previousElementSibling,r=e.nextElementSibling;switch(t){case"Backspace":case"Delete":if(i.preventDefault(),o&&o.focus(),e.value===""){o.value="";break}e.value="";break;case"Tab":e.select();break;case"ArrowRight":case"Right":i.preventDefault(),r&&r.focus();break;case"ArrowLeft":case"Left":i.preventDefault(),o&&o.focus();break}}handlePaste(i){i.preventDefault();const e=i.clipboardData?.getData("text");e&&this.fillInputs(e)}fillInputs(i){i===""&&this.clearInputs();const e=i.split("").filter(o=>this.allowedChars.test(o)).slice(0,this.numChars);if(!e||e.length===0)return;if(e.forEach((o,r)=>this.inputs[r].value=o),e.length===this.numChars){this.triggerSubmit(e.join("")),this.inputs[this.numChars-1].focus();return}this.inputs[e.length].focus()}clearInputs(){this.inputs.forEach(i=>i.value=""),this.inputs[0].focus()}submitIfInputsFilled(){const i=[];this.inputs.forEach(e=>{e.value&&i.push(e.value)}),i.length===this.numChars&&this.triggerSubmit(i.join(""))}triggerSubmit(i){this.dispatchEvent(new CustomEvent(Zs.CodeSubmitted,{detail:this.numericOnly?i:i.toUpperCase(),bubbles:!0,composed:!0}))}static get styles(){return[z,_`
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
      `]}};Ve([u({type:String})],pe.prototype,"prefillValue",2);Ve([u({type:Boolean})],pe.prototype,"disabled",2);Ve([u({type:Number})],pe.prototype,"numChars",2);Ve([u({type:Boolean})],pe.prototype,"numericOnly",2);Ve([u({type:Object})],pe.prototype,"allowedChars",2);Ve([Ri("input")],pe.prototype,"inputs",2);pe=Ve([C("ia-otp-input")],pe);var Js=Object.defineProperty,Ys=Object.getOwnPropertyDescriptor,Ye=(i,e,t,o)=>{for(var r=o>1?void 0:o?Ys(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Js(e,t,r),r};const Xs={NewCodeRequested:"newCodeRequested"};let Me=class extends x{constructor(){super(...arguments),this.validationStatus="ready",this.newCodeSending=!1,this.numPasscodeChars=6,this.numericOnly=!0}render(){return d`
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
      ${this.validationStatus==="error"?d`<p class="error-msg">
            ${U("The code entered is invalid or expired")}
          </p>`:y}
      ${this.resendCodeButtonTemplate}
    `}willUpdate(i){i.has("validationStatus")&&this.OTPInput&&this.validationStatus==="error"&&(this.OTPInput.prefillValue=""),i.has("newCodeSending")&&this.newCodeSending&&this.OTPInput&&(this.OTPInput.prefillValue="")}get resendCodeButtonTemplate(){return this.newCodeSending?d`<span part="new-code-message" class="new-code-msg"
          >${U("Emailing...")}</span
        >`:d`
          <ia-button
            mode="link"
            class="new-code-btn"
            part="new-code-button"
            .disabled=${this.validationStatus==="loading"||this.validationStatus==="success"}
            @click=${this.handleNewCodeRequested}
          >
            ${U("Email me another code")}
          </ia-button>
        `}async handleNewCodeRequested(){this.dispatchEvent(new CustomEvent(Xs.NewCodeRequested,{bubbles:!0,composed:!0})),this.OTPInput.prefillValue=""}static get styles(){return[z,_`
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

        .new-code-msg {
          margin-top: 10px;
          font-size: var(--font-size-standard--);
          color: var(--link-color--);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `]}};Ye([u({type:String})],Me.prototype,"validationStatus",2);Ye([u({type:Boolean})],Me.prototype,"newCodeSending",2);Ye([u({type:Number})],Me.prototype,"numPasscodeChars",2);Ye([u({type:Boolean})],Me.prototype,"numericOnly",2);Ye([S("ia-otp-input")],Me.prototype,"OTPInput",2);Me=Ye([C("ia-otp-form")],Me);var Qs=Object.getOwnPropertyDescriptor,el=(i,e,t,o)=>{for(var r=o>1?void 0:o?Qs(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=n(r)||r);return r};const tl=[{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Input font size",cssVariable:"--ia-theme-font-size-lg",defaultValue:"2.25rem",inputType:"text"},{label:"Link and error font size",cssVariable:"--ia-theme-font-size-standard",defaultValue:"0.875rem",inputType:"text"},{label:"Link font color",cssVariable:"--ia-theme-link-color",defaultValue:"#4b64ff",inputType:"color"},{label:"Error message/indicator color",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"},{label:"Success indicator color",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"}],il=[{label:"Validation Status",propertyName:"validationStatus",defaultValue:"ready",inputType:"radio",radioOptions:["ready","loading","success","error"]},{label:"New code sending in progress",propertyName:"newCodeSending",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Numeric only",propertyName:"numericOnly",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Number of passcode characters",propertyName:"numPasscodeChars",defaultValue:6,inputType:"number"}];let Oi=class extends x{render(){return d`
      <story-template
        elementTag="ia-otp-form"
        elementClassName="IAOTPForm"
        .defaultUsageProps=${"@codeSubmitted=${(e: CustomEvent) => {setTimeout(() => alert('Code submitted: ' + e.detail), 250);}} \n  @newCodeRequested=${() => alert('New code requested')}"}
        .styleInputData=${{settings:tl}}
        .propInputData=${{settings:il}}
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
    `}};Oi=el([C("ia-otp-form-story")],Oi);const ol=Object.freeze(Object.defineProperty({__proto__:null,get IAOTPFormStory(){return Oi}},Symbol.toStringTag,{value:"Module"}));var rl=Object.getOwnPropertyDescriptor,al=(i,e,t,o)=>{for(var r=o>1?void 0:o?rl(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=n(r)||r);return r};const nl=[{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Font size",cssVariable:"--ia-theme-font-size-lg",defaultValue:"2.25rem",inputType:"text"}],sl=[{label:"Number of characters",propertyName:"numChars",defaultValue:6,inputType:"number"},{label:"Numeric only",propertyName:"numericOnly",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Prefill value",propertyName:"prefillValue",defaultValue:""},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let Ti=class extends x{render(){return d`
      <story-template
        elementTag="ia-otp-input"
        elementClassName="IAOTPInput"
        .defaultUsageProps=${"@codeSubmitted=${(e: CustomEvent) => {setTimeout(() => alert('Code submitted: ' + e.detail), 250);}}"}
        .styleInputData=${{settings:nl}}
        .propInputData=${{settings:sl}}
      >
        <ia-otp-input
          @codeSubmitted=${i=>{setTimeout(()=>alert("Code submitted: "+i.detail),250)}}
          slot="demo"
        ></ia-otp-input>
      </story-template>
    `}};Ti=al([C("ia-otp-input-story")],Ti);const ll=Object.freeze(Object.defineProperty({__proto__:null,get IAOTPInputStory(){return Ti}},Symbol.toStringTag,{value:"Module"}));var dl=Object.getOwnPropertyDescriptor,cl=(i,e,t,o)=>{for(var r=o>1?void 0:o?dl(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=n(r)||r);return r};let Xo=class extends x{render(){return d`
      <span class="sr-only">
        <slot></slot>
      </span>
    `}static get styles(){return[z,_`
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
      `]}};Xo=cl([C("ia-sr-only-text")],Xo);var hl=Object.defineProperty,pl=Object.getOwnPropertyDescriptor,Dr=(i,e,t,o)=>{for(var r=o>1?void 0:o?pl(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&hl(e,t,r),r};let Bt=class extends x{constructor(){super(...arguments),this.textVisible=!1}render(){return d`
      <story-template
        elementTag="ia-sr-only-text"
        elementClassName="IASrOnlyText"
        defaultSlottedContent="Sample text"
      >
        <div slot="demo">
          ${this.textVisible?"Sample Text":d`<ia-sr-only-text>Sample Text</ia-sr-only-text>`}
          <button @click=${()=>this.textVisible=!this.textVisible}>
            Make text ${this.textVisible?"sr-only":"visible"}
          </button>
        </div>
        <div slot="usage-notes">
          <p>
            Used to make text available for screen readers but not visible on
            the page.
          </p>
          <p>
            To see the hidden text in this demo, you can use the Chrome
            accessibility tree or your browser's equivalent.
          </p>
        </div>
      </story-template>
    `}};Dr([w()],Bt.prototype,"textVisible",2);Bt=Dr([C("ia-sr-only-text-story")],Bt);const ul=Object.freeze(Object.defineProperty({__proto__:null,get IAStatusIndicatorStory(){return Bt}},Symbol.toStringTag,{value:"Module"}));var gl=Object.getOwnPropertyDescriptor,ml=(i,e,t,o)=>{for(var r=o>1?void 0:o?gl(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=n(r)||r);return r};const fl=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"1.25rem"},{label:"Color - loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Color - success",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"},{label:"Color - error",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}],vl=[{label:"Mode",propertyName:"mode",defaultValue:"loading",inputType:"radio",radioOptions:["ready","loading","success","error"]},{label:"Accessible title - loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{label:"Loading style",propertyName:"loadingStyle",defaultValue:"ring-dots",inputType:"radio",radioOptions:["ring-dots","ring"]},{label:"Accessible title - success",propertyName:"successTitle",defaultValue:"Success"},{label:"Accessible title - error",propertyName:"errorTitle",defaultValue:"Error"}];let Ei=class extends x{render(){return d`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .styleInputData=${{settings:fl}}
        .propInputData=${{settings:vl}}
      >
        <ia-status-indicator slot="demo"></ia-status-indicator>
      </story-template>
    `}};Ei=ml([C("ia-status-indicator-story")],Ei);const bl=Object.freeze(Object.defineProperty({__proto__:null,get IAStatusIndicatorStory(){return Ei}},Symbol.toStringTag,{value:"Module"})),yl="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='36.283'%20height='36.283'%3e%3cpath%20d='M35.531%2017.391h-3.09l.845-1.464a.748.748%200%201%200-1.297-.75l-1.276%202.214H28.61l2.515-4.354a.751.751%200%200%200-.272-1.024.75.75%200%200%200-1.024.274l-2.948%205.104h-2.023a6.751%206.751%200%200%200-2.713-4.684l1.019-1.76%205.896-.002a.75.75%200%200%200%200-1.5l-5.029.002%201.051-1.82%202.557.002a.75.75%200%200%200%200-1.5l-1.689-.002%201.545-2.676a.75.75%200%201%200-1.302-.75l-1.547%202.676-.844-1.463a.749.749%200%201%200-1.297.75l1.278%202.213-1.051%201.818-2.514-4.354a.75.75%200%200%200-1.298.75l2.946%205.104-1.016%201.758a6.692%206.692%200%200%200-2.706-.57%206.74%206.74%200%200%200-2.707.568l-1.013-1.754%202.946-5.105a.75.75%200%200%200-1.298-.75L13.56%208.697l-1.05-1.818%201.278-2.217a.749.749%200%200%200-1.298-.75l-.845%201.465-1.551-2.678a.75.75%200%200%200-1.024-.273.748.748%200%200%200-.274%201.023l1.545%202.678H8.652a.75.75%200%200%200%200%201.5h2.556l1.05%201.818H7.231a.75.75%200%200%200%200%201.5h5.894l1.017%201.762a6.755%206.755%200%200%200-2.712%204.684H9.406l-2.95-5.104a.75.75%200%201%200-1.299.75l2.516%204.354H5.569l-1.277-2.213a.75.75%200%200%200-1.298.75l.845%201.463H.75a.75.75%200%200%200%200%201.5h3.09l-.845%201.465a.747.747%200%200%200%20.275%201.022.75.75%200%200%200%20.374.103.75.75%200%200%200%20.65-.375l1.277-2.215h2.103l-2.516%204.354a.75.75%200%200%200%201.299.75l2.949-5.104h2.024a6.761%206.761%200%200%200%202.712%204.685l-1.017%201.762H7.232a.75.75%200%200%200%200%201.5h5.026l-1.05%201.818H8.651a.75.75%200%200%200%200%201.5h1.69l-1.545%202.676a.75.75%200%200%200%201.299.75l1.546-2.676.846%201.465a.755.755%200%200%200%20.65.375.737.737%200%200%200%20.375-.103.747.747%200%200%200%20.274-1.022l-1.279-2.215%201.05-1.82%202.515%204.354a.75.75%200%200%200%201.299-.75l-2.947-5.104%201.013-1.756a6.72%206.72%200%200%200%205.415%200l1.014%201.756-2.947%205.104a.75.75%200%200%200%201.298.75l2.515-4.354%201.053%201.82-1.277%202.213a.75.75%200%200%200%201.298.75l.844-1.463%201.545%202.678c.141.24.393.375.65.375a.75.75%200%200%200%20.649-1.125l-1.548-2.678h1.689a.75.75%200%200%200%200-1.5h-2.557l-1.051-1.82%205.029.002a.75.75%200%200%200%200-1.5l-5.896-.002-1.019-1.76a6.75%206.75%200%200%200%202.711-4.685h2.023l2.947%205.104a.753.753%200%200%200%201.025.273.749.749%200%200%200%20.272-1.023l-2.515-4.354h2.104l1.279%202.215a.75.75%200%200%200%20.649.375c.127%200%20.256-.03.375-.103a.748.748%200%200%200%20.273-1.022l-.848-1.465h3.092a.75.75%200%200%200%20.003-1.5zm-12.136.75c0%20.257-.041.502-.076.75a5.223%205.223%200%200%201-1.943%203.358%205.242%205.242%200%200%201-1.291.766%205.224%205.224%200%200%201-1.949.384%205.157%205.157%200%200%201-3.239-1.15%205.22%205.22%200%200%201-1.943-3.358c-.036-.247-.076-.493-.076-.75s.04-.503.076-.75a5.22%205.22%200%200%201%201.944-3.359c.393-.312.82-.576%201.291-.765a5.219%205.219%200%200%201%201.948-.384c.69%200%201.344.142%201.948.384.471.188.898.454%201.291.765a5.222%205.222%200%200%201%201.943%203.359c.035.247.076.493.076.75z'%20fill=':color:'/%3e%3c/svg%3e",Qo=new WeakSet;class wl extends mt{constructor(e){super(e)}update(e,[t,o]){return Qo.has(e)||(t(),Qo.add(e)),this.render(t,o)}render(e,t){return t()}}const er=gt(wl);var $l=Object.defineProperty,xl=Object.getOwnPropertyDescriptor,Gi=(i,e,t,o)=>{for(var r=o>1?void 0:o?xl(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&$l(e,t,r),r};let Vt=class extends x{constructor(){super(...arguments),this.snowing=!1}render(){return d`
      ${this.startButtonTemplate} ${this.clearButtonTemplate}
      <img src=${yl} alt="Snowflakes icon" />
    `}willUpdate(i){i.has("snowConfig")&&(this.snowflakes?.destroy(),this.snowflakes=void 0,this.startSnowing())}get startButtonTemplate(){return er(async()=>{await bt(()=>Promise.resolve().then(()=>co),void 0,import.meta.url)},()=>d`
        <ia-button
          @click=${()=>{this.snowing?this.stopSnowing():this.startSnowing()}}
        >
          ${this.snowing?"Stop Snowflakes":"Start Snowflakes"}
        </ia-button>
      `)}get clearButtonTemplate(){return er(async()=>{await bt(()=>Promise.resolve().then(()=>co),void 0,import.meta.url)},()=>d`
        <ia-button
          @click=${()=>{this.snowflakes?.destroy()}}
        >
          Clear Snowflakes
        </ia-button>
      `)}async startSnowing(){if(!this.snowflakes){const e=(await bt(()=>import("./snowflakes.esm-Dz_MTlsm.js"),[],import.meta.url)).default;this.snowflakes=new e(this.snowConfig)}this.snowflakes?.start(),this.snowing=!0}stopSnowing(){this.snowflakes?.stop(),this.snowing=!1}static get styles(){return _`
      img {
        width: 16px;
        filter: invert(1);
        vertical-align: middle;
      }
    `}};Gi([u({type:Object})],Vt.prototype,"snowConfig",2);Gi([w()],Vt.prototype,"snowing",2);Vt=Gi([C("ia-snow")],Vt);var _l=Object.defineProperty,Sl=Object.getOwnPropertyDescriptor,Xe=(i,e,t,o)=>{for(var r=o>1?void 0:o?Sl(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&_l(e,t,r),r};let ue=class extends x{render(){return d`
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
    `:"<ia-snow></ia-snow>"}get configString(){return JSON.stringify(this.config,null,2)}get snowflakeConfig(){return{color:this.colorInput.value,count:Number(this.countInput.value),wind:this.windInput.checked,rotation:this.rotationInput.checked}}setupSnowflakes(){this.config=this.snowflakeConfig}static get styles(){return _`
      fieldset {
        margin-top: 16px;
      }
    `}};Xe([w()],ue.prototype,"config",2);Xe([S("#count")],ue.prototype,"countInput",2);Xe([S("#wind")],ue.prototype,"windInput",2);Xe([S("#rotation")],ue.prototype,"rotationInput",2);Xe([S("#color")],ue.prototype,"colorInput",2);ue=Xe([C("ia-snow-story")],ue);const Cl=Object.freeze(Object.defineProperty({__proto__:null,get IASnowStory(){return ue}},Symbol.toStringTag,{value:"Module"}));var Al=Object.getOwnPropertyDescriptor,Ol=(i,e,t,o)=>{for(var r=o>1?void 0:o?Al(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(r=n(r)||r);return r};const Tl=Object.assign({"../src/elements/ia-button/ia-button-story.ts":Ba,"../src/elements/ia-combo-box/ia-combo-box-story.ts":sn,"../src/elements/ia-dropdown-search-bar/ia-dropdown-search-bar-story.ts":rs,"../src/elements/ia-item-navigator/ia-item-navigator-story.ts":qs,"../src/elements/ia-otp-form/ia-otp-form-story.ts":ol,"../src/elements/ia-otp-input/ia-otp-input-story.ts":ll,"../src/elements/ia-sr-only-text/ia-sr-only-text-story.ts":ul,"../src/elements/ia-status-indicator/ia-status-indicator-story.ts":bl,"../src/labs/ia-snow/ia-snow-story.ts":Cl}),Rr=Object.keys(Tl).map(i=>{const e=i.includes("/src/labs/"),t=i.split("/"),r=t[t.length-1].replace(/-story\.ts$/,"");return{tag:r,storyTag:`${r}-story`,id:`elem-${r}`,labs:e}}).sort((i,e)=>i.tag.localeCompare(e.tag)),ki=Rr.filter(i=>!i.labs),Pi=Rr.filter(i=>i.labs),El=[...ki,...Pi];let tr=class extends x{constructor(){super(...arguments),this._abortController=new AbortController}createRenderRoot(){return this}render(){return d`
      <nav id="ia-sidebar">
        <h2>Production-Ready</h2>
        ${ki.map(i=>d`<a href="#${i.id}">&lt;${i.tag}&gt;</a>`)}
        <h2>Labs 🧪</h2>
        ${Pi.map(i=>d`<a href="#${i.id}">&lt;${i.tag}&gt;</a>`)}
      </nav>
      <div id="ia-content">
        <h1>Internet Archive Elements</h1>
        <h2>Production-Ready Elements</h2>
        ${ki.map(i=>d`
          <div id="${i.id}" class="ia-anchor">
            ${pi(`<${i.storyTag}></${i.storyTag}>`)}
          </div>
        `)}
        <h2>Labs Elements</h2>
        ${Pi.map(i=>d`
          <div id="${i.id}" class="ia-anchor">
            ${pi(`<${i.storyTag}></${i.storyTag}>`)}
          </div>
        `)}
      </div>
    `}firstUpdated(){const i=El.map(o=>o.id),e=Object.fromEntries(i.map(o=>[o,this.querySelector(`#ia-sidebar a[href="#${o}"]`)])),t=new Set;this._observer=new IntersectionObserver(o=>{for(const a of o)a.isIntersecting?t.add(a.target.id):t.delete(a.target.id);const r=i.find(a=>t.has(a))??i[0];i.forEach(a=>e[a]?.classList.toggle("active",a===r))},{rootMargin:"0px 0px -70% 0px"}),i.forEach(o=>{const r=document.getElementById(o);r&&this._observer.observe(r)}),i.forEach(o=>{e[o]?.addEventListener("click",r=>{r.preventDefault();const a=document.getElementById(o);if(a){const n=a.getBoundingClientRect().top+window.scrollY;window.scrollTo({top:Math.max(0,n-16),behavior:"smooth"})}},{signal:this._abortController.signal})})}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._abortController.abort()}};tr=Ol([C("app-root")],tr);
