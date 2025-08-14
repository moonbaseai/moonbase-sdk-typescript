// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ProgramsAPI from './programs';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ProgramTemplates extends APIResource {
  /**
   * Retrieves the details of an existing program template.
   */
  retrieve(
    id: string,
    query: ProgramTemplateRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProgramTemplate> {
    return this._client.get(path`/program_templates/${id}`, { query, ...options });
  }

  /**
   * Returns a list of your program templates.
   */
  list(
    query: ProgramTemplateListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ProgramTemplatesCursorPage, ProgramTemplate> {
    return this._client.getAPIList('/program_templates', CursorPage<ProgramTemplate>, { query, ...options });
  }
}

export type ProgramTemplatesCursorPage = CursorPage<ProgramTemplate>;

/**
 * The ProgramTemplate object defines the content of a message sent by a `Program`,
 * including support for Liquid templating.
 */
export interface ProgramTemplate {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The body content of the email, which can include Liquid variables.
   */
  body: string;

  links: ProgramTemplate.Links;

  /**
   * The subject line of the email, which can include Liquid variables.
   */
  subject: string;

  /**
   * String representing the object’s type. Always `program_template` for this
   * object.
   */
  type: 'program_template';

  /**
   * Time at which the object was created, as an RFC 3339 timestamp.
   */
  created_at?: string;

  /**
   * The `Program` that uses this template.
   */
  program?: ProgramsAPI.Program;

  /**
   * Time at which the object was last updated, as an RFC 3339 timestamp.
   */
  updated_at?: string;
}

export namespace ProgramTemplate {
  export interface Links {
    /**
     * The canonical URL for this object.
     */
    self: string;

    /**
     * The `Program` using this template.
     */
    program?: string;
  }
}

export interface ProgramTemplateRetrieveParams {
  /**
   * Specifies which related objects to include in the response. Valid option is
   * `program`.
   */
  include?: Array<'program'>;
}

export interface ProgramTemplateListParams extends CursorPageParams {
  /**
   * When specified, returns results starting immediately before the item identified
   * by this cursor. Use the cursor value from the response's metadata to fetch the
   * previous page of results.
   */
  before?: string;

  /**
   * Specifies which related objects to include in the response. Valid option is
   * `program`.
   */
  include?: Array<'program'>;

  /**
   * Maximum number of items to return per page. Must be between 1 and 100. Defaults
   * to 20 if not specified.
   */
  limit?: number;
}

export declare namespace ProgramTemplates {
  export {
    type ProgramTemplate as ProgramTemplate,
    type ProgramTemplatesCursorPage as ProgramTemplatesCursorPage,
    type ProgramTemplateRetrieveParams as ProgramTemplateRetrieveParams,
    type ProgramTemplateListParams as ProgramTemplateListParams,
  };
}
