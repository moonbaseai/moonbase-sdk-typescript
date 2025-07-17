// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InboxConversationsAPI from './inbox-conversations';
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
   * String representing the object’s type. Always `address` for this object.
   */
  type: 'address';

  /**
   * Time at which the object was created, as an RFC 3339 timestamp.
   */
  created_at?: string;

  /**
   * A hash of related links.
   */
  links?: Address.Links;

  /**
   * The role of the address in the message. Can be `from`, `reply_to`, `to`, `cc`,
   * or `bcc`.
   */
  role?: 'from' | 'reply_to' | 'to' | 'cc' | 'bcc';

  /**
   * Time at which the object was last updated, as an RFC 3339 timestamp.
   */
  updated_at?: string;
}

export namespace Address {
  /**
   * A hash of related links.
   */
  export interface Links {
    /**
     * A link to the associated `Organization` item.
     */
    organization?: string;

    /**
     * A link to the associated `Person` item.
     */
    person?: string;
  }
}

/**
 * The Email Message object represents a single email within a `Conversation`.
 */
export interface EmailMessage {
  /**
   * Unique identifier for the object.
   */
  id: string;

  links: EmailMessage.Links;

  /**
   * The globally unique `Message-ID` header of the email.
   */
  rfc822_message_id: string;

  /**
   * The subject line of the email.
   */
  subject: string;

  /**
   * String representing the object’s type. Always `email_message` for this object.
   */
  type: 'email_message';

  /**
   * A list of `Address` objects associated with the message (sender and recipients).
   */
  addresses?: Array<Address>;

  /**
   * A list of `Attachment` objects on the message.
   */
  attachments?: Array<EmailMessage.Attachment>;

  /**
   * The HTML content of the email body.
   */
  body_html?: string;

  /**
   * The plain text content of the email body.
   */
  body_plain?: string;

  /**
   * `true` if the message appears to be part of a bulk mailing.
   */
  bulk?: boolean;

  /**
   * The `Conversation` thread this message is part of.
   */
  conversation?: InboxConversationsAPI.InboxConversation;

  /**
   * The time the message was received, as an RFC 3339 timestamp.
   */
  created_at?: string;

  /**
   * `true` if the message is a draft that has not been sent.
   */
  draft?: boolean;

  /**
   * The `Message-ID` of the email this message is a reply to.
   */
  in_reply_to_rfc822_message_id?: string;

  /**
   * `true` if the message is classified as spam.
   */
  spam?: boolean;

  /**
   * A concise, system-generated summary of the email content.
   */
  summary?: string;

  /**
   * `true` if the message is in the trash.
   */
  trash?: boolean;

  /**
   * `true` if the message has not been read.
   */
  unread?: boolean;
}

export namespace EmailMessage {
  export interface Links {
    /**
     * A link to the `Conversation` this message belongs to.
     */
    conversation: string;

    /**
     * The canonical URL for this object.
     */
    self: string;
  }

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
     * The original name of the uploaded file, including its extension.
     */
    filename: string;

    /**
     * A hash of related links.
     */
    links: Attachment.Links;

    /**
     * The size of the file in bytes.
     */
    size: number;

    /**
     * String representing the object’s type. Always `attachment` for this object.
     */
    type: 'attachment';

    /**
     * Time at which the object was created, as an RFC 3339 timestamp.
     */
    created_at?: string;

    /**
     * Time at which the object was last updated, as an RFC 3339 timestamp.
     */
    updated_at?: string;
  }

  export namespace Attachment {
    /**
     * A hash of related links.
     */
    export interface Links {
      /**
       * A link to the `Conversation` this attachment belongs to.
       */
      conversation: string;

      /**
       * A temporary, signed URL to download the file content. The URL expires after one
       * hour.
       */
      download_url: string;

      /**
       * A link to the `Message` this attachment belongs to.
       */
      message: string;
    }
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

  /**
   * Filter messages by one or more conversation IDs.
   */
  conversation?: Array<string>;

  /**
   * Filter messages by one or more inbox IDs.
   */
  inbox?: Array<string>;

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

export declare namespace InboxMessages {
  export {
    type Address as Address,
    type EmailMessage as EmailMessage,
    type EmailMessagesCursorPage as EmailMessagesCursorPage,
    type InboxMessageRetrieveParams as InboxMessageRetrieveParams,
    type InboxMessageListParams as InboxMessageListParams,
  };
}
