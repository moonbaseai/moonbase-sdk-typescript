// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@moonbaseai/mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@moonbaseai/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/files',
};

export const tool: Tool = {
  name: 'upload_files',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpload a file\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/moonbase_file',\n  $defs: {\n    moonbase_file: {\n      type: 'object',\n      title: 'File',\n      description: 'The File object represents a file that has been uploaded to your library.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        associations: {\n          type: 'array',\n          description: 'A list of items this file is associated with.',\n          items: {\n            $ref: '#/$defs/item_pointer'\n          }\n        },\n        created_at: {\n          type: 'string',\n          description: 'Time at which the object was created, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        download_url: {\n          type: 'string',\n          description: 'A temporary, signed URL to download the file content. The URL expires after one hour.'\n        },\n        filename: {\n          type: 'string',\n          description: 'The original filename of the uploaded file.'\n        },\n        name: {\n          type: 'string',\n          description: 'The display name of the file.'\n        },\n        size: {\n          type: 'number',\n          description: 'The size of the file in bytes.'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `file` for this object.',\n          enum: [            'file'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Time at which the object was last updated, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        }\n      },\n      required: [        'id',\n        'associations',\n        'created_at',\n        'download_url',\n        'filename',\n        'name',\n        'size',\n        'type',\n        'updated_at'\n      ]\n    },\n    item_pointer: {\n      type: 'object',\n      title: 'ItemPointer',\n      description: 'A reference to an `Item` within a specific `Collection`, providing the context needed to locate the item.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier of the item.'\n        },\n        collection: {\n          $ref: '#/$defs/collection_pointer'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `item` for this object.',\n          enum: [            'item'\n          ]\n        }\n      },\n      required: [        'id',\n        'collection',\n        'type'\n      ]\n    },\n    collection_pointer: {\n      type: 'object',\n      title: 'CollectionPointer',\n      description: 'A lightweight reference to a `Collection`, containing the minimal information needed to identify it.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier of the collection.'\n        },\n        ref: {\n          type: 'string',\n          description: 'The stable, machine-readable reference identifier of the collection.'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `collection` for this object.',\n          enum: [            'collection'\n          ]\n        }\n      },\n      required: [        'id',\n        'ref',\n        'type'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        description: 'The File object to be uploaded.',
      },
      associations: {
        type: 'array',
        description:
          'Link the File to Moonbase items like a person, organization, deal, task, or an item in a custom collection.',
        items: {
          $ref: '#/$defs/pointer',
        },
      },
      name: {
        type: 'string',
        description: 'The display name of the file.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['file'],
    $defs: {
      pointer: {
        type: 'object',
        title: 'Pointer',
        description: 'A lightweight reference to another resource.',
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier for the referenced object.',
          },
          type: {
            type: 'string',
            description: 'String indicating the type of the referenced object.',
          },
        },
        required: ['id', 'type'],
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Moonbase, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.files.upload(body)));
  } catch (error) {
    if (error instanceof Moonbase.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
