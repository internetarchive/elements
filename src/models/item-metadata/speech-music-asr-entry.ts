/**
 * This is the format used for radio transcripts
 */
export type SpeechMusicASREntry = {
  readonly end: number;
  readonly id: number;
  readonly is_music: boolean;
  readonly start: number;
  readonly text: string;
};
