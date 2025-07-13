// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ItemsAPI from './items';
import { APIPromise } from '../core/api-promise';
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
   *   collection_id: '1CR2QLsnhwrJX7Z33jnyGV',
   *   values: {
   *     name: {
   *       type: 'value/text/single_line',
   *       text: 'Aperture Science',
   *     },
   *     ceo: {
   *       type: 'value/relation',
   *       item: { type: 'item', id: '1CR2QLtx9doK4wFiFB7VAS' },
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
   *     foo: { text: 'text', type: 'value/text/single_line' },
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
   *   collection_id: '1CR2QLbeMAqKQ6PvQu39pZ',
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
  values?: { [key: string]: unknown };
}

export interface ItemCreateParams {
  /**
   * The ID of the `Collection` to create the item in.
   */
  collection_id: string;

  /**
   * A hash where keys are the `ref` of a `Field` and values are the data to be set.
   */
  values: {
    [key: string]:
      | ItemCreateParams.SingleLineTextValue
      | ItemCreateParams.MultiLineTextValue
      | ItemCreateParams.IntegerValue
      | ItemCreateParams.FloatValue
      | ItemCreateParams.MonetaryValue
      | ItemCreateParams.PercentageValue
      | ItemCreateParams.BooleanValue
      | ItemCreateParams.EmailValue
      | ItemCreateParams.URLValue
      | ItemCreateParams.DomainValue
      | ItemCreateParams.SocialXValue
      | ItemCreateParams.SocialLinkedInValue
      | ItemCreateParams.TelephoneNumberValue
      | ItemCreateParams.GeoValue
      | ItemCreateParams.DateValue
      | ItemCreateParams.DatetimeValue
      | ItemCreateParams.ChoiceValue
      | ItemCreateParams.FunnelStepValue
      | ItemCreateParams.RelationValue
      | Array<
          | ItemCreateParams.SingleLineTextValue
          | ItemCreateParams.MultiLineTextValue
          | ItemCreateParams.IntegerValue
          | ItemCreateParams.FloatValue
          | ItemCreateParams.MonetaryValue
          | ItemCreateParams.PercentageValue
          | ItemCreateParams.BooleanValue
          | ItemCreateParams.EmailValue
          | ItemCreateParams.URLValue
          | ItemCreateParams.DomainValue
          | ItemCreateParams.SocialXValue
          | ItemCreateParams.SocialLinkedInValue
          | ItemCreateParams.TelephoneNumberValue
          | ItemCreateParams.GeoValue
          | ItemCreateParams.DateValue
          | ItemCreateParams.DatetimeValue
          | ItemCreateParams.ChoiceValue
          | ItemCreateParams.FunnelStepValue
          | ItemCreateParams.RelationValue
        >
      | null;
  };
}

export namespace ItemCreateParams {
  /**
   * A single line of text
   */
  export interface SingleLineTextValue {
    text: string;

    type: 'value/text/single_line';
  }

  /**
   * Multiple lines of text
   */
  export interface MultiLineTextValue {
    text: string;

    type: 'value/text/multi_line';
  }

  /**
   * Integer value without units
   */
  export interface IntegerValue {
    number: number;

    type: 'value/number/unitless_integer';
  }

  /**
   * Floating point number
   */
  export interface FloatValue {
    number: number;

    type: 'value/number/unitless_float';
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
   * Percentage numeric value
   */
  export interface PercentageValue {
    percentage: number;

    type: 'value/number/percentage';
  }

  /**
   * True or false value
   */
  export interface BooleanValue {
    boolean: boolean;

    type: 'value/boolean';
  }

  /**
   * Email address value
   */
  export interface EmailValue {
    email: string;

    type: 'value/email';
  }

  /**
   * URL or web address
   */
  export interface URLValue {
    type: 'value/uri/url';

    url: string;
  }

  /**
   * Internet domain name
   */
  export interface DomainValue {
    domain: string;

    type: 'value/uri/domain';
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
   * Telephone number value
   */
  export interface TelephoneNumberValue {
    telephone_number: string;

    type: 'value/telephone_number';
  }

  /**
   * Geographic coordinate value
   */
  export interface GeoValue {
    geo: string;

    type: 'value/geo';
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
   * Selected choice option
   */
  export interface ChoiceValue {
    option: ChoiceValue.Option;

    type: 'value/choice';
  }

  export namespace ChoiceValue {
    export interface Option {
      id: string;

      type: 'field_option';

      label?: string;
    }
  }

  /**
   * Funnel step value
   */
  export interface FunnelStepValue {
    step: FunnelStepValue.Step;

    type: 'value/funnel_step';
  }

  export namespace FunnelStepValue {
    export interface Step {
      id: string;

      type: 'funnel_step';

      name?: string;
    }
  }

  /**
   * Related item reference
   */
  export interface RelationValue {
    /**
     * An Item represents a single record or row within a Collection. It holds a set of
     * `values` corresponding to the Collection's `fields`.
     */
    item: ItemsAPI.Item;

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
   * Multiple lines of text
   */
  export interface MultiLineTextValue {
    text: string;

    type: 'value/text/multi_line';
  }

  /**
   * Integer value without units
   */
  export interface IntegerValue {
    number: number;

    type: 'value/number/unitless_integer';
  }

  /**
   * Floating point number
   */
  export interface FloatValue {
    number: number;

    type: 'value/number/unitless_float';
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
   * Percentage numeric value
   */
  export interface PercentageValue {
    percentage: number;

    type: 'value/number/percentage';
  }

  /**
   * True or false value
   */
  export interface BooleanValue {
    boolean: boolean;

    type: 'value/boolean';
  }

  /**
   * Email address value
   */
  export interface EmailValue {
    email: string;

    type: 'value/email';
  }

  /**
   * URL or web address
   */
  export interface URLValue {
    type: 'value/uri/url';

    url: string;
  }

  /**
   * Internet domain name
   */
  export interface DomainValue {
    domain: string;

    type: 'value/uri/domain';
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
   * Telephone number value
   */
  export interface TelephoneNumberValue {
    telephone_number: string;

    type: 'value/telephone_number';
  }

  /**
   * Geographic coordinate value
   */
  export interface GeoValue {
    geo: string;

    type: 'value/geo';
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
   * Selected choice option
   */
  export interface ChoiceValue {
    option: ChoiceValue.Option;

    type: 'value/choice';
  }

  export namespace ChoiceValue {
    export interface Option {
      id: string;

      type: 'field_option';

      label?: string;
    }
  }

  /**
   * Funnel step value
   */
  export interface FunnelStepValue {
    step: FunnelStepValue.Step;

    type: 'value/funnel_step';
  }

  export namespace FunnelStepValue {
    export interface Step {
      id: string;

      type: 'funnel_step';

      name?: string;
    }
  }

  /**
   * Related item reference
   */
  export interface RelationValue {
    /**
     * An Item represents a single record or row within a Collection. It holds a set of
     * `values` corresponding to the Collection's `fields`.
     */
    item: ItemsAPI.Item;

    type: 'value/relation';
  }
}

export interface ItemUpdateParams {
  /**
   * Body param: A hash where keys are the `ref` of a `Field` and values are the new
   * data to be set.
   */
  values: {
    [key: string]:
      | ItemUpdateParams.SingleLineTextValue
      | ItemUpdateParams.MultiLineTextValue
      | ItemUpdateParams.IntegerValue
      | ItemUpdateParams.FloatValue
      | ItemUpdateParams.MonetaryValue
      | ItemUpdateParams.PercentageValue
      | ItemUpdateParams.BooleanValue
      | ItemUpdateParams.EmailValue
      | ItemUpdateParams.URLValue
      | ItemUpdateParams.DomainValue
      | ItemUpdateParams.SocialXValue
      | ItemUpdateParams.SocialLinkedInValue
      | ItemUpdateParams.TelephoneNumberValue
      | ItemUpdateParams.GeoValue
      | ItemUpdateParams.DateValue
      | ItemUpdateParams.DatetimeValue
      | ItemUpdateParams.ChoiceValue
      | ItemUpdateParams.FunnelStepValue
      | ItemUpdateParams.RelationValue
      | Array<
          | ItemUpdateParams.SingleLineTextValue
          | ItemUpdateParams.MultiLineTextValue
          | ItemUpdateParams.IntegerValue
          | ItemUpdateParams.FloatValue
          | ItemUpdateParams.MonetaryValue
          | ItemUpdateParams.PercentageValue
          | ItemUpdateParams.BooleanValue
          | ItemUpdateParams.EmailValue
          | ItemUpdateParams.URLValue
          | ItemUpdateParams.DomainValue
          | ItemUpdateParams.SocialXValue
          | ItemUpdateParams.SocialLinkedInValue
          | ItemUpdateParams.TelephoneNumberValue
          | ItemUpdateParams.GeoValue
          | ItemUpdateParams.DateValue
          | ItemUpdateParams.DatetimeValue
          | ItemUpdateParams.ChoiceValue
          | ItemUpdateParams.FunnelStepValue
          | ItemUpdateParams.RelationValue
        >
      | null;
  };

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

export namespace ItemUpdateParams {
  /**
   * A single line of text
   */
  export interface SingleLineTextValue {
    text: string;

    type: 'value/text/single_line';
  }

  /**
   * Multiple lines of text
   */
  export interface MultiLineTextValue {
    text: string;

    type: 'value/text/multi_line';
  }

  /**
   * Integer value without units
   */
  export interface IntegerValue {
    number: number;

    type: 'value/number/unitless_integer';
  }

  /**
   * Floating point number
   */
  export interface FloatValue {
    number: number;

    type: 'value/number/unitless_float';
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
   * Percentage numeric value
   */
  export interface PercentageValue {
    percentage: number;

    type: 'value/number/percentage';
  }

  /**
   * True or false value
   */
  export interface BooleanValue {
    boolean: boolean;

    type: 'value/boolean';
  }

  /**
   * Email address value
   */
  export interface EmailValue {
    email: string;

    type: 'value/email';
  }

  /**
   * URL or web address
   */
  export interface URLValue {
    type: 'value/uri/url';

    url: string;
  }

  /**
   * Internet domain name
   */
  export interface DomainValue {
    domain: string;

    type: 'value/uri/domain';
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
   * Telephone number value
   */
  export interface TelephoneNumberValue {
    telephone_number: string;

    type: 'value/telephone_number';
  }

  /**
   * Geographic coordinate value
   */
  export interface GeoValue {
    geo: string;

    type: 'value/geo';
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
   * Selected choice option
   */
  export interface ChoiceValue {
    option: ChoiceValue.Option;

    type: 'value/choice';
  }

  export namespace ChoiceValue {
    export interface Option {
      id: string;

      type: 'field_option';

      label?: string;
    }
  }

  /**
   * Funnel step value
   */
  export interface FunnelStepValue {
    step: FunnelStepValue.Step;

    type: 'value/funnel_step';
  }

  export namespace FunnelStepValue {
    export interface Step {
      id: string;

      type: 'funnel_step';

      name?: string;
    }
  }

  /**
   * Related item reference
   */
  export interface RelationValue {
    /**
     * An Item represents a single record or row within a Collection. It holds a set of
     * `values` corresponding to the Collection's `fields`.
     */
    item: ItemsAPI.Item;

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
   * Multiple lines of text
   */
  export interface MultiLineTextValue {
    text: string;

    type: 'value/text/multi_line';
  }

  /**
   * Integer value without units
   */
  export interface IntegerValue {
    number: number;

    type: 'value/number/unitless_integer';
  }

  /**
   * Floating point number
   */
  export interface FloatValue {
    number: number;

    type: 'value/number/unitless_float';
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
   * Percentage numeric value
   */
  export interface PercentageValue {
    percentage: number;

    type: 'value/number/percentage';
  }

  /**
   * True or false value
   */
  export interface BooleanValue {
    boolean: boolean;

    type: 'value/boolean';
  }

  /**
   * Email address value
   */
  export interface EmailValue {
    email: string;

    type: 'value/email';
  }

  /**
   * URL or web address
   */
  export interface URLValue {
    type: 'value/uri/url';

    url: string;
  }

  /**
   * Internet domain name
   */
  export interface DomainValue {
    domain: string;

    type: 'value/uri/domain';
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
   * Telephone number value
   */
  export interface TelephoneNumberValue {
    telephone_number: string;

    type: 'value/telephone_number';
  }

  /**
   * Geographic coordinate value
   */
  export interface GeoValue {
    geo: string;

    type: 'value/geo';
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
   * Selected choice option
   */
  export interface ChoiceValue {
    option: ChoiceValue.Option;

    type: 'value/choice';
  }

  export namespace ChoiceValue {
    export interface Option {
      id: string;

      type: 'field_option';

      label?: string;
    }
  }

  /**
   * Funnel step value
   */
  export interface FunnelStepValue {
    step: FunnelStepValue.Step;

    type: 'value/funnel_step';
  }

  export namespace FunnelStepValue {
    export interface Step {
      id: string;

      type: 'funnel_step';

      name?: string;
    }
  }

  /**
   * Related item reference
   */
  export interface RelationValue {
    /**
     * An Item represents a single record or row within a Collection. It holds a set of
     * `values` corresponding to the Collection's `fields`.
     */
    item: ItemsAPI.Item;

    type: 'value/relation';
  }
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
  identifiers: {
    [key: string]:
      | ItemUpsertParams.SingleLineTextValue
      | ItemUpsertParams.MultiLineTextValue
      | ItemUpsertParams.IntegerValue
      | ItemUpsertParams.FloatValue
      | ItemUpsertParams.MonetaryValue
      | ItemUpsertParams.PercentageValue
      | ItemUpsertParams.BooleanValue
      | ItemUpsertParams.EmailValue
      | ItemUpsertParams.URLValue
      | ItemUpsertParams.DomainValue
      | ItemUpsertParams.SocialXValue
      | ItemUpsertParams.SocialLinkedInValue
      | ItemUpsertParams.TelephoneNumberValue
      | ItemUpsertParams.GeoValue
      | ItemUpsertParams.DateValue
      | ItemUpsertParams.DatetimeValue
      | ItemUpsertParams.ChoiceValue
      | ItemUpsertParams.FunnelStepValue
      | ItemUpsertParams.RelationValue
      | Array<
          | ItemUpsertParams.SingleLineTextValue
          | ItemUpsertParams.MultiLineTextValue
          | ItemUpsertParams.IntegerValue
          | ItemUpsertParams.FloatValue
          | ItemUpsertParams.MonetaryValue
          | ItemUpsertParams.PercentageValue
          | ItemUpsertParams.BooleanValue
          | ItemUpsertParams.EmailValue
          | ItemUpsertParams.URLValue
          | ItemUpsertParams.DomainValue
          | ItemUpsertParams.SocialXValue
          | ItemUpsertParams.SocialLinkedInValue
          | ItemUpsertParams.TelephoneNumberValue
          | ItemUpsertParams.GeoValue
          | ItemUpsertParams.DateValue
          | ItemUpsertParams.DatetimeValue
          | ItemUpsertParams.ChoiceValue
          | ItemUpsertParams.FunnelStepValue
          | ItemUpsertParams.RelationValue
        >
      | null;
  };

  /**
   * Body param: A hash where keys are the `ref` of a `Field` and values are the data
   * to be set.
   */
  values: {
    [key: string]:
      | ItemUpsertParams.SingleLineTextValue
      | ItemUpsertParams.MultiLineTextValue
      | ItemUpsertParams.IntegerValue
      | ItemUpsertParams.FloatValue
      | ItemUpsertParams.MonetaryValue
      | ItemUpsertParams.PercentageValue
      | ItemUpsertParams.BooleanValue
      | ItemUpsertParams.EmailValue
      | ItemUpsertParams.URLValue
      | ItemUpsertParams.DomainValue
      | ItemUpsertParams.SocialXValue
      | ItemUpsertParams.SocialLinkedInValue
      | ItemUpsertParams.TelephoneNumberValue
      | ItemUpsertParams.GeoValue
      | ItemUpsertParams.DateValue
      | ItemUpsertParams.DatetimeValue
      | ItemUpsertParams.ChoiceValue
      | ItemUpsertParams.FunnelStepValue
      | ItemUpsertParams.RelationValue
      | Array<
          | ItemUpsertParams.SingleLineTextValue
          | ItemUpsertParams.MultiLineTextValue
          | ItemUpsertParams.IntegerValue
          | ItemUpsertParams.FloatValue
          | ItemUpsertParams.MonetaryValue
          | ItemUpsertParams.PercentageValue
          | ItemUpsertParams.BooleanValue
          | ItemUpsertParams.EmailValue
          | ItemUpsertParams.URLValue
          | ItemUpsertParams.DomainValue
          | ItemUpsertParams.SocialXValue
          | ItemUpsertParams.SocialLinkedInValue
          | ItemUpsertParams.TelephoneNumberValue
          | ItemUpsertParams.GeoValue
          | ItemUpsertParams.DateValue
          | ItemUpsertParams.DatetimeValue
          | ItemUpsertParams.ChoiceValue
          | ItemUpsertParams.FunnelStepValue
          | ItemUpsertParams.RelationValue
        >
      | null;
  };

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

export namespace ItemUpsertParams {
  /**
   * A single line of text
   */
  export interface SingleLineTextValue {
    text: string;

    type: 'value/text/single_line';
  }

  /**
   * Multiple lines of text
   */
  export interface MultiLineTextValue {
    text: string;

    type: 'value/text/multi_line';
  }

  /**
   * Integer value without units
   */
  export interface IntegerValue {
    number: number;

    type: 'value/number/unitless_integer';
  }

  /**
   * Floating point number
   */
  export interface FloatValue {
    number: number;

    type: 'value/number/unitless_float';
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
   * Percentage numeric value
   */
  export interface PercentageValue {
    percentage: number;

    type: 'value/number/percentage';
  }

  /**
   * True or false value
   */
  export interface BooleanValue {
    boolean: boolean;

    type: 'value/boolean';
  }

  /**
   * Email address value
   */
  export interface EmailValue {
    email: string;

    type: 'value/email';
  }

  /**
   * URL or web address
   */
  export interface URLValue {
    type: 'value/uri/url';

    url: string;
  }

  /**
   * Internet domain name
   */
  export interface DomainValue {
    domain: string;

    type: 'value/uri/domain';
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
   * Telephone number value
   */
  export interface TelephoneNumberValue {
    telephone_number: string;

    type: 'value/telephone_number';
  }

  /**
   * Geographic coordinate value
   */
  export interface GeoValue {
    geo: string;

    type: 'value/geo';
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
   * Selected choice option
   */
  export interface ChoiceValue {
    option: ChoiceValue.Option;

    type: 'value/choice';
  }

  export namespace ChoiceValue {
    export interface Option {
      id: string;

      type: 'field_option';

      label?: string;
    }
  }

  /**
   * Funnel step value
   */
  export interface FunnelStepValue {
    step: FunnelStepValue.Step;

    type: 'value/funnel_step';
  }

  export namespace FunnelStepValue {
    export interface Step {
      id: string;

      type: 'funnel_step';

      name?: string;
    }
  }

  /**
   * Related item reference
   */
  export interface RelationValue {
    /**
     * An Item represents a single record or row within a Collection. It holds a set of
     * `values` corresponding to the Collection's `fields`.
     */
    item: ItemsAPI.Item;

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
   * Multiple lines of text
   */
  export interface MultiLineTextValue {
    text: string;

    type: 'value/text/multi_line';
  }

  /**
   * Integer value without units
   */
  export interface IntegerValue {
    number: number;

    type: 'value/number/unitless_integer';
  }

  /**
   * Floating point number
   */
  export interface FloatValue {
    number: number;

    type: 'value/number/unitless_float';
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
   * Percentage numeric value
   */
  export interface PercentageValue {
    percentage: number;

    type: 'value/number/percentage';
  }

  /**
   * True or false value
   */
  export interface BooleanValue {
    boolean: boolean;

    type: 'value/boolean';
  }

  /**
   * Email address value
   */
  export interface EmailValue {
    email: string;

    type: 'value/email';
  }

  /**
   * URL or web address
   */
  export interface URLValue {
    type: 'value/uri/url';

    url: string;
  }

  /**
   * Internet domain name
   */
  export interface DomainValue {
    domain: string;

    type: 'value/uri/domain';
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
   * Telephone number value
   */
  export interface TelephoneNumberValue {
    telephone_number: string;

    type: 'value/telephone_number';
  }

  /**
   * Geographic coordinate value
   */
  export interface GeoValue {
    geo: string;

    type: 'value/geo';
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
   * Selected choice option
   */
  export interface ChoiceValue {
    option: ChoiceValue.Option;

    type: 'value/choice';
  }

  export namespace ChoiceValue {
    export interface Option {
      id: string;

      type: 'field_option';

      label?: string;
    }
  }

  /**
   * Funnel step value
   */
  export interface FunnelStepValue {
    step: FunnelStepValue.Step;

    type: 'value/funnel_step';
  }

  export namespace FunnelStepValue {
    export interface Step {
      id: string;

      type: 'funnel_step';

      name?: string;
    }
  }

  /**
   * Related item reference
   */
  export interface RelationValue {
    /**
     * An Item represents a single record or row within a Collection. It holds a set of
     * `values` corresponding to the Collection's `fields`.
     */
    item: ItemsAPI.Item;

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
   * Multiple lines of text
   */
  export interface MultiLineTextValue {
    text: string;

    type: 'value/text/multi_line';
  }

  /**
   * Integer value without units
   */
  export interface IntegerValue {
    number: number;

    type: 'value/number/unitless_integer';
  }

  /**
   * Floating point number
   */
  export interface FloatValue {
    number: number;

    type: 'value/number/unitless_float';
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
   * Percentage numeric value
   */
  export interface PercentageValue {
    percentage: number;

    type: 'value/number/percentage';
  }

  /**
   * True or false value
   */
  export interface BooleanValue {
    boolean: boolean;

    type: 'value/boolean';
  }

  /**
   * Email address value
   */
  export interface EmailValue {
    email: string;

    type: 'value/email';
  }

  /**
   * URL or web address
   */
  export interface URLValue {
    type: 'value/uri/url';

    url: string;
  }

  /**
   * Internet domain name
   */
  export interface DomainValue {
    domain: string;

    type: 'value/uri/domain';
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
   * Telephone number value
   */
  export interface TelephoneNumberValue {
    telephone_number: string;

    type: 'value/telephone_number';
  }

  /**
   * Geographic coordinate value
   */
  export interface GeoValue {
    geo: string;

    type: 'value/geo';
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
   * Selected choice option
   */
  export interface ChoiceValue {
    option: ChoiceValue.Option;

    type: 'value/choice';
  }

  export namespace ChoiceValue {
    export interface Option {
      id: string;

      type: 'field_option';

      label?: string;
    }
  }

  /**
   * Funnel step value
   */
  export interface FunnelStepValue {
    step: FunnelStepValue.Step;

    type: 'value/funnel_step';
  }

  export namespace FunnelStepValue {
    export interface Step {
      id: string;

      type: 'funnel_step';

      name?: string;
    }
  }

  /**
   * Related item reference
   */
  export interface RelationValue {
    /**
     * An Item represents a single record or row within a Collection. It holds a set of
     * `values` corresponding to the Collection's `fields`.
     */
    item: ItemsAPI.Item;

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
   * Multiple lines of text
   */
  export interface MultiLineTextValue {
    text: string;

    type: 'value/text/multi_line';
  }

  /**
   * Integer value without units
   */
  export interface IntegerValue {
    number: number;

    type: 'value/number/unitless_integer';
  }

  /**
   * Floating point number
   */
  export interface FloatValue {
    number: number;

    type: 'value/number/unitless_float';
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
   * Percentage numeric value
   */
  export interface PercentageValue {
    percentage: number;

    type: 'value/number/percentage';
  }

  /**
   * True or false value
   */
  export interface BooleanValue {
    boolean: boolean;

    type: 'value/boolean';
  }

  /**
   * Email address value
   */
  export interface EmailValue {
    email: string;

    type: 'value/email';
  }

  /**
   * URL or web address
   */
  export interface URLValue {
    type: 'value/uri/url';

    url: string;
  }

  /**
   * Internet domain name
   */
  export interface DomainValue {
    domain: string;

    type: 'value/uri/domain';
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
   * Telephone number value
   */
  export interface TelephoneNumberValue {
    telephone_number: string;

    type: 'value/telephone_number';
  }

  /**
   * Geographic coordinate value
   */
  export interface GeoValue {
    geo: string;

    type: 'value/geo';
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
   * Selected choice option
   */
  export interface ChoiceValue {
    option: ChoiceValue.Option;

    type: 'value/choice';
  }

  export namespace ChoiceValue {
    export interface Option {
      id: string;

      type: 'field_option';

      label?: string;
    }
  }

  /**
   * Funnel step value
   */
  export interface FunnelStepValue {
    step: FunnelStepValue.Step;

    type: 'value/funnel_step';
  }

  export namespace FunnelStepValue {
    export interface Step {
      id: string;

      type: 'funnel_step';

      name?: string;
    }
  }

  /**
   * Related item reference
   */
  export interface RelationValue {
    /**
     * An Item represents a single record or row within a Collection. It holds a set of
     * `values` corresponding to the Collection's `fields`.
     */
    item: ItemsAPI.Item;

    type: 'value/relation';
  }
}

export declare namespace Items {
  export {
    type Item as Item,
    type ItemCreateParams as ItemCreateParams,
    type ItemUpdateParams as ItemUpdateParams,
    type ItemUpsertParams as ItemUpsertParams,
  };
}
