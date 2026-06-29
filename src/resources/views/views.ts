// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CollectionsAPI from '../collections/collections';
import * as ItemsAPI from './items';
import { ItemListParams, Items } from './items';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage your collections and items
 */
export class Views extends APIResource {
  items: ItemsAPI.Items = new ItemsAPI.Items(this._client);

  /**
   * Creates a new view in a collection.
   *
   * @example
   * ```ts
   * const view = await client.views.create({
   *   collection: { type: 'collection', ref: 'people' },
   *   fields: [{ field: 'name' }, { field: 'email' }],
   *   name: 'Active leads',
   *   view_type: 'table',
   *   filter: {
   *     field: 'name',
   *     op: 'contains',
   *     value: 'Acme',
   *   },
   *   sort: ['-name'],
   * });
   * ```
   */
  create(body: ViewCreateParams, options?: RequestOptions): APIPromise<View> {
    return this._client.post('/views', { body, ...options });
  }

  /**
   * Retrieves the details of an existing view.
   *
   * @example
   * ```ts
   * const view = await client.views.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<View> {
    return this._client.get(path`/views/${id}`, options);
  }

  /**
   * Updates a view. The change applies to the shared view that everyone in the
   * workspace sees.
   *
   * @example
   * ```ts
   * const view = await client.views.update('id', {
   *   aggregates: [{ type: 'item_count', group: 'stage' }],
   *   fields: [
   *     { field: 'name', is_pinned: true },
   *     { field: 'amount' },
   *     { field: 'stage' },
   *     { field: 'owner', display_fields: ['name', 'email'] },
   *     { field: 'related_tasks' },
   *   ],
   *   filter: {
   *     field: 'name',
   *     op: 'eq',
   *     value: 'Acme',
   *   },
   *   groups: ['stage'],
   *   name: 'Active deals',
   *   relation_value_filters: [
   *     {
   *       field: 'related_tasks',
   *       filter: {
   *         field: 'state',
   *         op: 'eq',
   *         value: 'Open',
   *       },
   *     },
   *   ],
   *   sort: ['-name'],
   * });
   * ```
   */
  update(id: string, body: ViewUpdateParams, options?: RequestOptions): APIPromise<View> {
    return this._client.patch(path`/views/${id}`, { body, ...options });
  }

  /**
   * Returns a list of views.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const viewListResponse of client.views.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ViewListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ViewListResponsesCursorPage, ViewListResponse> {
    return this._client.getAPIList('/views', CursorPage<ViewListResponse>, { query, ...options });
  }

  /**
   * Permanently deletes a view. The default view of a collection cannot be deleted.
   *
   * @example
   * ```ts
   * await client.views.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/views/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type ViewListResponsesCursorPage = CursorPage<ViewListResponse>;

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
   * The metrics computed over the view's items.
   */
  aggregates: Array<ViewAggregate>;

  /**
   * The `Collection` this view belongs to.
   */
  collection: CollectionsAPI.CollectionPointer;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * The view's columns, in display order.
   */
  fields: Array<ViewField>;

  /**
   * Return only items that match the filter conditions. Complex filters can be
   * created by nesting filters inside of `AND`, `OR`, and `NOT` filters.
   */
  filter: CollectionsAPI.ItemsFilter | null;

  /**
   * Fields whose values group the view's items. Empty when the view is not grouped.
   */
  groups: Array<string>;

  /**
   * The name of the view.
   */
  name: string;

  /**
   * Filters limiting which related items the view's relation columns show.
   */
  relation_value_filters: Array<ViewRelationValueFilter>;

  /**
   * Sort items returned by the specified fields. Empty when the view has no sort.
   */
  sort: Array<string>;

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
}

/**
 * A metric computed over the view's items.
 */
export type ViewAggregate = ViewAggregateItemCount | ViewAggregateFieldStatistic;

/**
 * Computes a statistic over the values of a field.
 */
export interface ViewAggregateFieldStatistic {
  /**
   * The statistic to compute. Scalar statistics (sum, mean, max, min) require a
   * number field as `value`.
   */
  statistic: 'count' | 'sum' | 'mean' | 'max' | 'min' | 'filled_percentage';

  type: 'field_statistic';

  /**
   * The field whose values the statistic is computed over.
   */
  value: string;

  /**
   * An optional field whose values bucket the statistic.
   */
  group?: string;

  /**
   * An optional percentage field used to weight the statistic. Only supported for
   * scalar statistics.
   */
  weight?: string;
}

/**
 * Counts the view's items.
 */
export interface ViewAggregateItemCount {
  type: 'item_count';

