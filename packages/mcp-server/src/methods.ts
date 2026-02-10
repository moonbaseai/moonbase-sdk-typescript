import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.collections.retrieve',
    fullyQualifiedName: 'collections.retrieve',
    httpMethod: 'get',
    httpPath: '/collections/{id}',
  },
  {
    clientCallName: 'client.collections.list',
    fullyQualifiedName: 'collections.list',
    httpMethod: 'get',
    httpPath: '/collections',
  },
  {
    clientCallName: 'client.collections.fields.retrieve',
    fullyQualifiedName: 'collections.fields.retrieve',
    httpMethod: 'get',
    httpPath: '/collections/{collection_id}/fields/{id}',
  },
  {
    clientCallName: 'client.collections.items.create',
    fullyQualifiedName: 'collections.items.create',
    httpMethod: 'post',
    httpPath: '/collections/{collection_id}/items',
  },
  {
    clientCallName: 'client.collections.items.retrieve',
    fullyQualifiedName: 'collections.items.retrieve',
    httpMethod: 'get',
    httpPath: '/collections/{collection_id}/items/{id}',
  },
  {
    clientCallName: 'client.collections.items.update',
    fullyQualifiedName: 'collections.items.update',
    httpMethod: 'patch',
    httpPath: '/collections/{collection_id}/items/{id}',
  },
  {
    clientCallName: 'client.collections.items.list',
    fullyQualifiedName: 'collections.items.list',
    httpMethod: 'get',
    httpPath: '/collections/{collection_id}/items',
  },
  {
    clientCallName: 'client.collections.items.delete',
    fullyQualifiedName: 'collections.items.delete',
    httpMethod: 'delete',
    httpPath: '/collections/{collection_id}/items/{id}',
  },
  {
    clientCallName: 'client.collections.items.upsert',
    fullyQualifiedName: 'collections.items.upsert',
    httpMethod: 'post',
    httpPath: '/collections/{collection_id}/items/upsert',
  },
  {
    clientCallName: 'client.items.search',
    fullyQualifiedName: 'items.search',
    httpMethod: 'get',
    httpPath: '/items/search',
  },
  {
    clientCallName: 'client.views.retrieve',
    fullyQualifiedName: 'views.retrieve',
    httpMethod: 'get',
    httpPath: '/views/{id}',
  },
  {
    clientCallName: 'client.views.items.list',
    fullyQualifiedName: 'views.items.list',
    httpMethod: 'get',
    httpPath: '/views/{id}/items',
  },
  {
    clientCallName: 'client.inboxes.retrieve',
    fullyQualifiedName: 'inboxes.retrieve',
    httpMethod: 'get',
    httpPath: '/inboxes/{id}',
  },
  {
    clientCallName: 'client.inboxes.list',
    fullyQualifiedName: 'inboxes.list',
    httpMethod: 'get',
    httpPath: '/inboxes',
  },
  {
    clientCallName: 'client.inboxConversations.retrieve',
    fullyQualifiedName: 'inboxConversations.retrieve',
    httpMethod: 'get',
    httpPath: '/inbox_conversations/{id}',
  },
  {
    clientCallName: 'client.inboxConversations.list',
    fullyQualifiedName: 'inboxConversations.list',
    httpMethod: 'get',
    httpPath: '/inbox_conversations',
  },
  {
    clientCallName: 'client.inboxMessages.create',
    fullyQualifiedName: 'inboxMessages.create',
    httpMethod: 'post',
    httpPath: '/inbox_messages',
  },
  {
    clientCallName: 'client.inboxMessages.retrieve',
    fullyQualifiedName: 'inboxMessages.retrieve',
    httpMethod: 'get',
    httpPath: '/inbox_messages/{id}',
  },
  {
    clientCallName: 'client.inboxMessages.update',
    fullyQualifiedName: 'inboxMessages.update',
    httpMethod: 'patch',
    httpPath: '/inbox_messages/{id}',
  },
  {
    clientCallName: 'client.inboxMessages.list',
    fullyQualifiedName: 'inboxMessages.list',
    httpMethod: 'get',
    httpPath: '/inbox_messages',
  },
  {
    clientCallName: 'client.inboxMessages.delete',
    fullyQualifiedName: 'inboxMessages.delete',
    httpMethod: 'delete',
    httpPath: '/inbox_messages/{id}',
  },
  {
    clientCallName: 'client.tagsets.retrieve',
    fullyQualifiedName: 'tagsets.retrieve',
    httpMethod: 'get',
    httpPath: '/tagsets/{id}',
  },
  {
    clientCallName: 'client.tagsets.list',
    fullyQualifiedName: 'tagsets.list',
    httpMethod: 'get',
    httpPath: '/tagsets',
  },
  {
    clientCallName: 'client.programs.retrieve',
    fullyQualifiedName: 'programs.retrieve',
    httpMethod: 'get',
    httpPath: '/programs/{id}',
  },
  {
    clientCallName: 'client.programs.list',
    fullyQualifiedName: 'programs.list',
    httpMethod: 'get',
    httpPath: '/programs',
  },
  {
    clientCallName: 'client.programTemplates.retrieve',
    fullyQualifiedName: 'programTemplates.retrieve',
    httpMethod: 'get',
    httpPath: '/program_templates/{id}',
  },
  {
    clientCallName: 'client.programTemplates.list',
    fullyQualifiedName: 'programTemplates.list',
    httpMethod: 'get',
    httpPath: '/program_templates',
  },
  {
    clientCallName: 'client.programMessages.send',
    fullyQualifiedName: 'programMessages.send',
    httpMethod: 'post',
    httpPath: '/program_messages',
  },
  {
    clientCallName: 'client.forms.retrieve',
    fullyQualifiedName: 'forms.retrieve',
    httpMethod: 'get',
    httpPath: '/forms/{id}',
  },
  {
    clientCallName: 'client.forms.list',
    fullyQualifiedName: 'forms.list',
    httpMethod: 'get',
    httpPath: '/forms',
  },
  {
    clientCallName: 'client.activities.retrieve',
    fullyQualifiedName: 'activities.retrieve',
    httpMethod: 'get',
    httpPath: '/activities/{id}',
  },
  {
    clientCallName: 'client.activities.list',
    fullyQualifiedName: 'activities.list',
    httpMethod: 'get',
    httpPath: '/activities',
  },
  {
    clientCallName: 'client.calls.create',
    fullyQualifiedName: 'calls.create',
    httpMethod: 'post',
    httpPath: '/calls',
  },
  {
    clientCallName: 'client.calls.upsert',
    fullyQualifiedName: 'calls.upsert',
    httpMethod: 'post',
    httpPath: '/calls/upsert',
  },
  {
    clientCallName: 'client.files.retrieve',
    fullyQualifiedName: 'files.retrieve',
    httpMethod: 'get',
    httpPath: '/files/{id}',
  },
  {
    clientCallName: 'client.files.list',
    fullyQualifiedName: 'files.list',
    httpMethod: 'get',
    httpPath: '/files',
  },
  {
    clientCallName: 'client.files.upload',
    fullyQualifiedName: 'files.upload',
    httpMethod: 'post',
    httpPath: '/files',
  },
  {
    clientCallName: 'client.meetings.retrieve',
    fullyQualifiedName: 'meetings.retrieve',
    httpMethod: 'get',
    httpPath: '/meetings/{id}',
  },
  {
    clientCallName: 'client.meetings.update',
    fullyQualifiedName: 'meetings.update',
    httpMethod: 'patch',
    httpPath: '/meetings/{id}',
  },
  {
    clientCallName: 'client.meetings.list',
    fullyQualifiedName: 'meetings.list',
    httpMethod: 'get',
    httpPath: '/meetings',
  },
  {
    clientCallName: 'client.notes.create',
    fullyQualifiedName: 'notes.create',
    httpMethod: 'post',
    httpPath: '/notes',
  },
  {
    clientCallName: 'client.notes.retrieve',
    fullyQualifiedName: 'notes.retrieve',
    httpMethod: 'get',
    httpPath: '/notes/{id}',
  },
  {
    clientCallName: 'client.notes.update',
    fullyQualifiedName: 'notes.update',
    httpMethod: 'patch',
    httpPath: '/notes/{id}',
  },
  {
    clientCallName: 'client.notes.list',
    fullyQualifiedName: 'notes.list',
    httpMethod: 'get',
    httpPath: '/notes',
  },
  {
    clientCallName: 'client.webhookEndpoints.create',
    fullyQualifiedName: 'webhookEndpoints.create',
    httpMethod: 'post',
    httpPath: '/webhook_endpoints',
  },
  {
    clientCallName: 'client.webhookEndpoints.retrieve',
    fullyQualifiedName: 'webhookEndpoints.retrieve',
    httpMethod: 'get',
    httpPath: '/webhook_endpoints/{id}',
  },
  {
    clientCallName: 'client.webhookEndpoints.update',
    fullyQualifiedName: 'webhookEndpoints.update',
    httpMethod: 'patch',
    httpPath: '/webhook_endpoints/{id}',
  },
  {
    clientCallName: 'client.webhookEndpoints.list',
    fullyQualifiedName: 'webhookEndpoints.list',
    httpMethod: 'get',
    httpPath: '/webhook_endpoints',
  },
  {
    clientCallName: 'client.webhookEndpoints.delete',
    fullyQualifiedName: 'webhookEndpoints.delete',
    httpMethod: 'delete',
    httpPath: '/webhook_endpoints/{id}',
  },
  {
    clientCallName: 'client.agentSettings.retrieve',
    fullyQualifiedName: 'agentSettings.retrieve',
    httpMethod: 'get',
    httpPath: '/agent_settings',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
