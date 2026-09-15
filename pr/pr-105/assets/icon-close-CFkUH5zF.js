import{b as a,i as d,a as h}from"./index-56B-Iq-d.js";function x(i,t,o,n){var l=arguments.length,e=l<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(i,t,o,n);else for(var s=i.length-1;s>=0;s--)(r=i[s])&&(e=(l<3?r(e):l>3?r(t,o,e):r(t,o))||e);return l>3&&e&&Object.defineProperty(t,o,e),e}function y(i,t,o,n){function l(e){return e instanceof o?e:new o(function(r){r(e)})}return new(o||(o=Promise))(function(e,r){function s(c){try{f(n.next(c))}catch(u){r(u)}}function p(c){try{f(n.throw(c))}catch(u){r(u)}}function f(c){c.done?e(c.value):l(c.value).then(s,p)}f((n=n.apply(i,t||[])).next())})}const v=a`
<svg
  viewBox="0 0 40 40"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z" class="fill-color" fill-rule="evenodd"/>
</svg>
`;class w extends d{static get styles(){return h`
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
    `}render(){return v}}customElements.define("ia-icon-close",w);export{x as _,y as a};
