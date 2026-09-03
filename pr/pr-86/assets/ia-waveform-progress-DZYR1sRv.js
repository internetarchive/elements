import{r as h,n as c,t as p,i as f,A as m,b as s,a as u}from"./index-3p_iekfK.js";import{e as v}from"./query-x5bTgDQb.js";var g=Object.defineProperty,w=Object.getOwnPropertyDescriptor,a=(e,i,o,n)=>{for(var t=n>1?void 0:n?w(i,o):i,l=e.length-1,d;l>=0;l--)(d=e[l])&&(t=(n?d(i,o,t):d(t))||t);return n&&t&&g(i,o,t),t};const y={ValueChange:"valuechange"};let r=class extends f{constructor(){super(...arguments),this.percentComplete=0,this.waveformUrl="",this.interactive=!1,this.zonesOfSilence=[],this.displayedPercent=0,this.userIsInteracting=!1}render(){return s`
      <div class="container">
        <div id="fill" style="width: ${this.displayedPercent}%"></div>
        <img class="waveform-image" src=${this.waveformUrl} alt="" />
        ${this.zonesOfSilenceTemplate}
        ${this.interactive?this.interactionCoverTemplate:m}
      </div>
    `}get zonesOfSilenceTemplate(){return s`
      ${this.zonesOfSilence.map(e=>s`
          <div
            class="zone-of-silence"
            style="left: ${e.startPercent}%; width: ${e.endPercent-e.startPercent}%"
          ></div>
        `)}
    `}get interactionCoverTemplate(){return s`
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
    `}updated(e){!e.has("percentComplete")||this.userIsInteracting||(this.displayedPercent=this.percentComplete)}drag(e){this.userIsInteracting&&this.updateDisplayedPercent(e)}dragStart(e){"button"in e&&e.button!==0||(this.userIsInteracting=!0,this.updateDisplayedPercent(e))}dragEnd(){this.userIsInteracting=!1}updateDisplayedPercent(e){const i=r.pageXFrom(e);if(i===void 0||!this.container)return;const o=this.container.getBoundingClientRect();if(o.width===0)return;const t=(i-(o.left+window.scrollX))/o.width*100;this.displayedPercent=Math.min(Math.max(t,0),100),this.dispatchEvent(new CustomEvent(y.ValueChange,{detail:{value:this.displayedPercent}}))}static pageXFrom(e){return"touches"in e?e.touches[0]?.pageX:e.pageX}static get styles(){return u`
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
    `}};a([c({type:Number})],r.prototype,"percentComplete",2);a([c({type:String})],r.prototype,"waveformUrl",2);a([c({type:Boolean})],r.prototype,"interactive",2);a([c({type:Array})],r.prototype,"zonesOfSilence",2);a([h()],r.prototype,"displayedPercent",2);a([v(".container")],r.prototype,"container",2);r=a([p("ia-waveform-progress")],r);
