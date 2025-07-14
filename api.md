# Shared

Types:

- <code><a href="./src/resources/shared.ts">Error</a></code>
- <code><a href="./src/resources/shared.ts">View</a></code>

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
