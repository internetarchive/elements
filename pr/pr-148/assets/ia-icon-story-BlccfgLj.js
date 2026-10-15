import{n as d,c as l,i as p,A as g,b as m,a as v}from"./index-oZDn60gK.js";import{t as f}from"./theme-styles-DPbRJSuj.js";import"./story-template-B7ggTg6Z.js";import"./syntax-highlighter-CdEVTWun.js";var b=Object.defineProperty,y=Object.getOwnPropertyDescriptor,u=(t,r,a,i)=>{for(var e=i>1?void 0:i?y(r,a):r,o=t.length-1,n;o>=0;o--)(n=t[o])&&(e=(i?n(r,a,e):n(e))||e);return i&&e&&b(r,a,e),e};const w=/['"\\()\n\r\f]/g;function I(t){return t.replace(w,r=>`%${r.charCodeAt(0).toString(16).toUpperCase().padStart(2,"0")}`)}let s=class extends p{constructor(){super(...arguments),this.src=""}render(){if(!this.src)return g;const t=I(this.src);return m`
      <div
        class="icon masked"
        part="icon"
        style="mask-image: url('${t}')"
      ></div>
      <img class="icon fallback" part="icon" src=${this.src} alt="" />
    `}static get styles(){return[f,v`
        :host {
          --icon-height--: var(--icon-height);
          --icon-width--: var(--icon-width);
          --icon-color--: var(--icon-color);
          --icon-filter--: var(--icon-filter);
          --icon-transition--: var(--icon-transition);
        }

        .icon {
          height: var(--icon-height--);
          width: var(--icon-width--);
          filter: var(--icon-filter--);
        }

        .icon.masked {
          display: none;
        }

        /* Icons inherit font color when possible */
        @supports (mask-image: url()) and (background: currentColor) {
          .icon.masked {
            display: block;
            mask-repeat: no-repeat;
            /* Scale the icon to fit the box, whatever its aspect ratio */
            mask-size: contain;
            mask-position: center;
            background: var(--icon-color--);
            filter: none;
            transition: var(--icon-transition--);
          }

          .icon.fallback {
            display: none;
          }
        }
      `]}};u([d({type:String})],s.prototype,"src",2);s=u([l("ia-icon")],s);const h="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23000'/%3e%3c/svg%3e";var S=Object.getOwnPropertyDescriptor,_=(t,r,a,i)=>{for(var e=i>1?void 0:i?S(r,a):r,o=t.length-1,n;o>=0;o--)(n=t[o])&&(e=n(e)||e);return e};const $=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:1.25,inputType:"range",min:.5,max:5,step:.25,unit:"rem"},{label:"Height",cssVariable:"--ia-theme-icon-height",defaultValue:1.25,inputType:"range",min:.5,max:5,step:.25,unit:"rem"},{label:"Color",cssVariable:"--ia-theme-icon-color",defaultValue:"currentColor"},{label:"Transition",cssVariable:"--ia-theme-icon-transition",defaultValue:"none"}],C=[{label:"Icon source",propertyName:"src",defaultValue:h}];let c=class extends p{render(){return m`
      <story-template
        elementTag="ia-icon"
        elementClassName="IAIcon"
        .defaultUsageProps=${"src=${favoriteIcon}"}
        .styleInputData=${{settings:$}}
        .propInputData=${{settings:C}}
      >
        <ia-icon slot="demo" src=${h}></ia-icon>
      </story-template>
    `}};c=_([l("ia-icon-story")],c);export{c as IAIconStory};
