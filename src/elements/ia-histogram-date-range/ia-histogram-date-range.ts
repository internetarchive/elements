import '@src/elements/ia-status-indicator/ia-status-indicator';
import dayjs from 'dayjs/esm';
import customParseFormat from 'dayjs/esm/plugin/customParseFormat';
import fixFirstCenturyYears from './plugins/fix-first-century-years';
import {
  css,
  html,
  LitElement,
  nothing,
  PropertyValues,
  svg,
  SVGTemplateResult,
  TemplateResult,
} from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { customElement } from '@src/util/custom-element';
import type {
  BarScalingFunction,
  BarScalingOption,
  BarScalingPreset,
  BinSnappingInterval,
} from './models';

dayjs.extend(customParseFormat);
dayjs.extend(fixFirstCenturyYears);

type SliderId = 'slider-min' | 'slider-max';

interface HistogramItem {
  value: number;
  height: number;
  binStart: string;
  binEnd: string;
  tooltip: string;
}

interface BarDataset extends DOMStringMap {
  numItems: string;
  binStart: string;
  binEnd: string;
}

// these values can be overridden via the component's HTML (camelCased) attributes
const WIDTH = 180;
const HEIGHT = 40;
const SLIDER_WIDTH = 10;
const TOOLTIP_WIDTH = 125;
const TOOLTIP_HEIGHT = 30;
const DATE_FORMAT = 'YYYY';
const MISSING_DATA = 'no data';
const UPDATE_DEBOUNCE_DELAY_MS = 0;
const TOOLTIP_LABEL = 'item';

// this constant is not set up to be overridden
const SLIDER_CORNER_SIZE = 4;

/**
 * Map from bar scaling preset options to the corresponding function they represent
 */
const BAR_SCALING_PRESET_FNS: Record<BarScalingPreset, BarScalingFunction> = {
  linear: (binValue: number) => binValue,
  logarithmic: (binValue: number) => Math.log1p(binValue),
};

// these CSS custom props can be overridden from the HTML that is invoking this component
const sliderColor = css`var(--histogramDateRangeSliderColor, #4B65FE)`;
const selectedRangeColor = css`var(--histogramDateRangeSelectedRangeColor, #DBE0FF)`;
const barIncludedFill = css`var(--histogramDateRangeBarIncludedFill, #2C2C2C)`;
const activityIndicatorColor = css`var(--histogramDateRangeActivityIndicator, #2C2C2C)`;
const barExcludedFill = css`var(--histogramDateRangeBarExcludedFill, #CCCCCC)`;
const inputRowMargin = css`var(--histogramDateRangeInputRowMargin, 0)`;
const inputBorder = css`var(--histogramDateRangeInputBorder, 0.5px solid #2C2C2C)`;
const inputWidth = css`var(--histogramDateRangeInputWidth, 35px)`;
const inputFontSize = css`var(--histogramDateRangeInputFontSize, 1.2rem)`;
const inputFontFamily = css`var(--histogramDateRangeInputFontFamily, sans-serif)`;
const tooltipBackgroundColor = css`var(--histogramDateRangeTooltipBackgroundColor, #2C2C2C)`;
const tooltipTextColor = css`var(--histogramDateRangeTooltipTextColor, #FFFFFF)`;
const tooltipFontSize = css`var(--histogramDateRangeTooltipFontSize, 1.1rem)`;
const tooltipFontFamily = css`var(--histogramDateRangeTooltipFontFamily, sans-serif)`;

