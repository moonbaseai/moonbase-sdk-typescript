// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Files extends APIResource {
  /**
   * Retrieves the details of an existing file.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<File> {
    return this._client.get(path`/files/${id}`, options);
  }

  /**
   * Returns a list of files that you have uploaded.
   */
  list(
    query: FileListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FileListResponse> {
    return this._client.get('/files', { query, ...options });
  }
}

/**
 * The File object represents a file that has been uploaded to your library.
 */
export interface File {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The original filename of the uploaded file.
   */
  filename: string;

  links: File.Links;

  /**
   * The display name of the file.
   */
  name: string;

  /**
   * The size of the file in bytes.
   */
  size: number;

  /**
   * String representing the object’s type. Always `file` for this object.
   */
  type: 'file';

  /**
   * Time at which the object was created, as an RFC 3339 timestamp.
   */
  created_at?: string;

  /**
   * Time at which the object was last updated, as an RFC 3339 timestamp.
   */
  updated_at?: string;
}

export namespace File {
  export interface Links {
    /**
     * A temporary, signed URL to download the file content. The URL expires after one
     * hour.
     */
    download_url: string;

    /**
     * The canonical URL for this object.
     */
    self: string;
  }
}

/**
 * A set of results using cursor-based pagination.
 */
export interface FileListResponse {
  /**
   * An array of File items.
   */
  data: Array<File>;

  type: 'list';

  /**
   * Links for navigating through the paginated results
   */
  links?: FileListResponse.Links;

  /**
   * Metadata about the pagination, including the cursors pointing to the previous
   * and next pages.
   */
  meta?: FileListResponse.Meta;
}

export namespace FileListResponse {
  /**
   * Links for navigating through the paginated results
   */
  export interface Links {
    next?: string;

    prev?: string;
  }

  /**
   * Metadata about the pagination, including the cursors pointing to the previous
   * and next pages.
   */
  export interface Meta {
    cursors?: Meta.Cursors;

    /**
     * Indicates if there are more results available. If true, the `next` cursor will
     * be present.
     */
    has_more?: boolean;
  }

  export namespace Meta {
    export interface Cursors {
      /**
       * Cursor for the next page. This value should be used with the `after` query
       * parameter to fetch the next page of results.
       */
      next?: string;

      /**
       * Cursor for the previous page. This value should be used with the `before` query
       * parameter to fetch the previous page of results.
       */
      prev?: string;
    }
  }
}

export interface FileListParams {
  /**
   * When specified, returns results starting immediately after the item identified
   * by this cursor. Use the cursor value from the previous response's metadata to
   * fetch the next page of results.
   */
  after?: string;

  /**
   * When specified, returns results starting immediately before the item identified
   * by this cursor. Use the cursor value from the response's metadata to fetch the
   * previous page of results.
   */
  before?: string;

  /**
   * Maximum number of items to return per page. Must be between 1 and 100. Defaults
   * to 20 if not specified.
   */
  limit?: number;
}

export declare namespace Files {
  export {
    type File as File,
    type FileListResponse as FileListResponse,
    type FileListParams as FileListParams,
  };
}
