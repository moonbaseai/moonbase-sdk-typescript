# Shared

Types:

- <code><a href="./src/resources/shared.ts">Error</a></code>

# Activities

Types:

- <code><a href="./src/resources/activities.ts">Activity</a></code>

Methods:

- <code title="get /activities/{id}">client.activities.<a href="./src/resources/activities.ts">retrieve</a>(id) -> Activity</code>
- <code title="get /activities">client.activities.<a href="./src/resources/activities.ts">list</a>({ ...params }) -> ActivitiesCursorPage</code>

# Calls

Types:

- <code><a href="./src/resources/calls.ts">Call</a></code>

Methods:

- <code title="post /calls">client.calls.<a href="./src/resources/calls.ts">create</a>({ ...params }) -> Call</code>
- <code title="post /calls/upsert">client.calls.<a href="./src/resources/calls.ts">upsert</a>({ ...params }) -> Call</code>

# Collections

Types:

- <code><a href="./src/resources/collections/collections.ts">Collection</a></code>
- <code><a href="./src/resources/collections/collections.ts">Field</a></code>

Methods:

- <code title="get /collections/{id}">client.collections.<a href="./src/resources/collections/collections.ts">retrieve</a>(id, { ...params }) -> Collection</code>
- <code title="get /collections">client.collections.<a href="./src/resources/collections/collections.ts">list</a>({ ...params }) -> CollectionsCursorPage</code>

## Fields

Methods:

- <code title="get /collections/{collection_id}/fields/{id}">client.collections.fields.<a href="./src/resources/collections/fields.ts">retrieve</a>(id, { ...params }) -> Field</code>

# Files

Types:

- <code><a href="./src/resources/files.ts">MoonbaseFile</a></code>

Methods:

- <code title="get /files/{id}">client.files.<a href="./src/resources/files.ts">retrieve</a>(id) -> MoonbaseFile</code>
- <code title="get /files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> MoonbaseFilesCursorPage</code>

# Forms

Types:

- <code><a href="./src/resources/forms.ts">Form</a></code>

Methods:

- <code title="get /forms/{id}">client.forms.<a href="./src/resources/forms.ts">retrieve</a>(id, { ...params }) -> Form</code>
- <code title="get /forms">client.forms.<a href="./src/resources/forms.ts">list</a>({ ...params }) -> FormsCursorPage</code>

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

# Inboxes

Types:

- <code><a href="./src/resources/inboxes.ts">Inbox</a></code>

Methods:

- <code title="get /inboxes/{id}">client.inboxes.<a href="./src/resources/inboxes.ts">retrieve</a>(id, { ...params }) -> Inbox</code>
- <code title="get /inboxes">client.inboxes.<a href="./src/resources/inboxes.ts">list</a>({ ...params }) -> InboxesCursorPage</code>

# Items

Types:

- <code><a href="./src/resources/items.ts">BooleanValue</a></code>
- <code><a href="./src/resources/items.ts">Choice</a></code>
- <code><a href="./src/resources/items.ts">DateValue</a></code>
- <code><a href="./src/resources/items.ts">DatetimeValue</a></code>
- <code><a href="./src/resources/items.ts">DomainValue</a></code>
- <code><a href="./src/resources/items.ts">EmailValue</a></code>
- <code><a href="./src/resources/items.ts">FieldValue</a></code>
- <code><a href="./src/resources/items.ts">FloatValue</a></code>
- <code><a href="./src/resources/items.ts">FunnelStep</a></code>
- <code><a href="./src/resources/items.ts">GeoValue</a></code>
- <code><a href="./src/resources/items.ts">IntegerValue</a></code>
- <code><a href="./src/resources/items.ts">Item</a></code>
- <code><a href="./src/resources/items.ts">MonetaryValue</a></code>
- <code><a href="./src/resources/items.ts">MultiLineTextValue</a></code>
- <code><a href="./src/resources/items.ts">PercentageValue</a></code>
- <code><a href="./src/resources/items.ts">RelationValue</a></code>
- <code><a href="./src/resources/items.ts">SingleLineTextValue</a></code>
- <code><a href="./src/resources/items.ts">SocialLinkedInValue</a></code>
- <code><a href="./src/resources/items.ts">SocialXValue</a></code>
- <code><a href="./src/resources/items.ts">TelephoneNumber</a></code>
- <code><a href="./src/resources/items.ts">URLValue</a></code>
- <code><a href="./src/resources/items.ts">Value</a></code>