@customElement('ia-histogram-date-range')
export class IAHistogramDateRange extends LitElement {
  // public reactive properties that can be set via HTML attributes
  @property({ type: Number }) width = WIDTH;
  @property({ type: Number }) height = HEIGHT;
  @property({ type: Number }) sliderWidth = SLIDER_WIDTH;
  @property({ type: Number }) tooltipWidth = TOOLTIP_WIDTH;
  @property({ type: Number }) tooltipHeight = TOOLTIP_HEIGHT;
  @property({ type: Number }) updateDelay = UPDATE_DEBOUNCE_DELAY_MS;
  @property({ type: String }) dateFormat = DATE_FORMAT;
  @property({ type: String }) missingDataMessage = MISSING_DATA;
  @property({ type: String }) minDate = '';
  @property({ type: String }) maxDate = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Array }) bins: number[] = [];
  /** If true, update events will not be canceled by the date inputs receiving focus */
  @property({ type: Boolean }) updateWhileFocused = false;

  /**
   * What interval bins should be snapped to for determining their time ranges.
   *  - `none` (default): Bins should each represent an identical duration of time,
   *     without regard for the actual dates represented.
   *  - `month`: Bins should each represent one or more full, non-overlapping months.
   *     The bin ranges will be "snapped" to the nearest month boundaries, which can
   *     result in bins that represent different amounts of time, particularly if the
   *     provided bins do not evenly divide the provided date range, or if the months
   *     represented are of different lengths.
   *  - `year`: Same as `month`, but snapping to year boundaries instead of months.
   */
  @property({ type: String }) binSnapping: BinSnappingInterval = 'none';

  /**
   * What label to use on tooltips to identify the type of data being represented.
   * Defaults to `'item(s)'`.
   */
  @property({ type: String }) tooltipLabel = TOOLTIP_LABEL;

  /**
   * A function or preset value indicating how the height of each bar relates to its
   * corresponding bin value. Current presets available are 'logarithmic' and 'linear',
   * but a custom function may be provided instead if other behavior is desired.
   *
   * The default scaling (`'logarithmic'`) uses the logarithm of each bin value, yielding
   * more prominent bars for smaller values. This ensures that even when the difference
   * between the min & max values is large, small values are unlikely to completely disappear
   * visually. However, the cost is that bars have less noticeable variation among values of
   * a similar magnitude, and their heights are not a direct representation of the bin values.
   *
   * The `'linear'` preset option instead sizes the bars in linear proportion to their bin
   * values.
   */
  @property({ type: String }) barScaling: BarScalingOption = 'logarithmic';

  // internal reactive properties not exposed as attributes
  @state() private _tooltipOffsetX = 0;
  @state() private _tooltipOffsetY = 0;
  @state() private _tooltipContent?: TemplateResult;
  @state() private _tooltipDateFormat?: string;
  @state() private _isDragging = false;
  @state() private _isLoading = false;

  @query('#tooltip') private _tooltip!: HTMLDivElement;

  // non-reactive properties (changes don't auto-trigger re-rendering)
  private _minSelectedDate = '';
  private _maxSelectedDate = '';
  private _minDateMS = 0;
  private _maxDateMS = 0;
  private _dragOffset = 0;
  private _histWidth = 0;
  private _binWidth = 0;
  private _currentSlider?: SVGRectElement;
  private _histData: HistogramItem[] = [];
  private _emitUpdatedEventTimer?: ReturnType<typeof setTimeout>;
  private _previousDateRange = '';
  private _updateDeferredWhileFocused = false;

  updated(): void {
    // The UA only hides a closed popover where showPopover() exists. Without
    // it the tooltip would sit on the page whenever it isn't being shown, so
    // hide it the one way that works either way. Not just on first render:
    // the tooltip isn't in the DOM at all until there's data to draw.
    if (this._tooltip && !this._tooltipContent) {
      this._tooltip.hidden = true;
    }
  }

  disconnectedCallback(): void {
    this.removeListeners();
    super.disconnectedCallback();
  }

  willUpdate(changedProps: PropertyValues): void {
    // check for changes that would affect bin data calculations
    if (
      changedProps.has('bins') ||
      changedProps.has('minDate') ||
      changedProps.has('maxDate') ||
      changedProps.has('minSelectedDate') ||
      changedProps.has('maxSelectedDate') ||
      changedProps.has('width') ||
      changedProps.has('height') ||
      changedProps.has('binSnapping') ||
      changedProps.has('barScaling')
    ) {
      this.handleDataUpdate();
    }
  }

  /**
   * Set private properties that depend on the attribute bin data
   *
   * We're caching these values and not using getters to avoid recalculating all
   * of the hist data every time the user drags a slider or hovers over a bar
   * creating a tooltip.
   */
  private handleDataUpdate(): void {
    if (!this.hasBinData) {
      return;
    }
    this._histWidth = this.width - this.sliderWidth * 2;

    this._minDateMS = this.snapTimestamp(this.getMSFromString(this.minDate));
    // NB: The max date string, converted as-is to ms, represents the *start* of the
    // final date interval; we want the *end*, so we add any snap interval/offset.
    this._maxDateMS =
      this.snapTimestamp(
        this.getMSFromString(this.maxDate) + this.snapInterval,
      ) + this.snapEndOffset;

    this._binWidth = this._histWidth / this._numBins;
    this._histData = this.calculateHistData();
    this.minSelectedDate = this.minSelectedDate
      ? this.minSelectedDate
      : this.minDate;
    this.maxSelectedDate = this.maxSelectedDate
      ? this.maxSelectedDate
      : this.maxDate;
  }

  /**
   * Rounds the given timestamp to the next full second.
   */
  private snapToNextSecond(timestamp: number): number {
    return Math.ceil(timestamp / 1000) * 1000;
  }

  /**
   * Rounds the given timestamp to the (approximate) nearest start of a month,
   * such that dates up to and including the 15th of the month are rounded down,
   * while dates past the 15th are rounded up.
   */
  private snapToMonth(timestamp: number): number {
    const d = dayjs(timestamp);
    const monthsToAdd = d.date() < 16 ? 0 : 1;
    const snapped = d
      .add(monthsToAdd, 'month')
      .date(1)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0); // First millisecond of the month
    return snapped.valueOf();
  }

  /**
   * Rounds the given timestamp to the (approximate) nearest start of a year,
   * such that dates up to the end of June are rounded down, while dates in
   * July or later are rounded up.
   */
  private snapToYear(timestamp: number): number {
    const d = dayjs(timestamp);
    const yearsToAdd = d.month() < 6 ? 0 : 1;
    const snapped = d
      .add(yearsToAdd, 'year')
      .month(0)
      .date(1)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0); // First millisecond of the year
    return snapped.valueOf();
  }

  /**
   * Rounds the given timestamp according to the `binSnapping` property.
   * Default is simply to snap to the nearest full second.
   */
  private snapTimestamp(timestamp: number): number {
    switch (this.binSnapping) {
      case 'year':
        return this.snapToYear(timestamp);
      case 'month':
        return this.snapToMonth(timestamp);
      case 'none':
      default:
        // We still align it to second boundaries to resolve minor discrepancies
        return this.snapToNextSecond(timestamp);
    }
  }

  /**
   * Function to scale bin values, whether from a preset or a provided custom function.
   */
  private get barScalingFunction(): BarScalingFunction {
    if (typeof this.barScaling === 'string') {
      return BAR_SCALING_PRESET_FNS[this.barScaling];
    }

    return this.barScaling;
  }

  private calculateHistData(): HistogramItem[] {
    const { bins, height, dateRangeMS, _numBins, _minDateMS } = this;
    const minValue = Math.min(...this.bins);
    const maxValue = Math.max(...this.bins);
    // if there is no difference between the min and max values, use a range of
    // 1 because log scaling will fail if the range is 0
    const valueRange =
      minValue === maxValue ? 1 : this.barScalingFunction(maxValue);
    const valueScale = height / valueRange;
    const dateScale = dateRangeMS / _numBins;

    return bins.map((v: number, i: number) => {
      const binStartMS = this.snapTimestamp(i * dateScale + _minDateMS);
      const binStart = this.formatDate(binStartMS);

      const binEndMS =
        this.snapTimestamp((i + 1) * dateScale + _minDateMS) +
        this.snapEndOffset;
      const binEnd = this.formatDate(binEndMS);

      const tooltipStart = this.formatDate(binStartMS, this.tooltipDateFormat);
      const tooltipEnd = this.formatDate(binEndMS, this.tooltipDateFormat);
      // If start/end are the same, just render a single value
      const tooltip =
        tooltipStart === tooltipEnd
          ? tooltipStart
          : `${tooltipStart} - ${tooltipEnd}`;

      return {
        value: v,
        // apply the configured scaling function to the bin value before determining bar height
        height: Math.floor(this.barScalingFunction(v) * valueScale),
        binStart,
        binEnd,
        tooltip,
      };
    });
  }

  private get hasBinData(): boolean {
    return this._numBins > 0;
  }

  private get _numBins(): number {
    if (!this.bins || !this.bins.length) {
      return 0;
    }
    return this.bins.length;
  }

  private get histogramLeftEdgeX(): number {
    return this.sliderWidth;
  }

  private get histogramRightEdgeX(): number {
    return this.width - this.sliderWidth;
  }

  /**
   * Approximate size in ms of the interval to which bins are snapped.
   */
  private get snapInterval(): number {
    const yearMS = 31_536_000_000; // A 365-day approximation of ms in a year
    const monthMS = 2_592_000_000; // A 30-day approximation of ms in a month
    switch (this.binSnapping) {
      case 'year':
        return yearMS;
      case 'month':
        return monthMS;
      case 'none':
      default:
        return 0;
    }
  }

  /**
   * Offset added to the end of each bin to ensure disjoint intervals,
   * depending on whether snapping is enabled and there are multiple bins.
   */
  private get snapEndOffset(): number {
    return this.binSnapping !== 'none' && this._numBins > 1 ? -1 : 0;
  }

  /**
   * Optional date format to use for tooltips only.
   * Falls back to `dateFormat` if not provided.
   */
  @property({ type: String }) get tooltipDateFormat(): string {
    return this._tooltipDateFormat ?? this.dateFormat;
  }

  set tooltipDateFormat(value: string) {
    this._tooltipDateFormat = value;
  }

  /** component's loading (and disabled) state */
  @property({ type: Boolean }) get loading(): boolean {
    return this._isLoading;
  }

  set loading(value: boolean) {
    this.disabled = value;
    this._isLoading = value;
  }

  /** formatted minimum date of selected date range */
  @property() get minSelectedDate(): string {
    return this.formatDate(this.getMSFromString(this._minSelectedDate));
  }

  /** updates minSelectedDate if new date is valid */
  set minSelectedDate(rawDate: string) {
    if (!this._minSelectedDate) {
      // because the values needed to calculate valid max/min values are not
      // available during the lit init when it's populating properties from
      // attributes, fall back to just the raw date if nothing is already set
      this._minSelectedDate = rawDate;
      return;
    }
    const proposedDateMS = this.getMSFromString(rawDate);
    const isValidDate = !Number.isNaN(proposedDateMS);
    const isNotTooRecent =
      proposedDateMS <= this.getMSFromString(this.maxSelectedDate);
    if (isValidDate && isNotTooRecent) {
      this._minSelectedDate = this.formatDate(proposedDateMS);
    }
    this.requestUpdate();
  }

  /** formatted maximum date of selected date range */
  @property() get maxSelectedDate(): string {
    return this.formatDate(this.getMSFromString(this._maxSelectedDate));
  }

  /** updates maxSelectedDate if new date is valid */
  set maxSelectedDate(rawDate: string) {
    if (!this._maxSelectedDate) {
      // because the values needed to calculate valid max/min values are not
      // available during the lit init when it's populating properties from
      // attributes, fall back to just the raw date if nothing is already set
      this._maxSelectedDate = rawDate;
      return;
    }
    const proposedDateMS = this.getMSFromString(rawDate);
    const isValidDate = !Number.isNaN(proposedDateMS);
    const isNotTooOld =
      proposedDateMS >= this.getMSFromString(this.minSelectedDate);
    if (isValidDate && isNotTooOld) {
      this._maxSelectedDate = this.formatDate(proposedDateMS);
    }
    this.requestUpdate();
  }

  /** horizontal position of min date slider */
  get minSliderX(): number {
    const x = this.translateDateToPosition(this.minSelectedDate);
    return this.validMinSliderX(x);
  }

  /** horizontal position of max date slider */
  get maxSliderX(): number {
    const maxSelectedDateMS = this.snapTimestamp(
      this.getMSFromString(this.maxSelectedDate) + this.snapInterval,
    );
    const x = this.translateDateToPosition(this.formatDate(maxSelectedDateMS));
    return this.validMaxSliderX(x);
  }

  private get dateRangeMS(): number {
    return this._maxDateMS - this._minDateMS;
  }

  private showTooltip(e: PointerEvent): void {
    if (this._isDragging || this.disabled) {
      return;
    }

    const target = e.currentTarget as SVGRectElement;
    const x = target.x.baseVal.value + this.sliderWidth / 2;
    const dataset = target.dataset as BarDataset;
    const itemsText = `${this.tooltipLabel}${
      dataset.numItems !== '1' ? 's' : ''
    }`;
    const formattedNumItems = Number(dataset.numItems).toLocaleString();

    const tooltipPadding = 2;
    const bufferHeight = 9;
    const heightAboveHistogram = bufferHeight + this.tooltipHeight;
    const histogramBounds = this.getBoundingClientRect();
    const barX = histogramBounds.x + x;
    const histogramY = histogramBounds.y;

    // Center the tooltip horizontally along the bar
    this._tooltipOffsetX =
      barX -
      tooltipPadding +
      (this._binWidth - this.sliderWidth - this.tooltipWidth) / 2 +
      window.scrollX;
    // Place the tooltip (with arrow) just above the top of the histogram bars
    this._tooltipOffsetY = histogramY - heightAboveHistogram + window.scrollY;

    this._tooltipContent = html`
      ${formattedNumItems} ${itemsText}<br />
      ${dataset.tooltip}
    `;
    this._tooltip.hidden = false;
    this._tooltip.showPopover?.();
  }

  private hideTooltip(): void {
    this._tooltipContent = undefined;
    this._tooltip.hidden = true;
    this._tooltip.hidePopover?.();
  }

  // use arrow functions (rather than standard JS class instance methods) so
  // that `this` is bound to the histogramDateRange object and not the event
  // target. for more info see
  // https://lit-element.polymer-project.org/guide/events#using-this-in-event-listeners
  private drag = (e: PointerEvent): void => {
    // prevent selecting text or other ranges while dragging, especially in Safari
    e.preventDefault();
    if (this.disabled) {
      return;
    }
    this.setDragOffset(e);
    this._isDragging = true;
    this.addListeners();
    this.cancelPendingUpdateEvent();
  };

  private drop = (): void => {
    if (this._isDragging) {
      this.removeListeners();
      this.beginEmitUpdateProcess();
    }
    this._isDragging = false;
  };

  /**
   * Adjust the date range based on slider movement
   *
   * @param e PointerEvent from the slider being moved
   */
  private move = (e: PointerEvent): void => {
    const histogramClientX = this.getBoundingClientRect().x;
    const newX = e.clientX - histogramClientX - this._dragOffset;
    const slider = this._currentSlider as SVGRectElement;
    if ((slider.id as SliderId) === 'slider-min') {
      this.minSelectedDate = this.translatePositionToDate(
        this.validMinSliderX(newX),
      );
    } else {
      this.maxSelectedDate = this.translatePositionToDate(
        this.validMaxSliderX(newX),
      );
      if (this.getMSFromString(this.maxSelectedDate) > this._maxDateMS) {
        this.maxSelectedDate = this.maxDate;
      }
    }
  };

  /**
   * Constrain a proposed value for the minimum (left) slider
   *
   * If the value is less than the leftmost valid position, then set it to the
   * left edge of the histogram (ie the slider width). If the value is greater
   * than the rightmost valid position (the position of the max slider), then
   * set it to the position of the max slider
   */
  private validMinSliderX(newX: number): number {
    // allow the left slider to go right only to the right slider, even if the
    // max selected date is out of range
    const rightLimit = Math.min(
      this.translateDateToPosition(this.maxSelectedDate),
      this.histogramRightEdgeX,
    );
    newX = this.clamp(newX, this.histogramLeftEdgeX, rightLimit);
    const isInvalid =
      Number.isNaN(newX) || rightLimit < this.histogramLeftEdgeX;
    return isInvalid ? this.histogramLeftEdgeX : newX;
  }

  /**
   * Constrain a proposed value for the maximum (right) slider
   *
   * If the value is greater than the rightmost valid position, then set it to
   * the right edge of the histogram (ie histogram width - slider width). If the
   * value is less than the leftmost valid position (the position of the min
   * slider), then set it to the position of the min slider
   */
  private validMaxSliderX(newX: number): number {
    // allow the right slider to go left only to the left slider, even if the
    // min selected date is out of range
    const leftLimit = Math.max(
      this.histogramLeftEdgeX,
      this.translateDateToPosition(this.minSelectedDate),
    );
    newX = this.clamp(newX, leftLimit, this.histogramRightEdgeX);
    const isInvalid =
      Number.isNaN(newX) || leftLimit > this.histogramRightEdgeX;
    return isInvalid ? this.histogramRightEdgeX : newX;
  }

  private addListeners(): void {
    window.addEventListener('pointermove', this.move);
    window.addEventListener('pointerup', this.drop);
    window.addEventListener('pointercancel', this.drop);
  }

  private removeListeners(): void {
    window.removeEventListener('pointermove', this.move);
    window.removeEventListener('pointerup', this.drop);
    window.removeEventListener('pointercancel', this.drop);
  }

  /**
   * start a timer to emit an update event. this timer can be canceled (and the
   * event not emitted) if user drags a slider or focuses a date input within
   * the update delay
   */
  private beginEmitUpdateProcess(): void {
    this.cancelPendingUpdateEvent();
    this._updateDeferredWhileFocused = false;
    this._emitUpdatedEventTimer = setTimeout(() => {
      // the timer has run, so there is no longer a pending event to cancel
      this._emitUpdatedEventTimer = undefined;
      if (this.currentDateRangeString === this._previousDateRange) {
        // don't emit duplicate event if no change since last emitted event
        return;
      }
      this._previousDateRange = this.currentDateRangeString;
      const options = {
        detail: {
          minDate: this.minSelectedDate,
          maxDate: this.maxSelectedDate,
        },
        bubbles: true,
        composed: true,
      };
      this.dispatchEvent(new CustomEvent('histogramDateRangeUpdated', options));
    }, this.updateDelay);
  }

  /** @returns whether there was a pending update event to cancel */
  private cancelPendingUpdateEvent(): boolean {
    if (this._emitUpdatedEventTimer === undefined) {
      return false;
    }
    clearTimeout(this._emitUpdatedEventTimer);
    this._emitUpdatedEventTimer = undefined;
    return true;
  }

  /**
   * find position of pointer in relation to the current slider
   */
  private setDragOffset(e: PointerEvent): void {
    this._currentSlider = e.currentTarget as SVGRectElement;
    const sliderX =
      (this._currentSlider.id as SliderId) === 'slider-min'
        ? this.minSliderX
        : this.maxSliderX;
    const histogramClientX = this.getBoundingClientRect().x;
    this._dragOffset = e.clientX - histogramClientX - sliderX;
  }

  /**
   * @param x horizontal position of slider
   * @returns string representation of date
   */
  private translatePositionToDate(x: number): string {
    // Snap to the nearest second, fixing the case where input like 1/1/2010
    // would get translated to 12/31/2009 due to slight discrepancies from
    // pixel boundaries and floating point error.
    const milliseconds = this.snapToNextSecond(
      ((x - this.sliderWidth) * this.dateRangeMS) / this._histWidth,
    );
    return this.formatDate(this._minDateMS + milliseconds);
  }

  /**
   * Returns slider x-position corresponding to given date
   *
   * @param date
   * @returns x-position of slider
   */
  private translateDateToPosition(date: string): number {
    const milliseconds = this.getMSFromString(date);
    return (
      this.sliderWidth +
      ((milliseconds - this._minDateMS) * this._histWidth) / this.dateRangeMS
    );
  }

  /** ensure that the returned value is between minValue and maxValue */
  private clamp(x: number, minValue: number, maxValue: number): number {
    return Math.min(Math.max(x, minValue), maxValue);
  }

  private handleInputFocus(): void {
    if (!this.updateWhileFocused) {
      // Tabbing from one date input to the other lands focus here in between
      // the first input's blur and any chance for its update to be emitted.
      // Remember that so the second input's blur can pick it back up, rather
      // than the typed date never being reported at all.
      this._updateDeferredWhileFocused = this.cancelPendingUpdateEvent();
    }
  }

  private handleMinDateInput(e: Event): void {
    const target = e.currentTarget as HTMLInputElement;
    const isChanged = target.value !== this.minSelectedDate;
    if (isChanged) {
      this.minSelectedDate = target.value;
    }
    if (isChanged || this._updateDeferredWhileFocused) {
      this.beginEmitUpdateProcess();
    }
  }

  private handleMaxDateInput(e: Event): void {
    const target = e.currentTarget as HTMLInputElement;
    const isChanged = target.value !== this.maxSelectedDate;
    if (isChanged) {
      this.maxSelectedDate = target.value;
    }
    if (isChanged || this._updateDeferredWhileFocused) {
      this.beginEmitUpdateProcess();
    }
  }

  private handleKeyUp(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      const target = e.currentTarget as HTMLInputElement;
      target.blur();
      if (target.id === 'date-min') {
        this.handleMinDateInput(e);
      } else if (target.id === 'date-max') {
        this.handleMaxDateInput(e);
      }
    }
  }

  private get currentDateRangeString(): string {
    return `${this.minSelectedDate}:${this.maxSelectedDate}`;
  }

  private getMSFromString(date: unknown): number {
    // It's possible that `date` is not a string in certain situations.
    // For instance if you use LitElement bindings and the date is `2000`,
    // it will be treated as a number instead of a string. This just makes sure
    // we're dealing with a string.
    const stringified = typeof date === 'string' ? date : String(date);
    const digitGroupCount = (stringified.split(/(\d+)/).length - 1) / 2;
    if (digitGroupCount === 1) {
      // if there's just a single set of digits, assume it's a year
      const dateObj = new Date(0, 0); // start at January 1, 1900
      dateObj.setFullYear(Number(stringified)); // override year
      return dateObj.getTime(); // get time in milliseconds
    }
    return dayjs(stringified, [this.dateFormat, DATE_FORMAT]).valueOf();
  }

  /**
   * expand or narrow the selected range by moving the slider nearest the
   * clicked bar to the outer edge of the clicked bar
   *
   * @param e Event click event from a histogram bar
   */
  private handleBarClick(e: Event): void {
    const dataset = (e.currentTarget as SVGRectElement).dataset as BarDataset;
    // use the midpoint of the width of the clicked bar to determine which is
    // the nearest slider
    const clickPosition =
      (this.getMSFromString(dataset.binStart) +
        this.getMSFromString(dataset.binEnd)) /
      2;
    const distanceFromMinSlider = Math.abs(
      clickPosition - this.getMSFromString(this.minSelectedDate),
    );
    const distanceFromMaxSlider = Math.abs(
      clickPosition - this.getMSFromString(this.maxSelectedDate),
    );
    // update the selected range by moving the nearer slider
    if (distanceFromMinSlider < distanceFromMaxSlider) {
      this.minSelectedDate = dataset.binStart;
    } else {
      this.maxSelectedDate = dataset.binEnd;
    }
    this.beginEmitUpdateProcess();
  }

  private get minSliderTemplate(): SVGTemplateResult {
    // width/height in pixels of curved part of the sliders (like
    // border-radius); used as part of a SVG quadratic curve. see
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#curve_commands
    const cs = SLIDER_CORNER_SIZE;

    const sliderShape = `
            M${this.minSliderX},0
            h-${this.sliderWidth - cs}
            q-${cs},0 -${cs},${cs}
            v${this.height - cs * 2}
            q0,${cs} ${cs},${cs}
            h${this.sliderWidth - cs}
          `;
    return this.generateSliderSVG(this.minSliderX, 'slider-min', sliderShape);
  }

  private get maxSliderTemplate(): SVGTemplateResult {
    const cs = SLIDER_CORNER_SIZE;
    const sliderShape = `
            M${this.maxSliderX},0
            h${this.sliderWidth - cs}
            q${cs},0 ${cs},${cs}
            v${this.height - cs * 2}
            q0,${cs} -${cs},${cs}
            h-${this.sliderWidth - cs}
          `;
    return this.generateSliderSVG(this.maxSliderX, 'slider-max', sliderShape);
  }

  private generateSliderSVG(
    sliderPositionX: number,
    id: SliderId,
    sliderShape: string,
  ): SVGTemplateResult {
    // whether the curved part of the slider is facing towards the left (1), ie
    // minimum, or facing towards the right (-1), ie maximum
    const k = id === 'slider-min' ? 1 : -1;

    const sliderClasses = classMap({
      slider: true,
      draggable: !this.disabled,
      dragging: this._isDragging,
    });

    return svg`
    <svg
      id=${id}
      class=${sliderClasses}
      @pointerdown=${this.drag}
    >
      <path d="${sliderShape} z" fill="${sliderColor}" />
      <rect
        x="${
          sliderPositionX - this.sliderWidth * k + this.sliderWidth * 0.4 * k
        }"
        y="${this.height / 3}"
        width="1"
        height="${this.height / 3}"
        fill="white"
      />
      <rect
        x="${
          sliderPositionX - this.sliderWidth * k + this.sliderWidth * 0.6 * k
        }"
        y="${this.height / 3}"
        width="1"
        height="${this.height / 3}"
        fill="white"
      />
    </svg>
    `;
  }

  get selectedRangeTemplate(): SVGTemplateResult {
    return svg`
      <rect
        x="${this.minSliderX}"
        y="0"
        width="${this.maxSliderX - this.minSliderX}"
        height="${this.height}"
        fill="${selectedRangeColor}"
      />`;
  }

  get histogramTemplate(): SVGTemplateResult[] {
    const xScale = this._histWidth / this._numBins;
    const barWidth = xScale - 1;
    let x = this.sliderWidth; // start at the left edge of the histogram

    return this._histData.map((data) => {
      const { minSelectedDate, maxSelectedDate } = this;
      const barHeight = data.height;

      const binIsBeforeMin = this.isBefore(data.binEnd, minSelectedDate);
      const binIsAfterMax = this.isAfter(data.binStart, maxSelectedDate);
      const barFill =
        binIsBeforeMin || binIsAfterMax ? barExcludedFill : barIncludedFill;

      // the stroke-dasharray style below creates a transparent border around the
      // right edge of the bar, which prevents user from encountering a gap
      // between adjacent bars (eg when viewing the tooltips or when trying to
      // extend the range by clicking on a bar)
      const barStyle = `stroke-dasharray: 0 ${barWidth} ${barHeight} ${barWidth} 0 ${barHeight}`;

      const bar = svg`
        <rect
          class="bar-pointer-target"
          x=${x}
          y="0"
          width=${barWidth}
          height=${this.height}
          @pointerenter=${this.showTooltip}
          @pointerleave=${this.hideTooltip}
          @click=${this.handleBarClick}
          fill="transparent"
          data-num-items=${data.value}
          data-bin-start=${data.binStart}
          data-bin-end=${data.binEnd}
          data-tooltip=${data.tooltip}
        />
        <rect
          class="bar"
          style=${barStyle}
          x=${x}
          y=${this.height - barHeight}
          width=${barWidth}
          height=${barHeight}
          fill=${barFill}
        />`;
      x += xScale;
      return bar;
    });
  }

  /** Whether the first arg represents a date strictly before the second arg */
  private isBefore(date1: string, date2: string): boolean {
    const date1MS = this.getMSFromString(date1);
    const date2MS = this.getMSFromString(date2);
    return date1MS < date2MS;
  }

  /** Whether the first arg represents a date strictly after the second arg */
  private isAfter(date1: string, date2: string): boolean {
    const date1MS = this.getMSFromString(date1);
    const date2MS = this.getMSFromString(date2);
    return date1MS > date2MS;
  }

  private formatDate(dateMS: number, format: string = this.dateFormat): string {
    if (Number.isNaN(dateMS)) {
      return '';
    }
    const date = dayjs(dateMS);
    if (date.year() < 1000) {
      // years before 1000 don't play well with dayjs custom formatting, so work around dayjs
      // by setting the year to a sentinel value and then replacing it instead.
      // this is a bit hacky but it does the trick for essentially all reasonable cases
      // until such time as we replace dayjs.
      const tmpDate = date.year(199999);
      return tmpDate.format(format).replace(/199999/g, date.year().toString());
    }
    return date.format(format);
  }

  /**
   * NOTE: we are relying on the lit `live` directive in the template to
   * ensure that the change to minSelectedDate is noticed and the input value
   * gets properly re-rendered. see
   * https://lit.dev/docs/templates/directives/#live
   */
  get minInputTemplate(): TemplateResult {
    return html`
      <input
        id="date-min"
        placeholder=${this.dateFormat}
        type="text"
        @focus=${this.handleInputFocus}
        @blur=${this.handleMinDateInput}
        @keyup=${this.handleKeyUp}
        .value=${live(this.minSelectedDate)}
        ?disabled=${this.disabled}
      />
    `;
  }

  get maxInputTemplate(): TemplateResult {
    return html`
      <input
        id="date-max"
        placeholder=${this.dateFormat}
        type="text"
        @focus=${this.handleInputFocus}
        @blur=${this.handleMaxDateInput}
        @keyup=${this.handleKeyUp}
        .value=${live(this.maxSelectedDate)}
        ?disabled=${this.disabled}
      />
    `;
  }

  get minLabelTemplate(): TemplateResult {
    return html`<label for="date-min" class="sr-only">Minimum date:</label>`;
  }

  get maxLabelTemplate(): TemplateResult {
    return html`<label for="date-max" class="sr-only">Maximum date:</label>`;
  }

  get tooltipTemplate(): TemplateResult {
    const styles = styleMap({
      width: `${this.tooltipWidth}px`,
      height: `${this.tooltipHeight}px`,
      top: `${this._tooltipOffsetY}px`,
      left: `${this._tooltipOffsetX}px`,
    });

    return html`
      <div id="tooltip" style=${styles} popover>${this._tooltipContent}</div>
    `;
  }

  private get histogramAccessibilityTemplate(): TemplateResult {
    let rangeText: string = '';
    if (this.minSelectedDate && this.maxSelectedDate) {
      rangeText = ` from ${this.minSelectedDate} to ${this.maxSelectedDate}`;
    } else if (this.minSelectedDate) {
      rangeText = ` from ${this.minSelectedDate}`;
    } else if (this.maxSelectedDate) {
      rangeText = ` up to ${this.maxSelectedDate}`;
    }

    const titleText = `Filter results for dates${rangeText}`;
    const descText = `This histogram shows the distribution of dates${rangeText}`;

    return html`<title id="histogram-title">${titleText}</title
      ><desc id="histogram-desc">${descText}</desc>`;
  }

  private get noDataTemplate(): TemplateResult {
    return html`
      <div class="missing-data-message">${this.missingDataMessage}</div>
    `;
  }

  private get activityIndicatorTemplate(): TemplateResult | typeof nothing {
    if (!this.loading) {
      return nothing;
    }
    return html`
      <ia-status-indicator mode="loading" ?hideDots=${true}>
      </ia-status-indicator>
    `;
  }

  static styles = css`
    .missing-data-message {
      text-align: center;
    }
    #container {
      margin: 0;
      touch-action: none;
      position: relative;
    }
    .disabled {
      opacity: 0.3;
    }
    ia-status-indicator {
      position: absolute;
      left: calc(50% - 10px);
      top: 10px;
      --icon-width: 20px;
      --loading-ring-color--: ${activityIndicatorColor};
    }

    /* prevent selection from interfering with tooltip, especially on mobile */
    /* https://stackoverflow.com/a/4407335/1163042 */
    .noselect {
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* current Chrome, Edge, Opera and Firefox */
    }
    .bar,
    .bar-pointer-target {
      /* create a transparent border around the hist bars to prevent "gaps" and
      flickering when moving around between bars. this also helps with handling
      clicks on the bars, preventing users from being able to click in between
      bars */
      stroke: rgba(0, 0, 0, 0);
      /* ensure transparent stroke wide enough to cover gap between bars */
      stroke-width: 2px;
    }
    .bar {
      /* ensure the bar's pointer target receives events, not the bar itself */
      pointer-events: none;
    }
    .bar-pointer-target:hover + .bar {
      /* highlight currently hovered bar */
      fill-opacity: 0.7;
    }
    .disabled .bar-pointer-target:hover + .bar {
      /* ensure no visual hover interaction when disabled */
      fill-opacity: 1;
    }
    /****** histogram ********/
    #tooltip {
      position: absolute;
      background: ${tooltipBackgroundColor};
      margin: 0;
      border: 0;
      color: ${tooltipTextColor};
      text-align: center;
      border-radius: 3px;
      padding: 2px;
      font-size: ${tooltipFontSize};
      font-family: ${tooltipFontFamily};
      touch-action: none;
      pointer-events: none;
      overflow: visible;
    }
    #tooltip:after {
      content: '';
      position: absolute;
      margin-left: -5px;
      top: 100%;
      left: 50%;
      /* arrow */
      border: 5px solid ${tooltipTextColor};
      border-color: ${tooltipBackgroundColor} transparent transparent
        transparent;
    }
    /****** slider ********/
    .slider {
      shape-rendering: crispEdges; /* So the slider doesn't get blurry if dragged between pixels */
    }
    .draggable:hover {
      cursor: grab;
    }
    .dragging {
      cursor: grabbing !important;
    }
    /****** inputs ********/
    #inputs {
      display: flex;
      justify-content: center;
      margin: ${inputRowMargin};
    }
    #inputs .dash {
      position: relative;
      bottom: -1px;
      align-self: center; /* Otherwise the dash sticks to the top while the inputs grow */
    }
    input {
      width: ${inputWidth};
      margin: 0 3px;
      border: ${inputBorder};
      border-radius: 2px !important;
      text-align: center;
      font-size: ${inputFontSize};
      font-family: ${inputFontFamily};
    }
    .sr-only {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      overflow: hidden !important;
      white-space: nowrap !important;
      clip: rect(1px, 1px, 1px, 1px) !important;
      -webkit-clip-path: inset(50%) !important;
      clip-path: inset(50%) !important;
    }
  `;

  render(): TemplateResult {
    if (!this.hasBinData) {
      return this.noDataTemplate;
    }
    return html`
      <div
        id="container"
        class="
          noselect
          ${this._isDragging ? 'dragging' : ''}
        "
        style="width: ${this.width}px"
      >
        ${this.activityIndicatorTemplate} ${this.tooltipTemplate}
        <div
          class="inner-container
          ${this.disabled ? 'disabled' : ''}"
        >
          <svg
            width="${this.width}"
            height="${this.height}"
            aria-labelledby="histogram-title histogram-desc"
            @pointerleave="${this.drop}"
          >
            ${this.histogramAccessibilityTemplate} ${this.selectedRangeTemplate}
            <svg id="histogram">${this.histogramTemplate}</svg>
            ${this.minSliderTemplate} ${this.maxSliderTemplate}
          </svg>
          <div id="inputs">
            ${this.minLabelTemplate} ${this.minInputTemplate}
            <div class="dash">-</div>
            ${this.maxLabelTemplate} ${this.maxInputTemplate}
            <slot name="inputs-right-side"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-histogram-date-range': IAHistogramDateRange;
  }
}
