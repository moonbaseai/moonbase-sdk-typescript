// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ProgramTemplatesAPI from './program-templates';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
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
  ): PagePromise<ProgramsCursorPage, Program> {
    return this._client.getAPIList('/programs', CursorPage<Program>, { query, ...options });
  }
}

export type ProgramsCursorPage = CursorPage<Program>;

/**
 * The Program object represents an email campaign. It defines the sending behavior
 * and tracks engagement metrics.
 */
export interface Program {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * The current status of the program. Can be `draft`, `published`, `paused`, or
   * `archived`.
   */
  status: 'draft' | 'published' | 'paused' | 'archived';

  /**
   * `true` if link clicks are tracked for this program.
   */
  track_clicks: boolean;

  /**
   * `true` if email opens are tracked for this program.
   */
  track_opens: boolean;

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
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * A `ProgramActivityMetrics` object summarizing engagement for this program.
   *
   * **Note:** Only present when requested using the `include` query parameter.
   */
  activity_metrics?: Program.ActivityMetrics;

  /**
   * The user-facing name of the program.
   */
  display_name?: string;

  /**
   * The `ProgramTemplate` used for messages in this program.
   *
   * **Note:** Only present when requested using the `include` query parameter.
   */
  program_template?: ProgramTemplatesAPI.ProgramTemplate;

  /**
   * For `broadcast` programs, the time the program is scheduled to send, as an ISO
   * 8601 timestamp in UTC.
   */
  scheduled_at?: string;
}

export namespace Program {
  /**
   * A `ProgramActivityMetrics` object summarizing engagement for this program.
   *
   * **Note:** Only present when requested using the `include` query parameter.
   */
  export interface ActivityMetrics {
    /**
     * The number of emails that could not be delivered.
     */
    bounced: number;

    /**
     * The number of recipients who clicked at least one link.
     */
    clicked: number;

    /**
     * The number of recipients who marked the email as spam.
     */
    complained: number;

    /**
     * The number of emails that failed to send due to a technical issue.
     */
    failed: number;

    /**
     * The number of recipients who opened the email.
     */
    opened: number;

    /**
     * The total number of emails successfully sent.
     */
    sent: number;

    /**
     * The number of emails blocked by delivery protection rules.
     */
    shielded: number;

    /**
     * The number of recipients who unsubscribed.
     */
    unsubscribed: number;
  }
}

export interface ProgramRetrieveParams {
  /**
   * Specifies which related objects to include in the response. Valid options are
   * `activity_metrics` and `program_template`.
   */
  include?: Array<'activity_metrics' | 'program_template'>;
}

export interface ProgramListParams extends CursorPageParams {
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
    type ProgramsCursorPage as ProgramsCursorPage,
    type ProgramRetrieveParams as ProgramRetrieveParams,
    type ProgramListParams as ProgramListParams,
  };
}
