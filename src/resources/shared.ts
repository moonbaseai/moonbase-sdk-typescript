// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

/**
 * The Error object represents a single error that occurred during API request
 * processing. It provides detailed information about what went wrong, including a
 * unique identifier, status code, and human-readable descriptions to help
 * developers understand and resolve the issue.
 */
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

  meta?: { [key: string]: unknown };

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
 * Structured content that can be rendered in multiple formats, currently
 * supporting Markdown.
 */
export interface FormattedText {
  /**
   * The content formatted as Markdown text.
   */
  markdown?: string;
}

/**
 * A lightweight reference to another resource.
 */
export interface Pointer {
  /**
   * Unique identifier for the referenced object.
   */
  id: string;

  /**
   * String indicating the type of the referenced object.
   */
  type: string;
}
