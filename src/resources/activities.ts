// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CallsAPI from './calls';
import * as FilesAPI from './files';
import * as MeetingsAPI from './meetings';
import * as NotesAPI from './notes';
import * as ProgramMessagesAPI from './program-messages';
import * as ProgramTemplatesAPI from './program-templates';
import * as ProgramsAPI from './programs';
import * as UnsubscribesAPI from './unsubscribes';
import * as CollectionsAPI from './collections/collections';
import * as InboxMessagesAPI from './inbox-messages/inbox-messages';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * View activities and capture calls
 */
export class Activities extends APIResource {
  /**
   * Retrieves the details of an existing activity.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Activity> {
    return this._client.get(path`/activities/${id}`, options);
  }

  /**
   * Returns a list of activities.
   */
  list(
    query: ActivityListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ActivitiesCursorPage, Activity> {
    return this._client.getAPIList('/activities', CursorPage<Activity>, { query, ...options });
  }
}

export type ActivitiesCursorPage = CursorPage<Activity>;

/**
 * The Activity object represents a specific event that has occurred, such as a
 * meeting being scheduled or a form being submitted.
 */
export interface Activity {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * An array of entities involved along with each entity's relation to the activity.
   */
  constituents: Array<Constituent>;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * The type of activity.
   */
  type:
    | 'activity/call_occurred'
    | 'activity/file_created'
    | 'activity/form_submitted'
    | 'activity/inbox_message_sent'
    | 'activity/item_created'
    | 'activity/item_mentioned'
    | 'activity/item_merged'
    | 'activity/meeting_held'
    | 'activity/meeting_scheduled'
    | 'activity/note_created'
    | 'activity/program_message_bounced'
    | 'activity/program_message_clicked'
    | 'activity/program_message_complained'
    | 'activity/program_message_failed'
    | 'activity/program_message_opened'
    | 'activity/program_message_sent'
    | 'activity/program_message_shielded'
    | 'activity/program_message_unsubscribed';
}

/**
 * Represents an event that occurs when an incoming or outgoing call is logged.
 */
export interface ActivityCallOccurred {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The `Call` object associated with this event.
   */
  call: CallsAPI.CallPointer | null;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * The type of activity. Always `activity/call_occurred`.
   */
  type: 'activity/call_occurred';
}

/**
 * Represents an event that occurs when a `Form` is submitted.
 */
export interface ActivityFormSubmitted {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  item: CollectionsAPI.ItemPointer | null;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * The type of activity. Always `activity/form_submitted`.
   */
  type: 'activity/form_submitted';
}

/**
 * Represents an event that occurs when a message is sent from an `Inbox`.
 */
export interface ActivityInboxMessageSent {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The `EmailMessage` that was sent.
   */
  message: InboxMessagesAPI.EmailMessagePointer | null;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * The type of activity. Always `activity/inbox_message_sent`.
   */
  type: 'activity/inbox_message_sent';
}

/**
 * Represents an event that occurs when an `Item` is created.
 */
export interface ActivityItemCreated {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  item: CollectionsAPI.ItemPointer | null;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * The type of activity. Always `activity/item_created`.
   */
  type: 'activity/item_created';
}

/**
 * Represents an event that occurs when an `Item` is mentioned.
 */
export interface ActivityItemMentioned {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  author: CollectionsAPI.ItemPointer | null;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  item: CollectionsAPI.ItemPointer | null;

  /**
   * The `Note` in which the item was mentioned.
   */
  note: NotesAPI.NotePointer | null;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * The type of activity. Always `activity/item_mentioned`.
   */
  type: 'activity/item_mentioned';
}

/**
 * Represents an event that occurs when an `Item` is merged into another item.
 */
export interface ActivityItemMerged {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  destination: CollectionsAPI.ItemPointer | null;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  initiator: CollectionsAPI.ItemPointer | null;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  source: CollectionsAPI.ItemPointer | null;

