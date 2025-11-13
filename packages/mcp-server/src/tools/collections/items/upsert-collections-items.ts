// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@moonbaseai/mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@moonbaseai/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'collections.items',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/collections/{collection_id}/items/upsert',
};

export const tool: Tool = {
  name: 'upsert_collections_items',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nFind and update an existing item, or create a new one.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/item',\n  $defs: {\n    item: {\n      type: 'object',\n      title: 'Item',\n      description: 'An Item represents a single record or row within a Collection. It holds a set of `values` corresponding to the Collection\\'s `fields`.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `item` for this object.',\n          enum: [            'item'\n          ]\n        },\n        values: {\n          type: 'object',\n          description: 'A hash where keys are the `ref` of a `Field` and values are the data stored for that field.',\n          additionalProperties: true\n        }\n      },\n      required: [        'id',\n        'type',\n        'values'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      collection_id: {
        type: 'string',
      },
      identifiers: {
        type: 'object',
        description:
          'A hash where keys are the `ref` of a `Field` and values are used to identify the item to update. When multiple identifiers are provided, the update will find items that match any of the identifiers.',
        additionalProperties: true,
      },
      values: {
        type: 'object',
        description: 'A hash where keys are the `ref` of a `Field` and values are the data to be set.',
        additionalProperties: true,
      },
      'update-many-strategy': {
        type: 'string',
        enum: ['replace', 'preserve', 'merge'],
      },
      'update-one-strategy': {
        type: 'string',
        enum: ['replace', 'preserve'],
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['collection_id', 'identifiers', 'values'],
  },
  annotations: {},
};

export const handler = async (client: Moonbase, args: Record<string, unknown> | undefined) => {
  const { collection_id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.collections.items.upsert(collection_id, body)),
    );
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
