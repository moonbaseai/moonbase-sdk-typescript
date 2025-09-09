// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CollectionsAPI from './collections';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Fields extends APIResource {
  /**
   * Retrieves the details of a field in a collection.
   *
   * @example
   * ```ts
   * const field = await client.collections.fields.retrieve(
   *   'id',
   *   { collection_id: 'collection_id' },
   * );
   * ```
   */
  retrieve(
    id: string,
    params: FieldRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<CollectionsAPI.Field> {
    const { collection_id } = params;
    return this._client.get(path`/collections/${collection_id}/fields/${id}`, options);
  }
}

export interface FieldRetrieveParams {
  /**
   * The ID or `ref` of the Collection the field belongs to.
   */
  collection_id: string;
}

export declare namespace Fields {
  export { type FieldRetrieveParams as FieldRetrieveParams };
}
