export { MetadataResponse } from './responses/metadata-response';
export type {
  AlternateLocation,
  AlternateLocations,
} from './responses/metadata-response';

export { File, Review } from '../item-metadata/item-metadata';
export type { SpeechMusicASREntry } from '../item-metadata/item-metadata';

export { DefaultMetadataBackend } from './backend/default-metadata-backend';
export { MetadataService } from './metadata-service';
export {
  MetadataServiceError,
  MetadataServiceErrorType,
} from './metadata-service-error';
export type { MetadataServiceInterface } from './metadata-service-interface';
