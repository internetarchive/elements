import{i as c,b as u,a as p,r as i,t as m}from"./index-BSy7dZ9k.js";import{e as h}from"./query-TBMS6p8b.js";import"./ia-audio-element-DoYyOJI5.js";import"./story-template-DdFC3aJl.js";const g=""+new URL("arrow-Mvsiq3dP.ogg",import.meta.url).href,y=""+new URL("arrow-DBfEM-Y0.mp3",import.meta.url).href,v=""+new URL("spring-DUrlU9jj.ogg",import.meta.url).href,b=""+new URL("spring-gwRd3wbj.mp3",import.meta.url).href;var w=Object.defineProperty,f=Object.getOwnPropertyDescriptor,a=(e,r,n,s)=>{for(var o=s>1?void 0:s?f(r,n):r,l=e.length-1,d;l>=0;l--)(d=e[l])&&(o=(s?d(r,n,o):d(o))||o);return s&&o&&w(r,n,o),o};const k={arrow:[{url:g,mimetype:"audio/ogg"},{url:y,mimetype:"audio/mpeg"}],spring:[{url:v,mimetype:"audio/ogg"},{url:b,mimetype:"audio/mpeg"}]},$=[{label:"Show native controls",propertyName:"showControls",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let t=class extends c{constructor(){super(...arguments),this.trackName="arrow",this.currentTime=0,this.duration=0,this.playing=!1,this.playbackRate=1,this.volume=1}render(){return u`
      <story-template
        elementTag="ia-audio-element"
        elementClassName="IAAudioElement"
        .propInputData=${{settings:$}}
        .defaultUsageProps=${'.sources=${[{ url: "/audio/track.mp3", mimetype: "audio/mpeg" }]}'}
      >
        <ia-audio-element
          slot="demo"
          showControls
          .sources=${k[this.trackName]}
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
    `}togglePlayback(){this.playing?this.audio?.pause():this.audio?.play()}async handleTrackChange(e){this.trackName=e.target.value,this.currentTime=0,this.duration=0,await this.updateComplete,this.audio?.load()}static get styles(){return p`
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
    `}};a([h("ia-audio-element")],t.prototype,"audio",2);a([i()],t.prototype,"trackName",2);a([i()],t.prototype,"currentTime",2);a([i()],t.prototype,"duration",2);a([i()],t.prototype,"playing",2);a([i()],t.prototype,"playbackRate",2);a([i()],t.prototype,"volume",2);t=a([m("ia-audio-element-story")],t);export{t as IAAudioElementStory};
