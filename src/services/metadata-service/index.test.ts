import { describe, expect, it } from 'vitest';
import * as metadataService from './index';

describe('metadata-service entry point', () => {
  it('exports the service, the backend, the response and the item models', () => {
    for (const name of [
      'MetadataService',
      'DefaultMetadataBackend',
      'MetadataResponse',
      'MetadataServiceError',
      'MetadataServiceErrorType',
      'File',
      'Review',
    ]) {
      expect(metadataService, name).to.have.property(name);
    }
  });

  it('keeps the error type values consumers compare against', () => {
    expect(metadataService.MetadataServiceErrorType.networkError).to.equal(
      'MetadataService.NetworkError',
    );
  });
});
