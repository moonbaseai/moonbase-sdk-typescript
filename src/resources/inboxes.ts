// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TagsetsAPI from './tagsets';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Inboxes extends APIResource {
  /**
   * Retrieves the details of an existing inbox.
   */
  retrieve(
    id: string,
    query: InboxRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Inbox> {
    return this._client.get(path`/inboxes/${id}`, { query, ...options });
  }

  /**
   * Returns a list of shared inboxes.
   */
  list(
    query: InboxListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InboxListResponse> {
    return this._client.get('/inboxes', { query, ...options });
  }
}

/**
 * The Inbox object represents a shared inbox for receiving and sending messages.
 */
export interface Inbox {
  /**
   * Unique identifier for the object.
   */
  id: string;

  links: Inbox.Links;

  /**
   * The display name of the inbox.
   */
  name: string;

  /**
   * String representing the object’s type. Always `inbox` for this object.
   */
  type: 'inbox';

  /**
   * Time at which the object was created, as an RFC 3339 timestamp.
   */
  created_at?: string;

  /**
   * The `Tagset` associated with this inbox, which defines the tags available for
   * its conversations.
   */
  tagset?: TagsetsAPI.Tagset;

  /**
   * Time at which the object was last updated, as an RFC 3339 timestamp.
   */
  updated_at?: string;
}

export namespace Inbox {
  export interface Links {
    /**
     * The canonical URL for this object.
     */
    self: string;

    /**
     * A link to the `Tagset` for this inbox.
     */
    tagset?: string;
  }
}

/**
 * A set of results using cursor-based pagination.
 */
export interface InboxListResponse {
  /**
   * An array of Inbox items.
   */
  data: Array<Inbox>;

  type: 'list';

  /**
   * Links for navigating through the paginated results
   */
  links?: InboxListResponse.Links;

  /**
   * Metadata about the pagination, including the cursors pointing to the previous
   * and next pages.
   */
  meta?: InboxListResponse.Meta;
}

export namespace InboxListResponse {
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

export interface InboxRetrieveParams {
  /**
   * Specifies which related objects to include in the response. Valid option is
   * `tagset`.
   */
  'include[]'?: 'tagset';
}

export interface InboxListParams {
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

export declare namespace Inboxes {
  export {
    type Inbox as Inbox,
    type InboxListResponse as InboxListResponse,
    type InboxRetrieveParams as InboxRetrieveParams,
    type InboxListParams as InboxListParams,
  };
}
