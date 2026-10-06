import{w as U,n as p,c as I,i as $,m,b as d,s as j,a as P,r as f,e as C,A as k}from"./index-D_Ql7zfC.js";import{T as A,a as D}from"./ia-transcript-view-DSylhh95.js";import{l as V}from"./localized-decorator-DZNeCY5r.js";import{P as M}from"./ia-playback-controls-DFdJ795X.js";import"./ia-audio-element-Dn8F6hUt.js";import"./ia-expandable-search-bar-BR-NgtCN.js";import"./ia-scrubber-bar-BkVRxVpk.js";import"./ia-status-indicator-81Un0WDK.js";import"./ia-waveform-progress-DxKBKCl-.js";import"./story-template-ybb2bkpr.js";import"./masked-icon-CJm8uF1r.js";class y{constructor(e,r){this.startIndex=e,this.endIndex=r}get length(){return Math.abs(this.endIndex-this.startIndex)}}class b{constructor(e){const{merged:r,ranges:s}=b.buildIndex(e);this.mergedTranscript=r,this.mergedTranscriptLowercased=r.toLowerCase(),this.transcriptEntryRanges=s}getTranscriptEntryAt(e){return this.transcriptEntryRanges.find(({range:r})=>r.startIndex<=e&&r.endIndex>e)}static buildIndex(e){const r=[];let s="";return e.entries.forEach(a=>{s!==""&&a.rawText!==""&&(s+=" ");const i=s.length;s+=a.rawText,r.push({entry:a,range:new y(i,s.length)})}),{merged:s,ranges:r}}}class W{constructor(e){this.transcriptIndex=e}async getSearchRanges(e){if(e==="")return[];const r=this.transcriptIndex.mergedTranscriptLowercased,s=e.toLowerCase(),a=[];let i=r.indexOf(s);for(;i!==-1;)a.push(new y(i,i+s.length)),i=r.indexOf(s,i+1);return a}}function K(t,e){const r=t.startIndex<e.startIndex?t:e,s=r===t?e:t;if(!(r.endIndex<s.startIndex))return new y(s.startIndex,Math.min(r.endIndex,s.endIndex))}class S{constructor(e,r){this.searchBackend=e,this.transcriptIndex=r}async search(e){const r=await this.getSearchSeparatedTranscript(e),s=[];let a=0,i=1;return r.forEach(n=>{if(n.isSearchMatch){const o=this.entryForMatch(n,i);if(!o)return;o.searchMatchIndex=a,a+=1,i+=1,s.push(o);return}this.transcriptIndex.transcriptEntryRanges.forEach(o=>{const u=K(n.range,o.range);if(!u||u.length===0&&o.range.length>0)return;const g=S.blankEntryFrom(o.entry);g.rawText=this.transcriptIndex.mergedTranscript.substring(u.startIndex,u.endIndex).trim(),g.id=i,i+=1,s.push(g)})}),new A(s)}entryForMatch(e,r){const s=this.transcriptIndex.getTranscriptEntryAt(e.range.startIndex);if(!s)return;const a=Math.max(e.range.startIndex,e.range.endIndex-1),i=this.transcriptIndex.getTranscriptEntryAt(a)??s,n=S.blankEntryFrom(s.entry);return n.rawText=e.text,n.id=r,n.end=i.entry.end,n}async getSearchSeparatedTranscript(e){const r=await this.searchBackend.getSearchRanges(e),{mergedTranscript:s}=this.transcriptIndex;if(r.length===0)return[this.chunkFor(new y(0,s.length),!1)];const a=[...r].sort((o,u)=>o.startIndex-u.startIndex),i=[];let n=0;return a.forEach(o=>{o.startIndex<n||(i.push(this.chunkFor(new y(n,o.startIndex),!1)),i.push(this.chunkFor(o,!0)),n=o.endIndex)}),i.push(this.chunkFor(new y(n,s.length),!1)),i}chunkFor(e,r){return{range:e,text:this.transcriptIndex.mergedTranscript.substring(e.startIndex,e.endIndex),isSearchMatch:r}}static blankEntryFrom(e){return new D(e.id,e.start,e.end,"",e.isMusic)}}const Q=U`
<svg
  height="13"
  viewBox="0 0 8 13"
  width="8"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="m-1.5 8.5 5-5 5 5"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    transform="matrix(0 -1 -1 0 10 9.7)"
  />
</svg>
`,X=U`
<svg
  height="13"
  viewBox="0 0 8 13"
  width="8"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="m-1.5 8.5 5-5 5 5"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    transform="matrix(0 -1 1 0 -2 9.7)"
  />
</svg>
`;var Y=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,B=(t,e,r,s)=>{for(var a=s>1?void 0:s?ee(e,r):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(a=(s?n(e,r,a):n(a))||a);return s&&a&&Y(e,r,a),a};const te={SearchResultIndexChanged:"searchResultIndexChanged"};let x=class extends ${constructor(){super(...arguments),this.numberOfResults=0,this.currentResultIndex=0}render(){return d`
      <div class="container">
        <button
          id="previous-button"
          type="button"
          aria-label=${m("Previous search result")}
          @click=${this.goToPreviousResult}
        >
          ${X}
        </button>

        <span class="results-range">
          <span id="current-result">${this.currentResultIndex+1}</span> /
          <span id="number-of-results">${this.numberOfResults}</span>
        </span>

        <button
          id="next-button"
          type="button"
          aria-label=${m("Next search result")}
          @click=${this.goToNextResult}
        >
          ${Q}
        </button>
      </div>

      <!--
        The counter above is two bare numbers, which say nothing on their own.
        This says what they mean, and being a live region it is announced each
        time the reader moves between results.
      -->
      <div class="sr-only" role="status">${this.positionLabel}</div>
    `}updated(t){t.has("numberOfResults")&&(this.currentResultIndex=0)}goToPreviousResult(){this.currentResultIndex=this.currentResultIndex<1?this.numberOfResults-1:this.currentResultIndex-1,this.emitSearchResultIndexChanged()}goToNextResult(){this.currentResultIndex=this.currentResultIndex===this.numberOfResults-1?0:this.currentResultIndex+1,this.emitSearchResultIndexChanged()}get positionLabel(){const t=this.currentResultIndex+1,e=this.numberOfResults;return m(j`Search result ${t} of ${e}`)}emitSearchResultIndexChanged(){this.dispatchEvent(new CustomEvent(te.SearchResultIndexChanged,{detail:{searchResultIndex:this.currentResultIndex}}))}static get styles(){return P`
      :host {
        --search-switcher-color--: var(--ia-theme-search-switcher-color, #fff);

        color: var(--search-switcher-color--);
      }

      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
      }

      button {
        background: none;
        border: 0;
        padding: 0;
        color: inherit;
        cursor: pointer;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `}};B([p({type:Number})],x.prototype,"numberOfResults",2);B([p({type:Number})],x.prototype,"currentResultIndex",2);x=B([I("ia-search-results-switcher"),V()],x);var re=Object.defineProperty,se=Object.getOwnPropertyDescriptor,h=(t,e,r,s)=>{for(var a=s>1?void 0:s?se(e,r):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(a=(s?n(e,r,a):n(a))||a);return s&&a&&re(e,r,a),a};const l={CanPlay:"canplay",CurrentTimeChanged:"currentTimeChanged",HighlightedSearchResultChanged:"highlightedSearchResultChanged",JumpBackButtonPressed:"jumpBackButtonPressed",JumpForwardButtonPressed:"jumpForwardButtonPressed",NextSectionButtonPressed:"nextSectionButtonPressed",PlaybackPaused:"playbackPaused",PlaybackRateChanged:"playbackRateChanged",PlaybackStarted:"playbackStarted",PlayPauseButtonPressed:"playPauseButtonPressed",PrevSectionButtonPressed:"prevSectionButtonPressed",SearchCleared:"searchCleared",SearchExecuted:"searchExecuted",SearchFailed:"searchFailed",SearchTermChanged:"searchTermChanged",TimeChangedFromScrub:"timeChangedFromScrub",TranscriptEntrySelected:"transcriptEntrySelected"},N=10,ae=2,v=.1;let c=class extends ${constructor(){super(...arguments),this.currentTime=0,this.searchTerm="",this.skipMusicSections=!1,this.showMusicZones=!1,this.percentComplete=0,this.isPlaying=!1,this.duration=0,this.playbackRate=1,this.volume=1,this.isSearching=!1,this.latestSearchId=0}render(){return d`
      ${this.audioElementTemplate}
      <section role="main">
        ${this.titleDateTemplate} ${this.collectionLogoTemplate}
        ${this.playbackControlsTemplate}
        <div class="waveform-scrubber-container">
          ${this.waveformProgressTemplate} ${this.scrubberBarTemplate}
        </div>
        ${this.searchSectionTemplate} ${this.transcriptViewTemplate}
      </section>
    `}play(){this.audioElement?.play()}pause(){this.audioElement?.pause()}seekTo(t){this.audioElement?.seekTo(t)}get audioElementTemplate(){return d`
      <ia-audio-element
        .sources=${this.audioSources}
        .playbackRate=${this.playbackRate}
        .volume=${this.volume}
        @timeupdate=${this.handleTimeChange}
        @durationchange=${this.handleDurationChange}
        @playbackStarted=${this.playbackStarted}
        @playbackPaused=${this.playbackPaused}
        @canplay=${this.canPlay}
      ></ia-audio-element>
    `}get titleDateTemplate(){return d`
      <div class="title-date">
        <div class="title">${this.config?.title??""}</div>
        <div class="date">${this.config?.date??""}</div>
      </div>
    `}get collectionLogoTemplate(){const t=this.config?.logoUrl;return t?d`
      <img
        class="collection-logo"
        src=${t}
        alt=${m("Collection logo")}
      />
    `:k}get playbackControlsTemplate(){return d`
      <ia-playback-controls
        .playbackMode=${this.isPlaying?M.playing:M.paused}
        .playbackRate=${this.playbackRate}
        .volume=${this.volume}
        @back-button-pressed=${this.handleBackButton}
        @play-pause-button-pressed=${this.handlePlayPauseButton}
        @forward-button-pressed=${this.handleForwardButton}
        @volumeChange=${this.handleVolumeChange}
        @playbackRateChange=${this.handlePlaybackRateChange}
        @next-section-button-pressed=${this.handleNextSectionButton}
        @prev-section-button-pressed=${this.handlePrevSectionButton}
      ></ia-playback-controls>
    `}get waveformProgressTemplate(){const t=this.config?.waveformUrl;return t?d`
      <ia-waveform-progress
        interactive
        .waveformUrl=${t}
        .percentComplete=${this.percentComplete}
        .zonesOfSilence=${this.showMusicZones?this.zonesOfSilence:[]}
        @valuechange=${this.handleScrub}
      ></ia-waveform-progress>
    `:k}get scrubberBarTemplate(){return d`
      <ia-scrubber-bar
        .sectionMarkerPercentages=${this.sectionMarkerPercentages}
        .value=${this.percentComplete}
        @valuechange=${this.handleScrub}
      ></ia-scrubber-bar>
    `}get transcriptViewTemplate(){return d`
      <div class="transcript-container">
        <ia-transcript-view
          .config=${this.currentTranscript}
          .currentTime=${this.currentTime}
          @transcriptEntrySelected=${this.handleTranscriptEntrySelected}
        ></ia-transcript-view>
      </div>
    `}get searchSectionTemplate(){return d`
      <div class="search-section">
        <ia-expandable-search-bar
          .searchTerm=${this.searchTerm}
          .quickSearches=${this.quickSearches}
          ?showsDisclosure=${this.quickSearches.length>0}
          @inputchange=${this.handleSearchInput}
          @enterKeyPressed=${this.handleSearchSubmitted}
          @quickSearchSelected=${this.handleQuickSearchSelected}
          @searchCleared=${this.handleSearchCleared}
        ></ia-expandable-search-bar>

        <div class="search-results-info">
          <!--
            Always rendered, so a screen reader is already watching it by the
            time the text changes. A live region added to the page with its
            text already in place is not announced.
          -->
          <div class="sr-only" role="status">${this.searchStatusMessage}</div>

          ${this.isSearching?d`<ia-status-indicator
                mode="loading"
                loadingTitle=${m("Searching the transcript")}
              ></ia-status-indicator>`:this.searchOutcomeTemplate}
        </div>
      </div>
    `}get searchOutcomeTemplate(){if(this.searchTerm.length===0||!this.searchResultsTranscript)return k;const t=this.searchResults.length;return t===0?d`
        <div class="no-search-results-message" aria-hidden="true">
          ${m("No search results.")}
        </div>
      `:d`
      <ia-search-results-switcher
        .numberOfResults=${t}
        @searchResultIndexChanged=${this.handleSearchResultIndexChanged}
      ></ia-search-results-switcher>
    `}get searchStatusMessage(){if(this.isSearching)return m("Searching the transcript");if(this.searchTerm.length===0||!this.searchResultsTranscript)return"";const t=this.searchResults.length;return t===0?m("No search results."):m(j`${t} search results`)}get currentTranscript(){return this.searchResultsTranscript??this.transcriptConfig}get transcriptEntries(){return this.currentTranscript?.entries??[]}get searchResults(){return this.searchResultsTranscript?.searchResults??[]}get audioSources(){return this.config?.audioSources??[]}get quickSearches(){return(this.config?.quickSearches??[]).map(t=>({displayText:t}))}get musicEntries(){return this.transcriptEntries.filter(t=>t.isMusic)}get zonesOfSilence(){return this.duration===0?[]:this.musicEntries.map(t=>({startPercent:t.start/this.duration*100,endPercent:t.end/this.duration*100}))}get musicZones(){return this.musicEntries.map(t=>({start:t.start,end:t.end}))}get sectionMarkerPercentages(){const t=[0];return this.zonesOfSilence.forEach(e=>{t.push(e.startPercent,e.endPercent)}),t.push(100),t}updated(t){t.has("searchResultsTranscript")&&this.resetSearchResultPosition(),t.has("searchHandler")&&this.searchTerm&&this.executeSearch(this.searchTerm),t.has("currentTime")&&(this.dispatchEvent(new CustomEvent(l.CurrentTimeChanged,{detail:{currentTime:this.currentTime}})),this.skipMusicSections&&this.skipMusicZone())}handleTimeChange(t){const{currentTime:e}=t.detail;e!==void 0&&(this.currentTime=e,this.percentComplete=this.duration>0?e/this.duration*100:0)}handleDurationChange(t){const{duration:e}=t.detail;Number.isFinite(e)&&(this.duration=e)}handlePlaybackRateChange(t){const{playbackRate:e}=t.detail;e!==void 0&&(this.playbackRate=e,this.dispatchEvent(new CustomEvent(l.PlaybackRateChanged,{detail:{playbackRate:e}})))}handleVolumeChange(t){const{volume:e}=t.detail;e!==void 0&&(this.volume=e,this.dispatchEvent(new CustomEvent("volumeChanged",{detail:{volume:e}})))}handleBackButton(){this.audioElement?.seekBy(-N),this.dispatchEvent(new Event(l.JumpBackButtonPressed))}handleForwardButton(){this.audioElement?.seekBy(N),this.dispatchEvent(new Event(l.JumpForwardButtonPressed))}handlePlayPauseButton(){this.isPlaying=!this.isPlaying,this.isPlaying?this.audioElement?.play():this.audioElement?.pause(),this.dispatchEvent(new CustomEvent(l.PlayPauseButtonPressed,{detail:{isPlaying:this.isPlaying}}))}handleNextSectionButton(){const t=this.sectionMarkerPercentages.filter(e=>e>this.percentComplete+v);this.seekToSectionBoundary(t,Math.min,v),this.dispatchEvent(new Event(l.NextSectionButtonPressed))}handlePrevSectionButton(){const t=this.sectionMarkerPercentages.filter(e=>e<this.percentComplete-v);this.seekToSectionBoundary(t,Math.max,-v),this.dispatchEvent(new Event(l.PrevSectionButtonPressed))}seekToSectionBoundary(t,e,r){if(t.length===0)return;const s=e(...t);this.audioElement?.seekTo(this.duration*(s/100)+r)}handleScrub(t){const e=t.detail.value;if(e===void 0)return;const r=this.duration*(e/100);this.currentTime=r,this.percentComplete=e,this.audioElement?.seekTo(r),this.dispatchEvent(new CustomEvent(l.TimeChangedFromScrub,{detail:{newTime:r}}))}handleTranscriptEntrySelected(t){const{entry:e}=t.detail;e&&(this.currentTime=e.start,this.audioElement?.seekTo(e.start),this.audioElement?.play(),this.dispatchEvent(new CustomEvent(l.TranscriptEntrySelected,{detail:{newTime:e.start}})))}handleSearchInput(t){const{value:e}=t.detail;e!==void 0&&(this.searchTerm=e,e.length===0&&(this.searchResultsTranscript=void 0,this.latestSearchId+=1,this.isSearching=!1,this.resetSearchResultPosition()),this.emitSearchTermChanged(e))}handleSearchSubmitted(t){const{value:e}=t.detail;e&&this.executeSearch(e)}handleQuickSearchSelected(t){const e=t.detail.quickSearchEntry?.displayText;e&&(this.emitSearchTermChanged(e),this.executeSearch(e))}handleSearchCleared(){this.searchTerm="",this.searchResultsTranscript=void 0,this.latestSearchId+=1,this.isSearching=!1,this.dispatchEvent(new Event(l.SearchCleared)),this.emitSearchTermChanged(""),this.resetSearchResultPosition()}async executeSearch(t){if(!this.searchHandler||t.length<ae){this.searchResultsTranscript=void 0;return}this.searchTerm=t,this.isSearching=!0,this.dispatchEvent(new Event(l.SearchExecuted)),this.latestSearchId+=1;const e=this.latestSearchId;try{const r=await this.searchHandler.search(t);if(e!==this.latestSearchId)return;this.searchResultsTranscript=r}catch{if(e!==this.latestSearchId)return;this.searchResultsTranscript=void 0,this.dispatchEvent(new Event(l.SearchFailed))}finally{e===this.latestSearchId&&(this.isSearching=!1)}}handleSearchResultIndexChanged(t){const{searchResultIndex:e}=t.detail;e===void 0||!this.transcriptView||(this.transcriptView.selectedSearchResultIndex=e,this.transcriptView.scrollToSelectedSearchResult(),this.dispatchEvent(new CustomEvent(l.HighlightedSearchResultChanged,{detail:{searchResultIndex:e}})))}resetSearchResultPosition(){this.transcriptView&&(this.transcriptView.selectedSearchResultIndex=0),this.searchResultsSwitcher&&(this.searchResultsSwitcher.currentResultIndex=0)}emitSearchTermChanged(t){this.dispatchEvent(new CustomEvent(l.SearchTermChanged,{detail:{searchTerm:t}}))}playbackPaused(){this.isPlaying=!1,this.dispatchEvent(new Event(l.PlaybackPaused))}playbackStarted(){this.isPlaying=!0,this.dispatchEvent(new Event(l.PlaybackStarted))}canPlay(){this.dispatchEvent(new Event(l.CanPlay))}skipMusicZone(){const t=this.musicZones.find(e=>this.currentTime>e.start&&this.currentTime<e.end);t&&this.audioElement?.seekTo(t.end+v)}static get styles(){return P`
      :host {
        --radio-player-title-color--: var(
          --ia-theme-radio-player-title-color,
          #fff
        );
        --radio-player-title-font--: var(
          --ia-theme-radio-player-title-font,
          1.5em sans-serif
        );
        --radio-player-date-color--: var(
          --ia-theme-radio-player-date-color,
          #fff
        );
        --radio-player-date-font--: var(
          --ia-theme-radio-player-date-font,
          1em sans-serif
        );
        --radio-player-logo-max-height--: var(
          --ia-theme-radio-player-logo-max-height,
          8rem
        );
        --radio-player-waveform-height--: var(
          --ia-theme-radio-player-waveform-height,
          5rem
        );
      }

      section[role='main'] {
        display: grid;
        grid-gap: 0.5rem;
      }

      ia-status-indicator {
        --ia-theme-icon-width: 1.5em;
        --ia-theme-primary-text-color: #999;

        display: block;
        margin: auto;
      }

      /* mobile view */
      @media (max-width: 770px) {
        section[role='main'] {
          grid-template-columns: 25% 1fr;
          grid-template-areas:
            'collection-logo title-date'
            'waveform-scrubber waveform-scrubber'
            'playback-controls playback-controls'
            'search-section search-section'
            'transcript-container transcript-container';
        }

        .date {
          text-align: left;
        }

        ia-transcript-view {
          --ia-theme-transcript-time-display: none;
        }

        ia-playback-controls {
          width: 75%;
          margin: auto;
        }

        .search-section {
          width: 75%;
          margin: auto;
        }
      }

      /* wide view */
      @media (min-width: 770px) {
        section[role='main'] {
          grid-template-columns: 192px 0 250px 1fr;
          grid-template-areas:
            'title-date title-date title-date title-date'
            'collection-logo . playback-controls waveform-scrubber'
            'search-section transcript-container transcript-container transcript-container';
        }

        .title-date {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        ia-transcript-view {
          --ia-theme-transcript-time-display: block;
        }
      }

      .title-date {
        grid-area: title-date;
      }

      .title {
        color: var(--radio-player-title-color--);
        font: var(--radio-player-title-font--);
      }

      .date {
        color: var(--radio-player-date-color--);
        font: var(--radio-player-date-font--);
      }

      ia-waveform-progress {
        width: 100%;
        height: var(--radio-player-waveform-height--);
      }

      ia-playback-controls {
        grid-area: playback-controls;
      }

      .transcript-container {
        grid-area: transcript-container;
      }

      ia-transcript-view {
        max-width: 600px;
        display: block;
      }

      .collection-logo {
        width: 100%;
        max-height: var(--radio-player-logo-max-height--);
        object-fit: contain;
        grid-area: collection-logo;
        align-self: center;
      }

      .waveform-scrubber-container {
        width: 100%;
        height: 100%;
        grid-area: waveform-scrubber;
      }

      .search-section {
        grid-area: search-section;
      }

      .search-results-info {
        margin-top: 0.5em;
      }

      ia-expandable-search-bar {
        display: block;
        margin: auto;
      }

      .no-search-results-message {
        text-align: center;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `}};h([p({type:Object})],c.prototype,"config",2);h([p({type:Object})],c.prototype,"searchHandler",2);h([p({type:Object})],c.prototype,"transcriptConfig",2);h([p({type:Object})],c.prototype,"searchResultsTranscript",2);h([p({type:Number})],c.prototype,"currentTime",2);h([p({type:String})],c.prototype,"searchTerm",2);h([p({type:Boolean})],c.prototype,"skipMusicSections",2);h([p({type:Boolean})],c.prototype,"showMusicZones",2);h([f()],c.prototype,"percentComplete",2);h([f()],c.prototype,"isPlaying",2);h([f()],c.prototype,"duration",2);h([f()],c.prototype,"playbackRate",2);h([f()],c.prototype,"volume",2);h([f()],c.prototype,"isSearching",2);h([C("ia-audio-element")],c.prototype,"audioElement",2);h([C("ia-transcript-view")],c.prototype,"transcriptView",2);h([C("ia-search-results-switcher")],c.prototype,"searchResultsSwitcher",2);c=h([I("ia-radio-player"),V()],c);var ie=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,L=(t,e,r,s)=>{for(var a=s>1?void 0:s?ne(e,r):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(a=(s?n(e,r,a):n(a))||a);return s&&a&&ie(e,r,a),a};const w=6,F=1.5,_=[0,3,5,7,10],H=[["Good evening, and welcome to the programme.",!1],["Tonight we look back at the early days of radio.",!1],["",!0],["The first broadcast went out in nineteen twenty two.",!1],["It reached perhaps a few hundred listeners.",!1],["The transmitter sat in a shed behind the post office.",!1],["",!0],["By the end of the decade the audience was in the millions.",!1],["Whole families gathered around a single radio set.",!1],["The evening schedule became a fixed point in the week.",!1],["",!0],["We hear from some of those early broadcasters after the break.",!1],["Stay with us.",!1],["And now, the news.",!1]],oe=H.length*w,E=new A(H.map(([t,e],r)=>new D(r,r*w,r*w+w-1,t,e)));function ce(t=oe){const r=8e3*t,s=44,a=new ArrayBuffer(s+r),i=new DataView(a),n=(o,u)=>{[...u].forEach((g,T)=>i.setUint8(o+T,g.charCodeAt(0)))};n(0,"RIFF"),i.setUint32(4,36+r,!0),n(8,"WAVE"),n(12,"fmt "),i.setUint32(16,16,!0),i.setUint16(20,1,!0),i.setUint16(22,1,!0),i.setUint32(24,8e3,!0),i.setUint32(28,8e3,!0),i.setUint16(32,1,!0),i.setUint16(34,8,!0),n(36,"data"),i.setUint32(40,r,!0);for(let o=0;o<r;o+=1){const u=o/8e3,g=Math.floor(u/F),T=u-g*F,Z=_[g%_.length],q=Math.floor(u/w),O=220*2**((Z-q)/12),z=Math.exp(-3.2*T),G=(Math.sin(2*Math.PI*O*u)+.35*Math.sin(4*Math.PI*O*u))/1.35,J=128+Math.round(G*z*14);i.setUint8(s+o,J)}return URL.createObjectURL(new Blob([a],{type:"audio/wav"}))}function he(t=240){const e=Array.from({length:t},(s,a)=>{const i=Math.sin(a/4)*.3+Math.sin(a/13)*.4+Math.sin(a/31)*.3,n=Math.max(.06,Math.abs(i))*100;return`<rect x="${a*2}" y="${((100-n)/2).toFixed(2)}" width="1" height="${n.toFixed(2)}" />`}).join(""),r=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t*2} 100" preserveAspectRatio="none"><g fill="#2b2b2b">${e}</g></svg>`;return`data:image/svg+xml,${encodeURIComponent(r)}`}const le=`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><rect width="160" height="160" rx="12" fill="#2c2c2c"/><circle cx="80" cy="80" r="46" fill="none" stroke="#fff" stroke-width="6"/><circle cx="80" cy="80" r="12" fill="#fff"/><path d="M80 34 L80 12" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>')}`,de={title:"The Early Days of Radio",date:"Broadcast 14 March 1958",logoUrl:le,waveformUrl:he(),audioSources:[{url:ce(),mimetype:"audio/wav"}],quickSearches:["radio","listeners","broadcast"]},ue=new S(new W(new b(E)),new b(E)),pe=[{label:"Title colour",cssVariable:"--ia-theme-radio-player-title-color",defaultValue:"#ffffff",inputType:"color"},{label:"Waveform fill",cssVariable:"--ia-theme-waveform-fill-color",defaultValue:"#3272b6",inputType:"color"},{label:"Transcript active text",cssVariable:"--ia-theme-transcript-active-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Waveform height",cssVariable:"--ia-theme-radio-player-waveform-height",defaultValue:5,inputType:"range",min:2,max:10,step:.5,unit:"rem"}],me=[{label:"Skip music sections",propertyName:"skipMusicSections",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Show music zones",propertyName:"showMusicZones",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}],ge=8;let R=class extends ${constructor(){super(...arguments),this.log=[]}render(){return d`
      <story-template
        elementTag="ia-radio-player"
        elementClassName="IARadioPlayer"
        .styleInputData=${{settings:pe}}
        .propInputData=${{settings:me}}
        .defaultUsageProps=${".config=${radioPlayerConfig}\n  .transcriptConfig=${transcript}\n  .searchHandler=${searchHandler}"}
      >
        <ia-radio-player
          slot="demo"
          class="player"
          .config=${de}
          .transcriptConfig=${E}
          .searchHandler=${ue}
          @playPauseButtonPressed=${this.record}
          @searchExecuted=${this.record}
          @searchCleared=${this.record}
          @highlightedSearchResultChanged=${this.record}
          @timeChangedFromScrub=${this.record}
          @transcriptEntrySelected=${this.record}
          @jumpBackButtonPressed=${this.record}
          @jumpForwardButtonPressed=${this.record}
          @nextSectionButtonPressed=${this.record}
          @prevSectionButtonPressed=${this.record}
        ></ia-radio-player>

        <div slot="demo" class="panel">
          <div class="log-header">
            <strong>Events</strong>
            <button @click=${()=>this.log=[]}>Clear</button>
          </div>
          ${this.log.length===0?d`<p class="empty">
                Press play, drag the waveform, or search the transcript for
                something like "radio".
              </p>`:d`<ol class="log">
                ${this.log.map(t=>d`<li><code>${t}</code></li>`)}
              </ol>`}
        </div>

        <div slot="usage-notes">
          <p>
            The whole player: audio, transport controls, waveform, scrubber,
            search and transcript wired together. It owns no playback or search
            logic itself, it just coordinates the pieces.
          </p>
          <p>
            The audio here is a run of quiet generated notes that walk down in
            pitch as the track goes on, so you can hear that playback is running
            and that scrubbing moved somewhere else. The waveform and the logo
            are drawn rather than fetched, so the demo needs no network.
          </p>
          <p>
            Searching is wired to a
            <code>SearchHandler</code> over a <code>LocalSearchBackend</code>,
            which searches the transcript in the browser. Type at least two
            characters and press Enter. The arrows that appear step between
            matches and scroll the transcript to each one. Swap in a
            <code>FullTextSearchBackend</code> to search against archive.org
            instead.
          </p>
          <p>
            The three music breaks are marked as boundaries on the scrubber. The
            section buttons either side of the transport controls jump between
            those boundaries, and <code>skipMusicSections</code> above makes
            playback jump past them entirely. <code>showMusicZones</code> also
            shades them on the waveform. It's off by default, which matches the
            player on archive.org.
          </p>
        </div>
      </story-template>
    `}record(t){const{detail:e}=t,r=e?` ${JSON.stringify(e)}`:"";this.log=[`${t.type}${r}`,...this.log].slice(0,ge)}static get styles(){return P`
      .player {
        display: block;
        background-color: #151515;
        padding: 1rem;
        border-radius: 4px;
      }

      .panel {
        margin-top: 1em;
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
    `}};L([f()],R.prototype,"log",2);R=L([I("ia-radio-player-story")],R);export{R as IARadioPlayerStory};
