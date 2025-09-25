// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import retrieve_collections from './collections/retrieve-collections';
import list_collections from './collections/list-collections';
import retrieve_collections_fields from './collections/fields/retrieve-collections-fields';
import create_collections_items from './collections/items/create-collections-items';
import retrieve_collections_items from './collections/items/retrieve-collections-items';
import update_collections_items from './collections/items/update-collections-items';
import list_collections_items from './collections/items/list-collections-items';
import delete_collections_items from './collections/items/delete-collections-items';
import upsert_collections_items from './collections/items/upsert-collections-items';
import retrieve_views from './views/retrieve-views';
import list_views_items from './views/items/list-views-items';
import retrieve_inboxes from './inboxes/retrieve-inboxes';
import list_inboxes from './inboxes/list-inboxes';
import retrieve_inbox_conversations from './inbox-conversations/retrieve-inbox-conversations';
import list_inbox_conversations from './inbox-conversations/list-inbox-conversations';
import retrieve_inbox_messages from './inbox-messages/retrieve-inbox-messages';
import list_inbox_messages from './inbox-messages/list-inbox-messages';
import retrieve_tagsets from './tagsets/retrieve-tagsets';
import list_tagsets from './tagsets/list-tagsets';
import retrieve_programs from './programs/retrieve-programs';
import list_programs from './programs/list-programs';
import retrieve_program_templates from './program-templates/retrieve-program-templates';
import list_program_templates from './program-templates/list-program-templates';
import send_program_messages from './program-messages/send-program-messages';
import retrieve_forms from './forms/retrieve-forms';
import list_forms from './forms/list-forms';
import retrieve_activities from './activities/retrieve-activities';
import list_activities from './activities/list-activities';
import create_calls from './calls/create-calls';
import upsert_calls from './calls/upsert-calls';
import retrieve_files from './files/retrieve-files';
import list_files from './files/list-files';
import retrieve_meetings from './meetings/retrieve-meetings';
import update_meetings from './meetings/update-meetings';
import list_meetings from './meetings/list-meetings';
import retrieve_notes from './notes/retrieve-notes';
import list_notes from './notes/list-notes';
import create_webhook_endpoints from './webhook-endpoints/create-webhook-endpoints';
import retrieve_webhook_endpoints from './webhook-endpoints/retrieve-webhook-endpoints';
import update_webhook_endpoints from './webhook-endpoints/update-webhook-endpoints';
import list_webhook_endpoints from './webhook-endpoints/list-webhook-endpoints';
import delete_webhook_endpoints from './webhook-endpoints/delete-webhook-endpoints';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(retrieve_collections);
addEndpoint(list_collections);
addEndpoint(retrieve_collections_fields);
addEndpoint(create_collections_items);
addEndpoint(retrieve_collections_items);
addEndpoint(update_collections_items);
addEndpoint(list_collections_items);
addEndpoint(delete_collections_items);
addEndpoint(upsert_collections_items);
addEndpoint(retrieve_views);
addEndpoint(list_views_items);
addEndpoint(retrieve_inboxes);
addEndpoint(list_inboxes);
addEndpoint(retrieve_inbox_conversations);
addEndpoint(list_inbox_conversations);
addEndpoint(retrieve_inbox_messages);
addEndpoint(list_inbox_messages);
addEndpoint(retrieve_tagsets);
addEndpoint(list_tagsets);
addEndpoint(retrieve_programs);
addEndpoint(list_programs);
addEndpoint(retrieve_program_templates);
addEndpoint(list_program_templates);
addEndpoint(send_program_messages);
addEndpoint(retrieve_forms);
addEndpoint(list_forms);
addEndpoint(retrieve_activities);
addEndpoint(list_activities);
addEndpoint(create_calls);
addEndpoint(upsert_calls);
addEndpoint(retrieve_files);
addEndpoint(list_files);
addEndpoint(retrieve_meetings);
addEndpoint(update_meetings);
addEndpoint(list_meetings);
addEndpoint(retrieve_notes);
addEndpoint(list_notes);
addEndpoint(create_webhook_endpoints);
addEndpoint(retrieve_webhook_endpoints);
addEndpoint(update_webhook_endpoints);
addEndpoint(list_webhook_endpoints);
addEndpoint(delete_webhook_endpoints);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
