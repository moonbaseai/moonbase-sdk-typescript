// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ProgramTemplatesAPI from './program-templates';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Programs extends APIResource {
  /**
   * Retrieves the details of an existing program.
   */
  retrieve(
    id: string,
    query: ProgramRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Program> {
    return this._client.get(path`/programs/${id}`, { query, ...options });
  }

  /**
   * Returns a list of your marketing programs.
   */
  list(
    query: ProgramListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProgramListResponse> {
    return this._client.get('/programs', { query, ...options });
  }
}

/**
 * The Program object represents an email campaign. It defines the sending behavior
 * and tracks engagement metrics.
 */
export interface Program {
  /**
   * Unique identifier for the object.
   */
  id: string;

  links: Program.Links;

  /**
   * The current status of the program. Can be `draft`, `published`, `paused`, or
   * `archived`.
   */
  status: 'draft' | 'published' | 'paused' | 'archived';

  /**
   * The sending trigger for the program. Can be `api` for transactional sends or
   * `broadcast` for scheduled sends.
   */
  trigger: 'api' | 'broadcast';

  /**
   * String representing the object’s type. Always `program` for this object.
   */
  type: 'program';

  /**
   * A `ProgramActivityMetrics` object summarizing engagement for this program.
   */
  activity_metrics?: Program.ActivityMetrics;

  /**
   * Time at which the object was created, as an RFC 3339 timestamp.
   */
  created_at?: string;

  /**
   * The user-facing name of the program.
   */
  display_name?: string;

  /**
   * The `ProgramTemplate` used for messages in this program.
   */
  program_template?: ProgramTemplatesAPI.ProgramTemplate;

  /**
   * For `broadcast` programs, the time the program is scheduled to send, as an RFC
   * 3339 timestamp.
   */
  scheduled_at?: string;

  /**
   * `true` if link clicks are tracked for this program.
   */
  track_clicks?: boolean;

  /**
   * `true` if email opens are tracked for this program.
   */
  track_opens?: boolean;

  /**
   * Time at which the object was last updated, as an RFC 3339 timestamp.
   */
  updated_at?: string;
}

export namespace Program {
  export interface Links {
    /**
     * A link to the `ProgramTemplate` for this program.
     */
    program_template: string;

    /**
     * The canonical URL for this object.
     */
    self: string;
  }

  /**
   * A `ProgramActivityMetrics` object summarizing engagement for this program.
   */
  export interface ActivityMetrics {
    /**
     * The number of emails that could not be delivered.
     */
    bounced?: number;

    /**
     * The number of recipients who clicked at least one link.
     */
    clicked?: number;

    /**
     * The number of recipients who marked the email as spam.
     */
    complained?: number;

    /**
     * The number of emails that failed to send due to a technical issue.
     */
    failed?: number;

    /**
     * The number of recipients who opened the email.
     */
    opened?: number;

    /**
     * The total number of emails successfully sent.
     */
    sent?: number;

    /**
     * The number of emails blocked by delivery protection rules.
     */
    shielded?: number;

    /**
     * The number of recipients who unsubscribed.
     */
    unsubscribed?: number;
  }
}

/**
 * A set of results using cursor-based pagination.
 */
export interface ProgramListResponse {
  /**
   * An array of Program items.
   */
  data: Array<Program>;

  type: 'list';

  /**
   * Links for navigating through the paginated results
   */
  links?: ProgramListResponse.Links;

  /**
   * Metadata about the pagination, including the cursors pointing to the previous
   * and next pages.
   */
  meta?: ProgramListResponse.Meta;
}

export namespace ProgramListResponse {
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

export interface ProgramRetrieveParams {
  /**
   * Specifies which related objects to include in the response. Valid options are
   * `activity_metrics` and `program_template`.
   */
  include?: Array<'activity_metrics' | 'program_template'>;
}

export interface ProgramListParams {
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
   * Maximum number of items to return per page. Must be between 1 and 100. Defaults
   * to 20 if not specified.
   */
  limit?: number;
}

export declare namespace Programs {
  export {
    type Program as Program,
    type ProgramListResponse as ProgramListResponse,
    type ProgramRetrieveParams as ProgramRetrieveParams,
    type ProgramListParams as ProgramListParams,
  };
}
