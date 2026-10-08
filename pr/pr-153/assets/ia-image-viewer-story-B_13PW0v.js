import{i as c,b as h,a as p,r as d,c as u}from"./index-DpQoML9j.js";import"./story-template-B-AFmlzJ.js";var f=Object.defineProperty,v=Object.getOwnPropertyDescriptor,r=(e,t,s,n)=>{for(var i=n>1?void 0:n?v(t,s):t,g=e.length-1,m;g>=0;g--)(m=e[g])&&(i=(n?m(t,s,i):m(i))||i);return n&&i&&f(t,s,i),i};function o(e,t){const s=`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
    <rect width="800" height="600" fill="${t}"/>
    <text x="400" y="320" font-family="sans-serif" font-size="72"
      fill="#ffffff" text-anchor="middle">${e}</text>
  </svg>`;return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(s)}`}const l=[{name:"one.svg",title:"First image",url:o("1","#1b263b")},{name:"two.svg",title:"Second image",url:o("2","#2c3e50")},{name:"three.svg",title:"Third image",url:o("3","#14301a")},{name:"four.svg",title:"Fourth image",url:o("4","#4a1f29")}],w={name:"missing.jpg",title:"Missing image",url:"https://example.invalid/missing.jpg"};let a=class extends c{constructor(){super(...arguments),this.includeBroken=!1,this.singleImage=!1,this.lastEvent=""}get images(){const e=a.IMAGE_SETS;return this.singleImage?e.single:this.includeBroken?e.withBroken:e.default}get styleInputData(){return{settings:[{label:"Text color",cssVariable:"--image-viewer-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Glow color",cssVariable:"--image-viewer-glow-color",defaultValue:"#ffffff",inputType:"color"},{label:"Slide duration",cssVariable:"--image-viewer-slide-duration",defaultValue:500,inputType:"range",min:0,max:1500,step:50,unit:"ms"}]}}onImageChanged(e){this.lastEvent=`imageChanged → ${e.detail.image.name} (index ${e.detail.index})`}onImageLoadFailed(e){this.lastEvent=`imageLoadFailed → ${e.detail.image.name}`}toggleRow(e,t){return h`
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
    `}render(){return h`
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
          <p>
            Size it with ordinary CSS —
            <code>ia-image-viewer { height: 400px }</code>. It fills the box it
            is given, so there is no height custom property to set.
          </p>
        </div>
      </story-template>
    `}static get styles(){return p`
      /* The viewer fills whatever box it's given, so the demo gives it one. */
      .stage {
        background: #222;
        height: 400px;
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
    `}};a.IMAGE_SETS={default:l,withBroken:[l[0],w,...l.slice(1)],single:[l[0]]};r([d()],a.prototype,"includeBroken",2);r([d()],a.prototype,"singleImage",2);r([d()],a.prototype,"lastEvent",2);a=r([u("ia-image-viewer-story")],a);export{a as IAImageViewerStory};
