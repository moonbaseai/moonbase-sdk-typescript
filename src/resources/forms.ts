// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CollectionsAPI from './collections/collections';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Forms extends APIResource {
  /**
   * Retrieves the details of an existing form.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Form> {
    return this._client.get(path`/forms/${id}`, options);
  }

  /**
   * Returns a list of your forms.
   */
  list(
    query: FormListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<FormsCursorPage, Form> {
    return this._client.getAPIList('/forms', CursorPage<Form>, { query, ...options });
  }
}

export type FormsCursorPage = CursorPage<Form>;

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

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * The name of the form, used as the title on its public page.
   */
  name: string;

  /**
   * `true` if the form is available at a public URL.
   */
  pages_enabled: boolean;

  /**
   * String representing the object’s type. Always `form` for this object.
   */
  type: 'form';

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * The public URL for the form, if `pages_enabled` is `true`.
   */
  pages_url?: string;

  /**
   * An optional URL to redirect users to after a successful submission.
   */
  redirect_url?: string;
}

export interface FormListParams extends CursorPageParams {
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

export declare namespace Forms {
  export {
    type Form as Form,
    type FormsCursorPage as FormsCursorPage,
    type FormListParams as FormListParams,
  };
}
