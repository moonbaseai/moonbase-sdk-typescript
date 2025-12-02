// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@moonbaseai/mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@moonbaseai/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'program_messages',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/program_messages',
};

export const tool: Tool = {
  name: 'send_program_messages',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSends a message using a program template.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/program_message',\n  $defs: {\n    program_message: {\n      type: 'object',\n      title: 'ProgramMessage',\n      description: 'Represents a single message sent as part of a `Program`.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Time at which the message was created and enqueued for sending, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        program_template: {\n          $ref: '#/$defs/program_template'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `program_message` for this object.',\n          enum: [            'program_message'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Time at which the object was last updated, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'program_template',\n        'type',\n        'updated_at'\n      ]\n    },\n    program_template: {\n      type: 'object',\n      title: 'ProgramTemplate',\n      description: 'The ProgramTemplate object defines the content of a message sent by a `Program`, including support for Liquid templating.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        body: {\n          $ref: '#/$defs/formatted_text'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Time at which the object was created, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        subject: {\n          type: 'string',\n          description: 'The subject line of the email, which can include Liquid variables.'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `program_template` for this object.',\n          enum: [            'program_template'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Time at which the object was last updated, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        program: {\n          $ref: '#/$defs/program'\n        }\n      },\n      required: [        'id',\n        'body',\n        'created_at',\n        'subject',\n        'type',\n        'updated_at'\n      ]\n    },\n    formatted_text: {\n      type: 'object',\n      title: 'FormattedText',\n      description: 'Structured content that can be rendered in multiple formats, currently supporting Markdown.',\n      properties: {\n        markdown: {\n          type: 'string',\n          description: 'The content formatted as Markdown text.'\n        }\n      }\n    },\n    program: {\n      type: 'object',\n      title: 'Program',\n      description: 'The Program object represents an email campaign. It defines the sending behavior and tracks engagement metrics.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Time at which the object was created, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        status: {\n          type: 'string',\n          description: 'The current status of the program. Can be `draft`, `published`, `paused`, or `archived`.',\n          enum: [            'draft',\n            'published',\n            'paused',\n            'archived'\n          ]\n        },\n        track_clicks: {\n          type: 'boolean',\n          description: '`true` if link clicks are tracked for this program.'\n        },\n        track_opens: {\n          type: 'boolean',\n          description: '`true` if email opens are tracked for this program.'\n        },\n        trigger: {\n          type: 'string',\n          description: 'The sending trigger for the program. Can be `api` for transactional sends or `broadcast` for scheduled sends.',\n          enum: [            'api',\n            'broadcast'\n          ]\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `program` for this object.',\n          enum: [            'program'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Time at which the object was last updated, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        activity_metrics: {\n          type: 'object',\n          title: 'ProgramActivityMetrics',\n          description: 'A `ProgramActivityMetrics` object summarizing engagement for this program.\\n\\n**Note:** Only present when requested using the `include` query parameter.\\n',\n          properties: {\n            bounced: {\n              type: 'integer',\n              description: 'The number of emails that could not be delivered.'\n            },\n            clicked: {\n              type: 'integer',\n              description: 'The number of recipients who clicked at least one link.'\n            },\n            complained: {\n              type: 'integer',\n              description: 'The number of recipients who marked the email as spam.'\n            },\n            failed: {\n              type: 'integer',\n              description: 'The number of emails that failed to send due to a technical issue.'\n            },\n            opened: {\n              type: 'integer',\n              description: 'The number of recipients who opened the email.'\n            },\n            sent: {\n              type: 'integer',\n              description: 'The total number of emails successfully sent.'\n            },\n            shielded: {\n              type: 'integer',\n              description: 'The number of emails blocked by delivery protection rules.'\n            },\n            unsubscribed: {\n              type: 'integer',\n              description: 'The number of recipients who unsubscribed.'\n            }\n          },\n          required: [            'bounced',\n            'clicked',\n            'complained',\n            'failed',\n            'opened',\n            'sent',\n            'shielded',\n            'unsubscribed'\n          ]\n        },\n        display_name: {\n          type: 'string',\n          description: 'The user-facing name of the program.'\n        },\n        program_template: {\n          $ref: '#/$defs/program_template'\n        },\n        scheduled_at: {\n          type: 'string',\n          description: 'For `broadcast` programs, the time the program is scheduled to send, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'status',\n        'track_clicks',\n        'track_opens',\n        'trigger',\n        'type',\n        'updated_at'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      person: {
        type: 'object',
        description: 'The person to send the message to.',
        properties: {
          email: {
            type: 'string',
          },
        },
        required: ['email'],
      },
      program_template_id: {
        type: 'string',
        description: 'The ID of the `ProgramTemplate` to use for sending the message.',
      },
      custom_variables: {
        type: 'object',
        description: 'Any custom Liquid variables to be interpolated into the message template.',
        additionalProperties: true,
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['person', 'program_template_id'],
  },
  annotations: {},
};

export const handler = async (client: Moonbase, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.programMessages.send(body)));
  } catch (error) {
    if (error instanceof Moonbase.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
