import{e as W,a as z,A as g,r as h,n as v,t as T,i as E,b as o,d as $}from"./index-DoufPq0Z.js";import{e as _}from"./query-CmDVJ6Tg.js";import{p as H,e as k}from"./directive-helpers-ehTjXqAI.js";import{m as b,s as G}from"./runtime-CCgtQBty.js";import{t as X}from"./story-template-B1l2UN2V.js";const Y=W(class extends z{constructor(){super(...arguments),this.key=g}render(e,t){return this.key=e,t}update(e,[t,i]){return t!==this.key&&(H(e),this.key=t),i}});function L(){return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1}const B=30,K=.25,U=.3,R=300,q=200,J=80,Q=300,Z=10;class ee{constructor(t){this.dragging=!1,this.listeningTo=null,this.touchStartX=null,this.touchStartY=null,this.touchStartTime=0,this.swiping=!1,this.swipeHandled=!1,this.dragOffsetX=0,this.wheelDeltaX=0,this.wheelAnimating=!1,this.wheelAnimationEndTime=0,this.onTouchStart=i=>{if(this.host.imageCount<=1)return;this.host.settleIfAnimating();const s=i.touches[0];this.touchStartX=s.clientX,this.touchStartY=s.clientY,this.touchStartTime=i.timeStamp,this.swiping=!1,this.dragOffsetX=0},this.onTouchMove=i=>{if(this.touchStartX===null||this.touchStartY===null)return;const s=i.touches[0].clientX-this.touchStartX,a=i.touches[0].clientY-this.touchStartY,n=Math.abs(s)>Math.abs(a)&&Math.abs(s)>Z;!this.swiping&&n&&(this.swiping=!0,this.dragging=!0,this.host.preloadAroundIndex(this.host.currentIndex),this.host.insertDragSlides()),this.swiping&&(i.preventDefault(),this.dragOffsetX=s,this.applyDragTransform())},this.onTouchEnd=i=>{if(this.touchStartX===null)return;const s=i.changedTouches[0].clientX-this.touchStartX,a=i.timeStamp-this.touchStartTime;if(this.touchStartX=null,this.touchStartY=null,!this.swiping)return;this.swiping=!1;const n=this.host.slideTrack,r=this.host.imageArea;if(!n||!r){this.dragging=!1;return}const m=r.offsetWidth,w=Math.abs(s)/Math.max(a,1),A=Math.abs(s)>m*K,C=w>U,u=(A||C)&&Math.abs(s)>=B,P=s<0?"next":"prev";this.swipeHandled=!0;const V=(m-Math.abs(s))/m,M=u?Math.round(Math.max(100,Math.min(R,V*R))):q,N=u?P==="next"?"translateX(-200%)":"translateX(0%)":"translateX(-100%)",F=()=>{n.style.transition="",n.style.transform="",u&&this.host.commitDrag(P),this.dragging=!1,this.dragOffsetX=0,this.host.removeDragSlides(),this.host.preloadAroundIndex(this.host.currentIndex),this.host.requestUpdate()};if(L()){n.style.transform=N,F();return}n.style.transition=`transform ${M}ms ease-out`,n.style.transform=N;let j=!1;const D=()=>{j||(j=!0,n.removeEventListener("transitionend",D),F())};n.addEventListener("transitionend",D),setTimeout(D,M+50)},this.onWheel=i=>{if(this.host.imageCount<=1||Math.abs(i.deltaY)>Math.abs(i.deltaX)||i.deltaX===0)return;i.preventDefault();const s=performance.now()-this.wheelAnimationEndTime<Q;if(this.wheelAnimating||s){this.wheelDeltaX=0;return}if(this.wheelDeltaX+=i.deltaX,Math.abs(this.wheelDeltaX)<J)return;const a=this.wheelDeltaX>0;this.wheelDeltaX=0,this.wheelAnimating=!0,a?this.host.showNext():this.host.showPrevious()},this.onKeydown=i=>{if(this.host.imageCount<=1)return;const s=i.target;s.tagName==="INPUT"||s.tagName==="TEXTAREA"||s.isContentEditable||(i.key==="ArrowLeft"?this.host.showPrevious():i.key==="ArrowRight"&&this.host.showNext())},this.host=t,t.addController(this)}hostConnected(){document.addEventListener("keydown",this.onKeydown),this.attachListeners()}hostUpdated(){this.attachListeners()}hostDisconnected(){document.removeEventListener("keydown",this.onKeydown),this.detachListeners()}consumeSwipeTap(){return this.swipeHandled?(this.swipeHandled=!1,!0):!1}animationSettled(){this.wheelAnimating=!1,this.wheelAnimationEndTime=performance.now(),this.wheelDeltaX=0}attachListeners(){const t=this.host.imageArea;t!==this.listeningTo&&(this.detachListeners(),t&&(this.listeningTo=t,t.addEventListener("touchstart",this.onTouchStart,{passive:!0}),t.addEventListener("touchmove",this.onTouchMove,{passive:!1}),t.addEventListener("touchend",this.onTouchEnd,{passive:!0}),t.addEventListener("wheel",this.onWheel,{passive:!1})))}detachListeners(){const t=this.listeningTo;t&&(t.removeEventListener("touchstart",this.onTouchStart),t.removeEventListener("touchmove",this.onTouchMove),t.removeEventListener("touchend",this.onTouchEnd),t.removeEventListener("wheel",this.onWheel),this.listeningTo=null)}applyDragTransform(){const t=this.host.slideTrack;!this.dragging||!t||(t.style.transform=`translateX(calc(-100% + ${this.dragOffsetX}px))`)}}var te=Object.defineProperty,ie=Object.getOwnPropertyDescriptor,f=(e,t,i,s)=>{for(var a=s>1?void 0:s?ie(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(a=(s?r(t,i,a):r(a))||a);return s&&a&&te(t,i,a),a};let c=class extends E{constructor(){super(...arguments),this.loaded=!1,this.failed=!1,this.markLoaded=()=>{this.loaded=!0,this.failed=!1,this.report("imageLoaded")},this.markFailed=()=>{this.loaded=!1,this.failed=!0,this.report("imageFailed")}}willUpdate(e){e.has("image")&&(this.loaded=!1,this.failed=!1)}updated(){this.checkAlreadyResolved()}render(){if(!this.image)return g;const e={"main-image":!0,loaded:this.loaded},t={"image-link":!0,failed:this.failed};return o`
      <a
        class=${k(t)}
        href=${this.image.url}
        target="_blank"
        rel="noopener noreferrer"
        @click=${this.onClick}
      >
        <img
          class=${k(e)}
          src=${this.image.url}
          alt=${this.image.title??this.image.name}
          data-image-name=${this.image.name}
          draggable="false"
          @load=${this.markLoaded}
          @error=${this.markFailed}
        />
        <div class="loading-spinner"></div>
        ${this.failed?o`<p class="image-failed">
              ${b("This image could not be loaded.")}
            </p>`:g}
      </a>
    `}onClick(e){if(!this.image)return;this.dispatchEvent(new CustomEvent("imageActivated",{detail:{image:this.image},bubbles:!0,cancelable:!0}))||e.preventDefault()}report(e){this.image&&this.dispatchEvent(new CustomEvent(e,{detail:{image:this.image},bubbles:!0}))}checkAlreadyResolved(){const e=this.imageElement;!e||this.loaded||this.failed||!e.complete||(e.naturalWidth>0?this.markLoaded():this.markFailed())}static get styles(){return[X,$`
        :host {
          --imgview-slide-spinner-color--: var(
            --image-viewer-spinner-color,
            rgba(255, 255, 255, 0.5)
          );
          --imgview-slide-spinner-track-color--: var(
            --image-viewer-spinner-track-color,
            rgba(255, 255, 255, 0.15)
          );
          --imgview-slide-text-color--: var(
            --image-viewer-text-color,
            var(--true-white)
          );
          --imgview-slide-fade-duration--: var(
            --image-viewer-fade-duration,
            0.2s
          );

          flex: 0 0 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .image-link {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          cursor: pointer;
        }

        .main-image {
          display: block;
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          opacity: 0;
          transition: opacity var(--imgview-slide-fade-duration--) ease;
          user-select: none;
        }

        .main-image.loaded {
          opacity: 1;
        }

        .main-image.loaded + .loading-spinner,
        .image-link.failed .loading-spinner {
          display: none;
        }

        .loading-spinner {
          position: absolute;
          width: 24px;
          height: 24px;
          border: 2px solid var(--imgview-slide-spinner-track-color--);
          border-top-color: var(--imgview-slide-spinner-color--);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .image-failed {
          position: absolute;
          margin: 0;
          padding: 0 1.6rem;
          color: var(--imgview-slide-text-color--);
          font-size: 1.4rem;
          text-align: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .loading-spinner {
            animation: none;
          }

          .main-image {
            transition: none;
          }
        }
      `]}};f([v({type:Object})],c.prototype,"image",2);f([_(".main-image")],c.prototype,"imageElement",2);f([h()],c.prototype,"loaded",2);f([h()],c.prototype,"failed",2);c=f([T("ia-imgview-slide")],c);var se=Object.defineProperty,ae=Object.getOwnPropertyDescriptor,O=(e,t,i,s)=>{for(var a=s>1?void 0:s?ae(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(a=(s?r(t,i,a):r(a))||a);return s&&a&&se(t,i,a),a};let y=class extends E{constructor(){super(...arguments),this.currentIndex=0,this.totalImages=0}render(){return o`
      <button
        class="nav-btn prev"
        aria-label=${b("Previous image")}
        @click=${this.onPrevious}
      >
        &#8249;
      </button>
      <div class="counter">${this.currentIndex+1} / ${this.totalImages}</div>
      <button
        class="nav-btn next"
        aria-label=${b("Next image")}
        @click=${this.onNext}
      >
        &#8250;
      </button>
    `}onPrevious(){this.dispatchEvent(new CustomEvent("showPrevious"))}onNext(){this.dispatchEvent(new CustomEvent("showNext"))}static get styles(){return[X,$`
        :host {
          --imgview-controls-text-color--: var(
            --image-viewer-text-color,
            var(--true-white)
          );
          --imgview-controls-btn-width--: var(
            --image-viewer-nav-button-width,
            40px
          );
          --imgview-controls-btn-width-wide--: var(
            --image-viewer-nav-button-width-wide,
            60px
          );
          --imgview-controls-focus-color--: var(
            --image-viewer-focus-outline-color,
            rgba(255, 255, 255, 0.8)
          );

          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-top: 0.8rem;
        }

        .nav-btn {
          width: var(--imgview-controls-btn-width--);
          background: transparent;
          color: var(--imgview-controls-text-color--);
          border: none;
          cursor: pointer;
          font-size: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.5;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
          transition: opacity 0.15s;
        }

        .nav-btn:hover {
          opacity: 1;
        }

        .nav-btn:focus-visible {
          outline: 2px solid var(--imgview-controls-focus-color--);
          outline-offset: -2px;
        }

        .counter {
          color: var(--imgview-controls-text-color--);
          font-size: 14px;
          font-weight: 200;
          letter-spacing: 0.05em;
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-btn {
            transition: none;
          }
        }

        @container image-viewer (min-width: 890px) {
          :host {
            position: static;
            width: auto;
            margin-top: 0;
          }

          .nav-btn {
            position: absolute;
            top: 0;
            bottom: 0;
            width: var(--imgview-controls-btn-width-wide--);
            font-size: 60px;
            z-index: 1;
          }

          .prev {
            left: 0;
          }

          .next {
            right: 0;
          }

          .counter {
            margin-top: 0.8rem;
          }
        }
      `]}};O([v({type:Number})],y.prototype,"currentIndex",2);O([v({type:Number})],y.prototype,"totalImages",2);y=O([T("ia-imgview-controls")],y);var ne=Object.defineProperty,re=Object.getOwnPropertyDescriptor,d=(e,t,i,s)=>{for(var a=s>1?void 0:s?re(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(a=(s?r(t,i,a):r(a))||a);return s&&a&&ne(t,i,a),a};let l=class extends E{constructor(){super(...arguments),this.images=[],this.currentIndex=0,this.animating=!1,this.slideGeneration=0,this.wrapEdge=null,this.reportedFailures=new Set,this.slideTarget=null,this.slideDirection=null,this.gestures=new ee(this)}get imageCount(){return this.images.length}get currentImage(){return this.images[this.currentIndex]}willUpdate(e){if(e.has("images")||e.has("currentImageName")){const t=this.currentImageName?this.images.findIndex(i=>i.name===this.currentImageName):-1;this.currentIndex=t>=0?t:0,this.animating=!1,this.slideGeneration=0,this.slideTarget=null,this.slideDirection=null,this.wrapEdge=null,this.reportedFailures.clear(),this.preloadAdjacentImages()}}render(){if(this.images.length===0)return g;const{dragging:e}=this.gestures,t=this.images[this.currentIndex],i=this.images.length>1,s={"slide-track":!0,"sliding-next":this.animating&&!e&&this.slideDirection==="next","sliding-prev":this.animating&&!e&&this.slideDirection==="prev",dragging:e},a=(this.currentIndex-1+this.images.length)%this.images.length,n=(this.currentIndex+1)%this.images.length,r=this.animating&&!e&&this.slideTarget!==null?this.images[this.slideTarget]:null,m=e?this.images[a]:r,w=e?this.images[n]:r,A=e||r!==null&&this.slideDirection==="prev",C=e||r!==null&&this.slideDirection==="next",u=this.animating&&this.slideTarget!==null?this.slideTarget:this.currentIndex;return o`
      <div class="viewer">
        <div class="image-area">
          ${this.wrapEdge?o`<div
                class="wrap-glow ${this.wrapEdge==="start"?"glow-start":"glow-end"}"
                @animationend=${this.onWrapGlowEnd}
              ></div>`:g}
          ${Y(this.slideGeneration,o`<div
              class=${k(s)}
              @animationend=${this.onSlideEnd}
              @imageLoaded=${this.onImageLoaded}
              @imageFailed=${this.onImageFailed}
              @imageActivated=${this.onImageActivated}
            >
              ${A&&m?this.slideTemplate(m):g}
              ${this.slideTemplate(t)}
              ${C&&w?this.slideTemplate(w):g}
            </div>`)}
        </div>
        ${i?o`
              <ia-imgview-controls
                .currentIndex=${u}
                .totalImages=${this.images.length}
                @showPrevious=${this.showPrevious}
                @showNext=${this.showNext}
              ></ia-imgview-controls>
            `:g}
        ${this.announcementTemplate}
      </div>
    `}slideTemplate(e){return o`<ia-imgview-slide .image=${e}></ia-imgview-slide>`}get announcementTemplate(){const e=this.images[this.currentIndex],t=b(G`Image ${this.currentIndex+1} of ${this.images.length}`),i=e?.title??e?.name;return o`
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        ${i?`${t}: ${i}`:t}
      </div>
    `}onImageLoaded(e){this.reportedFailures.delete(e.detail.image.name),this.dispatchEvent(new CustomEvent("imageLoaded",{detail:{image:e.detail.image}}))}onImageFailed(e){const{image:t}=e.detail;this.reportedFailures.has(t.name)||(this.reportedFailures.add(t.name),this.dispatchEvent(new CustomEvent("imageLoadFailed",{detail:{image:t}})))}onImageActivated(e){if(this.gestures.consumeSwipeTap()){e.preventDefault();return}this.dispatchEvent(new CustomEvent("imageActivated",{detail:{image:e.detail.image},cancelable:!0}))||e.preventDefault()}insertDragSlides(){const e=this.slideTrack;if(!e)return;const t=(this.currentIndex-1+this.images.length)%this.images.length,i=(this.currentIndex+1)%this.images.length;e.insertBefore(this.createDragSlide(this.images[t]),e.firstChild),e.appendChild(this.createDragSlide(this.images[i])),e.classList.add("dragging")}removeDragSlides(){const e=this.slideTrack;e&&(e.querySelectorAll("[data-drag-slide]").forEach(t=>t.remove()),e.classList.remove("dragging"))}createDragSlide(e){const t=document.createElement("ia-imgview-slide");return t.image=e,t.dataset.dragSlide="",t}showNext(){this.settleIfAnimating(),this.moveTo((this.currentIndex+1)%this.images.length,"next")}showPrevious(){this.settleIfAnimating(),this.moveTo((this.currentIndex-1+this.images.length)%this.images.length,"prev")}moveTo(e,t){const i=t==="next"?this.currentIndex===this.images.length-1:this.currentIndex===0;if(this.preloadAroundIndex(e),L()){this.currentIndex=e,this.settleAtCurrentIndex();return}this.slideTarget=e,this.slideDirection=t,this.animating=!0,this.wrapEdge=i?t==="next"?"end":"start":null}commitDrag(e){const t=e==="next"?this.currentIndex===this.images.length-1:this.currentIndex===0,i=e==="next"?1:-1;this.currentIndex=(this.currentIndex+i+this.images.length)%this.images.length,t&&!L()&&(this.wrapEdge=e==="next"?"end":"start"),this.emitImageChanged()}settleIfAnimating(){!this.animating||this.slideTarget===null||(this.currentIndex=this.slideTarget,this.slideGeneration++)}onWrapGlowEnd(){this.wrapEdge=null}onSlideEnd(){this.slideTarget!==null&&(this.currentIndex=this.slideTarget,this.settleAtCurrentIndex())}settleAtCurrentIndex(){this.slideTarget=null,this.slideDirection=null,this.animating=!1,this.gestures.animationSettled(),this.emitImageChanged(),this.preloadAdjacentImages()}emitImageChanged(){const e=this.images[this.currentIndex];e&&this.dispatchEvent(new CustomEvent("imageChanged",{detail:{image:e,index:this.currentIndex}}))}preloadAdjacentImages(){this.preloadAroundIndex(this.currentIndex)}preloadAroundIndex(e){if(this.images.length<=1)return;const t=(e+1)%this.images.length,i=(e-1+this.images.length)%this.images.length;for(const s of[t,i]){const a=new Image;a.src=this.images[s].url}}static get styles(){return[X,$`
        :host {
          --image-viewer-height--: var(--image-viewer-height, 100%);
          --image-viewer-max-width--: var(--image-viewer-max-width, none);
          --image-viewer-slide-duration--: var(
            --image-viewer-slide-duration,
            500ms
          );
          --image-viewer-glow-color--: var(
            --image-viewer-glow-color,
            rgba(255, 255, 255, 0.25)
          );
          --image-viewer-glow-width--: var(--image-viewer-glow-width, 100px);
          /*
           * The breakpoint the controls query against. Named so the query in
           * ia-imgview-controls resolves to this host rather than to whatever
           * container the consumer happens to have further up.
           */
          container: image-viewer / inline-size;

          display: block;
          height: var(--image-viewer-height--);
          max-width: var(--image-viewer-max-width--);
          margin: 0 auto;
        }

        .viewer {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .image-area {
          position: relative;
          flex: 1;
          min-height: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          touch-action: pan-y pinch-zoom;
        }

        .wrap-glow {
          position: absolute;
          top: 0;
          bottom: 0;
          width: var(--image-viewer-glow-width--);
          pointer-events: none;
          z-index: 2;
          animation: glow-fade 700ms ease-out both;
        }

        .glow-start {
          left: 0;
          background: linear-gradient(
            to right,
            var(--image-viewer-glow-color--),
            transparent
          );
        }

        .glow-end {
          right: 0;
          background: linear-gradient(
            to left,
            var(--image-viewer-glow-color--),
            transparent
          );
        }

        @keyframes glow-fade {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .slide-track {
          display: flex;
          width: 100%;
          height: 100%;
          flex-shrink: 0;
        }

        @keyframes slide-next {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        @keyframes slide-prev {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .slide-track.dragging {
          transform: translateX(-100%);
        }

        .slide-track.sliding-next {
          animation: slide-next var(--image-viewer-slide-duration--) ease-in-out
            both;
        }

        .slide-track.sliding-prev {
          animation: slide-prev var(--image-viewer-slide-duration--) ease-in-out
            both;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          border: 0;
          overflow: hidden;
          white-space: nowrap;
          clip-path: inset(50%);
        }
      `]}};d([v({type:Array})],l.prototype,"images",2);d([v({type:String})],l.prototype,"currentImageName",2);d([_(".image-area")],l.prototype,"imageArea",2);d([_(".slide-track")],l.prototype,"slideTrack",2);d([h()],l.prototype,"currentIndex",2);d([h()],l.prototype,"animating",2);d([h()],l.prototype,"slideGeneration",2);d([h()],l.prototype,"wrapEdge",2);l=d([T("ia-image-viewer")],l);var oe=Object.defineProperty,le=Object.getOwnPropertyDescriptor,S=(e,t,i,s)=>{for(var a=s>1?void 0:s?le(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(a=(s?r(t,i,a):r(a))||a);return s&&a&&oe(t,i,a),a};function x(e,t){const i=`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
    <rect width="800" height="600" fill="${t}"/>
    <text x="400" y="320" font-family="sans-serif" font-size="72"
      fill="#ffffff" text-anchor="middle">${e}</text>
  </svg>`;return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(i)}`}const I=[{name:"one.svg",title:"First image",url:x("1","#1b263b")},{name:"two.svg",title:"Second image",url:x("2","#2c3e50")},{name:"three.svg",title:"Third image",url:x("3","#14301a")},{name:"four.svg",title:"Fourth image",url:x("4","#4a1f29")}],he={name:"missing.jpg",title:"Missing image",url:"https://example.invalid/missing.jpg"};let p=class extends E{constructor(){super(...arguments),this.includeBroken=!1,this.singleImage=!1,this.lastEvent=""}get images(){return this.singleImage?[I[0]]:this.includeBroken?[I[0],he,...I.slice(1)]:I}get styleInputData(){return{settings:[{label:"Height",cssVariable:"--image-viewer-height",defaultValue:400,inputType:"range",min:200,max:700,step:10,unit:"px"},{label:"Text color",cssVariable:"--image-viewer-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Glow color",cssVariable:"--image-viewer-glow-color",defaultValue:"#ffffff",inputType:"color"},{label:"Slide duration",cssVariable:"--image-viewer-slide-duration",defaultValue:500,inputType:"range",min:0,max:1500,step:50,unit:"ms"}]}}onImageChanged(e){this.lastEvent=`imageChanged → ${e.detail.image.name} (index ${e.detail.index})`}onImageLoadFailed(e){this.lastEvent=`imageLoadFailed → ${e.detail.image.name}`}toggleRow(e,t){return o`
      <tr>
        <td>${e}</td>
        <td>
          <input
            type="checkbox"
            .checked=${this[t]}
            @change=${()=>{this[t]=!this[t]}}
          />
        </td>
      </tr>
    `}render(){return o`
      <story-template
        elementTag="ia-image-viewer"
        elementClassName="IAImageViewer"
        .styleInputData=${this.styleInputData}
      >
        <div slot="demo">
          <div class="stage">
            <ia-image-viewer
              .images=${this.images}
              @imageChanged=${this.onImageChanged}
              @imageLoadFailed=${this.onImageLoadFailed}
            ></ia-image-viewer>
          </div>
          <p class="event-log">${this.lastEvent||"No events yet."}</p>
        </div>

        <div slot="settings">
          <table>
            ${this.toggleRow("Include a broken image","includeBroken")}
            ${this.toggleRow("Single image (no controls)","singleImage")}
          </table>
          <p class="hint">
            Arrow keys navigate, and so does a horizontal trackpad swipe. Narrow
            the demo below 890px to move the buttons under the image. Turn on
            Reduce Motion in your OS to see navigation land without animating.
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            The viewer takes a plain list of
            <code>{ name, url, title? }</code> and knows nothing about where the
            images came from. It reports the image it lands on through
            <code>imageChanged</code>, so a host can mirror that into its own
            URL or analytics.
          </p>
          <p>
            Clicking an image opens it in a new tab.
            <code>imageActivated</code> is cancelable, so a host that wants a
            lightbox instead can call <code>preventDefault()</code> on it.
          </p>
        </div>
      </story-template>
    `}static get styles(){return $`
      .stage {
        background: #222;
        --image-viewer-height: 400px;
      }

      .event-log {
        margin: 0.8rem 0 0;
        font-family: monospace;
        font-size: 1.2rem;
      }

      .hint {
        font-size: 1.2rem;
      }

      td {
        padding-right: 1rem;
      }
    `}};S([h()],p.prototype,"includeBroken",2);S([h()],p.prototype,"singleImage",2);S([h()],p.prototype,"lastEvent",2);p=S([T("ia-image-viewer-story")],p);export{p as IAImageViewerStory};
