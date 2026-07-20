(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();const vt=globalThis,ki=vt.ShadowRoot&&(vt.ShadyCSS===void 0||vt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Pi=Symbol(),Zi=new WeakMap;let Xr=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==Pi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(ki&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=Zi.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&Zi.set(t,e))}return e}toString(){return this.cssText}};const zo=i=>new Xr(typeof i=="string"?i:i+"",void 0,Pi),_=(i,...e)=>{const t=i.length===1?i[0]:e.reduce(((r,o,a)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+i[a+1]),i[0]);return new Xr(t,i,Pi)},Do=(i,e)=>{if(ki)i.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const t of e){const r=document.createElement("style"),o=vt.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=t.cssText,i.appendChild(r)}},Ji=ki?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return zo(t)})(i):i;const{is:Ro,defineProperty:Lo,getOwnPropertyDescriptor:No,getOwnPropertyNames:Uo,getOwnPropertySymbols:jo,getPrototypeOf:Ho}=Object,Bt=globalThis,Yi=Bt.trustedTypes,Fo=Yi?Yi.emptyScript:"",qo=Bt.reactiveElementPolyfillSupport,it=(i,e)=>i,$t={toAttribute(i,e){switch(e){case Boolean:i=i?Fo:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Mi=(i,e)=>!Ro(i,e),Xi={attribute:!0,type:String,converter:$t,reflect:!1,useDefault:!1,hasChanged:Mi};Symbol.metadata??=Symbol("metadata"),Bt.litPropertyMetadata??=new WeakMap;let ze=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Xi){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),o=this.getPropertyDescriptor(e,r,t);o!==void 0&&Lo(this.prototype,e,o)}}static getPropertyDescriptor(e,t,r){const{get:o,set:a}=No(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:o,set(n){const l=o?.call(this);a?.call(this,n),this.requestUpdate(e,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Xi}static _$Ei(){if(this.hasOwnProperty(it("elementProperties")))return;const e=Ho(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(it("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(it("properties"))){const t=this.properties,r=[...Uo(t),...jo(t)];for(const o of r)this.createProperty(o,t[o])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[r,o]of t)this.elementProperties.set(r,o)}this._$Eh=new Map;for(const[t,r]of this.elementProperties){const o=this._$Eu(t,r);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const o of r)t.unshift(Ji(o))}else e!==void 0&&t.push(Ji(e));return t}static _$Eu(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Do(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){const r=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,r);if(o!==void 0&&r.reflect===!0){const a=(r.converter?.toAttribute!==void 0?r.converter:$t).toAttribute(t,r.type);this._$Em=e,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$Em=null}}_$AK(e,t){const r=this.constructor,o=r._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const a=r.getPropertyOptions(o),n=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:$t;this._$Em=o;const l=n.fromAttribute(t,a.type);this[o]=l??this._$Ej?.get(o)??l,this._$Em=null}}requestUpdate(e,t,r){if(e!==void 0){const o=this.constructor,a=this[e];if(r??=o.getPropertyOptions(e),!((r.hasChanged??Mi)(a,t)||r.useDefault&&r.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:o,wrapped:a},n){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),a!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,a]of this._$Ep)this[o]=a;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,a]of r){const{wrapped:n}=a,l=this[o];n!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,a,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((r=>r.hostUpdate?.())),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};ze.elementStyles=[],ze.shadowRootOptions={mode:"open"},ze[it("elementProperties")]=new Map,ze[it("finalized")]=new Map,qo?.({ReactiveElement:ze}),(Bt.reactiveElementVersions??=[]).push("2.1.1");const Ii=globalThis,xt=Ii.trustedTypes,Qi=xt?xt.createPolicy("lit-html",{createHTML:i=>i}):void 0,Qr="$lit$",le=`lit$${Math.random().toFixed(9).slice(2)}$`,eo="?"+le,Ko=`<${eo}>`,Ae=document,ot=()=>Ae.createComment(""),at=i=>i===null||typeof i!="object"&&typeof i!="function",Bi=Array.isArray,Wo=i=>Bi(i)||typeof i?.[Symbol.iterator]=="function",Ht=`[ 	
\f\r]`,Xe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,er=/-->/g,tr=/>/g,fe=RegExp(`>|${Ht}(?:([^\\s"'>=/]+)(${Ht}*=${Ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ir=/'/g,rr=/"/g,to=/^(?:script|style|textarea|title)$/i,io=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),d=io(1),or=io(2),K=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),ar=new WeakMap,$e=Ae.createTreeWalker(Ae,129);function ro(i,e){if(!Bi(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Qi!==void 0?Qi.createHTML(e):e}const Go=(i,e)=>{const t=i.length-1,r=[];let o,a=e===2?"<svg>":e===3?"<math>":"",n=Xe;for(let l=0;l<t;l++){const s=i[l];let p,g,h=-1,v=0;for(;v<s.length&&(n.lastIndex=v,g=n.exec(s),g!==null);)v=n.lastIndex,n===Xe?g[1]==="!--"?n=er:g[1]!==void 0?n=tr:g[2]!==void 0?(to.test(g[2])&&(o=RegExp("</"+g[2],"g")),n=fe):g[3]!==void 0&&(n=fe):n===fe?g[0]===">"?(n=o??Xe,h=-1):g[1]===void 0?h=-2:(h=n.lastIndex-g[2].length,p=g[1],n=g[3]===void 0?fe:g[3]==='"'?rr:ir):n===rr||n===ir?n=fe:n===er||n===tr?n=Xe:(n=fe,o=void 0);const b=n===fe&&i[l+1].startsWith("/>")?" ":"";a+=n===Xe?s+Ko:h>=0?(r.push(p),s.slice(0,h)+Qr+s.slice(h)+le+b):s+le+(h===-2?l:b)}return[ro(i,a+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};let li=class oo{constructor({strings:e,_$litType$:t},r){let o;this.parts=[];let a=0,n=0;const l=e.length-1,s=this.parts,[p,g]=Go(e,t);if(this.el=oo.createElement(p,r),$e.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(o=$e.nextNode())!==null&&s.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(const h of o.getAttributeNames())if(h.endsWith(Qr)){const v=g[n++],b=o.getAttribute(h).split(le),A=/([.?@])?(.*)/.exec(v);s.push({type:1,index:a,name:A[2],strings:b,ctor:A[1]==="."?Jo:A[1]==="?"?Yo:A[1]==="@"?Xo:zt}),o.removeAttribute(h)}else h.startsWith(le)&&(s.push({type:6,index:a}),o.removeAttribute(h));if(to.test(o.tagName)){const h=o.textContent.split(le),v=h.length-1;if(v>0){o.textContent=xt?xt.emptyScript:"";for(let b=0;b<v;b++)o.append(h[b],ot()),$e.nextNode(),s.push({type:2,index:++a});o.append(h[v],ot())}}}else if(o.nodeType===8)if(o.data===eo)s.push({type:2,index:a});else{let h=-1;for(;(h=o.data.indexOf(le,h+1))!==-1;)s.push({type:7,index:a}),h+=le.length-1}a++}}static createElement(e,t){const r=Ae.createElement("template");return r.innerHTML=e,r}};function Ue(i,e,t=i,r){if(e===K)return e;let o=r!==void 0?t._$Co?.[r]:t._$Cl;const a=at(e)?void 0:e._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),a===void 0?o=void 0:(o=new a(i),o._$AT(i,t,r)),r!==void 0?(t._$Co??=[])[r]=o:t._$Cl=o),o!==void 0&&(e=Ue(i,o._$AS(i,e.values),o,r)),e}let Zo=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,o=(e?.creationScope??Ae).importNode(t,!0);$e.currentNode=o;let a=$e.nextNode(),n=0,l=0,s=r[0];for(;s!==void 0;){if(n===s.index){let p;s.type===2?p=new Vt(a,a.nextSibling,this,e):s.type===1?p=new s.ctor(a,s.name,s.strings,this,e):s.type===6&&(p=new Qo(a,this,e)),this._$AV.push(p),s=r[++l]}n!==s?.index&&(a=$e.nextNode(),n++)}return $e.currentNode=Ae,o}p(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},Vt=class ao{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,o){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ue(this,e,t),at(e)?e===y||e==null||e===""?(this._$AH!==y&&this._$AR(),this._$AH=y):e!==this._$AH&&e!==K&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Wo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==y&&at(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ae.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:r}=e,o=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=li.createElement(ro(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(t);else{const a=new Zo(o,this),n=a.u(this.options);a.p(t),this.T(n),this._$AH=a}}_$AC(e){let t=ar.get(e.strings);return t===void 0&&ar.set(e.strings,t=new li(e)),t}k(e){Bi(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,o=0;for(const a of e)o===t.length?t.push(r=new ao(this.O(ot()),this.O(ot()),this,this.options)):r=t[o],r._$AI(a),o++;o<t.length&&(this._$AR(r&&r._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},zt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,o,a){this.type=1,this._$AH=y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=a,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=y}_$AI(e,t=this,r,o){const a=this.strings;let n=!1;if(a===void 0)e=Ue(this,e,t,0),n=!at(e)||e!==this._$AH&&e!==K,n&&(this._$AH=e);else{const l=e;let s,p;for(e=a[0],s=0;s<a.length-1;s++)p=Ue(this,l[r+s],t,s),p===K&&(p=this._$AH[s]),n||=!at(p)||p!==this._$AH[s],p===y?e=y:e!==y&&(e+=(p??"")+a[s+1]),this._$AH[s]=p}n&&!o&&this.j(e)}j(e){e===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Jo=class extends zt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===y?void 0:e}},Yo=class extends zt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==y)}},Xo=class extends zt{constructor(e,t,r,o,a){super(e,t,r,o,a),this.type=5}_$AI(e,t=this){if((e=Ue(this,e,t,0)??y)===K)return;const r=this._$AH,o=e===y&&r!==y||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,a=e!==y&&(r===y||o);o&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Qo=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){Ue(this,e)}};const ea={I:Vt},ta=Ii.litHtmlPolyfillSupport;ta?.(li,Vt),(Ii.litHtmlVersions??=[]).push("3.3.1");const no=(i,e,t)=>{const r=t?.renderBefore??e;let o=r._$litPart$;if(o===void 0){const a=t?.renderBefore??null;r._$litPart$=o=new Vt(e.insertBefore(ot(),a),a,void 0,t??{})}return o._$AI(i),o};const Vi=globalThis;let x=class extends ze{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=no(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}};x._$litElement$=!0,x.finalized=!0,Vi.litElementHydrateSupport?.({LitElement:x});const ia=Vi.litElementPolyfillSupport;ia?.({LitElement:x});(Vi.litElementVersions??=[]).push("4.2.1");const C=i=>(e,t)=>{t!==void 0?t.addInitializer((()=>{customElements.define(i,e)})):customElements.define(i,e)};const ra={attribute:!0,type:String,converter:$t,reflect:!1,hasChanged:Mi},oa=(i=ra,e,t)=>{const{kind:r,metadata:o}=t;let a=globalThis.litPropertyMetadata.get(o);if(a===void 0&&globalThis.litPropertyMetadata.set(o,a=new Map),r==="setter"&&((i=Object.create(i)).wrapped=!0),a.set(t.name,i),r==="accessor"){const{name:n}=t;return{set(l){const s=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,s,i)},init(l){return l!==void 0&&this.C(n,void 0,i,l),l}}}if(r==="setter"){const{name:n}=t;return function(l){const s=this[n];e.call(this,l),this.requestUpdate(n,s,i)}}throw Error("Unsupported decorator location: "+r)};function u(i){return(e,t)=>typeof t=="object"?oa(i,e,t):((r,o,a)=>{const n=o.hasOwnProperty(a);return o.constructor.createProperty(a,r),n?Object.getOwnPropertyDescriptor(o,a):void 0})(i,e,t)}function w(i){return u({...i,state:!0,attribute:!1})}const so=(i,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(i,e,t),t);function S(i,e){return(t,r,o)=>{const a=n=>n.renderRoot?.querySelector(i)??null;return so(t,r,{get(){return a(this)}})}}let aa;function zi(i){return(e,t)=>so(e,t,{get(){return(this.renderRoot??(aa??=document.createDocumentFragment())).querySelectorAll(i)}})}function we(i,e,t){return i?e(i):t?.(i)}const xe=i=>i??y,na="modulepreload",sa=function(i,e){return new URL(i,e).href},nr={},bt=function(e,t,r){let o=Promise.resolve();if(t&&t.length>0){let p=function(g){return Promise.all(g.map(h=>Promise.resolve(h).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};const n=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),s=l?.nonce||l?.getAttribute("nonce");o=p(t.map(g=>{if(g=sa(g,r),g in nr)return;nr[g]=!0;const h=g.endsWith(".css"),v=h?'[rel="stylesheet"]':"";if(r)for(let A=n.length-1;A>=0;A--){const k=n[A];if(k.href===g&&(!h||k.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${g}"]${v}`))return;const b=document.createElement("link");if(b.rel=h?"stylesheet":na,h||(b.as="script"),b.crossOrigin="",b.href=g,s&&b.setAttribute("nonce",s),document.head.appendChild(b),h)return new Promise((A,k)=>{b.addEventListener("load",A),b.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${g}`)))})}))}function a(n){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=n,window.dispatchEvent(l),!l.defaultPrevented)throw n}return o.then(n=>{for(const l of n||[])l.status==="rejected"&&a(l.reason);return e().catch(a)})};const oe={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},gt=i=>(...e)=>({_$litDirective$:i,values:e});let mt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};let di=class extends mt{constructor(e){if(super(e),this.it=y,e.type!==oe.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===y||e==null)return this._t=void 0,this.it=e;if(e===K)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};di.directiveName="unsafeHTML",di.resultType=1;const ci=gt(di),la=_`
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
`;var da=Object.defineProperty,ca=Object.getOwnPropertyDescriptor,Dt=(i,e,t,r)=>{for(var o=r>1?void 0:r?ca(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&da(e,t,o),o};let nt=class extends x{constructor(){super(...arguments),this.code="",this.language="auto",this.highlightedCode=""}willUpdate(i){(i.has("code")||i.has("language"))&&this.highlightCode()}render(){return d`
      <pre><code class="hljs">${ci(this.highlightedCode)}</code></pre>
    `}async highlightCode(){const e=(await bt(()=>import("./index-BBc-AmEf.js"),[],import.meta.url)).default,t=this.code.trim();let r;this.language==="auto"?r=e.highlightAuto(t).value:r=e.highlight(t,{language:this.language}).value,this.highlightedCode=r}static get styles(){return[la]}};Dt([u({type:String})],nt.prototype,"code",2);Dt([u({type:String})],nt.prototype,"language",2);Dt([w()],nt.prototype,"highlightedCode",2);nt=Dt([C("syntax-highlighter")],nt);const z=_`
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
`,ha="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='36pt'%20height='36pt'%20viewBox='0%200%2036%2036'%20version='1.1'%3e%3cg%20id='surface35'%3e%3cpath%20style='%20stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;'%20d='M%2013.5%206.1875%20C%2012.878906%206.1875%2012.375%206.691406%2012.375%207.3125%20C%2012.375%207.933594%2012.878906%208.4375%2013.5%208.4375%20L%2014.0625%208.4375%20L%2014.0625%2013.523438%20C%2014.0625%2014.453125%2013.78125%2015.34375%2013.246094%2016.105469%20L%206.84375%2025.238281%20C%206.140625%2026.238281%206.054688%2027.535156%206.621094%2028.617188%20C%207.183594%2029.703125%208.292969%2030.375%209.515625%2030.375%20L%2026.484375%2030.375%20C%2027.707031%2030.375%2028.816406%2029.703125%2029.378906%2028.617188%20C%2029.941406%2027.535156%2029.859375%2026.238281%2029.15625%2025.238281%20L%2022.753906%2016.105469%20C%2022.21875%2015.34375%2021.9375%2014.453125%2021.9375%2013.523438%20L%2021.9375%208.4375%20L%2022.5%208.4375%20C%2023.121094%208.4375%2023.625%207.933594%2023.625%207.3125%20C%2023.625%206.691406%2023.121094%206.1875%2022.5%206.1875%20Z%20M%2016.3125%208.4375%20L%2019.6875%208.4375%20L%2019.6875%2013.523438%20C%2019.6875%2014.914062%2020.109375%2016.257812%2020.910156%2017.398438%20L%2020.941406%2017.4375%20L%2015.0625%2017.4375%20L%2015.089844%2017.398438%20C%2015.890625%2016.257812%2016.3125%2014.914062%2016.3125%2013.523438%20Z%20M%2015.1875%2020.8125%20C%2015.808594%2020.8125%2016.3125%2021.316406%2016.3125%2021.9375%20C%2016.3125%2022.558594%2015.808594%2023.0625%2015.1875%2023.0625%20C%2014.566406%2023.0625%2014.0625%2022.558594%2014.0625%2021.9375%20C%2014.0625%2021.316406%2014.566406%2020.8125%2015.1875%2020.8125%20Z%20M%2020.53125%2023.0625%20C%2021.617188%2023.0625%2022.5%2023.945312%2022.5%2025.03125%20C%2022.5%2026.117188%2021.617188%2027%2020.53125%2027%20C%2019.445312%2027%2018.5625%2026.117188%2018.5625%2025.03125%20C%2018.5625%2023.945312%2019.445312%2023.0625%2020.53125%2023.0625%20Z%20M%2020.53125%2023.0625%20'/%3e%3c/g%3e%3c/svg%3e";function hi(i){return i.toLowerCase().split(" ").join("-")}var pa=Object.defineProperty,ua=Object.getOwnPropertyDescriptor,Di=(i,e,t,r)=>{for(var o=r>1?void 0:r?ua(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&pa(e,t,o),o};let _t=class extends x{render(){return this.styleInputData?d`
      <div class="settings-options">
        <table>
          ${this.styleInputData.settings.map(i=>this.renderStyleRow(i))}
        </table>
        <button @click=${this.applyStyles}>Apply</button>
      </div>
    `:y}renderStyleRow(i){const e=hi(i.label),t=i.inputType==="number"||i.inputType==="range";return d`
      <tr>
        <td>
          <label for=${e}>${i.label}</label>
        </td>
        <td class="style-input-cell">
          <input
            id=${e}
            class="style-input"
            type=${i.inputType??"text"}
            min=${xe(t?i.min:void 0)}
            max=${xe(t?i.max:void 0)}
            step=${xe(t?i.step:void 0)}
            value=${i.defaultValue}
            data-variable=${i.cssVariable}
            data-unit=${xe(i.unit)}
            @input=${i.inputType==="range"?this.updateRangeReadout:void 0}
          />
          ${i.inputType==="range"?d`<output class="style-readout" for=${e}
                >${i.defaultValue}${i.unit??""}</output
              >`:y}
        </td>
      </tr>
    `}updateRangeReadout(i){const e=i.currentTarget,t=this.renderRoot.querySelector(`output[for="${CSS.escape(e.id)}"]`);if(!t)return;const r=e.dataset.unit??"";t.textContent=`${e.value}${r}`}applyStyles(){const i=[];this.styleInputs?.forEach(e=>{if(!e.dataset.variable||!e.value)return;const t=e.dataset.unit??"";i.push(`${e.dataset.variable}: ${e.value}${t};`)}),this.dispatchEvent(new CustomEvent("stylesApplied",{detail:{styles:i.join(`
 `)}}))}static get styles(){return[z,_`
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
      `]}};Di([u({type:Object})],_t.prototype,"styleInputData",2);Di([zi(".style-input")],_t.prototype,"styleInputs",2);_t=Di([C("story-styles-settings")],_t);const lo=(i,e,t)=>{for(const r of e)if(r[0]===i)return(0,r[1])();return t?.()};var ga=Object.defineProperty,ma=Object.getOwnPropertyDescriptor,Ri=(i,e,t,r)=>{for(var o=r>1?void 0:r?ma(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&ga(e,t,o),o};let St=class extends x{render(){return this.propInputData?d`
      <div class="settings-options">
        <table>
          ${this.propInputData.settings.map(i=>lo(i.inputType,[["radio",()=>this.createRadioPropInput(i)]],()=>this.createDefaultPropInput(i))??y)}
        </table>
        <button @click=${this.applyProps}>Apply</button>
      </div>
    `:y}createDefaultPropInput(i){const e=hi(i.label);return d`
      <tr>
        <td><label for=${e}>${i.label}</label></td>
        <td>
          <input
            class="prop-input"
            type=${i.inputType??"text"}
            id=${e}
            data-prop=${i.propertyName}
            data-format=${typeof i.defaultValue}
            placeholder=${i.defaultValue}
          />
        </td>
      </tr>
    `}createRadioPropInput(i){if(i.inputType!=="radio"||!i.radioOptions)return y;const e=hi(i.label);return d`
      <tr>
        <td><legend>${i.label}</legend></td>
        <td>
          ${i.radioOptions.map(t=>d`<input
                  type="radio"
                  class="prop-input"
                  name=${e}
                  id="${e}-${t}"
                  value=${t}
                  data-prop=${i.propertyName}
                  data-format=${typeof i.defaultValue}
                  ?checked=${i.defaultValue===t}
                /><label for="${e}-${t}"> ${t} </label>`)}
        </td>
      </tr>
    `}applyProps(){const i=[],e=[];this.propInputs?.forEach(t=>{if(!t.dataset.prop||!t.value||t.type==="radio"&&!t.checked)return;const r=t.dataset.prop;let o=t.value;switch(t.dataset.format){case"number":o=parseInt(o);break;case"boolean":o==="true"&&(o=!0),o==="false"&&(o=!1);break}const a=typeof o=="string"?`'${o}'`:o.toString();i.push(`.${r}=\${${a}}`),e.push({propName:r,value:o})}),this.dispatchEvent(new CustomEvent("propsApplied",{detail:{stringifiedProps:i.join(`
  `),appliedProps:e}}))}static get styles(){return[z,_`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }
      `]}};Ri([u({type:Object})],St.prototype,"propInputData",2);Ri([zi(".prop-input")],St.prototype,"propInputs",2);St=Ri([C("story-props-settings")],St);var fa=Object.defineProperty,va=Object.getOwnPropertyDescriptor,L=(i,e,t,r)=>{for(var o=r>1?void 0:r?va(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&fa(e,t,o),o};let R=class extends x{constructor(){super(...arguments),this.elementTag="",this.elementClassName="",this.labs=!1,this.detailsVisible=!1,this.shouldShowPropertySettings=!1,this.shouldShowUsageNotes=!1,this.copiedKey=null}render(){return d`
      <div id="container">
        <h2>
          <code>&lt;${this.elementTag}&gt;</code>
          ${we(this.labs,()=>d`<img
                src=${ha}
                alt="Labs icon"
                title="Labs"
                class="labs-icon"
              />`)}
        </h2>
        <h3>Demo</h3>
        <div class="slot-container" style=${xe(this.stringifiedStyles)}>
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
      ${we(this.cssCode,()=>d`
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
          ${we(!!this.propInputData,()=>d`
              <story-props-settings
                .propInputData=${this.propInputData}
                @propsApplied=${this.handlePropsApplied}
              ></story-props-settings>
            `)}
          ${we(!this.propInputData&&!this.shouldShowPropertySettings,()=>d`<p class="section-placeholder">No settings to adjust</p>`)}
          <div
            class="slot-container ${this.shouldShowPropertySettings?"":"hidden"}"
            @slotchange=${this.handleSettingsSlotChange}
          >
            <slot name="settings"></slot>
          </div>
        </div>
        <div class="right-col">
          <h3>Styles</h3>
          ${we(!!this.styleInputData,()=>d`
              <story-styles-settings
                .styleInputData=${this.styleInputData}
                @stylesApplied=${this.handleStylesApplied}
              ></story-styles-settings>
            `,()=>d`<p class="section-placeholder">No styles to adjust</p>`)}
        </div>
      </div>
      ${we(this.shouldShowUsageNotes,()=>d` <h3>Usage Notes</h3>`)}
      <div class="slot-container">
        <slot
          name="usage-notes"
          @slotchange=${this.handleUsageNotesSlotChange}
        ></slot>
      </div>
    `}async copyToClipboard(i,e){try{await navigator.clipboard.writeText(i),this.copiedKey=e,clearTimeout(this._copyTimeout),this._copyTimeout=setTimeout(()=>this.copiedKey=null,2e3)}catch(t){console.warn("Clipboard write failed:",t)}}get importCode(){return this.elementClassName?`import '${this.modulePath}';
import { ${this.elementClassName} } from '${this.modulePath}';`:`import '${this.modulePath}';`}get exampleUsage(){const i=this.defaultUsageProps?"  "+this.defaultUsageProps+`
`:"",e=this.stringifiedProps?"  "+this.stringifiedProps+`
`:"",t=!!i||!!e,r=this.defaultSlottedContent&&t?`
 `+this.defaultSlottedContent+`
`:this.defaultSlottedContent;return`<${this.elementTag}${t?`
`:""}${i}${e}>${r??""}</${this.elementTag}>`}get cssCode(){return this.stringifiedStyles?`${this.elementTag} {
 ${this.stringifiedStyles}
}`:""}get modulePath(){return this.labs?`@internetarchive/elements/labs/${this.elementTag}/${this.elementTag}`:`@internetarchive/elements/${this.elementTag}/${this.elementTag}`}handleSettingsSlotChange(i){const e=i.target.assignedElements();this.shouldShowPropertySettings=e.length>0}handleUsageNotesSlotChange(i){const e=i.target.assignedElements();this.shouldShowUsageNotes=e.length>0}handleDemoComponentSlotted(i){const e=i.target.assignedElements()[0];e&&(this.slottedDemoComponent=e)}handleStylesApplied(i){const e=i.detail.styles;e&&(this.stringifiedStyles=e)}handlePropsApplied(i){const e=i.detail.stringifiedProps,t=i.detail.appliedProps;!e||!t||(this.stringifiedProps=e,t.forEach(r=>{this.slottedDemoComponent[r.propName]=r.value}))}static get styles(){return[z,_`
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
      `]}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._copyTimeout)}};L([u({type:String})],R.prototype,"elementTag",2);L([u({type:String})],R.prototype,"elementClassName",2);L([u({type:String})],R.prototype,"customExampleUsage",2);L([u({type:String})],R.prototype,"defaultUsageProps",2);L([u({type:String})],R.prototype,"defaultSlottedContent",2);L([u({type:Object})],R.prototype,"styleInputData",2);L([u({type:Object})],R.prototype,"propInputData",2);L([u({type:Boolean})],R.prototype,"labs",2);L([w()],R.prototype,"detailsVisible",2);L([w()],R.prototype,"stringifiedStyles",2);L([w()],R.prototype,"stringifiedProps",2);L([w()],R.prototype,"shouldShowPropertySettings",2);L([w()],R.prototype,"shouldShowUsageNotes",2);L([w()],R.prototype,"slottedDemoComponent",2);L([w()],R.prototype,"copiedKey",2);R=L([C("story-template")],R);const ba=i=>typeof i!="string"&&"strTag"in i,ya=(i,e,t)=>{let r=i[0];for(let o=1;o<i.length;o++)r+=e[o-1],r+=i[o];return r};const wa=(i=>ba(i)?ya(i.strings,i.values):i);let U=wa;class $a{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}for(let i=0;i<256;i++)(i>>4&15).toString(16)+(i&15).toString(16);let xa=new $a;xa.resolve();var _a=Object.defineProperty,Sa=Object.getOwnPropertyDescriptor,Ge=(i,e,t,r)=>{for(var o=r>1?void 0:r?Sa(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&_a(e,t,o),o};let Oe=class extends x{constructor(){super(...arguments),this.loadingTitle=U("Loading..."),this.successTitle=U("Success"),this.errorTitle=U("Error"),this.loadingStyle="ring-dots",this.mode="loading"}render(){return d`${lo(this.mode,[["ready",()=>this.placeholderTemplate],["loading",()=>this.loadingIndicatorTemplate],["success",()=>this.successIndicatorTemplate],["error",()=>this.errorIndicatorTemplate]])}`}get placeholderTemplate(){return d`<div class="placeholder"></div>`}get loadingIndicatorTemplate(){return d`
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
    `}get shouldShowLoadingDots(){return this.loadingStyle!=="ring"}static get styles(){return[z,_`
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
      `]}};Ge([u({type:String})],Oe.prototype,"loadingTitle",2);Ge([u({type:String})],Oe.prototype,"successTitle",2);Ge([u({type:String})],Oe.prototype,"errorTitle",2);Ge([u({type:String})],Oe.prototype,"loadingStyle",2);Ge([u({type:String})],Oe.prototype,"mode",2);Oe=Ge([C("ia-status-indicator")],Oe);var Ca=Object.defineProperty,Aa=Object.getOwnPropertyDescriptor,ue=(i,e,t,r)=>{for(var o=r>1?void 0:r?Aa(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&Ca(e,t,o),o};let Y=class extends x{constructor(){super(...arguments),this.mode="primary",this.loading=!1,this.disabled=!1,this.loadingText="",this.type="button",this.openLinksNewTab=!1}render(){return d`
      ${this.href?d`<a
            href=${this.href}
            target=${this.openLinksNewTab?"_blank":"_self"}
            >${this.buttonTemplate}</a
          >`:this.buttonTemplate}
      <slot name="hidden-button"></slot>
    `}willUpdate(i){i.has("type")&&this.setButtonTypeEmulation()}get buttonTemplate(){return d`
      <button
        part="button"
        class=${this.mode}
        ?disabled=${this.disabled||this.loading}
      >
        ${this.buttonTextTemplate}
      </button>
    `}get buttonTextTemplate(){return this.loading?this.loadingStateTemplate:d`<slot></slot>`}get loadingStateTemplate(){return d`
      <span class="loading-indicator" alt="Loading indicator">
        <ia-status-indicator mode="loading"></ia-status-indicator> ${U(this.loadingText)}
      </span>
    `}setButtonTypeEmulation(){const i=this.querySelector("input.hidden-button");if(i){i.type=this.type;return}this.addHiddenButton(),this.addEventListener("click",this.handleComponentClick)}handleComponentClick(i){if(this.type==="button"||i instanceof CustomEvent&&i.detail.formActionsInProgress)return;this.querySelector("input.hidden-button").dispatchEvent(new PointerEvent("click"))}addHiddenButton(){this.type!=="button"&&no(d`<input
        type=${this.type}
        class="hidden-button"
        style="display:none"
        slot="hidden-button"
        @click=${i=>this.handleFormActions(i)}
      />`,this)}handleFormActions(i){i.stopPropagation(),i.isTrusted&&this.dispatchEvent(new CustomEvent("click",{detail:{formActionsInProgress:!0}}))}static get styles(){return[z,_`
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
      `]}};ue([u({type:String})],Y.prototype,"mode",2);ue([u({type:Boolean})],Y.prototype,"loading",2);ue([u({type:Boolean})],Y.prototype,"disabled",2);ue([u({type:String})],Y.prototype,"loadingText",2);ue([u({type:String,reflect:!0})],Y.prototype,"type",2);ue([u({type:String})],Y.prototype,"href",2);ue([u({type:Boolean})],Y.prototype,"openLinksNewTab",2);Y=ue([C("ia-button")],Y);const sr=Object.freeze(Object.defineProperty({__proto__:null,get IAButton(){return Y}},Symbol.toStringTag,{value:"Module"}));var Oa=Object.getOwnPropertyDescriptor,Ta=(i,e,t,r)=>{for(var o=r>1?void 0:r?Oa(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=n(o)||o);return o};const Ea=[{label:"Mode",propertyName:"mode",defaultValue:"primary",inputType:"radio",radioOptions:["primary","secondary","danger","warning","disabled","transparent","custom","link","danger-link"]},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Loading",propertyName:"loading",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Loading text",propertyName:"loadingText",defaultValue:"",inputType:"text"},{label:"Type",propertyName:"type",defaultValue:"button",inputType:"radio",radioOptions:["button","submit","reset"]},{label:"Link to attach to button",propertyName:"href",defaultValue:"",inputType:"text"},{label:"Open link in new tab",propertyName:"openLinksNewTab",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}],ka=[{label:"Button padding",cssVariable:"--ia-theme-button-padding",defaultValue:"0 1.875rem",inputType:"text"},{label:"Button width",cssVariable:"--ia-theme-button-width",defaultValue:"fit-content",inputType:"text"},{label:"Button height",cssVariable:"--ia-theme-button-height",defaultValue:"2.25rem",inputType:"text"},{label:"Button border width",cssVariable:"--ia-theme-button-border-width",defaultValue:"1px",inputType:"text"},{label:"Font",cssVariable:"--ia-theme-base-font-family",defaultValue:"'Helvetica Neue', Helvetica, Arial, sans-serif",inputType:"text"},{label:"Transition",cssVariable:"--ia-button-transition",defaultValue:"all 0.1s ease 0s",inputType:"text"},{label:"Text color (primary)",cssVariable:"--ia-theme-primary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (primary)",cssVariable:"--ia-theme-primary-cta-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (primary)",cssVariable:"--ia-theme-primary-cta-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Text color (secondary)",cssVariable:"--ia-theme-secondary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (secondary)",cssVariable:"--ia-theme-secondary-cta-fill",defaultValue:"#333333",inputType:"color"},{label:"Border color (secondary)",cssVariable:"--ia-theme-secondary-cta-border",defaultValue:"#666666",inputType:"color"},{label:"Text color (danger)",cssVariable:"--ia-theme-danger-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (danger)",cssVariable:"--ia-theme-danger-cta-fill",defaultValue:"#d9534f",inputType:"color"},{label:"Border color (danger)",cssVariable:"--ia-theme-danger-cta-border",defaultValue:"#d43f3a",inputType:"color"},{label:"Text color (warning)",cssVariable:"--ia-theme-warning-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (warning)",cssVariable:"--ia-theme-warning-cta-fill",defaultValue:"#ee8950",inputType:"color"},{label:"Border color (warning)",cssVariable:"--ia-theme-warning-cta-border",defaultValue:"#ec7939",inputType:"color"},{label:"Text color (disabled)",cssVariable:"--ia-theme-disabled-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (disabled)",cssVariable:"--ia-theme-disabled-cta-fill",defaultValue:"#666666",inputType:"color"},{label:"Border color (disabled)",cssVariable:"--ia-theme-disabled-cta-border",defaultValue:"#999999",inputType:"color"},{label:"Text color (custom)",cssVariable:"--ia-button-custom-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (custom)",cssVariable:"--ia-button-custom-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (custom)",cssVariable:"--ia-button-custom-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Text color (custom, on hover)",cssVariable:"--ia-button-custom-active-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Background color (custom, on hover)",cssVariable:"--ia-button-custom-active-fill",defaultValue:"#194880",inputType:"color"},{label:"Border color (custom, on hover)",cssVariable:"--ia-button-custom-active-border",defaultValue:"#c5d1df",inputType:"color"},{label:"Link color",cssVariable:"--ia-theme-link-color",defaultValue:"#4b64ff",inputType:"color"},{label:"Danger color",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}];let pi=class extends x{render(){return d`
      <story-template
        elementTag="ia-button"
        elementClassName="IAButton"
        .defaultUsageProps=${"@click=${() => alert('Button clicked!')}"}
        .defaultSlottedContent=${"Click Me"}
        .styleInputData=${{settings:ka}}
        .propInputData=${{settings:Ea}}
      >
        <ia-button slot="demo" @click=${()=>alert("Button clicked!")}>
          Click Me
        </ia-button>
      </story-template>
    `}};pi=Ta([C("ia-button-story")],pi);const Pa=Object.freeze(Object.defineProperty({__proto__:null,get IAButtonStory(){return pi}},Symbol.toStringTag,{value:"Module"})),co=JSON.parse(`[{"name":"Afghanistan","flag":"🇦🇫"},{"name":"Albania","flag":"🇦🇱"},{"name":"Algeria","flag":"🇩🇿"},{"name":"Andorra","flag":"🇦🇩"},{"name":"Angola","flag":"🇦🇴"},{"name":"Antigua and Barbuda","flag":"🇦🇬"},{"name":"Argentina","flag":"🇦🇷"},{"name":"Armenia","flag":"🇦🇲"},{"name":"Aruba","flag":"🇦🇼"},{"name":"Australia","flag":"🇦🇺"},{"name":"Austria","flag":"🇦🇹"},{"name":"Azerbaijan","flag":"🇦🇿"},{"name":"Bahamas","flag":"🇧🇸"},{"name":"Bahrain","flag":"🇧🇭"},{"name":"Bangladesh","flag":"🇧🇩"},{"name":"Barbados","flag":"🇧🇧"},{"name":"Belarus","flag":"🇧🇾"},{"name":"Belgium","flag":"🇧🇪"},{"name":"Belize","flag":"🇧🇿"},{"name":"Benin","flag":"🇧🇯"},{"name":"Bhutan","flag":"🇧🇹"},{"name":"Bolivia","flag":"🇧🇴"},{"name":"Bosnia and Herzegovina","flag":"🇧🇦"},{"name":"Botswana","flag":"🇧🇼"},{"name":"Brazil","flag":"🇧🇷"},{"name":"Brunei","flag":"🇧🇳"},{"name":"Bulgaria","flag":"🇧🇬"},{"name":"Burkina Faso","flag":"🇧🇫"},{"name":"Burundi","flag":"🇧🇮"},{"name":"Cabo Verde","flag":"🇨🇻"},{"name":"Cambodia","flag":"🇰🇭"},{"name":"Cameroon","flag":"🇨🇲"},{"name":"Canada","flag":"🇨🇦"},{"name":"Central African Republic","flag":"🇨🇫"},{"name":"Chad","flag":"🇹🇩"},{"name":"Chile","flag":"🇨🇱"},{"name":"China","flag":"🇨🇳"},{"name":"Colombia","flag":"🇨🇴"},{"name":"Comoros","flag":"🇰🇲"},{"name":"Cook Islands","flag":"🇨🇰"},{"name":"Costa Rica","flag":"🇨🇷"},{"name":"Côte d'Ivoire","flag":"🇨🇮"},{"name":"Croatia","flag":"🇭🇷"},{"name":"Cuba","flag":"🇨🇺"},{"name":"Cyprus","flag":"🇨🇾"},{"name":"Czechia","flag":"🇨🇿"},{"name":"Democratic Republic of the Congo","flag":"🇨🇩"},{"name":"Denmark","flag":"🇩🇰"},{"name":"Djibouti","flag":"🇩🇯"},{"name":"Dominica","flag":"🇩🇲"},{"name":"Dominican Republic","flag":"🇩🇴"},{"name":"Ecuador","flag":"🇪🇨"},{"name":"Egypt","flag":"🇪🇬"},{"name":"El Salvador","flag":"🇸🇻"},{"name":"Equatorial Guinea","flag":"🇬🇶"},{"name":"Eritrea","flag":"🇪🇷"},{"name":"Estonia","flag":"🇪🇪"},{"name":"Eswatini","flag":"🇸🇿"},{"name":"Ethiopia","flag":"🇪🇹"},{"name":"Fiji","flag":"🇫🇯"},{"name":"Finland","flag":"🇫🇮"},{"name":"France","flag":"🇫🇷"},{"name":"Gabon","flag":"🇬🇦"},{"name":"Gambia","flag":"🇬🇲"},{"name":"Georgia","flag":"🇬🇪"},{"name":"Germany","flag":"🇩🇪"},{"name":"Ghana","flag":"🇬🇭"},{"name":"Greece","flag":"🇬🇷"},{"name":"Grenada","flag":"🇬🇩"},{"name":"Guatemala","flag":"🇬🇹"},{"name":"Guinea","flag":"🇬🇳"},{"name":"Guinea-Bissau","flag":"🇬🇼"},{"name":"Guyana","flag":"🇬🇾"},{"name":"Haiti","flag":"🇭🇹"},{"name":"Honduras","flag":"🇭🇳"},{"name":"Hungary","flag":"🇭🇺"},{"name":"Iceland","flag":"🇮🇸"},{"name":"India","flag":"🇮🇳"},{"name":"Indonesia","flag":"🇮🇩"},{"name":"Iran","flag":"🇮🇷"},{"name":"Iraq","flag":"🇮🇶"},{"name":"Ireland","flag":"🇮🇪"},{"name":"Israel","flag":"🇮🇱"},{"name":"Italy","flag":"🇮🇹"},{"name":"Jamaica","flag":"🇯🇲"},{"name":"Japan","flag":"🇯🇵"},{"name":"Jordan","flag":"🇯🇴"},{"name":"Kazakhstan","flag":"🇰🇿"},{"name":"Kenya","flag":"🇰🇪"},{"name":"Kiribati","flag":"🇰🇮"},{"name":"Kosovo","flag":"🇽🇰"},{"name":"Kuwait","flag":"🇰🇼"},{"name":"Kyrgyzstan","flag":"🇰🇬"},{"name":"Laos","flag":"🇱🇦"},{"name":"Latvia","flag":"🇱🇻"},{"name":"Lebanon","flag":"🇱🇧"},{"name":"Lesotho","flag":"🇱🇸"},{"name":"Liberia","flag":"🇱🇷"},{"name":"Libya","flag":"🇱🇾"},{"name":"Liechtenstein","flag":"🇱🇮"},{"name":"Lithuania","flag":"🇱🇹"},{"name":"Luxembourg","flag":"🇱🇺"},{"name":"Madagascar","flag":"🇲🇬"},{"name":"Malawi","flag":"🇲🇼"},{"name":"Malaysia","flag":"🇲🇾"},{"name":"Maldives","flag":"🇲🇻"},{"name":"Mali","flag":"🇲🇱"},{"name":"Malta","flag":"🇲🇹"},{"name":"Marshall Islands","flag":"🇲🇭"},{"name":"Mauritania","flag":"🇲🇷"},{"name":"Mauritius","flag":"🇲🇺"},{"name":"Mexico","flag":"🇲🇽"},{"name":"Micronesia","flag":"🇫🇲"},{"name":"Moldova","flag":"🇲🇩"},{"name":"Monaco","flag":"🇲🇨"},{"name":"Mongolia","flag":"🇲🇳"},{"name":"Montenegro","flag":"🇲🇪"},{"name":"Morocco","flag":"🇲🇦"},{"name":"Mozambique","flag":"🇲🇿"},{"name":"Myanmar","flag":"🇲🇲"},{"name":"Namibia","flag":"🇳🇦"},{"name":"Nauru","flag":"🇳🇷"},{"name":"Nepal","flag":"🇳🇵"},{"name":"Netherlands","flag":"🇳🇱"},{"name":"New Zealand","flag":"🇳🇿"},{"name":"Nicaragua","flag":"🇳🇮"},{"name":"Niue","flag":"🇳🇺"},{"name":"Niger","flag":"🇳🇪"},{"name":"Nigeria","flag":"🇳🇬"},{"name":"North Korea","flag":"🇰🇵"},{"name":"North Macedonia","flag":"🇲🇰"},{"name":"Norway","flag":"🇳🇴"},{"name":"Oman","flag":"🇴🇲"},{"name":"Pakistan","flag":"🇵🇰"},{"name":"Palau","flag":"🇵🇼"},{"name":"Palestine","flag":"🇵🇸"},{"name":"Panama","flag":"🇵🇦"},{"name":"Papua New Guinea","flag":"🇵🇬"},{"name":"Paraguay","flag":"🇵🇾"},{"name":"Peru","flag":"🇵🇪"},{"name":"Philippines","flag":"🇵🇭"},{"name":"Poland","flag":"🇵🇱"},{"name":"Portugal","flag":"🇵🇹"},{"name":"Qatar","flag":"🇶🇦"},{"name":"Republic of the Congo","flag":"🇨🇬"},{"name":"Romania","flag":"🇷🇴"},{"name":"Russia","flag":"🇷🇺"},{"name":"Rwanda","flag":"🇷🇼"},{"name":"Saint Kitts and Nevis","flag":"🇰🇳"},{"name":"Saint Lucia","flag":"🇱🇨"},{"name":"Saint Vincent and the Grenadines","flag":"🇻🇨"},{"name":"Samoa","flag":"🇼🇸"},{"name":"San Marino","flag":"🇸🇲"},{"name":"Sao Tome and Principe","flag":"🇸🇹"},{"name":"Saudi Arabia","flag":"🇸🇦"},{"name":"Senegal","flag":"🇸🇳"},{"name":"Serbia","flag":"🇷🇸"},{"name":"Seychelles","flag":"🇸🇨"},{"name":"Sierra Leone","flag":"🇸🇱"},{"name":"Singapore","flag":"🇸🇬"},{"name":"Slovakia","flag":"🇸🇰"},{"name":"Slovenia","flag":"🇸🇮"},{"name":"Solomon Islands","flag":"🇸🇧"},{"name":"Somalia","flag":"🇸🇴"},{"name":"South Africa","flag":"🇿🇦"},{"name":"South Korea","flag":"🇰🇷"},{"name":"South Sudan","flag":"🇸🇸"},{"name":"Spain","flag":"🇪🇸"},{"name":"Sri Lanka","flag":"🇱🇰"},{"name":"Sudan","flag":"🇸🇩"},{"name":"Suriname","flag":"🇸🇷"},{"name":"Sweden","flag":"🇸🇪"},{"name":"Switzerland","flag":"🇨🇭"},{"name":"Syria","flag":"🇸🇾"},{"name":"Taiwan","flag":"🇹🇼"},{"name":"Tajikistan","flag":"🇹🇯"},{"name":"Tanzania","flag":"🇹🇿"},{"name":"Thailand","flag":"🇹🇭"},{"name":"Timor-Leste","flag":"🇹🇱"},{"name":"Togo","flag":"🇹🇬"},{"name":"Tonga","flag":"🇹🇴"},{"name":"Trinidad and Tobago","flag":"🇹🇹"},{"name":"Tunisia","flag":"🇹🇳"},{"name":"Turkey","flag":"🇹🇷"},{"name":"Turkmenistan","flag":"🇹🇲"},{"name":"Tuvalu","flag":"🇹🇻"},{"name":"Uganda","flag":"🇺🇬"},{"name":"Ukraine","flag":"🇺🇦"},{"name":"United Arab Emirates","flag":"🇦🇪"},{"name":"United Kingdom","flag":"🇬🇧"},{"name":"United States","flag":"🇺🇸"},{"name":"Uruguay","flag":"🇺🇾"},{"name":"Uzbekistan","flag":"🇺🇿"},{"name":"Vanuatu","flag":"🇻🇺"},{"name":"Vatican City","flag":"🇻🇦"},{"name":"Venezuela","flag":"🇻🇪"},{"name":"Vietnam","flag":"🇻🇳"},{"name":"Yemen","flag":"🇾🇪"},{"name":"Zambia","flag":"🇿🇲"},{"name":"Zimbabwe","flag":"🇿🇼"}]`);const rt=gt(class extends mt{constructor(i){if(super(i),i.type!==oe.ATTRIBUTE||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter((e=>i[e])).join(" ")+" "}update(i,[e]){if(this.st===void 0){this.st=new Set,i.strings!==void 0&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter((r=>r!==""))));for(const r in e)e[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(e)}const t=i.element.classList;for(const r of this.st)r in e||(t.remove(r),this.st.delete(r));for(const r in e){const o=!!e[r];o===this.st.has(r)||this.nt?.has(r)||(o?(t.add(r),this.st.add(r)):(t.remove(r),this.st.delete(r)))}return K}});const{I:Ma}=ea,Ia=i=>i.strings===void 0,lr=()=>document.createComment(""),Qe=(i,e,t)=>{const r=i._$AA.parentNode,o=e===void 0?i._$AB:e._$AA;if(t===void 0){const a=r.insertBefore(lr(),o),n=r.insertBefore(lr(),o);t=new Ma(a,n,i,i.options)}else{const a=t._$AB.nextSibling,n=t._$AM,l=n!==i;if(l){let s;t._$AQ?.(i),t._$AM=i,t._$AP!==void 0&&(s=i._$AU)!==n._$AU&&t._$AP(s)}if(a!==o||l){let s=t._$AA;for(;s!==a;){const p=s.nextSibling;r.insertBefore(s,o),s=p}}}return t},ve=(i,e,t=i)=>(i._$AI(e,t),i),Ba={},ho=(i,e=Ba)=>i._$AH=e,Va=i=>i._$AH,Ft=i=>{i._$AR(),i._$AA.remove()};const za=gt(class extends mt{constructor(i){if(super(i),i.type!==oe.PROPERTY&&i.type!==oe.ATTRIBUTE&&i.type!==oe.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ia(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[e]){if(e===K||e===y)return e;const t=i.element,r=i.name;if(i.type===oe.PROPERTY){if(e===t[r])return K}else if(i.type===oe.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(r))return K}else if(i.type===oe.ATTRIBUTE&&t.getAttribute(r)===e+"")return K;return ho(i),e}});function Da(i,e){return e.some(t=>i.has(t))}function Ra(i,e){const t=[...i],r=[...e],o=t.length,a=r.length;if(o===0)return!0;let n=0,l=0;for(;l<a;){if(r[l]===t[n]&&(n+=1),n>=o)return!0;l+=1}return!1}const La="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501%202.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131%202.7226499%201.81402515z'%20%3e%3c/path%3e%3c/svg%3e",Na="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499%203.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501%202.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131%202.7226499-1.81402514z'%20%3e%3c/path%3e%3c/svg%3e",Ua="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m50%200c27.6142375%200%2050%2022.3857625%2050%2050s-22.3857625%2050-50%2050-50-22.3857625-50-50%2022.3857625-50%2050-50zm23.8159475%2026.1840525c-1.4033215-1.4033215-3.5816761-1.5592461-5.1572272-.4677738l-.5598841.4677738-18.0988362%2018.0989475-18.0988362-18.0989475-.5598841-.4677738c-1.5755511-1.0914723-3.7539057-.9355477-5.1572272.4677738-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113l18.0989475%2018.0988362-18.0989475%2018.0988362c-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113%201.4033215%201.4033215%203.5816761%201.5592461%205.1572272.4677738l.5598841-.4677738%2018.0988362-18.0989475%2018.0988362%2018.0989475.5598841.4677738c1.5755511%201.0914723%203.7539057.9355477%205.1572272-.4677738%201.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113l-18.0989475-18.0988362%2018.0989475-18.0988362c1.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113z'%20fill-rule='evenodd'%20%3e%3c/path%3e%3c/svg%3e";var ja=Object.defineProperty,Ha=Object.getOwnPropertyDescriptor,M=(i,e,t,r)=>{for(var o=r>1?void 0:r?Ha(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&ja(e,t,o),o};const Fa={all:()=>!0,prefix:(i,e)=>e.startsWith(i),suffix:(i,e)=>e.endsWith(i),substring:(i,e)=>e.includes(i),subsequence:Ra},qa="list",Ka="substring",Wa=i=>i,Ga=i=>i.toLocaleLowerCase();let T=class extends x{constructor(){super(),this.options=[],this.behavior=qa,this.maxAutocompleteEntries=Number.POSITIVE_INFINITY,this.filter=Ka,this.caseSensitive=!1,this.sort=!1,this.wrapArrowKeys=!1,this.stayOpen=!1,this.clearable=!1,this.open=!1,this.disabled=!1,this.required=!1,this.value=null,this.hasFocus=!1,this.highlightedOption=null,this.enteredText="",this.filterText="",this.losingFocus=!1,this.optionsByID=new Map,this.optionFilteringValues=new Map,this.optionsRespectingSortFlag=[],this.filteredOptions=[],this.internals=this.attachInternals()}render(){const i=rt({disabled:this.disabled,focused:this.hasFocus});return d`
      <div id="container" part="container">
        ${this.labelTemplate}
        <div id="main-widget-row" class=${i} part="combo-box">
          ${this.textInputTemplate}
          ${this.clearable?this.clearButtonTemplate:y}
          ${this.caretButtonTemplate}
        </div>
        ${this.optionsListTemplate}
      </div>
    `}willUpdate(i){(i.has("options")||i.has("caseSensitive"))&&this.rebuildOptionFilteringValues(),i.has("options")&&this.rebuildOptionIDMap(),(i.has("options")||i.has("sort"))&&this.rebuildSortedOptions(),Da(i,["options","behavior","maxAutocompleteEntries","filter","filterText","caseSensitive","sort"])&&this.rebuildFilteredOptions(),i.has("open")&&(this.open?this.value&&this.setHighlightedOption(this.selectedOption):this.setHighlightedOption(null)),i.has("required")&&this.updateFormValidity()}updated(i){i.has("value")&&this.handleValueChanged(),i.has("options")&&this.behavior!=="freeform"&&!this.selectedOption&&this.clearSelectedOption(),i.has("open")&&(this.open?(this.positionOptionsMenu(),this.optionsList?.showPopover?.(),this.optionsList?.classList.add("visible")):(this.optionsList?.hidePopover?.(),this.optionsList?.classList.remove("visible")))}get labelTemplate(){return d`
      <label id="label" for="text-input" part="label">
        <slot name="label"></slot>
      </label>
    `}get textInputTemplate(){const i=rt({"clear-padding":this.clearable&&!this.shouldShowClearButton});return d`
      <input
        type="text"
        id="text-input"
        class=${i}
        .value=${za(this.enteredText)}
        placeholder=${xe(this.placeholder)}
        part="text-input"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-controls="options-list"
        aria-expanded=${this.open}
        aria-activedescendant=${xe(this.highlightedOption?.id)}
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
        <span class="sr-only">${U("Clear")}</span>
        <slot name="clear-button">
          <img
            class="icon clear-icon"
            part="icon clear-icon"
            src=${Ua}
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
          src=${La}
          alt=""
          aria-hidden="true"
        />
      </slot>
      <slot name="caret-open" ?hidden=${!this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${Na}
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
        <span class="sr-only">${U("Toggle options")}</span>
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
        ${we(this.open,()=>this.optionTemplates)}
        <slot name="options-list-bottom"></slot>
      </ul>
    `}get optionTemplates(){return this.filteredOptions.length===0&&this.maxAutocompleteEntries>0?[this.emptyOptionsTemplate]:this.filteredOptions.map(i=>{const e=i===this.highlightedOption,t=rt({option:!0,highlight:e});return d`
        <li
          id=${i.id}
          class=${t}
          part="option ${e?"highlight":""}"
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
      `})}get emptyOptionsTemplate(){return d`
      <li id="empty-options" part="empty-options">
        <slot name="empty-options">${U("No matching options")}</slot>
      </li>
    `}handleOptionPointerEnter(i){this.handleOptionPointerMove(i)}handleOptionPointerMove(i){const e=i.currentTarget,t=this.getOptionFor(e.id);t&&this.setHighlightedOption(t)}handleOptionClick(i){const e=i.currentTarget,t=this.getOptionFor(e.id);t&&(this.setSelectedOption(t.id),this.stayOpen||this.closeOptionsMenu())}handleComboBoxKeyDown(i){switch(i.key){case"Enter":this.handleEnterPressed();break;case"Escape":this.handleEscapePressed();break;case"ArrowUp":i.altKey?this.handleAltUpArrowPressed():this.handleUpArrowPressed();break;case"ArrowDown":i.altKey?this.handleAltDownArrowPressed():this.handleDownArrowPressed();break;case"Tab":this.handleTabPressed();return;case" ":this.handleSpacePressed(i);return;default:return}i.stopPropagation(),i.preventDefault()}async handleTextBoxInput(){const i=this.textInput?.value??"";this.enteredText=i,this.setFilterText(i),this.openOptionsMenu(),await this.updateComplete,this.highlightFirstOption()}handleEnterPressed(){if(!this.open){this.openOptionsMenu();return}this.highlightedOption?this.setSelectedOption(this.highlightedOption.id):this.behavior==="freeform"&&this.setValue(this.enteredText),this.stayOpen||(this.open=!1)}handleEscapePressed(){if(this.open){this.closeOptionsMenu();return}this.clearSelectedOption()}handleUpArrowPressed(){this.open||this.openOptionsMenu(),this.highlightPreviousOption()}handleDownArrowPressed(){this.open||this.openOptionsMenu(),this.highlightNextOption()}handleAltUpArrowPressed(){this.closeOptionsMenu()}handleAltDownArrowPressed(){this.openOptionsMenu()}handleTabPressed(){this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1))}handleSpacePressed(i){this.behavior==="select-only"&&(this.open?this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1)):this.openOptionsMenu(),i.stopPropagation(),i.preventDefault())}handleComboBoxClick(){this.toggleOptionsMenu()}handleClearButtonClick(){this.clearSelectedOption(),this.textInput?.focus(),this.openOptionsMenu()}handleFocus(){this.behavior!=="select-only"&&this.textInput?.focus(),this.hasFocus=!0,this.losingFocus=!1}handleBlur(){this.hasFocus=!1,this.losingFocus=!0,setTimeout(()=>{this.losingFocus&&!this.shadowRoot?.activeElement&&(this.losingFocus=!1,this.closeOptionsMenu(),this.behavior==="list"?this.setTextValue(this.selectedOption?.text??"",!1):this.behavior==="freeform"&&(this.enteredText||this.value)&&this.setValue(this.enteredText))},0)}handleValueChanged(){if(this.value==null){this.enteredText&&this.setTextValue("",!1);return}const i=this.getOptionFor(this.value);if(this.behavior==="freeform"){const e=i?.text??this.value;e!==this.enteredText&&this.setTextValue(e);return}if(!i){this.clearSelectedOption();return}this.enteredText!==i.text&&(this.setTextValue(i.text,!1),this.setFilterText(""))}highlightFirstOption(){this.setHighlightedOption(this.firstFilteredOption)}highlightLastOption(){this.setHighlightedOption(this.lastFilteredOption)}highlightPreviousOption(){const{filteredOptions:i,lastFilteredIndex:e}=this;if(!this.highlightedOption){this.highlightLastOption();return}const{highlightedIndex:t}=this,r=this.wrapArrowKeys&&t===0?e:Math.max(t-1,0);this.setHighlightedOption(i[r])}highlightNextOption(){const{filteredOptions:i,lastFilteredIndex:e}=this;if(!this.highlightedOption){this.highlightFirstOption();return}const{highlightedIndex:t}=this,r=this.wrapArrowKeys&&t===e?0:Math.min(t+1,e);this.setHighlightedOption(i[r])}async setHighlightedOption(i){this.highlightedOption=i,await this.updateComplete;const{optionsList:e,highlightedElement:t}=this;if(!t||!e)return;const r=t.getBoundingClientRect(),o=e.getBoundingClientRect();(r.top<o.top||r.bottom>o.bottom)&&t.scrollIntoView({block:"nearest"})}setSelectedOption(i){const e=this.getOptionFor(i);if(!e)throw new RangeError("Unknown option ID");const t=this.value;this.value=e.id,this.internals.setFormValue(this.value),this.setTextValue(e.text,!1),this.setFilterText(""),this.value!==t&&this.emitChangeEvent(),e.onSelected?.(e)}clearSelectedOption(){const i=this.value;this.value=null,this.internals.setFormValue(this.value),this.setTextValue(""),this.value!==i&&this.emitChangeEvent()}setValue(i){if(this.behavior==="freeform"){const e=this.value;this.value=i,this.internals.setFormValue(this.value),this.setTextValue(i),this.value!==e&&this.emitChangeEvent()}else this.setSelectedOption(i)}setTextValue(i,e=!0){this.textInput&&(this.textInput.value=i),this.enteredText=i,e&&this.setFilterText(i)}setFilterText(i){const{caseTransform:e}=this;this.filterText=e(i)}openOptionsMenu(){this.open=!0,this.emitToggleEvent()}closeOptionsMenu(){this.open=!1,this.emitToggleEvent()}toggleOptionsMenu(){this.open=!this.open,this.emitToggleEvent()}updateFormValidity(){this.required&&!this.value?this.internals.setValidity({valueMissing:!0},U("A value is required")):this.internals.setValidity({})}emitChangeEvent(){this.dispatchEvent(new CustomEvent("change",{detail:this.value}))}emitToggleEvent(){this.dispatchEvent(new CustomEvent("toggle",{detail:this.open}))}get isEmpty(){return!this.selectedOption&&!this.enteredText}get shouldShowClearButton(){return this.clearable&&!this.disabled&&!this.isEmpty}positionOptionsMenu(){const{mainWidgetRow:i,optionsList:e}=this;if(!i||!e)return;const t=i.getBoundingClientRect(),{innerHeight:r,scrollX:o,scrollY:a}=window,n=t.top,l=r-t.bottom,s="var(--combo-box-list-max-height--)",p={top:`${t.bottom+a}px`,left:`${t.left+o}px`,width:`var(--combo-box-list-width--, ${t.width}px)`,maxHeight:`min(${s}, ${l}px)`};Object.assign(e.style,p),setTimeout(()=>{const h=e.getBoundingClientRect().bottom>=r,v=n>l;h&&v&&(e.style.top="auto",e.style.bottom=`${r-t.top-a}px`,e.style.maxHeight=`min(${s}, ${n}px)`)},0)}get caseTransform(){return this.caseSensitive?Wa:Ga}getOptionFor(i){return this.optionsByID.get(i)??null}rebuildOptionIDMap(){this.optionsByID.clear();for(const i of this.options)this.optionsByID.set(i.id,i)}rebuildSortedOptions(){this.sort?this.optionsRespectingSortFlag=[...this.options].sort((i,e)=>{const t=this.optionFilteringValues.get(i),r=this.optionFilteringValues.get(e);return t.localeCompare(r)}):this.optionsRespectingSortFlag=this.options}rebuildOptionFilteringValues(){this.optionFilteringValues.clear();const{caseTransform:i}=this;for(const e of this.options){const t=i(e.text);this.optionFilteringValues.set(e,t)}}rebuildFilteredOptions(){const i=this.behavior==="select-only"?"all":this.filter,e=typeof i=="string"?Fa[i]:i,t=this.optionsRespectingSortFlag.filter(r=>{const o=this.optionFilteringValues.get(r);return o?e(this.filterText,o,r):!1}).slice(0,this.maxAutocompleteEntries);this.filteredOptions=t}get firstFilteredOption(){return this.filteredOptions[0]??null}get lastFilteredOption(){return this.filteredOptions[this.lastFilteredIndex]??null}get lastFilteredIndex(){return this.filteredOptions.length-1}get selectedOption(){return this.value==null?null:this.getOptionFor(this.value)}get highlightedIndex(){return this.highlightedOption?this.filteredOptions.indexOf(this.highlightedOption):-1}get highlightedElement(){return this.highlightedOption?this.shadowRoot.getElementById(this.highlightedOption.id):null}static get styles(){const i=_`
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
    `;return[z,i]}};T.formAssociated=!0;T.shadowRootOptions={...x.shadowRootOptions,delegatesFocus:!0};M([u({type:Array})],T.prototype,"options",2);M([u({type:String})],T.prototype,"placeholder",2);M([u({type:String})],T.prototype,"behavior",2);M([u({type:Number,attribute:"max-autocomplete-entries"})],T.prototype,"maxAutocompleteEntries",2);M([u({type:String})],T.prototype,"filter",2);M([u({type:Boolean,reflect:!0,attribute:"case-sensitive"})],T.prototype,"caseSensitive",2);M([u({type:Boolean,reflect:!0})],T.prototype,"sort",2);M([u({type:Boolean,reflect:!0,attribute:"wrap-arrow-keys"})],T.prototype,"wrapArrowKeys",2);M([u({type:Boolean,reflect:!0,attribute:"stay-open"})],T.prototype,"stayOpen",2);M([u({type:Boolean,reflect:!0})],T.prototype,"clearable",2);M([u({type:Boolean,reflect:!0})],T.prototype,"open",2);M([u({type:Boolean,reflect:!0})],T.prototype,"disabled",2);M([u({type:Boolean,reflect:!0})],T.prototype,"required",2);M([u({type:String})],T.prototype,"value",2);M([w()],T.prototype,"hasFocus",2);M([w()],T.prototype,"highlightedOption",2);M([w()],T.prototype,"enteredText",2);M([w()],T.prototype,"filterText",2);M([S("#main-widget-row")],T.prototype,"mainWidgetRow",2);M([S("#text-input")],T.prototype,"textInput",2);M([S("#options-list")],T.prototype,"optionsList",2);T=M([C("ia-combo-box")],T);var Za=Object.defineProperty,Ja=Object.getOwnPropertyDescriptor,E=(i,e,t,r)=>{for(var o=r>1?void 0:r?Ja(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&Za(e,t,o),o};const Ya=[{label:"Width",cssVariable:"--ia-theme-combo-box-width",defaultValue:"250px",inputType:"text"},{label:"Padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown width",cssVariable:"--combo-box-list-width",defaultValue:"",inputType:"text"},{label:"Dropdown max height",cssVariable:"--combo-box-list-max-height",defaultValue:"250px",inputType:"text"},{label:"Dropdown fade duration",cssVariable:"--combo-box-list-fade-duration",defaultValue:125,inputType:"range",min:0,max:1e3,step:25,unit:"ms"}],po=[{id:"red",text:"Red"},{id:"orange",text:"Orange"},{id:"yellow",text:"Yellow"},{id:"green",text:"Green"},{id:"blue",text:"Blue"},{id:"indigo",text:"Indigo"},{id:"violet",text:"Violet"}],Xa=po.map(i=>({...i,content:d` <span style="display: flex; align-items: center">
      <span style="flex: 1">${i.text}</span>
      <div style="width: 15px; height: 15px; background:${i.id}"></div>
    </span>`})),dr=co.map(i=>({id:i.name,text:i.name})),Qa=co.map(i=>({id:i.name,text:i.name,content:d`<span>${i.flag}</span>&nbsp;<span>${i.name}</span>`})),en="list",tn="Choices",cr="Select an option...",hr=50,rn="substring";let O=class extends x{constructor(){super(...arguments),this.options=dr,this.behavior=en,this.label=tn,this.placeholder=cr,this.maxAutocompleteEntries=hr,this.filterFn=rn,this.caseSensitive=!1,this.shouldSort=!1,this.wrapArrowKeys=!0,this.clearable=!0,this.disabled=!1,this.announcerText=""}render(){return d`
      <story-template
        elementTag="ia-combo-box"
        elementClassName="IAComboBox"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:Ya}}
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
                  value=${cr}
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
                  value=${hr}
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
    `}get exampleUsage(){const{placeholder:i,behavior:e,maxAutocompleteEntries:t,filterFn:r}=this,o={behavior:e?`"${e}"`:"",placeholder:i?`"${i}"`:"","max-autocomplete-entries":t?`"${t}"`:"",filter:r&&r!=="substring"?`"${r}"`:"","case-sensitive":this.caseSensitive,sort:this.shouldSort,"wrap-arrow-keys":this.wrapArrowKeys,clearable:this.clearable,disabled:this.disabled};return`
      <ia-combo-box
        .options=\${[
          { id: 'foo', text: 'Foo Option' },
          { id: 'bar', text: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(o).map(([n,l])=>l?l===!0?n:l?`${n}=${l}`:"":"").join(`
  `)}
      >
        <span slot="label">${this.label}</span>
      </ia-combo-box>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(i){i.preventDefault(),this.updateOptions(),this.behavior=this.behaviorSelect.value,this.label=this.labelInput.value,this.placeholder=this.placeholderInput.value,this.maxAutocompleteEntries=Number(this.maxAutocompleteInput.value),this.filterFn=this.filterFnSelect.value,this.caseSensitive=this.caseSensitiveCheck.checked,this.shouldSort=this.sortCheck.checked,this.wrapArrowKeys=this.wrapArrowKeysCheck.checked,this.clearable=this.clearableCheck.checked,this.disabled=this.disabledCheck.checked}updateOptions(){switch(this.optionSetSelect.value){case"colors":this.options=this.customContentCheck.checked?Xa:po;break;case"countries":this.options=this.customContentCheck.checked?Qa:dr;break;default:this.options=[]}}handleComboBoxChange(i){this.announcerText=`New value is: ${i.detail}`}static get styles(){return _`
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
    `}};E([w()],O.prototype,"options",2);E([w()],O.prototype,"behavior",2);E([w()],O.prototype,"label",2);E([w()],O.prototype,"placeholder",2);E([w()],O.prototype,"maxAutocompleteEntries",2);E([w()],O.prototype,"filterFn",2);E([w()],O.prototype,"caseSensitive",2);E([w()],O.prototype,"shouldSort",2);E([w()],O.prototype,"wrapArrowKeys",2);E([w()],O.prototype,"clearable",2);E([w()],O.prototype,"disabled",2);E([w()],O.prototype,"announcerText",2);E([S("#settings__options")],O.prototype,"optionSetSelect",2);E([S("#settings__custom-content")],O.prototype,"customContentCheck",2);E([S("#settings__behavior")],O.prototype,"behaviorSelect",2);E([S("#settings__label")],O.prototype,"labelInput",2);E([S("#settings__placeholder")],O.prototype,"placeholderInput",2);E([S("#settings__max-entries")],O.prototype,"maxAutocompleteInput",2);E([S("#settings__filter-fn")],O.prototype,"filterFnSelect",2);E([S("#settings__case-sensitive")],O.prototype,"caseSensitiveCheck",2);E([S("#settings__sort")],O.prototype,"sortCheck",2);E([S("#settings__wrap")],O.prototype,"wrapArrowKeysCheck",2);E([S("#settings__clearable")],O.prototype,"clearableCheck",2);E([S("#settings__disabled")],O.prototype,"disabledCheck",2);O=E([C("ia-combo-box-story")],O);const on=Object.freeze(Object.defineProperty({__proto__:null,get IAComboBoxStory(){return O}},Symbol.toStringTag,{value:"Module"}));function*an(i,e){if(i!==void 0){let t=0;for(const r of i)yield e(r,t++)}}const nn="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20class='fill-color'%20d='m17.0555551%2041.3194459c0-12.7430552%2010.3541664-23.1027772%2023.0847216-23.1027772%2012.7166664%200%2023.0777773%2010.359722%2023.0777773%2023.1027772%200%2012.7361108-10.3611109%2023.0986106-23.0777773%2023.0986106-12.7305552%200-23.0847216-10.3624998-23.0847216-23.0986106zm-17.24305512%200c0%2022.2916661%2018.04583292%2040.3472213%2040.32777672%2040.3472213%208.9208332%200%2017.145833-2.9319449%2023.8194439-7.8527776l24.1513883%2024.0777771c1.2125%201.1402778%202.8430555%201.8430556%204.6374999%201.8430556%203.7444443%200%206.7805554-3.0361111%206.7805554-6.7791665%200-2.0652778-.9222222-3.9069444-2.3736111-5.1499999l-23.718055-23.7458328c4.4152777-6.4791665%207.0152776-14.3055552%207.0152776-22.7402772%200-22.2791661-18.0458328-40.34861006-40.312499-40.34861006-22.2819438%200-40.32777672%2018.06944396-40.32777672%2040.34861006z'%20fill='%232c2c2c'%20fill-rule='evenodd'%20/%3e%3c/svg%3e";function c(i,e,t,r){var o=arguments.length,a=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(i,e,t,r);else for(var l=i.length-1;l>=0;l--)(n=i[l])&&(a=(o<3?n(a):o>3?n(e,t,a):n(e,t))||a);return o>3&&a&&Object.defineProperty(e,t,a),a}const yt=window,Li=yt.ShadowRoot&&(yt.ShadyCSS===void 0||yt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ni=Symbol(),pr=new WeakMap;let uo=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==Ni)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Li&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=pr.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&pr.set(t,e))}return e}toString(){return this.cssText}};const sn=i=>new uo(typeof i=="string"?i:i+"",void 0,Ni),ln=(i,...e)=>{const t=i.length===1?i[0]:e.reduce(((r,o,a)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+i[a+1]),i[0]);return new uo(t,i,Ni)},dn=(i,e)=>{Li?i.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((t=>{const r=document.createElement("style"),o=yt.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=t.cssText,i.appendChild(r)}))},ur=Li?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return sn(t)})(i):i;var qt;const Ct=window,gr=Ct.trustedTypes,cn=gr?gr.emptyScript:"",mr=Ct.reactiveElementPolyfillSupport,ui={toAttribute(i,e){switch(e){case Boolean:i=i?cn:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},go=(i,e)=>e!==i&&(e==e||i==i),Kt={attribute:!0,type:String,converter:ui,reflect:!1,hasChanged:go},gi="finalized";let De=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,r)=>{const o=this._$Ep(r,t);o!==void 0&&(this._$Ev.set(o,r),e.push(o))})),e}static createProperty(e,t=Kt){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const r=typeof e=="symbol"?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);o!==void 0&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){const a=this[e];this[t]=o,this.requestUpdate(e,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Kt}static finalize(){if(this.hasOwnProperty(gi))return!1;this[gi]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,r=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of r)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const o of r)t.unshift(ur(o))}else e!==void 0&&t.push(ur(e));return t}static _$Ep(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach((t=>t(this)))}addController(e){var t,r;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((r=e.hostConnected)===null||r===void 0||r.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return dn(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach((t=>{var r;return(r=t.hostConnected)===null||r===void 0?void 0:r.call(t)}))}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach((t=>{var r;return(r=t.hostDisconnected)===null||r===void 0?void 0:r.call(t)}))}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$EO(e,t,r=Kt){var o;const a=this.constructor._$Ep(e,r);if(a!==void 0&&r.reflect===!0){const n=(((o=r.converter)===null||o===void 0?void 0:o.toAttribute)!==void 0?r.converter:ui).toAttribute(t,r.type);this._$El=e,n==null?this.removeAttribute(a):this.setAttribute(a,n),this._$El=null}}_$AK(e,t){var r;const o=this.constructor,a=o._$Ev.get(e);if(a!==void 0&&this._$El!==a){const n=o.getPropertyOptions(a),l=typeof n.converter=="function"?{fromAttribute:n.converter}:((r=n.converter)===null||r===void 0?void 0:r.fromAttribute)!==void 0?n.converter:ui;this._$El=a,this[a]=l.fromAttribute(t,n.type),this._$El=null}}requestUpdate(e,t,r){let o=!0;e!==void 0&&(((r=r||this.constructor.getPropertyOptions(e)).hasChanged||go)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),r.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,r))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((o,a)=>this[a]=o)),this._$Ei=void 0);let t=!1;const r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),(e=this._$ES)===null||e===void 0||e.forEach((o=>{var a;return(a=o.hostUpdate)===null||a===void 0?void 0:a.call(o)})),this.update(r)):this._$Ek()}catch(o){throw t=!1,this._$Ek(),o}t&&this._$AE(r)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach((r=>{var o;return(o=r.hostUpdated)===null||o===void 0?void 0:o.call(r)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach(((t,r)=>this._$EO(r,this[r],t))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};De[gi]=!0,De.elementProperties=new Map,De.elementStyles=[],De.shadowRootOptions={mode:"open"},mr?.({ReactiveElement:De}),((qt=Ct.reactiveElementVersions)!==null&&qt!==void 0?qt:Ct.reactiveElementVersions=[]).push("1.6.3");var Wt;const At=window,je=At.trustedTypes,fr=je?je.createPolicy("lit-html",{createHTML:i=>i}):void 0,mi="$lit$",de=`lit$${(Math.random()+"").slice(9)}$`,mo="?"+de,hn=`<${mo}>`,Te=document,st=()=>Te.createComment(""),lt=i=>i===null||typeof i!="object"&&typeof i!="function",fo=Array.isArray,pn=i=>fo(i)||typeof i?.[Symbol.iterator]=="function",Gt=`[ 	
\f\r]`,et=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,vr=/-->/g,br=/>/g,be=RegExp(`>|${Gt}(?:([^\\s"'>=/]+)(${Gt}*=${Gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),yr=/'/g,wr=/"/g,vo=/^(?:script|style|textarea|title)$/i,un=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),gn=un(1),He=Symbol.for("lit-noChange"),P=Symbol.for("lit-nothing"),$r=new WeakMap,_e=Te.createTreeWalker(Te,129,null,!1);function bo(i,e){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return fr!==void 0?fr.createHTML(e):e}const mn=(i,e)=>{const t=i.length-1,r=[];let o,a=e===2?"<svg>":"",n=et;for(let l=0;l<t;l++){const s=i[l];let p,g,h=-1,v=0;for(;v<s.length&&(n.lastIndex=v,g=n.exec(s),g!==null);)v=n.lastIndex,n===et?g[1]==="!--"?n=vr:g[1]!==void 0?n=br:g[2]!==void 0?(vo.test(g[2])&&(o=RegExp("</"+g[2],"g")),n=be):g[3]!==void 0&&(n=be):n===be?g[0]===">"?(n=o??et,h=-1):g[1]===void 0?h=-2:(h=n.lastIndex-g[2].length,p=g[1],n=g[3]===void 0?be:g[3]==='"'?wr:yr):n===wr||n===yr?n=be:n===vr||n===br?n=et:(n=be,o=void 0);const b=n===be&&i[l+1].startsWith("/>")?" ":"";a+=n===et?s+hn:h>=0?(r.push(p),s.slice(0,h)+mi+s.slice(h)+de+b):s+de+(h===-2?(r.push(void 0),l):b)}return[bo(i,a+(i[t]||"<?>")+(e===2?"</svg>":"")),r]};let fi=class yo{constructor({strings:e,_$litType$:t},r){let o;this.parts=[];let a=0,n=0;const l=e.length-1,s=this.parts,[p,g]=mn(e,t);if(this.el=yo.createElement(p,r),_e.currentNode=this.el.content,t===2){const h=this.el.content,v=h.firstChild;v.remove(),h.append(...v.childNodes)}for(;(o=_e.nextNode())!==null&&s.length<l;){if(o.nodeType===1){if(o.hasAttributes()){const h=[];for(const v of o.getAttributeNames())if(v.endsWith(mi)||v.startsWith(de)){const b=g[n++];if(h.push(v),b!==void 0){const A=o.getAttribute(b.toLowerCase()+mi).split(de),k=/([.?@])?(.*)/.exec(b);s.push({type:1,index:a,name:k[2],strings:A,ctor:k[1]==="."?vn:k[1]==="?"?yn:k[1]==="@"?wn:Rt})}else s.push({type:6,index:a})}for(const v of h)o.removeAttribute(v)}if(vo.test(o.tagName)){const h=o.textContent.split(de),v=h.length-1;if(v>0){o.textContent=je?je.emptyScript:"";for(let b=0;b<v;b++)o.append(h[b],st()),_e.nextNode(),s.push({type:2,index:++a});o.append(h[v],st())}}}else if(o.nodeType===8)if(o.data===mo)s.push({type:2,index:a});else{let h=-1;for(;(h=o.data.indexOf(de,h+1))!==-1;)s.push({type:7,index:a}),h+=de.length-1}a++}}static createElement(e,t){const r=Te.createElement("template");return r.innerHTML=e,r}};function Fe(i,e,t=i,r){var o,a,n,l;if(e===He)return e;let s=r!==void 0?(o=t._$Co)===null||o===void 0?void 0:o[r]:t._$Cl;const p=lt(e)?void 0:e._$litDirective$;return s?.constructor!==p&&((a=s?._$AO)===null||a===void 0||a.call(s,!1),p===void 0?s=void 0:(s=new p(i),s._$AT(i,t,r)),r!==void 0?((n=(l=t)._$Co)!==null&&n!==void 0?n:l._$Co=[])[r]=s:t._$Cl=s),s!==void 0&&(e=Fe(i,s._$AS(i,e.values),s,r)),e}let fn=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:r},parts:o}=this._$AD,a=((t=e?.creationScope)!==null&&t!==void 0?t:Te).importNode(r,!0);_e.currentNode=a;let n=_e.nextNode(),l=0,s=0,p=o[0];for(;p!==void 0;){if(l===p.index){let g;p.type===2?g=new Ui(n,n.nextSibling,this,e):p.type===1?g=new p.ctor(n,p.name,p.strings,this,e):p.type===6&&(g=new $n(n,this,e)),this._$AV.push(g),p=o[++s]}l!==p?.index&&(n=_e.nextNode(),l++)}return _e.currentNode=Te,a}v(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},Ui=class wo{constructor(e,t,r,o){var a;this.type=2,this._$AH=P,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=o,this._$Cp=(a=o?.isConnected)===null||a===void 0||a}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Fe(this,e,t),lt(e)?e===P||e==null||e===""?(this._$AH!==P&&this._$AR(),this._$AH=P):e!==this._$AH&&e!==He&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):pn(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==P&&lt(this._$AH)?this._$AA.nextSibling.data=e:this.$(Te.createTextNode(e)),this._$AH=e}g(e){var t;const{values:r,_$litType$:o}=e,a=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=fi.createElement(bo(o.h,o.h[0]),this.options)),o);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===a)this._$AH.v(r);else{const n=new fn(a,this),l=n.u(this.options);n.v(r),this.$(l),this._$AH=n}}_$AC(e){let t=$r.get(e.strings);return t===void 0&&$r.set(e.strings,t=new fi(e)),t}T(e){fo(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,o=0;for(const a of e)o===t.length?t.push(r=new wo(this.k(st()),this.k(st()),this,this.options)):r=t[o],r._$AI(a),o++;o<t.length&&(this._$AR(r&&r._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)===null||r===void 0||r.call(this,!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},Rt=class{constructor(e,t,r,o,a){this.type=1,this._$AH=P,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=a,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=P}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,r,o){const a=this.strings;let n=!1;if(a===void 0)e=Fe(this,e,t,0),n=!lt(e)||e!==this._$AH&&e!==He,n&&(this._$AH=e);else{const l=e;let s,p;for(e=a[0],s=0;s<a.length-1;s++)p=Fe(this,l[r+s],t,s),p===He&&(p=this._$AH[s]),n||(n=!lt(p)||p!==this._$AH[s]),p===P?e=P:e!==P&&(e+=(p??"")+a[s+1]),this._$AH[s]=p}n&&!o&&this.j(e)}j(e){e===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},vn=class extends Rt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===P?void 0:e}};const bn=je?je.emptyScript:"";let yn=class extends Rt{constructor(){super(...arguments),this.type=4}j(e){e&&e!==P?this.element.setAttribute(this.name,bn):this.element.removeAttribute(this.name)}},wn=class extends Rt{constructor(e,t,r,o,a){super(e,t,r,o,a),this.type=5}_$AI(e,t=this){var r;if((e=(r=Fe(this,e,t,0))!==null&&r!==void 0?r:P)===He)return;const o=this._$AH,a=e===P&&o!==P||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==P&&(o===P||a);a&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,r;typeof this._$AH=="function"?this._$AH.call((r=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&r!==void 0?r:this.element,e):this._$AH.handleEvent(e)}},$n=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){Fe(this,e)}};const xr=At.litHtmlPolyfillSupport;xr?.(fi,Ui),((Wt=At.litHtmlVersions)!==null&&Wt!==void 0?Wt:At.litHtmlVersions=[]).push("2.8.0");const xn=(i,e,t)=>{var r,o;const a=(r=t?.renderBefore)!==null&&r!==void 0?r:e;let n=a._$litPart$;if(n===void 0){const l=(o=t?.renderBefore)!==null&&o!==void 0?o:null;a._$litPart$=n=new Ui(e.insertBefore(st(),l),l,void 0,t??{})}return n._$AI(i),n};var Zt,Jt;let Le=class extends De{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const r=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=r.firstChild),r}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=xn(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return He}};Le.finalized=!0,Le._$litElement$=!0,(Zt=globalThis.litElementHydrateSupport)===null||Zt===void 0||Zt.call(globalThis,{LitElement:Le});const _r=globalThis.litElementPolyfillSupport;_r?.({LitElement:Le});((Jt=globalThis.litElementVersions)!==null&&Jt!==void 0?Jt:globalThis.litElementVersions=[]).push("3.3.3");const _n=i=>e=>typeof e=="function"?((t,r)=>(customElements.define(t,r),r))(i,e):((t,r)=>{const{kind:o,elements:a}=r;return{kind:o,elements:a,finisher(n){customElements.define(t,n)}}})(i,e);const Sn=(i,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,i)}},Cn=(i,e,t)=>{e.constructor.createProperty(t,i)};function Me(i){return(e,t)=>t!==void 0?Cn(i,e,t):Sn(i,e)}const An=({finisher:i,descriptor:e})=>(t,r)=>{var o;if(r===void 0){const a=(o=t.originalKey)!==null&&o!==void 0?o:t.key,n=e!=null?{kind:"method",placement:"prototype",key:a,descriptor:e(t.key)}:{...t,key:a};return i!=null&&(n.finisher=function(l){i(l,a)}),n}{const a=t.constructor;e!==void 0&&Object.defineProperty(t,r,e(r)),i?.(a,r)}};function On(i,e){return An({descriptor:t=>({get(){var o,a;return(a=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(i))!==null&&a!==void 0?a:null},enumerable:!0,configurable:!0})})}var Yt;((Yt=window.HTMLSlotElement)===null||Yt===void 0?void 0:Yt.prototype.assignedElements)!=null;const Tn=d`
<svg
  viewBox="0 0 40 40"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z" class="fill-color" fill-rule="evenodd"/>
</svg>
`;class En extends x{static get styles(){return _`
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
    `}render(){return Tn}}customElements.define("ia-icon-close",En);let W=class extends Le{constructor(){super(...arguments),this.value="",this.clearButtonScreenReaderLabel="Clear",this.focusOnClear=!0,this.forceClearButton=!1}render(){var e,t,r,o;const a=!this.value&&!this.forceClearButton;return gn`
      <div id="container">
        <slot name="icon"></slot>
        <label for="text-input" class="sr-only"
          >${(e=this.screenReaderLabel)!==null&&e!==void 0?e:P}</label
        >
        <input
          id="text-input"
          type="text"
          inputmode="search"
          enterkeyhint="search"
          autocapitalize="off"
          placeholder=${(t=this.placeholder)!==null&&t!==void 0?t:P}
          .value=${(r=this.value)!==null&&r!==void 0?r:P}
          aria-controls=${(o=this.ariaControls)!==null&&o!==void 0?o:P}
          @input=${this.onTextInput}
          @keypress=${this.onKeyPress}
        />
        <button
          id="clear-button"
          type="button"
          ?hidden=${a}
          @click=${this.clearButtonClicked}
        >
          <ia-icon-close aria-hidden="true"></ia-icon-close>
          <span class="sr-only">${this.clearButtonScreenReaderLabel}</span>
        </button>
      </div>
    `}onTextInput(){this.value=this.textInput.value}onKeyPress(e){if(e.key==="Enter"){this.textInput.blur();const t=new CustomEvent("submit",{detail:this.value});this.dispatchEvent(t)}}clearButtonClicked(){const e=this.textInput.value;this.value="",this.focusOnClear&&this.textInput.focus();const t=new CustomEvent("clear",{detail:e});this.dispatchEvent(t);const r=new InputEvent("input",{inputType:"deleteContentBackward"});this.dispatchEvent(r)}};W.shadowRootOptions={...Le.shadowRootOptions,delegatesFocus:!0};W.styles=ln`
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
  `;c([Me({type:String})],W.prototype,"value",void 0);c([Me({type:String})],W.prototype,"placeholder",void 0);c([Me({type:String})],W.prototype,"screenReaderLabel",void 0);c([Me({type:String})],W.prototype,"clearButtonScreenReaderLabel",void 0);c([Me({type:String})],W.prototype,"ariaControls",void 0);c([Me({type:Boolean})],W.prototype,"focusOnClear",void 0);c([Me({type:Boolean,reflect:!0})],W.prototype,"forceClearButton",void 0);c([On("#text-input")],W.prototype,"textInput",void 0);W=c([_n("ia-clearable-text-input")],W);const wt=window,ji=wt.ShadowRoot&&(wt.ShadyCSS===void 0||wt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Hi=Symbol(),Sr=new WeakMap;let $o=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==Hi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(ji&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=Sr.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&Sr.set(t,e))}return e}toString(){return this.cssText}};const kn=i=>new $o(typeof i=="string"?i:i+"",void 0,Hi),q=(i,...e)=>{const t=i.length===1?i[0]:e.reduce(((r,o,a)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+i[a+1]),i[0]);return new $o(t,i,Hi)},Pn=(i,e)=>{ji?i.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((t=>{const r=document.createElement("style"),o=wt.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=t.cssText,i.appendChild(r)}))},Cr=ji?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return kn(t)})(i):i;var Xt;const Ot=window,Ar=Ot.trustedTypes,Mn=Ar?Ar.emptyScript:"",Or=Ot.reactiveElementPolyfillSupport,vi={toAttribute(i,e){switch(e){case Boolean:i=i?Mn:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},xo=(i,e)=>e!==i&&(e==e||i==i),Qt={attribute:!0,type:String,converter:vi,reflect:!1,hasChanged:xo},bi="finalized";let Re=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,r)=>{const o=this._$Ep(r,t);o!==void 0&&(this._$Ev.set(o,r),e.push(o))})),e}static createProperty(e,t=Qt){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const r=typeof e=="symbol"?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);o!==void 0&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){const a=this[e];this[t]=o,this.requestUpdate(e,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Qt}static finalize(){if(this.hasOwnProperty(bi))return!1;this[bi]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,r=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of r)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const o of r)t.unshift(Cr(o))}else e!==void 0&&t.push(Cr(e));return t}static _$Ep(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach((t=>t(this)))}addController(e){var t,r;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((r=e.hostConnected)===null||r===void 0||r.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Pn(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach((t=>{var r;return(r=t.hostConnected)===null||r===void 0?void 0:r.call(t)}))}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach((t=>{var r;return(r=t.hostDisconnected)===null||r===void 0?void 0:r.call(t)}))}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$EO(e,t,r=Qt){var o;const a=this.constructor._$Ep(e,r);if(a!==void 0&&r.reflect===!0){const n=(((o=r.converter)===null||o===void 0?void 0:o.toAttribute)!==void 0?r.converter:vi).toAttribute(t,r.type);this._$El=e,n==null?this.removeAttribute(a):this.setAttribute(a,n),this._$El=null}}_$AK(e,t){var r;const o=this.constructor,a=o._$Ev.get(e);if(a!==void 0&&this._$El!==a){const n=o.getPropertyOptions(a),l=typeof n.converter=="function"?{fromAttribute:n.converter}:((r=n.converter)===null||r===void 0?void 0:r.fromAttribute)!==void 0?n.converter:vi;this._$El=a,this[a]=l.fromAttribute(t,n.type),this._$El=null}}requestUpdate(e,t,r){let o=!0;e!==void 0&&(((r=r||this.constructor.getPropertyOptions(e)).hasChanged||xo)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),r.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,r))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((o,a)=>this[a]=o)),this._$Ei=void 0);let t=!1;const r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),(e=this._$ES)===null||e===void 0||e.forEach((o=>{var a;return(a=o.hostUpdate)===null||a===void 0?void 0:a.call(o)})),this.update(r)):this._$Ek()}catch(o){throw t=!1,this._$Ek(),o}t&&this._$AE(r)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach((r=>{var o;return(o=r.hostUpdated)===null||o===void 0?void 0:o.call(r)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach(((t,r)=>this._$EO(r,this[r],t))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};Re[bi]=!0,Re.elementProperties=new Map,Re.elementStyles=[],Re.shadowRootOptions={mode:"open"},Or?.({ReactiveElement:Re}),((Xt=Ot.reactiveElementVersions)!==null&&Xt!==void 0?Xt:Ot.reactiveElementVersions=[]).push("1.6.3");var ei;const Tt=window,qe=Tt.trustedTypes,Tr=qe?qe.createPolicy("lit-html",{createHTML:i=>i}):void 0,yi="$lit$",ce=`lit$${(Math.random()+"").slice(9)}$`,_o="?"+ce,In=`<${_o}>`,Ee=document,dt=()=>Ee.createComment(""),ct=i=>i===null||typeof i!="object"&&typeof i!="function",So=Array.isArray,Bn=i=>So(i)||typeof i?.[Symbol.iterator]=="function",ti=`[ 	
\f\r]`,tt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Er=/-->/g,kr=/>/g,ye=RegExp(`>|${ti}(?:([^\\s"'>=/]+)(${ti}*=${ti}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Pr=/'/g,Mr=/"/g,Co=/^(?:script|style|textarea|title)$/i,Ao=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),N=Ao(1),Oo=Ao(2),Ke=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),Ir=new WeakMap,Se=Ee.createTreeWalker(Ee,129,null,!1);function To(i,e){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Tr!==void 0?Tr.createHTML(e):e}const Vn=(i,e)=>{const t=i.length-1,r=[];let o,a=e===2?"<svg>":"",n=tt;for(let l=0;l<t;l++){const s=i[l];let p,g,h=-1,v=0;for(;v<s.length&&(n.lastIndex=v,g=n.exec(s),g!==null);)v=n.lastIndex,n===tt?g[1]==="!--"?n=Er:g[1]!==void 0?n=kr:g[2]!==void 0?(Co.test(g[2])&&(o=RegExp("</"+g[2],"g")),n=ye):g[3]!==void 0&&(n=ye):n===ye?g[0]===">"?(n=o??tt,h=-1):g[1]===void 0?h=-2:(h=n.lastIndex-g[2].length,p=g[1],n=g[3]===void 0?ye:g[3]==='"'?Mr:Pr):n===Mr||n===Pr?n=ye:n===Er||n===kr?n=tt:(n=ye,o=void 0);const b=n===ye&&i[l+1].startsWith("/>")?" ":"";a+=n===tt?s+In:h>=0?(r.push(p),s.slice(0,h)+yi+s.slice(h)+ce+b):s+ce+(h===-2?(r.push(void 0),l):b)}return[To(i,a+(i[t]||"<?>")+(e===2?"</svg>":"")),r]};class ht{constructor({strings:e,_$litType$:t},r){let o;this.parts=[];let a=0,n=0;const l=e.length-1,s=this.parts,[p,g]=Vn(e,t);if(this.el=ht.createElement(p,r),Se.currentNode=this.el.content,t===2){const h=this.el.content,v=h.firstChild;v.remove(),h.append(...v.childNodes)}for(;(o=Se.nextNode())!==null&&s.length<l;){if(o.nodeType===1){if(o.hasAttributes()){const h=[];for(const v of o.getAttributeNames())if(v.endsWith(yi)||v.startsWith(ce)){const b=g[n++];if(h.push(v),b!==void 0){const A=o.getAttribute(b.toLowerCase()+yi).split(ce),k=/([.?@])?(.*)/.exec(b);s.push({type:1,index:a,name:k[2],strings:A,ctor:k[1]==="."?Dn:k[1]==="?"?Ln:k[1]==="@"?Nn:Lt})}else s.push({type:6,index:a})}for(const v of h)o.removeAttribute(v)}if(Co.test(o.tagName)){const h=o.textContent.split(ce),v=h.length-1;if(v>0){o.textContent=qe?qe.emptyScript:"";for(let b=0;b<v;b++)o.append(h[b],dt()),Se.nextNode(),s.push({type:2,index:++a});o.append(h[v],dt())}}}else if(o.nodeType===8)if(o.data===_o)s.push({type:2,index:a});else{let h=-1;for(;(h=o.data.indexOf(ce,h+1))!==-1;)s.push({type:7,index:a}),h+=ce.length-1}a++}}static createElement(e,t){const r=Ee.createElement("template");return r.innerHTML=e,r}}function We(i,e,t=i,r){var o,a,n,l;if(e===Ke)return e;let s=r!==void 0?(o=t._$Co)===null||o===void 0?void 0:o[r]:t._$Cl;const p=ct(e)?void 0:e._$litDirective$;return s?.constructor!==p&&((a=s?._$AO)===null||a===void 0||a.call(s,!1),p===void 0?s=void 0:(s=new p(i),s._$AT(i,t,r)),r!==void 0?((n=(l=t)._$Co)!==null&&n!==void 0?n:l._$Co=[])[r]=s:t._$Cl=s),s!==void 0&&(e=We(i,s._$AS(i,e.values),s,r)),e}class zn{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:r},parts:o}=this._$AD,a=((t=e?.creationScope)!==null&&t!==void 0?t:Ee).importNode(r,!0);Se.currentNode=a;let n=Se.nextNode(),l=0,s=0,p=o[0];for(;p!==void 0;){if(l===p.index){let g;p.type===2?g=new ft(n,n.nextSibling,this,e):p.type===1?g=new p.ctor(n,p.name,p.strings,this,e):p.type===6&&(g=new Un(n,this,e)),this._$AV.push(g),p=o[++s]}l!==p?.index&&(n=Se.nextNode(),l++)}return Se.currentNode=Ee,a}v(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class ft{constructor(e,t,r,o){var a;this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=o,this._$Cp=(a=o?.isConnected)===null||a===void 0||a}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=We(this,e,t),ct(e)?e===V||e==null||e===""?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==Ke&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Bn(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==V&&ct(this._$AH)?this._$AA.nextSibling.data=e:this.$(Ee.createTextNode(e)),this._$AH=e}g(e){var t;const{values:r,_$litType$:o}=e,a=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ht.createElement(To(o.h,o.h[0]),this.options)),o);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===a)this._$AH.v(r);else{const n=new zn(a,this),l=n.u(this.options);n.v(r),this.$(l),this._$AH=n}}_$AC(e){let t=Ir.get(e.strings);return t===void 0&&Ir.set(e.strings,t=new ht(e)),t}T(e){So(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,o=0;for(const a of e)o===t.length?t.push(r=new ft(this.k(dt()),this.k(dt()),this,this.options)):r=t[o],r._$AI(a),o++;o<t.length&&(this._$AR(r&&r._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)===null||r===void 0||r.call(this,!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class Lt{constructor(e,t,r,o,a){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=a,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=V}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,r,o){const a=this.strings;let n=!1;if(a===void 0)e=We(this,e,t,0),n=!ct(e)||e!==this._$AH&&e!==Ke,n&&(this._$AH=e);else{const l=e;let s,p;for(e=a[0],s=0;s<a.length-1;s++)p=We(this,l[r+s],t,s),p===Ke&&(p=this._$AH[s]),n||(n=!ct(p)||p!==this._$AH[s]),p===V?e=V:e!==V&&(e+=(p??"")+a[s+1]),this._$AH[s]=p}n&&!o&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Dn extends Lt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}const Rn=qe?qe.emptyScript:"";class Ln extends Lt{constructor(){super(...arguments),this.type=4}j(e){e&&e!==V?this.element.setAttribute(this.name,Rn):this.element.removeAttribute(this.name)}}class Nn extends Lt{constructor(e,t,r,o,a){super(e,t,r,o,a),this.type=5}_$AI(e,t=this){var r;if((e=(r=We(this,e,t,0))!==null&&r!==void 0?r:V)===Ke)return;const o=this._$AH,a=e===V&&o!==V||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==V&&(o===V||a);a&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,r;typeof this._$AH=="function"?this._$AH.call((r=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&r!==void 0?r:this.element,e):this._$AH.handleEvent(e)}}class Un{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){We(this,e)}}const Br=Tt.litHtmlPolyfillSupport;Br?.(ht,ft),((ei=Tt.litHtmlVersions)!==null&&ei!==void 0?ei:Tt.litHtmlVersions=[]).push("2.8.0");const jn=(i,e,t)=>{var r,o;const a=(r=t?.renderBefore)!==null&&r!==void 0?r:e;let n=a._$litPart$;if(n===void 0){const l=(o=t?.renderBefore)!==null&&o!==void 0?o:null;a._$litPart$=n=new ft(e.insertBefore(dt(),l),l,void 0,t??{})}return n._$AI(i),n};var ii,ri;class Ne extends Re{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const r=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=r.firstChild),r}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=jn(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return Ke}}Ne.finalized=!0,Ne._$litElement$=!0,(ii=globalThis.litElementHydrateSupport)===null||ii===void 0||ii.call(globalThis,{LitElement:Ne});const Vr=globalThis.litElementPolyfillSupport;Vr?.({LitElement:Ne});((ri=globalThis.litElementVersions)!==null&&ri!==void 0?ri:globalThis.litElementVersions=[]).push("3.3.3");const Eo=i=>e=>typeof e=="function"?((t,r)=>(customElements.define(t,r),r))(i,e):((t,r)=>{const{kind:o,elements:a}=r;return{kind:o,elements:a,finisher(n){customElements.define(t,n)}}})(i,e);const Hn=(i,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,i)}},Fn=(i,e,t)=>{e.constructor.createProperty(t,i)};function j(i){return(e,t)=>t!==void 0?Fn(i,e,t):Hn(i,e)}const ko=({finisher:i,descriptor:e})=>(t,r)=>{var o;if(r===void 0){const a=(o=t.originalKey)!==null&&o!==void 0?o:t.key,n=e!=null?{kind:"method",placement:"prototype",key:a,descriptor:e(t.key)}:{...t,key:a};return i!=null&&(n.finisher=function(l){i(l,a)}),n}{const a=t.constructor;e!==void 0&&Object.defineProperty(t,r,e(r)),i?.(a,r)}};function Fi(i,e){return ko({descriptor:t=>({get(){var o,a;return(a=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(i))!==null&&a!==void 0?a:null},enumerable:!0,configurable:!0})})}var oi;const qn=((oi=window.HTMLSlotElement)===null||oi===void 0?void 0:oi.prototype.assignedElements)!=null?(i,e)=>i.assignedElements(e):(i,e)=>i.assignedNodes(e).filter((t=>t.nodeType===Node.ELEMENT_NODE));function Kn(i){const{slot:e,selector:t}=i??{};return ko({descriptor:r=>({get(){var o;const a="slot"+(e?`[name=${e}]`:":not([name])"),n=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(a),l=n!=null?qn(n,i):[];return t?l.filter((s=>s.matches(t))):l},enumerable:!0,configurable:!0})})}function Ve(i,e,t){return i?e():t?.()}const Wn=Oo`<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>`,Gn=Oo`<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>`;let I=class extends Ne{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionGroup="options",this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=e=>{switch(e.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=e=>{e&&e.type==="click"&&e.stopPropagation(),this.open=!1,this.updatePopoverState()}}async firstUpdated(){await new Promise(e=>{setTimeout(e,0)}),this.addEventListener("closeDropdown",this.closeOptions)}willUpdate(e){e.has("open")&&this.updatePopoverState()}disconnectedCallback(){var e;(e=super.disconnectedCallback)===null||e===void 0||e.call(this),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){var e,t;this.usePopover&&((t=(e=this.dropdownMenu)===null||e===void 0?void 0:e.togglePopover)===null||t===void 0||t.call(e,this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;const e=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${e.left}px`,this.dropdownMenu.style.top=`${e.bottom}px`,this.dropdownMenu.style.minWidth=`${e.width}px`}mainButtonClicked(){var e;this.openViaButton?this.toggleOptions():(e=this.mainButtonLabelSlotted[0])===null||e===void 0||e.click()}mainButtonKeyDown(e){(e.key==="Enter"||e.key===" ")&&(this.mainButtonClicked(),e.preventDefault())}caretKeyDown(e){(e.key==="Enter"||e.key===" ")&&(this.toggleOptions(),e.preventDefault())}renderOption(e){const{label:t,url:r=void 0,id:o}=e;let a;const n=this.selectedOption===o?"selected":"";return r?a=N`<a
        href=${r}
        @click=${l=>this.optionClicked(l,e)}
        >${t}</a
      >`:a=N`<button
        @click=${l=>this.optionClicked(l,e)}
      >
        ${t}
      </button>`,N`<li role="menuitem" class=${n}>${a}</li>`}optionClicked(e,t){var r;e.stopPropagation(),this.selectedOption!==t.id&&(this.selectedOption=t.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:t}})),(r=t.selectedHandler)===null||r===void 0||r.call(t,t)),this.closeOnSelect&&(this.closeOptions(),this.mainButton.focus())}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(e=>this.selectedOption!==e.id)}get caretUpTemplate(){return N`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${Wn}</slot>
      </span>
    `}get caretDownTemplate(){return N`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${Gn}</slot>
      </span>
    `}get caretTemplate(){return this.displayCaret?this.openViaButton?N`
        <span class="caret" aria-hidden="true">
          ${this.caretUpTemplate} ${this.caretDownTemplate}
        </span>
      `:N`
      <button
        class="caret"
        aria-labelledby="caret-label"
        aria-haspopup="true"
        aria-expanded=${this.open}
        @click=${Ve(this.shouldAttachEventHandlers,()=>this.toggleOptions)}
        @keydown=${Ve(this.shouldAttachEventHandlers,()=>this.caretKeyDown)}
        ?disabled=${this.isDisabled}
      >
        ${this.caretUpTemplate} ${this.caretDownTemplate}
      </button>
    `:N``}get dropdownTemplate(){return this.isCustomList?N`<slot name="list"></slot>`:N`${this.availableOptions.map(e=>this.renderOption(e))}`}get backdropTemplate(){return this.closeOnBackdropClick?this.open?N`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `:N``:N``}get shouldNestCaretInButton(){return this.openViaButton}get shouldAttachEventHandlers(){return!this.isDisabled&&!this.hasCustomClickHandler}render(){return N`
      <div class="ia-dropdown-group ${this.open?"open":""}">
        <div class="button-row">
          <button
            class="click-main"
            aria-haspopup=${this.openViaButton}
            aria-expanded=${this.open}
            @click=${Ve(this.shouldAttachEventHandlers,()=>this.mainButtonClicked)}
            @keydown=${Ve(this.shouldAttachEventHandlers,()=>this.mainButtonKeyDown)}
            ?disabled=${this.isDisabled}
          >
            <span class="sr-only" id="caret-label"
              >Toggle ${this.optionGroup}</span
            >
            <slot name="dropdown-label"></slot>
            ${Ve(this.shouldNestCaretInButton,()=>this.caretTemplate)}
          </button>
          ${Ve(!this.shouldNestCaretInButton,()=>this.caretTemplate)}
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
    `}static get styles(){const e=q`var(--dropdownBorderWidth, 1px)`,t=q`var(--dropdownBorderRadius, 4px)`,r=q`var(--dropdownBorderColor, #fff)`,o=q`var(--dropdownBgColor, #333)`,a=q`var(--dropdownTextColor, #fff)`,n=q`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,l=q`var(--dropdownSelectedBgColor, #fff)`,s=q`var(--dropdownMainButtonBgColor, transparent)`,p=q`var(--dropdownTextAlign, inherit)`,g=q`var(--dropdownBackdropZIndex, 1)`,h=q`var(--dropdownListZIndex, 2)`;return q`
      :host {
        display: inline;
        color: ${a};
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
        background: ${s};
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
        z-index: ${h};
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
          ${s}
        );
      }

      button.click-main:focus,
      button.click-main:focus-visible {
        background-color: var(
          --dropdownMainButtonFocusBgColor,
          ${s}
        );
      }

      button.click-main:active {
        background-color: var(
          --dropdownMainButtonActiveBgColor,
          ${s}
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
        z-index: ${g};
      }

      ul {
        z-index: ${h};
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
        color: ${a};
        background: ${o};

        font-size: var(--dropdownFontSize, inherit);

        border-top: var(--dropdownBorderTopWidth, ${e});
        border-right: var(--dropdownBorderRightWidth, ${e});
        border-bottom: var(--dropdownBorderBottomWidth, ${e});
        border-left: var(--dropdownBorderLeftWidth, ${e});
        /* Must be after border-width settings for specificity */
        border-style: solid;
        border-color: ${r};

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
        background: ${o};
        list-style: none;
        height: 30px;
        cursor: pointer;
        border-bottom: 0.5px solid ${o};
        border-top: 0.5px solid ${o};
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
        color: ${a};
        background: var(--dropdownItemButtonBgColor, transparent);
        padding: var(--dropdownItemButtonPadding, 0);
        text-align: ${p};
      }
    `}};c([j({type:Boolean,reflect:!0})],I.prototype,"open",void 0);c([j({type:Boolean,reflect:!0})],I.prototype,"isDisabled",void 0);c([j({type:Boolean})],I.prototype,"displayCaret",void 0);c([j({type:Boolean})],I.prototype,"closeOnSelect",void 0);c([j({type:Boolean})],I.prototype,"openViaButton",void 0);c([j({type:Boolean})],I.prototype,"usePopover",void 0);c([j({type:Boolean})],I.prototype,"includeSelectedOption",void 0);c([j({type:String})],I.prototype,"selectedOption",void 0);c([j({attribute:!1})],I.prototype,"options",void 0);c([j({type:String})],I.prototype,"optionGroup",void 0);c([j({attribute:!1})],I.prototype,"optionSelected",void 0);c([j({type:Boolean,reflect:!0})],I.prototype,"isCustomList",void 0);c([j({type:Boolean,reflect:!0})],I.prototype,"hasCustomClickHandler",void 0);c([j({type:Boolean,reflect:!0})],I.prototype,"closeOnEscape",void 0);c([j({type:Boolean,reflect:!0})],I.prototype,"closeOnBackdropClick",void 0);c([Fi(".ia-dropdown-group")],I.prototype,"container",void 0);c([Fi("#dropdown-main")],I.prototype,"dropdownMenu",void 0);c([Fi(".click-main")],I.prototype,"mainButton",void 0);c([Kn({slot:"dropdown-label"})],I.prototype,"mainButtonLabelSlotted",void 0);I=c([Eo("ia-dropdown")],I);let wi=class extends Ne{render(){return N`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `}};wi.styles=q`
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
  `;wi=c([Eo("ia-icon-label")],wi);var Zn=Object.defineProperty,Jn=Object.getOwnPropertyDescriptor,te=(i,e,t,r)=>{for(var o=r>1?void 0:r?Jn(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&Zn(e,t,o),o};const zr={CategoryChanged:"categoryChanged",SearchRequested:"searchRequested"};let Z=class extends x{constructor(){super(...arguments),this.categories=[],this.placeholder=U("Search"),this.useMobileView=!1,this.hideDropdown=!1,this.loading=!1}get resolvedCategory(){return this.selectedCategory??this.categories?.[0]?.id??""}render(){return d`
      <div id="container" part="container" role="search">
        <div
          id="main-bar"
          part="main-bar"
          class=${this.hideDropdown?"no-dropdown":y}
        >
          ${this.hideDropdown?y:this.dropdownTemplate}
          ${this.textBoxTemplate} ${this.searchButtonTemplate}
        </div>
      </div>
    `}willUpdate(i){if(i.has("selectedCategory")||i.has("categories")){const e=this.resolvedCategory;this.categoryDropdown&&this.categoryDropdown.selectedOption!==e&&(this.categoryDropdown.selectedOption=e)}}get dropdownTemplate(){return d`
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
        clearButtonScreenReaderLabel=${U("Clear search query")}
        screenReaderLabel=${U("Search the Archive. Filters and Advanced Search available below.")}
        @clear=${this.searchFieldCleared}
        @submit=${this.handleSubmit}
      ></ia-clearable-text-input>
    `}get searchButtonTemplate(){return d`
      <button
        id="search-button"
        part="search-button"
        class=${this.loading?"loading":y}
        type="button"
        aria-label=${U("Search")}
        @click=${this.handleSubmit}
      >
        ${this.loading?d`<ia-status-indicator
              mode="loading"
              class="search-button-loading-icon"
            ></ia-status-indicator>`:d`<img src=${nn} alt="" />`}
      </button>
    `}get selectedCategoryLabel(){return this.categories.find(e=>e.id===this.resolvedCategory)?.label??this.resolvedCategory}get spacedQuery(){return this.query?.replace(/\+/g," ")??""}searchFieldCleared(){this.query&&this.emitSearchRequested()}handleSubmit(){this.emitSearchRequested()}handleCategorySelected(i){const e=i.detail.option.id;e!==this.resolvedCategory&&(this.selectedCategory=e,setTimeout(()=>this.searchInput.focus()),this.dispatchEvent(new CustomEvent(zr.CategoryChanged,{detail:e})))}emitSearchRequested(){this.dispatchEvent(new CustomEvent(zr.SearchRequested,{detail:{query:this.searchInput.value,category:this.resolvedCategory}}))}static get styles(){const i=_`
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
    `;return[z,i]}};te([u({type:String})],Z.prototype,"query",2);te([u({type:Array})],Z.prototype,"categories",2);te([u({type:String})],Z.prototype,"selectedCategory",2);te([u({type:String})],Z.prototype,"placeholder",2);te([u({type:Boolean})],Z.prototype,"useMobileView",2);te([u({type:Boolean})],Z.prototype,"hideDropdown",2);te([u({type:Boolean})],Z.prototype,"loading",2);te([S("#search-input")],Z.prototype,"searchInput",2);te([S("#category-dropdown")],Z.prototype,"categoryDropdown",2);Z=te([C("ia-dropdown-search-bar")],Z);var Yn=Object.defineProperty,Xn=Object.getOwnPropertyDescriptor,G=(i,e,t,r)=>{for(var o=r>1?void 0:r?Xn(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&Yn(e,t,o),o};const Qn=[{label:"Bar height",cssVariable:"--ia-theme-search-bar-height",defaultValue:"30px",inputType:"text"},{label:"Bar width",cssVariable:"--ia-theme-search-bar-width",defaultValue:"300px",inputType:"text"},{label:"Internal padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown z-index",cssVariable:"--dropdown-z-index",defaultValue:2,inputType:"number",min:0,step:1}],Dr=[{id:"all",label:"All"},{id:"texts",label:"Books/Documents"},{id:"fulltext",label:"Text Contents"},{id:"radio",label:"Radio"},{id:"tv",label:"TV"},{id:"movies",label:"Video"},{id:"audio",label:"Audio"},{id:"software",label:"Software"},{id:"image",label:"Images"},{id:"etree",label:"Live Music"},{id:"collection",label:"Collections"},{id:"data",label:"Data"},{id:"web",label:"Web Sites"}],es="all",Rr="Search";let H=class extends x{constructor(){super(...arguments),this.query="",this.selectedCategory=es,this.placeholder=Rr,this.hideDropdown=!1,this.loading=!1,this.announcerText=""}render(){return d`
      <story-template
        elementTag="ia-dropdown-search-bar"
        elementClassName="IADropdownSearchBar"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:Qn}}
      >
        <div slot="demo">
          <ia-dropdown-search-bar
            .query=${this.query}
            .categories=${Dr}
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
                  ${an(Dr,i=>d`<option value=${i.id}>
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
                  value=${Rr}
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
    `}get exampleUsage(){const{query:i,selectedCategory:e,placeholder:t,hideDropdown:r,loading:o}=this,a=s=>s?`"${s}"`:"",n={query:a(i),selectedCategory:a(e),placeholder:a(t),hideDropdown:r,loading:o};return`
      <ia-dropdown-search-bar
        .categories=\${[
          { id: 'foo', label: 'Foo Option' },
          { id: 'bar', label: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(n).map(([s,p])=>p?p===!0?s:`${s}=${p}`:"").join(`
  `)}
      >
      </ia-dropdown-search-bar>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(i){i.preventDefault(),this.query=this.queryInput.value,this.selectedCategory=this.selectedCategorySelect.value,this.placeholder=this.placeholderInput.value,this.hideDropdown=this.hideDropdownCheck.checked,this.loading=this.loadingCheck.checked}handleSearchRequested(i){this.announcerText=`Category ID "${i.detail.category}" / Query "${i.detail.query}"`}static get styles(){return _`
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
    `}};G([w()],H.prototype,"query",2);G([w()],H.prototype,"selectedCategory",2);G([w()],H.prototype,"placeholder",2);G([w()],H.prototype,"hideDropdown",2);G([w()],H.prototype,"loading",2);G([w()],H.prototype,"announcerText",2);G([S("#settings__query")],H.prototype,"queryInput",2);G([S("#settings__selected-category")],H.prototype,"selectedCategorySelect",2);G([S("#settings__placeholder")],H.prototype,"placeholderInput",2);G([S("#settings__hide-dropdown")],H.prototype,"hideDropdownCheck",2);G([S("#settings__loading")],H.prototype,"loadingCheck",2);H=G([C("ia-dropdown-search-bar-story")],H);const ts=Object.freeze(Object.defineProperty({__proto__:null,get IADropdownSearchBarStory(){return H}},Symbol.toStringTag,{value:"Module"}));function m(i){let e,t,r;return e=i,(o,a,n)=>{if(n.value!=null)n.value=Lr(n.value,e,t,r);else if(n.get!=null)n.get=Lr(n.get,e,t,r);else throw"Only put a Memoize() decorator on a method or get accessor."}}const ai=new Map;function Lr(i,e,t=0,r){const o=Symbol("__memoized_map__");return function(...a){let n;this.hasOwnProperty(o)||Object.defineProperty(this,o,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let l=this[o];if(Array.isArray(r))for(const s of r)ai.has(s)?ai.get(s).push(l):ai.set(s,[l]);if(e||a.length>0||t>0){let s;e===!0?s=a.map(h=>h.toString()).join("!"):e?s=e.apply(this,a):s=a[0];const p=`${s}__timestamp`;let g=!1;if(t>0)if(!l.has(p))g=!0;else{let h=l.get(p);g=Date.now()-h>t}l.has(s)&&!g?n=l.get(s):(n=i.apply(this,a),l.set(s,n),t>0&&l.set(p,Date.now()))}else{const s=this;l.has(s)?n=l.get(s):(n=i.apply(this,a),l.set(s,n))}return n}}class $i{parseValue(e){if(typeof e=="string"){const t=e.trim().toLowerCase();if(t==="false"||t==="0"||t==="no")return!1;if(t==="true"||t==="1"||t==="yes")return!0}return!!e}}$i.shared=new $i;class ae{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}ae.shared=new ae;class Et{parseValue(e){return ae.shared.parseValue(e)}}Et.shared=new Et;class pt{parseValue(e){return this.parseJSDate(e)||this.parseBracketDate(e)}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const r=Date.parse(t);if(Number.isNaN(r))return;let o=new Date(t);return(t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(o=new Date(o.getTime()+o.getTimezoneOffset()*1e3*60)),o}}pt.shared=new pt;class kt{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let r;return t.length===1?r=this.parseNumberFormat(t[0]):r=this.parseColonSeparatedFormat(t),r}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const r=e.map((o,a)=>{const n=parseFloat(o);if(Number.isNaN(n))return t=!0,0;const s=60**(e.length-1-a);return n*Math.floor(s)}).reduce((o,a)=>o+a,0);return t?void 0:r}}kt.shared=new kt;class is{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let r=[];for(const o of this.separators)if(r=t.split(o),r.length>1)break;return this.parseListValues(r)}parseListValues(e){const r=e.map(a=>a.trim()).map(a=>this.parser.parseValue(a)),o=[];return r.forEach(a=>{a!==void 0&&o.push(a)}),o}}class Pt{parseValue(e){return String(e)}}Pt.shared=new Pt;class Ie{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const e=ae.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return this.rawValue.size!=null?Et.shared.parseValue(this.rawValue.size):void 0}get title(){return this.rawValue.title}get length(){return this.rawValue.length!=null?kt.shared.parseValue(this.rawValue.length):void 0}get height(){return this.rawValue.height!=null?ae.shared.parseValue(this.rawValue.height):void 0}get width(){return this.rawValue.width!=null?ae.shared.parseValue(this.rawValue.width):void 0}get track(){return this.rawValue.track!=null?ae.shared.parseValue(this.rawValue.track):void 0}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}constructor(e={}){this.rawValue=e}}c([m()],Ie.prototype,"mtime",null);c([m()],Ie.prototype,"size",null);c([m()],Ie.prototype,"length",null);c([m()],Ie.prototype,"height",null);c([m()],Ie.prototype,"width",null);c([m()],Ie.prototype,"track",null);class ie{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,t){this.parser=e,this.rawValue=t}parseRawValue(){const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(r=>{const o=this.parser.parseValue(r);Array.isArray(o)?t.push(...o):o!==void 0&&t.push(o)}),t}}c([m()],ie.prototype,"values",null);c([m()],ie.prototype,"value",null);class Nr extends ie{constructor(e){super($i.shared,e)}}class se extends ie{constructor(e){super(pt.shared,e)}}class ni extends ie{constructor(e){super(kt.shared,e)}}class F extends ie{constructor(e){super(ae.shared,e)}}class $ extends ie{constructor(e){super(Pt.shared,e)}}class qi{constructor(e){this.allowed=e}parseValue(e){return typeof e=="string"&&this.allowed.includes(e)?e:void 0}}class Ki extends ie{constructor(e,t){super(t,e)}}const rs=new qi(["rl","lr"]);class os extends Ki{constructor(e){super(e,rs)}}class Ur extends ie{constructor(e){super(Et.shared,e)}}const as=new qi(["account","audio","collection","data","etree","image","movies","search","software","texts","web"]);class ns extends Ki{constructor(e){super(e,as)}}class ss extends ie{constructor(e,t){super(t,e)}}class ls extends ss{constructor(e){const t=new is(Pt.shared);super(e,t)}}const ds=new qi(["true","none","frozen"]);class f{get identifier(){return this.rawMetadata.identifier}get addeddate(){return this.rawMetadata.addeddate!=null?new se(this.rawMetadata.addeddate):void 0}get audio_codec(){return this.rawMetadata.audio_codec!=null?new $(this.rawMetadata.audio_codec):void 0}get audio_sample_rate(){return this.rawMetadata.audio_sample_rate!=null?new F(this.rawMetadata.audio_sample_rate):void 0}get avg_rating(){return this.rawMetadata.avg_rating!=null?new F(this.rawMetadata.avg_rating):void 0}get collection(){return this.rawMetadata.collection!=null?new $(this.rawMetadata.collection):void 0}get collections_raw(){return this.rawMetadata.collections_raw!=null?new $(this.rawMetadata.collections_raw):void 0}get collection_size(){return this.rawMetadata.collection_size!=null?new Ur(this.rawMetadata.collection_size):void 0}get contact(){return this.rawMetadata.contact!=null?new $(this.rawMetadata.contact):void 0}get contributor(){return this.rawMetadata.contributor!=null?new $(this.rawMetadata.contributor):void 0}get coverage(){return this.rawMetadata.coverage!=null?new $(this.rawMetadata.coverage):void 0}get creator(){return this.rawMetadata.creator!=null?new $(this.rawMetadata.creator):void 0}get creator_alt_script(){return this.rawMetadata["creator-alt-script"]!=null?new $(this.rawMetadata["creator-alt-script"]):void 0}get credits(){return this.rawMetadata.credits!=null?new $(this.rawMetadata.credits):void 0}get collection_layout(){return this.rawMetadata.collection_layout!=null?new $(this.rawMetadata.collection_layout):void 0}get date(){return this.rawMetadata.date!=null?new se(this.rawMetadata.date):void 0}get description(){return this.rawMetadata.description!=null?new $(this.rawMetadata.description):void 0}get downloads(){return this.rawMetadata.downloads!=null?new F(this.rawMetadata.downloads):void 0}get duration(){return this.rawMetadata.duration!=null?new ni(this.rawMetadata.duration):void 0}get external_identifier(){return this.rawMetadata["external-identifier"]!=null?new $(this.rawMetadata["external-identifier"]):void 0}get external_link(){return this.rawMetadata["external-link"]!=null?new $(this.rawMetadata["external-link"]):void 0}get files_count(){return this.rawMetadata.files_count!=null?new F(this.rawMetadata.files_count):void 0}get indexdate(){return this.rawMetadata.indexdate!=null?new se(this.rawMetadata.indexdate):void 0}get isbn(){return this.rawMetadata.isbn!=null?new $(this.rawMetadata.isbn):void 0}get issue(){return this.rawMetadata.issue!=null?new $(this.rawMetadata.issue):void 0}get item_count(){return this.rawMetadata.item_count!=null?new F(this.rawMetadata.item_count):void 0}get item_size(){return this.rawMetadata.item_size!=null?new Ur(this.rawMetadata.item_size):void 0}get language(){return this.rawMetadata.language!=null?new $(this.rawMetadata.language):void 0}get length(){return this.rawMetadata.length!=null?new ni(this.rawMetadata.length):void 0}get licenseurl(){return this.rawMetadata.licenseurl!=null?new $(this.rawMetadata.licenseurl):void 0}get lineage(){return this.rawMetadata.lineage!=null?new $(this.rawMetadata.lineage):void 0}get month(){return this.rawMetadata.month!=null?new F(this.rawMetadata.month):void 0}get mediatype(){return this.rawMetadata.mediatype!=null?new ns(this.rawMetadata.mediatype):void 0}get noindex(){return this.rawMetadata.noindex!=null?new Nr(this.rawMetadata.noindex):void 0}get notes(){return this.rawMetadata.notes!=null?new $(this.rawMetadata.notes):void 0}get num_favorites(){return this.rawMetadata.num_favorites!=null?new F(this.rawMetadata.num_favorites):void 0}get num_reviews(){return this.rawMetadata.num_reviews!=null?new F(this.rawMetadata.num_reviews):void 0}get openlibrary_edition(){return this.rawMetadata.openlibrary_edition!=null?new $(this.rawMetadata.openlibrary_edition):void 0}get openlibrary_work(){return this.rawMetadata.openlibrary_work!=null?new $(this.rawMetadata.openlibrary_work):void 0}get page_progression(){return this.rawMetadata.page_progression!=null?new os(this.rawMetadata.page_progression):void 0}get paginated(){return this.rawMetadata.paginated!=null?new Nr(this.rawMetadata.paginated):void 0}get partner(){return this.rawMetadata.partner!=null?new $(this.rawMetadata.partner):void 0}get post_text(){return this.rawMetadata.post_text!=null?new $(this.rawMetadata.post_text):void 0}get ppi(){return this.rawMetadata.ppi!=null?new F(this.rawMetadata.ppi):void 0}get publicdate(){return this.rawMetadata.publicdate!=null?new se(this.rawMetadata.publicdate):void 0}get publisher(){return this.rawMetadata.publisher!=null?new $(this.rawMetadata.publisher):void 0}get reviewdate(){return this.rawMetadata.reviewdate!=null?new se(this.rawMetadata.reviewdate):void 0}get reviews_allowed(){return this.rawMetadata["reviews-allowed"]!=null?new Ki(this.rawMetadata["reviews-allowed"],ds):void 0}get rights(){return this.rawMetadata.rights!=null?new $(this.rawMetadata.rights):void 0}get rights_holder(){var e;const t=(e=this.rawMetadata["rights-holder"])!==null&&e!==void 0?e:this.rawMetadata.rights_holder;return t!=null?new $(t):void 0}get runtime(){return this.rawMetadata.runtime!=null?new ni(this.rawMetadata.runtime):void 0}get scanner(){return this.rawMetadata.scanner!=null?new $(this.rawMetadata.scanner):void 0}get segments(){return this.rawMetadata.segments!=null?new $(this.rawMetadata.segments):void 0}get shotlist(){return this.rawMetadata.shotlist!=null?new $(this.rawMetadata.shotlist):void 0}get source(){return this.rawMetadata.source!=null?new $(this.rawMetadata.source):void 0}get sponsor(){return this.rawMetadata.sponsor!=null?new $(this.rawMetadata.sponsor):void 0}get start_localtime(){return this.rawMetadata.start_localtime!=null?new se(this.rawMetadata.start_localtime):void 0}get start_time(){return this.rawMetadata.start_time!=null?new se(this.rawMetadata.start_time):void 0}get stop_time(){return this.rawMetadata.stop_time!=null?new se(this.rawMetadata.stop_time):void 0}get subject(){return this.rawMetadata.subject!=null?new ls(this.rawMetadata.subject):void 0}get taper(){return this.rawMetadata.taper!=null?new $(this.rawMetadata.taper):void 0}get title(){return this.rawMetadata.title!=null?new $(this.rawMetadata.title):void 0}get title_alt_script(){return this.rawMetadata["title-alt-script"]!=null?new $(this.rawMetadata["title-alt-script"]):void 0}get transferer(){return this.rawMetadata.transferer!=null?new $(this.rawMetadata.transferer):void 0}get track(){return this.rawMetadata.track!=null?new F(this.rawMetadata.track):void 0}get type(){return this.rawMetadata.type!=null?new $(this.rawMetadata.type):void 0}get uploader(){return this.rawMetadata.uploader!=null?new $(this.rawMetadata.uploader):void 0}get utc_offset(){return this.rawMetadata.utc_offset!=null?new F(this.rawMetadata.utc_offset):void 0}get venue(){return this.rawMetadata.venue!=null?new $(this.rawMetadata.venue):void 0}get volume(){return this.rawMetadata.volume!=null?new $(this.rawMetadata.volume):void 0}get week(){return this.rawMetadata.week!=null?new F(this.rawMetadata.week):void 0}get year(){return this.rawMetadata.year!=null?new F(this.rawMetadata.year):void 0}constructor(e={}){this.rawMetadata=e}}c([m()],f.prototype,"addeddate",null);c([m()],f.prototype,"audio_codec",null);c([m()],f.prototype,"audio_sample_rate",null);c([m()],f.prototype,"avg_rating",null);c([m()],f.prototype,"collection",null);c([m()],f.prototype,"collections_raw",null);c([m()],f.prototype,"collection_size",null);c([m()],f.prototype,"contact",null);c([m()],f.prototype,"contributor",null);c([m()],f.prototype,"coverage",null);c([m()],f.prototype,"creator",null);c([m()],f.prototype,"creator_alt_script",null);c([m()],f.prototype,"credits",null);c([m()],f.prototype,"collection_layout",null);c([m()],f.prototype,"date",null);c([m()],f.prototype,"description",null);c([m()],f.prototype,"downloads",null);c([m()],f.prototype,"duration",null);c([m()],f.prototype,"external_identifier",null);c([m()],f.prototype,"external_link",null);c([m()],f.prototype,"files_count",null);c([m()],f.prototype,"indexdate",null);c([m()],f.prototype,"isbn",null);c([m()],f.prototype,"issue",null);c([m()],f.prototype,"item_count",null);c([m()],f.prototype,"item_size",null);c([m()],f.prototype,"language",null);c([m()],f.prototype,"length",null);c([m()],f.prototype,"licenseurl",null);c([m()],f.prototype,"lineage",null);c([m()],f.prototype,"month",null);c([m()],f.prototype,"mediatype",null);c([m()],f.prototype,"noindex",null);c([m()],f.prototype,"notes",null);c([m()],f.prototype,"num_favorites",null);c([m()],f.prototype,"num_reviews",null);c([m()],f.prototype,"openlibrary_edition",null);c([m()],f.prototype,"openlibrary_work",null);c([m()],f.prototype,"page_progression",null);c([m()],f.prototype,"paginated",null);c([m()],f.prototype,"partner",null);c([m()],f.prototype,"post_text",null);c([m()],f.prototype,"ppi",null);c([m()],f.prototype,"publicdate",null);c([m()],f.prototype,"publisher",null);c([m()],f.prototype,"reviewdate",null);c([m()],f.prototype,"reviews_allowed",null);c([m()],f.prototype,"rights",null);c([m()],f.prototype,"rights_holder",null);c([m()],f.prototype,"runtime",null);c([m()],f.prototype,"scanner",null);c([m()],f.prototype,"segments",null);c([m()],f.prototype,"shotlist",null);c([m()],f.prototype,"source",null);c([m()],f.prototype,"sponsor",null);c([m()],f.prototype,"start_localtime",null);c([m()],f.prototype,"start_time",null);c([m()],f.prototype,"stop_time",null);c([m()],f.prototype,"subject",null);c([m()],f.prototype,"taper",null);c([m()],f.prototype,"title",null);c([m()],f.prototype,"title_alt_script",null);c([m()],f.prototype,"transferer",null);c([m()],f.prototype,"track",null);c([m()],f.prototype,"type",null);c([m()],f.prototype,"uploader",null);c([m()],f.prototype,"utc_offset",null);c([m()],f.prototype,"venue",null);c([m()],f.prototype,"volume",null);c([m()],f.prototype,"week",null);c([m()],f.prototype,"year",null);class Nt{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return this.rawValue.reviewdate!=null?pt.shared.parseValue(this.rawValue.reviewdate):void 0}get createdate(){return this.rawValue.createdate!=null?pt.shared.parseValue(this.rawValue.createdate):void 0}get stars(){return this.rawValue.stars!=null?ae.shared.parseValue(this.rawValue.stars):void 0}constructor(e={}){this.rawValue=e}}c([m()],Nt.prototype,"reviewdate",null);c([m()],Nt.prototype,"createdate",null);c([m()],Nt.prototype,"stars",null);class Po{constructor(e){var t,r;this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=(t=e.files)===null||t===void 0?void 0:t.map(o=>new Ie(o)),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new f(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=(r=e.reviews)===null||r===void 0?void 0:r.map(o=>new Nt(o))}}var Ce;(function(i){i.networkError="MetadataService.NetworkError",i.itemNotFound="MetadataService.ItemNotFound",i.decodingError="MetadataService.DecodingError",i.searchEngineError="MetadataService.SearchEngineError"})(Ce||(Ce={}));class xi extends Error{constructor(e,t,r){super(t),this.name=e,this.type=e,this.details=r}}class cs{constructor(e){var t;if(this.baseUrl=(t=e?.baseUrl)!==null&&t!==void 0?t:"archive.org",e?.includeCredentials!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,e?.scope!==void 0)this.requestScope=e.scope;else{const o=new URL(window.location.href).searchParams.get("scope");o&&(this.requestScope=o)}}async fetchMetadata(e,t){const r=t?`/${t}`:"",o=`https://${this.baseUrl}/metadata/${e}${r}`;return this.fetchUrl(o)}async fetchUrl(e,t){var r;const o=new URL(e);this.requestScope&&o.searchParams.set("scope",this.requestScope);let a;try{const n=(r=t?.requestOptions)!==null&&r!==void 0?r:{credentials:this.includeCredentials?"include":"same-origin"};a=await fetch(o.href,n)}catch(n){const l=n instanceof Error?n.message:typeof n=="string"?n:"Unknown error";return this.getErrorResult(Ce.networkError,l)}try{const n=await a.json(),l=n.error;if(l){const s=n.forensics;return this.getErrorResult(Ce.searchEngineError,l,s)}else return{success:n}}catch(n){const l=n instanceof Error?n.message:typeof n=="string"?n:"Unknown error";return this.getErrorResult(Ce.decodingError,l)}}getErrorResult(e,t,r){return{error:new xi(e,t,r)}}}class jr{constructor(e){this.backend=e}async fetchMetadata(e){var t;const r=await this.backend.fetchMetadata(e);return r.error?r:((t=r.success)===null||t===void 0?void 0:t.metadata)===void 0?{error:new xi(Ce.itemNotFound)}:{success:new Po(r.success)}}async fetchMetadataValue(e,t){var r;const o=await this.backend.fetchMetadata(e,t);return o.error?o:((r=o.success)===null||r===void 0?void 0:r.result)===void 0?{error:new xi(Ce.itemNotFound)}:{success:o.success.result}}}jr.default=new jr(new cs);const hs=d`
  <svg
    class="ia-icon"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m10.5 17.5c1.3807119 0 2.5 1.1192881 2.5 2.5s-1.1192881 2.5-2.5 2.5c-1.38071187 0-2.5-1.1192881-2.5-2.5s1.11928813-2.5 2.5-2.5zm9.5 0c1.3807119 0 2.5 1.1192881 2.5 2.5s-1.1192881 2.5-2.5 2.5-2.5-1.1192881-2.5-2.5 1.1192881-2.5 2.5-2.5zm9.5 0c1.3807119 0 2.5 1.1192881 2.5 2.5s-1.1192881 2.5-2.5 2.5-2.5-1.1192881-2.5-2.5 1.1192881-2.5 2.5-2.5z"
      fill-rule="evenodd"
    />
  </svg>
`,Hr=d`
  <svg
    class="ia-icon"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m9 0c4.9705627 0 9 4.02943725 9 9 0 4.9705627-4.0294373 9-9 9-4.97056275 0-9-4.0294373-9-9 0-4.97056275 4.02943725-9 9-9zm1.6976167 5.28352881c-.365258-.3556459-.9328083-.37581056-1.32099801-.06558269l-.09308988.0844372-3 3.08108108-.08194436.09533317c-.27484337.36339327-.26799482.87009349.01656959 1.22592581l.084491.09308363 3 2.91891889.09533796.0818904c.3633964.2746544.8699472.2677153 1.2256839-.0167901l.093059-.0844712.0818904-.095338c.2746544-.3633964.2677153-.8699472-.0167901-1.2256839l-.0844712-.093059-2.283355-2.2222741 2.3024712-2.36338332.0819252-.09530804c.2997677-.39632298.2644782-.96313393-.1007797-1.31877983z"
      fill-rule="evenodd"
    />
  </svg>
`;var ps=Object.defineProperty,us=Object.getOwnPropertyDescriptor,ge=(i,e,t,r)=>{for(var o=r>1?void 0:r?us(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&ps(e,t,o),o};let X=class extends x{constructor(){super(...arguments),this.icon="",this.href="",this.label="",this.menuDetails="",this.buttonId="",this.selected=!1,this.followable=!1}onClick(i){i.preventDefault(),this.dispatchMenuTypeSelectedEvent()}dispatchMenuTypeSelectedEvent(){this.dispatchEvent(new CustomEvent("menuTypeSelected",{bubbles:!0,composed:!0,detail:{id:this.buttonId}}))}get iconClass(){return this.selected?"active":""}get menuItem(){return d`
      <span
        class="icon ${this.iconClass}"
        aria-hidden="true"
        title=${this.label}
        >${this.icon}</span
      >
      <span class="label">${this.label}</span>
      <span class="menu-details">${this.menuDetails}</span>
    `}get linkButton(){return d`
      <a
        href=${this.href}
        class="menu-item"
        aria-expanded=${this.selected}
        @click=${this.followable?void 0:this.onClick}
        >${this.menuItem}</a
      >
    `}get clickButton(){return d`
      <button
        class="menu-item"
        aria-expanded=${this.selected}
        @click=${this.onClick}
      >
        ${this.menuItem}
      </button>
    `}render(){return this.href?this.linkButton:this.clickButton}static get styles(){return[z,_`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-active-button-bg--: var(
            --item-navigator-active-button-bg,
            var(--mid-gray)
          );
          --item-navigator-menu-button-label-display--: var(
            --item-navigator-menu-button-label-display,
            none
          );
          --item-navigator-icon-inactive-fill--: var(
            --item-navigator-icon-inactive-fill,
            var(--lighter-gray)
          );
          --item-navigator-icon-active-fill--: var(
            --item-navigator-icon-active-fill,
            var(--true-white)
          );
          --item-navigator-icon-width--: var(
            --item-navigator-icon-width,
            2.4em
          );
          --item-navigator-icon-height--: var(
            --item-navigator-icon-height,
            2.4em
          );

          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        a {
          display: inline-block;
          text-decoration: none;
        }

        button.menu-item {
          -webkit-appearance: none;
          appearance: none;
          /* Inherit font-size so the em-sized icon/label resolve against the
             component base rather than the UA default button font-size. */
          font: inherit;
        }

        .menu-item {
          display: inline-flex;
          width: 100%;
          padding: 0;
          text-align: left;
          background: transparent;
          align-items: center;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
          border-radius: 6px;
        }

        .menu-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .label {
          display: var(--item-navigator-menu-button-label-display--);
          padding: 0;
          font-size: 1.6em;
          font-weight: 400;
          color: var(--item-navigator-text-color--);
          text-align: left;
          vertical-align: middle;
          margin-left: 1em;
        }

        .menu-details {
          color: var(--item-navigator-text-color--);
          display: inline-block;
          margin-left: 0.5em;
          font-style: italic;
          font-size: 1.5em;
        }

        .menu-item > .icon {
          position: relative;
          display: inline-flex;
          z-index: 2;
          min-width: 4.2em;
          max-width: 4.2em;
          height: 4.2em;
          vertical-align: middle;
          align-items: center;
          justify-content: center;
        }

        .menu-item > .icon > * {
          /* Prevent tooltip containing icon literal description */
          pointer-events: none;
        }

        /* Size the glyph within the icon box to match the shortcut-rail
           icons, rather than letting the svg fill the whole box. */
        .menu-item > .icon .ia-icon {
          width: var(--item-navigator-icon-width--);
          height: var(--item-navigator-icon-height--);
        }

        .menu-item[aria-expanded='true'] .icon {
          background-color: var(--item-navigator-active-button-bg--);
          border-radius: 1em 0 0 1em;
        }

        .icon .fill-color {
          fill: var(--item-navigator-icon-inactive-fill--);
        }

        .icon.active .fill-color {
          fill: var(--item-navigator-icon-active-fill--);
        }
      `]}};X.shadowRootOptions={...x.shadowRootOptions,delegatesFocus:!0};ge([u({type:Object})],X.prototype,"icon",2);ge([u({type:String})],X.prototype,"href",2);ge([u({type:String})],X.prototype,"label",2);ge([u({type:Object})],X.prototype,"menuDetails",2);ge([u({type:String})],X.prototype,"buttonId",2);ge([u({type:Boolean})],X.prototype,"selected",2);ge([u({type:Boolean})],X.prototype,"followable",2);X=ge([C("ia-menu-button")],X);var gs=Object.defineProperty,ms=Object.getOwnPropertyDescriptor,ne=(i,e,t,r)=>{for(var o=r>1?void 0:r?ms(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&gs(e,t,o),o};const fs={closeDrawer:"menuSliderClosed"};let Q=class extends x{constructor(){super(...arguments),this.menus=[],this.open=!1,this.manuallyHandleClose=!1,this.selectedMenu="",this.selectedMenuAction=y,this.animateMenuOpen=!1}updated(){const i=this.selectedMenuDetails?.actionButton||y;i!==this.selectedMenuAction&&(this.selectedMenuAction=i)}setSelectedMenu({detail:i}){const{id:e}=i;this.selectedMenu=this.selectedMenu===e?"":e,this.selectedMenuAction=this.selectedMenuDetails?.actionButton||y,this.updateComplete.then(()=>{this.contentCloseButton?.focus()})}closeMenu(){this.manuallyHandleClose||(this.open=!1);const{closeDrawer:i}=fs,e=new CustomEvent(i,{detail:this.selectedMenuDetails});this.dispatchEvent(e)}closePanel(){const i=this.selectedMenu;this.selectedMenu="",this.selectedMenuAction=y,i&&this.updateComplete.then(()=>{const e=this.menus.findIndex(t=>t.id===i);e!==-1&&this.menuList.querySelector(`li:nth-child(${e+1}) ia-menu-button`)?.focus()})}handleKeyDown(i){i.key==="Escape"&&(i.preventDefault(),this.selectedMenu?this.closePanel():this.closeMenu())}get selectedMenuDetails(){return this.menus.find(i=>i.id===this.selectedMenu)}get sliderDetailsClass(){const i=this.animateMenuOpen?"animate":"",e=this.open?"open":"";return`${i} ${e}`}get selectedMenuClass(){return this.selectedMenu?"open":""}get menuItems(){return this.menus.map(i=>d`
        <li>
          <ia-menu-button
            @menuTypeSelected=${this.setSelectedMenu}
            .icon=${i.icon}
            .label=${i.label}
            .menuDetails=${i.menuDetails||""}
            .buttonId=${i.id}
            .selected=${i.id===this.selectedMenu}
            .followable=${i.followable||!1}
            .href=${i.href||""}
          ></ia-menu-button>
        </li>
      `)}get renderMenuHeader(){const{label:i="",menuDetails:e=""}=this.selectedMenuDetails||{},t=this.selectedMenuAction?"with-secondary-action":"",r=this.selectedMenuAction?d`<span class="custom-action">${this.selectedMenuAction}</span>`:y;return d`
      <header class=${t}>
        <div class="details">
          <h3>${i}</h3>
          <span class="extra-details">${e}</span>
        </div>
        ${r}
        <button
          class="close"
          aria-label="Close this menu"
          title="Close this menu"
          @click=${this.closePanel}
        >
          ${Hr}
        </button>
      </header>
    `}get closeButton(){return d`
      <button
        class="close"
        aria-label="Close this menu"
        title="Close this menu"
        @click=${this.closeMenu}
      >
        ${Hr}
      </button>
    `}render(){return d`
      <div class="main" @keydown=${this.handleKeyDown}>
        <div class="menu ${this.sliderDetailsClass}">
          ${this.closeButton}
          <ul class="menu-list">
            ${this.menuItems}
          </ul>
          <div
            class="content ${this.selectedMenuClass}"
            @menuTypeSelected=${this.setSelectedMenu}
          >
            ${this.renderMenuHeader}
            <section>
              <div class="selected-menu">
                ${this.selectedMenuDetails?.component||y}
              </div>
            </section>
          </div>
        </div>
      </div>
    `}static get styles(){const i=_`42px`,e=_`var(--item-navigator-menu-width--)`,t=_`var(--item-navigator-animation-timing--)`;return[z,_`
        :host {
          --item-navigator-menu-width--: var(
            --item-navigator-menu-width,
            320px
          );
          --item-navigator-animation-timing--: var(
            --item-navigator-animation-timing,
            200ms
          );
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-menu-slider-bg--: var(
            --item-navigator-menu-slider-bg,
            #212121
          );
          --item-navigator-active-button-bg--: var(
            --item-navigator-active-button-bg,
            var(--mid-gray)
          );
          --item-navigator-subpanel-border-color--: var(
            --item-navigator-subpanel-border-color,
            #4b4b4b
          );
          --item-navigator-header-icon-width--: var(
            --item-navigator-header-icon-width,
            2em
          );
          --item-navigator-header-icon-height--: var(
            --item-navigator-header-icon-height,
            2em
          );
          --item-navigator-icon-fill-color--: var(
            --item-navigator-icon-fill-color,
            var(--true-white)
          );

          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        .main {
          overflow: hidden;
          width: 100%;
          height: 100%;
        }

        .animate {
          transition: transform ${t} ease-out;
        }

        .menu {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: ${e};
          padding: 0.5em 0.5em 0 0;
          box-sizing: border-box;
          font-size: 1.4em;
          color: var(--item-navigator-text-color--);
          background: var(--item-navigator-menu-slider-bg--);
          transform: translateX(calc(${e} * -1));
        }

        button {
          cursor: pointer;
        }

        header {
          margin: 0 0 0.5em 0;
        }

        header * {
          margin: 0;
          display: inline-block;
        }

        header button {
          cursor: pointer;
        }

        header.with-secondary-action .details {
          width: 80%;
        }

        header .details {
          font-weight: bold;
          width: 88%;
        }

        header .custom-action > *,
        button.close {
          padding: 0;
          background-color: transparent;
          border: 0;
        }

        header .custom-action,
        button.close {
          position: absolute;
        }

        button.close {
          /* Reset to the base so the header icon (em) doesn't compound
             against .menu's enlarged font-size. */
          font-size: var(--item-navigator-base-font-size, 10px);
          min-width: 38px;
          min-height: 38px;
          display: flex;
          justify-content: center;
          align-items: center;
          right: 0;
          top: 0;
        }

        button.close .ia-icon {
          width: var(--item-navigator-header-icon-width--);
          height: var(--item-navigator-header-icon-height--);
        }

        .ia-icon .fill-color {
          fill: var(--item-navigator-icon-fill-color--);
        }

        .content {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: ${i};
          z-index: 1;
          transform: translateX(calc(${e} * -1));
          transition: transform ${t} ease-out;
          background: var(--item-navigator-active-button-bg--);
          border-right: 0.2em solid;
          border-color: var(--item-navigator-subpanel-border-color--);
          padding: 0.5em 0 0 0.5em;
          display: flex;
          flex-direction: column;
        }

        .open {
          transform: translateX(0);
        }

        .menu-list {
          padding: 0;
          margin: 0;
          list-style: none;
          background: var(--item-navigator-menu-slider-bg--);
        }

        .menu-list li {
          margin-bottom: 0.2em;
        }

        .content > section {
          overflow: auto;
          overscroll-behavior: contain;
        }
      `]}};ne([u({type:Array})],Q.prototype,"menus",2);ne([u({type:Boolean})],Q.prototype,"open",2);ne([u({type:Boolean})],Q.prototype,"manuallyHandleClose",2);ne([u({type:String})],Q.prototype,"selectedMenu",2);ne([u({type:Object})],Q.prototype,"selectedMenuAction",2);ne([u({type:Boolean})],Q.prototype,"animateMenuOpen",2);ne([S(".content.open button.close")],Q.prototype,"contentCloseButton",2);ne([S(".menu-list")],Q.prototype,"menuList",2);Q=ne([C("ia-menu-slider")],Q);var vs=Object.defineProperty,bs=Object.getOwnPropertyDescriptor,Mo=(i,e,t,r)=>{for(var o=r>1?void 0:r?bs(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&vs(e,t,o),o};let _i=class extends x{constructor(){super(...arguments),this.loaderMessage=""}get bookIconSvg(){return or`
      <g class="bookIcon" transform="matrix(1 0 0 -1 28 67.362264)">
        <path d="m44.71698 31.6981124v-29.99320678s-18.0956599.30735848-18.6322637-.7171698c-.0633962-.12226414-1.890566-.59207545-2.9745282-.59207545-1.3228302 0-3.5122641 0-4.1286791.74547168-.9707547 1.17452827-18.82811278.71660375-18.82811278.71660375v30.040754l1.83849052.7867924.29094339-28.48188608s15.94981097.15339622 17.09094297-1.10716978c.8145283-.90056602 4.997547-.91641507 5.3450942-.3526415.9611321 1.55716977 14.7101883 1.31716978 17.6077354 1.45981128l.3266038 28.22830118z"/>
        <path d="m40.1129424 33.5957539h-12.8337733c-1.8690565 0-3.1098112-.7545283-3.9299999-1.6279245v-26.70452764l1.2362264-.00792453c.4584906.72962262 3.0922641 1.39415091 3.0922641 1.39415091h10.1298111s1.0381131.01754717 1.5141509.47377357c.5643396.54056602.7913207 1.36981129.7913207 1.36981129z"/>
        <path d="m17.3354713 33.5957539h-12.8337733v-25.37660316s0-.75283017.49358489-1.14113205c.52867924-.41433961 1.3415094-.42849055 1.3415094-.42849055h10.59905631s2.2075471-.52698112 3.0928301-1.39415091l1.2.00792453v26.74245214c-.8201886.8581132-2.0530188 1.59-3.8932074 1.59"/>
      </g>
    `}get icon(){return this.bookIconSvg}get loader(){return or`
    <svg
      height="100"
      viewBox="0 0 100 100"
      width="100"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="item-loading"
    >
      <title id="item-loading">Currently loading viewer.</title>
      <desc>Please wait while we load theater.</desc>
      <g fill="#333" fill-rule="evenodd" class="book-icon">
        ${this.icon}
        <path
          class="ring"
          d="m17.8618849 11.6970233c18.5864635-15.59603144 45.6875867-15.59603102 64.2740497.000001 1.9271446 1.6170806 2.1785128 4.4902567.5614466 6.4174186-1.6170661 1.9271618-4.4902166 2.1785323-6.4173612.5614517-15.1996922-12.75416882-37.3625282-12.75416916-52.5622206-.000001-15.19969387 12.7541707-19.04823077 34.5805019-9.1273354 51.7641499 9.9208955 17.183646 30.7471499 24.7638499 49.3923323 17.9774983 18.6451823-6.7863521 29.7266014-25.9801026 26.2811129-45.5206248-.436848-2.4775114 1.2174186-4.8400696 3.6949079-5.2769215 2.4774893-.4368518 4.8400264 1.2174296 5.2768744 3.694941 4.2132065 23.8945096-9.3373563 47.3649806-32.137028 55.6634567-22.799672 8.2984758-48.2663986-.9707372-60.39785211-21.9832155-12.1314534-21.012481-7.42539173-47.7021198 11.16107351-63.2981544z"
          fill-rule="nonzero"
        />
      </g>
    </svg>
    `}render(){const i=this.loaderMessage?d`<h2>${this.loaderMessage}</h2>`:y;return d`
      <div class="place-holder">
        ${i} ${this.loader}
        <h3>Loading viewer</h3>
      </div>
    `}static get styles(){return[z,_`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );

          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        .place-holder {
          width: 30%;
          margin: auto;
          text-align: center;
          color: var(--item-navigator-text-color--);
          position: relative;
        }

        .place-holder svg {
          display: block;
          width: 60%;
          max-width: 100px;
          height: auto;
          margin: auto;
        }

        svg * {
          fill: var(--item-navigator-text-color--);
        }

        svg .ring {
          animation: rotate 1.3s infinite linear;
          transform-origin: 50px 50px;
          transform-box: fill-box;
          display: block; /* transform won't work on inline style */
        }

        @keyframes rotate {
          0% {
            transform: rotate(-360deg);
          }
        }
      `]}};Mo([u({type:String})],_i.prototype,"loaderMessage",2);_i=Mo([C("ia-itemnav-loader")],_i);var ys=Object.defineProperty,ws=Object.getOwnPropertyDescriptor,Io=(i,e,t,r)=>{for(var o=r>1?void 0:r?ws(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&ys(e,t,o),o};let Si=class extends x{constructor(){super(...arguments),this.identifier=""}emitLoaded(){this.dispatchEvent(new CustomEvent("loadingStateUpdated",{detail:{loaded:!0}}))}updated(i){i.has("identifier")&&this.emitLoaded()}get downloadUrl(){return`/download/${this.identifier}`}render(){return d`
      <section>
        <h2>THERE IS NO PREVIEW AVAILABLE FOR THIS ITEM</h2>
        <p>
          This item does not appear to have any files that can be experienced on
          Archive.org. <br />
          Please download files in this item to interact with them on your
          computer.
        </p>
        <a href=${this.downloadUrl}>Show all files</a>
      </section>
    `}static get styles(){return[z,_`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          color: var(--item-navigator-text-color--);
          text-align: center;
          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        section {
          width: 100%;
          margin: 5%;
          padding: 0 5%;
        }

        p {
          font-size: 1.4em;
        }

        a {
          color: var(--item-navigator-text-color--);
          background-color: var(--navy-blue);
          min-height: 35px;
          cursor: pointer;
          line-height: normal;
          border-radius: 0.4em;
          text-align: center;
          vertical-align: middle;
          font-size: 1.4em;
          font-family: var(--base-font-family);
          display: inline-block;
          padding: 0.85em 1.2em;
          border: 1px solid var(--lightest-gray);
          white-space: nowrap;
          appearance: auto;
          box-sizing: border-box;
          user-select: none;
          text-decoration: none;
        }
      `]}};Io([u({type:String})],Si.prototype,"identifier",2);Si=Io([C("ia-no-theater-available")],Si);var $s=Object.defineProperty,xs=Object.getOwnPropertyDescriptor,D=(i,e,t,r)=>{for(var o=r>1?void 0:r?xs(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&$s(e,t,o),o};let B=class extends x{constructor(){super(...arguments),this.viewAvailable=!0,this.baseHost="archive.org",this.signedIn=!1,this.menuContents=[],this.menuShortcuts=[],this.viewportInFullscreen=null,this.menuOpened=!1,this.loaded=!1,this.openMenuState="shift"}disconnectedCallback(){super.disconnectedCallback(),this.removeResizeObserver()}updated(i){i.has("sharedObserver")&&(i.get("sharedObserver")?.removeObserver(this.resizeObserverConfig),this.setResizeObserver())}handleResize(i){const{width:e}=i.contentRect;if(e<=600){this.openMenuState="overlay";return}this.openMenuState="shift"}setResizeObserver(){this.sharedObserver?.addObserver(this.resizeObserverConfig),this.sharedObserver?.addObserver({target:this.headerSlot,handler:{handleResize:({contentRect:i})=>{i.height&&this.requestUpdate()}}})}removeResizeObserver(){this.sharedObserver?.removeObserver(this.resizeObserverConfig)}get resizeObserverConfig(){return{handler:this,target:this.frame}}get loaderTitle(){return this.viewportInFullscreen?"Internet Archive":""}get loadingArea(){return d`
      <div class="loading-area">
        <div class="loading-view">
          <ia-itemnav-loader
            .loaderMessage=${this.loaderTitle}
          ></ia-itemnav-loader>
        </div>
      </div>
    `}slotChange(i,e){const t=i.target.assignedNodes()?.[0];this.dispatchEvent(new CustomEvent("slotChange",{detail:{slot:t,type:e}})),this.requestUpdate()}render(){const i=this.loaded?"":"hidden",e=this.headerSlot?.assignedNodes()[0]?.offsetHeight||0;return d`
      <div id="frame" class=${this.menuClass}>
        <slot
          name="header"
          style=${`height: ${e}px`}
          @slotchange=${t=>this.slotChange(t,"header")}
        ></slot>
        <div class="menu-and-reader">
          ${this.shouldRenderMenu?this.renderSideMenu:y}
          <div id="reader" class=${i}>
            ${this.renderViewport}
          </div>
          ${this.loaded?y:this.loadingArea}
        </div>
      </div>
    `}get noTheaterView(){return d`<ia-no-theater-available
      .identifier=${this.item?.metadata?.identifier}
      @loadingStateUpdated=${this.loadingStateUpdated}
    ></ia-no-theater-available>`}get renderViewport(){if(!this.viewAvailable)return this.noTheaterView;const i=this.loaded?"opacity: 1;":"opacity: 0;";return d`
      <div slot="main" style=${i}>
        <slot
          name="main"
          @slotchange=${e=>this.slotChange(e,"main")}
        ></slot>
      </div>
    `}loadingStateUpdated(i){const{loaded:e}=i.detail;this.loaded=e??!1}manageViewportFullscreen(i){const e=!!i.detail.isFullScreen;this.viewportInFullscreen=e||null;const t=new CustomEvent("fullscreenToggled",{detail:i.detail});this.dispatchEvent(t)}get shouldRenderMenu(){return!!this.menuContents?.length}toggleMenu(i=void 0){this.menuOpened=i!==void 0?i:!this.menuOpened,this.menuOpened?this.updateComplete.then(()=>{this.menuSlider?.shadowRoot?.querySelector("button.close")?.focus()}):this.updateComplete.then(()=>{this.toggleMenuButton?.focus()})}closeMenu(){this.toggleMenu(!1)}setOpenMenu(i){const{id:e}=i.detail;this.openMenu=e!==this.openMenu?e:void 0}setMenuContents(i){const e=[...i.detail];this.menuContents=e}setMenuShortcuts(i){this.menuShortcuts=[...i.detail]}manageSideMenuEvents(i){const{menuId:e,action:t}=i.detail;e&&(t==="open"?this.openShortcut(e):t==="toggle"&&(this.openMenu=e,this.toggleMenu()))}get menuToggleButton(){return d`
      <button
        class="toggle-menu"
        @click=${()=>this.toggleMenu()}
        title="Open side panel"
        aria-label="Open side panel"
        aria-expanded="false"
      >
        ${hs}
      </button>
    `}get selectedMenuId(){return this.openMenu||""}get renderSideMenu(){return d`
      <nav>
        <div class="minimized ${rt({hidden:this.menuOpened})}">
          ${this.shortcuts} ${this.menuToggleButton}
        </div>
        <div id="menu" class=${rt({hidden:!this.menuOpened})}>
          <ia-menu-slider
            .menus=${this.menuContents}
            .selectedMenu=${this.selectedMenuId}
            @menuTypeSelected=${this.setOpenMenu}
            @menuSliderClosed=${this.closeMenu}
            manuallyHandleClose
            open
          ></ia-menu-slider>
        </div>
      </nav>
    `}openShortcut(i=""){this.openMenu=i,this.menuOpened=!0}get shortcuts(){const i=this.menuShortcuts.map(({icon:e,id:t,label:r})=>t==="fullscreen"?d`${e}`:d`
        <button
          class="shortcut ${t}"
          @click=${()=>this.openShortcut(t)}
          title=${r}
          aria-label=${r}
          aria-expanded="false"
        >
          ${e}
        </button>
      `);return d`<div class="shortcuts">${i}</div>`}get menuClass(){const i=this.menuContents?.length||this.menuShortcuts?.length,e=this.menuOpened&&i?"open":"",t=this.viewportInFullscreen?"fullscreen":"";return`${e} ${t} ${this.openMenuState}`}static get styles(){const i=_`var(--item-navigator-menu-width--)`,e=_`var(--item-navigator-animation-timing--)`,t=_`transform ${e} ease-out`,r=_`var(--item-navigator-menu-margin--)`,o=_`var(--item-navigator-theater-bg-color--)`,a=_`var(--item-navigator-icon-width--)`,n=_`var(--item-navigator-icon-height--)`;return[z,_`
        :host {
          --item-navigator-menu-width--: var(
            --item-navigator-menu-width,
            320px
          );
          --item-navigator-animation-timing--: var(
            --item-navigator-animation-timing,
            200ms
          );
          --item-navigator-menu-margin--: var(
            --item-navigator-menu-margin,
            42px
          );
          --item-navigator-theater-bg-color--: var(
            --item-navigator-theater-bg-color,
            #000
          );
          --item-navigator-icon-width--: var(
            --item-navigator-icon-width,
            2.4em
          );
          --item-navigator-icon-height--: var(
            --item-navigator-icon-height,
            2.4em
          );
          --item-navigator-icon-stroke-color--: var(
            --item-navigator-icon-stroke-color,
            var(--true-white)
          );
          --item-navigator-icon-fill-color--: var(
            --item-navigator-icon-fill-color,
            var(--true-white)
          );

          /*
           * The component's internal sizing is expressed in em against this
           * base (10px matches petabox's base font size, which the upstream
           * demo set on the document root). Anchoring it here makes the
           * navigator self-contained — its scale no longer depends on the
           * consumer's root font-size. Override to rescale everything.
           */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        :host,
        #frame,
        .menu-and-reader {
          position: relative;
          overflow: hidden;
          display: block;
        }

        :host,
        #frame,
        .loading-area,
        .loading-view {
          min-height: inherit;
          height: inherit;
        }

        slot {
          display: block;
          width: 100%;
        }

        slot * {
          display: block;
          height: inherit;
        }

        #frame {
          background-color: ${o};
          color-scheme: dark;
          display: flex;
          flex-direction: column;
        }

        #frame.fullscreen {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9;
        }

        .loading-view {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-area {
          width: 100%;
        }

        ia-itemnav-loader {
          display: block;
          width: 100%;
        }

        .hidden {
          display: none !important;
        }

        button {
          /* Buttons don't inherit font-size from the UA stylesheet; inherit it
             so em-sized icons resolve against the component's base, not the
             browser's default button font-size. */
          font: inherit;
          cursor: pointer;
          padding: 0;
          border: 0;
        }

        .menu-and-reader {
          position: relative;
          display: flex;
          flex: 1;
        }

        nav button {
          background: none;
        }

        nav .minimized {
          background: rgba(0, 0, 0, 0.7);
          padding-top: 6px;
          position: absolute;
          width: ${r};
          z-index: 2;
          left: 0;
          border-bottom-right-radius: 5%;
        }

        nav .minimized button {
          margin-bottom: 0.2em;
          margin: auto;
          display: inline-flex;
          vertical-align: middle;
          align-items: center;
          justify-content: center;
          width: ${r};
          height: ${r};
        }

        nav .minimized button > * {
          /** Prevent the icon's SVG description from stealing tooltip message */
          pointer-events: none;
        }

        nav .minimized button.toggle-menu > * {
          border: 2px solid var(--item-navigator-icon-stroke-color--);
          border-radius: ${a};
          width: ${a};
          height: ${n};
          margin: auto;
        }

        .toggle-menu .ia-icon,
        .shortcuts .ia-icon {
          width: ${a};
          height: ${n};
        }

        .ia-icon .fill-color {
          fill: var(--item-navigator-icon-fill-color--);
        }

        #menu {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 3;
          overflow: hidden;
          width: ${i};
          transform: translateX(calc(${i} * -1));
          transition: ${t};
        }

        #reader {
          position: relative;
          z-index: 1;
          transform: translateX(0);
          width: 100%;
          display: flex;
        }

        #reader > * {
          width: 100%;
          display: flex;
          flex: 1;
        }

        .open.overlay #reader {
          transition: none;
        }

        .open #menu {
          width: ${i};
          transform: translateX(0);
          transition: ${t};
        }

        .open.shift #reader {
          width: calc(100% - ${i});
          margin-left: ${i};
          transition: ${t};
        }
      `]}};D([u({type:Object,converter:i=>i&&typeof i=="string"?new Po(JSON.parse(atob(i))):i})],B.prototype,"item",2);D([u({type:Boolean,reflect:!0})],B.prototype,"viewAvailable",2);D([u({type:String})],B.prototype,"baseHost",2);D([u({type:Boolean})],B.prototype,"signedIn",2);D([u({type:Array})],B.prototype,"menuContents",2);D([u({type:Array})],B.prototype,"menuShortcuts",2);D([u({type:Boolean,reflect:!0,attribute:!0})],B.prototype,"viewportInFullscreen",2);D([u({type:Boolean,reflect:!0})],B.prototype,"menuOpened",2);D([u({type:String,reflect:!0})],B.prototype,"openMenu",2);D([u({attribute:!1})],B.prototype,"modal",2);D([u({attribute:!1})],B.prototype,"sharedObserver",2);D([u({type:Boolean,reflect:!0,attribute:!0})],B.prototype,"loaded",2);D([w()],B.prototype,"openMenuState",2);D([S("#frame")],B.prototype,"frame",2);D([S('slot[name="header"]')],B.prototype,"headerSlot",2);D([S("ia-menu-slider")],B.prototype,"menuSlider",2);D([S("button.toggle-menu")],B.prototype,"toggleMenuButton",2);B=D([C("ia-item-navigator")],B);const Fr=(i,e,t)=>{const r=new Map;for(let o=e;o<=t;o++)r.set(i[o],o);return r},_s=gt(class extends mt{constructor(i){if(super(i),i.type!==oe.CHILD)throw Error("repeat() can only be used in text expressions")}dt(i,e,t){let r;t===void 0?t=e:e!==void 0&&(r=e);const o=[],a=[];let n=0;for(const l of i)o[n]=r?r(l,n):n,a[n]=t(l,n),n++;return{values:a,keys:o}}render(i,e,t){return this.dt(i,e,t).values}update(i,[e,t,r]){const o=Va(i),{values:a,keys:n}=this.dt(e,t,r);if(!Array.isArray(o))return this.ut=n,a;const l=this.ut??=[],s=[];let p,g,h=0,v=o.length-1,b=0,A=a.length-1;for(;h<=v&&b<=A;)if(o[h]===null)h++;else if(o[v]===null)v--;else if(l[h]===n[b])s[b]=ve(o[h],a[b]),h++,b++;else if(l[v]===n[A])s[A]=ve(o[v],a[A]),v--,A--;else if(l[h]===n[A])s[A]=ve(o[h],a[A]),Qe(i,s[A+1],o[h]),h++,A--;else if(l[v]===n[b])s[b]=ve(o[v],a[b]),Qe(i,o[h],o[v]),v--,b++;else if(p===void 0&&(p=Fr(n,b,A),g=Fr(l,h,v)),p.has(l[h]))if(p.has(l[v])){const k=g.get(n[b]),jt=k!==void 0?o[k]:null;if(jt===null){const Gi=Qe(i,o[h]);ve(Gi,a[b]),s[b]=Gi}else s[b]=ve(jt,a[b]),Qe(i,o[h],jt),o[k]=null;b++}else Ft(o[v]),v--;else Ft(o[h]),h++;for(;b<=A;){const k=Qe(i,s[A+1]);ve(k,a[b]),s[b++]=k}for(;h<=v;){const k=o[h++];k!==null&&Ft(k)}return this.ut=n,ho(i,s),K}});var Ss=Object.defineProperty,Cs=Object.getOwnPropertyDescriptor,Ze=(i,e,t,r)=>{for(var o=r>1?void 0:r?Cs(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&Ss(e,t,o),o};const qr=d`
  <svg
    class="ia-icon"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="viewableFilesTitleID"
  >
    <title id="viewableFilesTitleID">Viewable Files</title>
    <g class="fill-color">
      <path
        d="m9.83536396 0h10.07241114c.1725502.47117517.3378411.76385809.4958725.87804878.1295523.11419069.3199719.1998337.5712586.25692905.2512868.05709534.4704647.08564301.6575337.08564301h.2806036v15.24362526h-4.3355343v3.8106985h-4.44275v3.7250554h-12.01318261c-.27306495 0-.50313194-.085643-.69020098-.256929-.18706903-.1712861-.30936193-.3425721-.36687867-.5138581l-.06449694-.2785477v-14.2159091c0-.32815965.08627512-.5922949.25882537-.79240577.17255024-.20011086.34510049-.32150776.51765073-.36419068l.25882537-.0640244h3.36472977v-2.54767184c0-.31374722.08627513-.57067627.25882537-.77078714.17255025-.20011086.34510049-.32150776.51765074-.36419068l.25882536-.06402439h3.36472978v-2.56929047c0-.32815964.08627512-.5922949.25882537-.79240576.17255024-.20011087.34510049-.31430156.51765073-.34257207zm10.78355264 15.6294346v-13.53076498c-.2730649-.08536585-.4456152-.16380266-.5176507-.23531042-.1725502-.1424612-.2730649-.27078714-.3015441-.38497783v13.36031043h-9.87808272c0 .0144124-.02149898.0144124-.06449694 0-.04299795-.0144124-.08962561.006929-.13988296.0640244-.05025735.0570953-.07538603.1427383-.07538603.256929s.02149898.210643.06449694.289357c.04299795.078714.08599591.1322062.12899387.1604767l.06449693.0216187h10.71905571zm-10.2449613-2.4412417h7.98003v-11.60421286h-7.98003zm1.6827837-9.41990022h4.6153002c.1725502 0 .3199718.05349224.4422647.16047672s.1834393.23891353.1834393.39578714c0 .15687362-.0611464.28519956-.1834393.38497783s-.2697145.1496674-.4422647.1496674h-4.6153002c-.1725503 0-.3199719-.04988913-.4422647-.1496674-.1222929-.09977827-.1834394-.22810421-.1834394-.38497783 0-.15687361.0611465-.28880266.1834394-.39578714.1222928-.10698448.2697144-.16047672.4422647-.16047672zm-6.08197737 13.50997782h7.72120467v-.8131929h-3.79610541c-.27306495 0-.49950224-.085643-.67931188-.256929-.17980964-.1712861-.29847284-.3425721-.35598958-.5138581l-.06449694-.2785477v-10.02023282h-2.82530086zm6.77217827-11.36890243h3.2139578c.1295522 0 .240956.05709534.3342113.17128603.0932554.11419069.139883.24972284.139883.40659645 0 .15687362-.0466276.28880267-.139883.39578714-.0932553.10698448-.2046591.16047672-.3342113.16047672h-3.2139578c-.1295523 0-.2373264-.05349224-.3233223-.16047672-.0859959-.10698447-.1289938-.23891352-.1289938-.39578714 0-.15687361.0429979-.29240576.1289938-.40659645s.19377-.17128603.3233223-.17128603zm-11.15043132 15.11557653h7.69942646v-.7491685h-3.79610539c-.25854616 0-.48135376-.0892462-.66842279-.2677384-.18706904-.1784922-.30936193-.3605876-.36687868-.546286l-.06449694-.2569291v-10.04101994h-2.80352266zm14.62237682-4.5606985h-.8191949v2.1410754h-9.89986085s-.04299796.0285477-.12899387.085643c-.08599592.0570954-.12201369.1427384-.10805331.2569291 0 .1141907.01786928.210643.05360784.289357.03573856.0787139.07538603.125.1189424.138858l.06449694.0432373h10.71905575v-2.9542683zm-4.3991936 3.8106985h-.8191949v2.077051h-9.8563045c0 .0144124-.02149898.0144124-.06449694 0-.04299795-.0144125-.08962561.0105321-.13988296.0748337-.05025735.0643015-.07538603.1607538-.07538603.289357 0 .1141906.02149898.2070399.06449694.2785476.04299795.0715078.08599591.1141907.12899387.1280488l.06449693.0216186h10.69811519v-2.8686252z"
      />
    </g>
  </svg>
