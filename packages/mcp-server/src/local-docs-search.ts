// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

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
  perLanguage?: Record<string, PerLanguageData>;
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
    description: 'Returns items and files that match the search query.',
    stainlessPath: '(resource) $client > (method) search',
    qualified: 'client.search',
    params: ['query: string;'],
    response: "{ data: { data: object | object; type: 'search_result'; }[]; type: 'list'; }",
    markdown:
      "## search\n\n`client.search(query: string): { data: object[]; type: 'list'; }`\n\n**post** `/search`\n\nReturns items and files that match the search query.\n\n### Parameters\n\n- `query: string`\n  The search text to match against items and files.\n\n### Returns\n\n- `{ data: { data: object | object; type: 'search_result'; }[]; type: 'list'; }`\n  A list of search results.\n\n  - `data: { data: { id: string; collection: object; type: 'item'; values: object; } | { id: string; associations: object[]; created_at: string; download_url: string; filename: string; name: string; size: number; type: 'file'; updated_at: string; }; type: 'search_result'; }[]`\n  - `type: 'list'`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst response = await client.search({ query: 'query' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.search',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.search({ query: 'query' });\n\nconsole.log(response.data);",
      },
      python: {
        method: 'search',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.search(\n    query="query",\n)\nprint(response.data)',
      },
      go: {
        method: 'client.Search',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Search(context.TODO(), moonbase.SearchParams{\n\t\tQuery: "query",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      ruby: {
        method: 'search',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nresponse = moonbase.search(query: "query")\n\nputs(response)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/search \\\n    -X POST \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/funnels',
    httpMethod: 'get',
    summary: 'List funnels',
    description: 'Returns a list of funnels.',
    stainlessPath: '(resource) funnels > (method) list',
    qualified: 'client.funnels.list',
    params: ['after?: string;', 'before?: string;', 'limit?: number;'],
    response:
      "{ id: string; created_at: string; name: string; steps: { id: string; color: string; name: string; step_type: 'active' | 'success' | 'failure'; type: 'funnel_step'; }[]; type: 'funnel'; updated_at: string; }",
    markdown:
      "## list\n\n`client.funnels.list(after?: string, before?: string, limit?: number): { id: string; created_at: string; name: string; steps: funnel_step[]; type: 'funnel'; updated_at: string; }`\n\n**get** `/funnels`\n\nReturns a list of funnels.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; created_at: string; name: string; steps: { id: string; color: string; name: string; step_type: 'active' | 'success' | 'failure'; type: 'funnel_step'; }[]; type: 'funnel'; updated_at: string; }`\n  A Funnel represents a series of steps used to track progression.\n\n  - `id: string`\n  - `created_at: string`\n  - `name: string`\n  - `steps: { id: string; color: string; name: string; step_type: 'active' | 'success' | 'failure'; type: 'funnel_step'; }[]`\n  - `type: 'funnel'`\n  - `updated_at: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const funnel of client.funnels.list()) {\n  console.log(funnel);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.funnels.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const funnel of client.funnels.list()) {\n  console.log(funnel.id);\n}",
      },
      python: {
        method: 'funnels.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.funnels.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Funnels.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Funnels.List(context.TODO(), moonbase.FunnelListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'funnels.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.funnels.list\n\nputs(page)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/funnels \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/funnels',
    httpMethod: 'post',
    summary: 'Create a funnel',
    description: 'Creates a new funnel.',
    stainlessPath: '(resource) funnels > (method) create',
    qualified: 'client.funnels.create',
    params: [
      'name: string;',
      "steps?: { color: string; name: string; step_type: 'active' | 'success' | 'failure'; }[];",
    ],
    response:
      "{ id: string; created_at: string; name: string; steps: { id: string; color: string; name: string; step_type: 'active' | 'success' | 'failure'; type: 'funnel_step'; }[]; type: 'funnel'; updated_at: string; }",
    markdown:
      "## create\n\n`client.funnels.create(name: string, steps?: { color: string; name: string; step_type: 'active' | 'success' | 'failure'; }[]): { id: string; created_at: string; name: string; steps: funnel_step[]; type: 'funnel'; updated_at: string; }`\n\n**post** `/funnels`\n\nCreates a new funnel.\n\n### Parameters\n\n- `name: string`\n  The name of the funnel.\n\n- `steps?: { color: string; name: string; step_type: 'active' | 'success' | 'failure'; }[]`\n  An ordered list of steps to create. Array order determines step order.\n\n### Returns\n\n- `{ id: string; created_at: string; name: string; steps: { id: string; color: string; name: string; step_type: 'active' | 'success' | 'failure'; type: 'funnel_step'; }[]; type: 'funnel'; updated_at: string; }`\n  A Funnel represents a series of steps used to track progression.\n\n  - `id: string`\n  - `created_at: string`\n  - `name: string`\n  - `steps: { id: string; color: string; name: string; step_type: 'active' | 'success' | 'failure'; type: 'funnel_step'; }[]`\n  - `type: 'funnel'`\n  - `updated_at: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst funnel = await client.funnels.create({ name: 'Sales Pipeline' });\n\nconsole.log(funnel);\n```",
    perLanguage: {
      typescript: {
        method: 'client.funnels.create',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst funnel = await client.funnels.create({\n  name: 'Sales Pipeline',\n  steps: [\n    {\n      name: 'New Lead',\n      step_type: 'active',\n      color: 'blue',\n    },\n    {\n      name: 'Qualified',\n      step_type: 'active',\n      color: 'cyan',\n    },\n    {\n      name: 'Won',\n      step_type: 'success',\n      color: 'green',\n    },\n    {\n      name: 'Lost',\n      step_type: 'failure',\n      color: 'red',\n    },\n  ],\n});\n\nconsole.log(funnel.id);",
      },
      python: {
        method: 'funnels.create',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nfunnel = client.funnels.create(\n    name="Sales Pipeline",\n    steps=[{\n        "name": "New Lead",\n        "step_type": "active",\n        "color": "blue",\n    }, {\n        "name": "Qualified",\n        "step_type": "active",\n        "color": "cyan",\n    }, {\n        "name": "Won",\n        "step_type": "success",\n        "color": "green",\n    }, {\n        "name": "Lost",\n        "step_type": "failure",\n        "color": "red",\n    }],\n)\nprint(funnel.id)',
      },
      go: {
        method: 'client.Funnels.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfunnel, err := client.Funnels.New(context.TODO(), moonbase.FunnelNewParams{\n\t\tName: "Sales Pipeline",\n\t\tSteps: []moonbase.FunnelNewParamsStep{{\n\t\t\tName:     "New Lead",\n\t\t\tStepType: "active",\n\t\t\tColor:    "blue",\n\t\t}, {\n\t\t\tName:     "Qualified",\n\t\t\tStepType: "active",\n\t\t\tColor:    "cyan",\n\t\t}, {\n\t\t\tName:     "Won",\n\t\t\tStepType: "success",\n\t\t\tColor:    "green",\n\t\t}, {\n\t\t\tName:     "Lost",\n\t\t\tStepType: "failure",\n\t\t\tColor:    "red",\n\t\t}},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", funnel.ID)\n}\n',
      },
      ruby: {
        method: 'funnels.create',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nfunnel = moonbase.funnels.create(name: "Sales Pipeline")\n\nputs(funnel)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/funnels \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "name": "Sales Pipeline",\n          "steps": [\n            {\n              "color": "blue",\n              "name": "New Lead",\n              "step_type": "active"\n            },\n            {\n              "color": "cyan",\n              "name": "Qualified",\n              "step_type": "active"\n            },\n            {\n              "color": "green",\n              "name": "Won",\n              "step_type": "success"\n            },\n            {\n              "color": "red",\n              "name": "Lost",\n              "step_type": "failure"\n            }\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/funnels/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a funnel',
    description: 'Retrieves the details of an existing funnel.',
    stainlessPath: '(resource) funnels > (method) retrieve',
    qualified: 'client.funnels.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; created_at: string; name: string; steps: { id: string; color: string; name: string; step_type: 'active' | 'success' | 'failure'; type: 'funnel_step'; }[]; type: 'funnel'; updated_at: string; }",
    markdown:
      "## retrieve\n\n`client.funnels.retrieve(id: string): { id: string; created_at: string; name: string; steps: funnel_step[]; type: 'funnel'; updated_at: string; }`\n\n**get** `/funnels/{id}`\n\nRetrieves the details of an existing funnel.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; created_at: string; name: string; steps: { id: string; color: string; name: string; step_type: 'active' | 'success' | 'failure'; type: 'funnel_step'; }[]; type: 'funnel'; updated_at: string; }`\n  A Funnel represents a series of steps used to track progression.\n\n  - `id: string`\n  - `created_at: string`\n  - `name: string`\n  - `steps: { id: string; color: string; name: string; step_type: 'active' | 'success' | 'failure'; type: 'funnel_step'; }[]`\n  - `type: 'funnel'`\n  - `updated_at: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst funnel = await client.funnels.retrieve('id');\n\nconsole.log(funnel);\n```",
    perLanguage: {
      typescript: {
        method: 'client.funnels.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst funnel = await client.funnels.retrieve('id');\n\nconsole.log(funnel.id);",
      },
      python: {
        method: 'funnels.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nfunnel = client.funnels.retrieve(\n    "id",\n)\nprint(funnel.id)',
      },
      go: {
        method: 'client.Funnels.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfunnel, err := client.Funnels.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", funnel.ID)\n}\n',
      },
      ruby: {
        method: 'funnels.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nfunnel = moonbase.funnels.retrieve("id")\n\nputs(funnel)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/funnels/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/funnels/{id}',
    httpMethod: 'patch',
    summary: 'Update a funnel',
    description: 'Updates a funnel.',
    stainlessPath: '(resource) funnels > (method) update',
    qualified: 'client.funnels.update',
    params: [
      'id: string;',
      'name?: string;',
      "steps?: { color: string; name: string; step_type: 'active' | 'success' | 'failure'; id?: string; }[];",
    ],
    response:
      "{ id: string; created_at: string; name: string; steps: { id: string; color: string; name: string; step_type: 'active' | 'success' | 'failure'; type: 'funnel_step'; }[]; type: 'funnel'; updated_at: string; }",
    markdown:
      "## update\n\n`client.funnels.update(id: string, name?: string, steps?: { color: string; name: string; step_type: 'active' | 'success' | 'failure'; id?: string; }[]): { id: string; created_at: string; name: string; steps: funnel_step[]; type: 'funnel'; updated_at: string; }`\n\n**patch** `/funnels/{id}`\n\nUpdates a funnel.\n\n### Parameters\n\n- `id: string`\n\n- `name?: string`\n  The name of the funnel.\n\n- `steps?: { color: string; name: string; step_type: 'active' | 'success' | 'failure'; id?: string; }[]`\n  An ordered list of steps. Providing this replaces all existing steps. Omitting preserves existing steps.\n\n### Returns\n\n- `{ id: string; created_at: string; name: string; steps: { id: string; color: string; name: string; step_type: 'active' | 'success' | 'failure'; type: 'funnel_step'; }[]; type: 'funnel'; updated_at: string; }`\n  A Funnel represents a series of steps used to track progression.\n\n  - `id: string`\n  - `created_at: string`\n  - `name: string`\n  - `steps: { id: string; color: string; name: string; step_type: 'active' | 'success' | 'failure'; type: 'funnel_step'; }[]`\n  - `type: 'funnel'`\n  - `updated_at: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst funnel = await client.funnels.update('id');\n\nconsole.log(funnel);\n```",
    perLanguage: {
      typescript: {
        method: 'client.funnels.update',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst funnel = await client.funnels.update('id', { name: 'Revenue Pipeline' });\n\nconsole.log(funnel.id);",
      },
      python: {
        method: 'funnels.update',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nfunnel = client.funnels.update(\n    id="id",\n    name="Revenue Pipeline",\n)\nprint(funnel.id)',
      },
      go: {
        method: 'client.Funnels.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfunnel, err := client.Funnels.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.FunnelUpdateParams{\n\t\t\tName: moonbase.String("Revenue Pipeline"),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", funnel.ID)\n}\n',
      },
      ruby: {
        method: 'funnels.update',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nfunnel = moonbase.funnels.update("id")\n\nputs(funnel)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/funnels/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "name": "Revenue Pipeline"\n        }\'',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/funnels/{id}',
    httpMethod: 'delete',
    summary: 'Delete a funnel',
    description: 'Permanently deletes a funnel.',
    stainlessPath: '(resource) funnels > (method) delete',
    qualified: 'client.funnels.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.funnels.delete(id: string): void`\n\n**delete** `/funnels/{id}`\n\nPermanently deletes a funnel.\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nawait client.funnels.delete('id')\n```",
    perLanguage: {
      typescript: {
        method: 'client.funnels.delete',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.funnels.delete('id');",
      },
      python: {
        method: 'funnels.delete',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nclient.funnels.delete(\n    "id",\n)',
      },
      go: {
        method: 'client.Funnels.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Funnels.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      ruby: {
        method: 'funnels.delete',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nresult = moonbase.funnels.delete("id")\n\nputs(result)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/funnels/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "{ id: string; created_at: string; kind: 'system' | 'form' | 'custom'; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; icon_name?: string; }",
    markdown:
      "## list\n\n`client.collections.list(after?: string, before?: string, limit?: number): { id: string; created_at: string; kind: 'system' | 'form' | 'custom'; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; icon_name?: string; }`\n\n**get** `/collections`\n\nReturns a list of your collections.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; created_at: string; kind: 'system' | 'form' | 'custom'; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; icon_name?: string; }`\n  Information about the most essential attributes of a Collection (does not include the collection's field definitions).\n\n  - `id: string`\n  - `created_at: string`\n  - `kind: 'system' | 'form' | 'custom'`\n  - `name: string`\n  - `ref: string`\n  - `type: 'collection'`\n  - `updated_at: string`\n  - `description?: string`\n  - `icon_name?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const collectionListResponse of client.collections.list()) {\n  console.log(collectionListResponse);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const collectionListResponse of client.collections.list()) {\n  console.log(collectionListResponse.id);\n}",
      },
      python: {
        method: 'collections.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.collections.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Collections.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Collections.List(context.TODO(), moonbase.CollectionListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'collections.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.collections.list\n\nputs(page)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/collections \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/collections/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a collection',
    description: 'Retrieves the details of an existing collection.',
    stainlessPath: '(resource) collections > (method) retrieve',
    qualified: 'client.collections.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; created_at: string; fields: object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object[]; kind: 'system' | 'form' | 'custom'; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; icon_name?: string; views?: { id: string; collection: object; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }[]; }",
    markdown:
      "## retrieve\n\n`client.collections.retrieve(id: string): { id: string; created_at: string; fields: field[]; kind: 'system' | 'form' | 'custom'; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; icon_name?: string; views?: object[]; }`\n\n**get** `/collections/{id}`\n\nRetrieves the details of an existing collection.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; created_at: string; fields: object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object[]; kind: 'system' | 'form' | 'custom'; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; icon_name?: string; views?: { id: string; collection: object; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }[]; }`\n  A Collection is a container for structured data, similar to a database table or spreadsheet. It defines a schema using a set of `Fields` and holds the data as a list of `Items`.\n\n\n  - `id: string`\n  - `created_at: string`\n  - `fields: { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/single_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/multi_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/identifier'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_integer'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_float'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_unit: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/monetary'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/percentage'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/boolean'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/email'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/url'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/domain'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_x'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_linked_in'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/telephone_number'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/geo'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/date'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/datetime'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; options: object[]; readonly: boolean; ref: string; required: boolean; type: 'field/choice'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; funnel: object; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/stage'; unique: boolean; updated_at: string; description?: string; } | { id: string; allowed_collections: object[]; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; relation_type: 'one_way' | 'two_way'; required: boolean; type: 'field/relation'; unique: boolean; updated_at: string; description?: string; reverse_field_name?: string; reverse_fields?: object[]; source_field?: object; }[]`\n  - `kind: 'system' | 'form' | 'custom'`\n  - `name: string`\n  - `ref: string`\n  - `type: 'collection'`\n  - `updated_at: string`\n  - `description?: string`\n  - `icon_name?: string`\n  - `views?: { id: string; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }[]`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst collection = await client.collections.retrieve('id');\n\nconsole.log(collection);\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst collection = await client.collections.retrieve('id');\n\nconsole.log(collection.id);",
      },
      python: {
        method: 'collections.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\ncollection = client.collections.retrieve(\n    "id",\n)\nprint(collection.id)',
      },
      go: {
        method: 'client.Collections.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcollection, err := client.Collections.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", collection.ID)\n}\n',
      },
      ruby: {
        method: 'collections.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\ncollection = moonbase.collections.retrieve("id")\n\nputs(collection)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/collections/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/collections',
    httpMethod: 'post',
    summary: 'Create a collection',
    description:
      'Creates a new collection with default fields (name, created_at, updated_at) and a default view.',
    stainlessPath: '(resource) collections > (method) create',
    qualified: 'client.collections.create',
    params: ['name: string;', 'description?: string;', 'icon_name?: string;'],
    response:
      "{ id: string; created_at: string; fields: object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object[]; kind: 'system' | 'form' | 'custom'; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; icon_name?: string; views?: { id: string; collection: object; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }[]; }",
    markdown:
      "## create\n\n`client.collections.create(name: string, description?: string, icon_name?: string): { id: string; created_at: string; fields: field[]; kind: 'system' | 'form' | 'custom'; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; icon_name?: string; views?: object[]; }`\n\n**post** `/collections`\n\nCreates a new collection with default fields (name, created_at, updated_at) and a default view.\n\n### Parameters\n\n- `name: string`\n  The user-facing name of the collection (e.g., \"Leads\"). A `ref` is automatically derived from the name.\n\n- `description?: string`\n  An optional, longer-form description of the collection's purpose.\n\n- `icon_name?: string`\n  An optional icon for the collection, as a Phosphor icon name in kebab-case (e.g. `users`, `chart-bar`).\n\n### Returns\n\n- `{ id: string; created_at: string; fields: object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object[]; kind: 'system' | 'form' | 'custom'; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; icon_name?: string; views?: { id: string; collection: object; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }[]; }`\n  A Collection is a container for structured data, similar to a database table or spreadsheet. It defines a schema using a set of `Fields` and holds the data as a list of `Items`.\n\n\n  - `id: string`\n  - `created_at: string`\n  - `fields: { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/single_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/multi_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/identifier'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_integer'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_float'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_unit: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/monetary'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/percentage'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/boolean'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/email'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/url'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/domain'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_x'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_linked_in'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/telephone_number'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/geo'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/date'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/datetime'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; options: object[]; readonly: boolean; ref: string; required: boolean; type: 'field/choice'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; funnel: object; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/stage'; unique: boolean; updated_at: string; description?: string; } | { id: string; allowed_collections: object[]; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; relation_type: 'one_way' | 'two_way'; required: boolean; type: 'field/relation'; unique: boolean; updated_at: string; description?: string; reverse_field_name?: string; reverse_fields?: object[]; source_field?: object; }[]`\n  - `kind: 'system' | 'form' | 'custom'`\n  - `name: string`\n  - `ref: string`\n  - `type: 'collection'`\n  - `updated_at: string`\n  - `description?: string`\n  - `icon_name?: string`\n  - `views?: { id: string; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }[]`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst collection = await client.collections.create({ name: 'Leads' });\n\nconsole.log(collection);\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.create',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst collection = await client.collections.create({\n  name: 'Leads',\n  description: 'Inbound leads from marketing',\n  icon_name: 'users',\n});\n\nconsole.log(collection.id);",
      },
      python: {
        method: 'collections.create',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\ncollection = client.collections.create(\n    name="Leads",\n    description="Inbound leads from marketing",\n    icon_name="users",\n)\nprint(collection.id)',
      },
      go: {
        method: 'client.Collections.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcollection, err := client.Collections.New(context.TODO(), moonbase.CollectionNewParams{\n\t\tName:        "Leads",\n\t\tDescription: moonbase.String("Inbound leads from marketing"),\n\t\tIconName:    moonbase.String("users"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", collection.ID)\n}\n',
      },
      ruby: {
        method: 'collections.create',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\ncollection = moonbase.collections.create(name: "Leads")\n\nputs(collection)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/collections \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "name": "Leads",\n          "description": "Inbound leads from marketing",\n          "icon_name": "users"\n        }\'',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/collections/{id}',
    httpMethod: 'patch',
    summary: 'Update a collection',
    description: 'Updates an existing collection.',
    stainlessPath: '(resource) collections > (method) update',
    qualified: 'client.collections.update',
    params: ['id: string;', 'description?: string;', 'icon_name?: string;', 'name?: string;'],
    response:
      "{ id: string; created_at: string; fields: object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object[]; kind: 'system' | 'form' | 'custom'; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; icon_name?: string; views?: { id: string; collection: object; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }[]; }",
    markdown:
      "## update\n\n`client.collections.update(id: string, description?: string, icon_name?: string, name?: string): { id: string; created_at: string; fields: field[]; kind: 'system' | 'form' | 'custom'; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; icon_name?: string; views?: object[]; }`\n\n**patch** `/collections/{id}`\n\nUpdates an existing collection.\n\n### Parameters\n\n- `id: string`\n\n- `description?: string`\n  An optional, longer-form description of the collection's purpose.\n\n- `icon_name?: string`\n  The collection's icon, as a Phosphor icon name in kebab-case (e.g. `users`, `chart-bar`), or `null` to clear it.\n\n- `name?: string`\n  The user-facing name of the collection.\n\n### Returns\n\n- `{ id: string; created_at: string; fields: object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object[]; kind: 'system' | 'form' | 'custom'; name: string; ref: string; type: 'collection'; updated_at: string; description?: string; icon_name?: string; views?: { id: string; collection: object; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }[]; }`\n  A Collection is a container for structured data, similar to a database table or spreadsheet. It defines a schema using a set of `Fields` and holds the data as a list of `Items`.\n\n\n  - `id: string`\n  - `created_at: string`\n  - `fields: { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/single_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/multi_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/identifier'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_integer'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_float'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_unit: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/monetary'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/percentage'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/boolean'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/email'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/url'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/domain'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_x'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_linked_in'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/telephone_number'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/geo'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/date'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/datetime'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; options: object[]; readonly: boolean; ref: string; required: boolean; type: 'field/choice'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; funnel: object; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/stage'; unique: boolean; updated_at: string; description?: string; } | { id: string; allowed_collections: object[]; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; relation_type: 'one_way' | 'two_way'; required: boolean; type: 'field/relation'; unique: boolean; updated_at: string; description?: string; reverse_field_name?: string; reverse_fields?: object[]; source_field?: object; }[]`\n  - `kind: 'system' | 'form' | 'custom'`\n  - `name: string`\n  - `ref: string`\n  - `type: 'collection'`\n  - `updated_at: string`\n  - `description?: string`\n  - `icon_name?: string`\n  - `views?: { id: string; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }[]`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst collection = await client.collections.update('id');\n\nconsole.log(collection);\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.update',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst collection = await client.collections.update('id', {\n  description: 'Qualified inbound leads',\n  icon_name: 'flag',\n  name: 'Hot Leads',\n});\n\nconsole.log(collection.id);",
      },
      python: {
        method: 'collections.update',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\ncollection = client.collections.update(\n    id="id",\n    description="Qualified inbound leads",\n    icon_name="flag",\n    name="Hot Leads",\n)\nprint(collection.id)',
      },
      go: {
        method: 'client.Collections.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcollection, err := client.Collections.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.CollectionUpdateParams{\n\t\t\tDescription: moonbase.String("Qualified inbound leads"),\n\t\t\tIconName:    moonbase.String("flag"),\n\t\t\tName:        moonbase.String("Hot Leads"),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", collection.ID)\n}\n',
      },
      ruby: {
        method: 'collections.update',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\ncollection = moonbase.collections.update("id")\n\nputs(collection)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/collections/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "description": "Qualified inbound leads",\n          "icon_name": "flag",\n          "name": "Hot Leads"\n        }\'',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/collections/{id}',
    httpMethod: 'delete',
    summary: 'Delete a collection',
    description: 'Permanently deletes a collection.',
    stainlessPath: '(resource) collections > (method) delete',
    qualified: 'client.collections.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.collections.delete(id: string): void`\n\n**delete** `/collections/{id}`\n\nPermanently deletes a collection.\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nawait client.collections.delete('id')\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.delete',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.collections.delete('id');",
      },
      python: {
        method: 'collections.delete',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nclient.collections.delete(\n    "id",\n)',
      },
      go: {
        method: 'client.Collections.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Collections.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      ruby: {
        method: 'collections.delete',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nresult = moonbase.collections.delete("id")\n\nputs(result)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/collections/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/collections/{collection_id}/fields',
    httpMethod: 'post',
    summary: 'Create a field',
    description: 'Creates a new field in a collection.',
    stainlessPath: '(resource) collections.fields > (method) create',
    qualified: 'client.collections.fields.create',
    params: [
      'collection_id: string;',
      "field: { name: string; type: 'field/text/single_line'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/text/single_line'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/text/multi_line'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/text/multi_line'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/identifier'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/identifier'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/number/unitless_integer'; cardinality?: 'one' | 'many'; default_values?: { data: number; type: 'value/number/unitless_integer'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/number/unitless_float'; cardinality?: 'one' | 'many'; default_values?: { data: number; type: 'value/number/unitless_float'; }[]; description?: string; required?: boolean; unique?: boolean; } | { default_unit: string; name: string; type: 'field/number/monetary'; cardinality?: 'one' | 'many'; default_values?: { data: { currency: string; in_minor_units: number; }; type: 'value/number/monetary'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/number/percentage'; cardinality?: 'one' | 'many'; default_values?: { data: number; type: 'value/number/percentage'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/boolean'; cardinality?: 'one' | 'many'; default_values?: { data: boolean; type: 'value/boolean'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/email'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/email'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/uri/url'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/uri/url'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/uri/domain'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/uri/domain'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/uri/social_x'; cardinality?: 'one' | 'many'; default_values?: { data: object; type: 'value/uri/social_x'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/uri/social_linked_in'; cardinality?: 'one' | 'many'; default_values?: { data: object; type: 'value/uri/social_linked_in'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/telephone_number'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/telephone_number'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/geo'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/geo'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/date'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/date'; } | { type: 'current_date'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/datetime'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/datetime'; } | { type: 'current_datetime'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; options: { color: string; name: string; }[]; type: 'field/choice'; cardinality?: 'one' | 'many'; default_values?: { data: object; type: 'value/choice'; }[]; description?: string; required?: boolean; unique?: boolean; } | { funnel: { id: string; type: 'funnel'; }; name: string; type: 'field/stage'; cardinality?: 'one' | 'many'; default_values?: { data: funnel_step_pointer; type: 'value/funnel_step'; }[]; description?: string; required?: boolean; unique?: boolean; } | { allowed_collections: { type: 'collection'; id?: string; ref?: string; }[]; name: string; relation_type: 'one_way' | 'two_way'; type: 'field/relation'; cardinality?: 'one' | 'many'; default_values?: { data: item_pointer_param; type: 'value/relation'; } | { type: 'current_member'; }[]; description?: string; required?: boolean; reverse_field_name?: string; unique?: boolean; };",
    ],
    response:
      'object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object',
    markdown:
      "## create\n\n`client.collections.fields.create(collection_id: string, field: { name: string; type: 'field/text/single_line'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/text/multi_line'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/identifier'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/number/unitless_integer'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/number/unitless_float'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; required?: boolean; unique?: boolean; } | { default_unit: string; name: string; type: 'field/number/monetary'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/number/percentage'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/boolean'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/email'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/uri/url'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/uri/domain'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/uri/social_x'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/uri/social_linked_in'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/telephone_number'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/geo'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/date'; cardinality?: 'one' | 'many'; default_values?: date_value | current_date[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/datetime'; cardinality?: 'one' | 'many'; default_values?: datetime_value | current_datetime[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; options: { color: string; name: string; }[]; type: 'field/choice'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; required?: boolean; unique?: boolean; } | { funnel: funnel_pointer_param; name: string; type: 'field/stage'; cardinality?: 'one' | 'many'; default_values?: funnel_step_value_param[]; description?: string; required?: boolean; unique?: boolean; } | { allowed_collections: { type: 'collection'; id?: string; ref?: string; }[]; name: string; relation_type: 'one_way' | 'two_way'; type: 'field/relation'; cardinality?: 'one' | 'many'; default_values?: relation_value_param | current_member[]; description?: string; required?: boolean; reverse_field_name?: string; unique?: boolean; }): object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object`\n\n**post** `/collections/{collection_id}/fields`\n\nCreates a new field in a collection.\n\n### Parameters\n\n- `collection_id: string`\n\n- `field: { name: string; type: 'field/text/single_line'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/text/single_line'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/text/multi_line'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/text/multi_line'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/identifier'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/identifier'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/number/unitless_integer'; cardinality?: 'one' | 'many'; default_values?: { data: number; type: 'value/number/unitless_integer'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/number/unitless_float'; cardinality?: 'one' | 'many'; default_values?: { data: number; type: 'value/number/unitless_float'; }[]; description?: string; required?: boolean; unique?: boolean; } | { default_unit: string; name: string; type: 'field/number/monetary'; cardinality?: 'one' | 'many'; default_values?: { data: { currency: string; in_minor_units: number; }; type: 'value/number/monetary'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/number/percentage'; cardinality?: 'one' | 'many'; default_values?: { data: number; type: 'value/number/percentage'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/boolean'; cardinality?: 'one' | 'many'; default_values?: { data: boolean; type: 'value/boolean'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/email'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/email'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/uri/url'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/uri/url'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/uri/domain'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/uri/domain'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/uri/social_x'; cardinality?: 'one' | 'many'; default_values?: { data: object; type: 'value/uri/social_x'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/uri/social_linked_in'; cardinality?: 'one' | 'many'; default_values?: { data: object; type: 'value/uri/social_linked_in'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/telephone_number'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/telephone_number'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/geo'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/geo'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/date'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/date'; } | { type: 'current_date'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; type: 'field/datetime'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/datetime'; } | { type: 'current_datetime'; }[]; description?: string; required?: boolean; unique?: boolean; } | { name: string; options: { color: string; name: string; }[]; type: 'field/choice'; cardinality?: 'one' | 'many'; default_values?: { data: object; type: 'value/choice'; }[]; description?: string; required?: boolean; unique?: boolean; } | { funnel: { id: string; type: 'funnel'; }; name: string; type: 'field/stage'; cardinality?: 'one' | 'many'; default_values?: { data: funnel_step_pointer; type: 'value/funnel_step'; }[]; description?: string; required?: boolean; unique?: boolean; } | { allowed_collections: { type: 'collection'; id?: string; ref?: string; }[]; name: string; relation_type: 'one_way' | 'two_way'; type: 'field/relation'; cardinality?: 'one' | 'many'; default_values?: { data: item_pointer_param; type: 'value/relation'; } | { type: 'current_member'; }[]; description?: string; required?: boolean; reverse_field_name?: string; unique?: boolean; }`\n  Parameters for creating a field, discriminated by `type`.\n\n### Returns\n\n- `{ id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/single_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/multi_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/identifier'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_integer'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_float'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_unit: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/monetary'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/percentage'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/boolean'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/email'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/url'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/domain'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_x'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_linked_in'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/telephone_number'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/geo'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/date'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/datetime'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; options: object[]; readonly: boolean; ref: string; required: boolean; type: 'field/choice'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; funnel: object; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/stage'; unique: boolean; updated_at: string; description?: string; } | { id: string; allowed_collections: object[]; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; relation_type: 'one_way' | 'two_way'; required: boolean; type: 'field/relation'; unique: boolean; updated_at: string; description?: string; reverse_field_name?: string; reverse_fields?: object[]; source_field?: object; }`\n  A field definition, which varies by type\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst field = await client.collections.fields.create('collection_id', { field: { name: 'Lead Source', type: 'field/text/single_line' } });\n\nconsole.log(field);\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.fields.create',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst field = await client.collections.fields.create('collection_id', {\n  field: { name: 'Lead Source', type: 'field/text/single_line' },\n});\n\nconsole.log(field);",
      },
      python: {
        method: 'collections.fields.create',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nfield = client.collections.fields.create(\n    collection_id="collection_id",\n    field={\n        "name": "Lead Source",\n        "type": "field/text/single_line",\n    },\n)\nprint(field)',
      },
      go: {
        method: 'client.Collections.Fields.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfield, err := client.Collections.Fields.New(\n\t\tcontext.TODO(),\n\t\t"collection_id",\n\t\tmoonbase.CollectionFieldNewParams{\n\t\t\tOfFieldTextSingleLine: &moonbase.CollectionFieldNewParamsFieldFieldTextSingleLine{\n\t\t\t\tName: "Lead Source",\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", field)\n}\n',
      },
      ruby: {
        method: 'collections.fields.create',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nfield = moonbase.collections.fields.create(\n  "collection_id",\n  field: {name: "Lead Source", type: :"field/text/single_line"}\n)\n\nputs(field)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/collections/$COLLECTION_ID/fields \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "name": "Lead Source",\n          "type": "field/text/single_line",\n          "cardinality": "one",\n          "default_values": [\n            {\n              "data": "data",\n              "type": "value/text/single_line"\n            }\n          ],\n          "description": "description",\n          "required": true,\n          "unique": true\n        }\'',
      },
    },
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
      'object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object',
    markdown:
      "## retrieve\n\n`client.collections.fields.retrieve(collection_id: string, id: string): object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object`\n\n**get** `/collections/{collection_id}/fields/{id}`\n\nRetrieves the details of a field in a collection.\n\n### Parameters\n\n- `collection_id: string`\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/single_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/multi_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/identifier'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_integer'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_float'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_unit: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/monetary'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/percentage'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/boolean'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/email'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/url'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/domain'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_x'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_linked_in'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/telephone_number'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/geo'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/date'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/datetime'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; options: object[]; readonly: boolean; ref: string; required: boolean; type: 'field/choice'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; funnel: object; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/stage'; unique: boolean; updated_at: string; description?: string; } | { id: string; allowed_collections: object[]; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; relation_type: 'one_way' | 'two_way'; required: boolean; type: 'field/relation'; unique: boolean; updated_at: string; description?: string; reverse_field_name?: string; reverse_fields?: object[]; source_field?: object; }`\n  A field definition, which varies by type\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst field = await client.collections.fields.retrieve('id', { collection_id: 'collection_id' });\n\nconsole.log(field);\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.fields.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst field = await client.collections.fields.retrieve('id', { collection_id: 'collection_id' });\n\nconsole.log(field);",
      },
      python: {
        method: 'collections.fields.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nfield = client.collections.fields.retrieve(\n    id="id",\n    collection_id="collection_id",\n)\nprint(field)',
      },
      go: {
        method: 'client.Collections.Fields.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfield, err := client.Collections.Fields.Get(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.CollectionFieldGetParams{\n\t\t\tCollectionID: "collection_id",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", field)\n}\n',
      },
      ruby: {
        method: 'collections.fields.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nfield = moonbase.collections.fields.retrieve("id", collection_id: "collection_id")\n\nputs(field)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/collections/$COLLECTION_ID/fields/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/collections/{collection_id}/fields/{id}',
    httpMethod: 'patch',
    summary: 'Update a field',
    description: 'Updates an existing field in a collection.',
    stainlessPath: '(resource) collections.fields > (method) update',
    qualified: 'client.collections.fields.update',
    params: [
      'collection_id: string;',
      'id: string;',
      "field: { type: 'field/text/single_line'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/text/single_line'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/text/multi_line'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/text/multi_line'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/identifier'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/identifier'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/number/unitless_integer'; cardinality?: 'one' | 'many'; default_values?: { data: number; type: 'value/number/unitless_integer'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/number/unitless_float'; cardinality?: 'one' | 'many'; default_values?: { data: number; type: 'value/number/unitless_float'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/number/monetary'; cardinality?: 'one' | 'many'; default_unit?: string; default_values?: { data: { currency: string; in_minor_units: number; }; type: 'value/number/monetary'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/number/percentage'; cardinality?: 'one' | 'many'; default_values?: { data: number; type: 'value/number/percentage'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/boolean'; cardinality?: 'one' | 'many'; default_values?: { data: boolean; type: 'value/boolean'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/email'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/email'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/uri/url'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/uri/url'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/uri/domain'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/uri/domain'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/uri/social_x'; cardinality?: 'one' | 'many'; default_values?: { data: object; type: 'value/uri/social_x'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/uri/social_linked_in'; cardinality?: 'one' | 'many'; default_values?: { data: object; type: 'value/uri/social_linked_in'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/telephone_number'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/telephone_number'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/geo'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/geo'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/date'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/date'; } | { type: 'current_date'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/datetime'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/datetime'; } | { type: 'current_datetime'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/choice'; cardinality?: 'one' | 'many'; default_values?: { data: object; type: 'value/choice'; }[]; description?: string; name?: string; options?: { color: string; name: string; id?: string; }[]; required?: boolean; unique?: boolean; } | { type: 'field/stage'; cardinality?: 'one' | 'many'; default_values?: { data: funnel_step_pointer; type: 'value/funnel_step'; }[]; description?: string; funnel?: { id: string; type: 'funnel'; }; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/relation'; allowed_collections?: { type: 'collection'; id?: string; ref?: string; }[]; cardinality?: 'one' | 'many'; default_values?: { data: item_pointer_param; type: 'value/relation'; } | { type: 'current_member'; }[]; description?: string; name?: string; relation_type?: 'one_way' | 'two_way'; required?: boolean; unique?: boolean; };",
    ],
    response:
      'object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object',
    markdown:
      "## update\n\n`client.collections.fields.update(collection_id: string, id: string, field: { type: 'field/text/single_line'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/text/multi_line'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/identifier'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/number/unitless_integer'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/number/unitless_float'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/number/monetary'; cardinality?: 'one' | 'many'; default_unit?: string; default_values?: object[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/number/percentage'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/boolean'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/email'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/uri/url'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/uri/domain'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/uri/social_x'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/uri/social_linked_in'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/telephone_number'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/geo'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/date'; cardinality?: 'one' | 'many'; default_values?: date_value | current_date[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/datetime'; cardinality?: 'one' | 'many'; default_values?: datetime_value | current_datetime[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/choice'; cardinality?: 'one' | 'many'; default_values?: object[]; description?: string; name?: string; options?: { color: string; name: string; id?: string; }[]; required?: boolean; unique?: boolean; } | { type: 'field/stage'; cardinality?: 'one' | 'many'; default_values?: funnel_step_value_param[]; description?: string; funnel?: funnel_pointer_param; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/relation'; allowed_collections?: { type: 'collection'; id?: string; ref?: string; }[]; cardinality?: 'one' | 'many'; default_values?: relation_value_param | current_member[]; description?: string; name?: string; relation_type?: 'one_way' | 'two_way'; required?: boolean; unique?: boolean; }): object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object`\n\n**patch** `/collections/{collection_id}/fields/{id}`\n\nUpdates an existing field in a collection.\n\n### Parameters\n\n- `collection_id: string`\n\n- `id: string`\n\n- `field: { type: 'field/text/single_line'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/text/single_line'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/text/multi_line'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/text/multi_line'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/identifier'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/identifier'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/number/unitless_integer'; cardinality?: 'one' | 'many'; default_values?: { data: number; type: 'value/number/unitless_integer'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/number/unitless_float'; cardinality?: 'one' | 'many'; default_values?: { data: number; type: 'value/number/unitless_float'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/number/monetary'; cardinality?: 'one' | 'many'; default_unit?: string; default_values?: { data: { currency: string; in_minor_units: number; }; type: 'value/number/monetary'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/number/percentage'; cardinality?: 'one' | 'many'; default_values?: { data: number; type: 'value/number/percentage'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/boolean'; cardinality?: 'one' | 'many'; default_values?: { data: boolean; type: 'value/boolean'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/email'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/email'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/uri/url'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/uri/url'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/uri/domain'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/uri/domain'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/uri/social_x'; cardinality?: 'one' | 'many'; default_values?: { data: object; type: 'value/uri/social_x'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/uri/social_linked_in'; cardinality?: 'one' | 'many'; default_values?: { data: object; type: 'value/uri/social_linked_in'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/telephone_number'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/telephone_number'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/geo'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/geo'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/date'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/date'; } | { type: 'current_date'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/datetime'; cardinality?: 'one' | 'many'; default_values?: { data: string; type: 'value/datetime'; } | { type: 'current_datetime'; }[]; description?: string; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/choice'; cardinality?: 'one' | 'many'; default_values?: { data: object; type: 'value/choice'; }[]; description?: string; name?: string; options?: { color: string; name: string; id?: string; }[]; required?: boolean; unique?: boolean; } | { type: 'field/stage'; cardinality?: 'one' | 'many'; default_values?: { data: funnel_step_pointer; type: 'value/funnel_step'; }[]; description?: string; funnel?: { id: string; type: 'funnel'; }; name?: string; required?: boolean; unique?: boolean; } | { type: 'field/relation'; allowed_collections?: { type: 'collection'; id?: string; ref?: string; }[]; cardinality?: 'one' | 'many'; default_values?: { data: item_pointer_param; type: 'value/relation'; } | { type: 'current_member'; }[]; description?: string; name?: string; relation_type?: 'one_way' | 'two_way'; required?: boolean; unique?: boolean; }`\n  Parameters for updating a field, discriminated by `type`.\n\n### Returns\n\n- `{ id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/single_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/text/multi_line'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/identifier'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_integer'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/unitless_float'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_unit: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/monetary'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/number/percentage'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/boolean'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/email'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/url'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/domain'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_x'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/uri/social_linked_in'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/telephone_number'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/geo'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/date'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/datetime'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; options: object[]; readonly: boolean; ref: string; required: boolean; type: 'field/choice'; unique: boolean; updated_at: string; description?: string; } | { id: string; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; funnel: object; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; required: boolean; type: 'field/stage'; unique: boolean; updated_at: string; description?: string; } | { id: string; allowed_collections: object[]; cardinality: 'one' | 'many'; created_at: string; default_values: single_line_text_value | multi_line_text_value | identifier_value | integer_value | float_value | monetary_value | percentage_value | boolean_value | email_value | url_value | domain_value | social_x_value | social_linked_in_value | telephone_number | geo_value | date_value | current_date | datetime_value | current_datetime | choice_value | funnel_step_value | relation_value | current_member[]; kind: 'system' | 'inverse' | 'custom'; name: string; readonly: boolean; ref: string; relation_type: 'one_way' | 'two_way'; required: boolean; type: 'field/relation'; unique: boolean; updated_at: string; description?: string; reverse_field_name?: string; reverse_fields?: object[]; source_field?: object; }`\n  A field definition, which varies by type\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst field = await client.collections.fields.update('id', {\n  collection_id: 'collection_id',\n  field: { type: 'field/text/single_line' },\n});\n\nconsole.log(field);\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.fields.update',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst field = await client.collections.fields.update('id', {\n  collection_id: 'collection_id',\n  field: { type: 'field/text/single_line' },\n});\n\nconsole.log(field);",
      },
      python: {
        method: 'collections.fields.update',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nfield = client.collections.fields.update(\n    id="id",\n    collection_id="collection_id",\n    field={\n        "type": "field/text/single_line"\n    },\n)\nprint(field)',
      },
      go: {
        method: 'client.Collections.Fields.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfield, err := client.Collections.Fields.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.CollectionFieldUpdateParams{\n\t\t\tCollectionID:          "collection_id",\n\t\t\tOfFieldTextSingleLine: &moonbase.CollectionFieldUpdateParamsFieldFieldTextSingleLine{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", field)\n}\n',
      },
      ruby: {
        method: 'collections.fields.update',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nfield = moonbase.collections.fields.update(\n  "id",\n  collection_id: "collection_id",\n  field: {type: :"field/text/single_line"}\n)\n\nputs(field)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/collections/$COLLECTION_ID/fields/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "type": "field/text/single_line",\n          "cardinality": "one",\n          "default_values": [\n            {\n              "data": "data",\n              "type": "value/text/single_line"\n            }\n          ],\n          "description": "description",\n          "name": "Source",\n          "required": true,\n          "unique": true\n        }\'',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/collections/{collection_id}/fields/{id}',
    httpMethod: 'delete',
    summary: 'Delete a field',
    description: 'Permanently deletes a field from a collection.',
    stainlessPath: '(resource) collections.fields > (method) delete',
    qualified: 'client.collections.fields.delete',
    params: ['collection_id: string;', 'id: string;'],
    markdown:
      "## delete\n\n`client.collections.fields.delete(collection_id: string, id: string): void`\n\n**delete** `/collections/{collection_id}/fields/{id}`\n\nPermanently deletes a field from a collection.\n\n### Parameters\n\n- `collection_id: string`\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nawait client.collections.fields.delete('id', { collection_id: 'collection_id' })\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.fields.delete',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.collections.fields.delete('id', { collection_id: 'collection_id' });",
      },
      python: {
        method: 'collections.fields.delete',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nclient.collections.fields.delete(\n    id="id",\n    collection_id="collection_id",\n)',
      },
      go: {
        method: 'client.Collections.Fields.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Collections.Fields.Delete(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.CollectionFieldDeleteParams{\n\t\t\tCollectionID: "collection_id",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      ruby: {
        method: 'collections.fields.delete',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nresult = moonbase.collections.fields.delete("id", collection_id: "collection_id")\n\nputs(result)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/collections/$COLLECTION_ID/fields/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/collections/{collection_id}/items',
    httpMethod: 'get',
    summary: 'List items in a collection',
    description:
      'Returns a paginated list of item pointers in a collection. Use the retrieve endpoint to get full item details including field values.',
    stainlessPath: '(resource) collections.items > (method) list',
    qualified: 'client.collections.items.list',
    params: [
      'collection_id: string;',
      'after?: string;',
      'before?: string;',
      'limit?: number;',
      'sort?: string[];',
    ],
    response: "{ id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; }",
    markdown:
      "## list\n\n`client.collections.items.list(collection_id: string, after?: string, before?: string, limit?: number, sort?: string[]): { id: string; collection: collection_pointer; type: 'item'; }`\n\n**get** `/collections/{collection_id}/items`\n\nReturns a paginated list of item pointers in a collection. Use the retrieve endpoint to get full item details including field values.\n\n### Parameters\n\n- `collection_id: string`\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n- `sort?: string[]`\n  Sort items returned by the specified fields, specified directly by (`name`) or through relations (`organization.name`, `deals.owner.email`). Prefix with a hyphen/minus (`-`) to sort in descending order.\n\n### Returns\n\n- `{ id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; }`\n  A reference to an `Item` within a specific `Collection`, providing the context needed to locate the item.\n\n  - `id: string`\n  - `collection: { id: string; ref: string; type: 'collection'; }`\n  - `type: 'item'`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const itemPointer of client.collections.items.list('collection_id')) {\n  console.log(itemPointer);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.items.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const itemPointer of client.collections.items.list('collection_id')) {\n  console.log(itemPointer.id);\n}",
      },
      python: {
        method: 'collections.items.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.collections.items.list(\n    collection_id="collection_id",\n)\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Collections.Items.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Collections.Items.List(\n\t\tcontext.TODO(),\n\t\t"collection_id",\n\t\tmoonbase.CollectionItemListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'collections.items.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.collections.items.list("collection_id")\n\nputs(page)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/collections/$COLLECTION_ID/items \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.collections.items.create',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst item = await client.collections.items.create('collection_id', {\n  values: {\n    name: { type: 'value/text/single_line', data: 'Aperture Science' },\n    ceo: {\n      type: 'value/relation',\n      data: { type: 'item', id: '1CLJt2v84CdKMEKqwBNXfE' },\n    },\n  },\n});\n\nconsole.log(item.id);",
      },
      python: {
        method: 'collections.items.create',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nitem = client.collections.items.create(\n    collection_id="collection_id",\n    values={\n        "name": {\n            "type": "value/text/single_line",\n            "data": "Aperture Science",\n        },\n        "ceo": {\n            "type": "value/relation",\n            "data": {\n                "type": "item",\n                "id": "1CLJt2v84CdKMEKqwBNXfE",\n            },\n        },\n    },\n)\nprint(item.id)',
      },
      go: {
        method: 'client.Collections.Items.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\titem, err := client.Collections.Items.New(\n\t\tcontext.TODO(),\n\t\t"collection_id",\n\t\tmoonbase.CollectionItemNewParams{\n\t\t\tValues: map[string]moonbase.FieldValueParamUnion{\n\t\t\t\t"name": {\n\t\t\t\t\tOfSingleLineText: &moonbase.SingleLineTextValueParam{\n\t\t\t\t\t\tData: "Aperture Science",\n\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\t"ceo": {\n\t\t\t\t\tOfRelation: &moonbase.RelationValueParam{\n\t\t\t\t\t\tData: moonbase.ItemPointerParam{\n\t\t\t\t\t\t\tID: "1CLJt2v84CdKMEKqwBNXfE",\n\t\t\t\t\t\t},\n\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", item.ID)\n}\n',
      },
      ruby: {
        method: 'collections.items.create',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nitem = moonbase.collections.items.create(\n  "collection_id",\n  values: {\n    name: {data: "Aperture Science", type: :"value/text/single_line"},\n    ceo: {data: {id: "1CLJt2v84CdKMEKqwBNXfE", type: :item}, type: :"value/relation"}\n  }\n)\n\nputs(item)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/collections/$COLLECTION_ID/items \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "values": {\n            "name": {\n              "data": "Aperture Science",\n              "type": "value/text/single_line"\n            },\n            "ceo": {\n              "data": {\n                "id": "1CLJt2v84CdKMEKqwBNXfE",\n                "type": "item"\n              },\n              "type": "value/relation"\n            }\n          }\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.collections.items.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst item = await client.collections.items.retrieve('id', { collection_id: 'collection_id' });\n\nconsole.log(item.id);",
      },
      python: {
        method: 'collections.items.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nitem = client.collections.items.retrieve(\n    id="id",\n    collection_id="collection_id",\n)\nprint(item.id)',
      },
      go: {
        method: 'client.Collections.Items.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\titem, err := client.Collections.Items.Get(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.CollectionItemGetParams{\n\t\t\tCollectionID: "collection_id",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", item.ID)\n}\n',
      },
      ruby: {
        method: 'collections.items.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nitem = moonbase.collections.items.retrieve("id", collection_id: "collection_id")\n\nputs(item)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/collections/$COLLECTION_ID/items/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.collections.items.update',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst item = await client.collections.items.update('id', {\n  collection_id: 'collection_id',\n  values: { name: { type: 'value/text/single_line', data: 'Jony Appleseed' } },\n});\n\nconsole.log(item.id);",
      },
      python: {
        method: 'collections.items.update',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nitem = client.collections.items.update(\n    id="id",\n    collection_id="collection_id",\n    values={\n        "name": {\n            "type": "value/text/single_line",\n            "data": "Jony Appleseed",\n        }\n    },\n)\nprint(item.id)',
      },
      go: {
        method: 'client.Collections.Items.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\titem, err := client.Collections.Items.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.CollectionItemUpdateParams{\n\t\t\tCollectionID: "collection_id",\n\t\t\tValues: map[string]moonbase.FieldValueParamUnion{\n\t\t\t\t"name": {\n\t\t\t\t\tOfSingleLineText: &moonbase.SingleLineTextValueParam{\n\t\t\t\t\t\tData: "Jony Appleseed",\n\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", item.ID)\n}\n',
      },
      ruby: {
        method: 'collections.items.update',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nitem = moonbase.collections.items.update(\n  "id",\n  collection_id: "collection_id",\n  values: {name: {data: "Jony Appleseed", type: :"value/text/single_line"}}\n)\n\nputs(item)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/collections/$COLLECTION_ID/items/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "values": {\n            "name": {\n              "data": "Jony Appleseed",\n              "type": "value/text/single_line"\n            }\n          }\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.collections.items.delete',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.collections.items.delete('id', { collection_id: 'collection_id' });",
      },
      python: {
        method: 'collections.items.delete',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nclient.collections.items.delete(\n    id="id",\n    collection_id="collection_id",\n)',
      },
      go: {
        method: 'client.Collections.Items.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Collections.Items.Delete(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.CollectionItemDeleteParams{\n\t\t\tCollectionID: "collection_id",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      ruby: {
        method: 'collections.items.delete',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nresult = moonbase.collections.items.delete("id", collection_id: "collection_id")\n\nputs(result)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/collections/$COLLECTION_ID/items/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.collections.items.upsert',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst item = await client.collections.items.upsert('collection_id', {\n  identifiers: { domain: [{ type: 'value/uri/domain', data: 'aperturescience.com' }] },\n  values: {\n    name: { type: 'value/text/single_line', data: 'Aperture Science' },\n    domain: [{ type: 'value/uri/domain', data: 'aperturescience.com' }],\n    linked_in: {\n      type: 'value/uri/social_linked_in',\n      data: { url: 'https://linkedin.com/company/aperturescience' },\n    },\n  },\n});\n\nconsole.log(item.id);",
      },
      python: {
        method: 'collections.items.upsert',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nitem = client.collections.items.upsert(\n    collection_id="1CLJt2uco2zG6pdjxS37sg",\n    identifiers={\n        "domain": [{\n            "type": "value/uri/domain",\n            "data": "aperturescience.com",\n        }]\n    },\n    values={\n        "name": {\n            "type": "value/text/single_line",\n            "data": "Aperture Science",\n        },\n        "domain": [{\n            "type": "value/uri/domain",\n            "data": "aperturescience.com",\n        }],\n        "linked_in": {\n            "type": "value/uri/social_linked_in",\n            "data": {\n                "url": "https://linkedin.com/company/aperturescience"\n            },\n        },\n    },\n)\nprint(item.id)',
      },
      go: {
        method: 'client.Collections.Items.Upsert',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\titem, err := client.Collections.Items.Upsert(\n\t\tcontext.TODO(),\n\t\t"1CLJt2uco2zG6pdjxS37sg",\n\t\tmoonbase.CollectionItemUpsertParams{\n\t\t\tIdentifiers: map[string]moonbase.FieldValueParamUnion{\n\t\t\t\t"domain": {\n\t\t\t\t\tOfArrayOfValues: []moonbase.ValueParamUnion{{\n\t\t\t\t\t\tOfValueUriDomain: &moonbase.DomainValueParam{\n\t\t\t\t\t\t\tData: "aperturescience.com",\n\t\t\t\t\t\t},\n\t\t\t\t\t}},\n\t\t\t\t},\n\t\t\t},\n\t\t\tValues: map[string]moonbase.FieldValueParamUnion{\n\t\t\t\t"name": {\n\t\t\t\t\tOfSingleLineText: &moonbase.SingleLineTextValueParam{\n\t\t\t\t\t\tData: "Aperture Science",\n\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\t"domain": {\n\t\t\t\t\tOfArrayOfValues: []moonbase.ValueParamUnion{{\n\t\t\t\t\t\tOfValueUriDomain: &moonbase.DomainValueParam{\n\t\t\t\t\t\t\tData: "aperturescience.com",\n\t\t\t\t\t\t},\n\t\t\t\t\t}},\n\t\t\t\t},\n\t\t\t\t"linked_in": {\n\t\t\t\t\tOfLinkedIn: &moonbase.SocialLinkedInValueParam{\n\t\t\t\t\t\tData: moonbase.SocialProfileLinkedInParam{\n\t\t\t\t\t\t\tURL: moonbase.String("https://linkedin.com/company/aperturescience"),\n\t\t\t\t\t\t},\n\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", item.ID)\n}\n',
      },
      ruby: {
        method: 'collections.items.upsert',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nitem = moonbase.collections.items.upsert(\n  "collection_id",\n  identifiers: {domain: [{data: "aperturescience.com", type: :"value/uri/domain"}]},\n  values: {\n    name: {data: "Aperture Science", type: :"value/text/single_line"},\n    domain: [{data: "aperturescience.com", type: :"value/uri/domain"}],\n    linked_in: {data: {}, type: :"value/uri/social_linked_in"}\n  }\n)\n\nputs(item)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/collections/$COLLECTION_ID/items/upsert \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "identifiers": {\n            "domain": [\n              {\n                "data": "aperturescience.com",\n                "type": "value/uri/domain"\n              }\n            ]\n          },\n          "values": {\n            "name": {\n              "data": "Aperture Science",\n              "type": "value/text/single_line"\n            },\n            "domain": [\n              {\n                "data": "aperturescience.com",\n                "type": "value/uri/domain"\n              }\n            ],\n            "linked_in": {\n              "data": {\n                "url": "https://linkedin.com/company/aperturescience"\n              },\n              "type": "value/uri/social_linked_in"\n            }\n          }\n        }\'',
      },
    },
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
    response:
      "{ data: { id: string; collection: collection_pointer; type: 'item'; values: object; }; type: 'search_result'; }",
    markdown:
      "## search\n\n`client.collections.items.search(collection_id: string, after?: string, before?: string, limit?: number, filter?: object | object | object | object | object, include?: string[], sort?: string[]): { data: item; type: 'search_result'; }`\n\n**post** `/collections/{collection_id}/items/search`\n\nReturns a list of items in the collection that match the given filters.\n\n### Parameters\n\n- `collection_id: string`\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n- `filter?: { field: string; op: string; value: string | number | boolean; } | { field: string; op: 'exists'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'and'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'or'; } | { filter: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group; op: 'not'; }`\n  Return only items that match the filter conditions. Complex filters can be created by nesting filters inside of `AND`, `OR`, and `NOT` filters.\n\n- `include?: string[]`\n  Include only specific fields in the returned items. Specify fields by id or key.\n\n- `sort?: string[]`\n  Sort items returned by the specified fields, specified directly by (`name`) or through relations (`organization.name`, `deals.owner.email`). Prefix with a hyphen/minus (`-`) to sort in descending order.\n\n### Returns\n\n- `{ data: { id: string; collection: collection_pointer; type: 'item'; values: object; }; type: 'search_result'; }`\n  A collection search result entry containing an item.\n\n  - `data: { id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; values: object; }`\n  - `type: 'search_result'`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const itemSearchResponse of client.collections.items.search('collection_id')) {\n  console.log(itemSearchResponse);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.items.search',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const itemSearchResponse of client.collections.items.search('collection_id', {\n  filter: {\n    op: 'and',\n    filters: [\n      {\n        op: 'starts_with',\n        field: 'name',\n        value: 'C',\n      },\n      {\n        op: 'ends_with',\n        field: 'name',\n        value: 'e',\n      },\n    ],\n  },\n})) {\n  console.log(itemSearchResponse.data);\n}",
      },
      python: {
        method: 'collections.items.search',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.collections.items.search(\n    collection_id="collection_id",\n    filter={\n        "op": "and",\n        "filters": [{\n            "op": "starts_with",\n            "field": "name",\n            "value": "C",\n        }, {\n            "op": "ends_with",\n            "field": "name",\n            "value": "e",\n        }],\n    },\n)\npage = page.data[0]\nprint(page.data)',
      },
      go: {
        method: 'client.Collections.Items.Search',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Collections.Items.Search(\n\t\tcontext.TODO(),\n\t\t"collection_id",\n\t\tmoonbase.CollectionItemSearchParams{\n\t\t\tFilter: moonbase.ItemsFilterUnionParam{\n\t\t\t\tOfAnd: &moonbase.ItemsFilterAndGroupParam{\n\t\t\t\t\tFilters: []moonbase.ItemsFilterUnionParam{{\n\t\t\t\t\t\tOfItemsFilterValueMatches: &moonbase.ItemsFilterValueMatchesParam{\n\t\t\t\t\t\t\tOp:    moonbase.ItemsFilterValueMatchesOpStartsWith,\n\t\t\t\t\t\t\tField: "name",\n\t\t\t\t\t\t\tValue: moonbase.ItemsFilterValueMatchesValueUnionParam{\n\t\t\t\t\t\t\t\tOfString: moonbase.String("C"),\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t},\n\t\t\t\t\t}, {\n\t\t\t\t\t\tOfItemsFilterValueMatches: &moonbase.ItemsFilterValueMatchesParam{\n\t\t\t\t\t\t\tOp:    moonbase.ItemsFilterValueMatchesOpEndsWith,\n\t\t\t\t\t\t\tField: "name",\n\t\t\t\t\t\t\tValue: moonbase.ItemsFilterValueMatchesValueUnionParam{\n\t\t\t\t\t\t\t\tOfString: moonbase.String("e"),\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t},\n\t\t\t\t\t}},\n\t\t\t\t},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'collections.items.search',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.collections.items.search("collection_id")\n\nputs(page)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/collections/$COLLECTION_ID/items/search \\\n    -X POST \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'merge',
    endpoint: '/collections/{collection_id}/items/merge',
    httpMethod: 'post',
    summary: 'Merges two items in a collection',
    description: 'Merges two items into a single item.',
    stainlessPath: '(resource) collections.items > (method) merge',
    qualified: 'client.collections.items.merge',
    params: [
      'collection_id: string;',
      "destination: { id: string; type: 'item'; };",
      "source: { id: string; type: 'item'; };",
    ],
    response:
      "{ id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; values: object; }",
    markdown:
      "## merge\n\n`client.collections.items.merge(collection_id: string, destination: { id: string; type: 'item'; }, source: { id: string; type: 'item'; }): { id: string; collection: collection_pointer; type: 'item'; values: object; }`\n\n**post** `/collections/{collection_id}/items/merge`\n\nMerges two items into a single item.\n\n### Parameters\n\n- `collection_id: string`\n\n- `destination: { id: string; type: 'item'; }`\n  The destination item pointer. This will be the remaining merged item.\n  - `id: string`\n    Unique identifier of the item.\n  - `type: 'item'`\n    String representing the object’s type. Always `item` for this object.\n\n- `source: { id: string; type: 'item'; }`\n  The source item pointer. This item will be deleted.\n  - `id: string`\n    Unique identifier of the item.\n  - `type: 'item'`\n    String representing the object’s type. Always `item` for this object.\n\n### Returns\n\n- `{ id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; values: object; }`\n  An Item represents a single record or row within a Collection. It holds a set of `values` corresponding to the Collection's `fields`.\n\n  - `id: string`\n  - `collection: { id: string; ref: string; type: 'collection'; }`\n  - `type: 'item'`\n  - `values: object`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst item = await client.collections.items.merge('collection_id', {\n  destination: { id: '1CLJt2v7opRhSWqVEtHwYT', type: 'item' },\n  source: { id: '1CLJt2v5aNd8G5SGzEaeVU', type: 'item' },\n});\n\nconsole.log(item);\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.items.merge',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst item = await client.collections.items.merge('collection_id', {\n  destination: { type: 'item', id: '1CLJt2v7opRhSWqVEtHwYT' },\n  source: { type: 'item', id: '1CLJt2v5aNd8G5SGzEaeVU' },\n});\n\nconsole.log(item.id);",
      },
      python: {
        method: 'collections.items.merge',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nitem = client.collections.items.merge(\n    collection_id="collection_id",\n    destination={\n        "type": "item",\n        "id": "1CLJt2v7opRhSWqVEtHwYT",\n    },\n    source={\n        "type": "item",\n        "id": "1CLJt2v5aNd8G5SGzEaeVU",\n    },\n)\nprint(item.id)',
      },
      go: {
        method: 'client.Collections.Items.Merge',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\titem, err := client.Collections.Items.Merge(\n\t\tcontext.TODO(),\n\t\t"collection_id",\n\t\tmoonbase.CollectionItemMergeParams{\n\t\t\tDestination: moonbase.ItemPointerParam{\n\t\t\t\tID: "1CLJt2v7opRhSWqVEtHwYT",\n\t\t\t},\n\t\t\tSource: moonbase.ItemPointerParam{\n\t\t\t\tID: "1CLJt2v5aNd8G5SGzEaeVU",\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", item.ID)\n}\n',
      },
      ruby: {
        method: 'collections.items.merge',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nitem = moonbase.collections.items.merge(\n  "collection_id",\n  destination: {id: "1CLJt2v7opRhSWqVEtHwYT", type: :item},\n  source: {id: "1CLJt2v5aNd8G5SGzEaeVU", type: :item}\n)\n\nputs(item)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/collections/$COLLECTION_ID/items/merge \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "destination": {\n            "id": "1CLJt2v7opRhSWqVEtHwYT",\n            "type": "item"\n          },\n          "source": {\n            "id": "1CLJt2v5aNd8G5SGzEaeVU",\n            "type": "item"\n          }\n        }\'',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/views',
    httpMethod: 'get',
    summary: 'List views',
    description: 'Returns a list of views.',
    stainlessPath: '(resource) views > (method) list',
    qualified: 'client.views.list',
    params: ['after?: string;', 'before?: string;', 'limit?: number;'],
    response:
      "{ id: string; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }",
    markdown:
      "## list\n\n`client.views.list(after?: string, before?: string, limit?: number): { id: string; collection: collection_pointer; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }`\n\n**get** `/views`\n\nReturns a list of views.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; name: string; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }`\n\n  - `id: string`\n  - `collection: { id: string; ref: string; type: 'collection'; }`\n  - `created_at: string`\n  - `name: string`\n  - `type: 'view'`\n  - `updated_at: string`\n  - `view_type: 'table' | 'board'`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const viewListResponse of client.views.list()) {\n  console.log(viewListResponse);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.views.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const viewListResponse of client.views.list()) {\n  console.log(viewListResponse.id);\n}",
      },
      python: {
        method: 'views.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.views.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Views.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Views.List(context.TODO(), moonbase.ViewListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'views.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.views.list\n\nputs(page)',
      },
      http: {
        example: 'curl https://api.moonbase.ai/v0/views \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/views',
    httpMethod: 'post',
    summary: 'Create a view',
    description: 'Creates a new view in a collection.',
    stainlessPath: '(resource) views > (method) create',
    qualified: 'client.views.create',
    params: [
      "collection: { type: 'collection'; id?: string; ref?: string; };",
      "fields: { field: string; display_fields?: string[]; is_pinned?: boolean; is_wrapped?: boolean; size?: number | 'fit' | 'flex'; }[];",
      'name: string;',
      "view_type: 'table' | 'board';",
      "aggregates?: { type: 'item_count'; group?: string; } | { statistic: 'count' | 'sum' | 'mean' | 'max' | 'min' | 'filled_percentage'; type: 'field_statistic'; value: string; group?: string; weight?: string; }[];",
      "filter?: { field: string; op: string; value: string | number | boolean; } | { field: string; op: 'exists'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'and'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'or'; } | { filter: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group; op: 'not'; };",
      'groups?: string[];',
      'relation_value_filters?: { field: string; filter: object | object | object | object | object; }[];',
      'sort?: string[];',
    ],
    response:
      "{ id: string; aggregates: object | object[]; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; fields: { field: string; display_fields?: string[]; is_pinned?: boolean; is_wrapped?: boolean; size?: number | 'fit' | 'flex'; }[]; filter: object | object | object | object | object; groups: string[]; name: string; relation_value_filters: { field: string; filter: items_filter; }[]; sort: string[]; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }",
    markdown:
      "## create\n\n`client.views.create(collection: { type: 'collection'; id?: string; ref?: string; }, fields: { field: string; display_fields?: string[]; is_pinned?: boolean; is_wrapped?: boolean; size?: number | 'fit' | 'flex'; }[], name: string, view_type: 'table' | 'board', aggregates?: object | object[], filter?: object | object | object | object | object, groups?: string[], relation_value_filters?: { field: string; filter: items_filter; }[], sort?: string[]): { id: string; aggregates: view_aggregate[]; collection: collection_pointer; created_at: string; fields: view_field[]; filter: items_filter; groups: string[]; name: string; relation_value_filters: view_relation_value_filter[]; sort: string[]; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }`\n\n**post** `/views`\n\nCreates a new view in a collection.\n\n### Parameters\n\n- `collection: { type: 'collection'; id?: string; ref?: string; }`\n  A pointer to the `Collection` the view belongs to.\n  - `type: 'collection'`\n    String representing the object’s type. Always `collection` for this object.\n  - `id?: string`\n    Unique identifier of the collection.\n  - `ref?: string`\n    The stable, machine-readable reference identifier of the collection.\n\n- `fields: { field: string; display_fields?: string[]; is_pinned?: boolean; is_wrapped?: boolean; size?: number | 'fit' | 'flex'; }[]`\n  The view's columns, in display order.\n\n- `name: string`\n  The name of the view.\n\n- `view_type: 'table' | 'board'`\n  The type of view, `table` or `board`.\n\n- `aggregates?: { type: 'item_count'; group?: string; } | { statistic: 'count' | 'sum' | 'mean' | 'max' | 'min' | 'filled_percentage'; type: 'field_statistic'; value: string; group?: string; weight?: string; }[]`\n  The metrics computed over the view's items.\n\n- `filter?: { field: string; op: string; value: string | number | boolean; } | { field: string; op: 'exists'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'and'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'or'; } | { filter: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group; op: 'not'; }`\n  The filter applied to the view's items.\n\n- `groups?: string[]`\n  Fields whose values group the view's items.\n\n- `relation_value_filters?: { field: string; filter: object | object | object | object | object; }[]`\n  Filters limiting which related items the view's relation columns show.\n\n- `sort?: string[]`\n  Sort items returned by the specified fields.\n\n### Returns\n\n- `{ id: string; aggregates: object | object[]; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; fields: { field: string; display_fields?: string[]; is_pinned?: boolean; is_wrapped?: boolean; size?: number | 'fit' | 'flex'; }[]; filter: object | object | object | object | object; groups: string[]; name: string; relation_value_filters: { field: string; filter: items_filter; }[]; sort: string[]; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }`\n  A View represents a saved configuration for displaying items in a collection, including filters and sorting rules.\n\n  - `id: string`\n  - `aggregates: { type: 'item_count'; group?: string; } | { statistic: 'count' | 'sum' | 'mean' | 'max' | 'min' | 'filled_percentage'; type: 'field_statistic'; value: string; group?: string; weight?: string; }[]`\n  - `collection: { id: string; ref: string; type: 'collection'; }`\n  - `created_at: string`\n  - `fields: { field: string; display_fields?: string[]; is_pinned?: boolean; is_wrapped?: boolean; size?: number | 'fit' | 'flex'; }[]`\n  - `filter: { field: string; op: string; value: string | number | boolean; } | { field: string; op: 'exists'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'and'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'or'; } | { filter: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group; op: 'not'; }`\n  - `groups: string[]`\n  - `name: string`\n  - `relation_value_filters: { field: string; filter: object | object | object | object | object; }[]`\n  - `sort: string[]`\n  - `type: 'view'`\n  - `updated_at: string`\n  - `view_type: 'table' | 'board'`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst view = await client.views.create({\n  collection: { type: 'collection' },\n  fields: [{ field: 'name' }, { field: 'email' }],\n  name: 'Active leads',\n  view_type: 'table',\n});\n\nconsole.log(view);\n```",
    perLanguage: {
      typescript: {
        method: 'client.views.create',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst view = await client.views.create({\n  collection: { type: 'collection', ref: 'people' },\n  fields: [{ field: 'name' }, { field: 'email' }],\n  name: 'Active leads',\n  view_type: 'table',\n  filter: {\n    field: 'name',\n    op: 'contains',\n    value: 'Acme',\n  },\n  sort: ['-name'],\n});\n\nconsole.log(view.id);",
      },
      python: {
        method: 'views.create',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nview = client.views.create(\n    collection={\n        "type": "collection",\n        "ref": "people",\n    },\n    fields=[{\n        "field": "name"\n    }, {\n        "field": "email"\n    }],\n    name="Active leads",\n    view_type="table",\n    filter={\n        "field": "name",\n        "op": "contains",\n        "value": "Acme",\n    },\n    sort=["-name"],\n)\nprint(view.id)',
      },
      go: {
        method: 'client.Views.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tview, err := client.Views.New(context.TODO(), moonbase.ViewNewParams{\n\t\tCollection: moonbase.ViewNewParamsCollection{\n\t\t\tRef: moonbase.String("people"),\n\t\t},\n\t\tFields: []moonbase.ViewFieldParam{{\n\t\t\tField: "name",\n\t\t}, {\n\t\t\tField: "email",\n\t\t}},\n\t\tName:     "Active leads",\n\t\tViewType: moonbase.ViewNewParamsViewTypeTable,\n\t\tFilter: moonbase.ItemsFilterUnionParam{\n\t\t\tOfItemsFilterValueMatches: &moonbase.ItemsFilterValueMatchesParam{\n\t\t\t\tField: "name",\n\t\t\t\tOp:    moonbase.ItemsFilterValueMatchesOpContains,\n\t\t\t\tValue: moonbase.ItemsFilterValueMatchesValueUnionParam{\n\t\t\t\t\tOfString: moonbase.String("Acme"),\n\t\t\t\t},\n\t\t\t},\n\t\t},\n\t\tSort: []string{"-name"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", view.ID)\n}\n',
      },
      ruby: {
        method: 'views.create',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nview = moonbase.views.create(\n  collection: {type: :collection},\n  fields: [{field: "name"}, {field: "email"}],\n  name: "Active leads",\n  view_type: :table\n)\n\nputs(view)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/views \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "collection": {\n            "type": "collection",\n            "ref": "people"\n          },\n          "fields": [\n            {\n              "field": "name"\n            },\n            {\n              "field": "email"\n            }\n          ],\n          "name": "Active leads",\n          "view_type": "table",\n          "filter": {\n            "field": "name",\n            "op": "contains",\n            "value": "Acme"\n          },\n          "sort": [\n            "-name"\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/views/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a view',
    description: 'Retrieves the details of an existing view.',
    stainlessPath: '(resource) views > (method) retrieve',
    qualified: 'client.views.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; aggregates: object | object[]; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; fields: { field: string; display_fields?: string[]; is_pinned?: boolean; is_wrapped?: boolean; size?: number | 'fit' | 'flex'; }[]; filter: object | object | object | object | object; groups: string[]; name: string; relation_value_filters: { field: string; filter: items_filter; }[]; sort: string[]; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }",
    markdown:
      "## retrieve\n\n`client.views.retrieve(id: string): { id: string; aggregates: view_aggregate[]; collection: collection_pointer; created_at: string; fields: view_field[]; filter: items_filter; groups: string[]; name: string; relation_value_filters: view_relation_value_filter[]; sort: string[]; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }`\n\n**get** `/views/{id}`\n\nRetrieves the details of an existing view.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; aggregates: object | object[]; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; fields: { field: string; display_fields?: string[]; is_pinned?: boolean; is_wrapped?: boolean; size?: number | 'fit' | 'flex'; }[]; filter: object | object | object | object | object; groups: string[]; name: string; relation_value_filters: { field: string; filter: items_filter; }[]; sort: string[]; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }`\n  A View represents a saved configuration for displaying items in a collection, including filters and sorting rules.\n\n  - `id: string`\n  - `aggregates: { type: 'item_count'; group?: string; } | { statistic: 'count' | 'sum' | 'mean' | 'max' | 'min' | 'filled_percentage'; type: 'field_statistic'; value: string; group?: string; weight?: string; }[]`\n  - `collection: { id: string; ref: string; type: 'collection'; }`\n  - `created_at: string`\n  - `fields: { field: string; display_fields?: string[]; is_pinned?: boolean; is_wrapped?: boolean; size?: number | 'fit' | 'flex'; }[]`\n  - `filter: { field: string; op: string; value: string | number | boolean; } | { field: string; op: 'exists'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'and'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'or'; } | { filter: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group; op: 'not'; }`\n  - `groups: string[]`\n  - `name: string`\n  - `relation_value_filters: { field: string; filter: object | object | object | object | object; }[]`\n  - `sort: string[]`\n  - `type: 'view'`\n  - `updated_at: string`\n  - `view_type: 'table' | 'board'`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst view = await client.views.retrieve('id');\n\nconsole.log(view);\n```",
    perLanguage: {
      typescript: {
        method: 'client.views.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst view = await client.views.retrieve('id');\n\nconsole.log(view.id);",
      },
      python: {
        method: 'views.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nview = client.views.retrieve(\n    "id",\n)\nprint(view.id)',
      },
      go: {
        method: 'client.Views.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tview, err := client.Views.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", view.ID)\n}\n',
      },
      ruby: {
        method: 'views.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nview = moonbase.views.retrieve("id")\n\nputs(view)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/views/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/views/{id}',
    httpMethod: 'patch',
    summary: 'Update a view',
    description: 'Updates a view. The change applies to the shared view that everyone in the workspace sees.',
    stainlessPath: '(resource) views > (method) update',
    qualified: 'client.views.update',
    params: [
      'id: string;',
      "aggregates?: { type: 'item_count'; group?: string; } | { statistic: 'count' | 'sum' | 'mean' | 'max' | 'min' | 'filled_percentage'; type: 'field_statistic'; value: string; group?: string; weight?: string; }[];",
      "fields?: { field: string; display_fields?: string[]; is_pinned?: boolean; is_wrapped?: boolean; size?: number | 'fit' | 'flex'; }[];",
      "filter?: { field: string; op: string; value: string | number | boolean; } | { field: string; op: 'exists'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'and'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'or'; } | { filter: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group; op: 'not'; };",
      'groups?: string[];',
      'name?: string;',
      'relation_value_filters?: { field: string; filter: object | object | object | object | object; }[];',
      'sort?: string[];',
      "view_type?: 'table' | 'board';",
    ],
    response:
      "{ id: string; aggregates: object | object[]; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; fields: { field: string; display_fields?: string[]; is_pinned?: boolean; is_wrapped?: boolean; size?: number | 'fit' | 'flex'; }[]; filter: object | object | object | object | object; groups: string[]; name: string; relation_value_filters: { field: string; filter: items_filter; }[]; sort: string[]; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }",
    markdown:
      "## update\n\n`client.views.update(id: string, aggregates?: object | object[], fields?: { field: string; display_fields?: string[]; is_pinned?: boolean; is_wrapped?: boolean; size?: number | 'fit' | 'flex'; }[], filter?: object | object | object | object | object, groups?: string[], name?: string, relation_value_filters?: { field: string; filter: items_filter; }[], sort?: string[], view_type?: 'table' | 'board'): { id: string; aggregates: view_aggregate[]; collection: collection_pointer; created_at: string; fields: view_field[]; filter: items_filter; groups: string[]; name: string; relation_value_filters: view_relation_value_filter[]; sort: string[]; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }`\n\n**patch** `/views/{id}`\n\nUpdates a view. The change applies to the shared view that everyone in the workspace sees.\n\n### Parameters\n\n- `id: string`\n\n- `aggregates?: { type: 'item_count'; group?: string; } | { statistic: 'count' | 'sum' | 'mean' | 'max' | 'min' | 'filled_percentage'; type: 'field_statistic'; value: string; group?: string; weight?: string; }[]`\n  The metrics computed over the view's items. An empty array clears them.\n\n- `fields?: { field: string; display_fields?: string[]; is_pinned?: boolean; is_wrapped?: boolean; size?: number | 'fit' | 'flex'; }[]`\n  The view's columns, in display order. If provided, it must contain at least one column.\n\n- `filter?: { field: string; op: string; value: string | number | boolean; } | { field: string; op: 'exists'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'and'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'or'; } | { filter: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group; op: 'not'; }`\n  Return only items that match the filter conditions. Complex filters can be created by nesting filters inside of `AND`, `OR`, and `NOT` filters.\n\n- `groups?: string[]`\n  Fields whose values group the view's items. An empty array clears the grouping.\n\n- `name?: string`\n  The name of the view.\n\n- `relation_value_filters?: { field: string; filter: object | object | object | object | object; }[]`\n  Filters limiting which related items the view's relation columns show. An empty array clears them.\n\n- `sort?: string[]`\n  Sort items returned by the specified fields. An empty array clears the sort.\n\n- `view_type?: 'table' | 'board'`\n  The type of view, `table` or `board`.\n\n### Returns\n\n- `{ id: string; aggregates: object | object[]; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; fields: { field: string; display_fields?: string[]; is_pinned?: boolean; is_wrapped?: boolean; size?: number | 'fit' | 'flex'; }[]; filter: object | object | object | object | object; groups: string[]; name: string; relation_value_filters: { field: string; filter: items_filter; }[]; sort: string[]; type: 'view'; updated_at: string; view_type: 'table' | 'board'; }`\n  A View represents a saved configuration for displaying items in a collection, including filters and sorting rules.\n\n  - `id: string`\n  - `aggregates: { type: 'item_count'; group?: string; } | { statistic: 'count' | 'sum' | 'mean' | 'max' | 'min' | 'filled_percentage'; type: 'field_statistic'; value: string; group?: string; weight?: string; }[]`\n  - `collection: { id: string; ref: string; type: 'collection'; }`\n  - `created_at: string`\n  - `fields: { field: string; display_fields?: string[]; is_pinned?: boolean; is_wrapped?: boolean; size?: number | 'fit' | 'flex'; }[]`\n  - `filter: { field: string; op: string; value: string | number | boolean; } | { field: string; op: 'exists'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'and'; } | { filters: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group[]; op: 'or'; } | { filter: items_filter_value_matches | items_filter_value_exists | items_filter_and_group | items_filter_or_group | items_filter_not_group; op: 'not'; }`\n  - `groups: string[]`\n  - `name: string`\n  - `relation_value_filters: { field: string; filter: object | object | object | object | object; }[]`\n  - `sort: string[]`\n  - `type: 'view'`\n  - `updated_at: string`\n  - `view_type: 'table' | 'board'`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst view = await client.views.update('id');\n\nconsole.log(view);\n```",
    perLanguage: {
      typescript: {
        method: 'client.views.update',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst view = await client.views.update('id', {\n  aggregates: [{ type: 'item_count', group: 'stage' }],\n  fields: [\n    { field: 'name', is_pinned: true },\n    { field: 'amount' },\n    { field: 'stage' },\n    { field: 'owner', display_fields: ['name', 'email'] },\n    { field: 'related_tasks' },\n  ],\n  filter: {\n    field: 'name',\n    op: 'eq',\n    value: 'Acme',\n  },\n  groups: ['stage'],\n  name: 'Active deals',\n  relation_value_filters: [\n    {\n      field: 'related_tasks',\n      filter: {\n        field: 'state',\n        op: 'eq',\n        value: 'Open',\n      },\n    },\n  ],\n  sort: ['-name'],\n});\n\nconsole.log(view.id);",
      },
      python: {
        method: 'views.update',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nview = client.views.update(\n    id="id",\n    aggregates=[{\n        "type": "item_count",\n        "group": "stage",\n    }],\n    fields=[{\n        "field": "name",\n        "is_pinned": True,\n    }, {\n        "field": "amount"\n    }, {\n        "field": "stage"\n    }, {\n        "field": "owner",\n        "display_fields": ["name", "email"],\n    }, {\n        "field": "related_tasks"\n    }],\n    filter={\n        "field": "name",\n        "op": "eq",\n        "value": "Acme",\n    },\n    groups=["stage"],\n    name="Active deals",\n    relation_value_filters=[{\n        "field": "related_tasks",\n        "filter": {\n            "field": "state",\n            "op": "eq",\n            "value": "Open",\n        },\n    }],\n    sort=["-name"],\n)\nprint(view.id)',
      },
      go: {
        method: 'client.Views.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tview, err := client.Views.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.ViewUpdateParams{\n\t\t\tAggregates: []moonbase.ViewAggregateUnionParam{{\n\t\t\t\tOfItemCount: &moonbase.ViewAggregateItemCountParam{\n\t\t\t\t\tGroup: moonbase.String("stage"),\n\t\t\t\t},\n\t\t\t}},\n\t\t\tFields: []moonbase.ViewFieldParam{{\n\t\t\t\tField:    "name",\n\t\t\t\tIsPinned: moonbase.Bool(true),\n\t\t\t}, {\n\t\t\t\tField: "amount",\n\t\t\t}, {\n\t\t\t\tField: "stage",\n\t\t\t}, {\n\t\t\t\tField:         "owner",\n\t\t\t\tDisplayFields: []string{"name", "email"},\n\t\t\t}, {\n\t\t\t\tField: "related_tasks",\n\t\t\t}},\n\t\t\tFilter: moonbase.ItemsFilterUnionParam{\n\t\t\t\tOfItemsFilterValueMatches: &moonbase.ItemsFilterValueMatchesParam{\n\t\t\t\t\tField: "name",\n\t\t\t\t\tOp:    moonbase.ItemsFilterValueMatchesOpEq,\n\t\t\t\t\tValue: moonbase.ItemsFilterValueMatchesValueUnionParam{\n\t\t\t\t\t\tOfString: moonbase.String("Acme"),\n\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t},\n\t\t\tGroups: []string{"stage"},\n\t\t\tName:   moonbase.String("Active deals"),\n\t\t\tRelationValueFilters: []moonbase.ViewRelationValueFilterParam{{\n\t\t\t\tField: "related_tasks",\n\t\t\t\tFilter: moonbase.ItemsFilterUnionParam{\n\t\t\t\t\tOfItemsFilterValueMatches: &moonbase.ItemsFilterValueMatchesParam{\n\t\t\t\t\t\tField: "state",\n\t\t\t\t\t\tOp:    moonbase.ItemsFilterValueMatchesOpEq,\n\t\t\t\t\t\tValue: moonbase.ItemsFilterValueMatchesValueUnionParam{\n\t\t\t\t\t\t\tOfString: moonbase.String("Open"),\n\t\t\t\t\t\t},\n\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t}},\n\t\t\tSort: []string{"-name"},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", view.ID)\n}\n',
      },
      ruby: {
        method: 'views.update',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nview = moonbase.views.update("id")\n\nputs(view)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/views/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "aggregates": [\n            {\n              "type": "item_count",\n              "group": "stage"\n            }\n          ],\n          "fields": [\n            {\n              "field": "name",\n              "is_pinned": true\n            },\n            {\n              "field": "amount"\n            },\n            {\n              "field": "stage"\n            },\n            {\n              "field": "owner",\n              "display_fields": [\n                "name",\n                "email"\n              ]\n            },\n            {\n              "field": "related_tasks"\n            }\n          ],\n          "filter": {\n            "field": "name",\n            "op": "eq",\n            "value": "Acme"\n          },\n          "groups": [\n            "stage"\n          ],\n          "name": "Active deals",\n          "relation_value_filters": [\n            {\n              "field": "related_tasks",\n              "filter": {\n                "field": "state",\n                "op": "eq",\n                "value": "Open"\n              }\n            }\n          ],\n          "sort": [\n            "-name"\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/views/{id}',
    httpMethod: 'delete',
    summary: 'Delete a view',
    description: 'Permanently deletes a view. The default view of a collection cannot be deleted.',
    stainlessPath: '(resource) views > (method) delete',
    qualified: 'client.views.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.views.delete(id: string): void`\n\n**delete** `/views/{id}`\n\nPermanently deletes a view. The default view of a collection cannot be deleted.\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nawait client.views.delete('id')\n```",
    perLanguage: {
      typescript: {
        method: 'client.views.delete',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.views.delete('id');",
      },
      python: {
        method: 'views.delete',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nclient.views.delete(\n    "id",\n)',
      },
      go: {
        method: 'client.Views.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Views.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      ruby: {
        method: 'views.delete',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nresult = moonbase.views.delete("id")\n\nputs(result)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/views/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.views.items.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const item of client.views.items.list('id')) {\n  console.log(item.id);\n}",
      },
      python: {
        method: 'views.items.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.views.items.list(\n    id="id",\n)\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Views.Items.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Views.Items.List(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.ViewItemListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'views.items.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.views.items.list("id")\n\nputs(page)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/views/$ID/items \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/inboxes',
    httpMethod: 'get',
    summary: 'List shared inboxes',
    description: 'Returns a list of shared inboxes.',
    stainlessPath: '(resource) inboxes > (method) list',
    qualified: 'client.inboxes.list',
    params: ['after?: string;', 'before?: string;', 'limit?: number;'],
    response:
      "{ id: string; created_at: string; name: string; tagsets: { id: string; type: 'tagset'; }[]; type: 'inbox'; updated_at: string; can_read?: boolean; }",
    markdown:
      "## list\n\n`client.inboxes.list(after?: string, before?: string, limit?: number): { id: string; created_at: string; name: string; tagsets: tagset_pointer[]; type: 'inbox'; updated_at: string; can_read?: boolean; }`\n\n**get** `/inboxes`\n\nReturns a list of shared inboxes.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; created_at: string; name: string; tagsets: { id: string; type: 'tagset'; }[]; type: 'inbox'; updated_at: string; can_read?: boolean; }`\n  The Inbox object represents a shared inbox for receiving and sending messages.\n\n  - `id: string`\n  - `created_at: string`\n  - `name: string`\n  - `tagsets: { id: string; type: 'tagset'; }[]`\n  - `type: 'inbox'`\n  - `updated_at: string`\n  - `can_read?: boolean`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const inbox of client.inboxes.list()) {\n  console.log(inbox);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.inboxes.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const inbox of client.inboxes.list()) {\n  console.log(inbox.id);\n}",
      },
      python: {
        method: 'inboxes.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.inboxes.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Inboxes.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Inboxes.List(context.TODO(), moonbase.InboxListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'inboxes.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.inboxes.list\n\nputs(page)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/inboxes \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/inboxes/{id}',
    httpMethod: 'get',
    summary: 'Retrieve an inbox',
    description: 'Retrieves the details of an existing inbox.',
    stainlessPath: '(resource) inboxes > (method) retrieve',
    qualified: 'client.inboxes.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; created_at: string; name: string; tagsets: { id: string; type: 'tagset'; }[]; type: 'inbox'; updated_at: string; can_read?: boolean; }",
    markdown:
      "## retrieve\n\n`client.inboxes.retrieve(id: string): { id: string; created_at: string; name: string; tagsets: tagset_pointer[]; type: 'inbox'; updated_at: string; can_read?: boolean; }`\n\n**get** `/inboxes/{id}`\n\nRetrieves the details of an existing inbox.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; created_at: string; name: string; tagsets: { id: string; type: 'tagset'; }[]; type: 'inbox'; updated_at: string; can_read?: boolean; }`\n  The Inbox object represents a shared inbox for receiving and sending messages.\n\n  - `id: string`\n  - `created_at: string`\n  - `name: string`\n  - `tagsets: { id: string; type: 'tagset'; }[]`\n  - `type: 'inbox'`\n  - `updated_at: string`\n  - `can_read?: boolean`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst inbox = await client.inboxes.retrieve('id');\n\nconsole.log(inbox);\n```",
    perLanguage: {
      typescript: {
        method: 'client.inboxes.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst inbox = await client.inboxes.retrieve('id');\n\nconsole.log(inbox.id);",
      },
      python: {
        method: 'inboxes.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\ninbox = client.inboxes.retrieve(\n    "id",\n)\nprint(inbox.id)',
      },
      go: {
        method: 'client.Inboxes.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tinbox, err := client.Inboxes.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", inbox.ID)\n}\n',
      },
      ruby: {
        method: 'inboxes.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\ninbox = moonbase.inboxes.retrieve("id")\n\nputs(inbox)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/inboxes/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/inbox_conversations',
    httpMethod: 'get',
    summary: 'List conversations',
    description: 'Returns a list of your conversations.',
    stainlessPath: '(resource) inbox_conversations > (method) list',
    qualified: 'client.inboxConversations.list',
    params: ['after?: string;', 'before?: string;', 'inbox_id?: { eq?: string; };', 'limit?: number;'],
    response: "{ id: string; type: 'inbox_conversation'; }",
    markdown:
      "## list\n\n`client.inboxConversations.list(after?: string, before?: string, inbox_id?: { eq?: string; }, limit?: number): { id: string; type: 'inbox_conversation'; }`\n\n**get** `/inbox_conversations`\n\nReturns a list of your conversations.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `inbox_id?: { eq?: string; }`\n  - `eq?: string`\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; type: 'inbox_conversation'; }`\n\n  - `id: string`\n  - `type: 'inbox_conversation'`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const inboxConversationListResponse of client.inboxConversations.list()) {\n  console.log(inboxConversationListResponse);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.inboxConversations.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const inboxConversationListResponse of client.inboxConversations.list()) {\n  console.log(inboxConversationListResponse.id);\n}",
      },
      python: {
        method: 'inbox_conversations.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.inbox_conversations.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.InboxConversations.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.InboxConversations.List(context.TODO(), moonbase.InboxConversationListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'inbox_conversations.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.inbox_conversations.list\n\nputs(page)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/inbox_conversations \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "{ id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: { id: string; created_at: string; name: string; tagsets: tagset_pointer[]; type: 'inbox'; updated_at: string; can_read?: boolean; }; messages?: object[]; unsnooze_at?: string; }",
    markdown:
      "## retrieve\n\n`client.inboxConversations.retrieve(id: string, include?: 'inbox' | 'messages' | 'messages.addresses'[]): { id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: tag[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: inbox; messages?: object[]; unsnooze_at?: string; }`\n\n**get** `/inbox_conversations/{id}`\n\nRetrieves the details of an existing conversation.\n\n### Parameters\n\n- `id: string`\n\n- `include?: 'inbox' | 'messages' | 'messages.addresses'[]`\n  Specifies which related objects to include in the response. Valid options are `inbox`, `messages`, and `messages.addresses`.\n\n### Returns\n\n- `{ id: string; bulk: boolean; created_at: string; draft: boolean; follow_up: boolean; last_message_at: string; spam: boolean; state: 'unassigned' | 'active' | 'closed' | 'waiting'; subject: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; trash: boolean; type: 'inbox_conversation'; unread: boolean; updated_at: string; inbox?: { id: string; created_at: string; name: string; tagsets: tagset_pointer[]; type: 'inbox'; updated_at: string; can_read?: boolean; }; messages?: object[]; unsnooze_at?: string; }`\n  The Conversation object represents a thread of related messages.\n\n  - `id: string`\n  - `bulk: boolean`\n  - `created_at: string`\n  - `draft: boolean`\n  - `follow_up: boolean`\n  - `last_message_at: string`\n  - `spam: boolean`\n  - `state: 'unassigned' | 'active' | 'closed' | 'waiting'`\n  - `subject: string`\n  - `tags: { id: string; color: string; name: string; type: 'tag'; }[]`\n  - `trash: boolean`\n  - `type: 'inbox_conversation'`\n  - `unread: boolean`\n  - `updated_at: string`\n  - `inbox?: { id: string; created_at: string; name: string; tagsets: { id: string; type: 'tagset'; }[]; type: 'inbox'; updated_at: string; can_read?: boolean; }`\n  - `messages?: object[]`\n  - `unsnooze_at?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst inboxConversation = await client.inboxConversations.retrieve('id');\n\nconsole.log(inboxConversation);\n```",
    perLanguage: {
      typescript: {
        method: 'client.inboxConversations.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst inboxConversation = await client.inboxConversations.retrieve('id');\n\nconsole.log(inboxConversation.id);",
      },
      python: {
        method: 'inbox_conversations.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\ninbox_conversation = client.inbox_conversations.retrieve(\n    id="id",\n)\nprint(inbox_conversation.id)',
      },
      go: {
        method: 'client.InboxConversations.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tinboxConversation, err := client.InboxConversations.Get(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.InboxConversationGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", inboxConversation.ID)\n}\n',
      },
      ruby: {
        method: 'inbox_conversations.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\ninbox_conversation = moonbase.inbox_conversations.retrieve("id")\n\nputs(inbox_conversation)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/inbox_conversations/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      'conversation_id?: { eq?: string; };',
      'inbox_id?: { eq?: string; };',
      'limit?: number;',
    ],
    response: "{ id: string; type: 'message'; }",
    markdown:
      "## list\n\n`client.inboxMessages.list(after?: string, before?: string, conversation_id?: { eq?: string; }, inbox_id?: { eq?: string; }, limit?: number): { id: string; type: 'message'; }`\n\n**get** `/inbox_messages`\n\nReturns a list of messages.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `conversation_id?: { eq?: string; }`\n  - `eq?: string`\n\n- `inbox_id?: { eq?: string; }`\n  - `eq?: string`\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; type: 'message'; }`\n\n  - `id: string`\n  - `type: 'message'`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const messagePointer of client.inboxMessages.list()) {\n  console.log(messagePointer);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.inboxMessages.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const messagePointer of client.inboxMessages.list()) {\n  console.log(messagePointer.id);\n}",
      },
      python: {
        method: 'inbox_messages.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.inbox_messages.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.InboxMessages.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.InboxMessages.List(context.TODO(), moonbase.InboxMessageListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'inbox_messages.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.inbox_messages.list\n\nputs(page)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/inbox_messages \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "{ id: string; body: object; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: object[]; attachments?: object[]; conversation?: object; summary?: string; } | { id: string; body: object; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'slack_message'; unread: boolean; addresses?: object | object[]; attachments?: object[]; conversation?: object; summary?: string; }",
    markdown:
      "## retrieve\n\n`client.inboxMessages.retrieve(id: string, include?: 'addresses' | 'attachments' | 'conversation'[]): object | object`\n\n**get** `/inbox_messages/{id}`\n\nRetrieves the details of an existing message.\n\n### Parameters\n\n- `id: string`\n\n- `include?: 'addresses' | 'attachments' | 'conversation'[]`\n  Specifies which related objects to include in the response. Valid options are `addresses`, `attachments`, and `conversation`.\n\n### Returns\n\n- `{ id: string; body: object; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: object[]; attachments?: object[]; conversation?: object; summary?: string; } | { id: string; body: object; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'slack_message'; unread: boolean; addresses?: object | object[]; attachments?: object[]; conversation?: object; summary?: string; }`\n  The Email Message object represents a single email within a `Conversation`.\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst inboxMessage = await client.inboxMessages.retrieve('id');\n\nconsole.log(inboxMessage);\n```",
    perLanguage: {
      typescript: {
        method: 'client.inboxMessages.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst inboxMessage = await client.inboxMessages.retrieve('id');\n\nconsole.log(inboxMessage);",
      },
      python: {
        method: 'inbox_messages.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\ninbox_message = client.inbox_messages.retrieve(\n    id="id",\n)\nprint(inbox_message)',
      },
      go: {
        method: 'client.InboxMessages.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tinboxMessage, err := client.InboxMessages.Get(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.InboxMessageGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", inboxMessage)\n}\n',
      },
      ruby: {
        method: 'inbox_messages.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\ninbox_message = moonbase.inbox_messages.retrieve("id")\n\nputs(inbox_message)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/inbox_messages/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "message: { body: { markdown?: string; }; inbox_id: string; subject: string; to: { email: string; name?: string; }[]; type: 'email_message'; bcc?: { email: string; name?: string; }[]; cc?: { email: string; name?: string; }[]; } | { body: { markdown?: string; }; inbox_id: string; subject: string; to: { provider_id: string; type: 'slack_channel'; name?: string; }[]; type: 'slack_message'; } | { body: { markdown?: string; }; conversation_id: string; inbox_id: string; type: 'email_message'; bcc?: { email: string; name?: string; }[]; cc?: { email: string; name?: string; }[]; to?: { email: string; name?: string; }[]; } | { body: { markdown?: string; }; conversation_id: string; inbox_id: string; type: 'slack_message'; to?: { provider_id: string; type: 'slack_channel'; name?: string; }[]; };",
    ],
    response:
      "{ id: string; body: object; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: object[]; attachments?: object[]; conversation?: object; summary?: string; } | { id: string; body: object; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'slack_message'; unread: boolean; addresses?: object | object[]; attachments?: object[]; conversation?: object; summary?: string; }",
    markdown:
      "## create\n\n`client.inboxMessages.create(message: { body: object; inbox_id: string; subject: string; to: object[]; type: 'email_message'; bcc?: object[]; cc?: object[]; } | { body: object; inbox_id: string; subject: string; to: object[]; type: 'slack_message'; } | { body: object; conversation_id: string; inbox_id: string; type: 'email_message'; bcc?: object[]; cc?: object[]; to?: object[]; } | { body: object; conversation_id: string; inbox_id: string; type: 'slack_message'; to?: object[]; }): object | object`\n\n**post** `/inbox_messages`\n\nCreates a new message draft.\n\n### Parameters\n\n- `message: { body: { markdown?: string; }; inbox_id: string; subject: string; to: { email: string; name?: string; }[]; type: 'email_message'; bcc?: { email: string; name?: string; }[]; cc?: { email: string; name?: string; }[]; } | { body: { markdown?: string; }; inbox_id: string; subject: string; to: { provider_id: string; type: 'slack_channel'; name?: string; }[]; type: 'slack_message'; } | { body: { markdown?: string; }; conversation_id: string; inbox_id: string; type: 'email_message'; bcc?: { email: string; name?: string; }[]; cc?: { email: string; name?: string; }[]; to?: { email: string; name?: string; }[]; } | { body: { markdown?: string; }; conversation_id: string; inbox_id: string; type: 'slack_message'; to?: { provider_id: string; type: 'slack_channel'; name?: string; }[]; }`\n  Parameters for creating an email message draft. Provide either the fields for a new conversation, or a `conversation_id` to reply to an existing conversation.\n\n### Returns\n\n- `{ id: string; body: object; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: object[]; attachments?: object[]; conversation?: object; summary?: string; } | { id: string; body: object; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'slack_message'; unread: boolean; addresses?: object | object[]; attachments?: object[]; conversation?: object; summary?: string; }`\n  The Email Message object represents a single email within a `Conversation`.\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst inboxMessage = await client.inboxMessages.create({ message: {\n  body: {},\n  inbox_id: '1CLJt2v6KXDyzDuM57pQqo',\n  subject: 'Test Subject',\n  to: [{ email: 'bob@example.com' }, { email: 'jack@example.com' }],\n  type: 'email_message',\n} });\n\nconsole.log(inboxMessage);\n```",
    perLanguage: {
      typescript: {
        method: 'client.inboxMessages.create',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst inboxMessage = await client.inboxMessages.create({\n  message: {\n    body: {},\n    inbox_id: '1CLJt2v6KXDyzDuM57pQqo',\n    subject: 'Test Subject',\n    to: [{ email: 'bob@example.com' }, { email: 'jack@example.com' }],\n    type: 'email_message',\n  },\n});\n\nconsole.log(inboxMessage);",
      },
      python: {
        method: 'inbox_messages.create',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\ninbox_message = client.inbox_messages.create(\n    message={\n        "body": {},\n        "inbox_id": "1CLJt2v6KXDyzDuM57pQqo",\n        "subject": "Test Subject",\n        "to": [{\n            "email": "bob@example.com"\n        }, {\n            "email": "jack@example.com"\n        }],\n        "type": "email_message",\n    },\n)\nprint(inbox_message)',
      },
      go: {
        method: 'client.InboxMessages.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n\t"github.com/moonbaseai/moonbase-sdk-go/shared"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tinboxMessage, err := client.InboxMessages.New(context.TODO(), moonbase.InboxMessageNewParams{\n\t\tOfEmailMessageNewConversationCreates: &moonbase.InboxMessageNewParamsMessageEmailMessageNewConversationCreateParams{\n\t\t\tBody:    shared.FormattedTextParam{},\n\t\t\tInboxID: "1CLJt2v6KXDyzDuM57pQqo",\n\t\t\tSubject: "Test Subject",\n\t\t\tTo: []moonbase.EmailMessageAddressParams{{\n\t\t\t\tEmail: "bob@example.com",\n\t\t\t}, {\n\t\t\t\tEmail: "jack@example.com",\n\t\t\t}},\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", inboxMessage)\n}\n',
      },
      ruby: {
        method: 'inbox_messages.create',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\ninbox_message = moonbase.inbox_messages.create(\n  message: {\n    body: {},\n    inbox_id: "1CLJt2v6KXDyzDuM57pQqo",\n    subject: "Test Subject",\n    to: [{email: "bob@example.com"}, {email: "jack@example.com"}],\n    type: :email_message\n  }\n)\n\nputs(inbox_message)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/inbox_messages \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "body": {\n            "markdown": "This is the body of the message. It supports [markdown](https://en.wikipedia.org/wiki/Markdown)."\n          },\n          "inbox_id": "1CLJt2v6KXDyzDuM57pQqo",\n          "subject": "Test Subject",\n          "to": [\n            {\n              "email": "bob@example.com",\n              "name": "Bob"\n            },\n            {\n              "email": "jack@example.com",\n              "name": "name"\n            }\n          ],\n          "type": "email_message",\n          "bcc": [\n            {\n              "email": "steve@example.com",\n              "name": "Steve"\n            }\n          ],\n          "cc": [\n            {\n              "email": "joe@example.com",\n              "name": "Joe"\n            }\n          ]\n        }\'',
      },
    },
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
      "message: { lock_version: number; type: 'email_message'; bcc?: { email: string; name?: string; }[]; body?: { markdown?: string; }; cc?: { email: string; name?: string; }[]; subject?: string; to?: { email: string; name?: string; }[]; } | { lock_version: number; type: 'slack_message'; body?: { markdown?: string; }; subject?: string; to?: { provider_id: string; type: 'slack_channel'; name?: string; }[]; };",
    ],
    response:
      "{ id: string; body: object; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: object[]; attachments?: object[]; conversation?: object; summary?: string; } | { id: string; body: object; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'slack_message'; unread: boolean; addresses?: object | object[]; attachments?: object[]; conversation?: object; summary?: string; }",
    markdown:
      "## update\n\n`client.inboxMessages.update(id: string, message: { lock_version: number; type: 'email_message'; bcc?: object[]; body?: object; cc?: object[]; subject?: string; to?: object[]; } | { lock_version: number; type: 'slack_message'; body?: object; subject?: string; to?: object[]; }): object | object`\n\n**patch** `/inbox_messages/{id}`\n\nUpdates an existing message draft.\n\n### Parameters\n\n- `id: string`\n\n- `message: { lock_version: number; type: 'email_message'; bcc?: { email: string; name?: string; }[]; body?: { markdown?: string; }; cc?: { email: string; name?: string; }[]; subject?: string; to?: { email: string; name?: string; }[]; } | { lock_version: number; type: 'slack_message'; body?: { markdown?: string; }; subject?: string; to?: { provider_id: string; type: 'slack_channel'; name?: string; }[]; }`\n  Parameters for updating a draft message in an existing conversation.\n\n### Returns\n\n- `{ id: string; body: object; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'email_message'; unread: boolean; addresses?: object[]; attachments?: object[]; conversation?: object; summary?: string; } | { id: string; body: object; bulk: boolean; created_at: string; draft: boolean; lock_version: number; spam: boolean; subject: string; trash: boolean; type: 'slack_message'; unread: boolean; addresses?: object | object[]; attachments?: object[]; conversation?: object; summary?: string; }`\n  The Email Message object represents a single email within a `Conversation`.\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst inboxMessage = await client.inboxMessages.update('id', { message: { lock_version: 0, type: 'email_message' } });\n\nconsole.log(inboxMessage);\n```",
    perLanguage: {
      typescript: {
        method: 'client.inboxMessages.update',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst inboxMessage = await client.inboxMessages.update('id', {\n  message: { lock_version: 0, type: 'email_message' },\n});\n\nconsole.log(inboxMessage);",
      },
      python: {
        method: 'inbox_messages.update',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\ninbox_message = client.inbox_messages.update(\n    id="id",\n    message={\n        "lock_version": 0,\n        "type": "email_message",\n    },\n)\nprint(inbox_message)',
      },
      go: {
        method: 'client.InboxMessages.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tinboxMessage, err := client.InboxMessages.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.InboxMessageUpdateParams{\n\t\t\tOfEmailMessageUpdates: &moonbase.InboxMessageUpdateParamsMessageEmailMessageUpdateParams{\n\t\t\t\tLockVersion: 0,\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", inboxMessage)\n}\n',
      },
      ruby: {
        method: 'inbox_messages.update',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\ninbox_message = moonbase.inbox_messages.update("id", message: {lock_version: 0, type: :email_message})\n\nputs(inbox_message)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/inbox_messages/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "lock_version": 0,\n          "type": "email_message",\n          "bcc": [\n            {\n              "email": "steve@example.com",\n              "name": "Steve"\n            }\n          ],\n          "body": {\n            "markdown": "This is the body of the message. It supports [markdown](https://en.wikipedia.org/wiki/Markdown)."\n          },\n          "cc": [\n            {\n              "email": "joe@example.com",\n              "name": "Joe"\n            }\n          ],\n          "subject": "Test Subject",\n          "to": [\n            {\n              "email": "bob@example.com",\n              "name": "Bob"\n            },\n            {\n              "email": "jack@example.com",\n              "name": "name"\n            }\n          ]\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.inboxMessages.delete',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.inboxMessages.delete('id');",
      },
      python: {
        method: 'inbox_messages.delete',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nclient.inbox_messages.delete(\n    "id",\n)',
      },
      go: {
        method: 'client.InboxMessages.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.InboxMessages.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      ruby: {
        method: 'inbox_messages.delete',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nresult = moonbase.inbox_messages.delete("id")\n\nputs(result)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/inbox_messages/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/inbox_messages/{inbox_message_id}/attachments',
    httpMethod: 'post',
    summary: 'Add an attachment',
    description:
      'Add an attachment to a draft message. You can send either a multipart/form-data request with the raw file content, or a JSON request with a file ID.',
    stainlessPath: '(resource) inbox_messages.attachments > (method) create',
    qualified: 'client.inboxMessages.attachments.create',
    params: ['inbox_message_id: string;', 'file?: string;', 'file_id?: string;'],
    response:
      "{ id: string; created_at: string; download_url: string; filename: string; size: number; type: 'message_attachment'; }",
    markdown:
      "## create\n\n`client.inboxMessages.attachments.create(inbox_message_id: string, file?: string, file_id?: string): { id: string; created_at: string; download_url: string; filename: string; size: number; type: 'message_attachment'; }`\n\n**post** `/inbox_messages/{inbox_message_id}/attachments`\n\nAdd an attachment to a draft message. You can send either a multipart/form-data request with the raw file content, or a JSON request with a file ID.\n\n### Parameters\n\n- `inbox_message_id: string`\n\n- `file?: string`\n\n- `file_id?: string`\n\n### Returns\n\n- `{ id: string; created_at: string; download_url: string; filename: string; size: number; type: 'message_attachment'; }`\n  The Attachment object represents a file attached to a message. You can download the file content via the `download_url`.\n\n  - `id: string`\n  - `created_at: string`\n  - `download_url: string`\n  - `filename: string`\n  - `size: number`\n  - `type: 'message_attachment'`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst messageAttachment = await client.inboxMessages.attachments.create('inbox_message_id');\n\nconsole.log(messageAttachment);\n```",
    perLanguage: {
      typescript: {
        method: 'client.inboxMessages.attachments.create',
        example:
          "import fs from 'fs';\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst messageAttachment = await client.inboxMessages.attachments.create('inbox_message_id');\n\nconsole.log(messageAttachment.id);",
      },
      python: {
        method: 'inbox_messages.attachments.create',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nmessage_attachment = client.inbox_messages.attachments.create(\n    inbox_message_id="inbox_message_id",\n)\nprint(message_attachment.id)',
      },
      go: {
        method: 'client.InboxMessages.Attachments.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmessageAttachment, err := client.InboxMessages.Attachments.New(\n\t\tcontext.TODO(),\n\t\t"inbox_message_id",\n\t\tmoonbase.InboxMessageAttachmentNewParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", messageAttachment.ID)\n}\n',
      },
      ruby: {
        method: 'inbox_messages.attachments.create',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nmessage_attachment = moonbase.inbox_messages.attachments.create("inbox_message_id")\n\nputs(message_attachment)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/inbox_messages/$INBOX_MESSAGE_ID/attachments \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/inbox_messages/{inbox_message_id}/attachments/{id}',
    httpMethod: 'delete',
    summary: 'Remove an attachment',
    description: 'Removes an attachment from a draft message.',
    stainlessPath: '(resource) inbox_messages.attachments > (method) delete',
    qualified: 'client.inboxMessages.attachments.delete',
    params: ['inbox_message_id: string;', 'id: string;'],
    markdown:
      "## delete\n\n`client.inboxMessages.attachments.delete(inbox_message_id: string, id: string): void`\n\n**delete** `/inbox_messages/{inbox_message_id}/attachments/{id}`\n\nRemoves an attachment from a draft message.\n\n### Parameters\n\n- `inbox_message_id: string`\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nawait client.inboxMessages.attachments.delete('id', { inbox_message_id: 'inbox_message_id' })\n```",
    perLanguage: {
      typescript: {
        method: 'client.inboxMessages.attachments.delete',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.inboxMessages.attachments.delete('id', { inbox_message_id: 'inbox_message_id' });",
      },
      python: {
        method: 'inbox_messages.attachments.delete',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nclient.inbox_messages.attachments.delete(\n    id="id",\n    inbox_message_id="inbox_message_id",\n)',
      },
      go: {
        method: 'client.InboxMessages.Attachments.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.InboxMessages.Attachments.Delete(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.InboxMessageAttachmentDeleteParams{\n\t\t\tInboxMessageID: "inbox_message_id",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      ruby: {
        method: 'inbox_messages.attachments.delete',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nresult = moonbase.inbox_messages.attachments.delete("id", inbox_message_id: "inbox_message_id")\n\nputs(result)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/inbox_messages/$INBOX_MESSAGE_ID/attachments/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "{ id: string; associations: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[]; created_at: string; name: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; type: 'tagset'; updated_at: string; description?: string; }",
    markdown:
      "## list\n\n`client.tagsets.list(after?: string, before?: string, limit?: number): { id: string; associations: tagset_association[]; created_at: string; name: string; tags: tag[]; type: 'tagset'; updated_at: string; description?: string; }`\n\n**get** `/tagsets`\n\nReturns a list of your tagsets.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; associations: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[]; created_at: string; name: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; type: 'tagset'; updated_at: string; description?: string; }`\n  A Tagset is a collection of `Tag` objects whose tags can be applied to conversations, calls, and meetings.\n\n  - `id: string`\n  - `associations: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[]`\n  - `created_at: string`\n  - `name: string`\n  - `tags: { id: string; color: string; name: string; type: 'tag'; }[]`\n  - `type: 'tagset'`\n  - `updated_at: string`\n  - `description?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const tagset of client.tagsets.list()) {\n  console.log(tagset);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.tagsets.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const tagset of client.tagsets.list()) {\n  console.log(tagset.id);\n}",
      },
      python: {
        method: 'tagsets.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.tagsets.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Tagsets.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Tagsets.List(context.TODO(), moonbase.TagsetListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'tagsets.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.tagsets.list\n\nputs(page)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/tagsets \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/tagsets',
    httpMethod: 'post',
    summary: 'Create a tagset',
    description: 'Create a new tagset.',
    stainlessPath: '(resource) tagsets > (method) create',
    qualified: 'client.tagsets.create',
    params: [
      'name: string;',
      "associations?: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[];",
      'description?: string;',
      'tags?: { color: string; name: string; id?: string; }[];',
    ],
    response:
      "{ id: string; associations: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[]; created_at: string; name: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; type: 'tagset'; updated_at: string; description?: string; }",
    markdown:
      "## create\n\n`client.tagsets.create(name: string, associations?: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[], description?: string, tags?: { color: string; name: string; id?: string; }[]): { id: string; associations: tagset_association[]; created_at: string; name: string; tags: tag[]; type: 'tagset'; updated_at: string; description?: string; }`\n\n**post** `/tagsets`\n\nCreate a new tagset.\n\n### Parameters\n\n- `name: string`\n  The name of the tagset.\n\n- `associations?: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[]`\n  Optional list of associations for this tagset. Include `{type: \"calls\"}`, `{type: \"meetings\"}`, or `{type: \"inbox\", id}`.\n\n- `description?: string`\n  An optional description of the tagset's purpose.\n\n- `tags?: { color: string; name: string; id?: string; }[]`\n  Optional list of tags to create with this tagset. Tags are ordered by their position in the list.\n\n### Returns\n\n- `{ id: string; associations: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[]; created_at: string; name: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; type: 'tagset'; updated_at: string; description?: string; }`\n  A Tagset is a collection of `Tag` objects whose tags can be applied to conversations, calls, and meetings.\n\n  - `id: string`\n  - `associations: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[]`\n  - `created_at: string`\n  - `name: string`\n  - `tags: { id: string; color: string; name: string; type: 'tag'; }[]`\n  - `type: 'tagset'`\n  - `updated_at: string`\n  - `description?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst tagset = await client.tagsets.create({ name: 'Support' });\n\nconsole.log(tagset);\n```",
    perLanguage: {
      typescript: {
        method: 'client.tagsets.create',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst tagset = await client.tagsets.create({\n  name: 'Support',\n  description: 'Tags for our support inbox',\n  tags: [\n    { name: 'Bug', color: 'red' },\n    { name: 'Feature Request', color: 'purple' },\n    { name: 'Billing', color: 'amber' },\n  ],\n});\n\nconsole.log(tagset.id);",
      },
      python: {
        method: 'tagsets.create',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\ntagset = client.tagsets.create(\n    name="Support",\n    description="Tags for our support inbox",\n    tags=[{\n        "name": "Bug",\n        "color": "red",\n    }, {\n        "name": "Feature Request",\n        "color": "purple",\n    }, {\n        "name": "Billing",\n        "color": "amber",\n    }],\n)\nprint(tagset.id)',
      },
      go: {
        method: 'client.Tagsets.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttagset, err := client.Tagsets.New(context.TODO(), moonbase.TagsetNewParams{\n\t\tName:        "Support",\n\t\tDescription: moonbase.String("Tags for our support inbox"),\n\t\tTags: []moonbase.TagsetNewParamsTag{{\n\t\t\tName:  "Bug",\n\t\t\tColor: "red",\n\t\t}, {\n\t\t\tName:  "Feature Request",\n\t\t\tColor: "purple",\n\t\t}, {\n\t\t\tName:  "Billing",\n\t\t\tColor: "amber",\n\t\t}},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tagset.ID)\n}\n',
      },
      ruby: {
        method: 'tagsets.create',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\ntagset = moonbase.tagsets.create(name: "Support")\n\nputs(tagset)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/tagsets \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "name": "Support",\n          "description": "Tags for our support inbox",\n          "tags": [\n            {\n              "color": "red",\n              "name": "Bug"\n            },\n            {\n              "color": "purple",\n              "name": "Feature Request"\n            },\n            {\n              "color": "amber",\n              "name": "Billing"\n            }\n          ]\n        }\'',
      },
    },
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
      "{ id: string; associations: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[]; created_at: string; name: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; type: 'tagset'; updated_at: string; description?: string; }",
    markdown:
      "## retrieve\n\n`client.tagsets.retrieve(id: string): { id: string; associations: tagset_association[]; created_at: string; name: string; tags: tag[]; type: 'tagset'; updated_at: string; description?: string; }`\n\n**get** `/tagsets/{id}`\n\nRetrieves the details of an existing tagset.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; associations: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[]; created_at: string; name: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; type: 'tagset'; updated_at: string; description?: string; }`\n  A Tagset is a collection of `Tag` objects whose tags can be applied to conversations, calls, and meetings.\n\n  - `id: string`\n  - `associations: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[]`\n  - `created_at: string`\n  - `name: string`\n  - `tags: { id: string; color: string; name: string; type: 'tag'; }[]`\n  - `type: 'tagset'`\n  - `updated_at: string`\n  - `description?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst tagset = await client.tagsets.retrieve('id');\n\nconsole.log(tagset);\n```",
    perLanguage: {
      typescript: {
        method: 'client.tagsets.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst tagset = await client.tagsets.retrieve('id');\n\nconsole.log(tagset.id);",
      },
      python: {
        method: 'tagsets.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\ntagset = client.tagsets.retrieve(\n    "id",\n)\nprint(tagset.id)',
      },
      go: {
        method: 'client.Tagsets.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttagset, err := client.Tagsets.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tagset.ID)\n}\n',
      },
      ruby: {
        method: 'tagsets.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\ntagset = moonbase.tagsets.retrieve("id")\n\nputs(tagset)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/tagsets/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/tagsets/{id}',
    httpMethod: 'patch',
    summary: 'Update a tagset',
    description: 'Updates an existing tagset.',
    stainlessPath: '(resource) tagsets > (method) update',
    qualified: 'client.tagsets.update',
    params: [
      'id: string;',
      "associations?: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[];",
      'description?: string;',
      'name?: string;',
      'tags?: { color: string; name: string; id?: string; }[];',
    ],
    response:
      "{ id: string; associations: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[]; created_at: string; name: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; type: 'tagset'; updated_at: string; description?: string; }",
    markdown:
      "## update\n\n`client.tagsets.update(id: string, associations?: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[], description?: string, name?: string, tags?: { color: string; name: string; id?: string; }[]): { id: string; associations: tagset_association[]; created_at: string; name: string; tags: tag[]; type: 'tagset'; updated_at: string; description?: string; }`\n\n**patch** `/tagsets/{id}`\n\nUpdates an existing tagset.\n\n### Parameters\n\n- `id: string`\n\n- `associations?: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[]`\n  Optional full list of associations for this tagset. If provided, it replaces all existing associations. An empty array clears all associations, and omitting it preserves existing associations.\n\n- `description?: string`\n  An updated description of the tagset.\n\n- `name?: string`\n  The new name of the tagset.\n\n- `tags?: { color: string; name: string; id?: string; }[]`\n  Optional full list of tags for this tagset. If provided, tags are ordered by array position.\n\n### Returns\n\n- `{ id: string; associations: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[]; created_at: string; name: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; type: 'tagset'; updated_at: string; description?: string; }`\n  A Tagset is a collection of `Tag` objects whose tags can be applied to conversations, calls, and meetings.\n\n  - `id: string`\n  - `associations: { type: 'calls'; } | { type: 'meetings'; } | { id: string; type: 'inbox'; }[]`\n  - `created_at: string`\n  - `name: string`\n  - `tags: { id: string; color: string; name: string; type: 'tag'; }[]`\n  - `type: 'tagset'`\n  - `updated_at: string`\n  - `description?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst tagset = await client.tagsets.update('id');\n\nconsole.log(tagset);\n```",
    perLanguage: {
      typescript: {
        method: 'client.tagsets.update',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst tagset = await client.tagsets.update('id', {\n  description: 'Updated description',\n  name: 'Customer Support',\n});\n\nconsole.log(tagset.id);",
      },
      python: {
        method: 'tagsets.update',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\ntagset = client.tagsets.update(\n    id="id",\n    description="Updated description",\n    name="Customer Support",\n)\nprint(tagset.id)',
      },
      go: {
        method: 'client.Tagsets.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttagset, err := client.Tagsets.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.TagsetUpdateParams{\n\t\t\tDescription: moonbase.String("Updated description"),\n\t\t\tName:        moonbase.String("Customer Support"),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tagset.ID)\n}\n',
      },
      ruby: {
        method: 'tagsets.update',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\ntagset = moonbase.tagsets.update("id")\n\nputs(tagset)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/tagsets/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "description": "Updated description",\n          "name": "Customer Support"\n        }\'',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/tagsets/{id}',
    httpMethod: 'delete',
    summary: 'Delete a tagset',
    description: 'Permanently deletes a tagset.',
    stainlessPath: '(resource) tagsets > (method) delete',
    qualified: 'client.tagsets.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.tagsets.delete(id: string): void`\n\n**delete** `/tagsets/{id}`\n\nPermanently deletes a tagset.\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nawait client.tagsets.delete('id')\n```",
    perLanguage: {
      typescript: {
        method: 'client.tagsets.delete',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.tagsets.delete('id');",
      },
      python: {
        method: 'tagsets.delete',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nclient.tagsets.delete(\n    "id",\n)',
      },
      go: {
        method: 'client.Tagsets.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Tagsets.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      ruby: {
        method: 'tagsets.delete',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nresult = moonbase.tagsets.delete("id")\n\nputs(result)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/tagsets/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "## list\n\n`client.programs.list(after?: string, before?: string, limit?: number): { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: program_activity_metrics; display_name?: string; program_template?: program_template; scheduled_at?: string; }`\n\n**get** `/programs`\n\nReturns a list of your marketing programs.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: { bounced: number; clicked: number; complained: number; failed: number; opened: number; sent: number; shielded: number; unsubscribed: number; }; display_name?: string; program_template?: { id: string; body: formatted_text; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: program; }; scheduled_at?: string; }`\n  The Program object represents an email campaign. It defines the sending behavior and tracks engagement metrics.\n\n  - `id: string`\n  - `created_at: string`\n  - `status: 'draft' | 'published' | 'paused' | 'archived'`\n  - `track_clicks: boolean`\n  - `track_opens: boolean`\n  - `trigger: 'api' | 'broadcast'`\n  - `type: 'program'`\n  - `updated_at: string`\n  - `activity_metrics?: { bounced: number; clicked: number; complained: number; failed: number; opened: number; sent: number; shielded: number; unsubscribed: number; }`\n  - `display_name?: string`\n  - `program_template?: { id: string; body: { markdown?: string; }; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: program_activity_metrics; display_name?: string; program_template?: program_template; scheduled_at?: string; }; }`\n  - `scheduled_at?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const program of client.programs.list()) {\n  console.log(program);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.programs.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const program of client.programs.list()) {\n  console.log(program.id);\n}",
      },
      python: {
        method: 'programs.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.programs.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Programs.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Programs.List(context.TODO(), moonbase.ProgramListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'programs.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.programs.list\n\nputs(page)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/programs \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "## retrieve\n\n`client.programs.retrieve(id: string, include?: 'activity_metrics' | 'program_template'[]): { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: program_activity_metrics; display_name?: string; program_template?: program_template; scheduled_at?: string; }`\n\n**get** `/programs/{id}`\n\nRetrieves the details of an existing program.\n\n### Parameters\n\n- `id: string`\n\n- `include?: 'activity_metrics' | 'program_template'[]`\n  Specifies which related objects to include in the response. Valid options are `activity_metrics` and `program_template`.\n\n### Returns\n\n- `{ id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: { bounced: number; clicked: number; complained: number; failed: number; opened: number; sent: number; shielded: number; unsubscribed: number; }; display_name?: string; program_template?: { id: string; body: formatted_text; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: program; }; scheduled_at?: string; }`\n  The Program object represents an email campaign. It defines the sending behavior and tracks engagement metrics.\n\n  - `id: string`\n  - `created_at: string`\n  - `status: 'draft' | 'published' | 'paused' | 'archived'`\n  - `track_clicks: boolean`\n  - `track_opens: boolean`\n  - `trigger: 'api' | 'broadcast'`\n  - `type: 'program'`\n  - `updated_at: string`\n  - `activity_metrics?: { bounced: number; clicked: number; complained: number; failed: number; opened: number; sent: number; shielded: number; unsubscribed: number; }`\n  - `display_name?: string`\n  - `program_template?: { id: string; body: { markdown?: string; }; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: program_activity_metrics; display_name?: string; program_template?: program_template; scheduled_at?: string; }; }`\n  - `scheduled_at?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst program = await client.programs.retrieve('id');\n\nconsole.log(program);\n```",
    perLanguage: {
      typescript: {
        method: 'client.programs.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst program = await client.programs.retrieve('id');\n\nconsole.log(program.id);",
      },
      python: {
        method: 'programs.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nprogram = client.programs.retrieve(\n    id="id",\n)\nprint(program.id)',
      },
      go: {
        method: 'client.Programs.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tprogram, err := client.Programs.Get(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.ProgramGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", program.ID)\n}\n',
      },
      ruby: {
        method: 'programs.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nprogram = moonbase.programs.retrieve("id")\n\nputs(program)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/programs/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "{ id: string; body: { markdown?: string; }; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: program_activity_metrics; display_name?: string; program_template?: program_template; scheduled_at?: string; }; }",
    markdown:
      "## list\n\n`client.programTemplates.list(after?: string, before?: string, include?: 'program'[], limit?: number): { id: string; body: formatted_text; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: program; }`\n\n**get** `/program_templates`\n\nReturns a list of your program templates.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `include?: 'program'[]`\n  Specifies which related objects to include in the response. Valid option is `program`.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; body: { markdown?: string; }; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: program_activity_metrics; display_name?: string; program_template?: program_template; scheduled_at?: string; }; }`\n  The ProgramTemplate object defines the content of a message sent by a `Program`, including support for Liquid templating.\n\n  - `id: string`\n  - `body: { markdown?: string; }`\n  - `created_at: string`\n  - `subject: string`\n  - `type: 'program_template'`\n  - `updated_at: string`\n  - `program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: { bounced: number; clicked: number; complained: number; failed: number; opened: number; sent: number; shielded: number; unsubscribed: number; }; display_name?: string; program_template?: { id: string; body: formatted_text; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: program; }; scheduled_at?: string; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const programTemplate of client.programTemplates.list()) {\n  console.log(programTemplate);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.programTemplates.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const programTemplate of client.programTemplates.list()) {\n  console.log(programTemplate.id);\n}",
      },
      python: {
        method: 'program_templates.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.program_templates.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.ProgramTemplates.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.ProgramTemplates.List(context.TODO(), moonbase.ProgramTemplateListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'program_templates.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.program_templates.list\n\nputs(page)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/program_templates \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "{ id: string; body: { markdown?: string; }; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: program_activity_metrics; display_name?: string; program_template?: program_template; scheduled_at?: string; }; }",
    markdown:
      "## retrieve\n\n`client.programTemplates.retrieve(id: string, include?: 'program'[]): { id: string; body: formatted_text; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: program; }`\n\n**get** `/program_templates/{id}`\n\nRetrieves the details of an existing program template.\n\n### Parameters\n\n- `id: string`\n\n- `include?: 'program'[]`\n  Specifies which related objects to include in the response. Valid option is `program`.\n\n### Returns\n\n- `{ id: string; body: { markdown?: string; }; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: program_activity_metrics; display_name?: string; program_template?: program_template; scheduled_at?: string; }; }`\n  The ProgramTemplate object defines the content of a message sent by a `Program`, including support for Liquid templating.\n\n  - `id: string`\n  - `body: { markdown?: string; }`\n  - `created_at: string`\n  - `subject: string`\n  - `type: 'program_template'`\n  - `updated_at: string`\n  - `program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: { bounced: number; clicked: number; complained: number; failed: number; opened: number; sent: number; shielded: number; unsubscribed: number; }; display_name?: string; program_template?: { id: string; body: formatted_text; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: program; }; scheduled_at?: string; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst programTemplate = await client.programTemplates.retrieve('id');\n\nconsole.log(programTemplate);\n```",
    perLanguage: {
      typescript: {
        method: 'client.programTemplates.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst programTemplate = await client.programTemplates.retrieve('id');\n\nconsole.log(programTemplate.id);",
      },
      python: {
        method: 'program_templates.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nprogram_template = client.program_templates.retrieve(\n    id="id",\n)\nprint(program_template.id)',
      },
      go: {
        method: 'client.ProgramTemplates.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tprogramTemplate, err := client.ProgramTemplates.Get(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.ProgramTemplateGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", programTemplate.ID)\n}\n',
      },
      ruby: {
        method: 'program_templates.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nprogram_template = moonbase.program_templates.retrieve("id")\n\nputs(program_template)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/program_templates/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "## send\n\n`client.programMessages.send(person: { email: string; }, program_template_id: string, custom_variables?: object): { id: string; created_at: string; program_template: program_template; type: 'program_message'; updated_at: string; }`\n\n**post** `/program_messages`\n\nSends a message using a program template.\n\n### Parameters\n\n- `person: { email: string; }`\n  The person to send the message to.\n  - `email: string`\n\n- `program_template_id: string`\n  The ID of the `ProgramTemplate` to use for sending the message.\n\n- `custom_variables?: object`\n  Any custom Liquid variables to be interpolated into the message template.\n\n### Returns\n\n- `{ id: string; created_at: string; program_template: { id: string; body: formatted_text; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: program; }; type: 'program_message'; updated_at: string; }`\n  Represents a single message sent as part of a `Program`.\n\n  - `id: string`\n  - `created_at: string`\n  - `program_template: { id: string; body: { markdown?: string; }; created_at: string; subject: string; type: 'program_template'; updated_at: string; program?: { id: string; created_at: string; status: 'draft' | 'published' | 'paused' | 'archived'; track_clicks: boolean; track_opens: boolean; trigger: 'api' | 'broadcast'; type: 'program'; updated_at: string; activity_metrics?: program_activity_metrics; display_name?: string; program_template?: program_template; scheduled_at?: string; }; }`\n  - `type: 'program_message'`\n  - `updated_at: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst programMessage = await client.programMessages.send({\n  person: { email: 'person-206@example-206.com' },\n  program_template_id: '1CLJt2v6ZuRbtwPhmQtzxa',\n});\n\nconsole.log(programMessage);\n```",
    perLanguage: {
      typescript: {
        method: 'client.programMessages.send',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst programMessage = await client.programMessages.send({\n  person: { email: 'person-206@example-206.com' },\n  program_template_id: '1CLJt2v6ZuRbtwPhmQtzxa',\n  custom_variables: { coupon_code: 'HOWDY' },\n});\n\nconsole.log(programMessage.id);",
      },
      python: {
        method: 'program_messages.send',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nprogram_message = client.program_messages.send(\n    person={\n        "email": "person-206@example-206.com"\n    },\n    program_template_id="1CLJt2v6ZuRbtwPhmQtzxa",\n    custom_variables={\n        "coupon_code": "HOWDY"\n    },\n)\nprint(program_message.id)',
      },
      go: {
        method: 'client.ProgramMessages.Send',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tprogramMessage, err := client.ProgramMessages.Send(context.TODO(), moonbase.ProgramMessageSendParams{\n\t\tPerson: moonbase.ProgramMessageSendParamsPerson{\n\t\t\tEmail: "person-206@example-206.com",\n\t\t},\n\t\tProgramTemplateID: "1CLJt2v6ZuRbtwPhmQtzxa",\n\t\tCustomVariables: map[string]any{\n\t\t\t"coupon_code": "HOWDY",\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", programMessage.ID)\n}\n',
      },
      ruby: {
        method: 'program_messages.send_',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nprogram_message = moonbase.program_messages.send_(\n  person: {email: "person-206@example-206.com"},\n  program_template_id: "1CLJt2v6ZuRbtwPhmQtzxa"\n)\n\nputs(program_message)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/program_messages \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "person": {\n            "email": "person-206@example-206.com"\n          },\n          "program_template_id": "1CLJt2v6ZuRbtwPhmQtzxa",\n          "custom_variables": {\n            "coupon_code": "bar"\n          }\n        }\'',
      },
    },
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
      "{ id: string; business_email_required: boolean; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }",
    markdown:
      "## list\n\n`client.forms.list(after?: string, before?: string, limit?: number): { id: string; business_email_required: boolean; collection: collection_pointer; created_at: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }`\n\n**get** `/forms`\n\nReturns a list of your forms.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; business_email_required: boolean; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }`\n  Information about the most essential attributes of a Form (does not include the embed HTML).\n\n  - `id: string`\n  - `business_email_required: boolean`\n  - `collection: { id: string; ref: string; type: 'collection'; }`\n  - `created_at: string`\n  - `name: string`\n  - `pages_enabled: boolean`\n  - `type: 'form'`\n  - `updated_at: string`\n  - `pages_url?: string`\n  - `redirect_url?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const formListResponse of client.forms.list()) {\n  console.log(formListResponse);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.forms.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const formListResponse of client.forms.list()) {\n  console.log(formListResponse.id);\n}",
      },
      python: {
        method: 'forms.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.forms.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Forms.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Forms.List(context.TODO(), moonbase.FormListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'forms.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.forms.list\n\nputs(page)',
      },
      http: {
        example: 'curl https://api.moonbase.ai/v0/forms \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/forms',
    httpMethod: 'post',
    summary: 'Create a form',
    description: 'Creates a new form with an auto-generated collection and default fields.',
    stainlessPath: '(resource) forms > (method) create',
    qualified: 'client.forms.create',
    params: [
      'name: string;',
      'business_email_required?: boolean;',
      'pages_enabled?: boolean;',
      'redirect_url?: string;',
    ],
    response:
      "{ id: string; business_email_required: boolean; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; html_embed: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }",
    markdown:
      "## create\n\n`client.forms.create(name: string, business_email_required?: boolean, pages_enabled?: boolean, redirect_url?: string): { id: string; business_email_required: boolean; collection: collection_pointer; created_at: string; html_embed: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }`\n\n**post** `/forms`\n\nCreates a new form with an auto-generated collection and default fields.\n\n### Parameters\n\n- `name: string`\n  The name of the form, used as the title on its public page.\n\n- `business_email_required?: boolean`\n  If `true`, submissions require a business email address. Defaults to `false`.\n\n- `pages_enabled?: boolean`\n  If `true`, enables a Moonbase Pages hosted page for this form, providing a standalone public URL for sharing. Defaults to `false`.\n\n- `redirect_url?: string`\n  Optional URL the user is redirected to after a successful submission. Omit to leave submissions without a redirect. Stored as a Liquid template; rendered at submission time with form field values under `submission.<key>` (keyed by the field's `key`) plus UTM params (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) automatically appended. Use the `uri_encode` filter for URL-safe values, e.g. `https://example.com/thanks?email={{ submission.email | uri_encode }}`. The rendered URL must parse as a valid URL or the submission errors.\n\n\n### Returns\n\n- `{ id: string; business_email_required: boolean; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; html_embed: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }`\n  A Form provides a way to create `Items` in a `Collection`, often via a public URL for external users. Each form submission creates a new item.\n\n  - `id: string`\n  - `business_email_required: boolean`\n  - `collection: { id: string; ref: string; type: 'collection'; }`\n  - `created_at: string`\n  - `html_embed: string`\n  - `name: string`\n  - `pages_enabled: boolean`\n  - `type: 'form'`\n  - `updated_at: string`\n  - `pages_url?: string`\n  - `redirect_url?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst form = await client.forms.create({ name: 'Contact Us' });\n\nconsole.log(form);\n```",
    perLanguage: {
      typescript: {
        method: 'client.forms.create',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst form = await client.forms.create({\n  name: 'Contact Us',\n  pages_enabled: true,\n  redirect_url: 'https://example.com/thanks',\n});\n\nconsole.log(form.id);",
      },
      python: {
        method: 'forms.create',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nform = client.forms.create(\n    name="Contact Us",\n    pages_enabled=True,\n    redirect_url="https://example.com/thanks",\n)\nprint(form.id)',
      },
      go: {
        method: 'client.Forms.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tform, err := client.Forms.New(context.TODO(), moonbase.FormNewParams{\n\t\tName:         "Contact Us",\n\t\tPagesEnabled: moonbase.Bool(true),\n\t\tRedirectURL:  moonbase.String("https://example.com/thanks"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", form.ID)\n}\n',
      },
      ruby: {
        method: 'forms.create',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nform = moonbase.forms.create(name: "Contact Us")\n\nputs(form)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/forms \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "name": "Contact Us",\n          "pages_enabled": true,\n          "redirect_url": "https://example.com/thanks"\n        }\'',
      },
    },
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
      "{ id: string; business_email_required: boolean; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; html_embed: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }",
    markdown:
      "## retrieve\n\n`client.forms.retrieve(id: string): { id: string; business_email_required: boolean; collection: collection_pointer; created_at: string; html_embed: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }`\n\n**get** `/forms/{id}`\n\nRetrieves the details of an existing form.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; business_email_required: boolean; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; html_embed: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }`\n  A Form provides a way to create `Items` in a `Collection`, often via a public URL for external users. Each form submission creates a new item.\n\n  - `id: string`\n  - `business_email_required: boolean`\n  - `collection: { id: string; ref: string; type: 'collection'; }`\n  - `created_at: string`\n  - `html_embed: string`\n  - `name: string`\n  - `pages_enabled: boolean`\n  - `type: 'form'`\n  - `updated_at: string`\n  - `pages_url?: string`\n  - `redirect_url?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst form = await client.forms.retrieve('id');\n\nconsole.log(form);\n```",
    perLanguage: {
      typescript: {
        method: 'client.forms.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst form = await client.forms.retrieve('id');\n\nconsole.log(form.id);",
      },
      python: {
        method: 'forms.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nform = client.forms.retrieve(\n    "id",\n)\nprint(form.id)',
      },
      go: {
        method: 'client.Forms.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tform, err := client.Forms.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", form.ID)\n}\n',
      },
      ruby: {
        method: 'forms.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nform = moonbase.forms.retrieve("id")\n\nputs(form)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/forms/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/forms/{id}',
    httpMethod: 'patch',
    summary: 'Update a form',
    description: 'Updates an existing form.',
    stainlessPath: '(resource) forms > (method) update',
    qualified: 'client.forms.update',
    params: [
      'id: string;',
      'business_email_required?: boolean;',
      'name?: string;',
      'pages_enabled?: boolean;',
      'redirect_url?: string;',
    ],
    response:
      "{ id: string; business_email_required: boolean; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; html_embed: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }",
    markdown:
      "## update\n\n`client.forms.update(id: string, business_email_required?: boolean, name?: string, pages_enabled?: boolean, redirect_url?: string): { id: string; business_email_required: boolean; collection: collection_pointer; created_at: string; html_embed: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }`\n\n**patch** `/forms/{id}`\n\nUpdates an existing form.\n\n### Parameters\n\n- `id: string`\n\n- `business_email_required?: boolean`\n  If `true`, submissions require a business email address.\n\n- `name?: string`\n  The new name for the form.\n\n- `pages_enabled?: boolean`\n  If `true`, a Moonbase Pages hosted page is enabled for this form, providing a standalone public URL for sharing.\n\n- `redirect_url?: string`\n  Updated redirect URL, or `null` to clear. Omit to leave the existing value unchanged. Liquid template rendered at submission time with form field values under `submission.<key>` (keyed by the field's `key`) plus UTM params (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) automatically appended. Use the `uri_encode` filter for URL-safe values. The rendered URL must parse as a valid URL or the submission errors.\n\n\n### Returns\n\n- `{ id: string; business_email_required: boolean; collection: { id: string; ref: string; type: 'collection'; }; created_at: string; html_embed: string; name: string; pages_enabled: boolean; type: 'form'; updated_at: string; pages_url?: string; redirect_url?: string; }`\n  A Form provides a way to create `Items` in a `Collection`, often via a public URL for external users. Each form submission creates a new item.\n\n  - `id: string`\n  - `business_email_required: boolean`\n  - `collection: { id: string; ref: string; type: 'collection'; }`\n  - `created_at: string`\n  - `html_embed: string`\n  - `name: string`\n  - `pages_enabled: boolean`\n  - `type: 'form'`\n  - `updated_at: string`\n  - `pages_url?: string`\n  - `redirect_url?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst form = await client.forms.update('id');\n\nconsole.log(form);\n```",
    perLanguage: {
      typescript: {
        method: 'client.forms.update',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst form = await client.forms.update('id', {\n  business_email_required: true,\n  name: 'Updated Form',\n});\n\nconsole.log(form.id);",
      },
      python: {
        method: 'forms.update',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nform = client.forms.update(\n    id="id",\n    business_email_required=True,\n    name="Updated Form",\n)\nprint(form.id)',
      },
      go: {
        method: 'client.Forms.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tform, err := client.Forms.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.FormUpdateParams{\n\t\t\tBusinessEmailRequired: moonbase.Bool(true),\n\t\t\tName:                  moonbase.String("Updated Form"),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", form.ID)\n}\n',
      },
      ruby: {
        method: 'forms.update',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nform = moonbase.forms.update("id")\n\nputs(form)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/forms/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "business_email_required": true,\n          "name": "Updated Form"\n        }\'',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/forms/{id}',
    httpMethod: 'delete',
    summary: 'Delete a form',
    description: 'Permanently deletes a form. The backing collection is preserved.',
    stainlessPath: '(resource) forms > (method) delete',
    qualified: 'client.forms.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.forms.delete(id: string): void`\n\n**delete** `/forms/{id}`\n\nPermanently deletes a form. The backing collection is preserved.\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nawait client.forms.delete('id')\n```",
    perLanguage: {
      typescript: {
        method: 'client.forms.delete',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.forms.delete('id');",
      },
      python: {
        method: 'forms.delete',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nclient.forms.delete(\n    "id",\n)',
      },
      go: {
        method: 'client.Forms.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Forms.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      ruby: {
        method: 'forms.delete',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nresult = moonbase.forms.delete("id")\n\nputs(result)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/forms/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "## list\n\n`client.unsubscribes.list(after?: string, before?: string, limit?: number): { created_at: string; email: string; type: 'unsubscribe'; }`\n\n**get** `/unsubscribes`\n\nReturns a list of unsubscribes.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ created_at: string; email: string; type: 'unsubscribe'; }`\n  A record of an unsubscribed email address.\n\n  - `created_at: string`\n  - `email: string`\n  - `type: 'unsubscribe'`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const unsubscribe of client.unsubscribes.list()) {\n  console.log(unsubscribe);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.unsubscribes.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const unsubscribe of client.unsubscribes.list()) {\n  console.log(unsubscribe.created_at);\n}",
      },
      python: {
        method: 'unsubscribes.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.unsubscribes.list()\npage = page.data[0]\nprint(page.created_at)',
      },
      go: {
        method: 'client.Unsubscribes.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Unsubscribes.List(context.TODO(), moonbase.UnsubscribeListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'unsubscribes.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.unsubscribes.list\n\nputs(page)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/unsubscribes \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "## create\n\n`client.unsubscribes.create(email: string): { created_at: string; email: string; type: 'unsubscribe'; }`\n\n**post** `/unsubscribes`\n\nCreate a new unsubscribe.\n\n### Parameters\n\n- `email: string`\n\n### Returns\n\n- `{ created_at: string; email: string; type: 'unsubscribe'; }`\n  A record of an unsubscribed email address.\n\n  - `created_at: string`\n  - `email: string`\n  - `type: 'unsubscribe'`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst unsubscribe = await client.unsubscribes.create({ email: 'yoda@moonbase.ai' });\n\nconsole.log(unsubscribe);\n```",
    perLanguage: {
      typescript: {
        method: 'client.unsubscribes.create',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst unsubscribe = await client.unsubscribes.create({ email: 'yoda@moonbase.ai' });\n\nconsole.log(unsubscribe.created_at);",
      },
      python: {
        method: 'unsubscribes.create',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nunsubscribe = client.unsubscribes.create(\n    email="yoda@moonbase.ai",\n)\nprint(unsubscribe.created_at)',
      },
      go: {
        method: 'client.Unsubscribes.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tunsubscribe, err := client.Unsubscribes.New(context.TODO(), moonbase.UnsubscribeNewParams{\n\t\tEmail: "yoda@moonbase.ai",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", unsubscribe.CreatedAt)\n}\n',
      },
      ruby: {
        method: 'unsubscribes.create',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nunsubscribe = moonbase.unsubscribes.create(email: "yoda@moonbase.ai")\n\nputs(unsubscribe)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/unsubscribes \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "email": "yoda@moonbase.ai"\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.unsubscribes.delete',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.unsubscribes.delete('email');",
      },
      python: {
        method: 'unsubscribes.delete',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nclient.unsubscribes.delete(\n    "email",\n)',
      },
      go: {
        method: 'client.Unsubscribes.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Unsubscribes.Delete(context.TODO(), "email")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      ruby: {
        method: 'unsubscribes.delete',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nresult = moonbase.unsubscribes.delete("email")\n\nputs(result)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/unsubscribes/$EMAIL \\\n    -X DELETE \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      'constituent_entity_id?: { eq?: string; };',
      'constituent_entity_type?: { eq?: string; };',
      "constituent_relation?: { eq?: 'actor' | 'object' | 'target'; };",
      'limit?: number;',
      'occurred_at?: { gte?: string; lte?: string; };',
      'type?: { eq?: string; };',
    ],
    response:
      "{ id: string; constituents: { entity: constituent_entity_pointer; relation: 'actor' | 'object' | 'target'; type: 'constituent'; }[]; occurred_at: string; type: string; }",
    markdown:
      "## list\n\n`client.activities.list(after?: string, before?: string, constituent_entity_id?: { eq?: string; }, constituent_entity_type?: { eq?: string; }, constituent_relation?: { eq?: 'actor' | 'object' | 'target'; }, limit?: number, occurred_at?: { gte?: string; lte?: string; }, type?: { eq?: string; }): { id: string; constituents: constituent[]; occurred_at: string; type: string; }`\n\n**get** `/activities`\n\nReturns a list of activities.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `constituent_entity_id?: { eq?: string; }`\n  Filter activities by which entities were involved. Must be paired with constituent_entity_type.\n  - `eq?: string`\n\n- `constituent_entity_type?: { eq?: string; }`\n  Filter activities by which entities were involved. Must be paired with constituent_entity_id.\n  - `eq?: string`\n    The type of the entity involved as a constituent of the activity.\n\n- `constituent_relation?: { eq?: 'actor' | 'object' | 'target'; }`\n  Filter activities by which entities were involved via specific relations. Must be paired with constituent_entity_type and constituent_entity_id.\n  - `eq?: 'actor' | 'object' | 'target'`\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n- `occurred_at?: { gte?: string; lte?: string; }`\n  Filter activities by when they occurred.\n  - `gte?: string`\n  - `lte?: string`\n\n- `type?: { eq?: string; }`\n  Filter activities by type.\n  - `eq?: string`\n\n### Returns\n\n- `{ id: string; constituents: { entity: constituent_entity_pointer; relation: 'actor' | 'object' | 'target'; type: 'constituent'; }[]; occurred_at: string; type: string; }`\n  The Activity object represents a specific event that has occurred, such as a meeting being scheduled or a form being submitted.\n\n  - `id: string`\n  - `constituents: { entity: object | object | object | object | object | object | object | object | object | object | object; relation: 'actor' | 'object' | 'target'; type: 'constituent'; }[]`\n  - `occurred_at: string`\n  - `type: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const activity of client.activities.list()) {\n  console.log(activity);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.activities.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const activity of client.activities.list()) {\n  console.log(activity.id);\n}",
      },
      python: {
        method: 'activities.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.activities.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Activities.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Activities.List(context.TODO(), moonbase.ActivityListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'activities.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.activities.list\n\nputs(page)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/activities \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "{ id: string; constituents: { entity: constituent_entity_pointer; relation: 'actor' | 'object' | 'target'; type: 'constituent'; }[]; occurred_at: string; type: string; }",
    markdown:
      "## retrieve\n\n`client.activities.retrieve(id: string): { id: string; constituents: constituent[]; occurred_at: string; type: string; }`\n\n**get** `/activities/{id}`\n\nRetrieves the details of an existing activity.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; constituents: { entity: constituent_entity_pointer; relation: 'actor' | 'object' | 'target'; type: 'constituent'; }[]; occurred_at: string; type: string; }`\n  The Activity object represents a specific event that has occurred, such as a meeting being scheduled or a form being submitted.\n\n  - `id: string`\n  - `constituents: { entity: object | object | object | object | object | object | object | object | object | object | object; relation: 'actor' | 'object' | 'target'; type: 'constituent'; }[]`\n  - `occurred_at: string`\n  - `type: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst activity = await client.activities.retrieve('id');\n\nconsole.log(activity);\n```",
    perLanguage: {
      typescript: {
        method: 'client.activities.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst activity = await client.activities.retrieve('id');\n\nconsole.log(activity.id);",
      },
      python: {
        method: 'activities.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nactivity = client.activities.retrieve(\n    "id",\n)\nprint(activity.id)',
      },
      go: {
        method: 'client.Activities.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tactivity, err := client.Activities.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", activity.ID)\n}\n',
      },
      ruby: {
        method: 'activities.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nactivity = moonbase.activities.retrieve("id")\n\nputs(activity)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/activities/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "tags?: { id: string; type: 'tag'; }[];",
      'transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; };',
    ],
    response:
      "{ id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: item_pointer; person?: item_pointer; }[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; provider_metadata?: object; summary?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; transcript?: { cues: call_transcript_cue[]; }; }",
    markdown:
      "## create\n\n`client.calls.create(direction: 'incoming' | 'outgoing', participants: { phone: string; role: 'caller' | 'callee' | 'other'; }[], provider: 'openphone' | 'user' | 'zoom_phone', provider_id: string, provider_status: string, start_at: string, answered_at?: string, end_at?: string, provider_metadata?: object, recordings?: { content_type: 'audio/mpeg'; provider_id: string; url: string; }[], tags?: { id: string; type: 'tag'; }[], transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; }): { id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: call_participant[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; tags: tag[]; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: note; provider_metadata?: object; summary?: note; transcript?: call_transcript; }`\n\n**post** `/calls`\n\nLogs a phone call.\n\n### Parameters\n\n- `direction: 'incoming' | 'outgoing'`\n  The direction of the call, either `incoming` or `outgoing`.\n\n- `participants: { phone: string; role: 'caller' | 'callee' | 'other'; }[]`\n  An array of participants involved in the call.\n\n- `provider: 'openphone' | 'user' | 'zoom_phone'`\n  The name of the phone provider that handled the call (e.g., `openphone`).\n\n- `provider_id: string`\n  The unique identifier for the call from the provider's system.\n\n- `provider_status: string`\n  The status of the call.\n\n- `start_at: string`\n  The time the call started, as an ISO 8601 timestamp in UTC.\n\n- `answered_at?: string`\n  The time the call was answered, as an ISO 8601 timestamp in UTC.\n\n- `end_at?: string`\n  The time the call ended, as an ISO 8601 timestamp in UTC.\n\n- `provider_metadata?: object`\n  A hash of additional metadata from the provider.\n\n- `recordings?: { content_type: 'audio/mpeg'; provider_id: string; url: string; }[]`\n  Any recordings associated with the call.\n\n- `tags?: { id: string; type: 'tag'; }[]`\n  Optional list of tag pointers to assign to the call.\n\n- `transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; }`\n  A transcript of the call.\n  - `cues: { from: number; speaker: string; text: string; to: number; }[]`\n    A list of cues that identify the text spoken in specific time slices of the call.\n\n### Returns\n\n- `{ id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: item_pointer; person?: item_pointer; }[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; provider_metadata?: object; summary?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; transcript?: { cues: call_transcript_cue[]; }; }`\n  The Call object represents a phone call that has been logged in the system. It contains details about the participants, timing, and outcome of the call.\n\n  - `id: string`\n  - `created_at: string`\n  - `direction: 'incoming' | 'outgoing'`\n  - `participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: { id: string; collection: collection_pointer; type: 'item'; }; person?: { id: string; collection: collection_pointer; type: 'item'; }; }[]`\n  - `provider: 'openphone' | 'user' | 'zoom_phone'`\n  - `provider_id: string`\n  - `provider_status: string`\n  - `start_at: string`\n  - `tags: { id: string; color: string; name: string; type: 'tag'; }[]`\n  - `type: 'call'`\n  - `updated_at: string`\n  - `answered_at?: string`\n  - `end_at?: string`\n  - `note?: { id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `provider_metadata?: object`\n  - `summary?: { id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `transcript?: { cues: { from: number; speaker: call_transcript_speaker; text: string; to: number; }[]; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst call = await client.calls.create({\n  direction: 'incoming',\n  participants: [{ phone: '+14155551212', role: 'caller' }, { phone: '+16505551212', role: 'callee' }],\n  provider: 'openphone',\n  provider_id: 'openphone_id_00000000000c',\n  provider_status: 'completed',\n  start_at: '2025-02-17T15:00:00.000Z',\n});\n\nconsole.log(call);\n```",
    perLanguage: {
      typescript: {
        method: 'client.calls.create',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst call = await client.calls.create({\n  direction: 'incoming',\n  participants: [\n    { phone: '+14155551212', role: 'caller' },\n    { phone: '+16505551212', role: 'callee' },\n  ],\n  provider: 'openphone',\n  provider_id: 'openphone_id_00000000000c',\n  provider_status: 'completed',\n  start_at: '2025-02-17T15:00:00.000Z',\n  answered_at: '2025-02-17T15:01:00Z',\n  end_at: '2025-02-17T15:30:00.000Z',\n  provider_metadata: {\n    answered_by: 'UShjUatqtF',\n    user_id: 'UShjUatqtF',\n    phone_number_id: 'PN72zMikBJ',\n    conversation_id: 'CN3b48bcc423e772aeba377414a4fa6a06',\n  },\n});\n\nconsole.log(call.id);",
      },
      python: {
        method: 'calls.create',
        example:
          'import os\nfrom datetime import datetime\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\ncall = client.calls.create(\n    direction="incoming",\n    participants=[{\n        "phone": "+14155551212",\n        "role": "caller",\n    }, {\n        "phone": "+16505551212",\n        "role": "callee",\n    }],\n    provider="openphone",\n    provider_id="openphone_id_00000000000c",\n    provider_status="completed",\n    start_at=datetime.fromisoformat("2025-02-17T15:00:00.000"),\n    answered_at=datetime.fromisoformat("2025-02-17T15:01:00"),\n    end_at=datetime.fromisoformat("2025-02-17T15:30:00.000"),\n    provider_metadata={\n        "answered_by": "UShjUatqtF",\n        "user_id": "UShjUatqtF",\n        "phone_number_id": "PN72zMikBJ",\n        "conversation_id": "CN3b48bcc423e772aeba377414a4fa6a06",\n    },\n)\nprint(call.id)',
      },
      go: {
        method: 'client.Calls.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\t"time"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcall, err := client.Calls.New(context.TODO(), moonbase.CallNewParams{\n\t\tDirection: moonbase.CallNewParamsDirectionIncoming,\n\t\tParticipants: []moonbase.CallNewParamsParticipant{{\n\t\t\tPhone: "+14155551212",\n\t\t\tRole:  "caller",\n\t\t}, {\n\t\t\tPhone: "+16505551212",\n\t\t\tRole:  "callee",\n\t\t}},\n\t\tProvider:       moonbase.CallNewParamsProviderOpenphone,\n\t\tProviderID:     "openphone_id_00000000000c",\n\t\tProviderStatus: "completed",\n\t\tStartAt:        time.Now(),\n\t\tAnsweredAt:     moonbase.Time(time.Now()),\n\t\tEndAt:          moonbase.Time(time.Now()),\n\t\tProviderMetadata: map[string]any{\n\t\t\t"answered_by":     "UShjUatqtF",\n\t\t\t"user_id":         "UShjUatqtF",\n\t\t\t"phone_number_id": "PN72zMikBJ",\n\t\t\t"conversation_id": "CN3b48bcc423e772aeba377414a4fa6a06",\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", call.ID)\n}\n',
      },
      ruby: {
        method: 'calls.create',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\ncall = moonbase.calls.create(\n  direction: :incoming,\n  participants: [{phone: "+14155551212", role: :caller}, {phone: "+16505551212", role: :callee}],\n  provider: :openphone,\n  provider_id: "openphone_id_00000000000c",\n  provider_status: "completed",\n  start_at: "2025-02-17T15:00:00.000Z"\n)\n\nputs(call)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/calls \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "direction": "incoming",\n          "participants": [\n            {\n              "phone": "+14155551212",\n              "role": "caller"\n            },\n            {\n              "phone": "+16505551212",\n              "role": "callee"\n            }\n          ],\n          "provider": "openphone",\n          "provider_id": "openphone_id_00000000000c",\n          "provider_status": "completed",\n          "start_at": "2025-02-17T15:00:00.000Z",\n          "answered_at": "2025-02-17T15:01:00Z",\n          "end_at": "2025-02-17T15:30:00.000Z",\n          "provider_metadata": {\n            "answered_by": "bar",\n            "user_id": "bar",\n            "phone_number_id": "bar",\n            "conversation_id": "bar"\n          }\n        }\'',
      },
    },
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
      "tags?: { id: string; type: 'tag'; }[];",
      'transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; };',
    ],
    response:
      "{ id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: item_pointer; person?: item_pointer; }[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; provider_metadata?: object; summary?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; transcript?: { cues: call_transcript_cue[]; }; }",
    markdown:
      "## upsert\n\n`client.calls.upsert(direction: 'incoming' | 'outgoing', participants: { phone: string; role: 'caller' | 'callee' | 'other'; }[], provider: 'openphone' | 'user' | 'zoom_phone', provider_id: string, provider_status: string, start_at: string, answered_at?: string, end_at?: string, provider_metadata?: object, recordings?: { content_type: 'audio/mpeg'; provider_id: string; url: string; }[], tags?: { id: string; type: 'tag'; }[], transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; }): { id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: call_participant[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; tags: tag[]; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: note; provider_metadata?: object; summary?: note; transcript?: call_transcript; }`\n\n**post** `/calls/upsert`\n\nFind and update an existing phone call, or create a new one.\n\n### Parameters\n\n- `direction: 'incoming' | 'outgoing'`\n  The direction of the call, either `incoming` or `outgoing`.\n\n- `participants: { phone: string; role: 'caller' | 'callee' | 'other'; }[]`\n  An array of participants involved in the call.\n\n- `provider: 'openphone' | 'user' | 'zoom_phone'`\n  The name of the phone provider that handled the call (e.g., `openphone`).\n\n- `provider_id: string`\n  The unique identifier for the call from the provider's system.\n\n- `provider_status: string`\n  The status of the call.\n\n- `start_at: string`\n  The time the call started, as an ISO 8601 timestamp in UTC.\n\n- `answered_at?: string`\n  The time the call was answered, as an ISO 8601 timestamp in UTC.\n\n- `end_at?: string`\n  The time the call ended, as an ISO 8601 timestamp in UTC.\n\n- `provider_metadata?: object`\n  A hash of additional metadata from the provider.\n\n- `recordings?: { content_type: 'audio/mpeg'; provider_id: string; url: string; }[]`\n  Any recordings associated with the call.\n\n- `tags?: { id: string; type: 'tag'; }[]`\n  Optional list of tag pointers to assign to the call. If omitted, existing tags are unchanged. Pass an empty array to clear tags.\n\n- `transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; }`\n  A transcript of the call.\n  - `cues: { from: number; speaker: string; text: string; to: number; }[]`\n    A list of cues that identify the text spoken in specific time slices of the call.\n\n### Returns\n\n- `{ id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: item_pointer; person?: item_pointer; }[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; provider_metadata?: object; summary?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; transcript?: { cues: call_transcript_cue[]; }; }`\n  The Call object represents a phone call that has been logged in the system. It contains details about the participants, timing, and outcome of the call.\n\n  - `id: string`\n  - `created_at: string`\n  - `direction: 'incoming' | 'outgoing'`\n  - `participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: { id: string; collection: collection_pointer; type: 'item'; }; person?: { id: string; collection: collection_pointer; type: 'item'; }; }[]`\n  - `provider: 'openphone' | 'user' | 'zoom_phone'`\n  - `provider_id: string`\n  - `provider_status: string`\n  - `start_at: string`\n  - `tags: { id: string; color: string; name: string; type: 'tag'; }[]`\n  - `type: 'call'`\n  - `updated_at: string`\n  - `answered_at?: string`\n  - `end_at?: string`\n  - `note?: { id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `provider_metadata?: object`\n  - `summary?: { id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `transcript?: { cues: { from: number; speaker: call_transcript_speaker; text: string; to: number; }[]; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst call = await client.calls.upsert({\n  direction: 'incoming',\n  participants: [{ phone: '+14155551212', role: 'caller' }, { phone: '+16505551212', role: 'callee' }],\n  provider: 'openphone',\n  provider_id: 'openphone_id_000000000006',\n  provider_status: 'completed',\n  start_at: '2025-02-17T15:00:00.000Z',\n});\n\nconsole.log(call);\n```",
    perLanguage: {
      typescript: {
        method: 'client.calls.upsert',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst call = await client.calls.upsert({\n  direction: 'incoming',\n  participants: [\n    { phone: '+14155551212', role: 'caller' },\n    { phone: '+16505551212', role: 'callee' },\n  ],\n  provider: 'openphone',\n  provider_id: 'openphone_id_000000000006',\n  provider_status: 'completed',\n  start_at: '2025-02-17T15:00:00.000Z',\n  answered_at: '2025-02-17T15:01:00Z',\n  end_at: '2025-02-17T15:30:00.000Z',\n  provider_metadata: {\n    answered_by: 'UShjUatqtF',\n    user_id: 'UShjUatqtF',\n    phone_number_id: 'PN72zMikBJ',\n    conversation_id: 'CN3b48bcc423e772aeba377414a4fa6a06',\n  },\n});\n\nconsole.log(call.id);",
      },
      python: {
        method: 'calls.upsert',
        example:
          'import os\nfrom datetime import datetime\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\ncall = client.calls.upsert(\n    direction="incoming",\n    participants=[{\n        "phone": "+14155551212",\n        "role": "caller",\n    }, {\n        "phone": "+16505551212",\n        "role": "callee",\n    }],\n    provider="openphone",\n    provider_id="openphone_id_000000000006",\n    provider_status="completed",\n    start_at=datetime.fromisoformat("2025-02-17T15:00:00.000"),\n    answered_at=datetime.fromisoformat("2025-02-17T15:01:00"),\n    end_at=datetime.fromisoformat("2025-02-17T15:30:00.000"),\n    provider_metadata={\n        "answered_by": "UShjUatqtF",\n        "user_id": "UShjUatqtF",\n        "phone_number_id": "PN72zMikBJ",\n        "conversation_id": "CN3b48bcc423e772aeba377414a4fa6a06",\n    },\n)\nprint(call.id)',
      },
      go: {
        method: 'client.Calls.Upsert',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\t"time"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcall, err := client.Calls.Upsert(context.TODO(), moonbase.CallUpsertParams{\n\t\tDirection: moonbase.CallUpsertParamsDirectionIncoming,\n\t\tParticipants: []moonbase.CallUpsertParamsParticipant{{\n\t\t\tPhone: "+14155551212",\n\t\t\tRole:  "caller",\n\t\t}, {\n\t\t\tPhone: "+16505551212",\n\t\t\tRole:  "callee",\n\t\t}},\n\t\tProvider:       moonbase.CallUpsertParamsProviderOpenphone,\n\t\tProviderID:     "openphone_id_000000000006",\n\t\tProviderStatus: "completed",\n\t\tStartAt:        time.Now(),\n\t\tAnsweredAt:     moonbase.Time(time.Now()),\n\t\tEndAt:          moonbase.Time(time.Now()),\n\t\tProviderMetadata: map[string]any{\n\t\t\t"answered_by":     "UShjUatqtF",\n\t\t\t"user_id":         "UShjUatqtF",\n\t\t\t"phone_number_id": "PN72zMikBJ",\n\t\t\t"conversation_id": "CN3b48bcc423e772aeba377414a4fa6a06",\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", call.ID)\n}\n',
      },
      ruby: {
        method: 'calls.upsert',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\ncall = moonbase.calls.upsert(\n  direction: :incoming,\n  participants: [{phone: "+14155551212", role: :caller}, {phone: "+16505551212", role: :callee}],\n  provider: :openphone,\n  provider_id: "openphone_id_000000000006",\n  provider_status: "completed",\n  start_at: "2025-02-17T15:00:00.000Z"\n)\n\nputs(call)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/calls/upsert \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "direction": "incoming",\n          "participants": [\n            {\n              "phone": "+14155551212",\n              "role": "caller"\n            },\n            {\n              "phone": "+16505551212",\n              "role": "callee"\n            }\n          ],\n          "provider": "openphone",\n          "provider_id": "openphone_id_000000000006",\n          "provider_status": "completed",\n          "start_at": "2025-02-17T15:00:00.000Z",\n          "answered_at": "2025-02-17T15:01:00Z",\n          "end_at": "2025-02-17T15:30:00.000Z",\n          "provider_metadata": {\n            "answered_by": "bar",\n            "user_id": "bar",\n            "phone_number_id": "bar",\n            "conversation_id": "bar"\n          }\n        }\'',
      },
    },
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
      "{ id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: item_pointer; person?: item_pointer; }[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; provider_metadata?: object; summary?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; transcript?: { cues: call_transcript_cue[]; }; }",
    markdown:
      "## list\n\n`client.calls.list(after?: string, before?: string, limit?: number): { id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: call_participant[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; tags: tag[]; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: note; provider_metadata?: object; summary?: note; transcript?: call_transcript; }`\n\n**get** `/calls`\n\nReturns a list of calls.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: item_pointer; person?: item_pointer; }[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; provider_metadata?: object; summary?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; transcript?: { cues: call_transcript_cue[]; }; }`\n  The Call object represents a phone call that has been logged in the system. It contains details about the participants, timing, and outcome of the call.\n\n  - `id: string`\n  - `created_at: string`\n  - `direction: 'incoming' | 'outgoing'`\n  - `participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: { id: string; collection: collection_pointer; type: 'item'; }; person?: { id: string; collection: collection_pointer; type: 'item'; }; }[]`\n  - `provider: 'openphone' | 'user' | 'zoom_phone'`\n  - `provider_id: string`\n  - `provider_status: string`\n  - `start_at: string`\n  - `tags: { id: string; color: string; name: string; type: 'tag'; }[]`\n  - `type: 'call'`\n  - `updated_at: string`\n  - `answered_at?: string`\n  - `end_at?: string`\n  - `note?: { id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `provider_metadata?: object`\n  - `summary?: { id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `transcript?: { cues: { from: number; speaker: call_transcript_speaker; text: string; to: number; }[]; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const call of client.calls.list()) {\n  console.log(call);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.calls.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const call of client.calls.list()) {\n  console.log(call.id);\n}",
      },
      python: {
        method: 'calls.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.calls.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Calls.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Calls.List(context.TODO(), moonbase.CallListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'calls.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.calls.list\n\nputs(page)',
      },
      http: {
        example: 'curl https://api.moonbase.ai/v0/calls \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "{ id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: item_pointer; person?: item_pointer; }[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; provider_metadata?: object; summary?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; transcript?: { cues: call_transcript_cue[]; }; }",
    markdown:
      "## retrieve\n\n`client.calls.retrieve(id: string, include?: 'transcript' | 'note' | 'summary'[]): { id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: call_participant[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; tags: tag[]; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: note; provider_metadata?: object; summary?: note; transcript?: call_transcript; }`\n\n**get** `/calls/{id}`\n\nRetrieves the details of an existing call.\n\n### Parameters\n\n- `id: string`\n\n- `include?: 'transcript' | 'note' | 'summary'[]`\n  Specifies which related objects to include in the response. Valid options are `transcript`, `note`, and `summary`.\n\n### Returns\n\n- `{ id: string; created_at: string; direction: 'incoming' | 'outgoing'; participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: item_pointer; person?: item_pointer; }[]; provider: 'openphone' | 'user' | 'zoom_phone'; provider_id: string; provider_status: string; start_at: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; type: 'call'; updated_at: string; answered_at?: string; end_at?: string; note?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; provider_metadata?: object; summary?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; transcript?: { cues: call_transcript_cue[]; }; }`\n  The Call object represents a phone call that has been logged in the system. It contains details about the participants, timing, and outcome of the call.\n\n  - `id: string`\n  - `created_at: string`\n  - `direction: 'incoming' | 'outgoing'`\n  - `participants: { id: string; phone: string; role: 'caller' | 'callee' | 'other'; type: 'call_participant'; organization?: { id: string; collection: collection_pointer; type: 'item'; }; person?: { id: string; collection: collection_pointer; type: 'item'; }; }[]`\n  - `provider: 'openphone' | 'user' | 'zoom_phone'`\n  - `provider_id: string`\n  - `provider_status: string`\n  - `start_at: string`\n  - `tags: { id: string; color: string; name: string; type: 'tag'; }[]`\n  - `type: 'call'`\n  - `updated_at: string`\n  - `answered_at?: string`\n  - `end_at?: string`\n  - `note?: { id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `provider_metadata?: object`\n  - `summary?: { id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `transcript?: { cues: { from: number; speaker: call_transcript_speaker; text: string; to: number; }[]; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst call = await client.calls.retrieve('id');\n\nconsole.log(call);\n```",
    perLanguage: {
      typescript: {
        method: 'client.calls.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst call = await client.calls.retrieve('id');\n\nconsole.log(call.id);",
      },
      python: {
        method: 'calls.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\ncall = client.calls.retrieve(\n    id="id",\n)\nprint(call.id)',
      },
      go: {
        method: 'client.Calls.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcall, err := client.Calls.Get(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.CallGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", call.ID)\n}\n',
      },
      ruby: {
        method: 'calls.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\ncall = moonbase.calls.retrieve("id")\n\nputs(call)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/calls/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.files.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const moonbaseFile of client.files.list()) {\n  console.log(moonbaseFile.id);\n}",
      },
      python: {
        method: 'files.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.files.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Files.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Files.List(context.TODO(), moonbase.FileListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'files.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.files.list\n\nputs(page)',
      },
      http: {
        example: 'curl https://api.moonbase.ai/v0/files \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.files.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst moonbaseFile = await client.files.retrieve('id');\n\nconsole.log(moonbaseFile.id);",
      },
      python: {
        method: 'files.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nmoonbase_file = client.files.retrieve(\n    "id",\n)\nprint(moonbase_file.id)',
      },
      go: {
        method: 'client.Files.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmoonbaseFile, err := client.Files.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", moonbaseFile.ID)\n}\n',
      },
      ruby: {
        method: 'files.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nmoonbase_file = moonbase.files.retrieve("id")\n\nputs(moonbase_file)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/files/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'upload',
    endpoint: '/files',
    httpMethod: 'post',
    summary: 'Upload a file',
    description: 'Uploads a file to your library. The file must be 5 MB or smaller.',
    stainlessPath: '(resource) files > (method) upload',
    qualified: 'client.files.upload',
    params: ['file: string;', "associations?: { id: string; type: 'item'; }[];", 'name?: string;'],
    response:
      "{ id: string; associations: { id: string; collection: collection_pointer; type: 'item'; }[]; created_at: string; download_url: string; filename: string; name: string; size: number; type: 'file'; updated_at: string; }",
    markdown:
      "## upload\n\n`client.files.upload(file: string, associations?: { id: string; type: 'item'; }[], name?: string): { id: string; associations: item_pointer[]; created_at: string; download_url: string; filename: string; name: string; size: number; type: 'file'; updated_at: string; }`\n\n**post** `/files`\n\nUploads a file to your library. The file must be 5 MB or smaller.\n\n### Parameters\n\n- `file: string`\n  The raw file content to upload in a multipart/form-data request. Must be 5 MB or smaller.\n\n- `associations?: { id: string; type: 'item'; }[]`\n  Link the File to Moonbase items like a person, organization, deal, task, or an item in a custom collection.\n\n- `name?: string`\n  The display name of the file.\n\n### Returns\n\n- `{ id: string; associations: { id: string; collection: collection_pointer; type: 'item'; }[]; created_at: string; download_url: string; filename: string; name: string; size: number; type: 'file'; updated_at: string; }`\n  The File object represents a file that has been uploaded to your library.\n\n  - `id: string`\n  - `associations: { id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; }[]`\n  - `created_at: string`\n  - `download_url: string`\n  - `filename: string`\n  - `name: string`\n  - `size: number`\n  - `type: 'file'`\n  - `updated_at: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst moonbaseFile = await client.files.upload({ file: fs.createReadStream('path/to/file') });\n\nconsole.log(moonbaseFile);\n```",
    perLanguage: {
      typescript: {
        method: 'client.files.upload',
        example:
          "import fs from 'fs';\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst moonbaseFile = await client.files.upload({ file: fs.createReadStream('path/to/file') });\n\nconsole.log(moonbaseFile.id);",
      },
      python: {
        method: 'files.upload',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nmoonbase_file = client.files.upload(\n    file=b"Example data",\n)\nprint(moonbase_file.id)',
      },
      go: {
        method: 'client.Files.Upload',
        example:
          'package main\n\nimport (\n\t"bytes"\n\t"context"\n\t"fmt"\n\t"io"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmoonbaseFile, err := client.Files.Upload(context.TODO(), moonbase.FileUploadParams{\n\t\tFile: io.Reader(bytes.NewBuffer([]byte("Example data"))),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", moonbaseFile.ID)\n}\n',
      },
      ruby: {
        method: 'files.upload',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nmoonbase_file = moonbase.files.upload(file: StringIO.new("Example data"))\n\nputs(moonbase_file)',
      },
      http: {
        example:
          "curl https://api.moonbase.ai/v0/files \\\n    -H 'Content-Type: multipart/form-data' \\\n    -H \"Authorization: Bearer $MOONBASE_API_KEY\" \\\n    -F 'file=@/path/to/file'",
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.files.delete',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.files.delete('id');",
      },
      python: {
        method: 'files.delete',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nclient.files.delete(\n    "id",\n)',
      },
      go: {
        method: 'client.Files.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Files.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      ruby: {
        method: 'files.delete',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nresult = moonbase.files.delete("id")\n\nputs(result)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/files/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/meetings',
    httpMethod: 'get',
    summary: 'List meetings',
    description: 'Returns a list of meetings.',
    stainlessPath: '(resource) meetings > (method) list',
    qualified: 'client.meetings.list',
    params: ['after?: string;', 'before?: string;', 'i_cal_uid?: { eq?: string; };', 'limit?: number;'],
    response: "{ id: string; type: 'meeting'; }",
    markdown:
      "## list\n\n`client.meetings.list(after?: string, before?: string, i_cal_uid?: { eq?: string; }, limit?: number): { id: string; type: 'meeting'; }`\n\n**get** `/meetings`\n\nReturns a list of meetings.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `i_cal_uid?: { eq?: string; }`\n  - `eq?: string`\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; type: 'meeting'; }`\n\n  - `id: string`\n  - `type: 'meeting'`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const meetingPointer of client.meetings.list()) {\n  console.log(meetingPointer);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.meetings.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const meetingPointer of client.meetings.list()) {\n  console.log(meetingPointer.id);\n}",
      },
      python: {
        method: 'meetings.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.meetings.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Meetings.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Meetings.List(context.TODO(), moonbase.MeetingListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'meetings.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.meetings.list\n\nputs(page)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/meetings \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "{ id: string; created_at: string; end_at: string; i_cal_uid: string; provider_id: string; start_at: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; time_zone: string; type: 'meeting'; updated_at: string; attendees?: { id: string; email: string; type: 'meeting_attendee'; organization?: item_pointer; person?: item_pointer; }[]; description?: string; duration?: number; location?: string; note?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; organizer?: { id: string; email: string; type: 'meeting_organizer'; organization?: item_pointer; person?: item_pointer; }; provider_uri?: string; recording_url?: string; summary?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; title?: string; transcript?: { cues: meeting_transcript_cue[]; }; }",
    markdown:
      "## retrieve\n\n`client.meetings.retrieve(id: string, include?: 'organizer' | 'attendees' | 'transcript' | 'note' | 'summary'[]): { id: string; created_at: string; end_at: string; i_cal_uid: string; provider_id: string; start_at: string; tags: tag[]; time_zone: string; type: 'meeting'; updated_at: string; attendees?: attendee[]; description?: string; duration?: number; location?: string; note?: note; organizer?: organizer; provider_uri?: string; recording_url?: string; summary?: note; title?: string; transcript?: meeting_transcript; }`\n\n**get** `/meetings/{id}`\n\nRetrieves the details of an existing meeting.\n\n### Parameters\n\n- `id: string`\n\n- `include?: 'organizer' | 'attendees' | 'transcript' | 'note' | 'summary'[]`\n  Specifies which related objects to include in the response. Valid options are `organizer`, `attendees`, `transcript`, `note`, and `summary`.\n\n### Returns\n\n- `{ id: string; created_at: string; end_at: string; i_cal_uid: string; provider_id: string; start_at: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; time_zone: string; type: 'meeting'; updated_at: string; attendees?: { id: string; email: string; type: 'meeting_attendee'; organization?: item_pointer; person?: item_pointer; }[]; description?: string; duration?: number; location?: string; note?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; organizer?: { id: string; email: string; type: 'meeting_organizer'; organization?: item_pointer; person?: item_pointer; }; provider_uri?: string; recording_url?: string; summary?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; title?: string; transcript?: { cues: meeting_transcript_cue[]; }; }`\n  The Meeting object represents a calendar event. It includes details about the participants, timing, and associated content like summaries and recordings.\n\n  - `id: string`\n  - `created_at: string`\n  - `end_at: string`\n  - `i_cal_uid: string`\n  - `provider_id: string`\n  - `start_at: string`\n  - `tags: { id: string; color: string; name: string; type: 'tag'; }[]`\n  - `time_zone: string`\n  - `type: 'meeting'`\n  - `updated_at: string`\n  - `attendees?: { id: string; email: string; type: 'meeting_attendee'; organization?: { id: string; collection: collection_pointer; type: 'item'; }; person?: { id: string; collection: collection_pointer; type: 'item'; }; }[]`\n  - `description?: string`\n  - `duration?: number`\n  - `location?: string`\n  - `note?: { id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `organizer?: { id: string; email: string; type: 'meeting_organizer'; organization?: { id: string; collection: collection_pointer; type: 'item'; }; person?: { id: string; collection: collection_pointer; type: 'item'; }; }`\n  - `provider_uri?: string`\n  - `recording_url?: string`\n  - `summary?: { id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `title?: string`\n  - `transcript?: { cues: { from: number; speaker: meeting_transcript_speaker; text: string; to: number; }[]; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst meeting = await client.meetings.retrieve('id');\n\nconsole.log(meeting);\n```",
    perLanguage: {
      typescript: {
        method: 'client.meetings.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst meeting = await client.meetings.retrieve('id');\n\nconsole.log(meeting.id);",
      },
      python: {
        method: 'meetings.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nmeeting = client.meetings.retrieve(\n    id="id",\n)\nprint(meeting.id)',
      },
      go: {
        method: 'client.Meetings.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmeeting, err := client.Meetings.Get(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.MeetingGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", meeting.ID)\n}\n',
      },
      ruby: {
        method: 'meetings.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nmeeting = moonbase.meetings.retrieve("id")\n\nputs(meeting)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/meetings/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/meetings/{id}',
    httpMethod: 'patch',
    summary: 'Update a meeting',
    description: 'Adds a transcript, recording, or tags to an existing meeting.',
    stainlessPath: '(resource) meetings > (method) update',
    qualified: 'client.meetings.update',
    params: [
      'id: string;',
      "recording?: { content_type: 'video/mp4'; provider_id: string; url: string; };",
      "tags?: { id: string; type: 'tag'; }[];",
      'transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; provider: string; provider_id: string; };',
    ],
    response:
      "{ id: string; created_at: string; end_at: string; i_cal_uid: string; provider_id: string; start_at: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; time_zone: string; type: 'meeting'; updated_at: string; attendees?: { id: string; email: string; type: 'meeting_attendee'; organization?: item_pointer; person?: item_pointer; }[]; description?: string; duration?: number; location?: string; note?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; organizer?: { id: string; email: string; type: 'meeting_organizer'; organization?: item_pointer; person?: item_pointer; }; provider_uri?: string; recording_url?: string; summary?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; title?: string; transcript?: { cues: meeting_transcript_cue[]; }; }",
    markdown:
      "## update\n\n`client.meetings.update(id: string, recording?: { content_type: 'video/mp4'; provider_id: string; url: string; }, tags?: { id: string; type: 'tag'; }[], transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; provider: string; provider_id: string; }): { id: string; created_at: string; end_at: string; i_cal_uid: string; provider_id: string; start_at: string; tags: tag[]; time_zone: string; type: 'meeting'; updated_at: string; attendees?: attendee[]; description?: string; duration?: number; location?: string; note?: note; organizer?: organizer; provider_uri?: string; recording_url?: string; summary?: note; title?: string; transcript?: meeting_transcript; }`\n\n**patch** `/meetings/{id}`\n\nAdds a transcript, recording, or tags to an existing meeting.\n\n### Parameters\n\n- `id: string`\n\n- `recording?: { content_type: 'video/mp4'; provider_id: string; url: string; }`\n  A video recording of the meeting.\n  - `content_type: 'video/mp4'`\n    The content type of the recording. Note that only `video/mp4` is supported at this time.\n  - `provider_id: string`\n    The unique identifier for the recording from the provider's system.\n  - `url: string`\n    The URL pointing to the recording.\n\n- `tags?: { id: string; type: 'tag'; }[]`\n  Optional list of tag pointers to assign to the meeting. If omitted, existing tags are unchanged. Pass an empty array to clear tags.\n\n- `transcript?: { cues: { from: number; speaker: string; text: string; to: number; }[]; provider: string; provider_id: string; }`\n  The meeting transcript.\n  - `cues: { from: number; speaker: string; text: string; to: number; }[]`\n    A list of cues that identify the text spoken in specific time slices of the meeting.\n  - `provider: string`\n    Identifies the source of the transcript.\n  - `provider_id: string`\n    The unique identifier for the transcript from the provider's system.\n\n### Returns\n\n- `{ id: string; created_at: string; end_at: string; i_cal_uid: string; provider_id: string; start_at: string; tags: { id: string; color: string; name: string; type: 'tag'; }[]; time_zone: string; type: 'meeting'; updated_at: string; attendees?: { id: string; email: string; type: 'meeting_attendee'; organization?: item_pointer; person?: item_pointer; }[]; description?: string; duration?: number; location?: string; note?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; organizer?: { id: string; email: string; type: 'meeting_organizer'; organization?: item_pointer; person?: item_pointer; }; provider_uri?: string; recording_url?: string; summary?: { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }; title?: string; transcript?: { cues: meeting_transcript_cue[]; }; }`\n  The Meeting object represents a calendar event. It includes details about the participants, timing, and associated content like summaries and recordings.\n\n  - `id: string`\n  - `created_at: string`\n  - `end_at: string`\n  - `i_cal_uid: string`\n  - `provider_id: string`\n  - `start_at: string`\n  - `tags: { id: string; color: string; name: string; type: 'tag'; }[]`\n  - `time_zone: string`\n  - `type: 'meeting'`\n  - `updated_at: string`\n  - `attendees?: { id: string; email: string; type: 'meeting_attendee'; organization?: { id: string; collection: collection_pointer; type: 'item'; }; person?: { id: string; collection: collection_pointer; type: 'item'; }; }[]`\n  - `description?: string`\n  - `duration?: number`\n  - `location?: string`\n  - `note?: { id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `organizer?: { id: string; email: string; type: 'meeting_organizer'; organization?: { id: string; collection: collection_pointer; type: 'item'; }; person?: { id: string; collection: collection_pointer; type: 'item'; }; }`\n  - `provider_uri?: string`\n  - `recording_url?: string`\n  - `summary?: { id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  - `title?: string`\n  - `transcript?: { cues: { from: number; speaker: meeting_transcript_speaker; text: string; to: number; }[]; }`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst meeting = await client.meetings.update('id');\n\nconsole.log(meeting);\n```",
    perLanguage: {
      typescript: {
        method: 'client.meetings.update',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst meeting = await client.meetings.update('id', {\n  recording: {\n    provider_id: 'abc123',\n    content_type: 'video/mp4',\n    url: 'https://example.com/recording.mp4',\n  },\n  tags: [{ id: '1CLJt2vJy3SZLhqYW8rQoN', type: 'tag' }],\n  transcript: {\n    provider: 'example',\n    provider_id: 'def456',\n    cues: [\n      {\n        from: 0.71999997,\n        to: 1.22,\n        text: 'Hello.',\n        speaker: 'Jony Appleseed',\n      },\n      {\n        from: 1.52,\n        to: 3.22,\n        text: \"Hey! It's been too long.\",\n        speaker: 'Jane Doe',\n      },\n    ],\n  },\n});\n\nconsole.log(meeting.id);",
      },
      python: {
        method: 'meetings.update',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nmeeting = client.meetings.update(\n    id="id",\n    recording={\n        "provider_id": "abc123",\n        "content_type": "video/mp4",\n        "url": "https://example.com/recording.mp4",\n    },\n    tags=[{\n        "id": "1CLJt2vJy3SZLhqYW8rQoN",\n        "type": "tag",\n    }],\n    transcript={\n        "provider": "example",\n        "provider_id": "def456",\n        "cues": [{\n            "from": 0.71999997,\n            "to": 1.22,\n            "text": "Hello.",\n            "speaker": "Jony Appleseed",\n        }, {\n            "from": 1.52,\n            "to": 3.22,\n            "text": "Hey! It\'s been too long.",\n            "speaker": "Jane Doe",\n        }],\n    },\n)\nprint(meeting.id)',
      },
      go: {
        method: 'client.Meetings.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n\t"github.com/moonbaseai/moonbase-sdk-go/shared"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmeeting, err := client.Meetings.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.MeetingUpdateParams{\n\t\t\tRecording: moonbase.MeetingUpdateParamsRecording{\n\t\t\t\tProviderID:  "abc123",\n\t\t\t\tContentType: "video/mp4",\n\t\t\t\tURL:         "https://example.com/recording.mp4",\n\t\t\t},\n\t\t\tTags: []shared.TagPointerParam{{\n\t\t\t\tID: "1CLJt2vJy3SZLhqYW8rQoN",\n\t\t\t}},\n\t\t\tTranscript: moonbase.MeetingUpdateParamsTranscript{\n\t\t\t\tProvider:   "example",\n\t\t\t\tProviderID: "def456",\n\t\t\t\tCues: []moonbase.MeetingUpdateParamsTranscriptCue{{\n\t\t\t\t\tFrom:    0.71999997,\n\t\t\t\t\tTo:      1.22,\n\t\t\t\t\tText:    "Hello.",\n\t\t\t\t\tSpeaker: "Jony Appleseed",\n\t\t\t\t}, {\n\t\t\t\t\tFrom:    1.52,\n\t\t\t\t\tTo:      3.22,\n\t\t\t\t\tText:    "Hey! It\'s been too long.",\n\t\t\t\t\tSpeaker: "Jane Doe",\n\t\t\t\t}},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", meeting.ID)\n}\n',
      },
      ruby: {
        method: 'meetings.update',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nmeeting = moonbase.meetings.update("id")\n\nputs(meeting)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/meetings/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d "{\n          \\"recording\\": {\n            \\"content_type\\": \\"video/mp4\\",\n            \\"provider_id\\": \\"abc123\\",\n            \\"url\\": \\"https://example.com/recording.mp4\\"\n          },\n          \\"tags\\": [\n            {\n              \\"id\\": \\"1CLJt2vJy3SZLhqYW8rQoN\\",\n              \\"type\\": \\"tag\\"\n            }\n          ],\n          \\"transcript\\": {\n            \\"cues\\": [\n              {\n                \\"from\\": 0.71999997,\n                \\"speaker\\": \\"Jony Appleseed\\",\n                \\"text\\": \\"Hello.\\",\n                \\"to\\": 1.22\n              },\n              {\n                \\"from\\": 1.52,\n                \\"speaker\\": \\"Jane Doe\\",\n                \\"text\\": \\"Hey! It\'s been too long.\\",\n                \\"to\\": 3.22\n              }\n            ],\n            \\"provider\\": \\"example\\",\n            \\"provider_id\\": \\"def456\\"\n          }\n        }"',
      },
    },
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
      "{ id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }",
    markdown:
      "## list\n\n`client.notes.list(after?: string, before?: string, limit?: number): { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }`\n\n**get** `/notes`\n\nReturns a list of your notes.\n\n### Parameters\n\n- `after?: string`\n  When specified, returns results starting immediately after the item identified by this cursor. Use the cursor value from the previous response's metadata to fetch the next page of results.\n\n- `before?: string`\n  When specified, returns results starting immediately before the item identified by this cursor. Use the cursor value from the response's metadata to fetch the previous page of results.\n\n- `limit?: number`\n  Maximum number of items to return per page. Must be between 1 and 100. Defaults to 20 if not specified.\n\n### Returns\n\n- `{ id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  The Note object represents a block of text content, often used for meeting notes or summaries.\n\n  - `id: string`\n  - `associations: { id: string; type: 'call'; } | { id: string; collection: object; type: 'item'; } | { id: string; type: 'meeting'; }[]`\n  - `body: { markdown?: string; }`\n  - `created_at: string`\n  - `lock_version: number`\n  - `type: 'note'`\n  - `updated_at: string`\n  - `creator?: { id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; }`\n  - `summary?: string`\n  - `title?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// Automatically fetches more pages as needed.\nfor await (const note of client.notes.list()) {\n  console.log(note);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.notes.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const note of client.notes.list()) {\n  console.log(note.id);\n}",
      },
      python: {
        method: 'notes.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.notes.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Notes.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Notes.List(context.TODO(), moonbase.NoteListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'notes.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.notes.list\n\nputs(page)',
      },
      http: {
        example: 'curl https://api.moonbase.ai/v0/notes \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "{ id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }",
    markdown:
      "## retrieve\n\n`client.notes.retrieve(id: string): { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }`\n\n**get** `/notes/{id}`\n\nRetrieves the details of an existing note.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  The Note object represents a block of text content, often used for meeting notes or summaries.\n\n  - `id: string`\n  - `associations: { id: string; type: 'call'; } | { id: string; collection: object; type: 'item'; } | { id: string; type: 'meeting'; }[]`\n  - `body: { markdown?: string; }`\n  - `created_at: string`\n  - `lock_version: number`\n  - `type: 'note'`\n  - `updated_at: string`\n  - `creator?: { id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; }`\n  - `summary?: string`\n  - `title?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst note = await client.notes.retrieve('id');\n\nconsole.log(note);\n```",
    perLanguage: {
      typescript: {
        method: 'client.notes.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst note = await client.notes.retrieve('id');\n\nconsole.log(note.id);",
      },
      python: {
        method: 'notes.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nnote = client.notes.retrieve(\n    "id",\n)\nprint(note.id)',
      },
      go: {
        method: 'client.Notes.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tnote, err := client.Notes.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", note.ID)\n}\n',
      },
      ruby: {
        method: 'notes.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nnote = moonbase.notes.retrieve("id")\n\nputs(note)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/notes/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/notes',
    httpMethod: 'post',
    summary: 'Create a note',
    description: 'Create a new note.',
    stainlessPath: '(resource) notes > (method) create',
    qualified: 'client.notes.create',
    params: [
      'body: { markdown?: string; };',
      "associations?: { id: string; type: 'call'; } | { id: string; type: 'item'; } | { id: string; type: 'meeting'; }[];",
    ],
    response:
      "{ id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }",
    markdown:
      "## create\n\n`client.notes.create(body: { markdown?: string; }, associations?: object | object | object[]): { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }`\n\n**post** `/notes`\n\nCreate a new note.\n\n### Parameters\n\n- `body: { markdown?: string; }`\n  The main content of the note.\n  - `markdown?: string`\n    The content formatted as Markdown text.\n\n- `associations?: { id: string; type: 'call'; } | { id: string; type: 'item'; } | { id: string; type: 'meeting'; }[]`\n  Link the Note to Moonbase items (person, organization, deal, task, or an item in a custom collection), meetings, or calls.\n\n### Returns\n\n- `{ id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  The Note object represents a block of text content, often used for meeting notes or summaries.\n\n  - `id: string`\n  - `associations: { id: string; type: 'call'; } | { id: string; collection: object; type: 'item'; } | { id: string; type: 'meeting'; }[]`\n  - `body: { markdown?: string; }`\n  - `created_at: string`\n  - `lock_version: number`\n  - `type: 'note'`\n  - `updated_at: string`\n  - `creator?: { id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; }`\n  - `summary?: string`\n  - `title?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst note = await client.notes.create({ body: {} });\n\nconsole.log(note);\n```",
    perLanguage: {
      typescript: {
        method: 'client.notes.create',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst note = await client.notes.create({\n  body: { markdown: \"# A note title\\n\\nHere's a note for me! Yay!\" },\n});\n\nconsole.log(note.id);",
      },
      python: {
        method: 'notes.create',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nnote = client.notes.create(\n    body={\n        "markdown": "# A note title\\n\\nHere\'s a note for me! Yay!"\n    },\n)\nprint(note.id)',
      },
      go: {
        method: 'client.Notes.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n\t"github.com/moonbaseai/moonbase-sdk-go/shared"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tnote, err := client.Notes.New(context.TODO(), moonbase.NoteNewParams{\n\t\tBody: shared.FormattedTextParam{\n\t\t\tMarkdown: moonbase.String("# A note title\\n\\nHere\'s a note for me! Yay!"),\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", note.ID)\n}\n',
      },
      ruby: {
        method: 'notes.create',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nnote = moonbase.notes.create(body: {})\n\nputs(note)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/notes \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d "{\n          \\"body\\": {\n            \\"markdown\\": \\"# A note title\\\\n\\\\nHere\'s a note for me! Yay!\\"\n          }\n        }"',
      },
    },
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
      "{ id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }",
    markdown:
      "## update\n\n`client.notes.update(id: string, body: { markdown?: string; }, lock_version: number): { id: string; associations: note_association_pointer[]; body: formatted_text; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: item_pointer; summary?: string; title?: string; }`\n\n**patch** `/notes/{id}`\n\nUpdate an existing note.\n\n### Parameters\n\n- `id: string`\n\n- `body: { markdown?: string; }`\n  The main content of the note.\n  - `markdown?: string`\n    The content formatted as Markdown text.\n\n- `lock_version: number`\n  The current lock version of the note for optimistic concurrency control.\n\n### Returns\n\n- `{ id: string; associations: object | object | object[]; body: { markdown?: string; }; created_at: string; lock_version: number; type: 'note'; updated_at: string; creator?: { id: string; collection: collection_pointer; type: 'item'; }; summary?: string; title?: string; }`\n  The Note object represents a block of text content, often used for meeting notes or summaries.\n\n  - `id: string`\n  - `associations: { id: string; type: 'call'; } | { id: string; collection: object; type: 'item'; } | { id: string; type: 'meeting'; }[]`\n  - `body: { markdown?: string; }`\n  - `created_at: string`\n  - `lock_version: number`\n  - `type: 'note'`\n  - `updated_at: string`\n  - `creator?: { id: string; collection: { id: string; ref: string; type: 'collection'; }; type: 'item'; }`\n  - `summary?: string`\n  - `title?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst note = await client.notes.update('id', {\n  body: {},\n  lock_version: 0,\n});\n\nconsole.log(note);\n```",
    perLanguage: {
      typescript: {
        method: 'client.notes.update',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst note = await client.notes.update('id', {\n  body: { markdown: \"# A note title\\n\\nHere's a note for me! Yay!\" },\n  lock_version: 0,\n});\n\nconsole.log(note.id);",
      },
      python: {
        method: 'notes.update',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nnote = client.notes.update(\n    id="id",\n    body={\n        "markdown": "# A note title\\n\\nHere\'s a note for me! Yay!"\n    },\n    lock_version=0,\n)\nprint(note.id)',
      },
      go: {
        method: 'client.Notes.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n\t"github.com/moonbaseai/moonbase-sdk-go/shared"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tnote, err := client.Notes.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.NoteUpdateParams{\n\t\t\tBody: shared.FormattedTextParam{\n\t\t\t\tMarkdown: moonbase.String("# A note title\\n\\nHere\'s a note for me! Yay!"),\n\t\t\t},\n\t\t\tLockVersion: 0,\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", note.ID)\n}\n',
      },
      ruby: {
        method: 'notes.update',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nnote = moonbase.notes.update("id", body: {}, lock_version: 0)\n\nputs(note)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/notes/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d "{\n          \\"body\\": {\n            \\"markdown\\": \\"# A note title\\\\n\\\\nHere\'s a note for me! Yay!\\"\n          },\n          \\"lock_version\\": 0\n        }"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.notes.delete',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.notes.delete('id');",
      },
      python: {
        method: 'notes.delete',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nclient.notes.delete(\n    "id",\n)',
      },
      go: {
        method: 'client.Notes.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Notes.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      ruby: {
        method: 'notes.delete',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nresult = moonbase.notes.delete("id")\n\nputs(result)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/notes/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.webhookEndpoints.list',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const endpoint of client.webhookEndpoints.list()) {\n  console.log(endpoint.id);\n}",
      },
      python: {
        method: 'webhook_endpoints.list',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.webhook_endpoints.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.WebhookEndpoints.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.WebhookEndpoints.List(context.TODO(), moonbase.WebhookEndpointListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'webhook_endpoints.list',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\npage = moonbase.webhook_endpoints.list\n\nputs(page)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/webhook_endpoints \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.webhookEndpoints.create',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst endpoint = await client.webhookEndpoints.create({\n  status: 'enabled',\n  url: 'https://example.com/webhook',\n  subscriptions: [\n    { event_type: 'activity/item_created' },\n    { event_type: 'activity/item_mentioned' },\n  ],\n});\n\nconsole.log(endpoint.id);",
      },
      python: {
        method: 'webhook_endpoints.create',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nendpoint = client.webhook_endpoints.create(\n    status="enabled",\n    url="https://example.com/webhook",\n    subscriptions=[{\n        "event_type": "activity/item_created"\n    }, {\n        "event_type": "activity/item_mentioned"\n    }],\n)\nprint(endpoint.id)',
      },
      go: {
        method: 'client.WebhookEndpoints.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tendpoint, err := client.WebhookEndpoints.New(context.TODO(), moonbase.WebhookEndpointNewParams{\n\t\tStatus: moonbase.WebhookEndpointNewParamsStatusEnabled,\n\t\tURL:    "https://example.com/webhook",\n\t\tSubscriptions: []moonbase.WebhookEndpointNewParamsSubscription{{\n\t\t\tEventType: "activity/item_created",\n\t\t}, {\n\t\t\tEventType: "activity/item_mentioned",\n\t\t}},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", endpoint.ID)\n}\n',
      },
      ruby: {
        method: 'webhook_endpoints.create',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nendpoint = moonbase.webhook_endpoints.create(status: :enabled, url: "https://example.com/webhook")\n\nputs(endpoint)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/webhook_endpoints \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "status": "enabled",\n          "url": "https://example.com/webhook",\n          "subscriptions": [\n            {\n              "event_type": "activity/item_created"\n            },\n            {\n              "event_type": "activity/item_mentioned"\n            }\n          ]\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.webhookEndpoints.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst endpoint = await client.webhookEndpoints.retrieve('id');\n\nconsole.log(endpoint.id);",
      },
      python: {
        method: 'webhook_endpoints.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nendpoint = client.webhook_endpoints.retrieve(\n    "id",\n)\nprint(endpoint.id)',
      },
      go: {
        method: 'client.WebhookEndpoints.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tendpoint, err := client.WebhookEndpoints.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", endpoint.ID)\n}\n',
      },
      ruby: {
        method: 'webhook_endpoints.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nendpoint = moonbase.webhook_endpoints.retrieve("id")\n\nputs(endpoint)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/webhook_endpoints/$ID \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.webhookEndpoints.update',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst endpoint = await client.webhookEndpoints.update('id', {\n  status: 'disabled',\n  url: 'https://updated.example.com',\n});\n\nconsole.log(endpoint.id);",
      },
      python: {
        method: 'webhook_endpoints.update',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nendpoint = client.webhook_endpoints.update(\n    id="id",\n    status="disabled",\n    url="https://updated.example.com",\n)\nprint(endpoint.id)',
      },
      go: {
        method: 'client.WebhookEndpoints.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tendpoint, err := client.WebhookEndpoints.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tmoonbase.WebhookEndpointUpdateParams{\n\t\t\tStatus: moonbase.WebhookEndpointUpdateParamsStatusDisabled,\n\t\t\tURL:    moonbase.String("https://updated.example.com"),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", endpoint.ID)\n}\n',
      },
      ruby: {
        method: 'webhook_endpoints.update',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nendpoint = moonbase.webhook_endpoints.update("id")\n\nputs(endpoint)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/webhook_endpoints/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "status": "disabled",\n          "url": "https://updated.example.com"\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.webhookEndpoints.delete',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.webhookEndpoints.delete('id');",
      },
      python: {
        method: 'webhook_endpoints.delete',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nclient.webhook_endpoints.delete(\n    "id",\n)',
      },
      go: {
        method: 'client.WebhookEndpoints.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.WebhookEndpoints.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      ruby: {
        method: 'webhook_endpoints.delete',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nresult = moonbase.webhook_endpoints.delete("id")\n\nputs(result)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/webhook_endpoints/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
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
      "{ created_at: string; type: 'agent_settings'; updated_at: string; deal_summary_prompt?: string; meeting_prebrief_prompt?: string; meeting_summary_prompt?: string; meeting_web_search?: boolean; organization_info?: string; }",
    markdown:
      "## retrieve\n\n`client.agentSettings.retrieve(): { created_at: string; type: 'agent_settings'; updated_at: string; deal_summary_prompt?: string; meeting_prebrief_prompt?: string; meeting_summary_prompt?: string; meeting_web_search?: boolean; organization_info?: string; }`\n\n**get** `/agent_settings`\n\n### Returns\n\n- `{ created_at: string; type: 'agent_settings'; updated_at: string; deal_summary_prompt?: string; meeting_prebrief_prompt?: string; meeting_summary_prompt?: string; meeting_web_search?: boolean; organization_info?: string; }`\n\n  - `created_at: string`\n  - `type: 'agent_settings'`\n  - `updated_at: string`\n  - `deal_summary_prompt?: string`\n  - `meeting_prebrief_prompt?: string`\n  - `meeting_summary_prompt?: string`\n  - `meeting_web_search?: boolean`\n  - `organization_info?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst agentSetting = await client.agentSettings.retrieve();\n\nconsole.log(agentSetting);\n```",
    perLanguage: {
      typescript: {
        method: 'client.agentSettings.retrieve',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst agentSetting = await client.agentSettings.retrieve();\n\nconsole.log(agentSetting.created_at);",
      },
      python: {
        method: 'agent_settings.retrieve',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nagent_setting = client.agent_settings.retrieve()\nprint(agent_setting.created_at)',
      },
      go: {
        method: 'client.AgentSettings.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tagentSetting, err := client.AgentSettings.Get(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", agentSetting.CreatedAt)\n}\n',
      },
      ruby: {
        method: 'agent_settings.retrieve',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nagent_setting = moonbase.agent_settings.retrieve\n\nputs(agent_setting)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/agent_settings \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/agent_settings',
    httpMethod: 'patch',
    summary: '',
    description: '',
    stainlessPath: '(resource) agent_settings > (method) update',
    qualified: 'client.agentSettings.update',
    params: [
      'deal_summary_prompt?: string;',
      'meeting_prebrief_prompt?: string;',
      'meeting_summary_prompt?: string;',
      'meeting_web_search?: boolean;',
      'organization_info?: string;',
    ],
    response:
      "{ created_at: string; type: 'agent_settings'; updated_at: string; deal_summary_prompt?: string; meeting_prebrief_prompt?: string; meeting_summary_prompt?: string; meeting_web_search?: boolean; organization_info?: string; }",
    markdown:
      "## update\n\n`client.agentSettings.update(deal_summary_prompt?: string, meeting_prebrief_prompt?: string, meeting_summary_prompt?: string, meeting_web_search?: boolean, organization_info?: string): { created_at: string; type: 'agent_settings'; updated_at: string; deal_summary_prompt?: string; meeting_prebrief_prompt?: string; meeting_summary_prompt?: string; meeting_web_search?: boolean; organization_info?: string; }`\n\n**patch** `/agent_settings`\n\n### Parameters\n\n- `deal_summary_prompt?: string`\n\n- `meeting_prebrief_prompt?: string`\n\n- `meeting_summary_prompt?: string`\n\n- `meeting_web_search?: boolean`\n\n- `organization_info?: string`\n\n### Returns\n\n- `{ created_at: string; type: 'agent_settings'; updated_at: string; deal_summary_prompt?: string; meeting_prebrief_prompt?: string; meeting_summary_prompt?: string; meeting_web_search?: boolean; organization_info?: string; }`\n\n  - `created_at: string`\n  - `type: 'agent_settings'`\n  - `updated_at: string`\n  - `deal_summary_prompt?: string`\n  - `meeting_prebrief_prompt?: string`\n  - `meeting_summary_prompt?: string`\n  - `meeting_web_search?: boolean`\n  - `organization_info?: string`\n\n### Example\n\n```typescript\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\nconst agentSetting = await client.agentSettings.update();\n\nconsole.log(agentSetting);\n```",
    perLanguage: {
      typescript: {
        method: 'client.agentSettings.update',
        example:
          "import Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst agentSetting = await client.agentSettings.update({\n  deal_summary_prompt: 'Instructions for the agent to help generate the deal summary',\n  meeting_prebrief_prompt: 'Instructions for the agent to help generate the meeting prebrief note',\n  meeting_summary_prompt: 'Instructions for the agent to help generate the meeting summary note',\n  organization_info: 'Information about the organization using Moonbase',\n});\n\nconsole.log(agentSetting.created_at);",
      },
      python: {
        method: 'agent_settings.update',
        example:
          'import os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\nagent_setting = client.agent_settings.update(\n    deal_summary_prompt="Instructions for the agent to help generate the deal summary",\n    meeting_prebrief_prompt="Instructions for the agent to help generate the meeting prebrief note",\n    meeting_summary_prompt="Instructions for the agent to help generate the meeting summary note",\n    meeting_web_search=False,\n    organization_info="Information about the organization using Moonbase",\n)\nprint(agent_setting.created_at)',
      },
      go: {
        method: 'client.AgentSettings.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tagentSetting, err := client.AgentSettings.Update(context.TODO(), moonbase.AgentSettingUpdateParams{\n\t\tDealSummaryPrompt:     moonbase.String("Instructions for the agent to help generate the deal summary"),\n\t\tMeetingPrebriefPrompt: moonbase.String("Instructions for the agent to help generate the meeting prebrief note"),\n\t\tMeetingSummaryPrompt:  moonbase.String("Instructions for the agent to help generate the meeting summary note"),\n\t\tOrganizationInfo:      moonbase.String("Information about the organization using Moonbase"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", agentSetting.CreatedAt)\n}\n',
      },
      ruby: {
        method: 'agent_settings.update',
        example:
          'require "moonbase"\n\nmoonbase = Moonbase::Client.new(api_key: "My API Key")\n\nagent_setting = moonbase.agent_settings.update\n\nputs(agent_setting)',
      },
      http: {
        example:
          'curl https://api.moonbase.ai/v0/agent_settings \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $MOONBASE_API_KEY" \\\n    -d \'{\n          "deal_summary_prompt": "Instructions for the agent to help generate the deal summary",\n          "meeting_prebrief_prompt": "Instructions for the agent to help generate the meeting prebrief note",\n          "meeting_summary_prompt": "Instructions for the agent to help generate the meeting summary note",\n          "meeting_web_search": false,\n          "organization_info": "Information about the organization using Moonbase"\n        }\'',
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'go',
    content:
      '# Moonbase Go API Library\n\n<a href="https://pkg.go.dev/github.com/moonbaseai/moonbase-sdk-go"><img src="https://pkg.go.dev/badge/github.com/moonbaseai/moonbase-sdk-go.svg" alt="Go Reference"></a>\n\nThe Moonbase Go library provides convenient access to the Moonbase REST API\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Moonbase MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40moonbaseai%2Fmcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBtb29uYmFzZWFpL21jcCJdLCJlbnYiOnsiTU9PTkJBU0VfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40moonbaseai%2Fmcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40moonbaseai%2Fmcp%22%5D%2C%22env%22%3A%7B%22MOONBASE_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/moonbaseai/moonbase-sdk-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/moonbaseai/moonbase-sdk-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/moonbaseai/moonbase-sdk-go"\n\t"github.com/moonbaseai/moonbase-sdk-go/option"\n)\n\nfunc main() {\n\tclient := moonbase.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("MOONBASE_API_KEY")\n\t)\n\tcollection, err := client.Collections.Get(context.TODO(), "people")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", collection.ID)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Collections.Get(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/moonbaseai/moonbase-sdk-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n```go\niter := client.Collections.Items.ListAutoPaging(\n\tcontext.TODO(),\n\t"people",\n\tmoonbase.CollectionItemListParams{\n\t\tLimit: moonbase.Int(5),\n\t},\n)\n// Automatically fetches more pages as needed.\nfor iter.Next() {\n\titemPointer := iter.Current()\n\tfmt.Printf("%+v\\n", itemPointer)\n}\nif err := iter.Err(); err != nil {\n\tpanic(err.Error())\n}\n```\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n```go\npeople, err := client.Collections.Items.List(\n\tcontext.TODO(),\n\t"people",\n\tmoonbase.CollectionItemListParams{\n\t\tLimit: moonbase.Int(5),\n\t},\n)\nfor page != nil {\n\tfor _, item := range page.Data {\n\t\tfmt.Printf("%+v\\n", item)\n\t}\n\tpage, err = page.GetNextPage()\n}\nif err != nil {\n\tpanic(err.Error())\n}\n```\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Collections.Get(context.TODO(), "people")\nif err != nil {\n\tvar apierr *moonbase.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/collections/{id}": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Collections.Get(\n\tctx,\n\t"people",\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n```go\n// A file from the file system\nfile, err := os.Open("/path/to/file")\nmoonbase.InboxMessageAttachmentNewParams{\n\tFile: file,\n}\n\n// A file from a string\nmoonbase.InboxMessageAttachmentNewParams{\n\tFile: strings.NewReader("my file contents"),\n}\n\n// With a custom filename and contentType\nmoonbase.InboxMessageAttachmentNewParams{\n\tFile: moonbase.File(strings.NewReader(`{"hello": "foo"}`), "file.go", "application/json"),\n}\n```\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := moonbase.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Collections.Get(\n\tcontext.TODO(),\n\t"people",\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\ncollection, err := client.Collections.Get(\n\tcontext.TODO(),\n\t"people",\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", collection)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/moonbaseai/moonbase-sdk-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'python',
    content:
      '# Moonbase Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/moonbase-sdk.svg?label=pypi%20(stable))](https://pypi.org/project/moonbase-sdk/)\n\nThe Moonbase Python library provides convenient access to the Moonbase REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Moonbase MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40moonbaseai%2Fmcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBtb29uYmFzZWFpL21jcCJdLCJlbnYiOnsiTU9PTkJBU0VfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40moonbaseai%2Fmcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40moonbaseai%2Fmcp%22%5D%2C%22env%22%3A%7B%22MOONBASE_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\n The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install moonbase-sdk\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom moonbase import Moonbase\n\nclient = Moonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\n\ncollection = client.collections.retrieve(\n    "people",\n)\nprint(collection.id)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `MOONBASE_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncMoonbase` instead of `Moonbase` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom moonbase import AsyncMoonbase\n\nclient = AsyncMoonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  collection = await client.collections.retrieve(\n      "people",\n  )\n  print(collection.id)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install moonbase-sdk[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom moonbase import DefaultAioHttpClient\nfrom moonbase import AsyncMoonbase\n\nasync def main() -> None:\n  async with AsyncMoonbase(\n    api_key=os.environ.get("MOONBASE_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    collection = await client.collections.retrieve(\n        "people",\n    )\n    print(collection.id)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n## Pagination\n\nList methods in the Moonbase API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```python\nfrom moonbase import Moonbase\n\nclient = Moonbase()\n\nall_items = []\n# Automatically fetches more pages as needed.\nfor item in client.collections.items.list(\n    collection_id="people",\n    limit=5,\n):\n    # Do something with item here\n    all_items.append(item)\nprint(all_items)\n```\n\nOr, asynchronously:\n\n```python\nimport asyncio\nfrom moonbase import AsyncMoonbase\n\nclient = AsyncMoonbase()\n\nasync def main() -> None:\n    all_items = []\n    # Iterate through items across all pages, issuing requests as needed.\n    async for item in client.collections.items.list(\n    collection_id="people",\n    limit=5,\n):\n        all_items.append(item)\n    print(all_items)\n\nasyncio.run(main())\n```\n\nAlternatively, you can use the `.has_next_page()`, `.next_page_info()`, or  `.get_next_page()` methods for more granular control working with pages:\n\n```python\nfirst_page = await client.collections.items.list(\n    collection_id="people",\n    limit=5,\n)\nif first_page.has_next_page():\n    print(f"will fetch next page using these details: {first_page.next_page_info()}")\n    next_page = await first_page.get_next_page()\n    print(f"number of items we just fetched: {len(next_page.data)}")\n\n# Remove `await` for non-async usage.\n```\n\nOr just work directly with the returned data:\n\n```python\nfirst_page = await client.collections.items.list(\n    collection_id="people",\n    limit=5,\n)\n\nprint(f"next page cursor: {first_page.meta.cursors.next}") # => "next page cursor: ..."\nfor item in first_page.data:\n    print(item.id)\n\n# Remove `await` for non-async usage.\n```\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom moonbase import Moonbase\n\nclient = Moonbase()\n\nitem = client.collections.items.merge(\n    collection_id="collection_id",\n    destination={\n        "id": "1CLJt2v7opRhSWqVEtHwYT",\n        "type": "item",\n    },\n    source={\n        "id": "1CLJt2v5aNd8G5SGzEaeVU",\n        "type": "item",\n    },\n)\nprint(item.destination)\n```\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed as `bytes`, or a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance or a tuple of `(filename, contents, media type)`.\n\n```python\nfrom pathlib import Path\nfrom moonbase import Moonbase\n\nclient = Moonbase()\n\nclient.inbox_messages.attachments.create(\n    inbox_message_id="inbox_message_id",\n    file=Path("/path/to/file"),\n)\n```\n\nThe async client uses the exact same interface. If you pass a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance, the file contents will be read asynchronously automatically.\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `moonbase.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `moonbase.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `moonbase.APIError`.\n\n```python\nimport moonbase\nfrom moonbase import Moonbase\n\nclient = Moonbase()\n\ntry:\n    client.collections.retrieve(\n        "people",\n    )\nexcept moonbase.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept moonbase.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept moonbase.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom moonbase import Moonbase\n\n# Configure the default for all requests:\nclient = Moonbase(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).collections.retrieve(\n    "people",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom moonbase import Moonbase\n\n# Configure the default for all requests:\nclient = Moonbase(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Moonbase(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).collections.retrieve(\n    "people",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `MOONBASE_LOG` to `info`.\n\n```shell\n$ export MOONBASE_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom moonbase import Moonbase\n\nclient = Moonbase()\nresponse = client.collections.with_raw_response.retrieve(\n    "people",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\ncollection = response.parse()  # get the object that `collections.retrieve()` would have returned\nprint(collection.id)\n```\n\nThese methods return an [`APIResponse`](https://github.com/moonbaseai/moonbase-sdk-python/tree/main/src/moonbase/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/moonbaseai/moonbase-sdk-python/tree/main/src/moonbase/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.collections.with_streaming_response.retrieve(\n    "people",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom moonbase import Moonbase, DefaultHttpxClient\n\nclient = Moonbase(\n    # Or use the `MOONBASE_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom moonbase import Moonbase\n\nwith Moonbase() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/moonbaseai/moonbase-sdk-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport moonbase\nprint(moonbase.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'ruby',
    content:
      '# Moonbase Ruby API library\n\nThe Moonbase Ruby library provides convenient access to the Moonbase REST API from any Ruby 3.2.0+ application. It ships with comprehensive types & docstrings in Yard, RBS, and RBI – [see below](https://github.com/moonbaseai/moonbase-sdk-ruby#Sorbet) for usage with Sorbet. The standard library\'s `net/http` is used as the HTTP transport, with connection pooling via the `connection_pool` gem.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Moonbase MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40moonbaseai%2Fmcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBtb29uYmFzZWFpL21jcCJdLCJlbnYiOnsiTU9PTkJBU0VfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40moonbaseai%2Fmcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40moonbaseai%2Fmcp%22%5D%2C%22env%22%3A%7B%22MOONBASE_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nDocumentation for releases of this gem can be found [on RubyDoc](https://gemdocs.org/gems/moonbase-sdk).\n\n\n\n## Installation\n\nTo use this gem, install via Bundler by adding the following to your application\'s `Gemfile`:\n\n<!-- x-release-please-start-version -->\n\n```ruby\ngem "moonbase-sdk", "~> 0.0.1"\n```\n\n<!-- x-release-please-end -->\n\n## Usage\n\n```ruby\nrequire "bundler/setup"\nrequire "moonbase"\n\nmoonbase = Moonbase::Client.new(\n  api_key: ENV["MOONBASE_API_KEY"] # This is the default and can be omitted\n)\n\ncollection = moonbase.collections.retrieve("people")\n\nputs(collection.id)\n```\n\n\n\n### Pagination\n\nList methods in the Moonbase API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```ruby\npage = moonbase.collections.items.list("people", limit: 5)\n\n# Fetch single item from page.\nitem = page.data[0]\nputs(item.id)\n\n# Automatically fetches more pages as needed.\npage.auto_paging_each do |item|\n  puts(item.id)\nend\n```\n\nAlternatively, you can use the `#next_page?` and `#next_page` methods for more granular control working with pages.\n\n```ruby\nif page.next_page?\n  new_page = page.next_page\n  puts(new_page.data[0].id)\nend\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads can be passed as raw contents, a [`Pathname`](https://rubyapi.org/3.2/o/pathname) instance, [`StringIO`](https://rubyapi.org/3.2/o/stringio), or more.\n\n```ruby\nrequire "pathname"\n\n# Use `Pathname` to send the filename and/or avoid paging a large file into memory:\nmessage_attachment = moonbase.inbox_messages.attachments.create(file: Pathname("/path/to/file"))\n\n# Alternatively, pass file contents or a `StringIO` directly:\nmessage_attachment = moonbase.inbox_messages.attachments.create(file: File.read("/path/to/file"))\n\n# Or, to control the filename and/or content type:\nfile = Moonbase::FilePart.new(File.read("/path/to/file"), filename: "/path/to/file", content_type: "…")\nmessage_attachment = moonbase.inbox_messages.attachments.create(file: file)\n\nputs(message_attachment.id)\n```\n\nNote that you can also pass a raw `IO` descriptor, but this disables retries, as the library can\'t be sure if the descriptor is a file or pipe (which cannot be rewound).\n\n### Handling errors\n\nWhen the library is unable to connect to the API, or if the API returns a non-success status code (i.e., 4xx or 5xx response), a subclass of `Moonbase::Errors::APIError` will be thrown:\n\n```ruby\nbegin\n  collection = moonbase.collections.retrieve("people")\nrescue Moonbase::Errors::APIConnectionError => e\n  puts("The server could not be reached")\n  puts(e.cause)  # an underlying Exception, likely raised within `net/http`\nrescue Moonbase::Errors::RateLimitError => e\n  puts("A 429 status code was received; we should back off a bit.")\nrescue Moonbase::Errors::APIStatusError => e\n  puts("Another non-200-range status code was received")\n  puts(e.status)\nend\n```\n\nError codes are as follows:\n\n| Cause            | Error Type                 |\n| ---------------- | -------------------------- |\n| HTTP 400         | `BadRequestError`          |\n| HTTP 401         | `AuthenticationError`      |\n| HTTP 403         | `PermissionDeniedError`    |\n| HTTP 404         | `NotFoundError`            |\n| HTTP 409         | `ConflictError`            |\n| HTTP 422         | `UnprocessableEntityError` |\n| HTTP 429         | `RateLimitError`           |\n| HTTP >= 500      | `InternalServerError`      |\n| Other HTTP error | `APIStatusError`           |\n| Timeout          | `APITimeoutError`          |\n| Network error    | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\n\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict, 429 Rate Limit, >=500 Internal errors, and timeouts will all be retried by default.\n\nYou can use the `max_retries` option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nmoonbase = Moonbase::Client.new(\n  max_retries: 0 # default is 2\n)\n\n# Or, configure per-request:\nmoonbase.collections.retrieve("people", request_options: {max_retries: 5})\n```\n\n### Timeouts\n\nBy default, requests will time out after 60 seconds. You can use the timeout option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nmoonbase = Moonbase::Client.new(\n  timeout: nil # default is 60\n)\n\n# Or, configure per-request:\nmoonbase.collections.retrieve("people", request_options: {timeout: 5})\n```\n\nOn timeout, `Moonbase::Errors::APITimeoutError` is raised.\n\nNote that requests that time out are retried by default.\n\n## Advanced concepts\n\n### BaseModel\n\nAll parameter and response objects inherit from `Moonbase::Internal::Type::BaseModel`, which provides several conveniences, including:\n\n1. All fields, including unknown ones, are accessible with `obj[:prop]` syntax, and can be destructured with `obj => {prop: prop}` or pattern-matching syntax.\n\n2. Structural equivalence for equality; if two API calls return the same values, comparing the responses with == will return true.\n\n3. Both instances and the classes themselves can be pretty-printed.\n\n4. Helpers such as `#to_h`, `#deep_to_h`, `#to_json`, and `#to_yaml`.\n\n### Making custom or undocumented requests\n\n#### Undocumented properties\n\nYou can send undocumented parameters to any endpoint, and read undocumented response properties, like so:\n\nNote: the `extra_` parameters of the same name overrides the documented parameters.\n\n```ruby\ncollection =\n  moonbase.collections.retrieve(\n    "people",\n    request_options: {\n      extra_query: {my_query_parameter: value},\n      extra_body: {my_body_parameter: value},\n      extra_headers: {"my-header": value}\n    }\n  )\n\nputs(collection[:my_undocumented_property])\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` under the `request_options:` parameter when making a request, as seen in the examples above.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints while retaining the benefit of auth, retries, and so on, you can make requests using `client.request`, like so:\n\n```ruby\nresponse = client.request(\n  method: :post,\n  path: \'/undocumented/endpoint\',\n  query: {"dog": "woof"},\n  headers: {"useful-header": "interesting-value"},\n  body: {"hello": "world"}\n)\n```\n\n### Concurrency & connection pooling\n\nThe `Moonbase::Client` instances are threadsafe, but are only are fork-safe when there are no in-flight HTTP requests.\n\nEach instance of `Moonbase::Client` has its own HTTP connection pool with a default size of 99. As such, we recommend instantiating the client once per application in most settings.\n\nWhen all available connections from the pool are checked out, requests wait for a new connection to become available, with queue time counting towards the request timeout.\n\nUnless otherwise specified, other classes in the SDK do not have locks protecting their underlying data structure.\n\n## Sorbet\n\nThis library provides comprehensive [RBI](https://sorbet.org/docs/rbi) definitions, and has no dependency on sorbet-runtime.\n\nYou can provide typesafe request parameters like so:\n\n```ruby\nmoonbase.collections.retrieve("people")\n```\n\nOr, equivalently:\n\n```ruby\n# Hashes work, but are not typesafe:\nmoonbase.collections.retrieve("people")\n\n# You can also splat a full Params class:\nparams = Moonbase::CollectionRetrieveParams.new\nmoonbase.collections.retrieve("people", **params)\n```\n\n### Enums\n\nSince this library does not depend on `sorbet-runtime`, it cannot provide [`T::Enum`](https://sorbet.org/docs/tenum) instances. Instead, we provide "tagged symbols" instead, which is always a primitive at runtime:\n\n```ruby\n# :replace\nputs(Moonbase::Collections::ItemUpdateParams::UpdateManyStrategy::REPLACE)\n\n# Revealed type: `T.all(Moonbase::Collections::ItemUpdateParams::UpdateManyStrategy, Symbol)`\nT.reveal_type(Moonbase::Collections::ItemUpdateParams::UpdateManyStrategy::REPLACE)\n```\n\nEnum parameters have a "relaxed" type, so you can either pass in enum constants or their literal value:\n\n```ruby\n# Using the enum constants preserves the tagged type information:\nmoonbase.collections.items.update(\n  update_many_strategy: Moonbase::Collections::ItemUpdateParams::UpdateManyStrategy::REPLACE,\n  # …\n)\n\n# Literal values are also permissible:\nmoonbase.collections.items.update(\n  update_many_strategy: :replace,\n  # …\n)\n```\n\n## Versioning\n\nThis package follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions. As the library is in initial development and has a major version of `0`, APIs may change at any time.\n\nThis package considers improvements to the (non-runtime) `*.rbi` and `*.rbs` type definitions to be non-breaking changes.\n\n## Requirements\n\nRuby 3.2.0 or higher.\n\n## Contributing\n\nSee [the contributing documentation](https://github.com/moonbaseai/moonbase-sdk-ruby/tree/main/CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Moonbase TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/@moonbaseai/sdk.svg?label=npm%20(stable))](https://npmjs.org/package/@moonbaseai/sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@moonbaseai/sdk)\n\nThis library provides convenient access to the Moonbase REST API from server-side TypeScript or JavaScript.\n\n\n\nThe full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Moonbase MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40moonbaseai%2Fmcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBtb29uYmFzZWFpL21jcCJdLCJlbnYiOnsiTU9PTkJBU0VfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40moonbaseai%2Fmcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40moonbaseai%2Fmcp%22%5D%2C%22env%22%3A%7B%22MOONBASE_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @moonbaseai/sdk\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst collection = await client.collections.retrieve('people');\n\nconsole.log(collection.id);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  apiKey: process.env['MOONBASE_API_KEY'], // This is the default and can be omitted\n});\n\nconst collection: Moonbase.Collection = await client.collections.retrieve('people');\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed in many different forms:\n- `File` (or an object with the same structure)\n- a `fetch` `Response` (or an object with the same structure)\n- an `fs.ReadStream`\n- the return value of our `toFile` helper\n\n```ts\nimport fs from 'fs';\nimport Moonbase, { toFile } from '@moonbaseai/sdk';\n\nconst client = new Moonbase();\n\n// If you have access to Node `fs` we recommend using `fs.createReadStream()`:\nawait client.inboxMessages.attachments.create('inbox_message_id', {\n  file: fs.createReadStream('/path/to/file'),\n});\n\n// Or if you have the web `File` API you can pass a `File` instance:\nawait client.inboxMessages.attachments.create('inbox_message_id', {\n  file: new File(['my bytes'], 'file'),\n});\n\n// You can also pass a `fetch` `Response`:\nawait client.inboxMessages.attachments.create('inbox_message_id', {\n  file: await fetch('https://somesite/file'),\n});\n\n// Finally, if none of the above are convenient, you can use our `toFile` helper:\nawait client.inboxMessages.attachments.create('inbox_message_id', {\n  file: await toFile(Buffer.from('my bytes'), 'file'),\n});\nawait client.inboxMessages.attachments.create('inbox_message_id', {\n  file: await toFile(new Uint8Array([0, 1, 2]), 'file'),\n});\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst collection = await client.collections.retrieve('people').catch(async (err) => {\n  if (err instanceof Moonbase.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Moonbase({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.collections.retrieve('people', {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Moonbase({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.collections.retrieve('people', {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the Moonbase API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllItemPointers(params) {\n  const allItemPointers = [];\n  // Automatically fetches more pages as needed.\n  for await (const itemPointer of client.collections.items.list('people', { limit: 5 })) {\n    allItemPointers.push(itemPointer);\n  }\n  return allItemPointers;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.collections.items.list('people', { limit: 5 });\nfor (const itemPointer of page.data) {\n  console.log(itemPointer);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Moonbase();\n\nconst response = await client.collections.retrieve('people').asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: collection, response: raw } = await client.collections\n  .retrieve('people')\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(collection.id);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `MOONBASE_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Moonbase from '@moonbaseai/sdk';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Moonbase({\n  logger: logger.child({ name: 'Moonbase' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.collections.retrieve({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Moonbase from '@moonbaseai/sdk';\nimport fetch from 'my-fetch';\n\nconst client = new Moonbase({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Moonbase from '@moonbaseai/sdk';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Moonbase({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Moonbase from '@moonbaseai/sdk';\n\nconst client = new Moonbase({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Moonbase from 'npm:@moonbaseai/sdk';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Moonbase({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/moonbaseai/moonbase-sdk-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\n> [!WARNING]\n> Web browser runtimes aren't supported. The SDK will throw an error if used in a browser environment.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
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
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
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
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
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
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
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
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
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

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
