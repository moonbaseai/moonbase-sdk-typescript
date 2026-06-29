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
 * View activities and capture calls
 */
export class Calls extends APIResource {
  /**
   * Logs a phone call.
   *
   * @example
   * ```ts
   * const call = await client.calls.create({
   *   direction: 'incoming',
   *   participants: [
   *     { phone: '+14155551212', role: 'caller' },
   *     { phone: '+16505551212', role: 'callee' },
   *   ],
   *   provider: 'openphone',
   *   provider_id: 'openphone_id_000000000007',
   *   provider_status: 'completed',
   *   start_at: '2025-02-17T15:00:00.000Z',
   *   answered_at: '2025-02-17T15:01:00Z',
   *   end_at: '2025-02-17T15:30:00.000Z',
   *   provider_metadata: {
   *     answered_by: 'UShjUatqtF',
   *     user_id: 'UShjUatqtF',
   *     phone_number_id: 'PN72zMikBJ',
   *     conversation_id: 'CN3b48bcc423e772aeba377414a4fa6a06',
   *   },
   * });
   * ```
   */
  create(body: CallCreateParams, options?: RequestOptions): APIPromise<Call> {
    return this._client.post('/calls', { body, ...options });
  }

  /**
   * Retrieves the details of an existing call.
   *
   * @example
   * ```ts
   * const call = await client.calls.retrieve('id');
   * ```
   */
  retrieve(
    id: string,
    query: CallRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Call> {
    return this._client.get(path`/calls/${id}`, { query, ...options });
  }

  /**
   * Returns a list of calls.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const call of client.calls.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: CallListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CallsCursorPage, Call> {
    return this._client.getAPIList('/calls', CursorPage<Call>, { query, ...options });
  }

  /**
   * Find and update an existing phone call, or create a new one.
   *
   * @example
   * ```ts
   * const call = await client.calls.upsert({
   *   direction: 'incoming',
   *   participants: [
   *     { phone: '+14155551212', role: 'caller' },
   *     { phone: '+16505551212', role: 'callee' },
   *   ],
   *   provider: 'openphone',
   *   provider_id: 'openphone_id_000000000002',
   *   provider_status: 'completed',
   *   start_at: '2025-02-17T15:00:00.000Z',
   *   answered_at: '2025-02-17T15:01:00Z',
   *   end_at: '2025-02-17T15:30:00.000Z',
   *   provider_metadata: {
   *     answered_by: 'UShjUatqtF',
   *     user_id: 'UShjUatqtF',
   *     phone_number_id: 'PN72zMikBJ',
   *     conversation_id: 'CN3b48bcc423e772aeba377414a4fa6a06',
   *   },
   * });
   * ```
   */
  upsert(body: CallUpsertParams, options?: RequestOptions): APIPromise<Call> {
    return this._client.post('/calls/upsert', { body, ...options });
  }
}

export type CallsCursorPage = CursorPage<Call>;

/**
 * The Call object represents a phone call that has been logged in the system. It
 * contains details about the participants, timing, and outcome of the call.
 */
export interface Call {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * The direction of the call, either `incoming` or `outgoing`.
   */
  direction: 'incoming' | 'outgoing';

  /**
   * The participants involved in the call.
   */
  participants: Array<CallParticipant>;

  /**
   * The name of the phone provider that handled the call.
   */
  provider: 'openphone' | 'user' | 'zoom_phone';

  /**
   * The unique identifier for the call from the provider's system.
   */
  provider_id: string;

  /**
   * The current status of the call.
   */
  provider_status: string;

  /**
   * The time the call started, as an ISO 8601 timestamp in UTC.
   */
  start_at: string;

  /**
   * The tags currently applied to this call.
   */
  tags: Array<Shared.Tag>;

  /**
   * String representing the object’s type. Always `call` for this object.
   */
  type: 'call';

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * The time the call was answered, if available, as an ISO 8601 timestamp in UTC.
   */
  answered_at?: string;

  /**
   * The time the call ended, if available, as an ISO 8601 timestamp in UTC.
   */
  end_at?: string;

  /**
   * The Note object represents a block of text content, often used for meeting notes
   * or summaries.
   */
  note?: NotesAPI.Note | null;

  /**
   * A hash of additional metadata from the provider.
   */
  provider_metadata?: { [key: string]: unknown };

  /**
   * The Note object represents a block of text content, often used for meeting notes
   * or summaries.
   */
  summary?: NotesAPI.Note | null;

  transcript?: CallTranscript | null;
}

/**
 * Represents a participant in a call.
 */
export interface CallParticipant {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The E.164 formatted phone number of the participant.
   */
  phone: string;

  /**
   * The role of the participant in the call. Can be `caller`, `callee`, or `other`.
   */
  role: 'caller' | 'callee' | 'other';

  /**
   * String representing the object’s type. Always `call_participant` for this
   * object.
   */
  type: 'call_participant';

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

export interface CallPointer {
  id: string;

  type: 'call';
}

export interface CallTranscript {
  cues: Array<CallTranscriptCue>;
}

export interface CallTranscriptCue {
  from: number;

  speaker: CallTranscriptSpeaker;

  text: string;

  to: number;
}

export interface CallTranscriptSpeaker {
  attendee_id?: string;

  label?: string;
}

export interface CallCreateParams {
  /**
   * The direction of the call, either `incoming` or `outgoing`.
   */
  direction: 'incoming' | 'outgoing';

  /**
   * An array of participants involved in the call.
   */
  participants: Array<CallCreateParams.Participant>;

  /**
   * The name of the phone provider that handled the call (e.g., `openphone`).
   */
  provider: 'openphone' | 'user' | 'zoom_phone';

  /**
   * The unique identifier for the call from the provider's system.
   */
  provider_id: string;

