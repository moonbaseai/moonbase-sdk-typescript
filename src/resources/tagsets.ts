// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Manage your inboxes, conversations, and messages
 */
export class Tagsets extends APIResource {
  /**
   * Retrieves the details of an existing tagset.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Tagset> {
    return this._client.get(path`/tagsets/${id}`, options);
  }

  /**
   * Returns a list of your tagsets.
   */
  list(
    query: TagsetListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TagsetsCursorPage, Tagset> {
    return this._client.getAPIList('/tagsets', CursorPage<Tagset>, { query, ...options });
  }
}

export type TagsetsCursorPage = CursorPage<Tagset>;

/**
 * A Tagset is a collection of `Tag` objects that can be applied within a specific
 * `Inbox`.
 */
export interface Tagset {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * The name of the tagset.
   */
  name: string;

  /**
   * A list of `Tag` objects belonging to this tagset.
   */
  tags: Array<Tagset.Tag>;

  /**
   * String representing the object’s type. Always `tagset` for this object.
   */
  type: 'tagset';

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional description of the tagset's purpose.
   */
  description?: string;
}

export namespace Tagset {
  /**
   * A Tag is a label that can be applied to `Conversation` objects for organization
   * and filtering.
   */
  export interface Tag {
    /**
     * Unique identifier for the object.
     */
    id: string;

    /**
     * The name of the tag.
     */
    name: string;

    /**
     * String representing the object’s type. Always `tag` for this object.
     */
    type: 'tag';
  }
}

export interface TagsetListParams extends CursorPageParams {
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

export declare namespace Tagsets {
  export {
    type Tagset as Tagset,
    type TagsetsCursorPage as TagsetsCursorPage,
    type TagsetListParams as TagsetListParams,
  };
}
