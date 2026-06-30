// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { RequestInit, RequestInfo, BodyInit } from './internal/builtin-types';
import type { HTTPMethod, PromiseOrValue, MergedRequestInit, FinalizedRequestInit } from './internal/types';
import { uuid4 } from './internal/utils/uuid';
import { validatePositiveInteger, isAbsoluteURL, safeJSON } from './internal/utils/values';
import { sleep } from './internal/utils/sleep';
export type { Logger, LogLevel } from './internal/utils/log';
import { castToError, isAbortError } from './internal/errors';
import type { APIResponseProps } from './internal/parse';
import { getPlatformHeaders } from './internal/detect-platform';
import * as Shims from './internal/shims';
import * as Opts from './internal/request-options';
import { stringifyQuery } from './internal/utils/query';
import { VERSION } from './version';
import * as Errors from './core/error';
import * as Pagination from './core/pagination';
import { AbstractPage, type CursorPageParams, CursorPageResponse } from './core/pagination';
import * as Uploads from './core/uploads';
import * as API from './resources/index';
import * as TopLevelAPI from './resources/top-level';
import { SearchParams, SearchResponse } from './resources/top-level';
import { APIPromise } from './core/api-promise';
import {
  Activities,
  ActivitiesCursorPage,
  Activity,
  ActivityCallOccurred,
  ActivityFormSubmitted,
  ActivityInboxMessageSent,
  ActivityItemCreated,
  ActivityItemMentioned,
  ActivityItemMerged,
  ActivityListParams,
  ActivityMeetingHeld,
  ActivityMeetingScheduled,
  ActivityNoteCreated,
  ActivityProgramMessageBounced,
  ActivityProgramMessageClicked,
  ActivityProgramMessageComplained,
  ActivityProgramMessageFailed,
  ActivityProgramMessageOpened,
  ActivityProgramMessageSent,
  ActivityProgramMessageShielded,
  ActivityProgramMessageUnsubscribed,
  Constituent,
  ConstituentEntityPointer,
} from './resources/activities';
import {
  AgentSettingRetrieveResponse,
  AgentSettingUpdateParams,
  AgentSettingUpdateResponse,
  AgentSettings,
} from './resources/agent-settings';
import {
  Call,
  CallCreateParams,
  CallListParams,
  CallParticipant,
  CallPointer,
  CallRetrieveParams,
  CallTranscript,
  CallTranscriptCue,
  CallTranscriptSpeaker,
  CallUpsertParams,
  Calls,
  CallsCursorPage,
} from './resources/calls';
import {
  FileListParams,
  FilePointer,
  FileUploadParams,
  Files,
  MoonbaseFile,
  MoonbaseFilesCursorPage,
} from './resources/files';
import {
  Form,
  FormCreateParams,
  FormListParams,
  FormUpdateParams,
  Forms,
  FormsCursorPage,
} from './resources/forms';
import {
  Funnel,
  FunnelCreateParams,
  FunnelListParams,
  FunnelStep,
  FunnelStepPointer,
  FunnelUpdateParams,
  Funnels,
  FunnelsCursorPage,
} from './resources/funnels';
import {
  InboxConversation,
  InboxConversationListParams,
  InboxConversationListResponse,
  InboxConversationListResponsesCursorPage,
  InboxConversationRetrieveParams,
  InboxConversations,
} from './resources/inbox-conversations';
import { Inbox, InboxListParams, Inboxes, InboxesCursorPage } from './resources/inboxes';
import {
  Attendee,
  Meeting,
  MeetingListParams,
  MeetingPointer,
  MeetingPointersCursorPage,
  MeetingRetrieveParams,
  MeetingTranscript,
  MeetingTranscriptCue,
  MeetingTranscriptSpeaker,
  MeetingUpdateParams,
  Meetings,
  Organizer,
} from './resources/meetings';
import {
  Note,
  NoteAssociationParamPointer,
  NoteAssociationPointer,
  NoteCreateParams,
  NoteListParams,
  NotePointer,
  NoteUpdateParams,
  Notes,
  NotesCursorPage,
} from './resources/notes';
import {
  ProgramMessage,
  ProgramMessagePointer,
  ProgramMessageSendParams,
  ProgramMessages,
} from './resources/program-messages';
import {
  ProgramTemplate,
  ProgramTemplateListParams,
  ProgramTemplatePointer,
  ProgramTemplateRetrieveParams,
  ProgramTemplates,
  ProgramTemplatesCursorPage,
} from './resources/program-templates';
import {
  Program,
  ProgramActivityMetrics,
  ProgramListParams,
  ProgramPointer,
  ProgramRetrieveParams,
  Programs,
  ProgramsCursorPage,
} from './resources/programs';
import {
  Tagset,
  TagsetCreateParams,
  TagsetListParams,
  TagsetPointer,
  TagsetUpdateParams,
  Tagsets,
  TagsetsCursorPage,
} from './resources/tagsets';
import {
  Unsubscribe,
  UnsubscribeCreateParams,
  UnsubscribeListParams,
  UnsubscribePointer,
  Unsubscribes,
  UnsubscribesCursorPage,
} from './resources/unsubscribes';
import {
  Endpoint,
  EndpointsCursorPage,
  Subscription,
  WebhookEndpointCreateParams,
  WebhookEndpointListParams,
  WebhookEndpointUpdateParams,
  WebhookEndpoints,
} from './resources/webhook-endpoints';
import {
  BooleanField,
  BooleanValue,
  ChoiceField,
  ChoiceFieldOption,
  ChoiceFieldOptionPointer,
  ChoiceValue,
  ChoiceValueParam,
  Collection,
  CollectionCreateParams,
  CollectionListParams,
  CollectionListResponse,
  CollectionListResponsesCursorPage,
  CollectionPointer,
  CollectionUpdateParams,
  Collections,
  CurrentDate,
  CurrentDatetime,
  CurrentMember,
  DateField,
  DateFieldDefaultValueParam,
  DateValue,
  DatetimeField,
  DatetimeFieldDefaultValueParam,
  DatetimeValue,
  DomainField,
  DomainValue,
  EmailField,
  EmailValue,
  Field,
  FieldDefaultValue,
  FieldPointer,
  FieldValue,
  FieldValueParam,
  FloatField,
  FloatValue,
  FunnelPointerParam,
  FunnelStepValue,
  FunnelStepValueParam,
  GeoField,
  GeoValue,
  IdentifierField,
  IdentifierValue,
  IntegerField,
  IntegerValue,
  Item,
  ItemPointer,
  ItemPointerParam,
  ItemsFilter,
  ItemsFilterAndGroup,
  ItemsFilterNotGroup,
  ItemsFilterOrGroup,
  ItemsFilterValueExists,
  ItemsFilterValueMatches,
  MonetaryField,
  MonetaryValue,
  MultiLineTextField,
  MultiLineTextValue,
  PercentageField,
  PercentageValue,
  RelationField,
  RelationFieldDefaultValueParam,
  RelationValue,
  RelationValueParam,
  SingleLineTextField,
  SingleLineTextValue,
  SocialLinkedInField,
  SocialLinkedInValue,
  SocialLinkedInValueParam,
  SocialProfileLinkedInParam,
  SocialProfileXParam,
  SocialXField,
  SocialXValue,
  SocialXValueParam,
  StageField,
  StageFieldCreateParams,
  StageFieldUpdateParams,
  TelephoneNumber,
  TelephoneNumberField,
  URLField,
  URLValue,
  Value,
  ValueParam,
} from './resources/collections/collections';
import {
  EmailMessage,
  EmailMessageAddress,
  EmailMessageAddressParams,
  InboxMessageCreateParams,
  InboxMessageCreateResponse,
  InboxMessageListParams,
  InboxMessageRetrieveParams,
  InboxMessageRetrieveResponse,
  InboxMessageUpdateParams,
  InboxMessageUpdateResponse,
  InboxMessages,
  MessageAttachment,
  MessagePointer,
  MessagePointersCursorPage,
  SlackMessage,
  SlackMessageAddress,
  SlackMessageAddressParams,
} from './resources/inbox-messages/inbox-messages';
import {
  View,
  ViewAggregate,
  ViewAggregateFieldStatistic,
  ViewAggregateItemCount,
  ViewCreateParams,
  ViewField,
  ViewListParams,
  ViewListResponse,
  ViewListResponsesCursorPage,
  ViewRelationValueFilter,
  ViewUpdateParams,
  Views,
} from './resources/views/views';
import { type Fetch } from './internal/builtin-types';
import { isRunningInBrowser } from './internal/detect-platform';
import { HeadersLike, NullableHeaders, buildHeaders } from './internal/headers';
import { FinalRequestOptions, RequestOptions } from './internal/request-options';
import { readEnv } from './internal/utils/env';
import {
  type LogLevel,
  type Logger,
  formatRequestDetails,
  loggerFor,
  parseLogLevel,
} from './internal/utils/log';
import { isEmptyObj } from './internal/utils/values';

