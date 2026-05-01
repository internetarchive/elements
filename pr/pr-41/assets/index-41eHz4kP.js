(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();const Mt=globalThis,je=Mt.ShadowRoot&&(Mt.ShadyCSS===void 0||Mt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,He=Symbol(),oi=new WeakMap;let Gi=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==He)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(je&&t===void 0){const o=e!==void 0&&e.length===1;o&&(t=oi.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&oi.set(e,t))}return t}toString(){return this.cssText}};const Ao=i=>new Gi(typeof i=="string"?i:i+"",void 0,He),B=(i,...t)=>{const e=i.length===1?i[0]:t.reduce(((o,s,n)=>o+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[n+1]),i[0]);return new Gi(e,i,He)},Co=(i,t)=>{if(je)i.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const e of t){const o=document.createElement("style"),s=Mt.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=e.cssText,i.appendChild(o)}},si=je?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return Ao(e)})(i):i;const{is:Eo,defineProperty:Oo,getOwnPropertyDescriptor:To,getOwnPropertyNames:ko,getOwnPropertySymbols:Po,getPrototypeOf:Io}=Object,Qt=globalThis,ni=Qt.trustedTypes,Bo=ni?ni.emptyScript:"",Ro=Qt.reactiveElementPolyfillSupport,Ot=(i,t)=>i,Vt={toAttribute(i,t){switch(t){case Boolean:i=i?Bo:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Ve=(i,t)=>!Eo(i,t),ri={attribute:!0,type:String,converter:Vt,reflect:!1,useDefault:!1,hasChanged:Ve};Symbol.metadata??=Symbol("metadata"),Qt.litPropertyMetadata??=new WeakMap;let ct=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ri){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),s=this.getPropertyDescriptor(t,o,e);s!==void 0&&Oo(this.prototype,t,s)}}static getPropertyDescriptor(t,e,o){const{get:s,set:n}=To(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){const l=s?.call(this);n?.call(this,r),this.requestUpdate(t,l,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ri}static _$Ei(){if(this.hasOwnProperty(Ot("elementProperties")))return;const t=Io(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Ot("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ot("properties"))){const e=this.properties,o=[...ko(e),...Po(e)];for(const s of o)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[o,s]of e)this.elementProperties.set(o,s)}this._$Eh=new Map;for(const[e,o]of this.elementProperties){const s=this._$Eu(e,o);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const s of o)e.unshift(si(s))}else t!==void 0&&e.push(si(t));return e}static _$Eu(t,e){const o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Co(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,o);if(s!==void 0&&o.reflect===!0){const n=(o.converter?.toAttribute!==void 0?o.converter:Vt).toAttribute(e,o.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const o=this.constructor,s=o._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const n=o.getPropertyOptions(s),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Vt;this._$Em=s;const l=r.fromAttribute(e,n.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(t,e,o){if(t!==void 0){const s=this.constructor,n=this[t];if(o??=s.getPropertyOptions(t),!((o.hasChanged??Ve)(n,e)||o.useDefault&&o.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,o))))return;this.C(t,e,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:s,wrapped:n},r){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[s,n]of o){const{wrapped:r}=n,l=this[s];r!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,n,l)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(e)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};ct.elementStyles=[],ct.shadowRootOptions={mode:"open"},ct[Ot("elementProperties")]=new Map,ct[Ot("finalized")]=new Map,Ro?.({ReactiveElement:ct}),(Qt.reactiveElementVersions??=[]).push("2.1.1");const ze=globalThis,zt=ze.trustedTypes,ai=zt?zt.createPolicy("lit-html",{createHTML:i=>i}):void 0,Zi="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,Yi="?"+q,Do=`<${Yi}>`,ot=document,Tt=()=>ot.createComment(""),kt=i=>i===null||typeof i!="object"&&typeof i!="function",Fe=Array.isArray,Lo=i=>Fe(i)||typeof i?.[Symbol.iterator]=="function",ne=`[ 	
\f\r]`,At=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,li=/-->/g,di=/>/g,J=RegExp(`>|${ne}(?:([^\\s"'>=/]+)(${ne}*=${ne}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ci=/'/g,hi=/"/g,Ji=/^(?:script|style|textarea|title)$/i,Uo=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),p=Uo(1),j=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),pi=new WeakMap,tt=ot.createTreeWalker(ot,129);function Qi(i,t){if(!Fe(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ai!==void 0?ai.createHTML(t):t}const Mo=(i,t)=>{const e=i.length-1,o=[];let s,n=t===2?"<svg>":t===3?"<math>":"",r=At;for(let l=0;l<e;l++){const a=i[l];let d,h,c=-1,u=0;for(;u<a.length&&(r.lastIndex=u,h=r.exec(a),h!==null);)u=r.lastIndex,r===At?h[1]==="!--"?r=li:h[1]!==void 0?r=di:h[2]!==void 0?(Ji.test(h[2])&&(s=RegExp("</"+h[2],"g")),r=J):h[3]!==void 0&&(r=J):r===J?h[0]===">"?(r=s??At,c=-1):h[1]===void 0?c=-2:(c=r.lastIndex-h[2].length,d=h[1],r=h[3]===void 0?J:h[3]==='"'?hi:ci):r===hi||r===ci?r=J:r===li||r===di?r=At:(r=J,s=void 0);const f=r===J&&i[l+1].startsWith("/>")?" ":"";n+=r===At?a+Do:c>=0?(o.push(d),a.slice(0,c)+Zi+a.slice(c)+q+f):a+q+(c===-2?l:f)}return[Qi(i,n+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),o]};let _e=class Xi{constructor({strings:t,_$litType$:e},o){let s;this.parts=[];let n=0,r=0;const l=t.length-1,a=this.parts,[d,h]=Mo(t,e);if(this.el=Xi.createElement(d,o),tt.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=tt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(Zi)){const u=h[r++],f=s.getAttribute(c).split(q),D=/([.?@])?(.*)/.exec(u);a.push({type:1,index:n,name:D[2],strings:f,ctor:D[1]==="."?jo:D[1]==="?"?Ho:D[1]==="@"?Vo:Xt}),s.removeAttribute(c)}else c.startsWith(q)&&(a.push({type:6,index:n}),s.removeAttribute(c));if(Ji.test(s.tagName)){const c=s.textContent.split(q),u=c.length-1;if(u>0){s.textContent=zt?zt.emptyScript:"";for(let f=0;f<u;f++)s.append(c[f],Tt()),tt.nextNode(),a.push({type:2,index:++n});s.append(c[u],Tt())}}}else if(s.nodeType===8)if(s.data===Yi)a.push({type:2,index:n});else{let c=-1;for(;(c=s.data.indexOf(q,c+1))!==-1;)a.push({type:7,index:n}),c+=q.length-1}n++}}static createElement(t,e){const o=ot.createElement("template");return o.innerHTML=t,o}};function mt(i,t,e=i,o){if(t===j)return t;let s=o!==void 0?e._$Co?.[o]:e._$Cl;const n=kt(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(i),s._$AT(i,e,o)),o!==void 0?(e._$Co??=[])[o]=s:e._$Cl=s),s!==void 0&&(t=mt(i,s._$AS(i,t.values),s,o)),t}let No=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,s=(t?.creationScope??ot).importNode(e,!0);tt.currentNode=s;let n=tt.nextNode(),r=0,l=0,a=o[0];for(;a!==void 0;){if(r===a.index){let d;a.type===2?d=new qe(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new zo(n,this,t)),this._$AV.push(d),a=o[++l]}r!==a?.index&&(n=tt.nextNode(),r++)}return tt.currentNode=ot,s}p(t){let e=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}},qe=class to{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=mt(this,t,e),kt(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==j&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Lo(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&kt(this._$AH)?this._$AA.nextSibling.data=t:this.T(ot.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,s=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=_e.createElement(Qi(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(e);else{const n=new No(s,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(t){let e=pi.get(t.strings);return e===void 0&&pi.set(t.strings,e=new _e(t)),e}k(t){Fe(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,s=0;for(const n of t)s===e.length?e.push(o=new to(this.O(Tt()),this.O(Tt()),this,this.options)):o=e[s],o._$AI(n),s++;s<e.length&&(this._$AR(o&&o._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const o=t.nextSibling;t.remove(),t=o}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Xt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,s,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=m}_$AI(t,e=this,o,s){const n=this.strings;let r=!1;if(n===void 0)t=mt(this,t,e,0),r=!kt(t)||t!==this._$AH&&t!==j,r&&(this._$AH=t);else{const l=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=mt(this,l[o+a],e,a),d===j&&(d=this._$AH[a]),r||=!kt(d)||d!==this._$AH[a],d===m?t=m:t!==m&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}r&&!s&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},jo=class extends Xt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},Ho=class extends Xt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},Vo=class extends Xt{constructor(t,e,o,s,n){super(t,e,o,s,n),this.type=5}_$AI(t,e=this){if((t=mt(this,t,e,0)??m)===j)return;const o=this._$AH,s=t===m&&o!==m||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==m&&(o===m||s);s&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},zo=class{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){mt(this,t)}};const Fo=ze.litHtmlPolyfillSupport;Fo?.(_e,qe),(ze.litHtmlVersions??=[]).push("3.3.1");const qo=(i,t,e)=>{const o=e?.renderBefore??t;let s=o._$litPart$;if(s===void 0){const n=e?.renderBefore??null;o._$litPart$=s=new qe(t.insertBefore(Tt(),n),n,void 0,e??{})}return s._$AI(i),s};const Ke=globalThis;let x=class extends ct{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=qo(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}};x._$litElement$=!0,x.finalized=!0,Ke.litElementHydrateSupport?.({LitElement:x});const Ko=Ke.litElementPolyfillSupport;Ko?.({LitElement:x});(Ke.litElementVersions??=[]).push("4.2.1");const O=i=>(t,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(i,t)})):customElements.define(i,t)};const Wo={attribute:!0,type:String,converter:Vt,reflect:!1,hasChanged:Ve},Go=(i=Wo,t,e)=>{const{kind:o,metadata:s}=e;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),o==="setter"&&((i=Object.create(i)).wrapped=!0),n.set(e.name,i),o==="accessor"){const{name:r}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(r,a,i)},init(l){return l!==void 0&&this.C(r,void 0,i,l),l}}}if(o==="setter"){const{name:r}=e;return function(l){const a=this[r];t.call(this,l),this.requestUpdate(r,a,i)}}throw Error("Unsupported decorator location: "+o)};function g(i){return(t,e)=>typeof e=="object"?Go(i,t,e):((o,s,n)=>{const r=s.hasOwnProperty(n);return s.constructor.createProperty(n,o),r?Object.getOwnPropertyDescriptor(s,n):void 0})(i,t,e)}function v(i){return g({...i,state:!0,attribute:!1})}const eo=(i,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(i,t,e),e);function $(i,t){return(e,o,s)=>{const n=r=>r.renderRoot?.querySelector(i)??null;return eo(e,o,{get(){return n(this)}})}}let Zo;function We(i){return(t,e)=>eo(t,e,{get(){return(this.renderRoot??(Zo??=document.createDocumentFragment())).querySelectorAll(i)}})}const Y=B`
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
    --default-search-bar-height: 30px;
    --default-search-bar-width: auto;
    --default-font-size-lg: 2.25rem;

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
`;var Yo=Object.getOwnPropertyDescriptor,Jo=(i,t,e,o)=>{for(var s=o>1?void 0:o?Yo(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(s=r(s)||s);return s};let xe=class extends x{render(){return p`
      <button>
        <slot></slot>
      </button>
    `}static get styles(){return[Y,B`
        :host {
          --primary-background-color--: var(--primary-cta-fill);
          --primary-text-color--: var(--primary-cta-text-color);
        }

        button {
          padding: 8px 16px;
          background-color: var(--primary-background-color--);
          color: var(--primary-text-color--);
        }
      `]}};xe=Jo([O("ia-button")],xe);const ui=Object.freeze(Object.defineProperty({__proto__:null,get IAButton(){return xe}},Symbol.toStringTag,{value:"Module"}));function ht(i,t,e){return i?t(i):e?.(i)}const Se=i=>i??m,Qo="modulepreload",Xo=function(i,t){return new URL(i,t).href},gi={},Nt=function(t,e,o){let s=Promise.resolve();if(e&&e.length>0){let d=function(h){return Promise.all(h.map(c=>Promise.resolve(c).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};const r=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),a=l?.nonce||l?.getAttribute("nonce");s=d(e.map(h=>{if(h=Xo(h,o),h in gi)return;gi[h]=!0;const c=h.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(o)for(let D=r.length-1;D>=0;D--){const L=r[D];if(L.href===h&&(!c||L.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${u}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":Qo,c||(f.as="script"),f.crossOrigin="",f.href=h,a&&f.setAttribute("nonce",a),document.head.appendChild(f),c)return new Promise((D,L)=>{f.addEventListener("load",D),f.addEventListener("error",()=>L(new Error(`Unable to preload CSS for ${h}`)))})}))}function n(r){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=r,window.dispatchEvent(l),!l.defaultPrevented)throw r}return s.then(r=>{for(const l of r||[])l.status==="rejected"&&n(l.reason);return t().catch(n)})};const F={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},te=i=>(...t)=>({_$litDirective$:i,values:t});let ee=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};let Ae=class extends ee{constructor(t){if(super(t),this.it=m,t.type!==F.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===m||t==null)return this._t=void 0,this.it=t;if(t===j)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};Ae.directiveName="unsafeHTML",Ae.resultType=1;const Ce=te(Ae),ts=B`
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
`;var es=Object.defineProperty,is=Object.getOwnPropertyDescriptor,ie=(i,t,e,o)=>{for(var s=o>1?void 0:o?is(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(s=(o?r(t,e,s):r(s))||s);return o&&s&&es(t,e,s),s};let Pt=class extends x{constructor(){super(...arguments),this.code="",this.language="auto",this.highlightedCode=""}willUpdate(i){(i.has("code")||i.has("language"))&&this.highlightCode()}render(){return p`
      <pre><code class="hljs">${Ce(this.highlightedCode)}</code></pre>
    `}async highlightCode(){const t=(await Nt(()=>import("./index-BBc-AmEf.js"),[],import.meta.url)).default,e=this.code.trim();let o;this.language==="auto"?o=t.highlightAuto(e).value:o=t.highlight(e,{language:this.language}).value,this.highlightedCode=o}static get styles(){return[ts]}};ie([g({type:String})],Pt.prototype,"code",2);ie([g({type:String})],Pt.prototype,"language",2);ie([v()],Pt.prototype,"highlightedCode",2);Pt=ie([O("syntax-highlighter")],Pt);const os="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='36pt'%20height='36pt'%20viewBox='0%200%2036%2036'%20version='1.1'%3e%3cg%20id='surface35'%3e%3cpath%20style='%20stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;'%20d='M%2013.5%206.1875%20C%2012.878906%206.1875%2012.375%206.691406%2012.375%207.3125%20C%2012.375%207.933594%2012.878906%208.4375%2013.5%208.4375%20L%2014.0625%208.4375%20L%2014.0625%2013.523438%20C%2014.0625%2014.453125%2013.78125%2015.34375%2013.246094%2016.105469%20L%206.84375%2025.238281%20C%206.140625%2026.238281%206.054688%2027.535156%206.621094%2028.617188%20C%207.183594%2029.703125%208.292969%2030.375%209.515625%2030.375%20L%2026.484375%2030.375%20C%2027.707031%2030.375%2028.816406%2029.703125%2029.378906%2028.617188%20C%2029.941406%2027.535156%2029.859375%2026.238281%2029.15625%2025.238281%20L%2022.753906%2016.105469%20C%2022.21875%2015.34375%2021.9375%2014.453125%2021.9375%2013.523438%20L%2021.9375%208.4375%20L%2022.5%208.4375%20C%2023.121094%208.4375%2023.625%207.933594%2023.625%207.3125%20C%2023.625%206.691406%2023.121094%206.1875%2022.5%206.1875%20Z%20M%2016.3125%208.4375%20L%2019.6875%208.4375%20L%2019.6875%2013.523438%20C%2019.6875%2014.914062%2020.109375%2016.257812%2020.910156%2017.398438%20L%2020.941406%2017.4375%20L%2015.0625%2017.4375%20L%2015.089844%2017.398438%20C%2015.890625%2016.257812%2016.3125%2014.914062%2016.3125%2013.523438%20Z%20M%2015.1875%2020.8125%20C%2015.808594%2020.8125%2016.3125%2021.316406%2016.3125%2021.9375%20C%2016.3125%2022.558594%2015.808594%2023.0625%2015.1875%2023.0625%20C%2014.566406%2023.0625%2014.0625%2022.558594%2014.0625%2021.9375%20C%2014.0625%2021.316406%2014.566406%2020.8125%2015.1875%2020.8125%20Z%20M%2020.53125%2023.0625%20C%2021.617188%2023.0625%2022.5%2023.945312%2022.5%2025.03125%20C%2022.5%2026.117188%2021.617188%2027%2020.53125%2027%20C%2019.445312%2027%2018.5625%2026.117188%2018.5625%2025.03125%20C%2018.5625%2023.945312%2019.445312%2023.0625%2020.53125%2023.0625%20Z%20M%2020.53125%2023.0625%20'/%3e%3c/g%3e%3c/svg%3e";function Ft(i){return i.toLowerCase().split(" ").join("-")}var ss=Object.defineProperty,ns=Object.getOwnPropertyDescriptor,Ge=(i,t,e,o)=>{for(var s=o>1?void 0:o?ns(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(s=(o?r(t,e,s):r(s))||s);return o&&s&&ss(t,e,s),s};let qt=class extends x{render(){return this.styleInputData?p`
      <div class="settings-options">
        <table>
          ${this.styleInputData.settings.map(i=>p`
              <tr>
                <td>
                  <label for=${Ft(i.label)}>${i.label}</label>
                </td>
                <td>
                  <input
                    id=${Ft(i.label)}
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
    `:m}applyStyles(){const i=[];this.styleInputs?.forEach(t=>{!t.dataset.variable||!t.value||i.push(`${t.dataset.variable}: ${t.value};`)}),this.dispatchEvent(new CustomEvent("stylesApplied",{detail:{styles:i.join(`
 `)}}))}static get styles(){return[Y,B`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }
      `]}};Ge([g({type:Object})],qt.prototype,"styleInputData",2);Ge([We(".style-input")],qt.prototype,"styleInputs",2);qt=Ge([O("story-styles-settings")],qt);const io=(i,t,e)=>{for(const o of t)if(o[0]===i)return(0,o[1])();return e?.()};var rs=Object.defineProperty,as=Object.getOwnPropertyDescriptor,Ze=(i,t,e,o)=>{for(var s=o>1?void 0:o?as(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(s=(o?r(t,e,s):r(s))||s);return o&&s&&rs(t,e,s),s};let Kt=class extends x{render(){return this.propInputData?p`
      <div class="settings-options">
        <table>
          ${this.propInputData.settings.map(i=>io(i.inputType,[["radio",()=>this.createRadioPropInput(i)]],()=>this.createDefaultPropInput(i))??m)}
        </table>
        <button @click=${this.applyProps}>Apply</button>
      </div>
    `:m}createDefaultPropInput(i){const t=Ft(i.label);return p`
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
    `}createRadioPropInput(i){if(i.inputType!=="radio"||!i.radioOptions)return m;const t=Ft(i.label);return p`
      <tr>
        <td><legend>${i.label}</legend></td>
        <td>
          ${i.radioOptions.map(e=>p`<input
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
    `}applyProps(){const i=[],t=[];this.propInputs?.forEach(e=>{if(!e.dataset.prop||!e.value||e.type==="radio"&&!e.checked)return;const o=e.dataset.prop;let s=e.value;switch(e.dataset.format){case"number":s=parseInt(s);break;case"boolean":s==="true"&&(s=!0),s==="false"&&(s=!1);break}const n=typeof s=="string"?`'${s}'`:s.toString();i.push(`.${o}=\${${n}}`),t.push({propName:o,value:s})}),this.dispatchEvent(new CustomEvent("propsApplied",{detail:{stringifiedProps:`
  `+i.join(`
  `)+`
`,appliedProps:t}}))}static get styles(){return[Y,B`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }
      `]}};Ze([g({type:Object})],Kt.prototype,"propInputData",2);Ze([We(".prop-input")],Kt.prototype,"propInputs",2);Kt=Ze([O("story-props-settings")],Kt);var ls=Object.defineProperty,ds=Object.getOwnPropertyDescriptor,U=(i,t,e,o)=>{for(var s=o>1?void 0:o?ds(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(s=(o?r(t,e,s):r(s))||s);return o&&s&&ls(t,e,s),s};let P=class extends x{constructor(){super(...arguments),this.elementTag="",this.elementClassName="",this.labs=!1,this.detailsVisible=!1,this.shouldShowPropertySettings=!1,this.copiedKey=null}render(){return p`
      <div id="container">
        <h2>
          <code>&lt;${this.elementTag}&gt;</code>
          ${ht(this.labs,()=>p`<img
                src=${os}
                alt="Labs icon"
                title="Labs"
                class="labs-icon"
              />`)}
        </h2>
        <h3>Demo</h3>
        <div class="slot-container" style=${Se(this.stringifiedStyles)}>
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
    `}get detailsTemplate(){return p`
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
      ${ht(this.cssCode,()=>p`
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
          ${ht(!!this.propInputData,()=>p`
              <story-props-settings
                .propInputData=${this.propInputData}
                @propsApplied=${this.handlePropsApplied}
              ></story-props-settings>
            `)}
          ${ht(!this.propInputData&&!this.shouldShowPropertySettings,()=>p`<p class="section-placeholder">No settings to adjust</p>`)}
          <div
            class="slot-container ${this.shouldShowPropertySettings?"":"hidden"}"
            @slotchange=${this.handleSettingsSlotChange}
          >
            <slot name="settings"></slot>
          </div>
        </div>
        <div class="right-col">
          <h3>Styles</h3>
          ${ht(!!this.styleInputData,()=>p`
              <story-styles-settings
                .styleInputData=${this.styleInputData}
                @stylesApplied=${this.handleStylesApplied}
              ></story-styles-settings>
            `,()=>p`<p class="section-placeholder">No styles to adjust</p>`)}
        </div>
      </div>
    `}async copyToClipboard(i,t){try{await navigator.clipboard.writeText(i),this.copiedKey=t,clearTimeout(this._copyTimeout),this._copyTimeout=setTimeout(()=>this.copiedKey=null,2e3)}catch(e){console.warn("Clipboard write failed:",e)}}get importCode(){return this.elementClassName?`import '${this.modulePath}';
import { ${this.elementClassName} } from '${this.modulePath}';`:`import '${this.modulePath}';`}get exampleUsage(){const i=this.defaultUsageProps?`
 `+this.defaultUsageProps+`
`:"",t=this.stringifiedProps??"";return`<${this.elementTag}${i}${t}></${this.elementTag}>`}get cssCode(){return this.stringifiedStyles?`${this.elementTag} {
 ${this.stringifiedStyles}
}`:""}get modulePath(){return this.labs?`@internetarchive/elements/labs/${this.elementTag}/${this.elementTag}`:`@internetarchive/elements/${this.elementTag}/${this.elementTag}`}handleSettingsSlotChange(i){const t=i.target.assignedElements();this.shouldShowPropertySettings=t.length>0}handleDemoComponentSlotted(i){const t=i.target.assignedElements()[0];t&&(this.slottedDemoComponent=t)}handleStylesApplied(i){const t=i.detail.styles;t&&(this.stringifiedStyles=t)}handlePropsApplied(i){const t=i.detail.stringifiedProps,e=i.detail.appliedProps;!t||!e||(this.stringifiedProps=t,e.forEach(o=>{this.slottedDemoComponent[o.propName]=o.value}))}static get styles(){return[Y,B`
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
      `]}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._copyTimeout)}};U([g({type:String})],P.prototype,"elementTag",2);U([g({type:String})],P.prototype,"elementClassName",2);U([g({type:String})],P.prototype,"customExampleUsage",2);U([g({type:String})],P.prototype,"defaultUsageProps",2);U([g({type:Object})],P.prototype,"styleInputData",2);U([g({type:Object})],P.prototype,"propInputData",2);U([g({type:Boolean})],P.prototype,"labs",2);U([v()],P.prototype,"detailsVisible",2);U([v()],P.prototype,"stringifiedStyles",2);U([v()],P.prototype,"stringifiedProps",2);U([v()],P.prototype,"shouldShowPropertySettings",2);U([v()],P.prototype,"slottedDemoComponent",2);U([v()],P.prototype,"copiedKey",2);P=U([O("story-template")],P);var cs=Object.getOwnPropertyDescriptor,hs=(i,t,e,o)=>{for(var s=o>1?void 0:o?cs(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(s=r(s)||s);return s};const ps=[{label:"Text Color (Primary)",cssVariable:"--ia-theme-primary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background Color (Primary)",cssVariable:"--ia-theme-primary-cta-fill",defaultValue:"#194880",inputType:"color"}];let Ee=class extends x{render(){return p`
      <story-template
        elementTag="ia-button"
        elementClassName="IAButton"
        .defaultUsageProps=${"@click=${() => alert('Button clicked!')}"}
        .styleInputData=${{settings:ps}}
      >
        <div slot="demo">
          <ia-button @click=${()=>alert("Button clicked!")}
            >Click Me</ia-button
          >
        </div>
      </story-template>
    `}};Ee=hs([O("ia-button-story")],Ee);const us=Object.freeze(Object.defineProperty({__proto__:null,get IAButtonStory(){return Ee}},Symbol.toStringTag,{value:"Module"})),oo=JSON.parse(`[{"name":"Afghanistan","flag":"🇦🇫"},{"name":"Albania","flag":"🇦🇱"},{"name":"Algeria","flag":"🇩🇿"},{"name":"Andorra","flag":"🇦🇩"},{"name":"Angola","flag":"🇦🇴"},{"name":"Antigua and Barbuda","flag":"🇦🇬"},{"name":"Argentina","flag":"🇦🇷"},{"name":"Armenia","flag":"🇦🇲"},{"name":"Aruba","flag":"🇦🇼"},{"name":"Australia","flag":"🇦🇺"},{"name":"Austria","flag":"🇦🇹"},{"name":"Azerbaijan","flag":"🇦🇿"},{"name":"Bahamas","flag":"🇧🇸"},{"name":"Bahrain","flag":"🇧🇭"},{"name":"Bangladesh","flag":"🇧🇩"},{"name":"Barbados","flag":"🇧🇧"},{"name":"Belarus","flag":"🇧🇾"},{"name":"Belgium","flag":"🇧🇪"},{"name":"Belize","flag":"🇧🇿"},{"name":"Benin","flag":"🇧🇯"},{"name":"Bhutan","flag":"🇧🇹"},{"name":"Bolivia","flag":"🇧🇴"},{"name":"Bosnia and Herzegovina","flag":"🇧🇦"},{"name":"Botswana","flag":"🇧🇼"},{"name":"Brazil","flag":"🇧🇷"},{"name":"Brunei","flag":"🇧🇳"},{"name":"Bulgaria","flag":"🇧🇬"},{"name":"Burkina Faso","flag":"🇧🇫"},{"name":"Burundi","flag":"🇧🇮"},{"name":"Cabo Verde","flag":"🇨🇻"},{"name":"Cambodia","flag":"🇰🇭"},{"name":"Cameroon","flag":"🇨🇲"},{"name":"Canada","flag":"🇨🇦"},{"name":"Central African Republic","flag":"🇨🇫"},{"name":"Chad","flag":"🇹🇩"},{"name":"Chile","flag":"🇨🇱"},{"name":"China","flag":"🇨🇳"},{"name":"Colombia","flag":"🇨🇴"},{"name":"Comoros","flag":"🇰🇲"},{"name":"Cook Islands","flag":"🇨🇰"},{"name":"Costa Rica","flag":"🇨🇷"},{"name":"Côte d'Ivoire","flag":"🇨🇮"},{"name":"Croatia","flag":"🇭🇷"},{"name":"Cuba","flag":"🇨🇺"},{"name":"Cyprus","flag":"🇨🇾"},{"name":"Czechia","flag":"🇨🇿"},{"name":"Democratic Republic of the Congo","flag":"🇨🇩"},{"name":"Denmark","flag":"🇩🇰"},{"name":"Djibouti","flag":"🇩🇯"},{"name":"Dominica","flag":"🇩🇲"},{"name":"Dominican Republic","flag":"🇩🇴"},{"name":"Ecuador","flag":"🇪🇨"},{"name":"Egypt","flag":"🇪🇬"},{"name":"El Salvador","flag":"🇸🇻"},{"name":"Equatorial Guinea","flag":"🇬🇶"},{"name":"Eritrea","flag":"🇪🇷"},{"name":"Estonia","flag":"🇪🇪"},{"name":"Eswatini","flag":"🇸🇿"},{"name":"Ethiopia","flag":"🇪🇹"},{"name":"Fiji","flag":"🇫🇯"},{"name":"Finland","flag":"🇫🇮"},{"name":"France","flag":"🇫🇷"},{"name":"Gabon","flag":"🇬🇦"},{"name":"Gambia","flag":"🇬🇲"},{"name":"Georgia","flag":"🇬🇪"},{"name":"Germany","flag":"🇩🇪"},{"name":"Ghana","flag":"🇬🇭"},{"name":"Greece","flag":"🇬🇷"},{"name":"Grenada","flag":"🇬🇩"},{"name":"Guatemala","flag":"🇬🇹"},{"name":"Guinea","flag":"🇬🇳"},{"name":"Guinea-Bissau","flag":"🇬🇼"},{"name":"Guyana","flag":"🇬🇾"},{"name":"Haiti","flag":"🇭🇹"},{"name":"Honduras","flag":"🇭🇳"},{"name":"Hungary","flag":"🇭🇺"},{"name":"Iceland","flag":"🇮🇸"},{"name":"India","flag":"🇮🇳"},{"name":"Indonesia","flag":"🇮🇩"},{"name":"Iran","flag":"🇮🇷"},{"name":"Iraq","flag":"🇮🇶"},{"name":"Ireland","flag":"🇮🇪"},{"name":"Israel","flag":"🇮🇱"},{"name":"Italy","flag":"🇮🇹"},{"name":"Jamaica","flag":"🇯🇲"},{"name":"Japan","flag":"🇯🇵"},{"name":"Jordan","flag":"🇯🇴"},{"name":"Kazakhstan","flag":"🇰🇿"},{"name":"Kenya","flag":"🇰🇪"},{"name":"Kiribati","flag":"🇰🇮"},{"name":"Kosovo","flag":"🇽🇰"},{"name":"Kuwait","flag":"🇰🇼"},{"name":"Kyrgyzstan","flag":"🇰🇬"},{"name":"Laos","flag":"🇱🇦"},{"name":"Latvia","flag":"🇱🇻"},{"name":"Lebanon","flag":"🇱🇧"},{"name":"Lesotho","flag":"🇱🇸"},{"name":"Liberia","flag":"🇱🇷"},{"name":"Libya","flag":"🇱🇾"},{"name":"Liechtenstein","flag":"🇱🇮"},{"name":"Lithuania","flag":"🇱🇹"},{"name":"Luxembourg","flag":"🇱🇺"},{"name":"Madagascar","flag":"🇲🇬"},{"name":"Malawi","flag":"🇲🇼"},{"name":"Malaysia","flag":"🇲🇾"},{"name":"Maldives","flag":"🇲🇻"},{"name":"Mali","flag":"🇲🇱"},{"name":"Malta","flag":"🇲🇹"},{"name":"Marshall Islands","flag":"🇲🇭"},{"name":"Mauritania","flag":"🇲🇷"},{"name":"Mauritius","flag":"🇲🇺"},{"name":"Mexico","flag":"🇲🇽"},{"name":"Micronesia","flag":"🇫🇲"},{"name":"Moldova","flag":"🇲🇩"},{"name":"Monaco","flag":"🇲🇨"},{"name":"Mongolia","flag":"🇲🇳"},{"name":"Montenegro","flag":"🇲🇪"},{"name":"Morocco","flag":"🇲🇦"},{"name":"Mozambique","flag":"🇲🇿"},{"name":"Myanmar","flag":"🇲🇲"},{"name":"Namibia","flag":"🇳🇦"},{"name":"Nauru","flag":"🇳🇷"},{"name":"Nepal","flag":"🇳🇵"},{"name":"Netherlands","flag":"🇳🇱"},{"name":"New Zealand","flag":"🇳🇿"},{"name":"Nicaragua","flag":"🇳🇮"},{"name":"Niue","flag":"🇳🇺"},{"name":"Niger","flag":"🇳🇪"},{"name":"Nigeria","flag":"🇳🇬"},{"name":"North Korea","flag":"🇰🇵"},{"name":"North Macedonia","flag":"🇲🇰"},{"name":"Norway","flag":"🇳🇴"},{"name":"Oman","flag":"🇴🇲"},{"name":"Pakistan","flag":"🇵🇰"},{"name":"Palau","flag":"🇵🇼"},{"name":"Palestine","flag":"🇵🇸"},{"name":"Panama","flag":"🇵🇦"},{"name":"Papua New Guinea","flag":"🇵🇬"},{"name":"Paraguay","flag":"🇵🇾"},{"name":"Peru","flag":"🇵🇪"},{"name":"Philippines","flag":"🇵🇭"},{"name":"Poland","flag":"🇵🇱"},{"name":"Portugal","flag":"🇵🇹"},{"name":"Qatar","flag":"🇶🇦"},{"name":"Republic of the Congo","flag":"🇨🇬"},{"name":"Romania","flag":"🇷🇴"},{"name":"Russia","flag":"🇷🇺"},{"name":"Rwanda","flag":"🇷🇼"},{"name":"Saint Kitts and Nevis","flag":"🇰🇳"},{"name":"Saint Lucia","flag":"🇱🇨"},{"name":"Saint Vincent and the Grenadines","flag":"🇻🇨"},{"name":"Samoa","flag":"🇼🇸"},{"name":"San Marino","flag":"🇸🇲"},{"name":"Sao Tome and Principe","flag":"🇸🇹"},{"name":"Saudi Arabia","flag":"🇸🇦"},{"name":"Senegal","flag":"🇸🇳"},{"name":"Serbia","flag":"🇷🇸"},{"name":"Seychelles","flag":"🇸🇨"},{"name":"Sierra Leone","flag":"🇸🇱"},{"name":"Singapore","flag":"🇸🇬"},{"name":"Slovakia","flag":"🇸🇰"},{"name":"Slovenia","flag":"🇸🇮"},{"name":"Solomon Islands","flag":"🇸🇧"},{"name":"Somalia","flag":"🇸🇴"},{"name":"South Africa","flag":"🇿🇦"},{"name":"South Korea","flag":"🇰🇷"},{"name":"South Sudan","flag":"🇸🇸"},{"name":"Spain","flag":"🇪🇸"},{"name":"Sri Lanka","flag":"🇱🇰"},{"name":"Sudan","flag":"🇸🇩"},{"name":"Suriname","flag":"🇸🇷"},{"name":"Sweden","flag":"🇸🇪"},{"name":"Switzerland","flag":"🇨🇭"},{"name":"Syria","flag":"🇸🇾"},{"name":"Taiwan","flag":"🇹🇼"},{"name":"Tajikistan","flag":"🇹🇯"},{"name":"Tanzania","flag":"🇹🇿"},{"name":"Thailand","flag":"🇹🇭"},{"name":"Timor-Leste","flag":"🇹🇱"},{"name":"Togo","flag":"🇹🇬"},{"name":"Tonga","flag":"🇹🇴"},{"name":"Trinidad and Tobago","flag":"🇹🇹"},{"name":"Tunisia","flag":"🇹🇳"},{"name":"Turkey","flag":"🇹🇷"},{"name":"Turkmenistan","flag":"🇹🇲"},{"name":"Tuvalu","flag":"🇹🇻"},{"name":"Uganda","flag":"🇺🇬"},{"name":"Ukraine","flag":"🇺🇦"},{"name":"United Arab Emirates","flag":"🇦🇪"},{"name":"United Kingdom","flag":"🇬🇧"},{"name":"United States","flag":"🇺🇸"},{"name":"Uruguay","flag":"🇺🇾"},{"name":"Uzbekistan","flag":"🇺🇿"},{"name":"Vanuatu","flag":"🇻🇺"},{"name":"Vatican City","flag":"🇻🇦"},{"name":"Venezuela","flag":"🇻🇪"},{"name":"Vietnam","flag":"🇻🇳"},{"name":"Yemen","flag":"🇾🇪"},{"name":"Zambia","flag":"🇿🇲"},{"name":"Zimbabwe","flag":"🇿🇼"}]`);const re=te(class extends ee{constructor(i){if(super(i),i.type!==F.ATTRIBUTE||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter((t=>i[t])).join(" ")+" "}update(i,[t]){if(this.st===void 0){this.st=new Set,i.strings!==void 0&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(const o in t)t[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(t)}const e=i.element.classList;for(const o of this.st)o in t||(e.remove(o),this.st.delete(o));for(const o in t){const s=!!t[o];s===this.st.has(o)||this.nt?.has(o)||(s?(e.add(o),this.st.add(o)):(e.remove(o),this.st.delete(o)))}return j}});const gs=i=>i.strings===void 0,fs={},ms=(i,t=fs)=>i._$AH=t;const vs=te(class extends ee{constructor(i){if(super(i),i.type!==F.PROPERTY&&i.type!==F.ATTRIBUTE&&i.type!==F.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!gs(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===j||t===m)return t;const e=i.element,o=i.name;if(i.type===F.PROPERTY){if(t===e[o])return j}else if(i.type===F.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(o))return j}else if(i.type===F.ATTRIBUTE&&e.getAttribute(o)===t+"")return j;return ms(i),t}});const bs=i=>typeof i!="string"&&"strTag"in i,ys=(i,t,e)=>{let o=i[0];for(let s=1;s<i.length;s++)o+=t[s-1],o+=i[s];return o};const $s=(i=>bs(i)?ys(i.strings,i.values):i);let N=$s;class ws{constructor(){this.settled=!1,this.promise=new Promise((t,e)=>{this._resolve=t,this._reject=e})}resolve(t){this.settled=!0,this._resolve(t)}reject(t){this.settled=!0,this._reject(t)}}for(let i=0;i<256;i++)(i>>4&15).toString(16)+(i&15).toString(16);let _s=new ws;_s.resolve();function xs(i,t){return t.some(e=>i.has(e))}function Ss(i,t){const e=[...i],o=[...t],s=e.length,n=o.length;if(s===0)return!0;let r=0,l=0;for(;l<n;){if(o[l]===e[r]&&(r+=1),r>=s)return!0;l+=1}return!1}const As="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501%202.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131%202.7226499%201.81402515z'%20%3e%3c/path%3e%3c/svg%3e",Cs="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499%203.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501%202.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131%202.7226499-1.81402514z'%20%3e%3c/path%3e%3c/svg%3e",Es="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m50%200c27.6142375%200%2050%2022.3857625%2050%2050s-22.3857625%2050-50%2050-50-22.3857625-50-50%2022.3857625-50%2050-50zm23.8159475%2026.1840525c-1.4033215-1.4033215-3.5816761-1.5592461-5.1572272-.4677738l-.5598841.4677738-18.0988362%2018.0989475-18.0988362-18.0989475-.5598841-.4677738c-1.5755511-1.0914723-3.7539057-.9355477-5.1572272.4677738-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113l18.0989475%2018.0988362-18.0989475%2018.0988362c-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113%201.4033215%201.4033215%203.5816761%201.5592461%205.1572272.4677738l.5598841-.4677738%2018.0988362-18.0989475%2018.0988362%2018.0989475.5598841.4677738c1.5755511%201.0914723%203.7539057.9355477%205.1572272-.4677738%201.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113l-18.0989475-18.0988362%2018.0989475-18.0988362c1.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113z'%20fill-rule='evenodd'%20%3e%3c/path%3e%3c/svg%3e";var Os=Object.defineProperty,Ts=Object.getOwnPropertyDescriptor,A=(i,t,e,o)=>{for(var s=o>1?void 0:o?Ts(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(s=(o?r(t,e,s):r(s))||s);return o&&s&&Os(t,e,s),s};const ks={all:()=>!0,prefix:(i,t)=>t.startsWith(i),suffix:(i,t)=>t.endsWith(i),substring:(i,t)=>t.includes(i),subsequence:Ss},Ps="list",Is="substring",Bs=i=>i,Rs=i=>i.toLocaleLowerCase();let w=class extends x{constructor(){super(),this.options=[],this.behavior=Ps,this.maxAutocompleteEntries=Number.POSITIVE_INFINITY,this.filter=Is,this.caseSensitive=!1,this.sort=!1,this.wrapArrowKeys=!1,this.stayOpen=!1,this.clearable=!1,this.open=!1,this.disabled=!1,this.required=!1,this.value=null,this.hasFocus=!1,this.highlightedOption=null,this.enteredText="",this.filterText="",this.losingFocus=!1,this.optionsByID=new Map,this.optionFilteringValues=new Map,this.optionsRespectingSortFlag=[],this.filteredOptions=[],this.internals=this.attachInternals()}render(){const i=re({disabled:this.disabled,focused:this.hasFocus});return p`
      <div id="container" part="container">
        ${this.labelTemplate}
        <div id="main-widget-row" class=${i} part="combo-box">
          ${this.textInputTemplate}
          ${this.clearable?this.clearButtonTemplate:m}
          ${this.caretButtonTemplate}
        </div>
        ${this.optionsListTemplate}
      </div>
    `}willUpdate(i){(i.has("options")||i.has("caseSensitive"))&&this.rebuildOptionFilteringValues(),i.has("options")&&this.rebuildOptionIDMap(),(i.has("options")||i.has("sort"))&&this.rebuildSortedOptions(),xs(i,["options","behavior","maxAutocompleteEntries","filter","filterText","caseSensitive","sort"])&&this.rebuildFilteredOptions(),i.has("open")&&(this.open?this.value&&this.setHighlightedOption(this.selectedOption):this.setHighlightedOption(null)),i.has("required")&&this.updateFormValidity()}updated(i){i.has("value")&&this.handleValueChanged(),i.has("options")&&this.behavior!=="freeform"&&!this.selectedOption&&this.clearSelectedOption(),i.has("open")&&(this.open?(this.positionOptionsMenu(),this.optionsList?.showPopover?.(),this.optionsList?.classList.add("visible")):(this.optionsList?.hidePopover?.(),this.optionsList?.classList.remove("visible")))}get labelTemplate(){return p`
      <label id="label" for="text-input" part="label">
        <slot name="label"></slot>
      </label>
    `}get textInputTemplate(){const i=re({"clear-padding":this.clearable&&!this.shouldShowClearButton});return p`
      <input
        type="text"
        id="text-input"
        class=${i}
        .value=${vs(this.enteredText)}
        placeholder=${Se(this.placeholder)}
        part="text-input"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-controls="options-list"
        aria-expanded=${this.open}
        aria-activedescendant=${Se(this.highlightedOption?.id)}
        ?readonly=${this.behavior==="select-only"}
        ?disabled=${this.disabled}
        ?required=${this.required}
        @click=${this.handleComboBoxClick}
        @keydown=${this.handleComboBoxKeyDown}
        @input=${this.handleTextBoxInput}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      />
    `}get clearButtonTemplate(){return p`
      <button
        type="button"
        id="clear-button"
        part="clear-button"
        tabindex="-1"
        ?hidden=${!this.shouldShowClearButton}
        @click=${this.handleClearButtonClick}
      >
        <span class="sr-only">${N("Clear")}</span>
        <slot name="clear-button">
          <img
            class="icon clear-icon"
            part="icon clear-icon"
            src=${Es}
            alt=""
            aria-hidden="true"
          />
        </slot>
      </button>
    `}get caretTemplate(){return p`
      <slot name="caret-closed" ?hidden=${this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${As}
          alt=""
          aria-hidden="true"
        />
      </slot>
      <slot name="caret-open" ?hidden=${!this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${Cs}
          alt=""
          aria-hidden="true"
        />
      </slot>
    `}get caretButtonTemplate(){return p`
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
        <span class="sr-only">${N("Toggle options")}</span>
        ${this.caretTemplate}
      </button>
    `}get optionsListTemplate(){return p`
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
        ${ht(this.open,()=>this.optionTemplates)}
        <slot name="options-list-bottom"></slot>
      </ul>
    `}get optionTemplates(){return this.filteredOptions.length===0&&this.maxAutocompleteEntries>0?[this.emptyOptionsTemplate]:this.filteredOptions.map(i=>{const t=i===this.highlightedOption,e=re({option:!0,highlight:t});return p`
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
      `})}get emptyOptionsTemplate(){return p`
      <li id="empty-options" part="empty-options">
        <slot name="empty-options">${N("No matching options")}</slot>
      </li>
    `}handleOptionPointerEnter(i){this.handleOptionPointerMove(i)}handleOptionPointerMove(i){const t=i.currentTarget,e=this.getOptionFor(t.id);e&&this.setHighlightedOption(e)}handleOptionClick(i){const t=i.currentTarget,e=this.getOptionFor(t.id);e&&(this.setSelectedOption(e.id),this.stayOpen||this.closeOptionsMenu())}handleComboBoxKeyDown(i){switch(i.key){case"Enter":this.handleEnterPressed();break;case"Escape":this.handleEscapePressed();break;case"ArrowUp":i.altKey?this.handleAltUpArrowPressed():this.handleUpArrowPressed();break;case"ArrowDown":i.altKey?this.handleAltDownArrowPressed():this.handleDownArrowPressed();break;case"Tab":this.handleTabPressed();return;case" ":this.handleSpacePressed(i);return;default:return}i.stopPropagation(),i.preventDefault()}async handleTextBoxInput(){const i=this.textInput?.value??"";this.enteredText=i,this.setFilterText(i),this.openOptionsMenu(),await this.updateComplete,this.highlightFirstOption()}handleEnterPressed(){if(!this.open){this.openOptionsMenu();return}this.highlightedOption?this.setSelectedOption(this.highlightedOption.id):this.behavior==="freeform"&&this.setValue(this.enteredText),this.stayOpen||(this.open=!1)}handleEscapePressed(){if(this.open){this.closeOptionsMenu();return}this.clearSelectedOption()}handleUpArrowPressed(){this.open||this.openOptionsMenu(),this.highlightPreviousOption()}handleDownArrowPressed(){this.open||this.openOptionsMenu(),this.highlightNextOption()}handleAltUpArrowPressed(){this.closeOptionsMenu()}handleAltDownArrowPressed(){this.openOptionsMenu()}handleTabPressed(){this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1))}handleSpacePressed(i){this.behavior==="select-only"&&(this.open?this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1)):this.openOptionsMenu(),i.stopPropagation(),i.preventDefault())}handleComboBoxClick(){this.toggleOptionsMenu()}handleClearButtonClick(){this.clearSelectedOption(),this.textInput?.focus(),this.openOptionsMenu()}handleFocus(){this.behavior!=="select-only"&&this.textInput?.focus(),this.hasFocus=!0,this.losingFocus=!1}handleBlur(){this.hasFocus=!1,this.losingFocus=!0,setTimeout(()=>{this.losingFocus&&!this.shadowRoot?.activeElement&&(this.losingFocus=!1,this.closeOptionsMenu(),this.behavior==="list"?this.setTextValue(this.selectedOption?.text??"",!1):this.behavior==="freeform"&&(this.enteredText||this.value)&&this.setValue(this.enteredText))},0)}handleValueChanged(){if(this.value==null){this.enteredText&&this.setTextValue("",!1);return}const i=this.getOptionFor(this.value);if(this.behavior==="freeform"){const t=i?.text??this.value;t!==this.enteredText&&this.setTextValue(t);return}if(!i){this.clearSelectedOption();return}this.enteredText!==i.text&&(this.setTextValue(i.text,!1),this.setFilterText(""))}highlightFirstOption(){this.setHighlightedOption(this.firstFilteredOption)}highlightLastOption(){this.setHighlightedOption(this.lastFilteredOption)}highlightPreviousOption(){const{filteredOptions:i,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightLastOption();return}const{highlightedIndex:e}=this,o=this.wrapArrowKeys&&e===0?t:Math.max(e-1,0);this.setHighlightedOption(i[o])}highlightNextOption(){const{filteredOptions:i,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightFirstOption();return}const{highlightedIndex:e}=this,o=this.wrapArrowKeys&&e===t?0:Math.min(e+1,t);this.setHighlightedOption(i[o])}async setHighlightedOption(i){this.highlightedOption=i,await this.updateComplete;const{optionsList:t,highlightedElement:e}=this;if(!e||!t)return;const o=e.getBoundingClientRect(),s=t.getBoundingClientRect();(o.top<s.top||o.bottom>s.bottom)&&e.scrollIntoView({block:"nearest"})}setSelectedOption(i){const t=this.getOptionFor(i);if(!t)throw new RangeError("Unknown option ID");const e=this.value;this.value=t.id,this.internals.setFormValue(this.value),this.setTextValue(t.text,!1),this.setFilterText(""),this.value!==e&&this.emitChangeEvent(),t.onSelected?.(t)}clearSelectedOption(){const i=this.value;this.value=null,this.internals.setFormValue(this.value),this.setTextValue(""),this.value!==i&&this.emitChangeEvent()}setValue(i){if(this.behavior==="freeform"){const t=this.value;this.value=i,this.internals.setFormValue(this.value),this.setTextValue(i),this.value!==t&&this.emitChangeEvent()}else this.setSelectedOption(i)}setTextValue(i,t=!0){this.textInput&&(this.textInput.value=i),this.enteredText=i,t&&this.setFilterText(i)}setFilterText(i){const{caseTransform:t}=this;this.filterText=t(i)}openOptionsMenu(){this.open=!0,this.emitToggleEvent()}closeOptionsMenu(){this.open=!1,this.emitToggleEvent()}toggleOptionsMenu(){this.open=!this.open,this.emitToggleEvent()}updateFormValidity(){this.required&&!this.value?this.internals.setValidity({valueMissing:!0},N("A value is required")):this.internals.setValidity({})}emitChangeEvent(){this.dispatchEvent(new CustomEvent("change",{detail:this.value}))}emitToggleEvent(){this.dispatchEvent(new CustomEvent("toggle",{detail:this.open}))}get isEmpty(){return!this.selectedOption&&!this.enteredText}get shouldShowClearButton(){return this.clearable&&!this.disabled&&!this.isEmpty}positionOptionsMenu(){const{mainWidgetRow:i,optionsList:t}=this;if(!i||!t)return;const e=i.getBoundingClientRect(),{innerHeight:o,scrollX:s,scrollY:n}=window,r=e.top,l=o-e.bottom,a="var(--combo-box-list-max-height--)",d={top:`${e.bottom+n}px`,left:`${e.left+s}px`,width:`var(--combo-box-list-width--, ${e.width}px)`,maxHeight:`min(${a}, ${l}px)`};Object.assign(t.style,d),setTimeout(()=>{const c=t.getBoundingClientRect().bottom>=o,u=r>l;c&&u&&(t.style.top="auto",t.style.bottom=`${o-e.top-n}px`,t.style.maxHeight=`min(${a}, ${r}px)`)},0)}get caseTransform(){return this.caseSensitive?Bs:Rs}getOptionFor(i){return this.optionsByID.get(i)??null}rebuildOptionIDMap(){this.optionsByID.clear();for(const i of this.options)this.optionsByID.set(i.id,i)}rebuildSortedOptions(){this.sort?this.optionsRespectingSortFlag=[...this.options].sort((i,t)=>{const e=this.optionFilteringValues.get(i),o=this.optionFilteringValues.get(t);return e.localeCompare(o)}):this.optionsRespectingSortFlag=this.options}rebuildOptionFilteringValues(){this.optionFilteringValues.clear();const{caseTransform:i}=this;for(const t of this.options){const e=i(t.text);this.optionFilteringValues.set(t,e)}}rebuildFilteredOptions(){const i=this.behavior==="select-only"?"all":this.filter,t=typeof i=="string"?ks[i]:i,e=this.optionsRespectingSortFlag.filter(o=>{const s=this.optionFilteringValues.get(o);return s?t(this.filterText,s,o):!1}).slice(0,this.maxAutocompleteEntries);this.filteredOptions=e}get firstFilteredOption(){return this.filteredOptions[0]??null}get lastFilteredOption(){return this.filteredOptions[this.lastFilteredIndex]??null}get lastFilteredIndex(){return this.filteredOptions.length-1}get selectedOption(){return this.value==null?null:this.getOptionFor(this.value)}get highlightedIndex(){return this.highlightedOption?this.filteredOptions.indexOf(this.highlightedOption):-1}get highlightedElement(){return this.highlightedOption?this.shadowRoot.getElementById(this.highlightedOption.id):null}static get styles(){const i=B`
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
    `;return[Y,i]}};w.formAssociated=!0;w.shadowRootOptions={...x.shadowRootOptions,delegatesFocus:!0};A([g({type:Array})],w.prototype,"options",2);A([g({type:String})],w.prototype,"placeholder",2);A([g({type:String})],w.prototype,"behavior",2);A([g({type:Number,attribute:"max-autocomplete-entries"})],w.prototype,"maxAutocompleteEntries",2);A([g({type:String})],w.prototype,"filter",2);A([g({type:Boolean,reflect:!0,attribute:"case-sensitive"})],w.prototype,"caseSensitive",2);A([g({type:Boolean,reflect:!0})],w.prototype,"sort",2);A([g({type:Boolean,reflect:!0,attribute:"wrap-arrow-keys"})],w.prototype,"wrapArrowKeys",2);A([g({type:Boolean,reflect:!0,attribute:"stay-open"})],w.prototype,"stayOpen",2);A([g({type:Boolean,reflect:!0})],w.prototype,"clearable",2);A([g({type:Boolean,reflect:!0})],w.prototype,"open",2);A([g({type:Boolean,reflect:!0})],w.prototype,"disabled",2);A([g({type:Boolean,reflect:!0})],w.prototype,"required",2);A([g({type:String})],w.prototype,"value",2);A([v()],w.prototype,"hasFocus",2);A([v()],w.prototype,"highlightedOption",2);A([v()],w.prototype,"enteredText",2);A([v()],w.prototype,"filterText",2);A([$("#main-widget-row")],w.prototype,"mainWidgetRow",2);A([$("#text-input")],w.prototype,"textInput",2);A([$("#options-list")],w.prototype,"optionsList",2);w=A([O("ia-combo-box")],w);var Ds=Object.defineProperty,Ls=Object.getOwnPropertyDescriptor,_=(i,t,e,o)=>{for(var s=o>1?void 0:o?Ls(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(s=(o?r(t,e,s):r(s))||s);return o&&s&&Ds(t,e,s),s};const Us=[{label:"Width",cssVariable:"--ia-theme-combo-box-width",defaultValue:"250px",inputType:"text"},{label:"Padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown width",cssVariable:"--combo-box-list-width",defaultValue:"",inputType:"text"},{label:"Dropdown max height",cssVariable:"--combo-box-list-max-height",defaultValue:"250px",inputType:"text"}],so=[{id:"red",text:"Red"},{id:"orange",text:"Orange"},{id:"yellow",text:"Yellow"},{id:"green",text:"Green"},{id:"blue",text:"Blue"},{id:"indigo",text:"Indigo"},{id:"violet",text:"Violet"}],Ms=so.map(i=>({...i,content:p` <span style="display: flex; align-items: center">
      <span style="flex: 1">${i.text}</span>
      <div style="width: 15px; height: 15px; background:${i.id}"></div>
    </span>`})),fi=oo.map(i=>({id:i.name,text:i.name})),Ns=oo.map(i=>({id:i.name,text:i.name,content:p`<span>${i.flag}</span>&nbsp;<span>${i.name}</span>`})),js="list",Hs="Choices",mi="Select an option...",vi=50,Vs="substring";let y=class extends x{constructor(){super(...arguments),this.options=fi,this.behavior=js,this.label=Hs,this.placeholder=mi,this.maxAutocompleteEntries=vi,this.filterFn=Vs,this.caseSensitive=!1,this.shouldSort=!1,this.wrapArrowKeys=!0,this.clearable=!0,this.disabled=!1,this.announcerText=""}render(){return p`
      <story-template
        elementTag="ia-combo-box"
        elementClassName="IAComboBox"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:Us}}
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
                  value=${mi}
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
                  value=${vi}
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
    `}get exampleUsage(){const{placeholder:i,behavior:t,maxAutocompleteEntries:e,filterFn:o}=this,s={behavior:t?`"${t}"`:"",placeholder:i?`"${i}"`:"","max-autocomplete-entries":e?`"${e}"`:"",filter:o&&o!=="substring"?`"${o}"`:"","case-sensitive":this.caseSensitive,sort:this.shouldSort,"wrap-arrow-keys":this.wrapArrowKeys,clearable:this.clearable,disabled:this.disabled};return`
      <ia-combo-box
        .options=\${[
          { id: 'foo', text: 'Foo Option' },
          { id: 'bar', text: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(s).map(([r,l])=>l?l===!0?r:l?`${r}=${l}`:"":"").join(`
  `)}
      >
        <span slot="label">${this.label}</span>
      </ia-combo-box>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(i){i.preventDefault(),this.updateOptions(),this.behavior=this.behaviorSelect.value,this.label=this.labelInput.value,this.placeholder=this.placeholderInput.value,this.maxAutocompleteEntries=Number(this.maxAutocompleteInput.value),this.filterFn=this.filterFnSelect.value,this.caseSensitive=this.caseSensitiveCheck.checked,this.shouldSort=this.sortCheck.checked,this.wrapArrowKeys=this.wrapArrowKeysCheck.checked,this.clearable=this.clearableCheck.checked,this.disabled=this.disabledCheck.checked}updateOptions(){switch(this.optionSetSelect.value){case"colors":this.options=this.customContentCheck.checked?Ms:so;break;case"countries":this.options=this.customContentCheck.checked?Ns:fi;break;default:this.options=[]}}handleComboBoxChange(i){this.announcerText=`New value is: ${i.detail}`}static get styles(){return B`
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
    `}};_([v()],y.prototype,"options",2);_([v()],y.prototype,"behavior",2);_([v()],y.prototype,"label",2);_([v()],y.prototype,"placeholder",2);_([v()],y.prototype,"maxAutocompleteEntries",2);_([v()],y.prototype,"filterFn",2);_([v()],y.prototype,"caseSensitive",2);_([v()],y.prototype,"shouldSort",2);_([v()],y.prototype,"wrapArrowKeys",2);_([v()],y.prototype,"clearable",2);_([v()],y.prototype,"disabled",2);_([v()],y.prototype,"announcerText",2);_([$("#settings__options")],y.prototype,"optionSetSelect",2);_([$("#settings__custom-content")],y.prototype,"customContentCheck",2);_([$("#settings__behavior")],y.prototype,"behaviorSelect",2);_([$("#settings__label")],y.prototype,"labelInput",2);_([$("#settings__placeholder")],y.prototype,"placeholderInput",2);_([$("#settings__max-entries")],y.prototype,"maxAutocompleteInput",2);_([$("#settings__filter-fn")],y.prototype,"filterFnSelect",2);_([$("#settings__case-sensitive")],y.prototype,"caseSensitiveCheck",2);_([$("#settings__sort")],y.prototype,"sortCheck",2);_([$("#settings__wrap")],y.prototype,"wrapArrowKeysCheck",2);_([$("#settings__clearable")],y.prototype,"clearableCheck",2);_([$("#settings__disabled")],y.prototype,"disabledCheck",2);y=_([O("ia-combo-box-story")],y);const zs=Object.freeze(Object.defineProperty({__proto__:null,get IAComboBoxStory(){return y}},Symbol.toStringTag,{value:"Module"}));function*Fs(i,t){if(i!==void 0){let e=0;for(const o of i)yield t(o,e++)}}const qs="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20class='fill-color'%20d='m17.0555551%2041.3194459c0-12.7430552%2010.3541664-23.1027772%2023.0847216-23.1027772%2012.7166664%200%2023.0777773%2010.359722%2023.0777773%2023.1027772%200%2012.7361108-10.3611109%2023.0986106-23.0777773%2023.0986106-12.7305552%200-23.0847216-10.3624998-23.0847216-23.0986106zm-17.24305512%200c0%2022.2916661%2018.04583292%2040.3472213%2040.32777672%2040.3472213%208.9208332%200%2017.145833-2.9319449%2023.8194439-7.8527776l24.1513883%2024.0777771c1.2125%201.1402778%202.8430555%201.8430556%204.6374999%201.8430556%203.7444443%200%206.7805554-3.0361111%206.7805554-6.7791665%200-2.0652778-.9222222-3.9069444-2.3736111-5.1499999l-23.718055-23.7458328c4.4152777-6.4791665%207.0152776-14.3055552%207.0152776-22.7402772%200-22.2791661-18.0458328-40.34861006-40.312499-40.34861006-22.2819438%200-40.32777672%2018.06944396-40.32777672%2040.34861006z'%20fill='%232c2c2c'%20fill-rule='evenodd'%20/%3e%3c/svg%3e";function b(i,t,e,o){var s=arguments.length,n=s<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,e):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(i,t,e,o);else for(var l=i.length-1;l>=0;l--)(r=i[l])&&(n=(s<3?r(n):s>3?r(t,e,n):r(t,e))||n);return s>3&&n&&Object.defineProperty(t,e,n),n}const jt=window,Ye=jt.ShadowRoot&&(jt.ShadyCSS===void 0||jt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Je=Symbol(),bi=new WeakMap;let no=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==Je)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Ye&&t===void 0){const o=e!==void 0&&e.length===1;o&&(t=bi.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&bi.set(e,t))}return t}toString(){return this.cssText}};const Ks=i=>new no(typeof i=="string"?i:i+"",void 0,Je),Ws=(i,...t)=>{const e=i.length===1?i[0]:t.reduce(((o,s,n)=>o+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[n+1]),i[0]);return new no(e,i,Je)},Gs=(i,t)=>{Ye?i.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((e=>{const o=document.createElement("style"),s=jt.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=e.cssText,i.appendChild(o)}))},yi=Ye?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return Ks(e)})(i):i;var ae;const Wt=window,$i=Wt.trustedTypes,Zs=$i?$i.emptyScript:"",wi=Wt.reactiveElementPolyfillSupport,Oe={toAttribute(i,t){switch(t){case Boolean:i=i?Zs:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},ro=(i,t)=>t!==i&&(t==t||i==i),le={attribute:!0,type:String,converter:Oe,reflect:!1,hasChanged:ro},Te="finalized";let pt=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,o)=>{const s=this._$Ep(o,e);s!==void 0&&(this._$Ev.set(s,o),t.push(s))})),t}static createProperty(t,e=le){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const o=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,o,e);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,o){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||le}static finalize(){if(this.hasOwnProperty(Te))return!1;this[Te]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,o=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const s of o)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const s of o)e.unshift(yi(s))}else t!==void 0&&e.push(yi(t));return e}static _$Ep(t,e){const o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach((e=>e(this)))}addController(t){var e,o;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((o=t.hostConnected)===null||o===void 0||o.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Gs(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach((e=>{var o;return(o=e.hostConnected)===null||o===void 0?void 0:o.call(e)}))}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach((e=>{var o;return(o=e.hostDisconnected)===null||o===void 0?void 0:o.call(e)}))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EO(t,e,o=le){var s;const n=this.constructor._$Ep(t,o);if(n!==void 0&&o.reflect===!0){const r=(((s=o.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?o.converter:Oe).toAttribute(e,o.type);this._$El=t,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(t,e){var o;const s=this.constructor,n=s._$Ev.get(t);if(n!==void 0&&this._$El!==n){const r=s.getPropertyOptions(n),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((o=r.converter)===null||o===void 0?void 0:o.fromAttribute)!==void 0?r.converter:Oe;this._$El=n,this[n]=l.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,o){let s=!0;t!==void 0&&(((o=o||this.constructor.getPropertyOptions(t)).hasChanged||ro)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),o.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,o))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((s,n)=>this[n]=s)),this._$Ei=void 0);let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),(t=this._$ES)===null||t===void 0||t.forEach((s=>{var n;return(n=s.hostUpdate)===null||n===void 0?void 0:n.call(s)})),this.update(o)):this._$Ek()}catch(s){throw e=!1,this._$Ek(),s}e&&this._$AE(o)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach((o=>{var s;return(s=o.hostUpdated)===null||s===void 0?void 0:s.call(o)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach(((e,o)=>this._$EO(o,this[o],e))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};pt[Te]=!0,pt.elementProperties=new Map,pt.elementStyles=[],pt.shadowRootOptions={mode:"open"},wi?.({ReactiveElement:pt}),((ae=Wt.reactiveElementVersions)!==null&&ae!==void 0?ae:Wt.reactiveElementVersions=[]).push("1.6.3");var de;const Gt=window,vt=Gt.trustedTypes,_i=vt?vt.createPolicy("lit-html",{createHTML:i=>i}):void 0,ke="$lit$",K=`lit$${(Math.random()+"").slice(9)}$`,ao="?"+K,Ys=`<${ao}>`,st=document,It=()=>st.createComment(""),Bt=i=>i===null||typeof i!="object"&&typeof i!="function",lo=Array.isArray,Js=i=>lo(i)||typeof i?.[Symbol.iterator]=="function",ce=`[ 	
\f\r]`,Ct=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xi=/-->/g,Si=/>/g,Q=RegExp(`>|${ce}(?:([^\\s"'>=/]+)(${ce}*=${ce}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ai=/'/g,Ci=/"/g,co=/^(?:script|style|textarea|title)$/i,Qs=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),Xs=Qs(1),bt=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),Ei=new WeakMap,et=st.createTreeWalker(st,129,null,!1);function ho(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return _i!==void 0?_i.createHTML(t):t}const tn=(i,t)=>{const e=i.length-1,o=[];let s,n=t===2?"<svg>":"",r=Ct;for(let l=0;l<e;l++){const a=i[l];let d,h,c=-1,u=0;for(;u<a.length&&(r.lastIndex=u,h=r.exec(a),h!==null);)u=r.lastIndex,r===Ct?h[1]==="!--"?r=xi:h[1]!==void 0?r=Si:h[2]!==void 0?(co.test(h[2])&&(s=RegExp("</"+h[2],"g")),r=Q):h[3]!==void 0&&(r=Q):r===Q?h[0]===">"?(r=s??Ct,c=-1):h[1]===void 0?c=-2:(c=r.lastIndex-h[2].length,d=h[1],r=h[3]===void 0?Q:h[3]==='"'?Ci:Ai):r===Ci||r===Ai?r=Q:r===xi||r===Si?r=Ct:(r=Q,s=void 0);const f=r===Q&&i[l+1].startsWith("/>")?" ":"";n+=r===Ct?a+Ys:c>=0?(o.push(d),a.slice(0,c)+ke+a.slice(c)+K+f):a+K+(c===-2?(o.push(void 0),l):f)}return[ho(i,n+(i[e]||"<?>")+(t===2?"</svg>":"")),o]};let Pe=class po{constructor({strings:t,_$litType$:e},o){let s;this.parts=[];let n=0,r=0;const l=t.length-1,a=this.parts,[d,h]=tn(t,e);if(this.el=po.createElement(d,o),et.currentNode=this.el.content,e===2){const c=this.el.content,u=c.firstChild;u.remove(),c.append(...u.childNodes)}for(;(s=et.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes()){const c=[];for(const u of s.getAttributeNames())if(u.endsWith(ke)||u.startsWith(K)){const f=h[r++];if(c.push(u),f!==void 0){const D=s.getAttribute(f.toLowerCase()+ke).split(K),L=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:L[2],strings:D,ctor:L[1]==="."?on:L[1]==="?"?nn:L[1]==="@"?rn:oe})}else a.push({type:6,index:n})}for(const u of c)s.removeAttribute(u)}if(co.test(s.tagName)){const c=s.textContent.split(K),u=c.length-1;if(u>0){s.textContent=vt?vt.emptyScript:"";for(let f=0;f<u;f++)s.append(c[f],It()),et.nextNode(),a.push({type:2,index:++n});s.append(c[u],It())}}}else if(s.nodeType===8)if(s.data===ao)a.push({type:2,index:n});else{let c=-1;for(;(c=s.data.indexOf(K,c+1))!==-1;)a.push({type:7,index:n}),c+=K.length-1}n++}}static createElement(t,e){const o=st.createElement("template");return o.innerHTML=t,o}};function yt(i,t,e=i,o){var s,n,r,l;if(t===bt)return t;let a=o!==void 0?(s=e._$Co)===null||s===void 0?void 0:s[o]:e._$Cl;const d=Bt(t)?void 0:t._$litDirective$;return a?.constructor!==d&&((n=a?._$AO)===null||n===void 0||n.call(a,!1),d===void 0?a=void 0:(a=new d(i),a._$AT(i,e,o)),o!==void 0?((r=(l=e)._$Co)!==null&&r!==void 0?r:l._$Co=[])[o]=a:e._$Cl=a),a!==void 0&&(t=yt(i,a._$AS(i,t.values),a,o)),t}let en=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:o},parts:s}=this._$AD,n=((e=t?.creationScope)!==null&&e!==void 0?e:st).importNode(o,!0);et.currentNode=n;let r=et.nextNode(),l=0,a=0,d=s[0];for(;d!==void 0;){if(l===d.index){let h;d.type===2?h=new Qe(r,r.nextSibling,this,t):d.type===1?h=new d.ctor(r,d.name,d.strings,this,t):d.type===6&&(h=new an(r,this,t)),this._$AV.push(h),d=s[++a]}l!==d?.index&&(r=et.nextNode(),l++)}return et.currentNode=st,n}v(t){let e=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}},Qe=class uo{constructor(t,e,o,s){var n;this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=s,this._$Cp=(n=s?.isConnected)===null||n===void 0||n}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=yt(this,t,e),Bt(t)?t===S||t==null||t===""?(this._$AH!==S&&this._$AR(),this._$AH=S):t!==this._$AH&&t!==bt&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):Js(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==S&&Bt(this._$AH)?this._$AA.nextSibling.data=t:this.$(st.createTextNode(t)),this._$AH=t}g(t){var e;const{values:o,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Pe.createElement(ho(s.h,s.h[0]),this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===n)this._$AH.v(o);else{const r=new en(n,this),l=r.u(this.options);r.v(o),this.$(l),this._$AH=r}}_$AC(t){let e=Ei.get(t.strings);return e===void 0&&Ei.set(t.strings,e=new Pe(t)),e}T(t){lo(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,s=0;for(const n of t)s===e.length?e.push(o=new uo(this.k(It()),this.k(It()),this,this.options)):o=e[s],o._$AI(n),s++;s<e.length&&(this._$AR(o&&o._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var o;for((o=this._$AP)===null||o===void 0||o.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}},oe=class{constructor(t,e,o,s,n){this.type=1,this._$AH=S,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=S}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,o,s){const n=this.strings;let r=!1;if(n===void 0)t=yt(this,t,e,0),r=!Bt(t)||t!==this._$AH&&t!==bt,r&&(this._$AH=t);else{const l=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=yt(this,l[o+a],e,a),d===bt&&(d=this._$AH[a]),r||(r=!Bt(d)||d!==this._$AH[a]),d===S?t=S:t!==S&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}r&&!s&&this.j(t)}j(t){t===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},on=class extends oe{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===S?void 0:t}};const sn=vt?vt.emptyScript:"";let nn=class extends oe{constructor(){super(...arguments),this.type=4}j(t){t&&t!==S?this.element.setAttribute(this.name,sn):this.element.removeAttribute(this.name)}},rn=class extends oe{constructor(t,e,o,s,n){super(t,e,o,s,n),this.type=5}_$AI(t,e=this){var o;if((t=(o=yt(this,t,e,0))!==null&&o!==void 0?o:S)===bt)return;const s=this._$AH,n=t===S&&s!==S||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==S&&(s===S||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,o;typeof this._$AH=="function"?this._$AH.call((o=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&o!==void 0?o:this.element,t):this._$AH.handleEvent(t)}},an=class{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){yt(this,t)}};const Oi=Gt.litHtmlPolyfillSupport;Oi?.(Pe,Qe),((de=Gt.litHtmlVersions)!==null&&de!==void 0?de:Gt.litHtmlVersions=[]).push("2.8.0");const ln=(i,t,e)=>{var o,s;const n=(o=e?.renderBefore)!==null&&o!==void 0?o:t;let r=n._$litPart$;if(r===void 0){const l=(s=e?.renderBefore)!==null&&s!==void 0?s:null;n._$litPart$=r=new Qe(t.insertBefore(It(),l),l,void 0,e??{})}return r._$AI(i),r};var he,pe;let gt=class extends pt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const o=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=o.firstChild),o}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ln(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return bt}};gt.finalized=!0,gt._$litElement$=!0,(he=globalThis.litElementHydrateSupport)===null||he===void 0||he.call(globalThis,{LitElement:gt});const Ti=globalThis.litElementPolyfillSupport;Ti?.({LitElement:gt});((pe=globalThis.litElementVersions)!==null&&pe!==void 0?pe:globalThis.litElementVersions=[]).push("3.3.3");const dn=i=>t=>typeof t=="function"?((e,o)=>(customElements.define(e,o),o))(i,t):((e,o)=>{const{kind:s,elements:n}=o;return{kind:s,elements:n,finisher(r){customElements.define(e,r)}}})(i,t);const cn=(i,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,i)}},hn=(i,t,e)=>{t.constructor.createProperty(e,i)};function at(i){return(t,e)=>e!==void 0?hn(i,t,e):cn(i,t)}const pn=({finisher:i,descriptor:t})=>(e,o)=>{var s;if(o===void 0){const n=(s=e.originalKey)!==null&&s!==void 0?s:e.key,r=t!=null?{kind:"method",placement:"prototype",key:n,descriptor:t(e.key)}:{...e,key:n};return i!=null&&(r.finisher=function(l){i(l,n)}),r}{const n=e.constructor;t!==void 0&&Object.defineProperty(e,o,t(o)),i?.(n,o)}};function un(i,t){return pn({descriptor:e=>({get(){var s,n;return(n=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(i))!==null&&n!==void 0?n:null},enumerable:!0,configurable:!0})})}var ue;((ue=window.HTMLSlotElement)===null||ue===void 0?void 0:ue.prototype.assignedElements)!=null;const gn=p`
<svg
  viewBox="0 0 40 40"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z" class="fill-color" fill-rule="evenodd"/>
</svg>
`;class fn extends x{static get styles(){return B`
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
    `}render(){return gn}}customElements.define("ia-icon-close",fn);let H=class extends gt{constructor(){super(...arguments),this.value="",this.clearButtonScreenReaderLabel="Clear",this.focusOnClear=!0,this.forceClearButton=!1}render(){var t,e,o,s;const n=!this.value&&!this.forceClearButton;return Xs`
      <div id="container">
        <slot name="icon"></slot>
        <label for="text-input" class="sr-only"
          >${(t=this.screenReaderLabel)!==null&&t!==void 0?t:S}</label
        >
        <input
          id="text-input"
          type="text"
          inputmode="search"
          enterkeyhint="search"
          autocapitalize="off"
          placeholder=${(e=this.placeholder)!==null&&e!==void 0?e:S}
          .value=${(o=this.value)!==null&&o!==void 0?o:S}
          aria-controls=${(s=this.ariaControls)!==null&&s!==void 0?s:S}
          @input=${this.onTextInput}
          @keypress=${this.onKeyPress}
        />
        <button
          id="clear-button"
          type="button"
          ?hidden=${n}
          @click=${this.clearButtonClicked}
        >
          <ia-icon-close aria-hidden="true"></ia-icon-close>
          <span class="sr-only">${this.clearButtonScreenReaderLabel}</span>
        </button>
      </div>
    `}onTextInput(){this.value=this.textInput.value}onKeyPress(t){if(t.key==="Enter"){this.textInput.blur();const e=new CustomEvent("submit",{detail:this.value});this.dispatchEvent(e)}}clearButtonClicked(){const t=this.textInput.value;this.value="",this.focusOnClear&&this.textInput.focus();const e=new CustomEvent("clear",{detail:t});this.dispatchEvent(e);const o=new InputEvent("input",{inputType:"deleteContentBackward"});this.dispatchEvent(o)}};H.shadowRootOptions={...gt.shadowRootOptions,delegatesFocus:!0};H.styles=Ws`
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
  `;b([at({type:String})],H.prototype,"value",void 0);b([at({type:String})],H.prototype,"placeholder",void 0);b([at({type:String})],H.prototype,"screenReaderLabel",void 0);b([at({type:String})],H.prototype,"clearButtonScreenReaderLabel",void 0);b([at({type:String})],H.prototype,"ariaControls",void 0);b([at({type:Boolean})],H.prototype,"focusOnClear",void 0);b([at({type:Boolean,reflect:!0})],H.prototype,"forceClearButton",void 0);b([un("#text-input")],H.prototype,"textInput",void 0);H=b([dn("ia-clearable-text-input")],H);const Ht=window,Xe=Ht.ShadowRoot&&(Ht.ShadyCSS===void 0||Ht.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ti=Symbol(),ki=new WeakMap;let go=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==ti)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Xe&&t===void 0){const o=e!==void 0&&e.length===1;o&&(t=ki.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&ki.set(e,t))}return t}toString(){return this.cssText}};const mn=i=>new go(typeof i=="string"?i:i+"",void 0,ti),V=(i,...t)=>{const e=i.length===1?i[0]:t.reduce(((o,s,n)=>o+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[n+1]),i[0]);return new go(e,i,ti)},vn=(i,t)=>{Xe?i.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((e=>{const o=document.createElement("style"),s=Ht.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=e.cssText,i.appendChild(o)}))},Pi=Xe?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return mn(e)})(i):i;var ge;const Zt=window,Ii=Zt.trustedTypes,bn=Ii?Ii.emptyScript:"",Bi=Zt.reactiveElementPolyfillSupport,Ie={toAttribute(i,t){switch(t){case Boolean:i=i?bn:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},fo=(i,t)=>t!==i&&(t==t||i==i),fe={attribute:!0,type:String,converter:Ie,reflect:!1,hasChanged:fo},Be="finalized";let ut=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,o)=>{const s=this._$Ep(o,e);s!==void 0&&(this._$Ev.set(s,o),t.push(s))})),t}static createProperty(t,e=fe){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const o=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,o,e);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,o){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||fe}static finalize(){if(this.hasOwnProperty(Be))return!1;this[Be]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,o=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const s of o)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const s of o)e.unshift(Pi(s))}else t!==void 0&&e.push(Pi(t));return e}static _$Ep(t,e){const o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach((e=>e(this)))}addController(t){var e,o;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((o=t.hostConnected)===null||o===void 0||o.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return vn(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach((e=>{var o;return(o=e.hostConnected)===null||o===void 0?void 0:o.call(e)}))}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach((e=>{var o;return(o=e.hostDisconnected)===null||o===void 0?void 0:o.call(e)}))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EO(t,e,o=fe){var s;const n=this.constructor._$Ep(t,o);if(n!==void 0&&o.reflect===!0){const r=(((s=o.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?o.converter:Ie).toAttribute(e,o.type);this._$El=t,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(t,e){var o;const s=this.constructor,n=s._$Ev.get(t);if(n!==void 0&&this._$El!==n){const r=s.getPropertyOptions(n),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((o=r.converter)===null||o===void 0?void 0:o.fromAttribute)!==void 0?r.converter:Ie;this._$El=n,this[n]=l.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,o){let s=!0;t!==void 0&&(((o=o||this.constructor.getPropertyOptions(t)).hasChanged||fo)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),o.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,o))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((s,n)=>this[n]=s)),this._$Ei=void 0);let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),(t=this._$ES)===null||t===void 0||t.forEach((s=>{var n;return(n=s.hostUpdate)===null||n===void 0?void 0:n.call(s)})),this.update(o)):this._$Ek()}catch(s){throw e=!1,this._$Ek(),s}e&&this._$AE(o)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach((o=>{var s;return(s=o.hostUpdated)===null||s===void 0?void 0:s.call(o)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach(((e,o)=>this._$EO(o,this[o],e))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};ut[Be]=!0,ut.elementProperties=new Map,ut.elementStyles=[],ut.shadowRootOptions={mode:"open"},Bi?.({ReactiveElement:ut}),((ge=Zt.reactiveElementVersions)!==null&&ge!==void 0?ge:Zt.reactiveElementVersions=[]).push("1.6.3");var me;const Yt=window,$t=Yt.trustedTypes,Ri=$t?$t.createPolicy("lit-html",{createHTML:i=>i}):void 0,Re="$lit$",W=`lit$${(Math.random()+"").slice(9)}$`,mo="?"+W,yn=`<${mo}>`,nt=document,Rt=()=>nt.createComment(""),Dt=i=>i===null||typeof i!="object"&&typeof i!="function",vo=Array.isArray,$n=i=>vo(i)||typeof i?.[Symbol.iterator]=="function",ve=`[ 	
\f\r]`,Et=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Di=/-->/g,Li=/>/g,X=RegExp(`>|${ve}(?:([^\\s"'>=/]+)(${ve}*=${ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ui=/'/g,Mi=/"/g,bo=/^(?:script|style|textarea|title)$/i,yo=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),k=yo(1),$o=yo(2),wt=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),Ni=new WeakMap,it=nt.createTreeWalker(nt,129,null,!1);function wo(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ri!==void 0?Ri.createHTML(t):t}const wn=(i,t)=>{const e=i.length-1,o=[];let s,n=t===2?"<svg>":"",r=Et;for(let l=0;l<e;l++){const a=i[l];let d,h,c=-1,u=0;for(;u<a.length&&(r.lastIndex=u,h=r.exec(a),h!==null);)u=r.lastIndex,r===Et?h[1]==="!--"?r=Di:h[1]!==void 0?r=Li:h[2]!==void 0?(bo.test(h[2])&&(s=RegExp("</"+h[2],"g")),r=X):h[3]!==void 0&&(r=X):r===X?h[0]===">"?(r=s??Et,c=-1):h[1]===void 0?c=-2:(c=r.lastIndex-h[2].length,d=h[1],r=h[3]===void 0?X:h[3]==='"'?Mi:Ui):r===Mi||r===Ui?r=X:r===Di||r===Li?r=Et:(r=X,s=void 0);const f=r===X&&i[l+1].startsWith("/>")?" ":"";n+=r===Et?a+yn:c>=0?(o.push(d),a.slice(0,c)+Re+a.slice(c)+W+f):a+W+(c===-2?(o.push(void 0),l):f)}return[wo(i,n+(i[e]||"<?>")+(t===2?"</svg>":"")),o]};class Lt{constructor({strings:t,_$litType$:e},o){let s;this.parts=[];let n=0,r=0;const l=t.length-1,a=this.parts,[d,h]=wn(t,e);if(this.el=Lt.createElement(d,o),it.currentNode=this.el.content,e===2){const c=this.el.content,u=c.firstChild;u.remove(),c.append(...u.childNodes)}for(;(s=it.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes()){const c=[];for(const u of s.getAttributeNames())if(u.endsWith(Re)||u.startsWith(W)){const f=h[r++];if(c.push(u),f!==void 0){const D=s.getAttribute(f.toLowerCase()+Re).split(W),L=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:L[2],strings:D,ctor:L[1]==="."?xn:L[1]==="?"?An:L[1]==="@"?Cn:se})}else a.push({type:6,index:n})}for(const u of c)s.removeAttribute(u)}if(bo.test(s.tagName)){const c=s.textContent.split(W),u=c.length-1;if(u>0){s.textContent=$t?$t.emptyScript:"";for(let f=0;f<u;f++)s.append(c[f],Rt()),it.nextNode(),a.push({type:2,index:++n});s.append(c[u],Rt())}}}else if(s.nodeType===8)if(s.data===mo)a.push({type:2,index:n});else{let c=-1;for(;(c=s.data.indexOf(W,c+1))!==-1;)a.push({type:7,index:n}),c+=W.length-1}n++}}static createElement(t,e){const o=nt.createElement("template");return o.innerHTML=t,o}}function _t(i,t,e=i,o){var s,n,r,l;if(t===wt)return t;let a=o!==void 0?(s=e._$Co)===null||s===void 0?void 0:s[o]:e._$Cl;const d=Dt(t)?void 0:t._$litDirective$;return a?.constructor!==d&&((n=a?._$AO)===null||n===void 0||n.call(a,!1),d===void 0?a=void 0:(a=new d(i),a._$AT(i,e,o)),o!==void 0?((r=(l=e)._$Co)!==null&&r!==void 0?r:l._$Co=[])[o]=a:e._$Cl=a),a!==void 0&&(t=_t(i,a._$AS(i,t.values),a,o)),t}class _n{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:o},parts:s}=this._$AD,n=((e=t?.creationScope)!==null&&e!==void 0?e:nt).importNode(o,!0);it.currentNode=n;let r=it.nextNode(),l=0,a=0,d=s[0];for(;d!==void 0;){if(l===d.index){let h;d.type===2?h=new Ut(r,r.nextSibling,this,t):d.type===1?h=new d.ctor(r,d.name,d.strings,this,t):d.type===6&&(h=new En(r,this,t)),this._$AV.push(h),d=s[++a]}l!==d?.index&&(r=it.nextNode(),l++)}return it.currentNode=nt,n}v(t){let e=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class Ut{constructor(t,e,o,s){var n;this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=s,this._$Cp=(n=s?.isConnected)===null||n===void 0||n}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=_t(this,t,e),Dt(t)?t===E||t==null||t===""?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==wt&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):$n(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==E&&Dt(this._$AH)?this._$AA.nextSibling.data=t:this.$(nt.createTextNode(t)),this._$AH=t}g(t){var e;const{values:o,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Lt.createElement(wo(s.h,s.h[0]),this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===n)this._$AH.v(o);else{const r=new _n(n,this),l=r.u(this.options);r.v(o),this.$(l),this._$AH=r}}_$AC(t){let e=Ni.get(t.strings);return e===void 0&&Ni.set(t.strings,e=new Lt(t)),e}T(t){vo(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,s=0;for(const n of t)s===e.length?e.push(o=new Ut(this.k(Rt()),this.k(Rt()),this,this.options)):o=e[s],o._$AI(n),s++;s<e.length&&(this._$AR(o&&o._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var o;for((o=this._$AP)===null||o===void 0||o.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class se{constructor(t,e,o,s,n){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=E}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,o,s){const n=this.strings;let r=!1;if(n===void 0)t=_t(this,t,e,0),r=!Dt(t)||t!==this._$AH&&t!==wt,r&&(this._$AH=t);else{const l=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=_t(this,l[o+a],e,a),d===wt&&(d=this._$AH[a]),r||(r=!Dt(d)||d!==this._$AH[a]),d===E?t=E:t!==E&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}r&&!s&&this.j(t)}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class xn extends se{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===E?void 0:t}}const Sn=$t?$t.emptyScript:"";class An extends se{constructor(){super(...arguments),this.type=4}j(t){t&&t!==E?this.element.setAttribute(this.name,Sn):this.element.removeAttribute(this.name)}}class Cn extends se{constructor(t,e,o,s,n){super(t,e,o,s,n),this.type=5}_$AI(t,e=this){var o;if((t=(o=_t(this,t,e,0))!==null&&o!==void 0?o:E)===wt)return;const s=this._$AH,n=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==E&&(s===E||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,o;typeof this._$AH=="function"?this._$AH.call((o=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&o!==void 0?o:this.element,t):this._$AH.handleEvent(t)}}class En{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){_t(this,t)}}const ji=Yt.litHtmlPolyfillSupport;ji?.(Lt,Ut),((me=Yt.litHtmlVersions)!==null&&me!==void 0?me:Yt.litHtmlVersions=[]).push("2.8.0");const On=(i,t,e)=>{var o,s;const n=(o=e?.renderBefore)!==null&&o!==void 0?o:t;let r=n._$litPart$;if(r===void 0){const l=(s=e?.renderBefore)!==null&&s!==void 0?s:null;n._$litPart$=r=new Ut(t.insertBefore(Rt(),l),l,void 0,e??{})}return r._$AI(i),r};var be,ye;class ft extends ut{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const o=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=o.firstChild),o}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=On(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return wt}}ft.finalized=!0,ft._$litElement$=!0,(be=globalThis.litElementHydrateSupport)===null||be===void 0||be.call(globalThis,{LitElement:ft});const Hi=globalThis.litElementPolyfillSupport;Hi?.({LitElement:ft});((ye=globalThis.litElementVersions)!==null&&ye!==void 0?ye:globalThis.litElementVersions=[]).push("3.3.3");const _o=i=>t=>typeof t=="function"?((e,o)=>(customElements.define(e,o),o))(i,t):((e,o)=>{const{kind:s,elements:n}=o;return{kind:s,elements:n,finisher(r){customElements.define(e,r)}}})(i,t);const Tn=(i,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,i)}},kn=(i,t,e)=>{t.constructor.createProperty(e,i)};function R(i){return(t,e)=>e!==void 0?kn(i,t,e):Tn(i,t)}const xo=({finisher:i,descriptor:t})=>(e,o)=>{var s;if(o===void 0){const n=(s=e.originalKey)!==null&&s!==void 0?s:e.key,r=t!=null?{kind:"method",placement:"prototype",key:n,descriptor:t(e.key)}:{...e,key:n};return i!=null&&(r.finisher=function(l){i(l,n)}),r}{const n=e.constructor;t!==void 0&&Object.defineProperty(e,o,t(o)),i?.(n,o)}};function ei(i,t){return xo({descriptor:e=>({get(){var s,n;return(n=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(i))!==null&&n!==void 0?n:null},enumerable:!0,configurable:!0})})}var $e;const Pn=(($e=window.HTMLSlotElement)===null||$e===void 0?void 0:$e.prototype.assignedElements)!=null?(i,t)=>i.assignedElements(t):(i,t)=>i.assignedNodes(t).filter((e=>e.nodeType===Node.ELEMENT_NODE));function In(i){const{slot:t,selector:e}=i??{};return xo({descriptor:o=>({get(){var s;const n="slot"+(t?`[name=${t}]`:":not([name])"),r=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(n),l=r!=null?Pn(r,i):[];return e?l.filter((a=>a.matches(e))):l},enumerable:!0,configurable:!0})})}function dt(i,t,e){return i?t():e?.()}const Bn=$o`<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>`,Rn=$o`<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>`;let C=class extends ft{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionGroup="options",this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=t=>{switch(t.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=t=>{t&&t.type==="click"&&t.stopPropagation(),this.open=!1,this.updatePopoverState()}}async firstUpdated(){await new Promise(t=>{setTimeout(t,0)}),this.addEventListener("closeDropdown",this.closeOptions)}willUpdate(t){t.has("open")&&this.updatePopoverState()}disconnectedCallback(){var t;(t=super.disconnectedCallback)===null||t===void 0||t.call(this),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){var t,e;this.usePopover&&((e=(t=this.dropdownMenu)===null||t===void 0?void 0:t.togglePopover)===null||e===void 0||e.call(t,this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;const t=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${t.left}px`,this.dropdownMenu.style.top=`${t.bottom}px`,this.dropdownMenu.style.minWidth=`${t.width}px`}mainButtonClicked(){var t;this.openViaButton?this.toggleOptions():(t=this.mainButtonLabelSlotted[0])===null||t===void 0||t.click()}mainButtonKeyDown(t){(t.key==="Enter"||t.key===" ")&&(this.mainButtonClicked(),t.preventDefault())}caretKeyDown(t){(t.key==="Enter"||t.key===" ")&&(this.toggleOptions(),t.preventDefault())}renderOption(t){const{label:e,url:o=void 0,id:s}=t;let n;const r=this.selectedOption===s?"selected":"";return o?n=k`<a
        href=${o}
        @click=${l=>this.optionClicked(l,t)}
        >${e}</a
      >`:n=k`<button
        @click=${l=>this.optionClicked(l,t)}
      >
        ${e}
      </button>`,k`<li role="menuitem" class=${r}>${n}</li>`}optionClicked(t,e){var o;t.stopPropagation(),this.selectedOption!==e.id&&(this.selectedOption=e.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:e}})),(o=e.selectedHandler)===null||o===void 0||o.call(e,e)),this.closeOnSelect&&(this.closeOptions(),this.mainButton.focus())}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(t=>this.selectedOption!==t.id)}get caretUpTemplate(){return k`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${Bn}</slot>
      </span>
    `}get caretDownTemplate(){return k`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${Rn}</slot>
      </span>
    `}get caretTemplate(){return this.displayCaret?this.openViaButton?k`
        <span class="caret" aria-hidden="true">
          ${this.caretUpTemplate} ${this.caretDownTemplate}
        </span>
      `:k`
      <button
        class="caret"
        aria-labelledby="caret-label"
        aria-haspopup="true"
        aria-expanded=${this.open}
        @click=${dt(this.shouldAttachEventHandlers,()=>this.toggleOptions)}
        @keydown=${dt(this.shouldAttachEventHandlers,()=>this.caretKeyDown)}
        ?disabled=${this.isDisabled}
      >
        ${this.caretUpTemplate} ${this.caretDownTemplate}
      </button>
    `:k``}get dropdownTemplate(){return this.isCustomList?k`<slot name="list"></slot>`:k`${this.availableOptions.map(t=>this.renderOption(t))}`}get backdropTemplate(){return this.closeOnBackdropClick?this.open?k`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `:k``:k``}get shouldNestCaretInButton(){return this.openViaButton}get shouldAttachEventHandlers(){return!this.isDisabled&&!this.hasCustomClickHandler}render(){return k`
      <div class="ia-dropdown-group">
        <div class="button-row">
          <button
            class="click-main"
            aria-haspopup=${this.openViaButton}
            aria-expanded=${this.open}
            @click=${dt(this.shouldAttachEventHandlers,()=>this.mainButtonClicked)}
            @keydown=${dt(this.shouldAttachEventHandlers,()=>this.mainButtonKeyDown)}
            ?disabled=${this.isDisabled}
          >
            <span class="sr-only" id="caret-label"
              >Toggle ${this.optionGroup}</span
            >
            <slot name="dropdown-label"></slot>
            ${dt(this.shouldNestCaretInButton,()=>this.caretTemplate)}
          </button>
          ${dt(!this.shouldNestCaretInButton,()=>this.caretTemplate)}
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
    `}static get styles(){const t=V`var(--dropdownBorderWidth, 1px)`,e=V`var(--dropdownBorderRadius, 4px)`,o=V`var(--dropdownBorderColor, #fff)`,s=V`var(--dropdownBgColor, #333)`,n=V`var(--dropdownTextColor, #fff)`,r=V`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,l=V`var(--dropdownSelectedBgColor, #fff)`,a=V`var(--dropdownMainButtonBgColor, transparent)`,d=V`var(--dropdownTextAlign, inherit)`;return V`
      :host {
        display: inline;
        color: ${n};
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
        background: ${a};
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
        z-index: var(--dropdownListZIndex, 2);
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
          ${a}
        );
      }

      button.click-main:focus,
      button.click-main:focus-visible {
        background-color: var(
          --dropdownMainButtonFocusBgColor,
          ${a}
        );
      }

      button.click-main:active {
        background-color: var(
          --dropdownMainButtonActiveBgColor,
          ${a}
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
        z-index: 1;
      }

      ul {
        z-index: var(--dropdownListZIndex, 2);
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
        color: ${n};
        background: ${s};

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
        background-color: ${r};
        color: var(--dropdownHoverTextColor, #fff);
        list-style: none;
        cursor: pointer;
      }

      #dropdown-main li:hover:first-child {
        border-top-color: ${r};
      }

      ul#dropdown-main li:hover:last-child {
        border-bottom-color: ${r};
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
        background-color: ${r};
        color: var(--dropdownHoverTextColor, #fff);
      }

      #dropdown-main li.selected > * {
        background-color: ${l};
        color: var(--dropdownSelectedTextColor, #2c2c2c);
      }

      #dropdown-main li {
        background: ${s};
        list-style: none;
        height: 30px;
        cursor: pointer;
        border-bottom: 0.5px solid ${s};
        border-top: 0.5px solid ${s};
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
        color: ${n};
        background: var(--dropdownItemButtonBgColor, transparent);
        padding: var(--dropdownItemButtonPadding, 0);
        text-align: ${d};
      }
    `}};b([R({type:Boolean,reflect:!0})],C.prototype,"open",void 0);b([R({type:Boolean,reflect:!0})],C.prototype,"isDisabled",void 0);b([R({type:Boolean})],C.prototype,"displayCaret",void 0);b([R({type:Boolean})],C.prototype,"closeOnSelect",void 0);b([R({type:Boolean})],C.prototype,"openViaButton",void 0);b([R({type:Boolean})],C.prototype,"usePopover",void 0);b([R({type:Boolean})],C.prototype,"includeSelectedOption",void 0);b([R({type:String})],C.prototype,"selectedOption",void 0);b([R({attribute:!1})],C.prototype,"options",void 0);b([R({type:String})],C.prototype,"optionGroup",void 0);b([R({attribute:!1})],C.prototype,"optionSelected",void 0);b([R({type:Boolean,reflect:!0})],C.prototype,"isCustomList",void 0);b([R({type:Boolean,reflect:!0})],C.prototype,"hasCustomClickHandler",void 0);b([R({type:Boolean,reflect:!0})],C.prototype,"closeOnEscape",void 0);b([R({type:Boolean,reflect:!0})],C.prototype,"closeOnBackdropClick",void 0);b([ei(".ia-dropdown-group")],C.prototype,"container",void 0);b([ei("#dropdown-main")],C.prototype,"dropdownMenu",void 0);b([ei(".click-main")],C.prototype,"mainButton",void 0);b([In({slot:"dropdown-label"})],C.prototype,"mainButtonLabelSlotted",void 0);C=b([_o("ia-dropdown")],C);let De=class extends ft{render(){return k`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `}};De.styles=V`
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
  `;De=b([_o("ia-icon-label")],De);var Dn=Object.defineProperty,Ln=Object.getOwnPropertyDescriptor,xt=(i,t,e,o)=>{for(var s=o>1?void 0:o?Ln(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(s=(o?r(t,e,s):r(s))||s);return o&&s&&Dn(t,e,s),s};let rt=class extends x{constructor(){super(...arguments),this.loadingTitle=N("Loading..."),this.successTitle=N("Success"),this.errorTitle=N("Error"),this.loadingStyle="ring-dots",this.mode="loading"}render(){return p`${io(this.mode,[["loading",()=>this.loadingIndicatorTemplate],["success",()=>this.successIndicatorTemplate],["error",()=>this.errorIndicatorTemplate]])}`}get loadingIndicatorTemplate(){return p`
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
    `}get successIndicatorTemplate(){return p`
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
    `}get errorIndicatorTemplate(){return p`
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
    `}get shouldShowLoadingDots(){return this.loadingStyle!=="ring"}static get styles(){return[Y,B`
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
      `]}};xt([g({type:String})],rt.prototype,"loadingTitle",2);xt([g({type:String})],rt.prototype,"successTitle",2);xt([g({type:String})],rt.prototype,"errorTitle",2);xt([g({type:String})],rt.prototype,"loadingStyle",2);xt([g({type:String})],rt.prototype,"mode",2);rt=xt([O("ia-status-indicator")],rt);var Un=Object.defineProperty,Mn=Object.getOwnPropertyDescriptor,z=(i,t,e,o)=>{for(var s=o>1?void 0:o?Mn(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(s=(o?r(t,e,s):r(s))||s);return o&&s&&Un(t,e,s),s};const we={AdvancedSearchClicked:"advancedSearchClicked",CategoryChanged:"categoryChanged",SearchRequested:"searchRequested"};let I=class extends x{constructor(){super(...arguments),this.categories=[],this.advancedSearchStyle="link",this.placeholder=N("Search"),this.useMobileView=!1,this.hideDropdown=!1,this.loading=!1}get resolvedCategory(){return this.selectedCategory??this.categories[0]?.id??""}render(){return p`
      <div id="container" part="container" role="search">
        <div
          id="main-bar"
          part="main-bar"
          class=${this.hideDropdown?"no-dropdown":m}
        >
          ${this.hideDropdown?m:this.dropdownTemplate}
          ${this.textBoxTemplate} ${this.searchButtonTemplate}
        </div>
        ${this.searchLinksTemplate}
      </div>
    `}get dropdownTemplate(){return p`
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
        .options=${this.dropdownOptions}
        @optionSelected=${this.handleCategorySelected}
      >
        <span slot="dropdown-label">${this.selectedCategoryLabel}</span>
      </ia-dropdown>
    `}get textBoxTemplate(){return p`
      <ia-clearable-text-input
        id="search-input"
        part="search-input"
        .value=${this.spacedQuery}
        placeholder=${this.placeholder}
        clearButtonScreenReaderLabel=${N("Clear search query")}
        screenReaderLabel=${N("Search the Archive. Filters and Advanced Search available below.")}
        @clear=${this.searchFieldCleared}
        @submit=${this.handleSubmit}
      ></ia-clearable-text-input>
    `}get searchButtonTemplate(){return p`
      <button
        id="search-button"
        part="search-button"
        class=${this.loading?"loading":m}
        type="button"
        aria-label=${N("Search")}
        @click=${this.handleSubmit}
      >
        ${this.loading?p`<ia-status-indicator
              mode="loading"
              class="search-button-loading-icon"
            ></ia-status-indicator>`:p`<img src=${qs} alt="" />`}
      </button>
    `}get dropdownOptions(){const i=this.categories.map(t=>({id:t.id,label:p`<span>${t.label}</span>`}));return this.advancedSearchStyle==="dropdown"&&this.navBaseUrl!==void 0&&i.push({id:I.ADVANCED_SEARCH_OPTION_ID,label:p`<span style="border-top: 1px solid #999;">
          ${N("Go to Advanced Search...")}
        </span>`}),i}buildAdvancedSearchUrl(i){if(this.navBaseUrl===void 0)return;const t=i?`?q=${encodeURIComponent(i)}`:"";return`${this.navBaseUrl}/advancedsearch.php${t}`}get selectedCategoryLabel(){return this.categories.find(t=>t.id===this.resolvedCategory)?.label??this.resolvedCategory}get spacedQuery(){return this.query?.replace(/\+/g," ")??""}get searchLinksTemplate(){return p`
      <div id="search-links-area">
        <slot name="before-search-links"></slot>
        <div
          id="search-links"
          part="search-links"
          class=${this.useMobileView?"mobile":m}
        >
          <slot name="search-links-top"></slot>
          ${this.advancedSearchTemplate}
          <div id="search-links-end">
            <slot name="search-links"></slot>
          </div>
        </div>
      </div>
    `}get advancedSearchTemplate(){if(this.advancedSearchStyle!=="link")return m;const i=this.buildAdvancedSearchUrl(this.query??"");return i?p`<a
      id="advanced-search-link"
      part="advanced-search-link"
      href=${i}
      @click=${this.advancedSearchClicked}
    >
      ${N("Advanced Search")}
    </a>`:m}searchFieldCleared(){this.query&&this.emitSearchRequested()}handleSubmit(){this.emitSearchRequested()}handleCategorySelected(i){const t=i.detail.option.id;if(t===I.ADVANCED_SEARCH_OPTION_ID){this.navigateToAdvancedSearch();return}t!==this.resolvedCategory&&(this.selectedCategory=t,setTimeout(()=>this.searchInput.focus()),this.dispatchEvent(new CustomEvent(we.CategoryChanged,{detail:t})))}navigateToAdvancedSearch(){this.requestUpdate();const i=this.searchInput?.value??this.query??"",t=this.buildAdvancedSearchUrl(i);t&&(this.advancedSearchClicked(),window.location.href=t)}advancedSearchClicked(){this.dispatchEvent(new CustomEvent(we.AdvancedSearchClicked))}emitSearchRequested(){this.dispatchEvent(new CustomEvent(we.SearchRequested,{detail:{query:this.searchInput.value,category:this.resolvedCategory}}))}static get styles(){const i=B`
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
        margin-bottom: 10px;
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
        font-size: inherit;
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

      #search-links-area {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-top: 5px;
        font-size: inherit;
      }

      #search-links {
        display: flex;
        column-gap: 10px;
        width: 100%;
      }

      #search-links > a:not(:last-child) {
        margin-bottom: 2px;
      }

      #advanced-search-link {
        margin-left: auto;
        padding-left: 5px;
      }

      #search-links-end {
        display: contents;
      }

      .mobile #advanced-search-link {
        margin-left: 0;
      }

      .mobile #search-links-end {
        display: flex;
        margin-left: auto;
        column-gap: 10px;
      }

      a:link {
        text-decoration: none;
        display: block;
        flex: 0 1 auto;
        color: var(--ia-theme-link-color, #4b64ff);
        white-space: nowrap;
      }

      a:hover {
        text-decoration: underline;
      }

      a:visited {
        color: var(--ia-theme-link-color, #4b64ff);
      }

      ::slotted(#action-bar-spacing) {
        --iconLabelGutterWidth: 3px;
        margin-top: -4px; /* Better icon alignment */
        height: fit-content;
      }
    `;return[Y,i]}};I.ADVANCED_SEARCH_OPTION_ID="__advanced_search__";z([g({type:String})],I.prototype,"query",2);z([g({type:Array})],I.prototype,"categories",2);z([g({type:String})],I.prototype,"selectedCategory",2);z([g({type:String})],I.prototype,"navBaseUrl",2);z([g({type:String})],I.prototype,"advancedSearchStyle",2);z([g({type:String})],I.prototype,"placeholder",2);z([g({type:Boolean})],I.prototype,"useMobileView",2);z([g({type:Boolean})],I.prototype,"hideDropdown",2);z([g({type:Boolean})],I.prototype,"loading",2);z([$("#search-input")],I.prototype,"searchInput",2);I=z([O("ia-dropdown-search-bar")],I);var Nn=Object.defineProperty,jn=Object.getOwnPropertyDescriptor,M=(i,t,e,o)=>{for(var s=o>1?void 0:o?jn(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(s=(o?r(t,e,s):r(s))||s);return o&&s&&Nn(t,e,s),s};const Hn=[{label:"Bar height",cssVariable:"--ia-theme-search-bar-height",defaultValue:"30px",inputType:"text"},{label:"Bar width",cssVariable:"--ia-theme-search-bar-width",defaultValue:"300px",inputType:"text"},{label:"Internal padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"}],Vi=[{id:"all",label:"All"},{id:"texts",label:"Books/Documents"},{id:"fulltext",label:"Text Contents"},{id:"radio",label:"Radio"},{id:"tv",label:"TV"},{id:"movies",label:"Video"},{id:"audio",label:"Audio"},{id:"software",label:"Software"},{id:"image",label:"Images"},{id:"etree",label:"Live Music"},{id:"collection",label:"Collections"},{id:"data",label:"Data"},{id:"web",label:"Web Sites"}],Vn="all",zi="Search",zn="link";let T=class extends x{constructor(){super(...arguments),this.query="",this.selectedCategory=Vn,this.placeholder=zi,this.advancedSearchStyle=zn,this.hideDropdown=!1,this.loading=!1,this.announcerText=""}render(){return p`
      <story-template
        elementTag="ia-dropdown-search-bar"
        elementClassName="IADropdownSearchBar"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:Hn}}
      >
        <div slot="demo">
          <ia-dropdown-search-bar
            .navBaseUrl=${""}
            .query=${this.query}
            .categories=${Vi}
            .selectedCategory=${this.selectedCategory}
            .placeholder=${this.placeholder}
            .advancedSearchStyle=${this.advancedSearchStyle}
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
                  ${Fs(Vi,i=>p`<option value=${i.id}>
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
                  value=${zi}
                  id="settings__placeholder"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label for="settings__advanced-search-style"
                  >Advanced Search style</label
                >
              </td>
              <td>
                <select id="settings__advanced-search-style">
                  <option value="link" selected>Link</option>
                  <option value="dropdown">Dropdown option</option>
                  <option value="none">None</option>
                </select>
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
    `}get exampleUsage(){const{query:i,selectedCategory:t,placeholder:e,advancedSearchStyle:o,hideDropdown:s,loading:n}=this,r={query:i?`"${e}"`:"",selectedCategory:t?`"${t}"`:"",placeholder:e?`"${e}"`:"",advancedSearchStyle:o?`"${o}"`:"",hideDropdown:s,loading:n};return`
      <ia-dropdown-search-bar
        .categories=\${[
          { id: 'foo', label: 'Foo Option' },
          { id: 'bar', label: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(r).map(([a,d])=>d?d===!0?a:`${a}=${d}`:"").join(`
  `)}
      >
      </ia-dropdown-search-bar>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(i){i.preventDefault(),this.query=this.queryInput.value,this.selectedCategory=this.selectedCategorySelect.value,this.placeholder=this.placeholderInput.value,this.advancedSearchStyle=this.advancedSearchStyleSelect.value,this.hideDropdown=this.hideDropdownCheck.checked,this.loading=this.loadingCheck.checked}handleSearchRequested(i){this.announcerText=`Category ID "${i.detail.category}" / Query "${i.detail.query}"`}static get styles(){return B`
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
    `}};M([v()],T.prototype,"query",2);M([v()],T.prototype,"selectedCategory",2);M([v()],T.prototype,"placeholder",2);M([v()],T.prototype,"advancedSearchStyle",2);M([v()],T.prototype,"hideDropdown",2);M([v()],T.prototype,"loading",2);M([v()],T.prototype,"announcerText",2);M([$("#settings__query")],T.prototype,"queryInput",2);M([$("#settings__selected-category")],T.prototype,"selectedCategorySelect",2);M([$("#settings__placeholder")],T.prototype,"placeholderInput",2);M([$("#settings__advanced-search-style")],T.prototype,"advancedSearchStyleSelect",2);M([$("#settings__hide-dropdown")],T.prototype,"hideDropdownCheck",2);M([$("#settings__loading")],T.prototype,"loadingCheck",2);T=M([O("ia-dropdown-search-bar-story")],T);const Fn=Object.freeze(Object.defineProperty({__proto__:null,get IADropdownSearchBarStory(){return T}},Symbol.toStringTag,{value:"Module"}));var qn=Object.defineProperty,Kn=Object.getOwnPropertyDescriptor,lt=(i,t,e,o)=>{for(var s=o>1?void 0:o?Kn(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(s=(o?r(t,e,s):r(s))||s);return o&&s&&qn(t,e,s),s};const Wn={CodeSubmitted:"codeSubmitted"},Fi=/^[0-9]+$/,Gn=/^[a-zA-Z0-9]+$/;let G=class extends x{constructor(){super(...arguments),this.disabled=!1,this.numChars=6,this.numericOnly=!0,this.allowedChars=Fi}render(){return p`
      ${[...Array(this.numChars).keys()].map(i=>p`<input
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
    `}firstUpdated(){this.inputs[0].focus()}willUpdate(i){i.has("numericOnly")&&(this.allowedChars=this.numericOnly?Fi:Gn),i.has("prefillValue")&&this.prefillValue!==void 0&&(this.fillInputs(this.prefillValue),this.prefillValue=void 0)}handleInput(i){i.preventDefault();const t=i.target,e=i.data;if(!e)return;if(e.length>1){this.fillInputs(e);return}if(!this.allowedChars.test(e))return;t.value=e;const o=t.nextElementSibling;o&&o.focus(),this.submitIfInputsFilled()}handleKeydown(i){const t=i.target,e=i.key,o=t.previousElementSibling,s=t.nextElementSibling;switch(e){case"Backspace":case"Delete":if(i.preventDefault(),o&&o.focus(),t.value===""){o.value="";break}t.value="";break;case"Tab":t.select();break;case"ArrowRight":case"Right":i.preventDefault(),s&&s.focus();break;case"ArrowLeft":case"Left":i.preventDefault(),o&&o.focus();break}}handlePaste(i){i.preventDefault();const t=i.clipboardData?.getData("text");t&&this.fillInputs(t)}fillInputs(i){i===""&&this.clearInputs();const t=i.split("").filter(o=>this.allowedChars.test(o)).slice(0,this.numChars);if(!t||t.length===0)return;if(t.forEach((o,s)=>this.inputs[s].value=o),t.length===this.numChars){this.triggerSubmit(t.join("")),this.inputs[this.numChars-1].focus();return}this.inputs[t.length].focus()}clearInputs(){this.inputs.forEach(i=>i.value=""),this.inputs[0].focus()}submitIfInputsFilled(){const i=[];this.inputs.forEach(t=>{t.value&&i.push(t.value)}),i.length===this.numChars&&this.triggerSubmit(i.join(""))}triggerSubmit(i){this.dispatchEvent(new CustomEvent(Wn.CodeSubmitted,{detail:this.numericOnly?i:i.toUpperCase(),bubbles:!0,composed:!0}))}static get styles(){return[Y,B`
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
      `]}};lt([g({type:String})],G.prototype,"prefillValue",2);lt([g({type:Boolean})],G.prototype,"disabled",2);lt([g({type:Number})],G.prototype,"numChars",2);lt([g({type:Boolean})],G.prototype,"numericOnly",2);lt([g({type:Object})],G.prototype,"allowedChars",2);lt([We("input")],G.prototype,"inputs",2);G=lt([O("ia-otp-input")],G);var Zn=Object.getOwnPropertyDescriptor,Yn=(i,t,e,o)=>{for(var s=o>1?void 0:o?Zn(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(s=r(s)||s);return s};const Jn=[{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Font size",cssVariable:"--ia-theme-font-size-lg",defaultValue:"2.25rem",inputType:"text"}],Qn=[{label:"Number of characters",propertyName:"numChars",defaultValue:6,inputType:"number"},{label:"Numeric only",propertyName:"numericOnly",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Prefill value",propertyName:"prefillValue",defaultValue:""},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let Le=class extends x{render(){return p`
      <story-template
        elementTag="ia-otp-input"
        elementClassName="IAOTPInput"
        .styleInputData=${{settings:Jn}}
        .propInputData=${{settings:Qn}}
      >
        <ia-otp-input slot="demo"></ia-otp-input>
      </story-template>
    `}};Le=Yn([O("ia-otp-input-story")],Le);const Xn=Object.freeze(Object.defineProperty({__proto__:null,get IAOTPInputStory(){return Le}},Symbol.toStringTag,{value:"Module"}));var tr=Object.getOwnPropertyDescriptor,er=(i,t,e,o)=>{for(var s=o>1?void 0:o?tr(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(s=r(s)||s);return s};const ir=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"1.25rem"},{label:"Color - loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Color - success",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"},{label:"Color - error",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}],or=[{label:"Mode",propertyName:"mode",defaultValue:"loading",inputType:"radio",radioOptions:["loading","success","error"]},{label:"Accessible title - loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{label:"Loading style",propertyName:"loadingStyle",defaultValue:"ring-dots",inputType:"radio",radioOptions:["ring-dots","ring"]},{label:"Accessible title - success",propertyName:"successTitle",defaultValue:"Success"},{label:"Accessible title - error",propertyName:"errorTitle",defaultValue:"Error"}];let Ue=class extends x{render(){return p`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .styleInputData=${{settings:ir}}
        .propInputData=${{settings:or}}
      >
        <ia-status-indicator slot="demo"></ia-status-indicator>
      </story-template>
    `}};Ue=er([O("ia-status-indicator-story")],Ue);const sr=Object.freeze(Object.defineProperty({__proto__:null,get IAStatusIndicatorStory(){return Ue}},Symbol.toStringTag,{value:"Module"})),nr="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='36.283'%20height='36.283'%3e%3cpath%20d='M35.531%2017.391h-3.09l.845-1.464a.748.748%200%201%200-1.297-.75l-1.276%202.214H28.61l2.515-4.354a.751.751%200%200%200-.272-1.024.75.75%200%200%200-1.024.274l-2.948%205.104h-2.023a6.751%206.751%200%200%200-2.713-4.684l1.019-1.76%205.896-.002a.75.75%200%200%200%200-1.5l-5.029.002%201.051-1.82%202.557.002a.75.75%200%200%200%200-1.5l-1.689-.002%201.545-2.676a.75.75%200%201%200-1.302-.75l-1.547%202.676-.844-1.463a.749.749%200%201%200-1.297.75l1.278%202.213-1.051%201.818-2.514-4.354a.75.75%200%200%200-1.298.75l2.946%205.104-1.016%201.758a6.692%206.692%200%200%200-2.706-.57%206.74%206.74%200%200%200-2.707.568l-1.013-1.754%202.946-5.105a.75.75%200%200%200-1.298-.75L13.56%208.697l-1.05-1.818%201.278-2.217a.749.749%200%200%200-1.298-.75l-.845%201.465-1.551-2.678a.75.75%200%200%200-1.024-.273.748.748%200%200%200-.274%201.023l1.545%202.678H8.652a.75.75%200%200%200%200%201.5h2.556l1.05%201.818H7.231a.75.75%200%200%200%200%201.5h5.894l1.017%201.762a6.755%206.755%200%200%200-2.712%204.684H9.406l-2.95-5.104a.75.75%200%201%200-1.299.75l2.516%204.354H5.569l-1.277-2.213a.75.75%200%200%200-1.298.75l.845%201.463H.75a.75.75%200%200%200%200%201.5h3.09l-.845%201.465a.747.747%200%200%200%20.275%201.022.75.75%200%200%200%20.374.103.75.75%200%200%200%20.65-.375l1.277-2.215h2.103l-2.516%204.354a.75.75%200%200%200%201.299.75l2.949-5.104h2.024a6.761%206.761%200%200%200%202.712%204.685l-1.017%201.762H7.232a.75.75%200%200%200%200%201.5h5.026l-1.05%201.818H8.651a.75.75%200%200%200%200%201.5h1.69l-1.545%202.676a.75.75%200%200%200%201.299.75l1.546-2.676.846%201.465a.755.755%200%200%200%20.65.375.737.737%200%200%200%20.375-.103.747.747%200%200%200%20.274-1.022l-1.279-2.215%201.05-1.82%202.515%204.354a.75.75%200%200%200%201.299-.75l-2.947-5.104%201.013-1.756a6.72%206.72%200%200%200%205.415%200l1.014%201.756-2.947%205.104a.75.75%200%200%200%201.298.75l2.515-4.354%201.053%201.82-1.277%202.213a.75.75%200%200%200%201.298.75l.844-1.463%201.545%202.678c.141.24.393.375.65.375a.75.75%200%200%200%20.649-1.125l-1.548-2.678h1.689a.75.75%200%200%200%200-1.5h-2.557l-1.051-1.82%205.029.002a.75.75%200%200%200%200-1.5l-5.896-.002-1.019-1.76a6.75%206.75%200%200%200%202.711-4.685h2.023l2.947%205.104a.753.753%200%200%200%201.025.273.749.749%200%200%200%20.272-1.023l-2.515-4.354h2.104l1.279%202.215a.75.75%200%200%200%20.649.375c.127%200%20.256-.03.375-.103a.748.748%200%200%200%20.273-1.022l-.848-1.465h3.092a.75.75%200%200%200%20.003-1.5zm-12.136.75c0%20.257-.041.502-.076.75a5.223%205.223%200%200%201-1.943%203.358%205.242%205.242%200%200%201-1.291.766%205.224%205.224%200%200%201-1.949.384%205.157%205.157%200%200%201-3.239-1.15%205.22%205.22%200%200%201-1.943-3.358c-.036-.247-.076-.493-.076-.75s.04-.503.076-.75a5.22%205.22%200%200%201%201.944-3.359c.393-.312.82-.576%201.291-.765a5.219%205.219%200%200%201%201.948-.384c.69%200%201.344.142%201.948.384.471.188.898.454%201.291.765a5.222%205.222%200%200%201%201.943%203.359c.035.247.076.493.076.75z'%20fill=':color:'/%3e%3c/svg%3e",qi=new WeakSet;class rr extends ee{constructor(t){super(t)}update(t,[e,o]){return qi.has(t)||(e(),qi.add(t)),this.render(e,o)}render(t,e){return e()}}const Ki=te(rr);var ar=Object.defineProperty,lr=Object.getOwnPropertyDescriptor,ii=(i,t,e,o)=>{for(var s=o>1?void 0:o?lr(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(s=(o?r(t,e,s):r(s))||s);return o&&s&&ar(t,e,s),s};let Jt=class extends x{constructor(){super(...arguments),this.snowing=!1}render(){return p`
      ${this.startButtonTemplate} ${this.clearButtonTemplate}
      <img src=${nr} alt="Snowflakes icon" />
    `}willUpdate(i){i.has("snowConfig")&&(this.snowflakes?.destroy(),this.snowflakes=void 0,this.startSnowing())}get startButtonTemplate(){return Ki(async()=>{await Nt(()=>Promise.resolve().then(()=>ui),void 0,import.meta.url)},()=>p`
        <ia-button
          @click=${()=>{this.snowing?this.stopSnowing():this.startSnowing()}}
        >
          ${this.snowing?"Stop Snowflakes":"Start Snowflakes"}
        </ia-button>
      `)}get clearButtonTemplate(){return Ki(async()=>{await Nt(()=>Promise.resolve().then(()=>ui),void 0,import.meta.url)},()=>p`
        <ia-button
          @click=${()=>{this.snowflakes?.destroy()}}
        >
          Clear Snowflakes
        </ia-button>
      `)}async startSnowing(){if(!this.snowflakes){const t=(await Nt(()=>import("./snowflakes.esm-Dz_MTlsm.js"),[],import.meta.url)).default;this.snowflakes=new t(this.snowConfig)}this.snowflakes?.start(),this.snowing=!0}stopSnowing(){this.snowflakes?.stop(),this.snowing=!1}static get styles(){return B`
      img {
        width: 16px;
        filter: invert(1);
        vertical-align: middle;
      }
    `}};ii([g({type:Object})],Jt.prototype,"snowConfig",2);ii([v()],Jt.prototype,"snowing",2);Jt=ii([O("ia-snow")],Jt);var dr=Object.defineProperty,cr=Object.getOwnPropertyDescriptor,St=(i,t,e,o)=>{for(var s=o>1?void 0:o?cr(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(s=(o?r(t,e,s):r(s))||s);return o&&s&&dr(t,e,s),s};let Z=class extends x{render(){return p`
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
    `:"<ia-snow></ia-snow>"}get configString(){return JSON.stringify(this.config,null,2)}get snowflakeConfig(){return{color:this.colorInput.value,count:Number(this.countInput.value),wind:this.windInput.checked,rotation:this.rotationInput.checked}}setupSnowflakes(){this.config=this.snowflakeConfig}static get styles(){return B`
      fieldset {
        margin-top: 16px;
      }
    `}};St([v()],Z.prototype,"config",2);St([$("#count")],Z.prototype,"countInput",2);St([$("#wind")],Z.prototype,"windInput",2);St([$("#rotation")],Z.prototype,"rotationInput",2);St([$("#color")],Z.prototype,"colorInput",2);Z=St([O("ia-snow-story")],Z);const hr=Object.freeze(Object.defineProperty({__proto__:null,get IASnowStory(){return Z}},Symbol.toStringTag,{value:"Module"}));var pr=Object.getOwnPropertyDescriptor,ur=(i,t,e,o)=>{for(var s=o>1?void 0:o?pr(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(s=r(s)||s);return s};const gr=Object.assign({"../src/elements/ia-button/ia-button-story.ts":us,"../src/elements/ia-combo-box/ia-combo-box-story.ts":zs,"../src/elements/ia-dropdown-search-bar/ia-dropdown-search-bar-story.ts":Fn,"../src/elements/ia-otp-input/ia-otp-input-story.ts":Xn,"../src/elements/ia-status-indicator/ia-status-indicator-story.ts":sr,"../src/labs/ia-snow/ia-snow-story.ts":hr}),So=Object.keys(gr).map(i=>{const t=i.includes("/src/labs/"),e=i.split("/"),s=e[e.length-1].replace(/-story\.ts$/,"");return{tag:s,storyTag:`${s}-story`,id:`elem-${s}`,labs:t}}).sort((i,t)=>i.tag.localeCompare(t.tag)),Me=So.filter(i=>!i.labs),Ne=So.filter(i=>i.labs),fr=[...Me,...Ne];let Wi=class extends x{constructor(){super(...arguments),this._abortController=new AbortController}createRenderRoot(){return this}render(){return p`
      <nav id="ia-sidebar">
        <h2>Production-Ready</h2>
        ${Me.map(i=>p`<a href="#${i.id}">&lt;${i.tag}&gt;</a>`)}
        <h2>Labs 🧪</h2>
        ${Ne.map(i=>p`<a href="#${i.id}">&lt;${i.tag}&gt;</a>`)}
      </nav>
      <div id="ia-content">
        <h1>Internet Archive Elements</h1>
        <h2>Production-Ready Elements</h2>
        ${Me.map(i=>p`
          <div id="${i.id}" class="ia-anchor">
            ${Ce(`<${i.storyTag}></${i.storyTag}>`)}
          </div>
        `)}
        <h2>Labs Elements</h2>
        ${Ne.map(i=>p`
          <div id="${i.id}" class="ia-anchor">
            ${Ce(`<${i.storyTag}></${i.storyTag}>`)}
          </div>
        `)}
      </div>
    `}firstUpdated(){const i=fr.map(o=>o.id),t=Object.fromEntries(i.map(o=>[o,this.querySelector(`#ia-sidebar a[href="#${o}"]`)])),e=new Set;this._observer=new IntersectionObserver(o=>{for(const n of o)n.isIntersecting?e.add(n.target.id):e.delete(n.target.id);const s=i.find(n=>e.has(n))??i[0];i.forEach(n=>t[n]?.classList.toggle("active",n===s))},{rootMargin:"0px 0px -70% 0px"}),i.forEach(o=>{const s=document.getElementById(o);s&&this._observer.observe(s)}),i.forEach(o=>{t[o]?.addEventListener("click",s=>{s.preventDefault();const n=document.getElementById(o);if(n){const r=n.getBoundingClientRect().top+window.scrollY;window.scrollTo({top:Math.max(0,r-16),behavior:"smooth"})}},{signal:this._abortController.signal})})}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._abortController.abort()}};Wi=ur([O("app-root")],Wi);
