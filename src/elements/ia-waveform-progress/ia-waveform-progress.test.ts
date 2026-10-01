import { fixture, elementUpdated, oneEvent } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { ZoneOfSilence } from './models';
import type { IAWaveformProgress } from './ia-waveform-progress';
import './ia-waveform-progress';

/** Renders an interactive waveform with a known size. */
async function interactiveFixture(): Promise<IAWaveformProgress> {
  return fixture<IAWaveformProgress>(
    html`<ia-waveform-progress
      interactive
      style="width: 120px; height: 50px"
    ></ia-waveform-progress>`,
  );
}

function dragCoverOf(el: IAWaveformProgress): HTMLElement {
  const cover = el.shadowRoot?.getElementById('dragcover');
  if (!cover) throw new Error('the drag cover is not rendered');
  return cover;
}

/**
 * The page X coordinate a given fraction of the way across the waveform.
 *
 * Derived from where the element actually landed rather than hardcoded, so the
 * assertions stay true wherever the test fixture sits on the page.
 */
function pageXAtFraction(el: IAWaveformProgress, fraction: number): number {
  const bounds = el.shadowRoot
    ?.querySelector('.container')
    ?.getBoundingClientRect();
  if (!bounds) throw new Error('the container is not rendered');
  return bounds.left + bounds.width * fraction;
}

function mouseAt(type: string, pageX: number): MouseEvent {
  return new MouseEvent(type, { clientX: pageX });
}

function touchAt(type: string, target: EventTarget, pageX: number): TouchEvent {
  const touch = new Touch({
    identifier: 0,
    target: target as Element,
    clientX: pageX,
    pageX,
  });
  return new TouchEvent(type, { touches: type === 'touchend' ? [] : [touch] });
}

