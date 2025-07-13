// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { MoonbaseSDK } from '../client';

export abstract class APIResource {
  protected _client: MoonbaseSDK;

  constructor(client: MoonbaseSDK) {
    this._client = client;
  }
}