`;let ke=class extends x{constructor(){super(...arguments),this.baseHost="archive.org",this.sortOrderBy="default",this.subPrefix="",this.fileList=[],this.addSortToUrl=!1}firstUpdated(){const i=this.shadowRoot?.querySelector(".content.active");setTimeout(()=>{const e=i;e?.scrollIntoViewIfNeeded?e.scrollIntoViewIfNeeded(!0):i?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})},350)}fileUrl(i){const e=`//${this.baseHost}${i.url_path}`;return this.addSortToUrl&&this.sortOrderBy!=="default"?`${e}?sort=${this.sortOrderBy}`:e}get pdfLabel(){return d`<span class="pdf-label"
      ><span class="sr-only">view this</span> PDF</span
    >`}fileLi(i){const e=this.subPrefix===i.file_subprefix?" active":"",t=this.fileUrl(i),r=(i.file_source??"").match(/^[^+]+\.pdf$/i);return d`
      <li>
        <div class="separator"></div>
        <div class="content${e}">
          <a href=${t}>
            <p class="item-title">
              ${i.title}${r?this.pdfLabel:y}
            </p>
          </a>
        </div>
      </li>
    `}get fileListTemplate(){const i=_s(this.fileList,e=>e?.file_prefix,this.fileLi.bind(this));return d`
      <ul>
        ${i}
        <div class="separator"></div>
      </ul>
    `}render(){return d`${this.fileList.length?this.fileListTemplate:y}`}static get styles(){return[z,_`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-separator-color--: var(
            --item-navigator-separator-color,
            #4b4b4b
          );
          --item-navigator-active-file-border-color--: var(
            --item-navigator-active-file-border-color,
            #538bc5
          );

          display: block;
          overflow-y: auto;
          box-sizing: border-box;
          color: var(--item-navigator-text-color--);
          margin-top: 14px;
          margin-bottom: 2em;
          --active-border-width--: 2px;
          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        a {
          color: var(--item-navigator-text-color--);
          text-decoration: none;
        }

        ul {
          padding: 0;
          list-style: none;
          margin: var(--active-border-width--) 0.5em 1em 0;
        }

        ul > li:first-child .separator {
          display: none;
        }

        li {
          cursor: pointer;
          position: relative;
        }

        li .content {
          border: var(--active-border-width--) solid transparent;
          padding: 0.2em 0 0.4em 0.2em;
        }

        li .content.active {
          border: var(--active-border-width--) solid
            var(--item-navigator-active-file-border-color--);
        }

        li.content a {
          display: flex;
        }

        .item-title {
          margin-block-start: 0em;
          margin-block-end: 0em;
          font-size: 14px;
          font-weight: bold;
          word-wrap: break-word;
          padding-left: 5px;
        }

        .separator {
          background-color: var(--item-navigator-separator-color--);
          width: 98%;
          margin: 1px auto;
          height: 1px;
        }

        .pdf-label {
          border: 1px solid;
          padding: 2px 5px;
          border-radius: 20px;
          display: inline-block;
          margin-left: 5px;
          font-size: 0.9em;
        }

        .pdf-label .sr-only {
          position: absolute;
          clip: rect(1px, 1px, 1px, 1px);
          padding: 0;
          border: 0;
          height: 1px;
          width: 1px;
          overflow: hidden;
        }
      `]}};Ze([u({type:String})],ke.prototype,"baseHost",2);Ze([u({type:String})],ke.prototype,"sortOrderBy",2);Ze([u({type:String})],ke.prototype,"subPrefix",2);Ze([u({type:Array})],ke.prototype,"fileList",2);Ze([u({type:Boolean,reflect:!0})],ke.prototype,"addSortToUrl",2);ke=Ze([C("ia-viewable-files-panel")],ke);var As=Object.defineProperty,Os=Object.getOwnPropertyDescriptor,Ut=(i,e,t,r)=>{for(var o=r>1?void 0:r?Os(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&As(e,t,o),o};const Ts=d`
  <svg name="sort-asc" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd">
      <path
        d="m2.32514544 8.30769231.7756949-2.08468003h2.92824822l.75630252 2.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976 6.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z"
        fill="currentColor"
        fill-rule="nonzero"
      />
      <path
        d="m7.1689722 16.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666 5.3716871v.7756949z"
        fill="currentColor"
        fill-rule="nonzero"
      />
      <path
        d="m10.3846154 11.0769231 2.7692308 5.5384615 2.7692307-5.5384615m-2.7692307 4.1538461v-13.15384612"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.661538"
        transform="matrix(1 0 0 -1 0 18.692308)"
      />
    </g>
  </svg>
