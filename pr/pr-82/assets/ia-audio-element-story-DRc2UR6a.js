import{n as m,t as y,i as g,b as h,a as b,r as c}from"./index-D6qQeiQp.js";import{e as v}from"./query-RWb4dfi1.js";import"./story-template-2jVxqekc.js";var w=Object.defineProperty,k=Object.getOwnPropertyDescriptor,p=(e,a,s,o)=>{for(var t=o>1?void 0:o?k(a,s):a,n=e.length-1,l;n>=0;n--)(l=e[n])&&(t=(o?l(a,s,t):l(t))||t);return o&&t&&w(a,s,t),t};const u={TimeUpdate:"timeupdate",DurationChange:"durationchange",PlaybackStarted:"playbackStarted",PlaybackPaused:"playbackPaused",CanPlay:"canplay",Error:"error"};let d=class extends g{constructor(){super(...arguments),this.showControls=!1,this.playbackRate=1,this.volume=1,this.sources=[]}get duration(){return this.audioElement?.duration??0}get currentTime(){return this.audioElement?.currentTime??0}load(){this.audioElement&&(this.audioElement.load(),this.audioElement.playbackRate=this.playbackRate)}play(){this.audioElement?.play().catch(()=>{})}pause(){this.audioElement?.pause()}seekTo(e){this.audioElement&&(this.audioElement.currentTime=e)}seekBy(e){this.audioElement&&(this.audioElement.currentTime+=e)}render(){return h`
      <audio
        ?controls=${this.showControls}
        .volume=${this.volume}
        .playbackRate=${this.playbackRate}
        @timeupdate=${this.handleTimeChange}
        @durationchange=${this.handleDurationChange}
        @play=${this.playbackStarted}
        @pause=${this.playbackPaused}
        @canplay=${this.canPlay}
        @error=${this.handleMediaError}
      >
        ${this.sources.map(e=>h`<source
              src=${e.url}
              type=${e.mimetype}
              @error=${this.handleSourceError}
            />`)}
      </audio>
    `}handleDurationChange(e){const a=e.target;this.dispatchEvent(new CustomEvent(u.DurationChange,{detail:{duration:a.duration}}))}handleTimeChange(e){const a=e.target;this.dispatchEvent(new CustomEvent(u.TimeUpdate,{detail:{currentTime:a.currentTime}}))}playbackStarted(){this.dispatchEvent(new Event(u.PlaybackStarted))}playbackPaused(){this.dispatchEvent(new Event(u.PlaybackPaused))}canPlay(){this.dispatchEvent(new Event(u.CanPlay))}handleMediaError(e){this.emitError(e.target.error)}handleSourceError(){this.audioElement?.networkState===HTMLMediaElement.NETWORK_NO_SOURCE&&this.emitError(null)}emitError(e){this.dispatchEvent(new CustomEvent(u.Error,{detail:{error:e}}))}};p([m({type:Boolean})],d.prototype,"showControls",2);p([m({type:Number})],d.prototype,"playbackRate",2);p([m({type:Number})],d.prototype,"volume",2);p([m({type:Array})],d.prototype,"sources",2);p([v("audio")],d.prototype,"audioElement",2);d=p([y("ia-audio-element")],d);const f=""+new URL("arrow-Mvsiq3dP.ogg",import.meta.url).href,E=""+new URL("arrow-DBfEM-Y0.mp3",import.meta.url).href,$=""+new URL("spring-DUrlU9jj.ogg",import.meta.url).href,P=""+new URL("spring-gwRd3wbj.mp3",import.meta.url).href;var T=Object.defineProperty,C=Object.getOwnPropertyDescriptor,i=(e,a,s,o)=>{for(var t=o>1?void 0:o?C(a,s):a,n=e.length-1,l;n>=0;n--)(l=e[n])&&(t=(o?l(a,s,t):l(t))||t);return o&&t&&T(a,s,t),t};const R={arrow:[{url:f,mimetype:"audio/ogg"},{url:E,mimetype:"audio/mpeg"}],spring:[{url:$,mimetype:"audio/ogg"},{url:P,mimetype:"audio/mpeg"}]},N=[{label:"Show native controls",propertyName:"showControls",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let r=class extends g{constructor(){super(...arguments),this.trackName="arrow",this.currentTime=0,this.duration=0,this.playing=!1,this.playbackRate=1,this.volume=1}render(){return h`
      <story-template
        elementTag="ia-audio-element"
        elementClassName="IAAudioElement"
        .propInputData=${{settings:N}}
        .defaultUsageProps=${'.sources=${[{ url: "/audio/track.mp3", mimetype: "audio/mpeg" }]}'}
      >
        <ia-audio-element
          slot="demo"
          showControls
          .sources=${R[this.trackName]}
          .playbackRate=${this.playbackRate}
          .volume=${this.volume}
          @timeupdate=${e=>{this.currentTime=e.detail.currentTime}}
          @durationchange=${e=>{this.duration=e.detail.duration}}
          @playbackStarted=${()=>{this.playing=!0}}
          @playbackPaused=${()=>{this.playing=!1}}
        ></ia-audio-element>

        <div slot="demo" class="panel">
          <div class="row">
            <button @click=${this.togglePlayback}>
              ${this.playing?"Pause":"Play"}
            </button>
            <button @click=${()=>this.audio?.seekBy(-.25)}>◀ 0.25s</button>
            <button @click=${()=>this.audio?.seekBy(.25)}>0.25s ▶</button>
            <button @click=${()=>this.audio?.seekTo(0)}>Back to start</button>
          </div>

          <div class="row">
            <label for="track">Track</label>
            <select id="track" @change=${this.handleTrackChange}>
              <option value="arrow">arrow</option>
              <option value="spring">spring</option>
            </select>
          </div>

          <div class="row">
            <label for="rate">Playback rate</label>
            <input
              id="rate"
              type="range"
              min="0.5"
              max="2"
              step="0.25"
              .value=${String(this.playbackRate)}
              @input=${e=>{this.playbackRate=Number(e.target.value)}}
            />
            <span class="value">${this.playbackRate}&times;</span>
          </div>

          <div class="row">
            <label for="volume">Volume</label>
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.05"
              .value=${String(this.volume)}
              @input=${e=>{this.volume=Number(e.target.value)}}
            />
            <span class="value">${Math.round(this.volume*100)}%</span>
          </div>

          <p class="readout">
            <code>currentTime</code> ${this.currentTime.toFixed(2)}s /
            <code>duration</code>
            ${Number.isFinite(this.duration)?`${this.duration.toFixed(2)}s`:"unknown"}
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            A declarative wrapper around the native
            <code>&lt;audio&gt;</code> element. It renders nothing visible
            unless <code>showControls</code> is set, so most consumers drive it
            through its methods (<code>play</code>, <code>pause</code>,
            <code>load</code>, <code>seekTo</code>, <code>seekBy</code>) and
            listen for its events.
          </p>
          <p>
            Native media events do not cross a shadow root boundary, so this
            element re-dispatches the useful ones from the host:
            <code>timeupdate</code> and <code>durationchange</code> carry their
            value in <code>event.detail</code>, and
            <code>playbackStarted</code>, <code>playbackPaused</code> and
            <code>canplay</code> are plain events. <code>error</code> fires once
            the browser has run out of sources to try, so a single failing
            source with a working fallback after it stays quiet.
          </p>
          <p>
            <code>duration</code> follows
            <code>HTMLMediaElement.duration</code>, which means it is
            <code>NaN</code> until the metadata loads and can be
            <code>Infinity</code> for a stream. Check it with
            <code>Number.isFinite</code> before doing arithmetic, as the readout
            above does.
          </p>
          <p>
            Changing <code>sources</code> re-renders the
            <code>&lt;source&gt;</code> tags but does not reload the track on
            its own. Call <code>load()</code> afterwards, as the track selector
            above does.
          </p>
        </div>
      </story-template>
    `}togglePlayback(){this.playing?this.audio?.pause():this.audio?.play()}async handleTrackChange(e){this.trackName=e.target.value,this.currentTime=0,this.duration=0,await this.updateComplete,this.audio?.load()}static get styles(){return b`
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
        min-width: 8em;
      }

      .value {
        min-width: 3em;
      }

      .readout {
        font-size: 0.9em;
      }
    `}};i([v("ia-audio-element")],r.prototype,"audio",2);i([c()],r.prototype,"trackName",2);i([c()],r.prototype,"currentTime",2);i([c()],r.prototype,"duration",2);i([c()],r.prototype,"playing",2);i([c()],r.prototype,"playbackRate",2);i([c()],r.prototype,"volume",2);r=i([y("ia-audio-element-story")],r);export{r as IAAudioElementStory};
