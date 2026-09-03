import{i as g,b as h,a as b,r as c,t as y}from"./index-BrfvWStf.js";import{f as w,a as T,T as v}from"./ia-transcript-view-BKqPWrBg.js";import"./story-template-ClDI42eF.js";import"./runtime-CCgtQBty.js";import"./query-pQC_ajjn.js";var x=Object.defineProperty,S=Object.getOwnPropertyDescriptor,n=(e,t,l,a)=>{for(var s=a>1?void 0:a?S(t,l):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(a?o(t,l,s):o(s))||s);return a&&s&&x(t,l,s),s};const f=[["Good evening, and welcome to the programme.",!1],["Tonight we are looking back at the early days of radio.",!1],["",!0],["Our first broadcast went out in nineteen twenty two.",!1],["It reached perhaps a few hundred listeners.",!1],["The transmitter sat in a shed behind the post office.",!1],["",!0],["By the end of the decade the audience was in the millions.",!1],["Whole families would gather around a single set.",!1],["The evening schedule became a fixed point in the week.",!1],["Announcers wore evening dress, though nobody could see them.",!1],["",!0],["We will hear from some of those early broadcasters after the break.",!1],["Stay with us.",!1],["And now, the news.",!1]],p=6;function d(e){let t=0;const l=f.map(([a,s],r)=>{const o=e!==""&&!s&&a.toLowerCase().includes(e.toLowerCase());let u;return o&&(u=t,t+=1),new T(r,r*p,r*p+p-1,a,s,u)});return new v(l)}const m=f.length*p,I=[{label:"Height",cssVariable:"--ia-theme-transcript-height",defaultValue:200,inputType:"range",min:80,max:400,step:10,unit:"px"},{label:"Text colour",cssVariable:"--ia-theme-transcript-normal-text-color",defaultValue:"#808080",inputType:"color"},{label:"Active text colour",cssVariable:"--ia-theme-transcript-active-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Selected result border",cssVariable:"--ia-theme-transcript-search-result-active-border-color",defaultValue:"#008000",inputType:"color"},{label:"Timestamp colour",cssVariable:"--ia-theme-transcript-time-color",defaultValue:"#ffffff",inputType:"color"}],$=[{label:"Show context zones",propertyName:"showContextZones",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Autoscroll",propertyName:"autoScroll",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]}];let i=class extends g{constructor(){super(...arguments),this.currentTime=0,this.searchTerm="",this.transcript=d(""),this.selectedSearchResultIndex=0,this.playing=!1}disconnectedCallback(){super.disconnectedCallback(),this.stopPlayback()}get resultCount(){return this.transcript.searchResults.length}render(){return h`
      <story-template
        elementTag="ia-transcript-view"
        elementClassName="IATranscriptView"
        .styleInputData=${{settings:I}}
        .propInputData=${{settings:$}}
        .defaultUsageProps=${".config=${transcriptConfig}\n  .currentTime=${currentTime}"}
      >
        <ia-transcript-view
          slot="demo"
          class="transcript"
          .config=${this.transcript}
          .currentTime=${this.currentTime}
          .selectedSearchResultIndex=${this.selectedSearchResultIndex}
          @transcriptEntrySelected=${e=>{this.currentTime=e.detail.entry.start}}
        ></ia-transcript-view>

        <div slot="demo" class="panel">
          <div class="row">
            <button @click=${this.togglePlayback}>
              ${this.playing?"Pause":"Play"}
            </button>
            <input
              type="range"
              min="0"
              max=${m}
              step="1"
              .value=${String(this.currentTime)}
              @input=${e=>{this.currentTime=Number(e.target.value)}}
            />
            <span class="value">${w(this.currentTime)}</span>
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

          ${this.searchTerm===""?h`<p class="hint">
                Type something to outline the matching lines.
              </p>`:h`<div class="row">
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
    `}handleSearchInput(e){this.searchTerm=e.target.value,this.transcript=d(this.searchTerm),this.selectedSearchResultIndex=0}stepResult(e){const t=this.resultCount;t!==0&&(this.selectedSearchResultIndex=(this.selectedSearchResultIndex+e+t)%t)}togglePlayback(){if(this.playing){this.stopPlayback();return}this.playing=!0,this.playbackTimer=setInterval(()=>{this.currentTime=(this.currentTime+1)%m},500)}stopPlayback(){clearInterval(this.playbackTimer),this.playbackTimer=void 0,this.playing=!1}static get styles(){return b`
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
    `}};n([c()],i.prototype,"currentTime",2);n([c()],i.prototype,"searchTerm",2);n([c()],i.prototype,"transcript",2);n([c()],i.prototype,"selectedSearchResultIndex",2);n([c()],i.prototype,"playing",2);i=n([y("ia-transcript-view-story")],i);export{i as IATranscriptViewStory};
