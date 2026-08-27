/**
 * Formats a number of seconds as a playback timestamp.
 *
 * Minutes and seconds always appear; hours only once there are any. Seconds are
 * always two digits, and minutes are padded to two only when an hour is shown,
 * so short tracks read as `0:35` rather than `00:35`.
 *
 * Returns an empty string for anything that isn't a usable number, so a
 * timestamp bound to a duration the browser hasn't worked out yet renders as
 * nothing rather than `NaN:NaN`.
 */
export function formatDuration(seconds: number): string {
  if (typeof seconds !== 'number' || !Number.isFinite(seconds)) return '';

  const wholeSeconds = Math.max(0, Math.floor(seconds));

  const hours = Math.floor(wholeSeconds / 3600);
  const minutes = Math.floor(wholeSeconds / 60) % 60;
  const remainingSeconds = wholeSeconds % 60;

  const secondsPart = String(remainingSeconds).padStart(2, '0');
  if (hours === 0) return `${minutes}:${secondsPart}`;

  const minutesPart = String(minutes).padStart(2, '0');
  return `${hours}:${minutesPart}:${secondsPart}`;
}
