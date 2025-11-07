# Moonbase TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export MOONBASE_API_KEY="My API Key"
npx -y @moonbaseai/mcp@latest
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "moonbaseai_sdk_api": {
      "command": "npx",
      "args": ["-y", "@moonbaseai/mcp", "--client=claude", "--tools=dynamic"],
      "env": {
        "MOONBASE_API_KEY": "My API Key"
      }
    }
  }
}
```

### Cursor

If you use Cursor, you can install the MCP server by using the button below. You will need to set your environment variables
in Cursor's `mcp.json`, which can be found in Cursor Settings > Tools & MCP > New MCP Server.

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=@moonbaseai/mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBtb29uYmFzZWFpL21jcCJdLCJlbnYiOnsiTU9PTkJBU0VfQVBJX0tFWSI6IlNldCB5b3VyIE1PT05CQVNFX0FQSV9LRVkgaGVyZS4ifX0)

### VS Code

If you use MCP, you can install the MCP server by clicking the link below. You will need to set your environment variables
in VS Code's `mcp.json`, which can be found via Command Palette > MCP: Open User Configuration.

[Open VS Code](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40moonbaseai%2Fmcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40moonbaseai%2Fmcp%22%5D%2C%22env%22%3A%7B%22MOONBASE_API_KEY%22%3A%22Set%20your%20MOONBASE_API_KEY%20here.%22%7D%7D)

### Claude Code

If you use Claude Code, you can install the MCP server by running the command below in your terminal. You will need to set your
environment variables in Claude Code's `.claude.json`, which can be found in your home directory.

```
claude mcp add --transport stdio moonbaseai_sdk_api --env MOONBASE_API_KEY="Your MOONBASE_API_KEY here." -- npx -y @moonbaseai/mcp
```

## Exposing endpoints to your MCP Client

There are three ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API
3. Exposing a docs search tool and a code execution tool, allowing the client to write code to be executed against the TypeScript client

### Filtering endpoints and tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

### Dynamic tools

If you specify `--tools=dynamic` to the MCP server, instead of exposing one tool per endpoint in the API, it will
expose the following tools:

1. `list_api_endpoints` - Discovers available endpoints, with optional filtering by search query
2. `get_api_endpoint_schema` - Gets detailed schema information for a specific endpoint
3. `invoke_api_endpoint` - Executes any endpoint with the appropriate parameters

This allows you to have the full set of API endpoints available to your MCP Client, while not requiring that all
of their schemas be loaded into context at once. Instead, the LLM will automatically use these tools together to
search for, look up, and invoke endpoints dynamically. However, due to the indirect nature of the schemas, it
can struggle to provide the correct properties a bit more than when tools are imported explicitly. Therefore,
you can opt-in to explicit tools, the dynamic tools, or both.

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Code execution

If you specify `--tools=code` to the MCP server, it will expose just two tools:

- `search_docs` - Searches the API documentation and returns a list of markdown results
- `execute` - Runs code against the TypeScript client

This allows the LLM to implement more complex logic by chaining together many API calls without loading
intermediary results into its context window.

The code execution itself happens in a Deno sandbox that has network access only to the base URL for the API.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the `Authorization` header using the Bearer scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| -------------------- | ------------------------ | --------------- |
| `x-moonbase-api-key` | `apiKey` | bearer |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "moonbaseai_sdk_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Bearer <auth value>"
      }
    }
  }
}
```

The command-line arguments for filtering tools and specifying clients can also be used as query parameters in the URL.
For example, to exclude specific tools while including others, use the URL:

```
http://localhost:3000?resource=cards&resource=accounts&no_tool=create_cards
```

Or, to configure for the Cursor client, with a custom max tool name length, use the URL:

```
http://localhost:3000?client=cursor&capability=tool-name-length%3D40
```

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "@moonbaseai/mcp/server";

// import a specific tool
import retrieveCollections from "@moonbaseai/mcp/tools/collections/retrieve-collections";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [retrieveCollections, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `collections`:

- `retrieve_collections` (`read`): Retrieves the details of an existing collection.
- `list_collections` (`read`): Returns a list of your collections.

### Resource `collections.fields`:

- `retrieve_collections_fields` (`read`): Retrieves the details of a field in a collection.

### Resource `collections.items`:

- `create_collections_items` (`write`): Creates a new item in a collection.
- `retrieve_collections_items` (`read`): Retrieves the details of an existing item.
- `update_collections_items` (`write`): Updates an item.
- `list_collections_items` (`read`): Returns a list of items that are part of the collection.
- `delete_collections_items` (`write`): Permanently deletes an item.
- `upsert_collections_items` (`write`): Find and update an existing item, or create a new one.

### Resource `views`:

- `retrieve_views` (`read`): Retrieves the details of an existing view.

### Resource `views.items`:

- `list_views_items` (`read`): Returns a list of items that are part of the specified view.

### Resource `inboxes`:

- `retrieve_inboxes` (`read`): Retrieves the details of an existing inbox.
- `list_inboxes` (`read`): Returns a list of shared inboxes.

### Resource `inbox_conversations`:

- `retrieve_inbox_conversations` (`read`): Retrieves the details of an existing conversation.
- `list_inbox_conversations` (`read`): Returns a list of your conversations.

### Resource `inbox_messages`:

- `retrieve_inbox_messages` (`read`): Retrieves the details of an existing message.
- `list_inbox_messages` (`read`): Returns a list of messages.

### Resource `tagsets`:

- `retrieve_tagsets` (`read`): Retrieves the details of an existing tagset.
- `list_tagsets` (`read`): Returns a list of your tagsets.

### Resource `programs`:

- `retrieve_programs` (`read`): Retrieves the details of an existing program.
- `list_programs` (`read`): Returns a list of your marketing programs.

### Resource `program_templates`:

- `retrieve_program_templates` (`read`): Retrieves the details of an existing program template.
- `list_program_templates` (`read`): Returns a list of your program templates.

### Resource `program_messages`:

- `send_program_messages` (`write`): Sends a message using a program template.

### Resource `forms`:

- `retrieve_forms` (`read`): Retrieves the details of an existing form.
- `list_forms` (`read`): Returns a list of your forms.

### Resource `activities`:

- `retrieve_activities` (`read`): Retrieves the details of an existing activity.
- `list_activities` (`read`): Returns a list of activities.

### Resource `calls`:

- `create_calls` (`write`): Logs a phone call.
- `upsert_calls` (`write`): Find and update an existing phone call, or create a new one.

### Resource `files`:

- `retrieve_files` (`read`): Retrieves the details of an existing file.
- `list_files` (`read`): Returns a list of files that you have uploaded.

### Resource `meetings`:

- `retrieve_meetings` (`read`): Retrieves the details of an existing meeting.
- `update_meetings` (`write`):
- `list_meetings` (`read`): Returns a list of meetings.

### Resource `notes`:

- `retrieve_notes` (`read`): Retrieves the details of an existing note.
- `list_notes` (`read`): Returns a list of your notes.

### Resource `webhook_endpoints`:

- `create_webhook_endpoints` (`write`): Create a new endpoint.
- `retrieve_webhook_endpoints` (`read`): Retrieves the details of an existing endpoint.
- `update_webhook_endpoints` (`write`): Updates an endpoint.
- `list_webhook_endpoints` (`read`): Returns a list of endpoints.
- `delete_webhook_endpoints` (`write`): Permanently deletes an endpoint.