export interface ClientOptions {
  /**
   * Your Moonbase API key.
   */
  apiKey?: string | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['MOONBASE_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;
  /**
   * Additional `RequestInit` options to be passed to `fetch` calls.
   * Properties will be overridden by per-request `fetchOptions`.
   */
  fetchOptions?: MergedRequestInit | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we expect that `fetch` is defined globally.
   */
  fetch?: Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `null` in request options.
   */
  defaultHeaders?: HeadersLike | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Record<string, string | undefined> | undefined;

  /**
   * Set the log level.
   *
   * Defaults to process.env['MOONBASE_LOG'] or 'warn' if it isn't set.
   */
  logLevel?: LogLevel | undefined;

  /**
   * Set the logger.
   *
   * Defaults to globalThis.console.
   */
  logger?: Logger | undefined;
}

/**
 * API Client for interfacing with the Moonbase API.
 */
export class Moonbase {
  apiKey: string;

  baseURL: string;
  maxRetries: number;
  timeout: number;
  logger: Logger;
  logLevel: LogLevel | undefined;
  fetchOptions: MergedRequestInit | undefined;

  private fetch: Fetch;
  #encoder: Opts.RequestEncoder;
  protected idempotencyHeader?: string;
  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Moonbase API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['MOONBASE_API_KEY'] ?? undefined]
   * @param {string} [opts.baseURL=process.env['MOONBASE_BASE_URL'] ?? https://api.moonbase.ai/v0] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
   * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = readEnv('MOONBASE_BASE_URL'),
    apiKey = readEnv('MOONBASE_API_KEY'),
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.MoonbaseError(
        "The MOONBASE_API_KEY environment variable is missing or empty; either provide it, or instantiate the Moonbase client with an apiKey option, like new Moonbase({ apiKey: 'My API Key' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `https://api.moonbase.ai/v0`,
    };

    if (isRunningInBrowser()) {
      throw new Errors.MoonbaseError(
        "It looks like you're running in a browser-like environment, which is disabled to protect your secret API credentials from attackers. If you have a strong business need for client-side use of this API, please open a GitHub issue with your use-case and security mitigations.",
      );
    }

    this.baseURL = options.baseURL!;
    this.timeout = options.timeout ?? Moonbase.DEFAULT_TIMEOUT /* 1 minute */;
    this.logger = options.logger ?? console;
    const defaultLogLevel = 'warn';
    // Set default logLevel early so that we can log a warning in parseLogLevel.
    this.logLevel = defaultLogLevel;
    this.logLevel =
      parseLogLevel(options.logLevel, 'ClientOptions.logLevel', this) ??
      parseLogLevel(readEnv('MOONBASE_LOG'), "process.env['MOONBASE_LOG']", this) ??
      defaultLogLevel;
    this.fetchOptions = options.fetchOptions;
    this.maxRetries = options.maxRetries ?? 2;
    this.fetch = options.fetch ?? Shims.getDefaultFetch();
    this.#encoder = Opts.FallbackEncoder;

    const customHeadersEnv = readEnv('MOONBASE_CUSTOM_HEADERS');
    if (customHeadersEnv) {
      const parsed: Record<string, string> = {};
      for (const line of customHeadersEnv.split('\n')) {
        const colon = line.indexOf(':');
        if (colon >= 0) {
          parsed[line.substring(0, colon).trim()] = line.substring(colon + 1).trim();
        }
      }
      options.defaultHeaders = { ...parsed, ...options.defaultHeaders };
    }

    this._options = options;

    this.apiKey = apiKey;
  }

