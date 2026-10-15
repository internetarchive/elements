import{b as D,i as C,a as E}from"./index-CqD6m3Zx.js";const I=D`
<svg
  viewBox="0 0 40 40"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z" class="fill-color" fill-rule="evenodd"/>
</svg>
`;class L extends C{static get styles(){return E`
      :host {
        width: var(--iconWidth, 'auto');
        height: var(--iconHeight, 'auto');
      }

      .fill-color {
        fill: var(--iconFillColor);
      }

      .stroke-color {
        stroke: var(--iconStrokeColor);
      }
    `}render(){return I}}customElements.define("ia-icon-close",L);function O(o,T,$){var a=$||{},f=a.noTrailing,u=f===void 0?!1:f,d=a.noLeading,v=d===void 0?!1:d,g=a.debounceMode,i=g===void 0?void 0:g,n,m=!1,c=0;function p(){n&&clearTimeout(n)}function b(r){var t=r||{},e=t.upcomingOnly,s=e===void 0?!1:e;p(),m=!s}function h(){for(var r=arguments.length,t=new Array(r),e=0;e<r;e++)t[e]=arguments[e];var s=this,w=Date.now()-c;if(m)return;function l(){c=Date.now(),T.apply(s,t)}function x(){n=void 0}!v&&i&&!n&&l(),p(),i===void 0&&w>o?v?(c=Date.now(),u||(n=setTimeout(i?x:l,o))):l():u!==!0&&(n=setTimeout(i?x:l,i===void 0?o-w:o))}return h.cancel=b,h}export{O as t};
