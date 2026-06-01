import { File } from '@src/models/item-metadata/file';
import { Metadata } from '@src/models/item-metadata/metadata';
import { Review } from '@src/models/item-metadata/review';
import type { SpeechMusicASREntry } from '@src/models/item-metadata/speech-music-asr-entry';

/**
 * The main top-level reponse when fetching Metadata
 *
 * @export
 * @class MetadataResponse
 */
export class MetadataResponse {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  readonly rawResponse: Readonly<Record<string, any>>;

  readonly created: number;

  readonly d1: string;

  readonly d2: string;

  readonly dir: string;

  readonly files: File[];

  readonly files_count: number;

  readonly item_last_updated: number;

  readonly item_size: number;

  readonly metadata: Metadata;

  readonly server: string;

  readonly uniq: number;

  readonly workable_servers: string[];

  readonly speech_vs_music_asr?: SpeechMusicASREntry[];

  readonly reviews?: Review[];

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  constructor(json: Record<string, any>) {
    this.rawResponse = json;
    this.created = json.created;
    this.d1 = json.d1;
    this.d2 = json.d2;
    this.dir = json.dir;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    this.files = json.files?.map((file: Record<string, any>) => new File(file));
    this.files_count = json.files_count;
    this.item_last_updated = json.item_last_updated;
    this.item_size = json.item_size;
    this.metadata = new Metadata(json.metadata);
    this.server = json.server;
    this.uniq = json.uniq;
    this.workable_servers = json.workable_servers;
    this.speech_vs_music_asr = json.speech_vs_music_asr;
    this.reviews = json.reviews?.map(
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      (entry: Record<string, any>) => new Review(entry),
    );
  }
}
