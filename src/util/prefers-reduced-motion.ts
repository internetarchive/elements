/**
 * Whether the user has asked the system for reduced motion.
 *
 * Read at the moment an animation would start rather than cached, so changing
 * the system setting takes effect without a reload. CSS handles the purely
 * decorative animations on its own; this is for the places where JavaScript
 * schedules or waits on one.
 */
export function prefersReducedMotion(): boolean {
  return (
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  );
}
