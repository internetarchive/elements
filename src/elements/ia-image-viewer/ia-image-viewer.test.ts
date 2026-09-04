import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { afterEach, describe, expect, test, vi } from 'vitest';

import type { IAImageViewer } from './ia-image-viewer';
import './ia-image-viewer';
import type { ImageViewerImage } from './models';
import {
  areaWidth,
  failImage,
  makeImages,
  navigateAndSettle,
  queryControls,
  queryControlsAll,
  querySlide,
  querySlideAll,
  settle,
  slideElements,
  swipe,
} from './image-viewer.test-helpers';

/** Mounts a viewer showing `count` numbered images. */
async function viewerWith(
  count: number,
  extra: Partial<{ currentImageName: string }> = {},
): Promise<IAImageViewer> {
  return fixture<IAImageViewer>(
    html`<ia-image-viewer
      .images=${makeImages(count)}
      .currentImageName=${extra.currentImageName}
    ></ia-image-viewer>`,
  );
}

const counterText = (el: IAImageViewer): string | undefined =>
  queryControls(el, '.counter')?.textContent?.trim();

const currentSrc = (el: IAImageViewer): string | undefined =>
  querySlide<HTMLImageElement>(el, '.main-image')?.src;

/** Forces `prefers-reduced-motion` on or off for the rest of the test. */
function setReducedMotion(reduce: boolean): void {
  const real = window.matchMedia.bind(window);
  vi.spyOn(window, 'matchMedia').mockImplementation((query: string) =>
    query.includes('prefers-reduced-motion')
      ? ({ matches: reduce, media: query } as MediaQueryList)
      : real(query),
  );
}

