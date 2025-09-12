// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@moonbaseai/sdk-mcp/filtering';
import { Metadata, asTextContentResult } from '@moonbaseai/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'program_templates',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/program_templates',
};

export const tool: Tool = {
  name: 'list_program_templates',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturns a list of your program templates.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'A set of results using cursor-based pagination.',\n  properties: {\n    data: {\n      type: 'array',\n      description: 'An array of ProgramTemplate items.',\n      items: {\n        $ref: '#/$defs/program_template'\n      }\n    },\n    meta: {\n      type: 'object',\n      description: 'Metadata about the pagination, including the cursors pointing to the previous and next pages.',\n      properties: {\n        cursors: {\n          type: 'object',\n          properties: {\n            next: {\n              type: 'string',\n              description: 'Cursor for the next page. This value should be used with the `after` query parameter to fetch the next page of results.'\n            },\n            prev: {\n              type: 'string',\n              description: 'Cursor for the previous page. This value should be used with the `before` query parameter to fetch the previous page of results.'\n            }\n          }\n        }\n      },\n      required: [        'cursors'\n      ]\n    },\n    type: {\n      type: 'string',\n      enum: [        'list'\n      ]\n    }\n  },\n  required: [    'data',\n    'meta',\n    'type'\n  ],\n  $defs: {\n    program_template: {\n      type: 'object',\n      title: 'ProgramTemplate',\n      description: 'The ProgramTemplate object defines the content of a message sent by a `Program`, including support for Liquid templating.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        body: {\n          $ref: '#/$defs/formatted_text'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Time at which the object was created, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        subject: {\n          type: 'string',\n          description: 'The subject line of the email, which can include Liquid variables.'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `program_template` for this object.',\n          enum: [            'program_template'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Time at which the object was last updated, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        program: {\n          $ref: '#/$defs/program'\n        }\n      },\n      required: [        'id',\n        'body',\n        'created_at',\n        'subject',\n        'type',\n        'updated_at'\n      ]\n    },\n    formatted_text: {\n      type: 'object',\n      title: 'FormattedText',\n      description: 'Structured content that can be rendered in multiple formats, currently supporting Markdown.',\n      properties: {\n        markdown: {\n          type: 'string',\n          description: 'The content formatted as Markdown text.'\n        }\n      }\n    },\n    program: {\n      type: 'object',\n      title: 'Program',\n      description: 'The Program object represents an email campaign. It defines the sending behavior and tracks engagement metrics.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Time at which the object was created, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        status: {\n          type: 'string',\n          description: 'The current status of the program. Can be `draft`, `published`, `paused`, or `archived`.',\n          enum: [            'draft',\n            'published',\n            'paused',\n            'archived'\n          ]\n        },\n        track_clicks: {\n          type: 'boolean',\n          description: '`true` if link clicks are tracked for this program.'\n        },\n        track_opens: {\n          type: 'boolean',\n          description: '`true` if email opens are tracked for this program.'\n        },\n        trigger: {\n          type: 'string',\n          description: 'The sending trigger for the program. Can be `api` for transactional sends or `broadcast` for scheduled sends.',\n          enum: [            'api',\n            'broadcast'\n          ]\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `program` for this object.',\n          enum: [            'program'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Time at which the object was last updated, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        activity_metrics: {\n          type: 'object',\n          title: 'ProgramActivityMetrics',\n          description: 'A `ProgramActivityMetrics` object summarizing engagement for this program.\\n\\n**Note:** Only present when requested using the `include` query parameter.\\n',\n          properties: {\n            bounced: {\n              type: 'integer',\n              description: 'The number of emails that could not be delivered.'\n            },\n            clicked: {\n              type: 'integer',\n              description: 'The number of recipients who clicked at least one link.'\n            },\n            complained: {\n              type: 'integer',\n              description: 'The number of recipients who marked the email as spam.'\n            },\n            failed: {\n              type: 'integer',\n              description: 'The number of emails that failed to send due to a technical issue.'\n            },\n            opened: {\n              type: 'integer',\n              description: 'The number of recipients who opened the email.'\n            },\n            sent: {\n              type: 'integer',\n              description: 'The total number of emails successfully sent.'\n            },\n            shielded: {\n              type: 'integer',\n              description: 'The number of emails blocked by delivery protection rules.'\n            },\n            unsubscribed: {\n              type: 'integer',\n              description: 'The number of recipients who unsubscribed.'\n            }\n          },\n          required: [            'bounced',\n            'clicked',\n            'complained',\n            'failed',\n            'opened',\n            'sent',\n            'shielded',\n            'unsubscribed'\n          ]\n        },\n        display_name: {\n          type: 'string',\n          description: 'The user-facing name of the program.'\n        },\n        program_template: {\n          $ref: '#/$defs/program_template'\n        },\n        scheduled_at: {\n          type: 'string',\n          description: 'For `broadcast` programs, the time the program is scheduled to send, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'status',\n        'track_clicks',\n        'track_opens',\n        'trigger',\n        'type',\n        'updated_at'\n      ]\n    }\n  }\n}\n```",
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
      include: {
        type: 'array',
        description: 'Specifies which related objects to include in the response. Valid option is `program`.',
        items: {
          type: 'string',
          enum: ['program'],
        },
      },
      limit: {
        type: 'integer',
        description:
          'Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Moonbase, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  const response = await client.programTemplates.list(body).asResponse();
  return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
};

export default { metadata, tool, handler };
