// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@moonbaseai/mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@moonbaseai/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'notes',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/notes/{id}',
};

export const tool: Tool = {
  name: 'retrieve_notes',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieves the details of an existing note.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/note',\n  $defs: {\n    note: {\n      type: 'object',\n      title: 'Note',\n      description: 'The Note object represents a block of text content, often used for meeting notes or summaries.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        body: {\n          $ref: '#/$defs/formatted_text'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Time at which the object was created, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `note` for this object.',\n          enum: [            'note'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Time at which the object was last updated, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        summary: {\n          type: 'string',\n          description: 'A short, system-generated summary of the note\\'s content.'\n        },\n        title: {\n          type: 'string',\n          description: 'An optional title for the note.'\n        }\n      },\n      required: [        'id',\n        'body',\n        'created_at',\n        'type',\n        'updated_at'\n      ]\n    },\n    formatted_text: {\n      type: 'object',\n      title: 'FormattedText',\n      description: 'Structured content that can be rendered in multiple formats, currently supporting Markdown.',\n      properties: {\n        markdown: {\n          type: 'string',\n          description: 'The content formatted as Markdown text.'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Moonbase, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.notes.retrieve(id)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
