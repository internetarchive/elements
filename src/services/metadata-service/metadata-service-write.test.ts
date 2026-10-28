/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';

import { Result } from '../result-type/result-type';
import { MetadataBackendInterface } from './backend/metadata-backend-interface';
import { MetadataService } from './metadata-service';
import type { MetadataServiceInterface } from './metadata-service-interface';
import type { MetadataResponse } from './responses/metadata-response';
import {
  MetadataServiceError,
  MetadataServiceErrorType,
} from './metadata-service-error';
import type { MetadataPatchOperation } from './metadata-patch';

class WritableMockBackend implements MetadataBackendInterface {
  current: Record<string, unknown> = {};

  readError?: MetadataServiceError;

  writeError?: MetadataServiceError;

  writes: { identifier: string; target: string; patch: any[] }[] = [];

  async fetchMetadata(
    _identifier: string,
    keypath?: string,
  ): Promise<Result<any, MetadataServiceError>> {
    if (this.readError) return { error: this.readError };
    if (keypath !== 'metadata') return { success: {} };
    return { success: { result: this.current } };
  }

  async writeMetadata(
    identifier: string,
    target: string,
    patch: MetadataPatchOperation[],
  ): Promise<Result<any, MetadataServiceError>> {
    if (this.writeError) return { error: this.writeError };
    this.writes.push({ identifier, target, patch });
    return { success: { success: true, task_id: 42 } };
  }
}

describe('MetadataService writes', () => {
  describe('patchMetadata', () => {
    it('sends the patch to the metadata target by default', async () => {
      const backend = new WritableMockBackend();
      const service = new MetadataService(backend);
      const patch = [{ op: 'remove' as const, path: '/notes' }];

      const result = await service.patchMetadata('foo', patch);

      expect(result.success).to.deep.equal({ changed: true, taskId: 42 });
      expect(backend.writes).to.deep.equal([
        { identifier: 'foo', target: 'metadata', patch },
      ]);
    });

    it('passes a backend error through', async () => {
      const backend = new WritableMockBackend();
      backend.writeError = new MetadataServiceError(
        MetadataServiceErrorType.writeError,
        'nope',
      );
      const service = new MetadataService(backend);

      const result = await service.patchMetadata('foo', []);

      expect(result.error?.message).to.equal('nope');
    });

    it('reports writeNotSupported for a backend without writes', async () => {
      const readOnlyBackend: MetadataBackendInterface = {
        fetchMetadata: async () => ({ success: {} }),
      };
      const service = new MetadataService(readOnlyBackend);

      const result = await service.patchMetadata('foo', []);

      expect(result.error?.type).to.equal(
        MetadataServiceErrorType.writeNotSupported,
      );
    });
  });

  describe('updateMetadataField', () => {
    it('replaces a field MDAPI has', async () => {
      const backend = new WritableMockBackend();
      backend.current = { title: 'Old' };
      const service = new MetadataService(backend);

      const result = await service.updateMetadataField('foo', 'title', 'New');

      expect(result.success).to.deep.equal({ changed: true, taskId: 42 });
      expect(backend.writes[0].patch).to.deep.equal([
        { op: 'replace', path: '/title', value: 'New' },
      ]);
    });

    it('adds a field MDAPI does not have', async () => {
      const backend = new WritableMockBackend();
      backend.current = { title: 'T' };
      const service = new MetadataService(backend);

      await service.updateMetadataField('foo', 'volume', ['2']);

      expect(backend.writes[0].patch).to.deep.equal([
        { op: 'add', path: '/volume', value: '2' },
      ]);
    });

    it('skips the write when MDAPI already has the value', async () => {
      const backend = new WritableMockBackend();
      backend.current = { subject: ['a', 'b'] };
      const service = new MetadataService(backend);

      const result = await service.updateMetadataField('foo', 'subject', [
        'a',
        'b',
      ]);

      expect(result.success).to.deep.equal({ changed: false });
      expect(backend.writes).to.be.empty;
    });

    it('returns the read error without writing', async () => {
      const backend = new WritableMockBackend();
      backend.readError = new MetadataServiceError(
        MetadataServiceErrorType.searchEngineError,
        "Couldn't locate item 'foo'",
      );
      const service = new MetadataService(backend);

      const result = await service.updateMetadataField('foo', 'title', 'New');

      expect(result.error?.message).to.equal("Couldn't locate item 'foo'");
      expect(backend.writes).to.be.empty;
    });
  });
});

describe('MetadataServiceInterface', () => {
  it('can be implemented without the write methods', async () => {
    const readOnly: MetadataServiceInterface = {
      fetchMetadata: async () => ({ success: {} as MetadataResponse }),
      fetchMetadataValue: async () => ({ success: {} as any }),
    };
    const result = await readOnly.fetchMetadata('foo');
    expect(result.success).to.exist;
  });
});
