// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FunnelsAPI from '../funnels';
import * as FieldsAPI from './fields';
import {
  FieldCreateParams,
  FieldDeleteParams,
  FieldRetrieveParams,
  FieldUpdateParams,
  Fields,
} from './fields';
import * as ItemsAPI from './items';
import {
  ItemCreateParams,
  ItemDeleteParams,
  ItemListParams,
  ItemMergeParams,
  ItemRetrieveParams,
  ItemSearchParams,
  ItemSearchResponse,
  ItemSearchResponsesCursorPage,
  ItemUpdateParams,
  ItemUpsertParams,
  Items,
} from './items';
import * as ViewsAPI from '../views/views';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage your collections and items
 */
export class Collections extends APIResource {
  fields: FieldsAPI.Fields = new FieldsAPI.Fields(this._client);
  items: ItemsAPI.Items = new ItemsAPI.Items(this._client);

  /**
   * Creates a new collection with default fields (name, created_at, updated_at) and
   * a default view.
   *
   * @example
   * ```ts
   * const collection = await client.collections.create({
   *   name: 'Leads',
   *   description: 'Inbound leads from marketing',
   * });
   * ```
   */
  create(body: CollectionCreateParams, options?: RequestOptions): APIPromise<Collection> {
    return this._client.post('/collections', { body, ...options });
  }

  /**
   * Retrieves the details of an existing collection.
   *
   * @example
   * ```ts
   * const collection = await client.collections.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Collection> {
    return this._client.get(path`/collections/${id}`, options);
  }

  /**
   * Updates an existing collection.
   *
   * @example
   * ```ts
   * const collection = await client.collections.update('id', {
   *   description: 'Qualified inbound leads',
   *   name: 'Hot Leads',
   * });
   * ```
   */
  update(id: string, body: CollectionUpdateParams, options?: RequestOptions): APIPromise<Collection> {
    return this._client.patch(path`/collections/${id}`, { body, ...options });
  }

  /**
   * Returns a list of your collections.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const collectionListResponse of client.collections.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: CollectionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CollectionListResponsesCursorPage, CollectionListResponse> {
    return this._client.getAPIList('/collections', CursorPage<CollectionListResponse>, { query, ...options });
  }
}

export type CollectionListResponsesCursorPage = CursorPage<CollectionListResponse>;

export type ItemPointersCursorPage = CursorPage<ItemPointer>;

export type ItemsCursorPage = CursorPage<Item>;

/**
 * A field that stores true or false values.
 */
export interface BooleanField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Is Active").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `is_active`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/boolean` for this field.
   */
  type: 'field/boolean';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * True or false value
 */
export interface BooleanValue {
  data: boolean;

  type: 'value/boolean';
}

/**
 * A field that stores one or more predefined options from a list of choices.
 */
export interface ChoiceField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Priority").
   */
  name: string;

