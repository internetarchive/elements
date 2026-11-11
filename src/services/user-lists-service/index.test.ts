import { describe, expect, it } from 'vitest';
import * as userListsService from './index';

describe('user-lists-service entry point', () => {
  it('exports the service and its error', () => {
    for (const name of [
      'UserListsService',
      'UserListsError',
      'UserListsErrorReason',
    ]) {
      expect(userListsService, name).to.have.property(name);
    }
  });
});
