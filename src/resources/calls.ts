// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

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
   *   provider_id: 'openphone_id_000000000006',
   *   start_at: '2025-08-11T21:11:10.467Z',
   *   status: 'completed',
   *   answered_at: '2025-08-11T21:12:10Z',
   *   end_at: '2025-08-11T21:41:10.467Z',
   *   provider_metadata: {
   *     answered_by: 'UShjUatqtF',
   *     user_id: 'UShjUatqtF',
   *     phone_number_id: 'PN72zMikBJ',
   *     conversation_id: 'CN7f81abbb6717a238375aa88b71409b0c',
   *   },
   * });
   * ```
   */
  create(body: CallCreateParams, options?: RequestOptions): APIPromise<Call> {
    return this._client.post('/calls', { body, ...options });
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
   *   provider_id: 'openphone_id_000000000001',
   *   start_at: '2025-08-11T21:10:54.916Z',
   *   status: 'completed',
   *   answered_at: '2025-08-11T21:11:54Z',
   *   end_at: '2025-08-11T21:40:54.916Z',
   *   provider_metadata: {
   *     answered_by: 'UShjUatqtF',
   *     user_id: 'UShjUatqtF',
   *     phone_number_id: 'PN72zMikBJ',
   *     conversation_id: 'CNf3a3650cf5ede3a3dcc0ca15c340c919',
   *   },
   * });
   * ```
   */
  upsert(body: CallUpsertParams, options?: RequestOptions): APIPromise<Call> {
    return this._client.post('/calls/upsert', { body, ...options });
  }
}

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
   * The direction of the call, either `incoming` or `outgoing`.
   */
  direction: 'incoming' | 'outgoing';

  /**
   * The participants involved in the call.
   */
  participants: Array<Call.Participant>;

  /**
   * The name of the phone provider that handled the call.
   */
  provider: string;

  /**
   * The unique identifier for the call from the provider's system.
   */
  provider_id: string;

  /**
   * The time the call started, as an RFC 3339 timestamp.
   */
  start_at: string;

  /**
   * The current status of the call.
   */
  status:
    | 'queued'
    | 'initiated'
    | 'ringing'
    | 'in_progress'
    | 'completed'
    | 'busy'
    | 'failed'
    | 'no_answer'
    | 'canceled'
    | 'missed'
    | 'answered'
    | 'forwarded'
    | 'abandoned';

  /**
   * String representing the object’s type. Always `call` for this object.
   */
  type: 'call';

  /**
   * The time the call was answered, if available, as an RFC 3339 timestamp.
   */
  answered_at?: string;

  /**
   * Time at which the object was created, as an RFC 3339 timestamp.
   */
  created_at?: string;

  /**
   * The time the call ended, if available, as an RFC 3339 timestamp.
   */
  end_at?: string;

  /**
   * A hash of additional metadata from the provider.
   */
  provider_metadata?: { [key: string]: unknown };

  /**
   * Time at which the object was last updated, as an RFC 3339 timestamp.
   */
  updated_at?: string;
}

export namespace Call {
  /**
   * Represents a participant in a call.
   */
  export interface Participant {
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
     * String representing the object’s type. Always `participant` for this object.
     */
    type: 'participant';

    /**
     * Time at which the object was created, as an RFC 3339 timestamp.
     */
    created_at?: string;

    /**
     * Time at which the object was last updated, as an RFC 3339 timestamp.
     */
    updated_at?: string;
  }
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
  provider: string;

  /**
   * The unique identifier for the call from the provider's system.
   */
  provider_id: string;

  /**
   * The time the call started, as an RFC 3339 timestamp.
   */
  start_at: string;

  /**
   * The status of the call.
   */
  status:
    | 'queued'
    | 'initiated'
    | 'ringing'
    | 'in_progress'
    | 'completed'
    | 'busy'
    | 'failed'
    | 'no_answer'
    | 'canceled'
    | 'missed'
    | 'answered'
    | 'forwarded'
    | 'abandoned';

  /**
   * The time the call was answered, as an RFC 3339 timestamp.
   */
  answered_at?: string;

  /**
   * The time the call ended, as an RFC 3339 timestamp.
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
  provider: string;

  /**
   * The unique identifier for the call from the provider's system.
   */
  provider_id: string;

  /**
   * The time the call started, as an RFC 3339 timestamp.
   */
  start_at: string;

  /**
   * The status of the call.
   */
  status:
    | 'queued'
    | 'initiated'
    | 'ringing'
    | 'in_progress'
    | 'completed'
    | 'busy'
    | 'failed'
    | 'no_answer'
    | 'canceled'
    | 'missed'
    | 'answered'
    | 'forwarded'
    | 'abandoned';

  /**
   * The time the call was answered, as an RFC 3339 timestamp.
   */
  answered_at?: string;

  /**
   * The time the call ended, as an RFC 3339 timestamp.
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
    type CallCreateParams as CallCreateParams,
    type CallUpsertParams as CallUpsertParams,
  };
}
