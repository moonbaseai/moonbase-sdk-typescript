// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from '@moonbaseai/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'inbox_messages',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/inbox_messages',
};

export const tool: Tool = {
  name: 'list_inbox_messages',
  description: 'Returns a list of messages.',
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
      filter: {
        type: 'object',
        properties: {
          conversation_id: {
            type: 'object',
            properties: {
              eq: {
                type: 'string',
              },
            },
          },
          inbox_id: {
            type: 'object',
            properties: {
              eq: {
                type: 'string',
              },
            },
          },
        },
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
      limit: {
        type: 'integer',
        description:
          'Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Moonbase, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.inboxMessages.list(body).asResponse();
  try {
    return asTextContentResult(await response.json());
  } catch (error) {
    if (error instanceof Moonbase.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
