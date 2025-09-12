// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ProgramTemplatesAPI from './program-templates';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class ProgramMessages extends APIResource {
  /**
   * Sends a message using a program template.
   *
   * @example
   * ```ts
   * const programMessage = await client.programMessages.send({
   *   person: { email: 'person-28@example-28.com' },
   *   program_template_id: '1CLJt2v1MsDbov8DBEEeWH',
   *   custom_variables: { coupon_code: 'HOWDY' },
   * });
   * ```
   */
  send(body: ProgramMessageSendParams, options?: RequestOptions): APIPromise<ProgramMessage> {
    return this._client.post('/program_messages', { body, ...options });
  }
}

/**
 * Represents a single message sent as part of a `Program`.
 */
export interface ProgramMessage {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the message was created and enqueued for sending, as an ISO 8601
   * timestamp in UTC.
   */
  created_at: string;

  /**
   * The `ProgramTemplate` used to generate this message.
   */
  program_template: ProgramTemplatesAPI.ProgramTemplate;

  /**
   * String representing the object’s type. Always `program_message` for this object.
   */
  type: 'program_message';

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;
}

export interface ProgramMessageSendParams {
  /**
   * The person to send the message to.
   */
  person: ProgramMessageSendParams.Person;

  /**
   * The ID of the `ProgramTemplate` to use for sending the message.
   */
  program_template_id: string;

  /**
   * Any custom Liquid variables to be interpolated into the message template.
   */
  custom_variables?: { [key: string]: unknown };
}

export namespace ProgramMessageSendParams {
  /**
   * The person to send the message to.
   */
  export interface Person {
    email: string;
  }
}

export declare namespace ProgramMessages {
  export { type ProgramMessage as ProgramMessage, type ProgramMessageSendParams as ProgramMessageSendParams };
}
