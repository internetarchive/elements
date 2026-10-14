export interface UserImageInfoResponse {
  name?: string;
  source?: string;
  mtime?: string;
  size?: string;
  md5?: string;
  crc32?: string;
  sha1?: string;
  format?: string;
  rotation?: string;
}

export interface UserResponse {
  username: string;
  itemname: string;
  screenname: string;
  privs: string[];
  image_info: UserImageInfoResponse;
}

export interface UserServiceResponse {
  /**
   * Was the request successful?
   */
  success: boolean;

  /**
   * If the request was successful, this will populate with a User object
   */
  value?: UserResponse;

  /**
   * If the request was not successful, this will contain the error message
   */
  error?: string;
}
