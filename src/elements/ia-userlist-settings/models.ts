/** The list the settings form edits. Leave out `id` to create a new list. */
export interface UserListModel {
  id?: string;
  list_name: string;
  description?: string;
  is_private?: boolean;
  date_created?: Date;
  date_updated?: Date;
}
