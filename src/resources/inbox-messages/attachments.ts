// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InboxMessagesAPI from './inbox-messages';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

/**
 * Manage your inboxes, conversations, and messages
 */
export class Attachments extends APIResource {
  /**
   * Add an attachment to a draft message. You can send either a multipart/form-data
   * request with the raw file content, or a JSON request with a file ID.
   *
   * @example
   * ```ts
   * const messageAttachment =
   *   await client.inboxMessages.attachments.create(
   *     'inbox_message_id',
   *   );
   * ```
   */
  create(
    inboxMessageID: string,
    body: AttachmentCreateParams,
    options?: RequestOptions,
  ): APIPromise<InboxMessagesAPI.MessageAttachment> {
    return this._client.post(
      path`/inbox_messages/${inboxMessageID}/attachments`,
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Removes an attachment from a draft message.
   *
   * @example
   * ```ts
   * await client.inboxMessages.attachments.delete('id', {
   *   inbox_message_id: 'inbox_message_id',
   * });
   * ```
   */
  delete(id: string, params: AttachmentDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { inbox_message_id } = params;
    return this._client.delete(path`/inbox_messages/${inbox_message_id}/attachments/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface AttachmentCreateParams {
  file?: Uploadable;

  file_id?: string;
}

export interface AttachmentDeleteParams {
  /**
   * The ID of the Message.
   */
  inbox_message_id: string;
}

export declare namespace Attachments {
  export {
    type AttachmentCreateParams as AttachmentCreateParams,
    type AttachmentDeleteParams as AttachmentDeleteParams,
  };
}