`,Es=d`
  <svg name="sort-desc" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd">
      <path
        d="m2.32514544 8.30769231.7756949-2.08468003h2.92824822l.75630252 2.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976 6.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z"
        fill="currentColor"
        fill-rule="nonzero"
      />
      <path
        d="m7.1689722 16.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666 5.3716871v.7756949z"
        fill="currentColor"
        fill-rule="nonzero"
      />
      <path
        d="m10.3846154 11.0769231 2.7692308 5.5384615 2.7692307-5.5384615m-2.7692307 4.1538461v-13.15384612"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.661538"
      />
    </g>
  </svg>
`,ks=d`
  <svg
    name="sort-neutral"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="currentColor" fill-rule="evenodd">
      <path
        d="m2.32514544 8.30769231.7756949-2.08468003h2.92824822l.75630252 2.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976 6.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z"
        fill-rule="nonzero"
      />
      <path
        d="m7.1689722 16.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666 5.3716871v.7756949z"
        fill-rule="nonzero"
      />
      <circle cx="13" cy="9" r="2" />
    </g>
  </svg>
`;let ut=class extends x{constructor(){super(...arguments),this.fileListRaw=[],this.fileListSorted=[],this.sortOrderBy="default"}render(){return d`<div class="sort-multi-file-list">${this.sortButton}</div>`}get sortButton(){return{default:d`
        <button
          class="sort-by neutral-icon"
          aria-label="Sort volumes in initial order"
          @click=${()=>this.sortVolumes("title_asc")}
        >
          ${ks}
        </button>
      `,title_asc:d`
        <button
          class="sort-by asc-icon"
          aria-label="Sort volumes in ascending order"
          @click=${()=>this.sortVolumes("title_desc")}
        >
          ${Ts}
        </button>
      `,title_desc:d`
        <button
          class="sort-by desc-icon"
          aria-label="Sort volumes in descending order"
          @click=${()=>this.sortVolumes("default")}
        >
          ${Es}
        </button>
      `}[this.sortOrderBy]}sortVolumes(i){this.sortOrderBy=i;const e=[...this.fileListRaw].sort((t,r)=>i==="title_asc"?t.title.localeCompare(r.title):i==="title_desc"?r.title.localeCompare(t.title):(t.orig_sort??0)-(r.orig_sort??0));this.dispatchEvent(new CustomEvent("fileListSorted",{detail:{sortType:i,sortedFiles:e},bubbles:!0,composed:!0})),this.fileListSorted=e}static get styles(){return[z,_`
        :host {
          --item-navigator-header-icon-width--: var(
            --item-navigator-header-icon-width,
            18px
          );
          --item-navigator-header-icon-height--: var(
            --item-navigator-header-icon-height,
            18px
          );
          --item-navigator-icon-fill-color--: var(
            --item-navigator-icon-fill-color,
            var(--true-white)
          );

          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        button.sort-by {
          padding: 0;
          background-color: transparent;
          border: 0;
          cursor: pointer;
          color: var(--item-navigator-icon-fill-color--);
          display: inline-flex;
        }

        button.sort-by svg {
          width: var(--item-navigator-header-icon-width--);
          height: var(--item-navigator-header-icon-height--);
        }
      `]}};Ut([u({type:Array})],ut.prototype,"fileListRaw",2);Ut([u({type:Array})],ut.prototype,"fileListSorted",2);Ut([u({type:String,reflect:!0})],ut.prototype,"sortOrderBy",2);ut=Ut([C("ia-sort-files-button")],ut);const Kr=d`
  <svg
    class="ia-icon"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g class="fill-color">
      <path
        d="M70.6784759,10 L70.6784759,21.3240186 C64.5020053,21.66334 58.9104278,22.5826126 53.9037433,24.0818363 C48.8970588,25.5810601 44.8495989,27.4085163 41.7613636,29.5642049 C38.6731283,31.7198935 35.9982175,34.0552229 33.736631,36.5701929 C31.4750446,39.085163 29.8217469,41.5657574 28.776738,44.011976 C27.7317291,46.4581947 26.9173351,48.6848525 26.3335561,50.6919494 C25.7497772,52.6990464 25.4088681,54.3324462 25.3108289,55.592149 L25.2372995,57.4085163 C29.0296346,54.1661122 33.1751337,51.5524507 37.6737968,49.5675316 C42.1724599,47.5826126 46.2934492,46.3118208 50.0367647,45.7551564 C53.7800802,45.1984919 57.2571301,44.8713684 60.4679144,44.7737858 C63.6786988,44.6762031 66.1831551,44.7726769 67.9812834,45.0632069 L70.6784759,45.499002 L70.6784759,57.4051896 L100,33.3765802 L70.6784759,10 Z M76.4438503,62.4883566 L82.8609626,57.1157685 C82.9099822,57.0669772 82.9946524,57.0303837 83.1149733,57.005988 C83.2352941,56.9815924 83.4536542,56.9571967 83.7700535,56.9328011 C84.0864528,56.9084054 84.3905971,56.9449989 84.6824866,57.0425815 C84.9743761,57.1401641 85.217246,57.2854291 85.4110963,57.4783766 C85.6049465,57.671324 85.7263815,57.8409847 85.7754011,57.9873586 L85.8489305,58.2035928 L85.8489305,90 L0,90 L0,17.910845 L43.1784759,17.910845 C43.2765152,17.9596363 43.410205,18.0317143 43.5795455,18.1270792 C43.7488859,18.222444 43.9438503,18.4519849 44.1644385,18.8157019 C44.3850267,19.1794189 44.469697,19.5542249 44.4184492,19.9401198 C44.4184492,20.2794411 44.3092692,20.582169 44.0909091,20.8483034 C43.872549,21.1144378 43.6664439,21.3206919 43.4725936,21.4670659 L43.1818182,21.6134398 C40.557041,23.06609 38.2954545,24.396762 36.3970588,25.6054558 L30.7820856,29.8170326 L11.5274064,29.8170326 L11.5274064,78.1669993 L74.1811497,78.1669993 L74.1811497,65.5355955 C74.1811497,65.1009093 74.3995098,64.6407186 74.8362299,64.1550233 L76.4438503,62.4883566 Z"
      />
    </g>
  </svg>
`,Ps=d`
  <svg
    class="ia-icon"
    viewBox="0 0 34 34"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m31.5297453 8.76273313c-.3135031.40766104-.7447036.83083673-1.2936015 1.26952707-.5488979.4386904-.9169698.7837578-1.1042157 1.0352022.1562166 2.319709-.1417719 4.5297454-.8939653 6.6301092-.7521935 2.1003638-1.8023754 3.9182538-3.1505457 5.45367-1.3481704 1.5354162-2.9627648 2.8284828-4.8437835 3.8791996-1.8810186 1.0507169-3.8321207 1.7483416-5.8533062 2.092874s-4.1215493.2894286-6.30109136-.1653114c-2.17954205-.45474-4.2092874-1.3401455-6.08923604-2.6562165 2.72737.4697196 5.67408517-.2514445 8.8401455-2.1634924-3.0719024-.7521935-4.88979241-2.2881447-5.45367-4.6078537 1.12882516.0631287 1.86550396.0631287 2.21003638 0-2.91568586-1.2850417-4.38904344-3.3693558-4.42007276-6.2529424.21934517.0310293.53284828.1487267.94050931.3530922s.78375775.3060133 1.12829017.3049433c-.81532206-.7211641-1.41076396-1.9045581-1.7863257-3.5501819-.37556173-1.64562376-.17173122-3.17355015.61149155-4.58377912 1.81789001 1.88101862 3.6908838 3.36989086 5.61898138 4.46661672 1.92809757 1.0967259 4.22426707 1.7547614 6.88850847 1.9741066-.2503745-1.1908838-.1722662-2.32719882.2343248-3.40894502.4065911-1.0817462 1.0416221-1.93612241 1.9050931-2.56312861.863471-.62700621 1.8114702-1.0817462 2.8439975-1.36421999 1.0325272-.28247378 2.0827091-.27444896 3.1505456.02407447s1.9767815.87042585 2.726835 1.71570726c1.3791997-.37663172 2.6802911-.87845068 3.9032742-1.50545688-.0310293.37663171-.1407019.74470361-.3290178 1.1042157-.1883158.35951209-.3530922.62593623-.4943291.79927242s-.3841216.4317355-.728654.77519795c-.3445324.34346244-.5638776.57832227-.6580355.70457949.2193452-.09415792.6895998-.23539482 1.410764-.42371067.7211641-.18831586 1.2069334-.39214638 1.4573079-.61149155 0 .44350524-.1567516.86668093-.4702547 1.27434196z"
    />
  </svg>
`,Ms=d`
  <svg
    class="ia-icon"
    viewBox="0 0 34 34"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m30.91057 19.2442068.2670004-5.3339402h-5.7329237c-.0890001-3.4962895.25183-5.42243459 1.0224903-5.77843514.3560005-.17800028.8004955-.28925046 1.333485-.33375053s1.0442346-.0520853 1.5337353-.02275571c.4895008.02932959 1.045246.01466479 1.6672356-.04399439.0890001-1.59997977.1335002-3.24445961.1335002-4.93343953-2.1633102-.20732987-3.6742898-.28115953-4.5329389-.22148898-2.8146294.17800028-4.7847688 1.25965538-5.9104183 3.2449653-.1780003.3256596-.3261653.68873971-.444495 1.08924034-.1183298.40050062-.2144095.76358074-.2882391 1.08924034-.0738297.32565959-.125915.7848194-.1562559 1.37747942-.030341.59266002-.052591 1.04474028-.0667501 1.35624078-.0141592.3115005-.0217444.8449956-.0227558 1.6004854v1.5777298h-3.8229605v5.3339401h3.8669549v14.622824h5.8224296c0-.3560006-.0146648-1.6819003-.0439944-3.9776994-.0293296-2.295799-.0515796-4.2957737-.0667501-5.9999241s-.0075853-3.2525506.0227557-4.6452005h5.4219289z"
    />
  </svg>
`,Is=d`
  <svg
    class="ia-icon"
    viewBox="0 0 34 34"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m8.50321407 8.54544475v5.32088575c.15641786.0310693.6819176.0310693 1.57649923 0 .8945816-.0310693 1.3574071.0160703 1.3884764.1414189.0942792 1.5695354.1333837 3.2253149.1173133 4.9673385-.0160703 1.7420236-.0316049 3.3426283-.0466039 4.8018141s.2046288 2.824628.6588835 4.0963267c.4542546 1.2716986 1.1999178 2.2209194 2.2369897 2.8476622 1.2556283.784232 2.9896167 1.207953 5.2019653 1.271163 2.2123485.0632099 4.1659648-.2506972 5.8608487-.9417213-.0310693-.3449764-.0230341-1.4045467.0241055-3.1787109.0471397-1.7741643-.0080351-2.75499-.1655244-2.9424772-3.5472571 1.0360005-5.697467.6904885-6.4506298-1.0365361-.7220934-1.6638147-.8635123-4.9909084-.4242566-9.981281v-.046604h6.7318605v-5.32088568h-6.7318605v-6.54383772h-4.0497228c-.2828378 1.28669763-.6122795 2.35376743-.9883252 3.20120941-.3760457.84744199-.98029 1.60060471-1.812733 2.25948817-.832443.65888347-1.87594303 1.01993018-3.1305 1.08314014z"
    />
  </svg>
`,Bs=d`
  <svg
    class="ia-icon"
    viewBox="0 0 34 34"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m11.9051049 30.5873434.653491-1.0742755.4207845-.839975c.2805229-.591861.5371377-1.2533214.7698443-1.9843813.2327065-.7310599.4659444-1.6029125.6997135-2.6155579.2337692-1.0126455.4128151-1.752206.5371377-2.2186817.0308151.030815.0775689.0855382.1402615.1641697.0626927.0786314.1094465.1333547.1402615.1641697.1243227.1870153.2178304.311338.280523.372968 1.1210293.964829 2.3817888 1.4631823 3.7822785 1.4950599 1.4939973 0 2.8790795-.3426843 4.1552465-1.0280529 2.1166733-1.1826593 3.6733633-3.1128487 4.6700699-5.7905679.4048457-1.1518444.6848374-2.5996192.8399751-4.3433245.1243226-1.587505-.0781002-3.0974411-.6072685-4.5298084-.903199-2.36638128-2.5528653-4.20306294-4.948999-5.51004497-1.276167-.65349101-2.5990879-1.05833667-3.9687625-1.21453696-1.525875-.21783034-3.1293188-.17107651-4.8103315.14026149-2.7701643.52916833-5.02709913 1.743174-6.77080442 3.64201699-1.99235065 2.14748836-2.98852598 4.62225355-2.98852598 7.42429545 0 2.9571797.9494215 5.0584455 2.84826449 6.3037975l.83997504.4207845c.12432268 0 .22526845.0154075.3028373.0462225s.1551377.0074381.23270656-.0701308c.07756885-.0775688.13229208-.1243226.16416969-.1402614s.07066204-.0860696.11635328-.2103923c.04569124-.1243226.07703756-.2098609.09403895-.2566147.01700139-.0467539.04834771-.1476996.09403895-.3028373s.06906816-.2486454.07013074-.280523l.14026149-.5132295c.06269263-.311338.09403895-.5291684.09403895-.653491-.03081502-.1243227-.12432268-.2799917-.28052297-.467007-.15620029-.1870154-.23376915-.2959305-.23270656-.3267455-.62267599-.8096914-.9494215-1.7904592-.98023652-2.9423035-.03081502-1.55669.28052297-2.9731185.93401399-4.24928547 1.18265932-2.45882635 3.17501002-3.93741618 5.97705192-4.43576949 1.6183201-.311338 3.1356943-.25661476 4.5521228.16416969 1.4164285.42078446 2.5135496 1.09765239 3.2913633 2.03060379.8405063 1.02752164 1.3229208 2.28828114 1.4472435 3.78227848.1243227 1.4004897-.0313463 2.9725872-.467007 4.7162925-.3740306 1.3696746-.9186065 2.5528653-1.6337275 3.5495719-.9967066 1.245352-2.0863896 1.8834355-3.269049 1.9142505-1.7118277.0626926-2.7547568-.6375522-3.1287874-2.1007345-.0935077-.4664757 0-1.2134744.2805229-2.240996.7469987-2.5842117 1.1359055-3.9384788 1.1667206-4.0628015.1870153-1.0275216.2024228-1.7904591.0462225-2.2888124-.1870153-.65349104-.5759222-1.15928246-1.1667205-1.51737429-.5907984-.35809182-1.2756357-.39687625-2.054512-.11635327-1.1826594.43566067-1.9610044 1.40048968-2.335035 2.89448706-.311338 1.306982-.2491767 2.6299028.186484 3.9687625 0 .0626926.0313463.1402615.094039.2327065.0626926.0924451.0940389.1700139.0940389.2327066 0 .0935076-.0313463.2491766-.0940389.467007-.0626927.2178303-.094039.3580918-.094039.4207844-.0935076.4356607-.3038999 1.3308903-.6311767 2.6856887-.3272768 1.3547985-.5838915 2.3897582-.7698443 3.1048793-.7778136 3.2068876-1.12049796 5.5881451-1.02805289 7.1437725l.37296809 2.7558194c.653491-.591861 1.2294131-1.2299445 1.7277664-1.9142505z"
    />
  </svg>
`,Vs=d`
  <svg
    class="ia-icon"
    viewBox="0 0 34 34"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m32 7.04156803v19.91686397c0 .5752421-.4763773 1.041568-1.0640184 1.041568h-27.87196316c-.58764116 0-1.06401844-.4663259-1.06401844-1.041568v-19.91686397c0-.57524214.47637728-1.04156803 1.06401844-1.04156803h27.87196316c.5876411 0 1.0640184.46632589 1.0640184 1.04156803zm-26.25039901 1.19676167 10.04327011 10.1323738c.5135662.4194048.8817166.6291071 1.1044511.6291071.1198794 0 .2695514-.0503424.4490158-.1510273.1794644-.100685.3291364-.2013699.4490158-.3020548l.1798191-.1510273 10.1198794-10.15841306zm16.77212271 9.7303286 6.8831353 6.7889404v-13.5778809zm-17.92871075-6.6379131v13.350819l6.78098955-6.6629107zm22.09008685 14.2059464-5.9074304-5.8588202-.9757049.9551179-.3594018.3295984c-.0342324.0304241-.0665646.0587822-.0969964.0850743l-.1597867.1329606c-.0684912.0540844-.1198794.0895749-.1541644.1064714-.6674943.3687151-1.3523675.5530727-2.0546196.5530727-.65047 0-1.3782586-.218035-2.1833659-.6541048l-.6682036-.4520405-1.0278418-1.0311524-5.95850326 5.832781z"
    />
  </svg>
`,zs=d`
  <svg
    class="ia-icon"
    viewBox="0 0 34 34"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m7.80511706 12.3659763c1.2669254-2.2579539 4.09819784-2.9949938 6.41200864-1.7733458l.2295791.12871 1.6067188.9559859 3.5467013-6.31849361c1.2682451-2.26030597 4.104098-2.99652769 6.4192376-1.76952182l.2223501.12488594 3.2168204 1.91103915c2.2770002 1.3527136 3.1866331 4.21502324 2.0564431 6.51290984l-.1198433.2278304-5.2002499 9.2680474c-1.2669254 2.2579539-4.0981978 2.9949938-6.4120086 1.7733458l-.2295791-.12871-1.6096554-.9558482-3.5437647 6.3183559c-1.2682451 2.260306-4.104098 2.9965277-6.41923761 1.7695218l-.22235013-.1248859-3.21682032-1.9110392c-2.27700024-1.3527136-3.18663314-4.2150232-2.05644312-6.5129098l.11984332-.2278304zm13.93955474-5.73311741-3.563271 6.35055051c1.889633 1.4530595 2.5776248 4.0429866 1.5410255 6.156875l-.1223014.2328355-.4183304.7430134 1.6096554.9558483c1.1431442.6791157 2.5155496.3977368 3.1667361-.5628389l.0921501-.1491451 5.2002498-9.2680474c.5752467-1.0252226.2110342-2.4011579-.8559335-3.14755806l-.1742742-.11247814-3.2168203-1.91103915c-1.1402863-.67741793-2.5086889-.39913772-3.1618387.55564729zm-11.79500786 7.00714351-5.20024982 9.2680474c-.57524673 1.0252226-.21103426 2.4011579.85593348 3.1475581l.17427416.1124781 3.21682032 1.9110392c1.14028632.6774179 2.50868892.3991377 3.16183872-.5556473l.0970474-.1563368 3.5622708-6.3513198c-1.8888875-1.4532134-2.5764504-4.042623-1.5400057-6.1561456l.1222818-.2327956.4153938-.7428758-1.6067188-.9559859c-1.1431442-.6791157-2.5155496-.3977368-3.1667361.5628389zm6.97653866 1.5796652-.3817806.6812386c-.5117123.9119895-.2800268 2.1014993.528439 2.8785267l.382717-.6803391c.5119098-.9123415.2798478-2.1024176-.5293754-2.8794262z"
    />
  </svg>
`;var Ds=Object.defineProperty,Rs=Object.getOwnPropertyDescriptor,re=(i,e,t,r)=>{for(var o=r>1?void 0:r?Rs(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&Ds(e,t,o),o};let J=class extends x{constructor(){super(...arguments),this.baseHost="archive.org",this.creator="",this.description="",this.embedOptionsVisible=!1,this.identifier="",this.sharingOptions=[],this.type="",this.renderHeader=!1,this.fileSubPrefix="",this.copyNoteTimeouts=new WeakMap}updated(i){i.has("sharingOptions")&&!this.sharingOptions.length&&this.loadProviders()}loadProviders(){let i=`https://${this.baseHost}/details/${this.identifier}`;this.fileSubPrefix&&(i+=`/${this.fileSubPrefix}`);const e=[this.description,this.creator,"Free Download, Borrow, and Streaming","Internet Archive"].filter(Boolean).join(" : ");this.sharingOptions=[{name:"Twitter",icon:Ps,url:`https://twitter.com/intent/tweet?${new URLSearchParams({url:i,text:e,via:"internetarchive"})}`},{name:"Facebook",icon:Ms,url:`https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({u:i})}`},{name:"Tumblr",icon:Is,url:`https://www.tumblr.com/widgets/share/tool/preview?${new URLSearchParams({posttype:"link",canonicalUrl:i,title:e})}`},{name:"Pinterest",icon:Bs,url:`http://www.pinterest.com/pin/create/button/?${new URLSearchParams({url:i,description:e})}`},{name:"Email",icon:Vs,url:`mailto:?${new URLSearchParams({subject:e,body:i})}`}]}async copyToClipboard(i){const e=i.currentTarget,t=e.querySelector("textarea"),r=e.querySelector("small");if(!(!t||!r)){try{await navigator.clipboard.writeText(t.value)}catch{t.select(),document.execCommand("copy"),t.blur()}r.classList.add("visible"),clearTimeout(this.copyNoteTimeouts.get(r)),this.copyNoteTimeouts.set(r,setTimeout(()=>r.classList.remove("visible"),4e3))}}get iframeEmbed(){return`<iframe
      src="https://${this.baseHost}/embed/${this.identifier}"
      width="560" height="384" frameborder="0"
      webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen
    ></iframe>`}get bbcodeEmbed(){return`[archiveorg ${this.identifier} width=560 height=384 frameborder=0 webkitallowfullscreen=true mozallowfullscreen=true]`}get helpURL(){return`https://${this.baseHost}/help/audio.php?identifier=${this.identifier}`}get header(){const i=d`<header><h3>Share this ${this.type}</h3></header>`;return this.renderHeader?i:y}render(){return d`
      ${this.header}
      <div>
        ${this.sharingOptions.map(i=>d`<a class="share-option" href=${i.url} target="_blank">
              ${i.icon} ${i.name}
            </a>`)}
        <details>
          <summary class="share-option">
            ${zs} Get an embeddable link
          </summary>
          <div class="embed">
            <h4>Embed</h4>
            <div class="code" @click=${this.copyToClipboard}>
              <textarea readonly>${this.iframeEmbed}</textarea>
              <small>Copied to clipboard</small>
            </div>
            <h4>
              Embed for wordpress.com hosted blogs and archive.org item
              &lt;description&gt; tags
            </h4>
            <div class="code" @click=${this.copyToClipboard}>
              <textarea readonly>${this.bbcodeEmbed}</textarea>
              <small>Copied to clipboard</small>
            </div>
            <p>
              Want more?
              <a href=${this.helpURL}
                >Advanced embedding details, examples, and help</a
              >!
            </p>
          </div>
        </details>
      </div>
    `}static get styles(){return[z,_`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-share-link-color--: var(
            --item-navigator-share-link-color,
            var(--true-white)
          );
          --item-navigator-share-icon-border--: var(
            --item-navigator-share-icon-border,
            #4b4b4b
          );
          --item-navigator-share-icon-bg--: var(
            --item-navigator-share-icon-bg,
            transparent
          );
          --item-navigator-icon-fill-color--: var(
            --item-navigator-icon-fill-color,
            var(--true-white)
          );
          --item-navigator-textarea-color--: var(
            --item-navigator-textarea-color,
            var(--true-white)
          );
          --item-navigator-textarea-bg--: var(
            --item-navigator-textarea-bg,
            #151515
          );

          display: block;
          height: 100%;
          overflow-y: auto;
          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
          box-sizing: border-box;
        }

        header {
          display: flex;
          align-items: baseline;
        }

        h3 {
          padding: 0;
          margin: 0 1em 0 0;
          font-size: 1.6em;
        }

        h4 {
          font-size: 1.4em;
        }

        :host > div {
          padding: 1em 0;
        }

        .share-option {
          display: block;
          padding: 0.5em 0;
          font-size: 1.6em;
          text-decoration: none;
          color: var(--item-navigator-share-link-color--);
          cursor: pointer;
          transition: background-color 0.2s;
          border-radius: 6px;
        }

        .share-option:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        .share-option > * {
          display: inline-block;
          padding: 0.2em;
          margin-right: 1em;
          vertical-align: middle;
          border: 1px solid var(--item-navigator-share-icon-border--);
          border-radius: 7px;
          background: var(--item-navigator-share-icon-bg--);
        }

        .share-option .ia-icon {
          /* Reset to the base so the icon (em) doesn't compound against the
             share-option's enlarged font-size. */
          font-size: var(--item-navigator-base-font-size, 10px);
          width: 2em;
          height: 2em;
        }

        .ia-icon .fill-color {
          fill: var(--item-navigator-icon-fill-color--);
        }

        /* Hide the triangle that appears on details tags */
        summary::marker {
          content: '';
        }

        summary::-webkit-details-marker {
          display: none;
        }

        .embed {
          padding-right: 5px;
        }

        .embed a {
          color: var(--item-navigator-share-link-color--);
        }

        .code {
          position: relative;
        }

        textarea {
          display: block;
          width: 100%;
          height: 120px;
          padding: 0.8em 1em;
          box-sizing: border-box;
          resize: none;
          cursor: pointer;
          font: normal 1.4em var(--base-font-family);
          color: var(--item-navigator-textarea-color--);
          background: var(--item-navigator-textarea-bg--);
        }

        small {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3em;
          padding: 0.5em 1em;
          box-sizing: border-box;
          font: normal 1.2em/2em var(--base-font-family);
          color: var(--item-navigator-textarea-bg--);
          background: var(--item-navigator-textarea-color--);
          opacity: 0;
          transition: opacity 300ms linear;
        }

        small.visible {
          opacity: 1;
        }
      `]}};re([u({type:String})],J.prototype,"baseHost",2);re([u({type:String})],J.prototype,"creator",2);re([u({type:String})],J.prototype,"description",2);re([u({type:Boolean})],J.prototype,"embedOptionsVisible",2);re([u({type:String})],J.prototype,"identifier",2);re([u({type:Array})],J.prototype,"sharingOptions",2);re([u({type:String})],J.prototype,"type",2);re([u({type:Boolean})],J.prototype,"renderHeader",2);re([u({type:String})],J.prototype,"fileSubPrefix",2);J=re([C("ia-share-panel")],J);var Ls=Object.defineProperty,Ns=Object.getOwnPropertyDescriptor,me=(i,e,t,r)=>{for(var o=r>1?void 0:r?Ns(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&Ls(e,t,o),o};class Us{constructor(){this.handlers=new Map,this.observer=new ResizeObserver(e=>{for(const t of e)this.handlers.get(t.target)?.handler.handleResize(t)})}addObserver(e){this.handlers.set(e.target,e),this.observer.observe(e.target)}removeObserver(e){this.handlers.delete(e.target),this.observer.unobserve(e.target)}}const js=d`
  <svg class="ia-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path class="fill-color" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
  </svg>