  /**
   * Create a new client instance re-using the same options given to the current client with optional overriding.
   */
  withOptions(options: Partial<ClientOptions>): this {
    const client = new (this.constructor as any as new (props: ClientOptions) => typeof this)({
      ...this._options,
      baseURL: this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      apiKey: this.apiKey,
      ...options,
    });
    return client;
  }

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== 'https://api.moonbase.ai/v0';
  }

  /**
   * Returns items and files that match the search query.
   */
  search(params: TopLevelAPI.SearchParams, options?: RequestOptions): APIPromise<TopLevelAPI.SearchResponse> {
    const { query } = params;
    return this.post('/search', { query: { query }, ...options });
  }

  protected defaultQuery(): Record<string, string | undefined> | undefined {
    return this._options.defaultQuery;
  }

  protected validateHeaders({ values, nulls }: NullableHeaders) {
    return;
  }

  protected async authHeaders(opts: FinalRequestOptions): Promise<NullableHeaders | undefined> {
    return buildHeaders([{ Authorization: `Bearer ${this.apiKey}` }]);
  }

  protected stringifyQuery(query: object | Record<string, unknown>): string {
    return stringifyQuery(query);
  }

  private getUserAgent(): string {
    return `${this.constructor.name}/JS ${VERSION}`;
  }

  protected defaultIdempotencyKey(): string {
    return `stainless-node-retry-${uuid4()}`;
  }

  protected makeStatusError(
    status: number,
    error: Object,
    message: string | undefined,
    headers: Headers,
  ): Errors.APIError {
    return Errors.APIError.generate(status, error, message, headers);
  }

  buildURL(
    path: string,
    query: Record<string, unknown> | null | undefined,
    defaultBaseURL?: string | undefined,
  ): string {
    const baseURL = (!this.#baseURLOverridden() && defaultBaseURL) || this.baseURL;
    const url =
      isAbsoluteURL(path) ?
        new URL(path)
      : new URL(baseURL + (baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));

    const defaultQuery = this.defaultQuery();
    const pathQuery = Object.fromEntries(url.searchParams);
    if (!isEmptyObj(defaultQuery) || !isEmptyObj(pathQuery)) {
      query = { ...pathQuery, ...defaultQuery, ...query };
    }

    if (typeof query === 'object' && query && !Array.isArray(query)) {
      url.search = this.stringifyQuery(query);
    }

    return url.toString();
  }

  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  protected async prepareOptions(options: FinalRequestOptions): Promise<void> {}

  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  protected async prepareRequest(
    request: RequestInit,
    { url, options }: { url: string; options: FinalRequestOptions },
  ): Promise<void> {}

  get<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('get', path, opts);
  }

  post<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('post', path, opts);
  }

  patch<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('patch', path, opts);
  }

  put<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('put', path, opts);
  }

  delete<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('delete', path, opts);
  }

  private methodRequest<Rsp>(
    method: HTTPMethod,
    path: string,
    opts?: PromiseOrValue<RequestOptions>,
  ): APIPromise<Rsp> {
    return this.request(
      Promise.resolve(opts).then((opts) => {
        return { method, path, ...opts };
      }),
    );
  }

  request<Rsp>(
    options: PromiseOrValue<FinalRequestOptions>,
    remainingRetries: number | null = null,
  ): APIPromise<Rsp> {
    return new APIPromise(this, this.makeRequest(options, remainingRetries, undefined));
  }

  private async makeRequest(
    optionsInput: PromiseOrValue<FinalRequestOptions>,
    retriesRemaining: number | null,
    retryOfRequestLogID: string | undefined,
  ): Promise<APIResponseProps> {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) {
      retriesRemaining = maxRetries;
    }

    await this.prepareOptions(options);

    const { req, url, timeout } = await this.buildRequest(options, {
      retryCount: maxRetries - retriesRemaining,
    });

    await this.prepareRequest(req, { url, options });

    /** Not an API request ID, just for correlating local log entries. */
    const requestLogID = 'log_' + ((Math.random() * (1 << 24)) | 0).toString(16).padStart(6, '0');
    const retryLogStr = retryOfRequestLogID === undefined ? '' : `, retryOf: ${retryOfRequestLogID}`;
    const startTime = Date.now();

    loggerFor(this).debug(
      `[${requestLogID}] sending request`,
      formatRequestDetails({
        retryOfRequestLogID,
        method: options.method,
        url,
        options,
        headers: req.headers,
      }),
    );

    if (options.signal?.aborted) {
      throw new Errors.APIUserAbortError();
    }

    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
    const headersTime = Date.now();

    if (response instanceof globalThis.Error) {
      const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
      if (options.signal?.aborted) {
        throw new Errors.APIUserAbortError();
      }
      // detect native connection timeout errors
      // deno throws "TypeError: error sending request for url (https://example/): client error (Connect): tcp connect error: Operation timed out (os error 60): Operation timed out (os error 60)"
      // undici throws "TypeError: fetch failed" with cause "ConnectTimeoutError: Connect Timeout Error (attempted address: example:443, timeout: 1ms)"
      // others do not provide enough information to distinguish timeouts from other connection errors
      const isTimeout =
        isAbortError(response) ||
        /timed? ?out/i.test(String(response) + ('cause' in response ? String(response.cause) : ''));
      if (retriesRemaining) {
        loggerFor(this).info(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - ${retryMessage}`,
        );
        loggerFor(this).debug(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url,
            durationMs: headersTime - startTime,
            message: response.message,
          }),
        );
        return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
      }
      loggerFor(this).info(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - error; no more retries left`,
      );
      loggerFor(this).debug(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (error; no more retries left)`,
        formatRequestDetails({
          retryOfRequestLogID,
          url,
          durationMs: headersTime - startTime,
          message: response.message,
        }),
      );
      if (isTimeout) {
        throw new Errors.APIConnectionTimeoutError();
      }
      throw new Errors.APIConnectionError({ cause: response });
    }

    const responseInfo = `[${requestLogID}${retryLogStr}] ${req.method} ${url} ${
      response.ok ? 'succeeded' : 'failed'
    } with status ${response.status} in ${headersTime - startTime}ms`;

    if (!response.ok) {
      const shouldRetry = await this.shouldRetry(response);
      if (retriesRemaining && shouldRetry) {
        const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;

        // We don't need the body of this response.
        await Shims.CancelReadableStream(response.body);
        loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
        loggerFor(this).debug(
          `[${requestLogID}] response error (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url: response.url,
            status: response.status,
            headers: response.headers,
            durationMs: headersTime - startTime,
          }),
        );
        return this.retryRequest(
          options,
          retriesRemaining,
          retryOfRequestLogID ?? requestLogID,
          response.headers,
        );
      }

      const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;

      loggerFor(this).info(`${responseInfo} - ${retryMessage}`);

      const errText = await response.text().catch((err: any) => castToError(err).message);
      const errJSON = safeJSON(errText) as any;
      const errMessage = errJSON ? undefined : errText;

      loggerFor(this).debug(
        `[${requestLogID}] response error (${retryMessage})`,
        formatRequestDetails({
          retryOfRequestLogID,
          url: response.url,
          status: response.status,
          headers: response.headers,
          message: errMessage,
          durationMs: Date.now() - startTime,
        }),
      );

      const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
      throw err;
    }

    loggerFor(this).info(responseInfo);
    loggerFor(this).debug(
      `[${requestLogID}] response start`,
      formatRequestDetails({
        retryOfRequestLogID,
        url: response.url,
        status: response.status,
        headers: response.headers,
        durationMs: headersTime - startTime,
      }),
    );

    return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
  }

  getAPIList<Item, PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>>(
    path: string,
    Page: new (...args: any[]) => PageClass,
    opts?: PromiseOrValue<RequestOptions>,
  ): Pagination.PagePromise<PageClass, Item> {
    return this.requestAPIList(
      Page,
      opts && 'then' in opts ?
        opts.then((opts) => ({ method: 'get', path, ...opts }))
      : { method: 'get', path, ...opts },
    );
  }

  requestAPIList<
    Item = unknown,
    PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>,
  >(
    Page: new (...args: ConstructorParameters<typeof Pagination.AbstractPage>) => PageClass,
    options: PromiseOrValue<FinalRequestOptions>,
  ): Pagination.PagePromise<PageClass, Item> {
    const request = this.makeRequest(options, null, undefined);
    return new Pagination.PagePromise<PageClass, Item>(this as any as Moonbase, request, Page);
  }

  async fetchWithTimeout(
    url: RequestInfo,
    init: RequestInit | undefined,
    ms: number,
    controller: AbortController,
  ): Promise<Response> {
    const { signal, method, ...options } = init || {};
    const abort = this._makeAbort(controller);
    if (signal) signal.addEventListener('abort', abort, { once: true });

    const timeout = setTimeout(abort, ms);

    const isReadableBody =
      ((globalThis as any).ReadableStream && options.body instanceof (globalThis as any).ReadableStream) ||
      (typeof options.body === 'object' && options.body !== null && Symbol.asyncIterator in options.body);

    const fetchOptions: RequestInit = {
      signal: controller.signal as any,
      ...(isReadableBody ? { duplex: 'half' } : {}),
      method: 'GET',
      ...options,
    };
    if (method) {
      // Custom methods like 'patch' need to be uppercased
      // See https://github.com/nodejs/undici/issues/2294
      fetchOptions.method = method.toUpperCase();
    }

    try {
      // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
      return await this.fetch.call(undefined, url, fetchOptions);
    } finally {
      clearTimeout(timeout);
    }
  }

  private async shouldRetry(response: Response): Promise<boolean> {
    // Note this is not a standard header.
    const shouldRetryHeader = response.headers.get('x-should-retry');

    // If the server explicitly says whether or not to retry, obey.
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;

    // Retry on request timeouts.
    if (response.status === 408) return true;

    // Retry on lock timeouts.
    if (response.status === 409) return true;

    // Retry on rate limits.
    if (response.status === 429) return true;

    // Retry internal errors.
    if (response.status >= 500) return true;

    return false;
  }

  private async retryRequest(
    options: FinalRequestOptions,
    retriesRemaining: number,
    requestLogID: string,
    responseHeaders?: Headers | undefined,
  ): Promise<APIResponseProps> {
    let timeoutMillis: number | undefined;

    // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
    const retryAfterMillisHeader = responseHeaders?.get('retry-after-ms');
    if (retryAfterMillisHeader) {
      const timeoutMs = parseFloat(retryAfterMillisHeader);
      if (!Number.isNaN(timeoutMs)) {
        timeoutMillis = timeoutMs;
      }
    }

    // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
    const retryAfterHeader = responseHeaders?.get('retry-after');
    if (retryAfterHeader && !timeoutMillis) {
      const timeoutSeconds = parseFloat(retryAfterHeader);
      if (!Number.isNaN(timeoutSeconds)) {
        timeoutMillis = timeoutSeconds * 1000;
      } else {
        timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
      }
    }

    // If the API asks us to wait a certain amount of time, just do what it
    // says, but otherwise calculate a default
    if (timeoutMillis === undefined) {
      const maxRetries = options.maxRetries ?? this.maxRetries;
      timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
    }
    await sleep(timeoutMillis);

    return this.makeRequest(options, retriesRemaining - 1, requestLogID);
  }

  private calculateDefaultRetryTimeoutMillis(retriesRemaining: number, maxRetries: number): number {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8.0;

    const numRetries = maxRetries - retriesRemaining;

    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);

    // Apply some jitter, take up to at most 25 percent of the retry time.
    const jitter = 1 - Math.random() * 0.25;

    return sleepSeconds * jitter * 1000;
  }

  async buildRequest(
    inputOptions: FinalRequestOptions,
    { retryCount = 0 }: { retryCount?: number } = {},
  ): Promise<{ req: FinalizedRequestInit; url: string; timeout: number }> {
    const options = { ...inputOptions };
    const { method, path, query, defaultBaseURL } = options;

    const url = this.buildURL(path!, query as Record<string, unknown>, defaultBaseURL);
    if ('timeout' in options) validatePositiveInteger('timeout', options.timeout);
    options.timeout = options.timeout ?? this.timeout;
    const { bodyHeaders, body } = this.buildBody({ options });
    const reqHeaders = await this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });

    const req: FinalizedRequestInit = {
      method,
      headers: reqHeaders,
      ...(options.signal && { signal: options.signal }),
      ...((globalThis as any).ReadableStream &&
        body instanceof (globalThis as any).ReadableStream && { duplex: 'half' }),
      ...(body && { body }),
      ...((this.fetchOptions as any) ?? {}),
      ...((options.fetchOptions as any) ?? {}),
    };

    return { req, url, timeout: options.timeout };
  }

  private async buildHeaders({
    options,
    method,
    bodyHeaders,
    retryCount,
  }: {
    options: FinalRequestOptions;
    method: HTTPMethod;
    bodyHeaders: HeadersLike;
    retryCount: number;
  }): Promise<Headers> {
    let idempotencyHeaders: HeadersLike = {};
    if (this.idempotencyHeader && method !== 'get') {
      if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
      idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
    }

    const headers = buildHeaders([
      idempotencyHeaders,
      {
        Accept: 'application/json',
        'User-Agent': this.getUserAgent(),
        'X-Stainless-Retry-Count': String(retryCount),
        ...(options.timeout ? { 'X-Stainless-Timeout': String(Math.trunc(options.timeout / 1000)) } : {}),
        ...getPlatformHeaders(),
      },
      await this.authHeaders(options),
      this._options.defaultHeaders,
      bodyHeaders,
      options.headers,
    ]);

    this.validateHeaders(headers);

    return headers.values;
  }

  private _makeAbort(controller: AbortController) {
    // note: we can't just inline this method inside `fetchWithTimeout()` because then the closure
    //       would capture all request options, and cause a memory leak.
    return () => controller.abort();
  }

  private buildBody({ options }: { options: FinalRequestOptions }): {
    bodyHeaders: HeadersLike;
    body: BodyInit | undefined;
  } {
    const { body, headers: rawHeaders } = options;
    if (!body) {
      // A resource method always passes a `body` key when its operation defines a
      // request body, even if the caller omitted an optional body param. Keep the
      // content-type for those, and only elide it for operations with no body at
      // all (e.g. GET/DELETE).
      if (body == null && 'body' in options) {
        return this.#encoder({ body, headers: buildHeaders([rawHeaders]) });
      }
      return { bodyHeaders: undefined, body: undefined };
    }
    const headers = buildHeaders([rawHeaders]);
    if (
      // Pass raw type verbatim
      ArrayBuffer.isView(body) ||
      body instanceof ArrayBuffer ||
      body instanceof DataView ||
      (typeof body === 'string' &&
        // Preserve legacy string encoding behavior for now
        headers.values.has('content-type')) ||
      // `Blob` is superset of `File`
      ((globalThis as any).Blob && body instanceof (globalThis as any).Blob) ||
      // `FormData` -> `multipart/form-data`
      body instanceof FormData ||
      // `URLSearchParams` -> `application/x-www-form-urlencoded`
      body instanceof URLSearchParams ||
      // Send chunked stream (each chunk has own `length`)
      ((globalThis as any).ReadableStream && body instanceof (globalThis as any).ReadableStream)
    ) {
      return { bodyHeaders: undefined, body: body as BodyInit };
    } else if (
      typeof body === 'object' &&
      (Symbol.asyncIterator in body ||
        (Symbol.iterator in body && 'next' in body && typeof body.next === 'function'))
    ) {
      return { bodyHeaders: undefined, body: Shims.ReadableStreamFrom(body as AsyncIterable<Uint8Array>) };
    } else if (
      typeof body === 'object' &&
      headers.values.get('content-type') === 'application/x-www-form-urlencoded'
    ) {
      return {
        bodyHeaders: { 'content-type': 'application/x-www-form-urlencoded' },
        body: this.stringifyQuery(body),
      };
    } else {
      return this.#encoder({ body, headers });
    }
  }

  static Moonbase = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static MoonbaseError = Errors.MoonbaseError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;

  /**
   * Manage your collections and items
   */
  funnels: API.Funnels = new API.Funnels(this);
  /**
   * Manage your collections and items
   */
  collections: API.Collections = new API.Collections(this);
  /**
   * Manage your collections and items
   */
  views: API.Views = new API.Views(this);
  /**
   * Manage your inboxes, conversations, and messages
   */
  inboxes: API.Inboxes = new API.Inboxes(this);
  /**
   * Manage your inboxes, conversations, and messages
   */
  inboxConversations: API.InboxConversations = new API.InboxConversations(this);
  /**
   * Manage your inboxes, conversations, and messages
   */
  inboxMessages: API.InboxMessages = new API.InboxMessages(this);
  /**
   * Manage your meetings, files, and notes
   */
  tagsets: API.Tagsets = new API.Tagsets(this);
  /**
   * Manage your marketing campaigns and forms
   */
  programs: API.Programs = new API.Programs(this);
  /**
   * Manage your marketing campaigns and forms
   */
  programTemplates: API.ProgramTemplates = new API.ProgramTemplates(this);
  /**
   * Manage your marketing campaigns and forms
   */
  programMessages: API.ProgramMessages = new API.ProgramMessages(this);
  /**
   * Manage your marketing campaigns and forms
   */
  forms: API.Forms = new API.Forms(this);
  /**
   * Manage your marketing campaigns and forms
   */
  unsubscribes: API.Unsubscribes = new API.Unsubscribes(this);
  /**
   * View activities and capture calls
   */
  activities: API.Activities = new API.Activities(this);
  /**
   * View activities and capture calls
   */
  calls: API.Calls = new API.Calls(this);
  /**
   * Manage your meetings, files, and notes
   */
  files: API.Files = new API.Files(this);
  /**
   * Manage your meetings, files, and notes
   */
  meetings: API.Meetings = new API.Meetings(this);
  /**
   * Manage your meetings, files, and notes
   */
  notes: API.Notes = new API.Notes(this);
  webhookEndpoints: API.WebhookEndpoints = new API.WebhookEndpoints(this);
  agentSettings: API.AgentSettings = new API.AgentSettings(this);
}

