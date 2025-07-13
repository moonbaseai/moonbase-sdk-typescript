// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Moonbase } from '../client';

export abstract class APIResource {
  protected _client: Moonbase;

  constructor(client: Moonbase) {
    this._client = client;
  }
}
