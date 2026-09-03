import{w,n as h,t as v,i as f,b as p,a as k,r as l}from"./index-Dnt48UXz.js";import{m as $}from"./runtime-CCgtQBty.js";import"./story-template-DmDNqT2-.js";const d={left:"left",right:"right",neither:"neither"},S=w`
<svg height="10" viewBox="0 0 8 10" width="8" xmlns="http://www.w3.org/2000/svg">
  <path
    d="m4 1 5 8h-10z"
    fill="currentColor"
    fill-rule="evenodd"
    transform="matrix(0 1 -1 0 9 1)"
  />
</svg>
`,I=w`
<svg height="10" viewBox="0 0 8 10" width="8" xmlns="http://www.w3.org/2000/svg">
  <path
    d="m4 1 5 8h-10z"
    fill="currentColor"
    fill-rule="evenodd"
    transform="matrix(0 -1 1 0 -1 9)"
  />
</svg>
`;var M=Object.defineProperty,E=Object.getOwnPropertyDescriptor,x=(e,r,i,a)=>{for(var t=a>1?void 0:a?E(r,i):r,s=e.length-1,o;s>=0;s--)(o=e[s])&&(t=(a?o(r,i,t):o(t))||t);return a&&t&&M(r,i,t),t};let g=class extends f{constructor(){super(...arguments),this.markerMode=d.neither}render(){return p`
      <div class="container mode-${this.markerMode}">
        <div class="left-arrow arrow">${S}</div>
        <div class="center-divider"></div>
        <div class="right-arrow arrow">${I}</div>
      </div>
    `}static get styles(){return k`
      :host {
        --section-marker-color--: var(--ia-theme-scrubber-marker-color, #fff);
        --section-marker-height-collapsed--: var(
          --ia-theme-scrubber-marker-height-collapsed,
          10px
        );
        --section-marker-height-expanded--: var(
          --ia-theme-scrubber-marker-height-expanded,
          25px
        );
        --section-marker-animation-speed--: 0.1s;

        color: var(--section-marker-color--);
      }

      .container {
        display: flex;
        justify-content: center;
        height: 100%;
      }

      .arrow {
        padding-top: 10px;
        opacity: 1;
        /*
          The arrows are hidden in every mode. The mode rules below vary only
          opacity, which cannot reveal a hidden element, so nothing here brings
          them back. Reveal them by dropping this line, not by touching the
          mode rules.
        */
        visibility: hidden;
        transition:
          opacity var(--section-marker-animation-speed--) ease-out,
          padding-top var(--section-marker-animation-speed--) ease-out;
      }

      .container.mode-left .right-arrow {
        opacity: 0;
      }

      .container.mode-right .left-arrow {
        opacity: 0;
      }

      .container.mode-neither .left-arrow,
      .container.mode-neither .right-arrow {
        opacity: 0;
        padding-top: 75%;
      }

      .container.mode-neither .center-divider {
        height: var(--section-marker-height-collapsed--);
      }

      .center-divider {
        border-left: 1px solid currentColor;
        width: 1px;
        left: 50%;
        height: var(--section-marker-height-expanded--);
        align-self: flex-end;
        transition: height var(--section-marker-animation-speed--) ease-out;
      }
    `}};x([h({type:String})],g.prototype,"markerMode",2);g=x([v("ia-section-marker")],g);var T=Object.defineProperty,V=Object.getOwnPropertyDescriptor,c=(e,r,i,a)=>{for(var t=a>1?void 0:a?V(r,i):r,s=e.length-1,o;s>=0;s--)(o=e[s])&&(t=(a?o(r,i,t):o(t))||t);return a&&t&&T(r,i,t),t};const m={ValueChange:"valuechange",UserInteractionStarted:"userInteractionStarted",UserInteractionEnded:"userInteractionEnded"},y=new Set(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","PageUp","PageDown"]);let n=class extends f{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.step=.1,this.sectionMarkerPercentages=[],this.expandSectionMarkers=!1,this.label=$("Playback position"),this.currentValue=0,this.userIsInteracting=!1}get percentage(){const e=this.max-this.min;return e===0?0:(this.currentValue-this.min)/e*100}render(){const e=this.surroundingMarkers;return p`
      <div class="container" style="--fill-percent--: ${this.percentage}%">
        <div class="color-fill"></div>

        <div class="marker-container">
          ${this.sectionMarkerPercentages.map(r=>p`
              <ia-section-marker
                data-location=${r}
                style="left: ${r}%"
                .markerMode=${this.markerModeFor(r,e)}
              ></ia-section-marker>
            `)}
        </div>

        <input
          id="slider"
          type="range"
          aria-label=${this.label}
          min=${this.min}
          max=${this.max}
          step=${this.step}
          .value=${String(this.currentValue)}
          @mousedown=${this.interactionStarted}
          @mouseup=${this.interactionEnded}
          @touchstart=${this.interactionStarted}
          @touchend=${this.interactionEnded}
          @touchcancel=${this.interactionEnded}
          @keydown=${this.handleKeyDown}
          @keyup=${this.handleKeyUp}
          @blur=${this.handleBlur}
          @input=${this.handleSlide}
          @change=${this.handleSlide}
        />
      </div>
    `}updated(e){this.userIsInteracting||!e.has("value")||(this.currentValue=this.value)}get surroundingMarkers(){if(!this.expandSectionMarkers)return{};const e=this.sortedMarkers;return{lower:e.filter(r=>r<=this.currentValue).pop(),upper:e.find(r=>r>this.currentValue)}}get sortedMarkers(){return[...this.sectionMarkerPercentages].sort((e,r)=>e-r)}markerModeFor(e,r){return e===r.upper?d.left:e===r.lower?d.right:d.neither}handleSlide(e){this.currentValue=parseFloat(e.target.value),this.dispatchEvent(new CustomEvent(m.ValueChange,{detail:{value:this.currentValue}}))}interactionStarted(){this.userIsInteracting=!0,this.dispatchEvent(new Event(m.UserInteractionStarted))}handleKeyDown(e){!y.has(e.key)||this.userIsInteracting||this.interactionStarted()}handleKeyUp(e){y.has(e.key)&&this.interactionEnded()}handleBlur(){this.userIsInteracting&&this.interactionEnded()}interactionEnded(){this.userIsInteracting=!1,this.dispatchEvent(new Event(m.UserInteractionEnded))}static get styles(){return k`
      :host {
        --scrubber-bar-height--: var(--ia-theme-scrubber-bar-height, 20px);
        --scrubber-marker-inset--: var(--ia-theme-scrubber-marker-inset, 10px);

        --scrubber-thumb-color--: var(--ia-theme-scrubber-thumb-color, #fff);
        --scrubber-thumb-diameter--: var(
          --ia-theme-scrubber-thumb-diameter,
          20px
        );
        --scrubber-thumb-border--: var(
          --ia-theme-scrubber-thumb-border,
          1px solid #000
        );
        --scrubber-thumb-border-radius--: var(
          --ia-theme-scrubber-thumb-border-radius,
          50%
        );
        /*
          Centres the thumb on the track. The thumb is content-box, so its
          border adds 1px above and below the diameter, hence the extra -1px.
          Comes out at -6px for the default track and thumb sizes.
        */
        --scrubber-thumb-top-margin--: var(
          --ia-theme-scrubber-thumb-top-margin,
          calc(
            (
                var(--scrubber-track-height--) - var(
                    --scrubber-thumb-diameter--
                  )
              ) /
              2 - 1px
          )
        );

        --scrubber-track-height--: var(--ia-theme-scrubber-track-height, 10px);
        --scrubber-track-border--: var(
          --ia-theme-scrubber-track-border,
          1px solid #fff
        );
        --scrubber-track-border-radius--: var(
          --ia-theme-scrubber-track-border-radius,
          5px
        );
        --scrubber-track-color--: var(
          --ia-theme-scrubber-track-color,
          rgba(0, 0, 0, 0.1)
        );
        --scrubber-track-fill-color--: var(
          --ia-theme-scrubber-track-fill-color,
          #3272b6
        );

        /*
          How far off the bottom the track sits. The fill and the section
          markers both line up against this, so they follow the track when its
          height is themed. Comes out at 7px for the default sizes.
        */
        --scrubber-track-offset--: calc(
          (var(--scrubber-bar-height--) - var(--scrubber-track-height--)) / 2 +
            2px
        );
      }

      .container {
        position: relative;
        height: var(--scrubber-bar-height--);
      }

      /*
        The fill is a plain element rather than a track pseudo-element, so the
        played portion is just a hard gradient stop driven by a custom property.
      */
      .color-fill {
        height: var(--scrubber-track-height--);
        border-radius: 1em;
        position: absolute;
        bottom: var(--scrubber-track-offset--);
        left: 2px;
        right: -2px;
        background: linear-gradient(
          to right,
          var(--scrubber-track-fill-color--) 0%,
          var(--scrubber-track-fill-color--) var(--fill-percent--),
          var(--scrubber-track-color--) var(--fill-percent--),
          var(--scrubber-track-color--) 100%
        );
      }

      .marker-container {
        position: absolute;
        left: var(--scrubber-marker-inset--);
        right: var(--scrubber-marker-inset--);
        height: 100%;
      }

      ia-section-marker {
        position: absolute;
        width: 2rem;
        height: var(--scrubber-track-height--);
        bottom: var(--scrubber-track-offset--);
        /*
          The left offset puts the marker where it belongs, but the divider runs
          down the middle of the marker, so it shifts back by half its own width
          to line the divider up with that point.
        */
        transform: translateX(-50%);
      }

      input[type='range'] {
        -webkit-appearance: none;
        appearance: none;
        height: var(--scrubber-bar-height--);
        padding: 0;
        width: 100%;
        background: none;
        outline: none;
        position: absolute;
        bottom: 0;
      }

      input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        box-sizing: content-box;
        margin-top: var(--scrubber-thumb-top-margin--);
        background-color: var(--scrubber-thumb-color--);
        height: var(--scrubber-thumb-diameter--);
        width: var(--scrubber-thumb-diameter--);
        border-radius: var(--scrubber-thumb-border-radius--);
        border: var(--scrubber-thumb-border--);
        cursor: pointer;
      }

      input[type='range']::-moz-range-thumb {
        background-color: var(--scrubber-thumb-color--);
        height: var(--scrubber-thumb-diameter--);
        width: var(--scrubber-thumb-diameter--);
        border-radius: var(--scrubber-thumb-border-radius--);
        border: var(--scrubber-thumb-border--);
        cursor: pointer;
      }

      input[type='range']::-webkit-slider-runnable-track {
        border: var(--scrubber-track-border--);
        height: var(--scrubber-track-height--);
        border-radius: var(--scrubber-track-border-radius--);
      }

      input[type='range']::-moz-range-track {
        border: var(--scrubber-track-border--);
        height: var(--scrubber-track-height--);
        border-radius: var(--scrubber-track-border-radius--);
      }

      input[type='range']::-moz-range-progress {
        height: var(--scrubber-track-height--);
        border-radius: var(--scrubber-track-border-radius--);
      }
    `}};c([h({type:Number})],n.prototype,"value",2);c([h({type:Number})],n.prototype,"min",2);c([h({type:Number})],n.prototype,"max",2);c([h({type:Number})],n.prototype,"step",2);c([h({type:Array})],n.prototype,"sectionMarkerPercentages",2);c([h({type:Boolean})],n.prototype,"expandSectionMarkers",2);c([h({type:String})],n.prototype,"label",2);c([l()],n.prototype,"currentValue",2);n=c([v("ia-scrubber-bar")],n);var P=Object.defineProperty,_=Object.getOwnPropertyDescriptor,b=(e,r,i,a)=>{for(var t=a>1?void 0:a?_(r,i):r,s=e.length-1,o;s>=0;s--)(o=e[s])&&(t=(a?o(r,i,t):o(t))||t);return a&&t&&P(r,i,t),t};const C=[8,22,37,55,78,91],O=[{label:"Played colour",cssVariable:"--ia-theme-scrubber-track-fill-color",defaultValue:"#3272b6",inputType:"color"},{label:"Thumb colour",cssVariable:"--ia-theme-scrubber-thumb-color",defaultValue:"#ffffff",inputType:"color"},{label:"Marker colour",cssVariable:"--ia-theme-scrubber-marker-color",defaultValue:"#ffffff",inputType:"color"},{label:"Thumb size",cssVariable:"--ia-theme-scrubber-thumb-diameter",defaultValue:20,inputType:"range",min:8,max:40,step:1,unit:"px"},{label:"Track height",cssVariable:"--ia-theme-scrubber-track-height",defaultValue:10,inputType:"range",min:2,max:20,step:1,unit:"px"}],D=[{label:"Expand section markers",propertyName:"expandSectionMarkers",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]}];let u=class extends f{constructor(){super(...arguments),this.value=30,this.showMarkers=!0,this.interacting=!1,this.simulating=!1}disconnectedCallback(){super.disconnectedCallback(),this.stopSimulation()}render(){return p`
      <story-template
        elementTag="ia-scrubber-bar"
        elementClassName="IAScrubberBar"
        .styleInputData=${{settings:O}}
        .propInputData=${{settings:D}}
        .defaultUsageProps=${".value=${30}\n  .sectionMarkerPercentages=${[8, 22, 37]}"}
      >
        <ia-scrubber-bar
          slot="demo"
          class="scrubber"
          expandSectionMarkers
          .value=${this.value}
          .sectionMarkerPercentages=${this.showMarkers?C:[]}
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
    `}toggleSimulation(){if(this.simulating){this.stopSimulation();return}this.simulating=!0,this.simulationTimer=setInterval(()=>{this.value=(this.value+1)%100},100)}stopSimulation(){clearInterval(this.simulationTimer),this.simulationTimer=void 0,this.simulating=!1}static get styles(){return k`
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
    `}};b([l()],u.prototype,"value",2);b([l()],u.prototype,"showMarkers",2);b([l()],u.prototype,"interacting",2);b([l()],u.prototype,"lastEmitted",2);b([l()],u.prototype,"simulating",2);u=b([v("ia-scrubber-bar-story")],u);export{u as IAScrubberBarStory};