`,si=[{title:"beyonce-cosmo-article.pdf",file_prefix:"beyonce-cosmo-article",file_subprefix:"beyonce-cosmo-article",file_source:"beyonce-cosmo-article.pdf",url_path:"/details/demo-item/beyonce-cosmo-article.pdf",image:"",author:"",orig_sort:0},{title:"Very cool title that is extra long so it wraps across several rows in the panel",file_prefix:"onestrandriverpdf",file_subprefix:"onestrandriverpdf",file_source:"onestrandriverpdf.pdf",url_path:"/details/demo-item/onestrandriverpdf.pdf",image:"",author:"",orig_sort:1},{title:"The Master Book of American Folk Song",file_prefix:"master-book",file_subprefix:"master-book",file_source:"/01-The Master Book of American Folk Song_jp2.zip",url_path:"/details/demo-item/master-book",image:"",author:"Riley Shepard",orig_sort:2},{title:"Encyclopedia of the Traditional Music and Folk Songs of the United States, Index A–M",file_prefix:"encyclopedia-a-m",file_subprefix:"encyclopedia-a-m",file_source:"/02-Encyclopedia Index A through M_jp2.zip",url_path:"/details/demo-item/encyclopedia-a-m",image:"",author:"Riley Shepard",orig_sort:3},{title:"Letters to Riley Shepard",file_prefix:"letters",file_subprefix:"letters",file_source:"/04-Letters to Riley Shepard_jp2.zip",url_path:"/details/demo-item/letters",image:"",author:"Riley Shepard",orig_sort:4},{title:"Master Book of American Folk Song Vol. 1",file_prefix:"vol-1",file_subprefix:"vol-1",file_source:"/Master Book Vol. 1.pdf",url_path:"/details/demo-item/vol-1",image:"",author:"Riley Shepard",orig_sort:5},{title:"Master Book of American Folk Song Vol. 2",file_prefix:"vol-2",file_subprefix:"vol-2",file_source:"/Master Book Vol. 2.pdf",url_path:"/details/demo-item/vol-2",image:"",author:"Riley Shepard",orig_sort:6}];let ee=class extends x{constructor(){super(...arguments),this.loaded=!0,this.viewAvailable=!0,this.headerOn=!0,this.fullscreen=!1,this.sharedObserver=new Us,this.sortOrderBy="default",this.sortedFiles=[...si]}handleFileListSorted(i){const{sortType:e,sortedFiles:t}=i.detail;this.sortOrderBy=e,this.sortedFiles=t}get demoItem(){return{metadata:{identifier:"demo-item",title:"The Master Book of American Folk Song"}}}get menuContents(){const i={item:this.demoItem,baseHost:"archive.org",subPrefix:""};return[{...i,id:"viewable-files",label:`Viewable Files (${si.length})`,icon:qr,actionButton:d`
          <ia-sort-files-button
            .fileListRaw=${si}
            .sortOrderBy=${this.sortOrderBy}
          ></ia-sort-files-button>
        `,component:d`
          <ia-viewable-files-panel
            baseHost="archive.org"
            subPrefix="master-book"
            .fileList=${this.sortedFiles}
            .sortOrderBy=${this.sortOrderBy}
          ></ia-viewable-files-panel>
        `},{...i,id:"share",label:"Share this item",icon:Kr,component:d`
          <ia-share-panel
            identifier="demo-item"
            baseHost="archive.org"
            type="book"
            creator="Riley Shepard"
            description="The Master Book of American Folk Song"
          ></ia-share-panel>
        `},{...i,id:"about",label:"About This Item",icon:js,component:d`
          <p>
            The item navigator is a shell: each menu entry here is a "provider"
            supplying its own panel body. The theater on the right is slotted in
            by the host.
          </p>
        `}]}get menuShortcuts(){return[{id:"viewable-files",label:"Viewable Files",icon:qr},{id:"share",label:"Share this item",icon:Kr}]}get styleInputData(){return{settings:[{label:"Menu width",cssVariable:"--item-navigator-menu-width",defaultValue:320,inputType:"range",min:200,max:480,step:10,unit:"px"},{label:"Animation timing",cssVariable:"--item-navigator-animation-timing",defaultValue:200,inputType:"range",min:0,max:800,step:50,unit:"ms"},{label:"Theater background",cssVariable:"--item-navigator-theater-bg-color",defaultValue:"#000000",inputType:"color"},{label:"Text color",cssVariable:"--item-navigator-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Menu drawer background",cssVariable:"--item-navigator-menu-slider-bg",defaultValue:"#212121",inputType:"color"},{label:"Active panel background",cssVariable:"--item-navigator-active-button-bg",defaultValue:"#333333",inputType:"color"}]}}render(){return d`
      <story-template
        elementTag="ia-item-navigator"
        elementClassName="IAItemNavigator"
        .styleInputData=${this.styleInputData}
        .customExampleUsage=${this.exampleUsage}
      >
        <div slot="demo">
          <div class="frame-wrapper ${this.fullscreen?"fullscreen":""}">
            <ia-item-navigator
              baseHost="archive.org"
              .item=${this.demoItem}
              .menuContents=${this.menuContents}
              .menuShortcuts=${this.menuShortcuts}
              .sharedObserver=${this.sharedObserver}
              .viewportInFullscreen=${this.fullscreen||null}
              ?loaded=${this.loaded}
              ?viewAvailable=${this.viewAvailable}
              @fileListSorted=${this.handleFileListSorted}
            >
              ${this.headerTemplate} ${this.theaterTemplate}
            </ia-item-navigator>
          </div>
        </div>

        <div slot="settings">
          <table>
            ${this.toggleRow("Loaded","loaded")}
            ${this.toggleRow("View available (theater)","viewAvailable")}
            ${this.toggleRow("Header","headerOn")}
            ${this.toggleRow("Fullscreen","fullscreen")}
          </table>
          <p class="hint">
            Turn "View available" off to show the no-theater placeholder. Open
            "Viewable Files" and use the sort button in its header. Narrow the
            demo below 600px to see the drawer switch from shift to overlay.
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            The navigator is a shell: project a theater into
            <code>slot="main"</code> and an optional bar into
            <code>slot="header"</code>, then drive the drawer with the
            <code>menuContents</code> provider array (and the minimized rail
            with <code>menuShortcuts</code>). It never renders a viewer itself.
          </p>
        </div>
      </story-template>
    `}toggleRow(i,e){return d`
      <tr>
        <td>${i}</td>
        <td>
          <input
            type="checkbox"
            ?checked=${this[e]}
            @change=${t=>{this[e]=t.target.checked}}
          />
        </td>
      </tr>
    `}get headerTemplate(){return!this.headerOn&&!this.fullscreen?y:d`
      <div slot="header" class="demo-header">
        <span class="brand">Internet Archive</span>
        <a class="title" href="/details/demo-item"
          >The Master Book of American Folk Song</a
        >
        ${this.fullscreen?d`<button
              class="exit-fs"
              @click=${()=>{this.fullscreen=!1}}
            >
              Exit fullscreen
            </button>`:y}
      </div>
    `}get theaterTemplate(){return d`
      <div slot="main" class="demo-theater">
        <div class="viewer-mock">
          <div class="spine"></div>
          <div class="page">
            <p class="viewer-title">The Master Book of American Folk Song</p>
            <p class="viewer-note">
              Your theater (book reader, media player, image viewer, …) renders
              here.
            </p>
          </div>
        </div>
      </div>
    `}get exampleUsage(){return`<ia-item-navigator
  baseHost="archive.org"
  .item=\${this.itemMetadata}
  .menuContents=\${this.menuProviders}
  .menuShortcuts=\${this.menuShortcuts}
  .sharedObserver=\${this.sharedObserver}
  ?loaded=\${this.loaded}
