// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as CollectionsAPI from './collections/collections';

export interface Error {
  type: 'error';

  /**
   * A unique identifier for this specific error instance.
   */
  id?: string;

  /**
   * An application-specific error code string.
   */
  code?: string;

  /**
   * A human-readable explanation of this specific error.
   */
  detail?: string;

  /**
   * An object containing more specific information about the part of the request
   * that caused the error.
   */
  source?: Error.Source;

  /**
   * The HTTP status code for this problem, as a string.
   */
  status?: string;

  /**
   * A short, human-readable summary of the problem.
   */
  title?: string;
}

export namespace Error {
  /**
   * An object containing more specific information about the part of the request
   * that caused the error.
   */
  export interface Source {
    /**
     * A string indicating which URI query parameter caused the error.
     */
    parameter?: string;

    /**
     * A JSON Pointer [RFC6901] to the associated entity in the request document.
     */
    pointer?: string;
  }
}

/**
 * A View represents a saved configuration for displaying items in a collection,
 * including filters and sorting rules.
 */
export interface View {
  /**
   * Unique identifier for the object.
   */
  id: string;

  links: View.Links;

  /**
   * The name of the view.
   */
  name: string;

  /**
   * String representing the object’s type. Always `view` for this object.
   */
  type: 'view';

  /**
   * The `Collection` this view belongs to.
   */
  collection?: CollectionsAPI.Collection;

  /**
   * The type of view, such as `table` or `board`.
   */
  view_type?: 'table' | 'board';
}

export namespace View {
  export interface Links {
    /**
     * A link to the `Collection` this view belongs to.
     */
    collection: string;

    /**
     * A link to the list of `Item` objects that are visible in this view.
     */
    items: string;

    /**
     * The canonical URL for this object.
     */
    self: string;
  }
}