Moonbase.Funnels = Funnels;
Moonbase.Collections = Collections;
Moonbase.Views = Views;
Moonbase.Inboxes = Inboxes;
Moonbase.InboxConversations = InboxConversations;
Moonbase.InboxMessages = InboxMessages;
Moonbase.Tagsets = Tagsets;
Moonbase.Programs = Programs;
Moonbase.ProgramTemplates = ProgramTemplates;
Moonbase.ProgramMessages = ProgramMessages;
Moonbase.Forms = Forms;
Moonbase.Unsubscribes = Unsubscribes;
Moonbase.Activities = Activities;
Moonbase.Calls = Calls;
Moonbase.Files = Files;
Moonbase.Meetings = Meetings;
Moonbase.Notes = Notes;
Moonbase.WebhookEndpoints = WebhookEndpoints;
Moonbase.AgentSettings = AgentSettings;

export declare namespace Moonbase {
  export type RequestOptions = Opts.RequestOptions;

  export import CursorPage = Pagination.CursorPage;
  export { type CursorPageParams as CursorPageParams, type CursorPageResponse as CursorPageResponse };

  export { type SearchResponse as SearchResponse, type SearchParams as SearchParams };

  export {
    Funnels as Funnels,
    type Funnel as Funnel,
    type FunnelStep as FunnelStep,
    type FunnelStepPointer as FunnelStepPointer,
    type FunnelsCursorPage as FunnelsCursorPage,
    type FunnelCreateParams as FunnelCreateParams,
    type FunnelUpdateParams as FunnelUpdateParams,
    type FunnelListParams as FunnelListParams,
  };

