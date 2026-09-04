/**
 * One image the viewer can show.
 *
 * Deliberately plain data. The viewer doesn't know where the images come from
 * or how their URLs were built, so a host can feed it archive.org derivatives,
 * a local directory listing, or anything else.
 */
export type ImageViewerImage = {
  /** Identifies the image within the set. Used as the key in change events. */
  name: string;

  /** Where to load the image from, and where the link points. */
  url: string;

  /** Alt text. Falls back to `name` when absent. */
  title?: string;
};

/** Which way the viewer is moving through the set. */
export type SlideDirection = 'next' | 'prev';

/** Which edge the viewer just wrapped around. */
export type WrapEdge = 'start' | 'end';
