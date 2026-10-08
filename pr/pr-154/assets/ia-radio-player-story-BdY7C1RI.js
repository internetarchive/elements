import{i as C,b as p,a as U,r as O,c as P}from"./index-DpQoML9j.js";import{T as b,a as v}from"./models-DkycLAZf.js";import"./story-template-B-AFmlzJ.js";class l{constructor(e,t){this.startIndex=e,this.endIndex=t}get length(){return Math.abs(this.endIndex-this.startIndex)}}class u{constructor(e){const{merged:t,ranges:s}=u.buildIndex(e);this.mergedTranscript=t,this.mergedTranscriptLowercased=t.toLowerCase(),this.transcriptEntryRanges=s}getTranscriptEntryAt(e){return this.transcriptEntryRanges.find(({range:t})=>t.startIndex<=e&&t.endIndex>e)}static buildIndex(e){const t=[];let s="";return e.entries.forEach(n=>{s!==""&&n.rawText!==""&&(s+=" ");const r=s.length;s+=n.rawText,t.push({entry:n,range:new l(r,s.length)})}),{merged:s,ranges:t}}}class A{constructor(e){this.transcriptIndex=e}async getSearchRanges(e){if(e==="")return[];const t=this.transcriptIndex.mergedTranscriptLowercased,s=e.toLowerCase(),n=[];let r=t.indexOf(s);for(;r!==-1;)n.push(new l(r,r+s.length)),r=t.indexOf(s,r+1);return n}}function F(o,e){const t=o.startIndex<e.startIndex?o:e,s=t===o?e:o;if(!(t.endIndex<s.startIndex))return new l(s.startIndex,Math.min(t.endIndex,s.endIndex))}class f{constructor(e,t){this.searchBackend=e,this.transcriptIndex=t}async search(e){const t=await this.getSearchSeparatedTranscript(e),s=[];let n=0,r=1;return t.forEach(a=>{if(a.isSearchMatch){const i=this.entryForMatch(a,r);if(!i)return;i.searchMatchIndex=n,n+=1,r+=1,s.push(i);return}this.transcriptIndex.transcriptEntryRanges.forEach(i=>{const c=F(a.range,i.range);if(!c||c.length===0&&i.range.length>0)return;const d=f.blankEntryFrom(i.entry);d.rawText=this.transcriptIndex.mergedTranscript.substring(c.startIndex,c.endIndex).trim(),d.id=r,r+=1,s.push(d)})}),new b(s)}entryForMatch(e,t){const s=this.transcriptIndex.getTranscriptEntryAt(e.range.startIndex);if(!s)return;const n=Math.max(e.range.startIndex,e.range.endIndex-1),r=this.transcriptIndex.getTranscriptEntryAt(n)??s,a=f.blankEntryFrom(s.entry);return a.rawText=e.text,a.id=t,a.end=r.entry.end,a}async getSearchSeparatedTranscript(e){const t=await this.searchBackend.getSearchRanges(e),{mergedTranscript:s}=this.transcriptIndex;if(t.length===0)return[this.chunkFor(new l(0,s.length),!1)];const n=[...t].sort((i,c)=>i.startIndex-c.startIndex),r=[];let a=0;return n.forEach(i=>{i.startIndex<a||(r.push(this.chunkFor(new l(a,i.startIndex),!1)),r.push(this.chunkFor(i,!0)),a=i.endIndex)}),r.push(this.chunkFor(new l(a,s.length),!1)),r}chunkFor(e,t){return{range:e,text:this.transcriptIndex.mergedTranscript.substring(e.startIndex,e.endIndex),isSearchMatch:t}}static blankEntryFrom(e){return new v(e.id,e.start,e.end,"",e.isMusic)}}var B=Object.defineProperty,N=Object.getOwnPropertyDescriptor,T=(o,e,t,s)=>{for(var n=s>1?void 0:s?N(e,t):e,r=o.length-1,a;r>=0;r--)(a=o[r])&&(n=(s?a(e,t,n):a(n))||n);return s&&n&&B(e,t,n),n};const h=6,x=1.5,I=[0,3,5,7,10],S=[["Good evening, and welcome to the programme.",!1],["Tonight we look back at the early days of radio.",!1],["",!0],["The first broadcast went out in nineteen twenty two.",!1],["It reached perhaps a few hundred listeners.",!1],["The transmitter sat in a shed behind the post office.",!1],["",!0],["By the end of the decade the audience was in the millions.",!1],["Whole families gathered around a single radio set.",!1],["The evening schedule became a fixed point in the week.",!1],["",!0],["We hear from some of those early broadcasters after the break.",!1],["Stay with us.",!1],["And now, the news.",!1]],L=S.length*h,m=new b(S.map(([o,e],t)=>new v(t,t*h,t*h+h-1,o,e)));function V(o=L){const t=8e3*o,s=44,n=new ArrayBuffer(s+t),r=new DataView(n),a=(i,c)=>{[...c].forEach((d,g)=>r.setUint8(i+g,d.charCodeAt(0)))};a(0,"RIFF"),r.setUint32(4,36+t,!0),a(8,"WAVE"),a(12,"fmt "),r.setUint32(16,16,!0),r.setUint16(20,1,!0),r.setUint16(22,1,!0),r.setUint32(24,8e3,!0),r.setUint32(28,8e3,!0),r.setUint16(32,1,!0),r.setUint16(34,8,!0),a(36,"data"),r.setUint32(40,t,!0);for(let i=0;i<t;i+=1){const c=i/8e3,d=Math.floor(c/x),g=c-d*x,E=I[d%I.length],k=Math.floor(c/h),y=220*2**((E-k)/12),$=Math.exp(-3.2*g),R=(Math.sin(2*Math.PI*y*c)+.35*Math.sin(4*Math.PI*y*c))/1.35,M=128+Math.round(R*$*14);r.setUint8(s+i,M)}return URL.createObjectURL(new Blob([n],{type:"audio/wav"}))}function _(o=240){const e=Array.from({length:o},(s,n)=>{const r=Math.sin(n/4)*.3+Math.sin(n/13)*.4+Math.sin(n/31)*.3,a=Math.max(.06,Math.abs(r))*100;return`<rect x="${n*2}" y="${((100-a)/2).toFixed(2)}" width="1" height="${a.toFixed(2)}" />`}).join(""),t=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${o*2} 100" preserveAspectRatio="none"><g fill="#2b2b2b">${e}</g></svg>`;return`data:image/svg+xml,${encodeURIComponent(t)}`}const D=`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><rect width="160" height="160" rx="12" fill="#2c2c2c"/><circle cx="80" cy="80" r="46" fill="none" stroke="#fff" stroke-width="6"/><circle cx="80" cy="80" r="12" fill="#fff"/><path d="M80 34 L80 12" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>')}`,j={title:"The Early Days of Radio",date:"Broadcast 14 March 1958",logoUrl:D,waveformUrl:_(),audioSources:[{url:V(),mimetype:"audio/wav"}],quickSearches:["radio","listeners","broadcast"]},H=new f(new A(new u(m)),new u(m)),W=[{label:"Title colour",cssVariable:"--ia-theme-radio-player-title-color",defaultValue:"#ffffff",inputType:"color"},{label:"Waveform fill",cssVariable:"--ia-theme-waveform-fill-color",defaultValue:"#3272b6",inputType:"color"},{label:"Transcript active text",cssVariable:"--ia-theme-transcript-active-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Waveform height",cssVariable:"--ia-theme-radio-player-waveform-height",defaultValue:5,inputType:"range",min:2,max:10,step:.5,unit:"rem"}],G=[{label:"Skip music sections",propertyName:"skipMusicSections",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Show music zones",propertyName:"showMusicZones",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}],z=8;let w=class extends C{constructor(){super(...arguments),this.log=[]}render(){return p`
      <story-template
        elementTag="ia-radio-player"
        elementClassName="IARadioPlayer"
        .styleInputData=${{settings:W}}
        .propInputData=${{settings:G}}
        .defaultUsageProps=${".config=${radioPlayerConfig}\n  .transcriptConfig=${transcript}\n  .searchHandler=${searchHandler}"}
      >
        <ia-radio-player
          slot="demo"
          class="player"
          .config=${j}
          .transcriptConfig=${m}
          .searchHandler=${H}
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
          ${this.log.length===0?p`<p class="empty">
                Press play, drag the waveform, or search the transcript for
                something like "radio".
              </p>`:p`<ol class="log">
                ${this.log.map(o=>p`<li><code>${o}</code></li>`)}
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
    `}record(o){const{detail:e}=o,t=e?` ${JSON.stringify(e)}`:"";this.log=[`${o.type}${t}`,...this.log].slice(0,z)}static get styles(){return U`
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
    `}};T([O()],w.prototype,"log",2);w=T([P("ia-radio-player-story")],w);export{w as IARadioPlayerStory};