  export {
    Collections as Collections,
    type BooleanField as BooleanField,
    type BooleanValue as BooleanValue,
    type ChoiceField as ChoiceField,
    type ChoiceFieldOption as ChoiceFieldOption,
    type ChoiceFieldOptionPointer as ChoiceFieldOptionPointer,
    type ChoiceValue as ChoiceValue,
    type ChoiceValueParam as ChoiceValueParam,
    type Collection as Collection,
    type CollectionPointer as CollectionPointer,
    type CurrentDate as CurrentDate,
    type CurrentDatetime as CurrentDatetime,
    type CurrentMember as CurrentMember,
    type DateField as DateField,
    type DateFieldDefaultValueParam as DateFieldDefaultValueParam,
    type DateValue as DateValue,
    type DatetimeField as DatetimeField,
    type DatetimeFieldDefaultValueParam as DatetimeFieldDefaultValueParam,
    type DatetimeValue as DatetimeValue,
    type DomainField as DomainField,
    type DomainValue as DomainValue,
    type EmailField as EmailField,
    type EmailValue as EmailValue,
    type Field as Field,
    type FieldDefaultValue as FieldDefaultValue,
    type FieldPointer as FieldPointer,
    type FieldValue as FieldValue,
    type FieldValueParam as FieldValueParam,
    type FloatField as FloatField,
    type FloatValue as FloatValue,
    type FunnelPointerParam as FunnelPointerParam,
    type FunnelStepValue as FunnelStepValue,
    type FunnelStepValueParam as FunnelStepValueParam,
    type GeoField as GeoField,
    type GeoValue as GeoValue,
    type IdentifierField as IdentifierField,
    type IdentifierValue as IdentifierValue,
    type IntegerField as IntegerField,
    type IntegerValue as IntegerValue,
    type Item as Item,
    type ItemPointer as ItemPointer,
    type ItemPointerParam as ItemPointerParam,
    type ItemsFilter as ItemsFilter,
    type ItemsFilterAndGroup as ItemsFilterAndGroup,
    type ItemsFilterNotGroup as ItemsFilterNotGroup,
    type ItemsFilterOrGroup as ItemsFilterOrGroup,
    type ItemsFilterValueExists as ItemsFilterValueExists,
    type ItemsFilterValueMatches as ItemsFilterValueMatches,
    type MonetaryField as MonetaryField,
    type MonetaryValue as MonetaryValue,
    type MultiLineTextField as MultiLineTextField,
    type MultiLineTextValue as MultiLineTextValue,
    type PercentageField as PercentageField,
    type PercentageValue as PercentageValue,
    type RelationField as RelationField,
    type RelationFieldDefaultValueParam as RelationFieldDefaultValueParam,
    type RelationValue as RelationValue,
    type RelationValueParam as RelationValueParam,
    type SingleLineTextField as SingleLineTextField,
    type SingleLineTextValue as SingleLineTextValue,
    type SocialLinkedInField as SocialLinkedInField,
    type SocialLinkedInValue as SocialLinkedInValue,
    type SocialLinkedInValueParam as SocialLinkedInValueParam,
    type SocialProfileLinkedInParam as SocialProfileLinkedInParam,
    type SocialProfileXParam as SocialProfileXParam,
    type SocialXField as SocialXField,
    type SocialXValue as SocialXValue,
    type SocialXValueParam as SocialXValueParam,
    type StageField as StageField,
    type StageFieldCreateParams as StageFieldCreateParams,
    type StageFieldUpdateParams as StageFieldUpdateParams,
    type TelephoneNumber as TelephoneNumber,
    type TelephoneNumberField as TelephoneNumberField,
    type URLField as URLField,
    type URLValue as URLValue,
    type Value as Value,
    type ValueParam as ValueParam,
    type CollectionListResponse as CollectionListResponse,
    type CollectionListResponsesCursorPage as CollectionListResponsesCursorPage,
    type CollectionCreateParams as CollectionCreateParams,
    type CollectionUpdateParams as CollectionUpdateParams,
    type CollectionListParams as CollectionListParams,
  };

