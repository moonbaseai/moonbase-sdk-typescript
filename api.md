# Shared

Types:

- <code><a href="./src/resources/shared.ts">Error</a></code>

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
