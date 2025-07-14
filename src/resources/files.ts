// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Files extends APIResource {
  /**
   * Retrieves the details of an existing file.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<MoonbaseFile> {
    return this._client.get(path`/files/${id}`, options);
  }

  /**
   * Returns a list of files that you have uploaded.
   */
  list(
    query: FileListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MoonbaseFilesCursorPage, MoonbaseFile> {
    return this._client.getAPIList('/files', CursorPage<MoonbaseFile>, { query, ...options });
  }
}

export type MoonbaseFilesCursorPage = CursorPage<MoonbaseFile>;

/**
 * The File object represents a file that has been uploaded to your library.
 */
export interface MoonbaseFile {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The original filename of the uploaded file.
   */
  filename: string;

  links: MoonbaseFile.Links;

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

export namespace MoonbaseFile {
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

export interface FileListParams extends CursorPageParams {
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
    type MoonbaseFile as MoonbaseFile,
    type MoonbaseFilesCursorPage as MoonbaseFilesCursorPage,
    type FileListParams as FileListParams,
  };
}
