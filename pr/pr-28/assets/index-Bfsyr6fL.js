(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}})();const W=globalThis,ot=W.ShadowRoot&&(W.ShadyCSS===void 0||W.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,nt=Symbol(),ut=new WeakMap;let Tt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==nt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ot&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=ut.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ut.set(e,t))}return t}toString(){return this.cssText}};const Rt=s=>new Tt(typeof s=="string"?s:s+"",void 0,nt),T=(s,...t)=>{const e=s.length===1?s[0]:t.reduce(((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[o+1]),s[0]);return new Tt(e,s,nt)},Bt=(s,t)=>{if(ot)s.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const e of t){const i=document.createElement("style"),r=W.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},gt=ot?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Rt(e)})(s):s;const{is:Vt,defineProperty:zt,getOwnPropertyDescriptor:qt,getOwnPropertyNames:Wt,getOwnPropertySymbols:Zt,getPrototypeOf:Ft}=Object,Y=globalThis,ft=Y.trustedTypes,Jt=ft?ft.emptyScript:"",Kt=Y.reactiveElementPolyfillSupport,M=(s,t)=>s,F={toAttribute(s,t){switch(t){case Boolean:s=s?Jt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},at=(s,t)=>!Vt(s,t),mt={attribute:!0,type:String,converter:F,reflect:!1,useDefault:!1,hasChanged:at};Symbol.metadata??=Symbol("metadata"),Y.litPropertyMetadata??=new WeakMap;let j=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=mt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&zt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:o}=qt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:r,set(n){const l=r?.call(this);o?.call(this,n),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??mt}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;const t=Ft(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){const e=this.properties,i=[...Wt(e),...Zt(e)];for(const r of i)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)e.unshift(gt(r))}else t!==void 0&&e.push(gt(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Bt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const o=(i.converter?.toAttribute!==void 0?i.converter:F).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const o=i.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:F;this._$Em=r;const l=n.fromAttribute(e,o.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){const r=this.constructor,o=this[t];if(i??=r.getPropertyOptions(t),!((i.hasChanged??at)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,o]of i){const{wrapped:n}=o,l=this[r];n!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,o,l)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};j.elementStyles=[],j.shadowRootOptions={mode:"open"},j[M("elementProperties")]=new Map,j[M("finalized")]=new Map,Kt?.({ReactiveElement:j}),(Y.reactiveElementVersions??=[]).push("2.1.1");const lt=globalThis,J=lt.trustedTypes,yt=J?J.createPolicy("lit-html",{createHTML:s=>s}):void 0,Ot="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,jt="?"+w,Yt=`<${jt}>`,C=document,N=()=>C.createComment(""),D=s=>s===null||typeof s!="object"&&typeof s!="function",ct=Array.isArray,Gt=s=>ct(s)||typeof s?.[Symbol.iterator]=="function",tt=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$t=/-->/g,vt=/>/g,S=RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_t=/'/g,bt=/"/g,It=/^(?:script|style|textarea|title)$/i,Qt=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),p=Qt(1),x=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),wt=new WeakMap,A=C.createTreeWalker(C,129);function Lt(s,t){if(!ct(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return yt!==void 0?yt.createHTML(t):t}const Xt=(s,t)=>{const e=s.length-1,i=[];let r,o=t===2?"<svg>":t===3?"<math>":"",n=U;for(let l=0;l<e;l++){const a=s[l];let u,h,c=-1,f=0;for(;f<a.length&&(n.lastIndex=f,h=n.exec(a),h!==null);)f=n.lastIndex,n===U?h[1]==="!--"?n=$t:h[1]!==void 0?n=vt:h[2]!==void 0?(It.test(h[2])&&(r=RegExp("</"+h[2],"g")),n=S):h[3]!==void 0&&(n=S):n===S?h[0]===">"?(n=r??U,c=-1):h[1]===void 0?c=-2:(c=n.lastIndex-h[2].length,u=h[1],n=h[3]===void 0?S:h[3]==='"'?bt:_t):n===bt||n===_t?n=S:n===$t||n===vt?n=U:(n=S,r=void 0);const g=n===S&&s[l+1].startsWith("/>")?" ":"";o+=n===U?a+Yt:c>=0?(i.push(u),a.slice(0,c)+Ot+a.slice(c)+w+g):a+w+(c===-2?l:g)}return[Lt(s,o+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class H{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,n=0;const l=t.length-1,a=this.parts,[u,h]=Xt(t,e);if(this.el=H.createElement(u,i),A.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=A.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const c of r.getAttributeNames())if(c.endsWith(Ot)){const f=h[n++],g=r.getAttribute(c).split(w),v=/([.?@])?(.*)/.exec(f);a.push({type:1,index:o,name:v[2],strings:g,ctor:v[1]==="."?ee:v[1]==="?"?se:v[1]==="@"?re:G}),r.removeAttribute(c)}else c.startsWith(w)&&(a.push({type:6,index:o}),r.removeAttribute(c));if(It.test(r.tagName)){const c=r.textContent.split(w),f=c.length-1;if(f>0){r.textContent=J?J.emptyScript:"";for(let g=0;g<f;g++)r.append(c[g],N()),A.nextNode(),a.push({type:2,index:++o});r.append(c[f],N())}}}else if(r.nodeType===8)if(r.data===jt)a.push({type:2,index:o});else{let c=-1;for(;(c=r.data.indexOf(w,c+1))!==-1;)a.push({type:7,index:o}),c+=w.length-1}o++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function I(s,t,e=s,i){if(t===x)return t;let r=i!==void 0?e._$Co?.[i]:e._$Cl;const o=D(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(s),r._$AT(s,e,i)),i!==void 0?(e._$Co??=[])[i]=r:e._$Cl=r),r!==void 0&&(t=I(s,r._$AS(s,t.values),r,i)),t}class te{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??C).importNode(e,!0);A.currentNode=r;let o=A.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let u;a.type===2?u=new V(o,o.nextSibling,this,t):a.type===1?u=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(u=new ie(o,this,t)),this._$AV.push(u),a=i[++l]}n!==a?.index&&(o=A.nextNode(),n++)}return A.currentNode=C,r}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class V{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=I(this,t,e),D(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==x&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Gt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=H.createElement(Lt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const o=new te(r,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=wt.get(t.strings);return e===void 0&&wt.set(t.strings,e=new H(t)),e}k(t){ct(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const o of t)r===e.length?e.push(i=new V(this.O(N()),this.O(N()),this,this.options)):i=e[r],i._$AI(o),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class G{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(t,e=this,i,r){const o=this.strings;let n=!1;if(o===void 0)t=I(this,t,e,0),n=!D(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else{const l=t;let a,u;for(t=o[0],a=0;a<o.length-1;a++)u=I(this,l[i+a],e,a),u===x&&(u=this._$AH[a]),n||=!D(u)||u!==this._$AH[a],u===d?t=d:t!==d&&(t+=(u??"")+o[a+1]),this._$AH[a]=u}n&&!r&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ee extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}class se extends G{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class re extends G{constructor(t,e,i,r,o){super(t,e,i,r,o),this.type=5}_$AI(t,e=this){if((t=I(this,t,e,0)??d)===x)return;const i=this._$AH,r=t===d&&i!==d||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==d&&(i===d||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ie{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){I(this,t)}}const oe=lt.litHtmlPolyfillSupport;oe?.(H,V),(lt.litHtmlVersions??=[]).push("3.3.1");const ne=(s,t,e)=>{const i=e?.renderBefore??t;let r=i._$litPart$;if(r===void 0){const o=e?.renderBefore??null;i._$litPart$=r=new V(t.insertBefore(N(),o),o,void 0,e??{})}return r._$AI(s),r};const ht=globalThis;let y=class extends j{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ne(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return x}};y._$litElement$=!0,y.finalized=!0,ht.litElementHydrateSupport?.({LitElement:y});const ae=ht.litElementPolyfillSupport;ae?.({LitElement:y});(ht.litElementVersions??=[]).push("4.2.1");const b=s=>(t,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(s,t)})):customElements.define(s,t)};const le={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:at},ce=(s=le,t,e)=>{const{kind:i,metadata:r}=e;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),o.set(e.name,s),i==="accessor"){const{name:n}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,s)},init(l){return l!==void 0&&this.C(n,void 0,s,l),l}}}if(i==="setter"){const{name:n}=e;return function(l){const a=this[n];t.call(this,l),this.requestUpdate(n,a,s)}}throw Error("Unsupported decorator location: "+i)};function m(s){return(t,e)=>typeof e=="object"?ce(s,t,e):((i,r,o)=>{const n=r.hasOwnProperty(o);return r.constructor.createProperty(o,i),n?Object.getOwnPropertyDescriptor(r,o):void 0})(s,t,e)}function O(s){return m({...s,state:!0,attribute:!1})}const kt=(s,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(s,t,e),e);function z(s,t){return(e,i,r)=>{const o=n=>n.renderRoot?.querySelector(s)??null;return kt(e,i,{get(){return o(this)}})}}let he;function Ut(s){return(t,e)=>kt(t,e,{get(){return(this.renderRoot??(he??=document.createDocumentFragment())).querySelectorAll(s)}})}const dt=T`
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
`;var de=Object.getOwnPropertyDescriptor,pe=(s,t,e,i)=>{for(var r=i>1?void 0:i?de(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=n(r)||r);return r};let rt=class extends y{render(){return p`
      <button>
        <slot></slot>
      </button>
    `}static get styles(){return[dt,T`
        :host {
          --primary-background-color--: var(--primary-cta-fill);
          --primary-text-color--: var(--primary-cta-text-color);
        }

        button {
          padding: 8px 16px;
          background-color: var(--primary-background-color--);
          color: var(--primary-text-color--);
        }
      `]}};rt=pe([b("ia-button")],rt);const St=Object.freeze(Object.defineProperty({__proto__:null,get IAButton(){return rt}},Symbol.toStringTag,{value:"Module"}));function et(s,t,e){return s?t(s):e?.(s)}const Mt=s=>s??d,ue="modulepreload",ge=function(s,t){return new URL(s,t).href},At={},Z=function(t,e,i){let r=Promise.resolve();if(e&&e.length>0){let u=function(h){return Promise.all(h.map(c=>Promise.resolve(c).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const n=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),a=l?.nonce||l?.getAttribute("nonce");r=u(e.map(h=>{if(h=ge(h,i),h in At)return;At[h]=!0;const c=h.endsWith(".css"),f=c?'[rel="stylesheet"]':"";if(i)for(let v=n.length-1;v>=0;v--){const q=n[v];if(q.href===h&&(!c||q.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${f}`))return;const g=document.createElement("link");if(g.rel=c?"stylesheet":ue,c||(g.as="script"),g.crossOrigin="",g.href=h,a&&g.setAttribute("nonce",a),document.head.appendChild(g),c)return new Promise((v,q)=>{g.addEventListener("load",v),g.addEventListener("error",()=>q(new Error(`Unable to preload CSS for ${h}`)))})}))}function o(n){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=n,window.dispatchEvent(l),!l.defaultPrevented)throw n}return r.then(n=>{for(const l of n||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})};const fe={CHILD:2},Nt=s=>(...t)=>({_$litDirective$:s,values:t});class Dt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}class it extends Dt{constructor(t){if(super(t),this.it=d,t.type!==fe.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===d||t==null)return this._t=void 0,this.it=t;if(t===x)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}it.directiveName="unsafeHTML",it.resultType=1;const me=Nt(it),ye=T`
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
`;var $e=Object.defineProperty,ve=Object.getOwnPropertyDescriptor,Q=(s,t,e,i)=>{for(var r=i>1?void 0:i?ve(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&$e(t,e,r),r};let R=class extends y{constructor(){super(...arguments),this.code="",this.language="auto",this.highlightedCode=""}willUpdate(s){(s.has("code")||s.has("language"))&&this.highlightCode()}render(){return p`
      <pre><code class="hljs">${me(this.highlightedCode)}</code></pre>
    `}async highlightCode(){const t=(await Z(()=>import("./index-BBc-AmEf.js"),[],import.meta.url)).default,e=this.code.trim();let i;this.language==="auto"?i=t.highlightAuto(e).value:i=t.highlight(e,{language:this.language}).value,this.highlightedCode=i}static get styles(){return[ye]}};Q([m({type:String})],R.prototype,"code",2);Q([m({type:String})],R.prototype,"language",2);Q([O()],R.prototype,"highlightedCode",2);R=Q([b("syntax-highlighter")],R);const _e="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2080%2080'%20focusable='false'%3e%3cpath%20d='M70.3%2013.8L40%2066.3%209.7%2013.8z'%3e%3c/path%3e%3c/svg%3e",be="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='36pt'%20height='36pt'%20viewBox='0%200%2036%2036'%20version='1.1'%3e%3cg%20id='surface35'%3e%3cpath%20style='%20stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;'%20d='M%2013.5%206.1875%20C%2012.878906%206.1875%2012.375%206.691406%2012.375%207.3125%20C%2012.375%207.933594%2012.878906%208.4375%2013.5%208.4375%20L%2014.0625%208.4375%20L%2014.0625%2013.523438%20C%2014.0625%2014.453125%2013.78125%2015.34375%2013.246094%2016.105469%20L%206.84375%2025.238281%20C%206.140625%2026.238281%206.054688%2027.535156%206.621094%2028.617188%20C%207.183594%2029.703125%208.292969%2030.375%209.515625%2030.375%20L%2026.484375%2030.375%20C%2027.707031%2030.375%2028.816406%2029.703125%2029.378906%2028.617188%20C%2029.941406%2027.535156%2029.859375%2026.238281%2029.15625%2025.238281%20L%2022.753906%2016.105469%20C%2022.21875%2015.34375%2021.9375%2014.453125%2021.9375%2013.523438%20L%2021.9375%208.4375%20L%2022.5%208.4375%20C%2023.121094%208.4375%2023.625%207.933594%2023.625%207.3125%20C%2023.625%206.691406%2023.121094%206.1875%2022.5%206.1875%20Z%20M%2016.3125%208.4375%20L%2019.6875%208.4375%20L%2019.6875%2013.523438%20C%2019.6875%2014.914062%2020.109375%2016.257812%2020.910156%2017.398438%20L%2020.941406%2017.4375%20L%2015.0625%2017.4375%20L%2015.089844%2017.398438%20C%2015.890625%2016.257812%2016.3125%2014.914062%2016.3125%2013.523438%20Z%20M%2015.1875%2020.8125%20C%2015.808594%2020.8125%2016.3125%2021.316406%2016.3125%2021.9375%20C%2016.3125%2022.558594%2015.808594%2023.0625%2015.1875%2023.0625%20C%2014.566406%2023.0625%2014.0625%2022.558594%2014.0625%2021.9375%20C%2014.0625%2021.316406%2014.566406%2020.8125%2015.1875%2020.8125%20Z%20M%2020.53125%2023.0625%20C%2021.617188%2023.0625%2022.5%2023.945312%2022.5%2025.03125%20C%2022.5%2026.117188%2021.617188%2027%2020.53125%2027%20C%2019.445312%2027%2018.5625%2026.117188%2018.5625%2025.03125%20C%2018.5625%2023.945312%2019.445312%2023.0625%2020.53125%2023.0625%20Z%20M%2020.53125%2023.0625%20'/%3e%3c/g%3e%3c/svg%3e";var we=Object.defineProperty,Se=Object.getOwnPropertyDescriptor,_=(s,t,e,i)=>{for(var r=i>1?void 0:i?Se(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&we(t,e,r),r};let $=class extends y{constructor(){super(...arguments),this.elementTag="",this.elementClassName="",this.exampleUsage="",this.labs=!1,this.visible=!1,this.shouldShowPropertySettings=!1}render(){return p`
      <h2>
        <a @click=${()=>this.visible=!this.visible}>
          <img
            class="disclosure-arrow ${this.visible?"open":""}"
            src=${_e}
          /><code> &lt;${this.elementTag}&gt;</code> ${et(this.labs,()=>p`<img
                src=${be}
                alt="Labs icon"
                title="Labs"
                class="labs-icon"
              />`)}
        </a>
      </h2>
      ${et(this.visible,()=>this.elementDemoTemplate)}
    `}get elementDemoTemplate(){return p`
      <div id="container">
        <h3>Demo</h3>
        <div class="slot-container" style=${Mt(this.appliedStyles)}>
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
        ${et(this.cssCode,()=>p`
            <h3>Styling</h3>
            <syntax-highlighter
              language="css"
              .code=${this.cssCode}
            ></syntax-highlighter>
          `)}
        ${this.styleSettingsTemplate}
        ${this.shouldShowPropertySettings?p` <h3>Settings</h3>`:d}
        <div
          class="slot-container"
          style="${this.shouldShowPropertySettings?"":"display: none"}"
          @slotchange=${this.handleSettingsSlotChange}
        >
          <slot name="settings"></slot>
        </div>
      </div>
    `}get styleSettingsTemplate(){return this.styleInputData?p`
      <h3>Styles</h3>
      <div class="style-options">
        <table>
          ${this.styleInputData.settings.map(s=>p`
              <tr>
                <td>
                  <label for=${this.labelToId(s.label)}
                    >${s.label}</label
                  >
                </td>
                <td>
                  <input
                    id=${this.labelToId(s.label)}
                    class="style-input"
                    type=${s.inputType??"text"}
                    value=${s.defaultValue??""}
                    data-variable=${s.cssVariable}
                  />
                </td>
              </tr>
            `)}
        </table>
        <button @click=${this.applyStyles}>Apply</button>
      </div>
    `:d}get importCode(){return this.elementClassName?`
import '${this.modulePath}';
import { ${this.elementClassName} } from '${this.modulePath}';
    `:`
import '${this.modulePath}';
  `}get cssCode(){return this.appliedStyles?`

${this.elementTag} {
  ${this.appliedStyles}
}
    `:""}get modulePath(){return this.labs?`@internetarchive/elements/labs/${this.elementTag}/${this.elementTag}`:`@internetarchive/elements/${this.elementTag}/${this.elementTag}`}handleSettingsSlotChange(s){const t=s.target.assignedElements();this.shouldShowPropertySettings=t.length>0}applyStyles(){const s=[];this.styleInputs?.forEach(t=>{!t.dataset.variable||!t.value||s.push(`${t.dataset.variable}: ${t.value};`)}),this.appliedStyles=s.join(`
  `)}labelToId(s){return s.toLowerCase().split(" ").join("-")}static get styles(){return[dt,T`
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
      `]}};_([m({type:String})],$.prototype,"elementTag",2);_([m({type:String})],$.prototype,"elementClassName",2);_([m({type:String})],$.prototype,"exampleUsage",2);_([m({type:Object})],$.prototype,"styleInputData",2);_([m({type:Boolean})],$.prototype,"labs",2);_([O()],$.prototype,"visible",2);_([O()],$.prototype,"appliedStyles",2);_([O()],$.prototype,"shouldShowPropertySettings",2);_([Ut(".style-input")],$.prototype,"styleInputs",2);$=_([b("story-template")],$);var Ae=Object.getOwnPropertyDescriptor,Ce=(s,t,e,i)=>{for(var r=i>1?void 0:i?Ae(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=n(r)||r);return r};const xe=[{label:"Text Color (Primary)",cssVariable:"--ia-theme-primary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background Color (Primary)",cssVariable:"--ia-theme-primary-cta-fill",defaultValue:"#194880",inputType:"color"}];let Ct=class extends y{render(){return p`
      <story-template
        elementTag="ia-button"
        elementClassName="IAButton"
        .exampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:xe}}
      >
        <div slot="demo">
          <ia-button @click=${()=>alert("Button clicked!")}
            >Click Me</ia-button
          >
        </div>
      </story-template>
    `}get exampleUsage(){return"<ia-button @click=${() => alert('Button clicked!')}>Click Me</ia-button>"}};Ct=Ce([b("ia-button-story")],Ct);const Pe="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='36.283'%20height='36.283'%3e%3cpath%20d='M35.531%2017.391h-3.09l.845-1.464a.748.748%200%201%200-1.297-.75l-1.276%202.214H28.61l2.515-4.354a.751.751%200%200%200-.272-1.024.75.75%200%200%200-1.024.274l-2.948%205.104h-2.023a6.751%206.751%200%200%200-2.713-4.684l1.019-1.76%205.896-.002a.75.75%200%200%200%200-1.5l-5.029.002%201.051-1.82%202.557.002a.75.75%200%200%200%200-1.5l-1.689-.002%201.545-2.676a.75.75%200%201%200-1.302-.75l-1.547%202.676-.844-1.463a.749.749%200%201%200-1.297.75l1.278%202.213-1.051%201.818-2.514-4.354a.75.75%200%200%200-1.298.75l2.946%205.104-1.016%201.758a6.692%206.692%200%200%200-2.706-.57%206.74%206.74%200%200%200-2.707.568l-1.013-1.754%202.946-5.105a.75.75%200%200%200-1.298-.75L13.56%208.697l-1.05-1.818%201.278-2.217a.749.749%200%200%200-1.298-.75l-.845%201.465-1.551-2.678a.75.75%200%200%200-1.024-.273.748.748%200%200%200-.274%201.023l1.545%202.678H8.652a.75.75%200%200%200%200%201.5h2.556l1.05%201.818H7.231a.75.75%200%200%200%200%201.5h5.894l1.017%201.762a6.755%206.755%200%200%200-2.712%204.684H9.406l-2.95-5.104a.75.75%200%201%200-1.299.75l2.516%204.354H5.569l-1.277-2.213a.75.75%200%200%200-1.298.75l.845%201.463H.75a.75.75%200%200%200%200%201.5h3.09l-.845%201.465a.747.747%200%200%200%20.275%201.022.75.75%200%200%200%20.374.103.75.75%200%200%200%20.65-.375l1.277-2.215h2.103l-2.516%204.354a.75.75%200%200%200%201.299.75l2.949-5.104h2.024a6.761%206.761%200%200%200%202.712%204.685l-1.017%201.762H7.232a.75.75%200%200%200%200%201.5h5.026l-1.05%201.818H8.651a.75.75%200%200%200%200%201.5h1.69l-1.545%202.676a.75.75%200%200%200%201.299.75l1.546-2.676.846%201.465a.755.755%200%200%200%20.65.375.737.737%200%200%200%20.375-.103.747.747%200%200%200%20.274-1.022l-1.279-2.215%201.05-1.82%202.515%204.354a.75.75%200%200%200%201.299-.75l-2.947-5.104%201.013-1.756a6.72%206.72%200%200%200%205.415%200l1.014%201.756-2.947%205.104a.75.75%200%200%200%201.298.75l2.515-4.354%201.053%201.82-1.277%202.213a.75.75%200%200%200%201.298.75l.844-1.463%201.545%202.678c.141.24.393.375.65.375a.75.75%200%200%200%20.649-1.125l-1.548-2.678h1.689a.75.75%200%200%200%200-1.5h-2.557l-1.051-1.82%205.029.002a.75.75%200%200%200%200-1.5l-5.896-.002-1.019-1.76a6.75%206.75%200%200%200%202.711-4.685h2.023l2.947%205.104a.753.753%200%200%200%201.025.273.749.749%200%200%200%20.272-1.023l-2.515-4.354h2.104l1.279%202.215a.75.75%200%200%200%20.649.375c.127%200%20.256-.03.375-.103a.748.748%200%200%200%20.273-1.022l-.848-1.465h3.092a.75.75%200%200%200%20.003-1.5zm-12.136.75c0%20.257-.041.502-.076.75a5.223%205.223%200%200%201-1.943%203.358%205.242%205.242%200%200%201-1.291.766%205.224%205.224%200%200%201-1.949.384%205.157%205.157%200%200%201-3.239-1.15%205.22%205.22%200%200%201-1.943-3.358c-.036-.247-.076-.493-.076-.75s.04-.503.076-.75a5.22%205.22%200%200%201%201.944-3.359c.393-.312.82-.576%201.291-.765a5.219%205.219%200%200%201%201.948-.384c.69%200%201.344.142%201.948.384.471.188.898.454%201.291.765a5.222%205.222%200%200%201%201.943%203.359c.035.247.076.493.076.75z'%20fill=':color:'/%3e%3c/svg%3e",xt=new WeakSet;class Ee extends Dt{constructor(t){super(t)}update(t,[e,i]){return xt.has(t)||(e(),xt.add(t)),this.render(e,i)}render(t,e){return e()}}const Pt=Nt(Ee);var Te=Object.defineProperty,Oe=Object.getOwnPropertyDescriptor,pt=(s,t,e,i)=>{for(var r=i>1?void 0:i?Oe(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&Te(t,e,r),r};let K=class extends y{constructor(){super(...arguments),this.snowing=!1}render(){return p`
      ${this.startButtonTemplate} ${this.clearButtonTemplate}
      <img src=${Pe} alt="Snowflakes icon" />
    `}willUpdate(s){s.has("snowConfig")&&(this.snowflakes?.destroy(),this.snowflakes=void 0,this.startSnowing())}get startButtonTemplate(){return Pt(async()=>{await Z(()=>Promise.resolve().then(()=>St),void 0,import.meta.url)},()=>p`
        <ia-button
          @click=${()=>{this.snowing?this.stopSnowing():this.startSnowing()}}
        >
          ${this.snowing?"Stop Snowflakes":"Start Snowflakes"}
        </ia-button>
      `)}get clearButtonTemplate(){return Pt(async()=>{await Z(()=>Promise.resolve().then(()=>St),void 0,import.meta.url)},()=>p`
        <ia-button
          @click=${()=>{this.snowflakes?.destroy()}}
        >
          Clear Snowflakes
        </ia-button>
      `)}async startSnowing(){if(!this.snowflakes){const t=(await Z(()=>import("./snowflakes.esm-Dz_MTlsm.js"),[],import.meta.url)).default;this.snowflakes=new t(this.snowConfig)}this.snowflakes?.start(),this.snowing=!0}stopSnowing(){this.snowflakes?.stop(),this.snowing=!1}static get styles(){return T`
      img {
        width: 16px;
        filter: invert(1);
        vertical-align: middle;
      }
    `}};pt([m({type:Object})],K.prototype,"snowConfig",2);pt([O()],K.prototype,"snowing",2);K=pt([b("ia-snow")],K);var je=Object.defineProperty,Ie=Object.getOwnPropertyDescriptor,L=(s,t,e,i)=>{for(var r=i>1?void 0:i?Ie(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&je(t,e,r),r};let P=class extends y{render(){return p`
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
    `:"<ia-snow></ia-snow>"}get configString(){return JSON.stringify(this.config,null,2)}get snowflakeConfig(){return{color:this.colorInput.value,count:Number(this.countInput.value),wind:this.windInput.checked,rotation:this.rotationInput.checked}}setupSnowflakes(){this.config=this.snowflakeConfig}static get styles(){return T`
      fieldset {
        margin-top: 16px;
      }
    `}};L([O()],P.prototype,"config",2);L([z("#count")],P.prototype,"countInput",2);L([z("#wind")],P.prototype,"windInput",2);L([z("#rotation")],P.prototype,"rotationInput",2);L([z("#color")],P.prototype,"colorInput",2);P=L([b("ia-snow-story")],P);const Ht=(s,t,e)=>{for(const i of t)if(i[0]===s)return(0,i[1])();return e?.()};const Le=s=>typeof s!="string"&&"strTag"in s,ke=(s,t,e)=>{let i=s[0];for(let r=1;r<s.length;r++)i+=t[r-1],i+=s[r];return i};const Ue=(s=>Le(s)?ke(s.strings,s.values):s);let st=Ue;class Me{constructor(){this.settled=!1,this.promise=new Promise((t,e)=>{this._resolve=t,this._reject=e})}resolve(t){this.settled=!0,this._resolve(t)}reject(t){this.settled=!0,this._reject(t)}}for(let s=0;s<256;s++)(s>>4&15).toString(16)+(s&15).toString(16);let Ne=new Me;Ne.resolve();var De=Object.defineProperty,He=Object.getOwnPropertyDescriptor,k=(s,t,e,i)=>{for(var r=i>1?void 0:i?He(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&De(t,e,r),r};let E=class extends y{constructor(){super(...arguments),this.loadingTitle=st("Loading..."),this.successTitle=st("Success"),this.errorTitle=st("Error"),this.loadingStyle="ring-dots",this.mode="loading"}render(){return p`${Ht(this.mode,[["loading",()=>this.loadingIndicatorTemplate],["success",()=>this.successIndicatorTemplate],["error",()=>this.errorIndicatorTemplate]])}`}get loadingIndicatorTemplate(){return p`
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
    `}get shouldShowLoadingDots(){return this.loadingStyle!=="ring"}static get styles(){return[dt,T`
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
      `]}};k([m({type:String})],E.prototype,"loadingTitle",2);k([m({type:String})],E.prototype,"successTitle",2);k([m({type:String})],E.prototype,"errorTitle",2);k([m({type:String})],E.prototype,"loadingStyle",2);k([m({type:String})],E.prototype,"mode",2);E=k([b("ia-status-indicator")],E);var Re=Object.defineProperty,Be=Object.getOwnPropertyDescriptor,X=(s,t,e,i)=>{for(var r=i>1?void 0:i?Be(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&Re(t,e,r),r};const Ve=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"1.25rem"},{label:"Color - loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Color - success",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"},{label:"Color - error",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}],ze=[{label:"Mode",propertyName:"mode",defaultValue:"loading",inputType:"radio",radioOptions:["loading","success","error"]},{label:"Accessible title - loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{label:"Loading style",propertyName:"loadingStyle",defaultValue:"ring-dots",inputType:"radio",radioOptions:["ring-dots","ring"]},{label:"Accessible title - success",propertyName:"successTitle",defaultValue:"Success"},{label:"Accessible title - error",propertyName:"errorTitle",defaultValue:"Error"}];let B=class extends y{constructor(){super(...arguments),this.stringifiedProps=""}render(){return p`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .exampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:Ve}}
      >
        <div slot="demo">
          <ia-status-indicator></ia-status-indicator>
        </div>

        <div slot="settings">
          <table>
            ${ze.map(s=>this.createPropInput(s))}
          </table>
          <button @click=${this.apply}>Apply</button>
        </div>
      </story-template>
    `}get exampleUsage(){return`<ia-status-indicator${this.stringifiedProps??""}></ia-status-indicator>`}createPropInput(s){return Ht(s.inputType,[["radio",()=>this.radioPropInputTemplate(s)]],()=>this.defaultPropInputTemplate(s))??d}defaultPropInputTemplate(s){const t=s.label.toLowerCase().split(" ").join("-");return p`
      <tr>
        <td><label for=${t}>${s.label}</label></td>
        <td>
          <input
            class="prop-input"
            type=${s.inputType??"text"}
            id=${t}
            data-prop=${s.propertyName}
            placeholder=${Mt(s?.defaultValue)}
          />
        </td>
      </tr>
    `}radioPropInputTemplate(s){if(s.inputType!=="radio"||!s.radioOptions)return d;const t=s.label.toLowerCase().split(" ").join("-");return p`
      <tr>
        <td><legend>${s.label}</legend></td>
        <td>
          ${s.radioOptions.map(e=>p`<input
                  type="radio"
                  class="prop-input"
                  name=${t}
                  id=${e}
                  value=${e}
                  data-prop=${s.propertyName}
                  ?checked=${s.defaultValue===e}
                /><label for=${e}> ${e} </label>`)}
        </td>
      </tr>
    `}apply(){const s=[];this.propInputs?.forEach(t=>{if(!t.dataset.prop||!t.value||t.type==="radio"&&!t.checked)return;const e=t.dataset.prop;s.push(`.${e}=\${'${t.value}'}`),this.component.setAttribute(e,t.value)}),s.length&&(this.stringifiedProps=`
  `+s.join(`
  `)+`
`)}};X([O()],B.prototype,"stringifiedProps",2);X([z("ia-status-indicator")],B.prototype,"component",2);X([Ut(".prop-input")],B.prototype,"propInputs",2);B=X([b("ia-status-indicator-story")],B);var qe=Object.getOwnPropertyDescriptor,We=(s,t,e,i)=>{for(var r=i>1?void 0:i?qe(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=n(r)||r);return r};let Et=class extends y{render(){return p`
      <h1>🏛️ Internet Archive Elements ⚛️</h1>

      <h2>🚀 Production-Ready Elements</h2>

      <ia-status-indicator-story></ia-status-indicator-story>

      <h2>🧪 Labs Elements</h2>

      <ia-snow-story></ia-snow-story>
      <ia-button-story></ia-button-story>
    `}};Et=We([b("app-root")],Et);
