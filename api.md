# Activities

Types:

- <code><a href="./src/resources/activities.ts">Activity</a></code>
- <code><a href="./src/resources/activities.ts">ActivityListResponse</a></code>

Methods:

- <code title="get /activities/{id}">client.activities.<a href="./src/resources/activities.ts">retrieve</a>(id) -> Activity</code>
- <code title="get /activities">client.activities.<a href="./src/resources/activities.ts">list</a>({ ...params }) -> ActivityListResponse</code>

# Calls

Types:

- <code><a href="./src/resources/calls.ts">Call</a></code>

Methods:

- <code title="post /calls">client.calls.<a href="./src/resources/calls.ts">log</a>({ ...params }) -> Call</code>

# Collections

Types:

- <code><a href="./src/resources/collections.ts">Collection</a></code>
- <code><a href="./src/resources/collections.ts">CollectionListResponse</a></code>
- <code><a href="./src/resources/collections.ts">CollectionRetrieveFieldResponse</a></code>

Methods:

- <code title="get /collections/{id}">client.collections.<a href="./src/resources/collections.ts">retrieve</a>(id, { ...params }) -> Collection</code>
- <code title="get /collections">client.collections.<a href="./src/resources/collections.ts">list</a>({ ...params }) -> CollectionListResponse</code>
- <code title="get /collections/{collection_id}/fields/{id}">client.collections.<a href="./src/resources/collections.ts">retrieveField</a>(id, { ...params }) -> CollectionRetrieveFieldResponse</code>

# Files

Types:

- <code><a href="./src/resources/files.ts">File</a></code>
- <code><a href="./src/resources/files.ts">FileListResponse</a></code>

Methods:

- <code title="get /files/{id}">client.files.<a href="./src/resources/files.ts">retrieve</a>(id) -> File</code>
- <code title="get /files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> FileListResponse</code>

# Forms

Types:

- <code><a href="./src/resources/forms.ts">Form</a></code>
- <code><a href="./src/resources/forms.ts">FormListResponse</a></code>

Methods:

- <code title="get /forms/{id}">client.forms.<a href="./src/resources/forms.ts">retrieve</a>(id, { ...params }) -> Form</code>
- <code title="get /forms">client.forms.<a href="./src/resources/forms.ts">list</a>({ ...params }) -> FormListResponse</code>

# InboxConversations

Types:

- <code><a href="./src/resources/inbox-conversations.ts">Address</a></code>
- <code><a href="./src/resources/inbox-conversations.ts">InboxConversation</a></code>
- <code><a href="./src/resources/inbox-conversations.ts">Tag</a></code>
- <code><a href="./src/resources/inbox-conversations.ts">InboxConversationListResponse</a></code>

Methods:

- <code title="get /inbox_conversations/{id}">client.inboxConversations.<a href="./src/resources/inbox-conversations.ts">retrieve</a>(id, { ...params }) -> InboxConversation</code>
- <code title="get /inbox_conversations">client.inboxConversations.<a href="./src/resources/inbox-conversations.ts">list</a>({ ...params }) -> InboxConversationListResponse</code>

# InboxMessages

Types:

- <code><a href="./src/resources/inbox-messages.ts">EmailMessage</a></code>
- <code><a href="./src/resources/inbox-messages.ts">InboxMessageListResponse</a></code>

Methods:

- <code title="get /inbox_messages/{id}">client.inboxMessages.<a href="./src/resources/inbox-messages.ts">retrieve</a>(id, { ...params }) -> EmailMessage</code>
- <code title="get /inbox_messages">client.inboxMessages.<a href="./src/resources/inbox-messages.ts">list</a>({ ...params }) -> InboxMessageListResponse</code>

# Inboxes

Types:

- <code><a href="./src/resources/inboxes.ts">Inbox</a></code>
- <code><a href="./src/resources/inboxes.ts">InboxListResponse</a></code>

Methods:

- <code title="get /inboxes/{id}">client.inboxes.<a href="./src/resources/inboxes.ts">retrieve</a>(id, { ...params }) -> Inbox</code>
- <code title="get /inboxes">client.inboxes.<a href="./src/resources/inboxes.ts">list</a>({ ...params }) -> InboxListResponse</code>

# Items

Types:

- <code><a href="./src/resources/items.ts">Item</a></code>

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
- <code><a href="./src/resources/meetings.ts">MeetingListResponse</a></code>

Methods:

- <code title="get /meetings/{id}">client.meetings.<a href="./src/resources/meetings.ts">retrieve</a>(id, { ...params }) -> Meeting</code>
- <code title="get /meetings">client.meetings.<a href="./src/resources/meetings.ts">list</a>({ ...params }) -> MeetingListResponse</code>

# Notes

Types:

- <code><a href="./src/resources/notes.ts">Note</a></code>
- <code><a href="./src/resources/notes.ts">NoteListResponse</a></code>

Methods:

- <code title="get /notes/{id}">client.notes.<a href="./src/resources/notes.ts">retrieve</a>(id) -> Note</code>
- <code title="get /notes">client.notes.<a href="./src/resources/notes.ts">list</a>({ ...params }) -> NoteListResponse</code>

# ProgramMessages

Types:

- <code><a href="./src/resources/program-messages.ts">ProgramMessageSendResponse</a></code>

Methods:

- <code title="post /program_messages">client.programMessages.<a href="./src/resources/program-messages.ts">send</a>({ ...params }) -> ProgramMessageSendResponse</code>

# ProgramTemplates

Types:

- <code><a href="./src/resources/program-templates.ts">ProgramTemplate</a></code>
- <code><a href="./src/resources/program-templates.ts">ProgramTemplateListResponse</a></code>

Methods:

- <code title="get /program_templates/{id}">client.programTemplates.<a href="./src/resources/program-templates.ts">retrieve</a>(id, { ...params }) -> ProgramTemplate</code>
- <code title="get /program_templates">client.programTemplates.<a href="./src/resources/program-templates.ts">list</a>({ ...params }) -> ProgramTemplateListResponse</code>

# Programs

Types:

- <code><a href="./src/resources/programs.ts">Program</a></code>
- <code><a href="./src/resources/programs.ts">ProgramListResponse</a></code>

Methods:

- <code title="get /programs/{id}">client.programs.<a href="./src/resources/programs.ts">retrieve</a>(id, { ...params }) -> Program</code>
- <code title="get /programs">client.programs.<a href="./src/resources/programs.ts">list</a>({ ...params }) -> ProgramListResponse</code>

# Tagsets

Types:

- <code><a href="./src/resources/tagsets.ts">Tagset</a></code>
- <code><a href="./src/resources/tagsets.ts">TagsetListResponse</a></code>

Methods:

- <code title="get /tagsets/{id}">client.tagsets.<a href="./src/resources/tagsets.ts">retrieve</a>(id) -> Tagset</code>
- <code title="get /tagsets">client.tagsets.<a href="./src/resources/tagsets.ts">list</a>({ ...params }) -> TagsetListResponse</code>

# Views

Types:

- <code><a href="./src/resources/views.ts">View</a></code>
- <code><a href="./src/resources/views.ts">ViewListItemsResponse</a></code>

Methods:

- <code title="get /views/{id}">client.views.<a href="./src/resources/views.ts">retrieve</a>(id, { ...params }) -> View</code>
- <code title="get /views/{id}/items">client.views.<a href="./src/resources/views.ts">listItems</a>(id, { ...params }) -> ViewListItemsResponse</code>
