import{w as m,n as s,t as g,i as v,b as d,a as f,r as w}from"./index-BSy7dZ9k.js";import{m as y}from"./runtime-CCgtQBty.js";const b={left:"left",right:"right",neither:"neither"},x=m`
<svg height="10" viewBox="0 0 8 10" width="8" xmlns="http://www.w3.org/2000/svg">
  <path
    d="m4 1 5 8h-10z"
    fill="currentColor"
    fill-rule="evenodd"
    transform="matrix(0 1 -1 0 9 1)"
  />
</svg>
`,$=m`
<svg height="10" viewBox="0 0 8 10" width="8" xmlns="http://www.w3.org/2000/svg">
  <path
    d="m4 1 5 8h-10z"
    fill="currentColor"
    fill-rule="evenodd"
    transform="matrix(0 -1 1 0 -1 9)"
  />
</svg>
`;var S=Object.defineProperty,I=Object.getOwnPropertyDescriptor,k=(r,e,n,i)=>{for(var t=i>1?void 0:i?I(e,n):e,c=r.length-1,h;c>=0;c--)(h=r[c])&&(t=(i?h(e,n,t):h(t))||t);return i&&t&&S(e,n,t),t};let l=class extends v{constructor(){super(...arguments),this.markerMode=b.neither}render(){return d`
      <div class="container mode-${this.markerMode}">
        <div class="left-arrow arrow">${x}</div>
        <div class="center-divider"></div>
        <div class="right-arrow arrow">${$}</div>
      </div>
    `}static get styles(){return f`
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
    `}};k([s({type:String})],l.prototype,"markerMode",2);l=k([g("ia-section-marker")],l);var M=Object.defineProperty,E=Object.getOwnPropertyDescriptor,o=(r,e,n,i)=>{for(var t=i>1?void 0:i?E(e,n):e,c=r.length-1,h;c>=0;c--)(h=r[c])&&(t=(i?h(e,n,t):h(t))||t);return i&&t&&M(e,n,t),t};const u={ValueChange:"valuechange",UserInteractionStarted:"userInteractionStarted",UserInteractionEnded:"userInteractionEnded"},p=new Set(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","PageUp","PageDown"]);let a=class extends v{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.step=.1,this.sectionMarkerPercentages=[],this.expandSectionMarkers=!1,this.label=y("Playback position"),this.currentValue=0,this.userIsInteracting=!1}get percentage(){const r=this.max-this.min;return r===0?0:(this.currentValue-this.min)/r*100}render(){const r=this.surroundingMarkers;return d`
      <div class="container" style="--fill-percent--: ${this.percentage}%">
        <div class="color-fill"></div>

        <div class="marker-container">
          ${this.sectionMarkerPercentages.map(e=>d`
              <ia-section-marker
                data-location=${e}
                style="left: ${e}%"
                .markerMode=${this.markerModeFor(e,r)}
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
    `}updated(r){this.userIsInteracting||!r.has("value")||(this.currentValue=this.value)}get surroundingMarkers(){if(!this.expandSectionMarkers)return{};const r=this.sortedMarkers;return{lower:r.filter(e=>e<=this.currentValue).pop(),upper:r.find(e=>e>this.currentValue)}}get sortedMarkers(){return[...this.sectionMarkerPercentages].sort((r,e)=>r-e)}markerModeFor(r,e){return r===e.upper?b.left:r===e.lower?b.right:b.neither}handleSlide(r){this.currentValue=parseFloat(r.target.value),this.dispatchEvent(new CustomEvent(u.ValueChange,{detail:{value:this.currentValue}}))}interactionStarted(){this.userIsInteracting=!0,this.dispatchEvent(new Event(u.UserInteractionStarted))}handleKeyDown(r){!p.has(r.key)||this.userIsInteracting||this.interactionStarted()}handleKeyUp(r){p.has(r.key)&&this.interactionEnded()}handleBlur(){this.userIsInteracting&&this.interactionEnded()}interactionEnded(){this.userIsInteracting=!1,this.dispatchEvent(new Event(u.UserInteractionEnded))}static get styles(){return f`
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
    `}};o([s({type:Number})],a.prototype,"value",2);o([s({type:Number})],a.prototype,"min",2);o([s({type:Number})],a.prototype,"max",2);o([s({type:Number})],a.prototype,"step",2);o([s({type:Array})],a.prototype,"sectionMarkerPercentages",2);o([s({type:Boolean})],a.prototype,"expandSectionMarkers",2);o([s({type:String})],a.prototype,"label",2);o([w()],a.prototype,"currentValue",2);a=o([g("ia-scrubber-bar")],a);
