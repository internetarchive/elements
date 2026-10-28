export { MetadataResponse } from './responses/metadata-response';
export type {
  AlternateLocation,
  AlternateLocations,
} from './responses/metadata-response';

export { File, Review, runningTask } from '../item-metadata/item-metadata';
export type {
  SpeechMusicASREntry,
  Task,
  TaskColor,
  TaskStatus,
} from '../item-metadata/item-metadata';

export { DefaultMetadataBackend } from './backend/default-metadata-backend';
export { MetadataService } from './metadata-service';
export {
  MetadataServiceError,
  MetadataServiceErrorType,
} from './metadata-service-error';
export type {
  MetadataServiceInterface,
  MetadataWritableServiceInterface,
  MetadataWriteResult,
} from './metadata-service-interface';
export { buildMetadataFieldPatch } from './metadata-patch';
export type {
  MetadataFieldValue,
  MetadataPatchOperation,
} from './metadata-patch';
