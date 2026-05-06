// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CollectionsAPI from './collections';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage your collections and items
 */
export class Fields extends APIResource {
  /**
   * Creates a new field in a collection.
   *
   * @example
   * ```ts
   * const field = await client.collections.fields.create(
   *   'collection_id',
   *   {
   *     field: {
   *       name: 'Lead Source',
   *       type: 'field/text/single_line',
   *     },
   *   },
   * );
   * ```
   */
  create(
    collectionID: string,
    params: FieldCreateParams,
    options?: RequestOptions,
  ): APIPromise<CollectionsAPI.Field> {
    const { field } = params;
    return this._client.post(path`/collections/${collectionID}/fields`, { body: field, ...options });
  }

  /**
   * Retrieves the details of a field in a collection.
   *
   * @example
   * ```ts
   * const field = await client.collections.fields.retrieve(
   *   'id',
   *   { collection_id: 'collection_id' },
   * );
   * ```
   */
  retrieve(
    id: string,
    params: FieldRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<CollectionsAPI.Field> {
    const { collection_id } = params;
    return this._client.get(path`/collections/${collection_id}/fields/${id}`, options);
  }

  /**
   * Updates an existing field in a collection.
   *
   * @example
   * ```ts
   * const field = await client.collections.fields.update('id', {
   *   collection_id: 'collection_id',
   *   field: { type: 'field/text/single_line' },
   * });
   * ```
   */
  update(id: string, params: FieldUpdateParams, options?: RequestOptions): APIPromise<CollectionsAPI.Field> {
    const { collection_id, field } = params;
    return this._client.patch(path`/collections/${collection_id}/fields/${id}`, { body: field, ...options });
  }

  /**
   * Permanently deletes a field from a collection.
   *
   * @example
   * ```ts
   * await client.collections.fields.delete('id', {
   *   collection_id: 'collection_id',
   * });
   * ```
   */
  delete(id: string, params: FieldDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { collection_id } = params;
    return this._client.delete(path`/collections/${collection_id}/fields/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface FieldCreateParams {
  /**
   * Parameters for creating a field, discriminated by `type`.
   */
  field:
    | FieldCreateParams.SingleLineTextFieldCreateParams
    | FieldCreateParams.MultiLineTextFieldCreateParams
    | FieldCreateParams.IntegerFieldCreateParams
    | FieldCreateParams.FloatFieldCreateParams
    | FieldCreateParams.MonetaryFieldCreateParams
    | FieldCreateParams.PercentageFieldCreateParams
    | FieldCreateParams.BooleanFieldCreateParams
    | FieldCreateParams.EmailFieldCreateParams
    | FieldCreateParams.URLFieldCreateParams
    | FieldCreateParams.DomainFieldCreateParams
    | FieldCreateParams.SocialXFieldCreateParams
    | FieldCreateParams.SocialLinkedInFieldCreateParams
    | FieldCreateParams.TelephoneNumberFieldCreateParams
    | FieldCreateParams.GeoFieldCreateParams
    | FieldCreateParams.DateFieldCreateParams
    | FieldCreateParams.DatetimeFieldCreateParams
    | FieldCreateParams.ChoiceFieldCreateParams
    | CollectionsAPI.StageFieldCreateParams
    | FieldCreateParams.RelationFieldCreateParams;
}

export namespace FieldCreateParams {
  /**
   * Parameters for creating a single-line text field.
   */
  export interface SingleLineTextFieldCreateParams {
    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * The field type. Must be `field/text/single_line`.
     */
    type: 'field/text/single_line';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.SingleLineTextValue>;

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
   * Parameters for creating a multi-line text field.
   */
  export interface MultiLineTextFieldCreateParams {
    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * The field type. Must be `field/text/multi_line`.
     */
    type: 'field/text/multi_line';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.MultiLineTextValue>;

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
   * Parameters for creating an integer field.
   */
  export interface IntegerFieldCreateParams {
    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * The field type. Must be `field/number/unitless_integer`.
     */
    type: 'field/number/unitless_integer';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.IntegerValue>;

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
   * Parameters for creating a decimal number field.
   */
  export interface FloatFieldCreateParams {
    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * The field type. Must be `field/number/unitless_float`.
     */
    type: 'field/number/unitless_float';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.FloatValue>;

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
   * Parameters for creating a monetary field.
   */
  export interface MonetaryFieldCreateParams {
    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * The field type. Must be `field/number/monetary`.
     */
    type: 'field/number/monetary';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    /**
     * The default currency for the field, as a 3-letter ISO 4217 code (e.g., `USD`,
     * `EUR`, `GBP`).
     */
    default_unit?: string;

    default_values?: Array<CollectionsAPI.MonetaryValue>;

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
   * Parameters for creating a percentage field.
   */
  export interface PercentageFieldCreateParams {
    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * The field type. Must be `field/number/percentage`.
     */
    type: 'field/number/percentage';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.PercentageValue>;

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
   * Parameters for creating a boolean field.
   */
  export interface BooleanFieldCreateParams {
    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * The field type. Must be `field/boolean`.
     */
    type: 'field/boolean';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.BooleanValue>;

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
   * Parameters for creating an email field.
   */
  export interface EmailFieldCreateParams {
    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * The field type. Must be `field/email`.
     */
    type: 'field/email';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.EmailValue>;

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
   * Parameters for creating a URL field.
   */
  export interface URLFieldCreateParams {
    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * The field type. Must be `field/uri/url`.
     */
    type: 'field/uri/url';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.URLValue>;

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
   * Parameters for creating a domain field.
   */
  export interface DomainFieldCreateParams {
    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * The field type. Must be `field/uri/domain`.
     */
    type: 'field/uri/domain';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.DomainValue>;

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
   * Parameters for creating an X (formerly Twitter) profile field.
   */
  export interface SocialXFieldCreateParams {
    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * The field type. Must be `field/uri/social_x`.
     */
    type: 'field/uri/social_x';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.SocialXValueParam>;

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
   * Parameters for creating a LinkedIn profile field.
   */
  export interface SocialLinkedInFieldCreateParams {
    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * The field type. Must be `field/uri/social_linked_in`.
     */
    type: 'field/uri/social_linked_in';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.SocialLinkedInValueParam>;

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
   * Parameters for creating a telephone number field.
   */
  export interface TelephoneNumberFieldCreateParams {
    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * The field type. Must be `field/telephone_number`.
     */
    type: 'field/telephone_number';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.TelephoneNumber>;

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
   * Parameters for creating a geographic location field.
   */
  export interface GeoFieldCreateParams {
    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * The field type. Must be `field/geo`.
     */
    type: 'field/geo';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.GeoValue>;

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
   * Parameters for creating a date field.
   */
  export interface DateFieldCreateParams {
    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * The field type. Must be `field/date`.
     */
    type: 'field/date';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.DateFieldDefaultValueParam>;

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
   * Parameters for creating a date and time field.
   */
  export interface DatetimeFieldCreateParams {
    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * The field type. Must be `field/datetime`.
     */
    type: 'field/datetime';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.DatetimeFieldDefaultValueParam>;

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
   * Parameters for creating a choice field with predefined options.
   */
  export interface ChoiceFieldCreateParams {
    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * A list of options to create for the field. Each option must have a `name`.
     */
    options: Array<ChoiceFieldCreateParams.Option>;

    /**
     * The field type. Must be `field/choice`.
     */
    type: 'field/choice';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.ChoiceValueParam>;

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

  export namespace ChoiceFieldCreateParams {
    /**
     * Parameters for defining an option in a choice field.
     */
    export interface Option {
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
       * The display name of the option.
       */
      name: string;
    }
  }

  /**
   * Parameters for creating a relation field that links items across collections.
   */
  export interface RelationFieldCreateParams {
    /**
     * A list of collection IDs or `ref` values that are valid targets for this
     * relation.
     */
    allowed_collections: Array<RelationFieldCreateParams.AllowedCollection>;

    /**
     * The human-readable name for the field.
     */
    name: string;

    /**
     * The type of relationship: `one_way` for simple references, or `two_way` for
     * bidirectional relationships.
     */
    relation_type: 'one_way' | 'two_way';

    /**
     * The field type. Must be `field/relation`.
     */
    type: 'field/relation';

    /**
     * Whether the field holds a single value (`one`) or multiple values (`many`).
     * Defaults to `one`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.RelationFieldDefaultValueParam>;

    /**
     * An optional description of the field's purpose.
     */
    description?: string;

    /**
     * If `true`, items must have a value for this field. Defaults to `false`.
     */
    required?: boolean;

    /**
     * For `two_way` relations, the name of the reverse field created on the target
     * collection.
     */
    reverse_field_name?: string;

    /**
     * If `true`, values must be unique across all items. Defaults to `false`.
     */
    unique?: boolean;
  }

  export namespace RelationFieldCreateParams {
    /**
     * A reference to a `Collection` used in request bodies. Provide at least one of
     * `id` or `ref` to identify the collection.
     */
    export interface AllowedCollection {
      /**
       * String representing the object’s type. Always `collection` for this object.
       */
      type: 'collection';

      /**
       * Unique identifier of the collection.
       */
      id?: string;

      /**
       * The stable, machine-readable reference identifier of the collection.
       */
      ref?: string;
    }
  }
}

export interface FieldRetrieveParams {
  /**
   * The ID or `ref` of the Collection the field belongs to.
   */
  collection_id: string;
}

export interface FieldUpdateParams {
  /**
   * Path param: The ID or `ref` of the Collection the field belongs to.
   */
  collection_id: string;

  /**
   * Body param: Parameters for updating a field, discriminated by `type`.
   */
  field:
    | FieldUpdateParams.SingleLineTextFieldUpdateParams
    | FieldUpdateParams.MultiLineTextFieldUpdateParams
    | FieldUpdateParams.IntegerFieldUpdateParams
    | FieldUpdateParams.FloatFieldUpdateParams
    | FieldUpdateParams.MonetaryFieldUpdateParams
    | FieldUpdateParams.PercentageFieldUpdateParams
    | FieldUpdateParams.BooleanFieldUpdateParams
    | FieldUpdateParams.EmailFieldUpdateParams
    | FieldUpdateParams.URLFieldUpdateParams
    | FieldUpdateParams.DomainFieldUpdateParams
    | FieldUpdateParams.SocialXFieldUpdateParams
    | FieldUpdateParams.SocialLinkedInFieldUpdateParams
    | FieldUpdateParams.TelephoneNumberFieldUpdateParams
    | FieldUpdateParams.GeoFieldUpdateParams
    | FieldUpdateParams.DateFieldUpdateParams
    | FieldUpdateParams.DatetimeFieldUpdateParams
    | FieldUpdateParams.ChoiceFieldUpdateParams
    | CollectionsAPI.StageFieldUpdateParams
    | FieldUpdateParams.RelationFieldUpdateParams;
}

export namespace FieldUpdateParams {
  /**
   * Parameters for updating a single-line text field.
   */
  export interface SingleLineTextFieldUpdateParams {
    /**
     * The field type. Must be `field/text/single_line`.
     */
    type: 'field/text/single_line';

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.SingleLineTextValue> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

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
   * Parameters for updating a multi-line text field.
   */
  export interface MultiLineTextFieldUpdateParams {
    /**
     * The field type. Must be `field/text/multi_line`.
     */
    type: 'field/text/multi_line';

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.MultiLineTextValue> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

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
   * Parameters for updating an integer field.
   */
  export interface IntegerFieldUpdateParams {
    /**
     * The field type. Must be `field/number/unitless_integer`.
     */
    type: 'field/number/unitless_integer';

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.IntegerValue> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

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
   * Parameters for updating a decimal number field.
   */
  export interface FloatFieldUpdateParams {
    /**
     * The field type. Must be `field/number/unitless_float`.
     */
    type: 'field/number/unitless_float';

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.FloatValue> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

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
   * Parameters for updating a monetary field.
   */
  export interface MonetaryFieldUpdateParams {
    /**
     * The field type. Must be `field/number/monetary`.
     */
    type: 'field/number/monetary';

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    /**
     * The default currency for the field, as a 3-letter ISO 4217 code (e.g., `USD`,
     * `EUR`, `GBP`).
     */
    default_unit?: string;

    default_values?: Array<CollectionsAPI.MonetaryValue> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

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
   * Parameters for updating a percentage field.
   */
  export interface PercentageFieldUpdateParams {
    /**
     * The field type. Must be `field/number/percentage`.
     */
    type: 'field/number/percentage';

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.PercentageValue> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

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
   * Parameters for updating a boolean field.
   */
  export interface BooleanFieldUpdateParams {
    /**
     * The field type. Must be `field/boolean`.
     */
    type: 'field/boolean';

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.BooleanValue> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

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
   * Parameters for updating an email field.
   */
  export interface EmailFieldUpdateParams {
    /**
     * The field type. Must be `field/email`.
     */
    type: 'field/email';

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.EmailValue> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

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
   * Parameters for updating a URL field.
   */
  export interface URLFieldUpdateParams {
    /**
     * The field type. Must be `field/uri/url`.
     */
    type: 'field/uri/url';

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.URLValue> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

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
   * Parameters for updating a domain field.
   */
  export interface DomainFieldUpdateParams {
    /**
     * The field type. Must be `field/uri/domain`.
     */
    type: 'field/uri/domain';

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.DomainValue> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

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
   * Parameters for updating an X (formerly Twitter) profile field.
   */
  export interface SocialXFieldUpdateParams {
    /**
     * The field type. Must be `field/uri/social_x`.
     */
    type: 'field/uri/social_x';

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.SocialXValueParam> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

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
   * Parameters for updating a LinkedIn profile field.
   */
  export interface SocialLinkedInFieldUpdateParams {
    /**
     * The field type. Must be `field/uri/social_linked_in`.
     */
    type: 'field/uri/social_linked_in';

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.SocialLinkedInValueParam> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

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
   * Parameters for updating a telephone number field.
   */
  export interface TelephoneNumberFieldUpdateParams {
    /**
     * The field type. Must be `field/telephone_number`.
     */
    type: 'field/telephone_number';

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.TelephoneNumber> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

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
   * Parameters for updating a geographic location field.
   */
  export interface GeoFieldUpdateParams {
    /**
     * The field type. Must be `field/geo`.
     */
    type: 'field/geo';

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.GeoValue> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

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
   * Parameters for updating a date field.
   */
  export interface DateFieldUpdateParams {
    /**
     * The field type. Must be `field/date`.
     */
    type: 'field/date';

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.DateFieldDefaultValueParam> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

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
   * Parameters for updating a date and time field.
   */
  export interface DatetimeFieldUpdateParams {
    /**
     * The field type. Must be `field/datetime`.
     */
    type: 'field/datetime';

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.DatetimeFieldDefaultValueParam> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

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
   * Parameters for updating a choice field.
   */
  export interface ChoiceFieldUpdateParams {
    /**
     * The field type. Must be `field/choice`.
     */
    type: 'field/choice';

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.ChoiceValueParam> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

    /**
     * The new name for the field.
     */
    name?: string;

    /**
     * The complete set of options for this field. Omit to leave unchanged. Array order
     * determines display order.
     */
    options?: Array<ChoiceFieldUpdateParams.Option>;

    /**
     * If `true`, items must have a value for this field.
     */
    required?: boolean;

    /**
     * If `true`, values must be unique across all items.
     */
    unique?: boolean;
  }

  export namespace ChoiceFieldUpdateParams {
    /**
     * A choice field option. Items with an `id` update existing options; items without
     * an `id` are added as new options.
     */
    export interface Option {
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
       * The display name of the option.
       */
      name: string;

      /**
       * The ID of an existing option to update. When absent, a new option is created.
       */
      id?: string;
    }
  }

  /**
   * Parameters for updating a relation field.
   */
  export interface RelationFieldUpdateParams {
    /**
     * The field type. Must be `field/relation`.
     */
    type: 'field/relation';

    /**
     * The complete set of allowed collections. Omit to leave unchanged. Array replaces
     * the current set.
     */
    allowed_collections?: Array<RelationFieldUpdateParams.AllowedCollection>;

    /**
     * Updated cardinality: `one` or `many`.
     */
    cardinality?: 'one' | 'many';

    default_values?: Array<CollectionsAPI.RelationFieldDefaultValueParam> | null;

    /**
     * An updated description, or `null` to clear it.
     */
    description?: string | null;

    /**
     * The new name for the field.
     */
    name?: string;

    /**
     * The type of relationship: `one_way` for simple references, or `two_way` for
     * bidirectional relationships.
     */
    relation_type?: 'one_way' | 'two_way';

    /**
     * If `true`, items must have a value for this field.
     */
    required?: boolean;

    /**
     * If `true`, values must be unique across all items.
     */
    unique?: boolean;
  }

  export namespace RelationFieldUpdateParams {
    /**
     * A reference to a `Collection` used in request bodies. Provide at least one of
     * `id` or `ref` to identify the collection.
     */
    export interface AllowedCollection {
      /**
       * String representing the object’s type. Always `collection` for this object.
       */
      type: 'collection';

      /**
       * Unique identifier of the collection.
       */
      id?: string;

      /**
       * The stable, machine-readable reference identifier of the collection.
       */
      ref?: string;
    }
  }
}

export interface FieldDeleteParams {
  /**
   * The ID or `ref` of the Collection the field belongs to.
   */
  collection_id: string;
}

export declare namespace Fields {
  export {
    type FieldCreateParams as FieldCreateParams,
    type FieldRetrieveParams as FieldRetrieveParams,
    type FieldUpdateParams as FieldUpdateParams,
    type FieldDeleteParams as FieldDeleteParams,
  };
}
