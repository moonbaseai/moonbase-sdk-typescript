// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CollectionsAPI from '../collections/collections';
import * as ItemsAPI from './items';
import { ItemListParams, Items } from './items';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Views extends APIResource {
  items: ItemsAPI.Items = new ItemsAPI.Items(this._client);

  /**
   * Retrieves the details of an existing view.
   */
  retrieve(
    id: string,
    query: ViewRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ViewRetrieveResponse> {
    return this._client.get(path`/views/${id}`, { query, ...options });
  }
}

/**
 * A View represents a saved configuration for displaying items in a collection,
 * including filters and sorting rules.
 */
export interface ViewRetrieveResponse {
  /**
   * Unique identifier for the object.
   */
  id: string;

  links: ViewRetrieveResponse.Links;

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

export namespace ViewRetrieveResponse {
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

Views.Items = Items;

export declare namespace Views {
  export { type ViewRetrieveResponse as ViewRetrieveResponse, type ViewRetrieveParams as ViewRetrieveParams };

  export { Items as Items, type ItemListParams as ItemListParams };
}