>
  <div slot="header">…your header…</div>
  <div slot="main">…your theater…</div>
</ia-item-navigator>`}static get styles(){return _`
      .frame-wrapper {
        height: 460px;
        border: 1px solid #ccc;
      }

      .demo-header {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #1a1a1a;
        color: #fff;
        padding: 8px 12px;
        font-size: 0.9rem;
      }

      .demo-header .brand {
        font-weight: 600;
        white-space: nowrap;
      }

      .demo-header .title {
        color: #6cb2ff;
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .demo-header .exit-fs {
        margin-left: auto;
        cursor: pointer;
      }

      .demo-theater {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 1rem;
        box-sizing: border-box;
      }

      .viewer-mock {
        display: flex;
        max-width: 320px;
        width: 100%;
        min-height: 220px;
        border-radius: 4px;
        overflow: hidden;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
        background: #2b2b2b;
      }

      .viewer-mock .spine {
        width: 14px;
        background: linear-gradient(90deg, #111, #444);
      }

      .viewer-mock .page {
        flex: 1;
        padding: 1.5rem 1.25rem;
        color: #eee;
      }

      .viewer-title {
        margin: 0 0 0.75rem;
        font-weight: 700;
      }

      .viewer-note {
        margin: 0;
        font-size: 0.85rem;
        color: #aaa;
      }

      .hint {
        font-size: 0.78rem;
        color: #555;
      }

      table {
        margin-bottom: 0.5rem;
      }
    `}};me([w()],ee.prototype,"loaded",2);me([w()],ee.prototype,"viewAvailable",2);me([w()],ee.prototype,"headerOn",2);me([w()],ee.prototype,"fullscreen",2);me([w()],ee.prototype,"sharedObserver",2);me([w()],ee.prototype,"sortOrderBy",2);me([w()],ee.prototype,"sortedFiles",2);ee=me([C("ia-item-navigator-story")],ee);const Hs=Object.freeze(Object.defineProperty({__proto__:null,get IAItemNavigatorStory(){return ee}},Symbol.toStringTag,{value:"Module"}));var Fs=Object.defineProperty,qs=Object.getOwnPropertyDescriptor,Be=(i,e,t,r)=>{for(var o=r>1?void 0:r?qs(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&Fs(e,t,o),o};const Ks={CodeSubmitted:"codeSubmitted"},Wr=/^[0-9]+$/,Ws=/^[a-zA-Z0-9]+$/;let he=class extends x{constructor(){super(...arguments),this.disabled=!1,this.numChars=6,this.numericOnly=!0,this.allowedChars=Wr}render(){return d`
      ${[...Array(this.numChars).keys()].map(i=>d`<input
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
    `}firstUpdated(){this.inputs[0].focus()}willUpdate(i){i.has("numericOnly")&&(this.allowedChars=this.numericOnly?Wr:Ws),i.has("prefillValue")&&this.prefillValue!==void 0&&(this.fillInputs(this.prefillValue),this.prefillValue=void 0)}handleInput(i){i.preventDefault();const e=i.target,t=i.data;if(!t)return;if(t.length>1){this.fillInputs(t);return}if(!this.allowedChars.test(t))return;e.value=t;const r=e.nextElementSibling;r&&r.focus(),this.submitIfInputsFilled()}handleKeydown(i){const e=i.target,t=i.key,r=e.previousElementSibling,o=e.nextElementSibling;switch(t){case"Backspace":case"Delete":if(i.preventDefault(),r&&r.focus(),e.value===""){r.value="";break}e.value="";break;case"Tab":e.select();break;case"ArrowRight":case"Right":i.preventDefault(),o&&o.focus();break;case"ArrowLeft":case"Left":i.preventDefault(),r&&r.focus();break}}handlePaste(i){i.preventDefault();const e=i.clipboardData?.getData("text");e&&this.fillInputs(e)}fillInputs(i){i===""&&this.clearInputs();const e=i.split("").filter(r=>this.allowedChars.test(r)).slice(0,this.numChars);if(!e||e.length===0)return;if(e.forEach((r,o)=>this.inputs[o].value=r),e.length===this.numChars){this.triggerSubmit(e.join("")),this.inputs[this.numChars-1].focus();return}this.inputs[e.length].focus()}clearInputs(){this.inputs.forEach(i=>i.value=""),this.inputs[0].focus()}submitIfInputsFilled(){const i=[];this.inputs.forEach(e=>{e.value&&i.push(e.value)}),i.length===this.numChars&&this.triggerSubmit(i.join(""))}triggerSubmit(i){this.dispatchEvent(new CustomEvent(Ks.CodeSubmitted,{detail:this.numericOnly?i:i.toUpperCase(),bubbles:!0,composed:!0}))}static get styles(){return[z,_`
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
      `]}};Be([u({type:String})],he.prototype,"prefillValue",2);Be([u({type:Boolean})],he.prototype,"disabled",2);Be([u({type:Number})],he.prototype,"numChars",2);Be([u({type:Boolean})],he.prototype,"numericOnly",2);Be([u({type:Object})],he.prototype,"allowedChars",2);Be([zi("input")],he.prototype,"inputs",2);he=Be([C("ia-otp-input")],he);var Gs=Object.defineProperty,Zs=Object.getOwnPropertyDescriptor,Je=(i,e,t,r)=>{for(var o=r>1?void 0:r?Zs(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&Gs(e,t,o),o};const Js={NewCodeRequested:"newCodeRequested"};let Pe=class extends x{constructor(){super(...arguments),this.validationStatus="ready",this.newCodeSending=!1,this.numPasscodeChars=6,this.numericOnly=!0}render(){return d`
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
            ${U("The code entered is invalid or expired")}
          </p>`:y}
      ${this.resendCodeButtonTemplate}
    `}willUpdate(i){i.has("validationStatus")&&this.OTPInput&&this.validationStatus==="error"&&(this.OTPInput.prefillValue=""),i.has("newCodeSending")&&this.newCodeSending&&this.OTPInput&&(this.OTPInput.prefillValue="")}get resendCodeButtonTemplate(){return this.newCodeSending?d`<span part="new-code-message" class="new-code-msg"
          >${U("Emailing...")}</span
        >`:d`
          <ia-button
            mode="link"
            class="new-code-btn"
            part="new-code-button"
            .disabled=${this.validationStatus==="loading"||this.validationStatus==="success"}
            @click=${this.handleNewCodeRequested}
          >
            ${U("Email me another code")}
          </ia-button>
        `}async handleNewCodeRequested(){this.dispatchEvent(new CustomEvent(Js.NewCodeRequested,{bubbles:!0,composed:!0})),this.OTPInput.prefillValue=""}static get styles(){return[z,_`
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
      `]}};Je([u({type:String})],Pe.prototype,"validationStatus",2);Je([u({type:Boolean})],Pe.prototype,"newCodeSending",2);Je([u({type:Number})],Pe.prototype,"numPasscodeChars",2);Je([u({type:Boolean})],Pe.prototype,"numericOnly",2);Je([S("ia-otp-input")],Pe.prototype,"OTPInput",2);Pe=Je([C("ia-otp-form")],Pe);var Ys=Object.getOwnPropertyDescriptor,Xs=(i,e,t,r)=>{for(var o=r>1?void 0:r?Ys(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=n(o)||o);return o};const Qs=[{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Input font size",cssVariable:"--ia-theme-font-size-lg",defaultValue:"2.25rem",inputType:"text"},{label:"Link and error font size",cssVariable:"--ia-theme-font-size-standard",defaultValue:"0.875rem",inputType:"text"},{label:"Link font color",cssVariable:"--ia-theme-link-color",defaultValue:"#4b64ff",inputType:"color"},{label:"Error message/indicator color",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"},{label:"Success indicator color",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"}],el=[{label:"Validation Status",propertyName:"validationStatus",defaultValue:"ready",inputType:"radio",radioOptions:["ready","loading","success","error"]},{label:"New code sending in progress",propertyName:"newCodeSending",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Numeric only",propertyName:"numericOnly",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Number of passcode characters",propertyName:"numPasscodeChars",defaultValue:6,inputType:"number"}];let Ci=class extends x{render(){return d`
      <story-template
        elementTag="ia-otp-form"
        elementClassName="IAOTPForm"
        .defaultUsageProps=${"@codeSubmitted=${(e: CustomEvent) => {setTimeout(() => alert('Code submitted: ' + e.detail), 250);}} \n  @newCodeRequested=${() => alert('New code requested')}"}
        .styleInputData=${{settings:Qs}}
        .propInputData=${{settings:el}}
      >
        <ia-otp-form
          slot="demo"
          @codeSubmitted=${i=>{setTimeout(()=>alert("Code submitted: "+i.detail),250)}}
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
    `}};Ci=Xs([C("ia-otp-form-story")],Ci);const tl=Object.freeze(Object.defineProperty({__proto__:null,get IAOTPFormStory(){return Ci}},Symbol.toStringTag,{value:"Module"}));var il=Object.getOwnPropertyDescriptor,rl=(i,e,t,r)=>{for(var o=r>1?void 0:r?il(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=n(o)||o);return o};const ol=[{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Font size",cssVariable:"--ia-theme-font-size-lg",defaultValue:"2.25rem",inputType:"text"}],al=[{label:"Number of characters",propertyName:"numChars",defaultValue:6,inputType:"number"},{label:"Numeric only",propertyName:"numericOnly",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Prefill value",propertyName:"prefillValue",defaultValue:""},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let Ai=class extends x{render(){return d`
      <story-template
        elementTag="ia-otp-input"
        elementClassName="IAOTPInput"
        .defaultUsageProps=${"@codeSubmitted=${(e: CustomEvent) => {setTimeout(() => alert('Code submitted: ' + e.detail), 250);}}"}
        .styleInputData=${{settings:ol}}
        .propInputData=${{settings:al}}
      >
        <ia-otp-input
          @codeSubmitted=${i=>{setTimeout(()=>alert("Code submitted: "+i.detail),250)}}
          slot="demo"
        ></ia-otp-input>
      </story-template>
    `}};Ai=rl([C("ia-otp-input-story")],Ai);const nl=Object.freeze(Object.defineProperty({__proto__:null,get IAOTPInputStory(){return Ai}},Symbol.toStringTag,{value:"Module"}));var sl=Object.getOwnPropertyDescriptor,ll=(i,e,t,r)=>{for(var o=r>1?void 0:r?sl(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=n(o)||o);return o};let Gr=class extends x{render(){return d`
      <span class="sr-only">
        <slot></slot>
      </span>
    `}static get styles(){return[z,_`
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
      `]}};Gr=ll([C("ia-sr-only-text")],Gr);var dl=Object.defineProperty,cl=Object.getOwnPropertyDescriptor,Bo=(i,e,t,r)=>{for(var o=r>1?void 0:r?cl(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&dl(e,t,o),o};let Mt=class extends x{constructor(){super(...arguments),this.textVisible=!1}render(){return d`
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
    `}};Bo([w()],Mt.prototype,"textVisible",2);Mt=Bo([C("ia-sr-only-text-story")],Mt);const hl=Object.freeze(Object.defineProperty({__proto__:null,get IAStatusIndicatorStory(){return Mt}},Symbol.toStringTag,{value:"Module"}));var pl=Object.getOwnPropertyDescriptor,ul=(i,e,t,r)=>{for(var o=r>1?void 0:r?pl(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=n(o)||o);return o};const gl=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"1.25rem"},{label:"Color - loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Color - success",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"},{label:"Color - error",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}],ml=[{label:"Mode",propertyName:"mode",defaultValue:"loading",inputType:"radio",radioOptions:["ready","loading","success","error"]},{label:"Accessible title - loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{label:"Loading style",propertyName:"loadingStyle",defaultValue:"ring-dots",inputType:"radio",radioOptions:["ring-dots","ring"]},{label:"Accessible title - success",propertyName:"successTitle",defaultValue:"Success"},{label:"Accessible title - error",propertyName:"errorTitle",defaultValue:"Error"}];let Oi=class extends x{render(){return d`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .styleInputData=${{settings:gl}}
        .propInputData=${{settings:ml}}
      >
        <ia-status-indicator slot="demo"></ia-status-indicator>
      </story-template>
    `}};Oi=ul([C("ia-status-indicator-story")],Oi);const fl=Object.freeze(Object.defineProperty({__proto__:null,get IAStatusIndicatorStory(){return Oi}},Symbol.toStringTag,{value:"Module"})),vl="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='36.283'%20height='36.283'%3e%3cpath%20d='M35.531%2017.391h-3.09l.845-1.464a.748.748%200%201%200-1.297-.75l-1.276%202.214H28.61l2.515-4.354a.751.751%200%200%200-.272-1.024.75.75%200%200%200-1.024.274l-2.948%205.104h-2.023a6.751%206.751%200%200%200-2.713-4.684l1.019-1.76%205.896-.002a.75.75%200%200%200%200-1.5l-5.029.002%201.051-1.82%202.557.002a.75.75%200%200%200%200-1.5l-1.689-.002%201.545-2.676a.75.75%200%201%200-1.302-.75l-1.547%202.676-.844-1.463a.749.749%200%201%200-1.297.75l1.278%202.213-1.051%201.818-2.514-4.354a.75.75%200%200%200-1.298.75l2.946%205.104-1.016%201.758a6.692%206.692%200%200%200-2.706-.57%206.74%206.74%200%200%200-2.707.568l-1.013-1.754%202.946-5.105a.75.75%200%200%200-1.298-.75L13.56%208.697l-1.05-1.818%201.278-2.217a.749.749%200%200%200-1.298-.75l-.845%201.465-1.551-2.678a.75.75%200%200%200-1.024-.273.748.748%200%200%200-.274%201.023l1.545%202.678H8.652a.75.75%200%200%200%200%201.5h2.556l1.05%201.818H7.231a.75.75%200%200%200%200%201.5h5.894l1.017%201.762a6.755%206.755%200%200%200-2.712%204.684H9.406l-2.95-5.104a.75.75%200%201%200-1.299.75l2.516%204.354H5.569l-1.277-2.213a.75.75%200%200%200-1.298.75l.845%201.463H.75a.75.75%200%200%200%200%201.5h3.09l-.845%201.465a.747.747%200%200%200%20.275%201.022.75.75%200%200%200%20.374.103.75.75%200%200%200%20.65-.375l1.277-2.215h2.103l-2.516%204.354a.75.75%200%200%200%201.299.75l2.949-5.104h2.024a6.761%206.761%200%200%200%202.712%204.685l-1.017%201.762H7.232a.75.75%200%200%200%200%201.5h5.026l-1.05%201.818H8.651a.75.75%200%200%200%200%201.5h1.69l-1.545%202.676a.75.75%200%200%200%201.299.75l1.546-2.676.846%201.465a.755.755%200%200%200%20.65.375.737.737%200%200%200%20.375-.103.747.747%200%200%200%20.274-1.022l-1.279-2.215%201.05-1.82%202.515%204.354a.75.75%200%200%200%201.299-.75l-2.947-5.104%201.013-1.756a6.72%206.72%200%200%200%205.415%200l1.014%201.756-2.947%205.104a.75.75%200%200%200%201.298.75l2.515-4.354%201.053%201.82-1.277%202.213a.75.75%200%200%200%201.298.75l.844-1.463%201.545%202.678c.141.24.393.375.65.375a.75.75%200%200%200%20.649-1.125l-1.548-2.678h1.689a.75.75%200%200%200%200-1.5h-2.557l-1.051-1.82%205.029.002a.75.75%200%200%200%200-1.5l-5.896-.002-1.019-1.76a6.75%206.75%200%200%200%202.711-4.685h2.023l2.947%205.104a.753.753%200%200%200%201.025.273.749.749%200%200%200%20.272-1.023l-2.515-4.354h2.104l1.279%202.215a.75.75%200%200%200%20.649.375c.127%200%20.256-.03.375-.103a.748.748%200%200%200%20.273-1.022l-.848-1.465h3.092a.75.75%200%200%200%20.003-1.5zm-12.136.75c0%20.257-.041.502-.076.75a5.223%205.223%200%200%201-1.943%203.358%205.242%205.242%200%200%201-1.291.766%205.224%205.224%200%200%201-1.949.384%205.157%205.157%200%200%201-3.239-1.15%205.22%205.22%200%200%201-1.943-3.358c-.036-.247-.076-.493-.076-.75s.04-.503.076-.75a5.22%205.22%200%200%201%201.944-3.359c.393-.312.82-.576%201.291-.765a5.219%205.219%200%200%201%201.948-.384c.69%200%201.344.142%201.948.384.471.188.898.454%201.291.765a5.222%205.222%200%200%201%201.943%203.359c.035.247.076.493.076.75z'%20fill=':color:'/%3e%3c/svg%3e",Zr=new WeakSet;class bl extends mt{constructor(e){super(e)}update(e,[t,r]){return Zr.has(e)||(t(),Zr.add(e)),this.render(t,r)}render(e,t){return t()}}const Jr=gt(bl);var yl=Object.defineProperty,wl=Object.getOwnPropertyDescriptor,Wi=(i,e,t,r)=>{for(var o=r>1?void 0:r?wl(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&yl(e,t,o),o};let It=class extends x{constructor(){super(...arguments),this.snowing=!1}render(){return d`
      ${this.startButtonTemplate} ${this.clearButtonTemplate}
      <img src=${vl} alt="Snowflakes icon" />
    `}willUpdate(i){i.has("snowConfig")&&(this.snowflakes?.destroy(),this.snowflakes=void 0,this.startSnowing())}get startButtonTemplate(){return Jr(async()=>{await bt(()=>Promise.resolve().then(()=>sr),void 0,import.meta.url)},()=>d`
        <ia-button
          @click=${()=>{this.snowing?this.stopSnowing():this.startSnowing()}}
        >
          ${this.snowing?"Stop Snowflakes":"Start Snowflakes"}
        </ia-button>
      `)}get clearButtonTemplate(){return Jr(async()=>{await bt(()=>Promise.resolve().then(()=>sr),void 0,import.meta.url)},()=>d`
        <ia-button
          @click=${()=>{this.snowflakes?.destroy()}}
        >
          Clear Snowflakes
        </ia-button>
      `)}async startSnowing(){if(!this.snowflakes){const e=(await bt(()=>import("./snowflakes.esm-Dz_MTlsm.js"),[],import.meta.url)).default;this.snowflakes=new e(this.snowConfig)}this.snowflakes?.start(),this.snowing=!0}stopSnowing(){this.snowflakes?.stop(),this.snowing=!1}static get styles(){return _`
      img {
        width: 16px;
        filter: invert(1);
        vertical-align: middle;
      }
    `}};Wi([u({type:Object})],It.prototype,"snowConfig",2);Wi([w()],It.prototype,"snowing",2);It=Wi([C("ia-snow")],It);var $l=Object.defineProperty,xl=Object.getOwnPropertyDescriptor,Ye=(i,e,t,r)=>{for(var o=r>1?void 0:r?xl(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&$l(e,t,o),o};let pe=class extends x{render(){return d`
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
    `:"<ia-snow></ia-snow>"}get configString(){return JSON.stringify(this.config,null,2)}get snowflakeConfig(){return{color:this.colorInput.value,count:Number(this.countInput.value),wind:this.windInput.checked,rotation:this.rotationInput.checked}}setupSnowflakes(){this.config=this.snowflakeConfig}static get styles(){return _`
      fieldset {
        margin-top: 16px;
      }
    `}};Ye([w()],pe.prototype,"config",2);Ye([S("#count")],pe.prototype,"countInput",2);Ye([S("#wind")],pe.prototype,"windInput",2);Ye([S("#rotation")],pe.prototype,"rotationInput",2);Ye([S("#color")],pe.prototype,"colorInput",2);pe=Ye([C("ia-snow-story")],pe);const _l=Object.freeze(Object.defineProperty({__proto__:null,get IASnowStory(){return pe}},Symbol.toStringTag,{value:"Module"}));var Sl=Object.getOwnPropertyDescriptor,Cl=(i,e,t,r)=>{for(var o=r>1?void 0:r?Sl(e,t):e,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=n(o)||o);return o};const Al=Object.assign({"../src/elements/ia-button/ia-button-story.ts":Pa,"../src/elements/ia-combo-box/ia-combo-box-story.ts":on,"../src/elements/ia-dropdown-search-bar/ia-dropdown-search-bar-story.ts":ts,"../src/elements/ia-item-navigator/ia-item-navigator-story.ts":Hs,"../src/elements/ia-otp-form/ia-otp-form-story.ts":tl,"../src/elements/ia-otp-input/ia-otp-input-story.ts":nl,"../src/elements/ia-sr-only-text/ia-sr-only-text-story.ts":hl,"../src/elements/ia-status-indicator/ia-status-indicator-story.ts":fl,"../src/labs/ia-snow/ia-snow-story.ts":_l}),Vo=Object.keys(Al).map(i=>{const e=i.includes("/src/labs/"),t=i.split("/"),o=t[t.length-1].replace(/-story\.ts$/,"");return{tag:o,storyTag:`${o}-story`,id:`elem-${o}`,labs:e}}).sort((i,e)=>i.tag.localeCompare(e.tag)),Ti=Vo.filter(i=>!i.labs),Ei=Vo.filter(i=>i.labs),Ol=[...Ti,...Ei];let Yr=class extends x{constructor(){super(...arguments),this._abortController=new AbortController}createRenderRoot(){return this}render(){return d`
      <nav id="ia-sidebar">
        <h2>Production-Ready</h2>
        ${Ti.map(i=>d`<a href="#${i.id}">&lt;${i.tag}&gt;</a>`)}
        <h2>Labs 🧪</h2>
        ${Ei.map(i=>d`<a href="#${i.id}">&lt;${i.tag}&gt;</a>`)}
      </nav>
      <div id="ia-content">
        <h1>Internet Archive Elements</h1>
        <h2>Production-Ready Elements</h2>
        ${Ti.map(i=>d`
          <div id="${i.id}" class="ia-anchor">
            ${ci(`<${i.storyTag}></${i.storyTag}>`)}
          </div>
        `)}
        <h2>Labs Elements</h2>
        ${Ei.map(i=>d`
          <div id="${i.id}" class="ia-anchor">
            ${ci(`<${i.storyTag}></${i.storyTag}>`)}
          </div>
        `)}
      </div>
    `}firstUpdated(){const i=Ol.map(r=>r.id),e=Object.fromEntries(i.map(r=>[r,this.querySelector(`#ia-sidebar a[href="#${r}"]`)])),t=new Set;this._observer=new IntersectionObserver(r=>{for(const a of r)a.isIntersecting?t.add(a.target.id):t.delete(a.target.id);const o=i.find(a=>t.has(a))??i[0];i.forEach(a=>e[a]?.classList.toggle("active",a===o))},{rootMargin:"0px 0px -70% 0px"}),i.forEach(r=>{const o=document.getElementById(r);o&&this._observer.observe(o)}),i.forEach(r=>{e[r]?.addEventListener("click",o=>{o.preventDefault();const a=document.getElementById(r);if(a){const n=a.getBoundingClientRect().top+window.scrollY;window.scrollTo({top:Math.max(0,n-16),behavior:"smooth"})}},{signal:this._abortController.signal})})}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._abortController.abort()}};Yr=Cl([C("app-root")],Yr);
