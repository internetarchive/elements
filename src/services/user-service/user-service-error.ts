export const UserServiceErrorType = {
  userNotLoggedIn: 'UserService.userNotLoggedIn',
  networkError: 'UserService.networkError',
  decodingError: 'UserService.decodingError',
} as const;

export type UserServiceErrorType =
  (typeof UserServiceErrorType)[keyof typeof UserServiceErrorType];

export class UserServiceError extends Error {
  type: UserServiceErrorType;

  constructor(type: UserServiceErrorType, message?: string) {
    super(message);
    this.name = type;
    this.type = type;
  }
}
