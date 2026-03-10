// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Manage your marketing campaigns and forms
 */
export class Unsubscribes extends APIResource {
  /**
   * Create a new unsubscribe.
   *
   * @example
   * ```ts
   * const unsubscribe = await client.unsubscribes.create({
   *   email: 'yoda@moonbase.ai',
   * });
   * ```
   */
  create(body: UnsubscribeCreateParams, options?: RequestOptions): APIPromise<Unsubscribe> {
    return this._client.post('/unsubscribes', { body, ...options });
  }

  /**
   * Returns a list of unsubscribes.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const unsubscribe of client.unsubscribes.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: UnsubscribeListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<UnsubscribesCursorPage, Unsubscribe> {
    return this._client.getAPIList('/unsubscribes', CursorPage<Unsubscribe>, { query, ...options });
  }

  /**
   * Permanently deletes an unsubscribe by email address.
   *
   * @example
   * ```ts
   * await client.unsubscribes.delete('email');
   * ```
   */
  delete(email: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/unsubscribes/${email}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type UnsubscribesCursorPage = CursorPage<Unsubscribe>;

export interface Unsubscribe {
  created_at: string;

  email: string;

  type: 'unsubscribe';
}

export interface UnsubscribeCreateParams {
  email: string;
}

export interface UnsubscribeListParams extends CursorPageParams {
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

export declare namespace Unsubscribes {
  export {
    type Unsubscribe as Unsubscribe,
    type UnsubscribesCursorPage as UnsubscribesCursorPage,
    type UnsubscribeCreateParams as UnsubscribeCreateParams,
    type UnsubscribeListParams as UnsubscribeListParams,
  };
}
