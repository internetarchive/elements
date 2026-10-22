import{i as m,b as d,a as h,r as p,c as u}from"./index-BOhYS9Cm.js";import"./ia-waveform-progress-Bso-xATG.js";import"./story-template-BrU0175b.js";import"./site-BTJxegk4.js";/* empty css             */import"./syntax-highlighter-Cy1xU6n7.js";import"./theme-styles-BTCXFIQ9.js";var g=Object.defineProperty,v=Object.getOwnPropertyDescriptor,l=(e,o,s,a)=>{for(var t=a>1?void 0:a?v(o,s):o,n=e.length-1,r;n>=0;n--)(r=e[n])&&(t=(a?r(o,s,t):r(t))||t);return a&&t&&g(o,s,t),t};function f(e=200){const o=Array.from({length:e},(a,t)=>{const n=Math.sin(t/3)*.3+Math.sin(t/11)*.4+Math.sin(t/29)*.3,r=Math.max(.06,Math.abs(n))*100,c=(100-r)/2;return`<rect x="${t*2}" y="${c.toFixed(2)}" width="1" height="${r.toFixed(2)}" />`}).join(""),s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${e*2} 100" preserveAspectRatio="none"><g fill="#151515">${o}</g></svg>`;return`data:image/svg+xml,${encodeURIComponent(s)}`}const w=f(),b=[{startPercent:12,endPercent:18},{startPercent:44,endPercent:47},{startPercent:71,endPercent:79}],y=[{label:"Progress fill colour",cssVariable:"--ia-theme-waveform-fill-color",defaultValue:"#3272b6",inputType:"color"},{label:"Zone of silence colour",cssVariable:"--ia-theme-waveform-zone-of-silence-color",defaultValue:"#f6e652",inputType:"color"},{label:"Side margin",cssVariable:"--ia-theme-waveform-side-margin",defaultValue:10,inputType:"range",min:0,max:40,step:1,unit:"px"}],$=[{label:"Interactive",propertyName:"interactive",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]}];let i=class extends m{constructor(){super(...arguments),this.percentComplete=35,this.showZones=!0}render(){return d`
      <story-template
        elementTag="ia-waveform-progress"
        elementClassName="IAWaveformProgress"
        .styleInputData=${{settings:y}}
        .propInputData=${{settings:$}}
        .defaultUsageProps=${".percentComplete=${35}\n  .waveformUrl=${waveformUrl}"}
      >
        <ia-waveform-progress
          slot="demo"
          interactive
          style="width: 100%; height: 80px"
          .waveformUrl=${w}
          .percentComplete=${this.percentComplete}
          .zonesOfSilence=${this.showZones?b:[]}
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
    `}static get styles(){return h`
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
    `}};l([p()],i.prototype,"percentComplete",2);l([p()],i.prototype,"lastEmitted",2);l([p()],i.prototype,"showZones",2);i=l([u("ia-waveform-progress-story")],i);export{i as IAWaveformProgressStory};
