// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CollectionsAPI from '../collections/collections';
import { ItemsCursorPage } from '../collections/collections';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage your collections and items
 */
export class Items extends APIResource {
  /**
   * Returns a list of items that are part of the specified view.
   */
  list(
    id: string,
    query: ItemListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ItemsCursorPage, CollectionsAPI.Item> {
    return this._client.getAPIList(path`/views/${id}/items`, CursorPage<CollectionsAPI.Item>, {
      query,
      ...options,
    });
  }
}

export interface ItemListParams extends CursorPageParams {
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

export declare namespace Items {
  export { type ItemListParams as ItemListParams };
}

export { type ItemsCursorPage };
