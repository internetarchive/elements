import type { ReactiveController, ReactiveControllerHost } from 'lit';

import { prefersReducedMotion } from '@src/util/prefers-reduced-motion';
import type { SlideDirection } from './models';

/** What the gesture controller needs from the viewer it drives. */
export type ImageViewerGestureHost = ReactiveControllerHost & {
  readonly imageCount: number;

  readonly currentIndex: number;

  /** The element gestures are tracked against, once it has rendered. */
  readonly imageArea?: HTMLElement;

  /** The element a drag translates. */
  readonly slideTrack?: HTMLElement;

  /** Commits an in-flight slide animation so a new one starts from rest. */
  settleIfAnimating(): void;

  showNext(): void;

  showPrevious(): void;

  preloadAroundIndex(index: number): void;

  /** Adds the neighbouring slides a drag reveals on either side. */
  insertDragSlides(): void;

  removeDragSlides(): void;

  /** Advances to the neighbouring image a completed drag landed on. */
  commitDrag(direction: SlideDirection): void;
};

/** Minimum horizontal travel before a gesture counts as a swipe at all */
const SWIPE_THRESHOLD = 30;

/** Minimum swipe distance (fraction of width) to commit navigation */
const SWIPE_COMMIT_FRACTION = 0.25;

/** Minimum velocity (px/ms) for a flick to commit regardless of distance */
const SWIPE_FLICK_VELOCITY = 0.3;

/** Longest the track takes to settle after the finger lifts */
const SETTLE_MAX_MS = 300;

/** How long a snap-back takes when the swipe didn't go far enough */
const SNAP_BACK_MS = 200;

/** Horizontal wheel travel that adds up to one navigation */
const WHEEL_THRESHOLD = 80;

/** How long after an animation to keep ignoring wheel inertia */
const WHEEL_COOLDOWN_MS = 300;

/** How far a finger travels before the gesture locks in as horizontal */
const SWIPE_LOCK_DISTANCE = 10;

/**
 * Touch, wheel and keyboard navigation for the image viewer.
 *
 * A drag is driven imperatively: it translates the track directly and asks the
 * viewer to insert neighbouring slides by hand, because a re-render mid-gesture
 * would replace the element the touch started on and the browser would fire
 * touchcancel.
 */
export class ImageViewerGestures implements ReactiveController {
  /** Whether a drag is in progress. The viewer reads this while rendering. */
  dragging = false;

  private host: ImageViewerGestureHost;

  /**
   * The element the touch and wheel listeners are currently on, so they can
   * follow the image area when it's replaced. A boolean wouldn't: the area is
   * removed whenever the image list empties, and a later refill renders a
   * different element.
   */
  private listeningTo: HTMLElement | null = null;

  private touchStartX: number | null = null;

  private touchStartY: number | null = null;

  private touchStartTime = 0;

  /** Whether the current gesture has locked in as a horizontal swipe */
  private swiping = false;

  /** Set when a swipe completes, so the tap it ends on doesn't open the image */
  private swipeHandled = false;

  private dragOffsetX = 0;

  private wheelDeltaX = 0;

  private wheelAnimating = false;

  private wheelAnimationEndTime = 0;

  constructor(host: ImageViewerGestureHost) {
    this.host = host;
    host.addController(this);
  }

  hostConnected(): void {
    document.addEventListener('keydown', this.onKeydown);
    // Reconnecting doesn't schedule an update, so the gesture listeners have
    // to be put back here rather than waiting for one.
    this.attachListeners();
  }

  hostUpdated(): void {
    this.attachListeners();
  }

  hostDisconnected(): void {
    document.removeEventListener('keydown', this.onKeydown);
    this.detachListeners();
  }

  /**
   * Whether a swipe just ended on this tap, meaning the click that follows it
   * should be ignored rather than treated as opening the image.
   */
  consumeSwipeTap(): boolean {
    if (!this.swipeHandled) return false;
    this.swipeHandled = false;
    return true;
  }

  /** Lets wheel navigation resume once a slide animation has finished. */
  animationSettled(): void {
    this.wheelAnimating = false;
    this.wheelAnimationEndTime = performance.now();
    this.wheelDeltaX = 0;
  }

  /**
   * Points the gesture listeners at the current image area, moving them off
   * the previous one. The area isn't rendered until there are images to show,
   * and it's torn down and rebuilt whenever the list empties and refills, so
   * this runs on every update and re-attaches whenever the element changes.
   */
  private attachListeners(): void {
    const area = this.host.imageArea;
    if (area === this.listeningTo) return;
    this.detachListeners();
    if (!area) return;

    this.listeningTo = area;
    area.addEventListener('touchstart', this.onTouchStart, { passive: true });
    area.addEventListener('touchmove', this.onTouchMove, { passive: false });
    area.addEventListener('touchend', this.onTouchEnd, { passive: true });
    area.addEventListener('wheel', this.onWheel, { passive: false });
  }

  private detachListeners(): void {
    const area = this.listeningTo;
    if (!area) return;
    area.removeEventListener('touchstart', this.onTouchStart);
    area.removeEventListener('touchmove', this.onTouchMove);
    area.removeEventListener('touchend', this.onTouchEnd);
    area.removeEventListener('wheel', this.onWheel);
    this.listeningTo = null;
  }