  /**
   * The type of activity. Always `activity/item_merged`.
   */
  type: 'activity/item_merged';
}

/**
 * Represents an event that occurs when a `Meeting` has concluded.
 */
export interface ActivityMeetingHeld {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The `Meeting` object associated with this event.
   */
  meeting: MeetingsAPI.MeetingPointer | null;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * The type of activity. Always `activity/meeting_held`.
   */
  type: 'activity/meeting_held';
}

/**
 * Represents an event that occurs when a `Meeting` is scheduled.
 */
export interface ActivityMeetingScheduled {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The `Meeting` object associated with this event.
   */
  meeting: MeetingsAPI.MeetingPointer | null;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * The type of activity. Always `activity/meeting_scheduled`.
   */
  type: 'activity/meeting_scheduled';
}

/**
 * Represents an event that occurs when a `Note` is created.
 */
export interface ActivityNoteCreated {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The `Note` object that was created.
   */
  note: NotesAPI.NotePointer | null;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * An array of `Item` this note is related to, if any.
   */
  related_items: Array<CollectionsAPI.ItemPointer>;

  /**
   * The `Meeting` this note is related to, if any.
   */
  related_meeting: MeetingsAPI.MeetingPointer | null;

  /**
   * The type of activity. Always `activity/note_created`.
   */
  type: 'activity/note_created';
}

/**
 * Represents an event that occurs when a `ProgramMessage` bounces.
 */
export interface ActivityProgramMessageBounced {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * The `ProgramMessage` associated with the event.
   */
  program_message: ProgramMessagesAPI.ProgramMessagePointer | null;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  recipient: CollectionsAPI.ItemPointer | null;

  /**
   * The type of activity. Always `activity/program_message_bounced`.
   */
  type: 'activity/program_message_bounced';

  /**
   * The type of bounce (e.g., `Permanent` for hard bounces, `Temporary` for soft
   * bounces).
   */
  bounce_type?: string;

  /**
   * List of email addresses that bounced.
   */
  bounced_recipient_emails?: Array<string>;
}

/**
 * Represents an event that occurs when a recipient clicks a tracked link in a
 * `ProgramMessage`.
 */
export interface ActivityProgramMessageClicked {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * The `ProgramMessage` associated with the event.
   */
  program_message: ProgramMessagesAPI.ProgramMessagePointer | null;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  recipient: CollectionsAPI.ItemPointer | null;

  /**
   * The type of activity. Always `activity/program_message_clicked`.
   */
  type: 'activity/program_message_clicked';

  /**
   * The text of the link that was clicked.
   */
  link_text?: string;

  /**
   * The URL of the link that was clicked.
   */
  link_url_unsafe?: string;
}

/**
 * Represents an event that occurs when a recipient marks a `ProgramMessage` as
 * spam.
 */
export interface ActivityProgramMessageComplained {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * The `ProgramMessage` associated with the event.
   */
  program_message: ProgramMessagesAPI.ProgramMessagePointer | null;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  recipient: CollectionsAPI.ItemPointer | null;

  /**
   * The type of activity. Always `activity/program_message_complained`.
   */
  type: 'activity/program_message_complained';
}

/**
 * Represents an event that occurs when a `ProgramMessage` fails to be delivered
 * for a technical reason.
 */
export interface ActivityProgramMessageFailed {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * The `ProgramMessage` associated with the event.
   */
  program_message: ProgramMessagesAPI.ProgramMessagePointer | null;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  recipient: CollectionsAPI.ItemPointer | null;

  /**
   * The type of activity. Always `activity/program_message_failed`.
   */
  type: 'activity/program_message_failed';

