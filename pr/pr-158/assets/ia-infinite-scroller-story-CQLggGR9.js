import{r as H,n as u,e as R,c as I,i as x,A as M,b,a as m}from"./index-B_Coxf3J.js";import{r as $}from"./story-template-CdQyXcx3.js";import{i as A}from"./keyed-p9iXKAkO.js";import{o as L}from"./map-Bv-shLAs.js";import"./directive-helpers-COcCE9Xq.js";function C(e){return e===document.scrollingElement||e===document.documentElement}function V(e){let t=e;for(;t&&(t=t.parentElement,!!t);){const{overflowY:i}=getComputedStyle(t);if(i==="auto"||i==="scroll")return t}return document.scrollingElement??document.documentElement}class D{constructor(t){this._cellHeights=new Map,this._rowHeights=new Map,this._columnsPerRow=1,this._defaultRowHeight=t}get cellHeights(){return this._cellHeights}get rowHeights(){return this._rowHeights}get columnsPerRow(){return this._columnsPerRow}set columnsPerRow(t){this._columnsPerRow=t}get defaultRowHeight(){return this._defaultRowHeight}set defaultRowHeight(t){this._defaultRowHeight=t}get placeholderRowHeight(){return this._placeholderRowHeight}set placeholderRowHeight(t){this._placeholderRowHeight=t}rowHeightFor(t){return this._rowHeights.get(t)??this._placeholderRowHeight??this._defaultRowHeight}sumRowHeights(t,i,s=0){if(i<t)return 0;let l=0;for(let r=t;r<=i;r+=1)l+=this.rowHeightFor(r);return l+=Math.max(0,i-t)*s,l}recordCellHeight(t,i){this._cellHeights.set(t,i),this.recalculateRowHeight(Math.floor(t/this._columnsPerRow))}deleteCellHeight(t){return this._cellHeights.delete(t)}recalculateRowHeight(t){const i=this._columnsPerRow,s=t*i;let l=0;for(let r=0;r<i;r+=1){const o=this._cellHeights.get(s+r);o!==void 0&&o>l&&(l=o)}l>0?this._rowHeights.set(t,l):this._rowHeights.delete(t)}recalculateAllRowHeights(){this._rowHeights.clear();const t=new Set;for(const i of this._cellHeights.keys())t.add(Math.floor(i/this._columnsPerRow));t.forEach(i=>this.recalculateRowHeight(i))}recalculateDefaultRowHeight(){if(this._rowHeights.size===0)return;let t=0;for(const i of this._rowHeights.values())t+=i;this._defaultRowHeight=t/this._rowHeights.size}pruneAtOrAbove(t){for(const i of this._cellHeights.keys())i>=t&&this._cellHeights.delete(i)}clear(){this._cellHeights.clear(),this._rowHeights.clear(),this._placeholderRowHeight=void 0}}class F{constructor(t){this.suppressNextScrollEvent=!1,this.currentValidityKey=0,this.host=t}invalidate(){this.currentValidityKey+=1}capture(){if(!this.host.isActive())return null;const t=this.host.getScrollContainer(),i=C(t),s=i?0:t.getBoundingClientRect().top,l=i?window.innerHeight:s+t.clientHeight,r=this.host.getScrollerTop(),o=this.currentValidityKey;let a=null,n=null,d=null,f=!1;for(const w of this.host.getCellContainers()){const S=w.dataset.cellIndex;if(S===void 0)continue;const v=w.getBoundingClientRect(),y={cellIndex:parseInt(S,10),cellOffsetWithinScroller:v.top-r,validityKey:o};if(!(v.bottom<s))if(v.top>=l){if(this.host.isCellRendered(w)){d=y;break}}else if(this.host.isCellRendered(w)){if(f)return y;a||(a=y)}else f=!0,n||(n=y)}return a??d??n}restore(t){if(!t||t.validityKey!==this.currentValidityKey)return;const i=this.host.getCellByIndex(t.cellIndex);if(!i)return;const s=this.host.getScrollerTop(),o=i.getBoundingClientRect().top-s-t.cellOffsetWithinScroller;if(Math.abs(o)<.5)return;this.suppressNextScrollEvent=!0;const a=this.host.getScrollContainer();C(a)?window.scrollBy(0,o):a.scrollTop+=o}shouldSuppressNextScrollEvent(){return this.suppressNextScrollEvent?(this.suppressNextScrollEvent=!1,!0):!1}}function N(e,t,i){return Array.from({length:(t-e)/i+1},(s,l)=>e+l*i)}var k=Object.defineProperty,G=Object.getOwnPropertyDescriptor,c=(e,t,i,s)=>{for(var l=s>1?void 0:s?G(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(l=(s?o(t,i,l):o(l))||l);return s&&l&&k(t,i,l),l};const T=300;let h=class extends x{constructor(){super(),this.itemCount=0,this.scrollOptimizationsDisabled=!1,this.minBufferMarginCells=10,this.maxBufferedCells=500,this.bufferMarginViewportScale=1,this.totalContentHeight=0,this.bufferOffsetY=0,this.bufferStart=0,this.bufferEnd=0,this.rowGap=0,this.rowHeightCache=new D(T),this.cellContainerByIndex=new Map,this.visibleCellIndices=new Set,this.scrollRafId=0,this.pendingScrollLayoutUpdate=null,this.scrollIdleTimer=0,this.scrollToCellInProgress=!1,this.scrollListenersActive=!1,this.scrollAnchor=new F({getScrollContainer:()=>this.getScrollContainer(),getCellContainers:()=>this.cellContainers,getCellByIndex:e=>this.cellContainerForIndex(e),isCellRendered:e=>e.hasAttribute("data-rendered"),isActive:()=>!this.scrollToCellInProgress,getScrollerTop:()=>this.getScrollerTop()}),this.sentinelIsIntersecting=!1,this.sentinelEventPending=!1,this.sentinelIntersectionObserver=new IntersectionObserver(this.handleSentinelIntersection.bind(this)),this.cellIntersectionObserver=new IntersectionObserver(this.handleCellIntersection.bind(this)),this.resizeRafId=0,this.resizeObserver=new ResizeObserver(this.handleResize.bind(this)),this.handleScroll=()=>{this.scrollOptimizationsDisabled||this.scrollToCellInProgress||this.scrollAnchor.shouldSuppressNextScrollEvent()||(this.scrollRafId||(this.scrollRafId=requestAnimationFrame(()=>{this.scrollRafId=0,this.syncBufferToScrollPosition()})),this.scrollIdleTimer&&clearTimeout(this.scrollIdleTimer),this.scrollIdleTimer=window.setTimeout(()=>{this.scrollIdleTimer=0,this.syncBufferToScrollPosition()},150))},this.handleCellClick=e=>{const i=e.currentTarget?.dataset.cellIndex;i!=null&&this.cellSelected(e,parseInt(i,10))},this.handleCellKeyup=e=>{e.key==="Enter"&&this.handleCellClick(e)},this.beginStabilization()}get cachedColumnsPerRow(){return this.rowHeightCache.columnsPerRow}set cachedColumnsPerRow(e){this.rowHeightCache.columnsPerRow=e}get defaultRowHeight(){return this.rowHeightCache.defaultRowHeight}set defaultRowHeight(e){this.rowHeightCache.defaultRowHeight=e}get rowHeights(){return this.rowHeightCache.rowHeights}get placeholderRowHeight(){return this.rowHeightCache.placeholderRowHeight}set placeholderRowHeight(e){this.rowHeightCache.placeholderRowHeight=e}connectedCallback(){super.connectedCallback?.(),this.scrollContainer=void 0,this.observeSentinel(),this.setupObservations(),this.container&&this.resizeObserver.observe(this.container)}disconnectedCallback(){this.sentinelIntersectionObserver.disconnect(),this.cellIntersectionObserver.disconnect(),this.teardownScrollListener(),this.resizeObserver?.disconnect(),this.scrollContainer=void 0,this.endStabilization(),super.disconnectedCallback?.()}firstUpdated(){this.observeSentinel(),this.setupVirtualization()}willUpdate(e){e.has("itemCount")&&(this.pruneStaleIndices(),this.scrollOptimizationsDisabled&&(this.bufferEnd=Math.max(0,this.itemCount-1)),this.updateScrollLayout(),this.syncBufferToScrollPosition())}updated(e){if((e.has("itemCount")||e.has("scrollOptimizationsDisabled"))&&(e.has("itemCount")&&this.scheduleSentinelRecheck(),this.setupObservations()),(e.has("bufferStart")||e.has("bufferEnd")||e.has("itemCount")||e.has("scrollOptimizationsDisabled"))&&this.refreshCellContainerCache(),(e.has("bufferStart")||e.has("bufferEnd"))&&(this.emitVisibleCellsChanged(),this.setupObservations(),!this.scrollRafId&&!this.scrollToCellInProgress&&(this.scrollRafId=requestAnimationFrame(()=>{this.scrollRafId=0,this.syncBufferToScrollPosition()}))),e.has("estimatedCellHeight")){const t=e.get("estimatedCellHeight"),i=this.estimatedCellHeight;t!=null&&i!=null&&t!==i&&requestAnimationFrame(()=>{this.resetCellLayoutCache(),this.defaultRowHeight=this.computeDefaultRowHeight(),this.updateScrollLayout(),this.syncBufferToScrollPosition()})}}get bufferStabilized(){return this.bufferStabilizedPromise}get bufferRange(){if(this.itemCount===0)return[];const e=Math.max(0,this.bufferStart),t=Math.min(this.bufferEnd,this.itemCount-1);return t<e?[]:N(e,t,1)}observeSentinel(){this.sentinel&&this.sentinelIntersectionObserver.observe(this.sentinel)}reobserveSentinel(){this.sentinel&&(this.sentinelIntersectionObserver.unobserve(this.sentinel),this.sentinelIntersectionObserver.observe(this.sentinel))}scheduleSentinelRecheck(){this.updateComplete.then(()=>{requestAnimationFrame(()=>{this.sentinelEventPending=!1,this.sentinelIsIntersecting=!1,this.reobserveSentinel()})})}setupObservations(){this.cellIntersectionObserver.disconnect(),this.visibleCellIndices.clear(),this.cellContainers.forEach(e=>this.cellIntersectionObserver.observe(e)),this.scrollListenersActive||this.setupScrollListener()}handleSentinelIntersection(e){e.forEach(t=>{t.isIntersecting&&!this.sentinelIsIntersecting?(this.sentinelIsIntersecting=!0,this.sentinelEventPending||(this.sentinelEventPending=!0,this.dispatchEvent(new Event("scrollThresholdReached")))):t.isIntersecting||(this.sentinelIsIntersecting=!1)})}handleCellIntersection(e){e.forEach(t=>{const s=t.target.dataset.cellIndex;if(!s)return;const l=parseInt(s,10);t.isIntersecting?this.visibleCellIndices.add(l):this.visibleCellIndices.delete(l)}),this.emitVisibleCellsChanged()}handleResize(){this.resizeRafId||(this.resizeRafId=requestAnimationFrame(()=>{this.resizeRafId=0;const e=this.getColumnsPerRow();e!==this.cachedColumnsPerRow&&(this.cachedColumnsPerRow=e,this.resetCellLayoutCache(),this.updateScrollLayout(),this.syncBufferToScrollPosition()),this.rowHeights.size>0?this.rowHeightCache.recalculateDefaultRowHeight():this.defaultRowHeight=this.computeDefaultRowHeight()}))}resetCellLayoutCache(){this.rowHeightCache.clear();for(const e of this.cellContainers)e.style.minHeight=""}reload(){this.visibleCellIndices.clear(),this.rowHeightCache.clear(),this.sentinelEventPending=!1,this.sentinelIsIntersecting=!1,this.scrollToCellInProgress=!1,this.totalContentHeight=0,this.bufferOffsetY=0,this.bufferStart=0,this.bufferEnd=this.computeInitialBufferEnd(),this.updateScrollLayout(),this.setupObservations(),this.reobserveSentinel(),this.stabilizeBuffer()}refreshCell(e){if(e<this.bufferStart||e>this.bufferEnd){this.rowHeightCache.deleteCellHeight(e)&&(this.rowHeightCache.recalculateAllRowHeights(),this.scheduleScrollLayoutUpdate());return}this.scheduleScrollLayoutUpdate(),this.requestUpdate()}refreshAllVisibleCells(){this.scheduleScrollLayoutUpdate(),this.requestUpdate()}async scrollToCell(e,t){if(e<0||e>=this.itemCount)return!1;const i=t?"smooth":"auto";this.scrollToCellInProgress=!0,this.scrollRafId&&(cancelAnimationFrame(this.scrollRafId),this.scrollRafId=0),this.scrollIdleTimer&&(clearTimeout(this.scrollIdleTimer),this.scrollIdleTimer=0),this.scrollAnchor.invalidate(),this.snapBufferToCell(e),await this.updateComplete,await new Promise(l=>requestAnimationFrame(l)),this.measureBufferedCells(),this.updateScrollLayout(),this.requestUpdate(),await this.updateComplete;const s=this.cellContainerForIndex(e);return s?(s.scrollIntoView({behavior:i}),t?(await this.nextSmoothScrollEnd(),this.scrollToCellInProgress=!1,!0):(this.scrollToCellInProgress=!1,!0)):(this.scrollToCellInProgress=!1,!1)}getVisibleCellIndices(){return Array.from(this.visibleCellIndices)}pruneStaleIndices(){for(const e of this.visibleCellIndices)e>=this.itemCount&&this.visibleCellIndices.delete(e);this.rowHeightCache.pruneAtOrAbove(this.itemCount),this.rowHeightCache.recalculateAllRowHeights()}snapBufferToCell(e){const t=this.getScrollContainer(),i=C(t)?window.innerHeight:t.clientHeight,s=this.cachedColumnsPerRow,l=Math.ceil(i/this.defaultRowHeight),r=Math.ceil(this.minBufferMarginCells/s),o=Math.ceil(l*this.bufferMarginViewportScale);let a=Math.max(r,o);const n=Math.max(0,Math.floor((this.maxBufferedCells-l*s)/(2*s)));a=Math.min(a,n);const d=Math.floor(e/s),f=this.getTotalRows(),w=Math.max(0,d-a),S=Math.min(f-1,d+a);this.bufferStart=w*s,this.bufferEnd=Math.min(this.itemCount-1,(S+1)*s-1),this.updateScrollLayout()}nextSmoothScrollEnd(){return new Promise(e=>{const t=this.getScrollContainer(),i=C(t)?window:t;let s=0,l=!1;const r=()=>{l||(l=!0,i.removeEventListener("scrollend",r),s&&window.clearTimeout(s),e())};i.addEventListener("scrollend",r,{once:!0}),s=window.setTimeout(r,2e3)})}setupVirtualization(){this.cachedColumnsPerRow=this.getColumnsPerRow(),this.rowGap=this.getRowGap(),this.defaultRowHeight=this.computeDefaultRowHeight(),this.bufferStart=0,this.bufferEnd=this.computeInitialBufferEnd(),this.updateScrollLayout(),this.setupScrollListener(),this.container&&this.resizeObserver.observe(this.container),this.stabilizeBuffer()}async stabilizeBuffer(){this.beginStabilization(),await this.updateComplete,this.refreshCellContainerCache(),this.emitVisibleCellsChanged(),requestAnimationFrame(()=>{this.measureBufferedCells(),this.rowHeightCache.recalculateDefaultRowHeight(),this.syncBufferToScrollPosition(),this.updateComplete.then(()=>{this.endStabilization()})})}beginStabilization(){this.bufferStabilizedResolver||(this.bufferStabilizedPromise=new Promise(e=>{this.bufferStabilizedResolver=e}))}endStabilization(){this.bufferStabilizedResolver&&(this.bufferStabilizedResolver(),this.bufferStabilizedResolver=void 0,this.dispatchEvent(new Event("bufferStabilized")))}setupScrollListener(){this.teardownScrollListener();const e=this.getScrollContainer();(C(e)?window:e).addEventListener("scroll",this.handleScroll,{passive:!0}),this.scrollListenersActive=!0}teardownScrollListener(){this.scrollListenersActive&&(this.scrollContainer&&(C(this.scrollContainer)?window:this.scrollContainer).removeEventListener("scroll",this.handleScroll),this.scrollRafId&&(cancelAnimationFrame(this.scrollRafId),this.scrollRafId=0),this.scrollIdleTimer&&(clearTimeout(this.scrollIdleTimer),this.scrollIdleTimer=0),this.scrollListenersActive=!1)}getColumnsPerRow(){return this.container&&getComputedStyle(this.container).gridTemplateColumns.split(" ").filter(t=>t.length>0).length||1}getRowGap(){return this.container&&parseFloat(getComputedStyle(this.container).rowGap)||0}getTotalRows(){return Math.ceil(this.itemCount/this.cachedColumnsPerRow)}computeInitialBufferEnd(){if(this.scrollOptimizationsDisabled)return Math.max(0,this.itemCount-1);const e=Math.ceil(window.innerHeight/this.defaultRowHeight),t=this.minBufferMarginCells*2,i=e*(1+this.bufferMarginViewportScale*2)*this.cachedColumnsPerRow;return Math.min(Math.max(t,i),this.maxBufferedCells,this.itemCount-1)}computeDefaultRowHeight(){if(this.estimatedCellHeight!=null)return this.estimatedCellHeight;if(!this.container)return T;const e=document.createElement("div");e.style.height="var(--infiniteScrollerCellMinHeight, 22.5rem)",this.container.appendChild(e);const t=e.offsetHeight;return e.remove(),t||T}getScrollContainer(){return this.scrollContainer?this.scrollContainer:(this.scrollContainer=V(this),this.scrollContainer)}getScrollerTop(){const e=this.scrollSpacer??this.container;return e?e.getBoundingClientRect().top:0}updateScrollLayout(){const e=this.getTotalRows();if(e===0){this.totalContentHeight=0,this.bufferOffsetY=0;return}const{rowGap:t}=this;this.totalContentHeight=this.rowHeightCache.sumRowHeights(0,e-1,t);const i=Math.floor(this.bufferStart/this.cachedColumnsPerRow);this.bufferOffsetY=i>0?this.rowHeightCache.sumRowHeights(0,i-1,t)+t:0}scheduleScrollLayoutUpdate(){if(this.pendingScrollLayoutUpdate)return;const e=this.scrollAnchor.capture();this.pendingScrollLayoutUpdate=this.runScrollLayoutUpdate(e)}async runScrollLayoutUpdate(e){try{await new Promise(t=>requestAnimationFrame(t)),this.measureBufferedCells(),this.updateScrollLayout(),await this.updateComplete,this.scrollAnchor.restore(e)}finally{this.pendingScrollLayoutUpdate=null}}measureBufferedCells(){let e=!1;for(const t of this.cellContainers){const i=t.dataset.cellIndex;if(!i)continue;const s=parseInt(i,10);t.hasAttribute("data-rendered")?t.offsetHeight>0&&this.rowHeightCache.recordCellHeight(s,t.offsetHeight):this.rowHeightCache.deleteCellHeight(s)&&(e=!0)}e&&this.rowHeightCache.recalculateAllRowHeights(),this.updatePlaceholderRowHeight()}updatePlaceholderRowHeight(){const{placeholdersByRow:e,renderedRows:t}=this.groupCellsByRow();if(e.size===0)return;let i=0,s=0;for(const[l,r]of e)if(!t.has(l))for(const o of r)o.offsetHeight>0&&(i+=o.offsetHeight,s+=1);s>0&&(this.placeholderRowHeight=i/s)}groupCellsByRow(){const e=this.cachedColumnsPerRow,t=new Map,i=new Set;for(const s of this.cellContainers){const l=s.dataset.cellIndex;if(!l)continue;const r=Math.floor(parseInt(l,10)/e);if(s.hasAttribute("data-rendered"))i.add(r);else{const o=t.get(r);o?o.push(s):t.set(r,[s])}}return{placeholdersByRow:t,renderedRows:i}}syncBufferToScrollPosition(){if(this.scrollOptimizationsDisabled||(this.measureBufferedCells(),!this.container))return;const e=this.getTotalRows();if(e===0)return;const t=this.getContentRelativeViewport(),{firstVisibleRow:i,lastVisibleRow:s}=this.findVisibleRowRange(t.relativeScrollTop,t.relativeScrollBottom,e);if(this.bufferHasSufficientMargin(i,s))return;const{newStart:l,newEnd:r}=this.computeBufferBounds(i,s,e,t.viewportHeight);if(l===this.bufferStart&&r===this.bufferEnd)return;const o=this.scrollAnchor.capture();this.rowHeights.size>0&&this.rowHeightCache.recalculateDefaultRowHeight(),this.bufferStart=l,this.bufferEnd=r,this.updateScrollLayout(),this.updateComplete.then(()=>{this.scrollAnchor.restore(o)})}getContentRelativeViewport(){const e=this.getScrollContainer(),t=C(e)?window.scrollY:e.scrollTop,i=C(e)?window.innerHeight:e.clientHeight,l=(this.scrollSpacer??this.container).getBoundingClientRect(),r=C(e)?l.top+window.scrollY:l.top+e.scrollTop-e.getBoundingClientRect().top,o=t-r;return{relativeScrollTop:o,relativeScrollBottom:o+i,viewportHeight:i}}findVisibleRowRange(e,t,i){const{rowGap:s}=this;let l=0,r=0,o=i-1,a=!1;for(let n=0;n<i;n+=1){const d=this.rowHeightCache.rowHeightFor(n),f=l,w=l+d;if(!a&&w>e&&(r=n,a=!0),a&&f>=t){o=n-1;break}l+=d+s}return{firstVisibleRow:r,lastVisibleRow:o}}bufferHasSufficientMargin(e,t){const i=this.cachedColumnsPerRow,s=Math.ceil(this.minBufferMarginCells/i),l=t-e+1,r=Math.ceil(l*this.bufferMarginViewportScale),o=Math.max(s,r),a=Math.floor(this.bufferStart/i),n=Math.floor(Math.min(this.bufferEnd,this.itemCount-1)/i),d=Math.max(2,Math.floor(o/3));return e>=a+d&&t<=n-d}computeBufferBounds(e,t,i,s){const l=this.cachedColumnsPerRow,{rowGap:r}=this,o=Math.ceil(this.minBufferMarginCells/l),a=s*Math.max(1,this.bufferMarginViewportScale);let n=e,d=0;for(;n>0&&d<a;)n-=1,d+=this.rowHeightCache.rowHeightFor(n)+r;let f=t,w=0;for(;f<i-1&&w<a;)f+=1,w+=this.rowHeightCache.rowHeightFor(f)+r;n=Math.min(n,Math.max(0,e-o)),f=Math.max(f,Math.min(i-1,t+o));const S=Math.ceil(this.maxBufferedCells/l);let v=f-n+1;if(v>S){const y=v-S,z=Math.min(Math.floor(y/2),Math.max(0,e-n-o));n+=z,v=f-n+1;const _=Math.min(v-S,Math.max(0,f-t-o));f-=_}return{newStart:n*l,newEnd:Math.min((f+1)*l-1,this.itemCount-1)}}render(){const{bufferRange:e,bufferOffsetY:t,totalContentHeight:i,itemCount:s}=this,l=this.ariaLandmarkLabel??M;return b`
      <div id="scroll-spacer" style="height:${i}px">
        <div id="sentinel" aria-hidden="true"></div>
        <section
          id="container"
          role="feed"
          aria-label=${l}
          style="transform:translateY(${t}px)"
          @transitionend=${this.handleContainerTransition}
        >
          ${L(e,r=>{const o=this.cellProvider?.cellForIndex(r),a=Math.floor(r/this.cachedColumnsPerRow),n=this.rowHeightCache.rowHeightFor(a);return b`<article
              class="cell-container"
              aria-posinset=${r+1}
              aria-setsize=${s}
              data-cell-index=${r}
              ?data-rendered=${o!=null}
              style="min-height: max(${n}px, var(--infiniteScrollerCellMinHeight, 22.5rem))"
              @click=${this.handleCellClick}
              @keyup=${this.handleCellKeyup}
            >
              ${A(r,o??this.placeholderCellTemplate??M)}
            </article>`})}
          ${this.bufferEnd>=s-1?b`<slot name="result-last-tile"></slot>`:M}
        </section>
      </div>
    `}handleContainerTransition(e){e.propertyName==="row-gap"&&(this.rowGap=this.getRowGap(),this.updateScrollLayout())}emitVisibleCellsChanged(){this.dispatchEvent(new CustomEvent("visibleCellsChanged",{detail:{visibleCellIndices:Array.from(this.visibleCellIndices)}}))}cellSelected(e,t){const i=new CustomEvent("cellSelected",{detail:{index:t,originalEvent:e}});this.dispatchEvent(i)}cellContainerForIndex(e){return this.cellContainerByIndex.get(e)??null}refreshCellContainerCache(){this.cellContainerByIndex.clear();const e=this.cellContainers;for(const t of e){const i=t.dataset.cellIndex;i!==void 0&&this.cellContainerByIndex.set(Number(i),t)}}static get styles(){const e=m`var(--infiniteScrollerSentinelDistanceFromEnd, 200rem)`,t=m`var(--infiniteScrollerRowGap, 1.7rem)`,i=m`var(--infiniteScrollerColGap, 1.7rem)`,s=m`var(--infiniteScrollerCellMinWidth, 16rem)`,l=m`var(--infiniteScrollerCellMaxWidth, 1fr)`,r=m`var(--infiniteScrollerCellMinHeight, 22.5rem)`,o=m`var(--infiniteScrollerCellMaxHeight, none)`,a=m`var(--infiniteScrollerCellOutline, 0)`;return m`
      :host {
        /**
         * We handle scroll anchoring ourselves for fine-tuning, so opt out
         * of the browser's built-in anchoring (which can interfere with ours
         * and cause undesirable content jitter). 
         */
        overflow-anchor: none;
      }

      #scroll-spacer,
      #container,
      .cell-container {
        /**
         * overflow-anchor does not cascade, so descendents need to opt out too
         */
        overflow-anchor: none;
      }

      #container {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        grid-row-gap: ${t};
        row-gap: ${t};
        grid-column-gap: ${i};
        column-gap: ${i};

        /* This transition allows us to listen for changes to the row-gap */
        transition: row-gap 1ms linear;
      }

      @supports (display: grid) {
        #container {
          display: grid;
          flex-wrap: nowrap;
          grid-template-columns: repeat(
            auto-fill,
            minmax(${s}, ${l})
          );
        }
      }

      .cell-container {
        outline: ${a};
        min-height: ${r};
        max-height: ${o};
        min-width: ${s};
        max-width: ${l};
      }

      @supports (display: grid) {
        /* the grid takes care of the width */
        .cell-container {
          min-width: auto;
          max-width: none;
        }
      }

      #scroll-spacer {
        position: relative;
      }

      #sentinel {
        position: absolute;
        height: ${e};
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        /**
        Chrome and Firefox try to maintain scroll position when the page increases and
        decreases in size, but the scroll position is being focused on the sentinel
        so it's causing the "load more" event to keep firing because it thinks the
        user has scrolled to the sentinel. "overflow-anchor: none" prevents that anchoring
        */
        overflow-anchor: none;
      }
    `}};c([u({type:Number})],h.prototype,"itemCount",2);c([u({type:Object})],h.prototype,"cellProvider",2);c([u({type:Object})],h.prototype,"placeholderCellTemplate",2);c([u({type:Boolean})],h.prototype,"scrollOptimizationsDisabled",2);c([u({type:String})],h.prototype,"ariaLandmarkLabel",2);c([u({type:Number})],h.prototype,"minBufferMarginCells",2);c([u({type:Number})],h.prototype,"maxBufferedCells",2);c([u({type:Number})],h.prototype,"bufferMarginViewportScale",2);c([u({type:Number})],h.prototype,"estimatedCellHeight",2);c([H()],h.prototype,"totalContentHeight",2);c([H()],h.prototype,"bufferOffsetY",2);c([H()],h.prototype,"bufferStart",2);c([H()],h.prototype,"bufferEnd",2);c([H()],h.prototype,"rowGap",2);c([R("#sentinel")],h.prototype,"sentinel",2);c([R("#container")],h.prototype,"container",2);c([R("#scroll-spacer")],h.prototype,"scrollSpacer",2);c([$(".cell-container")],h.prototype,"cellContainers",2);h=c([I("ia-infinite-scroller")],h);var U=Object.defineProperty,q=Object.getOwnPropertyDescriptor,B=(e,t,i,s)=>{for(var l=s>1?void 0:s?q(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(l=(s?o(t,i,l):o(l))||l);return s&&l&&U(t,i,l),l};let P=class extends x{constructor(){super(...arguments),this.design="1"}render(){return b`
      <h1>Tile ${this.design}</h1>
      <h2><slot></slot></h2>
    `}static get styles(){return m`
      :host {
        --tile-color: #8a4fc7;
        display: block;
        box-sizing: border-box;
        outline: 1px solid var(--tile-color);
        height: 100%;
        padding: 0.5rem;
        color: var(--tile-color);
      }

      :host([design='2']) {
        --tile-color: #c9722a;
      }

      h1,
      h2 {
        margin: 0;
      }
    `}};B([u({type:String,reflect:!0})],P.prototype,"design",2);P=B([I("ia-infinite-scroller-demo-tile")],P);let E=class extends x{render(){return b`<h1>...</h1>`}static get styles(){return m`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        outline: 1px solid #aaa;
        height: 100%;
        color: #aaa;
      }

      h1 {
        margin: 0;
      }
    `}};E=B([I("ia-infinite-scroller-demo-placeholder")],E);var W=Object.defineProperty,j=Object.getOwnPropertyDescriptor,g=(e,t,i,s)=>{for(var l=s>1?void 0:s?j(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(l=(s?o(t,i,l):o(l))||l);return s&&l&&W(t,i,l),l};const Y=[{label:"Cell min width",cssVariable:"--infiniteScrollerCellMinWidth",defaultValue:"16rem",inputType:"text"},{label:"Cell min height",cssVariable:"--infiniteScrollerCellMinHeight",defaultValue:"8rem",inputType:"text"},{label:"Cell max height",cssVariable:"--infiniteScrollerCellMaxHeight",defaultValue:"none",inputType:"text"},{label:"Row gap",cssVariable:"--infiniteScrollerRowGap",defaultValue:"1.7rem",inputType:"text"},{label:"Column gap",cssVariable:"--infiniteScrollerColGap",defaultValue:"1.7rem",inputType:"text"}],K=[{label:"Item count",propertyName:"itemCount",defaultValue:200,inputType:"number"},{label:"Estimated cell height",propertyName:"estimatedCellHeight",defaultValue:128,inputType:"number"},{label:"Min buffer margin cells",propertyName:"minBufferMarginCells",defaultValue:10,inputType:"number"},{label:"Max buffered cells",propertyName:"maxBufferedCells",defaultValue:500,inputType:"number"},{label:"Buffer margin viewport scale",propertyName:"bufferMarginViewportScale",defaultValue:1,inputType:"number"},{label:"Scroll optimizations disabled",propertyName:"scrollOptimizationsDisabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let p=class extends x{constructor(){super(...arguments),this.itemCount=200,this.estimatedCellHeight=128,this.minBufferMarginCells=10,this.maxBufferedCells=500,this.bufferMarginViewportScale=1,this.scrollOptimizationsDisabled=!1,this.showPlaceholders=!0,this.tileDesign="1",this.loadedCells=new Set,this.pendingCells=new Set}cellForIndex(e){if(this.showPlaceholders&&!this.loadedCells.has(e)){this.scheduleLoad(e);return}return b`<ia-infinite-scroller-demo-tile design=${this.tileDesign}
      >${e}</ia-infinite-scroller-demo-tile
    >`}updated(e){(e.has("tileDesign")||e.has("showPlaceholders"))&&this.scroller?.refreshAllVisibleCells()}render(){return b`
      <div id="controls">
        <label>
          Tile design
          <select @change=${this.handleDesignChange}>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>
        <label>
          Placeholders
          <input
            type="checkbox"
            ?checked=${this.showPlaceholders}
            @change=${this.handlePlaceholdersChange}
          />
        </label>
        <form @submit=${this.handleScrollToSubmit}>
          <label>
            Scroll to cell
            <input id="scroll-to-index" type="number" min="0" value="0" />
          </label>
          <label>
            Animated <input id="scroll-to-animated" type="checkbox" />
          </label>
          <button type="submit">Scroll</button>
        </form>
      </div>
      <div id="scroll-box">
        <ia-infinite-scroller
          .itemCount=${this.itemCount}
          .estimatedCellHeight=${this.estimatedCellHeight}
          .minBufferMarginCells=${this.minBufferMarginCells}
          .maxBufferedCells=${this.maxBufferedCells}
          .bufferMarginViewportScale=${this.bufferMarginViewportScale}
          .scrollOptimizationsDisabled=${this.scrollOptimizationsDisabled}
          .cellProvider=${this}
          .placeholderCellTemplate=${b`<ia-infinite-scroller-demo-placeholder></ia-infinite-scroller-demo-placeholder>`}
          @scrollThresholdReached=${this.handleScrollThresholdReached}
        ></ia-infinite-scroller>
      </div>
    `}scheduleLoad(e){this.pendingCells.has(e)||(this.pendingCells.add(e),setTimeout(()=>{this.pendingCells.delete(e),this.loadedCells.add(e),this.scroller?.refreshCell(e)},500))}handleScrollThresholdReached(){this.itemCount+=50}handleDesignChange(e){this.tileDesign=e.target.value}handlePlaceholdersChange(e){this.showPlaceholders=e.target.checked}handleScrollToSubmit(e){e.preventDefault();const t=parseInt(this.scrollToInput?.value??"",10);t>=0&&this.scroller?.scrollToCell(t,!!this.animatedCheckbox?.checked)}static get styles(){return m`
      :host {
        display: block;
      }

      #controls {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      #controls form {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      #scroll-to-index {
        width: 6rem;
      }

      #scroll-box {
        height: 400px;
        overflow-y: auto;
        border: 1px solid #888;
        padding: 0 10px;
        background: #fff;
      }
    `}};g([u({type:Number})],p.prototype,"itemCount",2);g([u({type:Number})],p.prototype,"estimatedCellHeight",2);g([u({type:Number})],p.prototype,"minBufferMarginCells",2);g([u({type:Number})],p.prototype,"maxBufferedCells",2);g([u({type:Number})],p.prototype,"bufferMarginViewportScale",2);g([u({type:Boolean})],p.prototype,"scrollOptimizationsDisabled",2);g([u({type:Boolean})],p.prototype,"showPlaceholders",2);g([u({type:String})],p.prototype,"tileDesign",2);g([R("ia-infinite-scroller")],p.prototype,"scroller",2);g([R("#scroll-to-index")],p.prototype,"scrollToInput",2);g([R("#scroll-to-animated")],p.prototype,"animatedCheckbox",2);p=g([I("ia-infinite-scroller-demo")],p);let O=class extends x{render(){return b`
      <story-template
        elementTag="ia-infinite-scroller"
        elementClassName="IAInfiniteScroller"
        .defaultUsageProps=${".cellProvider=${cellProvider}"}
        .styleInputData=${{settings:Y}}
        .propInputData=${{settings:K}}
      >
        <ia-infinite-scroller-demo slot="demo"></ia-infinite-scroller-demo>
      </story-template>
    `}};O=g([I("ia-infinite-scroller-story")],O);export{p as IAInfiniteScrollerDemo,O as IAInfiniteScrollerStory};
