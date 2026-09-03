import{n as l,t as g,i as T,b as p,r as m,A as R,a as C}from"./index-CFIc9tQb.js";import{m as $}from"./runtime-CCgtQBty.js";import{e as A}from"./query-BT7CBlPN.js";import{o as k}from"./story-template-ITlv8vFM.js";class O{constructor(e,i,s,r,o,n){this.id=e,this.start=i,this.end=s,this.rawText=r,this.isMusic=o,this.searchMatchIndex=n}get displayText(){return this.isMusic?$("[Transcript unavailable]"):this.rawText}}class M{constructor(e){this.entries=[],this.entries=e}get searchResults(){return this.entries.filter(e=>e.searchMatchIndex!==void 0)}}function I(t){if(typeof t!="number"||!Number.isFinite(t))return"";const e=Math.max(0,Math.floor(t)),i=Math.floor(e/3600),s=Math.floor(e/60)%60,r=e%60,o=String(r).padStart(2,"0");if(i===0)return`${s}:${o}`;const n=String(s).padStart(2,"0");return`${i}:${n}:${o}`}var _=Object.defineProperty,P=Object.getOwnPropertyDescriptor,f=(t,e,i,s)=>{for(var r=s>1?void 0:s?P(e,i):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(s?n(e,i,r):n(r))||r);return s&&r&&_(e,i,r),r};let u=class extends T{constructor(){super(...arguments),this.isActive=!1,this.isSelected=!1,this.isClickable=!1,this.isSearchResult=!1,this.isMusicEntry=!1}render(){return p`${this.entry?.displayText??""}`}};f([l({type:Object})],u.prototype,"entry",2);f([l({type:Boolean,reflect:!0})],u.prototype,"isActive",2);f([l({type:Boolean,reflect:!0})],u.prototype,"isSelected",2);f([l({type:Boolean,reflect:!0})],u.prototype,"isClickable",2);f([l({type:Boolean,reflect:!0})],u.prototype,"isSearchResult",2);f([l({type:Boolean,reflect:!0})],u.prototype,"isMusicEntry",2);u=f([g("ia-transcript-entry")],u);var D=Object.defineProperty,N=Object.getOwnPropertyDescriptor,c=(t,e,i,s)=>{for(var r=s>1?void 0:s?N(e,i):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(s?n(e,i,r):n(r))||r);return s&&r&&D(e,i,r),r};const b={TranscriptEntrySelected:"transcriptEntrySelected",CurrentEntriesUpdated:"currentEntriesUpdated",AutoScrollChanged:"autoScrollChanged"},V=1;let a=class extends T{constructor(){super(...arguments),this.currentTime=0,this.topContextHeight=50,this.bottomContextHeight=50,this.autoScroll=!0,this.selectedSearchResultIndex=0,this.showContextZones=!1,this.scrollTimerDelay=15e3,this.timeScrollTop=0,this.currentEntries=[]}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.scrollResumeTimerId),this.cancelScrollAnimation()}render(){return p`
      <div class="container">
        ${this.showContextZones?this.contextZoneTemplates:R}

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
    `}scrollToSelectedSearchResult(){const{selectedSearchResult:t}=this;t&&(this.autoScroll=!1,this.scrollToElement(t))}entryIdentifierClosestToTime(t){const e=this.transcriptEntries;if(e.length===0)return null;let i=e[0],s=Math.abs(t-i.start);for(const r of e){const o=Math.abs(t-r.start);o<s&&(s=o,i=r)}return i.id}get autoScrollButtonTemplate(){return p`
      <button
        class="auto-scroll-button ${this.autoScroll?"hidden":""}"
        @click=${this.enableAutoScroll}
      >
        ${$("Scroll text with audio")}
      </button>
    `}get timeDisplayTemplate(){return p`
      <div class="time-display" style="top: ${this.timeScrollTop}px">
        ${I(this.currentTime)}
      </div>
    `}transcriptEntryTemplate(t){const e=this.currentEntries.some(i=>i.id===t.id);return p`
      <ia-transcript-entry
        .entry=${t}
        ?isActive=${e}
        ?isSelected=${t.searchMatchIndex===this.selectedSearchResultIndex}
        ?isSearchResult=${t.searchMatchIndex!==void 0}
        ?isMusicEntry=${t.isMusic}
        isClickable
        data-search-result-index=${k(t.searchMatchIndex)}
        data-identifier=${t.id}
        @click=${this.transcriptEntrySelected}
      ></ia-transcript-entry>
    `}get contextZoneTemplates(){return p`
      <div
        class="top context-overlay"
        style="height: ${this.topContextHeight}px"
      ></div>
      <div
        class="bottom context-overlay"
        style="height: ${this.bottomContextHeight}px"
      ></div>
    `}get transcriptEntries(){return this.config?.entries??[]}updated(t){t.has("currentTime")&&this.handleCurrentTimeChange(),t.has("selectedSearchResultIndex")&&this.scrollToSelectedSearchResult(),t.has("currentEntries")&&(this.scrollToClosestEntry(),this.updateTimePosition()),t.has("autoScroll")&&this.dispatchEvent(new CustomEvent(b.AutoScrollChanged,{detail:{autoScroll:this.autoScroll}})),t.has("config")&&(this.selectedSearchResultIndex=0,this.scrollToSelectedSearchResult())}transcriptEntrySelected(t){const{entry:e}=t.currentTarget;e&&(this.dispatchEvent(new CustomEvent(b.TranscriptEntrySelected,{detail:{entry:e}})),e.searchMatchIndex!==void 0&&(this.selectedSearchResultIndex=e.searchMatchIndex),this.autoScroll=!1)}handleCurrentTimeChange(){const t=this.transcriptEntries;if(t.length===0)return;const e=t.filter(i=>this.currentTime>=i.start&&this.currentTime<=i.end);a.entryArraysMatch(e,this.currentEntries)||(this.dispatchEvent(new Event(b.CurrentEntriesUpdated)),this.currentEntries=e)}static entryArraysMatch(t,e){if(t.length!==e.length)return!1;const i=t.map(r=>r.id).sort((r,o)=>r-o),s=e.map(r=>r.id).sort((r,o)=>r-o);return i.every((r,o)=>s[o]===r)}elementClosestToTime(t){const e=this.entryIdentifierClosestToTime(t);return e===null?null:this.elementForIdentifier(e)}elementForIdentifier(t){return this.shadowRoot?.querySelector(`ia-transcript-entry[data-identifier="${t}"]`)??null}didScroll(){this.autoScroll=!1,clearTimeout(this.scrollResumeTimerId),this.scrollResumeTimerId=setTimeout(()=>{this.autoScroll=!0},this.scrollTimerDelay)}enableAutoScroll(){this.autoScroll=!0,this.scrollToClosestEntry()}get activeTranscriptEntry(){return this.shadowRoot?.querySelector("ia-transcript-entry[isActive]")??null}get selectedSearchResult(){return this.shadowRoot?.querySelector(`ia-transcript-entry[data-search-result-index="${this.selectedSearchResultIndex}"]`)??null}get closestEntryToCurrentTime(){return this.activeTranscriptEntry??this.elementClosestToTime(this.currentTime)}scrollToClosestEntry(){if(!this.autoScroll)return;const t=this.closestEntryToCurrentTime;t&&this.scrollToElement(t)}scrollToElement(t){const{scrollView:e}=this;if(!e)return;const i=e.getBoundingClientRect(),s=t.getBoundingClientRect(),r=i.height-this.bottomContextHeight,o=s.bottom>i.top+r,n=s.top<i.top;!o&&!n||this.scrollToOffset(s.top-i.top+e.scrollTop-this.topContextHeight)}updateTimePosition(){const t=this.closestEntryToCurrentTime;if(!t)return;const e=t.parentNode;e&&(this.timeScrollTop=t.getBoundingClientRect().top-e.getBoundingClientRect().top)}scrollToOffset(t){const{scrollView:e}=this;if(!e)return;this.cancelScrollAnimation();const i=e.scrollTop,s=t-i,r=performance.now(),o=h=>h<.5?2*h*h:-1+(4-2*h)*h,n=()=>{const h=(performance.now()-r)/1e3,x=Math.min(h/V,1);e.scrollTop=i+s*o(x),x<1?this.scrollAnimationId=requestAnimationFrame(n):this.scrollAnimationId=void 0};n()}cancelScrollAnimation(){this.scrollAnimationId!==void 0&&(cancelAnimationFrame(this.scrollAnimationId),this.scrollAnimationId=void 0)}static get styles(){return C`
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
    `}};c([l({type:Object})],a.prototype,"config",2);c([l({type:Number})],a.prototype,"currentTime",2);c([l({type:Number})],a.prototype,"topContextHeight",2);c([l({type:Number})],a.prototype,"bottomContextHeight",2);c([l({type:Boolean})],a.prototype,"autoScroll",2);c([l({type:Number})],a.prototype,"selectedSearchResultIndex",2);c([l({type:Boolean})],a.prototype,"showContextZones",2);c([l({type:Number})],a.prototype,"scrollTimerDelay",2);c([m()],a.prototype,"timeScrollTop",2);c([m()],a.prototype,"currentEntries",2);c([A("#scroll-container")],a.prototype,"scrollView",2);a=c([g("ia-transcript-view")],a);var B=Object.defineProperty,z=Object.getOwnPropertyDescriptor,y=(t,e,i,s)=>{for(var r=s>1?void 0:s?z(e,i):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(s?n(e,i,r):n(r))||r);return s&&r&&B(e,i,r),r};const E=[["Good evening, and welcome to the programme.",!1],["Tonight we are looking back at the early days of radio.",!1],["",!0],["Our first broadcast went out in nineteen twenty two.",!1],["It reached perhaps a few hundred listeners.",!1],["The transmitter sat in a shed behind the post office.",!1],["",!0],["By the end of the decade the audience was in the millions.",!1],["Whole families would gather around a single set.",!1],["The evening schedule became a fixed point in the week.",!1],["Announcers wore evening dress, though nobody could see them.",!1],["",!0],["We will hear from some of those early broadcasters after the break.",!1],["Stay with us.",!1],["And now, the news.",!1]],v=6;function S(t){let e=0;const i=E.map(([s,r],o)=>{const n=t!==""&&!r&&s.toLowerCase().includes(t.toLowerCase());let h;return n&&(h=e,e+=1),new O(o,o*v,o*v+v-1,s,r,h)});return new M(i)}const w=E.length*v,H=[{label:"Height",cssVariable:"--ia-theme-transcript-height",defaultValue:200,inputType:"range",min:80,max:400,step:10,unit:"px"},{label:"Text colour",cssVariable:"--ia-theme-transcript-normal-text-color",defaultValue:"#808080",inputType:"color"},{label:"Active text colour",cssVariable:"--ia-theme-transcript-active-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Selected result border",cssVariable:"--ia-theme-transcript-search-result-active-border-color",defaultValue:"#008000",inputType:"color"},{label:"Timestamp colour",cssVariable:"--ia-theme-transcript-time-color",defaultValue:"#ffffff",inputType:"color"}],j=[{label:"Show context zones",propertyName:"showContextZones",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Autoscroll",propertyName:"autoScroll",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]}];let d=class extends T{constructor(){super(...arguments),this.currentTime=0,this.searchTerm="",this.transcript=S(""),this.selectedSearchResultIndex=0,this.playing=!1}disconnectedCallback(){super.disconnectedCallback(),this.stopPlayback()}get resultCount(){return this.transcript.searchResults.length}render(){return p`
      <story-template
        elementTag="ia-transcript-view"
        elementClassName="IATranscriptView"
        .styleInputData=${{settings:H}}
        .propInputData=${{settings:j}}
        .defaultUsageProps=${".config=${transcriptConfig}\n  .currentTime=${currentTime}"}
      >
        <ia-transcript-view
          slot="demo"
          class="transcript"
          .config=${this.transcript}
          .currentTime=${this.currentTime}
          .selectedSearchResultIndex=${this.selectedSearchResultIndex}
          @transcriptEntrySelected=${t=>{this.currentTime=t.detail.entry.start}}
        ></ia-transcript-view>

        <div slot="demo" class="panel">
          <div class="row">
            <button @click=${this.togglePlayback}>
              ${this.playing?"Pause":"Play"}
            </button>
            <input
              type="range"
              min="0"
              max=${w}
              step="1"
              .value=${String(this.currentTime)}
              @input=${t=>{this.currentTime=Number(t.target.value)}}
            />
            <span class="value">${I(this.currentTime)}</span>
          </div>

          <div class="row">
            <label for="search">Search the transcript</label>
            <input
              id="search"
              type="text"
              placeholder="e.g. radio"
              .value=${this.searchTerm}
              @input=${this.handleSearchInput}
            />
          </div>

          ${this.searchTerm===""?p`<p class="hint">
                Type something to outline the matching lines.
              </p>`:p`<div class="row">
                <button
                  ?disabled=${this.resultCount===0}
                  @click=${()=>this.stepResult(-1)}
                >
                  Previous
                </button>
                <button
                  ?disabled=${this.resultCount===0}
                  @click=${()=>this.stepResult(1)}
                >
                  Next
                </button>
                <span class="value">
                  ${this.resultCount===0?"no matches":`${this.selectedSearchResultIndex+1} of ${this.resultCount}`}
                </span>
              </div>`}
        </div>

        <div slot="usage-notes">
          <p>
            A transcript that follows playback. Drive it by setting
            <code>currentTime</code>; it highlights whatever is being spoken and
            scrolls to keep it in view.
          </p>
          <p>
            Scroll the transcript by hand and it stops following, showing a
            "Scroll text with audio" button to hand control back. It also picks
            following back up on its own after
            <code>scrollTimerDelay</code> milliseconds, fifteen seconds by
            default.
          </p>
          <p>
            Entries carrying a <code>searchMatchIndex</code> are outlined as
            search results, and the one matching
            <code>selectedSearchResultIndex</code> is outlined differently and
            scrolled to. Music stretches show
            <em>[Transcript unavailable]</em> instead of their text.
          </p>
          <p>
            Turn on "Show context zones" above to see the band the active entry
            is kept inside while scrolling.
          </p>
          <p>
            Hold <code>config</code> in a stable reference and replace it only
            when the transcript really changes. Assigning it resets
            <code>selectedSearchResultIndex</code> and stops the view following
            playback, and Lit re-commits any object binding on every render, so
            building the config inside <code>render()</code> resets the view
            each time it draws.
          </p>
        </div>
      </story-template>
    `}handleSearchInput(t){this.searchTerm=t.target.value,this.transcript=S(this.searchTerm),this.selectedSearchResultIndex=0}stepResult(t){const e=this.resultCount;e!==0&&(this.selectedSearchResultIndex=(this.selectedSearchResultIndex+t+e)%e)}togglePlayback(){if(this.playing){this.stopPlayback();return}this.playing=!0,this.playbackTimer=setInterval(()=>{this.currentTime=(this.currentTime+1)%w},500)}stopPlayback(){clearInterval(this.playbackTimer),this.playbackTimer=void 0,this.playing=!1}static get styles(){return C`
      .transcript {
        display: block;
        background-color: #151515;
        padding: 1rem;
        border-radius: 4px;
      }

      .panel {
        margin-top: 1em;
      }

      .row {
        display: flex;
        align-items: center;
        gap: 0.5em;
        margin-bottom: 0.5em;
      }

      .row label {
        min-width: 11em;
      }

      .row input[type='range'] {
        flex: 1 1 auto;
        max-width: 20em;
      }

      .value {
        min-width: 5em;
      }

      .hint {
        font-size: 0.9em;
        font-style: italic;
      }
    `}};y([m()],d.prototype,"currentTime",2);y([m()],d.prototype,"searchTerm",2);y([m()],d.prototype,"transcript",2);y([m()],d.prototype,"selectedSearchResultIndex",2);y([m()],d.prototype,"playing",2);d=y([g("ia-transcript-view-story")],d);export{d as IATranscriptViewStory};
