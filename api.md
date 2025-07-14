# Shared

Types:

- <code><a href="./src/resources/shared.ts">Error</a></code>

# Calls

Types:

- <code><a href="./src/resources/calls.ts">Call</a></code>

Methods:

- <code title="post /calls">client.calls.<a href="./src/resources/calls.ts">create</a>({ ...params }) -> Call</code>

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

# ProgramMessages

Types:

- <code><a href="./src/resources/program-messages.ts">ProgramMessageSendResponse</a></code>

Methods:

- <code title="post /program_messages">client.programMessages.<a href="./src/resources/program-messages.ts">send</a>({ ...params }) -> ProgramMessageSendResponse</code>

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

- <code><a href="./src/resources/views.ts">View</a></code>

Methods:

- <code title="get /views/{id}">client.views.<a href="./src/resources/views.ts">retrieve</a>(id, { ...params }) -> View</code>
- <code title="get /views/{id}/items">client.views.<a href="./src/resources/views.ts">listItems</a>(id, { ...params }) -> ItemsCursorPage</code>
