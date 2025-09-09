// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Meetings extends APIResource {
  /**
   * Retrieves the details of an existing meeting.
   */
  retrieve(
    id: string,
    query: MeetingRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Meeting> {
    return this._client.get(path`/meetings/${id}`, { query, ...options });
  }

  /**
   * Returns a list of meetings.
   */
  list(
    query: MeetingListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MeetingsCursorPage, Meeting> {
    return this._client.getAPIList('/meetings', CursorPage<Meeting>, { query, ...options });
  }
}

export type MeetingsCursorPage = CursorPage<Meeting>;

/**
 * The Attendee object represents a participant in a meeting. It includes their
 * email address and links to associated `Person` and `Organization` items, if they
 * exist in your collections.
 */
export interface Attendee {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The email address of the attendee.
   */
  email: string;

  /**
   * String representing the object’s type. Always `meeting_attendee` for this
   * object.
   */
  type: 'meeting_attendee';

  /**
   * A lightweight reference to another resource.
   */
  organization?: Shared.Pointer;

  /**
   * A lightweight reference to another resource.
   */
  person?: Shared.Pointer;
}

/**
 * The Meeting object represents a calendar event. It includes details about the
 * participants, timing, and associated content like summaries and recordings.
 */
export interface Meeting {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * The end time of the meeting, as an ISO 8601 timestamp in UTC.
   */
  end_at: string;

  /**
   * The globally unique iCalendar UID for the meeting event.
   */
  i_cal_uid: string;

  /**
   * The unique identifier for the meeting from the external calendar provider (e.g.,
   * Google Calendar).
   */
  provider_id: string;

  /**
   * The start time of the meeting, as an ISO 8601 timestamp in UTC.
   */
  start_at: string;

  /**
   * The IANA time zone in which the meeting is scheduled (e.g.,
   * `America/Los_Angeles`).
   */
  time_zone: string;

  /**
   * String representing the object’s type. Always `meeting` for this object.
   */
  type: 'meeting';

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * A list of `Attendee` objects for the meeting.
   *
   * **Note:** Only present when requested using the `include` query parameter.
   */
  attendees?: Array<Attendee>;

  /**
   * A detailed description or agenda for the meeting.
   */
  description?: string;

  /**
   * The duration of the meeting in seconds.
   */
  duration?: number;

  /**
   * The physical or virtual location of the meeting.
   */
  location?: string;

  /**
   * The `Organizer` of the meeting.
   *
   * **Note:** Only present when requested using the `include` query parameter.
   */
  organizer?: Organizer;

  /**
   * A URL to access the meeting in the external provider's system.
   */
  provider_uri?: string;

  /**
   * A temporary, signed URL to download the meeting recording. The URL expires after
   * one hour.
   */
  recording_url?: string;

  /**
   * A summary or notes generated before the meeting.
   */
  summary_ante?: string;

  /**
   * A summary or notes generated after the meeting.
   */
  summary_post?: string;

  /**
   * The title or subject of the meeting.
   */
  title?: string;

  /**
   * A temporary, signed URL to download the meeting transcript. The URL expires
   * after one hour.
   */
  transcript_url?: string;
}

/**
 * Represents the organizer of a meeting.
 */
export interface Organizer {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The email address of the organizer.
   */
  email: string;

  /**
   * String representing the object’s type. Always `meeting_organizer` for this
   * object.
   */
  type: 'meeting_organizer';

  /**
   * A lightweight reference to another resource.
   */
  organization?: Shared.Pointer;

  /**
   * A lightweight reference to another resource.
   */
  person?: Shared.Pointer;
}

export interface MeetingRetrieveParams {
  /**
   * Specifies which related objects to include in the response. Valid options are
   * `organizer` and `attendees`.
   */
  include?: Array<'organizer' | 'attendees'>;
}

export interface MeetingListParams extends CursorPageParams {
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

export declare namespace Meetings {
  export {
    type Attendee as Attendee,
    type Meeting as Meeting,
    type Organizer as Organizer,
    type MeetingsCursorPage as MeetingsCursorPage,
    type MeetingRetrieveParams as MeetingRetrieveParams,
    type MeetingListParams as MeetingListParams,
  };
}
