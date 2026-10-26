const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./modal-manager-X1OeMort.js","./index-C2FQnv_e.js","./index-CLPW2vZw.css","./localized-decorator-B5OK1PY7.js","./ia-status-indicator-BVWA3-hx.js","./theme-styles-BJQUsykD.js","./icon-box-D-nPJcm0.js","./mediatype-web-bYTis0Hm.js","./modal-config-Ckbblf-F.js"])))=>i.map(i=>d[i]);
import{A as $,i as x,a as d,b as l,n as a,c as R,d as se,m as c,s as Le,_ as Te,r as L}from"./index-C2FQnv_e.js";import{i as _e}from"./keyed-DouyiF_2.js";import"./story-template-CBVqeIl0.js";import{M as J}from"./modal-config-Ckbblf-F.js";import{F as xe,N as Re}from"./fetch-handler-CW24_TiN.js";import{l as Se}from"./localized-decorator-B5OK1PY7.js";import"./directive-helpers-CRNvmSGN.js";import"./syntax-highlighter-CulzSe-W.js";import"./theme-styles-BJQUsykD.js";class Be{constructor(){this.resizeObserver=new ResizeObserver(e=>{window.requestAnimationFrame(()=>{for(const t of e){const n=this.resizeHandlers.get(t.target);n?.forEach(o=>{o.handleResize(t)})}})}),this.resizeHandlers=new Map}shutdown(){this.resizeHandlers.forEach((e,t)=>{this.resizeObserver.unobserve(t)}),this.resizeHandlers.clear()}addObserver(e){var t;const n=(t=this.resizeHandlers.get(e.target))!==null&&t!==void 0?t:new Set;n.add(e.handler),this.resizeHandlers.set(e.target,n),this.resizeObserver.observe(e.target,e.options)}removeObserver(e){const t=this.resizeHandlers.get(e.target);t&&(t.delete(e.handler),t.size===0&&(this.resizeObserver.unobserve(e.target),this.resizeHandlers.delete(e.target)))}}function I(i){return new Promise((e,t)=>{i.oncomplete=i.onsuccess=()=>e(i.result),i.onabort=i.onerror=()=>t(i.error)})}function $e(i,e){let t;const n=()=>{if(t)return t;const o=indexedDB.open(i);return o.onupgradeneeded=()=>o.result.createObjectStore(e),t=I(o),t.then(r=>{r.onclose=()=>t=void 0},()=>{t=void 0}),t};return(o,r)=>n().then(s=>r(s.transaction(e,o).objectStore(e)))}let Z;function j(){return Z||(Z=$e("keyval-store","keyval")),Z}function Ie(i,e=j()){return e("readonly",t=>I(t.get(i)))}function Ee(i,e,t=j()){return t("readwrite",n=>(n.put(e,i),I(n.transaction)))}function Pe(i,e=j()){return e("readwrite",t=>(t.delete(i),I(t.transaction)))}function Oe(i,e){return i.openCursor().onsuccess=function(){this.result&&(e(this.result),this.result.continue())},I(i.transaction)}function Ne(i=j()){return i("readonly",e=>{if(e.getAllKeys)return I(e.getAllKeys());const t=[];return Oe(e,n=>t.push(n.key)).then(()=>t)})}function De(i,e){return i.setMilliseconds(i.getMilliseconds()+e*1e3),i}class He{constructor(e){var t,n,o,r;if(this.namespace=(t=e?.namespace)!==null&&t!==void 0?t:"LocalCache",this.defaultTTL=(n=e?.defaultTTL)!==null&&n!==void 0?n:900,(!((o=e?.immediateClean)!==null&&o!==void 0)||o)&&this.cleanExpired(),!e?.disableCleaning){const s=(r=e?.cleaningInterval)!==null&&r!==void 0?r:60;setInterval(()=>{this.cleanExpired()},s*1e3)}}async set(e){var t;const n={value:e.value},o=(t=e.ttl)!==null&&t!==void 0?t:this.defaultTTL,r=De(new Date,o);n.expires=r;const s=this.getNamespacedKey(e.key);try{await Ee(s,n)}catch{}}async get(e){const t=this.getNamespacedKey(e);let n;try{n=await Ie(t)}catch{}if(!n)return;const o=new Date;if(n.expires&&n.expires<o){await this.delete(e);return}return n.value}async delete(e){const t=this.getNamespacedKey(e);try{await Pe(t)}catch{}}async cleanExpired(){const e=await this.getAllKeys();await Promise.all(e.map(async t=>this.get(t)))}async getAllKeys(){let e=[];try{e=await Ne()}catch{}const t=[];for(const r of e)typeof r=="string"&&t.push(r);return t.filter(r=>r.startsWith(this.namespace)).map(r=>this.removeNamespace(r))}getNamespacedKey(e){return`${this.namespace}-${e}`}removeNamespace(e){return e.replace(`${this.namespace}-`,"")}}class y{static isInIframe(){try{return window.self!==window.top}catch(e){return window?.Sentry?.captureException(e),!0}}static getRedirectUrl(){let e;return y.isInIframe()?e=(window.top??window).location.href:e=window.location.href,e}static goToUrl(e,t){let n;y.isInIframe()&&t?n=(window.top??window).location:n=window.location,n.href===e?n.reload():n.href=e}static isOnStreamPage(){return window.location.href.indexOf("/stream/")>-1}static getQueryParam(e){const n=window.location.search.substring(1).split("&");for(let o=0;o<n.length;o+=1){const r=n[o].split("=");if(r[0]===e)return r[1]}return $}static getBackHref(){return window.location.href.replace(/[?&]{1}(?:admin|access)=1/,"")}static formatUrl(e,t){return/^https?:/.test(t)?t:`${e}${t}`}}const C={disconnectedCallback:"IABookActions:disconnectedCallback",bookHasRenewed:"IABookActions:handleLoanAutoRenewed - book has renewed for next one hour",bookRenewFailed:"IABookActions:handleLoanRenewNow - failed to renew",browseHasExpired:"IABookActions:browseHasExpired - one-hour loan has been expired",bookWasExpired:"IABookActions:setupLendingToolbarActions - book was expired at intial, no tokenPoller",clearTokenPoller:"IABookActions:startLoanTokenPoller - clearing token poller interval",clearOneHourTimer:"IABookActions:timerCountdown - one-hour timer interval cleared",bookAccessed:"IABookActions:bookAccessed",handleLoanTokenPoller:"IABookActions:handleLoanTokenPoller",setConsecutiveLoanCounts:"IABookActions:setConsecutiveLoanCounts",actionsHandlerService:"IABookActions:actionsHandlerService"},Me="ia-book-actions";function Fe(){const{hostname:i,host:e}=window.location;return i==="localhost"||/^(www|cat)-[a-z0-9]+\.archive\.org$/.test(e)||/\.code\.archive\.org$/.test(e)||/\.dev\.archive\.org$/.test(e)||/^ia-petabox-/.test(e)||/^internetarchive/.test(e)}function E(i){const e=`[${Me}:${i}]`,t=n=>(...o)=>{Fe()&&console[n](e,...o)};return{debug:t("log"),warn:t("warn"),error:t("error")}}function be({identifier:i,action:e,extra:t={}}={}){const n={};return i&&(n.identifier=i),e&&(n.action=e),{tags:n,extra:{identifier:i,action:e,...t}}}function D(i,e){window?.Sentry?.captureMessage?.(i,be(e))}function fe(i,e){window?.Sentry?.captureException?.(i,be(e))}const H=E("service"),Ge="/services/loans/loan",ae=i=>`Unexpected response from the lending service (HTTP ${i}). Please try again.`,Ue="Could not reach the lending service. Please check your connection and try again.",We="Something went wrong handling the lending service response. Please try again.";let le=0;async function _(i){const e={success(){},error(){},...i},t=e.fetchHandler??new xe,n=new FormData;n.append("action",String(e.action)),n.append("identifier",e.identifier),le+=1;const o=`${e.action} #${le}`,r=performance.now(),s=()=>`${Math.round(performance.now()-r)}ms`;let h=!1;H.debug(`→ ${o} ${e.identifier}`);try{const u=await t.fetch(Ge,{requestInit:{method:"POST",body:n},retryConfig:Re.shared});h=!0;const v=await ze(u,e);v?.error?(H.warn(`← ${o} ${u.status} ${s()} failed`,v),e.error(v)):(H.debug(`← ${o} ${u.status} ${s()} ok`,v),e.success(v))}catch(u){fe(u,{identifier:e.identifier,action:e.action,extra:{message:`${C.actionsHandlerService} - ${e.action} ${h?"threw":"fetch failed"}`}}),H.error(`✗ ${o} ${s()} ${h?"threw":"fetch failed"}`,u),e.error({error:h?We:Ue,detail:String(u),...h?{}:{networkFailure:!0}})}}async function ze(i,e){const{status:t}=i,n=i.headers?.get("content-type")||"",o=await i.text();let r;try{r=JSON.parse(o)}catch{r=void 0}if(r===void 0)return D(`${C.actionsHandlerService} - ${e.action}: non-JSON response (HTTP ${t})`,{identifier:e.identifier,action:e.action,extra:{status:t,contentType:n,bodySnippet:o.slice(0,300)}}),{success:!1,error:ae(t),status:t,nonJsonResponse:!0};const s=r;return i.ok?s:{...s&&typeof s=="object"?s:{},success:!1,error:s?.error||ae(t),status:t}}const B={borrow:"BookReader-ReadingBorrow",browse:"BookReader-ReadingBrowse",preview:"BookReader-Preview",satisfactionMetric:"DetailsPage-Book",bookReaderHeader:"BookReader-Header",adminAccess:"Admin-Access"},N={browse:"Borrow-1Hour",browseAgain:"Borrow-Again",browseRenew:"BookRenew",browseReturn:"BookReturn",borrow:"Borrow-14Days",waitlistJoin:"JoinWaitlist",waitlistLeave:"LeaveWaitlist",doneBorrowing:"ReturnBook",login:"LogIn",purchase:"BWBPurchase",unavailable:"Book-Unavailable",printDisability:"Print-Disability",titleBar:"Book-Title-Bar"},M={browseAutoRenew:"BookAutoRenew",browseAutoReturn:"BookAutoReturn",browseManualRenew:"BookManualRenew",browseManualReturn:"BookManualReturn"};function Ve(i){return i&&decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(i).replace(/[-.+*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null}function U(i,e,t,n,o,r){return document.cookie=encodeURIComponent(i)+"="+encodeURIComponent(e)+(t?`; expires=${t.toUTCString()}`:"")+(o?`; domain=${o}`:"")+`; path=${n}`,!0}const je=E("analytics");class me{constructor(){this.gaStats={},this.lendingEventCounts=null}async storeLoanStatsCount(e,t=""){this.identifier=e;try{await this.getLoanStatsCount(t),this.sendMatrixStatsEvents(t);const n=new Date;n.setHours(n.getHours()+2),await U(this.getLoanCountStorageKey,JSON.stringify(this.lendingEventCounts),n,"/")}catch(n){je.error("storeLoanStatsCount threw",{identifier:this.identifier,action:t,error:n}),this.sendEvent("Cookies-Error-Actions",n,this.identifier)}}async getLoanStatsCount(e){const t=await Ve(this.getLoanCountStorageKey);this.lendingEventCounts=t===null?null:JSON.parse(t),this.gaStats=this.lendingEventCounts??{browse:0,renew:0,expire:0};let n=this.lendingEventCounts?.browse??0,o=this.lendingEventCounts?.renew??0,r=this.lendingEventCounts?.expire??0;switch(e){case"browse":n=n?Number(n)+1:1,this.gaStats.browse=n,o=0,r=0;break;case"autorenew":o=o?Number(o)+1:1,this.gaStats.renew=o;break;case"return":r=r?Number(r)+1:1,this.gaStats.expire=r,o=0,r=0;break}this.lendingEventCounts={browse:n,renew:o,expire:r}}sendMatrixStatsEvents(e){const t=B.browse,n=`browse${this.paddedNumber(this.gaStats?.browse)}-autorenew${this.paddedNumber(this.gaStats?.renew)}:${e}`;this.sendEvent(t,n,this.identifier)}paddedNumber(e){return e?e.toString().padStart(3,"0"):"000"}get getLoanCountStorageKey(){return`br-browse-${this.identifier}`}sendEvent(e,t,n,o){window?.archive_analytics?.send_event_no_sampling(e,t,n||this.identifier,o)}}const T=E("actions");class ye extends x{constructor(){super(),this.waitUntillBorrowComplete=6,this.loanAnanlytics=new me,this.bindEvents()}listen(e,t){this.addEventListener(e,(n=>{T.debug(`click: ${e}`,{identifier:this.identifier}),t(n)}))}bindEvents(){this.listen("browseBook",async()=>{this.handleBrowseIt(),await this.loanAnanlytics?.storeLoanStatsCount(this.identifier,"browse")}),this.listen("browseBookAgain",async()=>{this.handleBrowseIt(),await this.loanAnanlytics?.storeLoanStatsCount(this.identifier,"browseagain")}),this.listen("autoRenew",({detail:e})=>{this.handleLoanRenewNow(e?.renewType)}),this.listen("autoReturn",async()=>{this.handleReturnIt(),await this.loanAnanlytics?.storeLoanStatsCount(this.identifier,"autoreturn"),this.loanAnanlytics?.sendEvent(B.browse,N.browseReturn,M.browseAutoReturn,this.identifier)}),this.listen("returnNow",({detail:e})=>{if(e?.borrowType==="browse"&&(this.loanAnanlytics?.storeLoanStatsCount(this.identifier,"return"),this.loanAnanlytics?.sendEvent(B.browse,N.browseReturn,M.browseManualReturn,this.identifier)),this.handleReturnIt("returnNow"),e?.borrowType==="borrow"){const{category:t,action:n}=e.event;this.loanAnanlytics?.sendEvent(t,n,this.identifier)}}),this.listen("borrowBook",({detail:e})=>{this.handleBorrowIt();const{category:t,action:n}=e.event;this.loanAnanlytics?.sendEvent(t,n,this.identifier)}),this.listen("loginAndBorrow",({detail:e})=>{this.handleLoginOk();const{category:t,action:n}=e.event;this.loanAnanlytics?.sendEvent(t,n,this.identifier)}),this.listen("leaveWaitlist",({detail:e})=>{this.handleRemoveFromWaitingList();const{category:t,action:n}=e.event;this.loanAnanlytics?.sendEvent(t,n,this.identifier)}),this.listen("joinWaitlist",({detail:e})=>{this.handleReserveIt();const{category:t,action:n}=e.event;this.loanAnanlytics?.sendEvent(t,n,this.identifier)}),this.listen("purchaseBook",({detail:e})=>{const{category:t,action:n}=e.event;this.loanAnanlytics?.sendEvent(t,n,this.identifier)}),this.listen("adminAccess",({detail:e})=>{const{category:t,action:n}=e.event;this.loanAnanlytics?.sendEvent(t,n,this.identifier),this.setStickyAdminAccess(!0);const o=new URL(window.location.href);o.searchParams.append("admin","1"),window.location.search=o.search}),this.listen("exitAdminAccess",({detail:e})=>{const{category:t,action:n}=e.event;this.loanAnanlytics?.sendEvent(t,n,this.identifier),this.setStickyAdminAccess(!1)}),this.listen("bookTitleBar",({detail:e})=>{const{category:t,action:n}=e.event;this.loanAnanlytics?.sendEvent(t,n,this.identifier)})}handleBrowseIt(){const e="browse_book";this.dispatchToggleActionGroup(),_({action:e,identifier:this.identifier,fetchHandler:this.fetchHandler,success:()=>{this.setBrowseTimeSession(),this.handleReadItNow()},error:t=>{this.dispatchActionError(e,t)}})}handleLoanRenewNow(e){const t="renew_loan";_({action:t,identifier:this.identifier,fetchHandler:this.fetchHandler,success:async n=>{try{T.debug("renew_loan succeeded",{identifier:this.identifier,data:n});const o=n.loan?n.loan:void 0,r=o?.renewal;if(o&&r){await this.setBrowseTimeSession(),await this.loanAnanlytics?.storeLoanStatsCount(this.identifier,"autorenew");const s=e==="auto"?M.browseAutoRenew:M.browseManualRenew;this.loanAnanlytics?.sendEvent(B.browse,N.browseRenew,s,this.identifier),this.dispatchEvent(new CustomEvent("loanAutoRenewed",{detail:{action:t,data:{...n,loan:o}}}));return}T.warn("renew_loan answered without a renewal",{identifier:this.identifier,isRenewal:r,activeLoan:o,data:n}),D(`${C.bookRenewFailed} - no loan active`,{identifier:this.identifier,action:t,extra:{response:JSON.stringify(n)}}),this.dispatchActionError(t,{data:n,error:!0,message:"Loan renewal failed: no loan active."})}catch(o){T.error("renew_loan success handler threw",{identifier:this.identifier,error:o}),fe(o,{identifier:this.identifier,action:t,extra:{message:`${C.bookRenewFailed} - threw`}}),this.dispatchActionError(t,{data:n,error:!0,message:`Loan renewal failed: ${o}`})}},error:n=>{this.dispatchActionError(t,n)}})}handleReturnIt(e=""){const t="return_loan";e==="returnNow"&&this.dispatchToggleActionGroup(),_({action:t,identifier:this.identifier,fetchHandler:this.fetchHandler,success:()=>{this.deleteLoanCookies(),e==="returnNow"&&y.goToUrl(this.returnUrl,!0)},error:n=>{this.dispatchActionError(t,n)}})}handleBorrowIt(){const e="borrow_book";this.dispatchToggleActionGroup(),_({action:e,identifier:this.identifier,fetchHandler:this.fetchHandler,success:()=>{this.handleReadItNow()},error:t=>{this.dispatchActionError(e,t)}})}handleReserveIt(){const e="join_waitlist";this.dispatchToggleActionGroup(),_({action:e,identifier:this.identifier,fetchHandler:this.fetchHandler,success:()=>{y.goToUrl(y.getRedirectUrl(),!0)},error:t=>{this.dispatchActionError(e,t)}})}handleRemoveFromWaitingList(){const e="leave_waitlist";this.dispatchToggleActionGroup(),_({action:e,identifier:this.identifier,fetchHandler:this.fetchHandler,success:()=>{y.goToUrl(y.getRedirectUrl(),!0)},error:t=>{this.dispatchActionError(e,t)}})}dispatchActionError(e,t={}){this.loanAnanlytics?.sendEvent("LendingServiceError",e),this.dispatchEvent(new CustomEvent("lendingActionError",{detail:{action:e,data:t}}))}dispatchToggleActionGroup(){this.dispatchEvent(new CustomEvent("toggleActionGroup"))}handleLoginOk(){const e=`/account/login?referer=${encodeURIComponent(y.getRedirectUrl())}`;y.goToUrl(e,!0)}handleReadItNow(e){const t=new URLSearchParams(window.location.search);if(e){const s=new URLSearchParams(e);for(const[h,u]of s.entries())t.append(h,u)}const n=t.toString(),o=n?`?${n}`:"",r=window.location.origin+window.location.pathname+o;setTimeout(()=>{y.goToUrl(r,!0)},this.waitUntillBorrowComplete*1e3)}async setBrowseTimeSession(){try{const e=new Date(new Date().getTime()+this.loanTotalTime*1e3);T.debug("setBrowseTimeSession: resetting loanTime",{identifier:this.identifier,expireDate:e,loanTotalTime:this.loanTotalTime}),await this.localCache.set({key:`${this.identifier}-loanTime`,value:e,ttl:Number(this.loanTotalTime)}),await this.localCache.delete(`${this.identifier}-pageChangedTime`),T.debug("setBrowseTimeSession: loanTime reset complete",{identifier:this.identifier})}catch(e){T.error("setBrowseTimeSession failed",{identifier:this.identifier,error:e})}}deleteLoanCookies(){T.debug("deleteLoanCookies: expiring loan cookies",{identifier:this.identifier});const e=new Date;e.setTime(e.getTime()-1440*60*1e3),U(`loan-${this.identifier}=""`,"",e,"/",".archive.org"),U(`br-loan-${this.identifier}=""`,"",e,"/",".archive.org")}setStickyAdminAccess(e){const t=window.location.hostname==="localhost"?"localhost":".archive.org",n=new Date(Date.now()+720*60*60*1e3);U("sticky-admin-access",e,n,"/",t)}}const ce=d`var(--white, #fff)`,qe=d`var(--primaryDisableCTAFill, #767676)`,Ke=d`var(--secondaryCTABorder, #999)`,Je=d`var(--primaryCTAFill, #194880)`,X=d`var(--primaryCTAFillRGB, 25, 72, 128)`,Ze=d`var(--primaryCTABorder, #c5d1df)`,Xe=d`var(--primaryErrorCTAFill, #d9534f)`,Y=d`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,Ye=d`var(--primaryErrorCTABorder, #d43f3a)`,Qe=d`var(--secondaryCTAFill, #333)`,Q=d`var(--secondaryCTAFillRGB, 51, 51, 51)`,et=d`var(--primaryCTABorder, #979797)`,tt=d`#ee8950`,it=d`#ec7939`,nt=d`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${ce};
    line-height: normal;
    border-radius: 0.4rem;
    font-size: 1.4rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border: 1px solid transparent;
    white-space: nowrap;
    appearance: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition: all 0.1s ease 0s;
    vertical-align: middle;
    padding: 0 1rem;
    outline-color: ${ce};
    outline-offset: -4px;
    user-select: none;
    text-decoration: none;
    width: fit-content;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
  }
  .ia-button:focus-visible {
    outline-style: double;
  }
  .ia-button:disabled {
    cursor: not-allowed;
    background-color: ${qe};
    border: 1px solid ${Ke};
  }
  .ia-button.transparent {
    background-color: transparent;
  }
  .ia-button.warning {
    background-color: ${tt}
    border-color: ${it};
  }

  .ia-button.primary {
    background-color: ${Je};
    border-color: ${Ze};
  }
  .ia-button.primary:hover {
    background-color: rgba(${X}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${X}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${X}, 0.7);
  }

  .ia-button.danger {
    background-color: ${Xe};
    border-color: ${Ye};
  }
  .ia-button.danger:hover {
    background-color: rgba(${Y}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${Y}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${Y}, 0.7);
  }

  .ia-button.dark {
    background-color: ${Qe};
    border-color: ${et};
  }
  .ia-button.dark:hover {
    background-color: rgba(${Q}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${Q}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${Q}, 0.7);
  }
`,S=d`var(--white, #fff)`,de=d`var(--primaryBGColor, #000)`,ot=d`var(--iaBookActionsDropdownBGColor, #2d2d2d)`,rt=d`
  :host {
    display: inline-flex;
    height: 3.5rem;
    padding: 1rem 0;
  }
  .actiongroup {
    display: flex;
    margin-right: 10px;
  }
  .action-buttons {
    display: inline-flex;
    align-items: center;
  }
  .action-buttons .ia-button {
    margin: 0;
    height: 3.5rem;
    padding: 0 2rem;
  }
  .action-buttons .desktop {
    background-color: ${S};
    border-radius: 10px;
  }
  .action-buttons .desktop.purchase {
    margin-left: 5px;
  }
  .action-buttons .mobile.purchase.dark {
    padding-left: 0;
  }
  .primary {
    background-color: ${S};
    margin-right: 4px;
  }
  .primary,
  .secondary {
    position: relative;
    border-radius: 5px;
  }
  .primary .initial {
    border-radius: 4px 0 0 4px;
    margin-right: 0;
  }
  .primary svg {
    vertical-align: middle;
  }

  .secondary .ia-button.purchase {
    padding: 2px 10px 2px 35px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .secondary .ia-button.exit-admin {
    background-color: ${de};
    border: 1px solid ${S};
  }

  .dropdown-content {
    position: absolute;
    min-width: 14rem;
    margin: 0;
    padding: 0;
    background: ${ot};
    border-radius: 4px;
    border: 1px solid var(--primaryCTABorder);
    top: 3.4rem;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .dropdown-content li {
    color: ${de};
    list-style: none;
    height: 3rem;
  }
  .dropdown-content .ia-button {
    background: none;
    color: ${S};
    border: none;
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    height: 3rem;
    position: relative;
    padding: 0.6rem 1.2rem;
    margin: 0;
  }
  .dropdown-content .ia-button:is(:focus-visible, :hover) {
    background: unset;
  }
  .dropdown-content li .ia-button {
    border-radius: 0;
  }
  .dropdown-content li .ia-button:hover {
    background: ${S};
    color: rgb(45, 45, 45);
  }
  .dropdown-content li:first-child .ia-button {
    border-radius: 0.3rem 0.3rem 0 0;
  }
  .dropdown-content li:last-child .ia-button {
    border-radius: 0;
    border-radius: 0 0 0.3rem 0.3rem;
  }
  .dropdown-content .purchase:hover svg g {
    fill: black;
  }
  .dropdown-content .purchase {
    padding-left: 35px;
    margin: 0;
  }
  .dropdown-content .purchase small {
    display: initial;
    font-size: 1.4rem;
  }

  .ia-button.down-arrow {
    border-radius: 0 0.4rem 0.4rem 0;
    padding: 0 0.6rem;
    margin-left: 0;
  }
  .actionloader {
    vertical-align: middle;
    visibility: hidden;
    padding: 0.9rem 0.2rem;
  }
  .close {
    display: none;
  }
  .open {
    display: block;
    z-index: 2;
  }
  .visible {
    display: inline-block;
  }
  .btn:hover,
  .dropdown:hover .btn {
    background-color: ${S};
  }
  a {
    text-decoration: none;
  }
  .purchase small {
    display: block;
    font-size: 1rem;
  }
  .purchase svg {
    position: absolute;
    left: 10px;
    top: 20%;
  }
  .unavailable {
    opacity: 0.7;
    pointer-events: none;
  }
  .disabled {
    opacity: 0.8;
    pointer-events: none;
    visibility: visible;
  }
`,he=700,st=800,at=l`<svg
  height="20"
  viewBox="0 0 75 75"
  width="20"
  xmlns="http://www.w3.org/2000/svg"
>
  <g fill="#fff" fill-rule="evenodd" transform="translate(0 13.736264)">
    <path
      d="m22.8463837 18.2119173c6.5756797.1478113 10.585751 1.8020104 13.0298545 3.5887422l3.9291669 17.6234408c-4.8169735 1.3742664-9.2153954 4.1561307-12.6728799 7.9003587-5.9346575-9.1046945-13.627732-14.2752618-26.92576083-19.445829l.0576431-.0724863.08436419-.1026121c1.1105031-1.331793 8.72437099-9.8023542 22.49761204-9.4916143z"
    />
    <path
      d="m74.9439846 1.1046788c-8.1318682 11.7830147-14.8351649 24.4553135-17.2527473 38.4615385-2.8571429-1.0004447-5.9340659-1.5562473-9.1208791-1.5562473-1.3812656 0-2.7625312.1317192-4.0892393.3399693l-2.9788221-18.0144913c6.444022-11.67552841 19.228784-18.40456144 32.9707606-19.20539059z"
    />
    <path
      d="m36.8571258 21.719357 3.6273911-.8052884 2.5793903 17.8073684c-.7020757.1150413-1.4041514.2300825-2.1062271.4601649z"
    />
    <path
      d="m70.1594803.55538282c-13.7069528 2.06173881-23.764449 8.35192747-29.6753948 19.07620888l-.2624906.5200262-3.7425669.8013234c-2.8059684-1.7413364-5.5070193-3.8778459-12.5979079-4.0336896-7.5995702-.1676376-12.2045639 1.9616824-16.46353768 3.7996974l.57415955-.5673312c4.03313533-3.936109 8.45564043-7.3737923 14.98104763-8.4391649 4.9512458-.776666 10.8981852.1535901 14.8163388 6.4911269.6044492-19.13367701 23.3058132-18.5735241 32.3703519-17.64819708z"
    />
  </g>
</svg>`,lt=l`<svg
  height="4"
  viewBox="0 0 8 4"
  width="8"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
    fill="#fff"
  />
</svg>`,ee=l`<svg
  height="4"
  viewBox="0 0 8 4"
  width="8"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
    fill="#fff"
  />
</svg>`;var ct=Object.defineProperty,dt=Object.getOwnPropertyDescriptor,f=(i,e,t,n)=>{for(var o=n>1?void 0:n?dt(e,t):e,r=i.length-1,s;r>=0;r--)(s=i[r])&&(o=(n?s(e,t,o):s(o))||o);return n&&o&&ct(e,t,o),o};let b=class extends ye{constructor(){super(...arguments),this.userid="",this.identifier="",this.primaryActions=[],this.secondaryActions=[],this.primaryColor="",this.dropdownState="close",this.width=0,this.hasAdminAccess=!1,this.dropdownArrow=ee,this.disabled=!1,this.returnUrl="",this.autoRenew=!1,this.loanRenewType="",this.autoReturn=!1,this.returnNow=!1,this.loaderIcon="https://archive.org/upload/images/tree/loading.gif",this.initialButton=!1}updated(i){(i.has("width")||i.has("disabled"))&&this.isBelowTabletContainer&&this.resetActions(),i.has("autoRenew")&&this.autoRenew&&this.dispatchLoanEvent("autoRenew",{renewType:this.loanRenewType});const e=i.has("autoReturn")&&this.autoReturn;e&&this.dispatchLoanEvent("autoReturn"),i.has("returnNow")&&this.returnNow&&!e&&this.dispatchLoanEvent("returnNow",{borrowType:"browse"})}dispatchLoanEvent(i,e){this.dispatchEvent(new CustomEvent(i,{detail:e}))}resetActions(){this.primaryActions.length&&(this.primaryActions=this.primaryActions.concat(this.secondaryActions),this.primaryColor=this.primaryActions[0].className,this.hasAdminAccess&&this.sortActionButtonOrder(),this.secondaryActions=[])}sortActionButtonOrder(){let i=1;const e=0;this.secondaryActions.length===2&&(i=2),i=this.primaryActions.length-i;const t=this.primaryActions[i],n=this.primaryActions;n.splice(i,1),n.splice(e,0,t),this.primaryActions=n}render(){return l`
      <div
        class="${se({actiongroup:!0,disabled:this.disabled})}"
      >
        ${this.getLoaderIcon}
        <section class="action-buttons primary">
          ${this.renderPrimaryActions}
        </section>
        <section class="action-buttons secondary">
          ${this.renderSecondaryActions}
        </section>
      </div>
    `}get renderPrimaryActions(){return this.primaryActions.length===0?$:(this.dropdownState==="close"&&(this.primaryColor=this.primaryActions[0].className),this.primaryActions.length===1?this.initialActionTemplate:l`
      ${this.initialActionTemplate}
      <button
        class="ia-button ${this.primaryColor} down-arrow"
        @click=${this.toggleDropdown}
      >
        ${this.dropdownArrow}
      </button>

      <ul class="dropdown-content ${this.dropdownState}">
        ${this.getPrimaryItems}
      </ul>
    `)}get renderSecondaryActions(){return this.secondaryActions.length?this.secondaryActions.map(i=>this.renderActionButton(i)):$}renderActionLink(i,e=!1){return l`<span class="${this.getDeviceType} ${i.className}">
      <a
        class="ia-button ${i.className} ${e?"initial":""}"
        href="${i.url}"
        target=${i.target}
        @click=${()=>{this.clickHandler(i.id,i.analyticsEvent,i?.borrowType)}}
      >
        ${i.id==="purchaseBook"?at:""} ${i.text}
        <small>${i.subText}</small>
      </a>
    </span>`}renderActionButton(i,e=!1){if(i.url)return this.renderActionLink(i,e);const{analyticsEvent:t}=i;return l`<button
      class="ia-button ${i.className} ${e?"initial":""}"
      @click=${()=>{this.clickHandler(i.id,t,i?.borrowType)}}
    >
      ${i.text}
    </button>`}clickHandler(i,e,t=""){if(this.dropdownState="close",this.dropdownArrow=ee,!e||!i)return;const{category:n,action:o}=e;this.dispatchEvent(new CustomEvent(i,{detail:{event:{category:n,action:o},borrowType:t}}))}get initialActionTemplate(){return this.initialButton=!1,this.primaryActions.length>1&&(this.initialButton=!0),this.renderActionButton(this.primaryActions[0],this.initialButton)}get getPrimaryItems(){return this.primaryActions.slice(1).map(i=>l`<li>${this.renderActionButton(i,this.initialButton)}</li>`)}get getLoaderIcon(){return l`<img
      class="${se({actionloader:!0,disabled:this.disabled})}"
      alt=""
      src="${this.loaderIcon}"
    />`}get isBelowTabletContainer(){return this.width<=st}get getDeviceType(){return this.isBelowTabletContainer?"mobile":"desktop"}toggleDropdown(){this.dropdownState==="open"?(this.dropdownState="close",this.dropdownArrow=ee,this.primaryColor=this.primaryActions[0].className):(this.dropdownState="open",this.dropdownArrow=lt,this.primaryColor="dark")}static get styles(){return[nt,rt]}};f([a({type:String})],b.prototype,"userid",2);f([a({type:String})],b.prototype,"identifier",2);f([a({type:Array})],b.prototype,"primaryActions",2);f([a({type:Array})],b.prototype,"secondaryActions",2);f([a({type:String})],b.prototype,"primaryColor",2);f([a({type:String})],b.prototype,"dropdownState",2);f([a({type:Number})],b.prototype,"width",2);f([a({type:Boolean})],b.prototype,"hasAdminAccess",2);f([a({attribute:!1})],b.prototype,"dropdownArrow",2);f([a({type:Boolean})],b.prototype,"disabled",2);f([a({type:String})],b.prototype,"returnUrl",2);f([a({type:Boolean})],b.prototype,"autoRenew",2);f([a({type:String})],b.prototype,"loanRenewType",2);f([a({type:Boolean})],b.prototype,"autoReturn",2);f([a({type:Boolean})],b.prototype,"returnNow",2);f([a({type:String})],b.prototype,"loaderIcon",2);b=f([R("ia-book-actions-collapsible-action-group")],b);const ht=l`
  <svg
    class="ia-logo"
    width="26"
    height="26"
    viewBox="0 0 27 30"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="logoTitleID logoDescID"
  >
    <title id="logoTitleID">Internet Archive logo</title>
    <desc id="logoDescID">
      A line drawing of the Internet Archive headquarters building façade.
    </desc>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <mask id="mask-2" fill="white">
        <path
          d="M26.6666667,28.6046512 L26.6666667,30 L0,30 L0.000283687943,28.6046512 L26.6666667,28.6046512 Z M25.6140351,26.5116279 L25.6140351,28.255814 L1.05263158,28.255814 L1.05263158,26.5116279 L25.6140351,26.5116279 Z M3.62469203,7.6744186 L3.91746909,7.82153285 L4.0639977,10.1739544 L4.21052632,13.9963932 L4.21052632,17.6725617 L4.0639977,22.255044 L4.03962296,25.3421929 L3.62469203,25.4651163 L2.16024641,25.4651163 L1.72094074,25.3421929 L1.55031755,22.255044 L1.40350877,17.6970339 L1.40350877,14.0211467 L1.55031755,10.1739544 L1.68423854,7.80887484 L1.98962322,7.6744186 L3.62469203,7.6744186 Z M24.6774869,7.6744186 L24.9706026,7.82153285 L25.1168803,10.1739544 L25.2631579,13.9963932 L25.2631579,17.6725617 L25.1168803,22.255044 L25.0927809,25.3421929 L24.6774869,25.4651163 L23.2130291,25.4651163 L22.7736357,25.3421929 L22.602418,22.255044 L22.4561404,17.6970339 L22.4561404,14.0211467 L22.602418,10.1739544 L22.7369262,7.80887484 L23.0420916,7.6744186 L24.6774869,7.6744186 Z M9.94042303,7.6744186 L10.2332293,7.82153285 L10.3797725,10.1739544 L10.5263158,13.9963932 L10.5263158,17.6725617 L10.3797725,22.255044 L10.3556756,25.3421929 L9.94042303,25.4651163 L8.47583122,25.4651163 L8.0362015,25.3421929 L7.86556129,22.255044 L7.71929825,17.6970339 L7.71929825,14.0211467 L7.86556129,10.1739544 L8.00005604,7.80887484 L8.30491081,7.6744186 L9.94042303,7.6744186 Z M18.0105985,7.6744186 L18.3034047,7.82153285 L18.449948,10.1739544 L18.5964912,13.9963932 L18.5964912,17.6725617 L18.449948,22.255044 L18.425851,25.3421929 L18.0105985,25.4651163 L16.5460067,25.4651163 L16.1066571,25.3421929 L15.9357367,22.255044 L15.7894737,17.6970339 L15.7894737,14.0211467 L15.9357367,10.1739544 L16.0702315,7.80887484 L16.3753664,7.6744186 L18.0105985,7.6744186 Z M25.6140351,4.53488372 L25.6140351,6.97674419 L1.05263158,6.97674419 L1.05263158,4.53488372 L25.6140351,4.53488372 Z M13.0806755,0 L25.9649123,2.93331338 L25.4484139,3.8372093 L0.771925248,3.8372093 L0,3.1041615 L13.0806755,0 Z"
          id="path-1"
        ></path>
      </mask>
      <use fill="#FFFFFF" xlink:href="#path-1"></use>
      <g mask="url(#mask-2)" fill="#FFFFFF">
        <path
          d="M0,0 L26.6666667,0 L26.6666667,30 L0,30 L0,0 Z"
          id="swatch"
        ></path>
      </g>
    </g>
  </svg>
`;var ut=Object.defineProperty,gt=Object.getOwnPropertyDescriptor,ne=(i,e,t,n)=>{for(var o=n>1?void 0:n?gt(e,t):e,r=i.length-1,s;r>=0;r--)(s=i[r])&&(o=(n?s(e,t,o):s(o))||o);return n&&o&&ut(e,t,o),o};let W=class extends ye{constructor(){super(...arguments),this.identifier="",this.bookTitle="",this.analyticsCategories=B,this.analyticsActions=N}clickHandler(){const{category:i,action:e}={category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.titleBar};this.dispatchEvent(new CustomEvent("bookTitleBar",{detail:{event:{category:i,action:e}}}))}render(){return l`
      <a
        class="embed-link"
        @click=${()=>{this.clickHandler()}}
        href="/details/${this.identifier}"
      >
        <span>${ht}</span>
        <span class="title">${this.bookTitle}</span>
      </a>
    `}static get styles(){return d`
      :host {
        padding: 0 10px;
        height: 3.4rem;
        display: flex;
      }
      .embed-link {
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        color: var(--primaryTextColor, #fff);
        font-size: 1.4rem;
      }
      .embed-link .title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-align: left;
        line-height: initial;
      }
      .embed-link svg {
        margin-right: 0.5rem;
        display: block;
      }
      .embed-link:hover {
        text-decoration: underline;
      }
    `}};ne([a({type:String})],W.prototype,"identifier",2);ne([a({type:String})],W.prototype,"bookTitle",2);W=ne([R("ia-book-actions-title-bar")],W);var pt=Object.defineProperty,wt=Object.getOwnPropertyDescriptor,oe=(i,e,t,n)=>{for(var o=n>1?void 0:n?wt(e,t):e,r=i.length-1,s;r>=0;r--)(s=i[r])&&(o=(n?s(e,t,o):s(o))||o);return n&&o&&pt(e,t,o),o};let z=class extends x{constructor(){super(...arguments),this.texts="",this.textClass=""}render(){return l`
      <span class="variable-texts ${this.textClass}">${this.texts}</span>
    `}static get styles(){return d`
      :host {
        display: inline-block;
      }
      .variable-texts {
        margin-right: 10px;
        vertical-align: middle;
        font-size: 1.7rem;
      }
      .hidden {
        display: none;
      }
      .visible {
        display: inline-block;
      }
    `}};oe([a({type:String})],z.prototype,"texts",2);oe([a({type:String})],z.prototype,"textClass",2);z=oe([R("ia-book-actions-text-group")],z);const bt=l`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="m0 0h100v100h-100z" fill="#000"/>
    <path d="m49.8315487 0h.1702245c6.7356878 0 13.1853038 1.31117332 19.3488483 3.93351997 6.1635444 2.62234664 11.4854233 6.15778963 15.9656369 10.60632903 4.4802135 4.4485394 8.0478347 9.7522946 10.7028636 15.9112655 2.655029 6.1589709 3.980878 12.6038012 3.9789971 19.3344909.0567419 6.6716279-1.1702933 13.0585776-3.6811042 19.1608491-2.510811 6.1022715-6.106803 11.5206067-10.7879759 16.2550055-9.7027949 9.7522946-21.4884754 14.6851412-35.3570414 14.79854h-.1702244c-6.7333236 0-13.1829397-1.3111733-19.3488483-3.93352-6.1659087-2.6223466-11.4877876-6.1577896-15.9656369-10.606329s-8.04547055-9.7522946-10.7028637-15.9112655c-2.65739314-6.1589709-3.9844243-12.6038012-3.98254337-19.3344909-.05674149-6.6716279 1.17029325-13.0585776 3.68110421-19.1608491 2.51081095-6.1022715 6.10680292-11.5206067 10.78797586-16.2550055 9.7027949-9.75229456 21.4884754-14.68514123 35.3570414-14.79854zm12.6566146 26.4757998c1.6745578-1.6828001 2.5118367-3.6747334 2.5118367-5.9757998 0-2.4126333-.8095238-4.4324583-2.4285714-6.059475s-3.6289796-2.440525-6.0297959-2.440525c-2.4008164 0-4.4107483.8135083-6.029796 2.440525-1.6745578 1.6270167-2.5118367 3.6468417-2.5118367 6.059475 0 2.1871753.8372789 4.1791086 2.5118367 5.9757998 1.6745579 1.6828001 3.6844898 2.5242002 6.029796 2.5242002 2.3453061 0 4.3274829-.8414001 5.9465306-2.5242002zm-12.1370589 52.7776981-1.2815282-.9486968c0-.4588935.398855-1.8938272 1.196565-4.3048011l12.7338588-39-23.0745876 3.6164609.2548896 3.873251c0-.1141289.4554971-.1997256 1.3664914-.2567901.9109942 0 1.623741.1723823 2.1382404.5171468.5121392.2306356.7965299.6039323.8531721 1.1198902 0 .8607225-.6549247 3.2134431-1.9647739 7.0581619l-8.1175252 24.1061729c-1.0242785 3.2716963-1.5080967 5.5388203-1.4514546 6.8013717.0566421 1.6643804.8826732 2.9839963 2.4780932 3.9588477 1.2532071.803658 2.8769482 1.205487 4.8712231 1.205487h.5982825c1.7653464-.0570645 3.8445846-.3875629 6.2377146-.9914952 2.3931299-.6039323 4.3590839-1.3933242 5.8978617-2.3681756 1.3098493-.803658 2.3919499-1.5359853 3.2463021-2.1969821.8543521-.6609968 1.3959925-1.1341564 1.6249211-1.4194788l.3433929-.3459533-2.8214861-3.3596708-2.9914125 2.0650205c-.79771.4588935-1.5104568.7454047-2.1382404.8595337z" class="fill-color" fill="#fff" fill-rule="nonzero"/>
</svg>
`;class ft extends x{static get styles(){return d`
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
    `}render(){return bt}}customElements.define("ia-icon-info",ft);var mt=Object.defineProperty,yt=Object.getOwnPropertyDescriptor,ve=(i,e,t,n)=>{for(var o=n>1?void 0:n?yt(e,t):e,r=i.length-1,s;r>=0;r--)(s=i[r])&&(o=(n?s(e,t,o):s(o))||o);return n&&o&&mt(e,t,o),o};let ie=class extends x{constructor(){super(...arguments),this.iconClass="",this.helpURL="https://help.archive.org/help/borrowing-from-the-lending-library"}render(){return l`
      <a
        class="more-info-icon ${this.iconClass}"
        href=${this.helpURL}
        target="_blank"
        title=${c("Get more info on borrowing from The Lending Library")}
        data-event-click-tracking="BookReader|BrowsableMoreInfo"
      >
        <ia-icon-info></ia-icon-info>
      </a>
    `}static get styles(){return d`
      ia-icon-info {
        display: inline-block;
        width: 18px;
        height: 20px;
        vertical-align: middle;
        --iconFillColor: white;
      }
      .more-info-icon img {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        background: white;
      }
      .hidden {
        display: none;
      }
      .visible {
        display: inline-block;
      }
    `}};ve([a({type:String})],ie.prototype,"iconClass",2);ie=ve([R("ia-book-actions-info-icon"),Se()],ie);var vt=Object.defineProperty,At=Object.getOwnPropertyDescriptor,re=(i,e,t,n)=>{for(var o=n>1?void 0:n?At(e,t):e,r=i.length-1,s;r>=0;r--)(s=i[r])&&(o=(n?s(e,t,o):s(o))||o);return n&&o&&vt(e,t,o),o};let V=class extends x{constructor(){super(...arguments),this.secondsLeftOnLoan=0,this.displayTime=!1}get minutesLeftOnLoan(){const i=Math.ceil(Math.round(this.secondsLeftOnLoan)/60);return i<10?`0:0${i}`:i===60?"1:00":`0:${i}`}get remainingTime(){return`${this.minutesLeftOnLoan} minutes`}render(){const i=this.displayTime?"view":"hide";return l`
      <button
        id="timer-counter"
        class=${i}
        @click=${()=>{this.displayTime=!this.displayTime}}
        role="timer"
      >
        <span>${this.minutesLeftOnLoan} - </span>
        <span class="second">${Number(this.secondsLeftOnLoan)}</span>
        <span class="sr-only">${this.remainingTime} left</span>
      </button>
    `}static get styles(){return d`
      :host {
        right: 0;
        margin-right: 10px;
        position: absolute;
      }

      .sr-only {
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        margin: 0;
        padding: 0;
        border: none;
        overflow: hidden;
      }

      button#timer-counter {
        cursor: pointer;
      }

      .hide {
        opacity: 0;
      }

      .show {
        opacity: 1;
      }
    `}};re([a({type:Number})],V.prototype,"secondsLeftOnLoan",2);re([a({type:Boolean})],V.prototype,"displayTime",2);V=re([R("ia-book-actions-timer-countdown")],V);window.IALendingIntervals={tokenPoller:0,timerCountdown:0,browseExpireTimeout:0,clearTokenPoller:()=>{window.clearInterval(window.IALendingIntervals.tokenPoller),window.IALendingIntervals.tokenPoller=0},clearTimerCountdown:()=>{window.clearInterval(window.IALendingIntervals.timerCountdown),window.IALendingIntervals.timerCountdown=0},clearBrowseExpireTimeout:()=>{window.clearTimeout(window.IALendingIntervals.browseExpireTimeout),window.IALendingIntervals.browseExpireTimeout=0},clearAll:()=>{window?.IALendingIntervals?.clearTokenPoller(),window?.IALendingIntervals?.clearTimerCountdown(),window?.IALendingIntervals?.clearBrowseExpireTimeout()}};class Ct{constructor(e,t,n={},o=""){this.printDisabilityLink="/details/printdisabled?tab=about",this.analyticsCategories=B,this.analyticsActions=N,this.userid=e,this.identifier=t,this.lendingStatus=n,this.bwbPurchaseUrl=o}firstBrowseConfig(){return{id:"browseBook",text:c("Borrow"),className:"primary",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.browse}}}browseAgainConfig(){return{id:"browseBookAgain",text:c("Borrow"),className:"primary",analyticsEvent:{category:this.analyticsCategories.browse,action:this.analyticsActions.browseAgain}}}returnBookConfig(){const e=this.lendingStatus.user_has_browsed?this.analyticsCategories.browse:this.analyticsCategories.borrow;return{id:"returnNow",text:c("Return now"),className:"danger",analyticsEvent:{category:e,action:this.analyticsActions.doneBorrowing},borrowType:this.lendingStatus.user_has_browsed?"browse":"borrow"}}borrowBookConfig(e=!1){return!this.lendingStatus.available_to_borrow&&!this.lendingStatus.user_is_printdisabled||this.lendingStatus.user_has_borrowed?null:{id:"borrowBook",text:c("Borrow for 14 days"),className:"primary",disabled:e,analyticsEvent:{category:this.lendingStatus.user_has_browsed?this.analyticsCategories.browse:this.analyticsCategories.preview,action:this.analyticsActions.borrow}}}loginAndBorrowBookConfig(){return{id:"loginAndBorrow",text:c("Log In and Borrow"),className:"primary",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.login}}}leaveWaitlistConfig(){return{id:"leaveWaitlist",text:c("Leave Waitlist"),className:"dark",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.waitlistLeave}}}loginAndWaitlistConfig(){return{id:"loginAndWaitlist",text:c("Log In and Join Waitlist"),className:"warning",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.login}}}waitlistConfig(){const e=!!this.userid,t=this.lendingStatus||{};return!t.available_to_waitlist||t.available_to_borrow?null:e?{id:"joinWaitlist",text:c("Join Waitlist"),className:"warning",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.waitlistJoin}}:this.loginAndWaitlistConfig()}purchaseConfig(){return this.bwbPurchaseUrl?{id:"purchaseBook",text:c("Purchase at "),subText:"Better World Books",title:c("Purchase"),url:this.bwbPurchaseUrl,target:"_blank",className:"purchase dark",analyticsEvent:{category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.purchase}}:null}printDisabilityConfig(){return this.lendingStatus.user_is_printdisabled?null:{id:"printDisability",text:c("Print Disability Access"),title:c("Print Disability Access"),url:this.printDisabilityLink,target:"_self",className:"print-disability",analyticsEvent:{category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.printDisability}}}adminAccessConfig(){return this.lendingStatus.user_has_borrowed||!this.lendingStatus.isAdmin?null:{id:"adminAccess",text:c("Admin Access"),title:c("You have administrative privileges to read this book"),className:"danger",analyticsEvent:{category:this.analyticsCategories.adminAccess,action:this.analyticsActions.borrow}}}adminOrPrintDisabledExitConfig(){return{id:"exitAdminAccess",text:y.getQueryParam("admin")==="1"?c("← Exit admin access mode"):c("← Exit print-disabled access mode"),url:y.getBackHref(),target:"_self",className:"exit-admin",analyticsEvent:{category:this.analyticsCategories.adminAccess,action:this.analyticsActions.doneBorrowing}}}unavailableBookConfig(){return{id:"borrowUnavailable",text:c("Borrow Unavailable"),className:"primary unavailable",disabled:!0,analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.unavailable}}}isEmbed(e){return{primaryTitle:`<img src=/images/glogo-jw.png> <a href=/details/${this.identifier}>${e}</a>`,primaryActions:[],primaryColor:""}}}const m={get available_1hr(){return c("Renews automatically with continued use.")},get available_14d(){return c("This book can be borrowed for 14 days.")},get available_pd(){return c("Book available to patrons with print disabilities.")},get available_waitlist(){return c("A waitlist is available.")},get admin_access(){return c("You have administrative privileges to read this book.")},get claim_waitlist(){return c("You are at the top of the waitlist for this book.")},get being_borrowed(){return c("Another patron is using this book. Please check back later.")},get eligible_pd(){return c("You are eligible for print-disabled access.")},get on_waitlist(){return c("You are on the waitlist for this book.")},get session_expired(){return c("Renews automatically with continued use.")},get unavailable(){return c("This book is not available at this time.")}};function ue(i,e){return i!==void 0&&e!==void 0&&i>=e}class kt{constructor(e,t,n,o){this.userid=e,this.identifier=t,this.lendingStatus=n,this.bwbPurchaseUrl=o,this.actionsConfig=new Ct(this.userid,this.identifier,this.lendingStatus,this.bwbPurchaseUrl)}onlyAdminAction(){return{primaryTitle:m.admin_access,primaryActions:[],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}adminOrPrintDisabledReadingAction(){return{primaryTitle:"",primaryActions:[],secondaryActions:[this.actionsConfig.adminOrPrintDisabledExitConfig()],borrowType:"adminBorrowed"}}patronIsReadingAction(){const e=this.lendingStatus||{},t=ue(e.loanCount,e.maxLoans);let n="";const o=e.user_has_browsed&&!e.browsingExpired;return o?n=m.available_1hr:n=c(Le`Your loan of this book has ${e.daysLeftOnLoan} days left.`),{primaryTitle:n,primaryActions:[this.actionsConfig.returnBookConfig(),this.actionsConfig.borrowBookConfig(t),this.actionsConfig.waitlistConfig(),this.actionsConfig.printDisabilityConfig()],primaryColor:"danger",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()],borrowType:o?"browsed":"borrowed"}}claimWaitlistAction(){const e=this.lendingStatus||{},t=this.actionsConfig.leaveWaitlistConfig(),n=this.actionsConfig.borrowBookConfig(),o=e.available_to_browse?this.actionsConfig.firstBrowseConfig():null,r=[n];return o&&r.push(o),r.push(t),{primaryTitle:m.claim_waitlist,primaryActions:r,primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrowPrintDisabledAction(){return{primaryTitle:m.eligible_pd,primaryActions:[this.actionsConfig.borrowBookConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}onlyPrintDisabledAction(){const e=this.lendingStatus.isAdmin?null:this.actionsConfig.unavailableBookConfig();return{primaryTitle:m.available_pd,primaryActions:[e],primaryColor:"primary",secondaryActions:[]}}onWaitlistAction(){return{primaryTitle:m.on_waitlist,primaryActions:[this.actionsConfig.leaveWaitlistConfig(),this.actionsConfig.firstBrowseConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}restrictedAction(){const e=this.lendingStatus||{};return{primaryTitle:e.max_browsable_copies&&!e.available_lendable_copies?m.being_borrowed:m.unavailable,primaryActions:[this.actionsConfig.unavailableBookConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}loggedOutOptions(){const e=this.lendingStatus||{},t=!e.available_to_waitlist&&!e.available_to_borrow,n=this.actionsConfig.waitlistConfig();let o=null;e.available_to_borrow||e.available_to_browse?o=this.actionsConfig.loginAndBorrowBookConfig():t&&(o=this.actionsConfig.unavailableBookConfig());const r=this.actionsConfig.printDisabilityConfig(),s=[o,n,r].filter(u=>u!==null);return{primaryTitle:e.available_to_browse?m.available_1hr:e.available_to_borrow?m.available_14d:m.unavailable,primaryActions:s,primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrow1HrAction(){const e=this.lendingStatus||{},t=!e.available_to_browse&&e.browsingExpired,n=e.available_to_browse||t,o=n&&e.available_to_borrow,r=n&&!e.available_to_borrow&&e.available_to_waitlist,s=n&&!e.available_to_borrow&&!e.available_to_waitlist,h=e.available_browsable_copies,u=e.max_browsable_copies,v=h!==void 0&&u!==void 0&&h<1&&h<u,P=t?m.session_expired:!n&&v?m.being_borrowed:!n&&e.available_to_waitlist?m.available_waitlist:m.available_1hr,q=t?this.actionsConfig.browseAgainConfig():this.actionsConfig.firstBrowseConfig(),Ce=this.actionsConfig.borrowBookConfig(),ke=this.actionsConfig.waitlistConfig(),K=this.actionsConfig.printDisabilityConfig();return{primaryTitle:P,primaryActions:s?[q,K]:o?[q,Ce,K]:r?[q,ke,K]:[],primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrowAction(){const e=this.lendingStatus||{};if(!!!this.userid)return this.loggedOutOptions();if(e.available_to_browse||e.browsingExpired)return this.borrow1HrAction();let n=null;const o=this.actionsConfig.waitlistConfig(),r=this.actionsConfig.printDisabilityConfig(),s=ue(e.loanCount,e.maxLoans);!e.available_to_borrow&&!o?n=this.actionsConfig.unavailableBookConfig():e.available_to_borrow&&(n=this.actionsConfig.borrowBookConfig(s));const u=[n,o,r].filter(v=>v!==null);return{primaryTitle:o?m.being_borrowed:"",primaryActions:u,primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}getBrowseCountdownTitle(){const e=Number(this.lendingStatus.secondsLeftOnLoan),t=new Date(+new Date+e*1e3);let n=t.getHours()%12;const o=(""+t.getMinutes()).replace(/^(\d{1})$/,"0$1"),r=t.getHours()>11?" PM":" AM";return n===0&&(n=12),"Borrow ends at "+n+":"+o+r}getCurrentLendingActions(){let e;const t=this.lendingStatus||{},n=y.getQueryParam("admin")=="1"&&t.isAdmin,o=y.getQueryParam("access")=="1"&&t.user_is_printdisabled,r=t.user_has_borrowed||t.user_has_browsed&&!t.browsingExpired,s=!t.user_has_borrowed&&!t.user_has_browsed,h=!t.available_to_borrow&&!t.available_to_browse,u=t.is_printdisabled&&t.user_is_printdisabled,v=(t.available_to_browse||t.available_to_borrow)&&s&&!t.user_on_waitlist;return n||o?e=this.adminOrPrintDisabledReadingAction():t.isAdmin&&s&&h?e=this.onlyAdminAction():r?e=this.patronIsReadingAction():t.user_can_claim_waitlist?e=this.claimWaitlistAction():u?e=this.borrowPrintDisabledAction():v||t.browsingExpired?e=this.borrowAction():t.isPrintDisabledOnly?e=this.onlyPrintDisabledAction():t.user_on_waitlist?e=this.onWaitlistAction():e=this.restrictedAction(),e}}const F=E("poller");class Lt{constructor(e){this.consecutiveFailures=0,this.loanAnalytics=new me;const{identifier:t,borrowType:n,successCallback:o,errorCallback:r,pollerDelay:s,skipInitialCall:h=!1,fetchHandler:u}=e;this.identifier=t,this.borrowType=n,this.successCallback=o,this.errorCallback=r,this.pollerDelay=s,this.skipInitialCall=h===!0,this.fetchHandler=u,this.bookAccessed()}disconnectedCallback(){window?.IALendingIntervals?.clearTokenPoller()}async bookAccessed(){this.borrowType?(this.skipInitialCall?F.debug("skipping initial create_token — already minted by the renewal response",{identifier:this.identifier}):this.handleLoanTokenPoller(!0),this.borrowType!=="adminBorrowed"&&(window.IALendingIntervals.tokenPoller=setInterval(()=>{this.handleLoanTokenPoller()},this.pollerDelay*1e3))):(D(`${C.bookAccessed} - not borrowed`,{identifier:this.identifier,action:"create_token"}),this.disconnectedCallback())}async handleLoanTokenPoller(e=!1){const t="create_token";F.debug("create_token requested",{identifier:this.identifier,isInitial:e}),_({identifier:this.identifier,action:t,fetchHandler:this.fetchHandler,error:n=>this.handleTokenError(n,e),success:()=>{F.debug("create_token succeeded",{identifier:this.identifier,isInitial:e}),this.consecutiveFailures=0,e&&this.successCallback()}})}handleTokenError(e,t){const n="create_token";this.consecutiveFailures+=1;const{consecutiveFailures:o}=this;F.warn("create_token failed",{identifier:this.identifier,isInitial:t,consecutiveFailures:o,error:e?.error}),this.errorCallback({detail:{action:n,data:e,isInitial:t,consecutiveFailures:o}}),D(`${C.handleLoanTokenPoller} - create_token failed`,{identifier:this.identifier,action:n,extra:{borrowType:this.borrowType,isInitial:t,consecutiveFailures:o,error:e?.error,status:e?.status,nonJsonResponse:e?.nonJsonResponse===!0,response:JSON.stringify(e)}}),this.loanAnalytics?.sendEvent("LendingServiceLoanError",n,this.identifier)}}const Tt=E("renew");class _t{constructor(e,t,n,o){this.loanRenewMessage="This book has been renewed for #time #unitsOfTime.",this.loanReturnWarning="Go to any other page to keep your loan active.",this.result={texts:null,renewNow:!1,renewType:""},this.hasPageChanged=e,this.identifier=t,this.localCache=n,this.loanRenewTimeConfig=o}handleLoanRenew(){try{return this.hasPageChanged?this.pageChanged():this.autoChecker()}catch(e){Tt.error("handleLoanRenew threw",{identifier:this.identifier,hasPageChanged:this.hasPageChanged,error:e})}return $}async pageChanged(){const{loanRenewAtLast:e}=this.loanRenewTimeConfig,t=new Date,n=await this.localCache.get(`${this.identifier}-loanTime`),o=this.changeTime(n,e,"sub");return o!==null&&t>=o&&(this.result={texts:this.loanRenewMessage,renewNow:!0,renewType:"auto"}),this.setPageChangedTime(),this.result}async autoChecker(){const{pageChangedInLast:e}=this.loanRenewTimeConfig,t=await this.localCache.get(`${this.identifier}-pageChangedTime`),n=this.changeTime(new Date,e,"sub");return t===void 0||t<=n?this.result={texts:this.loanReturnWarning,renewNow:!1,renewType:""}:t>=n&&(this.result={texts:"",renewNow:!0,renewType:"auto"}),this.result}async setPageChangedTime(){await this.localCache.set({key:`${this.identifier}-pageChangedTime`,value:new Date,ttl:Number(this.loanRenewTimeConfig.loanTotalTime)})}getMessageTexts(e,t){let n="minute",o=e,r=t;return r=Math.ceil(r/60),r>59&&(r=1,n="hour"),o=o?.replace(/#time/,String(r)),o?.replace(/#unitsOfTime/,r!==1?`${n}s`:n)}changeTime(e,t,n){return e===void 0?null:n==="sub"?new Date(e.getTime()-t*1e3):new Date(e.getTime()+t*1e3)}}const xt=l`<svg
  height="20"
  width="20"
  viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg"
>
  <g fill="none" fill-rule="evenodd">
    <path d="m0 0h100v100h-100z" fill="#fff" />
    <path
      d="m49.8315487 0h.1702245c6.7356878 0 13.1853038 1.31117332 19.3488483 3.93351997 6.1635444 2.62234664 11.4854233 6.15778963 15.9656369 10.60632903 4.4802135 4.4485394 8.0478347 9.7522946 10.7028636 15.9112655 2.655029 6.1589709 3.980878 12.6038012 3.9789971 19.3344909.0567419 6.6716279-1.1702933 13.0585776-3.6811042 19.1608491-2.510811 6.1022715-6.106803 11.5206067-10.7879759 16.2550055-9.7027949 9.7522946-21.4884754 14.6851412-35.3570414 14.79854h-.1702244c-6.7333236 0-13.1829397-1.3111733-19.3488483-3.93352-6.1659087-2.6223466-11.4877876-6.1577896-15.9656369-10.606329s-8.04547055-9.7522946-10.7028637-15.9112655c-2.65739314-6.1589709-3.9844243-12.6038012-3.98254337-19.3344909-.05674149-6.6716279 1.17029325-13.0585776 3.68110421-19.1608491 2.51081095-6.1022715 6.10680292-11.5206067 10.78797586-16.2550055 9.7027949-9.75229456 21.4884754-14.68514123 35.3570414-14.79854zm12.6566146 26.4757998c1.6745578-1.6828001 2.5118367-3.6747334 2.5118367-5.9757998 0-2.4126333-.8095238-4.4324583-2.4285714-6.059475s-3.6289796-2.440525-6.0297959-2.440525c-2.4008164 0-4.4107483.8135083-6.029796 2.440525-1.6745578 1.6270167-2.5118367 3.6468417-2.5118367 6.059475 0 2.1871753.8372789 4.1791086 2.5118367 5.9757998 1.6745579 1.6828001 3.6844898 2.5242002 6.029796 2.5242002 2.3453061 0 4.3274829-.8414001 5.9465306-2.5242002zm-12.1370589 52.7776981-1.2815282-.9486968c0-.4588935.398855-1.8938272 1.196565-4.3048011l12.7338588-39-23.0745876 3.6164609.2548896 3.873251c0-.1141289.4554971-.1997256 1.3664914-.2567901.9109942 0 1.623741.1723823 2.1382404.5171468.5121392.2306356.7965299.6039323.8531721 1.1198902 0 .8607225-.6549247 3.2134431-1.9647739 7.0581619l-8.1175252 24.1061729c-1.0242785 3.2716963-1.5080967 5.5388203-1.4514546 6.8013717.0566421 1.6643804.8826732 2.9839963 2.4780932 3.9588477 1.2532071.803658 2.8769482 1.205487 4.8712231 1.205487h.5982825c1.7653464-.0570645 3.8445846-.3875629 6.2377146-.9914952 2.3931299-.6039323 4.3590839-1.3933242 5.8978617-2.3681756 1.3098493-.803658 2.3919499-1.5359853 3.2463021-2.1969821.8543521-.6609968 1.3959925-1.1341564 1.6249211-1.4194788l.3433929-.3459533-2.8214861-3.3596708-2.9914125 2.0650205c-.79771.4588935-1.5104568.7454047-2.1382404.8595337z"
      fill="#000"
      fill-rule="nonzero"
    />
  </g>
</svg> `;var Rt=Object.defineProperty,St=Object.getOwnPropertyDescriptor,w=(i,e,t,n)=>{for(var o=n>1?void 0:n?St(e,t):e,r=i.length-1,s;r>=0;r--)(s=i[r])&&(o=(n?s(e,t,o):s(o))||o);return n&&o&&Rt(e,t,o),o};const g=E("bar");let ge;function G(){return ge??=(async()=>{document.readyState!=="complete"&&await new Promise(i=>{window.addEventListener("load",()=>i(),{once:!0})}),!customElements.get("modal-manager")&&await Te(()=>import("./modal-manager-X1OeMort.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8]),import.meta.url)})().catch(i=>{g.error("could not register modal-manager",i)}),ge}const Bt=2,$t={browseExpired:"IABookReader:BrowsingHasExpired"},O={iaButton:"min-height:3.5rem;cursor:pointer;color:white;border-radius:0.4rem;border:1px solid #c5d1df;padding:4px 8px;width:auto;user-select:none;",renew:"background:#194880;width:110px;",return:"background:#d9534f;width:120px;",refresh:"background:none;font-size:inherit;border:0;padding:0;color:#0000ee;cursor:pointer;text-decoration:underline"};function pe(i){return Math.round((Number(i)-Date.now())/1e3)}let p=class extends x{constructor(){super(...arguments),this.userid="",this.identifier="",this.bookTitle="",this.returnUrl="",this.lendingStatus={},this.width=0,this.bwbPurchaseUrl="",this.lendingBarPostInit=()=>{},this.reloadPageImages=()=>{},this.barType="action",this.disableActionGroup=!1,this.tokenDelay=120,this.timerExecutionSeconds=30,this.loaderIcon="https://archive.org/upload/images/tree/loading.gif",this.loanRenewTimeConfig={loanTotalTime:3600,loanRenewAtLast:660,pageChangedInLast:900},this.loanRenewResult={texts:"",renewNow:!1,secondsLeft:0,renewType:""},this.postInitComplete=!1,this.primaryActions=[],this.primaryTitle="",this.primaryColor="primary",this.secondaryActions=[],this.borrowType=null,this.renewNowScheduled=!1,this.loanRenewInProgress=!1,this.recoveringFromLoanExpiry=!1,this.tokenAccessLost=!1,this.skipNextInitialTokenCall=!1,this.warningModalOpen=!1,this.warningModalDismissed=!1}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.bindLoanRenewEvents(),G()}disconnectedCallback(){super.disconnectedCallback(),this.unbindLoanRenewEvents(),clearTimeout(this.pollerStartTimeout),clearTimeout(this.renewNowTimeout),this.renewNowScheduled&&(this.renewNowScheduled=!1,this.loanRenewInProgress=!1,this.recoveringFromLoanExpiry=!1),window?.IALendingIntervals?.clearAll(),this.tokenPoller?.disconnectedCallback(),this.sentryCaptureMsg(C.disconnectedCallback),this.disconnectResizeObserver()}sentryCaptureMsg(i,e,t){D(i,{identifier:this.identifier,action:e,extra:t})}firstUpdated(){this.bindLoanRenewEvents(),this.localCache=new He({namespace:"loanRenew"}),this.sharedObserver||(this.sharedObserver=new Be,this.setupResizeObserver())}updated(i){(i.has("lendingStatus")||i.has("bwbPurchaseUrl"))&&(g.debug("lendingStatus changed",{identifier:this.identifier,lendingStatus:this.lendingStatus}),this.setupLendingToolbarActions()),i.has("sharedObserver")&&(this.disconnectResizeObserver(),this.setupResizeObserver()),i.has("loanRenewResult")&&this.loanRenewResult.renewNow&&(this.loanRenewInProgress=!0,window.IALendingIntervals.clearAll())}handleResize(i){const{target:e}=i;if(e!==this)return;const{contentRect:t}=i;this.width=Math.round(t.width)}disconnectResizeObserver(){this.sharedObserver?.removeObserver({handler:this,target:this})}setupResizeObserver(){this.shadowRoot&&this.sharedObserver?.addObserver({handler:this,target:this})}applyLendingActions(){this.lendingOptions=new kt(this.userid,this.identifier,this.lendingStatus,this.bwbPurchaseUrl);const i=this.lendingOptions.getCurrentLendingActions();if(!i)return!1;const e=t=>t!=null;return this.primaryTitle=i.primaryTitle,this.primaryActions=i.primaryActions?.filter(e),this.primaryColor=i.primaryColor,this.secondaryActions=i.secondaryActions?.filter(e),this.borrowType=i.borrowType?i.borrowType:null,!0}async setupLendingToolbarActions(){const i="browsingExpired"in this.lendingStatus&&this.lendingStatus?.browsingExpired;if(i){this.primaryActions?.length?g.debug("browsing expired — leaving action bar untouched"):(g.debug("browsing expired on first render — populating action bar"),this.applyLendingActions()),this.tokenPoller||this.sentryCaptureMsg(C.bookWasExpired),window?.IALendingIntervals?.clearAll(),this.dispatchEvent(new Event($t.browseExpired,{bubbles:!0,cancelable:!1,composed:!0}));return}if(this.applyLendingActions()){if(this.requestUpdate(),this.borrowType==="browsed"&&!this.loanRenewInProgress&&(await this.startTimerCountdown(),await this.startBrowseTimer()),!this.borrowType||this.barType==="title"){this.lendingBarPostInit();return}clearTimeout(this.pollerStartTimeout),this.pollerStartTimeout=setTimeout(()=>{if(!i&&!this.loanRenewInProgress&&!this.tokenAccessLost&&!window.IALendingIntervals.tokenPoller){const e=this.skipNextInitialTokenCall;this.skipNextInitialTokenCall=!1,this.recoveringFromLoanExpiry=!1,this.startLoanTokenPoller(e)}},100)}}isBookReaderInitAction(i){return i?.detail?.props?.init?.initComplete===!1}bindLoanRenewEvents(){this.unbindLoanRenewEvents(),this.userActionHandler=i=>{if(this.isBookReaderInitAction(i)){g.debug("BookReader:userAction ignored — fired by BookReader init");return}const e=this.lendingStatus.browsingExpired;g.debug("BookReader:userAction received",{borrowType:this.borrowType,browsingExpired:e}),e&&this.autoRenewExpiredLoan(),this.borrowType==="browsed"&&!e&&this.autoLoanRenewChecker(!0)},window.addEventListener("BookReader:userAction",this.userActionHandler),this.visibilityChangeHandler=async()=>{if(document.hidden){g.debug("visibilitychange: tab backgrounded");return}g.debug("visibilitychange: tab foregrounded",this.borrowType);try{if(this.lendingStatus.browsingExpired===!0){this.autoRenewExpiredLoan();return}if(this.borrowType!=="browsed")return;if(this.lendingStatus.browsingExpired===!1){const i=await this.localCache.get(`${this.identifier}-loanTime`),e=pe(i);e>=this.timerExecutionSeconds?this.loanStatusCheckInterval(Number(e)):(window?.IALendingIntervals?.clearAll(),this.autoRenewExpiredLoan())}}catch(i){g.error("visibilitychange handler failed",{identifier:this.identifier,error:i}),this.sentryCaptureMsg("visibilitychange handler failed",void 0,{error:String(i)})}},document.addEventListener("visibilitychange",this.visibilityChangeHandler)}unbindLoanRenewEvents(){this.userActionHandler&&(window.removeEventListener("BookReader:userAction",this.userActionHandler),this.userActionHandler=void 0),this.visibilityChangeHandler&&(document.removeEventListener("visibilitychange",this.visibilityChangeHandler),this.visibilityChangeHandler=void 0)}async autoLoanRenewChecker(i=!1){this.loanRenewInProgress||(this.loanRenewHelper=new _t(i,this.identifier,this.localCache,this.loanRenewTimeConfig),await this.loanRenewHelper.handleLoanRenew(),this.loanRenewResult=this.loanRenewHelper.result)}autoRenewExpiredLoan(){if(this.loanRenewInProgress){g.debug("autoRenewExpiredLoan: skipped, renewal already in progress",{identifier:this.identifier});return}g.debug("autoRenewExpiredLoan: starting silent renewal",{identifier:this.identifier}),this.loanRenewInProgress=!0,this.recoveringFromLoanExpiry=!0,this.modal?.closeModal(),this.lendingStatus={...this.lendingStatus,browsingExpired:!1},clearTimeout(this.renewNowTimeout),this.renewNowScheduled=!0,this.renewNowTimeout=setTimeout(()=>{this.renewNowScheduled=!1,this.loanRenewResult={texts:"",renewNow:!0,renewType:"auto"}},0)}get modal(){const i=document.body.querySelector("modal-manager");return i?.setAttribute("id","action-bar-modal"),i}async showWarningModal(){if(this.warningModalOpen)return;this.warningModalOpen=!0,g.debug("showWarningModal"),await G();const{texts:i,secondsLeft:e}=this.loanRenewResult;let t=e;t===void 0||t<=0?t=this.lendingStatus.secondsLeftOnLoan:t=t>60?t:60,this.modal.customModalContent=void 0,this.modal?.closeModal(),this.loanRenewResult={texts:"",renewNow:!1};const n=new J({headline:l`${c("Are you still there?")}`,headerColor:"#194880",showCloseButton:!1,closeOnBackdropClick:!1,message:l`<span>
        ${this.loanRenewHelper?.getMessageTexts(i,Number(t))}
        <a
          href="https://help.archive.org/help/borrowing-from-the-lending-library"
          target="_blank"
          title=${c("Get more info on borrowing from The Lending Library")}
          data-event-click-tracking="BookReader|BrowsableMoreInfo"
          style="display:inline-block;vertical-align:middle;line-height:0;margin-left:4px;"
        >
          ${xt}
        </a>
      </span>`}),o=l`
      <div
        id="book-action-bar-custom-buttons"
        style="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px;margin-top:10px;"
      >
        <button
          style="${O.iaButton} ${O.renew}"
          @click=${()=>this.dismissWarningModal()}
        >
          ${c("Okay")}
        </button>
      </div>
    `;this.modal.setAttribute("aria-live","assertive"),await this.modal?.showModal({config:n,customModalContent:o})}dismissWarningModal(){this.modal?.closeModal(),this.warningModalOpen=!1,this.warningModalDismissed=!0}async browseHasExpired(){g.debug("browseHasExpired",{identifier:this.identifier,loanRenewInProgress:this.loanRenewInProgress}),window?.IALendingIntervals?.clearAll();const i={...this.lendingStatus,browsingExpired:!0,secondsLeftOnLoan:0};this.lendingStatus=i,await this.localCache.delete(`${this.identifier}-loanTime`),await this.localCache.delete(`${this.identifier}-pageChangedTime`),g.debug("browseHasExpired: cleared loanTime/pageChangedTime cache",{identifier:this.identifier}),this.loanRenewResult.renewNow=!1,this.loanRenewResult.texts=c("This book has been returned due to inactivity."),this.modal?.closeModal(),this.warningModalOpen=!1,this.sentryCaptureMsg(C.browseHasExpired)}async showLoanUnavailableModal(i){await G();const e=new J({showCloseButton:!1,closeOnBackdropClick:!1,headerColor:"#d9534f",message:l`${i||c("Due to inactivity, this book was returned, and someone else has now borrowed it. Please try again later.")}`}),t=l`<br />
      <div style="text-align: center">
        <button
          style="${O.iaButton} ${O.return}"
          @click=${()=>y.goToUrl(this.returnUrl,!0)}
        >
          ${c("Okay")}
        </button>
      </div>`;await this.modal?.showModal({config:e,customModalContent:t})}async startBrowseTimer(){window?.IALendingIntervals?.clearBrowseExpireTimeout();const{browsingExpired:i,user_has_browsed:e,secondsLeftOnLoan:t}=this.lendingStatus;!e||i||(window.IALendingIntervals.browseExpireTimeout=setTimeout(()=>{this.browseHasExpired()},Number(t)*1e3))}render(){return this.barType==="title"?l`<section class="lending-wrapper">
        ${this.bookTitleBar}
      </section>`:l`<section class="lending-wrapper">
      ${this.bookActionBar}
    </section>`}get bookTitleBar(){return l`<ia-book-actions-title-bar
      .identifier=${this.identifier}
      .bookTitle=${this.bookTitle}
    ></ia-book-actions-title-bar>`}get timerCountdownEl(){return this.shadowRoot?.querySelector("ia-book-actions-timer-countdown")}get bookActionBar(){return l`
      <ia-book-actions-collapsible-action-group
        .userid=${this.userid}
        .identifier=${this.identifier}
        .primaryColor=${this.primaryColor}
        .primaryActions=${this.primaryActions}
        .secondaryActions=${this.secondaryActions}
        .width=${this.width}
        .borrowType=${this.borrowType}
        .returnUrl=${this.returnUrl}
        .localCache=${this.localCache}
        .fetchHandler=${this.fetchHandler}
        .loanTotalTime=${this.loanRenewTimeConfig.loanTotalTime}
        .loanRenewType=${this.loanRenewResult.renewType}
        .loaderIcon=${this.loaderIcon}
        ?hasAdminAccess=${this.hasAdminAccess}
        ?disabled=${this.disableActionGroup}
        ?autoRenew=${this.loanRenewResult.renewNow}
        ?autoReturn=${this.lendingStatus.browsingExpired}
        @loanAutoRenewed=${this.handleLoanAutoRenewed}
        @lendingActionError=${this.handleLendingActionError}
        @toggleActionGroup=${this.handleToggleActionGroup}
      >
      </ia-book-actions-collapsible-action-group>
      ${this.textGroupTemplate} ${this.infoIconTemplate}
      <ia-book-actions-timer-countdown
        .secondsLeftOnLoan=${Math.round(Number(this.lendingStatus.secondsLeftOnLoan))}
      ></ia-book-actions-timer-countdown>
    `}async handleLoanAutoRenewed({detail:i}){const e=i?.data?.loan;if(!e?.renewal){this.loanRenewInProgress=!1,this.recoveringFromLoanExpiry=!1,this.warningModalOpen=!1,g.warn("handleLoanAutoRenewed: not a confirmed renewal",{identifier:this.identifier,activeLoan:e});return}if(this.loanRenewResult.renewNow){const t=await this.localCache.get(`${this.identifier}-loanTime`),n=pe(t),o=Number.isFinite(n)&&n>0?n:this.loanRenewTimeConfig.loanTotalTime;g.debug("handleLoanAutoRenewed",{secondsLeft:o,rawSecondsLeft:n,ajaxResponse:i?.data}),this.skipNextInitialTokenCall=!0,this.tokenAccessLost=!1,this.reloadPageImages(),this.recoveringFromLoanExpiry&&(this.lendingBarPostInit(),this.postInitComplete=!0);const r={...this.lendingStatus,user_has_browsed:!0,browsingExpired:!1,secondsLeftOnLoan:o};this.lendingStatus=r,this.modal?.closeModal(),this.modal&&(this.modal.removeAttribute("id"),this.modal.customModalContent=void 0),this.sentryCaptureMsg(C.bookHasRenewed,"renew_loan"),this.warningModalDismissed=!1}this.warningModalOpen=!1,this.loanRenewInProgress=!1}async startTimerCountdown(){window?.IALendingIntervals?.clearTimerCountdown(),this.timeWhenTimerStart=new Date,window.IALendingIntervals.timerCountdown=setInterval(async()=>{await this.loanStatusCheckInterval(Number(this.lendingStatus.secondsLeftOnLoan))},this.timerExecutionSeconds*1e3)}async loanStatusCheckInterval(i){let e=i;e-=this.timerExecutionSeconds,e=Math.round(e);const t=this.reSyncTimerIfGoneOff(e);t.hasSynced&&(e=t.whatShouldLeft,g.debug("timer: timer re-synced",{secondsLeft:e})),g.debug("timer",{whatShouldLeft:t.whatShouldLeft,whatIsleft:e}),this.timeWhenTimerStart=new Date,this.lendingStatus={...this.lendingStatus,secondsLeftOnLoan:e},e<=this.loanRenewTimeConfig.loanRenewAtLast&&await this.loanRenewAttempt(e),e<=this.timerExecutionSeconds&&(window?.IALendingIntervals?.clearAll(),this.tokenPoller?.disconnectedCallback(),this.sentryCaptureMsg(C.clearOneHourTimer))}reSyncTimerIfGoneOff(i){const e=new Date;if(!this.timeWhenTimerStart)return this.timeWhenTimerStart=e,{hasSynced:!1,whatShouldLeft:Math.round(i)};const t=e.getTime()/1e3-this.timeWhenTimerStart.getTime()/1e3,n=Number(this.lendingStatus.secondsLeftOnLoan)-t,o=Math.round(i),r=Math.round(n);if((this.timerCountdownEl.secondsLeftOnLoan||0)!==r||o!==r){const h={...this.lendingStatus,secondsLeftOnLoan:r};this.lendingStatus=h}return o!==r?(g.debug(`reSyncTimerIfGoneOff ${o} - ${r}: re-syncing timer`),{hasSynced:!0,whatShouldLeft:r}):{hasSynced:!1,whatShouldLeft:r}}async loanRenewAttempt(i){let e=i;if(e<50){g.debug("loanRenewAttempt: < 50s left, expiring loan"),await this.browseHasExpired();return}await this.autoLoanRenewChecker(!1),this.loanRenewResult.renewNow===!1&&!this.warningModalDismissed&&(e-=60,this.loanRenewResult.secondsLeft=e,this.showWarningModal())}startLoanTokenPoller(i=!1){const e=()=>{this.postInitComplete||this.lendingBarPostInit(),this.postInitComplete=!0},t=n=>{this.handleLendingActionError(n)};this.tokenPoller?.disconnectedCallback(),this.tokenPoller=new Lt({identifier:this.identifier,borrowType:this.borrowType,successCallback:e,errorCallback:t,pollerDelay:this.tokenDelay,skipInitialCall:i,fetchHandler:this.fetchHandler})}handleToggleActionGroup(){this.disableActionGroup=!this.disableActionGroup}handleLendingActionError(i){this.disableActionGroup=!1;const e=i?.detail?.action,t=i?.detail?.data?.error,n=typeof t=="string"?t:void 0,o=i?.detail?.isInitial===!0,r=i?.detail?.data,s=i?.detail?.consecutiveFailures??1;if(g.warn("handleLendingActionError",{identifier:this.identifier,action:e,errorMsg:n,isInitial:o,loanRenewInProgress:this.loanRenewInProgress,recoveringFromLoanExpiry:this.recoveringFromLoanExpiry}),e==="create_token"&&!o&&(r?.nonJsonResponse===!0||r?.networkFailure===!0)&&s<=Bt){g.warn("create_token routine refresh got no answer from the service, no modal",{identifier:this.identifier,status:r?.status,errorMsg:n});return}if(e==="create_token")window?.IALendingIntervals?.clearAll(),this.tokenPoller?.disconnectedCallback(),this.tokenAccessLost=!0,this.lendingStatus={...this.lendingStatus,user_has_browsed:!1,available_to_browse:!0,secondsLeftOnLoan:0},this.showErrorModal(n,e);else if(e==="renew_loan")window?.IALendingIntervals?.clearAll(),this.loanRenewInProgress=!1,this.recoveringFromLoanExpiry=!1,this.lendingStatus={...this.lendingStatus,user_has_browsed:!1,available_to_browse:!0,secondsLeftOnLoan:0},this.showLoanUnavailableModal(n);else{if(window?.IALendingIntervals?.clearAll(),!n)return;this.showErrorModal(n,e),n.match(/not available to borrow/gm)&&(e==="browse_book"?this.lendingStatus={...this.lendingStatus,available_to_browse:!1}:e==="borrow_book"&&(this.lendingStatus={...this.lendingStatus,available_to_borrow:!1}))}}async showErrorModal(i,e){await G();const t=new J({title:l`${c("Lending error")}`,message:i?l`${i}`:void 0,headerColor:"#d9534f",showCloseButton:!0});if(e==="create_token"){const n=l`<button
        style="${O.refresh}"
        @click=${()=>window.location.reload(!0)}
      >
        refresh
      </button>`;t.message=l` Uh oh, something went wrong trying to access
        this book.<br />
        Please ${n} to try again or send us an email to
        <a
          href="mailto:info@archive.org?subject=Help: cannot access my borrowed book: ${this.identifier}"
          >info@archive.org</a
        ><br /><br />
        ${i?l`<code>errorLog: ${i}</code>`:$}`}await this.modal?.showModal({config:t})}get iconClass(){return this.width<=he?"mobile":"desktop"}get textClass(){return this.width>=he?"visible":"hidden"}get infoIconTemplate(){return l`<ia-book-actions-info-icon
      iconClass=${this.iconClass}
    ></ia-book-actions-info-icon>`}get textGroupTemplate(){return this.primaryTitle?l`<ia-book-actions-text-group
          textClass=${this.textClass}
          .texts=${this.primaryTitle}
        >
        </ia-book-actions-text-group>`:$}get hasAdminAccess(){return!this.lendingStatus.userHasBorrowed&&this.lendingStatus.isAdmin}static get styles(){return d`
      :host {
        display: block;
      }

      .hide {
        display: none;
      }

      .lending-wrapper {
        width: 100%;
        margin: 0 auto;
        background: var(--primaryBGColor, #000);
        color: var(--primaryTextColor, #fff);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }

      #action-bar-modal {
        --modalWidth: 36rem;
      }
    `}};w([a({type:String})],p.prototype,"userid",2);w([a({type:String})],p.prototype,"identifier",2);w([a({type:String})],p.prototype,"bookTitle",2);w([a({type:String})],p.prototype,"returnUrl",2);w([a({type:Object})],p.prototype,"lendingStatus",2);w([a({type:Number})],p.prototype,"width",2);w([a({type:String})],p.prototype,"bwbPurchaseUrl",2);w([a({attribute:!1})],p.prototype,"lendingBarPostInit",2);w([a({attribute:!1})],p.prototype,"reloadPageImages",2);w([a({type:String})],p.prototype,"barType",2);w([a({attribute:!1})],p.prototype,"sharedObserver",2);w([a({type:Boolean})],p.prototype,"disableActionGroup",2);w([a({type:Number})],p.prototype,"tokenDelay",2);w([a({type:Number})],p.prototype,"timerExecutionSeconds",2);w([a({type:String})],p.prototype,"loaderIcon",2);w([a({type:Object})],p.prototype,"localCache",2);w([a({attribute:!1})],p.prototype,"fetchHandler",2);w([a({type:Object})],p.prototype,"loanRenewTimeConfig",2);w([a({type:Object})],p.prototype,"loanRenewResult",2);p=w([R("ia-book-actions")],p);const It={active_borrows:0,active_browses:0,available_borrowable_copies:0,available_browsable_copies:1,available_lendable_copies:1,available_to_borrow:!1,available_to_browse:!1,available_to_waitlist:!1,copies_reserved_for_waitlist:0,is_lendable:!0,is_login_required:!1,is_printdisabled:!1,is_readable:!1,last_borrow:null,last_browse:null,last_waitlist:null,max_borrowable_copies:0,max_browsable_copies:1,max_lendable_copies:1,next_borrow_expiration:null,next_browse_expiration:null,orphaned_acs_loans:0,upgradable_browses:0,user_at_max_loans:!1,user_can_claim_waitlist:!1,user_has_acs_borrowed:!1,user_has_borrowed:!1,user_has_browsed:!1,user_is_printdisabled:!1,user_loan_count:0,user_loan_record:[],user_on_waitlist:!1,users_on_waitlist:0,bookUrl:"/details/practicalorganic00plim",browsingExpired:!1,daysLeftOnLoan:0,isAdmin:!1,isArchiveOrgLending:!0,isAvailable:!1,isAvailableForBrowsing:!0,isBrowserBorrowable:!0,isLendingRequired:!0,isOpenLibraryLending:!1,isPrintDisabledOnly:!1,loanCount:0,loanRecord:[],loansUrl:"/details/@neeraj-archive?tab=loans#loans-on-loan",maxLoans:10,secondsLeftOnLoan:10,shouldProtectImages:!0,totalWaitlistCount:0,userHasBorrowed:!1,userHasBrowsed:!1,userHoldIsReady:!1,userIsPrintDisabled:!1,userOnWaitingList:!1,userWaitlistPosition:-1,userid:"@neeraj-archive"};var Et=Object.defineProperty,Pt=Object.getOwnPropertyDescriptor,k=(i,e,t,n)=>{for(var o=n>1?void 0:n?Pt(e,t):e,r=i.length-1,s;r>=0;r--)(s=i[r])&&(o=(n?s(e,t,o):s(o))||o);return n&&o&&Et(e,t,o),o};const Ot=[{label:"Bar background",cssVariable:"--primaryBGColor",defaultValue:"#000000",inputType:"color"},{label:"Bar text color",cssVariable:"--primaryTextColor",defaultValue:"#ffffff",inputType:"color"},{label:"White",cssVariable:"--white",defaultValue:"#ffffff",inputType:"color"},{label:"Primary button fill",cssVariable:"--primaryCTAFill",defaultValue:"#194880",inputType:"color"},{label:"Primary button hover fill (RGB)",cssVariable:"--primaryCTAFillRGB",defaultValue:"25, 72, 128",inputType:"text"},{label:"Primary button border",cssVariable:"--primaryCTABorder",defaultValue:"#c5d1df",inputType:"color"},{label:"Secondary button fill",cssVariable:"--secondaryCTAFill",defaultValue:"#333333",inputType:"color"},{label:"Secondary button hover fill (RGB)",cssVariable:"--secondaryCTAFillRGB",defaultValue:"51, 51, 51",inputType:"text"},{label:"Secondary button border",cssVariable:"--secondaryCTABorder",defaultValue:"#999999",inputType:"color"},{label:"Danger button fill",cssVariable:"--primaryErrorCTAFill",defaultValue:"#d9534f",inputType:"color"},{label:"Danger button hover fill (RGB)",cssVariable:"--primaryErrorCTAFillRGB",defaultValue:"229, 28, 38",inputType:"text"},{label:"Danger button border",cssVariable:"--primaryErrorCTABorder",defaultValue:"#d43f3a",inputType:"color"},{label:"Disabled button fill",cssVariable:"--primaryDisableCTAFill",defaultValue:"#767676",inputType:"color"},{label:"Dropdown background",cssVariable:"--iaBookActionsDropdownBGColor",defaultValue:"#2d2d2d",inputType:"color"}],Nt=[{label:"Book title",propertyName:"bookTitle",defaultValue:""},{label:"Identifier",propertyName:"identifier",defaultValue:""},{label:"Bar type",propertyName:"barType",inputType:"radio",radioOptions:["action","title"],defaultValue:"action"},{label:"Better World Books URL",propertyName:"bwbPurchaseUrl",defaultValue:""},{label:"Return URL",propertyName:"returnUrl",defaultValue:""},{label:"Seconds between create_token calls",propertyName:"tokenDelay",inputType:"number",defaultValue:120},{label:"Seconds between loan checks",propertyName:"timerExecutionSeconds",inputType:"number",defaultValue:30}],Dt=`<modal-manager></modal-manager>

<ia-book-actions
  .userid=\${'@brewster'}
  .identifier=\${'goody'}
  .bookTitle=\${'Goody Two-Shoes'}
  .lendingStatus=\${lendingStatus}
  .returnUrl=\${'/details/goody'}
  .lendingBarPostInit=\${() => bookReader.init()}
></ia-book-actions>`,te={"15s":{label:"15 seconds",loanTotalTime:15,loanRenewAtLast:13,pageChangedInLast:5},"30s":{label:"30 seconds",loanTotalTime:30,loanRenewAtLast:27,pageChangedInLast:10},"2m":{label:"2 minutes",loanTotalTime:120,loanRenewAtLast:95,pageChangedInLast:15},"60m":{label:"60 minutes (production)",loanTotalTime:3600,loanRenewAtLast:660,pageChangedInLast:900}},we={borrowable:{label:"Borrowable for 1 hour or 14 days",status:()=>({available_to_browse:!0,available_to_borrow:!0})},borrowable14:{label:"Borrowable for 14 days",status:()=>({available_to_borrow:!0})},reading1hr:{label:"Reading a 1 hour loan",status:i=>({available_to_browse:!0,user_has_browsed:!0,browsingExpired:!1,secondsLeftOnLoan:i})},expired1hr:{label:"A 1 hour loan that has expired",status:()=>({available_to_browse:!0,user_has_browsed:!0,browsingExpired:!0})},reading14:{label:"Reading a 14 day loan",status:()=>({available_to_borrow:!0,user_has_borrowed:!0,daysLeftOnLoan:10})},waitlist:{label:"Waitlist available",status:()=>({available_to_browse:!0,available_to_waitlist:!0,available_lendable_copies:0})},onWaitlist:{label:"On the waitlist",status:()=>({user_on_waitlist:!0})},claimWaitlist:{label:"Top of the waitlist",status:()=>({user_can_claim_waitlist:!0,available_to_borrow:!0})},unavailable:{label:"Unavailable",status:()=>({})},printDisabledOnly:{label:"Print disabled only",status:()=>({isPrintDisabledOnly:!0})}},Ae=["browse_book","borrow_book","create_token","renew_loan","return_loan","join_waitlist","leave_waitlist"],Ht=Ae.filter(i=>i!=="create_token"),Mt="The demo is set to fail lending requests.",Ft="This book is not available to borrow at this time. Please try again later.",Gt="loan token not found. please try again later.",Ut=1500,Wt=100;let A=class extends x{constructor(){super(...arguments),this.scenario="borrowable",this.loggedIn=!0,this.admin=!1,this.printDisabled=!1,this.loanLength="2m",this.failRequests=!1,this.entries=[],this.status={},this.statusVersion=0,this.loanConfig=te["2m"],this.linkGuard=i=>{const e=i.composedPath();if(!e.some(o=>o===this.modalManager||o instanceof HTMLElement&&o.localName==="ia-book-actions"))return;const n=e.find(o=>o instanceof HTMLAnchorElement&&o.href!=="");n&&(i.preventDefault(),this.log("navigation",`Link to ${n.href} not followed`))},this.demoFetchHandler={fetch:async(i,e)=>{const n=e?.requestInit?.body,o=n instanceof FormData?String(n.get("action")):"",r=n instanceof FormData?n.get("identifier"):"",s=typeof i=="string"?i:i.url;this.log("request",`POST ${s} action=${o} identifier=${r}`);const h=new URLSearchParams(window.location.search),u=Ae.includes(o)&&(h.get("error")==="true"||h.get("failAction")===o),v=this.failRequests&&Ht.includes(o);if(u||v){const P=v?Mt:o==="create_token"?Gt:Ft;return this.jsonResponse({success:!1,error:P})}return(o==="renew_loan"||o==="return_loan")&&await new Promise(P=>{setTimeout(P,Ut)}),this.jsonResponse(o==="renew_loan"?{success:!0,loan:{renewal:!0}}:{success:!0})},fetchApiResponse:async()=>({success:!0}),fetchApiPathResponse:async()=>({success:!0}),fetchIAApiResponse:async()=>({success:!0})},this.onPostInit=()=>this.log("event","lendingBarPostInit called"),this.onReloadPageImages=()=>this.log("event","reloadPageImages called")}connectedCallback(){super.connectedCallback(),this.applyScenario(),this.installGlobalStubs(),this.installModalManager(),this.installNavigationGuards()}disconnectedCallback(){super.disconnectedCallback(),this.removeNavigationGuards(),this.removeModalManager(),this.removeGlobalStubs(),this.removeLoanCookies()}log(i,e){const t=new Date().toLocaleTimeString([],{hour12:!1});this.entries=[{time:t,kind:i,text:e},...this.entries].slice(0,Wt),console.log(`[ia-book-actions-demo:${i}] ${e}`)}jsonResponse(i){return new Response(JSON.stringify(i),{status:200,headers:{"Content-Type":"application/json"}})}installGlobalStubs(){this.previousAnalytics=window.archive_analytics,window.archive_analytics={send_event_no_sampling:(i,e,t,n)=>{const o=[i,String(e),t,n].filter(r=>r!==void 0&&r!=="").map(String);this.log("analytics",o.join(" | "))}},this.previousSentry=window.Sentry,window.Sentry={captureMessage:i=>this.log("sentry",i),captureException:i=>this.log("sentry",`exception: ${String(i)}`)}}removeGlobalStubs(){this.previousAnalytics?window.archive_analytics=this.previousAnalytics:delete window.archive_analytics,this.previousSentry?window.Sentry=this.previousSentry:delete window.Sentry}installModalManager(){if(document.body.querySelector("modal-manager"))return;const i=document.createElement("modal-manager");i.style.display="none",i.addEventListener("modeChanged",e=>{const{mode:t}=e.detail;i.style.display=t==="open"?"block":"none"}),document.body.appendChild(i),this.modalManager=i}removeModalManager(){this.modalManager?.remove(),this.modalManager=void 0}installNavigationGuards(){document.addEventListener("click",this.linkGuard,!0);const i=window.navigation;i&&(this.navigationGuard=e=>{const{destination:t}=e;t.sameDocument||!e.cancelable||new URL(t.url).origin===window.location.origin&&(e.preventDefault(),this.log("navigation",`Page load to ${t.url} cancelled`))},i.addEventListener("navigate",this.navigationGuard))}removeNavigationGuards(){document.removeEventListener("click",this.linkGuard,!0);const i=window.navigation;i&&this.navigationGuard&&i.removeEventListener("navigate",this.navigationGuard),this.navigationGuard=void 0}removeLoanCookies(){document.cookie.split(";").forEach(i=>{const e=decodeURIComponent(i.split("=")[0].trim());(e.startsWith("br-browse-")||e==="sticky-admin-access")&&(document.cookie=`${encodeURIComponent(e)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`)})}applyScenario(){const{loanTotalTime:i,loanRenewAtLast:e,pageChangedInLast:t}=te[this.loanLength];this.loanConfig={loanTotalTime:i,loanRenewAtLast:e,pageChangedInLast:t},document.body.querySelector("modal-manager")?.closeModal(),this.statusVersion+=1,this.status={...It,is_printdisabled:this.printDisabled,user_is_printdisabled:this.printDisabled,isAdmin:this.admin,...we[this.scenario].status(i)}}onFailChange(i){this.failRequests=i.target.checked}simulatePageTurn(){this.log("event","BookReader:userAction dispatched"),window.dispatchEvent(new CustomEvent("BookReader:userAction"))}selectField(i,e,t,n){return l`
      <label class="field">
        <span>${i}</span>
        <select
          .value=${e}
          @change=${o=>n(o.target.value)}
        >
          ${Object.entries(t).map(([o,r])=>l`<option value=${o} ?selected=${o===e}>
                ${r.label}
              </option>`)}
        </select>
      </label>
    `}checkField(i,e,t){return l`
      <label class="field check">
        <input type="checkbox" .checked=${e} @change=${t} />
        <span>${i}</span>
      </label>
    `}render(){return l`
      <story-template
        elementTag="ia-book-actions"
        elementClassName="IABookActions"
        .customExampleUsage=${Dt}
        .styleInputData=${{settings:Ot}}
        .propInputData=${{settings:Nt}}
      >
        ${_e(this.statusVersion,l`<ia-book-actions
            slot="demo"
            .userid=${this.loggedIn?"@brewster":""}
            .identifier=${"demo-book"}
            .bookTitle=${"Goody Two-Shoes"}
            .lendingStatus=${this.status}
            .loanRenewTimeConfig=${this.loanConfig}
            .loaderIcon=${"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
            .fetchHandler=${this.demoFetchHandler}
            .lendingBarPostInit=${this.onPostInit}
            .reloadPageImages=${this.onReloadPageImages}
            @IABookReader:BrowsingHasExpired=${()=>this.log("event","IABookReader:BrowsingHasExpired")}
            @lendingActionError=${i=>this.log("event",`lendingActionError ${i.detail?.action}`)}
          ></ia-book-actions>`)}

        <div slot="demo" class="toolbar">
          ${this.selectField("Lending status",this.scenario,we,i=>{this.scenario=i,this.applyScenario()})}
          ${this.selectField("1 hour loan length",this.loanLength,te,i=>{this.loanLength=i,this.applyScenario()})}
          ${this.checkField("Logged in",this.loggedIn,i=>{this.loggedIn=i.target.checked,this.applyScenario()})}
          ${this.checkField("Admin",this.admin,i=>{this.admin=i.target.checked,this.applyScenario()})}
          ${this.checkField("Print disabled",this.printDisabled,i=>{this.printDisabled=i.target.checked,this.applyScenario()})}
          ${this.checkField("Fail lending requests (not create_token)",this.failRequests,this.onFailChange)}
          <button @click=${this.simulatePageTurn}>
            Simulate a BookReader page turn
          </button>
        </div>

        <div slot="demo" class="log">
          <h4>What the element would have sent</h4>
          ${this.entries.length===0?l`<p class="empty">Nothing yet. Click an action.</p>`:l`<ul>
                ${this.entries.map(i=>l`<li class=${i.kind}>
                      <span class="time">${i.time}</span>
                      <span class="kind">${i.kind}</span>
                      <span class="text">${i.text}</span>
                    </li>`)}
              </ul>`}
        </div>

        <div slot="usage-notes">
          <p>
            Put a <code>modal-manager</code> on the page. The bar finds it by
            tag name and uses it for the loan warning and for errors. The bar
            sends loan actions to <code>/services/loans/loan</code>, so it
            belongs on archive.org or behind a proxy for it.
          </p>
          <p>
            Pick a 1 hour loan with a short length to reach the warning modal,
            the automatic renewal and the auto-return in under two minutes. Fail
            lending requests makes borrow, return, renew and waitlist calls
            fail. create_token still succeeds, since it repeats for as long as a
            loan is active. archive.org font size, under the settings, sets the
            page's root font size to 10px, which the bar is built for. It
            applies to the whole demo page, so it's on by default only when this
            element is the one being viewed.
          </p>
          <p>
            Pass a <code>fetchHandler</code> to the bar to control how it
            reaches the lending service. Loan actions are sent once, with no
            retries, and this demo's handler answers them locally.
          </p>
          <p>
            This demo makes no requests to archive.org. Lending calls,
            analytics, Sentry reports and page loads are all caught and listed
            under the demo. The loan length presets stand in for the real loan,
            and the bar renews on page turns, so use the page turn button to
            renew.
          </p>
          <p>
            <code>lendingBarPostInit</code> is called once access to the book is
            confirmed, and is where the host starts BookReader. The
            <code>IABookReader:BrowsingHasExpired</code> event bubbles when a 1
            hour loan runs out. Sizes are in rem and assume the host page sets
            <code>html { font-size: 10px }</code>.
          </p>
        </div>
      </story-template>
    `}static get styles(){return d`
      .log {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background: #111;
        color: #9fef9f;
        font-family: monospace;
        font-size: 1.2rem;
        text-align: left;
      }

      .log h4 {
        margin: 0.25rem 0;
        color: #fff;
        font-family: sans-serif;
      }

      .log ul {
        margin: 0;
        padding: 0;
        max-height: 16rem;
        overflow-y: auto;
        list-style: none;
      }

      .log li {
        display: flex;
        gap: 0.75rem;
        padding: 0.15rem 0;
        border-top: 1px solid #333;
        overflow-wrap: anywhere;
      }

      .log .time {
        color: #888;
      }

      .log .kind {
        flex: 0 0 11ch;
        color: #8ec5ff;
      }

      .log li.request .kind {
        color: #7fe0d0;
      }

      .log li.analytics .kind {
        color: #c9a7ff;
      }

      .log li.sentry .kind {
        color: #f5b87a;
      }

      .log li.navigation .kind {
        color: #ff9aa2;
      }

      .log .empty {
        margin: 0.25rem 0;
      }

      td {
        padding-right: 1rem;
      }

      .toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem 1.5rem;
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        background: #f2f2f2;
        font-size: 1.3rem;
        text-align: left;
      }

      .toolbar .field {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    `}};k([L()],A.prototype,"scenario",2);k([L()],A.prototype,"loggedIn",2);k([L()],A.prototype,"admin",2);k([L()],A.prototype,"printDisabled",2);k([L()],A.prototype,"loanLength",2);k([L()],A.prototype,"failRequests",2);k([L()],A.prototype,"entries",2);k([L()],A.prototype,"status",2);k([L()],A.prototype,"statusVersion",2);k([L()],A.prototype,"loanConfig",2);A=k([R("ia-book-actions-story")],A);export{A as IABookActionsStory};
