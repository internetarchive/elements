import{r as d,n as c,e as p,c as v,i as u,A as f,b as n,a as m}from"./index-CRHnLasI.js";import{a as g}from"./theme-styles-Oo0_WlBP.js";var w=Object.defineProperty,y=Object.getOwnPropertyDescriptor,o=(e,i,a,s)=>{for(var t=s>1?void 0:s?y(i,a):i,l=e.length-1,h;l>=0;l--)(h=e[l])&&(t=(s?h(i,a,t):h(t))||t);return s&&t&&w(i,a,t),t};const b={ValueChange:"valuechange"};let r=class extends u{constructor(){super(...arguments),this.percentComplete=0,this.waveformUrl="",this.interactive=!1,this.zonesOfSilence=[],this.displayedPercent=0,this.userIsInteracting=!1}render(){return n`
      <div class="container">
        <div id="fill" style="width: ${this.displayedPercent}%"></div>
        <img class="waveform-image" src=${this.waveformUrl} alt="" />
        ${this.zonesOfSilenceTemplate}
        ${this.interactive?this.interactionCoverTemplate:f}
      </div>
    `}get zonesOfSilenceTemplate(){return n`
      ${this.zonesOfSilence.map(e=>n`
          <div
            class="zone-of-silence"
            style="left: ${e.startPercent}%; width: ${e.endPercent-e.startPercent}%"
          ></div>
        `)}
    `}get interactionCoverTemplate(){return n`
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
    `}updated(e){!e.has("percentComplete")||this.userIsInteracting||(this.displayedPercent=this.percentComplete)}drag(e){this.userIsInteracting&&this.updateDisplayedPercent(e)}dragStart(e){"button"in e&&e.button!==0||(this.userIsInteracting=!0,this.updateDisplayedPercent(e))}dragEnd(){this.userIsInteracting=!1}updateDisplayedPercent(e){const i=r.pageXFrom(e);if(i===void 0||!this.container)return;const a=this.container.getBoundingClientRect();if(a.width===0)return;const t=(i-(a.left+window.scrollX))/a.width*100;this.displayedPercent=Math.min(Math.max(t,0),100),this.dispatchEvent(new CustomEvent(b.ValueChange,{detail:{value:this.displayedPercent}}))}static pageXFrom(e){return"touches"in e?e.touches[0]?.pageX:e.pageX}static get styles(){return[g,m`
        :host {
          --waveform-fill-color--: var(
            --ia-theme-waveform-fill-color,
            var(--ia-color-text-inverse-link--)
          );
          --waveform-zone-of-silence-color--: var(
            --ia-theme-waveform-zone-of-silence-color,
            var(--ia-color-action-warning-fill--)
          );
          /* Matches the scrubber's marker inset (half its 20px thumb) when
             stacked over it in the radio player, so it stays in px. */
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
          background-color: var(--ia-color-surface-raised--);
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
            var(--ia-color-surface-theater--),
            var(--ia-color-surface-theater--) 47%,
            var(--waveform-zone-of-silence-color--) 50%,
            var(--ia-color-surface-theater--) 53%,
            var(--ia-color-surface-theater--) 100%
          );
        }

        #fill {
          position: absolute;
          height: 100%;
          background-color: var(--waveform-fill-color--);
        }
      `]}};o([c({type:Number})],r.prototype,"percentComplete",2);o([c({type:String})],r.prototype,"waveformUrl",2);o([c({type:Boolean})],r.prototype,"interactive",2);o([c({type:Array})],r.prototype,"zonesOfSilence",2);o([d()],r.prototype,"displayedPercent",2);o([p(".container")],r.prototype,"container",2);r=o([v("ia-waveform-progress")],r);