describe('IAImageViewer', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders nothing when given no images', async () => {
    const el = await fixture<IAImageViewer>(
      html`<ia-image-viewer></ia-image-viewer>`,
    );
    expect(slideElements(el).length).toBe(0);
    expect(el.shadowRoot?.querySelector('.viewer')).to.not.exist;
  });

  test('renders a single image without controls', async () => {
    const el = await viewerWith(1);
    expect(currentSrc(el)).toContain('photo1.jpg');
    expect(el.shadowRoot?.querySelector('ia-imgview-controls')).to.not.exist;
  });

  test('renders navigation controls for multiple images', async () => {
    const el = await viewerWith(3);
    expect(queryControlsAll(el, '.nav-btn').length).toBe(2);
    expect(counterText(el)).toBe('1 / 3');
  });

  test('renders only the images passed in', async () => {
    const images: ImageViewerImage[] = [
      { name: 'a.png', url: 'https://example.test/a.png' },
      { name: 'b.png', url: 'https://example.test/b.png' },
    ];
    const el = await fixture<IAImageViewer>(
      html`<ia-image-viewer .images=${images}></ia-image-viewer>`,
    );
    expect(counterText(el)).toBe('1 / 2');
    expect(currentSrc(el)).toContain('a.png');
  });

  test('exposes the current image', async () => {
    const el = await viewerWith(3);
    expect(el.currentImage?.name).toBe('photo1.jpg');
    expect(el.imageCount).toBe(3);
  });

  describe('navigation', () => {
    test('next button advances to the next image', async () => {
      const el = await viewerWith(3);
      await navigateAndSettle(el, queryControls(el, '.next')!);
      expect(currentSrc(el)).toContain('photo2.jpg');
      expect(counterText(el)).toBe('2 / 3');
    });

    test('prev button goes to the previous image', async () => {
      const el = await viewerWith(3);
      await navigateAndSettle(el, queryControls(el, '.next')!);
      await navigateAndSettle(el, queryControls(el, '.prev')!);
      expect(currentSrc(el)).toContain('photo1.jpg');
    });

    test('wraps from the last image to the first on next', async () => {
      const el = await viewerWith(2);
      await navigateAndSettle(el, queryControls(el, '.next')!);
      await navigateAndSettle(el, queryControls(el, '.next')!);
      expect(currentSrc(el)).toContain('photo1.jpg');
      expect(counterText(el)).toBe('1 / 2');
    });

    test('wraps from the first image to the last on prev', async () => {
      const el = await viewerWith(3);
      await navigateAndSettle(el, queryControls(el, '.prev')!);
      expect(currentSrc(el)).toContain('photo3.jpg');
      expect(counterText(el)).toBe('3 / 3');
    });

    test('keyboard ArrowRight navigates forward', async () => {
      const el = await viewerWith(3);
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight' }),
      );
      await settle(el);
      el.shadowRoot
        ?.querySelector('.slide-track')
        ?.dispatchEvent(new Event('animationend'));
      await settle(el);
      expect(counterText(el)).toBe('2 / 3');
    });

    test('keyboard ArrowLeft navigates backward', async () => {
      const el = await viewerWith(3);
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft' }),
      );
      await settle(el);
      el.shadowRoot
        ?.querySelector('.slide-track')
        ?.dispatchEvent(new Event('animationend'));
      await settle(el);
      expect(counterText(el)).toBe('3 / 3');
    });

    test('keyboard navigation is ignored with a single image', async () => {
      const el = await viewerWith(1);
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight' }),
      );
      await settle(el);
      expect(currentSrc(el)).toContain('photo1.jpg');
    });
  });

  describe('animation', () => {
    test('shows two slides while animating and one at rest', async () => {
      const el = await viewerWith(3);
      queryControls<HTMLButtonElement>(el, '.next')!.click();
      await settle(el);
      expect(slideElements(el).length).toBe(2);

      el.shadowRoot
        ?.querySelector('.slide-track')
        ?.dispatchEvent(new Event('animationend'));
      await settle(el);
      expect(slideElements(el).length).toBe(1);
    });

    test('applies sliding-next while moving forward', async () => {
      const el = await viewerWith(3);
      queryControls<HTMLButtonElement>(el, '.next')!.click();
      await settle(el);
      const track = el.shadowRoot?.querySelector('.slide-track');
      expect(track?.classList.contains('sliding-next')).toBe(true);
    });

    test('applies sliding-prev while moving backward', async () => {
      const el = await viewerWith(3);
      queryControls<HTMLButtonElement>(el, '.prev')!.click();
      await settle(el);
      const track = el.shadowRoot?.querySelector('.slide-track');
      expect(track?.classList.contains('sliding-prev')).toBe(true);
    });

    test('updates the counter immediately, before the animation lands', async () => {
      const el = await viewerWith(3);
      queryControls<HTMLButtonElement>(el, '.next')!.click();
      await settle(el);
      expect(counterText(el)).toBe('2 / 3');
    });

    test('interrupting an animation settles it and starts the next', async () => {
      const el = await viewerWith(4);
      queryControls<HTMLButtonElement>(el, '.next')!.click();
      await settle(el);
      // Interrupt mid-flight, before animationend.
      queryControls<HTMLButtonElement>(el, '.next')!.click();
      await settle(el);
      el.shadowRoot
        ?.querySelector('.slide-track')
        ?.dispatchEvent(new Event('animationend'));
      await settle(el);
      expect(counterText(el)).toBe('3 / 4');
    });

    test('interrupting forward with backward returns to the original', async () => {
      const el = await viewerWith(4);
      queryControls<HTMLButtonElement>(el, '.next')!.click();
      await settle(el);
      queryControls<HTMLButtonElement>(el, '.prev')!.click();
      await settle(el);
      el.shadowRoot
        ?.querySelector('.slide-track')
        ?.dispatchEvent(new Event('animationend'));
      await settle(el);
      expect(counterText(el)).toBe('1 / 4');
    });

    test('shows the wrap glow going past the last image', async () => {
      const el = await viewerWith(2);
      await navigateAndSettle(el, queryControls(el, '.next')!);
      queryControls<HTMLButtonElement>(el, '.next')!.click();
      await settle(el);
      const glow = el.shadowRoot?.querySelector('.wrap-glow');
      expect(glow).to.exist;
      expect(glow?.classList.contains('glow-end')).toBe(true);
    });

    test('shows the wrap glow going before the first image', async () => {
      const el = await viewerWith(2);
      queryControls<HTMLButtonElement>(el, '.prev')!.click();
      await settle(el);
      const glow = el.shadowRoot?.querySelector('.wrap-glow');
      expect(glow).to.exist;
      expect(glow?.classList.contains('glow-start')).toBe(true);
    });

    test('clears the wrap glow when its animation ends', async () => {
      const el = await viewerWith(2);
      queryControls<HTMLButtonElement>(el, '.prev')!.click();
      await settle(el);
      el.shadowRoot
        ?.querySelector('.wrap-glow')
        ?.dispatchEvent(new Event('animationend'));
      await settle(el);
      expect(el.shadowRoot?.querySelector('.wrap-glow')).to.not.exist;
    });
  });

  describe('reduced motion', () => {
    test('lands on the next image without waiting for an animation', async () => {
      setReducedMotion(true);
      const el = await viewerWith(3);
      // No animationend is dispatched: with reduced motion nothing animates,
      // so nothing would fire it.
      queryControls<HTMLButtonElement>(el, '.next')!.click();
      await settle(el);
      expect(counterText(el)).toBe('2 / 3');
      expect(currentSrc(el)).toContain('photo2.jpg');
    });

    test('does not apply the sliding classes', async () => {
      setReducedMotion(true);
      const el = await viewerWith(3);
      queryControls<HTMLButtonElement>(el, '.next')!.click();
      await settle(el);
      const track = el.shadowRoot?.querySelector('.slide-track');
      expect(track?.classList.contains('sliding-next')).toBe(false);
      expect(track?.classList.contains('sliding-prev')).toBe(false);
    });

    test('never shows the wrap glow, which has no animationend to clear it', async () => {
      setReducedMotion(true);
      const el = await viewerWith(2);
      queryControls<HTMLButtonElement>(el, '.prev')!.click();
      await settle(el);
      expect(el.shadowRoot?.querySelector('.wrap-glow')).to.not.exist;
    });

    test('still reports the image it landed on', async () => {
      setReducedMotion(true);
      const el = await viewerWith(3);
      const changed = vi.fn();
      el.addEventListener('imageChanged', changed);
      queryControls<HTMLButtonElement>(el, '.next')!.click();
      await settle(el);
      expect(changed).toHaveBeenCalledOnce();
    });
  });

  describe('imageChanged', () => {
    test('fires with the image and index once a move lands', async () => {
      const el = await viewerWith(3);
      const changed = vi.fn();
      el.addEventListener('imageChanged', changed);

      await navigateAndSettle(el, queryControls(el, '.next')!);

      expect(changed).toHaveBeenCalledOnce();
      const detail = changed.mock.calls[0][0].detail;
      expect(detail.index).toBe(1);
      expect(detail.image.name).toBe('photo2.jpg');
    });

    test('does not fire on the initial render', async () => {
      const changed = vi.fn();
      const el = await fixture<IAImageViewer>(
        html`<ia-image-viewer
          .images=${makeImages(3)}
          @imageChanged=${changed}
        ></ia-image-viewer>`,
      );
      await settle(el);
      expect(changed).not.toHaveBeenCalled();
    });

    test('fires going backward too', async () => {
      const el = await viewerWith(3);
      const changed = vi.fn();
      el.addEventListener('imageChanged', changed);
      await navigateAndSettle(el, queryControls(el, '.prev')!);
      expect(changed.mock.calls[0][0].detail.image.name).toBe('photo3.jpg');
    });
  });

  describe('currentImageName', () => {
    test('starts on the named image', async () => {
      const el = await viewerWith(3, { currentImageName: 'photo3.jpg' });
      expect(currentSrc(el)).toContain('photo3.jpg');
      expect(counterText(el)).toBe('3 / 3');
    });

    test('falls back to the first image when the name matches nothing', async () => {
      const el = await viewerWith(3, { currentImageName: 'nope.jpg' });
      expect(currentSrc(el)).toContain('photo1.jpg');
    });
  });

  describe('image link', () => {
    test('links to the full-size image in a new tab', async () => {
      const el = await viewerWith(1);
      const link = querySlide<HTMLAnchorElement>(el, '.image-link');
      expect(link?.getAttribute('href')).toBe(
        'https://example.test/photo1.jpg',
      );
      expect(link?.getAttribute('target')).toBe('_blank');
      expect(link?.getAttribute('rel')).toContain('noopener');
    });

    test('uses the title for alt text when there is one', async () => {
      const images: ImageViewerImage[] = [
        {
          name: 'photo.jpg',
          url: 'https://example.test/photo.jpg',
          title: 'A nice photo',
        },
      ];
      const el = await fixture<IAImageViewer>(
        html`<ia-image-viewer .images=${images}></ia-image-viewer>`,
      );
      expect(querySlide(el, '.main-image')?.getAttribute('alt')).toBe(
        'A nice photo',
      );
    });

    test('falls back to the name for alt text', async () => {
      const el = await viewerWith(1);
      expect(querySlide(el, '.main-image')?.getAttribute('alt')).toBe(
        'photo1.jpg',
      );
    });

    test('fires a cancelable imageActivated on click', async () => {
      const el = await viewerWith(1);
      const activated = vi.fn((e: Event) => e.preventDefault());
      el.addEventListener('imageActivated', activated);

      const link = querySlide<HTMLAnchorElement>(el, '.image-link')!;
      const click = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
      link.dispatchEvent(click);

      expect(activated).toHaveBeenCalledOnce();
      expect(click.defaultPrevented).toBe(true);
    });
  });

  describe('touch swipe', () => {
    test('swiping left goes to the next image', async () => {
      const el = await viewerWith(3);
      await swipe(el, -areaWidth(el) * 0.4);
      expect(counterText(el)).toBe('2 / 3');
    });

    test('swiping right goes to the previous image', async () => {
      const el = await viewerWith(2);
      await swipe(el, areaWidth(el) * 0.4);
      expect(counterText(el)).toBe('2 / 2');
    });

    test('a short swipe snaps back without navigating', async () => {
      const el = await viewerWith(3);
      await swipe(el, -20);
      expect(counterText(el)).toBe('1 / 3');
    });

    test('a vertical drag is left alone', async () => {
      const el = await viewerWith(3);
      await swipe(el, -20, 200);
      expect(counterText(el)).toBe('1 / 3');
    });

    test('inserts neighbouring slides during the drag', async () => {
      const el = await viewerWith(3);
      const area = el.shadowRoot?.querySelector('.image-area') as HTMLElement;
      const touch = (x: number): Touch =>
        new Touch({ identifier: 0, target: area, clientX: x, clientY: 200 });

      area.dispatchEvent(
        new TouchEvent('touchstart', { bubbles: true, touches: [touch(300)] }),
      );
      area.dispatchEvent(
        new TouchEvent('touchmove', {
          bubbles: true,
          cancelable: true,
          touches: [touch(280)],
        }),
      );

      const track = el.shadowRoot?.querySelector('.slide-track') as HTMLElement;
      expect(track.querySelectorAll('ia-imgview-slide').length).toBe(3);
      expect(track.querySelectorAll('[data-drag-slide]').length).toBe(2);
      expect(track.classList.contains('dragging')).toBe(true);
    });

    test('reports the image a swipe lands on', async () => {
      const el = await viewerWith(3);
      const changed = vi.fn();
      el.addEventListener('imageChanged', changed);
      await swipe(el, -areaWidth(el) * 0.4);
      expect(changed.mock.calls[0][0].detail.image.name).toBe('photo2.jpg');
    });
  });

  describe('failed image loads', () => {
    test('shows a failure message instead of a spinner', async () => {
      const el = await viewerWith(2);
      expect(querySlide(el, '.image-failed')).to.not.exist;

      await failImage(el, 'photo1.jpg');

      expect(querySlide(el, '.image-failed')).to.exist;
      expect(querySlide(el, '.image-link.failed')).to.exist;
      expect(querySlide(el, '.main-image.loaded')).to.not.exist;
    });

    test('fires imageLoadFailed with the image that failed', async () => {
      const el = await viewerWith(2);
      const failed = vi.fn();
      el.addEventListener('imageLoadFailed', failed);

      await failImage(el, 'photo1.jpg');

      expect(failed).toHaveBeenCalledOnce();
      expect(failed.mock.calls[0][0].detail.image.name).toBe('photo1.jpg');
    });

    test('fires imageLoaded when an image loads', async () => {
      const el = await viewerWith(1);
      const loaded = vi.fn();
      el.addEventListener('imageLoaded', loaded);

      querySlide(el, '.main-image')?.dispatchEvent(new Event('load'));
      await settle(el);

      expect(loaded).toHaveBeenCalledOnce();
      expect(loaded.mock.calls[0][0].detail.image.name).toBe('photo1.jpg');
    });

    test('clears the message when a retry loads', async () => {
      const el = await viewerWith(2);
      await failImage(el, 'photo1.jpg');
      expect(querySlide(el, '.image-failed')).to.exist;

      querySlide(
        el,
        'img.main-image[data-image-name="photo1.jpg"]',
      )?.dispatchEvent(new Event('load'));
      await settle(el);

      expect(querySlide(el, '.image-failed')).to.not.exist;
      expect(querySlide(el, '.image-link.failed')).to.not.exist;
    });

    test('drops the loaded state when the next image fails', async () => {
      const el = await viewerWith(2);
      querySlide(el, 'img.main-image')?.dispatchEvent(new Event('load'));
      await settle(el);
      expect(querySlide(el, 'img.main-image.loaded')).to.exist;

      await navigateAndSettle(el, queryControls(el, '.next')!);
      await failImage(el, 'photo2.jpg');

      expect(querySlide(el, '.image-failed')).to.exist;
      expect(querySlide(el, 'img.main-image.loaded')).to.not.exist;
    });

    test('leaves the other images navigable', async () => {
      const el = await viewerWith(2);
      await failImage(el, 'photo1.jpg');
      await navigateAndSettle(el, queryControls(el, '.next')!);

      expect(counterText(el)).toBe('2 / 2');
      expect(querySlide(el, '.image-failed')).to.not.exist;
    });

    test('reports a broken image once, not on every pass over it', async () => {
      const el = await viewerWith(2);
      const failed = vi.fn();
      el.addEventListener('imageLoadFailed', failed);

      await failImage(el, 'photo1.jpg');
      // Away and back. The slide is recreated, so `error` fires again.
      await navigateAndSettle(el, queryControls(el, '.next')!);
      await navigateAndSettle(el, queryControls(el, '.next')!);
      await failImage(el, 'photo1.jpg');

      expect(failed).toHaveBeenCalledOnce();
    });

    test('reports again after a retry loads and the image breaks once more', async () => {
      const el = await viewerWith(2);
      const failed = vi.fn();
      el.addEventListener('imageLoadFailed', failed);

      await failImage(el, 'photo1.jpg');
      querySlide(
        el,
        'img.main-image[data-image-name="photo1.jpg"]',
      )?.dispatchEvent(new Event('load'));
      await settle(el);
      await failImage(el, 'photo1.jpg');

      expect(failed).toHaveBeenCalledTimes(2);
    });

    test('reports again for a new image set using the same name', async () => {
      const el = await viewerWith(2);
      const failed = vi.fn();
      el.addEventListener('imageLoadFailed', failed);

      await failImage(el, 'photo1.jpg');

      // A different item, whose photo1.jpg is a different file.
      el.images = [
        { name: 'photo1.jpg', url: 'https://example.test/other/photo1.jpg' },
        { name: 'photo2.jpg', url: 'https://example.test/other/photo2.jpg' },
      ];
      await settle(el);
      await failImage(el, 'photo1.jpg');

      expect(failed).toHaveBeenCalledTimes(2);
    });
  });

  describe('gesture listeners follow the image area', () => {
    test('swipe still works after the image list empties and refills', async () => {
      const el = await viewerWith(3);
      await swipe(el, -areaWidth(el) * 0.4);
      expect(counterText(el)).toBe('2 / 3');

      // An empty list tears the image area down; refilling renders a new one.
      el.images = [];
      await settle(el);
      expect(el.shadowRoot?.querySelector('.image-area')).to.not.exist;

      el.images = makeImages(3);
      await settle(el);

      await swipe(el, -areaWidth(el) * 0.4);
      expect(counterText(el)).toBe('2 / 3');
    });

    test('swipe still works after the viewer is moved in the DOM', async () => {
      const el = await viewerWith(3);
      const parent = el.parentElement!;

      el.remove();
      parent.appendChild(el);
      await settle(el);

      await swipe(el, -areaWidth(el) * 0.4);
      expect(counterText(el)).toBe('2 / 3');
    });
  });

  describe('already-resolved images', () => {
    test('paints an image the browser had already cached', async () => {
      const el = await viewerWith(2);
      const img = querySlide<HTMLImageElement>(el, '.main-image')!;
      Object.defineProperty(img, 'complete', {
        value: true,
        configurable: true,
      });
      Object.defineProperty(img, 'naturalWidth', {
        value: 800,
        configurable: true,
      });

      const slide = slideElements(el)[0];
      slide.requestUpdate();
      await slide.updateComplete;
      // The check runs in updated(), so recording the load schedules a further
      // update, and that's the one that paints the image.
      await slide.updateComplete;

      expect(img.classList.contains('loaded')).toBe(true);
    });

    test('treats a complete image with no dimensions as failed', async () => {
      const el = await viewerWith(2);
      const img = querySlide<HTMLImageElement>(el, '.main-image')!;
      Object.defineProperty(img, 'complete', {
        value: true,
        configurable: true,
      });
      Object.defineProperty(img, 'naturalWidth', {
        value: 0,
        configurable: true,
      });

      const slide = slideElements(el)[0];
      slide.requestUpdate();
      await slide.updateComplete;
      await slide.updateComplete;

      expect(querySlide(el, '.image-failed')).to.exist;
      expect(querySlide(el, '.main-image.loaded')).to.not.exist;
    });
  });

  describe('accessibility', () => {
    test('announces the current image in a live region', async () => {
      const el = await viewerWith(3);
      const live = el.shadowRoot?.querySelector('[aria-live]');
      expect(live?.getAttribute('aria-live')).toBe('polite');
      expect(live?.textContent?.trim()).toContain('Image 1 of 3');
    });

    test('updates the announcement as the viewer moves', async () => {
      const el = await viewerWith(3);
      await navigateAndSettle(el, queryControls(el, '.next')!);
      const live = el.shadowRoot?.querySelector('[aria-live]');
      expect(live?.textContent?.trim()).toContain('Image 2 of 3');
    });

    test('includes the image title in the announcement', async () => {
      const images: ImageViewerImage[] = [
        { name: 'a.png', url: 'https://example.test/a.png', title: 'Sunrise' },
      ];
      const el = await fixture<IAImageViewer>(
        html`<ia-image-viewer .images=${images}></ia-image-viewer>`,
      );
      const live = el.shadowRoot?.querySelector('[aria-live]');
      expect(live?.textContent?.trim()).toContain('Sunrise');
    });

    test('labels the nav buttons', async () => {
      const el = await viewerWith(3);
      expect(queryControls(el, '.prev')?.getAttribute('aria-label')).toBe(
        'Previous image',
      );
      expect(queryControls(el, '.next')?.getAttribute('aria-label')).toBe(
        'Next image',
      );
    });

    test('keeps the image area swipeable without blocking vertical scroll', async () => {
      const el = await viewerWith(2);
      const area = el.shadowRoot?.querySelector('.image-area') as HTMLElement;
      expect(getComputedStyle(area).touchAction).toBe('pan-y pinch-zoom');
    });
  });

  describe('preloading', () => {
    test('does not preload with a single image', async () => {
      const el = await viewerWith(1);
      // Nothing to preload around, so the viewer should leave the set alone.
      expect(querySlideAll(el, '.main-image').length).toBe(1);
    });
  });
});
