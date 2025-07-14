// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Moonbase from '@moonbase/sdk';

const client = new Moonbase({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource inboxes', () => {
  test('retrieve', async () => {
    const responsePromise = client.inboxes.retrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.inboxes.retrieve('id', { 'include[]': 'tagset' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Moonbase.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.inboxes.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.inboxes.list(
        { after: 'after', before: 'before', limit: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Moonbase.NotFoundError);
  });
});
