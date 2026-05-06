// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Manage your collections and items
 */
export class Funnels extends APIResource {
  /**
   * Creates a new funnel.
   *
   * @example
   * ```ts
   * const funnel = await client.funnels.create({
   *   name: 'Sales Pipeline',
   *   steps: [
   *     {
   *       name: 'New Lead',
   *       step_type: 'active',
   *       color: 'blue',
   *     },
   *     {
   *       name: 'Qualified',
   *       step_type: 'active',
   *       color: 'cyan',
   *     },
   *     {
   *       name: 'Won',
   *       step_type: 'success',
   *       color: 'green',
   *     },
   *     {
   *       name: 'Lost',
   *       step_type: 'failure',
   *       color: 'red',
   *     },
   *   ],
   * });
   * ```
   */
  create(body: FunnelCreateParams, options?: RequestOptions): APIPromise<Funnel> {
    return this._client.post('/funnels', { body, ...options });
  }

  /**
   * Retrieves the details of an existing funnel.
   *
   * @example
   * ```ts
   * const funnel = await client.funnels.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Funnel> {
    return this._client.get(path`/funnels/${id}`, options);
  }

  /**
   * Updates a funnel.
   *
   * @example
   * ```ts
   * const funnel = await client.funnels.update('id', {
   *   name: 'Revenue Pipeline',
   * });
   * ```
   */
  update(id: string, body: FunnelUpdateParams, options?: RequestOptions): APIPromise<Funnel> {
    return this._client.patch(path`/funnels/${id}`, { body, ...options });
  }

  /**
   * Returns a list of funnels.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const funnel of client.funnels.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: FunnelListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<FunnelsCursorPage, Funnel> {
    return this._client.getAPIList('/funnels', CursorPage<Funnel>, { query, ...options });
  }

  /**
   * Permanently deletes a funnel.
   *
   * @example
   * ```ts
   * await client.funnels.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/funnels/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type FunnelsCursorPage = CursorPage<Funnel>;

/**
 * A Funnel represents a series of steps used to track progression.
 */
export interface Funnel {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * The name of the funnel.
   */
  name: string;

  /**
   * An ordered list of `FunnelStep` objects that make up the funnel.
   */
  steps: Array<FunnelStep>;

  /**
   * String representing the object’s type. Always `funnel` for this object.
   */
  type: 'funnel';

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;
}

/**
 * Represents a single step within a `Funnel`.
 */
export interface FunnelStep {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The display color of the step.
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
   * The name of the step.
   */
  name: string;

  /**
   * The status of the step in the funnel flow.
   *
   * - `active`: represents an in progress state within the funnel
   * - `success`: completed successfully and exited the funnel
   * - `failure`: exited the funnel without conversion
   */
  step_type: 'active' | 'success' | 'failure';

  /**
   * String representing the object’s type. Always `funnel_step` for this object.
   */
  type: 'funnel_step';
}

export interface FunnelStepPointer {
  id: string;

  type: 'funnel_step';
}

export interface FunnelCreateParams {
  /**
   * The name of the funnel.
   */
  name: string;

  /**
   * An ordered list of steps to create. Array order determines step order.
   */
  steps?: Array<FunnelCreateParams.Step>;
}

export namespace FunnelCreateParams {
  /**
   * Parameters for creating a funnel step.
   */
  export interface Step {
    /**
     * The display color of the step.
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
     * The name of the step.
     */
    name: string;

    /**
     * The status of the step in the funnel flow.
     *
     * - `active`: represents an in progress state within the funnel
     * - `success`: completed successfully and exited the funnel
     * - `failure`: exited the funnel without conversion
     */
    step_type: 'active' | 'success' | 'failure';
  }
}

export interface FunnelUpdateParams {
  /**
   * The name of the funnel.
   */
  name?: string;

  /**
   * An ordered list of steps. Providing this replaces all existing steps. Omitting
   * preserves existing steps.
   */
  steps?: Array<FunnelUpdateParams.Step>;
}

export namespace FunnelUpdateParams {
  /**
   * Parameters for updating a funnel step. Include `id` to update an existing step,
   * or omit `id` to create a new one. Steps not included are removed.
   */
  export interface Step {
    /**
     * The display color of the step.
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
     * The name of the step.
     */
    name: string;

    /**
     * The status of the step in the funnel flow.
     *
     * - `active`: represents an in progress state within the funnel
     * - `success`: completed successfully and exited the funnel
     * - `failure`: exited the funnel without conversion
     */
    step_type: 'active' | 'success' | 'failure';

    /**
     * The ID of an existing step to update. Omit to create a new step.
     */
    id?: string;
  }
}

export interface FunnelListParams extends CursorPageParams {
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

export declare namespace Funnels {
  export {
    type Funnel as Funnel,
    type FunnelStep as FunnelStep,
    type FunnelStepPointer as FunnelStepPointer,
    type FunnelsCursorPage as FunnelsCursorPage,
    type FunnelCreateParams as FunnelCreateParams,
    type FunnelUpdateParams as FunnelUpdateParams,
    type FunnelListParams as FunnelListParams,
  };
}
