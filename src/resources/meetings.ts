// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as NotesAPI from './notes';
import * as Shared from './shared';
import * as CollectionsAPI from './collections/collections';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Manage your meetings, files, and notes
 */
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
   * Adds a transcript, recording, or tags to an existing meeting.
   *
   * @example
   * ```ts
   * const meeting = await client.meetings.update('id', {
   *   recording: {
   *     provider_id: 'abc123',
   *     content_type: 'video/mp4',
   *     url: 'https://example.com/recording.mp4',
   *   },
   *   tags: [{ id: '1CLJt2vJy3SZLhqYW8rQoN', type: 'tag' }],
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
   * for await (const meetingPointer of client.meetings.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: MeetingListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MeetingPointersCursorPage, MeetingPointer> {
    return this._client.getAPIList('/meetings', CursorPage<MeetingPointer>, { query, ...options });
  }
}

export type MeetingPointersCursorPage = CursorPage<MeetingPointer>;

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
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  organization?: CollectionsAPI.ItemPointer;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  person?: CollectionsAPI.ItemPointer;
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
   * The tags currently applied to this meeting.
   */
  tags: Array<Shared.Tag>;

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
   * The Note object represents a block of text content, often used for meeting notes
   * or summaries.
   */
  note?: NotesAPI.Note | null;

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
   * The Note object represents a block of text content, often used for meeting notes
   * or summaries.
   */
  summary?: NotesAPI.Note | null;

  /**
   * The title or subject of the meeting.
   */
  title?: string;

  transcript?: MeetingTranscript | null;
}

export interface MeetingPointer {
  id: string;

  type: 'meeting';
}

export interface MeetingTranscript {
  cues: Array<MeetingTranscriptCue>;
}

export interface MeetingTranscriptCue {
  from: number;

  speaker: MeetingTranscriptSpeaker;

  text: string;

  to: number;
}

export interface MeetingTranscriptSpeaker {
  attendee_id?: string;

  label?: string;
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
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  organization?: CollectionsAPI.ItemPointer;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  person?: CollectionsAPI.ItemPointer;
}

export interface MeetingRetrieveParams {
  /**
   * Specifies which related objects to include in the response. Valid options are
   * `organizer`, `attendees`, `transcript`, `note`, and `summary`.
   */
  include?: Array<'organizer' | 'attendees' | 'transcript' | 'note' | 'summary'>;
}

export interface MeetingUpdateParams {
  /**
   * A video recording of the meeting.
   */
  recording?: MeetingUpdateParams.Recording;

  /**
   * Optional list of tag pointers to assign to the meeting. If omitted, existing
   * tags are unchanged. Pass an empty array to clear tags.
   */
  tags?: Array<Shared.TagPointerParam>;

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
    content_type: 'video/mp4';

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

  i_cal_uid?: MeetingListParams.ICalUid;

  /**
   * Maximum number of items to return per page. Must be between 1 and 100. Defaults
   * to 20 if not specified.
   */
  limit?: number;
}

export namespace MeetingListParams {
  export interface ICalUid {
    eq?: string;
  }
}

export declare namespace Meetings {
  export {
    type Attendee as Attendee,
    type Meeting as Meeting,
    type MeetingPointer as MeetingPointer,
    type MeetingTranscript as MeetingTranscript,
    type MeetingTranscriptCue as MeetingTranscriptCue,
    type MeetingTranscriptSpeaker as MeetingTranscriptSpeaker,
    type Organizer as Organizer,
    type MeetingPointersCursorPage as MeetingPointersCursorPage,
    type MeetingRetrieveParams as MeetingRetrieveParams,
    type MeetingUpdateParams as MeetingUpdateParams,
    type MeetingListParams as MeetingListParams,
  };
}
