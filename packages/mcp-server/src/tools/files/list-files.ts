// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@moonbaseai/mcp/filtering';
import { Metadata, asTextContentResult } from '@moonbaseai/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/files',
};

export const tool: Tool = {
  name: 'list_files',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturns a list of files that you have uploaded.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'A set of results using cursor-based pagination.',\n  properties: {\n    data: {\n      type: 'array',\n      description: 'An array of File items.',\n      items: {\n        $ref: '#/$defs/moonbase_file'\n      }\n    },\n    meta: {\n      type: 'object',\n      description: 'Metadata about the pagination, including the cursors pointing to the previous and next pages.',\n      properties: {\n        cursors: {\n          type: 'object',\n          properties: {\n            next: {\n              type: 'string',\n              description: 'Cursor for the next page. This value should be used with the `after` query parameter to fetch the next page of results.'\n            },\n            prev: {\n              type: 'string',\n              description: 'Cursor for the previous page. This value should be used with the `before` query parameter to fetch the previous page of results.'\n            }\n          }\n        }\n      },\n      required: [        'cursors'\n      ]\n    },\n    type: {\n      type: 'string',\n      enum: [        'list'\n      ]\n    }\n  },\n  required: [    'data',\n    'meta',\n    'type'\n  ],\n  $defs: {\n    moonbase_file: {\n      type: 'object',\n      title: 'File',\n      description: 'The File object represents a file that has been uploaded to your library.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        associations: {\n          type: 'array',\n          description: 'A list of items this file is associated with.',\n          items: {\n            $ref: '#/$defs/item_pointer'\n          }\n        },\n        created_at: {\n          type: 'string',\n          description: 'Time at which the object was created, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        download_url: {\n          type: 'string',\n          description: 'A temporary, signed URL to download the file content. The URL expires after one hour.'\n        },\n        filename: {\n          type: 'string',\n          description: 'The original filename of the uploaded file.'\n        },\n        name: {\n          type: 'string',\n          description: 'The display name of the file.'\n        },\n        size: {\n          type: 'number',\n          description: 'The size of the file in bytes.'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `file` for this object.',\n          enum: [            'file'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Time at which the object was last updated, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        }\n      },\n      required: [        'id',\n        'associations',\n        'created_at',\n        'download_url',\n        'filename',\n        'name',\n        'size',\n        'type',\n        'updated_at'\n      ]\n    },\n    item_pointer: {\n      type: 'object',\n      title: 'ItemPointer',\n      description: 'A reference to an `Item` within a specific `Collection`, providing the context needed to locate the item.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier of the item.'\n        },\n        collection: {\n          $ref: '#/$defs/collection_pointer'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `item` for this object.',\n          enum: [            'item'\n          ]\n        }\n      },\n      required: [        'id',\n        'collection',\n        'type'\n      ]\n    },\n    collection_pointer: {\n      type: 'object',\n      title: 'CollectionPointer',\n      description: 'A lightweight reference to a `Collection`, containing the minimal information needed to identify it.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier of the collection.'\n        },\n        ref: {\n          type: 'string',\n          description: 'The stable, machine-readable reference identifier of the collection.'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `collection` for this object.',\n          enum: [            'collection'\n          ]\n        }\n      },\n      required: [        'id',\n        'ref',\n        'type'\n      ]\n    }\n  }\n}\n```",
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
  const response = await client.files.list(body).asResponse();
  return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
};

export default { metadata, tool, handler };
