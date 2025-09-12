// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@moonbaseai/mcp/filtering';
import { Metadata, asTextContentResult } from '@moonbaseai/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'inboxes',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/inboxes',
};

export const tool: Tool = {
  name: 'list_inboxes',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturns a list of shared inboxes.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'A set of results using cursor-based pagination.',\n  properties: {\n    data: {\n      type: 'array',\n      description: 'An array of Inbox items.',\n      items: {\n        $ref: '#/$defs/inbox'\n      }\n    },\n    meta: {\n      type: 'object',\n      description: 'Metadata about the pagination, including the cursors pointing to the previous and next pages.',\n      properties: {\n        cursors: {\n          type: 'object',\n          properties: {\n            next: {\n              type: 'string',\n              description: 'Cursor for the next page. This value should be used with the `after` query parameter to fetch the next page of results.'\n            },\n            prev: {\n              type: 'string',\n              description: 'Cursor for the previous page. This value should be used with the `before` query parameter to fetch the previous page of results.'\n            }\n          }\n        }\n      },\n      required: [        'cursors'\n      ]\n    },\n    type: {\n      type: 'string',\n      enum: [        'list'\n      ]\n    }\n  },\n  required: [    'data',\n    'meta',\n    'type'\n  ],\n  $defs: {\n    inbox: {\n      type: 'object',\n      title: 'Inbox',\n      description: 'The Inbox object represents a shared inbox for receiving and sending messages.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Time at which the object was created, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        name: {\n          type: 'string',\n          description: 'The display name of the inbox.'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `inbox` for this object.',\n          enum: [            'inbox'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Time at which the object was last updated, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        tagset: {\n          $ref: '#/$defs/tagset'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'name',\n        'type',\n        'updated_at'\n      ]\n    },\n    tagset: {\n      type: 'object',\n      title: 'Tagset',\n      description: 'A Tagset is a collection of `Tag` objects that can be applied within a specific `Inbox`.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Time at which the object was created, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the tagset.'\n        },\n        tags: {\n          type: 'array',\n          description: 'A list of `Tag` objects belonging to this tagset.',\n          items: {\n            type: 'object',\n            title: 'Tag',\n            description: 'A Tag is a label that can be applied to `Conversation` objects for organization and filtering.',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'Unique identifier for the object.'\n              },\n              name: {\n                type: 'string',\n                description: 'The name of the tag.'\n              },\n              type: {\n                type: 'string',\n                description: 'String representing the object’s type. Always `tag` for this object.',\n                enum: [                  'tag'\n                ]\n              }\n            },\n            required: [              'id',\n              'name',\n              'type'\n            ]\n          }\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `tagset` for this object.',\n          enum: [            'tagset'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Time at which the object was last updated, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        description: {\n          type: 'string',\n          description: 'An optional description of the tagset\\'s purpose.'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'name',\n        'tags',\n        'type',\n        'updated_at'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      after: {
        type: 'string',
        description:
          "When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.",
      },
      before: {
        type: 'string',
        description:
          "When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.",
      },
      'include[]': {
        type: 'string',
        enum: ['tagset'],
      },
      limit: {
        type: 'integer',
        description:
          'Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Moonbase, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  const response = await client.inboxes.list(body).asResponse();
  return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
};

export default { metadata, tool, handler };
