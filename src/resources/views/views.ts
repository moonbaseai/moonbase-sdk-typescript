// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
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
  ): APIPromise<Shared.View> {
    return this._client.get(path`/views/${id}`, { query, ...options });
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
  export { type ViewRetrieveParams as ViewRetrieveParams };

  export { Items as Items, type ItemListParams as ItemListParams };
}
