// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from '@moonbaseai/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'collections',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/collections/{id}',
};

export const tool: Tool = {
  name: 'retrieve_collections',
  description: 'Retrieves the details of an existing collection.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      include: {
        type: 'array',
        description: 'Specifies which related objects to include in the response.',
        items: {
          type: 'string',
          enum: ['views'],
        },
      },
    },
    required: ['id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Moonbase, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  try {
    return asTextContentResult(await client.collections.retrieve(id, body));
  } catch (error) {
    if (error instanceof Moonbase.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
