(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();const zt=globalThis,ze=zt.ShadowRoot&&(zt.ShadyCSS===void 0||zt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Fe=Symbol(),no=new WeakMap;let Xo=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Fe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ze&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=no.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&no.set(e,t))}return t}toString(){return this.cssText}};const Pi=o=>new Xo(typeof o=="string"?o:o+"",void 0,Fe),P=(o,...t)=>{const e=o.length===1?o[0]:t.reduce(((i,r,s)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+o[s+1]),o[0]);return new Xo(e,o,Fe)},ki=(o,t)=>{if(ze)o.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const e of t){const i=document.createElement("style"),r=zt.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,o.appendChild(i)}},ao=ze?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Pi(e)})(o):o;const{is:Ii,defineProperty:Bi,getOwnPropertyDescriptor:Ri,getOwnPropertyNames:Vi,getOwnPropertySymbols:Di,getPrototypeOf:Li}=Object,oe=globalThis,lo=oe.trustedTypes,Ni=lo?lo.emptyScript:"",Ui=oe.reactiveElementPolyfillSupport,Bt=(o,t)=>o,Wt={toAttribute(o,t){switch(t){case Boolean:o=o?Ni:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},qe=(o,t)=>!Ii(o,t),co={attribute:!0,type:String,converter:Wt,reflect:!1,useDefault:!1,hasChanged:qe};Symbol.metadata??=Symbol("metadata"),oe.litPropertyMetadata??=new WeakMap;let gt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=co){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&Bi(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:s}=Ri(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:r,set(n){const l=r?.call(this);s?.call(this,n),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??co}static _$Ei(){if(this.hasOwnProperty(Bt("elementProperties")))return;const t=Li(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Bt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Bt("properties"))){const e=this.properties,i=[...Vi(e),...Di(e)];for(const r of i)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)e.unshift(ao(r))}else t!==void 0&&e.push(ao(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ki(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const s=(i.converter?.toAttribute!==void 0?i.converter:Wt).toAttribute(e,i.type);this._$Em=t,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const s=i.getPropertyOptions(r),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Wt;this._$Em=r;const l=n.fromAttribute(e,s.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){const r=this.constructor,s=this[t];if(i??=r.getPropertyOptions(t),!((i.hasChanged??qe)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),s!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,s]of i){const{wrapped:n}=s,l=this[r];n!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,s,l)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};gt.elementStyles=[],gt.shadowRootOptions={mode:"open"},gt[Bt("elementProperties")]=new Map,gt[Bt("finalized")]=new Map,Ui?.({ReactiveElement:gt}),(oe.reactiveElementVersions??=[]).push("2.1.1");const Ke=globalThis,Gt=Ke.trustedTypes,po=Gt?Gt.createPolicy("lit-html",{createHTML:o=>o}):void 0,ti="$lit$",K=`lit$${Math.random().toFixed(9).slice(2)}$`,ei="?"+K,Mi=`<${ei}>`,nt=document,Rt=()=>nt.createComment(""),Vt=o=>o===null||typeof o!="object"&&typeof o!="function",We=Array.isArray,ji=o=>We(o)||typeof o?.[Symbol.iterator]=="function",de=`[ 	
\f\r]`,Pt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ho=/-->/g,uo=/>/g,Q=RegExp(`>|${de}(?:([^\\s"'>=/]+)(${de}*=${de}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),go=/'/g,fo=/"/g,oi=/^(?:script|style|textarea|title)$/i,Hi=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),h=Hi(1),U=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),mo=new WeakMap,ot=nt.createTreeWalker(nt,129);function ii(o,t){if(!We(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return po!==void 0?po.createHTML(t):t}const zi=(o,t)=>{const e=o.length-1,i=[];let r,s=t===2?"<svg>":t===3?"<math>":"",n=Pt;for(let l=0;l<e;l++){const a=o[l];let d,p,c=-1,g=0;for(;g<a.length&&(n.lastIndex=g,p=n.exec(a),p!==null);)g=n.lastIndex,n===Pt?p[1]==="!--"?n=ho:p[1]!==void 0?n=uo:p[2]!==void 0?(oi.test(p[2])&&(r=RegExp("</"+p[2],"g")),n=Q):p[3]!==void 0&&(n=Q):n===Q?p[0]===">"?(n=r??Pt,c=-1):p[1]===void 0?c=-2:(c=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?Q:p[3]==='"'?fo:go):n===fo||n===go?n=Q:n===ho||n===uo?n=Pt:(n=Q,r=void 0);const f=n===Q&&o[l+1].startsWith("/>")?" ":"";s+=n===Pt?a+Mi:c>=0?(i.push(d),a.slice(0,c)+ti+a.slice(c)+K+f):a+K+(c===-2?l:f)}return[ii(o,s+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};let Ce=class ri{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,n=0;const l=t.length-1,a=this.parts,[d,p]=zi(t,e);if(this.el=ri.createElement(d,i),ot.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=ot.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const c of r.getAttributeNames())if(c.endsWith(ti)){const g=p[n++],f=r.getAttribute(c).split(K),V=/([.?@])?(.*)/.exec(g);a.push({type:1,index:s,name:V[2],strings:f,ctor:V[1]==="."?qi:V[1]==="?"?Ki:V[1]==="@"?Wi:ie}),r.removeAttribute(c)}else c.startsWith(K)&&(a.push({type:6,index:s}),r.removeAttribute(c));if(oi.test(r.tagName)){const c=r.textContent.split(K),g=c.length-1;if(g>0){r.textContent=Gt?Gt.emptyScript:"";for(let f=0;f<g;f++)r.append(c[f],Rt()),ot.nextNode(),a.push({type:2,index:++s});r.append(c[g],Rt())}}}else if(r.nodeType===8)if(r.data===ei)a.push({type:2,index:s});else{let c=-1;for(;(c=r.data.indexOf(K,c+1))!==-1;)a.push({type:7,index:s}),c+=K.length-1}s++}}static createElement(t,e){const i=nt.createElement("template");return i.innerHTML=t,i}};function yt(o,t,e=o,i){if(t===U)return t;let r=i!==void 0?e._$Co?.[i]:e._$Cl;const s=Vt(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(o),r._$AT(o,e,i)),i!==void 0?(e._$Co??=[])[i]=r:e._$Cl=r),r!==void 0&&(t=yt(o,r._$AS(o,t.values),r,i)),t}let Fi=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??nt).importNode(e,!0);ot.currentNode=r;let s=ot.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new Ge(s,s.nextSibling,this,t):a.type===1?d=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(d=new Gi(s,this,t)),this._$AV.push(d),a=i[++l]}n!==a?.index&&(s=ot.nextNode(),n++)}return ot.currentNode=nt,r}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Ge=class si{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=yt(this,t,e),Vt(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==U&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ji(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&Vt(this._$AH)?this._$AA.nextSibling.data=t:this.T(nt.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Ce.createElement(ii(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const s=new Fi(r,this),n=s.u(this.options);s.p(e),this.T(n),this._$AH=s}}_$AC(t){let e=mo.get(t.strings);return e===void 0&&mo.set(t.strings,e=new Ce(t)),e}k(t){We(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new si(this.O(Rt()),this.O(Rt()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ie=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=m}_$AI(t,e=this,i,r){const s=this.strings;let n=!1;if(s===void 0)t=yt(this,t,e,0),n=!Vt(t)||t!==this._$AH&&t!==U,n&&(this._$AH=t);else{const l=t;let a,d;for(t=s[0],a=0;a<s.length-1;a++)d=yt(this,l[i+a],e,a),d===U&&(d=this._$AH[a]),n||=!Vt(d)||d!==this._$AH[a],d===m?t=m:t!==m&&(t+=(d??"")+s[a+1]),this._$AH[a]=d}n&&!r&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},qi=class extends ie{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},Ki=class extends ie{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},Wi=class extends ie{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=yt(this,t,e,0)??m)===U)return;const i=this._$AH,r=t===m&&i!==m||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==m&&(i===m||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Gi=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){yt(this,t)}};const Zi=Ke.litHtmlPolyfillSupport;Zi?.(Ce,Ge),(Ke.litHtmlVersions??=[]).push("3.3.1");const ni=(o,t,e)=>{const i=e?.renderBefore??t;let r=i._$litPart$;if(r===void 0){const s=e?.renderBefore??null;i._$litPart$=r=new Ge(t.insertBefore(Rt(),s),s,void 0,e??{})}return r._$AI(o),r};const Ze=globalThis;let w=class extends gt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ni(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}};w._$litElement$=!0,w.finalized=!0,Ze.litElementHydrateSupport?.({LitElement:w});const Yi=Ze.litElementPolyfillSupport;Yi?.({LitElement:w});(Ze.litElementVersions??=[]).push("4.2.1");const T=o=>(t,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(o,t)})):customElements.define(o,t)};const Ji={attribute:!0,type:String,converter:Wt,reflect:!1,hasChanged:qe},Qi=(o=Ji,t,e)=>{const{kind:i,metadata:r}=e;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),i==="setter"&&((o=Object.create(o)).wrapped=!0),s.set(e.name,o),i==="accessor"){const{name:n}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,o)},init(l){return l!==void 0&&this.C(n,void 0,o,l),l}}}if(i==="setter"){const{name:n}=e;return function(l){const a=this[n];t.call(this,l),this.requestUpdate(n,a,o)}}throw Error("Unsupported decorator location: "+i)};function u(o){return(t,e)=>typeof e=="object"?Qi(o,t,e):((i,r,s)=>{const n=r.hasOwnProperty(s);return r.constructor.createProperty(s,i),n?Object.getOwnPropertyDescriptor(r,s):void 0})(o,t,e)}function b(o){return u({...o,state:!0,attribute:!1})}const ai=(o,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(o,t,e),e);function $(o,t){return(e,i,r)=>{const s=n=>n.renderRoot?.querySelector(o)??null;return ai(e,i,{get(){return s(this)}})}}let Xi;function Ye(o){return(t,e)=>ai(t,e,{get(){return(this.renderRoot??(Xi??=document.createDocumentFragment())).querySelectorAll(o)}})}function et(o,t,e){return o?t(o):e?.(o)}const it=o=>o??m,tr="modulepreload",er=function(o,t){return new URL(o,t).href},bo={},Ft=function(t,e,i){let r=Promise.resolve();if(e&&e.length>0){let d=function(p){return Promise.all(p.map(c=>Promise.resolve(c).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};const n=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),a=l?.nonce||l?.getAttribute("nonce");r=d(e.map(p=>{if(p=er(p,i),p in bo)return;bo[p]=!0;const c=p.endsWith(".css"),g=c?'[rel="stylesheet"]':"";if(i)for(let V=n.length-1;V>=0;V--){const D=n[V];if(D.href===p&&(!c||D.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${p}"]${g}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":tr,c||(f.as="script"),f.crossOrigin="",f.href=p,a&&f.setAttribute("nonce",a),document.head.appendChild(f),c)return new Promise((V,D)=>{f.addEventListener("load",V),f.addEventListener("error",()=>D(new Error(`Unable to preload CSS for ${p}`)))})}))}function s(n){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=n,window.dispatchEvent(l),!l.defaultPrevented)throw n}return r.then(n=>{for(const l of n||[])l.status==="rejected"&&s(l.reason);return t().catch(s)})};const q={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},re=o=>(...t)=>({_$litDirective$:o,values:t});let se=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};let Ae=class extends se{constructor(t){if(super(t),this.it=m,t.type!==q.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===m||t==null)return this._t=void 0,this.it=t;if(t===U)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};Ae.directiveName="unsafeHTML",Ae.resultType=1;const Te=re(Ae),or=P`
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
`;var ir=Object.defineProperty,rr=Object.getOwnPropertyDescriptor,ne=(o,t,e,i)=>{for(var r=i>1?void 0:i?rr(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&ir(t,e,r),r};let Dt=class extends w{constructor(){super(...arguments),this.code="",this.language="auto",this.highlightedCode=""}willUpdate(o){(o.has("code")||o.has("language"))&&this.highlightCode()}render(){return h`
      <pre><code class="hljs">${Te(this.highlightedCode)}</code></pre>
    `}async highlightCode(){const t=(await Ft(()=>import("./index-BBc-AmEf.js"),[],import.meta.url)).default,e=this.code.trim();let i;this.language==="auto"?i=t.highlightAuto(e).value:i=t.highlight(e,{language:this.language}).value,this.highlightedCode=i}static get styles(){return[or]}};ne([u({type:String})],Dt.prototype,"code",2);ne([u({type:String})],Dt.prototype,"language",2);ne([b()],Dt.prototype,"highlightedCode",2);Dt=ne([T("syntax-highlighter")],Dt);const F=P`
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
`,sr="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='36pt'%20height='36pt'%20viewBox='0%200%2036%2036'%20version='1.1'%3e%3cg%20id='surface35'%3e%3cpath%20style='%20stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;'%20d='M%2013.5%206.1875%20C%2012.878906%206.1875%2012.375%206.691406%2012.375%207.3125%20C%2012.375%207.933594%2012.878906%208.4375%2013.5%208.4375%20L%2014.0625%208.4375%20L%2014.0625%2013.523438%20C%2014.0625%2014.453125%2013.78125%2015.34375%2013.246094%2016.105469%20L%206.84375%2025.238281%20C%206.140625%2026.238281%206.054688%2027.535156%206.621094%2028.617188%20C%207.183594%2029.703125%208.292969%2030.375%209.515625%2030.375%20L%2026.484375%2030.375%20C%2027.707031%2030.375%2028.816406%2029.703125%2029.378906%2028.617188%20C%2029.941406%2027.535156%2029.859375%2026.238281%2029.15625%2025.238281%20L%2022.753906%2016.105469%20C%2022.21875%2015.34375%2021.9375%2014.453125%2021.9375%2013.523438%20L%2021.9375%208.4375%20L%2022.5%208.4375%20C%2023.121094%208.4375%2023.625%207.933594%2023.625%207.3125%20C%2023.625%206.691406%2023.121094%206.1875%2022.5%206.1875%20Z%20M%2016.3125%208.4375%20L%2019.6875%208.4375%20L%2019.6875%2013.523438%20C%2019.6875%2014.914062%2020.109375%2016.257812%2020.910156%2017.398438%20L%2020.941406%2017.4375%20L%2015.0625%2017.4375%20L%2015.089844%2017.398438%20C%2015.890625%2016.257812%2016.3125%2014.914062%2016.3125%2013.523438%20Z%20M%2015.1875%2020.8125%20C%2015.808594%2020.8125%2016.3125%2021.316406%2016.3125%2021.9375%20C%2016.3125%2022.558594%2015.808594%2023.0625%2015.1875%2023.0625%20C%2014.566406%2023.0625%2014.0625%2022.558594%2014.0625%2021.9375%20C%2014.0625%2021.316406%2014.566406%2020.8125%2015.1875%2020.8125%20Z%20M%2020.53125%2023.0625%20C%2021.617188%2023.0625%2022.5%2023.945312%2022.5%2025.03125%20C%2022.5%2026.117188%2021.617188%2027%2020.53125%2027%20C%2019.445312%2027%2018.5625%2026.117188%2018.5625%2025.03125%20C%2018.5625%2023.945312%2019.445312%2023.0625%2020.53125%2023.0625%20Z%20M%2020.53125%2023.0625%20'/%3e%3c/g%3e%3c/svg%3e";function Ee(o){return o.toLowerCase().split(" ").join("-")}var nr=Object.defineProperty,ar=Object.getOwnPropertyDescriptor,Je=(o,t,e,i)=>{for(var r=i>1?void 0:i?ar(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&nr(t,e,r),r};let Zt=class extends w{render(){return this.styleInputData?h`
      <div class="settings-options">
        <table>
          ${this.styleInputData.settings.map(o=>this.renderStyleRow(o))}
        </table>
        <button @click=${this.applyStyles}>Apply</button>
      </div>
    `:m}renderStyleRow(o){const t=Ee(o.label),e=o.inputType==="number"||o.inputType==="range";return h`
      <tr>
        <td>
          <label for=${t}>${o.label}</label>
        </td>
        <td class="style-input-cell">
          <input
            id=${t}
            class="style-input"
            type=${o.inputType??"text"}
            min=${it(e?o.min:void 0)}
            max=${it(e?o.max:void 0)}
            step=${it(e?o.step:void 0)}
            value=${o.defaultValue}
            data-variable=${o.cssVariable}
            data-unit=${it(o.unit)}
            @input=${o.inputType==="range"?this.updateRangeReadout:void 0}
          />
          ${o.inputType==="range"?h`<output class="style-readout" for=${t}
                >${o.defaultValue}${o.unit??""}</output
              >`:m}
        </td>
      </tr>
    `}updateRangeReadout(o){const t=o.currentTarget,e=this.renderRoot.querySelector(`output[for="${CSS.escape(t.id)}"]`);if(!e)return;const i=t.dataset.unit??"";e.textContent=`${t.value}${i}`}applyStyles(){const o=[];this.styleInputs?.forEach(t=>{if(!t.dataset.variable||!t.value)return;const e=t.dataset.unit??"";o.push(`${t.dataset.variable}: ${t.value}${e};`)}),this.dispatchEvent(new CustomEvent("stylesApplied",{detail:{styles:o.join(`
 `)}}))}static get styles(){return[F,P`
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
      `]}};Je([u({type:Object})],Zt.prototype,"styleInputData",2);Je([Ye(".style-input")],Zt.prototype,"styleInputs",2);Zt=Je([T("story-styles-settings")],Zt);const li=(o,t,e)=>{for(const i of t)if(i[0]===o)return(0,i[1])();return e?.()};var lr=Object.defineProperty,dr=Object.getOwnPropertyDescriptor,Qe=(o,t,e,i)=>{for(var r=i>1?void 0:i?dr(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&lr(t,e,r),r};let Yt=class extends w{render(){return this.propInputData?h`
      <div class="settings-options">
        <table>
          ${this.propInputData.settings.map(o=>li(o.inputType,[["radio",()=>this.createRadioPropInput(o)]],()=>this.createDefaultPropInput(o))??m)}
        </table>
        <button @click=${this.applyProps}>Apply</button>
      </div>
    `:m}createDefaultPropInput(o){const t=Ee(o.label);return h`
      <tr>
        <td><label for=${t}>${o.label}</label></td>
        <td>
          <input
            class="prop-input"
            type=${o.inputType??"text"}
            id=${t}
            data-prop=${o.propertyName}
            data-format=${typeof o.defaultValue}
            placeholder=${o.defaultValue}
          />
        </td>
      </tr>
    `}createRadioPropInput(o){if(o.inputType!=="radio"||!o.radioOptions)return m;const t=Ee(o.label);return h`
      <tr>
        <td><legend>${o.label}</legend></td>
        <td>
          ${o.radioOptions.map(e=>h`<input
                  type="radio"
                  class="prop-input"
                  name=${t}
                  id="${t}-${e}"
                  value=${e}
                  data-prop=${o.propertyName}
                  data-format=${typeof o.defaultValue}
                  ?checked=${o.defaultValue===e}
                /><label for="${t}-${e}"> ${e} </label>`)}
        </td>
      </tr>
    `}applyProps(){const o=[],t=[];this.propInputs?.forEach(e=>{if(!e.dataset.prop||!e.value||e.type==="radio"&&!e.checked)return;const i=e.dataset.prop;let r=e.value;switch(e.dataset.format){case"number":r=parseInt(r);break;case"boolean":r==="true"&&(r=!0),r==="false"&&(r=!1);break}const s=typeof r=="string"?`'${r}'`:r.toString();o.push(`.${i}=\${${s}}`),t.push({propName:i,value:r})}),this.dispatchEvent(new CustomEvent("propsApplied",{detail:{stringifiedProps:o.join(`
  `),appliedProps:t}}))}static get styles(){return[F,P`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }
      `]}};Qe([u({type:Object})],Yt.prototype,"propInputData",2);Qe([Ye(".prop-input")],Yt.prototype,"propInputs",2);Yt=Qe([T("story-props-settings")],Yt);var cr=Object.defineProperty,pr=Object.getOwnPropertyDescriptor,B=(o,t,e,i)=>{for(var r=i>1?void 0:i?pr(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&cr(t,e,r),r};let O=class extends w{constructor(){super(...arguments),this.elementTag="",this.elementClassName="",this.labs=!1,this.detailsVisible=!1,this.shouldShowPropertySettings=!1,this.shouldShowUsageNotes=!1,this.copiedKey=null}render(){return h`
      <div id="container">
        <h2>
          <code>&lt;${this.elementTag}&gt;</code>
          ${et(this.labs,()=>h`<img
                src=${sr}
                alt="Labs icon"
                title="Labs"
                class="labs-icon"
              />`)}
        </h2>
        <h3>Demo</h3>
        <div class="slot-container" style=${it(this.stringifiedStyles)}>
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
    `}get detailsTemplate(){return h`
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
      ${et(this.cssCode,()=>h`
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
          ${et(!!this.propInputData,()=>h`
              <story-props-settings
                .propInputData=${this.propInputData}
                @propsApplied=${this.handlePropsApplied}
              ></story-props-settings>
            `)}
          ${et(!this.propInputData&&!this.shouldShowPropertySettings,()=>h`<p class="section-placeholder">No settings to adjust</p>`)}
          <div
            class="slot-container ${this.shouldShowPropertySettings?"":"hidden"}"
            @slotchange=${this.handleSettingsSlotChange}
          >
            <slot name="settings"></slot>
          </div>
        </div>
        <div class="right-col">
          <h3>Styles</h3>
          ${et(!!this.styleInputData,()=>h`
              <story-styles-settings
                .styleInputData=${this.styleInputData}
                @stylesApplied=${this.handleStylesApplied}
              ></story-styles-settings>
            `,()=>h`<p class="section-placeholder">No styles to adjust</p>`)}
        </div>
      </div>
      ${et(this.shouldShowUsageNotes,()=>h` <h3>Usage Notes</h3>`)}
      <div class="slot-container">
        <slot
          name="usage-notes"
          @slotchange=${this.handleUsageNotesSlotChange}
        ></slot>
      </div>
    `}async copyToClipboard(o,t){try{await navigator.clipboard.writeText(o),this.copiedKey=t,clearTimeout(this._copyTimeout),this._copyTimeout=setTimeout(()=>this.copiedKey=null,2e3)}catch(e){console.warn("Clipboard write failed:",e)}}get importCode(){return this.elementClassName?`import '${this.modulePath}';
import { ${this.elementClassName} } from '${this.modulePath}';`:`import '${this.modulePath}';`}get exampleUsage(){const o=this.defaultUsageProps?"  "+this.defaultUsageProps+`
`:"",t=this.stringifiedProps?"  "+this.stringifiedProps+`
`:"",e=!!o||!!t;return`<${this.elementTag}${e?`
`:""}${o}${t}></${this.elementTag}>`}get cssCode(){return this.stringifiedStyles?`${this.elementTag} {
 ${this.stringifiedStyles}
}`:""}get modulePath(){return this.labs?`@internetarchive/elements/labs/${this.elementTag}/${this.elementTag}`:`@internetarchive/elements/${this.elementTag}/${this.elementTag}`}handleSettingsSlotChange(o){const t=o.target.assignedElements();this.shouldShowPropertySettings=t.length>0}handleUsageNotesSlotChange(o){const t=o.target.assignedElements();this.shouldShowUsageNotes=t.length>0}handleDemoComponentSlotted(o){const t=o.target.assignedElements()[0];t&&(this.slottedDemoComponent=t)}handleStylesApplied(o){const t=o.detail.styles;t&&(this.stringifiedStyles=t)}handlePropsApplied(o){const t=o.detail.stringifiedProps,e=o.detail.appliedProps;!t||!e||(this.stringifiedProps=t,e.forEach(i=>{this.slottedDemoComponent[i.propName]=i.value}))}static get styles(){return[F,P`
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
      `]}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._copyTimeout)}};B([u({type:String})],O.prototype,"elementTag",2);B([u({type:String})],O.prototype,"elementClassName",2);B([u({type:String})],O.prototype,"customExampleUsage",2);B([u({type:String})],O.prototype,"defaultUsageProps",2);B([u({type:Object})],O.prototype,"styleInputData",2);B([u({type:Object})],O.prototype,"propInputData",2);B([u({type:Boolean})],O.prototype,"labs",2);B([b()],O.prototype,"detailsVisible",2);B([b()],O.prototype,"stringifiedStyles",2);B([b()],O.prototype,"stringifiedProps",2);B([b()],O.prototype,"shouldShowPropertySettings",2);B([b()],O.prototype,"shouldShowUsageNotes",2);B([b()],O.prototype,"slottedDemoComponent",2);B([b()],O.prototype,"copiedKey",2);O=B([T("story-template")],O);const hr=o=>typeof o!="string"&&"strTag"in o,ur=(o,t,e)=>{let i=o[0];for(let r=1;r<o.length;r++)i+=t[r-1],i+=o[r];return i};const gr=(o=>hr(o)?ur(o.strings,o.values):o);let I=gr;class fr{constructor(){this.settled=!1,this.promise=new Promise((t,e)=>{this._resolve=t,this._reject=e})}resolve(t){this.settled=!0,this._resolve(t)}reject(t){this.settled=!0,this._reject(t)}}for(let o=0;o<256;o++)(o>>4&15).toString(16)+(o&15).toString(16);let mr=new fr;mr.resolve();var br=Object.defineProperty,vr=Object.getOwnPropertyDescriptor,At=(o,t,e,i)=>{for(var r=i>1?void 0:i?vr(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&br(t,e,r),r};let at=class extends w{constructor(){super(...arguments),this.loadingTitle=I("Loading..."),this.successTitle=I("Success"),this.errorTitle=I("Error"),this.loadingStyle="ring-dots",this.mode="loading"}render(){return h`${li(this.mode,[["ready",()=>this.placeholderTemplate],["loading",()=>this.loadingIndicatorTemplate],["success",()=>this.successIndicatorTemplate],["error",()=>this.errorIndicatorTemplate]])}`}get placeholderTemplate(){return h`<div class="placeholder"></div>`}get loadingIndicatorTemplate(){return h`
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
    `}get shouldShowLoadingDots(){return this.loadingStyle!=="ring"}static get styles(){return[F,P`
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
      `]}};At([u({type:String})],at.prototype,"loadingTitle",2);At([u({type:String})],at.prototype,"successTitle",2);At([u({type:String})],at.prototype,"errorTitle",2);At([u({type:String})],at.prototype,"loadingStyle",2);At([u({type:String})],at.prototype,"mode",2);at=At([T("ia-status-indicator")],at);var yr=Object.defineProperty,$r=Object.getOwnPropertyDescriptor,Tt=(o,t,e,i)=>{for(var r=i>1?void 0:i?$r(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&yr(t,e,r),r};let Z=class extends w{constructor(){super(...arguments),this.mode="primary",this.loading=!1,this.disabled=!1,this.loadingText="",this.type="button"}render(){return h`
      <button
        part="button"
        class=${this.mode}
        ?disabled=${this.loading||this.disabled}
      >
        ${this.loading?this.loadingStateTemplate:h`<slot></slot>`}
      </button>
      <slot name="hidden-button"></slot>
    `}willUpdate(o){o.has("type")&&this.setButtonTypeEmulation()}get loadingStateTemplate(){return h`
      <span class="loading-indicator" alt="Loading indicator">
        <ia-status-indicator mode="loading"></ia-status-indicator> ${I(this.loadingText)}
      </span>
    `}setButtonTypeEmulation(){const o=this.querySelector("input.hidden-button");if(o){o.type=this.type;return}this.addHiddenButton(),this.addEventListener("click",this.handleComponentClick)}handleComponentClick(o){if(this.type==="button"||o instanceof CustomEvent&&o.detail.formActionsInProgress)return;this.querySelector("input.hidden-button").dispatchEvent(new PointerEvent("click"))}addHiddenButton(){this.type!=="button"&&ni(h`<input
        type=${this.type}
        class="hidden-button"
        style="display:none"
        slot="hidden-button"
        @click=${o=>this.handleFormActions(o)}
      />`,this)}handleFormActions(o){o.stopPropagation(),o.isTrusted&&this.dispatchEvent(new CustomEvent("click",{detail:{formActionsInProgress:!0}}))}static get styles(){return[F,P`
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
          outline-color: var(--primary-cta-text-color--);

          cursor: pointer;
          line-height: normal;
          border-style: 'solid';
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
      `]}};Tt([u({type:String})],Z.prototype,"mode",2);Tt([u({type:Boolean})],Z.prototype,"loading",2);Tt([u({type:Boolean})],Z.prototype,"disabled",2);Tt([u({type:String})],Z.prototype,"loadingText",2);Tt([u({type:String,reflect:!0})],Z.prototype,"type",2);Z=Tt([T("ia-button")],Z);const vo=Object.freeze(Object.defineProperty({__proto__:null,get IAButton(){return Z}},Symbol.toStringTag,{value:"Module"}));var wr=Object.getOwnPropertyDescriptor,xr=(o,t,e,i)=>{for(var r=i>1?void 0:i?wr(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=n(r)||r);return r};const _r=[{label:"Mode",propertyName:"mode",defaultValue:"primary",inputType:"radio",radioOptions:["primary","secondary","danger","warning","disabled","transparent","custom","link","danger-link"]},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Loading",propertyName:"loading",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Loading text",propertyName:"loadingText",defaultValue:"",inputType:"text"},{label:"Type",propertyName:"type",defaultValue:"button",inputType:"radio",radioOptions:["button","submit","reset"]}],Sr=[{label:"Button padding",cssVariable:"--ia-theme-button-padding",defaultValue:"0 1.875rem",inputType:"text"},{label:"Button width",cssVariable:"--ia-theme-button-width",defaultValue:"fit-content",inputType:"text"},{label:"Button height",cssVariable:"--ia-theme-button-height",defaultValue:"2.25rem",inputType:"text"},{label:"Button border width",cssVariable:"--ia-theme-button-border-width",defaultValue:"1px",inputType:"text"},{label:"Font",cssVariable:"--ia-theme-base-font-family",defaultValue:"'Helvetica Neue', Helvetica, Arial, sans-serif",inputType:"text"},{label:"Transition",cssVariable:"--ia-button-transition",defaultValue:"all 0.1s ease 0s",inputType:"text"},{label:"Text color (primary)",cssVariable:"--ia-theme-primary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (primary)",cssVariable:"--ia-theme-primary-cta-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (primary)",cssVariable:"--ia-theme-primary-cta-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Text color (secondary)",cssVariable:"--ia-theme-secondary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (secondary)",cssVariable:"--ia-theme-secondary-cta-fill",defaultValue:"#333333",inputType:"color"},{label:"Border color (secondary)",cssVariable:"--ia-theme-secondary-cta-border",defaultValue:"#666666",inputType:"color"},{label:"Text color (danger)",cssVariable:"--ia-theme-danger-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (danger)",cssVariable:"--ia-theme-danger-cta-fill",defaultValue:"#d9534f",inputType:"color"},{label:"Border color (danger)",cssVariable:"--ia-theme-danger-cta-border",defaultValue:"#d43f3a",inputType:"color"},{label:"Text color (warning)",cssVariable:"--ia-theme-warning-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (warning)",cssVariable:"--ia-theme-warning-cta-fill",defaultValue:"#ee8950",inputType:"color"},{label:"Border color (warning)",cssVariable:"--ia-theme-warning-cta-border",defaultValue:"#ec7939",inputType:"color"},{label:"Text color (disabled)",cssVariable:"--ia-theme-disabled-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (disabled)",cssVariable:"--ia-theme-disabled-cta-fill",defaultValue:"#666666",inputType:"color"},{label:"Border color (disabled)",cssVariable:"--ia-theme-disabled-cta-border",defaultValue:"#999999",inputType:"color"},{label:"Text color (custom)",cssVariable:"--ia-button-custom-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (custom)",cssVariable:"--ia-button-custom-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (custom)",cssVariable:"--ia-button-custom-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Text color (custom, on hover)",cssVariable:"--ia-button-custom-active-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (custom, on hover)",cssVariable:"--ia-button-custom-active-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (custom, on hover)",cssVariable:"--ia-button-custom-active-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Link color",cssVariable:"--ia-theme-link-color",defaultValue:"#4b64ff",inputType:"color"},{label:"Danger color",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}];let Oe=class extends w{render(){return h`
      <story-template
        elementTag="ia-button"
        elementClassName="IAButton"
        .defaultUsageProps=${"@click=${() => alert('Button clicked!')}"}
        .styleInputData=${{settings:Sr}}
        .propInputData=${{settings:_r}}
      >
        <ia-button slot="demo" @click=${()=>alert("Button clicked!")}>
          Click Me
        </ia-button>
      </story-template>
    `}};Oe=xr([T("ia-button-story")],Oe);const Cr=Object.freeze(Object.defineProperty({__proto__:null,get IAButtonStory(){return Oe}},Symbol.toStringTag,{value:"Module"})),di=JSON.parse(`[{"name":"Afghanistan","flag":"🇦🇫"},{"name":"Albania","flag":"🇦🇱"},{"name":"Algeria","flag":"🇩🇿"},{"name":"Andorra","flag":"🇦🇩"},{"name":"Angola","flag":"🇦🇴"},{"name":"Antigua and Barbuda","flag":"🇦🇬"},{"name":"Argentina","flag":"🇦🇷"},{"name":"Armenia","flag":"🇦🇲"},{"name":"Aruba","flag":"🇦🇼"},{"name":"Australia","flag":"🇦🇺"},{"name":"Austria","flag":"🇦🇹"},{"name":"Azerbaijan","flag":"🇦🇿"},{"name":"Bahamas","flag":"🇧🇸"},{"name":"Bahrain","flag":"🇧🇭"},{"name":"Bangladesh","flag":"🇧🇩"},{"name":"Barbados","flag":"🇧🇧"},{"name":"Belarus","flag":"🇧🇾"},{"name":"Belgium","flag":"🇧🇪"},{"name":"Belize","flag":"🇧🇿"},{"name":"Benin","flag":"🇧🇯"},{"name":"Bhutan","flag":"🇧🇹"},{"name":"Bolivia","flag":"🇧🇴"},{"name":"Bosnia and Herzegovina","flag":"🇧🇦"},{"name":"Botswana","flag":"🇧🇼"},{"name":"Brazil","flag":"🇧🇷"},{"name":"Brunei","flag":"🇧🇳"},{"name":"Bulgaria","flag":"🇧🇬"},{"name":"Burkina Faso","flag":"🇧🇫"},{"name":"Burundi","flag":"🇧🇮"},{"name":"Cabo Verde","flag":"🇨🇻"},{"name":"Cambodia","flag":"🇰🇭"},{"name":"Cameroon","flag":"🇨🇲"},{"name":"Canada","flag":"🇨🇦"},{"name":"Central African Republic","flag":"🇨🇫"},{"name":"Chad","flag":"🇹🇩"},{"name":"Chile","flag":"🇨🇱"},{"name":"China","flag":"🇨🇳"},{"name":"Colombia","flag":"🇨🇴"},{"name":"Comoros","flag":"🇰🇲"},{"name":"Cook Islands","flag":"🇨🇰"},{"name":"Costa Rica","flag":"🇨🇷"},{"name":"Côte d'Ivoire","flag":"🇨🇮"},{"name":"Croatia","flag":"🇭🇷"},{"name":"Cuba","flag":"🇨🇺"},{"name":"Cyprus","flag":"🇨🇾"},{"name":"Czechia","flag":"🇨🇿"},{"name":"Democratic Republic of the Congo","flag":"🇨🇩"},{"name":"Denmark","flag":"🇩🇰"},{"name":"Djibouti","flag":"🇩🇯"},{"name":"Dominica","flag":"🇩🇲"},{"name":"Dominican Republic","flag":"🇩🇴"},{"name":"Ecuador","flag":"🇪🇨"},{"name":"Egypt","flag":"🇪🇬"},{"name":"El Salvador","flag":"🇸🇻"},{"name":"Equatorial Guinea","flag":"🇬🇶"},{"name":"Eritrea","flag":"🇪🇷"},{"name":"Estonia","flag":"🇪🇪"},{"name":"Eswatini","flag":"🇸🇿"},{"name":"Ethiopia","flag":"🇪🇹"},{"name":"Fiji","flag":"🇫🇯"},{"name":"Finland","flag":"🇫🇮"},{"name":"France","flag":"🇫🇷"},{"name":"Gabon","flag":"🇬🇦"},{"name":"Gambia","flag":"🇬🇲"},{"name":"Georgia","flag":"🇬🇪"},{"name":"Germany","flag":"🇩🇪"},{"name":"Ghana","flag":"🇬🇭"},{"name":"Greece","flag":"🇬🇷"},{"name":"Grenada","flag":"🇬🇩"},{"name":"Guatemala","flag":"🇬🇹"},{"name":"Guinea","flag":"🇬🇳"},{"name":"Guinea-Bissau","flag":"🇬🇼"},{"name":"Guyana","flag":"🇬🇾"},{"name":"Haiti","flag":"🇭🇹"},{"name":"Honduras","flag":"🇭🇳"},{"name":"Hungary","flag":"🇭🇺"},{"name":"Iceland","flag":"🇮🇸"},{"name":"India","flag":"🇮🇳"},{"name":"Indonesia","flag":"🇮🇩"},{"name":"Iran","flag":"🇮🇷"},{"name":"Iraq","flag":"🇮🇶"},{"name":"Ireland","flag":"🇮🇪"},{"name":"Israel","flag":"🇮🇱"},{"name":"Italy","flag":"🇮🇹"},{"name":"Jamaica","flag":"🇯🇲"},{"name":"Japan","flag":"🇯🇵"},{"name":"Jordan","flag":"🇯🇴"},{"name":"Kazakhstan","flag":"🇰🇿"},{"name":"Kenya","flag":"🇰🇪"},{"name":"Kiribati","flag":"🇰🇮"},{"name":"Kosovo","flag":"🇽🇰"},{"name":"Kuwait","flag":"🇰🇼"},{"name":"Kyrgyzstan","flag":"🇰🇬"},{"name":"Laos","flag":"🇱🇦"},{"name":"Latvia","flag":"🇱🇻"},{"name":"Lebanon","flag":"🇱🇧"},{"name":"Lesotho","flag":"🇱🇸"},{"name":"Liberia","flag":"🇱🇷"},{"name":"Libya","flag":"🇱🇾"},{"name":"Liechtenstein","flag":"🇱🇮"},{"name":"Lithuania","flag":"🇱🇹"},{"name":"Luxembourg","flag":"🇱🇺"},{"name":"Madagascar","flag":"🇲🇬"},{"name":"Malawi","flag":"🇲🇼"},{"name":"Malaysia","flag":"🇲🇾"},{"name":"Maldives","flag":"🇲🇻"},{"name":"Mali","flag":"🇲🇱"},{"name":"Malta","flag":"🇲🇹"},{"name":"Marshall Islands","flag":"🇲🇭"},{"name":"Mauritania","flag":"🇲🇷"},{"name":"Mauritius","flag":"🇲🇺"},{"name":"Mexico","flag":"🇲🇽"},{"name":"Micronesia","flag":"🇫🇲"},{"name":"Moldova","flag":"🇲🇩"},{"name":"Monaco","flag":"🇲🇨"},{"name":"Mongolia","flag":"🇲🇳"},{"name":"Montenegro","flag":"🇲🇪"},{"name":"Morocco","flag":"🇲🇦"},{"name":"Mozambique","flag":"🇲🇿"},{"name":"Myanmar","flag":"🇲🇲"},{"name":"Namibia","flag":"🇳🇦"},{"name":"Nauru","flag":"🇳🇷"},{"name":"Nepal","flag":"🇳🇵"},{"name":"Netherlands","flag":"🇳🇱"},{"name":"New Zealand","flag":"🇳🇿"},{"name":"Nicaragua","flag":"🇳🇮"},{"name":"Niue","flag":"🇳🇺"},{"name":"Niger","flag":"🇳🇪"},{"name":"Nigeria","flag":"🇳🇬"},{"name":"North Korea","flag":"🇰🇵"},{"name":"North Macedonia","flag":"🇲🇰"},{"name":"Norway","flag":"🇳🇴"},{"name":"Oman","flag":"🇴🇲"},{"name":"Pakistan","flag":"🇵🇰"},{"name":"Palau","flag":"🇵🇼"},{"name":"Palestine","flag":"🇵🇸"},{"name":"Panama","flag":"🇵🇦"},{"name":"Papua New Guinea","flag":"🇵🇬"},{"name":"Paraguay","flag":"🇵🇾"},{"name":"Peru","flag":"🇵🇪"},{"name":"Philippines","flag":"🇵🇭"},{"name":"Poland","flag":"🇵🇱"},{"name":"Portugal","flag":"🇵🇹"},{"name":"Qatar","flag":"🇶🇦"},{"name":"Republic of the Congo","flag":"🇨🇬"},{"name":"Romania","flag":"🇷🇴"},{"name":"Russia","flag":"🇷🇺"},{"name":"Rwanda","flag":"🇷🇼"},{"name":"Saint Kitts and Nevis","flag":"🇰🇳"},{"name":"Saint Lucia","flag":"🇱🇨"},{"name":"Saint Vincent and the Grenadines","flag":"🇻🇨"},{"name":"Samoa","flag":"🇼🇸"},{"name":"San Marino","flag":"🇸🇲"},{"name":"Sao Tome and Principe","flag":"🇸🇹"},{"name":"Saudi Arabia","flag":"🇸🇦"},{"name":"Senegal","flag":"🇸🇳"},{"name":"Serbia","flag":"🇷🇸"},{"name":"Seychelles","flag":"🇸🇨"},{"name":"Sierra Leone","flag":"🇸🇱"},{"name":"Singapore","flag":"🇸🇬"},{"name":"Slovakia","flag":"🇸🇰"},{"name":"Slovenia","flag":"🇸🇮"},{"name":"Solomon Islands","flag":"🇸🇧"},{"name":"Somalia","flag":"🇸🇴"},{"name":"South Africa","flag":"🇿🇦"},{"name":"South Korea","flag":"🇰🇷"},{"name":"South Sudan","flag":"🇸🇸"},{"name":"Spain","flag":"🇪🇸"},{"name":"Sri Lanka","flag":"🇱🇰"},{"name":"Sudan","flag":"🇸🇩"},{"name":"Suriname","flag":"🇸🇷"},{"name":"Sweden","flag":"🇸🇪"},{"name":"Switzerland","flag":"🇨🇭"},{"name":"Syria","flag":"🇸🇾"},{"name":"Taiwan","flag":"🇹🇼"},{"name":"Tajikistan","flag":"🇹🇯"},{"name":"Tanzania","flag":"🇹🇿"},{"name":"Thailand","flag":"🇹🇭"},{"name":"Timor-Leste","flag":"🇹🇱"},{"name":"Togo","flag":"🇹🇬"},{"name":"Tonga","flag":"🇹🇴"},{"name":"Trinidad and Tobago","flag":"🇹🇹"},{"name":"Tunisia","flag":"🇹🇳"},{"name":"Turkey","flag":"🇹🇷"},{"name":"Turkmenistan","flag":"🇹🇲"},{"name":"Tuvalu","flag":"🇹🇻"},{"name":"Uganda","flag":"🇺🇬"},{"name":"Ukraine","flag":"🇺🇦"},{"name":"United Arab Emirates","flag":"🇦🇪"},{"name":"United Kingdom","flag":"🇬🇧"},{"name":"United States","flag":"🇺🇸"},{"name":"Uruguay","flag":"🇺🇾"},{"name":"Uzbekistan","flag":"🇺🇿"},{"name":"Vanuatu","flag":"🇻🇺"},{"name":"Vatican City","flag":"🇻🇦"},{"name":"Venezuela","flag":"🇻🇪"},{"name":"Vietnam","flag":"🇻🇳"},{"name":"Yemen","flag":"🇾🇪"},{"name":"Zambia","flag":"🇿🇲"},{"name":"Zimbabwe","flag":"🇿🇼"}]`);const ce=re(class extends se{constructor(o){if(super(o),o.type!==q.ATTRIBUTE||o.name!=="class"||o.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter((t=>o[t])).join(" ")+" "}update(o,[t]){if(this.st===void 0){this.st=new Set,o.strings!==void 0&&(this.nt=new Set(o.strings.join(" ").split(/\s/).filter((i=>i!==""))));for(const i in t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}const e=o.element.classList;for(const i of this.st)i in t||(e.remove(i),this.st.delete(i));for(const i in t){const r=!!t[i];r===this.st.has(i)||this.nt?.has(i)||(r?(e.add(i),this.st.add(i)):(e.remove(i),this.st.delete(i)))}return U}});const Ar=o=>o.strings===void 0,Tr={},Er=(o,t=Tr)=>o._$AH=t;const Or=re(class extends se{constructor(o){if(super(o),o.type!==q.PROPERTY&&o.type!==q.ATTRIBUTE&&o.type!==q.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ar(o))throw Error("`live` bindings can only contain a single expression")}render(o){return o}update(o,[t]){if(t===U||t===m)return t;const e=o.element,i=o.name;if(o.type===q.PROPERTY){if(t===e[i])return U}else if(o.type===q.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(i))return U}else if(o.type===q.ATTRIBUTE&&e.getAttribute(i)===t+"")return U;return Er(o),t}});function Pr(o,t){return t.some(e=>o.has(e))}function kr(o,t){const e=[...o],i=[...t],r=e.length,s=i.length;if(r===0)return!0;let n=0,l=0;for(;l<s;){if(i[l]===e[n]&&(n+=1),n>=r)return!0;l+=1}return!1}const Ir="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501%202.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131%202.7226499%201.81402515z'%20%3e%3c/path%3e%3c/svg%3e",Br="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499%203.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501%202.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131%202.7226499-1.81402514z'%20%3e%3c/path%3e%3c/svg%3e",Rr="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m50%200c27.6142375%200%2050%2022.3857625%2050%2050s-22.3857625%2050-50%2050-50-22.3857625-50-50%2022.3857625-50%2050-50zm23.8159475%2026.1840525c-1.4033215-1.4033215-3.5816761-1.5592461-5.1572272-.4677738l-.5598841.4677738-18.0988362%2018.0989475-18.0988362-18.0989475-.5598841-.4677738c-1.5755511-1.0914723-3.7539057-.9355477-5.1572272.4677738-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113l18.0989475%2018.0988362-18.0989475%2018.0988362c-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113%201.4033215%201.4033215%203.5816761%201.5592461%205.1572272.4677738l.5598841-.4677738%2018.0988362-18.0989475%2018.0988362%2018.0989475.5598841.4677738c1.5755511%201.0914723%203.7539057.9355477%205.1572272-.4677738%201.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113l-18.0989475-18.0988362%2018.0989475-18.0988362c1.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113z'%20fill-rule='evenodd'%20%3e%3c/path%3e%3c/svg%3e";var Vr=Object.defineProperty,Dr=Object.getOwnPropertyDescriptor,C=(o,t,e,i)=>{for(var r=i>1?void 0:i?Dr(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&Vr(t,e,r),r};const Lr={all:()=>!0,prefix:(o,t)=>t.startsWith(o),suffix:(o,t)=>t.endsWith(o),substring:(o,t)=>t.includes(o),subsequence:kr},Nr="list",Ur="substring",Mr=o=>o,jr=o=>o.toLocaleLowerCase();let x=class extends w{constructor(){super(),this.options=[],this.behavior=Nr,this.maxAutocompleteEntries=Number.POSITIVE_INFINITY,this.filter=Ur,this.caseSensitive=!1,this.sort=!1,this.wrapArrowKeys=!1,this.stayOpen=!1,this.clearable=!1,this.open=!1,this.disabled=!1,this.required=!1,this.value=null,this.hasFocus=!1,this.highlightedOption=null,this.enteredText="",this.filterText="",this.losingFocus=!1,this.optionsByID=new Map,this.optionFilteringValues=new Map,this.optionsRespectingSortFlag=[],this.filteredOptions=[],this.internals=this.attachInternals()}render(){const o=ce({disabled:this.disabled,focused:this.hasFocus});return h`
      <div id="container" part="container">
        ${this.labelTemplate}
        <div id="main-widget-row" class=${o} part="combo-box">
          ${this.textInputTemplate}
          ${this.clearable?this.clearButtonTemplate:m}
          ${this.caretButtonTemplate}
        </div>
        ${this.optionsListTemplate}
      </div>
    `}willUpdate(o){(o.has("options")||o.has("caseSensitive"))&&this.rebuildOptionFilteringValues(),o.has("options")&&this.rebuildOptionIDMap(),(o.has("options")||o.has("sort"))&&this.rebuildSortedOptions(),Pr(o,["options","behavior","maxAutocompleteEntries","filter","filterText","caseSensitive","sort"])&&this.rebuildFilteredOptions(),o.has("open")&&(this.open?this.value&&this.setHighlightedOption(this.selectedOption):this.setHighlightedOption(null)),o.has("required")&&this.updateFormValidity()}updated(o){o.has("value")&&this.handleValueChanged(),o.has("options")&&this.behavior!=="freeform"&&!this.selectedOption&&this.clearSelectedOption(),o.has("open")&&(this.open?(this.positionOptionsMenu(),this.optionsList?.showPopover?.(),this.optionsList?.classList.add("visible")):(this.optionsList?.hidePopover?.(),this.optionsList?.classList.remove("visible")))}get labelTemplate(){return h`
      <label id="label" for="text-input" part="label">
        <slot name="label"></slot>
      </label>
    `}get textInputTemplate(){const o=ce({"clear-padding":this.clearable&&!this.shouldShowClearButton});return h`
      <input
        type="text"
        id="text-input"
        class=${o}
        .value=${Or(this.enteredText)}
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
        <span class="sr-only">${I("Clear")}</span>
        <slot name="clear-button">
          <img
            class="icon clear-icon"
            part="icon clear-icon"
            src=${Rr}
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
          src=${Ir}
          alt=""
          aria-hidden="true"
        />
      </slot>
      <slot name="caret-open" ?hidden=${!this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${Br}
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
        <span class="sr-only">${I("Toggle options")}</span>
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
        ${et(this.open,()=>this.optionTemplates)}
        <slot name="options-list-bottom"></slot>
      </ul>
    `}get optionTemplates(){return this.filteredOptions.length===0&&this.maxAutocompleteEntries>0?[this.emptyOptionsTemplate]:this.filteredOptions.map(o=>{const t=o===this.highlightedOption,e=ce({option:!0,highlight:t});return h`
        <li
          id=${o.id}
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
          ${o.content??o.text}
        </li>
      `})}get emptyOptionsTemplate(){return h`
      <li id="empty-options" part="empty-options">
        <slot name="empty-options">${I("No matching options")}</slot>
      </li>
    `}handleOptionPointerEnter(o){this.handleOptionPointerMove(o)}handleOptionPointerMove(o){const t=o.currentTarget,e=this.getOptionFor(t.id);e&&this.setHighlightedOption(e)}handleOptionClick(o){const t=o.currentTarget,e=this.getOptionFor(t.id);e&&(this.setSelectedOption(e.id),this.stayOpen||this.closeOptionsMenu())}handleComboBoxKeyDown(o){switch(o.key){case"Enter":this.handleEnterPressed();break;case"Escape":this.handleEscapePressed();break;case"ArrowUp":o.altKey?this.handleAltUpArrowPressed():this.handleUpArrowPressed();break;case"ArrowDown":o.altKey?this.handleAltDownArrowPressed():this.handleDownArrowPressed();break;case"Tab":this.handleTabPressed();return;case" ":this.handleSpacePressed(o);return;default:return}o.stopPropagation(),o.preventDefault()}async handleTextBoxInput(){const o=this.textInput?.value??"";this.enteredText=o,this.setFilterText(o),this.openOptionsMenu(),await this.updateComplete,this.highlightFirstOption()}handleEnterPressed(){if(!this.open){this.openOptionsMenu();return}this.highlightedOption?this.setSelectedOption(this.highlightedOption.id):this.behavior==="freeform"&&this.setValue(this.enteredText),this.stayOpen||(this.open=!1)}handleEscapePressed(){if(this.open){this.closeOptionsMenu();return}this.clearSelectedOption()}handleUpArrowPressed(){this.open||this.openOptionsMenu(),this.highlightPreviousOption()}handleDownArrowPressed(){this.open||this.openOptionsMenu(),this.highlightNextOption()}handleAltUpArrowPressed(){this.closeOptionsMenu()}handleAltDownArrowPressed(){this.openOptionsMenu()}handleTabPressed(){this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1))}handleSpacePressed(o){this.behavior==="select-only"&&(this.open?this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1)):this.openOptionsMenu(),o.stopPropagation(),o.preventDefault())}handleComboBoxClick(){this.toggleOptionsMenu()}handleClearButtonClick(){this.clearSelectedOption(),this.textInput?.focus(),this.openOptionsMenu()}handleFocus(){this.behavior!=="select-only"&&this.textInput?.focus(),this.hasFocus=!0,this.losingFocus=!1}handleBlur(){this.hasFocus=!1,this.losingFocus=!0,setTimeout(()=>{this.losingFocus&&!this.shadowRoot?.activeElement&&(this.losingFocus=!1,this.closeOptionsMenu(),this.behavior==="list"?this.setTextValue(this.selectedOption?.text??"",!1):this.behavior==="freeform"&&(this.enteredText||this.value)&&this.setValue(this.enteredText))},0)}handleValueChanged(){if(this.value==null){this.enteredText&&this.setTextValue("",!1);return}const o=this.getOptionFor(this.value);if(this.behavior==="freeform"){const t=o?.text??this.value;t!==this.enteredText&&this.setTextValue(t);return}if(!o){this.clearSelectedOption();return}this.enteredText!==o.text&&(this.setTextValue(o.text,!1),this.setFilterText(""))}highlightFirstOption(){this.setHighlightedOption(this.firstFilteredOption)}highlightLastOption(){this.setHighlightedOption(this.lastFilteredOption)}highlightPreviousOption(){const{filteredOptions:o,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightLastOption();return}const{highlightedIndex:e}=this,i=this.wrapArrowKeys&&e===0?t:Math.max(e-1,0);this.setHighlightedOption(o[i])}highlightNextOption(){const{filteredOptions:o,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightFirstOption();return}const{highlightedIndex:e}=this,i=this.wrapArrowKeys&&e===t?0:Math.min(e+1,t);this.setHighlightedOption(o[i])}async setHighlightedOption(o){this.highlightedOption=o,await this.updateComplete;const{optionsList:t,highlightedElement:e}=this;if(!e||!t)return;const i=e.getBoundingClientRect(),r=t.getBoundingClientRect();(i.top<r.top||i.bottom>r.bottom)&&e.scrollIntoView({block:"nearest"})}setSelectedOption(o){const t=this.getOptionFor(o);if(!t)throw new RangeError("Unknown option ID");const e=this.value;this.value=t.id,this.internals.setFormValue(this.value),this.setTextValue(t.text,!1),this.setFilterText(""),this.value!==e&&this.emitChangeEvent(),t.onSelected?.(t)}clearSelectedOption(){const o=this.value;this.value=null,this.internals.setFormValue(this.value),this.setTextValue(""),this.value!==o&&this.emitChangeEvent()}setValue(o){if(this.behavior==="freeform"){const t=this.value;this.value=o,this.internals.setFormValue(this.value),this.setTextValue(o),this.value!==t&&this.emitChangeEvent()}else this.setSelectedOption(o)}setTextValue(o,t=!0){this.textInput&&(this.textInput.value=o),this.enteredText=o,t&&this.setFilterText(o)}setFilterText(o){const{caseTransform:t}=this;this.filterText=t(o)}openOptionsMenu(){this.open=!0,this.emitToggleEvent()}closeOptionsMenu(){this.open=!1,this.emitToggleEvent()}toggleOptionsMenu(){this.open=!this.open,this.emitToggleEvent()}updateFormValidity(){this.required&&!this.value?this.internals.setValidity({valueMissing:!0},I("A value is required")):this.internals.setValidity({})}emitChangeEvent(){this.dispatchEvent(new CustomEvent("change",{detail:this.value}))}emitToggleEvent(){this.dispatchEvent(new CustomEvent("toggle",{detail:this.open}))}get isEmpty(){return!this.selectedOption&&!this.enteredText}get shouldShowClearButton(){return this.clearable&&!this.disabled&&!this.isEmpty}positionOptionsMenu(){const{mainWidgetRow:o,optionsList:t}=this;if(!o||!t)return;const e=o.getBoundingClientRect(),{innerHeight:i,scrollX:r,scrollY:s}=window,n=e.top,l=i-e.bottom,a="var(--combo-box-list-max-height--)",d={top:`${e.bottom+s}px`,left:`${e.left+r}px`,width:`var(--combo-box-list-width--, ${e.width}px)`,maxHeight:`min(${a}, ${l}px)`};Object.assign(t.style,d),setTimeout(()=>{const c=t.getBoundingClientRect().bottom>=i,g=n>l;c&&g&&(t.style.top="auto",t.style.bottom=`${i-e.top-s}px`,t.style.maxHeight=`min(${a}, ${n}px)`)},0)}get caseTransform(){return this.caseSensitive?Mr:jr}getOptionFor(o){return this.optionsByID.get(o)??null}rebuildOptionIDMap(){this.optionsByID.clear();for(const o of this.options)this.optionsByID.set(o.id,o)}rebuildSortedOptions(){this.sort?this.optionsRespectingSortFlag=[...this.options].sort((o,t)=>{const e=this.optionFilteringValues.get(o),i=this.optionFilteringValues.get(t);return e.localeCompare(i)}):this.optionsRespectingSortFlag=this.options}rebuildOptionFilteringValues(){this.optionFilteringValues.clear();const{caseTransform:o}=this;for(const t of this.options){const e=o(t.text);this.optionFilteringValues.set(t,e)}}rebuildFilteredOptions(){const o=this.behavior==="select-only"?"all":this.filter,t=typeof o=="string"?Lr[o]:o,e=this.optionsRespectingSortFlag.filter(i=>{const r=this.optionFilteringValues.get(i);return r?t(this.filterText,r,i):!1}).slice(0,this.maxAutocompleteEntries);this.filteredOptions=e}get firstFilteredOption(){return this.filteredOptions[0]??null}get lastFilteredOption(){return this.filteredOptions[this.lastFilteredIndex]??null}get lastFilteredIndex(){return this.filteredOptions.length-1}get selectedOption(){return this.value==null?null:this.getOptionFor(this.value)}get highlightedIndex(){return this.highlightedOption?this.filteredOptions.indexOf(this.highlightedOption):-1}get highlightedElement(){return this.highlightedOption?this.shadowRoot.getElementById(this.highlightedOption.id):null}static get styles(){const o=P`
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
    `;return[F,o]}};x.formAssociated=!0;x.shadowRootOptions={...w.shadowRootOptions,delegatesFocus:!0};C([u({type:Array})],x.prototype,"options",2);C([u({type:String})],x.prototype,"placeholder",2);C([u({type:String})],x.prototype,"behavior",2);C([u({type:Number,attribute:"max-autocomplete-entries"})],x.prototype,"maxAutocompleteEntries",2);C([u({type:String})],x.prototype,"filter",2);C([u({type:Boolean,reflect:!0,attribute:"case-sensitive"})],x.prototype,"caseSensitive",2);C([u({type:Boolean,reflect:!0})],x.prototype,"sort",2);C([u({type:Boolean,reflect:!0,attribute:"wrap-arrow-keys"})],x.prototype,"wrapArrowKeys",2);C([u({type:Boolean,reflect:!0,attribute:"stay-open"})],x.prototype,"stayOpen",2);C([u({type:Boolean,reflect:!0})],x.prototype,"clearable",2);C([u({type:Boolean,reflect:!0})],x.prototype,"open",2);C([u({type:Boolean,reflect:!0})],x.prototype,"disabled",2);C([u({type:Boolean,reflect:!0})],x.prototype,"required",2);C([u({type:String})],x.prototype,"value",2);C([b()],x.prototype,"hasFocus",2);C([b()],x.prototype,"highlightedOption",2);C([b()],x.prototype,"enteredText",2);C([b()],x.prototype,"filterText",2);C([$("#main-widget-row")],x.prototype,"mainWidgetRow",2);C([$("#text-input")],x.prototype,"textInput",2);C([$("#options-list")],x.prototype,"optionsList",2);x=C([T("ia-combo-box")],x);var Hr=Object.defineProperty,zr=Object.getOwnPropertyDescriptor,_=(o,t,e,i)=>{for(var r=i>1?void 0:i?zr(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&Hr(t,e,r),r};const Fr=[{label:"Width",cssVariable:"--ia-theme-combo-box-width",defaultValue:"250px",inputType:"text"},{label:"Padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown width",cssVariable:"--combo-box-list-width",defaultValue:"",inputType:"text"},{label:"Dropdown max height",cssVariable:"--combo-box-list-max-height",defaultValue:"250px",inputType:"text"},{label:"Dropdown fade duration",cssVariable:"--combo-box-list-fade-duration",defaultValue:125,inputType:"range",min:0,max:1e3,step:25,unit:"ms"}],ci=[{id:"red",text:"Red"},{id:"orange",text:"Orange"},{id:"yellow",text:"Yellow"},{id:"green",text:"Green"},{id:"blue",text:"Blue"},{id:"indigo",text:"Indigo"},{id:"violet",text:"Violet"}],qr=ci.map(o=>({...o,content:h` <span style="display: flex; align-items: center">
      <span style="flex: 1">${o.text}</span>
      <div style="width: 15px; height: 15px; background:${o.id}"></div>
    </span>`})),yo=di.map(o=>({id:o.name,text:o.name})),Kr=di.map(o=>({id:o.name,text:o.name,content:h`<span>${o.flag}</span>&nbsp;<span>${o.name}</span>`})),Wr="list",Gr="Choices",$o="Select an option...",wo=50,Zr="substring";let y=class extends w{constructor(){super(...arguments),this.options=yo,this.behavior=Wr,this.label=Gr,this.placeholder=$o,this.maxAutocompleteEntries=wo,this.filterFn=Zr,this.caseSensitive=!1,this.shouldSort=!1,this.wrapArrowKeys=!0,this.clearable=!0,this.disabled=!1,this.announcerText=""}render(){return h`
      <story-template
        elementTag="ia-combo-box"
        elementClassName="IAComboBox"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:Fr}}
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
                  value=${$o}
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
                  value=${wo}
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
    `}get exampleUsage(){const{placeholder:o,behavior:t,maxAutocompleteEntries:e,filterFn:i}=this,r={behavior:t?`"${t}"`:"",placeholder:o?`"${o}"`:"","max-autocomplete-entries":e?`"${e}"`:"",filter:i&&i!=="substring"?`"${i}"`:"","case-sensitive":this.caseSensitive,sort:this.shouldSort,"wrap-arrow-keys":this.wrapArrowKeys,clearable:this.clearable,disabled:this.disabled};return`
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
`)}applySettings(o){o.preventDefault(),this.updateOptions(),this.behavior=this.behaviorSelect.value,this.label=this.labelInput.value,this.placeholder=this.placeholderInput.value,this.maxAutocompleteEntries=Number(this.maxAutocompleteInput.value),this.filterFn=this.filterFnSelect.value,this.caseSensitive=this.caseSensitiveCheck.checked,this.shouldSort=this.sortCheck.checked,this.wrapArrowKeys=this.wrapArrowKeysCheck.checked,this.clearable=this.clearableCheck.checked,this.disabled=this.disabledCheck.checked}updateOptions(){switch(this.optionSetSelect.value){case"colors":this.options=this.customContentCheck.checked?qr:ci;break;case"countries":this.options=this.customContentCheck.checked?Kr:yo;break;default:this.options=[]}}handleComboBoxChange(o){this.announcerText=`New value is: ${o.detail}`}static get styles(){return P`
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
    `}};_([b()],y.prototype,"options",2);_([b()],y.prototype,"behavior",2);_([b()],y.prototype,"label",2);_([b()],y.prototype,"placeholder",2);_([b()],y.prototype,"maxAutocompleteEntries",2);_([b()],y.prototype,"filterFn",2);_([b()],y.prototype,"caseSensitive",2);_([b()],y.prototype,"shouldSort",2);_([b()],y.prototype,"wrapArrowKeys",2);_([b()],y.prototype,"clearable",2);_([b()],y.prototype,"disabled",2);_([b()],y.prototype,"announcerText",2);_([$("#settings__options")],y.prototype,"optionSetSelect",2);_([$("#settings__custom-content")],y.prototype,"customContentCheck",2);_([$("#settings__behavior")],y.prototype,"behaviorSelect",2);_([$("#settings__label")],y.prototype,"labelInput",2);_([$("#settings__placeholder")],y.prototype,"placeholderInput",2);_([$("#settings__max-entries")],y.prototype,"maxAutocompleteInput",2);_([$("#settings__filter-fn")],y.prototype,"filterFnSelect",2);_([$("#settings__case-sensitive")],y.prototype,"caseSensitiveCheck",2);_([$("#settings__sort")],y.prototype,"sortCheck",2);_([$("#settings__wrap")],y.prototype,"wrapArrowKeysCheck",2);_([$("#settings__clearable")],y.prototype,"clearableCheck",2);_([$("#settings__disabled")],y.prototype,"disabledCheck",2);y=_([T("ia-combo-box-story")],y);const Yr=Object.freeze(Object.defineProperty({__proto__:null,get IAComboBoxStory(){return y}},Symbol.toStringTag,{value:"Module"}));function*Jr(o,t){if(o!==void 0){let e=0;for(const i of o)yield t(i,e++)}}const Qr="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20class='fill-color'%20d='m17.0555551%2041.3194459c0-12.7430552%2010.3541664-23.1027772%2023.0847216-23.1027772%2012.7166664%200%2023.0777773%2010.359722%2023.0777773%2023.1027772%200%2012.7361108-10.3611109%2023.0986106-23.0777773%2023.0986106-12.7305552%200-23.0847216-10.3624998-23.0847216-23.0986106zm-17.24305512%200c0%2022.2916661%2018.04583292%2040.3472213%2040.32777672%2040.3472213%208.9208332%200%2017.145833-2.9319449%2023.8194439-7.8527776l24.1513883%2024.0777771c1.2125%201.1402778%202.8430555%201.8430556%204.6374999%201.8430556%203.7444443%200%206.7805554-3.0361111%206.7805554-6.7791665%200-2.0652778-.9222222-3.9069444-2.3736111-5.1499999l-23.718055-23.7458328c4.4152777-6.4791665%207.0152776-14.3055552%207.0152776-22.7402772%200-22.2791661-18.0458328-40.34861006-40.312499-40.34861006-22.2819438%200-40.32777672%2018.06944396-40.32777672%2040.34861006z'%20fill='%232c2c2c'%20fill-rule='evenodd'%20/%3e%3c/svg%3e";function v(o,t,e,i){var r=arguments.length,s=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(o,t,e,i);else for(var l=o.length-1;l>=0;l--)(n=o[l])&&(s=(r<3?n(s):r>3?n(t,e,s):n(t,e))||s);return r>3&&s&&Object.defineProperty(t,e,s),s}const qt=window,Xe=qt.ShadowRoot&&(qt.ShadyCSS===void 0||qt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,to=Symbol(),xo=new WeakMap;let pi=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==to)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Xe&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=xo.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&xo.set(e,t))}return t}toString(){return this.cssText}};const Xr=o=>new pi(typeof o=="string"?o:o+"",void 0,to),ts=(o,...t)=>{const e=o.length===1?o[0]:t.reduce(((i,r,s)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+o[s+1]),o[0]);return new pi(e,o,to)},es=(o,t)=>{Xe?o.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((e=>{const i=document.createElement("style"),r=qt.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,o.appendChild(i)}))},_o=Xe?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Xr(e)})(o):o;var pe;const Jt=window,So=Jt.trustedTypes,os=So?So.emptyScript:"",Co=Jt.reactiveElementPolyfillSupport,Pe={toAttribute(o,t){switch(t){case Boolean:o=o?os:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},hi=(o,t)=>t!==o&&(t==t||o==o),he={attribute:!0,type:String,converter:Pe,reflect:!1,hasChanged:hi},ke="finalized";let ft=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const r=this._$Ep(i,e);r!==void 0&&(this._$Ev.set(r,i),t.push(r))})),t}static createProperty(t,e=he){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,r=this.getPropertyDescriptor(t,i,e);r!==void 0&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(r){const s=this[t];this[e]=r,this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||he}static finalize(){if(this.hasOwnProperty(ke))return!1;this[ke]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const r of i)this.createProperty(r,e[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)e.unshift(_o(r))}else t!==void 0&&e.push(_o(t));return e}static _$Ep(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach((e=>e(this)))}addController(t){var e,i;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return es(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach((e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)}))}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach((e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=he){var r;const s=this.constructor._$Ep(t,i);if(s!==void 0&&i.reflect===!0){const n=(((r=i.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?i.converter:Pe).toAttribute(e,i.type);this._$El=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$El=null}}_$AK(t,e){var i;const r=this.constructor,s=r._$Ev.get(t);if(s!==void 0&&this._$El!==s){const n=r.getPropertyOptions(s),l=typeof n.converter=="function"?{fromAttribute:n.converter}:((i=n.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?n.converter:Pe;this._$El=s,this[s]=l.fromAttribute(e,n.type),this._$El=null}}requestUpdate(t,e,i){let r=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||hi)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((r,s)=>this[s]=r)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach((r=>{var s;return(s=r.hostUpdate)===null||s===void 0?void 0:s.call(r)})),this.update(i)):this._$Ek()}catch(r){throw e=!1,this._$Ek(),r}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach((i=>{var r;return(r=i.hostUpdated)===null||r===void 0?void 0:r.call(i)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach(((e,i)=>this._$EO(i,this[i],e))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};ft[ke]=!0,ft.elementProperties=new Map,ft.elementStyles=[],ft.shadowRootOptions={mode:"open"},Co?.({ReactiveElement:ft}),((pe=Jt.reactiveElementVersions)!==null&&pe!==void 0?pe:Jt.reactiveElementVersions=[]).push("1.6.3");var ue;const Qt=window,$t=Qt.trustedTypes,Ao=$t?$t.createPolicy("lit-html",{createHTML:o=>o}):void 0,Ie="$lit$",W=`lit$${(Math.random()+"").slice(9)}$`,ui="?"+W,is=`<${ui}>`,lt=document,Lt=()=>lt.createComment(""),Nt=o=>o===null||typeof o!="object"&&typeof o!="function",gi=Array.isArray,rs=o=>gi(o)||typeof o?.[Symbol.iterator]=="function",ge=`[ 	
\f\r]`,kt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,To=/-->/g,Eo=/>/g,X=RegExp(`>|${ge}(?:([^\\s"'>=/]+)(${ge}*=${ge}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Oo=/'/g,Po=/"/g,fi=/^(?:script|style|textarea|title)$/i,ss=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),ns=ss(1),wt=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),ko=new WeakMap,rt=lt.createTreeWalker(lt,129,null,!1);function mi(o,t){if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ao!==void 0?Ao.createHTML(t):t}const as=(o,t)=>{const e=o.length-1,i=[];let r,s=t===2?"<svg>":"",n=kt;for(let l=0;l<e;l++){const a=o[l];let d,p,c=-1,g=0;for(;g<a.length&&(n.lastIndex=g,p=n.exec(a),p!==null);)g=n.lastIndex,n===kt?p[1]==="!--"?n=To:p[1]!==void 0?n=Eo:p[2]!==void 0?(fi.test(p[2])&&(r=RegExp("</"+p[2],"g")),n=X):p[3]!==void 0&&(n=X):n===X?p[0]===">"?(n=r??kt,c=-1):p[1]===void 0?c=-2:(c=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?X:p[3]==='"'?Po:Oo):n===Po||n===Oo?n=X:n===To||n===Eo?n=kt:(n=X,r=void 0);const f=n===X&&o[l+1].startsWith("/>")?" ":"";s+=n===kt?a+is:c>=0?(i.push(d),a.slice(0,c)+Ie+a.slice(c)+W+f):a+W+(c===-2?(i.push(void 0),l):f)}return[mi(o,s+(o[e]||"<?>")+(t===2?"</svg>":"")),i]};let Be=class bi{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,n=0;const l=t.length-1,a=this.parts,[d,p]=as(t,e);if(this.el=bi.createElement(d,i),rt.currentNode=this.el.content,e===2){const c=this.el.content,g=c.firstChild;g.remove(),c.append(...g.childNodes)}for(;(r=rt.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes()){const c=[];for(const g of r.getAttributeNames())if(g.endsWith(Ie)||g.startsWith(W)){const f=p[n++];if(c.push(g),f!==void 0){const V=r.getAttribute(f.toLowerCase()+Ie).split(W),D=/([.?@])?(.*)/.exec(f);a.push({type:1,index:s,name:D[2],strings:V,ctor:D[1]==="."?ds:D[1]==="?"?ps:D[1]==="@"?hs:ae})}else a.push({type:6,index:s})}for(const g of c)r.removeAttribute(g)}if(fi.test(r.tagName)){const c=r.textContent.split(W),g=c.length-1;if(g>0){r.textContent=$t?$t.emptyScript:"";for(let f=0;f<g;f++)r.append(c[f],Lt()),rt.nextNode(),a.push({type:2,index:++s});r.append(c[g],Lt())}}}else if(r.nodeType===8)if(r.data===ui)a.push({type:2,index:s});else{let c=-1;for(;(c=r.data.indexOf(W,c+1))!==-1;)a.push({type:7,index:s}),c+=W.length-1}s++}}static createElement(t,e){const i=lt.createElement("template");return i.innerHTML=t,i}};function xt(o,t,e=o,i){var r,s,n,l;if(t===wt)return t;let a=i!==void 0?(r=e._$Co)===null||r===void 0?void 0:r[i]:e._$Cl;const d=Nt(t)?void 0:t._$litDirective$;return a?.constructor!==d&&((s=a?._$AO)===null||s===void 0||s.call(a,!1),d===void 0?a=void 0:(a=new d(o),a._$AT(o,e,i)),i!==void 0?((n=(l=e)._$Co)!==null&&n!==void 0?n:l._$Co=[])[i]=a:e._$Cl=a),a!==void 0&&(t=xt(o,a._$AS(o,t.values),a,i)),t}let ls=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:r}=this._$AD,s=((e=t?.creationScope)!==null&&e!==void 0?e:lt).importNode(i,!0);rt.currentNode=s;let n=rt.nextNode(),l=0,a=0,d=r[0];for(;d!==void 0;){if(l===d.index){let p;d.type===2?p=new eo(n,n.nextSibling,this,t):d.type===1?p=new d.ctor(n,d.name,d.strings,this,t):d.type===6&&(p=new us(n,this,t)),this._$AV.push(p),d=r[++a]}l!==d?.index&&(n=rt.nextNode(),l++)}return rt.currentNode=lt,s}v(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},eo=class vi{constructor(t,e,i,r){var s;this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cp=(s=r?.isConnected)===null||s===void 0||s}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=xt(this,t,e),Nt(t)?t===S||t==null||t===""?(this._$AH!==S&&this._$AR(),this._$AH=S):t!==this._$AH&&t!==wt&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):rs(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==S&&Nt(this._$AH)?this._$AA.nextSibling.data=t:this.$(lt.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Be.createElement(mi(r.h,r.h[0]),this.options)),r);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===s)this._$AH.v(i);else{const n=new ls(s,this),l=n.u(this.options);n.v(i),this.$(l),this._$AH=n}}_$AC(t){let e=ko.get(t.strings);return e===void 0&&ko.set(t.strings,e=new Be(t)),e}T(t){gi(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new vi(this.k(Lt()),this.k(Lt()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}},ae=class{constructor(t,e,i,r,s){this.type=1,this._$AH=S,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=S}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,r){const s=this.strings;let n=!1;if(s===void 0)t=xt(this,t,e,0),n=!Nt(t)||t!==this._$AH&&t!==wt,n&&(this._$AH=t);else{const l=t;let a,d;for(t=s[0],a=0;a<s.length-1;a++)d=xt(this,l[i+a],e,a),d===wt&&(d=this._$AH[a]),n||(n=!Nt(d)||d!==this._$AH[a]),d===S?t=S:t!==S&&(t+=(d??"")+s[a+1]),this._$AH[a]=d}n&&!r&&this.j(t)}j(t){t===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ds=class extends ae{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===S?void 0:t}};const cs=$t?$t.emptyScript:"";let ps=class extends ae{constructor(){super(...arguments),this.type=4}j(t){t&&t!==S?this.element.setAttribute(this.name,cs):this.element.removeAttribute(this.name)}},hs=class extends ae{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){var i;if((t=(i=xt(this,t,e,0))!==null&&i!==void 0?i:S)===wt)return;const r=this._$AH,s=t===S&&r!==S||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==S&&(r===S||s);s&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}},us=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){xt(this,t)}};const Io=Qt.litHtmlPolyfillSupport;Io?.(Be,eo),((ue=Qt.litHtmlVersions)!==null&&ue!==void 0?ue:Qt.litHtmlVersions=[]).push("2.8.0");const gs=(o,t,e)=>{var i,r;const s=(i=e?.renderBefore)!==null&&i!==void 0?i:t;let n=s._$litPart$;if(n===void 0){const l=(r=e?.renderBefore)!==null&&r!==void 0?r:null;s._$litPart$=n=new eo(t.insertBefore(Lt(),l),l,void 0,e??{})}return n._$AI(o),n};var fe,me;let bt=class extends ft{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=gs(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return wt}};bt.finalized=!0,bt._$litElement$=!0,(fe=globalThis.litElementHydrateSupport)===null||fe===void 0||fe.call(globalThis,{LitElement:bt});const Bo=globalThis.litElementPolyfillSupport;Bo?.({LitElement:bt});((me=globalThis.litElementVersions)!==null&&me!==void 0?me:globalThis.litElementVersions=[]).push("3.3.3");const fs=o=>t=>typeof t=="function"?((e,i)=>(customElements.define(e,i),i))(o,t):((e,i)=>{const{kind:r,elements:s}=i;return{kind:r,elements:s,finisher(n){customElements.define(e,n)}}})(o,t);const ms=(o,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,o)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,o)}},bs=(o,t,e)=>{t.constructor.createProperty(e,o)};function pt(o){return(t,e)=>e!==void 0?bs(o,t,e):ms(o,t)}const vs=({finisher:o,descriptor:t})=>(e,i)=>{var r;if(i===void 0){const s=(r=e.originalKey)!==null&&r!==void 0?r:e.key,n=t!=null?{kind:"method",placement:"prototype",key:s,descriptor:t(e.key)}:{...e,key:s};return o!=null&&(n.finisher=function(l){o(l,s)}),n}{const s=e.constructor;t!==void 0&&Object.defineProperty(e,i,t(i)),o?.(s,i)}};function ys(o,t){return vs({descriptor:e=>({get(){var r,s;return(s=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(o))!==null&&s!==void 0?s:null},enumerable:!0,configurable:!0})})}var be;((be=window.HTMLSlotElement)===null||be===void 0?void 0:be.prototype.assignedElements)!=null;const $s=h`
<svg
  viewBox="0 0 40 40"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z" class="fill-color" fill-rule="evenodd"/>
</svg>
`;class ws extends w{static get styles(){return P`
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
    `}render(){return $s}}customElements.define("ia-icon-close",ws);let M=class extends bt{constructor(){super(...arguments),this.value="",this.clearButtonScreenReaderLabel="Clear",this.focusOnClear=!0,this.forceClearButton=!1}render(){var t,e,i,r;const s=!this.value&&!this.forceClearButton;return ns`
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
          .value=${(i=this.value)!==null&&i!==void 0?i:S}
          aria-controls=${(r=this.ariaControls)!==null&&r!==void 0?r:S}
          @input=${this.onTextInput}
          @keypress=${this.onKeyPress}
        />
        <button
          id="clear-button"
          type="button"
          ?hidden=${s}
          @click=${this.clearButtonClicked}
        >
          <ia-icon-close aria-hidden="true"></ia-icon-close>
          <span class="sr-only">${this.clearButtonScreenReaderLabel}</span>
        </button>
      </div>
    `}onTextInput(){this.value=this.textInput.value}onKeyPress(t){if(t.key==="Enter"){this.textInput.blur();const e=new CustomEvent("submit",{detail:this.value});this.dispatchEvent(e)}}clearButtonClicked(){const t=this.textInput.value;this.value="",this.focusOnClear&&this.textInput.focus();const e=new CustomEvent("clear",{detail:t});this.dispatchEvent(e);const i=new InputEvent("input",{inputType:"deleteContentBackward"});this.dispatchEvent(i)}};M.shadowRootOptions={...bt.shadowRootOptions,delegatesFocus:!0};M.styles=ts`
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
  `;v([pt({type:String})],M.prototype,"value",void 0);v([pt({type:String})],M.prototype,"placeholder",void 0);v([pt({type:String})],M.prototype,"screenReaderLabel",void 0);v([pt({type:String})],M.prototype,"clearButtonScreenReaderLabel",void 0);v([pt({type:String})],M.prototype,"ariaControls",void 0);v([pt({type:Boolean})],M.prototype,"focusOnClear",void 0);v([pt({type:Boolean,reflect:!0})],M.prototype,"forceClearButton",void 0);v([ys("#text-input")],M.prototype,"textInput",void 0);M=v([fs("ia-clearable-text-input")],M);const Kt=window,oo=Kt.ShadowRoot&&(Kt.ShadyCSS===void 0||Kt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,io=Symbol(),Ro=new WeakMap;let yi=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==io)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(oo&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=Ro.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ro.set(e,t))}return t}toString(){return this.cssText}};const xs=o=>new yi(typeof o=="string"?o:o+"",void 0,io),N=(o,...t)=>{const e=o.length===1?o[0]:t.reduce(((i,r,s)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+o[s+1]),o[0]);return new yi(e,o,io)},_s=(o,t)=>{oo?o.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((e=>{const i=document.createElement("style"),r=Kt.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,o.appendChild(i)}))},Vo=oo?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return xs(e)})(o):o;var ve;const Xt=window,Do=Xt.trustedTypes,Ss=Do?Do.emptyScript:"",Lo=Xt.reactiveElementPolyfillSupport,Re={toAttribute(o,t){switch(t){case Boolean:o=o?Ss:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},$i=(o,t)=>t!==o&&(t==t||o==o),ye={attribute:!0,type:String,converter:Re,reflect:!1,hasChanged:$i},Ve="finalized";let mt=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const r=this._$Ep(i,e);r!==void 0&&(this._$Ev.set(r,i),t.push(r))})),t}static createProperty(t,e=ye){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,r=this.getPropertyDescriptor(t,i,e);r!==void 0&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(r){const s=this[t];this[e]=r,this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||ye}static finalize(){if(this.hasOwnProperty(Ve))return!1;this[Ve]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const r of i)this.createProperty(r,e[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)e.unshift(Vo(r))}else t!==void 0&&e.push(Vo(t));return e}static _$Ep(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach((e=>e(this)))}addController(t){var e,i;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return _s(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach((e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)}))}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach((e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=ye){var r;const s=this.constructor._$Ep(t,i);if(s!==void 0&&i.reflect===!0){const n=(((r=i.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?i.converter:Re).toAttribute(e,i.type);this._$El=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$El=null}}_$AK(t,e){var i;const r=this.constructor,s=r._$Ev.get(t);if(s!==void 0&&this._$El!==s){const n=r.getPropertyOptions(s),l=typeof n.converter=="function"?{fromAttribute:n.converter}:((i=n.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?n.converter:Re;this._$El=s,this[s]=l.fromAttribute(e,n.type),this._$El=null}}requestUpdate(t,e,i){let r=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||$i)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((r,s)=>this[s]=r)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach((r=>{var s;return(s=r.hostUpdate)===null||s===void 0?void 0:s.call(r)})),this.update(i)):this._$Ek()}catch(r){throw e=!1,this._$Ek(),r}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach((i=>{var r;return(r=i.hostUpdated)===null||r===void 0?void 0:r.call(i)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach(((e,i)=>this._$EO(i,this[i],e))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};mt[Ve]=!0,mt.elementProperties=new Map,mt.elementStyles=[],mt.shadowRootOptions={mode:"open"},Lo?.({ReactiveElement:mt}),((ve=Xt.reactiveElementVersions)!==null&&ve!==void 0?ve:Xt.reactiveElementVersions=[]).push("1.6.3");var $e;const te=window,_t=te.trustedTypes,No=_t?_t.createPolicy("lit-html",{createHTML:o=>o}):void 0,De="$lit$",G=`lit$${(Math.random()+"").slice(9)}$`,wi="?"+G,Cs=`<${wi}>`,dt=document,Ut=()=>dt.createComment(""),Mt=o=>o===null||typeof o!="object"&&typeof o!="function",xi=Array.isArray,As=o=>xi(o)||typeof o?.[Symbol.iterator]=="function",we=`[ 	
\f\r]`,It=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Uo=/-->/g,Mo=/>/g,tt=RegExp(`>|${we}(?:([^\\s"'>=/]+)(${we}*=${we}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),jo=/'/g,Ho=/"/g,_i=/^(?:script|style|textarea|title)$/i,Si=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),k=Si(1),Ci=Si(2),St=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),zo=new WeakMap,st=dt.createTreeWalker(dt,129,null,!1);function Ai(o,t){if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return No!==void 0?No.createHTML(t):t}const Ts=(o,t)=>{const e=o.length-1,i=[];let r,s=t===2?"<svg>":"",n=It;for(let l=0;l<e;l++){const a=o[l];let d,p,c=-1,g=0;for(;g<a.length&&(n.lastIndex=g,p=n.exec(a),p!==null);)g=n.lastIndex,n===It?p[1]==="!--"?n=Uo:p[1]!==void 0?n=Mo:p[2]!==void 0?(_i.test(p[2])&&(r=RegExp("</"+p[2],"g")),n=tt):p[3]!==void 0&&(n=tt):n===tt?p[0]===">"?(n=r??It,c=-1):p[1]===void 0?c=-2:(c=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?tt:p[3]==='"'?Ho:jo):n===Ho||n===jo?n=tt:n===Uo||n===Mo?n=It:(n=tt,r=void 0);const f=n===tt&&o[l+1].startsWith("/>")?" ":"";s+=n===It?a+Cs:c>=0?(i.push(d),a.slice(0,c)+De+a.slice(c)+G+f):a+G+(c===-2?(i.push(void 0),l):f)}return[Ai(o,s+(o[e]||"<?>")+(t===2?"</svg>":"")),i]};class jt{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,n=0;const l=t.length-1,a=this.parts,[d,p]=Ts(t,e);if(this.el=jt.createElement(d,i),st.currentNode=this.el.content,e===2){const c=this.el.content,g=c.firstChild;g.remove(),c.append(...g.childNodes)}for(;(r=st.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes()){const c=[];for(const g of r.getAttributeNames())if(g.endsWith(De)||g.startsWith(G)){const f=p[n++];if(c.push(g),f!==void 0){const V=r.getAttribute(f.toLowerCase()+De).split(G),D=/([.?@])?(.*)/.exec(f);a.push({type:1,index:s,name:D[2],strings:V,ctor:D[1]==="."?Os:D[1]==="?"?ks:D[1]==="@"?Is:le})}else a.push({type:6,index:s})}for(const g of c)r.removeAttribute(g)}if(_i.test(r.tagName)){const c=r.textContent.split(G),g=c.length-1;if(g>0){r.textContent=_t?_t.emptyScript:"";for(let f=0;f<g;f++)r.append(c[f],Ut()),st.nextNode(),a.push({type:2,index:++s});r.append(c[g],Ut())}}}else if(r.nodeType===8)if(r.data===wi)a.push({type:2,index:s});else{let c=-1;for(;(c=r.data.indexOf(G,c+1))!==-1;)a.push({type:7,index:s}),c+=G.length-1}s++}}static createElement(t,e){const i=dt.createElement("template");return i.innerHTML=t,i}}function Ct(o,t,e=o,i){var r,s,n,l;if(t===St)return t;let a=i!==void 0?(r=e._$Co)===null||r===void 0?void 0:r[i]:e._$Cl;const d=Mt(t)?void 0:t._$litDirective$;return a?.constructor!==d&&((s=a?._$AO)===null||s===void 0||s.call(a,!1),d===void 0?a=void 0:(a=new d(o),a._$AT(o,e,i)),i!==void 0?((n=(l=e)._$Co)!==null&&n!==void 0?n:l._$Co=[])[i]=a:e._$Cl=a),a!==void 0&&(t=Ct(o,a._$AS(o,t.values),a,i)),t}class Es{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:r}=this._$AD,s=((e=t?.creationScope)!==null&&e!==void 0?e:dt).importNode(i,!0);st.currentNode=s;let n=st.nextNode(),l=0,a=0,d=r[0];for(;d!==void 0;){if(l===d.index){let p;d.type===2?p=new Ht(n,n.nextSibling,this,t):d.type===1?p=new d.ctor(n,d.name,d.strings,this,t):d.type===6&&(p=new Bs(n,this,t)),this._$AV.push(p),d=r[++a]}l!==d?.index&&(n=st.nextNode(),l++)}return st.currentNode=dt,s}v(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Ht{constructor(t,e,i,r){var s;this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cp=(s=r?.isConnected)===null||s===void 0||s}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Ct(this,t,e),Mt(t)?t===E||t==null||t===""?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==St&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):As(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==E&&Mt(this._$AH)?this._$AA.nextSibling.data=t:this.$(dt.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=jt.createElement(Ai(r.h,r.h[0]),this.options)),r);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===s)this._$AH.v(i);else{const n=new Es(s,this),l=n.u(this.options);n.v(i),this.$(l),this._$AH=n}}_$AC(t){let e=zo.get(t.strings);return e===void 0&&zo.set(t.strings,e=new jt(t)),e}T(t){xi(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new Ht(this.k(Ut()),this.k(Ut()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class le{constructor(t,e,i,r,s){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=E}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,r){const s=this.strings;let n=!1;if(s===void 0)t=Ct(this,t,e,0),n=!Mt(t)||t!==this._$AH&&t!==St,n&&(this._$AH=t);else{const l=t;let a,d;for(t=s[0],a=0;a<s.length-1;a++)d=Ct(this,l[i+a],e,a),d===St&&(d=this._$AH[a]),n||(n=!Mt(d)||d!==this._$AH[a]),d===E?t=E:t!==E&&(t+=(d??"")+s[a+1]),this._$AH[a]=d}n&&!r&&this.j(t)}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Os extends le{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===E?void 0:t}}const Ps=_t?_t.emptyScript:"";class ks extends le{constructor(){super(...arguments),this.type=4}j(t){t&&t!==E?this.element.setAttribute(this.name,Ps):this.element.removeAttribute(this.name)}}class Is extends le{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){var i;if((t=(i=Ct(this,t,e,0))!==null&&i!==void 0?i:E)===St)return;const r=this._$AH,s=t===E&&r!==E||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==E&&(r===E||s);s&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class Bs{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Ct(this,t)}}const Fo=te.litHtmlPolyfillSupport;Fo?.(jt,Ht),(($e=te.litHtmlVersions)!==null&&$e!==void 0?$e:te.litHtmlVersions=[]).push("2.8.0");const Rs=(o,t,e)=>{var i,r;const s=(i=e?.renderBefore)!==null&&i!==void 0?i:t;let n=s._$litPart$;if(n===void 0){const l=(r=e?.renderBefore)!==null&&r!==void 0?r:null;s._$litPart$=n=new Ht(t.insertBefore(Ut(),l),l,void 0,e??{})}return n._$AI(o),n};var xe,_e;class vt extends mt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Rs(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return St}}vt.finalized=!0,vt._$litElement$=!0,(xe=globalThis.litElementHydrateSupport)===null||xe===void 0||xe.call(globalThis,{LitElement:vt});const qo=globalThis.litElementPolyfillSupport;qo?.({LitElement:vt});((_e=globalThis.litElementVersions)!==null&&_e!==void 0?_e:globalThis.litElementVersions=[]).push("3.3.3");const Ti=o=>t=>typeof t=="function"?((e,i)=>(customElements.define(e,i),i))(o,t):((e,i)=>{const{kind:r,elements:s}=i;return{kind:r,elements:s,finisher(n){customElements.define(e,n)}}})(o,t);const Vs=(o,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,o)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,o)}},Ds=(o,t,e)=>{t.constructor.createProperty(e,o)};function R(o){return(t,e)=>e!==void 0?Ds(o,t,e):Vs(o,t)}const Ei=({finisher:o,descriptor:t})=>(e,i)=>{var r;if(i===void 0){const s=(r=e.originalKey)!==null&&r!==void 0?r:e.key,n=t!=null?{kind:"method",placement:"prototype",key:s,descriptor:t(e.key)}:{...e,key:s};return o!=null&&(n.finisher=function(l){o(l,s)}),n}{const s=e.constructor;t!==void 0&&Object.defineProperty(e,i,t(i)),o?.(s,i)}};function ro(o,t){return Ei({descriptor:e=>({get(){var r,s;return(s=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(o))!==null&&s!==void 0?s:null},enumerable:!0,configurable:!0})})}var Se;const Ls=((Se=window.HTMLSlotElement)===null||Se===void 0?void 0:Se.prototype.assignedElements)!=null?(o,t)=>o.assignedElements(t):(o,t)=>o.assignedNodes(t).filter((e=>e.nodeType===Node.ELEMENT_NODE));function Ns(o){const{slot:t,selector:e}=o??{};return Ei({descriptor:i=>({get(){var r;const s="slot"+(t?`[name=${t}]`:":not([name])"),n=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(s),l=n!=null?Ls(n,o):[];return e?l.filter((a=>a.matches(e))):l},enumerable:!0,configurable:!0})})}function ut(o,t,e){return o?t():e?.()}const Us=Ci`<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>`,Ms=Ci`<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>`;let A=class extends vt{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionGroup="options",this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=t=>{switch(t.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=t=>{t&&t.type==="click"&&t.stopPropagation(),this.open=!1,this.updatePopoverState()}}async firstUpdated(){await new Promise(t=>{setTimeout(t,0)}),this.addEventListener("closeDropdown",this.closeOptions)}willUpdate(t){t.has("open")&&this.updatePopoverState()}disconnectedCallback(){var t;(t=super.disconnectedCallback)===null||t===void 0||t.call(this),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){var t,e;this.usePopover&&((e=(t=this.dropdownMenu)===null||t===void 0?void 0:t.togglePopover)===null||e===void 0||e.call(t,this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;const t=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${t.left}px`,this.dropdownMenu.style.top=`${t.bottom}px`,this.dropdownMenu.style.minWidth=`${t.width}px`}mainButtonClicked(){var t;this.openViaButton?this.toggleOptions():(t=this.mainButtonLabelSlotted[0])===null||t===void 0||t.click()}mainButtonKeyDown(t){(t.key==="Enter"||t.key===" ")&&(this.mainButtonClicked(),t.preventDefault())}caretKeyDown(t){(t.key==="Enter"||t.key===" ")&&(this.toggleOptions(),t.preventDefault())}renderOption(t){const{label:e,url:i=void 0,id:r}=t;let s;const n=this.selectedOption===r?"selected":"";return i?s=k`<a
        href=${i}
        @click=${l=>this.optionClicked(l,t)}
        >${e}</a
      >`:s=k`<button
        @click=${l=>this.optionClicked(l,t)}
      >
        ${e}
      </button>`,k`<li role="menuitem" class=${n}>${s}</li>`}optionClicked(t,e){var i;t.stopPropagation(),this.selectedOption!==e.id&&(this.selectedOption=e.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:e}})),(i=e.selectedHandler)===null||i===void 0||i.call(e,e)),this.closeOnSelect&&(this.closeOptions(),this.mainButton.focus())}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(t=>this.selectedOption!==t.id)}get caretUpTemplate(){return k`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${Us}</slot>
      </span>
    `}get caretDownTemplate(){return k`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${Ms}</slot>
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
        @click=${ut(this.shouldAttachEventHandlers,()=>this.toggleOptions)}
        @keydown=${ut(this.shouldAttachEventHandlers,()=>this.caretKeyDown)}
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
      <div class="ia-dropdown-group ${this.open?"open":""}">
        <div class="button-row">
          <button
            class="click-main"
            aria-haspopup=${this.openViaButton}
            aria-expanded=${this.open}
            @click=${ut(this.shouldAttachEventHandlers,()=>this.mainButtonClicked)}
            @keydown=${ut(this.shouldAttachEventHandlers,()=>this.mainButtonKeyDown)}
            ?disabled=${this.isDisabled}
          >
            <span class="sr-only" id="caret-label"
              >Toggle ${this.optionGroup}</span
            >
            <slot name="dropdown-label"></slot>
            ${ut(this.shouldNestCaretInButton,()=>this.caretTemplate)}
          </button>
          ${ut(!this.shouldNestCaretInButton,()=>this.caretTemplate)}
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
    `}static get styles(){const t=N`var(--dropdownBorderWidth, 1px)`,e=N`var(--dropdownBorderRadius, 4px)`,i=N`var(--dropdownBorderColor, #fff)`,r=N`var(--dropdownBgColor, #333)`,s=N`var(--dropdownTextColor, #fff)`,n=N`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,l=N`var(--dropdownSelectedBgColor, #fff)`,a=N`var(--dropdownMainButtonBgColor, transparent)`,d=N`var(--dropdownTextAlign, inherit)`,p=N`var(--dropdownBackdropZIndex, 1)`,c=N`var(--dropdownListZIndex, 2)`;return N`
      :host {
        display: inline;
        color: ${s};
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
        z-index: ${p};
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
        color: ${s};
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
        color: ${s};
        background: var(--dropdownItemButtonBgColor, transparent);
        padding: var(--dropdownItemButtonPadding, 0);
        text-align: ${d};
      }
    `}};v([R({type:Boolean,reflect:!0})],A.prototype,"open",void 0);v([R({type:Boolean,reflect:!0})],A.prototype,"isDisabled",void 0);v([R({type:Boolean})],A.prototype,"displayCaret",void 0);v([R({type:Boolean})],A.prototype,"closeOnSelect",void 0);v([R({type:Boolean})],A.prototype,"openViaButton",void 0);v([R({type:Boolean})],A.prototype,"usePopover",void 0);v([R({type:Boolean})],A.prototype,"includeSelectedOption",void 0);v([R({type:String})],A.prototype,"selectedOption",void 0);v([R({attribute:!1})],A.prototype,"options",void 0);v([R({type:String})],A.prototype,"optionGroup",void 0);v([R({attribute:!1})],A.prototype,"optionSelected",void 0);v([R({type:Boolean,reflect:!0})],A.prototype,"isCustomList",void 0);v([R({type:Boolean,reflect:!0})],A.prototype,"hasCustomClickHandler",void 0);v([R({type:Boolean,reflect:!0})],A.prototype,"closeOnEscape",void 0);v([R({type:Boolean,reflect:!0})],A.prototype,"closeOnBackdropClick",void 0);v([ro(".ia-dropdown-group")],A.prototype,"container",void 0);v([ro("#dropdown-main")],A.prototype,"dropdownMenu",void 0);v([ro(".click-main")],A.prototype,"mainButton",void 0);v([Ns({slot:"dropdown-label"})],A.prototype,"mainButtonLabelSlotted",void 0);A=v([Ti("ia-dropdown")],A);let Le=class extends vt{render(){return k`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `}};Le.styles=N`
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
  `;Le=v([Ti("ia-icon-label")],Le);var js=Object.defineProperty,Hs=Object.getOwnPropertyDescriptor,z=(o,t,e,i)=>{for(var r=i>1?void 0:i?Hs(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&js(t,e,r),r};const Ko={CategoryChanged:"categoryChanged",SearchRequested:"searchRequested"};let H=class extends w{constructor(){super(...arguments),this.categories=[],this.placeholder=I("Search"),this.useMobileView=!1,this.hideDropdown=!1,this.loading=!1}get resolvedCategory(){return this.selectedCategory??this.categories?.[0]?.id??""}render(){return h`
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
    `}willUpdate(o){if(o.has("selectedCategory")||o.has("categories")){const t=this.resolvedCategory;this.categoryDropdown&&this.categoryDropdown.selectedOption!==t&&(this.categoryDropdown.selectedOption=t)}}get dropdownTemplate(){return h`
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
    `}get textBoxTemplate(){return h`
      <ia-clearable-text-input
        id="search-input"
        part="search-input"
        .value=${this.spacedQuery}
        placeholder=${this.placeholder}
        clearButtonScreenReaderLabel=${I("Clear search query")}
        screenReaderLabel=${I("Search the Archive. Filters and Advanced Search available below.")}
        @clear=${this.searchFieldCleared}
        @submit=${this.handleSubmit}
      ></ia-clearable-text-input>
    `}get searchButtonTemplate(){return h`
      <button
        id="search-button"
        part="search-button"
        class=${this.loading?"loading":m}
        type="button"
        aria-label=${I("Search")}
        @click=${this.handleSubmit}
      >
        ${this.loading?h`<ia-status-indicator
              mode="loading"
              class="search-button-loading-icon"
            ></ia-status-indicator>`:h`<img src=${Qr} alt="" />`}
      </button>
    `}get selectedCategoryLabel(){return this.categories.find(t=>t.id===this.resolvedCategory)?.label??this.resolvedCategory}get spacedQuery(){return this.query?.replace(/\+/g," ")??""}searchFieldCleared(){this.query&&this.emitSearchRequested()}handleSubmit(){this.emitSearchRequested()}handleCategorySelected(o){const t=o.detail.option.id;t!==this.resolvedCategory&&(this.selectedCategory=t,setTimeout(()=>this.searchInput.focus()),this.dispatchEvent(new CustomEvent(Ko.CategoryChanged,{detail:t})))}emitSearchRequested(){this.dispatchEvent(new CustomEvent(Ko.SearchRequested,{detail:{query:this.searchInput.value,category:this.resolvedCategory}}))}static get styles(){const o=P`
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
    `;return[F,o]}};z([u({type:String})],H.prototype,"query",2);z([u({type:Array})],H.prototype,"categories",2);z([u({type:String})],H.prototype,"selectedCategory",2);z([u({type:String})],H.prototype,"placeholder",2);z([u({type:Boolean})],H.prototype,"useMobileView",2);z([u({type:Boolean})],H.prototype,"hideDropdown",2);z([u({type:Boolean})],H.prototype,"loading",2);z([$("#search-input")],H.prototype,"searchInput",2);z([$("#category-dropdown")],H.prototype,"categoryDropdown",2);H=z([T("ia-dropdown-search-bar")],H);var zs=Object.defineProperty,Fs=Object.getOwnPropertyDescriptor,j=(o,t,e,i)=>{for(var r=i>1?void 0:i?Fs(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&zs(t,e,r),r};const qs=[{label:"Bar height",cssVariable:"--ia-theme-search-bar-height",defaultValue:"30px",inputType:"text"},{label:"Bar width",cssVariable:"--ia-theme-search-bar-width",defaultValue:"300px",inputType:"text"},{label:"Internal padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown z-index",cssVariable:"--dropdown-z-index",defaultValue:2,inputType:"number",min:0,step:1}],Wo=[{id:"all",label:"All"},{id:"texts",label:"Books/Documents"},{id:"fulltext",label:"Text Contents"},{id:"radio",label:"Radio"},{id:"tv",label:"TV"},{id:"movies",label:"Video"},{id:"audio",label:"Audio"},{id:"software",label:"Software"},{id:"image",label:"Images"},{id:"etree",label:"Live Music"},{id:"collection",label:"Collections"},{id:"data",label:"Data"},{id:"web",label:"Web Sites"}],Ks="all",Go="Search";let L=class extends w{constructor(){super(...arguments),this.query="",this.selectedCategory=Ks,this.placeholder=Go,this.hideDropdown=!1,this.loading=!1,this.announcerText=""}render(){return h`
      <story-template
        elementTag="ia-dropdown-search-bar"
        elementClassName="IADropdownSearchBar"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:qs}}
      >
        <div slot="demo">
          <ia-dropdown-search-bar
            .query=${this.query}
            .categories=${Wo}
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
                  ${Jr(Wo,o=>h`<option value=${o.id}>
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
                  value=${Go}
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
    `}get exampleUsage(){const{query:o,selectedCategory:t,placeholder:e,hideDropdown:i,loading:r}=this,s=a=>a?`"${a}"`:"",n={query:s(o),selectedCategory:s(t),placeholder:s(e),hideDropdown:i,loading:r};return`
      <ia-dropdown-search-bar
        .categories=\${[
          { id: 'foo', label: 'Foo Option' },
          { id: 'bar', label: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(n).map(([a,d])=>d?d===!0?a:`${a}=${d}`:"").join(`
  `)}
      >
      </ia-dropdown-search-bar>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(o){o.preventDefault(),this.query=this.queryInput.value,this.selectedCategory=this.selectedCategorySelect.value,this.placeholder=this.placeholderInput.value,this.hideDropdown=this.hideDropdownCheck.checked,this.loading=this.loadingCheck.checked}handleSearchRequested(o){this.announcerText=`Category ID "${o.detail.category}" / Query "${o.detail.query}"`}static get styles(){return P`
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
    `}};j([b()],L.prototype,"query",2);j([b()],L.prototype,"selectedCategory",2);j([b()],L.prototype,"placeholder",2);j([b()],L.prototype,"hideDropdown",2);j([b()],L.prototype,"loading",2);j([b()],L.prototype,"announcerText",2);j([$("#settings__query")],L.prototype,"queryInput",2);j([$("#settings__selected-category")],L.prototype,"selectedCategorySelect",2);j([$("#settings__placeholder")],L.prototype,"placeholderInput",2);j([$("#settings__hide-dropdown")],L.prototype,"hideDropdownCheck",2);j([$("#settings__loading")],L.prototype,"loadingCheck",2);L=j([T("ia-dropdown-search-bar-story")],L);const Ws=Object.freeze(Object.defineProperty({__proto__:null,get IADropdownSearchBarStory(){return L}},Symbol.toStringTag,{value:"Module"}));var Gs=Object.defineProperty,Zs=Object.getOwnPropertyDescriptor,ht=(o,t,e,i)=>{for(var r=i>1?void 0:i?Zs(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&Gs(t,e,r),r};const Ys={CodeSubmitted:"codeSubmitted"},Zo=/^[0-9]+$/,Js=/^[a-zA-Z0-9]+$/;let Y=class extends w{constructor(){super(...arguments),this.disabled=!1,this.numChars=6,this.numericOnly=!0,this.allowedChars=Zo}render(){return h`
      ${[...Array(this.numChars).keys()].map(o=>h`<input
            id="OTP-input-${o}"
            part="input"
            type="text"
            autocomplete=${o===0?"one-time-code":"off"}
            inputmode=${this.numericOnly?"numeric":"text"}
            ?disabled=${this.disabled}
            @beforeinput=${this.handleInput}
            @paste=${this.handlePaste}
            @keydown=${this.handleKeydown}
          />`)}
    `}firstUpdated(){this.inputs[0].focus()}willUpdate(o){o.has("numericOnly")&&(this.allowedChars=this.numericOnly?Zo:Js),o.has("prefillValue")&&this.prefillValue!==void 0&&(this.fillInputs(this.prefillValue),this.prefillValue=void 0)}handleInput(o){o.preventDefault();const t=o.target,e=o.data;if(!e)return;if(e.length>1){this.fillInputs(e);return}if(!this.allowedChars.test(e))return;t.value=e;const i=t.nextElementSibling;i&&i.focus(),this.submitIfInputsFilled()}handleKeydown(o){const t=o.target,e=o.key,i=t.previousElementSibling,r=t.nextElementSibling;switch(e){case"Backspace":case"Delete":if(o.preventDefault(),i&&i.focus(),t.value===""){i.value="";break}t.value="";break;case"Tab":t.select();break;case"ArrowRight":case"Right":o.preventDefault(),r&&r.focus();break;case"ArrowLeft":case"Left":o.preventDefault(),i&&i.focus();break}}handlePaste(o){o.preventDefault();const t=o.clipboardData?.getData("text");t&&this.fillInputs(t)}fillInputs(o){o===""&&this.clearInputs();const t=o.split("").filter(i=>this.allowedChars.test(i)).slice(0,this.numChars);if(!t||t.length===0)return;if(t.forEach((i,r)=>this.inputs[r].value=i),t.length===this.numChars){this.triggerSubmit(t.join("")),this.inputs[this.numChars-1].focus();return}this.inputs[t.length].focus()}clearInputs(){this.inputs.forEach(o=>o.value=""),this.inputs[0].focus()}submitIfInputsFilled(){const o=[];this.inputs.forEach(t=>{t.value&&o.push(t.value)}),o.length===this.numChars&&this.triggerSubmit(o.join(""))}triggerSubmit(o){this.dispatchEvent(new CustomEvent(Ys.CodeSubmitted,{detail:this.numericOnly?o:o.toUpperCase(),bubbles:!0,composed:!0}))}static get styles(){return[F,P`
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
      `]}};ht([u({type:String})],Y.prototype,"prefillValue",2);ht([u({type:Boolean})],Y.prototype,"disabled",2);ht([u({type:Number})],Y.prototype,"numChars",2);ht([u({type:Boolean})],Y.prototype,"numericOnly",2);ht([u({type:Object})],Y.prototype,"allowedChars",2);ht([Ye("input")],Y.prototype,"inputs",2);Y=ht([T("ia-otp-input")],Y);var Qs=Object.defineProperty,Xs=Object.getOwnPropertyDescriptor,Et=(o,t,e,i)=>{for(var r=i>1?void 0:i?Xs(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&Qs(t,e,r),r};const tn={NewCodeRequested:"newCodeRequested"};let ct=class extends w{constructor(){super(...arguments),this.validationStatus="ready",this.newCodeSending=!1,this.numPasscodeChars=6,this.numericOnly=!0}render(){return h`
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
      ${this.validationStatus==="error"?h`<p class="error-msg">
            ${I("The code entered is invalid or expired")}
          </p>`:m}
      ${this.resendCodeButtonTemplate}
    `}willUpdate(o){o.has("validationStatus")&&this.OTPInput&&this.validationStatus==="error"&&(this.OTPInput.prefillValue=""),o.has("newCodeSending")&&this.newCodeSending&&this.OTPInput&&(this.OTPInput.prefillValue="")}get resendCodeButtonTemplate(){return this.newCodeSending?h`<span part="new-code-message" class="new-code-msg"
          >${I("Emailing...")}</span
        >`:h`
          <button
            class="new-code-btn link"
            part="new-code-button"
            .disabled=${this.validationStatus==="loading"||this.validationStatus==="success"}
            @click=${this.handleNewCodeRequested}
          >
            ${I("Email me another code")}
          </button>
        `}async handleNewCodeRequested(){this.dispatchEvent(new CustomEvent(tn.NewCodeRequested,{bubbles:!0,composed:!0})),this.OTPInput.prefillValue=""}static get styles(){return[F,P`
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

        .new-code-btn {
          font-family: inherit;
          font-size: var(--font-size-standard--);
          display: block;
          width: fit-content;
          margin-top: 10px;
          border: 0;
          padding: 0;
          appearance: none;
          background: none;
          color: var(--link-color--);
          text-decoration: none;
          cursor: pointer;
        }

        .new-code-btn:hover,
        .new-code-btn:focus {
          text-decoration: underline;
        }

        .new-code-msg {
          margin-top: 10px;
          font-size: var(--font-size-standard--);
          color: var(--link-color--);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `]}};Et([u({type:String})],ct.prototype,"validationStatus",2);Et([u({type:Boolean})],ct.prototype,"newCodeSending",2);Et([u({type:Number})],ct.prototype,"numPasscodeChars",2);Et([u({type:Boolean})],ct.prototype,"numericOnly",2);Et([$("ia-otp-input")],ct.prototype,"OTPInput",2);ct=Et([T("ia-otp-form")],ct);var en=Object.getOwnPropertyDescriptor,on=(o,t,e,i)=>{for(var r=i>1?void 0:i?en(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=n(r)||r);return r};const rn=[{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Input font size",cssVariable:"--ia-theme-font-size-lg",defaultValue:"2.25rem",inputType:"text"},{label:"Link and error font size",cssVariable:"--ia-theme-font-size-standard",defaultValue:"0.875rem",inputType:"text"},{label:"Link font color",cssVariable:"--ia-theme-link-color",defaultValue:"#4b64ff",inputType:"color"},{label:"Error message/indicator color",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"},{label:"Success indicator color",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"}],sn=[{label:"Validation Status",propertyName:"validationStatus",defaultValue:"ready",inputType:"radio",radioOptions:["ready","loading","success","error"]},{label:"New code sending in progress",propertyName:"newCodeSending",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Numeric only",propertyName:"numericOnly",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Number of passcode characters",propertyName:"numPasscodeChars",defaultValue:6,inputType:"number"}];let Ne=class extends w{render(){return h`
      <story-template
        elementTag="ia-otp-form"
        elementClassName="IAOTPForm"
        .defaultUsageProps=${"@codeSubmitted=${(e: CustomEvent) => {setTimeout(() => alert('Code submitted: ' + e.detail), 250);}} \n  @newCodeRequested=${() => alert('New code requested')}"}
        .styleInputData=${{settings:rn}}
        .propInputData=${{settings:sn}}
      >
        <ia-otp-form
          slot="demo"
          @codeSubmitted=${o=>{setTimeout(()=>alert("Code submitted: "+o.detail),250)}}
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
    `}};Ne=on([T("ia-otp-form-story")],Ne);const nn=Object.freeze(Object.defineProperty({__proto__:null,get IAOTPFormStory(){return Ne}},Symbol.toStringTag,{value:"Module"}));var an=Object.getOwnPropertyDescriptor,ln=(o,t,e,i)=>{for(var r=i>1?void 0:i?an(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=n(r)||r);return r};const dn=[{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Font size",cssVariable:"--ia-theme-font-size-lg",defaultValue:"2.25rem",inputType:"text"}],cn=[{label:"Number of characters",propertyName:"numChars",defaultValue:6,inputType:"number"},{label:"Numeric only",propertyName:"numericOnly",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Prefill value",propertyName:"prefillValue",defaultValue:""},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let Ue=class extends w{render(){return h`
      <story-template
        elementTag="ia-otp-input"
        elementClassName="IAOTPInput"
        .defaultUsageProps=${"@codeSubmitted=${(e: CustomEvent) => {setTimeout(() => alert('Code submitted: ' + e.detail), 250);}}"}
        .styleInputData=${{settings:dn}}
        .propInputData=${{settings:cn}}
      >
        <ia-otp-input
          @codeSubmitted=${o=>{setTimeout(()=>alert("Code submitted: "+o.detail),250)}}
          slot="demo"
        ></ia-otp-input>
      </story-template>
    `}};Ue=ln([T("ia-otp-input-story")],Ue);const pn=Object.freeze(Object.defineProperty({__proto__:null,get IAOTPInputStory(){return Ue}},Symbol.toStringTag,{value:"Module"}));var hn=Object.getOwnPropertyDescriptor,un=(o,t,e,i)=>{for(var r=i>1?void 0:i?hn(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=n(r)||r);return r};const gn=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"1.25rem"},{label:"Color - loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Color - success",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"},{label:"Color - error",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}],fn=[{label:"Mode",propertyName:"mode",defaultValue:"loading",inputType:"radio",radioOptions:["ready","loading","success","error"]},{label:"Accessible title - loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{label:"Loading style",propertyName:"loadingStyle",defaultValue:"ring-dots",inputType:"radio",radioOptions:["ring-dots","ring"]},{label:"Accessible title - success",propertyName:"successTitle",defaultValue:"Success"},{label:"Accessible title - error",propertyName:"errorTitle",defaultValue:"Error"}];let Me=class extends w{render(){return h`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .styleInputData=${{settings:gn}}
        .propInputData=${{settings:fn}}
      >
        <ia-status-indicator slot="demo"></ia-status-indicator>
      </story-template>
    `}};Me=un([T("ia-status-indicator-story")],Me);const mn=Object.freeze(Object.defineProperty({__proto__:null,get IAStatusIndicatorStory(){return Me}},Symbol.toStringTag,{value:"Module"})),bn="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='36.283'%20height='36.283'%3e%3cpath%20d='M35.531%2017.391h-3.09l.845-1.464a.748.748%200%201%200-1.297-.75l-1.276%202.214H28.61l2.515-4.354a.751.751%200%200%200-.272-1.024.75.75%200%200%200-1.024.274l-2.948%205.104h-2.023a6.751%206.751%200%200%200-2.713-4.684l1.019-1.76%205.896-.002a.75.75%200%200%200%200-1.5l-5.029.002%201.051-1.82%202.557.002a.75.75%200%200%200%200-1.5l-1.689-.002%201.545-2.676a.75.75%200%201%200-1.302-.75l-1.547%202.676-.844-1.463a.749.749%200%201%200-1.297.75l1.278%202.213-1.051%201.818-2.514-4.354a.75.75%200%200%200-1.298.75l2.946%205.104-1.016%201.758a6.692%206.692%200%200%200-2.706-.57%206.74%206.74%200%200%200-2.707.568l-1.013-1.754%202.946-5.105a.75.75%200%200%200-1.298-.75L13.56%208.697l-1.05-1.818%201.278-2.217a.749.749%200%200%200-1.298-.75l-.845%201.465-1.551-2.678a.75.75%200%200%200-1.024-.273.748.748%200%200%200-.274%201.023l1.545%202.678H8.652a.75.75%200%200%200%200%201.5h2.556l1.05%201.818H7.231a.75.75%200%200%200%200%201.5h5.894l1.017%201.762a6.755%206.755%200%200%200-2.712%204.684H9.406l-2.95-5.104a.75.75%200%201%200-1.299.75l2.516%204.354H5.569l-1.277-2.213a.75.75%200%200%200-1.298.75l.845%201.463H.75a.75.75%200%200%200%200%201.5h3.09l-.845%201.465a.747.747%200%200%200%20.275%201.022.75.75%200%200%200%20.374.103.75.75%200%200%200%20.65-.375l1.277-2.215h2.103l-2.516%204.354a.75.75%200%200%200%201.299.75l2.949-5.104h2.024a6.761%206.761%200%200%200%202.712%204.685l-1.017%201.762H7.232a.75.75%200%200%200%200%201.5h5.026l-1.05%201.818H8.651a.75.75%200%200%200%200%201.5h1.69l-1.545%202.676a.75.75%200%200%200%201.299.75l1.546-2.676.846%201.465a.755.755%200%200%200%20.65.375.737.737%200%200%200%20.375-.103.747.747%200%200%200%20.274-1.022l-1.279-2.215%201.05-1.82%202.515%204.354a.75.75%200%200%200%201.299-.75l-2.947-5.104%201.013-1.756a6.72%206.72%200%200%200%205.415%200l1.014%201.756-2.947%205.104a.75.75%200%200%200%201.298.75l2.515-4.354%201.053%201.82-1.277%202.213a.75.75%200%200%200%201.298.75l.844-1.463%201.545%202.678c.141.24.393.375.65.375a.75.75%200%200%200%20.649-1.125l-1.548-2.678h1.689a.75.75%200%200%200%200-1.5h-2.557l-1.051-1.82%205.029.002a.75.75%200%200%200%200-1.5l-5.896-.002-1.019-1.76a6.75%206.75%200%200%200%202.711-4.685h2.023l2.947%205.104a.753.753%200%200%200%201.025.273.749.749%200%200%200%20.272-1.023l-2.515-4.354h2.104l1.279%202.215a.75.75%200%200%200%20.649.375c.127%200%20.256-.03.375-.103a.748.748%200%200%200%20.273-1.022l-.848-1.465h3.092a.75.75%200%200%200%20.003-1.5zm-12.136.75c0%20.257-.041.502-.076.75a5.223%205.223%200%200%201-1.943%203.358%205.242%205.242%200%200%201-1.291.766%205.224%205.224%200%200%201-1.949.384%205.157%205.157%200%200%201-3.239-1.15%205.22%205.22%200%200%201-1.943-3.358c-.036-.247-.076-.493-.076-.75s.04-.503.076-.75a5.22%205.22%200%200%201%201.944-3.359c.393-.312.82-.576%201.291-.765a5.219%205.219%200%200%201%201.948-.384c.69%200%201.344.142%201.948.384.471.188.898.454%201.291.765a5.222%205.222%200%200%201%201.943%203.359c.035.247.076.493.076.75z'%20fill=':color:'/%3e%3c/svg%3e",Yo=new WeakSet;class vn extends se{constructor(t){super(t)}update(t,[e,i]){return Yo.has(t)||(e(),Yo.add(t)),this.render(e,i)}render(t,e){return e()}}const Jo=re(vn);var yn=Object.defineProperty,$n=Object.getOwnPropertyDescriptor,so=(o,t,e,i)=>{for(var r=i>1?void 0:i?$n(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&yn(t,e,r),r};let ee=class extends w{constructor(){super(...arguments),this.snowing=!1}render(){return h`
      ${this.startButtonTemplate} ${this.clearButtonTemplate}
      <img src=${bn} alt="Snowflakes icon" />
    `}willUpdate(o){o.has("snowConfig")&&(this.snowflakes?.destroy(),this.snowflakes=void 0,this.startSnowing())}get startButtonTemplate(){return Jo(async()=>{await Ft(()=>Promise.resolve().then(()=>vo),void 0,import.meta.url)},()=>h`
        <ia-button
          @click=${()=>{this.snowing?this.stopSnowing():this.startSnowing()}}
        >
          ${this.snowing?"Stop Snowflakes":"Start Snowflakes"}
        </ia-button>
      `)}get clearButtonTemplate(){return Jo(async()=>{await Ft(()=>Promise.resolve().then(()=>vo),void 0,import.meta.url)},()=>h`
        <ia-button
          @click=${()=>{this.snowflakes?.destroy()}}
        >
          Clear Snowflakes
        </ia-button>
      `)}async startSnowing(){if(!this.snowflakes){const t=(await Ft(()=>import("./snowflakes.esm-Dz_MTlsm.js"),[],import.meta.url)).default;this.snowflakes=new t(this.snowConfig)}this.snowflakes?.start(),this.snowing=!0}stopSnowing(){this.snowflakes?.stop(),this.snowing=!1}static get styles(){return P`
      img {
        width: 16px;
        filter: invert(1);
        vertical-align: middle;
      }
    `}};so([u({type:Object})],ee.prototype,"snowConfig",2);so([b()],ee.prototype,"snowing",2);ee=so([T("ia-snow")],ee);var wn=Object.defineProperty,xn=Object.getOwnPropertyDescriptor,Ot=(o,t,e,i)=>{for(var r=i>1?void 0:i?xn(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&wn(t,e,r),r};let J=class extends w{render(){return h`
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
    `:"<ia-snow></ia-snow>"}get configString(){return JSON.stringify(this.config,null,2)}get snowflakeConfig(){return{color:this.colorInput.value,count:Number(this.countInput.value),wind:this.windInput.checked,rotation:this.rotationInput.checked}}setupSnowflakes(){this.config=this.snowflakeConfig}static get styles(){return P`
      fieldset {
        margin-top: 16px;
      }
    `}};Ot([b()],J.prototype,"config",2);Ot([$("#count")],J.prototype,"countInput",2);Ot([$("#wind")],J.prototype,"windInput",2);Ot([$("#rotation")],J.prototype,"rotationInput",2);Ot([$("#color")],J.prototype,"colorInput",2);J=Ot([T("ia-snow-story")],J);const _n=Object.freeze(Object.defineProperty({__proto__:null,get IASnowStory(){return J}},Symbol.toStringTag,{value:"Module"}));var Sn=Object.getOwnPropertyDescriptor,Cn=(o,t,e,i)=>{for(var r=i>1?void 0:i?Sn(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=n(r)||r);return r};const An=Object.assign({"../src/elements/ia-button/ia-button-story.ts":Cr,"../src/elements/ia-combo-box/ia-combo-box-story.ts":Yr,"../src/elements/ia-dropdown-search-bar/ia-dropdown-search-bar-story.ts":Ws,"../src/elements/ia-otp-form/ia-otp-form-story.ts":nn,"../src/elements/ia-otp-input/ia-otp-input-story.ts":pn,"../src/elements/ia-status-indicator/ia-status-indicator-story.ts":mn,"../src/labs/ia-snow/ia-snow-story.ts":_n}),Oi=Object.keys(An).map(o=>{const t=o.includes("/src/labs/"),e=o.split("/"),r=e[e.length-1].replace(/-story\.ts$/,"");return{tag:r,storyTag:`${r}-story`,id:`elem-${r}`,labs:t}}).sort((o,t)=>o.tag.localeCompare(t.tag)),je=Oi.filter(o=>!o.labs),He=Oi.filter(o=>o.labs),Tn=[...je,...He];let Qo=class extends w{constructor(){super(...arguments),this._abortController=new AbortController}createRenderRoot(){return this}render(){return h`
      <nav id="ia-sidebar">
        <h2>Production-Ready</h2>
        ${je.map(o=>h`<a href="#${o.id}">&lt;${o.tag}&gt;</a>`)}
        <h2>Labs 🧪</h2>
        ${He.map(o=>h`<a href="#${o.id}">&lt;${o.tag}&gt;</a>`)}
      </nav>
      <div id="ia-content">
        <h1>Internet Archive Elements</h1>
        <h2>Production-Ready Elements</h2>
        ${je.map(o=>h`
          <div id="${o.id}" class="ia-anchor">
            ${Te(`<${o.storyTag}></${o.storyTag}>`)}
          </div>
        `)}
        <h2>Labs Elements</h2>
        ${He.map(o=>h`
          <div id="${o.id}" class="ia-anchor">
            ${Te(`<${o.storyTag}></${o.storyTag}>`)}
          </div>
        `)}
      </div>
    `}firstUpdated(){const o=Tn.map(i=>i.id),t=Object.fromEntries(o.map(i=>[i,this.querySelector(`#ia-sidebar a[href="#${i}"]`)])),e=new Set;this._observer=new IntersectionObserver(i=>{for(const s of i)s.isIntersecting?e.add(s.target.id):e.delete(s.target.id);const r=o.find(s=>e.has(s))??o[0];o.forEach(s=>t[s]?.classList.toggle("active",s===r))},{rootMargin:"0px 0px -70% 0px"}),o.forEach(i=>{const r=document.getElementById(i);r&&this._observer.observe(r)}),o.forEach(i=>{t[i]?.addEventListener("click",r=>{r.preventDefault();const s=document.getElementById(i);if(s){const n=s.getBoundingClientRect().top+window.scrollY;window.scrollTo({top:Math.max(0,n-16),behavior:"smooth"})}},{signal:this._abortController.signal})})}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._abortController.abort()}};Qo=Cn([T("app-root")],Qo);
