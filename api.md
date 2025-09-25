# Shared

Types:

- <code><a href="./src/resources/shared.ts">Error</a></code>
- <code><a href="./src/resources/shared.ts">FormattedText</a></code>
- <code><a href="./src/resources/shared.ts">Pointer</a></code>

# Funnels

Types:

- <code><a href="./src/resources/funnels.ts">Funnel</a></code>
- <code><a href="./src/resources/funnels.ts">FunnelStep</a></code>

# Collections

Types:

- <code><a href="./src/resources/collections/collections.ts">BooleanField</a></code>
- <code><a href="./src/resources/collections/collections.ts">BooleanValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">ChoiceField</a></code>
- <code><a href="./src/resources/collections/collections.ts">ChoiceFieldOption</a></code>
- <code><a href="./src/resources/collections/collections.ts">ChoiceValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">ChoiceValueParam</a></code>
- <code><a href="./src/resources/collections/collections.ts">Collection</a></code>
- <code><a href="./src/resources/collections/collections.ts">CollectionPointer</a></code>
- <code><a href="./src/resources/collections/collections.ts">DateField</a></code>
- <code><a href="./src/resources/collections/collections.ts">DateValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">DatetimeField</a></code>
- <code><a href="./src/resources/collections/collections.ts">DatetimeValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">DomainField</a></code>
- <code><a href="./src/resources/collections/collections.ts">DomainValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">EmailField</a></code>
- <code><a href="./src/resources/collections/collections.ts">EmailValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">Field</a></code>
- <code><a href="./src/resources/collections/collections.ts">FieldValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">FieldValueParam</a></code>
- <code><a href="./src/resources/collections/collections.ts">FloatField</a></code>
- <code><a href="./src/resources/collections/collections.ts">FloatValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">FunnelStepValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">FunnelStepValueParam</a></code>
- <code><a href="./src/resources/collections/collections.ts">GeoField</a></code>
- <code><a href="./src/resources/collections/collections.ts">GeoValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">IntegerField</a></code>
- <code><a href="./src/resources/collections/collections.ts">IntegerValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">Item</a></code>
- <code><a href="./src/resources/collections/collections.ts">ItemPointer</a></code>
- <code><a href="./src/resources/collections/collections.ts">MonetaryField</a></code>
- <code><a href="./src/resources/collections/collections.ts">MonetaryValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">MultiLineTextField</a></code>
- <code><a href="./src/resources/collections/collections.ts">MultiLineTextValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">PercentageField</a></code>
- <code><a href="./src/resources/collections/collections.ts">PercentageValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">RelationField</a></code>
- <code><a href="./src/resources/collections/collections.ts">RelationValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">RelationValueParam</a></code>
- <code><a href="./src/resources/collections/collections.ts">SingleLineTextField</a></code>
- <code><a href="./src/resources/collections/collections.ts">SingleLineTextValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">SocialLinkedInField</a></code>
- <code><a href="./src/resources/collections/collections.ts">SocialLinkedInValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">SocialXField</a></code>
- <code><a href="./src/resources/collections/collections.ts">SocialXValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">StageField</a></code>
- <code><a href="./src/resources/collections/collections.ts">TelephoneNumber</a></code>
- <code><a href="./src/resources/collections/collections.ts">TelephoneNumberField</a></code>
- <code><a href="./src/resources/collections/collections.ts">URLField</a></code>
- <code><a href="./src/resources/collections/collections.ts">URLValue</a></code>
- <code><a href="./src/resources/collections/collections.ts">Value</a></code>
- <code><a href="./src/resources/collections/collections.ts">ValueParam</a></code>

Methods:

- <code title="get /collections/{id}">client.collections.<a href="./src/resources/collections/collections.ts">retrieve</a>(id, { ...params }) -> Collection</code>
- <code title="get /collections">client.collections.<a href="./src/resources/collections/collections.ts">list</a>({ ...params }) -> CollectionsCursorPage</code>

## Fields

Methods:

- <code title="get /collections/{collection_id}/fields/{id}">client.collections.fields.<a href="./src/resources/collections/fields.ts">retrieve</a>(id, { ...params }) -> Field</code>

## Items

Methods:

- <code title="post /collections/{collection_id}/items">client.collections.items.<a href="./src/resources/collections/items.ts">create</a>(collectionID, { ...params }) -> Item</code>
- <code title="get /collections/{collection_id}/items/{id}">client.collections.items.<a href="./src/resources/collections/items.ts">retrieve</a>(id, { ...params }) -> Item</code>
- <code title="patch /collections/{collection_id}/items/{id}">client.collections.items.<a href="./src/resources/collections/items.ts">update</a>(id, { ...params }) -> Item</code>
- <code title="get /collections/{collection_id}/items">client.collections.items.<a href="./src/resources/collections/items.ts">list</a>(collectionID, { ...params }) -> ItemsCursorPage</code>
- <code title="delete /collections/{collection_id}/items/{id}">client.collections.items.<a href="./src/resources/collections/items.ts">delete</a>(id, { ...params }) -> void</code>
- <code title="post /collections/{collection_id}/items/upsert">client.collections.items.<a href="./src/resources/collections/items.ts">upsert</a>(collectionID, { ...params }) -> Item</code>

# Views

Types:

- <code><a href="./src/resources/views/views.ts">View</a></code>

Methods:

- <code title="get /views/{id}">client.views.<a href="./src/resources/views/views.ts">retrieve</a>(id, { ...params }) -> View</code>

## Items

Methods:

- <code title="get /views/{id}/items">client.views.items.<a href="./src/resources/views/items.ts">list</a>(id, { ...params }) -> ItemsCursorPage</code>

# Inboxes

Types:

- <code><a href="./src/resources/inboxes.ts">Inbox</a></code>

Methods:

- <code title="get /inboxes/{id}">client.inboxes.<a href="./src/resources/inboxes.ts">retrieve</a>(id, { ...params }) -> Inbox</code>
- <code title="get /inboxes">client.inboxes.<a href="./src/resources/inboxes.ts">list</a>({ ...params }) -> InboxesCursorPage</code>

# InboxConversations

Types:

- <code><a href="./src/resources/inbox-conversations.ts">InboxConversation</a></code>

Methods:

- <code title="get /inbox_conversations/{id}">client.inboxConversations.<a href="./src/resources/inbox-conversations.ts">retrieve</a>(id, { ...params }) -> InboxConversation</code>
- <code title="get /inbox_conversations">client.inboxConversations.<a href="./src/resources/inbox-conversations.ts">list</a>({ ...params }) -> InboxConversationsCursorPage</code>

# InboxMessages

Types:

- <code><a href="./src/resources/inbox-messages.ts">Address</a></code>
- <code><a href="./src/resources/inbox-messages.ts">EmailMessage</a></code>

Methods:

- <code title="get /inbox_messages/{id}">client.inboxMessages.<a href="./src/resources/inbox-messages.ts">retrieve</a>(id, { ...params }) -> EmailMessage</code>
- <code title="get /inbox_messages">client.inboxMessages.<a href="./src/resources/inbox-messages.ts">list</a>({ ...params }) -> EmailMessagesCursorPage</code>

# Tagsets

Types:

- <code><a href="./src/resources/tagsets.ts">Tagset</a></code>

Methods:

- <code title="get /tagsets/{id}">client.tagsets.<a href="./src/resources/tagsets.ts">retrieve</a>(id) -> Tagset</code>
- <code title="get /tagsets">client.tagsets.<a href="./src/resources/tagsets.ts">list</a>({ ...params }) -> TagsetsCursorPage</code>

# Programs

Types:

- <code><a href="./src/resources/programs.ts">Program</a></code>

Methods:

- <code title="get /programs/{id}">client.programs.<a href="./src/resources/programs.ts">retrieve</a>(id, { ...params }) -> Program</code>
- <code title="get /programs">client.programs.<a href="./src/resources/programs.ts">list</a>({ ...params }) -> ProgramsCursorPage</code>

# ProgramTemplates

Types:

- <code><a href="./src/resources/program-templates.ts">ProgramTemplate</a></code>

Methods:

- <code title="get /program_templates/{id}">client.programTemplates.<a href="./src/resources/program-templates.ts">retrieve</a>(id, { ...params }) -> ProgramTemplate</code>
- <code title="get /program_templates">client.programTemplates.<a href="./src/resources/program-templates.ts">list</a>({ ...params }) -> ProgramTemplatesCursorPage</code>

# ProgramMessages

Types:

- <code><a href="./src/resources/program-messages.ts">ProgramMessage</a></code>

Methods:

- <code title="post /program_messages">client.programMessages.<a href="./src/resources/program-messages.ts">send</a>({ ...params }) -> ProgramMessage</code>

# Forms

Types:

- <code><a href="./src/resources/forms.ts">Form</a></code>

Methods:

- <code title="get /forms/{id}">client.forms.<a href="./src/resources/forms.ts">retrieve</a>(id) -> Form</code>
- <code title="get /forms">client.forms.<a href="./src/resources/forms.ts">list</a>({ ...params }) -> FormsCursorPage</code>

# Activities

Types:

- <code><a href="./src/resources/activities.ts">Activity</a></code>
- <code><a href="./src/resources/activities.ts">ActivityCallOccurred</a></code>
- <code><a href="./src/resources/activities.ts">ActivityFormSubmitted</a></code>
- <code><a href="./src/resources/activities.ts">ActivityInboxMessageSent</a></code>
- <code><a href="./src/resources/activities.ts">ActivityItemCreated</a></code>
- <code><a href="./src/resources/activities.ts">ActivityItemMentioned</a></code>
- <code><a href="./src/resources/activities.ts">ActivityItemMerged</a></code>
- <code><a href="./src/resources/activities.ts">ActivityMeetingHeld</a></code>
- <code><a href="./src/resources/activities.ts">ActivityMeetingScheduled</a></code>
- <code><a href="./src/resources/activities.ts">ActivityNoteCreated</a></code>
- <code><a href="./src/resources/activities.ts">ActivityProgramMessageBounced</a></code>
- <code><a href="./src/resources/activities.ts">ActivityProgramMessageClicked</a></code>
- <code><a href="./src/resources/activities.ts">ActivityProgramMessageComplained</a></code>
- <code><a href="./src/resources/activities.ts">ActivityProgramMessageFailed</a></code>
- <code><a href="./src/resources/activities.ts">ActivityProgramMessageOpened</a></code>
- <code><a href="./src/resources/activities.ts">ActivityProgramMessageSent</a></code>
- <code><a href="./src/resources/activities.ts">ActivityProgramMessageShielded</a></code>
- <code><a href="./src/resources/activities.ts">ActivityProgramMessageUnsubscribed</a></code>

Methods:

- <code title="get /activities/{id}">client.activities.<a href="./src/resources/activities.ts">retrieve</a>(id) -> Activity</code>
- <code title="get /activities">client.activities.<a href="./src/resources/activities.ts">list</a>({ ...params }) -> ActivitiesCursorPage</code>

# Calls

Types:

- <code><a href="./src/resources/calls.ts">Call</a></code>

Methods:

- <code title="post /calls">client.calls.<a href="./src/resources/calls.ts">create</a>({ ...params }) -> Call</code>
- <code title="post /calls/upsert">client.calls.<a href="./src/resources/calls.ts">upsert</a>({ ...params }) -> Call</code>

# Files

Types:

- <code><a href="./src/resources/files.ts">MoonbaseFile</a></code>

Methods:

- <code title="get /files/{id}">client.files.<a href="./src/resources/files.ts">retrieve</a>(id) -> MoonbaseFile</code>
- <code title="get /files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> MoonbaseFilesCursorPage</code>

# Meetings

Types:

- <code><a href="./src/resources/meetings.ts">Attendee</a></code>
- <code><a href="./src/resources/meetings.ts">Meeting</a></code>
- <code><a href="./src/resources/meetings.ts">Organizer</a></code>

Methods:

- <code title="get /meetings/{id}">client.meetings.<a href="./src/resources/meetings.ts">retrieve</a>(id, { ...params }) -> Meeting</code>
- <code title="patch /meetings/{id}">client.meetings.<a href="./src/resources/meetings.ts">update</a>(id, { ...params }) -> Meeting</code>
- <code title="get /meetings">client.meetings.<a href="./src/resources/meetings.ts">list</a>({ ...params }) -> MeetingsCursorPage</code>

# Notes

Types:

- <code><a href="./src/resources/notes.ts">Note</a></code>

Methods:

- <code title="get /notes/{id}">client.notes.<a href="./src/resources/notes.ts">retrieve</a>(id) -> Note</code>
- <code title="get /notes">client.notes.<a href="./src/resources/notes.ts">list</a>({ ...params }) -> NotesCursorPage</code>

# WebhookEndpoints

Types:

- <code><a href="./src/resources/webhook-endpoints.ts">Endpoint</a></code>
- <code><a href="./src/resources/webhook-endpoints.ts">Subscription</a></code>

Methods:

- <code title="post /webhook_endpoints">client.webhookEndpoints.<a href="./src/resources/webhook-endpoints.ts">create</a>({ ...params }) -> Endpoint</code>
- <code title="get /webhook_endpoints/{id}">client.webhookEndpoints.<a href="./src/resources/webhook-endpoints.ts">retrieve</a>(id) -> Endpoint</code>
- <code title="patch /webhook_endpoints/{id}">client.webhookEndpoints.<a href="./src/resources/webhook-endpoints.ts">update</a>(id, { ...params }) -> Endpoint</code>
- <code title="get /webhook_endpoints">client.webhookEndpoints.<a href="./src/resources/webhook-endpoints.ts">list</a>({ ...params }) -> EndpointsCursorPage</code>
- <code title="delete /webhook_endpoints/{id}">client.webhookEndpoints.<a href="./src/resources/webhook-endpoints.ts">delete</a>(id) -> void</code>
