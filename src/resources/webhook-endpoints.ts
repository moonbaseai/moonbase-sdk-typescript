// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class WebhookEndpoints extends APIResource {
  /**
   * Create a new endpoint.
   *
   * @example
   * ```ts
   * const endpoint = await client.webhookEndpoints.create({
   *   status: 'enabled',
   *   url: 'https://example.com/webhook',
   *   subscriptions: [
   *     { event_type: 'activity/item_created' },
   *     { event_type: 'activity/item_mentioned' },
   *   ],
   * });
   * ```
   */
  create(body: WebhookEndpointCreateParams, options?: RequestOptions): APIPromise<Endpoint> {
    return this._client.post('/webhook_endpoints', { body, ...options });
  }

  /**
   * Retrieves the details of an existing endpoint.
   *
   * @example
   * ```ts
   * const endpoint = await client.webhookEndpoints.retrieve(
   *   'id',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Endpoint> {
    return this._client.get(path`/webhook_endpoints/${id}`, options);
  }

  /**
   * Updates an endpoint.
   *
   * @example
   * ```ts
   * const endpoint = await client.webhookEndpoints.update(
   *   'id',
   *   {
   *     status: 'disabled',
   *     url: 'https://updated.example.com',
   *   },
   * );
   * ```
   */
  update(id: string, body: WebhookEndpointUpdateParams, options?: RequestOptions): APIPromise<Endpoint> {
    return this._client.patch(path`/webhook_endpoints/${id}`, { body, ...options });
  }

  /**
   * Returns a list of endpoints.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const endpoint of client.webhookEndpoints.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: WebhookEndpointListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<EndpointsCursorPage, Endpoint> {
    return this._client.getAPIList('/webhook_endpoints', CursorPage<Endpoint>, { query, ...options });
  }

  /**
   * Permanently deletes an endpoint.
   *
   * @example
   * ```ts
   * await client.webhookEndpoints.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/webhook_endpoints/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type EndpointsCursorPage = CursorPage<Endpoint>;

/**
 * A Webhook Endpoint is an HTTP endpoint that receives webhooks. You can configure
 * which events are sent to each endpoint by creating `WebhookSubscription`
 * objects.
 */
export interface Endpoint {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * Indicates whether the endpoint is enabled.
   */
  status: 'disabled' | 'enabled';

  /**
   * An array of `WebhookSubscription` objects representing the events this endpoint
   * will receive.
   */
  subscriptions: Array<Subscription>;

  /**
   * String representing the object’s type. Always `webhook_endpoint` for this
   * object.
   */
  type: 'webhook_endpoint';

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * The HTTPS URL where webhook events will be sent.
   */
  url: string;

  /**
   * The signing secret used to verify webhook authenticity. This value is only shown
   * when creating the endpoint and starts with `whsec_`.
   */
  secret?: string;
}

/**
 * A Webhook Subscription defines which event type should be sent to a specific
 * webhook endpoint.
 */
export interface Subscription {
  /**
   * The type of event that will trigger notifications to the endpoint (e.g.,
   * `activity/item_created`).
   */
  event_type:
    | 'activity/call_occurred'
    | 'activity/form_submitted'
    | 'activity/inbox_message_sent'
    | 'activity/item_created'
    | 'activity/item_mentioned'
    | 'activity/item_merged'
    | 'activity/meeting_held'
    | 'activity/meeting_scheduled'
    | 'activity/note_created'
    | 'activity/program_message_bounced'
    | 'activity/program_message_clicked'
    | 'activity/program_message_complained'
    | 'activity/program_message_failed'
    | 'activity/program_message_opened'
    | 'activity/program_message_sent'
    | 'activity/program_message_shielded'
    | 'activity/program_message_unsubscribed';

  /**
   * String representing the object’s type. Always `webhook_subscription` for this
   * object.
   */
  type: 'webhook_subscription';
}

export interface WebhookEndpointCreateParams {
  /**
   * Indicates whether the endpoint is enabled.
   */
  status: 'disabled' | 'enabled';

  /**
   * The HTTPS URL where webhook events will be sent.
   */
  url: string;

  /**
   * An array of event types that this endpoint should receive notifications for.
   */
  subscriptions?: Array<WebhookEndpointCreateParams.Subscription>;
}

export namespace WebhookEndpointCreateParams {
  /**
   * Parameters for creating a webhook subscription.
   */
  export interface Subscription {
    /**
     * The type of event that will trigger notifications to the endpoint (e.g.,
     * `activity/item_created`).
     */
    event_type:
      | 'activity/call_occurred'
      | 'activity/form_submitted'
      | 'activity/inbox_message_sent'
      | 'activity/item_created'
      | 'activity/item_mentioned'
      | 'activity/item_merged'
      | 'activity/meeting_held'
      | 'activity/meeting_scheduled'
      | 'activity/note_created'
      | 'activity/program_message_bounced'
      | 'activity/program_message_clicked'
      | 'activity/program_message_complained'
      | 'activity/program_message_failed'
      | 'activity/program_message_opened'
      | 'activity/program_message_sent'
      | 'activity/program_message_shielded'
      | 'activity/program_message_unsubscribed';
  }
}

export interface WebhookEndpointUpdateParams {
  /**
   * Indicates whether the endpoint is enabled.
   */
  status?: 'disabled' | 'enabled';

  /**
   * An array of event types that this endpoint should receive notifications for.
   */
  subscriptions?: Array<WebhookEndpointUpdateParams.Subscription>;

  /**
   * The HTTPS URL where webhook events will be sent.
   */
  url?: string;
}

export namespace WebhookEndpointUpdateParams {
  /**
   * Parameters for updating a webhook subscription.
   */
  export interface Subscription {
    /**
     * The type of event that will trigger notifications to the endpoint (e.g.,
     * `activity/item_created`).
     */
    event_type:
      | 'activity/call_occurred'
      | 'activity/form_submitted'
      | 'activity/inbox_message_sent'
      | 'activity/item_created'
      | 'activity/item_mentioned'
      | 'activity/item_merged'
      | 'activity/meeting_held'
      | 'activity/meeting_scheduled'
      | 'activity/note_created'
      | 'activity/program_message_bounced'
      | 'activity/program_message_clicked'
      | 'activity/program_message_complained'
      | 'activity/program_message_failed'
      | 'activity/program_message_opened'
      | 'activity/program_message_sent'
      | 'activity/program_message_shielded'
      | 'activity/program_message_unsubscribed';

    /**
     * Unique identifier for the object.
     */
    id?: string;
  }
}

export interface WebhookEndpointListParams extends CursorPageParams {
  /**
   * When specified, returns results starting immediately before the item identified
   * by this cursor. Use the cursor value from the response's metadata to fetch the
   * previous page of results.
   */
  before?: string;

  /**
   * Maximum number of items to return per page. Must be between 1 and 100. Defaults
   * to 20 if not specified.
   */
  limit?: number;
}

export declare namespace WebhookEndpoints {
  export {
    type Endpoint as Endpoint,
    type Subscription as Subscription,
    type EndpointsCursorPage as EndpointsCursorPage,
    type WebhookEndpointCreateParams as WebhookEndpointCreateParams,
    type WebhookEndpointUpdateParams as WebhookEndpointUpdateParams,
    type WebhookEndpointListParams as WebhookEndpointListParams,
  };
}
