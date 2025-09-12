// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@moonbaseai/sdk-mcp/filtering';
import { Metadata, asTextContentResult } from '@moonbaseai/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'tagsets',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/tagsets/{id}',
};

export const tool: Tool = {
  name: 'retrieve_tagsets',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieves the details of an existing tagset.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/tagset',\n  $defs: {\n    tagset: {\n      type: 'object',\n      title: 'Tagset',\n      description: 'A Tagset is a collection of `Tag` objects that can be applied within a specific `Inbox`.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Time at which the object was created, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the tagset.'\n        },\n        tags: {\n          type: 'array',\n          description: 'A list of `Tag` objects belonging to this tagset.',\n          items: {\n            type: 'object',\n            title: 'Tag',\n            description: 'A Tag is a label that can be applied to `Conversation` objects for organization and filtering.',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'Unique identifier for the object.'\n              },\n              name: {\n                type: 'string',\n                description: 'The name of the tag.'\n              },\n              type: {\n                type: 'string',\n                description: 'String representing the object’s type. Always `tag` for this object.',\n                enum: [                  'tag'\n                ]\n              }\n            },\n            required: [              'id',\n              'name',\n              'type'\n            ]\n          }\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `tagset` for this object.',\n          enum: [            'tagset'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Time at which the object was last updated, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        description: {\n          type: 'string',\n          description: 'An optional description of the tagset\\'s purpose.'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'name',\n        'tags',\n        'type',\n        'updated_at'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
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
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Moonbase, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.tagsets.retrieve(id)));
};

export default { metadata, tool, handler };
