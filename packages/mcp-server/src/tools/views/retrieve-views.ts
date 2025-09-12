// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@moonbaseai/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'views',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/views/{id}',
};

export const tool: Tool = {
  name: 'retrieve_views',
  description: 'Retrieves the details of an existing view.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      include: {
        type: 'array',
        description:
          'Specifies which related objects to include in the response. Valid option is `collection`.',
        items: {
          type: 'string',
          enum: ['collection'],
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
  return asTextContentResult(await client.views.retrieve(id, body));
};

export default { metadata, tool, handler };
