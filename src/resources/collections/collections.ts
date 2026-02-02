// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FunnelsAPI from '../funnels';
import * as Shared from '../shared';
import * as FieldsAPI from './fields';
import { FieldRetrieveParams, Fields } from './fields';
import * as ItemsAPI from './items';
import {
  ItemCreateParams,
  ItemDeleteParams,
  ItemListParams,
  ItemRetrieveParams,
  ItemUpdateParams,
  ItemUpsertParams,
  Items,
} from './items';
import * as ViewsAPI from '../views/views';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Collections extends APIResource {
  fields: FieldsAPI.Fields = new FieldsAPI.Fields(this._client);
  items: ItemsAPI.Items = new ItemsAPI.Items(this._client);

  /**
   * Retrieves the details of an existing collection.
   *
   * @example
   * ```ts
   * const collection = await client.collections.retrieve('id');
   * ```
   */
  retrieve(
    id: string,
    query: CollectionRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Collection> {
    return this._client.get(path`/collections/${id}`, { query, ...options });
  }

  /**
   * Returns a list of your collections.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const collection of client.collections.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: CollectionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CollectionsCursorPage, Collection> {
    return this._client.getAPIList('/collections', CursorPage<Collection>, { query, ...options });
  }
}

export type CollectionsCursorPage = CursorPage<Collection>;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
   * The human-readable text displayed for this option.
   */
  name: string;

  /**
   * String representing the object’s type. Always `choice_field_option` for this
   * object.
   */
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
  data: ChoiceFieldOption | Shared.Pointer;

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
   * If `true`, this is one of the foundational collections (People, Organizations,
   * Deals, or Tasks).
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * A list of `Field` objects that define the schema for items in this collection.
   */
  fields: Array<Field>;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
 * A field can be null, a single value, or an array of values
 */
export type FieldValue =
  | SingleLineTextValue
  | MultiLineTextValue
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
  | IntegerValue
  | FloatValue
  | MonetaryValue
  | PercentageValue
  | BooleanValue
  | EmailValue
  | URLValue
  | DomainValue
  | FieldValueParam.SocialXValueParam
  | FieldValueParam.SocialLinkedInValueParam
  | TelephoneNumber
  | GeoValue
  | DateValue
  | DatetimeValue
  | ChoiceValueParam
  | FunnelStepValueParam
  | RelationValueParam
  | Array<ValueParam>;

export namespace FieldValueParam {
  /**
   * The social media profile for the X (formerly Twitter) platform
   */
  export interface SocialXValueParam {
    /**
     * Social media profile information including both the full URL and extracted
     * username.
     */
    data: SocialXValueParam.Data;

    type: 'value/uri/social_x';
  }

  export namespace SocialXValueParam {
    /**
     * Social media profile information including both the full URL and extracted
     * username.
     */
    export interface Data {
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
  }

  /**
   * The social media profile for the LinkedIn platform
   */
  export interface SocialLinkedInValueParam {
    /**
     * The social media profile for the LinkedIn platform
     */
    data: SocialLinkedInValueParam.Data;

    type: 'value/uri/social_linked_in';
  }

  export namespace SocialLinkedInValueParam {
    /**
     * The social media profile for the LinkedIn platform
     */
    export interface Data {
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
  }
}

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
 * Funnel step value
 */
export interface FunnelStepValue {
  /**
   * A specific funnel step, as configured on the Funnel
   */
  data: FunnelsAPI.FunnelStep;

  type: 'value/funnel_step';
}

/**
 * Funnel step value
 */
export interface FunnelStepValueParam {
  /**
   * A specific funnel step, as configured on the Funnel
   */
  data: FunnelsAPI.FunnelStep | Shared.Pointer;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
}

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
  data: ItemPointer | Shared.Pointer;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * The `Funnel` object that defines the available stages for this field.
   */
  funnel: FunnelsAPI.Funnel;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
   * If `true`, this is a built-in field included by default.
   */
  core: boolean;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

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
  | IntegerValue
  | FloatValue
  | MonetaryValue
  | PercentageValue
  | BooleanValue
  | EmailValue
  | URLValue
  | DomainValue
  | ValueParam.SocialXValueParam
  | ValueParam.SocialLinkedInValueParam
  | TelephoneNumber
  | GeoValue
  | DateValue
  | DatetimeValue
  | ChoiceValueParam
  | FunnelStepValueParam
  | RelationValueParam;

export namespace ValueParam {
  /**
   * The social media profile for the X (formerly Twitter) platform
   */
  export interface SocialXValueParam {
    /**
     * Social media profile information including both the full URL and extracted
     * username.
     */
    data: SocialXValueParam.Data;

    type: 'value/uri/social_x';
  }

  export namespace SocialXValueParam {
    /**
     * Social media profile information including both the full URL and extracted
     * username.
     */
    export interface Data {
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
  }

  /**
   * The social media profile for the LinkedIn platform
   */
  export interface SocialLinkedInValueParam {
    /**
     * The social media profile for the LinkedIn platform
     */
    data: SocialLinkedInValueParam.Data;

    type: 'value/uri/social_linked_in';
  }

  export namespace SocialLinkedInValueParam {
    /**
     * The social media profile for the LinkedIn platform
     */
    export interface Data {
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
  }
}

export interface CollectionRetrieveParams {
  /**
   * Specifies which related objects to include in the response.
   */
  include?: Array<'views'>;
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
    type ChoiceValue as ChoiceValue,
    type ChoiceValueParam as ChoiceValueParam,
    type Collection as Collection,
    type CollectionPointer as CollectionPointer,
    type DateField as DateField,
    type DateValue as DateValue,
    type DatetimeField as DatetimeField,
    type DatetimeValue as DatetimeValue,
    type DomainField as DomainField,
    type DomainValue as DomainValue,
    type EmailField as EmailField,
    type EmailValue as EmailValue,
    type Field as Field,
    type FieldValue as FieldValue,
    type FieldValueParam as FieldValueParam,
    type FloatField as FloatField,
    type FloatValue as FloatValue,
    type FunnelStepValue as FunnelStepValue,
    type FunnelStepValueParam as FunnelStepValueParam,
    type GeoField as GeoField,
    type GeoValue as GeoValue,
    type IntegerField as IntegerField,
    type IntegerValue as IntegerValue,
    type Item as Item,
    type ItemPointer as ItemPointer,
    type MonetaryField as MonetaryField,
    type MonetaryValue as MonetaryValue,
    type MultiLineTextField as MultiLineTextField,
    type MultiLineTextValue as MultiLineTextValue,
    type PercentageField as PercentageField,
    type PercentageValue as PercentageValue,
    type RelationField as RelationField,
    type RelationValue as RelationValue,
    type RelationValueParam as RelationValueParam,
    type SingleLineTextField as SingleLineTextField,
    type SingleLineTextValue as SingleLineTextValue,
    type SocialLinkedInField as SocialLinkedInField,
    type SocialLinkedInValue as SocialLinkedInValue,
    type SocialXField as SocialXField,
    type SocialXValue as SocialXValue,
    type StageField as StageField,
    type TelephoneNumber as TelephoneNumber,
    type TelephoneNumberField as TelephoneNumberField,
    type URLField as URLField,
    type URLValue as URLValue,
    type Value as Value,
    type ValueParam as ValueParam,
    type CollectionsCursorPage as CollectionsCursorPage,
    type CollectionRetrieveParams as CollectionRetrieveParams,
    type CollectionListParams as CollectionListParams,
  };

  export { Fields as Fields, type FieldRetrieveParams as FieldRetrieveParams };

  export {
    Items as Items,
    type ItemCreateParams as ItemCreateParams,
    type ItemRetrieveParams as ItemRetrieveParams,
    type ItemUpdateParams as ItemUpdateParams,
    type ItemListParams as ItemListParams,
    type ItemDeleteParams as ItemDeleteParams,
    type ItemUpsertParams as ItemUpsertParams,
  };
}
