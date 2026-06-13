// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InboxConversationsAPI from '../inbox-conversations';
import * as Shared from '../shared';
import * as CollectionsAPI from '../collections/collections';
import * as AttachmentsAPI from './attachments';
import { AttachmentCreateParams, AttachmentDeleteParams, Attachments } from './attachments';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage your inboxes, conversations, and messages
 */
export class InboxMessages extends APIResource {
  attachments: AttachmentsAPI.Attachments = new AttachmentsAPI.Attachments(this._client);

  /**
   * Creates a new message draft.
   *
   * @example
   * ```ts
   * const emailMessage = await client.inboxMessages.create({
   *   body: {
   *     markdown:
   *       'This is the body of the message. It supports [markdown](https://en.wikipedia.org/wiki/Markdown).',
   *   },
   *   inbox_id: '1CLJt2v6KXDyzDuM57pQqo',
   *   subject: 'Test Subject',
   *   to: [
   *     { email: 'bob@example.com', name: 'Bob' },
   *     { email: 'jack@example.com' },
   *   ],
   *   bcc: [{ email: 'steve@example.com', name: 'Steve' }],
   *   cc: [{ email: 'joe@example.com', name: 'Joe' }],
   * });
   * ```
   */
  create(body: InboxMessageCreateParams, options?: RequestOptions): APIPromise<EmailMessage> {
    return this._client.post('/inbox_messages', { body, ...options });
  }

  /**
   * Retrieves the details of an existing message.
   *
   * @example
   * ```ts
   * const emailMessage = await client.inboxMessages.retrieve(
   *   'id',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: InboxMessageRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EmailMessage> {
    return this._client.get(path`/inbox_messages/${id}`, { query, ...options });
  }

  /**
   * Updates an existing message draft.
   *
   * @example
   * ```ts
   * const emailMessage = await client.inboxMessages.update(
   *   'id',
   *   {
   *     lock_version: 0,
   *     bcc: [{ email: 'steve@example.com', name: 'Steve' }],
   *     body: {
   *       markdown:
   *         'This is the body of the message. It supports [markdown](https://en.wikipedia.org/wiki/Markdown).',
   *     },
   *     cc: [{ email: 'joe@example.com', name: 'Joe' }],
   *     subject: 'Test Subject',
   *     to: [
   *       { email: 'bob@example.com', name: 'Bob' },
   *       { email: 'jack@example.com' },
   *     ],
   *   },
   * );
   * ```
   */
  update(id: string, body: InboxMessageUpdateParams, options?: RequestOptions): APIPromise<EmailMessage> {
    return this._client.patch(path`/inbox_messages/${id}`, { body, ...options });
  }

  /**
   * Returns a list of messages.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const emailMessagePointer of client.inboxMessages.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: InboxMessageListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<EmailMessagePointersCursorPage, EmailMessagePointer> {
    return this._client.getAPIList('/inbox_messages', CursorPage<EmailMessagePointer>, { query, ...options });
  }

  /**
   * Permanently deletes a message draft.
   *
   * @example
   * ```ts
   * await client.inboxMessages.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/inbox_messages/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type EmailMessagePointersCursorPage = CursorPage<EmailMessagePointer>;

/**
 * The Address object represents a recipient or sender of a message. It contains an
 * email address and can be linked to a person and an organization in your
 * collections.
 */
export interface Address {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The email address.
   */
  email: string;

  /**
   * The role of the address in the message. Can be `from`, `reply_to`, `to`, `cc`,
   * or `bcc`.
   */
  role: 'from' | 'reply_to' | 'to' | 'cc' | 'bcc';

  /**
   * String representing the object’s type. Always `message_address` for this object.
   */
  type: 'message_address';

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
 * The Email Message object represents a single email within a `Conversation`.
 */
export interface EmailMessage {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Structured content that can be rendered in multiple formats, currently
   * supporting Markdown.
   */
  body: Shared.FormattedText;

  /**
   * `true` if the message appears to be part of a bulk mailing.
   */
  bulk: boolean;

  /**
   * The time the message was received, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * `true` if the message is a draft that has not been sent.
   */
  draft: boolean;

  /**
   * The current lock version of the message for optimistic concurrency control.
   */
  lock_version: number;

  /**
   * `true` if the message is classified as spam.
   */
  spam: boolean;

  /**
   * The subject line of the email.
   */
  subject: string;

  /**
   * `true` if the message is in the trash.
   */
  trash: boolean;

  /**
   * String representing the object’s type. Always `email_message` for this object.
   */
  type: 'email_message';

  /**
   * `true` if the message has not been read.
   */
  unread: boolean;

  /**
   * A list of `Address` objects associated with the message (sender and recipients).
   *
   * **Note:** Only present when requested using the `include` query parameter.
   */
  addresses?: Array<Address>;

  /**
   * A list of `Attachment` objects on the message.
   *
   * **Note:** Only present when requested using the `include` query parameter.
   */
  attachments?: Array<MessageAttachment>;

