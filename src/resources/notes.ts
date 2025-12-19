// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import * as CollectionsAPI from './collections/collections';
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

  /**
   * The main content of the note.
   */
  body: Shared.FormattedText;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * String representing the object’s type. Always `note` for this object.
   */
  type: 'note';

  /**
   * Time at which the object was last updated, as an ISO 8601 timestamp in UTC.
   */
  updated_at: string;

  /**
   * A reference to an `Item` within a specific `Collection`, providing the context
   * needed to locate the item.
   */
  creator?: CollectionsAPI.ItemPointer | null;

  /**
   * A short, system-generated summary of the note's content.
   */
  summary?: string;

  /**
   * An optional title for the note.
   */
  title?: string;
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
