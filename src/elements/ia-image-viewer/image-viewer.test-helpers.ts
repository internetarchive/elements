import type { ImageViewerImage } from './models';
import type { IAImageViewer } from './ia-image-viewer';
import type { IAImageViewerSlide } from './ia-imgview-slide';

/** A numbered set of images, `photo1.jpg` through `photoN.jpg`. */
export function makeImages(count: number): ImageViewerImage[] {
  return Array.from({ length: count }, (_, i) => ({
    name: `photo${i + 1}.jpg`,
    url: `https://example.test/photo${i + 1}.jpg`,
  }));
}

/** The slide elements currently in the viewer's track. */
export function slideElements(el: IAImageViewer): IAImageViewerSlide[] {
  return Array.from(el.shadowRoot?.querySelectorAll('ia-imgview-slide') ?? []);
}

/** Every match across the slides, each of which has its own shadow root. */
export function querySlideAll<T extends Element>(
  el: IAImageViewer,
  selector: string,
): T[] {
  return slideElements(el).flatMap((slide) =>
    Array.from(slide.shadowRoot?.querySelectorAll<T>(selector) ?? []),
  );
}

/** Finds a match inside any slide. */
export function querySlide<T extends Element>(
  el: IAImageViewer,
  selector: string,
): T | null {
  return querySlideAll<T>(el, selector)[0] ?? null;
}

/** Finds a match inside the nav controls, which have their own shadow root. */
export function queryControls<T extends Element>(
  el: IAImageViewer,
  selector: string,
): T | null {
  const controls = el.shadowRoot?.querySelector('ia-imgview-controls');
  return controls?.shadowRoot?.querySelector<T>(selector) ?? null;
}

export function queryControlsAll<T extends Element>(
  el: IAImageViewer,
  selector: string,
): T[] {
  const controls = el.shadowRoot?.querySelector('ia-imgview-controls');
  return Array.from(controls?.shadowRoot?.querySelectorAll<T>(selector) ?? []);
}

/**
 * Waits for the viewer and the children it renders. Awaiting the viewer alone
 * only gets as far as setting the children's properties; their own renders are
 * scheduled after that.
 */
export async function settle(el: IAImageViewer): Promise<void> {
  await el.updateComplete;
  const controls = el.shadowRoot?.querySelector('ia-imgview-controls');
  await Promise.all([
    ...slideElements(el).map((slide) => slide.updateComplete),
    controls?.updateComplete,
  ]);
}

/**
 * Clicks a nav button and completes the animation cycle. CSS animations don't
 * run in the test environment, so the `animationend` that advances the
 * viewer's state machine is dispatched by hand.
 */
export async function navigateAndSettle(
  el: IAImageViewer,
  button: HTMLButtonElement,
): Promise<void> {
  button.click();
  await settle(el);
  el.shadowRoot
    ?.querySelector('.slide-track')
    ?.dispatchEvent(new Event('animationend'));
  await settle(el);
}

/** Fails an image by dispatching the `error` event the browser would. */
export async function failImage(
  el: IAImageViewer,
  name: string,
): Promise<void> {
  querySlide(el, `img.main-image[data-image-name="${name}"]`)?.dispatchEvent(
    new Event('error'),
  );
  await settle(el);
}

function touchAt(target: HTMLElement, x: number, y: number): Touch {
  return new Touch({ identifier: 0, target, clientX: x, clientY: y });
}

/**
 * Drags across the image area and lifts. `dx` is the total horizontal travel;
 * negative goes forward, the way a finger moves to reveal the next image.
 */
export async function swipe(
  el: IAImageViewer,
  dx: number,
  dy: number = 0,
): Promise<void> {
  const area = el.shadowRoot?.querySelector('.image-area') as HTMLElement;
  const startX = 300;
  const startY = 200;
  const lockX = startX + Math.sign(dx) * 15;

  area.dispatchEvent(
    new TouchEvent('touchstart', {
      bubbles: true,
      touches: [touchAt(area, startX, startY)],
    }),
  );
  // Past the 10px lock-in distance, so the gesture reads as horizontal.
  area.dispatchEvent(
    new TouchEvent('touchmove', {
      bubbles: true,
      cancelable: true,
      touches: [touchAt(area, lockX, startY + dy)],
    }),
  );
  area.dispatchEvent(
    new TouchEvent('touchmove', {
      bubbles: true,
      cancelable: true,
      touches: [touchAt(area, startX + dx, startY + dy)],
    }),
  );
  area.dispatchEvent(
    new TouchEvent('touchend', {
      bubbles: true,
      changedTouches: [touchAt(area, startX + dx, startY + dy)],
      touches: [],
    }),
  );

  // Long enough for the settle transition's fallback timeout to fire.
  await new Promise((r) => setTimeout(r, 400));
  await settle(el);
}

/** The width the swipe helper's distances are measured against. */
export function areaWidth(el: IAImageViewer): number {
  const area = el.shadowRoot?.querySelector('.image-area') as HTMLElement;
  return area.offsetWidth || 400;
}
