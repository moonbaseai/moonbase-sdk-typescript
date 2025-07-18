// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FieldsAPI from './fields';
import { FieldRetrieveParams, Fields } from './fields';
import * as ViewsAPI from '../views/views';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Collections extends APIResource {
  fields: FieldsAPI.Fields = new FieldsAPI.Fields(this._client);

  /**
   * Retrieves the details of an existing collection.
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
   */
  list(
    query: CollectionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CollectionsCursorPage, Collection> {
    return this._client.getAPIList('/collections', CursorPage<Collection>, { query, ...options });
  }
}

export type CollectionsCursorPage = CursorPage<Collection>;

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
   * A hash of related links.
   */
  links: Collection.Links;

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
   * Time at which the object was created, as an RFC 3339 timestamp.
   */
  created_at?: string;

  /**
   * An optional, longer-form description of the collection's purpose.
   */
  description?: string;

  /**
   * A list of `Field` objects that define the schema for items in this collection.
   */
  fields?: Array<Field>;

  /**
   * Time at which the object was last updated, as an RFC 3339 timestamp.
   */
  updated_at?: string;

  /**
   * A list of saved `View` objects for presenting the collection's data.
   */
  views?: Array<ViewsAPI.View>;
}

export namespace Collection {
  /**
   * A hash of related links.
   */
  export interface Links {
    /**
     * The canonical URL for this object.
     */
    self: string;
  }
}

/**
 * A Field defines a single column in a Collection's schema. It specifies the data
 * type, validation rules, and other properties for the values stored in that
 * column.
 */
export interface Field {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Specifies whether the field can hold a single value (`one`) or multiple values
   * (`many`).
   */
  cardinality: 'one' | 'many';

  links: Field.Links;

  /**
   * The human-readable name of the field (e.g., “Due Date”).
   */
  name: string;

  /**
   * A unique, stable, machine-readable identifier for the field within its
   * collection (e.g., `due_date`).
   */
  ref: string;

  /**
   * The data type of the field. This determines how values are stored, validated,
   * and rendered.
   */
  type:
    | 'field/text/single_line'
    | 'field/text/multi_line'
    | 'field/number/unitless_integer'
    | 'field/number/unitless_float'
    | 'field/number/monetary'
    | 'field/number/percentage'
    | 'field/boolean'
    | 'field/email'
    | 'field/uri/url'
    | 'field/uri/domain'
    | 'field/uri/social_x'
    | 'field/uri/social_linked_in'
    | 'field/telephone_number'
    | 'field/geo'
    | 'field/date'
    | 'field/datetime'
    | 'field/choice'
    | 'field/stage'
    | 'field/relation/one_way'
    | 'field/relation/two_way';

  /**
   * Time at which the object was created, as an RFC 3339 timestamp.
   */
  created_at?: string;

  /**
   * An optional, longer-form description of the field's purpose.
   */
  description?: string;

  /**
   * If the field `type` is `field/choice`, this is the list of available
   * `FieldOption` objects.
   */
  field_options?: Array<Field.FieldOption>;

  /**
   * If the field `type` is `field/stage`, this is the associated `Funnel` object.
   */
  funnel?: Field.Funnel;

  /**
   * If `true`, the value of this field is system-managed and cannot be updated via
   * the API.
   */
  readonly?: boolean;

  /**
   * If `true`, this field must have a value.
   */
  required?: boolean;

  /**
   * If `true`, values for this field must be unique across all items in the
   * collection.
   */
  unique?: boolean;

  /**
   * Time at which the object was last updated, as an RFC 3339 timestamp.
   */
  updated_at?: string;
}

export namespace Field {
  export interface Links {
    /**
     * The `Collection` this field belongs to.
     */
    collection: string;

    /**
     * The canonical URL for this object.
     */
    self: string;
  }

  /**
   * Represents a selectable option within a `choice` field.
   */
  export interface FieldOption {
    /**
     * Unique identifier for the object.
     */
    id: string;

    /**
     * The human-readable text for the option.
     */
    label: string;

    /**
     * String representing the object’s type. Always `field_option` for this object.
     */
    type: 'field_option';
  }

  /**
   * If the field `type` is `field/stage`, this is the associated `Funnel` object.
   */
  export interface Funnel {
    /**
     * Unique identifier for the object.
     */
    id: string;

    /**
     * String representing the object’s type. Always `funnel` for this object.
     */
    type: 'funnel';

    /**
     * An ordered list of `FunnelStep` objects that make up the funnel.
     */
    steps?: Array<Funnel.Step>;
  }

  export namespace Funnel {
    /**
     * Represents a single step within a `Funnel`.
     */
    export interface Step {
      /**
       * Unique identifier for the object.
       */
      id: string;

      /**
       * The name of the step.
       */
      name: string;

      /**
       * The type of step, which can be `funnel_step/active`, `funnel_step/success`, or
       * `funnel_step/failure`.
       */
      type: 'funnel_step/active' | 'funnel_step/success' | 'funnel_step/failure';
    }
  }
}

export interface CollectionRetrieveParams {
  /**
   * Specifies which related objects to include in the response. Valid options are
   * `fields` and `views`.
   */
  include?: Array<'fields' | 'views'>;
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

export declare namespace Collections {
  export {
    type Collection as Collection,
    type Field as Field,
    type CollectionsCursorPage as CollectionsCursorPage,
    type CollectionRetrieveParams as CollectionRetrieveParams,
    type CollectionListParams as CollectionListParams,
  };

  export { Fields as Fields, type FieldRetrieveParams as FieldRetrieveParams };
}
