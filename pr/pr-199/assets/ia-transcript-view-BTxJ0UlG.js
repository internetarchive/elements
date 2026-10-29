import{m as y,n as c,c as f,i as x,b as d,r as b,e as g,A as S,a as E}from"./index-DV0LItVg.js";import{o as C}from"./story-template-B8EvbBWz.js";import{l as T}from"./localized-decorator-c8wxOm0J.js";import{a as w}from"./theme-styles-JDIGQbkx.js";class z{constructor(e,i,o,r,s,n){this.id=e,this.start=i,this.end=o,this.rawText=r,this.isMusic=s,this.searchMatchIndex=n}get displayText(){return this.isMusic?y("[Transcript unavailable]"):this.rawText}}class H{constructor(e){this.entries=[],this.entries=e}get searchResults(){return this.entries.filter(e=>e.searchMatchIndex!==void 0)}}function I(t){if(typeof t!="number"||!Number.isFinite(t))return"";const e=Math.max(0,Math.floor(t)),i=Math.floor(e/3600),o=Math.floor(e/60)%60,r=e%60,s=String(r).padStart(2,"0");if(i===0)return`${o}:${s}`;const n=String(o).padStart(2,"0");return`${i}:${n}:${s}`}var $=Object.defineProperty,R=Object.getOwnPropertyDescriptor,u=(t,e,i,o)=>{for(var r=o>1?void 0:o?R(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(o?n(e,i,r):n(r))||r);return o&&r&&$(e,i,r),r};let h=class extends x{constructor(){super(...arguments),this.isActive=!1,this.isSelected=!1,this.isClickable=!1,this.isSearchResult=!1,this.isMusicEntry=!1}render(){return d`${this.entry?.displayText??""}`}};u([c({type:Object})],h.prototype,"entry",2);u([c({type:Boolean,reflect:!0})],h.prototype,"isActive",2);u([c({type:Boolean,reflect:!0})],h.prototype,"isSelected",2);u([c({type:Boolean,reflect:!0})],h.prototype,"isClickable",2);u([c({type:Boolean,reflect:!0})],h.prototype,"isSearchResult",2);u([c({type:Boolean,reflect:!0})],h.prototype,"isMusicEntry",2);h=u([f("ia-transcript-entry"),T()],h);var A=Object.defineProperty,M=Object.getOwnPropertyDescriptor,l=(t,e,i,o)=>{for(var r=o>1?void 0:o?M(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(o?n(e,i,r):n(r))||r);return o&&r&&A(e,i,r),r};const m={TranscriptEntrySelected:"transcriptEntrySelected",CurrentEntriesUpdated:"currentEntriesUpdated",AutoScrollChanged:"autoScrollChanged"},B=1;let a=class extends x{constructor(){super(...arguments),this.currentTime=0,this.topContextHeight=50,this.bottomContextHeight=50,this.autoScroll=!0,this.selectedSearchResultIndex=0,this.showContextZones=!1,this.scrollTimerDelay=15e3,this.timeScrollTop=0,this.currentEntries=[]}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.scrollResumeTimerId),this.cancelScrollAnimation()}render(){return d`
      <div class="container">
        ${this.showContextZones?this.contextZoneTemplates:S}

        <div
          class="scroll-container"
          id="scroll-container"
          @wheel=${this.didScroll}
          @touchmove=${this.didScroll}
        >
          <div class="col time">${this.timeDisplayTemplate}</div>

          <div class="col">
            ${this.autoScrollButtonTemplate}
            ${this.transcriptEntries.map(t=>this.transcriptEntryTemplate(t))}
          </div>
        </div>
      </div>
    `}scrollToSelectedSearchResult(){const{selectedSearchResult:t}=this;t&&(this.autoScroll=!1,this.scrollToElement(t))}entryIdentifierClosestToTime(t){const e=this.transcriptEntries;if(e.length===0)return null;let i=e[0],o=Math.abs(t-i.start);for(const r of e){const s=Math.abs(t-r.start);s<o&&(o=s,i=r)}return i.id}get autoScrollButtonTemplate(){return d`
      <button
        type="button"
        class="auto-scroll-button ${this.autoScroll?"hidden":""}"
        @click=${this.enableAutoScroll}
      >
        ${y("Scroll text with audio")}
      </button>
    `}get timeDisplayTemplate(){return d`
      <div class="time-display" style="top: ${this.timeScrollTop}px">
        ${I(this.currentTime)}
      </div>
    `}transcriptEntryTemplate(t){const e=this.currentEntries.some(i=>i.id===t.id);return d`
      <ia-transcript-entry
        .entry=${t}
        ?isActive=${e}
        ?isSelected=${t.searchMatchIndex===this.selectedSearchResultIndex}
        ?isSearchResult=${t.searchMatchIndex!==void 0}
        ?isMusicEntry=${t.isMusic}
        isClickable
        data-search-result-index=${C(t.searchMatchIndex)}
        data-identifier=${t.id}
        @click=${this.transcriptEntrySelected}
      ></ia-transcript-entry>
    `}get contextZoneTemplates(){return d`
      <div
        class="top context-overlay"
        style="height: ${this.topContextHeight}px"
      ></div>
      <div
        class="bottom context-overlay"
        style="height: ${this.bottomContextHeight}px"
      ></div>
    `}get transcriptEntries(){return this.config?.entries??[]}updated(t){t.has("currentTime")&&this.handleCurrentTimeChange(),t.has("selectedSearchResultIndex")&&this.scrollToSelectedSearchResult(),t.has("currentEntries")&&(this.scrollToClosestEntry(),this.updateTimePosition()),t.has("autoScroll")&&this.dispatchEvent(new CustomEvent(m.AutoScrollChanged,{detail:{autoScroll:this.autoScroll}})),t.has("config")&&(this.selectedSearchResultIndex=0,this.scrollToSelectedSearchResult())}transcriptEntrySelected(t){const{entry:e}=t.currentTarget;e&&(this.dispatchEvent(new CustomEvent(m.TranscriptEntrySelected,{detail:{entry:e}})),e.searchMatchIndex!==void 0&&(this.selectedSearchResultIndex=e.searchMatchIndex),this.autoScroll=!1)}handleCurrentTimeChange(){const t=this.transcriptEntries;if(t.length===0)return;const e=t.filter(i=>this.currentTime>=i.start&&this.currentTime<=i.end);a.entryArraysMatch(e,this.currentEntries)||(this.dispatchEvent(new Event(m.CurrentEntriesUpdated)),this.currentEntries=e)}static entryArraysMatch(t,e){if(t.length!==e.length)return!1;const i=t.map(r=>r.id).sort((r,s)=>r-s),o=e.map(r=>r.id).sort((r,s)=>r-s);return i.every((r,s)=>o[s]===r)}elementClosestToTime(t){const e=this.entryIdentifierClosestToTime(t);return e===null?null:this.elementForIdentifier(e)}elementForIdentifier(t){return this.shadowRoot?.querySelector(`ia-transcript-entry[data-identifier="${t}"]`)??null}didScroll(t){t instanceof WheelEvent&&!this.canScrollBy(t.deltaY)||(this.autoScroll=!1,clearTimeout(this.scrollResumeTimerId),this.scrollResumeTimerId=setTimeout(()=>{this.autoScroll=!0},this.scrollTimerDelay))}canScrollBy(t){const{scrollView:e}=this;if(!e)return!1;const{scrollTop:i,scrollHeight:o,clientHeight:r}=e;return t<0?i>0:t>0?Math.ceil(i+r)<o:!1}enableAutoScroll(){this.autoScroll=!0,this.scrollToClosestEntry()}get activeTranscriptEntry(){return this.shadowRoot?.querySelector("ia-transcript-entry[isActive]")??null}get selectedSearchResult(){return this.shadowRoot?.querySelector(`ia-transcript-entry[data-search-result-index="${this.selectedSearchResultIndex}"]`)??null}get closestEntryToCurrentTime(){return this.activeTranscriptEntry??this.elementClosestToTime(this.currentTime)}scrollToClosestEntry(){if(!this.autoScroll)return;const t=this.closestEntryToCurrentTime;t&&this.scrollToElement(t)}scrollToElement(t){const{scrollView:e}=this;if(!e)return;const i=e.getBoundingClientRect(),o=t.getBoundingClientRect(),r=i.height-this.bottomContextHeight,s=o.bottom>i.top+r,n=o.top<i.top;!s&&!n||this.scrollToOffset(o.top-i.top+e.scrollTop-this.topContextHeight)}updateTimePosition(){const t=this.closestEntryToCurrentTime;if(!t)return;const e=t.parentNode;e&&(this.timeScrollTop=t.getBoundingClientRect().top-e.getBoundingClientRect().top)}scrollToOffset(t){const{scrollView:e}=this;if(!e)return;this.cancelScrollAnimation();const i=e.scrollTop,o=t-i,r=performance.now(),s=p=>p<.5?2*p*p:-1+(4-2*p)*p,n=()=>{const p=(performance.now()-r)/1e3,v=Math.min(p/B,1);e.scrollTop=i+o*s(v),v<1?this.scrollAnimationId=requestAnimationFrame(n):this.scrollAnimationId=void 0};n()}cancelScrollAnimation(){this.scrollAnimationId!==void 0&&(cancelAnimationFrame(this.scrollAnimationId),this.scrollAnimationId=void 0)}static get styles(){return[w,E`
        :host {
          --transcript-height--: var(--ia-theme-transcript-height, 200px);

          --transcript-normal-text-color--: var(
            --ia-theme-transcript-normal-text-color,
            var(--ia-color-text-inverse-tertiary--)
          );
          --transcript-active-text-color--: var(
            --ia-theme-transcript-active-text-color,
            var(--ia-color-text-inverse--)
          );
          --transcript-hover-text-color--: var(
            --ia-theme-transcript-hover-text-color,
            var(--ia-color-text-inverse-secondary--)
          );

          --transcript-music-normal-text-color--: var(
            --ia-theme-transcript-music-normal-text-color,
            var(--ia-color-text-inverse-tertiary--)
          );
          --transcript-music-active-text-color--: var(
            --ia-theme-transcript-music-active-text-color,
            var(--ia-color-text-inverse--)
          );
          --transcript-music-hover-text-color--: var(
            --ia-theme-transcript-music-hover-text-color,
            var(--ia-color-text-inverse-secondary--)
          );

          --transcript-search-result-inactive-border-color--: var(
            --ia-theme-transcript-search-result-inactive-border-color,
            var(--ia-color-text-inverse-tertiary--)
          );
          --transcript-search-result-active-border-color--: var(
            --ia-theme-transcript-search-result-active-border-color,
            var(--ia-color-text-inverse-link--)
          );

          --transcript-time-color--: var(
            --ia-theme-transcript-time-color,
            var(--ia-color-text-inverse--)
          );
          --transcript-time-column-width--: var(
            --ia-theme-transcript-time-column-width,
            3rem /* 30px at a 10px root */
          );
          --transcript-time-font-size--: var(
            --ia-theme-transcript-time-font-size,
            1em
          );
          --transcript-time-line-height--: var(
            --ia-theme-transcript-time-line-height,
            1em
          );
          --transcript-time-display--: var(
            --ia-theme-transcript-time-display,
            block
          );

          --transcript-auto-scroll-button-color--: var(
            --ia-theme-transcript-auto-scroll-button-color,
            var(--ia-color-surface-theater--)
          );
          --transcript-auto-scroll-button-background--: var(
            --ia-theme-transcript-auto-scroll-button-background,
            var(--ia-color-surface-raised--)
          );
          --transcript-auto-scroll-button-width--: var(
            --ia-theme-transcript-auto-scroll-button-width,
            12rem /* 120px at a 10px root */
          );
          --transcript-auto-scroll-button-font-size--: var(
            --ia-theme-transcript-auto-scroll-button-font-size,
            1em
          );

          color: var(--transcript-normal-text-color--);
        }

        .container {
          position: relative;
        }

        .auto-scroll-button {
          position: absolute;
          left: 0;
          right: 0;
          bottom: var(--ia-space-2--);
          margin: auto;
          width: var(--transcript-auto-scroll-button-width--);
          border-radius: 1em;
          border: 0;
          display: inline-block;
          color: var(--transcript-auto-scroll-button-color--);
          background-color: var(--transcript-auto-scroll-button-background--);
          font-size: var(--transcript-auto-scroll-button-font-size--);
          cursor: pointer;
          z-index: 10;
        }

        .auto-scroll-button.hidden {
          display: none;
        }

        .context-overlay {
          position: absolute;
          left: 0;
          width: 100%;
          height: 0;
          /* Purely a guide. It sits over the top and bottom of the scroll area,
           so without this it would swallow the wheel and the entry clicks
           there, breaking the scrolling it exists to help you look at. */
          pointer-events: none;
        }

        .context-overlay.top {
          top: 0;
          border-bottom: 1px solid green;
        }

        .context-overlay.bottom {
          bottom: 0;
          border-top: 1px solid green;
        }

        .time {
          display: var(--transcript-time-display--);
          flex: 0 0 var(--transcript-time-column-width--);
          color: var(--transcript-time-color--);
          position: relative;
        }

        .time-display {
          position: absolute;
          top: 0;
          font-size: var(--transcript-time-font-size--);
          line-height: var(--transcript-time-line-height--);
          transition: top 1s;
        }

        .scroll-container {
          display: flex;
          overflow-y: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
          height: var(--transcript-height--);
        }

        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        ia-transcript-entry {
          cursor: pointer;
        }

        ia-transcript-entry:hover {
          color: var(--transcript-hover-text-color--);
        }

        ia-transcript-entry[ismusicentry] {
          color: var(--transcript-music-normal-text-color--);
          display: block;
          font-style: italic;
        }

        ia-transcript-entry[ismusicentry]:hover {
          color: var(--transcript-music-hover-text-color--);
        }

        ia-transcript-entry[ismusicentry][isactive] {
          color: var(--transcript-music-active-text-color--);
        }

        ia-transcript-entry[isactive] {
          color: var(--transcript-active-text-color--);
        }

        ia-transcript-entry[issearchresult] {
          /* Inline-block, or the outline adds a space to the right of the text */
          display: inline-block;
          padding: 0 5px;
          position: relative;
        }

        ia-transcript-entry[issearchresult]:after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          border: 2px solid
            var(--transcript-search-result-inactive-border-color--);
          border-radius: 5px;
        }

        ia-transcript-entry[issearchresult][isselected]:after {
          border: 2px solid
            var(--transcript-search-result-active-border-color--);
        }
      `]}};l([c({type:Object})],a.prototype,"config",2);l([c({type:Number})],a.prototype,"currentTime",2);l([c({type:Number})],a.prototype,"topContextHeight",2);l([c({type:Number})],a.prototype,"bottomContextHeight",2);l([c({type:Boolean})],a.prototype,"autoScroll",2);l([c({type:Number})],a.prototype,"selectedSearchResultIndex",2);l([c({type:Boolean})],a.prototype,"showContextZones",2);l([c({type:Number})],a.prototype,"scrollTimerDelay",2);l([b()],a.prototype,"timeScrollTop",2);l([b()],a.prototype,"currentEntries",2);l([g("#scroll-container")],a.prototype,"scrollView",2);a=l([f("ia-transcript-view"),T()],a);export{H as T,z as a,I as f};
