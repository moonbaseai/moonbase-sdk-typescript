// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@moonbaseai/sdk-mcp/filtering';
import { Metadata, asTextContentResult } from '@moonbaseai/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/files/{id}',
};

export const tool: Tool = {
  name: 'retrieve_files',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieves the details of an existing file.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/moonbase_file',\n  $defs: {\n    moonbase_file: {\n      type: 'object',\n      title: 'File',\n      description: 'The File object represents a file that has been uploaded to your library.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Time at which the object was created, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        download_url: {\n          type: 'string',\n          description: 'A temporary, signed URL to download the file content. The URL expires after one hour.'\n        },\n        filename: {\n          type: 'string',\n          description: 'The original filename of the uploaded file.'\n        },\n        name: {\n          type: 'string',\n          description: 'The display name of the file.'\n        },\n        size: {\n          type: 'number',\n          description: 'The size of the file in bytes.'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `file` for this object.',\n          enum: [            'file'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Time at which the object was last updated, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'download_url',\n        'filename',\n        'name',\n        'size',\n        'type',\n        'updated_at'\n      ]\n    }\n  }\n}\n```",
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.files.retrieve(id)));
};

export default { metadata, tool, handler };
