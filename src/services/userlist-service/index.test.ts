import { describe, expect, it } from 'vitest';
import * as userListService from './index';

describe('userlist-service entry point', () => {
  it('exports the service and its error', () => {
    for (const name of [
      'UserListService',
      'UserListError',
      'UserListErrorReason',
    ]) {
      expect(userListService, name).to.have.property(name);
    }
  });
});
