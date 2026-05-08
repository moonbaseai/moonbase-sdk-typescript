// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as FilesAPI from './files';
import * as CollectionsAPI from './collections/collections';

/**
 * A list of search results.
 */
export interface SearchResponse {
  data: Array<SearchResponse.Data>;

  type: 'list';
}

export namespace SearchResponse {
  /**
   * A search result entry.
   */
  export interface Data {
    /**
     * An Item represents a single record or row within a Collection. It holds a set of
     * `values` corresponding to the Collection's `fields`.
     */
    data: CollectionsAPI.Item | FilesAPI.MoonbaseFile;

    type: 'search_result';
  }
}

export interface SearchParams {
  /**
   * The search text to match against items and files.
   */
  query: string;
}

export declare namespace TopLevel {
  export { type SearchResponse as SearchResponse, type SearchParams as SearchParams };
}
