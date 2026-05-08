// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CallsAPI from './calls';
import * as MeetingsAPI from './meetings';
import * as Shared from './shared';
import * as CollectionsAPI from './collections/collections';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Manage your meetings, files, and notes
 */
export class Notes extends APIResource {
  /**
   * Create a new note.
   *
   * @example
   * ```ts
   * const note = await client.notes.create({
   *   body: {
   *     markdown:
   *       "# A note title\n\nHere's a note for me! Yay!",
   *   },
   * });
   * ```
   */
  create(body: NoteCreateParams, options?: RequestOptions): APIPromise<Note> {
    return this._client.post('/notes', { body, ...options });
  }

  /**
   * Retrieves the details of an existing note.
   *
   * @example
   * ```ts
   * const note = await client.notes.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Note> {
    return this._client.get(path`/notes/${id}`, options);
  }

  /**
   * Update an existing note.
   *
   * @example
   * ```ts
   * const note = await client.notes.update('id', {
   *   body: {
   *     markdown:
   *       "# A note title\n\nHere's a note for me! Yay!",
   *   },
   *   lock_version: 0,
   * });
   * ```
   */
  update(id: string, body: NoteUpdateParams, options?: RequestOptions): APIPromise<Note> {
    return this._client.patch(path`/notes/${id}`, { body, ...options });
  }

  /**
   * Returns a list of your notes.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const note of client.notes.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: NoteListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<NotesCursorPage, Note> {
    return this._client.getAPIList('/notes', CursorPage<Note>, { query, ...options });
  }

  /**
   * Permanently deletes a note.
   *
   * @example
   * ```ts
   * await client.notes.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/notes/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
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
   * A list of items, meetings or calls this note is associated with.
   */
  associations: Array<NoteAssociationPointer>;

  /**
   * The main content of the note.
   */
  body: Shared.FormattedText;

  /**
   * Time at which the object was created, as an ISO 8601 timestamp in UTC.
   */
  created_at: string;

  /**
   * The current lock version of the note for optimistic concurrency control.
   */
  lock_version: number;

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

/**
 * A reference to a call, meeting, or item to be associated with the note.
 */
export type NoteAssociationParamPointer =
  | CallsAPI.CallPointer
  | CollectionsAPI.ItemPointerParam
  | MeetingsAPI.MeetingPointer;

/**
 * A reference to a call, meeting, or item associated with the note.
 */
export type NoteAssociationPointer =
  | CallsAPI.CallPointer
  | CollectionsAPI.ItemPointer
  | MeetingsAPI.MeetingPointer;

export interface NotePointer {
  id: string;

  type: 'note';
}

export interface NoteCreateParams {
  /**
   * The main content of the note.
   */
  body: Shared.FormattedText;

  /**
   * Link the Note to Moonbase items (person, organization, deal, task, or an item in
   * a custom collection), meetings, or calls.
   */
  associations?: Array<NoteAssociationParamPointer>;
}

export interface NoteUpdateParams {
  /**
   * The main content of the note.
   */
  body: Shared.FormattedText;

  /**
   * The current lock version of the note for optimistic concurrency control.
   */
  lock_version: number;
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
    type NoteAssociationParamPointer as NoteAssociationParamPointer,
    type NoteAssociationPointer as NoteAssociationPointer,
    type NotePointer as NotePointer,
    type NotesCursorPage as NotesCursorPage,
    type NoteCreateParams as NoteCreateParams,
    type NoteUpdateParams as NoteUpdateParams,
    type NoteListParams as NoteListParams,
  };
}
