import{i as d,b as c,a as g,r as p,c as m}from"./index-DpQoML9j.js";import"./story-template-B-AFmlzJ.js";var h=Object.defineProperty,u=Object.getOwnPropertyDescriptor,s=(t,a,o,i)=>{for(var e=i>1?void 0:i?u(a,o):a,n=t.length-1,l;n>=0;n--)(l=t[n])&&(e=(i?l(a,o,e):l(e))||e);return i&&e&&h(a,o,e),e};const b=[3,8,15,40,90,130,175,140,95,60,30,12,4],y=[{label:"Slider color",cssVariable:"--histogramDateRangeSliderColor",defaultValue:"#4b65fe",inputType:"color"},{label:"Selected range color",cssVariable:"--histogramDateRangeSelectedRangeColor",defaultValue:"#dbe0ff",inputType:"color"},{label:"Included bar color",cssVariable:"--histogramDateRangeBarIncludedFill",defaultValue:"#2c2c2c",inputType:"color"},{label:"Excluded bar color",cssVariable:"--histogramDateRangeBarExcludedFill",defaultValue:"#cccccc",inputType:"color"},{label:"Spinner color",cssVariable:"--histogramDateRangeActivityIndicator",defaultValue:"#2c2c2c",inputType:"color"}],D=[{label:"Bin snapping",propertyName:"binSnapping",defaultValue:"year",inputType:"radio",radioOptions:["none","month","year"]},{label:"Loading",propertyName:"loading",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Bar scaling",propertyName:"barScaling",defaultValue:"logarithmic",inputType:"radio",radioOptions:["logarithmic","linear"]},{label:"Tooltip label",propertyName:"tooltipLabel",defaultValue:"item",inputType:"text"},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let r=class extends d{constructor(){super(...arguments),this.minSelectedDate="",this.maxSelectedDate=""}render(){return c`
      <story-template
        elementTag="ia-histogram-date-range"
        elementClassName="IAHistogramDateRange"
        .styleInputData=${{settings:y}}
        .propInputData=${{settings:D}}
        .defaultUsageProps=${`.bins=\${bins}
  minDate="1975"
  maxDate="2025"`}
      >
        <ia-histogram-date-range
          slot="demo"
          minDate="1975"
          maxDate="2025"
          binSnapping="year"
          .bins=${b}
          @histogramDateRangeUpdated=${t=>{this.minSelectedDate=t.detail.minDate,this.maxSelectedDate=t.detail.maxDate}}
        ></ia-histogram-date-range>

        <p slot="demo" class="readout">
          <code>histogramDateRangeUpdated</code>:
          ${this.minSelectedDate&&this.maxSelectedDate?`${this.minSelectedDate} – ${this.maxSelectedDate}`:"none yet — drag a slider or type a date"}
        </p>

        <div slot="usage-notes">
          <p>
            A histogram of counts over a date range, with two sliders for
            narrowing the selection. Dragging a slider, typing into a date
            input, or clicking a bar all move the nearest slider; the element
            debounces those into a single
            <code>histogramDateRangeUpdated</code> event once things settle.
          </p>
          <p>
            <code>binSnapping</code> controls whether bin boundaries land on
            exact month/year starts (useful when each bin genuinely represents a
            calendar month or year) or on arbitrary, evenly-spaced points across
            the range.
          </p>
        </div>
      </story-template>
    `}static get styles(){return g`
      /* The element sizes its tooltip and date inputs in fixed pixels but
       * their text in rem, and inherits its line height from the page, so the
       * two only line up where 1rem is 10px and lines are tight, as they are
       * on archive.org. This page inherits the browser's 16px default and a
       * 1.5 line height, which together overflow the tooltip and clip a
       * 4-digit year, so pin the text to what that geometry expects. */
      ia-histogram-date-range {
        --histogramDateRangeTooltipFontSize: 11px;
        --histogramDateRangeInputFontSize: 12px;
        line-height: normal;
      }

      .readout {
        font-size: 0.9em;
      }
    `}};s([p()],r.prototype,"minSelectedDate",2);s([p()],r.prototype,"maxSelectedDate",2);r=s([m("ia-histogram-date-range-story")],r);export{r as IAHistogramDateRangeStory};
