// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ItemsAPI from './items';
import { ItemsCursorPage } from './items';
import * as CollectionsAPI from './collections/collections';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Views extends APIResource {
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

  /**
   * Returns a list of items that are part of the specified view.
   */
  listItems(
    id: string,
    query: ViewListItemsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ItemsCursorPage, ItemsAPI.Item> {
    return this._client.getAPIList(path`/views/${id}/items`, CursorPage<ItemsAPI.Item>, {
      query,
      ...options,
    });
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

  links: View.Links;

  /**
   * The name of the view.
   */
  name: string;

  /**
   * String representing the object’s type. Always `view` for this object.
   */
  type: 'view';

  /**
   * The `Collection` this view belongs to.
   */
  collection?: CollectionsAPI.Collection;

  /**
   * The type of view, such as `table` or `board`.
   */
  view_type?: 'table' | 'board';
}

export namespace View {
  export interface Links {
    /**
     * A link to the `Collection` this view belongs to.
     */
    collection: string;

    /**
     * A link to the list of `Item` objects that are visible in this view.
     */
    items: string;

    /**
     * The canonical URL for this object.
     */
    self: string;
  }
}

export interface ViewRetrieveParams {
  /**
   * Specifies which related objects to include in the response. Valid option is
   * `collection`.
   */
  include?: Array<'collection'>;
}

export interface ViewListItemsParams extends CursorPageParams {
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

export declare namespace Views {
  export {
    type View as View,
    type ViewRetrieveParams as ViewRetrieveParams,
    type ViewListItemsParams as ViewListItemsParams,
  };
}

export { type ItemsCursorPage };
