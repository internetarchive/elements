import{n as s,t as p,i as c,b as d}from"./index-oDBj0m0q.js";import{e as m}from"./query-BVqEoZUt.js";var E=Object.defineProperty,y=Object.getOwnPropertyDescriptor,n=(e,t,l,o)=>{for(var a=o>1?void 0:o?y(t,l):t,u=e.length-1,h;u>=0;u--)(h=e[u])&&(a=(o?h(t,l,a):h(a))||a);return o&&a&&E(t,l,a),a};const i={TimeUpdate:"timeupdate",DurationChange:"durationchange",PlaybackStarted:"playbackStarted",PlaybackPaused:"playbackPaused",CanPlay:"canplay",Error:"error"};let r=class extends c{constructor(){super(...arguments),this.showControls=!1,this.playbackRate=1,this.volume=1,this.sources=[]}get duration(){return this.audioElement?.duration??0}get currentTime(){return this.audioElement?.currentTime??0}load(){this.audioElement&&(this.audioElement.load(),this.audioElement.playbackRate=this.playbackRate)}play(){this.audioElement?.play().catch(()=>{})}pause(){this.audioElement?.pause()}seekTo(e){this.audioElement&&(this.audioElement.currentTime=e)}seekBy(e){this.audioElement&&(this.audioElement.currentTime+=e)}render(){return d`
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
        ${this.sources.map(e=>d`<source
              src=${e.url}
              type=${e.mimetype}
              @error=${this.handleSourceError}
            />`)}
      </audio>
    `}handleDurationChange(e){const t=e.target;this.dispatchEvent(new CustomEvent(i.DurationChange,{detail:{duration:t.duration}}))}handleTimeChange(e){const t=e.target;this.dispatchEvent(new CustomEvent(i.TimeUpdate,{detail:{currentTime:t.currentTime}}))}playbackStarted(){this.dispatchEvent(new Event(i.PlaybackStarted))}playbackPaused(){this.dispatchEvent(new Event(i.PlaybackPaused))}canPlay(){this.dispatchEvent(new Event(i.CanPlay))}handleMediaError(e){this.emitError(e.target.error)}handleSourceError(){this.audioElement?.networkState===HTMLMediaElement.NETWORK_NO_SOURCE&&this.emitError(null)}emitError(e){this.dispatchEvent(new CustomEvent(i.Error,{detail:{error:e}}))}};n([s({type:Boolean})],r.prototype,"showControls",2);n([s({type:Number})],r.prototype,"playbackRate",2);n([s({type:Number})],r.prototype,"volume",2);n([s({type:Array})],r.prototype,"sources",2);n([m("audio")],r.prototype,"audioElement",2);r=n([p("ia-audio-element")],r);
