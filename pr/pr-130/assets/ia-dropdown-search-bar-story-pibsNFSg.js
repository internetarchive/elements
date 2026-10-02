import{n as O,e as P,c as kt,i as Et,A as J,b as S,m as W,a as Bt,r as U}from"./index-Bbnj3hbu.js";import{t as zt}from"./story-template-DbhFk2JH.js";import{l as Nt}from"./localized-decorator-CdzsCxTO.js";import{_ as p}from"./tslib.es6-RU1n5ZxP.js";import"./icon-close-BPTiwoxo.js";import"./ia-status-indicator-DwRVf4CT.js";import"./masked-icon-S5D__vsl.js";function*qt(r,t){if(r!==void 0){let e=0;for(const o of r)yield t(o,e++)}}const Vt="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20class='fill-color'%20d='m17.0555551%2041.3194459c0-12.7430552%2010.3541664-23.1027772%2023.0847216-23.1027772%2012.7166664%200%2023.0777773%2010.359722%2023.0777773%2023.1027772%200%2012.7361108-10.3611109%2023.0986106-23.0777773%2023.0986106-12.7305552%200-23.0847216-10.3624998-23.0847216-23.0986106zm-17.24305512%200c0%2022.2916661%2018.04583292%2040.3472213%2040.32777672%2040.3472213%208.9208332%200%2017.145833-2.9319449%2023.8194439-7.8527776l24.1513883%2024.0777771c1.2125%201.1402778%202.8430555%201.8430556%204.6374999%201.8430556%203.7444443%200%206.7805554-3.0361111%206.7805554-6.7791665%200-2.0652778-.9222222-3.9069444-2.3736111-5.1499999l-23.718055-23.7458328c4.4152777-6.4791665%207.0152776-14.3055552%207.0152776-22.7402772%200-22.2791661-18.0458328-40.34861006-40.312499-40.34861006-22.2819438%200-40.32777672%2018.06944396-40.32777672%2040.34861006z'%20fill='%232c2c2c'%20fill-rule='evenodd'%20/%3e%3c/svg%3e";const K=window,dt=K.ShadowRoot&&(K.ShadyCSS===void 0||K.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,pt=Symbol(),ht=new WeakMap;let Tt=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==pt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(dt&&t===void 0){const o=e!==void 0&&e.length===1;o&&(t=ht.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&ht.set(e,t))}return t}toString(){return this.cssText}};const jt=r=>new Tt(typeof r=="string"?r:r+"",void 0,pt),m=(r,...t)=>{const e=r.length===1?r[0]:t.reduce(((o,i,n)=>o+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1]),r[0]);return new Tt(e,r,pt)},Wt=(r,t)=>{dt?r.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((e=>{const o=document.createElement("style"),i=K.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=e.cssText,r.appendChild(o)}))},ut=dt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return jt(e)})(r):r;var Y;const F=window,vt=F.trustedTypes,Kt=vt?vt.emptyScript:"",gt=F.reactiveElementPolyfillSupport,nt={toAttribute(r,t){switch(t){case Boolean:r=r?Kt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Ot=(r,t)=>t!==r&&(t==t||r==r),X={attribute:!0,type:String,converter:nt,reflect:!1,hasChanged:Ot},st="finalized";let D=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,o)=>{const i=this._$Ep(o,e);i!==void 0&&(this._$Ev.set(i,o),t.push(i))})),t}static createProperty(t,e=X){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const o=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,o,e);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){return{get(){return this[e]},set(i){const n=this[t];this[e]=i,this.requestUpdate(t,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||X}static finalize(){if(this.hasOwnProperty(st))return!1;this[st]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,o=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of o)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const i of o)e.unshift(ut(i))}else t!==void 0&&e.push(ut(t));return e}static _$Ep(t,e){const o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach((e=>e(this)))}addController(t){var e,o;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((o=t.hostConnected)===null||o===void 0||o.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Wt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach((e=>{var o;return(o=e.hostConnected)===null||o===void 0?void 0:o.call(e)}))}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach((e=>{var o;return(o=e.hostDisconnected)===null||o===void 0?void 0:o.call(e)}))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EO(t,e,o=X){var i;const n=this.constructor._$Ep(t,o);if(n!==void 0&&o.reflect===!0){const s=(((i=o.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?o.converter:nt).toAttribute(e,o.type);this._$El=t,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(t,e){var o;const i=this.constructor,n=i._$Ev.get(t);if(n!==void 0&&this._$El!==n){const s=i.getPropertyOptions(n),l=typeof s.converter=="function"?{fromAttribute:s.converter}:((o=s.converter)===null||o===void 0?void 0:o.fromAttribute)!==void 0?s.converter:nt;this._$El=n,this[n]=l.fromAttribute(e,s.type),this._$El=null}}requestUpdate(t,e,o){let i=!0;t!==void 0&&(((o=o||this.constructor.getPropertyOptions(t)).hasChanged||Ot)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),o.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,o))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((i,n)=>this[n]=i)),this._$Ei=void 0);let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),(t=this._$ES)===null||t===void 0||t.forEach((i=>{var n;return(n=i.hostUpdate)===null||n===void 0?void 0:n.call(i)})),this.update(o)):this._$Ek()}catch(i){throw e=!1,this._$Ek(),i}e&&this._$AE(o)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach((o=>{var i;return(i=o.hostUpdated)===null||i===void 0?void 0:i.call(o)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach(((e,o)=>this._$EO(o,this[o],e))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};D[st]=!0,D.elementProperties=new Map,D.elementStyles=[],D.shadowRootOptions={mode:"open"},gt?.({ReactiveElement:D}),((Y=F.reactiveElementVersions)!==null&&Y!==void 0?Y:F.reactiveElementVersions=[]).push("1.6.3");var tt;const Z=window,I=Z.trustedTypes,bt=I?I.createPolicy("lit-html",{createHTML:r=>r}):void 0,at="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,Pt="?"+A,Ft=`<${Pt}>`,T=document,z=()=>T.createComment(""),N=r=>r===null||typeof r!="object"&&typeof r!="function",Rt=Array.isArray,Zt=r=>Rt(r)||typeof r?.[Symbol.iterator]=="function",et=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ft=/-->/g,mt=/>/g,E=RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),wt=/'/g,yt=/"/g,Dt=/^(?:script|style|textarea|title)$/i,It=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),f=It(1),Lt=It(2),L=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),$t=new WeakMap,B=T.createTreeWalker(T,129,null,!1);function Ht(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return bt!==void 0?bt.createHTML(t):t}const Gt=(r,t)=>{const e=r.length-1,o=[];let i,n=t===2?"<svg>":"",s=M;for(let l=0;l<e;l++){const a=r[l];let d,h,c=-1,b=0;for(;b<a.length&&(s.lastIndex=b,h=s.exec(a),h!==null);)b=s.lastIndex,s===M?h[1]==="!--"?s=ft:h[1]!==void 0?s=mt:h[2]!==void 0?(Dt.test(h[2])&&(i=RegExp("</"+h[2],"g")),s=E):h[3]!==void 0&&(s=E):s===E?h[0]===">"?(s=i??M,c=-1):h[1]===void 0?c=-2:(c=s.lastIndex-h[2].length,d=h[1],s=h[3]===void 0?E:h[3]==='"'?yt:wt):s===yt||s===wt?s=E:s===ft||s===mt?s=M:(s=E,i=void 0);const _=s===E&&r[l+1].startsWith("/>")?" ":"";n+=s===M?a+Ft:c>=0?(o.push(d),a.slice(0,c)+at+a.slice(c)+A+_):a+A+(c===-2?(o.push(void 0),l):_)}return[Ht(r,n+(r[e]||"<?>")+(t===2?"</svg>":"")),o]};class q{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let n=0,s=0;const l=t.length-1,a=this.parts,[d,h]=Gt(t,e);if(this.el=q.createElement(d,o),B.currentNode=this.el.content,e===2){const c=this.el.content,b=c.firstChild;b.remove(),c.append(...b.childNodes)}for(;(i=B.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes()){const c=[];for(const b of i.getAttributeNames())if(b.endsWith(at)||b.startsWith(A)){const _=h[s++];if(c.push(b),_!==void 0){const Mt=i.getAttribute(_.toLowerCase()+at).split(A),j=/([.?@])?(.*)/.exec(_);a.push({type:1,index:n,name:j[2],strings:Mt,ctor:j[1]==="."?Jt:j[1]==="?"?Xt:j[1]==="@"?te:G})}else a.push({type:6,index:n})}for(const b of c)i.removeAttribute(b)}if(Dt.test(i.tagName)){const c=i.textContent.split(A),b=c.length-1;if(b>0){i.textContent=I?I.emptyScript:"";for(let _=0;_<b;_++)i.append(c[_],z()),B.nextNode(),a.push({type:2,index:++n});i.append(c[b],z())}}}else if(i.nodeType===8)if(i.data===Pt)a.push({type:2,index:n});else{let c=-1;for(;(c=i.data.indexOf(A,c+1))!==-1;)a.push({type:7,index:n}),c+=A.length-1}n++}}static createElement(t,e){const o=T.createElement("template");return o.innerHTML=t,o}}function H(r,t,e=r,o){var i,n,s,l;if(t===L)return t;let a=o!==void 0?(i=e._$Co)===null||i===void 0?void 0:i[o]:e._$Cl;const d=N(t)?void 0:t._$litDirective$;return a?.constructor!==d&&((n=a?._$AO)===null||n===void 0||n.call(a,!1),d===void 0?a=void 0:(a=new d(r),a._$AT(r,e,o)),o!==void 0?((s=(l=e)._$Co)!==null&&s!==void 0?s:l._$Co=[])[o]=a:e._$Cl=a),a!==void 0&&(t=H(r,a._$AS(r,t.values),a,o)),t}class Qt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:o},parts:i}=this._$AD,n=((e=t?.creationScope)!==null&&e!==void 0?e:T).importNode(o,!0);B.currentNode=n;let s=B.nextNode(),l=0,a=0,d=i[0];for(;d!==void 0;){if(l===d.index){let h;d.type===2?h=new V(s,s.nextSibling,this,t):d.type===1?h=new d.ctor(s,d.name,d.strings,this,t):d.type===6&&(h=new ee(s,this,t)),this._$AV.push(h),d=i[++a]}l!==d?.index&&(s=B.nextNode(),l++)}return B.currentNode=T,n}v(t){let e=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class V{constructor(t,e,o,i){var n;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cp=(n=i?.isConnected)===null||n===void 0||n}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=H(this,t,e),N(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==L&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):Zt(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==u&&N(this._$AH)?this._$AA.nextSibling.data=t:this.$(T.createTextNode(t)),this._$AH=t}g(t){var e;const{values:o,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=q.createElement(Ht(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===n)this._$AH.v(o);else{const s=new Qt(n,this),l=s.u(this.options);s.v(o),this.$(l),this._$AH=s}}_$AC(t){let e=$t.get(t.strings);return e===void 0&&$t.set(t.strings,e=new q(t)),e}T(t){Rt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const n of t)i===e.length?e.push(o=new V(this.k(z()),this.k(z()),this,this.options)):o=e[i],o._$AI(n),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var o;for((o=this._$AP)===null||o===void 0||o.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class G{constructor(t,e,o,i,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,o,i){const n=this.strings;let s=!1;if(n===void 0)t=H(this,t,e,0),s=!N(t)||t!==this._$AH&&t!==L,s&&(this._$AH=t);else{const l=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=H(this,l[o+a],e,a),d===L&&(d=this._$AH[a]),s||(s=!N(d)||d!==this._$AH[a]),d===u?t=u:t!==u&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}s&&!i&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Jt extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}const Yt=I?I.emptyScript:"";class Xt extends G{constructor(){super(...arguments),this.type=4}j(t){t&&t!==u?this.element.setAttribute(this.name,Yt):this.element.removeAttribute(this.name)}}class te extends G{constructor(t,e,o,i,n){super(t,e,o,i,n),this.type=5}_$AI(t,e=this){var o;if((t=(o=H(this,t,e,0))!==null&&o!==void 0?o:u)===L)return;const i=this._$AH,n=t===u&&i!==u||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==u&&(i===u||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,o;typeof this._$AH=="function"?this._$AH.call((o=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&o!==void 0?o:this.element,t):this._$AH.handleEvent(t)}}class ee{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){H(this,t)}}const xt=Z.litHtmlPolyfillSupport;xt?.(q,V),((tt=Z.litHtmlVersions)!==null&&tt!==void 0?tt:Z.litHtmlVersions=[]).push("2.8.0");const oe=(r,t,e)=>{var o,i;const n=(o=e?.renderBefore)!==null&&o!==void 0?o:t;let s=n._$litPart$;if(s===void 0){const l=(i=e?.renderBefore)!==null&&i!==void 0?i:null;n._$litPart$=s=new V(t.insertBefore(z(),l),l,void 0,e??{})}return s._$AI(r),s};var ot,it;class k extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const o=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=o.firstChild),o}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=oe(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return L}}k.finalized=!0,k._$litElement$=!0,(ot=globalThis.litElementHydrateSupport)===null||ot===void 0||ot.call(globalThis,{LitElement:k});const _t=globalThis.litElementPolyfillSupport;_t?.({LitElement:k});((it=globalThis.litElementVersions)!==null&&it!==void 0?it:globalThis.litElementVersions=[]).push("3.3.3");const ct=r=>t=>typeof t=="function"?((e,o)=>(customElements.define(e,o),o))(r,t):((e,o)=>{const{kind:i,elements:n}=o;return{kind:i,elements:n,finisher(s){customElements.define(e,s)}}})(r,t);const ie=(r,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,r)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,r)}},re=(r,t,e)=>{t.constructor.createProperty(e,r)};function v(r){return(t,e)=>e!==void 0?re(r,t,e):ie(r,t)}const Ut=({finisher:r,descriptor:t})=>(e,o)=>{var i;if(o===void 0){const n=(i=e.originalKey)!==null&&i!==void 0?i:e.key,s=t!=null?{kind:"method",placement:"prototype",key:n,descriptor:t(e.key)}:{...e,key:n};return r!=null&&(s.finisher=function(l){r(l,n)}),s}{const n=e.constructor;t!==void 0&&Object.defineProperty(e,o,t(o)),r?.(n,o)}};function Q(r,t){return Ut({descriptor:e=>({get(){var i,n;return(n=(i=this.renderRoot)===null||i===void 0?void 0:i.querySelector(r))!==null&&n!==void 0?n:null},enumerable:!0,configurable:!0})})}var rt;const ne=((rt=window.HTMLSlotElement)===null||rt===void 0?void 0:rt.prototype.assignedElements)!=null?(r,t)=>r.assignedElements(t):(r,t)=>r.assignedNodes(t).filter((e=>e.nodeType===Node.ELEMENT_NODE));function se(r){const{slot:t,selector:e}=r??{};return Ut({descriptor:o=>({get(){var i;const n="slot"+(t?`[name=${t}]`:":not([name])"),s=(i=this.renderRoot)===null||i===void 0?void 0:i.querySelector(n),l=s!=null?ne(s,r):[];return e?l.filter((a=>a.matches(e))):l},enumerable:!0,configurable:!0})})}let y=class extends k{constructor(){super(...arguments),this.value="",this.clearButtonScreenReaderLabel="Clear",this.focusOnClear=!0,this.forceClearButton=!1}render(){var t,e,o,i;const n=!this.value&&!this.forceClearButton;return f`
      <div id="container">
        <slot name="icon"></slot>
        <label for="text-input" class="sr-only"
          >${(t=this.screenReaderLabel)!==null&&t!==void 0?t:u}</label
        >
        <input
          id="text-input"
          type="text"
          inputmode="search"
          enterkeyhint="search"
          autocapitalize="off"
          placeholder=${(e=this.placeholder)!==null&&e!==void 0?e:u}
          .value=${(o=this.value)!==null&&o!==void 0?o:u}
          aria-controls=${(i=this.ariaControls)!==null&&i!==void 0?i:u}
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
    `}onTextInput(){this.value=this.textInput.value}onKeyPress(t){if(t.key==="Enter"){this.textInput.blur();const e=new CustomEvent("submit",{detail:this.value});this.dispatchEvent(e)}}clearButtonClicked(){const t=this.textInput.value;this.value="",this.focusOnClear&&this.textInput.focus();const e=new CustomEvent("clear",{detail:t});this.dispatchEvent(e);const o=new InputEvent("input",{inputType:"deleteContentBackward"});this.dispatchEvent(o)}};y.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0};y.styles=m`
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
  `;p([v({type:String})],y.prototype,"value",void 0);p([v({type:String})],y.prototype,"placeholder",void 0);p([v({type:String})],y.prototype,"screenReaderLabel",void 0);p([v({type:String})],y.prototype,"clearButtonScreenReaderLabel",void 0);p([v({type:String})],y.prototype,"ariaControls",void 0);p([v({type:Boolean})],y.prototype,"focusOnClear",void 0);p([v({type:Boolean,reflect:!0})],y.prototype,"forceClearButton",void 0);p([Q("#text-input")],y.prototype,"textInput",void 0);y=p([ct("ia-clearable-text-input")],y);function R(r,t,e){return r?t():e?.()}const ae=Lt`<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>`,le=Lt`<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>`;let g=class extends k{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionGroup="options",this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=t=>{switch(t.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=t=>{t&&t.type==="click"&&t.stopPropagation(),this.open=!1,this.updatePopoverState()}}async firstUpdated(){await new Promise(t=>{setTimeout(t,0)}),this.addEventListener("closeDropdown",this.closeOptions)}willUpdate(t){t.has("open")&&this.updatePopoverState()}disconnectedCallback(){var t;(t=super.disconnectedCallback)===null||t===void 0||t.call(this),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){var t,e;this.usePopover&&((e=(t=this.dropdownMenu)===null||t===void 0?void 0:t.togglePopover)===null||e===void 0||e.call(t,this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;const t=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${t.left}px`,this.dropdownMenu.style.top=`${t.bottom}px`,this.dropdownMenu.style.minWidth=`${t.width}px`}mainButtonClicked(){var t;this.openViaButton?this.toggleOptions():(t=this.mainButtonLabelSlotted[0])===null||t===void 0||t.click()}mainButtonKeyDown(t){(t.key==="Enter"||t.key===" ")&&(this.mainButtonClicked(),t.preventDefault())}caretKeyDown(t){(t.key==="Enter"||t.key===" ")&&(this.toggleOptions(),t.preventDefault())}renderOption(t){const{label:e,url:o=void 0,id:i}=t;let n;const s=this.selectedOption===i?"selected":"";return o?n=f`<a
        href=${o}
        @click=${l=>this.optionClicked(l,t)}
        >${e}</a
      >`:n=f`<button
        @click=${l=>this.optionClicked(l,t)}
      >
        ${e}
      </button>`,f`<li role="menuitem" class=${s}>${n}</li>`}optionClicked(t,e){var o;t.stopPropagation(),this.selectedOption!==e.id&&(this.selectedOption=e.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:e}})),(o=e.selectedHandler)===null||o===void 0||o.call(e,e)),this.closeOnSelect&&(this.closeOptions(),this.mainButton.focus())}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(t=>this.selectedOption!==t.id)}get caretUpTemplate(){return f`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${ae}</slot>
      </span>
    `}get caretDownTemplate(){return f`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${le}</slot>
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
        @click=${R(this.shouldAttachEventHandlers,()=>this.toggleOptions)}
        @keydown=${R(this.shouldAttachEventHandlers,()=>this.caretKeyDown)}
        ?disabled=${this.isDisabled}
      >
        ${this.caretUpTemplate} ${this.caretDownTemplate}
      </button>
    `:f``}get dropdownTemplate(){return this.isCustomList?f`<slot name="list"></slot>`:f`${this.availableOptions.map(t=>this.renderOption(t))}`}get backdropTemplate(){return this.closeOnBackdropClick?this.open?f`
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
            @click=${R(this.shouldAttachEventHandlers,()=>this.mainButtonClicked)}
            @keydown=${R(this.shouldAttachEventHandlers,()=>this.mainButtonKeyDown)}
            ?disabled=${this.isDisabled}
          >
            <span class="sr-only" id="caret-label"
              >Toggle ${this.optionGroup}</span
            >
            <slot name="dropdown-label"></slot>
            ${R(this.shouldNestCaretInButton,()=>this.caretTemplate)}
          </button>
          ${R(!this.shouldNestCaretInButton,()=>this.caretTemplate)}
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
    `}static get styles(){const t=m`var(--dropdownBorderWidth, 1px)`,e=m`var(--dropdownBorderRadius, 4px)`,o=m`var(--dropdownBorderColor, #fff)`,i=m`var(--dropdownBgColor, #333)`,n=m`var(--dropdownTextColor, #fff)`,s=m`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,l=m`var(--dropdownSelectedBgColor, #fff)`,a=m`var(--dropdownMainButtonBgColor, transparent)`,d=m`var(--dropdownTextAlign, inherit)`,h=m`var(--dropdownBackdropZIndex, 1)`,c=m`var(--dropdownListZIndex, 2)`;return m`
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
        color: ${n};
        background: ${i};

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
        background: ${i};
        list-style: none;
        height: 30px;
        cursor: pointer;
        border-bottom: 0.5px solid ${i};
        border-top: 0.5px solid ${i};
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
    `}};p([v({type:Boolean,reflect:!0})],g.prototype,"open",void 0);p([v({type:Boolean,reflect:!0})],g.prototype,"isDisabled",void 0);p([v({type:Boolean})],g.prototype,"displayCaret",void 0);p([v({type:Boolean})],g.prototype,"closeOnSelect",void 0);p([v({type:Boolean})],g.prototype,"openViaButton",void 0);p([v({type:Boolean})],g.prototype,"usePopover",void 0);p([v({type:Boolean})],g.prototype,"includeSelectedOption",void 0);p([v({type:String})],g.prototype,"selectedOption",void 0);p([v({attribute:!1})],g.prototype,"options",void 0);p([v({type:String})],g.prototype,"optionGroup",void 0);p([v({attribute:!1})],g.prototype,"optionSelected",void 0);p([v({type:Boolean,reflect:!0})],g.prototype,"isCustomList",void 0);p([v({type:Boolean,reflect:!0})],g.prototype,"hasCustomClickHandler",void 0);p([v({type:Boolean,reflect:!0})],g.prototype,"closeOnEscape",void 0);p([v({type:Boolean,reflect:!0})],g.prototype,"closeOnBackdropClick",void 0);p([Q(".ia-dropdown-group")],g.prototype,"container",void 0);p([Q("#dropdown-main")],g.prototype,"dropdownMenu",void 0);p([Q(".click-main")],g.prototype,"mainButton",void 0);p([se({slot:"dropdown-label"})],g.prototype,"mainButtonLabelSlotted",void 0);g=p([ct("ia-dropdown")],g);let lt=class extends k{render(){return f`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `}};lt.styles=m`
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
  `;lt=p([ct("ia-icon-label")],lt);var de=Object.defineProperty,pe=Object.getOwnPropertyDescriptor,C=(r,t,e,o)=>{for(var i=o>1?void 0:o?pe(t,e):t,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=(o?s(t,e,i):s(i))||i);return o&&i&&de(t,e,i),i};const Ct={CategoryChanged:"categoryChanged",SearchRequested:"searchRequested"};let x=class extends Et{constructor(){super(...arguments),this.categories=[],this.useMobileView=!1,this.hideDropdown=!1,this.loading=!1}get resolvedCategory(){return this.selectedCategory??this.categories?.[0]?.id??""}render(){return S`
      <div id="container" part="container" role="search">
        <div
          id="main-bar"
          part="main-bar"
          class=${this.hideDropdown?"no-dropdown":J}
        >
          ${this.hideDropdown?J:this.dropdownTemplate}
          ${this.textBoxTemplate} ${this.searchButtonTemplate}
        </div>
      </div>
    `}willUpdate(r){if(r.has("selectedCategory")||r.has("categories")){const t=this.resolvedCategory;this.categoryDropdown&&this.categoryDropdown.selectedOption!==t&&(this.categoryDropdown.selectedOption=t)}}get dropdownTemplate(){return S`
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
    `}get textBoxTemplate(){return S`
      <ia-clearable-text-input
        id="search-input"
        part="search-input"
        .value=${this.spacedQuery}
        placeholder=${this.placeholder??W("Search")}
        clearButtonScreenReaderLabel=${W("Clear search query")}
        screenReaderLabel=${W("Search the Archive. Filters and Advanced Search available below.")}
        @clear=${this.searchFieldCleared}
        @submit=${this.handleSubmit}
      ></ia-clearable-text-input>
    `}get searchButtonTemplate(){return S`
      <button
        id="search-button"
        part="search-button"
        class=${this.loading?"loading":J}
        type="button"
        aria-label=${W("Search")}
        @click=${this.handleSubmit}
      >
        ${this.loading?S`<ia-status-indicator
              mode="loading"
              class="search-button-loading-icon"
            ></ia-status-indicator>`:S`<img src=${Vt} alt="" />`}
      </button>
    `}get selectedCategoryLabel(){return this.categories.find(t=>t.id===this.resolvedCategory)?.label??this.resolvedCategory}get spacedQuery(){return this.query?.replace(/\+/g," ")??""}searchFieldCleared(){this.query&&this.emitSearchRequested()}handleSubmit(){this.emitSearchRequested()}handleCategorySelected(r){const t=r.detail.option.id;t!==this.resolvedCategory&&(this.selectedCategory=t,setTimeout(()=>this.searchInput.focus()),this.dispatchEvent(new CustomEvent(Ct.CategoryChanged,{detail:t})))}emitSearchRequested(){this.dispatchEvent(new CustomEvent(Ct.SearchRequested,{detail:{query:this.searchInput.value,category:this.resolvedCategory}}))}static get styles(){const r=Bt`
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
    `;return[zt,r]}};C([O({type:String})],x.prototype,"query",2);C([O({type:Array})],x.prototype,"categories",2);C([O({type:String})],x.prototype,"selectedCategory",2);C([O({type:String})],x.prototype,"placeholder",2);C([O({type:Boolean})],x.prototype,"useMobileView",2);C([O({type:Boolean})],x.prototype,"hideDropdown",2);C([O({type:Boolean})],x.prototype,"loading",2);C([P("#search-input")],x.prototype,"searchInput",2);C([P("#category-dropdown")],x.prototype,"categoryDropdown",2);x=C([kt("ia-dropdown-search-bar"),Nt()],x);var ce=Object.defineProperty,he=Object.getOwnPropertyDescriptor,$=(r,t,e,o)=>{for(var i=o>1?void 0:o?he(t,e):t,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=(o?s(t,e,i):s(i))||i);return o&&i&&ce(t,e,i),i};const ue=[{label:"Bar height",cssVariable:"--ia-theme-search-bar-height",defaultValue:"30px",inputType:"text"},{label:"Bar width",cssVariable:"--ia-theme-search-bar-width",defaultValue:"300px",inputType:"text"},{label:"Internal padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown z-index",cssVariable:"--dropdown-z-index",defaultValue:2,inputType:"number",min:0,step:1}],St=[{id:"all",label:"All"},{id:"texts",label:"Books/Documents"},{id:"fulltext",label:"Text Contents"},{id:"radio",label:"Radio"},{id:"tv",label:"TV"},{id:"movies",label:"Video"},{id:"audio",label:"Audio"},{id:"software",label:"Software"},{id:"image",label:"Images"},{id:"etree",label:"Live Music"},{id:"collection",label:"Collections"},{id:"data",label:"Data"},{id:"web",label:"Web Sites"}],ve="all",At="Search";let w=class extends Et{constructor(){super(...arguments),this.query="",this.selectedCategory=ve,this.placeholder=At,this.hideDropdown=!1,this.loading=!1,this.announcerText=""}render(){return S`
      <story-template
        elementTag="ia-dropdown-search-bar"
        elementClassName="IADropdownSearchBar"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:ue}}
      >
        <div slot="demo">
          <ia-dropdown-search-bar
            .query=${this.query}
            .categories=${St}
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
                  ${qt(St,r=>S`<option value=${r.id}>
                        ${r.label}
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
                  value=${At}
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
    `}get exampleUsage(){const{query:r,selectedCategory:t,placeholder:e,hideDropdown:o,loading:i}=this,n=a=>a?`"${a}"`:"",s={query:n(r),selectedCategory:n(t),placeholder:n(e),hideDropdown:o,loading:i};return`
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
`)}applySettings(r){r.preventDefault(),this.query=this.queryInput.value,this.selectedCategory=this.selectedCategorySelect.value,this.placeholder=this.placeholderInput.value,this.hideDropdown=this.hideDropdownCheck.checked,this.loading=this.loadingCheck.checked}handleSearchRequested(r){this.announcerText=`Category ID "${r.detail.category}" / Query "${r.detail.query}"`}static get styles(){return Bt`
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
    `}};$([U()],w.prototype,"query",2);$([U()],w.prototype,"selectedCategory",2);$([U()],w.prototype,"placeholder",2);$([U()],w.prototype,"hideDropdown",2);$([U()],w.prototype,"loading",2);$([U()],w.prototype,"announcerText",2);$([P("#settings__query")],w.prototype,"queryInput",2);$([P("#settings__selected-category")],w.prototype,"selectedCategorySelect",2);$([P("#settings__placeholder")],w.prototype,"placeholderInput",2);$([P("#settings__hide-dropdown")],w.prototype,"hideDropdownCheck",2);$([P("#settings__loading")],w.prototype,"loadingCheck",2);w=$([kt("ia-dropdown-search-bar-story")],w);export{w as IADropdownSearchBarStory};
