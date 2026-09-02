import{r as d,n as h,t as u,i as g,A as w,b as c,a as v}from"./index-CzFvv98W.js";import{e as y}from"./query-Cjy71itZ.js";import"./story-template-Chg83JRx.js";var b=Object.defineProperty,$=Object.getOwnPropertyDescriptor,l=(e,r,o,a)=>{for(var t=a>1?void 0:a?$(r,o):r,i=e.length-1,s;i>=0;i--)(s=e[i])&&(t=(a?s(r,o,t):s(t))||t);return a&&t&&b(r,o,t),t};const P={ValueChange:"valuechange"};let n=class extends g{constructor(){super(...arguments),this.percentComplete=0,this.waveformUrl="",this.interactive=!1,this.zonesOfSilence=[],this.displayedPercent=0,this.userIsInteracting=!1}render(){return c`
      <div class="container">
        <div id="fill" style="width: ${this.displayedPercent}%"></div>
        <img class="waveform-image" src=${this.waveformUrl} alt="" />
        ${this.zonesOfSilenceTemplate}
        ${this.interactive?this.interactionCoverTemplate:w}
      </div>
    `}get zonesOfSilenceTemplate(){return c`
      ${this.zonesOfSilence.map(e=>c`
          <div
            class="zone-of-silence"
            style="left: ${e.startPercent}%; width: ${e.endPercent-e.startPercent}%"
          ></div>
        `)}
    `}get interactionCoverTemplate(){return c`
      <div
        id="dragcover"
        @mousedown=${this.dragStart}
        @mouseup=${this.dragEnd}
        @mouseleave=${this.dragEnd}
        @mousemove=${this.drag}
        @touchstart=${this.dragStart}
        @touchend=${this.dragEnd}
        @touchcancel=${this.dragEnd}
        @touchmove=${this.drag}
      ></div>
    `}updated(e){!e.has("percentComplete")||this.userIsInteracting||(this.displayedPercent=this.percentComplete)}drag(e){this.userIsInteracting&&this.updateDisplayedPercent(e)}dragStart(e){"button"in e&&e.button!==0||(this.userIsInteracting=!0,this.updateDisplayedPercent(e))}dragEnd(){this.userIsInteracting=!1}updateDisplayedPercent(e){const r=n.pageXFrom(e);if(r===void 0||!this.container)return;const o=this.container.getBoundingClientRect();if(o.width===0)return;const t=(r-(o.left+window.scrollX))/o.width*100;this.displayedPercent=Math.min(Math.max(t,0),100),this.dispatchEvent(new CustomEvent(P.ValueChange,{detail:{value:this.displayedPercent}}))}static pageXFrom(e){return"touches"in e?e.touches[0]?.pageX:e.pageX}static get styles(){return v`
      :host {
        --waveform-fill-color--: var(--ia-theme-waveform-fill-color, #3272b6);
        --waveform-zone-of-silence-color--: var(
          --ia-theme-waveform-zone-of-silence-color,
          #f6e652
        );
        --waveform-side-margin--: var(--ia-theme-waveform-side-margin, 10px);

        display: inline-block;
      }

      #dragcover {
        width: 100%;
        height: 100%;
        position: absolute;
        touch-action: none;
      }

      .container {
        display: block;
        position: relative;
        background-color: white;
        height: 100%;
        margin-left: var(--waveform-side-margin--);
        margin-right: var(--waveform-side-margin--);
      }

      .waveform-image {
        width: 100%;
        height: 100%;
        position: absolute;
      }

      .zone-of-silence {
        position: absolute;
        top: 0;
        bottom: 0;
        background: linear-gradient(
          #000,
          #000 47%,
          var(--waveform-zone-of-silence-color--) 50%,
          #000 53%,
          #000 100%
        );
      }

      #fill {
        position: absolute;
        height: 100%;
        background-color: var(--waveform-fill-color--);
      }
    `}};l([h({type:Number})],n.prototype,"percentComplete",2);l([h({type:String})],n.prototype,"waveformUrl",2);l([h({type:Boolean})],n.prototype,"interactive",2);l([h({type:Array})],n.prototype,"zonesOfSilence",2);l([d()],n.prototype,"displayedPercent",2);l([y(".container")],n.prototype,"container",2);n=l([u("ia-waveform-progress")],n);var C=Object.defineProperty,x=Object.getOwnPropertyDescriptor,m=(e,r,o,a)=>{for(var t=a>1?void 0:a?x(r,o):r,i=e.length-1,s;i>=0;i--)(s=e[i])&&(t=(a?s(r,o,t):s(t))||t);return a&&t&&C(r,o,t),t};function I(e=200){const r=Array.from({length:e},(a,t)=>{const i=Math.sin(t/3)*.3+Math.sin(t/11)*.4+Math.sin(t/29)*.3,s=Math.max(.06,Math.abs(i))*100,f=(100-s)/2;return`<rect x="${t*2}" y="${f.toFixed(2)}" width="1" height="${s.toFixed(2)}" />`}).join(""),o=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${e*2} 100" preserveAspectRatio="none"><g fill="#151515">${r}</g></svg>`;return`data:image/svg+xml,${encodeURIComponent(o)}`}const O=I(),S=[{startPercent:12,endPercent:18},{startPercent:44,endPercent:47},{startPercent:71,endPercent:79}],E=[{label:"Progress fill colour",cssVariable:"--ia-theme-waveform-fill-color",defaultValue:"#3272b6",inputType:"color"},{label:"Zone of silence colour",cssVariable:"--ia-theme-waveform-zone-of-silence-color",defaultValue:"#f6e652",inputType:"color"},{label:"Side margin",cssVariable:"--ia-theme-waveform-side-margin",defaultValue:10,inputType:"range",min:0,max:40,step:1,unit:"px"}],_=[{label:"Interactive",propertyName:"interactive",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let p=class extends g{constructor(){super(...arguments),this.percentComplete=35,this.showZones=!0}render(){return c`
      <story-template
        elementTag="ia-waveform-progress"
        elementClassName="IAWaveformProgress"
        .styleInputData=${{settings:E}}
        .propInputData=${{settings:_}}
        .defaultUsageProps=${".percentComplete=${35}\n  .waveformUrl=${waveformUrl}"}
      >
        <ia-waveform-progress
          slot="demo"
          interactive
          style="width: 100%; height: 80px"
          .waveformUrl=${O}
          .percentComplete=${this.percentComplete}
          .zonesOfSilence=${this.showZones?S:[]}
          @valuechange=${e=>{this.lastEmitted=e.detail.value,this.percentComplete=e.detail.value}}
        ></ia-waveform-progress>

        <div slot="demo" class="panel">
          <div class="row">
            <label for="percent">Playback position</label>
            <input
              id="percent"
              type="range"
              min="0"
              max="100"
              step="0.5"
              .value=${String(this.percentComplete)}
              @input=${e=>{this.percentComplete=Number(e.target.value)}}
            />
            <span class="value">${this.percentComplete.toFixed(1)}%</span>
          </div>

          <div class="row">
            <label for="zones">Zones of silence</label>
            <input
              id="zones"
              type="checkbox"
              .checked=${this.showZones}
              @change=${e=>{this.showZones=e.target.checked}}
            />
          </div>

          <p class="readout">
            Last <code>valuechange</code>:
            ${this.lastEmitted===void 0?"none yet, drag across the waveform":`${this.lastEmitted.toFixed(1)}%`}
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            Draws a waveform image with a progress fill over it. The element has
            no intrinsic size, so give it a width and a height.
          </p>
          <p>
            With <code>interactive</code> set, dragging across the waveform
            scrubs and emits <code>valuechange</code> with the new percentage.
            While a drag is in progress the element ignores
            <code>percentComplete</code> coming in from outside, so playback
            updates can't yank the handle out from under the listener. It picks
            the external value back up on release.
          </p>
          <p>
            <code>zonesOfSilence</code> marks stretches with no audio. Both
            bounds are percentages of the whole track, not seconds.
          </p>
        </div>
      </story-template>
    `}static get styles(){return v`
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

      .row input[type='range'] {
        flex: 1 1 auto;
        max-width: 20em;
      }

      .value {
        min-width: 4em;
      }

      .readout {
        font-size: 0.9em;
      }
    `}};m([d()],p.prototype,"percentComplete",2);m([d()],p.prototype,"lastEmitted",2);m([d()],p.prototype,"showZones",2);p=m([u("ia-waveform-progress-story")],p);export{p as IAWaveformProgressStory};
