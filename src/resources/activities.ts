// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import * as CollectionsAPI from './collections/collections';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

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
 *
 * Activities are polymorphic; the `type` field indicates the specific activity
 * that occurred, and the object will contain a property with a matching name that
 * holds the details of that event. For example, an `activity/meeting_held`
 * activity will contain a `meeting` property.
 */
export type Activity =
  | ActivityCallOccurred
  | ActivityFormSubmitted
  | ActivityInboxMessageSent
  | ActivityItemCreated
  | ActivityItemMentioned
  | ActivityItemMerged
  | Activity.FileCreatedActivity
  | ActivityMeetingHeld
  | ActivityMeetingScheduled
  | ActivityNoteCreated
  | ActivityProgramMessageBounced
  | ActivityProgramMessageClicked
  | ActivityProgramMessageComplained
  | ActivityProgramMessageFailed
  | ActivityProgramMessageOpened
  | ActivityProgramMessageSent
  | ActivityProgramMessageShielded
  | ActivityProgramMessageUnsubscribed;

export namespace Activity {
  /**
   * Represents an event that occurs when a `File` is created.
   */
  export interface FileCreatedActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    /**
     * A lightweight reference to another resource.
     */
    file: Shared.Pointer | null;

    /**
     * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
     */
    occurred_at: string;

    /**
     * A reference to an `Item` within a specific `Collection`, providing the context
     * needed to locate the item.
     */
    related_item: CollectionsAPI.ItemPointer | null;

    /**
     * The type of activity. Always `activity/file_created`.
     */
    type: 'activity/file_created';
  }
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
   * A lightweight reference to another resource.
   */
  call: Shared.Pointer | null;

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
   * A lightweight reference to another resource.
   */
  message: Shared.Pointer | null;

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
   * A lightweight reference to another resource.
   */
  note: Shared.Pointer | null;

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
   * A lightweight reference to another resource.
   */
  meeting: Shared.Pointer | null;

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
   * A lightweight reference to another resource.
   */
  meeting: Shared.Pointer | null;

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
   * A lightweight reference to another resource.
   */
  note: Shared.Pointer | null;

  /**
   * The time at which the event occurred, as an ISO 8601 timestamp in UTC.
   */
  occurred_at: string;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  related_item: CollectionsAPI.ItemPointer | null;

  /**
   * A lightweight reference to another resource.
   */
  related_meeting: Shared.Pointer | null;

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
   * A lightweight reference to another resource.
   */
  program_message: Shared.Pointer | null;

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
   * A lightweight reference to another resource.
   */
  program_message: Shared.Pointer | null;

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
   * A lightweight reference to another resource.
   */
  program_message: Shared.Pointer | null;

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
   * A lightweight reference to another resource.
   */
  program_message: Shared.Pointer | null;

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
  reason_code?: string;
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
   * A lightweight reference to another resource.
   */
  program_message: Shared.Pointer | null;

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
   * A lightweight reference to another resource.
   */
  program_message: Shared.Pointer | null;

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
   * A lightweight reference to another resource.
   */
  program_message: Shared.Pointer | null;

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
  reason_code?: string;
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
   * A lightweight reference to another resource.
   */
  program_message: Shared.Pointer | null;

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

export interface ActivityListParams extends CursorPageParams {
  /**
   * When specified, returns results starting immediately before the item identified
   * by this cursor. Use the cursor value from the response's metadata to fetch the
   * previous page of results.
   */
  before?: string;

  /**
   * Filter activities by type, date, or item.
   */
  filter?: ActivityListParams.Filter;

  /**
   * Maximum number of items to return per page. Must be between 1 and 100. Defaults
   * to 20 if not specified.
   */
  limit?: number;
}

export namespace ActivityListParams {
  /**
   * Filter activities by type, date, or item.
   */
  export interface Filter {
    item_id?: Filter.ItemID;

    occurred_at?: Filter.OccurredAt;

    type?: Filter.Type;
  }

  export namespace Filter {
    export interface ItemID {
      eq?: string;
    }

    export interface OccurredAt {
      gte?: string;

      lte?: string;
    }

    export interface Type {
      in?: Array<
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
        | 'activity/program_message_unsubscribed'
      >;
    }
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
    type ActivitiesCursorPage as ActivitiesCursorPage,
    type ActivityListParams as ActivityListParams,
  };
}
