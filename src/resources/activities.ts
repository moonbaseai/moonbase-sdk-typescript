// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
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
  | Activity.CallOccurredActivity
  | Activity.FormSubmittedActivity
  | Activity.InboxMessageSentActivity
  | Activity.ItemCreatedActivity
  | Activity.ItemMentionedActivity
  | Activity.ItemMergedActivity
  | Activity.MeetingHeldActivity
  | Activity.MeetingScheduledActivity
  | Activity.NoteCreatedActivity
  | Activity.ProgramMessageBouncedActivity
  | Activity.ProgramMessageClickedActivity
  | Activity.ProgramMessageComplainedActivity
  | Activity.ProgramMessageFailedActivity
  | Activity.ProgramMessageOpenedActivity
  | Activity.ProgramMessageSentActivity
  | Activity.ProgramMessageShieldedActivity
  | Activity.ProgramMessageUnsubscribedActivity;

export namespace Activity {
  /**
   * Represents an event that occurs when an incoming or outgoing call is logged.
   */
  export interface CallOccurredActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    links: CallOccurredActivity.Links;

    /**
     * The time at which the event occurred, as an RFC 3339 timestamp.
     */
    occurred_at: string;

    /**
     * The type of activity. Always `activity/call_occurred`.
     */
    type: 'activity/call_occurred';

