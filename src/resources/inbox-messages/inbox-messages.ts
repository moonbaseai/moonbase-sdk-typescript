// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InboxMessagesAPI from './inbox-messages';
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
   * const inboxMessage = await client.inboxMessages.create({
   *   message: {
   *     body: {},
   *     inbox_id: '1CLJt2v6KXDyzDuM57pQqo',
   *     subject: 'Test Subject',
   *     to: [
   *       { email: 'bob@example.com' },
   *       { email: 'jack@example.com' },
   *     ],
   *     type: 'email_message',
   *   },
   * });
   * ```
   */
  create(params: InboxMessageCreateParams, options?: RequestOptions): APIPromise<InboxMessageCreateResponse> {
    const { message } = params;
    return this._client.post('/inbox_messages', { body: message, ...options });
  }

  /**
   * Retrieves the details of an existing message.
   *
   * @example
   * ```ts
   * const inboxMessage = await client.inboxMessages.retrieve(
   *   'id',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: InboxMessageRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InboxMessageRetrieveResponse> {
    return this._client.get(path`/inbox_messages/${id}`, { query, ...options });
  }

  /**
   * Updates an existing message draft.
   *
   * @example
   * ```ts
   * const inboxMessage = await client.inboxMessages.update(
   *   'id',
   *   { message: { lock_version: 0, type: 'email_message' } },
   * );
   * ```
   */
  update(
    id: string,
    params: InboxMessageUpdateParams,
    options?: RequestOptions,
  ): APIPromise<InboxMessageUpdateResponse> {
    const { message } = params;
    return this._client.patch(path`/inbox_messages/${id}`, { body: message, ...options });
  }

  /**
   * Returns a list of messages.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const messagePointer of client.inboxMessages.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: InboxMessageListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MessagePointersCursorPage, MessagePointer> {
    return this._client.getAPIList('/inbox_messages', CursorPage<MessagePointer>, { query, ...options });
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

export type MessagePointersCursorPage = CursorPage<MessagePointer>;

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
  addresses?: Array<EmailMessageAddress>;

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

/**
 * The EmailMessageAddress object represents a recipient or sender of a message. It
 * contains an email address and can be linked to a person and an organization in
 * your collections.
 */
export interface EmailMessageAddress {
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
  type: 'email_message_address';

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

export interface MessagePointer {
  id: string;

  type: 'message';
}

/**
 * The Slack Message object represents a single Slack post within a `Conversation`.
 */
export interface SlackMessage {
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
   * The subject line of the message (for messages received from Slack, this is a
   * snippet of the message; for messages sent to Slack, it can be set, but is not
   * sent to Slack).
   */
  subject: string;

  /**
   * `true` if the message is in the trash.
   */
  trash: boolean;

  /**
   * String representing the object’s type. Always `slack_message` for this object.
   */
  type: 'slack_message';

  /**
   * `true` if the message has not been read.
   */
  unread: boolean;

  /**
   * A list of `SlackMessageAddress` objects associated with the message (sender and
   * recipients).
   *
   * **Note:** Only present when requested using the `include` query parameter.
   */
  addresses?: Array<SlackMessageAddress>;

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
   * A concise, system-generated summary of the message content.
   */
  summary?: string;
}

/**
 * The SlackMessageChannelAddress object represents a Slack channels address on a
 * message. It contains a Slack Channel ID and can be linked to a person and an
 * organization in your collections.
 */
export type SlackMessageAddress =
  | SlackMessageAddress.SlackMessageChannelAddress
  | SlackMessageAddress.SlackMessageUserAddress;

export namespace SlackMessageAddress {
  /**
   * The SlackMessageChannelAddress object represents a Slack channels address on a
   * message. It contains a Slack Channel ID and can be linked to a person and an
   * organization in your collections.
   */
  export interface SlackMessageChannelAddress {
    /**
     * Unique identifier for the object.
     */
    id: string;

    /**
     * The Slack Channel ID.
     */
    provider_id: string;

    /**
     * The role of the address in the message. Can be `from`, `reply_to`, `to`, `cc`,
     * or `bcc`.
     */
    role: 'from' | 'to' | 'cc' | 'bcc';

    /**
     * String representing the object’s type. Always `slack_message_channel_address`
     * for this object.
     */
    type: 'slack_message_channel_address';

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
   * The SlackMessageUserAddress object represents a Slack user address on a message.
   * It contains a Slack User ID and can be linked to a person and an organization in
   * your collections.
   */
  export interface SlackMessageUserAddress {
    /**
     * Unique identifier for the object.
     */
    id: string;

    /**
     * The Slack User ID
     */
    provider_id: string;

    /**
     * The role of the address in the message. Can be `from`, `reply_to`, `to`, `cc`,
     * or `bcc`.
     */
    role: 'from' | 'to' | 'cc' | 'bcc';

    /**
     * String representing the object’s type. Always `slack_message_user_address` for
     * this object.
     */
    type: 'slack_message_user_address';

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
}

export interface SlackMessageAddressParams {
  /**
   * The Slack channel ID.
   */
  provider_id: string;

  type: 'slack_channel';

  /**
   * The channel name name.
   */
  name?: string;
}

/**
 * The Email Message object represents a single email within a `Conversation`.
 */
export type InboxMessageCreateResponse = EmailMessage | SlackMessage;

/**
 * The Email Message object represents a single email within a `Conversation`.
 */
export type InboxMessageRetrieveResponse = EmailMessage | SlackMessage;

/**
 * The Email Message object represents a single email within a `Conversation`.
 */
export type InboxMessageUpdateResponse = EmailMessage | SlackMessage;

export interface InboxMessageCreateParams {
  /**
   * Parameters for creating an email message draft. Provide either the fields for a
   * new conversation, or a `conversation_id` to reply to an existing conversation.
   */
  message:
    | InboxMessageCreateParams.EmailMessageNewConversationCreateParams
    | InboxMessageCreateParams.SlackMessageNewConversationCreateParams
    | InboxMessageCreateParams.EmailMessageReplyCreateParams
    | InboxMessageCreateParams.SlackMessageReplyCreateParams;
}

export namespace InboxMessageCreateParams {
  /**
   * Parameters for creating a draft in a new conversation.
   */
  export interface EmailMessageNewConversationCreateParams {
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
    to: Array<InboxMessagesAPI.EmailMessageAddressParams>;

    type: 'email_message';

    /**
     * A list of the BCC recipients.
     */
    bcc?: Array<InboxMessagesAPI.EmailMessageAddressParams>;

    /**
     * A list of the CC recipients.
     */
    cc?: Array<InboxMessagesAPI.EmailMessageAddressParams>;
  }

  /**
   * Parameters for creating a draft in a new conversation.
   */
  export interface SlackMessageNewConversationCreateParams {
    /**
     * The message body.
     */
    body: Shared.FormattedText;

    /**
     * The inbox to use for sending the Slack message.
     */
    inbox_id: string;

    /**
     * The subject line of the conversation (not included in actual Slack message).
     */
    subject: string;

    /**
     * The Slack channel to post the message in.
     */
    to: Array<InboxMessagesAPI.SlackMessageAddressParams>;

    type: 'slack_message';
  }

  /**
   * Parameters for creating a draft reply in an existing conversation.
   */
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

    type: 'email_message';

    /**
     * A list of the BCC recipients.
     */
    bcc?: Array<InboxMessagesAPI.EmailMessageAddressParams>;

    /**
     * A list of the CC recipients.
     */
    cc?: Array<InboxMessagesAPI.EmailMessageAddressParams>;

    /**
     * A list of recipients. If omitted, recipients are derived from the conversation.
     */
    to?: Array<InboxMessagesAPI.EmailMessageAddressParams>;
  }

  /**
   * Parameters for creating a draft reply in an existing conversation.
   */
  export interface SlackMessageReplyCreateParams {
    /**
     * The message body.
     */
    body: Shared.FormattedText;

    /**
     * The ID of the conversation to reply to.
     */
    conversation_id: string;

    /**
     * The inbox to use for sending the Slack message.
     */
    inbox_id: string;

    type: 'slack_message';

    /**
     * The Slack channel to post the message in.
     */
    to?: Array<InboxMessagesAPI.SlackMessageAddressParams>;
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
   * Parameters for updating a draft message in an existing conversation.
   */
  message:
    | InboxMessageUpdateParams.EmailMessageUpdateParams
    | InboxMessageUpdateParams.SlackMessageUpdateParams;
}

export namespace InboxMessageUpdateParams {
  /**
   * Parameters for updating a draft message in an existing conversation.
   */
  export interface EmailMessageUpdateParams {
    /**
     * The current lock version of the draft for optimistic concurrency control.
     */
    lock_version: number;

    type: 'email_message';

    /**
     * A list of the BCC recipients.
     */
    bcc?: Array<InboxMessagesAPI.EmailMessageAddressParams>;

    /**
     * The email body.
     */
    body?: Shared.FormattedText;

    /**
     * A list of the CC recipients.
     */
    cc?: Array<InboxMessagesAPI.EmailMessageAddressParams>;

    /**
     * The subject line of the email.
     */
    subject?: string;

    /**
     * A list of the recipients.
     */
    to?: Array<InboxMessagesAPI.EmailMessageAddressParams>;
  }

  /**
   * Parameters for updating a draft message in an existing conversation.
   */
  export interface SlackMessageUpdateParams {
    /**
     * The current lock version of the draft for optimistic concurrency control.
     */
    lock_version: number;

    type: 'slack_message';

    /**
     * The message body.
     */
    body?: Shared.FormattedText;

    /**
     * The subject line of the conversation (not included in actual Slack message).
     */
    subject?: string;

    /**
     * The Slack channel to post the message in.
     */
    to?: Array<InboxMessagesAPI.SlackMessageAddressParams>;
  }
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
    type EmailMessage as EmailMessage,
    type EmailMessageAddress as EmailMessageAddress,
    type EmailMessageAddressParams as EmailMessageAddressParams,
    type MessageAttachment as MessageAttachment,
    type MessagePointer as MessagePointer,
    type SlackMessage as SlackMessage,
    type SlackMessageAddress as SlackMessageAddress,
    type SlackMessageAddressParams as SlackMessageAddressParams,
    type InboxMessageCreateResponse as InboxMessageCreateResponse,
    type InboxMessageRetrieveResponse as InboxMessageRetrieveResponse,
    type InboxMessageUpdateResponse as InboxMessageUpdateResponse,
    type MessagePointersCursorPage as MessagePointersCursorPage,
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
