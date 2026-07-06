// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Manage your meetings, files, and notes
 */
export class Tagsets extends APIResource {
  /**
   * Create a new tagset.
   *
   * @example
   * ```ts
   * const tagset = await client.tagsets.create({
   *   name: 'Support',
   *   description: 'Tags for our support inbox',
   *   tags: [
   *     { name: 'Bug', color: 'red' },
   *     { name: 'Feature Request', color: 'purple' },
   *     { name: 'Billing', color: 'amber' },
   *   ],
   * });
   * ```
   */
  create(body: TagsetCreateParams, options?: RequestOptions): APIPromise<Tagset> {
    return this._client.post('/tagsets', { body, ...options });
  }

  /**
   * Retrieves the details of an existing tagset.
   *
   * @example
   * ```ts
   * const tagset = await client.tagsets.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Tagset> {
    return this._client.get(path`/tagsets/${id}`, options);
  }

  /**
   * Updates an existing tagset.
   *
   * @example
   * ```ts
   * const tagset = await client.tagsets.update('id', {
   *   description: 'Updated description',
   *   name: 'Customer Support',
   * });
   * ```
   */
  update(id: string, body: TagsetUpdateParams, options?: RequestOptions): APIPromise<Tagset> {
    return this._client.patch(path`/tagsets/${id}`, { body, ...options });
  }

  /**
   * Returns a list of your tagsets.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const tagset of client.tagsets.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: TagsetListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TagsetsCursorPage, Tagset> {
    return this._client.getAPIList('/tagsets', CursorPage<Tagset>, { query, ...options });
  }

  /**
   * Permanently deletes a tagset.
   *
   * @example
   * ```ts
   * await client.tagsets.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/tagsets/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type TagsetsCursorPage = CursorPage<Tagset>;

/**
 * A Tagset is a collection of `Tag` objects whose tags can be applied to
 * conversations, calls, and meetings.
 */
export interface Tagset {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Where a tagset is available (`calls`, `meetings`, or `inbox` with an inbox ID).
   */
  associations: Array<TagsetAssociation>;

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
  tags: Array<Shared.Tag>;

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

/**
 * Where a tagset is available. Associations are discriminated by `type`.
 */
export type TagsetAssociation =
  | TagsetAssociation.TagsetCallsAssociation
  | TagsetAssociation.TagsetMeetingsAssociation
  | TagsetAssociation.TagsetInboxAssociation;

export namespace TagsetAssociation {
  /**
   * Makes this tagset available for calls.
   */
  export interface TagsetCallsAssociation {
    /**
     * String representing the association type. Always `calls` for call tagset
     * associations.
     */
    type: 'calls';
  }

  /**
   * Makes this tagset available for meetings.
   */
  export interface TagsetMeetingsAssociation {
    /**
     * String representing the association type. Always `meetings` for meeting tagset
     * associations.
     */
    type: 'meetings';
  }

  /**
   * Makes this tagset available in an inbox.
   */
  export interface TagsetInboxAssociation {
    /**
     * Unique identifier of the inbox this tagset is assigned to.
     */
    id: string;

    /**
     * String representing the association type. Always `inbox` for inbox tagset
     * associations.
     */
    type: 'inbox';
  }
}

export interface TagsetPointer {
  id: string;

  type: 'tagset';
}

export interface TagsetCreateParams {
  /**
   * The name of the tagset.
   */
  name: string;

  /**
   * Optional list of associations for this tagset. Include `{type: "calls"}`,
   * `{type: "meetings"}`, or `{type: "inbox", id}`.
   */
  associations?: Array<TagsetAssociation>;

  /**
   * An optional description of the tagset's purpose.
   */
  description?: string;

  /**
   * Optional list of tags to create with this tagset. Tags are ordered by their
   * position in the list.
   */
  tags?: Array<TagsetCreateParams.Tag>;
}

export namespace TagsetCreateParams {
  /**
   * Parameters for creating or updating a tag within a tagset.
   */
  export interface Tag {
    /**
     * The color for the tag.
     */
    color:
      | 'amber'
      | 'blue'
      | 'cyan'
      | 'emerald'
      | 'fuchsia'
      | 'green'
      | 'indigo'
      | 'lime'
      | 'lunar'
      | 'orange'
      | 'pink'
      | 'purple'
      | 'red'
      | 'rose'
      | 'sky'
      | 'teal'
      | 'violet'
      | 'yellow';

    /**
     * The name of the tag.
     */
    name: string;

    /**
     * Existing tag identifier. Include to update an existing tag, omit to create a new
     * tag.
     */
    id?: string;
  }
}

export interface TagsetUpdateParams {
  /**
   * Optional full list of associations for this tagset. If provided, it replaces all
   * existing associations. An empty array clears all associations, and omitting it
   * preserves existing associations.
   */
  associations?: Array<TagsetAssociation>;

  /**
   * An updated description of the tagset.
   */
  description?: string;

  /**
   * The new name of the tagset.
   */
  name?: string;

  /**
   * Optional full list of tags for this tagset. If provided, tags are ordered by
   * array position.
   */
  tags?: Array<TagsetUpdateParams.Tag>;
}

export namespace TagsetUpdateParams {
  /**
   * Parameters for creating or updating a tag within a tagset.
   */
  export interface Tag {
    /**
     * The color for the tag.
     */
    color:
      | 'amber'
      | 'blue'
      | 'cyan'
      | 'emerald'
      | 'fuchsia'
      | 'green'
      | 'indigo'
      | 'lime'
      | 'lunar'
      | 'orange'
      | 'pink'
      | 'purple'
      | 'red'
      | 'rose'
      | 'sky'
      | 'teal'
      | 'violet'
      | 'yellow';

    /**
     * The name of the tag.
     */
    name: string;

    /**
     * Existing tag identifier. Include to update an existing tag, omit to create a new
     * tag.
     */
    id?: string;
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
    type TagsetAssociation as TagsetAssociation,
    type TagsetPointer as TagsetPointer,
    type TagsetsCursorPage as TagsetsCursorPage,
    type TagsetCreateParams as TagsetCreateParams,
    type TagsetUpdateParams as TagsetUpdateParams,
    type TagsetListParams as TagsetListParams,
  };
}
