// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
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
  ): APIPromise<MeetingListResponse> {
    return this._client.get('/meetings', { query, ...options });
  }
}

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
   * A hash of related links.
   */
  links: Attendee.Links;

  /**
   * String representing the object’s type. Always `attendee` for this object.
   */
  type: 'attendee';

  /**
   * Time at which the object was created, as an RFC 3339 timestamp.
   */
  created_at?: string;

  /**
   * Time at which the object was last updated, as an RFC 3339 timestamp.
   */
  updated_at?: string;
}

export namespace Attendee {
  /**
   * A hash of related links.
   */
  export interface Links {
    /**
     * A link to the associated `Organization` item.
     */
    organization: string;

    /**
     * A link to the associated `Person` item.
     */
    person: string;
  }
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
   * The end time of the meeting, as an RFC 3339 timestamp.
   */
  end_at: string;

  /**
   * The globally unique iCalendar UID for the meeting event.
   */
  i_cal_uid: string;

  links: Meeting.Links;

  /**
   * The unique identifier for the meeting from the external calendar provider (e.g.,
   * Google Calendar).
   */
  provider_id: string;

  /**
   * The start time of the meeting, as an RFC 3339 timestamp.
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
   * A list of `Attendee` objects for the meeting.
   */
  attendees?: Array<Attendee>;

  /**
   * Time at which the object was created, as an RFC 3339 timestamp.
   */
  created_at?: string;

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
   */
  organizer?: Organizer;

  /**
   * A URL to access the meeting in the external provider's system.
   */
  provider_uri?: string;

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
   * Time at which the object was last updated, as an RFC 3339 timestamp.
   */
  updated_at?: string;
}

export namespace Meeting {
  export interface Links {
    /**
     * The canonical URL for this object.
     */
    self: string;

    /**
     * A link to an associated `Note` object.
     */
    note?: string;

    /**
     * A temporary, signed URL to download the meeting recording. The URL expires after
     * one hour.
     */
    recording_url?: string;

    /**
     * A link to a long-form summary of the meeting.
     */
    summary?: string;

    /**
     * A temporary, signed URL to download the meeting transcript. The URL expires
     * after one hour.
     */
    transcript_url?: string;
  }
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

  links: Organizer.Links;

  /**
   * String representing the object’s type. Always `organizer` for this object.
   */
  type: 'organizer';

  /**
   * Time at which the object was created, as an RFC 3339 timestamp.
   */
  created_at?: string;

  /**
   * Time at which the object was last updated, as an RFC 3339 timestamp.
   */
  updated_at?: string;
}

export namespace Organizer {
  export interface Links {
    /**
     * A link to the associated `Organization` item.
     */
    organization: string;

    /**
     * A link to the associated `Person` item.
     */
    person: string;
  }
}

/**
 * A set of results using cursor-based pagination.
 */
export interface MeetingListResponse {
  /**
   * An array of Meeting items.
   */
  data: Array<Meeting>;

  type: 'list';

  /**
   * Links for navigating through the paginated results
   */
  links?: MeetingListResponse.Links;

  /**
   * Metadata about the pagination, including the cursors pointing to the previous
   * and next pages.
   */
  meta?: MeetingListResponse.Meta;
}

export namespace MeetingListResponse {
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

export interface MeetingRetrieveParams {
  /**
   * Specifies which related objects to include in the response. Valid options are
   * `organizer` and `attendees`.
   */
  include?: Array<'organizer' | 'attendees'>;
}

export interface MeetingListParams {
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

export declare namespace Meetings {
  export {
    type Attendee as Attendee,
    type Meeting as Meeting,
    type Organizer as Organizer,
    type MeetingListResponse as MeetingListResponse,
    type MeetingRetrieveParams as MeetingRetrieveParams,
    type MeetingListParams as MeetingListParams,
  };
}
