// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
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
  ): PagePromise<NotesCursorPage, Note> {
    return this._client.getAPIList('/notes', CursorPage<Note>, { query, ...options });
  }
}

export type NotesCursorPage = CursorPage<Note>;

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

export interface NoteListParams extends CursorPageParams {
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
    type NotesCursorPage as NotesCursorPage,
    type NoteListParams as NoteListParams,
  };
}
