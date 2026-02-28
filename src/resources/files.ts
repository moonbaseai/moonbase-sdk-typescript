// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import * as CollectionsAPI from './collections/collections';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { type Uploadable } from '../core/uploads';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

/**
 * Manage your meetings, files, and notes
 */
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

  /**
   * Permanently deletes a file.
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/files/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Upload a file
   */
  upload(body: FileUploadParams, options?: RequestOptions): APIPromise<MoonbaseFile> {
    return this._client.post('/files', multipartFormRequestOptions({ body, ...options }, this._client));
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
   * A list of items this file is associated with.
   */
  associations: Array<CollectionsAPI.ItemPointer>;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * A temporary, signed URL to download the file content. The URL expires after one
   * hour.
   */
  download_url: string;

  /**
   * The original filename of the uploaded file.
   */
  filename: string;

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
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;
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

export interface FileUploadParams {
  /**
   * The File object to be uploaded.
   */
  file: Uploadable;

  /**
   * Link the File to Moonbase items like a person, organization, deal, task, or an
   * item in a custom collection.
   */
  associations?: Array<Shared.Pointer>;

  /**
   * The display name of the file.
   */
  name?: string;
}

export declare namespace Files {
  export {
    type MoonbaseFile as MoonbaseFile,
    type MoonbaseFilesCursorPage as MoonbaseFilesCursorPage,
    type FileListParams as FileListParams,
    type FileUploadParams as FileUploadParams,
  };
}
