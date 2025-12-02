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
  httpPath: '/collections/{collection_id}/items/{id}',
};

export const tool: Tool = {
  name: 'retrieve_collections_items',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieves the details of an existing item.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/item',\n  $defs: {\n    item: {\n      type: 'object',\n      title: 'Item',\n      description: 'An Item represents a single record or row within a Collection. It holds a set of `values` corresponding to the Collection\\'s `fields`.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `item` for this object.',\n          enum: [            'item'\n          ]\n        },\n        values: {\n          type: 'object',\n          description: 'A hash where keys are the `ref` of a `Field` and values are the data stored for that field.',\n          additionalProperties: true\n        }\n      },\n      required: [        'id',\n        'type',\n        'values'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      collection_id: {
        type: 'string',
      },
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
    required: ['collection_id', 'id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Moonbase, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.collections.items.retrieve(id, body)),
    );
  } catch (error) {
    if (error instanceof Moonbase.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
