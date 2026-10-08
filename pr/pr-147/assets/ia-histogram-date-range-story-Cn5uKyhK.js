import{a as T,n as D,r as R,e as xt,i as gt,b as F,d as _t,w as K,A as Tt,c as ft}from"./index-BRVxTcz6.js";import"./ia-status-indicator-BjLBHLzK.js";import{l as nt}from"./live-BTtd6yU9.js";import{o as wt}from"./style-map-DmZRPzOV.js";import"./story-template-Y5cJbLfI.js";import"./localized-decorator-CCkmODHz.js";import"./masked-icon-BW7zfkON.js";import"./directive-helpers-Dbuxcur6.js";var vt=60,St=vt*60,Dt=St*24,Ft=Dt*7,P=1e3,Q=vt*P,st=St*P,Et=Dt*P,Ot=Ft*P,it="millisecond",N="second",W="minute",U="hour",C="day",j="week",E="month",$t="quarter",Y="year",H="date",It="YYYY-MM-DDTHH:mm:ssZ",ot="Invalid Date",Ct=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,Yt=/\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;const Lt={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var i=["th","st","nd","rd"],a=e%100;return"["+e+(i[(a-20)%10]||i[a]||i[0])+"]"}};var et=function(e,i,a){var r=String(e);return!r||r.length>=i?e:""+Array(i+1-r.length).join(a)+e},Rt=function(e){var i=-e.utcOffset(),a=Math.abs(i),r=Math.floor(a/60),n=a%60;return(i<=0?"+":"-")+et(r,2,"0")+":"+et(n,2,"0")},At=function t(e,i){if(e.date()<i.date())return-t(i,e);var a=(i.year()-e.year())*12+(i.month()-e.month()),r=e.clone().add(a,E),n=i-r<0,s=e.clone().add(a+(n?-1:1),E);return+(-(a+(i-r)/(n?r-s:s-r))||0)},Nt=function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},Wt=function(e){var i={M:E,y:Y,w:j,d:C,D:H,h:U,m:W,s:N,ms:it,Q:$t};return i[e]||String(e||"").toLowerCase().replace(/s$/,"")},Ut=function(e){return e===void 0};const Ht={s:et,z:Rt,m:At,a:Nt,p:Wt,u:Ut};var V="en",A={};A[V]=Lt;var bt="$isDayjsObject",at=function(e){return e instanceof q||!!(e&&e[bt])},Z=function t(e,i,a){var r;if(!e)return V;if(typeof e=="string"){var n=e.toLowerCase();A[n]&&(r=n),i&&(A[n]=i,r=n);var s=e.split("-");if(!r&&s.length>1)return t(s[0])}else{var h=e.name;A[h]=e,r=h}return!a&&r&&(V=r),r||!a&&V},v=function(e,i){if(at(e))return e.clone();var a=typeof i=="object"?i:{};return a.date=e,a.args=arguments,new q(a)},Pt=function(e,i){return v(e,{locale:i.$L,utc:i.$u,x:i.$x,$offset:i.$offset})},p=Ht;p.l=Z;p.i=at;p.w=Pt;var Bt=function(e){var i=e.date,a=e.utc;if(i===null)return new Date(NaN);if(p.u(i))return new Date;if(i instanceof Date)return new Date(i);if(typeof i=="string"&&!/Z$/i.test(i)){var r=i.match(Ct);if(r){var n=r[2]-1||0,s=(r[7]||"0").substring(0,3);return a?new Date(Date.UTC(r[1],n,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],n,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(i)},q=(function(){function t(i){this.$L=Z(i.locale,null,!0),this.parse(i),this.$x=this.$x||i.x||{},this[bt]=!0}var e=t.prototype;return e.parse=function(a){this.$d=Bt(a),this.init()},e.init=function(){var a=this.$d;this.$y=a.getFullYear(),this.$M=a.getMonth(),this.$D=a.getDate(),this.$W=a.getDay(),this.$H=a.getHours(),this.$m=a.getMinutes(),this.$s=a.getSeconds(),this.$ms=a.getMilliseconds()},e.$utils=function(){return p},e.isValid=function(){return this.$d.toString()!==ot},e.isSame=function(a,r){var n=v(a);return this.startOf(r)<=n&&n<=this.endOf(r)},e.isAfter=function(a,r){return v(a)<this.startOf(r)},e.isBefore=function(a,r){return this.endOf(r)<v(a)},e.$g=function(a,r,n){return p.u(a)?this[r]:this.set(n,a)},e.unix=function(){return Math.floor(this.valueOf()/1e3)},e.valueOf=function(){return this.$d.getTime()},e.startOf=function(a,r){var n=this,s=p.u(r)?!0:r,h=p.p(a),o=function(x,M){var S=p.w(n.$u?Date.UTC(n.$y,M,x):new Date(n.$y,M,x),n);return s?S:S.endOf(C)},l=function(x,M){var S=[0,0,0,0],O=[23,59,59,999];return p.w(n.toDate()[x].apply(n.toDate("s"),(s?S:O).slice(M)),n)},d=this.$W,m=this.$M,c=this.$D,f="set"+(this.$u?"UTC":"");switch(h){case Y:return s?o(1,0):o(31,11);case E:return s?o(1,m):o(0,m+1);case j:{var $=this.$locale().weekStart||0,y=(d<$?d+7:d)-$;return o(s?c-y:c+(6-y),m)}case C:case H:return l(f+"Hours",0);case U:return l(f+"Minutes",1);case W:return l(f+"Seconds",2);case N:return l(f+"Milliseconds",3);default:return this.clone()}},e.endOf=function(a){return this.startOf(a,!1)},e.$set=function(a,r){var n,s=p.p(a),h="set"+(this.$u?"UTC":""),o=(n={},n[C]=h+"Date",n[H]=h+"Date",n[E]=h+"Month",n[Y]=h+"FullYear",n[U]=h+"Hours",n[W]=h+"Minutes",n[N]=h+"Seconds",n[it]=h+"Milliseconds",n)[s],l=s===C?this.$D+(r-this.$W):r;if(s===E||s===Y){var d=this.clone().set(H,1);d.$d[o](l),d.init(),this.$d=d.set(H,Math.min(this.$D,d.daysInMonth())).$d}else o&&this.$d[o](l);return this.init(),this},e.set=function(a,r){return this.clone().$set(a,r)},e.get=function(a){return this[p.p(a)]()},e.add=function(a,r){var n=this,s;a=Number(a);var h=p.p(r),o=function(c){var f=v(n);return p.w(f.date(f.date()+Math.round(c*a)),n)};if(h===E)return this.set(E,this.$M+a);if(h===Y)return this.set(Y,this.$y+a);if(h===C)return o(1);if(h===j)return o(7);var l=(s={},s[W]=Q,s[U]=st,s[N]=P,s)[h]||1,d=this.$d.getTime()+a*l;return p.w(d,this)},e.subtract=function(a,r){return this.add(a*-1,r)},e.format=function(a){var r=this,n=this.$locale();if(!this.isValid())return n.invalidDate||ot;var s=a||It,h=p.z(this),o=this.$H,l=this.$m,d=this.$M,m=n.weekdays,c=n.months,f=n.meridiem,$=function(S,O,I,B){return S&&(S[O]||S(r,s))||I[O].slice(0,B)},y=function(S){return p.s(o%12||12,S,"0")},b=f||function(M,S,O){var I=M<12?"AM":"PM";return O?I.toLowerCase():I},x=function(S){switch(S){case"YY":return String(r.$y).slice(-2);case"YYYY":return p.s(r.$y,4,"0");case"M":return d+1;case"MM":return p.s(d+1,2,"0");case"MMM":return $(n.monthsShort,d,c,3);case"MMMM":return $(c,d);case"D":return r.$D;case"DD":return p.s(r.$D,2,"0");case"d":return String(r.$W);case"dd":return $(n.weekdaysMin,r.$W,m,2);case"ddd":return $(n.weekdaysShort,r.$W,m,3);case"dddd":return m[r.$W];case"H":return String(o);case"HH":return p.s(o,2,"0");case"h":return y(1);case"hh":return y(2);case"a":return b(o,l,!0);case"A":return b(o,l,!1);case"m":return String(l);case"mm":return p.s(l,2,"0");case"s":return String(r.$s);case"ss":return p.s(r.$s,2,"0");case"SSS":return p.s(r.$ms,3,"0");case"Z":return h}return null};return s.replace(Yt,function(M,S){return S||x(M)||h.replace(":","")})},e.utcOffset=function(){return-Math.round(this.$d.getTimezoneOffset()/15)*15},e.diff=function(a,r,n){var s=this,h=p.p(r),o=v(a),l=(o.utcOffset()-this.utcOffset())*Q,d=this-o,m=function(){return p.m(s,o)},c;switch(h){case Y:c=m()/12;break;case E:c=m();break;case $t:c=m()/3;break;case j:c=(d-l)/Ot;break;case C:c=(d-l)/Et;break;case U:c=d/st;break;case W:c=d/Q;break;case N:c=d/P;break;default:c=d;break}return n?c:p.a(c)},e.daysInMonth=function(){return this.endOf(E).$D},e.$locale=function(){return A[this.$L]},e.locale=function(a,r){if(!a)return this.$L;var n=this.clone(),s=Z(a,r,!0);return s&&(n.$L=s),n},e.clone=function(){return p.w(this.$d,this)},e.toDate=function(){return new Date(this.valueOf())},e.toJSON=function(){return this.isValid()?this.toISOString():null},e.toISOString=function(){return this.$d.toISOString()},e.toString=function(){return this.$d.toUTCString()},t})(),yt=q.prototype;v.prototype=yt;[["$ms",it],["$s",N],["$m",W],["$H",U],["$W",C],["$M",E],["$y",Y],["$D",H]].forEach(function(t){yt[t[1]]=function(e){return this.$g(e,t[0],t[1])}});v.extend=function(t,e){return t.$i||(t(e,q,v),t.$i=!0),v};v.locale=Z;v.isDayjs=at;v.unix=function(t){return v(t*1e3)};v.en=A[V];v.Ls=A;v.p={};var Xt=function(e){return e.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(i,a,r){return a||r.slice(1)})},kt={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Vt=function(e,i){return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(a,r,n){var s=n&&n.toUpperCase();return r||i[n]||kt[n]||Xt(i[s])})},zt=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,ht=/\d/,X=/\d\d/,jt=/\d{3}/,Zt=/\d{4}/,w=/\d\d?/,Gt=/[+-]?\d+/,qt=/[+-]\d\d:?(\d\d)?|Z/,k=/\d*[^-_:/,()\s\d]+/,L={},Mt=function(e){return e=+e,e+(e>68?1900:2e3)};function Jt(t){if(!t||t==="Z")return 0;var e=t.match(/([+-]|\d\d)/g),i=+(e[1]*60)+(+e[2]||0);return i===0?0:e[0]==="+"?-i:i}var _=function(e){return function(i){this[e]=+i}},lt=[qt,function(t){var e=this.zone||(this.zone={});e.offset=Jt(t)}],tt=function(e){var i=L[e];return i&&(i.indexOf?i:i.s.concat(i.f))},dt=function(e,i){var a,r=L,n=r.meridiem;if(!n)a=e===(i?"pm":"PM");else for(var s=1;s<=24;s+=1)if(e.indexOf(n(s,0,i))>-1){a=s>12;break}return a},Kt={A:[k,function(t){this.afternoon=dt(t,!1)}],a:[k,function(t){this.afternoon=dt(t,!0)}],Q:[ht,function(t){this.month=(t-1)*3+1}],S:[ht,function(t){this.milliseconds=+t*100}],SS:[X,function(t){this.milliseconds=+t*10}],SSS:[jt,function(t){this.milliseconds=+t}],s:[w,_("seconds")],ss:[w,_("seconds")],m:[w,_("minutes")],mm:[w,_("minutes")],H:[w,_("hours")],h:[w,_("hours")],HH:[w,_("hours")],hh:[w,_("hours")],D:[w,_("day")],DD:[X,_("day")],Do:[k,function(t){var e=L,i=e.ordinal,a=t.match(/\d+/);if(this.day=a[0],!!i)for(var r=1;r<=31;r+=1)i(r).replace(/\[|\]/g,"")===t&&(this.day=r)}],w:[w,_("week")],ww:[X,_("week")],M:[w,_("month")],MM:[X,_("month")],MMM:[k,function(t){var e=tt("months"),i=tt("monthsShort"),a=(i||e.map(function(r){return r.slice(0,3)})).indexOf(t)+1;if(a<1)throw new Error;this.month=a%12||a}],MMMM:[k,function(t){var e=tt("months"),i=e.indexOf(t)+1;if(i<1)throw new Error;this.month=i%12||i}],Y:[Gt,_("year")],YY:[X,function(t){this.year=Mt(t)}],YYYY:[Zt,_("year")],Z:lt,ZZ:lt};function Qt(t){var e=t.afternoon;if(e!==void 0){var i=t.hours;e?i<12&&(t.hours+=12):i===12&&(t.hours=0),delete t.afternoon}}function te(t){t=Vt(t,L&&L.formats);for(var e=t.match(zt),i=e.length,a=0;a<i;a+=1){var r=e[a],n=Kt[r],s=n&&n[0],h=n&&n[1];h?e[a]={regex:s,parser:h}:e[a]=r.replace(/^\[|\]$/g,"")}return function(o){for(var l={},d=0,m=0;d<i;d+=1){var c=e[d];if(typeof c=="string")m+=c.length;else{var f=c.regex,$=c.parser,y=o.slice(m),b=f.exec(y),x=b[0];$.call(l,x),o=o.replace(x,"")}}return Qt(l),l}}var ee=function(e,i,a,r){try{if(["x","X"].indexOf(i)>-1)return new Date((i==="X"?1e3:1)*e);var n=te(i),s=n(e),h=s.year,o=s.month,l=s.day,d=s.hours,m=s.minutes,c=s.seconds,f=s.milliseconds,$=s.zone,y=s.week,b=new Date,x=l||(!h&&!o?b.getDate():1),M=h||b.getFullYear(),S=0;h&&!o||(S=o>0?o-1:b.getMonth());var O=d||0,I=m||0,B=c||0,J=f||0;if($)return new Date(Date.UTC(M,S,x,O,I,B,J+$.offset*60*1e3));if(a)return new Date(Date.UTC(M,S,x,O,I,B,J));var z;return z=new Date(M,S,x,O,I,B,J),y&&(z=r(z).week(y).toDate()),z}catch{return new Date("")}};const ie=(function(t,e,i){i.p.customParseFormat=!0,t&&t.parseTwoDigitYear&&(Mt=t.parseTwoDigitYear);var a=e.prototype,r=a.parse;a.parse=function(n){var s=n.date,h=n.utc,o=n.args;this.$u=h;var l=o[1];if(typeof l=="string"){var d=o[2]===!0,m=o[3]===!0,c=d||m,f=o[2];m&&(f=o[2]),L=this.$locale(),!d&&f&&(L=i.Ls[f]),this.$d=ee(s,l,h,i),this.init(),f&&f!==!0&&(this.$L=this.locale(f).$L),c&&s!=this.format(l)&&(this.$d=new Date("")),L={}}else if(l instanceof Array)for(var $=l.length,y=1;y<=$;y+=1){o[1]=l[y-1];var b=i.apply(this,o);if(b.isValid()){this.$d=b.$d,this.$L=b.$L,this.init();break}y===$&&(this.$d=new Date(""))}else r.call(this,n)}});function ae(t,e){const i=e.prototype,a=i.parse;i.parse=function(r){const n=r.date,s=r.args[1];a.call(this,r);const h=this.year(),o=h>=1900&&h<2e3,l=typeof s=="string"&&s.includes("YYYY"),d=Array.isArray(s)&&typeof s[0]=="string"&&s[0].includes("YYYY"),m=l||d,c=typeof n=="string"&&!n.includes(`${h}`);o&&m&&c&&(this.$d.setFullYear(h-1900),this.init())}}var re=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,g=(t,e,i,a)=>{for(var r=a>1?void 0:a?ne(e,i):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(a?s(e,i,r):s(r))||r);return a&&r&&re(e,i,r),r};v.extend(ie);v.extend(ae);const se=180,oe=40,he=10,le=125,de=30,ct="YYYY",ce="no data",ue=0,me="item",ut=4,pe={linear:t=>t,logarithmic:t=>Math.log1p(t)},ge=T`var(--histogramDateRangeSliderColor, #4B65FE)`,fe=T`var(--histogramDateRangeSelectedRangeColor, #DBE0FF)`,ve=T`var(--histogramDateRangeBarIncludedFill, #2C2C2C)`,Se=T`var(--histogramDateRangeActivityIndicator, #2C2C2C)`,De=T`var(--histogramDateRangeBarExcludedFill, #CCCCCC)`,$e=T`var(--histogramDateRangeInputRowMargin, 0)`,be=T`var(--histogramDateRangeInputBorder, 0.5px solid #2C2C2C)`,ye=T`var(--histogramDateRangeInputWidth, 35px)`,Me=T`var(--histogramDateRangeInputFontSize, 1.2rem)`,xe=T`var(--histogramDateRangeInputFontFamily, sans-serif)`,mt=T`var(--histogramDateRangeTooltipBackgroundColor, #2C2C2C)`,pt=T`var(--histogramDateRangeTooltipTextColor, #FFFFFF)`,_e=T`var(--histogramDateRangeTooltipFontSize, 1.1rem)`,Te=T`var(--histogramDateRangeTooltipFontFamily, sans-serif)`;let u=class extends gt{constructor(){super(...arguments),this.width=se,this.height=oe,this.sliderWidth=he,this.tooltipWidth=le,this.tooltipHeight=de,this.updateDelay=ue,this.dateFormat=ct,this.missingDataMessage=ce,this.minDate="",this.maxDate="",this.disabled=!1,this.bins=[],this.updateWhileFocused=!1,this.binSnapping="none",this.tooltipLabel=me,this.barScaling="logarithmic",this._tooltipOffsetX=0,this._tooltipOffsetY=0,this._isDragging=!1,this._isLoading=!1,this._minSelectedDate="",this._maxSelectedDate="",this._minDateMS=0,this._maxDateMS=0,this._dragOffset=0,this._histWidth=0,this._binWidth=0,this._histData=[],this._previousDateRange="",this._updateDeferredWhileFocused=!1,this.drag=t=>{t.preventDefault(),!this.disabled&&(this.setDragOffset(t),this._isDragging=!0,this.addListeners(),this.cancelPendingUpdateEvent())},this.drop=()=>{this._isDragging&&(this.removeListeners(),this.beginEmitUpdateProcess()),this._isDragging=!1},this.move=t=>{const e=this.getBoundingClientRect().x,i=t.clientX-e-this._dragOffset;this._currentSlider.id==="slider-min"?this.minSelectedDate=this.translatePositionToDate(this.validMinSliderX(i)):(this.maxSelectedDate=this.translatePositionToDate(this.validMaxSliderX(i)),this.getMSFromString(this.maxSelectedDate)>this._maxDateMS&&(this.maxSelectedDate=this.maxDate))}}updated(){this._tooltip&&!this._tooltipContent&&(this._tooltip.hidden=!0)}disconnectedCallback(){this.removeListeners(),super.disconnectedCallback()}willUpdate(t){(t.has("bins")||t.has("minDate")||t.has("maxDate")||t.has("minSelectedDate")||t.has("maxSelectedDate")||t.has("width")||t.has("height")||t.has("binSnapping")||t.has("barScaling"))&&this.handleDataUpdate()}handleDataUpdate(){this.hasBinData&&(this._histWidth=this.width-this.sliderWidth*2,this._minDateMS=this.snapTimestamp(this.getMSFromString(this.minDate)),this._maxDateMS=this.snapTimestamp(this.getMSFromString(this.maxDate)+this.snapInterval)+this.snapEndOffset,this._binWidth=this._histWidth/this._numBins,this._histData=this.calculateHistData(),this.minSelectedDate=this.minSelectedDate?this.minSelectedDate:this.minDate,this.maxSelectedDate=this.maxSelectedDate?this.maxSelectedDate:this.maxDate)}snapToNextSecond(t){return Math.ceil(t/1e3)*1e3}snapToMonth(t){const e=v(t),i=e.date()<16?0:1;return e.add(i,"month").date(1).hour(0).minute(0).second(0).millisecond(0).valueOf()}snapToYear(t){const e=v(t),i=e.month()<6?0:1;return e.add(i,"year").month(0).date(1).hour(0).minute(0).second(0).millisecond(0).valueOf()}snapTimestamp(t){switch(this.binSnapping){case"year":return this.snapToYear(t);case"month":return this.snapToMonth(t);default:return this.snapToNextSecond(t)}}get barScalingFunction(){return typeof this.barScaling=="string"?pe[this.barScaling]:this.barScaling}calculateHistData(){const{bins:t,height:e,dateRangeMS:i,_numBins:a,_minDateMS:r}=this,n=Math.min(...this.bins),s=Math.max(...this.bins),h=n===s?1:this.barScalingFunction(s),o=e/h,l=i/a;return t.map((d,m)=>{const c=this.snapTimestamp(m*l+r),f=this.formatDate(c),$=this.snapTimestamp((m+1)*l+r)+this.snapEndOffset,y=this.formatDate($),b=this.formatDate(c,this.tooltipDateFormat),x=this.formatDate($,this.tooltipDateFormat),M=b===x?b:`${b} - ${x}`;return{value:d,height:Math.floor(this.barScalingFunction(d)*o),binStart:f,binEnd:y,tooltip:M}})}get hasBinData(){return this._numBins>0}get _numBins(){return!this.bins||!this.bins.length?0:this.bins.length}get histogramLeftEdgeX(){return this.sliderWidth}get histogramRightEdgeX(){return this.width-this.sliderWidth}get snapInterval(){switch(this.binSnapping){case"year":return 31536e6;case"month":return 2592e6;default:return 0}}get snapEndOffset(){return this.binSnapping!=="none"&&this._numBins>1?-1:0}get tooltipDateFormat(){return this._tooltipDateFormat??this.dateFormat}set tooltipDateFormat(t){this._tooltipDateFormat=t}get loading(){return this._isLoading}set loading(t){this.disabled=t,this._isLoading=t}get minSelectedDate(){return this.formatDate(this.getMSFromString(this._minSelectedDate))}set minSelectedDate(t){if(!this._minSelectedDate){this._minSelectedDate=t;return}const e=this.getMSFromString(t),i=!Number.isNaN(e),a=e<=this.getMSFromString(this.maxSelectedDate);i&&a&&(this._minSelectedDate=this.formatDate(e)),this.requestUpdate()}get maxSelectedDate(){return this.formatDate(this.getMSFromString(this._maxSelectedDate))}set maxSelectedDate(t){if(!this._maxSelectedDate){this._maxSelectedDate=t;return}const e=this.getMSFromString(t),i=!Number.isNaN(e),a=e>=this.getMSFromString(this.minSelectedDate);i&&a&&(this._maxSelectedDate=this.formatDate(e)),this.requestUpdate()}get minSliderX(){const t=this.translateDateToPosition(this.minSelectedDate);return this.validMinSliderX(t)}get maxSliderX(){const t=this.snapTimestamp(this.getMSFromString(this.maxSelectedDate)+this.snapInterval),e=this.translateDateToPosition(this.formatDate(t));return this.validMaxSliderX(e)}get dateRangeMS(){return this._maxDateMS-this._minDateMS}showTooltip(t){if(this._isDragging||this.disabled)return;const e=t.currentTarget,i=e.x.baseVal.value+this.sliderWidth/2,a=e.dataset,r=`${this.tooltipLabel}${a.numItems!=="1"?"s":""}`,n=Number(a.numItems).toLocaleString(),s=2,o=9+this.tooltipHeight,l=this.getBoundingClientRect(),d=l.x+i,m=l.y;this._tooltipOffsetX=d-s+(this._binWidth-this.sliderWidth-this.tooltipWidth)/2+window.scrollX,this._tooltipOffsetY=m-o+window.scrollY,this._tooltipContent=F`
      ${n} ${r}<br />
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
          `;return this.generateSliderSVG(this.maxSliderX,"slider-max",e)}generateSliderSVG(t,e,i){const a=e==="slider-min"?1:-1,r=_t({slider:!0,draggable:!this.disabled,dragging:this._isDragging});return K`
    <svg
      id=${e}
      class=${r}
      @pointerdown=${this.drag}
    >
      <path d="${i} z" fill="${ge}" />
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
        fill="${fe}"
      />`}get histogramTemplate(){const t=this._histWidth/this._numBins,e=t-1;let i=this.sliderWidth;return this._histData.map(a=>{const{minSelectedDate:r,maxSelectedDate:n}=this,s=a.height,h=this.isBefore(a.binEnd,r),o=this.isAfter(a.binStart,n),l=h||o?De:ve,d=`stroke-dasharray: 0 ${e} ${s} ${e} 0 ${s}`,m=K`
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
          y=${this.height-s}
          width=${e}
          height=${s}
          fill=${l}
        />`;return i+=t,m})}isBefore(t,e){const i=this.getMSFromString(t),a=this.getMSFromString(e);return i<a}isAfter(t,e){const i=this.getMSFromString(t),a=this.getMSFromString(e);return i>a}formatDate(t,e=this.dateFormat){if(Number.isNaN(t))return"";const i=v(t);return i.year()<1e3?i.year(199999).format(e).replace(/199999/g,i.year().toString()):i.format(e)}get minInputTemplate(){return F`
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
    `}get maxInputTemplate(){return F`
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
    `}get minLabelTemplate(){return F`<label for="date-min" class="sr-only">Minimum date:</label>`}get maxLabelTemplate(){return F`<label for="date-max" class="sr-only">Maximum date:</label>`}get tooltipTemplate(){const t=wt({width:`${this.tooltipWidth}px`,height:`${this.tooltipHeight}px`,top:`${this._tooltipOffsetY}px`,left:`${this._tooltipOffsetX}px`});return F`
      <div id="tooltip" style=${t} popover>${this._tooltipContent}</div>
    `}get histogramAccessibilityTemplate(){let t="";this.minSelectedDate&&this.maxSelectedDate?t=` from ${this.minSelectedDate} to ${this.maxSelectedDate}`:this.minSelectedDate?t=` from ${this.minSelectedDate}`:this.maxSelectedDate&&(t=` up to ${this.maxSelectedDate}`);const e=`Filter results for dates${t}`,i=`This histogram shows the distribution of dates${t}`;return F`<title id="histogram-title">${e}</title
      ><desc id="histogram-desc">${i}</desc>`}get noDataTemplate(){return F`
      <div class="missing-data-message">${this.missingDataMessage}</div>
    `}get activityIndicatorTemplate(){return this.loading?F`
      <ia-status-indicator mode="loading" ?hideDots=${!0}>
      </ia-status-indicator>
    `:Tt}render(){return this.hasBinData?F`
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
      --loading-ring-color--: ${Se};
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
      font-size: ${_e};
      font-family: ${Te};
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
      margin: ${$e};
    }
    #inputs .dash {
      position: relative;
      bottom: -1px;
      align-self: center; /* Otherwise the dash sticks to the top while the inputs grow */
    }
    input {
      width: ${ye};
      margin: 0 3px;
      border: ${be};
      border-radius: 2px !important;
      text-align: center;
      font-size: ${Me};
      font-family: ${xe};
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
  `;g([D({type:Number})],u.prototype,"width",2);g([D({type:Number})],u.prototype,"height",2);g([D({type:Number})],u.prototype,"sliderWidth",2);g([D({type:Number})],u.prototype,"tooltipWidth",2);g([D({type:Number})],u.prototype,"tooltipHeight",2);g([D({type:Number})],u.prototype,"updateDelay",2);g([D({type:String})],u.prototype,"dateFormat",2);g([D({type:String})],u.prototype,"missingDataMessage",2);g([D({type:String})],u.prototype,"minDate",2);g([D({type:String})],u.prototype,"maxDate",2);g([D({type:Boolean})],u.prototype,"disabled",2);g([D({type:Array})],u.prototype,"bins",2);g([D({type:Boolean})],u.prototype,"updateWhileFocused",2);g([D({type:String})],u.prototype,"binSnapping",2);g([D({type:String})],u.prototype,"tooltipLabel",2);g([D({type:String})],u.prototype,"barScaling",2);g([R()],u.prototype,"_tooltipOffsetX",2);g([R()],u.prototype,"_tooltipOffsetY",2);g([R()],u.prototype,"_tooltipContent",2);g([R()],u.prototype,"_tooltipDateFormat",2);g([R()],u.prototype,"_isDragging",2);g([R()],u.prototype,"_isLoading",2);g([xt("#tooltip")],u.prototype,"_tooltip",2);g([D({type:String})],u.prototype,"tooltipDateFormat",1);g([D({type:Boolean})],u.prototype,"loading",1);g([D()],u.prototype,"minSelectedDate",1);g([D()],u.prototype,"maxSelectedDate",1);u=g([ft("ia-histogram-date-range")],u);var we=Object.defineProperty,Fe=Object.getOwnPropertyDescriptor,rt=(t,e,i,a)=>{for(var r=a>1?void 0:a?Fe(e,i):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(a?s(e,i,r):s(r))||r);return a&&r&&we(e,i,r),r};const Ee=[3,8,15,40,90,130,175,140,95,60,30,12,4],Oe=[{label:"Slider color",cssVariable:"--histogramDateRangeSliderColor",defaultValue:"#4b65fe",inputType:"color"},{label:"Selected range color",cssVariable:"--histogramDateRangeSelectedRangeColor",defaultValue:"#dbe0ff",inputType:"color"},{label:"Included bar color",cssVariable:"--histogramDateRangeBarIncludedFill",defaultValue:"#2c2c2c",inputType:"color"},{label:"Excluded bar color",cssVariable:"--histogramDateRangeBarExcludedFill",defaultValue:"#cccccc",inputType:"color"},{label:"Spinner color",cssVariable:"--histogramDateRangeActivityIndicator",defaultValue:"#2c2c2c",inputType:"color"}],Ie=[{label:"Bin snapping",propertyName:"binSnapping",defaultValue:"year",inputType:"radio",radioOptions:["none","month","year"]},{label:"Loading",propertyName:"loading",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Bar scaling",propertyName:"barScaling",defaultValue:"logarithmic",inputType:"radio",radioOptions:["logarithmic","linear"]},{label:"Tooltip label",propertyName:"tooltipLabel",defaultValue:"item",inputType:"text"},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let G=class extends gt{constructor(){super(...arguments),this.minSelectedDate="",this.maxSelectedDate=""}render(){return F`
      <story-template
        elementTag="ia-histogram-date-range"
        elementClassName="IAHistogramDateRange"
        .styleInputData=${{settings:Oe}}
        .propInputData=${{settings:Ie}}
        .defaultUsageProps=${`.bins=\${bins}
  minDate="1975"
  maxDate="2025"`}
      >
        <ia-histogram-date-range
          slot="demo"
          minDate="1975"
          maxDate="2025"
          binSnapping="year"
          .bins=${Ee}
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