Methods:

- <code title="post /items">client.items.<a href="./src/resources/items.ts">create</a>({ ...params }) -> Item</code>
- <code title="get /items/{id}">client.items.<a href="./src/resources/items.ts">retrieve</a>(id) -> Item</code>
- <code title="patch /items/{id}">client.items.<a href="./src/resources/items.ts">update</a>(id, { ...params }) -> Item</code>
- <code title="delete /items/{id}">client.items.<a href="./src/resources/items.ts">delete</a>(id) -> Item</code>
- <code title="post /items/upsert">client.items.<a href="./src/resources/items.ts">upsert</a>({ ...params }) -> Item</code>

# Meetings

Types:

- <code><a href="./src/resources/meetings.ts">Attendee</a></code>
- <code><a href="./src/resources/meetings.ts">Meeting</a></code>
- <code><a href="./src/resources/meetings.ts">Organizer</a></code>

Methods:

- <code title="get /meetings/{id}">client.meetings.<a href="./src/resources/meetings.ts">retrieve</a>(id, { ...params }) -> Meeting</code>
- <code title="get /meetings">client.meetings.<a href="./src/resources/meetings.ts">list</a>({ ...params }) -> MeetingsCursorPage</code>

# Notes

Types:

- <code><a href="./src/resources/notes.ts">Note</a></code>

Methods:

- <code title="get /notes/{id}">client.notes.<a href="./src/resources/notes.ts">retrieve</a>(id) -> Note</code>
- <code title="get /notes">client.notes.<a href="./src/resources/notes.ts">list</a>({ ...params }) -> NotesCursorPage</code>

# ProgramMessages

Types:

- <code><a href="./src/resources/program-messages.ts">ProgramMessageCreateResponse</a></code>

Methods:

- <code title="post /program_messages">client.programMessages.<a href="./src/resources/program-messages.ts">create</a>({ ...params }) -> ProgramMessageCreateResponse</code>

# ProgramTemplates

Types:

- <code><a href="./src/resources/program-templates.ts">ProgramTemplate</a></code>

Methods:

- <code title="get /program_templates/{id}">client.programTemplates.<a href="./src/resources/program-templates.ts">retrieve</a>(id, { ...params }) -> ProgramTemplate</code>
- <code title="get /program_templates">client.programTemplates.<a href="./src/resources/program-templates.ts">list</a>({ ...params }) -> ProgramTemplatesCursorPage</code>

# Programs

Types:

- <code><a href="./src/resources/programs.ts">Program</a></code>

Methods:

- <code title="get /programs/{id}">client.programs.<a href="./src/resources/programs.ts">retrieve</a>(id, { ...params }) -> Program</code>
- <code title="get /programs">client.programs.<a href="./src/resources/programs.ts">list</a>({ ...params }) -> ProgramsCursorPage</code>

# Tagsets

Types:

- <code><a href="./src/resources/tagsets.ts">Tagset</a></code>

Methods:

- <code title="get /tagsets/{id}">client.tagsets.<a href="./src/resources/tagsets.ts">retrieve</a>(id) -> Tagset</code>
- <code title="get /tagsets">client.tagsets.<a href="./src/resources/tagsets.ts">list</a>({ ...params }) -> TagsetsCursorPage</code>

# Views

Types:

- <code><a href="./src/resources/views/views.ts">View</a></code>

Methods:

- <code title="get /views/{id}">client.views.<a href="./src/resources/views/views.ts">retrieve</a>(id, { ...params }) -> View</code>

## Items

Methods:

- <code title="get /views/{id}/items">client.views.items.<a href="./src/resources/views/items.ts">list</a>(id, { ...params }) -> ItemsCursorPage</code>
