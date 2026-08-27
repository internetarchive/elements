import{m as y}from"./runtime-CCgtQBty.js";import{n as a,t as f,i as b,b as d,r as T,A as x,a as g}from"./index-Dn3nSsUP.js";import{e as S}from"./query-DfE-_BXG.js";import{o as C}from"./story-template-BHtDfdDo.js";class D{constructor(e,i,o,r,s,n){this.id=e,this.start=i,this.end=o,this.rawText=r,this.isMusic=s,this.searchMatchIndex=n}get displayText(){return this.isMusic?y("[Transcript unavailable]"):this.rawText}}class z{constructor(e){this.entries=[],this.entries=e}get searchResults(){return this.entries.filter(e=>e.searchMatchIndex!==void 0)}}function E(t){if(typeof t!="number"||!Number.isFinite(t))return"";const e=Math.max(0,Math.floor(t)),i=Math.floor(e/3600),o=Math.floor(e/60)%60,r=e%60,s=String(r).padStart(2,"0");if(i===0)return`${o}:${s}`;const n=String(o).padStart(2,"0");return`${i}:${n}:${s}`}var w=Object.defineProperty,I=Object.getOwnPropertyDescriptor,u=(t,e,i,o)=>{for(var r=o>1?void 0:o?I(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(o?n(e,i,r):n(r))||r);return o&&r&&w(e,i,r),r};let h=class extends b{constructor(){super(...arguments),this.isActive=!1,this.isSelected=!1,this.isClickable=!1,this.isSearchResult=!1,this.isMusicEntry=!1}render(){return d`${this.entry?.displayText??""}`}};u([a({type:Object})],h.prototype,"entry",2);u([a({type:Boolean,reflect:!0})],h.prototype,"isActive",2);u([a({type:Boolean,reflect:!0})],h.prototype,"isSelected",2);u([a({type:Boolean,reflect:!0})],h.prototype,"isClickable",2);u([a({type:Boolean,reflect:!0})],h.prototype,"isSearchResult",2);u([a({type:Boolean,reflect:!0})],h.prototype,"isMusicEntry",2);h=u([f("ia-transcript-entry")],h);var $=Object.defineProperty,R=Object.getOwnPropertyDescriptor,l=(t,e,i,o)=>{for(var r=o>1?void 0:o?R(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(o?n(e,i,r):n(r))||r);return o&&r&&$(e,i,r),r};const m={TranscriptEntrySelected:"transcriptEntrySelected",CurrentEntriesUpdated:"currentEntriesUpdated",AutoScrollChanged:"autoScrollChanged"},A=1;let c=class extends b{constructor(){super(...arguments),this.currentTime=0,this.topContextHeight=50,this.bottomContextHeight=50,this.autoScroll=!0,this.selectedSearchResultIndex=0,this.showContextZones=!1,this.scrollTimerDelay=15e3,this.timeScrollTop=0,this.currentEntries=[]}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.scrollResumeTimerId),this.cancelScrollAnimation()}render(){return d`
      <div class="container">
        ${this.showContextZones?this.contextZoneTemplates:x}

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
        class="auto-scroll-button ${this.autoScroll?"hidden":""}"
        @click=${this.enableAutoScroll}
      >
        ${y("Scroll text with audio")}
      </button>
    `}get timeDisplayTemplate(){return d`
      <div class="time-display" style="top: ${this.timeScrollTop}px">
        ${E(this.currentTime)}
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
    `}get transcriptEntries(){return this.config?.entries??[]}updated(t){t.has("currentTime")&&this.handleCurrentTimeChange(),t.has("selectedSearchResultIndex")&&this.scrollToSelectedSearchResult(),t.has("currentEntries")&&(this.scrollToClosestEntry(),this.updateTimePosition()),t.has("autoScroll")&&this.dispatchEvent(new CustomEvent(m.AutoScrollChanged,{detail:{autoScroll:this.autoScroll}})),t.has("config")&&(this.selectedSearchResultIndex=0,this.scrollToSelectedSearchResult())}transcriptEntrySelected(t){const{entry:e}=t.currentTarget;e&&(this.dispatchEvent(new CustomEvent(m.TranscriptEntrySelected,{detail:{entry:e}})),e.searchMatchIndex!==void 0&&(this.selectedSearchResultIndex=e.searchMatchIndex),this.autoScroll=!1)}handleCurrentTimeChange(){const t=this.transcriptEntries;if(t.length===0)return;const e=t.filter(i=>this.currentTime>=i.start&&this.currentTime<=i.end);c.entryArraysMatch(e,this.currentEntries)||(this.dispatchEvent(new Event(m.CurrentEntriesUpdated)),this.currentEntries=e)}static entryArraysMatch(t,e){if(t.length!==e.length)return!1;const i=t.map(r=>r.id).sort((r,s)=>r-s),o=e.map(r=>r.id).sort((r,s)=>r-s);return i.every((r,s)=>o[s]===r)}elementClosestToTime(t){const e=this.entryIdentifierClosestToTime(t);return e===null?null:this.elementForIdentifier(e)}elementForIdentifier(t){return this.shadowRoot?.querySelector(`ia-transcript-entry[data-identifier="${t}"]`)??null}didScroll(){this.autoScroll=!1,clearTimeout(this.scrollResumeTimerId),this.scrollResumeTimerId=setTimeout(()=>{this.autoScroll=!0},this.scrollTimerDelay)}enableAutoScroll(){this.autoScroll=!0,this.scrollToClosestEntry()}get activeTranscriptEntry(){return this.shadowRoot?.querySelector("ia-transcript-entry[isActive]")??null}get selectedSearchResult(){return this.shadowRoot?.querySelector(`ia-transcript-entry[data-search-result-index="${this.selectedSearchResultIndex}"]`)??null}get closestEntryToCurrentTime(){return this.activeTranscriptEntry??this.elementClosestToTime(this.currentTime)}scrollToClosestEntry(){if(!this.autoScroll)return;const t=this.closestEntryToCurrentTime;t&&this.scrollToElement(t)}scrollToElement(t){const{scrollView:e}=this;if(!e)return;const i=e.getBoundingClientRect(),o=t.getBoundingClientRect(),r=i.height-this.bottomContextHeight,s=o.bottom>i.top+r,n=o.top<i.top;!s&&!n||this.scrollToOffset(o.top-i.top+e.scrollTop-this.topContextHeight)}updateTimePosition(){const t=this.closestEntryToCurrentTime;if(!t)return;const e=t.parentNode;e&&(this.timeScrollTop=t.getBoundingClientRect().top-e.getBoundingClientRect().top)}scrollToOffset(t){const{scrollView:e}=this;if(!e)return;this.cancelScrollAnimation();const i=e.scrollTop,o=t-i,r=performance.now(),s=p=>p<.5?2*p*p:-1+(4-2*p)*p,n=()=>{const p=(performance.now()-r)/1e3,v=Math.min(p/A,1);e.scrollTop=i+o*s(v),v<1?this.scrollAnimationId=requestAnimationFrame(n):this.scrollAnimationId=void 0};n()}cancelScrollAnimation(){this.scrollAnimationId!==void 0&&(cancelAnimationFrame(this.scrollAnimationId),this.scrollAnimationId=void 0)}static get styles(){return g`
      :host {
        --transcript-height--: var(--ia-theme-transcript-height, 200px);

        --transcript-normal-text-color--: var(
          --ia-theme-transcript-normal-text-color,
          gray
        );
        --transcript-active-text-color--: var(
          --ia-theme-transcript-active-text-color,
          white
        );
        --transcript-hover-text-color--: var(
          --ia-theme-transcript-hover-text-color,
          silver
        );

        --transcript-music-normal-text-color--: var(
          --ia-theme-transcript-music-normal-text-color,
          gray
        );
        --transcript-music-active-text-color--: var(
          --ia-theme-transcript-music-active-text-color,
          white
        );
        --transcript-music-hover-text-color--: var(
          --ia-theme-transcript-music-hover-text-color,
          silver
        );

        --transcript-search-result-inactive-border-color--: var(
          --ia-theme-transcript-search-result-inactive-border-color,
          gray
        );
        --transcript-search-result-active-border-color--: var(
          --ia-theme-transcript-search-result-active-border-color,
          green
        );

        --transcript-time-color--: var(--ia-theme-transcript-time-color, white);
        --transcript-time-column-width--: var(
          --ia-theme-transcript-time-column-width,
          3rem
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
          black
        );
        --transcript-auto-scroll-button-background--: var(
          --ia-theme-transcript-auto-scroll-button-background,
          white
        );
        --transcript-auto-scroll-button-width--: var(
          --ia-theme-transcript-auto-scroll-button-width,
          12rem
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
        bottom: 1rem;
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
        z-index: -1;
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
        border: 2px solid var(--transcript-search-result-active-border-color--);
      }
    `}};l([a({type:Object})],c.prototype,"config",2);l([a({type:Number})],c.prototype,"currentTime",2);l([a({type:Number})],c.prototype,"topContextHeight",2);l([a({type:Number})],c.prototype,"bottomContextHeight",2);l([a({type:Boolean})],c.prototype,"autoScroll",2);l([a({type:Number})],c.prototype,"selectedSearchResultIndex",2);l([a({type:Boolean})],c.prototype,"showContextZones",2);l([a({type:Number})],c.prototype,"scrollTimerDelay",2);l([T()],c.prototype,"timeScrollTop",2);l([T()],c.prototype,"currentEntries",2);l([S("#scroll-container")],c.prototype,"scrollView",2);c=l([f("ia-transcript-view")],c);export{z as T,D as a,E as f};
