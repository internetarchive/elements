/** Sort orders offered by the viewable-files panel's sort button. */
export type FileSortOption = 'default' | 'title_asc' | 'title_desc';

/** A single viewable file / volume entry rendered in the viewable-files panel. */
export interface ViewableFileInfo {
  url_path: string;
  image: string;
  title: string;
  author: string;
  file_subprefix: string;
  file_source: string;
  file_origin?: string;
  /** Used as the `repeat` key when rendering the list. */
  file_prefix?: string;
  /** Original ordering index, used to restore the default sort. */
  orig_sort?: number;
}
