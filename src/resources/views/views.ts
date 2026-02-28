// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CollectionsAPI from '../collections/collections';
import * as ItemsAPI from './items';
import { ItemListParams, Items } from './items';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage your collections and items
 */
export class Views extends APIResource {
  items: ItemsAPI.Items = new ItemsAPI.Items(this._client);

  /**
   * Retrieves the details of an existing view.
   */
  retrieve(
    id: string,
    query: ViewRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<View> {
    return this._client.get(path`/views/${id}`, { query, ...options });
  }
}

/**
 * A View represents a saved configuration for displaying items in a collection,
 * including filters and sorting rules.
 */
export interface View {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * The name of the view.
   */
  name: string;

  /**
   * String representing the object’s type. Always `view` for this object.
   */
  type: 'view';

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * The type of view, such as `table` or `board`.
   */
  view_type: 'table' | 'board';

  /**
   * The `Collection` this view belongs to.
   *
   * **Note:** Only present when requested using the `include` query parameter.
   */
  collection?: CollectionsAPI.Collection;
}

export interface ViewRetrieveParams {
  /**
   * Specifies which related objects to include in the response. Valid option is
   * `collection`.
   */
  include?: Array<'collection'>;
}

Views.Items = Items;

export declare namespace Views {
  export { type View as View, type ViewRetrieveParams as ViewRetrieveParams };

  export { Items as Items, type ItemListParams as ItemListParams };
}
