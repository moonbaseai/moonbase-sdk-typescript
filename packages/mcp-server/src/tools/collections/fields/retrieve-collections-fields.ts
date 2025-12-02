// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from '@moonbaseai/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'collections.fields',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/collections/{collection_id}/fields/{id}',
};

export const tool: Tool = {
  name: 'retrieve_collections_fields',
  description: 'Retrieves the details of a field in a collection.',
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
    readOnlyHint: true,
  },
};

export const handler = async (client: Moonbase, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  try {
    return asTextContentResult(await client.collections.fields.retrieve(id, body));
  } catch (error) {
    if (error instanceof Moonbase.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
