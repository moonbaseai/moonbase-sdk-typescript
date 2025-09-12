// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@moonbaseai/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'collections.items',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/collections/{collection_id}/items/{id}',
};

export const tool: Tool = {
  name: 'delete_collections_items',
  description: 'Permanently deletes an item.',
  inputSchema: {
    type: 'object',
    properties: {
      collection_id: {
        type: 'string',
      },
      id: {
        type: 'string',
      },
    },
    required: ['collection_id', 'id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Moonbase, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  const response = await client.collections.items.delete(id, body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
