import{m as w,b as d,r as C,n as h,e as Ze,c as Je,i as Qe,A as O,o as xr,s as Se,a as et}from"./index-Bym4URPL.js";import{I as Or}from"./fetch-handler-BC7jjiqX.js";import{o as pi,r as di}from"./story-template-CQDf0x__.js";import{l as Ot}from"./localized-decorator-CViVh4Ql.js";import"./ia-button-D06FOulx.js";import{R as te}from"./review-BwVPWj4s.js";import"./syntax-highlighter-B_Z4TCIF.js";import"./theme-styles-XLvUuKWS.js";import"./ia-status-indicator-CXXhFIZ5.js";import"./mediatype-web-BK2ypcoP.js";import"./date-CSk8Q4uH.js";import"./number-owKrDDsv.js";const hi="/write-review.php",fi="/edit-reviews.php";class Dr{constructor(r){this.fetchHandler=r?.fetchHandler??new Or,this.baseHost=r?.baseHost??"https://archive.org",this.submitPath=r?.submitPath??hi,this.deletePath=r?.deletePath??fi,this.deleteMethod=r?.deleteMethod??"POST"}async submitReview(r){const n=new URLSearchParams;return n.append("identifier",r.identifier),n.append("field_reviewtitle",r.title),n.append("field_reviewbody",r.body),n.append("field_stars",r.stars??"0"),r.recaptchaToken&&n.append("g-recaptcha-response",r.recaptchaToken),n.append("submitter","review-form"),this.request(`${this.baseHost}${this.submitPath}`,{method:"POST",body:n})}async deleteReview(r){const n=new URLSearchParams;n.append("identifier",r.identifier),n.append("deleteReviewer",r.reviewer),r.reviewerItemname&&n.append("deleteReviewerItemname",r.reviewerItemname);const o=`${this.baseHost}${this.deletePath}?${n.toString()}`;return this.request(o,{method:this.deleteMethod})}async request(r,n){try{const o=await this.fetchHandler.fetch(r,{requestInit:{method:n.method,body:n.body,credentials:"include"},includeCsrfToken:!0});return await this.parseResult(o)}catch(o){return console.error("Review request failed",o),{success:!1,error:this.genericError}}}async parseResult(r){let n;try{n=await r.json()}catch{n=void 0}return r.ok?!n||n.success?{success:!0}:{success:!1,error:n.error??this.genericError}:{success:!1,error:n?.error??this.genericError}}get genericError(){return w("Sorry, something went wrong. Please try again later.")}}function mi(t){return!!(t.token||t.endpointPath||t.fetchHandler)}class vi{constructor(r){this.token=r.token??"",this.submitUrl=`${r.baseHost}${r.endpointPath??"/write-review.php"}`,this.deleteUrl=`${r.baseHost}/edit-reviews.php`,this.fetchHandler=r.fetchHandler??new Or}async submitReview(r){const n=new URLSearchParams;r.recaptchaToken&&n.append("g-recaptcha-response",r.recaptchaToken),n.append("field_stars",r.stars??"0"),n.append("field_reviewtitle",r.title),n.append("field_reviewbody",r.body),n.append("field_reviewtoken",this.token),r.identifier&&n.append("identifier",r.identifier),n.append("submitter","review-form");try{const o=await this.fetchHandler.fetchApiResponse(this.submitUrl,{method:"POST",includeCredentials:!0,body:n});return o?.success===!0?{success:!0}:{success:!1,error:o?.error}}catch(o){return console.error("Review request failed",o),{success:!1}}}async deleteReview(r){const n=new URLSearchParams({identifier:r.identifier,deleteReviewer:r.reviewer,deleteReviewerItemname:r.reviewerItemname??"",csrf_token:this.token});try{const o=await fetch(`${this.deleteUrl}?${n}`,{method:"POST"});if(!o.ok)throw new Error(`Delete failed: ${o.status}`);return{success:!0}}catch(o){return console.error("Review request failed",o),{success:!1}}}}function Dt(t){return new vi(t)}const wi="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%232C2C2C'%20/%3e%3c/svg%3e";function dr(t=""){if(t.length<=40)return t;const n=t.substring(0,40)+"...";return d`<span title="${t}">${n}</span>`}function hr(t,r){(r==null||r>t.length)&&(r=t.length);for(var n=0,o=Array(r);n<r;n++)o[n]=t[n];return o}function gi(t){if(Array.isArray(t))return t}function bi(t,r){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var o,c,p,f,q=[],M=!0,ke=!1;try{if(p=(n=n.call(t)).next,r!==0)for(;!(M=(o=p.call(n)).done)&&(q.push(o.value),q.length!==r);M=!0);}catch(le){ke=!0,c=le}finally{try{if(!M&&n.return!=null&&(f=n.return(),Object(f)!==f))return}finally{if(ke)throw c}}return q}}function yi(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ti(t,r){return gi(t)||bi(t,r)||Si(t,r)||yi()}function Si(t,r){if(t){if(typeof t=="string")return hr(t,r);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?hr(t,r):void 0}}const Ir=Object.entries,fr=Object.setPrototypeOf,_i=Object.isFrozen,Ei=Object.getPrototypeOf,Ri=Object.getOwnPropertyDescriptor;let D=Object.freeze,I=Object.seal,Te=Object.create,Cr=typeof Reflect<"u"&&Reflect,Lt=Cr.apply,xt=Cr.construct;D||(D=function(r){return r});I||(I=function(r){return r});Lt||(Lt=function(r,n){for(var o=arguments.length,c=new Array(o>2?o-2:0),p=2;p<o;p++)c[p-2]=arguments[p];return r.apply(n,c)});xt||(xt=function(r){for(var n=arguments.length,o=new Array(n>1?n-1:0),c=1;c<n;c++)o[c-1]=arguments[c];return new r(...o)});const ae=x(Array.prototype.forEach),Ai=x(Array.prototype.lastIndexOf),mr=x(Array.prototype.pop),Oe=x(Array.prototype.push),Li=x(Array.prototype.splice),_e=Array.isArray,Ce=x(String.prototype.toLowerCase),Tt=x(String.prototype.toString),vr=x(String.prototype.match),De=x(String.prototype.replace),wr=x(String.prototype.indexOf),xi=x(String.prototype.trim),Oi=x(Number.prototype.toString),Di=x(Boolean.prototype.toString),gr=typeof BigInt>"u"?null:x(BigInt.prototype.toString),br=typeof Symbol>"u"?null:x(Symbol.prototype.toString),F=x(Object.prototype.hasOwnProperty),Ie=x(Object.prototype.toString),k=x(RegExp.prototype.test),Q=Ii(TypeError);function x(t){return function(r){r instanceof RegExp&&(r.lastIndex=0);for(var n=arguments.length,o=new Array(n>1?n-1:0),c=1;c<n;c++)o[c-1]=arguments[c];return Lt(t,r,o)}}function Ii(t){return function(){for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return xt(t,n)}}function g(t,r){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ce;if(fr&&fr(t,null),!_e(r))return t;let o=r.length;for(;o--;){let c=r[o];if(typeof c=="string"){const p=n(c);p!==c&&(_i(r)||(r[o]=p),c=p)}t[c]=!0}return t}function Ci(t){for(let r=0;r<t.length;r++)F(t,r)||(t[r]=null);return t}function z(t){const r=Te(null);for(const o of Ir(t)){var n=Ti(o,2);const c=n[0],p=n[1];F(t,c)&&(_e(p)?r[c]=Ci(p):p&&typeof p=="object"&&p.constructor===Object?r[c]=z(p):r[c]=p)}return r}function ki(t){switch(typeof t){case"string":return t;case"number":return Oi(t);case"boolean":return Di(t);case"bigint":return gr?gr(t):"0";case"symbol":return br?br(t):"Symbol()";case"undefined":return Ie(t);case"function":case"object":{if(t===null)return Ie(t);const r=t,n=W(r,"toString");if(typeof n=="function"){const o=n(r);return typeof o=="string"?o:Ie(o)}return Ie(t)}default:return Ie(t)}}function W(t,r){for(;t!==null;){const o=Ri(t,r);if(o){if(o.get)return x(o.get);if(typeof o.value=="function")return x(o.value)}t=Ei(t)}function n(){return null}return n}function Mi(t){try{return k(t,""),!0}catch{return!1}}const yr=D(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),St=D(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),_t=D(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Pi=D(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Et=D(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ni=D(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Tr=D(["#text"]),Sr=D(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Rt=D(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),_r=D(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),qe=D(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),$i=I(/{{[\w\W]*|^[\w\W]*}}/g),Fi=I(/<%[\w\W]*|^[\w\W]*%>/g),Hi=I(/\${[\w\W]*/g),Ui=I(/^data-[\-\w.\u00B7-\uFFFF]+$/),Bi=I(/^aria-[\-\w]+$/),Er=I(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),zi=I(/^(?:\w+script|data):/i),ji=I(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Wi=I(/^html$/i),Gi=I(/^[a-z][.\w]*(-[.\w]+)+$/i),Rr=I(/<[/\w!]/g),Ar=I(/<[/\w]/g),Yi=I(/<\/no(script|embed|frames)/i),Vi=I(/\/>/i),B={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},kr=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"],qi=D(g({},kr)),Xi=(function(){const t={};return ae(kr,r=>{t[r]=I(new RegExp("</"+r+"(?=[\\t\\n\\f\\r />])","i"))}),D(t)})(),Ki=function(){return typeof window>"u"?null:window},Zi=function(r,n){if(typeof r!="object"||typeof r.createPolicy!="function")return null;let o=null;const c="data-tt-policy-suffix";n&&n.hasAttribute(c)&&(o=n.getAttribute(c));const p="dompurify"+(o?"#"+o:"");try{return r.createPolicy(p,{createHTML(f){return f},createScriptURL(f){return f}})}catch{return console.warn("TrustedTypes policy "+p+" could not be created."),null}},Lr=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},ee=function(r,n,o,c){return F(r,n)&&_e(r[n])?g(c.base?z(c.base):{},r[n],c.transform):o},At=function(r,n,o){const c=F(r,n)?r[n]:void 0;return c&&typeof c=="object"?z(c):o()};function Mr(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ki();const r=a=>Mr(a);if(r.version="3.4.16",r.removed=[],!t||!t.document||t.document.nodeType!==B.document||!t.Element)return r.isSupported=!1,r;let n=t.document;const o=n,c=o.currentScript;t.DocumentFragment;const p=t.HTMLTemplateElement,f=t.Node,q=t.Element,M=t.NodeFilter;t.NamedNodeMap===void 0&&(t.NamedNodeMap||t.MozNamedAttrMap),t.HTMLFormElement;const ke=t.DOMParser,le=t.trustedTypes,X=q.prototype,Pr=W(X,"cloneNode"),tt=W(X,"remove"),Ct=W(X,"removeAttributeNode"),Nr=W(X,"nextSibling"),ce=W(X,"childNodes"),ue=W(X,"parentNode"),kt=W(X,"shadowRoot"),rt=W(X,"attributes"),re=f&&f.prototype?W(f.prototype,"nodeType"):null,pe=f&&f.prototype?W(f.prototype,"nodeName"):null,Me=f&&f.prototype?W(f.prototype,"ownerDocument"):null,Ee=function(e){return re?re(e):e.nodeType},it=function(e){return pe?pe(e):e.nodeName};if(typeof p=="function"){const a=n.createElement("template");a.content&&a.content.ownerDocument&&(n=a.content.ownerDocument)}let $,ie="",nt,Mt=!1,Re=0;const Pt=function(){if(Re>0)throw Q('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},de=function(e){Pt(),Re++;try{return $.createHTML(e)}finally{Re--}},$r=function(e){Pt(),Re++;try{return $.createScriptURL(e)}finally{Re--}},Fr=function(){return Mt||(nt=Zi(le,c),Mt=!0),nt},Pe=n,ot=Pe.implementation,Nt=Pe.createNodeIterator,Hr=Pe.createDocumentFragment,Ur=Pe.getElementsByTagName,Br=o.importNode;let S=Lr();r.isSupported=typeof Ir=="function"&&typeof ue=="function"&&ot&&ot.createHTMLDocument!==void 0;const zr=$i,jr=Fi,Wr=Hi,Gr=Ui,Yr=Bi,Vr=zi,$t=ji,qr=Gi;let Ft=Er,_=null;const st=g({},[...yr,...St,..._t,...Et,...Tr]);let E=null;const at=g({},[...Sr,...Rt,..._r,...qe]);let G=Object.seal(Te(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ae=null,Ht=null;const K=Object.seal(Te(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Ut=!0,lt=!0,Bt=!1,zt=!0,Z=!1,ne=!0,oe=!1,ct=!1,Ne=null,$e=null,ut=!1,he=!1,Fe=!1,He=!1,jt=!0,Wt=!1;const Gt="user-content-";let pt=!0,dt=!1,fe={},me=null;const Yt=g({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Vt=null;const qt=g({},["audio","video","img","source","image","track"]);let Xt=null;const Kt=g({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ue="http://www.w3.org/1998/Math/MathML",Be="http://www.w3.org/2000/svg",Y="http://www.w3.org/1999/xhtml";let ve=Y,ht=!1,ft=null;const Xr=g({},[Ue,Be,Y],Tt),Zt=D(["mi","mo","mn","ms","mtext"]);let mt=g({},Zt);const Jt=D(["annotation-xml"]);let vt=g({},Jt);const Kr=g({},["title","style","font","a","script"]);let Le=null;const Zr=["application/xhtml+xml","text/html"],Jr="text/html";let L=null,we=null;const Qr=n.createElement("form"),Qt=function(e){return e instanceof RegExp||e instanceof Function},wt=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(we&&we===e)return;(!e||typeof e!="object")&&(e={}),e=z(e),Le=Zr.indexOf(e.PARSER_MEDIA_TYPE)===-1?Jr:e.PARSER_MEDIA_TYPE,L=Le==="application/xhtml+xml"?Tt:Ce,_=ee(e,"ALLOWED_TAGS",st,{transform:L}),E=ee(e,"ALLOWED_ATTR",at,{transform:L}),ft=ee(e,"ALLOWED_NAMESPACES",Xr,{transform:Tt}),Xt=ee(e,"ADD_URI_SAFE_ATTR",Kt,{transform:L,base:Kt}),Vt=ee(e,"ADD_DATA_URI_TAGS",qt,{transform:L,base:qt}),me=ee(e,"FORBID_CONTENTS",Yt,{transform:L}),Ae=ee(e,"FORBID_TAGS",z({}),{transform:L}),Ht=ee(e,"FORBID_ATTR",z({}),{transform:L}),fe=F(e,"USE_PROFILES")?e.USE_PROFILES&&typeof e.USE_PROFILES=="object"?z(e.USE_PROFILES):e.USE_PROFILES:!1,Ut=e.ALLOW_ARIA_ATTR!==!1,lt=e.ALLOW_DATA_ATTR!==!1,Bt=e.ALLOW_UNKNOWN_PROTOCOLS||!1,zt=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Z=e.SAFE_FOR_TEMPLATES||!1,ne=e.SAFE_FOR_XML!==!1,oe=e.WHOLE_DOCUMENT||!1,he=e.RETURN_DOM||!1,Fe=e.RETURN_DOM_FRAGMENT||!1,He=e.RETURN_TRUSTED_TYPE||!1,ut=e.FORCE_BODY||!1,jt=e.SANITIZE_DOM!==!1,Wt=e.SANITIZE_NAMED_PROPS||!1,pt=e.KEEP_CONTENT!==!1,dt=e.IN_PLACE||!1,Ft=Mi(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:Er,ve=typeof e.NAMESPACE=="string"?e.NAMESPACE:Y,mt=At(e,"MATHML_TEXT_INTEGRATION_POINTS",()=>g({},Zt)),vt=At(e,"HTML_INTEGRATION_POINTS",()=>g({},Jt));const i=At(e,"CUSTOM_ELEMENT_HANDLING",()=>Te(null));if(G=Te(null),F(i,"tagNameCheck")&&Qt(i.tagNameCheck)&&(G.tagNameCheck=i.tagNameCheck),F(i,"attributeNameCheck")&&Qt(i.attributeNameCheck)&&(G.attributeNameCheck=i.attributeNameCheck),F(i,"allowCustomizedBuiltInElements")&&typeof i.allowCustomizedBuiltInElements=="boolean"&&(G.allowCustomizedBuiltInElements=i.allowCustomizedBuiltInElements),I(G),Z&&(lt=!1),Fe&&(he=!0),fe&&(_=g({},Tr),E=Te(null),fe.html===!0&&(g(_,yr),g(E,Sr)),fe.svg===!0&&(g(_,St),g(E,Rt),g(E,qe)),fe.svgFilters===!0&&(g(_,_t),g(E,Rt),g(E,qe)),fe.mathMl===!0&&(g(_,Et),g(E,_r),g(E,qe))),K.tagCheck=null,K.attributeCheck=null,F(e,"ADD_TAGS")&&(typeof e.ADD_TAGS=="function"?K.tagCheck=e.ADD_TAGS:_e(e.ADD_TAGS)&&(_===st&&(_=z(_)),g(_,e.ADD_TAGS,L))),F(e,"ADD_ATTR")&&(typeof e.ADD_ATTR=="function"?K.attributeCheck=e.ADD_ATTR:_e(e.ADD_ATTR)&&(E===at&&(E=z(E)),g(E,e.ADD_ATTR,L))),F(e,"ADD_FORBID_CONTENTS")&&_e(e.ADD_FORBID_CONTENTS)&&(me===Yt&&(me=z(me)),g(me,e.ADD_FORBID_CONTENTS,L)),pt&&(_["#text"]=!0),oe&&g(_,["html","head","body"]),_.table&&(g(_,["tbody"]),delete Ae.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!="function")throw Q('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Q('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const s=$;$=e.TRUSTED_TYPES_POLICY;try{ie=de("")}catch(l){throw $=s,l}}else e.TRUSTED_TYPES_POLICY===null?($=void 0,ie=""):($===void 0&&($=Fr()),$&&typeof ie=="string"&&(ie=de("")));D&&D(e),we=e},er=g({},[...St,..._t,...Pi]),tr=g({},[...Et,...Ni]),ei=function(e,i,s){return i.namespaceURI===Y?e==="svg":i.namespaceURI===Ue?e==="svg"&&(s==="annotation-xml"||mt[s]):!!er[e]},ti=function(e,i,s){return i.namespaceURI===Y?e==="math":i.namespaceURI===Be?e==="math"&&vt[s]:!!tr[e]},ri=function(e,i,s){return i.namespaceURI===Be&&!vt[s]||i.namespaceURI===Ue&&!mt[s]?!1:!tr[e]&&(Kr[e]||!er[e])},ii=function(e){let i=ue(e);(!i||!i.tagName)&&(i={namespaceURI:ve,tagName:"template"});const s=Ce(e.tagName),l=Ce(i.tagName);return ft[e.namespaceURI]?e.namespaceURI===Be?ei(s,i,l):e.namespaceURI===Ue?ti(s,i,l):e.namespaceURI===Y?ri(s,i,l):!!(Le==="application/xhtml+xml"&&ft[e.namespaceURI]):!1},J=function(e){Oe(r.removed,{element:e});try{ue(e).removeChild(e)}catch{if(tt(e),!ue(e))throw Q("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},rr=function(e,i,s){try{Ct(e,i)}catch{try{e.removeAttribute(s)}catch{}}},ze=function(e){je(e);const i=ce(e);if(i){const l=[];ae(i,u=>{Oe(l,u)}),ae(l,u=>{try{tt(u)}catch{}})}const s=rt(e);if(s)for(let l=s.length-1;l>=0;--l){const u=s[l],m=u&&u.name;typeof m=="string"&&rr(e,u,m)}},se=function(e,i,s){if(!s)try{s=i.getAttributeNode(e)}catch{s=null}Oe(r.removed,{attribute:s||null,from:i});try{s?Ct(i,s):i.removeAttribute(e)}catch{try{i.removeAttribute(e)}catch{}}if(e==="is")if(he||Fe)try{J(i)}catch{}else try{i.setAttribute(e,"")}catch{}},ni=function(e){const i=rt(e);if(i)for(let s=i.length-1;s>=0;--s){const l=i[s],u=l&&l.name;typeof u!="string"||E[L(u)]||rr(e,l,u)}},je=function(e){const i=[e];for(;i.length>0;){const s=i.pop();Ee(s)===B.element&&ni(s);const l=ce(s);if(l)for(let u=l.length-1;u>=0;--u)i.push(l[u])}},ir=function(e,i){return ne?e==="patchsrc"?!0:e==="for"&&i!=="label"&&i!=="output":!1},oi=function(e){if(!ne)return;const i=[e];for(;i.length>0;){const s=i.pop(),l=Ee(s);if(l===B.processingInstruction||l===B.comment&&k(Ar,s.data)){try{tt(s)}catch{}continue}if(l===B.element){const m=s,v=L(it(s));try{m.hasAttribute&&m.hasAttribute("patchsrc")&&m.removeAttribute("patchsrc"),m.hasAttribute&&m.hasAttribute("for")&&ir("for",v)&&m.removeAttribute("for")}catch{}}const u=ce(s);if(u)for(let m=u.length-1;m>=0;--m)i.push(u[m])}},nr=function(e){let i=null,s=null;if(ut)e="<remove></remove>"+e;else{const m=vr(e,/^[\r\n\t ]+/);s=m&&m[0]}Le==="application/xhtml+xml"&&ve===Y&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const l=$?de(e):e;if(ve===Y)try{i=new ke().parseFromString(l,Le)}catch{}if(!i||!i.documentElement){i=ot.createDocument(ve,"template",null);try{i.documentElement.innerHTML=ht?ie:l}catch{}}const u=i.body||i.documentElement;return e&&s&&u.insertBefore(n.createTextNode(s),u.childNodes[0]||null),ve===Y?Ur.call(i,oe?"html":"body")[0]:oe?i.documentElement:u},or=function(e){const i=Me?Me(e):e.ownerDocument;return Nt.call(i||e,e,M.SHOW_ELEMENT|M.SHOW_COMMENT|M.SHOW_TEXT|M.SHOW_PROCESSING_INSTRUCTION|M.SHOW_CDATA_SECTION,null)},We=function(e){return e=De(e,zr," "),e=De(e,jr," "),e=De(e,Wr," "),e},gt=function(e){var i;e.normalize();const s=Me?Me(e):e.ownerDocument,l=Nt.call(s||e,e,M.SHOW_TEXT|M.SHOW_COMMENT|M.SHOW_CDATA_SECTION|M.SHOW_PROCESSING_INSTRUCTION,null);let u=l.nextNode();for(;u;)u.data=We(u.data),u=l.nextNode();const m=(i=e.querySelectorAll)===null||i===void 0?void 0:i.call(e,"template");m&&ae(m,v=>{ge(v.content)&&gt(v.content)})},Ge=function(e){const i=pe?pe(e):null;return typeof i!="string"||L(i)!=="form"?!1:typeof e.nodeName!="string"||typeof e.textContent!="string"||typeof e.removeChild!="function"||e.attributes!==rt(e)||typeof e.removeAttribute!="function"||typeof e.removeAttributeNode!="function"||typeof e.getAttributeNode!="function"||typeof e.setAttribute!="function"||typeof e.namespaceURI!="string"||typeof e.insertBefore!="function"||typeof e.hasChildNodes!="function"||e.nodeType!==re(e)||e.childNodes!==ce(e)},ge=function(e){if(!re||typeof e!="object"||e===null)return!1;try{return re(e)===B.documentFragment}catch{return!1}},xe=function(e){if(!re||typeof e!="object"||e===null)return!1;try{return typeof re(e)=="number"}catch{return!1}};function V(a,e,i){a.length!==0&&ae(a,s=>{s.call(r,e,i,we)})}const si=function(e,i){return!!(ne&&e.hasChildNodes()&&!xe(e.firstElementChild)&&k(Rr,e.textContent)&&k(Rr,e.innerHTML)||ne&&e.namespaceURI===Y&&qi[i]&&(xe(e.firstElementChild)||typeof e.textContent=="string"&&k(Xi[i],e.textContent))||e.nodeType===B.processingInstruction||ne&&e.nodeType===B.comment&&k(Ar,e.data))},Ye=function(e,i){if(e instanceof RegExp)return k(e,i);if(e instanceof Function){for(var s=arguments.length,l=new Array(s>2?s-2:0),u=2;u<s;u++)l[u-2]=arguments[u];return!!e(i,...l)}return!1},ai=function(e,i,s){if(!Ae[i]&&cr(i)&&Ye(G.tagNameCheck,i))return!1;if(pt&&!me[i]){const l=ue(e),u=ce(e);if(u&&l){const m=u.length;for(let v=m-1;v>=0;--v){const A=e===s?Pr(u[v],!0):u[v];l.insertBefore(A,Nr(e))}}}return J(e),!0},sr=function(e,i,s,l){return e.length===0?i:i===s||i===l?z(i):i},be=function(e,i){return e===i||ue(e)!==null?!1:(dt&&je(e),!0)},ar=function(e,i){if(V(S.beforeSanitizeElements,e,null),be(e,i))return!0;if(Ge(e))return J(e),!0;const s=L(it(e));if(_=sr(S.uponSanitizeElement,_,st,Ne),V(S.uponSanitizeElement,e,{tagName:s,allowedTags:_}),be(e,i))return!0;if(si(e,s))return J(e),!0;if(Ae[s]||!(K.tagCheck instanceof Function&&K.tagCheck(s))&&!_[s]){const l=ai(e,s,i);return l===!1&&(V(S.afterSanitizeElements,e,null),be(e,i))?!0:l}if(Ee(e)===B.element&&!ii(e)||(s==="noscript"||s==="noembed"||s==="noframes")&&k(Yi,e.innerHTML))return J(e),!0;if(Z&&e.nodeType===B.text){const l=We(e.textContent);e.textContent!==l&&(Oe(r.removed,{element:e.cloneNode()}),e.textContent=l)}return V(S.afterSanitizeElements,e,null),be(e,i)},lr=function(e,i,s){if(Ht[i]||ir(i,e)||jt&&(i==="id"||i==="name")&&(s in n||s in Qr))return!1;const l=E[i]||K.attributeCheck instanceof Function&&K.attributeCheck(i,e);return lt&&k(Gr,i)||Ut&&k(Yr,i)?!0:l?Xt[i]||k(Ft,De(s,$t,""))||(i==="src"||i==="xlink:href"||i==="href")&&e!=="script"&&wr(s,"data:")===0&&Vt[e]||Bt&&!k(Vr,De(s,$t,""))?!0:!s:cr(e)&&Ye(G.tagNameCheck,e)&&Ye(G.attributeNameCheck,i,e)||i==="is"&&G.allowCustomizedBuiltInElements&&Ye(G.tagNameCheck,s)},li=g({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),cr=function(e){return!li[Ce(e)]&&k(qr,e)},ci=function(e,i,s,l){if($&&typeof le=="object"&&typeof le.getAttributeType=="function"&&!s)switch(le.getAttributeType(e,i)){case"TrustedHTML":return de(l);case"TrustedScriptURL":return $r(l)}return l},ui=function(e,i,s,l){try{return s?e.setAttributeNS(s,i,l):e.setAttribute(i,l),Ge(e)?(J(e),!1):!0}catch{return se(i,e),!1}},ur=function(e,i){if(V(S.beforeSanitizeAttributes,e,null),be(e,i))return;const s=e.attributes;if(!s||Ge(e))return;E=sr(S.uponSanitizeAttribute,E,at,$e);const l={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:E,forceKeepAttr:void 0};let u=s.length;const m=L(e.nodeName);for(;u--;){const v=s[u],A=v.name,j=v.namespaceURI,U=v.value,ye=L(A),yt=U;let P=A==="value"?yt:xi(yt),pr=!1;if(l.attrName=ye,l.attrValue=P,l.keepAttr=!0,l.forceKeepAttr=void 0,V(S.uponSanitizeAttribute,e,l),P=l.attrValue,Wt&&(ye==="id"||ye==="name")&&wr(P,Gt)!==0&&(se(A,e,v),P=Gt+P,pr=!0),ne&&k(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,P)){se(A,e,v);continue}if(ye==="attributename"&&vr(P,"href")){se(A,e,v);continue}if(!l.forceKeepAttr){if(!l.keepAttr){se(A,e,v);continue}if(!zt&&k(Vi,P)){se(A,e,v);continue}if(Z&&(P=We(P)),!lr(m,ye,P)){se(A,e,v);continue}P=ci(m,ye,j,P),P!==yt&&ui(e,A,j,P)&&pr&&mr(r.removed)}}V(S.afterSanitizeAttributes,e,null),be(e,i)},Ve=function(e){let i=null;const s=or(e);for(V(S.beforeSanitizeShadowDOM,e,null);i=s.nextNode();)if(V(S.uponSanitizeShadowNode,i,null),ar(i,e),ur(i,e),ge(i.content)&&Ve(i.content),Ee(i)===B.element){const l=kt(i);ge(l)&&(bt(l),Ve(l))}V(S.afterSanitizeShadowDOM,e,null)},bt=function(e){const i=[{node:e,shadow:null}];for(;i.length>0;){const s=i.pop();if(s.shadow){Ve(s.shadow);continue}const l=s.node,u=Ee(l)===B.element,m=ce(l);if(m)for(let v=m.length-1;v>=0;--v)i.push({node:m[v],shadow:null});if(u){const v=pe?pe(l):null;if(typeof v=="string"&&L(v)==="template"){const A=l.content;ge(A)&&i.push({node:A,shadow:null})}}if(u){const v=kt(l);ge(v)&&i.push({node:null,shadow:v},{node:v,shadow:null})}}};return r.sanitize=function(a){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=null,s=null,l=null,u=null;if(ht=!a,ht&&(a="<!-->"),typeof a!="string"&&!xe(a)&&(a=ki(a),typeof a!="string"))throw Q("dirty is not a string, aborting");if(!r.isSupported)return a;ct?(_=Ne,E=$e):wt(e),(S.uponSanitizeElement.length>0||S.uponSanitizeAttribute.length>0)&&(_=z(_)),S.uponSanitizeAttribute.length>0&&(E=z(E)),r.removed=[];const m=dt&&typeof a!="string"&&xe(a);if(m){oi(a);const j=it(a);if(typeof j=="string"){const U=L(j);if(!_[U]||Ae[U])throw ze(a),Q("root node is forbidden and cannot be sanitized in-place")}if(Ge(a))throw ze(a),Q("root node is clobbered and cannot be sanitized in-place");try{bt(a)}catch(U){throw ze(a),U}}else if(xe(a))i=nr("<!---->"),s=i.ownerDocument.importNode(a,!0),s.nodeType===B.element&&s.nodeName==="BODY"||s.nodeName==="HTML"?i=s:i.appendChild(s),bt(i);else{if(!he&&!Z&&!oe&&a.indexOf("<")===-1)return $&&He?de(a):a;if(i=nr(a),!i)return he?null:He?ie:""}i&&ut&&J(i.firstChild);const v=m?a:i;try{const j=or(v);for(;l=j.nextNode();)ar(l,v),ur(l,v),ge(l.content)&&Ve(l.content)}catch(j){throw m&&(ze(a),ae(r.removed,U=>{U.element&&je(U.element)})),j}if(m){let j=!1;if(ae(r.removed,U=>{U.element&&(U.element===a&&(j=!0),je(U.element))}),j)throw Q("a node selected for removal could not be safely returned; refusing to sanitize in place");return Z&&gt(a),a}if(he){if(Z&&gt(i),Fe)for(u=Hr.call(i.ownerDocument);i.firstChild;)u.appendChild(i.firstChild);else u=i;return(E.shadowroot||E.shadowrootmode)&&(u=Br.call(o,u,!0)),u}let A=oe?i.outerHTML:i.innerHTML;return oe&&_["!doctype"]&&i.ownerDocument&&i.ownerDocument.doctype&&i.ownerDocument.doctype.name&&k(Wi,i.ownerDocument.doctype.name)&&(A="<!DOCTYPE "+i.ownerDocument.doctype.name+`>
`+A),Z&&(A=We(A)),$&&He?de(A):A},r.setConfig=function(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};wt(a),ct=!0,Ne=_,$e=E},r.clearConfig=function(){we=null,ct=!1,Ne=null,$e=null,$=nt,ie=""},r.isValidAttribute=function(a,e,i){we||wt({});const s=L(a),l=L(e);return lr(s,l,i)},r.addHook=function(a,e){typeof e=="function"&&F(S,a)&&Oe(S[a],e)},r.removeHook=function(a,e){if(F(S,a)){if(e!==void 0){const i=Ai(S[a],e);return i===-1?void 0:Li(S[a],i,1)[0]}return mr(S[a])}},r.removeHooks=function(a){F(S,a)&&(S[a]=[])},r.removeAllHooks=function(){S=Lr()},r}var Xe=Mr();const Ji=["a"];function Qi(t){Xe.addHook("afterSanitizeAttributes",en);try{return Xe.sanitize(t,{ALLOWED_TAGS:Ji})}finally{Xe.removeHook("afterSanitizeAttributes")}}function en(t){t.nodeName.toLowerCase()==="a"&&(t.setAttribute("rel","ugc nofollow"),t.setAttribute("target","_blank"))}function tn(t,r=100,n=!0){if(t.length<r)return t;let o=r;if(n){const c=t.indexOf(" ",r),p=c-r<=20;if(p&&c===t.length-1)return t;c!==-1&&p&&(o=c)}return rn(t,o,r)}function rn(t,r,n){let o=t.slice(0,r);const c=o.match(/<a/gi);if(c){const p=o.match(/<\/a/gi);if(!p||p.length<c.length){const f=t.indexOf("</a>",r),q=f-n<=20;if(q&&t.length===f+4)return t;if(f!==-1&&q)o=t.slice(0,f+4);else{const M=o.lastIndexOf("<a");o=t.slice(0,M)}}}return o.concat("...")}const nn=/(http(s)?)?(:\/\/)?([a-zA-Z][-a-z0-9]*(\.[-a-z0-9]+)+(\/[^\s?#<>"']*)*(\?[^\s#<>"']*)?(#[^\s<>"']*)?)/;function on(t){return t.replace(/href="([^"]+)"/,(o,c)=>`href="${c.replace(".","__DOT__")}"`).replace(nn,o=>`<a href="${(o.match(/^(https|http)/)?o:`https://${o}`).replace(/"/g,"&quot;")}" rel="ugc nofollow" target="_blank">${o}</a>`).replace("__DOT__",".")}function sn(t){return t.trim().replace(/[ \t]+/g," ").replace(/(?:\r?\n)+/g,"<br />").replace(/(<br[^>]*>(<\/br>)?)+/g,"<br />")}const an="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3cpath%20d='M5%207.5H19L18%2021H6L5%207.5Z'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.5%209.5L15%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12%209.5V19'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.5%209.5L9%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M16%205H19C20.1046%205%2021%205.89543%2021%207V7.5H3V7C3%205.89543%203.89543%205%205%205H8M16%205L15%203H9L8%205M16%205H8'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3c/svg%3e";var ln=Object.defineProperty,cn=Object.getOwnPropertyDescriptor,H=(t,r,n,o)=>{for(var c=o>1?void 0:o?cn(r,n):r,p=t.length-1,f;p>=0;p--)(f=t[p])&&(c=(o?f(r,n,c):f(c))||c);return o&&c&&ln(r,n,c),c};let N=class extends Qe{constructor(){super(...arguments),this.maxSubjectLength=100,this.maxBodyLength=150,this.baseHost="https://archive.org",this.canDelete=!1,this.bypassTruncation=!1,this.showTruncatedContent=!1}render(){return this.review?d`
          <article
            class="review"
            id=${this.generateDomId()}
            tabindex=${pi(this.hasReviewerLink?void 0:"-1")}
          >
            ${this.canDelete?d`
                  <button
                    class="delete-btn"
                    title=${w("Delete this review")}
                    @click=${this.deleteReview}
                  >
                    <img
                      class="delete-icon"
                      src=${an}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                `:O}
            <div class="top-line">
              <b>${w("Reviewer:")}</b> ${this.reviewerTemplate} -
              ${this.starsTemplate}${this.createDateTemplate}
            </div>
            <div class="subject">
              <b>${w("Subject: ")}</b>${this.subjectTemplate}
            </div>
            <div class="body">
              ${this.deleteOutcome?d`<i>${this.deleteOutcomeMessage}</i>`:this.bodyTemplate}
            </div>
            ${this.truncationButtonsTemplate}
          </article>
        `:d`
          <div class="error">
            ${w("This review cannot be displayed at this time.")}
          </div>
        `}get subjectTemplate(){const t=this.review?.reviewtitle;return this.truncateContent(t??"",this.maxSubjectLength)}get bodyTemplate(){const t=this.review?.reviewbody;if(!t)return O;const r=Qi(t),n=this.truncateContent(r,this.maxBodyLength);return d`${xr(this.prepReview(n))}`}get truncationButtonsTemplate(){return this.bypassTruncation?O:(this.review?.reviewtitle?.length??0)<=this.maxSubjectLength&&(this.review?.reviewbody?.length??0)<=this.maxBodyLength?O:this.showTruncatedContent?this.lessButtonTemplate:this.moreButtonTemplate}get moreButtonTemplate(){return d`
      <button
        class="simple-link more-btn"
        @click=${()=>this.showTruncatedContent=!0}
      >
        ${w("More...")}
      </button>
    `}get lessButtonTemplate(){return d`<button
      class="simple-link less-btn"
      @click=${()=>this.showTruncatedContent=!1}
    >
      ${w("...Less")}
    </button>`}focus(t){(this.reviewerLink??this.reviewArticle)?.focus(t)}get hasReviewerLink(){return!!this.review?.reviewer_itemname}get reviewerTemplate(){return this.review?this.hasReviewerLink?d`
            <a
              href="${this.baseHost}/details/${this.review.reviewer_itemname}"
              class="reviewer-link simple-link"
              data-event-click-tracking="ItemReviews|ReviewerLink"
            >
              ${dr(this.review.reviewer)}
            </a>
          `:d`${dr(this.review.reviewer)}`:O}get starsTemplate(){return!this.review||!this.review.stars?O:d`
      <div
        class="review-stars"
        title=${w(Se`${this.review.stars} out of 5 stars`)}
      >
        ${new Array(Number(this.review.stars)).fill(null).map(()=>d`<div class="review-star">
              <img
                class="star-basic"
                src=${wi}
                alt=""
                aria-hidden="true"
              />
            </div>`)}
      </div>
      -
    `}get createDateTemplate(){if(!this.review?.createdate||!this.review?.reviewdate)return O;const t=new Date(this.review.reviewdate),r=new Date(this.review.createdate),n=r.toLocaleString("en-us",{month:"long",day:"numeric",year:"numeric"});return t.getTime()!==r.getTime()?w(Se`${n} (edited)`):n}generateDomId(){return this.review?.createdate?`review-${Date.parse(this.review.createdate.toString())}`:""}truncateContent(t,r){return this.showTruncatedContent||this.bypassTruncation?t:tn(t,r)}prepReview(t){return sn(on(t))}async deleteReview(){if(!this.review?.reviewer||!this.identifier||!confirm(w("Are you sure you want to delete this review?")))return;const t=await this.activeReviewService.deleteReview({identifier:this.identifier,reviewer:this.review.reviewer,reviewerItemname:this.review.reviewer_itemname});this.deleteOutcome=t.success?{status:"queued"}:{status:"failed",error:t.error}}get activeReviewService(){return this.reviewService?this.reviewService:Dt({token:this.csrfToken,baseHost:this.baseHost})}get deleteOutcomeMessage(){return this.deleteOutcome?.status==="queued"?w("This review has been queued for deletion."):this.deleteOutcome?.error??w("Sorry, we were unable to delete this review.")}static get styles(){return et`
      :host {
        font-family: var(
          --ia-font-stack,
          'Helvetica Neue',
          Helvetica,
          Arial,
          sans-serif
        );

        font-size: inherit;
        --container-bg-color: #fbfbfd;
        --container-border-color: #999999;
      }

      .review {
        position: relative;
        padding-right: 30px;
      }

      .error {
        color: var(--error-color, #cc0000);
      }

      .top-line {
        margin-bottom: 0.5rem;
      }

      .top-line > * {
        display: inline-block;
      }

      .review-star {
        width: 1rem;
        display: inline-block;
      }

      .star-basic {
        display: block;
        width: 100%;
      }

      .simple-link,
      .body a {
        color: var(--link-color, #4b64ff);
        text-decoration: none;
        background: transparent;
        border: none;
        padding: 0px;
      }

      .simple-link:hover,
      .body a:hover {
        cursor: pointer;
        text-decoration: underline;
      }

      .subject {
        margin-bottom: 0.5rem;
      }

      .delete-btn {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0;
        background: none;
        border: 0;
      }

      .delete-btn:hover {
        cursor: pointer;
      }

      .delete-icon {
        width: 20px;
        mix-blend-mode: multiply;
      }
    `}};H([h({type:Object})],N.prototype,"review",2);H([h({type:String})],N.prototype,"identifier",2);H([h({type:Number})],N.prototype,"maxSubjectLength",2);H([h({type:Number})],N.prototype,"maxBodyLength",2);H([h({type:String})],N.prototype,"baseHost",2);H([h({type:Object})],N.prototype,"reviewService",2);H([h({type:String})],N.prototype,"csrfToken",2);H([h({type:Boolean})],N.prototype,"canDelete",2);H([h({type:Boolean})],N.prototype,"bypassTruncation",2);H([C()],N.prototype,"showTruncatedContent",2);H([C()],N.prototype,"deleteOutcome",2);H([Ze(".reviewer-link")],N.prototype,"reviewerLink",2);H([Ze("article.review")],N.prototype,"reviewArticle",2);N=H([Je("ia-review"),Ot()],N);const un="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23c2820a'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e",pn="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23ffffff'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e";var dn=Object.defineProperty,hn=Object.getOwnPropertyDescriptor,R=(t,r,n,o)=>{for(var c=o>1?void 0:o?hn(r,n):r,p=t.length-1,f;p>=0;p--)(f=t[p])&&(c=(o?f(r,n,c):f(c))||c);return o&&c&&dn(r,n,c),c};let T=class extends Qe{constructor(){super(...arguments),this.baseHost="https://archive.org",this.bypassRecaptcha=!1,this.currentStars=0,this.currentSubjectLength=0,this.currentBodyLength=0,this.recaptchaUnavailable=!1,this.formCanSubmit=!1,this.submissionInProgress=!1}render(){return d`<form id="review-form" @submit=${this.handleSubmit}>
      ${this.unrecoverableErrorMessage?this.unrecoverableErrorTemplate:d`
            <span class="inputs">
              ${this.starsInputTemplate} ${this.subjectInputTemplate}
              ${this.bodyInputTemplate} ${this.hiddenInputsTemplate}
            </span>
          `}
      ${this.recaptchaMessageTemplate} ${this.recoverableErrorTemplate}
      ${this.actionButtonsTemplate}
    </form>`}willUpdate(t){t.has("oldReview")&&(this.currentStars=this.oldReview?.stars??0,this.currentSubjectLength=this.oldReview?.reviewtitle?.length??0,this.currentBodyLength=this.oldReview?.reviewbody?.length??0),t.has("recaptchaManager")&&!this.bypassRecaptcha&&this.recaptchaManager&&this.setupRecaptcha(),(t.has("unrecoverableError")||t.has("recaptchaUnavailable"))&&(this.formCanSubmit=this.checkSubmissionAllowed()),(t.has("currentSubjectLength")||t.has("currentBodyLength")||t.has("maxSubjectLength")||t.has("maxBodyLength"))&&(this.formCanSubmit=this.checkSubmissionAllowed())}get unrecoverableErrorTemplate(){const t=this.unrecoverableErrorMessage;return t?d`
          <div class="unrecoverable-error">
            <span class="error-msg">${t}</span>
          </div>
        `:O}get recoverableErrorTemplate(){const t=this.recoverableErrorMessage;return t?d`
          <div class="recoverable-error">
            ${xr(this.sanitizeErrorMsg(t))}
          </div>
        `:O}get unrecoverableErrorMessage(){return this.unrecoverableError?this.unrecoverableError:this.recaptchaUnavailable?this.recaptchaErrorMessage:void 0}get recoverableErrorMessage(){if(this.recoverableError)return this.recoverableError;switch(this.formError){case"recaptcha":return this.recaptchaErrorMessage;case"generic":return this.genericErrorMessage;default:return}}get recaptchaErrorMessage(){return w("Could not validate review. Please try again later.")}get genericErrorMessage(){return w("There's been a temporary error. Please wait a moment and try again.")}get recaptchaMessageTemplate(){return this.bypassRecaptcha?O:d`
      <span class="recaptcha-disclaimer"
        >${w(d`This site is protected by reCAPTCHA and the Google
            <a
              target="_blank"
              class="inline-link"
              href="https://policies.google.com/privacy"
              >Privacy Policy</a
            >
            and
            <a
              target="_blank"
              class="inline-link"
              href="https://policies.google.com/terms"
              >Terms of Service</a
            >
            apply.`)}</span
      >
    `}get starsInputTemplate(){return d`
      <div class="form-heading rating">
        <label for="stars-field">${w("Rating (optional)")}</label>
      </div>
      <input
        type="hidden"
        name="field_stars"
        id="stars-input"
        .value=${this.currentStars.toString()}
        required
      />
      <div class="stars">
        ${[1,2,3,4,5].map(t=>this.renderStar(t))}
        <button
          type="button"
          class="clear-stars-btn"
          @click=${this.handleClearBtnClicked}
        >
          ${w("Clear")}
        </button>
      </div>
    `}get subjectInputTemplate(){return d`
      <span id="subject-input" class="input-box ${this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength?"error":""}"
      ><div class="form-heading">
        <label for="field_reviewtitle">${w("Subject")}</label>
        ${this.maxSubjectLength?d`<div class="char-count subject">
                ${this.currentSubjectLength}/${this.maxSubjectLength}
              </div>`:O}
      </div>
      <input
        type="text"
        name="field_reviewtitle"
        id="field_reviewtitle"
        .value=${this.oldReview?.reviewtitle??""}
        @input=${this.handleSubjectChanged}
        required
    />${this.maxSubjectLength?d`
            <div class="input-error">
              ${w(Se`Subject may only have ${this.maxSubjectLength} characters`)}
            </div>
          `:O}</div></span>
    `}get hiddenInputsTemplate(){return d`
      <input
        type="hidden"
        name="field_reviewtoken"
        .value=${this.token??""}
      />
      ${this.identifier?d`<input
            type="hidden"
            name="identifier"
            .value=${this.identifier}
          />`:O}
    `}get bodyInputTemplate(){return d`
      <span
        id="body-input"
        class="input-box ${this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength?"error":""}"
        ><div class="form-heading">
          <label for="field_reviewbody">${w("Review")}</label>
          ${this.maxBodyLength?d`<div class="char-count body">
                ${this.currentBodyLength}/${this.maxBodyLength}
              </div>`:O}
        </div>
        <textarea
          name="field_reviewbody"
          id="field_reviewbody"
          .value=${this.oldReview?.reviewbody??""}
          rows="10"
          cols="50"
          required
          @input=${this.handleBodyChanged}
        ></textarea>
        ${this.maxBodyLength?d`
              <div class="input-error">
                ${w(Se`Review may only have ${this.maxBodyLength} characters`)}
              </div>
            `:O}
      </span>
    `}get actionButtonsTemplate(){return d`<div class="action-btns">
      <ia-button
        mode="secondary"
        class="cancel-btn"
        data-testid="cancel-btn"
        @click=${this.cancelReviewEdit}
      >
        ${w("Cancel")}
      </ia-button>
      <ia-button
        mode="primary"
        type="submit"
        class="submit-btn"
        .disabled=${!this.formCanSubmit}
        .loading=${this.submissionInProgress}
      >
        ${w("Submit review")}
      </ia-button>
    </div>`}renderStar(t){const r=t===this.currentStars,n=t===1?w("Rate 1 star"):w(Se`Rate ${t} stars`);return d`
      <button
        class="star star-${t}"
        title=${r?w("Clear rating"):n}
        @click=${o=>this.handleStarClicked(o,t)}
      >
        ${t<=this.currentStars?d`<img
              class="star-selected"
              src=${un}
              alt=""
              aria-hidden="true"
            />`:d`<img
              class="star-unselected"
              src=${pn}
              alt=""
              aria-hidden="true"
            />`}
      </button>
    `}async setupRecaptcha(){try{this.recaptchaWidget=await this.recaptchaManager?.getRecaptchaWidget()}catch{this.recaptchaUnavailable=!0}}sanitizeErrorMsg(t){return Xe.sanitize(t,{ALLOWED_TAGS:["a","b","br"]})}get activeReviewService(){if(this.reviewService)return this.reviewService;if(this.fetchHandler)return Dt({token:this.token,endpointPath:this.endpointPath,fetchHandler:this.fetchHandler,baseHost:this.baseHost})}async handleSubmit(t){if(t.preventDefault(),!this.formCanSubmit||this.submissionInProgress)return;if(this.submissionInProgress=!0,this.recoverableError="",this.formError=void 0,!this.reviewForm.reportValidity())return this.stopSubmission();const r=this.activeReviewService;if(!r||this.reviewService&&!this.identifier)return this.formError="generic",this.stopSubmission();try{let n;if(!this.bypassRecaptcha&&(n=await this.getRecaptchaToken(),!n))return this.handleRecaptchaError();const o=await r.submitReview({identifier:this.identifier??"",title:this.reviewForm.field_reviewtitle.value,body:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,recaptchaToken:n});if(o?.success===!0){this.submissionInProgress=!1;const c=this.generateSubmittedReview(),p=new CustomEvent("reviewUpdated",{detail:c});this.dispatchEvent(p)}else o.error?this.recoverableError=o.error:this.formError="generic",this.stopSubmission()}catch(n){console.error(n),this.formError="generic",this.stopSubmission()}}generateSubmittedReview(){const t=new Date().toDateString();return new te({reviewtitle:this.reviewForm.field_reviewtitle.value,reviewbody:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,reviewdate:t,reviewer:this.oldReview?.reviewer??this.submitterScreenname??w("Anonymous"),reviewer_itemname:this.oldReview?.reviewer_itemname??this.submitterItemname,createdate:this.dateToString(this.oldReview?.createdate)??t})}dateToString(t){return t instanceof Date?t.toDateString():t}async getRecaptchaToken(){if(!this.recaptchaWidget){this.handleRecaptchaError();return}try{return await this.recaptchaWidget.execute()}catch{this.handleRecaptchaError();return}}handleRecaptchaError(){this.formError="recaptcha",this.stopSubmission()}stopSubmission(){this.submissionInProgress&&(this.submissionInProgress=!1)}cancelReviewEdit(){const t=new CustomEvent("reviewEditCanceled");this.dispatchEvent(t)}handleStarClicked(t,r){t.preventDefault(),this.setStars(r)}handleClearBtnClicked(t){t.preventDefault(),this.currentStars=0}setStars(t){this.currentStars=t===this.currentStars?0:t}handleSubjectChanged(t){const r=t.target;this.currentSubjectLength=r.value.length}handleBodyChanged(t){const r=t.target;this.currentBodyLength=r.value.length}checkSubmissionAllowed(){return!(this.unrecoverableErrorMessage||!this.currentBodyLength||!this.currentSubjectLength||this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength||this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength)}static get styles(){return[et`
        .form-heading {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-top: 15px;
        }

        .form-heading.rating {
          padding-top: 0;
        }

        .form-heading label {
          font-size: 1.6rem;
          font-weight: bold;
        }

        label {
          display: inline-block;
          margin-bottom: 5px;
        }

        textarea,
        input[type='text'],
        .unrecoverable-error {
          padding: 5px;
          width: calc(100% - 10px);
          font-family: inherit;
          border-radius: 5px;
          border: 1px solid var(--container-border-color, #999999);
        }

        .input-box.error input,
        .input-box.error textarea {
          border: 2px solid var(--container-error-color, #ea0202);
        }

        .input-box.error .char-count,
        .input-error,
        .unrecoverable-error,
        .recoverable-error {
          color: var(--container-error-color, #ea0202);
        }

        .input-error {
          display: none;
        }

        .input-box.error .input-error {
          display: block;
          text-align: right;
          padding-top: 5px;
        }

        .inline-link {
          color: var(--container-link-color, #4f65f5);
          text-decoration: none;
        }

        .inline-link:hover {
          text-decoration: underline;
        }

        .stars {
          display: flex;
          flex-direction: row;
          gap: 2px;
          align-items: center;
        }

        .star {
          all: unset;
          height: 30px;
          width: 30px;
        }

        .star-selected,
        .star-unselected {
          display: block;
          width: 100%;
          height: 100%;
        }

        .star:hover {
          cursor: pointer;
        }

        .clear-stars-btn,
        .recoverable-error a {
          padding: 0 5px;
          color: var(--container-link-color, #4f65f5);
          font-family: inherit;
          border: none;
          background: transparent;
          display: inline-block;
          padding-top: 5px;
        }

        .clear-stars-btn:hover,
        .recoverable-error a:hover {
          cursor: pointer;
          text-decoration: underline;
        }

        .action-btns {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding-top: 15px;
        }

        .ia-button:disabled {
          opacity: 0.75;
        }

        .ia-button:disabled:hover {
          cursor: not-allowed;
        }

        .unrecoverable-error {
          min-height: 50px;
          padding: 5px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: var(--container-bg-color, #fbfbfd);
        }

        .recaptcha-disclaimer {
          font-size: 1.2rem;
        }

        @media only screen and (max-width: 350px) {
          .action-btns {
            flex-direction: column-reverse;
            align-items: center;
          }
        }
      `]}};R([h({type:String})],T.prototype,"identifier",2);R([h({type:String})],T.prototype,"submitterScreenname",2);R([h({type:String})],T.prototype,"submitterItemname",2);R([h({type:Object})],T.prototype,"oldReview",2);R([h({type:String})],T.prototype,"unrecoverableError",2);R([h({type:Number})],T.prototype,"maxSubjectLength",2);R([h({type:Number})],T.prototype,"maxBodyLength",2);R([h({type:Object})],T.prototype,"reviewService",2);R([h({type:String})],T.prototype,"token",2);R([h({type:String})],T.prototype,"baseHost",2);R([h({type:String})],T.prototype,"endpointPath",2);R([h({type:Object})],T.prototype,"fetchHandler",2);R([h({type:Object})],T.prototype,"recaptchaManager",2);R([h({type:Boolean})],T.prototype,"bypassRecaptcha",2);R([C()],T.prototype,"currentStars",2);R([C()],T.prototype,"currentSubjectLength",2);R([C()],T.prototype,"currentBodyLength",2);R([C()],T.prototype,"recoverableError",2);R([C()],T.prototype,"formError",2);R([C()],T.prototype,"recaptchaUnavailable",2);R([C()],T.prototype,"formCanSubmit",2);R([C()],T.prototype,"submissionInProgress",2);R([Ze("#review-form")],T.prototype,"reviewForm",2);T=R([Je("ia-review-form"),Ot()],T);var fn=Object.defineProperty,mn=Object.getOwnPropertyDescriptor,y=(t,r,n,o)=>{for(var c=o>1?void 0:o?mn(r,n):r,p=t.length-1,f;p>=0;p--)(f=t[p])&&(c=(o?f(r,n,c):f(c))||c);return o&&c&&fn(r,n,c),c};let b=class extends Qe{constructor(){super(...arguments),this.reviews=[],this.reviewsDisabled=!1,this.reviewsFrozen=!1,this.canDelete=!1,this.displayReviewsByDefault=!1,this.maxInitialReviews=5,this.baseHost="https://archive.org",this.bypassRecaptcha=!1,this.reviewAddEditRequested=!1,this.displayReviewForm=!1,this.showAllReviews=!1,this.filteredReviews=[],this.reviewsCount=0,this.recaptchaActivated=!1}render(){return this.reviewsDisabled?this.reviewsDisabledTemplate:this.reviewsCount===0&&!this.displayReviewForm?this.noReviewsMsgTemplate:d`
      <div class="reviews-list">
        ${this.reviewsFrozen?d`<div class="message">
              ${w("Reviews can no longer be added to this item.")}
            </div>`:O}
        ${this.editableCurrentReviewTemplate}
        ${this.visibleReviews.map(t=>this.renderReview(t))}
        ${this.showMoreButtonTemplate}
      </div>
    `}willUpdate(t){(!this.activeReviewService||t.has("reviewService")||t.has("baseHost")||t.has("token")||t.has("endpointPath")||t.has("fetchHandler"))&&(this.activeReviewService=this.buildReviewService()),(t.has("reviews")||t.has("submitterItemname"))&&(this.reviewsCount=this.reviews.length,this.sortFilterReviews()),t.has("displayReviewForm")&&this.displayReviewForm===!0&&!this.bypassRecaptcha&&!this.recaptchaActivated&&(this.recaptchaActivated=!0)}get visibleReviews(){return this.showAllReviews||this.displayReviewsByDefault?this.filteredReviews:this.filteredReviews.slice(0,this.maxInitialReviews)}buildReviewService(){return this.reviewService?this.reviewService:mi(this)?Dt(this):new Dr({baseHost:this.baseHost})}get reviewsDisabledTemplate(){return d`<div class="message">
      ${w("Reviews have been disabled for this item.")}
    </div>`}get noReviewsMsgTemplate(){return this.reviewsFrozen?d`
        <div class="message">
          ${w("Reviews cannot be added to this item.")}
        </div>
      `:d`
      <div class="message">
        ${w("There are no reviews yet.")}
        ${w(d`
          Be the first one to
          <ia-button
            mode="link"
            class="no-reviews-btn"
            @click=${this.addEditReview}
          >
            write a review</ia-button
          >.
        `)}
      </div>
    `}get showMoreButtonTemplate(){const t=this.filteredReviews.length-this.visibleReviews.length;return t<=0?O:d`
      <ia-button
        mode="link"
        class="show-more-btn"
        @click=${this.showMoreReviews}
      >
        ${t===1?w("Show 1 more review"):w(Se`Show ${t} more reviews`)}
      </ia-button>
    `}get editableCurrentReviewTemplate(){return!this.displayReviewForm&&!this.currentReview?O:d`<div class="own-review-container">
      ${this.displayReviewForm?d`<ia-review-form
            .identifier=${this.identifier}
            .oldReview=${this.currentReview}
            .submitterItemname=${this.submitterItemname}
            .submitterScreenname=${this.submitterScreenname}
            .maxSubjectLength=${this.maxSubjectLength}
            .maxBodyLength=${this.maxBodyLength}
            .unrecoverableError=${this.reviewSubmissionError}
            .reviewService=${this.activeReviewService}
            .recaptchaManager=${this.recaptchaActivated?this.recaptchaManager:void 0}
            ?bypassRecaptcha=${this.bypassRecaptcha}
            @reviewUpdated=${this.handleReviewUpdate}
            @reviewEditCanceled=${this.handleEditCanceled}
          ></ia-review-form>`:this.renderReview(this.currentReview)}
    </div>`}sortFilterReviews(){let t;const r=[];this.reviews.forEach(n=>{n.reviewer_itemname!==this.submitterItemname?r.push(n):t||(t=n)}),this.currentReview=t,this.filteredReviews=this.sortReviews(r)}sortReviews(t){return[...t].sort((n,o)=>n.createdate&&o.createdate?new Date(o.createdate).getTime()-new Date(n.createdate).getTime():0)}renderReview(t){return t?d`<ia-review
      .review=${t}
      .identifier=${this.identifier}
      .baseHost=${this.baseHost}
      .reviewService=${this.activeReviewService}
      ?canDelete=${this.canDelete}
      ?bypassTruncation=${this.displayReviewsByDefault}
    ></ia-review>`:O}async showMoreReviews(){const t=this.visibleReviews.length;this.showAllReviews=!0,await this.updateComplete;const r=this.listedReviews?.[t];await r?.updateComplete,r?.focus()}addEditReview(){this.bypassRecaptcha||(this.recaptchaActivated=!0),this.displayReviewForm=!0}handleReviewUpdate(t){!this.currentReview&&t.detail&&(this.dispatchEvent(new CustomEvent("newReviewAdded")),this.reviewsCount+=1),this.currentReview=t.detail,this.displayReviewForm=!1}handleEditCanceled(){this.displayReviewForm=!1}static get styles(){return[et`
        :host {
          font-family: var(
            --ia-font-stack,
            'Helvetica Neue',
            Helvetica,
            Arial,
            sans-serif
          );

          color: var(--ia-text-color, #2c2c2c);
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 100%;
        }

        .own-review-container {
          --error-color: var(--container-error-color, #ea0202);
          --link-color: var(--container-link-color, #4f65f5);
          --container-error-color: #ea0202;
          --container-link-color: #4f65f5;
          --container-bg-color: #fbfbfd;
          --container-border-color: #999999;

          border: 2px solid var(--container-border-color, #999999);
          border-radius: 5px;
          background-color: var(--container-bg-color, #fbfbfd);
          padding: 10px;
        }

        .message {
          font-weight: 200;
        }

        .message ia-button {
          display: inline;
          vertical-align: baseline;
        }

        /* The button inside ia-button is a flex box, which would break these
           out of the sentence they sit in. */
        .message ia-button::part(button) {
          display: inline;
          min-height: 0;
          padding: 0;
          font-weight: 600;
        }

        /* Keeps the click target to the text, rather than the full width of the list */
        .show-more-btn {
          align-self: flex-start;
        }

        .show-more-btn::part(button) {
          font-weight: 600;
        }
      `]}};y([h({type:String})],b.prototype,"identifier",2);y([h({type:Array})],b.prototype,"reviews",2);y([h({type:Boolean})],b.prototype,"reviewsDisabled",2);y([h({type:Boolean})],b.prototype,"reviewsFrozen",2);y([h({type:Boolean})],b.prototype,"canDelete",2);y([h({type:Boolean})],b.prototype,"displayReviewsByDefault",2);y([h({type:Number})],b.prototype,"maxInitialReviews",2);y([h({type:Number})],b.prototype,"maxSubjectLength",2);y([h({type:Number})],b.prototype,"maxBodyLength",2);y([h({type:String})],b.prototype,"baseHost",2);y([h({type:String})],b.prototype,"submitterScreenname",2);y([h({type:String})],b.prototype,"submitterItemname",2);y([h({type:Object})],b.prototype,"recaptchaManager",2);y([h({type:Boolean})],b.prototype,"bypassRecaptcha",2);y([h({type:String})],b.prototype,"reviewSubmissionError",2);y([h({type:Boolean})],b.prototype,"reviewAddEditRequested",2);y([h({type:Object})],b.prototype,"reviewService",2);y([h({type:String})],b.prototype,"token",2);y([h({type:String})],b.prototype,"endpointPath",2);y([h({type:Object})],b.prototype,"fetchHandler",2);y([C()],b.prototype,"activeReviewService",2);y([C()],b.prototype,"displayReviewForm",2);y([C()],b.prototype,"showAllReviews",2);y([C()],b.prototype,"filteredReviews",2);y([C()],b.prototype,"currentReview",2);y([C()],b.prototype,"reviewsCount",2);y([C()],b.prototype,"recaptchaActivated",2);y([di(".reviews-list > ia-review")],b.prototype,"listedReviews",2);b=y([Je("ia-reviews"),Ot()],b);var vn=Object.defineProperty,wn=Object.getOwnPropertyDescriptor,It=(t,r,n,o)=>{for(var c=o>1?void 0:o?wn(r,n):r,p=t.length-1,f;p>=0;p--)(f=t[p])&&(c=(o?f(r,n,c):f(c))||c);return o&&c&&vn(r,n,c),c};const gn=[new te({stars:5,reviewtitle:"Better than I expected",reviewbody:"Came for one track and stayed for the whole set. The recording is clean all the way through, which is more than you can say for most of these. Long enough to run past the truncation limit, so the More and Less controls have something to do.",reviewer:"Ada Fielding",reviewer_itemname:"@ada-fielding",reviewdate:"2026-08-14",createdate:"2026-08-14"}),new te({stars:3,reviewtitle:"Good, with caveats",reviewbody:"The first half is excellent. The second half has a hum running under it that I could not unhear once I noticed it. Still worth your time.",reviewer:"Bo Ellery",reviewer_itemname:"@bo-ellery",reviewdate:"2026-07-02",createdate:"2026-07-02"}),new te({stars:1,reviewtitle:"Wrong item",reviewbody:"This is not what the description says it is.",reviewer:"Cal Nwosu",reviewer_itemname:"@cal-nwosu",reviewdate:"2026-06-21",createdate:"2026-06-21"}),new te({stars:4,reviewtitle:"Solid transfer",reviewbody:"Clean audio, good notes. Would listen again.",reviewer:"Dee Okafor",reviewer_itemname:"@dee-okafor",reviewdate:"2026-05-30",createdate:"2026-05-30"}),new te({stars:5,reviewtitle:"A favourite",reviewbody:"I come back to this one every year.",reviewer:"Eli Marsh",reviewer_itemname:"@eli-marsh",reviewdate:"2026-04-11",createdate:"2026-04-11"}),new te({stars:2,reviewtitle:"Not for me",reviewbody:"Well made, but the style never clicked for me.",reviewer:"Fen Albright",reviewer_itemname:"@fen-albright",reviewdate:"2026-03-08",createdate:"2026-03-08"}),new te({stars:4,reviewtitle:"Worth it for the second half",reviewbody:"Slow start, but it earns the ending.",reviewer:"Gus Tanaka",reviewer_itemname:"@gus-tanaka",reviewdate:"2026-02-19",createdate:"2026-02-19"})],bn=[{label:"Text colour",cssVariable:"--ia-text-color",defaultValue:"#2c2c2c",inputType:"color"}],yn=[{label:'Max reviews before "Show more"',propertyName:"maxInitialReviews",defaultValue:5,inputType:"number"},{label:"Show every review, untruncated",propertyName:"displayReviewsByDefault",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews disabled",propertyName:"reviewsDisabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews frozen",propertyName:"reviewsFrozen",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Can delete",propertyName:"canDelete",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Submitter screenname",propertyName:"submitterScreenname",defaultValue:"Demo User"},{label:"Max subject length",propertyName:"maxSubjectLength",defaultValue:64,inputType:"number"},{label:"Max body length",propertyName:"maxBodyLength",defaultValue:1e3,inputType:"number"}],Tn={async fetch(){return new Response(JSON.stringify({success:!0}),{status:200})},async fetchApiResponse(){return{success:!0}},async fetchApiPathResponse(){return{success:!0}},async fetchIAApiResponse(){return{success:!0}}},Sn=new Dr({fetchHandler:Tn}),_n=6;let Ke=class extends Qe{constructor(){super(...arguments),this.log=[]}render(){return d`
      <story-template
        elementTag="ia-reviews"
        elementClassName="IAReviews"
        .styleInputData=${{settings:bn}}
        .propInputData=${{settings:yn}}
        .defaultUsageProps=${'.reviews=${reviews} identifier="nasa"'}
      >
        <ia-reviews
          slot="demo"
          identifier="nasa"
          bypassRecaptcha
          submitterScreenname="Demo User"
          .reviews=${gn}
          .reviewService=${Sn}
          @newReviewAdded=${this.record}
        ></ia-reviews>

        <div slot="demo" class="panel">
          <button class="add-review" @click=${this.openReviewForm}>
            Add review
          </button>
        </div>

        <div slot="demo" class="panel">
          <div class="log-header">
            <strong>Events</strong>
            <button @click=${()=>this.log=[]}>Clear</button>
          </div>
          ${this.log.length===0?d`<p class="empty">
                Submit the review form to see events here.
              </p>`:d`<ol class="log">
                ${this.log.map(t=>d`<li><code>${t}</code></li>`)}
              </ol>`}
        </div>

        <div slot="usage-notes">
          <p>
            The reviews list for an item, plus the form for writing one. Pass
            the existing reviews in as <code>reviews</code> and the item's
            <code>identifier</code>. Writes and deletes go through the
            <code>reviewService</code> it's handed, a <code>ReviewService</code>
            built on a fetch handler that supplies the CSRF token.
          </p>
          <p>
            <code>bypassRecaptcha</code> is set here so the form can be
            submitted without a reCAPTCHA key, and the demo's service sits on a
            stub fetch handler so nothing posts to archive.org. In real use,
            hand it a <code>recaptchaManager</code> and a service built on the
            real handler.
          </p>
          <p>
            The component only shows a "write a review" link when an item has no
            reviews yet. With reviews present, a host page supplies its own
            button and opens the form by setting <code>displayReviewForm</code>
            on the element, which is what the "Add review" button above does and
            what offshoot and the legacy Details page both do.
          </p>
          <p>
            <code>newReviewAdded</code> is the only event that leaves the
            component. The form's <code>reviewUpdated</code> and
            <code>reviewEditCanceled</code> are handled inside
            <code>ia-reviews</code> and don't cross its shadow boundary.
          </p>
          <p>
            Only the newest <code>maxInitialReviews</code> (5 by default) show
            at first, with a "Show more" button for the rest. The patron's own
            review sits above the list and doesn't count toward that.
            <code>displayReviewsByDefault</code> shows every review with no
            truncation.
          </p>
          <p>
            <code>reviewsDisabled</code> hides the whole section, while
            <code>reviewsFrozen</code> keeps existing reviews visible but stops
            new ones. <code>canDelete</code> is what puts the delete control on
            a review the current user wrote.
          </p>
        </div>
      </story-template>
    `}openReviewForm(){this.reviews&&(this.reviews.displayReviewForm=!0)}record(t){const{detail:r}=t,n=r?` ${JSON.stringify(r)}`:"";this.log=[`${t.type}${n}`,...this.log].slice(0,_n)}static get styles(){return et`
      .panel {
        margin-top: 1em;
      }

      .add-review {
        font: inherit;
        padding: 0.3em 0.8em;
      }

      .log-header {
        display: flex;
        align-items: center;
        gap: 0.5em;
        margin-bottom: 0.5em;
      }

      .log {
        margin: 0;
        padding-left: 1.5em;
        font-size: 0.9em;
        word-break: break-all;
      }

      .empty {
        font-size: 0.9em;
        font-style: italic;
      }
    `}};It([C()],Ke.prototype,"log",2);It([Ze("ia-reviews")],Ke.prototype,"reviews",2);Ke=It([Je("ia-reviews-story")],Ke);export{Ke as IAReviewsStory};