  /**
   * The `Conversation` thread this message is part of.
   *
   * **Note:** Only present when requested using the `include` query parameter.
   */
  conversation?: InboxConversationsAPI.InboxConversation;

  /**
   * A concise, system-generated summary of the email content.
   */
  summary?: string;
}

export interface EmailMessageAddressParams {
  /**
   * The email address.
   */
  email: string;

  /**
   * The recipient's name.
   */
  name?: string;
}

export interface EmailMessagePointer {
  id: string;

  type: 'email_message';
}

/**
 * The Attachment object represents a file attached to a message. You can download
 * the file content via the `download_url`.
 */
export interface MessageAttachment {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * A temporary, signed URL to download the file content. The URL expires after one
   * hour.
   */
  download_url: string;

  /**
   * The original name of the uploaded file, including its extension.
   */
  filename: string;

  /**
   * The size of the file in bytes.
   */
  size: number;

  /**
   * String representing the object’s type. Always `message_attachment` for this
   * object.
   */
  type: 'message_attachment';
}

export type InboxMessageCreateParams =
  | InboxMessageCreateParams.Variant0
  | InboxMessageCreateParams.EmailMessageReplyCreateParams;

export declare namespace InboxMessageCreateParams {
  export interface Variant0 {
    /**
     * The email body.
     */
    body: Shared.FormattedText;

    /**
     * The inbox to use for sending the email.
     */
    inbox_id: string;

    /**
     * The subject line of the email.
     */
    subject: string;

    /**
     * A list of recipients.
     */
    to: Array<EmailMessageAddressParams>;

    /**
     * A list of the BCC recipients.
     */
    bcc?: Array<EmailMessageAddressParams>;

    /**
     * A list of the CC recipients.
     */
    cc?: Array<EmailMessageAddressParams>;
  }

  export interface EmailMessageReplyCreateParams {
    /**
     * The email body.
     */
    body: Shared.FormattedText;

    /**
     * The ID of the conversation to reply to.
     */
    conversation_id: string;

    /**
     * The inbox to use for sending the email.
     */
    inbox_id: string;

    /**
     * A list of the BCC recipients.
     */
    bcc?: Array<EmailMessageAddressParams>;

    /**
     * A list of the CC recipients.
     */
    cc?: Array<EmailMessageAddressParams>;

    /**
     * A list of recipients. If omitted, recipients are derived from the conversation.
     */
    to?: Array<EmailMessageAddressParams>;
  }
}

export interface InboxMessageRetrieveParams {
  /**
   * Specifies which related objects to include in the response. Valid options are
   * `addresses`, `attachments`, and `conversation`.
   */
  include?: Array<'addresses' | 'attachments' | 'conversation'>;
}

export interface InboxMessageUpdateParams {
  /**
   * The current lock version of the draft for optimistic concurrency control.
   */
  lock_version: number;

  /**
   * A list of the BCC recipients.
   */
  bcc?: Array<EmailMessageAddressParams>;

  /**
   * The email body.
   */
  body?: Shared.FormattedText;

  /**
   * A list of the CC recipients.
   */
  cc?: Array<EmailMessageAddressParams>;

  /**
   * The subject line of the email.
   */
  subject?: string;

  /**
   * A list of the recipients.
   */
  to?: Array<EmailMessageAddressParams>;
}

export interface InboxMessageListParams extends CursorPageParams {
  /**
   * When specified, returns results starting immediately before the item identified
   * by this cursor. Use the cursor value from the response's metadata to fetch the
   * previous page of results.
   */
  before?: string;

  conversation_id?: InboxMessageListParams.ConversationID;

  inbox_id?: InboxMessageListParams.InboxID;

  /**
   * Maximum number of items to return per page. Must be between 1 and 100. Defaults
   * to 20 if not specified.
   */
  limit?: number;
}

export namespace InboxMessageListParams {
  export interface ConversationID {
    eq?: string;
  }

  export interface InboxID {
    eq?: string;
  }
}

InboxMessages.Attachments = Attachments;

export declare namespace InboxMessages {
  export {
    type Address as Address,
    type EmailMessage as EmailMessage,
    type EmailMessageAddressParams as EmailMessageAddressParams,
    type EmailMessagePointer as EmailMessagePointer,
    type MessageAttachment as MessageAttachment,
    type EmailMessagePointersCursorPage as EmailMessagePointersCursorPage,
    type InboxMessageCreateParams as InboxMessageCreateParams,
    type InboxMessageRetrieveParams as InboxMessageRetrieveParams,
    type InboxMessageUpdateParams as InboxMessageUpdateParams,
    type InboxMessageListParams as InboxMessageListParams,
  };

  export {
    Attachments as Attachments,
    type AttachmentCreateParams as AttachmentCreateParams,
    type AttachmentDeleteParams as AttachmentDeleteParams,
  };
}