  export {
    Views as Views,
    type View as View,
    type ViewAggregate as ViewAggregate,
    type ViewAggregateFieldStatistic as ViewAggregateFieldStatistic,
    type ViewAggregateItemCount as ViewAggregateItemCount,
    type ViewField as ViewField,
    type ViewRelationValueFilter as ViewRelationValueFilter,
    type ViewListResponse as ViewListResponse,
    type ViewListResponsesCursorPage as ViewListResponsesCursorPage,
    type ViewCreateParams as ViewCreateParams,
    type ViewUpdateParams as ViewUpdateParams,
    type ViewListParams as ViewListParams,
  };

  export {
    Inboxes as Inboxes,
    type Inbox as Inbox,
    type InboxesCursorPage as InboxesCursorPage,
    type InboxListParams as InboxListParams,
  };

  export {
    InboxConversations as InboxConversations,
    type InboxConversation as InboxConversation,
    type InboxConversationListResponse as InboxConversationListResponse,
    type InboxConversationListResponsesCursorPage as InboxConversationListResponsesCursorPage,
    type InboxConversationRetrieveParams as InboxConversationRetrieveParams,
    type InboxConversationListParams as InboxConversationListParams,
  };

  export {
    InboxMessages as InboxMessages,
    type EmailMessage as EmailMessage,
    type EmailMessageAddress as EmailMessageAddress,
    type EmailMessageAddressParams as EmailMessageAddressParams,
    type MessageAttachment as MessageAttachment,
    type MessagePointer as MessagePointer,
    type SlackMessage as SlackMessage,
    type SlackMessageAddress as SlackMessageAddress,
    type SlackMessageAddressParams as SlackMessageAddressParams,
    type InboxMessageCreateResponse as InboxMessageCreateResponse,
    type InboxMessageRetrieveResponse as InboxMessageRetrieveResponse,
    type InboxMessageUpdateResponse as InboxMessageUpdateResponse,
    type MessagePointersCursorPage as MessagePointersCursorPage,
    type InboxMessageCreateParams as InboxMessageCreateParams,
    type InboxMessageRetrieveParams as InboxMessageRetrieveParams,
    type InboxMessageUpdateParams as InboxMessageUpdateParams,
    type InboxMessageListParams as InboxMessageListParams,
  };

