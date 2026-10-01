import{n as C,e as E,c as me,i as _e,A as W,b as _,a as we,r as D}from"./index-iJUwrjlb.js";import{t as Pe}from"./story-template-ZwGrVfG5.js";import{l as Oe,m as q}from"./runtime-ZYKleSPf.js";import{_ as m}from"./tslib.es6-RU1n5ZxP.js";import"./icon-close-BOIK9_yb.js";import"./ia-dropdown-CZe99Y8Q.js";import"./ia-status-indicator-rq1VopHD.js";import"./masked-icon-B633eYM8.js";function*Re(o,e){if(o!==void 0){let t=0;for(const i of o)yield e(i,t++)}}const Be="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20class='fill-color'%20d='m17.0555551%2041.3194459c0-12.7430552%2010.3541664-23.1027772%2023.0847216-23.1027772%2012.7166664%200%2023.0777773%2010.359722%2023.0777773%2023.1027772%200%2012.7361108-10.3611109%2023.0986106-23.0777773%2023.0986106-12.7305552%200-23.0847216-10.3624998-23.0847216-23.0986106zm-17.24305512%200c0%2022.2916661%2018.04583292%2040.3472213%2040.32777672%2040.3472213%208.9208332%200%2017.145833-2.9319449%2023.8194439-7.8527776l24.1513883%2024.0777771c1.2125%201.1402778%202.8430555%201.8430556%204.6374999%201.8430556%203.7444443%200%206.7805554-3.0361111%206.7805554-6.7791665%200-2.0652778-.9222222-3.9069444-2.3736111-5.1499999l-23.718055-23.7458328c4.4152777-6.4791665%207.0152776-14.3055552%207.0152776-22.7402772%200-22.2791661-18.0458328-40.34861006-40.312499-40.34861006-22.2819438%200-40.32777672%2018.06944396-40.32777672%2040.34861006z'%20fill='%232c2c2c'%20fill-rule='evenodd'%20/%3e%3c/svg%3e";const M=window,re=M.ShadowRoot&&(M.ShadyCSS===void 0||M.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,oe=Symbol(),ne=new WeakMap;let xe=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==oe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(re&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=ne.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ne.set(t,e))}return e}toString(){return this.cssText}};const De=o=>new xe(typeof o=="string"?o:o+"",void 0,oe),Ue=(o,...e)=>{const t=o.length===1?o[0]:e.reduce(((i,r,n)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+o[n+1]),o[0]);return new xe(t,o,oe)},Ie=(o,e)=>{re?o.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((t=>{const i=document.createElement("style"),r=M.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,o.appendChild(i)}))},se=re?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return De(t)})(o):o;var K;const V=window,ae=V.trustedTypes,He=ae?ae.emptyScript:"",le=V.reactiveElementPolyfillSupport,ee={toAttribute(o,e){switch(e){case Boolean:o=o?He:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},Ae=(o,e)=>e!==o&&(e==e||o==o),Z={attribute:!0,type:String,converter:ee,reflect:!1,hasChanged:Ae},te="finalized";let T=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const r=this._$Ep(i,t);r!==void 0&&(this._$Ev.set(r,i),e.push(r))})),e}static createProperty(e,t=Z){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);r!==void 0&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const n=this[e];this[t]=r,this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Z}static finalize(){if(this.hasOwnProperty(te))return!1;this[te]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const r of i)this.createProperty(r,t[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(se(r))}else e!==void 0&&t.push(se(e));return t}static _$Ep(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach((t=>t(this)))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Ie(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach((t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)}))}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach((t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=Z){var r;const n=this.constructor._$Ep(e,i);if(n!==void 0&&i.reflect===!0){const s=(((r=i.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?i.converter:ee).toAttribute(t,i.type);this._$El=e,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(e,t){var i;const r=this.constructor,n=r._$Ev.get(e);if(n!==void 0&&this._$El!==n){const s=r.getPropertyOptions(n),d=typeof s.converter=="function"?{fromAttribute:s.converter}:((i=s.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?s.converter:ee;this._$El=n,this[n]=d.fromAttribute(t,s.type),this._$El=null}}requestUpdate(e,t,i){let r=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Ae)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((r,n)=>this[n]=r)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach((r=>{var n;return(n=r.hostUpdate)===null||n===void 0?void 0:n.call(r)})),this.update(i)):this._$Ek()}catch(r){throw t=!1,this._$Ek(),r}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach((i=>{var r;return(r=i.hostUpdated)===null||r===void 0?void 0:r.call(i)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};T[te]=!0,T.elementProperties=new Map,T.elementStyles=[],T.shadowRootOptions={mode:"open"},le?.({ReactiveElement:T}),((K=V.reactiveElementVersions)!==null&&K!==void 0?K:V.reactiveElementVersions=[]).push("1.6.3");var Q;const j=window,O=j.trustedTypes,de=O?O.createPolicy("lit-html",{createHTML:o=>o}):void 0,ie="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,Se="?"+w,ze=`<${Se}>`,S=document,I=()=>S.createComment(""),H=o=>o===null||typeof o!="object"&&typeof o!="function",Ce=Array.isArray,Ne=o=>Ce(o)||typeof o?.[Symbol.iterator]=="function",G=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,he=/-->/g,ce=/>/g,x=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pe=/'/g,ue=/"/g,Ee=/^(?:script|style|textarea|title)$/i,Le=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),qe=Le(1),R=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),ge=new WeakMap,A=S.createTreeWalker(S,129,null,!1);function ke(o,e){if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return de!==void 0?de.createHTML(e):e}const Me=(o,e)=>{const t=o.length-1,i=[];let r,n=e===2?"<svg>":"",s=U;for(let d=0;d<t;d++){const a=o[d];let l,c,p=-1,u=0;for(;u<a.length&&(s.lastIndex=u,c=s.exec(a),c!==null);)u=s.lastIndex,s===U?c[1]==="!--"?s=he:c[1]!==void 0?s=ce:c[2]!==void 0?(Ee.test(c[2])&&(r=RegExp("</"+c[2],"g")),s=x):c[3]!==void 0&&(s=x):s===x?c[0]===">"?(s=r??U,p=-1):c[1]===void 0?p=-2:(p=s.lastIndex-c[2].length,l=c[1],s=c[3]===void 0?x:c[3]==='"'?ue:pe):s===ue||s===pe?s=x:s===he||s===ce?s=U:(s=x,r=void 0);const f=s===x&&o[d+1].startsWith("/>")?" ":"";n+=s===U?a+ze:p>=0?(i.push(l),a.slice(0,p)+ie+a.slice(p)+w+f):a+w+(p===-2?(i.push(void 0),d):f)}return[ke(o,n+(o[t]||"<?>")+(e===2?"</svg>":"")),i]};class z{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let n=0,s=0;const d=e.length-1,a=this.parts,[l,c]=Me(e,t);if(this.el=z.createElement(l,i),A.currentNode=this.el.content,t===2){const p=this.el.content,u=p.firstChild;u.remove(),p.append(...u.childNodes)}for(;(r=A.nextNode())!==null&&a.length<d;){if(r.nodeType===1){if(r.hasAttributes()){const p=[];for(const u of r.getAttributeNames())if(u.endsWith(ie)||u.startsWith(w)){const f=c[s++];if(p.push(u),f!==void 0){const Te=r.getAttribute(f.toLowerCase()+ie).split(w),L=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:L[2],strings:Te,ctor:L[1]==="."?je:L[1]==="?"?We:L[1]==="@"?Ke:F})}else a.push({type:6,index:n})}for(const u of p)r.removeAttribute(u)}if(Ee.test(r.tagName)){const p=r.textContent.split(w),u=p.length-1;if(u>0){r.textContent=O?O.emptyScript:"";for(let f=0;f<u;f++)r.append(p[f],I()),A.nextNode(),a.push({type:2,index:++n});r.append(p[u],I())}}}else if(r.nodeType===8)if(r.data===Se)a.push({type:2,index:n});else{let p=-1;for(;(p=r.data.indexOf(w,p+1))!==-1;)a.push({type:7,index:n}),p+=w.length-1}n++}}static createElement(e,t){const i=S.createElement("template");return i.innerHTML=e,i}}function B(o,e,t=o,i){var r,n,s,d;if(e===R)return e;let a=i!==void 0?(r=t._$Co)===null||r===void 0?void 0:r[i]:t._$Cl;const l=H(e)?void 0:e._$litDirective$;return a?.constructor!==l&&((n=a?._$AO)===null||n===void 0||n.call(a,!1),l===void 0?a=void 0:(a=new l(o),a._$AT(o,t,i)),i!==void 0?((s=(d=t)._$Co)!==null&&s!==void 0?s:d._$Co=[])[i]=a:t._$Cl=a),a!==void 0&&(e=B(o,a._$AS(o,e.values),a,i)),e}class Ve{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:r}=this._$AD,n=((t=e?.creationScope)!==null&&t!==void 0?t:S).importNode(i,!0);A.currentNode=n;let s=A.nextNode(),d=0,a=0,l=r[0];for(;l!==void 0;){if(d===l.index){let c;l.type===2?c=new N(s,s.nextSibling,this,e):l.type===1?c=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(c=new Ze(s,this,e)),this._$AV.push(c),l=r[++a]}d!==l?.index&&(s=A.nextNode(),d++)}return A.currentNode=S,n}v(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class N{constructor(e,t,i,r){var n;this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cp=(n=r?.isConnected)===null||n===void 0||n}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=B(this,e,t),H(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==R&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Ne(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==h&&H(this._$AH)?this._$AA.nextSibling.data=e:this.$(S.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:r}=e,n=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=z.createElement(ke(r.h,r.h[0]),this.options)),r);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===n)this._$AH.v(i);else{const s=new Ve(n,this),d=s.u(this.options);s.v(i),this.$(d),this._$AH=s}}_$AC(e){let t=ge.get(e.strings);return t===void 0&&ge.set(e.strings,t=new z(e)),t}T(e){Ce(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const n of e)r===t.length?t.push(i=new N(this.k(I()),this.k(I()),this,this.options)):i=t[r],i._$AI(n),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class F{constructor(e,t,i,r,n){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=h}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const n=this.strings;let s=!1;if(n===void 0)e=B(this,e,t,0),s=!H(e)||e!==this._$AH&&e!==R,s&&(this._$AH=e);else{const d=e;let a,l;for(e=n[0],a=0;a<n.length-1;a++)l=B(this,d[i+a],t,a),l===R&&(l=this._$AH[a]),s||(s=!H(l)||l!==this._$AH[a]),l===h?e=h:e!==h&&(e+=(l??"")+n[a+1]),this._$AH[a]=l}s&&!r&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class je extends F{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}const Fe=O?O.emptyScript:"";class We extends F{constructor(){super(...arguments),this.type=4}j(e){e&&e!==h?this.element.setAttribute(this.name,Fe):this.element.removeAttribute(this.name)}}class Ke extends F{constructor(e,t,i,r,n){super(e,t,i,r,n),this.type=5}_$AI(e,t=this){var i;if((e=(i=B(this,e,t,0))!==null&&i!==void 0?i:h)===R)return;const r=this._$AH,n=e===h&&r!==h||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==h&&(r===h||n);n&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class Ze{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){B(this,e)}}const ve=j.litHtmlPolyfillSupport;ve?.(z,N),((Q=j.litHtmlVersions)!==null&&Q!==void 0?Q:j.litHtmlVersions=[]).push("2.8.0");const Qe=(o,e,t)=>{var i,r;const n=(i=t?.renderBefore)!==null&&i!==void 0?i:e;let s=n._$litPart$;if(s===void 0){const d=(r=t?.renderBefore)!==null&&r!==void 0?r:null;n._$litPart$=s=new N(e.insertBefore(I(),d),d,void 0,t??{})}return s._$AI(o),s};var J,Y;class P extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Qe(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return R}}P.finalized=!0,P._$litElement$=!0,(J=globalThis.litElementHydrateSupport)===null||J===void 0||J.call(globalThis,{LitElement:P});const be=globalThis.litElementPolyfillSupport;be?.({LitElement:P});((Y=globalThis.litElementVersions)!==null&&Y!==void 0?Y:globalThis.litElementVersions=[]).push("3.3.3");const Ge=o=>e=>typeof e=="function"?((t,i)=>(customElements.define(t,i),i))(o,e):((t,i)=>{const{kind:r,elements:n}=i;return{kind:r,elements:n,finisher(s){customElements.define(t,s)}}})(o,e);const Je=(o,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,o)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,o)}},Ye=(o,e,t)=>{e.constructor.createProperty(t,o)};function k(o){return(e,t)=>t!==void 0?Ye(o,e,t):Je(o,e)}const Xe=({finisher:o,descriptor:e})=>(t,i)=>{var r;if(i===void 0){const n=(r=t.originalKey)!==null&&r!==void 0?r:t.key,s=e!=null?{kind:"method",placement:"prototype",key:n,descriptor:e(t.key)}:{...t,key:n};return o!=null&&(s.finisher=function(d){o(d,n)}),s}{const n=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),o?.(n,i)}};function et(o,e){return Xe({descriptor:t=>({get(){var r,n;return(n=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(o))!==null&&n!==void 0?n:null},enumerable:!0,configurable:!0})})}var X;((X=window.HTMLSlotElement)===null||X===void 0?void 0:X.prototype.assignedElements)!=null;let v=class extends P{constructor(){super(...arguments),this.value="",this.clearButtonScreenReaderLabel="Clear",this.focusOnClear=!0,this.forceClearButton=!1}render(){var e,t,i,r;const n=!this.value&&!this.forceClearButton;return qe`
      <div id="container">
        <slot name="icon"></slot>
        <label for="text-input" class="sr-only"
          >${(e=this.screenReaderLabel)!==null&&e!==void 0?e:h}</label
        >
        <input
          id="text-input"
          type="text"
          inputmode="search"
          enterkeyhint="search"
          autocapitalize="off"
          placeholder=${(t=this.placeholder)!==null&&t!==void 0?t:h}
          .value=${(i=this.value)!==null&&i!==void 0?i:h}
          aria-controls=${(r=this.ariaControls)!==null&&r!==void 0?r:h}
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
    `}onTextInput(){this.value=this.textInput.value}onKeyPress(e){if(e.key==="Enter"){this.textInput.blur();const t=new CustomEvent("submit",{detail:this.value});this.dispatchEvent(t)}}clearButtonClicked(){const e=this.textInput.value;this.value="",this.focusOnClear&&this.textInput.focus();const t=new CustomEvent("clear",{detail:e});this.dispatchEvent(t);const i=new InputEvent("input",{inputType:"deleteContentBackward"});this.dispatchEvent(i)}};v.shadowRootOptions={...P.shadowRootOptions,delegatesFocus:!0};v.styles=Ue`
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
  `;m([k({type:String})],v.prototype,"value",void 0);m([k({type:String})],v.prototype,"placeholder",void 0);m([k({type:String})],v.prototype,"screenReaderLabel",void 0);m([k({type:String})],v.prototype,"clearButtonScreenReaderLabel",void 0);m([k({type:String})],v.prototype,"ariaControls",void 0);m([k({type:Boolean})],v.prototype,"focusOnClear",void 0);m([k({type:Boolean,reflect:!0})],v.prototype,"forceClearButton",void 0);m([et("#text-input")],v.prototype,"textInput",void 0);v=m([Ge("ia-clearable-text-input")],v);var tt=Object.defineProperty,it=Object.getOwnPropertyDescriptor,$=(o,e,t,i)=>{for(var r=i>1?void 0:i?it(e,t):e,n=o.length-1,s;n>=0;n--)(s=o[n])&&(r=(i?s(e,t,r):s(r))||r);return i&&r&&tt(e,t,r),r};const ye={CategoryChanged:"categoryChanged",SearchRequested:"searchRequested"};let y=class extends _e{constructor(){super(...arguments),this.categories=[],this.useMobileView=!1,this.hideDropdown=!1,this.loading=!1}get resolvedCategory(){return this.selectedCategory??this.categories?.[0]?.id??""}render(){return _`
      <div id="container" part="container" role="search">
        <div
          id="main-bar"
          part="main-bar"
          class=${this.hideDropdown?"no-dropdown":W}
        >
          ${this.hideDropdown?W:this.dropdownTemplate}
          ${this.textBoxTemplate} ${this.searchButtonTemplate}
        </div>
      </div>
    `}willUpdate(o){if(o.has("selectedCategory")||o.has("categories")){const e=this.resolvedCategory;this.categoryDropdown&&this.categoryDropdown.selectedOption!==e&&(this.categoryDropdown.selectedOption=e)}}get dropdownTemplate(){return _`
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
    `}get textBoxTemplate(){return _`
      <ia-clearable-text-input
        id="search-input"
        part="search-input"
        .value=${this.spacedQuery}
        placeholder=${this.placeholder??q("Search")}
        clearButtonScreenReaderLabel=${q("Clear search query")}
        screenReaderLabel=${q("Search the Archive. Filters and Advanced Search available below.")}
        @clear=${this.searchFieldCleared}
        @submit=${this.handleSubmit}
      ></ia-clearable-text-input>
    `}get searchButtonTemplate(){return _`
      <button
        id="search-button"
        part="search-button"
        class=${this.loading?"loading":W}
        type="button"
        aria-label=${q("Search")}
        @click=${this.handleSubmit}
      >
        ${this.loading?_`<ia-status-indicator
              mode="loading"
              class="search-button-loading-icon"
            ></ia-status-indicator>`:_`<img src=${Be} alt="" />`}
      </button>
    `}get selectedCategoryLabel(){return this.categories.find(e=>e.id===this.resolvedCategory)?.label??this.resolvedCategory}get spacedQuery(){return this.query?.replace(/\+/g," ")??""}searchFieldCleared(){this.query&&this.emitSearchRequested()}handleSubmit(){this.emitSearchRequested()}handleCategorySelected(o){const e=o.detail.option.id;e!==this.resolvedCategory&&(this.selectedCategory=e,setTimeout(()=>this.searchInput.focus()),this.dispatchEvent(new CustomEvent(ye.CategoryChanged,{detail:e})))}emitSearchRequested(){this.dispatchEvent(new CustomEvent(ye.SearchRequested,{detail:{query:this.searchInput.value,category:this.resolvedCategory}}))}static get styles(){const o=we`
      :host {
        --search-bar-height--: var(--search-bar-height, 30px);
        --search-bar-width--: var(--search-bar-width, 300px);
        --search-bar-internal-padding--: var(--padding-sm, 5px);
        --clear-button-offset--: var(--clear-button-offset, 0);
        /* While it would be nice to fall back to ia-dropdown's own default here by making this var
           fall back to "initial", older Safari versions don't support that keyword in a var() fallback.
           So instead we just restate ia-dropdown's current default 2 here as the fallback. */
        --dropdown-z-index--: var(--dropdown-z-index, 2);
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
    `;return[Pe,o]}};$([C({type:String})],y.prototype,"query",2);$([C({type:Array})],y.prototype,"categories",2);$([C({type:String})],y.prototype,"selectedCategory",2);$([C({type:String})],y.prototype,"placeholder",2);$([C({type:Boolean})],y.prototype,"useMobileView",2);$([C({type:Boolean})],y.prototype,"hideDropdown",2);$([C({type:Boolean})],y.prototype,"loading",2);$([E("#search-input")],y.prototype,"searchInput",2);$([E("#category-dropdown")],y.prototype,"categoryDropdown",2);y=$([me("ia-dropdown-search-bar"),Oe()],y);var rt=Object.defineProperty,ot=Object.getOwnPropertyDescriptor,b=(o,e,t,i)=>{for(var r=i>1?void 0:i?ot(e,t):e,n=o.length-1,s;n>=0;n--)(s=o[n])&&(r=(i?s(e,t,r):s(r))||r);return i&&r&&rt(e,t,r),r};const nt=[{label:"Bar height",cssVariable:"--ia-theme-search-bar-height",defaultValue:"30px",inputType:"text"},{label:"Bar width",cssVariable:"--ia-theme-search-bar-width",defaultValue:"300px",inputType:"text"},{label:"Internal padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown z-index",cssVariable:"--dropdown-z-index",defaultValue:2,inputType:"number",min:0,step:1}],fe=[{id:"all",label:"All"},{id:"texts",label:"Books/Documents"},{id:"fulltext",label:"Text Contents"},{id:"radio",label:"Radio"},{id:"tv",label:"TV"},{id:"movies",label:"Video"},{id:"audio",label:"Audio"},{id:"software",label:"Software"},{id:"image",label:"Images"},{id:"etree",label:"Live Music"},{id:"collection",label:"Collections"},{id:"data",label:"Data"},{id:"web",label:"Web Sites"}],st="all",$e="Search";let g=class extends _e{constructor(){super(...arguments),this.query="",this.selectedCategory=st,this.placeholder=$e,this.hideDropdown=!1,this.loading=!1,this.announcerText=""}render(){return _`
      <story-template
        elementTag="ia-dropdown-search-bar"
        elementClassName="IADropdownSearchBar"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:nt}}
      >
        <div slot="demo">
          <ia-dropdown-search-bar
            .query=${this.query}
            .categories=${fe}
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
                  ${Re(fe,o=>_`<option value=${o.id}>
                        ${o.label}
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
                  value=${$e}
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
    `}get exampleUsage(){const{query:o,selectedCategory:e,placeholder:t,hideDropdown:i,loading:r}=this,n=a=>a?`"${a}"`:"",s={query:n(o),selectedCategory:n(e),placeholder:n(t),hideDropdown:i,loading:r};return`
      <ia-dropdown-search-bar
        .categories=\${[
          { id: 'foo', label: 'Foo Option' },
          { id: 'bar', label: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(s).map(([a,l])=>l?l===!0?a:`${a}=${l}`:"").join(`
  `)}
      >
      </ia-dropdown-search-bar>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(o){o.preventDefault(),this.query=this.queryInput.value,this.selectedCategory=this.selectedCategorySelect.value,this.placeholder=this.placeholderInput.value,this.hideDropdown=this.hideDropdownCheck.checked,this.loading=this.loadingCheck.checked}handleSearchRequested(o){this.announcerText=`Category ID "${o.detail.category}" / Query "${o.detail.query}"`}static get styles(){return we`
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
    `}};b([D()],g.prototype,"query",2);b([D()],g.prototype,"selectedCategory",2);b([D()],g.prototype,"placeholder",2);b([D()],g.prototype,"hideDropdown",2);b([D()],g.prototype,"loading",2);b([D()],g.prototype,"announcerText",2);b([E("#settings__query")],g.prototype,"queryInput",2);b([E("#settings__selected-category")],g.prototype,"selectedCategorySelect",2);b([E("#settings__placeholder")],g.prototype,"placeholderInput",2);b([E("#settings__hide-dropdown")],g.prototype,"hideDropdownCheck",2);b([E("#settings__loading")],g.prototype,"loadingCheck",2);g=b([me("ia-dropdown-search-bar-story")],g);export{g as IADropdownSearchBarStory};
