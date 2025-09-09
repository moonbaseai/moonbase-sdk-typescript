// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InboxConversationsAPI from './inbox-conversations';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class InboxMessages extends APIResource {
  /**
   * Retrieves the details of an existing message.
   */
  retrieve(
    id: string,
    query: InboxMessageRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EmailMessage> {
    return this._client.get(path`/inbox_messages/${id}`, { query, ...options });
  }

  /**
   * Returns a list of messages.
   */
  list(
    query: InboxMessageListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<EmailMessagesCursorPage, EmailMessage> {
    return this._client.getAPIList('/inbox_messages', CursorPage<EmailMessage>, { query, ...options });
  }
}

export type EmailMessagesCursorPage = CursorPage<EmailMessage>;

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
   * A lightweight reference to another resource.
   */
  organization?: Shared.Pointer;

  /**
   * A lightweight reference to another resource.
   */
  person?: Shared.Pointer;
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
  attachments?: Array<EmailMessage.Attachment>;

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

export namespace EmailMessage {
  /**
   * The Attachment object represents a file attached to a message. You can download
   * the file content via the `download_url`.
   */
  export interface Attachment {
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
}

export interface InboxMessageRetrieveParams {
  /**
   * Specifies which related objects to include in the response. Valid options are
   * `addresses`, `attachments`, and `conversation`.
   */
  include?: Array<'addresses' | 'attachments' | 'conversation'>;
}

export interface InboxMessageListParams extends CursorPageParams {
  /**
   * When specified, returns results starting immediately before the item identified
   * by this cursor. Use the cursor value from the response's metadata to fetch the
   * previous page of results.
   */
  before?: string;

  filter?: InboxMessageListParams.Filter;

  /**
   * Specifies which related objects to include in the response. Valid options are
   * `addresses`, `attachments`, and `conversation`.
   */
  include?: Array<'addresses' | 'attachments' | 'conversation'>;

  /**
   * Maximum number of items to return per page. Must be between 1 and 100. Defaults
   * to 20 if not specified.
   */
  limit?: number;
}

export namespace InboxMessageListParams {
  export interface Filter {
    conversation_id?: Filter.ConversationID;

    inbox_id?: Filter.InboxID;
  }

  export namespace Filter {
    export interface ConversationID {
      eq?: string;
    }

    export interface InboxID {
      eq?: string;
    }
  }
}

export declare namespace InboxMessages {
  export {
    type Address as Address,
    type EmailMessage as EmailMessage,
    type EmailMessagesCursorPage as EmailMessagesCursorPage,
    type InboxMessageRetrieveParams as InboxMessageRetrieveParams,
    type InboxMessageListParams as InboxMessageListParams,
  };
}