  private onTouchStart = (e: TouchEvent): void => {
    if (this.host.imageCount <= 1) return;
    this.host.settleIfAnimating();
    const touch = e.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
    this.touchStartTime = e.timeStamp;
    this.swiping = false;
    this.dragOffsetX = 0;
  };

  private onTouchMove = (e: TouchEvent): void => {
    if (this.touchStartX === null || this.touchStartY === null) return;
    const dx = e.touches[0].clientX - this.touchStartX;
    const dy = e.touches[0].clientY - this.touchStartY;

    const locksHorizontal =
      Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_LOCK_DISTANCE;
    if (!this.swiping && locksHorizontal) {
      this.swiping = true;
      this.dragging = true;
      this.host.preloadAroundIndex(this.host.currentIndex);
      this.host.insertDragSlides();
    }

    if (!this.swiping) return;
    e.preventDefault();

    this.dragOffsetX = dx;
    this.applyDragTransform();
  };

  private onTouchEnd = (e: TouchEvent): void => {
    if (this.touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - this.touchStartX;
    const elapsed = e.timeStamp - this.touchStartTime;
    this.touchStartX = null;
    this.touchStartY = null;

    if (!this.swiping) return;
    this.swiping = false;

    const track = this.host.slideTrack;
    const area = this.host.imageArea;
    if (!track || !area) {
      this.dragging = false;
      return;
    }

    const width = area.offsetWidth;
    const velocity = Math.abs(dx) / Math.max(elapsed, 1);
    const pastThreshold = Math.abs(dx) > width * SWIPE_COMMIT_FRACTION;
    const flicked = velocity > SWIPE_FLICK_VELOCITY;
    const shouldCommit =
      (pastThreshold || flicked) && Math.abs(dx) >= SWIPE_THRESHOLD;
    const direction: SlideDirection = dx < 0 ? 'next' : 'prev';

    this.swipeHandled = true;

    // The rest of the way is proportional to how far the finger already got,
    // so a nearly complete swipe finishes almost instantly.
    const remainingFraction = (width - Math.abs(dx)) / width;
    const completionDuration = shouldCommit
      ? Math.round(
          Math.max(
            100,
            Math.min(SETTLE_MAX_MS, remainingFraction * SETTLE_MAX_MS),
          ),
        )
      : SNAP_BACK_MS;

    const finalTransform = !shouldCommit
      ? 'translateX(-100%)'
      : direction === 'next'
        ? 'translateX(-200%)'
        : 'translateX(0%)';

    const finish = (): void => {
      track.style.transition = '';
      track.style.transform = '';

      if (shouldCommit) this.host.commitDrag(direction);

      this.dragging = false;
      this.dragOffsetX = 0;
      // Remove the hand-inserted slides before the viewer renders, since it
      // doesn't track them and would leave them in the track.
      this.host.removeDragSlides();
      this.host.preloadAroundIndex(this.host.currentIndex);
      this.host.requestUpdate();
    };

    // With reduced motion there's nothing to transition, and a zero-duration
    // transition doesn't fire transitionend, so settle straight away rather
    // than waiting on the timeout that would otherwise cover for it.
    if (prefersReducedMotion()) {
      track.style.transform = finalTransform;
      finish();
      return;
    }

    track.style.transition = `transform ${completionDuration}ms ease-out`;
    track.style.transform = finalTransform;

    let settled = false;
    const onTransitionDone = (): void => {
      if (settled) return;
      settled = true;
      track.removeEventListener('transitionend', onTransitionDone);
      finish();
    };

    track.addEventListener('transitionend', onTransitionDone);
    // Fallback in case transitionend doesn't fire
    setTimeout(onTransitionDone, completionDuration + 50);
  };

  /** Applies the drag offset to the track during touch gestures. */
  private applyDragTransform(): void {
    const track = this.host.slideTrack;
    if (!this.dragging || !track) return;
    track.style.transform = `translateX(calc(-100% + ${this.dragOffsetX}px))`;
  }

  private onWheel = (e: WheelEvent): void => {
    if (this.host.imageCount <= 1) return;

    // Ignore vertical-dominant scrolls
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return;
    if (e.deltaX === 0) return;

    e.preventDefault();

    // Block during animation and for a brief cooldown after to absorb inertia
    const inCooldown =
      performance.now() - this.wheelAnimationEndTime < WHEEL_COOLDOWN_MS;
    if (this.wheelAnimating || inCooldown) {
      this.wheelDeltaX = 0;
      return;
    }

    this.wheelDeltaX += e.deltaX;
    if (Math.abs(this.wheelDeltaX) < WHEEL_THRESHOLD) return;

    const forward = this.wheelDeltaX > 0;
    this.wheelDeltaX = 0;
    this.wheelAnimating = true;
    if (forward) this.host.showNext();
    else this.host.showPrevious();
  };

  private onKeydown = (e: KeyboardEvent): void => {
    if (this.host.imageCount <= 1) return;
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
    if (target.isContentEditable) return;
    if (e.key === 'ArrowLeft') this.host.showPrevious();
    else if (e.key === 'ArrowRight') this.host.showNext();
  };
}