  /**
   * A list of `FieldOption` objects representing the available choices for this
   * field.
   */
  options: Array<ChoiceFieldOption>;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `priority`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/choice` for this field.
   */
  type: 'field/choice';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * Represents a single selectable option within a choice field.
 */
export interface ChoiceFieldOption {
  /**
   * Unique identifier for the option.
   */
  id: string;

  /**
   * The color of the option.
   */
  color:
    | 'amber'
    | 'blue'
    | 'cyan'
    | 'emerald'
    | 'fuchsia'
    | 'green'
    | 'indigo'
    | 'lime'
    | 'lunar'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'rose'
    | 'sky'
    | 'teal'
    | 'violet'
    | 'yellow';

  /**
   * The human-readable text displayed for this option.
   */
  name: string;

  /**
   * String representing the object’s type. Always `choice_field_option` for this
   * object.
   */
  type: 'choice_field_option';
}

export interface ChoiceFieldOptionPointer {
  id: string;

  type: 'choice_field_option';
}

/**
 * Selected choice option
 */
export interface ChoiceValue {
  /**
   * An option that must match one of the predefined options for the field.
   */
  data: ChoiceFieldOption;

  type: 'value/choice';
}

/**
 * Selected choice option
 */
export interface ChoiceValueParam {
  /**
   * An option that must match one of the predefined options for the field.
   */
  data: ChoiceFieldOptionPointer;

  type: 'value/choice';
}

/**
 * A Collection is a container for structured data, similar to a database table or
 * spreadsheet. It defines a schema using a set of `Fields` and holds the data as a
 * list of `Items`.
 */
export interface Collection {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * A list of `Field` objects that define the schema for items in this collection.
   */
  fields: Array<Field>;

  /**
   * `system` collections are managed by Moonbase (e.g., People, Organizations),
   * `form` collections back a Form, and `custom` collections are user-created.
   */
  kind: 'system' | 'form' | 'custom';

  /**
   * The user-facing name of the collection (e.g., “Organizations”).
   */
  name: string;

  /**
   * A unique, stable, machine-readable identifier for the collection. This reference
   * is used in API requests and does not change even if the `name` is updated.
   */
  ref: string;

  /**
   * String representing the object’s type. Always `collection` for this object.
   */
  type: 'collection';

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the collection's purpose.
   */
  description?: string;

  /**
   * A list of saved `View` objects for presenting the collection's data.
   *
   * **Note:** Only present when requested using the `include` query parameter.
   */
  views?: Array<ViewsAPI.View>;
}

/**
 * A lightweight reference to a `Collection`, containing the minimal information
 * needed to identify it.
 */
export interface CollectionPointer {
  /**
   * Unique identifier of the collection.
   */
  id: string;

  /**
   * The stable, machine-readable reference identifier of the collection.
   */
  ref: string;

  /**
   * String representing the object’s type. Always `collection` for this object.
   */
  type: 'collection';
}

/**
 * Resolves to today's date at the time the record is created.
 */
export interface CurrentDate {
  type: 'current_date';
}

/**
 * Resolves to the current date and time at the time the record is created.
 */
export interface CurrentDatetime {
  type: 'current_datetime';
}

/**
 * Resolves to the team member who creates the record.
 */
export interface CurrentMember {
  type: 'current_member';
}

/**
 * A field that stores dates without time information.
 */
export interface DateField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Due Date").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `due_date`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/date` for this field.
   */
  type: 'field/date';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * Date without time
 */
export type DateFieldDefaultValueParam = DateValue | CurrentDate;

/**
 * Date without time
 */
export interface DateValue {
  data: string;

  type: 'value/date';
}

/**
 * A field that stores dates with time information.
 */
export interface DatetimeField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Meeting Time").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `meeting_time`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/datetime` for this field.
   */
  type: 'field/datetime';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * Date and time value
 */
export type DatetimeFieldDefaultValueParam = DatetimeValue | CurrentDatetime;

/**
 * Date and time value
 */
export interface DatetimeValue {
  data: string;

  type: 'value/datetime';
}

/**
 * A field that stores internet domain names.
 */
export interface DomainField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Company Domain").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `company_domain`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/uri/domain` for this field.
   */
  type: 'field/uri/domain';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * Internet domain name
 */
export interface DomainValue {
  /**
   * A valid internet domain name, without protocol (e.g., 'https://') or path.
   */
  data: string;

  type: 'value/uri/domain';
}

/**
 * A field that stores and validates email addresses.
 */
export interface EmailField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Work Email").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `work_email`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/email` for this field.
   */
  type: 'field/email';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * Email address value
 */
export interface EmailValue {
  /**
   * A valid email address.
   */
  data: string;

  type: 'value/email';
}

/**
 * A field definition, which varies by type
 */
export type Field =
  | SingleLineTextField
  | MultiLineTextField
  | IdentifierField
  | IntegerField
  | FloatField
  | MonetaryField
  | PercentageField
  | BooleanField
  | EmailField
  | URLField
  | DomainField
  | SocialXField
  | SocialLinkedInField
  | TelephoneNumberField
  | GeoField
  | DateField
  | DatetimeField
  | ChoiceField
  | StageField
  | RelationField;

/**
 * A default value for a field. Can be a static value (e.g., `value/date`) or a
 * server-resolved value (e.g., `current_date`). Static values use the same shape
 * as item values. Server-resolved values are computed when an item is created.
 */
export type FieldDefaultValue =
  | SingleLineTextValue
  | MultiLineTextValue
  | IdentifierValue
  | IntegerValue
  | FloatValue
  | MonetaryValue
  | PercentageValue
  | BooleanValue
  | EmailValue
  | URLValue
  | DomainValue
  | SocialXValue
  | SocialLinkedInValue
  | TelephoneNumber
  | GeoValue
  | DateValue
  | CurrentDate
  | DatetimeValue
  | CurrentDatetime
  | ChoiceValue
  | FunnelStepValue
  | RelationValue
  | CurrentMember;

/**
 * A lightweight reference to a `Field`, containing the minimal information needed
 * to identify it.
 */
export interface FieldPointer {
  /**
   * Unique identifier of the field.
   */
  id: string;

