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
   * const call = await client.calls.log({
   *   direction: 'incoming',
   *   participants: [
   *     { phone: '+14155551212', role: 'caller' },
   *     { phone: '+16505551212', role: 'callee' },
   *   ],
   *   provider: 'openphone',
   *   provider_id: 'openphone_id_000000000002',
   *   start_at: '2025-07-12T02:19:39.553Z',
   *   status: 'completed',
   *   answered_at: '2025-07-12T02:20:39Z',
   *   end_at: '2025-07-12T02:49:39.553Z',
   *   provider_metadata: {
   *     answered_by: 'UShjUatqtF',
   *     user_id: 'UShjUatqtF',
   *     phone_number_id: 'PN72zMikBJ',
   *     conversation_id: 'CNddadaffe2745828f5739f9310fd05dbc',
   *   },
   * });
   * ```
   */
  log(body: CallLogParams, options?: RequestOptions): APIPromise<Call> {
    return this._client.post('/calls', { body, ...options });
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

export interface CallLogParams {
  /**
   * The direction of the call, either `incoming` or `outgoing`.
   */
  direction: 'incoming' | 'outgoing';

  /**
   * An array of participants involved in the call.
   */
  participants: Array<CallLogParams.Participant>;

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
}

export namespace CallLogParams {
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
}

export declare namespace Calls {
  export { type Call as Call, type CallLogParams as CallLogParams };
}
