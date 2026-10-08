import{n as B,e as T,c as Se,i as Ae,A as G,b as C,m as V,a as Ee,r as I}from"./index-BTAXPDVy.js";import{t as Me}from"./story-template-C6ly9hLK.js";import{l as ze}from"./localized-decorator-Be1Jx-O-.js";import"./ia-clearable-text-input-rugLamg0.js";import"./ia-status-indicator-DDShpKcz.js";import"./masked-icon-qbg3A7vs.js";function*Ne(i,e){if(i!==void 0){let t=0;for(const o of i)yield e(o,t++)}}const qe="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20class='fill-color'%20d='m17.0555551%2041.3194459c0-12.7430552%2010.3541664-23.1027772%2023.0847216-23.1027772%2012.7166664%200%2023.0777773%2010.359722%2023.0777773%2023.1027772%200%2012.7361108-10.3611109%2023.0986106-23.0777773%2023.0986106-12.7305552%200-23.0847216-10.3624998-23.0847216-23.0986106zm-17.24305512%200c0%2022.2916661%2018.04583292%2040.3472213%2040.32777672%2040.3472213%208.9208332%200%2017.145833-2.9319449%2023.8194439-7.8527776l24.1513883%2024.0777771c1.2125%201.1402778%202.8430555%201.8430556%204.6374999%201.8430556%203.7444443%200%206.7805554-3.0361111%206.7805554-6.7791665%200-2.0652778-.9222222-3.9069444-2.3736111-5.1499999l-23.718055-23.7458328c4.4152777-6.4791665%207.0152776-14.3055552%207.0152776-22.7402772%200-22.2791661-18.0458328-40.34861006-40.312499-40.34861006-22.2819438%200-40.32777672%2018.06944396-40.32777672%2040.34861006z'%20fill='%232c2c2c'%20fill-rule='evenodd'%20/%3e%3c/svg%3e";function u(i,e,t,o){var r=arguments.length,n=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(i,e,t,o);else for(var l=i.length-1;l>=0;l--)(s=i[l])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n}const W=window,ae=W.ShadowRoot&&(W.ShadyCSS===void 0||W.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,le=Symbol(),pe=new WeakMap;let ke=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==le)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(ae&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=pe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&pe.set(t,e))}return e}toString(){return this.cssText}};const je=i=>new ke(typeof i=="string"?i:i+"",void 0,le),m=(i,...e)=>{const t=i.length===1?i[0]:e.reduce(((o,r,n)=>o+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[n+1]),i[0]);return new ke(t,i,le)},Ve=(i,e)=>{ae?i.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((t=>{const o=document.createElement("style"),r=W.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=t.cssText,i.appendChild(o)}))},ce=ae?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return je(t)})(i):i;var Q;const K=window,he=K.trustedTypes,We=he?he.emptyScript:"",ue=K.reactiveElementPolyfillSupport,re={toAttribute(i,e){switch(e){case Boolean:i=i?We:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Be=(i,e)=>e!==i&&(e==e||i==i),J={attribute:!0,type:String,converter:re,reflect:!1,hasChanged:Be},ie="finalized";let P=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,o)=>{const r=this._$Ep(o,t);r!==void 0&&(this._$Ev.set(r,o),e.push(r))})),e}static createProperty(e,t=J){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const o=typeof e=="symbol"?Symbol():"__"+e,r=this.getPropertyDescriptor(e,o,t);r!==void 0&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,o){return{get(){return this[t]},set(r){const n=this[e];this[t]=r,this.requestUpdate(e,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||J}static finalize(){if(this.hasOwnProperty(ie))return!1;this[ie]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,o=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const r of o)this.createProperty(r,t[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const r of o)t.unshift(ce(r))}else e!==void 0&&t.push(ce(e));return t}static _$Ep(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach((t=>t(this)))}addController(e){var t,o;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((o=e.hostConnected)===null||o===void 0||o.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Ve(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach((t=>{var o;return(o=t.hostConnected)===null||o===void 0?void 0:o.call(t)}))}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach((t=>{var o;return(o=t.hostDisconnected)===null||o===void 0?void 0:o.call(t)}))}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$EO(e,t,o=J){var r;const n=this.constructor._$Ep(e,o);if(n!==void 0&&o.reflect===!0){const s=(((r=o.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?o.converter:re).toAttribute(t,o.type);this._$El=e,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(e,t){var o;const r=this.constructor,n=r._$Ev.get(e);if(n!==void 0&&this._$El!==n){const s=r.getPropertyOptions(n),l=typeof s.converter=="function"?{fromAttribute:s.converter}:((o=s.converter)===null||o===void 0?void 0:o.fromAttribute)!==void 0?s.converter:re;this._$El=n,this[n]=l.fromAttribute(t,s.type),this._$El=null}}requestUpdate(e,t,o){let r=!0;e!==void 0&&(((o=o||this.constructor.getPropertyOptions(e)).hasChanged||Be)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),o.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,o))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((r,n)=>this[n]=r)),this._$Ei=void 0);let t=!1;const o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),(e=this._$ES)===null||e===void 0||e.forEach((r=>{var n;return(n=r.hostUpdate)===null||n===void 0?void 0:n.call(r)})),this.update(o)):this._$Ek()}catch(r){throw t=!1,this._$Ek(),r}t&&this._$AE(o)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach((o=>{var r;return(r=o.hostUpdated)===null||r===void 0?void 0:r.call(o)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach(((t,o)=>this._$EO(o,this[o],t))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};P[ie]=!0,P.elementProperties=new Map,P.elementStyles=[],P.shadowRootOptions={mode:"open"},ue?.({ReactiveElement:P}),((Q=K.reactiveElementVersions)!==null&&Q!==void 0?Q:K.reactiveElementVersions=[]).push("1.6.3");var Y;const F=window,R=F.trustedTypes,ve=R?R.createPolicy("lit-html",{createHTML:i=>i}):void 0,ne="$lit$",S=`lit$${(Math.random()+"").slice(9)}$`,Te="?"+S,Ke=`<${Te}>`,k=document,M=()=>k.createComment(""),z=i=>i===null||typeof i!="object"&&typeof i!="function",Oe=Array.isArray,Fe=i=>Oe(i)||typeof i?.[Symbol.iterator]=="function",X=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,fe=/>/g,A=RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,me=/"/g,Pe=/^(?:script|style|textarea|title)$/i,De=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),f=De(1),Re=De(2),H=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),we=new WeakMap,E=k.createTreeWalker(k,129,null,!1);function He(i,e){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ve!==void 0?ve.createHTML(e):e}const Ze=(i,e)=>{const t=i.length-1,o=[];let r,n=e===2?"<svg>":"",s=U;for(let l=0;l<t;l++){const a=i[l];let d,c,p=-1,g=0;for(;g<a.length&&(s.lastIndex=g,c=s.exec(a),c!==null);)g=s.lastIndex,s===U?c[1]==="!--"?s=ge:c[1]!==void 0?s=fe:c[2]!==void 0?(Pe.test(c[2])&&(r=RegExp("</"+c[2],"g")),s=A):c[3]!==void 0&&(s=A):s===A?c[0]===">"?(s=r??U,p=-1):c[1]===void 0?p=-2:(p=s.lastIndex-c[2].length,d=c[1],s=c[3]===void 0?A:c[3]==='"'?me:be):s===me||s===be?s=A:s===ge||s===fe?s=U:(s=A,r=void 0);const x=s===A&&i[l+1].startsWith("/>")?" ":"";n+=s===U?a+Ke:p>=0?(o.push(d),a.slice(0,p)+ne+a.slice(p)+S+x):a+S+(p===-2?(o.push(void 0),l):x)}return[He(i,n+(i[t]||"<?>")+(e===2?"</svg>":"")),o]};class N{constructor({strings:e,_$litType$:t},o){let r;this.parts=[];let n=0,s=0;const l=e.length-1,a=this.parts,[d,c]=Ze(e,t);if(this.el=N.createElement(d,o),E.currentNode=this.el.content,t===2){const p=this.el.content,g=p.firstChild;g.remove(),p.append(...g.childNodes)}for(;(r=E.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes()){const p=[];for(const g of r.getAttributeNames())if(g.endsWith(ne)||g.startsWith(S)){const x=c[s++];if(p.push(g),x!==void 0){const Ue=r.getAttribute(x.toLowerCase()+ne).split(S),j=/([.?@])?(.*)/.exec(x);a.push({type:1,index:n,name:j[2],strings:Ue,ctor:j[1]==="."?Qe:j[1]==="?"?Ye:j[1]==="@"?Xe:Z})}else a.push({type:6,index:n})}for(const g of p)r.removeAttribute(g)}if(Pe.test(r.tagName)){const p=r.textContent.split(S),g=p.length-1;if(g>0){r.textContent=R?R.emptyScript:"";for(let x=0;x<g;x++)r.append(p[x],M()),E.nextNode(),a.push({type:2,index:++n});r.append(p[g],M())}}}else if(r.nodeType===8)if(r.data===Te)a.push({type:2,index:n});else{let p=-1;for(;(p=r.data.indexOf(S,p+1))!==-1;)a.push({type:7,index:n}),p+=S.length-1}n++}}static createElement(e,t){const o=k.createElement("template");return o.innerHTML=e,o}}function L(i,e,t=i,o){var r,n,s,l;if(e===H)return e;let a=o!==void 0?(r=t._$Co)===null||r===void 0?void 0:r[o]:t._$Cl;const d=z(e)?void 0:e._$litDirective$;return a?.constructor!==d&&((n=a?._$AO)===null||n===void 0||n.call(a,!1),d===void 0?a=void 0:(a=new d(i),a._$AT(i,t,o)),o!==void 0?((s=(l=t)._$Co)!==null&&s!==void 0?s:l._$Co=[])[o]=a:t._$Cl=a),a!==void 0&&(e=L(i,a._$AS(i,e.values),a,o)),e}class Ge{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:o},parts:r}=this._$AD,n=((t=e?.creationScope)!==null&&t!==void 0?t:k).importNode(o,!0);E.currentNode=n;let s=E.nextNode(),l=0,a=0,d=r[0];for(;d!==void 0;){if(l===d.index){let c;d.type===2?c=new q(s,s.nextSibling,this,e):d.type===1?c=new d.ctor(s,d.name,d.strings,this,e):d.type===6&&(c=new et(s,this,e)),this._$AV.push(c),d=r[++a]}l!==d?.index&&(s=E.nextNode(),l++)}return E.currentNode=k,n}v(e){let t=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class q{constructor(e,t,o,r){var n;this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=r,this._$Cp=(n=r?.isConnected)===null||n===void 0||n}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=L(this,e,t),z(e)?e===v||e==null||e===""?(this._$AH!==v&&this._$AR(),this._$AH=v):e!==this._$AH&&e!==H&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Fe(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==v&&z(this._$AH)?this._$AA.nextSibling.data=e:this.$(k.createTextNode(e)),this._$AH=e}g(e){var t;const{values:o,_$litType$:r}=e,n=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=N.createElement(He(r.h,r.h[0]),this.options)),r);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===n)this._$AH.v(o);else{const s=new Ge(n,this),l=s.u(this.options);s.v(o),this.$(l),this._$AH=s}}_$AC(e){let t=we.get(e.strings);return t===void 0&&we.set(e.strings,t=new N(e)),t}T(e){Oe(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,r=0;for(const n of e)r===t.length?t.push(o=new q(this.k(M()),this.k(M()),this,this.options)):o=t[r],o._$AI(n),r++;r<t.length&&(this._$AR(o&&o._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var o;for((o=this._$AP)===null||o===void 0||o.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class Z{constructor(e,t,o,r,n){this.type=1,this._$AH=v,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=v}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,o,r){const n=this.strings;let s=!1;if(n===void 0)e=L(this,e,t,0),s=!z(e)||e!==this._$AH&&e!==H,s&&(this._$AH=e);else{const l=e;let a,d;for(e=n[0],a=0;a<n.length-1;a++)d=L(this,l[o+a],t,a),d===H&&(d=this._$AH[a]),s||(s=!z(d)||d!==this._$AH[a]),d===v?e=v:e!==v&&(e+=(d??"")+n[a+1]),this._$AH[a]=d}s&&!r&&this.j(e)}j(e){e===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Qe extends Z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===v?void 0:e}}const Je=R?R.emptyScript:"";class Ye extends Z{constructor(){super(...arguments),this.type=4}j(e){e&&e!==v?this.element.setAttribute(this.name,Je):this.element.removeAttribute(this.name)}}class Xe extends Z{constructor(e,t,o,r,n){super(e,t,o,r,n),this.type=5}_$AI(e,t=this){var o;if((e=(o=L(this,e,t,0))!==null&&o!==void 0?o:v)===H)return;const r=this._$AH,n=e===v&&r!==v||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==v&&(r===v||n);n&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,o;typeof this._$AH=="function"?this._$AH.call((o=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&o!==void 0?o:this.element,e):this._$AH.handleEvent(e)}}class et{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){L(this,e)}}const ye=F.litHtmlPolyfillSupport;ye?.(N,q),((Y=F.litHtmlVersions)!==null&&Y!==void 0?Y:F.litHtmlVersions=[]).push("2.8.0");const tt=(i,e,t)=>{var o,r;const n=(o=t?.renderBefore)!==null&&o!==void 0?o:e;let s=n._$litPart$;if(s===void 0){const l=(r=t?.renderBefore)!==null&&r!==void 0?r:null;n._$litPart$=s=new q(e.insertBefore(M(),l),l,void 0,t??{})}return s._$AI(i),s};var ee,te;class D extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const o=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=o.firstChild),o}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=tt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return H}}D.finalized=!0,D._$litElement$=!0,(ee=globalThis.litElementHydrateSupport)===null||ee===void 0||ee.call(globalThis,{LitElement:D});const $e=globalThis.litElementPolyfillSupport;$e?.({LitElement:D});((te=globalThis.litElementVersions)!==null&&te!==void 0?te:globalThis.litElementVersions=[]).push("3.3.3");const Le=i=>e=>typeof e=="function"?((t,o)=>(customElements.define(t,o),o))(i,e):((t,o)=>{const{kind:r,elements:n}=o;return{kind:r,elements:n,finisher(s){customElements.define(t,s)}}})(i,e);const ot=(i,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,i)}},rt=(i,e,t)=>{e.constructor.createProperty(t,i)};function b(i){return(e,t)=>t!==void 0?rt(i,e,t):ot(i,e)}const Ie=({finisher:i,descriptor:e})=>(t,o)=>{var r;if(o===void 0){const n=(r=t.originalKey)!==null&&r!==void 0?r:t.key,s=e!=null?{kind:"method",placement:"prototype",key:n,descriptor:e(t.key)}:{...t,key:n};return i!=null&&(s.finisher=function(l){i(l,n)}),s}{const n=t.constructor;e!==void 0&&Object.defineProperty(t,o,e(o)),i?.(n,o)}};function de(i,e){return Ie({descriptor:t=>({get(){var r,n;return(n=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(i))!==null&&n!==void 0?n:null},enumerable:!0,configurable:!0})})}var oe;const it=((oe=window.HTMLSlotElement)===null||oe===void 0?void 0:oe.prototype.assignedElements)!=null?(i,e)=>i.assignedElements(e):(i,e)=>i.assignedNodes(e).filter((t=>t.nodeType===Node.ELEMENT_NODE));function nt(i){const{slot:e,selector:t}=i??{};return Ie({descriptor:o=>({get(){var r;const n="slot"+(e?`[name=${e}]`:":not([name])"),s=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(n),l=s!=null?it(s,i):[];return t?l.filter((a=>a.matches(t))):l},enumerable:!0,configurable:!0})})}function O(i,e,t){return i?e():t?.()}const st=Re`<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>`,at=Re`<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>`;let h=class extends D{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionGroup="options",this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=e=>{switch(e.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=e=>{e&&e.type==="click"&&e.stopPropagation(),this.open=!1,this.updatePopoverState()}}async firstUpdated(){await new Promise(e=>{setTimeout(e,0)}),this.addEventListener("closeDropdown",this.closeOptions)}willUpdate(e){e.has("open")&&this.updatePopoverState()}disconnectedCallback(){var e;(e=super.disconnectedCallback)===null||e===void 0||e.call(this),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){var e,t;this.usePopover&&((t=(e=this.dropdownMenu)===null||e===void 0?void 0:e.togglePopover)===null||t===void 0||t.call(e,this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;const e=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${e.left}px`,this.dropdownMenu.style.top=`${e.bottom}px`,this.dropdownMenu.style.minWidth=`${e.width}px`}mainButtonClicked(){var e;this.openViaButton?this.toggleOptions():(e=this.mainButtonLabelSlotted[0])===null||e===void 0||e.click()}mainButtonKeyDown(e){(e.key==="Enter"||e.key===" ")&&(this.mainButtonClicked(),e.preventDefault())}caretKeyDown(e){(e.key==="Enter"||e.key===" ")&&(this.toggleOptions(),e.preventDefault())}renderOption(e){const{label:t,url:o=void 0,id:r}=e;let n;const s=this.selectedOption===r?"selected":"";return o?n=f`<a
        href=${o}
        @click=${l=>this.optionClicked(l,e)}
        >${t}</a
      >`:n=f`<button
        @click=${l=>this.optionClicked(l,e)}
      >
        ${t}
      </button>`,f`<li role="menuitem" class=${s}>${n}</li>`}optionClicked(e,t){var o;e.stopPropagation(),this.selectedOption!==t.id&&(this.selectedOption=t.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:t}})),(o=t.selectedHandler)===null||o===void 0||o.call(t,t)),this.closeOnSelect&&(this.closeOptions(),this.mainButton.focus())}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(e=>this.selectedOption!==e.id)}get caretUpTemplate(){return f`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${st}</slot>
      </span>
    `}get caretDownTemplate(){return f`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${at}</slot>
      </span>
    `}get caretTemplate(){return this.displayCaret?this.openViaButton?f`
        <span class="caret" aria-hidden="true">
          ${this.caretUpTemplate} ${this.caretDownTemplate}
        </span>
      `:f`
      <button
        class="caret"
        aria-labelledby="caret-label"
        aria-haspopup="true"
        aria-expanded=${this.open}
        @click=${O(this.shouldAttachEventHandlers,()=>this.toggleOptions)}
        @keydown=${O(this.shouldAttachEventHandlers,()=>this.caretKeyDown)}
        ?disabled=${this.isDisabled}
      >
        ${this.caretUpTemplate} ${this.caretDownTemplate}
      </button>
    `:f``}get dropdownTemplate(){return this.isCustomList?f`<slot name="list"></slot>`:f`${this.availableOptions.map(e=>this.renderOption(e))}`}get backdropTemplate(){return this.closeOnBackdropClick?this.open?f`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `:f``:f``}get shouldNestCaretInButton(){return this.openViaButton}get shouldAttachEventHandlers(){return!this.isDisabled&&!this.hasCustomClickHandler}render(){return f`
      <div class="ia-dropdown-group ${this.open?"open":""}">
        <div class="button-row">
          <button
            class="click-main"
            aria-haspopup=${this.openViaButton}
            aria-expanded=${this.open}
            @click=${O(this.shouldAttachEventHandlers,()=>this.mainButtonClicked)}
            @keydown=${O(this.shouldAttachEventHandlers,()=>this.mainButtonKeyDown)}
            ?disabled=${this.isDisabled}
          >
            <span class="sr-only" id="caret-label"
              >Toggle ${this.optionGroup}</span
            >
            <slot name="dropdown-label"></slot>
            ${O(this.shouldNestCaretInButton,()=>this.caretTemplate)}
          </button>
          ${O(!this.shouldNestCaretInButton,()=>this.caretTemplate)}
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
    `}static get styles(){const e=m`var(--dropdownBorderWidth, 1px)`,t=m`var(--dropdownBorderRadius, 4px)`,o=m`var(--dropdownBorderColor, #fff)`,r=m`var(--dropdownBgColor, #333)`,n=m`var(--dropdownTextColor, #fff)`,s=m`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,l=m`var(--dropdownSelectedBgColor, #fff)`,a=m`var(--dropdownMainButtonBgColor, transparent)`,d=m`var(--dropdownTextAlign, inherit)`,c=m`var(--dropdownBackdropZIndex, 1)`,p=m`var(--dropdownListZIndex, 2)`;return m`
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
      }

      .open button.click-main {
        /* When the dropdown is open, give the buttom the same z-index
           as the dropdown menu, so that it remains clickable despite
           the backdrop. */
        z-index: ${p};
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
        z-index: ${c};
      }

      ul {
        z-index: ${p};
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
        background-color: ${s};
        color: var(--dropdownHoverTextColor, #fff);
        list-style: none;
        cursor: pointer;
      }

      #dropdown-main li:hover:first-child {
        border-top-color: ${s};
      }

      ul#dropdown-main li:hover:last-child {
        border-bottom-color: ${s};
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
        background-color: ${s};
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
        color: ${n};
        background: var(--dropdownItemButtonBgColor, transparent);
        padding: var(--dropdownItemButtonPadding, 0);
        text-align: ${d};
      }
    `}};u([b({type:Boolean,reflect:!0})],h.prototype,"open",void 0);u([b({type:Boolean,reflect:!0})],h.prototype,"isDisabled",void 0);u([b({type:Boolean})],h.prototype,"displayCaret",void 0);u([b({type:Boolean})],h.prototype,"closeOnSelect",void 0);u([b({type:Boolean})],h.prototype,"openViaButton",void 0);u([b({type:Boolean})],h.prototype,"usePopover",void 0);u([b({type:Boolean})],h.prototype,"includeSelectedOption",void 0);u([b({type:String})],h.prototype,"selectedOption",void 0);u([b({attribute:!1})],h.prototype,"options",void 0);u([b({type:String})],h.prototype,"optionGroup",void 0);u([b({attribute:!1})],h.prototype,"optionSelected",void 0);u([b({type:Boolean,reflect:!0})],h.prototype,"isCustomList",void 0);u([b({type:Boolean,reflect:!0})],h.prototype,"hasCustomClickHandler",void 0);u([b({type:Boolean,reflect:!0})],h.prototype,"closeOnEscape",void 0);u([b({type:Boolean,reflect:!0})],h.prototype,"closeOnBackdropClick",void 0);u([de(".ia-dropdown-group")],h.prototype,"container",void 0);u([de("#dropdown-main")],h.prototype,"dropdownMenu",void 0);u([de(".click-main")],h.prototype,"mainButton",void 0);u([nt({slot:"dropdown-label"})],h.prototype,"mainButtonLabelSlotted",void 0);h=u([Le("ia-dropdown")],h);let se=class extends D{render(){return f`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `}};se.styles=m`
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
  `;se=u([Le("ia-icon-label")],se);var lt=Object.defineProperty,dt=Object.getOwnPropertyDescriptor,_=(i,e,t,o)=>{for(var r=o>1?void 0:o?dt(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&lt(e,t,r),r};const xe={CategoryChanged:"categoryChanged",SearchRequested:"searchRequested"};let $=class extends Ae{constructor(){super(...arguments),this.categories=[],this.useMobileView=!1,this.hideDropdown=!1,this.loading=!1}get resolvedCategory(){return this.selectedCategory??this.categories?.[0]?.id??""}render(){return C`
      <div id="container" part="container" role="search">
        <div
          id="main-bar"
          part="main-bar"
          class=${this.hideDropdown?"no-dropdown":G}
        >
          ${this.hideDropdown?G:this.dropdownTemplate}
          ${this.textBoxTemplate} ${this.searchButtonTemplate}
        </div>
      </div>
    `}willUpdate(i){if(i.has("selectedCategory")||i.has("categories")){const e=this.resolvedCategory;this.categoryDropdown&&this.categoryDropdown.selectedOption!==e&&(this.categoryDropdown.selectedOption=e)}}get dropdownTemplate(){return C`
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
    `}get textBoxTemplate(){return C`
      <ia-clearable-text-input
        id="search-input"
        part="search-input"
        .value=${this.spacedQuery}
        placeholder=${this.placeholder??V("Search")}
        clearButtonScreenReaderLabel=${V("Clear search query")}
        screenReaderLabel=${V("Search the Archive. Filters and Advanced Search available below.")}
        @clear=${this.searchFieldCleared}
        @submit=${this.handleSubmit}
      ></ia-clearable-text-input>
    `}get searchButtonTemplate(){return C`
      <button
        id="search-button"
        part="search-button"
        class=${this.loading?"loading":G}
        type="button"
        aria-label=${V("Search")}
        @click=${this.handleSubmit}
      >
        ${this.loading?C`<ia-status-indicator
              mode="loading"
              class="search-button-loading-icon"
            ></ia-status-indicator>`:C`<img src=${qe} alt="" />`}
      </button>
    `}get selectedCategoryLabel(){return this.categories.find(e=>e.id===this.resolvedCategory)?.label??this.resolvedCategory}get spacedQuery(){return this.query?.replace(/\+/g," ")??""}searchFieldCleared(){this.query&&this.emitSearchRequested()}handleSubmit(){this.emitSearchRequested()}handleCategorySelected(i){const e=i.detail.option.id;e!==this.resolvedCategory&&(this.selectedCategory=e,setTimeout(()=>this.searchInput.focus()),this.dispatchEvent(new CustomEvent(xe.CategoryChanged,{detail:e})))}emitSearchRequested(){this.dispatchEvent(new CustomEvent(xe.SearchRequested,{detail:{query:this.searchInput.value,category:this.resolvedCategory}}))}static get styles(){const i=Ee`
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
    `;return[Me,i]}};_([B({type:String})],$.prototype,"query",2);_([B({type:Array})],$.prototype,"categories",2);_([B({type:String})],$.prototype,"selectedCategory",2);_([B({type:String})],$.prototype,"placeholder",2);_([B({type:Boolean})],$.prototype,"useMobileView",2);_([B({type:Boolean})],$.prototype,"hideDropdown",2);_([B({type:Boolean})],$.prototype,"loading",2);_([T("#search-input")],$.prototype,"searchInput",2);_([T("#category-dropdown")],$.prototype,"categoryDropdown",2);$=_([Se("ia-dropdown-search-bar"),ze()],$);var pt=Object.defineProperty,ct=Object.getOwnPropertyDescriptor,y=(i,e,t,o)=>{for(var r=o>1?void 0:o?ct(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&pt(e,t,r),r};const ht=[{label:"Bar height",cssVariable:"--ia-theme-search-bar-height",defaultValue:"30px",inputType:"text"},{label:"Bar width",cssVariable:"--ia-theme-search-bar-width",defaultValue:"300px",inputType:"text"},{label:"Internal padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown z-index",cssVariable:"--dropdown-z-index",defaultValue:2,inputType:"number",min:0,step:1}],_e=[{id:"all",label:"All"},{id:"texts",label:"Books/Documents"},{id:"fulltext",label:"Text Contents"},{id:"radio",label:"Radio"},{id:"tv",label:"TV"},{id:"movies",label:"Video"},{id:"audio",label:"Audio"},{id:"software",label:"Software"},{id:"image",label:"Images"},{id:"etree",label:"Live Music"},{id:"collection",label:"Collections"},{id:"data",label:"Data"},{id:"web",label:"Web Sites"}],ut="all",Ce="Search";let w=class extends Ae{constructor(){super(...arguments),this.query="",this.selectedCategory=ut,this.placeholder=Ce,this.hideDropdown=!1,this.loading=!1,this.announcerText=""}render(){return C`
      <story-template
        elementTag="ia-dropdown-search-bar"
        elementClassName="IADropdownSearchBar"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:ht}}
      >
        <div slot="demo">
          <ia-dropdown-search-bar
            .query=${this.query}
            .categories=${_e}
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
                  ${Ne(_e,i=>C`<option value=${i.id}>
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
                  value=${Ce}
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
    `}get exampleUsage(){const{query:i,selectedCategory:e,placeholder:t,hideDropdown:o,loading:r}=this,n=a=>a?`"${a}"`:"",s={query:n(i),selectedCategory:n(e),placeholder:n(t),hideDropdown:o,loading:r};return`
      <ia-dropdown-search-bar
        .categories=\${[
          { id: 'foo', label: 'Foo Option' },
          { id: 'bar', label: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(s).map(([a,d])=>d?d===!0?a:`${a}=${d}`:"").join(`
  `)}
      >
      </ia-dropdown-search-bar>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(i){i.preventDefault(),this.query=this.queryInput.value,this.selectedCategory=this.selectedCategorySelect.value,this.placeholder=this.placeholderInput.value,this.hideDropdown=this.hideDropdownCheck.checked,this.loading=this.loadingCheck.checked}handleSearchRequested(i){this.announcerText=`Category ID "${i.detail.category}" / Query "${i.detail.query}"`}static get styles(){return Ee`
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
    `}};y([I()],w.prototype,"query",2);y([I()],w.prototype,"selectedCategory",2);y([I()],w.prototype,"placeholder",2);y([I()],w.prototype,"hideDropdown",2);y([I()],w.prototype,"loading",2);y([I()],w.prototype,"announcerText",2);y([T("#settings__query")],w.prototype,"queryInput",2);y([T("#settings__selected-category")],w.prototype,"selectedCategorySelect",2);y([T("#settings__placeholder")],w.prototype,"placeholderInput",2);y([T("#settings__hide-dropdown")],w.prototype,"hideDropdownCheck",2);y([T("#settings__loading")],w.prototype,"loadingCheck",2);w=y([Se("ia-dropdown-search-bar-story")],w);export{w as IADropdownSearchBarStory};