  /**
   * A reference to the `Collection` containing this field.
   */
  collection: CollectionPointer;

  /**
   * The stable, machine-readable reference identifier of the field.
   */
  ref: string;

  /**
   * String representing the object’s type. Always `field` for this object.
   */
  type: 'field';
}

/**
 * A field can be null, a single value, or an array of values
 */
export type FieldValue =
  | SingleLineTextValue
  | MultiLineTextValue
  | IdentifierValue
  | IntegerValue
  | FloatValue
  | MonetaryValue
  | PercentageValue
  | BooleanValue
  | EmailValue
  | URLValue
  | DomainValue
  | SocialXValue
  | SocialLinkedInValue
  | TelephoneNumber
  | GeoValue
  | DateValue
  | DatetimeValue
  | ChoiceValue
  | FunnelStepValue
  | RelationValue
  | Array<Value>;

/**
 * A field can be null, a single value, or an array of values
 */
export type FieldValueParam =
  | SingleLineTextValue
  | MultiLineTextValue
  | IdentifierValue
  | IntegerValue
  | FloatValue
  | MonetaryValue
  | PercentageValue
  | BooleanValue
  | EmailValue
  | URLValue
  | DomainValue
  | SocialXValueParam
  | SocialLinkedInValueParam
  | TelephoneNumber
  | GeoValue
  | DateValue
  | DatetimeValue
  | ChoiceValueParam
  | FunnelStepValueParam
  | RelationValueParam
  | Array<ValueParam>;

/**
 * A field that stores decimal numbers with floating-point precision.
 */
export interface FloatField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Rating").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `rating`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/number/unitless_float` for this field.
   */
  type: 'field/number/unitless_float';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * Floating point number
 */
export interface FloatValue {
  data: number;

  type: 'value/number/unitless_float';
}

/**
 * A pointer to a Funnel, used as a parameter.
 */
export interface FunnelPointerParam {
  /**
   * The ID of the funnel.
   */
  id: string;

  /**
   * String representing the object's type. Always `funnel` for this parameter.
   */
  type: 'funnel';
}

/**
 * Funnel step value
 */
export interface FunnelStepValue {
  /**
   * A specific funnel step, as configured on the Funnel.
   */
  data: FunnelsAPI.FunnelStep;

  type: 'value/funnel_step';
}

/**
 * Funnel step value
 */
export interface FunnelStepValueParam {
  /**
   * A specific funnel step, as configured on the Funnel.
   */
  data: FunnelsAPI.FunnelStepPointer;

  type: 'value/funnel_step';
}

/**
 * A field that stores geographic coordinates or location data.
 */
export interface GeoField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Location").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `location`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/geo` for this field.
   */
  type: 'field/geo';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * Geographic coordinate value
 */
export interface GeoValue {
  /**
   * A string that represents some geographic location. The exact format may vary
   * based on context.
   */
  data: string;

  type: 'value/geo';
}

/**
 * A field that stores opaque external identifiers verbatim.
 */
export interface IdentifierField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Stripe Id").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `stripe_id`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/identifier` for this field.
   */
  type: 'field/identifier';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * Identifier string
 */
export interface IdentifierValue {
  /**
   * An external identifier as text, uo to 255 characters in length.
   */
  data: string;

  type: 'value/identifier';
}

/**
 * A field that stores whole numbers without decimal places.
 */
export interface IntegerField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Employee Count").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `employee_count`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/number/unitless_integer` for this
   * field.
   */
  type: 'field/number/unitless_integer';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * Integer value without units
 */
export interface IntegerValue {
  data: number;

