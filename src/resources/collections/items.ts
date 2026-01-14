// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CollectionsAPI from './collections';
import { ItemsCursorPage } from './collections';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Items extends APIResource {
  /**
   * Creates a new item in a collection.
   *
   * @example
   * ```ts
   * const item = await client.collections.items.create(
   *   'collection_id',
   *   {
   *     values: {
   *       name: {
   *         type: 'value/text/single_line',
   *         data: 'Aperture Science',
   *       },
   *       ceo: {
   *         type: 'value/relation',
   *         data: {
   *           type: 'item',
   *           id: '1CLJt2v3bK2AzMXRRswwZG',
   *         },
   *       },
   *     },
   *   },
   * );
   * ```
   */
  create(
    collectionID: string,
    body: ItemCreateParams,
    options?: RequestOptions,
  ): APIPromise<CollectionsAPI.Item> {
    return this._client.post(path`/collections/${collectionID}/items`, { body, ...options });
  }

  /**
   * Retrieves the details of an existing item.
   *
   * @example
   * ```ts
   * const item = await client.collections.items.retrieve('id', {
   *   collection_id: 'collection_id',
   * });
   * ```
   */
  retrieve(
    id: string,
    params: ItemRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<CollectionsAPI.Item> {
    const { collection_id } = params;
    return this._client.get(path`/collections/${collection_id}/items/${id}`, options);
  }

  /**
   * Updates an item.
   *
   * @example
   * ```ts
   * const item = await client.collections.items.update('id', {
   *   collection_id: 'collection_id',
   *   values: {
   *     name: {
   *       type: 'value/text/single_line',
   *       data: 'Jony Appleseed',
   *     },
   *   },
   * });
   * ```
   */
  update(id: string, params: ItemUpdateParams, options?: RequestOptions): APIPromise<CollectionsAPI.Item> {
    const {
      collection_id,
      'update-many-strategy': updateManyStrategy,
      'update-one-strategy': updateOneStrategy,
      ...body
    } = params;
    return this._client.patch(path`/collections/${collection_id}/items/${id}`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(updateManyStrategy?.toString() != null ?
            { 'update-many-strategy': updateManyStrategy?.toString() }
          : undefined),
          ...(updateOneStrategy?.toString() != null ?
            { 'update-one-strategy': updateOneStrategy?.toString() }
          : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Returns a list of items that are part of the collection.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const item of client.collections.items.list(
   *   'collection_id',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    collectionID: string,
    query: ItemListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ItemsCursorPage, CollectionsAPI.Item> {
    return this._client.getAPIList(
      path`/collections/${collectionID}/items`,
      CursorPage<CollectionsAPI.Item>,
      { query, ...options },
    );
  }

  /**
   * Permanently deletes an item.
   *
   * @example
   * ```ts
   * await client.collections.items.delete('id', {
   *   collection_id: 'collection_id',
   * });
   * ```
   */
  delete(id: string, params: ItemDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { collection_id } = params;
    return this._client.delete(path`/collections/${collection_id}/items/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Find and update an existing item, or create a new one.
   *
   * @example
   * ```ts
   * const item = await client.collections.items.upsert('collection_id', {
   *   identifiers: {
   *     domain: [
   *       { ... },
   *     ],
   *   },
   *   values: {
   *     name: { ... },
   *     domain: [
   *       { ... },
   *     ],
   *     linked_in: { ... },
   *   },
   * });
   * ```
   */
  upsert(
    collectionID: string,
    params: ItemUpsertParams,
    options?: RequestOptions,
  ): APIPromise<CollectionsAPI.Item> {
    const {
      'update-many-strategy': updateManyStrategy,
      'update-one-strategy': updateOneStrategy,
      ...body
    } = params;
    return this._client.post(path`/collections/${collectionID}/items/upsert`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(updateManyStrategy?.toString() != null ?
            { 'update-many-strategy': updateManyStrategy?.toString() }
          : undefined),
          ...(updateOneStrategy?.toString() != null ?
            { 'update-one-strategy': updateOneStrategy?.toString() }
          : undefined),
        },
        options?.headers,
      ]),
    });
  }
}

export interface ItemCreateParams {
  /**
   * A hash where keys are the `ref` of a `Field` and values are the data to be set.
   */
  values: { [key: string]: CollectionsAPI.FieldValueParam | null };
}

export interface ItemRetrieveParams {
  collection_id: string;
}

export interface ItemUpdateParams {
  /**
   * Path param
   */
  collection_id: string;

  /**
   * Body param: A hash where keys are the `ref` of a `Field` and values are the new
   * data to be set.
   */
  values: { [key: string]: CollectionsAPI.FieldValueParam | null };

  /**
   * Header param: Specifies how to update fields that allow multiple values during a
   * PATCH or update request. Use `replace` (default) to overwrite all existing
   * values with the new values. Use `preserve` to leave the existing values
   * unchanged when already present. Use `merge` to merge the new values with
   * existing values.
   */
  'update-many-strategy'?: 'replace' | 'preserve' | 'merge';

  /**
   * Header param: Specifies how to update fields with a single (one) value during a
   * PATCH or update request. Use `replace` (default) to overwrite the existing value
   * with the new value. Use `preserve` to leave the existing value unchanged if one
   * is already present.
   */
  'update-one-strategy'?: 'replace' | 'preserve';
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

export interface ItemDeleteParams {
  collection_id: string;
}

export interface ItemUpsertParams {
  /**
   * Body param: A hash where keys are the `ref` of a `Field` and values are used to
   * identify the item to update. When multiple identifiers are provided, the update
   * will find items that match any of the identifiers.
   */
  identifiers: { [key: string]: CollectionsAPI.FieldValueParam | null };

  /**
   * Body param: A hash where keys are the `ref` of a `Field` and values are the data
   * to be set.
   */
  values: { [key: string]: CollectionsAPI.FieldValueParam | null };

  /**
   * Header param: Specifies how to update fields that allow multiple values. Use
   * `replace` (default) to overwrite all existing values with the new values. Use
   * `preserve` to leave the existing values unchanged when already present. Use
   * `merge` to merge the new values with existing values.
   */
  'update-many-strategy'?: 'replace' | 'preserve' | 'merge';

  /**
   * Header param: Specifies how to update fields that have a single value. Use
   * `replace` (default) to overwrite the existing value with the new value. Use
   * `preserve` to leave the existing value unchanged if one is already present.
   */
  'update-one-strategy'?: 'replace' | 'preserve';
}

export declare namespace Items {
  export {
    type ItemCreateParams as ItemCreateParams,
    type ItemRetrieveParams as ItemRetrieveParams,
    type ItemUpdateParams as ItemUpdateParams,
    type ItemListParams as ItemListParams,
    type ItemDeleteParams as ItemDeleteParams,
    type ItemUpsertParams as ItemUpsertParams,
  };
}

export { type ItemsCursorPage };
