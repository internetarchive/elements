/**
 * Extra info about the target account that is returned for
 * the `account_details` page type.
 */
export interface AccountExtraInfo {
  /** Details about the user account itself (screen name, identifier, creation date) */
  account_details: UserAccountDetails;
  /** Whether the target account either has privs or is internal to archive.org */
  is_archivist: boolean;
  /** User-editable metadata about the user account (title and description) */
  user_item_metadata: UserItemMetadata;
  /** Details about the preferences set by the user and the privileges they have */
  policy_settings: PolicySettings;
}

/**
 * Info about a user account, as returned for the `account_details` page type.
 */
export interface UserAccountDetails {
  screenname: string;
  user_item_identifier: string;
  user_since: string;
  user_email?: string;
  user_status?: string;
  is_locked?: boolean;
  created_date?: string | null;
  updated_date?: string | null;
  last_login?: string | null;
}

/**
 * Details from a user item's metadata, as returned for the `account_details` page type.
 */
export interface UserItemMetadata {
  title: string;
  description: string;
}

/**
 * Details about a user's preferences and privileges.
 */
export interface PolicySettings {
  is_archive_user: boolean;
  privileges: string[];
  preferences: string[];
}