  type: 'value/number/unitless_integer';
}

/**
 * An Item represents a single record or row within a Collection. It holds a set of
 * `values` corresponding to the Collection's `fields`.
 */
export interface Item {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * A lightweight reference to a `Collection`, containing the minimal information
   * needed to identify it.
   */
  collection: CollectionPointer;

  /**
   * String representing the object’s type. Always `item` for this object.
   */
  type: 'item';

  /**
   * A hash where keys are the `ref` of a `Field` and values are the data stored for
   * that field.
   */
  values: { [key: string]: FieldValue };
}

/**
 * A reference to an `Item` within a specific `Collection`, providing the context
 * needed to locate the item.
 */
export interface ItemPointer {
  /**
   * Unique identifier of the item.
   */
  id: string;

  /**
   * A reference to the `Collection` containing this item.
   */
  collection: CollectionPointer;

  /**
   * String representing the object’s type. Always `item` for this object.
   */
  type: 'item';
}

/**
 * A lightweight reference to an `Item` used in request bodies.
 */
export interface ItemPointerParam {
  /**
   * Unique identifier of the item.
   */
  id: string;

  /**
   * String representing the object’s type. Always `item` for this object.
   */
  type: 'item';
}

/**
 * Return only items that match the filter conditions. Complex filters can be
 * created by nesting filters inside of `AND`, `OR`, and `NOT` filters.
 */
export type ItemsFilter =
  | ItemsFilterValueMatches
  | ItemsFilterValueExists
  | ItemsFilterAndGroup
  | ItemsFilterOrGroup
  | ItemsFilterNotGroup;

/**
 * Include only items that match ALL of the filters in `filters`.
 */
export interface ItemsFilterAndGroup {
  /**
   * An array of filters, ALL of which must be satisfied for this `and` filter to
   * match.
   */
  filters: Array<ItemsFilter>;

  op: 'and';
}

export interface ItemsFilterNotGroup {
  /**
   * A nested filter which must NOT match in order for this `not` filter to match.
   */
  filter: ItemsFilter;

  op: 'not';
}

/**
 * Include only items that match ANY of the filters in `filters`.
 */
export interface ItemsFilterOrGroup {
  /**
   * An array of filters, ANY of which must be satisfied for this `or` filter to
   * match.
   */
  filters: Array<ItemsFilter>;

  op: 'or';
}

/**
 * Include only items that have a value in the given `field`.
 */
export interface ItemsFilterValueExists {
  /**
   * The id or key of the field for which a value must exist.
   */
  field: string;

  op: 'exists';
}

/**
 * Include only items with a value in the given `field` that satisfies the `op`
 * condition.
 */
export interface ItemsFilterValueMatches {
  /**
   * The id or key of the field in which values are matched.
   */
  field: string;

  /**
   * The matching operator for this filter.
   */
  op:
    | 'starts_with'
    | 'ends_with'
    | 'contains'
    | 'not_contains'
    | 'eq'
    | 'not_eq'
    | 'gt'
    | 'lt'
    | 'gte'
    | 'lte';

  /**
   * The value to match against. Use ISO8601 format for dates and datetime fields.
   * For date fields, the time portion of the date-time will be ignored. For currency
   * fields, the amount should be in the smallest unit of currency (eg: cents for
   * USD).
   */
  value: string | number | boolean;
}

/**
 * A field that stores monetary amounts with currency information.
 */
export interface MonetaryField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * The default currency for the field, as a 3-letter ISO 4217 code (e.g., `USD`,
   * `EUR`, `GBP`).
   */
  default_unit: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Deal Value").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `deal_value`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/number/monetary` for this field.
   */
  type: 'field/number/monetary';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * Monetary or currency value
 */
export interface MonetaryValue {
  /**
   * A monetary amount is composed of the amount in the smallest unit of a currency
   * and an ISO currency code.
   */
  data: MonetaryValue.Data;

  type: 'value/number/monetary';
}

export namespace MonetaryValue {
  /**
   * A monetary amount is composed of the amount in the smallest unit of a currency
   * and an ISO currency code.
   */
  export interface Data {
    /**
     * The 3-letter ISO 4217 currency code
     */
    currency: string;

