// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@moonbaseai/mcp/filtering';
import { Metadata, asTextContentResult } from '@moonbaseai/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Moonbase from '@moonbaseai/sdk';

export const metadata: Metadata = {
  resource: 'meetings',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/meetings',
};

export const tool: Tool = {
  name: 'list_meetings',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturns a list of meetings.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'A set of results using cursor-based pagination.',\n  properties: {\n    data: {\n      type: 'array',\n      description: 'An array of Meeting items.',\n      items: {\n        $ref: '#/$defs/meeting'\n      }\n    },\n    meta: {\n      type: 'object',\n      description: 'Metadata about the pagination, including the cursors pointing to the previous and next pages.',\n      properties: {\n        cursors: {\n          type: 'object',\n          properties: {\n            next: {\n              type: 'string',\n              description: 'Cursor for the next page. This value should be used with the `after` query parameter to fetch the next page of results.'\n            },\n            prev: {\n              type: 'string',\n              description: 'Cursor for the previous page. This value should be used with the `before` query parameter to fetch the previous page of results.'\n            }\n          }\n        }\n      },\n      required: [        'cursors'\n      ]\n    },\n    type: {\n      type: 'string',\n      enum: [        'list'\n      ]\n    }\n  },\n  required: [    'data',\n    'meta',\n    'type'\n  ],\n  $defs: {\n    meeting: {\n      type: 'object',\n      title: 'Meeting',\n      description: 'The Meeting object represents a calendar event. It includes details about the participants, timing, and associated content like summaries and recordings.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Time at which the object was created, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        end_at: {\n          type: 'string',\n          description: 'The end time of the meeting, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        i_cal_uid: {\n          type: 'string',\n          description: 'The globally unique iCalendar UID for the meeting event.'\n        },\n        provider_id: {\n          type: 'string',\n          description: 'The unique identifier for the meeting from the external calendar provider (e.g., Google Calendar).'\n        },\n        start_at: {\n          type: 'string',\n          description: 'The start time of the meeting, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        time_zone: {\n          type: 'string',\n          description: 'The IANA time zone in which the meeting is scheduled (e.g., `America/Los_Angeles`).'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `meeting` for this object.',\n          enum: [            'meeting'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Time at which the object was last updated, as an ISO 8601 timestamp in UTC.',\n          format: 'date-time'\n        },\n        attendees: {\n          type: 'array',\n          description: 'A list of `Attendee` objects for the meeting.\\n\\n**Note:** Only present when requested using the `include` query parameter.\\n',\n          items: {\n            $ref: '#/$defs/attendee'\n          }\n        },\n        description: {\n          type: 'string',\n          description: 'A detailed description or agenda for the meeting.'\n        },\n        duration: {\n          type: 'number',\n          description: 'The duration of the meeting in seconds.'\n        },\n        location: {\n          type: 'string',\n          description: 'The physical or virtual location of the meeting.'\n        },\n        organizer: {\n          $ref: '#/$defs/organizer'\n        },\n        provider_uri: {\n          type: 'string',\n          description: 'A URL to access the meeting in the external provider\\'s system.'\n        },\n        recording_url: {\n          type: 'string',\n          description: 'A temporary, signed URL to download the meeting recording. The URL expires after one hour.'\n        },\n        summary_ante: {\n          type: 'string',\n          description: 'A summary or notes generated before the meeting.'\n        },\n        summary_post: {\n          type: 'string',\n          description: 'A summary or notes generated after the meeting.'\n        },\n        title: {\n          type: 'string',\n          description: 'The title or subject of the meeting.'\n        },\n        transcript_url: {\n          type: 'string',\n          description: 'A temporary, signed URL to download the meeting transcript. The URL expires after one hour.'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'end_at',\n        'i_cal_uid',\n        'provider_id',\n        'start_at',\n        'time_zone',\n        'type',\n        'updated_at'\n      ]\n    },\n    attendee: {\n      type: 'object',\n      title: 'MeetingAttendee',\n      description: 'The Attendee object represents a participant in a meeting. It includes their email address and links to associated `Person` and `Organization` items, if they exist in your collections.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        email: {\n          type: 'string',\n          description: 'The email address of the attendee.'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `meeting_attendee` for this object.',\n          enum: [            'meeting_attendee'\n          ]\n        },\n        organization: {\n          $ref: '#/$defs/pointer'\n        },\n        person: {\n          $ref: '#/$defs/pointer'\n        }\n      },\n      required: [        'id',\n        'email',\n        'type'\n      ]\n    },\n    pointer: {\n      type: 'object',\n      title: 'Pointer',\n      description: 'A lightweight reference to another resource.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the referenced object.'\n        },\n        type: {\n          type: 'string',\n          description: 'String indicating the type of the referenced object.'\n        }\n      },\n      required: [        'id',\n        'type'\n      ]\n    },\n    organizer: {\n      type: 'object',\n      title: 'MeetingOrganizer',\n      description: 'Represents the organizer of a meeting.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        email: {\n          type: 'string',\n          description: 'The email address of the organizer.'\n        },\n        type: {\n          type: 'string',\n          description: 'String representing the object’s type. Always `meeting_organizer` for this object.',\n          enum: [            'meeting_organizer'\n          ]\n        },\n        organization: {\n          $ref: '#/$defs/pointer'\n        },\n        person: {\n          $ref: '#/$defs/pointer'\n        }\n      },\n      required: [        'id',\n        'email',\n        'type'\n      ]\n    }\n  }\n}\n```",
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
  const response = await client.meetings.list(body).asResponse();
  return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
};

export default { metadata, tool, handler };
