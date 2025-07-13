// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InboxConversationsAPI from './inbox-conversations';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

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
  ): APIPromise<TagsetListResponse> {
    return this._client.get('/tagsets', { query, ...options });
  }
}

/**
 * A Tagset is a collection of `Tag` objects that can be applied within a specific
 * `Inbox`.
 */
export interface Tagset {
  /**
   * Unique identifier for the object.
   */
  id: string;

  links: Tagset.Links;

  /**
   * The name of the tagset.
   */
  name: string;

  /**
   * String representing the object’s type. Always `tagset` for this object.
   */
  type: 'tagset';

  /**
   * Time at which the object was created, as an RFC 3339 timestamp.
   */
  created_at?: string;

  /**
   * An optional description of the tagset's purpose.
   */
  description?: string;

  /**
   * A list of `Tag` objects belonging to this tagset.
   */
  tags?: Array<InboxConversationsAPI.Tag>;

  /**
   * Time at which the object was last updated, as an RFC 3339 timestamp.
   */
  updated_at?: string;
}

export namespace Tagset {
  export interface Links {
    /**
     * The canonical URL for this object.
     */
    self: string;
  }
}

/**
 * A set of results using cursor-based pagination.
 */
export interface TagsetListResponse {
  /**
   * An array of Tagset items.
   */
  data: Array<Tagset>;

  type: 'list';

  /**
   * Links for navigating through the paginated results
   */
  links?: TagsetListResponse.Links;

  /**
   * Metadata about the pagination, including the cursors pointing to the previous
   * and next pages.
   */
  meta?: TagsetListResponse.Meta;
}

export namespace TagsetListResponse {
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

export interface TagsetListParams {
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

export declare namespace Tagsets {
  export {
    type Tagset as Tagset,
    type TagsetListResponse as TagsetListResponse,
    type TagsetListParams as TagsetListParams,
  };
}