    /**
     * The amount in the minor units of the currency. For example, $10 (10 USD) would
     * be 1000. Minor units conversion depends on the currency.
     */
    in_minor_units: number;
  }
}

/**
 * A field that stores multiple lines of text with line breaks preserved.
 */
export interface MultiLineTextField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Description").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `description`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/text/multi_line` for this field.
   */
  type: 'field/text/multi_line';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * Multiple lines of text
 */
export interface MultiLineTextValue {
  /**
   * Text which may contain line breaks, can be up to 65,536 characters long. Do not
   * use markdown formatting, just plain text.
   */
  data: string;

  type: 'value/text/multi_line';
}

/**
 * A field that stores percentage values as decimal numbers.
 */
export interface PercentageField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Win Probability").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `win_probability`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/number/percentage` for this field.
   */
  type: 'field/number/percentage';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * Percentage numeric value
 */
export interface PercentageValue {
  /**
   * A floating-point number representing a percentage value, for example 50.21 for
   * 50.21% or -1000 for -1000% etc.
   */
  data: number;

  type: 'value/number/percentage';
}

/**
 * A field that creates a link between items in different collections, enabling
 * cross-collection relationships.
 */
export interface RelationField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The set of collections that are valid targets for this relation.
   */
  allowed_collections: Array<CollectionPointer>;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Account").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `account`).
   */
  ref: string;

  /**
   * The type of relationship. Can be `one_way` for simple references or `two_way`
   * for bidirectional relationships.
   */
  relation_type: 'one_way' | 'two_way';

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/relation` for this field.
   */
  type: 'field/relation';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;

  /**
   * The name given to auto-created reverse fields on target collections. Only
   * present on `two_way` source fields.
   */
  reverse_field_name?: string;

  /**
   * A list of reverse fields created on each target collection. Only present on
   * `two_way` source fields.
   */
  reverse_fields?: Array<FieldPointer>;

  /**
   * A reference to the source field that manages this reverse field. Only present on
   * reverse (contingent) fields.
   */
  source_field?: FieldPointer;
}

/**
 * Related item reference
 */
export type RelationFieldDefaultValueParam = RelationValueParam | CurrentMember;

/**
 * Related item reference
 */
export interface RelationValue {
  /**
   * A reference to another Moonbase item.
   */
  data: ItemPointer;

  type: 'value/relation';
}

/**
 * Related item reference
 */
export interface RelationValueParam {
  /**
   * A reference to another Moonbase item.
   */
  data: ItemPointerParam;

  type: 'value/relation';
}

/**
 * A field that stores a single line of text without line breaks.
 */
export interface SingleLineTextField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Company Name").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `company_name`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/text/single_line` for this field.
   */
  type: 'field/text/single_line';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * A single line of text
 */
export interface SingleLineTextValue {
  /**
   * A single line of text, up to 1024 characters long. It should not contain line
   * breaks.
   */
  data: string;

  type: 'value/text/single_line';
}

/**
 * A field that stores LinkedIn profile information.
 */
export interface SocialLinkedInField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "LinkedIn Profile").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `linkedin_profile`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/uri/social_linked_in` for this field.
   */
  type: 'field/uri/social_linked_in';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * The social media profile for the LinkedIn platform
 */
export interface SocialLinkedInValue {
  /**
   * The social media profile for the LinkedIn platform
   */
  data: SocialLinkedInValue.Data;

  type: 'value/uri/social_linked_in';
}

export namespace SocialLinkedInValue {
  /**
   * The social media profile for the LinkedIn platform
   */
  export interface Data {
    /**
     * The full URL to the LinkedIn profile.
     */
    url: string;

    /**
     * The LinkedIn username, including the prefix 'company/' for company pages or
     * 'in/' for personal profiles.
     */
    username: string;
  }
}

/**
 * The social media profile for the LinkedIn platform
 */
export interface SocialLinkedInValueParam {
  /**
   * The social media profile for the LinkedIn platform
   */
  data: SocialProfileLinkedInParam;

  type: 'value/uri/social_linked_in';
}

/**
 * Social media profile information including both the full URL and extracted
 * username.
 */
export interface SocialProfileLinkedInParam {
  /**
   * The full URL to the LinkedIn profile.
   */
  url?: string;

  /**
   * The LinkedIn username, including the prefix 'company/' for company pages or
   * 'in/' for personal profiles.
   */
  username?: string;
}

/**
 * Social media profile information including both the full URL and extracted
 * username.
 */
export interface SocialProfileXParam {
  /**
   * The full URL to the X profile, starting with 'https://x.com/'
   */
  url?: string;

  /**
   * The X username, up to 15 characters long, containing only lowercase letters
   * (a-z), uppercase letters (A-Z), numbers (0-9), and underscores (\_). Does not
   * include the '@' symbol prefix.
   */
  username?: string;
}

/**
 * A field that stores X (formerly Twitter) profile information.
 */
export interface SocialXField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "X Profile").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `x_profile`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/uri/social_x` for this field.
   */
  type: 'field/uri/social_x';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * The social media profile for the X (formerly Twitter) platform
 */