  export {
    Tagsets as Tagsets,
    type Tagset as Tagset,
    type TagsetPointer as TagsetPointer,
    type TagsetsCursorPage as TagsetsCursorPage,
    type TagsetCreateParams as TagsetCreateParams,
    type TagsetUpdateParams as TagsetUpdateParams,
    type TagsetListParams as TagsetListParams,
  };

  export {
    Programs as Programs,
    type Program as Program,
    type ProgramActivityMetrics as ProgramActivityMetrics,
    type ProgramPointer as ProgramPointer,
    type ProgramsCursorPage as ProgramsCursorPage,
    type ProgramRetrieveParams as ProgramRetrieveParams,
    type ProgramListParams as ProgramListParams,
  };

  export {
    ProgramTemplates as ProgramTemplates,
    type ProgramTemplate as ProgramTemplate,
    type ProgramTemplatePointer as ProgramTemplatePointer,
    type ProgramTemplatesCursorPage as ProgramTemplatesCursorPage,
    type ProgramTemplateRetrieveParams as ProgramTemplateRetrieveParams,
    type ProgramTemplateListParams as ProgramTemplateListParams,
  };

  export {
    ProgramMessages as ProgramMessages,
    type ProgramMessage as ProgramMessage,
    type ProgramMessagePointer as ProgramMessagePointer,
    type ProgramMessageSendParams as ProgramMessageSendParams,
  };

