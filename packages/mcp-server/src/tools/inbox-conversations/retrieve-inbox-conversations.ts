// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@moonbaseai/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'inbox_conversations',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/inbox_conversations/{id}',
};

export const tool: Tool = {
  name: 'retrieve_inbox_conversations',
  description: 'Retrieves the details of an existing conversation.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      include: {
        type: 'array',
        description:
          'Specifies which related objects to include in the response. Valid options are `inbox`, `messages`, and `messages.addresses`.',
        items: {
          type: 'string',
          enum: ['inbox', 'messages', 'messages.addresses'],
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
  return asTextContentResult(await client.inboxConversations.retrieve(id, body));
};

export default { metadata, tool, handler };
