import{e as _t,d as Tt,t as wt,E as Ft,a as T,n as D,r as R,i as gt,b as F,w as K,A as Et,c as ft}from"./index-FVXMCECt.js";import"./ia-status-indicator-vbH8kACX.js";import{e as Ot}from"./query-Bj0piY5A.js";import{l as st}from"./live-0bdsLTRE.js";import{e as It}from"./directive-helpers-BX9GHYwa.js";import"./story-template-lsZUes0d.js";import"./runtime-CCgtQBty.js";import"./masked-icon-z9fczW_j.js";var vt=60,St=vt*60,Dt=St*24,Ct=Dt*7,P=1e3,Q=vt*P,nt=St*P,Lt=Dt*P,Yt=Ct*P,it="millisecond",N="second",W="minute",U="hour",C="day",j="week",E="month",$t="quarter",L="year",H="date",Rt="YYYY-MM-DDTHH:mm:ssZ",ot="Invalid Date",At=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,Nt=/\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;const Wt={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var i=["th","st","nd","rd"],a=e%100;return"["+e+(i[(a-20)%10]||i[a]||i[0])+"]"}};var et=function(e,i,a){var r=String(e);return!r||r.length>=i?e:""+Array(i+1-r.length).join(a)+e},Ut=function(e){var i=-e.utcOffset(),a=Math.abs(i),r=Math.floor(a/60),s=a%60;return(i<=0?"+":"-")+et(r,2,"0")+":"+et(s,2,"0")},Ht=function t(e,i){if(e.date()<i.date())return-t(i,e);var a=(i.year()-e.year())*12+(i.month()-e.month()),r=e.clone().add(a,E),s=i-r<0,n=e.clone().add(a+(s?-1:1),E);return+(-(a+(i-r)/(s?r-n:n-r))||0)},Pt=function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},Bt=function(e){var i={M:E,y:L,w:j,d:C,D:H,h:U,m:W,s:N,ms:it,Q:$t};return i[e]||String(e||"").toLowerCase().replace(/s$/,"")},kt=function(e){return e===void 0};const Xt={s:et,z:Ut,m:Ht,a:Pt,p:Bt,u:kt};var V="en",A={};A[V]=Wt;var yt="$isDayjsObject",at=function(e){return e instanceof q||!!(e&&e[yt])},Z=function t(e,i,a){var r;if(!e)return V;if(typeof e=="string"){var s=e.toLowerCase();A[s]&&(r=s),i&&(A[s]=i,r=s);var n=e.split("-");if(!r&&n.length>1)return t(n[0])}else{var h=e.name;A[h]=e,r=h}return!a&&r&&(V=r),r||!a&&V},v=function(e,i){if(at(e))return e.clone();var a=typeof i=="object"?i:{};return a.date=e,a.args=arguments,new q(a)},Vt=function(e,i){return v(e,{locale:i.$L,utc:i.$u,x:i.$x,$offset:i.$offset})},p=Xt;p.l=Z;p.i=at;p.w=Vt;var zt=function(e){var i=e.date,a=e.utc;if(i===null)return new Date(NaN);if(p.u(i))return new Date;if(i instanceof Date)return new Date(i);if(typeof i=="string"&&!/Z$/i.test(i)){var r=i.match(At);if(r){var s=r[2]-1||0,n=(r[7]||"0").substring(0,3);return a?new Date(Date.UTC(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,n)):new Date(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,n)}}return new Date(i)},q=(function(){function t(i){this.$L=Z(i.locale,null,!0),this.parse(i),this.$x=this.$x||i.x||{},this[yt]=!0}var e=t.prototype;return e.parse=function(a){this.$d=zt(a),this.init()},e.init=function(){var a=this.$d;this.$y=a.getFullYear(),this.$M=a.getMonth(),this.$D=a.getDate(),this.$W=a.getDay(),this.$H=a.getHours(),this.$m=a.getMinutes(),this.$s=a.getSeconds(),this.$ms=a.getMilliseconds()},e.$utils=function(){return p},e.isValid=function(){return this.$d.toString()!==ot},e.isSame=function(a,r){var s=v(a);return this.startOf(r)<=s&&s<=this.endOf(r)},e.isAfter=function(a,r){return v(a)<this.startOf(r)},e.isBefore=function(a,r){return this.endOf(r)<v(a)},e.$g=function(a,r,s){return p.u(a)?this[r]:this.set(s,a)},e.unix=function(){return Math.floor(this.valueOf()/1e3)},e.valueOf=function(){return this.$d.getTime()},e.startOf=function(a,r){var s=this,n=p.u(r)?!0:r,h=p.p(a),o=function(x,M){var S=p.w(s.$u?Date.UTC(s.$y,M,x):new Date(s.$y,M,x),s);return n?S:S.endOf(C)},l=function(x,M){var S=[0,0,0,0],O=[23,59,59,999];return p.w(s.toDate()[x].apply(s.toDate("s"),(n?S:O).slice(M)),s)},d=this.$W,m=this.$M,c=this.$D,f="set"+(this.$u?"UTC":"");switch(h){case L:return n?o(1,0):o(31,11);case E:return n?o(1,m):o(0,m+1);case j:{var $=this.$locale().weekStart||0,b=(d<$?d+7:d)-$;return o(n?c-b:c+(6-b),m)}case C:case H:return l(f+"Hours",0);case U:return l(f+"Minutes",1);case W:return l(f+"Seconds",2);case N:return l(f+"Milliseconds",3);default:return this.clone()}},e.endOf=function(a){return this.startOf(a,!1)},e.$set=function(a,r){var s,n=p.p(a),h="set"+(this.$u?"UTC":""),o=(s={},s[C]=h+"Date",s[H]=h+"Date",s[E]=h+"Month",s[L]=h+"FullYear",s[U]=h+"Hours",s[W]=h+"Minutes",s[N]=h+"Seconds",s[it]=h+"Milliseconds",s)[n],l=n===C?this.$D+(r-this.$W):r;if(n===E||n===L){var d=this.clone().set(H,1);d.$d[o](l),d.init(),this.$d=d.set(H,Math.min(this.$D,d.daysInMonth())).$d}else o&&this.$d[o](l);return this.init(),this},e.set=function(a,r){return this.clone().$set(a,r)},e.get=function(a){return this[p.p(a)]()},e.add=function(a,r){var s=this,n;a=Number(a);var h=p.p(r),o=function(c){var f=v(s);return p.w(f.date(f.date()+Math.round(c*a)),s)};if(h===E)return this.set(E,this.$M+a);if(h===L)return this.set(L,this.$y+a);if(h===C)return o(1);if(h===j)return o(7);var l=(n={},n[W]=Q,n[U]=nt,n[N]=P,n)[h]||1,d=this.$d.getTime()+a*l;return p.w(d,this)},e.subtract=function(a,r){return this.add(a*-1,r)},e.format=function(a){var r=this,s=this.$locale();if(!this.isValid())return s.invalidDate||ot;var n=a||Rt,h=p.z(this),o=this.$H,l=this.$m,d=this.$M,m=s.weekdays,c=s.months,f=s.meridiem,$=function(S,O,I,B){return S&&(S[O]||S(r,n))||I[O].slice(0,B)},b=function(S){return p.s(o%12||12,S,"0")},y=f||function(M,S,O){var I=M<12?"AM":"PM";return O?I.toLowerCase():I},x=function(S){switch(S){case"YY":return String(r.$y).slice(-2);case"YYYY":return p.s(r.$y,4,"0");case"M":return d+1;case"MM":return p.s(d+1,2,"0");case"MMM":return $(s.monthsShort,d,c,3);case"MMMM":return $(c,d);case"D":return r.$D;case"DD":return p.s(r.$D,2,"0");case"d":return String(r.$W);case"dd":return $(s.weekdaysMin,r.$W,m,2);case"ddd":return $(s.weekdaysShort,r.$W,m,3);case"dddd":return m[r.$W];case"H":return String(o);case"HH":return p.s(o,2,"0");case"h":return b(1);case"hh":return b(2);case"a":return y(o,l,!0);case"A":return y(o,l,!1);case"m":return String(l);case"mm":return p.s(l,2,"0");case"s":return String(r.$s);case"ss":return p.s(r.$s,2,"0");case"SSS":return p.s(r.$ms,3,"0");case"Z":return h}return null};return n.replace(Nt,function(M,S){return S||x(M)||h.replace(":","")})},e.utcOffset=function(){return-Math.round(this.$d.getTimezoneOffset()/15)*15},e.diff=function(a,r,s){var n=this,h=p.p(r),o=v(a),l=(o.utcOffset()-this.utcOffset())*Q,d=this-o,m=function(){return p.m(n,o)},c;switch(h){case L:c=m()/12;break;case E:c=m();break;case $t:c=m()/3;break;case j:c=(d-l)/Yt;break;case C:c=(d-l)/Lt;break;case U:c=d/nt;break;case W:c=d/Q;break;case N:c=d/P;break;default:c=d;break}return s?c:p.a(c)},e.daysInMonth=function(){return this.endOf(E).$D},e.$locale=function(){return A[this.$L]},e.locale=function(a,r){if(!a)return this.$L;var s=this.clone(),n=Z(a,r,!0);return n&&(s.$L=n),s},e.clone=function(){return p.w(this.$d,this)},e.toDate=function(){return new Date(this.valueOf())},e.toJSON=function(){return this.isValid()?this.toISOString():null},e.toISOString=function(){return this.$d.toISOString()},e.toString=function(){return this.$d.toUTCString()},t})(),bt=q.prototype;v.prototype=bt;[["$ms",it],["$s",N],["$m",W],["$H",U],["$W",C],["$M",E],["$y",L],["$D",H]].forEach(function(t){bt[t[1]]=function(e){return this.$g(e,t[0],t[1])}});v.extend=function(t,e){return t.$i||(t(e,q,v),t.$i=!0),v};v.locale=Z;v.isDayjs=at;v.unix=function(t){return v(t*1e3)};v.en=A[V];v.Ls=A;v.p={};var jt=function(e){return e.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(i,a,r){return a||r.slice(1)})},Zt={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Gt=function(e,i){return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(a,r,s){var n=s&&s.toUpperCase();return r||i[s]||Zt[s]||jt(i[n])})},qt=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,ht=/\d/,k=/\d\d/,Jt=/\d{3}/,Kt=/\d{4}/,w=/\d\d?/,Qt=/[+-]?\d+/,te=/[+-]\d\d:?(\d\d)?|Z/,X=/\d*[^-_:/,()\s\d]+/,Y={},Mt=function(e){return e=+e,e+(e>68?1900:2e3)};function ee(t){if(!t||t==="Z")return 0;var e=t.match(/([+-]|\d\d)/g),i=+(e[1]*60)+(+e[2]||0);return i===0?0:e[0]==="+"?-i:i}var _=function(e){return function(i){this[e]=+i}},lt=[te,function(t){var e=this.zone||(this.zone={});e.offset=ee(t)}],tt=function(e){var i=Y[e];return i&&(i.indexOf?i:i.s.concat(i.f))},dt=function(e,i){var a,r=Y,s=r.meridiem;if(!s)a=e===(i?"pm":"PM");else for(var n=1;n<=24;n+=1)if(e.indexOf(s(n,0,i))>-1){a=n>12;break}return a},ie={A:[X,function(t){this.afternoon=dt(t,!1)}],a:[X,function(t){this.afternoon=dt(t,!0)}],Q:[ht,function(t){this.month=(t-1)*3+1}],S:[ht,function(t){this.milliseconds=+t*100}],SS:[k,function(t){this.milliseconds=+t*10}],SSS:[Jt,function(t){this.milliseconds=+t}],s:[w,_("seconds")],ss:[w,_("seconds")],m:[w,_("minutes")],mm:[w,_("minutes")],H:[w,_("hours")],h:[w,_("hours")],HH:[w,_("hours")],hh:[w,_("hours")],D:[w,_("day")],DD:[k,_("day")],Do:[X,function(t){var e=Y,i=e.ordinal,a=t.match(/\d+/);if(this.day=a[0],!!i)for(var r=1;r<=31;r+=1)i(r).replace(/\[|\]/g,"")===t&&(this.day=r)}],w:[w,_("week")],ww:[k,_("week")],M:[w,_("month")],MM:[k,_("month")],MMM:[X,function(t){var e=tt("months"),i=tt("monthsShort"),a=(i||e.map(function(r){return r.slice(0,3)})).indexOf(t)+1;if(a<1)throw new Error;this.month=a%12||a}],MMMM:[X,function(t){var e=tt("months"),i=e.indexOf(t)+1;if(i<1)throw new Error;this.month=i%12||i}],Y:[Qt,_("year")],YY:[k,function(t){this.year=Mt(t)}],YYYY:[Kt,_("year")],Z:lt,ZZ:lt};function ae(t){var e=t.afternoon;if(e!==void 0){var i=t.hours;e?i<12&&(t.hours+=12):i===12&&(t.hours=0),delete t.afternoon}}function re(t){t=Gt(t,Y&&Y.formats);for(var e=t.match(qt),i=e.length,a=0;a<i;a+=1){var r=e[a],s=ie[r],n=s&&s[0],h=s&&s[1];h?e[a]={regex:n,parser:h}:e[a]=r.replace(/^\[|\]$/g,"")}return function(o){for(var l={},d=0,m=0;d<i;d+=1){var c=e[d];if(typeof c=="string")m+=c.length;else{var f=c.regex,$=c.parser,b=o.slice(m),y=f.exec(b),x=y[0];$.call(l,x),o=o.replace(x,"")}}return ae(l),l}}var se=function(e,i,a,r){try{if(["x","X"].indexOf(i)>-1)return new Date((i==="X"?1e3:1)*e);var s=re(i),n=s(e),h=n.year,o=n.month,l=n.day,d=n.hours,m=n.minutes,c=n.seconds,f=n.milliseconds,$=n.zone,b=n.week,y=new Date,x=l||(!h&&!o?y.getDate():1),M=h||y.getFullYear(),S=0;h&&!o||(S=o>0?o-1:y.getMonth());var O=d||0,I=m||0,B=c||0,J=f||0;if($)return new Date(Date.UTC(M,S,x,O,I,B,J+$.offset*60*1e3));if(a)return new Date(Date.UTC(M,S,x,O,I,B,J));var z;return z=new Date(M,S,x,O,I,B,J),b&&(z=r(z).week(b).toDate()),z}catch{return new Date("")}};const ne=(function(t,e,i){i.p.customParseFormat=!0,t&&t.parseTwoDigitYear&&(Mt=t.parseTwoDigitYear);var a=e.prototype,r=a.parse;a.parse=function(s){var n=s.date,h=s.utc,o=s.args;this.$u=h;var l=o[1];if(typeof l=="string"){var d=o[2]===!0,m=o[3]===!0,c=d||m,f=o[2];m&&(f=o[2]),Y=this.$locale(),!d&&f&&(Y=i.Ls[f]),this.$d=se(n,l,h,i),this.init(),f&&f!==!0&&(this.$L=this.locale(f).$L),c&&n!=this.format(l)&&(this.$d=new Date("")),Y={}}else if(l instanceof Array)for(var $=l.length,b=1;b<=$;b+=1){o[1]=l[b-1];var y=i.apply(this,o);if(y.isValid()){this.$d=y.$d,this.$L=y.$L,this.init();break}b===$&&(this.$d=new Date(""))}else r.call(this,s)}});function oe(t,e){const i=e.prototype,a=i.parse;i.parse=function(r){const s=r.date,n=r.args[1];a.call(this,r);const h=this.year(),o=h>=1900&&h<2e3,l=typeof n=="string"&&n.includes("YYYY"),d=Array.isArray(n)&&typeof n[0]=="string"&&n[0].includes("YYYY"),m=l||d,c=typeof s=="string"&&!s.includes(`${h}`);o&&m&&c&&(this.$d.setFullYear(h-1900),this.init())}}const xt="important",he=" !"+xt,le=_t(class extends Tt{constructor(t){if(super(t),t.type!==wt.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const a=t[i];return a==null?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`},"")}update(t,[e]){const{style:i}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const a of this.ft)e[a]==null&&(this.ft.delete(a),a.includes("-")?i.removeProperty(a):i[a]=null);for(const a in e){const r=e[a];if(r!=null){this.ft.add(a);const s=typeof r=="string"&&r.endsWith(he);a.includes("-")||s?i.setProperty(a,s?r.slice(0,-11):r,s?xt:""):i[a]=r}}return Ft}});var de=Object.defineProperty,ce=Object.getOwnPropertyDescriptor,g=(t,e,i,a)=>{for(var r=a>1?void 0:a?ce(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(a?n(e,i,r):n(r))||r);return a&&r&&de(e,i,r),r};v.extend(ne);v.extend(oe);const ue=180,me=40,pe=10,ge=125,fe=30,ct="YYYY",ve="no data",Se=0,De="item",ut=4,$e={linear:t=>t,logarithmic:t=>Math.log1p(t)},ye=T`var(--histogramDateRangeSliderColor, #4B65FE)`,be=T`var(--histogramDateRangeSelectedRangeColor, #DBE0FF)`,Me=T`var(--histogramDateRangeBarIncludedFill, #2C2C2C)`,xe=T`var(--histogramDateRangeActivityIndicator, #2C2C2C)`,_e=T`var(--histogramDateRangeBarExcludedFill, #CCCCCC)`,Te=T`var(--histogramDateRangeInputRowMargin, 0)`,we=T`var(--histogramDateRangeInputBorder, 0.5px solid #2C2C2C)`,Fe=T`var(--histogramDateRangeInputWidth, 35px)`,Ee=T`var(--histogramDateRangeInputFontSize, 1.2rem)`,Oe=T`var(--histogramDateRangeInputFontFamily, sans-serif)`,mt=T`var(--histogramDateRangeTooltipBackgroundColor, #2C2C2C)`,pt=T`var(--histogramDateRangeTooltipTextColor, #FFFFFF)`,Ie=T`var(--histogramDateRangeTooltipFontSize, 1.1rem)`,Ce=T`var(--histogramDateRangeTooltipFontFamily, sans-serif)`;let u=class extends gt{constructor(){super(...arguments),this.width=ue,this.height=me,this.sliderWidth=pe,this.tooltipWidth=ge,this.tooltipHeight=fe,this.updateDelay=Se,this.dateFormat=ct,this.missingDataMessage=ve,this.minDate="",this.maxDate="",this.disabled=!1,this.bins=[],this.updateWhileFocused=!1,this.binSnapping="none",this.tooltipLabel=De,this.barScaling="logarithmic",this._tooltipOffsetX=0,this._tooltipOffsetY=0,this._isDragging=!1,this._isLoading=!1,this._minSelectedDate="",this._maxSelectedDate="",this._minDateMS=0,this._maxDateMS=0,this._dragOffset=0,this._histWidth=0,this._binWidth=0,this._histData=[],this._previousDateRange="",this._updateDeferredWhileFocused=!1,this.drag=t=>{t.preventDefault(),!this.disabled&&(this.setDragOffset(t),this._isDragging=!0,this.addListeners(),this.cancelPendingUpdateEvent())},this.drop=()=>{this._isDragging&&(this.removeListeners(),this.beginEmitUpdateProcess()),this._isDragging=!1},this.move=t=>{const e=this.getBoundingClientRect().x,i=t.clientX-e-this._dragOffset;this._currentSlider.id==="slider-min"?this.minSelectedDate=this.translatePositionToDate(this.validMinSliderX(i)):(this.maxSelectedDate=this.translatePositionToDate(this.validMaxSliderX(i)),this.getMSFromString(this.maxSelectedDate)>this._maxDateMS&&(this.maxSelectedDate=this.maxDate))}}updated(){this._tooltip&&!this._tooltipContent&&(this._tooltip.hidden=!0)}disconnectedCallback(){this.removeListeners(),super.disconnectedCallback()}willUpdate(t){(t.has("bins")||t.has("minDate")||t.has("maxDate")||t.has("minSelectedDate")||t.has("maxSelectedDate")||t.has("width")||t.has("height")||t.has("binSnapping")||t.has("barScaling"))&&this.handleDataUpdate()}handleDataUpdate(){this.hasBinData&&(this._histWidth=this.width-this.sliderWidth*2,this._minDateMS=this.snapTimestamp(this.getMSFromString(this.minDate)),this._maxDateMS=this.snapTimestamp(this.getMSFromString(this.maxDate)+this.snapInterval)+this.snapEndOffset,this._binWidth=this._histWidth/this._numBins,this._histData=this.calculateHistData(),this.minSelectedDate=this.minSelectedDate?this.minSelectedDate:this.minDate,this.maxSelectedDate=this.maxSelectedDate?this.maxSelectedDate:this.maxDate)}snapToNextSecond(t){return Math.ceil(t/1e3)*1e3}snapToMonth(t){const e=v(t),i=e.date()<16?0:1;return e.add(i,"month").date(1).hour(0).minute(0).second(0).millisecond(0).valueOf()}snapToYear(t){const e=v(t),i=e.month()<6?0:1;return e.add(i,"year").month(0).date(1).hour(0).minute(0).second(0).millisecond(0).valueOf()}snapTimestamp(t){switch(this.binSnapping){case"year":return this.snapToYear(t);case"month":return this.snapToMonth(t);default:return this.snapToNextSecond(t)}}get barScalingFunction(){return typeof this.barScaling=="string"?$e[this.barScaling]:this.barScaling}calculateHistData(){const{bins:t,height:e,dateRangeMS:i,_numBins:a,_minDateMS:r}=this,s=Math.min(...this.bins),n=Math.max(...this.bins),h=s===n?1:this.barScalingFunction(n),o=e/h,l=i/a;return t.map((d,m)=>{const c=this.snapTimestamp(m*l+r),f=this.formatDate(c),$=this.snapTimestamp((m+1)*l+r)+this.snapEndOffset,b=this.formatDate($),y=this.formatDate(c,this.tooltipDateFormat),x=this.formatDate($,this.tooltipDateFormat),M=y===x?y:`${y} - ${x}`;return{value:d,height:Math.floor(this.barScalingFunction(d)*o),binStart:f,binEnd:b,tooltip:M}})}get hasBinData(){return this._numBins>0}get _numBins(){return!this.bins||!this.bins.length?0:this.bins.length}get histogramLeftEdgeX(){return this.sliderWidth}get histogramRightEdgeX(){return this.width-this.sliderWidth}get snapInterval(){switch(this.binSnapping){case"year":return 31536e6;case"month":return 2592e6;default:return 0}}get snapEndOffset(){return this.binSnapping!=="none"&&this._numBins>1?-1:0}get tooltipDateFormat(){return this._tooltipDateFormat??this.dateFormat}set tooltipDateFormat(t){this._tooltipDateFormat=t}get loading(){return this._isLoading}set loading(t){this.disabled=t,this._isLoading=t}get minSelectedDate(){return this.formatDate(this.getMSFromString(this._minSelectedDate))}set minSelectedDate(t){if(!this._minSelectedDate){this._minSelectedDate=t;return}const e=this.getMSFromString(t),i=!Number.isNaN(e),a=e<=this.getMSFromString(this.maxSelectedDate);i&&a&&(this._minSelectedDate=this.formatDate(e)),this.requestUpdate()}get maxSelectedDate(){return this.formatDate(this.getMSFromString(this._maxSelectedDate))}set maxSelectedDate(t){if(!this._maxSelectedDate){this._maxSelectedDate=t;return}const e=this.getMSFromString(t),i=!Number.isNaN(e),a=e>=this.getMSFromString(this.minSelectedDate);i&&a&&(this._maxSelectedDate=this.formatDate(e)),this.requestUpdate()}get minSliderX(){const t=this.translateDateToPosition(this.minSelectedDate);return this.validMinSliderX(t)}get maxSliderX(){const t=this.snapTimestamp(this.getMSFromString(this.maxSelectedDate)+this.snapInterval),e=this.translateDateToPosition(this.formatDate(t));return this.validMaxSliderX(e)}get dateRangeMS(){return this._maxDateMS-this._minDateMS}showTooltip(t){if(this._isDragging||this.disabled)return;const e=t.currentTarget,i=e.x.baseVal.value+this.sliderWidth/2,a=e.dataset,r=`${this.tooltipLabel}${a.numItems!=="1"?"s":""}`,s=Number(a.numItems).toLocaleString(),n=2,o=9+this.tooltipHeight,l=this.getBoundingClientRect(),d=l.x+i,m=l.y;this._tooltipOffsetX=d-n+(this._binWidth-this.sliderWidth-this.tooltipWidth)/2+window.scrollX,this._tooltipOffsetY=m-o+window.scrollY,this._tooltipContent=F`
      ${s} ${r}<br />
      ${a.tooltip}
    `,this._tooltip.hidden=!1,this._tooltip.showPopover?.()}hideTooltip(){this._tooltipContent=void 0,this._tooltip.hidden=!0,this._tooltip.hidePopover?.()}validMinSliderX(t){const e=Math.min(this.translateDateToPosition(this.maxSelectedDate),this.histogramRightEdgeX);return t=this.clamp(t,this.histogramLeftEdgeX,e),Number.isNaN(t)||e<this.histogramLeftEdgeX?this.histogramLeftEdgeX:t}validMaxSliderX(t){const e=Math.max(this.histogramLeftEdgeX,this.translateDateToPosition(this.minSelectedDate));return t=this.clamp(t,e,this.histogramRightEdgeX),Number.isNaN(t)||e>this.histogramRightEdgeX?this.histogramRightEdgeX:t}addListeners(){window.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.drop),window.addEventListener("pointercancel",this.drop)}removeListeners(){window.removeEventListener("pointermove",this.move),window.removeEventListener("pointerup",this.drop),window.removeEventListener("pointercancel",this.drop)}beginEmitUpdateProcess(){this.cancelPendingUpdateEvent(),this._updateDeferredWhileFocused=!1,this._emitUpdatedEventTimer=setTimeout(()=>{if(this._emitUpdatedEventTimer=void 0,this.currentDateRangeString===this._previousDateRange)return;this._previousDateRange=this.currentDateRangeString;const t={detail:{minDate:this.minSelectedDate,maxDate:this.maxSelectedDate},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("histogramDateRangeUpdated",t))},this.updateDelay)}cancelPendingUpdateEvent(){return this._emitUpdatedEventTimer===void 0?!1:(clearTimeout(this._emitUpdatedEventTimer),this._emitUpdatedEventTimer=void 0,!0)}setDragOffset(t){this._currentSlider=t.currentTarget;const e=this._currentSlider.id==="slider-min"?this.minSliderX:this.maxSliderX,i=this.getBoundingClientRect().x;this._dragOffset=t.clientX-i-e}translatePositionToDate(t){const e=this.snapToNextSecond((t-this.sliderWidth)*this.dateRangeMS/this._histWidth);return this.formatDate(this._minDateMS+e)}translateDateToPosition(t){const e=this.getMSFromString(t);return this.sliderWidth+(e-this._minDateMS)*this._histWidth/this.dateRangeMS}clamp(t,e,i){return Math.min(Math.max(t,e),i)}handleInputFocus(){this.updateWhileFocused||(this._updateDeferredWhileFocused=this.cancelPendingUpdateEvent())}handleMinDateInput(t){const e=t.currentTarget,i=e.value!==this.minSelectedDate;i&&(this.minSelectedDate=e.value),(i||this._updateDeferredWhileFocused)&&this.beginEmitUpdateProcess()}handleMaxDateInput(t){const e=t.currentTarget,i=e.value!==this.maxSelectedDate;i&&(this.maxSelectedDate=e.value),(i||this._updateDeferredWhileFocused)&&this.beginEmitUpdateProcess()}handleKeyUp(t){if(t.key==="Enter"){const e=t.currentTarget;e.blur(),e.id==="date-min"?this.handleMinDateInput(t):e.id==="date-max"&&this.handleMaxDateInput(t)}}get currentDateRangeString(){return`${this.minSelectedDate}:${this.maxSelectedDate}`}getMSFromString(t){const e=typeof t=="string"?t:String(t);if((e.split(/(\d+)/).length-1)/2===1){const a=new Date(0,0);return a.setFullYear(Number(e)),a.getTime()}return v(e,[this.dateFormat,ct]).valueOf()}handleBarClick(t){const e=t.currentTarget.dataset,i=(this.getMSFromString(e.binStart)+this.getMSFromString(e.binEnd))/2,a=Math.abs(i-this.getMSFromString(this.minSelectedDate)),r=Math.abs(i-this.getMSFromString(this.maxSelectedDate));a<r?this.minSelectedDate=e.binStart:this.maxSelectedDate=e.binEnd,this.beginEmitUpdateProcess()}get minSliderTemplate(){const t=ut,e=`
            M${this.minSliderX},0
            h-${this.sliderWidth-t}
            q-${t},0 -${t},${t}
            v${this.height-t*2}
            q0,${t} ${t},${t}
            h${this.sliderWidth-t}
          `;return this.generateSliderSVG(this.minSliderX,"slider-min",e)}get maxSliderTemplate(){const t=ut,e=`
            M${this.maxSliderX},0
            h${this.sliderWidth-t}
            q${t},0 ${t},${t}
            v${this.height-t*2}
            q0,${t} -${t},${t}
            h-${this.sliderWidth-t}
          `;return this.generateSliderSVG(this.maxSliderX,"slider-max",e)}generateSliderSVG(t,e,i){const a=e==="slider-min"?1:-1,r=It({slider:!0,draggable:!this.disabled,dragging:this._isDragging});return K`
    <svg
      id=${e}
      class=${r}
      @pointerdown=${this.drag}
    >
      <path d="${i} z" fill="${ye}" />
      <rect
        x="${t-this.sliderWidth*a+this.sliderWidth*.4*a}"
        y="${this.height/3}"
        width="1"
        height="${this.height/3}"
        fill="white"
      />
      <rect
        x="${t-this.sliderWidth*a+this.sliderWidth*.6*a}"
        y="${this.height/3}"
        width="1"
        height="${this.height/3}"
        fill="white"
      />
    </svg>
    `}get selectedRangeTemplate(){return K`
      <rect
        x="${this.minSliderX}"
        y="0"
        width="${this.maxSliderX-this.minSliderX}"
        height="${this.height}"
        fill="${be}"
      />`}get histogramTemplate(){const t=this._histWidth/this._numBins,e=t-1;let i=this.sliderWidth;return this._histData.map(a=>{const{minSelectedDate:r,maxSelectedDate:s}=this,n=a.height,h=this.isBefore(a.binEnd,r),o=this.isAfter(a.binStart,s),l=h||o?_e:Me,d=`stroke-dasharray: 0 ${e} ${n} ${e} 0 ${n}`,m=K`
        <rect
          class="bar-pointer-target"
          x=${i}
          y="0"
          width=${e}
          height=${this.height}
          @pointerenter=${this.showTooltip}
          @pointerleave=${this.hideTooltip}
          @click=${this.handleBarClick}
          fill="transparent"
          data-num-items=${a.value}
          data-bin-start=${a.binStart}
          data-bin-end=${a.binEnd}
          data-tooltip=${a.tooltip}
        />
        <rect
          class="bar"
          style=${d}
          x=${i}
          y=${this.height-n}
          width=${e}
          height=${n}
          fill=${l}
        />`;return i+=t,m})}isBefore(t,e){const i=this.getMSFromString(t),a=this.getMSFromString(e);return i<a}isAfter(t,e){const i=this.getMSFromString(t),a=this.getMSFromString(e);return i>a}formatDate(t,e=this.dateFormat){if(Number.isNaN(t))return"";const i=v(t);return i.year()<1e3?i.year(199999).format(e).replace(/199999/g,i.year().toString()):i.format(e)}get minInputTemplate(){return F`
      <input
        id="date-min"
        placeholder=${this.dateFormat}
        type="text"
        @focus=${this.handleInputFocus}
        @blur=${this.handleMinDateInput}
        @keyup=${this.handleKeyUp}
        .value=${st(this.minSelectedDate)}
        ?disabled=${this.disabled}
      />
    `}get maxInputTemplate(){return F`
      <input
        id="date-max"
        placeholder=${this.dateFormat}
        type="text"
        @focus=${this.handleInputFocus}
        @blur=${this.handleMaxDateInput}
        @keyup=${this.handleKeyUp}
        .value=${st(this.maxSelectedDate)}
        ?disabled=${this.disabled}
      />
    `}get minLabelTemplate(){return F`<label for="date-min" class="sr-only">Minimum date:</label>`}get maxLabelTemplate(){return F`<label for="date-max" class="sr-only">Maximum date:</label>`}get tooltipTemplate(){const t=le({width:`${this.tooltipWidth}px`,height:`${this.tooltipHeight}px`,top:`${this._tooltipOffsetY}px`,left:`${this._tooltipOffsetX}px`});return F`
      <div id="tooltip" style=${t} popover>${this._tooltipContent}</div>
    `}get histogramAccessibilityTemplate(){let t="";this.minSelectedDate&&this.maxSelectedDate?t=` from ${this.minSelectedDate} to ${this.maxSelectedDate}`:this.minSelectedDate?t=` from ${this.minSelectedDate}`:this.maxSelectedDate&&(t=` up to ${this.maxSelectedDate}`);const e=`Filter results for dates${t}`,i=`This histogram shows the distribution of dates${t}`;return F`<title id="histogram-title">${e}</title
      ><desc id="histogram-desc">${i}</desc>`}get noDataTemplate(){return F`
      <div class="missing-data-message">${this.missingDataMessage}</div>
    `}get activityIndicatorTemplate(){return this.loading?F`
      <ia-status-indicator mode="loading" ?hideDots=${!0}>
      </ia-status-indicator>
    `:Et}render(){return this.hasBinData?F`
      <div
        id="container"
        class="
          noselect
          ${this._isDragging?"dragging":""}
        "
        style="width: ${this.width}px"
      >
        ${this.activityIndicatorTemplate} ${this.tooltipTemplate}
        <div
          class="inner-container
          ${this.disabled?"disabled":""}"
        >
          <svg
            width="${this.width}"
            height="${this.height}"
            aria-labelledby="histogram-title histogram-desc"
            @pointerleave="${this.drop}"
          >
            ${this.histogramAccessibilityTemplate} ${this.selectedRangeTemplate}
            <svg id="histogram">${this.histogramTemplate}</svg>
            ${this.minSliderTemplate} ${this.maxSliderTemplate}
          </svg>
          <div id="inputs">
            ${this.minLabelTemplate} ${this.minInputTemplate}
            <div class="dash">-</div>
            ${this.maxLabelTemplate} ${this.maxInputTemplate}
            <slot name="inputs-right-side"></slot>
          </div>
        </div>
      </div>
    `:this.noDataTemplate}};u.styles=T`
    .missing-data-message {
      text-align: center;
    }
    #container {
      margin: 0;
      touch-action: none;
      position: relative;
    }
    .disabled {
      opacity: 0.3;
    }
    ia-status-indicator {
      position: absolute;
      left: calc(50% - 10px);
      top: 10px;
      --icon-width: 20px;
      --loading-ring-color--: ${xe};
    }

    /* prevent selection from interfering with tooltip, especially on mobile */
    /* https://stackoverflow.com/a/4407335/1163042 */
    .noselect {
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* current Chrome, Edge, Opera and Firefox */
    }
    .bar,
    .bar-pointer-target {
      /* create a transparent border around the hist bars to prevent "gaps" and
      flickering when moving around between bars. this also helps with handling
      clicks on the bars, preventing users from being able to click in between
      bars */
      stroke: rgba(0, 0, 0, 0);
      /* ensure transparent stroke wide enough to cover gap between bars */
      stroke-width: 2px;
    }
    .bar {
      /* ensure the bar's pointer target receives events, not the bar itself */
      pointer-events: none;
    }
    .bar-pointer-target:hover + .bar {
      /* highlight currently hovered bar */
      fill-opacity: 0.7;
    }
    .disabled .bar-pointer-target:hover + .bar {
      /* ensure no visual hover interaction when disabled */
      fill-opacity: 1;
    }
    /****** histogram ********/
    #tooltip {
      position: absolute;
      background: ${mt};
      margin: 0;
      border: 0;
      color: ${pt};
      text-align: center;
      border-radius: 3px;
      padding: 2px;
      font-size: ${Ie};
      font-family: ${Ce};
      touch-action: none;
      pointer-events: none;
      overflow: visible;
    }
    #tooltip:after {
      content: '';
      position: absolute;
      margin-left: -5px;
      top: 100%;
      left: 50%;
      /* arrow */
      border: 5px solid ${pt};
      border-color: ${mt} transparent transparent
        transparent;
    }
    /****** slider ********/
    .slider {
      shape-rendering: crispEdges; /* So the slider doesn't get blurry if dragged between pixels */
    }
    .draggable:hover {
      cursor: grab;
    }
    .dragging {
      cursor: grabbing !important;
    }
    /****** inputs ********/
    #inputs {
      display: flex;
      justify-content: center;
      margin: ${Te};
    }
    #inputs .dash {
      position: relative;
      bottom: -1px;
      align-self: center; /* Otherwise the dash sticks to the top while the inputs grow */
    }
    input {
      width: ${Fe};
      margin: 0 3px;
      border: ${we};
      border-radius: 2px !important;
      text-align: center;
      font-size: ${Ee};
      font-family: ${Oe};
    }
    .sr-only {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      overflow: hidden !important;
      white-space: nowrap !important;
      clip: rect(1px, 1px, 1px, 1px) !important;
      -webkit-clip-path: inset(50%) !important;
      clip-path: inset(50%) !important;
    }
  `;g([D({type:Number})],u.prototype,"width",2);g([D({type:Number})],u.prototype,"height",2);g([D({type:Number})],u.prototype,"sliderWidth",2);g([D({type:Number})],u.prototype,"tooltipWidth",2);g([D({type:Number})],u.prototype,"tooltipHeight",2);g([D({type:Number})],u.prototype,"updateDelay",2);g([D({type:String})],u.prototype,"dateFormat",2);g([D({type:String})],u.prototype,"missingDataMessage",2);g([D({type:String})],u.prototype,"minDate",2);g([D({type:String})],u.prototype,"maxDate",2);g([D({type:Boolean})],u.prototype,"disabled",2);g([D({type:Array})],u.prototype,"bins",2);g([D({type:Boolean})],u.prototype,"updateWhileFocused",2);g([D({type:String})],u.prototype,"binSnapping",2);g([D({type:String})],u.prototype,"tooltipLabel",2);g([D({type:String})],u.prototype,"barScaling",2);g([R()],u.prototype,"_tooltipOffsetX",2);g([R()],u.prototype,"_tooltipOffsetY",2);g([R()],u.prototype,"_tooltipContent",2);g([R()],u.prototype,"_tooltipDateFormat",2);g([R()],u.prototype,"_isDragging",2);g([R()],u.prototype,"_isLoading",2);g([Ot("#tooltip")],u.prototype,"_tooltip",2);g([D({type:String})],u.prototype,"tooltipDateFormat",1);g([D({type:Boolean})],u.prototype,"loading",1);g([D()],u.prototype,"minSelectedDate",1);g([D()],u.prototype,"maxSelectedDate",1);u=g([ft("ia-histogram-date-range")],u);var Le=Object.defineProperty,Ye=Object.getOwnPropertyDescriptor,rt=(t,e,i,a)=>{for(var r=a>1?void 0:a?Ye(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(a?n(e,i,r):n(r))||r);return a&&r&&Le(e,i,r),r};const Re=[3,8,15,40,90,130,175,140,95,60,30,12,4],Ae=[{label:"Slider color",cssVariable:"--histogramDateRangeSliderColor",defaultValue:"#4b65fe",inputType:"color"},{label:"Selected range color",cssVariable:"--histogramDateRangeSelectedRangeColor",defaultValue:"#dbe0ff",inputType:"color"},{label:"Included bar color",cssVariable:"--histogramDateRangeBarIncludedFill",defaultValue:"#2c2c2c",inputType:"color"},{label:"Excluded bar color",cssVariable:"--histogramDateRangeBarExcludedFill",defaultValue:"#cccccc",inputType:"color"},{label:"Spinner color",cssVariable:"--histogramDateRangeActivityIndicator",defaultValue:"#2c2c2c",inputType:"color"}],Ne=[{label:"Bin snapping",propertyName:"binSnapping",defaultValue:"year",inputType:"radio",radioOptions:["none","month","year"]},{label:"Loading",propertyName:"loading",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Bar scaling",propertyName:"barScaling",defaultValue:"logarithmic",inputType:"radio",radioOptions:["logarithmic","linear"]},{label:"Tooltip label",propertyName:"tooltipLabel",defaultValue:"item",inputType:"text"},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let G=class extends gt{constructor(){super(...arguments),this.minSelectedDate="",this.maxSelectedDate=""}render(){return F`
      <story-template
        elementTag="ia-histogram-date-range"
        elementClassName="IAHistogramDateRange"
        .styleInputData=${{settings:Ae}}
        .propInputData=${{settings:Ne}}
        .defaultUsageProps=${`.bins=\${bins}
  minDate="1975"
  maxDate="2025"`}
      >
        <ia-histogram-date-range
          slot="demo"
          minDate="1975"
          maxDate="2025"
          binSnapping="year"
          .bins=${Re}
          @histogramDateRangeUpdated=${t=>{this.minSelectedDate=t.detail.minDate,this.maxSelectedDate=t.detail.maxDate}}
        ></ia-histogram-date-range>

        <p slot="demo" class="readout">
          <code>histogramDateRangeUpdated</code>:
          ${this.minSelectedDate&&this.maxSelectedDate?`${this.minSelectedDate} – ${this.maxSelectedDate}`:"none yet — drag a slider or type a date"}
        </p>

        <div slot="usage-notes">
          <p>
            A histogram of counts over a date range, with two sliders for
            narrowing the selection. Dragging a slider, typing into a date
            input, or clicking a bar all move the nearest slider; the element
            debounces those into a single
            <code>histogramDateRangeUpdated</code> event once things settle.
          </p>
          <p>
            <code>binSnapping</code> controls whether bin boundaries land on
            exact month/year starts (useful when each bin genuinely represents a
            calendar month or year) or on arbitrary, evenly-spaced points across
            the range.
          </p>
        </div>
      </story-template>
    `}static get styles(){return T`
      /* The element sizes its tooltip and date inputs in fixed pixels but
       * their text in rem, and inherits its line height from the page, so the
       * two only line up where 1rem is 10px and lines are tight, as they are
       * on archive.org. This page inherits the browser's 16px default and a
       * 1.5 line height, which together overflow the tooltip and clip a
       * 4-digit year, so pin the text to what that geometry expects. */
      ia-histogram-date-range {
        --histogramDateRangeTooltipFontSize: 11px;
        --histogramDateRangeInputFontSize: 12px;
        line-height: normal;
      }

      .readout {
        font-size: 0.9em;
      }
    `}};rt([R()],G.prototype,"minSelectedDate",2);rt([R()],G.prototype,"maxSelectedDate",2);G=rt([ft("ia-histogram-date-range-story")],G);export{G as IAHistogramDateRangeStory};
