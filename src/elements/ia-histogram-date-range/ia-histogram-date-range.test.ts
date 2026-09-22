import { fixture, oneEvent } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { IAHistogramDateRange } from './ia-histogram-date-range';
import './ia-histogram-date-range';

function aTimeout(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// getBoundingClientRect().x assertions below are calibrated against this
// harness's 0px document.body margin.
const SLIDER_WIDTH = 10;
const WIDTH = 200;

const subject = html`
  <ia-histogram-date-range
    width="${WIDTH}"
    tooltipWidth="140"
    height="50"
    dateFormat="M/D/YYYY"
    minDate="1900"
    maxDate="12/4/2020"
    bins="[33, 1, 100]"
  >
  </ia-histogram-date-range>
`;

async function createCustomElementInHTMLContainer(): Promise<IAHistogramDateRange> {
  document.head.insertAdjacentHTML(
    'beforeend',
    `<style>
      html {
        font-size:10px;
      }
      .container {
        width: 400px;
        height: 400px;
        display: flex;
        background: #FFF6E1;
        justify-content: center;
        align-items: center;
      }
    </style>`,
  );
  // https://open-wc.org/docs/testing/helpers/#customize-the-fixture-container
  const parentNode = document.createElement('div');
  parentNode.setAttribute('class', 'container');
  return fixture<IAHistogramDateRange>(subject, { parentNode });
}

describe('IAHistogramDateRange', () => {
  test('shows scaled histogram bars when provided with data', async () => {
    const el = await createCustomElementInHTMLContainer();
    const bars = el.shadowRoot?.querySelectorAll(
      '.bar',
    ) as unknown as SVGRectElement[];
    const heights = Array.from(bars).map((b) => b.height.baseVal.value);

    expect(heights).toEqual([38, 7, 50]);
  });

  test('changes the position of the sliders and standardizes date format when dates are entered', async () => {
    const el = await createCustomElementInHTMLContainer();

    /* -------------------------- minimum (left) slider ------------------------- */
    expect(el.minSliderX).toBe(SLIDER_WIDTH);
    const minDateInput = el.shadowRoot?.querySelector(
      '#date-min',
    ) as HTMLInputElement;

    const pressEnterEvent = new KeyboardEvent('keyup', {
      key: 'Enter',
    });

    // valid min date
    minDateInput.value = '1950';
    minDateInput.dispatchEvent(pressEnterEvent);

    expect(Math.floor(el.minSliderX)).toBe(84);
    expect(el.minSelectedDate).toBe('1/1/1950'); // set to correct format

    // attempt to set date earlier than first item
    minDateInput.value = '10/1/1850';
    minDateInput.dispatchEvent(new Event('blur'));

    expect(Math.floor(el.minSliderX)).toBe(SLIDER_WIDTH); // leftmost valid position
    // allow date value less than slider range
    expect(el.minSelectedDate).toBe('10/1/1850');

    /* -------------------------- maximum (right) slider ------------------------- */
    expect(el.maxSliderX).toBe(WIDTH - SLIDER_WIDTH);
    const maxDateInput = el.shadowRoot?.querySelector(
      '#date-max',
    ) as HTMLInputElement;

    // set valid max date
    maxDateInput.value = '3/12/1975';
    maxDateInput.dispatchEvent(pressEnterEvent);

    expect(Math.floor(el.maxSliderX)).toBe(121);
    expect(maxDateInput.value).toBe('3/12/1975');

    // attempt to set date later than last item
    maxDateInput.value = '12/31/2199';
    maxDateInput.dispatchEvent(new Event('blur'));
    await el.updateComplete;

    expect(el.maxSliderX).toBe(WIDTH - SLIDER_WIDTH); // rightmost valid position
    // allow date value greater than slider range
    expect(maxDateInput.value).toBe('12/31/2199');
  });

  test('when updateWhileFocused option is true, updates are fired upon changing input focus', async () => {
    const el = await createCustomElementInHTMLContainer();
    el.updateWhileFocused = true;
    await el.updateComplete;

    let updateEventFired = false;
    el.addEventListener(
      'histogramDateRangeUpdated',
      () => (updateEventFired = true),
    );

    /* -------------------------- minimum (left) slider ------------------------- */
    const minDateInput = el.shadowRoot?.querySelector(
      '#date-min',
    ) as HTMLInputElement;

    /* -------------------------- maximum (right) slider ------------------------- */
    const maxDateInput = el.shadowRoot?.querySelector(
      '#date-max',
    ) as HTMLInputElement;

    minDateInput.focus();

    // set valid min date, but don't hit Enter -- just switch focus to the max date input
    minDateInput.value = '1950';
    maxDateInput.focus();
    await el.updateComplete;
    await aTimeout(0);

    // update event should have fired, setting the minSelectedDate prop & slider position accordingly
    expect(updateEventFired).toBe(true);
    expect(Math.floor(el.minSliderX)).toBe(84);
    expect(el.minSelectedDate).toBe('1/1/1950');

    updateEventFired = false;
    await el.updateComplete;

    // set valid max date, but don't hit Enter -- just switch focus to the min date input
    maxDateInput.value = '3/12/1975';
    minDateInput.focus();
    await el.updateComplete;
    await aTimeout(0);

    // update event should have fired, setting the maxSelectedDate prop & slider position accordingly
    expect(updateEventFired).toBe(true);
    expect(Math.floor(el.maxSliderX)).toBe(121);
    expect(el.maxSelectedDate).toBe('3/12/1975');
  });

  test('when updateWhileFocused option is false (default), updates are not fired while one of the inputs remains focused', async () => {
    const el = await createCustomElementInHTMLContainer();

    let updateEventFired = false;
    el.addEventListener(
      'histogramDateRangeUpdated',
      () => (updateEventFired = true),
    );

    /* -------------------------- minimum (left) slider ------------------------- */
    const minDateInput = el.shadowRoot?.querySelector(
      '#date-min',
    ) as HTMLInputElement;

    /* -------------------------- maximum (right) slider ------------------------- */
    const maxDateInput = el.shadowRoot?.querySelector(
      '#date-max',
    ) as HTMLInputElement;

    minDateInput.focus();

    // set valid min date, but don't hit Enter -- just switch focus to the max date input
    minDateInput.value = '1950';
    maxDateInput.focus();
    await el.updateComplete;
    await aTimeout(0);

    // update event should NOT have fired, because focus remains within the inputs
    expect(updateEventFired).toBe(false);

    // set valid max date, but don't hit Enter -- just switch focus to the min date input
    maxDateInput.value = '3/12/1975';
    minDateInput.focus();
    await el.updateComplete;
    await aTimeout(0);

    // update event should NOT have fired, because focus remains within the inputs
    expect(updateEventFired).toBe(false);
  });

  test('emits the update deferred by an input focus once focus leaves the inputs', async () => {
    const el = await createCustomElementInHTMLContainer();

    const updateEventPromise = oneEvent(el, 'histogramDateRangeUpdated');

    const minDateInput = el.shadowRoot?.querySelector(
      '#date-min',
    ) as HTMLInputElement;
    const maxDateInput = el.shadowRoot?.querySelector(
      '#date-max',
    ) as HTMLInputElement;

    // type a new min date and tab over to the max date input, which holds back
    // the update while focus is still on one of the inputs
    minDateInput.focus();
    minDateInput.value = '1950';
    maxDateInput.focus();
    await el.updateComplete;
    await aTimeout(0);

    // tab back out again without touching the max date
    maxDateInput.blur();

    const { detail } = await updateEventPromise;
    expect(detail.minDate).toBe('1/1/1950');
    expect(detail.maxDate).toBe('12/4/2020');
  });

  test('does not emit for a focus and blur that change nothing', async () => {
    const el = await createCustomElementInHTMLContainer();

    const minDateInput = el.shadowRoot?.querySelector(
      '#date-min',
    ) as HTMLInputElement;

    // get one update emitted, so there is a spent timer lying around
    const updateEventPromise = oneEvent(el, 'histogramDateRangeUpdated');
    minDateInput.value = '1950';
    minDateInput.dispatchEvent(new Event('blur'));
    await updateEventPromise;

    // move the selection from outside the component, as a consumer restoring
    // a range would, then just click into a date input and back out
    let eventCount = 0;
    el.addEventListener('histogramDateRangeUpdated', () => (eventCount += 1));
    el.minSelectedDate = '1960';
    await el.updateComplete;

    minDateInput.focus();
    minDateInput.blur();
    await aTimeout(0);

    expect(eventCount).toBe(0);
  });

  test('handles invalid date inputs', async () => {
    const el = await createCustomElementInHTMLContainer();

    /* -------------------------- minimum (left) slider ------------------------- */
    const minDateInput = el.shadowRoot?.querySelector(
      '#date-min',
    ) as HTMLInputElement;

    minDateInput.value = '5/17/1961';
    minDateInput.dispatchEvent(new Event('blur'));
    await el.updateComplete;

    expect(Math.floor(el.minSliderX)).toBe(101);
    expect(minDateInput.value).toBe('5/17/1961');

    // enter invalid value
    minDateInput.value = 'invalid';
    minDateInput.dispatchEvent(new Event('blur'));
    await el.updateComplete;

    expect(Math.floor(el.minSliderX)).toBe(101); // does not move
    expect(minDateInput.value).toBe('5/17/1961'); // resets back to previous date

    /* -------------------------- maximum (right) slider ------------------------- */
    const maxDateInput = el.shadowRoot?.querySelector(
      '#date-max',
    ) as HTMLInputElement;

    // initial values
    expect(el.maxSliderX).toBe(WIDTH - SLIDER_WIDTH);
    expect(maxDateInput.value).toBe('12/4/2020');

    // enter invalid value
    maxDateInput.value = 'Abc 12, 1YYY';
    maxDateInput.dispatchEvent(new Event('blur'));
    await el.updateComplete;

    expect(Math.floor(el.maxSliderX)).toBe(WIDTH - SLIDER_WIDTH); // does not move
    expect(maxDateInput.value).toBe('12/4/2020'); // resets back to previous date
  });

  test('updates the date inputs when the sliders are moved', async () => {
    const el = await createCustomElementInHTMLContainer();

    /* -------------------------- minimum (left) slider ------------------------- */
    const minSlider = el.shadowRoot?.querySelector('#slider-min') as SVGElement;
    const container = el.shadowRoot?.querySelector(
      '#container',
    ) as HTMLDivElement;
    const minDateInput = el.shadowRoot?.querySelector(
      '#date-min',
    ) as HTMLInputElement;

    // initial state
    expect(minSlider.getBoundingClientRect().x).toBe(100);
    expect(minSlider.classList.contains('draggable')).toBe(true);

    // pointer down
    minSlider.dispatchEvent(new PointerEvent('pointerdown'));
    await el.updateComplete;

    // cursor changes to 'grab'
    const classList = minSlider.classList;
    expect(classList.contains('draggable')).toBe(true);
    expect(classList.contains('dragging')).toBe(true);

    // slide to right
    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 60 }));
    await el.updateComplete;

    // slider has moved
    expect(Math.round(minSlider.getBoundingClientRect().x)).toBe(160);
    // min date is updated
    expect(minDateInput.value).toBe('4/23/1940');

    // stop dragging
    window.dispatchEvent(new PointerEvent('pointerup'));
    await el.updateComplete;

    // cursor returns to normal
    expect(Array.from(container.classList)).not.toContain('dragging');

    /* -------------------------- maximum (right) slider ------------------------- */
    const maxSlider = el.shadowRoot?.querySelector('#slider-max') as SVGElement;
    const maxDateInput = el.shadowRoot?.querySelector(
      '#date-max',
    ) as HTMLInputElement;

    // initial state
    expect(maxSlider.getBoundingClientRect().x).toBe(290);

    // slide to left
    maxSlider.dispatchEvent(new PointerEvent('pointerdown', { clientX: 195 }));
    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 165 }));
    await el.updateComplete;

    // slider has moved
    expect(Math.round(maxSlider.getBoundingClientRect().x)).toBe(260);
    // max date is updated
    expect(maxDateInput.value).toBe('10/8/2000');
    await el.updateComplete;

    // try to slide min slider past max slider
    minSlider.dispatchEvent(new PointerEvent('pointerdown', { clientX: 62 }));
    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 190 }));
    await el.updateComplete;

    // slider moves all the way to meet the right slider
    expect(Math.round(minSlider.getBoundingClientRect().x)).toBe(250);

    // try to slide max slider past min slider
    maxSlider.dispatchEvent(new PointerEvent('pointerdown', { clientX: 120 }));
    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 50 }));
    await el.updateComplete;
    expect(Math.round(maxSlider.getBoundingClientRect().x)).toBe(260); // max slider didn't move

    // try to slide max slider off the right edge
    maxSlider.dispatchEvent(new PointerEvent('pointerdown', { clientX: 120 }));
    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 300 }));
    await el.updateComplete;
    expect(maxSlider.getBoundingClientRect().x).toBe(290); // back to its initial position
    expect(el.maxSelectedDate).toBe('12/4/2020');
  });

  test('does not permit sliders to select dates outside the allowed range', async () => {
    const el = await createCustomElementInHTMLContainer();
    el.binSnapping = 'month';
    el.dateFormat = 'YYYY-MM';
    el.minDate = '2020-01';
    el.maxDate = '2021-12';
    el.minSelectedDate = '2020-01';
    el.maxSelectedDate = '2021-12';
    el.bins = [10, 20, 30, 40, 50, 60, 70, 80];
    await el.updateComplete;

    const minSlider = el.shadowRoot?.querySelector('#slider-min') as SVGElement;
    const maxSlider = el.shadowRoot?.querySelector('#slider-max') as SVGElement;

    const minDateInput = el.shadowRoot?.querySelector(
      '#date-min',
    ) as HTMLInputElement;
    const maxDateInput = el.shadowRoot?.querySelector(
      '#date-max',
    ) as HTMLInputElement;

    // initial state
    expect(minSlider.getBoundingClientRect().x, 'initial').toBe(100);
    expect(maxSlider.getBoundingClientRect().x, 'initial').toBe(290);
    expect(minDateInput.value, 'initial').toBe('2020-01');
    expect(maxDateInput.value, 'initial').toBe('2021-12');

    // try dragging the min slider too far to the left
    minSlider.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0 }));
    window.dispatchEvent(new PointerEvent('pointermove', { clientX: -50 }));
    await el.updateComplete;
    expect(minSlider.getBoundingClientRect().x).toBe(100); // slider didn't move
    expect(minDateInput.value).toBe('2020-01'); // value unchanged

    // try dragging the max slider too far to the right
    maxSlider.dispatchEvent(new PointerEvent('pointerdown', { clientX: 195 }));
    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 250 }));
    await el.updateComplete;
    expect(maxSlider.getBoundingClientRect().x).toBe(290); // slider didn't move
    expect(maxDateInput.value).toBe('2021-12'); // value unchanged
  });

  test("emits a custom event when the element's date range changes", async () => {
    const el = await createCustomElementInHTMLContainer();
    el.updateDelay = 30; // set debounce delay of 30ms

    const minDateInput = el.shadowRoot?.querySelector(
      '#date-min',
    ) as HTMLInputElement;
    const updateEventPromise = oneEvent(el, 'histogramDateRangeUpdated');

    // simulate typing a new value into input
    minDateInput.value = '1955';
    minDateInput.dispatchEvent(new Event('blur'));

    // will wait longer than debounce delay
    const { detail } = await updateEventPromise;
    // verify that event is emitted
    expect(detail.minDate).toBe('1/1/1955');
    expect(detail.maxDate).toBe('12/4/2020');

    let eventCount = 0;
    el.addEventListener('histogramDateRangeUpdated', () => (eventCount += 1));

    // events are not sent if no change since the last event that was sent
    minDateInput.value = '1955';
    minDateInput.dispatchEvent(new Event('blur'));
    await aTimeout(60); // wait longer than debounce delay
    expect(eventCount).toBe(0);

    const updateEventPromise2 = oneEvent(el, 'histogramDateRangeUpdated');

    // with the debounce, multiple quick changes only result in one event sent
    minDateInput.value = '1965';
    minDateInput.dispatchEvent(new Event('blur'));
    await aTimeout(10); // wait less than the debounce delay

    minDateInput.dispatchEvent(new Event('focus'));
    minDateInput.value = '1975';
    minDateInput.dispatchEvent(new Event('blur'));
    await aTimeout(10);

    minDateInput.dispatchEvent(new Event('focus'));
    minDateInput.value = '1985';
    minDateInput.dispatchEvent(new Event('blur'));
    await aTimeout(10);

    const event2 = await updateEventPromise2;
    expect(event2.detail.minDate).toBe('1/1/1985');
    expect(eventCount).toBe(1); // only one event was fired
  });

  test('shows/hides tooltip when hovering over (or pointing at) a bar', async () => {
    const el = await createCustomElementInHTMLContainer();
    // include a number which will require commas (1,000,000)
    el.bins = [1000000, 1, 100];
    await aTimeout(10);
    const bars = el.shadowRoot?.querySelectorAll(
      '.bar',
    ) as unknown as SVGRectElement[];
    const tooltip = el.shadowRoot?.querySelector('#tooltip') as HTMLDivElement;
    expect(tooltip.innerText).toBe('');

    // hover
    bars[0].dispatchEvent(new PointerEvent('pointerenter'));
    await el.updateComplete;
    expect(tooltip.innerText).toMatch(
      /^1,000,000 items\n1\/1\/1900 - 4\/23\/1940/,
    );
    expect(getComputedStyle(tooltip).display).toBe('block');

    // leave
    bars[0].dispatchEvent(new PointerEvent('pointerleave'));
    await el.updateComplete;
    expect(getComputedStyle(tooltip).display).toBe('none');
    expect(tooltip.innerText).toBe('');

    // ensure singular item is not pluralized
    bars[1].dispatchEvent(new PointerEvent('pointerenter'));
    await el.updateComplete;
    expect(tooltip.innerText).toMatch(/^1 item\n4\/23\/1940 - 8\/13\/1980/);
  });

  test('does not show tooltip while dragging', async () => {
    const el = await createCustomElementInHTMLContainer();
    const bars = el.shadowRoot?.querySelectorAll(
      '.bar',
    ) as unknown as SVGRectElement[];
    const tooltip = el.shadowRoot?.querySelector('#tooltip') as HTMLDivElement;
    expect(tooltip.innerText).toBe('');
    const minSlider = el.shadowRoot?.querySelector('#slider-min') as SVGElement;

    // pointer down and slide right
    minSlider.dispatchEvent(new PointerEvent('pointerdown'));
    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 100 }));
    await el.updateComplete;

    // hover over bar
    bars[0].dispatchEvent(new PointerEvent('pointerenter'));
    await el.updateComplete;
    // tooltip display is suppressed while dragging
    expect(tooltip.style.display).toBe('');
  });

  test('allows range to be pre-selected', async () => {
    const el = await fixture<IAHistogramDateRange>(html`
      <ia-histogram-date-range
        minDate="1900"
        maxDate="Dec 4, 2020"
        minSelectedDate="2012"
        maxSelectedDate="2019"
        bins="[33, 1, 100]"
      >
      </ia-histogram-date-range>
    `);
    const minDateInput = el.shadowRoot?.querySelector(
      '#date-min',
    ) as HTMLInputElement;
    expect(minDateInput.value).toBe('2012');

    const maxDateInput = el.shadowRoot?.querySelector(
      '#date-max',
    ) as HTMLInputElement;
    expect(maxDateInput.value).toBe('2019');
  });

  test('extends the selected range when the histogram is clicked outside of the current range', async () => {
    const el = await fixture<IAHistogramDateRange>(html`
      <ia-histogram-date-range
        minDate="1900"
        maxDate="2020"
        minSelectedDate="1950"
        maxSelectedDate="1955"
        bins="[33, 1, 1, 1, 10, 10, 1, 1, 1, 50, 100]"
      >
      </ia-histogram-date-range>
    `);

    const leftBarToClick = Array.from(
      el.shadowRoot?.querySelectorAll('.bar') as NodeList,
    )[1]; // click on second bar to the left

    leftBarToClick.dispatchEvent(new Event('click'));
    await el.updateComplete;
    expect(el.minSelectedDate).toBe('1910'); // range was extended to left

    const rightBarToClick = Array.from(
      el.shadowRoot?.querySelectorAll('.bar') as NodeList,
    )[8]; // click on second bar from the right

    rightBarToClick.dispatchEvent(new Event('click'));
    expect(el.maxSelectedDate).toBe('1998'); // range was extended to right
  });

  test('narrows the selected range when the histogram is clicked inside of the current range', async () => {
    const el = await fixture<IAHistogramDateRange>(html`
      <ia-histogram-date-range
        minDate="1900"
        maxDate="2020"
        minSelectedDate="1900"
        maxSelectedDate="2020"
        bins="[33, 1, 1, 1, 10, 10, 1, 1, 1, 50, 100]"
      >
      </ia-histogram-date-range>
    `);

    ///////////////////////////////////////////////
    // NB: the slider nearest the clicked bar moves
    ///////////////////////////////////////////////

    const leftBarToClick = Array.from(
      el.shadowRoot?.querySelectorAll('.bar') as NodeList,
    )[3]; // click on fourth bar to the left

    leftBarToClick.dispatchEvent(new Event('click'));
    expect(el.minSelectedDate).toBe('1932'); // range was extended to the right

    const rightBarToClick = Array.from(
      el.shadowRoot?.querySelectorAll('.bar') as NodeList,
    )[8]; // click on second bar from the right

    rightBarToClick.dispatchEvent(new Event('click'));
    expect(el.maxSelectedDate).toBe('1998'); // range was extended to the left
  });

  test('handles invalid pre-selected range by defaulting to overall max and min', async () => {
    const el = await fixture<IAHistogramDateRange>(html`
      <ia-histogram-date-range
        minDate="1900"
        maxDate="2020"
        minSelectedDate="2000xyz"
        maxSelectedDate="5000"
        bins="[33, 1, 100]"
      >
      </ia-histogram-date-range>
    `);
    const minDateInput = el.shadowRoot?.querySelector(
      '#date-min',
    ) as HTMLInputElement;
    // malformed min date defaults to overall min
    expect(minDateInput.value).toBe('1900');

    const maxDateInput = el.shadowRoot?.querySelector(
      '#date-max',
    ) as HTMLInputElement;
    // well-formed max date is allowed
    expect(maxDateInput.value).toBe('5000');
  });

  test('handles year values less than 1000 correctly', async () => {
    const el = await fixture<IAHistogramDateRange>(html`
      <ia-histogram-date-range
        dateFormat="M/D/YYYY"
        minDate="-2000"
        maxDate="2000"
        minSelectedDate="-500"
        maxSelectedDate="500"
        bins="[33, 1, 100]"
      >
      </ia-histogram-date-range>
    `);
    const minDateInput = el.shadowRoot?.querySelector(
      '#date-min',
    ) as HTMLInputElement;
    expect(minDateInput.value).toBe('1/1/-500');

    const maxDateInput = el.shadowRoot?.querySelector(
      '#date-max',
    ) as HTMLInputElement;
    expect(maxDateInput.value).toBe('1/1/500');
  });

  test('handles missing data', async () => {
    let el = await fixture<IAHistogramDateRange>(
      html`<ia-histogram-date-range>
        minDate="1900" maxDate="2020" bins=""
      </ia-histogram-date-range>`,
    );
    expect(el.shadowRoot?.innerHTML).toContain('no data');
    el = await fixture<IAHistogramDateRange>(
      html`<ia-histogram-date-range
        minDate="1900"
        maxDate="2020"
        bins="[]"
        missingDataMessage="no data available"
      ></ia-histogram-date-range>`,
    );
    expect(el.shadowRoot?.innerHTML).toContain('no data available');
  });

  test('correctly displays data consisting of a single bin', async () => {
    const el = await fixture<IAHistogramDateRange>(html`
      <ia-histogram-date-range minDate="2020" maxDate="2020" bins="[50]">
      </ia-histogram-date-range>
    `);
    const bars = el.shadowRoot?.querySelectorAll(
      '.bar',
    ) as unknown as SVGRectElement[];
    const heights = Array.from(bars).map((b) => b.height.baseVal.value);
    expect(heights).toEqual([157]);
  });

  test('correctly displays small diff between max and min values', async () => {
    const el = await fixture<IAHistogramDateRange>(html`
      <ia-histogram-date-range bins="[1519,2643,1880,2041,1638,1441]">
      </ia-histogram-date-range>
    `);
    const bars = el.shadowRoot?.querySelectorAll(
      '.bar',
    ) as unknown as SVGRectElement[];
    const heights = Array.from(bars).map((b) => b.height.baseVal.value);
    expect(heights).toEqual([37, 40, 38, 38, 37, 36]);
  });

  test('correctly aligns bins to exact month boundaries when binSnapping=month', async () => {
    const el = await fixture<IAHistogramDateRange>(html`
      <ia-histogram-date-range
        binSnapping="month"
        dateFormat="YYYY-MM"
        tooltipDateFormat="MMM YYYY"
        minDate="2020-01"
        maxDate="2021-12"
        bins="[10,20,30,40,50,60,70,80]"
      ></ia-histogram-date-range>
    `);
    const bars = el.shadowRoot?.querySelectorAll(
      '.bar',
    ) as unknown as SVGRectElement[];
    const tooltips = Array.from(bars).map((b) => b.dataset.tooltip);
    expect(tooltips).toEqual([
      'Jan 2020 - Mar 2020',
      'Apr 2020 - Jun 2020',
      'Jul 2020 - Sep 2020',
      'Oct 2020 - Dec 2020',
      'Jan 2021 - Mar 2021',
      'Apr 2021 - Jun 2021',
      'Jul 2021 - Sep 2021',
      'Oct 2021 - Dec 2021',
    ]);
  });

  test('correctly handles month snapping for years 0-99', async () => {
    const el = await fixture<IAHistogramDateRange>(html`
      <ia-histogram-date-range
        binSnapping="month"
        dateFormat="YYYY-MM"
        tooltipDateFormat="MMM YYYY"
        minDate="0050-01"
        maxDate="0065-12"
        bins="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]"
      ></ia-histogram-date-range>
    `);

    const bars = el.shadowRoot?.querySelectorAll(
      '.bar',
    ) as unknown as SVGRectElement[];
    const tooltips = Array.from(bars).map((b) => b.dataset.tooltip);
    expect(tooltips).toEqual([
      'Jan 50 - Jun 50',
      'Jul 50 - Dec 50',
      'Jan 51 - Jun 51',
      'Jul 51 - Dec 51',
      'Jan 52 - Jun 52',
      'Jul 52 - Dec 52',
      'Jan 53 - Jun 53',
      'Jul 53 - Dec 53',
      'Jan 54 - Jun 54',
      'Jul 54 - Dec 54',
      'Jan 55 - Jun 55',
      'Jul 55 - Dec 55',
      'Jan 56 - Jun 56',
      'Jul 56 - Dec 56',
      'Jan 57 - Jun 57',
      'Jul 57 - Dec 57',
      'Jan 58 - Jun 58',
      'Jul 58 - Dec 58',
      'Jan 59 - Jun 59',
      'Jul 59 - Dec 59',
      'Jan 60 - Jun 60',
      'Jul 60 - Dec 60',
      'Jan 61 - Jun 61',
      'Jul 61 - Dec 61',
      'Jan 62 - Jun 62',
      'Jul 62 - Dec 62',
      'Jan 63 - Jun 63',
      'Jul 63 - Dec 63',
      'Jan 64 - Jun 64',
      'Jul 64 - Dec 64',
      'Jan 65 - Jun 65',
      'Jul 65 - Dec 65',
    ]);
  });

  test('correctly aligns bins to exact year boundaries when binSnapping=year', async () => {
    const el = await fixture<IAHistogramDateRange>(html`
      <ia-histogram-date-range
        binSnapping="year"
        minDate="2000"
        maxDate="2019"
        bins="[10,20,30,40,50,60,70,80,90,100]"
      ></ia-histogram-date-range>
    `);
    const bars = el.shadowRoot?.querySelectorAll(
      '.bar',
    ) as unknown as SVGRectElement[];
    const tooltips = Array.from(bars).map((b) => b.dataset.tooltip);
    expect(tooltips).toEqual([
      '2000 - 2001',
      '2002 - 2003',
      '2004 - 2005',
      '2006 - 2007',
      '2008 - 2009',
      '2010 - 2011',
      '2012 - 2013',
      '2014 - 2015',
      '2016 - 2017',
      '2018 - 2019',
    ]);
  });

  test('correctly handles year snapping for years 0-99', async () => {
    const el = await fixture<IAHistogramDateRange>(html`
      <ia-histogram-date-range
        binSnapping="year"
        dateFormat="YYYY"
        minDate="0020"
        maxDate="0025"
        bins="[1,2,3,4,5,6]"
      ></ia-histogram-date-range>
    `);

    const bars = el.shadowRoot?.querySelectorAll(
      '.bar',
    ) as unknown as SVGRectElement[];
    const tooltips = Array.from(bars).map((b) => b.dataset.tooltip);
    expect(tooltips).toEqual(['20', '21', '22', '23', '24', '25']);
  });

  test('does not duplicate start/end date in tooltips when representing a single year', async () => {
    const el = await fixture<IAHistogramDateRange>(html`
      <ia-histogram-date-range
        binSnapping="year"
        dateFormat="YYYY"
        minDate="2001"
        maxDate="2005"
        bins="[10,20,30,40,50]"
      ></ia-histogram-date-range>
    `);
    const bars = el.shadowRoot?.querySelectorAll(
      '.bar',
    ) as unknown as SVGRectElement[];
    const tooltips = Array.from(bars).map((b) => b.dataset.tooltip);
    expect(tooltips).toEqual(['2001', '2002', '2003', '2004', '2005']);
  });

  test('falls back to default date format for tooltips if no tooltip date format provided', async () => {
    const el = await fixture<IAHistogramDateRange>(html`
      <ia-histogram-date-range
        binSnapping="year"
        minDate="2001"
        maxDate="2005"
        bins="[10,20,30,40,50]"
      ></ia-histogram-date-range>
    `);

    const bars = el.shadowRoot?.querySelectorAll(
      '.bar',
    ) as unknown as SVGRectElement[];
    let tooltips = Array.from(bars).map((b) => b.dataset.tooltip);
    expect(tooltips).toEqual(['2001', '2002', '2003', '2004', '2005']); // default YYYY date format

    el.dateFormat = 'YYYY/MM';
    el.minDate = '2001/01';
    el.maxDate = '2005/01';
    await el.updateComplete;

    // Should use dateFormat fallback for tooltips
    tooltips = Array.from(bars).map((b) => b.dataset.tooltip);
    expect(tooltips).toEqual([
      '2001/01 - 2001/12',
      '2002/01 - 2002/12',
      '2003/01 - 2003/12',
      '2004/01 - 2004/12',
      '2005/01 - 2005/12',
    ]);

    el.dateFormat = 'YYYY';
    el.tooltipDateFormat = 'MMMM YYYY';
    el.minDate = '2001';
    el.maxDate = '2005';
    await el.updateComplete;

    // Should use defined tooltipDateFormat for tooltips
    tooltips = Array.from(bars).map((b) => b.dataset.tooltip);
    expect(tooltips).toEqual([
      'January 2001 - December 2001',
      'January 2002 - December 2002',
      'January 2003 - December 2003',
      'January 2004 - December 2004',
      'January 2005 - December 2005',
    ]);
  });

  test('has a disabled state', async () => {
    const el = await fixture<IAHistogramDateRange>(html`
      <ia-histogram-date-range
        minDate="1900"
        maxDate="2020"
        disabled
        bins="[33, 1, 100]"
      >
      </ia-histogram-date-range>
    `);
    expect(
      el.shadowRoot
        ?.querySelector('.inner-container')
        ?.classList.contains('disabled'),
    ).toBe(true);

    const minSlider = el.shadowRoot?.querySelector('#slider-min') as SVGElement;

    expect(Math.round(minSlider.getBoundingClientRect().x)).toBe(0); // initial state

    // attempt to slide to right
    minSlider.dispatchEvent(new PointerEvent('pointerdown'));
    await el.updateComplete;

    // cursor is not draggable if disabled
    expect(minSlider.classList.contains('draggable')).toBe(false);

    // attempt to slide to right
    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 70 }));
    await el.updateComplete;

    // slider does not moved if element disabled
    expect(Math.round(minSlider.getBoundingClientRect().x)).toBe(0);
  });

  test('has a loading state with a status indicator', async () => {
    const el = await fixture<IAHistogramDateRange>(html`
      <ia-histogram-date-range
        minDate="1900"
        maxDate="2020"
        loading
        bins="[33, 1, 100]"
      >
      </ia-histogram-date-range>
    `);
    expect(
      el.shadowRoot
        ?.querySelector('ia-status-indicator')
        ?.attributes?.getNamedItem('mode')?.value,
    ).toBe('loading');
  });

  test('can use LitElement bound properties', async () => {
    const el = await fixture<IAHistogramDateRange>(html`
      <ia-histogram-date-range
        .minDate=${1900}
        .maxDate=${'Dec 4, 2020'}
        .minSelectedDate=${2012}
        .maxSelectedDate=${2019}
        .bins=${[33, 1, 100]}
      >
      </ia-histogram-date-range>
    `);
    const minDateInput = el.shadowRoot?.querySelector(
      '#date-min',
    ) as HTMLInputElement;
    expect(minDateInput.value).toBe('2012');

    const maxDateInput = el.shadowRoot?.querySelector(
      '#date-max',
    ) as HTMLInputElement;
    expect(maxDateInput.value).toBe('2019');
  });
});
