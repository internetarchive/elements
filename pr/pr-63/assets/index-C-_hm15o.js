(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();const Et=globalThis,me=Et.ShadowRoot&&(Et.ShadyCSS===void 0||Et.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,be=Symbol(),ke=new WeakMap;let uo=class{constructor(t,o,i){if(this._$cssResult$=!0,i!==be)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=o}get styleSheet(){let t=this.o;const o=this.t;if(me&&t===void 0){const i=o!==void 0&&o.length===1;i&&(t=ke.get(o)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ke.set(o,t))}return t}toString(){return this.cssText}};const Ro=e=>new uo(typeof e=="string"?e:e+"",void 0,be),k=(e,...t)=>{const o=e.length===1?e[0]:t.reduce((i,r,n)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[n+1],e[0]);return new uo(o,e,be)},Lo=(e,t)=>{if(me)e.adoptedStyleSheets=t.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(const o of t){const i=document.createElement("style"),r=Et.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=o.cssText,e.appendChild(i)}},Pe=me?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let o="";for(const i of t.cssRules)o+=i.cssText;return Ro(o)})(e):e;const{is:No,defineProperty:jo,getOwnPropertyDescriptor:Mo,getOwnPropertyNames:Uo,getOwnPropertySymbols:zo,getPrototypeOf:Ho}=Object,Mt=globalThis,Ie=Mt.trustedTypes,Fo=Ie?Ie.emptyScript:"",qo=Mt.reactiveElementPolyfillSupport,wt=(e,t)=>e,It={toAttribute(e,t){switch(t){case Boolean:e=e?Fo:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=e!==null;break;case Number:o=e===null?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch{o=null}}return o}},ye=(e,t)=>!No(e,t),Be={attribute:!0,type:String,converter:It,reflect:!1,useDefault:!1,hasChanged:ye};Symbol.metadata??=Symbol("metadata"),Mt.litPropertyMetadata??=new WeakMap;let ct=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,o=Be){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(t,o),!o.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,o);r!==void 0&&jo(this.prototype,t,r)}}static getPropertyDescriptor(t,o,i){const{get:r,set:n}=Mo(this.prototype,t)??{get(){return this[o]},set(s){this[o]=s}};return{get:r,set(s){const l=r?.call(this);n?.call(this,s),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Be}static _$Ei(){if(this.hasOwnProperty(wt("elementProperties")))return;const t=Ho(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(wt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(wt("properties"))){const o=this.properties,i=[...Uo(o),...zo(o)];for(const r of i)this.createProperty(r,o[r])}const t=this[Symbol.metadata];if(t!==null){const o=litPropertyMetadata.get(t);if(o!==void 0)for(const[i,r]of o)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[o,i]of this.elementProperties){const r=this._$Eu(o,i);r!==void 0&&this._$Eh.set(r,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const o=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)o.unshift(Pe(r))}else t!==void 0&&o.push(Pe(t));return o}static _$Eu(t,o){const i=o.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,o=this.constructor.elementProperties;for(const i of o.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Lo(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,o,i){this._$AK(t,i)}_$ET(t,o){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const n=(i.converter?.toAttribute!==void 0?i.converter:It).toAttribute(o,i.type);this._$Em=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,o){const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const n=i.getPropertyOptions(r),s=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:It;this._$Em=r;const l=s.fromAttribute(o,n.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(t,o,i,r=!1,n){if(t!==void 0){const s=this.constructor;if(r===!1&&(n=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??ye)(n,o)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,o,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,o,{useDefault:i,reflect:r,wrapped:n},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??o??this[t]),n!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(o=void 0),this._$AL.set(t,o)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,n]of i){const{wrapped:s}=n,l=this[r];s!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,n,l)}}let t=!1;const o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(o)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(o)}willUpdate(t){}_$AE(t){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(t){}firstUpdated(t){}};ct.elementStyles=[],ct.shadowRootOptions={mode:"open"},ct[wt("elementProperties")]=new Map,ct[wt("finalized")]=new Map,qo?.({ReactiveElement:ct}),(Mt.reactiveElementVersions??=[]).push("2.1.2");const ve=globalThis,Ve=e=>e,Bt=ve.trustedTypes,De=Bt?Bt.createPolicy("lit-html",{createHTML:e=>e}):void 0,go="$lit$",K=`lit$${Math.random().toFixed(9).slice(2)}$`,fo="?"+K,Ko=`<${fo}>`,rt=document,xt=()=>rt.createComment(""),_t=e=>e===null||typeof e!="object"&&typeof e!="function",$e=Array.isArray,Wo=e=>$e(e)||typeof e?.[Symbol.iterator]=="function",Wt=`[ 	
\f\r]`,vt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Re=/-->/g,Le=/>/g,Q=RegExp(`>|${Wt}(?:([^\\s"'>=/]+)(${Wt}*=${Wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ne=/'/g,je=/"/g,mo=/^(?:script|style|textarea|title)$/i,Go=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),d=Go(1),L=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),Me=new WeakMap,et=rt.createTreeWalker(rt,129);function bo(e,t){if(!$e(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return De!==void 0?De.createHTML(t):t}const Zo=(e,t)=>{const o=e.length-1,i=[];let r,n=t===2?"<svg>":t===3?"<math>":"",s=vt;for(let l=0;l<o;l++){const a=e[l];let c,u,p=-1,g=0;for(;g<a.length&&(s.lastIndex=g,u=s.exec(a),u!==null);)g=s.lastIndex,s===vt?u[1]==="!--"?s=Re:u[1]!==void 0?s=Le:u[2]!==void 0?(mo.test(u[2])&&(r=RegExp("</"+u[2],"g")),s=Q):u[3]!==void 0&&(s=Q):s===Q?u[0]===">"?(s=r??vt,p=-1):u[1]===void 0?p=-2:(p=s.lastIndex-u[2].length,c=u[1],s=u[3]===void 0?Q:u[3]==='"'?je:Ne):s===je||s===Ne?s=Q:s===Re||s===Le?s=vt:(s=Q,r=void 0);const y=s===Q&&e[l+1].startsWith("/>")?" ":"";n+=s===vt?a+Ko:p>=0?(i.push(c),a.slice(0,p)+go+a.slice(p)+K+y):a+K+(p===-2?l:y)}return[bo(e,n+(e[o]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};let oe=class yo{constructor({strings:t,_$litType$:o},i){let r;this.parts=[];let n=0,s=0;const l=t.length-1,a=this.parts,[c,u]=Zo(t,o);if(this.el=yo.createElement(c,i),et.currentNode=this.el.content,o===2||o===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=et.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const p of r.getAttributeNames())if(p.endsWith(go)){const g=u[s++],y=r.getAttribute(p).split(K),R=/([.?@])?(.*)/.exec(g);a.push({type:1,index:n,name:R[2],strings:y,ctor:R[1]==="."?Jo:R[1]==="?"?Qo:R[1]==="@"?Xo:Ut}),r.removeAttribute(p)}else p.startsWith(K)&&(a.push({type:6,index:n}),r.removeAttribute(p));if(mo.test(r.tagName)){const p=r.textContent.split(K),g=p.length-1;if(g>0){r.textContent=Bt?Bt.emptyScript:"";for(let y=0;y<g;y++)r.append(p[y],xt()),et.nextNode(),a.push({type:2,index:++n});r.append(p[g],xt())}}}else if(r.nodeType===8)if(r.data===fo)a.push({type:2,index:n});else{let p=-1;for(;(p=r.data.indexOf(K,p+1))!==-1;)a.push({type:7,index:n}),p+=K.length-1}n++}}static createElement(t,o){const i=rt.createElement("template");return i.innerHTML=t,i}};function ht(e,t,o=e,i){if(t===L)return t;let r=i!==void 0?o._$Co?.[i]:o._$Cl;const n=_t(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(e),r._$AT(e,o,i)),i!==void 0?(o._$Co??=[])[i]=r:o._$Cl=r),r!==void 0&&(t=ht(e,r._$AS(e,t.values),r,i)),t}let Yo=class{constructor(t,o){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:o},parts:i}=this._$AD,r=(t?.creationScope??rt).importNode(o,!0);et.currentNode=r;let n=et.nextNode(),s=0,l=0,a=i[0];for(;a!==void 0;){if(s===a.index){let c;a.type===2?c=new we(n,n.nextSibling,this,t):a.type===1?c=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(c=new ti(n,this,t)),this._$AV.push(c),a=i[++l]}s!==a?.index&&(n=et.nextNode(),s++)}return et.currentNode=rt,r}p(t){let o=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,o),o+=i.strings.length-2):i._$AI(t[o])),o++}},we=class vo{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,o,i,r){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=o,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const o=this._$AM;return o!==void 0&&t?.nodeType===11&&(t=o.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,o=this){t=ht(this,t,o),_t(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==L&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Wo(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&_t(this._$AH)?this._$AA.nextSibling.data=t:this.T(rt.createTextNode(t)),this._$AH=t}$(t){const{values:o,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=oe.createElement(bo(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(o);else{const n=new Yo(r,this),s=n.u(this.options);n.p(o),this.T(s),this._$AH=n}}_$AC(t){let o=Me.get(t.strings);return o===void 0&&Me.set(t.strings,o=new oe(t)),o}k(t){$e(this._$AH)||(this._$AH=[],this._$AR());const o=this._$AH;let i,r=0;for(const n of t)r===o.length?o.push(i=new vo(this.O(xt()),this.O(xt()),this,this.options)):i=o[r],i._$AI(n),r++;r<o.length&&(this._$AR(i&&i._$AB.nextSibling,r),o.length=r)}_$AR(t=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);t!==this._$AB;){const i=Ve(t).nextSibling;Ve(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ut=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,o,i,r,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=o,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=m}_$AI(t,o=this,i,r){const n=this.strings;let s=!1;if(n===void 0)t=ht(this,t,o,0),s=!_t(t)||t!==this._$AH&&t!==L,s&&(this._$AH=t);else{const l=t;let a,c;for(t=n[0],a=0;a<n.length-1;a++)c=ht(this,l[i+a],o,a),c===L&&(c=this._$AH[a]),s||=!_t(c)||c!==this._$AH[a],c===m?t=m:t!==m&&(t+=(c??"")+n[a+1]),this._$AH[a]=c}s&&!r&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Jo=class extends Ut{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},Qo=class extends Ut{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},Xo=class extends Ut{constructor(t,o,i,r,n){super(t,o,i,r,n),this.type=5}_$AI(t,o=this){if((t=ht(this,t,o,0)??m)===L)return;const i=this._$AH,r=t===m&&i!==m||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==m&&(i===m||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ti=class{constructor(t,o,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=o,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){ht(this,t)}};const ei=ve.litHtmlPolyfillSupport;ei?.(oe,we),(ve.litHtmlVersions??=[]).push("3.3.3");const $o=(e,t,o)=>{const i=o?.renderBefore??t;let r=i._$litPart$;if(r===void 0){const n=o?.renderBefore??null;i._$litPart$=r=new we(t.insertBefore(xt(),n),n,void 0,o??{})}return r._$AI(e),r};const xe=globalThis;let v=class extends ct{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=$o(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}};v._$litElement$=!0,v.finalized=!0,xe.litElementHydrateSupport?.({LitElement:v});const oi=xe.litElementPolyfillSupport;oi?.({LitElement:v});(xe.litElementVersions??=[]).push("4.2.2");const O=e=>(t,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};const ii={attribute:!0,type:String,converter:It,reflect:!1,hasChanged:ye},ri=(e=ii,t,o)=>{const{kind:i,metadata:r}=o;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),n.set(o.name,e),i==="accessor"){const{name:s}=o;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(s,a,e,!0,l)},init(l){return l!==void 0&&this.C(s,void 0,e,l),l}}}if(i==="setter"){const{name:s}=o;return function(l){const a=this[s];t.call(this,l),this.requestUpdate(s,a,e,!0,l)}}throw Error("Unsupported decorator location: "+i)};function h(e){return(t,o)=>typeof o=="object"?ri(e,t,o):((i,r,n)=>{const s=r.hasOwnProperty(n);return r.constructor.createProperty(n,i),s?Object.getOwnPropertyDescriptor(r,n):void 0})(e,t,o)}function f(e){return h({...e,state:!0,attribute:!1})}const wo=(e,t,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,o),o);function w(e,t){return(o,i,r)=>{const n=s=>s.renderRoot?.querySelector(e)??null;return wo(o,i,{get(){return n(this)}})}}let ni;function _e(e){return(t,o)=>wo(t,o,{get(){return(this.renderRoot??(ni??=document.createDocumentFragment())).querySelectorAll(e)}})}function tt(e,t,o){return e?t(e):o?.(e)}const ot=e=>e??m,si="modulepreload",ai=function(e,t){return new URL(e,t).href},Ue={},kt=function(t,o,i){let r=Promise.resolve();if(o&&o.length>0){let c=function(u){return Promise.all(u.map(p=>Promise.resolve(p).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};const s=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),a=l?.nonce||l?.getAttribute("nonce");r=c(o.map(u=>{if(u=ai(u,i),u in Ue)return;Ue[u]=!0;const p=u.endsWith(".css"),g=p?'[rel="stylesheet"]':"";if(i)for(let R=s.length-1;R>=0;R--){const F=s[R];if(F.href===u&&(!p||F.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${g}`))return;const y=document.createElement("link");if(y.rel=p?"stylesheet":si,p||(y.as="script"),y.crossOrigin="",y.href=u,a&&y.setAttribute("nonce",a),document.head.appendChild(y),p)return new Promise((R,F)=>{y.addEventListener("load",R),y.addEventListener("error",()=>F(new Error(`Unable to preload CSS for ${u}`)))})}))}function n(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&n(l.reason);return t().catch(n)})};const q={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},zt=e=>(...t)=>({_$litDirective$:e,values:t});let Ht=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,o,i){this._$Ct=t,this._$AM=o,this._$Ci=i}_$AS(t,o){return this.update(t,o)}update(t,o){return this.render(...o)}};let ie=class extends Ht{constructor(t){if(super(t),this.it=m,t.type!==q.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===m||t==null)return this._t=void 0,this.it=t;if(t===L)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const o=[t];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};ie.directiveName="unsafeHTML",ie.resultType=1;const re=zt(ie),li=k`
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
`;var di=Object.defineProperty,ci=Object.getOwnPropertyDescriptor,Ft=(e,t,o,i)=>{for(var r=i>1?void 0:i?ci(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=(i?s(t,o,r):s(r))||r);return i&&r&&di(t,o,r),r};let St=class extends v{constructor(){super(...arguments),this.code="",this.language="auto",this.highlightedCode=""}willUpdate(e){(e.has("code")||e.has("language"))&&this.highlightCode()}render(){return d`
      <pre><code class="hljs">${re(this.highlightedCode)}</code></pre>
    `}async highlightCode(){const t=(await kt(()=>import("./index-BBc-AmEf.js"),[],import.meta.url)).default,o=this.code.trim();let i;this.language==="auto"?i=t.highlightAuto(o).value:i=t.highlight(o,{language:this.language}).value,this.highlightedCode=i}static get styles(){return[li]}};Ft([h({type:String})],St.prototype,"code",2);Ft([h({type:String})],St.prototype,"language",2);Ft([f()],St.prototype,"highlightedCode",2);St=Ft([O("syntax-highlighter")],St);const z=k`
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
`,pi="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='36pt'%20height='36pt'%20viewBox='0%200%2036%2036'%20version='1.1'%3e%3cg%20id='surface35'%3e%3cpath%20style='%20stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;'%20d='M%2013.5%206.1875%20C%2012.878906%206.1875%2012.375%206.691406%2012.375%207.3125%20C%2012.375%207.933594%2012.878906%208.4375%2013.5%208.4375%20L%2014.0625%208.4375%20L%2014.0625%2013.523438%20C%2014.0625%2014.453125%2013.78125%2015.34375%2013.246094%2016.105469%20L%206.84375%2025.238281%20C%206.140625%2026.238281%206.054688%2027.535156%206.621094%2028.617188%20C%207.183594%2029.703125%208.292969%2030.375%209.515625%2030.375%20L%2026.484375%2030.375%20C%2027.707031%2030.375%2028.816406%2029.703125%2029.378906%2028.617188%20C%2029.941406%2027.535156%2029.859375%2026.238281%2029.15625%2025.238281%20L%2022.753906%2016.105469%20C%2022.21875%2015.34375%2021.9375%2014.453125%2021.9375%2013.523438%20L%2021.9375%208.4375%20L%2022.5%208.4375%20C%2023.121094%208.4375%2023.625%207.933594%2023.625%207.3125%20C%2023.625%206.691406%2023.121094%206.1875%2022.5%206.1875%20Z%20M%2016.3125%208.4375%20L%2019.6875%208.4375%20L%2019.6875%2013.523438%20C%2019.6875%2014.914062%2020.109375%2016.257812%2020.910156%2017.398438%20L%2020.941406%2017.4375%20L%2015.0625%2017.4375%20L%2015.089844%2017.398438%20C%2015.890625%2016.257812%2016.3125%2014.914062%2016.3125%2013.523438%20Z%20M%2015.1875%2020.8125%20C%2015.808594%2020.8125%2016.3125%2021.316406%2016.3125%2021.9375%20C%2016.3125%2022.558594%2015.808594%2023.0625%2015.1875%2023.0625%20C%2014.566406%2023.0625%2014.0625%2022.558594%2014.0625%2021.9375%20C%2014.0625%2021.316406%2014.566406%2020.8125%2015.1875%2020.8125%20Z%20M%2020.53125%2023.0625%20C%2021.617188%2023.0625%2022.5%2023.945312%2022.5%2025.03125%20C%2022.5%2026.117188%2021.617188%2027%2020.53125%2027%20C%2019.445312%2027%2018.5625%2026.117188%2018.5625%2025.03125%20C%2018.5625%2023.945312%2019.445312%2023.0625%2020.53125%2023.0625%20Z%20M%2020.53125%2023.0625%20'/%3e%3c/g%3e%3c/svg%3e";function ne(e){return e.toLowerCase().split(" ").join("-")}var hi=Object.defineProperty,ui=Object.getOwnPropertyDescriptor,Se=(e,t,o,i)=>{for(var r=i>1?void 0:i?ui(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=(i?s(t,o,r):s(r))||r);return i&&r&&hi(t,o,r),r};let Vt=class extends v{render(){return this.styleInputData?d`
      <div class="settings-options">
        <table>
          ${this.styleInputData.settings.map(e=>this.renderStyleRow(e))}
        </table>
        <button @click=${this.applyStyles}>Apply</button>
      </div>
    `:m}renderStyleRow(e){const t=ne(e.label),o=e.inputType==="number"||e.inputType==="range";return d`
      <tr>
        <td>
          <label for=${t}>${e.label}</label>
        </td>
        <td class="style-input-cell">
          <input
            id=${t}
            class="style-input"
            type=${e.inputType??"text"}
            min=${ot(o?e.min:void 0)}
            max=${ot(o?e.max:void 0)}
            step=${ot(o?e.step:void 0)}
            value=${e.defaultValue}
            data-variable=${e.cssVariable}
            data-unit=${ot(e.unit)}
            @input=${e.inputType==="range"?this.updateRangeReadout:void 0}
          />
          ${e.inputType==="range"?d`<output class="style-readout" for=${t}
                >${e.defaultValue}${e.unit??""}</output
              >`:m}
        </td>
      </tr>
    `}updateRangeReadout(e){const t=e.currentTarget,o=this.renderRoot.querySelector(`output[for="${CSS.escape(t.id)}"]`);if(!o)return;const i=t.dataset.unit??"";o.textContent=`${t.value}${i}`}applyStyles(){const e=[];this.styleInputs?.forEach(t=>{if(!t.dataset.variable||!t.value)return;const o=t.dataset.unit??"";e.push(`${t.dataset.variable}: ${t.value}${o};`)}),this.dispatchEvent(new CustomEvent("stylesApplied",{detail:{styles:e.join(`
 `)}}))}static get styles(){return[z,k`
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
      `]}};Se([h({type:Object})],Vt.prototype,"styleInputData",2);Se([_e(".style-input")],Vt.prototype,"styleInputs",2);Vt=Se([O("story-styles-settings")],Vt);const xo=(e,t,o)=>{for(const i of t)if(i[0]===e)return(0,i[1])();return o?.()};var gi=Object.defineProperty,fi=Object.getOwnPropertyDescriptor,Ce=(e,t,o,i)=>{for(var r=i>1?void 0:i?fi(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=(i?s(t,o,r):s(r))||r);return i&&r&&gi(t,o,r),r};let Dt=class extends v{render(){return this.propInputData?d`
      <div class="settings-options">
        <table>
          ${this.propInputData.settings.map(e=>xo(e.inputType,[["radio",()=>this.createRadioPropInput(e)]],()=>this.createDefaultPropInput(e))??m)}
        </table>
        <button @click=${this.applyProps}>Apply</button>
      </div>
    `:m}createDefaultPropInput(e){const t=ne(e.label);return d`
      <tr>
        <td><label for=${t}>${e.label}</label></td>
        <td>
          <input
            class="prop-input"
            type=${e.inputType??"text"}
            id=${t}
            data-prop=${e.propertyName}
            data-format=${typeof e.defaultValue}
            placeholder=${e.defaultValue}
          />
        </td>
      </tr>
    `}createRadioPropInput(e){if(e.inputType!=="radio"||!e.radioOptions)return m;const t=ne(e.label);return d`
      <tr>
        <td><legend>${e.label}</legend></td>
        <td>
          ${e.radioOptions.map(o=>d`<input
                  type="radio"
                  class="prop-input"
                  name=${t}
                  id="${t}-${o}"
                  value=${o}
                  data-prop=${e.propertyName}
                  data-format=${typeof e.defaultValue}
                  ?checked=${e.defaultValue===o}
                /><label for="${t}-${o}"> ${o} </label>`)}
        </td>
      </tr>
    `}applyProps(){const e=[],t=[];this.propInputs?.forEach(o=>{if(!o.dataset.prop||!o.value||o.type==="radio"&&!o.checked)return;const i=o.dataset.prop;let r=o.value;switch(o.dataset.format){case"number":r=parseInt(r);break;case"boolean":r==="true"&&(r=!0),r==="false"&&(r=!1);break}const n=typeof r=="string"?`'${r}'`:r.toString();e.push(`.${i}=\${${n}}`),t.push({propName:i,value:r})}),this.dispatchEvent(new CustomEvent("propsApplied",{detail:{stringifiedProps:e.join(`
  `),appliedProps:t}}))}static get styles(){return[z,k`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }
      `]}};Ce([h({type:Object})],Dt.prototype,"propInputData",2);Ce([_e(".prop-input")],Dt.prototype,"propInputs",2);Dt=Ce([O("story-props-settings")],Dt);var mi=Object.defineProperty,bi=Object.getOwnPropertyDescriptor,I=(e,t,o,i)=>{for(var r=i>1?void 0:i?bi(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=(i?s(t,o,r):s(r))||r);return i&&r&&mi(t,o,r),r};let E=class extends v{constructor(){super(...arguments),this.elementTag="",this.elementClassName="",this.labs=!1,this.detailsVisible=!1,this.shouldShowPropertySettings=!1,this.shouldShowUsageNotes=!1,this.copiedKey=null}render(){return d`
      <div id="container">
        <h2>
          <code>&lt;${this.elementTag}&gt;</code>
          ${tt(this.labs,()=>d`<img
                src=${pi}
                alt="Labs icon"
                title="Labs"
                class="labs-icon"
              />`)}
        </h2>
        <h3>Demo</h3>
        <div class="slot-container" style=${ot(this.stringifiedStyles)}>
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
      ${tt(this.cssCode,()=>d`
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
          ${tt(!!this.propInputData,()=>d`
              <story-props-settings
                .propInputData=${this.propInputData}
                @propsApplied=${this.handlePropsApplied}
              ></story-props-settings>
            `)}
          ${tt(!this.propInputData&&!this.shouldShowPropertySettings,()=>d`<p class="section-placeholder">No settings to adjust</p>`)}
          <div
            class="slot-container ${this.shouldShowPropertySettings?"":"hidden"}"
            @slotchange=${this.handleSettingsSlotChange}
          >
            <slot name="settings"></slot>
          </div>
        </div>
        <div class="right-col">
          <h3>Styles</h3>
          ${tt(!!this.styleInputData,()=>d`
              <story-styles-settings
                .styleInputData=${this.styleInputData}
                @stylesApplied=${this.handleStylesApplied}
              ></story-styles-settings>
            `,()=>d`<p class="section-placeholder">No styles to adjust</p>`)}
        </div>
      </div>
      ${tt(this.shouldShowUsageNotes,()=>d` <h3>Usage Notes</h3>`)}
      <div class="slot-container">
        <slot
          name="usage-notes"
          @slotchange=${this.handleUsageNotesSlotChange}
        ></slot>
      </div>
    `}async copyToClipboard(e,t){try{await navigator.clipboard.writeText(e),this.copiedKey=t,clearTimeout(this._copyTimeout),this._copyTimeout=setTimeout(()=>this.copiedKey=null,2e3)}catch(o){console.warn("Clipboard write failed:",o)}}get importCode(){return this.elementClassName?`import '${this.modulePath}';
import { ${this.elementClassName} } from '${this.modulePath}';`:`import '${this.modulePath}';`}get exampleUsage(){const e=this.defaultUsageProps?"  "+this.defaultUsageProps+`
`:"",t=this.stringifiedProps?"  "+this.stringifiedProps+`
`:"",o=!!e||!!t,i=this.defaultSlottedContent&&o?`
 `+this.defaultSlottedContent+`
`:this.defaultSlottedContent;return`<${this.elementTag}${o?`
`:""}${e}${t}>${i??""}</${this.elementTag}>`}get cssCode(){return this.stringifiedStyles?`${this.elementTag} {
 ${this.stringifiedStyles}
}`:""}get modulePath(){return this.labs?`@internetarchive/elements/labs/${this.elementTag}/${this.elementTag}`:`@internetarchive/elements/${this.elementTag}/${this.elementTag}`}handleSettingsSlotChange(e){const t=e.target.assignedElements();this.shouldShowPropertySettings=t.length>0}handleUsageNotesSlotChange(e){const t=e.target.assignedElements();this.shouldShowUsageNotes=t.length>0}handleDemoComponentSlotted(e){const t=e.target.assignedElements()[0];t&&(this.slottedDemoComponent=t)}handleStylesApplied(e){const t=e.detail.styles;t&&(this.stringifiedStyles=t)}handlePropsApplied(e){const t=e.detail.stringifiedProps,o=e.detail.appliedProps;!t||!o||(this.stringifiedProps=t,o.forEach(i=>{this.slottedDemoComponent[i.propName]=i.value}))}static get styles(){return[z,k`
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
      `]}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._copyTimeout)}};I([h({type:String})],E.prototype,"elementTag",2);I([h({type:String})],E.prototype,"elementClassName",2);I([h({type:String})],E.prototype,"customExampleUsage",2);I([h({type:String})],E.prototype,"defaultUsageProps",2);I([h({type:String})],E.prototype,"defaultSlottedContent",2);I([h({type:Object})],E.prototype,"styleInputData",2);I([h({type:Object})],E.prototype,"propInputData",2);I([h({type:Boolean})],E.prototype,"labs",2);I([f()],E.prototype,"detailsVisible",2);I([f()],E.prototype,"stringifiedStyles",2);I([f()],E.prototype,"stringifiedProps",2);I([f()],E.prototype,"shouldShowPropertySettings",2);I([f()],E.prototype,"shouldShowUsageNotes",2);I([f()],E.prototype,"slottedDemoComponent",2);I([f()],E.prototype,"copiedKey",2);E=I([O("story-template")],E);const yi=e=>typeof e!="string"&&"strTag"in e,vi=(e,t,o)=>{let i=e[0];for(let r=1;r<e.length;r++)i+=t[r-1],i+=e[r];return i};const $i=(e=>yi(e)?vi(e.strings,e.values):e);let B=$i;class wi{constructor(){this.settled=!1,this.promise=new Promise((t,o)=>{this._resolve=t,this._reject=o})}resolve(t){this.settled=!0,this._resolve(t)}reject(t){this.settled=!0,this._reject(t)}}for(let e=0;e<256;e++)(e>>4&15).toString(16)+(e&15).toString(16);let xi=new wi;xi.resolve();var _i=Object.defineProperty,Si=Object.getOwnPropertyDescriptor,mt=(e,t,o,i)=>{for(var r=i>1?void 0:i?Si(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=(i?s(t,o,r):s(r))||r);return i&&r&&_i(t,o,r),r};let nt=class extends v{constructor(){super(...arguments),this.loadingTitle=B("Loading..."),this.successTitle=B("Success"),this.errorTitle=B("Error"),this.loadingStyle="ring-dots",this.mode="loading"}render(){return d`${xo(this.mode,[["ready",()=>this.placeholderTemplate],["loading",()=>this.loadingIndicatorTemplate],["success",()=>this.successIndicatorTemplate],["error",()=>this.errorIndicatorTemplate]])}`}get placeholderTemplate(){return d`<div class="placeholder"></div>`}get loadingIndicatorTemplate(){return d`
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
    `}get shouldShowLoadingDots(){return this.loadingStyle!=="ring"}static get styles(){return[z,k`
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
      `]}};mt([h({type:String})],nt.prototype,"loadingTitle",2);mt([h({type:String})],nt.prototype,"successTitle",2);mt([h({type:String})],nt.prototype,"errorTitle",2);mt([h({type:String})],nt.prototype,"loadingStyle",2);mt([h({type:String})],nt.prototype,"mode",2);nt=mt([O("ia-status-indicator")],nt);var Ci=Object.defineProperty,Ti=Object.getOwnPropertyDescriptor,J=(e,t,o,i)=>{for(var r=i>1?void 0:i?Ti(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=(i?s(t,o,r):s(r))||r);return i&&r&&Ci(t,o,r),r};let U=class extends v{constructor(){super(...arguments),this.mode="primary",this.loading=!1,this.disabled=!1,this.loadingText="",this.type="button",this.openLinksNewTab=!1}render(){return d`
      ${this.href?d`<a
            href=${this.href}
            target=${this.openLinksNewTab?"_blank":"_self"}
            >${this.buttonTemplate}</a
          >`:this.buttonTemplate}
      <slot name="hidden-button"></slot>
    `}willUpdate(e){e.has("type")&&this.setButtonTypeEmulation()}get buttonTemplate(){return d`
      <button
        part="button"
        class=${this.mode}
        ?disabled=${this.disabled||this.loading}
      >
        ${this.buttonTextTemplate}
      </button>
    `}get buttonTextTemplate(){return this.loading?this.loadingStateTemplate:d`<slot></slot>`}get loadingStateTemplate(){return d`
      <span class="loading-indicator" alt="Loading indicator">
        <ia-status-indicator mode="loading"></ia-status-indicator> ${B(this.loadingText)}
      </span>
    `}setButtonTypeEmulation(){const e=this.querySelector("input.hidden-button");if(e){e.type=this.type;return}this.addHiddenButton(),this.addEventListener("click",this.handleComponentClick)}handleComponentClick(e){if(this.type==="button"||e instanceof CustomEvent&&e.detail.formActionsInProgress)return;this.querySelector("input.hidden-button").dispatchEvent(new PointerEvent("click"))}addHiddenButton(){this.type!=="button"&&$o(d`<input
        type=${this.type}
        class="hidden-button"
        style="display:none"
        slot="hidden-button"
        @click=${e=>this.handleFormActions(e)}
      />`,this)}handleFormActions(e){e.stopPropagation(),e.isTrusted&&this.dispatchEvent(new CustomEvent("click",{detail:{formActionsInProgress:!0}}))}static get styles(){return[z,k`
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
      `]}};J([h({type:String})],U.prototype,"mode",2);J([h({type:Boolean})],U.prototype,"loading",2);J([h({type:Boolean})],U.prototype,"disabled",2);J([h({type:String})],U.prototype,"loadingText",2);J([h({type:String,reflect:!0})],U.prototype,"type",2);J([h({type:String})],U.prototype,"href",2);J([h({type:Boolean})],U.prototype,"openLinksNewTab",2);U=J([O("ia-button")],U);const ze=Object.freeze(Object.defineProperty({__proto__:null,get IAButton(){return U}},Symbol.toStringTag,{value:"Module"}));var Ai=Object.getOwnPropertyDescriptor,Oi=(e,t,o,i)=>{for(var r=i>1?void 0:i?Ai(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=s(r)||r);return r};const Ei=[{label:"Mode",propertyName:"mode",defaultValue:"primary",inputType:"radio",radioOptions:["primary","secondary","danger","warning","disabled","transparent","custom","link","danger-link"]},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Loading",propertyName:"loading",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Loading text",propertyName:"loadingText",defaultValue:"",inputType:"text"},{label:"Type",propertyName:"type",defaultValue:"button",inputType:"radio",radioOptions:["button","submit","reset"]},{label:"Link to attach to button",propertyName:"href",defaultValue:"",inputType:"text"},{label:"Open link in new tab",propertyName:"openLinksNewTab",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}],ki=[{label:"Button padding",cssVariable:"--ia-theme-button-padding",defaultValue:"0 1.875rem",inputType:"text"},{label:"Button width",cssVariable:"--ia-theme-button-width",defaultValue:"fit-content",inputType:"text"},{label:"Button height",cssVariable:"--ia-theme-button-height",defaultValue:"2.25rem",inputType:"text"},{label:"Button border width",cssVariable:"--ia-theme-button-border-width",defaultValue:"1px",inputType:"text"},{label:"Font",cssVariable:"--ia-theme-base-font-family",defaultValue:"'Helvetica Neue', Helvetica, Arial, sans-serif",inputType:"text"},{label:"Transition",cssVariable:"--ia-button-transition",defaultValue:"all 0.1s ease 0s",inputType:"text"},{label:"Text color (primary)",cssVariable:"--ia-theme-primary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (primary)",cssVariable:"--ia-theme-primary-cta-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (primary)",cssVariable:"--ia-theme-primary-cta-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Text color (secondary)",cssVariable:"--ia-theme-secondary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (secondary)",cssVariable:"--ia-theme-secondary-cta-fill",defaultValue:"#333333",inputType:"color"},{label:"Border color (secondary)",cssVariable:"--ia-theme-secondary-cta-border",defaultValue:"#666666",inputType:"color"},{label:"Text color (danger)",cssVariable:"--ia-theme-danger-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (danger)",cssVariable:"--ia-theme-danger-cta-fill",defaultValue:"#d9534f",inputType:"color"},{label:"Border color (danger)",cssVariable:"--ia-theme-danger-cta-border",defaultValue:"#d43f3a",inputType:"color"},{label:"Text color (warning)",cssVariable:"--ia-theme-warning-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (warning)",cssVariable:"--ia-theme-warning-cta-fill",defaultValue:"#ee8950",inputType:"color"},{label:"Border color (warning)",cssVariable:"--ia-theme-warning-cta-border",defaultValue:"#ec7939",inputType:"color"},{label:"Text color (disabled)",cssVariable:"--ia-theme-disabled-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (disabled)",cssVariable:"--ia-theme-disabled-cta-fill",defaultValue:"#666666",inputType:"color"},{label:"Border color (disabled)",cssVariable:"--ia-theme-disabled-cta-border",defaultValue:"#999999",inputType:"color"},{label:"Text color (custom)",cssVariable:"--ia-button-custom-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (custom)",cssVariable:"--ia-button-custom-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (custom)",cssVariable:"--ia-button-custom-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Text color (custom, on hover)",cssVariable:"--ia-button-custom-active-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (custom, on hover)",cssVariable:"--ia-button-custom-active-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (custom, on hover)",cssVariable:"--ia-button-custom-active-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Link color",cssVariable:"--ia-theme-link-color",defaultValue:"#4b64ff",inputType:"color"},{label:"Danger color",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}];let se=class extends v{render(){return d`
      <story-template
        elementTag="ia-button"
        elementClassName="IAButton"
        .defaultUsageProps=${"@click=${() => alert('Button clicked!')}"}
        .defaultSlottedContent=${"Click Me"}
        .styleInputData=${{settings:ki}}
        .propInputData=${{settings:Ei}}
      >
        <ia-button slot="demo" @click=${()=>alert("Button clicked!")}>
          Click Me
        </ia-button>
      </story-template>
    `}};se=Oi([O("ia-button-story")],se);const Pi=Object.freeze(Object.defineProperty({__proto__:null,get IAButtonStory(){return se}},Symbol.toStringTag,{value:"Module"})),_o=JSON.parse(`[{"name":"Afghanistan","flag":"🇦🇫"},{"name":"Albania","flag":"🇦🇱"},{"name":"Algeria","flag":"🇩🇿"},{"name":"Andorra","flag":"🇦🇩"},{"name":"Angola","flag":"🇦🇴"},{"name":"Antigua and Barbuda","flag":"🇦🇬"},{"name":"Argentina","flag":"🇦🇷"},{"name":"Armenia","flag":"🇦🇲"},{"name":"Aruba","flag":"🇦🇼"},{"name":"Australia","flag":"🇦🇺"},{"name":"Austria","flag":"🇦🇹"},{"name":"Azerbaijan","flag":"🇦🇿"},{"name":"Bahamas","flag":"🇧🇸"},{"name":"Bahrain","flag":"🇧🇭"},{"name":"Bangladesh","flag":"🇧🇩"},{"name":"Barbados","flag":"🇧🇧"},{"name":"Belarus","flag":"🇧🇾"},{"name":"Belgium","flag":"🇧🇪"},{"name":"Belize","flag":"🇧🇿"},{"name":"Benin","flag":"🇧🇯"},{"name":"Bhutan","flag":"🇧🇹"},{"name":"Bolivia","flag":"🇧🇴"},{"name":"Bosnia and Herzegovina","flag":"🇧🇦"},{"name":"Botswana","flag":"🇧🇼"},{"name":"Brazil","flag":"🇧🇷"},{"name":"Brunei","flag":"🇧🇳"},{"name":"Bulgaria","flag":"🇧🇬"},{"name":"Burkina Faso","flag":"🇧🇫"},{"name":"Burundi","flag":"🇧🇮"},{"name":"Cabo Verde","flag":"🇨🇻"},{"name":"Cambodia","flag":"🇰🇭"},{"name":"Cameroon","flag":"🇨🇲"},{"name":"Canada","flag":"🇨🇦"},{"name":"Central African Republic","flag":"🇨🇫"},{"name":"Chad","flag":"🇹🇩"},{"name":"Chile","flag":"🇨🇱"},{"name":"China","flag":"🇨🇳"},{"name":"Colombia","flag":"🇨🇴"},{"name":"Comoros","flag":"🇰🇲"},{"name":"Cook Islands","flag":"🇨🇰"},{"name":"Costa Rica","flag":"🇨🇷"},{"name":"Côte d'Ivoire","flag":"🇨🇮"},{"name":"Croatia","flag":"🇭🇷"},{"name":"Cuba","flag":"🇨🇺"},{"name":"Cyprus","flag":"🇨🇾"},{"name":"Czechia","flag":"🇨🇿"},{"name":"Democratic Republic of the Congo","flag":"🇨🇩"},{"name":"Denmark","flag":"🇩🇰"},{"name":"Djibouti","flag":"🇩🇯"},{"name":"Dominica","flag":"🇩🇲"},{"name":"Dominican Republic","flag":"🇩🇴"},{"name":"Ecuador","flag":"🇪🇨"},{"name":"Egypt","flag":"🇪🇬"},{"name":"El Salvador","flag":"🇸🇻"},{"name":"Equatorial Guinea","flag":"🇬🇶"},{"name":"Eritrea","flag":"🇪🇷"},{"name":"Estonia","flag":"🇪🇪"},{"name":"Eswatini","flag":"🇸🇿"},{"name":"Ethiopia","flag":"🇪🇹"},{"name":"Fiji","flag":"🇫🇯"},{"name":"Finland","flag":"🇫🇮"},{"name":"France","flag":"🇫🇷"},{"name":"Gabon","flag":"🇬🇦"},{"name":"Gambia","flag":"🇬🇲"},{"name":"Georgia","flag":"🇬🇪"},{"name":"Germany","flag":"🇩🇪"},{"name":"Ghana","flag":"🇬🇭"},{"name":"Greece","flag":"🇬🇷"},{"name":"Grenada","flag":"🇬🇩"},{"name":"Guatemala","flag":"🇬🇹"},{"name":"Guinea","flag":"🇬🇳"},{"name":"Guinea-Bissau","flag":"🇬🇼"},{"name":"Guyana","flag":"🇬🇾"},{"name":"Haiti","flag":"🇭🇹"},{"name":"Honduras","flag":"🇭🇳"},{"name":"Hungary","flag":"🇭🇺"},{"name":"Iceland","flag":"🇮🇸"},{"name":"India","flag":"🇮🇳"},{"name":"Indonesia","flag":"🇮🇩"},{"name":"Iran","flag":"🇮🇷"},{"name":"Iraq","flag":"🇮🇶"},{"name":"Ireland","flag":"🇮🇪"},{"name":"Israel","flag":"🇮🇱"},{"name":"Italy","flag":"🇮🇹"},{"name":"Jamaica","flag":"🇯🇲"},{"name":"Japan","flag":"🇯🇵"},{"name":"Jordan","flag":"🇯🇴"},{"name":"Kazakhstan","flag":"🇰🇿"},{"name":"Kenya","flag":"🇰🇪"},{"name":"Kiribati","flag":"🇰🇮"},{"name":"Kosovo","flag":"🇽🇰"},{"name":"Kuwait","flag":"🇰🇼"},{"name":"Kyrgyzstan","flag":"🇰🇬"},{"name":"Laos","flag":"🇱🇦"},{"name":"Latvia","flag":"🇱🇻"},{"name":"Lebanon","flag":"🇱🇧"},{"name":"Lesotho","flag":"🇱🇸"},{"name":"Liberia","flag":"🇱🇷"},{"name":"Libya","flag":"🇱🇾"},{"name":"Liechtenstein","flag":"🇱🇮"},{"name":"Lithuania","flag":"🇱🇹"},{"name":"Luxembourg","flag":"🇱🇺"},{"name":"Madagascar","flag":"🇲🇬"},{"name":"Malawi","flag":"🇲🇼"},{"name":"Malaysia","flag":"🇲🇾"},{"name":"Maldives","flag":"🇲🇻"},{"name":"Mali","flag":"🇲🇱"},{"name":"Malta","flag":"🇲🇹"},{"name":"Marshall Islands","flag":"🇲🇭"},{"name":"Mauritania","flag":"🇲🇷"},{"name":"Mauritius","flag":"🇲🇺"},{"name":"Mexico","flag":"🇲🇽"},{"name":"Micronesia","flag":"🇫🇲"},{"name":"Moldova","flag":"🇲🇩"},{"name":"Monaco","flag":"🇲🇨"},{"name":"Mongolia","flag":"🇲🇳"},{"name":"Montenegro","flag":"🇲🇪"},{"name":"Morocco","flag":"🇲🇦"},{"name":"Mozambique","flag":"🇲🇿"},{"name":"Myanmar","flag":"🇲🇲"},{"name":"Namibia","flag":"🇳🇦"},{"name":"Nauru","flag":"🇳🇷"},{"name":"Nepal","flag":"🇳🇵"},{"name":"Netherlands","flag":"🇳🇱"},{"name":"New Zealand","flag":"🇳🇿"},{"name":"Nicaragua","flag":"🇳🇮"},{"name":"Niue","flag":"🇳🇺"},{"name":"Niger","flag":"🇳🇪"},{"name":"Nigeria","flag":"🇳🇬"},{"name":"North Korea","flag":"🇰🇵"},{"name":"North Macedonia","flag":"🇲🇰"},{"name":"Norway","flag":"🇳🇴"},{"name":"Oman","flag":"🇴🇲"},{"name":"Pakistan","flag":"🇵🇰"},{"name":"Palau","flag":"🇵🇼"},{"name":"Palestine","flag":"🇵🇸"},{"name":"Panama","flag":"🇵🇦"},{"name":"Papua New Guinea","flag":"🇵🇬"},{"name":"Paraguay","flag":"🇵🇾"},{"name":"Peru","flag":"🇵🇪"},{"name":"Philippines","flag":"🇵🇭"},{"name":"Poland","flag":"🇵🇱"},{"name":"Portugal","flag":"🇵🇹"},{"name":"Qatar","flag":"🇶🇦"},{"name":"Republic of the Congo","flag":"🇨🇬"},{"name":"Romania","flag":"🇷🇴"},{"name":"Russia","flag":"🇷🇺"},{"name":"Rwanda","flag":"🇷🇼"},{"name":"Saint Kitts and Nevis","flag":"🇰🇳"},{"name":"Saint Lucia","flag":"🇱🇨"},{"name":"Saint Vincent and the Grenadines","flag":"🇻🇨"},{"name":"Samoa","flag":"🇼🇸"},{"name":"San Marino","flag":"🇸🇲"},{"name":"Sao Tome and Principe","flag":"🇸🇹"},{"name":"Saudi Arabia","flag":"🇸🇦"},{"name":"Senegal","flag":"🇸🇳"},{"name":"Serbia","flag":"🇷🇸"},{"name":"Seychelles","flag":"🇸🇨"},{"name":"Sierra Leone","flag":"🇸🇱"},{"name":"Singapore","flag":"🇸🇬"},{"name":"Slovakia","flag":"🇸🇰"},{"name":"Slovenia","flag":"🇸🇮"},{"name":"Solomon Islands","flag":"🇸🇧"},{"name":"Somalia","flag":"🇸🇴"},{"name":"South Africa","flag":"🇿🇦"},{"name":"South Korea","flag":"🇰🇷"},{"name":"South Sudan","flag":"🇸🇸"},{"name":"Spain","flag":"🇪🇸"},{"name":"Sri Lanka","flag":"🇱🇰"},{"name":"Sudan","flag":"🇸🇩"},{"name":"Suriname","flag":"🇸🇷"},{"name":"Sweden","flag":"🇸🇪"},{"name":"Switzerland","flag":"🇨🇭"},{"name":"Syria","flag":"🇸🇾"},{"name":"Taiwan","flag":"🇹🇼"},{"name":"Tajikistan","flag":"🇹🇯"},{"name":"Tanzania","flag":"🇹🇿"},{"name":"Thailand","flag":"🇹🇭"},{"name":"Timor-Leste","flag":"🇹🇱"},{"name":"Togo","flag":"🇹🇬"},{"name":"Tonga","flag":"🇹🇴"},{"name":"Trinidad and Tobago","flag":"🇹🇹"},{"name":"Tunisia","flag":"🇹🇳"},{"name":"Turkey","flag":"🇹🇷"},{"name":"Turkmenistan","flag":"🇹🇲"},{"name":"Tuvalu","flag":"🇹🇻"},{"name":"Uganda","flag":"🇺🇬"},{"name":"Ukraine","flag":"🇺🇦"},{"name":"United Arab Emirates","flag":"🇦🇪"},{"name":"United Kingdom","flag":"🇬🇧"},{"name":"United States","flag":"🇺🇸"},{"name":"Uruguay","flag":"🇺🇾"},{"name":"Uzbekistan","flag":"🇺🇿"},{"name":"Vanuatu","flag":"🇻🇺"},{"name":"Vatican City","flag":"🇻🇦"},{"name":"Venezuela","flag":"🇻🇪"},{"name":"Vietnam","flag":"🇻🇳"},{"name":"Yemen","flag":"🇾🇪"},{"name":"Zambia","flag":"🇿🇲"},{"name":"Zimbabwe","flag":"🇿🇼"}]`);const Gt=zt(class extends Ht{constructor(e){if(super(e),e.type!==q.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}const o=e.element.classList;for(const i of this.st)i in t||(o.remove(i),this.st.delete(i));for(const i in t){const r=!!t[i];r===this.st.has(i)||this.nt?.has(i)||(r?(o.add(i),this.st.add(i)):(o.remove(i),this.st.delete(i)))}return L}});const Ii=e=>e.strings===void 0,Bi={},Vi=(e,t=Bi)=>e._$AH=t;const Di=zt(class extends Ht{constructor(e){if(super(e),e.type!==q.PROPERTY&&e.type!==q.ATTRIBUTE&&e.type!==q.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ii(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===L||t===m)return t;const o=e.element,i=e.name;if(e.type===q.PROPERTY){if(t===o[i])return L}else if(e.type===q.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(i))return L}else if(e.type===q.ATTRIBUTE&&o.getAttribute(i)===t+"")return L;return Vi(e),t}});function Ri(e,t){return t.some(o=>e.has(o))}function Li(e,t){const o=[...e],i=[...t],r=o.length,n=i.length;if(r===0)return!0;let s=0,l=0;for(;l<n;){if(i[l]===o[s]&&(s+=1),s>=r)return!0;l+=1}return!1}const Ni="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501%202.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131%202.7226499%201.81402515z'%20%3e%3c/path%3e%3c/svg%3e",ji="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499%203.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501%202.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131%202.7226499-1.81402514z'%20%3e%3c/path%3e%3c/svg%3e",Mi="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m50%200c27.6142375%200%2050%2022.3857625%2050%2050s-22.3857625%2050-50%2050-50-22.3857625-50-50%2022.3857625-50%2050-50zm23.8159475%2026.1840525c-1.4033215-1.4033215-3.5816761-1.5592461-5.1572272-.4677738l-.5598841.4677738-18.0988362%2018.0989475-18.0988362-18.0989475-.5598841-.4677738c-1.5755511-1.0914723-3.7539057-.9355477-5.1572272.4677738-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113l18.0989475%2018.0988362-18.0989475%2018.0988362c-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113%201.4033215%201.4033215%203.5816761%201.5592461%205.1572272.4677738l.5598841-.4677738%2018.0988362-18.0989475%2018.0988362%2018.0989475.5598841.4677738c1.5755511%201.0914723%203.7539057.9355477%205.1572272-.4677738%201.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113l-18.0989475-18.0988362%2018.0989475-18.0988362c1.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113z'%20fill-rule='evenodd'%20%3e%3c/path%3e%3c/svg%3e";var Ui=Object.defineProperty,zi=Object.getOwnPropertyDescriptor,C=(e,t,o,i)=>{for(var r=i>1?void 0:i?zi(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=(i?s(t,o,r):s(r))||r);return i&&r&&Ui(t,o,r),r};const Hi={all:()=>!0,prefix:(e,t)=>t.startsWith(e),suffix:(e,t)=>t.endsWith(e),substring:(e,t)=>t.includes(e),subsequence:Li},Fi="list",qi="substring",Ki=e=>e,Wi=e=>e.toLocaleLowerCase();let x=class extends v{constructor(){super(),this.options=[],this.behavior=Fi,this.maxAutocompleteEntries=Number.POSITIVE_INFINITY,this.filter=qi,this.caseSensitive=!1,this.sort=!1,this.wrapArrowKeys=!1,this.stayOpen=!1,this.clearable=!1,this.open=!1,this.disabled=!1,this.required=!1,this.value=null,this.hasFocus=!1,this.highlightedOption=null,this.enteredText="",this.filterText="",this.losingFocus=!1,this.optionsByID=new Map,this.optionFilteringValues=new Map,this.optionsRespectingSortFlag=[],this.filteredOptions=[],this.internals=this.attachInternals()}render(){const e=Gt({disabled:this.disabled,focused:this.hasFocus});return d`
      <div id="container" part="container">
        ${this.labelTemplate}
        <div id="main-widget-row" class=${e} part="combo-box">
          ${this.textInputTemplate}
          ${this.clearable?this.clearButtonTemplate:m}
          ${this.caretButtonTemplate}
        </div>
        ${this.optionsListTemplate}
      </div>
    `}willUpdate(e){(e.has("options")||e.has("caseSensitive"))&&this.rebuildOptionFilteringValues(),e.has("options")&&this.rebuildOptionIDMap(),(e.has("options")||e.has("sort"))&&this.rebuildSortedOptions(),Ri(e,["options","behavior","maxAutocompleteEntries","filter","filterText","caseSensitive","sort"])&&this.rebuildFilteredOptions(),e.has("open")&&(this.open?this.value&&this.setHighlightedOption(this.selectedOption):this.setHighlightedOption(null)),e.has("required")&&this.updateFormValidity()}updated(e){e.has("value")&&this.handleValueChanged(),e.has("options")&&this.behavior!=="freeform"&&!this.selectedOption&&this.clearSelectedOption(),e.has("open")&&(this.open?(this.positionOptionsMenu(),this.optionsList?.showPopover?.(),this.optionsList?.classList.add("visible")):(this.optionsList?.hidePopover?.(),this.optionsList?.classList.remove("visible")))}get labelTemplate(){return d`
      <label id="label" for="text-input" part="label">
        <slot name="label"></slot>
      </label>
    `}get textInputTemplate(){const e=Gt({"clear-padding":this.clearable&&!this.shouldShowClearButton});return d`
      <input
        type="text"
        id="text-input"
        class=${e}
        .value=${Di(this.enteredText)}
        placeholder=${ot(this.placeholder)}
        part="text-input"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-controls="options-list"
        aria-expanded=${this.open}
        aria-activedescendant=${ot(this.highlightedOption?.id)}
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
        <span class="sr-only">${B("Clear")}</span>
        <slot name="clear-button">
          <img
            class="icon clear-icon"
            part="icon clear-icon"
            src=${Mi}
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
          src=${Ni}
          alt=""
          aria-hidden="true"
        />
      </slot>
      <slot name="caret-open" ?hidden=${!this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${ji}
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
        <span class="sr-only">${B("Toggle options")}</span>
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
        ${tt(this.open,()=>this.optionTemplates)}
        <slot name="options-list-bottom"></slot>
      </ul>
    `}get optionTemplates(){return this.filteredOptions.length===0&&this.maxAutocompleteEntries>0?[this.emptyOptionsTemplate]:this.filteredOptions.map(e=>{const t=e===this.highlightedOption,o=Gt({option:!0,highlight:t});return d`
        <li
          id=${e.id}
          class=${o}
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
      `})}get emptyOptionsTemplate(){return d`
      <li id="empty-options" part="empty-options">
        <slot name="empty-options">${B("No matching options")}</slot>
      </li>
    `}handleOptionPointerEnter(e){this.handleOptionPointerMove(e)}handleOptionPointerMove(e){const t=e.currentTarget,o=this.getOptionFor(t.id);o&&this.setHighlightedOption(o)}handleOptionClick(e){const t=e.currentTarget,o=this.getOptionFor(t.id);o&&(this.setSelectedOption(o.id),this.stayOpen||this.closeOptionsMenu())}handleComboBoxKeyDown(e){switch(e.key){case"Enter":this.handleEnterPressed();break;case"Escape":this.handleEscapePressed();break;case"ArrowUp":e.altKey?this.handleAltUpArrowPressed():this.handleUpArrowPressed();break;case"ArrowDown":e.altKey?this.handleAltDownArrowPressed():this.handleDownArrowPressed();break;case"Tab":this.handleTabPressed();return;case" ":this.handleSpacePressed(e);return;default:return}e.stopPropagation(),e.preventDefault()}async handleTextBoxInput(){const e=this.textInput?.value??"";this.enteredText=e,this.setFilterText(e),this.openOptionsMenu(),await this.updateComplete,this.highlightFirstOption()}handleEnterPressed(){if(!this.open){this.openOptionsMenu();return}this.highlightedOption?this.setSelectedOption(this.highlightedOption.id):this.behavior==="freeform"&&this.setValue(this.enteredText),this.stayOpen||(this.open=!1)}handleEscapePressed(){if(this.open){this.closeOptionsMenu();return}this.clearSelectedOption()}handleUpArrowPressed(){this.open||this.openOptionsMenu(),this.highlightPreviousOption()}handleDownArrowPressed(){this.open||this.openOptionsMenu(),this.highlightNextOption()}handleAltUpArrowPressed(){this.closeOptionsMenu()}handleAltDownArrowPressed(){this.openOptionsMenu()}handleTabPressed(){this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1))}handleSpacePressed(e){this.behavior==="select-only"&&(this.open?this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1)):this.openOptionsMenu(),e.stopPropagation(),e.preventDefault())}handleComboBoxClick(){this.toggleOptionsMenu()}handleClearButtonClick(){this.clearSelectedOption(),this.textInput?.focus(),this.openOptionsMenu()}handleFocus(){this.behavior!=="select-only"&&this.textInput?.focus(),this.hasFocus=!0,this.losingFocus=!1}handleBlur(){this.hasFocus=!1,this.losingFocus=!0,setTimeout(()=>{this.losingFocus&&!this.shadowRoot?.activeElement&&(this.losingFocus=!1,this.closeOptionsMenu(),this.behavior==="list"?this.setTextValue(this.selectedOption?.text??"",!1):this.behavior==="freeform"&&(this.enteredText||this.value)&&this.setValue(this.enteredText))},0)}handleValueChanged(){if(this.value==null){this.enteredText&&this.setTextValue("",!1);return}const e=this.getOptionFor(this.value);if(this.behavior==="freeform"){const t=e?.text??this.value;t!==this.enteredText&&this.setTextValue(t);return}if(!e){this.clearSelectedOption();return}this.enteredText!==e.text&&(this.setTextValue(e.text,!1),this.setFilterText(""))}highlightFirstOption(){this.setHighlightedOption(this.firstFilteredOption)}highlightLastOption(){this.setHighlightedOption(this.lastFilteredOption)}highlightPreviousOption(){const{filteredOptions:e,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightLastOption();return}const{highlightedIndex:o}=this,i=this.wrapArrowKeys&&o===0?t:Math.max(o-1,0);this.setHighlightedOption(e[i])}highlightNextOption(){const{filteredOptions:e,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightFirstOption();return}const{highlightedIndex:o}=this,i=this.wrapArrowKeys&&o===t?0:Math.min(o+1,t);this.setHighlightedOption(e[i])}async setHighlightedOption(e){this.highlightedOption=e,await this.updateComplete;const{optionsList:t,highlightedElement:o}=this;if(!o||!t)return;const i=o.getBoundingClientRect(),r=t.getBoundingClientRect();(i.top<r.top||i.bottom>r.bottom)&&o.scrollIntoView({block:"nearest"})}setSelectedOption(e){const t=this.getOptionFor(e);if(!t)throw new RangeError("Unknown option ID");const o=this.value;this.value=t.id,this.internals.setFormValue(this.value),this.setTextValue(t.text,!1),this.setFilterText(""),this.value!==o&&this.emitChangeEvent(),t.onSelected?.(t)}clearSelectedOption(){const e=this.value;this.value=null,this.internals.setFormValue(this.value),this.setTextValue(""),this.value!==e&&this.emitChangeEvent()}setValue(e){if(this.behavior==="freeform"){const t=this.value;this.value=e,this.internals.setFormValue(this.value),this.setTextValue(e),this.value!==t&&this.emitChangeEvent()}else this.setSelectedOption(e)}setTextValue(e,t=!0){this.textInput&&(this.textInput.value=e),this.enteredText=e,t&&this.setFilterText(e)}setFilterText(e){const{caseTransform:t}=this;this.filterText=t(e)}openOptionsMenu(){this.open=!0,this.emitToggleEvent()}closeOptionsMenu(){this.open=!1,this.emitToggleEvent()}toggleOptionsMenu(){this.open=!this.open,this.emitToggleEvent()}updateFormValidity(){this.required&&!this.value?this.internals.setValidity({valueMissing:!0},B("A value is required")):this.internals.setValidity({})}emitChangeEvent(){this.dispatchEvent(new CustomEvent("change",{detail:this.value}))}emitToggleEvent(){this.dispatchEvent(new CustomEvent("toggle",{detail:this.open}))}get isEmpty(){return!this.selectedOption&&!this.enteredText}get shouldShowClearButton(){return this.clearable&&!this.disabled&&!this.isEmpty}positionOptionsMenu(){const{mainWidgetRow:e,optionsList:t}=this;if(!e||!t)return;const o=e.getBoundingClientRect(),{innerHeight:i,scrollX:r,scrollY:n}=window,s=o.top,l=i-o.bottom,a="var(--combo-box-list-max-height--)",c={top:`${o.bottom+n}px`,left:`${o.left+r}px`,width:`var(--combo-box-list-width--, ${o.width}px)`,maxHeight:`min(${a}, ${l}px)`};Object.assign(t.style,c),setTimeout(()=>{const p=t.getBoundingClientRect().bottom>=i,g=s>l;p&&g&&(t.style.top="auto",t.style.bottom=`${i-o.top-n}px`,t.style.maxHeight=`min(${a}, ${s}px)`)},0)}get caseTransform(){return this.caseSensitive?Ki:Wi}getOptionFor(e){return this.optionsByID.get(e)??null}rebuildOptionIDMap(){this.optionsByID.clear();for(const e of this.options)this.optionsByID.set(e.id,e)}rebuildSortedOptions(){this.sort?this.optionsRespectingSortFlag=[...this.options].sort((e,t)=>{const o=this.optionFilteringValues.get(e),i=this.optionFilteringValues.get(t);return o.localeCompare(i)}):this.optionsRespectingSortFlag=this.options}rebuildOptionFilteringValues(){this.optionFilteringValues.clear();const{caseTransform:e}=this;for(const t of this.options){const o=e(t.text);this.optionFilteringValues.set(t,o)}}rebuildFilteredOptions(){const e=this.behavior==="select-only"?"all":this.filter,t=typeof e=="string"?Hi[e]:e,o=this.optionsRespectingSortFlag.filter(i=>{const r=this.optionFilteringValues.get(i);return r?t(this.filterText,r,i):!1}).slice(0,this.maxAutocompleteEntries);this.filteredOptions=o}get firstFilteredOption(){return this.filteredOptions[0]??null}get lastFilteredOption(){return this.filteredOptions[this.lastFilteredIndex]??null}get lastFilteredIndex(){return this.filteredOptions.length-1}get selectedOption(){return this.value==null?null:this.getOptionFor(this.value)}get highlightedIndex(){return this.highlightedOption?this.filteredOptions.indexOf(this.highlightedOption):-1}get highlightedElement(){return this.highlightedOption?this.shadowRoot.getElementById(this.highlightedOption.id):null}static get styles(){const e=k`
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
    `;return[z,e]}};x.formAssociated=!0;x.shadowRootOptions={...v.shadowRootOptions,delegatesFocus:!0};C([h({type:Array})],x.prototype,"options",2);C([h({type:String})],x.prototype,"placeholder",2);C([h({type:String})],x.prototype,"behavior",2);C([h({type:Number,attribute:"max-autocomplete-entries"})],x.prototype,"maxAutocompleteEntries",2);C([h({type:String})],x.prototype,"filter",2);C([h({type:Boolean,reflect:!0,attribute:"case-sensitive"})],x.prototype,"caseSensitive",2);C([h({type:Boolean,reflect:!0})],x.prototype,"sort",2);C([h({type:Boolean,reflect:!0,attribute:"wrap-arrow-keys"})],x.prototype,"wrapArrowKeys",2);C([h({type:Boolean,reflect:!0,attribute:"stay-open"})],x.prototype,"stayOpen",2);C([h({type:Boolean,reflect:!0})],x.prototype,"clearable",2);C([h({type:Boolean,reflect:!0})],x.prototype,"open",2);C([h({type:Boolean,reflect:!0})],x.prototype,"disabled",2);C([h({type:Boolean,reflect:!0})],x.prototype,"required",2);C([h({type:String})],x.prototype,"value",2);C([f()],x.prototype,"hasFocus",2);C([f()],x.prototype,"highlightedOption",2);C([f()],x.prototype,"enteredText",2);C([f()],x.prototype,"filterText",2);C([w("#main-widget-row")],x.prototype,"mainWidgetRow",2);C([w("#text-input")],x.prototype,"textInput",2);C([w("#options-list")],x.prototype,"optionsList",2);x=C([O("ia-combo-box")],x);var Gi=Object.defineProperty,Zi=Object.getOwnPropertyDescriptor,_=(e,t,o,i)=>{for(var r=i>1?void 0:i?Zi(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=(i?s(t,o,r):s(r))||r);return i&&r&&Gi(t,o,r),r};const Yi=[{label:"Width",cssVariable:"--ia-theme-combo-box-width",defaultValue:"250px",inputType:"text"},{label:"Padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown width",cssVariable:"--combo-box-list-width",defaultValue:"",inputType:"text"},{label:"Dropdown max height",cssVariable:"--combo-box-list-max-height",defaultValue:"250px",inputType:"text"},{label:"Dropdown fade duration",cssVariable:"--combo-box-list-fade-duration",defaultValue:125,inputType:"range",min:0,max:1e3,step:25,unit:"ms"}],So=[{id:"red",text:"Red"},{id:"orange",text:"Orange"},{id:"yellow",text:"Yellow"},{id:"green",text:"Green"},{id:"blue",text:"Blue"},{id:"indigo",text:"Indigo"},{id:"violet",text:"Violet"}],Ji=So.map(e=>({...e,content:d` <span style="display: flex; align-items: center">
      <span style="flex: 1">${e.text}</span>
      <div style="width: 15px; height: 15px; background:${e.id}"></div>
    </span>`})),He=_o.map(e=>({id:e.name,text:e.name})),Qi=_o.map(e=>({id:e.name,text:e.name,content:d`<span>${e.flag}</span>&nbsp;<span>${e.name}</span>`})),Xi="list",tr="Choices",Fe="Select an option...",qe=50,er="substring";let $=class extends v{constructor(){super(...arguments),this.options=He,this.behavior=Xi,this.label=tr,this.placeholder=Fe,this.maxAutocompleteEntries=qe,this.filterFn=er,this.caseSensitive=!1,this.shouldSort=!1,this.wrapArrowKeys=!0,this.clearable=!0,this.disabled=!1,this.announcerText=""}render(){return d`
      <story-template
        elementTag="ia-combo-box"
        elementClassName="IAComboBox"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:Yi}}
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
                  value=${Fe}
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
                  value=${qe}
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
    `}get exampleUsage(){const{placeholder:e,behavior:t,maxAutocompleteEntries:o,filterFn:i}=this,r={behavior:t?`"${t}"`:"",placeholder:e?`"${e}"`:"","max-autocomplete-entries":o?`"${o}"`:"",filter:i&&i!=="substring"?`"${i}"`:"","case-sensitive":this.caseSensitive,sort:this.shouldSort,"wrap-arrow-keys":this.wrapArrowKeys,clearable:this.clearable,disabled:this.disabled};return`
      <ia-combo-box
        .options=\${[
          { id: 'foo', text: 'Foo Option' },
          { id: 'bar', text: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(r).map(([s,l])=>l?l===!0?s:l?`${s}=${l}`:"":"").join(`
  `)}
      >
        <span slot="label">${this.label}</span>
      </ia-combo-box>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(e){e.preventDefault(),this.updateOptions(),this.behavior=this.behaviorSelect.value,this.label=this.labelInput.value,this.placeholder=this.placeholderInput.value,this.maxAutocompleteEntries=Number(this.maxAutocompleteInput.value),this.filterFn=this.filterFnSelect.value,this.caseSensitive=this.caseSensitiveCheck.checked,this.shouldSort=this.sortCheck.checked,this.wrapArrowKeys=this.wrapArrowKeysCheck.checked,this.clearable=this.clearableCheck.checked,this.disabled=this.disabledCheck.checked}updateOptions(){switch(this.optionSetSelect.value){case"colors":this.options=this.customContentCheck.checked?Ji:So;break;case"countries":this.options=this.customContentCheck.checked?Qi:He;break;default:this.options=[]}}handleComboBoxChange(e){this.announcerText=`New value is: ${e.detail}`}static get styles(){return k`
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
    `}};_([f()],$.prototype,"options",2);_([f()],$.prototype,"behavior",2);_([f()],$.prototype,"label",2);_([f()],$.prototype,"placeholder",2);_([f()],$.prototype,"maxAutocompleteEntries",2);_([f()],$.prototype,"filterFn",2);_([f()],$.prototype,"caseSensitive",2);_([f()],$.prototype,"shouldSort",2);_([f()],$.prototype,"wrapArrowKeys",2);_([f()],$.prototype,"clearable",2);_([f()],$.prototype,"disabled",2);_([f()],$.prototype,"announcerText",2);_([w("#settings__options")],$.prototype,"optionSetSelect",2);_([w("#settings__custom-content")],$.prototype,"customContentCheck",2);_([w("#settings__behavior")],$.prototype,"behaviorSelect",2);_([w("#settings__label")],$.prototype,"labelInput",2);_([w("#settings__placeholder")],$.prototype,"placeholderInput",2);_([w("#settings__max-entries")],$.prototype,"maxAutocompleteInput",2);_([w("#settings__filter-fn")],$.prototype,"filterFnSelect",2);_([w("#settings__case-sensitive")],$.prototype,"caseSensitiveCheck",2);_([w("#settings__sort")],$.prototype,"sortCheck",2);_([w("#settings__wrap")],$.prototype,"wrapArrowKeysCheck",2);_([w("#settings__clearable")],$.prototype,"clearableCheck",2);_([w("#settings__disabled")],$.prototype,"disabledCheck",2);$=_([O("ia-combo-box-story")],$);const or=Object.freeze(Object.defineProperty({__proto__:null,get IAComboBoxStory(){return $}},Symbol.toStringTag,{value:"Module"}));function*ir(e,t){if(e!==void 0){let o=0;for(const i of e)yield t(i,o++)}}const rr="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20class='fill-color'%20d='m17.0555551%2041.3194459c0-12.7430552%2010.3541664-23.1027772%2023.0847216-23.1027772%2012.7166664%200%2023.0777773%2010.359722%2023.0777773%2023.1027772%200%2012.7361108-10.3611109%2023.0986106-23.0777773%2023.0986106-12.7305552%200-23.0847216-10.3624998-23.0847216-23.0986106zm-17.24305512%200c0%2022.2916661%2018.04583292%2040.3472213%2040.32777672%2040.3472213%208.9208332%200%2017.145833-2.9319449%2023.8194439-7.8527776l24.1513883%2024.0777771c1.2125%201.1402778%202.8430555%201.8430556%204.6374999%201.8430556%203.7444443%200%206.7805554-3.0361111%206.7805554-6.7791665%200-2.0652778-.9222222-3.9069444-2.3736111-5.1499999l-23.718055-23.7458328c4.4152777-6.4791665%207.0152776-14.3055552%207.0152776-22.7402772%200-22.2791661-18.0458328-40.34861006-40.312499-40.34861006-22.2819438%200-40.32777672%2018.06944396-40.32777672%2040.34861006z'%20fill='%232c2c2c'%20fill-rule='evenodd'%20/%3e%3c/svg%3e";function b(e,t,o,i){var r=arguments.length,n=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(n=(r<3?s(n):r>3?s(t,o,n):s(t,o))||n);return r>3&&n&&Object.defineProperty(t,o,n),n}const Pt=window,Te=Pt.ShadowRoot&&(Pt.ShadyCSS===void 0||Pt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ae=Symbol(),Ke=new WeakMap;let Co=class{constructor(t,o,i){if(this._$cssResult$=!0,i!==Ae)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=o}get styleSheet(){let t=this.o;const o=this.t;if(Te&&t===void 0){const i=o!==void 0&&o.length===1;i&&(t=Ke.get(o)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ke.set(o,t))}return t}toString(){return this.cssText}};const nr=e=>new Co(typeof e=="string"?e:e+"",void 0,Ae),V=(e,...t)=>{const o=e.length===1?e[0]:t.reduce(((i,r,n)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[n+1]),e[0]);return new Co(o,e,Ae)},sr=(e,t)=>{Te?e.adoptedStyleSheets=t.map((o=>o instanceof CSSStyleSheet?o:o.styleSheet)):t.forEach((o=>{const i=document.createElement("style"),r=Pt.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=o.cssText,e.appendChild(i)}))},We=Te?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let o="";for(const i of t.cssRules)o+=i.cssText;return nr(o)})(e):e;var Zt;const Rt=window,Ge=Rt.trustedTypes,ar=Ge?Ge.emptyScript:"",Ze=Rt.reactiveElementPolyfillSupport,ae={toAttribute(e,t){switch(t){case Boolean:e=e?ar:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=e!==null;break;case Number:o=e===null?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch{o=null}}return o}},To=(e,t)=>t!==e&&(t==t||e==e),Yt={attribute:!0,type:String,converter:ae,reflect:!1,hasChanged:To},le="finalized";let pt=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var o;this.finalize(),((o=this.h)!==null&&o!==void 0?o:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((o,i)=>{const r=this._$Ep(i,o);r!==void 0&&(this._$Ev.set(r,i),t.push(r))})),t}static createProperty(t,o=Yt){if(o.state&&(o.attribute=!1),this.finalize(),this.elementProperties.set(t,o),!o.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,r=this.getPropertyDescriptor(t,i,o);r!==void 0&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,o,i){return{get(){return this[o]},set(r){const n=this[t];this[o]=r,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Yt}static finalize(){if(this.hasOwnProperty(le))return!1;this[le]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const o=this.properties,i=[...Object.getOwnPropertyNames(o),...Object.getOwnPropertySymbols(o)];for(const r of i)this.createProperty(r,o[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const o=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)o.unshift(We(r))}else t!==void 0&&o.push(We(t));return o}static _$Ep(t,o){const i=o.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((o=>this.enableUpdating=o)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach((o=>o(this)))}addController(t){var o,i;((o=this._$ES)!==null&&o!==void 0?o:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var o;(o=this._$ES)===null||o===void 0||o.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,o)=>{this.hasOwnProperty(o)&&(this._$Ei.set(o,this[o]),delete this[o])}))}createRenderRoot(){var t;const o=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return sr(o,this.constructor.elementStyles),o}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach((o=>{var i;return(i=o.hostConnected)===null||i===void 0?void 0:i.call(o)}))}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach((o=>{var i;return(i=o.hostDisconnected)===null||i===void 0?void 0:i.call(o)}))}attributeChangedCallback(t,o,i){this._$AK(t,i)}_$EO(t,o,i=Yt){var r;const n=this.constructor._$Ep(t,i);if(n!==void 0&&i.reflect===!0){const s=(((r=i.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?i.converter:ae).toAttribute(o,i.type);this._$El=t,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(t,o){var i;const r=this.constructor,n=r._$Ev.get(t);if(n!==void 0&&this._$El!==n){const s=r.getPropertyOptions(n),l=typeof s.converter=="function"?{fromAttribute:s.converter}:((i=s.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?s.converter:ae;this._$El=n,this[n]=l.fromAttribute(o,s.type),this._$El=null}}requestUpdate(t,o,i){let r=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||To)(this[t],o)?(this._$AL.has(t)||this._$AL.set(t,o),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(o){Promise.reject(o)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((r,n)=>this[n]=r)),this._$Ei=void 0);let o=!1;const i=this._$AL;try{o=this.shouldUpdate(i),o?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach((r=>{var n;return(n=r.hostUpdate)===null||n===void 0?void 0:n.call(r)})),this.update(i)):this._$Ek()}catch(r){throw o=!1,this._$Ek(),r}o&&this._$AE(i)}willUpdate(t){}_$AE(t){var o;(o=this._$ES)===null||o===void 0||o.forEach((i=>{var r;return(r=i.hostUpdated)===null||r===void 0?void 0:r.call(i)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach(((o,i)=>this._$EO(i,this[i],o))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};pt[le]=!0,pt.elementProperties=new Map,pt.elementStyles=[],pt.shadowRootOptions={mode:"open"},Ze?.({ReactiveElement:pt}),((Zt=Rt.reactiveElementVersions)!==null&&Zt!==void 0?Zt:Rt.reactiveElementVersions=[]).push("1.6.3");var Jt;const Lt=window,ut=Lt.trustedTypes,Ye=ut?ut.createPolicy("lit-html",{createHTML:e=>e}):void 0,de="$lit$",W=`lit$${(Math.random()+"").slice(9)}$`,Ao="?"+W,lr=`<${Ao}>`,st=document,Ct=()=>st.createComment(""),Tt=e=>e===null||typeof e!="object"&&typeof e!="function",Oo=Array.isArray,dr=e=>Oo(e)||typeof e?.[Symbol.iterator]=="function",Qt=`[ 	
\f\r]`,$t=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Je=/-->/g,Qe=/>/g,X=RegExp(`>|${Qt}(?:([^\\s"'>=/]+)(${Qt}*=${Qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Xe=/'/g,to=/"/g,Eo=/^(?:script|style|textarea|title)$/i,ko=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),P=ko(1),Po=ko(2),gt=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),eo=new WeakMap,it=st.createTreeWalker(st,129,null,!1);function Io(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ye!==void 0?Ye.createHTML(t):t}const cr=(e,t)=>{const o=e.length-1,i=[];let r,n=t===2?"<svg>":"",s=$t;for(let l=0;l<o;l++){const a=e[l];let c,u,p=-1,g=0;for(;g<a.length&&(s.lastIndex=g,u=s.exec(a),u!==null);)g=s.lastIndex,s===$t?u[1]==="!--"?s=Je:u[1]!==void 0?s=Qe:u[2]!==void 0?(Eo.test(u[2])&&(r=RegExp("</"+u[2],"g")),s=X):u[3]!==void 0&&(s=X):s===X?u[0]===">"?(s=r??$t,p=-1):u[1]===void 0?p=-2:(p=s.lastIndex-u[2].length,c=u[1],s=u[3]===void 0?X:u[3]==='"'?to:Xe):s===to||s===Xe?s=X:s===Je||s===Qe?s=$t:(s=X,r=void 0);const y=s===X&&e[l+1].startsWith("/>")?" ":"";n+=s===$t?a+lr:p>=0?(i.push(c),a.slice(0,p)+de+a.slice(p)+W+y):a+W+(p===-2?(i.push(void 0),l):y)}return[Io(e,n+(e[o]||"<?>")+(t===2?"</svg>":"")),i]};class At{constructor({strings:t,_$litType$:o},i){let r;this.parts=[];let n=0,s=0;const l=t.length-1,a=this.parts,[c,u]=cr(t,o);if(this.el=At.createElement(c,i),it.currentNode=this.el.content,o===2){const p=this.el.content,g=p.firstChild;g.remove(),p.append(...g.childNodes)}for(;(r=it.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes()){const p=[];for(const g of r.getAttributeNames())if(g.endsWith(de)||g.startsWith(W)){const y=u[s++];if(p.push(g),y!==void 0){const R=r.getAttribute(y.toLowerCase()+de).split(W),F=/([.?@])?(.*)/.exec(y);a.push({type:1,index:n,name:F[2],strings:R,ctor:F[1]==="."?hr:F[1]==="?"?gr:F[1]==="@"?fr:qt})}else a.push({type:6,index:n})}for(const g of p)r.removeAttribute(g)}if(Eo.test(r.tagName)){const p=r.textContent.split(W),g=p.length-1;if(g>0){r.textContent=ut?ut.emptyScript:"";for(let y=0;y<g;y++)r.append(p[y],Ct()),it.nextNode(),a.push({type:2,index:++n});r.append(p[g],Ct())}}}else if(r.nodeType===8)if(r.data===Ao)a.push({type:2,index:n});else{let p=-1;for(;(p=r.data.indexOf(W,p+1))!==-1;)a.push({type:7,index:n}),p+=W.length-1}n++}}static createElement(t,o){const i=st.createElement("template");return i.innerHTML=t,i}}function ft(e,t,o=e,i){var r,n,s,l;if(t===gt)return t;let a=i!==void 0?(r=o._$Co)===null||r===void 0?void 0:r[i]:o._$Cl;const c=Tt(t)?void 0:t._$litDirective$;return a?.constructor!==c&&((n=a?._$AO)===null||n===void 0||n.call(a,!1),c===void 0?a=void 0:(a=new c(e),a._$AT(e,o,i)),i!==void 0?((s=(l=o)._$Co)!==null&&s!==void 0?s:l._$Co=[])[i]=a:o._$Cl=a),a!==void 0&&(t=ft(e,a._$AS(e,t.values),a,i)),t}class pr{constructor(t,o){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var o;const{el:{content:i},parts:r}=this._$AD,n=((o=t?.creationScope)!==null&&o!==void 0?o:st).importNode(i,!0);it.currentNode=n;let s=it.nextNode(),l=0,a=0,c=r[0];for(;c!==void 0;){if(l===c.index){let u;c.type===2?u=new Ot(s,s.nextSibling,this,t):c.type===1?u=new c.ctor(s,c.name,c.strings,this,t):c.type===6&&(u=new mr(s,this,t)),this._$AV.push(u),c=r[++a]}l!==c?.index&&(s=it.nextNode(),l++)}return it.currentNode=st,n}v(t){let o=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,o),o+=i.strings.length-2):i._$AI(t[o])),o++}}class Ot{constructor(t,o,i,r){var n;this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=t,this._$AB=o,this._$AM=i,this.options=r,this._$Cp=(n=r?.isConnected)===null||n===void 0||n}get _$AU(){var t,o;return(o=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&o!==void 0?o:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const o=this._$AM;return o!==void 0&&t?.nodeType===11&&(t=o.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,o=this){t=ft(this,t,o),Tt(t)?t===S||t==null||t===""?(this._$AH!==S&&this._$AR(),this._$AH=S):t!==this._$AH&&t!==gt&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):dr(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==S&&Tt(this._$AH)?this._$AA.nextSibling.data=t:this.$(st.createTextNode(t)),this._$AH=t}g(t){var o;const{values:i,_$litType$:r}=t,n=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=At.createElement(Io(r.h,r.h[0]),this.options)),r);if(((o=this._$AH)===null||o===void 0?void 0:o._$AD)===n)this._$AH.v(i);else{const s=new pr(n,this),l=s.u(this.options);s.v(i),this.$(l),this._$AH=s}}_$AC(t){let o=eo.get(t.strings);return o===void 0&&eo.set(t.strings,o=new At(t)),o}T(t){Oo(this._$AH)||(this._$AH=[],this._$AR());const o=this._$AH;let i,r=0;for(const n of t)r===o.length?o.push(i=new Ot(this.k(Ct()),this.k(Ct()),this,this.options)):i=o[r],i._$AI(n),r++;r<o.length&&(this._$AR(i&&i._$AB.nextSibling,r),o.length=r)}_$AR(t=this._$AA.nextSibling,o){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,o);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var o;this._$AM===void 0&&(this._$Cp=t,(o=this._$AP)===null||o===void 0||o.call(this,t))}}class qt{constructor(t,o,i,r,n){this.type=1,this._$AH=S,this._$AN=void 0,this.element=t,this.name=o,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=S}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,o=this,i,r){const n=this.strings;let s=!1;if(n===void 0)t=ft(this,t,o,0),s=!Tt(t)||t!==this._$AH&&t!==gt,s&&(this._$AH=t);else{const l=t;let a,c;for(t=n[0],a=0;a<n.length-1;a++)c=ft(this,l[i+a],o,a),c===gt&&(c=this._$AH[a]),s||(s=!Tt(c)||c!==this._$AH[a]),c===S?t=S:t!==S&&(t+=(c??"")+n[a+1]),this._$AH[a]=c}s&&!r&&this.j(t)}j(t){t===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class hr extends qt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===S?void 0:t}}const ur=ut?ut.emptyScript:"";class gr extends qt{constructor(){super(...arguments),this.type=4}j(t){t&&t!==S?this.element.setAttribute(this.name,ur):this.element.removeAttribute(this.name)}}class fr extends qt{constructor(t,o,i,r,n){super(t,o,i,r,n),this.type=5}_$AI(t,o=this){var i;if((t=(i=ft(this,t,o,0))!==null&&i!==void 0?i:S)===gt)return;const r=this._$AH,n=t===S&&r!==S||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==S&&(r===S||n);n&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var o,i;typeof this._$AH=="function"?this._$AH.call((i=(o=this.options)===null||o===void 0?void 0:o.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class mr{constructor(t,o,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=o,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){ft(this,t)}}const oo=Lt.litHtmlPolyfillSupport;oo?.(At,Ot),((Jt=Lt.litHtmlVersions)!==null&&Jt!==void 0?Jt:Lt.litHtmlVersions=[]).push("2.8.0");const br=(e,t,o)=>{var i,r;const n=(i=o?.renderBefore)!==null&&i!==void 0?i:t;let s=n._$litPart$;if(s===void 0){const l=(r=o?.renderBefore)!==null&&r!==void 0?r:null;n._$litPart$=s=new Ot(t.insertBefore(Ct(),l),l,void 0,o??{})}return s._$AI(e),s};var Xt,te;class G extends pt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,o;const i=super.createRenderRoot();return(t=(o=this.renderOptions).renderBefore)!==null&&t!==void 0||(o.renderBefore=i.firstChild),i}update(t){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=br(o,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return gt}}G.finalized=!0,G._$litElement$=!0,(Xt=globalThis.litElementHydrateSupport)===null||Xt===void 0||Xt.call(globalThis,{LitElement:G});const io=globalThis.litElementPolyfillSupport;io?.({LitElement:G});((te=globalThis.litElementVersions)!==null&&te!==void 0?te:globalThis.litElementVersions=[]).push("3.3.3");const Oe=e=>t=>typeof t=="function"?((o,i)=>(customElements.define(o,i),i))(e,t):((o,i)=>{const{kind:r,elements:n}=i;return{kind:r,elements:n,finisher(s){customElements.define(o,s)}}})(e,t);const yr=(e,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(o){o.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(o){o.createProperty(t.key,e)}},vr=(e,t,o)=>{t.constructor.createProperty(o,e)};function T(e){return(t,o)=>o!==void 0?vr(e,t,o):yr(e,t)}const Bo=({finisher:e,descriptor:t})=>(o,i)=>{var r;if(i===void 0){const n=(r=o.originalKey)!==null&&r!==void 0?r:o.key,s=t!=null?{kind:"method",placement:"prototype",key:n,descriptor:t(o.key)}:{...o,key:n};return e!=null&&(s.finisher=function(l){e(l,n)}),s}{const n=o.constructor;t!==void 0&&Object.defineProperty(o,i,t(i)),e?.(n,i)}};function Kt(e,t){return Bo({descriptor:o=>({get(){var r,n;return(n=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(e))!==null&&n!==void 0?n:null},enumerable:!0,configurable:!0})})}var ee;const $r=((ee=window.HTMLSlotElement)===null||ee===void 0?void 0:ee.prototype.assignedElements)!=null?(e,t)=>e.assignedElements(t):(e,t)=>e.assignedNodes(t).filter((o=>o.nodeType===Node.ELEMENT_NODE));function wr(e){const{slot:t,selector:o}=e??{};return Bo({descriptor:i=>({get(){var r;const n="slot"+(t?`[name=${t}]`:":not([name])"),s=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(n),l=s!=null?$r(s,e):[];return o?l.filter((a=>a.matches(o))):l},enumerable:!0,configurable:!0})})}const xr=d`
<svg
  viewBox="0 0 40 40"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z" class="fill-color" fill-rule="evenodd"/>
</svg>
`;class _r extends v{static get styles(){return k`
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
    `}render(){return xr}}customElements.define("ia-icon-close",_r);let N=class extends G{constructor(){super(...arguments),this.value="",this.clearButtonScreenReaderLabel="Clear",this.focusOnClear=!0,this.forceClearButton=!1}render(){var t,o,i,r;const n=!this.value&&!this.forceClearButton;return P`
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
          placeholder=${(o=this.placeholder)!==null&&o!==void 0?o:S}
          .value=${(i=this.value)!==null&&i!==void 0?i:S}
          aria-controls=${(r=this.ariaControls)!==null&&r!==void 0?r:S}
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
    `}onTextInput(){this.value=this.textInput.value}onKeyPress(t){if(t.key==="Enter"){this.textInput.blur();const o=new CustomEvent("submit",{detail:this.value});this.dispatchEvent(o)}}clearButtonClicked(){const t=this.textInput.value;this.value="",this.focusOnClear&&this.textInput.focus();const o=new CustomEvent("clear",{detail:t});this.dispatchEvent(o);const i=new InputEvent("input",{inputType:"deleteContentBackward"});this.dispatchEvent(i)}};N.shadowRootOptions={...G.shadowRootOptions,delegatesFocus:!0};N.styles=V`
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
  `;b([T({type:String})],N.prototype,"value",void 0);b([T({type:String})],N.prototype,"placeholder",void 0);b([T({type:String})],N.prototype,"screenReaderLabel",void 0);b([T({type:String})],N.prototype,"clearButtonScreenReaderLabel",void 0);b([T({type:String})],N.prototype,"ariaControls",void 0);b([T({type:Boolean})],N.prototype,"focusOnClear",void 0);b([T({type:Boolean,reflect:!0})],N.prototype,"forceClearButton",void 0);b([Kt("#text-input")],N.prototype,"textInput",void 0);N=b([Oe("ia-clearable-text-input")],N);function dt(e,t,o){return e?t():o?.()}const Sr=Po`<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>`,Cr=Po`<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>`;let A=class extends G{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionGroup="options",this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=t=>{switch(t.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=t=>{t&&t.type==="click"&&t.stopPropagation(),this.open=!1,this.updatePopoverState()}}async firstUpdated(){await new Promise(t=>{setTimeout(t,0)}),this.addEventListener("closeDropdown",this.closeOptions)}willUpdate(t){t.has("open")&&this.updatePopoverState()}disconnectedCallback(){var t;(t=super.disconnectedCallback)===null||t===void 0||t.call(this),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){var t,o;this.usePopover&&((o=(t=this.dropdownMenu)===null||t===void 0?void 0:t.togglePopover)===null||o===void 0||o.call(t,this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;const t=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${t.left}px`,this.dropdownMenu.style.top=`${t.bottom}px`,this.dropdownMenu.style.minWidth=`${t.width}px`}mainButtonClicked(){var t;this.openViaButton?this.toggleOptions():(t=this.mainButtonLabelSlotted[0])===null||t===void 0||t.click()}mainButtonKeyDown(t){(t.key==="Enter"||t.key===" ")&&(this.mainButtonClicked(),t.preventDefault())}caretKeyDown(t){(t.key==="Enter"||t.key===" ")&&(this.toggleOptions(),t.preventDefault())}renderOption(t){const{label:o,url:i=void 0,id:r}=t;let n;const s=this.selectedOption===r?"selected":"";return i?n=P`<a
        href=${i}
        @click=${l=>this.optionClicked(l,t)}
        >${o}</a
      >`:n=P`<button
        @click=${l=>this.optionClicked(l,t)}
      >
        ${o}
      </button>`,P`<li role="menuitem" class=${s}>${n}</li>`}optionClicked(t,o){var i;t.stopPropagation(),this.selectedOption!==o.id&&(this.selectedOption=o.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:o}})),(i=o.selectedHandler)===null||i===void 0||i.call(o,o)),this.closeOnSelect&&(this.closeOptions(),this.mainButton.focus())}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(t=>this.selectedOption!==t.id)}get caretUpTemplate(){return P`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${Sr}</slot>
      </span>
    `}get caretDownTemplate(){return P`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${Cr}</slot>
      </span>
    `}get caretTemplate(){return this.displayCaret?this.openViaButton?P`
        <span class="caret" aria-hidden="true">
          ${this.caretUpTemplate} ${this.caretDownTemplate}
        </span>
      `:P`
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
    `:P``}get dropdownTemplate(){return this.isCustomList?P`<slot name="list"></slot>`:P`${this.availableOptions.map(t=>this.renderOption(t))}`}get backdropTemplate(){return this.closeOnBackdropClick?this.open?P`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `:P``:P``}get shouldNestCaretInButton(){return this.openViaButton}get shouldAttachEventHandlers(){return!this.isDisabled&&!this.hasCustomClickHandler}render(){return P`
      <div class="ia-dropdown-group ${this.open?"open":""}">
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
    `}static get styles(){const t=V`var(--dropdownBorderWidth, 1px)`,o=V`var(--dropdownBorderRadius, 4px)`,i=V`var(--dropdownBorderColor, #fff)`,r=V`var(--dropdownBgColor, #333)`,n=V`var(--dropdownTextColor, #fff)`,s=V`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,l=V`var(--dropdownSelectedBgColor, #fff)`,a=V`var(--dropdownMainButtonBgColor, transparent)`,c=V`var(--dropdownTextAlign, inherit)`,u=V`var(--dropdownBackdropZIndex, 1)`,p=V`var(--dropdownListZIndex, 2)`;return V`
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
        z-index: ${u};
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

        border-top: var(--dropdownBorderTopWidth, ${t});
        border-right: var(--dropdownBorderRightWidth, ${t});
        border-bottom: var(--dropdownBorderBottomWidth, ${t});
        border-left: var(--dropdownBorderLeftWidth, ${t});
        /* Must be after border-width settings for specificity */
        border-style: solid;
        border-color: ${i};

        border-radius: var(
            --dropdownBorderTopLeftRadius,
            ${o}
          )
          var(--dropdownBorderTopRightRadius, ${o})
          var(--dropdownBorderBottomRightRadius, ${o})
          var(--dropdownBorderBottomLeftRadius, ${o});

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
        text-align: ${c};
      }
    `}};b([T({type:Boolean,reflect:!0})],A.prototype,"open",void 0);b([T({type:Boolean,reflect:!0})],A.prototype,"isDisabled",void 0);b([T({type:Boolean})],A.prototype,"displayCaret",void 0);b([T({type:Boolean})],A.prototype,"closeOnSelect",void 0);b([T({type:Boolean})],A.prototype,"openViaButton",void 0);b([T({type:Boolean})],A.prototype,"usePopover",void 0);b([T({type:Boolean})],A.prototype,"includeSelectedOption",void 0);b([T({type:String})],A.prototype,"selectedOption",void 0);b([T({attribute:!1})],A.prototype,"options",void 0);b([T({type:String})],A.prototype,"optionGroup",void 0);b([T({attribute:!1})],A.prototype,"optionSelected",void 0);b([T({type:Boolean,reflect:!0})],A.prototype,"isCustomList",void 0);b([T({type:Boolean,reflect:!0})],A.prototype,"hasCustomClickHandler",void 0);b([T({type:Boolean,reflect:!0})],A.prototype,"closeOnEscape",void 0);b([T({type:Boolean,reflect:!0})],A.prototype,"closeOnBackdropClick",void 0);b([Kt(".ia-dropdown-group")],A.prototype,"container",void 0);b([Kt("#dropdown-main")],A.prototype,"dropdownMenu",void 0);b([Kt(".click-main")],A.prototype,"mainButton",void 0);b([wr({slot:"dropdown-label"})],A.prototype,"mainButtonLabelSlotted",void 0);A=b([Oe("ia-dropdown")],A);let ce=class extends G{render(){return P`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `}};ce.styles=V`
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
  `;ce=b([Oe("ia-icon-label")],ce);var Tr=Object.defineProperty,Ar=Object.getOwnPropertyDescriptor,H=(e,t,o,i)=>{for(var r=i>1?void 0:i?Ar(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=(i?s(t,o,r):s(r))||r);return i&&r&&Tr(t,o,r),r};const ro={CategoryChanged:"categoryChanged",SearchRequested:"searchRequested"};let M=class extends v{constructor(){super(...arguments),this.categories=[],this.placeholder=B("Search"),this.useMobileView=!1,this.hideDropdown=!1,this.loading=!1}get resolvedCategory(){return this.selectedCategory??this.categories?.[0]?.id??""}render(){return d`
      <div id="container" part="container" role="search">
        <div
          id="main-bar"
          part="main-bar"
          class=${this.hideDropdown?"no-dropdown":m}
        >
          ${this.hideDropdown?m:this.dropdownTemplate}
          ${this.textBoxTemplate} ${this.searchButtonTemplate}
        </div>
      </div>
    `}willUpdate(e){if(e.has("selectedCategory")||e.has("categories")){const t=this.resolvedCategory;this.categoryDropdown&&this.categoryDropdown.selectedOption!==t&&(this.categoryDropdown.selectedOption=t)}}get dropdownTemplate(){return d`
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
        clearButtonScreenReaderLabel=${B("Clear search query")}
        screenReaderLabel=${B("Search the Archive. Filters and Advanced Search available below.")}
        @clear=${this.searchFieldCleared}
        @submit=${this.handleSubmit}
      ></ia-clearable-text-input>
    `}get searchButtonTemplate(){return d`
      <button
        id="search-button"
        part="search-button"
        class=${this.loading?"loading":m}
        type="button"
        aria-label=${B("Search")}
        @click=${this.handleSubmit}
      >
        ${this.loading?d`<ia-status-indicator
              mode="loading"
              class="search-button-loading-icon"
            ></ia-status-indicator>`:d`<img src=${rr} alt="" />`}
      </button>
    `}get selectedCategoryLabel(){return this.categories.find(t=>t.id===this.resolvedCategory)?.label??this.resolvedCategory}get spacedQuery(){return this.query?.replace(/\+/g," ")??""}searchFieldCleared(){this.query&&this.emitSearchRequested()}handleSubmit(){this.emitSearchRequested()}handleCategorySelected(e){const t=e.detail.option.id;t!==this.resolvedCategory&&(this.selectedCategory=t,setTimeout(()=>this.searchInput.focus()),this.dispatchEvent(new CustomEvent(ro.CategoryChanged,{detail:t})))}emitSearchRequested(){this.dispatchEvent(new CustomEvent(ro.SearchRequested,{detail:{query:this.searchInput.value,category:this.resolvedCategory}}))}static get styles(){const e=k`
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
    `;return[z,e]}};H([h({type:String})],M.prototype,"query",2);H([h({type:Array})],M.prototype,"categories",2);H([h({type:String})],M.prototype,"selectedCategory",2);H([h({type:String})],M.prototype,"placeholder",2);H([h({type:Boolean})],M.prototype,"useMobileView",2);H([h({type:Boolean})],M.prototype,"hideDropdown",2);H([h({type:Boolean})],M.prototype,"loading",2);H([w("#search-input")],M.prototype,"searchInput",2);H([w("#category-dropdown")],M.prototype,"categoryDropdown",2);M=H([O("ia-dropdown-search-bar")],M);var Or=Object.defineProperty,Er=Object.getOwnPropertyDescriptor,j=(e,t,o,i)=>{for(var r=i>1?void 0:i?Er(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=(i?s(t,o,r):s(r))||r);return i&&r&&Or(t,o,r),r};const kr=[{label:"Bar height",cssVariable:"--ia-theme-search-bar-height",defaultValue:"30px",inputType:"text"},{label:"Bar width",cssVariable:"--ia-theme-search-bar-width",defaultValue:"300px",inputType:"text"},{label:"Internal padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown z-index",cssVariable:"--dropdown-z-index",defaultValue:2,inputType:"number",min:0,step:1}],no=[{id:"all",label:"All"},{id:"texts",label:"Books/Documents"},{id:"fulltext",label:"Text Contents"},{id:"radio",label:"Radio"},{id:"tv",label:"TV"},{id:"movies",label:"Video"},{id:"audio",label:"Audio"},{id:"software",label:"Software"},{id:"image",label:"Images"},{id:"etree",label:"Live Music"},{id:"collection",label:"Collections"},{id:"data",label:"Data"},{id:"web",label:"Web Sites"}],Pr="all",so="Search";let D=class extends v{constructor(){super(...arguments),this.query="",this.selectedCategory=Pr,this.placeholder=so,this.hideDropdown=!1,this.loading=!1,this.announcerText=""}render(){return d`
      <story-template
        elementTag="ia-dropdown-search-bar"
        elementClassName="IADropdownSearchBar"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:kr}}
      >
        <div slot="demo">
          <ia-dropdown-search-bar
            .query=${this.query}
            .categories=${no}
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
                  ${ir(no,e=>d`<option value=${e.id}>
                        ${e.label}
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
                  value=${so}
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
    `}get exampleUsage(){const{query:e,selectedCategory:t,placeholder:o,hideDropdown:i,loading:r}=this,n=a=>a?`"${a}"`:"",s={query:n(e),selectedCategory:n(t),placeholder:n(o),hideDropdown:i,loading:r};return`
      <ia-dropdown-search-bar
        .categories=\${[
          { id: 'foo', label: 'Foo Option' },
          { id: 'bar', label: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(s).map(([a,c])=>c?c===!0?a:`${a}=${c}`:"").join(`
  `)}
      >
      </ia-dropdown-search-bar>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(e){e.preventDefault(),this.query=this.queryInput.value,this.selectedCategory=this.selectedCategorySelect.value,this.placeholder=this.placeholderInput.value,this.hideDropdown=this.hideDropdownCheck.checked,this.loading=this.loadingCheck.checked}handleSearchRequested(e){this.announcerText=`Category ID "${e.detail.category}" / Query "${e.detail.query}"`}static get styles(){return k`
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
    `}};j([f()],D.prototype,"query",2);j([f()],D.prototype,"selectedCategory",2);j([f()],D.prototype,"placeholder",2);j([f()],D.prototype,"hideDropdown",2);j([f()],D.prototype,"loading",2);j([f()],D.prototype,"announcerText",2);j([w("#settings__query")],D.prototype,"queryInput",2);j([w("#settings__selected-category")],D.prototype,"selectedCategorySelect",2);j([w("#settings__placeholder")],D.prototype,"placeholderInput",2);j([w("#settings__hide-dropdown")],D.prototype,"hideDropdownCheck",2);j([w("#settings__loading")],D.prototype,"loadingCheck",2);D=j([O("ia-dropdown-search-bar-story")],D);const Ir=Object.freeze(Object.defineProperty({__proto__:null,get IADropdownSearchBarStory(){return D}},Symbol.toStringTag,{value:"Module"}));var Br=Object.defineProperty,Vr=Object.getOwnPropertyDescriptor,lt=(e,t,o,i)=>{for(var r=i>1?void 0:i?Vr(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=(i?s(t,o,r):s(r))||r);return i&&r&&Br(t,o,r),r};const Dr={CodeSubmitted:"codeSubmitted"},ao=/^[0-9]+$/,Rr=/^[a-zA-Z0-9]+$/;let Z=class extends v{constructor(){super(...arguments),this.disabled=!1,this.numChars=6,this.numericOnly=!0,this.allowedChars=ao}render(){return d`
      ${[...Array(this.numChars).keys()].map(e=>d`<input
            id="OTP-input-${e}"
            part="input"
            type="text"
            autocomplete=${e===0?"one-time-code":"off"}
            inputmode=${this.numericOnly?"numeric":"text"}
            ?disabled=${this.disabled}
            @beforeinput=${this.handleInput}
            @paste=${this.handlePaste}
            @keydown=${this.handleKeydown}
          />`)}
    `}firstUpdated(){this.inputs[0].focus()}willUpdate(e){e.has("numericOnly")&&(this.allowedChars=this.numericOnly?ao:Rr),e.has("prefillValue")&&this.prefillValue!==void 0&&(this.fillInputs(this.prefillValue),this.prefillValue=void 0)}handleInput(e){e.preventDefault();const t=e.target,o=e.data;if(!o)return;if(o.length>1){this.fillInputs(o);return}if(!this.allowedChars.test(o))return;t.value=o;const i=t.nextElementSibling;i&&i.focus(),this.submitIfInputsFilled()}handleKeydown(e){const t=e.target,o=e.key,i=t.previousElementSibling,r=t.nextElementSibling;switch(o){case"Backspace":case"Delete":if(e.preventDefault(),i&&i.focus(),t.value===""){i.value="";break}t.value="";break;case"Tab":t.select();break;case"ArrowRight":case"Right":e.preventDefault(),r&&r.focus();break;case"ArrowLeft":case"Left":e.preventDefault(),i&&i.focus();break}}handlePaste(e){e.preventDefault();const t=e.clipboardData?.getData("text");t&&this.fillInputs(t)}fillInputs(e){e===""&&this.clearInputs();const t=e.split("").filter(i=>this.allowedChars.test(i)).slice(0,this.numChars);if(!t||t.length===0)return;if(t.forEach((i,r)=>this.inputs[r].value=i),t.length===this.numChars){this.triggerSubmit(t.join("")),this.inputs[this.numChars-1].focus();return}this.inputs[t.length].focus()}clearInputs(){this.inputs.forEach(e=>e.value=""),this.inputs[0].focus()}submitIfInputsFilled(){const e=[];this.inputs.forEach(t=>{t.value&&e.push(t.value)}),e.length===this.numChars&&this.triggerSubmit(e.join(""))}triggerSubmit(e){this.dispatchEvent(new CustomEvent(Dr.CodeSubmitted,{detail:this.numericOnly?e:e.toUpperCase(),bubbles:!0,composed:!0}))}static get styles(){return[z,k`
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
      `]}};lt([h({type:String})],Z.prototype,"prefillValue",2);lt([h({type:Boolean})],Z.prototype,"disabled",2);lt([h({type:Number})],Z.prototype,"numChars",2);lt([h({type:Boolean})],Z.prototype,"numericOnly",2);lt([h({type:Object})],Z.prototype,"allowedChars",2);lt([_e("input")],Z.prototype,"inputs",2);Z=lt([O("ia-otp-input")],Z);var Lr=Object.defineProperty,Nr=Object.getOwnPropertyDescriptor,bt=(e,t,o,i)=>{for(var r=i>1?void 0:i?Nr(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=(i?s(t,o,r):s(r))||r);return i&&r&&Lr(t,o,r),r};const jr={NewCodeRequested:"newCodeRequested"};let at=class extends v{constructor(){super(...arguments),this.validationStatus="ready",this.newCodeSending=!1,this.numPasscodeChars=6,this.numericOnly=!0}render(){return d`
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
            ${B("The code entered is invalid or expired")}
          </p>`:m}
      ${this.resendCodeButtonTemplate}
    `}willUpdate(e){e.has("validationStatus")&&this.OTPInput&&this.validationStatus==="error"&&(this.OTPInput.prefillValue=""),e.has("newCodeSending")&&this.newCodeSending&&this.OTPInput&&(this.OTPInput.prefillValue="")}get resendCodeButtonTemplate(){return this.newCodeSending?d`<span part="new-code-message" class="new-code-msg"
          >${B("Emailing...")}</span
        >`:d`
          <ia-button
            mode="link"
            class="new-code-btn"
            part="new-code-button"
            .disabled=${this.validationStatus==="loading"||this.validationStatus==="success"}
            @click=${this.handleNewCodeRequested}
          >
            ${B("Email me another code")}
          </ia-button>
        `}async handleNewCodeRequested(){this.dispatchEvent(new CustomEvent(jr.NewCodeRequested,{bubbles:!0,composed:!0})),this.OTPInput.prefillValue=""}static get styles(){return[z,k`
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
      `]}};bt([h({type:String})],at.prototype,"validationStatus",2);bt([h({type:Boolean})],at.prototype,"newCodeSending",2);bt([h({type:Number})],at.prototype,"numPasscodeChars",2);bt([h({type:Boolean})],at.prototype,"numericOnly",2);bt([w("ia-otp-input")],at.prototype,"OTPInput",2);at=bt([O("ia-otp-form")],at);var Mr=Object.getOwnPropertyDescriptor,Ur=(e,t,o,i)=>{for(var r=i>1?void 0:i?Mr(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=s(r)||r);return r};const zr=[{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Input font size",cssVariable:"--ia-theme-font-size-lg",defaultValue:"2.25rem",inputType:"text"},{label:"Link and error font size",cssVariable:"--ia-theme-font-size-standard",defaultValue:"0.875rem",inputType:"text"},{label:"Link font color",cssVariable:"--ia-theme-link-color",defaultValue:"#4b64ff",inputType:"color"},{label:"Error message/indicator color",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"},{label:"Success indicator color",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"}],Hr=[{label:"Validation Status",propertyName:"validationStatus",defaultValue:"ready",inputType:"radio",radioOptions:["ready","loading","success","error"]},{label:"New code sending in progress",propertyName:"newCodeSending",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Numeric only",propertyName:"numericOnly",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Number of passcode characters",propertyName:"numPasscodeChars",defaultValue:6,inputType:"number"}];let pe=class extends v{render(){return d`
      <story-template
        elementTag="ia-otp-form"
        elementClassName="IAOTPForm"
        .defaultUsageProps=${"@codeSubmitted=${(e: CustomEvent) => {setTimeout(() => alert('Code submitted: ' + e.detail), 250);}} \n  @newCodeRequested=${() => alert('New code requested')}"}
        .styleInputData=${{settings:zr}}
        .propInputData=${{settings:Hr}}
      >
        <ia-otp-form
          slot="demo"
          @codeSubmitted=${e=>{setTimeout(()=>alert("Code submitted: "+e.detail),250)}}
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
    `}};pe=Ur([O("ia-otp-form-story")],pe);const Fr=Object.freeze(Object.defineProperty({__proto__:null,get IAOTPFormStory(){return pe}},Symbol.toStringTag,{value:"Module"}));var qr=Object.getOwnPropertyDescriptor,Kr=(e,t,o,i)=>{for(var r=i>1?void 0:i?qr(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=s(r)||r);return r};const Wr=[{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Font size",cssVariable:"--ia-theme-font-size-lg",defaultValue:"2.25rem",inputType:"text"}],Gr=[{label:"Number of characters",propertyName:"numChars",defaultValue:6,inputType:"number"},{label:"Numeric only",propertyName:"numericOnly",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Prefill value",propertyName:"prefillValue",defaultValue:""},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let he=class extends v{render(){return d`
      <story-template
        elementTag="ia-otp-input"
        elementClassName="IAOTPInput"
        .defaultUsageProps=${"@codeSubmitted=${(e: CustomEvent) => {setTimeout(() => alert('Code submitted: ' + e.detail), 250);}}"}
        .styleInputData=${{settings:Wr}}
        .propInputData=${{settings:Gr}}
      >
        <ia-otp-input
          @codeSubmitted=${e=>{setTimeout(()=>alert("Code submitted: "+e.detail),250)}}
          slot="demo"
        ></ia-otp-input>
      </story-template>
    `}};he=Kr([O("ia-otp-input-story")],he);const Zr=Object.freeze(Object.defineProperty({__proto__:null,get IAOTPInputStory(){return he}},Symbol.toStringTag,{value:"Module"}));var Yr=Object.getOwnPropertyDescriptor,Jr=(e,t,o,i)=>{for(var r=i>1?void 0:i?Yr(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=s(r)||r);return r};let lo=class extends v{render(){return d`
      <span class="sr-only">
        <slot></slot>
      </span>
    `}static get styles(){return[z,k`
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
      `]}};lo=Jr([O("ia-sr-only-text")],lo);var Qr=Object.defineProperty,Xr=Object.getOwnPropertyDescriptor,Vo=(e,t,o,i)=>{for(var r=i>1?void 0:i?Xr(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=(i?s(t,o,r):s(r))||r);return i&&r&&Qr(t,o,r),r};let Nt=class extends v{constructor(){super(...arguments),this.textVisible=!1}render(){return d`
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
    `}};Vo([f()],Nt.prototype,"textVisible",2);Nt=Vo([O("ia-sr-only-text-story")],Nt);const tn=Object.freeze(Object.defineProperty({__proto__:null,get IAStatusIndicatorStory(){return Nt}},Symbol.toStringTag,{value:"Module"}));var en=Object.getOwnPropertyDescriptor,on=(e,t,o,i)=>{for(var r=i>1?void 0:i?en(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=s(r)||r);return r};const rn=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"1.25rem"},{label:"Color - loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Color - success",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"},{label:"Color - error",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}],nn=[{label:"Mode",propertyName:"mode",defaultValue:"loading",inputType:"radio",radioOptions:["ready","loading","success","error"]},{label:"Accessible title - loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{label:"Loading style",propertyName:"loadingStyle",defaultValue:"ring-dots",inputType:"radio",radioOptions:["ring-dots","ring"]},{label:"Accessible title - success",propertyName:"successTitle",defaultValue:"Success"},{label:"Accessible title - error",propertyName:"errorTitle",defaultValue:"Error"}];let ue=class extends v{render(){return d`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .styleInputData=${{settings:rn}}
        .propInputData=${{settings:nn}}
      >
        <ia-status-indicator slot="demo"></ia-status-indicator>
      </story-template>
    `}};ue=on([O("ia-status-indicator-story")],ue);const sn=Object.freeze(Object.defineProperty({__proto__:null,get IAStatusIndicatorStory(){return ue}},Symbol.toStringTag,{value:"Module"})),an="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='36.283'%20height='36.283'%3e%3cpath%20d='M35.531%2017.391h-3.09l.845-1.464a.748.748%200%201%200-1.297-.75l-1.276%202.214H28.61l2.515-4.354a.751.751%200%200%200-.272-1.024.75.75%200%200%200-1.024.274l-2.948%205.104h-2.023a6.751%206.751%200%200%200-2.713-4.684l1.019-1.76%205.896-.002a.75.75%200%200%200%200-1.5l-5.029.002%201.051-1.82%202.557.002a.75.75%200%200%200%200-1.5l-1.689-.002%201.545-2.676a.75.75%200%201%200-1.302-.75l-1.547%202.676-.844-1.463a.749.749%200%201%200-1.297.75l1.278%202.213-1.051%201.818-2.514-4.354a.75.75%200%200%200-1.298.75l2.946%205.104-1.016%201.758a6.692%206.692%200%200%200-2.706-.57%206.74%206.74%200%200%200-2.707.568l-1.013-1.754%202.946-5.105a.75.75%200%200%200-1.298-.75L13.56%208.697l-1.05-1.818%201.278-2.217a.749.749%200%200%200-1.298-.75l-.845%201.465-1.551-2.678a.75.75%200%200%200-1.024-.273.748.748%200%200%200-.274%201.023l1.545%202.678H8.652a.75.75%200%200%200%200%201.5h2.556l1.05%201.818H7.231a.75.75%200%200%200%200%201.5h5.894l1.017%201.762a6.755%206.755%200%200%200-2.712%204.684H9.406l-2.95-5.104a.75.75%200%201%200-1.299.75l2.516%204.354H5.569l-1.277-2.213a.75.75%200%200%200-1.298.75l.845%201.463H.75a.75.75%200%200%200%200%201.5h3.09l-.845%201.465a.747.747%200%200%200%20.275%201.022.75.75%200%200%200%20.374.103.75.75%200%200%200%20.65-.375l1.277-2.215h2.103l-2.516%204.354a.75.75%200%200%200%201.299.75l2.949-5.104h2.024a6.761%206.761%200%200%200%202.712%204.685l-1.017%201.762H7.232a.75.75%200%200%200%200%201.5h5.026l-1.05%201.818H8.651a.75.75%200%200%200%200%201.5h1.69l-1.545%202.676a.75.75%200%200%200%201.299.75l1.546-2.676.846%201.465a.755.755%200%200%200%20.65.375.737.737%200%200%200%20.375-.103.747.747%200%200%200%20.274-1.022l-1.279-2.215%201.05-1.82%202.515%204.354a.75.75%200%200%200%201.299-.75l-2.947-5.104%201.013-1.756a6.72%206.72%200%200%200%205.415%200l1.014%201.756-2.947%205.104a.75.75%200%200%200%201.298.75l2.515-4.354%201.053%201.82-1.277%202.213a.75.75%200%200%200%201.298.75l.844-1.463%201.545%202.678c.141.24.393.375.65.375a.75.75%200%200%200%20.649-1.125l-1.548-2.678h1.689a.75.75%200%200%200%200-1.5h-2.557l-1.051-1.82%205.029.002a.75.75%200%200%200%200-1.5l-5.896-.002-1.019-1.76a6.75%206.75%200%200%200%202.711-4.685h2.023l2.947%205.104a.753.753%200%200%200%201.025.273.749.749%200%200%200%20.272-1.023l-2.515-4.354h2.104l1.279%202.215a.75.75%200%200%200%20.649.375c.127%200%20.256-.03.375-.103a.748.748%200%200%200%20.273-1.022l-.848-1.465h3.092a.75.75%200%200%200%20.003-1.5zm-12.136.75c0%20.257-.041.502-.076.75a5.223%205.223%200%200%201-1.943%203.358%205.242%205.242%200%200%201-1.291.766%205.224%205.224%200%200%201-1.949.384%205.157%205.157%200%200%201-3.239-1.15%205.22%205.22%200%200%201-1.943-3.358c-.036-.247-.076-.493-.076-.75s.04-.503.076-.75a5.22%205.22%200%200%201%201.944-3.359c.393-.312.82-.576%201.291-.765a5.219%205.219%200%200%201%201.948-.384c.69%200%201.344.142%201.948.384.471.188.898.454%201.291.765a5.222%205.222%200%200%201%201.943%203.359c.035.247.076.493.076.75z'%20fill=':color:'/%3e%3c/svg%3e",co=new WeakSet;class ln extends Ht{constructor(t){super(t)}update(t,[o,i]){return co.has(t)||(o(),co.add(t)),this.render(o,i)}render(t,o){return o()}}const po=zt(ln);var dn=Object.defineProperty,cn=Object.getOwnPropertyDescriptor,Ee=(e,t,o,i)=>{for(var r=i>1?void 0:i?cn(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=(i?s(t,o,r):s(r))||r);return i&&r&&dn(t,o,r),r};let jt=class extends v{constructor(){super(...arguments),this.snowing=!1}render(){return d`
      ${this.startButtonTemplate} ${this.clearButtonTemplate}
      <img src=${an} alt="Snowflakes icon" />
    `}willUpdate(e){e.has("snowConfig")&&(this.snowflakes?.destroy(),this.snowflakes=void 0,this.startSnowing())}get startButtonTemplate(){return po(async()=>{await kt(()=>Promise.resolve().then(()=>ze),void 0,import.meta.url)},()=>d`
        <ia-button
          @click=${()=>{this.snowing?this.stopSnowing():this.startSnowing()}}
        >
          ${this.snowing?"Stop Snowflakes":"Start Snowflakes"}
        </ia-button>
      `)}get clearButtonTemplate(){return po(async()=>{await kt(()=>Promise.resolve().then(()=>ze),void 0,import.meta.url)},()=>d`
        <ia-button
          @click=${()=>{this.snowflakes?.destroy()}}
        >
          Clear Snowflakes
        </ia-button>
      `)}async startSnowing(){if(!this.snowflakes){const t=(await kt(()=>import("./snowflakes.esm-Dz_MTlsm.js"),[],import.meta.url)).default;this.snowflakes=new t(this.snowConfig)}this.snowflakes?.start(),this.snowing=!0}stopSnowing(){this.snowflakes?.stop(),this.snowing=!1}static get styles(){return k`
      img {
        width: 16px;
        filter: invert(1);
        vertical-align: middle;
      }
    `}};Ee([h({type:Object})],jt.prototype,"snowConfig",2);Ee([f()],jt.prototype,"snowing",2);jt=Ee([O("ia-snow")],jt);var pn=Object.defineProperty,hn=Object.getOwnPropertyDescriptor,yt=(e,t,o,i)=>{for(var r=i>1?void 0:i?hn(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=(i?s(t,o,r):s(r))||r);return i&&r&&pn(t,o,r),r};let Y=class extends v{render(){return d`
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
    `:"<ia-snow></ia-snow>"}get configString(){return JSON.stringify(this.config,null,2)}get snowflakeConfig(){return{color:this.colorInput.value,count:Number(this.countInput.value),wind:this.windInput.checked,rotation:this.rotationInput.checked}}setupSnowflakes(){this.config=this.snowflakeConfig}static get styles(){return k`
      fieldset {
        margin-top: 16px;
      }
    `}};yt([f()],Y.prototype,"config",2);yt([w("#count")],Y.prototype,"countInput",2);yt([w("#wind")],Y.prototype,"windInput",2);yt([w("#rotation")],Y.prototype,"rotationInput",2);yt([w("#color")],Y.prototype,"colorInput",2);Y=yt([O("ia-snow-story")],Y);const un=Object.freeze(Object.defineProperty({__proto__:null,get IASnowStory(){return Y}},Symbol.toStringTag,{value:"Module"}));var gn=Object.getOwnPropertyDescriptor,fn=(e,t,o,i)=>{for(var r=i>1?void 0:i?gn(t,o):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=s(r)||r);return r};const mn=Object.assign({"../src/elements/ia-button/ia-button-story.ts":Pi,"../src/elements/ia-combo-box/ia-combo-box-story.ts":or,"../src/elements/ia-dropdown-search-bar/ia-dropdown-search-bar-story.ts":Ir,"../src/elements/ia-otp-form/ia-otp-form-story.ts":Fr,"../src/elements/ia-otp-input/ia-otp-input-story.ts":Zr,"../src/elements/ia-sr-only-text/ia-sr-only-text-story.ts":tn,"../src/elements/ia-status-indicator/ia-status-indicator-story.ts":sn,"../src/labs/ia-snow/ia-snow-story.ts":un}),Do=Object.keys(mn).map(e=>{const t=e.includes("/src/labs/"),o=e.split("/"),r=o[o.length-1].replace(/-story\.ts$/,"");return{tag:r,storyTag:`${r}-story`,id:`elem-${r}`,labs:t}}).sort((e,t)=>e.tag.localeCompare(t.tag)),ge=Do.filter(e=>!e.labs),fe=Do.filter(e=>e.labs),bn=[...ge,...fe];let ho=class extends v{constructor(){super(...arguments),this._abortController=new AbortController}createRenderRoot(){return this}render(){return d`
      <nav id="ia-sidebar">
        <h2>Production-Ready</h2>
        ${ge.map(e=>d`<a href="#${e.id}">&lt;${e.tag}&gt;</a>`)}
        <h2>Labs 🧪</h2>
        ${fe.map(e=>d`<a href="#${e.id}">&lt;${e.tag}&gt;</a>`)}
      </nav>
      <div id="ia-content">
        <h1>Internet Archive Elements</h1>
        <h2>Production-Ready Elements</h2>
        ${ge.map(e=>d`
          <div id="${e.id}" class="ia-anchor">
            ${re(`<${e.storyTag}></${e.storyTag}>`)}
          </div>
        `)}
        <h2>Labs Elements</h2>
        ${fe.map(e=>d`
          <div id="${e.id}" class="ia-anchor">
            ${re(`<${e.storyTag}></${e.storyTag}>`)}
          </div>
        `)}
      </div>
    `}firstUpdated(){const e=bn.map(i=>i.id),t=Object.fromEntries(e.map(i=>[i,this.querySelector(`#ia-sidebar a[href="#${i}"]`)])),o=new Set;this._observer=new IntersectionObserver(i=>{for(const n of i)n.isIntersecting?o.add(n.target.id):o.delete(n.target.id);const r=e.find(n=>o.has(n))??e[0];e.forEach(n=>t[n]?.classList.toggle("active",n===r))},{rootMargin:"0px 0px -70% 0px"}),e.forEach(i=>{const r=document.getElementById(i);r&&this._observer.observe(r)}),e.forEach(i=>{t[i]?.addEventListener("click",r=>{r.preventDefault();const n=document.getElementById(i);if(n){const s=n.getBoundingClientRect().top+window.scrollY;window.scrollTo({top:Math.max(0,s-16),behavior:"smooth"})}},{signal:this._abortController.signal})})}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._abortController.abort()}};ho=fn([O("app-root")],ho);
