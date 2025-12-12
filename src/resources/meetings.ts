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
   *
   * @example
   * ```ts
   * const meeting = await client.meetings.retrieve('id');
   * ```
   */
  retrieve(
    id: string,
    query: MeetingRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Meeting> {
    return this._client.get(path`/meetings/${id}`, { query, ...options });
  }

  /**
   * Adds a transcript or recording to an existing meeting.
   *
   * @example
   * ```ts
   * const meeting = await client.meetings.update('id', {
   *   recording: {
   *     provider_id: 'abc123',
   *     content_type: 'video/mp4',
   *     url: 'https://example.com/recording.mp4',
   *   },
   *   transcript: {
   *     provider: 'example',
   *     provider_id: 'def456',
   *     cues: [
   *       {
   *         from: 0.71999997,
   *         to: 1.22,
   *         text: 'Hello.',
   *         speaker: 'Jony Appleseed',
   *       },
   *       {
   *         from: 1.52,
   *         to: 3.22,
   *         text: "Hey! It's been too long.",
   *         speaker: 'Jane Doe',
   *       },
   *     ],
   *   },
   * });
   * ```
   */
  update(id: string, body: MeetingUpdateParams, options?: RequestOptions): APIPromise<Meeting> {
    return this._client.patch(path`/meetings/${id}`, { body, ...options });
  }

  /**
   * Returns a list of meetings.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const meeting of client.meetings.list()) {
   *   // ...
   * }
   * ```
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

  transcript?: Meeting.Transcript | null;
}

export namespace Meeting {
  export interface Transcript {
    cues: Array<Transcript.Cue>;
  }

  export namespace Transcript {
    export interface Cue {
      from: number;

      speaker: Cue.Speaker;

      text: string;

      to: number;
    }

    export namespace Cue {
      export interface Speaker {
        attendee_id?: string;

        label?: string;
      }
    }
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
  include?: Array<'organizer' | 'attendees' | 'transcript'>;
}

export interface MeetingUpdateParams {
  /**
   * A video recording of the meeting.
   */
  recording?: MeetingUpdateParams.Recording;

  /**
   * The meeting transcript.
   */
  transcript?: MeetingUpdateParams.Transcript;
}

export namespace MeetingUpdateParams {
  /**
   * A video recording of the meeting.
   */
  export interface Recording {
    /**
     * The content type of the recording. Note that only `video/mp4` is supported at
     * this time.
     */
    content_type: string;

    /**
     * The unique identifier for the recording from the provider's system.
     */
    provider_id: string;

    /**
     * The URL pointing to the recording.
     */
    url: string;
  }

  /**
   * The meeting transcript.
   */
  export interface Transcript {
    /**
     * A list of cues that identify the text spoken in specific time slices of the
     * meeting.
     */
    cues: Array<Transcript.Cue>;

    /**
     * Identifies the source of the transcript.
     */
    provider: string;

    /**
     * The unique identifier for the transcript from the provider's system.
     */
    provider_id: string;
  }

  export namespace Transcript {
    /**
     * Parameters for creating a `MeetingTranscriptCue` object to capture the text
     * spoken in a specific time slice.
     */
    export interface Cue {
      /**
       * The start time of the slice, in fractional seconds from the start of the
       * meeting.
       */
      from: number;

      /**
       * The name of the person speaking.
       */
      speaker: string;

      /**
       * The text spoken during the slice.
       */
      text: string;

      /**
       * The end time of the slice, in fractional seconds from the start of the meeting.
       */
      to: number;
    }
  }
}

export interface MeetingListParams extends CursorPageParams {
  /**
   * When specified, returns results starting immediately before the item identified
   * by this cursor. Use the cursor value from the response's metadata to fetch the
   * previous page of results.
   */
  before?: string;

  filter?: MeetingListParams.Filter;

  /**
   * Maximum number of items to return per page. Must be between 1 and 100. Defaults
   * to 20 if not specified.
   */
  limit?: number;
}

export namespace MeetingListParams {
  export interface Filter {
    i_cal_uid?: Filter.ICalUid;
  }

  export namespace Filter {
    export interface ICalUid {
      eq?: string;
    }
  }
}

export declare namespace Meetings {
  export {
    type Attendee as Attendee,
    type Meeting as Meeting,
    type Organizer as Organizer,
    type MeetingsCursorPage as MeetingsCursorPage,
    type MeetingRetrieveParams as MeetingRetrieveParams,
    type MeetingUpdateParams as MeetingUpdateParams,
    type MeetingListParams as MeetingListParams,
  };
}
