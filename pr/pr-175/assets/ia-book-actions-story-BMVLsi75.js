import{A as $,i as x,a as h,b as l,n as a,c as R,d as ie,m as c,s as ue,t as pe,r as L}from"./index-CpUQk1VN.js";import"./story-template-D7U1JgEu.js";import{M as V}from"./modal-manager-Crbfzd7r.js";import{l as ge}from"./localized-decorator-B_Y7B7Za.js";import"./icon-close-DL9zi9yR.js";import"./ia-status-indicator-Bp_YqKpw.js";import"./masked-icon-orr84EHH.js";class we{constructor(){this.resizeObserver=new ResizeObserver(e=>{window.requestAnimationFrame(()=>{for(const t of e){const o=this.resizeHandlers.get(t.target);o?.forEach(n=>{n.handleResize(t)})}})}),this.resizeHandlers=new Map}shutdown(){this.resizeHandlers.forEach((e,t)=>{this.resizeObserver.unobserve(t)}),this.resizeHandlers.clear()}addObserver(e){var t;const o=(t=this.resizeHandlers.get(e.target))!==null&&t!==void 0?t:new Set;o.add(e.handler),this.resizeHandlers.set(e.target,o),this.resizeObserver.observe(e.target,e.options)}removeObserver(e){const t=this.resizeHandlers.get(e.target);t&&(t.delete(e.handler),t.size===0&&(this.resizeObserver.unobserve(e.target),this.resizeHandlers.delete(e.target)))}}function E(i){return new Promise((e,t)=>{i.oncomplete=i.onsuccess=()=>e(i.result),i.onabort=i.onerror=()=>t(i.error)})}function be(i,e){let t;const o=()=>{if(t)return t;const n=indexedDB.open(i);return n.onupgradeneeded=()=>n.result.createObjectStore(e),t=E(n),t.then(s=>{s.onclose=()=>t=void 0},()=>{t=void 0}),t};return(n,s)=>o().then(r=>s(r.transaction(e,n).objectStore(e)))}let j;function G(){return j||(j=be("keyval-store","keyval")),j}function fe(i,e=G()){return e("readonly",t=>E(t.get(i)))}function me(i,e,t=G()){return t("readwrite",o=>(o.put(e,i),E(o.transaction)))}function ye(i,e=G()){return e("readwrite",t=>(t.delete(i),E(t.transaction)))}function ve(i,e){return i.openCursor().onsuccess=function(){this.result&&(e(this.result),this.result.continue())},E(i.transaction)}function Ae(i=G()){return i("readonly",e=>{if(e.getAllKeys)return E(e.getAllKeys());const t=[];return ve(e,o=>t.push(o.key)).then(()=>t)})}function Ce(i,e){return i.setMilliseconds(i.getMilliseconds()+e*1e3),i}class ke{constructor(e){var t,o,n,s;if(this.namespace=(t=e?.namespace)!==null&&t!==void 0?t:"LocalCache",this.defaultTTL=(o=e?.defaultTTL)!==null&&o!==void 0?o:900,(!((n=e?.immediateClean)!==null&&n!==void 0)||n)&&this.cleanExpired(),!e?.disableCleaning){const r=(s=e?.cleaningInterval)!==null&&s!==void 0?s:60;setInterval(()=>{this.cleanExpired()},r*1e3)}}async set(e){var t;const o={value:e.value},n=(t=e.ttl)!==null&&t!==void 0?t:this.defaultTTL,s=Ce(new Date,n);o.expires=s;const r=this.getNamespacedKey(e.key);try{await me(r,o)}catch{}}async get(e){const t=this.getNamespacedKey(e);let o;try{o=await fe(t)}catch{}if(!o)return;const n=new Date;if(o.expires&&o.expires<n){await this.delete(e);return}return o.value}async delete(e){const t=this.getNamespacedKey(e);try{await ye(t)}catch{}}async cleanExpired(){const e=await this.getAllKeys();await Promise.all(e.map(async t=>this.get(t)))}async getAllKeys(){let e=[];try{e=await Ae()}catch{}const t=[];for(const s of e)typeof s=="string"&&t.push(s);return t.filter(s=>s.startsWith(this.namespace)).map(s=>this.removeNamespace(s))}getNamespacedKey(e){return`${this.namespace}-${e}`}removeNamespace(e){return e.replace(`${this.namespace}-`,"")}}class m{static isInIframe(){try{return window.self!==window.top}catch(e){return window?.Sentry?.captureException(e),!0}}static getRedirectUrl(){let e;return m.isInIframe()?e=(window.top??window).location.href:e=window.location.href,e}static goToUrl(e,t){let o;m.isInIframe()&&t?o=(window.top??window).location:o=window.location,o.href===e?o.reload():o.href=e}static isOnStreamPage(){return window.location.href.indexOf("/stream/")>-1}static getQueryParam(e){const o=window.location.search.substring(1).split("&");for(let n=0;n<o.length;n+=1){const s=o[n].split("=");if(s[0]===e)return s[1]}return $}static getBackHref(){return window.location.href.replace(/[?&]{1}(?:admin|access)=1/,"")}static formatUrl(e,t){return/^https?:/.test(t)?t:`${e}${t}`}}const k={disconnectedCallback:"IABookActions:disconnectedCallback",bookHasRenewed:"IABookActions:handleLoanAutoRenewed - book has renewed for next one hour",bookRenewFailed:"IABookActions:handleLoanRenewNow - failed to renew",browseHasExpired:"IABookActions:browseHasExpired - one-hour loan has been expired",bookWasExpired:"IABookActions:setupLendingToolbarActions - book was expired at intial, no tokenPoller",clearTokenPoller:"IABookActions:startLoanTokenPoller - clearing token poller interval",clearOneHourTimer:"IABookActions:timerCountdown - one-hour timer interval cleared",bookAccessed:"IABookActions:bookAccessed",handleLoanTokenPoller:"IABookActions:handleLoanTokenPoller",setConsecutiveLoanCounts:"IABookActions:setConsecutiveLoanCounts",actionsHandlerService:"IABookActions:actionsHandlerService"},d=location.hostname==="localhost"||location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/)||location.host.match(/\.code\.archive\.org$/)||location.host.match(/\.dev\.archive\.org$/)||location.host.match(/^ia-petabox-/)||location.host.match(/^internetarchive/)?console.log.bind(console):()=>{};async function B(i){const e={success(){},error(){},...i};let t="/services/loans/loan";const o=window?.location,n="loan token not found. please try again later.",s="This book is not available to borrow at this time. Please try again later.",r=["browse_book","borrow_book","create_token","renew_loan","return_loan"],p=new URLSearchParams(o?.search),y=o?.hostname!=="archive.org"&&r.includes(e?.action??"")&&(p.get("error")==="true"||p.get("failAction")===e?.action),T=["localhost","internetarchive.github.io"];let D=!1;T.includes(o.hostname)&&(D=!0,t=o.href);const _=new FormData;_.append("action",String(e.action)),_.append("identifier",e.identifier);try{await fetch(t,{method:"POST",body:_}).then(async v=>y?{success:!1,error:e?.action==="create_token"?n:s}:D?e?.action=="renew_loan"||e?.action=="return_loan"?(await new Promise(U=>setTimeout(U,5e3)),{success:!0,loan:{renewal:!0}}):{success:!0,message:"operation executed successfully!"}:v.json()).then(v=>{v?.error?(d(`[IABookActions] ✗ ${e.action} failed`,v),e?.error(v)):(d(`[IABookActions] ✓ ${e.action} succeeded`,v),e?.success(v))})}catch(v){window?.Sentry?.captureException(`${k.actionsHandlerService} - Error: ${v}`),d(`[IABookActions] ✗ ${e.action} threw`,v),e?.error?.({error:String(v)})}}const I={borrow:"BookReader-ReadingBorrow",browse:"BookReader-ReadingBrowse",preview:"BookReader-Preview",satisfactionMetric:"DetailsPage-Book",bookReaderHeader:"BookReader-Header",adminAccess:"Admin-Access"},O={browse:"Borrow-1Hour",browseAgain:"Borrow-Again",browseRenew:"BookRenew",browseReturn:"BookReturn",borrow:"Borrow-14Days",waitlistJoin:"JoinWaitlist",waitlistLeave:"LeaveWaitlist",doneBorrowing:"ReturnBook",login:"LogIn",purchase:"BWBPurchase",unavailable:"Book-Unavailable",printDisability:"Print-Disability",titleBar:"Book-Title-Bar"},N={browseAutoRenew:"BookAutoRenew",browseAutoReturn:"BookAutoReturn",browseManualRenew:"BookManualRenew",browseManualReturn:"BookManualReturn"};function Le(i){return i&&decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(i).replace(/[-.+*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null}function M(i,e,t,o,n,s){return document.cookie=encodeURIComponent(i)+"="+encodeURIComponent(e)+(t?`; expires=${t.toUTCString()}`:"")+(n?`; domain=${n}`:"")+`; path=${o}`,!0}class ce{constructor(){this.gaStats={},this.lendingEventCounts=null}async storeLoanStatsCount(e,t=""){this.identifier=e;try{await this.getLoanStatsCount(t),this.sendMatrixStatsEvents(t);const o=new Date;o.setHours(o.getHours()+2),await M(this.getLoanCountStorageKey,JSON.stringify(this.lendingEventCounts),o,"/")}catch(o){d(o),this.sendEvent("Cookies-Error-Actions",o,this.identifier)}}async getLoanStatsCount(e){const t=await Le(this.getLoanCountStorageKey);this.lendingEventCounts=t===null?null:JSON.parse(t),this.gaStats=this.lendingEventCounts??{browse:0,renew:0,expire:0};let o=this.lendingEventCounts?.browse??0,n=this.lendingEventCounts?.renew??0,s=this.lendingEventCounts?.expire??0;switch(e){case"browse":o=o?Number(o)+1:1,this.gaStats.browse=o,n=0,s=0;break;case"autorenew":n=n?Number(n)+1:1,this.gaStats.renew=n;break;case"return":s=s?Number(s)+1:1,this.gaStats.expire=s,n=0,s=0;break}this.lendingEventCounts={browse:o,renew:n,expire:s}}sendMatrixStatsEvents(e){const t=I.browse,o=`browse${this.paddedNumber(this.gaStats?.browse)}-autorenew${this.paddedNumber(this.gaStats?.renew)}:${e}`;this.sendEvent(t,o,this.identifier)}paddedNumber(e){return e?e.toString().padStart(3,"0"):"000"}get getLoanCountStorageKey(){return`br-browse-${this.identifier}`}sendEvent(e,t,o,n){window?.archive_analytics?.send_event_no_sampling(e,t,o||this.identifier,n)}}class de extends x{constructor(){super(),this.waitUntillBorrowComplete=6,this.loanAnanlytics=new ce,this.bindEvents()}listen(e,t){this.addEventListener(e,t)}bindEvents(){this.listen("browseBook",async()=>{this.handleBrowseIt(),await this.loanAnanlytics?.storeLoanStatsCount(this.identifier,"browse")}),this.listen("browseBookAgain",async()=>{this.handleBrowseIt(),await this.loanAnanlytics?.storeLoanStatsCount(this.identifier,"browseagain")}),this.listen("autoRenew",({detail:e})=>{this.handleLoanRenewNow(e?.renewType)}),this.listen("autoReturn",async()=>{this.handleReturnIt(),await this.loanAnanlytics?.storeLoanStatsCount(this.identifier,"autoreturn"),this.loanAnanlytics?.sendEvent(I.browse,O.browseReturn,N.browseAutoReturn,this.identifier)}),this.listen("returnNow",({detail:e})=>{if(e?.borrowType==="browse"&&(this.loanAnanlytics?.storeLoanStatsCount(this.identifier,"return"),this.loanAnanlytics?.sendEvent(I.browse,O.browseReturn,N.browseManualReturn,this.identifier)),this.handleReturnIt("returnNow"),e?.borrowType==="borrow"){const{category:t,action:o}=e.event;this.loanAnanlytics?.sendEvent(t,o,this.identifier)}}),this.listen("borrowBook",({detail:e})=>{this.handleBorrowIt();const{category:t,action:o}=e.event;this.loanAnanlytics?.sendEvent(t,o,this.identifier)}),this.listen("loginAndBorrow",({detail:e})=>{this.handleLoginOk();const{category:t,action:o}=e.event;this.loanAnanlytics?.sendEvent(t,o,this.identifier)}),this.listen("leaveWaitlist",({detail:e})=>{this.handleRemoveFromWaitingList();const{category:t,action:o}=e.event;this.loanAnanlytics?.sendEvent(t,o,this.identifier)}),this.listen("joinWaitlist",({detail:e})=>{this.handleReserveIt();const{category:t,action:o}=e.event;this.loanAnanlytics?.sendEvent(t,o,this.identifier)}),this.listen("purchaseBook",({detail:e})=>{const{category:t,action:o}=e.event;this.loanAnanlytics?.sendEvent(t,o,this.identifier)}),this.listen("adminAccess",({detail:e})=>{const{category:t,action:o}=e.event;this.loanAnanlytics?.sendEvent(t,o,this.identifier),this.setStickyAdminAccess(!0);const n=new URL(window.location.href);n.searchParams.append("admin","1"),window.location.search=n.search}),this.listen("exitAdminAccess",({detail:e})=>{const{category:t,action:o}=e.event;this.loanAnanlytics?.sendEvent(t,o,this.identifier),this.setStickyAdminAccess(!1)}),this.listen("bookTitleBar",({detail:e})=>{const{category:t,action:o}=e.event;this.loanAnanlytics?.sendEvent(t,o,this.identifier)})}handleBrowseIt(){const e="browse_book";this.dispatchToggleActionGroup(),B({action:e,identifier:this.identifier,success:()=>{this.setBrowseTimeSession(),this.handleReadItNow()},error:t=>{this.dispatchActionError(e,t)}})}handleLoanRenewNow(e){const t="renew_loan";B({action:t,identifier:this.identifier,success:async o=>{try{d("RENEW_LOAN --- ",o,this.identifier);const n=o.loan?o.loan:void 0,s=n?.renewal;if(n&&s){await this.setBrowseTimeSession(),await this.loanAnanlytics?.storeLoanStatsCount(this.identifier,"autorenew");const r=e==="auto"?N.browseAutoRenew:N.browseManualRenew;this.loanAnanlytics?.sendEvent(I.browse,O.browseRenew,r,this.identifier),this.dispatchEvent(new CustomEvent("loanAutoRenewed",{detail:{action:t,data:{...o,loan:n}}}));return}d("RENEW_LOAN ERROR --- ",{action:t,isRenewal:s,activeLoan:n,data:o,id:this.identifier}),window?.Sentry?.captureMessage(`${k.bookRenewFailed} - Error: ${JSON.stringify(o)}`),this.dispatchActionError(t,{data:o,error:!0,message:"Loan renewal failed: no loan active."})}catch(n){d("RENEW_LOAN THREW --- ",n),window?.Sentry?.captureException(`${k.bookRenewFailed} - Exception: ${n}`),this.dispatchActionError(t,{data:o,error:!0,message:`Loan renewal failed: ${n}`})}},error:o=>{this.dispatchActionError(t,o)}})}handleReturnIt(e=""){const t="return_loan";e==="returnNow"&&this.dispatchToggleActionGroup(),B({action:t,identifier:this.identifier,success:()=>{this.deleteLoanCookies(),e==="returnNow"&&m.goToUrl(this.returnUrl,!0)},error:o=>{this.dispatchActionError(t,o)}})}handleBorrowIt(){const e="borrow_book";this.dispatchToggleActionGroup(),B({action:e,identifier:this.identifier,success:()=>{this.handleReadItNow()},error:t=>{this.dispatchActionError(e,t)}})}handleReserveIt(){const e="join_waitlist";this.dispatchToggleActionGroup(),B({action:e,identifier:this.identifier,success:()=>{m.goToUrl(m.getRedirectUrl(),!0)},error:t=>{this.dispatchActionError(e,t)}})}handleRemoveFromWaitingList(){const e="leave_waitlist";this.dispatchToggleActionGroup(),B({action:e,identifier:this.identifier,success:()=>{m.goToUrl(m.getRedirectUrl(),!0)},error:t=>{this.dispatchActionError(e,t)}})}dispatchActionError(e,t={}){this.loanAnanlytics?.sendEvent("LendingServiceError",e),this.dispatchEvent(new CustomEvent("lendingActionError",{detail:{action:e,data:t}}))}dispatchToggleActionGroup(){this.dispatchEvent(new CustomEvent("toggleActionGroup"))}handleLoginOk(){const e=`/account/login?referer=${encodeURIComponent(m.getRedirectUrl())}`;m.goToUrl(e,!0)}handleReadItNow(e){const t=new URLSearchParams(window.location.search);if(e){const r=new URLSearchParams(e);for(const[p,y]of r.entries())t.append(p,y)}const o=t.toString(),n=o?`?${o}`:"",s=window.location.origin+window.location.pathname+n;setTimeout(()=>{m.goToUrl(s,!0)},this.waitUntillBorrowComplete*1e3)}async setBrowseTimeSession(){try{const e=new Date(new Date().getTime()+this.loanTotalTime*1e3);d("[ActionsHandler] setBrowseTimeSession: resetting loanTime",{identifier:this.identifier,expireDate:e,loanTotalTime:this.loanTotalTime}),await this.localCache.set({key:`${this.identifier}-loanTime`,value:e,ttl:Number(this.loanTotalTime)}),await this.localCache.delete(`${this.identifier}-pageChangedTime`),d("[ActionsHandler] setBrowseTimeSession: loanTime reset complete",{identifier:this.identifier})}catch(e){d("[ActionsHandler] setBrowseTimeSession failed",e)}}deleteLoanCookies(){d("[ActionsHandler] deleteLoanCookies: expiring loan cookies",{identifier:this.identifier});const e=new Date;e.setTime(e.getTime()-1440*60*1e3),M(`loan-${this.identifier}=""`,"",e,"/",".archive.org"),M(`br-loan-${this.identifier}=""`,"",e,"/",".archive.org")}setStickyAdminAccess(e){const t=window.location.hostname==="localhost"?"localhost":".archive.org",o=new Date(Date.now()+720*60*60*1e3);M("sticky-admin-access",e,o,"/",t)}}const oe=h`var(--white, #fff)`,Te=h`var(--primaryDisableCTAFill, #767676)`,_e=h`var(--secondaryCTABorder, #999)`,Be=h`var(--primaryCTAFill, #194880)`,q=h`var(--primaryCTAFillRGB, 25, 72, 128)`,xe=h`var(--primaryCTABorder, #c5d1df)`,Re=h`var(--primaryErrorCTAFill, #d9534f)`,K=h`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,Se=h`var(--primaryErrorCTABorder, #d43f3a)`,Ie=h`var(--secondaryCTAFill, #333)`,J=h`var(--secondaryCTAFillRGB, 51, 51, 51)`,$e=h`var(--primaryCTABorder, #979797)`,Ee=h`#ee8950`,Pe=h`#ec7939`,Oe=h`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${oe};
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
    outline-color: ${oe};
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
    background-color: ${Te};
    border: 1px solid ${_e};
  }
  .ia-button.transparent {
    background-color: transparent;
  }
  .ia-button.warning {
    background-color: ${Ee}
    border-color: ${Pe};
  }

  .ia-button.primary {
    background-color: ${Be};
    border-color: ${xe};
  }
  .ia-button.primary:hover {
    background-color: rgba(${q}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${q}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${q}, 0.7);
  }

  .ia-button.danger {
    background-color: ${Re};
    border-color: ${Se};
  }
  .ia-button.danger:hover {
    background-color: rgba(${K}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${K}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${K}, 0.7);
  }

  .ia-button.dark {
    background-color: ${Ie};
    border-color: ${$e};
  }
  .ia-button.dark:hover {
    background-color: rgba(${J}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${J}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${J}, 0.7);
  }
`,S=h`var(--white, #fff)`,ne=h`var(--primaryBGColor, #000)`,De=h`var(--iaBookActionsDropdownBGColor, #2d2d2d)`,Ne=h`
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
    background-color: ${ne};
    border: 1px solid ${S};
  }

  .dropdown-content {
    position: absolute;
    min-width: 14rem;
    margin: 0;
    padding: 0;
    background: ${De};
    border-radius: 4px;
    border: 1px solid var(--primaryCTABorder);
    top: 3.4rem;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .dropdown-content li {
    color: ${ne};
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
`,se=700,Me=800,Fe=l`<svg
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
</svg>`,He=l`<svg
  height="4"
  viewBox="0 0 8 4"
  width="8"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
    fill="#fff"
  />
</svg>`,Z=l`<svg
  height="4"
  viewBox="0 0 8 4"
  width="8"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
    fill="#fff"
  />
</svg>`;var ze=Object.defineProperty,Ge=Object.getOwnPropertyDescriptor,b=(i,e,t,o)=>{for(var n=o>1?void 0:o?Ge(e,t):e,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=(o?r(e,t,n):r(n))||n);return o&&n&&ze(e,t,n),n};let w=class extends de{constructor(){super(...arguments),this.userid="",this.identifier="",this.primaryActions=[],this.secondaryActions=[],this.primaryColor="",this.dropdownState="close",this.width=0,this.hasAdminAccess=!1,this.dropdownArrow=Z,this.disabled=!1,this.returnUrl="",this.autoRenew=!1,this.loanRenewType="",this.autoReturn=!1,this.returnNow=!1,this.loaderIcon="https://archive.org/upload/images/tree/loading.gif",this.initialButton=!1}updated(i){(i.has("width")||i.has("disabled"))&&this.isBelowTabletContainer&&this.resetActions(),i.has("autoRenew")&&this.autoRenew&&this.dispatchLoanEvent("autoRenew",{renewType:this.loanRenewType});const e=i.has("autoReturn")&&this.autoReturn;e&&this.dispatchLoanEvent("autoReturn"),i.has("returnNow")&&this.returnNow&&!e&&this.dispatchLoanEvent("returnNow",{borrowType:"browse"})}dispatchLoanEvent(i,e){this.dispatchEvent(new CustomEvent(i,{detail:e}))}resetActions(){this.primaryActions.length&&(this.primaryActions=this.primaryActions.concat(this.secondaryActions),this.primaryColor=this.primaryActions[0].className,this.hasAdminAccess&&this.sortActionButtonOrder(),this.secondaryActions=[])}sortActionButtonOrder(){let i=1;const e=0;this.secondaryActions.length===2&&(i=2),i=this.primaryActions.length-i;const t=this.primaryActions[i],o=this.primaryActions;o.splice(i,1),o.splice(e,0,t),this.primaryActions=o}render(){return l`
      <div
        class="${ie({actiongroup:!0,disabled:this.disabled})}"
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
        ${i.id==="purchaseBook"?Fe:""} ${i.text}
        <small>${i.subText}</small>
      </a>
    </span>`}renderActionButton(i,e=!1){if(i.url)return this.renderActionLink(i,e);const{analyticsEvent:t}=i;return l`<button
      class="ia-button ${i.className} ${e?"initial":""}"
      @click=${()=>{this.clickHandler(i.id,t,i?.borrowType)}}
    >
      ${i.text}
    </button>`}clickHandler(i,e,t=""){if(this.dropdownState="close",this.dropdownArrow=Z,!e||!i)return;const{category:o,action:n}=e;this.dispatchEvent(new CustomEvent(i,{detail:{event:{category:o,action:n},borrowType:t}}))}get initialActionTemplate(){return this.initialButton=!1,this.primaryActions.length>1&&(this.initialButton=!0),this.renderActionButton(this.primaryActions[0],this.initialButton)}get getPrimaryItems(){return this.primaryActions.slice(1).map(i=>l`<li>${this.renderActionButton(i,this.initialButton)}</li>`)}get getLoaderIcon(){return l`<img
      class="${ie({actionloader:!0,disabled:this.disabled})}"
      alt=""
      src="${this.loaderIcon}"
    />`}get isBelowTabletContainer(){return this.width<=Me}get getDeviceType(){return this.isBelowTabletContainer?"mobile":"desktop"}toggleDropdown(){this.dropdownState==="open"?(this.dropdownState="close",this.dropdownArrow=Z,this.primaryColor=this.primaryActions[0].className):(this.dropdownState="open",this.dropdownArrow=He,this.primaryColor="dark")}static get styles(){return[Oe,Ne]}};b([a({type:String})],w.prototype,"userid",2);b([a({type:String})],w.prototype,"identifier",2);b([a({type:Array})],w.prototype,"primaryActions",2);b([a({type:Array})],w.prototype,"secondaryActions",2);b([a({type:String})],w.prototype,"primaryColor",2);b([a({type:String})],w.prototype,"dropdownState",2);b([a({type:Number})],w.prototype,"width",2);b([a({type:Boolean})],w.prototype,"hasAdminAccess",2);b([a({attribute:!1})],w.prototype,"dropdownArrow",2);b([a({type:Boolean})],w.prototype,"disabled",2);b([a({type:String})],w.prototype,"returnUrl",2);b([a({type:Boolean})],w.prototype,"autoRenew",2);b([a({type:String})],w.prototype,"loanRenewType",2);b([a({type:Boolean})],w.prototype,"autoReturn",2);b([a({type:Boolean})],w.prototype,"returnNow",2);b([a({type:String})],w.prototype,"loaderIcon",2);w=b([R("ia-book-actions-collapsible-action-group")],w);const Ue=l`
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
`;var We=Object.defineProperty,Ve=Object.getOwnPropertyDescriptor,X=(i,e,t,o)=>{for(var n=o>1?void 0:o?Ve(e,t):e,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=(o?r(e,t,n):r(n))||n);return o&&n&&We(e,t,n),n};let F=class extends de{constructor(){super(...arguments),this.identifier="",this.bookTitle="",this.analyticsCategories=I,this.analyticsActions=O}clickHandler(){const{category:i,action:e}={category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.titleBar};this.dispatchEvent(new CustomEvent("bookTitleBar",{detail:{event:{category:i,action:e}}}))}render(){return l`
      <a
        class="embed-link"
        @click=${()=>{this.clickHandler()}}
        href="/details/${this.identifier}"
      >
        <span>${Ue}</span>
        <span class="title">${this.bookTitle}</span>
      </a>
    `}static get styles(){return h`
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
    `}};X([a({type:String})],F.prototype,"identifier",2);X([a({type:String})],F.prototype,"bookTitle",2);F=X([R("ia-book-actions-title-bar")],F);var je=Object.defineProperty,qe=Object.getOwnPropertyDescriptor,ee=(i,e,t,o)=>{for(var n=o>1?void 0:o?qe(e,t):e,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=(o?r(e,t,n):r(n))||n);return o&&n&&je(e,t,n),n};let H=class extends x{constructor(){super(...arguments),this.texts="",this.textClass=""}render(){return l`
      <span class="variable-texts ${this.textClass}">${this.texts}</span>
    `}static get styles(){return h`
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
    `}};ee([a({type:String})],H.prototype,"texts",2);ee([a({type:String})],H.prototype,"textClass",2);H=ee([R("ia-book-actions-text-group")],H);const Ke=l`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="m0 0h100v100h-100z" fill="#000"/>
    <path d="m49.8315487 0h.1702245c6.7356878 0 13.1853038 1.31117332 19.3488483 3.93351997 6.1635444 2.62234664 11.4854233 6.15778963 15.9656369 10.60632903 4.4802135 4.4485394 8.0478347 9.7522946 10.7028636 15.9112655 2.655029 6.1589709 3.980878 12.6038012 3.9789971 19.3344909.0567419 6.6716279-1.1702933 13.0585776-3.6811042 19.1608491-2.510811 6.1022715-6.106803 11.5206067-10.7879759 16.2550055-9.7027949 9.7522946-21.4884754 14.6851412-35.3570414 14.79854h-.1702244c-6.7333236 0-13.1829397-1.3111733-19.3488483-3.93352-6.1659087-2.6223466-11.4877876-6.1577896-15.9656369-10.606329s-8.04547055-9.7522946-10.7028637-15.9112655c-2.65739314-6.1589709-3.9844243-12.6038012-3.98254337-19.3344909-.05674149-6.6716279 1.17029325-13.0585776 3.68110421-19.1608491 2.51081095-6.1022715 6.10680292-11.5206067 10.78797586-16.2550055 9.7027949-9.75229456 21.4884754-14.68514123 35.3570414-14.79854zm12.6566146 26.4757998c1.6745578-1.6828001 2.5118367-3.6747334 2.5118367-5.9757998 0-2.4126333-.8095238-4.4324583-2.4285714-6.059475s-3.6289796-2.440525-6.0297959-2.440525c-2.4008164 0-4.4107483.8135083-6.029796 2.440525-1.6745578 1.6270167-2.5118367 3.6468417-2.5118367 6.059475 0 2.1871753.8372789 4.1791086 2.5118367 5.9757998 1.6745579 1.6828001 3.6844898 2.5242002 6.029796 2.5242002 2.3453061 0 4.3274829-.8414001 5.9465306-2.5242002zm-12.1370589 52.7776981-1.2815282-.9486968c0-.4588935.398855-1.8938272 1.196565-4.3048011l12.7338588-39-23.0745876 3.6164609.2548896 3.873251c0-.1141289.4554971-.1997256 1.3664914-.2567901.9109942 0 1.623741.1723823 2.1382404.5171468.5121392.2306356.7965299.6039323.8531721 1.1198902 0 .8607225-.6549247 3.2134431-1.9647739 7.0581619l-8.1175252 24.1061729c-1.0242785 3.2716963-1.5080967 5.5388203-1.4514546 6.8013717.0566421 1.6643804.8826732 2.9839963 2.4780932 3.9588477 1.2532071.803658 2.8769482 1.205487 4.8712231 1.205487h.5982825c1.7653464-.0570645 3.8445846-.3875629 6.2377146-.9914952 2.3931299-.6039323 4.3590839-1.3933242 5.8978617-2.3681756 1.3098493-.803658 2.3919499-1.5359853 3.2463021-2.1969821.8543521-.6609968 1.3959925-1.1341564 1.6249211-1.4194788l.3433929-.3459533-2.8214861-3.3596708-2.9914125 2.0650205c-.79771.4588935-1.5104568.7454047-2.1382404.8595337z" class="fill-color" fill="#fff" fill-rule="nonzero"/>
</svg>
`;class Je extends x{static get styles(){return h`
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
    `}render(){return Ke}}customElements.define("ia-icon-info",Je);var Ze=Object.defineProperty,Ye=Object.getOwnPropertyDescriptor,he=(i,e,t,o)=>{for(var n=o>1?void 0:o?Ye(e,t):e,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=(o?r(e,t,n):r(n))||n);return o&&n&&Ze(e,t,n),n};let Q=class extends x{constructor(){super(...arguments),this.iconClass="",this.helpURL="https://help.archive.org/help/borrowing-from-the-lending-library"}render(){return l`
      <a
        class="more-info-icon ${this.iconClass}"
        href=${this.helpURL}
        target="_blank"
        title=${c("Get more info on borrowing from The Lending Library")}
        data-event-click-tracking="BookReader|BrowsableMoreInfo"
      >
        <ia-icon-info></ia-icon-info>
      </a>
    `}static get styles(){return h`
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
    `}};he([a({type:String})],Q.prototype,"iconClass",2);Q=he([R("ia-book-actions-info-icon"),ge()],Q);var Qe=Object.defineProperty,Xe=Object.getOwnPropertyDescriptor,te=(i,e,t,o)=>{for(var n=o>1?void 0:o?Xe(e,t):e,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=(o?r(e,t,n):r(n))||n);return o&&n&&Qe(e,t,n),n};let z=class extends x{constructor(){super(...arguments),this.secondsLeftOnLoan=0,this.displayTime=!1}get minutesLeftOnLoan(){const i=Math.ceil(Math.round(this.secondsLeftOnLoan)/60);return i<10?`0:0${i}`:i===60?"1:00":`0:${i}`}get remainingTime(){return`${this.minutesLeftOnLoan} minutes`}render(){const i=this.displayTime?"view":"hide";return l`
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
    `}static get styles(){return h`
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
    `}};te([a({type:Number})],z.prototype,"secondsLeftOnLoan",2);te([a({type:Boolean})],z.prototype,"displayTime",2);z=te([R("ia-book-actions-timer-countdown")],z);window.IALendingIntervals={tokenPoller:0,timerCountdown:0,browseExpireTimeout:0,clearTokenPoller:()=>{window.clearInterval(window.IALendingIntervals.tokenPoller),window.IALendingIntervals.tokenPoller=0},clearTimerCountdown:()=>{window.clearInterval(window.IALendingIntervals.timerCountdown),window.IALendingIntervals.timerCountdown=0},clearBrowseExpireTimeout:()=>{window.clearTimeout(window.IALendingIntervals.browseExpireTimeout),window.IALendingIntervals.browseExpireTimeout=0},clearAll:()=>{window?.IALendingIntervals?.clearTokenPoller(),window?.IALendingIntervals?.clearTimerCountdown(),window?.IALendingIntervals?.clearBrowseExpireTimeout()}};class et{constructor(e,t,o={},n=""){this.printDisabilityLink="/details/printdisabled?tab=about",this.analyticsCategories=I,this.analyticsActions=O,this.userid=e,this.identifier=t,this.lendingStatus=o,this.bwbPurchaseUrl=n}firstBrowseConfig(){return{id:"browseBook",text:c("Borrow"),className:"primary",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.browse}}}browseAgainConfig(){return{id:"browseBookAgain",text:c("Borrow"),className:"primary",analyticsEvent:{category:this.analyticsCategories.browse,action:this.analyticsActions.browseAgain}}}returnBookConfig(){const e=this.lendingStatus.user_has_browsed?this.analyticsCategories.browse:this.analyticsCategories.borrow;return{id:"returnNow",text:c("Return now"),className:"danger",analyticsEvent:{category:e,action:this.analyticsActions.doneBorrowing},borrowType:this.lendingStatus.user_has_browsed?"browse":"borrow"}}borrowBookConfig(e=!1){return!this.lendingStatus.available_to_borrow&&!this.lendingStatus.user_is_printdisabled||this.lendingStatus.user_has_borrowed?null:{id:"borrowBook",text:c("Borrow for 14 days"),className:"primary",disabled:e,analyticsEvent:{category:this.lendingStatus.user_has_browsed?this.analyticsCategories.browse:this.analyticsCategories.preview,action:this.analyticsActions.borrow}}}loginAndBorrowBookConfig(){return{id:"loginAndBorrow",text:c("Log In and Borrow"),className:"primary",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.login}}}leaveWaitlistConfig(){return{id:"leaveWaitlist",text:c("Leave Waitlist"),className:"dark",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.waitlistLeave}}}loginAndWaitlistConfig(){return{id:"loginAndWaitlist",text:c("Log In and Join Waitlist"),className:"warning",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.login}}}waitlistConfig(){const e=!!this.userid,t=this.lendingStatus||{};return!t.available_to_waitlist||t.available_to_borrow?null:e?{id:"joinWaitlist",text:c("Join Waitlist"),className:"warning",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.waitlistJoin}}:this.loginAndWaitlistConfig()}purchaseConfig(){return this.bwbPurchaseUrl?{id:"purchaseBook",text:c("Purchase at "),subText:"Better World Books",title:c("Purchase"),url:this.bwbPurchaseUrl,target:"_blank",className:"purchase dark",analyticsEvent:{category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.purchase}}:null}printDisabilityConfig(){return this.lendingStatus.user_is_printdisabled?null:{id:"printDisability",text:c("Print Disability Access"),title:c("Print Disability Access"),url:this.printDisabilityLink,target:"_self",className:"print-disability",analyticsEvent:{category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.printDisability}}}adminAccessConfig(){return this.lendingStatus.user_has_borrowed||!this.lendingStatus.isAdmin?null:{id:"adminAccess",text:c("Admin Access"),title:c("You have administrative privileges to read this book"),className:"danger",analyticsEvent:{category:this.analyticsCategories.adminAccess,action:this.analyticsActions.borrow}}}adminOrPrintDisabledExitConfig(){return{id:"exitAdminAccess",text:m.getQueryParam("admin")==="1"?c("← Exit admin access mode"):c("← Exit print-disabled access mode"),url:m.getBackHref(),target:"_self",className:"exit-admin",analyticsEvent:{category:this.analyticsCategories.adminAccess,action:this.analyticsActions.doneBorrowing}}}unavailableBookConfig(){return{id:"borrowUnavailable",text:c("Borrow Unavailable"),className:"primary unavailable",disabled:!0,analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.unavailable}}}isEmbed(e){return{primaryTitle:`<img src=/images/glogo-jw.png> <a href=/details/${this.identifier}>${e}</a>`,primaryActions:[],primaryColor:""}}}const f={get available_1hr(){return c("Renews automatically with continued use.")},get available_14d(){return c("This book can be borrowed for 14 days.")},get available_pd(){return c("Book available to patrons with print disabilities.")},get available_waitlist(){return c("A waitlist is available.")},get admin_access(){return c("You have administrative privileges to read this book.")},get claim_waitlist(){return c("You are at the top of the waitlist for this book.")},get being_borrowed(){return c("Another patron is using this book. Please check back later.")},get eligible_pd(){return c("You are eligible for print-disabled access.")},get on_waitlist(){return c("You are on the waitlist for this book.")},get session_expired(){return c("Renews automatically with continued use.")},get unavailable(){return c("This book is not available at this time.")}};function re(i,e){return i!==void 0&&e!==void 0&&i>=e}class tt{constructor(e,t,o,n){this.userid=e,this.identifier=t,this.lendingStatus=o,this.bwbPurchaseUrl=n,this.actionsConfig=new et(this.userid,this.identifier,this.lendingStatus,this.bwbPurchaseUrl)}onlyAdminAction(){return{primaryTitle:f.admin_access,primaryActions:[],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}adminOrPrintDisabledReadingAction(){return{primaryTitle:"",primaryActions:[],secondaryActions:[this.actionsConfig.adminOrPrintDisabledExitConfig()],borrowType:"adminBorrowed"}}patronIsReadingAction(){const e=this.lendingStatus||{},t=re(e.loanCount,e.maxLoans);let o="";const n=e.user_has_browsed&&!e.browsingExpired;return n?o=f.available_1hr:o=c(ue`Your loan of this book has ${e.daysLeftOnLoan} days left.`),{primaryTitle:o,primaryActions:[this.actionsConfig.returnBookConfig(),this.actionsConfig.borrowBookConfig(t),this.actionsConfig.waitlistConfig(),this.actionsConfig.printDisabilityConfig()],primaryColor:"danger",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()],borrowType:n?"browsed":"borrowed"}}claimWaitlistAction(){const e=this.lendingStatus||{},t=this.actionsConfig.leaveWaitlistConfig(),o=this.actionsConfig.borrowBookConfig(),n=e.available_to_browse?this.actionsConfig.firstBrowseConfig():null,s=[o];return n&&s.push(n),s.push(t),{primaryTitle:f.claim_waitlist,primaryActions:s,primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrowPrintDisabledAction(){return{primaryTitle:f.eligible_pd,primaryActions:[this.actionsConfig.borrowBookConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}onlyPrintDisabledAction(){const e=this.lendingStatus.isAdmin?null:this.actionsConfig.unavailableBookConfig();return{primaryTitle:f.available_pd,primaryActions:[e],primaryColor:"primary",secondaryActions:[]}}onWaitlistAction(){return{primaryTitle:f.on_waitlist,primaryActions:[this.actionsConfig.leaveWaitlistConfig(),this.actionsConfig.firstBrowseConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}restrictedAction(){const e=this.lendingStatus||{};return{primaryTitle:e.max_browsable_copies&&!e.available_lendable_copies?f.being_borrowed:f.unavailable,primaryActions:[this.actionsConfig.unavailableBookConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}loggedOutOptions(){const e=this.lendingStatus||{},t=!e.available_to_waitlist&&!e.available_to_borrow,o=this.actionsConfig.waitlistConfig();let n=null;e.available_to_borrow||e.available_to_browse?n=this.actionsConfig.loginAndBorrowBookConfig():t&&(n=this.actionsConfig.unavailableBookConfig());const s=this.actionsConfig.printDisabilityConfig(),r=[n,o,s].filter(y=>y!==null);return{primaryTitle:e.available_to_browse?f.available_1hr:e.available_to_borrow?f.available_14d:f.unavailable,primaryActions:r,primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrow1HrAction(){const e=this.lendingStatus||{},t=!e.available_to_browse&&e.browsingExpired,o=e.available_to_browse||t,n=o&&e.available_to_borrow,s=o&&!e.available_to_borrow&&e.available_to_waitlist,r=o&&!e.available_to_borrow&&!e.available_to_waitlist,p=e.available_browsable_copies,y=e.max_browsable_copies,T=p!==void 0&&y!==void 0&&p<1&&p<y,D=t?f.session_expired:!o&&T?f.being_borrowed:!o&&e.available_to_waitlist?f.available_waitlist:f.available_1hr,_=t?this.actionsConfig.browseAgainConfig():this.actionsConfig.firstBrowseConfig(),v=this.actionsConfig.borrowBookConfig(),U=this.actionsConfig.waitlistConfig(),W=this.actionsConfig.printDisabilityConfig();return{primaryTitle:D,primaryActions:r?[_,W]:n?[_,v,W]:s?[_,U,W]:[],primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrowAction(){const e=this.lendingStatus||{};if(!!!this.userid)return this.loggedOutOptions();if(e.available_to_browse||e.browsingExpired)return this.borrow1HrAction();let o=null;const n=this.actionsConfig.waitlistConfig(),s=this.actionsConfig.printDisabilityConfig(),r=re(e.loanCount,e.maxLoans);!e.available_to_borrow&&!n?o=this.actionsConfig.unavailableBookConfig():e.available_to_borrow&&(o=this.actionsConfig.borrowBookConfig(r));const y=[o,n,s].filter(T=>T!==null);return{primaryTitle:n?f.being_borrowed:"",primaryActions:y,primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}getBrowseCountdownTitle(){const e=Number(this.lendingStatus.secondsLeftOnLoan),t=new Date(+new Date+e*1e3);let o=t.getHours()%12;const n=(""+t.getMinutes()).replace(/^(\d{1})$/,"0$1"),s=t.getHours()>11?" PM":" AM";return o===0&&(o=12),"Borrow ends at "+o+":"+n+s}getCurrentLendingActions(){let e;const t=this.lendingStatus||{},o=m.getQueryParam("admin")=="1"&&t.isAdmin,n=m.getQueryParam("access")=="1"&&t.user_is_printdisabled,s=t.user_has_borrowed||t.user_has_browsed&&!t.browsingExpired,r=!t.user_has_borrowed&&!t.user_has_browsed,p=!t.available_to_borrow&&!t.available_to_browse,y=t.is_printdisabled&&t.user_is_printdisabled,T=(t.available_to_browse||t.available_to_borrow)&&r&&!t.user_on_waitlist;return o||n?e=this.adminOrPrintDisabledReadingAction():t.isAdmin&&r&&p?e=this.onlyAdminAction():s?e=this.patronIsReadingAction():t.user_can_claim_waitlist?e=this.claimWaitlistAction():y?e=this.borrowPrintDisabledAction():T||t.browsingExpired?e=this.borrowAction():t.isPrintDisabledOnly?e=this.onlyPrintDisabledAction():t.user_on_waitlist?e=this.onWaitlistAction():e=this.restrictedAction(),e}}class it{constructor(e){this.loanAnalytics=new ce;const{identifier:t,borrowType:o,successCallback:n,errorCallback:s,pollerDelay:r,skipInitialCall:p=!1}=e;this.identifier=t,this.borrowType=o,this.successCallback=n,this.errorCallback=s,this.pollerDelay=r,this.skipInitialCall=p===!0,this.bookAccessed()}disconnectedCallback(){window?.IALendingIntervals?.clearTokenPoller()}async bookAccessed(){this.borrowType?(this.skipInitialCall?d("[LoanTokenPoller] skipping initial create_token — already minted by the renewal response",{identifier:this.identifier}):this.handleLoanTokenPoller(!0),this.borrowType!=="adminBorrowed"&&(window.IALendingIntervals.tokenPoller=setInterval(()=>{this.handleLoanTokenPoller()},this.pollerDelay*1e3))):(window?.Sentry?.captureMessage(`${k.bookAccessed} - not borrowed`),this.disconnectedCallback())}async handleLoanTokenPoller(e=!1){const t="create_token";d("[LoanTokenPoller] create_token requested",{identifier:this.identifier,isInitial:e}),B({identifier:this.identifier,action:t,error:o=>this.handleTokenError(o,e),success:()=>{d("[LoanTokenPoller] create_token succeeded",{identifier:this.identifier,isInitial:e}),e&&this.successCallback()}})}handleTokenError(e,t){const o="create_token";d("[LoanTokenPoller] create_token failed",{identifier:this.identifier,isInitial:t,error:e?.error}),this.errorCallback({detail:{action:o,data:e,isInitial:t}}),window?.Sentry?.captureMessage(`${k.handleLoanTokenPoller} - Error: ${JSON.stringify(e)}`),this.loanAnalytics?.sendEvent("LendingServiceLoanError",o,this.identifier)}}class ot{constructor(e,t,o,n){this.loanRenewMessage="This book has been renewed for #time #unitsOfTime.",this.loanReturnWarning="Go to any other page to keep your loan active.",this.result={texts:null,renewNow:!1,renewType:""},this.hasPageChanged=e,this.identifier=t,this.localCache=o,this.loanRenewTimeConfig=n}handleLoanRenew(){try{return this.hasPageChanged?this.pageChanged():this.autoChecker()}catch(e){d(e)}return $}async pageChanged(){const{loanRenewAtLast:e}=this.loanRenewTimeConfig,t=new Date,o=await this.localCache.get(`${this.identifier}-loanTime`),n=this.changeTime(o,e,"sub");return n!==null&&t>=n&&(this.result={texts:this.loanRenewMessage,renewNow:!0,renewType:"auto"}),this.setPageChangedTime(),this.result}async autoChecker(){const{pageChangedInLast:e}=this.loanRenewTimeConfig,t=await this.localCache.get(`${this.identifier}-pageChangedTime`),o=this.changeTime(new Date,e,"sub");return t===void 0||t<=o?this.result={texts:this.loanReturnWarning,renewNow:!1,renewType:""}:t>=o&&(this.result={texts:"",renewNow:!0,renewType:"auto"}),this.result}async setPageChangedTime(){await this.localCache.set({key:`${this.identifier}-pageChangedTime`,value:new Date,ttl:Number(this.loanRenewTimeConfig.loanTotalTime)})}getMessageTexts(e,t){let o="minute",n=e,s=t;return s=Math.ceil(s/60),s>59&&(s=1,o="hour"),n=n?.replace(/#time/,String(s)),n?.replace(/#unitsOfTime/,s!==1?`${o}s`:o)}changeTime(e,t,o){return e===void 0?null:o==="sub"?new Date(e.getTime()-t*1e3):new Date(e.getTime()+t*1e3)}}const nt=l`<svg
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
</svg> `;var st=Object.defineProperty,rt=Object.getOwnPropertyDescriptor,g=(i,e,t,o)=>{for(var n=o>1?void 0:o?rt(e,t):e,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=(o?r(e,t,n):r(n))||n);return o&&n&&st(e,t,n),n};const at={browseExpired:"IABookReader:BrowsingHasExpired"},P={iaButton:"min-height:3.5rem;cursor:pointer;color:white;border-radius:0.4rem;border:1px solid #c5d1df;padding:4px 8px;width:auto;user-select:none;",renew:"background:#194880;width:110px;",return:"background:#d9534f;width:120px;",refresh:"background:none;font-size:inherit;border:0;padding:0;color:#0000ee;cursor:pointer;text-decoration:underline"};function ae(i){return Math.round((Number(i)-Date.now())/1e3)}let u=class extends x{constructor(){super(...arguments),this.userid="",this.identifier="",this.bookTitle="",this.returnUrl="",this.lendingStatus={},this.width=0,this.bwbPurchaseUrl="",this.lendingBarPostInit=()=>{},this.reloadPageImages=()=>{},this.barType="action",this.disableActionGroup=!1,this.tokenDelay=120,this.timerExecutionSeconds=30,this.loaderIcon="https://archive.org/upload/images/tree/loading.gif",this.loanRenewTimeConfig={loanTotalTime:3600,loanRenewAtLast:660,pageChangedInLast:900},this.loanRenewResult={texts:"",renewNow:!1,secondsLeft:0,renewType:""},this.postInitComplete=!1,this.primaryActions=[],this.primaryTitle="",this.primaryColor="primary",this.secondaryActions=[],this.borrowType=null,this.loanRenewInProgress=!1,this.recoveringFromLoanExpiry=!1,this.skipNextInitialTokenCall=!1,this.warningModalOpen=!1,this.warningModalDismissed=!1}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.bindLoanRenewEvents()}disconnectedCallback(){super.disconnectedCallback(),this.unbindLoanRenewEvents(),clearTimeout(this.pollerStartTimeout),clearTimeout(this.renewNowTimeout),window?.IALendingIntervals?.clearAll(),this.tokenPoller?.disconnectedCallback(),this.sentryCaptureMsg(k.disconnectedCallback),this.disconnectResizeObserver()}sentryCaptureMsg(i){window?.Sentry?.captureMessage(i)}firstUpdated(){this.bindLoanRenewEvents(),this.localCache=new ke({namespace:"loanRenew"}),this.sharedObserver||(this.sharedObserver=new we,this.setupResizeObserver())}updated(i){(i.has("lendingStatus")||i.has("bwbPurchaseUrl"))&&this.setupLendingToolbarActions(),i.has("sharedObserver")&&(this.disconnectResizeObserver(),this.setupResizeObserver()),i.has("loanRenewResult")&&this.loanRenewResult.renewNow&&(this.loanRenewInProgress=!0,window.IALendingIntervals.clearAll())}handleResize(i){const{target:e}=i;if(e!==this)return;const{contentRect:t}=i;this.width=Math.round(t.width)}disconnectResizeObserver(){this.sharedObserver?.removeObserver({handler:this,target:this})}setupResizeObserver(){this.shadowRoot&&this.sharedObserver?.addObserver({handler:this,target:this})}applyLendingActions(){this.lendingOptions=new tt(this.userid,this.identifier,this.lendingStatus,this.bwbPurchaseUrl);const i=this.lendingOptions.getCurrentLendingActions();if(!i)return!1;const e=t=>t!=null;return this.primaryTitle=i.primaryTitle,this.primaryActions=i.primaryActions?.filter(e),this.primaryColor=i.primaryColor,this.secondaryActions=i.secondaryActions?.filter(e),this.borrowType=i.borrowType?i.borrowType:null,!0}async setupLendingToolbarActions(){const i="browsingExpired"in this.lendingStatus&&this.lendingStatus?.browsingExpired;if(i){this.primaryActions?.length?d("[IABookActions] browsing expired — leaving action bar untouched"):(d("[IABookActions] browsing expired on first render — populating action bar"),this.applyLendingActions()),this.tokenPoller||this.sentryCaptureMsg(k.bookWasExpired),window?.IALendingIntervals?.clearAll(),this.dispatchEvent(new Event(at.browseExpired,{bubbles:!0,cancelable:!1,composed:!0}));return}if(this.applyLendingActions()){if(this.requestUpdate(),this.borrowType==="browsed"&&!this.loanRenewInProgress&&(await this.startTimerCountdown(),await this.startBrowseTimer()),!this.borrowType||this.barType==="title"){this.lendingBarPostInit();return}clearTimeout(this.pollerStartTimeout),this.pollerStartTimeout=setTimeout(()=>{if(!i&&!this.loanRenewInProgress&&!window.IALendingIntervals.tokenPoller){const e=this.skipNextInitialTokenCall;this.skipNextInitialTokenCall=!1,this.recoveringFromLoanExpiry=!1,this.startLoanTokenPoller(e)}},100)}}isBookReaderInitAction(i){return i?.detail?.props?.init?.initComplete===!1}bindLoanRenewEvents(){this.unbindLoanRenewEvents(),this.userActionHandler=i=>{if(this.isBookReaderInitAction(i)){d("[IABookActions] BookReader:userAction ignored — fired by BookReader init");return}const e=this.lendingStatus.browsingExpired;d("[IABookActions] BookReader:userAction received",{borrowType:this.borrowType,browsingExpired:e}),e&&this.autoRenewExpiredLoan(),this.borrowType==="browsed"&&!e&&this.autoLoanRenewChecker(!0)},window.addEventListener("BookReader:userAction",this.userActionHandler),this.visibilityChangeHandler=async()=>{if(document.hidden){d("[IABookActions] visibilitychange: tab backgrounded");return}d("[IABookActions] visibilitychange: tab foregrounded",this.borrowType);try{if(this.lendingStatus.browsingExpired===!0){this.autoRenewExpiredLoan();return}if(this.borrowType!=="browsed")return;if(this.lendingStatus.browsingExpired===!1){const i=await this.localCache.get(`${this.identifier}-loanTime`),e=ae(i);e>=this.timerExecutionSeconds?this.loanStatusCheckInterval(Number(e)):(window?.IALendingIntervals?.clearAll(),this.autoRenewExpiredLoan())}}catch(i){d("[IABookActions] visibilitychange handler failed",i),this.sentryCaptureMsg(`visibilitychange handler failed: ${i}`)}},document.addEventListener("visibilitychange",this.visibilityChangeHandler)}unbindLoanRenewEvents(){this.userActionHandler&&(window.removeEventListener("BookReader:userAction",this.userActionHandler),this.userActionHandler=void 0),this.visibilityChangeHandler&&(document.removeEventListener("visibilitychange",this.visibilityChangeHandler),this.visibilityChangeHandler=void 0)}async autoLoanRenewChecker(i=!1){this.loanRenewInProgress||(this.loanRenewHelper=new ot(i,this.identifier,this.localCache,this.loanRenewTimeConfig),await this.loanRenewHelper.handleLoanRenew(),this.loanRenewResult=this.loanRenewHelper.result)}autoRenewExpiredLoan(){if(this.loanRenewInProgress){d("[IABookActions] autoRenewExpiredLoan: skipped, renewal already in progress",{identifier:this.identifier});return}d("[IABookActions] autoRenewExpiredLoan: starting silent renewal",{identifier:this.identifier}),this.loanRenewInProgress=!0,this.recoveringFromLoanExpiry=!0,this.modal?.closeModal(),this.lendingStatus={...this.lendingStatus,browsingExpired:!1},clearTimeout(this.renewNowTimeout),this.renewNowTimeout=setTimeout(()=>{this.loanRenewResult={texts:"",renewNow:!0,renewType:"auto"}},0)}get modal(){const i=document.body.querySelector("modal-manager");return i?.setAttribute("id","action-bar-modal"),i}async showWarningModal(){if(this.warningModalOpen)return;this.warningModalOpen=!0,d("[IABookActions] showWarningModal");const{texts:i,secondsLeft:e}=this.loanRenewResult;let t=e;t===void 0||t<=0?t=this.lendingStatus.secondsLeftOnLoan:t=t>60?t:60,this.modal.customModalContent=void 0,this.modal?.closeModal(),this.loanRenewResult={texts:"",renewNow:!1};const o=new V({headline:l`${c("Are you still there?")}`,headerColor:"#194880",showCloseButton:!1,closeOnBackdropClick:!1,message:l`<span>
        ${this.loanRenewHelper?.getMessageTexts(i,Number(t))}
        <a
          href="https://help.archive.org/help/borrowing-from-the-lending-library"
          target="_blank"
          title=${c("Get more info on borrowing from The Lending Library")}
          data-event-click-tracking="BookReader|BrowsableMoreInfo"
          style="display:inline-block;vertical-align:middle;line-height:0;margin-left:4px;"
        >
          ${nt}
        </a>
      </span>`}),n=l`
      <div
        id="book-action-bar-custom-buttons"
        style="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px;margin-top:10px;"
      >
        <button
          style="${P.iaButton} ${P.renew}"
          @click=${()=>this.dismissWarningModal()}
        >
          ${c("Okay")}
        </button>
      </div>
    `;this.modal.setAttribute("aria-live","assertive"),await this.modal?.showModal({config:o,customModalContent:n})}dismissWarningModal(){this.modal?.closeModal(),this.warningModalOpen=!1,this.warningModalDismissed=!0}async browseHasExpired(){d("[IABookActions] browseHasExpired",{identifier:this.identifier,loanRenewInProgress:this.loanRenewInProgress}),window?.IALendingIntervals?.clearAll();const i={...this.lendingStatus,browsingExpired:!0,secondsLeftOnLoan:0};this.lendingStatus=i,await this.localCache.delete(`${this.identifier}-loanTime`),await this.localCache.delete(`${this.identifier}-pageChangedTime`),d("[IABookActions] browseHasExpired: cleared loanTime/pageChangedTime cache",{identifier:this.identifier}),this.loanRenewResult.renewNow=!1,this.loanRenewResult.texts=c("This book has been returned due to inactivity."),this.modal?.closeModal(),this.warningModalOpen=!1,this.sentryCaptureMsg(k.browseHasExpired)}async showLoanUnavailableModal(i){const e=new V({showCloseButton:!1,closeOnBackdropClick:!1,headerColor:"#d9534f",message:l`${i||c("Due to inactivity, this book was returned, and someone else has now borrowed it. Please try again later.")}`}),t=l`<br />
      <div style="text-align: center">
        <button
          style="${P.iaButton} ${P.return}"
          @click=${()=>m.goToUrl(this.returnUrl,!0)}
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
    `}async handleLoanAutoRenewed({detail:i}){const e=i?.data?.loan;if(!e?.renewal){this.loanRenewInProgress=!1,this.recoveringFromLoanExpiry=!1,this.warningModalOpen=!1,d("[IABookActions] handleLoanAutoRenewed: not a confirmed renewal",{identifier:this.identifier,activeLoan:e});return}if(this.loanRenewResult.renewNow){const t=await this.localCache.get(`${this.identifier}-loanTime`),o=ae(t),n=Number.isFinite(o)&&o>0?o:this.loanRenewTimeConfig.loanTotalTime;d("[IABookActions] handleLoanAutoRenewed",{secondsLeft:n,rawSecondsLeft:o,ajaxResponse:i?.data}),this.skipNextInitialTokenCall=!0,this.reloadPageImages(),this.recoveringFromLoanExpiry&&(this.lendingBarPostInit(),this.postInitComplete=!0);const s={...this.lendingStatus,user_has_browsed:!0,browsingExpired:!1,secondsLeftOnLoan:n};this.lendingStatus=s,this.modal?.closeModal(),this.modal.removeAttribute("id"),this.modal.customModalContent=void 0,this.sentryCaptureMsg(k.bookHasRenewed),this.warningModalDismissed=!1}this.warningModalOpen=!1,this.loanRenewInProgress=!1}async startTimerCountdown(){window?.IALendingIntervals?.clearTimerCountdown(),this.timeWhenTimerStart=new Date,window.IALendingIntervals.timerCountdown=setInterval(async()=>{await this.loanStatusCheckInterval(Number(this.lendingStatus.secondsLeftOnLoan))},this.timerExecutionSeconds*1e3)}async loanStatusCheckInterval(i){let e=i;e-=this.timerExecutionSeconds,e=Math.round(e);const t=this.reSyncTimerIfGoneOff(e);t.hasSynced&&(e=t.whatShouldLeft,d("[IABookActions] timer: timer re-synced",{secondsLeft:e})),d("[IABookActions] timer",{whatShouldLeft:t.whatShouldLeft,whatIsleft:e}),this.timeWhenTimerStart=new Date,this.lendingStatus={...this.lendingStatus,secondsLeftOnLoan:e},e<=this.loanRenewTimeConfig.loanRenewAtLast&&await this.loanRenewAttempt(e),e<=this.timerExecutionSeconds&&(window?.IALendingIntervals?.clearAll(),this.tokenPoller?.disconnectedCallback(),this.sentryCaptureMsg(k.clearOneHourTimer))}reSyncTimerIfGoneOff(i){const e=new Date;if(!this.timeWhenTimerStart)return this.timeWhenTimerStart=e,{hasSynced:!1,whatShouldLeft:Math.round(i)};const t=e.getTime()/1e3-this.timeWhenTimerStart.getTime()/1e3,o=Number(this.lendingStatus.secondsLeftOnLoan)-t,n=Math.round(i),s=Math.round(o);if((this.timerCountdownEl.secondsLeftOnLoan||0)!==s||n!==s){const p={...this.lendingStatus,secondsLeftOnLoan:s};this.lendingStatus=p}return n!==s?(d(`[IABookActions] reSyncTimerIfGoneOff ${n} - ${s}: re-syncing timer`),{hasSynced:!0,whatShouldLeft:s}):{hasSynced:!1,whatShouldLeft:s}}async loanRenewAttempt(i){let e=i;if(e<50){d("[IABookActions] loanRenewAttempt: < 50s left, expiring loan"),await this.browseHasExpired();return}await this.autoLoanRenewChecker(!1),this.loanRenewResult.renewNow===!1&&!this.warningModalDismissed&&(e-=60,this.loanRenewResult.secondsLeft=e,this.showWarningModal())}startLoanTokenPoller(i=!1){const e=()=>{this.postInitComplete||this.lendingBarPostInit(),this.postInitComplete=!0},t=o=>{this.handleLendingActionError(o)};this.tokenPoller?.disconnectedCallback(),this.tokenPoller=new it({identifier:this.identifier,borrowType:this.borrowType,successCallback:e,errorCallback:t,pollerDelay:this.tokenDelay,skipInitialCall:i})}handleToggleActionGroup(){this.disableActionGroup=!this.disableActionGroup}handleLendingActionError(i){this.disableActionGroup=!1;const e=i?.detail?.action,t=i?.detail?.data?.error,o=typeof t=="string"?t:void 0,n=i?.detail?.isInitial===!0;if(d("[IABookActions] handleLendingActionError",{identifier:this.identifier,action:e,errorMsg:o,isInitial:n,loanRenewInProgress:this.loanRenewInProgress,recoveringFromLoanExpiry:this.recoveringFromLoanExpiry}),e==="create_token")window?.IALendingIntervals?.clearAll(),this.tokenPoller?.disconnectedCallback(),this.lendingStatus={...this.lendingStatus,user_has_browsed:!1,available_to_browse:!0,secondsLeftOnLoan:0},this.showErrorModal(o,e);else if(e==="renew_loan")window?.IALendingIntervals?.clearAll(),this.loanRenewInProgress=!1,this.recoveringFromLoanExpiry=!1,this.lendingStatus={...this.lendingStatus,user_has_browsed:!1,available_to_browse:!0,secondsLeftOnLoan:0},this.showLoanUnavailableModal(o);else{if(window?.IALendingIntervals?.clearAll(),!o)return;this.showErrorModal(o,e),o.match(/not available to borrow/gm)&&(e==="browse_book"?this.lendingStatus={...this.lendingStatus,available_to_browse:!1}:e==="borrow_book"&&(this.lendingStatus={...this.lendingStatus,available_to_borrow:!1}))}}async showErrorModal(i,e){const t=new V({title:l`${c("Lending error")}`,message:i?l`${i}`:void 0,headerColor:"#d9534f",showCloseButton:!0});if(e==="create_token"){const o=l`<button
        style="${P.refresh}"
        @click=${()=>window.location.reload(!0)}
      >
        refresh
      </button>`;t.message=l` Uh oh, something went wrong trying to access
        this book.<br />
        Please ${o} to try again or send us an email to
        <a
          href="mailto:info@archive.org?subject=Help: cannot access my borrowed book: ${this.identifier}"
          >info@archive.org</a
        ><br /><br />
        ${i?l`<code>errorLog: ${i}</code>`:$}`}await this.modal?.showModal({config:t})}get iconClass(){return this.width<=se?"mobile":"desktop"}get textClass(){return this.width>=se?"visible":"hidden"}get infoIconTemplate(){return l`<ia-book-actions-info-icon
      iconClass=${this.iconClass}
    ></ia-book-actions-info-icon>`}get textGroupTemplate(){return this.primaryTitle?l`<ia-book-actions-text-group
          textClass=${this.textClass}
          .texts=${this.primaryTitle}
        >
        </ia-book-actions-text-group>`:$}get hasAdminAccess(){return!this.lendingStatus.userHasBorrowed&&this.lendingStatus.isAdmin}static get styles(){return h`
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
    `}};g([a({type:String})],u.prototype,"userid",2);g([a({type:String})],u.prototype,"identifier",2);g([a({type:String})],u.prototype,"bookTitle",2);g([a({type:String})],u.prototype,"returnUrl",2);g([a({type:Object})],u.prototype,"lendingStatus",2);g([a({type:Number})],u.prototype,"width",2);g([a({type:String})],u.prototype,"bwbPurchaseUrl",2);g([a({attribute:!1})],u.prototype,"lendingBarPostInit",2);g([a({attribute:!1})],u.prototype,"reloadPageImages",2);g([a({type:String})],u.prototype,"barType",2);g([a({attribute:!1})],u.prototype,"sharedObserver",2);g([a({type:Boolean})],u.prototype,"disableActionGroup",2);g([a({type:Number})],u.prototype,"tokenDelay",2);g([a({type:Number})],u.prototype,"timerExecutionSeconds",2);g([a({type:String})],u.prototype,"loaderIcon",2);g([a({type:Object})],u.prototype,"localCache",2);g([a({type:Object})],u.prototype,"loanRenewTimeConfig",2);g([a({type:Object})],u.prototype,"loanRenewResult",2);u=g([R("ia-book-actions")],u);const lt={active_borrows:0,active_browses:0,available_borrowable_copies:0,available_browsable_copies:1,available_lendable_copies:1,available_to_borrow:!1,available_to_browse:!1,available_to_waitlist:!1,copies_reserved_for_waitlist:0,is_lendable:!0,is_login_required:!1,is_printdisabled:!1,is_readable:!1,last_borrow:null,last_browse:null,last_waitlist:null,max_borrowable_copies:0,max_browsable_copies:1,max_lendable_copies:1,next_borrow_expiration:null,next_browse_expiration:null,orphaned_acs_loans:0,upgradable_browses:0,user_at_max_loans:!1,user_can_claim_waitlist:!1,user_has_acs_borrowed:!1,user_has_borrowed:!1,user_has_browsed:!1,user_is_printdisabled:!1,user_loan_count:0,user_loan_record:[],user_on_waitlist:!1,users_on_waitlist:0,bookUrl:"/details/practicalorganic00plim",browsingExpired:!1,daysLeftOnLoan:0,isAdmin:!1,isArchiveOrgLending:!0,isAvailable:!1,isAvailableForBrowsing:!0,isBrowserBorrowable:!0,isLendingRequired:!0,isOpenLibraryLending:!1,isPrintDisabledOnly:!1,loanCount:0,loanRecord:[],loansUrl:"/details/@neeraj-archive?tab=loans#loans-on-loan",maxLoans:10,secondsLeftOnLoan:10,shouldProtectImages:!0,totalWaitlistCount:0,userHasBorrowed:!1,userHasBrowsed:!1,userHoldIsReady:!1,userIsPrintDisabled:!1,userOnWaitingList:!1,userWaitlistPosition:-1,userid:"@neeraj-archive"};var ct=Object.defineProperty,dt=Object.getOwnPropertyDescriptor,C=(i,e,t,o)=>{for(var n=o>1?void 0:o?dt(e,t):e,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=(o?r(e,t,n):r(n))||n);return o&&n&&ct(e,t,n),n};const ht=[{label:"Bar background",cssVariable:"--primaryBGColor",defaultValue:"#000000",inputType:"color"},{label:"Bar text color",cssVariable:"--primaryTextColor",defaultValue:"#ffffff",inputType:"color"},{label:"White",cssVariable:"--white",defaultValue:"#ffffff",inputType:"color"},{label:"Primary button fill",cssVariable:"--primaryCTAFill",defaultValue:"#194880",inputType:"color"},{label:"Primary button fill (RGB)",cssVariable:"--primaryCTAFillRGB",defaultValue:"25, 72, 128",inputType:"text"},{label:"Primary button border",cssVariable:"--primaryCTABorder",defaultValue:"#c5d1df",inputType:"color"},{label:"Secondary button fill",cssVariable:"--secondaryCTAFill",defaultValue:"#333333",inputType:"color"},{label:"Secondary button fill (RGB)",cssVariable:"--secondaryCTAFillRGB",defaultValue:"51, 51, 51",inputType:"text"},{label:"Secondary button border",cssVariable:"--secondaryCTABorder",defaultValue:"#999999",inputType:"color"},{label:"Danger button fill",cssVariable:"--primaryErrorCTAFill",defaultValue:"#d9534f",inputType:"color"},{label:"Danger button fill (RGB)",cssVariable:"--primaryErrorCTAFillRGB",defaultValue:"229, 28, 38",inputType:"text"},{label:"Danger button border",cssVariable:"--primaryErrorCTABorder",defaultValue:"#d43f3a",inputType:"color"},{label:"Disabled button fill",cssVariable:"--primaryDisableCTAFill",defaultValue:"#767676",inputType:"color"},{label:"Dropdown background",cssVariable:"--iaBookActionsDropdownBGColor",defaultValue:"#2d2d2d",inputType:"color"}],ut=[{label:"Book title",propertyName:"bookTitle",defaultValue:""},{label:"Identifier",propertyName:"identifier",defaultValue:""},{label:"Bar type",propertyName:"barType",inputType:"radio",radioOptions:["action","title"],defaultValue:"action"},{label:"Better World Books URL",propertyName:"bwbPurchaseUrl",defaultValue:""},{label:"Return URL",propertyName:"returnUrl",defaultValue:""},{label:"Seconds between create_token calls",propertyName:"tokenDelay",inputType:"number",defaultValue:120},{label:"Seconds between loan checks",propertyName:"timerExecutionSeconds",inputType:"number",defaultValue:30}],pt=`<modal-manager></modal-manager>

<ia-book-actions
  .userid=\${'@brewster'}
  .identifier=\${'goody'}
  .bookTitle=\${'Goody Two-Shoes'}
  .lendingStatus=\${lendingStatus}
  .returnUrl=\${'/details/goody'}
  .lendingBarPostInit=\${() => bookReader.init()}
></ia-book-actions>`,Y={"15s":{label:"15 seconds",loanTotalTime:15,loanRenewAtLast:13,pageChangedInLast:5},"30s":{label:"30 seconds",loanTotalTime:30,loanRenewAtLast:27,pageChangedInLast:10},"2m":{label:"2 minutes",loanTotalTime:120,loanRenewAtLast:95,pageChangedInLast:15},"60m":{label:"60 minutes (production)",loanTotalTime:3600,loanRenewAtLast:660,pageChangedInLast:900}},le={borrowable:{label:"Borrowable for 1 hour or 14 days",status:()=>({available_to_browse:!0,available_to_borrow:!0})},borrowable14:{label:"Borrowable for 14 days",status:()=>({available_to_borrow:!0})},reading1hr:{label:"Reading a 1 hour loan",status:i=>({available_to_browse:!0,user_has_browsed:!0,browsingExpired:!1,secondsLeftOnLoan:i})},expired1hr:{label:"A 1 hour loan that has expired",status:()=>({available_to_browse:!0,user_has_browsed:!0,browsingExpired:!0})},reading14:{label:"Reading a 14 day loan",status:()=>({available_to_borrow:!0,user_has_borrowed:!0,daysLeftOnLoan:10})},waitlist:{label:"Waitlist available",status:()=>({available_to_waitlist:!0,available_lendable_copies:0})},onWaitlist:{label:"On the waitlist",status:()=>({user_on_waitlist:!0})},claimWaitlist:{label:"Top of the waitlist",status:()=>({user_can_claim_waitlist:!0,available_to_borrow:!0})},unavailable:{label:"Unavailable",status:()=>({})},printDisabledOnly:{label:"Print disabled only",status:()=>({isPrintDisabledOnly:!0})}},gt=["browse_book","borrow_book","create_token","renew_loan","return_loan","join_waitlist","leave_waitlist"],wt="10px",bt=100;let A=class extends x{constructor(){super(...arguments),this.scenario="borrowable",this.loggedIn=!0,this.admin=!1,this.printDisabled=!1,this.loanLength="2m",this.failRequests=!1,this.archiveFontSize=pe(window.location.hash)==="ia-book-actions",this.entries=[],this.status={},this.loanConfig=Y["2m"],this.linkGuard=i=>{const e=i.composedPath();if(!e.some(n=>n===this.modalManager||n instanceof HTMLElement&&n.localName==="ia-book-actions"))return;const o=e.find(n=>n instanceof HTMLAnchorElement&&n.href!=="");o&&(i.preventDefault(),this.log("navigation",`Link to ${o.href} not followed`))},this.onPostInit=()=>this.log("event","lendingBarPostInit called"),this.onReloadPageImages=()=>this.log("event","reloadPageImages called")}connectedCallback(){super.connectedCallback(),this.applyScenario(),this.installFetchStub(),this.installGlobalStubs(),this.installModalManager(),this.installNavigationGuards()}disconnectedCallback(){super.disconnectedCallback(),this.removeNavigationGuards(),this.removeModalManager(),this.removeGlobalStubs(),this.removeFetchStub(),this.removeLoanCookies(),this.restoreRootFontSize(),this.setFailParam(!1)}updated(){const i=document.documentElement.style;this.archiveFontSize&&this.rootFontSizeBefore===void 0?(this.rootFontSizeBefore=i.fontSize,i.fontSize=wt):this.archiveFontSize||this.restoreRootFontSize()}log(i,e){const t=new Date().toLocaleTimeString([],{hour12:!1});this.entries=[{time:t,kind:i,text:e},...this.entries].slice(0,bt)}installFetchStub(){const i=window.fetch;this.originalFetch=i,this.fetchStub=async(e,t)=>{const o=t?.body,n=o instanceof FormData?String(o.get("action")):void 0;if(!(t?.method?.toUpperCase()==="POST"&&n!==void 0&&gt.includes(n)))return i.call(window,e,t);const r=typeof e=="string"?e:e instanceof URL?e.href:e.url,p=o.get("identifier");this.log("request",`POST ${r} action=${n} identifier=${p}`);const y=this.failRequests?{error:"The demo is set to fail lending requests."}:n==="renew_loan"?{success:!0,loan:{renewal:!0}}:{success:!0};return new Response(JSON.stringify(y),{status:200,headers:{"Content-Type":"application/json"}})},window.fetch=this.fetchStub}removeFetchStub(){this.originalFetch&&window.fetch===this.fetchStub&&(window.fetch=this.originalFetch),this.originalFetch=void 0,this.fetchStub=void 0}installGlobalStubs(){this.previousAnalytics=window.archive_analytics,window.archive_analytics={send_event_no_sampling:(i,e,t,o)=>{const n=[i,String(e),t,o].filter(s=>s!==void 0&&s!=="").map(String);this.log("analytics",n.join(" | "))}},this.previousSentry=window.Sentry,window.Sentry={captureMessage:i=>this.log("sentry",i),captureException:i=>this.log("sentry",`exception: ${String(i)}`)}}removeGlobalStubs(){this.previousAnalytics?window.archive_analytics=this.previousAnalytics:delete window.archive_analytics,this.previousSentry?window.Sentry=this.previousSentry:delete window.Sentry}installModalManager(){if(document.body.querySelector("modal-manager"))return;const i=document.createElement("modal-manager");i.style.display="none",i.addEventListener("modeChanged",e=>{const{mode:t}=e.detail;i.style.display=t==="open"?"block":"none"}),document.body.appendChild(i),this.modalManager=i}removeModalManager(){this.modalManager?.remove(),this.modalManager=void 0}installNavigationGuards(){document.addEventListener("click",this.linkGuard,!0);const i=window.navigation;i&&(this.navigationGuard=e=>{const{destination:t}=e;t.sameDocument||!e.cancelable||new URL(t.url).origin===window.location.origin&&(e.preventDefault(),this.log("navigation",`Page load to ${t.url} cancelled`))},i.addEventListener("navigate",this.navigationGuard))}removeNavigationGuards(){document.removeEventListener("click",this.linkGuard,!0);const i=window.navigation;i&&this.navigationGuard&&i.removeEventListener("navigate",this.navigationGuard),this.navigationGuard=void 0}removeLoanCookies(){document.cookie.split(";").forEach(i=>{const e=decodeURIComponent(i.split("=")[0].trim());(e.startsWith("br-browse-")||e==="sticky-admin-access")&&(document.cookie=`${encodeURIComponent(e)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`)})}setFailParam(i){const e=new URL(window.location.href);i?e.searchParams.set("error","true"):e.searchParams.delete("error"),e.href!==window.location.href&&window.history.replaceState(window.history.state,"",e)}restoreRootFontSize(){this.rootFontSizeBefore!==void 0&&(document.documentElement.style.fontSize=this.rootFontSizeBefore,this.rootFontSizeBefore=void 0)}applyScenario(){const{loanTotalTime:i,loanRenewAtLast:e,pageChangedInLast:t}=Y[this.loanLength];this.loanConfig={loanTotalTime:i,loanRenewAtLast:e,pageChangedInLast:t},this.status={...lt,is_printdisabled:this.printDisabled,user_is_printdisabled:this.printDisabled,isAdmin:this.admin,...le[this.scenario].status(i)}}onFailChange(i){this.failRequests=i.target.checked,this.setFailParam(this.failRequests)}simulatePageTurn(){this.log("event","BookReader:userAction dispatched"),window.dispatchEvent(new CustomEvent("BookReader:userAction"))}selectRow(i,e,t,o){return l`
      <tr>
        <td><label>${i}</label></td>
        <td>
          <select
            .value=${e}
            @change=${n=>o(n.target.value)}
          >
            ${Object.entries(t).map(([n,s])=>l`<option value=${n} ?selected=${n===e}>
                  ${s.label}
                </option>`)}
          </select>
        </td>
      </tr>
    `}checkRow(i,e,t){return l`
      <tr>
        <td><label>${i}</label></td>
        <td>
          <input type="checkbox" .checked=${e} @change=${t} />
        </td>
      </tr>
    `}render(){return l`
      <story-template
        elementTag="ia-book-actions"
        elementClassName="IABookActions"
        .customExampleUsage=${pt}
        .styleInputData=${{settings:ht}}
        .propInputData=${{settings:ut}}
      >
        <ia-book-actions
          slot="demo"
          .userid=${this.loggedIn?"@brewster":""}
          .identifier=${"demo-book"}
          .bookTitle=${"Goody Two-Shoes"}
          .lendingStatus=${this.status}
          .loanRenewTimeConfig=${this.loanConfig}
          .loaderIcon=${"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
          .lendingBarPostInit=${this.onPostInit}
          .reloadPageImages=${this.onReloadPageImages}
          @IABookReader:BrowsingHasExpired=${()=>this.log("event","IABookReader:BrowsingHasExpired")}
          @lendingActionError=${i=>this.log("event",`lendingActionError ${i.detail?.action}`)}
        ></ia-book-actions>

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

        <div slot="settings">
          <table>
            ${this.selectRow("Lending status",this.scenario,le,i=>{this.scenario=i,this.applyScenario()})}
            ${this.selectRow("1 hour loan length",this.loanLength,Y,i=>{this.loanLength=i,this.applyScenario()})}
            ${this.checkRow("Logged in",this.loggedIn,i=>{this.loggedIn=i.target.checked})}
            ${this.checkRow("Admin",this.admin,i=>{this.admin=i.target.checked,this.applyScenario()})}
            ${this.checkRow("Print disabled",this.printDisabled,i=>{this.printDisabled=i.target.checked,this.applyScenario()})}
            ${this.checkRow("Fail lending requests",this.failRequests,this.onFailChange)}
            ${this.checkRow("archive.org font size",this.archiveFontSize,i=>{this.archiveFontSize=i.target.checked})}
          </table>
          <p>
            <button @click=${this.simulatePageTurn}>
              Simulate a BookReader page turn
            </button>
          </p>
          <p class="hint">
            Pick a 1 hour loan with a short length to reach the warning modal,
            the automatic renewal and the auto-return in under two minutes. Fail
            lending requests makes every lending call return an error.
            archive.org font size sets the page's root font size to 10px, which
            the bar is built for. It applies to the whole demo page, so it's on
            by default only when this element is the one being viewed.
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            Put a <code>modal-manager</code> on the page. The bar finds it by
            tag name and uses it for the loan warning and for errors. The bar
            sends loan actions to <code>/services/loans/loan</code>, so it
            belongs on archive.org or behind a proxy for it.
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
    `}static get styles(){return h`
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
        flex: 0 0 6rem;
        color: #8ec5ff;
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

      .hint {
        font-size: 1.2rem;
      }
    `}};C([L()],A.prototype,"scenario",2);C([L()],A.prototype,"loggedIn",2);C([L()],A.prototype,"admin",2);C([L()],A.prototype,"printDisabled",2);C([L()],A.prototype,"loanLength",2);C([L()],A.prototype,"failRequests",2);C([L()],A.prototype,"archiveFontSize",2);C([L()],A.prototype,"entries",2);C([L()],A.prototype,"status",2);C([L()],A.prototype,"loanConfig",2);A=C([R("ia-book-actions-story")],A);export{A as IABookActionsStory};
