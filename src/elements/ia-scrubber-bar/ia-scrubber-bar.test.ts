import { fixture, oneEvent, elementUpdated } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import { SectionMarkerMode } from './models';
import type { IASectionMarker } from './ia-section-marker';
import type { IAScrubberBar } from './ia-scrubber-bar';
import './ia-scrubber-bar';

const MARKERS = [10, 11, 25, 30, 50, 75];

async function scrubberFixture(): Promise<IAScrubberBar> {
  return fixture<IAScrubberBar>(html`<ia-scrubber-bar></ia-scrubber-bar>`);
}

function sliderIn(el: IAScrubberBar): HTMLInputElement {
  const slider = el.shadowRoot?.getElementById('slider');
  if (!slider) throw new Error('the slider is not rendered');
  return slider as HTMLInputElement;
}

function markersIn(el: IAScrubberBar): IASectionMarker[] {
  return [
    ...(el.shadowRoot?.querySelectorAll<IASectionMarker>('ia-section-marker') ??
      []),
  ];
}

/** Moves the slider the way a user drag would, and fires the matching event. */
function slideTo(el: IAScrubberBar, value: number): void {
  const slider = sliderIn(el);
  slider.value = String(value);
  slider.dispatchEvent(new Event('input'));
}

describe('IA Scrubber Bar', () => {
  test('defaults value to 0', async () => {
    const el = await scrubberFixture();

    expect(el.value).to.equal(0);
  });

  test('gives the slider an accessible name', async () => {
    const el = await scrubberFixture();

    expect(sliderIn(el).getAttribute('aria-label')).to.equal(
      'Playback position',
    );
  });

  test.each([
    ['mousedown', 'userInteractionStarted'],
    ['mouseup', 'userInteractionEnded'],
    ['touchstart', 'userInteractionStarted'],
    ['touchend', 'userInteractionEnded'],
    ['touchcancel', 'userInteractionEnded'],
  ])('dispatches %s as %s', async (domEvent, emitted) => {
    const el = await scrubberFixture();
    const slider = sliderIn(el);

    setTimeout(() => slider.dispatchEvent(new Event(domEvent)));

    expect(await oneEvent(el, emitted)).to.exist;
  });

  test('dispatches valuechange when the slider receives input', async () => {
    const el = await scrubberFixture();

    setTimeout(() => slideTo(el, 0));

    const { detail } = await oneEvent(el, 'valuechange');
    expect(detail.value).to.equal(0);
  });

  test('dispatches the value the slider moved to', async () => {
    const el = await scrubberFixture();

    setTimeout(() => slideTo(el, 20));

    const { detail } = await oneEvent(el, 'valuechange');
    expect(detail.value).to.equal(20);
  });

  test('calculates the percentage for the given value and range', async () => {
    const el = await fixture<IAScrubberBar>(
      html`<ia-scrubber-bar min="10" max="50"></ia-scrubber-bar>`,
    );

    slideTo(el, 10);
    expect(el.percentage).to.equal(0);

    slideTo(el, 20);
    expect(el.percentage).to.equal(25);

    slideTo(el, 50);
    expect(el.percentage).to.equal(100);
  });

  test('reports 0 percent rather than dividing by zero on an empty range', async () => {
    const el = await fixture<IAScrubberBar>(
      html`<ia-scrubber-bar min="5" max="5"></ia-scrubber-bar>`,
    );

    expect(el.percentage).to.equal(0);
  });

  test('does not update the slider while the user is interacting', async () => {
    const el = await scrubberFixture();
    const slider = sliderIn(el);
    slider.dispatchEvent(new Event('mousedown'));

    el.value = 20;
    await elementUpdated(el);

    expect(slider.value).to.equal('0');
  });

  test('picks the external value back up once the interaction ends', async () => {
    const el = await scrubberFixture();
    const slider = sliderIn(el);
    slider.dispatchEvent(new Event('mousedown'));
    slider.dispatchEvent(new Event('mouseup'));

    el.value = 20;
    await elementUpdated(el);

    expect(slider.value).to.equal('20');
  });

  test('holds the keyboard scrub position against incoming playback updates', async () => {
    const el = await scrubberFixture();
    const slider = sliderIn(el);

    slider.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    slideTo(el, 15);

    // A playback tick arriving mid-scrub must not snap the thumb back.
    el.value = 60;
    await elementUpdated(el);

    expect(slider.value).to.equal('15');
  });

  test('releases the keyboard scrub on keyup', async () => {
    const el = await scrubberFixture();
    const slider = sliderIn(el);

    slider.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    slider.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight' }));

    el.value = 60;
    await elementUpdated(el);

    expect(slider.value).to.equal('60');
  });

  test('does not treat Tab as scrubbing', async () => {
    const el = await scrubberFixture();
    const slider = sliderIn(el);

    let started = false;
    el.addEventListener('userInteractionStarted', () => {
      started = true;
    });
    // Tab moves focus, so its keyup never comes back here. Starting an
    // interaction on it would latch the scrubber on for good.
    slider.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

    expect(started).to.be.false;
  });

  test('emits only one interaction start while a key auto-repeats', async () => {
    const el = await scrubberFixture();
    const slider = sliderIn(el);

    let starts = 0;
    el.addEventListener('userInteractionStarted', () => {
      starts += 1;
    });
    for (let i = 0; i < 3; i += 1) {
      slider.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    }

    expect(starts).to.equal(1);
  });

  test('releases a latched interaction when focus leaves', async () => {
    const el = await scrubberFixture();
    const slider = sliderIn(el);
    slider.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

    setTimeout(() => slider.dispatchEvent(new Event('blur')));
    expect(await oneEvent(el, 'userInteractionEnded')).to.exist;

    el.value = 60;
    await elementUpdated(el);
    expect(slider.value).to.equal('60');
  });

  test('does not emit an interaction end on a blur with nothing in progress', async () => {
    const el = await scrubberFixture();
    const slider = sliderIn(el);

    let ended = false;
    el.addEventListener('userInteractionEnded', () => {
      ended = true;
    });
    slider.dispatchEvent(new Event('blur'));

    expect(ended).to.be.false;
  });

  test('lays out the section markers', async () => {
    const el = await fixture<IAScrubberBar>(
      html`<ia-scrubber-bar
        .sectionMarkerPercentages=${MARKERS}
      ></ia-scrubber-bar>`,
    );

    const markers = markersIn(el);
    expect(markers.length).to.equal(6);
    expect(markers[1].style.left).to.equal('11%');
  });

  test('points the markers either side of the playhead towards it', async () => {
    const el = await fixture<IAScrubberBar>(
      html`<ia-scrubber-bar
        .sectionMarkerPercentages=${MARKERS}
        value="37"
        expandSectionMarkers
      ></ia-scrubber-bar>`,
    );
    await elementUpdated(el);

    const markers = markersIn(el);
    // 30 is the last boundary at or below 37, 50 the first above it.
    expect(markers[2].markerMode).to.equal(SectionMarkerMode.neither);
    expect(markers[3].markerMode).to.equal(SectionMarkerMode.right);
    expect(markers[4].markerMode).to.equal(SectionMarkerMode.left);
    expect(markers[5].markerMode).to.equal(SectionMarkerMode.neither);
  });

  test('leaves every marker at rest unless expandSectionMarkers is set', async () => {
    const el = await fixture<IAScrubberBar>(
      html`<ia-scrubber-bar
        .sectionMarkerPercentages=${MARKERS}
        value="37"
      ></ia-scrubber-bar>`,
    );
    await elementUpdated(el);

    for (const marker of markersIn(el)) {
      expect(marker.markerMode).to.equal(SectionMarkerMode.neither);
    }
  });

  test('orders the markers numerically, not as strings', async () => {
    // Sorted as strings this is ["100","20","9"], which would make 100 the
    // boundary below the playhead and 20 the one above it.
    const el = await fixture<IAScrubberBar>(
      html`<ia-scrubber-bar
        .sectionMarkerPercentages=${[9, 20, 100]}
        value="50"
        expandSectionMarkers
      ></ia-scrubber-bar>`,
    );
    await elementUpdated(el);

    const [nine, twenty, hundred] = markersIn(el);
    expect(nine.markerMode).to.equal(SectionMarkerMode.neither);
    expect(twenty.markerMode).to.equal(SectionMarkerMode.right);
    expect(hundred.markerMode).to.equal(SectionMarkerMode.left);
  });

  test('does not reorder the array it was given', async () => {
    const markers = [75, 10, 50];
    const el = await fixture<IAScrubberBar>(
      html`<ia-scrubber-bar
        .sectionMarkerPercentages=${markers}
        value="30"
        expandSectionMarkers
      ></ia-scrubber-bar>`,
    );
    await elementUpdated(el);

    expect(markers).to.deep.equal([75, 10, 50]);
  });

  test('tracks the played portion of the bar as a fill percentage', async () => {
    const el = await fixture<IAScrubberBar>(
      html`<ia-scrubber-bar value="40"></ia-scrubber-bar>`,
    );
    await elementUpdated(el);

    const container = el.shadowRoot?.querySelector<HTMLElement>('.container');
    expect(container?.style.getPropertyValue('--fill-percent--')).to.equal(
      '40%',
    );
  });
  test('keeps the fill on the track when the track height is themed', async () => {
    const el = await fixture<IAScrubberBar>(
      html`<ia-scrubber-bar
        style="--ia-theme-scrubber-track-height: 20px"
      ></ia-scrubber-bar>`,
    );
    await elementUpdated(el);

    const fill = el.shadowRoot?.querySelector('.color-fill');
    const track = el.shadowRoot?.querySelector('.color-fill');
    expect(fill).to.exist;
    expect(getComputedStyle(track as Element).height).to.equal('20px');
    // Centred in the 20px bar, so it sits flush rather than 7px up.
    expect(getComputedStyle(track as Element).bottom).to.equal('2px');
  });

  test('keeps the fill at its original geometry with the default sizes', async () => {
    const el = await scrubberFixture();
    await elementUpdated(el);

    const fill = el.shadowRoot?.querySelector('.color-fill') as Element;
    expect(getComputedStyle(fill).height).to.equal('10px');
    expect(getComputedStyle(fill).bottom).to.equal('7px');
  });
});

describe('IA Section Marker', () => {
  test('marker mode defaults to `neither`', async () => {
    const el = await fixture<IASectionMarker>(
      html`<ia-section-marker></ia-section-marker>`,
    );

    expect(el.markerMode).to.equal(SectionMarkerMode.neither);
  });

  test('reflects the marker mode into a class so the arrows can respond', async () => {
    const el = await fixture<IASectionMarker>(
      html`<ia-section-marker
        .markerMode=${SectionMarkerMode.left}
      ></ia-section-marker>`,
    );

    const container = el.shadowRoot?.querySelector('.container');
    expect(container?.classList.contains('mode-left')).to.be.true;
  });
});
