import{i as c,b as d,a as p,r as i,t as h}from"./index-Dn3nSsUP.js";import"./ia-scrubber-bar-QTBK6Xvv.js";import"./story-template-BHtDfdDo.js";import"./runtime-CCgtQBty.js";var m=Object.defineProperty,b=Object.getOwnPropertyDescriptor,r=(e,s,l,o)=>{for(var t=o>1?void 0:o?b(s,l):s,n=e.length-1,u;n>=0;n--)(u=e[n])&&(t=(o?u(s,l,t):u(t))||t);return o&&t&&m(s,l,t),t};const g=[8,22,37,55,78,91],f=[{label:"Played colour",cssVariable:"--ia-theme-scrubber-track-fill-color",defaultValue:"#3272b6",inputType:"color"},{label:"Thumb colour",cssVariable:"--ia-theme-scrubber-thumb-color",defaultValue:"#ffffff",inputType:"color"},{label:"Marker colour",cssVariable:"--ia-theme-scrubber-marker-color",defaultValue:"#ffffff",inputType:"color"},{label:"Thumb size",cssVariable:"--ia-theme-scrubber-thumb-diameter",defaultValue:20,inputType:"range",min:8,max:40,step:1,unit:"px"},{label:"Track height",cssVariable:"--ia-theme-scrubber-track-height",defaultValue:10,inputType:"range",min:2,max:20,step:1,unit:"px"}],v=[{label:"Expand section markers",propertyName:"expandSectionMarkers",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let a=class extends c{constructor(){super(...arguments),this.value=30,this.showMarkers=!0,this.interacting=!1,this.simulating=!1}disconnectedCallback(){super.disconnectedCallback(),this.stopSimulation()}render(){return d`
      <story-template
        elementTag="ia-scrubber-bar"
        elementClassName="IAScrubberBar"
        .styleInputData=${{settings:f}}
        .propInputData=${{settings:v}}
        .defaultUsageProps=${".value=${30}\n  .sectionMarkerPercentages=${[8, 22, 37]}"}
      >
        <ia-scrubber-bar
          slot="demo"
          class="scrubber"
          expandSectionMarkers
          .value=${this.value}
          .sectionMarkerPercentages=${this.showMarkers?g:[]}
          @valuechange=${e=>{this.lastEmitted=e.detail.value,this.value=e.detail.value}}
          @userInteractionStarted=${()=>{this.interacting=!0}}
          @userInteractionEnded=${()=>{this.interacting=!1}}
        ></ia-scrubber-bar>

        <div slot="demo" class="panel">
          <div class="row">
            <label for="markers">Section markers</label>
            <input
              id="markers"
              type="checkbox"
              .checked=${this.showMarkers}
              @change=${e=>{this.showMarkers=e.target.checked}}
            />
          </div>

          <div class="row">
            <button @click=${this.toggleSimulation}>
              ${this.simulating?"Stop":"Simulate playback from outside"}
            </button>
            <span class="hint">
              Drag the scrubber while this runs to see it hold your position.
            </span>
          </div>

          <p class="readout">
            <code>value</code> ${this.value.toFixed(1)} &middot;
            <code>valuechange</code>
            ${this.lastEmitted===void 0?"none yet":this.lastEmitted.toFixed(1)}
            &middot; ${this.interacting?"interacting":"idle"}
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            A range input styled as a playback scrubber. The section markers are
            laid over the track at the percentages you give it, and with
            <code>expandSectionMarkers</code> the two either side of the
            playhead point towards it.
          </p>
          <p>
            While the listener is scrubbing, <code>value</code> coming in from
            outside is ignored, so playback updates can't drag the thumb out
            from under them. Press the button above and start dragging to see
            it. The element picks the external value back up on release, and
            brackets the whole thing with
            <code>userInteractionStarted</code> and
            <code>userInteractionEnded</code> so the player knows to stop
            seeking meanwhile.
          </p>
          <p>
            The defaults are built for the radio player's dark chrome, which is
            why the demo sits on a dark panel.
          </p>
        </div>
      </story-template>
    `}toggleSimulation(){if(this.simulating){this.stopSimulation();return}this.simulating=!0,this.simulationTimer=setInterval(()=>{this.value=(this.value+1)%100},100)}stopSimulation(){clearInterval(this.simulationTimer),this.simulationTimer=void 0,this.simulating=!1}static get styles(){return p`
      .scrubber {
        display: block;
        background-color: #151515;
        padding: 1.5rem 1rem;
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
        min-width: 10em;
      }

      .hint {
        font-size: 0.85em;
        font-style: italic;
      }

      .readout {
        font-size: 0.9em;
      }
    `}};r([i()],a.prototype,"value",2);r([i()],a.prototype,"showMarkers",2);r([i()],a.prototype,"interacting",2);r([i()],a.prototype,"lastEmitted",2);r([i()],a.prototype,"simulating",2);a=r([h("ia-scrubber-bar-story")],a);export{a as IAScrubberBarStory};
