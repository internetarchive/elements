import{i as c,b as r,a as d,r as u,t as m}from"./index-oDBj0m0q.js";import"./ia-playback-controls-B86QqtaR.js";import"./story-template-4ORzXmPL.js";import"./runtime-CCgtQBty.js";var b=Object.defineProperty,y=Object.getOwnPropertyDescriptor,p=(e,t,a,s)=>{for(var o=s>1?void 0:s?y(t,a):t,l=e.length-1,n;l>=0;l--)(n=e[l])&&(o=(s?n(t,a,o):n(o))||o);return s&&o&&b(t,a,o),o};const h=[{label:"Icon colour",cssVariable:"--ia-theme-playback-controls-icon-color",defaultValue:"#ffffff",inputType:"color"},{label:"Play button colour",cssVariable:"--ia-theme-playback-controls-play-button-color",defaultValue:"#ffffff",inputType:"color"},{label:"Play icon colour",cssVariable:"--ia-theme-playback-controls-play-icon-color",defaultValue:"#333333",inputType:"color"},{label:"Play button size",cssVariable:"--ia-theme-playback-controls-play-button-diameter",defaultValue:4,inputType:"range",min:2,max:8,step:.5,unit:"rem"}],f=[{label:"Playback mode",propertyName:"playbackMode",defaultValue:"paused",inputType:"radio",radioOptions:["paused","playing"]}],g=8;let i=class extends c{constructor(){super(...arguments),this.log=[]}render(){return r`
      <story-template
        elementTag="ia-playback-controls"
        elementClassName="IAPlaybackControls"
        .styleInputData=${{settings:h}}
        .propInputData=${{settings:f}}
      >
        <ia-playback-controls
          slot="demo"
          class="controls"
          @play-pause-button-pressed=${this.record}
          @back-button-pressed=${this.record}
          @forward-button-pressed=${this.record}
          @prev-section-button-pressed=${this.record}
          @next-section-button-pressed=${this.record}
          @playbackRateChange=${this.record}
          @volumeChange=${this.record}
        ></ia-playback-controls>

        <div slot="demo" class="panel">
          <div class="log-header">
            <strong>Events</strong>
            <button @click=${()=>this.log=[]}>Clear</button>
          </div>
          ${this.log.length===0?r`<p class="empty">Press a control to see what it emits.</p>`:r`<ol class="log">
                ${this.log.map(e=>r`<li><code>${e}</code></li>`)}
              </ol>`}
        </div>

        <div slot="usage-notes">
          <p>
            The transport controls for a player. The element doesn't play
            anything itself, it just reports presses and lets whatever owns the
            audio decide what to do.
          </p>
          <p>
            The speed and volume buttons cycle rather than opening a slider.
            Speed steps by 0.25 and wraps from 2&times; back to 0.5&times;;
            volume steps by 0.25 and wraps from full back to muted. Both keep
            their own state and report the new value on the event.
          </p>
          <p>
            The icons inherit <code>currentColor</code>, so the two colour
            variables above are all it takes to sit the controls on a light or a
            dark background. The demo above is on a dark panel because the
            defaults are meant for the radio player's dark chrome.
          </p>
        </div>
      </story-template>
    `}record(e){const t=e.detail,a=t?` ${JSON.stringify(t)}`:"";this.log=[`${e.type}${a}`,...this.log].slice(0,g)}static get styles(){return d`
      .controls {
        background-color: #151515;
        padding: 1rem 0.5rem;
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
      }

      .empty {
        font-size: 0.9em;
        font-style: italic;
      }
    `}};p([u()],i.prototype,"log",2);i=p([m("ia-playback-controls-story")],i);export{i as IAPlaybackControlsStory};
