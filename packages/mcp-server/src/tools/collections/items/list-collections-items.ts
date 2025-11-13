// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@moonbaseai/mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@moonbaseai/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'collections.items',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/collections/{collection_id}/items',
};

export const tool: Tool = {
  name: 'list_collections_items',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturns a list of items that are part of the collection.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'A set of results using cursor-based pagination.',\n  properties: {\n    data: {\n      type: 'array',\n      description: 'An array of Item items.',\n      items: {\n        $ref: '#/$defs/item'\n      }\n    },\n    meta: {\n      type: 'object',\n      description: 'Metadata about the pagination, including the cursors pointing to the previous and next pages.',\n      properties: {\n        cursors: {\n          type: 'object',\n          properties: {\n            next: {\n              type: 'string',\n              description: 'Cursor for the next page. This value should be used with the `after` query parameter to fetch the next page of results.'\n            },\n            prev: {\n              type: 'string',\n              description: 'Cursor for the previous page. This value should be used with the `before` query parameter to fetch the previous page of results.'\n            }\n          }\n        }\n      },\n      required: [        'cursors'\n      ]\n    },\n    type: {\n      type: 'string',\n      enum: [        'list'\n      ]\n    }\n  },\n  required: [    'data',\n    'meta',\n    'type'\n  ],\n  $defs: {\n    item: {\n      type: 'object',\n      title: 'Item',\n      description: 'An Item represents a single record or row within a Collection. It holds a set of `values` corresponding to the Collection\\'s `fields`.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `item` for this object.',\n          enum: [            'item'\n          ]\n        },\n        values: {\n          type: 'object',\n          description: 'A hash where keys are the `ref` of a `Field` and values are the data stored for that field.',\n          additionalProperties: true\n        }\n      },\n      required: [        'id',\n        'type',\n        'values'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      collection_id: {
        type: 'string',
      },
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
    required: ['collection_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Moonbase, args: Record<string, unknown> | undefined) => {
  const { collection_id, jq_filter, ...body } = args as any;
  const response = await client.collections.items.list(collection_id, body).asResponse();
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
