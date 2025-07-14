// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CallsAPI from './calls';
import * as InboxMessagesAPI from './inbox-messages';
import * as ItemsAPI from './items';
import * as MeetingsAPI from './meetings';
import * as NotesAPI from './notes';
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
  | Activity.CallOccurredActivity
  | Activity.FormSubmittedActivity
  | Activity.InboxMessageSentActivity
  | Activity.ItemCreatedActivity
  | Activity.ItemMentionedActivity
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
    call?: CallsAPI.Call;
  }

  export namespace CallOccurredActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;
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
    collection?: CollectionsAPI.Collection;

    /**
     * The `Item` that was created by the form submission.
     */
    item?: ItemsAPI.Item;
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
    message?: InboxMessagesAPI.EmailMessage;

    /**
     * A list of `Address` objects for the recipients.
     */
    recipients?: Array<InboxMessagesAPI.Address>;

    /**
     * The `Address` of the sender.
     */
    sender?: InboxMessagesAPI.Address;
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
    collection?: CollectionsAPI.Collection;

    /**
     * The `Item` that was created.
     */
    item?: ItemsAPI.Item;
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

    /**
     * The `Collection` the item belongs to.
     */
    collection?: CollectionsAPI.Collection;

    /**
     * The `Item` that was mentioned.
     */
    item?: ItemsAPI.Item;
  }

  export namespace ItemMentionedActivity {
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
       * A link to the `Item` that was mentioned.
       */
      item?: string;
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
     * A list of `Attendee` objects who were part of the meeting.
     */
    attendees?: Array<MeetingsAPI.Attendee>;

    /**
     * The `Meeting` object associated with this event.
     */
    meeting?: MeetingsAPI.Meeting;
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
     * The list of `Attendee` objects invited to the meeting.
     */
    attendees?: Array<MeetingsAPI.Attendee>;

    /**
     * The `Meeting` object associated with this event.
     */
    meeting?: MeetingsAPI.Meeting;

    /**
     * The `Organizer` of the meeting.
     */
    organizer?: MeetingsAPI.Organizer;
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
    note?: NotesAPI.Note;

    /**
     * The `Item` this note is related to, if any.
     */
    related_item?: ItemsAPI.Item;

    /**
     * The `Meeting` this note is related to, if any.
     */
    related_meeting?: MeetingsAPI.Meeting;
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

    /**
     * The `Address` of the recipient whose message bounced.
     */
    recipient?: InboxMessagesAPI.Address;
  }

  export namespace ProgramMessageBouncedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;
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

    /**
     * The `Address` of the recipient who clicked the link.
     */
    recipient?: InboxMessagesAPI.Address;
  }

  export namespace ProgramMessageClickedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;
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

    /**
     * The `Address` of the recipient who complained.
     */
    recipient?: InboxMessagesAPI.Address;
  }

  export namespace ProgramMessageComplainedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;
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

    /**
     * The `Address` of the recipient whose message failed.
     */
    recipient?: InboxMessagesAPI.Address;
  }

  export namespace ProgramMessageFailedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;
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

    /**
     * The `Address` of the recipient who opened the message.
     */
    recipient?: InboxMessagesAPI.Address;
  }

  export namespace ProgramMessageOpenedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;
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

    /**
     * The `Address` of the recipient the message was sent to.
     */
    recipient?: InboxMessagesAPI.Address;
  }

  export namespace ProgramMessageSentActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;
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

    /**
     * The `Address` of the recipient whose message was shielded.
     */
    recipient?: InboxMessagesAPI.Address;
  }

  export namespace ProgramMessageShieldedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;
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

    /**
     * The `Address` of the recipient who unsubscribed.
     */
    recipient?: InboxMessagesAPI.Address;
  }

  export namespace ProgramMessageUnsubscribedActivity {
    export interface Links {
      /**
       * The canonical URL for this object.
       */
      self: string;
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
