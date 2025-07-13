// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Notes extends APIResource {
  /**
   * Retrieves the details of an existing note.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Note> {
    return this._client.get(path`/notes/${id}`, options);
  }

  /**
   * Returns a list of your notes.
   */
  list(
    query: NoteListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NoteListResponse> {
    return this._client.get('/notes', { query, ...options });
  }
}

/**
 * The Note object represents a block of text content, often used for meeting notes
 * or summaries.
 */
export interface Note {
  /**
   * Unique identifier for the object.
   */
  id: string;

  links: Note.Links;

  /**
   * String representing the object’s type. Always `note` for this object.
   */
  type: 'note';

  /**
   * The main content of the note.
   */
  body?: string;

  /**
   * Time at which the object was created, as an RFC 3339 timestamp.
   */
  created_at?: string;

  /**
   * A short, system-generated summary of the note's content.
   */
  summary?: string;

  /**
   * An optional title for the note.
   */
  title?: string;

  /**
   * Time at which the object was last updated, as an RFC 3339 timestamp.
   */
  updated_at?: string;
}

export namespace Note {
  export interface Links {
    /**
     * The canonical URL for this object.
     */
    self: string;
  }
}

/**
 * A set of results using cursor-based pagination.
 */
export interface NoteListResponse {
  /**
   * An array of Note items.
   */
  data: Array<Note>;

  type: 'list';

  /**
   * Links for navigating through the paginated results
   */
  links?: NoteListResponse.Links;

  /**
   * Metadata about the pagination, including the cursors pointing to the previous
   * and next pages.
   */
  meta?: NoteListResponse.Meta;
}

export namespace NoteListResponse {
  /**
   * Links for navigating through the paginated results
   */
  export interface Links {
    next?: string;

    prev?: string;
  }

  /**
   * Metadata about the pagination, including the cursors pointing to the previous
   * and next pages.
   */
  export interface Meta {
    cursors?: Meta.Cursors;

    /**
     * Indicates if there are more results available. If true, the `next` cursor will
     * be present.
     */
    has_more?: boolean;
  }

  export namespace Meta {
    export interface Cursors {
      /**
       * Cursor for the next page. This value should be used with the `after` query
       * parameter to fetch the next page of results.
       */
      next?: string;

      /**
       * Cursor for the previous page. This value should be used with the `before` query
       * parameter to fetch the previous page of results.
       */
      prev?: string;
    }
  }
}

export interface NoteListParams {
  /**
   * When specified, returns results starting immediately after the item identified
   * by this cursor. Use the cursor value from the previous response's metadata to
   * fetch the next page of results.
   */
  after?: string;

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

export declare namespace Notes {
  export {
    type Note as Note,
    type NoteListResponse as NoteListResponse,
    type NoteListParams as NoteListParams,
  };
}
