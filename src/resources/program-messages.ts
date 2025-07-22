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
   * const programMessage = await client.programMessages.create({
   *   person: { email: 'person-12@example-12.com' },
   *   program_template_id: '1CRMPDbi5U9joyZVuMZo78',
   *   custom_variables: { coupon_code: 'HOWDY' },
   * });
   * ```
   */
  create(
    body: ProgramMessageCreateParams,
    options?: RequestOptions,
  ): APIPromise<ProgramMessageCreateResponse> {
    return this._client.post('/program_messages', { body, ...options });
  }
}

/**
 * Represents a single message sent as part of a `Program`.
 */
export interface ProgramMessageCreateResponse {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the message was created and enqueued for sending, as an RFC 3339
   * timestamp.
   */
  created_at: string;

  links: ProgramMessageCreateResponse.Links;

  /**
   * The `ProgramTemplate` used to generate this message.
   */
  program_template: ProgramTemplatesAPI.ProgramTemplate;

  /**
   * String representing the object’s type. Always `program_message` for this object.
   */
  type: 'program_message';

  /**
   * Time at which the object was last updated, as an RFC 3339 timestamp.
   */
  updated_at: string;
}

export namespace ProgramMessageCreateResponse {
  export interface Links {
    /**
     * A link to the `ProgramTemplate` used.
     */
    program_template: string;
  }
}

export interface ProgramMessageCreateParams {
  /**
   * The person to send the message to.
   */
  person: ProgramMessageCreateParams.Person;

  /**
   * The ID of the `ProgramTemplate` to use for sending the message.
   */
  program_template_id: string;

  /**
   * Any custom Liquid variables to be interpolated into the message template.
   */
  custom_variables?: { [key: string]: unknown };
}

export namespace ProgramMessageCreateParams {
  /**
   * The person to send the message to.
   */
  export interface Person {
    email: string;
  }
}

export declare namespace ProgramMessages {
  export {
    type ProgramMessageCreateResponse as ProgramMessageCreateResponse,
    type ProgramMessageCreateParams as ProgramMessageCreateParams,
  };
}
