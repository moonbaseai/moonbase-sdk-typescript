// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CollectionsAPI from './collections/collections';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Manage your marketing campaigns and forms
 */
export class Forms extends APIResource {
  /**
   * Creates a new form with an auto-generated collection and default fields.
   *
   * @example
   * ```ts
   * const form = await client.forms.create({
   *   name: 'Contact Us',
   *   pages_enabled: true,
   *   redirect_url: 'https://example.com/thanks',
   * });
   * ```
   */
  create(body: FormCreateParams, options?: RequestOptions): APIPromise<Form> {
    return this._client.post('/forms', { body, ...options });
  }

  /**
   * Retrieves the details of an existing form.
   *
   * @example
   * ```ts
   * const form = await client.forms.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Form> {
    return this._client.get(path`/forms/${id}`, options);
  }

  /**
   * Updates an existing form.
   *
   * @example
   * ```ts
   * const form = await client.forms.update('id', {
   *   business_email_required: true,
   *   name: 'Updated Form',
   * });
   * ```
   */
  update(id: string, body: FormUpdateParams, options?: RequestOptions): APIPromise<Form> {
    return this._client.patch(path`/forms/${id}`, { body, ...options });
  }

  /**
   * Returns a list of your forms.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const form of client.forms.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: FormListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<FormsCursorPage, Form> {
    return this._client.getAPIList('/forms', CursorPage<Form>, { query, ...options });
  }

  /**
   * Permanently deletes a form. The backing collection is preserved.
   *
   * @example
   * ```ts
   * await client.forms.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/forms/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
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
   * `true` if submissions require a business email address, blocking free and
   * disposable providers.
   */
  business_email_required: boolean;

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
   * If `true`, a Moonbase Pages hosted page is enabled for this form, providing a
   * standalone public URL for sharing.
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
   * Optional URL the user is redirected to after a successful submission. When
   * unset, no redirect occurs. Stored as a Liquid template; rendered at submission
   * time with form field values under `submission.<key>` (keyed by the field's
   * `key`) plus UTM params (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`,
   * `utm_content`) automatically appended. Use the `uri_encode` filter for URL-safe
   * values, e.g.
   * `https://example.com/thanks?email={{ submission.email | uri_encode }}`. The
   * rendered URL must parse as a valid URL or the submission errors.
   */
  redirect_url?: string;
}

export interface FormCreateParams {
  /**
   * The name of the form, used as the title on its public page.
   */
  name: string;

  /**
   * If `true`, submissions require a business email address. Defaults to `false`.
   */
  business_email_required?: boolean;

  /**
   * If `true`, enables a Moonbase Pages hosted page for this form, providing a
   * standalone public URL for sharing. Defaults to `false`.
   */
  pages_enabled?: boolean;

  /**
   * Optional URL the user is redirected to after a successful submission. Omit to
   * leave submissions without a redirect. Stored as a Liquid template; rendered at
   * submission time with form field values under `submission.<key>` (keyed by the
   * field's `key`) plus UTM params (`utm_source`, `utm_medium`, `utm_campaign`,
   * `utm_term`, `utm_content`) automatically appended. Use the `uri_encode` filter
   * for URL-safe values, e.g.
   * `https://example.com/thanks?email={{ submission.email | uri_encode }}`. The
   * rendered URL must parse as a valid URL or the submission errors.
   */
  redirect_url?: string;
}

export interface FormUpdateParams {
  /**
   * If `true`, submissions require a business email address.
   */
  business_email_required?: boolean;

  /**
   * The new name for the form.
   */
  name?: string;

  /**
   * If `true`, a Moonbase Pages hosted page is enabled for this form, providing a
   * standalone public URL for sharing.
   */
  pages_enabled?: boolean;

  /**
   * Updated redirect URL, or `null` to clear. Omit to leave the existing value
   * unchanged. Liquid template rendered at submission time with form field values
   * under `submission.<key>` (keyed by the field's `key`) plus UTM params
   * (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`)
   * automatically appended. Use the `uri_encode` filter for URL-safe values. The
   * rendered URL must parse as a valid URL or the submission errors.
   */
  redirect_url?: string | null;
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
    type FormCreateParams as FormCreateParams,
    type FormUpdateParams as FormUpdateParams,
    type FormListParams as FormListParams,
  };
}