    /**
     * The `Call` object associated with this event.
     */
    call?: CallOccurredActivity.Call;
  }

  export namespace CallOccurredActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;
    }

    /**
     * The `Call` object associated with this event.
     */
    export interface Call {
      id: string;

      type: string;
    }
  }

  /**
   * Represents an event that occurs when a `Form` is submitted.
   */
  export interface FormSubmittedActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    links: FormSubmittedActivity.Links;

    /**
     * The time at which the event occurred, as an RFC 3339 timestamp.
     */
    occurred_at: string;

    /**
     * The type of activity. Always `activity/form_submitted`.
     */
    type: 'activity/form_submitted';

    /**
     * The `Collection` the new item was added to.
     */
    collection?: FormSubmittedActivity.Collection;

    related_item?: FormSubmittedActivity.RelatedItem;
  }

  export namespace FormSubmittedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;

      /**
       * A link to the `Collection` associated with the form.
       */
      collection?: string;

      /**
       * A link to the `Item` created by the form submission.
       */
      item?: string;
    }

    /**
     * The `Collection` the new item was added to.
     */
    export interface Collection {
      id: string;

      type: string;
    }

    export interface RelatedItem {
      id: string;

      type: string;
    }
  }

  /**
   * Represents an event that occurs when a message is sent from an `Inbox`.
   */
  export interface InboxMessageSentActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    links: InboxMessageSentActivity.Links;

    /**
     * The time at which the event occurred, as an RFC 3339 timestamp.
     */
    occurred_at: string;

    /**
     * The type of activity. Always `activity/inbox_message_sent`.
     */
    type: 'activity/inbox_message_sent';

    /**
     * The `EmailMessage` that was sent.
     */
    message?: InboxMessageSentActivity.Message;
  }

  export namespace InboxMessageSentActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;

      /**
       * A link to the `EmailMessage` that was sent.
       */
      message?: string;
    }

    /**
     * The `EmailMessage` that was sent.
     */
    export interface Message {
      id: string;

      type: string;
    }
  }

  /**
   * Represents an event that occurs when an `Item` is created.
   */
  export interface ItemCreatedActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    links: ItemCreatedActivity.Links;

    /**
     * The time at which the event occurred, as an RFC 3339 timestamp.
     */
    occurred_at: string;

    /**
     * The type of activity. Always `activity/item_created`.
     */
    type: 'activity/item_created';

    /**
     * The `Collection` the item was added to.
     */
    collection?: ItemCreatedActivity.Collection;

    created_item?: ItemCreatedActivity.CreatedItem;
  }

  export namespace ItemCreatedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;

      /**
       * A link to the `Collection` the item belongs to.
       */
      collection?: string;

      /**
       * A link to the `Item` that was created.
       */
      item?: string;
    }

    /**
     * The `Collection` the item was added to.
     */
    export interface Collection {
      id: string;

      type: string;
    }

    export interface CreatedItem {
      id: string;

      type: string;
    }
  }

  /**
   * Represents an event that occurs when an `Item` is mentioned.
   */
  export interface ItemMentionedActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    links: ItemMentionedActivity.Links;

    /**
     * The time at which the event occurred, as an RFC 3339 timestamp.
     */
    occurred_at: string;

    /**
     * The type of activity. Always `activity/item_mentioned`.
     */
    type: 'activity/item_mentioned';

    author?: ItemMentionedActivity.Author;

    mentioned_item?: ItemMentionedActivity.MentionedItem;

    note?: ItemMentionedActivity.Note;
  }

  export namespace ItemMentionedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;

      /**
       * A link to the `Person` who mentioned the item.
       */
      author?: string;

      /**
       * A link to the `Item` that was mentioned.
       */
      item?: string;

      /**
       * A link to the `Note` where the item was mentioned.
       */
      note?: string;
    }

    export interface Author {
      id: string;

      type: string;
    }

    export interface MentionedItem {
      id: string;

      type: string;
    }

    export interface Note {
      id: string;

      type: string;
    }
  }

  /**
   * Represents an event that occurs when an `Item` is merged into another item.
   */
  export interface ItemMergedActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    links: ItemMergedActivity.Links;

    /**
     * The time at which the event occurred, as an RFC 3339 timestamp.
     */
    occurred_at: string;

    /**
     * The type of activity. Always `activity/item_merged`.
     */
    type: 'activity/item_merged';

    /**
     * A pointer to the `Item` that the data was merged into.
     */
    destination?: ItemMergedActivity.Destination;

    /**
     * The person that performed the merge.
     */
    initiator?: ItemMergedActivity.Initiator;

    /**
     * A pointer to the source `Item`.
     */
    source?: ItemMergedActivity.Source;
  }

  export namespace ItemMergedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;

      /**
       * A link to the `Item` that received the data from the source.
       */
      destination?: string;

      /**
       * A link to the person that performed the merge.
       */
      initiator?: string;
    }

    /**
     * A pointer to the `Item` that the data was merged into.
     */
    export interface Destination {
      id: string;

      type: string;
    }

    /**
     * The person that performed the merge.
     */
    export interface Initiator {
      id: string;

      type: string;
    }

    /**
     * A pointer to the source `Item`.
     */
    export interface Source {
      id: string;

      type: string;
    }
  }

  /**
   * Represents an event that occurs when a `Meeting` has concluded.
   */
  export interface MeetingHeldActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    links: MeetingHeldActivity.Links;

    /**
     * The time at which the event occurred, as an RFC 3339 timestamp.
     */
    occurred_at: string;

    /**
     * The type of activity. Always `activity/meeting_held`.
     */
    type: 'activity/meeting_held';

    /**
     * The `Meeting` object associated with this event.
     */
    meeting?: MeetingHeldActivity.Meeting;
  }

  export namespace MeetingHeldActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;

      /**
       * A link to the `Meeting` that was held.
       */
      meeting?: string;
    }

    /**
     * The `Meeting` object associated with this event.
     */
    export interface Meeting {
      id: string;

      type: string;
    }
  }

  /**
   * Represents an event that occurs when a `Meeting` is scheduled.
   */
  export interface MeetingScheduledActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    links: MeetingScheduledActivity.Links;

    /**
     * The time at which the event occurred, as an RFC 3339 timestamp.
     */
    occurred_at: string;

    /**
     * The type of activity. Always `activity/meeting_scheduled`.
     */
    type: 'activity/meeting_scheduled';

    /**
     * The `Meeting` object associated with this event.
     */
    meeting?: MeetingScheduledActivity.Meeting;
  }

  export namespace MeetingScheduledActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;

      /**
       * A link to the `Meeting` that was scheduled.
       */
      meeting?: string;
    }

    /**
     * The `Meeting` object associated with this event.
     */
    export interface Meeting {
      id: string;

      type: string;
    }
  }

  /**
   * Represents an event that occurs when a `Note` is created.
   */
  export interface NoteCreatedActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    links: NoteCreatedActivity.Links;

    /**
     * The time at which the event occurred, as an RFC 3339 timestamp.
     */
    occurred_at: string;

    /**
     * The type of activity. Always `activity/note_created`.
     */
    type: 'activity/note_created';

    /**
     * The `Note` object that was created.
     */
    note?: NoteCreatedActivity.Note;

    /**
     * The `Item` this note is related to, if any.
     */
    related_item?: NoteCreatedActivity.RelatedItem;

    /**
     * The `Meeting` this note is related to, if any.
     */
    related_meeting?: NoteCreatedActivity.RelatedMeeting;
  }

  export namespace NoteCreatedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;

      /**
       * A link to the `Note` that was created.
       */
      note?: string;

      /**
       * A link to the related `Item`.
       */
      related_item?: string;

      /**
       * A link to the related `Meeting`.
       */
      related_meeting?: string;
    }

    /**
     * The `Note` object that was created.
     */
    export interface Note {
      id: string;

      type: string;
    }

    /**
     * The `Item` this note is related to, if any.
     */
    export interface RelatedItem {
      id: string;

      type: string;
    }

    /**
     * The `Meeting` this note is related to, if any.
     */
    export interface RelatedMeeting {
      id: string;

      type: string;
    }
  }

  /**
   * Represents an event that occurs when a `ProgramMessage` bounces.
   */
  export interface ProgramMessageBouncedActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    links: ProgramMessageBouncedActivity.Links;

    /**
     * The time at which the event occurred, as an RFC 3339 timestamp.
     */
    occurred_at: string;

    /**
     * The type of activity. Always `activity/program_message_bounced`.
     */
    type: 'activity/program_message_bounced';

    bounce_type?: string;

    bounced_recipient_emails?: Array<string>;

    program_message?: ProgramMessageBouncedActivity.ProgramMessage;

    /**
     * A link to the `Address` of the recipient whose message bounced.
     */
    recipient?: ProgramMessageBouncedActivity.Recipient;
  }

  export namespace ProgramMessageBouncedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;

      /**
       * A link to the `Address` of the recipient whose message bounced.
       */
      recipient?: string;
    }

    export interface ProgramMessage {
      id: string;

      type: string;
    }

    /**
     * A link to the `Address` of the recipient whose message bounced.
     */
    export interface Recipient {
      id: string;

      type: string;
    }
  }

  /**
   * Represents an event that occurs when a recipient clicks a tracked link in a
   * `ProgramMessage`.
   */
  export interface ProgramMessageClickedActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    links: ProgramMessageClickedActivity.Links;

    /**
     * The time at which the event occurred, as an RFC 3339 timestamp.
     */
    occurred_at: string;

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

    program_message?: ProgramMessageClickedActivity.ProgramMessage;

    /**
     * A link to the `Address` of the recipient who clicked the link.
     */
    recipient?: ProgramMessageClickedActivity.Recipient;
  }

  export namespace ProgramMessageClickedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;

      /**
       * A link to the `Address` of the recipient who clicked the link.
       */
      recipient?: string;
    }

    export interface ProgramMessage {
      id: string;

      type: string;
    }

    /**
     * A link to the `Address` of the recipient who clicked the link.
     */
    export interface Recipient {
      id: string;

      type: string;
    }
  }

  /**
   * Represents an event that occurs when a recipient marks a `ProgramMessage` as
   * spam.
   */
  export interface ProgramMessageComplainedActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    links: ProgramMessageComplainedActivity.Links;

    /**
     * The time at which the event occurred, as an RFC 3339 timestamp.
     */
    occurred_at: string;

    /**
     * The type of activity. Always `activity/program_message_complained`.
     */
    type: 'activity/program_message_complained';

    program_message?: ProgramMessageComplainedActivity.ProgramMessage;

    /**
     * A link to the `Address` of the recipient who complained.
     */
    recipient?: ProgramMessageComplainedActivity.Recipient;
  }

  export namespace ProgramMessageComplainedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;

      /**
       * A link to the `Address` of the recipient who complained.
       */
      recipient?: string;
    }

    export interface ProgramMessage {
      id: string;

      type: string;
    }

    /**
     * A link to the `Address` of the recipient who complained.
     */
    export interface Recipient {
      id: string;

      type: string;
    }
  }

  /**
   * Represents an event that occurs when a `ProgramMessage` fails to be delivered
   * for a technical reason.
   */
  export interface ProgramMessageFailedActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    links: ProgramMessageFailedActivity.Links;

    /**
     * The time at which the event occurred, as an RFC 3339 timestamp.
     */
    occurred_at: string;

    /**
     * The type of activity. Always `activity/program_message_failed`.
     */
    type: 'activity/program_message_failed';

    program_message?: ProgramMessageFailedActivity.ProgramMessage;

    reason_code?: string;

    /**
     * A link to the `Address` of the recipient whose message failed.
     */
    recipient?: ProgramMessageFailedActivity.Recipient;
  }

  export namespace ProgramMessageFailedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;

      /**
       * A link to the `Address` of the recipient whose message failed.
       */
      recipient?: string;
    }

    export interface ProgramMessage {
      id: string;

      type: string;
    }

    /**
     * A link to the `Address` of the recipient whose message failed.
     */
    export interface Recipient {
      id: string;

      type: string;
    }
  }

  /**
   * Represents an event that occurs when a recipient opens a `ProgramMessage`.
   */
  export interface ProgramMessageOpenedActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    links: ProgramMessageOpenedActivity.Links;

    /**
     * The time at which the event occurred, as an RFC 3339 timestamp.
     */
    occurred_at: string;

    /**
     * The type of activity. Always `activity/program_message_opened`.
     */
    type: 'activity/program_message_opened';

    program_message?: ProgramMessageOpenedActivity.ProgramMessage;

    /**
     * A link to the `Address` of the recipient who opened the message.
     */
    recipient?: ProgramMessageOpenedActivity.Recipient;
  }

  export namespace ProgramMessageOpenedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;

      /**
       * A link to the `Address` of the recipient who opened the message.
       */
      recipient?: string;
    }

    export interface ProgramMessage {
      id: string;

      type: string;
    }

    /**
     * A link to the `Address` of the recipient who opened the message.
     */
    export interface Recipient {
      id: string;

      type: string;
    }
  }

  /**
   * Represents an event that occurs when a `ProgramMessage` is successfully sent.
   */
  export interface ProgramMessageSentActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    links: ProgramMessageSentActivity.Links;

    /**
     * The time at which the event occurred, as an RFC 3339 timestamp.
     */
    occurred_at: string;

    /**
     * The type of activity. Always `activity/program_message_sent`.
     */
    type: 'activity/program_message_sent';

    program_message?: ProgramMessageSentActivity.ProgramMessage;

    /**
     * A link to the `Address` of the recipient the message was sent to.
     */
    recipient?: ProgramMessageSentActivity.Recipient;

    recipient_emails?: Array<string>;
  }

  export namespace ProgramMessageSentActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;

      /**
       * A link to the `Address` of the recipient the message was sent to.
       */
      recipient?: string;
    }

    export interface ProgramMessage {
      id: string;

      type: string;
    }

    /**
     * A link to the `Address` of the recipient the message was sent to.
     */
    export interface Recipient {
      id: string;

      type: string;
    }
  }

  /**
   * Represents an event that occurs when a `ProgramMessage` is prevented from being
   * sent by a delivery protection rule.
   */
  export interface ProgramMessageShieldedActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    links: ProgramMessageShieldedActivity.Links;

    /**
     * The time at which the event occurred, as an RFC 3339 timestamp.
     */
    occurred_at: string;

    /**
     * The type of activity. Always `activity/program_message_shielded`.
     */
    type: 'activity/program_message_shielded';

    program_message?: ProgramMessageShieldedActivity.ProgramMessage;

    reason_code?: string;

    /**
     * A link to the `Address` of the recipient whose message was shielded.
     */
    recipient?: ProgramMessageShieldedActivity.Recipient;
  }

  export namespace ProgramMessageShieldedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;

      /**
       * A link to the `Address` of the recipient whose message was shielded.
       */
      recipient?: string;
    }

    export interface ProgramMessage {
      id: string;

      type: string;
    }

    /**
     * A link to the `Address` of the recipient whose message was shielded.
     */
    export interface Recipient {
      id: string;

      type: string;
    }
  }

  /**
   * Represents an event that occurs when a recipient unsubscribes after receiving a
   * `ProgramMessage`.
   */
  export interface ProgramMessageUnsubscribedActivity {
    /**
     * Unique identifier for the object.
     */
    id: string;

    links: ProgramMessageUnsubscribedActivity.Links;

    /**
     * The time at which the event occurred, as an RFC 3339 timestamp.
     */
    occurred_at: string;

    /**
     * The type of activity. Always `activity/program_message_unsubscribed`.
     */
    type: 'activity/program_message_unsubscribed';

    email?: string;

    program_message?: ProgramMessageUnsubscribedActivity.ProgramMessage;

    /**
     * A link to the `Address` of the recipient who unsubscribed.
     */
    recipient?: ProgramMessageUnsubscribedActivity.Recipient;
  }

  export namespace ProgramMessageUnsubscribedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;

      /**
       * A link to the `Address` of the recipient who unsubscribed.
       */
      recipient?: string;
    }

    export interface ProgramMessage {
      id: string;

      type: string;
    }

    /**
     * A link to the `Address` of the recipient who unsubscribed.
     */
    export interface Recipient {
      id: string;

      type: string;
    }
  }
}

export interface ActivityListParams extends CursorPageParams {
  /**
   * When specified, returns results starting immediately before the item identified
   * by this cursor. Use the cursor value from the response's metadata to fetch the
   * previous page of results.
   */
  before?: string;

  /**
   * Maximum number of items to return per page. Must be between 1 and 100. Defaults
   * to 20 if not specified.
   */
  limit?: number;
}

export declare namespace Activities {
  export {
    type Activity as Activity,
    type ActivitiesCursorPage as ActivitiesCursorPage,
    type ActivityListParams as ActivityListParams,
  };
}
