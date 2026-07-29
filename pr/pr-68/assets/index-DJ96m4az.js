(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=o(i);fetch(i.href,r)}})();const me=globalThis,ze=me.ShadowRoot&&(me.ShadyCSS===void 0||me.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ue=Symbol(),Qe=new WeakMap;let xt=class{constructor(e,o,a){if(this._$cssResult$=!0,a!==Ue)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o;const o=this.t;if(ze&&e===void 0){const a=o!==void 0&&o.length===1;a&&(e=Qe.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&Qe.set(o,e))}return e}toString(){return this.cssText}};const Bt=t=>new xt(typeof t=="string"?t:t+"",void 0,Ue),b=(t,...e)=>{const o=t.length===1?t[0]:e.reduce(((a,i,r)=>a+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1]),t[0]);return new xt(o,t,Ue)},Vt=(t,e)=>{if(ze)t.adoptedStyleSheets=e.map((o=>o instanceof CSSStyleSheet?o:o.styleSheet));else for(const o of e){const a=document.createElement("style"),i=me.litNonce;i!==void 0&&a.setAttribute("nonce",i),a.textContent=o.cssText,t.appendChild(a)}},Xe=ze?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(const a of e.cssRules)o+=a.cssText;return Bt(o)})(t):t;const{is:Dt,defineProperty:Lt,getOwnPropertyDescriptor:Rt,getOwnPropertyNames:jt,getOwnPropertySymbols:Nt,getPrototypeOf:Mt}=Object,Se=globalThis,et=Se.trustedTypes,zt=et?et.emptyScript:"",Ut=Se.reactiveElementPolyfillSupport,le=(t,e)=>t,ye={toAttribute(t,e){switch(e){case Boolean:t=t?zt:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},Fe=(t,e)=>!Dt(t,e),tt={attribute:!0,type:String,converter:ye,reflect:!1,useDefault:!1,hasChanged:Fe};Symbol.metadata??=Symbol("metadata"),Se.litPropertyMetadata??=new WeakMap;let oe=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=tt){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){const a=Symbol(),i=this.getPropertyDescriptor(e,a,o);i!==void 0&&Lt(this.prototype,e,i)}}static getPropertyDescriptor(e,o,a){const{get:i,set:r}=Rt(this.prototype,e)??{get(){return this[o]},set(n){this[o]=n}};return{get:i,set(n){const d=i?.call(this);r?.call(this,n),this.requestUpdate(e,d,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??tt}static _$Ei(){if(this.hasOwnProperty(le("elementProperties")))return;const e=Mt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(le("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(le("properties"))){const o=this.properties,a=[...jt(o),...Nt(o)];for(const i of a)this.createProperty(i,o[i])}const e=this[Symbol.metadata];if(e!==null){const o=litPropertyMetadata.get(e);if(o!==void 0)for(const[a,i]of o)this.elementProperties.set(a,i)}this._$Eh=new Map;for(const[o,a]of this.elementProperties){const i=this._$Eu(o,a);i!==void 0&&this._$Eh.set(i,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const o=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const i of a)o.unshift(Xe(i))}else e!==void 0&&o.push(Xe(e));return o}static _$Eu(e,o){const a=o.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,o=this.constructor.elementProperties;for(const a of o.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Vt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,o,a){this._$AK(e,a)}_$ET(e,o){const a=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,a);if(i!==void 0&&a.reflect===!0){const r=(a.converter?.toAttribute!==void 0?a.converter:ye).toAttribute(o,a.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,o){const a=this.constructor,i=a._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const r=a.getPropertyOptions(i),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:ye;this._$Em=i;const d=n.fromAttribute(o,r.type);this[i]=d??this._$Ej?.get(i)??d,this._$Em=null}}requestUpdate(e,o,a){if(e!==void 0){const i=this.constructor,r=this[e];if(a??=i.getPropertyOptions(e),!((a.hasChanged??Fe)(r,o)||a.useDefault&&a.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,a))))return;this.C(e,o,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:a,reflect:i,wrapped:r},n){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??o??this[e]),r!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(o=void 0),this._$AL.set(e,o)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[i,r]of a){const{wrapped:n}=r,d=this[i];n!==!0||this._$AL.has(i)||d===void 0||this.C(i,void 0,r,d)}}let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach((a=>a.hostUpdate?.())),this.update(o)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach((o=>o.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((o=>this._$ET(o,this[o]))),this._$EM()}updated(e){}firstUpdated(e){}};oe.elementStyles=[],oe.shadowRootOptions={mode:"open"},oe[le("elementProperties")]=new Map,oe[le("finalized")]=new Map,Ut?.({ReactiveElement:oe}),(Se.reactiveElementVersions??=[]).push("2.1.1");const He=globalThis,ve=He.trustedTypes,ot=ve?ve.createPolicy("lit-html",{createHTML:t=>t}):void 0,$t="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,_t="?"+q,Ft=`<${_t}>`,Q=document,de=()=>Q.createComment(""),ce=t=>t===null||typeof t!="object"&&typeof t!="function",qe=Array.isArray,Ht=t=>qe(t)||typeof t?.[Symbol.iterator]=="function",Ae=`[ 	
\f\r]`,se=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,it=/-->/g,at=/>/g,Z=RegExp(`>|${Ae}(?:([^\\s"'>=/]+)(${Ae}*=${Ae}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),rt=/'/g,nt=/"/g,St=/^(?:script|style|textarea|title)$/i,Ct=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),s=Ct(1),qt=Ct(2),V=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),st=new WeakMap,Y=Q.createTreeWalker(Q,129);function Tt(t,e){if(!qe(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ot!==void 0?ot.createHTML(e):e}const Kt=(t,e)=>{const o=t.length-1,a=[];let i,r=e===2?"<svg>":e===3?"<math>":"",n=se;for(let d=0;d<o;d++){const c=t[d];let y,g,u=-1,T=0;for(;T<c.length&&(n.lastIndex=T,g=n.exec(c),g!==null);)T=n.lastIndex,n===se?g[1]==="!--"?n=it:g[1]!==void 0?n=at:g[2]!==void 0?(St.test(g[2])&&(i=RegExp("</"+g[2],"g")),n=Z):g[3]!==void 0&&(n=Z):n===Z?g[0]===">"?(n=i??se,u=-1):g[1]===void 0?u=-2:(u=n.lastIndex-g[2].length,y=g[1],n=g[3]===void 0?Z:g[3]==='"'?nt:rt):n===nt||n===rt?n=Z:n===it||n===at?n=se:(n=Z,i=void 0);const O=n===Z&&t[d+1].startsWith("/>")?" ":"";r+=n===se?c+Ft:u>=0?(a.push(y),c.slice(0,u)+$t+c.slice(u)+q+O):c+q+(u===-2?d:O)}return[Tt(t,r+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]};class pe{constructor({strings:e,_$litType$:o},a){let i;this.parts=[];let r=0,n=0;const d=e.length-1,c=this.parts,[y,g]=Kt(e,o);if(this.el=pe.createElement(y,a),Y.currentNode=this.el.content,o===2||o===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=Y.nextNode())!==null&&c.length<d;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith($t)){const T=g[n++],O=i.getAttribute(u).split(q),M=/([.?@])?(.*)/.exec(T);c.push({type:1,index:r,name:M[2],strings:O,ctor:M[1]==="."?Gt:M[1]==="?"?Zt:M[1]==="@"?Yt:Ce}),i.removeAttribute(u)}else u.startsWith(q)&&(c.push({type:6,index:r}),i.removeAttribute(u));if(St.test(i.tagName)){const u=i.textContent.split(q),T=u.length-1;if(T>0){i.textContent=ve?ve.emptyScript:"";for(let O=0;O<T;O++)i.append(u[O],de()),Y.nextNode(),c.push({type:2,index:++r});i.append(u[T],de())}}}else if(i.nodeType===8)if(i.data===_t)c.push({type:2,index:r});else{let u=-1;for(;(u=i.data.indexOf(q,u+1))!==-1;)c.push({type:7,index:r}),u+=q.length-1}r++}}static createElement(e,o){const a=Q.createElement("template");return a.innerHTML=e,a}}function ie(t,e,o=t,a){if(e===V)return e;let i=a!==void 0?o._$Co?.[a]:o._$Cl;const r=ce(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(t),i._$AT(t,o,a)),a!==void 0?(o._$Co??=[])[a]=i:o._$Cl=i),i!==void 0&&(e=ie(t,i._$AS(t,e.values),i,a)),e}class Wt{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:o},parts:a}=this._$AD,i=(e?.creationScope??Q).importNode(o,!0);Y.currentNode=i;let r=Y.nextNode(),n=0,d=0,c=a[0];for(;c!==void 0;){if(n===c.index){let y;c.type===2?y=new ge(r,r.nextSibling,this,e):c.type===1?y=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(y=new Jt(r,this,e)),this._$AV.push(y),c=a[++d]}n!==c?.index&&(r=Y.nextNode(),n++)}return Y.currentNode=Q,i}p(e){let o=0;for(const a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,o),o+=a.strings.length-2):a._$AI(e[o])),o++}}class ge{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,a,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=a,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=ie(this,e,o),ce(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==V&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ht(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&ce(this._$AH)?this._$AA.nextSibling.data=e:this.T(Q.createTextNode(e)),this._$AH=e}$(e){const{values:o,_$litType$:a}=e,i=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=pe.createElement(Tt(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===i)this._$AH.p(o);else{const r=new Wt(i,this),n=r.u(this.options);r.p(o),this.T(n),this._$AH=r}}_$AC(e){let o=st.get(e.strings);return o===void 0&&st.set(e.strings,o=new pe(e)),o}k(e){qe(this._$AH)||(this._$AH=[],this._$AR());const o=this._$AH;let a,i=0;for(const r of e)i===o.length?o.push(a=new ge(this.O(de()),this.O(de()),this,this.options)):a=o[i],a._$AI(r),i++;i<o.length&&(this._$AR(a&&a._$AB.nextSibling,i),o.length=i)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){const a=e.nextSibling;e.remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Ce{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,a,i,r){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=o,this._$AM=i,this.options=r,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=h}_$AI(e,o=this,a,i){const r=this.strings;let n=!1;if(r===void 0)e=ie(this,e,o,0),n=!ce(e)||e!==this._$AH&&e!==V,n&&(this._$AH=e);else{const d=e;let c,y;for(e=r[0],c=0;c<r.length-1;c++)y=ie(this,d[a+c],o,c),y===V&&(y=this._$AH[c]),n||=!ce(y)||y!==this._$AH[c],y===h?e=h:e!==h&&(e+=(y??"")+r[c+1]),this._$AH[c]=y}n&&!i&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Gt extends Ce{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class Zt extends Ce{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class Yt extends Ce{constructor(e,o,a,i,r){super(e,o,a,i,r),this.type=5}_$AI(e,o=this){if((e=ie(this,e,o,0)??h)===V)return;const a=this._$AH,i=e===h&&a!==h||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,r=e!==h&&(a===h||i);i&&this.element.removeEventListener(this.name,this,a),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Jt{constructor(e,o,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){ie(this,e)}}const Qt=He.litHtmlPolyfillSupport;Qt?.(pe,ge),(He.litHtmlVersions??=[]).push("3.3.1");const Ot=(t,e,o)=>{const a=o?.renderBefore??e;let i=a._$litPart$;if(i===void 0){const r=o?.renderBefore??null;a._$litPart$=i=new ge(e.insertBefore(de(),r),r,void 0,o??{})}return i._$AI(t),i};const Ke=globalThis;let f=class extends oe{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ot(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};f._$litElement$=!0,f.finalized=!0,Ke.litElementHydrateSupport?.({LitElement:f});const Xt=Ke.litElementPolyfillSupport;Xt?.({LitElement:f});(Ke.litElementVersions??=[]).push("4.2.1");const w=t=>(e,o)=>{o!==void 0?o.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};const eo={attribute:!0,type:String,converter:ye,reflect:!1,hasChanged:Fe},to=(t=eo,e,o)=>{const{kind:a,metadata:i}=o;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),a==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(o.name,t),a==="accessor"){const{name:n}=o;return{set(d){const c=e.get.call(this);e.set.call(this,d),this.requestUpdate(n,c,t)},init(d){return d!==void 0&&this.C(n,void 0,t,d),d}}}if(a==="setter"){const{name:n}=o;return function(d){const c=this[n];e.call(this,d),this.requestUpdate(n,c,t)}}throw Error("Unsupported decorator location: "+a)};function l(t){return(e,o)=>typeof o=="object"?to(t,e,o):((a,i,r)=>{const n=i.hasOwnProperty(r);return i.constructor.createProperty(r,a),n?Object.getOwnPropertyDescriptor(i,r):void 0})(t,e,o)}function p(t){return l({...t,state:!0,attribute:!1})}const We=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);function m(t,e){return(o,a,i)=>{const r=n=>n.renderRoot?.querySelector(t)??null;return We(o,a,{get(){return r(this)}})}}let oo;function Ge(t){return(e,o)=>We(e,o,{get(){return(this.renderRoot??(oo??=document.createDocumentFragment())).querySelectorAll(t)}})}function io(t){return(e,o)=>{const{slot:a,selector:i}=t??{},r="slot"+(a?`[name=${a}]`:":not([name])");return We(e,o,{get(){const n=this.renderRoot?.querySelector(r),d=n?.assignedElements(t)??[];return i===void 0?d:d.filter((c=>c.matches(i)))}})}}function B(t,e,o){return t?e(t):o?.(t)}const J=t=>t??h,ao="modulepreload",ro=function(t,e){return new URL(t,e).href},lt={},be=function(e,o,a){let i=Promise.resolve();if(o&&o.length>0){let y=function(g){return Promise.all(g.map(u=>Promise.resolve(u).then(T=>({status:"fulfilled",value:T}),T=>({status:"rejected",reason:T}))))};const n=document.getElementsByTagName("link"),d=document.querySelector("meta[property=csp-nonce]"),c=d?.nonce||d?.getAttribute("nonce");i=y(o.map(g=>{if(g=ro(g,a),g in lt)return;lt[g]=!0;const u=g.endsWith(".css"),T=u?'[rel="stylesheet"]':"";if(a)for(let M=n.length-1;M>=0;M--){const fe=n[M];if(fe.href===g&&(!u||fe.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${g}"]${T}`))return;const O=document.createElement("link");if(O.rel=u?"stylesheet":ao,u||(O.as="script"),O.crossOrigin="",O.href=g,c&&O.setAttribute("nonce",c),document.head.appendChild(O),u)return new Promise((M,fe)=>{O.addEventListener("load",M),O.addEventListener("error",()=>fe(new Error(`Unable to preload CSS for ${g}`)))})}))}function r(n){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=n,window.dispatchEvent(d),!d.defaultPrevented)throw n}return i.then(n=>{for(const d of n||[])d.status==="rejected"&&r(d.reason);return e().catch(r)})};const H={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Te=t=>(...e)=>({_$litDirective$:t,values:e});class Oe{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,a){this._$Ct=e,this._$AM=o,this._$Ci=a}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}}let Ee=class extends Oe{constructor(e){if(super(e),this.it=h,e.type!==H.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===h||e==null)return this._t=void 0,this.it=e;if(e===V)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const o=[e];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};Ee.directiveName="unsafeHTML",Ee.resultType=1;const he=Te(Ee),no=b`
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
`;var so=Object.defineProperty,lo=Object.getOwnPropertyDescriptor,ke=(t,e,o,a)=>{for(var i=a>1?void 0:a?lo(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&so(e,o,i),i};let ue=class extends f{constructor(){super(...arguments),this.code="",this.language="auto",this.highlightedCode=""}willUpdate(t){(t.has("code")||t.has("language"))&&this.highlightCode()}render(){return s`
      <pre><code class="hljs">${he(this.highlightedCode)}</code></pre>
    `}async highlightCode(){const e=(await be(()=>import("./index-BBc-AmEf.js"),[],import.meta.url)).default,o=this.code.trim();let a;this.language==="auto"?a=e.highlightAuto(o).value:a=e.highlight(o,{language:this.language}).value,this.highlightedCode=a}static get styles(){return[no]}};ke([l({type:String})],ue.prototype,"code",2);ke([l({type:String})],ue.prototype,"language",2);ke([p()],ue.prototype,"highlightedCode",2);ue=ke([w("syntax-highlighter")],ue);const L=b`
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
`,co="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='36pt'%20height='36pt'%20viewBox='0%200%2036%2036'%20version='1.1'%3e%3cg%20id='surface35'%3e%3cpath%20style='%20stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;'%20d='M%2013.5%206.1875%20C%2012.878906%206.1875%2012.375%206.691406%2012.375%207.3125%20C%2012.375%207.933594%2012.878906%208.4375%2013.5%208.4375%20L%2014.0625%208.4375%20L%2014.0625%2013.523438%20C%2014.0625%2014.453125%2013.78125%2015.34375%2013.246094%2016.105469%20L%206.84375%2025.238281%20C%206.140625%2026.238281%206.054688%2027.535156%206.621094%2028.617188%20C%207.183594%2029.703125%208.292969%2030.375%209.515625%2030.375%20L%2026.484375%2030.375%20C%2027.707031%2030.375%2028.816406%2029.703125%2029.378906%2028.617188%20C%2029.941406%2027.535156%2029.859375%2026.238281%2029.15625%2025.238281%20L%2022.753906%2016.105469%20C%2022.21875%2015.34375%2021.9375%2014.453125%2021.9375%2013.523438%20L%2021.9375%208.4375%20L%2022.5%208.4375%20C%2023.121094%208.4375%2023.625%207.933594%2023.625%207.3125%20C%2023.625%206.691406%2023.121094%206.1875%2022.5%206.1875%20Z%20M%2016.3125%208.4375%20L%2019.6875%208.4375%20L%2019.6875%2013.523438%20C%2019.6875%2014.914062%2020.109375%2016.257812%2020.910156%2017.398438%20L%2020.941406%2017.4375%20L%2015.0625%2017.4375%20L%2015.089844%2017.398438%20C%2015.890625%2016.257812%2016.3125%2014.914062%2016.3125%2013.523438%20Z%20M%2015.1875%2020.8125%20C%2015.808594%2020.8125%2016.3125%2021.316406%2016.3125%2021.9375%20C%2016.3125%2022.558594%2015.808594%2023.0625%2015.1875%2023.0625%20C%2014.566406%2023.0625%2014.0625%2022.558594%2014.0625%2021.9375%20C%2014.0625%2021.316406%2014.566406%2020.8125%2015.1875%2020.8125%20Z%20M%2020.53125%2023.0625%20C%2021.617188%2023.0625%2022.5%2023.945312%2022.5%2025.03125%20C%2022.5%2026.117188%2021.617188%2027%2020.53125%2027%20C%2019.445312%2027%2018.5625%2026.117188%2018.5625%2025.03125%20C%2018.5625%2023.945312%2019.445312%2023.0625%2020.53125%2023.0625%20Z%20M%2020.53125%2023.0625%20'/%3e%3c/g%3e%3c/svg%3e";function Ie(t){return t.toLowerCase().split(" ").join("-")}var po=Object.defineProperty,ho=Object.getOwnPropertyDescriptor,Ze=(t,e,o,a)=>{for(var i=a>1?void 0:a?ho(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&po(e,o,i),i};let we=class extends f{render(){return this.styleInputData?s`
      <div class="settings-options">
        <table>
          ${this.styleInputData.settings.map(t=>this.renderStyleRow(t))}
        </table>
        <button @click=${this.applyStyles}>Apply</button>
      </div>
    `:h}renderStyleRow(t){const e=Ie(t.label),o=t.inputType==="number"||t.inputType==="range";return s`
      <tr>
        <td>
          <label for=${e}>${t.label}</label>
        </td>
        <td class="style-input-cell">
          <input
            id=${e}
            class="style-input"
            type=${t.inputType??"text"}
            min=${J(o?t.min:void 0)}
            max=${J(o?t.max:void 0)}
            step=${J(o?t.step:void 0)}
            value=${t.defaultValue}
            data-variable=${t.cssVariable}
            data-unit=${J(t.unit)}
            @input=${t.inputType==="range"?this.updateRangeReadout:void 0}
          />
          ${t.inputType==="range"?s`<output class="style-readout" for=${e}
                >${t.defaultValue}${t.unit??""}</output
              >`:h}
        </td>
      </tr>
    `}updateRangeReadout(t){const e=t.currentTarget,o=this.renderRoot.querySelector(`output[for="${CSS.escape(e.id)}"]`);if(!o)return;const a=e.dataset.unit??"";o.textContent=`${e.value}${a}`}applyStyles(){const t=[];this.styleInputs?.forEach(e=>{if(!e.dataset.variable||!e.value)return;const o=e.dataset.unit??"";t.push(`${e.dataset.variable}: ${e.value}${o};`)}),this.dispatchEvent(new CustomEvent("stylesApplied",{detail:{styles:t.join(`
 `)}}))}static get styles(){return[L,b`
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
      `]}};Ze([l({type:Object})],we.prototype,"styleInputData",2);Ze([Ge(".style-input")],we.prototype,"styleInputs",2);we=Ze([w("story-styles-settings")],we);const kt=(t,e,o)=>{for(const a of e)if(a[0]===t)return(0,a[1])();return o?.()};var uo=Object.defineProperty,go=Object.getOwnPropertyDescriptor,Ye=(t,e,o,a)=>{for(var i=a>1?void 0:a?go(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&uo(e,o,i),i};let xe=class extends f{render(){return this.propInputData?s`
      <div class="settings-options">
        <table>
          ${this.propInputData.settings.map(t=>kt(t.inputType,[["radio",()=>this.createRadioPropInput(t)]],()=>this.createDefaultPropInput(t))??h)}
        </table>
        <button @click=${this.applyProps}>Apply</button>
      </div>
    `:h}createDefaultPropInput(t){const e=Ie(t.label);return s`
      <tr>
        <td><label for=${e}>${t.label}</label></td>
        <td>
          <input
            class="prop-input"
            type=${t.inputType??"text"}
            id=${e}
            data-prop=${t.propertyName}
            data-format=${typeof t.defaultValue}
            placeholder=${t.defaultValue}
          />
        </td>
      </tr>
    `}createRadioPropInput(t){if(t.inputType!=="radio"||!t.radioOptions)return h;const e=Ie(t.label);return s`
      <tr>
        <td><legend>${t.label}</legend></td>
        <td>
          ${t.radioOptions.map(o=>s`<input
                  type="radio"
                  class="prop-input"
                  name=${e}
                  id="${e}-${o}"
                  value=${o}
                  data-prop=${t.propertyName}
                  data-format=${typeof t.defaultValue}
                  ?checked=${t.defaultValue===o}
                /><label for="${e}-${o}"> ${o} </label>`)}
        </td>
      </tr>
    `}applyProps(){const t=[],e=[];this.propInputs?.forEach(o=>{if(!o.dataset.prop||!o.value||o.type==="radio"&&!o.checked)return;const a=o.dataset.prop;let i=o.value;switch(o.dataset.format){case"number":i=parseInt(i);break;case"boolean":i==="true"&&(i=!0),i==="false"&&(i=!1);break}const r=typeof i=="string"?`'${i}'`:i.toString();t.push(`.${a}=\${${r}}`),e.push({propName:a,value:i})}),this.dispatchEvent(new CustomEvent("propsApplied",{detail:{stringifiedProps:t.join(`
  `),appliedProps:e}}))}static get styles(){return[L,b`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }
      `]}};Ye([l({type:Object})],xe.prototype,"propInputData",2);Ye([Ge(".prop-input")],xe.prototype,"propInputs",2);xe=Ye([w("story-props-settings")],xe);var fo=Object.defineProperty,mo=Object.getOwnPropertyDescriptor,A=(t,e,o,a)=>{for(var i=a>1?void 0:a?mo(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&fo(e,o,i),i};let k=class extends f{constructor(){super(...arguments),this.elementTag="",this.elementClassName="",this.labs=!1,this.detailsVisible=!1,this.shouldShowPropertySettings=!1,this.shouldShowUsageNotes=!1,this.copiedKey=null}render(){return s`
      <div id="container">
        <h2>
          <code>&lt;${this.elementTag}&gt;</code>
          ${B(this.labs,()=>s`<img
                src=${co}
                alt="Labs icon"
                title="Labs"
                class="labs-icon"
              />`)}
        </h2>
        <h3>Demo</h3>
        <div class="slot-container" style=${J(this.stringifiedStyles)}>
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
    `}get detailsTemplate(){return s`
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
      ${B(this.cssCode,()=>s`
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
          ${B(!!this.propInputData,()=>s`
              <story-props-settings
                .propInputData=${this.propInputData}
                @propsApplied=${this.handlePropsApplied}
              ></story-props-settings>
            `)}
          ${B(!this.propInputData&&!this.shouldShowPropertySettings,()=>s`<p class="section-placeholder">No settings to adjust</p>`)}
          <div
            class="slot-container ${this.shouldShowPropertySettings?"":"hidden"}"
            @slotchange=${this.handleSettingsSlotChange}
          >
            <slot name="settings"></slot>
          </div>
        </div>
        <div class="right-col">
          <h3>Styles</h3>
          ${B(!!this.styleInputData,()=>s`
              <story-styles-settings
                .styleInputData=${this.styleInputData}
                @stylesApplied=${this.handleStylesApplied}
              ></story-styles-settings>
            `,()=>s`<p class="section-placeholder">No styles to adjust</p>`)}
        </div>
      </div>
      ${B(this.shouldShowUsageNotes,()=>s` <h3>Usage Notes</h3>`)}
      <div class="slot-container">
        <slot
          name="usage-notes"
          @slotchange=${this.handleUsageNotesSlotChange}
        ></slot>
      </div>
    `}async copyToClipboard(t,e){try{await navigator.clipboard.writeText(t),this.copiedKey=e,clearTimeout(this._copyTimeout),this._copyTimeout=setTimeout(()=>this.copiedKey=null,2e3)}catch(o){console.warn("Clipboard write failed:",o)}}get importCode(){return this.elementClassName?`import '${this.modulePath}';
import { ${this.elementClassName} } from '${this.modulePath}';`:`import '${this.modulePath}';`}get exampleUsage(){const t=this.defaultUsageProps?"  "+this.defaultUsageProps+`
`:"",e=this.stringifiedProps?"  "+this.stringifiedProps+`
`:"",o=!!t||!!e,a=this.defaultSlottedContent&&o?`
 `+this.defaultSlottedContent+`
`:this.defaultSlottedContent;return`<${this.elementTag}${o?`
`:""}${t}${e}>${a??""}</${this.elementTag}>`}get cssCode(){return this.stringifiedStyles?`${this.elementTag} {
 ${this.stringifiedStyles}
}`:""}get modulePath(){return this.labs?`@internetarchive/elements/labs/${this.elementTag}/${this.elementTag}`:`@internetarchive/elements/${this.elementTag}/${this.elementTag}`}handleSettingsSlotChange(t){const e=t.target.assignedElements();this.shouldShowPropertySettings=e.length>0}handleUsageNotesSlotChange(t){const e=t.target.assignedElements();this.shouldShowUsageNotes=e.length>0}handleDemoComponentSlotted(t){const e=t.target.assignedElements()[0];e&&(this.slottedDemoComponent=e)}handleStylesApplied(t){const e=t.detail.styles;e&&(this.stringifiedStyles=e)}handlePropsApplied(t){const e=t.detail.stringifiedProps,o=t.detail.appliedProps;!e||!o||(this.stringifiedProps=e,o.forEach(a=>{this.slottedDemoComponent[a.propName]=a.value}))}static get styles(){return[L,b`
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
      `]}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._copyTimeout)}};A([l({type:String})],k.prototype,"elementTag",2);A([l({type:String})],k.prototype,"elementClassName",2);A([l({type:String})],k.prototype,"customExampleUsage",2);A([l({type:String})],k.prototype,"defaultUsageProps",2);A([l({type:String})],k.prototype,"defaultSlottedContent",2);A([l({type:Object})],k.prototype,"styleInputData",2);A([l({type:Object})],k.prototype,"propInputData",2);A([l({type:Boolean})],k.prototype,"labs",2);A([p()],k.prototype,"detailsVisible",2);A([p()],k.prototype,"stringifiedStyles",2);A([p()],k.prototype,"stringifiedProps",2);A([p()],k.prototype,"shouldShowPropertySettings",2);A([p()],k.prototype,"shouldShowUsageNotes",2);A([p()],k.prototype,"slottedDemoComponent",2);A([p()],k.prototype,"copiedKey",2);k=A([w("story-template")],k);const bo=t=>typeof t!="string"&&"strTag"in t,yo=(t,e,o)=>{let a=t[0];for(let i=1;i<t.length;i++)a+=e[i-1],a+=t[i];return a};const vo=(t=>bo(t)?yo(t.strings,t.values):t);let P=vo;class wo{constructor(){this.settled=!1,this.promise=new Promise((e,o)=>{this._resolve=e,this._reject=o})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}for(let t=0;t<256;t++)(t>>4&15).toString(16)+(t&15).toString(16);let xo=new wo;xo.resolve();var $o=Object.defineProperty,_o=Object.getOwnPropertyDescriptor,ae=(t,e,o,a)=>{for(var i=a>1?void 0:a?_o(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&$o(e,o,i),i};let X=class extends f{constructor(){super(...arguments),this.loadingTitle=P("Loading..."),this.successTitle=P("Success"),this.errorTitle=P("Error"),this.loadingStyle="ring-dots",this.mode="loading"}render(){return s`${kt(this.mode,[["ready",()=>this.placeholderTemplate],["loading",()=>this.loadingIndicatorTemplate],["success",()=>this.successIndicatorTemplate],["error",()=>this.errorIndicatorTemplate]])}`}get placeholderTemplate(){return s`<div class="placeholder"></div>`}get loadingIndicatorTemplate(){return s`
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
    `}get successIndicatorTemplate(){return s`
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
    `}get errorIndicatorTemplate(){return s`
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
    `}get shouldShowLoadingDots(){return this.loadingStyle!=="ring"}static get styles(){return[L,b`
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
      `]}};ae([l({type:String})],X.prototype,"loadingTitle",2);ae([l({type:String})],X.prototype,"successTitle",2);ae([l({type:String})],X.prototype,"errorTitle",2);ae([l({type:String})],X.prototype,"loadingStyle",2);ae([l({type:String})],X.prototype,"mode",2);X=ae([w("ia-status-indicator")],X);var So=Object.defineProperty,Co=Object.getOwnPropertyDescriptor,G=(t,e,o,a)=>{for(var i=a>1?void 0:a?Co(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&So(e,o,i),i};let z=class extends f{constructor(){super(...arguments),this.mode="primary",this.loading=!1,this.disabled=!1,this.loadingText="",this.type="button",this.openLinksNewTab=!1}render(){return s`
      ${this.href?s`<a
            href=${this.href}
            target=${this.openLinksNewTab?"_blank":"_self"}
            >${this.buttonTemplate}</a
          >`:this.buttonTemplate}
      <slot name="hidden-button"></slot>
    `}willUpdate(t){t.has("type")&&this.setButtonTypeEmulation()}get buttonTemplate(){return s`
      <button
        part="button"
        class=${this.mode}
        ?disabled=${this.disabled||this.loading}
      >
        ${this.buttonTextTemplate}
      </button>
    `}get buttonTextTemplate(){return this.loading?this.loadingStateTemplate:s`<slot></slot>`}get loadingStateTemplate(){return s`
      <span class="loading-indicator" alt="Loading indicator">
        <ia-status-indicator mode="loading"></ia-status-indicator> ${P(this.loadingText)}
      </span>
    `}setButtonTypeEmulation(){const t=this.querySelector("input.hidden-button");if(t){t.type=this.type;return}this.addHiddenButton(),this.addEventListener("click",this.handleComponentClick)}handleComponentClick(t){if(this.type==="button"||t instanceof CustomEvent&&t.detail.formActionsInProgress)return;this.querySelector("input.hidden-button").dispatchEvent(new PointerEvent("click"))}addHiddenButton(){this.type!=="button"&&Ot(s`<input
        type=${this.type}
        class="hidden-button"
        style="display:none"
        slot="hidden-button"
        @click=${t=>this.handleFormActions(t)}
      />`,this)}handleFormActions(t){t.stopPropagation(),t.isTrusted&&this.dispatchEvent(new CustomEvent("click",{detail:{formActionsInProgress:!0}}))}static get styles(){return[L,b`
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
      `]}};G([l({type:String})],z.prototype,"mode",2);G([l({type:Boolean})],z.prototype,"loading",2);G([l({type:Boolean})],z.prototype,"disabled",2);G([l({type:String})],z.prototype,"loadingText",2);G([l({type:String,reflect:!0})],z.prototype,"type",2);G([l({type:String})],z.prototype,"href",2);G([l({type:Boolean})],z.prototype,"openLinksNewTab",2);z=G([w("ia-button")],z);const dt=Object.freeze(Object.defineProperty({__proto__:null,get IAButton(){return z}},Symbol.toStringTag,{value:"Module"}));var To=Object.getOwnPropertyDescriptor,Oo=(t,e,o,a)=>{for(var i=a>1?void 0:a?To(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=n(i)||i);return i};const ko=[{label:"Mode",propertyName:"mode",defaultValue:"primary",inputType:"radio",radioOptions:["primary","secondary","danger","warning","disabled","transparent","custom","link","danger-link"]},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Loading",propertyName:"loading",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Loading text",propertyName:"loadingText",defaultValue:"",inputType:"text"},{label:"Type",propertyName:"type",defaultValue:"button",inputType:"radio",radioOptions:["button","submit","reset"]},{label:"Link to attach to button",propertyName:"href",defaultValue:"",inputType:"text"},{label:"Open link in new tab",propertyName:"openLinksNewTab",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}],Ao=[{label:"Button padding",cssVariable:"--ia-theme-button-padding",defaultValue:"0 1.875rem",inputType:"text"},{label:"Button width",cssVariable:"--ia-theme-button-width",defaultValue:"fit-content",inputType:"text"},{label:"Button height",cssVariable:"--ia-theme-button-height",defaultValue:"2.25rem",inputType:"text"},{label:"Button border width",cssVariable:"--ia-theme-button-border-width",defaultValue:"1px",inputType:"text"},{label:"Font",cssVariable:"--ia-theme-base-font-family",defaultValue:"'Helvetica Neue', Helvetica, Arial, sans-serif",inputType:"text"},{label:"Transition",cssVariable:"--ia-button-transition",defaultValue:"all 0.1s ease 0s",inputType:"text"},{label:"Text color (primary)",cssVariable:"--ia-theme-primary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (primary)",cssVariable:"--ia-theme-primary-cta-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (primary)",cssVariable:"--ia-theme-primary-cta-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Text color (secondary)",cssVariable:"--ia-theme-secondary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (secondary)",cssVariable:"--ia-theme-secondary-cta-fill",defaultValue:"#333333",inputType:"color"},{label:"Border color (secondary)",cssVariable:"--ia-theme-secondary-cta-border",defaultValue:"#666666",inputType:"color"},{label:"Text color (danger)",cssVariable:"--ia-theme-danger-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (danger)",cssVariable:"--ia-theme-danger-cta-fill",defaultValue:"#d9534f",inputType:"color"},{label:"Border color (danger)",cssVariable:"--ia-theme-danger-cta-border",defaultValue:"#d43f3a",inputType:"color"},{label:"Text color (warning)",cssVariable:"--ia-theme-warning-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (warning)",cssVariable:"--ia-theme-warning-cta-fill",defaultValue:"#ee8950",inputType:"color"},{label:"Border color (warning)",cssVariable:"--ia-theme-warning-cta-border",defaultValue:"#ec7939",inputType:"color"},{label:"Text color (disabled)",cssVariable:"--ia-theme-disabled-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (disabled)",cssVariable:"--ia-theme-disabled-cta-fill",defaultValue:"#666666",inputType:"color"},{label:"Border color (disabled)",cssVariable:"--ia-theme-disabled-cta-border",defaultValue:"#999999",inputType:"color"},{label:"Text color (custom)",cssVariable:"--ia-button-custom-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (custom)",cssVariable:"--ia-button-custom-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (custom)",cssVariable:"--ia-button-custom-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Text color (custom, on hover)",cssVariable:"--ia-button-custom-active-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (custom, on hover)",cssVariable:"--ia-button-custom-active-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (custom, on hover)",cssVariable:"--ia-button-custom-active-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Link color",cssVariable:"--ia-theme-link-color",defaultValue:"#4b64ff",inputType:"color"},{label:"Danger color",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}];let Be=class extends f{render(){return s`
      <story-template
        elementTag="ia-button"
        elementClassName="IAButton"
        .defaultUsageProps=${"@click=${() => alert('Button clicked!')}"}
        .defaultSlottedContent=${"Click Me"}
        .styleInputData=${{settings:Ao}}
        .propInputData=${{settings:ko}}
      >
        <ia-button slot="demo" @click=${()=>alert("Button clicked!")}>
          Click Me
        </ia-button>
      </story-template>
    `}};Be=Oo([w("ia-button-story")],Be);const Po=Object.freeze(Object.defineProperty({__proto__:null,get IAButtonStory(){return Be}},Symbol.toStringTag,{value:"Module"})),Eo=qt`
  <svg viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      fill-rule="evenodd"
      d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z"
    />
  </svg>
`;var Io=Object.defineProperty,Bo=Object.getOwnPropertyDescriptor,F=(t,e,o,a)=>{for(var i=a>1?void 0:a?Bo(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&Io(e,o,i),i};let D=class extends f{constructor(){super(...arguments),this.value="",this.clearButtonScreenReaderLabel="Clear",this.focusOnClear=!0,this.forceClearButton=!1}render(){const t=!this.value&&!this.forceClearButton;return s`
      <div id="container">
        <slot name="icon"></slot>
        <label for="text-input" class="sr-only"
          >${this.screenReaderLabel??h}</label
        >
        <input
          id="text-input"
          type="text"
          inputmode="search"
          enterkeyhint="search"
          autocapitalize="off"
          placeholder=${this.placeholder??h}
          .value=${this.value??h}
          aria-controls=${this.ariaControls??h}
          @input=${this.onTextInput}
          @keypress=${this.onKeyPress}
        />
        <button
          id="clear-button"
          type="button"
          ?hidden=${t}
          @click=${this.clearButtonClicked}
        >
          <span class="clear-icon" aria-hidden="true">${Eo}</span>
          <span class="sr-only">${this.clearButtonScreenReaderLabel}</span>
        </button>
      </div>
    `}onTextInput(){this.value=this.textInput.value}onKeyPress(t){if(t.key==="Enter"){this.textInput.blur();const e=new CustomEvent("submit",{detail:this.value});this.dispatchEvent(e)}}clearButtonClicked(){const t=this.textInput.value;this.value="",this.focusOnClear&&this.textInput.focus();const e=new CustomEvent("clear",{detail:t});this.dispatchEvent(e);const o=new InputEvent("input",{inputType:"deleteContentBackward"});this.dispatchEvent(o)}};D.shadowRootOptions={...f.shadowRootOptions,delegatesFocus:!0};D.styles=b`
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

    .clear-icon {
      display: block;
      width: 100%;
      height: 100%;
      background: var(--clear-button-icon-background, #2c2c2c);
      border-radius: 50%;
      pointer-events: none;
    }

    .clear-icon svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    .clear-icon .fill-color {
      fill: var(--clear-button-icon-color, #fff);
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
  `;F([l({type:String})],D.prototype,"value",2);F([l({type:String})],D.prototype,"placeholder",2);F([l({type:String})],D.prototype,"screenReaderLabel",2);F([l({type:String})],D.prototype,"clearButtonScreenReaderLabel",2);F([l({type:String})],D.prototype,"ariaControls",2);F([l({type:Boolean})],D.prototype,"focusOnClear",2);F([l({type:Boolean,reflect:!0})],D.prototype,"forceClearButton",2);F([m("#text-input")],D.prototype,"textInput",2);D=F([w("ia-clearable-text-input")],D);var Vo=Object.getOwnPropertyDescriptor,Do=(t,e,o,a)=>{for(var i=a>1?void 0:a?Vo(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=n(i)||i);return i};const Lo=[{label:"Height",cssVariable:"--input-height",defaultValue:"3rem"},{label:"Text color",cssVariable:"--input-color",defaultValue:"#555555",inputType:"color"},{label:"Border color",cssVariable:"--input-border-color",defaultValue:"#cccccc",inputType:"color"},{label:"Border radius",cssVariable:"--input-border-radius",defaultValue:"2rem"},{label:"Font size",cssVariable:"--input-font-size",defaultValue:"1.7rem"},{label:"Clear icon background",cssVariable:"--clear-button-icon-background",defaultValue:"#2c2c2c",inputType:"color"},{label:"Clear icon color",cssVariable:"--clear-button-icon-color",defaultValue:"#ffffff",inputType:"color"}],Ro=[{label:"Value",propertyName:"value",defaultValue:""},{label:"Placeholder",propertyName:"placeholder",defaultValue:"Search..."},{label:"Screen reader label",propertyName:"screenReaderLabel",defaultValue:"Search the archive"},{label:"Clear button screen reader label",propertyName:"clearButtonScreenReaderLabel",defaultValue:"Clear"},{label:"Focus the field after clearing",propertyName:"focusOnClear",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Always show the clear button",propertyName:"forceClearButton",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let Ve=class extends f{render(){return s`
      <story-template
        elementTag="ia-clearable-text-input"
        elementClassName="IaClearableTextInput"
        .styleInputData=${{settings:Lo}}
        .propInputData=${{settings:Ro}}
      >
        <ia-clearable-text-input slot="demo"></ia-clearable-text-input>
        <div slot="usage-notes">
          <p>
            A text field with a clear button that appears once there's something
            to clear. Set <code>forceClearButton</code> to keep the button
            visible even when the field is empty.
          </p>
          <p>
            Emits <code>input</code> on every value change, including when the
            clear button empties the field, <code>clear</code> carrying the
            value the field held beforehand, and <code>submit</code> carrying
            the current value when Enter is pressed.
          </p>
          <p>
            <code>screenReaderLabel</code> is what labels the field, so it needs
            setting for the component to be accessible.
          </p>
        </div>
      </story-template>
    `}};Ve=Do([w("ia-clearable-text-input-story")],Ve);const jo=Object.freeze(Object.defineProperty({__proto__:null,get IaClearableTextInputStory(){return Ve}},Symbol.toStringTag,{value:"Module"})),At=JSON.parse(`[{"name":"Afghanistan","flag":"🇦🇫"},{"name":"Albania","flag":"🇦🇱"},{"name":"Algeria","flag":"🇩🇿"},{"name":"Andorra","flag":"🇦🇩"},{"name":"Angola","flag":"🇦🇴"},{"name":"Antigua and Barbuda","flag":"🇦🇬"},{"name":"Argentina","flag":"🇦🇷"},{"name":"Armenia","flag":"🇦🇲"},{"name":"Aruba","flag":"🇦🇼"},{"name":"Australia","flag":"🇦🇺"},{"name":"Austria","flag":"🇦🇹"},{"name":"Azerbaijan","flag":"🇦🇿"},{"name":"Bahamas","flag":"🇧🇸"},{"name":"Bahrain","flag":"🇧🇭"},{"name":"Bangladesh","flag":"🇧🇩"},{"name":"Barbados","flag":"🇧🇧"},{"name":"Belarus","flag":"🇧🇾"},{"name":"Belgium","flag":"🇧🇪"},{"name":"Belize","flag":"🇧🇿"},{"name":"Benin","flag":"🇧🇯"},{"name":"Bhutan","flag":"🇧🇹"},{"name":"Bolivia","flag":"🇧🇴"},{"name":"Bosnia and Herzegovina","flag":"🇧🇦"},{"name":"Botswana","flag":"🇧🇼"},{"name":"Brazil","flag":"🇧🇷"},{"name":"Brunei","flag":"🇧🇳"},{"name":"Bulgaria","flag":"🇧🇬"},{"name":"Burkina Faso","flag":"🇧🇫"},{"name":"Burundi","flag":"🇧🇮"},{"name":"Cabo Verde","flag":"🇨🇻"},{"name":"Cambodia","flag":"🇰🇭"},{"name":"Cameroon","flag":"🇨🇲"},{"name":"Canada","flag":"🇨🇦"},{"name":"Central African Republic","flag":"🇨🇫"},{"name":"Chad","flag":"🇹🇩"},{"name":"Chile","flag":"🇨🇱"},{"name":"China","flag":"🇨🇳"},{"name":"Colombia","flag":"🇨🇴"},{"name":"Comoros","flag":"🇰🇲"},{"name":"Cook Islands","flag":"🇨🇰"},{"name":"Costa Rica","flag":"🇨🇷"},{"name":"Côte d'Ivoire","flag":"🇨🇮"},{"name":"Croatia","flag":"🇭🇷"},{"name":"Cuba","flag":"🇨🇺"},{"name":"Cyprus","flag":"🇨🇾"},{"name":"Czechia","flag":"🇨🇿"},{"name":"Democratic Republic of the Congo","flag":"🇨🇩"},{"name":"Denmark","flag":"🇩🇰"},{"name":"Djibouti","flag":"🇩🇯"},{"name":"Dominica","flag":"🇩🇲"},{"name":"Dominican Republic","flag":"🇩🇴"},{"name":"Ecuador","flag":"🇪🇨"},{"name":"Egypt","flag":"🇪🇬"},{"name":"El Salvador","flag":"🇸🇻"},{"name":"Equatorial Guinea","flag":"🇬🇶"},{"name":"Eritrea","flag":"🇪🇷"},{"name":"Estonia","flag":"🇪🇪"},{"name":"Eswatini","flag":"🇸🇿"},{"name":"Ethiopia","flag":"🇪🇹"},{"name":"Fiji","flag":"🇫🇯"},{"name":"Finland","flag":"🇫🇮"},{"name":"France","flag":"🇫🇷"},{"name":"Gabon","flag":"🇬🇦"},{"name":"Gambia","flag":"🇬🇲"},{"name":"Georgia","flag":"🇬🇪"},{"name":"Germany","flag":"🇩🇪"},{"name":"Ghana","flag":"🇬🇭"},{"name":"Greece","flag":"🇬🇷"},{"name":"Grenada","flag":"🇬🇩"},{"name":"Guatemala","flag":"🇬🇹"},{"name":"Guinea","flag":"🇬🇳"},{"name":"Guinea-Bissau","flag":"🇬🇼"},{"name":"Guyana","flag":"🇬🇾"},{"name":"Haiti","flag":"🇭🇹"},{"name":"Honduras","flag":"🇭🇳"},{"name":"Hungary","flag":"🇭🇺"},{"name":"Iceland","flag":"🇮🇸"},{"name":"India","flag":"🇮🇳"},{"name":"Indonesia","flag":"🇮🇩"},{"name":"Iran","flag":"🇮🇷"},{"name":"Iraq","flag":"🇮🇶"},{"name":"Ireland","flag":"🇮🇪"},{"name":"Israel","flag":"🇮🇱"},{"name":"Italy","flag":"🇮🇹"},{"name":"Jamaica","flag":"🇯🇲"},{"name":"Japan","flag":"🇯🇵"},{"name":"Jordan","flag":"🇯🇴"},{"name":"Kazakhstan","flag":"🇰🇿"},{"name":"Kenya","flag":"🇰🇪"},{"name":"Kiribati","flag":"🇰🇮"},{"name":"Kosovo","flag":"🇽🇰"},{"name":"Kuwait","flag":"🇰🇼"},{"name":"Kyrgyzstan","flag":"🇰🇬"},{"name":"Laos","flag":"🇱🇦"},{"name":"Latvia","flag":"🇱🇻"},{"name":"Lebanon","flag":"🇱🇧"},{"name":"Lesotho","flag":"🇱🇸"},{"name":"Liberia","flag":"🇱🇷"},{"name":"Libya","flag":"🇱🇾"},{"name":"Liechtenstein","flag":"🇱🇮"},{"name":"Lithuania","flag":"🇱🇹"},{"name":"Luxembourg","flag":"🇱🇺"},{"name":"Madagascar","flag":"🇲🇬"},{"name":"Malawi","flag":"🇲🇼"},{"name":"Malaysia","flag":"🇲🇾"},{"name":"Maldives","flag":"🇲🇻"},{"name":"Mali","flag":"🇲🇱"},{"name":"Malta","flag":"🇲🇹"},{"name":"Marshall Islands","flag":"🇲🇭"},{"name":"Mauritania","flag":"🇲🇷"},{"name":"Mauritius","flag":"🇲🇺"},{"name":"Mexico","flag":"🇲🇽"},{"name":"Micronesia","flag":"🇫🇲"},{"name":"Moldova","flag":"🇲🇩"},{"name":"Monaco","flag":"🇲🇨"},{"name":"Mongolia","flag":"🇲🇳"},{"name":"Montenegro","flag":"🇲🇪"},{"name":"Morocco","flag":"🇲🇦"},{"name":"Mozambique","flag":"🇲🇿"},{"name":"Myanmar","flag":"🇲🇲"},{"name":"Namibia","flag":"🇳🇦"},{"name":"Nauru","flag":"🇳🇷"},{"name":"Nepal","flag":"🇳🇵"},{"name":"Netherlands","flag":"🇳🇱"},{"name":"New Zealand","flag":"🇳🇿"},{"name":"Nicaragua","flag":"🇳🇮"},{"name":"Niue","flag":"🇳🇺"},{"name":"Niger","flag":"🇳🇪"},{"name":"Nigeria","flag":"🇳🇬"},{"name":"North Korea","flag":"🇰🇵"},{"name":"North Macedonia","flag":"🇲🇰"},{"name":"Norway","flag":"🇳🇴"},{"name":"Oman","flag":"🇴🇲"},{"name":"Pakistan","flag":"🇵🇰"},{"name":"Palau","flag":"🇵🇼"},{"name":"Palestine","flag":"🇵🇸"},{"name":"Panama","flag":"🇵🇦"},{"name":"Papua New Guinea","flag":"🇵🇬"},{"name":"Paraguay","flag":"🇵🇾"},{"name":"Peru","flag":"🇵🇪"},{"name":"Philippines","flag":"🇵🇭"},{"name":"Poland","flag":"🇵🇱"},{"name":"Portugal","flag":"🇵🇹"},{"name":"Qatar","flag":"🇶🇦"},{"name":"Republic of the Congo","flag":"🇨🇬"},{"name":"Romania","flag":"🇷🇴"},{"name":"Russia","flag":"🇷🇺"},{"name":"Rwanda","flag":"🇷🇼"},{"name":"Saint Kitts and Nevis","flag":"🇰🇳"},{"name":"Saint Lucia","flag":"🇱🇨"},{"name":"Saint Vincent and the Grenadines","flag":"🇻🇨"},{"name":"Samoa","flag":"🇼🇸"},{"name":"San Marino","flag":"🇸🇲"},{"name":"Sao Tome and Principe","flag":"🇸🇹"},{"name":"Saudi Arabia","flag":"🇸🇦"},{"name":"Senegal","flag":"🇸🇳"},{"name":"Serbia","flag":"🇷🇸"},{"name":"Seychelles","flag":"🇸🇨"},{"name":"Sierra Leone","flag":"🇸🇱"},{"name":"Singapore","flag":"🇸🇬"},{"name":"Slovakia","flag":"🇸🇰"},{"name":"Slovenia","flag":"🇸🇮"},{"name":"Solomon Islands","flag":"🇸🇧"},{"name":"Somalia","flag":"🇸🇴"},{"name":"South Africa","flag":"🇿🇦"},{"name":"South Korea","flag":"🇰🇷"},{"name":"South Sudan","flag":"🇸🇸"},{"name":"Spain","flag":"🇪🇸"},{"name":"Sri Lanka","flag":"🇱🇰"},{"name":"Sudan","flag":"🇸🇩"},{"name":"Suriname","flag":"🇸🇷"},{"name":"Sweden","flag":"🇸🇪"},{"name":"Switzerland","flag":"🇨🇭"},{"name":"Syria","flag":"🇸🇾"},{"name":"Taiwan","flag":"🇹🇼"},{"name":"Tajikistan","flag":"🇹🇯"},{"name":"Tanzania","flag":"🇹🇿"},{"name":"Thailand","flag":"🇹🇭"},{"name":"Timor-Leste","flag":"🇹🇱"},{"name":"Togo","flag":"🇹🇬"},{"name":"Tonga","flag":"🇹🇴"},{"name":"Trinidad and Tobago","flag":"🇹🇹"},{"name":"Tunisia","flag":"🇹🇳"},{"name":"Turkey","flag":"🇹🇷"},{"name":"Turkmenistan","flag":"🇹🇲"},{"name":"Tuvalu","flag":"🇹🇻"},{"name":"Uganda","flag":"🇺🇬"},{"name":"Ukraine","flag":"🇺🇦"},{"name":"United Arab Emirates","flag":"🇦🇪"},{"name":"United Kingdom","flag":"🇬🇧"},{"name":"United States","flag":"🇺🇸"},{"name":"Uruguay","flag":"🇺🇾"},{"name":"Uzbekistan","flag":"🇺🇿"},{"name":"Vanuatu","flag":"🇻🇺"},{"name":"Vatican City","flag":"🇻🇦"},{"name":"Venezuela","flag":"🇻🇪"},{"name":"Vietnam","flag":"🇻🇳"},{"name":"Yemen","flag":"🇾🇪"},{"name":"Zambia","flag":"🇿🇲"},{"name":"Zimbabwe","flag":"🇿🇼"}]`);const Pe=Te(class extends Oe{constructor(t){if(super(t),t.type!==H.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((a=>a!==""))));for(const a in e)e[a]&&!this.nt?.has(a)&&this.st.add(a);return this.render(e)}const o=t.element.classList;for(const a of this.st)a in e||(o.remove(a),this.st.delete(a));for(const a in e){const i=!!e[a];i===this.st.has(a)||this.nt?.has(a)||(i?(o.add(a),this.st.add(a)):(o.remove(a),this.st.delete(a)))}return V}});const No=t=>t.strings===void 0,Mo={},zo=(t,e=Mo)=>t._$AH=e;const Uo=Te(class extends Oe{constructor(t){if(super(t),t.type!==H.PROPERTY&&t.type!==H.ATTRIBUTE&&t.type!==H.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!No(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===V||e===h)return e;const o=t.element,a=t.name;if(t.type===H.PROPERTY){if(e===o[a])return V}else if(t.type===H.BOOLEAN_ATTRIBUTE){if(!!e===o.hasAttribute(a))return V}else if(t.type===H.ATTRIBUTE&&o.getAttribute(a)===e+"")return V;return zo(t),e}});function Fo(t,e){return e.some(o=>t.has(o))}function Ho(t,e){const o=[...t],a=[...e],i=o.length,r=a.length;if(i===0)return!0;let n=0,d=0;for(;d<r;){if(a[d]===o[n]&&(n+=1),n>=i)return!0;d+=1}return!1}const qo="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501%202.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131%202.7226499%201.81402515z'%20%3e%3c/path%3e%3c/svg%3e",Ko="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499%203.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501%202.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131%202.7226499-1.81402514z'%20%3e%3c/path%3e%3c/svg%3e",Wo="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m50%200c27.6142375%200%2050%2022.3857625%2050%2050s-22.3857625%2050-50%2050-50-22.3857625-50-50%2022.3857625-50%2050-50zm23.8159475%2026.1840525c-1.4033215-1.4033215-3.5816761-1.5592461-5.1572272-.4677738l-.5598841.4677738-18.0988362%2018.0989475-18.0988362-18.0989475-.5598841-.4677738c-1.5755511-1.0914723-3.7539057-.9355477-5.1572272.4677738-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113l18.0989475%2018.0988362-18.0989475%2018.0988362c-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113%201.4033215%201.4033215%203.5816761%201.5592461%205.1572272.4677738l.5598841-.4677738%2018.0988362-18.0989475%2018.0988362%2018.0989475.5598841.4677738c1.5755511%201.0914723%203.7539057.9355477%205.1572272-.4677738%201.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113l-18.0989475-18.0988362%2018.0989475-18.0988362c1.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113z'%20fill-rule='evenodd'%20%3e%3c/path%3e%3c/svg%3e";var Go=Object.defineProperty,Zo=Object.getOwnPropertyDescriptor,_=(t,e,o,a)=>{for(var i=a>1?void 0:a?Zo(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&Go(e,o,i),i};const Yo={all:()=>!0,prefix:(t,e)=>e.startsWith(t),suffix:(t,e)=>e.endsWith(t),substring:(t,e)=>e.includes(t),subsequence:Ho},Jo="list",Qo="substring",Xo=t=>t,ei=t=>t.toLocaleLowerCase();let x=class extends f{constructor(){super(),this.options=[],this.behavior=Jo,this.maxAutocompleteEntries=Number.POSITIVE_INFINITY,this.filter=Qo,this.caseSensitive=!1,this.sort=!1,this.wrapArrowKeys=!1,this.stayOpen=!1,this.clearable=!1,this.open=!1,this.disabled=!1,this.required=!1,this.value=null,this.hasFocus=!1,this.highlightedOption=null,this.enteredText="",this.filterText="",this.losingFocus=!1,this.optionsByID=new Map,this.optionFilteringValues=new Map,this.optionsRespectingSortFlag=[],this.filteredOptions=[],this.internals=this.attachInternals()}render(){const t=Pe({disabled:this.disabled,focused:this.hasFocus});return s`
      <div id="container" part="container">
        ${this.labelTemplate}
        <div id="main-widget-row" class=${t} part="combo-box">
          ${this.textInputTemplate}
          ${this.clearable?this.clearButtonTemplate:h}
          ${this.caretButtonTemplate}
        </div>
        ${this.optionsListTemplate}
      </div>
    `}willUpdate(t){(t.has("options")||t.has("caseSensitive"))&&this.rebuildOptionFilteringValues(),t.has("options")&&this.rebuildOptionIDMap(),(t.has("options")||t.has("sort"))&&this.rebuildSortedOptions(),Fo(t,["options","behavior","maxAutocompleteEntries","filter","filterText","caseSensitive","sort"])&&this.rebuildFilteredOptions(),t.has("open")&&(this.open?this.value&&this.setHighlightedOption(this.selectedOption):this.setHighlightedOption(null)),t.has("required")&&this.updateFormValidity()}updated(t){t.has("value")&&this.handleValueChanged(),t.has("options")&&this.behavior!=="freeform"&&!this.selectedOption&&this.clearSelectedOption(),t.has("open")&&(this.open?(this.positionOptionsMenu(),this.optionsList?.showPopover?.(),this.optionsList?.classList.add("visible")):(this.optionsList?.hidePopover?.(),this.optionsList?.classList.remove("visible")))}get labelTemplate(){return s`
      <label id="label" for="text-input" part="label">
        <slot name="label"></slot>
      </label>
    `}get textInputTemplate(){const t=Pe({"clear-padding":this.clearable&&!this.shouldShowClearButton});return s`
      <input
        type="text"
        id="text-input"
        class=${t}
        .value=${Uo(this.enteredText)}
        placeholder=${J(this.placeholder)}
        part="text-input"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-controls="options-list"
        aria-expanded=${this.open}
        aria-activedescendant=${J(this.highlightedOption?.id)}
        ?readonly=${this.behavior==="select-only"}
        ?disabled=${this.disabled}
        ?required=${this.required}
        @click=${this.handleComboBoxClick}
        @keydown=${this.handleComboBoxKeyDown}
        @input=${this.handleTextBoxInput}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      />
    `}get clearButtonTemplate(){return s`
      <button
        type="button"
        id="clear-button"
        part="clear-button"
        tabindex="-1"
        ?hidden=${!this.shouldShowClearButton}
        @click=${this.handleClearButtonClick}
      >
        <span class="sr-only">${P("Clear")}</span>
        <slot name="clear-button">
          <img
            class="icon clear-icon"
            part="icon clear-icon"
            src=${Wo}
            alt=""
            aria-hidden="true"
          />
        </slot>
      </button>
    `}get caretTemplate(){return s`
      <slot name="caret-closed" ?hidden=${this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${qo}
          alt=""
          aria-hidden="true"
        />
      </slot>
      <slot name="caret-open" ?hidden=${!this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${Ko}
          alt=""
          aria-hidden="true"
        />
      </slot>
    `}get caretButtonTemplate(){return s`
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
        <span class="sr-only">${P("Toggle options")}</span>
        ${this.caretTemplate}
      </button>
    `}get optionsListTemplate(){return s`
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
        ${B(this.open,()=>this.optionTemplates)}
        <slot name="options-list-bottom"></slot>
      </ul>
    `}get optionTemplates(){return this.filteredOptions.length===0&&this.maxAutocompleteEntries>0?[this.emptyOptionsTemplate]:this.filteredOptions.map(t=>{const e=t===this.highlightedOption,o=Pe({option:!0,highlight:e});return s`
        <li
          id=${t.id}
          class=${o}
          part="option ${e?"highlight":""}"
          role="option"
          tabindex="-1"
          @pointerenter=${this.handleOptionPointerEnter}
          @pointermove=${this.handleOptionPointerMove}
          @click=${this.handleOptionClick}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        >
          ${t.content??t.text}
        </li>
      `})}get emptyOptionsTemplate(){return s`
      <li id="empty-options" part="empty-options">
        <slot name="empty-options">${P("No matching options")}</slot>
      </li>
    `}handleOptionPointerEnter(t){this.handleOptionPointerMove(t)}handleOptionPointerMove(t){const e=t.currentTarget,o=this.getOptionFor(e.id);o&&this.setHighlightedOption(o)}handleOptionClick(t){const e=t.currentTarget,o=this.getOptionFor(e.id);o&&(this.setSelectedOption(o.id),this.stayOpen||this.closeOptionsMenu())}handleComboBoxKeyDown(t){switch(t.key){case"Enter":this.handleEnterPressed();break;case"Escape":this.handleEscapePressed();break;case"ArrowUp":t.altKey?this.handleAltUpArrowPressed():this.handleUpArrowPressed();break;case"ArrowDown":t.altKey?this.handleAltDownArrowPressed():this.handleDownArrowPressed();break;case"Tab":this.handleTabPressed();return;case" ":this.handleSpacePressed(t);return;default:return}t.stopPropagation(),t.preventDefault()}async handleTextBoxInput(){const t=this.textInput?.value??"";this.enteredText=t,this.setFilterText(t),this.openOptionsMenu(),await this.updateComplete,this.highlightFirstOption()}handleEnterPressed(){if(!this.open){this.openOptionsMenu();return}this.highlightedOption?this.setSelectedOption(this.highlightedOption.id):this.behavior==="freeform"&&this.setValue(this.enteredText),this.stayOpen||(this.open=!1)}handleEscapePressed(){if(this.open){this.closeOptionsMenu();return}this.clearSelectedOption()}handleUpArrowPressed(){this.open||this.openOptionsMenu(),this.highlightPreviousOption()}handleDownArrowPressed(){this.open||this.openOptionsMenu(),this.highlightNextOption()}handleAltUpArrowPressed(){this.closeOptionsMenu()}handleAltDownArrowPressed(){this.openOptionsMenu()}handleTabPressed(){this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1))}handleSpacePressed(t){this.behavior==="select-only"&&(this.open?this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1)):this.openOptionsMenu(),t.stopPropagation(),t.preventDefault())}handleComboBoxClick(){this.toggleOptionsMenu()}handleClearButtonClick(){this.clearSelectedOption(),this.textInput?.focus(),this.openOptionsMenu()}handleFocus(){this.behavior!=="select-only"&&this.textInput?.focus(),this.hasFocus=!0,this.losingFocus=!1}handleBlur(){this.hasFocus=!1,this.losingFocus=!0,setTimeout(()=>{this.losingFocus&&!this.shadowRoot?.activeElement&&(this.losingFocus=!1,this.closeOptionsMenu(),this.behavior==="list"?this.setTextValue(this.selectedOption?.text??"",!1):this.behavior==="freeform"&&(this.enteredText||this.value)&&this.setValue(this.enteredText))},0)}handleValueChanged(){if(this.value==null){this.enteredText&&this.setTextValue("",!1);return}const t=this.getOptionFor(this.value);if(this.behavior==="freeform"){const e=t?.text??this.value;e!==this.enteredText&&this.setTextValue(e);return}if(!t){this.clearSelectedOption();return}this.enteredText!==t.text&&(this.setTextValue(t.text,!1),this.setFilterText(""))}highlightFirstOption(){this.setHighlightedOption(this.firstFilteredOption)}highlightLastOption(){this.setHighlightedOption(this.lastFilteredOption)}highlightPreviousOption(){const{filteredOptions:t,lastFilteredIndex:e}=this;if(!this.highlightedOption){this.highlightLastOption();return}const{highlightedIndex:o}=this,a=this.wrapArrowKeys&&o===0?e:Math.max(o-1,0);this.setHighlightedOption(t[a])}highlightNextOption(){const{filteredOptions:t,lastFilteredIndex:e}=this;if(!this.highlightedOption){this.highlightFirstOption();return}const{highlightedIndex:o}=this,a=this.wrapArrowKeys&&o===e?0:Math.min(o+1,e);this.setHighlightedOption(t[a])}async setHighlightedOption(t){this.highlightedOption=t,await this.updateComplete;const{optionsList:e,highlightedElement:o}=this;if(!o||!e)return;const a=o.getBoundingClientRect(),i=e.getBoundingClientRect();(a.top<i.top||a.bottom>i.bottom)&&o.scrollIntoView({block:"nearest"})}setSelectedOption(t){const e=this.getOptionFor(t);if(!e)throw new RangeError("Unknown option ID");const o=this.value;this.value=e.id,this.internals.setFormValue(this.value),this.setTextValue(e.text,!1),this.setFilterText(""),this.value!==o&&this.emitChangeEvent(),e.onSelected?.(e)}clearSelectedOption(){const t=this.value;this.value=null,this.internals.setFormValue(this.value),this.setTextValue(""),this.value!==t&&this.emitChangeEvent()}setValue(t){if(this.behavior==="freeform"){const e=this.value;this.value=t,this.internals.setFormValue(this.value),this.setTextValue(t),this.value!==e&&this.emitChangeEvent()}else this.setSelectedOption(t)}setTextValue(t,e=!0){this.textInput&&(this.textInput.value=t),this.enteredText=t,e&&this.setFilterText(t)}setFilterText(t){const{caseTransform:e}=this;this.filterText=e(t)}openOptionsMenu(){this.open=!0,this.emitToggleEvent()}closeOptionsMenu(){this.open=!1,this.emitToggleEvent()}toggleOptionsMenu(){this.open=!this.open,this.emitToggleEvent()}updateFormValidity(){this.required&&!this.value?this.internals.setValidity({valueMissing:!0},P("A value is required")):this.internals.setValidity({})}emitChangeEvent(){this.dispatchEvent(new CustomEvent("change",{detail:this.value}))}emitToggleEvent(){this.dispatchEvent(new CustomEvent("toggle",{detail:this.open}))}get isEmpty(){return!this.selectedOption&&!this.enteredText}get shouldShowClearButton(){return this.clearable&&!this.disabled&&!this.isEmpty}positionOptionsMenu(){const{mainWidgetRow:t,optionsList:e}=this;if(!t||!e)return;const o=t.getBoundingClientRect(),{innerHeight:a,scrollX:i,scrollY:r}=window,n=o.top,d=a-o.bottom,c="var(--combo-box-list-max-height--)",y={top:`${o.bottom+r}px`,left:`${o.left+i}px`,width:`var(--combo-box-list-width--, ${o.width}px)`,maxHeight:`min(${c}, ${d}px)`};Object.assign(e.style,y),setTimeout(()=>{const u=e.getBoundingClientRect().bottom>=a,T=n>d;u&&T&&(e.style.top="auto",e.style.bottom=`${a-o.top-r}px`,e.style.maxHeight=`min(${c}, ${n}px)`)},0)}get caseTransform(){return this.caseSensitive?Xo:ei}getOptionFor(t){return this.optionsByID.get(t)??null}rebuildOptionIDMap(){this.optionsByID.clear();for(const t of this.options)this.optionsByID.set(t.id,t)}rebuildSortedOptions(){this.sort?this.optionsRespectingSortFlag=[...this.options].sort((t,e)=>{const o=this.optionFilteringValues.get(t),a=this.optionFilteringValues.get(e);return o.localeCompare(a)}):this.optionsRespectingSortFlag=this.options}rebuildOptionFilteringValues(){this.optionFilteringValues.clear();const{caseTransform:t}=this;for(const e of this.options){const o=t(e.text);this.optionFilteringValues.set(e,o)}}rebuildFilteredOptions(){const t=this.behavior==="select-only"?"all":this.filter,e=typeof t=="string"?Yo[t]:t,o=this.optionsRespectingSortFlag.filter(a=>{const i=this.optionFilteringValues.get(a);return i?e(this.filterText,i,a):!1}).slice(0,this.maxAutocompleteEntries);this.filteredOptions=o}get firstFilteredOption(){return this.filteredOptions[0]??null}get lastFilteredOption(){return this.filteredOptions[this.lastFilteredIndex]??null}get lastFilteredIndex(){return this.filteredOptions.length-1}get selectedOption(){return this.value==null?null:this.getOptionFor(this.value)}get highlightedIndex(){return this.highlightedOption?this.filteredOptions.indexOf(this.highlightedOption):-1}get highlightedElement(){return this.highlightedOption?this.shadowRoot.getElementById(this.highlightedOption.id):null}static get styles(){const t=b`
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
    `;return[L,t]}};x.formAssociated=!0;x.shadowRootOptions={...f.shadowRootOptions,delegatesFocus:!0};_([l({type:Array})],x.prototype,"options",2);_([l({type:String})],x.prototype,"placeholder",2);_([l({type:String})],x.prototype,"behavior",2);_([l({type:Number,attribute:"max-autocomplete-entries"})],x.prototype,"maxAutocompleteEntries",2);_([l({type:String})],x.prototype,"filter",2);_([l({type:Boolean,reflect:!0,attribute:"case-sensitive"})],x.prototype,"caseSensitive",2);_([l({type:Boolean,reflect:!0})],x.prototype,"sort",2);_([l({type:Boolean,reflect:!0,attribute:"wrap-arrow-keys"})],x.prototype,"wrapArrowKeys",2);_([l({type:Boolean,reflect:!0,attribute:"stay-open"})],x.prototype,"stayOpen",2);_([l({type:Boolean,reflect:!0})],x.prototype,"clearable",2);_([l({type:Boolean,reflect:!0})],x.prototype,"open",2);_([l({type:Boolean,reflect:!0})],x.prototype,"disabled",2);_([l({type:Boolean,reflect:!0})],x.prototype,"required",2);_([l({type:String})],x.prototype,"value",2);_([p()],x.prototype,"hasFocus",2);_([p()],x.prototype,"highlightedOption",2);_([p()],x.prototype,"enteredText",2);_([p()],x.prototype,"filterText",2);_([m("#main-widget-row")],x.prototype,"mainWidgetRow",2);_([m("#text-input")],x.prototype,"textInput",2);_([m("#options-list")],x.prototype,"optionsList",2);x=_([w("ia-combo-box")],x);var ti=Object.defineProperty,oi=Object.getOwnPropertyDescriptor,$=(t,e,o,a)=>{for(var i=a>1?void 0:a?oi(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&ti(e,o,i),i};const ii=[{label:"Width",cssVariable:"--ia-theme-combo-box-width",defaultValue:"250px",inputType:"text"},{label:"Padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown width",cssVariable:"--combo-box-list-width",defaultValue:"",inputType:"text"},{label:"Dropdown max height",cssVariable:"--combo-box-list-max-height",defaultValue:"250px",inputType:"text"},{label:"Dropdown fade duration",cssVariable:"--combo-box-list-fade-duration",defaultValue:125,inputType:"range",min:0,max:1e3,step:25,unit:"ms"}],Pt=[{id:"red",text:"Red"},{id:"orange",text:"Orange"},{id:"yellow",text:"Yellow"},{id:"green",text:"Green"},{id:"blue",text:"Blue"},{id:"indigo",text:"Indigo"},{id:"violet",text:"Violet"}],ai=Pt.map(t=>({...t,content:s` <span style="display: flex; align-items: center">
      <span style="flex: 1">${t.text}</span>
      <div style="width: 15px; height: 15px; background:${t.id}"></div>
    </span>`})),ct=At.map(t=>({id:t.name,text:t.name})),ri=At.map(t=>({id:t.name,text:t.name,content:s`<span>${t.flag}</span>&nbsp;<span>${t.name}</span>`})),ni="list",si="Choices",pt="Select an option...",ht=50,li="substring";let v=class extends f{constructor(){super(...arguments),this.options=ct,this.behavior=ni,this.label=si,this.placeholder=pt,this.maxAutocompleteEntries=ht,this.filterFn=li,this.caseSensitive=!1,this.shouldSort=!1,this.wrapArrowKeys=!0,this.clearable=!0,this.disabled=!1,this.announcerText=""}render(){return s`
      <story-template
        elementTag="ia-combo-box"
        elementClassName="IAComboBox"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:ii}}
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
                  value=${pt}
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
                  value=${ht}
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
    `}get exampleUsage(){const{placeholder:t,behavior:e,maxAutocompleteEntries:o,filterFn:a}=this,i={behavior:e?`"${e}"`:"",placeholder:t?`"${t}"`:"","max-autocomplete-entries":o?`"${o}"`:"",filter:a&&a!=="substring"?`"${a}"`:"","case-sensitive":this.caseSensitive,sort:this.shouldSort,"wrap-arrow-keys":this.wrapArrowKeys,clearable:this.clearable,disabled:this.disabled};return`
      <ia-combo-box
        .options=\${[
          { id: 'foo', text: 'Foo Option' },
          { id: 'bar', text: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(i).map(([n,d])=>d?d===!0?n:d?`${n}=${d}`:"":"").join(`
  `)}
      >
        <span slot="label">${this.label}</span>
      </ia-combo-box>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(t){t.preventDefault(),this.updateOptions(),this.behavior=this.behaviorSelect.value,this.label=this.labelInput.value,this.placeholder=this.placeholderInput.value,this.maxAutocompleteEntries=Number(this.maxAutocompleteInput.value),this.filterFn=this.filterFnSelect.value,this.caseSensitive=this.caseSensitiveCheck.checked,this.shouldSort=this.sortCheck.checked,this.wrapArrowKeys=this.wrapArrowKeysCheck.checked,this.clearable=this.clearableCheck.checked,this.disabled=this.disabledCheck.checked}updateOptions(){switch(this.optionSetSelect.value){case"colors":this.options=this.customContentCheck.checked?ai:Pt;break;case"countries":this.options=this.customContentCheck.checked?ri:ct;break;default:this.options=[]}}handleComboBoxChange(t){this.announcerText=`New value is: ${t.detail}`}static get styles(){return b`
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
    `}};$([p()],v.prototype,"options",2);$([p()],v.prototype,"behavior",2);$([p()],v.prototype,"label",2);$([p()],v.prototype,"placeholder",2);$([p()],v.prototype,"maxAutocompleteEntries",2);$([p()],v.prototype,"filterFn",2);$([p()],v.prototype,"caseSensitive",2);$([p()],v.prototype,"shouldSort",2);$([p()],v.prototype,"wrapArrowKeys",2);$([p()],v.prototype,"clearable",2);$([p()],v.prototype,"disabled",2);$([p()],v.prototype,"announcerText",2);$([m("#settings__options")],v.prototype,"optionSetSelect",2);$([m("#settings__custom-content")],v.prototype,"customContentCheck",2);$([m("#settings__behavior")],v.prototype,"behaviorSelect",2);$([m("#settings__label")],v.prototype,"labelInput",2);$([m("#settings__placeholder")],v.prototype,"placeholderInput",2);$([m("#settings__max-entries")],v.prototype,"maxAutocompleteInput",2);$([m("#settings__filter-fn")],v.prototype,"filterFnSelect",2);$([m("#settings__case-sensitive")],v.prototype,"caseSensitiveCheck",2);$([m("#settings__sort")],v.prototype,"sortCheck",2);$([m("#settings__wrap")],v.prototype,"wrapArrowKeysCheck",2);$([m("#settings__clearable")],v.prototype,"clearableCheck",2);$([m("#settings__disabled")],v.prototype,"disabledCheck",2);v=$([w("ia-combo-box-story")],v);const di=Object.freeze(Object.defineProperty({__proto__:null,get IAComboBoxStory(){return v}},Symbol.toStringTag,{value:"Module"}));function*ci(t,e){if(t!==void 0){let o=0;for(const a of t)yield e(a,o++)}}const pi="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20class='fill-color'%20d='m17.0555551%2041.3194459c0-12.7430552%2010.3541664-23.1027772%2023.0847216-23.1027772%2012.7166664%200%2023.0777773%2010.359722%2023.0777773%2023.1027772%200%2012.7361108-10.3611109%2023.0986106-23.0777773%2023.0986106-12.7305552%200-23.0847216-10.3624998-23.0847216-23.0986106zm-17.24305512%200c0%2022.2916661%2018.04583292%2040.3472213%2040.32777672%2040.3472213%208.9208332%200%2017.145833-2.9319449%2023.8194439-7.8527776l24.1513883%2024.0777771c1.2125%201.1402778%202.8430555%201.8430556%204.6374999%201.8430556%203.7444443%200%206.7805554-3.0361111%206.7805554-6.7791665%200-2.0652778-.9222222-3.9069444-2.3736111-5.1499999l-23.718055-23.7458328c4.4152777-6.4791665%207.0152776-14.3055552%207.0152776-22.7402772%200-22.2791661-18.0458328-40.34861006-40.312499-40.34861006-22.2819438%200-40.32777672%2018.06944396-40.32777672%2040.34861006z'%20fill='%232c2c2c'%20fill-rule='evenodd'%20/%3e%3c/svg%3e",hi=`<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>
`,ui=`<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>
`;var gi=Object.defineProperty,fi=Object.getOwnPropertyDescriptor,C=(t,e,o,a)=>{for(var i=a>1?void 0:a?fi(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&gi(e,o,i),i};let S=class extends f{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionGroup="options",this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=t=>{switch(t.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=t=>{t&&t.type==="click"&&t.stopPropagation(),this.open=!1,this.updatePopoverState()}}async firstUpdated(){await new Promise(t=>{setTimeout(t,0)}),this.addEventListener("closeDropdown",this.closeOptions)}willUpdate(t){t.has("open")&&this.updatePopoverState()}disconnectedCallback(){super.disconnectedCallback?.(),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){this.usePopover&&(this.dropdownMenu?.togglePopover?.(this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;const t=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${t.left}px`,this.dropdownMenu.style.top=`${t.bottom}px`,this.dropdownMenu.style.minWidth=`${t.width}px`}mainButtonClicked(){this.openViaButton?this.toggleOptions():this.mainButtonLabelSlotted[0]?.click()}mainButtonKeyDown(t){(t.key==="Enter"||t.key===" ")&&(this.mainButtonClicked(),t.preventDefault())}caretKeyDown(t){(t.key==="Enter"||t.key===" ")&&(this.toggleOptions(),t.preventDefault())}renderOption(t){const{label:e,url:o=void 0,id:a}=t;let i;const r=this.selectedOption===a?"selected":"";return o?i=s`<a
        href=${o}
        @click=${n=>this.optionClicked(n,t)}
        >${e}</a
      >`:i=s`<button
        @click=${n=>this.optionClicked(n,t)}
      >
        ${e}
      </button>`,s`<li role="menuitem" class=${r}>${i}</li>`}optionClicked(t,e){t.stopPropagation(),this.selectedOption!==e.id&&(this.selectedOption=e.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:e}})),e.selectedHandler?.(e)),this.closeOnSelect&&(this.closeOptions(),this.mainButton.focus())}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(t=>this.selectedOption!==t.id)}get caretUpTemplate(){return s`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${he(hi)}</slot>
      </span>
    `}get caretDownTemplate(){return s`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${he(ui)}</slot>
      </span>
    `}get caretTemplate(){return this.displayCaret?this.openViaButton?s`
        <span class="caret" aria-hidden="true">
          ${this.caretUpTemplate} ${this.caretDownTemplate}
        </span>
      `:s`
      <button
        class="caret"
        aria-labelledby="caret-label"
        aria-haspopup="true"
        aria-expanded=${this.open}
        @click=${B(this.shouldAttachEventHandlers,()=>this.toggleOptions)}
        @keydown=${B(this.shouldAttachEventHandlers,()=>this.caretKeyDown)}
        ?disabled=${this.isDisabled}
      >
        ${this.caretUpTemplate} ${this.caretDownTemplate}
      </button>
    `:s``}get dropdownTemplate(){return this.isCustomList?s`<slot name="list"></slot>`:s`${this.availableOptions.map(t=>this.renderOption(t))}`}get backdropTemplate(){return this.closeOnBackdropClick?this.open?s`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `:s``:s``}get shouldNestCaretInButton(){return this.openViaButton}get shouldAttachEventHandlers(){return!this.isDisabled&&!this.hasCustomClickHandler}render(){return s`
      <div class="ia-dropdown-group ${this.open?"open":""}">
        <div class="button-row">
          <button
            class="click-main"
            aria-haspopup=${this.openViaButton}
            aria-expanded=${this.open}
            @click=${B(this.shouldAttachEventHandlers,()=>this.mainButtonClicked)}
            @keydown=${B(this.shouldAttachEventHandlers,()=>this.mainButtonKeyDown)}
            ?disabled=${this.isDisabled}
          >
            <span class="sr-only" id="caret-label"
              >Toggle ${this.optionGroup}</span
            >
            <slot name="dropdown-label"></slot>
            ${B(this.shouldNestCaretInButton,()=>this.caretTemplate)}
          </button>
          ${B(!this.shouldNestCaretInButton,()=>this.caretTemplate)}
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
    `}static get styles(){const t=b`var(--dropdownBorderWidth, 1px)`,e=b`var(--dropdownBorderRadius, 4px)`,o=b`var(--dropdownBorderColor, #fff)`,a=b`var(--dropdownBgColor, #333)`,i=b`var(--dropdownTextColor, #fff)`,r=b`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,n=b`var(--dropdownSelectedBgColor, #fff)`,d=b`var(--dropdownMainButtonBgColor, transparent)`,c=b`var(--dropdownTextAlign, inherit)`,y=b`var(--dropdownBackdropZIndex, 1)`,g=b`var(--dropdownListZIndex, 2)`;return[L,b`
        :host {
          display: inline;
          color: ${i};
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
          background: ${d};
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
          z-index: ${g};
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
            ${d}
          );
        }

        button.click-main:focus,
        button.click-main:focus-visible {
          background-color: var(
            --dropdownMainButtonFocusBgColor,
            ${d}
          );
        }

        button.click-main:active {
          background-color: var(
            --dropdownMainButtonActiveBgColor,
            ${d}
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
          z-index: ${y};
        }

        ul {
          z-index: ${g};
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
          color: ${i};
          background: ${a};

          font-size: var(--dropdownFontSize, inherit);

          border-top: var(--dropdownBorderTopWidth, ${t});
          border-right: var(--dropdownBorderRightWidth, ${t});
          border-bottom: var(
            --dropdownBorderBottomWidth,
            ${t}
          );
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
          border-bottom-color: ${n};
        }

        #dropdown-main li.selected:first-child {
          border-top-color: ${n};
        }

        #dropdown-main li:hover > *,
        #dropdown-main li:focus-within > * {
          background-color: ${r};
          color: var(--dropdownHoverTextColor, #fff);
        }

        #dropdown-main li.selected > * {
          background-color: ${n};
          color: var(--dropdownSelectedTextColor, #2c2c2c);
        }

        #dropdown-main li {
          background: ${a};
          list-style: none;
          height: 30px;
          cursor: pointer;
          border-bottom: 0.5px solid ${a};
          border-top: 0.5px solid ${a};
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
          border-bottom-right-radius: var(
            --dropdownBorderBottomRightRadius,
            4px
          );
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
          color: ${i};
          background: var(--dropdownItemButtonBgColor, transparent);
          padding: var(--dropdownItemButtonPadding, 0);
          text-align: ${c};
        }
      `]}};C([l({type:Boolean,reflect:!0})],S.prototype,"open",2);C([l({type:Boolean,reflect:!0})],S.prototype,"isDisabled",2);C([l({type:Boolean})],S.prototype,"displayCaret",2);C([l({type:Boolean})],S.prototype,"closeOnSelect",2);C([l({type:Boolean})],S.prototype,"openViaButton",2);C([l({type:Boolean})],S.prototype,"usePopover",2);C([l({type:Boolean})],S.prototype,"includeSelectedOption",2);C([l({type:String})],S.prototype,"selectedOption",2);C([l({attribute:!1})],S.prototype,"options",2);C([l({type:String})],S.prototype,"optionGroup",2);C([l({attribute:!1})],S.prototype,"optionSelected",2);C([l({type:Boolean,reflect:!0})],S.prototype,"isCustomList",2);C([l({type:Boolean,reflect:!0})],S.prototype,"hasCustomClickHandler",2);C([l({type:Boolean,reflect:!0})],S.prototype,"closeOnEscape",2);C([l({type:Boolean,reflect:!0})],S.prototype,"closeOnBackdropClick",2);C([m(".ia-dropdown-group")],S.prototype,"container",2);C([m("#dropdown-main")],S.prototype,"dropdownMenu",2);C([m(".click-main")],S.prototype,"mainButton",2);C([io({slot:"dropdown-label"})],S.prototype,"mainButtonLabelSlotted",2);S=C([w("ia-dropdown")],S);var mi=Object.defineProperty,bi=Object.getOwnPropertyDescriptor,U=(t,e,o,a)=>{for(var i=a>1?void 0:a?bi(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&mi(e,o,i),i};const ut={CategoryChanged:"categoryChanged",SearchRequested:"searchRequested"};let N=class extends f{constructor(){super(...arguments),this.categories=[],this.placeholder=P("Search"),this.useMobileView=!1,this.hideDropdown=!1,this.loading=!1}get resolvedCategory(){return this.selectedCategory??this.categories?.[0]?.id??""}render(){return s`
      <div id="container" part="container" role="search">
        <div
          id="main-bar"
          part="main-bar"
          class=${this.hideDropdown?"no-dropdown":h}
        >
          ${this.hideDropdown?h:this.dropdownTemplate}
          ${this.textBoxTemplate} ${this.searchButtonTemplate}
        </div>
      </div>
    `}willUpdate(t){if(t.has("selectedCategory")||t.has("categories")){const e=this.resolvedCategory;this.categoryDropdown&&this.categoryDropdown.selectedOption!==e&&(this.categoryDropdown.selectedOption=e)}}get dropdownTemplate(){return s`
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
    `}get textBoxTemplate(){return s`
      <ia-clearable-text-input
        id="search-input"
        part="search-input"
        .value=${this.spacedQuery}
        placeholder=${this.placeholder}
        clearButtonScreenReaderLabel=${P("Clear search query")}
        screenReaderLabel=${P("Search the Archive. Filters and Advanced Search available below.")}
        @clear=${this.searchFieldCleared}
        @submit=${this.handleSubmit}
      ></ia-clearable-text-input>
    `}get searchButtonTemplate(){return s`
      <button
        id="search-button"
        part="search-button"
        class=${this.loading?"loading":h}
        type="button"
        aria-label=${P("Search")}
        @click=${this.handleSubmit}
      >
        ${this.loading?s`<ia-status-indicator
              mode="loading"
              class="search-button-loading-icon"
            ></ia-status-indicator>`:s`<img src=${pi} alt="" />`}
      </button>
    `}get selectedCategoryLabel(){return this.categories.find(e=>e.id===this.resolvedCategory)?.label??this.resolvedCategory}get spacedQuery(){return this.query?.replace(/\+/g," ")??""}searchFieldCleared(){this.query&&this.emitSearchRequested()}handleSubmit(){this.emitSearchRequested()}handleCategorySelected(t){const e=t.detail.option.id;e!==this.resolvedCategory&&(this.selectedCategory=e,setTimeout(()=>this.searchInput.focus()),this.dispatchEvent(new CustomEvent(ut.CategoryChanged,{detail:e})))}emitSearchRequested(){this.dispatchEvent(new CustomEvent(ut.SearchRequested,{detail:{query:this.searchInput.value,category:this.resolvedCategory}}))}static get styles(){const t=b`
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
    `;return[L,t]}};U([l({type:String})],N.prototype,"query",2);U([l({type:Array})],N.prototype,"categories",2);U([l({type:String})],N.prototype,"selectedCategory",2);U([l({type:String})],N.prototype,"placeholder",2);U([l({type:Boolean})],N.prototype,"useMobileView",2);U([l({type:Boolean})],N.prototype,"hideDropdown",2);U([l({type:Boolean})],N.prototype,"loading",2);U([m("#search-input")],N.prototype,"searchInput",2);U([m("#category-dropdown")],N.prototype,"categoryDropdown",2);N=U([w("ia-dropdown-search-bar")],N);var yi=Object.defineProperty,vi=Object.getOwnPropertyDescriptor,R=(t,e,o,a)=>{for(var i=a>1?void 0:a?vi(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&yi(e,o,i),i};const wi=[{label:"Bar height",cssVariable:"--ia-theme-search-bar-height",defaultValue:"30px",inputType:"text"},{label:"Bar width",cssVariable:"--ia-theme-search-bar-width",defaultValue:"300px",inputType:"text"},{label:"Internal padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown z-index",cssVariable:"--dropdown-z-index",defaultValue:2,inputType:"number",min:0,step:1}],gt=[{id:"all",label:"All"},{id:"texts",label:"Books/Documents"},{id:"fulltext",label:"Text Contents"},{id:"radio",label:"Radio"},{id:"tv",label:"TV"},{id:"movies",label:"Video"},{id:"audio",label:"Audio"},{id:"software",label:"Software"},{id:"image",label:"Images"},{id:"etree",label:"Live Music"},{id:"collection",label:"Collections"},{id:"data",label:"Data"},{id:"web",label:"Web Sites"}],xi="all",ft="Search";let E=class extends f{constructor(){super(...arguments),this.query="",this.selectedCategory=xi,this.placeholder=ft,this.hideDropdown=!1,this.loading=!1,this.announcerText=""}render(){return s`
      <story-template
        elementTag="ia-dropdown-search-bar"
        elementClassName="IADropdownSearchBar"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:wi}}
      >
        <div slot="demo">
          <ia-dropdown-search-bar
            .query=${this.query}
            .categories=${gt}
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
                  ${ci(gt,t=>s`<option value=${t.id}>
                        ${t.label}
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
                  value=${ft}
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
    `}get exampleUsage(){const{query:t,selectedCategory:e,placeholder:o,hideDropdown:a,loading:i}=this,r=c=>c?`"${c}"`:"",n={query:r(t),selectedCategory:r(e),placeholder:r(o),hideDropdown:a,loading:i};return`
      <ia-dropdown-search-bar
        .categories=\${[
          { id: 'foo', label: 'Foo Option' },
          { id: 'bar', label: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(n).map(([c,y])=>y?y===!0?c:`${c}=${y}`:"").join(`
  `)}
      >
      </ia-dropdown-search-bar>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(t){t.preventDefault(),this.query=this.queryInput.value,this.selectedCategory=this.selectedCategorySelect.value,this.placeholder=this.placeholderInput.value,this.hideDropdown=this.hideDropdownCheck.checked,this.loading=this.loadingCheck.checked}handleSearchRequested(t){this.announcerText=`Category ID "${t.detail.category}" / Query "${t.detail.query}"`}static get styles(){return b`
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
    `}};R([p()],E.prototype,"query",2);R([p()],E.prototype,"selectedCategory",2);R([p()],E.prototype,"placeholder",2);R([p()],E.prototype,"hideDropdown",2);R([p()],E.prototype,"loading",2);R([p()],E.prototype,"announcerText",2);R([m("#settings__query")],E.prototype,"queryInput",2);R([m("#settings__selected-category")],E.prototype,"selectedCategorySelect",2);R([m("#settings__placeholder")],E.prototype,"placeholderInput",2);R([m("#settings__hide-dropdown")],E.prototype,"hideDropdownCheck",2);R([m("#settings__loading")],E.prototype,"loadingCheck",2);E=R([w("ia-dropdown-search-bar-story")],E);const $i=Object.freeze(Object.defineProperty({__proto__:null,get IADropdownSearchBarStory(){return E}},Symbol.toStringTag,{value:"Module"}));var _i=Object.getOwnPropertyDescriptor,Si=(t,e,o,a)=>{for(var i=a>1?void 0:a?_i(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=n(i)||i);return i};let De=class extends f{render(){return s`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `}};De.styles=[L,b`
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
    `];De=Si([w("ia-icon-label")],De);var Ci=Object.defineProperty,Ti=Object.getOwnPropertyDescriptor,j=(t,e,o,a)=>{for(var i=a>1?void 0:a?Ti(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&Ci(e,o,i),i};const Oi=[{label:"Menu background",cssVariable:"--dropdownBgColor",defaultValue:"#333333",inputType:"color"},{label:"Text color",cssVariable:"--dropdownTextColor",defaultValue:"#ffffff",inputType:"color"},{label:"Caret color",cssVariable:"--dropdownCaretColor",defaultValue:"#ffffff",inputType:"color"},{label:"Border color",cssVariable:"--dropdownBorderColor",defaultValue:"#ffffff",inputType:"color"},{label:"Selected option background",cssVariable:"--dropdownSelectedBgColor",defaultValue:"#ffffff",inputType:"color"},{label:"Selected option text",cssVariable:"--dropdownSelectedTextColor",defaultValue:"#2c2c2c",inputType:"color"},{label:"Border radius",cssVariable:"--dropdownBorderRadius",defaultValue:4,inputType:"range",min:0,max:20,step:1,unit:"px"},{label:"Menu offset from button",cssVariable:"--dropdownOffsetTop",defaultValue:5,inputType:"range",min:0,max:40,step:1,unit:"px"}],ki=[{id:"all",label:"All media types"},{id:"texts",label:"Books & Documents"},{id:"movies",label:"Video"},{id:"audio",label:"Audio"},{id:"software",label:"Software"}],Ai=[{id:"inlibrary",url:"#elem-ia-dropdown",label:"Books to Borrow"},{id:"texts",url:"#elem-ia-dropdown",label:"Texts Collection"},{id:"web",url:"#elem-ia-dropdown",label:"Wayback Machine"}];let I=class extends f{constructor(){super(...arguments),this.displayCaret=!0,this.isDisabled=!1,this.openViaButton=!0,this.closeOnSelect=!1,this.includeSelectedOption=!1,this.closeOnEscape=!0,this.closeOnBackdropClick=!0,this.useLinkOptions=!1,this.selectedOption="all",this.lastSelectedLabel="(none yet)"}get options(){return this.useLinkOptions?Ai:ki}get selectedLabel(){return this.options.find(e=>e.id===this.selectedOption)?.label??"Select one"}render(){return s`
      <story-template
        elementTag="ia-dropdown"
        elementClassName="IADropdown"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:Oi}}
      >
        <div slot="demo">
          <div class="demo-row">
            <ia-dropdown
              id="basic-dropdown"
              ?displayCaret=${this.displayCaret}
              ?isDisabled=${this.isDisabled}
              ?openViaButton=${this.openViaButton}
              ?closeOnSelect=${this.closeOnSelect}
              ?includeSelectedOption=${this.includeSelectedOption}
              ?closeOnEscape=${this.closeOnEscape}
              ?closeOnBackdropClick=${this.closeOnBackdropClick}
              .selectedOption=${this.selectedOption}
              .options=${this.options}
              @optionSelected=${this.handleOptionSelected}
            >
              <span slot="dropdown-label">${this.selectedLabel}</span>
            </ia-dropdown>
          </div>

          <p class="demo-readout">
            Last selected: <strong>${this.lastSelectedLabel}</strong>
          </p>

          <hr />

          <p class="demo-caption">
            A custom list passed in via <code>slot="list"</code>, opened by an
            external handler. Uses <code>ia-icon-label</code> for the button
            content.
          </p>
          <div class="demo-row">
            <ia-dropdown
              id="custom-list-dropdown"
              isCustomList
              hasCustomClickHandler
              displayCaret
              closeOnBackdropClick
              @click=${this.toggleCustomDropdown}
            >
              <ia-icon-label slot="dropdown-label">
                <div slot="icon">${this.plusIcon}</div>
                My Lists
              </ia-icon-label>
              <ul slot="list" class="custom-list">
                <li>Listen Later</li>
                <li>Favorites</li>
                <li>Read in 2026</li>
              </ul>
            </ia-dropdown>
          </div>
        </div>

        <form slot="settings">
          <table>
            <tr>
              <td><label for="settings__options">Option set</label></td>
              <td>
                <select
                  id="settings__options"
                  @change=${this.handleOptionSetChanged}
                >
                  <option value="media" selected>Media types (buttons)</option>
                  <option value="links">Archive.org links (anchors)</option>
                </select>
              </td>
            </tr>
            <tr>
              <td colspan="2"><hr /></td>
            </tr>
            ${this.checkboxRow("display-caret","Display caret","displayCaret")}
            ${this.checkboxRow("disabled","Disabled","isDisabled")}
            ${this.checkboxRow("open-via-button","Open via button","openViaButton")}
            ${this.checkboxRow("close-on-select","Close on select","closeOnSelect")}
            ${this.checkboxRow("include-selected","Include selected option in menu","includeSelectedOption")}
            ${this.checkboxRow("close-on-escape","Close on Escape","closeOnEscape")}
            ${this.checkboxRow("close-on-backdrop","Close on backdrop click","closeOnBackdropClick")}
          </table>
        </form>

        <div slot="usage-notes">
          <p>
            Options are supplied as an array of
            <code>OptionInterface</code> objects. An option with a
            <code>url</code> renders as an anchor; otherwise it renders as a
            button. Selecting one emits an <code>optionSelected</code> event and
            calls the option's own <code>selectedHandler</code>, if it has one.
          </p>
          <p>
            With <code>openViaButton</code> off, the main button no longer
            toggles the menu and the caret becomes a separate button, so
            <code>displayCaret</code> needs to be on for the menu to be
            reachable.
          </p>
          <p>
            Set <code>isCustomList</code> to replace the generated option list
            with your own markup in <code>slot="list"</code>. Pair it with
            <code>hasCustomClickHandler</code> when the host wants to own the
            open/close behavior, as in the second example above.
          </p>
        </div>
      </story-template>
    `}get plusIcon(){return s`<svg viewBox="0 0 100 100" style="width: 15px; height: 15px;">
      <path
        fill="currentColor"
        d="m56 23v22h22v11h-22v22h-11l-.001-22h-21.999v-11h21.999l.001-22z"
      />
    </svg>`}checkboxRow(t,e,o){return s`
      <tr>
        <td><label for="settings__${t}">${e}</label></td>
        <td>
          <input
            type="checkbox"
            id="settings__${t}"
            .checked=${this[o]}
            @change=${a=>{this[o]=a.target.checked}}
          />
        </td>
      </tr>
    `}get exampleUsage(){return`<ia-dropdown
  displayCaret
  closeOnSelect
  .selectedOption=\${this.selectedId}
  .options=\${[
    { id: 'all', label: 'All media types' },
    { id: 'texts', label: 'Books & Documents' },
  ]}
  @optionSelected=\${this.handleSelection}
>
  <span slot="dropdown-label">\${this.selectedLabel}</span>
</ia-dropdown>`}handleOptionSelected(t){this.selectedOption=t.detail.option.id,this.lastSelectedLabel=t.detail.option.label}handleOptionSetChanged(t){this.useLinkOptions=t.target.value==="links",this.selectedOption=this.options[0].id,this.lastSelectedLabel="(none yet)"}toggleCustomDropdown(){this.customDropdown&&(this.customDropdown.open=!this.customDropdown.open)}static get styles(){return b`
      .demo-row {
        display: flex;
        align-items: center;
        gap: 20px;
        min-height: 40px;
        padding: 10px;
        background: #2c2c2c;
        border-radius: 4px;
      }

      .demo-readout {
        font-size: 1.4rem;
      }

      .demo-caption {
        font-size: 1.4rem;
      }

      .custom-list {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .custom-list li {
        padding: 5px 10px;
        white-space: nowrap;
        cursor: pointer;
      }

      .custom-list li:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    `}};j([p()],I.prototype,"displayCaret",2);j([p()],I.prototype,"isDisabled",2);j([p()],I.prototype,"openViaButton",2);j([p()],I.prototype,"closeOnSelect",2);j([p()],I.prototype,"includeSelectedOption",2);j([p()],I.prototype,"closeOnEscape",2);j([p()],I.prototype,"closeOnBackdropClick",2);j([p()],I.prototype,"useLinkOptions",2);j([p()],I.prototype,"selectedOption",2);j([p()],I.prototype,"lastSelectedLabel",2);j([m("#custom-list-dropdown")],I.prototype,"customDropdown",2);I=j([w("ia-dropdown-story")],I);const Pi=Object.freeze(Object.defineProperty({__proto__:null,get IADropdownStory(){return I}},Symbol.toStringTag,{value:"Module"}));var Ei=Object.defineProperty,Ii=Object.getOwnPropertyDescriptor,te=(t,e,o,a)=>{for(var i=a>1?void 0:a?Ii(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&Ei(e,o,i),i};const Bi={CodeSubmitted:"codeSubmitted"},mt=/^[0-9]+$/,Vi=/^[a-zA-Z0-9]+$/;let K=class extends f{constructor(){super(...arguments),this.disabled=!1,this.numChars=6,this.numericOnly=!0,this.allowedChars=mt}render(){return s`
      ${[...Array(this.numChars).keys()].map(t=>s`<input
            id="OTP-input-${t}"
            part="input"
            type="text"
            autocomplete=${t===0?"one-time-code":"off"}
            inputmode=${this.numericOnly?"numeric":"text"}
            ?disabled=${this.disabled}
            @beforeinput=${this.handleInput}
            @paste=${this.handlePaste}
            @keydown=${this.handleKeydown}
          />`)}
    `}firstUpdated(){this.inputs[0].focus()}willUpdate(t){t.has("numericOnly")&&(this.allowedChars=this.numericOnly?mt:Vi),t.has("prefillValue")&&this.prefillValue!==void 0&&(this.fillInputs(this.prefillValue),this.prefillValue=void 0)}handleInput(t){t.preventDefault();const e=t.target,o=t.data;if(!o)return;if(o.length>1){this.fillInputs(o);return}if(!this.allowedChars.test(o))return;e.value=o;const a=e.nextElementSibling;a&&a.focus(),this.submitIfInputsFilled()}handleKeydown(t){const e=t.target,o=t.key,a=e.previousElementSibling,i=e.nextElementSibling;switch(o){case"Backspace":case"Delete":if(t.preventDefault(),a&&a.focus(),e.value===""){a.value="";break}e.value="";break;case"Tab":e.select();break;case"ArrowRight":case"Right":t.preventDefault(),i&&i.focus();break;case"ArrowLeft":case"Left":t.preventDefault(),a&&a.focus();break}}handlePaste(t){t.preventDefault();const e=t.clipboardData?.getData("text");e&&this.fillInputs(e)}fillInputs(t){t===""&&this.clearInputs();const e=t.split("").filter(a=>this.allowedChars.test(a)).slice(0,this.numChars);if(!e||e.length===0)return;if(e.forEach((a,i)=>this.inputs[i].value=a),e.length===this.numChars){this.triggerSubmit(e.join("")),this.inputs[this.numChars-1].focus();return}this.inputs[e.length].focus()}clearInputs(){this.inputs.forEach(t=>t.value=""),this.inputs[0].focus()}submitIfInputsFilled(){const t=[];this.inputs.forEach(e=>{e.value&&t.push(e.value)}),t.length===this.numChars&&this.triggerSubmit(t.join(""))}triggerSubmit(t){this.dispatchEvent(new CustomEvent(Bi.CodeSubmitted,{detail:this.numericOnly?t:t.toUpperCase(),bubbles:!0,composed:!0}))}static get styles(){return[L,b`
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
      `]}};te([l({type:String})],K.prototype,"prefillValue",2);te([l({type:Boolean})],K.prototype,"disabled",2);te([l({type:Number})],K.prototype,"numChars",2);te([l({type:Boolean})],K.prototype,"numericOnly",2);te([l({type:Object})],K.prototype,"allowedChars",2);te([Ge("input")],K.prototype,"inputs",2);K=te([w("ia-otp-input")],K);var Di=Object.defineProperty,Li=Object.getOwnPropertyDescriptor,re=(t,e,o,a)=>{for(var i=a>1?void 0:a?Li(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&Di(e,o,i),i};const Ri={NewCodeRequested:"newCodeRequested"};let ee=class extends f{constructor(){super(...arguments),this.validationStatus="ready",this.newCodeSending=!1,this.numPasscodeChars=6,this.numericOnly=!0}render(){return s`
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
      ${this.validationStatus==="error"?s`<p class="error-msg">
            ${P("The code entered is invalid or expired")}
          </p>`:h}
      ${this.resendCodeButtonTemplate}
    `}willUpdate(t){t.has("validationStatus")&&this.OTPInput&&this.validationStatus==="error"&&(this.OTPInput.prefillValue=""),t.has("newCodeSending")&&this.newCodeSending&&this.OTPInput&&(this.OTPInput.prefillValue="")}get resendCodeButtonTemplate(){return this.newCodeSending?s`<span part="new-code-message" class="new-code-msg"
          >${P("Emailing...")}</span
        >`:s`
          <ia-button
            mode="link"
            class="new-code-btn"
            part="new-code-button"
            .disabled=${this.validationStatus==="loading"||this.validationStatus==="success"}
            @click=${this.handleNewCodeRequested}
          >
            ${P("Email me another code")}
          </ia-button>
        `}async handleNewCodeRequested(){this.dispatchEvent(new CustomEvent(Ri.NewCodeRequested,{bubbles:!0,composed:!0})),this.OTPInput.prefillValue=""}static get styles(){return[L,b`
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
      `]}};re([l({type:String})],ee.prototype,"validationStatus",2);re([l({type:Boolean})],ee.prototype,"newCodeSending",2);re([l({type:Number})],ee.prototype,"numPasscodeChars",2);re([l({type:Boolean})],ee.prototype,"numericOnly",2);re([m("ia-otp-input")],ee.prototype,"OTPInput",2);ee=re([w("ia-otp-form")],ee);var ji=Object.getOwnPropertyDescriptor,Ni=(t,e,o,a)=>{for(var i=a>1?void 0:a?ji(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=n(i)||i);return i};const Mi=[{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Input font size",cssVariable:"--ia-theme-font-size-lg",defaultValue:"2.25rem",inputType:"text"},{label:"Link and error font size",cssVariable:"--ia-theme-font-size-standard",defaultValue:"0.875rem",inputType:"text"},{label:"Link font color",cssVariable:"--ia-theme-link-color",defaultValue:"#4b64ff",inputType:"color"},{label:"Error message/indicator color",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"},{label:"Success indicator color",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"}],zi=[{label:"Validation Status",propertyName:"validationStatus",defaultValue:"ready",inputType:"radio",radioOptions:["ready","loading","success","error"]},{label:"New code sending in progress",propertyName:"newCodeSending",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Numeric only",propertyName:"numericOnly",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Number of passcode characters",propertyName:"numPasscodeChars",defaultValue:6,inputType:"number"}];let Le=class extends f{render(){return s`
      <story-template
        elementTag="ia-otp-form"
        elementClassName="IAOTPForm"
        .defaultUsageProps=${"@codeSubmitted=${(e: CustomEvent) => {setTimeout(() => alert('Code submitted: ' + e.detail), 250);}} \n  @newCodeRequested=${() => alert('New code requested')}"}
        .styleInputData=${{settings:Mi}}
        .propInputData=${{settings:zi}}
      >
        <ia-otp-form
          slot="demo"
          @codeSubmitted=${t=>{setTimeout(()=>alert("Code submitted: "+t.detail),250)}}
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
    `}};Le=Ni([w("ia-otp-form-story")],Le);const Ui=Object.freeze(Object.defineProperty({__proto__:null,get IAOTPFormStory(){return Le}},Symbol.toStringTag,{value:"Module"}));var Fi=Object.getOwnPropertyDescriptor,Hi=(t,e,o,a)=>{for(var i=a>1?void 0:a?Fi(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=n(i)||i);return i};const qi=[{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Font size",cssVariable:"--ia-theme-font-size-lg",defaultValue:"2.25rem",inputType:"text"}],Ki=[{label:"Number of characters",propertyName:"numChars",defaultValue:6,inputType:"number"},{label:"Numeric only",propertyName:"numericOnly",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Prefill value",propertyName:"prefillValue",defaultValue:""},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let Re=class extends f{render(){return s`
      <story-template
        elementTag="ia-otp-input"
        elementClassName="IAOTPInput"
        .defaultUsageProps=${"@codeSubmitted=${(e: CustomEvent) => {setTimeout(() => alert('Code submitted: ' + e.detail), 250);}}"}
        .styleInputData=${{settings:qi}}
        .propInputData=${{settings:Ki}}
      >
        <ia-otp-input
          @codeSubmitted=${t=>{setTimeout(()=>alert("Code submitted: "+t.detail),250)}}
          slot="demo"
        ></ia-otp-input>
      </story-template>
    `}};Re=Hi([w("ia-otp-input-story")],Re);const Wi=Object.freeze(Object.defineProperty({__proto__:null,get IAOTPInputStory(){return Re}},Symbol.toStringTag,{value:"Module"}));var Gi=Object.getOwnPropertyDescriptor,Zi=(t,e,o,a)=>{for(var i=a>1?void 0:a?Gi(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=n(i)||i);return i};let bt=class extends f{render(){return s`
      <span class="sr-only">
        <slot></slot>
      </span>
    `}static get styles(){return[L,b`
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
      `]}};bt=Zi([w("ia-sr-only-text")],bt);var Yi=Object.defineProperty,Ji=Object.getOwnPropertyDescriptor,Et=(t,e,o,a)=>{for(var i=a>1?void 0:a?Ji(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&Yi(e,o,i),i};let $e=class extends f{constructor(){super(...arguments),this.textVisible=!1}render(){return s`
      <story-template
        elementTag="ia-sr-only-text"
        elementClassName="IASrOnlyText"
        defaultSlottedContent="Sample text"
      >
        <div slot="demo">
          ${this.textVisible?"Sample Text":s`<ia-sr-only-text>Sample Text</ia-sr-only-text>`}
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
    `}};Et([p()],$e.prototype,"textVisible",2);$e=Et([w("ia-sr-only-text-story")],$e);const Qi=Object.freeze(Object.defineProperty({__proto__:null,get IAStatusIndicatorStory(){return $e}},Symbol.toStringTag,{value:"Module"}));var Xi=Object.getOwnPropertyDescriptor,ea=(t,e,o,a)=>{for(var i=a>1?void 0:a?Xi(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=n(i)||i);return i};const ta=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"1.25rem"},{label:"Color - loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Color - success",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"},{label:"Color - error",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}],oa=[{label:"Mode",propertyName:"mode",defaultValue:"loading",inputType:"radio",radioOptions:["ready","loading","success","error"]},{label:"Accessible title - loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{label:"Loading style",propertyName:"loadingStyle",defaultValue:"ring-dots",inputType:"radio",radioOptions:["ring-dots","ring"]},{label:"Accessible title - success",propertyName:"successTitle",defaultValue:"Success"},{label:"Accessible title - error",propertyName:"errorTitle",defaultValue:"Error"}];let je=class extends f{render(){return s`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .styleInputData=${{settings:ta}}
        .propInputData=${{settings:oa}}
      >
        <ia-status-indicator slot="demo"></ia-status-indicator>
      </story-template>
    `}};je=ea([w("ia-status-indicator-story")],je);const ia=Object.freeze(Object.defineProperty({__proto__:null,get IAStatusIndicatorStory(){return je}},Symbol.toStringTag,{value:"Module"})),aa="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='36.283'%20height='36.283'%3e%3cpath%20d='M35.531%2017.391h-3.09l.845-1.464a.748.748%200%201%200-1.297-.75l-1.276%202.214H28.61l2.515-4.354a.751.751%200%200%200-.272-1.024.75.75%200%200%200-1.024.274l-2.948%205.104h-2.023a6.751%206.751%200%200%200-2.713-4.684l1.019-1.76%205.896-.002a.75.75%200%200%200%200-1.5l-5.029.002%201.051-1.82%202.557.002a.75.75%200%200%200%200-1.5l-1.689-.002%201.545-2.676a.75.75%200%201%200-1.302-.75l-1.547%202.676-.844-1.463a.749.749%200%201%200-1.297.75l1.278%202.213-1.051%201.818-2.514-4.354a.75.75%200%200%200-1.298.75l2.946%205.104-1.016%201.758a6.692%206.692%200%200%200-2.706-.57%206.74%206.74%200%200%200-2.707.568l-1.013-1.754%202.946-5.105a.75.75%200%200%200-1.298-.75L13.56%208.697l-1.05-1.818%201.278-2.217a.749.749%200%200%200-1.298-.75l-.845%201.465-1.551-2.678a.75.75%200%200%200-1.024-.273.748.748%200%200%200-.274%201.023l1.545%202.678H8.652a.75.75%200%200%200%200%201.5h2.556l1.05%201.818H7.231a.75.75%200%200%200%200%201.5h5.894l1.017%201.762a6.755%206.755%200%200%200-2.712%204.684H9.406l-2.95-5.104a.75.75%200%201%200-1.299.75l2.516%204.354H5.569l-1.277-2.213a.75.75%200%200%200-1.298.75l.845%201.463H.75a.75.75%200%200%200%200%201.5h3.09l-.845%201.465a.747.747%200%200%200%20.275%201.022.75.75%200%200%200%20.374.103.75.75%200%200%200%20.65-.375l1.277-2.215h2.103l-2.516%204.354a.75.75%200%200%200%201.299.75l2.949-5.104h2.024a6.761%206.761%200%200%200%202.712%204.685l-1.017%201.762H7.232a.75.75%200%200%200%200%201.5h5.026l-1.05%201.818H8.651a.75.75%200%200%200%200%201.5h1.69l-1.545%202.676a.75.75%200%200%200%201.299.75l1.546-2.676.846%201.465a.755.755%200%200%200%20.65.375.737.737%200%200%200%20.375-.103.747.747%200%200%200%20.274-1.022l-1.279-2.215%201.05-1.82%202.515%204.354a.75.75%200%200%200%201.299-.75l-2.947-5.104%201.013-1.756a6.72%206.72%200%200%200%205.415%200l1.014%201.756-2.947%205.104a.75.75%200%200%200%201.298.75l2.515-4.354%201.053%201.82-1.277%202.213a.75.75%200%200%200%201.298.75l.844-1.463%201.545%202.678c.141.24.393.375.65.375a.75.75%200%200%200%20.649-1.125l-1.548-2.678h1.689a.75.75%200%200%200%200-1.5h-2.557l-1.051-1.82%205.029.002a.75.75%200%200%200%200-1.5l-5.896-.002-1.019-1.76a6.75%206.75%200%200%200%202.711-4.685h2.023l2.947%205.104a.753.753%200%200%200%201.025.273.749.749%200%200%200%20.272-1.023l-2.515-4.354h2.104l1.279%202.215a.75.75%200%200%200%20.649.375c.127%200%20.256-.03.375-.103a.748.748%200%200%200%20.273-1.022l-.848-1.465h3.092a.75.75%200%200%200%20.003-1.5zm-12.136.75c0%20.257-.041.502-.076.75a5.223%205.223%200%200%201-1.943%203.358%205.242%205.242%200%200%201-1.291.766%205.224%205.224%200%200%201-1.949.384%205.157%205.157%200%200%201-3.239-1.15%205.22%205.22%200%200%201-1.943-3.358c-.036-.247-.076-.493-.076-.75s.04-.503.076-.75a5.22%205.22%200%200%201%201.944-3.359c.393-.312.82-.576%201.291-.765a5.219%205.219%200%200%201%201.948-.384c.69%200%201.344.142%201.948.384.471.188.898.454%201.291.765a5.222%205.222%200%200%201%201.943%203.359c.035.247.076.493.076.75z'%20fill=':color:'/%3e%3c/svg%3e",yt=new WeakSet;class ra extends Oe{constructor(e){super(e)}update(e,[o,a]){return yt.has(e)||(o(),yt.add(e)),this.render(o,a)}render(e,o){return o()}}const vt=Te(ra);var na=Object.defineProperty,sa=Object.getOwnPropertyDescriptor,Je=(t,e,o,a)=>{for(var i=a>1?void 0:a?sa(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&na(e,o,i),i};let _e=class extends f{constructor(){super(...arguments),this.snowing=!1}render(){return s`
      ${this.startButtonTemplate} ${this.clearButtonTemplate}
      <img src=${aa} alt="Snowflakes icon" />
    `}willUpdate(t){t.has("snowConfig")&&(this.snowflakes?.destroy(),this.snowflakes=void 0,this.startSnowing())}get startButtonTemplate(){return vt(async()=>{await be(()=>Promise.resolve().then(()=>dt),void 0,import.meta.url)},()=>s`
        <ia-button
          @click=${()=>{this.snowing?this.stopSnowing():this.startSnowing()}}
        >
          ${this.snowing?"Stop Snowflakes":"Start Snowflakes"}
        </ia-button>
      `)}get clearButtonTemplate(){return vt(async()=>{await be(()=>Promise.resolve().then(()=>dt),void 0,import.meta.url)},()=>s`
        <ia-button
          @click=${()=>{this.snowflakes?.destroy()}}
        >
          Clear Snowflakes
        </ia-button>
      `)}async startSnowing(){if(!this.snowflakes){const e=(await be(()=>import("./snowflakes.esm-Dz_MTlsm.js"),[],import.meta.url)).default;this.snowflakes=new e(this.snowConfig)}this.snowflakes?.start(),this.snowing=!0}stopSnowing(){this.snowflakes?.stop(),this.snowing=!1}static get styles(){return b`
      img {
        width: 16px;
        filter: invert(1);
        vertical-align: middle;
      }
    `}};Je([l({type:Object})],_e.prototype,"snowConfig",2);Je([p()],_e.prototype,"snowing",2);_e=Je([w("ia-snow")],_e);var la=Object.defineProperty,da=Object.getOwnPropertyDescriptor,ne=(t,e,o,a)=>{for(var i=a>1?void 0:a?da(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=(a?n(e,o,i):n(i))||i);return a&&i&&la(e,o,i),i};let W=class extends f{render(){return s`
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
    `:"<ia-snow></ia-snow>"}get configString(){return JSON.stringify(this.config,null,2)}get snowflakeConfig(){return{color:this.colorInput.value,count:Number(this.countInput.value),wind:this.windInput.checked,rotation:this.rotationInput.checked}}setupSnowflakes(){this.config=this.snowflakeConfig}static get styles(){return b`
      fieldset {
        margin-top: 16px;
      }
    `}};ne([p()],W.prototype,"config",2);ne([m("#count")],W.prototype,"countInput",2);ne([m("#wind")],W.prototype,"windInput",2);ne([m("#rotation")],W.prototype,"rotationInput",2);ne([m("#color")],W.prototype,"colorInput",2);W=ne([w("ia-snow-story")],W);const ca=Object.freeze(Object.defineProperty({__proto__:null,get IASnowStory(){return W}},Symbol.toStringTag,{value:"Module"}));var pa=Object.getOwnPropertyDescriptor,ha=(t,e,o,a)=>{for(var i=a>1?void 0:a?pa(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(i=n(i)||i);return i};const ua=Object.assign({"../src/elements/ia-button/ia-button-story.ts":Po,"../src/elements/ia-clearable-text-input/ia-clearable-text-input-story.ts":jo,"../src/elements/ia-combo-box/ia-combo-box-story.ts":di,"../src/elements/ia-dropdown-search-bar/ia-dropdown-search-bar-story.ts":$i,"../src/elements/ia-dropdown/ia-dropdown-story.ts":Pi,"../src/elements/ia-otp-form/ia-otp-form-story.ts":Ui,"../src/elements/ia-otp-input/ia-otp-input-story.ts":Wi,"../src/elements/ia-sr-only-text/ia-sr-only-text-story.ts":Qi,"../src/elements/ia-status-indicator/ia-status-indicator-story.ts":ia,"../src/labs/ia-snow/ia-snow-story.ts":ca}),It=Object.keys(ua).map(t=>{const e=t.includes("/src/labs/"),o=t.split("/"),i=o[o.length-1].replace(/-story\.ts$/,"");return{tag:i,storyTag:`${i}-story`,id:`elem-${i}`,labs:e}}).sort((t,e)=>t.tag.localeCompare(e.tag)),Ne=It.filter(t=>!t.labs),Me=It.filter(t=>t.labs),ga=[...Ne,...Me];let wt=class extends f{constructor(){super(...arguments),this._abortController=new AbortController}createRenderRoot(){return this}render(){return s`
      <nav id="ia-sidebar">
        <h2>Production-Ready</h2>
        ${Ne.map(t=>s`<a href="#${t.id}">&lt;${t.tag}&gt;</a>`)}
        <h2>Labs 🧪</h2>
        ${Me.map(t=>s`<a href="#${t.id}">&lt;${t.tag}&gt;</a>`)}
      </nav>
      <div id="ia-content">
        <h1>Internet Archive Elements</h1>
        <h2>Production-Ready Elements</h2>
        ${Ne.map(t=>s`
          <div id="${t.id}" class="ia-anchor">
            ${he(`<${t.storyTag}></${t.storyTag}>`)}
          </div>
        `)}
        <h2>Labs Elements</h2>
        ${Me.map(t=>s`
          <div id="${t.id}" class="ia-anchor">
            ${he(`<${t.storyTag}></${t.storyTag}>`)}
          </div>
        `)}
      </div>
    `}firstUpdated(){const t=ga.map(a=>a.id),e=Object.fromEntries(t.map(a=>[a,this.querySelector(`#ia-sidebar a[href="#${a}"]`)])),o=new Set;this._observer=new IntersectionObserver(a=>{for(const r of a)r.isIntersecting?o.add(r.target.id):o.delete(r.target.id);const i=t.find(r=>o.has(r))??t[0];t.forEach(r=>e[r]?.classList.toggle("active",r===i))},{rootMargin:"0px 0px -70% 0px"}),t.forEach(a=>{const i=document.getElementById(a);i&&this._observer.observe(i)}),t.forEach(a=>{e[a]?.addEventListener("click",i=>{i.preventDefault();const r=document.getElementById(a);if(r){const n=r.getBoundingClientRect().top+window.scrollY;window.scrollTo({top:Math.max(0,n-16),behavior:"smooth"})}},{signal:this._abortController.signal})})}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._abortController.abort()}};wt=ha([w("app-root")],wt);