export interface SocialXValue {
  /**
   * Social media profile information including both the full URL and extracted
   * username.
   */
  data: SocialXValue.Data;

  type: 'value/uri/social_x';
}

export namespace SocialXValue {
  /**
   * Social media profile information including both the full URL and extracted
   * username.
   */
  export interface Data {
    /**
     * The full URL to the X profile, starting with 'https://x.com/'
     */
    url: string;

    /**
     * The X username, up to 15 characters long, containing only lowercase letters
     * (a-z), uppercase letters (A-Z), numbers (0-9), and underscores (\_). Does not
     * include the '@' symbol prefix.
     */
    username: string;
  }
}

/**
 * The social media profile for the X (formerly Twitter) platform
 */
export interface SocialXValueParam {
  /**
   * Social media profile information including both the full URL and extracted
   * username.
   */
  data: SocialProfileXParam;

  type: 'value/uri/social_x';
}

/**
 * A field that tracks an item's position in a funnel or pipeline workflow.
 */
export interface StageField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * The `Funnel` object that defines the available stages for this field.
   */
  funnel: FunnelsAPI.Funnel;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Sales Stage").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `sales_stage`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/stage` for this field.
   */
  type: 'field/stage';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * Parameters for creating a stage field.
 */
export interface StageFieldCreateParams {
  /**
   * The funnel that defines the available stages for this field.
   */
  funnel: FunnelPointerParam;

  /**
   * The human-readable name for the field.
   */
  name: string;

  /**
   * The field type. Must be `field/stage`.
   */
  type: 'field/stage';

  /**
   * Whether the field holds a single value (`one`) or multiple values (`many`).
   * Defaults to `one`.
   */
  cardinality?: 'one' | 'many';

  default_values?: Array<FunnelStepValueParam>;

  /**
   * An optional description of the field's purpose.
   */
  description?: string;

  /**
   * If `true`, items must have a value for this field. Defaults to `false`.
   */
  required?: boolean;

  /**
   * If `true`, values must be unique across all items. Defaults to `false`.
   */
  unique?: boolean;
}

/**
 * Parameters for updating a stage field.
 */
export interface StageFieldUpdateParams {
  /**
   * The field type. Must be `field/stage`.
   */
  type: 'field/stage';

  /**
   * Updated cardinality: `one` or `many`.
   */
  cardinality?: 'one' | 'many';

  default_values?: Array<FunnelStepValueParam> | null;

  /**
   * An updated description, or `null` to clear it.
   */
  description?: string | null;

  /**
   * A new funnel to use for this field, or omit to keep the current funnel.
   */
  funnel?: FunnelPointerParam;

  /**
   * The new name for the field.
   */
  name?: string;

  /**
   * If `true`, items must have a value for this field.
   */
  required?: boolean;

  /**
   * If `true`, values must be unique across all items.
   */
  unique?: boolean;
}

/**
 * Telephone number value
 */
export interface TelephoneNumber {
  /**
   * A telephone number in strictly formatted E.164 format. Do not include spaces,
   * dashes, or parentheses etc.
   */
  data: string;

  type: 'value/telephone_number';
}

