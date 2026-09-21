import{a as T,n as y,r as R,i as gt,b as I,w as K,A as xt,c as ft}from"./index-CaHLIEp_.js";import"./ia-status-indicator-CjyTniRu.js";import{l as nt}from"./live-cLdMGMYb.js";import{e as _t}from"./directive-helpers-Dx6pl_yL.js";import"./story-template-D1Lpvf8R.js";import"./runtime-CCgtQBty.js";import"./masked-icon-1ls-oJKK.js";var vt=60,Dt=vt*60,St=Dt*24,Tt=St*7,P=1e3,Q=vt*P,st=Dt*P,wt=St*P,Ft=Tt*P,it="millisecond",A="second",W="minute",U="hour",C="day",j="week",F="month",$t="quarter",Y="year",H="date",Et="YYYY-MM-DDTHH:mm:ssZ",ot="Invalid Date",It=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,Ot=/\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;const Ct={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var i=["th","st","nd","rd"],a=t%100;return"["+t+(i[(a-20)%10]||i[a]||i[0])+"]"}};var et=function(t,i,a){var r=String(t);return!r||r.length>=i?t:""+Array(i+1-r.length).join(a)+t},Yt=function(t){var i=-t.utcOffset(),a=Math.abs(i),r=Math.floor(a/60),n=a%60;return(i<=0?"+":"-")+et(r,2,"0")+":"+et(n,2,"0")},Lt=function e(t,i){if(t.date()<i.date())return-e(i,t);var a=(i.year()-t.year())*12+(i.month()-t.month()),r=t.clone().add(a,F),n=i-r<0,s=t.clone().add(a+(n?-1:1),F);return+(-(a+(i-r)/(n?r-s:s-r))||0)},Rt=function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},Nt=function(t){var i={M:F,y:Y,w:j,d:C,D:H,h:U,m:W,s:A,ms:it,Q:$t};return i[t]||String(t||"").toLowerCase().replace(/s$/,"")},At=function(t){return t===void 0};const Wt={s:et,z:Yt,m:Lt,a:Rt,p:Nt,u:At};var X="en",N={};N[X]=Ct;var yt="$isDayjsObject",at=function(t){return t instanceof q||!!(t&&t[yt])},Z=function e(t,i,a){var r;if(!t)return X;if(typeof t=="string"){var n=t.toLowerCase();N[n]&&(r=n),i&&(N[n]=i,r=n);var s=t.split("-");if(!r&&s.length>1)return e(s[0])}else{var h=t.name;N[h]=t,r=h}return!a&&r&&(X=r),r||!a&&X},v=function(t,i){if(at(t))return t.clone();var a=typeof i=="object"?i:{};return a.date=t,a.args=arguments,new q(a)},Ut=function(t,i){return v(t,{locale:i.$L,utc:i.$u,x:i.$x,$offset:i.$offset})},u=Wt;u.l=Z;u.i=at;u.w=Ut;var Ht=function(t){var i=t.date,a=t.utc;if(i===null)return new Date(NaN);if(u.u(i))return new Date;if(i instanceof Date)return new Date(i);if(typeof i=="string"&&!/Z$/i.test(i)){var r=i.match(It);if(r){var n=r[2]-1||0,s=(r[7]||"0").substring(0,3);return a?new Date(Date.UTC(r[1],n,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],n,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(i)},q=(function(){function e(i){this.$L=Z(i.locale,null,!0),this.parse(i),this.$x=this.$x||i.x||{},this[yt]=!0}var t=e.prototype;return t.parse=function(a){this.$d=Ht(a),this.init()},t.init=function(){var a=this.$d;this.$y=a.getFullYear(),this.$M=a.getMonth(),this.$D=a.getDate(),this.$W=a.getDay(),this.$H=a.getHours(),this.$m=a.getMinutes(),this.$s=a.getSeconds(),this.$ms=a.getMilliseconds()},t.$utils=function(){return u},t.isValid=function(){return this.$d.toString()!==ot},t.isSame=function(a,r){var n=v(a);return this.startOf(r)<=n&&n<=this.endOf(r)},t.isAfter=function(a,r){return v(a)<this.startOf(r)},t.isBefore=function(a,r){return this.endOf(r)<v(a)},t.$g=function(a,r,n){return u.u(a)?this[r]:this.set(n,a)},t.unix=function(){return Math.floor(this.valueOf()/1e3)},t.valueOf=function(){return this.$d.getTime()},t.startOf=function(a,r){var n=this,s=u.u(r)?!0:r,h=u.p(a),o=function(x,M){var D=u.w(n.$u?Date.UTC(n.$y,M,x):new Date(n.$y,M,x),n);return s?D:D.endOf(C)},d=function(x,M){var D=[0,0,0,0],E=[23,59,59,999];return u.w(n.toDate()[x].apply(n.toDate("s"),(s?D:E).slice(M)),n)},l=this.$W,m=this.$M,c=this.$D,f="set"+(this.$u?"UTC":"");switch(h){case Y:return s?o(1,0):o(31,11);case F:return s?o(1,m):o(0,m+1);case j:{var S=this.$locale().weekStart||0,b=(l<S?l+7:l)-S;return o(s?c-b:c+(6-b),m)}case C:case H:return d(f+"Hours",0);case U:return d(f+"Minutes",1);case W:return d(f+"Seconds",2);case A:return d(f+"Milliseconds",3);default:return this.clone()}},t.endOf=function(a){return this.startOf(a,!1)},t.$set=function(a,r){var n,s=u.p(a),h="set"+(this.$u?"UTC":""),o=(n={},n[C]=h+"Date",n[H]=h+"Date",n[F]=h+"Month",n[Y]=h+"FullYear",n[U]=h+"Hours",n[W]=h+"Minutes",n[A]=h+"Seconds",n[it]=h+"Milliseconds",n)[s],d=s===C?this.$D+(r-this.$W):r;if(s===F||s===Y){var l=this.clone().set(H,1);l.$d[o](d),l.init(),this.$d=l.set(H,Math.min(this.$D,l.daysInMonth())).$d}else o&&this.$d[o](d);return this.init(),this},t.set=function(a,r){return this.clone().$set(a,r)},t.get=function(a){return this[u.p(a)]()},t.add=function(a,r){var n=this,s;a=Number(a);var h=u.p(r),o=function(c){var f=v(n);return u.w(f.date(f.date()+Math.round(c*a)),n)};if(h===F)return this.set(F,this.$M+a);if(h===Y)return this.set(Y,this.$y+a);if(h===C)return o(1);if(h===j)return o(7);var d=(s={},s[W]=Q,s[U]=st,s[A]=P,s)[h]||1,l=this.$d.getTime()+a*d;return u.w(l,this)},t.subtract=function(a,r){return this.add(a*-1,r)},t.format=function(a){var r=this,n=this.$locale();if(!this.isValid())return n.invalidDate||ot;var s=a||Et,h=u.z(this),o=this.$H,d=this.$m,l=this.$M,m=n.weekdays,c=n.months,f=n.meridiem,S=function(D,E,O,k){return D&&(D[E]||D(r,s))||O[E].slice(0,k)},b=function(D){return u.s(o%12||12,D,"0")},$=f||function(M,D,E){var O=M<12?"AM":"PM";return E?O.toLowerCase():O},x=function(D){switch(D){case"YY":return String(r.$y).slice(-2);case"YYYY":return u.s(r.$y,4,"0");case"M":return l+1;case"MM":return u.s(l+1,2,"0");case"MMM":return S(n.monthsShort,l,c,3);case"MMMM":return S(c,l);case"D":return r.$D;case"DD":return u.s(r.$D,2,"0");case"d":return String(r.$W);case"dd":return S(n.weekdaysMin,r.$W,m,2);case"ddd":return S(n.weekdaysShort,r.$W,m,3);case"dddd":return m[r.$W];case"H":return String(o);case"HH":return u.s(o,2,"0");case"h":return b(1);case"hh":return b(2);case"a":return $(o,d,!0);case"A":return $(o,d,!1);case"m":return String(d);case"mm":return u.s(d,2,"0");case"s":return String(r.$s);case"ss":return u.s(r.$s,2,"0");case"SSS":return u.s(r.$ms,3,"0");case"Z":return h}return null};return s.replace(Ot,function(M,D){return D||x(M)||h.replace(":","")})},t.utcOffset=function(){return-Math.round(this.$d.getTimezoneOffset()/15)*15},t.diff=function(a,r,n){var s=this,h=u.p(r),o=v(a),d=(o.utcOffset()-this.utcOffset())*Q,l=this-o,m=function(){return u.m(s,o)},c;switch(h){case Y:c=m()/12;break;case F:c=m();break;case $t:c=m()/3;break;case j:c=(l-d)/Ft;break;case C:c=(l-d)/wt;break;case U:c=l/st;break;case W:c=l/Q;break;case A:c=l/P;break;default:c=l;break}return n?c:u.a(c)},t.daysInMonth=function(){return this.endOf(F).$D},t.$locale=function(){return N[this.$L]},t.locale=function(a,r){if(!a)return this.$L;var n=this.clone(),s=Z(a,r,!0);return s&&(n.$L=s),n},t.clone=function(){return u.w(this.$d,this)},t.toDate=function(){return new Date(this.valueOf())},t.toJSON=function(){return this.isValid()?this.toISOString():null},t.toISOString=function(){return this.$d.toISOString()},t.toString=function(){return this.$d.toUTCString()},e})(),bt=q.prototype;v.prototype=bt;[["$ms",it],["$s",A],["$m",W],["$H",U],["$W",C],["$M",F],["$y",Y],["$D",H]].forEach(function(e){bt[e[1]]=function(t){return this.$g(t,e[0],e[1])}});v.extend=function(e,t){return e.$i||(e(t,q,v),e.$i=!0),v};v.locale=Z;v.isDayjs=at;v.unix=function(e){return v(e*1e3)};v.en=N[X];v.Ls=N;v.p={};var Pt=function(t){return t.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(i,a,r){return a||r.slice(1)})},kt={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Bt=function(t,i){return t.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(a,r,n){var s=n&&n.toUpperCase();return r||i[n]||kt[n]||Pt(i[s])})},Vt=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,ht=/\d/,B=/\d\d/,Xt=/\d{3}/,zt=/\d{4}/,w=/\d\d?/,jt=/[+-]?\d+/,Zt=/[+-]\d\d:?(\d\d)?|Z/,V=/\d*[^-_:/,()\s\d]+/,L={},Mt=function(t){return t=+t,t+(t>68?1900:2e3)};function Gt(e){if(!e||e==="Z")return 0;var t=e.match(/([+-]|\d\d)/g),i=+(t[1]*60)+(+t[2]||0);return i===0?0:t[0]==="+"?-i:i}var _=function(t){return function(i){this[t]=+i}},lt=[Zt,function(e){var t=this.zone||(this.zone={});t.offset=Gt(e)}],tt=function(t){var i=L[t];return i&&(i.indexOf?i:i.s.concat(i.f))},dt=function(t,i){var a,r=L,n=r.meridiem;if(!n)a=t===(i?"pm":"PM");else for(var s=1;s<=24;s+=1)if(t.indexOf(n(s,0,i))>-1){a=s>12;break}return a},qt={A:[V,function(e){this.afternoon=dt(e,!1)}],a:[V,function(e){this.afternoon=dt(e,!0)}],Q:[ht,function(e){this.month=(e-1)*3+1}],S:[ht,function(e){this.milliseconds=+e*100}],SS:[B,function(e){this.milliseconds=+e*10}],SSS:[Xt,function(e){this.milliseconds=+e}],s:[w,_("seconds")],ss:[w,_("seconds")],m:[w,_("minutes")],mm:[w,_("minutes")],H:[w,_("hours")],h:[w,_("hours")],HH:[w,_("hours")],hh:[w,_("hours")],D:[w,_("day")],DD:[B,_("day")],Do:[V,function(e){var t=L,i=t.ordinal,a=e.match(/\d+/);if(this.day=a[0],!!i)for(var r=1;r<=31;r+=1)i(r).replace(/\[|\]/g,"")===e&&(this.day=r)}],w:[w,_("week")],ww:[B,_("week")],M:[w,_("month")],MM:[B,_("month")],MMM:[V,function(e){var t=tt("months"),i=tt("monthsShort"),a=(i||t.map(function(r){return r.slice(0,3)})).indexOf(e)+1;if(a<1)throw new Error;this.month=a%12||a}],MMMM:[V,function(e){var t=tt("months"),i=t.indexOf(e)+1;if(i<1)throw new Error;this.month=i%12||i}],Y:[jt,_("year")],YY:[B,function(e){this.year=Mt(e)}],YYYY:[zt,_("year")],Z:lt,ZZ:lt};function Jt(e){var t=e.afternoon;if(t!==void 0){var i=e.hours;t?i<12&&(e.hours+=12):i===12&&(e.hours=0),delete e.afternoon}}function Kt(e){e=Bt(e,L&&L.formats);for(var t=e.match(Vt),i=t.length,a=0;a<i;a+=1){var r=t[a],n=qt[r],s=n&&n[0],h=n&&n[1];h?t[a]={regex:s,parser:h}:t[a]=r.replace(/^\[|\]$/g,"")}return function(o){for(var d={},l=0,m=0;l<i;l+=1){var c=t[l];if(typeof c=="string")m+=c.length;else{var f=c.regex,S=c.parser,b=o.slice(m),$=f.exec(b),x=$[0];S.call(d,x),o=o.replace(x,"")}}return Jt(d),d}}var Qt=function(t,i,a,r){try{if(["x","X"].indexOf(i)>-1)return new Date((i==="X"?1e3:1)*t);var n=Kt(i),s=n(t),h=s.year,o=s.month,d=s.day,l=s.hours,m=s.minutes,c=s.seconds,f=s.milliseconds,S=s.zone,b=s.week,$=new Date,x=d||(!h&&!o?$.getDate():1),M=h||$.getFullYear(),D=0;h&&!o||(D=o>0?o-1:$.getMonth());var E=l||0,O=m||0,k=c||0,J=f||0;if(S)return new Date(Date.UTC(M,D,x,E,O,k,J+S.offset*60*1e3));if(a)return new Date(Date.UTC(M,D,x,E,O,k,J));var z;return z=new Date(M,D,x,E,O,k,J),b&&(z=r(z).week(b).toDate()),z}catch{return new Date("")}};const te=(function(e,t,i){i.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(Mt=e.parseTwoDigitYear);var a=t.prototype,r=a.parse;a.parse=function(n){var s=n.date,h=n.utc,o=n.args;this.$u=h;var d=o[1];if(typeof d=="string"){var l=o[2]===!0,m=o[3]===!0,c=l||m,f=o[2];m&&(f=o[2]),L=this.$locale(),!l&&f&&(L=i.Ls[f]),this.$d=Qt(s,d,h,i),this.init(),f&&f!==!0&&(this.$L=this.locale(f).$L),c&&s!=this.format(d)&&(this.$d=new Date("")),L={}}else if(d instanceof Array)for(var S=d.length,b=1;b<=S;b+=1){o[1]=d[b-1];var $=i.apply(this,o);if($.isValid()){this.$d=$.$d,this.$L=$.$L,this.init();break}b===S&&(this.$d=new Date(""))}else r.call(this,n)}});function ee(e,t){const i=t.prototype,a=i.parse;i.parse=function(r){const n=r.date,s=r.args[1];a.call(this,r);const h=this.year(),o=h>=1900&&h<2e3,d=typeof s=="string"&&s.includes("YYYY"),l=Array.isArray(s)&&typeof s[0]=="string"&&s[0].includes("YYYY"),m=d||l,c=typeof n=="string"&&!n.includes(`${h}`);o&&m&&c&&(this.$d.setFullYear(h-1900),this.init())}}var ie=Object.defineProperty,ae=Object.getOwnPropertyDescriptor,g=(e,t,i,a)=>{for(var r=a>1?void 0:a?ae(t,i):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=(a?s(t,i,r):s(r))||r);return a&&r&&ie(t,i,r),r};v.extend(te);v.extend(ee);const re=180,ne=40,se=10,oe=125,he=30,ct="YYYY",le="no data",de=0,ut=4,ce=T`var(--histogramDateRangeSliderColor, #4B65FE)`,ue=T`var(--histogramDateRangeSelectedRangeColor, #DBE0FF)`,me=T`var(--histogramDateRangeBarIncludedFill, #2C2C2C)`,pe=T`var(--histogramDateRangeActivityIndicator, #2C2C2C)`,ge=T`var(--histogramDateRangeBarExcludedFill, #CCCCCC)`,fe=T`var(--histogramDateRangeInputRowMargin, 0)`,ve=T`var(--histogramDateRangeInputBorder, 0.5px solid #2C2C2C)`,De=T`var(--histogramDateRangeInputWidth, 35px)`,Se=T`var(--histogramDateRangeInputFontSize, 1.2rem)`,$e=T`var(--histogramDateRangeInputFontFamily, sans-serif)`,mt=T`var(--histogramDateRangeTooltipBackgroundColor, #2C2C2C)`,pt=T`var(--histogramDateRangeTooltipTextColor, #FFFFFF)`,ye=T`var(--histogramDateRangeTooltipFontSize, 1.1rem)`,be=T`var(--histogramDateRangeTooltipFontFamily, sans-serif)`;let p=class extends gt{constructor(){super(...arguments),this.width=re,this.height=ne,this.sliderWidth=se,this.tooltipWidth=oe,this.tooltipHeight=he,this.updateDelay=de,this.dateFormat=ct,this.missingDataMessage=le,this.minDate="",this.maxDate="",this.disabled=!1,this.bins=[],this.updateWhileFocused=!1,this.binSnapping="none",this._tooltipOffset=0,this._tooltipVisible=!1,this._isDragging=!1,this._isLoading=!1,this._minSelectedDate="",this._maxSelectedDate="",this._minDateMS=0,this._maxDateMS=0,this._dragOffset=0,this._histWidth=0,this._binWidth=0,this._histData=[],this._previousDateRange="",this.drag=e=>{e.preventDefault(),!this.disabled&&(this.setDragOffset(e),this._isDragging=!0,this.addListeners(),this.cancelPendingUpdateEvent())},this.drop=()=>{this._isDragging&&(this.removeListeners(),this.beginEmitUpdateProcess()),this._isDragging=!1},this.move=e=>{const t=this.getBoundingClientRect().x,i=e.clientX-t-this._dragOffset;this._currentSlider.id==="slider-min"?this.minSelectedDate=this.translatePositionToDate(this.validMinSliderX(i)):(this.maxSelectedDate=this.translatePositionToDate(this.validMaxSliderX(i)),this.getMSFromString(this.maxSelectedDate)>this._maxDateMS&&(this.maxSelectedDate=this.maxDate))}}disconnectedCallback(){this.removeListeners(),super.disconnectedCallback()}willUpdate(e){(e.has("bins")||e.has("minDate")||e.has("maxDate")||e.has("width")||e.has("height")||e.has("binSnapping"))&&this.handleDataUpdate()}handleDataUpdate(){this.hasBinData&&(this._histWidth=this.width-this.sliderWidth*2,this._minDateMS=this.snapTimestamp(this.getMSFromString(this.minDate)),this._maxDateMS=this.snapTimestamp(this.getMSFromString(this.maxDate)+this.snapInterval)+this.snapEndOffset,this._binWidth=this._histWidth/this._numBins,this._previousDateRange=this.currentDateRangeString,this._histData=this.calculateHistData(),this.minSelectedDate=this.minSelectedDate?this.minSelectedDate:this.minDate,this.maxSelectedDate=this.maxSelectedDate?this.maxSelectedDate:this.maxDate)}snapToNextSecond(e){return Math.ceil(e/1e3)*1e3}snapToMonth(e){const t=v(e),i=t.date()<16?0:1;return t.add(i,"month").date(1).hour(0).minute(0).second(0).millisecond(0).valueOf()}snapToYear(e){const t=v(e),i=t.month()<6?0:1;return t.add(i,"year").month(0).date(1).hour(0).minute(0).second(0).millisecond(0).valueOf()}snapTimestamp(e){switch(this.binSnapping){case"year":return this.snapToYear(e);case"month":return this.snapToMonth(e);default:return this.snapToNextSecond(e)}}calculateHistData(){const{bins:e,height:t,dateRangeMS:i,_numBins:a,_minDateMS:r}=this,n=Math.min(...this.bins),s=Math.max(...this.bins),h=n===s?1:Math.log1p(s),o=t/h,d=i/a;return e.map((l,m)=>{const c=this.snapTimestamp(m*d+r),f=this.formatDate(c),S=this.snapTimestamp((m+1)*d+r)+this.snapEndOffset,b=this.formatDate(S),$=this.formatDate(c,this.tooltipDateFormat),x=this.formatDate(S,this.tooltipDateFormat),M=$===x?$:`${$} - ${x}`;return{value:l,height:Math.floor(Math.log1p(l)*o),binStart:f,binEnd:b,tooltip:M}})}get hasBinData(){return this._numBins>0}get _numBins(){return!this.bins||!this.bins.length?0:this.bins.length}get histogramLeftEdgeX(){return this.sliderWidth}get histogramRightEdgeX(){return this.width-this.sliderWidth}get snapInterval(){switch(this.binSnapping){case"year":return 31536e6;case"month":return 2592e6;default:return 0}}get snapEndOffset(){return this.binSnapping!=="none"&&this._numBins>1?-1:0}get tooltipDateFormat(){return this._tooltipDateFormat??this.dateFormat}set tooltipDateFormat(e){this._tooltipDateFormat=e}get loading(){return this._isLoading}set loading(e){this.disabled=e,this._isLoading=e}get minSelectedDate(){return this.formatDate(this.getMSFromString(this._minSelectedDate))}set minSelectedDate(e){if(!this._minSelectedDate){this._minSelectedDate=e;return}const t=this.getMSFromString(e),i=!Number.isNaN(t),a=t<=this.getMSFromString(this.maxSelectedDate);i&&a&&(this._minSelectedDate=this.formatDate(t)),this.requestUpdate()}get maxSelectedDate(){return this.formatDate(this.getMSFromString(this._maxSelectedDate))}set maxSelectedDate(e){if(!this._maxSelectedDate){this._maxSelectedDate=e;return}const t=this.getMSFromString(e),i=!Number.isNaN(t),a=t>=this.getMSFromString(this.minSelectedDate);i&&a&&(this._maxSelectedDate=this.formatDate(t)),this.requestUpdate()}get minSliderX(){const e=this.translateDateToPosition(this.minSelectedDate);return this.validMinSliderX(e)}get maxSliderX(){const e=this.snapTimestamp(this.getMSFromString(this.maxSelectedDate)+this.snapInterval),t=this.translateDateToPosition(this.formatDate(e));return this.validMaxSliderX(t)}get dateRangeMS(){return this._maxDateMS-this._minDateMS}showTooltip(e){if(this._isDragging||this.disabled)return;const t=e.currentTarget,i=t.x.baseVal.value+this.sliderWidth/2,a=t.dataset,r=`item${a.numItems!=="1"?"s":""}`,n=Number(a.numItems).toLocaleString();this._tooltipOffset=i+(this._binWidth-this.sliderWidth-this.tooltipWidth)/2,this._tooltipContent=I`
      ${n} ${r}<br />
      ${a.tooltip}
    `,this._tooltipVisible=!0}hideTooltip(){this._tooltipContent=void 0,this._tooltipVisible=!1}validMinSliderX(e){const t=Math.min(this.translateDateToPosition(this.maxSelectedDate),this.histogramRightEdgeX);return e=this.clamp(e,this.histogramLeftEdgeX,t),Number.isNaN(e)||t<this.histogramLeftEdgeX?this.histogramLeftEdgeX:e}validMaxSliderX(e){const t=Math.max(this.histogramLeftEdgeX,this.translateDateToPosition(this.minSelectedDate));return e=this.clamp(e,t,this.histogramRightEdgeX),Number.isNaN(e)||t>this.histogramRightEdgeX?this.histogramRightEdgeX:e}addListeners(){window.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.drop),window.addEventListener("pointercancel",this.drop)}removeListeners(){window.removeEventListener("pointermove",this.move),window.removeEventListener("pointerup",this.drop),window.removeEventListener("pointercancel",this.drop)}beginEmitUpdateProcess(){this.cancelPendingUpdateEvent(),this._emitUpdatedEventTimer=setTimeout(()=>{if(this.currentDateRangeString===this._previousDateRange)return;this._previousDateRange=this.currentDateRangeString;const e={detail:{minDate:this.minSelectedDate,maxDate:this.maxSelectedDate},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("histogramDateRangeUpdated",e))},this.updateDelay)}cancelPendingUpdateEvent(){this._emitUpdatedEventTimer!==void 0&&(clearTimeout(this._emitUpdatedEventTimer),this._emitUpdatedEventTimer=void 0)}setDragOffset(e){this._currentSlider=e.currentTarget;const t=this._currentSlider.id==="slider-min"?this.minSliderX:this.maxSliderX,i=this.getBoundingClientRect().x;this._dragOffset=e.clientX-i-t}translatePositionToDate(e){const t=this.snapToNextSecond((e-this.sliderWidth)*this.dateRangeMS/this._histWidth);return this.formatDate(this._minDateMS+t)}translateDateToPosition(e){const t=this.getMSFromString(e);return this.sliderWidth+(t-this._minDateMS)*this._histWidth/this.dateRangeMS}clamp(e,t,i){return Math.min(Math.max(e,t),i)}handleInputFocus(){this.updateWhileFocused||this.cancelPendingUpdateEvent()}handleMinDateInput(e){const t=e.currentTarget;t.value!==this.minSelectedDate&&(this.minSelectedDate=t.value,this.beginEmitUpdateProcess())}handleMaxDateInput(e){const t=e.currentTarget;t.value!==this.maxSelectedDate&&(this.maxSelectedDate=t.value,this.beginEmitUpdateProcess())}handleKeyUp(e){if(e.key==="Enter"){const t=e.currentTarget;t.blur(),t.id==="date-min"?this.handleMinDateInput(e):t.id==="date-max"&&this.handleMaxDateInput(e)}}get currentDateRangeString(){return`${this.minSelectedDate}:${this.maxSelectedDate}`}getMSFromString(e){const t=typeof e=="string"?e:String(e);if((t.split(/(\d+)/).length-1)/2===1){const a=new Date(0,0);return a.setFullYear(Number(t)),a.getTime()}return v(t,[this.dateFormat,ct]).valueOf()}handleBarClick(e){const t=e.currentTarget.dataset,i=(this.getMSFromString(t.binStart)+this.getMSFromString(t.binEnd))/2,a=Math.abs(i-this.getMSFromString(this.minSelectedDate)),r=Math.abs(i-this.getMSFromString(this.maxSelectedDate));a<r?this.minSelectedDate=t.binStart:this.maxSelectedDate=t.binEnd,this.beginEmitUpdateProcess()}get minSliderTemplate(){const e=ut,t=`
            M${this.minSliderX},0
            h-${this.sliderWidth-e}
            q-${e},0 -${e},${e}
            v${this.height-e*2}
            q0,${e} ${e},${e}
            h${this.sliderWidth-e}
          `;return this.generateSliderSVG(this.minSliderX,"slider-min",t)}get maxSliderTemplate(){const e=ut,t=`
            M${this.maxSliderX},0
            h${this.sliderWidth-e}
            q${e},0 ${e},${e}
            v${this.height-e*2}
            q0,${e} -${e},${e}
            h-${this.sliderWidth-e}
          `;return this.generateSliderSVG(this.maxSliderX,"slider-max",t)}generateSliderSVG(e,t,i){const a=t==="slider-min"?1:-1,r=_t({slider:!0,draggable:!this.disabled,dragging:this._isDragging});return K`
    <svg
      id=${t}
      class=${r}
      @pointerdown=${this.drag}
    >
      <path d="${i} z" fill="${ce}" />
      <rect
        x="${e-this.sliderWidth*a+this.sliderWidth*.4*a}"
        y="${this.height/3}"
        width="1"
        height="${this.height/3}"
        fill="white"
      />
      <rect
        x="${e-this.sliderWidth*a+this.sliderWidth*.6*a}"
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
        fill="${ue}"
      />`}get histogramTemplate(){const e=this._histWidth/this._numBins,t=e-1;let i=this.sliderWidth;return this._histData.map(a=>{const{minSelectedDate:r,maxSelectedDate:n}=this,s=a.height,h=this.isBefore(a.binEnd,r),o=this.isAfter(a.binStart,n),d=h||o?ge:me,l=`stroke-dasharray: 0 ${t} ${s} ${t} 0 ${s}`,m=K`
        <rect
          class="bar"
          style=${l}
          x=${i}
          y=${this.height-s}
          width=${t}
          height=${s}
          @pointerenter=${this.showTooltip}
          @pointerleave=${this.hideTooltip}
          @click=${this.handleBarClick}
          fill=${d}
          data-num-items=${a.value}
          data-bin-start=${a.binStart}
          data-bin-end=${a.binEnd}
          data-tooltip=${a.tooltip}
        />`;return i+=e,m})}isBefore(e,t){const i=this.getMSFromString(e),a=this.getMSFromString(t);return i<a}isAfter(e,t){const i=this.getMSFromString(e),a=this.getMSFromString(t);return i>a}formatDate(e,t=this.dateFormat){if(Number.isNaN(e))return"";const i=v(e);return i.year()<1e3?i.year(199999).format(t).replace(/199999/g,i.year().toString()):i.format(t)}get minInputTemplate(){return I`
      <input
        id="date-min"
        placeholder=${this.dateFormat}
        type="text"
        @focus=${this.handleInputFocus}
        @blur=${this.handleMinDateInput}
        @keyup=${this.handleKeyUp}
        .value=${nt(this.minSelectedDate)}
        ?disabled=${this.disabled}
      />
    `}get maxInputTemplate(){return I`
      <input
        id="date-max"
        placeholder=${this.dateFormat}
        type="text"
        @focus=${this.handleInputFocus}
        @blur=${this.handleMaxDateInput}
        @keyup=${this.handleKeyUp}
        .value=${nt(this.maxSelectedDate)}
        ?disabled=${this.disabled}
      />
    `}get minLabelTemplate(){return I`<label for="date-min" class="sr-only">Minimum date:</label>`}get maxLabelTemplate(){return I`<label for="date-max" class="sr-only">Maximum date:</label>`}get tooltipTemplate(){return I`
      <style>
        #tooltip {
          width: ${this.tooltipWidth}px;
          height: ${this.tooltipHeight}px;
          top: ${-9-this.tooltipHeight}px;
          left: ${this._tooltipOffset}px;
          display: ${this._tooltipVisible?"block":"none"};
        }
        #tooltip:after {
          left: ${this.tooltipWidth/2}px;
        }
      </style>
      <div id="tooltip">${this._tooltipContent}</div>
    `}get noDataTemplate(){return I`
      <div class="missing-data-message">${this.missingDataMessage}</div>
    `}get activityIndicatorTemplate(){return this.loading?I`
      <ia-status-indicator mode="loading" ?hideDots=${!0}>
      </ia-status-indicator>
    `:xt}render(){return this.hasBinData?I`
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
            @pointerleave="${this.drop}"
          >
            ${this.selectedRangeTemplate}
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
    `:this.noDataTemplate}};p.styles=T`
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
      --loading-ring-color--: ${pe};
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
    .bar {
      /* create a transparent border around the hist bars to prevent "gaps" and
      flickering when moving around between bars. this also helps with handling
      clicks on the bars, preventing users from being able to click in between
      bars */
      stroke: rgba(0, 0, 0, 0);
      /* ensure transparent stroke wide enough to cover gap between bars */
      stroke-width: 2px;
    }
    .bar:hover {
      /* highlight currently hovered bar */
      fill-opacity: 0.7;
    }
    .disabled .bar:hover {
      /* ensure no visual hover interaction when disabled */
      fill-opacity: 1;
    }
    /****** histogram ********/
    #tooltip {
      position: absolute;
      background: ${mt};
      color: ${pt};
      text-align: center;
      border-radius: 3px;
      padding: 2px;
      font-size: ${ye};
      font-family: ${be};
      touch-action: none;
      pointer-events: none;
    }
    #tooltip:after {
      content: '';
      position: absolute;
      margin-left: -5px;
      top: 100%;
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
      margin: ${fe};
    }
    #inputs .dash {
      position: relative;
      bottom: -1px;
      align-self: center; /* Otherwise the dash sticks to the top while the inputs grow */
    }
    input {
      width: ${De};
      margin: 0 3px;
      border: ${ve};
      border-radius: 2px !important;
      text-align: center;
      font-size: ${Se};
      font-family: ${$e};
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
  `;g([y({type:Number})],p.prototype,"width",2);g([y({type:Number})],p.prototype,"height",2);g([y({type:Number})],p.prototype,"sliderWidth",2);g([y({type:Number})],p.prototype,"tooltipWidth",2);g([y({type:Number})],p.prototype,"tooltipHeight",2);g([y({type:Number})],p.prototype,"updateDelay",2);g([y({type:String})],p.prototype,"dateFormat",2);g([y({type:String})],p.prototype,"missingDataMessage",2);g([y({type:String})],p.prototype,"minDate",2);g([y({type:String})],p.prototype,"maxDate",2);g([y({type:Boolean})],p.prototype,"disabled",2);g([y({type:Array})],p.prototype,"bins",2);g([y({type:Boolean})],p.prototype,"updateWhileFocused",2);g([y({type:String})],p.prototype,"binSnapping",2);g([R()],p.prototype,"_tooltipOffset",2);g([R()],p.prototype,"_tooltipContent",2);g([R()],p.prototype,"_tooltipVisible",2);g([R()],p.prototype,"_tooltipDateFormat",2);g([R()],p.prototype,"_isDragging",2);g([R()],p.prototype,"_isLoading",2);g([y({type:String})],p.prototype,"tooltipDateFormat",1);g([y({type:Boolean})],p.prototype,"loading",1);g([y()],p.prototype,"minSelectedDate",1);g([y()],p.prototype,"maxSelectedDate",1);p=g([ft("ia-histogram-date-range")],p);var Me=Object.defineProperty,xe=Object.getOwnPropertyDescriptor,rt=(e,t,i,a)=>{for(var r=a>1?void 0:a?xe(t,i):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(r=(a?s(t,i,r):s(r))||r);return a&&r&&Me(t,i,r),r};const _e=[3,8,15,40,90,130,175,140,95,60,30,12,4],Te=[{label:"Slider colour",cssVariable:"--histogramDateRangeSliderColor",defaultValue:"#4b65fe",inputType:"color"},{label:"Selected range colour",cssVariable:"--histogramDateRangeSelectedRangeColor",defaultValue:"#dbe0ff",inputType:"color"},{label:"Included bar colour",cssVariable:"--histogramDateRangeBarIncludedFill",defaultValue:"#2c2c2c",inputType:"color"},{label:"Excluded bar colour",cssVariable:"--histogramDateRangeBarExcludedFill",defaultValue:"#cccccc",inputType:"color"}],we=[{label:"Bin snapping",propertyName:"binSnapping",defaultValue:"year",inputType:"radio",radioOptions:["none","month","year"]},{label:"Loading",propertyName:"loading",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let G=class extends gt{constructor(){super(...arguments),this.minSelectedDate="",this.maxSelectedDate=""}render(){return I`
      <story-template
        elementTag="ia-histogram-date-range"
        elementClassName="IAHistogramDateRange"
        .styleInputData=${{settings:Te}}
        .propInputData=${{settings:we}}
        .defaultUsageProps=${`.bins=\${bins}
  minDate="1975"
  maxDate="2025"`}
      >
        <ia-histogram-date-range
          slot="demo"
          minDate="1975"
          maxDate="2025"
          binSnapping="year"
          .bins=${_e}
          @histogramDateRangeUpdated=${e=>{this.minSelectedDate=e.detail.minDate,this.maxSelectedDate=e.detail.maxDate}}
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
      .readout {
        font-size: 0.9em;
      }
    `}};rt([R()],G.prototype,"minSelectedDate",2);rt([R()],G.prototype,"maxSelectedDate",2);G=rt([ft("ia-histogram-date-range-story")],G);export{G as IAHistogramDateRangeStory};
