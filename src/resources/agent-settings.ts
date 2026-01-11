// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class AgentSettings extends APIResource {
  retrieve(options?: RequestOptions): APIPromise<AgentSettingRetrieveResponse> {
    return this._client.get('/agent_settings', options);
  }
}

export interface AgentSettingRetrieveResponse {
  created_at: string;

  type: 'agent_settings';

  updated_at: string;

  deal_summary_model?: string;

  deal_summary_prompt?: string;

  meeting_prebrief_model?: string;

  meeting_prebrief_prompt?: string;

  meeting_web_search?: boolean;

  organization_info?: string;
}

export declare namespace AgentSettings {
  export { type AgentSettingRetrieveResponse as AgentSettingRetrieveResponse };
}