  /**
   * An optional field whose values bucket the counts.
   */
  group?: string;
}

/**
 * A column of the view.
 */
export interface ViewField {
  /**
   * The field shown in this column.
   */
  field: string;

  /**
   * Which fields of the related item to show, relative to the related collection.
   * Omitted means the related collection's default display fields.
   */
  display_fields?: Array<string>;

  /**
   * Whether the column is pinned.
   */
  is_pinned?: boolean;

  /**
   * Whether the column wraps its content.
   */
  is_wrapped?: boolean;

  /**
   * The column width: a number of pixels, or `fit` (size to content), or `flex`
   * (fill available space).
   */
  size?: number | 'fit' | 'flex';
}

/**
 * Limits which related items a relation column shows: only related items matching
 * `filter` appear.
 */
export interface ViewRelationValueFilter {
  /**
   * The relation column whose related items are filtered.
   */
  field: string;

  /**
   * The filter the related items must match. Field paths are relative to the related
   * collection.
   */
  filter: CollectionsAPI.ItemsFilter;
}

export interface ViewListResponse {
  id: string;

  /**
   * A lightweight reference to a `Collection`, containing the minimal information
   * needed to identify it.
   */
  collection: CollectionsAPI.CollectionPointer;

  created_at: string;

  name: string;

  type: 'view';

  updated_at: string;

  view_type: 'table' | 'board';
}

export interface ViewCreateParams {
  /**
   * A pointer to the `Collection` the view belongs to.
   */
  collection: ViewCreateParams.Collection;

  /**
   * The view's columns, in display order.
   */
  fields: Array<ViewField>;

  /**
   * The name of the view.
   */
  name: string;

  /**
   * The type of view, `table` or `board`.
   */
  view_type: 'table' | 'board';

  /**
   * The metrics computed over the view's items.
   */
  aggregates?: Array<ViewAggregate>;

  /**
   * The filter applied to the view's items.
   */
  filter?: CollectionsAPI.ItemsFilter;

  /**
   * Fields whose values group the view's items.
   */
  groups?: Array<string>;

  /**
   * Filters limiting which related items the view's relation columns show.
   */
  relation_value_filters?: Array<ViewRelationValueFilter>;

  /**
   * Sort items returned by the specified fields.
   */
  sort?: Array<string>;
}

export namespace ViewCreateParams {
  /**
   * A pointer to the `Collection` the view belongs to.
   */
  export interface Collection {
    /**
     * String representing the object’s type. Always `collection` for this object.
     */
    type: 'collection';

    /**
     * Unique identifier of the collection.
     */
    id?: string;

    /**
     * The stable, machine-readable reference identifier of the collection.
     */
    ref?: string;
  }
}

export interface ViewUpdateParams {
  /**
   * The metrics computed over the view's items. An empty array clears them.
   */
  aggregates?: Array<ViewAggregate>;

  /**
   * The view's columns, in display order. If provided, it must contain at least one
   * column.
   */
  fields?: Array<ViewField>;

  /**
   * Return only items that match the filter conditions. Complex filters can be
   * created by nesting filters inside of `AND`, `OR`, and `NOT` filters.
   */
  filter?: CollectionsAPI.ItemsFilter | null;

  /**
   * Fields whose values group the view's items. An empty array clears the grouping.
   */
  groups?: Array<string>;

  /**
   * The name of the view.
   */
  name?: string;

  /**
   * Filters limiting which related items the view's relation columns show. An empty
   * array clears them.
   */
  relation_value_filters?: Array<ViewRelationValueFilter>;

  /**
   * Sort items returned by the specified fields. An empty array clears the sort.
   */
  sort?: Array<string>;

  /**
   * The type of view, `table` or `board`.
   */
  view_type?: 'table' | 'board';
}

export interface ViewListParams extends CursorPageParams {
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

Views.Items = Items;

export declare namespace Views {
  export {
    type View as View,
    type ViewAggregate as ViewAggregate,
    type ViewAggregateFieldStatistic as ViewAggregateFieldStatistic,
    type ViewAggregateItemCount as ViewAggregateItemCount,
    type ViewField as ViewField,
    type ViewRelationValueFilter as ViewRelationValueFilter,
    type ViewListResponse as ViewListResponse,
    type ViewListResponsesCursorPage as ViewListResponsesCursorPage,
    type ViewCreateParams as ViewCreateParams,
    type ViewUpdateParams as ViewUpdateParams,
    type ViewListParams as ViewListParams,
  };

  export { Items as Items, type ItemListParams as ItemListParams };
}