describe('IA Waveform Progress', () => {
  test('defaults percentage to 0', async () => {
    const el = await fixture<IAWaveformProgress>(
      html`<ia-waveform-progress></ia-waveform-progress>`,
    );

    expect(el.percentComplete).to.equal(0);
  });

  test('does not have the draggable cover unless `interactive` is set', async () => {
    const el = await fixture<IAWaveformProgress>(
      html`<ia-waveform-progress></ia-waveform-progress>`,
    );

    expect(el.shadowRoot?.getElementById('dragcover')).to.not.exist;
  });

  test('has the draggable cover if `interactive` is true', async () => {
    const el = await interactiveFixture();

    expect(el.shadowRoot?.getElementById('dragcover')).to.exist;
  });

  test('emits `valuechange` as soon as the mousedown happens', async () => {
    const el = await interactiveFixture();
    const cover = dragCoverOf(el);
    const pageX = pageXAtFraction(el, 0.25);

    setTimeout(() => cover.dispatchEvent(mouseAt('mousedown', pageX)));

    const { detail } = await oneEvent(el, 'valuechange');
    expect(detail.value).to.be.closeTo(25, 0.001);
  });

  test('emits `valuechange` while dragging', async () => {
    const el = await interactiveFixture();
    const cover = dragCoverOf(el);
    cover.dispatchEvent(mouseAt('mousedown', pageXAtFraction(el, 0)));

    const pageX = pageXAtFraction(el, 0.75);
    setTimeout(() => cover.dispatchEvent(mouseAt('mousemove', pageX)));

    const { detail } = await oneEvent(el, 'valuechange');
    expect(detail.value).to.be.closeTo(75, 0.001);
  });

  test('ignores a mousemove that is not part of a drag', async () => {
    const el = await interactiveFixture();
    const cover = dragCoverOf(el);

    let emitted = false;
    el.addEventListener('valuechange', () => {
      emitted = true;
    });
    cover.dispatchEvent(mouseAt('mousemove', pageXAtFraction(el, 0.5)));

    expect(emitted).to.be.false;
  });

  test('scrubs from touch events as well as mouse events', async () => {
    const el = await interactiveFixture();
    const cover = dragCoverOf(el);
    const pageX = pageXAtFraction(el, 0.4);

    setTimeout(() => cover.dispatchEvent(touchAt('touchstart', cover, pageX)));

    const { detail } = await oneEvent(el, 'valuechange');
    expect(detail.value).to.be.closeTo(40, 0.001);
  });

  test('releases the drag on touchcancel, not just touchend', async () => {
    const el = await interactiveFixture();
    const cover = dragCoverOf(el);
    cover.dispatchEvent(
      touchAt('touchstart', cover, pageXAtFraction(el, 0.25)),
    );

    // A touch the system takes over never delivers touchend, so without this
    // the element would ignore playback updates from here on.
    cover.dispatchEvent(touchAt('touchcancel', cover, 0));

    el.percentComplete = 80;
    await elementUpdated(el);

    expect(el.shadowRoot?.getElementById('fill')?.style.width).to.equal('80%');
  });

  test('ignores a non-primary mouse button', async () => {
    const el = await interactiveFixture();
    const cover = dragCoverOf(el);

    let emitted = false;
    el.addEventListener('valuechange', () => {
      emitted = true;
    });
    cover.dispatchEvent(
      new MouseEvent('mousedown', {
        clientX: pageXAtFraction(el, 0.25),
        button: 2,
      }),
    );

    expect(emitted).to.be.false;

    // The right-click must not latch the drag on either, since the context menu
    // eats the mouseup that would have released it.
    el.percentComplete = 80;
    await elementUpdated(el);
    expect(el.shadowRoot?.getElementById('fill')?.style.width).to.equal('80%');
  });

  test('clamps a drag past either end to the 0 to 100 range', async () => {
    const el = await interactiveFixture();
    const cover = dragCoverOf(el);
    cover.dispatchEvent(mouseAt('mousedown', pageXAtFraction(el, 0.5)));

    const past = pageXAtFraction(el, 1.5);
    setTimeout(() => cover.dispatchEvent(mouseAt('mousemove', past)));
    const { detail: high } = await oneEvent(el, 'valuechange');
    expect(high.value).to.equal(100);

    const before = pageXAtFraction(el, -0.5);
    setTimeout(() => cover.dispatchEvent(mouseAt('mousemove', before)));
    const { detail: low } = await oneEvent(el, 'valuechange');
    expect(low.value).to.equal(0);
  });

  test('does not update from an external source while the user is dragging', async () => {
    const el = await interactiveFixture();
    const cover = dragCoverOf(el);
    cover.dispatchEvent(mouseAt('mousedown', pageXAtFraction(el, 0.25)));

    el.percentComplete = 80;
    await elementUpdated(el);

    // The drag position is what stays on screen, not the external update.
    const fill = el.shadowRoot?.getElementById('fill');
    expect(fill?.style.width).to.equal('25%');
  });

  test('can be updated from an external source once the drag has finished', async () => {
    const el = await interactiveFixture();
    const cover = dragCoverOf(el);
    cover.dispatchEvent(mouseAt('mousedown', pageXAtFraction(el, 0.25)));
    cover.dispatchEvent(new MouseEvent('mouseup'));

    el.percentComplete = 80;
    await elementUpdated(el);

    const fill = el.shadowRoot?.getElementById('fill');
    expect(fill?.style.width).to.equal('80%');
  });

  test('does not show any zones of silence if none are passed in', async () => {
    const el = await fixture<IAWaveformProgress>(
      html`<ia-waveform-progress
        style="width: 100px; height: 50px"
      ></ia-waveform-progress>`,
    );

    expect(el.shadowRoot?.querySelectorAll('.zone-of-silence').length).to.equal(
      0,
    );
  });

  test('renders the zones of silence properly if any are passed in', async () => {
    const zones: ZoneOfSilence[] = [
      { startPercent: 23, endPercent: 27 },
      { startPercent: 56, endPercent: 58 },
    ];
    const el = await fixture<IAWaveformProgress>(
      html`<ia-waveform-progress
        style="width: 100px; height: 50px"
        .zonesOfSilence=${zones}
      ></ia-waveform-progress>`,
    );

    const rendered =
      el.shadowRoot?.querySelectorAll<HTMLElement>('.zone-of-silence');
    expect(rendered?.length).to.equal(2);
    expect(rendered?.[0].style.left).to.equal('23%');
    expect(rendered?.[0].style.width).to.equal('4%');
    expect(rendered?.[1].style.left).to.equal('56%');
    expect(rendered?.[1].style.width).to.equal('2%');
  });

  test('renders the waveform image it is given', async () => {
    const el = await fixture<IAWaveformProgress>(
      html`<ia-waveform-progress
        waveformUrl="https://archive.org/waveform.png"
      ></ia-waveform-progress>`,
    );

    const image = el.shadowRoot?.querySelector('img');
    expect(image?.getAttribute('src')).to.equal(
      'https://archive.org/waveform.png',
    );
  });
});