  export {
    Forms as Forms,
    type Form as Form,
    type FormsCursorPage as FormsCursorPage,
    type FormCreateParams as FormCreateParams,
    type FormUpdateParams as FormUpdateParams,
    type FormListParams as FormListParams,
  };

  export {
    Unsubscribes as Unsubscribes,
    type Unsubscribe as Unsubscribe,
    type UnsubscribePointer as UnsubscribePointer,
    type UnsubscribesCursorPage as UnsubscribesCursorPage,
    type UnsubscribeCreateParams as UnsubscribeCreateParams,
    type UnsubscribeListParams as UnsubscribeListParams,
  };

  export {
    Activities as Activities,
    type Activity as Activity,
    type ActivityCallOccurred as ActivityCallOccurred,
    type ActivityFormSubmitted as ActivityFormSubmitted,
    type ActivityInboxMessageSent as ActivityInboxMessageSent,
    type ActivityItemCreated as ActivityItemCreated,
    type ActivityItemMentioned as ActivityItemMentioned,
    type ActivityItemMerged as ActivityItemMerged,
    type ActivityMeetingHeld as ActivityMeetingHeld,
    type ActivityMeetingScheduled as ActivityMeetingScheduled,
    type ActivityNoteCreated as ActivityNoteCreated,
    type ActivityProgramMessageBounced as ActivityProgramMessageBounced,
    type ActivityProgramMessageClicked as ActivityProgramMessageClicked,
    type ActivityProgramMessageComplained as ActivityProgramMessageComplained,
    type ActivityProgramMessageFailed as ActivityProgramMessageFailed,
    type ActivityProgramMessageOpened as ActivityProgramMessageOpened,
    type ActivityProgramMessageSent as ActivityProgramMessageSent,
    type ActivityProgramMessageShielded as ActivityProgramMessageShielded,
    type ActivityProgramMessageUnsubscribed as ActivityProgramMessageUnsubscribed,
    type Constituent as Constituent,
    type ConstituentEntityPointer as ConstituentEntityPointer,
    type ActivitiesCursorPage as ActivitiesCursorPage,
    type ActivityListParams as ActivityListParams,
  };

  export {
    Calls as Calls,
    type Call as Call,
    type CallParticipant as CallParticipant,
    type CallPointer as CallPointer,
    type CallTranscript as CallTranscript,
    type CallTranscriptCue as CallTranscriptCue,
    type CallTranscriptSpeaker as CallTranscriptSpeaker,
    type CallsCursorPage as CallsCursorPage,
    type CallCreateParams as CallCreateParams,
    type CallRetrieveParams as CallRetrieveParams,
    type CallListParams as CallListParams,
    type CallUpsertParams as CallUpsertParams,
  };

  export {
    Files as Files,
    type FilePointer as FilePointer,
    type MoonbaseFile as MoonbaseFile,
    type MoonbaseFilesCursorPage as MoonbaseFilesCursorPage,
    type FileListParams as FileListParams,
    type FileUploadParams as FileUploadParams,
  };

  export {
    Meetings as Meetings,
    type Attendee as Attendee,
    type Meeting as Meeting,
    type MeetingPointer as MeetingPointer,
    type MeetingTranscript as MeetingTranscript,
    type MeetingTranscriptCue as MeetingTranscriptCue,
    type MeetingTranscriptSpeaker as MeetingTranscriptSpeaker,
    type Organizer as Organizer,
    type MeetingPointersCursorPage as MeetingPointersCursorPage,
    type MeetingRetrieveParams as MeetingRetrieveParams,
    type MeetingUpdateParams as MeetingUpdateParams,
    type MeetingListParams as MeetingListParams,
  };

  export {
    Notes as Notes,
    type Note as Note,
    type NoteAssociationParamPointer as NoteAssociationParamPointer,
    type NoteAssociationPointer as NoteAssociationPointer,
    type NotePointer as NotePointer,
    type NotesCursorPage as NotesCursorPage,
    type NoteCreateParams as NoteCreateParams,
    type NoteUpdateParams as NoteUpdateParams,
    type NoteListParams as NoteListParams,
  };

  export {
    WebhookEndpoints as WebhookEndpoints,
    type Endpoint as Endpoint,
    type Subscription as Subscription,
    type EndpointsCursorPage as EndpointsCursorPage,
    type WebhookEndpointCreateParams as WebhookEndpointCreateParams,
    type WebhookEndpointUpdateParams as WebhookEndpointUpdateParams,
    type WebhookEndpointListParams as WebhookEndpointListParams,
  };

  export {
    AgentSettings as AgentSettings,
    type AgentSettingRetrieveResponse as AgentSettingRetrieveResponse,
    type AgentSettingUpdateResponse as AgentSettingUpdateResponse,
    type AgentSettingUpdateParams as AgentSettingUpdateParams,
  };

  export type Error = API.Error;
  export type FormattedText = API.FormattedText;
  export type Tag = API.Tag;
  export type TagPointerParam = API.TagPointerParam;
}
