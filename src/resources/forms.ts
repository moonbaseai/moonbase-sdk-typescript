// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CollectionsAPI from './collections';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Forms extends APIResource {
  /**
   * Retrieves the details of an existing form.
   */
  retrieve(
    id: string,
    query: FormRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Form> {
    return this._client.get(path`/forms/${id}`, { query, ...options });
  }

  /**
   * Returns a list of your forms.
   */
  list(
    query: FormListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FormListResponse> {
    return this._client.get('/forms', { query, ...options });
  }
}

/**
 * A Form provides a way to create `Items` in a `Collection`, often via a public
 * URL for external users. Each form submission creates a new item.
 */
export interface Form {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The `Collection` that submissions to this form are saved to.
   */
  collection: CollectionsAPI.Collection;

  links: Form.Links;

  /**
   * The name of the form, used as the title on its public page.
   */
  name: string;

  /**
   * String representing the object’s type. Always `form` for this object.
   */
  type: 'form';

  /**
   * Time at which the object was created, as an RFC 3339 timestamp.
   */
  created_at?: string;

  /**
   * `true` if the form is available at a public URL.
   */
  pages_enabled?: boolean;

  /**
   * The public URL for the form, if `pages_enabled` is `true`.
   */
  pages_url?: string;

  /**
   * An optional URL to redirect users to after a successful submission.
   */
  redirect_url?: string;

  /**
   * Time at which the object was last updated, as an RFC 3339 timestamp.
   */
  updated_at?: string;
}

export namespace Form {
  export interface Links {
    /**
     * The canonical URL for this object.
     */
    self: string;

    /**
     * A link to the `Collection` where form submissions are saved.
     */
    collection?: string;
  }
}

/**
 * A set of results using cursor-based pagination.
 */
export interface FormListResponse {
  /**
   * An array of Form items.
   */
  data: Array<Form>;

  type: 'list';

  /**
   * Links for navigating through the paginated results
   */
  links?: FormListResponse.Links;

  /**
   * Metadata about the pagination, including the cursors pointing to the previous
   * and next pages.
   */
  meta?: FormListResponse.Meta;
}

export namespace FormListResponse {
  /**
   * Links for navigating through the paginated results
   */
  export interface Links {
    next?: string;

    prev?: string;
  }

  /**
   * Metadata about the pagination, including the cursors pointing to the previous
   * and next pages.
   */
  export interface Meta {
    cursors?: Meta.Cursors;

    /**
     * Indicates if there are more results available. If true, the `next` cursor will
     * be present.
     */
    has_more?: boolean;
  }

  export namespace Meta {
    export interface Cursors {
      /**
       * Cursor for the next page. This value should be used with the `after` query
       * parameter to fetch the next page of results.
       */
      next?: string;

      /**
       * Cursor for the previous page. This value should be used with the `before` query
       * parameter to fetch the previous page of results.
       */
      prev?: string;
    }
  }
}

export interface FormRetrieveParams {
  /**
   * Specifies which related objects to include in the response. Valid option is
   * `collection.fields`.
   */
  include?: Array<'collection.fields'>;
}

export interface FormListParams {
  /**
   * When specified, returns results starting immediately after the item identified
   * by this cursor. Use the cursor value from the previous response's metadata to
   * fetch the next page of results.
   */
  after?: string;

  /**
   * When specified, returns results starting immediately before the item identified
   * by this cursor. Use the cursor value from the response's metadata to fetch the
   * previous page of results.
   */
  before?: string;

  /**
   * Specifies which related objects to include in the response. Valid option is
   * `collection.fields`.
   */
  include?: Array<'collection.fields'>;

  /**
   * Maximum number of items to return per page. Must be between 1 and 100. Defaults
   * to 20 if not specified.
   */
  limit?: number;
}

export declare namespace Forms {
  export {
    type Form as Form,
    type FormListResponse as FormListResponse,
    type FormRetrieveParams as FormRetrieveParams,
    type FormListParams as FormListParams,
  };
}
