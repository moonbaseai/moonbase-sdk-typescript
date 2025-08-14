// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Moonbase from '@moonbaseai/sdk';

const client = new Moonbase({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource calls', () => {
  test('create: only required params', async () => {
    const responsePromise = client.calls.create({
      direction: 'incoming',
      participants: [
        { phone: '+14155551212', role: 'caller' },
        { phone: '+16505551212', role: 'callee' },
      ],
      provider: 'openphone',
      provider_id: 'openphone_id_000000000008',
      start_at: '2025-08-14T17:30:13.526Z',
      status: 'completed',
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
      participants: [
        { phone: '+14155551212', role: 'caller' },
        { phone: '+16505551212', role: 'callee' },
      ],
      provider: 'openphone',
      provider_id: 'openphone_id_000000000008',
      start_at: '2025-08-14T17:30:13.526Z',
      status: 'completed',
      answered_at: '2025-08-14T17:31:13Z',
      end_at: '2025-08-14T18:00:13.526Z',
      provider_metadata: {
        answered_by: 'bar',
        user_id: 'bar',
        phone_number_id: 'bar',
        conversation_id: 'bar',
      },
      recordings: [{ content_type: 'content_type', provider_id: 'provider_id', url: 'https://example.com' }],
      transcript: { cues: [{ from: 0, speaker: 'speaker', text: 'text', to: 0 }] },
    });
  });

  test('upsert: only required params', async () => {
    const responsePromise = client.calls.upsert({
      direction: 'incoming',
      participants: [
        { phone: '+14155551212', role: 'caller' },
        { phone: '+16505551212', role: 'callee' },
      ],
      provider: 'openphone',
      provider_id: 'openphone_id_000000000004',
      start_at: '2025-08-14T17:30:08.920Z',
      status: 'completed',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('upsert: required and optional params', async () => {
    const response = await client.calls.upsert({
      direction: 'incoming',
      participants: [
        { phone: '+14155551212', role: 'caller' },
        { phone: '+16505551212', role: 'callee' },
      ],
      provider: 'openphone',
      provider_id: 'openphone_id_000000000004',
      start_at: '2025-08-14T17:30:08.920Z',
      status: 'completed',
      answered_at: '2025-08-14T17:31:08Z',
      end_at: '2025-08-14T18:00:08.920Z',
      provider_metadata: {
        answered_by: 'bar',
        user_id: 'bar',
        phone_number_id: 'bar',
        conversation_id: 'bar',
      },
      recordings: [{ content_type: 'content_type', provider_id: 'provider_id', url: 'https://example.com' }],
      transcript: { cues: [{ from: 0, speaker: 'speaker', text: 'text', to: 0 }] },
    });
  });
});