  /**
   * The status of the call.
   */
  provider_status: string;

  /**
   * The time the call started, as an ISO 8601 timestamp in UTC.
   */
  start_at: string;

  /**
   * The time the call was answered, as an ISO 8601 timestamp in UTC.
   */
  answered_at?: string;

  /**
   * The time the call ended, as an ISO 8601 timestamp in UTC.
   */
  end_at?: string;

  /**
   * A hash of additional metadata from the provider.
   */
  provider_metadata?: { [key: string]: unknown };

  /**
   * Any recordings associated with the call.
   */
  recordings?: Array<CallCreateParams.Recording>;

  /**
   * Optional list of tag pointers to assign to the call.
   */
  tags?: Array<Shared.TagPointerParam>;

  /**
   * A transcript of the call.
   */
  transcript?: CallCreateParams.Transcript;
}

export namespace CallCreateParams {
  /**
   * Parameters for creating a `Participant` object.
   */
  export interface Participant {
    /**
     * The E.164 formatted phone number of the participant.
     */
    phone: string;

    /**
     * The role of the participant in the call. Can be `caller`, `callee`, or `other`.
     */
    role: 'caller' | 'callee' | 'other';
  }

  /**
   * Parameters for creating a `CallRecording` object.
   */
  export interface Recording {
    /**
     * The content type of the recording. Note that only `audio/mpeg` is supported at
     * this time.
     */
    content_type: 'audio/mpeg';

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
   * A transcript of the call.
   */
  export interface Transcript {
    /**
     * A list of cues that identify the text spoken in specific time slices of the
     * call.
     */
    cues: Array<Transcript.Cue>;
  }

  export namespace Transcript {
    /**
     * Parameters for creating a `CallTranscriptCue` object to capture the text spoken
     * in a specific time slice.
     */
    export interface Cue {
      /**
       * The start time of the slice, in fractional seconds from the start of the call.
       */
      from: number;

      /**
       * The E.164 formatted phone number of the speaker.
       */
      speaker: string;

      /**
       * The text spoken during the slice.
       */
      text: string;

      /**
       * The end time of the slice, in fractional seconds from the start of the call.
       */
      to: number;
    }
  }
}

export interface CallRetrieveParams {
  /**
   * Specifies which related objects to include in the response. Valid options are
   * `transcript`, `note`, and `summary`.
   */
  include?: Array<'transcript' | 'note' | 'summary'>;
}

export interface CallListParams extends CursorPageParams {
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

export interface CallUpsertParams {
  /**
   * The direction of the call, either `incoming` or `outgoing`.
   */
  direction: 'incoming' | 'outgoing';

  /**
   * An array of participants involved in the call.
   */
  participants: Array<CallUpsertParams.Participant>;

  /**
   * The name of the phone provider that handled the call (e.g., `openphone`).
   */
  provider: 'openphone' | 'user' | 'zoom_phone';

  /**
   * The unique identifier for the call from the provider's system.
   */
  provider_id: string;

  /**
   * The status of the call.
   */
  provider_status: string;

  /**
   * The time the call started, as an ISO 8601 timestamp in UTC.
   */
  start_at: string;

  /**
   * The time the call was answered, as an ISO 8601 timestamp in UTC.
   */
  answered_at?: string;

  /**
   * The time the call ended, as an ISO 8601 timestamp in UTC.
   */
  end_at?: string;

  /**
   * A hash of additional metadata from the provider.
   */
  provider_metadata?: { [key: string]: unknown };

  /**
   * Any recordings associated with the call.
   */
  recordings?: Array<CallUpsertParams.Recording>;

  /**
   * Optional list of tag pointers to assign to the call. If omitted, existing tags
   * are unchanged. Pass an empty array to clear tags.
   */
  tags?: Array<Shared.TagPointerParam>;

  /**
   * A transcript of the call.
   */
  transcript?: CallUpsertParams.Transcript;
}

export namespace CallUpsertParams {
  /**
   * Parameters for creating a `Participant` object.
   */
  export interface Participant {
    /**
     * The E.164 formatted phone number of the participant.
     */
    phone: string;

    /**
     * The role of the participant in the call. Can be `caller`, `callee`, or `other`.
     */
    role: 'caller' | 'callee' | 'other';
  }

  /**
   * Parameters for creating a `CallRecording` object.
   */
  export interface Recording {
    /**
     * The content type of the recording. Note that only `audio/mpeg` is supported at
     * this time.
     */
    content_type: 'audio/mpeg';

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
   * A transcript of the call.
   */
  export interface Transcript {
    /**
     * A list of cues that identify the text spoken in specific time slices of the
     * call.
     */
    cues: Array<Transcript.Cue>;
  }

  export namespace Transcript {
    /**
     * Parameters for creating a `CallTranscriptCue` object to capture the text spoken
     * in a specific time slice.
     */
    export interface Cue {
      /**
       * The start time of the slice, in fractional seconds from the start of the call.
       */
      from: number;

      /**
       * The E.164 formatted phone number of the speaker.
       */
      speaker: string;

      /**
       * The text spoken during the slice.
       */
      text: string;

      /**
       * The end time of the slice, in fractional seconds from the start of the call.
       */
      to: number;
    }
  }
}

export declare namespace Calls {
  export {
    type Call as Call,
    type CallParticipant as CallParticipant,
    type CallPointer as CallPointer,
    type CallTranscript as CallTranscript,
    type CallTranscriptCue as CallTranscriptCue,
    type CallTranscriptSpeaker as CallTranscriptSpeaker,
    type CallsCursorPage as CallsCursorPage,
    type CallCreateParams as CallCreateParams,
    type CallRetrieveParams as CallRetrieveParams,
    type CallListParams as CallListParams,
    type CallUpsertParams as CallUpsertParams,
  };
}
