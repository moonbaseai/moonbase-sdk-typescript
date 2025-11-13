// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@moonbaseai/mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@moonbaseai/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'calls',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/calls/upsert',
};

export const tool: Tool = {
  name: 'upsert_calls',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nFind and update an existing phone call, or create a new one.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/call',\n  $defs: {\n    call: {\n      type: 'object',\n      title: 'Call',\n      description: 'The Call object represents a phone call that has been logged in the system. It contains details about the participants, timing, and outcome of the call.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Time at which the object was created, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        direction: {\n          type: 'string',\n          description: 'The direction of the call, either `incoming` or `outgoing`.',\n          enum: [            'incoming',\n            'outgoing'\n          ]\n        },\n        participants: {\n          type: 'array',\n          description: 'The participants involved in the call.',\n          items: {\n            type: 'object',\n            title: 'CallParticipant',\n            description: 'Represents a participant in a call.',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'Unique identifier for the object.'\n              },\n              phone: {\n                type: 'string',\n                description: 'The E.164 formatted phone number of the participant.'\n              },\n              role: {\n                type: 'string',\n                description: 'The role of the participant in the call. Can be `caller`, `callee`, or `other`.',\n                enum: [                  'caller',\n                  'callee',\n                  'other'\n                ]\n              },\n              type: {\n                type: 'string',\n                description: 'String representing the object’s type. Always `call_participant` for this object.',\n                enum: [                  'call_participant'\n                ]\n              },\n              organization: {\n                $ref: '#/$defs/pointer'\n              },\n              person: {\n                $ref: '#/$defs/pointer'\n              }\n            },\n            required: [              'id',\n              'phone',\n              'role',\n              'type'\n            ]\n          }\n        },\n        provider: {\n          type: 'string',\n          description: 'The name of the phone provider that handled the call.'\n        },\n        provider_id: {\n          type: 'string',\n          description: 'The unique identifier for the call from the provider\\'s system.'\n        },\n        provider_status: {\n          type: 'string',\n          description: 'The current status of the call.'\n        },\n        start_at: {\n          type: 'string',\n          description: 'The time the call started, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `call` for this object.',\n          enum: [            'call'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Time at which the object was last updated, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        answered_at: {\n          type: 'string',\n          description: 'The time the call was answered, if available, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        end_at: {\n          type: 'string',\n          description: 'The time the call ended, if available, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        provider_metadata: {\n          type: 'object',\n          description: 'A hash of additional metadata from the provider.',\n          additionalProperties: true\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'direction',\n        'participants',\n        'provider',\n        'provider_id',\n        'provider_status',\n        'start_at',\n        'type',\n        'updated_at'\n      ]\n    },\n    pointer: {\n      type: 'object',\n      title: 'Pointer',\n      description: 'A lightweight reference to another resource.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the referenced object.'\n        },\n        type: {\n          type: 'string',\n          description: 'String indicating the type of the referenced object.'\n        }\n      },\n      required: [        'id',\n        'type'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      direction: {
        type: 'string',
        description: 'The direction of the call, either `incoming` or `outgoing`.',
        enum: ['incoming', 'outgoing'],
      },
      participants: {
        type: 'array',
        description: 'An array of participants involved in the call.',
        items: {
          type: 'object',
          title: 'CallParticipantCreateParams',
          description: 'Parameters for creating a `Participant` object.',
          properties: {
            phone: {
              type: 'string',
              description: 'The E.164 formatted phone number of the participant.',
            },
            role: {
              type: 'string',
              description: 'The role of the participant in the call. Can be `caller`, `callee`, or `other`.',
              enum: ['caller', 'callee', 'other'],
            },
          },
          required: ['phone', 'role'],
        },
      },
      provider: {
        type: 'string',
        description: 'The name of the phone provider that handled the call (e.g., `openphone`).',
      },
      provider_id: {
        type: 'string',
        description: "The unique identifier for the call from the provider's system.",
      },
      provider_status: {
        type: 'string',
        description: 'The status of the call.',
      },
      start_at: {
        type: 'string',
        description: 'The time the call started, as an ISO 8601 timestamp in UTC.',
        format: 'date-time',
      },
      answered_at: {
        type: 'string',
        description: 'The time the call was answered, as an ISO 8601 timestamp in UTC.',
        format: 'date-time',
      },
      end_at: {
        type: 'string',
        description: 'The time the call ended, as an ISO 8601 timestamp in UTC.',
        format: 'date-time',
      },
      provider_metadata: {
        type: 'object',
        description: 'A hash of additional metadata from the provider.',
        additionalProperties: true,
      },
      recordings: {
        type: 'array',
        description: 'Any recordings associated with the call.',
        items: {
          type: 'object',
          title: 'CallRecordingCreateParams',
          description: 'Parameters for creating a `CallRecording` object.',
          properties: {
            content_type: {
              type: 'string',
              description:
                'The content type of the recording. Note that only `audio/mpeg` is supported at this time.',
            },
            provider_id: {
              type: 'string',
              description: "The unique identifier for the recording from the provider's system.",
            },
            url: {
              type: 'string',
              description: 'The URL pointing to the recording.',
            },
          },
          required: ['content_type', 'provider_id', 'url'],
        },
      },
      transcript: {
        type: 'object',
        title: 'CallTranscriptCreateParams',
        description: 'A transcript of the call.',
        properties: {
          cues: {
            type: 'array',
            description: 'A list of cues that identify the text spoken in specific time slices of the call.',
            items: {
              type: 'object',
              title: 'CallTranscriptCueCreateParams',
              description:
                'Parameters for creating a `CallTranscriptCue` object to capture the text spoken in a specific time slice.',
              properties: {
                from: {
                  type: 'number',
                  description:
                    'The start time of the slice, in fractional seconds from the start of the call.',
                },
                speaker: {
                  type: 'string',
                  description: 'The E.164 formatted phone number of the speaker.',
                },
                text: {
                  type: 'string',
                  description: 'The text spoken during the slice.',
                },
                to: {
                  type: 'number',
                  description: 'The end time of the slice, in fractional seconds from the start of the call.',
                },
              },
              required: ['from', 'speaker', 'text', 'to'],
            },
          },
        },
        required: ['cues'],
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['direction', 'participants', 'provider', 'provider_id', 'provider_status', 'start_at'],
  },
  annotations: {},
};

export const handler = async (client: Moonbase, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.calls.upsert(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
