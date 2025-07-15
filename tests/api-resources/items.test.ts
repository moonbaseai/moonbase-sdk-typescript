// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Moonbase from '@moonbase/sdk';

const client = new Moonbase({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource items', () => {
  test('create: only required params', async () => {
    const responsePromise = client.items.create({
      collection_id: 'collection_id',
      values: { foo: { text: 'text', type: 'value/text/single_line' } },
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
    const response = await client.items.create({
      collection_id: 'collection_id',
      values: { foo: { text: 'text', type: 'value/text/single_line' } },
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.items.retrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: only required params', async () => {
    const responsePromise = client.items.update('id', {
      values: { foo: { text: 'text', type: 'value/text/single_line' } },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.items.update('id', {
      values: { foo: { text: 'text', type: 'value/text/single_line' } },
      'update-many-strategy': 'replace',
      'update-one-strategy': 'replace',
    });
  });

  test('delete', async () => {
    const responsePromise = client.items.delete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('upsert: only required params', async () => {
    const responsePromise = client.items.upsert({
      collection_id: 'collection_id',
      identifiers: { foo: { text: 'text', type: 'value/text/single_line' } },
      values: { foo: { text: 'text', type: 'value/text/single_line' } },
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
    const response = await client.items.upsert({
      collection_id: 'collection_id',
      identifiers: { foo: { text: 'text', type: 'value/text/single_line' } },
      values: { foo: { text: 'text', type: 'value/text/single_line' } },
      'update-many-strategy': 'replace',
      'update-one-strategy': 'replace',
    });
  });
});
