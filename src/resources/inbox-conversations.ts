// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InboxMessagesAPI from './inbox-messages';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

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
  ): PagePromise<InboxConversationsCursorPage, InboxConversation> {
    return this._client.getAPIList('/inbox_conversations', CursorPage<InboxConversation>, {
      query,
      ...options,
    });
  }
}

export type InboxConversationsCursorPage = CursorPage<InboxConversation>;

/**
 * The Conversation object represents a thread of related messages.
 */
export interface InboxConversation {
  /**
   * Unique identifier for the object.
   */
  id: string;

  links: InboxConversation.Links;

  /**
   * The current state, which can be `unassigned`, `active`, `closed`, or `waiting`.
   */
  state: 'unassigned' | 'active' | 'closed' | 'waiting';

  /**
   * String representing the object’s type. Always `inbox_conversation` for this
   * object.
   */
  type: 'inbox_conversation';

  /**
   * A list of `Address` objects (participants) in this conversation.
   */
  addresses?: Array<InboxMessagesAPI.Address>;

  /**
   * `true` if the conversation appears to be part of a bulk mailing.
   */
  bulk?: boolean;

  /**
   * Time at which the object was created, as an RFC 3339 timestamp.
   */
  created_at?: string;

  /**
   * Whether the conversation is marked for follow-up.
   */
  follow_up?: boolean;

  /**
   * `true` if a new draft reply to this conversation has been started.
   */
  new_draft_conversation?: boolean;

  /**
   * `true` if the conversation is marked as spam.
   */
  spam?: boolean;

  /**
   * The subject line of the conversation.
   */
  subject?: string;

  /**
   * A list of `Tag` objects applied to this conversation.
   */
  tags?: Array<InboxConversation.Tag>;

  /**
   * The time of the most recent activity in the conversation, as an RFC 3339
   * timestamp.
   */
  timestamp?: string;

  /**
   * `true` if the conversation is in the trash.
   */
  trash?: boolean;

  /**
   * `true` if the conversation contains unread messages.
   */
  unread?: boolean;

  /**
   * If the conversation is snoozed, this is the time it will reappear in the inbox,
   * as an RFC 3339 timestamp.
   */
  unsnooze_at?: string;

  /**
   * Time at which the object was last updated, as an RFC 3339 timestamp.
   */
  updated_at?: string;
}

export namespace InboxConversation {
  export interface Links {
    /**
     * A link to the `Inbox` this conversation belongs to.
     */
    inbox: string;

    /**
     * A link to the list of `Message` objects in this conversation.
     */
    messages: string;

    /**
     * The canonical URL for this object.
     */
    self: string;
  }

  /**
   * A Tag is a label that can be applied to `Conversation` objects for organization
   * and filtering.
   */
  export interface Tag {
    /**
     * Unique identifier for the object.
     */
    id: string;

    /**
     * The name of the tag.
     */
    name: string;

    /**
     * String representing the object’s type. Always `tag` for this object.
     */
    type: 'tag';
  }
}

export interface InboxConversationRetrieveParams {
  /**
   * Specifies which related objects to include in the response. Valid options are
   * `addresses` and `tags`.
   */
  include?: Array<'addresses' | 'tags'>;
}

export interface InboxConversationListParams extends CursorPageParams {
  /**
   * When specified, returns results starting immediately before the item identified
   * by this cursor. Use the cursor value from the response's metadata to fetch the
   * previous page of results.
   */
  before?: string;

  /**
   * Filter conversations by one or more inbox IDs.
   */
  inbox?: Array<string>;

  /**
   * Specifies which related objects to include in the response. Valid options are
   * `addresses` and `tags`.
   */
  include?: Array<'addresses' | 'tags'>;

  /**
   * Maximum number of items to return per page. Must be between 1 and 100. Defaults
   * to 20 if not specified.
   */
  limit?: number;
}

export declare namespace InboxConversations {
  export {
    type InboxConversation as InboxConversation,
    type InboxConversationsCursorPage as InboxConversationsCursorPage,
    type InboxConversationRetrieveParams as InboxConversationRetrieveParams,
    type InboxConversationListParams as InboxConversationListParams,
  };
}