/**
 * A field that stores phone numbers in E.164 format.
 */
export interface TelephoneNumberField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Phone").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `phone`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/telephone_number` for this field.
   */
  type: 'field/telephone_number';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * A field that stores and validates web URLs.
 */
export interface URLField {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  default_values: Array<FieldDefaultValue>;

  /**
   * `system` fields are managed by Moonbase, `inverse` fields are the reverse side
   * of a two-way relation, and `custom` fields are user-created.
   */
  kind: 'system' | 'inverse' | 'custom';

  /**
   * The human-readable name of the field (e.g., "Website").
   */
  name: string;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly: boolean;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `website`).
   */
  ref: string;

  /**
   * If `true`, this field must have a value.
   */
  required: boolean;

  /**
   * The data type of the field. Always `field/uri/url` for this field.
   */
  type: 'field/uri/url';

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique: boolean;

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;
}

/**
 * URL or web address
 */
export interface URLValue {
  /**
   * A valid URL, conforming to RFC 3986, up to 8,192 characters long. It should
   * include the protocol, for example 'https://' or 'mailto:support@moonbase.ai'
   * etc.
   */
  data: string;

  type: 'value/uri/url';
}

/**
 * A typed value with discriminated union support
 */
export type Value =
  | SingleLineTextValue
  | MultiLineTextValue
  | IdentifierValue
  | IntegerValue
  | FloatValue
  | MonetaryValue
  | PercentageValue
  | BooleanValue
  | EmailValue
  | URLValue
  | DomainValue
  | SocialXValue
  | SocialLinkedInValue
  | TelephoneNumber
  | GeoValue
  | DateValue
  | DatetimeValue
  | ChoiceValue
  | FunnelStepValue
  | RelationValue;

/**
 * A typed value with discriminated union support
 */
export type ValueParam =
  | SingleLineTextValue
  | MultiLineTextValue
  | IdentifierValue
  | IntegerValue
  | FloatValue
  | MonetaryValue
  | PercentageValue
  | BooleanValue
  | EmailValue
  | URLValue
  | DomainValue
  | SocialXValueParam
  | SocialLinkedInValueParam
  | TelephoneNumber
  | GeoValue
  | DateValue
  | DatetimeValue
  | ChoiceValueParam
  | FunnelStepValueParam
  | RelationValueParam;

/**
 * Information about the most essential attributes of a Collection (does not
 * include the collection's field definitions).
 */
export interface CollectionListResponse {
  id: string;

  created_at: string;

  kind: 'system' | 'form' | 'custom';

  name: string;

  ref: string;

  type: 'collection';

  updated_at: string;

  description?: string;
}

export interface CollectionCreateParams {
  /**
   * The user-facing name of the collection (e.g., "Leads"). A `ref` is automatically
   * derived from the name.
   */
  name: string;

  /**
   * An optional, longer-form description of the collection's purpose.
   */
  description?: string;
}

export interface CollectionUpdateParams {
  /**
   * An optional, longer-form description of the collection's purpose.
   */
  description?: string;

  /**
   * The user-facing name of the collection.
   */
  name?: string;
}

export interface CollectionListParams extends CursorPageParams {
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

Collections.Fields = Fields;
Collections.Items = Items;

export declare namespace Collections {
  export {
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
    Fields as Fields,
    type FieldCreateParams as FieldCreateParams,
    type FieldRetrieveParams as FieldRetrieveParams,
    type FieldUpdateParams as FieldUpdateParams,
    type FieldDeleteParams as FieldDeleteParams,
  };

  export {
    Items as Items,
    type ItemSearchResponse as ItemSearchResponse,
    type ItemSearchResponsesCursorPage as ItemSearchResponsesCursorPage,
    type ItemCreateParams as ItemCreateParams,
    type ItemRetrieveParams as ItemRetrieveParams,
    type ItemUpdateParams as ItemUpdateParams,
    type ItemListParams as ItemListParams,
    type ItemDeleteParams as ItemDeleteParams,
    type ItemMergeParams as ItemMergeParams,
    type ItemSearchParams as ItemSearchParams,
    type ItemUpsertParams as ItemUpsertParams,
  };
}
