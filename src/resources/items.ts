// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Items extends APIResource {
  /**
   * Creates a new item in a collection.
   *
   * @example
   * ```ts
   * const item = await client.items.create({
   *   collection_id: '1CR8ZUPSRgSsYUg8HVzSV6',
   *   values: {
   *     name: {
   *       type: 'value/text/single_line',
   *       text: 'Aperture Science',
   *     },
   *     ceo: {
   *       type: 'value/relation',
   *       item: { type: 'item', id: '1CR8ZUQk3g9D6v8bvQPh7U' },
   *     },
   *   },
   * });
   * ```
   */
  create(body: ItemCreateParams, options?: RequestOptions): APIPromise<Item> {
    return this._client.post('/items', { body, ...options });
  }

  /**
   * Retrieves the details of an existing item.
   *
   * @example
   * ```ts
   * const item = await client.items.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Item> {
    return this._client.get(path`/items/${id}`, options);
  }

  /**
   * Updates an item.
   *
   * @example
   * ```ts
   * const item = await client.items.update('id', {
   *   values: {
   *     name: {
   *       type: 'value/text/single_line',
   *       text: 'Jony Appleseed',
   *     },
   *   },
   * });
   * ```
   */
  update(id: string, params: ItemUpdateParams, options?: RequestOptions): APIPromise<Item> {
    const {
      'update-many-strategy': updateManyStrategy,
      'update-one-strategy': updateOneStrategy,
      ...body
    } = params;
    return this._client.patch(path`/items/${id}`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(updateManyStrategy?.toString() != null ?
            { 'update-many-strategy': updateManyStrategy?.toString() }
          : undefined),
          ...(updateOneStrategy?.toString() != null ?
            { 'update-one-strategy': updateOneStrategy?.toString() }
          : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Permanently deletes an item.
   *
   * @example
   * ```ts
   * const item = await client.items.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<Item> {
    return this._client.delete(path`/items/${id}`, options);
  }

  /**
   * Find and update an existing item, or create a new one.
   *
   * @example
   * ```ts
   * const item = await client.items.upsert({
   *   collection_id: '1CR8ZTkjJggbDcKLRBk8FL',
   *   identifiers: {
   *     domain: [
   *       {
   *         type: 'value/uri/domain',
   *         domain: 'aperturescience.com',
   *       },
   *     ],
   *   },
   *   values: {
   *     name: {
   *       type: 'value/text/single_line',
   *       text: 'Aperture Science',
   *     },
   *     domain: [
   *       {
   *         type: 'value/uri/domain',
   *         domain: 'aperturescience.com',
   *       },
   *     ],
   *     linked_in: {
   *       type: 'value/uri/social_linked_in',
   *       profile: {
   *         url: 'https://linkedin.com/company/aperturescience',
   *       },
   *     },
   *   },
   * });
   * ```
   */
  upsert(params: ItemUpsertParams, options?: RequestOptions): APIPromise<Item> {
    const {
      'update-many-strategy': updateManyStrategy,
      'update-one-strategy': updateOneStrategy,
      ...body
    } = params;
    return this._client.post('/items/upsert', {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(updateManyStrategy?.toString() != null ?
            { 'update-many-strategy': updateManyStrategy?.toString() }
          : undefined),
          ...(updateOneStrategy?.toString() != null ?
            { 'update-one-strategy': updateOneStrategy?.toString() }
          : undefined),
        },
        options?.headers,
      ]),
    });
  }
}

export type ItemsCursorPage = CursorPage<Item>;

/**
 * True or false value
 */
export interface BooleanValue {
  boolean: boolean;

  type: 'value/boolean';
}

/**
 * Selected choice option
 */
export interface Choice {
  option: Choice.Option;

  type: 'value/choice';
}

export namespace Choice {
  export interface Option {
    id: string;

    type: 'field_option';

    label?: string;
  }
}

/**
 * Date without time
 */
export interface DateValue {
  date: string;

  type: 'value/date';
}

/**
 * Date and time value
 */
export interface DatetimeValue {
  datetime: string;

  type: 'value/datetime';
}

/**
 * Internet domain name
 */
export interface DomainValue {
  domain: string;

  type: 'value/uri/domain';
}

/**
 * Email address value
 */
export interface EmailValue {
  email: string;

  type: 'value/email';
}

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
  | Choice
  | FunnelStep
  | RelationValue
  | Array<Value>;

/**
 * Floating point number
 */
export interface FloatValue {
  number: number;

  type: 'value/number/unitless_float';
}

/**
 * Funnel step value
 */
export interface FunnelStep {
  step: FunnelStep.Step;

  type: 'value/funnel_step';
}

export namespace FunnelStep {
  export interface Step {
    id: string;

    type: 'funnel_step';

    name?: string;
  }
}

/**
 * Geographic coordinate value
 */
export interface GeoValue {
  geo: string;

  type: 'value/geo';
}

/**
 * Integer value without units
 */
export interface IntegerValue {
  number: number;

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
   * String representing the object’s type. Always `item` for this object.
   */
  type: 'item';

  /**
   * A hash where keys are the `ref` of a `Field` and values are the data stored for
   * that field.
   */
  values?: { [key: string]: FieldValue | null };
}

/**
 * Parameters for creating an `Item`.
 */
export interface ItemCreateParams {
  /**
   * The ID of the `Collection` to create the item in.
   */
  collection_id: string;

  /**
   * A hash where keys are the `ref` of a `Field` and values are the data to be set.
   */
  values: { [key: string]: FieldValue | null };
}

/**
 * Monetary or currency value
 */
export interface MonetaryValue {
  amount: MonetaryValue.Amount;

  type: 'value/number/monetary';
}

export namespace MonetaryValue {
  export interface Amount {
    amount_in_minor_units: number;

    currency: string;

    type: 'currency';
  }
}

/**
 * Multiple lines of text
 */
export interface MultiLineTextValue {
  text: string;

  type: 'value/text/multi_line';
}

/**
 * Percentage numeric value
 */
export interface PercentageValue {
  percentage: number;

  type: 'value/number/percentage';
}

/**
 * Related item reference
 */
export interface RelationValue {
  /**
   * An Item represents a single record or row within a Collection. It holds a set of
   * `values` corresponding to the Collection's `fields`.
   */
  item: Item;

  type: 'value/relation';
}

/**
 * A single line of text
 */
export interface SingleLineTextValue {
  text: string;

  type: 'value/text/single_line';
}

/**
 * LinkedIn profile link
 */
export interface SocialLinkedInValue {
  profile: SocialLinkedInValue.Profile;

  type: 'value/uri/social_linked_in';
}

export namespace SocialLinkedInValue {
  export interface Profile {
    url?: string;

    username?: string;
  }
}

/**
 * X (formerly Twitter) username
 */
export interface SocialXValue {
  profile: SocialXValue.Profile;

  type: 'value/uri/social_x';
}

export namespace SocialXValue {
  export interface Profile {
    url?: string;

    username?: string;
  }
}

/**
 * Telephone number value
 */
export interface TelephoneNumber {
  telephone_number: string;

  type: 'value/telephone_number';
}

/**
 * URL or web address
 */
export interface URLValue {
  type: 'value/uri/url';

  url: string;
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
  | Choice
  | FunnelStep
  | RelationValue;

export interface ItemCreateParams {
  /**
   * The ID of the `Collection` to create the item in.
   */
  collection_id: string;

  /**
   * A hash where keys are the `ref` of a `Field` and values are the data to be set.
   */
  values: { [key: string]: FieldValue | null };
}

export interface ItemUpdateParams {
  /**
   * Body param: A hash where keys are the `ref` of a `Field` and values are the new
   * data to be set.
   */
  values: { [key: string]: FieldValue | null };

  /**
   * Header param: Specifies how to update fields that allow multiple values during a
   * PATCH or update request. Use `replace` (default) to overwrite all existing
   * values with the new values. Use `preserve` to leave the existing values
   * unchanged when already present. Use `merge` to merge the new values with
   * existing values.
   */
  'update-many-strategy'?: 'replace' | 'preserve' | 'merge';

  /**
   * Header param: Specifies how to update fields with a single (one) value during a
   * PATCH or update request. Use `replace` (default) to overwrite the existing value
   * with the new value. Use `preserve` to leave the existing value unchanged if one
   * is already present.
   */
  'update-one-strategy'?: 'replace' | 'preserve';
}

export interface ItemUpsertParams {
  /**
   * Body param: The ID of the `Collection` to create the item in.
   */
  collection_id: string;

  /**
   * Body param: A hash where keys are the `ref` of a `Field` and values are used to
   * identify the item to update. When multiple identifiers are provided, the update
   * will find items that match any of the identifiers.
   */
  identifiers: { [key: string]: FieldValue | null };

  /**
   * Body param: A hash where keys are the `ref` of a `Field` and values are the data
   * to be set.
   */
  values: { [key: string]: FieldValue | null };

  /**
   * Header param: Specifies how to update fields that allow multiple values. Use
   * `replace` (default) to overwrite all existing values with the new values. Use
   * `preserve` to leave the existing values unchanged when already present. Use
   * `merge` to merge the new values with existing values.
   */
  'update-many-strategy'?: 'replace' | 'preserve' | 'merge';

  /**
   * Header param: Specifies how to update fields that have a single value. Use
   * `replace` (default) to overwrite the existing value with the new value. Use
   * `preserve` to leave the existing value unchanged if one is already present.
   */
  'update-one-strategy'?: 'replace' | 'preserve';
}

export declare namespace Items {
  export {
    type BooleanValue as BooleanValue,
    type Choice as Choice,
    type DateValue as DateValue,
    type DatetimeValue as DatetimeValue,
    type DomainValue as DomainValue,
    type EmailValue as EmailValue,
    type FieldValue as FieldValue,
    type FloatValue as FloatValue,
    type FunnelStep as FunnelStep,
    type GeoValue as GeoValue,
    type IntegerValue as IntegerValue,
    type Item as Item,
    type ItemCreateParams as ItemCreateParams,
    type MonetaryValue as MonetaryValue,
    type MultiLineTextValue as MultiLineTextValue,
    type PercentageValue as PercentageValue,
    type RelationValue as RelationValue,
    type SingleLineTextValue as SingleLineTextValue,
    type SocialLinkedInValue as SocialLinkedInValue,
    type SocialXValue as SocialXValue,
    type TelephoneNumber as TelephoneNumber,
    type URLValue as URLValue,
    type Value as Value,
    type ItemUpdateParams as ItemUpdateParams,
    type ItemUpsertParams as ItemUpsertParams,
  };
}
