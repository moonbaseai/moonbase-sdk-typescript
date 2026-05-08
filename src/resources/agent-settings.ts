// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class AgentSettings extends APIResource {
  /**
   * @example
   * ```ts
   * const agentSetting = await client.agentSettings.retrieve();
   * ```
   */
  retrieve(options?: RequestOptions): APIPromise<AgentSettingRetrieveResponse> {
    return this._client.get('/agent_settings', options);
  }

  /**
   * @example
   * ```ts
   * const agentSetting = await client.agentSettings.update({
   *   deal_summary_prompt:
   *     'Instructions for the agent to help generate the deal summary',
   *   meeting_prebrief_prompt:
   *     'Instructions for the agent to help generate the meeting prebrief note',
   *   meeting_summary_prompt:
   *     'Instructions for the agent to help generate the meeting summary note',
   *   organization_info:
   *     'Information about the organization using Moonbase',
   * });
   * ```
   */
  update(body: AgentSettingUpdateParams, options?: RequestOptions): APIPromise<AgentSettingUpdateResponse> {
    return this._client.patch('/agent_settings', { body, ...options });
  }
}

export interface AgentSettingRetrieveResponse {
  created_at: string;

  type: 'agent_settings';

  updated_at: string;

  deal_summary_prompt?: string;

  meeting_prebrief_prompt?: string;

  meeting_summary_prompt?: string;

  meeting_web_search?: boolean;

  organization_info?: string;
}

export interface AgentSettingUpdateResponse {
  created_at: string;

  type: 'agent_settings';

  updated_at: string;

  deal_summary_prompt?: string;

  meeting_prebrief_prompt?: string;

  meeting_summary_prompt?: string;

  meeting_web_search?: boolean;

  organization_info?: string;
}

export interface AgentSettingUpdateParams {
  deal_summary_prompt?: string;

  meeting_prebrief_prompt?: string;

  meeting_summary_prompt?: string;

  meeting_web_search?: boolean;

  organization_info?: string;
}

export declare namespace AgentSettings {
  export {
    type AgentSettingRetrieveResponse as AgentSettingRetrieveResponse,
    type AgentSettingUpdateResponse as AgentSettingUpdateResponse,
    type AgentSettingUpdateParams as AgentSettingUpdateParams,
  };
}
