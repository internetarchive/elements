import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { IAHistogramDateRange } from './ia-histogram-date-range';

import './ia-histogram-date-range';
import '@demo/story-template';

const BINS = [3, 8, 15, 40, 90, 130, 175, 140, 95, 60, 30, 12, 4];

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Slider color',
    cssVariable: '--histogramDateRangeSliderColor',
    defaultValue: '#4b65fe',
    inputType: 'color',
  },
  {
    label: 'Selected range color',
    cssVariable: '--histogramDateRangeSelectedRangeColor',
    defaultValue: '#dbe0ff',
    inputType: 'color',
  },
  {
    label: 'Included bar color',
    cssVariable: '--histogramDateRangeBarIncludedFill',
    defaultValue: '#2c2c2c',
    inputType: 'color',
  },
  {
    label: 'Excluded bar color',
    cssVariable: '--histogramDateRangeBarExcludedFill',
    defaultValue: '#cccccc',
    inputType: 'color',
  },
  {
    // Shares the bars' default color and renders on top of the tallest of
    // them, so recoloring one or the other is the only way to see the
    // loading state.
    label: 'Spinner color',
    cssVariable: '--histogramDateRangeActivityIndicator',
    defaultValue: '#2c2c2c',
    inputType: 'color',
  },
];

const propInputSettings: PropInputSettings<IAHistogramDateRange>[] = [
  {
    label: 'Bin snapping',
    propertyName: 'binSnapping',
    defaultValue: 'year',
    inputType: 'radio',
    radioOptions: ['none', 'month', 'year'],
  },
  {
    label: 'Loading',
    propertyName: 'loading',
    defaultValue: false,
    inputType: 'radio',
    radioOptions: [true, false],
  },
  {
    label: 'Bar scaling',
    propertyName: 'barScaling',
    defaultValue: 'logarithmic',
    inputType: 'radio',
    radioOptions: ['logarithmic', 'linear'],
  },
  {
    label: 'Tooltip label',
    propertyName: 'tooltipLabel',
    defaultValue: 'item',
    inputType: 'text',
  },
  {
    // Applied after loading: loading's setter also sets disabled, so
    // ordering this one later is what lets it override that (and lets it be
    // toggled independently in the demo — the two dimensions are coupled in
    // real usage, since loading data always disables interaction).
    label: 'Disabled',
    propertyName: 'disabled',
    defaultValue: false,
    inputType: 'radio',
    radioOptions: [true, false],
  },
];

@customElement('ia-histogram-date-range-story')
export class IAHistogramDateRangeStory extends LitElement {
  @state() private minSelectedDate = '';

  @state() private maxSelectedDate = '';

  render() {
    return html`
      <story-template
        elementTag="ia-histogram-date-range"
        elementClassName="IAHistogramDateRange"
        .styleInputData=${{ settings: styleInputSettings }}
        .propInputData=${{ settings: propInputSettings }}
        .defaultUsageProps=${'.bins=${bins}\n  minDate="1975"\n  maxDate="2025"'}
      >
        <ia-histogram-date-range
          slot="demo"
          minDate="1975"
          maxDate="2025"
          binSnapping="year"
          .bins=${BINS}
          @histogramDateRangeUpdated=${(
            e: CustomEvent<{ minDate: string; maxDate: string }>,
          ) => {
            this.minSelectedDate = e.detail.minDate;
            this.maxSelectedDate = e.detail.maxDate;
          }}
        ></ia-histogram-date-range>

        <p slot="demo" class="readout">
          <code>histogramDateRangeUpdated</code>:
          ${this.minSelectedDate && this.maxSelectedDate
            ? `${this.minSelectedDate} – ${this.maxSelectedDate}`
            : 'none yet — drag a slider or type a date'}
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
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
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
    `;
  }
}
