/** Reasons the service can produce an error */
export const UserListsErrorReason = {
  NETWORK: 'failed to connect to user lists backend service',
  BAD_RESPONSE: 'malformed response from backend',
  USER_NOT_FOUND: 'user with the given id was not found',
  LIST_NOT_FOUND: 'user list with the given id was not found',
  LIST_MEMBER_NOT_FOUND: 'user list member with the given id was not found',
  ITEM_NOT_TOUND: 'item with the given id was not found',
} as const;

export type UserListsErrorReason =
  (typeof UserListsErrorReason)[keyof typeof UserListsErrorReason];

/** Typed error for user lists service results */
export class UserListsError extends Error {
  // Note that `reason` is an additional property of this subclass, not recognized by the Error superclass.
  reason: UserListsErrorReason;

  constructor(
    reason: UserListsErrorReason,
    message?: string,
    options?: { cause?: unknown },
  ) {
    // @ts-expect-error (to permit the second argument, which is well-supported but tsc dislikes for some reason)
    super(message, options);
    this.reason = reason;
  }
}
