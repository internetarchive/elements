import { UserImageInfoResponse, UserResponse } from './models/response';
import { User } from './models/user';

export function getMockApiResponseFromString(body = '', status = 200) {
  return new window.Response(body, {
    status,
    headers: { 'Content-type': 'application/json' },
  });
}

export function getMockApiResponseFromObject(body = {}, status = 200) {
  return getMockApiResponseFromString(JSON.stringify(body), status);
}

export const mockUserImageInfoResponse: UserImageInfoResponse = {
  name: 'foo.jpg',
  source: 'original',
  mtime: '1234',
  size: '5678',
  md5: 'abc123',
  crc32: '4243243',
  sha1: '1234432njknk',
  format: 'Item Image',
  rotation: '0',
};

export const mockUserResponse: UserResponse = {
  username: 'foo@bar.com',
  itemname: '@fooey-mcbarrison',
  screenname: 'Foo-Bar',
  privs: ['/'],
  image_info: mockUserImageInfoResponse,
};

export const mockUser = User.fromUserResponse(mockUserResponse);

export function getSuccessResponse() {
  return getMockApiResponseFromObject({
    success: true,
    value: mockUserResponse,
  });
}

export function getFailureResponse() {
  return getMockApiResponseFromObject(
    {
      success: false,
      error: 'Authentication failed',
    },
    401,
  );
}