  /**
   * A code indicating the reason for the failure (e.g., `message_contained_virus`).
   */
  reason_code?: 'liquid_error' | 'person_missing_email' | 'message_contained_virus';
}

/**
 * Represents an event that occurs when a recipient opens a `ProgramMessage`.
 */
export interface ActivityProgramMessageOpened {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * The `ProgramMessage` associated with the event.
   */
  program_message: ProgramMessagesAPI.ProgramMessagePointer | null;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  recipient: CollectionsAPI.ItemPointer | null;

  /**
   * The type of activity. Always `activity/program_message_opened`.
   */
  type: 'activity/program_message_opened';
}

/**
 * Represents an event that occurs when a `ProgramMessage` is successfully sent.
 */
export interface ActivityProgramMessageSent {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * The `ProgramMessage` associated with the event.
   */
  program_message: ProgramMessagesAPI.ProgramMessagePointer | null;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  recipient: CollectionsAPI.ItemPointer | null;

  /**
   * The type of activity. Always `activity/program_message_sent`.
   */
  type: 'activity/program_message_sent';

  /**
   * List of email addresses the message was sent to.
   */
  recipient_emails?: Array<string>;
}

/**
 * Represents an event that occurs when a `ProgramMessage` is prevented from being
 * sent by a delivery protection rule.
 */
export interface ActivityProgramMessageShielded {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * The `ProgramMessage` associated with the event.
   */
  program_message: ProgramMessagesAPI.ProgramMessagePointer | null;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  recipient: CollectionsAPI.ItemPointer | null;

  /**
   * The type of activity. Always `activity/program_message_shielded`.
   */
  type: 'activity/program_message_shielded';

  /**
   * A code indicating why the message was shielded (e.g.,
   * `person_previously_unsubscribed`).
   */
  reason_code?: 'person_previously_unsubscribed' | 'email_on_unsubscribe_list';
}

/**
 * Represents an event that occurs when a recipient unsubscribes after receiving a
 * `ProgramMessage`.
 */
export interface ActivityProgramMessageUnsubscribed {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * The `ProgramMessage` associated with the event.
   */
  program_message: ProgramMessagesAPI.ProgramMessagePointer | null;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  recipient: CollectionsAPI.ItemPointer | null;

  /**
   * The type of activity. Always `activity/program_message_unsubscribed`.
   */
  type: 'activity/program_message_unsubscribed';

  /**
   * The email address of the person who unsubscribed.
   */
  email?: string;
}

/**
 * The Constituent object represents information about something that was involved
 * in a particular activity.
 */
export interface Constituent {
  /**
   * A lightweight reference to the entity of `Constituent`, containing information
   * about what type of entity it is as well as the entity's id.
   */
  entity: ConstituentEntityPointer;

  relation: 'actor' | 'object' | 'target';

  type: 'constituent';
}

/**
 * A lightweight reference to the entity of `Constituent`, containing information
 * about what type of entity it is as well as the entity's id.
 */
export type ConstituentEntityPointer =
  | CallsAPI.CallPointer
  | CollectionsAPI.CollectionPointer
  | CollectionsAPI.ItemPointer
  | FilesAPI.FilePointer
  | MeetingsAPI.MeetingPointer
  | InboxMessagesAPI.EmailMessagePointer
  | NotesAPI.NotePointer
  | ProgramsAPI.ProgramPointer
  | ProgramMessagesAPI.ProgramMessagePointer
  | ProgramTemplatesAPI.ProgramTemplatePointer
  | UnsubscribesAPI.UnsubscribePointer;

export interface ActivityListParams extends CursorPageParams {
  /**
   * When specified, returns results starting immediately before the item identified
   * by this cursor. Use the cursor value from the response's metadata to fetch the
   * previous page of results.
   */
  before?: string;

  /**
   * Filter activities by which entities were involved. Must be paired with
   * constituent_entity_type.
   */
  constituent_entity_id?: ActivityListParams.ConstituentEntityID;

  /**
   * Filter activities by which entities were involved. Must be paired with
   * constituent_entity_id.
   */
  constituent_entity_type?: ActivityListParams.ConstituentEntityType;

