// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'search',
    endpoint: '/search',
    httpMethod: 'post',
    summary: 'Search Moonbase',
    description: 'Returns items that match the search query.',
    stainlessPath: '(resource) $client > (method) search',
    qualified: 'client.search',
    params: ['query: string;'],
    response: "{ data: { data: object; }[]; type: 'list'; }",
    markdown:
      "## search\n\n`client.search(query: string): { data: object[]; type: 'list'; }`\n\n**post** `/search`\n\nReturns items that match the search query.\n\n### Parameters\n\n- `query: string`\n  The search text to match against items.\n\n### Returns\n\n- `{ data: { data: object; }[]; type: 'list'; }`\n  A list of search results.\n\n  - `data: { data: { id: string; collection: object; type: 'item'; values: object; }; }[]`\n  - `type: 'list'`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst response = await client.search({ query: 'query' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/collections/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a collection',
    description: 'Retrieves the details of an existing collection.',
    stainlessPath: '(resource) collections > (method) retrieve',
    qualified: 'client.collections.retrieve',
    params: ['id: string;', "include?: 'views'[];"],
    response:
      "{ id: string; core: boolean; created_at: string; fields: object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object[]; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; views?: { id: string; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; collection?: collection; }[]; }",
    markdown:
      "## retrieve\n\n`client.collections.retrieve(id: string, include?: 'views'[]): { id: string; core: boolean; created_at: string; fields: field[]; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; views?: view[]; }`\n\n**get** `/collections/{id}`\n\nRetrieves the details of an existing collection.\n\n### Parameters\n\n- `id: string`\n\n- `include?: 'views'[]`\n  Specifies which related objects to include in the response.\n\n### Returns\n\n- `{ id: string; core: boolean; created_at: string; fields: object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object[]; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; views?: { id: string; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; collection?: collection; }[]; }`\n  A Collection is a container for structured data, similar to a database table or spreadsheet. It defines a schema using a set of `Fields` and holds the data as a list of `Items`.\n\n\n  - `id: string`\n  - `core: boolean`\n  - `created_at: string`\n  - `fields: { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/single_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/multi_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_integer'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_float'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/monetary'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/percentage'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/boolean'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/email'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/url'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/domain'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_x'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_linked_in'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/telephone_number'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/geo'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/date'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/datetime'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; options: object[]; readonly: boolean; ref: string; required: boolean; type: 'field/choice'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; funnel: object; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/stage'; unique: boolean; updated_at: string; description?: string; } | { id: string; allowed_collections: object[]; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; relation_type: 'one_way' | 'two_way'; required: boolean; type: 'field/relation'; unique: boolean; updated_at: string; description?: string; }[]`\n  - `name: string`\n  - `ref: string`\n  - `type: 'collection'`\n  - `updated_at: string`\n  - `description?: string`\n  - `views?: { id: string; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; collection?: { id: string; core: boolean; created_at: string; fields: field[]; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; views?: view[]; }; }[]`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst collection = await client.collections.retrieve('id');\n\nconsole.log(collection);\n```",
  },
  {
    name: 'list',
    endpoint: '/collections',
    httpMethod: 'get',
    summary: 'List all collections',
    description: 'Returns a list of your collections.',
    stainlessPath: '(resource) collections > (method) list',
    qualified: 'client.collections.list',
    params: ['after?: string;', 'before?: string;', 'limit?: number;'],
    response:
      "{ id: string; core: boolean; created_at: string; fields: object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object[]; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; views?: { id: string; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; collection?: collection; }[]; }",
    markdown:
      "## list\n\n`client.collections.list(after?: string, before?: string, limit?: number): { id: string; core: boolean; created_at: string; fields: field[]; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; views?: view[]; }`\n\n**get** `/collections`\n\nReturns a list of your collections.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; core: boolean; created_at: string; fields: object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object[]; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; views?: { id: string; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; collection?: collection; }[]; }`\n  A Collection is a container for structured data, similar to a database table or spreadsheet. It defines a schema using a set of `Fields` and holds the data as a list of `Items`.\n\n\n  - `id: string`\n  - `core: boolean`\n  - `created_at: string`\n  - `fields: { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/single_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/multi_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_integer'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_float'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/monetary'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/percentage'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/boolean'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/email'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/url'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/domain'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_x'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_linked_in'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/telephone_number'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/geo'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/date'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/datetime'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; options: object[]; readonly: boolean; ref: string; required: boolean; type: 'field/choice'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; funnel: object; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/stage'; unique: boolean; updated_at: string; description?: string; } | { id: string; allowed_collections: object[]; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; relation_type: 'one_way' | 'two_way'; required: boolean; type: 'field/relation'; unique: boolean; updated_at: string; description?: string; }[]`\n  - `name: string`\n  - `ref: string`\n  - `type: 'collection'`\n  - `updated_at: string`\n  - `description?: string`\n  - `views?: { id: string; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; collection?: { id: string; core: boolean; created_at: string; fields: field[]; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; views?: view[]; }; }[]`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const collection of client.collections.list()) {\n  console.log(collection);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/collections/{collection_id}/fields/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a field',
    description: 'Retrieves the details of a field in a collection.',
    stainlessPath: '(resource) collections.fields > (method) retrieve',
    qualified: 'client.collections.fields.retrieve',
    params: ['collection_id: string;', 'id: string;'],
    response:
      'object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object',
    markdown:
      "## retrieve\n\n`client.collections.fields.retrieve(collection_id: string, id: string): object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object`\n\n**get** `/collections/{collection_id}/fields/{id}`\n\nRetrieves the details of a field in a collection.\n\n### Parameters\n\n- `collection_id: string`\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/single_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/multi_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_integer'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_float'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/monetary'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/percentage'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/boolean'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/email'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/url'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/domain'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_x'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_linked_in'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/telephone_number'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/geo'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/date'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/datetime'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; options: object[]; readonly: boolean; ref: string; required: boolean; type: 'field/choice'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; core: boolean; created_at: string; funnel: object; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/stage'; unique: boolean; updated_at: string; description?: string; } | { id: string; allowed_collections: object[]; cardinality: 'one' | 'many'; core: boolean; created_at: string; name: string; readonly: boolean; ref: string; relation_type: 'one_way' | 'two_way'; required: boolean; type: 'field/relation'; unique: boolean; updated_at: string; description?: string; }`\n  A field definition, which varies by type\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst field = await client.collections.fields.retrieve('id', { collection_id: 'collection_id' });\n\nconsole.log(field);\n```",
  },
  {
    name: 'create',
    endpoint: '/collections/{collection_id}/items',
    httpMethod: 'post',
    summary: 'Create an item',
    description: 'Creates a new item in a collection.',
    stainlessPath: '(resource) collections.items > (method) create',
    qualified: 'client.collections.items.create',
    params: ['collection_id: string;', 'values: object;'],
    response:
      "{ id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; values: object; }",
    markdown:
      "## create\n\n`client.collections.items.create(collection_id: string, values: object): { id: string; collection: collection_pointer; type: 'item'; values: object; }`\n\n**post** `/collections/{collection_id}/items`\n\nCreates a new item in a collection.\n\n### Parameters\n\n- `collection_id: string`\n\n- `values: object`\n  A hash where keys are the `ref` of a `Field` and values are the data to be set.\n\n### Returns\n\n- `{ id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; values: object; }`\n  An Item represents a single record or row within a Collection. It holds a set of `values` corresponding to the Collection's `fields`.\n\n  - `id: string`\n  - `collection: { id: string; ref: string; type: 'collection'; }`\n  - `type: 'item'`\n  - `values: object`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst item = await client.collections.items.create('collection_id', { values: {\n  name: { data: 'Aperture Science', type: 'value/text/single_line' },\n  ceo: {\n  data: { id: '1CLJt2v84CdKMEKqwBNXfE', type: 'item' },\n  type: 'value/relation',\n},\n} });\n\nconsole.log(item);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/collections/{collection_id}/items/{id}',
    httpMethod: 'get',
    summary: 'Retrieve an item',
    description: 'Retrieves the details of an existing item.',
    stainlessPath: '(resource) collections.items > (method) retrieve',
    qualified: 'client.collections.items.retrieve',
    params: ['collection_id: string;', 'id: string;'],
    response:
      "{ id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; values: object; }",
    markdown:
      "## retrieve\n\n`client.collections.items.retrieve(collection_id: string, id: string): { id: string; collection: collection_pointer; type: 'item'; values: object; }`\n\n**get** `/collections/{collection_id}/items/{id}`\n\nRetrieves the details of an existing item.\n\n### Parameters\n\n- `collection_id: string`\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; values: object; }`\n  An Item represents a single record or row within a Collection. It holds a set of `values` corresponding to the Collection's `fields`.\n\n  - `id: string`\n  - `collection: { id: string; ref: string; type: 'collection'; }`\n  - `type: 'item'`\n  - `values: object`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst item = await client.collections.items.retrieve('id', { collection_id: 'collection_id' });\n\nconsole.log(item);\n```",
  },
  {
    name: 'update',
    endpoint: '/collections/{collection_id}/items/{id}',
    httpMethod: 'patch',
    summary: 'Update an item',
    description: 'Updates an item.',
    stainlessPath: '(resource) collections.items > (method) update',
    qualified: 'client.collections.items.update',
    params: [
      'collection_id: string;',
      'id: string;',
      'values: object;',
      "update-many-strategy?: 'replace' | 'preserve' | 'merge';",
      "update-one-strategy?: 'replace' | 'preserve';",
    ],
    response:
      "{ id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; values: object; }",
    markdown:
      "## update\n\n`client.collections.items.update(collection_id: string, id: string, values: object, update-many-strategy?: 'replace' | 'preserve' | 'merge', update-one-strategy?: 'replace' | 'preserve'): { id: string; collection: collection_pointer; type: 'item'; values: object; }`\n\n**patch** `/collections/{collection_id}/items/{id}`\n\nUpdates an item.\n\n### Parameters\n\n- `collection_id: string`\n\n- `id: string`\n\n- `values: object`\n  A hash where keys are the `ref` of a `Field` and values are the new data to be set.\n\n- `update-many-strategy?: 'replace' | 'preserve' | 'merge'`\n\n- `update-one-strategy?: 'replace' | 'preserve'`\n\n### Returns\n\n- `{ id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; values: object; }`\n  An Item represents a single record or row within a Collection. It holds a set of `values` corresponding to the Collection's `fields`.\n\n  - `id: string`\n  - `collection: { id: string; ref: string; type: 'collection'; }`\n  - `type: 'item'`\n  - `values: object`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst item = await client.collections.items.update('id', {\n  collection_id: 'collection_id',\n  values: { name: { data: 'Jony Appleseed', type: 'value/text/single_line' } },\n});\n\nconsole.log(item);\n```",
  },
  {
    name: 'list',
    endpoint: '/collections/{collection_id}/items',
    httpMethod: 'get',
    summary: 'List items in a collection',
    description: 'Returns a list of items that are part of the collection.',
    stainlessPath: '(resource) collections.items > (method) list',
    qualified: 'client.collections.items.list',
    params: [
      'collection_id: string;',
      'after?: string;',
      'before?: string;',
      'include?: string[];',
      'limit?: number;',
      'sort?: string[];',
    ],
    response:
      "{ id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; values: object; }",
    markdown:
      "## list\n\n`client.collections.items.list(collection_id: string, after?: string, before?: string, include?: string[], limit?: number, sort?: string[]): { id: string; collection: collection_pointer; type: 'item'; values: object; }`\n\n**get** `/collections/{collection_id}/items`\n\nReturns a list of items that are part of the collection.\n\n### Parameters\n\n- `collection_id: string`\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `include?: string[]`\n  Include only specific fields in the returned items. Specify fields by id or key.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n- `sort?: string[]`\n  Sort items by the specified field ids or keys. Prefix a field with a hyphen/minus (`-`) to sort in descending order by that field.\n\n### Returns\n\n- `{ id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; values: object; }`\n  An Item represents a single record or row within a Collection. It holds a set of `values` corresponding to the Collection's `fields`.\n\n  - `id: string`\n  - `collection: { id: string; ref: string; type: 'collection'; }`\n  - `type: 'item'`\n  - `values: object`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const item of client.collections.items.list('collection_id')) {\n  console.log(item);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/collections/{collection_id}/items/{id}',
    httpMethod: 'delete',
    summary: 'Delete an item',
    description: 'Permanently deletes an item.',
    stainlessPath: '(resource) collections.items > (method) delete',
    qualified: 'client.collections.items.delete',
    params: ['collection_id: string;', 'id: string;'],
    markdown:
      "## delete\n\n`client.collections.items.delete(collection_id: string, id: string): void`\n\n**delete** `/collections/{collection_id}/items/{id}`\n\nPermanently deletes an item.\n\n### Parameters\n\n- `collection_id: string`\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nawait client.collections.items.delete('id', { collection_id: 'collection_id' })\n```",
  },
  {
    name: 'search',
    endpoint: '/collections/{collection_id}/items/search',
    httpMethod: 'post',
    summary: 'Search for items in a collection',
    description: 'Returns a list of items in the collection that match the given filters.',
    stainlessPath: '(resource) collections.items > (method) search',
    qualified: 'client.collections.items.search',
    params: [
      'collection_id: string;',
      'after?: string;',
      'before?: string;',
      'limit?: number;',
      "filter?: { field: string; op: string; value: string | number | boolean; } | { field: string; op: 'exists'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'and'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'or'; } | { filter: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group; op: 'not'; };",
      'include?: string[];',
      'sort?: string[];',
    ],
    response: "{ data: { id: string; collection: collection_pointer; type: 'item'; values: object; }; }",
    markdown:
      "## search\n\n`client.collections.items.search(collection_id: string, after?: string, before?: string, limit?: number, filter?: object | object | object | object | object, include?: string[], sort?: string[]): { data: item; }`\n\n**post** `/collections/{collection_id}/items/search`\n\nReturns a list of items in the collection that match the given filters.\n\n### Parameters\n\n- `collection_id: string`\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n- `filter?: { field: string; op: string; value: string | number | boolean; } | { field: string; op: 'exists'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'and'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'or'; } | { filter: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group; op: 'not'; }`\n  Return only items that match the filter conditions. Complex filters can be created by nesting filters inside of `AND`, `OR`, and `NOT` filters.\n\n- `include?: string[]`\n  Include only specific fields in the returned items. Specify fields by id or key.\n\n- `sort?: string[]`\n  Sort items by the specified field ids or keys. Prefix a field with a hyphen/minus (`-`) to sort in descending order by that field.\n\n### Returns\n\n- `{ data: { id: string; collection: collection_pointer; type: 'item'; values: object; }; }`\n  A search result entry\n\n  - `data: { id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; values: object; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const itemSearchResponse of client.collections.items.search('collection_id')) {\n  console.log(itemSearchResponse);\n}\n```",
  },
  {
    name: 'upsert',
    endpoint: '/collections/{collection_id}/items/upsert',
    httpMethod: 'post',
    summary: 'Create or update an item',
    description: 'Find and update an existing item, or create a new one.',
    stainlessPath: '(resource) collections.items > (method) upsert',
    qualified: 'client.collections.items.upsert',
    params: [
      'collection_id: string;',
      'identifiers: object;',
      'values: object;',
      "update-many-strategy?: 'replace' | 'preserve' | 'merge';",
      "update-one-strategy?: 'replace' | 'preserve';",
    ],
    response:
      "{ id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; values: object; }",
    markdown:
      "## upsert\n\n`client.collections.items.upsert(collection_id: string, identifiers: object, values: object, update-many-strategy?: 'replace' | 'preserve' | 'merge', update-one-strategy?: 'replace' | 'preserve'): { id: string; collection: collection_pointer; type: 'item'; values: object; }`\n\n**post** `/collections/{collection_id}/items/upsert`\n\nFind and update an existing item, or create a new one.\n\n### Parameters\n\n- `collection_id: string`\n\n- `identifiers: object`\n  A hash where keys are the `ref` of a `Field` and values are used to identify the item to update. When multiple identifiers are provided, the update will find items that match any of the identifiers.\n\n- `values: object`\n  A hash where keys are the `ref` of a `Field` and values are the data to be set.\n\n- `update-many-strategy?: 'replace' | 'preserve' | 'merge'`\n\n- `update-one-strategy?: 'replace' | 'preserve'`\n\n### Returns\n\n- `{ id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; values: object; }`\n  An Item represents a single record or row within a Collection. It holds a set of `values` corresponding to the Collection's `fields`.\n\n  - `id: string`\n  - `collection: { id: string; ref: string; type: 'collection'; }`\n  - `type: 'item'`\n  - `values: object`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst item = await client.collections.items.upsert('collection_id', {\n  identifiers: { domain: [{ data: 'aperturescience.com', type: 'value/uri/domain' }] },\n  values: {\n  name: { data: 'Aperture Science', type: 'value/text/single_line' },\n  domain: [{ data: 'aperturescience.com', type: 'value/uri/domain' }],\n  linked_in: {\n  data: {},\n  type: 'value/uri/social_linked_in',\n},\n},\n});\n\nconsole.log(item);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/views/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a view',
    description: 'Retrieves the details of an existing view.',
    stainlessPath: '(resource) views > (method) retrieve',
    qualified: 'client.views.retrieve',
    params: ['id: string;', "include?: 'collection'[];"],
    response:
      "{ id: string; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; collection?: { id: string; core: boolean; created_at: string; fields: field[]; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; views?: view[]; }; }",
    markdown:
      "## retrieve\n\n`client.views.retrieve(id: string, include?: 'collection'[]): { id: string; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; collection?: collection; }`\n\n**get** `/views/{id}`\n\nRetrieves the details of an existing view.\n\n### Parameters\n\n- `id: string`\n\n- `include?: 'collection'[]`\n  Specifies which related objects to include in the response. Valid option is `collection`.\n\n### Returns\n\n- `{ id: string; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; collection?: { id: string; core: boolean; created_at: string; fields: field[]; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; views?: view[]; }; }`\n  A View represents a saved configuration for displaying items in a collection, including filters and sorting rules.\n\n  - `id: string`\n  - `created_at: string`\n  - `name: string`\n  - `type: 'view'`\n  - `updated_at: string`\n  - `view_type: 'table' | 'board'`\n  - `collection?: { id: string; core: boolean; created_at: string; fields: object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object[]; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; views?: { id: string; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; collection?: collection; }[]; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst view = await client.views.retrieve('id');\n\nconsole.log(view);\n```",
  },
  {
    name: 'list',
    endpoint: '/views/{id}/items',
    httpMethod: 'get',
    summary: 'List items in a view',
    description: 'Returns a list of items that are part of the specified view.',
    stainlessPath: '(resource) views.items > (method) list',
    qualified: 'client.views.items.list',
    params: ['id: string;', 'after?: string;', 'before?: string;', 'limit?: number;'],
    response:
      "{ id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; values: object; }",
    markdown:
      "## list\n\n`client.views.items.list(id: string, after?: string, before?: string, limit?: number): { id: string; collection: collection_pointer; type: 'item'; values: object; }`\n\n**get** `/views/{id}/items`\n\nReturns a list of items that are part of the specified view.\n\n### Parameters\n\n- `id: string`\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; values: object; }`\n  An Item represents a single record or row within a Collection. It holds a set of `values` corresponding to the Collection's `fields`.\n\n  - `id: string`\n  - `collection: { id: string; ref: string; type: 'collection'; }`\n  - `type: 'item'`\n  - `values: object`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const item of client.views.items.list('id')) {\n  console.log(item);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/inboxes/{id}',
    httpMethod: 'get',
    summary: 'Retrieve an inbox',
    description: 'Retrieves the details of an existing inbox.',
    stainlessPath: '(resource) inboxes > (method) retrieve',
    qualified: 'client.inboxes.retrieve',
    params: ['id: string;', "include?: 'tagsets'[];"],
    response:
      "{ id: string; created_at: string; name: string; type: 'inbox'; updated_at: string; can_read?: boolean; tagsets?: { id: string; created_at: string; name: string; tags: object[]; type: 'tagset'; updated_at: string; description?: string; }[]; }",
    markdown:
      "## retrieve\n\n`client.inboxes.retrieve(id: string, include?: 'tagsets'[]): { id: string; created_at: string; name: string; type: 'inbox'; updated_at: string; can_read?: boolean; tagsets?: tagset[]; }`\n\n**get** `/inboxes/{id}`\n\nRetrieves the details of an existing inbox.\n\n### Parameters\n\n- `id: string`\n\n- `include?: 'tagsets'[]`\n  Specifies which related objects to include in the response. Valid option is `tagsets`.\n\n### Returns\n\n- `{ id: string; created_at: string; name: string; type: 'inbox'; updated_at: string; can_read?: boolean; tagsets?: { id: string; created_at: string; name: string; tags: object[]; type: 'tagset'; updated_at: string; description?: string; }[]; }`\n  The Inbox object represents a shared inbox for receiving and sending messages.\n\n  - `id: string`\n  - `created_at: string`\n  - `name: string`\n  - `type: 'inbox'`\n  - `updated_at: string`\n  - `can_read?: boolean`\n  - `tagsets?: { id: string; created_at: string; name: string; tags: { id: string; name: string; type: 'tag'; }[]; type: 'tagset'; updated_at: string; description?: string; }[]`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst inbox = await client.inboxes.retrieve('id');\n\nconsole.log(inbox);\n```",
  },
  {
    name: 'list',
    endpoint: '/inboxes',
    httpMethod: 'get',
    summary: 'List shared inboxes',
    description: 'Returns a list of shared inboxes.',
    stainlessPath: '(resource) inboxes > (method) list',
    qualified: 'client.inboxes.list',
    params: ['after?: string;', 'before?: string;', "include?: 'tagsets'[];", 'limit?: number;'],
    response:
      "{ id: string; created_at: string; name: string; type: 'inbox'; updated_at: string; can_read?: boolean; tagsets?: { id: string; created_at: string; name: string; tags: object[]; type: 'tagset'; updated_at: string; description?: string; }[]; }",
    markdown:
      "## list\n\n`client.inboxes.list(after?: string, before?: string, include?: 'tagsets'[], limit?: number): { id: string; created_at: string; name: string; type: 'inbox'; updated_at: string; can_read?: boolean; tagsets?: tagset[]; }`\n\n**get** `/inboxes`\n\nReturns a list of shared inboxes.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `include?: 'tagsets'[]`\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; created_at: string; name: string; type: 'inbox'; updated_at: string; can_read?: boolean; tagsets?: { id: string; created_at: string; name: string; tags: object[]; type: 'tagset'; updated_at: string; description?: string; }[]; }`\n  The Inbox object represents a shared inbox for receiving and sending messages.\n\n  - `id: string`\n  - `created_at: string`\n  - `name: string`\n  - `type: 'inbox'`\n  - `updated_at: string`\n  - `can_read?: boolean`\n  - `tagsets?: { id: string; created_at: string; name: string; tags: { id: string; name: string; type: 'tag'; }[]; type: 'tagset'; updated_at: string; description?: string; }[]`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const inbox of client.inboxes.list()) {\n  console.log(inbox);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/inbox_conversations/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a conversation',
    description: 'Retrieves the details of an existing conversation.',
    stainlessPath: '(resource) inbox_conversations > (method) retrieve',
    qualified: 'client.inboxConversations.retrieve',
    params: ['id: string;', "include?: 'inbox' | 'messages' | 'messages.addresses'[];"],
    response:
      "{ id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: { id: string; name: string; type: 'tag'; }[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: { id: string; created_at: string; name: string; type: 'inbox'; updated_at: string; can_read?: boolean; tagsets?: tagset[]; }; messages?: { id: string; body: formatted_text; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: address[]; attachments?: object[]; conversation?: inbox_conversation; summary?: string; }[]; unsnooze_at?: string; }",
    markdown:
      "## retrieve\n\n`client.inboxConversations.retrieve(id: string, include?: 'inbox' | 'messages' | 'messages.addresses'[]): { id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: object[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: inbox; messages?: email_message[]; unsnooze_at?: string; }`\n\n**get** `/inbox_conversations/{id}`\n\nRetrieves the details of an existing conversation.\n\n### Parameters\n\n- `id: string`\n\n- `include?: 'inbox' | 'messages' | 'messages.addresses'[]`\n  Specifies which related objects to include in the response. Valid options are `inbox`, `messages`, and `messages.addresses`.\n\n### Returns\n\n- `{ id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: { id: string; name: string; type: 'tag'; }[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: { id: string; created_at: string; name: string; type: 'inbox'; updated_at: string; can_read?: boolean; tagsets?: tagset[]; }; messages?: { id: string; body: formatted_text; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: address[]; attachments?: object[]; conversation?: inbox_conversation; summary?: string; }[]; unsnooze_at?: string; }`\n  The Conversation object represents a thread of related messages.\n\n  - `id: string`\n  - `bulk: boolean`\n  - `created_at: string`\n  - `draft: boolean`\n  - `follow_up: boolean`\n  - `last_message_at: string`\n  - `spam: boolean`\n  - `state: 'unassigned' | 'active' | 'closed' | 'waiting'`\n  - `subject: string`\n  - `tags: { id: string; name: string; type: 'tag'; }[]`\n  - `trash: boolean`\n  - `type: 'inbox_conversation'`\n  - `unread: boolean`\n  - `updated_at: string`\n  - `inbox?: { id: string; created_at: string; name: string; type: 'inbox'; updated_at: string; can_read?: boolean; tagsets?: { id: string; created_at: string; name: string; tags: object[]; type: 'tagset'; updated_at: string; description?: string; }[]; }`\n  - `messages?: { id: string; body: { markdown?: string; }; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: { id: string; email: string; role: 'from' | 'reply_to' | 'to' | 'cc' | 'bcc'; type: 'message_address'; organization?: pointer; person?: pointer; }[]; attachments?: { id: string; created_at: string; download_url: string; filename: string; size: number; type: 'message_attachment'; }[]; conversation?: { id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: object[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: inbox; messages?: email_message[]; unsnooze_at?: string; }; summary?: string; }[]`\n  - `unsnooze_at?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst inboxConversation = await client.inboxConversations.retrieve('id');\n\nconsole.log(inboxConversation);\n```",
  },
  {
    name: 'list',
    endpoint: '/inbox_conversations',
    httpMethod: 'get',
    summary: 'List conversations',
    description: 'Returns a list of your conversations.',
    stainlessPath: '(resource) inbox_conversations > (method) list',
    qualified: 'client.inboxConversations.list',
    params: [
      'after?: string;',
      'before?: string;',
      'filter?: { conversation_id?: { eq?: string; }; inbox_id?: { eq?: string; }; };',
      "include?: 'inbox' | 'messages' | 'messages.addresses'[];",
      'limit?: number;',
    ],
    response:
      "{ id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: { id: string; name: string; type: 'tag'; }[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: { id: string; created_at: string; name: string; type: 'inbox'; updated_at: string; can_read?: boolean; tagsets?: tagset[]; }; messages?: { id: string; body: formatted_text; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: address[]; attachments?: object[]; conversation?: inbox_conversation; summary?: string; }[]; unsnooze_at?: string; }",
    markdown:
      "## list\n\n`client.inboxConversations.list(after?: string, before?: string, filter?: { conversation_id?: { eq?: string; }; inbox_id?: { eq?: string; }; }, include?: 'inbox' | 'messages' | 'messages.addresses'[], limit?: number): { id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: object[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: inbox; messages?: email_message[]; unsnooze_at?: string; }`\n\n**get** `/inbox_conversations`\n\nReturns a list of your conversations.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `filter?: { conversation_id?: { eq?: string; }; inbox_id?: { eq?: string; }; }`\n  - `conversation_id?: { eq?: string; }`\n  - `inbox_id?: { eq?: string; }`\n\n- `include?: 'inbox' | 'messages' | 'messages.addresses'[]`\n  Specifies which related objects to include in the response. Valid options are `inbox`, `messages`, and `messages.addresses`.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: { id: string; name: string; type: 'tag'; }[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: { id: string; created_at: string; name: string; type: 'inbox'; updated_at: string; can_read?: boolean; tagsets?: tagset[]; }; messages?: { id: string; body: formatted_text; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: address[]; attachments?: object[]; conversation?: inbox_conversation; summary?: string; }[]; unsnooze_at?: string; }`\n  The Conversation object represents a thread of related messages.\n\n  - `id: string`\n  - `bulk: boolean`\n  - `created_at: string`\n  - `draft: boolean`\n  - `follow_up: boolean`\n  - `last_message_at: string`\n  - `spam: boolean`\n  - `state: 'unassigned' | 'active' | 'closed' | 'waiting'`\n  - `subject: string`\n  - `tags: { id: string; name: string; type: 'tag'; }[]`\n  - `trash: boolean`\n  - `type: 'inbox_conversation'`\n  - `unread: boolean`\n  - `updated_at: string`\n  - `inbox?: { id: string; created_at: string; name: string; type: 'inbox'; updated_at: string; can_read?: boolean; tagsets?: { id: string; created_at: string; name: string; tags: object[]; type: 'tagset'; updated_at: string; description?: string; }[]; }`\n  - `messages?: { id: string; body: { markdown?: string; }; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: { id: string; email: string; role: 'from' | 'reply_to' | 'to' | 'cc' | 'bcc'; type: 'message_address'; organization?: pointer; person?: pointer; }[]; attachments?: { id: string; created_at: string; download_url: string; filename: string; size: number; type: 'message_attachment'; }[]; conversation?: { id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: object[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: inbox; messages?: email_message[]; unsnooze_at?: string; }; summary?: string; }[]`\n  - `unsnooze_at?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const inboxConversation of client.inboxConversations.list()) {\n  console.log(inboxConversation);\n}\n```",
  },
  {
    name: 'create',
    endpoint: '/inbox_messages',
    httpMethod: 'post',
    summary: 'Create a message draft',
    description: 'Creates a new message draft.',
    stainlessPath: '(resource) inbox_messages > (method) create',
    qualified: 'client.inboxMessages.create',
    params: [
      'body: { markdown?: string; };',
      'inbox_id: string;',
      'bcc?: { email: string; name?: string; }[];',
      'cc?: { email: string; name?: string; }[];',
      'conversation_id?: string;',
      'subject?: string;',
      'to?: { email: string; name?: string; }[];',
    ],
    response:
      "{ id: string; body: { markdown?: string; }; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: { id: string; email: string; role: 'from' | 'reply_to' | 'to' | 'cc' | 'bcc'; type: 'message_address'; organization?: pointer; person?: pointer; }[]; attachments?: { id: string; created_at: string; download_url: string; filename: string; size: number; type: 'message_attachment'; }[]; conversation?: { id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: object[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: inbox; messages?: email_message[]; unsnooze_at?: string; }; summary?: string; }",
    markdown:
      "## create\n\n`client.inboxMessages.create(body: { markdown?: string; }, inbox_id: string, bcc?: { email: string; name?: string; }[], cc?: { email: string; name?: string; }[], conversation_id?: string, subject?: string, to?: { email: string; name?: string; }[]): { id: string; body: formatted_text; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: address[]; attachments?: object[]; conversation?: inbox_conversation; summary?: string; }`\n\n**post** `/inbox_messages`\n\nCreates a new message draft.\n\n### Parameters\n\n- `body: { markdown?: string; }`\n  The email body.\n  - `markdown?: string`\n    The content formatted as Markdown text.\n\n- `inbox_id: string`\n  The inbox to use for sending the email.\n\n- `bcc?: { email: string; name?: string; }[]`\n  A list of the BCC recipients.\n\n- `cc?: { email: string; name?: string; }[]`\n  A list of the CC recipients.\n\n- `conversation_id?: string`\n  The ID of the conversation, if responding to an existing conversation.\n\n- `subject?: string`\n  The subject line of the email.\n\n- `to?: { email: string; name?: string; }[]`\n  A list of recipients.\n\n### Returns\n\n- `{ id: string; body: { markdown?: string; }; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: { id: string; email: string; role: 'from' | 'reply_to' | 'to' | 'cc' | 'bcc'; type: 'message_address'; organization?: pointer; person?: pointer; }[]; attachments?: { id: string; created_at: string; download_url: string; filename: string; size: number; type: 'message_attachment'; }[]; conversation?: { id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: object[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: inbox; messages?: email_message[]; unsnooze_at?: string; }; summary?: string; }`\n  The Email Message object represents a single email within a `Conversation`.\n\n  - `id: string`\n  - `body: { markdown?: string; }`\n  - `bulk: boolean`\n  - `created_at: string`\n  - `draft: boolean`\n  - `lock_version: number`\n  - `spam: boolean`\n  - `subject: string`\n  - `trash: boolean`\n  - `type: 'email_message'`\n  - `unread: boolean`\n  - `addresses?: { id: string; email: string; role: 'from' | 'reply_to' | 'to' | 'cc' | 'bcc'; type: 'message_address'; organization?: { id: string; type: string; }; person?: { id: string; type: string; }; }[]`\n  - `attachments?: { id: string; created_at: string; download_url: string; filename: string; size: number; type: 'message_attachment'; }[]`\n  - `conversation?: { id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: { id: string; name: string; type: 'tag'; }[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: { id: string; created_at: string; name: string; type: 'inbox'; updated_at: string; can_read?: boolean; tagsets?: tagset[]; }; messages?: { id: string; body: formatted_text; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: address[]; attachments?: object[]; conversation?: inbox_conversation; summary?: string; }[]; unsnooze_at?: string; }`\n  - `summary?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst emailMessage = await client.inboxMessages.create({\n  body: {},\n  inbox_id: '1CLJt2v6KXDyzDuM57pQqo',\n});\n\nconsole.log(emailMessage);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/inbox_messages/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a message',
    description: 'Retrieves the details of an existing message.',
    stainlessPath: '(resource) inbox_messages > (method) retrieve',
    qualified: 'client.inboxMessages.retrieve',
    params: ['id: string;', "include?: 'addresses' | 'attachments' | 'conversation'[];"],
    response:
      "{ id: string; body: { markdown?: string; }; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: { id: string; email: string; role: 'from' | 'reply_to' | 'to' | 'cc' | 'bcc'; type: 'message_address'; organization?: pointer; person?: pointer; }[]; attachments?: { id: string; created_at: string; download_url: string; filename: string; size: number; type: 'message_attachment'; }[]; conversation?: { id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: object[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: inbox; messages?: email_message[]; unsnooze_at?: string; }; summary?: string; }",
    markdown:
      "## retrieve\n\n`client.inboxMessages.retrieve(id: string, include?: 'addresses' | 'attachments' | 'conversation'[]): { id: string; body: formatted_text; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: address[]; attachments?: object[]; conversation?: inbox_conversation; summary?: string; }`\n\n**get** `/inbox_messages/{id}`\n\nRetrieves the details of an existing message.\n\n### Parameters\n\n- `id: string`\n\n- `include?: 'addresses' | 'attachments' | 'conversation'[]`\n  Specifies which related objects to include in the response. Valid options are `addresses`, `attachments`, and `conversation`.\n\n### Returns\n\n- `{ id: string; body: { markdown?: string; }; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: { id: string; email: string; role: 'from' | 'reply_to' | 'to' | 'cc' | 'bcc'; type: 'message_address'; organization?: pointer; person?: pointer; }[]; attachments?: { id: string; created_at: string; download_url: string; filename: string; size: number; type: 'message_attachment'; }[]; conversation?: { id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: object[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: inbox; messages?: email_message[]; unsnooze_at?: string; }; summary?: string; }`\n  The Email Message object represents a single email within a `Conversation`.\n\n  - `id: string`\n  - `body: { markdown?: string; }`\n  - `bulk: boolean`\n  - `created_at: string`\n  - `draft: boolean`\n  - `lock_version: number`\n  - `spam: boolean`\n  - `subject: string`\n  - `trash: boolean`\n  - `type: 'email_message'`\n  - `unread: boolean`\n  - `addresses?: { id: string; email: string; role: 'from' | 'reply_to' | 'to' | 'cc' | 'bcc'; type: 'message_address'; organization?: { id: string; type: string; }; person?: { id: string; type: string; }; }[]`\n  - `attachments?: { id: string; created_at: string; download_url: string; filename: string; size: number; type: 'message_attachment'; }[]`\n  - `conversation?: { id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: { id: string; name: string; type: 'tag'; }[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: { id: string; created_at: string; name: string; type: 'inbox'; updated_at: string; can_read?: boolean; tagsets?: tagset[]; }; messages?: { id: string; body: formatted_text; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: address[]; attachments?: object[]; conversation?: inbox_conversation; summary?: string; }[]; unsnooze_at?: string; }`\n  - `summary?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst emailMessage = await client.inboxMessages.retrieve('id');\n\nconsole.log(emailMessage);\n```",
  },
  {
    name: 'update',
    endpoint: '/inbox_messages/{id}',
    httpMethod: 'patch',
    summary: 'Update a message draft',
    description: 'Updates an existing message draft.',
    stainlessPath: '(resource) inbox_messages > (method) update',
    qualified: 'client.inboxMessages.update',
    params: [
      'id: string;',
      'lock_version: number;',
      'bcc?: { email: string; name?: string; }[];',
      'body?: { markdown?: string; };',
      'cc?: { email: string; name?: string; }[];',
      'subject?: string;',
      'to?: { email: string; name?: string; }[];',
    ],
    response:
      "{ id: string; body: { markdown?: string; }; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: { id: string; email: string; role: 'from' | 'reply_to' | 'to' | 'cc' | 'bcc'; type: 'message_address'; organization?: pointer; person?: pointer; }[]; attachments?: { id: string; created_at: string; download_url: string; filename: string; size: number; type: 'message_attachment'; }[]; conversation?: { id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: object[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: inbox; messages?: email_message[]; unsnooze_at?: string; }; summary?: string; }",
    markdown:
      "## update\n\n`client.inboxMessages.update(id: string, lock_version: number, bcc?: { email: string; name?: string; }[], body?: { markdown?: string; }, cc?: { email: string; name?: string; }[], subject?: string, to?: { email: string; name?: string; }[]): { id: string; body: formatted_text; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: address[]; attachments?: object[]; conversation?: inbox_conversation; summary?: string; }`\n\n**patch** `/inbox_messages/{id}`\n\nUpdates an existing message draft.\n\n### Parameters\n\n- `id: string`\n\n- `lock_version: number`\n  The current lock version of the draft for optimistic concurrency control.\n\n- `bcc?: { email: string; name?: string; }[]`\n  A list of the BCC recipients.\n\n- `body?: { markdown?: string; }`\n  The email body.\n  - `markdown?: string`\n    The content formatted as Markdown text.\n\n- `cc?: { email: string; name?: string; }[]`\n  A list of the CC recipients.\n\n- `subject?: string`\n  The subject line of the email.\n\n- `to?: { email: string; name?: string; }[]`\n  A list of the recipients.\n\n### Returns\n\n- `{ id: string; body: { markdown?: string; }; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: { id: string; email: string; role: 'from' | 'reply_to' | 'to' | 'cc' | 'bcc'; type: 'message_address'; organization?: pointer; person?: pointer; }[]; attachments?: { id: string; created_at: string; download_url: string; filename: string; size: number; type: 'message_attachment'; }[]; conversation?: { id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: object[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: inbox; messages?: email_message[]; unsnooze_at?: string; }; summary?: string; }`\n  The Email Message object represents a single email within a `Conversation`.\n\n  - `id: string`\n  - `body: { markdown?: string; }`\n  - `bulk: boolean`\n  - `created_at: string`\n  - `draft: boolean`\n  - `lock_version: number`\n  - `spam: boolean`\n  - `subject: string`\n  - `trash: boolean`\n  - `type: 'email_message'`\n  - `unread: boolean`\n  - `addresses?: { id: string; email: string; role: 'from' | 'reply_to' | 'to' | 'cc' | 'bcc'; type: 'message_address'; organization?: { id: string; type: string; }; person?: { id: string; type: string; }; }[]`\n  - `attachments?: { id: string; created_at: string; download_url: string; filename: string; size: number; type: 'message_attachment'; }[]`\n  - `conversation?: { id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: { id: string; name: string; type: 'tag'; }[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: { id: string; created_at: string; name: string; type: 'inbox'; updated_at: string; can_read?: boolean; tagsets?: tagset[]; }; messages?: { id: string; body: formatted_text; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: address[]; attachments?: object[]; conversation?: inbox_conversation; summary?: string; }[]; unsnooze_at?: string; }`\n  - `summary?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst emailMessage = await client.inboxMessages.update('id', { lock_version: 0 });\n\nconsole.log(emailMessage);\n```",
  },
  {
    name: 'list',
    endpoint: '/inbox_messages',
    httpMethod: 'get',
    summary: 'List messages',
    description: 'Returns a list of messages.',
    stainlessPath: '(resource) inbox_messages > (method) list',
    qualified: 'client.inboxMessages.list',
    params: [
      'after?: string;',
      'before?: string;',
      'filter?: { conversation_id?: { eq?: string; }; inbox_id?: { eq?: string; }; };',
      "include?: 'addresses' | 'attachments' | 'conversation'[];",
      'limit?: number;',
    ],
    response:
      "{ id: string; body: { markdown?: string; }; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: { id: string; email: string; role: 'from' | 'reply_to' | 'to' | 'cc' | 'bcc'; type: 'message_address'; organization?: pointer; person?: pointer; }[]; attachments?: { id: string; created_at: string; download_url: string; filename: string; size: number; type: 'message_attachment'; }[]; conversation?: { id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: object[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: inbox; messages?: email_message[]; unsnooze_at?: string; }; summary?: string; }",
    markdown:
      "## list\n\n`client.inboxMessages.list(after?: string, before?: string, filter?: { conversation_id?: { eq?: string; }; inbox_id?: { eq?: string; }; }, include?: 'addresses' | 'attachments' | 'conversation'[], limit?: number): { id: string; body: formatted_text; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: address[]; attachments?: object[]; conversation?: inbox_conversation; summary?: string; }`\n\n**get** `/inbox_messages`\n\nReturns a list of messages.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `filter?: { conversation_id?: { eq?: string; }; inbox_id?: { eq?: string; }; }`\n  - `conversation_id?: { eq?: string; }`\n  - `inbox_id?: { eq?: string; }`\n\n- `include?: 'addresses' | 'attachments' | 'conversation'[]`\n  Specifies which related objects to include in the response. Valid options are `addresses`, `attachments`, and `conversation`.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; body: { markdown?: string; }; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: { id: string; email: string; role: 'from' | 'reply_to' | 'to' | 'cc' | 'bcc'; type: 'message_address'; organization?: pointer; person?: pointer; }[]; attachments?: { id: string; created_at: string; download_url: string; filename: string; size: number; type: 'message_attachment'; }[]; conversation?: { id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: object[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: inbox; messages?: email_message[]; unsnooze_at?: string; }; summary?: string; }`\n  The Email Message object represents a single email within a `Conversation`.\n\n  - `id: string`\n  - `body: { markdown?: string; }`\n  - `bulk: boolean`\n  - `created_at: string`\n  - `draft: boolean`\n  - `lock_version: number`\n  - `spam: boolean`\n  - `subject: string`\n  - `trash: boolean`\n  - `type: 'email_message'`\n  - `unread: boolean`\n  - `addresses?: { id: string; email: string; role: 'from' | 'reply_to' | 'to' | 'cc' | 'bcc'; type: 'message_address'; organization?: { id: string; type: string; }; person?: { id: string; type: string; }; }[]`\n  - `attachments?: { id: string; created_at: string; download_url: string; filename: string; size: number; type: 'message_attachment'; }[]`\n  - `conversation?: { id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: { id: string; name: string; type: 'tag'; }[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: { id: string; created_at: string; name: string; type: 'inbox'; updated_at: string; can_read?: boolean; tagsets?: tagset[]; }; messages?: { id: string; body: formatted_text; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: address[]; attachments?: object[]; conversation?: inbox_conversation; summary?: string; }[]; unsnooze_at?: string; }`\n  - `summary?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const emailMessage of client.inboxMessages.list()) {\n  console.log(emailMessage);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/inbox_messages/{id}',
    httpMethod: 'delete',
    summary: 'Delete a message draft',
    description: 'Permanently deletes a message draft.',
    stainlessPath: '(resource) inbox_messages > (method) delete',
    qualified: 'client.inboxMessages.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.inboxMessages.delete(id: string): void`\n\n**delete** `/inbox_messages/{id}`\n\nPermanently deletes a message draft.\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nawait client.inboxMessages.delete('id')\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/tagsets/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a tagset',
    description: 'Retrieves the details of an existing tagset.',
    stainlessPath: '(resource) tagsets > (method) retrieve',
    qualified: 'client.tagsets.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; created_at: string; name: string; tags: { id: string; name: string; type: 'tag'; }[]; type: 'tagset'; updated_at: string; description?: string; }",
    markdown:
      "## retrieve\n\n`client.tagsets.retrieve(id: string): { id: string; created_at: string; name: string; tags: object[]; type: 'tagset'; updated_at: string; description?: string; }`\n\n**get** `/tagsets/{id}`\n\nRetrieves the details of an existing tagset.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; created_at: string; name: string; tags: { id: string; name: string; type: 'tag'; }[]; type: 'tagset'; updated_at: string; description?: string; }`\n  A Tagset is a collection of `Tag` objects that can be applied within a specific `Inbox`.\n\n  - `id: string`\n  - `created_at: string`\n  - `name: string`\n  - `tags: { id: string; name: string; type: 'tag'; }[]`\n  - `type: 'tagset'`\n  - `updated_at: string`\n  - `description?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst tagset = await client.tagsets.retrieve('id');\n\nconsole.log(tagset);\n```",
  },
  {
    name: 'list',
    endpoint: '/tagsets',
    httpMethod: 'get',
    summary: 'List tagsets',
    description: 'Returns a list of your tagsets.',
    stainlessPath: '(resource) tagsets > (method) list',
    qualified: 'client.tagsets.list',
    params: ['after?: string;', 'before?: string;', 'limit?: number;'],
    response:
      "{ id: string; created_at: string; name: string; tags: { id: string; name: string; type: 'tag'; }[]; type: 'tagset'; updated_at: string; description?: string; }",
    markdown:
      "## list\n\n`client.tagsets.list(after?: string, before?: string, limit?: number): { id: string; created_at: string; name: string; tags: object[]; type: 'tagset'; updated_at: string; description?: string; }`\n\n**get** `/tagsets`\n\nReturns a list of your tagsets.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; created_at: string; name: string; tags: { id: string; name: string; type: 'tag'; }[]; type: 'tagset'; updated_at: string; description?: string; }`\n  A Tagset is a collection of `Tag` objects that can be applied within a specific `Inbox`.\n\n  - `id: string`\n  - `created_at: string`\n  - `name: string`\n  - `tags: { id: string; name: string; type: 'tag'; }[]`\n  - `type: 'tagset'`\n  - `updated_at: string`\n  - `description?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const tagset of client.tagsets.list()) {\n  console.log(tagset);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/programs/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a program',
    description: 'Retrieves the details of an existing program.',
    stainlessPath: '(resource) programs > (method) retrieve',
    qualified: 'client.programs.retrieve',
    params: ['id: string;', "include?: 'activity_metrics' | 'program_template'[];"],
    response:
      "{ id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: { bounced: number; clicked: number; complained: number; failed: number; opened: number; sent: number; shielded: number; unsubscribed: number; }; display_name?: string; program_template?: { id: string; body: formatted_text; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: program; }; scheduled_at?: string; }",
    markdown:
      "## retrieve\n\n`client.programs.retrieve(id: string, include?: 'activity_metrics' | 'program_template'[]): { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: object; display_name?: string; program_template?: program_template; scheduled_at?: string; }`\n\n**get** `/programs/{id}`\n\nRetrieves the details of an existing program.\n\n### Parameters\n\n- `id: string`\n\n- `include?: 'activity_metrics' | 'program_template'[]`\n  Specifies which related objects to include in the response. Valid options are `activity_metrics` and `program_template`.\n\n### Returns\n\n- `{ id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: { bounced: number; clicked: number; complained: number; failed: number; opened: number; sent: number; shielded: number; unsubscribed: number; }; display_name?: string; program_template?: { id: string; body: formatted_text; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: program; }; scheduled_at?: string; }`\n  The Program object represents an email campaign. It defines the sending behavior and tracks engagement metrics.\n\n  - `id: string`\n  - `created_at: string`\n  - `status: 'draft' | 'published' | 'paused' | 'archived'`\n  - `track_clicks: boolean`\n  - `track_opens: boolean`\n  - `trigger: 'api' | 'broadcast'`\n  - `type: 'program'`\n  - `updated_at: string`\n  - `activity_metrics?: { bounced: number; clicked: number; complained: number; failed: number; opened: number; sent: number; shielded: number; unsubscribed: number; }`\n  - `display_name?: string`\n  - `program_template?: { id: string; body: { markdown?: string; }; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: object; display_name?: string; program_template?: program_template; scheduled_at?: string; }; }`\n  - `scheduled_at?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst program = await client.programs.retrieve('id');\n\nconsole.log(program);\n```",
  },
  {
    name: 'list',
    endpoint: '/programs',
    httpMethod: 'get',
    summary: 'List programs',
    description: 'Returns a list of your marketing programs.',
    stainlessPath: '(resource) programs > (method) list',
    qualified: 'client.programs.list',
    params: ['after?: string;', 'before?: string;', 'limit?: number;'],
    response:
      "{ id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: { bounced: number; clicked: number; complained: number; failed: number; opened: number; sent: number; shielded: number; unsubscribed: number; }; display_name?: string; program_template?: { id: string; body: formatted_text; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: program; }; scheduled_at?: string; }",
    markdown:
      "## list\n\n`client.programs.list(after?: string, before?: string, limit?: number): { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: object; display_name?: string; program_template?: program_template; scheduled_at?: string; }`\n\n**get** `/programs`\n\nReturns a list of your marketing programs.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: { bounced: number; clicked: number; complained: number; failed: number; opened: number; sent: number; shielded: number; unsubscribed: number; }; display_name?: string; program_template?: { id: string; body: formatted_text; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: program; }; scheduled_at?: string; }`\n  The Program object represents an email campaign. It defines the sending behavior and tracks engagement metrics.\n\n  - `id: string`\n  - `created_at: string`\n  - `status: 'draft' | 'published' | 'paused' | 'archived'`\n  - `track_clicks: boolean`\n  - `track_opens: boolean`\n  - `trigger: 'api' | 'broadcast'`\n  - `type: 'program'`\n  - `updated_at: string`\n  - `activity_metrics?: { bounced: number; clicked: number; complained: number; failed: number; opened: number; sent: number; shielded: number; unsubscribed: number; }`\n  - `display_name?: string`\n  - `program_template?: { id: string; body: { markdown?: string; }; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: object; display_name?: string; program_template?: program_template; scheduled_at?: string; }; }`\n  - `scheduled_at?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const program of client.programs.list()) {\n  console.log(program);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/program_templates/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a program template',
    description: 'Retrieves the details of an existing program template.',
    stainlessPath: '(resource) program_templates > (method) retrieve',
    qualified: 'client.programTemplates.retrieve',
    params: ['id: string;', "include?: 'program'[];"],
    response:
      "{ id: string; body: { markdown?: string; }; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: object; display_name?: string; program_template?: program_template; scheduled_at?: string; }; }",
    markdown:
      "## retrieve\n\n`client.programTemplates.retrieve(id: string, include?: 'program'[]): { id: string; body: formatted_text; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: program; }`\n\n**get** `/program_templates/{id}`\n\nRetrieves the details of an existing program template.\n\n### Parameters\n\n- `id: string`\n\n- `include?: 'program'[]`\n  Specifies which related objects to include in the response. Valid option is `program`.\n\n### Returns\n\n- `{ id: string; body: { markdown?: string; }; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: object; display_name?: string; program_template?: program_template; scheduled_at?: string; }; }`\n  The ProgramTemplate object defines the content of a message sent by a `Program`, including support for Liquid templating.\n\n  - `id: string`\n  - `body: { markdown?: string; }`\n  - `created_at: string`\n  - `subject: string`\n  - `type: 'program_template'`\n  - `updated_at: string`\n  - `program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: { bounced: number; clicked: number; complained: number; failed: number; opened: number; sent: number; shielded: number; unsubscribed: number; }; display_name?: string; program_template?: { id: string; body: formatted_text; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: program; }; scheduled_at?: string; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst programTemplate = await client.programTemplates.retrieve('id');\n\nconsole.log(programTemplate);\n```",
  },
  {
    name: 'list',
    endpoint: '/program_templates',
    httpMethod: 'get',
    summary: 'List program templates',
    description: 'Returns a list of your program templates.',
    stainlessPath: '(resource) program_templates > (method) list',
    qualified: 'client.programTemplates.list',
    params: ['after?: string;', 'before?: string;', "include?: 'program'[];", 'limit?: number;'],
    response:
      "{ id: string; body: { markdown?: string; }; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: object; display_name?: string; program_template?: program_template; scheduled_at?: string; }; }",
    markdown:
      "## list\n\n`client.programTemplates.list(after?: string, before?: string, include?: 'program'[], limit?: number): { id: string; body: formatted_text; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: program; }`\n\n**get** `/program_templates`\n\nReturns a list of your program templates.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `include?: 'program'[]`\n  Specifies which related objects to include in the response. Valid option is `program`.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; body: { markdown?: string; }; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: object; display_name?: string; program_template?: program_template; scheduled_at?: string; }; }`\n  The ProgramTemplate object defines the content of a message sent by a `Program`, including support for Liquid templating.\n\n  - `id: string`\n  - `body: { markdown?: string; }`\n  - `created_at: string`\n  - `subject: string`\n  - `type: 'program_template'`\n  - `updated_at: string`\n  - `program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: { bounced: number; clicked: number; complained: number; failed: number; opened: number; sent: number; shielded: number; unsubscribed: number; }; display_name?: string; program_template?: { id: string; body: formatted_text; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: program; }; scheduled_at?: string; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const programTemplate of client.programTemplates.list()) {\n  console.log(programTemplate);\n}\n```",
  },
  {
    name: 'send',
    endpoint: '/program_messages',
    httpMethod: 'post',
    summary: 'Send a message',
    description: 'Sends a message using a program template.',
    stainlessPath: '(resource) program_messages > (method) send',
    qualified: 'client.programMessages.send',
    params: ['person: { email: string; };', 'program_template_id: string;', 'custom_variables?: object;'],
    response:
      "{ id: string; created_at: string; program_template: { id: string; body: formatted_text; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: program; }; type: 'program_message'; updated_at: string; }",
    markdown:
      "## send\n\n`client.programMessages.send(person: { email: string; }, program_template_id: string, custom_variables?: object): { id: string; created_at: string; program_template: program_template; type: 'program_message'; updated_at: string; }`\n\n**post** `/program_messages`\n\nSends a message using a program template.\n\n### Parameters\n\n- `person: { email: string; }`\n  The person to send the message to.\n  - `email: string`\n\n- `program_template_id: string`\n  The ID of the `ProgramTemplate` to use for sending the message.\n\n- `custom_variables?: object`\n  Any custom Liquid variables to be interpolated into the message template.\n\n### Returns\n\n- `{ id: string; created_at: string; program_template: { id: string; body: formatted_text; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: program; }; type: 'program_message'; updated_at: string; }`\n  Represents a single message sent as part of a `Program`.\n\n  - `id: string`\n  - `created_at: string`\n  - `program_template: { id: string; body: { markdown?: string; }; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: object; display_name?: string; program_template?: program_template; scheduled_at?: string; }; }`\n  - `type: 'program_message'`\n  - `updated_at: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst programMessage = await client.programMessages.send({\n  person: { email: 'person-132@example-132.com' },\n  program_template_id: '1CLJt2v6ZuRbtwPhmQtzxa',\n});\n\nconsole.log(programMessage);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/forms/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a form',
    description: 'Retrieves the details of an existing form.',
    stainlessPath: '(resource) forms > (method) retrieve',
    qualified: 'client.forms.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; collection: { id: string; core: boolean; created_at: string; fields: field[]; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; views?: view[]; }; created_at: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }",
    markdown:
      "## retrieve\n\n`client.forms.retrieve(id: string): { id: string; collection: collection; created_at: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }`\n\n**get** `/forms/{id}`\n\nRetrieves the details of an existing form.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; collection: { id: string; core: boolean; created_at: string; fields: field[]; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; views?: view[]; }; created_at: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }`\n  A Form provides a way to create `Items` in a `Collection`, often via a public URL for external users. Each form submission creates a new item.\n\n  - `id: string`\n  - `collection: { id: string; core: boolean; created_at: string; fields: object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object[]; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; views?: { id: string; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; collection?: collection; }[]; }`\n  - `created_at: string`\n  - `name: string`\n  - `pages_enabled: boolean`\n  - `type: 'form'`\n  - `updated_at: string`\n  - `pages_url?: string`\n  - `redirect_url?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst form = await client.forms.retrieve('id');\n\nconsole.log(form);\n```",
  },
  {
    name: 'list',
    endpoint: '/forms',
    httpMethod: 'get',
    summary: 'List forms',
    description: 'Returns a list of your forms.',
    stainlessPath: '(resource) forms > (method) list',
    qualified: 'client.forms.list',
    params: ['after?: string;', 'before?: string;', 'limit?: number;'],
    response:
      "{ id: string; collection: { id: string; core: boolean; created_at: string; fields: field[]; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; views?: view[]; }; created_at: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }",
    markdown:
      "## list\n\n`client.forms.list(after?: string, before?: string, limit?: number): { id: string; collection: collection; created_at: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }`\n\n**get** `/forms`\n\nReturns a list of your forms.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; collection: { id: string; core: boolean; created_at: string; fields: field[]; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; views?: view[]; }; created_at: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }`\n  A Form provides a way to create `Items` in a `Collection`, often via a public URL for external users. Each form submission creates a new item.\n\n  - `id: string`\n  - `collection: { id: string; core: boolean; created_at: string; fields: object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object[]; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; views?: { id: string; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; collection?: collection; }[]; }`\n  - `created_at: string`\n  - `name: string`\n  - `pages_enabled: boolean`\n  - `type: 'form'`\n  - `updated_at: string`\n  - `pages_url?: string`\n  - `redirect_url?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const form of client.forms.list()) {\n  console.log(form);\n}\n```",
  },
  {
    name: 'create',
    endpoint: '/unsubscribes',
    httpMethod: 'post',
    summary: 'Create an unsubscribe',
    description: 'Create a new unsubscribe.',
    stainlessPath: '(resource) unsubscribes > (method) create',
    qualified: 'client.unsubscribes.create',
    params: ['email: string;'],
    response: "{ created_at: string; email: string; type: 'unsubscribe'; }",
    markdown:
      "## create\n\n`client.unsubscribes.create(email: string): { created_at: string; email: string; type: 'unsubscribe'; }`\n\n**post** `/unsubscribes`\n\nCreate a new unsubscribe.\n\n### Parameters\n\n- `email: string`\n\n### Returns\n\n- `{ created_at: string; email: string; type: 'unsubscribe'; }`\n\n  - `created_at: string`\n  - `email: string`\n  - `type: 'unsubscribe'`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst unsubscribe = await client.unsubscribes.create({ email: 'yoda@moonbase.ai' });\n\nconsole.log(unsubscribe);\n```",
  },
  {
    name: 'list',
    endpoint: '/unsubscribes',
    httpMethod: 'get',
    summary: 'List unsubscribes',
    description: 'Returns a list of unsubscribes.',
    stainlessPath: '(resource) unsubscribes > (method) list',
    qualified: 'client.unsubscribes.list',
    params: ['after?: string;', 'before?: string;', 'limit?: number;'],
    response: "{ created_at: string; email: string; type: 'unsubscribe'; }",
    markdown:
      "## list\n\n`client.unsubscribes.list(after?: string, before?: string, limit?: number): { created_at: string; email: string; type: 'unsubscribe'; }`\n\n**get** `/unsubscribes`\n\nReturns a list of unsubscribes.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ created_at: string; email: string; type: 'unsubscribe'; }`\n\n  - `created_at: string`\n  - `email: string`\n  - `type: 'unsubscribe'`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const unsubscribe of client.unsubscribes.list()) {\n  console.log(unsubscribe);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/unsubscribes/{email}',
    httpMethod: 'delete',
    summary: 'Delete an unsubscribe',
    description: 'Permanently deletes an unsubscribe by email address.',
    stainlessPath: '(resource) unsubscribes > (method) delete',
    qualified: 'client.unsubscribes.delete',
    params: ['email: string;'],
    markdown:
      "## delete\n\n`client.unsubscribes.delete(email: string): void`\n\n**delete** `/unsubscribes/{email}`\n\nPermanently deletes an unsubscribe by email address.\n\n### Parameters\n\n- `email: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nawait client.unsubscribes.delete('email')\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/activities/{id}',
    httpMethod: 'get',
    summary: 'Retrieve an activity',
    description: 'Retrieves the details of an existing activity.',
    stainlessPath: '(resource) activities > (method) retrieve',
    qualified: 'client.activities.retrieve',
    params: ['id: string;'],
    response:
      "object | object | object | object | object | object | { id: string; file: pointer; occurred_at: string; related_item: item_pointer; type: 'activity/file_created'; } | object | object | object | object | object | object | object | object | object | object | object",
    markdown:
      "## retrieve\n\n`client.activities.retrieve(id: string): object | object | object | object | object | object | { id: string; file: pointer; occurred_at: string; related_item: item_pointer; type: 'activity/file_created'; } | object | object | object | object | object | object | object | object | object | object | object`\n\n**get** `/activities/{id}`\n\nRetrieves the details of an existing activity.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; call: object; occurred_at: string; type: 'activity/call_occurred'; } | { id: string; item: object; occurred_at: string; type: 'activity/form_submitted'; } | { id: string; message: object; occurred_at: string; type: 'activity/inbox_message_sent'; } | { id: string; item: object; occurred_at: string; type: 'activity/item_created'; } | { id: string; author: object; item: object; note: object; occurred_at: string; type: 'activity/item_mentioned'; } | { id: string; destination: object; initiator: object; occurred_at: string; source: object; type: 'activity/item_merged'; } | { id: string; file: { id: string; type: string; }; occurred_at: string; related_item: { id: string; collection: collection_pointer; type: 'item'; }; type: 'activity/file_created'; } | { id: string; meeting: object; occurred_at: string; type: 'activity/meeting_held'; } | { id: string; meeting: object; occurred_at: string; type: 'activity/meeting_scheduled'; } | { id: string; note: object; occurred_at: string; related_items: object[]; related_meeting: object; type: 'activity/note_created'; } | { id: string; occurred_at: string; program_message: object; recipient: object; type: 'activity/program_message_bounced'; bounce_type?: string; bounced_recipient_emails?: string[]; } | { id: string; occurred_at: string; program_message: object; recipient: object; type: 'activity/program_message_clicked'; link_text?: string; link_url_unsafe?: string; } | { id: string; occurred_at: string; program_message: object; recipient: object; type: 'activity/program_message_complained'; } | { id: string; occurred_at: string; program_message: object; recipient: object; type: 'activity/program_message_failed'; reason_code?: 'liquid_error' | 'person_missing_email' | 'message_contained_virus'; } | { id: string; occurred_at: string; program_message: object; recipient: object; type: 'activity/program_message_opened'; } | { id: string; occurred_at: string; program_message: object; recipient: object; type: 'activity/program_message_sent'; recipient_emails?: string[]; } | { id: string; occurred_at: string; program_message: object; recipient: object; type: 'activity/program_message_shielded'; reason_code?: 'person_previously_unsubscribed' | 'email_on_unsubscribe_list'; } | { id: string; occurred_at: string; program_message: object; recipient: object; type: 'activity/program_message_unsubscribed'; email?: string; }`\n  The Activity object represents a specific event that has occurred, such as a meeting being scheduled or a form being submitted.\n\nActivities are polymorphic; the `type` field indicates the specific activity that occurred, and the object will contain a property with a matching name that holds the details of that event. For example, an `activity/meeting_held` activity will contain a `meeting` property.\n\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst activity = await client.activities.retrieve('id');\n\nconsole.log(activity);\n```",
  },
  {
    name: 'list',
    endpoint: '/activities',
    httpMethod: 'get',
    summary: 'List activities',
    description: 'Returns a list of activities.',
    stainlessPath: '(resource) activities > (method) list',
    qualified: 'client.activities.list',
    params: [
      'after?: string;',
      'before?: string;',
      'filter?: { item_id?: { eq?: string; }; occurred_at?: { gte?: string; lte?: string; }; type?: { in?: string[]; }; };',
      'limit?: number;',
    ],
    response:
      "object | object | object | object | object | object | { id: string; file: pointer; occurred_at: string; related_item: item_pointer; type: 'activity/file_created'; } | object | object | object | object | object | object | object | object | object | object | object",
    markdown:
      "## list\n\n`client.activities.list(after?: string, before?: string, filter?: { item_id?: { eq?: string; }; occurred_at?: { gte?: string; lte?: string; }; type?: { in?: string[]; }; }, limit?: number): object | object | object | object | object | object | { id: string; file: pointer; occurred_at: string; related_item: item_pointer; type: 'activity/file_created'; } | object | object | object | object | object | object | object | object | object | object | object`\n\n**get** `/activities`\n\nReturns a list of activities.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `filter?: { item_id?: { eq?: string; }; occurred_at?: { gte?: string; lte?: string; }; type?: { in?: string[]; }; }`\n  Filter activities by type, date, or item.\n  - `item_id?: { eq?: string; }`\n  - `occurred_at?: { gte?: string; lte?: string; }`\n  - `type?: { in?: string[]; }`\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; call: object; occurred_at: string; type: 'activity/call_occurred'; } | { id: string; item: object; occurred_at: string; type: 'activity/form_submitted'; } | { id: string; message: object; occurred_at: string; type: 'activity/inbox_message_sent'; } | { id: string; item: object; occurred_at: string; type: 'activity/item_created'; } | { id: string; author: object; item: object; note: object; occurred_at: string; type: 'activity/item_mentioned'; } | { id: string; destination: object; initiator: object; occurred_at: string; source: object; type: 'activity/item_merged'; } | { id: string; file: { id: string; type: string; }; occurred_at: string; related_item: { id: string; collection: collection_pointer; type: 'item'; }; type: 'activity/file_created'; } | { id: string; meeting: object; occurred_at: string; type: 'activity/meeting_held'; } | { id: string; meeting: object; occurred_at: string; type: 'activity/meeting_scheduled'; } | { id: string; note: object; occurred_at: string; related_items: object[]; related_meeting: object; type: 'activity/note_created'; } | { id: string; occurred_at: string; program_message: object; recipient: object; type: 'activity/program_message_bounced'; bounce_type?: string; bounced_recipient_emails?: string[]; } | { id: string; occurred_at: string; program_message: object; recipient: object; type: 'activity/program_message_clicked'; link_text?: string; link_url_unsafe?: string; } | { id: string; occurred_at: string; program_message: object; recipient: object; type: 'activity/program_message_complained'; } | { id: string; occurred_at: string; program_message: object; recipient: object; type: 'activity/program_message_failed'; reason_code?: 'liquid_error' | 'person_missing_email' | 'message_contained_virus'; } | { id: string; occurred_at: string; program_message: object; recipient: object; type: 'activity/program_message_opened'; } | { id: string; occurred_at: string; program_message: object; recipient: object; type: 'activity/program_message_sent'; recipient_emails?: string[]; } | { id: string; occurred_at: string; program_message: object; recipient: object; type: 'activity/program_message_shielded'; reason_code?: 'person_previously_unsubscribed' | 'email_on_unsubscribe_list'; } | { id: string; occurred_at: string; program_message: object; recipient: object; type: 'activity/program_message_unsubscribed'; email?: string; }`\n  The Activity object represents a specific event that has occurred, such as a meeting being scheduled or a form being submitted.\n\nActivities are polymorphic; the `type` field indicates the specific activity that occurred, and the object will contain a property with a matching name that holds the details of that event. For example, an `activity/meeting_held` activity will contain a `meeting` property.\n\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const activity of client.activities.list()) {\n  console.log(activity);\n}\n```",
  },
  {
    name: 'create',
    endpoint: '/calls',
    httpMethod: 'post',
    summary: 'Log a call',
    description: 'Logs a phone call.',
    stainlessPath: '(resource) calls > (method) create',
    qualified: 'client.calls.create',
    params: [
      "direction: 'incoming' | 'outgoing';",
      "participants: { phone: string; role: 'caller' | 'callee' | 'other'; }[];",
      "provider: 'openphone' | 'user' | 'zoom_phone';",
      'provider_id: string;',
      'provider_status: string;',
      'start_at: string;',
      'answered_at?: string;',
      'end_at?: string;',
      'provider_metadata?: object;',
      "recordings?: { content_type: 'audio/mpeg'; provider_id: string; url: string; }[];",
      'transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; };',
    ],
    response:
      "{ id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: object; person?: object; }[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; provider_metadata?: object; summary?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; transcript?: { cues: { from: number; speaker: object; text: string; to: number; }[]; }; }",
    markdown:
      "## create\n\n`client.calls.create(direction: 'incoming' | 'outgoing', participants: { phone: string; role: 'caller' | 'callee' | 'other'; }[], provider: 'openphone' | 'user' | 'zoom_phone', provider_id: string, provider_status: string, start_at: string, answered_at?: string, end_at?: string, provider_metadata?: object, recordings?: { content_type: 'audio/mpeg'; provider_id: string; url: string; }[], transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; }): { id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: object[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: note; provider_metadata?: object; summary?: note; transcript?: object; }`\n\n**post** `/calls`\n\nLogs a phone call.\n\n### Parameters\n\n- `direction: 'incoming' | 'outgoing'`\n  The direction of the call, either `incoming` or `outgoing`.\n\n- `participants: { phone: string; role: 'caller' | 'callee' | 'other'; }[]`\n  An array of participants involved in the call.\n\n- `provider: 'openphone' | 'user' | 'zoom_phone'`\n  The name of the phone provider that handled the call (e.g., `openphone`).\n\n- `provider_id: string`\n  The unique identifier for the call from the provider's system.\n\n- `provider_status: string`\n  The status of the call.\n\n- `start_at: string`\n  The time the call started, as an ISO 8601 timestamp in UTC.\n\n- `answered_at?: string`\n  The time the call was answered, as an ISO 8601 timestamp in UTC.\n\n- `end_at?: string`\n  The time the call ended, as an ISO 8601 timestamp in UTC.\n\n- `provider_metadata?: object`\n  A hash of additional metadata from the provider.\n\n- `recordings?: { content_type: 'audio/mpeg'; provider_id: string; url: string; }[]`\n  Any recordings associated with the call.\n\n- `transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; }`\n  A transcript of the call.\n  - `cues: { from: number; speaker: string; text: string; to: number; }[]`\n    A list of cues that identify the text spoken in specific time slices of the call.\n\n### Returns\n\n- `{ id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: object; person?: object; }[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; provider_metadata?: object; summary?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; transcript?: { cues: { from: number; speaker: object; text: string; to: number; }[]; }; }`\n  The Call object represents a phone call that has been logged in the system. It contains details about the participants, timing, and outcome of the call.\n\n  - `id: string`\n  - `created_at: string`\n  - `direction: 'incoming' | 'outgoing'`\n  - `participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: { id: string; type: string; }; person?: { id: string; type: string; }; }[]`\n  - `provider: 'openphone' | 'user' | 'zoom_phone'`\n  - `provider_id: string`\n  - `provider_status: string`\n  - `start_at: string`\n  - `type: 'call'`\n  - `updated_at: string`\n  - `answered_at?: string`\n  - `end_at?: string`\n  - `note?: { id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `provider_metadata?: object`\n  - `summary?: { id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `transcript?: { cues: { from: number; speaker: { attendee_id?: string; label?: string; }; text: string; to: number; }[]; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst call = await client.calls.create({\n  direction: 'incoming',\n  participants: [{ phone: '+14155551212', role: 'caller' }, { phone: '+16505551212', role: 'callee' }],\n  provider: 'openphone',\n  provider_id: 'openphone_id_000000000001',\n  provider_status: 'completed',\n  start_at: '2025-02-17T15:00:00.000Z',\n});\n\nconsole.log(call);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/calls/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a call',
    description: 'Retrieves the details of an existing call.',
    stainlessPath: '(resource) calls > (method) retrieve',
    qualified: 'client.calls.retrieve',
    params: ['id: string;', "include?: 'transcript' | 'note' | 'summary'[];"],
    response:
      "{ id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: object; person?: object; }[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; provider_metadata?: object; summary?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; transcript?: { cues: { from: number; speaker: object; text: string; to: number; }[]; }; }",
    markdown:
      "## retrieve\n\n`client.calls.retrieve(id: string, include?: 'transcript' | 'note' | 'summary'[]): { id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: object[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: note; provider_metadata?: object; summary?: note; transcript?: object; }`\n\n**get** `/calls/{id}`\n\nRetrieves the details of an existing call.\n\n### Parameters\n\n- `id: string`\n\n- `include?: 'transcript' | 'note' | 'summary'[]`\n  Specifies which related objects to include in the response. Valid options are `transcript`, `note`, and `summary`.\n\n### Returns\n\n- `{ id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: object; person?: object; }[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; provider_metadata?: object; summary?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; transcript?: { cues: { from: number; speaker: object; text: string; to: number; }[]; }; }`\n  The Call object represents a phone call that has been logged in the system. It contains details about the participants, timing, and outcome of the call.\n\n  - `id: string`\n  - `created_at: string`\n  - `direction: 'incoming' | 'outgoing'`\n  - `participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: { id: string; type: string; }; person?: { id: string; type: string; }; }[]`\n  - `provider: 'openphone' | 'user' | 'zoom_phone'`\n  - `provider_id: string`\n  - `provider_status: string`\n  - `start_at: string`\n  - `type: 'call'`\n  - `updated_at: string`\n  - `answered_at?: string`\n  - `end_at?: string`\n  - `note?: { id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `provider_metadata?: object`\n  - `summary?: { id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `transcript?: { cues: { from: number; speaker: { attendee_id?: string; label?: string; }; text: string; to: number; }[]; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst call = await client.calls.retrieve('id');\n\nconsole.log(call);\n```",
  },
  {
    name: 'list',
    endpoint: '/calls',
    httpMethod: 'get',
    summary: 'List calls',
    description: 'Returns a list of calls.',
    stainlessPath: '(resource) calls > (method) list',
    qualified: 'client.calls.list',
    params: ['after?: string;', 'before?: string;', 'limit?: number;'],
    response:
      "{ id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: object; person?: object; }[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; provider_metadata?: object; summary?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; transcript?: { cues: { from: number; speaker: object; text: string; to: number; }[]; }; }",
    markdown:
      "## list\n\n`client.calls.list(after?: string, before?: string, limit?: number): { id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: object[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: note; provider_metadata?: object; summary?: note; transcript?: object; }`\n\n**get** `/calls`\n\nReturns a list of calls.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: object; person?: object; }[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; provider_metadata?: object; summary?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; transcript?: { cues: { from: number; speaker: object; text: string; to: number; }[]; }; }`\n  The Call object represents a phone call that has been logged in the system. It contains details about the participants, timing, and outcome of the call.\n\n  - `id: string`\n  - `created_at: string`\n  - `direction: 'incoming' | 'outgoing'`\n  - `participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: { id: string; type: string; }; person?: { id: string; type: string; }; }[]`\n  - `provider: 'openphone' | 'user' | 'zoom_phone'`\n  - `provider_id: string`\n  - `provider_status: string`\n  - `start_at: string`\n  - `type: 'call'`\n  - `updated_at: string`\n  - `answered_at?: string`\n  - `end_at?: string`\n  - `note?: { id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `provider_metadata?: object`\n  - `summary?: { id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `transcript?: { cues: { from: number; speaker: { attendee_id?: string; label?: string; }; text: string; to: number; }[]; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const call of client.calls.list()) {\n  console.log(call);\n}\n```",
  },
  {
    name: 'upsert',
    endpoint: '/calls/upsert',
    httpMethod: 'post',
    summary: 'Create or update a call',
    description: 'Find and update an existing phone call, or create a new one.',
    stainlessPath: '(resource) calls > (method) upsert',
    qualified: 'client.calls.upsert',
    params: [
      "direction: 'incoming' | 'outgoing';",
      "participants: { phone: string; role: 'caller' | 'callee' | 'other'; }[];",
      "provider: 'openphone' | 'user' | 'zoom_phone';",
      'provider_id: string;',
      'provider_status: string;',
      'start_at: string;',
      'answered_at?: string;',
      'end_at?: string;',
      'provider_metadata?: object;',
      "recordings?: { content_type: 'audio/mpeg'; provider_id: string; url: string; }[];",
      'transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; };',
    ],
    response:
      "{ id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: object; person?: object; }[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; provider_metadata?: object; summary?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; transcript?: { cues: { from: number; speaker: object; text: string; to: number; }[]; }; }",
    markdown:
      "## upsert\n\n`client.calls.upsert(direction: 'incoming' | 'outgoing', participants: { phone: string; role: 'caller' | 'callee' | 'other'; }[], provider: 'openphone' | 'user' | 'zoom_phone', provider_id: string, provider_status: string, start_at: string, answered_at?: string, end_at?: string, provider_metadata?: object, recordings?: { content_type: 'audio/mpeg'; provider_id: string; url: string; }[], transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; }): { id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: object[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: note; provider_metadata?: object; summary?: note; transcript?: object; }`\n\n**post** `/calls/upsert`\n\nFind and update an existing phone call, or create a new one.\n\n### Parameters\n\n- `direction: 'incoming' | 'outgoing'`\n  The direction of the call, either `incoming` or `outgoing`.\n\n- `participants: { phone: string; role: 'caller' | 'callee' | 'other'; }[]`\n  An array of participants involved in the call.\n\n- `provider: 'openphone' | 'user' | 'zoom_phone'`\n  The name of the phone provider that handled the call (e.g., `openphone`).\n\n- `provider_id: string`\n  The unique identifier for the call from the provider's system.\n\n- `provider_status: string`\n  The status of the call.\n\n- `start_at: string`\n  The time the call started, as an ISO 8601 timestamp in UTC.\n\n- `answered_at?: string`\n  The time the call was answered, as an ISO 8601 timestamp in UTC.\n\n- `end_at?: string`\n  The time the call ended, as an ISO 8601 timestamp in UTC.\n\n- `provider_metadata?: object`\n  A hash of additional metadata from the provider.\n\n- `recordings?: { content_type: 'audio/mpeg'; provider_id: string; url: string; }[]`\n  Any recordings associated with the call.\n\n- `transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; }`\n  A transcript of the call.\n  - `cues: { from: number; speaker: string; text: string; to: number; }[]`\n    A list of cues that identify the text spoken in specific time slices of the call.\n\n### Returns\n\n- `{ id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: object; person?: object; }[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; provider_metadata?: object; summary?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; transcript?: { cues: { from: number; speaker: object; text: string; to: number; }[]; }; }`\n  The Call object represents a phone call that has been logged in the system. It contains details about the participants, timing, and outcome of the call.\n\n  - `id: string`\n  - `created_at: string`\n  - `direction: 'incoming' | 'outgoing'`\n  - `participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: { id: string; type: string; }; person?: { id: string; type: string; }; }[]`\n  - `provider: 'openphone' | 'user' | 'zoom_phone'`\n  - `provider_id: string`\n  - `provider_status: string`\n  - `start_at: string`\n  - `type: 'call'`\n  - `updated_at: string`\n  - `answered_at?: string`\n  - `end_at?: string`\n  - `note?: { id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `provider_metadata?: object`\n  - `summary?: { id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `transcript?: { cues: { from: number; speaker: { attendee_id?: string; label?: string; }; text: string; to: number; }[]; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst call = await client.calls.upsert({\n  direction: 'incoming',\n  participants: [{ phone: '+14155551212', role: 'caller' }, { phone: '+16505551212', role: 'callee' }],\n  provider: 'openphone',\n  provider_id: 'openphone_id_000000000006',\n  provider_status: 'completed',\n  start_at: '2025-02-17T15:00:00.000Z',\n});\n\nconsole.log(call);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/files/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a file',
    description: 'Retrieves the details of an existing file.',
    stainlessPath: '(resource) files > (method) retrieve',
    qualified: 'client.files.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; associations: { id: string; collection: collection_pointer; type: 'item'; }[]; created_at: string; download_url: string; filename: string; name: string; size: number; type: 'file'; updated_at: string; }",
    markdown:
      "## retrieve\n\n`client.files.retrieve(id: string): { id: string; associations: item_pointer[]; created_at: string; download_url: string; filename: string; name: string; size: number; type: 'file'; updated_at: string; }`\n\n**get** `/files/{id}`\n\nRetrieves the details of an existing file.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; associations: { id: string; collection: collection_pointer; type: 'item'; }[]; created_at: string; download_url: string; filename: string; name: string; size: number; type: 'file'; updated_at: string; }`\n  The File object represents a file that has been uploaded to your library.\n\n  - `id: string`\n  - `associations: { id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; }[]`\n  - `created_at: string`\n  - `download_url: string`\n  - `filename: string`\n  - `name: string`\n  - `size: number`\n  - `type: 'file'`\n  - `updated_at: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst moonbaseFile = await client.files.retrieve('id');\n\nconsole.log(moonbaseFile);\n```",
  },
  {
    name: 'list',
    endpoint: '/files',
    httpMethod: 'get',
    summary: 'List files',
    description: 'Returns a list of files that you have uploaded.',
    stainlessPath: '(resource) files > (method) list',
    qualified: 'client.files.list',
    params: ['after?: string;', 'before?: string;', 'limit?: number;'],
    response:
      "{ id: string; associations: { id: string; collection: collection_pointer; type: 'item'; }[]; created_at: string; download_url: string; filename: string; name: string; size: number; type: 'file'; updated_at: string; }",
    markdown:
      "## list\n\n`client.files.list(after?: string, before?: string, limit?: number): { id: string; associations: item_pointer[]; created_at: string; download_url: string; filename: string; name: string; size: number; type: 'file'; updated_at: string; }`\n\n**get** `/files`\n\nReturns a list of files that you have uploaded.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; associations: { id: string; collection: collection_pointer; type: 'item'; }[]; created_at: string; download_url: string; filename: string; name: string; size: number; type: 'file'; updated_at: string; }`\n  The File object represents a file that has been uploaded to your library.\n\n  - `id: string`\n  - `associations: { id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; }[]`\n  - `created_at: string`\n  - `download_url: string`\n  - `filename: string`\n  - `name: string`\n  - `size: number`\n  - `type: 'file'`\n  - `updated_at: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const moonbaseFile of client.files.list()) {\n  console.log(moonbaseFile);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/files/{id}',
    httpMethod: 'delete',
    summary: 'Delete a file',
    description: 'Permanently deletes a file.',
    stainlessPath: '(resource) files > (method) delete',
    qualified: 'client.files.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.files.delete(id: string): void`\n\n**delete** `/files/{id}`\n\nPermanently deletes a file.\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nawait client.files.delete('id')\n```",
  },
  {
    name: 'upload',
    endpoint: '/files',
    httpMethod: 'post',
    summary: 'Upload a file',
    description: 'Upload a file',
    stainlessPath: '(resource) files > (method) upload',
    qualified: 'client.files.upload',
    params: ['file: string;', 'associations?: { id: string; type: string; }[];', 'name?: string;'],
    response:
      "{ id: string; associations: { id: string; collection: collection_pointer; type: 'item'; }[]; created_at: string; download_url: string; filename: string; name: string; size: number; type: 'file'; updated_at: string; }",
    markdown:
      "## upload\n\n`client.files.upload(file: string, associations?: { id: string; type: string; }[], name?: string): { id: string; associations: item_pointer[]; created_at: string; download_url: string; filename: string; name: string; size: number; type: 'file'; updated_at: string; }`\n\n**post** `/files`\n\nUpload a file\n\n### Parameters\n\n- `file: string`\n  The File object to be uploaded.\n\n- `associations?: { id: string; type: string; }[]`\n  Link the File to Moonbase items like a person, organization, deal, task, or an item in a custom collection.\n\n- `name?: string`\n  The display name of the file.\n\n### Returns\n\n- `{ id: string; associations: { id: string; collection: collection_pointer; type: 'item'; }[]; created_at: string; download_url: string; filename: string; name: string; size: number; type: 'file'; updated_at: string; }`\n  The File object represents a file that has been uploaded to your library.\n\n  - `id: string`\n  - `associations: { id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; }[]`\n  - `created_at: string`\n  - `download_url: string`\n  - `filename: string`\n  - `name: string`\n  - `size: number`\n  - `type: 'file'`\n  - `updated_at: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst moonbaseFile = await client.files.upload({ file: fs.createReadStream('path/to/file') });\n\nconsole.log(moonbaseFile);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/meetings/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a meeting',
    description: 'Retrieves the details of an existing meeting.',
    stainlessPath: '(resource) meetings > (method) retrieve',
    qualified: 'client.meetings.retrieve',
    params: ['id: string;', "include?: 'organizer' | 'attendees' | 'transcript' | 'note' | 'summary'[];"],
    response:
      "{ id: string; created_at: string; end_at: string; i_cal_uid: string; provider_id: string; start_at: string; time_zone: string; type: 'meeting'; updated_at: string; attendees?: { id: string; email: string; type: 'meeting_attendee'; organization?: pointer; person?: pointer; }[]; description?: string; duration?: number; location?: string; note?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; organizer?: { id: string; email: string; type: 'meeting_organizer'; organization?: pointer; person?: pointer; }; provider_uri?: string; recording_url?: string; summary?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; title?: string; transcript?: { cues: { from: number; speaker: object; text: string; to: number; }[]; }; }",
    markdown:
      "## retrieve\n\n`client.meetings.retrieve(id: string, include?: 'organizer' | 'attendees' | 'transcript' | 'note' | 'summary'[]): { id: string; created_at: string; end_at: string; i_cal_uid: string; provider_id: string; start_at: string; time_zone: string; type: 'meeting'; updated_at: string; attendees?: attendee[]; description?: string; duration?: number; location?: string; note?: note; organizer?: organizer; provider_uri?: string; recording_url?: string; summary?: note; title?: string; transcript?: object; }`\n\n**get** `/meetings/{id}`\n\nRetrieves the details of an existing meeting.\n\n### Parameters\n\n- `id: string`\n\n- `include?: 'organizer' | 'attendees' | 'transcript' | 'note' | 'summary'[]`\n  Specifies which related objects to include in the response. Valid options are `organizer`, `attendees`, `transcript`, `note`, and `summary`.\n\n### Returns\n\n- `{ id: string; created_at: string; end_at: string; i_cal_uid: string; provider_id: string; start_at: string; time_zone: string; type: 'meeting'; updated_at: string; attendees?: { id: string; email: string; type: 'meeting_attendee'; organization?: pointer; person?: pointer; }[]; description?: string; duration?: number; location?: string; note?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; organizer?: { id: string; email: string; type: 'meeting_organizer'; organization?: pointer; person?: pointer; }; provider_uri?: string; recording_url?: string; summary?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; title?: string; transcript?: { cues: { from: number; speaker: object; text: string; to: number; }[]; }; }`\n  The Meeting object represents a calendar event. It includes details about the participants, timing, and associated content like summaries and recordings.\n\n  - `id: string`\n  - `created_at: string`\n  - `end_at: string`\n  - `i_cal_uid: string`\n  - `provider_id: string`\n  - `start_at: string`\n  - `time_zone: string`\n  - `type: 'meeting'`\n  - `updated_at: string`\n  - `attendees?: { id: string; email: string; type: 'meeting_attendee'; organization?: { id: string; type: string; }; person?: { id: string; type: string; }; }[]`\n  - `description?: string`\n  - `duration?: number`\n  - `location?: string`\n  - `note?: { id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `organizer?: { id: string; email: string; type: 'meeting_organizer'; organization?: { id: string; type: string; }; person?: { id: string; type: string; }; }`\n  - `provider_uri?: string`\n  - `recording_url?: string`\n  - `summary?: { id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `title?: string`\n  - `transcript?: { cues: { from: number; speaker: { attendee_id?: string; label?: string; }; text: string; to: number; }[]; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst meeting = await client.meetings.retrieve('id');\n\nconsole.log(meeting);\n```",
  },
  {
    name: 'update',
    endpoint: '/meetings/{id}',
    httpMethod: 'patch',
    summary: 'Update a meeting',
    description: 'Adds a transcript or recording to an existing meeting.',
    stainlessPath: '(resource) meetings > (method) update',
    qualified: 'client.meetings.update',
    params: [
      'id: string;',
      "recording?: { content_type: 'video/mp4'; provider_id: string; url: string; };",
      'transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; provider: string; provider_id: string; };',
    ],
    response:
      "{ id: string; created_at: string; end_at: string; i_cal_uid: string; provider_id: string; start_at: string; time_zone: string; type: 'meeting'; updated_at: string; attendees?: { id: string; email: string; type: 'meeting_attendee'; organization?: pointer; person?: pointer; }[]; description?: string; duration?: number; location?: string; note?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; organizer?: { id: string; email: string; type: 'meeting_organizer'; organization?: pointer; person?: pointer; }; provider_uri?: string; recording_url?: string; summary?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; title?: string; transcript?: { cues: { from: number; speaker: object; text: string; to: number; }[]; }; }",
    markdown:
      "## update\n\n`client.meetings.update(id: string, recording?: { content_type: 'video/mp4'; provider_id: string; url: string; }, transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; provider: string; provider_id: string; }): { id: string; created_at: string; end_at: string; i_cal_uid: string; provider_id: string; start_at: string; time_zone: string; type: 'meeting'; updated_at: string; attendees?: attendee[]; description?: string; duration?: number; location?: string; note?: note; organizer?: organizer; provider_uri?: string; recording_url?: string; summary?: note; title?: string; transcript?: object; }`\n\n**patch** `/meetings/{id}`\n\nAdds a transcript or recording to an existing meeting.\n\n### Parameters\n\n- `id: string`\n\n- `recording?: { content_type: 'video/mp4'; provider_id: string; url: string; }`\n  A video recording of the meeting.\n  - `content_type: 'video/mp4'`\n    The content type of the recording. Note that only `video/mp4` is supported at this time.\n  - `provider_id: string`\n    The unique identifier for the recording from the provider's system.\n  - `url: string`\n    The URL pointing to the recording.\n\n- `transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; provider: string; provider_id: string; }`\n  The meeting transcript.\n  - `cues: { from: number; speaker: string; text: string; to: number; }[]`\n    A list of cues that identify the text spoken in specific time slices of the meeting.\n  - `provider: string`\n    Identifies the source of the transcript.\n  - `provider_id: string`\n    The unique identifier for the transcript from the provider's system.\n\n### Returns\n\n- `{ id: string; created_at: string; end_at: string; i_cal_uid: string; provider_id: string; start_at: string; time_zone: string; type: 'meeting'; updated_at: string; attendees?: { id: string; email: string; type: 'meeting_attendee'; organization?: pointer; person?: pointer; }[]; description?: string; duration?: number; location?: string; note?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; organizer?: { id: string; email: string; type: 'meeting_organizer'; organization?: pointer; person?: pointer; }; provider_uri?: string; recording_url?: string; summary?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; title?: string; transcript?: { cues: { from: number; speaker: object; text: string; to: number; }[]; }; }`\n  The Meeting object represents a calendar event. It includes details about the participants, timing, and associated content like summaries and recordings.\n\n  - `id: string`\n  - `created_at: string`\n  - `end_at: string`\n  - `i_cal_uid: string`\n  - `provider_id: string`\n  - `start_at: string`\n  - `time_zone: string`\n  - `type: 'meeting'`\n  - `updated_at: string`\n  - `attendees?: { id: string; email: string; type: 'meeting_attendee'; organization?: { id: string; type: string; }; person?: { id: string; type: string; }; }[]`\n  - `description?: string`\n  - `duration?: number`\n  - `location?: string`\n  - `note?: { id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `organizer?: { id: string; email: string; type: 'meeting_organizer'; organization?: { id: string; type: string; }; person?: { id: string; type: string; }; }`\n  - `provider_uri?: string`\n  - `recording_url?: string`\n  - `summary?: { id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `title?: string`\n  - `transcript?: { cues: { from: number; speaker: { attendee_id?: string; label?: string; }; text: string; to: number; }[]; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst meeting = await client.meetings.update('id');\n\nconsole.log(meeting);\n```",
  },
  {
    name: 'list',
    endpoint: '/meetings',
    httpMethod: 'get',
    summary: 'List meetings',
    description: 'Returns a list of meetings.',
    stainlessPath: '(resource) meetings > (method) list',
    qualified: 'client.meetings.list',
    params: [
      'after?: string;',
      'before?: string;',
      'filter?: { i_cal_uid?: { eq?: string; }; };',
      'limit?: number;',
    ],
    response:
      "{ id: string; created_at: string; end_at: string; i_cal_uid: string; provider_id: string; start_at: string; time_zone: string; type: 'meeting'; updated_at: string; attendees?: { id: string; email: string; type: 'meeting_attendee'; organization?: pointer; person?: pointer; }[]; description?: string; duration?: number; location?: string; note?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; organizer?: { id: string; email: string; type: 'meeting_organizer'; organization?: pointer; person?: pointer; }; provider_uri?: string; recording_url?: string; summary?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; title?: string; transcript?: { cues: { from: number; speaker: object; text: string; to: number; }[]; }; }",
    markdown:
      "## list\n\n`client.meetings.list(after?: string, before?: string, filter?: { i_cal_uid?: { eq?: string; }; }, limit?: number): { id: string; created_at: string; end_at: string; i_cal_uid: string; provider_id: string; start_at: string; time_zone: string; type: 'meeting'; updated_at: string; attendees?: attendee[]; description?: string; duration?: number; location?: string; note?: note; organizer?: organizer; provider_uri?: string; recording_url?: string; summary?: note; title?: string; transcript?: object; }`\n\n**get** `/meetings`\n\nReturns a list of meetings.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `filter?: { i_cal_uid?: { eq?: string; }; }`\n  - `i_cal_uid?: { eq?: string; }`\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; created_at: string; end_at: string; i_cal_uid: string; provider_id: string; start_at: string; time_zone: string; type: 'meeting'; updated_at: string; attendees?: { id: string; email: string; type: 'meeting_attendee'; organization?: pointer; person?: pointer; }[]; description?: string; duration?: number; location?: string; note?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; organizer?: { id: string; email: string; type: 'meeting_organizer'; organization?: pointer; person?: pointer; }; provider_uri?: string; recording_url?: string; summary?: { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; title?: string; transcript?: { cues: { from: number; speaker: object; text: string; to: number; }[]; }; }`\n  The Meeting object represents a calendar event. It includes details about the participants, timing, and associated content like summaries and recordings.\n\n  - `id: string`\n  - `created_at: string`\n  - `end_at: string`\n  - `i_cal_uid: string`\n  - `provider_id: string`\n  - `start_at: string`\n  - `time_zone: string`\n  - `type: 'meeting'`\n  - `updated_at: string`\n  - `attendees?: { id: string; email: string; type: 'meeting_attendee'; organization?: { id: string; type: string; }; person?: { id: string; type: string; }; }[]`\n  - `description?: string`\n  - `duration?: number`\n  - `location?: string`\n  - `note?: { id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `organizer?: { id: string; email: string; type: 'meeting_organizer'; organization?: { id: string; type: string; }; person?: { id: string; type: string; }; }`\n  - `provider_uri?: string`\n  - `recording_url?: string`\n  - `summary?: { id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `title?: string`\n  - `transcript?: { cues: { from: number; speaker: { attendee_id?: string; label?: string; }; text: string; to: number; }[]; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const meeting of client.meetings.list()) {\n  console.log(meeting);\n}\n```",
  },
  {
    name: 'create',
    endpoint: '/notes',
    httpMethod: 'post',
    summary: 'Create a note',
    description: 'Create a new note.',
    stainlessPath: '(resource) notes > (method) create',
    qualified: 'client.notes.create',
    params: ['body: { markdown?: string; };', 'associations?: { id: string; type: string; }[];'],
    response:
      "{ id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }",
    markdown:
      "## create\n\n`client.notes.create(body: { markdown?: string; }, associations?: { id: string; type: string; }[]): { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }`\n\n**post** `/notes`\n\nCreate a new note.\n\n### Parameters\n\n- `body: { markdown?: string; }`\n  The main content of the note.\n  - `markdown?: string`\n    The content formatted as Markdown text.\n\n- `associations?: { id: string; type: string; }[]`\n  Link the Note to Moonbase items (person, organization, deal, task, or an item in a custom collection), meetings, or calls.\n\n### Returns\n\n- `{ id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  The Note object represents a block of text content, often used for meeting notes or summaries.\n\n  - `id: string`\n  - `associations: { id: string; type: string; }[]`\n  - `body: { markdown?: string; }`\n  - `created_at: string`\n  - `lock_version: number`\n  - `type: 'note'`\n  - `updated_at: string`\n  - `creator?: { id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; }`\n  - `summary?: string`\n  - `title?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst note = await client.notes.create({ body: {} });\n\nconsole.log(note);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/notes/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a note',
    description: 'Retrieves the details of an existing note.',
    stainlessPath: '(resource) notes > (method) retrieve',
    qualified: 'client.notes.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }",
    markdown:
      "## retrieve\n\n`client.notes.retrieve(id: string): { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }`\n\n**get** `/notes/{id}`\n\nRetrieves the details of an existing note.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  The Note object represents a block of text content, often used for meeting notes or summaries.\n\n  - `id: string`\n  - `associations: { id: string; type: string; }[]`\n  - `body: { markdown?: string; }`\n  - `created_at: string`\n  - `lock_version: number`\n  - `type: 'note'`\n  - `updated_at: string`\n  - `creator?: { id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; }`\n  - `summary?: string`\n  - `title?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst note = await client.notes.retrieve('id');\n\nconsole.log(note);\n```",
  },
  {
    name: 'update',
    endpoint: '/notes/{id}',
    httpMethod: 'patch',
    summary: 'Update a note',
    description: 'Update an existing note.',
    stainlessPath: '(resource) notes > (method) update',
    qualified: 'client.notes.update',
    params: ['id: string;', 'body: { markdown?: string; };', 'lock_version: number;'],
    response:
      "{ id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }",
    markdown:
      "## update\n\n`client.notes.update(id: string, body: { markdown?: string; }, lock_version: number): { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }`\n\n**patch** `/notes/{id}`\n\nUpdate an existing note.\n\n### Parameters\n\n- `id: string`\n\n- `body: { markdown?: string; }`\n  The main content of the note.\n  - `markdown?: string`\n    The content formatted as Markdown text.\n\n- `lock_version: number`\n  The current lock version of the note for optimistic concurrency control.\n\n### Returns\n\n- `{ id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  The Note object represents a block of text content, often used for meeting notes or summaries.\n\n  - `id: string`\n  - `associations: { id: string; type: string; }[]`\n  - `body: { markdown?: string; }`\n  - `created_at: string`\n  - `lock_version: number`\n  - `type: 'note'`\n  - `updated_at: string`\n  - `creator?: { id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; }`\n  - `summary?: string`\n  - `title?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst note = await client.notes.update('id', {\n  body: {},\n  lock_version: 0,\n});\n\nconsole.log(note);\n```",
  },
  {
    name: 'list',
    endpoint: '/notes',
    httpMethod: 'get',
    summary: 'List notes',
    description: 'Returns a list of your notes.',
    stainlessPath: '(resource) notes > (method) list',
    qualified: 'client.notes.list',
    params: ['after?: string;', 'before?: string;', 'limit?: number;'],
    response:
      "{ id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }",
    markdown:
      "## list\n\n`client.notes.list(after?: string, before?: string, limit?: number): { id: string; associations: pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }`\n\n**get** `/notes`\n\nReturns a list of your notes.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; associations: { id: string; type: string; }[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  The Note object represents a block of text content, often used for meeting notes or summaries.\n\n  - `id: string`\n  - `associations: { id: string; type: string; }[]`\n  - `body: { markdown?: string; }`\n  - `created_at: string`\n  - `lock_version: number`\n  - `type: 'note'`\n  - `updated_at: string`\n  - `creator?: { id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; }`\n  - `summary?: string`\n  - `title?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const note of client.notes.list()) {\n  console.log(note);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/notes/{id}',
    httpMethod: 'delete',
    summary: 'Delete a note',
    description: 'Permanently deletes a note.',
    stainlessPath: '(resource) notes > (method) delete',
    qualified: 'client.notes.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.notes.delete(id: string): void`\n\n**delete** `/notes/{id}`\n\nPermanently deletes a note.\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nawait client.notes.delete('id')\n```",
  },
  {
    name: 'create',
    endpoint: '/webhook_endpoints',
    httpMethod: 'post',
    summary: 'Create an endpoint',
    description: 'Create a new endpoint.',
    stainlessPath: '(resource) webhook_endpoints > (method) create',
    qualified: 'client.webhookEndpoints.create',
    params: ["status: 'disabled' | 'enabled';", 'url: string;', 'subscriptions?: { event_type: string; }[];'],
    response:
      "{ id: string; created_at: string; status: 'disabled' | 'enabled'; subscriptions: { event_type: string; type: 'webhook_subscription'; }[]; type: 'webhook_endpoint'; updated_at: string; url: string; secret?: string; }",
    markdown:
      "## create\n\n`client.webhookEndpoints.create(status: 'disabled' | 'enabled', url: string, subscriptions?: { event_type: string; }[]): { id: string; created_at: string; status: 'disabled' | 'enabled'; subscriptions: subscription[]; type: 'webhook_endpoint'; updated_at: string; url: string; secret?: string; }`\n\n**post** `/webhook_endpoints`\n\nCreate a new endpoint.\n\n### Parameters\n\n- `status: 'disabled' | 'enabled'`\n  Indicates whether the endpoint is enabled.\n\n- `url: string`\n  The HTTPS URL where webhook events will be sent.\n\n- `subscriptions?: { event_type: string; }[]`\n  An array of event types that this endpoint should receive notifications for.\n\n### Returns\n\n- `{ id: string; created_at: string; status: 'disabled' | 'enabled'; subscriptions: { event_type: string; type: 'webhook_subscription'; }[]; type: 'webhook_endpoint'; updated_at: string; url: string; secret?: string; }`\n  A Webhook Endpoint is an HTTP endpoint that receives webhooks. You can configure which events are sent to each endpoint by creating `WebhookSubscription` objects.\n\n  - `id: string`\n  - `created_at: string`\n  - `status: 'disabled' | 'enabled'`\n  - `subscriptions: { event_type: string; type: 'webhook_subscription'; }[]`\n  - `type: 'webhook_endpoint'`\n  - `updated_at: string`\n  - `url: string`\n  - `secret?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst endpoint = await client.webhookEndpoints.create({ status: 'enabled', url: 'https://example.com/webhook' });\n\nconsole.log(endpoint);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/webhook_endpoints/{id}',
    httpMethod: 'get',
    summary: 'Retrieve an endpoint',
    description: 'Retrieves the details of an existing endpoint.',
    stainlessPath: '(resource) webhook_endpoints > (method) retrieve',
    qualified: 'client.webhookEndpoints.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; created_at: string; status: 'disabled' | 'enabled'; subscriptions: { event_type: string; type: 'webhook_subscription'; }[]; type: 'webhook_endpoint'; updated_at: string; url: string; secret?: string; }",
    markdown:
      "## retrieve\n\n`client.webhookEndpoints.retrieve(id: string): { id: string; created_at: string; status: 'disabled' | 'enabled'; subscriptions: subscription[]; type: 'webhook_endpoint'; updated_at: string; url: string; secret?: string; }`\n\n**get** `/webhook_endpoints/{id}`\n\nRetrieves the details of an existing endpoint.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; created_at: string; status: 'disabled' | 'enabled'; subscriptions: { event_type: string; type: 'webhook_subscription'; }[]; type: 'webhook_endpoint'; updated_at: string; url: string; secret?: string; }`\n  A Webhook Endpoint is an HTTP endpoint that receives webhooks. You can configure which events are sent to each endpoint by creating `WebhookSubscription` objects.\n\n  - `id: string`\n  - `created_at: string`\n  - `status: 'disabled' | 'enabled'`\n  - `subscriptions: { event_type: string; type: 'webhook_subscription'; }[]`\n  - `type: 'webhook_endpoint'`\n  - `updated_at: string`\n  - `url: string`\n  - `secret?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst endpoint = await client.webhookEndpoints.retrieve('id');\n\nconsole.log(endpoint);\n```",
  },
  {
    name: 'update',
    endpoint: '/webhook_endpoints/{id}',
    httpMethod: 'patch',
    summary: 'Update an endpoint',
    description: 'Updates an endpoint.',
    stainlessPath: '(resource) webhook_endpoints > (method) update',
    qualified: 'client.webhookEndpoints.update',
    params: [
      'id: string;',
      "status?: 'disabled' | 'enabled';",
      'subscriptions?: { event_type: string; id?: string; }[];',
      'url?: string;',
    ],
    response:
      "{ id: string; created_at: string; status: 'disabled' | 'enabled'; subscriptions: { event_type: string; type: 'webhook_subscription'; }[]; type: 'webhook_endpoint'; updated_at: string; url: string; secret?: string; }",
    markdown:
      "## update\n\n`client.webhookEndpoints.update(id: string, status?: 'disabled' | 'enabled', subscriptions?: { event_type: string; id?: string; }[], url?: string): { id: string; created_at: string; status: 'disabled' | 'enabled'; subscriptions: subscription[]; type: 'webhook_endpoint'; updated_at: string; url: string; secret?: string; }`\n\n**patch** `/webhook_endpoints/{id}`\n\nUpdates an endpoint.\n\n### Parameters\n\n- `id: string`\n\n- `status?: 'disabled' | 'enabled'`\n  Indicates whether the endpoint is enabled.\n\n- `subscriptions?: { event_type: string; id?: string; }[]`\n  An array of event types that this endpoint should receive notifications for.\n\n- `url?: string`\n  The HTTPS URL where webhook events will be sent.\n\n### Returns\n\n- `{ id: string; created_at: string; status: 'disabled' | 'enabled'; subscriptions: { event_type: string; type: 'webhook_subscription'; }[]; type: 'webhook_endpoint'; updated_at: string; url: string; secret?: string; }`\n  A Webhook Endpoint is an HTTP endpoint that receives webhooks. You can configure which events are sent to each endpoint by creating `WebhookSubscription` objects.\n\n  - `id: string`\n  - `created_at: string`\n  - `status: 'disabled' | 'enabled'`\n  - `subscriptions: { event_type: string; type: 'webhook_subscription'; }[]`\n  - `type: 'webhook_endpoint'`\n  - `updated_at: string`\n  - `url: string`\n  - `secret?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst endpoint = await client.webhookEndpoints.update('id');\n\nconsole.log(endpoint);\n```",
  },
  {
    name: 'list',
    endpoint: '/webhook_endpoints',
    httpMethod: 'get',
    summary: 'List endpoints',
    description: 'Returns a list of endpoints.',
    stainlessPath: '(resource) webhook_endpoints > (method) list',
    qualified: 'client.webhookEndpoints.list',
    params: ['after?: string;', 'before?: string;', 'limit?: number;'],
    response:
      "{ id: string; created_at: string; status: 'disabled' | 'enabled'; subscriptions: { event_type: string; type: 'webhook_subscription'; }[]; type: 'webhook_endpoint'; updated_at: string; url: string; secret?: string; }",
    markdown:
      "## list\n\n`client.webhookEndpoints.list(after?: string, before?: string, limit?: number): { id: string; created_at: string; status: 'disabled' | 'enabled'; subscriptions: subscription[]; type: 'webhook_endpoint'; updated_at: string; url: string; secret?: string; }`\n\n**get** `/webhook_endpoints`\n\nReturns a list of endpoints.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; created_at: string; status: 'disabled' | 'enabled'; subscriptions: { event_type: string; type: 'webhook_subscription'; }[]; type: 'webhook_endpoint'; updated_at: string; url: string; secret?: string; }`\n  A Webhook Endpoint is an HTTP endpoint that receives webhooks. You can configure which events are sent to each endpoint by creating `WebhookSubscription` objects.\n\n  - `id: string`\n  - `created_at: string`\n  - `status: 'disabled' | 'enabled'`\n  - `subscriptions: { event_type: string; type: 'webhook_subscription'; }[]`\n  - `type: 'webhook_endpoint'`\n  - `updated_at: string`\n  - `url: string`\n  - `secret?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const endpoint of client.webhookEndpoints.list()) {\n  console.log(endpoint);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/webhook_endpoints/{id}',
    httpMethod: 'delete',
    summary: 'Delete an endpoint',
    description: 'Permanently deletes an endpoint.',
    stainlessPath: '(resource) webhook_endpoints > (method) delete',
    qualified: 'client.webhookEndpoints.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.webhookEndpoints.delete(id: string): void`\n\n**delete** `/webhook_endpoints/{id}`\n\nPermanently deletes an endpoint.\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nawait client.webhookEndpoints.delete('id')\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/agent_settings',
    httpMethod: 'get',
    summary: '',
    description: '',
    stainlessPath: '(resource) agent_settings > (method) retrieve',
    qualified: 'client.agentSettings.retrieve',
    response:
      "{ created_at: string; type: 'agent_settings'; updated_at: string; deal_summary_model?: string; deal_summary_prompt?: string; meeting_agent_model?: string; meeting_prebrief_prompt?: string; meeting_summary_prompt?: string; meeting_web_search?: boolean; organization_info?: string; }",
    markdown:
      "## retrieve\n\n`client.agentSettings.retrieve(): { created_at: string; type: 'agent_settings'; updated_at: string; deal_summary_model?: string; deal_summary_prompt?: string; meeting_agent_model?: string; meeting_prebrief_prompt?: string; meeting_summary_prompt?: string; meeting_web_search?: boolean; organization_info?: string; }`\n\n**get** `/agent_settings`\n\n### Returns\n\n- `{ created_at: string; type: 'agent_settings'; updated_at: string; deal_summary_model?: string; deal_summary_prompt?: string; meeting_agent_model?: string; meeting_prebrief_prompt?: string; meeting_summary_prompt?: string; meeting_web_search?: boolean; organization_info?: string; }`\n\n  - `created_at: string`\n  - `type: 'agent_settings'`\n  - `updated_at: string`\n  - `deal_summary_model?: string`\n  - `deal_summary_prompt?: string`\n  - `meeting_agent_model?: string`\n  - `meeting_prebrief_prompt?: string`\n  - `meeting_summary_prompt?: string`\n  - `meeting_web_search?: boolean`\n  - `organization_info?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst agentSetting = await client.agentSettings.retrieve();\n\nconsole.log(agentSetting);\n```",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
    boost: {
      name: 3,
      endpoint: 2,
      summary: 2,
      qualified: 2,
      content: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  // Note: Language is accepted for interface consistency with remote search, but currently has no
  // effect since this local search only supports TypeScript docs.
  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex.search(query).map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          fullResults.push({
            method: m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          this.indexProse(content, file.name);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}
