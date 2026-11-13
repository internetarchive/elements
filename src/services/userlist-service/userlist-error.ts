/** Reasons the service can produce an error */
export const UserListErrorReason = {
  NETWORK: 'failed to connect to userlist backend service',
  BAD_RESPONSE: 'malformed response from backend',
  USER_NOT_FOUND: 'user with the given id was not found',
  LIST_NOT_FOUND: 'user list with the given id was not found',
  LIST_MEMBER_NOT_FOUND: 'user list member with the given id was not found',
  ITEM_NOT_TOUND: 'item with the given id was not found',
} as const;

export type UserListErrorReason =
  (typeof UserListErrorReason)[keyof typeof UserListErrorReason];

/** Typed error for userlist service results */
export class UserListError extends Error {
  // Note that `reason` is an additional property of this subclass, not recognized by the Error superclass.
  reason: UserListErrorReason;

  constructor(
    reason: UserListErrorReason,
    message?: string,
    options?: { cause?: unknown },
  ) {
    // @ts-expect-error (to permit the second argument, which is well-supported but tsc dislikes for some reason)
    super(message, options);
    this.reason = reason;
  }
}