  /**
   * Filter activities by which entities were involved via specific relations. Must
   * be paired with constituent_entity_type and constituent_entity_id.
   */
  constituent_relation?: ActivityListParams.ConstituentRelation;

  /**
   * Maximum number of items to return per page. Must be between 1 and 100. Defaults
   * to 20 if not specified.
   */
  limit?: number;

  /**
   * Filter activities by when they occurred.
   */
  occurred_at?: ActivityListParams.OccurredAt;

  /**
   * Filter activities by type.
   */
  type?: ActivityListParams.Type;
}

export namespace ActivityListParams {
  /**
   * Filter activities by which entities were involved. Must be paired with
   * constituent_entity_type.
   */
  export interface ConstituentEntityID {
    eq?: string;
  }

  /**
   * Filter activities by which entities were involved. Must be paired with
   * constituent_entity_id.
   */
  export interface ConstituentEntityType {
    /**
     * The type of the entity involved as a constituent of the activity.
     */
    eq?:
      | 'call'
      | 'collection'
      | 'email_message'
      | 'file'
      | 'item'
      | 'meeting'
      | 'note'
      | 'program'
      | 'program_message'
      | 'program_template'
      | 'unsubscribe';
  }

  /**
   * Filter activities by which entities were involved via specific relations. Must
   * be paired with constituent_entity_type and constituent_entity_id.
   */
  export interface ConstituentRelation {
    eq?: 'actor' | 'object' | 'target';
  }

  /**
   * Filter activities by when they occurred.
   */
  export interface OccurredAt {
    gte?: string;

    lte?: string;
  }

  /**
   * Filter activities by type.
   */
  export interface Type {
    eq?:
      | 'activity/call_occurred'
      | 'activity/form_submitted'
      | 'activity/inbox_message_sent'
      | 'activity/item_created'
      | 'activity/item_mentioned'
      | 'activity/item_merged'
      | 'activity/file_created'
      | 'activity/meeting_held'
      | 'activity/meeting_scheduled'
      | 'activity/note_created'
      | 'activity/program_message_bounced'
      | 'activity/program_message_clicked'
      | 'activity/program_message_complained'
      | 'activity/program_message_failed'
      | 'activity/program_message_opened'
      | 'activity/program_message_sent'
      | 'activity/program_message_shielded'
      | 'activity/program_message_unsubscribed';
  }
}

export declare namespace Activities {
  export {
    type Activity as Activity,
    type ActivityCallOccurred as ActivityCallOccurred,
    type ActivityFormSubmitted as ActivityFormSubmitted,
    type ActivityInboxMessageSent as ActivityInboxMessageSent,
    type ActivityItemCreated as ActivityItemCreated,
    type ActivityItemMentioned as ActivityItemMentioned,
    type ActivityItemMerged as ActivityItemMerged,
    type ActivityMeetingHeld as ActivityMeetingHeld,
    type ActivityMeetingScheduled as ActivityMeetingScheduled,
    type ActivityNoteCreated as ActivityNoteCreated,
    type ActivityProgramMessageBounced as ActivityProgramMessageBounced,
    type ActivityProgramMessageClicked as ActivityProgramMessageClicked,
    type ActivityProgramMessageComplained as ActivityProgramMessageComplained,
    type ActivityProgramMessageFailed as ActivityProgramMessageFailed,
    type ActivityProgramMessageOpened as ActivityProgramMessageOpened,
    type ActivityProgramMessageSent as ActivityProgramMessageSent,
    type ActivityProgramMessageShielded as ActivityProgramMessageShielded,
    type ActivityProgramMessageUnsubscribed as ActivityProgramMessageUnsubscribed,
    type Constituent as Constituent,
    type ConstituentEntityPointer as ConstituentEntityPointer,
    type ActivitiesCursorPage as ActivitiesCursorPage,
    type ActivityListParams as ActivityListParams,
  };
}
