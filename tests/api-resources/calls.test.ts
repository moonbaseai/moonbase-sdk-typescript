// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Moonbase from '@moonbase/sdk';

const client = new Moonbase({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource calls', () => {
  test('create: only required params', async () => {
    const responsePromise = client.calls.create({
      direction: 'incoming',
      participants: [{ phone: 'phone', role: 'caller' }],
      provider: 'provider',
      provider_id: 'provider_id',
      start_at: '2019-12-27T18:11:19.117Z',
      status: 'queued',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.calls.create({
      direction: 'incoming',
      participants: [{ phone: 'phone', role: 'caller' }],
      provider: 'provider',
      provider_id: 'provider_id',
      start_at: '2019-12-27T18:11:19.117Z',
      status: 'queued',
      answered_at: '2019-12-27T18:11:19.117Z',
      end_at: '2019-12-27T18:11:19.117Z',
      provider_metadata: { foo: 'bar' },
    });
  });
});
