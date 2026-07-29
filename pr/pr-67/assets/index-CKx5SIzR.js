(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const kt=globalThis,fe=kt.ShadowRoot&&(kt.ShadyCSS===void 0||kt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,me=Symbol(),Ee=new WeakMap;let po=class{constructor(t,o,i){if(this._$cssResult$=!0,i!==me)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=o}get styleSheet(){let t=this.o;const o=this.t;if(fe&&t===void 0){const i=o!==void 0&&o.length===1;i&&(t=Ee.get(o)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ee.set(o,t))}return t}toString(){return this.cssText}};const ko=e=>new po(typeof e=="string"?e:e+"",void 0,me),b=(e,...t)=>{const o=e.length===1?e[0]:t.reduce(((i,r,s)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[s+1]),e[0]);return new po(o,e,me)},Po=(e,t)=>{if(fe)e.adoptedStyleSheets=t.map((o=>o instanceof CSSStyleSheet?o:o.styleSheet));else for(const o of t){const i=document.createElement("style"),r=kt.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=o.cssText,e.appendChild(i)}},ke=fe?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let o="";for(const i of t.cssRules)o+=i.cssText;return ko(o)})(e):e;const{is:Bo,defineProperty:Io,getOwnPropertyDescriptor:Vo,getOwnPropertyNames:Do,getOwnPropertySymbols:Lo,getPrototypeOf:Ro}=Object,Ut=globalThis,Pe=Ut.trustedTypes,No=Pe?Pe.emptyScript:"",jo=Ut.reactiveElementPolyfillSupport,$t=(e,t)=>e,It={toAttribute(e,t){switch(t){case Boolean:e=e?No:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=e!==null;break;case Number:o=e===null?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch{o=null}}return o}},be=(e,t)=>!Bo(e,t),Be={attribute:!0,type:String,converter:It,reflect:!1,useDefault:!1,hasChanged:be};Symbol.metadata??=Symbol("metadata"),Ut.litPropertyMetadata??=new WeakMap;let dt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,o=Be){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(t,o),!o.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,o);r!==void 0&&Io(this.prototype,t,r)}}static getPropertyDescriptor(t,o,i){const{get:r,set:s}=Vo(this.prototype,t)??{get(){return this[o]},set(n){this[o]=n}};return{get:r,set(n){const d=r?.call(this);s?.call(this,n),this.requestUpdate(t,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Be}static _$Ei(){if(this.hasOwnProperty($t("elementProperties")))return;const t=Ro(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($t("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($t("properties"))){const o=this.properties,i=[...Do(o),...Lo(o)];for(const r of i)this.createProperty(r,o[r])}const t=this[Symbol.metadata];if(t!==null){const o=litPropertyMetadata.get(t);if(o!==void 0)for(const[i,r]of o)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[o,i]of this.elementProperties){const r=this._$Eu(o,i);r!==void 0&&this._$Eh.set(r,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const o=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)o.unshift(ke(r))}else t!==void 0&&o.push(ke(t));return o}static _$Eu(t,o){const i=o.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,o=this.constructor.elementProperties;for(const i of o.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Po(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,o,i){this._$AK(t,i)}_$ET(t,o){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const s=(i.converter?.toAttribute!==void 0?i.converter:It).toAttribute(o,i.type);this._$Em=t,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,o){const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const s=i.getPropertyOptions(r),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:It;this._$Em=r;const d=n.fromAttribute(o,s.type);this[r]=d??this._$Ej?.get(r)??d,this._$Em=null}}requestUpdate(t,o,i){if(t!==void 0){const r=this.constructor,s=this[t];if(i??=r.getPropertyOptions(t),!((i.hasChanged??be)(s,o)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,o,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,o,{useDefault:i,reflect:r,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??o??this[t]),s!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(o=void 0),this._$AL.set(t,o)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,s]of i){const{wrapped:n}=s,d=this[r];n!==!0||this._$AL.has(r)||d===void 0||this.C(r,void 0,s,d)}}let t=!1;const o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(o)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(o)}willUpdate(t){}_$AE(t){this._$EO?.forEach((o=>o.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((o=>this._$ET(o,this[o]))),this._$EM()}updated(t){}firstUpdated(t){}};dt.elementStyles=[],dt.shadowRootOptions={mode:"open"},dt[$t("elementProperties")]=new Map,dt[$t("finalized")]=new Map,jo?.({ReactiveElement:dt}),(Ut.reactiveElementVersions??=[]).push("2.1.1");const ye=globalThis,Vt=ye.trustedTypes,Ie=Vt?Vt.createPolicy("lit-html",{createHTML:e=>e}):void 0,ho="$lit$",W=`lit$${Math.random().toFixed(9).slice(2)}$`,uo="?"+W,Mo=`<${uo}>`,it=document,xt=()=>it.createComment(""),_t=e=>e===null||typeof e!="object"&&typeof e!="function",ve=Array.isArray,Uo=e=>ve(e)||typeof e?.[Symbol.iterator]=="function",Wt=`[ 	
\f\r]`,vt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ve=/-->/g,De=/>/g,Q=RegExp(`>|${Wt}(?:([^\\s"'>=/]+)(${Wt}*=${Wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Le=/'/g,Re=/"/g,go=/^(?:script|style|textarea|title)$/i,zo=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),l=zo(1),L=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),Ne=new WeakMap,tt=it.createTreeWalker(it,129);function fo(e,t){if(!ve(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ie!==void 0?Ie.createHTML(t):t}const Ho=(e,t)=>{const o=e.length-1,i=[];let r,s=t===2?"<svg>":t===3?"<math>":"",n=vt;for(let d=0;d<o;d++){const a=e[d];let p,u,h=-1,f=0;for(;f<a.length&&(n.lastIndex=f,u=n.exec(a),u!==null);)f=n.lastIndex,n===vt?u[1]==="!--"?n=Ve:u[1]!==void 0?n=De:u[2]!==void 0?(go.test(u[2])&&(r=RegExp("</"+u[2],"g")),n=Q):u[3]!==void 0&&(n=Q):n===Q?u[0]===">"?(n=r??vt,h=-1):u[1]===void 0?h=-2:(h=n.lastIndex-u[2].length,p=u[1],n=u[3]===void 0?Q:u[3]==='"'?Re:Le):n===Re||n===Le?n=Q:n===Ve||n===De?n=vt:(n=Q,r=void 0);const w=n===Q&&e[d+1].startsWith("/>")?" ":"";s+=n===vt?a+Mo:h>=0?(i.push(p),a.slice(0,h)+ho+a.slice(h)+W+w):a+W+(h===-2?d:w)}return[fo(e,s+(e[o]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};let oe=class mo{constructor({strings:t,_$litType$:o},i){let r;this.parts=[];let s=0,n=0;const d=t.length-1,a=this.parts,[p,u]=Ho(t,o);if(this.el=mo.createElement(p,i),tt.currentNode=this.el.content,o===2||o===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=tt.nextNode())!==null&&a.length<d;){if(r.nodeType===1){if(r.hasAttributes())for(const h of r.getAttributeNames())if(h.endsWith(ho)){const f=u[n++],w=r.getAttribute(h).split(W),D=/([.?@])?(.*)/.exec(f);a.push({type:1,index:s,name:D[2],strings:w,ctor:D[1]==="."?qo:D[1]==="?"?Ko:D[1]==="@"?Wo:zt}),r.removeAttribute(h)}else h.startsWith(W)&&(a.push({type:6,index:s}),r.removeAttribute(h));if(go.test(r.tagName)){const h=r.textContent.split(W),f=h.length-1;if(f>0){r.textContent=Vt?Vt.emptyScript:"";for(let w=0;w<f;w++)r.append(h[w],xt()),tt.nextNode(),a.push({type:2,index:++s});r.append(h[f],xt())}}}else if(r.nodeType===8)if(r.data===uo)a.push({type:2,index:s});else{let h=-1;for(;(h=r.data.indexOf(W,h+1))!==-1;)a.push({type:7,index:s}),h+=W.length-1}s++}}static createElement(t,o){const i=it.createElement("template");return i.innerHTML=t,i}};function ht(e,t,o=e,i){if(t===L)return t;let r=i!==void 0?o._$Co?.[i]:o._$Cl;const s=_t(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(e),r._$AT(e,o,i)),i!==void 0?(o._$Co??=[])[i]=r:o._$Cl=r),r!==void 0&&(t=ht(e,r._$AS(e,t.values),r,i)),t}let Fo=class{constructor(t,o){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:o},parts:i}=this._$AD,r=(t?.creationScope??it).importNode(o,!0);tt.currentNode=r;let s=tt.nextNode(),n=0,d=0,a=i[0];for(;a!==void 0;){if(n===a.index){let p;a.type===2?p=new we(s,s.nextSibling,this,t):a.type===1?p=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(p=new Go(s,this,t)),this._$AV.push(p),a=i[++d]}n!==a?.index&&(s=tt.nextNode(),n++)}return tt.currentNode=it,r}p(t){let o=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,o),o+=i.strings.length-2):i._$AI(t[o])),o++}},we=class bo{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,o,i,r){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=o,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const o=this._$AM;return o!==void 0&&t?.nodeType===11&&(t=o.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,o=this){t=ht(this,t,o),_t(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==L&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Uo(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&_t(this._$AH)?this._$AA.nextSibling.data=t:this.T(it.createTextNode(t)),this._$AH=t}$(t){const{values:o,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=oe.createElement(fo(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(o);else{const s=new Fo(r,this),n=s.u(this.options);s.p(o),this.T(n),this._$AH=s}}_$AC(t){let o=Ne.get(t.strings);return o===void 0&&Ne.set(t.strings,o=new oe(t)),o}k(t){ve(this._$AH)||(this._$AH=[],this._$AR());const o=this._$AH;let i,r=0;for(const s of t)r===o.length?o.push(i=new bo(this.O(xt()),this.O(xt()),this,this.options)):i=o[r],i._$AI(s),r++;r<o.length&&(this._$AR(i&&i._$AB.nextSibling,r),o.length=r)}_$AR(t=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},zt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,o,i,r,s){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=o,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=m}_$AI(t,o=this,i,r){const s=this.strings;let n=!1;if(s===void 0)t=ht(this,t,o,0),n=!_t(t)||t!==this._$AH&&t!==L,n&&(this._$AH=t);else{const d=t;let a,p;for(t=s[0],a=0;a<s.length-1;a++)p=ht(this,d[i+a],o,a),p===L&&(p=this._$AH[a]),n||=!_t(p)||p!==this._$AH[a],p===m?t=m:t!==m&&(t+=(p??"")+s[a+1]),this._$AH[a]=p}n&&!r&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},qo=class extends zt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},Ko=class extends zt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},Wo=class extends zt{constructor(t,o,i,r,s){super(t,o,i,r,s),this.type=5}_$AI(t,o=this){if((t=ht(this,t,o,0)??m)===L)return;const i=this._$AH,r=t===m&&i!==m||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==m&&(i===m||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Go=class{constructor(t,o,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=o,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){ht(this,t)}};const Zo=ye.litHtmlPolyfillSupport;Zo?.(oe,we),(ye.litHtmlVersions??=[]).push("3.3.1");const yo=(e,t,o)=>{const i=o?.renderBefore??t;let r=i._$litPart$;if(r===void 0){const s=o?.renderBefore??null;i._$litPart$=r=new we(t.insertBefore(xt(),s),s,void 0,o??{})}return r._$AI(e),r};const $e=globalThis;let v=class extends dt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=yo(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}};v._$litElement$=!0,v.finalized=!0,$e.litElementHydrateSupport?.({LitElement:v});const Yo=$e.litElementPolyfillSupport;Yo?.({LitElement:v});($e.litElementVersions??=[]).push("4.2.1");const S=e=>(t,o)=>{o!==void 0?o.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};const Jo={attribute:!0,type:String,converter:It,reflect:!1,hasChanged:be},Qo=(e=Jo,t,o)=>{const{kind:i,metadata:r}=o;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),s.set(o.name,e),i==="accessor"){const{name:n}=o;return{set(d){const a=t.get.call(this);t.set.call(this,d),this.requestUpdate(n,a,e)},init(d){return d!==void 0&&this.C(n,void 0,e,d),d}}}if(i==="setter"){const{name:n}=o;return function(d){const a=this[n];t.call(this,d),this.requestUpdate(n,a,e)}}throw Error("Unsupported decorator location: "+i)};function c(e){return(t,o)=>typeof o=="object"?Qo(e,t,o):((i,r,s)=>{const n=r.hasOwnProperty(s);return r.constructor.createProperty(s,i),n?Object.getOwnPropertyDescriptor(r,s):void 0})(e,t,o)}function g(e){return c({...e,state:!0,attribute:!1})}const xe=(e,t,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,o),o);function y(e,t){return(o,i,r)=>{const s=n=>n.renderRoot?.querySelector(e)??null;return xe(o,i,{get(){return s(this)}})}}let Xo;function _e(e){return(t,o)=>xe(t,o,{get(){return(this.renderRoot??(Xo??=document.createDocumentFragment())).querySelectorAll(e)}})}function ti(e){return(t,o)=>{const{slot:i,selector:r}=e??{},s="slot"+(i?`[name=${i}]`:":not([name])");return xe(t,o,{get(){const n=this.renderRoot?.querySelector(s),d=n?.assignedElements(e)??[];return r===void 0?d:d.filter((a=>a.matches(r)))}})}}function V(e,t,o){return e?t(e):o?.(e)}const et=e=>e??m,ei="modulepreload",oi=function(e,t){return new URL(e,t).href},je={},Pt=function(t,o,i){let r=Promise.resolve();if(o&&o.length>0){let p=function(u){return Promise.all(u.map(h=>Promise.resolve(h).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const n=document.getElementsByTagName("link"),d=document.querySelector("meta[property=csp-nonce]"),a=d?.nonce||d?.getAttribute("nonce");r=p(o.map(u=>{if(u=oi(u,i),u in je)return;je[u]=!0;const h=u.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(i)for(let D=n.length-1;D>=0;D--){const F=n[D];if(F.href===u&&(!h||F.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${f}`))return;const w=document.createElement("link");if(w.rel=h?"stylesheet":ei,h||(w.as="script"),w.crossOrigin="",w.href=u,a&&w.setAttribute("nonce",a),document.head.appendChild(w),h)return new Promise((D,F)=>{w.addEventListener("load",D),w.addEventListener("error",()=>F(new Error(`Unable to preload CSS for ${u}`)))})}))}function s(n){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=n,window.dispatchEvent(d),!d.defaultPrevented)throw n}return r.then(n=>{for(const d of n||[])d.status==="rejected"&&s(d.reason);return t().catch(s)})};const K={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Ht=e=>(...t)=>({_$litDirective$:e,values:t});let Ft=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,o,i){this._$Ct=t,this._$AM=o,this._$Ci=i}_$AS(t,o){return this.update(t,o)}update(t,o){return this.render(...o)}};let ie=class extends Ft{constructor(t){if(super(t),this.it=m,t.type!==K.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===m||t==null)return this._t=void 0,this.it=t;if(t===L)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const o=[t];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};ie.directiveName="unsafeHTML",ie.resultType=1;const St=Ht(ie),ii=b`
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
`;var ri=Object.defineProperty,si=Object.getOwnPropertyDescriptor,qt=(e,t,o,i)=>{for(var r=i>1?void 0:i?si(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=(i?n(t,o,r):n(r))||r);return i&&r&&ri(t,o,r),r};let Ct=class extends v{constructor(){super(...arguments),this.code="",this.language="auto",this.highlightedCode=""}willUpdate(e){(e.has("code")||e.has("language"))&&this.highlightCode()}render(){return l`
      <pre><code class="hljs">${St(this.highlightedCode)}</code></pre>
    `}async highlightCode(){const t=(await Pt(()=>import("./index-BBc-AmEf.js"),[],import.meta.url)).default,o=this.code.trim();let i;this.language==="auto"?i=t.highlightAuto(o).value:i=t.highlight(o,{language:this.language}).value,this.highlightedCode=i}static get styles(){return[ii]}};qt([c({type:String})],Ct.prototype,"code",2);qt([c({type:String})],Ct.prototype,"language",2);qt([g()],Ct.prototype,"highlightedCode",2);Ct=qt([S("syntax-highlighter")],Ct);const N=b`
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
`,ni="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='36pt'%20height='36pt'%20viewBox='0%200%2036%2036'%20version='1.1'%3e%3cg%20id='surface35'%3e%3cpath%20style='%20stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;'%20d='M%2013.5%206.1875%20C%2012.878906%206.1875%2012.375%206.691406%2012.375%207.3125%20C%2012.375%207.933594%2012.878906%208.4375%2013.5%208.4375%20L%2014.0625%208.4375%20L%2014.0625%2013.523438%20C%2014.0625%2014.453125%2013.78125%2015.34375%2013.246094%2016.105469%20L%206.84375%2025.238281%20C%206.140625%2026.238281%206.054688%2027.535156%206.621094%2028.617188%20C%207.183594%2029.703125%208.292969%2030.375%209.515625%2030.375%20L%2026.484375%2030.375%20C%2027.707031%2030.375%2028.816406%2029.703125%2029.378906%2028.617188%20C%2029.941406%2027.535156%2029.859375%2026.238281%2029.15625%2025.238281%20L%2022.753906%2016.105469%20C%2022.21875%2015.34375%2021.9375%2014.453125%2021.9375%2013.523438%20L%2021.9375%208.4375%20L%2022.5%208.4375%20C%2023.121094%208.4375%2023.625%207.933594%2023.625%207.3125%20C%2023.625%206.691406%2023.121094%206.1875%2022.5%206.1875%20Z%20M%2016.3125%208.4375%20L%2019.6875%208.4375%20L%2019.6875%2013.523438%20C%2019.6875%2014.914062%2020.109375%2016.257812%2020.910156%2017.398438%20L%2020.941406%2017.4375%20L%2015.0625%2017.4375%20L%2015.089844%2017.398438%20C%2015.890625%2016.257812%2016.3125%2014.914062%2016.3125%2013.523438%20Z%20M%2015.1875%2020.8125%20C%2015.808594%2020.8125%2016.3125%2021.316406%2016.3125%2021.9375%20C%2016.3125%2022.558594%2015.808594%2023.0625%2015.1875%2023.0625%20C%2014.566406%2023.0625%2014.0625%2022.558594%2014.0625%2021.9375%20C%2014.0625%2021.316406%2014.566406%2020.8125%2015.1875%2020.8125%20Z%20M%2020.53125%2023.0625%20C%2021.617188%2023.0625%2022.5%2023.945312%2022.5%2025.03125%20C%2022.5%2026.117188%2021.617188%2027%2020.53125%2027%20C%2019.445312%2027%2018.5625%2026.117188%2018.5625%2025.03125%20C%2018.5625%2023.945312%2019.445312%2023.0625%2020.53125%2023.0625%20Z%20M%2020.53125%2023.0625%20'/%3e%3c/g%3e%3c/svg%3e";function re(e){return e.toLowerCase().split(" ").join("-")}var ai=Object.defineProperty,li=Object.getOwnPropertyDescriptor,Se=(e,t,o,i)=>{for(var r=i>1?void 0:i?li(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=(i?n(t,o,r):n(r))||r);return i&&r&&ai(t,o,r),r};let Dt=class extends v{render(){return this.styleInputData?l`
      <div class="settings-options">
        <table>
          ${this.styleInputData.settings.map(e=>this.renderStyleRow(e))}
        </table>
        <button @click=${this.applyStyles}>Apply</button>
      </div>
    `:m}renderStyleRow(e){const t=re(e.label),o=e.inputType==="number"||e.inputType==="range";return l`
      <tr>
        <td>
          <label for=${t}>${e.label}</label>
        </td>
        <td class="style-input-cell">
          <input
            id=${t}
            class="style-input"
            type=${e.inputType??"text"}
            min=${et(o?e.min:void 0)}
            max=${et(o?e.max:void 0)}
            step=${et(o?e.step:void 0)}
            value=${e.defaultValue}
            data-variable=${e.cssVariable}
            data-unit=${et(e.unit)}
            @input=${e.inputType==="range"?this.updateRangeReadout:void 0}
          />
          ${e.inputType==="range"?l`<output class="style-readout" for=${t}
                >${e.defaultValue}${e.unit??""}</output
              >`:m}
        </td>
      </tr>
    `}updateRangeReadout(e){const t=e.currentTarget,o=this.renderRoot.querySelector(`output[for="${CSS.escape(t.id)}"]`);if(!o)return;const i=t.dataset.unit??"";o.textContent=`${t.value}${i}`}applyStyles(){const e=[];this.styleInputs?.forEach(t=>{if(!t.dataset.variable||!t.value)return;const o=t.dataset.unit??"";e.push(`${t.dataset.variable}: ${t.value}${o};`)}),this.dispatchEvent(new CustomEvent("stylesApplied",{detail:{styles:e.join(`
 `)}}))}static get styles(){return[N,b`
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
      `]}};Se([c({type:Object})],Dt.prototype,"styleInputData",2);Se([_e(".style-input")],Dt.prototype,"styleInputs",2);Dt=Se([S("story-styles-settings")],Dt);const vo=(e,t,o)=>{for(const i of t)if(i[0]===e)return(0,i[1])();return o?.()};var di=Object.defineProperty,ci=Object.getOwnPropertyDescriptor,Ce=(e,t,o,i)=>{for(var r=i>1?void 0:i?ci(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=(i?n(t,o,r):n(r))||r);return i&&r&&di(t,o,r),r};let Lt=class extends v{render(){return this.propInputData?l`
      <div class="settings-options">
        <table>
          ${this.propInputData.settings.map(e=>vo(e.inputType,[["radio",()=>this.createRadioPropInput(e)]],()=>this.createDefaultPropInput(e))??m)}
        </table>
        <button @click=${this.applyProps}>Apply</button>
      </div>
    `:m}createDefaultPropInput(e){const t=re(e.label);return l`
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
    `}createRadioPropInput(e){if(e.inputType!=="radio"||!e.radioOptions)return m;const t=re(e.label);return l`
      <tr>
        <td><legend>${e.label}</legend></td>
        <td>
          ${e.radioOptions.map(o=>l`<input
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
    `}applyProps(){const e=[],t=[];this.propInputs?.forEach(o=>{if(!o.dataset.prop||!o.value||o.type==="radio"&&!o.checked)return;const i=o.dataset.prop;let r=o.value;switch(o.dataset.format){case"number":r=parseInt(r);break;case"boolean":r==="true"&&(r=!0),r==="false"&&(r=!1);break}const s=typeof r=="string"?`'${r}'`:r.toString();e.push(`.${i}=\${${s}}`),t.push({propName:i,value:r})}),this.dispatchEvent(new CustomEvent("propsApplied",{detail:{stringifiedProps:e.join(`
  `),appliedProps:t}}))}static get styles(){return[N,b`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }
      `]}};Ce([c({type:Object})],Lt.prototype,"propInputData",2);Ce([_e(".prop-input")],Lt.prototype,"propInputs",2);Lt=Ce([S("story-props-settings")],Lt);var pi=Object.defineProperty,hi=Object.getOwnPropertyDescriptor,k=(e,t,o,i)=>{for(var r=i>1?void 0:i?hi(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=(i?n(t,o,r):n(r))||r);return i&&r&&pi(t,o,r),r};let E=class extends v{constructor(){super(...arguments),this.elementTag="",this.elementClassName="",this.labs=!1,this.detailsVisible=!1,this.shouldShowPropertySettings=!1,this.shouldShowUsageNotes=!1,this.copiedKey=null}render(){return l`
      <div id="container">
        <h2>
          <code>&lt;${this.elementTag}&gt;</code>
          ${V(this.labs,()=>l`<img
                src=${ni}
                alt="Labs icon"
                title="Labs"
                class="labs-icon"
              />`)}
        </h2>
        <h3>Demo</h3>
        <div class="slot-container" style=${et(this.stringifiedStyles)}>
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
      ${V(this.cssCode,()=>l`
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
          ${V(!!this.propInputData,()=>l`
              <story-props-settings
                .propInputData=${this.propInputData}
                @propsApplied=${this.handlePropsApplied}
              ></story-props-settings>
            `)}
          ${V(!this.propInputData&&!this.shouldShowPropertySettings,()=>l`<p class="section-placeholder">No settings to adjust</p>`)}
          <div
            class="slot-container ${this.shouldShowPropertySettings?"":"hidden"}"
            @slotchange=${this.handleSettingsSlotChange}
          >
            <slot name="settings"></slot>
          </div>
        </div>
        <div class="right-col">
          <h3>Styles</h3>
          ${V(!!this.styleInputData,()=>l`
              <story-styles-settings
                .styleInputData=${this.styleInputData}
                @stylesApplied=${this.handleStylesApplied}
              ></story-styles-settings>
            `,()=>l`<p class="section-placeholder">No styles to adjust</p>`)}
        </div>
      </div>
      ${V(this.shouldShowUsageNotes,()=>l` <h3>Usage Notes</h3>`)}
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
}`:""}get modulePath(){return this.labs?`@internetarchive/elements/labs/${this.elementTag}/${this.elementTag}`:`@internetarchive/elements/${this.elementTag}/${this.elementTag}`}handleSettingsSlotChange(e){const t=e.target.assignedElements();this.shouldShowPropertySettings=t.length>0}handleUsageNotesSlotChange(e){const t=e.target.assignedElements();this.shouldShowUsageNotes=t.length>0}handleDemoComponentSlotted(e){const t=e.target.assignedElements()[0];t&&(this.slottedDemoComponent=t)}handleStylesApplied(e){const t=e.detail.styles;t&&(this.stringifiedStyles=t)}handlePropsApplied(e){const t=e.detail.stringifiedProps,o=e.detail.appliedProps;!t||!o||(this.stringifiedProps=t,o.forEach(i=>{this.slottedDemoComponent[i.propName]=i.value}))}static get styles(){return[N,b`
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
      `]}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._copyTimeout)}};k([c({type:String})],E.prototype,"elementTag",2);k([c({type:String})],E.prototype,"elementClassName",2);k([c({type:String})],E.prototype,"customExampleUsage",2);k([c({type:String})],E.prototype,"defaultUsageProps",2);k([c({type:String})],E.prototype,"defaultSlottedContent",2);k([c({type:Object})],E.prototype,"styleInputData",2);k([c({type:Object})],E.prototype,"propInputData",2);k([c({type:Boolean})],E.prototype,"labs",2);k([g()],E.prototype,"detailsVisible",2);k([g()],E.prototype,"stringifiedStyles",2);k([g()],E.prototype,"stringifiedProps",2);k([g()],E.prototype,"shouldShowPropertySettings",2);k([g()],E.prototype,"shouldShowUsageNotes",2);k([g()],E.prototype,"slottedDemoComponent",2);k([g()],E.prototype,"copiedKey",2);E=k([S("story-template")],E);const ui=e=>typeof e!="string"&&"strTag"in e,gi=(e,t,o)=>{let i=e[0];for(let r=1;r<e.length;r++)i+=t[r-1],i+=e[r];return i};const fi=(e=>ui(e)?gi(e.strings,e.values):e);let P=fi;class mi{constructor(){this.settled=!1,this.promise=new Promise((t,o)=>{this._resolve=t,this._reject=o})}resolve(t){this.settled=!0,this._resolve(t)}reject(t){this.settled=!0,this._reject(t)}}for(let e=0;e<256;e++)(e>>4&15).toString(16)+(e&15).toString(16);let bi=new mi;bi.resolve();var yi=Object.defineProperty,vi=Object.getOwnPropertyDescriptor,mt=(e,t,o,i)=>{for(var r=i>1?void 0:i?vi(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=(i?n(t,o,r):n(r))||r);return i&&r&&yi(t,o,r),r};let rt=class extends v{constructor(){super(...arguments),this.loadingTitle=P("Loading..."),this.successTitle=P("Success"),this.errorTitle=P("Error"),this.loadingStyle="ring-dots",this.mode="loading"}render(){return l`${vo(this.mode,[["ready",()=>this.placeholderTemplate],["loading",()=>this.loadingIndicatorTemplate],["success",()=>this.successIndicatorTemplate],["error",()=>this.errorIndicatorTemplate]])}`}get placeholderTemplate(){return l`<div class="placeholder"></div>`}get loadingIndicatorTemplate(){return l`
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
    `}get shouldShowLoadingDots(){return this.loadingStyle!=="ring"}static get styles(){return[N,b`
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
      `]}};mt([c({type:String})],rt.prototype,"loadingTitle",2);mt([c({type:String})],rt.prototype,"successTitle",2);mt([c({type:String})],rt.prototype,"errorTitle",2);mt([c({type:String})],rt.prototype,"loadingStyle",2);mt([c({type:String})],rt.prototype,"mode",2);rt=mt([S("ia-status-indicator")],rt);var wi=Object.defineProperty,$i=Object.getOwnPropertyDescriptor,J=(e,t,o,i)=>{for(var r=i>1?void 0:i?$i(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=(i?n(t,o,r):n(r))||r);return i&&r&&wi(t,o,r),r};let z=class extends v{constructor(){super(...arguments),this.mode="primary",this.loading=!1,this.disabled=!1,this.loadingText="",this.type="button",this.openLinksNewTab=!1}render(){return l`
      ${this.href?l`<a
            href=${this.href}
            target=${this.openLinksNewTab?"_blank":"_self"}
            >${this.buttonTemplate}</a
          >`:this.buttonTemplate}
      <slot name="hidden-button"></slot>
    `}willUpdate(e){e.has("type")&&this.setButtonTypeEmulation()}get buttonTemplate(){return l`
      <button
        part="button"
        class=${this.mode}
        ?disabled=${this.disabled||this.loading}
      >
        ${this.buttonTextTemplate}
      </button>
    `}get buttonTextTemplate(){return this.loading?this.loadingStateTemplate:l`<slot></slot>`}get loadingStateTemplate(){return l`
      <span class="loading-indicator" alt="Loading indicator">
        <ia-status-indicator mode="loading"></ia-status-indicator> ${P(this.loadingText)}
      </span>
    `}setButtonTypeEmulation(){const e=this.querySelector("input.hidden-button");if(e){e.type=this.type;return}this.addHiddenButton(),this.addEventListener("click",this.handleComponentClick)}handleComponentClick(e){if(this.type==="button"||e instanceof CustomEvent&&e.detail.formActionsInProgress)return;this.querySelector("input.hidden-button").dispatchEvent(new PointerEvent("click"))}addHiddenButton(){this.type!=="button"&&yo(l`<input
        type=${this.type}
        class="hidden-button"
        style="display:none"
        slot="hidden-button"
        @click=${e=>this.handleFormActions(e)}
      />`,this)}handleFormActions(e){e.stopPropagation(),e.isTrusted&&this.dispatchEvent(new CustomEvent("click",{detail:{formActionsInProgress:!0}}))}static get styles(){return[N,b`
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
      `]}};J([c({type:String})],z.prototype,"mode",2);J([c({type:Boolean})],z.prototype,"loading",2);J([c({type:Boolean})],z.prototype,"disabled",2);J([c({type:String})],z.prototype,"loadingText",2);J([c({type:String,reflect:!0})],z.prototype,"type",2);J([c({type:String})],z.prototype,"href",2);J([c({type:Boolean})],z.prototype,"openLinksNewTab",2);z=J([S("ia-button")],z);const Me=Object.freeze(Object.defineProperty({__proto__:null,get IAButton(){return z}},Symbol.toStringTag,{value:"Module"}));var xi=Object.getOwnPropertyDescriptor,_i=(e,t,o,i)=>{for(var r=i>1?void 0:i?xi(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=n(r)||r);return r};const Si=[{label:"Mode",propertyName:"mode",defaultValue:"primary",inputType:"radio",radioOptions:["primary","secondary","danger","warning","disabled","transparent","custom","link","danger-link"]},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Loading",propertyName:"loading",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Loading text",propertyName:"loadingText",defaultValue:"",inputType:"text"},{label:"Type",propertyName:"type",defaultValue:"button",inputType:"radio",radioOptions:["button","submit","reset"]},{label:"Link to attach to button",propertyName:"href",defaultValue:"",inputType:"text"},{label:"Open link in new tab",propertyName:"openLinksNewTab",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}],Ci=[{label:"Button padding",cssVariable:"--ia-theme-button-padding",defaultValue:"0 1.875rem",inputType:"text"},{label:"Button width",cssVariable:"--ia-theme-button-width",defaultValue:"fit-content",inputType:"text"},{label:"Button height",cssVariable:"--ia-theme-button-height",defaultValue:"2.25rem",inputType:"text"},{label:"Button border width",cssVariable:"--ia-theme-button-border-width",defaultValue:"1px",inputType:"text"},{label:"Font",cssVariable:"--ia-theme-base-font-family",defaultValue:"'Helvetica Neue', Helvetica, Arial, sans-serif",inputType:"text"},{label:"Transition",cssVariable:"--ia-button-transition",defaultValue:"all 0.1s ease 0s",inputType:"text"},{label:"Text color (primary)",cssVariable:"--ia-theme-primary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (primary)",cssVariable:"--ia-theme-primary-cta-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (primary)",cssVariable:"--ia-theme-primary-cta-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Text color (secondary)",cssVariable:"--ia-theme-secondary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (secondary)",cssVariable:"--ia-theme-secondary-cta-fill",defaultValue:"#333333",inputType:"color"},{label:"Border color (secondary)",cssVariable:"--ia-theme-secondary-cta-border",defaultValue:"#666666",inputType:"color"},{label:"Text color (danger)",cssVariable:"--ia-theme-danger-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (danger)",cssVariable:"--ia-theme-danger-cta-fill",defaultValue:"#d9534f",inputType:"color"},{label:"Border color (danger)",cssVariable:"--ia-theme-danger-cta-border",defaultValue:"#d43f3a",inputType:"color"},{label:"Text color (warning)",cssVariable:"--ia-theme-warning-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (warning)",cssVariable:"--ia-theme-warning-cta-fill",defaultValue:"#ee8950",inputType:"color"},{label:"Border color (warning)",cssVariable:"--ia-theme-warning-cta-border",defaultValue:"#ec7939",inputType:"color"},{label:"Text color (disabled)",cssVariable:"--ia-theme-disabled-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (disabled)",cssVariable:"--ia-theme-disabled-cta-fill",defaultValue:"#666666",inputType:"color"},{label:"Border color (disabled)",cssVariable:"--ia-theme-disabled-cta-border",defaultValue:"#999999",inputType:"color"},{label:"Text color (custom)",cssVariable:"--ia-button-custom-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (custom)",cssVariable:"--ia-button-custom-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (custom)",cssVariable:"--ia-button-custom-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Text color (custom, on hover)",cssVariable:"--ia-button-custom-active-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (custom, on hover)",cssVariable:"--ia-button-custom-active-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (custom, on hover)",cssVariable:"--ia-button-custom-active-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Link color",cssVariable:"--ia-theme-link-color",defaultValue:"#4b64ff",inputType:"color"},{label:"Danger color",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}];let se=class extends v{render(){return l`
      <story-template
        elementTag="ia-button"
        elementClassName="IAButton"
        .defaultUsageProps=${"@click=${() => alert('Button clicked!')}"}
        .defaultSlottedContent=${"Click Me"}
        .styleInputData=${{settings:Ci}}
        .propInputData=${{settings:Si}}
      >
        <ia-button slot="demo" @click=${()=>alert("Button clicked!")}>
          Click Me
        </ia-button>
      </story-template>
    `}};se=_i([S("ia-button-story")],se);const Ti=Object.freeze(Object.defineProperty({__proto__:null,get IAButtonStory(){return se}},Symbol.toStringTag,{value:"Module"})),wo=JSON.parse(`[{"name":"Afghanistan","flag":"🇦🇫"},{"name":"Albania","flag":"🇦🇱"},{"name":"Algeria","flag":"🇩🇿"},{"name":"Andorra","flag":"🇦🇩"},{"name":"Angola","flag":"🇦🇴"},{"name":"Antigua and Barbuda","flag":"🇦🇬"},{"name":"Argentina","flag":"🇦🇷"},{"name":"Armenia","flag":"🇦🇲"},{"name":"Aruba","flag":"🇦🇼"},{"name":"Australia","flag":"🇦🇺"},{"name":"Austria","flag":"🇦🇹"},{"name":"Azerbaijan","flag":"🇦🇿"},{"name":"Bahamas","flag":"🇧🇸"},{"name":"Bahrain","flag":"🇧🇭"},{"name":"Bangladesh","flag":"🇧🇩"},{"name":"Barbados","flag":"🇧🇧"},{"name":"Belarus","flag":"🇧🇾"},{"name":"Belgium","flag":"🇧🇪"},{"name":"Belize","flag":"🇧🇿"},{"name":"Benin","flag":"🇧🇯"},{"name":"Bhutan","flag":"🇧🇹"},{"name":"Bolivia","flag":"🇧🇴"},{"name":"Bosnia and Herzegovina","flag":"🇧🇦"},{"name":"Botswana","flag":"🇧🇼"},{"name":"Brazil","flag":"🇧🇷"},{"name":"Brunei","flag":"🇧🇳"},{"name":"Bulgaria","flag":"🇧🇬"},{"name":"Burkina Faso","flag":"🇧🇫"},{"name":"Burundi","flag":"🇧🇮"},{"name":"Cabo Verde","flag":"🇨🇻"},{"name":"Cambodia","flag":"🇰🇭"},{"name":"Cameroon","flag":"🇨🇲"},{"name":"Canada","flag":"🇨🇦"},{"name":"Central African Republic","flag":"🇨🇫"},{"name":"Chad","flag":"🇹🇩"},{"name":"Chile","flag":"🇨🇱"},{"name":"China","flag":"🇨🇳"},{"name":"Colombia","flag":"🇨🇴"},{"name":"Comoros","flag":"🇰🇲"},{"name":"Cook Islands","flag":"🇨🇰"},{"name":"Costa Rica","flag":"🇨🇷"},{"name":"Côte d'Ivoire","flag":"🇨🇮"},{"name":"Croatia","flag":"🇭🇷"},{"name":"Cuba","flag":"🇨🇺"},{"name":"Cyprus","flag":"🇨🇾"},{"name":"Czechia","flag":"🇨🇿"},{"name":"Democratic Republic of the Congo","flag":"🇨🇩"},{"name":"Denmark","flag":"🇩🇰"},{"name":"Djibouti","flag":"🇩🇯"},{"name":"Dominica","flag":"🇩🇲"},{"name":"Dominican Republic","flag":"🇩🇴"},{"name":"Ecuador","flag":"🇪🇨"},{"name":"Egypt","flag":"🇪🇬"},{"name":"El Salvador","flag":"🇸🇻"},{"name":"Equatorial Guinea","flag":"🇬🇶"},{"name":"Eritrea","flag":"🇪🇷"},{"name":"Estonia","flag":"🇪🇪"},{"name":"Eswatini","flag":"🇸🇿"},{"name":"Ethiopia","flag":"🇪🇹"},{"name":"Fiji","flag":"🇫🇯"},{"name":"Finland","flag":"🇫🇮"},{"name":"France","flag":"🇫🇷"},{"name":"Gabon","flag":"🇬🇦"},{"name":"Gambia","flag":"🇬🇲"},{"name":"Georgia","flag":"🇬🇪"},{"name":"Germany","flag":"🇩🇪"},{"name":"Ghana","flag":"🇬🇭"},{"name":"Greece","flag":"🇬🇷"},{"name":"Grenada","flag":"🇬🇩"},{"name":"Guatemala","flag":"🇬🇹"},{"name":"Guinea","flag":"🇬🇳"},{"name":"Guinea-Bissau","flag":"🇬🇼"},{"name":"Guyana","flag":"🇬🇾"},{"name":"Haiti","flag":"🇭🇹"},{"name":"Honduras","flag":"🇭🇳"},{"name":"Hungary","flag":"🇭🇺"},{"name":"Iceland","flag":"🇮🇸"},{"name":"India","flag":"🇮🇳"},{"name":"Indonesia","flag":"🇮🇩"},{"name":"Iran","flag":"🇮🇷"},{"name":"Iraq","flag":"🇮🇶"},{"name":"Ireland","flag":"🇮🇪"},{"name":"Israel","flag":"🇮🇱"},{"name":"Italy","flag":"🇮🇹"},{"name":"Jamaica","flag":"🇯🇲"},{"name":"Japan","flag":"🇯🇵"},{"name":"Jordan","flag":"🇯🇴"},{"name":"Kazakhstan","flag":"🇰🇿"},{"name":"Kenya","flag":"🇰🇪"},{"name":"Kiribati","flag":"🇰🇮"},{"name":"Kosovo","flag":"🇽🇰"},{"name":"Kuwait","flag":"🇰🇼"},{"name":"Kyrgyzstan","flag":"🇰🇬"},{"name":"Laos","flag":"🇱🇦"},{"name":"Latvia","flag":"🇱🇻"},{"name":"Lebanon","flag":"🇱🇧"},{"name":"Lesotho","flag":"🇱🇸"},{"name":"Liberia","flag":"🇱🇷"},{"name":"Libya","flag":"🇱🇾"},{"name":"Liechtenstein","flag":"🇱🇮"},{"name":"Lithuania","flag":"🇱🇹"},{"name":"Luxembourg","flag":"🇱🇺"},{"name":"Madagascar","flag":"🇲🇬"},{"name":"Malawi","flag":"🇲🇼"},{"name":"Malaysia","flag":"🇲🇾"},{"name":"Maldives","flag":"🇲🇻"},{"name":"Mali","flag":"🇲🇱"},{"name":"Malta","flag":"🇲🇹"},{"name":"Marshall Islands","flag":"🇲🇭"},{"name":"Mauritania","flag":"🇲🇷"},{"name":"Mauritius","flag":"🇲🇺"},{"name":"Mexico","flag":"🇲🇽"},{"name":"Micronesia","flag":"🇫🇲"},{"name":"Moldova","flag":"🇲🇩"},{"name":"Monaco","flag":"🇲🇨"},{"name":"Mongolia","flag":"🇲🇳"},{"name":"Montenegro","flag":"🇲🇪"},{"name":"Morocco","flag":"🇲🇦"},{"name":"Mozambique","flag":"🇲🇿"},{"name":"Myanmar","flag":"🇲🇲"},{"name":"Namibia","flag":"🇳🇦"},{"name":"Nauru","flag":"🇳🇷"},{"name":"Nepal","flag":"🇳🇵"},{"name":"Netherlands","flag":"🇳🇱"},{"name":"New Zealand","flag":"🇳🇿"},{"name":"Nicaragua","flag":"🇳🇮"},{"name":"Niue","flag":"🇳🇺"},{"name":"Niger","flag":"🇳🇪"},{"name":"Nigeria","flag":"🇳🇬"},{"name":"North Korea","flag":"🇰🇵"},{"name":"North Macedonia","flag":"🇲🇰"},{"name":"Norway","flag":"🇳🇴"},{"name":"Oman","flag":"🇴🇲"},{"name":"Pakistan","flag":"🇵🇰"},{"name":"Palau","flag":"🇵🇼"},{"name":"Palestine","flag":"🇵🇸"},{"name":"Panama","flag":"🇵🇦"},{"name":"Papua New Guinea","flag":"🇵🇬"},{"name":"Paraguay","flag":"🇵🇾"},{"name":"Peru","flag":"🇵🇪"},{"name":"Philippines","flag":"🇵🇭"},{"name":"Poland","flag":"🇵🇱"},{"name":"Portugal","flag":"🇵🇹"},{"name":"Qatar","flag":"🇶🇦"},{"name":"Republic of the Congo","flag":"🇨🇬"},{"name":"Romania","flag":"🇷🇴"},{"name":"Russia","flag":"🇷🇺"},{"name":"Rwanda","flag":"🇷🇼"},{"name":"Saint Kitts and Nevis","flag":"🇰🇳"},{"name":"Saint Lucia","flag":"🇱🇨"},{"name":"Saint Vincent and the Grenadines","flag":"🇻🇨"},{"name":"Samoa","flag":"🇼🇸"},{"name":"San Marino","flag":"🇸🇲"},{"name":"Sao Tome and Principe","flag":"🇸🇹"},{"name":"Saudi Arabia","flag":"🇸🇦"},{"name":"Senegal","flag":"🇸🇳"},{"name":"Serbia","flag":"🇷🇸"},{"name":"Seychelles","flag":"🇸🇨"},{"name":"Sierra Leone","flag":"🇸🇱"},{"name":"Singapore","flag":"🇸🇬"},{"name":"Slovakia","flag":"🇸🇰"},{"name":"Slovenia","flag":"🇸🇮"},{"name":"Solomon Islands","flag":"🇸🇧"},{"name":"Somalia","flag":"🇸🇴"},{"name":"South Africa","flag":"🇿🇦"},{"name":"South Korea","flag":"🇰🇷"},{"name":"South Sudan","flag":"🇸🇸"},{"name":"Spain","flag":"🇪🇸"},{"name":"Sri Lanka","flag":"🇱🇰"},{"name":"Sudan","flag":"🇸🇩"},{"name":"Suriname","flag":"🇸🇷"},{"name":"Sweden","flag":"🇸🇪"},{"name":"Switzerland","flag":"🇨🇭"},{"name":"Syria","flag":"🇸🇾"},{"name":"Taiwan","flag":"🇹🇼"},{"name":"Tajikistan","flag":"🇹🇯"},{"name":"Tanzania","flag":"🇹🇿"},{"name":"Thailand","flag":"🇹🇭"},{"name":"Timor-Leste","flag":"🇹🇱"},{"name":"Togo","flag":"🇹🇬"},{"name":"Tonga","flag":"🇹🇴"},{"name":"Trinidad and Tobago","flag":"🇹🇹"},{"name":"Tunisia","flag":"🇹🇳"},{"name":"Turkey","flag":"🇹🇷"},{"name":"Turkmenistan","flag":"🇹🇲"},{"name":"Tuvalu","flag":"🇹🇻"},{"name":"Uganda","flag":"🇺🇬"},{"name":"Ukraine","flag":"🇺🇦"},{"name":"United Arab Emirates","flag":"🇦🇪"},{"name":"United Kingdom","flag":"🇬🇧"},{"name":"United States","flag":"🇺🇸"},{"name":"Uruguay","flag":"🇺🇾"},{"name":"Uzbekistan","flag":"🇺🇿"},{"name":"Vanuatu","flag":"🇻🇺"},{"name":"Vatican City","flag":"🇻🇦"},{"name":"Venezuela","flag":"🇻🇪"},{"name":"Vietnam","flag":"🇻🇳"},{"name":"Yemen","flag":"🇾🇪"},{"name":"Zambia","flag":"🇿🇲"},{"name":"Zimbabwe","flag":"🇿🇼"}]`);const Gt=Ht(class extends Ft{constructor(e){if(super(e),e.type!==K.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((i=>i!==""))));for(const i in t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}const o=e.element.classList;for(const i of this.st)i in t||(o.remove(i),this.st.delete(i));for(const i in t){const r=!!t[i];r===this.st.has(i)||this.nt?.has(i)||(r?(o.add(i),this.st.add(i)):(o.remove(i),this.st.delete(i)))}return L}});const Oi=e=>e.strings===void 0,Ai={},Ei=(e,t=Ai)=>e._$AH=t;const ki=Ht(class extends Ft{constructor(e){if(super(e),e.type!==K.PROPERTY&&e.type!==K.ATTRIBUTE&&e.type!==K.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Oi(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===L||t===m)return t;const o=e.element,i=e.name;if(e.type===K.PROPERTY){if(t===o[i])return L}else if(e.type===K.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(i))return L}else if(e.type===K.ATTRIBUTE&&o.getAttribute(i)===t+"")return L;return Ei(e),t}});function Pi(e,t){return t.some(o=>e.has(o))}function Bi(e,t){const o=[...e],i=[...t],r=o.length,s=i.length;if(r===0)return!0;let n=0,d=0;for(;d<s;){if(i[d]===o[n]&&(n+=1),n>=r)return!0;d+=1}return!1}const Ii="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501%202.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131%202.7226499%201.81402515z'%20%3e%3c/path%3e%3c/svg%3e",Vi="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499%203.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501%202.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131%202.7226499-1.81402514z'%20%3e%3c/path%3e%3c/svg%3e",Di="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m50%200c27.6142375%200%2050%2022.3857625%2050%2050s-22.3857625%2050-50%2050-50-22.3857625-50-50%2022.3857625-50%2050-50zm23.8159475%2026.1840525c-1.4033215-1.4033215-3.5816761-1.5592461-5.1572272-.4677738l-.5598841.4677738-18.0988362%2018.0989475-18.0988362-18.0989475-.5598841-.4677738c-1.5755511-1.0914723-3.7539057-.9355477-5.1572272.4677738-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113l18.0989475%2018.0988362-18.0989475%2018.0988362c-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113%201.4033215%201.4033215%203.5816761%201.5592461%205.1572272.4677738l.5598841-.4677738%2018.0988362-18.0989475%2018.0988362%2018.0989475.5598841.4677738c1.5755511%201.0914723%203.7539057.9355477%205.1572272-.4677738%201.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113l-18.0989475-18.0988362%2018.0989475-18.0988362c1.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113z'%20fill-rule='evenodd'%20%3e%3c/path%3e%3c/svg%3e";var Li=Object.defineProperty,Ri=Object.getOwnPropertyDescriptor,T=(e,t,o,i)=>{for(var r=i>1?void 0:i?Ri(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=(i?n(t,o,r):n(r))||r);return i&&r&&Li(t,o,r),r};const Ni={all:()=>!0,prefix:(e,t)=>t.startsWith(e),suffix:(e,t)=>t.endsWith(e),substring:(e,t)=>t.includes(e),subsequence:Bi},ji="list",Mi="substring",Ui=e=>e,zi=e=>e.toLocaleLowerCase();let x=class extends v{constructor(){super(),this.options=[],this.behavior=ji,this.maxAutocompleteEntries=Number.POSITIVE_INFINITY,this.filter=Mi,this.caseSensitive=!1,this.sort=!1,this.wrapArrowKeys=!1,this.stayOpen=!1,this.clearable=!1,this.open=!1,this.disabled=!1,this.required=!1,this.value=null,this.hasFocus=!1,this.highlightedOption=null,this.enteredText="",this.filterText="",this.losingFocus=!1,this.optionsByID=new Map,this.optionFilteringValues=new Map,this.optionsRespectingSortFlag=[],this.filteredOptions=[],this.internals=this.attachInternals()}render(){const e=Gt({disabled:this.disabled,focused:this.hasFocus});return l`
      <div id="container" part="container">
        ${this.labelTemplate}
        <div id="main-widget-row" class=${e} part="combo-box">
          ${this.textInputTemplate}
          ${this.clearable?this.clearButtonTemplate:m}
          ${this.caretButtonTemplate}
        </div>
        ${this.optionsListTemplate}
      </div>
    `}willUpdate(e){(e.has("options")||e.has("caseSensitive"))&&this.rebuildOptionFilteringValues(),e.has("options")&&this.rebuildOptionIDMap(),(e.has("options")||e.has("sort"))&&this.rebuildSortedOptions(),Pi(e,["options","behavior","maxAutocompleteEntries","filter","filterText","caseSensitive","sort"])&&this.rebuildFilteredOptions(),e.has("open")&&(this.open?this.value&&this.setHighlightedOption(this.selectedOption):this.setHighlightedOption(null)),e.has("required")&&this.updateFormValidity()}updated(e){e.has("value")&&this.handleValueChanged(),e.has("options")&&this.behavior!=="freeform"&&!this.selectedOption&&this.clearSelectedOption(),e.has("open")&&(this.open?(this.positionOptionsMenu(),this.optionsList?.showPopover?.(),this.optionsList?.classList.add("visible")):(this.optionsList?.hidePopover?.(),this.optionsList?.classList.remove("visible")))}get labelTemplate(){return l`
      <label id="label" for="text-input" part="label">
        <slot name="label"></slot>
      </label>
    `}get textInputTemplate(){const e=Gt({"clear-padding":this.clearable&&!this.shouldShowClearButton});return l`
      <input
        type="text"
        id="text-input"
        class=${e}
        .value=${ki(this.enteredText)}
        placeholder=${et(this.placeholder)}
        part="text-input"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-controls="options-list"
        aria-expanded=${this.open}
        aria-activedescendant=${et(this.highlightedOption?.id)}
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
        <span class="sr-only">${P("Clear")}</span>
        <slot name="clear-button">
          <img
            class="icon clear-icon"
            part="icon clear-icon"
            src=${Di}
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
          src=${Ii}
          alt=""
          aria-hidden="true"
        />
      </slot>
      <slot name="caret-open" ?hidden=${!this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${Vi}
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
        <span class="sr-only">${P("Toggle options")}</span>
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
        ${V(this.open,()=>this.optionTemplates)}
        <slot name="options-list-bottom"></slot>
      </ul>
    `}get optionTemplates(){return this.filteredOptions.length===0&&this.maxAutocompleteEntries>0?[this.emptyOptionsTemplate]:this.filteredOptions.map(e=>{const t=e===this.highlightedOption,o=Gt({option:!0,highlight:t});return l`
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
      `})}get emptyOptionsTemplate(){return l`
      <li id="empty-options" part="empty-options">
        <slot name="empty-options">${P("No matching options")}</slot>
      </li>
    `}handleOptionPointerEnter(e){this.handleOptionPointerMove(e)}handleOptionPointerMove(e){const t=e.currentTarget,o=this.getOptionFor(t.id);o&&this.setHighlightedOption(o)}handleOptionClick(e){const t=e.currentTarget,o=this.getOptionFor(t.id);o&&(this.setSelectedOption(o.id),this.stayOpen||this.closeOptionsMenu())}handleComboBoxKeyDown(e){switch(e.key){case"Enter":this.handleEnterPressed();break;case"Escape":this.handleEscapePressed();break;case"ArrowUp":e.altKey?this.handleAltUpArrowPressed():this.handleUpArrowPressed();break;case"ArrowDown":e.altKey?this.handleAltDownArrowPressed():this.handleDownArrowPressed();break;case"Tab":this.handleTabPressed();return;case" ":this.handleSpacePressed(e);return;default:return}e.stopPropagation(),e.preventDefault()}async handleTextBoxInput(){const e=this.textInput?.value??"";this.enteredText=e,this.setFilterText(e),this.openOptionsMenu(),await this.updateComplete,this.highlightFirstOption()}handleEnterPressed(){if(!this.open){this.openOptionsMenu();return}this.highlightedOption?this.setSelectedOption(this.highlightedOption.id):this.behavior==="freeform"&&this.setValue(this.enteredText),this.stayOpen||(this.open=!1)}handleEscapePressed(){if(this.open){this.closeOptionsMenu();return}this.clearSelectedOption()}handleUpArrowPressed(){this.open||this.openOptionsMenu(),this.highlightPreviousOption()}handleDownArrowPressed(){this.open||this.openOptionsMenu(),this.highlightNextOption()}handleAltUpArrowPressed(){this.closeOptionsMenu()}handleAltDownArrowPressed(){this.openOptionsMenu()}handleTabPressed(){this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1))}handleSpacePressed(e){this.behavior==="select-only"&&(this.open?this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1)):this.openOptionsMenu(),e.stopPropagation(),e.preventDefault())}handleComboBoxClick(){this.toggleOptionsMenu()}handleClearButtonClick(){this.clearSelectedOption(),this.textInput?.focus(),this.openOptionsMenu()}handleFocus(){this.behavior!=="select-only"&&this.textInput?.focus(),this.hasFocus=!0,this.losingFocus=!1}handleBlur(){this.hasFocus=!1,this.losingFocus=!0,setTimeout(()=>{this.losingFocus&&!this.shadowRoot?.activeElement&&(this.losingFocus=!1,this.closeOptionsMenu(),this.behavior==="list"?this.setTextValue(this.selectedOption?.text??"",!1):this.behavior==="freeform"&&(this.enteredText||this.value)&&this.setValue(this.enteredText))},0)}handleValueChanged(){if(this.value==null){this.enteredText&&this.setTextValue("",!1);return}const e=this.getOptionFor(this.value);if(this.behavior==="freeform"){const t=e?.text??this.value;t!==this.enteredText&&this.setTextValue(t);return}if(!e){this.clearSelectedOption();return}this.enteredText!==e.text&&(this.setTextValue(e.text,!1),this.setFilterText(""))}highlightFirstOption(){this.setHighlightedOption(this.firstFilteredOption)}highlightLastOption(){this.setHighlightedOption(this.lastFilteredOption)}highlightPreviousOption(){const{filteredOptions:e,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightLastOption();return}const{highlightedIndex:o}=this,i=this.wrapArrowKeys&&o===0?t:Math.max(o-1,0);this.setHighlightedOption(e[i])}highlightNextOption(){const{filteredOptions:e,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightFirstOption();return}const{highlightedIndex:o}=this,i=this.wrapArrowKeys&&o===t?0:Math.min(o+1,t);this.setHighlightedOption(e[i])}async setHighlightedOption(e){this.highlightedOption=e,await this.updateComplete;const{optionsList:t,highlightedElement:o}=this;if(!o||!t)return;const i=o.getBoundingClientRect(),r=t.getBoundingClientRect();(i.top<r.top||i.bottom>r.bottom)&&o.scrollIntoView({block:"nearest"})}setSelectedOption(e){const t=this.getOptionFor(e);if(!t)throw new RangeError("Unknown option ID");const o=this.value;this.value=t.id,this.internals.setFormValue(this.value),this.setTextValue(t.text,!1),this.setFilterText(""),this.value!==o&&this.emitChangeEvent(),t.onSelected?.(t)}clearSelectedOption(){const e=this.value;this.value=null,this.internals.setFormValue(this.value),this.setTextValue(""),this.value!==e&&this.emitChangeEvent()}setValue(e){if(this.behavior==="freeform"){const t=this.value;this.value=e,this.internals.setFormValue(this.value),this.setTextValue(e),this.value!==t&&this.emitChangeEvent()}else this.setSelectedOption(e)}setTextValue(e,t=!0){this.textInput&&(this.textInput.value=e),this.enteredText=e,t&&this.setFilterText(e)}setFilterText(e){const{caseTransform:t}=this;this.filterText=t(e)}openOptionsMenu(){this.open=!0,this.emitToggleEvent()}closeOptionsMenu(){this.open=!1,this.emitToggleEvent()}toggleOptionsMenu(){this.open=!this.open,this.emitToggleEvent()}updateFormValidity(){this.required&&!this.value?this.internals.setValidity({valueMissing:!0},P("A value is required")):this.internals.setValidity({})}emitChangeEvent(){this.dispatchEvent(new CustomEvent("change",{detail:this.value}))}emitToggleEvent(){this.dispatchEvent(new CustomEvent("toggle",{detail:this.open}))}get isEmpty(){return!this.selectedOption&&!this.enteredText}get shouldShowClearButton(){return this.clearable&&!this.disabled&&!this.isEmpty}positionOptionsMenu(){const{mainWidgetRow:e,optionsList:t}=this;if(!e||!t)return;const o=e.getBoundingClientRect(),{innerHeight:i,scrollX:r,scrollY:s}=window,n=o.top,d=i-o.bottom,a="var(--combo-box-list-max-height--)",p={top:`${o.bottom+s}px`,left:`${o.left+r}px`,width:`var(--combo-box-list-width--, ${o.width}px)`,maxHeight:`min(${a}, ${d}px)`};Object.assign(t.style,p),setTimeout(()=>{const h=t.getBoundingClientRect().bottom>=i,f=n>d;h&&f&&(t.style.top="auto",t.style.bottom=`${i-o.top-s}px`,t.style.maxHeight=`min(${a}, ${n}px)`)},0)}get caseTransform(){return this.caseSensitive?Ui:zi}getOptionFor(e){return this.optionsByID.get(e)??null}rebuildOptionIDMap(){this.optionsByID.clear();for(const e of this.options)this.optionsByID.set(e.id,e)}rebuildSortedOptions(){this.sort?this.optionsRespectingSortFlag=[...this.options].sort((e,t)=>{const o=this.optionFilteringValues.get(e),i=this.optionFilteringValues.get(t);return o.localeCompare(i)}):this.optionsRespectingSortFlag=this.options}rebuildOptionFilteringValues(){this.optionFilteringValues.clear();const{caseTransform:e}=this;for(const t of this.options){const o=e(t.text);this.optionFilteringValues.set(t,o)}}rebuildFilteredOptions(){const e=this.behavior==="select-only"?"all":this.filter,t=typeof e=="string"?Ni[e]:e,o=this.optionsRespectingSortFlag.filter(i=>{const r=this.optionFilteringValues.get(i);return r?t(this.filterText,r,i):!1}).slice(0,this.maxAutocompleteEntries);this.filteredOptions=o}get firstFilteredOption(){return this.filteredOptions[0]??null}get lastFilteredOption(){return this.filteredOptions[this.lastFilteredIndex]??null}get lastFilteredIndex(){return this.filteredOptions.length-1}get selectedOption(){return this.value==null?null:this.getOptionFor(this.value)}get highlightedIndex(){return this.highlightedOption?this.filteredOptions.indexOf(this.highlightedOption):-1}get highlightedElement(){return this.highlightedOption?this.shadowRoot.getElementById(this.highlightedOption.id):null}static get styles(){const e=b`
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
    `;return[N,e]}};x.formAssociated=!0;x.shadowRootOptions={...v.shadowRootOptions,delegatesFocus:!0};T([c({type:Array})],x.prototype,"options",2);T([c({type:String})],x.prototype,"placeholder",2);T([c({type:String})],x.prototype,"behavior",2);T([c({type:Number,attribute:"max-autocomplete-entries"})],x.prototype,"maxAutocompleteEntries",2);T([c({type:String})],x.prototype,"filter",2);T([c({type:Boolean,reflect:!0,attribute:"case-sensitive"})],x.prototype,"caseSensitive",2);T([c({type:Boolean,reflect:!0})],x.prototype,"sort",2);T([c({type:Boolean,reflect:!0,attribute:"wrap-arrow-keys"})],x.prototype,"wrapArrowKeys",2);T([c({type:Boolean,reflect:!0,attribute:"stay-open"})],x.prototype,"stayOpen",2);T([c({type:Boolean,reflect:!0})],x.prototype,"clearable",2);T([c({type:Boolean,reflect:!0})],x.prototype,"open",2);T([c({type:Boolean,reflect:!0})],x.prototype,"disabled",2);T([c({type:Boolean,reflect:!0})],x.prototype,"required",2);T([c({type:String})],x.prototype,"value",2);T([g()],x.prototype,"hasFocus",2);T([g()],x.prototype,"highlightedOption",2);T([g()],x.prototype,"enteredText",2);T([g()],x.prototype,"filterText",2);T([y("#main-widget-row")],x.prototype,"mainWidgetRow",2);T([y("#text-input")],x.prototype,"textInput",2);T([y("#options-list")],x.prototype,"optionsList",2);x=T([S("ia-combo-box")],x);var Hi=Object.defineProperty,Fi=Object.getOwnPropertyDescriptor,_=(e,t,o,i)=>{for(var r=i>1?void 0:i?Fi(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=(i?n(t,o,r):n(r))||r);return i&&r&&Hi(t,o,r),r};const qi=[{label:"Width",cssVariable:"--ia-theme-combo-box-width",defaultValue:"250px",inputType:"text"},{label:"Padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown width",cssVariable:"--combo-box-list-width",defaultValue:"",inputType:"text"},{label:"Dropdown max height",cssVariable:"--combo-box-list-max-height",defaultValue:"250px",inputType:"text"},{label:"Dropdown fade duration",cssVariable:"--combo-box-list-fade-duration",defaultValue:125,inputType:"range",min:0,max:1e3,step:25,unit:"ms"}],$o=[{id:"red",text:"Red"},{id:"orange",text:"Orange"},{id:"yellow",text:"Yellow"},{id:"green",text:"Green"},{id:"blue",text:"Blue"},{id:"indigo",text:"Indigo"},{id:"violet",text:"Violet"}],Ki=$o.map(e=>({...e,content:l` <span style="display: flex; align-items: center">
      <span style="flex: 1">${e.text}</span>
      <div style="width: 15px; height: 15px; background:${e.id}"></div>
    </span>`})),Ue=wo.map(e=>({id:e.name,text:e.name})),Wi=wo.map(e=>({id:e.name,text:e.name,content:l`<span>${e.flag}</span>&nbsp;<span>${e.name}</span>`})),Gi="list",Zi="Choices",ze="Select an option...",He=50,Yi="substring";let $=class extends v{constructor(){super(...arguments),this.options=Ue,this.behavior=Gi,this.label=Zi,this.placeholder=ze,this.maxAutocompleteEntries=He,this.filterFn=Yi,this.caseSensitive=!1,this.shouldSort=!1,this.wrapArrowKeys=!0,this.clearable=!0,this.disabled=!1,this.announcerText=""}render(){return l`
      <story-template
        elementTag="ia-combo-box"
        elementClassName="IAComboBox"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:qi}}
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
                  value=${ze}
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
                  value=${He}
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
        ${Object.entries(r).map(([n,d])=>d?d===!0?n:d?`${n}=${d}`:"":"").join(`
  `)}
      >
        <span slot="label">${this.label}</span>
      </ia-combo-box>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(e){e.preventDefault(),this.updateOptions(),this.behavior=this.behaviorSelect.value,this.label=this.labelInput.value,this.placeholder=this.placeholderInput.value,this.maxAutocompleteEntries=Number(this.maxAutocompleteInput.value),this.filterFn=this.filterFnSelect.value,this.caseSensitive=this.caseSensitiveCheck.checked,this.shouldSort=this.sortCheck.checked,this.wrapArrowKeys=this.wrapArrowKeysCheck.checked,this.clearable=this.clearableCheck.checked,this.disabled=this.disabledCheck.checked}updateOptions(){switch(this.optionSetSelect.value){case"colors":this.options=this.customContentCheck.checked?Ki:$o;break;case"countries":this.options=this.customContentCheck.checked?Wi:Ue;break;default:this.options=[]}}handleComboBoxChange(e){this.announcerText=`New value is: ${e.detail}`}static get styles(){return b`
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
    `}};_([g()],$.prototype,"options",2);_([g()],$.prototype,"behavior",2);_([g()],$.prototype,"label",2);_([g()],$.prototype,"placeholder",2);_([g()],$.prototype,"maxAutocompleteEntries",2);_([g()],$.prototype,"filterFn",2);_([g()],$.prototype,"caseSensitive",2);_([g()],$.prototype,"shouldSort",2);_([g()],$.prototype,"wrapArrowKeys",2);_([g()],$.prototype,"clearable",2);_([g()],$.prototype,"disabled",2);_([g()],$.prototype,"announcerText",2);_([y("#settings__options")],$.prototype,"optionSetSelect",2);_([y("#settings__custom-content")],$.prototype,"customContentCheck",2);_([y("#settings__behavior")],$.prototype,"behaviorSelect",2);_([y("#settings__label")],$.prototype,"labelInput",2);_([y("#settings__placeholder")],$.prototype,"placeholderInput",2);_([y("#settings__max-entries")],$.prototype,"maxAutocompleteInput",2);_([y("#settings__filter-fn")],$.prototype,"filterFnSelect",2);_([y("#settings__case-sensitive")],$.prototype,"caseSensitiveCheck",2);_([y("#settings__sort")],$.prototype,"sortCheck",2);_([y("#settings__wrap")],$.prototype,"wrapArrowKeysCheck",2);_([y("#settings__clearable")],$.prototype,"clearableCheck",2);_([y("#settings__disabled")],$.prototype,"disabledCheck",2);$=_([S("ia-combo-box-story")],$);const Ji=Object.freeze(Object.defineProperty({__proto__:null,get IAComboBoxStory(){return $}},Symbol.toStringTag,{value:"Module"}));function*Qi(e,t){if(e!==void 0){let o=0;for(const i of e)yield t(i,o++)}}const Xi="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20class='fill-color'%20d='m17.0555551%2041.3194459c0-12.7430552%2010.3541664-23.1027772%2023.0847216-23.1027772%2012.7166664%200%2023.0777773%2010.359722%2023.0777773%2023.1027772%200%2012.7361108-10.3611109%2023.0986106-23.0777773%2023.0986106-12.7305552%200-23.0847216-10.3624998-23.0847216-23.0986106zm-17.24305512%200c0%2022.2916661%2018.04583292%2040.3472213%2040.32777672%2040.3472213%208.9208332%200%2017.145833-2.9319449%2023.8194439-7.8527776l24.1513883%2024.0777771c1.2125%201.1402778%202.8430555%201.8430556%204.6374999%201.8430556%203.7444443%200%206.7805554-3.0361111%206.7805554-6.7791665%200-2.0652778-.9222222-3.9069444-2.3736111-5.1499999l-23.718055-23.7458328c4.4152777-6.4791665%207.0152776-14.3055552%207.0152776-22.7402772%200-22.2791661-18.0458328-40.34861006-40.312499-40.34861006-22.2819438%200-40.32777672%2018.06944396-40.32777672%2040.34861006z'%20fill='%232c2c2c'%20fill-rule='evenodd'%20/%3e%3c/svg%3e";function q(e,t,o,i){var r=arguments.length,s=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(e,t,o,i);else for(var d=e.length-1;d>=0;d--)(n=e[d])&&(s=(r<3?n(s):r>3?n(t,o,s):n(t,o))||s);return r>3&&s&&Object.defineProperty(t,o,s),s}const Bt=window,Te=Bt.ShadowRoot&&(Bt.ShadyCSS===void 0||Bt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Oe=Symbol(),Fe=new WeakMap;let xo=class{constructor(t,o,i){if(this._$cssResult$=!0,i!==Oe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=o}get styleSheet(){let t=this.o;const o=this.t;if(Te&&t===void 0){const i=o!==void 0&&o.length===1;i&&(t=Fe.get(o)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Fe.set(o,t))}return t}toString(){return this.cssText}};const tr=e=>new xo(typeof e=="string"?e:e+"",void 0,Oe),er=(e,...t)=>{const o=e.length===1?e[0]:t.reduce(((i,r,s)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[s+1]),e[0]);return new xo(o,e,Oe)},or=(e,t)=>{Te?e.adoptedStyleSheets=t.map((o=>o instanceof CSSStyleSheet?o:o.styleSheet)):t.forEach((o=>{const i=document.createElement("style"),r=Bt.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=o.cssText,e.appendChild(i)}))},qe=Te?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let o="";for(const i of t.cssRules)o+=i.cssText;return tr(o)})(e):e;var Zt;const Rt=window,Ke=Rt.trustedTypes,ir=Ke?Ke.emptyScript:"",We=Rt.reactiveElementPolyfillSupport,ne={toAttribute(e,t){switch(t){case Boolean:e=e?ir:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=e!==null;break;case Number:o=e===null?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch{o=null}}return o}},_o=(e,t)=>t!==e&&(t==t||e==e),Yt={attribute:!0,type:String,converter:ne,reflect:!1,hasChanged:_o},ae="finalized";let ct=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var o;this.finalize(),((o=this.h)!==null&&o!==void 0?o:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((o,i)=>{const r=this._$Ep(i,o);r!==void 0&&(this._$Ev.set(r,i),t.push(r))})),t}static createProperty(t,o=Yt){if(o.state&&(o.attribute=!1),this.finalize(),this.elementProperties.set(t,o),!o.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,r=this.getPropertyDescriptor(t,i,o);r!==void 0&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,o,i){return{get(){return this[o]},set(r){const s=this[t];this[o]=r,this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Yt}static finalize(){if(this.hasOwnProperty(ae))return!1;this[ae]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const o=this.properties,i=[...Object.getOwnPropertyNames(o),...Object.getOwnPropertySymbols(o)];for(const r of i)this.createProperty(r,o[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const o=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)o.unshift(qe(r))}else t!==void 0&&o.push(qe(t));return o}static _$Ep(t,o){const i=o.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((o=>this.enableUpdating=o)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach((o=>o(this)))}addController(t){var o,i;((o=this._$ES)!==null&&o!==void 0?o:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var o;(o=this._$ES)===null||o===void 0||o.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,o)=>{this.hasOwnProperty(o)&&(this._$Ei.set(o,this[o]),delete this[o])}))}createRenderRoot(){var t;const o=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return or(o,this.constructor.elementStyles),o}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach((o=>{var i;return(i=o.hostConnected)===null||i===void 0?void 0:i.call(o)}))}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach((o=>{var i;return(i=o.hostDisconnected)===null||i===void 0?void 0:i.call(o)}))}attributeChangedCallback(t,o,i){this._$AK(t,i)}_$EO(t,o,i=Yt){var r;const s=this.constructor._$Ep(t,i);if(s!==void 0&&i.reflect===!0){const n=(((r=i.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?i.converter:ne).toAttribute(o,i.type);this._$El=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$El=null}}_$AK(t,o){var i;const r=this.constructor,s=r._$Ev.get(t);if(s!==void 0&&this._$El!==s){const n=r.getPropertyOptions(s),d=typeof n.converter=="function"?{fromAttribute:n.converter}:((i=n.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?n.converter:ne;this._$El=s,this[s]=d.fromAttribute(o,n.type),this._$El=null}}requestUpdate(t,o,i){let r=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||_o)(this[t],o)?(this._$AL.has(t)||this._$AL.set(t,o),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(o){Promise.reject(o)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((r,s)=>this[s]=r)),this._$Ei=void 0);let o=!1;const i=this._$AL;try{o=this.shouldUpdate(i),o?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach((r=>{var s;return(s=r.hostUpdate)===null||s===void 0?void 0:s.call(r)})),this.update(i)):this._$Ek()}catch(r){throw o=!1,this._$Ek(),r}o&&this._$AE(i)}willUpdate(t){}_$AE(t){var o;(o=this._$ES)===null||o===void 0||o.forEach((i=>{var r;return(r=i.hostUpdated)===null||r===void 0?void 0:r.call(i)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach(((o,i)=>this._$EO(i,this[i],o))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};ct[ae]=!0,ct.elementProperties=new Map,ct.elementStyles=[],ct.shadowRootOptions={mode:"open"},We?.({ReactiveElement:ct}),((Zt=Rt.reactiveElementVersions)!==null&&Zt!==void 0?Zt:Rt.reactiveElementVersions=[]).push("1.6.3");var Jt;const Nt=window,ut=Nt.trustedTypes,Ge=ut?ut.createPolicy("lit-html",{createHTML:e=>e}):void 0,le="$lit$",G=`lit$${(Math.random()+"").slice(9)}$`,So="?"+G,rr=`<${So}>`,st=document,Tt=()=>st.createComment(""),Ot=e=>e===null||typeof e!="object"&&typeof e!="function",Co=Array.isArray,sr=e=>Co(e)||typeof e?.[Symbol.iterator]=="function",Qt=`[ 	
\f\r]`,wt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ze=/-->/g,Ye=/>/g,X=RegExp(`>|${Qt}(?:([^\\s"'>=/]+)(${Qt}*=${Qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Je=/'/g,Qe=/"/g,To=/^(?:script|style|textarea|title)$/i,nr=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),ar=nr(1),gt=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),Xe=new WeakMap,ot=st.createTreeWalker(st,129,null,!1);function Oo(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ge!==void 0?Ge.createHTML(t):t}const lr=(e,t)=>{const o=e.length-1,i=[];let r,s=t===2?"<svg>":"",n=wt;for(let d=0;d<o;d++){const a=e[d];let p,u,h=-1,f=0;for(;f<a.length&&(n.lastIndex=f,u=n.exec(a),u!==null);)f=n.lastIndex,n===wt?u[1]==="!--"?n=Ze:u[1]!==void 0?n=Ye:u[2]!==void 0?(To.test(u[2])&&(r=RegExp("</"+u[2],"g")),n=X):u[3]!==void 0&&(n=X):n===X?u[0]===">"?(n=r??wt,h=-1):u[1]===void 0?h=-2:(h=n.lastIndex-u[2].length,p=u[1],n=u[3]===void 0?X:u[3]==='"'?Qe:Je):n===Qe||n===Je?n=X:n===Ze||n===Ye?n=wt:(n=X,r=void 0);const w=n===X&&e[d+1].startsWith("/>")?" ":"";s+=n===wt?a+rr:h>=0?(i.push(p),a.slice(0,h)+le+a.slice(h)+G+w):a+G+(h===-2?(i.push(void 0),d):w)}return[Oo(e,s+(e[o]||"<?>")+(t===2?"</svg>":"")),i]};class At{constructor({strings:t,_$litType$:o},i){let r;this.parts=[];let s=0,n=0;const d=t.length-1,a=this.parts,[p,u]=lr(t,o);if(this.el=At.createElement(p,i),ot.currentNode=this.el.content,o===2){const h=this.el.content,f=h.firstChild;f.remove(),h.append(...f.childNodes)}for(;(r=ot.nextNode())!==null&&a.length<d;){if(r.nodeType===1){if(r.hasAttributes()){const h=[];for(const f of r.getAttributeNames())if(f.endsWith(le)||f.startsWith(G)){const w=u[n++];if(h.push(f),w!==void 0){const D=r.getAttribute(w.toLowerCase()+le).split(G),F=/([.?@])?(.*)/.exec(w);a.push({type:1,index:s,name:F[2],strings:D,ctor:F[1]==="."?cr:F[1]==="?"?hr:F[1]==="@"?ur:Kt})}else a.push({type:6,index:s})}for(const f of h)r.removeAttribute(f)}if(To.test(r.tagName)){const h=r.textContent.split(G),f=h.length-1;if(f>0){r.textContent=ut?ut.emptyScript:"";for(let w=0;w<f;w++)r.append(h[w],Tt()),ot.nextNode(),a.push({type:2,index:++s});r.append(h[f],Tt())}}}else if(r.nodeType===8)if(r.data===So)a.push({type:2,index:s});else{let h=-1;for(;(h=r.data.indexOf(G,h+1))!==-1;)a.push({type:7,index:s}),h+=G.length-1}s++}}static createElement(t,o){const i=st.createElement("template");return i.innerHTML=t,i}}function ft(e,t,o=e,i){var r,s,n,d;if(t===gt)return t;let a=i!==void 0?(r=o._$Co)===null||r===void 0?void 0:r[i]:o._$Cl;const p=Ot(t)?void 0:t._$litDirective$;return a?.constructor!==p&&((s=a?._$AO)===null||s===void 0||s.call(a,!1),p===void 0?a=void 0:(a=new p(e),a._$AT(e,o,i)),i!==void 0?((n=(d=o)._$Co)!==null&&n!==void 0?n:d._$Co=[])[i]=a:o._$Cl=a),a!==void 0&&(t=ft(e,a._$AS(e,t.values),a,i)),t}class dr{constructor(t,o){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var o;const{el:{content:i},parts:r}=this._$AD,s=((o=t?.creationScope)!==null&&o!==void 0?o:st).importNode(i,!0);ot.currentNode=s;let n=ot.nextNode(),d=0,a=0,p=r[0];for(;p!==void 0;){if(d===p.index){let u;p.type===2?u=new Et(n,n.nextSibling,this,t):p.type===1?u=new p.ctor(n,p.name,p.strings,this,t):p.type===6&&(u=new gr(n,this,t)),this._$AV.push(u),p=r[++a]}d!==p?.index&&(n=ot.nextNode(),d++)}return ot.currentNode=st,s}v(t){let o=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,o),o+=i.strings.length-2):i._$AI(t[o])),o++}}class Et{constructor(t,o,i,r){var s;this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=t,this._$AB=o,this._$AM=i,this.options=r,this._$Cp=(s=r?.isConnected)===null||s===void 0||s}get _$AU(){var t,o;return(o=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&o!==void 0?o:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const o=this._$AM;return o!==void 0&&t?.nodeType===11&&(t=o.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,o=this){t=ft(this,t,o),Ot(t)?t===C||t==null||t===""?(this._$AH!==C&&this._$AR(),this._$AH=C):t!==this._$AH&&t!==gt&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):sr(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==C&&Ot(this._$AH)?this._$AA.nextSibling.data=t:this.$(st.createTextNode(t)),this._$AH=t}g(t){var o;const{values:i,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=At.createElement(Oo(r.h,r.h[0]),this.options)),r);if(((o=this._$AH)===null||o===void 0?void 0:o._$AD)===s)this._$AH.v(i);else{const n=new dr(s,this),d=n.u(this.options);n.v(i),this.$(d),this._$AH=n}}_$AC(t){let o=Xe.get(t.strings);return o===void 0&&Xe.set(t.strings,o=new At(t)),o}T(t){Co(this._$AH)||(this._$AH=[],this._$AR());const o=this._$AH;let i,r=0;for(const s of t)r===o.length?o.push(i=new Et(this.k(Tt()),this.k(Tt()),this,this.options)):i=o[r],i._$AI(s),r++;r<o.length&&(this._$AR(i&&i._$AB.nextSibling,r),o.length=r)}_$AR(t=this._$AA.nextSibling,o){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,o);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var o;this._$AM===void 0&&(this._$Cp=t,(o=this._$AP)===null||o===void 0||o.call(this,t))}}class Kt{constructor(t,o,i,r,s){this.type=1,this._$AH=C,this._$AN=void 0,this.element=t,this.name=o,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=C}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,o=this,i,r){const s=this.strings;let n=!1;if(s===void 0)t=ft(this,t,o,0),n=!Ot(t)||t!==this._$AH&&t!==gt,n&&(this._$AH=t);else{const d=t;let a,p;for(t=s[0],a=0;a<s.length-1;a++)p=ft(this,d[i+a],o,a),p===gt&&(p=this._$AH[a]),n||(n=!Ot(p)||p!==this._$AH[a]),p===C?t=C:t!==C&&(t+=(p??"")+s[a+1]),this._$AH[a]=p}n&&!r&&this.j(t)}j(t){t===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class cr extends Kt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===C?void 0:t}}const pr=ut?ut.emptyScript:"";class hr extends Kt{constructor(){super(...arguments),this.type=4}j(t){t&&t!==C?this.element.setAttribute(this.name,pr):this.element.removeAttribute(this.name)}}class ur extends Kt{constructor(t,o,i,r,s){super(t,o,i,r,s),this.type=5}_$AI(t,o=this){var i;if((t=(i=ft(this,t,o,0))!==null&&i!==void 0?i:C)===gt)return;const r=this._$AH,s=t===C&&r!==C||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==C&&(r===C||s);s&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var o,i;typeof this._$AH=="function"?this._$AH.call((i=(o=this.options)===null||o===void 0?void 0:o.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class gr{constructor(t,o,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=o,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){ft(this,t)}}const to=Nt.litHtmlPolyfillSupport;to?.(At,Et),((Jt=Nt.litHtmlVersions)!==null&&Jt!==void 0?Jt:Nt.litHtmlVersions=[]).push("2.8.0");const fr=(e,t,o)=>{var i,r;const s=(i=o?.renderBefore)!==null&&i!==void 0?i:t;let n=s._$litPart$;if(n===void 0){const d=(r=o?.renderBefore)!==null&&r!==void 0?r:null;s._$litPart$=n=new Et(t.insertBefore(Tt(),d),d,void 0,o??{})}return n._$AI(e),n};var Xt,te;class pt extends ct{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,o;const i=super.createRenderRoot();return(t=(o=this.renderOptions).renderBefore)!==null&&t!==void 0||(o.renderBefore=i.firstChild),i}update(t){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=fr(o,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return gt}}pt.finalized=!0,pt._$litElement$=!0,(Xt=globalThis.litElementHydrateSupport)===null||Xt===void 0||Xt.call(globalThis,{LitElement:pt});const eo=globalThis.litElementPolyfillSupport;eo?.({LitElement:pt});((te=globalThis.litElementVersions)!==null&&te!==void 0?te:globalThis.litElementVersions=[]).push("3.3.3");const mr=e=>t=>typeof t=="function"?((o,i)=>(customElements.define(o,i),i))(e,t):((o,i)=>{const{kind:r,elements:s}=i;return{kind:r,elements:s,finisher(n){customElements.define(o,n)}}})(e,t);const br=(e,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(o){o.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(o){o.createProperty(t.key,e)}},yr=(e,t,o)=>{t.constructor.createProperty(o,e)};function at(e){return(t,o)=>o!==void 0?yr(e,t,o):br(e,t)}const vr=({finisher:e,descriptor:t})=>(o,i)=>{var r;if(i===void 0){const s=(r=o.originalKey)!==null&&r!==void 0?r:o.key,n=t!=null?{kind:"method",placement:"prototype",key:s,descriptor:t(o.key)}:{...o,key:s};return e!=null&&(n.finisher=function(d){e(d,s)}),n}{const s=o.constructor;t!==void 0&&Object.defineProperty(o,i,t(i)),e?.(s,i)}};function wr(e,t){return vr({descriptor:o=>({get(){var r,s;return(s=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(e))!==null&&s!==void 0?s:null},enumerable:!0,configurable:!0})})}var ee;((ee=window.HTMLSlotElement)===null||ee===void 0?void 0:ee.prototype.assignedElements)!=null;const $r=l`
<svg
  viewBox="0 0 40 40"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z" class="fill-color" fill-rule="evenodd"/>
</svg>
`;class xr extends v{static get styles(){return b`
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
    `}render(){return $r}}customElements.define("ia-icon-close",xr);let R=class extends pt{constructor(){super(...arguments),this.value="",this.clearButtonScreenReaderLabel="Clear",this.focusOnClear=!0,this.forceClearButton=!1}render(){var t,o,i,r;const s=!this.value&&!this.forceClearButton;return ar`
      <div id="container">
        <slot name="icon"></slot>
        <label for="text-input" class="sr-only"
          >${(t=this.screenReaderLabel)!==null&&t!==void 0?t:C}</label
        >
        <input
          id="text-input"
          type="text"
          inputmode="search"
          enterkeyhint="search"
          autocapitalize="off"
          placeholder=${(o=this.placeholder)!==null&&o!==void 0?o:C}
          .value=${(i=this.value)!==null&&i!==void 0?i:C}
          aria-controls=${(r=this.ariaControls)!==null&&r!==void 0?r:C}
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
    `}onTextInput(){this.value=this.textInput.value}onKeyPress(t){if(t.key==="Enter"){this.textInput.blur();const o=new CustomEvent("submit",{detail:this.value});this.dispatchEvent(o)}}clearButtonClicked(){const t=this.textInput.value;this.value="",this.focusOnClear&&this.textInput.focus();const o=new CustomEvent("clear",{detail:t});this.dispatchEvent(o);const i=new InputEvent("input",{inputType:"deleteContentBackward"});this.dispatchEvent(i)}};R.shadowRootOptions={...pt.shadowRootOptions,delegatesFocus:!0};R.styles=er`
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
  `;q([at({type:String})],R.prototype,"value",void 0);q([at({type:String})],R.prototype,"placeholder",void 0);q([at({type:String})],R.prototype,"screenReaderLabel",void 0);q([at({type:String})],R.prototype,"clearButtonScreenReaderLabel",void 0);q([at({type:String})],R.prototype,"ariaControls",void 0);q([at({type:Boolean})],R.prototype,"focusOnClear",void 0);q([at({type:Boolean,reflect:!0})],R.prototype,"forceClearButton",void 0);q([wr("#text-input")],R.prototype,"textInput",void 0);R=q([mr("ia-clearable-text-input")],R);const _r=`<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>
`,Sr=`<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>
`;var Cr=Object.defineProperty,Tr=Object.getOwnPropertyDescriptor,A=(e,t,o,i)=>{for(var r=i>1?void 0:i?Tr(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=(i?n(t,o,r):n(r))||r);return i&&r&&Cr(t,o,r),r};let O=class extends v{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionGroup="options",this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=e=>{switch(e.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=e=>{e&&e.type==="click"&&e.stopPropagation(),this.open=!1,this.updatePopoverState()}}async firstUpdated(){await new Promise(e=>{setTimeout(e,0)}),this.addEventListener("closeDropdown",this.closeOptions)}willUpdate(e){e.has("open")&&this.updatePopoverState()}disconnectedCallback(){super.disconnectedCallback?.(),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){this.usePopover&&(this.dropdownMenu?.togglePopover?.(this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;const e=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${e.left}px`,this.dropdownMenu.style.top=`${e.bottom}px`,this.dropdownMenu.style.minWidth=`${e.width}px`}mainButtonClicked(){this.openViaButton?this.toggleOptions():this.mainButtonLabelSlotted[0]?.click()}mainButtonKeyDown(e){(e.key==="Enter"||e.key===" ")&&(this.mainButtonClicked(),e.preventDefault())}caretKeyDown(e){(e.key==="Enter"||e.key===" ")&&(this.toggleOptions(),e.preventDefault())}renderOption(e){const{label:t,url:o=void 0,id:i}=e;let r;const s=this.selectedOption===i?"selected":"";return o?r=l`<a
        href=${o}
        @click=${n=>this.optionClicked(n,e)}
        >${t}</a
      >`:r=l`<button
        @click=${n=>this.optionClicked(n,e)}
      >
        ${t}
      </button>`,l`<li role="menuitem" class=${s}>${r}</li>`}optionClicked(e,t){e.stopPropagation(),this.selectedOption!==t.id&&(this.selectedOption=t.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:t}})),t.selectedHandler?.(t)),this.closeOnSelect&&(this.closeOptions(),this.mainButton.focus())}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(e=>this.selectedOption!==e.id)}get caretUpTemplate(){return l`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${St(_r)}</slot>
      </span>
    `}get caretDownTemplate(){return l`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${St(Sr)}</slot>
      </span>
    `}get caretTemplate(){return this.displayCaret?this.openViaButton?l`
        <span class="caret" aria-hidden="true">
          ${this.caretUpTemplate} ${this.caretDownTemplate}
        </span>
      `:l`
      <button
        class="caret"
        aria-labelledby="caret-label"
        aria-haspopup="true"
        aria-expanded=${this.open}
        @click=${V(this.shouldAttachEventHandlers,()=>this.toggleOptions)}
        @keydown=${V(this.shouldAttachEventHandlers,()=>this.caretKeyDown)}
        ?disabled=${this.isDisabled}
      >
        ${this.caretUpTemplate} ${this.caretDownTemplate}
      </button>
    `:l``}get dropdownTemplate(){return this.isCustomList?l`<slot name="list"></slot>`:l`${this.availableOptions.map(e=>this.renderOption(e))}`}get backdropTemplate(){return this.closeOnBackdropClick?this.open?l`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `:l``:l``}get shouldNestCaretInButton(){return this.openViaButton}get shouldAttachEventHandlers(){return!this.isDisabled&&!this.hasCustomClickHandler}render(){return l`
      <div class="ia-dropdown-group ${this.open?"open":""}">
        <div class="button-row">
          <button
            class="click-main"
            aria-haspopup=${this.openViaButton}
            aria-expanded=${this.open}
            @click=${V(this.shouldAttachEventHandlers,()=>this.mainButtonClicked)}
            @keydown=${V(this.shouldAttachEventHandlers,()=>this.mainButtonKeyDown)}
            ?disabled=${this.isDisabled}
          >
            <span class="sr-only" id="caret-label"
              >Toggle ${this.optionGroup}</span
            >
            <slot name="dropdown-label"></slot>
            ${V(this.shouldNestCaretInButton,()=>this.caretTemplate)}
          </button>
          ${V(!this.shouldNestCaretInButton,()=>this.caretTemplate)}
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
    `}static get styles(){const e=b`var(--dropdownBorderWidth, 1px)`,t=b`var(--dropdownBorderRadius, 4px)`,o=b`var(--dropdownBorderColor, #fff)`,i=b`var(--dropdownBgColor, #333)`,r=b`var(--dropdownTextColor, #fff)`,s=b`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,n=b`var(--dropdownSelectedBgColor, #fff)`,d=b`var(--dropdownMainButtonBgColor, transparent)`,a=b`var(--dropdownTextAlign, inherit)`,p=b`var(--dropdownBackdropZIndex, 1)`,u=b`var(--dropdownListZIndex, 2)`;return[N,b`
        :host {
          display: inline;
          color: ${r};
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
          z-index: ${u};
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
          z-index: ${p};
        }

        ul {
          z-index: ${u};
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
          color: ${r};
          background: ${i};

          font-size: var(--dropdownFontSize, inherit);

          border-top: var(--dropdownBorderTopWidth, ${e});
          border-right: var(--dropdownBorderRightWidth, ${e});
          border-bottom: var(
            --dropdownBorderBottomWidth,
            ${e}
          );
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
          border-bottom-color: ${n};
        }

        #dropdown-main li.selected:first-child {
          border-top-color: ${n};
        }

        #dropdown-main li:hover > *,
        #dropdown-main li:focus-within > * {
          background-color: ${s};
          color: var(--dropdownHoverTextColor, #fff);
        }

        #dropdown-main li.selected > * {
          background-color: ${n};
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
          color: ${r};
          background: var(--dropdownItemButtonBgColor, transparent);
          padding: var(--dropdownItemButtonPadding, 0);
          text-align: ${a};
        }
      `]}};A([c({type:Boolean,reflect:!0})],O.prototype,"open",2);A([c({type:Boolean,reflect:!0})],O.prototype,"isDisabled",2);A([c({type:Boolean})],O.prototype,"displayCaret",2);A([c({type:Boolean})],O.prototype,"closeOnSelect",2);A([c({type:Boolean})],O.prototype,"openViaButton",2);A([c({type:Boolean})],O.prototype,"usePopover",2);A([c({type:Boolean})],O.prototype,"includeSelectedOption",2);A([c({type:String})],O.prototype,"selectedOption",2);A([c({attribute:!1})],O.prototype,"options",2);A([c({type:String})],O.prototype,"optionGroup",2);A([c({attribute:!1})],O.prototype,"optionSelected",2);A([c({type:Boolean,reflect:!0})],O.prototype,"isCustomList",2);A([c({type:Boolean,reflect:!0})],O.prototype,"hasCustomClickHandler",2);A([c({type:Boolean,reflect:!0})],O.prototype,"closeOnEscape",2);A([c({type:Boolean,reflect:!0})],O.prototype,"closeOnBackdropClick",2);A([y(".ia-dropdown-group")],O.prototype,"container",2);A([y("#dropdown-main")],O.prototype,"dropdownMenu",2);A([y(".click-main")],O.prototype,"mainButton",2);A([ti({slot:"dropdown-label"})],O.prototype,"mainButtonLabelSlotted",2);O=A([S("ia-dropdown")],O);var Or=Object.defineProperty,Ar=Object.getOwnPropertyDescriptor,H=(e,t,o,i)=>{for(var r=i>1?void 0:i?Ar(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=(i?n(t,o,r):n(r))||r);return i&&r&&Or(t,o,r),r};const oo={CategoryChanged:"categoryChanged",SearchRequested:"searchRequested"};let U=class extends v{constructor(){super(...arguments),this.categories=[],this.placeholder=P("Search"),this.useMobileView=!1,this.hideDropdown=!1,this.loading=!1}get resolvedCategory(){return this.selectedCategory??this.categories?.[0]?.id??""}render(){return l`
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
    `}willUpdate(e){if(e.has("selectedCategory")||e.has("categories")){const t=this.resolvedCategory;this.categoryDropdown&&this.categoryDropdown.selectedOption!==t&&(this.categoryDropdown.selectedOption=t)}}get dropdownTemplate(){return l`
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
    `}get textBoxTemplate(){return l`
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
    `}get searchButtonTemplate(){return l`
      <button
        id="search-button"
        part="search-button"
        class=${this.loading?"loading":m}
        type="button"
        aria-label=${P("Search")}
        @click=${this.handleSubmit}
      >
        ${this.loading?l`<ia-status-indicator
              mode="loading"
              class="search-button-loading-icon"
            ></ia-status-indicator>`:l`<img src=${Xi} alt="" />`}
      </button>
    `}get selectedCategoryLabel(){return this.categories.find(t=>t.id===this.resolvedCategory)?.label??this.resolvedCategory}get spacedQuery(){return this.query?.replace(/\+/g," ")??""}searchFieldCleared(){this.query&&this.emitSearchRequested()}handleSubmit(){this.emitSearchRequested()}handleCategorySelected(e){const t=e.detail.option.id;t!==this.resolvedCategory&&(this.selectedCategory=t,setTimeout(()=>this.searchInput.focus()),this.dispatchEvent(new CustomEvent(oo.CategoryChanged,{detail:t})))}emitSearchRequested(){this.dispatchEvent(new CustomEvent(oo.SearchRequested,{detail:{query:this.searchInput.value,category:this.resolvedCategory}}))}static get styles(){const e=b`
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
    `;return[N,e]}};H([c({type:String})],U.prototype,"query",2);H([c({type:Array})],U.prototype,"categories",2);H([c({type:String})],U.prototype,"selectedCategory",2);H([c({type:String})],U.prototype,"placeholder",2);H([c({type:Boolean})],U.prototype,"useMobileView",2);H([c({type:Boolean})],U.prototype,"hideDropdown",2);H([c({type:Boolean})],U.prototype,"loading",2);H([y("#search-input")],U.prototype,"searchInput",2);H([y("#category-dropdown")],U.prototype,"categoryDropdown",2);U=H([S("ia-dropdown-search-bar")],U);var Er=Object.defineProperty,kr=Object.getOwnPropertyDescriptor,j=(e,t,o,i)=>{for(var r=i>1?void 0:i?kr(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=(i?n(t,o,r):n(r))||r);return i&&r&&Er(t,o,r),r};const Pr=[{label:"Bar height",cssVariable:"--ia-theme-search-bar-height",defaultValue:"30px",inputType:"text"},{label:"Bar width",cssVariable:"--ia-theme-search-bar-width",defaultValue:"300px",inputType:"text"},{label:"Internal padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown z-index",cssVariable:"--dropdown-z-index",defaultValue:2,inputType:"number",min:0,step:1}],io=[{id:"all",label:"All"},{id:"texts",label:"Books/Documents"},{id:"fulltext",label:"Text Contents"},{id:"radio",label:"Radio"},{id:"tv",label:"TV"},{id:"movies",label:"Video"},{id:"audio",label:"Audio"},{id:"software",label:"Software"},{id:"image",label:"Images"},{id:"etree",label:"Live Music"},{id:"collection",label:"Collections"},{id:"data",label:"Data"},{id:"web",label:"Web Sites"}],Br="all",ro="Search";let B=class extends v{constructor(){super(...arguments),this.query="",this.selectedCategory=Br,this.placeholder=ro,this.hideDropdown=!1,this.loading=!1,this.announcerText=""}render(){return l`
      <story-template
        elementTag="ia-dropdown-search-bar"
        elementClassName="IADropdownSearchBar"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:Pr}}
      >
        <div slot="demo">
          <ia-dropdown-search-bar
            .query=${this.query}
            .categories=${io}
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
                  ${Qi(io,e=>l`<option value=${e.id}>
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
                  value=${ro}
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
    `}get exampleUsage(){const{query:e,selectedCategory:t,placeholder:o,hideDropdown:i,loading:r}=this,s=a=>a?`"${a}"`:"",n={query:s(e),selectedCategory:s(t),placeholder:s(o),hideDropdown:i,loading:r};return`
      <ia-dropdown-search-bar
        .categories=\${[
          { id: 'foo', label: 'Foo Option' },
          { id: 'bar', label: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(n).map(([a,p])=>p?p===!0?a:`${a}=${p}`:"").join(`
  `)}
      >
      </ia-dropdown-search-bar>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(e){e.preventDefault(),this.query=this.queryInput.value,this.selectedCategory=this.selectedCategorySelect.value,this.placeholder=this.placeholderInput.value,this.hideDropdown=this.hideDropdownCheck.checked,this.loading=this.loadingCheck.checked}handleSearchRequested(e){this.announcerText=`Category ID "${e.detail.category}" / Query "${e.detail.query}"`}static get styles(){return b`
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
    `}};j([g()],B.prototype,"query",2);j([g()],B.prototype,"selectedCategory",2);j([g()],B.prototype,"placeholder",2);j([g()],B.prototype,"hideDropdown",2);j([g()],B.prototype,"loading",2);j([g()],B.prototype,"announcerText",2);j([y("#settings__query")],B.prototype,"queryInput",2);j([y("#settings__selected-category")],B.prototype,"selectedCategorySelect",2);j([y("#settings__placeholder")],B.prototype,"placeholderInput",2);j([y("#settings__hide-dropdown")],B.prototype,"hideDropdownCheck",2);j([y("#settings__loading")],B.prototype,"loadingCheck",2);B=j([S("ia-dropdown-search-bar-story")],B);const Ir=Object.freeze(Object.defineProperty({__proto__:null,get IADropdownSearchBarStory(){return B}},Symbol.toStringTag,{value:"Module"}));var Vr=Object.getOwnPropertyDescriptor,Dr=(e,t,o,i)=>{for(var r=i>1?void 0:i?Vr(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=n(r)||r);return r};let de=class extends v{render(){return l`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `}};de.styles=[N,b`
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
    `];de=Dr([S("ia-icon-label")],de);var Lr=Object.defineProperty,Rr=Object.getOwnPropertyDescriptor,M=(e,t,o,i)=>{for(var r=i>1?void 0:i?Rr(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=(i?n(t,o,r):n(r))||r);return i&&r&&Lr(t,o,r),r};const Nr=[{label:"Menu background",cssVariable:"--dropdownBgColor",defaultValue:"#333333",inputType:"color"},{label:"Text color",cssVariable:"--dropdownTextColor",defaultValue:"#ffffff",inputType:"color"},{label:"Caret color",cssVariable:"--dropdownCaretColor",defaultValue:"#ffffff",inputType:"color"},{label:"Border color",cssVariable:"--dropdownBorderColor",defaultValue:"#ffffff",inputType:"color"},{label:"Selected option background",cssVariable:"--dropdownSelectedBgColor",defaultValue:"#ffffff",inputType:"color"},{label:"Selected option text",cssVariable:"--dropdownSelectedTextColor",defaultValue:"#2c2c2c",inputType:"color"},{label:"Border radius",cssVariable:"--dropdownBorderRadius",defaultValue:4,inputType:"range",min:0,max:20,step:1,unit:"px"},{label:"Menu offset from button",cssVariable:"--dropdownOffsetTop",defaultValue:5,inputType:"range",min:0,max:40,step:1,unit:"px"}],jr=[{id:"all",label:"All media types"},{id:"texts",label:"Books & Documents"},{id:"movies",label:"Video"},{id:"audio",label:"Audio"},{id:"software",label:"Software"}],Mr=[{id:"inlibrary",url:"#elem-ia-dropdown",label:"Books to Borrow"},{id:"texts",url:"#elem-ia-dropdown",label:"Texts Collection"},{id:"web",url:"#elem-ia-dropdown",label:"Wayback Machine"}];let I=class extends v{constructor(){super(...arguments),this.displayCaret=!0,this.isDisabled=!1,this.openViaButton=!0,this.closeOnSelect=!1,this.includeSelectedOption=!1,this.closeOnEscape=!0,this.closeOnBackdropClick=!0,this.useLinkOptions=!1,this.selectedOption="all",this.lastSelectedLabel="(none yet)"}get options(){return this.useLinkOptions?Mr:jr}get selectedLabel(){return this.options.find(t=>t.id===this.selectedOption)?.label??"Select one"}render(){return l`
      <story-template
        elementTag="ia-dropdown"
        elementClassName="IADropdown"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:Nr}}
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
    `}get plusIcon(){return l`<svg viewBox="0 0 100 100" style="width: 15px; height: 15px;">
      <path
        fill="currentColor"
        d="m56 23v22h22v11h-22v22h-11l-.001-22h-21.999v-11h21.999l.001-22z"
      />
    </svg>`}checkboxRow(e,t,o){return l`
      <tr>
        <td><label for="settings__${e}">${t}</label></td>
        <td>
          <input
            type="checkbox"
            id="settings__${e}"
            .checked=${this[o]}
            @change=${i=>{this[o]=i.target.checked}}
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
</ia-dropdown>`}handleOptionSelected(e){this.selectedOption=e.detail.option.id,this.lastSelectedLabel=e.detail.option.label}handleOptionSetChanged(e){this.useLinkOptions=e.target.value==="links",this.selectedOption=this.options[0].id,this.lastSelectedLabel="(none yet)"}toggleCustomDropdown(){this.customDropdown&&(this.customDropdown.open=!this.customDropdown.open)}static get styles(){return b`
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
    `}};M([g()],I.prototype,"displayCaret",2);M([g()],I.prototype,"isDisabled",2);M([g()],I.prototype,"openViaButton",2);M([g()],I.prototype,"closeOnSelect",2);M([g()],I.prototype,"includeSelectedOption",2);M([g()],I.prototype,"closeOnEscape",2);M([g()],I.prototype,"closeOnBackdropClick",2);M([g()],I.prototype,"useLinkOptions",2);M([g()],I.prototype,"selectedOption",2);M([g()],I.prototype,"lastSelectedLabel",2);M([y("#custom-list-dropdown")],I.prototype,"customDropdown",2);I=M([S("ia-dropdown-story")],I);const Ur=Object.freeze(Object.defineProperty({__proto__:null,get IADropdownStory(){return I}},Symbol.toStringTag,{value:"Module"}));var zr=Object.defineProperty,Hr=Object.getOwnPropertyDescriptor,lt=(e,t,o,i)=>{for(var r=i>1?void 0:i?Hr(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=(i?n(t,o,r):n(r))||r);return i&&r&&zr(t,o,r),r};const Fr={CodeSubmitted:"codeSubmitted"},so=/^[0-9]+$/,qr=/^[a-zA-Z0-9]+$/;let Z=class extends v{constructor(){super(...arguments),this.disabled=!1,this.numChars=6,this.numericOnly=!0,this.allowedChars=so}render(){return l`
      ${[...Array(this.numChars).keys()].map(e=>l`<input
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
    `}firstUpdated(){this.inputs[0].focus()}willUpdate(e){e.has("numericOnly")&&(this.allowedChars=this.numericOnly?so:qr),e.has("prefillValue")&&this.prefillValue!==void 0&&(this.fillInputs(this.prefillValue),this.prefillValue=void 0)}handleInput(e){e.preventDefault();const t=e.target,o=e.data;if(!o)return;if(o.length>1){this.fillInputs(o);return}if(!this.allowedChars.test(o))return;t.value=o;const i=t.nextElementSibling;i&&i.focus(),this.submitIfInputsFilled()}handleKeydown(e){const t=e.target,o=e.key,i=t.previousElementSibling,r=t.nextElementSibling;switch(o){case"Backspace":case"Delete":if(e.preventDefault(),i&&i.focus(),t.value===""){i.value="";break}t.value="";break;case"Tab":t.select();break;case"ArrowRight":case"Right":e.preventDefault(),r&&r.focus();break;case"ArrowLeft":case"Left":e.preventDefault(),i&&i.focus();break}}handlePaste(e){e.preventDefault();const t=e.clipboardData?.getData("text");t&&this.fillInputs(t)}fillInputs(e){e===""&&this.clearInputs();const t=e.split("").filter(i=>this.allowedChars.test(i)).slice(0,this.numChars);if(!t||t.length===0)return;if(t.forEach((i,r)=>this.inputs[r].value=i),t.length===this.numChars){this.triggerSubmit(t.join("")),this.inputs[this.numChars-1].focus();return}this.inputs[t.length].focus()}clearInputs(){this.inputs.forEach(e=>e.value=""),this.inputs[0].focus()}submitIfInputsFilled(){const e=[];this.inputs.forEach(t=>{t.value&&e.push(t.value)}),e.length===this.numChars&&this.triggerSubmit(e.join(""))}triggerSubmit(e){this.dispatchEvent(new CustomEvent(Fr.CodeSubmitted,{detail:this.numericOnly?e:e.toUpperCase(),bubbles:!0,composed:!0}))}static get styles(){return[N,b`
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
      `]}};lt([c({type:String})],Z.prototype,"prefillValue",2);lt([c({type:Boolean})],Z.prototype,"disabled",2);lt([c({type:Number})],Z.prototype,"numChars",2);lt([c({type:Boolean})],Z.prototype,"numericOnly",2);lt([c({type:Object})],Z.prototype,"allowedChars",2);lt([_e("input")],Z.prototype,"inputs",2);Z=lt([S("ia-otp-input")],Z);var Kr=Object.defineProperty,Wr=Object.getOwnPropertyDescriptor,bt=(e,t,o,i)=>{for(var r=i>1?void 0:i?Wr(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=(i?n(t,o,r):n(r))||r);return i&&r&&Kr(t,o,r),r};const Gr={NewCodeRequested:"newCodeRequested"};let nt=class extends v{constructor(){super(...arguments),this.validationStatus="ready",this.newCodeSending=!1,this.numPasscodeChars=6,this.numericOnly=!0}render(){return l`
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
      ${this.validationStatus==="error"?l`<p class="error-msg">
            ${P("The code entered is invalid or expired")}
          </p>`:m}
      ${this.resendCodeButtonTemplate}
    `}willUpdate(e){e.has("validationStatus")&&this.OTPInput&&this.validationStatus==="error"&&(this.OTPInput.prefillValue=""),e.has("newCodeSending")&&this.newCodeSending&&this.OTPInput&&(this.OTPInput.prefillValue="")}get resendCodeButtonTemplate(){return this.newCodeSending?l`<span part="new-code-message" class="new-code-msg"
          >${P("Emailing...")}</span
        >`:l`
          <ia-button
            mode="link"
            class="new-code-btn"
            part="new-code-button"
            .disabled=${this.validationStatus==="loading"||this.validationStatus==="success"}
            @click=${this.handleNewCodeRequested}
          >
            ${P("Email me another code")}
          </ia-button>
        `}async handleNewCodeRequested(){this.dispatchEvent(new CustomEvent(Gr.NewCodeRequested,{bubbles:!0,composed:!0})),this.OTPInput.prefillValue=""}static get styles(){return[N,b`
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
      `]}};bt([c({type:String})],nt.prototype,"validationStatus",2);bt([c({type:Boolean})],nt.prototype,"newCodeSending",2);bt([c({type:Number})],nt.prototype,"numPasscodeChars",2);bt([c({type:Boolean})],nt.prototype,"numericOnly",2);bt([y("ia-otp-input")],nt.prototype,"OTPInput",2);nt=bt([S("ia-otp-form")],nt);var Zr=Object.getOwnPropertyDescriptor,Yr=(e,t,o,i)=>{for(var r=i>1?void 0:i?Zr(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=n(r)||r);return r};const Jr=[{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Input font size",cssVariable:"--ia-theme-font-size-lg",defaultValue:"2.25rem",inputType:"text"},{label:"Link and error font size",cssVariable:"--ia-theme-font-size-standard",defaultValue:"0.875rem",inputType:"text"},{label:"Link font color",cssVariable:"--ia-theme-link-color",defaultValue:"#4b64ff",inputType:"color"},{label:"Error message/indicator color",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"},{label:"Success indicator color",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"}],Qr=[{label:"Validation Status",propertyName:"validationStatus",defaultValue:"ready",inputType:"radio",radioOptions:["ready","loading","success","error"]},{label:"New code sending in progress",propertyName:"newCodeSending",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Numeric only",propertyName:"numericOnly",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Number of passcode characters",propertyName:"numPasscodeChars",defaultValue:6,inputType:"number"}];let ce=class extends v{render(){return l`
      <story-template
        elementTag="ia-otp-form"
        elementClassName="IAOTPForm"
        .defaultUsageProps=${"@codeSubmitted=${(e: CustomEvent) => {setTimeout(() => alert('Code submitted: ' + e.detail), 250);}} \n  @newCodeRequested=${() => alert('New code requested')}"}
        .styleInputData=${{settings:Jr}}
        .propInputData=${{settings:Qr}}
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
    `}};ce=Yr([S("ia-otp-form-story")],ce);const Xr=Object.freeze(Object.defineProperty({__proto__:null,get IAOTPFormStory(){return ce}},Symbol.toStringTag,{value:"Module"}));var ts=Object.getOwnPropertyDescriptor,es=(e,t,o,i)=>{for(var r=i>1?void 0:i?ts(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=n(r)||r);return r};const os=[{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Font size",cssVariable:"--ia-theme-font-size-lg",defaultValue:"2.25rem",inputType:"text"}],is=[{label:"Number of characters",propertyName:"numChars",defaultValue:6,inputType:"number"},{label:"Numeric only",propertyName:"numericOnly",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Prefill value",propertyName:"prefillValue",defaultValue:""},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let pe=class extends v{render(){return l`
      <story-template
        elementTag="ia-otp-input"
        elementClassName="IAOTPInput"
        .defaultUsageProps=${"@codeSubmitted=${(e: CustomEvent) => {setTimeout(() => alert('Code submitted: ' + e.detail), 250);}}"}
        .styleInputData=${{settings:os}}
        .propInputData=${{settings:is}}
      >
        <ia-otp-input
          @codeSubmitted=${e=>{setTimeout(()=>alert("Code submitted: "+e.detail),250)}}
          slot="demo"
        ></ia-otp-input>
      </story-template>
    `}};pe=es([S("ia-otp-input-story")],pe);const rs=Object.freeze(Object.defineProperty({__proto__:null,get IAOTPInputStory(){return pe}},Symbol.toStringTag,{value:"Module"}));var ss=Object.getOwnPropertyDescriptor,ns=(e,t,o,i)=>{for(var r=i>1?void 0:i?ss(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=n(r)||r);return r};let no=class extends v{render(){return l`
      <span class="sr-only">
        <slot></slot>
      </span>
    `}static get styles(){return[N,b`
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
      `]}};no=ns([S("ia-sr-only-text")],no);var as=Object.defineProperty,ls=Object.getOwnPropertyDescriptor,Ao=(e,t,o,i)=>{for(var r=i>1?void 0:i?ls(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=(i?n(t,o,r):n(r))||r);return i&&r&&as(t,o,r),r};let jt=class extends v{constructor(){super(...arguments),this.textVisible=!1}render(){return l`
      <story-template
        elementTag="ia-sr-only-text"
        elementClassName="IASrOnlyText"
        defaultSlottedContent="Sample text"
      >
        <div slot="demo">
          ${this.textVisible?"Sample Text":l`<ia-sr-only-text>Sample Text</ia-sr-only-text>`}
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
    `}};Ao([g()],jt.prototype,"textVisible",2);jt=Ao([S("ia-sr-only-text-story")],jt);const ds=Object.freeze(Object.defineProperty({__proto__:null,get IAStatusIndicatorStory(){return jt}},Symbol.toStringTag,{value:"Module"}));var cs=Object.getOwnPropertyDescriptor,ps=(e,t,o,i)=>{for(var r=i>1?void 0:i?cs(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=n(r)||r);return r};const hs=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"1.25rem"},{label:"Color - loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Color - success",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"},{label:"Color - error",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}],us=[{label:"Mode",propertyName:"mode",defaultValue:"loading",inputType:"radio",radioOptions:["ready","loading","success","error"]},{label:"Accessible title - loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{label:"Loading style",propertyName:"loadingStyle",defaultValue:"ring-dots",inputType:"radio",radioOptions:["ring-dots","ring"]},{label:"Accessible title - success",propertyName:"successTitle",defaultValue:"Success"},{label:"Accessible title - error",propertyName:"errorTitle",defaultValue:"Error"}];let he=class extends v{render(){return l`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .styleInputData=${{settings:hs}}
        .propInputData=${{settings:us}}
      >
        <ia-status-indicator slot="demo"></ia-status-indicator>
      </story-template>
    `}};he=ps([S("ia-status-indicator-story")],he);const gs=Object.freeze(Object.defineProperty({__proto__:null,get IAStatusIndicatorStory(){return he}},Symbol.toStringTag,{value:"Module"})),fs="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='36.283'%20height='36.283'%3e%3cpath%20d='M35.531%2017.391h-3.09l.845-1.464a.748.748%200%201%200-1.297-.75l-1.276%202.214H28.61l2.515-4.354a.751.751%200%200%200-.272-1.024.75.75%200%200%200-1.024.274l-2.948%205.104h-2.023a6.751%206.751%200%200%200-2.713-4.684l1.019-1.76%205.896-.002a.75.75%200%200%200%200-1.5l-5.029.002%201.051-1.82%202.557.002a.75.75%200%200%200%200-1.5l-1.689-.002%201.545-2.676a.75.75%200%201%200-1.302-.75l-1.547%202.676-.844-1.463a.749.749%200%201%200-1.297.75l1.278%202.213-1.051%201.818-2.514-4.354a.75.75%200%200%200-1.298.75l2.946%205.104-1.016%201.758a6.692%206.692%200%200%200-2.706-.57%206.74%206.74%200%200%200-2.707.568l-1.013-1.754%202.946-5.105a.75.75%200%200%200-1.298-.75L13.56%208.697l-1.05-1.818%201.278-2.217a.749.749%200%200%200-1.298-.75l-.845%201.465-1.551-2.678a.75.75%200%200%200-1.024-.273.748.748%200%200%200-.274%201.023l1.545%202.678H8.652a.75.75%200%200%200%200%201.5h2.556l1.05%201.818H7.231a.75.75%200%200%200%200%201.5h5.894l1.017%201.762a6.755%206.755%200%200%200-2.712%204.684H9.406l-2.95-5.104a.75.75%200%201%200-1.299.75l2.516%204.354H5.569l-1.277-2.213a.75.75%200%200%200-1.298.75l.845%201.463H.75a.75.75%200%200%200%200%201.5h3.09l-.845%201.465a.747.747%200%200%200%20.275%201.022.75.75%200%200%200%20.374.103.75.75%200%200%200%20.65-.375l1.277-2.215h2.103l-2.516%204.354a.75.75%200%200%200%201.299.75l2.949-5.104h2.024a6.761%206.761%200%200%200%202.712%204.685l-1.017%201.762H7.232a.75.75%200%200%200%200%201.5h5.026l-1.05%201.818H8.651a.75.75%200%200%200%200%201.5h1.69l-1.545%202.676a.75.75%200%200%200%201.299.75l1.546-2.676.846%201.465a.755.755%200%200%200%20.65.375.737.737%200%200%200%20.375-.103.747.747%200%200%200%20.274-1.022l-1.279-2.215%201.05-1.82%202.515%204.354a.75.75%200%200%200%201.299-.75l-2.947-5.104%201.013-1.756a6.72%206.72%200%200%200%205.415%200l1.014%201.756-2.947%205.104a.75.75%200%200%200%201.298.75l2.515-4.354%201.053%201.82-1.277%202.213a.75.75%200%200%200%201.298.75l.844-1.463%201.545%202.678c.141.24.393.375.65.375a.75.75%200%200%200%20.649-1.125l-1.548-2.678h1.689a.75.75%200%200%200%200-1.5h-2.557l-1.051-1.82%205.029.002a.75.75%200%200%200%200-1.5l-5.896-.002-1.019-1.76a6.75%206.75%200%200%200%202.711-4.685h2.023l2.947%205.104a.753.753%200%200%200%201.025.273.749.749%200%200%200%20.272-1.023l-2.515-4.354h2.104l1.279%202.215a.75.75%200%200%200%20.649.375c.127%200%20.256-.03.375-.103a.748.748%200%200%200%20.273-1.022l-.848-1.465h3.092a.75.75%200%200%200%20.003-1.5zm-12.136.75c0%20.257-.041.502-.076.75a5.223%205.223%200%200%201-1.943%203.358%205.242%205.242%200%200%201-1.291.766%205.224%205.224%200%200%201-1.949.384%205.157%205.157%200%200%201-3.239-1.15%205.22%205.22%200%200%201-1.943-3.358c-.036-.247-.076-.493-.076-.75s.04-.503.076-.75a5.22%205.22%200%200%201%201.944-3.359c.393-.312.82-.576%201.291-.765a5.219%205.219%200%200%201%201.948-.384c.69%200%201.344.142%201.948.384.471.188.898.454%201.291.765a5.222%205.222%200%200%201%201.943%203.359c.035.247.076.493.076.75z'%20fill=':color:'/%3e%3c/svg%3e",ao=new WeakSet;class ms extends Ft{constructor(t){super(t)}update(t,[o,i]){return ao.has(t)||(o(),ao.add(t)),this.render(o,i)}render(t,o){return o()}}const lo=Ht(ms);var bs=Object.defineProperty,ys=Object.getOwnPropertyDescriptor,Ae=(e,t,o,i)=>{for(var r=i>1?void 0:i?ys(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=(i?n(t,o,r):n(r))||r);return i&&r&&bs(t,o,r),r};let Mt=class extends v{constructor(){super(...arguments),this.snowing=!1}render(){return l`
      ${this.startButtonTemplate} ${this.clearButtonTemplate}
      <img src=${fs} alt="Snowflakes icon" />
    `}willUpdate(e){e.has("snowConfig")&&(this.snowflakes?.destroy(),this.snowflakes=void 0,this.startSnowing())}get startButtonTemplate(){return lo(async()=>{await Pt(()=>Promise.resolve().then(()=>Me),void 0,import.meta.url)},()=>l`
        <ia-button
          @click=${()=>{this.snowing?this.stopSnowing():this.startSnowing()}}
        >
          ${this.snowing?"Stop Snowflakes":"Start Snowflakes"}
        </ia-button>
      `)}get clearButtonTemplate(){return lo(async()=>{await Pt(()=>Promise.resolve().then(()=>Me),void 0,import.meta.url)},()=>l`
        <ia-button
          @click=${()=>{this.snowflakes?.destroy()}}
        >
          Clear Snowflakes
        </ia-button>
      `)}async startSnowing(){if(!this.snowflakes){const t=(await Pt(()=>import("./snowflakes.esm-Dz_MTlsm.js"),[],import.meta.url)).default;this.snowflakes=new t(this.snowConfig)}this.snowflakes?.start(),this.snowing=!0}stopSnowing(){this.snowflakes?.stop(),this.snowing=!1}static get styles(){return b`
      img {
        width: 16px;
        filter: invert(1);
        vertical-align: middle;
      }
    `}};Ae([c({type:Object})],Mt.prototype,"snowConfig",2);Ae([g()],Mt.prototype,"snowing",2);Mt=Ae([S("ia-snow")],Mt);var vs=Object.defineProperty,ws=Object.getOwnPropertyDescriptor,yt=(e,t,o,i)=>{for(var r=i>1?void 0:i?ws(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=(i?n(t,o,r):n(r))||r);return i&&r&&vs(t,o,r),r};let Y=class extends v{render(){return l`
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
    `}};yt([g()],Y.prototype,"config",2);yt([y("#count")],Y.prototype,"countInput",2);yt([y("#wind")],Y.prototype,"windInput",2);yt([y("#rotation")],Y.prototype,"rotationInput",2);yt([y("#color")],Y.prototype,"colorInput",2);Y=yt([S("ia-snow-story")],Y);const $s=Object.freeze(Object.defineProperty({__proto__:null,get IASnowStory(){return Y}},Symbol.toStringTag,{value:"Module"}));var xs=Object.getOwnPropertyDescriptor,_s=(e,t,o,i)=>{for(var r=i>1?void 0:i?xs(t,o):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(r=n(r)||r);return r};const Ss=Object.assign({"../src/elements/ia-button/ia-button-story.ts":Ti,"../src/elements/ia-combo-box/ia-combo-box-story.ts":Ji,"../src/elements/ia-dropdown-search-bar/ia-dropdown-search-bar-story.ts":Ir,"../src/elements/ia-dropdown/ia-dropdown-story.ts":Ur,"../src/elements/ia-otp-form/ia-otp-form-story.ts":Xr,"../src/elements/ia-otp-input/ia-otp-input-story.ts":rs,"../src/elements/ia-sr-only-text/ia-sr-only-text-story.ts":ds,"../src/elements/ia-status-indicator/ia-status-indicator-story.ts":gs,"../src/labs/ia-snow/ia-snow-story.ts":$s}),Eo=Object.keys(Ss).map(e=>{const t=e.includes("/src/labs/"),o=e.split("/"),r=o[o.length-1].replace(/-story\.ts$/,"");return{tag:r,storyTag:`${r}-story`,id:`elem-${r}`,labs:t}}).sort((e,t)=>e.tag.localeCompare(t.tag)),ue=Eo.filter(e=>!e.labs),ge=Eo.filter(e=>e.labs),Cs=[...ue,...ge];let co=class extends v{constructor(){super(...arguments),this._abortController=new AbortController}createRenderRoot(){return this}render(){return l`
      <nav id="ia-sidebar">
        <h2>Production-Ready</h2>
        ${ue.map(e=>l`<a href="#${e.id}">&lt;${e.tag}&gt;</a>`)}
        <h2>Labs 🧪</h2>
        ${ge.map(e=>l`<a href="#${e.id}">&lt;${e.tag}&gt;</a>`)}
      </nav>
      <div id="ia-content">
        <h1>Internet Archive Elements</h1>
        <h2>Production-Ready Elements</h2>
        ${ue.map(e=>l`
          <div id="${e.id}" class="ia-anchor">
            ${St(`<${e.storyTag}></${e.storyTag}>`)}
          </div>
        `)}
        <h2>Labs Elements</h2>
        ${ge.map(e=>l`
          <div id="${e.id}" class="ia-anchor">
            ${St(`<${e.storyTag}></${e.storyTag}>`)}
          </div>
        `)}
      </div>
    `}firstUpdated(){const e=Cs.map(i=>i.id),t=Object.fromEntries(e.map(i=>[i,this.querySelector(`#ia-sidebar a[href="#${i}"]`)])),o=new Set;this._observer=new IntersectionObserver(i=>{for(const s of i)s.isIntersecting?o.add(s.target.id):o.delete(s.target.id);const r=e.find(s=>o.has(s))??e[0];e.forEach(s=>t[s]?.classList.toggle("active",s===r))},{rootMargin:"0px 0px -70% 0px"}),e.forEach(i=>{const r=document.getElementById(i);r&&this._observer.observe(r)}),e.forEach(i=>{t[i]?.addEventListener("click",r=>{r.preventDefault();const s=document.getElementById(i);if(s){const n=s.getBoundingClientRect().top+window.scrollY;window.scrollTo({top:Math.max(0,n-16),behavior:"smooth"})}},{signal:this._abortController.signal})})}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._abortController.abort()}};co=_s([S("app-root")],co);
