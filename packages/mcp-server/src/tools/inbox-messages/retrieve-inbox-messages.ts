// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@moonbaseai/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'inbox_messages',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/inbox_messages/{id}',
};

export const tool: Tool = {
  name: 'retrieve_inbox_messages',
  description: 'Retrieves the details of an existing message.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      include: {
        type: 'array',
        description:
          'Specifies which related objects to include in the response. Valid options are `addresses`, `attachments`, and `conversation`.',
        items: {
          type: 'string',
          enum: ['addresses', 'attachments', 'conversation'],
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
  return asTextContentResult(await client.inboxMessages.retrieve(id, body));
};

export default { metadata, tool, handler };
