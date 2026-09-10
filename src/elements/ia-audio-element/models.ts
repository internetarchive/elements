/**
 * A single playable source for an `<ia-audio-element>`.
 *
 * Sources are offered to the browser in order, and the browser picks the first
 * one it can decode, so list the preferred format first.
 */
export interface AudioSource {
  /** The URL of the audio file. */
  url: string;

  /** The MIME type of the audio file, e.g. `audio/mpeg`. */
  mimetype: string;
}
