// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@moonbaseai/mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@moonbaseai/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'webhook_endpoints',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/webhook_endpoints/{id}',
};

export const tool: Tool = {
  name: 'update_webhook_endpoints',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdates an endpoint.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/endpoint',\n  $defs: {\n    endpoint: {\n      type: 'object',\n      title: 'WebhookEndpoint',\n      description: 'A Webhook Endpoint is an HTTP endpoint that receives webhooks. You can configure which events are sent to each endpoint by creating `WebhookSubscription` objects.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Time at which the object was created, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        status: {\n          type: 'string',\n          description: 'Indicates whether the endpoint is enabled.',\n          enum: [            'disabled',\n            'enabled'\n          ]\n        },\n        subscriptions: {\n          type: 'array',\n          description: 'An array of `WebhookSubscription` objects representing the events this endpoint will receive.',\n          items: {\n            $ref: '#/$defs/subscription'\n          }\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `webhook_endpoint` for this object.',\n          enum: [            'webhook_endpoint'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Time at which the object was last updated, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        url: {\n          type: 'string',\n          description: 'The HTTPS URL where webhook events will be sent.'\n        },\n        secret: {\n          type: 'string',\n          description: 'The signing secret used to verify webhook authenticity. This value is only shown when creating the endpoint and starts with `whsec_`.'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'status',\n        'subscriptions',\n        'type',\n        'updated_at',\n        'url'\n      ]\n    },\n    subscription: {\n      type: 'object',\n      title: 'WebhookSubscription',\n      description: 'A Webhook Subscription defines which event type should be sent to a specific webhook endpoint.',\n      properties: {\n        event_type: {\n          type: 'string',\n          description: 'The type of event that will trigger notifications to the endpoint (e.g., `activity/item_created`).',\n          enum: [            'activity/call_occurred',\n            'activity/form_submitted',\n            'activity/inbox_message_sent',\n            'activity/item_created',\n            'activity/item_mentioned',\n            'activity/item_merged',\n            'activity/meeting_held',\n            'activity/meeting_scheduled',\n            'activity/note_created',\n            'activity/program_message_bounced',\n            'activity/program_message_clicked',\n            'activity/program_message_complained',\n            'activity/program_message_failed',\n            'activity/program_message_opened',\n            'activity/program_message_sent',\n            'activity/program_message_shielded',\n            'activity/program_message_unsubscribed'\n          ]\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `webhook_subscription` for this object.',\n          enum: [            'webhook_subscription'\n          ]\n        }\n      },\n      required: [        'event_type',\n        'type'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      status: {
        type: 'string',
        description: 'Indicates whether the endpoint is enabled.',
        enum: ['disabled', 'enabled'],
      },
      subscriptions: {
        type: 'array',
        description: 'An array of event types that this endpoint should receive notifications for.',
        items: {
          type: 'object',
          title: 'WebhookSubscriptionUpdateParams',
          description: 'Parameters for updating a webhook subscription.',
          properties: {
            event_type: {
              type: 'string',
              description:
                'The type of event that will trigger notifications to the endpoint (e.g., `activity/item_created`).',
              enum: [
                'activity/call_occurred',
                'activity/form_submitted',
                'activity/inbox_message_sent',
                'activity/item_created',
                'activity/item_mentioned',
                'activity/item_merged',
                'activity/meeting_held',
                'activity/meeting_scheduled',
                'activity/note_created',
                'activity/program_message_bounced',
                'activity/program_message_clicked',
                'activity/program_message_complained',
                'activity/program_message_failed',
                'activity/program_message_opened',
                'activity/program_message_sent',
                'activity/program_message_shielded',
                'activity/program_message_unsubscribed',
              ],
            },
            id: {
              type: 'string',
              description: 'Unique identifier for the object.',
            },
          },
          required: ['event_type'],
        },
      },
      url: {
        type: 'string',
        description: 'The HTTPS URL where webhook events will be sent.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id'],
  },
  annotations: {},
};

export const handler = async (client: Moonbase, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.webhookEndpoints.update(id, body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
