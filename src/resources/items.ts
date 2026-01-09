// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CollectionsAPI from './collections/collections';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Items extends APIResource {
  /**
   * Returns items that match the search query.
   */
  search(query: ItemSearchParams, options?: RequestOptions): APIPromise<ItemSearchResponse> {
    return this._client.get('/items/search', { query, ...options });
  }
}

export interface ItemSearchResponse {
  data: Array<CollectionsAPI.Item>;

  type: 'list';
}

export interface ItemSearchParams {
  /**
   * The search text to match against items.
   */
  query: string;

  /**
   * Filter results by one or more collection IDs or `ref` values.
   */
  filter?: ItemSearchParams.Filter;
}

export namespace ItemSearchParams {
  /**
   * Filter results by one or more collection IDs or `ref` values.
   */
  export interface Filter {
    collection_id?: Filter.CollectionID;
  }

  export namespace Filter {
    export interface CollectionID {
      in?: Array<string>;
    }
  }
}

export declare namespace Items {
  export { type ItemSearchResponse as ItemSearchResponse, type ItemSearchParams as ItemSearchParams };
}
