// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InboxesAPI from './inboxes';
import * as Shared from './shared';
import * as InboxMessagesAPI from './inbox-messages/inbox-messages';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Manage your inboxes, conversations, and messages
 */
export class InboxConversations extends APIResource {
  /**
   * Retrieves the details of an existing conversation.
   */
  retrieve(
    id: string,
    query: InboxConversationRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InboxConversation> {
    return this._client.get(path`/inbox_conversations/${id}`, { query, ...options });
  }

  /**
   * Returns a list of your conversations.
   */
  list(
    query: InboxConversationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<InboxConversationListResponsesCursorPage, InboxConversationListResponse> {
    return this._client.getAPIList('/inbox_conversations', CursorPage<InboxConversationListResponse>, {
      query,
      ...options,
    });
  }
}

export type InboxConversationListResponsesCursorPage = CursorPage<InboxConversationListResponse>;

/**
 * The Conversation object represents a thread of related messages.
 */
export interface InboxConversation {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * `true` if the conversation appears to be part of a bulk mailing.
   */
  bulk: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * `true` if a new draft reply to this conversation has been started.
   */
  draft: boolean;

  /**
   * Whether the conversation is marked for follow-up.
   */
  follow_up: boolean;

  /**
   * The time of the most recent activity in the conversation, as an ISO 8601
   * timestamp in UTC.
   */
  last_message_at: string;

  /**
   * `true` if the conversation is marked as spam.
   */
  spam: boolean;

  /**
   * The current state, which can be `unassigned`, `active`, `closed`, or `waiting`.
   */
  state: 'unassigned' | 'active' | 'closed' | 'waiting';

  /**
   * The subject line of the conversation.
   */
  subject: string;

  /**
   * A list of `Tag` objects applied to this conversation.
   */
  tags: Array<Shared.Tag>;

  /**
   * `true` if the conversation is in the trash.
   */
  trash: boolean;

  /**
   * String representing the object’s type. Always `inbox_conversation` for this
   * object.
   */
  type: 'inbox_conversation';

  /**
   * `true` if the conversation contains unread messages.
   */
  unread: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * The `Inbox` that this conversations belongs to.
   *
   * **Note:** Only present when requested using the `include` query parameter.
   */
  inbox?: InboxesAPI.Inbox;

  /**
   * The `EmailMessage` objects that belong to this conversation.
   *
   * **Note:** Only present when requested using the `include` query parameter.
   */
  messages?: Array<InboxMessagesAPI.EmailMessage>;

  /**
   * If the conversation is snoozed, this is the time it will reappear in the inbox,
   * as an ISO 8601 timestamp in UTC.
   */
  unsnooze_at?: string;
}

export interface InboxConversationListResponse {
  id: string;

  type: 'inbox_conversation';
}

export interface InboxConversationRetrieveParams {
  /**
   * Specifies which related objects to include in the response. Valid options are
   * `inbox`, `messages`, and `messages.addresses`.
   */
  include?: Array<'inbox' | 'messages' | 'messages.addresses'>;
}

export interface InboxConversationListParams extends CursorPageParams {
  /**
   * When specified, returns results starting immediately before the item identified
   * by this cursor. Use the cursor value from the response's metadata to fetch the
   * previous page of results.
   */
  before?: string;

  inbox_id?: InboxConversationListParams.InboxID;

  /**
   * Maximum number of items to return per page. Must be between 1 and 100. Defaults
   * to 20 if not specified.
   */
  limit?: number;
}

export namespace InboxConversationListParams {
  export interface InboxID {
    eq?: string;
  }
}

export declare namespace InboxConversations {
  export {
    type InboxConversation as InboxConversation,
    type InboxConversationListResponse as InboxConversationListResponse,
    type InboxConversationListResponsesCursorPage as InboxConversationListResponsesCursorPage,
    type InboxConversationRetrieveParams as InboxConversationRetrieveParams,
    type InboxConversationListParams as InboxConversationListParams,
  };
}
