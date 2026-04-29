(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();const Q=globalThis,St=Q.ShadowRoot&&(Q.ShadyCSS===void 0||Q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ot=Symbol(),Lt=new WeakMap;let Jt=class{constructor(t,i,s){if(this._$cssResult$=!0,s!==Ot)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(St&&t===void 0){const s=i!==void 0&&i.length===1;s&&(t=Lt.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Lt.set(i,t))}return t}toString(){return this.cssText}};const pe=e=>new Jt(typeof e=="string"?e:e+"",void 0,Ot),T=(e,...t)=>{const i=e.length===1?e[0]:t.reduce(((s,o,n)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[n+1]),e[0]);return new Jt(i,e,Ot)},de=(e,t)=>{if(St)e.adoptedStyleSheets=t.map((i=>i instanceof CSSStyleSheet?i:i.styleSheet));else for(const i of t){const s=document.createElement("style"),o=Q.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}},jt=St?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const s of t.cssRules)i+=s.cssText;return pe(i)})(e):e;const{is:ue,defineProperty:ge,getOwnPropertyDescriptor:fe,getOwnPropertyNames:me,getOwnPropertySymbols:be,getPrototypeOf:ye}=Object,ct=globalThis,Dt=ct.trustedTypes,ve=Dt?Dt.emptyScript:"",$e=ct.reactiveElementPolyfillSupport,K=(e,t)=>e,et={toAttribute(e,t){switch(t){case Boolean:e=e?ve:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},At=(e,t)=>!ue(e,t),Bt={attribute:!0,type:String,converter:et,reflect:!1,useDefault:!1,hasChanged:At};Symbol.metadata??=Symbol("metadata"),ct.litPropertyMetadata??=new WeakMap;let R=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=Bt){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(t,s,i);o!==void 0&&ge(this.prototype,t,o)}}static getPropertyDescriptor(t,i,s){const{get:o,set:n}=fe(this.prototype,t)??{get(){return this[i]},set(a){this[i]=a}};return{get:o,set(a){const r=o?.call(this);n?.call(this,a),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Bt}static _$Ei(){if(this.hasOwnProperty(K("elementProperties")))return;const t=ye(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(K("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(K("properties"))){const i=this.properties,s=[...me(i),...be(i)];for(const o of s)this.createProperty(o,i[o])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[s,o]of i)this.elementProperties.set(s,o)}this._$Eh=new Map;for(const[i,s]of this.elementProperties){const o=this._$Eu(i,s);o!==void 0&&this._$Eh.set(o,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const o of s)i.unshift(jt(o))}else t!==void 0&&i.push(jt(t));return i}static _$Eu(t,i){const s=i.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const s of i.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return de(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$ET(t,i){const s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(o!==void 0&&s.reflect===!0){const n=(s.converter?.toAttribute!==void 0?s.converter:et).toAttribute(i,s.type);this._$Em=t,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(t,i){const s=this.constructor,o=s._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const n=s.getPropertyOptions(o),a=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:et;this._$Em=o;const r=a.fromAttribute(i,n.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,i,s){if(t!==void 0){const o=this.constructor,n=this[t];if(s??=o.getPropertyOptions(t),!((s.hasChanged??At)(n,i)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,i,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:s,reflect:o,wrapped:n},a){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??i??this[t]),n!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(i=void 0),this._$AL.set(t,i)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,n]of s){const{wrapped:a}=n,r=this[o];a!==!0||this._$AL.has(o)||r===void 0||this.C(o,void 0,n,r)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach((s=>s.hostUpdate?.())),this.update(i)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach((i=>i.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((i=>this._$ET(i,this[i]))),this._$EM()}updated(t){}firstUpdated(t){}};R.elementStyles=[],R.shadowRootOptions={mode:"open"},R[K("elementProperties")]=new Map,R[K("finalized")]=new Map,$e?.({ReactiveElement:R}),(ct.reactiveElementVersions??=[]).push("2.1.1");const Ct=globalThis,it=Ct.trustedTypes,Mt=it?it.createPolicy("lit-html",{createHTML:e=>e}):void 0,Xt="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,Qt="?"+I,we=`<${Qt}>`,B=document,q=()=>B.createComment(""),W=e=>e===null||typeof e!="object"&&typeof e!="function",Tt=Array.isArray,xe=e=>Tt(e)||typeof e?.[Symbol.iterator]=="function",ft=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Rt=/-->/g,Nt=/>/g,L=RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ut=/'/g,Vt=/"/g,te=/^(?:script|style|textarea|title)$/i,ee=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),l=ee(1),ie=ee(2),C=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Ft=new WeakMap,j=B.createTreeWalker(B,129);function se(e,t){if(!Tt(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Mt!==void 0?Mt.createHTML(t):t}const _e=(e,t)=>{const i=e.length-1,s=[];let o,n=t===2?"<svg>":t===3?"<math>":"",a=H;for(let r=0;r<i;r++){const c=e[r];let y,d,h=-1,x=0;for(;x<c.length&&(a.lastIndex=x,d=a.exec(c),d!==null);)x=a.lastIndex,a===H?d[1]==="!--"?a=Rt:d[1]!==void 0?a=Nt:d[2]!==void 0?(te.test(d[2])&&(o=RegExp("</"+d[2],"g")),a=L):d[3]!==void 0&&(a=L):a===L?d[0]===">"?(a=o??H,h=-1):d[1]===void 0?h=-2:(h=a.lastIndex-d[2].length,y=d[1],a=d[3]===void 0?L:d[3]==='"'?Vt:Ut):a===Vt||a===Ut?a=L:a===Rt||a===Nt?a=H:(a=L,o=void 0);const _=a===L&&e[r+1].startsWith("/>")?" ":"";n+=a===H?c+we:h>=0?(s.push(y),c.slice(0,h)+Xt+c.slice(h)+I+_):c+I+(h===-2?r:_)}return[se(e,n+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:i},s){let o;this.parts=[];let n=0,a=0;const r=t.length-1,c=this.parts,[y,d]=_e(t,i);if(this.el=Z.createElement(y,s),j.currentNode=this.el.content,i===2||i===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(o=j.nextNode())!==null&&c.length<r;){if(o.nodeType===1){if(o.hasAttributes())for(const h of o.getAttributeNames())if(h.endsWith(Xt)){const x=d[a++],_=o.getAttribute(h).split(I),E=/([.?@])?(.*)/.exec(x);c.push({type:1,index:n,name:E[2],strings:_,ctor:E[1]==="."?Oe:E[1]==="?"?Ae:E[1]==="@"?Ce:ht}),o.removeAttribute(h)}else h.startsWith(I)&&(c.push({type:6,index:n}),o.removeAttribute(h));if(te.test(o.tagName)){const h=o.textContent.split(I),x=h.length-1;if(x>0){o.textContent=it?it.emptyScript:"";for(let _=0;_<x;_++)o.append(h[_],q()),j.nextNode(),c.push({type:2,index:++n});o.append(h[x],q())}}}else if(o.nodeType===8)if(o.data===Qt)c.push({type:2,index:n});else{let h=-1;for(;(h=o.data.indexOf(I,h+1))!==-1;)c.push({type:7,index:n}),h+=I.length-1}n++}}static createElement(t,i){const s=B.createElement("template");return s.innerHTML=t,s}}function U(e,t,i=e,s){if(t===C)return t;let o=s!==void 0?i._$Co?.[s]:i._$Cl;const n=W(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),n===void 0?o=void 0:(o=new n(e),o._$AT(e,i,s)),s!==void 0?(i._$Co??=[])[s]=o:i._$Cl=o),o!==void 0&&(t=U(e,o._$AS(e,t.values),o,s)),t}class Se{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,o=(t?.creationScope??B).importNode(i,!0);j.currentNode=o;let n=j.nextNode(),a=0,r=0,c=s[0];for(;c!==void 0;){if(a===c.index){let y;c.type===2?y=new J(n,n.nextSibling,this,t):c.type===1?y=new c.ctor(n,c.name,c.strings,this,t):c.type===6&&(y=new Te(n,this,t)),this._$AV.push(y),c=s[++r]}a!==c?.index&&(n=j.nextNode(),a++)}return j.currentNode=B,o}p(t){let i=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class J{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,o){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=U(this,t,i),W(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==C&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):xe(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==u&&W(this._$AH)?this._$AA.nextSibling.data=t:this.T(B.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Z.createElement(se(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(i);else{const n=new Se(o,this),a=n.u(this.options);n.p(i),this.T(a),this._$AH=n}}_$AC(t){let i=Ft.get(t.strings);return i===void 0&&Ft.set(t.strings,i=new Z(t)),i}k(t){Tt(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,o=0;for(const n of t)o===i.length?i.push(s=new J(this.O(q()),this.O(q()),this,this.options)):s=i[o],s._$AI(n),o++;o<i.length&&(this._$AR(s&&s._$AB.nextSibling,o),i.length=o)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class ht{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,o,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=i,this._$AM=o,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(t,i=this,s,o){const n=this.strings;let a=!1;if(n===void 0)t=U(this,t,i,0),a=!W(t)||t!==this._$AH&&t!==C,a&&(this._$AH=t);else{const r=t;let c,y;for(t=n[0],c=0;c<n.length-1;c++)y=U(this,r[s+c],i,c),y===C&&(y=this._$AH[c]),a||=!W(y)||y!==this._$AH[c],y===u?t=u:t!==u&&(t+=(y??"")+n[c+1]),this._$AH[c]=y}a&&!o&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Oe extends ht{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}class Ae extends ht{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}}class Ce extends ht{constructor(t,i,s,o,n){super(t,i,s,o,n),this.type=5}_$AI(t,i=this){if((t=U(this,t,i,0)??u)===C)return;const s=this._$AH,o=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==u&&(s===u||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Te{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){U(this,t)}}const Ee=Ct.litHtmlPolyfillSupport;Ee?.(Z,J),(Ct.litHtmlVersions??=[]).push("3.3.1");const Pe=(e,t,i)=>{const s=i?.renderBefore??t;let o=s._$litPart$;if(o===void 0){const n=i?.renderBefore??null;s._$litPart$=o=new J(t.insertBefore(q(),n),n,void 0,i??{})}return o._$AI(e),o};const Et=globalThis;let $=class extends R{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Pe(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return C}};$._$litElement$=!0,$.finalized=!0,Et.litElementHydrateSupport?.({LitElement:$});const Ie=Et.litElementPolyfillSupport;Ie?.({LitElement:$});(Et.litElementVersions??=[]).push("4.2.1");const O=e=>(t,i)=>{i!==void 0?i.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};const ke={attribute:!0,type:String,converter:et,reflect:!1,hasChanged:At},Le=(e=ke,t,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(n===void 0&&globalThis.litPropertyMetadata.set(o,n=new Map),s==="setter"&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),s==="accessor"){const{name:a}=i;return{set(r){const c=t.get.call(this);t.set.call(this,r),this.requestUpdate(a,c,e)},init(r){return r!==void 0&&this.C(a,void 0,e,r),r}}}if(s==="setter"){const{name:a}=i;return function(r){const c=this[a];t.call(this,r),this.requestUpdate(a,c,e)}}throw Error("Unsupported decorator location: "+s)};function p(e){return(t,i)=>typeof i=="object"?Le(e,t,i):((s,o,n)=>{const a=o.hasOwnProperty(n);return o.constructor.createProperty(n,s),a?Object.getOwnPropertyDescriptor(o,n):void 0})(e,t,i)}function g(e){return p({...e,state:!0,attribute:!1})}const oe=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,i),i);function w(e,t){return(i,s,o)=>{const n=a=>a.renderRoot?.querySelector(e)??null;return oe(i,s,{get(){return n(this)}})}}let je;function ne(e){return(t,i)=>oe(t,i,{get(){return(this.renderRoot??(je??=document.createDocumentFragment())).querySelectorAll(e)}})}const V=T`
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
`;var De=Object.getOwnPropertyDescriptor,Be=(e,t,i,s)=>{for(var o=s>1?void 0:s?De(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=a(o)||o);return o};let bt=class extends ${render(){return l`
      <button>
        <slot></slot>
      </button>
    `}static get styles(){return[V,T`
        :host {
          --primary-background-color--: var(--primary-cta-fill);
          --primary-text-color--: var(--primary-cta-text-color);
        }

        button {
          padding: 8px 16px;
          background-color: var(--primary-background-color--);
          color: var(--primary-text-color--);
        }
      `]}};bt=Be([O("ia-button")],bt);const zt=Object.freeze(Object.defineProperty({__proto__:null,get IAButton(){return bt}},Symbol.toStringTag,{value:"Module"}));function N(e,t,i){return e?t(e):i?.(e)}const st=e=>e??u,Me="modulepreload",Re=function(e,t){return new URL(e,t).href},Ht={},tt=function(t,i,s){let o=Promise.resolve();if(i&&i.length>0){let y=function(d){return Promise.all(d.map(h=>Promise.resolve(h).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};const a=document.getElementsByTagName("link"),r=document.querySelector("meta[property=csp-nonce]"),c=r?.nonce||r?.getAttribute("nonce");o=y(i.map(d=>{if(d=Re(d,s),d in Ht)return;Ht[d]=!0;const h=d.endsWith(".css"),x=h?'[rel="stylesheet"]':"";if(s)for(let E=a.length-1;E>=0;E--){const X=a[E];if(X.href===d&&(!h||X.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${x}`))return;const _=document.createElement("link");if(_.rel=h?"stylesheet":Me,h||(_.as="script"),_.crossOrigin="",_.href=d,c&&_.setAttribute("nonce",c),document.head.appendChild(_),h)return new Promise((E,X)=>{_.addEventListener("load",E),_.addEventListener("error",()=>X(new Error(`Unable to preload CSS for ${d}`)))})}))}function n(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return o.then(a=>{for(const r of a||[])r.status==="rejected"&&n(r.reason);return t().catch(n)})};const P={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},pt=e=>(...t)=>({_$litDirective$:e,values:t});class dt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,s){this._$Ct=t,this._$AM=i,this._$Ci=s}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}let yt=class extends dt{constructor(t){if(super(t),this.it=u,t.type!==P.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===u||t==null)return this._t=void 0,this.it=t;if(t===C)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const i=[t];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}};yt.directiveName="unsafeHTML",yt.resultType=1;const vt=pt(yt),Ne=T`
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
`;var Ue=Object.defineProperty,Ve=Object.getOwnPropertyDescriptor,ut=(e,t,i,s)=>{for(var o=s>1?void 0:s?Ve(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&Ue(t,i,o),o};let G=class extends ${constructor(){super(...arguments),this.code="",this.language="auto",this.highlightedCode=""}willUpdate(e){(e.has("code")||e.has("language"))&&this.highlightCode()}render(){return l`
      <pre><code class="hljs">${vt(this.highlightedCode)}</code></pre>
    `}async highlightCode(){const t=(await tt(()=>import("./index-BBc-AmEf.js"),[],import.meta.url)).default,i=this.code.trim();let s;this.language==="auto"?s=t.highlightAuto(i).value:s=t.highlight(i,{language:this.language}).value,this.highlightedCode=s}static get styles(){return[Ne]}};ut([p({type:String})],G.prototype,"code",2);ut([p({type:String})],G.prototype,"language",2);ut([g()],G.prototype,"highlightedCode",2);G=ut([O("syntax-highlighter")],G);const Fe="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='36pt'%20height='36pt'%20viewBox='0%200%2036%2036'%20version='1.1'%3e%3cg%20id='surface35'%3e%3cpath%20style='%20stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;'%20d='M%2013.5%206.1875%20C%2012.878906%206.1875%2012.375%206.691406%2012.375%207.3125%20C%2012.375%207.933594%2012.878906%208.4375%2013.5%208.4375%20L%2014.0625%208.4375%20L%2014.0625%2013.523438%20C%2014.0625%2014.453125%2013.78125%2015.34375%2013.246094%2016.105469%20L%206.84375%2025.238281%20C%206.140625%2026.238281%206.054688%2027.535156%206.621094%2028.617188%20C%207.183594%2029.703125%208.292969%2030.375%209.515625%2030.375%20L%2026.484375%2030.375%20C%2027.707031%2030.375%2028.816406%2029.703125%2029.378906%2028.617188%20C%2029.941406%2027.535156%2029.859375%2026.238281%2029.15625%2025.238281%20L%2022.753906%2016.105469%20C%2022.21875%2015.34375%2021.9375%2014.453125%2021.9375%2013.523438%20L%2021.9375%208.4375%20L%2022.5%208.4375%20C%2023.121094%208.4375%2023.625%207.933594%2023.625%207.3125%20C%2023.625%206.691406%2023.121094%206.1875%2022.5%206.1875%20Z%20M%2016.3125%208.4375%20L%2019.6875%208.4375%20L%2019.6875%2013.523438%20C%2019.6875%2014.914062%2020.109375%2016.257812%2020.910156%2017.398438%20L%2020.941406%2017.4375%20L%2015.0625%2017.4375%20L%2015.089844%2017.398438%20C%2015.890625%2016.257812%2016.3125%2014.914062%2016.3125%2013.523438%20Z%20M%2015.1875%2020.8125%20C%2015.808594%2020.8125%2016.3125%2021.316406%2016.3125%2021.9375%20C%2016.3125%2022.558594%2015.808594%2023.0625%2015.1875%2023.0625%20C%2014.566406%2023.0625%2014.0625%2022.558594%2014.0625%2021.9375%20C%2014.0625%2021.316406%2014.566406%2020.8125%2015.1875%2020.8125%20Z%20M%2020.53125%2023.0625%20C%2021.617188%2023.0625%2022.5%2023.945312%2022.5%2025.03125%20C%2022.5%2026.117188%2021.617188%2027%2020.53125%2027%20C%2019.445312%2027%2018.5625%2026.117188%2018.5625%2025.03125%20C%2018.5625%2023.945312%2019.445312%2023.0625%2020.53125%2023.0625%20Z%20M%2020.53125%2023.0625%20'/%3e%3c/g%3e%3c/svg%3e";function ot(e){return e.toLowerCase().split(" ").join("-")}var ze=Object.defineProperty,He=Object.getOwnPropertyDescriptor,Pt=(e,t,i,s)=>{for(var o=s>1?void 0:s?He(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&ze(t,i,o),o};let nt=class extends ${render(){return this.styleInputData?l`
      <div class="settings-options">
        <table>
          ${this.styleInputData.settings.map(e=>l`
              <tr>
                <td>
                  <label for=${ot(e.label)}>${e.label}</label>
                </td>
                <td>
                  <input
                    id=${ot(e.label)}
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
    `:u}applyStyles(){const e=[];this.styleInputs?.forEach(t=>{!t.dataset.variable||!t.value||e.push(`${t.dataset.variable}: ${t.value};`)}),this.dispatchEvent(new CustomEvent("stylesApplied",{detail:{styles:e.join(`
 `)}}))}static get styles(){return[V,T`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }
      `]}};Pt([p({type:Object})],nt.prototype,"styleInputData",2);Pt([ne(".style-input")],nt.prototype,"styleInputs",2);nt=Pt([O("story-styles-settings")],nt);const ae=(e,t,i)=>{for(const s of t)if(s[0]===e)return(0,s[1])();return i?.()};var Ke=Object.defineProperty,qe=Object.getOwnPropertyDescriptor,It=(e,t,i,s)=>{for(var o=s>1?void 0:s?qe(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&Ke(t,i,o),o};let at=class extends ${render(){return this.propInputData?l`
      <div class="settings-options">
        <table>
          ${this.propInputData.settings.map(e=>ae(e.inputType,[["radio",()=>this.createRadioPropInput(e)]],()=>this.createDefaultPropInput(e))??u)}
        </table>
        <button @click=${this.applyProps}>Apply</button>
      </div>
    `:u}createDefaultPropInput(e){const t=ot(e.label);return l`
      <tr>
        <td><label for=${t}>${e.label}</label></td>
        <td>
          <input
            class="prop-input"
            type=${e.inputType??"text"}
            id=${t}
            data-prop=${e.propertyName}
            placeholder=${st(e?.defaultValue)}
          />
        </td>
      </tr>
    `}createRadioPropInput(e){if(e.inputType!=="radio"||!e.radioOptions)return u;const t=ot(e.label);return l`
      <tr>
        <td><legend>${e.label}</legend></td>
        <td>
          ${e.radioOptions.map(i=>l`<input
                  type="radio"
                  class="prop-input"
                  name=${t}
                  id="${t}-${i}"
                  value=${i}
                  data-prop=${e.propertyName}
                  ?checked=${e.defaultValue===i}
                /><label for="${t}-${i}"> ${i} </label>`)}
        </td>
      </tr>
    `}applyProps(){const e=[],t=[];this.propInputs?.forEach(i=>{if(!i.dataset.prop||!i.value||i.type==="radio"&&!i.checked)return;const s=i.dataset.prop;e.push(`.${s}=\${'${i.value}'}`),t.push({propName:s,value:i.value})}),this.dispatchEvent(new CustomEvent("propsApplied",{detail:{stringifiedProps:`
  `+e.join(`
  `)+`
`,appliedProps:t}}))}static get styles(){return[V,T`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }
      `]}};It([p({type:Object})],at.prototype,"propInputData",2);It([ne(".prop-input")],at.prototype,"propInputs",2);at=It([O("story-props-settings")],at);var We=Object.defineProperty,Ze=Object.getOwnPropertyDescriptor,A=(e,t,i,s)=>{for(var o=s>1?void 0:s?Ze(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&We(t,i,o),o};let S=class extends ${constructor(){super(...arguments),this.elementTag="",this.elementClassName="",this.labs=!1,this.detailsVisible=!1,this.shouldShowPropertySettings=!1,this.copiedKey=null}render(){return l`
      <div id="container">
        <h2>
          <code>&lt;${this.elementTag}&gt;</code>
          ${N(this.labs,()=>l`<img
                src=${Fe}
                alt="Labs icon"
                title="Labs"
                class="labs-icon"
              />`)}
        </h2>
        <h3>Demo</h3>
        <div class="slot-container" style=${st(this.stringifiedStyles)}>
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
        <div id="details" class="${this.detailsVisible?"expanded":"collapsed"}">
          <div class="details-inner">
            ${this.detailsTemplate}
          </div>
        </div>
      </div>
    `}get detailsTemplate(){return l`
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
        ${N(this.cssCode,()=>l`
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
            ${N(!!this.propInputData,()=>l`
                <story-props-settings
                  .propInputData=${this.propInputData}
                  @propsApplied=${this.handlePropsApplied}
                ></story-props-settings>
              `)}
            ${N(!this.propInputData&&!this.shouldShowPropertySettings,()=>l`<p class="section-placeholder">No settings to adjust</p>`)}
            <div
              class="slot-container ${this.shouldShowPropertySettings?"":"hidden"}"
              @slotchange=${this.handleSettingsSlotChange}
            >
              <slot name="settings"></slot>
            </div>
          </div>
          <div class="right-col">
            <h3>Styles</h3>
            ${N(!!this.styleInputData,()=>l`
                <story-styles-settings
                  .styleInputData=${this.styleInputData}
                  @stylesApplied=${this.handleStylesApplied}
                ></story-styles-settings>
              `,()=>l`<p class="section-placeholder">No styles to adjust</p>`)}
          </div>
        </div>
    `}async copyToClipboard(e,t){try{await navigator.clipboard.writeText(e),this.copiedKey=t,clearTimeout(this._copyTimeout),this._copyTimeout=setTimeout(()=>this.copiedKey=null,2e3)}catch(i){console.warn("Clipboard write failed:",i)}}get importCode(){return this.elementClassName?`import '${this.modulePath}';
import { ${this.elementClassName} } from '${this.modulePath}';`:`import '${this.modulePath}';`}get exampleUsage(){const e=this.defaultUsageProps?`
 `+this.defaultUsageProps+`
`:"",t=this.stringifiedProps??"";return`<${this.elementTag}${e}${t}></${this.elementTag}>`}get cssCode(){return this.stringifiedStyles?`${this.elementTag} {
 ${this.stringifiedStyles}
}`:""}get modulePath(){return this.labs?`@internetarchive/elements/labs/${this.elementTag}/${this.elementTag}`:`@internetarchive/elements/${this.elementTag}/${this.elementTag}`}handleSettingsSlotChange(e){const t=e.target.assignedElements();this.shouldShowPropertySettings=t.length>0}handleDemoComponentSlotted(e){const t=e.target.assignedElements()[0];t&&(this.slottedDemoComponent=t)}handleStylesApplied(e){const t=e.detail.styles;t&&(this.stringifiedStyles=t)}handlePropsApplied(e){const t=e.detail.stringifiedProps,i=e.detail.appliedProps;!t||!i||(this.stringifiedProps=t,i.forEach(s=>{this.slottedDemoComponent[s.propName]=s.value}))}static get styles(){return[V,T`
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
      `]}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._copyTimeout)}};A([p({type:String})],S.prototype,"elementTag",2);A([p({type:String})],S.prototype,"elementClassName",2);A([p({type:String})],S.prototype,"customExampleUsage",2);A([p({type:String})],S.prototype,"defaultUsageProps",2);A([p({type:Object})],S.prototype,"styleInputData",2);A([p({type:Object})],S.prototype,"propInputData",2);A([p({type:Boolean})],S.prototype,"labs",2);A([g()],S.prototype,"detailsVisible",2);A([g()],S.prototype,"stringifiedStyles",2);A([g()],S.prototype,"stringifiedProps",2);A([g()],S.prototype,"shouldShowPropertySettings",2);A([g()],S.prototype,"slottedDemoComponent",2);A([g()],S.prototype,"copiedKey",2);S=A([O("story-template")],S);var Ge=Object.getOwnPropertyDescriptor,Ye=(e,t,i,s)=>{for(var o=s>1?void 0:s?Ge(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=a(o)||o);return o};const Je=[{label:"Text Color (Primary)",cssVariable:"--ia-theme-primary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background Color (Primary)",cssVariable:"--ia-theme-primary-cta-fill",defaultValue:"#194880",inputType:"color"}];let $t=class extends ${render(){return l`
      <story-template
        elementTag="ia-button"
        elementClassName="IAButton"
        .defaultUsageProps=${"@click=${() => alert('Button clicked!')}"}
        .styleInputData=${{settings:Je}}
      >
        <div slot="demo">
          <ia-button @click=${()=>alert("Button clicked!")}
            >Click Me</ia-button
          >
        </div>
      </story-template>
    `}};$t=Ye([O("ia-button-story")],$t);const Xe=Object.freeze(Object.defineProperty({__proto__:null,get IAButtonStory(){return $t}},Symbol.toStringTag,{value:"Module"})),re=JSON.parse(`[{"name":"Afghanistan","flag":"🇦🇫"},{"name":"Albania","flag":"🇦🇱"},{"name":"Algeria","flag":"🇩🇿"},{"name":"Andorra","flag":"🇦🇩"},{"name":"Angola","flag":"🇦🇴"},{"name":"Antigua and Barbuda","flag":"🇦🇬"},{"name":"Argentina","flag":"🇦🇷"},{"name":"Armenia","flag":"🇦🇲"},{"name":"Aruba","flag":"🇦🇼"},{"name":"Australia","flag":"🇦🇺"},{"name":"Austria","flag":"🇦🇹"},{"name":"Azerbaijan","flag":"🇦🇿"},{"name":"Bahamas","flag":"🇧🇸"},{"name":"Bahrain","flag":"🇧🇭"},{"name":"Bangladesh","flag":"🇧🇩"},{"name":"Barbados","flag":"🇧🇧"},{"name":"Belarus","flag":"🇧🇾"},{"name":"Belgium","flag":"🇧🇪"},{"name":"Belize","flag":"🇧🇿"},{"name":"Benin","flag":"🇧🇯"},{"name":"Bhutan","flag":"🇧🇹"},{"name":"Bolivia","flag":"🇧🇴"},{"name":"Bosnia and Herzegovina","flag":"🇧🇦"},{"name":"Botswana","flag":"🇧🇼"},{"name":"Brazil","flag":"🇧🇷"},{"name":"Brunei","flag":"🇧🇳"},{"name":"Bulgaria","flag":"🇧🇬"},{"name":"Burkina Faso","flag":"🇧🇫"},{"name":"Burundi","flag":"🇧🇮"},{"name":"Cabo Verde","flag":"🇨🇻"},{"name":"Cambodia","flag":"🇰🇭"},{"name":"Cameroon","flag":"🇨🇲"},{"name":"Canada","flag":"🇨🇦"},{"name":"Central African Republic","flag":"🇨🇫"},{"name":"Chad","flag":"🇹🇩"},{"name":"Chile","flag":"🇨🇱"},{"name":"China","flag":"🇨🇳"},{"name":"Colombia","flag":"🇨🇴"},{"name":"Comoros","flag":"🇰🇲"},{"name":"Cook Islands","flag":"🇨🇰"},{"name":"Costa Rica","flag":"🇨🇷"},{"name":"Côte d'Ivoire","flag":"🇨🇮"},{"name":"Croatia","flag":"🇭🇷"},{"name":"Cuba","flag":"🇨🇺"},{"name":"Cyprus","flag":"🇨🇾"},{"name":"Czechia","flag":"🇨🇿"},{"name":"Democratic Republic of the Congo","flag":"🇨🇩"},{"name":"Denmark","flag":"🇩🇰"},{"name":"Djibouti","flag":"🇩🇯"},{"name":"Dominica","flag":"🇩🇲"},{"name":"Dominican Republic","flag":"🇩🇴"},{"name":"Ecuador","flag":"🇪🇨"},{"name":"Egypt","flag":"🇪🇬"},{"name":"El Salvador","flag":"🇸🇻"},{"name":"Equatorial Guinea","flag":"🇬🇶"},{"name":"Eritrea","flag":"🇪🇷"},{"name":"Estonia","flag":"🇪🇪"},{"name":"Eswatini","flag":"🇸🇿"},{"name":"Ethiopia","flag":"🇪🇹"},{"name":"Fiji","flag":"🇫🇯"},{"name":"Finland","flag":"🇫🇮"},{"name":"France","flag":"🇫🇷"},{"name":"Gabon","flag":"🇬🇦"},{"name":"Gambia","flag":"🇬🇲"},{"name":"Georgia","flag":"🇬🇪"},{"name":"Germany","flag":"🇩🇪"},{"name":"Ghana","flag":"🇬🇭"},{"name":"Greece","flag":"🇬🇷"},{"name":"Grenada","flag":"🇬🇩"},{"name":"Guatemala","flag":"🇬🇹"},{"name":"Guinea","flag":"🇬🇳"},{"name":"Guinea-Bissau","flag":"🇬🇼"},{"name":"Guyana","flag":"🇬🇾"},{"name":"Haiti","flag":"🇭🇹"},{"name":"Honduras","flag":"🇭🇳"},{"name":"Hungary","flag":"🇭🇺"},{"name":"Iceland","flag":"🇮🇸"},{"name":"India","flag":"🇮🇳"},{"name":"Indonesia","flag":"🇮🇩"},{"name":"Iran","flag":"🇮🇷"},{"name":"Iraq","flag":"🇮🇶"},{"name":"Ireland","flag":"🇮🇪"},{"name":"Israel","flag":"🇮🇱"},{"name":"Italy","flag":"🇮🇹"},{"name":"Jamaica","flag":"🇯🇲"},{"name":"Japan","flag":"🇯🇵"},{"name":"Jordan","flag":"🇯🇴"},{"name":"Kazakhstan","flag":"🇰🇿"},{"name":"Kenya","flag":"🇰🇪"},{"name":"Kiribati","flag":"🇰🇮"},{"name":"Kosovo","flag":"🇽🇰"},{"name":"Kuwait","flag":"🇰🇼"},{"name":"Kyrgyzstan","flag":"🇰🇬"},{"name":"Laos","flag":"🇱🇦"},{"name":"Latvia","flag":"🇱🇻"},{"name":"Lebanon","flag":"🇱🇧"},{"name":"Lesotho","flag":"🇱🇸"},{"name":"Liberia","flag":"🇱🇷"},{"name":"Libya","flag":"🇱🇾"},{"name":"Liechtenstein","flag":"🇱🇮"},{"name":"Lithuania","flag":"🇱🇹"},{"name":"Luxembourg","flag":"🇱🇺"},{"name":"Madagascar","flag":"🇲🇬"},{"name":"Malawi","flag":"🇲🇼"},{"name":"Malaysia","flag":"🇲🇾"},{"name":"Maldives","flag":"🇲🇻"},{"name":"Mali","flag":"🇲🇱"},{"name":"Malta","flag":"🇲🇹"},{"name":"Marshall Islands","flag":"🇲🇭"},{"name":"Mauritania","flag":"🇲🇷"},{"name":"Mauritius","flag":"🇲🇺"},{"name":"Mexico","flag":"🇲🇽"},{"name":"Micronesia","flag":"🇫🇲"},{"name":"Moldova","flag":"🇲🇩"},{"name":"Monaco","flag":"🇲🇨"},{"name":"Mongolia","flag":"🇲🇳"},{"name":"Montenegro","flag":"🇲🇪"},{"name":"Morocco","flag":"🇲🇦"},{"name":"Mozambique","flag":"🇲🇿"},{"name":"Myanmar","flag":"🇲🇲"},{"name":"Namibia","flag":"🇳🇦"},{"name":"Nauru","flag":"🇳🇷"},{"name":"Nepal","flag":"🇳🇵"},{"name":"Netherlands","flag":"🇳🇱"},{"name":"New Zealand","flag":"🇳🇿"},{"name":"Nicaragua","flag":"🇳🇮"},{"name":"Niue","flag":"🇳🇺"},{"name":"Niger","flag":"🇳🇪"},{"name":"Nigeria","flag":"🇳🇬"},{"name":"North Korea","flag":"🇰🇵"},{"name":"North Macedonia","flag":"🇲🇰"},{"name":"Norway","flag":"🇳🇴"},{"name":"Oman","flag":"🇴🇲"},{"name":"Pakistan","flag":"🇵🇰"},{"name":"Palau","flag":"🇵🇼"},{"name":"Palestine","flag":"🇵🇸"},{"name":"Panama","flag":"🇵🇦"},{"name":"Papua New Guinea","flag":"🇵🇬"},{"name":"Paraguay","flag":"🇵🇾"},{"name":"Peru","flag":"🇵🇪"},{"name":"Philippines","flag":"🇵🇭"},{"name":"Poland","flag":"🇵🇱"},{"name":"Portugal","flag":"🇵🇹"},{"name":"Qatar","flag":"🇶🇦"},{"name":"Republic of the Congo","flag":"🇨🇬"},{"name":"Romania","flag":"🇷🇴"},{"name":"Russia","flag":"🇷🇺"},{"name":"Rwanda","flag":"🇷🇼"},{"name":"Saint Kitts and Nevis","flag":"🇰🇳"},{"name":"Saint Lucia","flag":"🇱🇨"},{"name":"Saint Vincent and the Grenadines","flag":"🇻🇨"},{"name":"Samoa","flag":"🇼🇸"},{"name":"San Marino","flag":"🇸🇲"},{"name":"Sao Tome and Principe","flag":"🇸🇹"},{"name":"Saudi Arabia","flag":"🇸🇦"},{"name":"Senegal","flag":"🇸🇳"},{"name":"Serbia","flag":"🇷🇸"},{"name":"Seychelles","flag":"🇸🇨"},{"name":"Sierra Leone","flag":"🇸🇱"},{"name":"Singapore","flag":"🇸🇬"},{"name":"Slovakia","flag":"🇸🇰"},{"name":"Slovenia","flag":"🇸🇮"},{"name":"Solomon Islands","flag":"🇸🇧"},{"name":"Somalia","flag":"🇸🇴"},{"name":"South Africa","flag":"🇿🇦"},{"name":"South Korea","flag":"🇰🇷"},{"name":"South Sudan","flag":"🇸🇸"},{"name":"Spain","flag":"🇪🇸"},{"name":"Sri Lanka","flag":"🇱🇰"},{"name":"Sudan","flag":"🇸🇩"},{"name":"Suriname","flag":"🇸🇷"},{"name":"Sweden","flag":"🇸🇪"},{"name":"Switzerland","flag":"🇨🇭"},{"name":"Syria","flag":"🇸🇾"},{"name":"Taiwan","flag":"🇹🇼"},{"name":"Tajikistan","flag":"🇹🇯"},{"name":"Tanzania","flag":"🇹🇿"},{"name":"Thailand","flag":"🇹🇭"},{"name":"Timor-Leste","flag":"🇹🇱"},{"name":"Togo","flag":"🇹🇬"},{"name":"Tonga","flag":"🇹🇴"},{"name":"Trinidad and Tobago","flag":"🇹🇹"},{"name":"Tunisia","flag":"🇹🇳"},{"name":"Turkey","flag":"🇹🇷"},{"name":"Turkmenistan","flag":"🇹🇲"},{"name":"Tuvalu","flag":"🇹🇻"},{"name":"Uganda","flag":"🇺🇬"},{"name":"Ukraine","flag":"🇺🇦"},{"name":"United Arab Emirates","flag":"🇦🇪"},{"name":"United Kingdom","flag":"🇬🇧"},{"name":"United States","flag":"🇺🇸"},{"name":"Uruguay","flag":"🇺🇾"},{"name":"Uzbekistan","flag":"🇺🇿"},{"name":"Vanuatu","flag":"🇻🇺"},{"name":"Vatican City","flag":"🇻🇦"},{"name":"Venezuela","flag":"🇻🇪"},{"name":"Vietnam","flag":"🇻🇳"},{"name":"Yemen","flag":"🇾🇪"},{"name":"Zambia","flag":"🇿🇲"},{"name":"Zimbabwe","flag":"🇿🇼"}]`);const mt=pt(class extends dt{constructor(e){if(super(e),e.type!==P.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((s=>s!==""))));for(const s in t)t[s]&&!this.nt?.has(s)&&this.st.add(s);return this.render(t)}const i=e.element.classList;for(const s of this.st)s in t||(i.remove(s),this.st.delete(s));for(const s in t){const o=!!t[s];o===this.st.has(s)||this.nt?.has(s)||(o?(i.add(s),this.st.add(s)):(i.remove(s),this.st.delete(s)))}return C}});const Qe=e=>e.strings===void 0,ti={},ei=(e,t=ti)=>e._$AH=t;const ii=pt(class extends dt{constructor(e){if(super(e),e.type!==P.PROPERTY&&e.type!==P.ATTRIBUTE&&e.type!==P.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Qe(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===C||t===u)return t;const i=e.element,s=e.name;if(e.type===P.PROPERTY){if(t===i[s])return C}else if(e.type===P.BOOLEAN_ATTRIBUTE){if(!!t===i.hasAttribute(s))return C}else if(e.type===P.ATTRIBUTE&&i.getAttribute(s)===t+"")return C;return ei(e),t}});const si=e=>typeof e!="string"&&"strTag"in e,oi=(e,t,i)=>{let s=e[0];for(let o=1;o<e.length;o++)s+=t[o-1],s+=e[o];return s};const ni=(e=>si(e)?oi(e.strings,e.values):e);let D=ni;class ai{constructor(){this.settled=!1,this.promise=new Promise((t,i)=>{this._resolve=t,this._reject=i})}resolve(t){this.settled=!0,this._resolve(t)}reject(t){this.settled=!0,this._reject(t)}}for(let e=0;e<256;e++)(e>>4&15).toString(16)+(e&15).toString(16);let ri=new ai;ri.resolve();function li(e,t){return t.some(i=>e.has(i))}function ci(e,t){const i=[...e],s=[...t],o=i.length,n=s.length;if(o===0)return!0;let a=0,r=0;for(;r<n;){if(s[r]===i[a]&&(a+=1),a>=o)return!0;r+=1}return!1}const hi="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501%202.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131%202.7226499%201.81402515z'%20%3e%3c/path%3e%3c/svg%3e",pi="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499%203.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501%202.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131%202.7226499-1.81402514z'%20%3e%3c/path%3e%3c/svg%3e",di="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m50%200c27.6142375%200%2050%2022.3857625%2050%2050s-22.3857625%2050-50%2050-50-22.3857625-50-50%2022.3857625-50%2050-50zm23.8159475%2026.1840525c-1.4033215-1.4033215-3.5816761-1.5592461-5.1572272-.4677738l-.5598841.4677738-18.0988362%2018.0989475-18.0988362-18.0989475-.5598841-.4677738c-1.5755511-1.0914723-3.7539057-.9355477-5.1572272.4677738-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113l18.0989475%2018.0988362-18.0989475%2018.0988362c-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113%201.4033215%201.4033215%203.5816761%201.5592461%205.1572272.4677738l.5598841-.4677738%2018.0988362-18.0989475%2018.0988362%2018.0989475.5598841.4677738c1.5755511%201.0914723%203.7539057.9355477%205.1572272-.4677738%201.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113l-18.0989475-18.0988362%2018.0989475-18.0988362c1.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113z'%20fill-rule='evenodd'%20%3e%3c/path%3e%3c/svg%3e";var ui=Object.defineProperty,gi=Object.getOwnPropertyDescriptor,v=(e,t,i,s)=>{for(var o=s>1?void 0:s?gi(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&ui(t,i,o),o};const fi={all:()=>!0,prefix:(e,t)=>t.startsWith(e),suffix:(e,t)=>t.endsWith(e),substring:(e,t)=>t.includes(e),subsequence:ci},mi="list",bi="substring",yi=e=>e,vi=e=>e.toLocaleLowerCase();let m=class extends ${constructor(){super(),this.options=[],this.behavior=mi,this.maxAutocompleteEntries=Number.POSITIVE_INFINITY,this.filter=bi,this.caseSensitive=!1,this.sort=!1,this.wrapArrowKeys=!1,this.stayOpen=!1,this.clearable=!1,this.open=!1,this.disabled=!1,this.required=!1,this.value=null,this.hasFocus=!1,this.highlightedOption=null,this.enteredText="",this.filterText="",this.losingFocus=!1,this.optionsByID=new Map,this.optionFilteringValues=new Map,this.optionsRespectingSortFlag=[],this.filteredOptions=[],this.internals=this.attachInternals()}render(){const e=mt({disabled:this.disabled,focused:this.hasFocus});return l`
      <div id="container" part="container">
        ${this.labelTemplate}
        <div id="main-widget-row" class=${e} part="combo-box">
          ${this.textInputTemplate}
          ${this.clearable?this.clearButtonTemplate:u}
          ${this.caretButtonTemplate}
        </div>
        ${this.optionsListTemplate}
      </div>
    `}willUpdate(e){(e.has("options")||e.has("caseSensitive"))&&this.rebuildOptionFilteringValues(),e.has("options")&&this.rebuildOptionIDMap(),(e.has("options")||e.has("sort"))&&this.rebuildSortedOptions(),li(e,["options","behavior","maxAutocompleteEntries","filter","filterText","caseSensitive","sort"])&&this.rebuildFilteredOptions(),e.has("open")&&(this.open?this.value&&this.setHighlightedOption(this.selectedOption):this.setHighlightedOption(null)),e.has("required")&&this.updateFormValidity()}updated(e){e.has("value")&&this.handleValueChanged(),e.has("options")&&this.behavior!=="freeform"&&!this.selectedOption&&this.clearSelectedOption(),e.has("open")&&(this.open?(this.positionOptionsMenu(),this.optionsList?.showPopover?.(),this.optionsList?.classList.add("visible")):(this.optionsList?.hidePopover?.(),this.optionsList?.classList.remove("visible")))}get labelTemplate(){return l`
      <label id="label" for="text-input" part="label">
        <slot name="label"></slot>
      </label>
    `}get textInputTemplate(){const e=mt({"clear-padding":this.clearable&&!this.shouldShowClearButton});return l`
      <input
        type="text"
        id="text-input"
        class=${e}
        .value=${ii(this.enteredText)}
        placeholder=${st(this.placeholder)}
        part="text-input"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-controls="options-list"
        aria-expanded=${this.open}
        aria-activedescendant=${st(this.highlightedOption?.id)}
        ?readonly=${this.behavior==="select-only"}
        ?disabled=${this.disabled}
        ?required=${this.required}
        @click=${this.handleComboBoxClick}
        @keydown=${this.handleComboBoxKeyDown}
        @input=${this.handleTextBoxInput}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      />
    `}get clearButtonTemplate(){return l`
      <button
        type="button"
        id="clear-button"
        part="clear-button"
        tabindex="-1"
        ?hidden=${!this.shouldShowClearButton}
        @click=${this.handleClearButtonClick}
      >
        <span class="sr-only">${D("Clear")}</span>
        <slot name="clear-button">
          <img
            class="icon clear-icon"
            part="icon clear-icon"
            src=${di}
            alt=""
            aria-hidden="true"
          />
        </slot>
      </button>
    `}get caretTemplate(){return l`
      <slot name="caret-closed" ?hidden=${this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${hi}
          alt=""
          aria-hidden="true"
        />
      </slot>
      <slot name="caret-open" ?hidden=${!this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${pi}
          alt=""
          aria-hidden="true"
        />
      </slot>
    `}get caretButtonTemplate(){return l`
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
        <span class="sr-only">${D("Toggle options")}</span>
        ${this.caretTemplate}
      </button>
    `}get optionsListTemplate(){return l`
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
        ${N(this.open,()=>this.optionTemplates)}
        <slot name="options-list-bottom"></slot>
      </ul>
    `}get optionTemplates(){return this.filteredOptions.length===0&&this.maxAutocompleteEntries>0?[this.emptyOptionsTemplate]:this.filteredOptions.map(e=>{const t=e===this.highlightedOption,i=mt({option:!0,highlight:t});return l`
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
      `})}get emptyOptionsTemplate(){return l`
      <li id="empty-options" part="empty-options">
        <slot name="empty-options">${D("No matching options")}</slot>
      </li>
    `}handleOptionPointerEnter(e){this.handleOptionPointerMove(e)}handleOptionPointerMove(e){const t=e.currentTarget,i=this.getOptionFor(t.id);i&&this.setHighlightedOption(i)}handleOptionClick(e){const t=e.currentTarget,i=this.getOptionFor(t.id);i&&(this.setSelectedOption(i.id),this.stayOpen||this.closeOptionsMenu())}handleComboBoxKeyDown(e){switch(e.key){case"Enter":this.handleEnterPressed();break;case"Escape":this.handleEscapePressed();break;case"ArrowUp":e.altKey?this.handleAltUpArrowPressed():this.handleUpArrowPressed();break;case"ArrowDown":e.altKey?this.handleAltDownArrowPressed():this.handleDownArrowPressed();break;case"Tab":this.handleTabPressed();return;case" ":this.handleSpacePressed(e);return;default:return}e.stopPropagation(),e.preventDefault()}async handleTextBoxInput(){const e=this.textInput?.value??"";this.enteredText=e,this.setFilterText(e),this.openOptionsMenu(),await this.updateComplete,this.highlightFirstOption()}handleEnterPressed(){if(!this.open){this.openOptionsMenu();return}this.highlightedOption?this.setSelectedOption(this.highlightedOption.id):this.behavior==="freeform"&&this.setValue(this.enteredText),this.stayOpen||(this.open=!1)}handleEscapePressed(){if(this.open){this.closeOptionsMenu();return}this.clearSelectedOption()}handleUpArrowPressed(){this.open||this.openOptionsMenu(),this.highlightPreviousOption()}handleDownArrowPressed(){this.open||this.openOptionsMenu(),this.highlightNextOption()}handleAltUpArrowPressed(){this.closeOptionsMenu()}handleAltDownArrowPressed(){this.openOptionsMenu()}handleTabPressed(){this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1))}handleSpacePressed(e){this.behavior==="select-only"&&(this.open?this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1)):this.openOptionsMenu(),e.stopPropagation(),e.preventDefault())}handleComboBoxClick(){this.toggleOptionsMenu()}handleClearButtonClick(){this.clearSelectedOption(),this.textInput?.focus(),this.openOptionsMenu()}handleFocus(){this.behavior!=="select-only"&&this.textInput?.focus(),this.hasFocus=!0,this.losingFocus=!1}handleBlur(){this.hasFocus=!1,this.losingFocus=!0,setTimeout(()=>{this.losingFocus&&!this.shadowRoot?.activeElement&&(this.losingFocus=!1,this.closeOptionsMenu(),this.behavior==="list"?this.setTextValue(this.selectedOption?.text??"",!1):this.behavior==="freeform"&&(this.enteredText||this.value)&&this.setValue(this.enteredText))},0)}handleValueChanged(){if(this.value==null){this.enteredText&&this.setTextValue("",!1);return}const e=this.getOptionFor(this.value);if(this.behavior==="freeform"){const t=e?.text??this.value;t!==this.enteredText&&this.setTextValue(t);return}if(!e){this.clearSelectedOption();return}this.enteredText!==e.text&&(this.setTextValue(e.text,!1),this.setFilterText(""))}highlightFirstOption(){this.setHighlightedOption(this.firstFilteredOption)}highlightLastOption(){this.setHighlightedOption(this.lastFilteredOption)}highlightPreviousOption(){const{filteredOptions:e,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightLastOption();return}const{highlightedIndex:i}=this,s=this.wrapArrowKeys&&i===0?t:Math.max(i-1,0);this.setHighlightedOption(e[s])}highlightNextOption(){const{filteredOptions:e,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightFirstOption();return}const{highlightedIndex:i}=this,s=this.wrapArrowKeys&&i===t?0:Math.min(i+1,t);this.setHighlightedOption(e[s])}async setHighlightedOption(e){this.highlightedOption=e,await this.updateComplete;const{optionsList:t,highlightedElement:i}=this;if(!i||!t)return;const s=i.getBoundingClientRect(),o=t.getBoundingClientRect();(s.top<o.top||s.bottom>o.bottom)&&i.scrollIntoView({block:"nearest"})}setSelectedOption(e){const t=this.getOptionFor(e);if(!t)throw new RangeError("Unknown option ID");const i=this.value;this.value=t.id,this.internals.setFormValue(this.value),this.setTextValue(t.text,!1),this.setFilterText(""),this.value!==i&&this.emitChangeEvent(),t.onSelected?.(t)}clearSelectedOption(){const e=this.value;this.value=null,this.internals.setFormValue(this.value),this.setTextValue(""),this.value!==e&&this.emitChangeEvent()}setValue(e){if(this.behavior==="freeform"){const t=this.value;this.value=e,this.internals.setFormValue(this.value),this.setTextValue(e),this.value!==t&&this.emitChangeEvent()}else this.setSelectedOption(e)}setTextValue(e,t=!0){this.textInput&&(this.textInput.value=e),this.enteredText=e,t&&this.setFilterText(e)}setFilterText(e){const{caseTransform:t}=this;this.filterText=t(e)}openOptionsMenu(){this.open=!0,this.emitToggleEvent()}closeOptionsMenu(){this.open=!1,this.emitToggleEvent()}toggleOptionsMenu(){this.open=!this.open,this.emitToggleEvent()}updateFormValidity(){this.required&&!this.value?this.internals.setValidity({valueMissing:!0},D("A value is required")):this.internals.setValidity({})}emitChangeEvent(){this.dispatchEvent(new CustomEvent("change",{detail:this.value}))}emitToggleEvent(){this.dispatchEvent(new CustomEvent("toggle",{detail:this.open}))}get isEmpty(){return!this.selectedOption&&!this.enteredText}get shouldShowClearButton(){return this.clearable&&!this.disabled&&!this.isEmpty}positionOptionsMenu(){const{mainWidgetRow:e,optionsList:t}=this;if(!e||!t)return;const i=e.getBoundingClientRect(),{innerHeight:s,scrollX:o,scrollY:n}=window,a=i.top,r=s-i.bottom,c="var(--combo-box-list-max-height--)",y={top:`${i.bottom+n}px`,left:`${i.left+o}px`,width:`var(--combo-box-list-width--, ${i.width}px)`,maxHeight:`min(${c}, ${r}px)`};Object.assign(t.style,y),setTimeout(()=>{const h=t.getBoundingClientRect().bottom>=s,x=a>r;h&&x&&(t.style.top="auto",t.style.bottom=`${s-i.top-n}px`,t.style.maxHeight=`min(${c}, ${a}px)`)},0)}get caseTransform(){return this.caseSensitive?yi:vi}getOptionFor(e){return this.optionsByID.get(e)??null}rebuildOptionIDMap(){this.optionsByID.clear();for(const e of this.options)this.optionsByID.set(e.id,e)}rebuildSortedOptions(){this.sort?this.optionsRespectingSortFlag=[...this.options].sort((e,t)=>{const i=this.optionFilteringValues.get(e),s=this.optionFilteringValues.get(t);return i.localeCompare(s)}):this.optionsRespectingSortFlag=this.options}rebuildOptionFilteringValues(){this.optionFilteringValues.clear();const{caseTransform:e}=this;for(const t of this.options){const i=e(t.text);this.optionFilteringValues.set(t,i)}}rebuildFilteredOptions(){const e=this.behavior==="select-only"?"all":this.filter,t=typeof e=="string"?fi[e]:e,i=this.optionsRespectingSortFlag.filter(s=>{const o=this.optionFilteringValues.get(s);return o?t(this.filterText,o,s):!1}).slice(0,this.maxAutocompleteEntries);this.filteredOptions=i}get firstFilteredOption(){return this.filteredOptions[0]??null}get lastFilteredOption(){return this.filteredOptions[this.lastFilteredIndex]??null}get lastFilteredIndex(){return this.filteredOptions.length-1}get selectedOption(){return this.value==null?null:this.getOptionFor(this.value)}get highlightedIndex(){return this.highlightedOption?this.filteredOptions.indexOf(this.highlightedOption):-1}get highlightedElement(){return this.highlightedOption?this.shadowRoot.getElementById(this.highlightedOption.id):null}static get styles(){const e=T`
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
    `;return[V,e]}};m.formAssociated=!0;m.shadowRootOptions={...$.shadowRootOptions,delegatesFocus:!0};v([p({type:Array})],m.prototype,"options",2);v([p({type:String})],m.prototype,"placeholder",2);v([p({type:String})],m.prototype,"behavior",2);v([p({type:Number,attribute:"max-autocomplete-entries"})],m.prototype,"maxAutocompleteEntries",2);v([p({type:String})],m.prototype,"filter",2);v([p({type:Boolean,reflect:!0,attribute:"case-sensitive"})],m.prototype,"caseSensitive",2);v([p({type:Boolean,reflect:!0})],m.prototype,"sort",2);v([p({type:Boolean,reflect:!0,attribute:"wrap-arrow-keys"})],m.prototype,"wrapArrowKeys",2);v([p({type:Boolean,reflect:!0,attribute:"stay-open"})],m.prototype,"stayOpen",2);v([p({type:Boolean,reflect:!0})],m.prototype,"clearable",2);v([p({type:Boolean,reflect:!0})],m.prototype,"open",2);v([p({type:Boolean,reflect:!0})],m.prototype,"disabled",2);v([p({type:Boolean,reflect:!0})],m.prototype,"required",2);v([p({type:String})],m.prototype,"value",2);v([g()],m.prototype,"hasFocus",2);v([g()],m.prototype,"highlightedOption",2);v([g()],m.prototype,"enteredText",2);v([g()],m.prototype,"filterText",2);v([w("#main-widget-row")],m.prototype,"mainWidgetRow",2);v([w("#text-input")],m.prototype,"textInput",2);v([w("#options-list")],m.prototype,"optionsList",2);m=v([O("ia-combo-box")],m);var $i=Object.defineProperty,wi=Object.getOwnPropertyDescriptor,b=(e,t,i,s)=>{for(var o=s>1?void 0:s?wi(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&$i(t,i,o),o};const xi=[{label:"Width",cssVariable:"--ia-theme-combo-box-width",defaultValue:"250px",inputType:"text"},{label:"Padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown width",cssVariable:"--combo-box-list-width",defaultValue:"",inputType:"text"},{label:"Dropdown max height",cssVariable:"--combo-box-list-max-height",defaultValue:"250px",inputType:"text"}],le=[{id:"red",text:"Red"},{id:"orange",text:"Orange"},{id:"yellow",text:"Yellow"},{id:"green",text:"Green"},{id:"blue",text:"Blue"},{id:"indigo",text:"Indigo"},{id:"violet",text:"Violet"}],_i=le.map(e=>({...e,content:l` <span style="display: flex; align-items: center">
      <span style="flex: 1">${e.text}</span>
      <div style="width: 15px; height: 15px; background:${e.id}"></div>
    </span>`})),Kt=re.map(e=>({id:e.name,text:e.name})),Si=re.map(e=>({id:e.name,text:e.name,content:l`<span>${e.flag}</span>&nbsp;<span>${e.name}</span>`})),Oi="list",Ai="Choices",qt="Select an option...",Wt=50,Ci="substring";let f=class extends ${constructor(){super(...arguments),this.options=Kt,this.behavior=Oi,this.label=Ai,this.placeholder=qt,this.maxAutocompleteEntries=Wt,this.filterFn=Ci,this.caseSensitive=!1,this.shouldSort=!1,this.wrapArrowKeys=!0,this.clearable=!0,this.disabled=!1,this.announcerText=""}render(){return l`
      <story-template
        elementTag="ia-combo-box"
        elementClassName="IAComboBox"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:xi}}
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
                  value=${qt}
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
                  value=${Wt}
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
        ${Object.entries(o).map(([a,r])=>r?r===!0?a:r?`${a}=${r}`:"":"").join(`
  `)}
      >
        <span slot="label">${this.label}</span>
      </ia-combo-box>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(e){e.preventDefault(),this.updateOptions(),this.behavior=this.behaviorSelect.value,this.label=this.labelInput.value,this.placeholder=this.placeholderInput.value,this.maxAutocompleteEntries=Number(this.maxAutocompleteInput.value),this.filterFn=this.filterFnSelect.value,this.caseSensitive=this.caseSensitiveCheck.checked,this.shouldSort=this.sortCheck.checked,this.wrapArrowKeys=this.wrapArrowKeysCheck.checked,this.clearable=this.clearableCheck.checked,this.disabled=this.disabledCheck.checked}updateOptions(){switch(this.optionSetSelect.value){case"colors":this.options=this.customContentCheck.checked?_i:le;break;case"countries":this.options=this.customContentCheck.checked?Si:Kt;break;default:this.options=[]}}handleComboBoxChange(e){this.announcerText=`New value is: ${e.detail}`}static get styles(){return T`
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
    `}};b([g()],f.prototype,"options",2);b([g()],f.prototype,"behavior",2);b([g()],f.prototype,"label",2);b([g()],f.prototype,"placeholder",2);b([g()],f.prototype,"maxAutocompleteEntries",2);b([g()],f.prototype,"filterFn",2);b([g()],f.prototype,"caseSensitive",2);b([g()],f.prototype,"shouldSort",2);b([g()],f.prototype,"wrapArrowKeys",2);b([g()],f.prototype,"clearable",2);b([g()],f.prototype,"disabled",2);b([g()],f.prototype,"announcerText",2);b([w("#settings__options")],f.prototype,"optionSetSelect",2);b([w("#settings__custom-content")],f.prototype,"customContentCheck",2);b([w("#settings__behavior")],f.prototype,"behaviorSelect",2);b([w("#settings__label")],f.prototype,"labelInput",2);b([w("#settings__placeholder")],f.prototype,"placeholderInput",2);b([w("#settings__max-entries")],f.prototype,"maxAutocompleteInput",2);b([w("#settings__filter-fn")],f.prototype,"filterFnSelect",2);b([w("#settings__case-sensitive")],f.prototype,"caseSensitiveCheck",2);b([w("#settings__sort")],f.prototype,"sortCheck",2);b([w("#settings__wrap")],f.prototype,"wrapArrowKeysCheck",2);b([w("#settings__clearable")],f.prototype,"clearableCheck",2);b([w("#settings__disabled")],f.prototype,"disabledCheck",2);f=b([O("ia-combo-box-story")],f);const Ti=Object.freeze(Object.defineProperty({__proto__:null,get IAComboBoxStory(){return f}},Symbol.toStringTag,{value:"Module"}));var Ei=Object.defineProperty,Pi=Object.getOwnPropertyDescriptor,F=(e,t,i,s)=>{for(var o=s>1?void 0:s?Pi(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&Ei(t,i,o),o};let M=class extends ${constructor(){super(...arguments),this.loadingTitle=D("Loading..."),this.successTitle=D("Success"),this.errorTitle=D("Error"),this.loadingStyle="ring-dots",this.mode="loading"}render(){return l`${ae(this.mode,[["loading",()=>this.loadingIndicatorTemplate],["success",()=>this.successIndicatorTemplate],["error",()=>this.errorIndicatorTemplate]])}`}get loadingIndicatorTemplate(){return l`
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
    `}get successIndicatorTemplate(){return l`
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
    `}get errorIndicatorTemplate(){return l`
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
    `}get shouldShowLoadingDots(){return this.loadingStyle!=="ring"}static get styles(){return[V,T`
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
      `]}};F([p({type:String})],M.prototype,"loadingTitle",2);F([p({type:String})],M.prototype,"successTitle",2);F([p({type:String})],M.prototype,"errorTitle",2);F([p({type:String})],M.prototype,"loadingStyle",2);F([p({type:String})],M.prototype,"mode",2);M=F([O("ia-status-indicator")],M);var Ii=Object.getOwnPropertyDescriptor,ki=(e,t,i,s)=>{for(var o=s>1?void 0:s?Ii(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=a(o)||o);return o};const Li=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"1.25rem"},{label:"Color - loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Color - success",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"},{label:"Color - error",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}],ji=[{label:"Mode",propertyName:"mode",defaultValue:"loading",inputType:"radio",radioOptions:["loading","success","error"]},{label:"Accessible title - loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{label:"Loading style",propertyName:"loadingStyle",defaultValue:"ring-dots",inputType:"radio",radioOptions:["ring-dots","ring"]},{label:"Accessible title - success",propertyName:"successTitle",defaultValue:"Success"},{label:"Accessible title - error",propertyName:"errorTitle",defaultValue:"Error"}];let wt=class extends ${render(){return l`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .styleInputData=${{settings:Li}}
        .propInputData=${{settings:ji}}
      >
        <ia-status-indicator slot="demo"></ia-status-indicator>
      </story-template>
    `}};wt=ki([O("ia-status-indicator-story")],wt);const Di=Object.freeze(Object.defineProperty({__proto__:null,get IAStatusIndicatorStory(){return wt}},Symbol.toStringTag,{value:"Module"})),Bi=ie`
  <svg
    class="icon-loader"
    height="20"
    viewBox="0 0 128 128"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <circle cx="16" cy="64" r="16" class="fill-color" fill-opacity="1" />
      <circle cx="16" cy="64" r="14.344" class="fill-color" fill-opacity="1" transform="rotate(45 64 64)" />
      <circle cx="16" cy="64" r="12.531" class="fill-color" fill-opacity="1" transform="rotate(90 64 64)" />
      <circle cx="16" cy="64" r="10.75" class="fill-color" fill-opacity="1" transform="rotate(135 64 64)" />
      <circle cx="16" cy="64" r="10.063" class="fill-color" fill-opacity="1" transform="rotate(180 64 64)" />
      <circle cx="16" cy="64" r="8.063" class="fill-color" fill-opacity="1" transform="rotate(225 64 64)" />
      <circle cx="16" cy="64" r="6.438" class="fill-color" fill-opacity="1" transform="rotate(270 64 64)" />
      <circle cx="16" cy="64" r="5.375" class="fill-color" fill-opacity="1" transform="rotate(315 64 64)" />
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64"
        calcMode="discrete"
        dur="720ms"
        repeatCount="indefinite"
      />
    </g>
  </svg>
`,Mi=ie`
  <svg
    class="icon-question"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g class="fill-color" fill-rule="nonzero">
      <path
        d="m10.7078125 12.8359375v-.4140625c0-.765625.2890625-1.1484375 1.328125-1.75
           1.1015625-.6484375 1.671875-1.46875 1.671875-2.6484375
           0-1.78125-1.4765625-3.0234375-3.7109375-3.0234375
           -2.3984375 0-3.7578125 1.34375-3.796875 3.265625h2.1171875
           c.046875-.8828125.640625-1.453125 1.5390625-1.453125
           .890625 0 1.484375.5390625 1.484375 1.28125s-.3046875 1.125-1.3125 1.7265625
           c-1.078125.6328125-1.5078125 1.3359375-1.40625 2.5625l.015625.453125z"
      />
      <path
        d="m9.7 16.57c.711 0 1.281-.539 1.281-1.227s-.57-1.226-1.28-1.226
           c-.704 0-1.274.539-1.274 1.226s.57 1.227 1.274 1.227z"
      />
      <path
        d="m10 0c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z
           m0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z"
      />
    </g>
  </svg>
`;var Ri=Object.defineProperty,Ni=Object.getOwnPropertyDescriptor,gt=(e,t,i,s)=>{for(var o=s>1?void 0:s?Ni(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&Ri(t,i,o),o};let Y=class extends ${constructor(){super(...arguments),this.widgetKey="",this.buttonVisible=!0,this.isLoading=!1,this.zendeskReady=!1}async initiateZenDesk(){this.isLoading=!0,this.dispatchEvent(new Event("zendeskHelpButtonClicked"));try{if(!this.zendeskReady){if(await this.loadZendeskScript(),await this.waitForZendesk(),!window.zE){this.isLoading=!1;return}window.zE("messenger:on","open",()=>{this.buttonVisible=!1,this.isLoading=!1}),window.zE("messenger:on","close",()=>{setTimeout(()=>{this.buttonVisible=!0},500)}),this.zendeskReady=!0}if(!window.zE){this.isLoading=!1;return}window.zE("messenger","open")}catch(e){this.isLoading=!1,console.error("[ia-zendesk-widget]",e)}}loadZendeskScript(){return new Promise((e,t)=>{if(document.getElementById("ze-snippet")){e();return}const i=document.createElement("script");i.id="ze-snippet",i.src=`https://static.zdassets.com/ekr/snippet.js?key=${this.widgetKey}`,i.onload=()=>e(),i.onerror=()=>t(new Error("Failed to load Zendesk script")),document.head.appendChild(i)})}waitForZendesk(e=1e4){return new Promise((t,i)=>{const s=setInterval(()=>{window.zE&&(clearInterval(s),clearTimeout(o),t())},100),o=setTimeout(()=>{clearInterval(s),i(new Error("Zendesk API did not initialise in time"))},e)})}get iconTemplate(){return this.isLoading?Bi:Mi}render(){return l`
      <button
        class="help-widget ${this.buttonVisible?"":"hidden"}"
        @click=${this.initiateZenDesk}
      >
        ${this.iconTemplate}
        <span class="hidden-sm">Help</span>
      </button>
    `}static get styles(){return T`
      :host {
        --button-blue: #194880;
        --white: #fff;
        --icon-fill-color: var(--white);
        --link-color: var(--white);
      }

      .help-widget {
        width: 108px;
        height: 46px;
        margin: 14px 20px;
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 999998;
        background: var(--button-blue);
        color: var(--link-color);
        letter-spacing: 0.6px;
        font-size: 14px;
        transition: opacity 0.12s linear;
        border-radius: 999rem;
        border: 0;
        outline: none;
        font-weight: 700;
        cursor: pointer;
        vertical-align: middle;
      }

      .fill-color {
        fill: var(--icon-fill-color);
      }

      .help-widget svg {
        vertical-align: middle;
        margin-right: 3px;
        pointer-events: none;
      }

      .help-widget .hidden-sm {
        pointer-events: none;
      }

      .hidden {
        opacity: 0;
        display: none;
        visibility: hidden;
      }

      @media (max-width: 767px) {
        .hidden-sm {
          display: none;
        }

        .help-widget {
          padding: 13px;
          width: initial;
        }

        .help-widget svg {
          margin-right: 0;
        }
      }
    `}};gt([p({type:String})],Y.prototype,"widgetKey",2);gt([g()],Y.prototype,"buttonVisible",2);gt([g()],Y.prototype,"isLoading",2);Y=gt([O("ia-zendesk-widget")],Y);var Ui=Object.defineProperty,Vi=Object.getOwnPropertyDescriptor,ce=(e,t,i,s)=>{for(var o=s>1?void 0:s?Vi(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&Ui(t,i,o),o};const Fi="6fe87bd8-d4e3-4b42-8632-be6eb933d54d";let rt=class extends ${constructor(){super(...arguments),this.widgetMounted=!1}activateWidget(){this.widgetMounted=!0}get usageExample(){return["<ia-zendesk-widget",'  .widgetKey="YOUR_KEY"',"></ia-zendesk-widget>"].join(`
`)}render(){return l`
      <story-template
        elementTag="ia-zendesk-widget"
        elementClassName="IAZendeskWidget"
        .customExampleUsage=${this.usageExample}
      >
        <div slot="demo">
          <ia-button
            @click=${this.activateWidget}
            ?disabled=${this.widgetMounted}
          >
            ${this.widgetMounted?"Activated!":"Activate help widget"}
          </ia-button>

          ${this.widgetMounted?l`<ia-zendesk-widget
                .widgetKey=${Fi}
              ></ia-zendesk-widget>`:u}
        </div>
      </story-template>
    `}};ce([g()],rt.prototype,"widgetMounted",2);rt=ce([O("ia-zendesk-widget-story")],rt);const zi=Object.freeze(Object.defineProperty({__proto__:null,get IAZendeskWidgetStory(){return rt}},Symbol.toStringTag,{value:"Module"})),Hi="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='36.283'%20height='36.283'%3e%3cpath%20d='M35.531%2017.391h-3.09l.845-1.464a.748.748%200%201%200-1.297-.75l-1.276%202.214H28.61l2.515-4.354a.751.751%200%200%200-.272-1.024.75.75%200%200%200-1.024.274l-2.948%205.104h-2.023a6.751%206.751%200%200%200-2.713-4.684l1.019-1.76%205.896-.002a.75.75%200%200%200%200-1.5l-5.029.002%201.051-1.82%202.557.002a.75.75%200%200%200%200-1.5l-1.689-.002%201.545-2.676a.75.75%200%201%200-1.302-.75l-1.547%202.676-.844-1.463a.749.749%200%201%200-1.297.75l1.278%202.213-1.051%201.818-2.514-4.354a.75.75%200%200%200-1.298.75l2.946%205.104-1.016%201.758a6.692%206.692%200%200%200-2.706-.57%206.74%206.74%200%200%200-2.707.568l-1.013-1.754%202.946-5.105a.75.75%200%200%200-1.298-.75L13.56%208.697l-1.05-1.818%201.278-2.217a.749.749%200%200%200-1.298-.75l-.845%201.465-1.551-2.678a.75.75%200%200%200-1.024-.273.748.748%200%200%200-.274%201.023l1.545%202.678H8.652a.75.75%200%200%200%200%201.5h2.556l1.05%201.818H7.231a.75.75%200%200%200%200%201.5h5.894l1.017%201.762a6.755%206.755%200%200%200-2.712%204.684H9.406l-2.95-5.104a.75.75%200%201%200-1.299.75l2.516%204.354H5.569l-1.277-2.213a.75.75%200%200%200-1.298.75l.845%201.463H.75a.75.75%200%200%200%200%201.5h3.09l-.845%201.465a.747.747%200%200%200%20.275%201.022.75.75%200%200%200%20.374.103.75.75%200%200%200%20.65-.375l1.277-2.215h2.103l-2.516%204.354a.75.75%200%200%200%201.299.75l2.949-5.104h2.024a6.761%206.761%200%200%200%202.712%204.685l-1.017%201.762H7.232a.75.75%200%200%200%200%201.5h5.026l-1.05%201.818H8.651a.75.75%200%200%200%200%201.5h1.69l-1.545%202.676a.75.75%200%200%200%201.299.75l1.546-2.676.846%201.465a.755.755%200%200%200%20.65.375.737.737%200%200%200%20.375-.103.747.747%200%200%200%20.274-1.022l-1.279-2.215%201.05-1.82%202.515%204.354a.75.75%200%200%200%201.299-.75l-2.947-5.104%201.013-1.756a6.72%206.72%200%200%200%205.415%200l1.014%201.756-2.947%205.104a.75.75%200%200%200%201.298.75l2.515-4.354%201.053%201.82-1.277%202.213a.75.75%200%200%200%201.298.75l.844-1.463%201.545%202.678c.141.24.393.375.65.375a.75.75%200%200%200%20.649-1.125l-1.548-2.678h1.689a.75.75%200%200%200%200-1.5h-2.557l-1.051-1.82%205.029.002a.75.75%200%200%200%200-1.5l-5.896-.002-1.019-1.76a6.75%206.75%200%200%200%202.711-4.685h2.023l2.947%205.104a.753.753%200%200%200%201.025.273.749.749%200%200%200%20.272-1.023l-2.515-4.354h2.104l1.279%202.215a.75.75%200%200%200%20.649.375c.127%200%20.256-.03.375-.103a.748.748%200%200%200%20.273-1.022l-.848-1.465h3.092a.75.75%200%200%200%20.003-1.5zm-12.136.75c0%20.257-.041.502-.076.75a5.223%205.223%200%200%201-1.943%203.358%205.242%205.242%200%200%201-1.291.766%205.224%205.224%200%200%201-1.949.384%205.157%205.157%200%200%201-3.239-1.15%205.22%205.22%200%200%201-1.943-3.358c-.036-.247-.076-.493-.076-.75s.04-.503.076-.75a5.22%205.22%200%200%201%201.944-3.359c.393-.312.82-.576%201.291-.765a5.219%205.219%200%200%201%201.948-.384c.69%200%201.344.142%201.948.384.471.188.898.454%201.291.765a5.222%205.222%200%200%201%201.943%203.359c.035.247.076.493.076.75z'%20fill=':color:'/%3e%3c/svg%3e",Zt=new WeakSet;class Ki extends dt{constructor(t){super(t)}update(t,[i,s]){return Zt.has(t)||(i(),Zt.add(t)),this.render(i,s)}render(t,i){return i()}}const Gt=pt(Ki);var qi=Object.defineProperty,Wi=Object.getOwnPropertyDescriptor,kt=(e,t,i,s)=>{for(var o=s>1?void 0:s?Wi(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&qi(t,i,o),o};let lt=class extends ${constructor(){super(...arguments),this.snowing=!1}render(){return l`
      ${this.startButtonTemplate} ${this.clearButtonTemplate}
      <img src=${Hi} alt="Snowflakes icon" />
    `}willUpdate(e){e.has("snowConfig")&&(this.snowflakes?.destroy(),this.snowflakes=void 0,this.startSnowing())}get startButtonTemplate(){return Gt(async()=>{await tt(()=>Promise.resolve().then(()=>zt),void 0,import.meta.url)},()=>l`
        <ia-button
          @click=${()=>{this.snowing?this.stopSnowing():this.startSnowing()}}
        >
          ${this.snowing?"Stop Snowflakes":"Start Snowflakes"}
        </ia-button>
      `)}get clearButtonTemplate(){return Gt(async()=>{await tt(()=>Promise.resolve().then(()=>zt),void 0,import.meta.url)},()=>l`
        <ia-button
          @click=${()=>{this.snowflakes?.destroy()}}
        >
          Clear Snowflakes
        </ia-button>
      `)}async startSnowing(){if(!this.snowflakes){const t=(await tt(()=>import("./snowflakes.esm-Dz_MTlsm.js"),[],import.meta.url)).default;this.snowflakes=new t(this.snowConfig)}this.snowflakes?.start(),this.snowing=!0}stopSnowing(){this.snowflakes?.stop(),this.snowing=!1}static get styles(){return T`
      img {
        width: 16px;
        filter: invert(1);
        vertical-align: middle;
      }
    `}};kt([p({type:Object})],lt.prototype,"snowConfig",2);kt([g()],lt.prototype,"snowing",2);lt=kt([O("ia-snow")],lt);var Zi=Object.defineProperty,Gi=Object.getOwnPropertyDescriptor,z=(e,t,i,s)=>{for(var o=s>1?void 0:s?Gi(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=(s?a(t,i,o):a(o))||o);return s&&o&&Zi(t,i,o),o};let k=class extends ${render(){return l`
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
    `:"<ia-snow></ia-snow>"}get configString(){return JSON.stringify(this.config,null,2)}get snowflakeConfig(){return{color:this.colorInput.value,count:Number(this.countInput.value),wind:this.windInput.checked,rotation:this.rotationInput.checked}}setupSnowflakes(){this.config=this.snowflakeConfig}static get styles(){return T`
      fieldset {
        margin-top: 16px;
      }
    `}};z([g()],k.prototype,"config",2);z([w("#count")],k.prototype,"countInput",2);z([w("#wind")],k.prototype,"windInput",2);z([w("#rotation")],k.prototype,"rotationInput",2);z([w("#color")],k.prototype,"colorInput",2);k=z([O("ia-snow-story")],k);const Yi=Object.freeze(Object.defineProperty({__proto__:null,get IASnowStory(){return k}},Symbol.toStringTag,{value:"Module"}));var Ji=Object.getOwnPropertyDescriptor,Xi=(e,t,i,s)=>{for(var o=s>1?void 0:s?Ji(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(o=a(o)||o);return o};const Qi=Object.assign({"../src/elements/ia-button/ia-button-story.ts":Xe,"../src/elements/ia-combo-box/ia-combo-box-story.ts":Ti,"../src/elements/ia-status-indicator/ia-status-indicator-story.ts":Di,"../src/elements/ia-zendesk-widget/ia-zendesk-widget-story.ts":zi,"../src/labs/ia-snow/ia-snow-story.ts":Yi}),he=Object.keys(Qi).map(e=>{const t=e.includes("/src/labs/"),i=e.split("/"),o=i[i.length-1].replace(/-story\.ts$/,"");return{tag:o,storyTag:`${o}-story`,id:`elem-${o}`,labs:t}}).sort((e,t)=>e.tag.localeCompare(t.tag)),xt=he.filter(e=>!e.labs),_t=he.filter(e=>e.labs),ts=[...xt,..._t];let Yt=class extends ${constructor(){super(...arguments),this._abortController=new AbortController}createRenderRoot(){return this}render(){return l`
      <nav id="ia-sidebar">
        <h2>Production-Ready</h2>
        ${xt.map(e=>l`<a href="#${e.id}">&lt;${e.tag}&gt;</a>`)}
        <h2>Labs 🧪</h2>
        ${_t.map(e=>l`<a href="#${e.id}">&lt;${e.tag}&gt;</a>`)}
      </nav>
      <div id="ia-content">
        <h1>Internet Archive Elements</h1>
        <h2>Production-Ready Elements</h2>
        ${xt.map(e=>l`
          <div id="${e.id}" class="ia-anchor">
            ${vt(`<${e.storyTag}></${e.storyTag}>`)}
          </div>
        `)}
        <h2>Labs Elements</h2>
        ${_t.map(e=>l`
          <div id="${e.id}" class="ia-anchor">
            ${vt(`<${e.storyTag}></${e.storyTag}>`)}
          </div>
        `)}
      </div>
    `}firstUpdated(){const e=ts.map(s=>s.id),t=Object.fromEntries(e.map(s=>[s,this.querySelector(`#ia-sidebar a[href="#${s}"]`)])),i=new Set;this._observer=new IntersectionObserver(s=>{for(const n of s)n.isIntersecting?i.add(n.target.id):i.delete(n.target.id);const o=e.find(n=>i.has(n))??e[0];e.forEach(n=>t[n]?.classList.toggle("active",n===o))},{rootMargin:"0px 0px -70% 0px"}),e.forEach(s=>{const o=document.getElementById(s);o&&this._observer.observe(o)}),e.forEach(s=>{t[s]?.addEventListener("click",o=>{o.preventDefault();const n=document.getElementById(s);if(n){const a=n.getBoundingClientRect().top+window.scrollY;window.scrollTo({top:Math.max(0,a-16),behavior:"smooth"})}},{signal:this._abortController.signal})})}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._abortController.abort()}};Yt=Xi([O("app-root")],Yt);
