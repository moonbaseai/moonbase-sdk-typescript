// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@moonbaseai/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'webhook_endpoints',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/webhook_endpoints/{id}',
};

export const tool: Tool = {
  name: 'delete_webhook_endpoints',
  description: 'Permanently deletes an endpoint.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
    },
    required: ['id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Moonbase, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  const response = await client.webhookEndpoints.delete(id).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
