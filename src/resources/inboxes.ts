// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TagsetsAPI from './tagsets';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
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
  ): PagePromise<InboxesCursorPage, Inbox> {
    return this._client.getAPIList('/inboxes', CursorPage<Inbox>, { query, ...options });
  }
}

export type InboxesCursorPage = CursorPage<Inbox>;

/**
 * The Inbox object represents a shared inbox for receiving and sending messages.
 */
export interface Inbox {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * The display name of the inbox.
   */
  name: string;

  /**
   * String representing the object’s type. Always `inbox` for this object.
   */
  type: 'inbox';

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  can_read?: boolean;

  /**
   * The list of `Tagset` objects associated with this inbox, which defines the tags
   * available for its conversations.
   *
   * **Note:** Only present when requested using the `include` query parameter.
   */
  tagsets?: Array<TagsetsAPI.Tagset>;
}

export interface InboxRetrieveParams {
  /**
   * Specifies which related objects to include in the response. Valid option is
   * `tagsets`.
   */
  include?: Array<'tagsets'>;
}

export interface InboxListParams extends CursorPageParams {
  /**
   * When specified, returns results starting immediately before the item identified
   * by this cursor. Use the cursor value from the response's metadata to fetch the
   * previous page of results.
   */
  before?: string;

  include?: Array<'tagsets'>;

  /**
   * Maximum number of items to return per page. Must be between 1 and 100. Defaults
   * to 20 if not specified.
   */
  limit?: number;
}

export declare namespace Inboxes {
  export {
    type Inbox as Inbox,
    type InboxesCursorPage as InboxesCursorPage,
    type InboxRetrieveParams as InboxRetrieveParams,
    type InboxListParams as InboxListParams,
  };
}
